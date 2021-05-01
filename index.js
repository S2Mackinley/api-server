//turns on strict mode
'use strict';
//This Pulls The Server In
const server = require('./src/server');
//THIS PULLS IN THE .ENV FILE
require('dotenv').config();
//THIS GIVES US THE PORT AT WHICH OUR SERVER LIVES
const PORT = process.env.PORT || 3000;
// This pulls mongoose in
const mongoose = require('mongoose');
// sets up a connecting "string" for connecting to MongoDB
const MONGO_URI = 'mongodb://localhost:27017/food';
// It works cuz Brian said it works
const options = { useNewUrlParser: true, useUnifiedTopology: true };
//this connects us to the database
mongoose.connect(MONGO_URI, options);
//STARTS THE SERVER
server.start(PORT);
