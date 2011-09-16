var $;

function GM_wait(callback) {
  if (typeof unsafeWindow.jQuery == 'undefined') {
    window.setTimeout(GM_wait, 100);
  } else {
    $ = unsafeWindow.jQuery;
    callback();
  }
}

GM_wait(