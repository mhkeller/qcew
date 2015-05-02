// The other examples on the BLS website aren't set up with the library as a module
// To keep things consistent, here's an example that shows how to use these functions as standalones.
// Note: There is no real reason why you would ever want to use this set up over what is in `examples/basic.js`.
// It is provided here as a purely demonstrational example if you're new to NodeJs.

var request = require('request');
var dsv			= require('dsv');

/* *******************************************************************************
qcewRequestToData : This function takes a url, a callback and an optional format argument
and returns data. By default, it will return json if `format` is not set. 
If `'csv'` is passed as the format, it will return the data as it comes from the API,
which is a csv.
If `rows` is passed it will return an array of arrays, the first one being the header row.
*/ 
function qcewRequestToData(urlPath, cb, format){
	var formatters = {
		json: function(body){
			return dsv.csv.parse(body);
		},
		csv: function(body){
			return body;
		},
		rows: function(body){
			var csvLines = body.split('\r\n');
			var dataTable = [];
			for (var i = 0; i < csvLines.length; i += 1) {
				dataTable.push(csvLines[i].split(','));
			}
			return dataTable;
		}
	};
	format = format || 'json';
	request(urlPath, function(err, response, body){
		var data;
		if (!err && response.statusCode == 200){
			data = formatters[format](body);
			cb(null, data);
		} else {
			cb(err);
		}
	});
}

/* *******************************************************************************
qcewGetAreaData : This function takes a year, quarter, and area argument and
returns an array containing the associated area data. Use 'a' for annual
averages. 
For all area codes and titles see:
http://www.bls.gov/cew/doc/titles/area/area_titles.htm
*/ 
function qcewGetAreaData(year, qtr, area, cb, format){
	var urlPath = 'http://www.bls.gov/cew/data/api/'+year+'/'+qtr+'/area/'+area+'.csv';
	qcewRequestToData(urlPath, cb, format);
}

/* *******************************************************************************
qcewGetIndustryData : This function takes a year, quarter, and industry code
and returns an array containing the associated industry data. Use 'a' for 
annual averages. Some industry codes contain hyphens. The CSV files use
underscores instead of hyphens. So 31-33 becomes 31_33. 
For all industry codes and titles see:
http://www.bls.gov/cew/doc/titles/industry/industry_titles.htm
*/
function qcewGetIndustryData(year, qtr, industry, cb, format){
	var urlPath = 'http://www.bls.gov/cew/data/api/'+year+'/'+qtr+'/industry/'+industry+'.csv';
	qcewRequestToData(urlPath, cb, format);
}

/* *******************************************************************************
qcewGetSizeData : This function takes a year and establishment size class code
and returns an array containing the associated size data. Size data
is only available for the first quarter of each year.
For all establishment size classes and titles see:
http://www.bls.gov/cew/doc/titles/size/size_titles.htm
*/
function qcewGetSizeData(year, size, cb, format){
	var urlPath = 'http://www.bls.gov/cew/data/api/'+year+'/1/size/'+size+'.csv';
	qcewRequestToData(urlPath, cb, format);
}

qcewGetAreaData('2013','1','26000', function(err, areaData){
	if (!err){
		console.log(areaData);
	} else {
		console.log(err);
	}
}, 'json');

qcewGetIndustryData('2013','1','3361', function(err, autoManufacturing){
	if (!err){
		console.log(autoManufacturing);
	} else {
		console.log(err);
	}
}, 'csv');

qcewGetSizeData('2013','6', function(err, sizeData){
	if (!err){
		console.log(sizeData);
	} else {
		console.log(err);
	}
}, 'rows');
