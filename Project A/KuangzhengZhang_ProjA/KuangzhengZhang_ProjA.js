let Config = function () {
    // Env
    this.Env = {
        bgClr: [78, 42, 132, 1],
        Width: 650,
        Height: 650,
        speed: 0.5
    }

    // EnderDragon
    this.EnderDragon = {
        Body: {
            Pause: true,
            Clr: [78, 42, 132, 1],
            Size: 0.3,
            rotSpeed: 45,
            angle: 0,
            rotDir: true
        },
        Tail: {
            Pause: true,
            Clr: [78, 42, 132, 1],
            Size: 0.3,
            rotSpeed: 45,
            angle: 0,
            rotDir: true,
            rotMaxAngle: 45,
            rotMinAngle: -45
        },
        Wing: {
            Pause: true,
            Clr: [78, 42, 132, 1],
            Size: 0.3,
            rotSpeed: 45,
            angle: 0,
            rotDir: true,
            rotMaxAngle: 45,
            rotMinAngle: -45
        }
    }
    // EndCrystal
    this.EndCrystal = {
        speed: 0.5
    }
};

// const
const floatsPerVertex = 7;

let gl;
let canvas;
let config = new Config();
let gui;

let modelMatrix = new Matrix4();
let colorMatrix = new Matrix4();

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

let Info = {
    EnderDragon: {
        Body: {
            vertices: null,
            n: null,
            position: null
        },
        Tail: {
            vertices: null,
            n: null,
            position: null
        },
        n: null
    },
    n: 0
};
let vertices;
let n;


// register mouse event
document.onmousedown = mouseDown;
document.onmouseup = mouseUp;
document.onmousemove = mouseMove;

// register key event
document.onkeydown = keyDown;
document.onkeyup = keyUp;
// document.onkeypress = keyPress;

var VSHADER_SOURCE =
    'attribute vec4 a_Position;\n' +
    'attribute vec4 a_Color;\n' +
    'uniform mat4 u_ModelMatrix;\n' +
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
    Env.addColor(config.Env, 'bgClr').listen();
    Env.add(config.Env, 'Width', 0, 1000).listen();
    Env.add(config.Env, 'Height', 0, 1000).listen();
    Env.add(config.Env, 'speed', -10, 10).listen();
    Env.open();

    // EnderDragon
    let EnderDragon = gui.addFolder('EnderDragon');
    let EnderDragonBody = EnderDragon.addFolder('Body');
    EnderDragonBody.add(config.EnderDragon.Body, 'Pause').listen();
    EnderDragonBody.addColor(config.EnderDragon.Body, 'Clr').listen();
    EnderDragonBody.add(config.EnderDragon.Body, 'Size', 0, 1).listen();
    EnderDragonBody.add(config.EnderDragon.Body, 'rotSpeed', -180, 180).listen();

    let EnderDragonTail = EnderDragon.addFolder('Tail');
    EnderDragonTail.add(config.EnderDragon.Tail, 'Pause').listen();
    EnderDragonTail.addColor(config.EnderDragon.Tail, 'Clr').listen();
    EnderDragonTail.add(config.EnderDragon.Tail, 'Size', 0, 1).listen();
    EnderDragonTail.add(config.EnderDragon.Tail, 'rotSpeed', -180, 180).listen();
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

function initVertexBuffer() {
    defEnderDragonBody();
    defEnderDragonTail();
    console.log(Info)
    n = Info.n;
    vertices = new Float32Array(n * floatsPerVertex);
    for (const [k1, v1] of Object.entries(Info)) {
        if (k1 != n) {
            for (const [k2, v2] of Object.entries(v1)) {
                if (k2 != n) {
                    for (let i = 0; i < v2.n * 7; i++) {
                        vertices[v2.position * floatsPerVertex + i] = v2.vertices[i];
                    }
                }
            }
        }
    }
    console.log(vertices);
    // vertices = Cube;
    // n = parseInt(vertices.length / 7);
    // console.log(n);

    // vertexBuffer
    var vertexBuffer = gl.createBuffer();
    if (!vertexBuffer) {
        console.log('Failed to create the buffer object');
        return false;
    }
    let FSIZE = vertices.BYTES_PER_ELEMENT;
    // Bind the buffer object to target
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    // Write date into the buffer object
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);
    var a_Position = gl.getAttribLocation(gl.program, 'a_Position');
    if (a_Position < 0) {
        console.log('Failed to get the storage location of a_Position');
        return -1;
    }
    // Assign the buffer object to a_Position variable
    gl.vertexAttribPointer(a_Position, 4, gl.FLOAT, false, FSIZE * 7, 0);
    // Enable the assignment to a_Position variable
    gl.enableVertexAttribArray(a_Position);

    // Color
    var a_Color = gl.getAttribLocation(gl.program, 'a_Color');
    if (a_Color < 0) {
        console.log('Failed to get the storage location of a_Color');
        return -1;
    }
    // Assign the buffer object to a_Color variable
    gl.vertexAttribPointer(a_Color, 3, gl.FLOAT, false, FSIZE * 7, FSIZE * 4);
    // Enable the assignment to a_Color variable
    gl.enableVertexAttribArray(a_Color);

    return Info.n;
}

