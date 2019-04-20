---
title: Legend
tags: ModestMaps
layout: control
---

Display legend information on the map. This internally creates the legend,
and then you can add it to a map by chaining `.appendTo(map.parent)`.

## Example

<div class='demo-map' id='map-div'></div>

<pre class='prettyprint live'>
var mm = com.modestmaps;
wax.tilejson(
  'http://api.tiles.mapbox.com/v3/mapbox.geography-class.jsonp',
  function(tilejson) {
    var m = new mm.Map('map-div',
      new wax.mm.connector(tilejson));
    wax.mm.legend(m, tilejson).appendTo(m.parent);
    m.setCenterZoom({ lat: 39, lon: -98 }, 2);
  }
);
</pre>

## API

#### `var legend = wax.mm.legend(map, tilejson)`

Create a new legend object. This control requires the TileJSON object
to be valid and contain a valid legend attribute.

#### `legend.appendTo(element)`

Add the legend element - a div of the form

`<div class='wax-legends'><div class='wax-legend'>legend content</div></div>`

#### `var element = legend.element()`

Get this legend's DOM element. Can be useful to do things with jQuery or
other DOM code, like moving, hiding, or modifying the element.
