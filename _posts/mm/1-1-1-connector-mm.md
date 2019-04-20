---
title: "Connector"
tags: ModestMaps
layout: control
---

The Modest Maps connector lets you configure a layer from MapBox
with Modest Maps easily.

### Example

<div class='demo-map' id='map-div'></div>

<pre class='prettyprint live'>
var mm = com.modestmaps;

wax.tilejson('http://api.tiles.mapbox.com/v3/mapbox.world-bright.jsonp',
    function(tilejson) {
    var m = new mm.Map('map-div',
      new wax.mm.connector(tilejson));
    m.setCenterZoom(new mm.Location(39, -98), 2);
});
</pre>

Note that this layer will have its `outerLimits` set - so it will not
try to load tiles that are not rendered - but it will
_not_ restrict zooming of the map as of
[Modest Maps 1.0.0](https://github.com/modestmaps/modestmaps-js/wiki/Upgrading-to-1.0.0).

To restrict zooming of the map, you can call `setZoomRange` on the map
object:

<pre class='prettyprint'>
m.setZoomRange(tilejson.minzoom, tilejson.maxzoom);
</pre>

### API

#### `var layer = wax.mm.connector(tilejson)`

Returns a new layer usable by Modest Maps.
