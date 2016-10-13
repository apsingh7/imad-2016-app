console.log('Loaded!');
console.log('Loaded!');

var element=document.getElementById('main-text');
element.innerHTML="New Value";

//Move the Image.

var img=document.getElementById('modi');
var marginLeft=0; 
function moveRight()
{
	marginLeft=marginLeft+5;
	img.style.marginLeft=marginLeft + 'px';
}
img.onclick=function(){
	var interval=setInterval(moveRight,50);
	
};