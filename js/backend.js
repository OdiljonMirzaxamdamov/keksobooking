'use strict';


(function() {
  window.backend = {

    load: function(onLoad, onError) {
      var URl = 'https://24.javascript.pages.academy/keksobooking/data';
      var xhr = new XMLHttpRequest();
      xhr.responseType = "json";

      xhr.addEventListener("load", function() {
        if (xhr.status === 200) {
          onLoad(xhr.response);
        } else {
          onError("Неизвестный статус: " + xhr.status + " " + xhr.statusText);
        }
      });
      xhr.addEventListener("error", function() {
        onError("произошла ошибка соединения");
      });
      xhr.addEventListener("timeout", function() {
        onError("Запрос не успел выполниться за " + xhr.timeout + "мс");
      });

      xhr.open("GET", URl);
      xhr.send();
    },

    save: function(data, onLoad, onError) {
      var URL = 'https://24.javascript.pages.academy/keksobooking';
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'json';
      xhr.responseURL = 'https://24.javascript.pages.academy/keksobooking';

      xhr.addEventListener('load', function() {
        if (xhr.response === 200) {
          onLoad(xhr.response);
        } else {
          onError("Неизвестный статус: " + xhr.status + " " + xhr.statusText);
        }
      });

      xhr.addEventListener("error", function() {
        onError("произошла ошибка соединения");
      });
      xhr.addEventListener("timeout", function() {
        onError("Запрос не успел выполниться за " + xhr.timeout + "мс");
      });

      xhr.timeout = 10000; // 10s

      xhr.open('POST', URL);
      xhr.send(data);
    }

  };
})();


// Файл setup.js при использовании сети

