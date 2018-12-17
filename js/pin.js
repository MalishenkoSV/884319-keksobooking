'use strict';
// pin.js
(function () {
  var templateMap = document.querySelector('#pin').content.querySelector('.map__pin');
  var createMapPin = function (advertData) {
    var mapPinTemplate = templateMap.cloneNode(true);
    mapPinTemplate.style = 'left:' + advertData.location.x + 'px; top:' + advertData.location.y + 'px;';
    mapPinTemplate.querySelector('img').src = advertData.author.avatar;
    mapPinTemplate.querySelector('img').alt = advertData.offer.title;
    mapPinTemplate.addEventListener('click', function () {
      window.card.show(advertData);
    });
    return mapPinTemplate;
  };
  var adverts = window.data.getAdverts();
  var showPinsOnMap = function () {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < adverts.length; i++) {
      var dataElement = createMapPin(adverts[i]);
    }
    fragment.appendChild(dataElement);
  };
  window.pin = {
    showPinsOnMap: showPinsOnMap
  };
})();
