"use strict";

var vinyl = document.querySelector('.disk');
var playing = false;
var grabbing = false;
var moving = false;
var options = {
  touchMode: 'wheel',
  minDegree: 0
};

vinyl.onmousedown = function () {
  grabbing = true; // console.log('mousedown');

  if (grabbing == true) {
    rotation.pause();

    vinyl.onmousemove = function () {
      // playing = false;
      moving = true; // needs refinement; too sensitivy(!)
      // console.log('mousemove');

      /* grab & rotate function */

      if (moving == true) {
        vinyl.onmouseup = function () {
          // console.log('mousemove > mouseup');
          if (playing == true) {
            rotation.play();
          } else if (playing == false) {
            rotation.pause();
          }

          grabbing = false;
          moving = false; // return console.log('mousemove > grabbing = false')
        };
      }
    };

    vinyl.onmouseup = function () {
      // console.log('mousedown > mouseup');
      if (playing == false) {
        playing = true;
        rotation.play();
      } else if (playing == true) {
        playing = false;
        rotation.pause();
      }

      grabbing = false; // return console.log('mouseup > grabbing = false')
    };
  }
};

var rotation = anime({
  targets: '.disk',
  autoplay: false,
  loop: true,
  rotate: {
    easing: 'linear',
    duration: 1800,
    value: 360
  }
});