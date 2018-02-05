var spinnerWheel = new Winwheel({
  'canvasId': 'movingDealsCanvas',
  'numSegments': 8,
  'lineWidth': 2,
  'innerRadius': 30,
	'outerRadius': 170,
  'drawText': true,
  'pins': true,
  'rotationAngle': -30,
  // 'drawMode'          : 'segmentImage',    // Must be segmentImage to draw wheel using one image per segemnt.
  'segments': [
    { 'fillStyle': '#fdf42e', 'text': 'Segment 1' },
    { 'fillStyle': '#fdd40b', 'text': 'Segment 2' },
    { 'fillStyle': '#fdf42e', 'text': 'Segment 3' },
    { 'fillStyle': '#fdd40b', 'text': 'Segment 4' },
    { 'fillStyle': '#fdf42e', 'text': 'Segment 5' },
    { 'fillStyle': '#fdd40b', 'text': 'Segment 6' },
    { 'fillStyle': '#fdf42e', 'text': 'Segment 7' },
    { 'fillStyle': '#fdd40b', 'text': 'Segment 8' },
    // { 'fillStyle': '#fdf42e', 'text': 'Segment 1', 'image': '../img/converted/rsz_1breeze.png'},
    // { 'fillStyle': '#fdd40b', 'text': 'Segment 2', 'image': '../img/converted/rsz_1breeze.png'},
    // { 'fillStyle': '#fdf42e', 'text': 'Segment 3', 'image': '../img/converted/rsz_1breeze.png'},
    // { 'fillStyle': '#fdd40b', 'text': 'Segment 4', 'image': '../img/converted/rsz_1breeze.png'},
    // { 'fillStyle': '#fdf42e', 'text': 'Segment 5', 'image': '../img/converted/rsz_1breeze.png'},
    // { 'fillStyle': '#fdd40b', 'text': 'Segment 6', 'image': '../img/converted/rsz_1breeze.png'},
    // { 'fillStyle': '#fdf42e', 'text': 'Segment 7', 'image': '../img/converted/rsz_1breeze.png'},
    // { 'fillStyle': '#fdd40b', 'text': 'Segment 8', 'image': '../img/converted/rsz_1breeze.png'},
  ],
  'animation': {
    'type': 'spinToStop',  // Type of animation.
    'duration': 5,             // How long the animation is to take in seconds.
    'spins': 8,              // The number of complete 360 degree rotations the wheel is to do.
    'callbackFinished': alertPrize,
		'callbackAfter': 'drawTriangle()',
		'callbackSound': playSound,
		'soundTrigger': 'pin'
  },
 'pins':    // Display pins, and if desired specify the number.
        {
            'number' : 32
        }
});
          // Create new image object in memory.
         //  var loadedImg = new Image();

         //  // Create callback to execute once the image has finished loading.
         //  loadedImg.onload = function()
         //  {
         //      spinnerWheel.wheelImage = loadedImg;    // Make wheelImage equal the loaded image object.
         //      spinnerWheel.draw();                    // Also call draw function to render the wheel.
         //  }

         //    // Set the image source, once complete this will trigger the onLoad callback (above).
         //    loadedImg.src = "../img/planes.png";

// -------------------------------------------------------
// Function for reset button.
// -------------------------------------------------------
var wheelSpinning = false;
var spinCount = 3;

function resetWheel() {
  spinnerWheel.stopAnimation(false);  // Stop spinner animation, false as param so does not call callback function.
  spinnerWheel.rotationAngle = 0;     // Re-set spinner wheel angle to 0 degrees.
  spinnerWheel.draw();                // Call draw to render changes to spinner wheel.

	drawTriangle();
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
	if (spinCount === 3) {
		console.log('spin Count is 3');
		document.getElementById("spinImg1").src = '../img/Breeze.png';
	} else if (spinCount === 2) {
		console.log('spin Count is 2');
		document.getElementById("spinImg2").src = '../img/Cif.png';
	} else if (spinCount === 1) {
		console.log('spin Count is 1');
		document.getElementById("spinImg3").src = '../img/Knorr.png';
	}

  spinCount--;
  document.getElementById("spinCount").innerHTML = spinCount;
	// Call getIndicatedSegment() function to return pointer to the segment pointed to on wheel.
	var winningSegment = spinnerWheel.getIndicatedSegment();

	alert("You have won " + winningSegment.text + "!");
  resetWheel();
}
  // Function to draw pointer using code (like in a previous tutorial).
drawTriangle();

function drawTriangle()
{
		// Get the canvas context the wheel uses.
		var ctx = spinnerWheel.ctx;

		ctx.strokeStyle = 'navy';     // Set line colour.
		ctx.fillStyle   = 'aqua';     // Set fill colour.
		ctx.lineWidth   = 2;
		ctx.beginPath();              // Begin path.
		ctx.moveTo(170, 5);           // Move to initial position.
		ctx.lineTo(230, 5);           // Draw lines to make the shape.
		ctx.lineTo(200, 40);
		ctx.lineTo(171, 5);
		ctx.stroke();                 // Complete the path by stroking (draw lines).
		ctx.fill();                   // Then fill.
}

var audio = new Audio('../mp3/tick.mp3');  // Create audio object and load desired file.

	function playSound()
	{
			// Stop and rewind the sound (stops it if already playing).
			audio.pause();
			audio.currentTime = 0;

			// Play the sound.
			audio.play();
	}
