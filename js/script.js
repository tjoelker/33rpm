const vinyl = document.querySelector('.disk');
let playing = false;
let grabbing = false;
let moving = false;
let seconds = 0;
let update = 0;
let loopCount = 0;

vinyl.onmousedown = function() {
  grabbing = true;
  // console.log('mousedown');
  if (grabbing == true) {
    rotation.pause();
    vinyl.onmousemove = function() {
      // playing = false;
      moving = true;  // needs refinement; too sensitivy(!)
      // console.log('mousemove');

      /* grab & rotate function */


      if (moving == true) {
        vinyl.onmouseup = function() {
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
    vinyl.onmouseup = function() {
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
  change: function() {
    seconds += 0.01765;  // needs refinement; too sensitivy(!)
    update++; // 1 loop = ~106 changes
  },
  loopBegin: function() {
    loopCount++;
  },
});

(function() {
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
    , r2d = 180 / Math.PI;

  init = function() {
    vinyl.addEventListener('mousedown', start, false); // when clicked
      $(document).bind('mousemove', function(event) {     // and start moving
        if (active == true) {                          // if moving (true)
          console.log('mousemove');
          event.preventDefault();
          rotate(event);                               // start rotate() function for event
        }
      });
      $(document).bind('mouseup', function(event) {       // when mouse is released
        console.log('mouseup');
        event.preventDefault();
        stop(event);                                   //  stop rotate()(?) function for event
      })
  };

  start = function(event) {
    event.preventDefault();
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
    startAngle = r2d * Math.atan2(yAxis, xAxis);
    return active = true;
  };

  rotate = function(event) {
    event.preventDefault();
    let xAxis = event.clientX - center.x
      , yAxis = event.clientY - center.y
      , d = r2d * Math.atan2(yAxis, xAxis);
    rotations = d - startAngle;
    return vinyl.style.transform = `rotate(${angle + rotations}deg)`;
  };
  stop = function() {
    angle += rotations;
    return active = false;
  };

  init();
  
}).call(this);