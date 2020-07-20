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

  var fillContent = function (cardElement, advData, renderCardElement) {
    if (advData.length === 0) {
      cardElement.remove();
    } else {
      renderCardElement(cardElement, advData);
    }
  };

  var renderCard = function (adv) {
    closeCard();

    currentCard = cardContent.cloneNode(true);

    currentCard.querySelector('.popup__avatar').src = adv.author.avatar;
    currentCard.querySelector('.popup__title').textContent = adv.offer.title;
    currentCard.querySelector('.popup__text--address').textContent = adv.offer.address;
    currentCard.querySelector('.popup__text--price').innerHTML = adv.offer.price + '&#x20bd;<span>/ночь</span>';
    currentCard.querySelector('.popup__type').textContent = typesDictionary[adv.offer.type];
    currentCard.querySelector('.popup__text--capacity').textContent = adv.offer.rooms + ' комнаты для ' + adv.offer.guests + ' гостей';
    currentCard.querySelector('.popup__text--time').textContent = 'Заезд после ' + adv.offer.checkin + ', выезд до ' + adv.offer.checkout;
    currentCard.querySelector('.popup__description').textContent = adv.offer.description;
    fillContent(currentCard.querySelector('.popup__features'), adv.offer.features, renderFeatures);
    fillContent(currentCard.querySelector('.popup__photos'), adv.offer.photos, renderPhotos);

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
    currentCard.remove();
    document.removeEventListener('keydown', onCardEscPress);
  };

  window.card = {
    cardsBeforeIt: cardsBeforeIt,
    renderCard: renderCard,
    closeCard: closeCard
  };

})();
