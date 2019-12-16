const express = require('express');

const bcrypt = require("bcryptjs");

const Users = require("../users/users-model.js");

const router = express.Router();

router.post('/register', (req, res) => {
  const body = req.body;

  const hash = bcrypt.hashSync(body.password, 14);

  body.password = hash;

  Users.add(body)
    .then(user => {
      res.status(201).json(user);
    })
    .catch(error => {
      res.status(500).json(error);
    })
})

router.post('/login', (req, res) => {
  const { username, password}  = req.body;

  Users.findBy({ username })
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        res.status(200).json({ message: "Logged in!" })
      } else {
        res.status(401).json({ message: "You shall not pass!" })
      }
    })
    .catch(err => {
      res.status(500).json(err)
    })
})

module.exports = router;