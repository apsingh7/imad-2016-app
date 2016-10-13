var counter=0;
window.onload = function(){
document.getElementById('counter').onclick=function()
{
	counter =counter+1;
	var span=document.getElementById('count');
span.innerHTML=counter.toString();
};
};




var nameInput=document.getElementById('name');
//var name = nameInput.value;
window.onload = function(){
document.getElementById('submit').onclick=function(){
	var names=['name1','name2','name3'];
	var list='';
	for(var i=0;i<names.length;i++)
	{
		list +='<li>'+names[i]+'</li>';
		
	}
	var ul=document.getElementById('namelist');
	ul.innerHTML=list;
};
};