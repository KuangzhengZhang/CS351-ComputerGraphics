//3456789_123456789_123456789_123456789_123456789_123456789_123456789_123456789_
// (JT: why the numbers? counts columns, helps me keep 80-char-wide listings)
//
// From 2013 book "WebGL Programming Guide"
// Chapter 5: ColoredTriangle.js (c) 2012 matsuda  AND
// Chapter 4: RotatingTriangle_withButtons.js (c) 2012 matsuda AND
//	Lengyel 2012 book: "Mathematics for 3D Game Programming and Computer Graphics
// 										," 3rd Ed. Chapter 4 on quaternions,
// merged and modified to became:
//
// ControlQuaternion.js for EECS 351-1, 
//									Northwestern Univ. Jack Tumblin

//		--demonstrate several different user I/O methods: 
//				--Webpage pushbuttons and 'innerHTML' for text display
//				--Mouse click & drag within our WebGL-hosting 'canvas'
//		--demonstrate use of quaternions for user-controlled rotation
//
// Vertex shader program----------------------------------
var VSHADER_SOURCE = 
  'uniform mat4 u_ModelMatrix;\n' +
  'attribute vec4 a_Position;\n' +
  'attribute vec4 a_Color;\n' +
  'varying vec4 v_Color;\n' +
  'void main() {\n' +
  '  gl_Position = u_ModelMatrix * a_Position;\n' +
  '  gl_PointSize = 10.0;\n' +
  '  v_Color = a_Color;\n' +
  '}\n';

// Fragment shader program----------------------------------
var FSHADER_SOURCE = 
//  '#ifdef GL_ES\n' +
  'precision mediump float;\n' +
//  '#endif GL_ES\n' +
  'varying vec4 v_Color;\n' +
  'void main() {\n' +
  '  gl_FragColor = v_Color;\n' +
  '}\n';

// Global Variables for the spinning tetrahedron:
var ANGLE_STEP = 45.0;  // default rotation angle rate (deg/sec)

// Global vars for mouse click-and-drag for rotation.
var isDrag=false;		// mouse-drag: true when user holds down mouse button
var xMclik=0.0;			// last mouse button-down position (in CVV coords)
var yMclik=0.0;   
var xMdragTot=0.0;	// total (accumulated) mouse-drag amounts (in CVV coords).
var yMdragTot=0.0;  

var qNew = new Quaternion(0,0,0,1); // most-recent mouse drag's rotation
var qTot = new Quaternion(0,0,0,1);	// 'current' orientation (made from qNew)
var quatMatrix = new Matrix4();				// rotation matrix, made from latest qTot

function main() {
//==============================================================================
  // Retrieve <canvas> element
  var canvas = document.getElementById('webgl');

  // Get the rendering context for WebGL
  var gl = getWebGLContext(canvas);
  if (!gl) {
    console.log('Failed to get the rendering context for WebGL');
    return;
  }

  // Initialize shaders
  if (!initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE)) {
    console.log('Failed to intialize shaders.');
    return;
  }

  // Initialize a Vertex Buffer in the graphics system to hold our vertices
  var n = initVertexBuffer(gl);
  if (n < 0) {
    console.log('Failed to set the vertex information');
    return;
  }
	// Register the Mouse & Keyboard Event-handlers-------------------------------
	// If users press any keys on the keyboard or move, click or drag the mouse,
	// the operating system records them as 'events' (small text strings that 
	// can trigger calls to functions within running programs). JavaScript 
	// programs running within HTML webpages can respond to these 'events' if we:
	//		1) write an 'event handler' function (called when event happens) and
	//		2) 'register' that function--connect it to the desired HTML page event. //
	// Here's how to 'register' all mouse events found within our HTML-5 canvas:
  canvas.onmousedown	=	function(ev){myMouseDown( ev, gl, canvas) }; 
  					// when user's mouse button goes down, call mouseDown() function
  canvas.onmousemove = 	function(ev){myMouseMove( ev, gl, canvas) };
											// when the mouse moves, call mouseMove() function					
  canvas.onmouseup = 		function(ev){myMouseUp(   ev, gl, canvas)};
  					// NOTE! 'onclick' event is SAME as on 'mouseup' event
  					// in Chrome Brower on MS Windows 7, and possibly other 
  					// operating systems; thus I use 'mouseup' instead.
  
	// END Mouse & Keyboard Event-Handlers-----------------------------------
	
  // Specify the color for clearing <canvas>
  gl.clearColor(0.0, 0.0, 0.0, 1.0);

	// NEW!! Enable 3D depth-test when drawing: don't over-draw at any pixel 
	// unless the new Z value is closer to the eye than the old one..
	gl.depthFunc(gl.LESS);			// default value--just so you know it's there.
	gl.enable(gl.DEPTH_TEST); 	  
	
  // Get handle to graphics system's storage location of u_ModelMatrix
  var u_ModelMatrix = gl.getUniformLocation(gl.program, 'u_ModelMatrix');
  if (!u_ModelMatrix) { 
    console.log('Failed to get the storage location of u_ModelMatrix');
    return;
  }
  // Create our JavaScript 'model' matrix: 
  var modelMatrix = new Matrix4();

  // Create, init current rotation angle value in JavaScript
  var currentAngle = 0.0;
  
