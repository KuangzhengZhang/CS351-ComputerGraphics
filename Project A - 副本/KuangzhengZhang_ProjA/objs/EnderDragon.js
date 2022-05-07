function defEnderDragonBody() {
    defCylinderZ(L = config.EnderDragon.Body.L, R = config.EnderDragon.Body.R, H = config.EnderDragon.Body.H, capVerts = config.EnderDragon.Body.capVerts, Level1 = 'EnderDragon', Level2 = 'Body');
}

function drawEnderDragonBody(interval, modelMatrix, u_ModelMatrix, colorMatrix, u_ColorMatrix) {
    if (!config.Env.Pause && !config.EnderDragon.Pause && mousePos[0] && mousePos[1] && (Math.abs(mousePos[0] - EnderDragonPos[0]) > 0.01 || Math.abs(mousePos[1] - EnderDragonPos[1]) > 0.01)) {
        let dx, dy, distance;
        dx = mousePos[0] - EnderDragonPos[0];
        dy = mousePos[1] - EnderDragonPos[1];
        distance = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));
        dx /= distance;
        dy /= distance;
        if (Math.abs((interval / 100000) * dx * config.EnderDragon.Body.trackSpeed - dx * distance) < 0 && Math.abs((interval / 100000) * dy * config.EnderDragon.Body.trackSpeed - dy * distance < 0)) {
            console.debug('Lock');
            EnderDragonPos[0] = mousePos[0];
            EnderDragonPos[1] = mousePos[1];
            hasTarget = false;
        } else {
            console.debug('Unlock');
            EnderDragonPos[0] += (interval / 100000) * dx * config.EnderDragon.Body.trackSpeed;
            EnderDragonPos[1] += (interval / 100000) * dy * config.EnderDragon.Body.trackSpeed;
        }
    } else {
        hasTarget = false;
    }

    modelMatrix.translate(EnderDragonPos[0], EnderDragonPos[1], EnderDragonPos[2]);
    modelMatrix.scale(config.EnderDragon.Size, config.EnderDragon.Size, config.EnderDragon.Size);

    // Rotate
    rotate(interval, 'EnderDragon', 'Body', reciprocate = false);

    modelMatrix.rotate(config.EnderDragon.Body.angle, 0, 1, 0);
    // modelMatrix.rotate(config.EnderDragon.Body.angle, 0, 0, 1);

    gl.uniformMatrix4fv(u_ModelMatrix, false, modelMatrix.elements);

    colorMatrix.translate(config.EnderDragon.Body.Clr[0] / 255, config.EnderDragon.Body.Clr[1] / 255, config.EnderDragon.Body.Clr[2] / 255);
    gl.uniformMatrix4fv(u_ColorMatrix, false, colorMatrix.elements);

    gl.drawArrays(gl.TRIANGLE_STRIP, Info.EnderDragon.Body.position, Info.EnderDragon.Body.n);
}

function defEnderDragonNeck() {
    defConvex(W = config.EnderDragon.Neck.W, H = config.EnderDragon.Neck.H, L = config.EnderDragon.Neck.L, w = config.EnderDragon.Neck.w, h = config.EnderDragon.Neck.h, l = config.EnderDragon.Neck.l, Offest = config.EnderDragon.Neck.L, Level1 = 'EnderDragon', Level2 = 'Neck');
}

function drawEnderDragonNeck(interval, modelMatrix, u_ModelMatrix, colorMatrix, u_ColorMatrix, idx) {
    switch (idx) {
        case 1:
            modelMatrix.translate(0, 0, config.EnderDragon.Body.L - 0.03);
            break;
        default:
            modelMatrix.translate(0, 0, 0.18);
    }
    modelMatrix.scale(config.EnderDragon.Neck.Size, config.EnderDragon.Neck.Size, config.EnderDragon.Neck.Size);

    // Rotate
    rotate(interval, 'EnderDragon', 'Neck', reciprocate = true);

    modelMatrix.rotate(config.EnderDragon.Neck.angle, 1, 0, 0);

    gl.uniformMatrix4fv(u_ModelMatrix, false, modelMatrix.elements);

    colorMatrix.translate(config.EnderDragon.Neck.Clr[0] / 255, config.EnderDragon.Neck.Clr[1] / 255, config.EnderDragon.Neck.Clr[2] / 255);
    gl.uniformMatrix4fv(u_ColorMatrix, false, colorMatrix.elements);

    gl.drawArrays(gl.TRIANGLES, Info.EnderDragon.Neck.position, Info.EnderDragon.Neck.n);
}

