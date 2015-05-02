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
returns data containing the associated area data. Use 'a' for annual
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
and data containing the associated industry data. Use 'a' for 
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
and returns data containing the associated size data. Size data
is only available for the first quarter of each year.
For all establishment size classes and titles see:
http://www.bls.gov/cew/doc/titles/size/size_titles.htm
*/
function qcewGetSizeData(year, size, cb, format){
	var urlPath = 'http://www.bls.gov/cew/data/api/'+year+'/1/size/'+size+'.csv';
	qcewRequestToData(urlPath, cb, format);
}

module.exports = {
	getAreaData: qcewGetAreaData,
	getAreaData: qcewGetIndustryData,
	getAreaData: qcewGetSizeData
};
