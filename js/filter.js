'use strict';

// Файл filter.js

(function () {

  var hotelsMassive = []; // Глобальная переменная для хранения текущего отфильтрованного массива

  //создаём фильтрацию гостиниц и сохраняем новый массив в hotelsMassive = []
  var updateMap = function (hotels) {
    var mapFilters = document.querySelector('.map__filters');
    var typeFilter = mapFilters.querySelector('#housing-type');
    var priceFilter = mapFilters.querySelector('#housing-price');
    var roomsFilter = mapFilters.querySelector('#housing-rooms');
    var guestsFilter = mapFilters.querySelector('#housing-guests');
    var featuresFilter = mapFilters.querySelectorAll('input[name="features"]');;


    hotelsMassive = hotels.filter(function(property) {
      // Фильтр по типу
      var typeCondition = typeFilter.value === 'any' || property.offer.type === typeFilter.value;
      // Фильтр по цене
      var priceCondition;
      switch (priceFilter.value) {
        case 'low':
          priceCondition = property.offer.price < 10000;
          break;
        case 'middle':
          priceCondition = property.offer.price >= 10000 && property.offer.price <= 50000;
          break;
        case 'high':
          priceCondition = property.offer.price >= 50000;
          break;
        default:
          priceCondition = true; // Если выбрано 'any'
      }
      // Фильтр по количеству комнат
      var roomsCondition = roomsFilter.value === 'any' || property.offer.rooms === parseInt(roomsFilter.value, 10);
      // Фильтр по количеству гостей
      var guestsCondition = guestsFilter.value === 'any' || property.offer.guests === parseInt(guestsFilter.value, 10);
      // Фильтр по удобствам
      var featuresCondition = Array.from(featuresFilter).every(function(checkbox) {
        return !checkbox.checked || (property.offer.features && property.offer.features.includes(checkbox.value));
      });
      // Общее условие для фильтрации
      return typeCondition && priceCondition && roomsCondition && guestsCondition && featuresCondition;
    });


    // Очищаем текущий контейнер с метками на карте
    var mapPins = document.querySelector('.map__pins');
    mapPins.innerHTML = '';


    // Создаем и добавляем новые метки на карту
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < 5 && i < hotelsMassive.length; i++) {
      var renderHotelElement = window.renderHotels(hotelsMassive[i]);
      fragment.appendChild(renderHotelElement);

      var pinElement = renderHotelElement.querySelector('.pin');
      pinElement.addEventListener('click', window.card.popupOpenAndCloseFn);
    }

    mapPins.appendChild(fragment);
  };


  //Проводим наш отфильтрованный массив через debounce для задержки между фильтрами
   window.debouncedUpdateMap = window.debounce(updateMap, 500);


})();