function defEnderDragonTail() {
    defConvex(W = config.EnderDragon.Tail.W, H = config.EnderDragon.Tail.H, L = config.EnderDragon.Tail.L, w = config.EnderDragon.Tail.w, h = config.EnderDragon.Tail.h, l = config.EnderDragon.Tail.l, Offest = -config.EnderDragon.Tail.L, Level1 = 'EnderDragon', Level2 = 'Tail');
}

function defConvex(W, H, L, w, h, l, Offset, Level1, Level2) {
    let EnderDragonTail_Vertices = new Float32Array([
        // front
        -W, -H, L + Offset, 1.0, 1.0, 1.0, 0.0,
        W, -H, L + Offset, 1.0, 0.0, 1.0, 1.0,
        -W, H, L + Offset, 1.0, 1.0, 0.0, 1.0,

        W, -H, L + Offset, 1.0, 0.0, 1.0, 1.0,
        -W, H, L + Offset, 1.0, 1.0, 0.0, 1.0,
        W, H, L + Offset, 1.0, 1.0, 1.0, 0.0,

        // right
        W, -H, L + Offset, 1.0, 0.0, 1.0, 1.0,
        W, H, L + Offset, 1.0, 1.0, 1.0, 0.0,
        W, -H, -L + Offset, 1.0, 0.0, 1.0, 1.0,

        W, H, L + Offset, 1.0, 1.0, 1.0, 0.0,
        W, -H, -L + Offset, 1.0, 0.0, 1.0, 1.0,
        W, H, -L + Offset, 1.0, 1.0, 1.0, 0.0,

        // left
        -W, -H, L + Offset, 1.0, 1.0, 1.0, 0.0,
        -W, H, L + Offset, 1.0, 1.0, 0.0, 1.0,
        -W, -H, -L + Offset, 1.0, 1.0, 1.0, 0.0,

        -W, H, L + Offset, 1.0, 1.0, 0.0, 1.0,
        -W, -H, -L + Offset, 1.0, 1.0, 1.0, 0.0,
        -W, H, -L + Offset, 1.0, 1.0, 0.0, 1.0,

        // up
        -W, H, L + Offset, 1.0, 1.0, 0.0, 1.0,
        W, H, L + Offset, 1.0, 1.0, 1.0, 0.0,
        -W, H, -L + Offset, 1.0, 1.0, 0.0, 1.0,

        W, H, L + Offset, 1.0, 1.0, 1.0, 0.0,
        -W, H, -L + Offset, 1.0, 1.0, 0.0, 1.0,
        W, H, -L + Offset, 1.0, 1.0, 1.0, 0.0,

        // down
        -W, -H, L + Offset, 1.0, 1.0, 1.0, 0.0,
        W, -H, L + Offset, 1.0, 0.0, 1.0, 1.0,
        -W, -H, -L + Offset, 1.0, 1.0, 1.0, 0.0,

        W, -H, L + Offset, 1.0, 0.0, 1.0, 1.0,
        -W, -H, -L + Offset, 1.0, 1.0, 1.0, 0.0,
        W, -H, -L + Offset, 1.0, 0.0, 1.0, 1.0,

        // rear
        -W, -H, -L + Offset, 1.0, 1.0, 1.0, 0.0,
        W, -H, -L + Offset, 1.0, 0.0, 1.0, 1.0,
        -W, H, -L + Offset, 1.0, 1.0, 0.0, 1.0,

        W, -H, -L + Offset, 1.0, 0.0, 1.0, 1.0,
        -W, H, -L + Offset, 1.0, 1.0, 0.0, 1.0,
        W, H, -L + Offset, 1.0, 1.0, 1.0, 0.0,

        // Fin
        // front
        - w, 0.05, Offset + l, 1.0, 1.0, 1.0, 0.0,
        w, 0.05, Offset + l, 1.0, 0.0, 1.0, 1.0,
        -w, 0.05 + h, Offset + l, 1.0, 1.0, 0.0, 1.0,

        w, 0.05, Offset + l, 1.0, 0.0, 1.0, 1.0,
        -w, 0.05 + h, Offset + l, 1.0, 1.0, 0.0, 1.0,
        w, 0.05 + h, Offset + l, 1.0, 1.0, 1.0, 0.0,

        // right
        w, 0.05, Offset + l, 1.0, 0.0, 1.0, 1.0,
        w, 0.05 + h, Offset + l, 1.0, 1.0, 1.0, 0.0,
        w, 0.05, Offset - l, 1.0, 0.0, 1.0, 1.0,

        w, 0.05 + h, Offset + l, 1.0, 1.0, 1.0, 0.0,
        w, 0.05, Offset - l, 1.0, 0.0, 1.0, 1.0,
        w, 0.05 + h, Offset - l, 1.0, 1.0, 1.0, 0.0,

        // left
        -w, 0.05, Offset + l, 1.0, 1.0, 1.0, 0.0,
        -w, 0.05 + h, Offset + l, 1.0, 1.0, 0.0, 1.0,
        -w, 0.05, Offset - l, 1.0, 1.0, 1.0, 0.0,

        -w, 0.05 + h, Offset + l, 1.0, 1.0, 0.0, 1.0,
        -w, 0.05, Offset - l, 1.0, 1.0, 1.0, 0.0,
        -w, 0.05 + h, Offset - l, 1.0, 1.0, 0.0, 1.0,

        // up
        -w, 0.05 + h, Offset + l, 1.0, 1.0, 0.0, 1.0,
        w, 0.05 + h, Offset + l, 1.0, 1.0, 1.0, 0.0,
        -w, 0.05 + h, Offset - l, 1.0, 1.0, 0.0, 1.0,

        w, 0.05 + h, Offset + l, 1.0, 1.0, 1.0, 0.0,
        -w, 0.05 + h, Offset - l, 1.0, 1.0, 0.0, 1.0,
        w, 0.05 + h, Offset - l, 1.0, 1.0, 1.0, 0.0,

        // // down
        // -w, 0.05,Offset+l, 1.0, 1.0, 1.0, 0.0,
        // w, 0.05,Offset+l, 1.0, 0.0, 1.0, 1.0,
        // -w, 0.05, Offset-l, 1.0, 1.0, 1.0, 0.0,

        // w, 0.05,Offset+l, 1.0, 0.0, 1.0, 1.0,
        // -w, 0.05, Offset-l, 1.0, 1.0, 1.0, 0.0,
        // w, 0.05, Offset-l, 1.0, 0.0, 1.0, 1.0,

        // rear
        -w, 0.05, Offset - l, 1.0, 1.0, 1.0, 0.0,
        w, 0.05, Offset - l, 1.0, 0.0, 1.0, 1.0,
        -w, 0.05 + h, Offset - l, 1.0, 1.0, 0.0, 1.0,

        w, 0.05, Offset - l, 1.0, 0.0, 1.0, 1.0,
        -w, 0.05 + h, Offset - l, 1.0, 1.0, 0.0, 1.0,
        w, 0.05 + h, Offset - l, 1.0, 1.0, 1.0, 0.0

    ])

    updateInfo(Level1, Level2, EnderDragonTail_Vertices);
}

