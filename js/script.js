const vinyl = document.querySelector('.disk');
let playing = false;
let grabbing = false;
let moving = false;
const options = {
  touchMode: 'wheel',
  minDegree: 0,
};

vinyl.onmousedown = () => {
  grabbing = true;
  // console.log('mousedown');
  if (grabbing == true) {
    rotation.pause();
    vinyl.onmousemove = () => {
      // playing = false;
      moving = true;  // needs refinement; too sensitivy(!)
      // console.log('mousemove');
      /* grab & rotate function */
      if (moving == true) {
        vinyl.onmouseup = () => {
          // console.log('mousemove > mouseup');
            if (playing == true) {
              rotation.play();
            } else if (playing == false) {
              rotation.pause();
            }
            grabbing = false;
            moving = false;
            // return console.log('mousemove > grabbing = false')
          }
      }
    }
    vinyl.onmouseup = () => {
      // console.log('mousedown > mouseup');
      if (playing == false) {
        playing = true
        rotation.play();
      } else if (playing == true) {
        playing = false;
        rotation.pause();
      }
      grabbing = false;
      // return console.log('mouseup > grabbing = false')
    }
  }
}

const rotation = anime({
  targets: '.disk',
  autoplay: false,
  loop: true,
  rotate: {
    easing: 'linear',
    duration: 1800,
    value: 360,
  },
});
