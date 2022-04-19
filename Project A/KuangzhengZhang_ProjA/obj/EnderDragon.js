function defEnderDragonBody() {
    defCylinderZ(L = 0.25, r = 0.1, capVerts = 10, Level1 = 'EnderDragon', Level2 = 'Body');
    // let EnderDragonBody_Vertices = new Float32Array([
    //     // front
    //     -0.1, -0.1, 0.25, 1.0, 1.0, 0.0, 0.0,
    //     0.1, -0.1, 0.25, 1.0, 0.0, 1.0, 0.0,
    //     -0.1, 0.1, 0.25, 1.0, 0.0, 0.0, 1.0,

    //     0.1, -0.1, 0.25, 1.0, 0.0, 1.0, 0.0,
    //     -0.1, 0.1, 0.25, 1.0, 0.0, 0.0, 1.0,
    //     0.1, 0.1, 0.25, 1.0, 1.0, 0.0, 0.0,

    //     // right
    //     0.1, -0.1, 0.25, 1.0, 0.0, 1.0, 0.0,
    //     0.1, 0.1, 0.25, 1.0, 1.0, 0.0, 0.0,
    //     0.1, -0.1, -0.25, 1.0, 0.0, 1.0, 0.0,

    //     0.1, 0.1, 0.25, 1.0, 1.0, 0.0, 0.0,
    //     0.1, -0.1, -0.25, 1.0, 0.0, 1.0, 0.0,
    //     0.1, 0.1, -0.25, 1.0, 1.0, 0.0, 0.0,

    //     // left
    //     -0.1, -0.1, 0.25, 1.0, 1.0, 0.0, 0.0,
    //     -0.1, 0.1, 0.25, 1.0, 0.0, 0.0, 1.0,
    //     -0.1, -0.1, -0.25, 1.0, 1.0, 0.0, 0.0,

    //     -0.1, 0.1, 0.25, 1.0, 0.0, 0.0, 1.0,
    //     -0.1, -0.1, -0.25, 1.0, 1.0, 0.0, 0.0,
    //     -0.1, 0.1, -0.25, 1.0, 0.0, 0.0, 1.0,

    //     // up
    //     -0.1, 0.1, 0.25, 1.0, 0.0, 0.0, 1.0,
    //     0.1, 0.1, 0.25, 1.0, 1.0, 0.0, 0.0,
    //     -0.1, 0.1, -0.25, 1.0, 0.0, 0.0, 1.0,

    //     0.1, 0.1, 0.25, 1.0, 1.0, 0.0, 0.0,
    //     -0.1, 0.1, -0.25, 1.0, 0.0, 0.0, 1.0,
    //     0.1, 0.1, -0.25, 1.0, 1.0, 0.0, 0.0,

    //     // down
    //     -0.1, -0.1, 0.25, 1.0, 1.0, 0.0, 0.0,
    //     0.1, -0.1, 0.25, 1.0, 0.0, 1.0, 0.0,
    //     -0.1, -0.1, -0.25, 1.0, 1.0, 0.0, 0.0,

    //     0.1, -0.1, 0.25, 1.0, 0.0, 1.0, 0.0,
    //     -0.1, -0.1, -0.25, 1.0, 1.0, 0.0, 0.0,
    //     0.1, -0.1, -0.25, 1.0, 0.0, 1.0, 0.0,

    //     // rear
    //     -0.1, -0.1, -0.25, 1.0, 1.0, 0.0, 0.0,
    //     0.1, -0.1, -0.25, 1.0, 0.0, 1.0, 0.0,
    //     -0.1, 0.1, -0.25, 1.0, 0.0, 0.0, 1.0,

    //     0.1, -0.1, -0.25, 1.0, 0.0, 1.0, 0.0,
    //     -0.1, 0.1, -0.25, 1.0, 0.0, 0.0, 1.0,
    //     0.1, 0.1, -0.25, 1.0, 1.0, 0.0, 0.0
    // ])

    // updateInfo('EnderDragon', 'Body', EnderDragonBody_Vertices);
}

