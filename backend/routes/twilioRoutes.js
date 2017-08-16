const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = require('../models/models').User;
const Item = require('../models/models').Item;
const Request = require('../models/models').Request;

// twilio configuration
var accountSid = process.env.TWILIO_SID; // Your Account SID from www.twilio.com/console
var authToken = process.env.TWILIO_AUTH_TOKEN; // Your Auth Token from www.twilio.com/console
var fromNumber = process.env.MY_TWILIO_NUMBER; // Your custom Twilio number
var twilio = require('twilio');
var client = new twilio(accountSid, authToken);
var MessagingResponse = twilio.twiml.MessagingResponse;

function removeRequests(allRequests, itemId) {
  return allRequests.filter(request => {
    console.log(request.itemId, itemId);
    return request.itemId === itemId;
  });
}
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
  console.log('OWNEr', req.body.ownerPhone);
  User.findOne({phone: req.body.ownerPhone})
  .then(owner => {
    console.log('OWNER FOUnd', owner);
    var requesters = owner.pendingRequests.map(request => request.requesterPhone);
    // any user may request an item from its owner if they haven't made a request
    // if (!owner.pendingRequest.pending || req.body.requesterPhone !== owner.pendingRequest.requesterPhone) {
    if (requesters.indexOf(req.body.requesterPhone) === -1) {
      // .then(resp => {
      //   console.log('RESP', resp);
      const data = {
        to: req.body.ownerPhone,
        from: process.env.MY_TWILIO_NUMBER,
        body: req.body.content
      };
      client.messages.create(data)
      .then(msg => {
        // console.log('MESSAGE SENT', message);
        console.log('sent message from', req.body.requesterPhone, 'to', req.body.ownerPhone);
        console.log('SID', msg.sid);
        const newPending = {
          requester: req.body.requester,
          requesterPhone: req.body.requesterPhone,
          ownerPhone: req.body.ownerPhone,
          itemId: req.body.itemId,
          pending: true,
          sId: msg.sid
        };
        // const copyPending = [...requester.pendingRequest];
        // copyPending.push(newPending);
        console.log('NEW PENDING', newPending);
        const newArray = [...owner.pendingRequests];
        newArray.push(newPending);
        owner.update({pendingRequests: newArray})
        .then(resp => {
          res.json({
            msgId: msg.sid,
            pendingRequest: newPending
          });
        });
      });
    } else {
      console.log('You already requested this item');
      res.json({message: "You already requested this item"});
    }
  })
  .catch(err => {
    res.json({success: false, err});
  });
});

