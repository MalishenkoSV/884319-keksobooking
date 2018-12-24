'use strict';
// form.js
(function () {
  var formAddress = document.querySelector('.ad-form');
  var filtersForm = document.querySelector('.map__filters');
  var fieldsetList = formAddress.querySelectorAll('fieldset');
  var mapListElement = document.querySelector('.map');
  var typeSelect = formAddress.querySelector('#type');
  var priceSelect = formAddress.querySelector('#price');
  var timeinSelect = formAddress.querySelector('#timein');
  var timeoutSelect = formAddress.querySelector('#timeout');
  var button = formAddress.querySelector('.ad-form__submit');
  var roomSelect = formAddress.querySelector('#room_number');
  var guestSelect = formAddress.querySelector('#capacity');
  var onFormSave = window.secondary.defaultFunctionParam(onFormSave);
  var onFormReset = window.secondary.defaultFunctionParam(onFormReset);
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
  var disableForm = function () {
    mapListElement.classList.add('map--faded');
    formAddress.classList.add('ad-form--disabled');
    fieldsetList.forEach(function (element) {
      element.disabled = true;
    });
  };
  var activeForm = function () {
    mapListElement.classList.remove('map--faded');
    formAddress.classList.remove('ad-form--disabled');
    fieldsetList.forEach(function (element) {
      element.disabled = false;
    });
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
  var onSubmitClick = function (evt) {
    validateGuestAndRoom();
    event.preventDefault();
    var formData = new FormData(evt.currentTarget);
    window.backend.upload(onFormSave, window.error.showSubmitFormError, formData);
  };
  formAddress.addEventListener('submit', onSubmitClick);
  button.addEventListener('click', onSubmitClick);

  var resetForm = function () {
    formAddress.disableForm();
  };
  var onLocationChange = window.secondary.debounce(function (x, y) {
    formAddress.setAddressCoords(x, y);
  }, 100);
  var onFormAddressSave = function () {
    mapListElement.addressSelector.resetToStartPosition();
    mapListElement.resetPage();
    formAddress.resetForm();
    formAddress.disableForm();
  };
  onFormReset = function () {
    mapListElement.addressSelector.reset();
    filtersForm.disableFilters();
    var initialPinLocation = window.form.setAddress();
    formAddress.setAddressCoords(initialPinLocation.x, initialPinLocation.y);
    formAddress.disableForm();
  };
  var resetFormElements = function () {
    formAddress.querySelectorAll('.is-invalid').forEach(function (element) {
      element.classList.remove('is-invalid');
    });
  };
  formAddress.addEventListener('reset', function () {
    resetFormElements();
    filtersForm.disableFilters();
    resetForm();
  });
  window.form = {
    setAddress: setAddressCoords,
    activeForm: activeForm,
    disableForm: disableForm,
    onFormAddressSave: onFormAddressSave,
    onLocationChange: onLocationChange
  };
})();
