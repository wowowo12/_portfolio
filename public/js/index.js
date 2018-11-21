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

  $(".google_login").click(function(){
	auth.signInWithPopup(googleAuth);
  })
  $(".google_logout").click(function(){
	  auth.signOut();
  });


 function init(){
	  $(".google_login").hide();
 	  $(".google_logout").show();
   }
   auth.onAuthStateChanged(function(result){
	user = result;
	  if(result) init();
 	 
   })

   
 $(window).scroll(function() {
 	if($(this).scrollTop() <= 100){
 		$('#nav').slideDown().css({'background-color':'rgba(98,96,95,0.5)','display':'block'})}
 	else{
 		$('#nav').css({'display':'none'});}
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

$(".fa-bars").click(function(){
	$("#nav").slideToggle();
})

$(".navs_down").hover(function(){
	$(".navs_menu").stop().slideToggle();
})