//====================================
	testQuaternions();		// test fcn at end of file
	console.log('====================================');
	testQuaternions_mod();		// test fcn at end of file
//=====================================

  // ANIMATION: create 'tick' variable whose value is this function:
  //----------------- 
  var tick = function() {
    currentAngle = animate(currentAngle);  // Update the rotation angle
    draw(gl, n, currentAngle, modelMatrix, u_ModelMatrix);   // Draw shapes
//    console.log('currentAngle=',currentAngle); // put text in console.


    requestAnimationFrame(tick, canvas);   
    									// Request that the browser re-draw the webpage
    									// (causes webpage to endlessly re-draw itself)
  };
  tick();							// start (and continue) animation: draw current image
	
}

function initVertexBuffer(gl) {
//==============================================================================
	var c30 = Math.sqrt(0.75);					// == cos(30deg) == sqrt(3) / 2
	var sq2	= Math.sqrt(2.0);						 

  var colorShapes = new Float32Array([
  // Vertex coordinates(x,y,z,w) and color (R,G,B) for a new color tetrahedron:
	//		Apex on +z axis; equilateral triangle base at z=0
/*	Nodes:
		 0.0,	 0.0, sq2, 1.0,			0.0, 	0.0,	1.0,	// Node 0 (apex, +z axis;  blue)
     c30, -0.5, 0.0, 1.0, 		1.0,  0.0,  0.0, 	// Node 1 (base: lower rt; red)
     0.0,  1.0, 0.0, 1.0,  		0.0,  1.0,  0.0,	// Node 2 (base: +y axis;  grn)
    -c30, -0.5, 0.0, 1.0, 		1.0,  1.0,  1.0, 	// Node 3 (base:lower lft; white)
*/
			// Face 0: (right side)  
     0.0,	 0.0, sq2, 1.0,		0.0, 	0.0,	1.0,	// Node 0 (apex, +z axis;  blue)
     c30, -0.5, 0.0, 1.0, 		1.0,  0.0,  0.0, 	// Node 1 (base: lower rt; red)
     0.0,  1.0, 0.0, 1.0,  		0.0,  1.0,  0.0,	// Node 2 (base: +y axis;  grn)
			// Face 1: (left side)
		 0.0,	 0.0, sq2, 1.0,			0.0, 	0.0,	1.0,	// Node 0 (apex, +z axis;  blue)
     0.0,  1.0, 0.0, 1.0,  		0.0,  1.0,  0.0,	// Node 2 (base: +y axis;  grn)
    -c30, -0.5, 0.0, 1.0, 		1.0,  1.0,  1.0, 	// Node 3 (base:lower lft; white)
    	// Face 2: (lower side)
		 0.0,	 0.0, sq2, 1.0,			0.0, 	0.0,	1.0,	// Node 0 (apex, +z axis;  blue) 
    -c30, -0.5, 0.0, 1.0, 		1.0,  1.0,  1.0, 	// Node 3 (base:lower lft; white)
     c30, -0.5, 0.0, 1.0, 		1.0,  0.0,  0.0, 	// Node 1 (base: lower rt; red) 
     	// Face 3: (base side)  
    -c30, -0.5, 0.0, 1.0, 		1.0,  1.0,  1.0, 	// Node 3 (base:lower lft; white)
     0.0,  1.0, 0.0, 1.0,  		0.0,  1.0,  0.0,	// Node 2 (base: +y axis;  grn)
     c30, -0.5, 0.0, 1.0, 		1.0,  0.0,  0.0, 	// Node 1 (base: lower rt; red)
     
     	// Drawing Axes: Draw them using gl.LINES drawing primitive;
     	// +x axis RED; +y axis GREEN; +z axis BLUE; origin: GRAY
		 0.0,  0.0,  0.0, 1.0,		0.3,  0.3,  0.3,	// X axis line (origin: gray)
		 1.3,  0.0,  0.0, 1.0,		1.0,  0.3,  0.3,	// 						 (endpoint: red)
		 
		 0.0,  0.0,  0.0, 1.0,    0.3,  0.3,  0.3,	// Y axis line (origin: white)
		 0.0,  1.3,  0.0, 1.0,		0.3,  1.0,  0.3,	//						 (endpoint: green)

		 0.0,  0.0,  0.0, 1.0,		0.3,  0.3,  0.3,	// Z axis line (origin:white)
		 0.0,  0.0,  1.3, 1.0,		0.3,  0.3,  1.0,	//						 (endpoint: blue)
  ]);
  var nn = 18;		// 12 tetrahedron vertices. 6 axis vertices.
  								// we can also draw any subset of these we wish,
  								// such as the last 2 tetra faces.(onscreen at upper right)
	
  // Create a buffer object to hold these vertices inside the graphics system
  var shapeBufferHandle = gl.createBuffer();  
  if (!shapeBufferHandle) {
    console.log('Failed to create the shape buffer object');
    return false;
  }

  // Bind the the buffer object to target:
  gl.bindBuffer(gl.ARRAY_BUFFER, shapeBufferHandle);
  // Transfer data from Javascript array colorShapes to Graphics system VBO
  // (Use sparingly--may be slow if you transfer large shapes stored in files)
  gl.bufferData(gl.ARRAY_BUFFER, colorShapes, gl.STATIC_DRAW);
  // gl.STATIC_DRAW?  a 'usage hint' for OpenGL/WebGL memory usage: says we 
  // won't change these stored buffer values, and use them solely for drawing.

  var FSIZE = colorShapes.BYTES_PER_ELEMENT; // how many bytes per stored value?
    
  //Get graphics system's handle for our Vertex Shader's position-input variable: 
  var a_Position = gl.getAttribLocation(gl.program, 'a_Position');
  if (a_Position < 0) {
    console.log('Failed to get the storage location of a_Position');
    return -1;
  }
  // Use handle to specify how to retrieve position data from our VBO:
  gl.vertexAttribPointer(
  		a_Position, 	// choose Vertex Shader attribute to fill with data
  		4, 						// how many values? 1,2,3 or 4.  (we're using x,y,z,w)
  		gl.FLOAT, 		// data type for each value: usually gl.FLOAT
  		false, 				// did we supply fixed-point data AND it needs normalizing?
  		FSIZE * 7, 		// Stride -- how many bytes used to store each vertex?
  									// (x,y,z,w, r,g,b) * bytes/value
  		0);						// Offset -- now many bytes from START of buffer to the
  									// value we will actually use?
  gl.enableVertexAttribArray(a_Position);  
  									// Enable assignment of vertex buffer object's position data

  // Get graphics system's handle for our Vertex Shader's color-input variable;
  var a_Color = gl.getAttribLocation(gl.program, 'a_Color');
  if(a_Color < 0) {
    console.log('Failed to get the storage location of a_Color');
    return -1;
  }
  // Use handle to specify how to retrieve color data from our VBO:
  gl.vertexAttribPointer(
  	a_Color, 				// choose Vertex Shader attribute to fill with data
  	3, 							// how many values? 1,2,3 or 4. (we're using R,G,B)
  	gl.FLOAT, 			// data type for each value: usually gl.FLOAT
  	false, 					// did we supply fixed-point data AND it needs normalizing?
  	FSIZE * 7, 			// Stride -- how many bytes used to store each vertex?
  									// (x,y,z,w, r,g,b) * bytes/value
  	FSIZE * 4);			// Offset -- how many bytes from START of buffer to the
  									// value we will actually use?  Need to skip over x,y,z,w
  									
  gl.enableVertexAttribArray(a_Color);  
  									// Enable assignment of vertex buffer object's position data

	//--------------------------------DONE!
  // Unbind the buffer object 
  gl.bindBuffer(gl.ARRAY_BUFFER, null);

  return nn;
}

