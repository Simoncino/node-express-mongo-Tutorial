var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express', nome: 'Sima' });
});

/* GET Hello World page. */
router.get('/helloworld', function(req, res) {
    res.render('index', { title: 'Hello, World!' });
});

/**ORIGINALE
router.get('/userlist', function(req, res) {
    var db = req.db;
    var collection = db.get('usercollection');
    collection.find({},{},function(e,docs){
        res.render('userlist', {
            "userlist" : docs
        });
    });
});
**/

/* GET Userlist page. */
router.get('/userlist', function(req, res) {
    var db = req.db;
    var collection = db.get('test1');
    collection.find({},{},function(e,docs){
        res.render('index', {
            "cose" : docs
        });
    });
});

router.get('/userlistjson', function(req, res) {
    var db = req.db;
    var collection = db.get('test1');
    collection.find({},{},function(e,docs){
        res.json(docs);
    });
});

/* GET New User page. */
router.get('/newuser', function(req, res) {
    res.render('newuser', { title: 'Add New User' });
});

/* POST to Add User Service */
router.post('/adduser', function(req, res) {

    // Set our internal DB variable
    var db = req.db;

    // Get our form values. These rely on the "name" attributes
    var userName = req.body.username;
    var userEmail = req.body.useremail;
    var userCognome = req.body.usercognome;
    console.log(userName);
    console.log(userEmail);
    console.log(userCognome);

    // Set our collection
    var collection = db.get('test1');

    // Submit to the DB
    collection.insert({
        "nome" : userName,
        "email" : userEmail,
        "cognome" : userCognome
    }, function (err, doc) {
        if (err) {
            // If it failed, return error
            res.send("There was a problem adding the information to the database.");
        }
        else {
            // And forward to success page
            res.redirect("userlist");
        }
    });
});

module.exports = router;
