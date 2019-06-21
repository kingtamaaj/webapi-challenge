const express = require('express');
const server = express();
const actionRouter = require('./actionRouter');
const projectRouter = require('./projectRouter') 


server.use(express.json());


// Router
server.use('/api/projects', projectRouter);
server.use('/api/actions', actionRouter);



server.use((error, req, res, next) => {
    res.status(400).json({ message: 'Error' , error });
})

module.exports = server;