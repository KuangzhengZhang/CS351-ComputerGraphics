function defCloverStem() {
    defCylinderY(L = config.Clover.Stem.L, R = config.Clover.Stem.R, capVerts = config.Clover.Stem.capVerts, Level1 = 'Clover', Level2 = 'Stem');
}

function drawCloverStem(interval, modelMatrix, u_ModelMatrix, idx) {
    modelMatrix.translate(0, config.Clover.Stem.L, 0);

    // Rotate
    rotate(interval, 'Clover', 'Stem');

    modelMatrix.rotate(config.Clover.Stem.angle, 0, 0, 1);
    // console.log(config)

    gl.uniformMatrix4fv(u_ModelMatrix, false, modelMatrix.elements);
    gl.drawArrays(gl.TRIANGLE_STRIP, Info.Clover.Stem.position, Info.Clover.Stem.n);
}

function defCloverStamen() {
    let L = config.Clover.Stamen.L;
    let R = config.Clover.Stamen.R;
    let capVerts = config.Clover.Stamen.capVerts;
    let Vertices = new Float32Array(((capVerts * 6) - 2) * floatsPerVertex);
    // Bottom
    for (v = 0, j = 0; v < (2 * capVerts) - 1; v++, j += floatsPerVertex) {
        if (v % 2 == 0) {
            Vertices[j] = R * Math.cos(Math.PI * v / capVerts);
            Vertices[j + 1] = R * Math.sin(Math.PI * v / capVerts);
            Vertices[j + 2] = -L;
            Vertices[j + 3] = 1.0;
        }
        else {
            Vertices[j] = 0.0;
            Vertices[j + 1] = 0.0;
            Vertices[j + 2] = -config.Clover.Stamen.H;
            Vertices[j + 3] = 1.0;
        }
        Vertices[j + 4] = Math.random();
        Vertices[j + 5] = Math.random();
        Vertices[j + 6] = Math.random();
    }
    // Wall
    for (v = 0; v < 2 * capVerts; v++, j += floatsPerVertex) {
        if (v % 2 == 0) {
            Vertices[j] = R * Math.cos(Math.PI * v / capVerts);
            Vertices[j + 1] = R * Math.sin(Math.PI * v / capVerts);
            Vertices[j + 2] = -L;
            Vertices[j + 3] = 1.0;
        }
        else {
            Vertices[j] = R * Math.cos(Math.PI * (v - 1) / capVerts);
            Vertices[j + 1] = R * Math.sin(Math.PI * (v - 1) / capVerts);
            Vertices[j + 2] = L;
            Vertices[j + 3] = 1.0;
        }
        Vertices[j + 4] = Math.random();
        Vertices[j + 5] = Math.random();
        Vertices[j + 6] = Math.random();
    }
    // Top
    for (v = 0; v < (2 * capVerts - 1); v++, j += floatsPerVertex) {
        if (v % 2 == 0) {
            Vertices[j] = R * Math.cos(Math.PI * v / capVerts);
            Vertices[j + 1] = R * Math.sin(Math.PI * v / capVerts);
            Vertices[j + 2] = L;
            Vertices[j + 3] = 1.0;
        }
        else {
            Vertices[j] = 0.0;
            Vertices[j + 1] = 0.0;
            Vertices[j + 2] = config.Clover.Stamen.H;
            Vertices[j + 3] = 1.0;
        }
        Vertices[j + 4] = Math.random();
        Vertices[j + 5] = Math.random();
        Vertices[j + 6] = Math.random();
    }
    updateInfo('Clover', 'Stamen', Vertices);
}

function drawCloverStamen(interval, modelMatrix, u_ModelMatrix) {
    modelMatrix.translate(0, config.Clover.Stem.L, 0);

    // Rotate
    // rotate(interval, 'Clover', 'Stamen');

    // modelMatrix.rotate(config.Clover.Stamen.angle, 0.5, 0.5, 0.5);
    // console.log(config)

    gl.uniformMatrix4fv(u_ModelMatrix, false, modelMatrix.elements);
    gl.drawArrays(gl.TRIANGLE_STRIP, Info.Clover.Stamen.position, Info.Clover.Stamen.n);
}

