// require express framework and additional modules
var express = require('express'),
    app = express(),
    bodyParser = require('body-parser');

    var session = require('express-session');



// tell app to use bodyParser middleware
app.use(bodyParser.urlencoded({extended: true}));

// serve js and css files from public folder
app.use(express.static(__dirname + '/public'));

app.use(session({
  saveUninitialized: true,
  resave: true,
  secret: 'OurSuperSecretCookieSecret',
  cookie: { maxAge: 60000 }
}));

var users = [
  {
    name: 'Bob',
    username: 'bobiscool'
  },
  {
    name: 'Julie',
    username: 'julierocks'
  }
];

app.get('/login', function (req, res) {
  var html = '<form action="/api/sessions" method="post">' +
               'Your email: <input type="text" name="email"><br>' +
               'Your password: <input type="text" name="password"><br>' +
               '<button type="submit">Submit</button>' +
               '</form>';
  if (req.session.user) {
    html += '<br>Your email from your session is: ' + req.session.user.email;
  }
  console.log(req.session);
  res.send(html);
})

app.post('/api/sessions', function (req, res) {
  User.authenticate(req.body.email, req.body.password, function(error, user) {
    req.session.user = user;
    res.redirect('/login');
  });
});



// set up root route to respond with index.html
app.get('/', function(req, res) {
  res.sendFile(__dirname + '/public/views/index.html');
});

// set up route for /users JSON
app.get('/users', function(req, res) {
  res.json(users);
});


// listen on port 3000
app.listen(3000, function () {
  console.log('server started on localhost:3000');
});