function draw(gl, n, currentAngle, modelMatrix, u_ModelMatrix) {
//==============================================================================
  // Clear <canvas>  colors AND the depth buffer
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
  
// Great question from student:
// "?How can I get the screen-clearing color (or any of the many other state
//		variables of OpenGL)?  'glGet()' doesn't seem to work..."
// ANSWER: from WebGL specification page: 
//							https://www.khronos.org/registry/webgl/specs/1.0/
//	search for 'glGet()' (ctrl-f) yields:
//  OpenGL's 'glGet()' becomes WebGL's 'getParameter()'. Use it like this:
/*
	clrColr = new Float32Array(4);
	clrColr = gl.getParameter(gl.COLOR_CLEAR_VALUE);
	console.log("clear value:", clrColr);
*/

  //-------Draw Spinning Tetrahedron
  modelMatrix.setTranslate(-0.4,-0.4, 0.0);  // 'set' means DISCARD old matrix,
  						// (drawing axes centered in CVV), and then make new
  						// drawing axes moved to the lower-left corner of CVV. 
  modelMatrix.scale(1,1,-1);							// convert to left-handed coord sys
  																				// to match WebGL display canvas.
  modelMatrix.scale(0.5, 0.5, 0.5);
  						// if you DON'T scale, tetra goes outside the CVV; clipped!
  modelMatrix.rotate(currentAngle, 0, 1, 0);  // spin drawing axes on Y axis;

  //-----DRAW TETRA:  Use this matrix to transform & draw 
  //						the first set of vertices stored in our VBO:
  		// Pass our current matrix to the vertex shaders:
  gl.uniformMatrix4fv(u_ModelMatrix, false, modelMatrix.elements);
  		// Draw triangles: start at vertex 0 and draw 12 vertices
  gl.drawArrays(gl.TRIANGLES, 0, 12);

  // NEXT, create different drawing axes, and...
  modelMatrix.setTranslate(0.3, 0.3, 0.0);  // 'set' means DISCARD old matrix,
  						// (drawing axes centered in CVV), and then make new
  						// drawing axes moved to the upper-left corner of CVV.
  modelMatrix.scale(1,1,-1);							// convert to left-handed coord sys
  																				// to match WebGL display canvas.
  modelMatrix.scale(0.3, 0.3, 0.3);				// Make it smaller.
  
  // Mouse-Dragging for Rotation:
	//-----------------------------
	// Attempt 1:  X-axis, then Y-axis rotation:
/*  						// First, rotate around x-axis by the amount of -y-axis dragging:
  modelMatrix.rotate(-yMdragTot*150.0, 1, 0, 0); // drag +/-1 to spin -/+120 deg.
  						// Then rotate around y-axis by the amount of x-axis dragging
	modelMatrix.rotate( xMdragTot*150.0, 0, 1, 0); // drag +/-1 to spin +/-120 deg.
				// Acts SENSIBLY if I always drag mouse to turn on Y axis, then X axis.
				// Acts WEIRDLY if I drag mouse to spin on X axis first, then Y axis.
				// ? Why is is 'backwards'? Duality again!
*/
	//-----------------------------
/*
	// Attempt 2: perp-axis rotation:
							// rotate on axis perpendicular to the mouse-drag direction:
	var dist = Math.sqrt(xMdragTot*xMdragTot + yMdragTot*yMdragTot);
							// why add 0.001? avoids divide-by-zero in next statement
							// in cases where user didn't drag the mouse.)
	modelMatrix.rotate(dist*150.0, -yMdragTot+0.0001, xMdragTot+0.0001, 0.0);
							// why axis (x,y,z) = (-yMdrag,+xMdrag,0)? 
							// -- to rotate around +x axis, drag mouse in -y direction.
							// -- to rotate around +y axis, drag mouse in +x direction.
				// Acts weirdly as rotation amounts get far from 0 degrees.
				// ?why does our intuition fail so quickly here? ANS: 'Gimbal lock'
*/
	//-------------------------------
	// Attempt 3: Quaternions:
	// DON'T use accumulate mouse-dragging to describe current rotation: 
	// accumulate quaternions instead.  See the mouse-drag callback function,
	// where each mouse-drag event creates a quaternion (qNew) that gets applied
	// to our current rotation qTot by quaternion-multiply. Here we convert
	// qTot to a rotation matrix, and use it to adjust current drawing axes:

	quatMatrix.setFromQuat(qTot.x, qTot.y, qTot.z, qTot.w);	// Quaternion-->Matrix
	modelMatrix.concat(quatMatrix);	// apply that matrix.

	
	//-------------------------------
	// Drawing:
	// Use the current ModelMatrix to transform & draw something new from our VBO:
  gl.uniformMatrix4fv(u_ModelMatrix, false, modelMatrix.elements);
  // Draw the last 2 faces of our tetrahedron: starting at vertex #6,
  // draw the next 6 vertices using the 'gl.TRIANGLES' drawing primitive
  gl.drawArrays(gl.TRIANGLES, 6,6);
  // Next, use the gl.LINES drawing primitive on vertices 12 thru 18 to 
  // depict our current 'drawing axes' onscreen:
  gl.drawArrays(gl.LINES,12,6);				// start at vertex #12; draw 6 vertices

}

