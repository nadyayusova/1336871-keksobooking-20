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
  var currentHousingType = ALL_OPTIONS_VALUE;
  var currentHousingPrice = ALL_OPTIONS_VALUE;
  var currentHousingRooms = ALL_OPTIONS_VALUE;
  var currentHousingGuests = ALL_OPTIONS_VALUE;
  var currentHousingFeatures = [];


  var contains = function (arr, values) {
    return values.every(function (value) {
      return arr.includes(value);
    });
  };

  var equals = function (field, value) {
    return field.toString() === value.toString();
  };

  var filterByHousingType = function (it) {
    currentHousingType = housingTypeFilter.options[housingTypeFilter.selectedIndex].value;
    return currentHousingType === ALL_OPTIONS_VALUE ? true : equals(it.offer.type, currentHousingType);
  };

  var filterByHousingPrice = function (it) {
    currentHousingPrice = housingPriceFilter.options[housingPriceFilter.selectedIndex].value;
    if (currentHousingPrice === ALL_OPTIONS_VALUE) {
      return true;
    } else {
      var priceMin = pricesBounds[currentHousingPrice].min;
      var priceMax = pricesBounds[currentHousingPrice].max;
      return it.offer.price >= priceMin && it.offer.price < priceMax;
    }
  };

  var filterByHousingRooms = function (it) {
    currentHousingRooms = housingRoomsFilter.options[housingRoomsFilter.selectedIndex].value;
    return currentHousingRooms === ALL_OPTIONS_VALUE ? true : equals(it.offer.rooms, currentHousingRooms);
  };

  var filterByHousingGuests = function (it) {
    currentHousingGuests = housingGuestsFilter.options[housingGuestsFilter.selectedIndex].value;
    return currentHousingGuests === ALL_OPTIONS_VALUE ? true : equals(it.offer.guests, currentHousingGuests);
  };

  var filterByHousingFeatures = function (it) {
    currentHousingFeatures = [];
    var checkedFeatures = housingFeaturesFilter.querySelectorAll('input[type="checkbox"]:checked');
    checkedFeatures.forEach(function (feature) {
      currentHousingFeatures.push(feature.value);
    });
    return currentHousingFeatures.length === 0 ? true : contains(it.offer.features, currentHousingFeatures);
  };

  var filterByAllFilters = function (it) {
    return filterByHousingType(it) &&
            filterByHousingPrice(it) &&
            filterByHousingRooms(it) &&
            filterByHousingGuests(it) &&
            filterByHousingFeatures(it);
  };

  var applyFilter = function (adv) {
    var filteredAdv = [];

    for (var i = 0; i < adv.length; i++) {
      if (filterByAllFilters(adv[i])) {
        filteredAdv.push(adv[i]);
      }
      if (filteredAdv.length === window.data.MAX_ADV_COUNT) {
        break;
      }
    }

    return filteredAdv;
  };

  window.filter = {
    filters: filters,
    applyFilter: applyFilter
  };

})();
