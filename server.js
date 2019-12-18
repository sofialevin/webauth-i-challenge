const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const sessions = require('express-session');
const KnexSessionStore = require("connect-session-knex")(sessions);

const AuthRouter = require('./auth/auth-router.js');
const UserRouter = require('./users/users-router.js');
const knex = require("./data/db-config.js");

const server = express();

const sessionConfiguration = {
  name: 'chocolatechip',
  secret: 'keep it secret, keep it safe',
  saveUninitialized: true,
  resave: false,
  store: new KnexSessionStore({
    // DO NOT FORGET THE new KEYWORD
    knex, // imported from dbConfig.js
    createtable: true,

    // optional
    clearInterval: 1000 * 60 * 10, // defaults to 6000
    sidfieldname: "sid",
    tablename: "sessions",
  }),
  cookie: {
    maxAge: 1000 * 60 * 10,
    secure: false,
    httpOnly: true
  }
}

server.use(express.json());
server.use(cors());
server.use(helmet());
server.use(sessions(sessionConfiguration));

server.use('/api', AuthRouter);
server.use('/api/users', UserRouter);

module.exports = server;