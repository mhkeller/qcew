QCEW
===

An NodeJs interface for [Bureau of Labor Statistics Quarterly Census of Employment and Wages](http://www.bls.gov/cew/home.htm) data. For other languages, see the [QCEW Open Data Access](http://www.bls.gov/cew/doc/access/data_access_examples.htm) page. This setup borrows from the Python and PHP/JavaScript examples.

## Installation

````
npm install qcew
````

## Usage

The module has three functions, which you would use like below. For documentation on what the data means, please see the [BLS QCEW website](http://www.bls.gov/cew/home.htm) and [overview](http://www.bls.gov/cew/cewover.htm), which will have the most up-to-date and in-depth information.


````js
var qcew = require('qcew');

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
````

## License

MIT