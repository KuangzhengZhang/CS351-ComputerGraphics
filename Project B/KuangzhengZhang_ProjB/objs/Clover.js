function defCloverStem() {
    defCylinderY(L = config.Clover.Stem.L, R = config.Clover.Stem.R, capVerts = config.Clover.Stem.capVerts, Level1 = 'Clover', Level2 = 'Stem');
}

function drawCloverStem(interval, modelMatrix, u_ModelMatrix, colorMatrix, u_ColorMatrix, idx) {
    switch (idx) {
        case 1:
            modelMatrix.translate(CloverPos.x, CloverPos.y, CloverPos.z);
            modelMatrix.scale(config.Clover.Size, config.Clover.Size, config.Clover.Size);
            // Rotate
            rotate(interval, 'Clover', 'Stem', reciprocate = true);

            modelMatrix.rotate(config.Clover.Stem.Xangle, 0, 1, 0);
            modelMatrix.rotate(config.Clover.Stem.angle, 0, 0, 1);
            break;
        default:
            modelMatrix.translate(0, config.Clover.Stem.L, 0);
            modelMatrix.rotate(config.Clover.Stem.angle, 0, 0, 1);
    }

    gl.uniformMatrix4fv(u_ModelMatrix, false, modelMatrix.elements);

    colorMatrix.setTranslate(config.Clover.Stem.Clr[0] / 255, config.Clover.Stem.Clr[1] / 255, config.Clover.Stem.Clr[2] / 255);
    gl.uniformMatrix4fv(u_ColorMatrix, false, colorMatrix.elements);

    gl.drawArrays(gl.TRIANGLE_STRIP, Info.Clover.Stem.position, Info.Clover.Stem.n);
}

function defCloverStamen() {
    defCylinderZ(L = config.Clover.Stamen.L, R = config.Clover.Stamen.R, H = config.Clover.Stamen.H, capVerts = config.Clover.Stamen.capVerts, Level1 = 'Clover', Level2 = 'Stamen');
}

function drawCloverStamen(interval, modelMatrix, u_ModelMatrix, colorMatrix, u_ColorMatrix) {
    modelMatrix.translate(0, config.Clover.Stem.L, 0);
    modelMatrix.scale(config.Clover.Stamen.Size, config.Clover.Stamen.Size, config.Clover.Stamen.Size);
    // Rotate
    rotate(interval, 'Clover', 'Stamen', reciprocate = false);
    modelMatrix.rotate(config.Clover.Stamen.angle, 0, 0, 1);
    modelMatrix.rotate(-config.Clover.Stem.angle * config.Clover.Stem.Num, 0, 0, 1);

    gl.uniformMatrix4fv(u_ModelMatrix, false, modelMatrix.elements);

    colorMatrix.setTranslate(config.Clover.Stamen.Clr[0] / 255, config.Clover.Stamen.Clr[1] / 255, config.Clover.Stamen.Clr[2] / 255);
    gl.uniformMatrix4fv(u_ColorMatrix, false, colorMatrix.elements);

    gl.drawArrays(gl.TRIANGLE_STRIP, Info.Clover.Stamen.position, Info.Clover.Stamen.n);
}

