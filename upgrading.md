---
layout: default
title: Upgrading from Earlier Version
---

Wax has changed - it's now at version 6. The API was the same
from version 4 to 5 - though they had an upgrade in the
[Modest Maps](http://modestmaps.com/) dependency.

It changes at 6. Here's a rundown:

## Interaction

Interaction and tooltip functionality is more flexible. While tooltips used to:

<pre class='prettyprint'>
wax.mm.interaction(map, tilejson);
</pre>

It is now:

<pre class='prettyprint'>
wax.mm.interaction().map(map).tilejson(tilejson)
    .on(wax.tooltip().parent(map.parent).events());
</pre>

More code, but for a good reason: it's much more flexible. If your map layers change,
and you have a new [TileJSON](https://github.com/mapbox/TileJSON) object
that describes how their interaction works, you can simply call

<pre class='prettyprint'>
existingInteractionObject.tilejson(newTileJson);
</pre>

And the same with `.map()`. The tooltip API is also much more powerful and accessible -
see [the page on tooltips](/wax/tooltips.html) for more details.

## Modest Maps 1

Wax v6 is compatible with, and embraces the first major release of [Modest Maps](http://modestmaps.com/).
The big change in the new version is that Modest Maps now supports
_multiple layers_. For the most part, you can use it just like before, but one
common thing that you do with a map is replacing the main layer - and that has changed.

Previously,

<pre class='prettyprint'>
map.setProvider(new wax.mm.connector(tilejson));
</pre>

Is now

<pre class='prettyprint'>
map.setLayerAt(0, new wax.mm.connector(tilejson));
</pre>

There's lots more documentation on [the new Layers Interface in the Modest Maps Wiki](https://github.com/stamen/modestmaps-js/wiki/Layers-and-Providers)
and also a page [on upgrading to 1.0.0 that covers other, smaller changes](https://github.com/stamen/modestmaps-js/wiki/Upgrading-to-1.0.0).
