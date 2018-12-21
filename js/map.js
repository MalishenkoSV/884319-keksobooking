'use strict';
(function () {
  var MAP_WIDTH = 1200;
  var MAP_HEIGTH = 750;
  var mainPin = document.querySelector('.map__pin--main');
  var activatePage = function () {
    window.form.activeForm();
    var onLoad = function (data) {
      window.pin.showPinsOnMap(data);
    };
    var onError = function () {
      var template = document.querySelector('#error').content.querySelector('main');
      var errorElement = template.cloneNode(true);
      errorElement.querySelector('.main').textContent = 'Произошла ошибка при загрузке данных';
    };
    window.backend.load(onLoad, onError);
    window.form.setAddress(MAP_WIDTH / 2, MAP_HEIGTH / 2);
    mainPin.removeEventListener('mouseup', activatePage);
  };
  window.map = {
    activate: activatePage
  };
})();
