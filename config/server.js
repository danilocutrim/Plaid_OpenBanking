'use strict';

const express = require('express');
const bodyParser = require('body-parser')

const app = express();

app.use(express.static('public'));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());


module.exports = app;