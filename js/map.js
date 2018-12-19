'use strict';
(function () {
  var MAP_WIDTH = 1200;
  var MAP_HEIGTH = 750;
  var mainPin = document.querySelector('.map__pin--main');
  var activatePage = function () {
    window.form.activeForm();
    window.pin.showPinsOnMap(window.data.getAdverts());
    window.form.setAddress(MAP_WIDTH / 2, MAP_HEIGTH / 2);
    mainPin.removeEventListener('mouseup', activatePage);
  };
  window.map = {
    activate: activatePage
  };
})();
