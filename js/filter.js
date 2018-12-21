// filter.js
(function(){
  var filterForm = document.querySelector("form");

  function filter(items) {
    var condition = getFilterCondition();
    var filtred = items.filter(function(item) {
      var flag = true;
      Object.keys(condition).forEach(function(key) {
        if (key === "features") {
          console.log(item.offer[key], condition[key])
          flag = item.offer[key].includes(condition[key]);
          return;
        }
        // item.offer[key]
        // console.log();
        flag = false;
      });
      return flag;
    });

    console.log(filtred);
  }

  function getFilterCondition() {
    var condition = {};

    for (var i = 0; i < filterForm.elements.length; i++) {
      var element = filterForm.elements[i];
      if (!element.name) {
        continue;
      }

      if (element.name === "features") {
        if (!condition[element.name]) {
          condition[element.name] = [];
        }
        if (element.checked) {
          condition[element.name].push(element.value);
        }
        continue;
      }

      if (element.value !== "any") {
        condition[element.name.replace('housing-', "")] = element.value;
        continue;
      }
    }

    return condition;
  }

  window.filter = filter;
})()

var data = [
  {
    "offer": {
      "title": "Уютное гнездышко для молодоженов",
      "address": "102-0082 Tōkyō-to, Chiyoda-ku, Ichibanchō, 14−3",
      "price": 42000,
      "type": "house",
      "rooms": 3,
      "guests": 6,
      "checkin": "14:00",
      "checkout": "10:00",
      "features": [
        "wifi",
        "dishwasher",
        "parking",
        "washer",
        "elevator",
        "conditioner"
      ],
    },
  },
  {
    "offer": {
      "title": "Маленькая квартирка рядом с парком",
      "address": "102-0075 Tōkyō-to, Chiyoda-ku, Sanbanchō",
      "price": 30000,
      "type": "flat",
      "rooms": 1,
      "guests": 1,
      "checkin": "9:00",
      "checkout": "7:00",
      "features": [
        "elevator",
        "conditioner"
      ],
    },
  },
  {
    "offer": {
      "title": "Небольшая лавочка в парке",
      "address": "Chiyoda-ku, Tōkyō-to 102-0091",
      "price": 100,
      "type": "bungalo",
      "rooms": 0,
      "guests": 0,
      "checkin": "0:00",
      "checkout": "0:00",
      "features": [],
    },
  },
  {
    "offer": {
      "title": "Императорский дворец в центре Токио",
      "address": "1-1 Chiyoda, Chiyoda-ku, Tōkyō-to 100-8111",
      "price": 6000000,
      "type": "house",
      "rooms": 35,
      "guests": 93,
      "checkin": "21:00",
      "checkout": "20:00",
      "features": [
        "wifi",
        "dishwasher",
        "parking",
        "washer",
        "elevator",
        "conditioner"
      ],
    },
  },
  {
    "offer": {
      "title": "Милейший чердачок",
      "address": "102-0094 Tōkyō-to, Chiyoda-ku, Kioichō, 3",
      "price": 10000,
      "type": "bungalo",
      "rooms": 1,
      "guests": 2,
      "checkin": "11:00",
      "checkout": "10:00",
      "features": [
        "wifi",
        "washer",
        "elevator"
      ],
    },
  },
];

window.filter(data);
