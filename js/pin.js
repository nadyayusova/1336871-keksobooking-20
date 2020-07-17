'use strict';

(function () {
  var PinSize = {
    HALF_WIDTH: 25,
    HEIGHT: 70
  };
  var mainPin = window.data.map.querySelector('.map__pin--main');
  var pinTemplate = document.querySelector('#pin');
  var pinContent = pinTemplate.content.querySelector('.map__pin');

  var advertisements = [];


  var renderPin = function (adv) {
    var pin = pinContent.cloneNode(true);

    pin.style.left = adv.location.x + PinSize.HALF_WIDTH + 'px';
    pin.style.top = adv.location.y + PinSize.HEIGHT + 'px';
    pin.children[0].src = adv.author.avatar;
    pin.children[0].alt = adv.offer.title;
    pin.addEventListener('click', function () {
      window.card.renderCard(adv);
    });

    return pin;
  };

  var createPins = function () {
    var fragment = document.createDocumentFragment();
    advertisements = window.data.createAdvertisements();

    for (var i = 0; i < advertisements.length; i++) {
      fragment.appendChild(renderPin(advertisements[i]));
    }

    return fragment;
  };

  window.pin = {
    mainPin: mainPin,
    createPins: createPins
  };

})();
