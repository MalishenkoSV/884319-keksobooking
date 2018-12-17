'use strict';
(function () {
  var MAP_WIDTH = 1200;
  var MAP_HEIGTH = 750;
  var mapListElement = document.querySelector('.map');
  var mainPin = document.querySelector('.map__pin--main');
  var formAdress = document.querySelector('.ad-form');
  var fieldsetList = formAdress.querySelectorAll('fieldset');
  var setAddressCoords = function (x, y) {
    formAdress.querySelector('#address').value = x + ', ' + y;
  };
  var activeForm = function () {
    mapListElement.classList.remove('map--faded');
    formAdress.classList.remove('ad-form--disabled');
  };
  var activatePage = function () {
    activeForm();
    window.pin.showPinsOnMap(window.data.getAdverts());
    window.card.showCardOnMap();
    setAddressCoords(MAP_WIDTH / 2, MAP_HEIGTH / 2);
    mainPin.removeEventListener('mouseup', activatePage);
    for (var i = 0; i < fieldsetList.length; i++) {
      var fieldsetTag = fieldsetList[i];
      fieldsetTag.disabled = false;
    }
  };
  window.map = {
    activate: activatePage,
    setAddress: setAddressCoords
  };
})();
