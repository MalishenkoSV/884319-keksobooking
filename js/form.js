'use strict';
// form.js
(function () {
  var mainPin = document.querySelector('.map__pin--main');
  var formAdress = document.querySelector('.ad-form');
  var typeSelect = formAdress.querySelector('#type');
  var priceSelect = formAdress.querySelector('#price');
  var timeinSelect = formAdress.querySelector('#timein');
  var timeoutSelect = formAdress.querySelector('#timeout');
  var button = formAdress.querySelector('.ad-form__submit');
  var fieldsetList = formAdress.querySelectorAll('fieldset');
  var roomSelect = formAdress.querySelector('#room_number');
  var guestSelect = formAdress.querySelector('#capacity');
  var mapListElement = document.querySelector('.map');
  var filtersContainer = document.querySelector('.map__filters-container');
  var MAP_WIDTH = 1200;
  var MAP_HEIGTH = 750;
  var MinPrice = {
    BUNGALO: 0,
    FLAT: 1000,
    HOUSE: 5000,
    PALACE: 10000,
  };
  var RoomToGuest = {
    ROOM_1: ['1'],
    ROOM_2: ['1', '2'],
    ROOM_3: ['1', '2', '3'],
    ROOM_100: ['0'],
  };
  var activeForm = function () {
    mapListElement.classList.remove('map--faded');
    formAdress.classList.remove('ad-form--disabled');
    document.querySelector('.map__pins').appendChild(window.pin.fragment);
  };
  var setAddressCoords = function (x, y) {
    formAdress.querySelector('#address').value = x + ', ' + y;
  };
  var activatePage = function () {
    activeForm();
    setAddressCoords(MAP_WIDTH / 2, MAP_HEIGTH / 2);
    mainPin.removeEventListener('mouseup', activatePage);
    for (var i = 0; i < fieldsetList.length; i++) {
      var fieldsetTag = fieldsetList[i];
      fieldsetTag.disabled = false;
    }
  };
  var openPopup = function (informAdvert) {
    window.pin.close();
    var cardAdd = window.card.render(informAdvert);
    mapListElement.insertBefore(cardAdd, filtersContainer);
    document.addEventListener('keydown', window.pin.onPopupEsc);
  };
  typeSelect.addEventListener('change', function () {
    priceSelect.min = MinPrice[typeSelect.value.toUpperCase()];
    priceSelect.placeholder = MinPrice[typeSelect.value.toUpperCase()];
  });
  timeinSelect.addEventListener('change', function (evt) {
    timeoutSelect.value = evt.target.value;
  });
  timeoutSelect.addEventListener('change', function (evt) {
    timeinSelect.value = evt.target.value;
  });
  var validateGuestAndRoom = function () {
    var rooms = RoomToGuest['ROOM_' + roomSelect.value];
    var isMatch = false;
    for (var i = 0; i < rooms.length; i++) {
      if (rooms[i] === guestSelect.value) {
        isMatch = true;
        break;
      }
    }
    if (isMatch) {
      roomSelect.setCustomValidity('');
    } else {
      roomSelect.setCustomValidity('Количество гостей больше возможного');
    }
  };
  var onSubmitClick = function () {
    validateGuestAndRoom();
  };
  button.addEventListener('click', onSubmitClick);
  window.form = {
    MAP_WIDTH: MAP_WIDTH,
    MAP_HEIGTH: MAP_HEIGTH,
    mainPin: mainPin,
    activate: activatePage,
    open: openPopup,
    set: setAddressCoords
  };
})();
