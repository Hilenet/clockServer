(function() {
  'use strict';

  var time = moment();
  var hour;
  var minute;
  var second;

  informMessage();
  showClock();

  function showClock() {
    tick();
    document.querySelector('#clock').textContent = prepareFormat(hour) + ':' + prepareFormat(minute) + ':' + prepareFormat(second);
    var tickTimer = setTimeout(function() {
      showClock();
    }, 1000);
  }

  function informMessage() {
    var adjustAmount = 60 * 1000;
    adjustTime();
    var adjustMessage = document.createElement('span');
    adjustMessage.id = 'msg';
    adjustMessage.textContent = 'update';
    var body = document.querySelector('body');
    body.insertBefore(adjustMessage, body.firstChild);
    var removeMessage = setTimeout(function() {
      body.removeChild(adjustMessage);
    }, 2000);
    var adjustTimer = setTimeout(function() {
      informMessage();
    }, adjustAmount);
  }

  function adjustTime() {
    time   = moment();
    hour   = time.hours();
    minute = time.minutes();
    second = time.seconds();
  }

  function tick() {
    time   = time.add(1, 'seconds');
    hour   = time.hours();
    minute = time.minutes();
    second = time.seconds();
  }

  function prepareFormat(str) {
    str = str.toString();
    str = ('0' + str).slice(-2);
    return str;
  }

})();
