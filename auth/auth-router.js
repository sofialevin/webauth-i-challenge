const express = require('express');

const bcrypt = require("bcryptjs");

const Users = require("../users/users-model.js");

const router = express.Router();

router.post('/register', (req, res) => {
  const body = req.body;

  if (body.username && body.password) {
    const hash = bcrypt.hashSync(body.password, 12);

    body.password = hash;

    Users.add(body)
      .then(user => {
        req.session.username = user.username
        res.status(201).json(user);
      })
      .catch(err => {
        if (err.toString().includes("UNIQUE") && err.toString().includes("users.username")) {
          res.status(400).json({ error: err, message: "User already exists" });
        } else {
          res.status(500).json({ error: err, message: "Oops, something went wrong." });
        }
    })
  } else {
    res.status(400).json({ message: "Please enter a username and password" })
  }
})

router.post('/login', (req, res) => {
  const { username, password}  = req.body;

  Users.findBy({ username })
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        req.session.username = user.username
        res.status(200).json({ message: "Logged in!", user: { username: user.username, id: user.id } })
      } else {
        res.status(401).json({ message: "You shall not pass!" })
      }
    })
    .catch(err => {
      res.status(500).json({
        error: err,
        message: 'Something went wrong.'
      })
    })
})

router.get("/logout", (req, res) => {
  if (req.session) {
    req.session.destroy(error => {
      if (error) {
        res.status(500).json({
          message:
            "Something went wrong.",
        });
      } else {
        res.status(200).json({ message: "Bye!" });
      }
    });
  } else {
    res.status(200).end();
  }
});

module.exports = router;