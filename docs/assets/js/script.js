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

  function showWeather(date, weather, temperature, por) {
    document.querySelector('.' + date +     '.weather').textContent += weather.toString();
    document.querySelector('.' + date + '.temperature').innerHTML   += temperature.toString() + '&deg;C';
    document.querySelector('.' + date +         '.por').textContent += por.toString() + '%';
  }

  // Get weather information
  $.ajax({
    type: 'get',
    url: '/weather',
  }).done(function(data) {
    // var data = {"today": {"weather": "晴れ", "temperature": "19", "por": "12"}, "tomorrow": {"weather": "曇り", "temperature": "20", "por": "55"}};
    Object.keys(data).forEach(function(key) {
      showWeather(key, data[key]['weather'], data[key]['temperature'], data[key]['por']);
    });
  }).fail(function(data) {
    console.log(data);
  });

})();
