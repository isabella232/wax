// Application bootstrap.
$.domReady(function() {
    $('<div class="demo"></div>')
        .insertAfter('div.live')
        .html($('div.live').text())
        .map(function(elem) { console.log(elem); eval($('script', elem[0]).text()); });
});
