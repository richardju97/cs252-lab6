var express = require("express");
var app = require("http");
var app = express();
var path = require('path');
var router = express.Router();
var http = require('http');
var MongoClient = require('mongodb').MongoClient, assert=require('assert');

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

app.use('/', express.static(path.join(__dirname, '/Angular/')));

app.use('/draw', express.static(path.join(__dirname, '/Angular/')));

app.use('/guess', express.static(path.join(__dirname, '/Angular/')));

app.post('/loginUser', function(req, res) {
         
         console.log("Got a post request for login");
         console.log("%j", req.body);
});

app.use("*", function(req, res){
        res.sendFile(path + "404.html");
});

app.listen(process.env.PORT || 3000, function() {
           console.log("Live at Port 3000");
});

