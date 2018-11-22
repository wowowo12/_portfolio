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
   		})
   	} else {
   		$('#nav').css({
   			'display': 'none'
   		});
   	}
   });



  $("#header").mousemove(function (evt) {
  	var delta = 50;
  	var cX = evt.clientX;
  	var cY = evt.clientY;
  	var iX = $(this).find(".l_img").width() / 2;
  	var iY = $(this).find(".l_img").height() / 2;
  	var mX = (iX - cX) / delta;
  	var mY = (iY - cY) / delta;
  	$(this).find(".l_img").css("transform", "translate(" + mX + "px, " + mY + "px)");
  });

  $("#header").mousemove(function (evt) {
  	var delta = 50;
  	var cX = evt.clientX;
  	var cY = evt.clientY;
  	var iX = $(this).find(".r_img").width() / 2;
  	var iY = $(this).find(".r_img").height() / 2;
  	var mX = (iX - cX) / delta;
  	var mY = (iY - cY) / delta;
  	$(this).find(".r_img").css("transform", "translate(" + mX + "px, " + mY + "px)");
  });

  $("#header").mousemove(function (evt) {
  	var delta = 50;
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
  })