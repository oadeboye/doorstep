'use strict';
const express = require('express');
const router = express.Router();
const Handlebars = require('handlebars');
const models = require('../models/models');
const User = models.User;
const Community = models.Community;
const path = require('path');
const domain = 'https://hellodoorstep.herokuapp.com/';

// Turning functions into promises using bluebird
var Promise = require("bluebird");
const nodemailer = Promise.promisifyAll(require('nodemailer'));
const fs = Promise.promisifyAll(require('fs'));

// Create SMTP transporter
const transporter = nodemailer.createTransport({
  service: process.env.EMAIL_SERVICE,
  auth: {
    user: process.env.EMAIL_USERNAME,
    pass: process.env.EMAIL_PASSWORD
  }
}, {
  from: 'Doorstep'
});

console.log("SMTP Configured");

/**
 * sendEmail: sending an email using nodemailer
 * @param  {string} toEmail     Email to send message to
 * @param  {object} information Contains the information that will populate the email hbs file
 * @param  {string} filePath    Directory path to hbs file that will render the HTML of the email
 * @return {Promise}            Returns new promise that returns the success status of the send email function
 */
function sendEmail(toEmail, information, filePath) {
  console.log("TO", toEmail);
  console.log("INFO", information);
  // Read the email.hbs file and use Handlebars to create an HTML file
  let htmlBody = '';

  return new Promise(function (resolve, reject) {
    fs.readFileAsync(filePath)
    .then((data) => {
      // Create a string from the HTML
      var source = data.toString();
      htmlBody = renderToString(source, information);
      console.log("HTML BODY", htmlBody);
      // Create a message object containing the HTML
      const message = {
        to: 'teresali@usc.edu',
        subject: 'Doorstep Revised!',
        html: htmlBody
      };
      return transporter.sendMail(message);
    })
    .then((info) => {
      console.log('Message successfully sent!');
      console.log('Server responsed with "%s"', info.response);
      transporter.close();
      resolve({success: true});
    })
    .catch((err) => {
      console.log("Error sending email", err);
      reject({success: true, error: err});
    });
  });
}

/**
 * renderToString: Converst Handlebars file to HTML String
 * @param  {string} source Data from the read file
 * @param  {object} data   Object containing the information that will populate the email
 * @return {string}        Returns the HTML String
 */
function renderToString(source, information) {
  var template = Handlebars.compile(source);
  var outputString = template(data);
  return outputString;
}

// POST send email
// User clicks on the "ask to join" button on a door
// Sends post request that sends an email to the owner of the community
// Email contains a button that will allow permission to user to access community
router.post('/send-email', (req, res) => {
  const user = req.body.user;
  const community = req.body.community;

  // Data to be rendered in handlebars file
  const information = {
    user: user,
    community: community,
    link: domain + '/mail/confirm-permission/' + user._id + '/' + community._id
  };
  const filePath = path.join(__dirname, '../helper/grantPermissionToCommunityEmail.hbs');

  // Find the admin of the community
  User.findById(community.users[0])
  .then((user) => {
    return sendEmail(user.email, information, filePath);
  })
  .then((response) => {
    return res.json(response);
  })
  .catch(error => {
    console.log("Error finding admin", error);
    res.json({success: false, error: error});
  });
});

// GET confirm permission
// Confirms that the user who asked to join can join the community
// Adds that user to the database as a user of the community
// Sends a confirmation email to that user
router.get('/confirm-permission/:userId/:communityId', (req, res) => {
  console.log("USERID PARAM", req.params.userId);
  console.log("COMID PARAM", req.params.communityId);

  let userFound = '';
  let communityFound = '';

  User.findById(req.params.userId)
  .then((user) => {
    if (!user) {
      throw new Error('User does not exist');
    }
    userFound = user; // To define user outside of scope
    return Community.findById(req.params.communityId).populate('users');
  })
  .then((community) => {
    if (!community) {
      throw new Error('Community does not exist');
    } else if (community.users.indexOf(userFound._id) !== -1) {
      // Send error if the user is already in that community
      console.log("Error: user already exists");
      res.json({ success: false, response: community });
    } else {
      // Update the community to contain the added user
      communityFound = community; // To define community outside of scope
      const newUsers = [...community.users];
      newUsers.push(userFound._id);
      return community.update({ users: newUsers });
    }
  })
  .then((result) => {
    // After updating the database with the community's added user, send an email to that user
    // notifying the user that they've been added to the community
    const filePath = path.join(__dirname, '../helper/notifyPermissionToCommunityEmail.hbs');
    const information = {
      user: userFound,
      owner: communityFound.users[0],
      community: communityFound,
      link: process.env.DOMAIN = '/community/' + communityFound._id
    };
    return sendEmail(userFound.email, information, filePath);
  })
  .then(response => {
    // Return the result of the sendEmail promise
    return res.json(response);
  })
  .catch((err) => {
    console.log("Error sending confirm permission email", err);
    // return res.json({success: false, error: err});
  });
});


module.exports = router;
