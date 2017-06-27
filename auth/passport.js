const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const knex = require('../database/knex')
const queries = require('../database/queries')

passport.use( new LocalStrategy(
  (username, password, done) => {
    console.log( "(>'')>  1" )
    queries.findUserbyUsernameAndEmail(username, password, function (err, user) {
      console.log( "=-=-=-> err", err )
      console.log( "=-=-=-> user", user )
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      console.log( "=-=-=-> FINAL", user)
      // if (!user.validPassword(password)) {
      //   return done(null, false, { message: 'Incorrect password.' });
      // }
      return done(null, user);
    });
    done()
  }
));
passport.serializeUser(function(user, done) {
  done(null, user.id);  
})
passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user)
  });
})

module.exports = passport
