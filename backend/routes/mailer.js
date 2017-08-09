'use strict';
const nodemailer = require('nodemailer');
const express = require('express');
const router = express.Router();

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

router.post('/send-email', (req, res) => {
  const user = req.body.user;
  const community = req.body.community;

  let htmlBody = `<h2>Doorstep</h2>
    <p>Hello!</p>
    <p>Someone wants to join a community you have made!</p>
    <h4>Who's asking to join?</h4>
    <p>${user.fName + ' ' + user.lName}</p>
    <h4>Community they want to join</h4>
    <p>${community.name}</p>
    <button>Accept Request</button>`;

  console.log("SENDING EMAIL");
  let message = {
    to: req.body.user.email,
    subject: 'Nodemailer: access community',
    html: htmlBody
  }
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
  })
});


module.exports = router;