// Record the last time we called 'animate()':  (used for animation timing)
var g_last = Date.now();

function animate(angle) {
//==============================================================================
  // Calculate the elapsed time
  var now = Date.now();
  var elapsed = now - g_last;
  g_last = now;
  
  // Update the current rotation angle (adjusted by the elapsed time)
  //  limit the angle to move smoothly between +20 and -85 degrees:
//  if(angle >  120.0 && ANGLE_STEP > 0) ANGLE_STEP = -ANGLE_STEP;
//  if(angle < -120.0 && ANGLE_STEP < 0) ANGLE_STEP = -ANGLE_STEP;

  var newAngle = angle + (ANGLE_STEP * elapsed) / 1000.0;
  if(newAngle > 180.0) newAngle = newAngle - 360.0;
  if(newAngle <-180.0) newAngle = newAngle + 360.0;
  return newAngle;
}

//==================HTML Button Callbacks======================

function angleSubmit() {
// Called when user presses 'Submit' button on our webpage
//		HOW? Look in HTML file (e.g. ControlMulti.html) to find
//	the HTML 'input' element with id='usrAngle'.  Within that
//	element you'll find a 'button' element that calls this fcn.

// Read HTML edit-box contents:
	var UsrTxt=document.getElementById('usrAngle').value;	
// Display what we read from the edit-box: use it to fill up
// the HTML 'div' element with id='Result':
  document.getElementById('Result').innerHTML ='You Typed: '+UsrTxt;
};

function clearDrag() {
// Called when user presses 'Clear' button in our webpage
	xMdragTot = 0.0;
	yMdragTot = 0.0;
}
function spinUp() {
// Called when user presses the 'Spin >>' button on our webpage.
// ?HOW? Look in the HTML file (e.g. ControlMulti.html) to find
// the HTML 'button' element with onclick='spinUp()'.
  ANGLE_STEP += 25; 
}

function spinDown() {
// Called when user presses the 'Spin <<' button
 ANGLE_STEP -= 25; 
}

function runStop() {
// Called when user presses the 'Run/Stop' button
  if(ANGLE_STEP*ANGLE_STEP > 1) {
    myTmp = ANGLE_STEP;
    ANGLE_STEP = 0;
  }
  else {
  	ANGLE_STEP = myTmp;
  }
}

