---
title: location
tags: parts
layout: control
---

`wax.location()` lets you use the location formatter specified in
the [utfgrid-spec](https://github.com/mapbox/utfgrid-spec) with any
interaction control.

It works just like tooltips and you can use it alongside any other kind
of tooltip by just calling `.on` multiple times. When you click a feature
that has the location formatter enabled, the page's URL will be set by
`window.location.href = new_location`.

<pre class='prettyprint'>
wax.tilejson('http://d.tiles.mapbox.com/v3/mapbox.world-blank-bright,' +
  'usaid-horn.hoa-foodsecurity-sept-update-20110908_,hiu.lsib-dark-labelled,' +
  'usaid-horn.hoa-somalia-population-sept6,usaid-horn.refugees-points2.jsonp',
  function(tilejson) {
  map = new MM.Map('demo-movetip', new wax.mm.connector(tilejson));
  map.setCenterZoom(new MM.Location(4.562, 41.632), 6);
  wax.mm.interaction()
      .map(map)
      .tilejson(tilejson)
      .on(wax.tooltip().parent(map.parent).events())
      .on(wax.location().events());
});
</pre>
