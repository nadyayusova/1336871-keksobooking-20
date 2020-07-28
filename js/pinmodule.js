'use strict';

(function () {
  var PinSize = {
    HALF_WIDTH: 25,
    HEIGHT: 70
  };
  var mainPin = document.querySelector('.map__pin--main');
  var pinTemplate = document.querySelector('#pin');
  var pinContent = pinTemplate.content.querySelector('.map__pin');
  var pinsHere = window.data.map.querySelector('.map__pins');
  var errorTemplate = document.querySelector('#error');
  var errorContent = errorTemplate.content.querySelector('.error');
  var mainSection = document.querySelector('main');


  var renderPin = function (advertisements) {
    var pin = pinContent.cloneNode(true);

    pin.style.left = advertisements.location.x - PinSize.HALF_WIDTH + 'px';
    pin.style.top = advertisements.location.y - PinSize.HEIGHT + 'px';
    pin.children[0].src = advertisements.author.avatar;
    pin.children[0].alt = advertisements.offer.title;

    var onPinClick = function () {
      var lastPin = document.querySelector('.map__pin--active');
      if (lastPin) {
        lastPin.classList.remove('map__pin--active');
      }
      pin.classList.add('map__pin--active');
      window.cardmodule.renderCard(advertisements);
    };

    pin.addEventListener('click', onPinClick);

    return pin;
  };

  var createPins = function (advertisements) {
    var fragment = document.createDocumentFragment();
    var pinsCount = Math.min(window.data.MAX_ADV_COUNT, advertisements.length);

    for (var i = 0; i < pinsCount; i++) {
      fragment.appendChild(renderPin(advertisements[i]));
    }

    return fragment;
  };

  var onLoad = function (data) {
    window.data.advertisements = data;
    updatePins();
    window.formmodule.setFormElementsState(window.formmodule.mapFilters, true);
    window.formmodule.mapFeatures.style.opacity = 1;
  };

  var onError = function (errorText) {
    var errorMessage = document.querySelector('.error');

    if (!errorMessage) {
      errorMessage = errorContent.cloneNode(true);
    }
    errorMessage.querySelector('.error__message').textContent = errorText;

    var onMessageButtonClick = function () {
      window.message.hideMessage(errorMessage);
      showPins();
    };

    var errorButton = errorMessage.querySelector('.error__button');
    errorButton.addEventListener('click', onMessageButtonClick);
    window.message.showMessage(errorMessage, errorButton, onMessageButtonClick);

    mainSection.appendChild(errorMessage);
  };

  var showPins = function () {
    window.backend.load(onLoad, onError);
  };

  var hidePins = function () {
    var pins = document.querySelectorAll('.map__pin:not(.map__pin--main)');
    pins.forEach(function (pin) {
      pin.remove();
    });
  };

  var updatePins = function () {
    window.cardmodule.closeCard();
    hidePins();
    var filteredAdvertisements = window.filtermodule.applyFilter(window.data.advertisements);
    pinsHere.appendChild(createPins(filteredAdvertisements));
  };

  window.pinmodule = {
    mainPin: mainPin,
    mainSection: mainSection,
    onError: onError,
    showPins: showPins,
    hidePins: hidePins,
    updatePins: window.debounce(updatePins)
  };

})();