function defCloverPetal() {
    let CloverPetal_Vertices = new Float32Array([
        0.0, 0.0, 0.06, 1.0, 0.8, 1.0, 0.8,
        -0.1, 0.45, 0.06, 1.0, 0.6, 0.0, 0.6,
        -0.2, 0.347, 0.06, 1.0, 0.0, 0.0, 1.0,
        -0.1, 0.45, 0.06, 1.0, 0.6, 0.0, 0.6,
        0.0, 0.0, 0.06, 1.0, 0.8, 1.0, 0.8,
        0.1, 0.45, 0.06, 1.0, 0.6, 0.0, 0.6,
        0.1, 0.45, 0.06, 1.0, 0.6, 0.0, 0.6,
        0.0, 0.0, 0.06, 1.0, 0.8, 1.0, 0.8,
        0.2, 0.347, 0.06, 1.0, -0.0, 0.0, 1.0,
        0.0, 0.0, -0.06, 1.0, 0.8, 1.0, 0.8,
        -0.1, 0.45, -0.06, 1.0, 0.0, 0.0, 1.0,
        -0.2, 0.347, -0.06, 1.0, 0.0, 0.0, 1.0,
        -0.1, 0.45, -0.06, 1.0, -0.0, 0.0, 1.0,
        0.0, 0.0, -0.06, 1.0, 0.8, 1.0, 0.8,
        0.1, 0.45, -0.06, 1.0, -0.0, 0.0, 1.0,
        0.1, 0.45, -0.06, 1.0, -0.0, 0.0, 1.0,
        0.0, 0.0, -0.06, 1.0, 0.8, 1.0, 0.8,
        0.2, 0.347, -0.06, 1.0, -0.0, 0.0, 1.0,
        0.0, 0.0, 0.06, 1.0, 0.8, 1.0, 0.8,
        -0.2, 0.347, 0.06, 1.0, -0.8663933477709393, -0.5, 0.0,
        0.0, 0.0, -0.06, 1.0, 0.8, 1.0, 0.8,
        0.0, 0.0, -0.06, 1.0, 0.8, 1.0, 0.8,
        -0.2, 0.347, 0.06, 1.0, -0.8663933477709393, -0.5, -0.0,
        -0.2, 0.347, -0.06, 1.0, -0.8663933477709393, -0.5, -0.0,
        -0.2, 0.347, 0.06, 1.0, -0.717478291140605, 0.7, 0.0,
        -0.1, 0.45, 0.06, 1.0, 0.6, 0.0, 0.6,
        -0.2, 0.347, -0.06, 1.0, -0.717478291140605, 0.7, 0.0,
        -0.2, 0.347, -0.06, 1.0, -0.717478291140605, 0.7, 0.0,
        -0.1, 0.45, 0.06, 1.0, 0.6, 0.0, 0.6,
        -0.1, 0.45, -0.06, 1.0, -0.717478291140605, 0.7, 0.0,
        -0.1, 0.45, 0.06, 1.0, 0.6, 0.0, 0.6,
        0.1, 0.45, -0.06, 1.0, 0.0, 1.0, 0.0,
        -0.1, 0.45, -0.06, 1.0, 0.0, 1.0, 0.0,
        0.1, 0.45, -0.06, 1.0, 0.0, 1.0, -0.0,
        -0.1, 0.45, 0.06, 1.0, 0.6, 0.0, 0.6,
        0.1, 0.45, 0.06, 1.0, 0.6, 0.0, 0.6,
        0.1, 0.45, 0.06, 1.0, 0.6, 0.0, 0.6,
        0.2, 0.347, -0.06, 1.0, 0.717478291140605, 0.7, 0.0,
        0.1, 0.45, -0.06, 1.0, 0.717478291140605, 0.7, 0.0,
        0.2, 0.347, 0.06, 1.0, 0.717478291140605, 0.7, 0.0,
        0.2, 0.347, -0.06, 1.0, 0.717478291140605, 0.7, 0.0,
        0.1, 0.45, 0.06, 1.0, 0.6, 0.0, 0.6,
        0.0, 0.0, 0.06, 1.0, 0.8, 1.0, 0.8,
        0.0, 0.0, -0.06, 1.0, 0.8, 1.0, 0.8,
        0.2, 0.347, 0.06, 1.0, 0.8663933477709393, -0.5, 0.0,
        0.2, 0.347, 0.06, 1.0, 0.8663933477709393, -0.5, 0.0,
        0.0, 0.0, -0.06, 1.0, 0.8, 1.0, 0.8,
        0.2, 0.347, -0.06, 1.0, 0.8663933477709393, -0.5, 0.0
    ])

    updateInfo('Clover', 'Petal', CloverPetal_Vertices);
}

function drawCloverPetal(interval, modelMatrix, u_ModelMatrix, colorMatrix, u_ColorMatrix, idx) {
    // Rotate
    modelMatrix.rotate(360 / config.Clover.Petal.Num, 0, 0, 1);
    if (idx === 1) {
        modelMatrix.scale(config.Clover.Petal.Size, config.Clover.Petal.Size, config.Clover.Petal.Size);
        if (!config.Env.Pause && !config.Clover.Pause && !config.Clover.Petal.Pause) {
            config.Clover.Petal.angle += (config.Clover.Petal.rotSpeed * interval) / 1000.0;
            config.Clover.Petal.angle %= config.Clover.Petal.rotMaxAngle - config.Clover.Petal.rotMinAngle;
        }
        // rotate(interval, 'Clover', 'Petal');
        // modelMatrix.rotate(config.Clover.Petal.angle, 0, 0, 1);
    }

    gl.uniformMatrix4fv(u_ModelMatrix, false, modelMatrix.elements);

    colorMatrix.setTranslate(config.Clover.Petal.Clr[0] / 255, config.Clover.Petal.Clr[1] / 255, config.Clover.Petal.Clr[2] / 255);
    gl.uniformMatrix4fv(u_ColorMatrix, false, colorMatrix.elements);

    gl.drawArrays(gl.TRIANGLES, Info.Clover.Petal.position, Info.Clover.Petal.n);
}