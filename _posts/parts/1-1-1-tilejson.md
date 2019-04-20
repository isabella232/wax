---
title: TileJSON
tags: parts
layout: control
---

To start you'll need to know the URL of the tileset you want to use. Most
tilesets follow the convention of ending in `/{z}/{x}/{y}.[image format]`
where `{z}` is the *zoom level*, `{x}` is the *x coordinate* and `{y}` is
the *y coordinate*. TileJSON represents tileset URLs using these placeholders
so that a tile at any coordinate can be requested.

The URL of the tile above is `http://a.tiles.mapbox.com/v3/mapbox.world-light/2/2/1.png`.
By inference we can write the TileJSON needed to use the World Light tileset:

<pre class='prettyprint'>
{
  "version": "1.0.0",
  "scheme": "xyz",
  "tiles" ["http://a.tiles.mapbox.com/v3/mapbox.world-light/{z}/{x}/{y}.png"]
}
</pre>

- The `version` key declares that we are implementing version `1.0.0` of the
  TileJSON spec. Since there's only one version of TileJSON so far, it'll be `1.0.0` for you, too.
- The `scheme` key defines the order in which tiles are saved. Don't worry about this right now -
  you'll want the `xyz` scheme in most cases, but may find servers that use the `tms` scheme.
- The `tiles` key contains an array of URLs from which tiles can be requested. Pro users can put
  multiple tile URLs here so that they can request tiles from multiple domains simultaneously.


## Autopilot for TileJSON

Some servers, like [MapBox Hosting](http://tiles.mapbox.com/) provide TileJSON
definitions for all of the tilesets they serve. This way, it's easy to configure maps, since
all you need to know is the URL of the TileJSON file, and that'll provide you with values
for urls, a centerpoint, zoom ranges, and more. Wax contains a helper function that just
pulls a TileJSON description from a server using [JSONP](http://en.wikipedia.org/wiki/JSONP)
and gives it to you as an argument to a callback function that you can use to configure
your map.

Here we're using the url `http://api.tiles.mapbox.com/v3/mapbox.dc-nightvision.jsonp` for
the TileJSON for dc-nightvision - using the [MapBox Hosting API](http://mapbox.com/hosting/api/).

<pre class='prettyprint'>
var url = 'http://api.tiles.mapbox.com/v3/mapbox.dc-nightvision.jsonp';
wax.tilejson(url, function(tilejson) {
  var m = new MM.Map('tilejson-url',
    new wax.mm.connector(tilejson),
    new MM.Point(240,120));

  m.setCenterZoom(new MM.Location(
    tilejson.center[1],  // lon
    tilejson.center[0]), // lat
    tilejson.center[2]); // zoom
});
</pre>
