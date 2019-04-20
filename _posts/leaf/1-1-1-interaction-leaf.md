---
title: Interaction
tags: Leaflet touch
layout: control
---

You can add über-fast interactivity to maps made with
[TileMill](http://tilemill.com/).

The interaction control lets you do whatever you want with the interactivity
it provides - see [the documentation on tooltips and its API for the full story.](/wax/tooltips.html)

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
    .on(wax.tooltip().animate(true).parent(map._container).events());
});
</pre>
