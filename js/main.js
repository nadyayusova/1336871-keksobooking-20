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
var cardsBeforeIt = map.querySelector('.map__filters-container');
var pinTemplate = document.querySelector('#pin');
var pinContent = pinTemplate.content.querySelector('.map__pin');
var cardTemplate = document.querySelector('#card');
var cardContent = cardTemplate.content.querySelector('.map__card');
var typesDictionary = {
  'palace': 'Дворец',
  'flat': 'Квартира',
  'house': 'Дом',
  'bungalo': 'Бунгало'
};
var advertisements = [];

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
  advertisements = createAdvertisements();

  for (var i = 0; i < advertisements.length; i++) {
    fragment.appendChild(renderPin(advertisements[i]));
  }

  return fragment;
};

var removeEmptyBlock = function (blockToRemove) {
  blockToRemove.parentNode.removeChild(blockToRemove);
};

var renderFeatures = function (featuresBlock, featuresData) {
  var correction = 0;
  for (var i = 0; i < FEATURES_TYPES.length; i++) {
    var ind = featuresData.indexOf(FEATURES_TYPES[i]);
    if (ind === -1) {
      featuresBlock.removeChild(featuresBlock.children[i - correction]);
      correction++;
    }
  }
};

var renderPhotos = function (photosBlock, photosData) {
  photosBlock.children[0].src = photosData[0];
  if (photosData.length > 1) {
    var photo = photosBlock.querySelector('.popup__photo');
    for (var i = 1; i < photosData.length; i++) {
      photosBlock.appendChild(photo.cloneNode(true));
      photosBlock.children[i].src = photosData[i];
    }
  }
};

var fillContent = function (cardElement, advData, renderCardElement) {
  if (advData.length === 0) {
    removeEmptyBlock(cardElement);
  } else {
    renderCardElement(cardElement, advData);
  }
};

var renderCard = function (adv) {
  var card = cardContent.cloneNode(true);

  card.querySelector('.popup__avatar').src = adv.author.avatar;
  card.querySelector('.popup__title').textContent = adv.offer.title;
  card.querySelector('.popup__text--address').textContent = adv.offer.address;
  card.querySelector('.popup__text--price').innerHTML = adv.offer.price + '&#x20bd;<span>/ночь</span>';
  card.querySelector('.popup__type').textContent = typesDictionary[adv.offer.type];
  card.querySelector('.popup__text--capacity').textContent = adv.offer.rooms + ' комнаты для ' + adv.offer.guests + ' гостей';
  card.querySelector('.popup__text--time').textContent = 'Заезд после ' + adv.offer.checkin + ', выезд до ' + adv.offer.checkout;
  card.querySelector('.popup__description').textContent = adv.offer.description;
  fillContent(card.querySelector('.popup__features'), adv.offer.features, renderFeatures);
  fillContent(card.querySelector('.popup__photos'), adv.offer.photos, renderPhotos);

  return card;
};

var init = function () {
  map.classList.remove('map--faded');
  pinsHere.appendChild(createPins());
  map.insertBefore(renderCard(advertisements[0]), cardsBeforeIt);
};


init();
