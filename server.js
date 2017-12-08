var express = require("express");
var app = require("http");
var app = express();
var path = require('path');
var router = express.Router();
var http = require('http');
var MongoClient = require('mongodb').MongoClient, assert=require('assert');
var bodyParser = require('body-parser')

var url='mongodb://localhost:27017/lab6-node';
MongoClient.connect(url, function(err, db) {
                    assert.equal(null, err);
                    console.log("Connected correctly to db server");
                    db.close();
                    });

router.use(function(req, res, next) {
           console.log("/" + req.method);
           next();
           });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

app.use('/', express.static(path.join(__dirname, '/Angular/')));

app.use('/draw', express.static(path.join(__dirname, '/Angular/')));

app.use('/guess', express.static(path.join(__dirname, '/Angular/')));

app.post('/loginUser', function(req, res) {
         
         console.log("Got a post request for login");
         console.log("%j", req.body);
});

app.post('/createUser', function(req, res) {
         
         console.log("Got a post request for create");
         console.log("test: " + JSON.stringify(res.statusCode));
//         res.on('data', function(chunk) {
//
//                console.log("user: " + chunk);
//                JSON.parse(chunk, function(k, v) {
//
//                           console.log('k = ' + k);
//                           console.log('v = ' + v);
//                           });
//                });
//
         console.log("Body: " + JSON.stringify(req.body));
         
         
//         var insertUser = function(db, callback) {
//
//            var collection = db.collection('users');
//         collection.insertMany([{}],
//                                  function(err, result) {
//                                  assert.equal(err, null);
//                                  assert.equal(1, result.result.n);
//                                  assert.equal(1, result.ops.length);
//                                  console.log("Inserted user into users db");
//                                  callback(result);
//                                  });
//         }
});

app.use("*", function(req, res){
        res.sendFile(path + "404.html");
});

app.listen(process.env.PORT || 3000, function() {
           console.log("Live at Port 3000");
});

