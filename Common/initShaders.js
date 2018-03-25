//
//  initShaders.js
//

'use strict';

function initShaders( gl, vertexShader, fragmentShader )
{
    var vertElem = document.getElementById( vertexShader );
    var vertSrc = vertElem ? vertElem.text : vertexShader;
    
    var vertShdr = gl.createShader( gl.VERTEX_SHADER );
    gl.shaderSource( vertShdr, vertSrc );
    gl.compileShader( vertShdr );
    if ( !gl.getShaderParameter(vertShdr, gl.COMPILE_STATUS) ) {
        var msg = "Vertex shader failed to compile.  The error log is:\n\n"
            + gl.getShaderInfoLog( vertShdr );
        alert( msg );
        return -1;
    }

    var fragElem = document.getElementById( fragmentShader );
    var fragSrc = fragElem ? fragElem.text : fragmentShader;
    
    var fragShdr = gl.createShader( gl.FRAGMENT_SHADER );
    gl.shaderSource( fragShdr, fragSrc );
    gl.compileShader( fragShdr );
    if ( !gl.getShaderParameter(fragShdr, gl.COMPILE_STATUS) ) {
        var msg = "Fragment shader failed to compile.  The error log is:\n\n"
    	   + gl.getShaderInfoLog( fragShdr );
        alert( msg );
        return -1;
    }

    var program = gl.createProgram();
    gl.attachShader( program, vertShdr );
    gl.attachShader( program, fragShdr );
    gl.linkProgram( program );
    
    if ( !gl.getProgramParameter(program, gl.LINK_STATUS) ) {
        var msg = "Shader program failed to link.  The error log is:"
            + "<pre>" + gl.getProgramInfoLog( program ) + "</pre>";
        alert( msg );
        return -1;
    }

    return program;
}
