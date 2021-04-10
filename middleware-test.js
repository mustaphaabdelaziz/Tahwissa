var express = require('express');
var app = express();
const hostname = '127.0.0.1',
	  port = 3000;
var myLogger = function (req, res, next) {
  console.log('LOGGED')
  next();
}
var requestTime = function (req, res, next) {
  req.requestTime = Date.now();
  console.log(req.requestTime)
  next()
}




app.use(requestTime);
app.use(myLogger);

app.get('/', function (req, res) {
  res.send('Hello World!')
})

app.listen(port,hostname,()=> {
	console.log("==================================");
	console.log("----- SERVER IS RUNNING ... ----");
	console.log("==================================");
});  