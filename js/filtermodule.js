'use strict';

(function () {
  var ALL_OPTIONS_VALUE = 'any';
  var pricesBounds = {
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


  var isContaining = function (array, values) {
    return values.every(function (value) {
      return array.includes(value);
    });
  };

  var filterByHousingType = function (it) {
    return housingTypeFilter.value === it.offer.type || housingTypeFilter.value === ALL_OPTIONS_VALUE;
  };

  var filterByHousingPrice = function (it) {
    var currentHousingPrice = housingPriceFilter.value;
    if (currentHousingPrice === ALL_OPTIONS_VALUE) {
      return true;
    }
    var priceMin = pricesBounds[currentHousingPrice].min;
    var priceMax = pricesBounds[currentHousingPrice].max;
    return it.offer.price >= priceMin && it.offer.price < priceMax;
  };

  var filterByHousingRooms = function (it) {
    return Number(housingRoomsFilter.value) === it.offer.rooms || housingRoomsFilter.value === ALL_OPTIONS_VALUE;
  };

  var filterByHousingGuests = function (it) {
    return Number(housingGuestsFilter.value) === it.offer.guests || housingGuestsFilter.value === ALL_OPTIONS_VALUE;
  };

  var filterByHousingFeatures = function (it) {
    var checkedFeatures = housingFeaturesFilter.querySelectorAll('input[type="checkbox"]:checked');
    var currentHousingFeatures = Array.from(checkedFeatures).map(function (feature) {
      return feature.value;
    });
    return currentHousingFeatures.length === 0 || isContaining(it.offer.features, currentHousingFeatures);
  };

  var filterByAllFilters = function (it) {
    return filterByHousingType(it) &&
            filterByHousingPrice(it) &&
            filterByHousingRooms(it) &&
            filterByHousingGuests(it) &&
            filterByHousingFeatures(it);
  };

  var applyFilter = function (advertisements) {
    var filteredAdvertisements = [];

    for (var i = 0; i < advertisements.length; i++) {
      if (filterByAllFilters(advertisements[i])) {
        filteredAdvertisements.push(advertisements[i]);
      }
      if (filteredAdvertisements.length === window.data.MAX_ADV_COUNT) {
        break;
      }
    }

    return filteredAdvertisements;
  };

  window.filtermodule = {
    filters: filters,
    applyFilter: applyFilter
  };

})();
