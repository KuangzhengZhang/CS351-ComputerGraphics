let Config = function () {
    // Env
    this.Env = {
        bgClr: [78, 42, 132, 1],
        Width: 1000,
        Height: 650,
        speed: 0.5
    }

    // EnderDragon
    this.EnderDragon = {
        Pause: false,
        Clr: [78, 42, 132, 1],
        Size: 0.2,
        rotSpeed: 45
    }
    // EndCrystal
    this.EndCrystal = {
        speed: 0.5
    }
};

let gl;
let canvas;
let config = new Config();
let gui;

// Position
let mousePos = [];
let EnderDragonPos = [0, 0, 0];

// Angle
let ANGLE_STEP = 45.0;
let currAngle = 0.0;

// Animation
let g_last = Date.now();

// Mouse
let dragMode = false;

let vertices;


// register mouse event
document.onmousedown = mouseDown;
document.onmouseup = mouseUp;
document.onmousemove = mouseMove;

// register key event
document.onkeydown = keyDown;
document.onkeyup = keyUp;
// document.onkeypress = keyPress;

var VSHADER_SOURCE =
    'uniform mat4 u_ModelMatrix;\n' +
    'attribute vec4 a_Position;\n' +
    'attribute vec4 a_Color;\n' +
    'varying vec4 v_Color;\n' +
    'void main() {\n' +
    '   gl_Position = u_ModelMatrix * a_Position;\n' +
    '   gl_PointSize = 10.0;\n' +
    '   v_Color = a_Color;\n' +
    '}\n';

var FSHADER_SOURCE =
    'precision mediump float;\n' +
    'uniform mat4 u_ColorMatrix;\n' +
    'varying vec4 v_Color;\n' +
    'void main() {\n' +
    '  gl_FragColor = u_ColorMatrix * v_Color;\n' +
    '}\n';

function initCfg() {
    gui = new dat.GUI({ name: 'GUI' });
    gui.width = 270;
    gui.remember(config);
    // Env
    let Env = gui.addFolder('Env');
    bgClr = Env.addColor(config.Env, 'bgClr').listen();
    bgClr.onChange(() => {
        gl.clearColor(config.Env.bgClr[0] / 255, config.Env.bgClr[1] / 255, config.Env.bgClr[2] / 255, config.Env.bgClr[3]);
        gl.clear(gl.COLOR_BUFFER_BIT);
        console.debug(`Env.bgClr set to: ${config.Env.bgClr}`);
    });
    Env.add(config.Env, 'Width', 0, 1000).listen();
    Env.add(config.Env, 'Height', 0, 1000).listen();
    Env.add(config.Env, 'speed', -10, 10).listen();
    Env.open();

    // EnderDragon
    let EnderDragon = gui.addFolder('EnderDragon');
    EnderDragon.add(config.EnderDragon, 'Pause').listen();
    EnderDragon.addColor(config.EnderDragon, 'Clr').listen();
    EnderDragon.add(config.EnderDragon, 'Size', 0, 1).listen();
    EnderDragon.add(config.EnderDragon, 'rotSpeed', -180, 180).listen();
    EnderDragon.open();

    // EndCrystal
    let EndCrystal = gui.addFolder('EndCrystal');
    EndCrystal.add(config.EndCrystal, 'speed', -10, 10).listen();
    EndCrystal.open();
}

function initMenu() {
    // let menu = new dat.GUI({ name: 'MENU' });
    // let Env = menu.addFolder('Env');
    // a = Env.addColor(config.Env, 'bgClr').listen();
}

function getMousePos(event) {
    let rect = canvas.getBoundingClientRect();
    return {
        rect: rect,
        x: (event.clientX - rect.left) / (rect.right - rect.left) * canvas.width,
        y: (event.clientY - rect.top) / (rect.bottom - rect.top) * canvas.height
    }
}

function isMouseInCanvas() {
    let pos = getMousePos(event);
    let x = pos.x;
    let y = pos.y;
    return pos.rect.left < x && x < pos.rect.right && pos.rect.top < y && y < pos.rect.bottom
}

function mouseDown(event) {
    if (isMouseInCanvas()) { dragMode = true };
    console.debug(`MouseDownEvent: Position = (${event.offsetX}, ${event.offsetY})`);
}

function mouseUp(event) {
    dragMode = false;
    console.debug(`MouseUpEvent: Position = (${event.offsetX}, ${event.offsetY})`);
}

function mouseMove(event) {
    let pos = getMousePos(event);
    let x = pos.x;
    let y = pos.y;
    if (dragMode) {
        EnderDragonPos[0] = x * 2 / (pos.rect.right - pos.rect.left) - 1;
        EnderDragonPos[1] = - y * 2 / (pos.rect.bottom - pos.rect.top) + 1;
    }
    document.getElementById('mousePos').innerHTML = `Mouse Position: (${x}, ${y})`;
    // console.debug(`MouseMoveEvent: Position = (${x}, ${y})`);
}

