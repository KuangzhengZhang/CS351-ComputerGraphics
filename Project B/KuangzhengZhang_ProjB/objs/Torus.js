function defTorus() {
    let rbend = 1.0;										// Radius of circle formed by torus' bent bar
    let rbar = 0.5;											// radius of the bar we bent to form torus
    let barSlices = 23;									// # of bar-segments in the torus: >=3 req'd;
    // more segments for more-circular torus
    let barSides = 13;										// # of sides of the bar (and thus the 
    // number of vertices in its cross-section)
    // >=3 req'd;
    // more sides for more-circular cross-section
    // for nice-looking torus with approx square facets, 
    //			--choose odd or prime#  for barSides, and
    //			--choose pdd or prime# for barSlices of approx. barSides *(rbend/rbar)
    // EXAMPLE: rbend = 1, rbar = 0.5, barSlices =23, barSides = 11.

    // Create a (global) array to hold this torus's vertices:
    let Torus_Vertices = new Float32Array(floatsPerVertex * (2 * barSides * barSlices + 2));
    //	Each slice requires 2*barSides vertices, but 1st slice will skip its first 
    // triangle and last slice will skip its last triangle. To 'close' the torus,
    // repeat the first 2 vertices at the end of the triangle-strip.  Assume 7

    let phi = 0, theta = 0;										// begin torus at angles 0,0
    let thetaStep = 2 * Math.PI / barSlices;	// theta angle between each bar segment
    let phiHalfStep = Math.PI / barSides;		// half-phi angle between each side of bar
    // (WHY HALF? 2 vertices per step in phi)
    // s counts slices of the bar; v counts vertices within one slice; j counts
    // array elements (Float32) (vertices*#attribs/vertex) put in torVerts array.
    for (s = 0, j = 0; s < barSlices; s++) {		// for each 'slice' or 'ring' of the torus:
        for (v = 0; v < 2 * barSides; v++, j += 7) {		// for each vertex in this slice:
            if (v % 2 == 0) {	// even #'d vertices at bottom of slice,
                Torus_Vertices[j] = (rbend + rbar * Math.cos((v) * phiHalfStep)) *
                    Math.cos((s) * thetaStep);
                //	x = (rbend + rbar*cos(phi)) * cos(theta)
                Torus_Vertices[j + 1] = (rbend + rbar * Math.cos((v) * phiHalfStep)) *
                    Math.sin((s) * thetaStep);
                //  y = (rbend + rbar*cos(phi)) * sin(theta) 
                Torus_Vertices[j + 2] = -rbar * Math.sin((v) * phiHalfStep);
                //  z = -rbar  *   sin(phi)
                Torus_Vertices[j + 3] = 1.0;		// w
            }
            else {				// odd #'d vertices at top of slice (s+1);
                // at same phi used at bottom of slice (v-1)
                Torus_Vertices[j] = (rbend + rbar * Math.cos((v - 1) * phiHalfStep)) *
                    Math.cos((s + 1) * thetaStep);
                //	x = (rbend + rbar*cos(phi)) * cos(theta)
                Torus_Vertices[j + 1] = (rbend + rbar * Math.cos((v - 1) * phiHalfStep)) *
                    Math.sin((s + 1) * thetaStep);
                //  y = (rbend + rbar*cos(phi)) * sin(theta) 
                Torus_Vertices[j + 2] = -rbar * Math.sin((v - 1) * phiHalfStep);
                //  z = -rbar  *   sin(phi)
                Torus_Vertices[j + 3] = 1.0;		// w
            }
            Torus_Vertices[j + 4] = Math.random();		// random color 0.0 <= R < 1.0
            Torus_Vertices[j + 5] = Math.random();		// random color 0.0 <= G < 1.0
            Torus_Vertices[j + 6] = Math.random();		// random color 0.0 <= B < 1.0
        }
    }
    // Repeat the 1st 2 vertices of the triangle strip to complete the torus:
    Torus_Vertices[j] = rbend + rbar;	// copy vertex zero;
    //	x = (rbend + rbar*cos(phi==0)) * cos(theta==0)
    Torus_Vertices[j + 1] = 0.0;
    //  y = (rbend + rbar*cos(phi==0)) * sin(theta==0) 
    Torus_Vertices[j + 2] = 0.0;
    //  z = -rbar  *   sin(phi==0)
    Torus_Vertices[j + 3] = 1.0;		// w
    Torus_Vertices[j + 4] = Math.random();		// random color 0.0 <= R < 1.0
    Torus_Vertices[j + 5] = Math.random();		// random color 0.0 <= G < 1.0
    Torus_Vertices[j + 6] = Math.random();		// random color 0.0 <= B < 1.0
    j += 7; // go to next vertex:
    Torus_Vertices[j] = (rbend + rbar) * Math.cos(thetaStep);
    //	x = (rbend + rbar*cos(phi==0)) * cos(theta==thetaStep)
    Torus_Vertices[j + 1] = (rbend + rbar) * Math.sin(thetaStep);
    //  y = (rbend + rbar*cos(phi==0)) * sin(theta==thetaStep) 
    Torus_Vertices[j + 2] = 0.0;
    //  z = -rbar  *   sin(phi==0)
    Torus_Vertices[j + 3] = 1.0;		// w
    Torus_Vertices[j + 4] = Math.random();		// random color 0.0 <= R < 1.0
    Torus_Vertices[j + 5] = Math.random();		// random color 0.0 <= G < 1.0
    Torus_Vertices[j + 6] = Math.random();		// random color 0.0 <= B < 1.0

    updateInfo('Torus', 'Body', Torus_Vertices);
}

function drawTorus(interval, modelMatrix, u_ModelMatrix, colorMatrix, u_ColorMatrix) {
    modelMatrix.translate(-2, 0, -2);
    modelMatrix.scale(config.Torus.Size, config.Torus.Size, config.Torus.Size);
    rotate(interval, 'Torus', 'Body', reciprocate = false);
    modelMatrix.rotate(config.Torus.Body.angle, 0, 1, 1);
    gl.uniformMatrix4fv(u_ModelMatrix, false, modelMatrix.elements);
    gl.drawArrays(gl.TRIANGLE_STRIP, Info.Torus.Body.position, Info.Torus.Body.n);
}