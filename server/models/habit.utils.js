module.exports.getRange = function(habit){
  var ranges =[
    {color: 'Red', limit: -Infinity},
    {color: 'Orange', limit: 0},
    {color: 'Yellow', limit: 10},
    {color: 'Green', limit: 40},
    {color: 'Blue', limit: 50}
  ];
  var color = null;
  ranges.forEach(function(range){
    if (habit.Score >= range.limit){
      color = range.color;
    }
  });
  return color;
}
module.exports.getScoreOffset = function(habit){
  return habit.Difficulty === 'Easy'?   2 :
         habit.Difficulty === 'Medium'? 4 : 6;
}
module.exports.getScoreIncrement = function(habit){
  var range = module.exports.getRange(habit);
  var offset = module.exports.getScoreOffset(habit);
  switch (range) {
    case 'Green':
      return offset/2;
      break;
    case 'Blue':
      return 1;
      break;
    default:
      return offset;
  }
}
module.exports.getScoreDecrement = function (habit){
  var range = module.exports.getRange(habit);
  var offset = module.exports.getScoreOffset(habit);
  switch (range) {
    case 'Orange':
      return offset*1.5;
      break;
    case 'Red':
      return offset*2;
      break;
    default:
      return offset;
  }
}
