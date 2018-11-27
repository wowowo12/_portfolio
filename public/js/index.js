  var config = {
  	apiKey: "AIzaSyDAaQWzoUwJr8lN-RpBH5-Xx_Ys0oy_MxM",
  	authDomain: "wowowo-portfolio.firebaseapp.com",
  	databaseURL: "https://wowowo-portfolio.firebaseio.com",
  	projectId: "wowowo-portfolio",
  	storageBucket: "wowowo-portfolio.appspot.com",
  	messagingSenderId: "136439368227"
  };
  firebase.initializeApp(config);

  var auth = firebase.auth();
  var db = firebase.database();
  var googleAuth = new firebase.auth.GoogleAuthProvider();

  $("#google_login").click(function () {
  	auth.signInWithPopup(googleAuth);
  })
  $("#google_logout").click(function () {
  	auth.signOut();
  });

  auth.onAuthStateChanged(function (result) {
  	user = result;
  	if (result) init();

  });

  function init() {
  	//$("#google_login").hide();
  	$("#google_logout").show();
  }

	//fullpage-event

	/*
	 -case 1
		var pages = new WheelScroll({
		page:".page",
		nav: ".nav";  (지금은 .list) 있으면 연동
		speed: 200}); //whell.js파일사용시 적용
	 -case 2
		var pages = new WheelScroll();
	 */

	var offTop = [];
	var scTop = 0;
	var now = 0;
	$(window).scroll(function(){
		scTop = $(this).scrollTop();	//현재문서의 스크롤 된 값을 찾는다.
		$(".page").each(function(i){
			offTop[i] = $(this).offset().top;	//부모로부터 떨어진 거리(top)
			if(scTop >= offTop[i]) {
				now = i; 
			}	
			
		});
		console.log(now);
	});
	

  var scTop = $(window).scrollTop(); //현재 윈도우의 scrollTop의값
  var gap = [];
  var now = 0;
  $(window).resize(function () {
  	$(".page").each(function (i) {
  		gap[i] = $(this).offset().top;
  	});
  }).trigger("resize")
  $(window).on("mousewheel DOMMouseScroll", wheelFn);
  function wheelFn(e) { //scroll event를 받아오기
  	e.preventDefault();
  	e.stopPropagation();
  	//console.log(e.originalEvent.wheelDelta);
  	var dir = e.originalEvent.wheelDelta;
  	$(window).off("mousewheel DOMMouseScroll"); //첫휠이 발생하는 순간 이벤트를 없애기
  	scTop = $(window).scrollTop(); //현재 윈도우의 scrollTop의값
  	//console.log(gap); //배열로 [1p,2p,3p,4p ...이렇게 값이 들어옴]
  	for (var i = 0; i < gap.length; i++) {
  		if (scTop <= gap[i]) {
  			now = i;
  			break;
  		}
  	}
  	if (dir > 0) {
  		if (now > 0) now--; //+일땐 -
  	} else {
  		if (now < gap.length - 1) now++;
  	}
  	$("html, body").stop().animate({
  		"scrollTop": gap[now] + "px"
  	}, 300, function () {
  		$(window).on("mousewheel DOMMouseScroll", wheelFn); //애니메이션이 끝나는 순간 다시붙이기
  	});
  	//console.log(now);
  }

	//
  $(".list").click(function () {
		var oldNow = now;
		now =$(this).data("now");
		var speedGap=Math.abs(now - oldNow);
  	$("html, body").stop().animate({
  		"scrollTop": gap[now] + "px"
  	});
	});
	
   $(window).scroll(function () {
   	if ($(this).scrollTop() <= 100) {
 		$('#nav').slideDown().css({
   			'background-color': 'rgba(98,96,95,0.5)',
   			'display': 'block'
   		});
   	} 
   });
   $(window).mousemove(function(e){
	   var posY=e.pageY;
	   if(posY<100){
		   $("#nav").css({"display":"block"});
	   }
	   if(posY>=100) $("#nav").css({"display":"none"});
   })



  $("#header").mousemove(function (evt) {
  	var delta = 50;
  	var cX = evt.clientX;
  	var cY = evt.clientY;
  	var iX = $(this).find(".l_img").width() / 2;
  	var iY = $(this).find(".l_img").height() / 2;
  	var mX = (iX - cX) / delta;
  	var mY = (iY - cY) / delta;
  	$(this).find(".l_img").css("transform", "translate(" + -mX + "px, " + -mY + "px)");
  });

  $("#header").mousemove(function (evt) {
  	var delta = 50;
  	var cX = evt.clientX;
  	var cY = evt.clientY;
  	var iX = $(this).find(".r_img").width() / 2;
  	var iY = $(this).find(".r_img").height() / 2;
  	var mX = (iX - cX) / delta;
  	var mY = (iY - cY) / delta;
  	$(this).find(".r_img").css("transform", "translate(" + -mX + "px, " + -mY + "px)");
  });

  $("#header").mousemove(function (evt) {
  	var delta = 90;
  	var cX = evt.clientX;
  	var cY = evt.clientY;
  	var iX = $(this).find(".h_circle").width() / 2;
  	var iY = $(this).find(".h_circle").height() / 2;
  	var mX = (iX - cX) / delta;
  	var mY = (iY - cY) / delta;
  	$(this).find(".h_circle").css("transform", "translate(" + mX + "px, " + mY + "px)");
  });

  $(".fa-bars").click(function () {
  	$("#nav").slideToggle();
  })

  $(".navs_down").hover(function () {
  	$(".navs_menu").stop().slideToggle();
	});


	/*var ctx = $("#Chart1")
	var myChart = new Chart(ctx, {
		type: 'doughnut',
		data: {
			labels: ["Ps"],
			datasets: [{
				data: [80,20],
				backgroundColor: [
					'rgba(255, 179, 0, 1)',
					'rgba(255, 255, 255,1)',
				],
				borderWidth: 0
			},]
		},
	});*/
	var data = [{
		datasets: [{
				data: [75, 25],
				backgroundColor: [
					'#ffb300',
					'#fff'
				],
				borderWidth: 0
		}]
	},{
	datasets: [{
				data: [70,30],
				backgroundColor: [
					'#ffb300',
					'#fff'
				],
				borderWidth: 0
		}]
	},{
		datasets: [{
				data: [80,20],
				backgroundColor: [
					'#ffb300',
					'#fff'
				],
				borderWidth: 0
		}]
	},{
	datasets: [{
			data: [60,40],
			backgroundColor: [
				'#ffb300',
				'#fff'
			],
			borderWidth: 0
	}]
}];
	var option = [{
		tooltips : {
			enabled: false
		},
	cutoutPercentage: 65
		
	},{
		tooltips : {
			enabled: false
		},
		cutoutPercentage: 65
	},{
		tooltips : {
			enabled: false
		},
		cutoutPercentage: 65
	},{
		tooltips : {
			enabled: false
		},
		cutoutPercentage: 65
	}];
	var chart = [];
	
	var ctx = $(".chart");
	ctx.each(function(i){
		chart[i] = new Chart($(this), {
			type: 'doughnut',
			data: data[i],
			options: option[i]
		});
	});
	
	




