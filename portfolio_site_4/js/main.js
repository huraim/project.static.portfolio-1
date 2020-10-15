$(function(){

    var swiper = new Swiper('#affiliate .swiper-container', {

        spaceBetween: 25,
    });

    $(".dim").hide();

    $(".menu").click(function(){
        $(".dim").fadeIn(300);
    });
    $(".dim .close").click(function(){
        $(".dim").fadeOut(300);
    });

});