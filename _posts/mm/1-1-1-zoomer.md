---
title: "Zoomer"
tags: ModestMaps
layout: control
---

A simple zoom control offering zoom in &amp; out buttons. It creates links and
appends them to the map.

### Example

<div class='demo-map' id='map-div'></div>

<pre class='prettyprint live'>
var mm = com.modestmaps;

wax.tilejson('http://api.tiles.mapbox.com/v3/mapbox.world-bright.jsonp',
    function(tilejson) {
    var m = new mm.Map('map-div',
      new wax.mm.connector(tilejson));
    wax.mm.zoomer(m, tilejson).appendTo(m.parent);
    m.setCenterZoom(new mm.Location(39, -98), 2);
});
</pre>

### API

#### `var zoomer = wax.mm.zoomer(map)`

Create your own zoomer that controls a map called 'map'

#### `zoomer.appendTo(element)`

Add the zoom in &amp; zoom out div elements to another element.
