'use strict';
// form.js
(function () {
  var formAddress = document.querySelector('.ad-form');
  var fieldsetList = formAddress.querySelectorAll('fieldset');
  var mapListElement = document.querySelector('.map');
  var typeSelect = formAddress.querySelector('#type');
  var priceSelect = formAddress.querySelector('#price');
  var timeinSelect = formAddress.querySelector('#timein');
  var timeoutSelect = formAddress.querySelector('#timeout');
  var button = formAddress.querySelector('.ad-form__submit');
  var roomSelect = formAddress.querySelector('#room_number');
  var guestSelect = formAddress.querySelector('#capacity');
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
  var setAddressCoords = function (x, y) {
    formAddress.querySelector('#address').value = x + ', ' + y;
  };
  var activeForm = function () {
    mapListElement.classList.remove('map--faded');
    formAddress.classList.remove('ad-form--disabled');
    for (var i = 0; i < fieldsetList.length; i++) {
      var fieldsetTag = fieldsetList[i];
      fieldsetTag.disabled = false;
    }
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
    window.backend.upload(new FormData(formAddress), function () {
      formAddress.classList.add('ad-form--disabled');
      mapListElement.classList.add('map--faded');
      formAddress.reset();
    });
  };
  button.addEventListener('click', onSubmitClick);
  window.form = {
    setAddress: setAddressCoords,
    activeForm: activeForm
  };
})();
