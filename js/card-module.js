'use strict';

(function () {
  var typesDictionary = {
    'palace': 'Дворец',
    'flat': 'Квартира',
    'house': 'Дом',
    'bungalo': 'Бунгало'
  };

  var cardTemplate = document.querySelector('#card');
  var cardContent = cardTemplate.content.querySelector('.map__card');
  var cardsBeforeIt = window.data.map.querySelector('.map__filters-container');
  var currentCard = null;


  var renderFeatures = function (featuresBlock, featuresData) {
    var correction = 0;
    for (var i = 0; i < window.data.FEATURES_TYPES.length; i++) {
      var ind = featuresData.indexOf(window.data.FEATURES_TYPES[i]);
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

  var fillContent = function (cardElement, advertisementData, renderCardElement) {
    if (advertisementData.length === 0) {
      cardElement.remove();
    } else {
      renderCardElement(cardElement, advertisementData);
    }
  };

  var renderCard = function (advertisement) {
    closeCard();

    currentCard = cardContent.cloneNode(true);

    currentCard.querySelector('.popup__avatar').src = advertisement.author.avatar;
    currentCard.querySelector('.popup__title').textContent = advertisement.offer.title;
    currentCard.querySelector('.popup__text--address').textContent = advertisement.offer.address;
    currentCard.querySelector('.popup__text--price').innerHTML = advertisement.offer.price + '&#x20bd;<span>/ночь</span>';
    currentCard.querySelector('.popup__type').textContent = typesDictionary[advertisement.offer.type];
    currentCard.querySelector('.popup__text--capacity').textContent = advertisement.offer.rooms + ' комнаты для ' + advertisement.offer.guests + ' гостей';
    currentCard.querySelector('.popup__text--time').textContent = 'Заезд после ' + advertisement.offer.checkin + ', выезд до ' + advertisement.offer.checkout;
    currentCard.querySelector('.popup__description').textContent = advertisement.offer.description;
    fillContent(currentCard.querySelector('.popup__features'), advertisement.offer.features, renderFeatures);
    fillContent(currentCard.querySelector('.popup__photos'), advertisement.offer.photos, renderPhotos);

    window.data.map.insertBefore(currentCard, cardsBeforeIt);
    var closeButton = currentCard.querySelector('.popup__close');
    document.addEventListener('keydown', onCardEscPress);
    closeButton.addEventListener('click', onCardCloseClick);
  };

  var onCardEscPress = function (evt) {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      closeCard();
    }
  };

  var onCardCloseClick = function () {
    closeCard();
  };

  var closeCard = function () {
    if (!currentCard) {
      return;
    }
    var activePin = document.querySelector('.map__pin--active');
    if (activePin) {
      activePin.classList.remove('map__pin--active');
    }
    currentCard.remove();
    document.removeEventListener('keydown', onCardEscPress);
  };

  window.cardModule = {
    cardsBeforeIt: cardsBeforeIt,
    renderCard: renderCard,
    closeCard: closeCard
  };

})();
