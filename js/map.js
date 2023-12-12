'use strict';

let userBookingData = {
  author: {

    avatar: ['../img/avatars/user01.png)', '../img/avatars/user02.png)', '../img/avatars/user03.png)', '../img/avatars/user04.png)',
      '../img/avatars/user05.png)', '../img/avatars/user06.png)', '../img/avatars/user07.png)', '../img/avatars/user08.png)'],

  },


  offer: {

    title: ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец',
      'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'],

    address: "{{location.x}}, {{location.y}}",

    price: 'от 1000 до 1000000',

    type: ['palace', 'flat', 'house', 'bungalo'],

    rooms: [1, 2, 3, 4, 5],

    guests: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],

    checkin: ['12:00', '13:00', '14:00'],

    checkout: ['12:00', '13:00', '14:00'],

    features: ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'],

    description: 'пустая строка',

    photos: ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'],

  },


  location: {

    x: 'Значение ограничено размерами блока',

    y: 'от 130 до 630',
  },

};
