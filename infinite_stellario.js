(function() {
  var watchScroll = function() {
    var pxUntilScroll = Math.max(window.innerHeight * 3, 500);
    if($('#canvas').height() - window.pageYOffset > pxUntilScroll) {
      getNext();
    }
  };
  var getNext = function() {
    var nextPage = $('#pagination a').first().attr('href');
  };
  
  $(window).bind('scroll', watchScroll);
})();
