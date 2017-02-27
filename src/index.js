var express = require('express'),
    app = express(),
    path = require('path'),
    cass = require('cassandra-driver'),
    bodyparser = require('body-parser');

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyparser.json());

// connecting to cassandra
// change the options based on what you need (JSON)
var client = new cass.Client({ contactPoints: ['127.0.0.1'] });
client.connect(function(err, result) {
    console.log('We have connected');
});

app.get('/validate/:uname', function(req, res) {
    var query = 'SELECT * FROM testing.users WHERE user_name=?';
    client.execute(query, [req.params.uname], function(err, result) {
        if (err) {
            res.status(404).json({
                message: err
            });
        } else {
            res.status(200).json({
                success: true,
                data: result.rows[0],
                path: 'main'
            });
        }
    });
});

app.get('/users', function(req, res) {
    var getUsers = 'SELECT * FROM testing.users';
    client.execute(getUsers, [], function(err, result) {
        if (err) {
            res.status(404).send({ msg: err });
        } else {
            res.json(result.rows);
        }
    });
});

app.get('/user/:id', function(req, res) {
    var query = 'SELECT * FROM testing.users WHERE id=? ALLOW FILTERING';
    console.log(req.params.id);
    client.execute(query, [req.params.id], function(err, result) {
        if (err) {
            res.status(500).send({ msg: err });
        } else {
            res.json(result.rows[0]);
        }
    });
});

app.post('/addUser', function(req, res) {
    var id = cass.types.uuid();
    var query = "INSERT INTO testing.users (id, name, user_name, email, join_date, last_active) " +
         " VALUES (?, ?, ?, ?, ?, ?)";
    console.log(req.body.name, req.body.username, req.body.email);
    client.execute(query, [id, req.body.name, req.body.username, req.body.email, new Date(), new Date()], 
        function(err, result) {
            if (err) {
                console.log(err);
                res.status(500).send({ msg: err });
            } else {
                res.json({ msg: req.body.username + ' was added' });
            }
        }
    );
});

app.listen(3090, function() {
    console.log('app started on port 3090');
});