function draw(interval, modelMatrix, u_ModelMatrix, u_ColorMatrix) {
    // Clear
    gl.clearColor(config.Env.bgClr[0] / 255, config.Env.bgClr[1] / 255, config.Env.bgClr[2] / 255, config.Env.bgClr[3]);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    colorMatrix.setTranslate(config.EnderDragon.Body.Clr[0] / 255, config.EnderDragon.Body.Clr[0] / 255, config.EnderDragon.Body.Clr[0] / 255);
    gl.uniformMatrix4fv(u_ColorMatrix, false, colorMatrix.elements);

    // Body modelMatrix
    drawEnderDragonBody(interval, modelMatrix, u_ModelMatrix);
    drawEnderDragonTail(interval, modelMatrix, u_ModelMatrix);
}

function animate(angle) {
    if (config.EnderDragon.Body.Pause) {
        g_last = Date.now();
        return angle;
    }
    let now = Date.now();
    let elapsed = now - g_last;
    g_last = now;

    let newAngle = angle + (config.EnderDragon.Body.rotSpeed * elapsed) / 1000.0;
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

function initArrayBuffer(gl, attribute, data, type, num) {
    // Create a buffer object
    var buffer = gl.createBuffer();
    if (!buffer) {
        console.log('Failed to create the buffer object');
        return false;
    }
    // Write date into the buffer object
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW);

    // Assign the buffer object to the attribute variable
    var a_attribute = gl.getAttribLocation(gl.program, attribute);
    if (a_attribute < 0) {
        console.log('Failed to get the storage location of ' + attribute);
        return false;
    }
    gl.vertexAttribPointer(a_attribute, num, type, false, 0, 0);
    // Enable the assignment of the buffer object to the attribute variable
    gl.enableVertexAttribArray(a_attribute);

    return true;
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

    n = initVertexBuffer();
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

    modelMatrix.setIdentity();
    colorMatrix.setIdentity();

    gl.enable(gl.DEPTH_TEST);
    // Specify the color for clearing <canvas>
    gl.clearColor(config.Env.bgClr[0] / 255, config.Env.bgClr[1] / 255, config.Env.bgClr[2] / 255, config.Env.bgClr[3]);

    // Clear <canvas>
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    gl.drawArrays(gl.TRIANGLES, 0, n);

    let tick = function () {
        let now = Date.now();
        let interval = now - g_last;
        g_last = now;
        draw(interval, modelMatrix, u_ModelMatrix, u_ColorMatrix);
        // console.debug(`currAngle = ${currAngle}`);
        requestAnimationFrame(tick, canvas);
    };
    tick();
}

function updateInfo(Level1, Level2, Vertices) {
    Info[Level1][Level2].vertices = Vertices;
    Info[Level1][Level2].position = Info.n;
    Info[Level1][Level2].n = Vertices.length / floatsPerVertex;
    Info[Level1].n += Info[Level1][Level2].n;
    Info.n += Info[Level1][Level2].n;
}

