const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const sessions = require('express-session');

const AuthRouter = require('./auth/auth-router.js');
const UserRouter = require('./users/users-router.js');

const server = express();

const sessionConfiguration = {
  name: 'chocolatechip',
  secret: 'keep it secret, keep it safe',
  saveUninitialized: true,
  resave: false,
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

server.use('/api/auth', AuthRouter);
server.use('/api/users', UserRouter);

module.exports = server;