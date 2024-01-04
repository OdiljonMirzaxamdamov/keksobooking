'use strict';

//Лекция 4
//Режим активный и неактивный
window.activeMode = (function () {
  var map = document.querySelector('.map');
  var noticeForm = document.querySelector('.notice__form');
  var disabledFieldsets = document.querySelectorAll('fieldset[disabled]');


  return {
    //Функция отключает disable для fieldset
    removeFieldsetsDisable: function () {
      disabledFieldsets.forEach(function (fieldset) {
        if (!fieldset.classList.contains('form__element--address')) {
          fieldset.removeAttribute('disabled');
        }
      });
    },

    //функции для смены режима из неактивного в активный
    turnOffDisableMod: function () {
      map.classList.remove('map--faded');
      noticeForm.classList.remove('notice__form--disabled');
      window.activeMode.removeFieldsetsDisable();
    },
  };

})();
