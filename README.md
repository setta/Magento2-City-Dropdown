# Magento 2 City Dropdown
- add City Dropdown on checkout page
- hide City Textbox on checkout page
- when City Dropdown is changed, the value will save into hidden City Textbox
- when City Dropdown is changed, the Zip Code field will be updated ( function updatePostCode() in RomCity/view/frontend/web/js/form/element/city.js)

# Requirements
- Magento 2.x
- Eadesigndev Core component

# Installation
- create directory app/code/Eadesigndev
- copy Eacore to app/code/Eadesigndev
- copy RomCity to app/code/Eadesigndev
- run command
```
   bin/magento module:enable Eadesigndev_Eacore
   bin/magento module:enable Eadesigndev_RomCity
   bin/magento setup:upgrade
   bin/magento setup:di:compile
   bin/magento cache:flush
```
- upload Myanmar region (assume database name is 'magento')
```
   mysql magento < TableRate/mai-directory_country_regin_MM.sql
```
- upload TableRate/mai-tablerates.csv through shipping method 'Table Rate'
- upload TableRate/mai-township.csv athrough 'RomCity' module

# Change city dropdown and shippping rate
- edit city list in TableRate/mai-township.csv
- edit city and postcode map in RomCity/view/frontend/web/js/form/element/city.js
- edit postcode and shipping rate in TableRate/mai-tablerates.csv


