var express = require('express');
var morgan = require('morgan');
var path = require('path');
var Pool = require('pg').Pool;
var crypto = require('crypto');
var bodyParser = require('body-parser');
var session = require('express-session');

// commit
var config = {
    user: 'apsingh7',
    database: 'apsingh7',
    host: 'db.imad.hasura-app.io',
    port: '5432',
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
    var content1 = data.imagevalue;
    var htmlTemplate = 
    
    `
        <!doctype html>
<html>
<head>
<meta charset="utf-8">
<title>AJAY | AP SINGH</title>
<link href="https://fonts.googleapis.com/css?family=Courgette" rel="stylesheet">

<style>
body { 
    background-image: url("/ui/image/wall.jpg");
    background-repeat: no-repeat;
    background-attachment: fixed;

	  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
  


}
.header{
	width:100%;
	overflow:hidden;
	margin-top:-5px;

}
.logo{
	width:150px;
	height:150px;
	float:left;

}
.nav {
	
	width: 800px;
	margin-left:150px;

	text-align: center;
	padding: 20px 0;
	
}

.nav ul li {
	display: inline-block;
	margin-right: 60px;
}
.nav ul li:last-child {
	margin-right: 0;
}
.nav ul li a {
	text-decoration: none;
	text-transform: uppercase;
	color: #fff;
	font-family: Arial, sans-serif;
}
 .box
{
	display:inline-block;
	text-align: center;
	padding-top: 10px;
	height:auto;
  
}
.content{
	width:300px;
	height:auto;
	
   display: inline-block;
   padding: 40px;
	vertical-align:top;
	padding-top:5px;
	margin-top: 25px;
	transition: all .2s ease-in-out;
	margin-left: 100px;
	height:350px;
	float:right;
	color:white;
	 text-align: justify;
    text-justify: inter-word;

}

.main {
	background-color: #fff;
   display: inline-block;
   padding: 40px;
	vertical-align:top;
	padding-top:5px;
	margin-top: 25px;
	transition: all .2s ease-in-out;
	
	height:auto;
	float:left;
	margin-left:100px;
	
	
}
.main:hover{
	transform: scale(1.1);
}
.txt
{
	display:block;
}
.comment {
    margin-left: 50px;
    padding-bottom: 10px;
    border-bottom: 1px solid #ccc;
	color:green;
	margin:right:50px;
	font-family:  Courgette;
	font-size:1.2em;
}

.commenter {
	font-family:  Courgette;
	margin-left:50px;
	margin:right:50px;
    font-style: italic;
    font-size: 0.8em;
}

#comment_form {
	font-family:  Courgette;
    margin-left: 50px;
	margin:right:50px;
    padding-bottom: 10px;
    border-bottom: 1px solid #ccc;
}

</style>




</head>

<body>
<div class="header">
	<div class="logo">
	<a href="/index">
	<img style="float:left;margin-left:50px; height:150px;width:110px"src="/ui/image/logo3.png"></a>
	</div>
        <div class="nav">
            <ul>
                <li><a href="/index">Home</a></li>
                <li><a href="sdfghj">About</a></li>
                <li><a href="/blog">Blog</a></li>
                <li><a href="/gallary">Gallary</a></li>
                <li><a href="#">Contact &nbsp &nbsp &nbsp</a></li>
            </ul>
        </div>
		<div style="height:50px;overflow-y: hidden;margin-right:00px;margin-top:-75px" >



<a href="https://plus.google.com/u/0/118083441698841125096">
<img style=" float:right; margin-left:10px; display:inline" src="/ui/image/google.png" width="45" height="45"  /></a>
<a href="https://twitter.com/bwid_AP"><img style=" float:right; margin-left:10px; display:inline" src="/ui/image/twit.png" width="45" height="45"  /></a>

<a href="https://www.facebook.com/shreeramjairam"><img style=" float:right; margin-left:10px;display:inline" src="/ui/image/fb.png" width="45" height="45"  /></a>

<div id="icon"><a href="/signup"><img style=" float:right; margin-left:10px;display:inline;margin-right:50px;" src="/ui/image/logup.png" width="45" height="45"  /></a>
</div>

</div>
</div>
<div class="container">
              
              
              <center><h1 style="color:#fff;">
                  ${heading}
              </h1>
			  </center>
			  
              <div>
                  ${date.toDateString()}
              </div>
			  
			  <div class="box">
			  <div class="main">
                <img src="/ui/image/${data.imagevalue}/1.png" width:>
              </div>
              <div class="content">
                ${data.content}
              </div>
			  </div>
			  
              <br><br>
              <h4>Comments</h4>
              <div id="comment_form">
              </div>
              <div id="comments">
                <center>Loading comments...</center>
              </div>
          </div>
          <script type="text/javascript" src="/ui/article.js"></script>
<script type="text/javascript" src="/ui/main.js">
        </script>
</body>
</html>


`
    ;
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

   var username = req.body.username;
   var password = req.body.password;
   var salt = crypto.randomBytes(128).toString('hex');
   var dbString = hash(password, salt);
   pool.query('INSERT INTO "user" (username, password) VALUES ($1, $2)', [username, dbString], function (err, result) {
      if (err) {
          res.status(500).send(err.toString());
      } else {
          res.send('User successfully created: ' + username);
      }
   });
});

