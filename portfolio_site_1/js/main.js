window.addEventListener("load",function(){
	
	//GNB NATIVE
	var nav=document.getElementById("gnb");
	var depth1Li=nav.children[0].children; //nav > ul > li
	var upperarea=document.getElementById("upperarea");

	gnb.addEventListener("mouseenter",function(){
		upperarea.classList.add("active");
	});
	gnb.addEventListener("mouseleave",function(){
		upperarea.classList.remove("active");
	});

	for(var i=0; i<depth1Li.length; i++) {
		depth1Li[i].addEventListener("mouseenter",function(e){ //지역변수
			var link=e.currentTarget; //1Depth li
			link.classList.add("active");
		});
		depth1Li[i].addEventListener("mouseleave",function(e){
			var link=e.currentTarget; //1Depth li
			link.classList.remove("active");
		});

		depth1Li[i].addEventListener("focusin",function(e){ // li
			e.currentTarget.classList.add("active");
			upperarea.classList.add("active");
		});

		var depth2Li=depth1Li[i].children[1].children; // nav > ul > li > ul > li
		var lastDepth2Li=nav.children[0].lastElementChild.children[1].children; // 마지막 li의 리스트

		for(var j=0; j<depth2Li.length; j++) {
			if(j == (depth2Li.length-1)) { //2Depth li 최종 번호
				depth2Li[j].addEventListener("focusout",function(e){ // nav li li
					var link= e.currentTarget.parentElement.parentElement;//nav > ul > li
					link.classList.remove("active");
				});
			}
		}
		for(var k=0; k<lastDepth2Li.length; k++) {
			if(k == (lastDepth2Li.length-1)) { //2Depth 마지막 li 최종번호
				lastDepth2Li[k].addEventListener("focusout",function(){
					upperarea.classList.remove("active");
				});
			}
		}
	}

	

	//SLIDER NATIVE
	var keyvisual=document.getElementById("keyvisual");
	var pagination=document.getElementById("pagination");
	var controller=document.getElementById("controller");
	var play=controller.children[0];
	var stop=controller.children[1];
	var n=0;

	pagination.children[n].classList.add("current"); //초기값
	keyvisual.children[n].classList.add("current"); //초기값

	for(var i=0; i<pagination.children.length; i++) {
		pagination.children[i].index=i;
		pagination.children[i].addEventListener("click",function(e){
			e.preventDefault();
			n=e.currentTarget.index;

			sliderAction();
		});

		pagination.children[i].addEventListener("mouseenter",function(){
			clearInterval(sliderTimer);
		});
		pagination.children[i].addEventListener("mouseleave",function(){
			sliderTimer=setInterval(function(){
				if(n<4) {n+=1;}
				else {n=0;}
				sliderAction();
			},4000);
		});

	}

	play.addEventListener("click",function(e){
		e.preventDefault();
		sliderTimer=setInterval(function(){
			if(n<4) {n+=1;}
			else {n=0;}
			sliderAction();
		},4000);
	});
	stop.addEventListener("click",function(e){
		e.preventDefault();
		clearInterval(sliderTimer);
	});

	var sliderTimer=setInterval(function(){
		if(n<4) {
			n+=1;
		}
		else {n=0;}
		sliderAction();
	},4000);

	function sliderAction() {
		for(var i=0; i<pagination.children.length; i++) {
			pagination.children[i].index=i;

			if(n == i) {
				pagination.children[i].classList.add("current");
				keyvisual.children[i].classList.add("current");
			}
			else {
				pagination.children[i].classList.remove("current");
				keyvisual.children[i].classList.remove("current");
			}
		}
	};

// 무한루프 NATIVE
	var w=220;
	var amount=-1*w; // 수정 변수입니다.
	var current=0; // 추가 변수입니다. 현재 loop 노드의 위치를 선언합니다.
	var loop=document.getElementById("loop");
	loop.style.left=current+"px";

	var bannerTimer=setInterval(loopAnimate,3000);

	for(var i=0; i<loop.children.length; i++) {
		loop.children[i].addEventListener("mouseenter",function(){
			clearInterval(bannerTimer);
		});
		loop.children[i].addEventListener("mouseleave",function(){
			bannerTimer=setInterval(function(){
				loopAnimate();
			},3000);
		});
	}

	function loopAnimate(){
		var timer=setInterval(function(){
			if(Math.abs(current-amount) > 5){ // -5씩 다가갑니다.
				current-=5;
			}
			else{
				clearInterval(timer); // 타이머를 종료합니다.
				loop.appendChild(loop.children[0]); // 노드의 위치를 변경합니다.
				current=0;
			}
			loop.style.left=current+"px";
		},1);
	}




	//RESIZE NATIVE
	var windowWidth=0;
	var timer;
	var imgH;
	var keyvisualLi=keyvisual.children;
	
	window.addEventListener("resize",resizeFn);
	resizeFn();

	function resizeFn(){
		clearTimeout(timer);
		timer=setTimeout(function(){
			windowWidth=window.innerWidth;
			if(windowWidth > 1800) {
				for(var i=0;i<keyvisualLi.length;i++) {
					keyvisualLi[i].style.left=0;
					keyvisualLi[i].style.marginLeft=0;
					keyvisualLi[i].children[0].style.width=windowWidth+"px"; //각 이미지에 윈도우 가로크기 대입
					imgH=keyvisualLi[i].children[0].clientHeight;
				}
				keyvisual.style.height=imgH;
			}
			else {
				keyvisual.removeAttribute("style");
				for(var i=0;i<keyvisualLi.length;i++) {
					keyvisualLi[i].removeAttribute("style");
					keyvisualLi[i].children[0].removeAttribute("style");
				}
			}
		},10);
	}

	//FOOTER SELECT NATIVE
	var listName="";
	var form=document.getElementsByTagName("FORM")[0];
	var selectArea=form.children[0];
	var selectDl=selectArea.children[0];
	var select=selectArea.children[1];

	for(var i=0; i<selectDl.children.length; i++) {
		if(selectDl.children[i].tagName=="DT") {
			var selectDt=selectDl.children[i];
		}
		else {
			var selectDd=selectDl.children[i];
		}
	}
	
	selectDd.style.display="none";

	selectDt.addEventListener("click",function(e){
		e.preventDefault();
		e.currentTarget.children[0].classList.add("active");
		selectDd.style.display="block"; 
	});

	var selectUl=selectDd.children[0];
	var selectLi=selectUl.children;
	var select=selectDl.nextElementSibling;
	var n=0;
	var listName="";

	for(i=0; i<selectLi.length; i++) {
		selectLi[i].index=i;
		selectLi[i].addEventListener("click",function(e){
			e.preventDefault();
			n=e.currentTarget.index; 
			listName=e.currentTarget.children[0].innerText; 
			selectDt.children[0].classList.remove("active"); 
			selectDt.children[0].innerHTML=listName+"<span></span>";
			selectDd.style.display="none"; 

			for(var j=0; j<select.children.length;j++){
				if(j == n) { 
					select.children[j+1].setAttribute("selected", true); 
				}
			}

		});
	}


	//SCROLL CONTENTS 애니메이션 NATIVE
			var scroll;
			var scrollAble=true;
			var firstArea=document.getElementById("first_area");
			var secondArea=document.getElementById("second_area");
			var thirdArea=document.getElementById("third_area");
			var lastArea=document.getElementById("last_area");

			window.addEventListener("scroll",scrollAction);

			function scrollAction(){
				var timer=setTimeout(function(){
					clearTimeout(timer);
					// console.log("scroll Interaction!!");
					scroll=window.pageYOffset;

					if(scroll <= firstArea.offsetTop) {
						if(scroll > 400){
							firstArea.firstElementChild.classList.add("active");
							for(var i=0; i<firstArea.children[1].children.length; i++){
								firstArea.children[1].children[i].classList.add("active");
							}
						}
					}
					else if(scroll <= secondArea.offsetTop) {
						for(var i=0;i<secondArea.children[0].children.length;i++){
							secondArea.children[0].children[i].classList.add("active");
						}
					}
					else if(scroll <= thirdArea.offsetTop) {

						thirdArea.firstElementChild.classList.add("active");
						for(var i=0;i<thirdArea.children[1].children[0].children.length; i++){
							thirdArea.children[1].children[0].children[i].classList.add("active");
						}
					}
					else if(scroll <= lastArea.offsetTop) {
						for(var i=0; i<lastArea.children[1].children[0].children.length; i++) {
							lastArea.children[1].children[0].children[i].classList.add("active");
						}
						window.removeEventListener("scroll",scrollAction);
					}
				}, 10);
			}


			//콘텐츠 원배경 NATIVE
	var ballT=0;
	var balltimer;
	var ball1=document.getElementById("ball1");
	var ball2=ball1.nextElementSibling;
	var ball3=ball2.nextElementSibling;

	window.addEventListener("scroll", ballAnimate);
	ballAnimate();

	function ballAnimate(){
		clearTimeout(balltimer);
		balltimer=setTimeout(function(){
			ballT=window.pageYOffset;

			if(ballT <= lastArea.offsetTop) {
				ballMovingArea(ball1, ballT+500);
				ballMovingArea(ball2, ballT+150);
				ballMovingArea(ball3, ballT);
			}
			else {
				// return;
				window.removeEventListener("scroll", ballAnimate);
			}

		},150);
	}

	function ballMovingArea(ele, posy) {
		ele.style.top=posy+"px";
	}



});