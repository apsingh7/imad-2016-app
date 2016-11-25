
function loadLoginForm () {
    var loginHtml = `
        <!doctype html>
<html>
<head>
<meta charset="utf-8">
<title>AJAY | AP SINGH</title>
<link href="https://fonts.googleapis.com/css?family=Courgette" rel="stylesheet">

<link href="ui/main.css" rel="stylesheet" type="text/css">

<style>
::-webkit-scrollbar {
    width: 10px;
}
 

::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3); 
    -webkit-border-radius: 10px;
    border-radius: 0px;
}
 
::-webkit-scrollbar-thumb {
    -webkit-border-radius: 10px;
    border-radius: 0px;
    background: rgba(255,0,0,0.8); 
    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.5); 
}
::-webkit-scrollbar-thumb:window-inactive {
	background: rgba(255,0,0,0.4); 
}
</style>



</head>

<body>

<div class="header">
	<div class="logo">
	<a href="/index"><img style="float:left;margin-left:50px; height:150px;width:110px" src="ui/logo3.png"></a>
	</div>
        <div class="nav">
            <ul>
                <li><a href="/index">Home</a></li>
                <li><a href="sdfghj">About</a></li>
                <li><a href="/blog">Blog</a></li>
                <li><a href="#">Gallary</a></li>
                <li><a href="#">Contact &nbsp; &nbsp; &nbsp;</a></li>
            </ul>
        </div>
		<div style="height:50px;overflow-y: hidden;margin-right:00px;margin-top:20px" >



<a href="https:///www.google.com">
<img style=" float:right; margin-left:10px; display:inline" src="ui/google.png" width="45" height="45"  /></a>
<a href="https:///www.twitter.com"><img style=" float:right; margin-left:10px; display:inline" src="ui/twit.png" width="45" height="45"  /></a>

<a href="https:///www.facebook.com"><img style=" float:right; margin-left:10px;display:inline" src="ui/fb.png" width="45" height="45"  /></a>

<a href="/signup"><img style=" float:right; margin-left:10px;display:inline;margin-right:50px;" src="ui/logup.png" width="45" height="45"  /></a>
<a href="/login"><img style=" float:right; margin-left:10px;display:inline; margin-right:10px;" src="ui/login_icon.png" width="45" height="45"  /></a>
</div>
</div>

<br><br><br><br><br><br>

      <form>
        <h1>Sign Up</h1>
        
        <fieldset>
          <legend><span class="number">1</span>Your basic info</legend>
          <label for="name">Name:</label>
          <input type="text" id="username" placeholder="username" />
          
          <label for="mail">Email:</label>
          <input type="email" id="mail" name="user_email">
          
         
          
          <label for="password">Password:</label>
          <input type="password" id="password"/>
          
          <label>Birth Day:</label>
              <input type="date" name="bday">

        </fieldset>
        
        
		
        
         <input type="submit" id="register_btn" value="Register" />
      
</form>



</body>
</html>

        `;
    document.getElementById('login_area').innerHTML = loginHtml;
    
    // Submit username/password to login
    var submit = document.getElementById('login_btn');
    submit.onclick = function () {
        // Create a request object
        var request = new XMLHttpRequest();
        
        // Capture the response and store it in a variable
        request.onreadystatechange = function () {
          if (request.readyState === XMLHttpRequest.DONE) {
              // Take some action
              if (request.status === 200) {
                  submit.value = 'Sucess!';
              } else if (request.status === 403) {
                  submit.value = 'Invalid credentials. Try again?';
              } else if (request.status === 500) {
                  alert('Something went wrong on the server');
                  submit.value = 'Login';
              } else {
                  alert('Something went wrong on the server');
                  submit.value = 'Login';
              }
              loadLogin();
          }  
          // Not done yet
        };
        
        // Make the request
        var username = document.getElementById('username').value;
        var password = document.getElementById('password').value;
        console.log(username);
        console.log(password);
        request.open('POST', '/login', true);
        request.setRequestHeader('Content-Type', 'application/json');
        request.send(JSON.stringify({username: username, password: password}));  
        submit.value = 'Logging in...';
        
    };
    
    var register = document.getElementById('register_btn');
    register.onclick = function () {
        // Create a request object
        var request = new XMLHttpRequest();
        
        // Capture the response and store it in a variable
        request.onreadystatechange = function () {
          if (request.readyState === XMLHttpRequest.DONE) {
              // Take some action
              if (request.status === 200) {
                  alert('User created successfully');
                  register.value = 'Registered!';
              } else {
                  alert('Could not register the user');
                  register.value = 'Register';
              }
          }
        };
        
        // Make the request
        var username = document.getElementById('username').value;
        var password = document.getElementById('password').value;
        console.log(username);
        console.log(password);
        request.open('POST', '/create-user', true);
        request.setRequestHeader('Content-Type', 'application/json');
        request.send(JSON.stringify({username: username, password: password}));  
        register.value = 'Registering...';
    
    };
}

function loadLoggedInUser (username) {
    var loginArea = document.getElementById('login_area');
    loginArea.innerHTML = `
        <h3> Hi <i>${username}</i></h3>
        <a href="/logout">Logout</a>
    `;
}

function loadLogin () {
    // Check if the user is already logged in
    var request = new XMLHttpRequest();
    request.onreadystatechange = function () {
        if (request.readyState === XMLHttpRequest.DONE) {
            if (request.status === 200) {
                loadLoggedInUser(this.responseText);
            } else {
                loadLoginForm();
            }
        }
    };
    
    request.open('GET', '/check-login', true);
    request.send(null);
}

function loadArticles () {
        // Check if the user is already logged in
    var request = new XMLHttpRequest();
    request.onreadystatechange = function () {
        if (request.readyState === XMLHttpRequest.DONE) {
            var articles = document.getElementById('articles');
            if (request.status === 200) {
                var content = '<ul>';
                var articleData = JSON.parse(this.responseText);
                for (var i=0; i< articleData.length; i++) {
                    content += `<li>
                    <a href="/articles/${articleData[i].title}">${articleData[i].heading}</a>
                    (${articleData[i].date.split('T')[0]})</li>`;
                }
                content += "</ul>"
                articles.innerHTML = content;
            } else {
                articles.innerHTML('Oops! Could not load all articles!')
            }
        }
    };
    
    request.open('GET', '/get-articles', true);
    request.send(null);
}


// The first thing to do is to check if the user is logged in!
loadLogin();

// Now this is something that we could have directly done on the server-side using templating too!
loadArticles();