function clearMouse() {
// Called when user presses 'Clear' button on our webpage, just below the 
// 'xMdragTot,yMdragTot' display.
	xMdragTot = 0.0;
	yMdragTot = 0.0;
	document.getElementById('MouseText').innerHTML=
			'Mouse Drag totals (CVV x,y coords):\t'+
			 xMdragTot.toFixed(5)+', \t'+
			 yMdragTot.toFixed(5);	
}

function resetQuat() {
// Called when user presses 'Reset' button on our webpage, just below the 
// 'Current Quaternion' display.
  var res=5;
	qTot.clear();
	document.getElementById('QuatValue').innerHTML= 
														 '\t X=' +qTot.x.toFixed(res)+
														'i\t Y=' +qTot.y.toFixed(res)+
														'j\t Z=' +qTot.z.toFixed(res)+
														'k\t W=' +qTot.w.toFixed(res)+
														'<br>length='+qTot.length().toFixed(res);
}
//===================Mouse and Keyboard event-handling Callbacks

function myMouseDown(ev, gl, canvas) {
//==============================================================================
// Called when user PRESSES down any mouse button;
// 									(Which button?    console.log('ev.button='+ev.button);   )
// 		ev.clientX, ev.clientY == mouse pointer location, but measured in webpage 
//		pixels: left-handed coords; UPPER left origin; Y increases DOWNWARDS (!)  

// Create right-handed 'pixel' coords with origin at WebGL canvas LOWER left;
  var rect = ev.target.getBoundingClientRect();	// get canvas corners in pixels
  var xp = ev.clientX - rect.left;									// x==0 at canvas left edge
  var yp = canvas.height - (ev.clientY - rect.top);	// y==0 at canvas bottom edge
//  console.log('myMouseDown(pixel coords): xp,yp=\t',xp,',\t',yp);
  
	// Convert to Canonical View Volume (CVV) coordinates too:
  var x = (xp - canvas.width/2)  / 		// move origin to center of canvas and
  						 (canvas.width/2);			// normalize canvas to -1 <= x < +1,
	var y = (yp - canvas.height/2) /		//										 -1 <= y < +1.
							 (canvas.height/2);
//	console.log('myMouseDown(CVV coords  ):  x, y=\t',x,',\t',y);
	
	isDrag = true;											// set our mouse-dragging flag
	xMclik = x;													// record where mouse-dragging began
	yMclik = y;
};


function myMouseMove(ev, gl, canvas) {
//==============================================================================
// Called when user MOVES the mouse with a button already pressed down.
// 									(Which button?   console.log('ev.button='+ev.button);    )
// 		ev.clientX, ev.clientY == mouse pointer location, but measured in webpage 
//		pixels: left-handed coords; UPPER left origin; Y increases DOWNWARDS (!)  

	if(isDrag==false) return;				// IGNORE all mouse-moves except 'dragging'

	// Create right-handed 'pixel' coords with origin at WebGL canvas LOWER left;
  var rect = ev.target.getBoundingClientRect();	// get canvas corners in pixels
  var xp = ev.clientX - rect.left;									// x==0 at canvas left edge
	var yp = canvas.height - (ev.clientY - rect.top);	// y==0 at canvas bottom edge
//  console.log('myMouseMove(pixel coords): xp,yp=\t',xp,',\t',yp);
  
	// Convert to Canonical View Volume (CVV) coordinates too:
  var x = (xp - canvas.width/2)  / 		// move origin to center of canvas and
  						 (canvas.width/2);			// normalize canvas to -1 <= x < +1,
	var y = (yp - canvas.height/2) /		//										 -1 <= y < +1.
							 (canvas.height/2);

	// find how far we dragged the mouse:
	xMdragTot += (x - xMclik);					// Accumulate change-in-mouse-position,&
	yMdragTot += (y - yMclik);
	// AND use any mouse-dragging we found to update quaternions qNew and qTot.
	dragQuat(x - xMclik, y - yMclik);
	
	xMclik = x;													// Make NEXT drag-measurement from here.
	yMclik = y;
	
	// Show it on our webpage, in the <div> element named 'MouseText':
	document.getElementById('MouseText').innerHTML=
			'Mouse Drag totals (CVV x,y coords):\t'+
			 xMdragTot.toFixed(5)+', \t'+
			 yMdragTot.toFixed(5);	
};