function drawEnderDragonBody(interval, modelMatrix, u_ModelMatrix) {
    if (!dragMode && mousePos[0] && mousePos[1] && (Math.abs(mousePos[0] - EnderDragonPos[0]) > 0.01 || Math.abs(mousePos[1] - EnderDragonPos[1]) > 0.01)) {
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
        } else {
            console.debug('Unlock');
            EnderDragonPos[0] += (interval / 100000) * dx * config.EnderDragon.Body.trackSpeed;
            EnderDragonPos[1] += (interval / 100000) * dy * config.EnderDragon.Body.trackSpeed;
        }
    } else if (!dragMode && !mousePos[0] && !mousePos[1]) {
        console.log(111)
    }

    modelMatrix.setTranslate(EnderDragonPos[0], EnderDragonPos[1], EnderDragonPos[2]);
    // modelMatrix.translate(interval/100, interval/100, interval/100);
    modelMatrix.scale(config.EnderDragon.Size, config.EnderDragon.Size, config.EnderDragon.Size);

    // Rotate
    // if (!config.EnderDragon.Pause && !config.EnderDragon.Body.Pause) {
    //     config.EnderDragon.Body.angle += (config.EnderDragon.Body.rotSpeed * interval) / 1000.0;
    //     config.EnderDragon.Body.angle %= config.EnderDragon.Body.rotMaxAngle - config.EnderDragon.Body.rotMinAngle;
    // }
    rotate(interval, 'EnderDragon', 'Body');

    modelMatrix.rotate(config.EnderDragon.Body.angle, 0, 1, 0);
    // modelMatrix.rotate(config.EnderDragon.Body.angle, 0, 0, 1);

    gl.uniformMatrix4fv(u_ModelMatrix, false, modelMatrix.elements);
    // gl.drawArrays(gl.TRIANGLES, Info.EnderDragon.Body.position, Info.EnderDragon.Body.n);
    gl.drawArrays(gl.TRIANGLE_STRIP, Info.EnderDragon.Body.position, Info.EnderDragon.Body.n);
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
        0.05, -0.05, -0.2, 1.0, 0.0, 1.0, 1.0,

        0.05, 0.05, 0, 1.0, 1.0, 1.0, 0.0,
        0.05, -0.05, -0.2, 1.0, 0.0, 1.0, 1.0,
        0.05, 0.05, -0.2, 1.0, 1.0, 1.0, 0.0,

        // left
        -0.05, -0.05, 0, 1.0, 1.0, 1.0, 0.0,
        -0.05, 0.05, 0, 1.0, 1.0, 0.0, 1.0,
        -0.05, -0.05, -0.2, 1.0, 1.0, 1.0, 0.0,

        -0.05, 0.05, 0, 1.0, 1.0, 0.0, 1.0,
        -0.05, -0.05, -0.2, 1.0, 1.0, 1.0, 0.0,
        -0.05, 0.05, -0.2, 1.0, 1.0, 0.0, 1.0,

        // up
        -0.05, 0.05, 0, 1.0, 1.0, 0.0, 1.0,
        0.05, 0.05, 0, 1.0, 1.0, 1.0, 0.0,
        -0.05, 0.05, -0.2, 1.0, 1.0, 0.0, 1.0,

        0.05, 0.05, 0, 1.0, 1.0, 1.0, 0.0,
        -0.05, 0.05, -0.2, 1.0, 1.0, 0.0, 1.0,
        0.05, 0.05, -0.2, 1.0, 1.0, 1.0, 0.0,

        // down
        -0.05, -0.05, 0, 1.0, 1.0, 1.0, 0.0,
        0.05, -0.05, 0, 1.0, 0.0, 1.0, 1.0,
        -0.05, -0.05, -0.2, 1.0, 1.0, 1.0, 0.0,

        0.05, -0.05, 0, 1.0, 0.0, 1.0, 1.0,
        -0.05, -0.05, -0.2, 1.0, 1.0, 1.0, 0.0,
        0.05, -0.05, -0.2, 1.0, 0.0, 1.0, 1.0,

        // rear
        -0.05, -0.05, -0.2, 1.0, 1.0, 1.0, 0.0,
        0.05, -0.05, -0.2, 1.0, 0.0, 1.0, 1.0,
        -0.05, 0.05, -0.2, 1.0, 1.0, 0.0, 1.0,

        0.05, -0.05, -0.2, 1.0, 0.0, 1.0, 1.0,
        -0.05, 0.05, -0.2, 1.0, 1.0, 0.0, 1.0,
        0.05, 0.05, -0.2, 1.0, 1.0, 1.0, 0.0
    ])

    updateInfo('EnderDragon', 'Tail', EnderDragonTail_Vertices);
}

