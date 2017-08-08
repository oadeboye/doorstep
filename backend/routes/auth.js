const express = require('express');
const expressValidator = require('express-validator');
// const google = require('googleapis');

const router = express.Router();
const User = require('../models/models').User;
const hashPassword = require('../helper/hashPassword');

// //Google oauth setup here
// const OAuth2 = google.auth.OAuth2;
// const oauth2Client = new OAuth2(
//   process.env.GOOGLE_CLIENT_ID,
//   process.env.GOOGLE_CLIENT_SECRET,
//   'http://bb9c46d7.ngrok.io/'
// );
// const scopes = [
//   'https://www.googleapis.com/auth/plus.me'
// ];


const auth = (passport) => {
  // POST Registration
  // Req.body receives: username, fName, lName, password, email
  router.post('/register', (req, res) => {
    const password = hashPassword(req.body.password);

    // Express validation here
    req.check('password', 'Password must be at least 6 characters long').isLength({min: 6});
    req.check('fName', 'First Name field must not be empty').notEmpty();
    req.check('lName', 'Last Name field must not be empty').notEmpty();
    req.check('username', 'Username must not be empty').notEmpty();
    req.check('email', 'Must enter a valid email').notEmpty();
    const errors = req.validationErrors();

    if (errors) {
      console.log(errors);
      res.json({success: false, failure: errors});
    } else {
      User.find({ username: req.body.username })
      .then((user) => {
        if (user.length) {
          console.log("FOUND USERNAME", user);
          res.json({success: false, failure: [{msg: "Username already exists", param: "username"}]});
        } else {
          const newUser = new User({
            username: req.body.username,
            password,
            email: req.body.email,
            fName: req.body.fName,
            lName: req.body.lName,
            stats: [0, 0, 0]
          });
          return newUser.save();
        }
      })
      .then(() => {
        console.log("SUCCESSFUL REGISTRATION");
        res.json({success: true});
      })
      .catch((err) => {
        console.log("UNSUCCESSFUL REGISTRATION", err);
        res.json({ success: false, failure: err.message });
      });
    }
  });

  // POST Login
  // Req.body receives: username, password
  router.post('/login', passport.authenticate('local'), (req, res) => {
    User.findById(req.session.passport.user)
    .then((user) => {
      console.log("JUST LOGGED IN YO!");
      res.json({
        success: true,
        user
      });
    })
    .catch((err) => {
      console.log("ERROR LOGGING IN", err);
      res.json({ success: false, error: err });
    });
    // const redirectUrl = '/profile/' + req.session.passport.user ;
    // res.redirect(redirectUrl);
  });

  // GET Logout
  // Ends the session and redirects to login
  router.get('/logout', (req, res) => {
    req.logout();
    res.json({ success: true, message: 'User successfully logged out'});
  });

  return router;
};

module.exports = auth;