function drawEnderDragonTail(interval, modelMatrix, u_ModelMatrix, colorMatrix, u_ColorMatrix, idx) {
    switch (idx) {
        case 1:
            modelMatrix.translate(0, 0, -config.EnderDragon.Body.L + 0.03);
            break;
        default:
            modelMatrix.translate(0, 0, -0.18);
    }
    modelMatrix.scale(config.EnderDragon.Tail.Size, config.EnderDragon.Tail.Size, config.EnderDragon.Tail.Size);

    // Rotate
    rotate(interval, 'EnderDragon', 'Tail', reciprocate = true);

    modelMatrix.rotate(config.EnderDragon.Tail.angle, 1, 0, 0);

    gl.uniformMatrix4fv(u_ModelMatrix, false, modelMatrix.elements);

    colorMatrix.translate(config.EnderDragon.Tail.Clr[0] / 255, config.EnderDragon.Tail.Clr[1] / 255, config.EnderDragon.Tail.Clr[2] / 255);
    gl.uniformMatrix4fv(u_ColorMatrix, false, colorMatrix.elements);

    gl.drawArrays(gl.TRIANGLES, Info.EnderDragon.Tail.position, Info.EnderDragon.Tail.n);
}

function defEnderDragonWing1() {
    let x = 0.4;
    let y = 0.05;
    let EnderDragonWing1_Vertices = new Float32Array([
        0.0, -0.05, 0.05, 1.0, 0.0, -0.0, 1.0,
        0.4, -0.05, 0.05, 1.0, 0.0, -0.0, 1.0,
        0.0, 0.05, 0.05, 1.0, 0.0, -0.0, 1.0,
        0.0, 0.05, 0.05, 1.0, -0.0, 0.0, 1.0,
        0.4, -0.05, 0.05, 1.0, -0.0, 0.0, 1.0,
        0.4, 0.05, 0.05, 1.0, -0.0, 0.0, 1.0,
        0.0, 0.05, -0.05, 1.0, -0.0, -0.0, -1.0,
        0.4, -0.05, -0.05, 1.0, -0.0, -0.0, -1.0,
        0.0, -0.05, -0.05, 1.0, -0.0, -0.0, -1.0,
        0.4, -0.05, -0.05, 1.0, 0.0, 0.0, -1.0,
        0.0, 0.05, -0.05, 1.0, 0.0, 0.0, -1.0,
        0.4, 0.05, -0.05, 1.0, 0.0, 0.0, -1.0,
        0.0, -0.05, 0.05, 1.0, -1.0, 0.0, -0.0,
        0.0, 0.05, 0.05, 1.0, -1.0, 0.0, -0.0,
        0.0, -0.05, -0.05, 1.0, -1.0, 0.0, -0.0,
        0.0, 0.05, 0.05, 1.0, -1.0, -0.0, -0.0,
        0.0, 0.05, -0.05, 1.0, -1.0, -0.0, -0.0,
        0.0, -0.05, -0.05, 1.0, -1.0, -0.0, -0.0,
        0.4, -0.05, 0.05, 1.0, 1.0, -0.0, 0.0,
        0.4, -0.05, -0.05, 1.0, 1.0, -0.0, 0.0,
        0.4, 0.05, 0.05, 1.0, 1.0, -0.0, 0.0,
        0.4, 0.05, 0.05, 1.0, 1.0, -0.0, 0.0,
        0.4, -0.05, -0.05, 1.0, 1.0, -0.0, 0.0,
        0.4, 0.05, -0.05, 1.0, 1.0, -0.0, 0.0,
        0.0, 0.05, 0.05, 1.0, -0.0, 1.0, 0.0,
        0.4, 0.05, 0.05, 1.0, -0.0, 1.0, 0.0,
        0.0, 0.05, -0.05, 1.0, -0.0, 1.0, 0.0,
        0.0, 0.05, -0.05, 1.0, -0.0, 1.0, 0.0,
        0.4, 0.05, 0.05, 1.0, -0.0, 1.0, 0.0,
        0.4, 0.05, -0.05, 1.0, -0.0, 1.0, 0.0,
        0.0, -0.05, 0.05, 1.0, 0.0, -1.0, 0.0,
        0.0, -0.05, -0.05, 1.0, 0.0, -1.0, 0.0,
        0.4, -0.05, 0.05, 1.0, 0.0, -1.0, 0.0,
        0.4, -0.05, 0.05, 1.0, 0.0, -1.0, -0.0,
        0.0, -0.05, -0.05, 1.0, 0.0, -1.0, -0.0,
        0.4, -0.05, -0.05, 1.0, 0.0, -1.0, -0.0,
        0.0, 0.0375, -0.05, 1.0, -0.0, 1.0, 0.0,
        0.4, 0.0375, -0.05, 1.0, -0.0, 1.0, 0.0,
        0.1, 0.0375, -0.1, 1.0, -0.0, 1.0, 0.0,
        0.1, 0.0375, -0.1, 1.0, 0.009598980258503125, 0.9982939468843253, -0.05759388155101876,
        0.4, 0.0375, -0.05, 1.0, 0.009598980258503125, 0.9982939468843253, -0.05759388155101876,
        0.2, 0.025, -0.3, 1.0, 0.009598980258503125, 0.9982939468843253, -0.05759388155101876,
        0.2, 0.025, -0.3, 1.0, -0.01784292425240631, 0.9992037581347533, -0.03568584850481261,
        0.4, 0.0375, -0.05, 1.0, -0.01784292425240631, 0.9992037581347533, -0.03568584850481261,
        0.4, 0.025, -0.4, 1.0, -0.01784292425240631, 0.9992037581347533, -0.03568584850481261,
        0.4, -0.0375, -0.05, 1.0, -0.0, -1.0, -0.0,
        0.0, -0.0375, -0.05, 1.0, -0.0, -1.0, -0.0,
        0.1, -0.0375, -0.1, 1.0, -0.0, -1.0, -0.0,
        0.4, -0.0375, -0.05, 1.0, 0.009598980258503125, -0.9982939468843253, -0.05759388155101876,
        0.1, -0.0375, -0.1, 1.0, 0.009598980258503125, -0.9982939468843253, -0.05759388155101876,
        0.2, -0.025, -0.3, 1.0, 0.009598980258503125, -0.9982939468843253, -0.05759388155101876,
        0.4, -0.0375, -0.05, 1.0, -0.01784292425240631, -0.9992037581347533, -0.03568584850481261,
        0.2, -0.025, -0.3, 1.0, -0.01784292425240631, -0.9992037581347533, -0.03568584850481261,
        0.4, -0.025, -0.4, 1.0, -0.01784292425240631, -0.9992037581347533, -0.03568584850481261,
        0.0, 0.0375, -0.05, 1.0, -0.44721359549995787, 0.0, -0.8944271909999157,
        0.1, 0.0375, -0.1, 1.0, -0.44721359549995787, 0.0, -0.8944271909999157,
        0.0, -0.0375, -0.05, 1.0, -0.44721359549995787, 0.0, -0.8944271909999157,
        0.0, -0.0375, -0.05, 1.0, -0.44721359549995787, -0.0, -0.8944271909999157,
        0.1, 0.0375, -0.1, 1.0, -0.44721359549995787, -0.0, -0.8944271909999157,
        0.1, -0.0375, -0.1, 1.0, -0.44721359549995787, -0.0, -0.8944271909999157,
        0.1, 0.0375, -0.1, 1.0, -0.8944271909999159, 0.0, -0.447213595499958,
        0.2, 0.025, -0.3, 1.0, -0.8944271909999159, 0.0, -0.447213595499958,
        0.1, -0.0375, -0.1, 1.0, -0.8944271909999159, 0.0, -0.447213595499958,
        0.1, -0.0375, -0.1, 1.0, -0.8944271909999159, -0.0, -0.44721359549995804,
        0.2, 0.025, -0.3, 1.0, -0.8944271909999159, -0.0, -0.44721359549995804,
        0.2, -0.025, -0.3, 1.0, -0.8944271909999159, -0.0, -0.44721359549995804,
        0.4, 0.025, -0.4, 1.0, -0.44721359549995804, 0.0, -0.8944271909999159,
        0.2, -0.025, -0.3, 1.0, -0.44721359549995804, 0.0, -0.8944271909999159,
        0.2, 0.025, -0.3, 1.0, -0.44721359549995804, 0.0, -0.8944271909999159,
        0.2, -0.025, -0.3, 1.0, -0.44721359549995804, -0.0, -0.8944271909999159,
        0.4, 0.025, -0.4, 1.0, -0.44721359549995804, -0.0, -0.8944271909999159,
        0.4, -0.025, -0.4, 1.0, -0.44721359549995804, -0.0, -0.8944271909999159,
        0.4, 0.0375, -0.05, 1.0, 1.0, -0.0, 0.0,
        0.4, -0.025, -0.4, 1.0, 1.0, -0.0, 0.0,
        0.4, 0.025, -0.4, 1.0, 1.0, -0.0, 0.0,
        0.4, -0.025, -0.4, 1.0, 0.1, 0.7, 0.1,
        0.4, 0.0375, -0.05, 1.0, 1.0, 0.2, 0.4,
        0.4, -0.0375, -0.05, 1.0, 0.0, 0.5, 0.9
    ])

    updateInfo('EnderDragon', 'Wing1', EnderDragonWing1_Vertices);
}

