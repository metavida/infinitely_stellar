(function() {
  var watchScroll = function() {
    var pxUntilScroll = Math.max(window.innerHeight * 3, 500);
    if($('#canvas').height() - window.pageYOffset < pxUntilScroll) {
      getNext();
    }
  };
  var placeHolder = $(document.createElement('div'));
  var getNext = function() {
    var nextPageEl = $('#pagination a').first(),
      nextPageStatus = nextPageEl.data('infinite');
    
    switch(nextPageStatus + '') {
      case 'undefined':
        placeHolder.load(nextPageEl.attr('href'), function() {
          nextPageEl.data('infinite', 'success');
        });
        nextPageEl.data('infinite', 'loading');
        break;
    }
  };
  
  $(window).bind('scroll', watchScroll);
})();
