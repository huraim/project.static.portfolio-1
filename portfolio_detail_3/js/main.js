window.addEventListener("load", function () {
  var requestURL =
    "/project.static.portfolio-1/portfolio_detail_3/data/gnb.json";
  var request = new XMLHttpRequest();
  request.open("GET", requestURL);
  //request.responseType="json";
  request.send();

  var gnbNav = document.getElementById("gnb"); //AJAX
  var fixedNav = document.getElementById("fixed_gnb"); //AJAX
  var mobileGnb = document.getElementById("mobile_gnb"); //AJAX
  var fixedMobileGnb = document.getElementById("fixed_mobile_gnb"); //AJAX

  var gnbNavUl = document.createElement("ul");
  var fixedNavUl = document.createElement("ul");
  var mobileGnbUl = document.createElement("ul");
  var fixedMobileGnbUl = document.createElement("ul");

  gnbNav.appendChild(gnbNavUl);
  fixedNav.appendChild(fixedNavUl);
  mobileGnb.appendChild(mobileGnbUl);
  fixedMobileGnb.appendChild(fixedMobileGnbUl);
  var totalGnbHtml = "";

  var fixed_upper = document.getElementsByClassName("fixed_upper")[0];
  var contents = document.getElementById("contents");
  var contentsLi = contents.children;

  var portfolioTitle = document.getElementById("portfolio_title");
  var about = document.getElementById("about");
  var contact = document.getElementById("contact");
  var remote = document.getElementById("remote");
  var mobileMenu = document.getElementById("mobile_menu");
  var fixedMobileMenu = document.getElementById("fixed_mobile_menu");

  var dim = document.getElementsByClassName("dim")[0];
  var mobileWindowWidth;

  //footer
  var footer = document.getElementById("footer");
  var footerGnb = footer.children[0].children[1].children[0].children; //li

  var n;
  var scrollTop;
  var targetY = 0;

  //AJAX load
  request.addEventListener("load", function () {
    var gnbdata = request.response;
    gnbdata = JSON.parse(gnbdata);

    for (var gnbkey in gnbdata) {
      totalGnbHtml += '<li><a href="">' + gnbdata[gnbkey] + "</a></li>\n";
    }

    gnbNavUl.innerHTML = totalGnbHtml;
    fixedNavUl.innerHTML = totalGnbHtml;
    mobileGnbUl.innerHTML = totalGnbHtml;
    fixedMobileGnbUl.innerHTML = totalGnbHtml;

    var gnb = document.getElementById("gnb").children[0].children; //li
    var fixed_gnb = document.getElementById("fixed_gnb").children[0].children; //li
    var mobileGnbLi = mobileGnb.children[0].children; //li
    var fixedMobileGnbLi = fixedMobileGnb.children[0].children; //li

    mobileMenu.addEventListener("click", function (e) {
      e.preventDefault();
      mobileGnb.classList.toggle("active");
      mobileMenu.classList.toggle("tab");
      dim.classList.toggle("active");
    });
    fixedMobileMenu.addEventListener("click", function (e) {
      e.preventDefault();
      fixedMobileGnb.classList.toggle("active");
      fixedMobileMenu.classList.toggle("tab");
      dim.classList.toggle("active");
    });

    window.addEventListener("resize", function () {
      mobileWindowWidth = window.innerWidth;
      if (mobileWindowWidth > 991) {
        if (mobileGnb.classList.contains("active") == true) {
          mobileGnb.classList.remove("active");
          fixedMobileGnb.classList.remove("active");
          mobileMenu.classList.remove("tab");
          fixedMobileMenu.classList.remove("tab");
          dim.classList.remove("active");
        } else if (fixedMobileGnb.classList.contains("active") == true) {
          mobileGnb.classList.remove("active");
          fixedMobileGnb.classList.remove("active");
          mobileMenu.classList.remove("tab");
          fixedMobileMenu.classList.remove("tab");
          dim.classList.remove("active");
        }
      }
    });

    dim.addEventListener("click", function () {
      mobileGnb.classList.remove("active");
      fixedMobileGnb.classList.remove("active");
      mobileMenu.classList.remove("tab");
      fixedMobileMenu.classList.remove("tab");
      dim.classList.remove("active");
    });

    for (i = 0; i < gnb.length; i++) {
      gnb[i].index =
        fixed_gnb[i].index =
        mobileGnbLi[i].index =
        fixedMobileGnbLi[i].index =
        footerGnb[i].index =
          i;

      gnb[i].addEventListener("click", function (e) {
        e.preventDefault();
        clickMoving(e);
      });
      fixed_gnb[i].addEventListener("click", function (e) {
        e.preventDefault();
        clickMoving(e);
      });
      mobileGnbLi[i].addEventListener("click", function (e) {
        e.preventDefault();
        clickMoving(e);
      });
      fixedMobileGnbLi[i].addEventListener("click", function (e) {
        e.preventDefault();
        clickMoving(e);
      });
      footerGnb[i].addEventListener("click", function (e) {
        e.preventDefault();
        clickMoving(e);
      });
    }

    window.addEventListener("scroll", triggerScroll);
    triggerScroll();

    function triggerScroll() {
      var timer = setTimeout(function () {
        clearTimeout(timer);
        scrollTop = window.pageYOffset;

        if (scrollTop <= document.getElementById("header").offsetTop) {
          n = -1;
          portfolioTitle.classList.add("active");
          about.classList.add("active");
          remote.classList.remove("active");
        } else if (scrollTop <= contentsLi[0].offsetTop) {
          n = 0;
        } else if (scrollTop <= contentsLi[1].offsetTop) {
          //aboutTop 가기전
          n = 1;
          remote.classList.add("active");
        } else if (scrollTop <= contentsLi[3].offsetTop - 400) {
          //detailTop 후 contactTop-400(메뉴와 좀 띄우기) 가기전
          n = 2;
          remote.classList.add("active");
        } else {
          n = 3;
          remote.classList.remove("active");
          contact.classList.add("active");
        }

        for (var i = 0; i < gnb.length; i++) {
          if (i == n) {
            gnb[i].classList.add("on");
            fixed_gnb[i].classList.add("on");
            mobileGnbLi[i].classList.add("on");
            fixedMobileGnbLi[i].classList.add("on");
          } else {
            gnb[i].classList.remove("on");
            fixed_gnb[i].classList.remove("on");
            mobileGnbLi[i].classList.remove("on");
            fixedMobileGnbLi[i].classList.remove("on");
          }
        }

        if (scrollTop > 104) {
          fixed_upper.classList.add("show");
        } else {
          fixed_upper.classList.remove("show");
        }
      }, 10);
    }

    function clickMoving(evt) {
      evt.preventDefault();
      n = evt.currentTarget.index;

      var IEcurrentY = window.pageYOffset; //IE 11
      var IEtimer; //IE 11

      if (n == 2) {
        //상단 좀 400 띄워줌 detail일 때만
        targetY = contentsLi[n].offsetTop - 250;
      } else {
        targetY = contentsLi[n].offsetTop;
      }

      var parent = evt.currentTarget.parentElement.parentElement;
      if (parent.id == "mobile_gnb" || parent.id == "fixed_mobile_gnb") {
        mobileGnb.classList.remove("active");
        fixedMobileGnb.classList.remove("active");
        mobileMenu.classList.remove("tab");
        fixedMobileMenu.classList.remove("tab");
        dim.classList.remove("active");
      }

      if (navigator.userAgent.indexOf("Chrome") !== -1) {
        //chrome
        window.scrollTo({
          top: targetY,
          behavior: "smooth",
        });
      } else {
        IEtimer = setInterval(function () {
          if (targetY > IEcurrentY) {
            if (Math.abs(targetY - IEcurrentY) > 9) {
              IEcurrentY += 9;
            } else {
              IEcurrentY = targetY;
              clearInterval(IEtimer);
            }
          } else {
            if (Math.abs(targetY - IEcurrentY) > 9) {
              IEcurrentY -= 9;
            } else {
              IEcurrentY = targetY;
              clearInterval(IEtimer);
            }
          }
          window.scrollTo(0, IEcurrentY);
        }, 1);
      }
    }
  });

  //FRAME & DESCRIPTIONS MOVING

  var detail = document.getElementById("detail");
  var portfolio = detail.children[0].children[2];
  var frame = portfolio.children[0].children[1];
  var portfolioList = portfolio.children[0].children[0].children[0].children;
  var portfolioTop = detail.offsetTop + portfolio.offsetTop;
  var limit = 400; //윈도우 상단과 띄울 거리
  var firstPoint = portfolioTop - limit;
  var offsetYData = [];
  var scaleData = [];
  var frameTimer;
  var frameWindowTop;

  var descriptionsUl = detail.children[0].children[1];
  var descriptionsLi = descriptionsUl.children;

  window.addEventListener("resize", resizeFn);

  function resizeFn() {
    for (var i = offsetYData.length; i > 0; i--) {
      //리사이즈시 배열 초기화
      offsetYData.pop();
      scaleData.pop();
    }

    for (i = 0; i < portfolioList.length; i++) {
      //console.log("top : "+portfolioList[i].offsetTop);
      offsetYData.push(firstPoint + portfolioList[i].offsetTop);

      //console.log("height : "+portfolioList[i].offsetHeight);
      scaleData.push(portfolioList[i].offsetHeight);
    }
    //console.log(portfolioTop);
    //console.log(offsetYData);
    //console.log(scaleData);
  }

  resizeFn();

  var count = 0;

  window.addEventListener("scroll", function () {
    clearTimeout(frameTimer);

    frameTimer = setTimeout(function () {
      frameWindowTop = window.pageYOffset;

      if (frameWindowTop >= offsetYData[0] && frameWindowTop < offsetYData[1]) {
        count = 0;
      } else if (
        frameWindowTop >= offsetYData[1] &&
        frameWindowTop < offsetYData[2]
      ) {
        count = 1;
      } else if (
        frameWindowTop >= offsetYData[2] &&
        frameWindowTop < offsetYData[3]
      ) {
        count = 2;
      } else if (
        frameWindowTop >= offsetYData[3] &&
        frameWindowTop < offsetYData[4]
      ) {
        count = 3;
      } else if (
        frameWindowTop >= offsetYData[4] &&
        frameWindowTop < offsetYData[5]
      ) {
        count = 4;
      } else if (frameWindowTop >= offsetYData[5]) {
        count = 5;
      }

      //console.log(frameWindowTop);
      //console.log("count : "+count);
      var currentScale = 0; //ScaleData 각 이미지 높이 합할것.

      for (var i = 0; i < scaleData.length; i++) {
        if (i < count) {
          currentScale = currentScale + scaleData[i]; //현재 번호보다 낮은 높이들 다 더한다.
        }
      }

      frame.style.top = currentScale + "px";
      frame.style.height = scaleData[count] + "px";

      //descriptions
      for (var j = 0; j < descriptionsLi.length; j++) {
        descriptionsLi[j].index = j;
        if (j == count) {
          descriptionsLi[j].classList.add("active");
        } else {
          descriptionsLi[j].classList.remove("active");
        }
      }
    }, 5);
  });
});
