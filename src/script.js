"use strict";

var vinyl = document.querySelector('.disk');
var playing = false;

vinyl.onclick = function () {
  if (playing == false) {
    playing = true;
    rotation.play();
    console.log('play');
  } else if (playing == true) {
    playing = false;
    rotation.pause();
    console.log('pause');
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