function drawEnderDragonWing1(interval, modelMatrix, u_ModelMatrix, colorMatrix, u_ColorMatrix, idx) {
    switch (idx) {
        case 1:
            modelMatrix.translate(0.1, 0, 0.15);
            modelMatrix.scale(config.EnderDragon.Wing1.Size, config.EnderDragon.Wing1.Size, config.EnderDragon.Wing1.Size);
            break;
        case 2:
            modelMatrix.translate(-0.1, 0, 0.15);
            modelMatrix.scale(config.EnderDragon.Wing1.Size, config.EnderDragon.Wing1.Size, config.EnderDragon.Wing1.Size);
            modelMatrix.scale(-1, 1, 1);
            break;
    }
    // Rotate
    rotate(interval, 'EnderDragon', 'Wing1', reciprocate = true);

    modelMatrix.rotate(config.EnderDragon.Wing1.angle, 0, 0, 1);

    gl.uniformMatrix4fv(u_ModelMatrix, false, modelMatrix.elements);

    colorMatrix.translate(config.EnderDragon.Wing1.Clr[0] / 255, config.EnderDragon.Wing1.Clr[1] / 255, config.EnderDragon.Wing1.Clr[2] / 255);
    gl.uniformMatrix4fv(u_ColorMatrix, false, colorMatrix.elements);

    gl.drawArrays(gl.TRIANGLES, Info.EnderDragon.Wing1.position, Info.EnderDragon.Wing1.n);
}

