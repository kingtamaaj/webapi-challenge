const express = require('express');
const actionRouter = require('../actionRouter');
const projectRouter = require('../projectRouter') 

const server = express();



// Router
server.use(express.json());
server.use('/api/projects', projectRouter);
server.use('/api/actions', actionRouter);


// custom middleware
server.use(insertName);


server.get('/', (req, res) => {
    const name = (req.name) ? ` ${req.name} ` : '';

    res.send(`<h1> Lambbda ${name} WebAPI Challenge </h1>`);
});


function insertName (req, res, next) {
    req.name = req.name || 'Tamaaj';
    next();
}

module.exports = server;