function drawEnderDragonTail(interval, modelMatrix, u_ModelMatrix, idx) {
    // pushMatrix(modelMatrix);
    // modelMatrix.translate(EnderDragonPos[0], EnderDragonPos[1], EnderDragonPos[2]);
    switch (idx) {
        case 1:
            modelMatrix.translate(0, 0, -0.22);
            break;
        default:
            modelMatrix.translate(0, 0, -0.18);
    }
    // modelMatrix.translate(0, 0, -0.2);
    // modelMatrix.translate(0, 0, 0);
    modelMatrix.scale(config.EnderDragon.Tail.Size, config.EnderDragon.Tail.Size, config.EnderDragon.Tail.Size);

    // Rotate
    rotate(interval, 'EnderDragon', 'Tail');

    modelMatrix.rotate(config.EnderDragon.Tail.angle, 1, 0, 0);

    gl.uniformMatrix4fv(u_ModelMatrix, false, modelMatrix.elements);
    gl.drawArrays(gl.TRIANGLES, Info.EnderDragon.Tail.position, Info.EnderDragon.Tail.n);
}

function defEnderDragonWing1() {
    let x = 0.4;
    let y = 0.05;
    let EnderDragonWing1_Vertices = new Float32Array([
        // // front
        // 0, -y, y, 1.0, 0.0, 0.0, 0.5, // 0
        // x, -y, y, 1.0, 0.0, 250 / 255, 0, // 1
        // 0, y, y, 1.0, 1, 1, 0, // 2

        // x, -y, y, 1.0, 0.0, 250 / 255, 0, // 1
        // 0, y, y, 1.0, 1, 1, 0, // 2
        // x, y, y, 1.0, 139 / 255, 36 / 255, 19 / 255, // 3

        // // right
        // x, -y, y, 1.0, 0.0, 250 / 255, 0, // 1
        // x, y, y, 1.0, 139 / 255, 36 / 255, 19 / 255, // 3
        // x, -y, -y, 1.0, 1, 0, 1, // 5

        // x, y, y, 1.0, 139 / 255, 36 / 255, 19 / 255, // 3
        // x, -y, -y, 1.0, 1, 0, 1, // 5
        // x, y, -y, 1.0, 0, 191 / 255, 1, // 7

        // // left
        // 0, -y, y, 1.0, 0.0, 0.0, 0.5, // 0
        // 0, y, y, 1.0, 1, 1, 0, // 2
        // 0, -y, -y, 1.0, 178 / 255, 34 / 255, 34 / 255, // 4

        // 0, y, y, 1.0, 1, 1, 0, // 2
        // 0, -y, -y, 1.0, 178 / 255, 34 / 255, 34 / 255, // 4
        // 0, y, -y, 1.0, 160 / 255, 32 / 255, 240 / 255, // 6

        // // up
        // 0, y, y, 1.0, 1, 1, 0, // 2
        // x, y, y, 1.0, 139 / 255, 36 / 255, 19 / 255, // 3
        // 0, y, -y, 1.0, 160 / 255, 32 / 255, 240 / 255, // 6

        // x, y, y, 1.0, 139 / 255, 36 / 255, 19 / 255, // 3
        // 0, y, -y, 1.0, 160 / 255, 32 / 255, 240 / 255, // 6
        // x, y, -y, 1.0, 0, 191 / 255, 1, // 7

        // // down
        // 0, -y, y, 1.0, 0.0, 0.0, 0.5, // 0
        // x, -y, y, 1.0, 0.0, 250 / 255, 0, // 1
        // 0, -y, -y, 1.0, 178 / 255, 34 / 255, 34 / 255, // 4

        // x, -y, y, 1.0, 0.0, 250 / 255, 0, // 1
        // 0, -y, -y, 1.0, 178 / 255, 34 / 255, 34 / 255, // 4
        // x, -y, -y, 1.0, 1, 0, 1, // 5

        // // rear
        // 0, -y, -y, 1.0, 178 / 255, 34 / 255, 34 / 255, // 4
        // x, -y, -y, 1.0, 1, 0, 1, // 5
        // 0, y, -y, 1.0, 160 / 255, 32 / 255, 240 / 255, // 6

        // x, -y, -y, 1.0, 1, 0, 1, // 5
        // 0, y, -y, 1.0, 160 / 255, 32 / 255, 240 / 255, // 6
        // x, y, -y, 1.0, 0, 191 / 255, 1, // 7

        // // Joint1
        // 0, (3 / 4) * y, 0, 1.0, 0.0, 0.0, 0.5, // 0
        // x, (3 / 4) * y, 0, 1.0, 1, 0, 0, // 1
        // (1 / 4) * x, (3 / 4) * y, -(2 / 8) * x, 1.0, 1, 1, 0, // 2

        // 0, -(3 / 4) * y, 0, 1.0, 0.0, 0.0, 0.5,
        // x, -(3 / 4) * y, 0, 1.0, 0.0, 250 / 255, 0,
        // (1 / 4) * x, -(3 / 4) * y, -(2 / 8) * x, 1.0, 1, 1, 0,

        // x, (3 / 4) * y, 0, 1.0, 1, 0, 0, // 1
        // (1 / 4) * x, (3 / 4) * y, -(2 / 8) * x, 1.0, 1, 1, 0, // 2
        // (1 / 2) * x, (1 / 2) * y, -(3 / 4) * x, 1.0, 0, 1, 0, // 3

        // x, -(3 / 4) * y, 0, 1.0, 0.0, 250 / 255, 0,
        // (1 / 4) * x, -(3 / 4) * y, -(2 / 8) * x, 1.0, 1, 1, 0,
        // (1 / 2) * x, -(1 / 2) * y, -(3 / 4) * x, 1.0, 1, 1, 0,

        // x, (3 / 4) * y, 0, 1.0, 1, 0, 0, // 1
        // (1 / 2) * x, (1 / 2) * y, -(3 / 4) * x, 1.0, 0, 1, 0, // 3
        // x, (1 / 2) * y, -x, 1.0, 0, 0, 1, // 4

        // x, -(3 / 4) * y, 0, 1.0, 1, 0, 0,
        // (1 / 2) * x, -(1 / 2) * y, -(3 / 4) * x, 1.0, 0, 1, 0,
        // x, -(1 / 2) * y, -x, 1.0, 0, 0, 1,

        // // Enclose

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
        0.0, -0.0375, -0.05, 1.0, -0.0, 1.0, 0.0,
        0.4, -0.0375, -0.05, 1.0, -0.0, 1.0, 0.0,
        0.1, -0.0375, -0.1, 1.0, -0.0, 1.0, 0.0,
        0.1, -0.0375, -0.1, 1.0, -0.009598980258503125, 0.9982939468843253, 0.05759388155101876,
        0.4, -0.0375, -0.05, 1.0, -0.009598980258503125, 0.9982939468843253, 0.05759388155101876,
        0.2, -0.025, -0.3, 1.0, -0.009598980258503125, 0.9982939468843253, 0.05759388155101876,
        0.2, -0.025, -0.3, 1.0, 0.01784292425240631, 0.9992037581347533, 0.03568584850481261,
        0.4, -0.0375, -0.05, 1.0, 0.01784292425240631, 0.9992037581347533, 0.03568584850481261,
        0.4, -0.025, -0.4, 1.0, 0.01784292425240631, 0.9992037581347533, 0.03568584850481261,
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
        0.4, -0.025, -0.4, 1.0, 1.0, 0.0, -0.0,
        0.4, 0.0375, -0.05, 1.0, 1.0, 0.0, -0.0,
        0.4, -0.0375, -0.05, 1.0, 1.0, 0.0, -0.0
    ])

    updateInfo('EnderDragon', 'Wing1', EnderDragonWing1_Vertices);
}

