"use strict";
import "babel-polyfill";

// フレームバッファに書き込むシェーダー
// var vshaderFSrc = 
// `precision mediump float;
// attribute vec2 position;
// attribute float color;
// uniform vec2 bufferSize;
// varying float vcolor;
 
// void main(void) {
//     vec2 bs = bufferSize - bufferSize /  2.0;
//     bs.y = -bs.y;
//     gl_Position = vec4(position / bs, 0.0,1.0);
//     vcolor = color;
// }
// `;

// var fshaderFSrc = 
// `precision mediump float;
// varying float vcolor;
// void main(void){
//  gl_FragColor = vec4(vcolor, 0. , 0. , 1.);
// }
// `;

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

uniform sampler2D textureB;
uniform sampler2D textureG;
uniform sampler2D textureR;
uniform sampler2D pallet_color;

varying vec2 vtexture_coord;


void main(void){
 // テクスチャ座標よりビット位置を求め、そのビットが立った2進数値を得る。
 float t = exp2(floor(mod(vtexture_coord.x * 512.0,8.0)));

 // RGB各プレーンの現在座標のバイトデータを読み込む
 vec4 rt = texture2D(textureR, vtexture_coord);
 vec4 gt = texture2D(textureG, vtexture_coord);
 vec4 bt = texture2D(textureB, vtexture_coord);
 
 // バイトデータの中でビットが立っているかどうかを調べる
 // Rプレーン
 float r = floor(mod(rt.x * 256.0 / t,2.0)) * 4.0;
 // Gプレーン
 float g = floor(mod(gt.x * 256.0 / t,2.0)) * 2.0;
 // Bプレーン
 float b = floor(mod(bt.x * 256.0 / t,2.0));

 // 各色の値を足して正規化を行い、パレットインデックスから実際の色を得る 
 vec4 p = texture2D(pallet_color,vec2((r + g + b) / 8.0 ,0.5));
 float ar = floor(mod(p.x * 256.0 / 4.0,2.0));
 float ag = floor(mod(p.x * 256.0 / 2.0,2.0));
 float ab = floor(mod(p.x * 256.0,2.0));
 
 gl_FragColor = vec4(ar,ag,ab,1.0);
}
`;
// `precision mediump float;

// uniform sampler2D tex;
// uniform sampler2D pallet_color;

// varying vec2 vtexture_coord;

// void main(void){
//  vec4 sampcolor = texture2D(tex, vtexture_coord);
//  vec4 color = texture2D(pallet_color,vec2(sampcolor.x * 32.0,0.5));
//  gl_FragColor = color;
// }
// `;


