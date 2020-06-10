'use strict';

var NUMBER_OF_ADV = 8;
var AVATAR_ADDRESS_PREFIX = 'img/avatars/user0';
var AVATAR_ADDRESS_POSTFIX = '.png';
var PRICE_MIN = 1000;
var PRICE_MAX = 5000;
var ROOMS_MAX = 10;
var GUESTS_MAX = 20;

var LOCATION_MIN_X = 0;
var LOCATION_MIN_Y = 130;
var LOCATION_MAX_Y = 630;

var HOUSING_TYPES = ['palace', 'flat', 'house', 'bungalo'];
var CHECK_TIME = ['12:00', '13:00', '14:00'];
var FEATURES_TYPES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var PHOTOS_ADDRESSES = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

var locationMaxX;
var map = document.querySelector('.map');
var pinsHere = map.querySelector('.map__pins');
var pinTemplate = document.querySelector('#pin');
var pinContent = pinTemplate.content.querySelector('.map__pin');


var getRandomInteger = function (max, min) {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

var getMapBounds = function () {
  return map.offsetWidth;
};

var getSubArray = function (arr) {
  var newLength = getRandomInteger(arr.length, 0);
  var indexStart = getRandomInteger(arr.length - newLength, 0);

  return arr.slice(indexStart, indexStart + newLength);
};

// взято из https://habr.com/ru/post/358094/
var shuffle = function (arr) {
  var j;
  var temp;

  for (var i = arr.length - 1; i > 0; i--) {
    j = getRandomInteger((i + 1), 0);
    temp = arr[j];
    arr[j] = arr[i];
    arr[i] = temp;
  }

  return arr;
};

var prepareIndex = function () {
  var arr = [];

  for (var i = 0; i < NUMBER_OF_ADV; i++) {
    arr[i] = i + 1;
  }

  return shuffle(arr);
};

var fillAddresses = function () {
  var arr = prepareIndex();
  var uniqAddresses = [];

  for (var i = 0; i < NUMBER_OF_ADV; i++) {
    uniqAddresses[i] = AVATAR_ADDRESS_PREFIX + arr[i] + AVATAR_ADDRESS_POSTFIX;
  }

  return uniqAddresses;
};

var createOffer = function (coords) {
  var offer = {};

  offer.title = 'Уютная квартира';
  offer.address = coords;
  offer.price = getRandomInteger(PRICE_MAX, PRICE_MIN);
  offer.type = HOUSING_TYPES[getRandomInteger(HOUSING_TYPES.length - 1, 0)];
  offer.rooms = getRandomInteger(ROOMS_MAX, 1);
  offer.guests = getRandomInteger(GUESTS_MAX, 1);
  offer.checkin = CHECK_TIME[getRandomInteger(CHECK_TIME.length - 1, 0)];
  offer.checkout = CHECK_TIME[getRandomInteger(CHECK_TIME.length - 1, 0)];
  offer.features = getSubArray(FEATURES_TYPES);
  offer.description = 'Великолепная квартира-студия в центре Токио. Подходит как туристам, так и бизнесменам. Квартира полностью укомплектована и недавно отремонтирована.';
  offer.photos = getSubArray(PHOTOS_ADDRESSES);

  return offer;
};

var createLocation = function () {
  var location = {};

  location.x = getRandomInteger(locationMaxX, LOCATION_MIN_X);
  location.y = getRandomInteger(LOCATION_MAX_Y, LOCATION_MIN_Y);

  return location;
};

var createAdvertisements = function () {
  var avatarUniqAddresses = fillAddresses();
  var adv = [];

  for (var i = 0; i < NUMBER_OF_ADV; i++) {
    var coords = createLocation();
    adv.push({
      author: {avatar: avatarUniqAddresses[i]},
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

  for (var i = 0; i < NUMBER_OF_ADV; i++) {
    fragment.appendChild(renderPin(advertisements[i]));
  }

  return fragment;
};

var init = function () {
  map.classList.remove('map--faded');
  locationMaxX = getMapBounds();
  pinsHere.appendChild(createPins());
};


init();
