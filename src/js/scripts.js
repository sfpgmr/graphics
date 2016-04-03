"use strict";
import "babel-polyfill";

// フレームバッファに書き込むシェーダー
var vshaderFSrc = 
`precision mediump float;
attribute vec2 position;
attribute float color;
uniform vec2 bufferSize;
varying float vcolor;
 
void main(void) {
    vec2 bs = bufferSize - bufferSize /  2.0;
    bs.y = -bs.y;
    gl_Position = vec4(position / bs, 0.0,1.0);
    vcolor = color;
}
`;

var fshaderFSrc = 
`precision mediump float;
varying float vcolor;
void main(void){
 gl_FragColor = vec4(vcolor, 0. , 0. , 1.);
}
`;

// パレットエミュレートシェーダー
var vshaderPSrc = 
`precision mediump float;
attribute vec2 position;
attribute vec2 texture_coord;
varying vec2 vtexture_coord;
 
void main(void) {
    gl_Position = vec4(position,0.0,1.0);
    vtexture_coord = texture_coord;
}
`;

var fshaderPSrc = 
`precision mediump float;

uniform sampler2D texture;
uniform vec4 palette_color[8];

varying vec2 vtexture_coord;

void main(void){
 vec4 sampcolor = texture2D(texture, vtexture_coord);
 int index = int(sampcolor.r);
 gl_FragColor = palette_color[index];
}
`;


