Download map tiles of simple world map
--------------------------------------

Tile design
===========

Setup a map in Mapbox Studio.
An approach to a simple map with just coastlines, countries and towns is in Coastline-Mapbox.zip.
Start the live view (export to a friend).
Switch to raster tiles and copy the tile URL. The tiles are PNGs with a size of 512x512.


Download
========

Open download.js and change the tile URL. Also change the zoom level you need.
Create a directory "tiles/" where the tiles will be saved.

    $ npm install
		$ node download.js

The script first downloads the tiles and then moves them into a directory structure.


Complete tiles directory
========================

You have directories with tiles. In the tiles/ directory add this metadata.json:

    {
      "name": "World Coastline",
      "description": "The whole earth up to zoom level 9",
      "version": "1"
    }

Convert into mbtiles format
===========================

All these small files are a pain on the hard drive.
So let's convert them into one large database file.

Install a python tool for conversion to mbtiles format:

    $ git clone https://github.com/mapbox/mbutil
		$ ./mb-util --scheme=xyz --image_format=png   ../tiles/ coastline.mbtiles

The output is a file 'coastline.mbtiles'.


Install map in Signal K server
==============================

Move this file to 'signalk-server-node/public/mapcache'.
After reboot you will see the map here:
http://localhost:3000/signalk/v1/api/resources/charts

Done!
