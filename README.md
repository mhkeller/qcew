QCEW
===

An NodeJs interface for [Bureau of Labor Statistics Quarterly Census of Employment and Wages](http://www.bls.gov/cew/home.htm) data. For other languages, see the [QCEW Open Data Access](http://www.bls.gov/cew/doc/access/data_access_examples.htm) page. This setup borrows from the Python and PHP/JavaScript examples for code samples and documentation.

## Installation

````
npm install qcew
````

## Usage

The module has three functions, which you would use as below. For documentation on what the data means, please see the [BLS QCEW website](http://www.bls.gov/cew/home.htm) and [overview](http://www.bls.gov/cew/cewover.htm), which will have the most up-to-date and in-depth information.

All functions can take an optional `format` parameter as the last argument to determine the data format you'll receive. If nothing is set, the data will come back as Json. The options are:

* `'json'` — The default and needs not be specified. Returns an array of objects. 
* `'csv'` — Returns the data as a csv string, which is how the API sends it. Useful for writing out to a file.
* `'rows'` — Returns an array of arrays representing each row in the data. The first array contains the header values.

#### *getAreaData(year, quarter, area, callback[, format])* 

This function takes a year, quarter, and area argument and returns data containing the associated area data. Use 'a' for annual averages. 

For all area codes and titles see: <http://www.bls.gov/cew/doc/titles/area/area_titles.htm>

#### *getIndustryData(year, quarter, industry_code, callback[, format])*

This function takes a year, quarter, and industry code and returns data containing the associated industry data. Use 'a' for annual averages. Some industry codes contain hyphens. The CSV files use underscores instead of hyphens. So 31-33 becomes 31_33. 

For all industry codes and titles see: <http://www.bls.gov/cew/doc/titles/industry/industry_titles.htm>

#### *getSizeData(year, establishment_size_class_code, callback[, format])*

This function takes a year and establishment size class code and returns data containing the associated size data. Size data is only available for the first quarter of each year.

For all establishment size classes and titles see: <http://www.bls.gov/cew/doc/titles/size/size_titles.htm>


## Example

````js
var qcew = require('qcew');

// Data output format can be `json`, `csv` or `rows`. 
// If no value is passed as the last argument, `json` will be returned.
// `rows` will return an array of arrays representing the desired table.

qcew.getAreaData('2013','1','26000', function(err, areaData){
	if (!err){
		console.log(areaData);
	} else {
		console.log(err);
	}
});

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