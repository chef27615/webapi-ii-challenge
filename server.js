const express = require('express');
const postRouter = require('./data/post-router');

const server = express();


server.use(express.json());

server.use('/api/posts', postRouter);

server.get('/', (req, res) => {
    res.send(`<h1>Hello</h1>`)
})

module.exports = server;