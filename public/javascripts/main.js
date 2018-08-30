function scrollToContent(area){
    document.getElementById(area).scrollIntoView(true);
}

$(window).scroll(function(){
    var scrollTop = $(window).scrollTop();

    /* Determine if menu should be fixed to the top of the screen */
    if (scrollTop > 500)
        $('.top-nav').addClass("fixed");
    else
        $('.top-nav').removeClass("fixed");

    /* Determine which, if any, of the menu options is active */
    $('.top-nav').find('*').removeClass('active');
    if (scrollTop < $('#about-container').offset().top){
        $('.top-nav').find('*').removeClass('active');
    }
    else if (scrollTop < $('#exp-container').offset().top) {
        $('#about-menu').addClass('active');
    }
    else if (scrollTop < $('#edu-container').offset().top) {
        $('#exp-menu').addClass('active');
    }
    else if (scrollTop < $('#contact-container').offset().top) {
        $('#edu-menu').addClass('active');
    }
    else if (scrollTop >= $('#contact-container').offset().top) {
        $('#contact-menu').addClass('active');
    }

});