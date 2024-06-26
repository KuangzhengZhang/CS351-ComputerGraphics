// HelloPoint1.js (c) 2012 matsuda
// Vertex shader program
/*
// MODIFIED J. Tumblin 1/2017  to make 'HelloMatrixDegen.js'. 
// MODIFIED J. Tumblin 1/2017 to make 'HelloQuaternion.js' 

Simple program to test basic quaternion operations using the 'Quaternion'
objects and functions found in ../lib/cuon-matrix-quat03.js

--Includes code to encourage exploring basic vector/matrix operations;
-- Demonstrate that matrices have finite precision, and thus contain tiny errors that can accumulate. THUS you should never write code that endlessly concatenates rotation-only matrices (e.g. an 'orientation' matrix made by continually re-applying rotation matrices), because eventually the result accumulates numerical errors that cause wholly unpredictable non-rotation transforms, including non-uniform scale, translation, shear, skew, and even unwanted projective distortions.  These matrices 'degenerate' -- they're no longer pure 3D  rotations!

-- Further code encourages exploring quaternion operations.

Nothing interesting happens in the canvas -- it's all in the console!
*/

var VSHADER_SOURCE = 
  'void main() {\n' +
  '  gl_Position = vec4(0.0, 0.0, 0.0, 1.0);\n' + // Set the vertex coordinates of the one and only point
  '  gl_PointSize = 10.0;\n' +                    // Set the point size. CAREFUL! MUST be float, not integer value!!
  '}\n';

// Fragment shader program
var FSHADER_SOURCE =
  'void main() {\n' +
  '  gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);\n' + // Set the point color
  '}\n';

function main() {
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
  console.log('Hey! we have all our shaders initialized!');

  // Specify the color for clearing <canvas>
  gl.clearColor(0.0, 0.0, 0.0, 1.0);

  // Clear <canvas>
  gl.clear(gl.COLOR_BUFFER_BIT);

  // Draw a point
  gl.drawArrays(gl.POINTS, 0, 1);

  /*
  //============================================================
  // Lets play around with Vector4 objects:
  //============================================================
  
  var aVec = new Vector4();   
  var bVec = new Vector4();
  aVec[0] = 4.0; aVec[1] = 3.0; aVec[2] = 2.0; aVec[3] = 0.0;   
  bVec[0] = 1.0; bVec[1] = 2.0; bVec[2] = 3.0; bVec[3] = 0.0;
  // x,y,z,w=0 (vector, not point)
  console.log('\n---------------Vector4 Ops------------\n');
  res = 3;		// number of digits we will print on console log
  tmp = aVec;	// (temporary var so we don't change aVec or bVec)
  console.log('aVec: x=', tmp[0].toFixed(res), 
										'y=', tmp[1].toFixed(res), 
									  'z=', tmp[2].toFixed(res), 
									 	'w=', tmp[3].toFixed(res),'\n');
  tmp = bVec;
  console.log('bVec: x=', tmp[0].toFixed(res), 
										'y=', tmp[1].toFixed(res), 
										'z=', tmp[2].toFixed(res), 
									 	'w=', tmp[3].toFixed(res),'\n');
	console.log('or equivalently, in the cuon-matrix-quat03.js library');
	console.log('you will find \'printMe()\' fcns for Vector4, Matrix4, and Quaternion objects.');
	console.log('aVec.printMe() yields:');
	aVec.printMe();
	console.log('bVec.printMe() yields:');
	bVec.printMe();
	console.log('Add more tests of your own--see HTML file for instructions...');
	// You add more here ... see our HTML file for instructions...
	*/
	
	
  //============================================================
	// Lets play around with Matrix4 objects
  //============================================================
  var aMat = new Matrix4();
	aMat.setIdentity();
	var mySiz = 3000;
	var count;
	
	console.log('Rotate aMat by (360/'+mySiz+') degrees\n around the (1,3,5) axis,'+mySiz+' times:');
	for(count = 0; count < mySiz; count++) {
			aMat.rotate(-360.0/mySiz, 1.0, 3.0, 5.0);
		}
		console.log('Result SHOULD be a perfect identity matrix, but it is not:');
		aMat.printMe();
		console.log('Instead, this degenerate matrix accumulated errors that');
		console.log('cause other, unpredictable, non-rotation transforms.  BAD!');
		console.log('THUS you should never use matrix multiplies to combine a');
		console.log('long series of rotations.  Instead, use quaternions.');
		console.log('NOTE: open the .js file and the HTML file; \n Plenty to explore, comment & uncomment!');

	//============================================================
	//  Let's play around with Quaternion objects
	//============================================================
	/* I found these Quaternion member functions:
				Constructor: Quaternion(x,y,z,w);
				clear();
				copy(q);
--> 		printMe();
-->			setFromAxisAngle(ax, ay, az, angleDeg);
				UNFINISHED: setFromEuler(AlphaDeg, BetaDeg, gammaDeg);
-->			setFromRotationMatrix(m);
				calculateW();
				inverse();
				length();
-->			normalize();
				multiplySelf(quat2);
-->			multiply(q1,q2);
				multiplyVector3(vec, dest);
				slerp(qa,ab,qm,t);
	I also found this Matrix4 member:
			setFromQuat(qx,qy,qz,qw);
	*/	
		
/*	
	console.log('------------------Try some Quaternions--------------------');
// GLOBAL variables:
var q0 = new Quaternion(); 	
var q1 = new Quaternion();
var R0 = new Matrix4();
var R1 = new Matrix4();
	console.log('q0 made with empty constructor:');
	q0.printMe();
	console.log('convert this default q0 to matrix R0; makes identity matrix:');
	R0.setFromQuat(q0.x, q0.y, q0.z, q0.w);
	R0.printMe();
	console.log('YES! AGREES with online quaternion calculator!');
	console.log('set q0 to axis 2,0,0; +30deg.-----------------');
	console.log('Call setFromAxisAngle(2,0,0, 30.0) -- it always creates a UNIT quaternion:');
	q0.setFromAxisAngle(2,0,0, 30.0);
	q0.printMe();
	console.log('q0 length==',q0.length());
	console.log('convert q0 to matrix R0:');
	R0.setFromQuat(q0.x, q0.y, q0.z, q0.w);
	R0.printMe();
	console.log('YES! AGREES with online quaternion calculator!');
	console.log('set q1 to axis 0,0,0.2; -45deg.---------------');
	q1.setFromAxisAngle(0,0,0.2, -45.0);
	q1.printMe();
	console.log('q1 length==',q0.length());
	console.log('convert q1 to matrix R1:');
	R1.setFromQuat(q1.x, q1.y, q1.z, q1.w);
	R1.printMe();
	console.log('YES! AGREES with online quaternion calculator!');
*/
	
	/*
	*
	*
	*  YOU write the rest ...
	*  (Be sure you try the quaternion multiply vs. matrix multiply)
	*
	*/
	console.log('===========================================================');
	testQuaternions();
	}

