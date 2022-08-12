"use strict";

var root = document.documentElement;
var vinyl = document.querySelector('.disk');
var moving = false,
    playing = false;

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
  var angle = Math.round(radians * (180 / Math.PI));
  return angle;
}

;
var scratch = Draggable.create(vinyl, {
  cursor: 'pointer',
  activeCursor: 'grabbing',
  type: 'rotation',
  onDrag: function onDrag() {
    vinyl.classList.add('paused');
  },
  onRelease: function onRelease() {
    root.style.setProperty('--start', getTransformRotate(vinyl) + 'deg');
    root.style.setProperty('--stop', getTransformRotate(vinyl) + 360 + 'deg');

    if (playing) {
      vinyl.classList.add('rotate');
      vinyl.classList.remove('paused');
      console.log('onRelease: class added');
    }
  },
  onClick: function onClick() {
    console.log('onClick');
    root.style.setProperty('--start', getTransformRotate(vinyl) + 'deg');
    root.style.setProperty('--stop', getTransformRotate(vinyl) + 360 + 'deg');

    if (!playing) {
      playing = true;
      vinyl.classList.add('rotate');
      vinyl.classList.remove('paused');
      console.log('class added');
    } else if (playing) {
      playing = false;
      vinyl.classList.remove('rotate');
      vinyl.classList.add('paused');
      console.log('class removed');
    }

    ;
  }
});