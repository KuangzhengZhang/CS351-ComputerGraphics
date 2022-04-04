//3456789_123456789_123456789_123456789_123456789_123456789_123456789_123456789_
// (JT: why the numbers? counts columns, helps me keep 80-char-wide listings)
//
// MultiPoint.js (c) 2012 matsuda
// MultiPointJT.js  MODIFIED for EECS 351-1, Northwestern Univ. Jack Tumblin
//						(converted to 2D->4D; 3 verts --> 6 verts; draw as
//						gl.POINTS and as gl.LINE_LOOP, change color.
//
// Vertex shader program.  
//  Each instance computes all the on-screen attributes for just one VERTEX,
//  specifying that vertex so that it can be used as part of a drawing primitive
//  depicted in the CVV coord. system (+/-1, +/-1, +/-1) that fills our HTML5
//  'canvas' object.
// Each time the shader program runs it gets info for just one vertex from our 
//	Vertex Buffer Object (VBO); specifically, the value of its 'attribute' 
// variable a_Position, is supplied by the VBO.
// 
//   CHALLENGE: Change the program to get different pictures. 
//	See if you can:
//	EASY:
//    --change the background color?
//		--change the dot positions? 
//		--change the size of the dots?
//    --change the color of the dots-and-lines?
//	HARDER: (HINT: read about 'uniform' vars in your textbook...)
//    --change the number of dots?
//    --get all dots in one color, and all lines in another color?
//    --set each dot color individually? (what happens to the line colors?)
//
var VSHADER_SOURCE =
  'attribute vec4 a_Position;\n' +
  'void main() {\n' +
  '  gl_Position = a_Position;\n' +
  '  gl_PointSize = 10.0;\n' +
  '}\n';

// Fragment shader program
//  Each instance computes all the on-screen attributes for just one PIXEL
var FSHADER_SOURCE =
  'void main() {\n' +
  '  gl_FragColor = vec4(0.0, 1.0, 0.0, 1.0);\n' +
  '}\n';

async function main() {
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

  // Write buffer full of vertices to the GPU, and make it available to shaders
  var n = await initVertexBuffers(gl);
  if (n < 0) {
    console.log('Failed to load vertices into the GPU');
    return;
  }

  // Specify the color for clearing <canvas>: (Northwestern purple)
  gl.clearColor(78 / 255, 42 / 255, 132 / 255, 1.0);	// R,G,B,A (A==opacity)

  // Clear <canvas>
  gl.clear(gl.COLOR_BUFFER_BIT);

  // Draw connect-the-dots for 6 vertices (never 'vertexes'!!).
  // see http://www.khronos.org/opengles/sdk/docs/man/xhtml/glDrawArrays.xml
  gl.drawArrays(gl.LINES, 0, n); // gl.drawArrays(mode, first, count)
  //mode: sets drawing primitive to use. Other valid choices: 
  // gl.LINES, gl.LINE_STRIP, gl.LINE_LOOP, 
  // gl.TRIANGLES, gl.TRIANGLES_STRIP, gl.TRIANGLE_FAN
  // first: index of 1st element of array.
  // count; number of elements to read from the array.

  // That went well. Let's draw the dots themselves!
  gl.drawArrays(gl.POINTS, 0, n); // gl.drawArrays(mode, first, count)
  //mode: sets drawing primitive to use. Other valid choices: 
  // gl.LINES, gl.LINE_STRIP, gl.LINE_LOOP, 
  // gl.TRIANGLES, gl.TRIANGLES_STRIP, gl.TRIANGLE_FAN
  // first: index of 1st element of array.
  // count; number of elements to read from the array.
}