function defCloverPetal() {
    let CloverPetal_Vertices = new Float32Array([
        0.0, 0.0, 0.06, 1.0, 0.0, 0.0, 1.0,
        -0.1, 0.45, 0.06, 1.0, 0.0, 0.0, 1.0,
        -0.2, 0.347, 0.06, 1.0, 0.0, 0.0, 1.0,
        -0.1, 0.45, 0.06, 1.0, -0.0, 0.0, 1.0,
        0.0, 0.0, 0.06, 1.0, -0.0, 0.0, 1.0,
        0.1, 0.45, 0.06, 1.0, -0.0, 0.0, 1.0,
        0.1, 0.45, 0.06, 1.0, -0.0, 0.0, 1.0,
        0.0, 0.0, 0.06, 1.0, -0.0, 0.0, 1.0,
        0.2, 0.347, 0.06, 1.0, -0.0, 0.0, 1.0,
        0.0, 0.0, -0.06, 1.0, 0.0, 0.0, 1.0,
        -0.1, 0.45, -0.06, 1.0, 0.0, 0.0, 1.0,
        -0.2, 0.347, -0.06, 1.0, 0.0, 0.0, 1.0,
        -0.1, 0.45, -0.06, 1.0, -0.0, 0.0, 1.0,
        0.0, 0.0, -0.06, 1.0, -0.0, 0.0, 1.0,
        0.1, 0.45, -0.06, 1.0, -0.0, 0.0, 1.0,
        0.1, 0.45, -0.06, 1.0, -0.0, 0.0, 1.0,
        0.0, 0.0, -0.06, 1.0, -0.0, 0.0, 1.0,
        0.2, 0.347, -0.06, 1.0, -0.0, 0.0, 1.0,
        0.0, 0.0, 0.06, 1.0, -0.8663933477709393, -0.4993621600985242, 0.0,
        -0.2, 0.347, 0.06, 1.0, -0.8663933477709393, -0.4993621600985242, 0.0,
        0.0, 0.0, -0.06, 1.0, -0.8663933477709393, -0.4993621600985242, 0.0,
        0.0, 0.0, -0.06, 1.0, -0.8663933477709393, -0.4993621600985242, -0.0,
        -0.2, 0.347, 0.06, 1.0, -0.8663933477709393, -0.4993621600985242, -0.0,
        -0.2, 0.347, -0.06, 1.0, -0.8663933477709393, -0.4993621600985242, -0.0,
        -0.2, 0.347, 0.06, 1.0, -0.717478291140605, 0.6965808651850532, 0.0,
        -0.1, 0.45, 0.06, 1.0, -0.717478291140605, 0.6965808651850532, 0.0,
        -0.2, 0.347, -0.06, 1.0, -0.717478291140605, 0.6965808651850532, 0.0,
        -0.2, 0.347, -0.06, 1.0, -0.717478291140605, 0.6965808651850532, 0.0,
        -0.1, 0.45, 0.06, 1.0, -0.717478291140605, 0.6965808651850532, 0.0,
        -0.1, 0.45, -0.06, 1.0, -0.717478291140605, 0.6965808651850532, 0.0,
        -0.1, 0.45, 0.06, 1.0, 0.0, 1.0, 0.0,
        0.1, 0.45, -0.06, 1.0, 0.0, 1.0, 0.0,
        -0.1, 0.45, -0.06, 1.0, 0.0, 1.0, 0.0,
        0.1, 0.45, -0.06, 1.0, 0.0, 1.0, -0.0,
        -0.1, 0.45, 0.06, 1.0, 0.0, 1.0, -0.0,
        0.1, 0.45, 0.06, 1.0, 0.0, 1.0, -0.0,
        0.1, 0.45, 0.06, 1.0, 0.717478291140605, 0.6965808651850532, 0.0,
        0.2, 0.347, -0.06, 1.0, 0.717478291140605, 0.6965808651850532, 0.0,
        0.1, 0.45, -0.06, 1.0, 0.717478291140605, 0.6965808651850532, 0.0,
        0.2, 0.347, 0.06, 1.0, 0.717478291140605, 0.6965808651850532, 0.0,
        0.2, 0.347, -0.06, 1.0, 0.717478291140605, 0.6965808651850532, 0.0,
        0.1, 0.45, 0.06, 1.0, 0.717478291140605, 0.6965808651850532, 0.0,
        0.0, 0.0, 0.06, 1.0, 0.8663933477709393, -0.4993621600985242, 0.0,
        0.0, 0.0, -0.06, 1.0, 0.8663933477709393, -0.4993621600985242, 0.0,
        0.2, 0.347, 0.06, 1.0, 0.8663933477709393, -0.4993621600985242, 0.0,
        0.2, 0.347, 0.06, 1.0, 0.8663933477709393, -0.4993621600985242, 0.0,
        0.0, 0.0, -0.06, 1.0, 0.8663933477709393, -0.4993621600985242, 0.0,
        0.2, 0.347, -0.06, 1.0, 0.8663933477709393, -0.4993621600985242, 0.0
    ])

    updateInfo('Clover', 'Petal', CloverPetal_Vertices);
}

function drawCloverPetal(interval, modelMatrix, u_ModelMatrix, idx) {
    // Rotate
    modelMatrix.rotate(360 / config.Clover.Petal.Num, 0, 0, 1);
    if (idx === 1) {
        if (!config.Clover.Pause && !config.Clover.Petal.Pause) {
            config.Clover.Petal.angle += (config.Clover.Petal.rotSpeed * interval) / 1000.0;
            config.Clover.Petal.angle %= config.Clover.Petal.rotMaxAngle - config.Clover.Petal.rotMinAngle;
        }
        // rotate(interval, 'Clover', 'Petal');
        modelMatrix.rotate(config.Clover.Petal.angle, 0, 0, 1);
    }

    gl.uniformMatrix4fv(u_ModelMatrix, false, modelMatrix.elements);
    gl.drawArrays(gl.TRIANGLES, Info.Clover.Petal.position, Info.Clover.Petal.n);
}