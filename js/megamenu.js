$(document).ready(function() {

  $('.menu > ul > li:has( > ul)').addClass('menu-dropdown-icon');
  //Проверяет, имеет ли li значение sub (ul), и добавляет класс для значка переключения - просто пользовательский интерфейс

  $('.menu > ul > li > ul:not(:has(ul))').addClass('normal-sub');
  //Проверяет, имеют ли элементы li выпадающего меню другой уровень (ul), если не выпадающий, отображается как обычный выпадающий список, а не как мегаменю (спасибо Луке Кладарич)

  $(".menu > ul").before("<a href=\"/\" class=\"menu-mobile\"></a>");

  //Добавляет menu-mobile class (для мобильного переключателя меню) перед обычным меню
  //Мобильное меню скрыто, если ширина больше 959 пикселей, но отображается обычное меню
  //Нормальное меню скрыто, если ширина меньше 959 пикселей, и jquery добавляет мобильное меню

  $(".menu > ul > li").hover(
    function(e) {
      if ($(window).width() > 943) {
        $(this).children("ul").slideDown(300);
        e.preventDefault();
      }
    },
    function(e) {
      if ($(window).width() > 943) {
        $(this).children("ul").slideUp(100);
        e.preventDefault();
      }
    }
  );

  //Если ширина больше 943 пикселей, при наведении
  //следующее скрывает меню, когда клик зарегистрирован снаружи
  $(document).on('click', function(e) {
    if ($(e.target).parents('.menu').length === 0)
      $(".menu > ul").removeClass('show-on-mobile');
  });

  $(".menu > ul > li").click(function() {
    //не более перекрывающихся меню
    //скрывает другие детские меню при нажатии на элемент списка с вложенным меню
    var thisMenu = $(this).children("ul");
    var prevState = thisMenu.css('display');
    $(".menu > ul > li > ul").slideUp();
    if ($(window).width() < 943) {
      if (prevState !== 'block')
        thisMenu.slideDown();
    }
  });

  //Если ширина меньше или равна 943px, при нажатии отображаются выпадающие списки (спасибо Aman Jain из stackoverflow)

  $(".menu-mobile").click(function(e) {
    $(".menu > ul").toggleClass('show-on-mobile');
    e.preventDefault();
  });

  //при нажатии на мобильном меню, обычное меню отображается в виде списка, классическая история меню RWD (спасибо mwl из stackoverflow)

});
