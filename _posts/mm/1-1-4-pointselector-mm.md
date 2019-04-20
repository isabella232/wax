---
title: Point Selector
tags: ModestMaps
layout: control
---

A control that enables users to add points to a map by clicking the map, and
then clicking those points to remove them. Like the boxselector control, it
calls a callback with the current map data, and also exposes an API,
`addLocation(com.modestmaps.Location)`, if you wish to add points on pageload.

## Example

<div class='live'>
{% highlight html %}
<div id='map-div'></div>
<div id='pointselector-text'></div>
<script>
var mm = com.modestmaps;
wax.tilejson(
  'http://api.tiles.mapbox.com/v3/mapbox.blue-marble-topo-bathy-jul.jsonp',
  function(tilejson) {
    var m = new mm.Map('map-div',
      new wax.mm.connector(tilejson))

    wax.mm.pointselector(m, tilejson, {
      callback: function(coords) {
        $('#pointselector-text').text(coords.join(' - '));
      }
    });

    m.setCenterZoom(new mm.Location(39, -98), 2);
  }
);
</script>
{% endhighlight %}
</div>

## API

<dl>
  <dt>{% highlight js %}var pointselector = wax.mm.pointselector(map, tilejson, options){% endhighlight %}</dt>
  <dd>Create a new pointselector object. The tilejson argument is ignored. Options
  is an object with options:
  <dl>
    <dt>callback</dt>
    <dd>A function that will be called with a single argument
    <code>coords</code>, containing a list of coordinates of
    points that you've selected.
    </dd>
  </dl>
  <dt>{% highlight js %}pointselector.addLocation(com.modestmaps.Location){% endhighlight %}</dt>
  <dd>Add a new location (latitude/longitude), redraw the map, and call callback
  with the new locations list. Useful for pre-populating point-selecting maps
  on page load</dd>
  <dt>{% highlight js %}pointselector.deleteLocation(location){% endhighlight %}</dt>
  <dd>Delete a location from the internal locations list. This is mainly an internal
  API and requires that the location passed is not just a com.modestmaps.Location,
  but the actual location object in the internal location object.
  <strong>Changed in 3.0.7: was deletePoint() before.</strong></dd>
  <dt>{% highlight js %}pointseletor.remove(map){% endhighlight %}</dt>
  <dd>Unbind the pointselector from the map and remove all of its points and events.</dd>
  <dt>{% highlight js %}pointselector.locations(){% endhighlight %}</dt>
  <dd>An accessor method for the pointselector's array of locations.</dd>
</dl>
