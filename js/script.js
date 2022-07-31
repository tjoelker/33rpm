const vinyl = document.querySelector('.disk');
let playing = false;

vinyl.onclick = () => {
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