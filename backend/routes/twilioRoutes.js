const mongoose = require('mongoose');
var accountSid = process.env.TWILIO_SID; // Your Account SID from www.twilio.com/console
var authToken = process.env.TWILIO_AUTH_TOKEN; // Your Auth Token from www.twilio.com/console
var fromNumber = process.env.MY_TWILIO_NUMBER; // Your custom Twilio number
var twilio = require('twilio');
var client = new twilio(accountSid, authToken);
const express = require('express');
const router = express.Router();

// POST send messages
// send a message to a user in database
// req.body receives: to
router.post('/send-message', function(req, res) {
  console.log('sending...');
  const data = {
    body: req.body.content,
    to: req.body.to, // a 10-digit number
    from: process.env.MY_TWILIO_NUMBER
  };
  client.messages.create(data)
  .then(msg => {
    // console.log('MESSAGE SENT', message);
    console.log(msg);
    res.json({
      msgId: msg.sid
    });
  })
  .catch(err => {
    res.json({success: false, err});
  });
});

module.exports = router;
