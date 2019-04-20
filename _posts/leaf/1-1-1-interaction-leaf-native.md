---
title: Interaction with Native Popups
tags: Leaflet touch
layout: control
---

With Wax v6, you can use native Leaflet popups with UTFGrid interactivity:

The interaction control lets you do whatever you want with the interactivity
it provides - see [the documentation on tooltips and its API for the full story.](/wax/tooltips.html)

This is an example of using native [Leaflet](http://leaflet.cloudmade.com/) popups with
a [MapBox](http://mapbox.com/) map - when you get an `on` event that looks like a
click, create a [Leaflet popup](http://leaflet.cloudmade.com/reference.html#popup).

<div class='demo-map' id='map-div'></div>

<pre class='prettyprint'>
&lt;html&gt;
&lt;head&gt;
  &lt;script src='wax/ext/leaflet.js' type='text/javascript'&gt;&lt;/script&gt;
  &lt;script src='wax/dist/wax.leaf.js' type='text/javascript'&gt;&lt;/script&gt;
  &lt;link href='wax/ext/leaflet.css' rel='stylesheet' type='text/css' /&gt;
&lt;/head&gt;
&lt;body&gt;
  &lt;div id='map-div'&gt;&lt;/div&gt;
&lt;/body&gt;
</pre>

<pre class='prettyprint live'>
wax.tilejson('http://api.tiles.mapbox.com/v3/mapbox.geography-class.jsonp',
  function(tilejson) {
  var map = new L.Map('map-div')
    .addLayer(new wax.leaf.connector(tilejson))
    .setView(new L.LatLng(51.505, -0.09), 1);
  wax.leaf.interaction()
    .map(map)
    .tilejson(tilejson)
    .on('on', function(o) {
        if (o.e.type !== 'mousemove') {
            // create a marker in the given location and add it to the map
            var marker = new L.Marker(map.mouseEventToLatLng(o.e));
            map.addLayer(marker);

            // attach a given HTML content to the marker and immediately open it
            marker.bindPopup(o.formatter({ format: 'teaser' }, o.data)).openPopup();
        }
    });
});
</pre>
