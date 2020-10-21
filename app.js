const http = require('http');
const https = require('https');
const fs = require('fs');
const express = require("express");
const app = express();
var cors = require("cors");
var allowCrossDomain = function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
};

const httpsOptions = {
  key: fs.readFileSync('selfsigned.key'),
  cert: fs.readFileSync('selfsigned.crt')
}

/*app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');*/
//app.use(express.bodyParser());
//app.use(express.methodOverride());
app.use(allowCrossDomain);
app.use(express.json());
app.use(cors());
//app.use(app.router);
/*app.use(express.static(path.join(__dirname, 'public')));*/

const itemsRouter = require("./items");
// create new app

// app.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   next();
// });

app.use("/api/items", itemsRouter);

// default URL to API
app.use("/", function (req, res) {
  res.send("node-ex-api works :-)");
});

const server = https.createServer(httpsOptions, app);
const port = 3003;
server.listen(port);
console.debug("Server listening on port " + port);

const serverv = http.createServer(app);
const portv = 3002;
serverv.listen(portv);
console.debug("Server listening on port " + portv);