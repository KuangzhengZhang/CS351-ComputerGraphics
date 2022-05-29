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

            'varying vec3 v_Normal;\n' +
            'varying vec4 v_Position;\n' +
            'varying vec3 v_Kd;\n' +
            'varying vec4 v_Color;\n' +

            'void main() {\n' +
            '  vec3 normal, lightDirection, eyeDirection, emissive, ambient, diffuse, speculr, H;\n' +
            '  float nDotL, nDotH, e64;\n' +
            '  vec4 FragColor[2];\n' +

            '  normal = normalize(v_Normal);\n' +

            '  for (int i = 0; i < 2; i++) {\n' +
            '    if (u_LampSet[i].isLit == 1) {\n' +
            '      lightDirection = normalize(u_LampSet[i].pos - v_Position.xyz);\n' +
            '      eyeDirection = normalize(u_eyePosWorld - v_Position.xyz);\n' +
            '      nDotL = max(dot(lightDirection, normal), 0.0);\n' +
            '      H = normalize(lightDirection + eyeDirection);\n' +
            '      nDotH = max(dot(H, normal), 0.0);\n' +
            '      e64 = pow(nDotH, float(u_MatlSet[0].shiny));\n' +
            '      emissive = u_MatlSet[0].emit;\n' +
            '      ambient = u_LampSet[i].ambi * u_MatlSet[0].ambi;\n' +
            '      diffuse = u_LampSet[i].diff * v_Kd * nDotL;\n' +
            '      speculr = u_LampSet[i].spec * u_MatlSet[0].spec * e64;\n' +
            '      FragColor[i] = vec4(emissive + ambient + diffuse + speculr, 1.0);\n' +
            '    }\n' +
            '  }\n' +

            '  gl_FragColor = u_ColorMatrix * v_Color;\n' +
            '  gl_FragColor = FragColor[0] + FragColor[1];\n' +
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

            'varying vec4 v_Color;\n' +

            'void main() {\n' +
            '  vec3 normal, lightDirection, eyeDirection, emissive, ambient, diffuse, speculr, H;\n' +
            '  float nDotL, nDotH, e64;\n' +
            '  vec4 vertexPosition, Color[2];\n' +

            '  gl_Position = u_MvpMatrix * u_ModelMatrix * a_Position;\n' +

            '  normal = normalize(vec3(u_NormalMatrix * a_Normal));\n' +
            '  vertexPosition = u_ModelMatrix * a_Position;\n' +

            '  for (int i = 0; i < 2; i++) {\n' +
            '    if (u_LampSet[i].isLit == 1) {\n' +
            '      lightDirection = normalize(u_LampSet[i].pos - vec3(vertexPosition));\n' +
            '      eyeDirection = normalize(u_eyePosWorld - a_Position.xyz);\n' +
            '      nDotL = max(dot(lightDirection, normal), 0.0);\n' +
            '      H = normalize(lightDirection + eyeDirection);\n' +
            '      nDotH = max(dot(H, normal), 0.0);\n' +
            '      e64 = pow(nDotH, float(u_MatlSet[0].shiny));\n' +
            '      emissive = u_MatlSet[0].emit;\n' +
            '      ambient = u_LampSet[i].ambi * u_MatlSet[0].ambi;\n' +
            '      diffuse = u_LampSet[i].diff * u_MatlSet[0].diff * nDotL;\n' +
            '      speculr = u_LampSet[i].spec * u_MatlSet[0].spec * e64;\n' +
            '      Color[i] = vec4(emissive + ambient + diffuse + speculr, 1.0);\n' +
            '    }\n' +
            '  }\n' +

            '  v_Color = Color[0] + Color[1] + a_Color * 0.0 + u_ColorMatrix * vec4(u_eyePosWorld, 0.0) * 0.0 + vec4(u_MatlSet[0].ambi, 0.0) * 0.0;\n' +
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

            'varying vec3 v_Normal;\n' +
            'varying vec4 v_Position;\n' +
            'varying vec3 v_Kd;\n' +
            'varying vec4 v_Color;\n' +

            'void main() {\n' +
            '  vec3 normal, lightDirection, eyeDirection, emissive, ambient, diffuse, speculr, R;\n' +
            '  float nDotL, nDotH, e64, RDotV;\n' +
            '  vec4 FragColor[2];\n' +

            '  normal = normalize(v_Normal);\n' +

            '  for (int i = 0; i < 2; i++) {\n' +
            '    if (u_LampSet[i].isLit == 1) {\n' +
            '      lightDirection = normalize(u_LampSet[i].pos - v_Position.xyz);\n' +
            '      eyeDirection = normalize(u_eyePosWorld - v_Position.xyz);\n' +
            '      nDotL = max(dot(lightDirection, normal), 0.0);\n' +
            '      R = reflect(-lightDirection, normal);\n' +
            '      RDotV = max(dot(R, eyeDirection), 0.0);\n' +
            '      e64 = pow(RDotV, float(u_MatlSet[0].shiny));\n' +
            '      emissive = u_MatlSet[0].emit;\n' +
            '      ambient = u_LampSet[i].ambi * u_MatlSet[0].ambi;\n' +
            '      diffuse = u_LampSet[i].diff * v_Kd * nDotL;\n' +
            '      speculr = u_LampSet[i].spec * u_MatlSet[0].spec * e64;\n' +
            '      FragColor[i] = vec4(emissive + ambient + diffuse + speculr, 1.0);\n' +
            '    }\n' +
            '  }\n' +

            '  gl_FragColor = u_ColorMatrix * v_Color;\n' +
            '  gl_FragColor = FragColor[0] + FragColor[1];\n' +
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

            'varying vec4 v_Color;\n' +

            'void main() {\n' +
            '  vec3 normal, lightDirection, eyeDirection, emissive, ambient, diffuse, speculr, R;\n' +
            '  float nDotL, nDotH, e64, RDotV;\n' +
            '  vec4 vertexPosition, Color[2];\n' +

            '  gl_Position = u_MvpMatrix * u_ModelMatrix * a_Position;\n' +

            '  normal = normalize(vec3(u_NormalMatrix * a_Normal));\n' +

            '  for (int i = 0; i < 2; i++) {\n' +
            '    if (u_LampSet[i].isLit == 1) {\n' +
            '      vertexPosition = u_ModelMatrix * a_Position;\n' +
            '      lightDirection = normalize(u_LampSet[i].pos - vec3(vertexPosition));\n' +
            '      eyeDirection = normalize(u_eyePosWorld - a_Position.xyz);\n' +
            '      nDotL = max(dot(lightDirection, normal), 0.0);\n' +
            '      R = reflect(-lightDirection, normal);\n' +
            '      RDotV = max(dot(R, eyeDirection), 0.0);\n' +
            '      e64 = pow(RDotV, float(u_MatlSet[0].shiny));\n' +
            '      emissive = u_MatlSet[0].emit;\n' +
            '      ambient = u_LampSet[i].ambi * u_MatlSet[0].ambi;\n' +
            '      diffuse = u_LampSet[i].diff * u_MatlSet[0].diff * nDotL;\n' +
            '      speculr = u_LampSet[i].spec * u_MatlSet[0].spec * e64;\n' +
            '      Color[i] = vec4(emissive + ambient + diffuse + speculr, 1.0);\n' +
            '    }\n' +
            '  }\n' +

            '  v_Color = Color[0] + Color[1] + a_Color * 0.0 + u_ColorMatrix * vec4(u_eyePosWorld, 0.0) * 0.0 + vec4(u_MatlSet[0].ambi, 0.0) * 0.0;\n' +
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

    config.Location[mode].u_ColorMatrix = gl.getUniformLocation(gl.program, 'u_ColorMatrix');
    config.Location[mode].u_eyePosWorld = gl.getUniformLocation(gl.program, 'u_eyePosWorld');
    config.Location[mode].u_MvpMatrix = gl.getUniformLocation(gl.program, 'u_MvpMatrix');
    config.Location[mode].u_ModelMatrix = gl.getUniformLocation(gl.program, 'u_ModelMatrix');
    config.Location[mode].u_NormalMatrix = gl.getUniformLocation(gl.program, 'u_NormalMatrix');
    if (!config.Location[mode].u_ColorMatrix || !config.Location[mode].u_eyePosWorld || !config.Location[mode].u_MvpMatrix || !config.Location[mode].u_ModelMatrix || !config.Location[mode].u_NormalMatrix) {
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