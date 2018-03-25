
'use strict';

function FullScreenQuad( gl, vertexShaderId, fragmentShaderId ) {

    // Initialize the shader pipeline for this object using either shader ids
    //   declared in the application's HTML header, or use the default names.
    //
    var vertShdr = vertexShaderId || `
    attribute vec4 vPosition;
    attribute vec2 vTexCoord;

    varying vec2 fTexCoord;

    void main() {
        fTexCoord = 0.5 * (vPosition.xy + vec2(1));
        gl_Position = vPosition;
    }
    `;
    var fragShdr = fragmentShaderId || `
    precision highp float;

    varying vec2 fTexCoord;

    uniform sampler2D texture;

    void main() {
        gl_FragColor = texture2D( texture, fTexCoord );
    }
    `;

    this.program = initShaders( gl, vertShdr, fragShdr );

    if ( this.program < 0 ) {
        alert( "Error: Quad shader pipeline failed to compile.\n\n" +
            "\tvertex shader id:  \t" + vertShdr + "\n" +
            "\tfragment shader id:\t" + fragShdr + "\n" );
        return; 
    }

    var numComponents = 2;
    
    var attributes = [
        -1,  1,
        -1, -1,
         1,  1,
         1, -1,   
    ];

    // var attributes = [
    //     -1, 1,
    //     -1, -3,
    //      3, 1
    // ];

    var count = attributes.length / numComponents; 

    var buffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, buffer );
    gl.bufferData( gl.ARRAY_BUFFER, new Float32Array(attributes), 
        gl.STATIC_DRAW );

    var attributeLoc = gl.getAttribLocation( this.program, "vPosition" );
 
    // var offset = numComponents * 4 /* sizeof(float) in bytes */;
    // attributeLoc = gl.getAttribLocation( this.program, "vTexCoord" );
    // gl.enableVertexAttribArray( attributeLoc );
    // gl.vertexAttribPointer( attributeLoc, numComponents, 
    //    gl.FLOAT, gl.FALSE, stride, offset );

    this.render = function () {
        gl.useProgram( this.program );

        gl.bindBuffer( gl.ARRAY_BUFFER, buffer );
        gl.enableVertexAttribArray( attributeLoc );
        gl.vertexAttribPointer( attributeLoc, numComponents, 
            gl.FLOAT, gl.FALSE, 0, 0 );

        gl.drawArrays( gl.TRIANGLE_STRIP, 0, count );
    };
};
