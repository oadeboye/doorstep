const express = require('express');
const expressValidator = require('express-validator');

const router = express.Router();
const User = require('../models/models').User;
const hashPassword = require('../helper/hashPassword');


const auth = (passport) => {
  //POST Registration
  router.post('/register', (req, res) => {

    const password = hashPassword(req.body.password);

    // Express validation here
    req.check('password', 'Password must be at least 6 characters long').isLength({min: 6})
    req.check('fName', 'First Name field must not be empty').notEmpty();
    req.check('lName', 'Last Name field must not be empty').notEmpty();
    req.check('username', 'Username must not be empty').notEmpty();

    const newUser = new User({
      username: req.body.username,
      password,
      fName: req.body.fName,
      lName: req.body.lName
    });

    newUser.save()
    .then(() => {
      res.send({success: true});
      res.redirect('/login');
    })
    .catch((error) => {
      res.send({ success: false, failure: error });
    });

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
