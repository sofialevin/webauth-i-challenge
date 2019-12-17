const express = require('express');

const AuthRouter = require('./auth/auth-router.js');
const UserRouter = require('./users/users-router.js');

const helmet = require('helmet');
const server = express();
const cors = require('cors');

server.use(express.json());
server.use(cors());
server.use(helmet());

server.use('/api/auth', AuthRouter);
server.use('/api/users', UserRouter);

module.exports = server;