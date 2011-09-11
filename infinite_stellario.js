(function() {
  var watchScroll = function() {
    var pxUntilScroll = Math.max(window.innerHeight * 3, 500);
    if($('#canvas').height() - window.pageYOffset < pxUntilScroll) {
      getNext();
    }
  };
  var placeHolder = $(document.createElement('div'));
  var getNext = function() {
    var nextPageEl = $('#pagination .paging a').first(),
      nextPageStatus = nextPageEl.data('infinite');
    
    if(nextPageEl.size() > 0) {
      switch(nextPageStatus + '') {
        case 'undefined':
          $.ajax({
            url: nextPageEl.attr('href'), 
            dataType: 'html',
            success: function(gottenHtml) {
              try {
                placeHolder.html(gottenHtml);
                var nextContentEls = placeHolder.find('#main').children().
                  not('#nav').not('#entity-nav-bk-lg').not('.notify-top');
                if(nextContentEls.size() > 3) {
                  $('#pagination').next().remove();
                  $('#pagination').after(nextContentEls).remove();
                  $('#main').find('.rule + .rule').remove();
                } else {
                  nextPageEl.data('infinite', 'done');
                }
              } catch(err) { nextPageEl.data('infinite', 'js-error: '+err.message); }
            },
            error: function(gottenHtml, err) {
              nextPageEl.data('infinite', 'http-error: '+err);
            }
          });
          nextPageEl.data('infinite', 'loading');
          break;
      }
    }
  };
  
  $(window).bind('scroll', watchScroll);
})();
