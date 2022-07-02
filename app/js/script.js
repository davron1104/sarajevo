$(document).ready(function () {
    $('.facts__count').counterUp({
        time: 2000,
        offset: 60,
    });
    $('.nav-burger').click(function(){
        if(!$(this).hasClass('show')){
            $(this).addClass('show');
            $('.nav-menu').addClass('d-flex');
            $('.fa-bars').hide();
            $('.fa-close').show();
        }
        else{
            $(this).removeClass('show');
            $('.nav-menu').removeClass('d-flex');
            $('.fa-bars').show();
            $('.fa-close').hide();
        }
    })
    $(window).scroll(function(){
        if($(this).scrollTop() >= $('.nav').outerHeight()){
            $('.nav').css('background', 'rgb(16, 22, 54)');
        }
        else{
            $('.nav').css('background', 'rgba(16, 22, 54, 0.4)');
        }
    })
    $('.works-control__item').click(function(){
        $('.works-control__item').removeClass('works-control__item_active');
        $(this).addClass('works-control__item_active');
        filterPhoto('.' + $(this).attr('data-filter'));
        var position = $('.works-title').offset().top - 58;
        $('html').scrollTop(position);
    })
    function filterPhoto(photo){
        $('.works-gallery__item').filter(photo).show();
        $('.works-gallery__item').not(photo).hide();    
    }
    $('.nav-menu__link, .footer__logo, .logo').click(function(e){
        e.preventDefault();
        var id = $(this).attr('href');
        var pos = $(id).offset().top;
        $('html').animate({
            scrollTop: pos
        }, 1000);
    })
    
    $(window).scroll(function(){
        var scrolled = $(this).scrollTop();
        $('.nav-menu__link').each(function(){
            var id = $(this).attr('href');
            var pos = $(id).offset().top - 60;
            if(scrolled >= pos){
                $('.nav-menu__link').removeClass('nav-menu__link_active');
                $(this).addClass('nav-menu__link_active');
            }
        })
    })
});