// when user wants to give doorstep permission to release their number to a requester,
// they text 'Yes @minhto' or 'No @minhto' to allow Doorstep to release their number,
// where the string after the @ represents the username of the requester
router.post('/sms', (req, res) => {
  const twiml = new MessagingResponse();
  User.findOne({phone: req.body.From})
  .then(owner => { // find owner of item
    console.log('FOUND USER', owner);
    // const requesterPhone = owner.pendingRequests.requesterPhone;
    const requesterIndex = req.body.Body.indexOf('@');
    let requesterUsername = '';
    console.log('BODY', req.body.Body.trim().split(" ")[0].toLowerCase());
    console.log('requesterIndex', requesterIndex);
    if (requesterIndex !== -1) {
      requesterUsername = req.body.Body.trim().substring(requesterIndex + 1); // separates requester username
      console.log('REQUESTER USERNAME', requesterUsername);
      const requesters = owner.pendingRequests.map(request => request.requester);
      if (req.body.Body.trim().split(" ")[0].toLowerCase() === 'yes') {
        // requester = req.body.Body.trim().substring(requesterIndex + 1); // separates requester username
        console.log('REQUESTER USERNAME', requesterUsername);
        // const ownerPhone = owner.pendingRequest.ownerPhone;
        User.findOne({username: requesterUsername}) // find requester
        .then(requester => {
          console.log('FOUND REQUESTER', requester);
          console.log('ITEM ID', owner.pendingRequests[0].itemId);
          Item.findById(owner.pendingRequests[0].itemId) // works if a user only makes one request for 1 owner
          .then(item => { // find item
            console.log('HERe');
            // const requesters = owner.pendingRequests.map(request => request.requester);
            console.log('ALL REQUESTERS', requesters);
            // make sure the user did make a request before releasing owner's number
            if (requesters.indexOf(requesterUsername) !== -1) {
              twiml.message(`You have authorized Doorstep to reveal your number to ${requester.fName} ${requester.lName}`);
              const newMessage = {
                body: `${owner.fName} ${owner.lName}'s phone number is: ${owner.phone}. Please contact them to claim ${item.name}`,
                to: requester.phone,
                from: process.env.MY_TWILIO_NUMBER
              };
              client.messages.create(newMessage);
              res.writeHead(200, {'Content-Type': 'text/xml'});
              res.end(twiml.toString());
            } else {
              // send error message to owner if they entered the wrong requester's username
              console.log('REQUSTR', requesterUsername + 'end');
              twiml.message(`Please provide a valid requester username`);
              res.writeHead(200, {'Content-Type': 'text/xml'});
              res.end(twiml.toString());
            }
          });
        });
      } else if (req.body.Body.trim().split(" ")[0].toLowerCase() === 'no') {
        // send a message when user does not allow Doorstep to release their number
        if (requesters.indexOf(requesterUsername) !== -1) {
          twiml.message(`Your number was not sent to username @${requesterUsername}`);
          res.writeHead(200, {'Content-Type': 'text/xml'});
          res.end(twiml.toString());
        } else {
          twiml.message(`Invalid username. Please try again`);
          res.writeHead(200, {'Content-Type': 'text/xml'});
          res.end(twiml.toString());
        }
      } else if (req.body.Body.trim().split(" ")[0].toLowerCase() === 'done' && requesterIndex !== -1) {
        // if user sends 'Done @minhto', they signify that the item has been given to @minhto
        // clear pendingRequests
        // text only after verified requester username
        if (requesters.indexOf(requesterUsername) !== -1) {
          User.findOne({phone: req.body.From})
          .then(owner => {
            Item.findByIdAndRemove(owner.pendingRequests[0].itemId)
            .then(item => {
              console.log('removing item', item._id);
              const newPendingRequests = removeRequests(owner.pendingRequests, item._id);
              owner.update({pendingRequests: newPendingRequests})
              .then(resp => {
                twiml.message(`This is to confirm that you have given your item to @${requesterUsername}. Your item will be taken off of Community Market shortly.`);
                res.writeHead(200, {'Content-Type': 'text/xml'});
                res.end(twiml.toString());
              });
            });
          })
          .catch(err => {
            res.json({success: false, failure: err});
          });
        } else {
          // if requester username is Invalid
          twiml.message(`Invalid username. Please try again`);
          res.writeHead(200, {'Content-Type': 'text/xml'});
          res.end(twiml.toString());
        }
      } else {
        twiml.message(`Invalid message. Please ask your mother to teach you how to text again, or refer to our texting manual for more details`);
        res.writeHead(200, {'Content-Type': 'text/xml'});
        res.end(twiml.toString());
      }
    } else {
      twiml.message(`Invalid message. Please ask your mother to teach you how to text again, or refer to our texting manual for more details`);
      res.writeHead(200, {'Content-Type': 'text/xml'});
      res.end(twiml.toString());
    }
  })
  .catch(err => {
    console.log(err);
    res.json({success: false, failure: err});
  });
});

// sends a message to the requester with the name of the fulfiller
router.post('/offer/:requestId', (req, res) => {
  Request.findByIdAndRemove(req.params.requestId)
  .then(request => {
    console.log('request', request);
    const newMessage = {
      to: req.body.to,
      from: process.env.MY_TWILIO_NUMBER,
      body: `${req.body.fulfiller.fName} has offered you their ${request.text}. Your request is being taken off of Community Market`
    };
    client.messages.create(newMessage)
    .then(message => {
      res.json({sucess: true, sId: message.sid});
    });
  })
  .catch(err => {
    res.json({success: false, failure: err});
  });
});

module.exports = router;
