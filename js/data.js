'use strict';

(function () {

  var LOCATION_MIN_X = 0;
  var CoordinateY = {
    LOCATION_MIN_Y: 130,
    LOCATION_MAX_Y: 630
  };
  var FEATURES_TYPES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var MAX_ADV_COUNT = 5;

  var advertisements = [];
  var map = document.querySelector('.map');

  var getMapBounds = function () {
    return map.offsetWidth;
  };

  var locationMaxX = getMapBounds();

  window.data = {
    LOCATION_MIN_X: LOCATION_MIN_X,
    FEATURES_TYPES: FEATURES_TYPES,
    MAX_ADV_COUNT: MAX_ADV_COUNT,
    CoordinateY: CoordinateY,
    locationMaxX: locationMaxX,
    advertisements: advertisements,
    map: map
  };

})();
