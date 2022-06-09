let Config = function () {
    this.Env = {
        Pause: false,
        // bgClr: [152, 245, 255, 1],
        bgClr: [255, 228, 196, 1],
        // bgClr: [0, 0, 0, 1],

        Width: 1300,
        Height: 650
    }

    this.Location = {
        'Blinn-Phong Lighting + Phong Shading': {
            program: null,
            Matrix: {
                u_ColorMatrix: null,
                u_eyePosWorld: null,
                u_MvpMatrix: null,
                u_ModelMatrix: null,
                u_NormalMatrix: null,
                u_isNormal: null,
            },
            Lamp: [new LightsT(), new LightsT()],
            Matl: new Material(MATL_RED_PLASTIC)
        },
        'Blinn-Phong Lighting + Gouraud Shading': {
            program: null,
            Matrix: {
                u_ColorMatrix: null,
                u_eyePosWorld: null,
                u_MvpMatrix: null,
                u_ModelMatrix: null,
                u_NormalMatrix: null,
                u_isNormal: null,
            },
            Lamp: [new LightsT(), new LightsT()],
            Matl: new Material(MATL_RED_PLASTIC)
        },
        'Phong Lighting + Phong Shading': {
            program: null,
            Matrix: {
                u_ColorMatrix: null,
                u_eyePosWorld: null,
                u_MvpMatrix: null,
                u_ModelMatrix: null,
                u_NormalMatrix: null,
                u_isNormal: null,
            },
            Lamp: [new LightsT(), new LightsT()],
            Matl: new Material(MATL_RED_PLASTIC)
        },
        'Phong Lighting + Gouraud Shading': {
            program: null,
            Matrix: {
                u_ColorMatrix: null,
                u_eyePosWorld: null,
                u_MvpMatrix: null,
                u_ModelMatrix: null,
                u_NormalMatrix: null,
                u_isNormal: null,
            },
            Lamp: [new LightsT(), new LightsT()],
            Matl: new Material(MATL_RED_PLASTIC)
        }
    }

    /* this.Material = {
        Type: 'MATL_RED_PLASTIC'
    } */

    this.Lighting = {
        Type: 'Blinn-Phong Lighting'
    }

    this.Shading = {
        Type: 'Phong Shading'
    }

    this.Light = {
        'left': {
            Color: [0.8, 0.8, 0.8],
            Position: {
                x: -2.0,
                y: -2.0,
                z: 2.0
            },
            Ambient: [102, 102, 102],
            Diffuse: [255, 255, 255],
            Specular: [255, 255, 255],
            isLitBool: true,
            isLit: 1,
            attachCamera: false
        },
        'right': {
            Color: [0.8, 0.8, 0.8],
            Position: {
                x: 2.0,
                y: -2.0,
                z: 2.0
            },
            Ambient: [102, 102, 102],
            Diffuse: [255, 255, 255],
            Specular: [255, 255, 255],
            isLitBool: true,
            isLit: 1,
            attachCamera: false
        }
    }

    this.Camera = {
        Attach: false,
        NavigationMode: {
            active: false,
            rotSpeed: 30
        },
        PresetPos: {
            Default: 'front',
            yz45: () => {
                camera = {
                    x: 0,
                    y: -5,
                    z: 5,
                    fov: 30,
                    speed: 0.1
                }
                at = {
                    x: 0,
                    y: 0,
                    z: 0,
                    vertivalAngle: 135,
                    horizontalAngle: 90
                }
            },
            up: () => {
                camera = {
                    x: 0,
                    y: 0,
                    z: 10,
                    fov: 30,
                    speed: 0.1
                }
                at = {
                    x: 2,
                    y: 2,
                    z: 0,
                    vertivalAngle: 180,
                    horizontalAngle: 90
                }
            },
            front: () => {
                // camera = {
                //     x: -2,
                //     y: -5,
                //     z: 1,
                //     fov: 30,
                //     speed: 0.1
                // }
                // at = {
                //     x: -2,
                //     y: 2,
                //     z: 1,
                //     vertivalAngle: 90,
                //     horizontalAngle: 90
                // }
                camera = {
                    x: 0,
                    y: -5,
                    z: 0,
                    fov: 30,
                    speed: 0.1
                }
                at = {
                    x: 0,
                    y: 0,
                    z: 0,
                    vertivalAngle: 90,
                    horizontalAngle: 90
                }
            },
            left: () => {
                camera = {
                    x: 0,
                    y: 2,
                    z: 0.5,
                    fov: 30,
                    speed: 0.1
                }
                at = {
                    x: 1,
                    y: 2,
                    z: 0,
                    vertivalAngle: 90,
                    horizontalAngle: 0
                }
            },
            right: () => {
                camera = {
                    x: 5,
                    y: 2,
                    z: 0.5,
                    fov: 30,
                    speed: 0.1
                }
                at = {
                    x: 1,
                    y: 2,
                    z: 0,
                    vertivalAngle: 90,
                    horizontalAngle: 180
                }
            }
        },
        Parameters: {
            Customize: false,
            fov: 30,

            left: -0.49938833332929145,
            right: 0.49938833332929145,
            bottom: -0.3152987888789835,
            top: 0.3152987888789835,

            // left: -0.18442004632544318,
            // right: 0.18442004632544318,
            // bottom: -0.10786832898280638,
            // top: 0.10786832898280638,

            near: 1,
            far: 20
        }
    }

    this.Sphere = {
        Pause: false,
        Size: 0.3,
        Matl: 'MATL_SILVER_DULL',
        isNormal: 0,
        isNormalBool: false,
        Body: {
            Pause: false,
            rotSpeed: 45,
            rotMaxAngle: 180,
            rotMinAngle: -180,

            angle: 0
        }
    }

    this.Torus = {
        Pause: false,
        Size: 0.3,
        Matl: 'MATL_BRASS',
        isNormal: 0,
        isNormalBool: false,
        Body: {
            Pause: false,
            rotSpeed: 45,
            rotMaxAngle: 180,
            rotMinAngle: -180,

            angle: 0
        }
    }

    this.Icosahedron = {
        Pause: false,
        Size: 0.3,
        Matl: 'MATL_BRONZE_DULL',
        isNormal: 0,
        isNormalBool: false,
        Body: {
            Pause: false,
            rotSpeed: 45,
            rotMaxAngle: 180,
            rotMinAngle: -180,

            qTot: new Quaternion(0, 0, 0, 1),

            angle: 0,
        }
    }

    this.EnderDragon = {
        Pause: false,
        Size: 0.5,
        Matl: 'MATL_RUBY',
        isNormal: 0,
        isNormalBool: false,
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
        Matl: 'MATL_PEWTER',
        isNormal: 0,
        isNormalBool: false,
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

    this.GroundGrid = {
        isNormal: 1,
        isNormalBool: false
    }
};

// const
const floatsPerVertex = 7;

let gl, canvas, gui, interval;
let config = new Config();

let mvpMatrix = new Matrix4();
let modelMatrix = new Matrix4();
let quatMatrix = new Matrix4();
let colorMatrix = new Matrix4();
let normalMatrix = new Matrix4();

// Project C
let u_eyePosWorld, u_ModelMatrix, u_MvpMatrix, u_NormalMatrix, u_ColorMatrix, u_isNormal;
let eyePosWorld = new Float32Array(3);
let Lamp = [new LightsT(), new LightsT()];
let matlSel = MATL_RED_PLASTIC;
let Matl = new Material(matlSel);

// lookAt Function
// eye
let camera, at;
eval('config.Camera.PresetPos.' + config.Camera.PresetPos.Default + '();')

let up = {
    x: 0,
    y: 0,
    z: 1
}
// z
let z = {
    near: 1,
    far: 20
}

// Position
let targetPos = {
    x: null,
    y: null
};
let mousePos = {
    x: null,
    y: null
};
let premousePos = {
    x: null,
    y: null
};
let dragTotal = {
    x: 0,
    y: 0
}
let EnderDragonPos = {
    x: null,
    y: null,
    z: null
};
let CloverPos = {
    x: 0,
    y: 0,
    z: -2
};

// Animation
let g_last = Date.now();

// Mouse
let dragMode = false;

// Random
let hasTarget = false;

let vertices, indices;
let n;

let Info = {
    Env: {
        GroundGrid: {
            vertices: null,
            // normals: null,
            n: null,
            position: null
        },
        n: null
    },
    Sphere: {
        Body: {
            vertices: null,
            normals: null,
            // indices: null,
            n: null,
            position: null
        },
        n: null
    },
    Torus: {
        Body: {
            vertices: null,
            normals: null,
            n: null,
            position: null
        },
        n: null
    },
    Icosahedron: {
        Body: {
            vertices: null,
            normals: null,
            n: null,
            position: null
        },
        n: null
    },
    EnderDragon: {
        Axes: {
            vertices: null,
            // normals: null,
            n: null,
            position: null
        },
        Body: {
            vertices: null,
            normals: null,
            n: null,
            position: null
        },
        Fin: {
            vertices: null,
            normals: null,
            n: null,
            position: null
        },
        Neck: {
            vertices: null,
            normals: null,
            n: null,
            position: null
        },
        Head: {
            vertices: null,
            normals: null,
            n: null,
            position: null
        },
        Tail: {
            vertices: null,
            normals: null,
            n: null,
            position: null
        },
        Wing1: {
            vertices: null,
            normals: null,
            n: null,
            position: null
        },
        // Wing2: {
        //     vertices: null,
        //     normals: null,
        //     n: null,
        //     position: null
        // },
        n: null
    },
    Clover: {
        Stem: {
            vertices: null,
            normals: null,
            n: null,
            position: null
        },
        Stamen: {
            vertices: null,
            normals: null,
            n: null,
            position: null
        },
        Petal: {
            vertices: null,
            normals: null,
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

/* var VSHADER_SOURCE =
    'attribute vec4 a_Position;\n' +
    'attribute vec4 a_Color;\n' +
    'uniform mat4 u_MvpMatrix;\n' +
    'uniform mat4 u_ModelMatrix;\n' +
    'varying vec4 v_Color;\n' +
    'void main() {\n' +
    '   gl_Position = u_MvpMatrix * u_ModelMatrix * a_Position;\n' +
    '   gl_PointSize = 10.0;\n' +
    '   v_Color = a_Color;\n' +
    '}\n';

var FSHADER_SOURCE =
    'precision mediump float;\n' +
    'uniform mat4 u_ColorMatrix;\n' +
    'varying vec4 v_Color;\n' +
    'void main() {\n' +
    '  gl_FragColor = u_ColorMatrix * v_Color;\n' +
    '}\n'; */

function initCfg() {
    gui = new dat.GUI({ name: 'GUI' });
    gui.width = 300;
    gui.remember(config);
    gui.closed = true;

    // Env
    let Env = gui.addFolder('Env');
    Env.add(config.Env, 'Pause').listen();
    Env.addColor(config.Env, 'bgClr').listen();
    // Env.add(config.Env, 'Width', 0, 1000).listen();
    // Env.add(config.Env, 'Height', 0, 1000).listen();
    // Env.open();

    /* // Material
    let Material = gui.addFolder('Material');
    Material.add(config.Material, 'Type', ['MATL_RED_PLASTIC', 'MATL_GRN_PLASTIC', 'MATL_BLU_PLASTIC', 'MATL_BLACK_PLASTIC', 'MATL_BLACK_RUBBER', 'MATL_BRASS', 'MATL_BRONZE_DULL', 'MATL_BRONZE_SHINY', 'MATL_CHROME', 'MATL_COPPER_DULL', 'MATL_COPPER_SHINY', 'MATL_GOLD_DULL', 'MATL_GOLD_SHINY', 'MATL_PEWTER', 'MATL_SILVER_DULL', 'MATL_SILVER_SHINY', 'MATL_EMERALD', 'MATL_JADE', 'MATL_OBSIDIAN', 'MATL_PEARL', 'MATL_RUBY', 'MATL_TURQUOISE', 'MATL_DEFAULT']).listen().onChange(() => {
        updateMatl(config.Material.Type);
    }); */

    // Lighting
    let Lighting = gui.addFolder('Lighting');
    Lighting.add(config.Lighting, 'Type', ['Phong Lighting', 'Blinn-Phong Lighting']).listen().onChange(() => {
        console.log(config.Lighting.Type);
    });

    // Shading
    let Shading = gui.addFolder('Shading');
    Shading.add(config.Shading, 'Type', ['Gouraud Shading', 'Phong Shading']).listen().onChange(() => {
        console.log(config.Shading.Type);
    });

    // Light
    let Light = gui.addFolder('Light');
    // LeftLight
    let LeftLight = Light.addFolder('Left Light');
    LeftLight.add(config.Light['left'], 'isLitBool').name('isLit').listen().onChange(() => {
        config.Light['left'].isLit = config.Light['left'].isLitBool === true ? 1 : 0;
    });
    LeftLight.add(config.Light['left'], 'attachCamera').listen();
    LeftLight.add(config.Light['left'].Position, 'x', -10, 10).listen();
    LeftLight.add(config.Light['left'].Position, 'y', -10, 10).listen();
    LeftLight.add(config.Light['left'].Position, 'z', -10, 10).listen();
    LeftLight.addColor(config.Light['left'], 'Ambient').listen();
    LeftLight.addColor(config.Light['left'], 'Diffuse').listen();
    LeftLight.addColor(config.Light['left'], 'Specular').listen();

    // RightLight
    let RightLight = Light.addFolder('Right Light');
    RightLight.add(config.Light['right'], 'isLitBool').name('isLit').listen().onChange(() => {
        config.Light['right'].isLit = config.Light['right'].isLitBool === true ? 1 : 0;
    });
    RightLight.add(config.Light['right'], 'attachCamera').listen();
    RightLight.add(config.Light['right'].Position, 'x', -10, 10).listen();
    RightLight.add(config.Light['right'].Position, 'y', -10, 10).listen();
    RightLight.add(config.Light['right'].Position, 'z', -10, 10).listen();
    RightLight.addColor(config.Light['right'], 'Ambient').listen();
    RightLight.addColor(config.Light['right'], 'Diffuse').listen();
    RightLight.addColor(config.Light['right'], 'Specular').listen();

    // Camera
    let Camera = gui.addFolder('Camera');
    Camera.add(config.Camera, 'Attach');

    let NavigationMode = Camera.addFolder('Flying-Airplane Navigation Mode');
    NavigationMode.add(config.Camera.NavigationMode, 'active').listen();
    NavigationMode.add(config.Camera.NavigationMode, 'rotSpeed', 1, 60).listen();


    let PresetCameraDir = Camera.addFolder('Preset Cameras');
    PresetCameraDir.add(config.Camera.PresetPos, 'yz45').name('Look From Y-Z 45 Degree');
    PresetCameraDir.add(config.Camera.PresetPos, 'up').name('Look From Up');
    PresetCameraDir.add(config.Camera.PresetPos, 'front').name('Look From Front');
    PresetCameraDir.add(config.Camera.PresetPos, 'left').name('Look From Left');
    PresetCameraDir.add(config.Camera.PresetPos, 'right').name('Look From Right');

    let CustomeCameraPara = Camera.addFolder('Customize Camera Parameters');
    CustomeCameraPara.add(config.Camera.Parameters, 'Customize').listen();
    CustomeCameraPara.add(config.Camera.Parameters, 'fov', 10, 40).listen();
    CustomeCameraPara.add(config.Camera.Parameters, 'left', -3, 0).listen().onChange(() => {
        config.Camera.Parameters.right = - config.Camera.Parameters.left;
        updateCameraPara(changePara = 'left');
    });
    CustomeCameraPara.add(config.Camera.Parameters, 'right', 0, 3).listen().onChange(() => {
        config.Camera.Parameters.left = - config.Camera.Parameters.right;
        updateCameraPara(changePara = 'right');
    });
    CustomeCameraPara.add(config.Camera.Parameters, 'bottom', -3, 0).listen().onChange(() => {
        config.Camera.Parameters.top = - config.Camera.Parameters.bottom;
        updateCameraPara(changePara = 'bottom');
    });
    CustomeCameraPara.add(config.Camera.Parameters, 'top', 0, 3).listen().onChange(() => {
        config.Camera.Parameters.bottom = - config.Camera.Parameters.top;
        updateCameraPara(changePara = 'top');
    });
    CustomeCameraPara.add(config.Camera.Parameters, 'near', 0, 1).listen();
    CustomeCameraPara.add(config.Camera.Parameters, 'far', 10, 100).listen();

    // EnderDragon
    let EnderDragon = gui.addFolder('EnderDragon');
    EnderDragon.add(config.EnderDragon, 'Pause').listen();
    EnderDragon.add(config.EnderDragon, 'Size', 0, 1).listen();
    EnderDragon.add(config.EnderDragon, 'Matl', ['MATL_RED_PLASTIC', 'MATL_GRN_PLASTIC', 'MATL_BLU_PLASTIC', 'MATL_BLACK_PLASTIC', 'MATL_BLACK_RUBBER', 'MATL_BRASS', 'MATL_BRONZE_DULL', 'MATL_BRONZE_SHINY', 'MATL_CHROME', 'MATL_COPPER_DULL', 'MATL_COPPER_SHINY', 'MATL_GOLD_DULL', 'MATL_GOLD_SHINY', 'MATL_PEWTER', 'MATL_SILVER_DULL', 'MATL_SILVER_SHINY', 'MATL_EMERALD', 'MATL_JADE', 'MATL_OBSIDIAN', 'MATL_PEARL', 'MATL_RUBY', 'MATL_TURQUOISE', 'MATL_DEFAULT']).listen();
    EnderDragon.add(config.EnderDragon, 'isNormalBool').name('isNormal').listen().onChange(() => {
        config.EnderDragon.isNormal = config.EnderDragon.isNormalBool === true ? 1 : 0;
    });

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
    // EnderDragon.open();

    // Clover
    let Clover = gui.addFolder('Clover');
    Clover.add(config.Clover, 'Pause').listen();
    Clover.add(config.Clover, 'Size', 0, 2).listen();
    Clover.add(config.Clover, 'Matl', ['MATL_RED_PLASTIC', 'MATL_GRN_PLASTIC', 'MATL_BLU_PLASTIC', 'MATL_BLACK_PLASTIC', 'MATL_BLACK_RUBBER', 'MATL_BRASS', 'MATL_BRONZE_DULL', 'MATL_BRONZE_SHINY', 'MATL_CHROME', 'MATL_COPPER_DULL', 'MATL_COPPER_SHINY', 'MATL_GOLD_DULL', 'MATL_GOLD_SHINY', 'MATL_PEWTER', 'MATL_SILVER_DULL', 'MATL_SILVER_SHINY', 'MATL_EMERALD', 'MATL_JADE', 'MATL_OBSIDIAN', 'MATL_PEARL', 'MATL_RUBY', 'MATL_TURQUOISE', 'MATL_DEFAULT']).listen();
    Clover.add(config.Clover, 'isNormalBool').name('isNormal').listen().onChange(() => {
        config.Clover.isNormal = config.Clover.isNormalBool === true ? 1 : 0;
    });


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
    // Clover.open();

    // Sphere
    let Sphere = gui.addFolder('Sphere');
    Sphere.add(config.Sphere, 'Matl', ['MATL_RED_PLASTIC', 'MATL_GRN_PLASTIC', 'MATL_BLU_PLASTIC', 'MATL_BLACK_PLASTIC', 'MATL_BLACK_RUBBER', 'MATL_BRASS', 'MATL_BRONZE_DULL', 'MATL_BRONZE_SHINY', 'MATL_CHROME', 'MATL_COPPER_DULL', 'MATL_COPPER_SHINY', 'MATL_GOLD_DULL', 'MATL_GOLD_SHINY', 'MATL_PEWTER', 'MATL_SILVER_DULL', 'MATL_SILVER_SHINY', 'MATL_EMERALD', 'MATL_JADE', 'MATL_OBSIDIAN', 'MATL_PEARL', 'MATL_RUBY', 'MATL_TURQUOISE', 'MATL_DEFAULT']).listen();
    Sphere.add(config.Sphere, 'isNormalBool').name('isNormal').listen().onChange(() => {
        config.Sphere.isNormal = config.Sphere.isNormalBool === true ? 1 : 0;
    });


    // Torus
    let Torus = gui.addFolder('Torus');
    Torus.add(config.Torus, 'Matl', ['MATL_RED_PLASTIC', 'MATL_GRN_PLASTIC', 'MATL_BLU_PLASTIC', 'MATL_BLACK_PLASTIC', 'MATL_BLACK_RUBBER', 'MATL_BRASS', 'MATL_BRONZE_DULL', 'MATL_BRONZE_SHINY', 'MATL_CHROME', 'MATL_COPPER_DULL', 'MATL_COPPER_SHINY', 'MATL_GOLD_DULL', 'MATL_GOLD_SHINY', 'MATL_PEWTER', 'MATL_SILVER_DULL', 'MATL_SILVER_SHINY', 'MATL_EMERALD', 'MATL_JADE', 'MATL_OBSIDIAN', 'MATL_PEARL', 'MATL_RUBY', 'MATL_TURQUOISE', 'MATL_DEFAULT']).listen();
    Torus.add(config.Torus, 'isNormalBool').name('isNormal').listen().onChange(() => {
        config.Torus.isNormal = config.Torus.isNormalBool === true ? 1 : 0;
    });


    // Icosahedron
    let Icosahedron = gui.addFolder('Icosahedron');
    Icosahedron.add(config.Icosahedron, 'Matl', ['MATL_RED_PLASTIC', 'MATL_GRN_PLASTIC', 'MATL_BLU_PLASTIC', 'MATL_BLACK_PLASTIC', 'MATL_BLACK_RUBBER', 'MATL_BRASS', 'MATL_BRONZE_DULL', 'MATL_BRONZE_SHINY', 'MATL_CHROME', 'MATL_COPPER_DULL', 'MATL_COPPER_SHINY', 'MATL_GOLD_DULL', 'MATL_GOLD_SHINY', 'MATL_PEWTER', 'MATL_SILVER_DULL', 'MATL_SILVER_SHINY', 'MATL_EMERALD', 'MATL_JADE', 'MATL_OBSIDIAN', 'MATL_PEARL', 'MATL_RUBY', 'MATL_TURQUOISE', 'MATL_DEFAULT']).listen();
    Icosahedron.add(config.Icosahedron, 'isNormalBool').name('isNormal').listen().onChange(() => {
        config.Icosahedron.isNormal = config.Icosahedron.isNormalBool === true ? 1 : 0;
    });

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
    // if (isMouseInCanvas()) {
    //     dragMode = true;
    // };
    let pos = getMousePos(event);
    let x = pos.x;
    let y = pos.y;

    dragMode = true;
    premousePos.x = x;
    premousePos.y = y;
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

    /*
    // Update mousePos
    if (dragMode) {
        // EnderDragonPos.x = x;
        // EnderDragonPos.y = y;

        if (isMouseInCanvas()) {
            if (x > mousePos.x) {
                config.Clover.Stem.Xangle += 5;
                config.Clover.Stem.Xangle %= 360;
            } else {
                config.Clover.Stem.Xangle -= 5;
                config.Clover.Stem.Xangle %= 360;
            }
            mousePos.x = x;
            mousePos.y = y;
        } else {
            mousePos.x = null;
            mousePos.y = null;
        }
    } else {
        if (isMouseInCanvas()) {
            mousePos.x = x;
            mousePos.y = y;
        }
    }
    */

    if (dragMode) {
        dragTotal.x += x - premousePos.x;
        dragTotal.y += y - premousePos.y;
        dragQuat(x - premousePos.x, y - premousePos.y);
        premousePos.x = x;
        premousePos.y = y;
    }
    document.getElementById('mousePos').innerHTML = `Mouse Position: (${x}, ${y})`;
    // console.debug(`MouseMoveEvent: Position = (${x}, ${y})`);
}

function keyDown(event) {
    event.preventDefault();
    if (event.isComposing || event.keyCode === 229) {
        return;
    }
    console.debug(`KeyDownEvent: key='${event.key}' | code='${event.code}'`);
    switch (event.code) {
        // Arrow: aim camera in any direction without changing position
        case 'ArrowUp':
            if (at.vertivalAngle >= 1 && at.vertivalAngle <= 180) {
                at.vertivalAngle -= 1;
            }
            updateAt();
            break;
        case 'ArrowDown':
            if (at.vertivalAngle >= 0 && at.vertivalAngle <= 179) {
                at.vertivalAngle += 1;
            }
            updateAt();
            break;
        case 'ArrowLeft':
            at.horizontalAngle += 1;
            updateAt();
            break;
        case 'ArrowRight':
            at.horizontalAngle -= 1;
            updateAt();
            break;

        // IKJL: X Z
        case 'KeyI':
            camera.z += 0.1;
            at.z += 0.1;
            // updateAt();
            break;
        case 'KeyK':
            camera.z -= 0.1;
            at.z -= 0.1;
            // updateAt();
            break;
        case 'KeyJ':
            camera.x -= 0.1;
            at.x -= 0.1;
            // updateAt();
            break;
        case 'KeyL':
            camera.x += 0.1;
            at.x += 0.1;
            // updateAt();
            break;

        // WSAD: move forward/backward in the gaze direction
        case 'KeyW':
            moveBackFor(mode = 'forward');
            break;
        case 'KeyS':
            moveBackFor(mode = 'backward');
            break;
        case 'KeyA':
            moveBackFor(mode = 'left');
            break;
        case 'KeyD':
            moveBackFor(mode = 'right');
            break;

        // Other
        case 'Space':
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
    defAxes();

    // Sphere
    defSphere();

    // Torus
    defTorus();

    // Icosahedron
    defIcosahedron();

    // EnderDragon
    defEnderDragonBody();
    defCuboid(w = 0.02, OffsetX = 0, h = 0.05, OffsetY = 0.1, l = 0.05, OffsetZ = 0, Level1 = 'EnderDragon', Level2 = 'Fin');
    defEnderDragonNeck();
    defCuboid(w = 0.1, OffsetX = 0, h = 0.1, OffsetY = 0, l = 0.12, OffsetZ = 0.12, Level1 = 'EnderDragon', Level2 = 'Head');
    defEnderDragonTail();
    defEnderDragonWing1();

    // Clover
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
                    for (let i = 0; i < v2.n * floatsPerVertex; i++) {
                        vertices[v2.position * floatsPerVertex + i] = v2.vertices[i];
                    }
                }
            }
        }
    }

    normals = new Float32Array(n * floatsPerVertex);
    for (const [k1, v1] of Object.entries(Info)) {
        if (k1 != n) {
            for (const [k2, v2] of Object.entries(v1)) {
                if (k2 != n && typeof v2.normals != 'undefined') {
                    for (let i = 0; i < v2.n * floatsPerVertex; i++) {
                        normals[v2.position * floatsPerVertex + i] = v2.normals[i];
                    }
                }
            }
        }
    }

    // for (let i = 0; i < Sphere_Vertices.length; i++) {
    //     vertices[n * floatsPerVertex + i] = Sphere_Vertices[i];
    // }
    // for (let i = 0; i < Sphere_Indices.length; i++) {
    //     Sphere_Indices[i] += n * floatsPerVertex;
    // }
    // indices = Sphere_Indices;
    console.log(vertices);
    console.log(normals);

    // vertices = Cube;
    // n = parseInt(vertices.length / 7);
    // console.log(n);

    // vertexBuffer
    let vertexBuffer = gl.createBuffer();
    if (!vertexBuffer) {
        console.log('Failed to create the buffer object');
        return false;
    }
    let FSIZE = vertices.BYTES_PER_ELEMENT;
    // Bind the buffer object to target
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    // Write date into the buffer object
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);
    let a_Position = gl.getAttribLocation(gl.program, 'a_Position');
    if (a_Position < 0) {
        console.log('Failed to get the storage location of a_Position');
        return -1;
    }
    gl.vertexAttribPointer(a_Position, 4, gl.FLOAT, false, FSIZE * 7, 0);
    gl.enableVertexAttribArray(a_Position);

    // Color
    let a_Color = gl.getAttribLocation(gl.program, 'a_Color');
    if (a_Color < 0) {
        console.log('Failed to get the storage location of a_Color');
        return -1;
    }
    // Assign the buffer object to a_Color variable
    gl.vertexAttribPointer(a_Color, 3, gl.FLOAT, false, FSIZE * 7, FSIZE * 4);
    // Enable the assignment to a_Color variable
    gl.enableVertexAttribArray(a_Color);


    // a_Normal
    vertexBuffer = gl.createBuffer();
    if (!vertexBuffer) {
        console.log('Failed to create the buffer object');
        return false;
    }
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    // Write date into the buffer object
    gl.bufferData(gl.ARRAY_BUFFER, normals, gl.STATIC_DRAW);
    let a_Normal = gl.getAttribLocation(gl.program, 'a_Normal');
    if (a_Normal < 0) {
        console.log('Failed to get the storage location of a_Normal');
        return -1;
    }
    gl.vertexAttribPointer(a_Normal, 4, gl.FLOAT, false, FSIZE * 7, 0);
    gl.enableVertexAttribArray(a_Normal);


    // // indiceBuffer
    // // gl.bindBuffer(gl.ARRAY_BUFFER, null);
    // let indiceBuffer = gl.createBuffer();
    // console.log(indices)
    // gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indiceBuffer);
    // // Write date into the buffer object
    // gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW);
    // gl.vertexAttribPointer(a_Position + 7, 3, gl.FLOAT, false, 0, 0);
    // gl.enableVertexAttribArray(a_Position + n * floatsPerVertex);

    return Info.n;
}

