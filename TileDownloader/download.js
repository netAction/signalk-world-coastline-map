var https = require('https');
var fs = require('fs');
var async = require('async');
var shell = require('shelljs');

// Up to level 8: 87381 tiles (207MB),
// 64.476 blue or orange (8MB),
// 22905 with content (199MB).


function download(coordinates, callback) {
	var z = coordinates[0];
	var x = coordinates[1];
	var y = coordinates[2];

	console.log(z,x,y);
	var file = fs.createWriteStream("tiles/tile-"+z+"-"+x+"-"+y+".png");
	var url = "https://api.mapbox.com/styles/v1/netaction/cj7zv37kv607c2snqv9bqjir7/tiles/"+z+"/"+x+"/"+y+"?access_token=pk.eyJ1IjoibmV0YWN0aW9uIiwiYSI6ImNqN3p1dWU4djRqZGwycW8zMGUyM2Z2b3YifQ.cEdB7_LiqZ476kP1O2Z4kA";

	var request = https.get(url, function(response) {
		response.pipe(file);
		callback();
	});
}


var tilenumbers = [];
for (var z=0; z<1; z++) {
	for (var x=0; x<Math.pow(2,z); x++) {
		for (var y=0; y<Math.pow(2,z); y++) {
			tilenumbers.push([z,x,y]);
		}
	}
}
// Download single tiles that are missing
//tilenumbers.push([9,134,475]);

// Do not run more than 10 downloads simultaneously
// https://stackoverflow.com/a/26874504/589531
async.eachLimit(tilenumbers, 10, download, function(err) {
  if(err) throw err;
});


// ############### Directory cleanup #################

function createDirectory(filename) {
  if (filename.startsWith('tile-')) {
		// tile-9-99-91.png
		coordinates = filename.split('.');
		coordinates = coordinates[0];
		// tile-9-99-91
		coordinates = coordinates.split('-');
		coordinates.shift();
		// [9,99,91]


		var newPath = 'tiles/'+coordinates[0]+'/'+coordinates[1]+'/';
		var newFilename = coordinates[2]+'.png';
		// p means recursive creation
		shell.mkdir('-p', newPath);
		// Now move tile into that directory
		shell.mv('tiles/'+filename, newPath + newFilename)
	}
}

var unsortedFilenames = [];
fs.readdirSync('tiles').forEach(file => {
	createDirectory(file);
});
