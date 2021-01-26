$('.intro__btn').on('click', function(e){
	$('html,body').stop().animate({ scrollTop: $($(this).attr('href')).offset().top }, 1000);
	e.preventDefault();
});

$('.header__search a').click(function(e) {
	e.preventDefault();
	$('.header__search input').show();
	$('.header__search input').focus();
	$('.header__search input').animate({width: '200'}, 600);
	$('.header__search_path').attr({fill: 'white'});
	if(!mediaQuery1.matches) $('#cssmenu').hide();
});

$('.header__search input').blur(function(e) {
  if(!mediaQuery1.matches) {
  	$('.header__search input').animate({width: '0'}, 300, function() {
  		$(this).hide();
  		$('.header__search_path').attr({fill: 'black'});
  		$('#cssmenu').show();
  	});
  }
  else {
    $('.header__search_wrapper').css({width: '107px', border: '1px solid transparent'});
  }
});

var mediaQuery1 = window.matchMedia('(max-width: 1220px)');
var mediaQuery2 = window.matchMedia('(max-width: 550px)');

moveImageIntro(mediaQuery1);
moveImageCourses(mediaQuery1);
moveItemsToMenu(mediaQuery1);
menuFix(mediaQuery1);
moveTitleSlide(mediaQuery2);
mediaQuery1.addListener(moveImageIntro);
mediaQuery1.addListener(moveImageCourses);
mediaQuery1.addListener(moveItemsToMenu);
mediaQuery1.addListener(menuFix);
mediaQuery2.addListener(moveTitleSlide);

function menuFix(m) {
  // if(m.matches) {
  //   cssmenu.hide();
  //   cssmenu.find('ul').removeClass('open');
  // } else {
  //   cssmenu.show();
  // }
}

var url;
function moveImageIntro(m) {
  if(m.matches) {
    url = $('.benefits__inner').css('background-image');
    $('.benefits__inner').css({'background-image': 'none'});
    url = url.replace('url(','').replace(')','').replace(/[\"\']/gi, "");
    $('.benefits-image__wrapper').append('<img src="' + url + '" alt=""/>');
  } else {
    url = $('.benefits-image__wrapper img').attr('src');
    if(url) {
      $('.benefits-image__wrapper').empty();
      $('.benefits__inner').css({'background-image': 'url('+ url +')'});
    }  
  }
}

function moveImageCourses(m) {
  if(m.matches) {
    url = $('.courses__inner').css('background-image');
    $('.courses__inner').css({'background-image': 'none'});
    url = url.replace('url(','').replace(')','').replace(/[\"\']/gi, "");
    $('.courses-image__wrapper').append('<img src="' + url + '" alt=""/>');
  } else {
    url = $('.courses-image__wrapper img').attr('src');
    if(url) {
      $('.courses-image__wrapper').empty();
      $('.courses__inner').css({'background-image': 'url('+ url +')'});
    }  
  }
}


$('.blog-slider').slick({
  dots: true,
  arrows: false,
  infinite: false,
  speed: 300,
  slidesToShow: 2,
  slidesToScroll: 1,
  variableWidth: true,
  responsive: [
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 1
      }
    },
  ]
});

function moveTitleSlide(m) {
  if(m.matches) {
    $('.blog-slide').each(function() {
      $(this).find('.blog-slide__title').appendTo($(this).find('.blog-slide__image'));
    });
  } else {
    $('.blog-slide').each(function() {
      $(this).find('.blog-slide__date').after($(this).find('.blog-slide__title'));
    });
  } 
}

function moveItemsToMenu(m) {
  var onfocusInputMobile = function() {
    $('.header__search_wrapper').css({width: '100%', border: '1px solid #757575'});
  };
  if(m.matches) {
    $('#cssmenu').append($('.header__search'));

    $('.header__search input').on('focus', onfocusInputMobile);
    
    $('#cssmenu').append($('.intro__socials').clone().addClass('intro__socials_in_menu').removeClass('intro__socials'));
  } else {
    $('#cssmenu').after($('.header__search'));
    $('.header__search').off('focus', onfocusInputMobile);
    $('.intro__socials_in_menu').remove();
  }
}

(function($) {
$.fn.menumaker = function(options) {  
 var cssmenu = $(this), settings = $.extend({
   format: "dropdown",
   sticky: false
 }, options);
 return this.each(function() {
   $(".header__burger").on('click', function(){
     $(this).toggleClass('menu-opened');
     var mainmenu = $(cssmenu).find('ul');

    if($(this).hasClass('menu-opened')) $('body').addClass('lock');
    else $('body').removeClass('lock');

    $(cssmenu).slideToggle();

     if (mainmenu.hasClass('open')) {
       mainmenu.removeClass('open');
     }
     else {
       mainmenu.addClass('open');
       if (settings.format === "dropdown") {
         mainmenu.find('ul').show();
       }
     }
   });
   cssmenu.find('li ul').parent().addClass('has-sub');
  
  multiTg = function() {
     cssmenu.find(".has-sub").prepend('<span class="submenu-button"></span>');
     cssmenu.find('.submenu-button').on('click', function() {
       $(this).toggleClass('submenu-opened');
       if ($(this).siblings('ul').hasClass('open')) {
         $(this).siblings('ul').removeClass('open').slideToggle();
       }
       else {
         $(this).siblings('ul').addClass('open').slideToggle();
       }
     });
   };
   if (settings.format === 'multitoggle') multiTg();
   else cssmenu.addClass('dropdown');
    resizeFix = function() {
      var mediasize = 1220;
         if ($( window ).width() > mediasize) {
           cssmenu.show();
         }
         if ($(window).width() <= mediasize) {
            cssmenu.hide();
           cssmenu.find('ul').removeClass('open');
         }
       };
       resizeFix();
       return $(window).on('resize', resizeFix);
 });
  };
})(jQuery);

(function($){
$(document).ready(function(){
$("#cssmenu").menumaker({
   format: "multitoggle"
});
});
})(jQuery);


$(document).ready(function($) {
  // Клик по ссылке "Закрыть".
  $('.popup-close').click(function() {
    $(this).parents('.popup-fade').fadeOut();
    $('body').removeClass('lock');
    return false;
  });        
 
  // Закрытие по клавише Esc.
  $(document).keydown(function(e) {
    if (e.keyCode === 27) {
      e.stopPropagation();
      $('.popup-fade').fadeOut();
      $('body').removeClass('lock');
    }
  });
  
  // Клик по фону, но не по окну.
  $('.popup-fade').click(function(e) {
    if ($(e.target).closest('.popup').length == 0) {
      $(this).fadeOut();   
      $('body').removeClass('lock');       
    }
  });

  $('#consultation__fixed').click(function(e) {
    e.preventDefault();
    $('.popup-fade').fadeIn();
    $('body').addClass('lock');
    return false;
  });
});