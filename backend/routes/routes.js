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
            return res.json({failure: "database error"});
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
        res.json({failure: "database error"});
        return;
    });
});

// Adds existing user to community object
router.post('/add-user', (req, res) => {

    var communityId = req.body.communityId;
    User.findOne({username: req.body.username}, (err, user) => {
        Community.findById(communityId)
        .then(community => {
            // If the user already exists in the community
            console.log('found user', user);
            if (community.users.indexOf(user._id) !== -1) {
                console.log("Error: user already exists");
                return res.json({success: true, response: community});
            }
            // Push the user id into the community users array then update in database
            var newUsers = [...community.users];
            newUsers.push(user._id);
            community.update({users: newUsers})
            .then((result) => {
                community.users = newUsers;
                // Send back the community json object with the updated array
                res.json({success: true, response: community});
            });
        })
        .catch(error => {
            console.log(error);
            return res.json({failure: "database error"});
        });
    });
});

// Create a new item within the community, update both commmunity and item sections of database
router.post('/create-item', (req, res) => {

    var communityId = req.body.communityId;

    // Create the new item from the model
    var newItem = new Item({
        name: req.body.name,
        imgURL: req.body.imgURL,
        owner: req.body.owner
    });

    // Save the new item to the Item section in database
    newItem.save()
    .then(item => {
        Community.findById(communityId)
        .then(community => {
            var resultItemsArray = [...community.items];
            resultItemsArray.push(item._id);
            // Push the item id into the community items array then update in database
            community.update({items: resultItemsArray})
            .then(result => {
                community.items = resultItemsArray;
                console.log("You created an item in the commmunity!");
                // Send back the community json object with the updated array
                return res.json({success: true, response: community});
            });
        });
    })
    .catch(err => {
        console.log(err);
        return res.json({failure: "database error"});
    });
});

// Create a new request within the community, update both the community and the request section of database
router.post('/new-request', (req, res) => {

    console.log("BODY", req.body);

    var communityId = req.body.communityId;

    // Create the new request from the model
    var newRequest = new Request({
        owner: req.body.owner,
        text: req.body.text
    });

    // Save the new request to the Reqest section in database
    newRequest.save()
    .then(request => {
        Community.findById(communityId)
        .then(community => {
            var resultRequestArray = [...community.requests];
            resultRequestArray.push(request._id);
            // Push the request id into the community requests array then update in database
            community.update({requests: resultRequestArray})
            .then(result => {
                community.requests = resultRequestArray;
                console.log("Request added to database");
                // Send back the community json object with the updated array
                return res.json({success: true, response: community});
            })
        });
    })
    .catch(err => {
        console.log(err);
        return res.json({failure: "database error"});
    });
})

// Create a new community and post to the database
router.post('/create-community', (req, res) => {

    // Create the new community from the model
    var newCommunity = new Community ({
        name: req.body.name,
        description: req.body.description,
        users: [],
        items: [],
        requests: []
    });
    // Save the community to the database
    newCommunity.save((err, community) => {
        if (err) {
            res.json({failure: "database error"});
        }
        else {
            // Send back the newly-created community json object
            res.json({success: true, response: community})
        }
    })
})

// Get all the communities
router.get('/communities', (req, res) => {
    Community.find({})
    .then((communities) => {
        if (!communities) {
            console.log("No communities exist");
            return res.json({failure: "community does not exist"})
        }
        else {
            // Send the community json object
            console.log("Successfully sent community data");
            return res.json(communities);
        }
    })
    .catch(err => {
        console.log(err);
        return res.json({failure: "database error"});
    });
});

//  get profile page
router.get('/profile/:profileId', (req, res) => {
    var profile = req.params.profileId;
    User.findById(profile)
    .then(userProfile => {
        if (!userProfile) {
            return res.json({failure: "Profile not found!"});
        }
        return res.json({success: true, user: userProfile});
    })
    .catch( err =>
        res.json({failure: "database error", error: err })
    );
});

module.exports = router;