function defCylinderZ(L, R, H, capVerts, Level1, Level2) {
    let topColr = new Float32Array([0.8, 0.8, 0.0]);	// light yellow top
    let walColr = new Float32Array([0.2, 0.6, 0.2]);	// dark green walls
    let botColr = new Float32Array([0.2, 0.3, 0.7]);	// light blue bottom

    let Vertices = new Float32Array(((capVerts * 6) - 2) * floatsPerVertex);
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
            Vertices[j + 2] = -H;
            Vertices[j + 3] = 1.0;
        }
        // Vertices[j + 4] = botColr[0];
        // Vertices[j + 5] = botColr[1];
        // Vertices[j + 6] = botColr[2];
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
        // Vertices[j + 4] = walColr[0];
        // Vertices[j + 5] = walColr[1];
        // Vertices[j + 6] = walColr[2];
        Vertices[j + 4] = Math.random();
        Vertices[j + 5] = Math.random();
        Vertices[j + 6] = Math.random();
    }
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
            Vertices[j + 2] = H;
            Vertices[j + 3] = 1.0;
        }
        // Vertices[j + 4] = topColr[0];
        // Vertices[j + 5] = topColr[1];
        // Vertices[j + 6] = topColr[2];
        Vertices[j + 4] = Math.random();
        Vertices[j + 5] = Math.random();
        Vertices[j + 6] = Math.random();
    }
    updateInfo(Level1, Level2, Vertices);
}

