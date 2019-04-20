---
title: HTML Sanitization
tags: parts
layout: control
---

Part of what Wax does is it shows you legends, tooltips, and attribution
as HTML. This content is actually stored on a separate server, like
[MapBox Hosting](http://mapbox.com/tour/) - a server you trust but
from a potentially untrusted user.

Thus Wax does some common-sense protection to keep harmful code
from crossing website boundaries. So Wax includes [the html-sanitizer from Google's Caja project](http://code.google.com/p/google-caja/wiki/JsHtmlSanitizer)
and sanitizes potentially dangerous tags in tooltips, attribution,
and legends. This means that images that are not `http://` references
or `data:` urls are censored; as are `script` tags and iframes.

Sanitization is done on the template-level with
[template.js](https://github.com/mapbox/wax/blob/master/control/lib/template.js)
and the `html_sanitize` function.
