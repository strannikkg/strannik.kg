$(function() {
  // Инициализировать плагин youtubeVideo на элементе (группе элементов):
  $('.example-video').youtubeVideo();
  // Owl-carousel
  $('#owl_gallery_guide').owlCarousel({
    loop: false,
    margin: 3,
    nav: false,
    dots: false,
    autoplay: false,
    autoHeight: false,
    lazyLoad: true,
    responsive: {
      0: {
        items: 5
      }
    }
  });

  $('#owl_news_home').owlCarousel({
    loop: false,
    margin: 10,
    nav: true,
    navText : ["<span class='iconify' data-icon='mdi-light:chevron-left' data-inline='false'></span>","<span class='iconify' data-icon='mdi-light:chevron-right' data-inline='false'></span>"],
    dots: false,
    autoplay: false,
    autoHeight: false,
    lazyLoad: true,
    responsive: {
      0: {
        items: 1
      },
      600: {
        items: 2
      },
      992: {
        items: 3
      }
    }
  });

  $('#owl_guide').owlCarousel({
    loop: false,
    margin: 10,
    nav: true,
    navText : ["<span class='iconify' data-icon='mdi-light:chevron-left' data-inline='false'></span>","<span class='iconify' data-icon='mdi-light:chevron-right' data-inline='false'></span>"],
    dots: false,
    autoplay: false,
    autoHeight: false,
    lazyLoad: true,
    responsive: {
      0: {
        items: 1
      },
      420: {
        items: 2
      },
      640: {
        items: 3
      },
      920: {
        items: 4
      },
      1200: {
        items: 5
      }
    }
  });


  // Scroll Back to Top Button Show
  $(window).scroll(function() {
    if ($(this).scrollTop() > 100) {
      $('#back_to_top').fadeIn();
    } else {
      $('#back_to_top').fadeOut();
    }
  });

  $('#back_to_top').click(function() {
    $('body,html').animate({
      scrollTop: 0
    }, 800);
    return false;
  });


  // Завернуть все таблицы на сайте в контейнер
  $('table').wrap('<div class="table_adaptive"></div>');

});

// Плавный скрол от якоря
function slowScroll(id) {
  var offset = 0;
  $('html, body').animate({
    scrollTop: $(id).offset().top - 50
  }, 1000);
  return false;
};


// FIGURE + FIGCAPTION OF ALT IMG
$(function() {
  $('.content img').each(function() {
    var img = $(this);
    var alt = img.attr('alt');
    if (alt) {
      img.attr('class', 'figure_img_images');
      img.wrap('<figure class="figure_img">');
      img.after('<figcaption class="figure_img_alt">' + alt + '</figcaption>');
      img.wrap('<a class="image-popup-no-margins" href="' + $(this).attr('src') + '" title="' +$(this).attr('alt')+ '">');
    };
  });

});

$(function() {
  $('.header_article_image img').each(function() {
    var img = $(this);
    var alt = img.attr('alt');
    if (alt) {
      img.attr('class', 'figure_img_images');
      img.wrap('<figure class="figure_img">');
      img.wrap('<a class="image-popup-no-margins" href="' + $(this).attr('src') + '" title="' +$(this).attr('alt')+ '">');
    };
  });

});

