const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const knex = require('../database/knex')
const queries = require('../database/queries')


passport.use('local', new LocalStrategy({
  passReqToCallback: true,
  session: true
},
  (req, username, password, done) => {
    queries.findUserbyUsername(username, function (err, user) {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      if(user.password != password) {
        return done(null, false )
      }
      return done(null, user);
    });
  }
));

passport.serializeUser(function(user, done) {
  done(null, user.id);
})

passport.deserializeUser(function(id, done) {
  queries.findUserById(id, function(err, user) {
    done(err, user)
  });
})

module.exports = passport