function drawScene(interval, modelMatrix, u_ModelMatrix, u_ColorMatrix, u_NormalMatrix, u_isNormal) {
    if (!config.Env.Pause && !hasTarget) {
        // console.debug(`Update Target!`);
        targetPos.x = 2 * Math.random() - 1;
        targetPos.y = 2 * Math.random() + 2;
        hasTarget = true;
    }
    colorMatrix.setIdentity();

    // Clear
    // gl.clearColor(config.Env.bgClr[0] / 255, config.Env.bgClr[1] / 255, config.Env.bgClr[2] / 255, config.Env.bgClr[3]);
    // gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    // modelMatrix.perspective(42.0,   // FOVY: top-to-bottom vertical image angle, in degrees
    //     1.0,   // Image Aspect Ratio: camera lens width/height
    //     1.0,   // camera z-near distance (always positive; frustum begins at z = -znear)
    //     1000);  // camera z-far distance (always positive; frustum ends at z = -zfar)

    // modelMatrix.lookAt(5, 5, 3,    // center of projection
    //     0, 0, 0,	// look-at point 
    //     0, 0, 1);	// View UP vector.

    pushMatrix(modelMatrix);
    drawAxes(modelMatrix, u_ModelMatrix, colorMatrix, u_ColorMatrix, name = 'world');
    modelMatrix = popMatrix();

    // Sphere
    gl.uniform1i(u_isNormal, config.Sphere.isNormal);
    updateMatl(config.Sphere.Matl);
    updateMatlValue()
    pushMatrix(modelMatrix);
    drawSphere(interval, modelMatrix, u_ModelMatrix, colorMatrix, u_ColorMatrix, u_NormalMatrix);
    modelMatrix = popMatrix();

    // EnderDragon
    pushMatrix(modelMatrix);
    pushMatrix(modelMatrix);
    pushMatrix(modelMatrix);
    pushMatrix(modelMatrix);

    gl.uniform1i(u_isNormal, config.EnderDragon.isNormal);
    updateMatl(config.EnderDragon.Matl);
    updateMatlValue();
    // Body
    drawEnderDragonBody(interval, modelMatrix, u_ModelMatrix, colorMatrix, u_ColorMatrix);

    pushMatrix(modelMatrix);
    drawAxes(modelMatrix, u_ModelMatrix, colorMatrix, u_ColorMatrix);
    modelMatrix = popMatrix();

    // Fin
    pushMatrix(modelMatrix);
    drawEnderDragonFin(interval, modelMatrix, u_ModelMatrix, colorMatrix, u_ColorMatrix);
    modelMatrix = popMatrix();

    // Neck + Head
    pushMatrix(modelMatrix);
    pushMatrix(colorMatrix);
    for (let i = 1; i <= config.EnderDragon.Neck.Num; i++) {
        drawEnderDragonNeck(interval, modelMatrix, u_ModelMatrix, colorMatrix, u_ColorMatrix, idx = i);
    }
    colorMatrix = popMatrix();
    drawEnderDragonHead(interval, modelMatrix, u_ModelMatrix, colorMatrix, u_ColorMatrix);
    modelMatrix = popMatrix();

    // Tail
    pushMatrix(modelMatrix);
    for (let i = 1; i <= config.EnderDragon.Tail.Num; i++) {
        drawEnderDragonTail(interval, modelMatrix, u_ModelMatrix, colorMatrix, u_ColorMatrix, idx = i);
    }
    modelMatrix = popMatrix();

    // Wing
    pushMatrix(modelMatrix);
    drawEnderDragonWing1(interval, modelMatrix, u_ModelMatrix, colorMatrix, u_ColorMatrix, idx = 1);
    modelMatrix = popMatrix();

    pushMatrix(modelMatrix);
    drawEnderDragonWing1(interval, modelMatrix, u_ModelMatrix, colorMatrix, u_ColorMatrix, idx = 2);
    modelMatrix = popMatrix();

    // Clover
    gl.uniform1i(u_isNormal, config.Clover.isNormal);
    updateMatl(config.Clover.Matl);
    updateMatlValue();
    modelMatrix = popMatrix();
    pushMatrix(modelMatrix);
    for (let i = 1; i <= config.Clover.Stem.Num; i++) {
        drawCloverStem(interval, modelMatrix, u_ModelMatrix, colorMatrix, u_ColorMatrix, idx = i);
    }

    pushMatrix(modelMatrix);
    attachCamera(modelMatrix, u_ModelMatrix);
    updateAt();
    modelMatrix = popMatrix();

    drawCloverStamen(interval, modelMatrix, u_ModelMatrix, colorMatrix, u_ColorMatrix);

    pushMatrix(modelMatrix);
    pushMatrix(colorMatrix);
    colorMatrix.setIdentity();
    drawAxes(modelMatrix, u_ModelMatrix, colorMatrix, u_ColorMatrix);
    colorMatrix = popMatrix();
    modelMatrix = popMatrix();

    for (let i = 1; i <= config.Clover.Petal.Num; i++) {
        drawCloverPetal(interval, modelMatrix, u_ModelMatrix, colorMatrix, u_ColorMatrix, idx = i);
    }
    modelMatrix = popMatrix();

    // Torus
    gl.uniform1i(u_isNormal, config.Torus.isNormal);
    // updateIsNormal(config.Torus.isNormal)
    updateMatl(config.Torus.Matl);
    updateMatlValue();
    modelMatrix = popMatrix();
    pushMatrix(modelMatrix);
    drawTorus(interval, modelMatrix, u_ModelMatrix, colorMatrix, u_ColorMatrix);
    // drawSphere(interval, modelMatrix, u_ModelMatrix, colorMatrix, u_ColorMatrix, u_NormalMatrix);
    modelMatrix = popMatrix();

    // Icosahedron
    gl.uniform1i(u_isNormal, config.Icosahedron.isNormal);
    updateMatl(config.Icosahedron.Matl);
    updateMatlValue();
    modelMatrix = popMatrix();
    pushMatrix(modelMatrix);
    drawIcosahedron(interval, modelMatrix, u_ModelMatrix, colorMatrix, u_ColorMatrix, quatMatrix);

    pushMatrix(modelMatrix);
    pushMatrix(colorMatrix);
    colorMatrix.setIdentity();
    gl.uniform1i(u_isNormal, 1);
    drawAxes(modelMatrix, u_ModelMatrix, colorMatrix, u_ColorMatrix, name = 'Icosahedron');
    colorMatrix = popMatrix();
    modelMatrix = popMatrix();

    modelMatrix = popMatrix();

    // GroundGrid
    gl.uniform1i(u_isNormal, config.GroundGrid.isNormal);
    colorMatrix.setIdentity();
    modelMatrix = popMatrix();
    pushMatrix(modelMatrix);
    drawGroundGrid(interval, modelMatrix, u_ModelMatrix, colorMatrix, u_ColorMatrix);
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

    initShader(gl, mode = 'Blinn-Phong Lighting + Phong Shading');
    initShader(gl, mode = 'Blinn-Phong Lighting + Gouraud Shading');
    initShader(gl, mode = 'Phong Lighting + Phong Shading');
    initShader(gl, mode = 'Phong Lighting + Gouraud Shading');

    n = initVertexBuffer();
    if (n < 0) {
        console.log('Failed to set the vertex information');
        return;
    }

    gl.enable(gl.DEPTH_TEST);
    // gl.clearDepth(0.0);
    // gl.depthFunc(gl.GREATER);

    let tick = () => {
        showInfo();
        let now = Date.now();
        interval = now - g_last;
        g_last = now;
        updateNavCamera(interval);
        updateShader();

        // draw(interval, modelMatrix, u_ModelMatrix, u_ColorMatrix);
        drawResize(interval, modelMatrix, u_ModelMatrix, u_ColorMatrix);
        requestAnimationFrame(tick, canvas);
    };
    tick();
}

