'use strict';

//renderHotels.js — с помощью этой функции заполняются шаблоны темплейты и создаются гостиницы
(function () {

  //Присваиваем конкретные значения к элементам из базы данных
  var hotelsTemplate = document.querySelector('#hotels-template').content.querySelector('.hotels-template-item');


  window.renderHotels = function (hotel) {
    var hotelsElement = hotelsTemplate.cloneNode(true);

    hotelsElement.querySelector('.map__pin-avatar').src = hotel.author.avatar;
    hotelsElement.querySelector('.popup__avatar').src = hotel.author.avatar;
    hotelsElement.querySelector('.popup__title').textContent = hotel.offer.title;
    hotelsElement.querySelector('.popup__text--address').textContent = hotel.offer.address;
    hotelsElement.querySelector('.popup__price').textContent = hotel.offer.price;
    hotelsElement.querySelector('.popup__type').textContent = hotel.offer.type;
    hotelsElement.querySelector('.popup__text--capacity').textContent = hotel.offer.rooms + ' комнаты для ' + hotel.offer.guests + ' гостей';
    hotelsElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + hotel.offer.checkin + ', выезд до ' + hotel.offer.checkout;
    hotelsElement.querySelector('.popup__description').textContent = hotel.offer.description;

    var cardFeatures = hotelsElement.querySelector('.popup__features');
    cardFeatures.innerHTML = '';
    if (hotel.offer.features && Array.isArray(hotel.offer.features)) {
      hotel.offer.features.forEach(function (feature) {
        var featureElement = document.createElement('li');
        featureElement.classList.add('feature', 'feature--' + feature);
        cardFeatures.appendChild(featureElement);
      });
    }

    var cardPictures = hotelsElement.querySelector('.popup__photos');
    cardPictures.innerHTML = '';
    if (hotel.offer.photos && Array.isArray(hotel.offer.photos)) {
      hotel.offer.photos.forEach(function (photo) {
        var pictureElement = '<li style="margin-right: 3px"><img src="' + photo + '" width = "42" height="42" ></li>';
        cardPictures.insertAdjacentHTML('afterbegin', pictureElement);
      });
    }

    // в ссылке URL на данные отелей координаты приведены ошибочно везде одинакого, поэтоме все пины находятся в одном месте, для этого характеристики задать надо свои координаты
    // hotelsElement.querySelector('.map__pin').style = `left: ${hotel.location.lng}px; top: ${hotel.location.lat}px;`;
    hotelsElement.querySelector('.map__pin').style =
      `left: ${window.util.getRandomArbitrary(window.data.userBookingData.location.xMin, window.data.userBookingData.location.xMax)}px;
      top: ${window.util.getRandomArbitrary(window.data.userBookingData.location.yMin, window.data.userBookingData.location.yMax)}px;`;


    return hotelsElement;
  };


})();

