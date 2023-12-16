'use strict';

let userBookingData = {

  author: {
    avatar: ['img/avatars/user01.png', 'img/avatars/user02.png', 'img/avatars/user03.png', 'img/avatars/user04.png',
      'img/avatars/user05.png', 'img/avatars/user06.png', 'img/avatars/user07.png', 'img/avatars/user08.png'],
  },

  offer: {
    title: ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец',
            'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'],
    price: getRandomArbitrary(1000, 1000000),
    type: ['palace', 'flat', 'house', 'bungalo'],
    rooms: getRandomArbitrary(1, 5),
    guests: getRandomArbitrary(1, 10),
    checkin: ['12:00', '13:00', '14:00'],
    checkout: ['12:00', '13:00', '14:00'],
    features: ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'],
    description: 'пустая строка',
    photos: ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
              'http://o0.github.io/assets/images/tokyo/hotel3.jpg'],
  },

  location: {
    xMin: 250,
    xMax: 1100,
    yMin: 130,
    yMax: 630,
  },

};


let map = document.querySelector('.map');
map.classList.remove('map--faded');

function arrayRandElement(arr) {
  var rand = Math.floor(Math.random() * arr.length);
  return arr[rand];
};

function getRandomArbitrary(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
};


const hotels = [];
for (let i = 0; i < 8; i++) {
  hotels.push({
    avatar: userBookingData.author.avatar[i],
    address: 'left: ' + getRandomArbitrary(userBookingData.location.xMin, userBookingData.location.xMax)
      + 'px; top:' + getRandomArbitrary(userBookingData.location.yMin, userBookingData.location.yMax) + 'px;',

    title: arrayRandElement(userBookingData.offer.title),
    price: userBookingData.offer.price,
    type: arrayRandElement(userBookingData.offer.type),
    rooms: userBookingData.offer.rooms,
    guests: userBookingData.offer.guests,
    checkin: arrayRandElement(userBookingData.offer.checkin),
    checkout: arrayRandElement(userBookingData.offer.checkout),
    // features: arrayRandElement(userBookingData.offer.features),
    description: userBookingData.offer.description,
    // photos: arrayRandElement(userBookingData.offer.photos),
  });
}


var mapPins = document.querySelector('.map__pins');
var hotelsTemplate = document.querySelector('#hotels-template').content.querySelector('.hotels-template-item');

var renderWizard = function () {
  var hotelsElement = hotelsTemplate.cloneNode(true);

  hotelsElement.querySelector('.map__pin-avatar').src = hotels[i].avatar;
  hotelsElement.querySelector('.map__pin').style = hotels[i].address;

  hotelsElement.querySelector('.popup__avatar').src = hotels[i].avatar;
  hotelsElement.querySelector('.popup__title').textContent = hotels[i].title;
  hotelsElement.querySelector('.popup__text--address').textContent = hotels[i].address;
  hotelsElement.querySelector('.popup__price').textContent = hotels[i].price;
  hotelsElement.querySelector('.popup__type').textContent = hotels[i].type;
  hotelsElement.querySelector('.popup__text--capacity').textContent = hotels[i].rooms + ' комнаты для ' + hotels[i].guests + ' гостей';
  hotelsElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + hotels[i].checkin + ', выезд до ' + hotels[i].checkout;
  // hotelsElement.querySelector('.popup__features').textContent = hotels[i].features;
  hotelsElement.querySelector('.popup__description').textContent = hotels[i].description;
  // hotelsElement.querySelector('.popup__photos').textContent = hotels[i].photos;

  return hotelsElement;
};


var fragment = document.createDocumentFragment();
for (var i = 0; i < hotels.length; i++) {
  console.log(hotels.length)
  fragment.appendChild(renderWizard(hotels[i]));
}
mapPins.appendChild(fragment);


