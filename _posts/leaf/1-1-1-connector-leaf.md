---
title: Connector
tags: Leaflet
layout: control
---

The Leaflet connector lets you quickly configure a MapBox map with
[Leaflet](http://leaflet.cloudmade.com). You can also configure layers
with the [TileLayer](http://leaflet.cloudmade.com/reference.html#tilelayer) class,
but using the connector also automatically configures attribution,
zoom levels, and tile URLs.

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
});
</pre>

## API

<dl>
  <dt>{% highlight js %}var layer = new wax.leaf.connector(tilejson){% endhighlight %}</dt>
  <dd>
    Returns a new <code>L.TileLayer</code> object.
  </dd>
</dl>