function drawEnderDragonWing1(interval, modelMatrix, u_ModelMatrix, idx) {
    switch (idx) {
        case 1:
            modelMatrix.translate(0.1, 0, 0.15);
            break;
        case 2:
            modelMatrix.translate(-0.1, 0, 0.15);
            modelMatrix.scale(-1, 1, 1);
            break;
    }
    // Rotate
    rotate(interval, 'EnderDragon', 'Wing1');

    modelMatrix.rotate(config.EnderDragon.Wing1.angle, 0, 0, 1);

    gl.uniformMatrix4fv(u_ModelMatrix, false, modelMatrix.elements);
    gl.drawArrays(gl.TRIANGLES, Info.EnderDragon.Wing1.position, Info.EnderDragon.Wing1.n);
}

// function defEnderDragonWing1_2() {
//     let x = 0.4;
//     let y = 0.05;
//     let EnderDragonWing1_Vertices = new Float32Array([
//         // front
//         0, -y, 0, 1.0, 0.0, 0.0, 0.5, // 0
//         -x, -y, 0, 1.0, 0.0, 250 / 255, 0, // 1
//         0, y, 0, 1.0, 1, 1, 0, // 2

//         -x, -y, 0, 1.0, 0.0, 250 / 255, 0, // 1
//         0, y, 0, 1.0, 1, 1, 0, // 2
//         -x, y, 0, 1.0, 139 / 255, 36 / 255, 19 / 255, // 3

