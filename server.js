// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 }));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function(req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// your first API endpoint... 
app.get("/api/hello", function(req, res) {
  res.json({ greeting: 'hello API' });
});

//Get formatted time
app.get("/api/:date?", function(req, res) {
  let dateToCovert = new Date();
  const date = req.params.date;
  const checkNumber = /^\d+$/;
  if (date) {
    if (checkNumber.test(date)) {
      dateToCovert = new Date(Number.parseInt(date));
    } else {
      dateToCovert = new Date(date);
    }
  }
  if (dateToCovert instanceof Date && !isNaN(dateToCovert)) {
    const gmt = dateToCovert.toGMTString();
    const unix = dateToCovert.getTime();
    return res.json({
      "unix": unix,
      "utc": gmt
    });
  }

  return res.json({
    error: "Invalid Date"
  });

});

// listen for requests :)
var listener = app.listen(process.env.PORT, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});
