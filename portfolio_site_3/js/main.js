$(function(){

	$("#header .upper .menu .pc li a").hover(
		function(){
			$(this).css({"border-bottom":"2px solid #9154a1"});
		},
		function(){
			$("#header .upper .menu .pc li a").css({"border-bottom":"none"});
		}
		);


		$("#header .tab").click(function(e){
			e.preventDefault();
			$("#header .upper .menu .mobile").toggleClass("active");
			$(".dim").toggleClass("active");
			$(this).toggleClass("active");
		});


		var windowW;
		$(window).resize(function(){
			windowW=$(window).width();
			if( windowW > 720) {
				if($("#header .upper .menu .mobile").hasClass("active")==true) {
					$("#header .upper .menu .mobile").removeClass("active");
					$(".dim").removeClass("active");
					$("#header .tab").removeClass("active");
				}
			}
		});

		$(".dim").click(function(){
				$("#header .upper .menu .mobile").removeClass("active");
				$(".dim").removeClass("active");
				$("#header .tab").removeClass("active");
		});

		var topPosi = 0;
		$(".upper .menu .pc li a").click(function(e){
			e.preventDefault();
			topPosi = $(this).attr("href");
			topPosi = $(topPosi).offset().top;
			$("html").animate({scrollTop:topPosi},400);
		});

		var mobileClick=false;

		$(".upper .menu .mobile li a").click(function(e){
			e.preventDefault();
			topPosi = $(this).attr("href");
			topPosi = $(topPosi).offset().top;
			// $("html").delay(500).animate({scrollTop:topPosi},400);
			$(".dim").trigger("click");
			mobileClick=true;
		});
		$(".mobile").on("transitionend", function(){
			// console.log(".mobile transitionend!!");
			// 열리는 경우, 닫히는 경우와 닫게 한 버튼이 .mobile li a인 경우
			if($(this).hasClass("active") == false && mobileClick == true){
				$("html").animate({scrollTop:topPosi}, 400, function(){
					mobileClick=false;
				});
			}
		});
		$(".mobile_btn").click(function(e){
			e.preventDefault();
			$("html").animate({scrollTop:0},400);
		});

		var scrollT=0;
		$(window).scroll(function() {
			scrollT=$(window).scrollTop();
			
			if(scrollT <= $("#header strong").offset().top){
				$("#header").addClass("active");
			}
			else if(scrollT <= $("#content .first_area .list").offset().top){
				$("#content .first_area").addClass("active");
			}
			else if(scrollT <= $("#content .second_area .list").offset().top) {
				$("#content .second_area").addClass("active");
			}
			else if(scrollT <= $("#content .third_area .list").offset().top) {
				$("#content .third_area").addClass("active");
			}
			else if(scrollT <= $("#content .four_area .list").offset().top) {
				$("#content .four_area").addClass("active");
			}
			else if(scrollT <= $("#content .six_area .input").offset().top) {
				$("#content .six_area").addClass("active");
			}


			if(scrollT > 70) {
				$("#header .upper").addClass("active");
				$(".mobile_btn").addClass("active");
			}
			else{
				$("#header .upper").removeClass("active");
				$(".mobile_btn").removeClass("active");
			}




		});
		$(window).trigger("scroll");


});