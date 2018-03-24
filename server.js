// Dependencies
// =============================================================
var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = 3000;

// Sets up the Express app to handle data parsing
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Star Wars Characters (DATA)
// =============================================================
var friends = [
  {
  "name":"Ahmad",
  "photo":"https://images.pexels.com/photos/69212/pexels-photo-69212.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=100&w=150",
  "scores":[
      '5',
      '1',
      '4',
      '4',
      '5',
      '1',
      '2',
      '5',
      '4',
      '1'
    ]
  },
  {
  "name":"Suzy",
  "photo":"https://images.pexels.com/photos/175680/pexels-photo-175680.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=100&w=150",
  "scores":[
      '3',
      '1',
      '4',
      '1',
      '2',
      '1',
      '5',
      '2',
      '4',
      '5'
    ]
  },
  {
  "name":"Brenda",
  "photo":"https://images.pexels.com/photos/949382/pexels-photo-949382.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=100&w=150",
  "scores":[ '3', '3', '3', '3', '3', '1', '1', '5', '5', '2' ]
  },
  {
  "name":"Boingo",
  "photo":"https://images.pexels.com/photos/428340/pexels-photo-428340.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=100&w=150",
  "scores":[ '1', '2', '3', '3', '4', '2', '1', '5', '5', '1' ]
  }
];

// Routes
// =============================================================

// Basic route that sends the user first to the AJAX Page
app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "./public/home.html"));
});

app.get("/survey", function(req, res) {
  res.sendFile(path.join(__dirname, "./public/survey.html"));
});

// Get all friends
app.get("/api/friends", function(req, res) {
  res.json(friends);
});

// Accept New friends - takes in JSON input
app.post("/api/friends", function(req, res) {
  // req.body hosts is equal to the JSON post sent from the user
  // This works because of our body-parser middleware
  // var newcharacter = req.body;
  var newFriend = req.body;
  // Using a RegEx Pattern to remove spaces from newFriend
  // You can read more about RegEx Patterns later https://www.regexbuddy.com/regex.html
  // newcharacter.routeName = newcharacter.name.replace(/\s+/g, "").toLowerCase();
  // newFriend.name = newFriend.name.replace(/\s+/g, "").toLowerCase();


  // create a loop to iterate through the friends array and then create 
  // a nested loop to iterate through that friends survey scores
        var totDiff;
        var mostCompID = 0;
        var currMostComp;
        friends.forEach(function(item, i, friend){
          totDiff = 0;
          friends[i].scores.forEach(function(item2, j, score){
            var curAnsOF = parseInt(score[j]);
            var curAnsNF = parseInt(newFriend.scores[j]);
            totDiff += Math.abs(curAnsOF - curAnsNF);
          });
          // first time through, arbitrarily set most compatible to this friend
          if (i == 0) {
            currMostComp = totDiff;
          } else if (totDiff < currMostComp){
            mostCompID = i;
            currMostComp = totDiff;
          };
        });


  friends.push(newFriend);
  console.log(friends[mostCompID]);
  res.json(friends[mostCompID]);
});

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});