function defCylinderY(L, R, capVerts, Level1, Level2) {
    let topColr = new Float32Array([0.8, 0.8, 0.0]);	// light yellow top
    let walColr = new Float32Array([0.2, 0.6, 0.2]);	// dark green walls
    let botColr = new Float32Array([0.2, 0.3, 0.7]);	// light blue bottom

    let Vertices = new Float32Array(((capVerts * 6) - 2) * floatsPerVertex);
    for (v = 0, j = 0; v < (2 * capVerts) - 1; v++, j += floatsPerVertex) {
        if (v % 2 == 0) {
            Vertices[j] = R * Math.cos(Math.PI * v / capVerts);
            Vertices[j + 1] = 0;
            Vertices[j + 2] = R * Math.sin(Math.PI * v / capVerts);
            Vertices[j + 3] = 1.0;
        }
        else {
            Vertices[j] = 0.0;
            Vertices[j + 1] = 0.0;
            Vertices[j + 2] = 0.0;
            Vertices[j + 3] = 1.0;
        }
        // Vertices[j + 4] = botColr[0];
        // Vertices[j + 5] = botColr[1];
        // Vertices[j + 6] = botColr[2];
        Vertices[j + 4] = Math.random();
        Vertices[j + 5] = Math.random();
        Vertices[j + 6] = Math.random();
    }
    // Wall
    for (v = 0; v < 2 * capVerts; v++, j += floatsPerVertex) {
        if (v % 2 == 0) {
            Vertices[j] = R * Math.cos(Math.PI * v / capVerts);
            Vertices[j + 1] = 0;
            Vertices[j + 2] = R * Math.sin(Math.PI * v / capVerts);
            Vertices[j + 3] = 1.0;
        }
        else {
            Vertices[j] = R * Math.cos(Math.PI * (v - 1) / capVerts);
            Vertices[j + 1] = L;
            Vertices[j + 2] = R * Math.sin(Math.PI * (v - 1) / capVerts);
            Vertices[j + 3] = 1.0;
        }
        // Vertices[j + 4] = walColr[0];
        // Vertices[j + 5] = walColr[1];
        // Vertices[j + 6] = walColr[2];
        Vertices[j + 4] = Math.random();
        Vertices[j + 5] = Math.random();
        Vertices[j + 6] = Math.random();
    }
    for (v = 0; v < (2 * capVerts - 1); v++, j += floatsPerVertex) {
        if (v % 2 == 0) {
            Vertices[j] = R * Math.cos(Math.PI * v / capVerts);
            Vertices[j + 1] = L;
            Vertices[j + 2] = R * Math.sin(Math.PI * v / capVerts);
            Vertices[j + 3] = 1.0;
        }
        else {
            Vertices[j] = 0.0;
            Vertices[j + 1] = L;
            Vertices[j + 2] = 0.0;
            Vertices[j + 3] = 1.0;
        }
        // Vertices[j + 4] = topColr[0];
        // Vertices[j + 5] = topColr[1];
        // Vertices[j + 6] = topColr[2];
        Vertices[j + 4] = Math.random();
        Vertices[j + 5] = Math.random();
        Vertices[j + 6] = Math.random();
    }
    updateInfo(Level1, Level2, Vertices);
}

