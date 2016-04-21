/**
* Main app routes
*/
'use strict';

var express    = require('express');
var HabitModel = require('./models/habit');
var HabitUtils = require('./models/habit.utils');

module.exports = function(app){
//Routes for the API
var router = express.Router();

router.use(function(req, res, next) {
  next();
});

//general routes
router.get('/', function(req,res){
  res.json({
    microservice: 'habits-microservice',
    owner: 'Yoab Pizarro'
  });
});
//API Habits routes
  //Creates a new habit for the user.
router.route('/habits/:userId')
  .post(function(req, res){
    req.body.Score = 0;
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
        return res.status(500).send(err);
      }
      return res.status(200).json(habits);
    });
  });

  //Delete all habits for a specified user.
router.route('/habits/user/:userId')
  .delete(function(req, res){
    HabitModel.remove({Owner: req.params.userId }, function (err) {
      if(err){
        return res.status(500).send(err);
      }
      return res.status(204).send('No Content');
    });
  });

  //Returns habit information.
router.route('/habits/:habitId')
  .get(function(req, res){
    HabitModel.findById( req.params.habitId,function(err, habit){
      if(err){
        return res.status(500).send(err);
      }
      if(!habit) {
        return res.status(404).send('Not Found');
      }
      return res.status(200).json(habit);
    });
  });
  //Increments score for specified habit.
router.route('/habits/increment/:habitId')
  .post(function(req, res){
    if(req.body._id) { delete req.body._id; }
    HabitModel.findById( req.params.habitId,function(err, habit){
      if(err){
        return res.status(500).send(err);
      }
      if(!habit) {
        return res.status(404).send('Not Found');
      }
      var inc = HabitUtils.getScoreIncrement(habit);
      habit.Score += inc;
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
        return res.status(500).send(err);
      }
      if(!habit) {
        return res.status(404).send('Not Found');
      }
      //Logic for update
      var dec = HabitUtils.getScoreDecrement(habit);
      habit.Score -= dec;
      habit.save(function (err) {
        if (err) { return handleError(res, err); }
        return res.status(200).json(habit);
      });
    });
  });
  //Deletes a habit.
router.route('/habits/:habitId')
  .delete(function(req, res){
    HabitModel.findById(req.params.habitId, function (err, habit) {
      if(err) {
        return res.status(500).send(err);
      }
      if(!habit) {
        return res.status(404).send('Not Found');
      }
      habit.remove(function(err) {
        if(err) {
          return res.status(500).send(err);
        }
        return res.status(200).json(habit);
      });
    });
  });
  //Returns a report of the given user habits.
router.route('/habits/report/:userId')
  .get(function(req, res){
    HabitModel.find( {Owner: req.params.userId },function(err, habits){
      if(err){
        return res.status(500).send(err);
      }
      //create Report
      var report = {
        Range: {
          Red : 0,
          Orange : 0,
          Yellow : 0,
          Green : 0,
          Blue : 0
        },
        Worst: {Score: Infinity},
        Best: {Score: -Infinity}
      };
      habits.forEach(function(habit, index){
        var range = HabitUtils.getRange(habit);
        report.Range[range]++;
        if(habit.Score > report.Best.Score){
          report.Best = habit;
        }
        if(habit.Score < report.Worst.Score){
          report.Worst = habit;
        }
      });
      return res.status(200).json(report);
    });
  });
  app.use('/api', router);
};
