let Config = function () {
    this.Env = {
        Pause: true,
        bgClr: [0, 229, 238, 1],

        Width: 1300,
        Height: 650
    }

    this.EnderDragon = {
        Pause: false,
        Size: 0.5,
        Body: {
            Pause: false,
            Clr: [78, 42, 132, 1],
            Size: 1,
            trackSpeed: 60,
            rotSpeed: 45,
            rotMaxAngle: 180,
            rotMinAngle: -180,

            L: 0.4,
            R: 0.1,
            H: 0.4,
            capVerts: 10,

            angle: 0,
            rotDir: true
        },
        Neck: {
            Pause: false,
            Clr: [165, 255, 1, 1],
            Size: 1,
            Num: 3,
            rotSpeed: 1,
            rotMaxAngle: 5,
            rotMinAngle: -5,

            W: 0.05,
            H: 0.05,
            L: 0.1,
            w: 0.02,
            h: 0.05,
            l: 0.05,
            // Offset: -0.1,

            angle: 0,
            rotDir: true
        },
        Head: {
            Pause: false,
            Clr: [0, 0, 0, 1],
            Size: 1,
            // Num: 3,
            // rotSpeed: 1,
            // rotMaxAngle: 5,
            // rotMinAngle: -5
        },
        Tail: {
            Pause: false,
            Clr: [0, 0, 0, 1],
            Size: 1,
            Num: 5,
            rotSpeed: 1,
            rotMaxAngle: 5,
            rotMinAngle: -5,

            W: 0.05,
            H: 0.05,
            L: 0.1,
            w: 0.02,
            h: 0.05,
            l: 0.05,
            // Offset: -0.1,

            angle: 0,
            rotDir: true
        },
        Wing1: {
            Pause: false,
            Clr: [78, 42, 132, 1],
            Size: 1,
            rotSpeed: 45,
            rotMaxAngle: 15,
            rotMinAngle: -15,

            angle: 0,
            rotDir: true
        },
        Wing2: {
            Pause: false,
            Clr: [78, 42, 132, 1],
            Size: 1,
            rotSpeed: 45,
            rotMaxAngle: 15,
            rotMinAngle: -15,

            angle: 0,
            rotDir: true
        }
    }

    this.Clover = {
        Pause: false,
        Size: 0.8,
        Stem: {
            Pause: false,
            Clr: [78, 42, 132, 1],
            Size: 1,
            Num: 4,
            rotSpeed: 15,
            rotMaxAngle: 10,
            rotMinAngle: -10,

            L: 0.15,
            R: 0.02,
            capVerts: 8,
            Xangle: 0,

            angle: 0,
            rotDir: true
        },
        Stamen: {
            Pause: false,
            Clr: [78, 42, 132, 1],
            Size: 1,
            trackSpeed: 60,
            rotSpeed: 45,
            rotMaxAngle: 180,
            rotMinAngle: -180,

            L: 0.1,
            H: 0.2,
            R: 0.2,
            capVerts: 12,

            angle: 0,
            rotDir: true,
        },
        Petal: {
            Pause: false,
            Clr: [78, 42, 132, 1],
            Size: 1,
            Num: 3,
            trackSpeed: 60,
            rotSpeed: 90,
            angle: 0,
            rotDir: true,
            rotMaxAngle: 180,
            rotMinAngle: -180
        }
    }
};

// Camera
var g_EyeX = 0.20, g_EyeY = 0.25, g_EyeZ = 4.25;

// const
let floatsPerVertex = 7;

let gl;
let canvas;
let config = new Config();
let gui;

let viewMatrix = new Matrix4();
let projMatrix = new Matrix4();

// Position
let mousePos = [null, null];
let premousePos = [null, null];
let EnderDragonPos = [0, 0, 0];
let CloverPos = [0, -1, 0];

// Animation
let g_last = Date.now();

// Mouse
let dragMode = false;

// random
let hasTarget = false;

let vertices;
let n;