app.post('/login', function (req, res) {
   var username = req.body.username;
   var password = req.body.password;
   
   pool.query('SELECT * FROM "user" WHERE username = $1', [username], function (err, result) {
      if (err) {
          res.status(500).send(err.toString());
      } else {
          if (result.rows.length === 0) {
              res.status(403).send('username/password is invalid');
          } else {
              
              var dbString = result.rows[0].password;
              var salt = dbString.split('$')[2];
              var hashedPassword = hash(password, salt); // Creating a hash based on the password submitted and the original salt
              if (hashedPassword === dbString) {
                
              
                req.session.auth = {userId: result.rows[0].id};
                
                res.send('credentials correct!');
                
              } else {
                res.status(403).send('username/password is invalid');
              }
          }
      }
   });
});

app.get('/check-login', function (req, res) {
   if (req.session && req.session.auth && req.session.auth.userId) {
     
       pool.query('SELECT * FROM "user" WHERE id = $1', [req.session.auth.userId], function (err, result) {
           if (err) {
              res.status(500).send(err.toString());
           } else {
              res.send(result.rows[0].username);    
           }
       });
   } else {
       res.status(400).send('You are not logged in');
   }
});



app.get('/logout', function (req, res) {

	delete req.session.auth;
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

var pool = new Pool(config);

app.get('/get-articles', function (req, res) {
   // make a select request
   // return a response with the results
   pool.query('SELECT * FROM article ORDER BY date DESC', function (err, result) {
      if (err) {
          res.status(500).send(err.toString());
      } else {
          res.send(JSON.stringify(result.rows));
      }
   });
});

app.get('/get-comments/:articleName', function (req, res) {
   // make a select request
   // return a response with the results
   pool.query('SELECT comment.*, "user".username FROM article, comment, "user" WHERE article.title = $1 AND article.id = comment.article_id AND comment.user_id = "user".id ORDER BY comment.timestamp DESC', [req.params.articleName], function (err, result) {
      if (err) {
          res.status(500).send(err.toString());
      } else {
          res.send(JSON.stringify(result.rows));
      }
   });
});

app.post('/submit-comment/:articleName', function (req, res) {
   // Check if the user is logged in
    if (req.session && req.session.auth && req.session.auth.userId) {
        // First check if the article exists and get the article-id
        pool.query('SELECT * from article where title = $1', [req.params.articleName], function (err, result) {
            if (err) {
                res.status(500).send(err.toString());
            } else {
                if (result.rows.length === 0) {
                    res.status(400).send('Article not found');
                } else {
                    var articleId = result.rows[0].id;
                    // Now insert the right comment for this article
                    pool.query(
                        "INSERT INTO comment (comment, article_id, user_id) VALUES ($1, $2, $3)",
                        [req.body.comment, articleId, req.session.auth.userId],
                        function (err, result) {
                            if (err) {
                                res.status(500).send(err.toString());
                            } else {
                                res.status(200).send('Comment inserted!')
                            }
                        });
                }
            }
       });     
    } else {
        res.status(403).send('Only logged in users can comment');
    }
});

app.get('/articles/:articleName', function (req, res) {
  // SELECT * FROM article WHERE title = '\'; DELETE WHERE a = \'asdf'
  pool.query("SELECT * FROM article WHERE title = $1", [req.params.articleName], function (err, result) {
    if (err) {
        res.status(500).send(err.toString());
    } else {
        if (result.rows.length === 0) {
            res.status(404).send('Article not found');
        } else {
            var articleData = result.rows[0];
            res.send(createTemplate(articleData));
        }
    }
  });
});



app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});




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
app.get('/profile', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'about.html'));
});
app.get('/schedule', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'schedule.html'));
});

