//#snd 접근법
// $("#snd") ->jQuery
// document.getElementById("snd") ES5
// document.querySelector("#snd") ES6



// console.log($("#snd")[0]) jQuery를 javascript 데이터로 가져올때
// = console.log(document.querySelector("#snd"));


// #snd 접근법
// $("#snd") -> jQuery
// document.getElementById("snd") -> ES5
// document.querySelector("#snd") -> ES6
//console.log($("#snd")[0]);
//console.log(document.querySelector("#snd"));

// 1번 hasClass 사용
/*
$("#bt_play").click(function(){
	if($(this).hasClass("fa-play-circle")) {
		$("#snd")[0].play();
		$(this).removeClass("fa-play-circle").addClass("fa-pause-circle");
	}
	else {
		$("#snd")[0].pause();
		$(this).removeClass("fa-pause-circle").addClass("fa-play-circle");
	}
});
*/
// 2번 played 속성 사용
/*
$("#bt_play").click(function(){
	if($("#snd")[0].paused) {
		$("#snd")[0].play();
		$(this).removeClass("fa-play-circle").addClass("fa-pause-circle");
	}
	else {
		$("#snd")[0].pause();
		$(this).removeClass("fa-pause-circle").addClass("fa-play-circle");
	}
});
*/
// 3번 순수 자바스크립트

var snd = document.querySelector("#snd");
var btPlay = document.querySelector("#bt_play");
btPlay.addEventListener("click", soundPlay);

function soundPlay() {
	if (snd.paused) {
		snd.play();
		this.classList.toggle("fa-play-circle", false);
		this.classList.toggle("fa-pause-circle", true);
	} else {
		snd.pause();
		this.classList.toggle("fa-play-circle", true);
		this.classList.toggle("fa-pause-circle", false);
	}
}
$("#sel_snd").on("change", function () {
	$("#snd")[0].src = $(this).val(); //audio자체의 src속성을 바꿔주는 값을 써야한다. method가 아닌 property(
	$("#snd")[0].play();
	$("#bt_play").removeClass("fa-play-circle").addClass("fa-pause-circle");
})


$("[data-slider]").on("slider:ready", function (e, data) {
	$("#snd")[0].volume = 0.5;
});
$("[data-slider]").on("slider:changed", function (e, data) {
	$("#snd")[0].volume = data.value.toFixed(1);
});

$("#bt_volume").on("click", function () {
	if ($(this).hasClass("fa-volume-up")) 
	{
		$(this).removeClass("fa-volume-up").addClass("fa-volume-off");
		$("#snd")[0].muted =true;
	
	}
	else($(this).hasClass("fa-volume-off"))
	{
		$(this).removeClass("fa-volume-off").addClass("fa-volume-up");
		$("#snd")[0].muted = false;
	
	}
})

//--->정리