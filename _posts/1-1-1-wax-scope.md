---
title: Scope and Limitations
tags: Documentation
layout: control
---

Wax is not a mapping API like Modest Maps or OpenLayers.
Neither is it a application-level
higher library like [GeoExt](http://www.geoext.org/) or even higher
like [gxp](https://github.com/opengeo/gxp). It's a library that adds
common utilities to minimal mapping libraries and aims to give developers
and designers ultimate control and flexibility.

Here are some of the principles of Wax:

* The library does not try to 'wrap' any API of any toolkit,
  like [Mapstraction](http://mapstraction.com/) tries to do.
* Wax doesn't add core mapping functionality, like vector display,
  that should be in the core of a mapping library.
* No dependencies are required beyond the API integrated
  against.
* All presentation is stored in `controls.css`, which is treated
  as a theme API and versioned.
* Most controls in Wax are written to interact with single-layer
  non-vector maps.