async function initVertexBuffers(gl) {
  //==============================================================================
  // let filepath = './obj/octahedron.obj';
  // let filepath = './obj/icosahedron.obj';
  let filepath = './obj/shuttle.obj';

  res = await genVertices(filepath);
  var vertices = res[0];
  var n = res[1];
  // Then in the Graphics hardware, create a vertex buffer object (VBO)
  var vertexBuffer = gl.createBuffer();	// get it's 'handle'
  if (!vertexBuffer) {
    console.log('Failed to create the buffer object');
    return -1;
  }

  // Bind the buffer object to target
  gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
  // COPY data from our 'vertices' array into the vertex buffer object in GPU:
  gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

  var a_PositionID = gl.getAttribLocation(gl.program, 'a_Position');
  if (a_PositionID < 0) {
    console.log('Failed to get the storage location of a_Position');
    return -1;
  }
  // Assign the buffer object to a_Position variable
  gl.vertexAttribPointer(a_PositionID, 4, gl.FLOAT, false, 0, 0);
  // vertexAttributePointer(index, x,y,z,w size=4, type=FLOAT, 
  // NOT normalized, NO stride)

  // Enable the assignment to a_Position variable
  gl.enableVertexAttribArray(a_PositionID);

  return n;
}

async function genVertices(filepath) {
  // Read obj file
  let response = await fetch(filepath);
  let data = await response.text();

  // Process data
  data = data.trim().split('\n'); // split by line
  let vertice = []; // save v in obj
  let fragment = []; // save f in obj
  let max = - Math.pow(10, 10000);
  let min = Math.pow(10, 10000);
  data.forEach(line => {
    if (line.startsWith('v')) {
      let tmp = line.substring(1).trim().split(/\s+/).map(x => parseFloat(x));
      if (Math.max(...tmp) > max) { max = Math.max(...tmp) }
      if (Math.min(...tmp) < min) { min = Math.min(...tmp) }
      tmp.push(1.0);
      vertice.push(tmp);
    } else if (line.startsWith('f')) {
      let tmp = line.substring(1).trim().split(/\s+/).map(x => parseInt(x) - 1);
      fragment.push(tmp);
    }
  })
  console.log('max: ' + max + '    min: ' + min);
  max = Math.max(Math.abs(max), Math.abs(min));
  
  // Generate vertices pairs
  let pairs = [];
  let fragmentNum = fragment.length;
  for (let i = 0; i < fragmentNum; i++) {
    for (let j = 0; j < 3; j++) {
      let pair = [fragment[i][j], fragment[i][(j + 1) % 3]].sort((a, b) => a - b);
      pairs.push(pair);
    }
  }
  pairs = deduplicate(pairs);
  pairsNum = pairs.length;
  // console.log(pairs);

  // let n = vertice.length; // The number of vertices
  let n = pairsNum * 2; // The number of vertices
  // first, create an array with all our vertex attribute values:
  var vertices = new Float32Array(pairsNum * 4 * 2);

  // Generate vertices
  for (let i = 0; i < pairsNum; i++) {
    idx1 = pairs[i][0];
    idx2 = pairs[i][1];
    for (let j = 0; j < 4; j++) {
      if (j == 3) { // alpha
        vertices[i * 4 * 2 + j] = vertice[idx1][j];
      } else {
        // vertices[i * 4 * 2 + j] = vertice[idx1][j];
        vertices[i * 4 * 2 + j] = vertice[idx1][j] / max;
        // vertices[i * 4 * 2 + j] = vertice[idx1][j] > 0 ? vertice[idx1][j] / max : vertice[idx1][j] / Math.abs(min);
      }
    }
    for (let j = 0; j < 4; j++) {
      if (j == 3) { // alpha
        vertices[i * 4 * 2 + j + 4] = vertice[idx2][j];
      } else {
        // vertices[i * 4 * 2 + j + 4] = vertice[idx2][j];
        vertices[i * 4 * 2 + j + 4] = vertice[idx2][j] / max;
        // vertices[i * 4 * 2 + j + 4] = vertice[idx2][j] > 0 ? vertice[idx2][j] / max : vertice[idx2][j] / Math.abs(min);
      }
    }
  }
  console.log('vertices:');
  console.log(vertices);
  return [vertices, n];
}

function deduplicate(arr) {
  obj = {};
  res = [];
  arr.map(e => {
    if (!obj.hasOwnProperty(e)) {
      obj[e] = e;
      res.push(e);
    }
  })
  return res;
}