function updateInfo(Level1, Level2, Vertices, type) {
    if (type) {
        Info[Level1][Level2].normals = Vertices;
    } else {
        Info[Level1][Level2].vertices = Vertices;
        Info[Level1][Level2].position = Info.n;
        Info[Level1][Level2].n = Vertices.length / floatsPerVertex;
        Info[Level1].n += Info[Level1][Level2].n;
        Info.n += Info[Level1][Level2].n;
    }
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
    //==============================================================================
    // Create a list of vertices that create a large grid of lines in the x,y plane
    // centered at x=y=z=0.  Draw this shape using the GL_LINES primitive.

    let xcount = 100;			// # of lines to draw in x,y to make the grid.
    let ycount = 100;
    let xymax = 50.0;			// grid size; extends to cover +/-xymax in x and y.
    // let xColr = new Float32Array([1.0, 1.0, 0.3]);	// bright yellow
    // let yColr = new Float32Array([0.5, 1.0, 0.5]);	// bright green.
    // let xColr = new Float32Array([1.0, 0.0, 0.0]);	// red
    // let yColr = new Float32Array([0.0, 1.0, 0.0]);	// green.
    let xColr = new Float32Array([1.0, 1.0, 0.0]);	// red
    let yColr = new Float32Array([1.0, 0.843, 0.0]);	// green.

    // Create an (global) array to hold this ground-plane's vertices:
    GroundGrid_Vertices = new Float32Array(floatsPerVertex * 2 * (xcount + ycount));
    // draw a grid made of xcount+ycount lines; 2 vertices per line.

    let xgap = xymax / (xcount - 1);		// HALF-spacing between lines in x,y;
    let ygap = xymax / (ycount - 1);		// (why half? because v==(0line number/2))

    // First, step thru x values as we make vertical lines of constant-x:
    for (v = 0, j = 0; v < 2 * xcount; v++, j += floatsPerVertex) {
        if (v % 2 == 0) {	// put even-numbered vertices at (xnow, -xymax, 0)
            GroundGrid_Vertices[j] = -xymax + (v) * xgap;	// x
            GroundGrid_Vertices[j + 1] = -xymax;								// y
            GroundGrid_Vertices[j + 2] = 0.0;									// z
            GroundGrid_Vertices[j + 3] = 1.0;									// w.
        }
        else {				// put odd-numbered vertices at (xnow, +xymax, 0).
            GroundGrid_Vertices[j] = -xymax + (v - 1) * xgap;	// x
            GroundGrid_Vertices[j + 1] = xymax;								// y
            GroundGrid_Vertices[j + 2] = 0.0;									// z
            GroundGrid_Vertices[j + 3] = 1.0;									// w.
        }
        GroundGrid_Vertices[j + 4] = xColr[0];			// red
        GroundGrid_Vertices[j + 5] = xColr[1];			// grn
        GroundGrid_Vertices[j + 6] = xColr[2];			// blu
    }
    // Second, step thru y values as wqe make horizontal lines of constant-y:
    // (don't re-initialize j--we're adding more vertices to the array)
    for (v = 0; v < 2 * ycount; v++, j += floatsPerVertex) {
        if (v % 2 == 0) {		// put even-numbered vertices at (-xymax, ynow, 0)
            GroundGrid_Vertices[j] = -xymax;								// x
            GroundGrid_Vertices[j + 1] = -xymax + (v) * ygap;	// y
            GroundGrid_Vertices[j + 2] = 0.0;									// z
            GroundGrid_Vertices[j + 3] = 1.0;									// w.
        }
        else {					// put odd-numbered vertices at (+xymax, ynow, 0).
            GroundGrid_Vertices[j] = xymax;								// x
            GroundGrid_Vertices[j + 1] = -xymax + (v - 1) * ygap;	// y
            GroundGrid_Vertices[j + 2] = 0.0;									// z
            GroundGrid_Vertices[j + 3] = 1.0;									// w.
        }
        GroundGrid_Vertices[j + 4] = yColr[0];			// red
        GroundGrid_Vertices[j + 5] = yColr[1];			// grn
        GroundGrid_Vertices[j + 6] = yColr[2];			// blu
    }

    updateInfo('Env', 'GroundGrid', GroundGrid_Vertices);
}