function defCuboid(w, OffsetX, h, OffsetY, l, OffsetZ, Level1, Level2) {
    let Fin_Vertices = new Float32Array([
        // front
        -w + OffsetX, -h + OffsetY, l + OffsetZ, 1.0, 1.0, 1.0, 0.0,
        w + OffsetX, -h + OffsetY, l + OffsetZ, 1.0, 0.0, 1.0, 1.0,
        -w + OffsetX, h + OffsetY, l + OffsetZ, 1.0, 1.0, 0.0, 1.0,

        w + OffsetX, -h + OffsetY, l + OffsetZ, 1.0, 0.0, 1.0, 1.0,
        -w + OffsetX, h + OffsetY, l + OffsetZ, 1.0, 1.0, 0.0, 1.0,
        w + OffsetX, h + OffsetY, l + OffsetZ, 1.0, 1.0, 1.0, 0.0,

        // right
        w + OffsetX, -h + OffsetY, l + OffsetZ, 1.0, 0.0, 1.0, 1.0,
        w + OffsetX, h + OffsetY, l + OffsetZ, 1.0, 1.0, 1.0, 0.0,
        w + OffsetX, -h + OffsetY, -l + OffsetZ, 1.0, 0.0, 1.0, 1.0,

        w + OffsetX, h + OffsetY, l + OffsetZ, 1.0, 1.0, 1.0, 0.0,
        w + OffsetX, -h + OffsetY, -l + OffsetZ, 1.0, 0.0, 1.0, 1.0,
        w + OffsetX, h + OffsetY, -l + OffsetZ, 1.0, 1.0, 1.0, 0.0,

        // left
        -w + OffsetX, -h + OffsetY, l + OffsetZ, 1.0, 1.0, 1.0, 0.0,
        -w + OffsetX, h + OffsetY, l + OffsetZ, 1.0, 1.0, 0.0, 1.0,
        -w + OffsetX, -h + OffsetY, -l + OffsetZ, 1.0, 1.0, 1.0, 0.0,

        -w + OffsetX, h + OffsetY, l + OffsetZ, 1.0, 1.0, 0.0, 1.0,
        -w + OffsetX, -h + OffsetY, -l + OffsetZ, 1.0, 1.0, 1.0, 0.0,
        -w + OffsetX, h + OffsetY, -l + OffsetZ, 1.0, 1.0, 0.0, 1.0,

        // up
        -w + OffsetX, h + OffsetY, l + OffsetZ, 1.0, 1.0, 0.0, 1.0,
        w + OffsetX, h + OffsetY, l + OffsetZ, 1.0, 1.0, 1.0, 0.0,
        -w + OffsetX, h + OffsetY, -l + OffsetZ, 1.0, 1.0, 0.0, 1.0,

        w + OffsetX, h + OffsetY, l + OffsetZ, 1.0, 1.0, 1.0, 0.0,
        -w + OffsetX, h + OffsetY, -l + OffsetZ, 1.0, 1.0, 0.0, 1.0,
        w + OffsetX, h + OffsetY, -l + OffsetZ, 1.0, 1.0, 1.0, 0.0,

        // down
        -w + OffsetX, -h + OffsetY, l + OffsetZ, 1.0, 1.0, 1.0, 0.0,
        w + OffsetX, -h + OffsetY, l + OffsetZ, 1.0, 0.0, 1.0, 1.0,
        -w + OffsetX, -h + OffsetY, -l + OffsetZ, 1.0, 1.0, 1.0, 0.0,

        w + OffsetX, -h + OffsetY, l + OffsetZ, 1.0, 0.0, 1.0, 1.0,
        -w + OffsetX, -h + OffsetY, -l + OffsetZ, 1.0, 1.0, 1.0, 0.0,
        w + OffsetX, -h + OffsetY, -l + OffsetZ, 1.0, 0.0, 1.0, 1.0,

        // rear
        -w + OffsetX, -h + OffsetY, -l + OffsetZ, 1.0, 1.0, 1.0, 0.0,
        w + OffsetX, -h + OffsetY, -l + OffsetZ, 1.0, 0.0, 1.0, 1.0,
        -w + OffsetX, h + OffsetY, -l + OffsetZ, 1.0, 1.0, 0.0, 1.0,

        w + OffsetX, -h + OffsetY, -l + OffsetZ, 1.0, 0.0, 1.0, 1.0,
        -w + OffsetX, h + OffsetY, -l + OffsetZ, 1.0, 1.0, 0.0, 1.0,
        w + OffsetX, h + OffsetY, -l + OffsetZ, 1.0, 1.0, 1.0, 0.0
    ])

    updateInfo(Level1, Level2, Fin_Vertices);
}

