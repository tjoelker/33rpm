const root = document.documentElement;
const vinyl = document.querySelector('.disk');
let vinylAngle = 0;
let playing = false;
let grabbing = false;
let moving = false;
let seconds = 0;
let update = 0;
let loopCount = 0;

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
  vinylAngle = Math.round(radians * (180 / Math.PI));
  return vinylAngle;
};

// vinyl.onmousedown = function() {
//   getTransformRotate(vinyl);
//   grabbing = true;
//   // console.log('mousedown');
//   if (grabbing == true) {
//     rotation.pause();
//     vinyl.onmousemove = function() {
//       moving = true;  // needs refinement; too sensitivy(!)
//       // console.log('mousemove');

//       grabRotate();


//       if (moving == true) {
//         vinyl.onmouseup = function() {
//           // console.log('mousemove > mouseup');
//           if (playing == true) {
//             rotation.play();
//           } else if (playing == false) {
//             rotation.pause();
//           }
//           grabbing = false;
//           moving = false;
//           // return console.log('mousemove > grabbing = false')
//           getTransformRotate(vinyl);
//         }
//       }
//     }
//     vinyl.onmouseup = function() {
//       // console.log('mousedown > mouseup');
//       if (playing == false) {
//         playing = true
//         rotation.play();
//       } else if (playing == true) {
//         playing = false;
//         rotation.pause();
//       }
//       grabbing = false;
//       // return console.log('mouseup > grabbing = false')
//       getTransformRotate(vinyl);
//     }
//   }
// };
grabRotate();


const rotation = anime({
  targets: '.disk',
  autoplay: false,
  loop: true,
  from: vinylAngle,
  rotate: {
    easing: 'linear',
    duration: 1800,
    value: 360,
  },
  change: function() {
    seconds += 0.01765;  // needs refinement; too sensitivy(!)
    update++; // 1 loop = ~106 changes
  },
  loopBegin: function() {
    loopCount++;
  },
});

function grabRotate() {
  let init
    , rotate
    , start
    , stop
    , active = false
    , angle = 0
    , rotations = 0
    , startAngle = 0
    , center = {
      x: 0,
      y: 0,
    }
    , radiansToDegrees = 180 / Math.PI;
  init = function() {
    vinyl.addEventListener('mousedown', start, false);
      $(document).bind('mousemove', function(event) {
        if (active == true) {
          event.preventDefault();
          rotate(event);
        }
      });
      $(document).bind('mouseup', function(event) {
        event.preventDefault();
        stop(event);
      })
  };
  start = function(event) {
    event.preventDefault();
    vinyl.classList.add('paused');
    let screen = this.getBoundingClientRect()
      , top = screen.top
      , left = screen.left
      , width = screen.width
      , height = screen.height
      , xAxis
      , yAxis;
    center = {
      x: left + (width / 2),
      y: top + (height / 2),
    };
    xAxis = event.clientX - center.x;
    yAxis = event.clientY - center.y;
    startAngle = radiansToDegrees * Math.atan2(yAxis, xAxis);
    return active = true;
  };
  rotate = function(event) {
    event.preventDefault();
    let xAxis = event.clientX - center.x
      , yAxis = event.clientY - center.y
      , d = radiansToDegrees * Math.atan2(yAxis, xAxis);
    rotations = d - startAngle;
    root.style.setProperty('--start', ((angle + rotations) + 'deg'));
    root.style.setProperty('--stop', ((angle + rotations) + 360 + 'deg'));
    return vinyl.style.transform = `rotate(${angle + rotations}deg)`;
  };
  stop = function() {
    angle += rotations;
    vinyl.classList.remove('paused');
    return active = false;
  };
  init();
};