const express = require('express');

const bcrypt = require("bcryptjs");

const Users = require("../users/users-model.js");

const router = express.Router();

router.post('/register', (req, res) => {
  console.log("test")
  let body = req.body;

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

module.exports = router;