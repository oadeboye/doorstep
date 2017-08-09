'use strict';
const nodemailer = require('nodemailer');
const express = require('express');
const router = express.Router();
const Handlebars = require('handlebars');
const fs = require('fs');
const models = require('../models/models');
const User = models.User;
const Community = models.Community;
const path = require('path')

// Create SMTP transporter
let transporter = nodemailer.createTransport({
  service: process.env.EMAIL_SERVICE,
  auth: {
    user: process.env.EMAIL_USERNAME,
    pass: process.env.EMAIL_PASSWORD
  }
}, {
  from: 'Doorstep'
})

console.log("SMTP Configured")

// POST send email
// User clicks on the "ask to join" button on a door
// Sends post request that sends an email to the owner of the community
// Email contains a button that will allow permission to user to access community
router.post('/send-email', (req, res) => {
  console.log("POSTING");
  const user = req.body.user;
  const community = req.body.community;

  // Data to be rendered in handlebars file
  const information = {
    user: user,
    community: community,
    link: process.env.DOMAIN + '/mail/confirm-permission/' + user._id + '/' + community._id
  }

  var htmlBody = '';
  const filePath = path.join(__dirname,'../helper/email.hbs');

  // read the file and use the callback to render
  fs.readFile(filePath, function(err, data){
    if (!err) {
      // make the buffer into a string
      var source = data.toString();
      console.log("SOURCE", source)


      htmlBody = renderToString(source, information);
      console.log("HTML BODY", htmlBody);
      let message = {
        to: req.body.user.email,
        subject: 'Doorstep!',
        html: htmlBody
      }

      // Send the email containing the message
      transporter.sendMail(message, (error, info) => {
        if (error) {
          console.log('Error occurred sending email');
          console.log(error.message);
          res.json({success: false, error: error})
        }
        else {
          console.log('Message successfully sent!');
          console.log('Server responsed with "%s"', info.response);
          res.json({success: true, info: info.response})
          transporter.close();
        }
      });

       // this will be called after the file is read
      function renderToString(source, data) {
        var template = Handlebars.compile(source);
        var outputString = template(data);
        return outputString;
      }
    }
    else {
      console.log("ERROR READING FILE", err);
    }
  });

});

router.get('/confirm-permission/:userId/:communityId', (req, res) => {
  console.log("USERID PARAM", req.params.userId);
  console.log("COMID PARAM", req.params.communityId);
  User.findById(req.params.userId, (err, user) => {
    Community.findById(req.params.communityId)
    .then(community => {
      // If the user already exists in the community, send an error
      if (community.users.indexOf(user._id) !== -1) {
        console.log("Error: user already exists");
        res.json({ success: false, response: community });
      } else {
        // Otherwise, push the valid user id into the community users array then update in database
        const newUsers = [...community.users];
        newUsers.push(user._id);
        community.update({ users: newUsers })
        .then((result) => {
          community.users = newUsers;
          // Send back the community json object with the updated array
          res.json({success: true, message: 'You have added them to the community!'});
        });
      }
    })
    .catch(error => {
      console.log(error);
      res.json({ success: false, failure: error });
    });
  });
})


module.exports = router;