app.get('/events', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'schedule.html'));
});




app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui/style', 'style.css'));
});
app.get('/ui/main.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui/style', 'main.css'));
});
app.get('/ui/cm.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui/style', 'cm.css'));
});
app.get('/ui/blog.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui/style', 'blog.css'));
});
app.get('/ui/footer.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui/style', 'footer.css'));
});



app.get('/ui/main.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'main.js'));
});

app.get('/ui/image/logup.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui/image', 'logup.png'));
});
app.get('/ui/image/ap.jpg', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui/image', 'ap.jpg'));
});
app.get('/ui/image/login_icon.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui/image', 'login_icon.png'));
});
app.get('/ui/image/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui/image', 'madi.png'));
});
app.get('/ui/image/venus2.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui/image', 'venus2.png'));
});

app.get('/ui/image/logo3.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui/image', 'logo3.png'));
});
app.get('/ui/image/google.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui/image', 'google.png'));
});
app.get('/ui/image/fb.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui/image', 'fb.png'));
});
app.get('/ui/image/twit.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui/image', 'twit.png'));
});
app.get('/ui/image/wall.jpg', function (req, res) {
      res.sendFile(path.join(__dirname, 'ui/image', 'wall.jpg'));
});app.get('/ui/image/a.jpg', function (req, res) {
      res.sendFile(path.join(__dirname, 'ui/image', 'a.jpg'));
});
app.get('/ui/image/b.jpg', function (req, res) {
      res.sendFile(path.join(__dirname, 'ui/image', 'b.jpg'));
});
app.get('/ui/image/c.jpg', function (req, res) {
      res.sendFile(path.join(__dirname, 'ui/image', 'c.jpg'));
});
app.get('/ui/image/d.jpg', function (req, res) {
      res.sendFile(path.join(__dirname, 'ui/image', 'd.jpg'));
});
app.get('/ui/image/men2.png', function (req, res) {
      res.sendFile(path.join(__dirname, 'ui/image', 'men2.png'));
});
app.get('/ui/image/vir2.png', function (req, res) {
      res.sendFile(path.join(__dirname, 'ui/image', 'venus2.png'));
});
app.get('/ui/image/venus2.png', function (req, res) {
      res.sendFile(path.join(__dirname, 'ui/image', 'venus2.png'));
});
app.get('/ui/image/computer.png', function (req, res) {
      res.sendFile(path.join(__dirname, 'ui/image', 'computer.png'));
});
app.get('/ui/image/bb.png', function (req, res) {
      res.sendFile(path.join(__dirname, 'ui/image', 'bb.png'));
});
app.get('/ui/1.png', function (req, res) {
      res.sendFile(path.join(__dirname, 'ui/image', '1.png'));
});
app.get('/ui/image/0/1.png', function (req, res) {
      res.sendFile(path.join(__dirname, 'ui/image/0', '1.png'));
});
app.get('/ui/image/1/1.png', function (req, res) {
      res.sendFile(path.join(__dirname, 'ui/image/1', '1.png'));
});
app.get('/ui/image/2/1.png', function (req, res) {
      res.sendFile(path.join(__dirname, 'ui/image/2', '1.png'));
});
app.get('/ui/image/3/1.png', function (req, res) {
      res.sendFile(path.join(__dirname, 'ui/image/3', '1.png'));
});
app.get('/ui/image/4/1.png', function (req, res) {
      res.sendFile(path.join(__dirname, 'ui/image/4', '1.png'));
});
app.get('/ui/image/5/1.png', function (req, res) {
      res.sendFile(path.join(__dirname, 'ui/image/5', '1.png'));
});
app.get('/ui/image/cs.jpg', function (req, res) {
      res.sendFile(path.join(__dirname, 'ui/image', 'up.jpg'));
});
app.get('/ui/image/logout.png', function (req, res) {
      res.sendFile(path.join(__dirname, 'ui/image', 'logout.png'));
});

app.get('/ui/:fileName', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', req.params.fileName));
});


var port = 8080; // Use 8080 for local development because you might already have apache running on 80
app.listen(8080, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