function drawGroundGrid(interval, modelMatrix, u_ModelMatrix, colorMatrix, u_ColorMatrix) {
    modelMatrix.rotate(-90, 1, 0, 0);
    // modelMatrix.translate(0.0, 0.0, -0.6);
    modelMatrix.scale(0.4, 0.4, 0.4);
    colorMatrix.setIdentity();
    gl.uniformMatrix4fv(u_ModelMatrix, false, modelMatrix.elements);
    gl.uniformMatrix4fv(u_ColorMatrix, false, colorMatrix.elements);
    gl.drawArrays(gl.LINES, Info.Env.GroundGrid.position, Info.Env.GroundGrid.n);
}

function draw(interval, modelMatrix, u_ModelMatrix, u_ColorMatrix, u_NormalMatrix, u_isNormal) {
    // Project C
    eyePosWorld.set([camera.x, camera.y, camera.z]);
    gl.uniform3fv(u_eyePosWorld, eyePosWorld);

    // Left Light
    Lamp[0].isLit = config.Light['left'].isLit;
    if (config.Light['left'].attachCamera) {
        Lamp[0].I_pos.elements.set([camera.x, camera.y, camera.z]);
    } else {
        Lamp[0].I_pos.elements.set([config.Light['left'].Position.x, config.Light['left'].Position.y, config.Light['left'].Position.z]);
    }
    Lamp[0].I_ambi.elements.set([config.Light['left'].Ambient[0] / 255., config.Light['left'].Ambient[1] / 255., config.Light['left'].Ambient[2] / 255.]);
    Lamp[0].I_diff.elements.set([config.Light['left'].Diffuse[0] / 255., config.Light['left'].Diffuse[1] / 255., config.Light['left'].Diffuse[2] / 255.]);
    Lamp[0].I_spec.elements.set([config.Light['left'].Specular[0] / 255., config.Light['left'].Specular[1] / 255., config.Light['left'].Specular[2] / 255.]);

    gl.uniform1i(Lamp[0].u_isLit, Lamp[0].isLit);
    gl.uniform3fv(Lamp[0].u_pos, Lamp[0].I_pos.elements.slice(0, 3));
    gl.uniform3fv(Lamp[0].u_ambi, Lamp[0].I_ambi.elements);
    gl.uniform3fv(Lamp[0].u_diff, Lamp[0].I_diff.elements);
    gl.uniform3fv(Lamp[0].u_spec, Lamp[0].I_spec.elements);

    // Right Light
    Lamp[1].isLit = config.Light['right'].isLit;
    if (config.Light['right'].attachCamera) {
        Lamp[1].I_pos.elements.set([camera.x, camera.y, camera.z]);
    } else {
        Lamp[1].I_pos.elements.set([config.Light['right'].Position.x, config.Light['right'].Position.y, config.Light['right'].Position.z]);
    }
    Lamp[1].I_ambi.elements.set([config.Light['right'].Ambient[0] / 255., config.Light['right'].Ambient[1] / 255., config.Light['right'].Ambient[2] / 255.]);
    Lamp[1].I_diff.elements.set([config.Light['right'].Diffuse[0] / 255., config.Light['right'].Diffuse[1] / 255., config.Light['right'].Diffuse[2] / 255.]);
    Lamp[1].I_spec.elements.set([config.Light['right'].Specular[0] / 255., config.Light['right'].Specular[1] / 255., config.Light['right'].Specular[2] / 255.]);

    gl.uniform1i(Lamp[1].u_isLit, Lamp[1].isLit);
    gl.uniform3fv(Lamp[1].u_pos, Lamp[1].I_pos.elements.slice(0, 3));
    gl.uniform3fv(Lamp[1].u_ambi, Lamp[1].I_ambi.elements);
    gl.uniform3fv(Lamp[1].u_diff, Lamp[1].I_diff.elements);
    gl.uniform3fv(Lamp[1].u_spec, Lamp[1].I_spec.elements);


    // Project B
    let bottom, top, left, right, near, far;

    updateAt();
    gl.clearColor(config.Env.bgClr[0] / 255, config.Env.bgClr[1] / 255, config.Env.bgClr[2] / 255, config.Env.bgClr[3]);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    let ratio = canvas.width / canvas.height;

    // 1 Perspective Camera
    if (!config.Camera.Parameters.Customize) {
        bottom = - Math.tan(config.Camera.Parameters.fov * Math.PI / 360) * z.near;
        top = - bottom;

        left = - ratio * top;
        right = - left;

        near = z.near;
        far = z.far;
    } else {
        top = config.Camera.Parameters.top;
        bottom = - top;

        left = config.Camera.Parameters.left;
        right = config.Camera.Parameters.right;

        near = config.Camera.Parameters.near;
        far = config.Camera.Parameters.far;
    }

    modelMatrix.setIdentity();
    mvpMatrix.setIdentity();
    // mvpMatrix.setPerspective(config.Camera.Parameters.fov, ratio, config.Camera.Parameters.near, config.Camera.Parameters.far);

    // mvpMatrix.setFrustum(left, right,
    //     bottom, top,
    //     near, far);

    mvpMatrix.setFrustum(left, right, bottom, top, near, far);

    gl.viewport(0,
        0,
        canvas.width,
        canvas.height);

    mvpMatrix.lookAt(camera.x, camera.y, camera.z,   // center of projection
        at.x, at.y, at.z,	// look-at point
        up.x, up.y, up.z);	// View UP vector.
    modelMatrix.rotate(90, 1, 0, 0);

    gl.uniformMatrix4fv(u_MvpMatrix, false, mvpMatrix.elements);
    gl.uniformMatrix4fv(u_ModelMatrix, false, modelMatrix.elements);
    drawScene(interval, modelMatrix, u_ModelMatrix, u_ColorMatrix, u_NormalMatrix, u_isNormal);

    // // 2 Orthographic Camera
    // let fov;
    // if (!config.Camera.Parameters.Customize) {
    //     bottom = - Math.tan(config.Camera.Parameters.fov * Math.PI / 360) * (z.near + (z.far - z.near) / 3);
    //     top = - bottom;

    //     left = - ratio * top;
    //     right = - left;

    //     near = z.near;
    //     far = z.far;
    // } else {
    //     half_fov = Math.atan(config.Camera.Parameters.top / config.Camera.Parameters.near);

    //     bottom = - Math.tan(half_fov) * (config.Camera.Parameters.near + (config.Camera.Parameters.far - config.Camera.Parameters.near) / 3);

    //     top = - bottom;

    //     left = - ratio * top;
    //     right = - left;

    //     near = config.Camera.Parameters.near;
    //     far = config.Camera.Parameters.far;
    // }

    // modelMatrix.setIdentity();
    // mvpMatrix.setIdentity();
    // mvpMatrix.setOrtho(left, right, 					// left,right;
    //     bottom, top, 					// bottom, top;
    //     near, far);			// near, far; (always >=0)

    // gl.viewport(canvas.width / 2,
    //     0,
    //     canvas.width / 2,
    //     canvas.height);
    // modelMatrix.lookAt(camera.x, camera.y, camera.z,   // center of projection
    //     at.x, at.y, at.z,	// look-at point
    //     up.x, up.y, up.z);	// View UP vector.
    // modelMatrix.rotate(90, 1, 0, 0);
    // gl.uniformMatrix4fv(u_MvpMatrix, false, mvpMatrix.elements);
    // gl.uniformMatrix4fv(u_ModelMatrix, false, modelMatrix.elements);
    // drawScene(interval, modelMatrix, u_ModelMatrix, u_ColorMatrix);
}

