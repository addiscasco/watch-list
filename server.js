var express = require('express');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var exphbs = require('express-handlebars');
var mysql = require('mysql');

//server
var app = express();

app.use(bodyParser.urlencoded({ extended: false }))
app.use(methodOverride('_method'));
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

//create connection to port
var port = 3002;
app.listen(port);

//mysql connection

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Green1992!',
    database: 'movie_planner_DB'
});

connection.connect(function (err) {
    if (err) throw err;
    console.log('Connected as ID: ' + connection.threadId);
});

app.get('/', function (req, res) {
    connection.query('SELECT * FROM movies; ', function (err, data) {
        res.render('index', { movies: data });
    });
});

app.post('/create', function (req, res) {
    connection.query('INSERT INTO movies (movie) VALUES (?);', [req.body.movie], function (err, result) {
        if (err) throw err;
        res.redirect('/');
    });
});

app.put('/update', function (req, res) {
    connection.query('UPDATE movies SET movie = ? WHERE id =?;', [req.body.movie, req.body.id], function (err, results) {
        if (err) throw err;
        res.redirect('/');
    });
});

app.delete('/delete', function (req, res) {
    connection.query('DELETE FROM movies WHERE id = ?;', [req.body.id, req.body.id], function (err, results) {
        if (err) throw err;
        res.redirect('/');
    });
});