'use strict';
(function () {
  var MAP_WIDTH = 1200;
  var MAP_HEIGTH = 750;
  var mainPin = document.querySelector('.map__pin--main');
  var mapBlock = document.querySelector('.map');
  var activatePage = function () {
    window.form.activeForm();
    var onLoad = function (data) {
      window.pin.showPinsOnMap(data);
    };
    window.backend.load(onLoad, window.backend.onError);
    window.form.setAddress(MAP_WIDTH / 2, MAP_HEIGTH / 2);
    mainPin.removeEventListener('mouseup', activatePage);
  };
  var resetPage = function () {
    var mapCards = document.querySelectorAll('.map__card');
    mapBlock.classList.add('map--faded');
    mapBlock.classList.remove('map--active');
    mapCards.forEach(function (element) {
      if (!element.classList.contains('hidden')) {
        element.classList.add('hidden');
      }
    });
  };
  window.map = {
    activate: activatePage,
    resetPage: resetPage
  };
})();