// Draw
function defEnderDragonBody() {
    let EnderDragonBody_Vertices = new Float32Array([
        // front
        -0.1, -0.1, 0.25, 1.0, 1.0, 0.0, 0.0,
        0.1, -0.1, 0.25, 1.0, 0.0, 1.0, 0.0,
        -0.1, 0.1, 0.25, 1.0, 0.0, 0.0, 1.0,

        0.1, -0.1, 0.25, 1.0, 0.0, 1.0, 0.0,
        -0.1, 0.1, 0.25, 1.0, 0.0, 0.0, 1.0,
        0.1, 0.1, 0.25, 1.0, 1.0, 0.0, 0.0,

        // right
        0.1, -0.1, 0.25, 1.0, 0.0, 1.0, 0.0,
        0.1, 0.1, 0.25, 1.0, 1.0, 0.0, 0.0,
        0.1, -0.1, -0.25, 1.0, 0.0, 1.0, 0.0,

        0.1, 0.1, 0.25, 1.0, 1.0, 0.0, 0.0,
        0.1, -0.1, -0.25, 1.0, 0.0, 1.0, 0.0,
        0.1, 0.1, -0.25, 1.0, 1.0, 0.0, 0.0,

        // left
        -0.1, -0.1, 0.25, 1.0, 1.0, 0.0, 0.0,
        -0.1, 0.1, 0.25, 1.0, 0.0, 0.0, 1.0,
        -0.1, -0.1, -0.25, 1.0, 1.0, 0.0, 0.0,

        -0.1, 0.1, 0.25, 1.0, 0.0, 0.0, 1.0,
        -0.1, -0.1, -0.25, 1.0, 1.0, 0.0, 0.0,
        -0.1, 0.1, -0.25, 1.0, 0.0, 0.0, 1.0,

        // up
        -0.1, 0.1, 0.25, 1.0, 0.0, 0.0, 1.0,
        0.1, 0.1, 0.25, 1.0, 1.0, 0.0, 0.0,
        -0.1, 0.1, -0.25, 1.0, 0.0, 0.0, 1.0,

        0.1, 0.1, 0.25, 1.0, 1.0, 0.0, 0.0,
        -0.1, 0.1, -0.25, 1.0, 0.0, 0.0, 1.0,
        0.1, 0.1, -0.25, 1.0, 1.0, 0.0, 0.0,

        // down
        -0.1, -0.1, 0.25, 1.0, 1.0, 0.0, 0.0,
        0.1, -0.1, 0.25, 1.0, 0.0, 1.0, 0.0,
        -0.1, -0.1, -0.25, 1.0, 1.0, 0.0, 0.0,

        0.1, -0.1, 0.25, 1.0, 0.0, 1.0, 0.0,
        -0.1, -0.1, -0.25, 1.0, 1.0, 0.0, 0.0,
        0.1, -0.1, -0.25, 1.0, 0.0, 1.0, 0.0,

        // rear
        -0.1, -0.1, -0.25, 1.0, 1.0, 0.0, 0.0,
        0.1, -0.1, -0.25, 1.0, 0.0, 1.0, 0.0,
        -0.1, 0.1, -0.25, 1.0, 0.0, 0.0, 1.0,

        0.1, -0.1, -0.25, 1.0, 0.0, 1.0, 0.0,
        -0.1, 0.1, -0.25, 1.0, 0.0, 0.0, 1.0,
        0.1, 0.1, -0.25, 1.0, 1.0, 0.0, 0.0
    ])

    updateInfo('EnderDragon', 'Body', EnderDragonBody_Vertices);
}

function drawEnderDragonBody(interval, modelMatrix, u_ModelMatrix) {
    // pushMatrix(modelMatrix);
    modelMatrix.setTranslate(EnderDragonPos[0], EnderDragonPos[1], EnderDragonPos[2]);
    modelMatrix.scale(config.EnderDragon.Body.Size, config.EnderDragon.Body.Size, config.EnderDragon.Body.Size);

    // Rotate
    if (!config.EnderDragon.Body.Pause) {
        config.EnderDragon.Body.angle += (config.EnderDragon.Body.rotSpeed * interval) / 1000.0;
        config.EnderDragon.Body.angle %= 360
    }

    modelMatrix.rotate(config.EnderDragon.Body.angle, 0.5, 0.5, 0);

    gl.uniformMatrix4fv(u_ModelMatrix, false, modelMatrix.elements);
    gl.drawArrays(gl.TRIANGLES, Info.EnderDragon.Body.position, Info.EnderDragon.Body.n);
    // modelMatrix = popMatrix();
}