window.addEventListener('load',()=>{
  // コンソールの作成
  var view = document.getElementById('view');
  var gl;
  var width,height;
  const virtualWidth = 320,virtualHeight = 240;
  const bufferWidth = 512 ,bufferHeight = 256,bufferXSize = bufferWidth / 8;
  var runBtn = document.getElementById('run'),
      pauseBtn = document.getElementById('pause'),
      stopBtn = document.getElementById('stop');
//      resetBtn = document.getElementById('reset');
	var bufferB = new Uint8Array(bufferXSize * bufferHeight),
  bufferG = new Uint8Array(bufferXSize * bufferHeight),
  bufferR = new Uint8Array(bufferXSize * bufferHeight),
  palletColors = new Uint8Array([
    0,1,2,3,4,5,6,7    
  ]);
		// palletColors = new Uint8Array([
    //     0,  0,  0,255,
    //     0,  0,255,255,
    //     0,255,  0,255,
    //     0,255,255,255,
    //   255,  0,  0,255,
    //   255,  0,255,255,
    //   255,255,  0,255,
    //   255,255,255,255
    // ]);


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
  gl = view.getContext('webgl',{antialias:false}) || view.getContext('experimental-webgl',{antialias:false});

  
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
  
  // VBOをバインドし登録する関数
  function setAttribute(vbo, attL, attS){
      for(let i in vbo){
          gl.bindBuffer(gl.ARRAY_BUFFER, vbo[i]);
          gl.enableVertexAttribArray(attL[i]);
          gl.vertexAttribPointer(attL[i], attS[i], gl.FLOAT, false, 0, 0);
      }
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
	 	virtualWidth / bufferWidth , 0.0,
	 	0.0, virtualHeight / bufferHeight,
	 	virtualWidth / bufferWidth, virtualHeight / bufferHeight
	 ];
  
	// var texCoord = [
	// 	0.0, 0.0,
	// 	1.0 , 0.0,
	// 	0.0, 1.0,
	// 	1.0,1.0
	// ];  
	var index = [
		0, 2, 1,
		2, 3, 1
	];
  
	var vPosition = createVbo(position);
	var vTexCoord = createVbo(texCoord);
	var iIndex    = createIbo(index);
   
  // canvasを黒でクリア(初期化)する
  gl.clearColor(0.0, 0.0, 0.0, 1.0);
  gl.viewport(0,0,virtualWidth,virtualHeight);
  gl.clearDepth(1.0);
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

  let vsP = createShader(vshaderPSrc,gl.VERTEX_SHADER);
  let fsP = createShader(fshaderPSrc,gl.FRAGMENT_SHADER);
  
  let prgP = createProgram(vsP,fsP);
  
  let prgPPos = gl.getAttribLocation(prgP,'position');
  let prgPTexCoord = gl.getAttribLocation(prgP,'texture_coord');
  
  let attStride = 4;
  
  setAttribute([vPosition,vTexCoord],[prgPPos,prgPTexCoord],[2,2]);
  //setAttribute([vPosition],[prgPPos],[2]);
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER,iIndex);
  
  var prgPTexBPos = gl.getUniformLocation(prgP,'textureB');
  var prgPTexGPos = gl.getUniformLocation(prgP,'textureG');
  var prgPTexRPos = gl.getUniformLocation(prgP,'textureR');
  var prgPPalettPos = gl.getUniformLocation(prgP,'pallet_color');
  
  // 仮想ビットマップテクスチャを作る
  var textureB = gl.createTexture();
  gl.activeTexture(gl.TEXTURE0);
  gl.bindTexture(gl.TEXTURE_2D,textureB);
//	gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.LUMINANCE, bufferXSize, bufferHeight, 0, gl.LUMINANCE, 	gl.UNSIGNED_BYTE, bufferB);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  
  var textureG = gl.createTexture();
  gl.activeTexture(gl.TEXTURE1);
  gl.bindTexture(gl.TEXTURE_2D,textureG);
//	gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.LUMINANCE, bufferXSize, bufferHeight, 0, gl.LUMINANCE, 	gl.UNSIGNED_BYTE, bufferG);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

  var textureR = gl.createTexture();
  gl.activeTexture(gl.TEXTURE2);
  gl.bindTexture(gl.TEXTURE_2D,textureR);
//	gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.LUMINANCE, bufferXSize, bufferHeight, 0, gl.LUMINANCE, 	gl.UNSIGNED_BYTE, bufferR);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  
	var paletteTexture = gl.createTexture();
	gl.activeTexture(gl.TEXTURE3);
	gl.bindTexture(gl.TEXTURE_2D, paletteTexture);
	gl.texImage2D(gl.TEXTURE_2D, 0, gl.LUMINANCE, palletColors.length , 1, 0, gl.LUMINANCE,gl.UNSIGNED_BYTE, palletColors);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  
	gl.uniform1i(prgPTexBPos, 0);
	gl.uniform1i(prgPTexGPos, 1);
	gl.uniform1i(prgPTexRPos, 2);
	gl.uniform1i(prgPPalettPos, 3);
  

  
  function resize(){
    var cont = document.getElementById('content');
    if(cont.offsetWidth > 700){
      view.width = virtualWidth * 2;//cont.offsetWidth;
      view.height = virtualHeight * 2;//cont.offsetWidth * 3 / 4;
    } else {
      view.width = virtualWidth;
      view.height = virtualHeight;
    }
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
		gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

  	gl.activeTexture(gl.TEXTURE3);
  	gl.bindTexture(gl.TEXTURE_2D, paletteTexture);
  	gl.texImage2D(gl.TEXTURE_2D, 0, gl.LUMINANCE, palletColors.length, 1, 0,gl.LUMINANCE,gl.UNSIGNED_BYTE, palletColors);

  	gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D,textureB);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.LUMINANCE, bufferXSize, bufferHeight, 0, gl.LUMINANCE, 	gl.UNSIGNED_BYTE, bufferB);
    
  	gl.activeTexture(gl.TEXTURE1);
    gl.bindTexture(gl.TEXTURE_2D,textureG);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.LUMINANCE, bufferXSize, bufferHeight, 0, gl.LUMINANCE, 	gl.UNSIGNED_BYTE, bufferG);

  	gl.activeTexture(gl.TEXTURE2);
    gl.bindTexture(gl.TEXTURE_2D,textureR);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.LUMINANCE, bufferXSize, bufferHeight, 0, gl.LUMINANCE, 	gl.UNSIGNED_BYTE, bufferR);
    
    gl.drawElements(gl.TRIANGLES, index.length, gl.UNSIGNED_SHORT, 0);
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
    var offset = (y * bufferXSize + x / 8) | 0;
    var bitpos = x % 8;
    bufferB[offset] |= (color & 1) << bitpos;
    bufferG[offset] |= ((color >> 1) & 1) << bitpos;
    bufferR[offset] |= ((color >> 2) & 1) << bitpos;
  }

  function preset(x,y){
    var offset = (y * bufferXSize + x / 8) | 0;
    var bit = ~(1 << (x % 8));
    bufferB[offset] &= bit;
    bufferG[offset] &= bit;
    bufferR[offset] &= bit;
  }

  function cls(){
    for(var i = 0,e = bufferXSize * bufferHeight;i < e;++i)
    {
       bufferB[i] = 0;
       bufferG[i] = 0;
       bufferR[i] = 0;
    }
  }
  
  // メイン
  function run(){
    var gen = (function * (){
      cls();
      // color 0-7 で縞模様に塗りつぶす
      for(let i = 0,y = 0,ey =  bufferHeight;y < ey;++y){
        for(let x = 0,ex =  bufferXSize;x < ex;++x){
          if(x >= virtualWidth / 8 || y >= virtualHeight){
            bufferR[i] = 0xff;
            bufferG[i] = 0xff;
            bufferB[i] = 0xff;
          } else {
            bufferR[i] = 0xcc;
            bufferG[i] = 0xcc;
            bufferB[i] = 0xcc;
          }
          ++i;
        }
      }

      
      yield;

      while(true){

        //パレットのスクロール
        let p = palletColors[0];
        for(let i = 0;i < 7;++i){
          palletColors[i] = palletColors[i+1];
        }
        palletColors[7] = p; 

        // ウェイト
        for(let y = 0;y < 16;++y){
          yield;
        }
      }
      // updateStatus(STATUS.stop);
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
