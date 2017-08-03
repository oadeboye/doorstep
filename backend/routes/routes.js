const express = require('express');
const router = express.Router();
const models = require('../models/models');
const User = models.User;
const Item = models.Item;
const Community = models.Community;
const Request = models.Request;

// GET profile page
// Retrieves user information from database for their profile
// Req.params.id is user's database id
router.get('/profile/:id', (req, res) => {
  User.findById(req.params.id)
  .then( userProfile => {
    if (!userProfile) {
      return res.json({ success: false, failure: "Profile not found." });
    }
    return res.json({success: true, user: userProfile});
  })
  .catch( err =>
    res.json({ success: false, failure: err })
  );
});

// GET communities
// Retrieves all the communities belonging to a specific user
// Req.params.id is user's database id
router.get('/communities/:id', (req, res) => {
  const id = req.params.id;
  Community.find({ users: { $elemMatch: id } })
  .then((communities) => {
    if (!communities) {
      console.log("User ");
      return res.json({success: false, failure: "community does not exist"});
    }
    console.log("Successfully sent community data", communities);
    return res.json(communities);
  })
  .catch(err => {
    console.log(err);
    return res.json({success: false, failure: err});
  });
});

// GET specific community information
// retrieves specific community information from database for the community page
router.get('/community/:communityId', (req, res) => {
  // Find the community by the given id and populate arrays of Object ids
  Community.findById(req.params.communityId)
  .populate('users')
  .populate('items')
  .populate('requests')
  .then((community) => {
    if (!community) {
      console.log("Community does not exist");
      return res.json({ success: false, failure: "Community does not exist" });
    }
    // Send the community json object
    return Item.populate(community.items, {path: 'owner'})
    .then((result) => {
      Request.populate(community.requests, {path: 'owner'})
      .then((result) => {
        return res.json(community);
      });
    });
  })
  .catch(err => {
    console.log(err);
    res.json({ success: false, failure: err });
    return;
  });
});

// GET edit user profile
// Retrieves user information from database,
// feeds form for users to edit their profile
router.get('/edit-profile/:id', (req, res) => {
  User.findById(req.params.id)
  .then( profile => {
    res.json({success: true, profile});
  })
  .catch( err => {
    res.json({success: false, failure: err});
  });
});

// POST edit user profile
// Updates user model in database with user information from body
// Req.body receives: id, username, fName, lName, aboutMe
router.post('/edit-profile', (req, res) => {
  User.findById(req.body.id)
  .then( profile => {
    profile.username = req.body.username;
    profile.fName = req.body.fName;
    profile.lName = req.body.lName;
    profile.aboutMe = req.body.aboutMe;
    profile.save();
  })
  .catch((err) => {
    res.json({success: false, failure: err});
  });
});

// GET edit community profile
// Retrieves community information from database,
// feeds form for users to edit the community's profile
router.get('/edit-community/:communityId', (req, res) => {
  User.findById(req.params.communityId)
  .then( community => {
    res.json({success: true, community});
  })
  .catch( err => {
    res.json({success: false, failure: err});
  });
});

// POST edit community profile
// Updates community model in database with community information from body
// Req.body receives: name, description, communityId
router.post('/edit-community', (req, res) => {
  Community.findById(req.body.communityId)
  .then( community => {
    community.name = req.body.name;
    community.description = req.body.description;
    community.save();
  })
  .catch((err) => {
    res.json({success: false, failure: err});
  });
});


module.exports = router;
