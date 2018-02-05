var spinnerWheel = new Winwheel({
  'canvasId': 'movingDealsCanvas',
  'numSegments': 8,
  'lineWidth': 2,
  'innerRadius': 30,
  'drawText': true,
  'pins': true,
  'rotationAngle': -30,
  'segments': [
    { 'fillStyle': '#fdf42e', 'text': 'Segment 1', },
    { 'fillStyle': '#fdd40b', 'text': 'Segment 2', },
    { 'fillStyle': '#fdf42e', 'text': 'Segment 3', },
    { 'fillStyle': '#fdd40b', 'text': 'Segment 4', },
    { 'fillStyle': '#fdf42e', 'text': 'Segment 5', },
    { 'fillStyle': '#fdd40b', 'text': 'Segment 6', },
    { 'fillStyle': '#fdf42e', 'text': 'Segment 7', },
    { 'fillStyle': '#fdd40b', 'text': 'Segment 8', },
  ],
  'animation': {
    'type': 'spinToStop',  // Type of animation.
    'duration': 5,             // How long the animation is to take in seconds.
    'spins': 8,              // The number of complete 360 degree rotations the wheel is to do.
    'callbackFinished': alertPrize
  }
});

// -------------------------------------------------------
// Function for reset button.
// -------------------------------------------------------
var wheelSpinning = false;
var spinCount = 3;

function resetWheel() {
  spinnerWheel.stopAnimation(false);  // Stop spinner animation, false as param so does not call callback function.
  spinnerWheel.rotationAngle = 0;     // Re-set spinner wheel angle to 0 degrees.
  spinnerWheel.draw();                // Call draw to render changes to spinner wheel.

  wheelSpinning = false;          // Reset to false to power buttons and spin can be clicked again.
}

// -------------------------------------------------------
// Click handler for spin button.
// -------------------------------------------------------
function startSpin() {
  // Ensure that spinning can't be clicked again while already running.
  if (wheelSpinning == false) {
    // Begin the spin animation by calling startAnimation on the wheel object.
    spinnerWheel.startAnimation();

    // Set to true so that power can't be changed and spin button re-enabled during
    // the current animation. The user will have to reset before spinning again.
    wheelSpinning = true;
  }
}

// -------------------------------------------------------
// Called when the spin animation has finished by the callback feature of the wheel because I specified callback in the parameters
// note the indicated segment is passed in as a parmeter as 99% of the time you will want to know this to inform the user of their prize.
// -------------------------------------------------------
function alertPrize(indicatedSegment) {
  // Do basic alert of the segment text. You would probably want to do something more interesting with this information.
  // alert("You have won " + indicatedSegment.text);
  spinCount--;
  document.getElementById("spinCount").innerHTML = spinCount;
  resetWheel();
  alert("You have won " + spinCount);
}