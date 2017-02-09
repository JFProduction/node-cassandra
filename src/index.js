var express = require('express'),
    app = express(),
    path = require('path')
    cass = require('cassandra-driver');

app.use(express.static(path.join(__dirname, 'public')));

// connecting to cassandra
// change the options based on what you need (JSON)
var client = new cass.Client({ contactPoints: ['127.0.0.1'] });
client.connect(function(err, result) {
    console.log('We have connected');
});

var getUsers = 'SELECT * FROM testing.users';

app.get('/users', function(req, res) {
    client.execute(getUsers, [], function(err, result) {
        if (err) {
            res.status(404).send({ msg: err });
        } else {
            res.json(result.rows);
        }
    });
});

app.listen(3000, function() {
    console.log('app started');
});