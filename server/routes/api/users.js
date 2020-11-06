const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
// Load input validation
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");


// @route POST api/users/register
// @desc Register user
// @access Public
router.post("/register", (req, res) => {
  const Airtable = require('airtable');
  const base = new Airtable({apiKey: `${process.env.AIRTABLE_API_KEY}`}).base(`${process.env.AIRTABLE_DB_ID}`);
  // Form validation
  const { errors, isValid } = validateRegisterInput(req.body);
// Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  let isCreated = false, hashedPassword = "";
  base('Users').select({
    filterByFormula: `OR(key = '${req.body.email}', username = '${req.body.username}')`,
    view: "Grid view"
  }).eachPage(function page(records, fetchNextPage) {
    // This function (`page`) will get called for each page of records.
    if(records.length) {
      isCreated = true;
    }
    // To fetch the next page of records, call `fetchNextPage`.
    // If there are more records, `page` will get called again.
    // If there are no more records, `done` will get called.
    fetchNextPage();
  
  }, function done(err) {
    if (err) { console.error(err); return; }
    if(isCreated) {
      return res.status(400).json({ message: "Email or username already exists!" });
    } else {
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(req.body.password, salt, (err, hash) => {
          if (err) throw err;
          hashedPassword = hash;
          base('Users').create([
            {
              "fields": {
                "Password": hashedPassword,
                "First Name": req.body.firstname,
                "Last Name": req.body.lastname,
                "email": req.body.email,
                "username": req.body.username
              }
            }
          ], function(err) {
            if (err) {
              console.error(err);
              return;
            }
            res.json({message : "User successfully created!"});
          });
        });
      });
    }
  });
});

// @route POST api/users/login
// @desc Login user and return JWT token
// @access Public
router.post("/login", (req, res) => {
  const Airtable = require('airtable');
  const base = new Airtable({apiKey: `${process.env.AIRTABLE_API_KEY}`}).base(`${process.env.AIRTABLE_DB_ID}`);
  // Form validation
  const { errors, isValid } = validateLoginInput(req.body);
  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const identifier = req.body.identifier
  const password = req.body.password;
  // Find user by email or username
  let userExist = false;
  base('Users').select({
    filterByFormula: `OR(key = '${identifier}', username = '${identifier}')`,
    view: "Grid view"
  }).eachPage(function page(records, fetchNextPage) {
    // This function (`page`) will get called for each page of records.
    if(records.length) {
      const currentUser = records[0];
      userExist = true;
      bcrypt.compare(password, currentUser.get('Password')).then(isMatch => {
        if (isMatch) {
          // User matched
          // Create JWT Payload
          const payload = {
            key: currentUser.get("key")
          };
          // Sign token
          jwt.sign(
            payload,
            "secret",
            {
              expiresIn: 31556926 // 1 year in seconds
            },
            (err, token) => {
              res.json({
                success: true,
                token: "Bearer " + token
              });
            }
          );
        } else {
          return res
            .status(400)
            .json({ passwordincorrect: "Password incorrect" });
        }
      });
    }
    // To fetch the next page of records, call `fetchNextPage`.
    // If there are more records, `page` will get called again.
    // If there are no more records, `done` will get called.
    fetchNextPage();
  
  }, function done(err) {
    if (err) { console.error(err); return; }
    if(!userExist) {
      return res.status(404).json({ message: "Email or username not found" });
    }
  });
});

module.exports = router;