function drawEnderDragonFin(interval, modelMatrix, u_ModelMatrix, colorMatrix, u_ColorMatrix) {
    gl.uniformMatrix4fv(u_ModelMatrix, false, modelMatrix.elements);

    // colorMatrix.translate(config.EnderDragon.Fin.Clr[0] / 255, config.EnderDragon.Fin.Clr[1] / 255, config.EnderDragon.Fin.Clr[2] / 255);
    // gl.uniformMatrix4fv(u_ColorMatrix, false, colorMatrix.elements);

    gl.drawArrays(gl.TRIANGLES, Info.EnderDragon.Fin.position, Info.EnderDragon.Fin.n);

    modelMatrix.translate(0, 0, config.EnderDragon.Body.L / 2);
    gl.uniformMatrix4fv(u_ModelMatrix, false, modelMatrix.elements);
    gl.drawArrays(gl.TRIANGLES, Info.EnderDragon.Fin.position, Info.EnderDragon.Fin.n);

    modelMatrix.translate(0, 0, -config.EnderDragon.Body.L);
    gl.uniformMatrix4fv(u_ModelMatrix, false, modelMatrix.elements);
    gl.drawArrays(gl.TRIANGLES, Info.EnderDragon.Fin.position, Info.EnderDragon.Fin.n);
}

function drawEnderDragonHead(interval, modelMatrix, u_ModelMatrix, colorMatrix, u_ColorMatrix) {
    // pushMatrix(modelMatrix);
    modelMatrix.translate(0, 0, config.EnderDragon.Neck.L * 2)
    gl.uniformMatrix4fv(u_ModelMatrix, false, modelMatrix.elements);
    gl.drawArrays(gl.TRIANGLES, Info.EnderDragon.Head.position, Info.EnderDragon.Head.n);

    colorMatrix.translate(config.EnderDragon.Head.Clr[0] / 255, config.EnderDragon.Head.Clr[1] / 255, config.EnderDragon.Head.Clr[2] / 255);
    gl.uniformMatrix4fv(u_ColorMatrix, false, colorMatrix.elements);

    // modelMatrix = popMatrix();

    // pushMatrix(modelMatrix);
    // modelMatrix.scale(0.8, 0.25, 1.5);
    // modelMatrix.rotate(-10, 1, 0, 0);
    // modelMatrix.translate(0, -0.3, 0.12 * 2);
    // gl.uniformMatrix4fv(u_ModelMatrix, false, modelMatrix.elements);
    // gl.drawArrays(gl.TRIANGLES, Info.EnderDragon.Head.position, Info.EnderDragon.Head.n);
    // modelMatrix = popMatrix();

    // pushMatrix(modelMatrix);
    // modelMatrix.scale(0.8, 0.25, 1.5);
    // modelMatrix.rotate(10, 1, 0, 0);
    // modelMatrix.translate(0, -0.2, 0.12 * 2);
    // gl.uniformMatrix4fv(u_ModelMatrix, false, modelMatrix.elements);
    // gl.drawArrays(gl.TRIANGLES, Info.EnderDragon.Head.position, Info.EnderDragon.Head.n);
    // modelMatrix = popMatrix();
}