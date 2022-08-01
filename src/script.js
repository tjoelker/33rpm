"use strict";

var vinyl = document.querySelector('.disk');
var playing = false;
var options = {
  touchMode: 'wheel',
  minDegree: 0
}; // vinyl.onmousedown = () => {
//   vinyl.style.cursor = 'grabbing'; // fix needed
//   if (playing == false) { // if NOT playing
//     vinyl.onmouseup = () => {
//       playing = true;
//       rotation.play();
//       console.log('play');
//     }
//   } else if (playing == true) { // if playing
//     vinyl.onmouseup = () => {
//       playing = false;
//       rotation.pause();
//       console.log('pause');
//     }
//   } 
// };

var rotation = anime({
  targets: '.disk',
  autoplay: false,
  loop: true,
  rotate: {
    easing: 'linear',
    duration: 1800,
    value: 360
  }
}); // function scratch() {

JogDial(vinyl, options).on('mousedown', function () {
  if (playing == false) {
    // if NOT playing
    playing = true;
    rotation.play();
  } else if (playing == true) {
    // if playing
    playing = false;
    rotation.pause();
  }
}).on('mousemove', function (event) {
  console.log(event.target.rotation);
}).on('mouseup', function (event) {
  console.log(event.target.rotation);
}); // };