const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = require('../models/models').User;

// twilio configuration
var accountSid = process.env.TWILIO_SID; // Your Account SID from www.twilio.com/console
var authToken = process.env.TWILIO_AUTH_TOKEN; // Your Auth Token from www.twilio.com/console
var fromNumber = process.env.MY_TWILIO_NUMBER; // Your custom Twilio number
var twilio = require('twilio');
var client = new twilio(accountSid, authToken);
var MessagingResponse = twilio.twiml.MessagingResponse;


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
  User.findOne({phone: req.body.to})
  .then(requester => {
    console.log('REQUESTER FOUnd', requester);
    if (JSON.stringify(requester.pendingState) === "{}") {
      const newPending = {
        requesterPhone: req.body.to,
        ownerPhone: req.body.ownerPhone,
        pending: true
      };
      requester.update({pendingState: newPending})
      .then(resp => {
        console.log('RESP', resp);
        client.messages.create(data)
        .then(msg => {
          // console.log('MESSAGE SENT', message);
          console.log('sent message from', req.body.to, 'to', req.body.ownerPhone);
          res.json({
            msgId: msg.sid
          });
        });
      });
    }
    else {
      console.log('OWNER HAS NOT RESPONDED TO YOUR REQUEST');
      res.json({message: "owner has not responded to your previous request"});
    }
  })
  .catch(err => {
    res.json({success: false, err});
  });
});

router.post('/sms', (req, res) => {
  const twiml = new MessagingResponse();
  const owner = req.body.owner;
  if (req.body.Body.toLowerCase() === 'yes') {
    twiml.message(`Please contact ${req}`);
  }
  twiml.message('The Robots are coming! Head for the hills!');
  res.writeHead(200, {'Content-Type': 'text/xml'});
  res.end(twiml.toString());
});


module.exports = router;
