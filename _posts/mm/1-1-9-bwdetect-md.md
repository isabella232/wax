---
title: Bandwidth Detection
tags: ModestMaps touch
layout: control
---

This control adapts maps to low-bandwidth conditions. By default, it requests
a test tile to determine speed, but accepts options that allow you to subsitute
your own detection method. This method only works on **composited tiles** - that is,
combinations of tilesets with the characteristic `,` between their tileset
names.

## Example

<div class='live'>
{% highlight html %}
<div id='map-div'></div>
<a href='#' id='trigger-low'>low quality</a>
<a href='#' id='trigger-high'>high quality</a>
<script>
var url = 'http://api.tiles.mapbox.com/v3/mapbox.blue-marble-topo-jul.jsonp';

wax.tilejson(url, function(tilejson) {
    var m = new MM.Map('map-div',
      new wax.mm.connector(tilejson), null,
      [new MM.MouseHandler(), new MM.TouchHandler()]);
    var bw = wax.mm.bwdetect(m, {
      png: '.png32'
    });
    document.getElementById('trigger-low').onclick = function() {
      bw.bw(0); return false;
    };
    document.getElementById('trigger-high').onclick = function() {
      bw.bw(1); return false;
    };
    m.setCenterZoom({ lat: 39, lon: -98 }), 2);
});
</script>
{% endhighlight %}
</div>

## API

<dl>
  <dt>{% highlight js %}bwdetect = wax.mm.bwdetect(map, options{% endhighlight %}</dt>
  <dd>Creates a new bandwidth detection object. Takes an options argument with the options:
    <dl>
      <dt>auto</dt><dd>default true, if false the control will not test bandwidth</dd>
      <dt>jpg</dt> <dd>the low-quality version of JPEG files. Default `.jpg70`.</dd>
      <dt>png</dt> <dd>the low-quality version of PNG files. Default `.png128`.</dd>
    </dl>
  </dd>
  <dt>{% highlight js %}bwdetect.bw(0 or 1){% endhighlight %}</dt>
  <dd>Manually set the bandwidth level: 1 is for high-bandwidth / original quality,
  0 is for low-bandwidth / degraded quality.</dd>
</dl>
