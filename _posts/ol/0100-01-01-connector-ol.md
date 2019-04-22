---
title: Connector
tags: OpenLayers
layout: control-ol
---

<div id='map-div' class='demo-map'></div>

<pre class='prettyprint live'>
wax.tilejson('https://c.tiles.mapbox.com/v3/examples.map-vyofok3q.jsonp',
function(tilejson) {
    var map = new OpenLayers.Map({
        div: 'map-div',
        controls: [
            new OpenLayers.Control.Navigation(),
            new OpenLayers.Control.Attribution()
        ],
        layers: [
            wax.ol.connector(tilejson)
        ]
    });
    map.zoomTo(3);
});
</pre>

## API

<dl>
  <dt>{% highlight js %}var layer = new wax.ol.connector(tilejson){% endhighlight %}</dt>
  <dd>
    Returns a new <code>OpenLayers.Layer.XYZ</code> object, configured per TileJSON snippet.
  </dd>
</dl>