(function () {
  // var userDialog = document.querySelector('.setup');
  // userDialog.querySelector('.setup-similar').classList.remove('hidden');
  //
  // var similarListElement = userDialog.querySelector('.setup-similar-list');
  // var similarWizardTemplate = document.querySelector('#similar-wizard-template').content;

  //Присваиваем конкретные значения к элементам из базы данных
  var hotelsTemplate = document.querySelector('#hotels-template').content.querySelector('.hotels-template-item');

  var renderHotels = function (hotel) {
    var hotelsElement = hotelsTemplate.cloneNode(true);

    hotelsElement.querySelector('.map__pin-avatar').src = hotel.author.avatar;

    // в ссылке URL на данные отелей координаты приведены ошибочно везде одинакого, поэтоме все пины находятся в одном месте, для этого характеристики задать надо свои координаты
    hotelsElement.querySelector('.map__pin').style = `left: ${hotel.location.lng}px; top: ${hotel.location.lat}px;`;

    hotelsElement.querySelector('.popup__avatar').src = hotel.author.avatar;
    hotelsElement.querySelector('.popup__title').textContent = hotel.offer.title;
    hotelsElement.querySelector('.popup__text--address').textContent = hotel.offer.address;
    hotelsElement.querySelector('.popup__price').textContent = hotel.offer.price;
    hotelsElement.querySelector('.popup__type').textContent = hotel.offer.type;
    hotelsElement.querySelector('.popup__text--capacity').textContent = hotel.offer.rooms + ' комнаты для ' + hotel.offer.guests + ' гостей';
    hotelsElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + hotel.offer.checkin + ', выезд до ' + hotel.offer.checkout;
    // hotelsElement.querySelector('.popup__features').textContent = hotel.features;
    hotelsElement.querySelector('.popup__description').textContent = hotel.offer.description;
    // hotelsElement.querySelector('.popup__photos').textContent = hotel.photos;

    return hotelsElement;
  };

  var onLoad = function (hotels) {

    // var randomWizards = window.util.getRandomSubset(wizards, 4);
    // var fragment = document.createDocumentFragment();
    // for(var i = 0; i < randomWizards.length; i++) {
    //   fragment.appendChild(renderWizard(randomWizards[i]));
    // }
    // similarListElement.appendChild(fragment);



    //Собираем все элементы в fragment, а потом уже передадим в DOM,
    //таким образом мы минимизируем перерисовку каждого элемента по отдельности
    var randomHotels = window.util.getRandomSubset(hotels, 4);
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < randomHotels.length; i++) {
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


  var onLoadSave = function(response)	{
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


//Работа над template 3-лекция
//Контейнер клиентского динамического контента
//Тут создаем повторяющихся элементы по шаблону template
// (function () {
  // const hotels = [];
  // for (let i = 0; i < 8; i++) {
  //   hotels.push({
  //     avatar:  window.data.userBookingData.author.avatar[i],
  //     address: 'left: ' + window.util.getRandomArbitrary(window.data.userBookingData.location.xMin, window.data.userBookingData.location.xMax)
  //       + 'px; top:' + window.util.getRandomArbitrary(window.data.userBookingData.location.yMin, window.data.userBookingData.location.yMax) + 'px;',
  //
  //     title: window.util.arrayRandElement(window.data.userBookingData.offer.title),
  //     price: window.data.userBookingData.offer.price,
  //     type: window.util.arrayRandElement(window.data.userBookingData.offer.type),
  //     rooms: window.data.userBookingData.offer.rooms,
  //     guests: window.data.userBookingData.offer.guests,
  //     checkin: window.util.arrayRandElement(window.data.userBookingData.offer.checkin),
  //     checkout: window.util.arrayRandElement(window.data.userBookingData.offer.checkout),
  //     // features: window.util.arrayRandElement(window.data.userBookingData.offer.features),
  //     description: window.data.userBookingData.offer.description,
  //     // photos: window.util.arrayRandElement(window.data.userBookingData.offer.photos),
  //   });
  // }

  //Присваиваем конкретные значения к элементам из базы данных
  // var hotelsTemplate = document.querySelector('#hotels-template').content.querySelector('.hotels-template-item');
  //
  // var renderHotels = function (hotel) {
  //   var hotelsElement = hotelsTemplate.cloneNode(true);
  //
  //   hotelsElement.querySelector('.map__pin-avatar').src = hotel.author.avatar;
  //   hotelsElement.querySelector('.map__pin').style = hotel.offer.address;
  //
  //   hotelsElement.querySelector('.popup__avatar').src = hotel.author.avatar;
  //   hotelsElement.querySelector('.popup__title').textContent = hotel.offer.title;
  //   hotelsElement.querySelector('.popup__text--address').textContent = hotel.offer.address;
  //   hotelsElement.querySelector('.popup__price').textContent = hotel.offer.price;
  //   hotelsElement.querySelector('.popup__type').textContent = hotel.offer.type;
  //   hotelsElement.querySelector('.popup__text--capacity').textContent = hotel.offer.rooms + ' комнаты для ' + hotel.offer.guests + ' гостей';
  //   hotelsElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + hotel.offer.checkin + ', выезд до ' + hotel.offer.checkout;
  //   // hotelsElement.querySelector('.popup__features').textContent = hotel.features;
  //   hotelsElement.querySelector('.popup__description').textContent = hotel.offer.description;
  //   // hotelsElement.querySelector('.popup__photos').textContent = hotel.photos;
  //
  //   return hotelsElement;
  // };

  //Собираем все элементы в fragment, а потом уже передадим в DOM,
  //таким образом мы минимизируем перерисовку каждого элемента по отдельности
//   var fragment = document.createDocumentFragment();
//   for (var i = 0; i < hotels.length; i++) {
//     var renderHotelElement = renderHotels(hotels[i]);
//     fragment.appendChild(renderHotelElement);
//
//     var pinElement = renderHotelElement.querySelector('.pin');
//     var mapCard = renderHotelElement.querySelector('.map__card');
//     var popupClose = renderHotelElement.querySelector('.popup__close');
//
//     pinElement.addEventListener('click', function () {
//       pinElement.classList.add('map__pin--active');
//       mapCard.classList.remove('hidden');
//     });
//
//     popupClose.addEventListener('click', function () {
//       mapCard.classList.add('hidden');
//     });
//   };
//
//   var mapPinMain = document.querySelector('.map__pin--main');
//   var mapPins = document.querySelector('.map__pins');
//   mapPinMain.addEventListener('click', function () {
//     window.activeMode.turnOffDisableMod();
//     mapPins.appendChild(fragment);
//   });
//
// })();