function drawResize() {
    //==============================================================================
    // Called when user re-sizes their browser window , because our HTML file
    // contains:  <body onload="main()" onresize="winResize()">

    //Report our current browser-window contents:
    // console.log(`Canvas width, height = ${canvas.width}, ${canvas.height}`);
    // console.log(`Browser window: innerWidth, innerHeight = ${innerWidth}, ${innerHeight}`);
    // http://www.w3schools.com/jsref/obj_window.asp


    //Make canvas fill the top 0.7 of our browser window:
    let xtraMargin = 25;    // keep a margin (otherwise, browser adds scroll-bars)
    canvas.width = innerWidth - xtraMargin;
    canvas.height = (innerHeight * 2 / 3) - xtraMargin;
    // IMPORTANT!  Need a fresh drawing in the re-sized viewports.
    updateCameraPara(changePara = 'left');
    draw(interval, modelMatrix, u_ModelMatrix, u_ColorMatrix, u_NormalMatrix, u_isNormal);				// draw in all viewports.
}

function updateAt() {
    let theta = at.vertivalAngle * Math.PI / 180;
    let phi = at.horizontalAngle * Math.PI / 180;

    at.x = camera.x + Math.sin(theta) * Math.cos(phi);
    at.y = camera.y + Math.sin(theta) * Math.sin(phi);
    at.z = camera.z + Math.cos(theta);
}

