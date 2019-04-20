---
title: Legend
tags: Leaflet
layout: control
---

Display legend information on the map. This internally creates the legend,
and then you can add it to a map by chaining `.appendTo(map.parent)`.

<pre class='prettyprint'>
&lt;html&gt;
&lt;head&gt;
  &lt;script src='wax/ext/leaflet.js' type='text/javascript'&gt;&lt;/script&gt;
  &lt;script src='wax/dist/wax.leaf.js' type='text/javascript'&gt;&lt;/script&gt;
  &lt;link href='wax/ext/leaflet.css' rel='stylesheet' type='text/css' /&gt;
</pre>

<div id='map-div' class='demo-map'></div>

<pre class='prettyprint live'>
wax.tilejson('http://api.tiles.mapbox.com/v2/mapbox.geography-class.jsonp',
  function(tilejson) {
    var map = new L.Map('map-div')
      .addLayer(new wax.leaf.connector(tilejson))
      .setView(new L.LatLng(51, 0), 1);
    wax.leaf.legend(map, tilejson).appendTo(map._container);
});
</pre>

## API

#### `var legend = wax.leaf.legend(map, tilejson)`

Create a new legend object. This control requires the TileJSON object
to be valid and contain a valid legend attribute.

#### `legend.appendTo(element)`

Add the legend element - a div of the form

`<div class='wax-legends'><div class='wax-legend'>legend content</div></div>`

#### `var element = legend.element()`

Get this legend's DOM element. Can be useful to do things with jQuery or
other DOM code, like moving, hiding, or modifying the element.
