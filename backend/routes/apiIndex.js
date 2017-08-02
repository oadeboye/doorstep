const express = require('express');
const expressValidator = require('express-validator');

const models = require('../models/models');
const User = models.User;
const Community = models.Community;
const Item = models.Item;
const Request = models.Request;
const router = express.Router();

// POST create new community
// Create a new community and post to the database
// Req.body receives: name, description
router.post('/community', (req, res) => {

  // Create the new community from the model
  const newCommunity = new Community ({
    name: req.body.name,
    description: req.body.description,
    users: [],
    items: [],
    requests: []
  });
  // Save the community to the database
  newCommunity.save((err, community) => {
    if (err) {
      res.json({ success: false, failure: err });
    }
    else {
      // Send back the newly-created community json object
      res.json({ success: true, response: community })
    }
  });
});

// POST create new user
// Adds existing user to community object
// Req.body receives: username, communityId
router.post('/user', (req, res) => {

    User.findOne({username: req.body.username}, (err, user) => {
    Community.findById(req.body.communityId)
    .then(community => {
      // If the user already exists in the community, send an error
      console.log('found user', user);
      if (community.users.indexOf(user._id) !== -1) {
        console.log("Error: user already exists");
        res.json({ success: true, response: community });
      } else {
        // Otherwise, push the valid user id into the community users array then update in database
        const newUsers = [...community.users];
        newUsers.push(user._id);
        community.update({ users: newUsers })
        .then((result) => {
          community.users = newUsers;
          // Send back the community json object with the updated array
          res.json({ success: true, response: community });
        });
      }
    })
    .catch(error => {
      console.log(error);
      res.json({ success: false, failure: error });
    });
  });
});

// POST create new item
// Update both commmunity and item sections of database
// Req.body receives: name, imgURL, owner, communityId
router.post('/item', (req, res) => {

  // Create the new item from the model
  const newItem = new Item({
    name: req.body.name,
    imgURL: req.body.imgURL,
    owner: req.body.owner
  });

  // Save the new item to the Item section in database
  newItem.save()
  .then(item => {
    Community.findById(req.body.communityId)
    .then(community => {
      const resultItemsArray = [...community.items];
      resultItemsArray.push(item._id);
      // Push the item id into the community items array then update in database
      community.update({ items: resultItemsArray })
      .then(result => {
        community.items = resultItemsArray;
        console.log("You created an item in the commmunity!");
        // Send back the community json object with the updated array
        return res.json({ success: true, response: community });
      });
    })
  })
  .catch(err => {
    console.log(err);
    return res.json({ success: false, failure: err });
  });
});

// POST create new request
// Create a new request within the community
// update both the community and the request section of database
// Req.body receives: owner, text, communityId
router.post('/request', (req, res) => {

  // Create the new request from the modal
  const newRequest = new Request({
    owner: req.body.owner,
    text: req.body.text
  });

  // Save the new request in database
  newRequest.save()
  .then(request => {
    Community.findById(req.body.communityId)
    .then(community => {
      const resultRequestArray = [...community.requests];
      resultRequestArray.push(request._id);
      // Push the request id into the community requests array then update in database
      community.update({requests: resultRequestArray})
      .then(result => {
        community.requests = resultRequestArray;
        console.log("Request added to database");
        // Send back the community json object with the updated array
        return res.json({ success: true, response: community });
      });
    })
  })
  .catch(err => {
    console.log(err);
    return res.json({ success: false, failure: "database error" });
  });
});

router.post('/search/users', (req, res) => {
  // Retrieve 20 users with username containing input string
  User.find({ $text: { $search: req.body.input } })
  .limit(20)
  //ask if this retrieves an array of objects or individual objects
  .then((foundUsers) => {
    res.json({success: true, users: foundUsers});
  })
  .catch((err) => {
    res.json({ success: false, failure: err });
  });
});

router.post('/search/communities', (req, res) => {
  User.find({ $text: { $search: req.body.input } })
  .limit(20)
  .then((foundCommunities) => {
    res.json({ success: true, communities: foundCommunities})
  })
  .catch((error) => {
    res.json({ success: false, failure: error });
  });
});

module.exports = router;
