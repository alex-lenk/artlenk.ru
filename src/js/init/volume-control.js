'use strict';

var sheet = document.createElement('style');
sheet.type = 'text/css';
document.body.appendChild(sheet);

var state;

function go() {
  var res = '';
  state = state == 'running' ? 'paused' : 'running';
  var testimonials = document.querySelectorAll("#L1 rect");
  var an = function an(nY, nH, id, dur) {
    var st = state; // paused
    return '\n      #' + id + ' {\n       -webkit-animation: pic' + id + ' ' + dur + ' infinite linear;\n       -webkit-animation-play-state: ' + st + ';\n      }\n      @keyframes pic' + id + ' {\n        50% {\n          y: ' + nY + ';\n          height: ' + nH + 'px;\n        }\n      }\n    ';
  };
  var data = [{ nY: 23, nH: 20, dur: '1.2s' }, { nY: 8, nH: 50, dur: '1s' }, { nY: 17, nH: 32, dur: '1s' }, { nY: 6, nH: 54, dur: '1s' }, { nY: 0, nH: 66, dur: '1s' }, { nY: 9, nH: 48, dur: '1s' }, { nY: 21, nH: 24, dur: '1s' }];
  Array.prototype.forEach.call(testimonials, function (el, index) {
    if (data[index] != -1) {
      var d = data[index];
      console.log(el.getAttribute("id"));
      res += an(d.nY, d.nH, el.getAttribute("id"), d.dur);
    }
  });
  sheet.innerHTML = res;
}

go();

document.getElementById('volume-control').addEventListener("click", go, false);
