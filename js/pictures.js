// Файл pictures.js
'use strict';

(function () {

  function addDragHandlers(element) {
    element.setAttribute('draggable', true);

    element.addEventListener('dragstart', function(event) {
      event.dataTransfer.setData('text/plain', ''); // необходимо для Firefox
      element.classList.add('dragging');
    });

    element.addEventListener('dragend', function() {
      element.classList.remove('dragging');
    });

    element.addEventListener('dragover', function(event) {
      event.preventDefault();
      const draggedElement = document.querySelector('.dragging');
      const boundingBox = element.getBoundingClientRect();
      const isAfter = event.clientY > boundingBox.top + boundingBox.height / 2;

      if (isAfter) {
        element.parentNode.insertBefore(draggedElement, element.nextElementSibling);
      } else {
        element.parentNode.insertBefore(draggedElement, element);
      }
    });
  }

  document.getElementById('images').addEventListener('change', function(event) {
    var files = event.target.files;
    var photoContainer = document.getElementById('photo-container');

    // Очистить содержимое контейнера перед добавлением новых изображений
    photoContainer.innerHTML = '';

    for (var i = 0; i < files.length; i++) {
      // Создать элемент изображения и добавить его в контейнер
      var img = document.createElement('img');
      img.src = URL.createObjectURL(files[i]);

      var photoDiv = document.createElement('div');
      photoDiv.className = 'ad-form__photo';
      photoDiv.appendChild(img);

      photoContainer.appendChild(photoDiv);

      // Добавить обработчики событий для перетаскивания
      addDragHandlers(photoDiv);
    }
  });

})();
