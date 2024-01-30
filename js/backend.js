'use strict';


(function() {
  window.backend = {

    load: function(onLoad, onError) {
      var URl = 'https://24.javascript.htmlacademy.pro/keksobooking/data';
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
      var URL = 'https://24.javascript.htmlacademy.pro/keksobookin';
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'json';
      xhr.responseURL = 'https://24.javascript.htmlacademy.pro/keksobookin';

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
