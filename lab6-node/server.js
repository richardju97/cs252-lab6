var express = require("express");
var app = require("http");
var app = express();
var path = require('path');
var router = express.Router();
var http = require('http');
var MongoClient = require('mongodb').MongoClient, assert=require('assert');
var bodyParser = require('body-parser')

var url=process.env.MONGODB_URI;
//         var url='mongodb://localhost:27017/lab6-node';

router.use(function(req, res, next) {
           console.log("/" + req.method);
           next();
           });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

var insertUser = function(db, usr, p, callback) {
    
    var uc = db.collection('users');
    uc.insert({user : usr, password : p},
                          function(err, result) {
                          assert.equal(err, null);
                          assert.equal(1, result.result.n);
                          assert.equal(1, result.ops.length);
                          console.log("Inserted user into users db");
                          callback(result);
                          });
}

var findUsers = function(db, callback) {
    
    var uc = db.collection('users');
    uc.find({}).toArray(function(err, docs) {
                        assert.equal(err, null);
                        console.log("Found records: ");
                        console.log(docs);
                        callback(docs);
                        });
}

var authUser = function(db, u, p, callback) {
    
    var uc = db.collection('users');
    uc.find({user : u, password : p}).toArray(function(err, docs) {
                        assert.equal(err, null);
                        if (docs.length == 0) {
                                console.log("User not found");
                        } else {
                                console.log("Found user");
                        }
                        callback(docs);
                        });
}

app.use('/', express.static(path.join(__dirname, '/Angular/')));

app.use('/draw', express.static(path.join(__dirname, '/Angular/')));

app.use('/guess', express.static(path.join(__dirname, '/Angular/')));

app.post('/loginUser', function(req, res) {
         
         console.log("Got a post request for login");
//         console.log("%j", req.body);
         var u = JSON.stringify(req.body['user']);
         var p = JSON.stringify(req.body['pass']);
         
//         var url=process.env.MONGODB_URI;
         MongoClient.connect(url, function(err, client) {
                             //                    assert.equal(null, err);
                             if (err) throw err;
                             var db = client.db('mytestingdb');
                             console.log("Connected correctly to db server");
                             
//                             insertUser(db, u, p, function() {
                                        authUser(db, u, p, function() {
                                                  client.close();
                                                  });
                                        });
//                             });
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
         
         var u = JSON.stringify(req.body['user']);
         var p = JSON.stringify(req.body['pass']);
         console.log("Body: " + JSON.stringify(req.body));
//         console.log("User: " + JSON.stringify(req.body['user']));
//         console.log("Pass: " + JSON.stringify(req.body['pass']));
            console.log("User: " + u);
            console.log("Pass: " + p);

//         var url='mongodb://localhost:27017/lab6-node';
         MongoClient.connect(url, function(err, client) {
                             //                    assert.equal(null, err);
                             if (err) throw err;
                             var db = client.db('mytestingdb');
                             console.log("Connected correctly to db server");
                             
                             insertUser(db, u, p, function() {
                                        findUsers(db, function() {
                                                  client.close();
                                                  });
                                        });
                             });
});

app.use("*", function(req, res){
        res.sendFile(path + "404.html");
});

app.listen(process.env.PORT || 3000, function() {
           console.log("Live at Port 3000");
});