window.addEventListener('load',()=>{
  // コンソールの作成
  var view = document.getElementById('view');
  var gl;
  var width,height;
  const virtualWidth = 320,virtualHeight = 240;
  var runBtn = document.getElementById('run'),
      pauseBtn = document.getElementById('pause'),
      stopBtn = document.getElementById('stop');
//      resetBtn = document.getElementById('reset');
  var main;
      
  runBtn.disabled = "disabled";
  pauseBtn.disabled = "disabled";
  stopBtn.disabled = "disabled";
//  resetBtn.disabled = "disabled";

  const STATUS = {
    stop:0,
    run:1,
    pause:2,
    reset:3
  };

  var status = STATUS.stop;
      
  // con.width = con.offsetWidth;
  // con.height = (con.offsetWidth * 3 / 4) | 0 ;
  gl = view.getContext('webgl') || view.getContext('experimental-webgl');

  
  // シェーダの作成
  function createShader(src,shaderType){
    let shader;
    shader = gl.createShader(shaderType);
    gl.shaderSource(shader,src);
    gl.compileShader(shader);
    if(!gl.getShaderParameter(shader, gl.COMPILE_STATUS)){
        throw new Error(gl.getShaderInfoLog(shader));
    }
    return shader;
  }
  
  // プログラムオブジェクトの作成
  function createProgram(vs,fs){
    // プログラムオブジェクトの生成
    var program = gl.createProgram();
    
    // プログラムオブジェクトにシェーダを割り当てる
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    
    // シェーダをリンク
    gl.linkProgram(program);
    
    // シェーダのリンクが正しく行なわれたかチェック
    if(!gl.getProgramParameter(program, gl.LINK_STATUS)){
        throw new Error(gl.getProgramInfoLog(program));
    }    
    gl.useProgram(program);
    return program;
  }
  
  //VBOの作成
  function createVbo(data){
    var vbo = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vbo);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(data), gl.STATIC_DRAW);
    gl.bindBuffer(gl.ARRAY_BUFFER, null);
    return vbo;
  }
  
  
  // フレームバッファをオブジェクトとして生成する関数
  function createFramebuffer(width, height){
    var frameBuffer = gl.createFramebuffer();
    
    gl.bindFramebuffer(gl.FRAMEBUFFER, frameBuffer);
    
    var depthRenderBuffer = gl.createRenderbuffer();
    gl.bindRenderbuffer(gl.RENDERBUFFER, depthRenderBuffer);
    gl.renderbufferStorage(gl.RENDERBUFFER, gl.DEPTH_COMPONENT16, width, height);
    gl.framebufferRenderbuffer(gl.FRAMEBUFFER, gl.DEPTH_ATTACHMENT, gl.RENDERBUFFER, depthRenderBuffer);
    
    var fTexture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, fTexture);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, width, height, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, fTexture, 0);
    
    gl.bindTexture(gl.TEXTURE_2D, null);
    gl.bindRenderbuffer(gl.RENDERBUFFER, null);
    gl.bindFramebuffer(gl.FRAMEBUFFER, null);
    
    return {f : frameBuffer, d : depthRenderBuffer, t : fTexture};
  }
  
	// IBOを生成する関数
	function createIbo(data){
		var ibo = gl.createBuffer();
		
		gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, ibo);
		gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Int16Array(data), gl.STATIC_DRAW);
		gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
		return ibo;
	}  
  
 	// 板ポリゴン
	var position = [
		-1.0,  1.0,
		 1.0,  1.0,
		-1.0, -1.0,
		 1.0, -1.0
	];
	var texCoord = [
		0.0, 0.0,
		1.0, 0.0,
		0.0, 1.0,
		1.0, 1.0
	];
	var index = [
		0, 2, 1,
		2, 3, 1
	];
	var vPosition = createVbo(position);
	var vTexCoord = createVbo(texCoord);
	var vVBOList  = [vPosition, vTexCoord];
	var vIndex    = createIbo(index);
   
  // canvasを黒でクリア(初期化)する
  gl.clearColor(0.0, 0.0, 0.0, 1.0);
  gl.viewport(0,0,virtualWidth,virtualHeight);
  gl.clearDepth(1.0);
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

  // フレームバッファーに書き込むシェーダー・プログラムの作成
  let vsF = createShader(vshaderFSrc,gl.VERTEX_SHADER);
  let fsF = createShader(fshaderFSrc,gl.FRAGMENT_SHADER);
  
  let prgF = createProgram(vsF,fsF);
  
  let prgFPos = gl.getAttribLocation(prgF,'position');
  let prgFColor = gl.getAttribLocation(prgF,'color');
  
  let attStride = 1;
  
  let vertexPos = [
    160.0,100.0
  ];
  
  let color = [
    7.0
  ];
  
  
  let vbo = createVbo(vertexPos);
  let vboColor = createVbo(color);
  
  gl.bindBuffer(gl.ARRAY_BUFFER,vbo);
  gl.enableVertexAttribArray(prgFPos);
  gl.vertexAttribPointer(prgFPos, attStride, gl.FLOAT, false, 0, 0);

  gl.bindBuffer(gl.ARRAY_BUFFER,vboColor);
  gl.enableVertexAttribArray(prgFColor);
  gl.vertexAttribPointer(prgFColor, attStride, gl.FLOAT, false, 0, 0);
  
  function resize(){
    var cont = document.getElementById('content');
    view.width = cont.offsetWidth;
    view.height = cont.offsetWidth * 3 / 4;
    width = view.offsetWidth;
    height = view.offsetHeight;
    
    gl.viewport(0,0,width,height);

    
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);
    
  }
  resize();
  window.addEventListener('resize',resize);

  // レンダリング
  function render(){
    requestAnimationFrame(render);
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.drawArrays(gl.TRIANGLES, 0, 3);
    gl.flush(); 
    if(status == STATUS.run){
      main && main();
    }
  }
  
  function updateStatus(s){
    status = s;
    switch(s){
      case STATUS.stop:
        runBtn.disabled = "";
        pauseBtn.disabled = "disabled";
        stopBtn.disabled = "disabled";
        break;
      case STATUS.run:
        runBtn.disabled = "disabled";
        pauseBtn.disabled = "";
        stopBtn.disabled = "";
        break;
      case STATUS.pause:
        runBtn.disabled = "disabled";
        pauseBtn.disabled = "";
        stopBtn.disabled = "";
        break;
    }
  }

  function pset(x,y,color){
    // var offset = (y * virtualWidth + x) * 4;
    // bufferData[offset] = color.r;
    // bufferData[offset + 1]  = color.g;
    // bufferData[offset + 2] = color.b;
    // bufferData[offset + 3] = color.a; 
  }

  function preset(x,y){
    // var offset = (y * virtualWidth + x) * 4;
    // bufferData[offset] = 0;
    // bufferData[offset + 1]  = 0;
    // bufferData[offset + 2] = 0;
    // bufferData[offset + 3] = 0; 
  }

  function cls(){
    // for(var i = 0,e = virtualWidth * virtualHeight * 4;i < e;++i)
    // {
    //   bufferData[i] = 0;
    // }
  }
  
  function run(){
    var gen = (function * (){
      cls();
      var  i = 0;
      let r,g,b;
      for(let y = 0; y < 240;++y){
        for(let x = 0; x < 320;++x){
          i+=1;
          r = (i >> 8) & 0xff, 
          g = (i >> 4 ) & 0xff,
          b = i & 0xff;
          pset(x,y,{r:r,g:g,b:b,a:255})
        }
        yield;
      }
      updateStatus(STATUS.stop);
    })();  
    main = gen.next.bind(gen);
  }

  runBtn.addEventListener('click',()=>{
    updateStatus(STATUS.run);
    run();
  });
  
  pauseBtn.addEventListener('click',()=>{
    if(status == STATUS.pause){
      updateStatus(STATUS.run);
    } else {
      updateStatus(STATUS.pause);
    }
  });

  stopBtn.addEventListener('click',()=>{
    updateStatus(STATUS.stop);
  });

  // resetBtn.addEventListener('click',()=>{
  //   updateStatus(STATUS.reset);
  // });

  updateStatus(STATUS.stop);
  render();
});
