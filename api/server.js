const express = require('express');
const actionRouter = require('../actionRouter');
const projectRouter = require('../projectRouter') 

const server = express();


// Router
server.use(express.json());
server.use('/api/projects', projectRouter);
server.use('/api/actions', actionRouter);



module.exports = server;