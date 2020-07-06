'use strict';

(function () {
  var mainPin = window.data.map.querySelector('.map__pin--main');
  var pinTemplate = document.querySelector('#pin');
  var pinContent = pinTemplate.content.querySelector('.map__pin');

  var advertisements = [];


  var renderPin = function (adv) {
    var pin = pinContent.cloneNode(true);

    pin.style.left = adv.location.x + pin.children[0].width / 2 + 'px';
    pin.style.top = adv.location.y + pin.children[0].height + 'px';
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
