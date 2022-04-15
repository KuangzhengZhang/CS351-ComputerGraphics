let Config = function () {
    // Env
    this.Env = {
        bgClr: [0, 0, 0, 1],
        Width: 650,
        Height: 650,
        mode: 'Drag'
    }

    // EnderDragon
    this.EnderDragon = {
        Pause: true,
        Size: 1,
        Body: {
            Pause: false,
            Clr: [78, 42, 132, 1],
            rotSpeed: 45,
            angle: 0,
            rotDir: true,
            rotMaxAngle: 180,
            rotMinAngle: -180
        },
        Tail: {
            Pause: false,
            Clr: [78, 42, 132, 1],
            rotSpeed: 10,
            angle: 0,
            rotDir: true,
            rotMaxAngle: 15,
            rotMinAngle: -15
        },
        Wing1: {
            Pause: false,
            Clr: [78, 42, 132, 1],
            Size: 1,
            rotSpeed: 45,
            angle: 0,
            rotDir: true,
            rotMaxAngle: 15,
            rotMinAngle: -15
        },
        Wing2: {
            Pause: false,
            Clr: [78, 42, 132, 1],
            Size: 1,
            rotSpeed: 45,
            angle: 0,
            rotDir: true,
            rotMaxAngle: 15,
            rotMinAngle: -15
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
        Wing1_1: {
            vertices: null,
            n: null,
            position: null
        },
        Wing1_2: {
            vertices: null,
            n: null,
            position: null
        },
        Wing2: {
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
    Env.add(config.Env, 'mode', ['Drag', '111']).listen();
    Env.open();

    // EnderDragon
    let EnderDragon = gui.addFolder('EnderDragon');
    EnderDragon.add(config.EnderDragon, 'Pause').listen();
    EnderDragon.add(config.EnderDragon, 'Size', 0, 1).listen();

    // EnderDragonBody
    let EnderDragonBody = EnderDragon.addFolder('Body');
    EnderDragonBody.add(config.EnderDragon.Body, 'Pause').listen();
    EnderDragonBody.addColor(config.EnderDragon.Body, 'Clr').listen();
    EnderDragonBody.add(config.EnderDragon.Body, 'rotSpeed', 0, 180).listen();
    EnderDragonBody.add(config.EnderDragon.Body, 'rotMinAngle', -180, 180).listen().onChange(() => {
        gui.__folders.EnderDragon.__folders.Body.__controllers[4].__min = config.EnderDragon.Body.rotMinAngle + 1;
        if (config.EnderDragon.Body.rotMaxAngle <= config.EnderDragon.Body.rotMinAngle) {
            config.EnderDragon.Body.rotMaxAngle = config.EnderDragon.Body.rotMinAngle + 1;
        }
    });
    EnderDragonBody.add(config.EnderDragon.Body, 'rotMaxAngle', config.EnderDragon.Body.rotMinAngle, 180).listen();

    // EnderDragonTail
    let EnderDragonTail = EnderDragon.addFolder('Tail');
    EnderDragonTail.add(config.EnderDragon.Tail, 'Pause').listen();
    EnderDragonTail.addColor(config.EnderDragon.Tail, 'Clr').listen();
    EnderDragonTail.add(config.EnderDragon.Tail, 'rotSpeed', 0, 50).listen();
    EnderDragonTail.add(config.EnderDragon.Tail, 'rotMinAngle', -180, 180).listen().onChange(() => {
        gui.__folders.EnderDragon.__folders.Tail.__controllers[4].__min = config.EnderDragon.Tail.rotMinAngle + 1;
        if (config.EnderDragon.Tail.rotMaxAngle <= config.EnderDragon.Tail.rotMinAngle) {
            config.EnderDragon.Tail.rotMaxAngle = config.EnderDragon.Tail.rotMinAngle + 1;
        }
    });
    EnderDragonTail.add(config.EnderDragon.Tail, 'rotMaxAngle', config.EnderDragon.Tail.rotMinAngle, 180).listen();

    // EnderDragonWing1
    let EnderDragonWing1 = EnderDragon.addFolder('Wing1');
    EnderDragonWing1.add(config.EnderDragon.Wing1, 'Pause').listen();
    EnderDragonWing1.addColor(config.EnderDragon.Wing1, 'Clr').listen();
    EnderDragonWing1.add(config.EnderDragon.Wing1, 'rotSpeed', 0, 50).listen();
    EnderDragonWing1.add(config.EnderDragon.Wing1, 'rotMinAngle', -180, 180).listen().onChange(() => {
        gui.__folders.EnderDragon.__folders.Wing1.__controllers[4].__min = config.EnderDragon.Wing1.rotMinAngle + 1;
        if (config.EnderDragon.Wing1.rotMaxAngle <= config.EnderDragon.Wing1.rotMinAngle) {
            config.EnderDragon.Wing1.rotMaxAngle = config.EnderDragon.Wing1.rotMinAngle + 1;
        }
    });
    EnderDragonWing1.add(config.EnderDragon.Wing1, 'rotMaxAngle', config.EnderDragon.Wing1.rotMinAngle, 180).listen();
    EnderDragon.open();

    // EnderDragonWing2
    let EnderDragonWing2 = EnderDragon.addFolder('Wing2');
    EnderDragonWing2.add(config.EnderDragon.Wing2, 'Pause').listen();
    EnderDragonWing2.addColor(config.EnderDragon.Wing2, 'Clr').listen();
    EnderDragonWing2.add(config.EnderDragon.Wing2, 'rotSpeed', 0, 50).listen();
    EnderDragonWing2.add(config.EnderDragon.Wing2, 'rotMinAngle', -180, 180).listen().onChange(() => {
        gui.__folders.EnderDragon.__folders.Wing2.__controllers[4].__min = config.EnderDragon.Wing2.rotMinAngle + 1;
        if (config.EnderDragon.Wing2.rotMaxAngle <= config.EnderDragon.Wing2.rotMinAngle) {
            config.EnderDragon.Wing2.rotMaxAngle = config.EnderDragon.Wing2.rotMinAngle + 1;
        }
    });
    EnderDragonWing2.add(config.EnderDragon.Wing2, 'rotMaxAngle', config.EnderDragon.Wing2.rotMinAngle, 180).listen();
    EnderDragon.open();

    // EndCrystal
    let EndCrystal = gui.addFolder('EndCrystal');
    EndCrystal.add(config.EndCrystal, 'speed', -10, 10).listen();
    EndCrystal.open();
}

function initMenu() {
    let menu = new dat.GUI({ name: 'MENU' });
    menu.add(config.Env, 'Width').listen();
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
    switch (event.code) {
        case 'KeyW':
        case 'ArrowUp':
            EnderDragonPos[1] += 0.01;
            break;
        case 'KeyS':
        case 'ArrowDown':
            EnderDragonPos[1] -= 0.01;
            break;
        case 'KeyA':
        case 'ArrowLeft':
            EnderDragonPos[0] -= 0.01;
            break;
        case 'KeyD':
        case 'ArrowRight':
            EnderDragonPos[0] += 0.01;
            break;
    }
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
    defEnderDragonWing1_1();
    defEnderDragonWing1_2();
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

    // Body
    drawEnderDragonBody(interval, modelMatrix, u_ModelMatrix);

    // Tail
    pushMatrix(modelMatrix);
    drawEnderDragonTail(interval, modelMatrix, u_ModelMatrix, idx = 1);
    drawEnderDragonTail(interval, modelMatrix, u_ModelMatrix, idx = 2);
    drawEnderDragonTail(interval, modelMatrix, u_ModelMatrix, idx = 3);
    modelMatrix = popMatrix();

    pushMatrix(modelMatrix);
    drawEnderDragonWing1_1(interval, modelMatrix, u_ModelMatrix);
    modelMatrix = popMatrix();

    pushMatrix(modelMatrix);
    drawEnderDragonWing1_2(interval, modelMatrix, u_ModelMatrix);
    modelMatrix = popMatrix();

    pushMatrix(modelMatrix);
    modelMatrix = popMatrix();
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
    gl.clearDepth(0.0);
    gl.depthFunc(gl.GREATER);
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
    modelMatrix.scale(config.EnderDragon.Size, config.EnderDragon.Size, config.EnderDragon.Size);

    // Rotate
    if (!config.EnderDragon.Pause && !config.EnderDragon.Body.Pause) {
        config.EnderDragon.Body.angle += (config.EnderDragon.Body.rotSpeed * interval) / 1000.0;
        config.EnderDragon.Body.angle %= config.EnderDragon.Body.rotMaxAngle - config.EnderDragon.Body.rotMinAngle;
    }
    // rotate(interval, 'EnderDragon', 'Body');

    modelMatrix.rotate(config.EnderDragon.Body.angle, 0, 1, 0);
    modelMatrix.rotate(config.EnderDragon.Body.angle, 0, 0, 1);

    gl.uniformMatrix4fv(u_ModelMatrix, false, modelMatrix.elements);
    gl.drawArrays(gl.TRIANGLES, Info.EnderDragon.Body.position, Info.EnderDragon.Body.n);
    // modelMatrix = popMatrix();
}

function defEnderDragonTail() {
    let EnderDragonTail_Vertices = new Float32Array([
        // front
        -0.05, -0.05, 0, 1.0, 1.0, 1.0, 0.0,
        0.05, -0.05, 0, 1.0, 0.0, 1.0, 1.0,
        -0.05, 0.05, 0, 1.0, 1.0, 0.0, 1.0,

        0.05, -0.05, 0, 1.0, 0.0, 1.0, 1.0,
        -0.05, 0.05, 0, 1.0, 1.0, 0.0, 1.0,
        0.05, 0.05, 0, 1.0, 1.0, 1.0, 0.0,

        // right
        0.05, -0.05, 0, 1.0, 0.0, 1.0, 1.0,
        0.05, 0.05, 0, 1.0, 1.0, 1.0, 0.0,
        0.05, -0.05, 0.2, 1.0, 0.0, 1.0, 1.0,

        0.05, 0.05, 0, 1.0, 1.0, 1.0, 0.0,
        0.05, -0.05, 0.2, 1.0, 0.0, 1.0, 1.0,
        0.05, 0.05, 0.2, 1.0, 1.0, 1.0, 0.0,

        // left
        -0.05, -0.05, 0, 1.0, 1.0, 1.0, 0.0,
        -0.05, 0.05, 0, 1.0, 1.0, 0.0, 1.0,
        -0.05, -0.05, 0.2, 1.0, 1.0, 1.0, 0.0,

        -0.05, 0.05, 0, 1.0, 1.0, 0.0, 1.0,
        -0.05, -0.05, 0.2, 1.0, 1.0, 1.0, 0.0,
        -0.05, 0.05, 0.2, 1.0, 1.0, 0.0, 1.0,

        // up
        -0.05, 0.05, 0, 1.0, 1.0, 0.0, 1.0,
        0.05, 0.05, 0, 1.0, 1.0, 1.0, 0.0,
        -0.05, 0.05, 0.2, 1.0, 1.0, 0.0, 1.0,

        0.05, 0.05, 0, 1.0, 1.0, 1.0, 0.0,
        -0.05, 0.05, 0.2, 1.0, 1.0, 0.0, 1.0,
        0.05, 0.05, 0.2, 1.0, 1.0, 1.0, 0.0,

        // down
        -0.05, -0.05, 0, 1.0, 1.0, 1.0, 0.0,
        0.05, -0.05, 0, 1.0, 0.0, 1.0, 1.0,
        -0.05, -0.05, 0.2, 1.0, 1.0, 1.0, 0.0,

        0.05, -0.05, 0, 1.0, 0.0, 1.0, 1.0,
        -0.05, -0.05, 0.2, 1.0, 1.0, 1.0, 0.0,
        0.05, -0.05, 0.2, 1.0, 0.0, 1.0, 1.0,

        // rear
        -0.05, -0.05, 0.2, 1.0, 1.0, 1.0, 0.0,
        0.05, -0.05, 0.2, 1.0, 0.0, 1.0, 1.0,
        -0.05, 0.05, 0.2, 1.0, 1.0, 0.0, 1.0,

        0.05, -0.05, 0.2, 1.0, 0.0, 1.0, 1.0,
        -0.05, 0.05, 0.2, 1.0, 1.0, 0.0, 1.0,
        0.05, 0.05, 0.2, 1.0, 1.0, 1.0, 0.0
    ])

    updateInfo('EnderDragon', 'Tail', EnderDragonTail_Vertices);
}

function drawEnderDragonTail(interval, modelMatrix, u_ModelMatrix, idx) {
    // pushMatrix(modelMatrix);
    // modelMatrix.translate(EnderDragonPos[0], EnderDragonPos[1], EnderDragonPos[2]);
    switch (idx) {
        case 1:
            modelMatrix.translate(0, 0, 0.22);
            break;
        default:
            modelMatrix.translate(0, 0, 0.18);
    }
    // modelMatrix.translate(0, 0, -0.2);
    // modelMatrix.translate(0, 0, 0);
    // modelMatrix.scale(config.EnderDragon.Size, config.EnderDragon.Size, config.EnderDragon.Size);

    // Rotate
    rotate(interval, 'EnderDragon', 'Tail');

    modelMatrix.rotate(config.EnderDragon.Tail.angle, 1, 0, 0);

    gl.uniformMatrix4fv(u_ModelMatrix, false, modelMatrix.elements);
    gl.drawArrays(gl.TRIANGLES, Info.EnderDragon.Tail.position, Info.EnderDragon.Tail.n);
    // modelMatrix = popMatrix();
}

function defEnderDragonWing1_1() {
    let x = 0.4;
    let y = 0.05;
    let EnderDragonWing1_Vertices = new Float32Array([
        // front
        0, -y, 0, 1.0, 0.0, 0.0, 0.5, // 0
        x, -y, 0, 1.0, 0.0, 250 / 255, 0, // 1
        0, y, 0, 1.0, 1, 1, 0, // 2

        x, -y, 0, 1.0, 0.0, 250 / 255, 0, // 1
        0, y, 0, 1.0, 1, 1, 0, // 2
        x, y, 0, 1.0, 139 / 255, 36 / 255, 19 / 255, // 3

        // right
        x, -y, 0, 1.0, 0.0, 250 / 255, 0, // 1
        x, y, 0, 1.0, 139 / 255, 36 / 255, 19 / 255, // 3
        x, -y, -2 * y, 1.0, 1, 0, 1, // 5

        x, y, 0, 1.0, 139 / 255, 36 / 255, 19 / 255, // 3
        x, -y, -2 * y, 1.0, 1, 0, 1, // 5
        x, y, -2 * y, 1.0, 0, 191 / 255, 1, // 7

        // left
        0, -y, 0, 1.0, 0.0, 0.0, 0.5, // 0
        0, y, 0, 1.0, 1, 1, 0, // 2
        0, -y, -2 * y, 1.0, 178 / 255, 34 / 255, 34 / 255, // 4

        0, y, 0, 1.0, 1, 1, 0, // 2
        0, -y, -2 * y, 1.0, 178 / 255, 34 / 255, 34 / 255, // 4
        0, y, -2 * y, 1.0, 160 / 255, 32 / 255, 240 / 255, // 6

        // up
        0, y, 0, 1.0, 1, 1, 0, // 2
        x, y, 0, 1.0, 139 / 255, 36 / 255, 19 / 255, // 3
        0, y, -2 * y, 1.0, 160 / 255, 32 / 255, 240 / 255, // 6

        x, y, 0, 1.0, 139 / 255, 36 / 255, 19 / 255, // 3
        0, y, -2 * y, 1.0, 160 / 255, 32 / 255, 240 / 255, // 6
        x, y, -2 * y, 1.0, 0, 191 / 255, 1, // 7

        // down
        0, -y, 0, 1.0, 0.0, 0.0, 0.5, // 0
        x, -y, 0, 1.0, 0.0, 250 / 255, 0, // 1
        0, -y, -2 * y, 1.0, 178 / 255, 34 / 255, 34 / 255, // 4

        x, -y, 0, 1.0, 0.0, 250 / 255, 0, // 1
        0, -y, -2 * y, 1.0, 178 / 255, 34 / 255, 34 / 255, // 4
        x, -y, -2 * y, 1.0, 1, 0, 1, // 5

        // rear
        0, -y, -2 * y, 1.0, 178 / 255, 34 / 255, 34 / 255, // 4
        x, -y, -2 * y, 1.0, 1, 0, 1, // 5
        0, y, -2 * y, 1.0, 160 / 255, 32 / 255, 240 / 255, // 6

        x, -y, -2 * y, 1.0, 1, 0, 1, // 5
        0, y, -2 * y, 1.0, 160 / 255, 32 / 255, 240 / 255, // 6
        x, y, -2 * y, 1.0, 0, 191 / 255, 1, // 7

        // Joint1
        0, (3 / 4) * y, 0, 1.0, 0.0, 0.0, 0.5, // 0
        x, (3 / 4) * y, 0, 1.0, 1, 0, 0, // 1
        (1 / 4) * x, (3 / 4) * y, (1 / 8) * x, 1.0, 1, 1, 0, // 2

        0, -(3 / 4) * y, 0, 1.0, 0.0, 0.0, 0.5,
        x, -(3 / 4) * y, 0, 1.0, 0.0, 250 / 255, 0,
        (1 / 4) * x, -(3 / 4) * y, (1 / 8) * x, 1.0, 1, 1, 0,

        x, (3 / 4) * y, 0, 1.0, 1, 0, 0, // 1
        (1 / 4) * x, (3 / 4) * y, (1 / 8) * x, 1.0, 1, 1, 0, // 2
        (1 / 2) * x, (1 / 2) * y, (3 / 4) * x, 1.0, 0, 1, 0, // 3

        x, -(3 / 4) * y, 0, 1.0, 0.0, 250 / 255, 0,
        (1 / 4) * x, -(3 / 4) * y, (1 / 8) * x, 1.0, 1, 1, 0,
        (1 / 2) * x, -(1 / 2) * y, (3 / 4) * x, 1.0, 1, 1, 0,

        x, (3 / 4) * y, 0, 1.0, 1, 0, 0, // 1
        (1 / 2) * x, (1 / 2) * y, (3 / 4) * x, 1.0, 0, 1, 0, // 3
        x, (1 / 2) * y, x, 1.0, 0, 0, 1, // 4

        x, -(3 / 4) * y, 0, 1.0, 1, 0, 0,
        (1 / 2) * x, -(1 / 2) * y, (3 / 4) * x, 1.0, 0, 1, 0,
        x, -(1 / 2) * y, x, 1.0, 0, 0, 1
    ])

    updateInfo('EnderDragon', 'Wing1_1', EnderDragonWing1_Vertices);
}

function drawEnderDragonWing1_1(interval, modelMatrix, u_ModelMatrix) {
    modelMatrix.translate(0.1, 0, -0.15);

    // Rotate
    rotate(interval, 'EnderDragon', 'Wing1');

    modelMatrix.rotate(config.EnderDragon.Wing1.angle, 0, 0, 1);

    gl.uniformMatrix4fv(u_ModelMatrix, false, modelMatrix.elements);
    gl.drawArrays(gl.TRIANGLES, Info.EnderDragon.Wing1_1.position, Info.EnderDragon.Wing1_1.n);
}

function defEnderDragonWing1_2() {
    let x = 0.4;
    let y = 0.05;
    let EnderDragonWing1_Vertices = new Float32Array([
        // front
        0, -y, 0, 1.0, 0.0, 0.0, 0.5, // 0
        -x, -y, 0, 1.0, 0.0, 250 / 255, 0, // 1
        0, y, 0, 1.0, 1, 1, 0, // 2

        -x, -y, 0, 1.0, 0.0, 250 / 255, 0, // 1
        0, y, 0, 1.0, 1, 1, 0, // 2
        -x, y, 0, 1.0, 139 / 255, 36 / 255, 19 / 255, // 3

        // right
        -x, -y, 0, 1.0, 0.0, 250 / 255, 0, // 1
        -x, y, 0, 1.0, 139 / 255, 36 / 255, 19 / 255, // 3
        -x, -y, -2 * y, 1.0, 1, 0, 1, // 5

        -x, y, 0, 1.0, 139 / 255, 36 / 255, 19 / 255, // 3
        -x, -y, -2 * y, 1.0, 1, 0, 1, // 5
        -x, y, -2 * y, 1.0, 0, 191 / 255, 1, // 7

        // left
        0, -y, 0, 1.0, 0.0, 0.0, 0.5, // 0
        0, y, 0, 1.0, 1, 1, 0, // 2
        0, -y, -2 * y, 1.0, 178 / 255, 34 / 255, 34 / 255, // 4

        0, y, 0, 1.0, 1, 1, 0, // 2
        0, -y, -2 * y, 1.0, 178 / 255, 34 / 255, 34 / 255, // 4
        0, y, -2 * y, 1.0, 160 / 255, 32 / 255, 240 / 255, // 6

        // up
        0, y, 0, 1.0, 1, 1, 0, // 2
        -x, y, 0, 1.0, 139 / 255, 36 / 255, 19 / 255, // 3
        0, y, -2 * y, 1.0, 160 / 255, 32 / 255, 240 / 255, // 6

        -x, y, 0, 1.0, 139 / 255, 36 / 255, 19 / 255, // 3
        0, y, -2 * y, 1.0, 160 / 255, 32 / 255, 240 / 255, // 6
        -x, y, -2 * y, 1.0, 0, 191 / 255, 1, // 7

        // down
        0, -y, 0, 1.0, 0.0, 0.0, 0.5, // 0
        -x, -y, 0, 1.0, 0.0, 250 / 255, 0, // 1
        0, -y, -2 * y, 1.0, 178 / 255, 34 / 255, 34 / 255, // 4

        -x, -y, 0, 1.0, 0.0, 250 / 255, 0, // 1
        0, -y, -2 * y, 1.0, 178 / 255, 34 / 255, 34 / 255, // 4
        -x, -y, -2 * y, 1.0, 1, 0, 1, // 5

        // rear
        0, -y, -2 * y, 1.0, 178 / 255, 34 / 255, 34 / 255, // 4
        -x, -y, -2 * y, 1.0, 1, 0, 1, // 5
        0, y, -2 * y, 1.0, 160 / 255, 32 / 255, 240 / 255, // 6

        -x, -y, -2 * y, 1.0, 1, 0, 1, // 5
        0, y, -2 * y, 1.0, 160 / 255, 32 / 255, 240 / 255, // 6
        -x, y, -2 * y, 1.0, 0, 191 / 255, 1, // 7

        // Joint1
        0, (3 / 4) * y, 0, 1.0, 0.0, 0.0, 0.5, // 0
        -x, (3 / 4) * y, 0, 1.0, 1, 0, 0, // 1
        -(1 / 4) * x, (3 / 4) * y, (1 / 8) * x, 1.0, 1, 1, 0, // 2

        0, -(3 / 4) * y, 0, 1.0, 0.0, 0.0, 0.5,
        -x, -(3 / 4) * y, 0, 1.0, 0.0, 250 / 255, 0,
        -(1 / 4) * x, -(3 / 4) * y, (1 / 8) * x, 1.0, 1, 1, 0,

        -x, (3 / 4) * y, 0, 1.0, 1, 0, 0, // 1
        -(1 / 4) * x, (3 / 4) * y, (1 / 8) * x, 1.0, 1, 1, 0, // 2
        -(1 / 2) * x, (1 / 2) * y, (3 / 4) * x, 1.0, 0, 1, 0, // 3

        -x, -(3 / 4) * y, 0, 1.0, 0.0, 250 / 255, 0,
        -(1 / 4) * x, -(3 / 4) * y, (1 / 8) * x, 1.0, 1, 1, 0,
        -(1 / 2) * x, -(1 / 2) * y, (3 / 4) * x, 1.0, 1, 1, 0,

        -x, (3 / 4) * y, 0, 1.0, 1, 0, 0, // 1
        -(1 / 2) * x, (1 / 2) * y, (3 / 4) * x, 1.0, 0, 1, 0, // 3
        -x, (1 / 2) * y, x, 1.0, 0, 0, 1, // 4

        -x, -(3 / 4) * y, 0, 1.0, 1, 0, 0,
        -(1 / 2) * x, -(1 / 2) * y, (3 / 4) * x, 1.0, 0, 1, 0,
        -x, -(1 / 2) * y, x, 1.0, 0, 0, 1
    ])

    updateInfo('EnderDragon', 'Wing1_2', EnderDragonWing1_Vertices);
}

function drawEnderDragonWing1_2(interval, modelMatrix, u_ModelMatrix) {
    modelMatrix.translate(-0.1, 0, -0.15);

    // Rotate
    // rotate(interval, 'EnderDragon', 'Wing1');

    modelMatrix.rotate(-config.EnderDragon.Wing1.angle, 0, 0, 1);

    gl.uniformMatrix4fv(u_ModelMatrix, false, modelMatrix.elements);
    gl.drawArrays(gl.TRIANGLES, Info.EnderDragon.Wing1_2.position, Info.EnderDragon.Wing1_2.n);
}

function defEnderDragonWing2() {
    let x = 0.4;
    let y = 0.05;
    let EnderDragonWing2_Vertices = new Float32Array([
        // front
        0, -y, 0, 1.0, 0.0, 0.0, 0.5, // 0
        x, -y, 0, 1.0, 0.0, 250 / 255, 0, // 1
        0, y, 0, 1.0, 1, 1, 0, // 2

        x, -y, 0, 1.0, 0.0, 250 / 255, 0, // 1
        0, y, 0, 1.0, 1, 1, 0, // 2
        x, y, 0, 1.0, 139 / 255, 36 / 255, 19 / 255, // 3

        // right
        x, -y, 0, 1.0, 0.0, 250 / 255, 0, // 1
        x, y, 0, 1.0, 139 / 255, 36 / 255, 19 / 255, // 3
        x, -y, -2 * y, 1.0, 1, 0, 1, // 5

        x, y, 0, 1.0, 139 / 255, 36 / 255, 19 / 255, // 3
        x, -y, -2 * y, 1.0, 1, 0, 1, // 5
        x, y, -2 * y, 1.0, 0, 191 / 255, 1, // 7

        // left
        0, -y, 0, 1.0, 0.0, 0.0, 0.5, // 0
        0, y, 0, 1.0, 1, 1, 0, // 2
        0, -y, -2 * y, 1.0, 178 / 255, 34 / 255, 34 / 255, // 4

        0, y, 0, 1.0, 1, 1, 0, // 2
        0, -y, -2 * y, 1.0, 178 / 255, 34 / 255, 34 / 255, // 4
        0, y, -2 * y, 1.0, 160 / 255, 32 / 255, 240 / 255, // 6

        // up
        0, y, 0, 1.0, 1, 1, 0, // 2
        x, y, 0, 1.0, 139 / 255, 36 / 255, 19 / 255, // 3
        0, y, -2 * y, 1.0, 160 / 255, 32 / 255, 240 / 255, // 6

        x, y, 0, 1.0, 139 / 255, 36 / 255, 19 / 255, // 3
        0, y, -2 * y, 1.0, 160 / 255, 32 / 255, 240 / 255, // 6
        x, y, -2 * y, 1.0, 0, 191 / 255, 1, // 7

        // down
        0, -y, 0, 1.0, 0.0, 0.0, 0.5, // 0
        x, -y, 0, 1.0, 0.0, 250 / 255, 0, // 1
        0, -y, -2 * y, 1.0, 178 / 255, 34 / 255, 34 / 255, // 4

        x, -y, 0, 1.0, 0.0, 250 / 255, 0, // 1
        0, -y, -2 * y, 1.0, 178 / 255, 34 / 255, 34 / 255, // 4
        x, -y, -2 * y, 1.0, 1, 0, 1, // 5

        // rear
        0, -y, -2 * y, 1.0, 178 / 255, 34 / 255, 34 / 255, // 4
        x, -y, -2 * y, 1.0, 1, 0, 1, // 5
        0, y, -2 * y, 1.0, 160 / 255, 32 / 255, 240 / 255, // 6

        x, -y, -2 * y, 1.0, 1, 0, 1, // 5
        0, y, -2 * y, 1.0, 160 / 255, 32 / 255, 240 / 255, // 6
        x, y, -2 * y, 1.0, 0, 191 / 255, 1, // 7

        // Joint1
        0, (3 / 4) * y, 0, 1.0, 0.0, 0.0, 0.5, // 0
        x, (3 / 4) * y, 0, 1.0, 1, 0, 0, // 1
        (1 / 4) * x, (3 / 4) * y, (1 / 8) * x, 1.0, 1, 1, 0, // 2

        0, -(3 / 4) * y, 0, 1.0, 0.0, 0.0, 0.5,
        x, -(3 / 4) * y, 0, 1.0, 0.0, 250 / 255, 0,
        (1 / 4) * x, -(3 / 4) * y, (1 / 8) * x, 1.0, 1, 1, 0,

        x, (3 / 4) * y, 0, 1.0, 1, 0, 0, // 1
        (1 / 4) * x, (3 / 4) * y, (1 / 8) * x, 1.0, 1, 1, 0, // 2
        (1 / 2) * x, (1 / 2) * y, (3 / 4) * x, 1.0, 0, 1, 0, // 3

        x, -(3 / 4) * y, 0, 1.0, 0.0, 250 / 255, 0,
        (1 / 4) * x, -(3 / 4) * y, (1 / 8) * x, 1.0, 1, 1, 0,
        (1 / 2) * x, -(1 / 2) * y, (3 / 4) * x, 1.0, 1, 1, 0,

        x, (3 / 4) * y, 0, 1.0, 1, 0, 0, // 1
        (1 / 2) * x, (1 / 2) * y, (3 / 4) * x, 1.0, 0, 1, 0, // 3
        x, (1 / 2) * y, x, 1.0, 0, 0, 1, // 4

        x, -(3 / 4) * y, 0, 1.0, 1, 0, 0,
        (1 / 2) * x, -(1 / 2) * y, (3 / 4) * x, 1.0, 0, 1, 0,
        x, -(1 / 2) * y, x, 1.0, 0, 0, 1
    ])

    updateInfo('EnderDragon', 'Wing2', EnderDragonWing2_Vertices);
}

function drawEnderDragonWing2(interval, modelMatrix, u_ModelMatrix) {
    modelMatrix.translate(0.2, 0, -0.2);

    // Rotate
    rotate(interval, 'EnderDragon', 'Wing1');

    modelMatrix.rotate(config.EnderDragon.Wing1.angle, 0, 0, 1);

    gl.uniformMatrix4fv(u_ModelMatrix, false, modelMatrix.elements);
    gl.drawArrays(gl.TRIANGLES, Info.EnderDragon.Wing2.position, Info.EnderDragon.Wing2.n);
}

function rotate(interval, Level1, Level2) {
    let rotAngle = (config[Level1][Level2].rotSpeed * interval) / 1000.0;
    rotAngle %= config[Level1][Level2].rotMaxAngle - config[Level1][Level2].rotMinAngle;
    if (!config[Level1].Pause && !config[Level1][Level2].Pause) {
        if (config[Level1][Level2].rotDir) {
            if (rotAngle + config[Level1][Level2].angle > config[Level1][Level2].rotMaxAngle) {
                config[Level1][Level2].angle = config[Level1][Level2].rotMaxAngle - (rotAngle - (config[Level1][Level2].rotMaxAngle - config[Level1][Level2].angle));
                config[Level1][Level2].rotDir = !config[Level1][Level2].rotDir;
            } else {
                config[Level1][Level2].angle += rotAngle;
            }
        } else {
            if (config[Level1][Level2].angle - rotAngle < config[Level1][Level2].rotMinAngle) {
                config[Level1][Level2].angle = config[Level1][Level2].rotMinAngle + (rotAngle - (config[Level1][Level2].angle - (config[Level1][Level2].rotMinAngle)));
                config[Level1][Level2].rotDir = !config[Level1][Level2].rotDir;
            } else {
                config[Level1][Level2].angle -= rotAngle;
            }
        }
    }
}