function moveBackFor(mode) {
    let dx = at.x - camera.x;
    let dy = at.y - camera.y;
    let dz = at.z - camera.z;
    let ddx, ddy;
    if (mode === 'forward') {
        at.x += dx * camera.speed;
        camera.x += dx * camera.speed;
        at.y += dy * camera.speed;
        camera.y += dy * camera.speed;
        at.z += dz * camera.speed;
        camera.z += dz * camera.speed;
    } else if (mode === 'backward') {
        at.x -= dx * camera.speed;
        camera.x -= dx * camera.speed;
        at.y -= dy * camera.speed;
        camera.y -= dy * camera.speed;
        at.z -= dz * camera.speed;
        camera.z -= dz * camera.speed;
    } else if (mode === 'left') {
        ddy = dx;
        ddx = -dy;
        at.x += ddx * camera.speed;
        camera.x += ddx * camera.speed;
        at.y += ddy * camera.speed;
        camera.y += ddy * camera.speed;
    } else if (mode === 'right') {
        ddy = -dx;
        ddx = dy;
        at.x += ddx * camera.speed;
        camera.x += ddx * camera.speed;
        at.y += ddy * camera.speed;
        camera.y += ddy * camera.speed;
    }
}

function showInfo() {
    document.getElementById('camera').innerHTML = `Camera Position: (${camera.x}, ${camera.y}, ${camera.z})`;
    document.getElementById('at').innerHTML = `at Position: (${at.x}, ${at.y}, ${at.z})`;
}

