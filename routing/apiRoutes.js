var path = require("path");

// ===============================================================================
// LOAD DATA
// We are linking our routes to a series of "data" sources.
// These data sources hold arrays of information on table-data, waitinglist, etc.
// ===============================================================================
var friends = require("../data/friends");
// ===============================================================================
// ROUTING
// ===============================================================================
module.exports = function(app) {
  // API GET Requests
  // Get all friends
app.get("/api/friends", function(req, res) {
  res.json(friends);
});
  // ---------------------------------------------------------------------------

  // API POST Requests
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
  // ---------------------------------------------------------------------------
};