function defEnderDragonTail() {
    let EnderDragonTail_Vertices = new Float32Array([
        // front
        -0.075, -0.075, -0.2, 1.0, 1.0, 1.0, 0.0,
        0.075, -0.075, -0.2, 1.0, 0.0, 1.0, 1.0,
        -0.075, 0.075, -0.2, 1.0, 1.0, 0.0, 1.0,

        0.075, -0.075, -0.2, 1.0, 0.0, 1.0, 1.0,
        -0.075, 0.075, -0.2, 1.0, 1.0, 0.0, 1.0,
        0.075, 0.075, -0.2, 1.0, 1.0, 1.0, 0.0,

        // right
        0.075, -0.075, -0.2, 1.0, 0.0, 1.0, 1.0,
        0.075, 0.075, -0.2, 1.0, 1.0, 1.0, 0.0,
        0.075, -0.075, -0.8, 1.0, 0.0, 1.0, 1.0,

        0.075, 0.075, -0.2, 1.0, 1.0, 1.0, 0.0,
        0.075, -0.075, -0.8, 1.0, 0.0, 1.0, 1.0,
        0.075, 0.075, -0.8, 1.0, 1.0, 1.0, 0.0,

        // left
        -0.075, -0.075, -0.2, 1.0, 1.0, 1.0, 0.0,
        -0.075, 0.075, -0.2, 1.0, 1.0, 0.0, 1.0,
        -0.075, -0.075, -0.8, 1.0, 1.0, 1.0, 0.0,

        -0.075, 0.075, -0.2, 1.0, 1.0, 0.0, 1.0,
        -0.075, -0.075, -0.8, 1.0, 1.0, 1.0, 0.0,
        -0.075, 0.075, -0.8, 1.0, 1.0, 0.0, 1.0,

        // up
        -0.075, 0.075, -0.2, 1.0, 1.0, 0.0, 1.0,
        0.075, 0.075, -0.2, 1.0, 1.0, 1.0, 0.0,
        -0.075, 0.075, -0.8, 1.0, 1.0, 0.0, 1.0,

        0.075, 0.075, -0.2, 1.0, 1.0, 1.0, 0.0,
        -0.075, 0.075, -0.8, 1.0, 1.0, 0.0, 1.0,
        0.075, 0.075, -0.8, 1.0, 1.0, 1.0, 0.0,

        // down
        -0.075, -0.075, -0.2, 1.0, 1.0, 1.0, 0.0,
        0.075, -0.075, -0.2, 1.0, 0.0, 1.0, 1.0,
        -0.075, -0.075, -0.8, 1.0, 1.0, 1.0, 0.0,

        0.075, -0.075, -0.2, 1.0, 0.0, 1.0, 1.0,
        -0.075, -0.075, -0.8, 1.0, 1.0, 1.0, 0.0,
        0.075, -0.075, -0.8, 1.0, 0.0, 1.0, 1.0,

        // rear
        -0.075, -0.075, -0.8, 1.0, 1.0, 1.0, 0.0,
        0.075, -0.075, -0.8, 1.0, 0.0, 1.0, 1.0,
        -0.075, 0.075, -0.8, 1.0, 1.0, 0.0, 1.0,

        0.075, -0.075, -0.8, 1.0, 0.0, 1.0, 1.0,
        -0.075, 0.075, -0.8, 1.0, 1.0, 0.0, 1.0,
        0.075, 0.075, -0.8, 1.0, 1.0, 1.0, 0.0
    ])

    updateInfo('EnderDragon', 'Tail', EnderDragonTail_Vertices);
}

function drawEnderDragonTail(interval, modelMatrix, u_ModelMatrix) {
    // pushMatrix(modelMatrix);
    // modelMatrix.translate(EnderDragonPos[0], EnderDragonPos[1], EnderDragonPos[2]);
    // modelMatrix.translate(0, 0, 0);
    // modelMatrix.scale(config.EnderDragon.Tail.Size, config.EnderDragon.Tail.Size, config.EnderDragon.Tail.Size);

    // Rotate
    if (!config.EnderDragon.Tail.Pause) {
        if (config.EnderDragon.Tail.rotDir) {
            let rotAngle = (config.EnderDragon.Tail.rotSpeed * interval) / 1000.0;
            rotAngle %= 90;
            if (rotAngle + config.EnderDragon.Tail.angle > config.EnderDragon.Tail.rotMaxAngle) {
                config.EnderDragon.Tail.angle = config.EnderDragon.Tail.rotMaxAngle - (rotAngle - (config.EnderDragon.Tail.rotMaxAngle - config.EnderDragon.Tail.angle));
                config.EnderDragon.Tail.rotDir = !config.EnderDragon.Tail.rotDir;
            } else {
                config.EnderDragon.Tail.angle += rotAngle;
            }
        } else {
            let rotAngle = (config.EnderDragon.Tail.rotSpeed * interval) / 1000.0;
            rotAngle %= 90;
            if (config.EnderDragon.Tail.angle - rotAngle < config.EnderDragon.Tail.rotMinAngle) {
                config.EnderDragon.Tail.angle = config.EnderDragon.Tail.rotMinAngle + (rotAngle - (config.EnderDragon.Tail.angle - (config.EnderDragon.Tail.rotMinAngle)));
                config.EnderDragon.Tail.rotDir = !config.EnderDragon.Tail.rotDir;
            } else {
                config.EnderDragon.Tail.angle -= rotAngle;
            }
        }
    }

    modelMatrix.rotate(config.EnderDragon.Tail.angle, 0, 1, 0);

    gl.uniformMatrix4fv(u_ModelMatrix, false, modelMatrix.elements);
    gl.drawArrays(gl.TRIANGLES, Info.EnderDragon.Tail.position, Info.EnderDragon.Tail.n);
    // modelMatrix = popMatrix();
}