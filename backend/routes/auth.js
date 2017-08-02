const express = require('express');
const expressValidator = require('express-validator');

const router = express.Router();
const User = require('../models/models').User;
const hashPassword = require('../helper/hashPassword');


const auth = (passport) => {
  //POST Registration
  router.post('/register', (req, res) => {
    console.log(req.body.username, req.body.password, req.body.fName, req.body.lName);
    const password = hashPassword(req.body.password);

    // Express validation here
    req.check('password', 'Password must be at least 6 characters long').isLength({min: 6})
    req.check('fName', 'First Name field must not be empty').notEmpty();
    req.check('lName', 'Last Name field must not be empty').notEmpty();
    req.check('username', 'Username must not be empty').notEmpty();
    const errors = req.validationErrors();

    if (errors){
      console.log(errors);
      res.json({success: false, failure: errors});
    } else {
      User.find({ username: req.body.username })
      .then((user) => {
        if (user.length){
          console.log("FOUND USERNAME", user);
          throw new Error("Username already exists");
        } else {
          console.log("CREATING NEW USER");
          const newUser = new User({
            username: req.body.username,
            password,
            fName: req.body.fName,
            lName: req.body.lName
          });
          console.log("CREATED");
          return newUser.save()
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
    res.json({
      success: true,
      userId: req.session.passport.user
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

}

module.exports = auth;
