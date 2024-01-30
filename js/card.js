'use strict';

window.card = (function () {

  return {
    popupOpenAndCloseFn: function () {
      var parentElement = this.parentElement;
      var mapCard = parentElement.querySelector('.map__card');
      var popupClose = parentElement.querySelector('.popup__close');

      document.querySelectorAll('.popup').forEach(function(article) {
        article.classList.add('hidden');
      });

      mapCard.classList.remove('hidden');

      popupClose.addEventListener('click', function () {
        mapCard.classList.add('hidden');
      });
    },

  };
})();
