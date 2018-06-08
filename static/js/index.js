var oDate = new Date();

var str = oDate.getHours() + ":" + oDate.getMinutes();
var oTime = document.getElementById('time');

oTime.innerHTML = str;
setInterval(function() {
	oDate = new Date();
	str = oDate.getHours() + ":" + oDate.getMinutes();

	oTime.innerHTML = str;
}, 1000);

//模态框
var mask = document.getElementById("mask");
var login = document.getElementById("login");
mask.style.display = "block";
login.style.display = "block";

var oConfire = document.getElementById("confire");
var oName = document.getElementById('sayName');

oConfire.onclick = function() {
	var namer = oName.value
	if(oName.value == '') return;
	mask.style.display = "none";
	login.style.display = "none";
	socket.emit('sendName', namer);
	console.log(namer)
};

//socket
var socket = io.connect();
var index = 8;
var oCon = document.getElementById('context');
socket.on('getName',function(data) {
	var oDiv = document.createElement('div');
	oDiv.style.position = 'relative';
	oDiv.innerHTML = '<span class="span1"><span class="span2">欢迎&nbsp'+data+'&nbsp到来</span></span>'
	oCon.appendChild(oDiv);
	oDiv.style.top = index+'px';
	index = index+oDiv.offsetHeight;
	
})



var oInput = document.getElementById('input');
oInput.addEventListener('keydown', function(ev) {

	var oEvent = ev || event;
	if(oEvent.keyCode == 13) {
		var inputText = oInput.value;
		oInput.value='';
		if(inputText == '') return;

		socket.emit('sendData', inputText);
		console.log(inputText);
	}
})

socket.on('getMyData', function(data) {
	var oDiv = document.createElement('div');
	console.log(data)
	var html = '<img src="img/'+data[0]+'.jpg" />' +
		'<div class="name">'+data[1]+'</div>' +
		'<div class="chat clearfix">' +
		'<div class="text">' +
		data[2] +
		'</div>' +
		'<div class="tra"></div></div>'
	oDiv.className = 'chatRight';

	oDiv.innerHTML = html;
	oCon.appendChild(oDiv);

	oDiv.style.top = index + 'px';
	index = index + 66

})
socket.on('getData', function(data) {
	socket.on('getCurentname',function(data){
		sayName = data;
	})
	var oDiv = document.createElement('div');

	
	console.log(data)
	var html = '<img src="img/'+data[0]+'.jpg" />' +
		'<div class="name1">'+data[1]+'</div>' +
		'<div class="chat1 clearfix">' +
		'<div class="text1">' +
		data[2] +
		'</div>' +
		'<div class="tra1"></div></div>'
	oDiv.className = 'chatleft';

	oDiv.innerHTML = html;
	oCon.appendChild(oDiv);

	oDiv.style.top = index + 'px';
	index = index + 66
})

