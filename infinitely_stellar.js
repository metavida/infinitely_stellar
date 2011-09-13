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
    
    // Only try to paginate if there's a "Next >" button.
    if(nextPageEl.size() > 0) {
      // If there is no "infinite" stats data set on the "Next" button
      // that means we haven't requested the next page worth of data yet.
      if(typeof(nextPageStatus) == 'undefined') {
        nextPageEl.data('infinite', 'loading');
        $('#pagination .paging').addClass('infinite_loading');
        // Get that next page worth of data!
        $.ajax({
          url: nextPageEl.attr('href'), 
          dataType: 'html',
          success: function(gottenHtml) {
            try {
              placeHolder.html(gottenHtml);
              // Get the main content of the next page, but remove elements
              // like the header, etc. that we don't want to repeat.
              var nextContentEls = placeHolder.find('#main').children().
                not('#nav').not('[id^=entity-nav]').not('.notify-top');
              // Only append the content if the next page appears to not be empty.
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
      }
    }
  };
  
  $(window).bind('scroll', watchScroll);
})