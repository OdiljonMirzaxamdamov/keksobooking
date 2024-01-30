'use strict';

// Файл setup.js при использовании сети
(function () {

  //Основная функция для начало работы
  var onLoad = function (hotels) {
    var mapPinMain = document.querySelector('.map__pin--main');
    var mapFilters = document.querySelector('.map__filters');

    //запускаем страницу
    mapPinMain.addEventListener('click', function () {
      window.activeMode.turnOffDisableMod();
      window.debouncedUpdateMap(hotels); // Вызываем при каждом клике на главную кнопку
    });

    //отслеживаем изменение в фильтрах и при изменении меняем пини на карте
    mapFilters.addEventListener('change', function () {
      window.debouncedUpdateMap(hotels); // Вызываем при изменении фильтра
    });
  };


  var onError = function(errorMessage) {
    var node = document.createElement("div");
    node.style = "z-index: 100; margin: 0 auto; text-align: center; backhround-color: red;";
    node.style.position = "absolute";
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = "30px";

    node.textContent = errorMessage;
    document.body.insertAdjacentElement("afterbegin", node);
  };

  var onLoadSave = function()	{
    window.activeMode.turnOnDisableMod();
  };

  // При отправке формы воспользуется функцией upload и отменяется действие формы по умолчанию.
  // Диалог закроется, как только данные будут успешно отправлены.
  var form = document.querySelector(".notice__form");
  form.addEventListener("submit",  function(evt) {
    window.backend.save(new FormData(form), onLoadSave, onError);
    evt.preventDefault();
  });


  window.backend.load(onLoad, onError);
})();