//         // right
//         -x, -y, 0, 1.0, 0.0, 250 / 255, 0, // 1
//         -x, y, 0, 1.0, 139 / 255, 36 / 255, 19 / 255, // 3
//         -x, -y, -2 * y, 1.0, 1, 0, 1, // 5

//         -x, y, 0, 1.0, 139 / 255, 36 / 255, 19 / 255, // 3
//         -x, -y, -2 * y, 1.0, 1, 0, 1, // 5
//         -x, y, -2 * y, 1.0, 0, 191 / 255, 1, // 7

//         // left
//         0, -y, 0, 1.0, 0.0, 0.0, 0.5, // 0
//         0, y, 0, 1.0, 1, 1, 0, // 2
//         0, -y, -2 * y, 1.0, 178 / 255, 34 / 255, 34 / 255, // 4

//         0, y, 0, 1.0, 1, 1, 0, // 2
//         0, -y, -2 * y, 1.0, 178 / 255, 34 / 255, 34 / 255, // 4
//         0, y, -2 * y, 1.0, 160 / 255, 32 / 255, 240 / 255, // 6

//         // up
//         0, y, 0, 1.0, 1, 1, 0, // 2
//         -x, y, 0, 1.0, 139 / 255, 36 / 255, 19 / 255, // 3
//         0, y, -2 * y, 1.0, 160 / 255, 32 / 255, 240 / 255, // 6

//         -x, y, 0, 1.0, 139 / 255, 36 / 255, 19 / 255, // 3
//         0, y, -2 * y, 1.0, 160 / 255, 32 / 255, 240 / 255, // 6
//         -x, y, -2 * y, 1.0, 0, 191 / 255, 1, // 7

//         // down
//         0, -y, 0, 1.0, 0.0, 0.0, 0.5, // 0
//         -x, -y, 0, 1.0, 0.0, 250 / 255, 0, // 1
//         0, -y, -2 * y, 1.0, 178 / 255, 34 / 255, 34 / 255, // 4

//         -x, -y, 0, 1.0, 0.0, 250 / 255, 0, // 1
//         0, -y, -2 * y, 1.0, 178 / 255, 34 / 255, 34 / 255, // 4
//         -x, -y, -2 * y, 1.0, 1, 0, 1, // 5

//         // rear
//         0, -y, -2 * y, 1.0, 178 / 255, 34 / 255, 34 / 255, // 4
//         -x, -y, -2 * y, 1.0, 1, 0, 1, // 5
//         0, y, -2 * y, 1.0, 160 / 255, 32 / 255, 240 / 255, // 6

//         -x, -y, -2 * y, 1.0, 1, 0, 1, // 5
//         0, y, -2 * y, 1.0, 160 / 255, 32 / 255, 240 / 255, // 6
//         -x, y, -2 * y, 1.0, 0, 191 / 255, 1, // 7

//         // Joint1
//         0, (3 / 4) * y, 0, 1.0, 0.0, 0.0, 0.5, // 0
//         -x, (3 / 4) * y, 0, 1.0, 1, 0, 0, // 1
//         -(1 / 4) * x, (3 / 4) * y, (1 / 8) * x, 1.0, 1, 1, 0, // 2