function updateNavCamera(interval) {
    if (config.Camera.NavigationMode.active) {
        let distance = Math.sqrt(Math.pow(camera.x, 2) + Math.pow(camera.y, 2));
        at.horizontalAngle += interval * config.Camera.NavigationMode.rotSpeed / 1000.0;
        at.horizontalAngle %= 360;
        camera.x = -distance * Math.cos(at.horizontalAngle * Math.PI / 180);
        camera.y = -distance * Math.sin(at.horizontalAngle * Math.PI / 180);
    }
}

function attachCamera(modelMatrix, u_ModelMatrix) {
    if (config.Camera.Attach) {
        // let initPos = {
        //     x: CloverPos.x,
        //     y: CloverPos.y,
        //     z: CloverPos.z,
        // }
        // let initVector4 = new Vector4([initPos.x, initPos.y, initPos.z, 1]);
        // let initVector4 = new Vector4([0, 0, 0, 1]);
        // modelMatrix.rotate(-90, 1, 0, 0);
        // modelMatrix.printMe()
        modelMatrix.translate(0, config.Clover.Stem.L, 0);
        // let targetVector4 = modelMatrix.multiplyVector4(initVector4);
        // targetVector4.printMe()
        // console.log(targetVector4)
        // camera.x = targetVector4.elements[0];

        // camera.y = targetVector4.elements[1];
        // camera.z = targetVector4.elements[1];

        // camera.z = targetVector4.elements[2];
        // camera.y = -targetVector4.elements[2];
        // console.log(modelMatrix.elements[12], modelMatrix.elements[13], modelMatrix.elements[14])

        camera.x = modelMatrix.elements[12];
        camera.z = modelMatrix.elements[13];
        camera.z = 0.48;
        camera.y = -2;
        // camera.y = modelMatrix.elements[14];
    }
}

