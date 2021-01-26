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
	if(!mediaQuery1.matches) $('.header__menu').hide();
});

$('.header__search input').blur(function(e) {
  if(!mediaQuery1.matches) {
  	$('.header__search input').animate({width: '0'}, 300, function() {
  		$(this).hide();
  		$('.header__search_path').attr({fill: 'black'});
  		$('.header__menu').show();
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
moveTitleSlide(mediaQuery2);
mediaQuery1.addListener(moveImageIntro);
mediaQuery1.addListener(moveImageCourses);
mediaQuery2.addListener(moveTitleSlide);

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


$('.header__burger').on('click', function(event) {
  $('.header__menu').slideToggle();
  $(this).toggleClass('menu-opened');
  if($(this).hasClass('menu-opened')) $('body').addClass('lock');
  else $('body').removeClass('lock');
});


mediafunc768();
mediaQuery1.addListener(mediafunc768);

function mediafunc768() {
  var handleSubClick = function(event) {
    $(this).find('>a').toggleClass('active-link');
    $(this).find('>ul').slideToggle();
    event.stopPropagation();
  };
  var disableLinks = function(event) {
    event.preventDefault();
  };
  var onfocusInputMobile = function() {
    $('.header__search_wrapper').css({width: '100%', border: '1px solid #757575'});
  };
  if(mediaQuery1.matches) {
    $('li.has-sub').on('click', handleSubClick);
    $('.header__menu li.has-sub>a').on('click', disableLinks);

    $('.header__menu').append($('.header__search'));
    $('.header__search input').on('focus', onfocusInputMobile); 
    $('.header__menu').append($('.intro__socials').clone().addClass('intro__socials_in_menu').removeClass('intro__socials'));
  } else {
    $('li.has-sub').off('click', handleSubClick);
    $('.header__menu li.has-sub>a').off('click', disableLinks);

    $('.header__menu').after($('.header__search'));
    $('.header__search input').off('focus', onfocusInputMobile);
    $('.intro__socials_in_menu').remove();
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


// var buttons = $('.btn').map(function(index, elem) {
//   return ({rect: elem.getBoundingClientRect(), elem: elem});
// });
// var btn = null;
// var offset = 20;
// $('body').on('mousemove', function(event) {
//   var x = event.clientX;
//   var y = event.clientY;
//   for(var obj of buttons) {
//     if(obj.rect.top <= y+offset && obj.rect.bottom <= y-offset && 
//       obj.rect.left <= x+offset && obj.rect.right <= x-offset) {
//       btn = obj;
//       break;
//     }
//   }
//   if(!btn) {
//     console.log('yes');
//     for(var obj of buttons) {
//       $(btn.elem).find('.circle').css({transform: 'translate(0, -50%)'});
//     }
//     btn = null;
//   } else {
//     console.log('no');
//     var shiftX, shiftY;
    
//     if(btn.rect.top < y) shiftY = (y - btn.rect.top)/2;
//     else if(btn.rect.bottom < y) shiftY = (y - btn.rect.bottom)/2;

//     if(btn.rect.right < x) shiftX = (x - btn.rect.right)/2;
//     else if(btn.rect.left < x) shiftX = (x - btn.rect.left)/2;

//     if(shiftX > 0) shiftX = '+' + shiftX;
//     if(shiftY > 0) shiftY = '+' + shiftY;

//     $(btn.elem).find('.circle').css({transform: 'translate('+shiftX+','+'-50%'+shiftY+')'});
//   }
// });