function myMouseUp(ev, gl, canvas) {
//==============================================================================
// Called when user RELEASES mouse button pressed previously.
// 									(Which button?   console.log('ev.button='+ev.button);    )
// 		ev.clientX, ev.clientY == mouse pointer location, but measured in webpage 
//		pixels: left-handed coords; UPPER left origin; Y increases DOWNWARDS (!)  

// Create right-handed 'pixel' coords with origin at WebGL canvas LOWER left;
  var rect = ev.target.getBoundingClientRect();	// get canvas corners in pixels
  var xp = ev.clientX - rect.left;									// x==0 at canvas left edge
	var yp = canvas.height - (ev.clientY - rect.top);	// y==0 at canvas bottom edge
//  console.log('myMouseUp  (pixel coords): xp,yp=\t',xp,',\t',yp);
  
	// Convert to Canonical View Volume (CVV) coordinates too:
  var x = (xp - canvas.width/2)  / 		// move origin to center of canvas and
  						 (canvas.width/2);			// normalize canvas to -1 <= x < +1,
	var y = (yp - canvas.height/2) /		//										 -1 <= y < +1.
							 (canvas.height/2);
//	console.log('myMouseUp  (CVV coords  ):  x, y=\t',x,',\t',y);
	
	isDrag = false;											// CLEAR our mouse-dragging flag, and
	// accumulate any final bit of mouse-dragging we did:
	xMdragTot += (x - xMclik);
	yMdragTot += (y - yMclik);
//	console.log('myMouseUp: xMdragTot,yMdragTot =',xMdragTot,',\t',yMdragTot);

	// AND use any mouse-dragging we found to update quaternions qNew and qTot;
	dragQuat(x - xMclik, y - yMclik);

	// Show it on our webpage, in the <div> element named 'MouseText':
	document.getElementById('MouseText').innerHTML=
			'Mouse Drag totals (CVV x,y coords):\t'+
			 xMdragTot.toFixed(5)+', \t'+
			 yMdragTot.toFixed(5);	
};

function dragQuat(xdrag, ydrag) {
//==============================================================================
// Called when user drags mouse by 'xdrag,ydrag' as measured in CVV coords.
// We find a rotation axis perpendicular to the drag direction, and convert the 
// drag distance to an angular rotation amount, and use both to set the value of 
// the quaternion qNew.  We then combine this new rotation with the current 
// rotation stored in quaternion 'qTot' by quaternion multiply.  Note the 
// 'draw()' function converts this current 'qTot' quaternion to a rotation 
// matrix for drawing. 
	var res = 5;
	var qTmp = new Quaternion(0,0,0,1);
	
	var dist = Math.sqrt(xdrag*xdrag + ydrag*ydrag);
	// console.log('xdrag,ydrag=',xdrag.toFixed(5),ydrag.toFixed(5),'dist=',dist.toFixed(5));
	qNew.setFromAxisAngle(-ydrag + 0.0001, xdrag + 0.0001, 0.0, dist*150.0);
	// (why add tiny 0.0001? To ensure we never have a zero-length rotation axis)
							// why axis (x,y,z) = (-yMdrag,+xMdrag,0)? 
							// -- to rotate around +x axis, drag mouse in -y direction.
							// -- to rotate around +y axis, drag mouse in +x direction.
							
	qTmp.multiply(qNew,qTot);			// apply new rotation to current rotation. 
	//--------------------------
	// IMPORTANT! Why qNew*qTot instead of qTot*qNew? (Try it!)
	// ANSWER: Because 'duality' governs ALL transformations, not just matrices. 
	// If we multiplied in (qTot*qNew) order, we would rotate the drawing axes
	// first by qTot, and then by qNew--we would apply mouse-dragging rotations
	// to already-rotated drawing axes.  Instead, we wish to apply the mouse-drag
	// rotations FIRST, before we apply rotations from all the previous dragging.
	//------------------------
	// IMPORTANT!  Both qTot and qNew are unit-length quaternions, but we store 
	// them with finite precision. While the product of two (EXACTLY) unit-length
	// quaternions will always be another unit-length quaternion, the qTmp length
	// may drift away from 1.0 if we repeat this quaternion multiply many times.
	// A non-unit-length quaternion won't work with our quaternion-to-matrix fcn.
	// Matrix4.prototype.setFromQuat().
//	qTmp.normalize();						// normalize to ensure we stay at length==1.0.
	qTot.copy(qTmp);
	// show the new quaternion qTot on our webpage in the <div> element 'QuatValue'
	document.getElementById('QuatValue').innerHTML= 
														 '\t X=' +qTot.x.toFixed(res)+
														'i\t Y=' +qTot.y.toFixed(res)+
														'j\t Z=' +qTot.z.toFixed(res)+
														'k\t W=' +qTot.w.toFixed(res)+
														'<br>length='+qTot.length().toFixed(res);
};

