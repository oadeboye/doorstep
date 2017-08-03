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
  router.post('/register', (req, res) => {
    console.log(req.body.username, req.body.password, req.body.fName, req.body.lName, req.body.email);
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
            lName: req.body.lName
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
  router.post('/login', passport.authenticate('local'), (req, res) => {
    console.log('HERE');
    User.findById(req.session.passport.user)
    .then((user) => {
      res.json({
        success: true,
        user
      });
    });
    // const redirectUrl = '/profile/' + req.session.passport.user ;
    // res.redirect(redirectUrl);
  });

  // GET Logout
  // Ends the session and redirects to login
  router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
  });

  return router;
};

module.exports = auth;
