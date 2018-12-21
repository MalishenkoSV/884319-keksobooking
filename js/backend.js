'use strict';
// backend.js
(function () {
  var URL_GET = 'https://js.dump.academy/keksobooking/data/?calback=data';
  var load = function (onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onLoad(xhr.response);
      } else {
        onError('Статус ответа:' + xhr.status + ' ' + xhr.statusText);
      }
    });
    xhr.open('GET', URL_GET);
    xhr.addEventListener('error', onError);
    xhr.addEventListener('timeout', onError);
    xhr.timeout = 1000;
    xhr.send();
  };
  var upload = function (data, onLoad, onError) {
    var URL_POST = 'https://js.dump.academy/keksobooking';
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onLoad(xhr.response);
      } else {
        onError('Cтатус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });
    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });
    xhr.timeout = 10000; // 10s
    xhr.open('POST', URL_POST);
    xhr.send(data);
  };
  window.backend = {
    load: load,
    upload: upload
  };
})();
