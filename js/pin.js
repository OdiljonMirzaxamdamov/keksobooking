'use strict';

//pin.js — модуль, который отвечает за создание пина — метки на карте;

//Перемещение основной кнопки Pin-Move on map
(function () {

  var mapPinsElement = document.querySelector('.map__pins');
  var pinHandle = mapPinsElement.querySelector('.map__pin');

  pinHandle.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY,
    };

    var dragged = false;

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      dragged = true;

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY,
      }

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY,
      };

      // Надо выполнить проверки мышки на mapPinsElement
      // if (moveEvt.offsetTop < 130) {
      //   pinHandle.style.top = 130 + 'px';
      // }
      // else if (pinHandle.offsetTop > 640) {
      //   pinHandle.style.top = 640 + 'px';
      // }

      console.log('moveEvt: ', moveEvt)

      pinHandle.style.top = (pinHandle.offsetTop - shift.y) + 'px';
      pinHandle.style.left = (pinHandle.offsetLeft - shift.x) + 'px';


      if (pinHandle.offsetTop < 130) {
        pinHandle.style.top = 130 + 'px';
      }
      else if (pinHandle.offsetTop > 640) {
        pinHandle.style.top = 640 + 'px';
      }
      else if (pinHandle.offsetLeft < 200) {
        pinHandle.style.left = 200 + 'px';
      }
      else if (pinHandle.offsetLeft > 1150) {
        pinHandle.style.left = 1150 + 'px';
      }

      // Получение значения CSS-свойства для элемента вставки в Value у Адреса
      var noticeForm = document.querySelector('.notice__form');
      noticeForm.querySelector('.address--coordinates').value =
        Math.round(pinHandle.offsetTop) + ', ' + Math.round(pinHandle.offsetLeft);

      // Изменение фонового освещения при движении пин
      var pinImgElement = document.querySelector('.map__pin img');
      pinImgElement.style.boxShadow = '0 0 ' + (5+pinHandle.offsetTop/50) + 'px ' + (10+pinHandle.offsetTop/100) + 'px rgba(255, 86, 53, 0.7)';
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);

      if (dragged) {
        var onClickPreventDefault = function (evt) {
          evt.preventDefault();
          pinHandle.removeEventListener('click', onClickPreventDefault);
        };
        pinHandle.addEventListener('click', onClickPreventDefault);
      };
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
})();
