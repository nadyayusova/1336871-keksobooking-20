'use strict';

(function () {
  var ALL_OPTIONS_VALUE = 'any';
  var pricesBounds = {
    'any': {
      'min': -1,
      'max': -1
    },
    'middle': {
      'min': 10000,
      'max': 50000
    },
    'low': {
      'min': 0,
      'max': 10000
    },
    'high': {
      'min': 50000,
      'max': Number.MAX_SAFE_INTEGER
    }
  };
  var filters = document.querySelector('.map__filters');
  var housingTypeFilter = filters.querySelector('#housing-type');
  var housingPriceFilter = filters.querySelector('#housing-price');
  var housingRoomsFilter = filters.querySelector('#housing-rooms');
  var housingGuestsFilter = filters.querySelector('#housing-guests');
  var housingFeaturesFilter = filters.querySelector('#housing-features');
  var currentHousingType = ALL_OPTIONS_VALUE;
  var currentHousingPrice = ALL_OPTIONS_VALUE;
  var currentHousingRooms = ALL_OPTIONS_VALUE;
  var currentHousingGuests = ALL_OPTIONS_VALUE;
  var currentHousingFeatures = [];

  var collectFilters = function () {
    currentHousingType = housingTypeFilter.options[housingTypeFilter.selectedIndex].value;
    currentHousingPrice = housingPriceFilter.options[housingPriceFilter.selectedIndex].value;
    currentHousingRooms = housingRoomsFilter.options[housingRoomsFilter.selectedIndex].value;
    currentHousingGuests = housingGuestsFilter.options[housingGuestsFilter.selectedIndex].value;
    currentHousingFeatures = [];
    var checkedFeatures = housingFeaturesFilter.querySelectorAll('input[type="checkbox"]:checked');
    checkedFeatures.forEach(function (feature) {
      currentHousingFeatures.push(feature.value);
    });
  };

  var applyFilter = function (adv) {
    var filteredAdv = [];
    collectFilters();
    var priceMin = pricesBounds[currentHousingPrice].min;
    var priceMax = pricesBounds[currentHousingPrice].max;

    for (var i = 0; i < adv.length; i++) {
      if (
        (currentHousingType === ALL_OPTIONS_VALUE || equals(adv[i].offer.type, currentHousingType)) &&
        (currentHousingPrice === ALL_OPTIONS_VALUE || (adv[i].offer.price >= priceMin && adv[i].offer.price <= priceMax)) &&
        (currentHousingRooms === ALL_OPTIONS_VALUE || equals(adv[i].offer.rooms, currentHousingRooms)) &&
        (currentHousingGuests === ALL_OPTIONS_VALUE || equals(adv[i].offer.guests, currentHousingGuests)) &&
        (currentHousingFeatures.length === 0 || contains(adv[i].offer.features, currentHousingFeatures))
      ) {
        filteredAdv.push(adv[i]);
      }
      if (filteredAdv.length === window.data.MAX_ADV_COUNT) {
        break;
      }
    }

    return filteredAdv;
  };

  var contains = function (arr, values) {
    // return values.every(value => arr.indexOf(value) >= 0); // eslint ругается на стрелку
    return values.every(function (value) {
      return arr.indexOf(value) >= 0;
    });
  };

  var equals = function (field, value) {
    return field.toString() === value.toString();
  };

  window.filter = {
    filters: filters,
    applyFilter: applyFilter
  };

})();
