"use strict";

var vinyl = document.querySelector('.disk');
var vinylAngle = 0;
var playing = false;
var grabbing = false;
var moving = false;
var seconds = 0;
var update = 0;
var loopCount = 0;

function getTransformRotate(vinyl) {
  var vinylStyle = window.getComputedStyle(vinyl, null);
  var transformRotate = vinylStyle.getPropertyValue('transform');
  var matrixValues = transformRotate.split('(')[1];
  matrixValues = matrixValues.split(')')[0];
  matrixValues = matrixValues.split(',');
  var matrix = {
    a: matrixValues[0],
    b: matrixValues[1],
    c: matrixValues[2],
    d: matrixValues[3]
  };
  var radians = Math.atan2(matrix.b, matrix.a);
  if (radians < 0) radians += 2 * Math.PI;
  vinylAngle = Math.round(radians * (180 / Math.PI));
  vinyl.style.transform = "rotate(".concat(vinylAngle, "deg)");
  return vinylAngle;
}

;

vinyl.onmousedown = function () {
  getTransformRotate(vinyl);
  grabbing = true; // console.log('mousedown');

  if (grabbing == true) {
    rotation.pause();

    vinyl.onmousemove = function () {
      moving = true; // needs refinement; too sensitivy(!)
      // console.log('mousemove');

      grabRotate();

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

          getTransformRotate(vinyl);
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

      getTransformRotate(vinyl);
    };
  }
};

var rotation = anime({
  targets: '.disk',
  autoplay: false,
  loop: true,
  from: vinylAngle,
  rotate: {
    easing: 'linear',
    duration: 1800,
    value: 360
  },
  change: function change() {
    seconds += 0.01765; // needs refinement; too sensitivy(!)

    update++; // 1 loop = ~106 changes
  },
  loopBegin: function loopBegin() {
    loopCount++;
  }
});

function grabRotate() {
  var init,
      rotate,
      start,
      stop,
      active = false,
      angle = 0,
      rotations = 0,
      startAngle = 0,
      center = {
    x: 0,
    y: 0
  },
      radiansToDegrees = 180 / Math.PI;

  init = function init() {
    vinyl.addEventListener('mousedown', start, false);
    $(document).bind('mousemove', function (event) {
      if (active == true) {
        event.preventDefault();
        rotate(event);
      }
    });
    $(document).bind('mouseup', function (event) {
      event.preventDefault();
      stop(event);
      getTransformRotate(vinyl);
    });
  };

  start = function start(event) {
    getTransformRotate(vinyl);
    event.preventDefault();
    var screen = this.getBoundingClientRect(),
        top = screen.top,
        left = screen.left,
        width = screen.width,
        height = screen.height,
        xAxis,
        yAxis;
    center = {
      x: left + width / 2,
      y: top + height / 2
    };
    xAxis = event.clientX - center.x;
    yAxis = event.clientY - center.y;
    startAngle = radiansToDegrees * Math.atan2(yAxis, xAxis);
    return active = true;
  };

  rotate = function rotate(event) {
    getTransformRotate(vinyl);
    event.preventDefault();
    var xAxis = event.clientX - center.x,
        yAxis = event.clientY - center.y,
        d = radiansToDegrees * Math.atan2(yAxis, xAxis);
    rotations = d - startAngle;
    return vinyl.style.transform = "rotate(".concat(angle + rotations, "deg)");
  };

  stop = function stop() {
    getTransformRotate(vinyl);
    angle += rotations;
    return active = false;
  };

  init();
}

;