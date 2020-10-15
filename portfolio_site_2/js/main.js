$(function(){
	var activeNum=0; //현재 활성화 번호
	//슬라이더 JS
	var swiper = new Swiper('#slider .swiper-container', {
		autoplay: {
			delay: 5000,
		  },
		pagination: {
			el: '#slider .swiper-pagination',
			type: 'fraction',
		},
		navigation: {
			nextEl: '#slider .swiper-button-next',
			prevEl: '#slider .swiper-button-prev',
		},
		on: { //3) 비디오 영역에서 좌우 버튼 표시하지 않기. API
			init: function(){ //초기화 이벤트
				// $("#slider .swiper-button-prev").hide();
				// $("#slider .swiper-button-next").hide();
			},
			transitionEnd: function() { //페이지 변경시
				swiper.autoplay.start();
				
				activeNum = swiper.activeIndex;

				//jQuery에서 순차적으로 노드를 읽는 방식
				
					if(activeNum == 0){ //첫번째 카테고리 비디오 영역
						// $("#slider .swiper-button-prev").hide();
						// $("#slider .swiper-button-next").hide();
						video.play();
					}
					else { 
						// $("#slider .swiper-button-prev").show();
						// $("#slider .swiper-button-next").show();
						video.pause();
					}
				
			}
		}
	});

		//비디오 구현 JS
	//1) 비디오 아이패드 꽉채우기
	var winW;
	var winH;
	var videoW;
	var videoH;
	var video=document.getElementById("intro");

	video.addEventListener("loadeddata",function(){
		videoW=$("#intro").width();
		videoH=$("#intro").height();
	});

	$(window).resize(function(){
		$("#intro").removeAttr("style"); //화면전환시 초기화
		winW=$(window).width();
		winH=$(window).height();
		if(winW > winH){ //landscape
			$("#intro").css({width : winW});
			videoH=$("#intro").height(); //현재 크기 업데이트
			if(videoH < winH) { //비디오가 윈도우보다 작은경우
				$("#intro").css({width:"auto", height:winH});
			}
		}
		else{ //portrait
			$("#intro").css({height: winH});
		}
		});
	$(window).trigger("resize");

	//2) 자동실행, 디비도 완료되면 다시 실행
	video.muted=true;
	video.play();

	video.addEventListener("ended",function(){
		video.currentTime=0;
		video.play();
	});
	//3) 비디오 영역에서 좌우 버튼 표시하지 않기. 위에
	//4) 비디오 영역에서만 실행되어야함.

	var upperStatus=false;
	var $tab=$(this).find(".btn_all_menu"); // 탭 아이콘
	var $upper=$("#header .upper"); // 상단 영역
	var scrollposi=0;	

	$("#header .upper .tab").click(function(e){
		e.preventDefault();

		if($tab.hasClass("active")){ // 메뉴가 닫히는 상황
			$tab.removeClass("active");
			$("#menu_dim").fadeOut(300);
			$("#trip_dim").fadeOut(300);
			$("nav > ul > li").removeClass("active");
			$("nav ul ul").slideUp(300);
			menuAction();
			
			if(upperStatus){
				$upper.addClass("active");
			}
		}
		else{ // 메뉴가 열리는 상황
			$tab.addClass("active");
			$("#menu_dim").fadeIn(300);

			if(upperStatus){
				$upper.removeClass("active");
			}
		}
	});

	// $("#trip .list .description").click(function(e){
	// 	e.preventDefault();

	// 	if($tab.hasClass("active")){ // 메뉴가 닫히는 상황
	// 		$tab.removeClass("active");
	// 		$("#trip_dim").fadeOut(300);
	// 		menuAction();
			
	// 		if(upperStatus){
	// 			$upper.addClass("active");
	// 		}
	// 	}
	// 	else{ // 메뉴가 열리는 상황
	// 		$tab.addClass("active");
	// 		$("#trip_dim").fadeIn(300);

	// 		if(upperStatus){
	// 			$upper.removeClass("active");
	// 		}
	// 	}

	// });

	$("nav > ul > li").click(function(e){
		e.preventDefault();

		if($(this).hasClass("active") == false) {
			$("nav > ul > li").removeClass("active");
			$(this).addClass("active");
			$("nav ul ul").slideUp(300);
			$(this).find("ul").slideDown(300);
		}
		else {
			$(this).removeClass("active");
			$(this).find("ul").slideUp(300);
		}
	});

	$("#header .upper .logo").click(function(e){
		e.preventDefault();
		$("html").animate({scrollTop:0}, 500);
	});

	
	var scrollTimer=0;

	$(window).scroll(function(){ //스크롤
		scrollheight=$(window).scrollTop();
		clearTimeout(scrollTimer);
		scrollTimer=setTimeout(function(){
			if($tab.hasClass("active")) return;
			menuAction();


			if(scrollheight <= $("#pension").offset().top) {
				$("#pension .title").addClass("effect");
				$("#pension .swiper-slide").addClass("effect");
				$("#pension .swiper_inner").addClass("effect")
			}
			else if(scrollheight <= $("#notice").offset().top) {
				$("#notice .title").addClass("effect");
				$("#notice .notice_btn").addClass("effect");
				$("#notice .list").addClass("effect");
			}
			else if(scrollheight <= $("#trip").offset().top) {
				$("#trip .title").addClass("effect");
				$("#trip .list").addClass("effect");
			}
			else if(scrollheight <= $("#service").offset().top - 100) {
				$("#service .title").addClass("effect");
				$("#service .list").addClass("effect");
			} 
			else if(scrollheight <= $("#map").offset().top) {
				$("#map").addClass("effect");
				$("#footer").addClass("effect");
			}

		},15);

	});

	function menuAction(){  //메뉴 오류 펑션
		scrollposi=$(window).scrollTop();
		if(scrollposi > $("#slider .swiper-pagination").offset().top) {
			$("#header .upper").addClass("active");
			upperStatus=true;
		}
		else {
			$("#header .upper").removeClass("active");
			upperStatus=false;
		}
	}


	//콘텐츠 스와이퍼

	var swiper2 = new Swiper('#pension .swiper-container', {
		autoplay: {
			delay: 5000,
		  },
		spaceBetween: 25,
		scrollbar: {
			el: '#pension .swiper-scrollbar',
			hide: false,
		},
		navigation: {
			nextEl: '#pension .swiper-button-next',
			prevEl: '#pension .swiper-button-prev',
		},
	});

	$("#pension .swiper_inner .btn .play").click(function(){

		$(this).toggleClass("active");
		var swiperhas = $(this).hasClass("active");

		if(swiperhas) { //정지상태
			swiper2.autoplay.stop();
			$(this).addClass("active");
		}
		else { //재생상태
			swiper2.autoplay.start();
			$(this).removeClass("active");

		}

	});







	var tripData={
	photo: ["trip2.png", "trip3.png", "trip4.png", "trip5.png"],
	title: ["홍천강", "용문사", "대명스키장", "소리산"],
	description: 
	["길이 143km로, 서석면 생곡리에서 발원하여<br>수심이 낮고 수온이 따뜻하며<br>강 유역이 넓고 주변에 관광지가 많아<br>여름이면 피서객으로 붐빈다",

	"정상은 평정(平頂)을 이루고<br>능선은 대지(臺地)가 발달하였으며<br>용계(龍溪)·조계(鳥溪)의 대협곡이 있고<br>금강산을 방불케 한다",

	 "국내 NO.1 스키월드! 스키<br>그 이상의 즐거움이 있는 스키&보드<br>가깝고 편리한 수도권 최대 규모의 스키장으로<br>쾌적한 시설과 최고의 서비스의 스키&보드", 

	 "정상과 주능선이 바위로 이루어졌고<br>계곡이 단애 협곡을 이루어 경관이 빼어나며<br>절벽의 높이는 거의 200m에 이른다.<br>휴식공간으로 인기 높다."]
}
var index=0;
var path="";
var title="";
var desc="";

$("#trip .list a").click(function(e){
	e.preventDefault();
	$("#trip_dim").fadeIn(300);
	index=$(this).parents(".list").index();
	path=tripData.photo[index];
	title=tripData.title[index];
	desc=tripData.description[index];
	// console.log(path+" : "+title+" : "+desc);
	$(".ski .photo").css({"background-image": "url(images/"+path+")"});
	$(".ski dt").text(title);
	$(".ski dd").html(desc);
});

$("#trip_dim .close").click(function(){
	$("#trip_dim").fadeOut(300);
})






















});