// moveType (0:left / 1:right) 
var moveType = 1; 
// 이동시간간격 3초 
var moveSpeed = 1500; 
// 움직이는 작업중 다시 명령 받지 않음 
var moveWork = false; 
// 일시정지 flag 
var movePause = false; 
function imgMove(){ 
    if(moveWork==false){ 
       // 0d\일경우 left방향 
      if(moveType==0){ 
         // 맨처음 이미지의 폭 
         var aWidth = $("#poster > .posters > a:first").width(); 
         // 롤링마지막에 맨처음의 a태그 추가 
         $("#poster > .posters").append("<a href=\""+$("#poster > .posters > a:first").attr("href")+"\">" + $("#poster > .posters > a:first").html()+ "</a>"); 
         // 맨처음이미지를 왼쪽으로 이동시킨다. 
         $("#poster > .posters > a:first").animate({marginLeft:-aWidth},{duration:moveSpeed,step:function(){ 
         // 이동중 만약 일시정지 flag가 true라면 
         },complete:function(){ 
         // 이동을 마친후 첫번째 a태그를 지워버린다 
         $(this).remove(); 
         // 이미지 움직이는것을 다시 실행 
         imgMove(); 
      }}); 
      }else{ 
      // 마지막 a태그의 폭 
       var aWidth = $("#poster > .posters > a:last").width(); 
       // a태그 앞에 마지막의 a태그를 생성한다 단 스타일은 마지막 a태그의 폭만큼 빼준다 
       $("<a href=\"" + $("#poster > .posters > a:last").attr("href")+ "\" style=\"margin-left:-" + aWidth + "px\">" + $("#poster > .posters > a:last").html()+ "</a>").insertBefore("#poster > .posters > a:first") 
       // 맨처음 a태그의 margin-left를 다시 0으로 맞춰준다. 
      $("#poster > .posters > a:first").animate({marginLeft:0},{duration:moveSpeed,step:function(){ 
       // 이동중 만약 일시정지 flag가 true라면 
       },complete:function(){ 
       // 이동을 마친후 마지막 a태그를 지워버린다 
       $("#poster > .posters > a:last").remove(); 
       // 이미지 움직이는것을 다시 실행 
       imgMove(); 
    }}); 
 } 
 } 
 } 
 function goMove(){ 
    // 일시정지가 풀려있을 경우를 대비하여 일시정지를 풀러준다 
    movePause=false; 
    // 0d\일경우 left방향 
    if(moveType==0){ 
       imgMove(); 
       }else{ 
       $("#poster > .posters > a:first").animate({marginLeft:0},{duration:moveSpeed,step:function(){ 
       // 이동중 만약 일시정지 flag가 true라면 
       if(movePause==true){ 
          // 이동을 멈춘다 
          $(this).stop(); 
      } 
       },complete:function(){ 
      // 이동을 마친후 마지막 a태그를 지워버린다 
      //$(".RollDiv > div > a:last").remove(); 
      // 이미지 움직이는것을 다시 실행 
      imgMove(); 
   }}); 
}
   
}
imgMove(); 
