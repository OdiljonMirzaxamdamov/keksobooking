'use strict';

//Создание массива характеристик для гостиниц для создания гостиниц по template
window.data = (function () {
  return {
    userBookingData: {
      author: {
              avatar: ['img/avatars/user01.png', 'img/avatars/user02.png', 'img/avatars/user03.png', 'img/avatars/user04.png',
                      'img/avatars/user05.png', 'img/avatars/user06.png', 'img/avatars/user07.png', 'img/avatars/user08.png'],
      },

      offer: {
              title: ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец',
                'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'],
              price: window.util.getRandomArbitrary(1000, 1000000),
              type: ['palace', 'flat', 'house', 'bungalo'],
              rooms: window.util.getRandomArbitrary(1, 5),
              guests: window.util.getRandomArbitrary(1, 10),
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
    },
  };
})();


