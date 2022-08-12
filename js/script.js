const root = document.documentElement;
const vinyl = document.querySelector('.disk');
let moving = false,
    playing = false;

function getTransformRotate(vinyl) {
  let vinylStyle = window.getComputedStyle(vinyl, null);
  let transformRotate = vinylStyle.getPropertyValue('transform');
  let matrixValues = transformRotate.split('(')[1];
      matrixValues = matrixValues.split(')')[0];
      matrixValues = matrixValues.split(',');
  let matrix = {
    a: matrixValues[0],
    b: matrixValues[1],
    c: matrixValues[2],
    d: matrixValues[3],
  };
  let radians = Math.atan2(matrix.b, matrix.a);
  if (radians < 0) radians += (2 * Math.PI);
  let angle = Math.round(radians * (180 / Math.PI));
  return angle;
};

const scratch = Draggable.create(vinyl, {
  cursor: 'pointer',
  activeCursor: 'grabbing',
  type: 'rotation',
  onDrag: () => {
    vinyl.classList.add('paused');
  },
  onRelease: () => {
    root.style.setProperty('--start', (getTransformRotate(vinyl) + 'deg'));
    root.style.setProperty('--stop', (getTransformRotate(vinyl) + 360 + 'deg'));
    if (playing) {
      vinyl.classList.add('rotate');
      vinyl.classList.remove('paused');
      console.log('onRelease: class added');
    }
  },
  onClick: () => {
    console.log('onClick');
    root.style.setProperty('--start', (getTransformRotate(vinyl) + 'deg'));
    root.style.setProperty('--stop', (getTransformRotate(vinyl) + 360 + 'deg'));
    if (!playing) {
      playing = true;
      vinyl.classList.add('rotate');
      vinyl.classList.remove('paused');
      console.log('class added');
    } else
    if (playing) {
      playing = false;
      vinyl.classList.remove('rotate');
      vinyl.classList.add('paused');
      console.log('class removed');
    };
  },
});