function updateCameraPara(changePara) {
    let ratio = canvas.width / canvas.height;
    if (changePara === 'left') {
        config.Camera.Parameters.bottom = config.Camera.Parameters.left / ratio;
        config.Camera.Parameters.top = - config.Camera.Parameters.bottom;
    } else if (changePara === 'right') {
        config.Camera.Parameters.top = config.Camera.Parameters.right / ratio;
        config.Camera.Parameters.bottom = - config.Camera.Parameters.top;
    } else if (changePara === 'bottom') {
        config.Camera.Parameters.left = config.Camera.Parameters.bottom * ratio;
        config.Camera.Parameters.right = - config.Camera.Parameters.left;
    } else if (changePara === 'top') {
        config.Camera.Parameters.right = config.Camera.Parameters.top * ratio;
        config.Camera.Parameters.left = - config.Camera.Parameters.right;
    }
}

function updateShader() {
    let mode = `${config.Lighting.Type} + ${config.Shading.Type}`;
    u_ColorMatrix = config.Location[mode].Matrix.u_ColorMatrix;
    u_eyePosWorld = config.Location[mode].Matrix.u_eyePosWorld;
    u_MvpMatrix = config.Location[mode].Matrix.u_MvpMatrix;
    u_ModelMatrix = config.Location[mode].Matrix.u_ModelMatrix;
    u_NormalMatrix = config.Location[mode].Matrix.u_NormalMatrix;
    u_isNormal = config.Location[mode].Matrix.u_isNormal;

    for (let i = 0; i < Lamp.length; i++) {
        Lamp[i] = config.Location[mode].Lamp[i];
    }
    Matl = config.Location[mode].Matl;

    gl.useProgram(config.Location[mode].program);
    gl.program = config.Location[mode].program;
}

function defNormals(Level1, Level2, Vertices) {
    let n = Vertices.length / floatsPerVertex;
    let Normals = new Float32Array(Vertices.length);
    for (let i = 0; i < n / 3; i++) {
        let v = [{
            x: null,
            y: null,
            z: null
        },
        {
            x: null,
            y: null,
            z: null
        },
        {
            x: null,
            y: null,
            z: null
        }]
        for (let j = 0; j < 3; j++) {
            v[j].x = Vertices[i * floatsPerVertex * 3 + j * floatsPerVertex + 0];
            v[j].y = Vertices[i * floatsPerVertex * 3 + j * floatsPerVertex + 1];
            v[j].z = Vertices[i * floatsPerVertex * 3 + j * floatsPerVertex + 2];
        }

        let n01 = new Vector3([
            v[1].x - v[0].x,
            v[1].y - v[0].y,
            v[1].z - v[0].z
        ]).normalize();
        let n02 = new Vector3([
            v[2].x - v[0].x,
            v[2].y - v[0].y,
            v[2].z - v[0].z
        ]).normalize();

        let normal = n01.cross(n02).normalize();

        for (let j = 0; j < 3; j++) {
            Normals[i * floatsPerVertex * 3 + j * floatsPerVertex + 0] = normal.elements[0];
            Normals[i * floatsPerVertex * 3 + j * floatsPerVertex + 1] = normal.elements[1];
            Normals[i * floatsPerVertex * 3 + j * floatsPerVertex + 2] = normal.elements[2];
            Normals[i * floatsPerVertex * 3 + j * floatsPerVertex + 3] = -100000;
            Normals[i * floatsPerVertex * 3 + j * floatsPerVertex + 4] = -100000;
            Normals[i * floatsPerVertex * 3 + j * floatsPerVertex + 5] = -100000;
            Normals[i * floatsPerVertex * 3 + j * floatsPerVertex + 6] = -100000;
            // Normals[i * floatsPerVertex * 3 + j * floatsPerVertex + 3] = Vertices[i * floatsPerVertex * 3 + j * floatsPerVertex + 3];
            // Normals[i * floatsPerVertex * 3 + j * floatsPerVertex + 4] = Vertices[i * floatsPerVertex * 3 + j * floatsPerVertex + 4];
            // Normals[i * floatsPerVertex * 3 + j * floatsPerVertex + 5] = Vertices[i * floatsPerVertex * 3 + j * floatsPerVertex + 5];
            // Normals[i * floatsPerVertex * 3 + j * floatsPerVertex + 6] = Vertices[i * floatsPerVertex * 3 + j * floatsPerVertex + 6];
        }
    }

    updateInfo(Level1, Level2, Normals, type = 'normals')
}