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
router.route('/habits/:userId')
  .post(function(req, res){
    if(!req.body.Score){req.body.Score = 0;}
    req.body.Owner = req.params.userId;
    HabitModel.create(req.body, function(err, habit) {
      if(err) {
        return res.status(500).send(err);
      }
      return res.status(201).json(habit);
    });
  });
  //Get all habits for a specified user.
router.route('/habits/user/:userId')
  .get(function(req, res){
    HabitModel.find( {Owner: req.params.userId },function(err, habits){
      if(err){
        res.status(500).send(err);
      }
      res.status(200).json(habits);
    });
  });
  //Returns habit information.
router.route('/habits/:habitId')
  .get(function(req, res){
    HabitModel.findById( req.params.habitId,function(err, habit){
      if(err){
        res.status(500).send(err);
      }
      if(!habit) {
        return res.status(404).send('Not Found');
      }
      res.status(200).json(habit);
    });
  });
  //Increments score for specified habit.
router.route('/habits/increment/:habitId')
  .post(function(req, res){
    if(req.body._id) { delete req.body._id; }
    HabitModel.findById( req.params.habitId,function(err, habit){
      if(err){
        res.status(500).send(err);
      }
      if(!habit) {
        return res.status(404).send('Not Found');
      }
      //Logic for update
      var range = getRange(habit);
      var offset = getScoreOffset(habit);
      switch (range) {
        case 'Green':
          habit.Score += offset/2;
          break;
        case 'Blue':
          habit.Score += 1;
          break;
        default:
          habit.Score += offset;
      }
      habit.save(function (err) {
        if (err) { return handleError(res, err); }
        return res.status(200).json(habit);
      });
    });
  });
  //Decrements score for specified habit.
router.route('/habits/decrement/:habitId')
  .post(function(req, res){
    if(req.body._id) { delete req.body._id; }
    HabitModel.findById( req.params.habitId,function(err, habit){
      if(err){
        res.status(500).send(err);
      }
      if(!habit) {
        return res.status(404).send('Not Found');
      }
      //Logic for update
      var range = getRange(habit);
      var offset = getScoreOffset(habit);
      switch (range) {
        case 'Orange':
          habit.Score -= offset*1.5;
          break;
        case 'Red':
          habit.Score -= offset*2;
          break;
        default:
          habit.Score -= offset;
      }
      habit.save(function (err) {
        if (err) { return handleError(res, err); }
        return res.status(200).json(habit);
      });
    });
  });
  //Deletes a habit.
DELETE
/api/habits/:habitId

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

  function getRange(habit){
    var ranges =[
      {color: 'Red', limit: -Infinity},
      {color: 'Orange', limit: 0},
      {color: 'Yellow', limit: 10},
      {color: 'Green', limit: 40},
      {color: 'Blue', limit: 50}
    ];
    ranges.forEach(function(range){
      if (habit.Score > range.limit){
        return range.color;
      }
    });
  }
  function getScoreOffset(habit){
    return habit.Difficulty === 'Easy'?   2 :
           habit.Difficulty === 'Medium'? 4 : 6;
  }
};
