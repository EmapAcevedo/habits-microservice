/**
* Main app routes
*/
'use strict';

var express    = require('express');
var MovieModel = require('./models/movie');
var HabitModel = require('./models/habit');

module.exports = function(app){
  //Routes for the API
  var router = express.Router();

  router.use(function(req, res, next) {
    next();
  });

  //general routes
  router.get('/', function(req,res){
    res.json({
      provider: 'http://api.movie-tracking.com',
      owner: 'Yoab Pizarro',
      contact: 'yoab [dot] pizarro [at] gmail [dot] com'
    });
  });
  //API Habits routes
  //Creates a new habit for the user.
  router.route('/habits/:userId').post(function(req, res){
    if(!req.body.Score){req.body.Score = 0;}
    req.body.Owner = req.params.userId;
    HabitModel.create(req.body, function(err, movie) {
      if(err) {
        return res.status(500).send(err);
      }
      return res.status(201).json(movie);
    });
  });
GET
/api/habits/user/:userId
Get all habits for a specified user.
GET
/api/habits/:habitId
Returns habit information.
POST
/api/habits/ increment/:habitId
Increments score for specified habit.
POST
/api/habits/ decrement/:habitId
Decrements score for specified habit.
DELETE
/api/habits/:habitId
Deletes a habit.
GET
/api/habits/report/:userId
Returns a report of the given user habits.

  //API routes
  router.route('/movies')
    .get(function(req, res){
      MovieModel.find(function(err, movies){
        if(err){
          res.status(500).send(err);
        }
        res.status(200).json(movies);
      });
    });
  router.route('/movies')
    .post(function(req, res){
      MovieModel.create(req.body, function(err, movie) {
        if(err) {
          return res.status(500).send(err);
        }
        return res.status(201).json(movie);
      });
    });
  router.route('/movies')
    .delete(function(req, res){
      MovieModel.findById(req.body.id, function (err, movie) {
        if(err) {
          return res.status(500).send(err);
        }
        if(!movie) {
          return res.status(404).send('Not Found');
        }
        movie.remove(function(err) {
          if(err) {
            return res.status(500).send(err);
          }
          return res.status(204).send('No Content');
        });
      });
    });
  app.use('/api', router);
};
