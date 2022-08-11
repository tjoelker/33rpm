const vinyl = document.querySelector('.disk');
let vinylAngle = 0;
let playing = true;

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
  vinyl.style.transform = `rotate(${vinylAngle}deg)`;
  return vinylAngle;
};

const play = function(angle) {
  playing = false;
  $({deg: angle}).animate({deg: (angle + 360)}, {
    duration: 1800,
    easing: 'linear',
    step: function(now) {
      $(vinyl).css({
        transform: 'rotate(' + Math.round(now) + 'deg)'
      });
    },
    done: function() {
      play(angle);
    },
  });
};

(function() {
  let initiate
    , start
    , rotate
    , stop
    , grabbing = false
    , rotation = 0
    , currentAngle = 0
    , newAngle = 0
    , center = {
        xAxis: 0,
        yAxis: 0,
      };

  initiate = function() {
    vinyl.addEventListener('mousedown', start, false);
      $(document).bind('mousemove', function(event) {
        if (grabbing) {
          event.preventDefault();
          rotate(event);
        }
      });

      $(document).bind('mouseup', function(event) {
        event.preventDefault();
        stop(event);
      })
  };

  /* 1 / initialized on 'mousedown' */
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
      xAxis: left + (width / 2),
      yAxis: top + (height / 2),
    };
    xAxis = event.clientX - center.xAxis;
    yAxis = event.clientY - center.yAxis;
    currentAngle = Math.round(Math.atan2(yAxis, xAxis) * (180 / Math.PI));
    return grabbing = true;
  };

  /* 2 / initialized on 'mousemove' */
  rotate = function(event) {
    event.preventDefault();
    let xAxis = event.clientX - center.xAxis
      , yAxis = event.clientY - center.yAxis
      , value = 0;
    value = Math.round(Math.atan2(yAxis, xAxis) * (180 / Math.PI));
    rotation = value - currentAngle;
    return vinyl.style.transform = `rotate(${newAngle + rotation}deg)`;
  };

  /* 3 / initialized on 'mouseup' */
  stop = function() {
    newAngle += rotation;
    vinylAngle = newAngle;
    if (playing) {
      play(vinylAngle);
    }
  };
 
  initiate();
  
}).call(this);