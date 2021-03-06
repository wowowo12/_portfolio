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
  var ref;
var user;
var key = '';


  $("#google_login").click(function () {
  	auth.signInWithPopup(googleAuth);
  })
  $("#google_logout").click(function () {
	  auth.signOut();
	
  });

  auth.onAuthStateChanged(function (result) {
  	user = result;
	  if (result) init();
	  else {
		$(".login").show();
		$(".ct_cont").empty();
	}

  });
  function init() {
  	$("#google_login").hide();
	  $("#google_logout").show();
	  $(".ct_cont").empty();
	  ref = db.ref("root/memos/");
	  ref.on("child_added", onAdd);
	  ref.on("child_removed", onRev);
  }

function onAdd(data) {
	var id = data.key;
	var val = data.val();
	var html = '';
	html += '<li id="'+id+'">';
	html += '<h6>'+val.content+'</h6>';
	html += '<p>'+val.email+'</p>';
	html += '<button onclick="revData(this);"><i class="fa fa-trash"></i></button>';
	html += '</li>';
	$(".lists").prepend(html);
}
function onRev(data) {
	$("#"+data.key).remove();
}
$("#ct_push").click(function(){
	var content = $("#content").val();
	if(content == "") {
		alert("내용을 입력하세요.");
		$("#content").focus();
	}
	else {
		ref = db.ref("root/memos/");
		ref.push({
			content: content,
			wdate: new Date().getTime(),
			email: user.email
		}).key;
		$("#content").val("");
	}
});
function revData(obj){
	var id = $(obj).parent().attr("id");
	if($(obj).parent().find("h5").html() == user.email) {
		ref = db.ref("root/memos/"+id);
		ref.remove();
	}
	else {
		alert("타인의 글은 삭제할 수 없습니다.");
	}
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
	

	var data = [{
		datasets: [{
				data: [75, 25],
				backgroundColor: [
					'#ffb300',
					'#ffe19b'
				],
				borderWidth: 0
		}]
	},{
	datasets: [{
				data: [70,30],
				backgroundColor: [
					'#ffb300',
					'#ffe19b'
				],
				borderWidth: 0
		}]
	},{
		datasets: [{
				data: [80,20],
				backgroundColor: [
					'#ffb300',
					'#ffe19b'
				],
				borderWidth: 0
		}]
	},{
	datasets: [{
			data: [60,40],
			backgroundColor: [
				'#ffb300',
				'#ffe19b'
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

		if(now == 1) {
			var ctx = $(".chart");
			ctx.each(function(i){
				chart[i] = new Chart($(this), {
					type: 'doughnut',
					data: data[i],
					options: option[i]
				});
			});

			$(".me_left").addClass("me_left_ani");
			$(".me_right").addClass("me_right_ani");
			$(".software").addClass("software_ani");
			$(".skills").addClass("skills_ani");
			$(".range_bg").children().addClass("range");
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
	

   $(document).mousemove(function(e){
	var posY=e.clientY;
	if(posY<70){
		$("#nav").css({"display":"block"});
	}
});
$("#nav").mouseleave(function(){
 $("#nav").fadeOut(300);
});

$(window).scroll(function () {
	if ($(this).scrollTop() <= 70) {
	  $('#nav').fadeOut(300);	   
	} 
});



  $("#header").mousemove(function (evt) {
  	var delta = 50;
  	var cX = evt.clientX;
  	var cY = evt.clientY;
  	var iX = $(this).find(".move").width() / 2;
  	var iY = $(this).find(".move").height() / 2;
  	var mX = (iX - cX) / delta;
  	var mY = (iY - cY) / delta;
  	$(this).find(".move").css("transform", "translate(" + -mX + "px, " + -mY + "px)");
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
  $("#contact").mousemove(function (evt) {
	var delta = 50;
	var cX = evt.clientX;
	var cY = evt.clientY;
	var iX = $(this).find(".ct_ct").width() / 2;
	var iY = $(this).find(".ct_ct").height() / 2;
	var mX = (iX - cX) / delta;
	var mY = (iY - cY) / delta;
	$(this).find(".ct_ct").css("transform", "translate(" + mX + "px, " + mY + "px)");
});


//   $(".fa-bars").click(function () {
//   	$("#nav").slideToggle();
//   })

//   $(".navs_down").hover(function () {
//   	$(".navs_menu").stop().slideToggle();
// 	});


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
         var aWidth = $(".poster > .posters > a:first").width(); 
         // 롤링마지막에 맨처음의 a태그 추가 
         $(".poster > .posters").append("<a href=\""+$(".poster > .posters > a:first").attr("href")+"\">" + $(".poster > .posters > a:first").html()+ "</a>"); 
         // 맨처음이미지를 왼쪽으로 이동시킨다. 
         $(".poster > .posters > a:first").animate({marginLeft:-aWidth},{duration:moveSpeed,step:function(){ 
         // 이동중 만약 일시정지 flag가 true라면 
         },complete:function(){ 
         // 이동을 마친후 첫번째 a태그를 지워버린다 
         $(this).remove(); 
         // 이미지 움직이는것을 다시 실행 
         imgMove(); 
      }}); 
      }else{ 
      // 마지막 a태그의 폭 
       var aWidth = $(".poster > .posters > a:last").width(); 
       // a태그 앞에 마지막의 a태그를 생성한다 단 스타일은 마지막 a태그의 폭만큼 빼준다 
       $("<a href=\"" + $(".poster > .posters > a:last").attr("href")+ "\" style=\"margin-left:-" + aWidth + "px\">" + $(".poster > .posters > a:last").html()+ "</a>").insertBefore(".poster > .posters > a:first") 
       // 맨처음 a태그의 margin-left를 다시 0으로 맞춰준다. 
      $(".poster > .posters > a:first").animate({marginLeft:0},{duration:moveSpeed,step:function(){ 
       // 이동중 만약 일시정지 flag가 true라면 
       },complete:function(){ 
       // 이동을 마친후 마지막 a태그를 지워버린다 
       $(".poster > .posters > a:last").remove(); 
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
       $(".poster > .posters > a:first").animate({marginLeft:0},{duration:moveSpeed,step:function(){ 
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

var banner = new Slide($("#slides2"), {
	type: "infinite",
	delay: 1500,
	speed: 1500,
	hover: true,
	pager: true,
	pagerPos: "bottom",
	pagerVal: "10px",
	pagerSymbol: "●",
}); y



var SpaAni = (function(){
	function SpaAni(_page, _elem, _gap) {
		var obj = this;
		this.page = $(_page);
		this.elem = _elem;
		this.scTop = 0;
		this.pos = [];
		this.now = 0;
		this.gap = _gap;
		$(window).resize(function(){
			for(var i=0; i<obj.page.length; i++) {
				obj.pos[i] = $(obj.page[i]).position().top;
			}
		}).trigger("resize");
		$(window).scroll(function(){
			obj.scTop = $(this).scrollTop();
			obj.init(obj);
		}).trigger("scroll");
	};
	SpaAni.prototype.init = function(obj){
		for(var i=0; i<obj.page.length; i++) {
			if(obj.scTop+obj.gap > obj.pos[i]) obj.now = i;
		}
		$(obj.page[obj.now]).find(obj.elem).each(function(){
			var cls = $(this).data("ani");
			$(this).addClass("card");
		});
	};
	return SpaAni;
}());




