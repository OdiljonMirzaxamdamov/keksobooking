'use strict';

//map.js — модуль, который управляет карточками объявлений и пинами: добавляет на страницу нужную карточку,
//отрисовывает пины и осуществляет взаимодействие карточки и метки на карте;

//Работа над template 3-лекция
//Контейнер клиентского динамического контента
//Тут создаем повторяющихся элементы по шаблону template
(function () {
  const hotels = [];
  for (let i = 0; i < 8; i++) {
    hotels.push({
      avatar:  window.data.userBookingData.author.avatar[i],
      address: 'left: ' + window.util.getRandomArbitrary(window.data.userBookingData.location.xMin, window.data.userBookingData.location.xMax)
        + 'px; top:' + window.util.getRandomArbitrary(window.data.userBookingData.location.yMin, window.data.userBookingData.location.yMax) + 'px;',

      title: window.util.arrayRandElement(window.data.userBookingData.offer.title),
      price: window.data.userBookingData.offer.price,
      type: window.util.arrayRandElement(window.data.userBookingData.offer.type),
      rooms: window.data.userBookingData.offer.rooms,
      guests: window.data.userBookingData.offer.guests,
      checkin: window.util.arrayRandElement(window.data.userBookingData.offer.checkin),
      checkout: window.util.arrayRandElement(window.data.userBookingData.offer.checkout),
      // features: window.util.arrayRandElement(window.data.userBookingData.offer.features),
      description: window.data.userBookingData.offer.description,
      // photos: window.util.arrayRandElement(window.data.userBookingData.offer.photos),
    });
  }

  //Присваиваем конкретные значения к элементам из базы данных
  var hotelsTemplate = document.querySelector('#hotels-template').content.querySelector('.hotels-template-item');

  var renderHotels = function (hotel) {
    var hotelsElement = hotelsTemplate.cloneNode(true);

    hotelsElement.querySelector('.map__pin').style = hotel.address;

    hotelsElement.querySelector('.map__pin-avatar').src = hotel.avatar;
    hotelsElement.querySelector('.popup__avatar').src = hotel.avatar;

    hotelsElement.querySelector('.popup__title').textContent = hotel.title;
    hotelsElement.querySelector('.popup__text--address').textContent = hotel.address;
    hotelsElement.querySelector('.popup__price').textContent = hotel.price;
    hotelsElement.querySelector('.popup__type').textContent = hotel.type;
    hotelsElement.querySelector('.popup__text--capacity').textContent = hotel.rooms + ' комнаты для ' + hotel.guests + ' гостей';
    hotelsElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + hotel.checkin + ', выезд до ' + hotel.checkout;
    // hotelsElement.querySelector('.popup__features').textContent = hotel.features;
    hotelsElement.querySelector('.popup__description').textContent = hotel.description;
    // hotelsElement.querySelector('.popup__photos').textContent = hotel.photos;

    return hotelsElement;
  };

  //Собираем все элементы в fragment, а потом уже передадим в DOM,
  //таким образом мы минимизируем перерисовку каждого элемента по отдельности
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < hotels.length; i++) {
    var renderHotelElement = renderHotels(hotels[i]);
    fragment.appendChild(renderHotelElement);

    var pinElement = renderHotelElement.querySelector('.pin');
    var mapCard = renderHotelElement.querySelector('.map__card');
    var popupClose = renderHotelElement.querySelector('.popup__close');

    pinElement.addEventListener('click', function () {
      pinElement.classList.add('map__pin--active');
      mapCard.classList.remove('hidden');
    });

    popupClose.addEventListener('click', function () {
      mapCard.classList.add('hidden');
    });
  };

  var mapPinMain = document.querySelector('.map__pin--main');
  var mapPins = document.querySelector('.map__pins');
  mapPinMain.addEventListener('click', function () {
    window.activeMode.turnOffDisableMod();
    mapPins.appendChild(fragment);
  });

})();








