'use strict';


window.util = (function () {
  var ENTER_KEYCODE = 'Enter';
  var ESC_KEYCODE = 'Escape';


  return {
    //Функция для клавиши ENTER
    isEnterEvent: function (evt, action) {
      if (evt.key === ENTER_KEYCODE) {
        action();
      }
    },

    //Функция для клавиши ESC
    isEscEvent: function (evt, action) {
      if (evt.key === ESC_KEYCODE) {
        action();
      }
    },


    //Функция для рондомайзера
    arrayRandElement: function (arr) {
      var rand = Math.floor(Math.random() * arr.length);
      return arr[rand];
    },

    //Функция определения рандомного числа среди определённого значания
    getRandomArbitrary: function (min, max) {
      return Math.floor(Math.random() * (max - min) + min);
    },


    //Функция для получения максимального числа
    getMaxElement: function (arr) {
      var maxElement = arr[0];

      for (var i = 0; i < arr.length; i++) {
        if (arr[i] > maxElement) {
          maxElement = arr[i];
        }
      }
      return maxElement;
    },


    //Функция для получения 4 волшебников среди массива которого вытаскиваем из сети в backend.js
    getRandomSubset: function (array, count) {
      if (count > array.length) {
        console.error("Count should not exceed the length of the array");
        return [];
      }

      var shuffledArray = array.slice().sort(function () {
        return 0.5 - Math.random();
      });

      return shuffledArray.slice(0, count);
    },


  };
})();
