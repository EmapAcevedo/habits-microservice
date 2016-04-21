# habits-microservice
##Description
The objective of the habits microservice is to manage the information regarding the habits. It will keep track of each habit and its parameters: description, type, difficulty, score and its owner. Type is represented as a string, it can be either “Good”, “Bad” or “Both”. Difficulty is also represented as a string, with possible values being “Easy”, “Medium” and “Hard”. Difficulty will affect score, represented as number, calculation, having a base addition of 2, 4, 6 points respectively when incremented. Increment is also affected by the current score.
## Routes

HTTP VERB|URI|ACTION
---------|---|------
POST|/api/habits/:userId|Creates a new habit for the user.
GET|/api/habits/user/:userId|Get all habits for a specified user.
DELETE|/api/habits/user/:userId|Delete all habits for a specified user.
GET|/api/habits/:habitId|Returns habit information.
DELETE|/api/habits/:habitId|Deletes a habit.
POST|/api/habits/increment/:habitId|Increments score for specified habit.
POST|/api/habits/decrement/:habitId|Decrements score for specified habit.
GET|/api/habits/report/:userId|Returns a report of the given user habits.

## Installing
Requires Node.js and mongo installed.

1. Download the project and dependencies
``` bash
git clone https://github.com/YoabP/habits-microservice.git
```
``` bash
cd habits-microservice
```
``` bash
npm install
```
2. Start the mongo daemon, may need to be run on another console.
``` bash
mongod
```
3. Optionally set the enviroment
``` bash
export NODE_ENV = <"debug" || "development" || "production">
export port= <port>
```
4. Start the server
``` bash
node server/index.js
```
## Testing
1. Run server on debug mode
``` bash
export NODE_ENV = "debug"
node server/index.js
```
2. Run tests
``` bash
npm test
```
