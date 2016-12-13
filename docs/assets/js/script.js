(function() {
  'use strict';

  function show() {
    var hour   = new Date().getHours();
    var minute = new Date().getMinutes();
    var second = new Date().getSeconds();
    document.querySelector('#clock').textContent = prepareFormat(hour) + ':' + prepareFormat(minute) + ':' + prepareFormat(second);
    var timer = setTimeout(function() {
      show();
    }, 200);
  }
  show();

  function prepareFormat(str) {
    str = str.toString();
    str = ('0' + str).slice(-2);
    return str;
  }

})();
