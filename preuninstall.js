var fs = require('fs');
var path = require('path');

// Move map tiles back to NPM package from SignalK's public tiles webspace

var newpath = path.resolve(__dirname, "../signalk-world-coastline-map-database/world-coastline.mbtiles");
var oldpath = path.resolve(__dirname, "../../public/mapcache/world-coastline.mbtiles");

fs.renameSync(oldpath, newpath);