function testQuaternions() {
//==============================================================================
// Test our little "quaternion-mod.js" library with simple rotations for which 
// we know the answers; print results to make sure all functions work as 
// intended.
// 1)  Test constructors and value-setting functions:

	var res = 5;
	var myQuat = new Quaternion(1,2,3,4);		
		console.log('constructor: myQuat(x,y,z,w)=', 
		myQuat.x, myQuat.y, myQuat.z, myQuat.w);
	myQuat.clear();
		console.log('myQuat.clear()=', 
		myQuat.x.toFixed(res), myQuat.y.toFixed(res), 
		myQuat.z.toFixed(res), myQuat.w.toFixed(res));
	myQuat.set(1,2, 3,4);
		console.log('myQuat.set(1,2,3,4)=', 
		myQuat.x.toFixed(res), myQuat.y.toFixed(res), 
		myQuat.z.toFixed(res), myQuat.w.toFixed(res));
		console.log('myQuat.length()=', myQuat.length().toFixed(res));
	myQuat.normalize();
		console.log('myQuat.normalize()=', 
		myQuat.x.toFixed(res), myQuat.y.toFixed(res), myQuat.z.toFixed(res), myQuat.w.toFixed(res));
		// Simplest possible quaternions:
	myQuat.setFromAxisAngle(1,0,0,0);
		console.log('Set myQuat to 0-deg. rot. on x axis=',
		myQuat.x.toFixed(res), myQuat.y.toFixed(res), myQuat.z.toFixed(res), myQuat.w.toFixed(res));
	myQuat.setFromAxisAngle(0,1,0,0);
		console.log('set myQuat to 0-deg. rot. on y axis=',
		myQuat.x.toFixed(res), myQuat.y.toFixed(res), myQuat.z.toFixed(res), myQuat.w.toFixed(res));
	myQuat.setFromAxisAngle(0,0,1,0);
		console.log('set myQuat to 0-deg. rot. on z axis=',
		myQuat.x.toFixed(res), myQuat.y.toFixed(res), myQuat.z.toFixed(res), myQuat.w.toFixed(res), '\n');
		
	myQmat = new Matrix4();
	myQuat.setFromAxisAngle(1,0,0, 90.0);	
		console.log('set myQuat to +90-deg rot. on x axis =',
		myQuat.x.toFixed(res), myQuat.y.toFixed(res), myQuat.z.toFixed(res), myQuat.w.toFixed(res));
	myQmat.setFromQuat(myQuat.x, myQuat.y, myQuat.z, myQuat.w);
		console.log('myQuat as matrix: (+y axis <== -z axis)(+z axis <== +y axis)');
		myQmat.printMe();
	
	myQuat.setFromAxisAngle(0,1,0, 90.0);	
		console.log('set myQuat to +90-deg rot. on y axis =',
		myQuat.x.toFixed(res), myQuat.y.toFixed(res), myQuat.z.toFixed(res), myQuat.w.toFixed(res));
	myQmat.setFromQuat(myQuat.x, myQuat.y, myQuat.z, myQuat.w);
		console.log('myQuat as matrix: (+x axis <== +z axis)(+z axis <== -x axis)');
		myQmat.printMe();

	myQuat.setFromAxisAngle(0,0,1, 90.0);	
		console.log('set myQuat to +90-deg rot. on z axis =',
		myQuat.x.toFixed(res), myQuat.y.toFixed(res), myQuat.z.toFixed(res), myQuat.w.toFixed(res));
	myQmat.setFromQuat(myQuat.x, myQuat.y, myQuat.z, myQuat.w);
		console.log('myQuat as matrix: (+x axis <== -y axis)(+y axis <== +x axis)');
		myQmat.printMe();

	// Test quaternion multiply: 
	// (q1*q2) should rotate drawing axes by q1 and then by q2;  it does!
	var qx90 = new Quaternion;
	var qy90 = new Quaternion;
	qx90.setFromAxisAngle(1,0,0,90.0);			// +90 deg on x axis
	qy90.setFromAxisAngle(0,1,0,90.0);			// +90 deg on y axis.
	myQuat.multiply(qx90,qy90);
		console.log('set myQuat to (90deg x axis) * (90deg y axis) = ',
		myQuat.x.toFixed(res), myQuat.y.toFixed(res), myQuat.z.toFixed(res), myQuat.w.toFixed(res));
	myQmat.setFromQuat(myQuat.x, myQuat.y, myQuat.z, myQuat.w);
	console.log('myQuat as matrix: (+x <== +z)(+y <== +x )(+z <== +y');
	myQmat.printMe();
}

