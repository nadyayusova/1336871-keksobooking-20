'use strict';

(function () {
  var MainPinSize = {
    WIDTH: 64,
    HEIGHT: 86
  };
  var mainPin = window.data.map.querySelector('.map__pin--main');


  var moveWithBounds = function (currentCoordinate, min, max) {
    return (Math.min(max, Math.max(min, currentCoordinate))) + 'px';
  };

  var mainPinMousedown = function (evt) {
    evt.preventDefault();

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      // здесь используется MainPinSize.WIDTH, потому что сам пин круглый, высоту указателя не учитываю
      mainPin.style.top = moveWithBounds(moveEvt.pageY - window.data.map.offsetTop - MainPinSize.WIDTH / 2,
          window.data.CoordinateY.LOCATION_MIN_Y - MainPinSize.HEIGHT,
          window.data.CoordinateY.LOCATION_MAX_Y - MainPinSize.HEIGHT);

      mainPin.style.left = moveWithBounds(moveEvt.pageX - window.data.map.offsetLeft - MainPinSize.WIDTH / 2,
          window.data.LOCATION_MIN_X,
          window.data.locationMaxX - MainPinSize.WIDTH);

      window.form.setAddress(false);
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };

  window.move = {
    mainPinMousedown: mainPinMousedown
  };
})();
