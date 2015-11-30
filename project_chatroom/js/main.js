//user資訊
var user = {
	name:"",
	age:"",
	message:""
};
var receiveUser = 'all';


$(function(){
	var socket = io.connect('http://140.115.205.117:4000/'); //連接server
	$('#main').hide();
	$('.check').click(function(){	//輸入暱稱年齡後進入
		user.name = $('.name').val();
		user.age = $('.age').val();
		socket.emit('new user',user.name);
		if(user.name != "" && user.age != ""){  //欄位不可為空
			$('#login').hide();
			$('#main').fadeIn('slow');
		}
	});
		  	
	/*************按鈕動作**************/
	//傳送鍵
	$('.btn.send').click(function(){	
		sendMessage();
	});
	//Enter鍵
	$(document).keydown(function(event){   
	   	if(event.keyCode == 13){
			sendMessage();
		}
	});
	//在線列表鍵
	$('.btn.online').click(function(){
		$(".sidebar").animate({ left:'0px' }, 500 ,'swing');
	});
	//在線列表關閉鍵
	$('.btn.close').click(function(){
		$(".sidebar").animate({ left:'-320px' }, 500 ,'swing');
	});
	//選擇密語對象鍵
	$('#userSelect').change(function(){
		receiveUser = $('#userSelect').find(':selected').val();	
	});
	//上傳圖片鍵
	$('.btn.upload').click(function(){
		$('#upload').click();
	});
	$('.btn.receive').click(function(){
		$('#userSelect').change(function(){
			receiveUser = $('#userSelect').find(':selected').val();	
		});
	});
	/************圖片容器****************/
	$('#upload').change(function(){
		if($('#upload').val()!=''){
			readUpload(this);
			$('#upload').val('');
		}
	});

	/*************socket.on*************/
    //接收別人的訊息
	socket.on('message',function(user, receiveUser, message){
		recieveMessage(user, receiveUser, message);
		if (Notification && Notification.permission === "granted") {
      		spawnNotification(user+": "+message,"img/icons/icon48x48.png","WEIKER");
    	}
	});
	//接收別人的圖片
	socket.on('image',function(user, receiveUser, image,time){
		if(receiveUser=='all'){
			$('#msgcontent').append('<p>'+ user + ":" +'</p>',[$('<img>', {class:"otherImg" ,src: image})],'<p class="othersendTime">'+time+'</p>');
		}
		else{
			$('#msgcontent').append('<p>[密語]'+ user + ":" +'</p>',[$('<img>', {class:"otherImg" ,src: image})],'<p class="othersendTime">'+time+'</p>');
		}
		if (Notification && Notification.permission === "granted") {
      		spawnNotification(user+" 向您傳送了圖片","img/icons/icon48x48.png","WEIKER");
    	}
		scrollMessage();
	});

	//在線列表
	socket.on('add userList', function (user) {
	//add user list to selector without user-self
		$('#userSelect').append($('<option></option>').attr('value', user).text(user));
		$('.sidebar').append('<li>'+user+" " +'</li>');
		/*$('.sidebar').append($('<li>',{class:user}));
		$('.user').text(user);*/
    });

    //接收上線訊息
	socket.on('user join',function(user){
		$('#msgcontent').append('<p class="loginmsg">'+user+' 上線了</p>');
		scrollMessage();
		
	});
	
	//接收下線訊息
	socket.on('user left', function (user) {
        $('#msgcontent').append('<p class="loginmsg">'+user+' 離線了</p>');
        scrollMessage();
		//remove leaved user in selector 
		$('#userSelect').find('[value=\''+user+'\']').remove();

    });
	//名稱重複
	socket.on('name repeat',function(){
	alert("這個名字有人使用囉!");
	window.location.reload();
	});
	/****************function******************/
	// 傳輸訊息
	function sendMessage(){
		user.message = $('#input').val();
		if(user.message != ""){ 
			//公開聊天
			if(receiveUser=='all'){
				$('#msgcontent').append('<div class="mySend"><div class="myDialogue"><li>'+ user.name +": " +user.message+'</li><div class="myArrow"></div></div>'+'<p class="sendTime">'+nowTime()+'</p></div>');
				socket.emit('message',receiveUser,user.name,user.message,nowTime());//傳輸這項訊息到後端
				$('#input').val("");//清空輸入列
			}
			//私人聊天
			else{
				$('#msgcontent').append('<div class="mySend"><div class="myDialogue"><li>'+"[密語]"+receiveUser+ ": "+user.message+'</li><div class="myArrow"></div></div>'+'<p class="sendTime">'+nowTime()+'</p></div>');
				socket.emit('message',receiveUser,user.name,user.message,nowTime());
				$('#input').val("");//清空輸入列
				
			}
			scrollMessage();
		}
	}
	//接收訊息
	function recieveMessage(user, receiveUser, message){
		//公開聊天
		if(receiveUser=='all'){
			$('#msgcontent').append('<div class="otherSend"><div class="otherDialogue"><li>'+ user +": " +message+'</li><div class="otherArrow"></div></div>'+'<p class="othersendTime">'+nowTime()+'</p></div>');
		}
		//私人聊天
		else{
			$('#msgcontent').append('<div class="otherSend"><div class="otherDialogue"><li>'+"[密語]"+user+ ": "+message+'</li><div class="otherArrow"></div></div>'+'<p class="othersendTime">'+nowTime()+'</p></div>');
		}
		scrollMessage();
	}
	//取得送出訊息的時間
	function nowTime(){
		var time = new Date();
		var hr   = time.getHours()
		var min  = time.getMinutes();
		if(time.getHours()<=9){
			hr="0"+time.getHours();
		}
		if(time.getMinutes()<=9){
			min="0"+time.getMinutes();
		}
		var sendTime=hr+":"+min;
		return sendTime;
	}
	//上傳圖片
	function readUpload(input) {
		if ( input.files && input.files[0] ) {
			var FR= new FileReader();
			FR.onload = function(e) {
				if(receiveUser=='all'){
					$('#msgcontent').append('<p class="sendImg">'+ user.name + ":" +'</p>',[$('<img>', {class:"myImg" ,src: e.target.result})],'<p class="sendTime">'+nowTime()+'</p>');
				}
				else{
					$('#msgcontent').append('<p class="sendImg">[密語]給 '+ receiveUser + " :" +'</p>',[$('<img>', {class:"myImg" ,src: e.target.result})],'<p class="sendTime">'+nowTime()+'</p>');
				}
				socket.emit('image',user.name, receiveUser, e.target.result,nowTime());
			};       
			FR.readAsDataURL( input.files[0] );
		}
		scrollMessage();
	}
	//視窗自動滾動
	function scrollMessage(){
		$('#msgcontent').stop().animate({scrollTop: $("#msgcontent")[0].scrollHeight}, 800);
	}

	function spawnNotification(theBody,theIcon,theTitle) {
		var options = {
		    body: theBody,
		    icon: theIcon
		}
		var n = new Notification(theTitle,options);
	}



});
