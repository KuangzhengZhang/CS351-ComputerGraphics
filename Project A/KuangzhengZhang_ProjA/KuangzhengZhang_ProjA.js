
let Config = function () {
    // Env
    this.Env = {
        bgClr: [78, 42, 132, 1],
        speed: 0.5
    }

    // EnderDragon
    this.EnderDragon = {
        speed: 0.5
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

var VSHADER_SOURCE =
    'attribute vec4 a_Position;\n' +
    'void main() {\n' +
    '  gl_Position = a_Position;\n' +
    '  gl_PointSize = 10.0;\n' +
    '}\n';

var FSHADER_SOURCE =
    'void main() {\n' +
    '  gl_FragColor = vec4(0.0, 1.0, 0.0, 1.0);\n' +
    '}\n';

function initCfg() {
    gui = new dat.GUI({ name: 'GUI' });
    // Env
    let Env = gui.addFolder('Env');
    bgClr = Env.addColor(config.Env, 'bgClr').listen();
    bgClr.onChange(() => {
        gl.clearColor(config.Env.bgClr[0] / 255, config.Env.bgClr[1] / 255, config.Env.bgClr[2] / 255, config.Env.bgClr[3]);
        gl.clear(gl.COLOR_BUFFER_BIT);
        console.debug("bgClr set to: " + config.Env.bgClr);
    });
    Env.add(config.Env, 'speed', -10, 10).listen();
    Env.open();

    // EnderDragon
    let EnderDragon = gui.addFolder('EnderDragon');
    EnderDragon.open();

    // EndCrystal
    let EndCrystal = gui.addFolder('EndCrystal');
    EndCrystal.open();
}


function main() {
    initCfg();

    // Retrieve <canvas> element
    canvas = document.getElementById('webgl');

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

    // Specify the color for clearing <canvas>
    gl.clearColor(config.Env.bgClr[0] / 255, config.Env.bgClr[1] / 255, config.Env.bgClr[2] / 255, config.Env.bgClr[3]);

    // Clear <canvas>
    gl.clear(gl.COLOR_BUFFER_BIT);
}