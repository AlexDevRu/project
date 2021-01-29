$('.intro__btn').on('click', function(e){
	$('html,body').stop().animate({ scrollTop: $($(this).attr('href')).offset().top }, 1000);
	e.preventDefault();
});

$('.header__search a').click(function(e) {
	e.preventDefault();
	$('.header__search input').focus();
  $('.header__search').addClass('active');
	if(!mediaQuery1.matches) $('.header__menu').hide();
});

$('.header__search input').blur(function(e) {
    $('.header__search').removeClass('active');
    $('.header__menu').show();
});

var mediaQuery1 = window.matchMedia('(max-width: 1220px)');
var mediaQuery2 = window.matchMedia('(max-width: 550px)');
var mediaQuery3 = window.matchMedia('(max-width: 376px)');
var mediaQuery4 = window.matchMedia('(max-width: 768px)');

moveImageBenefits(mediaQuery1);
moveImageCourses(mediaQuery1);
moveTitleSlide(mediaQuery2);
moveButtonBlog(mediaQuery3);
changeConsultationColor(mediaQuery4);
mediaQuery1.addListener(moveImageBenefits);
mediaQuery1.addListener(moveImageCourses);
mediaQuery2.addListener(moveTitleSlide);
mediaQuery3.addListener(moveButtonBlog);
mediaQuery4.addListener(changeConsultationColor);

function changeConsultationColor(m) {
  if(m.matches) {
    $('.consultation').removeClass('blue');
  } else {
    $('.consultation').addClass('blue');
  }
}

var url;
function moveImageBenefits(m) {
  if(m.matches) {
    url = $('.benefits__inner').css('background-image');
    $('.benefits__inner').css({'background-image': 'none'});
    url = url.replace('url(','').replace(')','').replace(/[\"\']/gi, "");
    $('.benefits__content>p:first-child').after('<img class="benefits__image" src="' + url + '" alt=""/>');
  } else {
    url = $('.benefits__image').attr('src');
    if(url) {
      $('.benefits__image').remove();
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

function moveButtonBlog(m) {
  if(m.matches) {
    $('.blog-slider').after($('.blog__btn'));
  } else {
    $('.blog__wrapper').append($('.blog__btn'));
  }
}

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


$('.header__burger').on('click', function(event) {
  $('.header__menu').slideToggle();
  $(this).toggleClass('menu-opened');
  if($(this).hasClass('menu-opened')) {
    $('body').addClass('lock');
    $('#consultation__fixed, .popup').addClass('blue');
  }
  else {
    $('body').removeClass('lock');
    $('#consultation__fixed, .popup').removeClass('blue');
  }
});


mediafunc768();
mediaQuery1.addListener(mediafunc768);

var handleSubClick = function() {
    $(this).toggleClass('active');
    $(this).parent().find('>a').toggleClass('active-link');
    $(this).parent().find('>ul').slideToggle();
  };
$('.header__menu li.has-sub>a').after('<i class="icon-angle-down submenu-button"></i>');
$('.header__menu .submenu-button').on('click', handleSubClick);

function mediafunc768() { 
  var onfocusInputMobile = function() {
    $('.header__search').addClass('active');
  };
  var onblurInputMobile = function() {
    $('.header__search').removeClass('active');
  };
  if(mediaQuery1.matches) {
    $('.header__menu').hide();
    $('.menu__item').remove();

    $('.header__menu').append($('.header__search'));
    $('.header__search input').on('focus', onfocusInputMobile);
    $('.header__search input').on('blur', onblurInputMobile);
    $('.header__menu').append($('.intro__socials').clone().addClass('intro__socials_in_menu').removeClass('intro__socials'));
  } else {
    $('.menu__list>li.has-sub').each(function(index, el) {
      var menu_title = $(el).find('>a').text();
        $(el).find('>ul').prepend('<li class="menu__item"><h1 class="title menu__title">'+menu_title+'</h1><div class="menu__close"></div></li>');
        $('.menu__close').click(function() {
          $(this).closest('li.has-sub').find('>.submenu-button').removeClass('active');
          $(this).closest('li.has-sub').find('>a').removeClass('active-link');
          $(this).closest('li.has-sub').find('>ul').slideUp();
        });
    });

    $('.header__menu').after($('.header__search'));
    $('.header__search input').off('focus', onfocusInputMobile);
    $('.header__search input').off('blur', onblurInputMobile);
    $('.intro__socials_in_menu').remove();
    $('.header__menu').show();
    //$('.header__menu li.has-sub ul').hide();
  }
}


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


function elemInViewport(elem,full) {
    var box = elem.getBoundingClientRect();
    var top = box.top;
    var left = box.left;
    var bottom = box.bottom;
    var right  = box.right;
    var width = document.documentElement.clientWidth;
    var height = document.documentElement.clientHeight;
    var maxWidth = 0;
    var maxHeight = 50;
    if(full) { maxWidth = right - left; maxHeight = bottom - top};
    return Math.min(height,bottom)- Math.max(0,top) >= maxHeight && Math.min(width,right)- Math.max(0,left)>= maxWidth
}

$(window).on("scroll", function() {
  var sections = Array.from($("section, footer")).reverse();
  for(var section of sections) {
    if(elemInViewport(section)) {
      if($(section).hasClass('blue')) {
        $('#consultation__fixed, .popup').removeClass('blue');
      }
      else {
        $('#consultation__fixed, .popup').addClass('blue');
      }
      break;
    }
  }
});


var buttons = $('.btn').map(function(index, elem) {
  return ({rect: elem.getBoundingClientRect(), elem: elem});
});
var btn = null;
var offset = 20;
$('body').on('mousemove', function(event) {
  var x = event.clientX;
  var y = event.clientY;
  btn = null;
  for(var obj of buttons) {
    if(obj.rect.top-offset <= y && obj.rect.bottom+offset >= y && 
      obj.rect.left-offset <= x && obj.rect.right+offset >= x) {
      btn = obj;
      break;
    }
  }
  if(!btn) {
    for(var obj of buttons) {
      $(obj.elem).find('.circle').css({top: '0', right: '0'});
    }
    btn = null;
  } else {
    var shiftX = 0, 
    shiftY = 0;
    
    // if(Math.abs(btn.rect.top - y) < Math.abs(btn.rect.bottom - y)) {
    //   console.log('1');
    //   shiftY = -$(btn.elem).find('.circle').height()/2 + (y - btn.rect.top);
    // } else {
    //   shiftY = -$(btn.elem).find('.circle').height()/2 + (btn.rect.bottom - y);
    // }

    // if(Math.abs(btn.rect.left - x) < Math.abs(btn.rect.right - x)) {
    //   shiftX = (btn.rect.left - x);
    // } else {
    //   console.log('2');
    //   shiftX = (x - btn.rect.right);
    // }

    if(btn.rect.top <= y && btn.rect.bottom >= y && btn.rect.left <= x && btn.rect.right >= x) {
      shiftY = (y - btn.rect.top) - $(btn.elem).find('.circle').height()/2;
      shiftX = (btn.rect.right - x) - $(btn.elem).find('.circle').width()/2;
    } else {

    }

    $(btn.elem).find('.circle').css({
      top: shiftY + 'px',
      right: shiftX + 'px'
    });

    //console.log('translate('+shiftX+'px ,'+shiftY+'px)');
    //$(btn.elem).css({transform: 'translate('+x%10+'px ,'+y%10+'px)'});
  }
});