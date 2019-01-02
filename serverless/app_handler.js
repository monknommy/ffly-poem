'use strict'
const awsServerlessExpress = require('aws-serverless-express');
const express = require('express');

const app = express();

app.get('/', (req, res) => {
    res.send(req.apiGateway.event);
});

app.get('/test/', (req, res) => {
    res.send(req.query);
});

app.get('/poem/:poem_id', (req, res) => {
    res.send(req.params.poem_id);
});

const server = awsServerlessExpress.createServer(app);
exports.handler = (event, context) => { awsServerlessExpress.proxy(server, event, context) }