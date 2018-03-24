var path = require("path");

// Routes
// =============================================================


module.exports = function(app) {
// Basic route that sends the supported html pages
	app.get("/", function(req, res) {
	  res.sendFile(path.join(__dirname, "../public/home.html"));
	});

	app.get("/survey", function(req, res) {
	  res.sendFile(path.join(__dirname, "../public/survey.html"));
	});
};