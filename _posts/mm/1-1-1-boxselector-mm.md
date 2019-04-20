---
title: Box Selector
tags: ModestMaps
layout: control
---

A control that enables users to select a bounds on a map by holding the shift
key and dragging on a map. It's useful for stuff like selecting areas to
render in [TileMill](http://mapbox.com/tilemill) or areas to download for
offline use.

## Example

<div id='map-div'></div>

<pre class='prettyprint live'>
var url = 'http://api.tiles.mapbox.com/v3/mapbox.blue-marble-topo-bathy-jul.jsonp';
wax.tilejson(url, function(tilejson) {
    var m = new MM.Map('map-div',
      new wax.mm.connector(tilejson));
    wax.mm.boxselector(m, tilejson, {
      callback: function(coords) {
        $('#boxselector-text').text(
          coords.map(function(c) {
            return c.lat + ',' + c.lon;
          }).join(' - '));
      }
    });
    m.setCenterZoom({ lat: 39, lon: -98 }, 2);
});
</pre>

## API

<dl>
  <dt>{% highlight js %}var boxselector = wax.mm.boxselector(map, options or callback){% endhighlight %}</dt>
  <dd>Create a new boxselector object. The second argument can be either an
  options object with a 'callback' member for a callback function, or just
  a callback function. Options is an object with options:
  <dl>
    <dt>callback</dt>
    <dd>A function that will be called with a single argument
    <code>coords</code>, containing the extent of a selection, as represented
    by an array with two elements of type com.modestmaps.Location.
    </dd>
  </dl>
  <dt>{% highlight js %}var extent = boxselector.extent(){% endhighlight %}</dt>
  <dd>Get the current extent of the boxselector control, in the same form
  as would be passed to the callback.</dd>
  <dt>{% highlight js %}boxselector.extent([com.modestmaps.Location, com.modestmaps.Location], [silent]){% endhighlight %}</dt>
  <dd>Set the extent of the boxselector with a two-element array of
  `com.modestmaps.Location`. The boxselector control will internally fix
  their order to be top-left, bottom-right, if they are unordered.<br />
  Since Wax 3.0.7, this control also accepts a `silent` option - which if
  true means that boxselector's callback will not be called upon this
  setting of the extent.
  </dd>
</dl>
