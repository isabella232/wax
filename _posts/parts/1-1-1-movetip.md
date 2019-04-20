---
title: movetip
tags: parts
layout: control
---

To demonstrate one of the other potentials for tooltips,
Wax includes `wax.movetip`, a tooltip that moves along with your
mouse. It's good for maps with large surfaces, or large maps where
a fixed tooltip wouldn't work with scanning the map quickly.

<div id='demo-movetip' class='demo-map'></div>

<pre class='prettyprint live'>
wax.tilejson('http://d.tiles.mapbox.com/v3/mapbox.world-blank-bright,' +
  'usaid-horn.hoa-foodsecurity-sept-update-20110908_,hiu.lsib-dark-labelled,' +
  'usaid-horn.hoa-somalia-population-sept6,usaid-horn.refugees-points2.jsonp',
  function(tilejson) {
  map = new MM.Map('demo-movetip', new wax.mm.connector(tilejson));
  map.setCenterZoom(new MM.Location(4.562, 41.632), 6);
  wax.mm.interaction()
      .map(map)
      .tilejson(tilejson)
      .on(wax.movetip().parent(map.parent).events());
});
</pre>
