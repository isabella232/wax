---
title: Tooltips
tags: parts
layout: control
---

[There is also full interaction API documentation!](/wax/interactionapi.html)

You'll notice that Wax's tooltips are a bit different than some other
mapping libraries, and indeed have changed since earlier versions of Wax.

Wax uses tooltips in combination with its **interaction** controls, which
are available for [Modest Maps](/wax/interaction-mm.html),
[Leaflet](/wax/interaction-leaf.html) and so on. When your cursor enters
a feature, a tooltip is displayed, when you leave the map, it goes away,
so on on and so forth.

With Wax v6, tooltips are really, really flexible. You create an interaction
control like

<pre class='prettyprint'>
wax.mm.interaction()
  .map(map)
  .tilejson(tilejson);
</pre>

The parts here are pretty clear: `.map(map)` assigns the map: in this case,
since you're using `wax.mm.interaction`, it'll be a Modest Maps map.
The `.tilejson(tilejson)` call assigns the interaction control to a certain
chunk of [TileJSON](https://github.com/mapbox/TileJSON), which defines
where it should grab [UTFGrid](http://mapbox.com/mbtiles-spec/utfgrid/)
data, and how it can format the information you look at.

But this doesn't automatically add tooltips: for that, you'll need
something like

<pre class='prettyprint'>
wax.mm.interaction()
  .map(map)
  .tilejson(tilejson)
  .on(wax.tooltip().animate(true).parent(map.parent).events());
</pre>

Things got a little bit more complex: let's see how it works:
this calls the `.on()` function with this argument - tooltips.

<pre class='prettyprint'>
wax.tooltip() // make a tooltip
  .animate(true) // animate the tooltip fading out with CSS3
  .parent(map.parent) // put the tooltip within the map div
  .events() // get the tooltip's events
</pre>

Using `.events()` is important: this returns an object like

<pre class='prettyprint'>
return {
  on: tooltip.on,
  off: tooltip.off
};
</pre>

What's useful about this is that you can put other things in the
argument of `.on`, and do it in simpler ways:

<div class='demo-map' id='map-interact'></div>

<pre class='prettyprint live' class='demo-map'>
var url = 'http://api.tiles.mapbox.com/v3/tmcw.maze.jsonp';
wax.tilejson(url, function(tilejson) {
  var map = new MM.Map('map-interact', new wax.mm.connector(tilejson));
  map.setZoom(5);
  map.parent.style.borderBottom = '8px solid #000';
  wax.mm.interaction()
    .map(map)
    .tilejson(tilejson)
    .on({
      on: function() {
        map.parent.style.borderColor = '#81ff47';
      },
      off: function() {
        map.parent.style.borderColor = '#000';
      }
    });
});
</pre>

Here we have an example of on and off events triggering some changes in
the page. Also take note that you can attach **multiple functions** to these
events, to do multiple things on page, and if you want to remove a function,
you can:

<pre class='prettyprint'>
interaction.off('on'); // remove all click/hover handlers
interaction.off('on', myHandler); // remove just your own handler
</pre>

The `on` and `off` functions also get an argument that's very useful:

<pre class='prettyprint'>
{
  parent: parentDiv,
  data: rawFeatureData,
  formatter: formatterfunction,
  e: originalMouseEvent
}
</pre>


