---
title: How to Make Wax
tags: Documentation
layout: control
---

**Wax makes typical maps a lot easier to make.** So, it provides zoom controls
and other stuff that people already expect, and it has a lot of code that
hooks up with [TileStream](http://mapbox.com/tilestream).

But that's not everything - _there are crazier, potentially interesting things
that Wax doesn't do_, and that you might want to do. Thus, this is a document
about writing stuff like Wax. It's really not that hard to do, this is just about
trying to guarantee that it goes well.

What makes Wax Wax:

## Dependencies

Minimize dependencies. When tempted to include a library like
[jQuery](http://jquery.org), think hard about whether you actually need it:
operations like setting style attributes of elements, adding classes,
binding events, and lots more you can do with minimal library intervention.

This isn't about jQuery's size, nor a judgment of its capabilities. It's about
the fact that, when writing a library, you shouldn't make judgments about
a user's choice of other libraries, and you should try to maintain an absolute
minimum of shipping code.

## Code Quality

There are plenty of tools out there to catch errors more quickly. Use them.
Use these tools, at least.

* [uglify-js](https://github.com/mishoo/UglifyJS) Takes input files, creates
  a super-compacted output file, and in the process
  it finds lots of syntax errors early.

* [jshint](https://github.com/jshint/node-jshint): Takes input files,
  yells at you for writing dangerous, incorrect, or unstable
  code.

* [jasmine](http://pivotal.github.com/jasmine/): You write tests that make
  sure your code does things in reaction to user
  interaction, and you can run them in a lot of browsers to make sure they work,
  always.

## Keeping to Yourself

**Libraries should have as little footprint as possible,
regardless of how much they do.** So, all Wax controls look like:
`wax.library.controlname()`: library might be something like `mm`, and
`controlname` might be `zoomer` or `interaction`. This is because each
control file starts out with

{% highlight js %}
var wax = wax || {};
wax.mm = wax.mm || {};
{% endhighlight %}

So, this just sets up the object that contains all wax objects, and
then the object that contains all of the controls for a certain mapping API.

And then inside of a control it looks like

{% highlight js %}
wax.mm.zoomer = function(map) {
    // Create elements as soon as an instance of this control is made, though
    // they won't be appended to anything until `appendTo(element)` is called.
    var zoomin = document.createElement('a');
    zoomin.innerHTML = '+';
    zoomin.href = '#';

    ....
{% endhighlight %}

Never ever declare a variable without `var` inside of this
function, because it'll 'leak' to the global space.

## Packaging

Packaging of client-side Javascript libraries is not a solved problem. But
there are a few things that we should do, for sure.

### Distributions

Deliver distributions, that have all relevant code for a certain feature.
For instance, Wax has a distribution for each mapping API that it supports,
with names like

* `wax.mm.js`
* `wax.mm.min.js`

The `min` version is baked using uglify-js (see above).

### package.json

Provide a `package.json` file [like CommonJS](http://www.commonjs.org/)
or at least like [npm wants](https://github.com/isaacs/npm/blob/master/doc/json.md).
This lets advanced users developing apps with [nodejs](http://nodejs.org) pull in
your project nicely and with versions. If you really want to level up,
publish the package to npm.

## Documentation

**Documentation can and should be as high a priority as coding.** Author
documentation for-real. Here's the Wax style:

* branch for `gh-pages` and wipe out your source tree.
* use [jekyll](http://jekyllrb.com) to manage your documentation
* tag documentation pages with compatibilities
* when documentating Javascript with examples, include the necessary
  HTML bootstrap in the example code.
* documentation pages should have the form:
  * title
  * abstract
  * example
  * api
