'use strict';

//dependencies
var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

//define Schema
var habitSchema = new Schema ({
  Owner: { type: String, required: true},
  Description: { type: String, required: true},
  Type: { type: String, required: true, enum: ['Good','Bad', 'Both']},
  Difficulty: { type: String, required: true, enum: ['Easy','Medium', 'Hard']},
  Score: Number
});

module.exports = mongoose.model('Habit', habitSchema);
