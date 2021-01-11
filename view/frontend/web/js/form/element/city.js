
/**
 * @api
 */
define([
    'Magento_Ui/js/form/element/abstract',
    'Magento_Ui/js/lib/validation/validator',
    'uiRegistry'
], function (Element, validator, register) {
    'use strict';

    return Element.extend({
        defaults: {
            imports: {
                updateCitySelect: '${ $.parentName }.city_id:value',
                postcode: '${ $.parentName }.postcode',
            },
            options: []
        },

        /**
         * Validates itself by it's validation rules using validator object.
         * If validation of a rule did not pass, writes it's message to
         * 'error' observable property.
         *
         * @returns {Object} Validate information.
         */
        validate: function () {
            var value = this.value(),
                result = validator(this.validation, value, this.validationParams),
                message =  result.message,
                isValid = this.disabled() || result.passed;

            this.error(message);
            this.error.valueHasMutated();
            this.bubble('error', message);

            if (this.source && !isValid) {
                this.source.set('params.invalid', true);
            }

            return {
                valid: isValid,
                target: this
            };
        },

        /**
         *
         * @param {string} cityName
         */
        updateCitySelect: function (cityName) {

            if (cityName || cityName === '') {
                this.visible(false);
                this.value(cityName);
                this.updatePostCode(cityName);
                return;
            }

            this.visible(true);
        },

        updatePostCode: function(cityName) {
            let postcode = register.get(this.imports.postcode);
            let postcodeMap = {
                'Ahlone': '11121',
                'Bahan': '11201',
                'Botahtaung': '11161',
                'Dagon': '11191',
                'Dagon Myothit(East)': '11451',
                'Dagon Myothit(North)':	'11421',
                'Dagon Myothit(Seikkan)': '11441',
                'Dagon Myothit(South)':	'11431',
                'Dala':	'11261',
                'Dawpone': '11241',
                'Dawbon': '11241',
                'Hlaing': '11051',
                'Hlaing Thar Yar': '11401',
                'Hlegu': '11371',
                'Hmawbi': '11361',
                'Htantabin': '11391',
                'Htauk Kyant': '11022',
                'Insein': '11011',
                'Kamayut': '11041',
                'Kawthmu': '11351',
                'Khayan': '11321',
                'Kokoegyung': '11281',
                'Konchankone': '11341',
                'Kyauktada': '11181',
                'Kyauktan': '11301',
                'Kyeemyindine': '11101', 
                'Kyimyindaing': '11101',
                'Lanmadaw': '11131',
                'Latha': '11141',
                'Mayangone': '11061',
                'Mingalardon': '11021',
                'Mingalar Taung Nyunt': '11221',
                'North Okkalapa': '11031',
                'Pabedan': '11141',
                'Pazundaung': '11171',
                'Sanchaung': '11111',
                'Seikkan': '11181',
                'Seikkyikanaungto':	'11271',
                'Shwe Pyi Thar': '11411',
                'South Okkalapa': '11091',
                'Taikkyi':	'11381',
                'Tamwe': '11211',
                'Thaketa': '11231', 
                'Tharkayta': '11231',
                'Thanlyin':	'11291',
                'Thingangyun': '11071',
                'Thonegwa':	'11311',
                'Twante': '11331',
                'Yankin': '11081',
            }

            postcode.value(postcodeMap[cityName]);
        },
    });
});
