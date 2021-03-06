const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const expressValidator = require('express-validator');

const PORT = process.env.PORT || 3000;
const routes = require('./backend/routes/routes');
const twilioRoutes = require('./backend/routes/twilioRoutes');
const auth = require('./backend/routes/auth');
const mailer = require('./backend/routes/mailer');
const { User } = require('./backend/models/models');
const hashPassword = require('./backend/helper/hashPassword');

const app = express();

const connect = process.env.MONGODB_URI || require('./models/connect');
mongoose.connect(connect);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(expressValidator());

// passport setup
app.use(session({
  secret: 'HELLO MY NAME IS BOB',
  resave: false,
  saveUninitialized: false,
  store: new MongoStore({mongooseConnection: mongoose.connection})
}));

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});


passport.use(new LocalStrategy((username, password, done) => {
  const hash = hashPassword(password);
  // Find the user with the given username
  User.findOne({username: username})
    .then((user) => {
      // If no user is present, authentication failed
      if (!user) {
        console.log('USER NOT FOUND', user);
        return done(null, false, {message: 'Incorrect username.'});
      }
      // If passwords do not match, authentication failed
      if (user.password !== hash) {
        return done(null, false, {message: 'Incorrect password.'});
      }
      // Authentication succeeded
      return done(null, user);
    })
    .catch((err) => {
      console.log(err);
      return done(err);
    });
}));

// Use the API and authentication routes
app.use('/api/auth', auth(passport));
app.use('/api', routes);
app.use('/twilio', twilioRoutes);
app.use('/mail', mailer);

app.use('/', (request, response) => {
    response.sendFile(__dirname + '/public/index.html'); // For React/Redux
});

app.listen(PORT, error => {
    error
    ? console.error(error)
    : console.info(`==> 🌎 Listening on port ${PORT}. Visit http://localhost:${PORT}/ in your browser.`);
});
