const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = require('../models/models').User;
const Item = require('../models/models').Item;

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
    to: req.body.ownerPhone, // owner phone
    from: process.env.MY_TWILIO_NUMBER
  };
  User.findOne({phone: req.body.ownerPhone})
  .then(owner => {
    console.log('OWNER FOUnd', owner);
    if (!owner.pendingRequest.pending) { // each person can only 1 request at a time
      const newPending = {
        requesterPhone: req.body.requesterPhone,
        ownerPhone: req.body.ownerPhone,
        itemId: req.body.itemId,
        pending: true
      };
      // const copyPending = [...requester.pendingRequest];
      // copyPending.push(newPending);
      console.log('NEW PENDING', newPending);
      owner.update({pendingRequest: newPending})
      .then(resp => {
        console.log('RESP', resp);
        client.messages.create(data)
        .then(msg => {
          // console.log('MESSAGE SENT', message);
          console.log('sent message from', req.body.requesterPhone, 'to', req.body.ownerPhone);
          res.json({
            msgId: msg.sid,
            pendingRequest: newPending
          });
        });
      });
    }
    else {
      console.log('CANNOT MAKE MORE THAN 1 REQUEST AT A TIME, WAITING FOR OWNER TO APPROVE');
      res.json({message: "cannot make more than 1 request,  waitng for owner to approve"});
    }
  })
  .catch(err => {
    res.json({success: false, err});
  });
});

router.post('/sms', (req, res) => {
  const twiml = new MessagingResponse();
  User.findOne({phone: req.body.From})
  .then(owner => { // find owner of item
    console.log('FOUND USER', owner);
    const requesterPhone = owner.pendingRequest.requesterPhone;
    console.log('REQUESTER PHONE', requesterPhone);
    const ownerPhone = owner.pendingRequest.ownerPhone;
    User.findOne({phone: requesterPhone}) // find requester
    .then(requester => {
      console.log('FOUND REQUESTER', requester);
      Item.findById(owner.pendingRequest.itemId)
      .then(item => { // find item
        if (req.body.Body.toLowerCase() === 'yes') { // if owner authorizes, send owner's number to requester
          twiml.message(`You have authorized Doorstep to reveal your number to ${requester.fName} ${requester.lName}`);
          const newMessage = {
            body: `${owner.fName} ${owner.lName}'s phone number is: ${ownerPhone}. Please contact them to claim ${item.name}`,
            to: requesterPhone,
            from: process.env.MY_TWILIO_NUMBER
          };
          client.messages.create(newMessage);
          res.writeHead(200, {'Content-Type': 'text/xml'});
          res.end(twiml.toString());
          const resetPending = {
            pending: false
          };
          console.log('resetting', resetPending);
          owner.update({pendingRequest: resetPending})
          .then(resp => {
            console.log('PENDING REQUEST RESET');
          })
        }
      });
    });
  })
  .catch(err => {
    console.log(err);
    res.json({success: false, failure: err});
  });
});


module.exports = router;
