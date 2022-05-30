let shaders = {
    'Blinn-Phong Lighting + Phong Shading': {
        VSHADER_SOURCE:
            'struct MatlT {\n' +
            '  vec3 emit;\n' +
            '  vec3 ambi;\n' +
            '  vec3 diff;\n' +
            '  vec3 spec;\n' +
            '  int shiny;\n' +
            '};\n' +

            'attribute vec4 a_Position;\n' +
            'attribute vec4 a_Normal;\n' +
            'attribute vec4 a_Color;\n' +

            'uniform MatlT u_MatlSet[1];\n' +
            'uniform mat4 u_MvpMatrix;\n' +
            'uniform mat4 u_ModelMatrix;\n' +
            'uniform mat4 u_NormalMatrix;\n' +

            'varying vec3 v_Normal;\n' +
            'varying vec4 v_Position;\n' +
            'varying vec3 v_Kd;\n' +
            'varying vec4 v_Color;\n' +

            'void main() {\n' +
            '  gl_Position = u_MvpMatrix * u_ModelMatrix * a_Position;\n' +
            '  v_Position = u_ModelMatrix * a_Position;\n' +
            '  v_Normal = normalize(vec3(u_NormalMatrix * a_Normal));\n' +
            '  v_Kd = u_MatlSet[0].diff;\n' +
            '  v_Color = a_Color;\n' +
            '}\n',

        FSHADER_SOURCE:
            'precision highp float;\n' +
            'precision highp int;\n' +

            'struct LampT {\n' +
            '  vec3 pos;\n' +
            '  vec3 ambi;\n' +
            '  vec3 diff;\n' +
            '  vec3 spec;\n' +
            '  int isLit;\n' +
            '};\n' +

            'struct MatlT {\n' +
            '  vec3 emit;\n' +
            '  vec3 ambi;\n' +
            '  vec3 diff;\n' +
            '  vec3 spec;\n' +
            '  int shiny;\n' +
            '};\n' +

            'uniform LampT u_LampSet[2];\n' +
            'uniform MatlT u_MatlSet[1];\n' +
            'uniform vec3 u_eyePosWorld;\n' +
            'uniform mat4 u_ColorMatrix;\n' +
            'uniform int u_isNormal;\n' +

            'varying vec3 v_Normal;\n' +
            'varying vec4 v_Position;\n' +
            'varying vec3 v_Kd;\n' +
            'varying vec4 v_Color;\n' +

            'void main() {\n' +
            '  if (u_isNormal == 1) {\n' +
            '    gl_FragColor = u_ColorMatrix * v_Color;\n' +
            '  }\n' +

            '  if (u_isNormal == 0) {\n' +
            '    vec3 normal, lightDirection, eyeDirection, emissive, ambient, diffuse, speculr, H;\n' +
            '    float nDotL, nDotH, e64;\n' +
            '    vec4 FragColor[2];\n' +

            '    normal = normalize(v_Normal);\n' +

            '    for (int i = 0; i < 2; i++) {\n' +
            '      if (u_LampSet[i].isLit == 1) {\n' +
            '        lightDirection = normalize(u_LampSet[i].pos - v_Position.xyz);\n' +
            '        eyeDirection = normalize(u_eyePosWorld - v_Position.xyz);\n' +
            '        nDotL = max(dot(lightDirection, normal), 0.0);\n' +
            '        H = normalize(lightDirection + eyeDirection);\n' +
            '        nDotH = max(dot(H, normal), 0.0);\n' +
            '        e64 = pow(nDotH, float(u_MatlSet[0].shiny));\n' +
            '        emissive = u_MatlSet[0].emit;\n' +
            '        ambient = u_LampSet[i].ambi * u_MatlSet[0].ambi;\n' +
            '        diffuse = u_LampSet[i].diff * v_Kd * nDotL;\n' +
            '        speculr = u_LampSet[i].spec * u_MatlSet[0].spec * e64;\n' +
            '        FragColor[i] = vec4(emissive + ambient + diffuse + speculr, 1.0);\n' +
            '      }\n' +
            '    gl_FragColor = u_ColorMatrix * v_Color;\n' +
            '    gl_FragColor = FragColor[0] + FragColor[1];\n' +
            '    }\n' +
            '  }\n' +
            
            '}\n'
    },
    'Blinn-Phong Lighting + Gouraud Shading': {
        VSHADER_SOURCE:
            'precision highp float;\n' +
            'precision highp int;\n' +

            'struct LampT {\n' +
            '  vec3 pos;\n' +
            '  vec3 ambi;\n' +
            '  vec3 diff;\n' +
            '  vec3 spec;\n' +
            '  int isLit;\n' +
            '};\n' +

            'struct MatlT {\n' +
            '  vec3 emit;\n' +
            '  vec3 ambi;\n' +
            '  vec3 diff;\n' +
            '  vec3 spec;\n' +
            '  int shiny;\n' +
            '};\n' +

            'attribute vec4 a_Position;\n' +
            'attribute vec4 a_Normal;\n' +
            'attribute vec4 a_Color;\n' +

            'uniform LampT u_LampSet[2];\n' +
            'uniform MatlT u_MatlSet[1];\n' +
            'uniform mat4 u_MvpMatrix;\n' +
            'uniform mat4 u_ModelMatrix;\n' +
            'uniform mat4 u_NormalMatrix;\n' +
            'uniform vec3 u_eyePosWorld;\n' +
            'uniform mat4 u_ColorMatrix;\n' +
            'uniform int u_isNormal;\n' +

            'varying vec4 v_Color;\n' +

            'void main() {\n' +
            '  if (u_isNormal == 1) {\n' +
            '   gl_Position = u_MvpMatrix * u_ModelMatrix * a_Position;\n' +
            '   gl_PointSize = 10.0;\n' +
            '   v_Color = a_Color;\n' +
            '  }\n' +

            '  if (u_isNormal == 0) {\n' +
            '    vec3 normal, lightDirection, eyeDirection, emissive, ambient, diffuse, speculr, H;\n' +
            '    float nDotL, nDotH, e64;\n' +
            '    vec4 vertexPosition, Color[2];\n' +

            '    gl_Position = u_MvpMatrix * u_ModelMatrix * a_Position;\n' +

            '    normal = normalize(vec3(u_NormalMatrix * a_Normal));\n' +
            '    vertexPosition = u_ModelMatrix * a_Position;\n' +

            '    for (int i = 0; i < 2; i++) {\n' +
            '      if (u_LampSet[i].isLit == 1) {\n' +
            '        lightDirection = normalize(u_LampSet[i].pos - vec3(vertexPosition));\n' +
            '        eyeDirection = normalize(u_eyePosWorld - a_Position.xyz);\n' +
            '        nDotL = max(dot(lightDirection, normal), 0.0);\n' +
            '        H = normalize(lightDirection + eyeDirection);\n' +
            '        nDotH = max(dot(H, normal), 0.0);\n' +
            '        e64 = pow(nDotH, float(u_MatlSet[0].shiny));\n' +
            '        emissive = u_MatlSet[0].emit;\n' +
            '        ambient = u_LampSet[i].ambi * u_MatlSet[0].ambi;\n' +
            '        diffuse = u_LampSet[i].diff * u_MatlSet[0].diff * nDotL;\n' +
            '        speculr = u_LampSet[i].spec * u_MatlSet[0].spec * e64;\n' +
            '        Color[i] = vec4(emissive + ambient + diffuse + speculr, 1.0);\n' +
            '      }\n' +
            '    }\n' +
            '    v_Color = Color[0] + Color[1] + a_Color * 0.0 + u_ColorMatrix * vec4(u_eyePosWorld, 0.0) * 0.0 + vec4(u_MatlSet[0].ambi, 0.0) * 0.0;\n' +
            '  }\n' +
            '}\n',

        FSHADER_SOURCE:
            '#ifdef GL_ES\n' +
            'precision mediump float;\n' +
            '#endif\n' +

            'varying vec4 v_Color;\n' +

            'void main() {\n' +
            '  gl_FragColor = v_Color;\n' +
            '}\n'
    },
    'Phong Lighting + Phong Shading': {
        VSHADER_SOURCE:
            'struct MatlT {\n' +
            '  vec3 emit;\n' +
            '  vec3 ambi;\n' +
            '  vec3 diff;\n' +
            '  vec3 spec;\n' +
            '  int shiny;\n' +
            '};\n' +

            'attribute vec4 a_Position;\n' +
            'attribute vec4 a_Normal;\n' +
            'attribute vec4 a_Color;\n' +

            'uniform MatlT u_MatlSet[1];\n' +
            'uniform mat4 u_MvpMatrix;\n' +
            'uniform mat4 u_ModelMatrix;\n' +
            'uniform mat4 u_NormalMatrix;\n' +

            'varying vec3 v_Normal;\n' +
            'varying vec4 v_Position;\n' +
            'varying vec3 v_Kd;\n' +
            'varying vec4 v_Color;\n' +

            'void main() {\n' +
            '  gl_Position = u_MvpMatrix * u_ModelMatrix * a_Position;\n' +
            '  v_Position = u_ModelMatrix * a_Position;\n' +
            '  v_Normal = normalize(vec3(u_NormalMatrix * a_Normal));\n' +
            '  v_Kd = u_MatlSet[0].diff;\n' +
            '  v_Color = a_Color;\n' +
            '}\n',

        FSHADER_SOURCE:
            'precision highp float;\n' +
            'precision highp int;\n' +

            'struct LampT {\n' +
            '  vec3 pos;\n' +
            '  vec3 ambi;\n' +
            '  vec3 diff;\n' +
            '  vec3 spec;\n' +
            '  int isLit;\n' +
            '};\n' +

            'struct MatlT {\n' +
            '  vec3 emit;\n' +
            '  vec3 ambi;\n' +
            '  vec3 diff;\n' +
            '  vec3 spec;\n' +
            '  int shiny;\n' +
            '};\n' +

            'uniform LampT u_LampSet[2];\n' +
            'uniform MatlT u_MatlSet[1];\n' +
            'uniform vec3 u_eyePosWorld;\n' +
            'uniform mat4 u_ColorMatrix;\n' +
            'uniform int u_isNormal;\n' +

            'varying vec3 v_Normal;\n' +
            'varying vec4 v_Position;\n' +
            'varying vec3 v_Kd;\n' +
            'varying vec4 v_Color;\n' +

            'void main() {\n' +
            '  if (u_isNormal == 1) {\n' +
            '    gl_FragColor = u_ColorMatrix * v_Color;\n' +
            '  }\n' +

            '  if (u_isNormal == 0) {\n' +
            '    vec3 normal, lightDirection, eyeDirection, emissive, ambient, diffuse, speculr, R;\n' +
            '    float nDotL, nDotH, e64, RDotV;\n' +
            '    vec4 FragColor[2];\n' +

            '    normal = normalize(v_Normal);\n' +

            '    for (int i = 0; i < 2; i++) {\n' +
            '      if (u_LampSet[i].isLit == 1) {\n' +
            '        lightDirection = normalize(u_LampSet[i].pos - v_Position.xyz);\n' +
            '        eyeDirection = normalize(u_eyePosWorld - v_Position.xyz);\n' +
            '        nDotL = max(dot(lightDirection, normal), 0.0);\n' +
            '        R = reflect(-lightDirection, normal);\n' +
            '        RDotV = max(dot(R, eyeDirection), 0.0);\n' +
            '        e64 = pow(RDotV, float(u_MatlSet[0].shiny));\n' +
            '        emissive = u_MatlSet[0].emit;\n' +
            '        ambient = u_LampSet[i].ambi * u_MatlSet[0].ambi;\n' +
            '        diffuse = u_LampSet[i].diff * v_Kd * nDotL;\n' +
            '        speculr = u_LampSet[i].spec * u_MatlSet[0].spec * e64;\n' +
            '        FragColor[i] = vec4(emissive + ambient + diffuse + speculr, 1.0);\n' +
            '      }\n' +
            '    }\n' +
            '    gl_FragColor = u_ColorMatrix * v_Color;\n' +
            '    gl_FragColor = FragColor[0] + FragColor[1];\n' +
            '  }\n' +
            '}\n'
    },
    'Phong Lighting + Gouraud Shading': {
        VSHADER_SOURCE:
            'precision highp float;\n' +
            'precision highp int;\n' +

            'struct LampT {\n' +
            '  vec3 pos;\n' +
            '  vec3 ambi;\n' +
            '  vec3 diff;\n' +
            '  vec3 spec;\n' +
            '  int isLit;\n' +
            '};\n' +

            'struct MatlT {\n' +
            '  vec3 emit;\n' +
            '  vec3 ambi;\n' +
            '  vec3 diff;\n' +
            '  vec3 spec;\n' +
            '  int shiny;\n' +
            '};\n' +

            'attribute vec4 a_Position;\n' +
            'attribute vec4 a_Normal;\n' +
            'attribute vec4 a_Color;\n' +

            'uniform LampT u_LampSet[2];\n' +
            'uniform MatlT u_MatlSet[1];\n' +
            'uniform mat4 u_MvpMatrix;\n' +
            'uniform mat4 u_ModelMatrix;\n' +
            'uniform mat4 u_NormalMatrix;\n' +
            'uniform vec3 u_eyePosWorld;\n' +
            'uniform mat4 u_ColorMatrix;\n' +
            'uniform int u_isNormal;\n' +

            'varying vec4 v_Color;\n' +

            'void main() {\n' +
            '  if (u_isNormal == 1) {\n' +
            '   gl_Position = u_MvpMatrix * u_ModelMatrix * a_Position;\n' +
            '   gl_PointSize = 10.0;\n' +
            '   v_Color = a_Color;\n' +
            '  }\n' +

            '  if (u_isNormal == 0) {\n' +
            '    vec3 normal, lightDirection, eyeDirection, emissive, ambient, diffuse, speculr, R;\n' +
            '    float nDotL, nDotH, e64, RDotV;\n' +
            '    vec4 vertexPosition, Color[2];\n' +

            '    gl_Position = u_MvpMatrix * u_ModelMatrix * a_Position;\n' +

            '    normal = normalize(vec3(u_NormalMatrix * a_Normal));\n' +

            '    for (int i = 0; i < 2; i++) {\n' +
            '      if (u_LampSet[i].isLit == 1) {\n' +
            '        vertexPosition = u_ModelMatrix * a_Position;\n' +
            '        lightDirection = normalize(u_LampSet[i].pos - vec3(vertexPosition));\n' +
            '        eyeDirection = normalize(u_eyePosWorld - a_Position.xyz);\n' +
            '        nDotL = max(dot(lightDirection, normal), 0.0);\n' +
            '        R = reflect(-lightDirection, normal);\n' +
            '        RDotV = max(dot(R, eyeDirection), 0.0);\n' +
            '        e64 = pow(RDotV, float(u_MatlSet[0].shiny));\n' +
            '        emissive = u_MatlSet[0].emit;\n' +
            '        ambient = u_LampSet[i].ambi * u_MatlSet[0].ambi;\n' +
            '        diffuse = u_LampSet[i].diff * u_MatlSet[0].diff * nDotL;\n' +
            '        speculr = u_LampSet[i].spec * u_MatlSet[0].spec * e64;\n' +
            '        Color[i] = vec4(emissive + ambient + diffuse + speculr, 1.0);\n' +
            '      }\n' +
            '    }\n' +

            '    v_Color = Color[0] + Color[1] + a_Color * 0.0 + u_ColorMatrix * vec4(u_eyePosWorld, 0.0) * 0.0 + vec4(u_MatlSet[0].ambi, 0.0) * 0.0;\n' +
            '  }\n' +
            '}\n',

        FSHADER_SOURCE:
            '#ifdef GL_ES\n' +
            'precision mediump float;\n' +
            '#endif\n' +

            'varying vec4 v_Color;\n' +

            'void main() {\n' +
            '  gl_FragColor = v_Color;\n' +
            '}\n'
    }
}



