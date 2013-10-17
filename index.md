---
layout: default
title: Wax
---

Good news, everyone! MapBox has introduced [MapBox.js v1](https://www.mapbox.com/mapbox.js/), which features
improved browser support, documentation, and access to a rich ecosystem of
[Leaflet](http://leafletjs.com/) plugins.

We'd highly recommend you use a current version of [MapBox.js](https://www.mapbox.com/mapbox.js/)
rather than Wax for all future projects, and consider porting your code!

<a class='big-download' href='https://github.com/mapbox/wax/zipball/v6.4.0'>↓ Download Wax 6.4.0
<span>BSD-licensed, ~16KB</span>
</a>

Already using Wax, and need to upgrade? [Read the bit about upgrading](/wax/upgrading.html)

If you're just starting out, follow along and by the end, you'll be a
web-mapping pro.

<div id='intro-map' class='map-demo'></div>

<pre class='prettyprint'>
&lt;div id='intro-map'&gt;&lt;/div&gt;
</pre>
<pre class='prettyprint live'>
var url = 'http://api.tiles.mapbox.com/v3/mapbox.geography-class.jsonp';

wax.tilejson(url, function(tilejson) {
  var m = new MM.Map('intro-map',
    new wax.mm.connector(tilejson),
    new MM.Point(700,400));

  m.setCenterZoom(new MM.Location(tilejson.center[1],
    tilejson.center[0]),
    tilejson.center[2] - 3);

  wax.mm.zoomer(m).appendTo(m.parent);
  wax.mm.interaction()
    .map(m)
    .tilejson(tilejson)
    .on(wax.tooltip().animate(true).parent(m.parent).events());
});
</pre>

## Get Wax

To follow this quick tutorial, you'll need a copy of Wax: unlike Google Maps,
it's a Javascript library you copy to your server, so you have control over it.

If you just want to download the source code for Wax,
[get a zip file from GitHub](https://github.com/mapbox/wax/tags).
If you want to develop Wax, or keep it up to date more easily, [check out the
project from GitHub](https://github.com/mapbox/wax) with git.

See [Making Your First Map](#making-your-first-map) below for instructions on
how to include Wax in your project.

## A Quick Intro

Suppose you're making cool map designs with [TileMill](http://mapbox.com/tilemill/)
or you want to use maps from [MapBox Hosting](http://tiles.mapbox.com), and you want to
get famous by putting them somewhere online - your blog, a big CMS, or anywhere else.

Don't be afraid! It's not too hard to do, and once you've learned how to do it,
you'll have the power to make super-custom maps with minimal effort.

So your ingredients will be:

* A map server, like [TileStream](https://github.com/mapbox/tilestream) or
  [MapBox Hosting](http://tiles.mapbox.com). All of the examples you'll see
  here use MapBox Hosting, so you can copy & paste at will and it'll all work.
* A Javascript API, like [Modest Maps](https://github.com/stamen/modestmaps-js)
* Wax
* Your website

The mapping server serves up **tiles** of rendered data - tiles being 256 pixel
square images covering some of the world. Here's a tile of Europe from the
[World Light tileset](http://tiles.mapbox.com/mapbox/map/world-light).

![Europe](http://a.tiles.mapbox.com/v3/mapbox.world-light/2/2/1.png)

Of course, things will get a lot cooler than this: Wax lets you use your own
tiles, add zoom buttons, interaction, and a lot more. But it all starts out
with tiles.

<h2 id='making-your-first-map'>Making Your First Map</h2>

The first step is to download and include the necessary Javascript code to
make your map work. We'll also include a CSS file to start rolling with style:

- `wax/ext/modestmaps.min.js` contains the Modest Maps library.
- `wax/dist/wax.mm.js` contains the Wax controls and integration code for
  Modest Maps.
- `wax/theme/controls.css` contains default styles for controls. You can always
  swap in your own later on.

<pre class='prettyprint'>
&lt;html&gt;
  &lt;head&gt;
    &lt;script src='wax/ext/modestmaps.min.js' type='text/javascript'&gt;&lt;/script&gt;
    &lt;script src='wax/dist/wax.mm.js' type='text/javascript'&gt;&lt;/script&gt;
    &lt;link href='wax/theme/controls.css' rel='stylesheet' type='text/css' /&gt;
  ...
</pre>

Here's your first map! If you've downloaded Wax and add the code above into the
<code>&lt;head&gt;</code> of your page, then you can put the following code into the
<code>&lt;body&gt;</code> of your page, and you'll get a map! Go ahead and
drag around the little map below -
Modest Maps is making the tiles move when you click and drag.

<pre class='prettyprint'>
var url = 'http://api.tiles.mapbox.com/v3/mapbox.world-light.jsonp';
wax.tilejson(url, function(tilejson) {
    // Set up a map in a div with the id 'modestmaps-setup'
    var m = new MM.Map('modestmaps-setup',
      // Use Wax's connector to add a new custom layer
      new wax.mm.connector(tilejson),
      // And it'll be 240px by 120px
      new MM.Point(240,120));

    // Center it on the United States, at zoom level 2.
    m.setCenterZoom({ lat: 39, lon: -98 }, 2);
});
</pre>

Let's look at how that was done: the only thing on the page besides that
<code>&lt;script&gt;</code> tag and its code is a <code>&lt;div&gt;</code>
tag with the id `modestmaps-setup`. And, down below, you see the code

<pre class='prettify'>
var m = new MM.Map('modestmaps-setup' //
</pre>

So, you're telling Modest Maps, `MM`, to create a new map contained by
this div element. It then does the work of putting a lot of images on the page
and lining them up.

What's this `tilejson` variable?
[TileJSON](https://github.com/mapbox/tilejson) is a way of
describing the basic stuff about a map - where tiles are, how they're
named, and optionally a lot more, like available zoom levels and legends.

Down the line, TileJSON will make your life a lot easier by letting you
skip a lot of steps of configuring maps, but we'll explain it in detail first.

[Continue reading about TileJSON](/wax/tilejson.html).
