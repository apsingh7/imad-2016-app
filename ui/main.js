//var button = document.getElementById('counter');
var counter=0;
window.onload = function(){
document.getElementById('counter').onclick = function(){
    
 var request = new XMLHttpRequest();
request.onreadystatechange = function()
{
	if(request.readyState===XMLHttpRequest.DONE){
	if(request.status===200)
	{
		var counter=request.responseText;
			var span=document.getElementById('count');
span.innerHTML=counter.toString();
	}		
	}
	//make the request
	request.open('GET' ,'http://apsingh7.imad.hasura-app.io/counter',true );
	request.send(null);
};
};
};