function keyDown(event) {
    if (event.isComposing || event.keyCode === 229) {
        return;
    }
    console.debug(`KeyDownEvent: key='${event.key}' | code='${event.code}'`);
}

function keyUp(event) {
    if (event.isComposing || event.keyCode === 229) {
        return;
    }
    console.debug(`KeyUpEvent: key='${event.key}' | code='${event.code}'`);
}

async function initVertexBuffer() {
    // let n = await genVertices(EnderDragon_OBJ1);
    // let n = await genVertices(EnderDragon_OBJ2);

    vertices = EnderDragon_OBJ2;
    n = parseInt(vertices.length / 7);
    console.log(n);

    // Create a buffer object
    var vertexBuffer = gl.createBuffer();
    if (!vertexBuffer) {
        console.log('Failed to create the buffer object');
        return false;
    }

    // Bind the buffer object to target
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    // Write date into the buffer object
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);
    let FSIZE = vertices.BYTES_PER_ELEMENT;

    var a_Position = gl.getAttribLocation(gl.program, 'a_Position');
    if (a_Position < 0) {
        console.log('Failed to get the storage location of a_Position');
        return -1;
    }
    // Assign the buffer object to a_Position variable
    gl.vertexAttribPointer(a_Position, 4, gl.FLOAT, false, FSIZE * 7, 0);

    // Enable the assignment to a_Position variable
    gl.enableVertexAttribArray(a_Position);


    var a_Color = gl.getAttribLocation(gl.program, 'a_Color');
    if (a_Color < 0) {
        console.log('Failed to get the storage location of a_Color');
        return -1;
    }
    // Assign the buffer object to a_Color variable
    gl.vertexAttribPointer(a_Color, 3, gl.FLOAT, false, FSIZE * 7, FSIZE * 4);

    // Enable the assignment to a_Color variable
    gl.enableVertexAttribArray(a_Color);

    gl.bindBuffer(gl.ARRAY_BUFFER, null);

    return n;
}

function draw(currAngle, modelMatrix, u_ModelMatrix, colorMatrix, u_ColorMatrix) {
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    // modelMatrix
    modelMatrix.setTranslate(EnderDragonPos[0], EnderDragonPos[1], EnderDragonPos[2]);
    modelMatrix.scale(config.EnderDragon.Size, config.EnderDragon.Size, config.EnderDragon.Size);
    modelMatrix.rotate(currAngle, 0, 1, 0);

    // colorMatrix
    colorMatrix.setTranslate(config.EnderDragon.Clr[0] / 255, config.EnderDragon.Clr[0] / 255, config.EnderDragon.Clr[0] / 255);

    gl.uniformMatrix4fv(u_ModelMatrix, false, modelMatrix.elements);
    gl.uniformMatrix4fv(u_ColorMatrix, false, colorMatrix.elements);
    gl.drawArrays(gl.TRIANGLES, 0, n);
}

function animate(angle) {
    if (config.EnderDragon.Pause) {
        g_last = Date.now();
        return angle;
    }
    let now = Date.now();
    let elapsed = now - g_last;
    g_last = now;

    let newAngle = angle + (config.EnderDragon.rotSpeed * elapsed) / 1000.0;
    return newAngle %= 360;
}

