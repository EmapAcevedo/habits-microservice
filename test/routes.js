var should = require('should');
var assert = require('assert');
var request = require('supertest');
var mongoose = require('mongoose');
var winston = require('winston');
var config = require('./config-debug');

describe('Habit Routes', function() {
  var url = 'http://someurl.com';
  var habitId;
  before(function(done) {
    // use the test db
    //add mock entries to DB here
    mongoose.connect(config.db.mongodb);
    done();
  });
  describe('Create', function() {
    it('should return error if missing Difficulty', function (done){
      var habit = {
        Description: "Test my APIs",
        Type: "Good"
        //missing Difficulty: "Hard"
      };
      request(url)
      .post('/habits/foo.bar@mail')
      .send(habit)
      .end(function(err,res){
        if(err){throw err;}
        res.should.have.status(500);
        done();
      });
    });
    it('should return error if missing Type', function (done){
      var habit = {
        Description: "Test my APIs",
        //Missing Type: "Good",
        Difficulty: "Hard"
      };
      request(url)
      .post('/habits/foo.bar@mail')
      .send(habit)
      .end(function(err,res){
        if(err){throw err;}
        res.should.have.status(500);
        done();
      });
    });
    it('should return error if missing Description', function (done){
      var habit = {
        //Missing Description: "Test my APIs",
        Type: "Good",
        Difficulty: "Hard"
      };
      request(url)
      .post('/habits/foo.bar@mail')
      .send(habit)
      .end(function(err,res){
        if(err){throw err;}
        res.should.have.status(500);
        done();
      });
    });
    it('should return error if Type is not valid (Good|Bad|Both)', function (done){
      var habit = {
        Description: "Test my APIs",
        Type: "Nice",
        Difficulty: "Hard"
      };
      request(url)
      .post('/habits/foo.bar@mail')
      .send(habit)
      .end(function(err,res){
        if(err){throw err;}
        res.should.have.status(500);
        done();
      });
    });
    it('should return error if Difficulty is not valid (Easy|Medium|Hard)', function (done){
      var habit = {
        Description: "Test my APIs",
        Type: "Good",
        Difficulty: "Extreme"
      };
      request(url)
      .post('/habits/foo.bar@mail')
      .send(habit)
      .end(function(err,res){
        if(err){throw err;}
        res.should.have.status(500);
        done();
      });
    });
    it('should return the created object on success', function (done){
      var habit = {
        Description: "Test my APIs",
        Type: "Good",
        Difficulty: "Hard"
      };
      request(url)
      .post('/habits/foo.bar@mail')
      .send(habit)
      .expect('Content-Type', /json/)
      .expect(201) //Status Code
      .end(function(err,res){
        if(err){throw err;}
        res.body.should.have.property('_id');
        res.body.Owner.should.equal('foo.bar@mail');
        res.body.Description.should.equal(habit.Description);
        res.body.Type.should.equal(habit.Type);
        res.body.Difficulty.shoud.equal(habit.Difficulty);
        res.body.Score.should.equal(0);
        done();
      });
    });
  });
  describe('Get All', function() {

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




});
