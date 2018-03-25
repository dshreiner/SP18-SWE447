
'use strict';

function DrawArray( gl, primType, numComponents, positions, vertexShader, fragmentShader ) {

    // Initialize the shader pipeline for this object using either shader ids
    //   declared in the application's HTML header, or a default shader.
    var vertShdr = vertexShader || `
    attribute vec4 vPosition;

    uniform mat4 P;
    uniform mat4 MV;

    void main() { 
        gl_PointSize = 1.0;
        gl_Position = vPosition;
    }
    `;

    var fragShdr = fragmentShader || `
    precision highp float;

    uniform vec4 color;

    void main() {
        gl_FragColor = color;
    }
    `;

    this.program = initShaders(gl, vertShdr, fragShdr);

    if ( this.program < 0 ) {
        alert( "Error: Quad shader pipeline failed to compile.\n\n" +
            "\tvertex shader id:  \t" + vertShdr + "\n" +
            "\tfragment shader id:\t" + fragShdr + "\n" );
        return; 
    }

    var buffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, buffer );
    gl.bufferData( gl.ARRAY_BUFFER, new Float32Array(positions), 
        gl.STATIC_DRAW );

    var attributeLoc = gl.getAttribLocation( this.program, "vPosition" );

    gl.useProgram( this.program );
    gl.uniformMatrix4fv( gl.getUniformLocation( this.program, "P" ),
        false, flatten(mat4()) );
    gl.uniformMatrix4fv( gl.getUniformLocation( this.program, "MV" ),
        false, flatten(mat4()) );
    gl.uniform4fv( gl.getUniformLocation( this.program, "color"),
        [ 1.0, 1.0, 1.0, 1.0 ]);

    this.render = function () {
        gl.useProgram( this.program );

        var count = positions.length / numComponents;

        gl.bindBuffer( gl.ARRAY_BUFFER, buffer );
        gl.enableVertexAttribArray( attributeLoc );
        gl.vertexAttribPointer( attributeLoc, numComponents, 
            gl.FLOAT, gl.FALSE, 0, 0 );

        gl.drawArrays( primType, 0, count );
    };
};
