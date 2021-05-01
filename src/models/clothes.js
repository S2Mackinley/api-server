"use strict";
//This means that Mongoose allows you to define objects with a strongly-typed schema that is mapped to a MongoDB document.
const mongoose = require("mongoose");
//CREATES A VARIABLE AND SET IT TO MONGOOSE.SCHEMA WHICH IS A VALIDATOR
const clothesSchema = mongoose.Schema({
  name: { type: String, required: true },//SETS NAME TO ONLY ALLOW STRINGS AND THAT THEY ARE REQUIRED
  color: { type: String, required: true },//SETS THE COLOR TO BE A STRING AND REQUIRES IT
  size: { type: String, required: true, enum: ['XS', 'S', 'M', 'L', 'XL'] },// SETS THE SIZE TO A STRING THAT MATCHES EXACTLY THE SIZES PROVIDED
});
//CREATES A WRAPPER FOR THE SCHEMA
const clothesModel = mongoose.model("clothes", clothesSchema);
//EXPORTS THE SCHEMA CREATED ON LINE 5
module.exports = clothesModel;