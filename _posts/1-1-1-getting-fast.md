---
title: Getting Fast
tags: Documentation
layout: control
---

Maps need to be fast for people to want to use them. But they're often slow.
There's no secret ingredient to speed, but here are some hints.

## Initial Download Time

The first time that a user hits a page with a map on it, all of the code that
runs that map is downloaded. This is the 'initial load' - and it can range from
insubstantial to severe, especially with limited bandwidth caused by mobile
connections, weak uplinks, and other page content.

The only real way to kill a page with a mapping API is to load an uncompressed,
full version of the OpenLayers library onto it. Unfortunately, this is
very common. Never use the full build of OpenLayers, which includes support
for archaic mapping APIs and can weigh near 1MB. Either use lightweight
frameworks ([Modest Maps](http://github.com/stamen/modestmaps-js) is ~32K)
or use custom, slim builds of OpenLayers. Always send your Javascript with
gzip compression enabled on your webserver.

## Tile Downloads

Tile download time is a relationship between client performance and server
performance. Fast tile servers like [TileStream](http://mapbox.com/tilestream),
[GeoWebCache](http://geowebcache.org/), `mod_tile`, and others are performant
when properly configured. As a rule of thumb, unless you have very lightweight
data or very performant servers, cache tiles and send cached versions. Dynamic
tile generation is performance-intensive and always slower than serving
cached data.

Client performance is usually a nonfactor, but can play a role in that many
browsers have a [per-domain request limit](http://ds.io/qaFyXF) -
especially IE, which limits per-domain connections to 2. This means only
2 tiles can be downloaded at a time from a single domain in IE. Thus,
use multiple domains - multiple `CNAMES` to be specific, in most cases,
and nearly all mapping frameworks have some syntax for hitting multiple
domains, either by providing an array instead of a single tile location,
or by having a wildcard in the location string.

## Panning and Interacting with the Map

Panning performance can be optimized in some ways - Modest Maps, Leaflet,
and some of the more modern toolkits are starting to use CSS transforms
and other black magic to push this performance even more.

But the main thing that makes maps slow is **complexity**. This is why
we recommend the use of [compositing](http://ds.io/oDZIMx ) instead of stacking
tiles in your browser - not only do 7 layers in OpenLayers require 7 times
as many tile requests, they also require you to reposition 7 times more elements
every time the map moves a pixel. Simplify this and map interaction is much faster.
[node-blend](http://ds.io/oga1de) and [TileStache](http://ds.io/nzqvqO)
are great open-source (BSD) tools for compositing.

Much the same goes for interaction - actual vectors in-browser are a
common cause of slow maps - both as far as map loading and interaction.
[UTFGrid](http://ds.io/nH1vCM) rasterizes interaction
data to sidestep this, so that your browser never deals with vectors or vector
rendering directly.
