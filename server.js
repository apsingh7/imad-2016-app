var express = require('express');
var morgan = require('morgan');
var path = require('path');
var Pool = require('pg').Pool;
var crypto = require('crypto');
var bodyParser = require('body-parser');
var session = require('express-session');

// commit
var config = {
  host: 'db.imad.hasura-app.io',
  user: 'apsingh7',
  port: '5432', 
  database: 'apsingh7',
  password: process.env.DB_PASSWORD
};


var app = express();
app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(session({
    secret: 'someRandomSecretValue',
    cookie: { maxAge: 1000 * 60 * 60 * 24 * 30}
}));

function createTemplate (data) {
    var title = data.title;
    var date = data.date;
    var heading = data.heading;
    var content = data.content;
    
    var htmlTemplate = `
    <html>
      <head>
          <title>
              ${title}
          </title>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link href="/ui/style.css" rel="stylesheet" />
      </head> 
      <body>
          <div class="container">
              <div>
                  <a href="/">Home</a>
              </div>
              <hr/>
              <h3>
                  ${heading}
              </h3>
              <div>
                  ${date.toDateString()}
              </div>
              <div>
                ${content}
              </div>
              <hr/>
              <h4>Comments</h4>
              <div id="comment_form">
              </div>
              <div id="comments">
                <center>Loading comments...</center>
              </div>
          </div>
          <script type="text/javascript" src="/ui/article.js"></script>
      </body>
    </html>
    `;
    return htmlTemplate;
}

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});


function hash (input, salt) {
    // How do we create a hash?
    var hashed = crypto.pbkdf2Sync(input, salt, 10000, 512, 'sha512');
    return ["pbkdf2", "10000", salt, hashed.toString('hex')].join('$');
}


app.get('/hash/:input', function(req, res) {
   var hashedString = hash(req.params.input, 'this-is-some-random-string');
   res.send(hashedString);
});

app.post('/create-user', function (req, res) {
 
   var email = req.body.email;
   var username = req.body.username;
   var password = req.body.password;
   
   var salt = crypto.randomBytes(128).toString('hex');
   var dbString = hash(password, salt);
   pool.query('INSERT INTO "signup" (email,username, password) VALUES ($1,$2, $3)', [email,username, dbString], function (err, result) {
      if (err) {
          res.status(500).send(err.toString());
      } else {
          res.send('User successfully created: ' + username);
      }
   });
});

app.post('/login', function (req, res) {
    var email = req.body.email;
   var username = req.body.username;
   var password = req.body.password;
   
   pool.query('SELECT * FROM "signup" WHERE email = $1', [email], function (err, result) {
      if (err) {
          res.status(500).send(err.toString());
      } else {
          if (result.rows.length === 0) {
              res.status(403).send('email/password is invalid');
          } else {
              // Match the password
              var dbString = result.rows[0].password;
              var salt = dbString.split('$')[2];
              var hashedPassword = hash(password, salt); // Creating a hash based on the password submitted and the original salt
              if (hashedPassword === dbString) {
                
                // Set the session
                req.session.auth = {userId: result.rows[0].id};
                // set cookie with a session id
                // internally, on the server side, it maps the session id to an object
                // { auth: {userId }}
                
                res.send('credentials correct!');
                
              } else {
                res.status(403).send('username/password is invalid');
              }
          }
      }
   });
});




var pool = new Pool(config);



app.get('/index', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});
app.get('/login', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'login.html'));
});
app.get('/signup', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'signup.html'));
});
app.get('/gallary', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'gallary.html'));
});
app.get('/blog', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'blog.html'));
});
var counter=0;
app.get('/counter',function(req,res){
	counter= counter+1;
	res.send(counter,toString()); 
});
app.get('/:articleName', function (req, res) {
    var articleName = req.params.articleName;
  res.send(createTemplate(articles[articleName]));
});


app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});
app.get('/ui/main.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'main.css'));
});
app.get('/ui/cm.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'cm.css'));
});
app.get('/ui/blog.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'blog.css'));
});


app.get('/ui/main.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'main.js'));
});

app.get('/ui/logup.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'logup.png'));
});
app.get('/ui/login_icon.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'login_icon.png'));
});
app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});
app.get('/ui/venus2.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'venus2.png'));
});

app.get('/ui/logo3.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'logo3.png'));
});
app.get('/ui/google.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'google.png'));
});
app.get('/ui/fb.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'fb.png'));
});
app.get('/ui/twit.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'twit.png'));
});
app.get('/ui/wall.jpg', function (req, res) {
      res.sendFile(path.join(__dirname, 'ui', 'wall.jpg'));
});app.get('/ui/a.jpg', function (req, res) {
      res.sendFile(path.join(__dirname, 'ui', 'a.jpg'));
});
app.get('/ui/b.jpg', function (req, res) {
      res.sendFile(path.join(__dirname, 'ui', 'b.jpg'));
});
app.get('/ui/c.jpg', function (req, res) {
      res.sendFile(path.join(__dirname, 'ui', 'c.jpg'));
});
app.get('/ui/d.jpg', function (req, res) {
      res.sendFile(path.join(__dirname, 'ui', 'd.jpg'));
});
app.get('/ui/men2.png', function (req, res) {
      res.sendFile(path.join(__dirname, 'ui', 'men2.png'));
});
app.get('/ui/vir2.png', function (req, res) {
      res.sendFile(path.join(__dirname, 'ui', 'venus2.png'));
});
app.get('/ui/venus2.png', function (req, res) {
      res.sendFile(path.join(__dirname, 'ui', 'venus2.png'));
});
app.get('/ui/computer.png', function (req, res) {
      res.sendFile(path.join(__dirname, 'ui', 'computer.png'));
});
app.get('/ui/bb.png', function (req, res) {
      res.sendFile(path.join(__dirname, 'ui', 'bb.png'));
});
app.get('/ui/1.png', function (req, res) {
      res.sendFile(path.join(__dirname, 'ui', '1.png'));
});


app.get('/ui/:fileName', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', req.params.fileName));
});


var port = 8080; // Use 8080 for local development because you might already have apache running on 80
app.listen(8080, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