//         0, -(3 / 4) * y, 0, 1.0, 0.0, 0.0, 0.5,
//         -x, -(3 / 4) * y, 0, 1.0, 0.0, 250 / 255, 0,
//         -(1 / 4) * x, -(3 / 4) * y, (1 / 8) * x, 1.0, 1, 1, 0,

//         -x, (3 / 4) * y, 0, 1.0, 1, 0, 0, // 1
//         -(1 / 4) * x, (3 / 4) * y, (1 / 8) * x, 1.0, 1, 1, 0, // 2
//         -(1 / 2) * x, (1 / 2) * y, (3 / 4) * x, 1.0, 0, 1, 0, // 3

//         -x, -(3 / 4) * y, 0, 1.0, 0.0, 250 / 255, 0,
//         -(1 / 4) * x, -(3 / 4) * y, (1 / 8) * x, 1.0, 1, 1, 0,
//         -(1 / 2) * x, -(1 / 2) * y, (3 / 4) * x, 1.0, 1, 1, 0,

//         -x, (3 / 4) * y, 0, 1.0, 1, 0, 0, // 1
//         -(1 / 2) * x, (1 / 2) * y, (3 / 4) * x, 1.0, 0, 1, 0, // 3
//         -x, (1 / 2) * y, x, 1.0, 0, 0, 1, // 4

//         -x, -(3 / 4) * y, 0, 1.0, 1, 0, 0,
//         -(1 / 2) * x, -(1 / 2) * y, (3 / 4) * x, 1.0, 0, 1, 0,
//         -x, -(1 / 2) * y, x, 1.0, 0, 0, 1
//     ])

//     updateInfo('EnderDragon', 'Wing1_2', EnderDragonWing1_Vertices);
// }

// function drawEnderDragonWing1_2(interval, modelMatrix, u_ModelMatrix) {
//     modelMatrix.translate(-0.1, 0, -0.15);

//     // Rotate
//     // rotate(interval, 'EnderDragon', 'Wing1');

//     modelMatrix.rotate(-config.EnderDragon.Wing1.angle, 0, 0, 1);

//     gl.uniformMatrix4fv(u_ModelMatrix, false, modelMatrix.elements);
//     gl.drawArrays(gl.TRIANGLES, Info.EnderDragon.Wing1_2.position, Info.EnderDragon.Wing1_2.n);
// }

// function defEnderDragonWing2() {
//     let x = 0.4;
//     let y = 0.05;
//     let EnderDragonWing2_Vertices = new Float32Array([
//         // front
//         0, -y, 0, 1.0, 0.0, 0.0, 0.5, // 0
//         x, -y, 0, 1.0, 0.0, 250 / 255, 0, // 1
//         0, y, 0, 1.0, 1, 1, 0, // 2

//         x, -y, 0, 1.0, 0.0, 250 / 255, 0, // 1
//         0, y, 0, 1.0, 1, 1, 0, // 2
//         x, y, 0, 1.0, 139 / 255, 36 / 255, 19 / 255, // 3

//         // right
//         x, -y, 0, 1.0, 0.0, 250 / 255, 0, // 1
//         x, y, 0, 1.0, 139 / 255, 36 / 255, 19 / 255, // 3
//         x, -y, -2 * y, 1.0, 1, 0, 1, // 5

//         x, y, 0, 1.0, 139 / 255, 36 / 255, 19 / 255, // 3
//         x, -y, -2 * y, 1.0, 1, 0, 1, // 5
//         x, y, -2 * y, 1.0, 0, 191 / 255, 1, // 7

//         // left
//         0, -y, 0, 1.0, 0.0, 0.0, 0.5, // 0
//         0, y, 0, 1.0, 1, 1, 0, // 2
//         0, -y, -2 * y, 1.0, 178 / 255, 34 / 255, 34 / 255, // 4

//         0, y, 0, 1.0, 1, 1, 0, // 2
//         0, -y, -2 * y, 1.0, 178 / 255, 34 / 255, 34 / 255, // 4
//         0, y, -2 * y, 1.0, 160 / 255, 32 / 255, 240 / 255, // 6

