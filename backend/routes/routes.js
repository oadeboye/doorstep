const express = require('express');
const router = express.Router();
var models = require('../models/models');
var User = models.User;
var Item = models.Item;
var Community = models.Community;
var Request = models.Request;

// Get the community object as data for the community page
router.get('/community/:id', (req, res) => {

    // Find the community by the given id and populate arrays of Object ids
    Community.findById(req.params.id)
    .populate('users')
    .populate('items')
    .populate('requests')
    .then((community) => {
        if (!community) {
            console.log("Community does not exist");
            return res.json({ success: false, failure: "Community does not exist" });
        }
        else {
            // Send the community json object
            Item.populate(community.items, {path: 'owner'})
            .then((result) => {
                Request.populate(community.requests, {path: 'owner'})
                .then((result) => {
                    return res.json(community);
                });
            });
        }
    })

    .catch(err => {
        console.log(err);
        res.json({ success: false, failure: err });
        return;
    });
});

// GET communities
// retrieves all the communities belonging to a specific user
router.get('/communities/:id', (req, res) => {
  const id = req.params.id;
    Community.find({ users: { $elemMatch: id } })
    .then((communities) => {
        if (!communities) {
            console.log("User ");
            return res.json({success: false, failure: "community does not exist"})
        }
        else {
            // Send the community json object
            console.log("Successfully sent community data");
            return res.json(communities);
        }
    })
    .catch(err => {
        console.log(err);
        return res.json({success: false, failure: err});
    });
});

//  get profile page
router.get('/profile/:profileId', (req, res) => {
    var profile = req.params.profileId;
    User.findById(profile)
    .then(userProfile => {
        if (!userProfile) {
            return res.json({ success: false, failure: "Profile not found." });
        }
        return res.json({success: true, user: userProfile});
    })
    .catch( err =>
        res.json({ success: false, failure: err })
    );
});

module.exports = router;
