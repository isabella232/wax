wax = wax || {};
wax.mm = wax.mm || {};

// Point Selector
// --------------
//
// This takes an object of options:
//
// * `callback`: a function called with an array of `com.modestmaps.Location`
//   objects when the map is edited
//
// It also exposes a public API function: `addLocation`, which adds a point
// to the map as if added by the user.
wax.mm.pointselector = function(map, tilejson, opts) {
    // Set this to true if you want all of the boxselector functions to write to the 
    // console when they execute.
    var logFunctions = false;
    if (logFunctions) { console.log("pointselector.initializeing..."); }

    var mouseDownPoint = null,
        mouseUpPoint = null,
        tolerance = 5,
        overlayDiv,
        pointselector = {},
        locations = [];

    var callback = (typeof opts === 'function') ?
        opts :
        opts.callback;

    // Create a `com.modestmaps.Point` from a screen event, like a click.
    function makePoint(e) {
        if (logFunctions) { console.log("pointselector.makePoint..."); }

        var coords = wax.u.eventoffset(e);
        var point = new MM.Point(coords.x, coords.y);
        // correct for scrolled document

        // and for the document
        var body = {
            x: parseFloat(MM.getStyle(document.documentElement, 'margin-left')),
            y: parseFloat(MM.getStyle(document.documentElement, 'margin-top'))
        };

        if (!isNaN(body.x)) point.x -= body.x;
        if (!isNaN(body.y)) point.y -= body.y;

        // TODO: use wax.util.offset
        // correct for nested offsets in DOM
        for (var node = map.parent; node; node = node.offsetParent) {
            point.x -= node.offsetLeft;
            point.y -= node.offsetTop;
        }
        return point;
    }

    // Currently locations in this control contain circular references to elements.
    // These can't be JSON encoded, so here's a utility to clean the data that's
    // spit back.
    function cleanLocations(locations) {
        if (logFunctions) { console.log("pointselector.cleanlocations..."); }

        var o = [];
        for (var i = 0; i < locations.length; i++) {
            o.push(new MM.Location(locations[i].lat, locations[i].lon));
        }
        return o;
    }

    // Attach this control to a map by registering callbacks
    // and adding the overlay

    // Redraw the points when the map is moved, so that they stay in the
    // correct geographic locations.
    function drawPoints() {
        if (logFunctions) { console.log("pointselector.drawpoints..."); }

        var offset = new MM.Point(0, 0);
        for (var i = 0; i < locations.length; i++) {
            var point = map.locationPoint(locations[i]);
            if (!locations[i].pointDiv) {
                locations[i].pointDiv = document.createElement('div');
                locations[i].pointDiv.className = 'wax-point-div';
                locations[i].pointDiv.style.position = 'absolute';
                locations[i].pointDiv.style.display = 'block';
                // TODO: avoid circular reference
                locations[i].pointDiv.location = locations[i];
                // Create this closure once per point
                bean.add(locations[i].pointDiv, 'mouseup',
                    (function selectPointWrap(e) {
                    var l = locations[i];
                    return function(e) {
                        MM.removeEvent(map.parent, 'mouseup', mouseUp);
                        pointselector.deleteLocation(l, e);
                    };
                })());
                map.parent.appendChild(locations[i].pointDiv);
            }
            locations[i].pointDiv.style.left = point.x + 'px';
            locations[i].pointDiv.style.top = point.y + 'px';
        }
    }

    function mouseDown(e) {
        if (logFunctions) { console.log("pointselector.mouseDown..."); }

        mouseDownPoint = makePoint(e);
    }

    // Remove the awful circular reference from locations.
    // TODO: This function should be made unnecessary by not having it.
    function mouseUp(e) {
        if (logFunctions) { console.log("pointselector.mouseUp..."); }

        if (!mouseDownPoint) {
            // HACK1: If the mouseDown was not called (because the clicked inside of a 
            // boxselector box which cancelled event propagation), then use the global
            // copy of the click location as the mouseDownPoint. Search for "HACK1" in 
            // boxselector and pointselector for the rest of the story.
            if (globalMouseDownPoint) {
                mouseDownPoint = globalMouseDownPoint;
                globalMouseDownPoint = null;
            }
            else {
                return;
            }
        }
        mouseUpPoint = makePoint(e);
        if (MM.Point.distance(mouseDownPoint, mouseUpPoint) < tolerance) {
            pointselector.addLocation(map.pointLocation(mouseDownPoint));
            callback(cleanLocations(locations));
        }
        mouseDownPoint = null;
    }

    // API for programmatically adding points to the map - this
    // calls the callback for ever point added, so it can be symmetrical.
    // Useful for initializing the map when it's a part of a form.
    pointselector.addLocation = function(location) {
        if (logFunctions) { console.log("pointselector.addLocation..."); }

        locations.push(location);
        drawPoints();
        callback(cleanLocations(locations));
    };

    pointselector.locations = function(x) {
        return locations;
    };

    pointselector.add = function(map) {
        if (logFunctions) { console.log("pointselector.add..."); }

        bean.add(map.parent, 'mousedown', mouseDown);
        // HACK1: Adding mouseup handler here rather than in mousedown so that if 
        // mousedown is skipped due to boxselector cancelling event propagation, then 
        // mouseup will still be called. Search for "HACK1" in boxselector and 
        // pointselector for the rest of the story.
        bean.add(map.parent, 'mouseup', mouseUp);
        map.addCallback('drawn', drawPoints);
        return this;
    };

    pointselector.remove = function(map) {
        if (logFunctions) { console.log("pointselector.remove..."); }

        bean.remove(map.parent, 'mousedown', mouseDown);
        map.removeCallback('drawn', drawPoints);
        for (var i = locations.length - 1; i > -1; i--) {
            pointselector.deleteLocation(locations[i]);
        }
        return this;
    };

    pointselector.deleteLocation = function(location, e) {
        if (logFunctions) { console.log("pointselector.deleteLocation..."); }

        if (!e || confirm('Delete this point?')) {
            location.pointDiv.parentNode.removeChild(location.pointDiv);
            locations.splice(wax.u.indexOf(locations, location), 1);
            callback(cleanLocations(locations));
        }
    };

    return pointselector.add(map);
};
