var express = require('express');
var morgan = require('morgan');
var path = require('path');

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

app.get('/:articleName', function (req, res) {
    var articleName = req.params.articleName;
  res.send(createTemplate(articles[articleName]));
});


app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/main.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'main.js'));
});

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});


var port = 8080; // Use 8080 for local development because you might already have apache running on 80
app.listen(8080, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
