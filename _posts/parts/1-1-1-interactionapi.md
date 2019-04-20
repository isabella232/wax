---
title: Interaction API
tags: parts
layout: control
---

This is the API of the generalized interaction function
that Wax provides - it is what all specific implementations, like
`wax.mm.interaction()`, return, but they have specializations
to interact correctly with specific Javascript mapping frameworks.

Some of the functions in the interaction are getter/setter methods.
What this means is that if you call them with an argument, they will
_set_ an internal variable to the argument, and if you call them
without an argument, they will return the internal variable.

#### `interaction.tilejson(tilejson)`

Set the TileJSON chunk for this interaction control. Internally,
the code cares about the `template`, `formatter`, `grids`,
and `resolution` properties of that object.

It prefers `template` over `formatter` - if both are specified,
interaction will use the `template` to provide tooltip content.

This is a getter/setter function. Without an argument, it will
return the current TileJSON object bound to this interaction
control.

#### `interaction.remove()`

Make an interaction control forget about the map that it
was attached to. This unbinds all of its listeners and
returns the interaction element.

## Internals

These parts are documented for your edification but
are not friendly or really necessary for everyday hacking.

#### `interaction.map(map)`

Set the map that this interaction control is attached to.
This binds the events that it looks for, and calls the `attach`
function that further binds interaction to maps.

#### `interaction.grid(grid)`

This is a getter/setter function.

A grid getter is a function that, when called, returns
an array of the form `[ [ x, y, tileElement], [ x1, y1, tileElement1 ] ]`
for _screen_ coordinates of tiles and their elements. Tile access
is the common element of the various interaction implementations,
and as such the grid function varies. Usually it has access to
the map element by means of closure.

#### `interaction.attach(attachfn)`

This is a getter/setter function.

The function provided is called every time that the map
is 'attached' - when a map is assigned to this interaction control.
In generally, the function you provide will look for move,
zoom, pan events and will tell any kind of caching in the
`grid` function to flush or invalidate the cache.

#### `interaction.screen_feature(pos, callback)`

In which `pos` is a position like `{ x: 100, y: 100 }`,
this grabs a screen feature and calls the `callback` function
with either the feature grabbed or `null` if no feature was
there.

#### `interaction.click(e, pos)`

In which `pos` is a position like in `interaction.screen_feature`
and `e` is an event object, which you should make `{}` or add
as much object data as you want. Allows you to trigger any
`.on()` handlers you've attached to this interaction control.
