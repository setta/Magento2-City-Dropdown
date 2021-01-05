/**
 * @api
 */
define([
    'Magento_Ui/js/form/element/select',
    'uiRegistry',
], function (Element, registry) {
    'use strict';

    return Element.extend({
        defaults: {
            imports: {
                update: '${ $.parentName }.region_id:value',
                city: '${ $.parentName }.city',
                postcode: '${ $.parentName }.postcode'
            },
            options: [],
            visible: false
        },

        initialize: function () {
            this._super();

            if (this.name.includes('steps.billing-step')) {
                this.visible(false)
            }

            this.visible(false);  // hide city select box at start
        },

        /**
         * On region update we check for city
         *
         * @param {string} regionId
         */
        update: function (regionId) {
            let options = [],
                cityValue,
                cities,
                regions = JSON.parse(window.checkoutConfig.cities);

            if (regions && regions[regionId] && regions[regionId].length) {
                cities = regions[regionId];

                options = cities.map(function (city) {
                    return {title: city, value: city, labeltitle: city, label: city}
                })
            }

            if (!options || !options.length) {
                this.visible(false);
                this.value(null);
            }

            if (options && options.length) {
                options = [{title: "", value: "", label: "Select the city"}].concat(options);
                this.visible(true);

                //cityValue = registry.get(this.imports.city).value();
                let city = registry.get(this.imports.city);
                city.visible(false);        // always hide city textbox, if there are options
                city.value(null);           // reset value in textbox when region is updated
                registry.get(this.imports.postcode).disabled(true);     // disable postcode textbox
                
                if (!this.value() && cityValue) {
                    this.value(cityValue)
                }
            }

            this.options(options);
        },
    });
});
