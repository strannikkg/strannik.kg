// SimpleSearch ajax
$(document).ready(function() {
    // Кнопка
	//$(".sisea-search-form").submit(function () {
    //  $("#site-search-results").load("/search",$(".sisea-search-form").serialize()).slideDown("fast");
    //  return false;
  //	});
	// Живой поиск
	$(".sisea-search-form input").keyup(function() {
		if(this.value.length > 3) { // Пользователь набирает больше 2 символов в строке поиска
			// скрывает/отображает с результаты за пределами окна
			$(document).click(function(event){ // скрываем
				if ($(event.target).closest(".site-search-results").length) return;
				$(".site-search-results").slideUp("fast");
				//event.stopPropagation();
			});

            $('#site-search-results').append('<span id="load">LOADING...</span>');
            $('#load').fadeIn('normal');

			$('#search').click( function() { // отображаем
				$(".site-search-results").slideDown("fast");
				return false;
			});
			// ajax запрос загрузка результатов поиска от страницы и показ контейнера
			$("#site-search-results").load("/ajaxsearch",$(".sisea-search-form").serialize()).slideDown("fast");
		}
		else {
		    // Если набрано меньше 2 символов, скрыть контейнер (CSS display:none;)
			$("#site-search-results").slideUp("fast");
		}
	});
});
