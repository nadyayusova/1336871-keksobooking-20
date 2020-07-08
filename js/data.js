'use strict';

(function () {
  var NUMBER_OF_ADV = 8;
  var ROOMS_MAX = 10;
  var GUESTS_MAX = 20;
  var LOCATION_MIN_X = 0;
  var PriceRange = {
    PRICE_MIN: 1000,
    PRICE_MAX: 5000
  };
  var CoordinateY = {
    LOCATION_MIN_Y: 130,
    LOCATION_MAX_Y: 630
  };
  var HOUSING_TYPES = ['palace', 'flat', 'house', 'bungalo'];
  var CHECK_TIME = ['12:00', '13:00', '14:00'];

  var FEATURES_TYPES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var PHOTOS_ADDRESSES = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

  var map = document.querySelector('.map');

  var getMapBounds = function () {
    return map.offsetWidth;
  };

  var locationMaxX = getMapBounds();

  var getRandomInteger = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  var getSubArray = function (arr) {
    var newLength = getRandomInteger(0, arr.length);
    var indexStart = getRandomInteger(0, arr.length - newLength);

    return arr.slice(indexStart, indexStart + newLength);
  };

  var createOffer = function (coords) {
    return {
      title: 'Уютная квартира',
      address: coords,
      price: getRandomInteger(PriceRange.PRICE_MIN, PriceRange.PRICE_MAX),
      type: HOUSING_TYPES[getRandomInteger(0, HOUSING_TYPES.length - 1)],
      rooms: getRandomInteger(1, ROOMS_MAX),
      guests: getRandomInteger(1, GUESTS_MAX),
      checkin: CHECK_TIME[getRandomInteger(0, CHECK_TIME.length - 1)],
      checkout: CHECK_TIME[getRandomInteger(0, CHECK_TIME.length - 1)],
      features: getSubArray(FEATURES_TYPES),
      description: 'Великолепная квартира-студия в центре Токио. Подходит как туристам, так и бизнесменам. Квартира полностью укомплектована и недавно отремонтирована.',
      photos: getSubArray(PHOTOS_ADDRESSES)
    };
  };

  var createLocation = function () {
    return {
      x: getRandomInteger(LOCATION_MIN_X, locationMaxX),
      y: getRandomInteger(CoordinateY.LOCATION_MIN_Y, CoordinateY.LOCATION_MAX_Y)
    };
  };

  var createAdvertisements = function () {
    var adv = [];

    for (var i = 0; i < NUMBER_OF_ADV; i++) {
      var coords = createLocation();
      adv.push({
        author: {avatar: 'img/avatars/user0' + (i + 1) + '.png'},
        offer: createOffer(coords.x + ', ' + coords.y),
        location: coords
      });
    }

    return adv;
  };

  window.data = {
    FEATURES_TYPES: FEATURES_TYPES,
    map: map,
    createAdvertisements: createAdvertisements
  };

})();