function testQuaternions_mod() {
	// Learning Activity 2
	var res = 5;

	// --Create two different Vector4 objects with nonzero elements.
	var v0 = new Vector4([1., 3., 5., 7.]);
	var v1 = new Vector4([2., 4., 6., 8.]);

	// 	--Compute and print their lengths in the console window.
	console.log(`v0.length()=${v0.elements.length}`);
	console.log(`v1.length()=${v1.elements.length}`);
	// --Can any Vector4 member function compute that for you?
	// No

	// --Should you add a new member fcn?
	Vector4.prototype.length = function() {
		return this.elements.length;
	}
	console.log(`v0.length()=${v0.length()}`);
	console.log(`v1.length()=${v1.length()}`);

	// --How can you normalize these vectors?
	function Normalize(opt_src) {
		let ans = new Vector4([0., 0., 0., 0.]);
		let sum = 0;
		for(let i = 0; i < opt_src.length(); i++) {
			sum += Math.pow(opt_src.elements[i], 2);
		}
		ans.elements[0] = Math.sqrt(1 / sum) * opt_src.elements[0];
		ans.elements[1] = Math.sqrt(1 / sum) * opt_src.elements[1];
		ans.elements[2] = Math.sqrt(1 / sum) * opt_src.elements[2];
		ans.elements[3] = Math.sqrt(1 / sum) * opt_src.elements[3];
		return ans;
	}
	let v0_norm = Normalize(v0);
	let v1_norm = Normalize(v1);
	console.log(`v0 norm = ${v0_norm.elements}`);
	console.log(`v1 norm = ${v1_norm.elements}`);

	// --Can you compute a 'dotProduct()' for two Vector4 objects?
	let dot = v0.dot(v1);
	console.log(`v0 dot v1=${dot}`);

	// (Note that some of the code within other functions computes dot products); Wouldn't it be nice to have a Vector4 member function to do this?

	// Try to make one; did it work? test it...

	// --Can you compute a 'crossProduct()' for two Vector4 objects?

	// Can you find a Vector4 member function to do this? Can you make one? Did it work?


	// Learning Activity 3
	// --q0: a LONG Quaternion (magnitude larger than 1) that rotates by +30 degrees around +X axis
	let q0 = new Quaternion(0.5, 0.2, 0.8, 0.4);
	console.log(`constructor: q0(x,y,z,w)=${q0.x} ${q0.y} ${q0.z} ${q0.w}`);
	q0.setFromAxisAngle(1, 0, 0, 30.0);
	console.log(`Set q0 to +30-deg. rot. on x axis=${q0.x.toFixed(res)} ${q0.y.toFixed(res)} ${q0.z.toFixed(res)} ${q0.w.toFixed(res)}`);
	q0.normalize();
	console.log(`q0.normalize()=${q0.x.toFixed(res)} ${q0.y.toFixed(res)} ${q0.z.toFixed(res)} ${q0.w.toFixed(res)}`);
	q0.printMe();

	// --q1: a SHORT Quaternion (magnitude less than 1) that rotates by -45 degrees around the +Z axis
	let q1 = new Quaternion(0.1, 0.2, 0.1, 0.3);
	console.log(`constructor: q1(x,y,z,w)=${q1.x} ${q1.y} ${q1.z} ${q1.w}`);
	q1.setFromAxisAngle(0, 0, 1, -45.0);
	console.log(`Set q1 to +30-deg. rot. on x axis=${q1.x.toFixed(res)} ${q1.y.toFixed(res)} ${q1.z.toFixed(res)} ${q1.w.toFixed(res)}`);
	q1.normalize();
	console.log(`q1.normalize()=${q1.x.toFixed(res)} ${q1.y.toFixed(res)} ${q1.z.toFixed(res)} ${q1.w.toFixed(res)}`);
	q1.printMe();

	// --q2: a Quaternion that rotates by +90 degrees around the (1,1,1) axis
	let q2 = new Quaternion(0.1, 0.1, 0.1, 0.1);
	console.log(`constructor: q2(x,y,z,w)=${q2.x} ${q2.y} ${q2.z} ${q2.w}`);
	q2.setFromAxisAngle(1, 1, 1, 90.0);
	console.log(`Set q2 to +30-deg. rot. on x axis=${q2.x.toFixed(res)} ${q2.y.toFixed(res)} ${q2.z.toFixed(res)} ${q2.w.toFixed(res)}`);
	q2.normalize();
	console.log(`q2.normalize()=${q2.x.toFixed(res)} ${q2.y.toFixed(res)} ${q2.z.toFixed(res)} ${q2.w.toFixed(res)}`);
	q2.printMe();

	// Learning Activity 4
	// Convert q0 and q1 to rotation matrices R0 and R1. Do they agree with our online calculator?
	let R0 = new Matrix4();
	R0.setFromQuat(q0.x, q0.y, q0.z, q0.w);
	console.log('q0 as matrix: (+y axis <== -z axis)(+z axis <== +y axis)');
	R0.printMe(); // Same as online calculator

	let R1 = new Matrix4();
	R1.setFromQuat(q1.x, q1.y, q1.z, q1.w);
	console.log('q1 as matrix: (+y axis <== -z axis)(+z axis <== +y axis)');
	R1.printMe(); // Same as online calculator

	// Learning Activity 5
	// Use Matrix4.concatenate() function (does 4x4 matrix multiply) to make two
	// new matrices by multiplying R0 and R1:
	// [R01] = [R0][R1]  and 
	// [R10] = [R1][R0]
	let R01 = R0.concat(R1);
	console.log('R01');
	R01.printMe();
	let R10 = R1.concat(R0);
	console.log('R10');
	R10.printMe();

	// Learning Activity 6
	// Similarly, use quaternion multiply function to make two new quaternions by multiplying q0 and q1: q01 = q0*q1 and q10 = q1*q0.
	let q01 = new Quaternion(0, 0, 0, 1);
	q01.multiply(q0, q1);
	q01.printMe();
	let q10 = new Quaternion(0, 0, 0, 1);
	q10.multiply(q1, q0);
	q10.printMe();

	// --Convert q01 and q10 to rotation matrices;
	q01_R = new Matrix4();
	q01_R.setFromQuat(q01.x, q01.y, q01.z, q01.w);
	console.log('q01 as matrix: (+y axis <== -z axis)(+z axis <== +y axis)');
	q01_R.printMe(); // Same as online calculator

	q10_R = new Matrix4();
	q10_R.setFromQuat(q10.x, q10.y, q10.z, q10.w);
	console.log('q10 as matrix: (+y axis <== -z axis)(+z axis <== +y axis)');
	q10_R.printMe(); // Same as online calculator

	// Which quaternions (q10 or q10) yields a rotation matrix that matches R01? R10? Why?
	// q01 matches R01
	// q10 matches R10
}