'use strict';
// pin.js
(function () {
  var mapListPinElement = document.querySelector('.map__pins');
  var templateMap = document.querySelector('#pin').content.querySelector('.map__pin');
  var createMapPin = function (advertData) {
    var mapPinTemplate = templateMap.cloneNode(true);
    if (advertData.offer) {
      mapPinTemplate.style = 'left:' + advertData.location.x + 'px; top:' + advertData.location.y + 'px;';
      mapPinTemplate.querySelector('img').src = advertData.author.avatar;
      mapPinTemplate.querySelector('img').alt = advertData.offer.title;
    }
    mapPinTemplate.addEventListener('click', function () {
      window.card.showCardOnMap(advertData);
    });
    return mapPinTemplate;
  };
  var showPinsOnMap = function (advertOffers) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < advertOffers.length; i++) {
      var dataElement = createMapPin(advertOffers[i]);
      fragment.appendChild(dataElement);
    }
    mapListPinElement.appendChild(fragment);
  };
  window.pin = {
    showPinsOnMap: showPinsOnMap
  };
})();
