window.addEventListener("load",function(){

	//GNB
	var nav=document.getElementById("gnb");
	var depth1Li=nav.children[0].children; //nav > ul > li
	var upperarea=document.getElementById("upperarea");
	//console.log(depth1Li);

	upperarea.addEventListener("mouseenter",function(){
		upperarea.classList.add("active");
	});
	upperarea.addEventListener("mouseleave",function(){
		upperarea.classList.remove("active");
	});

	for(var i=0; i<depth1Li.length; i++) {
		//mouseenter, mouseleave 는 버블링이 안댐
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

	//SLIDER
	var sliderWidth;
	var slider=document.getElementById("slider");
	var nextbtn=slider.children[1];
	var prevbtn=slider.children[2];
	var sliderUl=slider.children[0].children[0];
	var sliderLi=sliderUl.children;
	var posi=0;
	var num=0;
	initSlider(); //초기 키텍스트의 투명도를 0으로 만들어주는 함수입니다.

	function initSlider(){
		for(i=0; i<sliderLi.length; i++){
			sliderLi[i].index=i;
			sliderLi[i].children[0].style.display="none";

			if(sliderLi[i].index == num){
				fadeInFunction(sliderLi[i].children[0]);
			}
		}
	}

	window.addEventListener("resize", resizeFunction);
	resizeFunction(); //초기 트리거 함수입니다.

	function resizeFunction(){
		sliderWidth=sliderLi[0].clientWidth; //크기를 업데이트합니다.
		// console.log("slider width : "+sliderWidth);
		posi=(-1)*sliderWidth*num;
		sliderUl.style.left=posi+"px";
	}

	nextbtn.addEventListener("click",function(e){
		e.preventDefault();
		if(num < (sliderLi.length-1)) {
			num++;
		}
		else {
			return;
		}
		posi=(-1)*sliderWidth*num;
		sliderUl.style.left=posi+"px";

		sliderUl.addEventListener("transitionend", function(){ //Transition이 종료된 다음 실행하는 transitionend 이벤트입니다.
			// console.log("transition end!!");
			for(i=0; i<sliderLi.length; i++){
				sliderLi[i].index=i;

				if(sliderLi[i].index == num){
					fadeInFunction(sliderLi[i].children[0]);
				}
				else {
					fadeOutFunction(sliderLi[i].children[0]);
				}
			}
		});
	});
	prevbtn.addEventListener("click",function(e){
		e.preventDefault();
		if(num > 0) {
			num--;
		}
		else {
			return;
		}
		posi=(-1)*sliderWidth*num;
		sliderUl.style.left=posi+"px";

		sliderUl.addEventListener("transitionend", function(){ //Transition이 종료된 다음 실행하는 transitionend 이벤트입니다.
			// console.log("transition end!!");
			for(i=0; i<sliderLi.length; i++){
				sliderLi[i].index=i;

				if(sliderLi[i].index == num){
					fadeInFunction(sliderLi[i].children[0]);
				}
				else {
					fadeOutFunction(sliderLi[i].children[0]);
				}
			}
		});
	});

	/*
	setInterval(function(){
		if(num < (sliderLi.length-1)) {
			num++;
		}
		else {
			num=0;
		}
		posi=(-1)*windowWidth*num;
		sliderUl.style.left=posi+"px";

		for(i=0; i<sliderLi.length;i++) {
			sliderLi[i].index = i;

			if(sliderLi[i].index == num) {
				fadeInFunction(sliderLi[i].children[0]);
			}
			else {
				fadeOutFunction(sliderLi[i].children[0]);
			}
		}
	},4000);
	*/

	//target: e.target
	//currentOp: 현재의 불투명도
	//targetOp: 목표가 되는 불투명도
	function fadeInFunction(element){
		if(element.style.display == "" || element.style.display == "block") return;

		var current=0;
		element.style.display="block";
		element.style.opacity=current;

		var timer=setInterval(function(){
			if(current < 1){
				current+=0.02;
				element.style.opacity=current;
			}
			else{
				current=1;
				element.style.opacity=current;
				clearInterval(timer);
			}
		}, 10);
	}
	function fadeOutFunction(element){
		if(element.style.display == "none") return;

		var current=element.children[0].style.opacity;
		if(current == ""){
			current=1;
		}
		else{
			current=Number(current);
		}
		// console.log("current opacity : "+current);
		// console.log("type : "+typeof(current));

		var timer=setInterval(function(){
			if(current > 0){
				current-=0.02;
				element.style.opacity=current;
			}
			else{
				current=0;
				element.style.opacity=current;
				element.style.display="none";
				clearInterval(timer);
			}
		}, 10);
	}


	//RESIZE NATIVE
	var timer;
	var winW;

	window.addEventListener("resize",resizeFn);
	resizeFn();

	function resizeFn(){
		clearTimeout(timer);

		timer=setTimeout(function(){
			winW=window.innerWidth;

			if(winW > 1920) {

				for(var i=0; i<sliderLi.length; i++) {
					var sliderImg=sliderLi[i].children[1]; 
					sliderImg.style.width=winW+"px";
				}

			}
		},15);

	}

});