//         // up
//         0, y, 0, 1.0, 1, 1, 0, // 2
//         x, y, 0, 1.0, 139 / 255, 36 / 255, 19 / 255, // 3
//         0, y, -2 * y, 1.0, 160 / 255, 32 / 255, 240 / 255, // 6

//         x, y, 0, 1.0, 139 / 255, 36 / 255, 19 / 255, // 3
//         0, y, -2 * y, 1.0, 160 / 255, 32 / 255, 240 / 255, // 6
//         x, y, -2 * y, 1.0, 0, 191 / 255, 1, // 7

//         // down
//         0, -y, 0, 1.0, 0.0, 0.0, 0.5, // 0
//         x, -y, 0, 1.0, 0.0, 250 / 255, 0, // 1
//         0, -y, -2 * y, 1.0, 178 / 255, 34 / 255, 34 / 255, // 4

//         x, -y, 0, 1.0, 0.0, 250 / 255, 0, // 1
//         0, -y, -2 * y, 1.0, 178 / 255, 34 / 255, 34 / 255, // 4
//         x, -y, -2 * y, 1.0, 1, 0, 1, // 5

//         // rear
//         0, -y, -2 * y, 1.0, 178 / 255, 34 / 255, 34 / 255, // 4
//         x, -y, -2 * y, 1.0, 1, 0, 1, // 5
//         0, y, -2 * y, 1.0, 160 / 255, 32 / 255, 240 / 255, // 6

//         x, -y, -2 * y, 1.0, 1, 0, 1, // 5
//         0, y, -2 * y, 1.0, 160 / 255, 32 / 255, 240 / 255, // 6
//         x, y, -2 * y, 1.0, 0, 191 / 255, 1, // 7

//         // Joint1
//         0, (3 / 4) * y, 0, 1.0, 0.0, 0.0, 0.5, // 0
//         x, (3 / 4) * y, 0, 1.0, 1, 0, 0, // 1
//         (1 / 4) * x, (3 / 4) * y, (1 / 8) * x, 1.0, 1, 1, 0, // 2

//         0, -(3 / 4) * y, 0, 1.0, 0.0, 0.0, 0.5,
//         x, -(3 / 4) * y, 0, 1.0, 0.0, 250 / 255, 0,
//         (1 / 4) * x, -(3 / 4) * y, (1 / 8) * x, 1.0, 1, 1, 0,

//         x, (3 / 4) * y, 0, 1.0, 1, 0, 0, // 1
//         (1 / 4) * x, (3 / 4) * y, (1 / 8) * x, 1.0, 1, 1, 0, // 2
//         (1 / 2) * x, (1 / 2) * y, (3 / 4) * x, 1.0, 0, 1, 0, // 3

//         x, -(3 / 4) * y, 0, 1.0, 0.0, 250 / 255, 0,
//         (1 / 4) * x, -(3 / 4) * y, (1 / 8) * x, 1.0, 1, 1, 0,
//         (1 / 2) * x, -(1 / 2) * y, (3 / 4) * x, 1.0, 1, 1, 0,

//         x, (3 / 4) * y, 0, 1.0, 1, 0, 0, // 1
//         (1 / 2) * x, (1 / 2) * y, (3 / 4) * x, 1.0, 0, 1, 0, // 3
//         x, (1 / 2) * y, x, 1.0, 0, 0, 1, // 4

//         x, -(3 / 4) * y, 0, 1.0, 1, 0, 0,
//         (1 / 2) * x, -(1 / 2) * y, (3 / 4) * x, 1.0, 0, 1, 0,
//         x, -(1 / 2) * y, x, 1.0, 0, 0, 1
//     ])

//     updateInfo('EnderDragon', 'Wing2', EnderDragonWing2_Vertices);
// }

// function drawEnderDragonWing2(interval, modelMatrix, u_ModelMatrix) {
//     modelMatrix.translate(0.2, 0, -0.2);

//     // Rotate
//     rotate(interval, 'EnderDragon', 'Wing2');

//     modelMatrix.rotate(config.EnderDragon.Wing1.angle, 0, 0, 1);

