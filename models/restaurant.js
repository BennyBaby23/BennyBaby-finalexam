//Restaurant model class

//require imports interface of mongodb
const mongoose = require('mongoose');
const express = require('express');

//object’s properties variable schema
const schemaDefinition = {

    name: { type: String, required: true },
  address: { type: String, required: true },
  phoneNumber: { type: Number, required: true },
  emailAddress: { type: String},
  rating: { type: Number, max: 10 }
  
}

//schema obj to export
let schemaObj = new mongoose.Schema(schemaDefinition);


module.exports = mongoose.model('restaurant', schemaObj);