function testQuaternions() {
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
	// (Note that some of the code within other functions computes dot products); Wouldn't it be nice to have a Vector4 member function to do this?
	// Try to make one; did it work? test it...
	let dot = v0.dot(v1);
	console.log(`v0 dot v1=${dot}`);

	// --Can you compute a 'crossProduct()' for two Vector4 objects?
	// Can you find a Vector4 member function to do this? Can you make one? Did it work?
	let cross = v0.cross(v1).elements;
	console.log(`v0 cross v1=${cross}`);


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
	console.log('q0 as matrix:');
	R0.printMe(); // Same as online calculator
	console.log('YES! AGREES with online quaternion calculator!');

	let R1 = new Matrix4();
	R1.setFromQuat(q1.x, q1.y, q1.z, q1.w);
	console.log('q1 as matrix:');
	R1.printMe(); // Same as online calculator
	console.log('YES! AGREES with online quaternion calculator!');

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
	let q01 = new Quaternion();
	q01.multiply(q0, q1);
	q01.printMe();
	let q10 = new Quaternion();
	q10.multiply(q1, q0);
	q10.printMe();

	// --Convert q01 and q10 to rotation matrices;
	q01_R = new Matrix4();
	q01_R.setFromQuat(q01.x, q01.y, q01.z, q01.w);
	console.log('q01 as matrix:');
	q01_R.printMe(); // Same as online calculator
	console.log('YES! AGREES with online quaternion calculator!');

	q10_R = new Matrix4();
	q10_R.setFromQuat(q10.x, q10.y, q10.z, q10.w);
	console.log('q10 as matrix:');
	q10_R.printMe(); // Same as online calculator
	console.log('YES! AGREES with online quaternion calculator!');

	// Which quaternions (q01 or q10) yields a rotation matrix that matches R01? R10? Why?
	// q01 matches R01
	// both q01 and q10 doesn't match R10. q10 is right and R10 is wrong. This is because Matrix4.concat() will modify the object that calls this function, so R0 will be modified after `let R01 = R0.concat(R1);`, which leads to the wrong result of R10.
}