// MAGNIFIC POPUP
$(document).ready(function() {
  // Галерея портфолио Гида
  $('.gallery_guide').magnificPopup({
		delegate: 'a',
		type: 'image',
		closeOnContentClick: false,
		closeBtnInside: false,
		mainClass: 'mfp-with-zoom mfp-img-mobile',
    tLoading: '',
		image: {
      tError: '<a href="%url%">The image #%curr%</a> could not be loaded.',
			verticalFit: true,
			titleSrc: function(item) {
				return item.el.attr('title');
			}
		},
		gallery: {
			enabled: true,
      navigateByImgClick: true,
      preload: [0,1]
		},
		zoom: {
			enabled: true,
			duration: 300, // don't foget to change the duration also in CSS
			opener: function(element) {
				return element.find('img');
			}
		}
	});


  // Фотогаллерея внутри отдельного тура
  $('.gallery_tour').magnificPopup({
    delegate: 'a',
    type: 'image',
    closeOnContentClick: true,
    closeBtnInside: false,
    tLoading: '',
    mainClass: 'mfp-with-zoom mfp-img-mobile',
    image: {
      verticalFit: true,
      tError: '<a href="%url%">Это изображение #%curr%</a> не может быть отображено.',
      titleSrc: function(item) {
        return item.el.attr('title') + '<small>Фото из архива турклуба Странник</small>';
      }
    },
    gallery: {
      enabled: true
    },
    zoom: {
      enabled: true,
      duration: 300, // don't foget to change the duration also in CSS
      opener: function(element) {
        return element.find('img');
      }
    },
    callbacks: {
    beforeChange: function() {
     this.items[0].src = this.items[0].src + '?=' + Math.random();
    }
  }
  });

  // ajax окно с содержимым ресурса
  $('.simple-ajax-popup').magnificPopup({
    type: 'ajax'
  });

  // Увеличение одиночного фота по клику
  $('.image-popup-no-margins').magnificPopup({
		type: 'image',
		closeOnContentClick: true,
		closeBtnInside: false,
		fixedContentPos: true,
		mainClass: 'mfp-no-margins mfp-with-zoom', // class to remove default margin from left and right side
		image: {
			verticalFit: true
		},
		zoom: {
			enabled: true,
			duration: 300 // don't foget to change the duration also in CSS
		}
	});
});

// Оглавление
// Разработчик Алексей Солтык https://soltyk.ru/koding-i-cms/avtomaticheskoe-oglavlenie-na-jquery
$(function() {
  $("body").on('click', '[href*="#"]', function(e) {
    $('html, body').stop().animate({
      scrollTop: $(this.hash).offset().top - 50
    }, 1000);
    e.preventDefault();
  });
  var curlvl;
  var startlvl = 1;
  var prevlvl = startlvl;
  var lst = $("#ogl");
  var tmp2 = $("<div class=\"ogl_title\">Оглавление</div>");
  lst.append(tmp2);
  var href1 = window.location.href;
  var href2 = href1.replace(window.location.hash, "");
  if (typeof lst !== "undefined") {
    $(".content h1, .content h2, .content h3, .content h4").each(function(i) {
      var current = $(this);
      current.attr("id", "title" + i);
      for (curlvl = parseInt(current.prop("tagName").substring(1)); curlvl > prevlvl; prevlvl++) {
        var tmp = $("<ul></ul>");
        if (prevlvl == startlvl)
          lst.append(tmp);
        else {
          var last_li = $("#ogl li").last();
          last_li.append(tmp);
        }
        if (curlvl > prevlvl + 1)
          tmp.append("<li style=\"list-style-type: none\"></li>");
        lst = tmp;
      }
      while (curlvl < prevlvl) {
        lst = lst.parent().parent();
        prevlvl--;
      }
      curder = current.html();
      if (curder.charAt(curder.length - 1) == ':') {
        curder = curder.substr(0, curder.length - 1);
      }
      lst.append("<li><a id='link" + i + "' itemprop='url' href='" + href2 + "#title" + i + "' title='" + current.html() + "'>" + curder + "</a></li>");
    });
  }
});

$(function() {
  // Инициализация MoreContent Lite
  $('[data-mrc]').moreContent({
  	"shadow": true
  });
  // Инициализация FlexTabs
  $('[data-ft]').flexTabs({
      fade: 500
  });

  $('.accordion_faq').flexTabs({
    theme: 'ft_theme_faq',
    type: 'accordion',
  	fade: 300,
    icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><path d="M48.293 23.293l-16.293 16.293-16.293-16.293-1.414 1.561 17 17.146h1.414l17-17.146z"/></svg>',
    collapsible: true
  });

  $('.accordion_ogl').flexTabs({
    theme: 'ft_theme_default',
    type: 'accordion',
  	fade: 200,
    collapsible: true
  });


  // Инициализация Инфо окна popup TipTip

  $(".info_icon").tipTip({
    maxWidth: '275px',
    edgeOffset: 1,
    delay: 0,
    fadeIn: 200,
    fadeOut: 200,
    defaultPosition: 'top'
  });

});

// Читать книгу Online
function growDiv() {
  var growDiv = document.getElementById('grow');
  if (growDiv.clientHeight) {
    growDiv.style.height = 0;
  } else {
    var wrapper = document.querySelector('.bk_content');
    growDiv.style.height = 'auto';
  }
  document.getElementById("more_button").value=document.getElementById("more_button").value=='Читать онлайн'?'Скрыть содержание':'Читать онлайн';
};
