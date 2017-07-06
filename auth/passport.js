const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const knex = require('../database/knex')
const { User } = require('../database/queries')
const bcrypt = require('bcrypt')

passport.use('local', new LocalStrategy({
  passReqToCallback: true,
  session: true
},
  (req, username, password, done) => {
   User.findUserbyUsername(username, function (error, user) {
     if (!user) {
       return done(null, false, { message: 'Incorrect username.' });
     }
      bcrypt.compare(password, user.password, (error, result) => {
      if (error) { return done(err); }
      if(!result) {
        return done(null, false )
      }
        return done(null, user);
      })
    });
  }
));

passport.serializeUser((user, done) => {
  done(null, user.id);
})

passport.deserializeUser((id, done) => {
  User.findUserById(id, (err, user) => {
    done(err, user)
  });
})

module.exports = passport
