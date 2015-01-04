;(function (window) {
  'use strict';

  if (typeof(colorsocks) === 'undefined')
    window.colorsocks = {
      paint: function(elementId, colorsArray, text) {
        if (typeof(elementId) !== 'undefined' && colorsArray.length) {

          if (typeof(text) === 'undefined')
            text = document.getElementById(elementId).innerText || document.getElementById(elementId).textContent;

          var s = '';
          for (var i = 0; i < text.length; i++)
            s += '<span style="color:' + colorsArray[(i % colorsArray.length)] + ';">' + text[i] + '</span>';

          document.getElementById(elementId).innerHTML = s;
        }
      }
    };
})(window);