function initShader(gl, mode) {
    let program = createProgram(gl, shaders[mode].VSHADER_SOURCE, shaders[mode].FSHADER_SOURCE);
    gl.useProgram(program);
    gl.program = program;

    // if (!initShaders(gl, shaders[mode].VSHADER_SOURCE, shaders[mode].FSHADER_SOURCE)) {
    //     console.log('Failed to intialize shaders.');
    //     return;
    // }

    config.Location[mode].Matrix.u_ColorMatrix = gl.getUniformLocation(gl.program, 'u_ColorMatrix');
    config.Location[mode].Matrix.u_eyePosWorld = gl.getUniformLocation(gl.program, 'u_eyePosWorld');
    config.Location[mode].Matrix.u_MvpMatrix = gl.getUniformLocation(gl.program, 'u_MvpMatrix');
    config.Location[mode].Matrix.u_ModelMatrix = gl.getUniformLocation(gl.program, 'u_ModelMatrix');
    config.Location[mode].Matrix.u_NormalMatrix = gl.getUniformLocation(gl.program, 'u_NormalMatrix');
    config.Location[mode].Matrix.u_isNormal = gl.getUniformLocation(gl.program, 'u_isNormal');
    if (!config.Location[mode].Matrix.u_ColorMatrix || !config.Location[mode].Matrix.u_eyePosWorld || !config.Location[mode].Matrix.u_MvpMatrix || !config.Location[mode].Matrix.u_ModelMatrix || !config.Location[mode].Matrix.u_NormalMatrix || !config.Location[mode].Matrix.u_isNormal) {
        console.log('Failed to get GPUs matrix storage locations');
        return;
    }

    for (let i = 0; i < Lamp.length; i++) {
        config.Location[mode].Lamp[i].u_isLit = gl.getUniformLocation(gl.program, `u_LampSet[${i}].isLit`);
        config.Location[mode].Lamp[i].u_pos = gl.getUniformLocation(gl.program, `u_LampSet[${i}].pos`);
        config.Location[mode].Lamp[i].u_ambi = gl.getUniformLocation(gl.program, `u_LampSet[${i}].ambi`);
        config.Location[mode].Lamp[i].u_diff = gl.getUniformLocation(gl.program, `u_LampSet[${i}].diff`);
        config.Location[mode].Lamp[i].u_spec = gl.getUniformLocation(gl.program, `u_LampSet[${i}].spec`);
        if (!config.Location[mode].Lamp[i].u_isLit || !config.Location[mode].Lamp[i].u_pos || !config.Location[mode].Lamp[i].u_ambi || !config.Location[mode].Lamp[i].u_diff || !config.Location[mode].Lamp[i].u_spec) {
            console.log('Failed to get GPUs Lamp storage locations');
            return;
        }
    }

    config.Location[mode].Matl.uLoc_Ke = gl.getUniformLocation(gl.program, 'u_MatlSet[0].emit');
    config.Location[mode].Matl.uLoc_Ka = gl.getUniformLocation(gl.program, 'u_MatlSet[0].ambi');
    config.Location[mode].Matl.uLoc_Kd = gl.getUniformLocation(gl.program, 'u_MatlSet[0].diff');
    config.Location[mode].Matl.uLoc_Ks = gl.getUniformLocation(gl.program, 'u_MatlSet[0].spec');
    config.Location[mode].Matl.uLoc_Kshiny = gl.getUniformLocation(gl.program, 'u_MatlSet[0].shiny');
    if (!config.Location[mode].Matl.uLoc_Ke || !config.Location[mode].Matl.uLoc_Ka || !config.Location[mode].Matl.uLoc_Kd || !config.Location[mode].Matl.uLoc_Ks || !config.Location[mode].Matl.uLoc_Kshiny) {
        console.log('Failed to get GPUs Reflectance storage locations');
        return;
    }

    config.Location[mode].program = program;
}