let Info = {
    Env: {
        GroundGrid: {
            vertices: null,
            n: null,
            position: null
        },
        n: null
    },
    EnderDragon: {
        Body: {
            vertices: null,
            n: null,
            position: null
        },
        Fin: {
            vertices: null,
            n: null,
            position: null
        },
        Neck: {
            vertices: null,
            n: null,
            position: null
        },
        Head: {
            vertices: null,
            n: null,
            position: null
        },
        Tail: {
            vertices: null,
            n: null,
            position: null
        },
        Wing1: {
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
    Clover: {
        Stem: {
            vertices: null,
            n: null,
            position: null
        },
        Stamen: {
            vertices: null,
            n: null,
            position: null
        },
        Petal: {
            vertices: null,
            n: null,
            position: null
        },
        n: null
    },
    n: 0
};


// register mouse event
document.onmousedown = mouseDown;
document.onmouseup = mouseUp;
document.onmousemove = mouseMove;

// register key event
document.onkeydown = keyDown;
document.onkeyup = keyUp;
// document.onkeypress = keyPress;

/*
var VSHADER_SOURCE =
    'attribute vec4 a_Position;\n' +
    'attribute vec4 a_Color;\n' +
    'uniform mat4 u_ViewMatrix;\n' +
    'varying vec4 v_Color;\n' +
    'void main() {\n' +
    '   gl_Position = u_ViewMatrix * a_Position;\n' +
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
*/


var VSHADER_SOURCE =
    'attribute vec4 a_Position;\n' +
    'attribute vec4 a_Color;\n' +
    'uniform mat4 u_ViewMatrix;\n' +
    'uniform mat4 u_ProjMatrix;\n' +
    'varying vec4 v_Color;\n' +
    'void main() {\n' +
    '  gl_Position = u_ProjMatrix * u_ViewMatrix * a_Position;\n' +
    '  v_Color = a_Color;\n' +
    '}\n';

// Fragment shader program
var FSHADER_SOURCE =
    '#ifdef GL_ES\n' +
    'precision mediump float;\n' +
    '#endif\n' +
    'varying vec4 v_Color;\n' +
    'void main() {\n' +
    '  gl_FragColor = v_Color;\n' +
    '}\n';


function initCfg() {
    gui = new dat.GUI({ name: 'GUI' });
    gui.width = 270;
    gui.remember(config);

    // Env
    let Env = gui.addFolder('Env');
    Env.add(config.Env, 'Pause').listen();
    Env.addColor(config.Env, 'bgClr').listen();
    // Env.add(config.Env, 'Width', 0, 1000).listen();
    // Env.add(config.Env, 'Height', 0, 1000).listen();
    Env.open();

    // EnderDragon
    let EnderDragon = gui.addFolder('EnderDragon');
    EnderDragon.add(config.EnderDragon, 'Pause').listen();
    EnderDragon.add(config.EnderDragon, 'Size', 0, 1).listen();

    // EnderDragonBody
    let EnderDragonBody = EnderDragon.addFolder('Body');
    EnderDragonBody.add(config.EnderDragon.Body, 'Pause').listen();
    EnderDragonBody.addColor(config.EnderDragon.Body, 'Clr').listen();
    EnderDragonBody.add(config.EnderDragon.Body, 'trackSpeed', 0, 180).listen();
    EnderDragonBody.add(config.EnderDragon.Body, 'rotSpeed', 0, 180).listen();
    // EnderDragonBody.add(config.EnderDragon.Body, 'rotMinAngle', -90, 90).listen().onChange(() => {
    //     gui.__folders.EnderDragon.__folders.Body.__controllers[4].__min = config.EnderDragon.Body.rotMinAngle + 1;
    //     if (config.EnderDragon.Body.rotMaxAngle <= config.EnderDragon.Body.rotMinAngle) {
    //         config.EnderDragon.Body.rotMaxAngle = config.EnderDragon.Body.rotMinAngle + 1;
    //     }
    // });
    // EnderDragonBody.add(config.EnderDragon.Body, 'rotMaxAngle', config.EnderDragon.Body.rotMinAngle, 90).listen();

    // EnderDragonNeck
    let EnderDragonNeck = EnderDragon.addFolder('Neck');
    EnderDragonNeck.add(config.EnderDragon.Neck, 'Pause').listen();
    EnderDragonNeck.addColor(config.EnderDragon.Neck, 'Clr').listen();
    EnderDragonNeck.add(config.EnderDragon.Neck, 'Num', 1, 5, 1).listen();
    // EnderDragonNeck.add(config.EnderDragon.Neck, 'Size', 0, 2).listen();
    EnderDragonNeck.add(config.EnderDragon.Neck, 'rotSpeed', 0, 50).listen();
    EnderDragonNeck.add(config.EnderDragon.Neck, 'rotMinAngle', -30, 30).listen().onChange(() => {
        gui.__folders.EnderDragon.__folders.Neck.__controllers[5].__min = config.EnderDragon.Neck.rotMinAngle + 1;
        if (config.EnderDragon.Neck.rotMaxAngle <= config.EnderDragon.Neck.rotMinAngle) {
            config.EnderDragon.Neck.rotMaxAngle = config.EnderDragon.Neck.rotMinAngle + 1;
        }
    });
    EnderDragonNeck.add(config.EnderDragon.Neck, 'rotMaxAngle', config.EnderDragon.Neck.rotMinAngle, 30).listen();

    // EnderDragonTail
    let EnderDragonTail = EnderDragon.addFolder('Tail');
    EnderDragonTail.add(config.EnderDragon.Tail, 'Pause').listen();
    EnderDragonTail.addColor(config.EnderDragon.Tail, 'Clr').listen();
    EnderDragonTail.add(config.EnderDragon.Tail, 'Num', 1, 5, 1).listen();
    // EnderDragonTail.add(config.EnderDragon.Tail, 'Size', 0, 2).listen();
    EnderDragonTail.add(config.EnderDragon.Tail, 'rotSpeed', 0, 50).listen();
    EnderDragonTail.add(config.EnderDragon.Tail, 'rotMinAngle', -30, 30).listen().onChange(() => {
        gui.__folders.EnderDragon.__folders.Tail.__controllers[5].__min = config.EnderDragon.Tail.rotMinAngle + 1;
        if (config.EnderDragon.Tail.rotMaxAngle <= config.EnderDragon.Tail.rotMinAngle) {
            config.EnderDragon.Tail.rotMaxAngle = config.EnderDragon.Tail.rotMinAngle + 1;
        }
    });
    EnderDragonTail.add(config.EnderDragon.Tail, 'rotMaxAngle', config.EnderDragon.Tail.rotMinAngle, 30).listen();

    // EnderDragonWing1
    let EnderDragonWing1 = EnderDragon.addFolder('Wing1');
    EnderDragonWing1.add(config.EnderDragon.Wing1, 'Pause').listen();
    EnderDragonWing1.addColor(config.EnderDragon.Wing1, 'Clr').listen();
    EnderDragonWing1.add(config.EnderDragon.Wing1, 'Size', 0, 2).listen();
    EnderDragonWing1.add(config.EnderDragon.Wing1, 'rotSpeed', 0, 50).listen();
    EnderDragonWing1.add(config.EnderDragon.Wing1, 'rotMinAngle', -90, 90).listen().onChange(() => {
        gui.__folders.EnderDragon.__folders.Wing1.__controllers[5].__min = config.EnderDragon.Wing1.rotMinAngle + 1;
        if (config.EnderDragon.Wing1.rotMaxAngle <= config.EnderDragon.Wing1.rotMinAngle) {
            config.EnderDragon.Wing1.rotMaxAngle = config.EnderDragon.Wing1.rotMinAngle + 1;
        }
    });
    EnderDragonWing1.add(config.EnderDragon.Wing1, 'rotMaxAngle', config.EnderDragon.Wing1.rotMinAngle, 90).listen();
    EnderDragon.open();

    // Clover
    let Clover = gui.addFolder('Clover');
    Clover.add(config.Clover, 'Pause').listen();
    Clover.add(config.Clover, 'Size', 0, 2).listen();

    // CloverStem
    let CloverStem = Clover.addFolder('Stem');
    CloverStem.add(config.Clover.Stem, 'Pause').listen();
    CloverStem.addColor(config.Clover.Stem, 'Clr').listen();
    // CloverStem.add(config.Clover.Stem, 'Size', 0, 2).listen();
    CloverStem.add(config.Clover.Stem, 'Num', 1, 10, 1).listen();
    CloverStem.add(config.Clover.Stem, 'rotSpeed', 0, 30).listen();
    // CloverStem.add(config.Clover.Stem, 'L', 0.1, 0.3).listen();
    // CloverStem.add(config.Clover.Stem, 'R', 0.01, 0.1).listen();
    // CloverStem.add(config.Clover.Stem, 'capVerts', 3, 10).listen();

    // CloverStamen
    let CloverStamen = Clover.addFolder('Stamen');
    CloverStamen.add(config.Clover.Stamen, 'Pause').listen();
    CloverStamen.addColor(config.Clover.Stamen, 'Clr').listen();
    CloverStamen.add(config.Clover.Stamen, 'Size', 0, 2).listen();
    CloverStamen.add(config.Clover.Stamen, 'rotSpeed', 0, 180).listen();

    // CloverPetal
    let CloverPetal = Clover.addFolder('Petal');
    CloverPetal.add(config.Clover.Petal, 'Pause').listen();
    CloverPetal.addColor(config.Clover.Petal, 'Clr').listen();
    CloverPetal.add(config.Clover.Petal, 'Size', 0, 2).listen();
    CloverPetal.add(config.Clover.Petal, 'Num', 1, 6, 1).listen();
    Clover.open();
}

function getMousePos(event) {
    if (canvas) {
        let rect = canvas.getBoundingClientRect();
        let x = (event.clientX - rect.left) / (rect.right - rect.left) * canvas.width;
        let y = (event.clientY - rect.top) / (rect.bottom - rect.top) * canvas.height;
        x = x * 2 / (rect.right - rect.left) - 1;
        y = - y * 2 / (rect.bottom - rect.top) + 1;
        return {
            rect: rect,
            x: x,
            y: y
        }
    }
}

function isMouseInCanvas() {
    if (!event) {
        return false;
    }
    let pos = getMousePos(event);
    let x = pos.x;
    let y = pos.y;
    return -1 <= x && x <= 1 && -1 <= y && y <= 1;
}

function mouseDown(event) {
    if (isMouseInCanvas()) {
        dragMode = true;
    };
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

    // Update mousePos
    if (dragMode) {
        // EnderDragonPos[0] = x;
        // EnderDragonPos[1] = y;

        if (isMouseInCanvas()) {
            if (x > mousePos[0]) {
                config.Clover.Stem.Xangle += 5;
                config.Clover.Stem.Xangle %= 360;
            } else {
                config.Clover.Stem.Xangle -= 5;
                config.Clover.Stem.Xangle %= 360;
            }
            mousePos[0] = x;
            mousePos[1] = y;
        } else {
            mousePos[0] = null;
            mousePos[1] = null;
        }
    } else {
        if (isMouseInCanvas()) {
            mousePos[0] = x;
            mousePos[1] = y;
        }
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
            event.preventDefault();
            CloverPos[1] += 0.01;
            break;
        case 'KeyS':
        case 'ArrowDown':
            event.preventDefault();
            CloverPos[1] -= 0.01;
            break;
        case 'KeyA':
        case 'ArrowLeft':
            event.preventDefault();
            CloverPos[0] -= 0.01;
            break;
        case 'KeyD':
        case 'ArrowRight':
            event.preventDefault();
            CloverPos[0] += 0.01;
            break;
        case 'Space':
            event.preventDefault();
            config.Env.Pause = !config.Env.Pause;
            break;
        case 'KeyR':
            gui.revert();
            break;
        case 'Slash':
            gui.__closeButton.click();
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
    defGroundGrid();
    defEnderDragonBody();
    defCuboid(w = 0.02, OffsetX = 0, h = 0.05, OffsetY = 0.1, l = 0.05, OffsetZ = 0, Level1 = 'EnderDragon', Level2 = 'Fin');
    defEnderDragonNeck();
    defCuboid(w = 0.1, OffsetX = 0, h = 0.1, OffsetY = 0, l = 0.12, OffsetZ = 0.12, Level1 = 'EnderDragon', Level2 = 'Head');
    defEnderDragonTail();
    defEnderDragonWing1();

    defCloverStem();
    defCloverStamen();
    defCloverPetal();

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

function drawScene(interval, u_ViewMatrix, viewMatrix) {
    if (!config.Env.Pause && !hasTarget && !dragMode) {
        console.debug(`Update Target!`);
        mousePos[0] = (2 * Math.random() - 1);
        mousePos[1] = (2 * Math.random() - 1);
        hasTarget = true;
    }
    // viewMatrix.setIdentity();
    // colorMatrix.setIdentity();

    // Clear
    // gl.clearColor(config.Env.bgClr[0] / 255, config.Env.bgClr[1] / 255, config.Env.bgClr[2] / 255, config.Env.bgClr[3]);
    // gl.clearColor(0.25, 0.2, 0.25, 1.0);
    // gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    // GroundGrid
    drawGroundGrid(interval, viewMatrix, u_ViewMatrix);

    // console.log(Info)

    // EnderDragon
    // Body
    drawEnderDragonBody(interval, viewMatrix, u_ViewMatrix);

    // Fin
    pushMatrix(viewMatrix);
    drawEnderDragonFin(interval, viewMatrix, u_ViewMatrix);
    viewMatrix = popMatrix();

    // Neck + Head
    pushMatrix(viewMatrix);
    // pushMatrix(colorMatrix);
    for (let i = 1; i <= config.EnderDragon.Neck.Num; i++) {
        drawEnderDragonNeck(interval, viewMatrix, u_ViewMatrix, idx = i);
    }
    // colorMatrix = popMatrix();
    drawEnderDragonHead(interval, viewMatrix, u_ViewMatrix)
    viewMatrix = popMatrix();

    // Tail
    pushMatrix(viewMatrix);
    for (let i = 1; i <= config.EnderDragon.Tail.Num; i++) {
        drawEnderDragonTail(interval, viewMatrix, u_ViewMatrix, idx = i);
    }
    viewMatrix = popMatrix();

    // Wing
    pushMatrix(viewMatrix);
    drawEnderDragonWing1(interval, viewMatrix, u_ViewMatrix, idx = 1);
    viewMatrix = popMatrix();

    pushMatrix(viewMatrix);
    drawEnderDragonWing1(interval, viewMatrix, u_ViewMatrix, idx = 2);
    viewMatrix = popMatrix();

    // pushMatrix(viewMatrix);
    // viewMatrix = popMatrix();
    viewMatrix.setIdentity();
    for (let i = 1; i <= config.Clover.Stem.Num; i++) {
        drawCloverStem(interval, viewMatrix, u_ViewMatrix, idx = i);
    }
    drawCloverStamen(interval, viewMatrix, u_ViewMatrix);

    for (let i = 1; i <= config.Clover.Petal.Num; i++) {
        drawCloverPetal(interval, viewMatrix, u_ViewMatrix, idx = i);
    }
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

    var u_ViewMatrix = gl.getUniformLocation(gl.program, 'u_ViewMatrix');
    if (!u_ViewMatrix) {
        console.log('Failed to get the storage location of u_ViewMatrix');
        return;
    }

    var u_ProjMatrix = gl.getUniformLocation(gl.program, 'u_ProjMatrix');
    if (!u_ProjMatrix) {
        console.log('Failed to get the storage location of u_ProjMatrix');
        return;
    }

    // var u_ColorMatrix = gl.getUniformLocation(gl.program, 'u_ColorMatrix');
    // if (!u_ColorMatrix) {
    //     console.log('Failed to get the storage location of u_ColorMatrix');
    //     return;
    // }

    // gl.enable(gl.DEPTH_TEST);
    // gl.clearDepth(0.0);
    // gl.depthFunc(gl.GREATER);

    var projMatrix = new Matrix4();
    projMatrix.setPerspective(30, canvas.width / canvas.height, 1, 100);
    gl.uniformMatrix4fv(u_ProjMatrix, false, projMatrix.elements);

    let tick = () => {
        let now = Date.now();
        let interval = now - g_last;
        g_last = now;
        draw(interval, u_ViewMatrix, viewMatrix);
        requestAnimationFrame(tick, canvas);
    };
    tick();
}

function updateInfo(Level1, Level2, Vertices) {
    if (Level2 == 'GroundGrid') {
        floatsPerVertex = 6;
    } else {
        floatsPerVertex = 7;
    }
    Info[Level1][Level2].vertices = Vertices;
    Info[Level1][Level2].position = Info.n;
    Info[Level1][Level2].n = Vertices.length / floatsPerVertex;
    Info[Level1].n += Info[Level1][Level2].n;
    Info.n += Info[Level1][Level2].n;
}

function rotate(interval, Level1, Level2, reciprocate) {
    if (reciprocate) {
        let rotAngle = (config[Level1][Level2].rotSpeed * interval) / 1000.0;
        rotAngle %= config[Level1][Level2].rotMaxAngle - config[Level1][Level2].rotMinAngle;
        if (!config.Env.Pause && !config[Level1].Pause && !config[Level1][Level2].Pause) {
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
    } else {
        if (!config.Env.Pause && !config[Level1].Pause && !config[Level1][Level2].Pause) {
            config[Level1][Level2].angle += (config[Level1][Level2].rotSpeed * interval) / 1000.0;
            config[Level1][Level2].angle %= config[Level1][Level2].rotMaxAngle - config[Level1][Level2].rotMinAngle;
        }
    }
}

function defGroundGrid() {
    floatsPerVertex = 6;
    //==============================================================================
    // Create a list of vertices that create a large grid of lines in the x,y plane
    // centered at x=y=z=0.  Draw this shape using the GL_LINES primitive.

    var xcount = 100;			// # of lines to draw in x,y to make the grid.
    var ycount = 100;
    var xymax = 50.0;			// grid size; extends to cover +/-xymax in x and y.
    var xColr = new Float32Array([1.0, 1.0, 0.3]);	// bright yellow
    var yColr = new Float32Array([0.5, 1.0, 0.5]);	// bright green.

    // Create an (global) array to hold this ground-plane's vertices:
    let GroundGrid_Vertices = new Float32Array(floatsPerVertex * 2 * (xcount + ycount));
    // draw a grid made of xcount+ycount lines; 2 vertices per line.

    var xgap = xymax / (xcount - 1);		// HALF-spacing between lines in x,y;
    var ygap = xymax / (ycount - 1);		// (why half? because v==(0line number/2))

    // First, step thru x values as we make vertical lines of constant-x:
    for (v = 0, j = 0; v < 2 * xcount; v++, j += floatsPerVertex) {
        if (v % 2 == 0) {	// put even-numbered vertices at (xnow, -xymax, 0)
            GroundGrid_Vertices[j] = -xymax + (v) * xgap;	// x
            GroundGrid_Vertices[j + 1] = -xymax;								// y
            GroundGrid_Vertices[j + 2] = 0.0;									// z
        }
        else {				// put odd-numbered vertices at (xnow, +xymax, 0).
            GroundGrid_Vertices[j] = -xymax + (v - 1) * xgap;	// x
            GroundGrid_Vertices[j + 1] = xymax;								// y
            GroundGrid_Vertices[j + 2] = 0.0;									// z
        }
        GroundGrid_Vertices[j + 3] = xColr[0];			// red
        GroundGrid_Vertices[j + 4] = xColr[1];			// grn
        GroundGrid_Vertices[j + 5] = xColr[2];			// blu
    }
    // Second, step thru y values as wqe make horizontal lines of constant-y:
    // (don't re-initialize j--we're adding more vertices to the array)
    for (v = 0; v < 2 * ycount; v++, j += floatsPerVertex) {
        if (v % 2 == 0) {		// put even-numbered vertices at (-xymax, ynow, 0)
            GroundGrid_Vertices[j] = -xymax;								// x
            GroundGrid_Vertices[j + 1] = -xymax + (v) * ygap;	// y
            GroundGrid_Vertices[j + 2] = 0.0;									// z
        }
        else {					// put odd-numbered vertices at (+xymax, ynow, 0).
            GroundGrid_Vertices[j] = xymax;								// x
            GroundGrid_Vertices[j + 1] = -xymax + (v - 1) * ygap;	// y
            GroundGrid_Vertices[j + 2] = 0.0;									// z
        }
        GroundGrid_Vertices[j + 3] = yColr[0];			// red
        GroundGrid_Vertices[j + 4] = yColr[1];			// grn
        GroundGrid_Vertices[j + 5] = yColr[2];			// blu
    }

    updateInfo('Env', 'GroundGrid', GroundGrid_Vertices);
    floatsPerVertex = 7;
}

function drawGroundGrid(interval, viewMatrix, u_ViewMatrix) {
    gl.uniformMatrix4fv(u_ViewMatrix, false, viewMatrix.elements);
    gl.drawArrays(gl.LINES, Info.Env.GroundGrid.position, Info.Env.GroundGrid.n);
}

function draw(interval, u_ViewMatrix, viewMatrix) {
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    viewMatrix.setIdentity();
    viewMatrix.perspective(42.0,   // FOVY: top-to-bottom vertical image angle, in degrees
        1.0,   // Image Aspect Ratio: camera lens width/height
        1.0,   // camera z-near distance (always positive; frustum begins at z = -znear)
        1000);  // camera z-far distance (always positive; frustum ends at z = -zfar)


    gl.viewport(0,
        0,
        gl.drawingBufferWidth / 2,
        gl.drawingBufferHeight);

    viewMatrix.lookAt(5, 5, 3,    // center of projection
        -1, -2, -0.5,	// look-at point 
        0, 0, 1);	// View UP vector.
    gl.uniformMatrix4fv(u_ViewMatrix, false, viewMatrix.elements);

    // Draw the scene:
    drawScene(interval, u_ViewMatrix, viewMatrix);

    // gl.viewport(gl.drawingBufferWidth / 2,
    //     0,
    //     gl.drawingBufferWidth / 2,
    //     gl.drawingBufferHeight);

    // // but use a different 'view' matrix:
    // viewMatrix.setLookAt(g_EyeY, g_EyeX, g_EyeZ,
    //     0, 0, 0,
    //     0, 1, 0);

    // gl.uniformMatrix4fv(u_ViewMatrix, false, viewMatrix.elements);
    // drawScene(interval, u_ViewMatrix, viewMatrix);
}