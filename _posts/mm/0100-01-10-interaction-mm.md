---
title: Interaction
tags: ModestMaps Touch
layout: control
---

You can add über-fast interactivity to maps made with
[TileMill](https://tilemill.com/).

<div class='demo-map' id='map-div'></div>

The interaction control lets you do whatever you want with the interactivity
it provides - see [the documentation on tooltips and its API for the full story.](/wax/tooltips.html)

<pre class='prettyprint live'>
var url = 'https://api.tiles.mapbox.com/v3/mapbox.geography-class.jsonp';
wax.tilejson(url, function(tilejson) {
    var map = new MM.Map('map-div', new wax.mm.connector(tilejson));

    wax.mm.interaction()
      .map(map)
      .tilejson(tilejson)
      .on(wax.tooltip().animate(true).parent(map.parent).events());

    map.setCenterZoom({ lat: 39, lon: -98 }, 1);
  }
);
</pre>
