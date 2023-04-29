window.addEventListener("load",function(){

	//GNB & SCROLL (pc and mobile) + AJAX

	var requestURL="/project.static.portfolio-1/data/gnb.json";
	var request= new XMLHttpRequest();
	request.open("GET",requestURL);
	//request.responseType="json";
	request.send();

	var gnbNav= document.getElementById("gnb") //AJAX
	var fixedNav=document.getElementById("fixed_gnb"); //AJAX
	var mobileGnb=document.getElementById("mobile_gnb"); //AJAX
	var fixedMobileGnb=document.getElementById("fixed_mobile_gnb"); //AJAX

	var gnbNavUl=document.createElement("ul");
	var fixedNavUl=document.createElement("ul");
	var mobileGnbUl=document.createElement("ul");
	var fixedMobileGnbUl=document.createElement("ul");

	gnbNav.appendChild(gnbNavUl);
	fixedNav.appendChild(fixedNavUl);
	mobileGnb.appendChild(mobileGnbUl);
	fixedMobileGnb.appendChild(fixedMobileGnbUl);
	var totalGnbHtml="";

	var fixed_upper=document.getElementsByClassName("fixed_upper")[0];
	var contents=document.getElementById("contents");
	var contentsLi=contents.children;

	var headerSlider=document.getElementsByClassName("slider")[0];
	var skills=document.getElementById("skills");
	var about=document.getElementById("about");
	var portfolio=document.getElementById("portfolio");
	var feedback=document.getElementById("feedback");
	var contact=document.getElementById("contact");
	var mobileMenu=document.getElementById("mobile_menu");
	var fixedMobileMenu=document.getElementById("fixed_mobile_menu");

	var dim=document.getElementsByClassName("dim")[0];
	var mobileWindowWidth;

	//footer
	var footer=document.getElementById("footer");
	var footerGnb=footer.children[0].children[1].children[0].children; //li

	var n;
	var scrollTop;
	var targetY=0;
	var headerSliderBtn=headerSlider.children[1].children[1];

	//AJAX load
	request.addEventListener("load", function(){
		var gnbdata=request.response;
		gnbdata=JSON.parse(gnbdata);

		for (var gnbkey in gnbdata) {
			totalGnbHtml+='<li><a href="">'+gnbdata[gnbkey]+'</a></li>\n';
		}

		gnbNavUl.innerHTML=totalGnbHtml;
		fixedNavUl.innerHTML=totalGnbHtml;
		mobileGnbUl.innerHTML=totalGnbHtml;
		fixedMobileGnbUl.innerHTML=totalGnbHtml;

		var gnb=gnbNav.children[0].children; //li
		var fixed_gnb=fixedNav.children[0].children; //li 
		var mobileGnbLi=mobileGnb.children[0].children; //li
		var fixedMobileGnbLi=fixedMobileGnb.children[0].children; //li

		mobileMenu.addEventListener("click",function(e){
			e.preventDefault();
			mobileGnb.classList.toggle("active");
			mobileMenu.classList.toggle("tab");
			dim.classList.toggle("active");
		});
		fixedMobileMenu.addEventListener("click",function(e){
			e.preventDefault();
			fixedMobileGnb.classList.toggle("active");
			fixedMobileMenu.classList.toggle("tab");
			dim.classList.toggle("active");
		});

		window.addEventListener("resize", function(){
			mobileWindowWidth=window.innerWidth;
			if(mobileWindowWidth > 991) {
				if(mobileGnb.classList.contains("active")==true) {
					mobileGnb.classList.remove("active");
					fixedMobileGnb.classList.remove("active");
					mobileMenu.classList.remove("tab");
					fixedMobileMenu.classList.remove("tab");
					dim.classList.remove("active");
				}
				else if(fixedMobileGnb.classList.contains("active")==true) {
					mobileGnb.classList.remove("active");
					fixedMobileGnb.classList.remove("active");
					mobileMenu.classList.remove("tab");
					fixedMobileMenu.classList.remove("tab");
					dim.classList.remove("active");
				}
			}
		});

		dim.addEventListener("click", function(){
			mobileGnb.classList.remove("active");
			fixedMobileGnb.classList.remove("active");
			mobileMenu.classList.remove("tab");
			fixedMobileMenu.classList.remove("tab");
			dim.classList.remove("active");
		});

		for(i=0; i<gnb.length; i++){
			gnb[i].index=fixed_gnb[i].index=mobileGnbLi[i].index=fixedMobileGnbLi[i].index=footerGnb[i].index=i;

			gnb[i].addEventListener("click", function(e){
				e.preventDefault();
				clickMoving(e);
			});
			fixed_gnb[i].addEventListener("click", function(e){
				e.preventDefault();
				clickMoving(e);
			});
			mobileGnbLi[i].addEventListener("click",function(e){
				e.preventDefault();
				clickMoving(e);
			});
			fixedMobileGnbLi[i].addEventListener("click",function(e){
				e.preventDefault();
				clickMoving(e);
			});
			footerGnb[i].addEventListener("click",function(e){
				e.preventDefault();
				clickMoving(e);
			});
		}


		window.addEventListener("scroll", triggerScroll);
		triggerScroll();

		function triggerScroll() {
			var timer=setTimeout(function(){
				clearTimeout(timer);
				scrollTop=window.pageYOffset;

				

				if(scrollTop <= document.getElementById("header").offsetTop) {
					n=-1;
					headerSlider.classList.add("active");
				}
				else if(scrollTop <= contentsLi[0].offsetTop){
					n=0;
					skills.classList.add("active");
				}
				else if(scrollTop <= contentsLi[1].offsetTop){
					n=1;
					about.classList.add("active");
				}
				else if(scrollTop <= contentsLi[2].offsetTop){
					n=2;
					portfolio.classList.add("active");
				}
				else if(scrollTop <= contentsLi[3].offsetTop){
					n=3;
					feedback.classList.add("active");
				}
				else{
					n=4;
					contact.classList.add("active");
				}

				for(var i=0; i<gnb.length; i++){
					if(i == n){
						gnb[i].classList.add("on");
						fixed_gnb[i].classList.add("on");
						mobileGnbLi[i].classList.add("on");
						fixedMobileGnbLi[i].classList.add("on");
					}
					else{
						gnb[i].classList.remove("on");
						fixed_gnb[i].classList.remove("on");
						mobileGnbLi[i].classList.remove("on");
						fixedMobileGnbLi[i].classList.remove("on");
					}
				}

				if(scrollTop > 104){
					fixed_upper.classList.add("show");
				}
				else {
					fixed_upper.classList.remove("show");
				}
			}, 10);
		}

		

		function clickMoving(evt){
			evt.preventDefault();
			n=evt.currentTarget.index;
			targetY=contentsLi[n].offsetTop;

			var IEcurrentY=window.pageYOffset; //IE 11
			var IEtimer;//IE 11

			var parent=evt.currentTarget.parentElement.parentElement;
			if(parent.id == "mobile_gnb" || parent.id == "fixed_mobile_gnb") {
				mobileGnb.classList.remove("active");
				fixedMobileGnb.classList.remove("active");
				mobileMenu.classList.remove("tab");
				fixedMobileMenu.classList.remove("tab");
				dim.classList.remove("active");
			}

			if(navigator.userAgent.indexOf("Chrome") !== -1){ //chrome
				window.scrollTo({
					top: targetY,
					behavior: "smooth"
				});
			}
			else{
				IEtimer=setInterval(function(){
					if(targetY > IEcurrentY){
						if(Math.abs(targetY-IEcurrentY) > 9){
							IEcurrentY+=9;
						}
						else{
							IEcurrentY=targetY;
							clearInterval(IEtimer);
						}
					}
					else{
						if(Math.abs(targetY-IEcurrentY) > 9){
							IEcurrentY-=9;
						}
						else{
							IEcurrentY=targetY;
							clearInterval(IEtimer);
						}
					}
					window.scrollTo(0, IEcurrentY);
				}, 1);
			}
		}
		

		headerSliderBtn.addEventListener("click",function(e){
			e.preventDefault();
			targetY=contentsLi[2].offsetTop; //portfolio

			var IEcurrentY=window.pageYOffset; //IE 11
			var IEtimer;//IE 11

			if(navigator.userAgent.indexOf("Chrome") !== -1){ //chrome
				window.scrollTo({
					top: targetY,
					behavior: "smooth"
				});
			}
			else{
				IEtimer=setInterval(function(){
					if(targetY > IEcurrentY){
						if(Math.abs(targetY-IEcurrentY) > 9){
							IEcurrentY+=9;
						}
						else{
							IEcurrentY=targetY;
							clearInterval(IEtimer);
						}
					}
					else{
						if(Math.abs(targetY-IEcurrentY) > 9){
							IEcurrentY-=9;
						}
						else{
							IEcurrentY=targetY;
							clearInterval(IEtimer);
						}
					}
					window.scrollTo(0, IEcurrentY);
				}, 1);
			}
		});


	});

	

	
	//AJAX html 컨버팅 종료

	


	//FEEDBACK SLIDER
	var sliderWidth;
	var slider=feedback.children[0];
	var nextbtn=slider.children[2];
	var prevbtn=slider.children[1];
	var sliderUl=slider.children[0].children[0];
	var sliderLi=sliderUl.children;
	var posi=0;
	var num=0;

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

	});


	//RESIZE
	var timer;
	var winW;

	window.addEventListener("resize",resizeFn);
	resizeFn();

	function resizeFn(){
		clearTimeout(timer);
		timer=setTimeout(function(){
			winW=window.innerWidth;
			if(winW > 1920) {
				headerSlider.children[0].style.width=winW+"px";
			}
		},15);

	}

	//AJAX Portfolio category btn

	var pfrequestURL="/project.static.portfolio-1/data/portfolio.json";
	var pfrequest= new XMLHttpRequest();
	pfrequest.open("GET",pfrequestURL);
	//pfrequest.responseType="json";
	pfrequest.send();

	var category=portfolio.children[0].children[1];
	var categoryLi=category.children[0].children;
	var categoryText="";

	var pfList=portfolio.children[0].children[2];
	var pfListUl=document.createElement("ul");
	pfList.appendChild(pfListUl);
	var pfListHtml="";
	var pfnum=1;


	pfrequest.addEventListener("load", function(){
		var data=pfrequest.response;
		data=JSON.parse(data);


		for(var key1 in data){ //초기 가동상태
	
			pfnum=1; //반복 초기화
			for(var key2 in data[key1]){
		
					if(pfnum == Object.keys(data[key1]).length){ // 반복 방지 마지막 키
						pfListHtml+='<li>\n';
						pfListHtml+='<img src="/project.static.portfolio-1/images/'+data[key1]["src"]+'.jpg" alt="'+data[key1]["src"]+'">\n'
						pfListHtml+='<div class="list_hover">\n';
						pfListHtml+='<div class="box">\n';
						pfListHtml+='<h3>Portfolio</h3>\n';
						pfListHtml+='<span>'+data[key1]["title"]+'</span>\n';
						pfListHtml+='<p>'+data[key1]["type"]+'</p>\n';
						pfListHtml+='<a href="'+data[key1]["url"]+'">View</a>\n';
						pfListHtml+='</div>\n';
						pfListHtml+='</div>\n';
						pfListHtml+='</li>\n';
					}
					pfnum++;
			}
		}
		pfListUl.innerHTML=pfListHtml; //초기 가동상태 코드 끝
		
	
	
		for(var i=0; i<categoryLi.length; i++) {
			categoryLi[i].addEventListener("click",function(e){
				categoryText=e.currentTarget.textContent;
				pfListHtml="";
	
				for(var key1 in data){
					
					pfnum=1;
					for(var key2 in data[key1]){
						if(categoryText != "All") {
							if(data[key1]["type"] == categoryText){
								if(pfnum == Object.keys(data[key1]).length){
									pfListHtml+='<li>\n';
									pfListHtml+='<img src="/project.static.portfolio-1/images/'+data[key1]["src"]+'.jpg" alt="'+data[key1]["src"]+'">\n'
									pfListHtml+='<div class="list_hover">\n';
									pfListHtml+='<div class="box">\n';
									pfListHtml+='<h3>Portfolio</h3>\n';
									pfListHtml+='<span>'+data[key1]["title"]+'</span>\n';
									pfListHtml+='<p>'+data[key1]["type"]+'</p>\n';
									pfListHtml+='<a href="'+data[key1]["url"]+'">View</a>\n';
									pfListHtml+='</div>\n';
									pfListHtml+='</div>\n';
									pfListHtml+='</li>\n';
								}
							}
						}
						else {
							if(pfnum == Object.keys(data[key1]).length){
								pfListHtml+='<li>\n';
								pfListHtml+='<img src="/project.static.portfolio-1/images/'+data[key1]["src"]+'.jpg" alt="'+data[key1]["src"]+'">\n'
								pfListHtml+='<div class="list_hover">\n';
								pfListHtml+='<div class="box">\n';
								pfListHtml+='<h3>Portfolio</h3>\n';
								pfListHtml+='<span>'+data[key1]["title"]+'</span>\n';
								pfListHtml+='<p>'+data[key1]["type"]+'</p>\n';
								pfListHtml+='<a href="'+data[key1]["url"]+'">View</a>\n';
								pfListHtml+='</div>\n';
								pfListHtml+='</div>\n';
								pfListHtml+='</li>\n';
							}
						}
						pfnum++;
					}
				}
				pfListUl.innerHTML=pfListHtml;
			});
		}
	});

	//AJAX Skills li

	var skrequestURL="/project.static.portfolio-1/data/skills.json";
	var skrequest= new XMLHttpRequest();
	skrequest.open("GET",skrequestURL);
	//skrequest.responseType="json";
	skrequest.send();

	var skillsList=skills.children[0].children[2];
	var skillsListUl=document.createElement("ul");
	skillsList.appendChild(skillsListUl);
	var skListHtml="";

	skrequest.addEventListener("load", function(){
		var skdata=skrequest.response;
		skdata=JSON.parse(skdata);

		for(var skKey in skdata) {
			skListHtml+='<li>\n';
			skListHtml+='<img src="/project.static.portfolio-1/images/'+skdata[skKey]["img"]+'.png" alt="'+skdata[skKey]["img"]+'">\n';
			skListHtml+='<dl>\n';
			skListHtml+='<dt>'+skdata[skKey]["dt"]+'</dt>\n';
			skListHtml+='<dd>'+skdata[skKey]["dd"]+'</dd>\n';
			skListHtml+='</dl>\n';
			skListHtml+='</li>\n';
		}
		skillsListUl.innerHTML=skListHtml;

	});

	
});