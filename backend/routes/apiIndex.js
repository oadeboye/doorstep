const express = require('express');
const router = express.Router();

// POST create new user
// Adds existing user to community object
router.post('/user', (req, res) => {

    const communityId = req.body.communityId;
    User.findOne({username: req.body.username}, (err, user) => {
        Community.findById(communityId)
        .then(community => {
            // If the user already exists in the community
            console.log('found user', user);
            if (community.users.indexOf(user._id) !== -1) {
                console.log("Error: user already exists");
                return res.json({ success: true, response: community });
            }
            // Push the user id into the community users array then update in database
            const newUsers = [...community.users];
            newUsers.push(user._id);
            community.update({ users: newUsers })
            .then((result) => {
                community.users = newUsers;
                // Send back the community json object with the updated array
                res.json({ success: true, response: community });
            });
        })
        .catch(error => {
            console.log(error);
            return res.json({ success: false, failure: error });
        });
    });
});

// POST create new item
// Update both commmunity and item sections of database
router.post('/item', (req, res) => {

    const communityId = req.body.communityId;

    // Create the new item from the model
    const newItem = new Item({
        name: req.body.name,
        imgURL: req.body.imgURL,
        owner: req.body.owner
    });

    // Save the new item to the Item section in database
    newItem.save()
    .then(item => {
        Community.findById(communityId)
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
        });
    })
    .catch(err => {
        console.log(err);
        return res.json({ success: false, failure: err });
    });
});

// Create a new request within the community, update both the community and the request section of database
router.post('/request', (req, res) => {

    const communityId = req.body.communityId;

    // Create the new request from the modal
    const newRequest = new Request({
        owner: req.body.owner,
        text: req.body.text
    });

    // Save the new request to the Reqest section in database
    newRequest.save()
    .then(request => {
        Community.findById(communityId)
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
            })
        });
    })
    .catch(err => {
        console.log(err);
        return res.json({ success: false, failure: "database error" });
    });
});

// POST create new community
// Create a new community and post to the database
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

module.exports = router;
