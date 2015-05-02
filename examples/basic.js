var qcew = require('../index.js'); // Note: Change this to `require('qcew')` when using the module in your own script.

// Data output format can be `json`, `csv` or `rows`. 
// If no value is passed as the last argument, `json` will be returned.
// `rows` will return an array of arrays representing the desired table.

qcew.getAreaData('2013','1','26000', function(err, areaData){
	if (!err){
		console.log(areaData);
	} else {
		console.log(err);
	}
}, 'json');

qcew.getIndustryData('2013','1','3361', function(err, autoManufacturing){
	if (!err){
		console.log(autoManufacturing);
	} else {
		console.log(err);
	}
}, 'csv');

qcew.getSizeData('2013','6', function(err, sizeData){
	if (!err){
		console.log(sizeData);
	} else {
		console.log(err);
	}
}, 'rows');