async function genVertices(data) {
    // Process data
    data = data.trim().split('\n'); // split by line
    let vertice = []; // save v in obj
    let fragment = []; // save f in obj
    let max = - Math.pow(10, 10000);
    let min = Math.pow(10, 10000);
    data.forEach(line => {
        if (line.startsWith('v ')) {
            let tmp = line.substring(1).trim().split(/\s+/).map(x => parseFloat(x));
            if (Math.max(...tmp) > max) { max = Math.max(...tmp) }
            if (Math.min(...tmp) < min) { min = Math.min(...tmp) }
            tmp.push(1.0);
            vertice.push(tmp);
        } else if (line.startsWith('f ')) {
            let tmp = line.substring(1).trim().split(/\s+/).map(x => parseInt(x) - 1);
            fragment.push(tmp);
        }
    })

    // for (let i = 0; i < data.length - 3; i += 3) {
    //     let color1 = Math.random();
    //     let color2 = Math.random();
    //     let color3 = Math.random();
    //     for (let j = 0; j < 3; j++) {
    //         let line = data[i + j];
    //         if (line.startsWith('v ')) {
    //             let tmp = line.substring(1).trim().split(/\s+/).map(x => parseFloat(x));
    //             if (Math.max(...tmp) > max) { max = Math.max(...tmp) }
    //             if (Math.min(...tmp) < min) { min = Math.min(...tmp) }
    //             tmp.push(1.0);
    //             tmp.push(color1);
    //             tmp.push(color2);
    //             tmp.push(color3);
    //             vertice.push(tmp);
    //         } else if (line.startsWith('f ')) {
    //             let tmp = line.substring(1).trim().split(/\s+/).map(x => parseInt(x) - 1);
    //             fragment.push(tmp);
    //         }
    //     }
    // }
    max = Math.max(Math.abs(max), Math.abs(min));

    let fragmentNum = fragment.length;

    let n = fragmentNum * 3; // The number of vertices
    vertices = new Float32Array(n * 7);

    // Generate vertices
    for (let i = 0; i < fragmentNum; i++) {
        idx1 = fragment[i][0];
        idx2 = fragment[i][1];
        idx3 = fragment[i][2];

        for (let j = 0; j < 7; j++) {
            if (j < 3) {
                vertices[i * 7 * 3 + j] = vertice[idx1][j] / max;
            } else if (j == 3) {
                vertices[i * 7 * 3 + j] = vertice[idx1][j];
            } else {
                vertices[i * 7 * 3 + j] = Math.random();
                // vertices[i * 7 * 3 + j] = vertice[idx1][j];
            }
        }
        for (let j = 0; j < 7; j++) {
            if (j < 3) {
                vertices[i * 7 * 3 + j + 7] = vertice[idx2][j] / max;
            } else if (j == 3) {
                vertices[i * 7 * 3 + j + 7] = vertice[idx2][j];
            } else {
                vertices[i * 7 * 3 + j + 7] = Math.random();
                // vertices[i * 7 * 2 + j + 7] = vertice[idx2][j];
            }
        }
        for (let j = 0; j < 7; j++) {
            if (j < 3) {
                vertices[i * 7 * 3 + j + 7 * 2] = vertice[idx3][j] / max;
            } else if (j == 3) {
                vertices[i * 7 * 3 + j + 7 * 2] = vertice[idx3][j];
            } else {
                vertices[i * 7 * 3 + j + 7 * 2] = Math.random();
                // vertices[i * 7 * 3 + j + 7 * 2] = vertice[idx3][j];
            }
        }
    }
    console.log('vertices:');
    console.log(vertices);
    return n;
}

async function main() {
    initCfg();
    initMenu();

    // Retrieve <canvas> element
    canvas = document.getElementById('webgl');
    canvas.width = config.Env.Width;
    canvas.height = config.Env.Height;

    // Get the rendering context for WebGL
    gl = getWebGLContext(canvas);
    if (!gl) {
        console.log('Failed to get the rendering context for WebGL');
        return;
    }

    // Initialize shaders
    if (!initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE)) {
        console.log('Failed to intialize shaders.');
        return;
    }

    n = await initVertexBuffer();
    if (n < 0) {
        console.log('Failed to set the vertex information');
        return;
    }

    var u_ModelMatrix = gl.getUniformLocation(gl.program, 'u_ModelMatrix');
    if (!u_ModelMatrix) {
        console.log('Failed to get the storage location of u_ModelMatrix');
        return;
    }
    var u_ColorMatrix = gl.getUniformLocation(gl.program, 'u_ColorMatrix');
    if (!u_ColorMatrix) {
        console.log('Failed to get the storage location of u_ColorMatrix');
        return;
    }
    // Create a local version of our model matrix in JavaScript 
    var modelMatrix = new Matrix4();
    // Constructor for 4x4 matrix, defined in the 'cuon-matrix-quat03.js' library
    // supplied by your textbook.  (Chapter 3)

    // Initialize the matrix: 
    modelMatrix.setIdentity(); // (not req'd: constructor makes identity matrix)
    var colorMatrix = new Matrix4();
    colorMatrix.setIdentity();

    // Transfer modelMatrix values to the u_ModelMatrix variable in the GPU
    gl.uniformMatrix4fv(u_ModelMatrix, false, modelMatrix.elements);

    gl.enable(gl.DEPTH_TEST);
    // Specify the color for clearing <canvas>
    gl.clearColor(config.Env.bgClr[0] / 255, config.Env.bgClr[1] / 255, config.Env.bgClr[2] / 255, config.Env.bgClr[3]);

    // Clear <canvas>
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    gl.drawArrays(gl.TRIANGLES, 0, n);

    let tick = function () {
        currAngle = animate(currAngle);  // Update the rotation angle
        draw(currAngle, modelMatrix, u_ModelMatrix, colorMatrix, u_ColorMatrix);   // Draw shapes
        // console.debug(`currAngle = ${currAngle}`);
        requestAnimationFrame(tick, canvas);
    };
    tick();
}