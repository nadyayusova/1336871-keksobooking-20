'use strict';

var NUMBER_OF_ADV = 8;
var PriceRange = {
  PRICE_MIN: 1000,
  PRICE_MAX: 5000
};
var ROOMS_MAX = 10;
var GUESTS_MAX = 20;

var LOCATION_MIN_X = 0;
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
var pinsHere = map.querySelector('.map__pins');
var pinTemplate = document.querySelector('#pin');
var pinContent = pinTemplate.content.querySelector('.map__pin');

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
      location: coords,
      offer: createOffer(coords.x + ', ' + coords.y)
    });
  }

  return adv;
};

var renderPin = function (adv) {
  var pin = pinContent.cloneNode(true);

  pin.style.left = adv.location.x + pin.children[0].width / 2 + 'px';
  pin.style.top = adv.location.y + pin.children[0].height + 'px';
  pin.children[0].src = adv.author.avatar;
  pin.children[0].alt = adv.offer.title;

  return pin;
};

var createPins = function () {
  var fragment = document.createDocumentFragment();
  var advertisements = createAdvertisements();

  for (var i = 0; i < advertisements.length; i++) {
    fragment.appendChild(renderPin(advertisements[i]));
  }

  return fragment;
};

var init = function () {
  map.classList.remove('map--faded');
  pinsHere.appendChild(createPins());
};


init();
