var express = require("express");
var router = express.Router();

const User = require("../models/user.js");
const bcrypt = require("bcrypt");
const passport = require("passport");

router.get("/logout", (req, res) => {
  req.logout();
  req.flash("success_msg", "You have logged out");
  res.redirect("/");
});

router.post("/login", (req, res, next) => {
  // res.send('respond with a resource test');
  passport.authenticate("local", {
    successRedirect: "/environment",
    failureRedirect: "/users/login",
    failureFlash: true
  })(req, res, next);
});

router.post("/register", (req, res, next) => {
  // res.send('respond with a resource test');
  const { name, email, password, password2 } = req.body;
  let errors = [];

  console.log("name: " + name + ", email: " + email + ", passwor:" + password);

  /**  Error Checking   **/
  if (!name || !email || !password || !password2) {
    errors.push({ msg: "All required fields cannot be empty" });
  }
  if (password != password2) {
    errors.push({ msg: "Passwords don't match" });
  }
  if (password.length < 6) {
    errors.push({ msg: "password length must be at least6" });
  }

  if (errors.length) {
    res.render("index", { errors, name, email, password, password2 });
  } else {
    User.findOne({ email: email }).exec((err, user) => {
      if (user) {
        errors.push({ msg: "email already registered" });
        res.render("index", { errors, name, email, password, password2 });
      } else {
        const newUser = new User({
          name: name,
          email: email,
          password: password
        });

        // hash passwrod
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) {
              throw err;
            }

            newUser.password = hash;
            newUser
              .save()
              .then(value => {
                console.log("Registered succesfully");
                console.log(value);
                req.flash(
                  "success_message",
                  "You have successfully registered!"
                );
                res.redirect("../environment");
              })
              .catch(err => {
                console.log(err);
                req.flash("error_message", "Registration failed!");
                res.redirect("../");
              });
          });
        });
      }
    });
  }
});

router.post("/subscribe", (req, res) => {
  const { email } = req.body;
  if (!validateEmail(email)) {
    res.render("index", { submitted: "Email invalid" });
  }
  User.findOne({ email: email }).exec((err, user) => {
    if (user) {
      res.render("index", { submitted: "Email already subscribed" });
    } else {
      const newUser = new User({
        password: "empty",
        name: "name",
        email: email
      });
      newUser
        .save()
        .then(() => res.render("index", { submitted: "Stay tuned" }));
    }
  });
});

function validateEmail(email) {
  const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

module.exports = router;
