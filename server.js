var express = require('express');
var morgan = require('morgan');
var path = require('path');

var Pool = require('pg').Pool;

var config = {
  host: 'db.imad.hasura-app.io',
  user: 'apsingh7',
  port: '5432', 
  database: 'apsingh7',
  password: process.env.DB_PASSWORD
};

var app = express();
app.use(morgan('combined'));

var articles = {
    'article-one' :{
	title: 'Article One | Ajay Pratap Singh',
	date:'Sep 5,2016',
	heading:'Article One',
	content:`
	<p>This is my First Article.This is my First Article.This is my First Article.This is my First Article.This is my First Article.This is my First Article.This is my First Article.This is my First Article.This is my First Article.
			</p>
			<p>This is my First Article.This is my First Article.This is my First Article.This is my First Article.This is my First Article.This is my First Article.This is my First Article.This is my First Article.This is my First Article.
			</p>
			<p>This is my First Article.This is my First Article.This is my First Article.This is my First Article.This is my First Article.This is my First Article.This is my First Article.This is my First Article.This is my First Article.
			</p>`
			
},
    'article-two' :{title: 'Article One | Ajay Pratap Singh',
	date:'Sep 5,2016',
	heading:'Article two',
	content:`
	<p>This is my second Article.This is my second Article.This is my second Article.This is my second Article.This is my second Article.This is my second Article.This is my second Article.This is my second Article.This is my second Article.
			</p>
			<p>This is my second Article.This is my second Article.This is my second Article.This is my second Article.This is my second Article.This is my second Article.This is my second Article.This is my second Article.This is my second Article.
			</p>
			<p>This is my second Article.This is my second Article.This is my second Article.This is my second Article.This is my second Article.This is my second Article.This is my second Article.This is my second Article.This is my second Article.
			</p>` },
    'article-three' : {title: 'Article Three | Ajay Pratap Singh',
	date:'Sep 5,2016',
	heading:'Article Three',
	content:`
	<p>This is my third Article.This is my third Article.This is my third Article.This is my third Article.This is my third Article.This is my third Article.This is my third Article.This is my third Article.This is my third Article.
			</p>
			<p>This is my third Article.This is my third Article.This is my third Article.This is my third Article.This is my third Article.This is my third Article.This is my third Article.This is my third Article.This is my third Article.
			</p>
			<p>This is my third Article.This is my third Article.This is my third Article.This is my third Article.This is my third Article.This is my third Article.This is my third Article.This is my third Article.This is my third Article.
			</p>` }
};
function createTemplate(data){
    var title=data.title;
    var date=data.date;
    var heading=data.heading;
    var content=data.content;
    var htmlTemplate=`<html>
	 <link href="/ui/style.css" rel="stylesheet" />
	 
    <head>
    <title>
        ${title}</title>
    </head>
    <body>
	<div class="main">
    <div>
    <a href="/" style="text-decoration:none;font-color:red;"><b>Home</b></a>
	<hr></hr>
    </div>
        <div>
        ${heading}
        </div>
        <div>
        ${date}
        </div>
        <div>
        ${content}
        </div>
	</div>
    </body>
    </html>
    `;
    return htmlTemplate;
}

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

var pool = new Pool(config);
app.get('/test-db',function(req,res){

pool.query('SELECT * FROM signup',function(err,result){

if(err){
res.status(500).send(err.toString());
}
else{
res.send(JSON.stringify(result));
}
});
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
var names=[];
app.get('/submit-name/:name',function(req,res){
//get the name from the request
var name=req.params.name;
names.push(name);
//JSON javascript object notation
res.send(JSON.stringify(names));
});


var port = 8080; // Use 8080 for local development because you might already have apache running on 80
app.listen(8080, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