//     gl.uniformMatrix4fv(u_ModelMatrix, false, modelMatrix.elements);
//     gl.drawArrays(gl.TRIANGLES, Info.EnderDragon.Clover.position, Info.EnderDragon.Clover.n);
// }

function defCylinderZ(L, R, capVerts, Level1, Level2) {
    let topColr = new Float32Array([0.8, 0.8, 0.0]);	// light yellow top
    let walColr = new Float32Array([0.2, 0.6, 0.2]);	// dark green walls
    let botColr = new Float32Array([0.2, 0.3, 0.7]);	// light blue bottom
    let ctrColr = new Float32Array([0.1, 0.1, 0.1]);    // near black end-cap centers
    let errColr = new Float32Array([1.0, 0.2, 0.2]);	// Bright-red trouble color
    let topRadius = 1;

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
            Vertices[j + 2] = -L;
            Vertices[j + 3] = 1.0;
        }
        Vertices[j + 4] = ctrColr[0];
        Vertices[j + 5] = ctrColr[1];
        Vertices[j + 6] = ctrColr[2];
    }
    for (v = 0; v < 2 * capVerts; v++, j += floatsPerVertex) {
        if (v % 2 == 0) {
            Vertices[j] = R * Math.cos(Math.PI * (v) / capVerts);
            Vertices[j + 1] = R * Math.sin(Math.PI * (v) / capVerts);
            Vertices[j + 2] = -L;
            Vertices[j + 3] = 1.0;
            if (v == 0) {
                Vertices[j + 4] = errColr[0];
                Vertices[j + 5] = errColr[1];
                Vertices[j + 6] = errColr[2];
            } else {
                Vertices[j + 4] = walColr[0];
                Vertices[j + 5] = walColr[1];
                Vertices[j + 6] = walColr[2];
            }
        }
        else {
            Vertices[j] = R * topRadius * Math.cos(Math.PI * (v - 1) / capVerts);
            Vertices[j + 1] = R * topRadius * Math.sin(Math.PI * (v - 1) / capVerts);
            Vertices[j + 2] = L;
            Vertices[j + 3] = 1.0;
            Vertices[j + 4] = walColr[0];
            Vertices[j + 5] = walColr[1];
            Vertices[j + 6] = walColr[2];
        }
    }
    for (v = 0; v < (2 * capVerts - 1); v++, j += floatsPerVertex) {
        if (v % 2 == 0) {
            Vertices[j] = R * topRadius * Math.cos(Math.PI * v / capVerts);
            Vertices[j + 1] = R * topRadius * Math.sin(Math.PI * v / capVerts);
            Vertices[j + 2] = L;
            Vertices[j + 3] = 1.0;
            if (v == 0) {
                Vertices[j + 4] = errColr[0];
                Vertices[j + 5] = errColr[1];
                Vertices[j + 6] = errColr[2];
            } else {
                Vertices[j + 4] = topColr[0];
                Vertices[j + 5] = topColr[1];
                Vertices[j + 6] = topColr[2];
            }
        }
        else {
            Vertices[j] = 0.0;
            Vertices[j + 1] = 0.0;
            Vertices[j + 2] = L;
            Vertices[j + 3] = 1.0;
            Vertices[j + 4] = ctrColr[0];
            Vertices[j + 5] = ctrColr[1];
            Vertices[j + 6] = ctrColr[2];
        }
    }
    updateInfo(Level1, Level2, Vertices);
}

function defCylinderY(L, R, capVerts, Level1, Level2) {
    let topColr = new Float32Array([0.8, 0.8, 0.0]);	// light yellow top
    let walColr = new Float32Array([0.2, 0.6, 0.2]);	// dark green walls
    let botColr = new Float32Array([0.2, 0.3, 0.7]);	// light blue bottom
    let topRadius = 1;

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
            Vertices[j] = R * topRadius * Math.cos(Math.PI * (v - 1) / capVerts);
            Vertices[j + 1] = L;
            Vertices[j + 2] = R * topRadius * Math.sin(Math.PI * (v - 1) / capVerts);
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
            Vertices[j] = R * topRadius * Math.cos(Math.PI * v / capVerts);
            Vertices[j + 1] = L;
            Vertices[j + 2] = R * topRadius * Math.sin(Math.PI * v / capVerts);
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