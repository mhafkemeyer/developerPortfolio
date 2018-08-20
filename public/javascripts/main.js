function scrollToContent(area){
    document.getElementById(area).scrollIntoView(true);
    //document.getElementById(area).classList.add("active");
    $()
}

$(window).scroll(function(){
    if ($(window).scrollTop() > 500)
        $('.top-nav').addClass("fixed");
    else
        $('.top-nav').removeClass("fixed");
});