let MatlDict = {
    'MATL_RED_PLASTIC': 1,
    'MATL_GRN_PLASTIC': 2,
    'MATL_BLU_PLASTIC': 3,
    'MATL_BLACK_PLASTIC': 4,
    'MATL_BLACK_RUBBER': 5,
    'MATL_BRASS': 6,
    'MATL_BRONZE_DULL': 7,
    'MATL_BRONZE_SHINY': 8,
    'MATL_CHROME': 9,
    'MATL_COPPER_DULL': 10,
    'MATL_COPPER_SHINY': 11,
    'MATL_GOLD_DULL': 12,
    'MATL_GOLD_SHINY': 13,
    'MATL_PEWTER': 14,
    'MATL_SILVER_DULL': 15,
    'MATL_SILVER_SHINY': 16,
    'MATL_EMERALD': 17,
    'MATL_JADE': 18,
    'MATL_OBSIDIAN': 19,
    'MATL_PEARL': 20,
    'MATL_RUBY': 21,
    'MATL_TURQUOISE': 22,
    'MATL_DEFAULT': 23,
}

function updateMatl(m) {
    let modes = Object.keys(config.Location)
    for (let i = 0; i < modes.length; i++) {
        // let tmpMatl = new Material(m);
        // tmpMatl.K_emit = config.Location[modes[i]].Matl.K_emit;
        // tmpMatl.K_ambi = config.Location[modes[i]].Matl.K_ambi;
        // tmpMatl.K_diff = config.Location[modes[i]].Matl.K_diff;
        // tmpMatl.K_spec = config.Location[modes[i]].Matl.K_spec;
        // tmpMatl.K_shiny = config.Location[modes[i]].Matl.K_shiny;

        // tmpMatl.uLoc_Ke = config.Location[modes[i]].Matl.uLoc_Ke;
        // tmpMatl.uLoc_Ka = config.Location[modes[i]].Matl.uLoc_Ka;
        // tmpMatl.uLoc_Kd = config.Location[modes[i]].Matl.uLoc_Kd;
        // tmpMatl.uLoc_Ks = config.Location[modes[i]].Matl.uLoc_Ks;
        // tmpMatl.uLoc_Kshiny = config.Location[modes[i]].Matl.uLoc_Kshiny;

        // config.Location[modes[i]].Matl = tmpMatl;

        config.Location[modes[i]].Matl.setMatl(MatlDict[m]);
    }
}

function updateMatlValue() {
    gl.uniform3fv(Matl.uLoc_Ke, Matl.K_emit.slice(0, 3));
    gl.uniform3fv(Matl.uLoc_Ka, Matl.K_ambi.slice(0, 3));
    gl.uniform3fv(Matl.uLoc_Kd, Matl.K_diff.slice(0, 3));
    gl.uniform3fv(Matl.uLoc_Ks, Matl.K_spec.slice(0, 3));
    gl.uniform1i(Matl.uLoc_Kshiny, parseInt(Matl.K_shiny, 10));
}

function updateIsNormal(isNormal) {
    // let objs = ['EnderDragon', 'Clover', 'Shpere', 'Torus', 'Icosahedron'];
    // objs.forEach((obj) => {
    //     config.Location[modes[i]].Matrix.u_isNormal = config[Level1].isNormal;
    // })
    // gl.uniform1i(u_isNormal, config.EnderDragon.isNormal);

    let modes = Object.keys(config.Location)
    for (let i = 0; i < modes.length; i++) {
        config.Location[modes[i]].Matrix.u_isNormal = isNormal;
    }
}