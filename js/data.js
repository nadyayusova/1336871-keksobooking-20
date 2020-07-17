'use strict';

(function () {

  var LOCATION_MIN_X = 0;
  var CoordinateY = {
    LOCATION_MIN_Y: 130,
    LOCATION_MAX_Y: 630
  };
  var FEATURES_TYPES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];

  var map = document.querySelector('.map');

  var getMapBounds = function () {
    return map.offsetWidth;
  };

  var locationMaxX = getMapBounds();

  window.data = {
    LOCATION_MIN_X: LOCATION_MIN_X,
    FEATURES_TYPES: FEATURES_TYPES,
    CoordinateY: CoordinateY,
    locationMaxX: locationMaxX,
    map: map
  };

})();
