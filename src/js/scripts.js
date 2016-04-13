"use strict";
import "babel-polyfill";
import {fontData} from "./mz700fon";
import {charCodes,canaCodes} from "./charCodes";

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
uniform sampler2D textureFont;
uniform sampler2D textureCharCode;
uniform sampler2D textureCharAttr;
uniform float time;

varying vec2 vtexture_coord;

// グラフィック表示
vec4 graphicPlane(void)
{
  //テクスチャ座標よりビット位置を求め、そのビットが立った2進数値を得る。
  float t = exp2(floor(mod(vtexture_coord.x * 512.0,8.0)));
  // RGB各プレーンの現在座標のバイトデータを読み込む
  vec4 rt = texture2D(textureR, vtexture_coord);
  vec4 gt = texture2D(textureG, vtexture_coord);
  vec4 bt = texture2D(textureB, vtexture_coord);
  
  // バイトデータの中でビットが立っているかどうかを調べる
  // Rプレーン
  float r = floor(mod(min(rt.x * 256.0,255.0) / t,2.0)) * 4.0;
  // Gプレーン
  float g = floor(mod(min(gt.x * 256.0,255.0) / t,2.0)) * 2.0;
  // Bプレーン
  float b = floor(mod(min(bt.x * 256.0,255.0) / t,2.0));

  // 各色の値を足して正規化を行い、パレットインデックスから実際の色を得る 
  vec4 p = texture2D(pallet_color,vec2((r + g + b) / 8.0 ,0.5));
  float i = min(p.x * 256.0,255.0);
  float ar = floor(mod(i * 0.5,2.0)); // bit3
  float ag = floor(mod(i * 0.25,2.0));  // bit2
  float ab = floor(mod(i,2.0)); // bit1
  return vec4(ar,ag,ab,1.0);
}

// 文字表示
vec4 textPlane(void){
  // キャラクタコードを読み出し
  vec4 cct = texture2D(textureCharCode, vtexture_coord);
  float cc = min(cct.x * 256.0,255.0);// キャラクターコード

  // アトリビュートを読み出し
  vec4 attrt = texture2D(textureCharAttr, vtexture_coord);
  
  // 表示対象の文字のビット位置を求める
  float x = exp2(floor(mod(vtexture_coord.x * 512.0,8.0)));
  // 表示対象の文字のY位置を求める
  float y = floor(mod(vtexture_coord.y * 256.0,8.0));
  
  // アトリビュートの評価 

  float i = min(attrt.x * 256.0,255.0);// アトリビュートデータ
  
  // キャラクタセット(0.0 .. セット0, 1.0 .. セット1 )
  float att = floor(mod(i / 128.0,2.0)) * 8.0;// bit 7

  // 文字色
  float ccg = floor(mod(i / 64.0,2.0));// bit 6
  float ccr = floor(mod(i / 32.0,2.0));// bit 5
  float ccb = floor(mod(i / 16.0,2.0));// bit 4

  // 背景色
  float bgg = floor(mod(i / 4.0,2.0));// bit 2
  float bgr = floor(mod(i / 2.0,2.0));// bit 1
  float bgb = floor(mod(i ,2.0));// bit 0
  

  // フォント読み出し位置
  vec2 fontpos = vec2(cc / 256.0,(y + att) / 16.0);
  // フォントデータの読み出し
  vec4 pixByte = texture2D(textureFont,fontpos);
  // 指定位置のビットが立っているかチェック
  float pixBit = floor(mod(min(pixByte.x * 256.0,255.0) / x,2.0));
  
  if(pixBit == 1.0){
    // ビットが立っているときは、文字色を設定
    return vec4(ccr,ccg,ccb,1.0);
  } 
  // ビットが立っていないときは背景色を設定
  return vec4(bgr,bgg,bgb,1.0);
}

void main(void){
  vec4 textColor = textPlane();
  if((textColor.r + textColor.g + textColor.b) > 0.0){
    gl_FragColor = textColor;  
  } else {
    vec4 color = graphicPlane();
    gl_FragColor = color;
  }
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
  const virtualWidth = 320,virtualHeight = 200;
  const bufferWidth = 512 ,bufferHeight = 256,bufferXSize = bufferWidth / 8;
  const fontTexWidth = 256,fontTexHeight = 16;//8 * 16 * 2;
  const charCodeBufferWidth = 512 / 8,charCodeBufferHeight = 32,consoleWidth = 40,consoleHeight = 25;
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
  var charCodeBuffer = new Uint8Array(charCodeBufferWidth * charCodeBufferHeight),
      charAttrBuffer = new Uint8Array(charCodeBufferWidth * charCodeBufferHeight);
  var fontBuffer = new Uint8Array(fontTexWidth * fontTexHeight);
  
  // ビットのMSBとLSBを入れ替えるメソッド
  function rev(x){
    x = x & 0xff;
    // 0bitと1bit、2bitと3bit、4bitと5bit、6bitと7ビットの反転
    x = ((x & 0x55) << 1) | ((x >>> 1) & 0x55);
    // 0-1bitと2-3bit、4-5bitと6-7bitの反転
    x = ((x & 0x33) << 2) | ((x >>> 2) & 0x33);
    // 0-3bit、4-7bitの反転
    x = ((x & 0x0F) << 4) | ((x >>> 4) & 0x0F);
    return x;
  }
  
  // フォントデータの読み込み
  {
    let idx = 0;
    let offset = 0;
    fontData.forEach((d,i)=>{
      offset = ((i / 256) | 0) * 8; 
      idx = i % 256;
      d.forEach((byteChar,iy)=>{
        let byte = parseInt(byteChar,2);
        fontBuffer[idx + (iy + offset) * 256] = rev(byte);
      });
    });
  }

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
  var prgPTexFont = gl.getUniformLocation(prgP,'textureFont');
  var prgPTexCharCode = gl.getUniformLocation(prgP,'textureCharCode');
  var prgPTexCharAttr = gl.getUniformLocation(prgP,'textureCharAttr');
  var prgPTime = gl.getUniformLocation(prgP,'time');
  
  // 仮想ビットマップテクスチャを作る
  
  function createLuminaceTexture(textureNo,width,height,srcBuffer)
  {
    var texture = gl.createTexture();
    gl.activeTexture(textureNo);
    gl.bindTexture(gl.TEXTURE_2D,texture);
  //	gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.LUMINANCE, width, height, 0, gl.LUMINANCE, 	gl.UNSIGNED_BYTE, srcBuffer);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    return texture;   
  }
  
  function updateLuminanceTexture(textureNo,texture,width,height,srcBuffer)
  {
    gl.activeTexture(textureNo);
    gl.bindTexture(gl.TEXTURE_2D,texture);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.LUMINANCE, width, height, 0, gl.LUMINANCE, 	gl.UNSIGNED_BYTE, srcBuffer);
  }
  
  var textureB = createLuminaceTexture(gl.TEXTURE0,bufferXSize,bufferHeight,bufferB);
  var textureG = createLuminaceTexture(gl.TEXTURE1,bufferXSize,bufferHeight,bufferG);
  var textureR = createLuminaceTexture(gl.TEXTURE2,bufferXSize,bufferHeight,bufferR);
  
	var paletteTexture = createLuminaceTexture(gl.TEXTURE3,palletColors.length,1,palletColors);
	var fontTexture = createLuminaceTexture(gl.TEXTURE4,fontTexWidth,fontTexHeight,fontBuffer);
	var charCodeTexture = createLuminaceTexture(gl.TEXTURE5,charCodeBufferWidth,charCodeBufferHeight,charCodeBuffer);
	var charAttrTexture = createLuminaceTexture(gl.TEXTURE6,charCodeBufferWidth,charCodeBufferHeight,charAttrBuffer);

	gl.uniform1i(prgPTexBPos, 0);
	gl.uniform1i(prgPTexGPos, 1);
	gl.uniform1i(prgPTexRPos, 2);
	gl.uniform1i(prgPPalettPos, 3);
	gl.uniform1i(prgPTexFont, 4);
	gl.uniform1i(prgPTexCharCode, 5);
	gl.uniform1i(prgPTexCharAttr, 6);

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


    updateLuminanceTexture(gl.TEXTURE0,textureB,bufferXSize,bufferHeight,bufferB);
    updateLuminanceTexture(gl.TEXTURE1,textureG,bufferXSize,bufferHeight,bufferG);
    updateLuminanceTexture(gl.TEXTURE2,textureR,bufferXSize,bufferHeight,bufferR);
 
    updateLuminanceTexture(gl.TEXTURE3,paletteTexture,palletColors.length,1,palletColors);

    updateLuminanceTexture(gl.TEXTURE5,charCodeTexture,charCodeBufferWidth,charCodeBufferHeight,charCodeBuffer);
    updateLuminanceTexture(gl.TEXTURE6,charAttrTexture,charCodeBufferWidth,charCodeBufferHeight,charAttrBuffer);

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
  
  // グラフィックのメソッドたち

  function pset(x,y,color){
    var offset = (y * bufferXSize + x / 8) | 0;
    var bitpos = x % 8;

    
    let b = (color & 1) << bitpos;
    let m = ~(1 << bitpos) & 0xff;
    let g = ((color >>> 1) & 1) << bitpos;
    let r = ((color >>> 2) & 1) << bitpos;

    bufferB[offset] = (bufferB[offset] & m) | b;
    bufferG[offset] = (bufferG[offset] & m) | g;
    bufferR[offset] = (bufferR[offset] & m) | r;
  }

  function preset(x,y){
    var offset = (y * bufferXSize + x / 8) | 0;
    var bit = ~(1 << (x % 8));
    bufferB[offset] &= bit;
    bufferG[offset] &= bit;
    bufferR[offset] &= bit;
  }

  function cls(){
    for(var i = 0,e = bufferXSize * bufferHeight;i < e;++i) {
       bufferB[i] = 0;
       bufferG[i] = 0;
       bufferR[i] = 0;
    }
    
    for(var i = 0,e = charCodeBufferWidth * charCodeBufferHeight;i < e;++i){
      charCodeBuffer[i] = 0;
      charAttrBuffer[i] = 0;
    }
  }
  
  // 文字列の表示
  function addPosition(offset,delta)
  {
    offset += delta;
  }
  
  function print(x,y,str,color,bgcolor,hirakana = false){
    let offset = x + y * charCodeBufferWidth;
    for(let i = 0,e = str.length;i < e;++i){
      let code = str.charCodeAt(i);
      if(code >= 0xff60 && code < 0xffa0){
        code -= 0xff60;
        charCodeBuffer[offset] = canaCodes[code][0];
        charAttrBuffer[offset] = (color << 4) | bgcolor | canaCodes[code][1];
        if(hirakana) charAttrBuffer[offset] |= 0x80;
        offset += 1;
      } else if(code < 0x80){
        charCodeBuffer[offset] = charCodes[code][0];
        charAttrBuffer[offset] = (color << 4) | bgcolor | charCodes[code][1];
        if(hirakana) charAttrBuffer[offset] |= 0x80;
        offset += 1;
      } else if(code <= 0xff){
        charCodeBuffer[offset] = code;
        charAttrBuffer[offset] = (color << 4) | bgcolor;
        if(hirakana) charAttrBuffer[offset] |= 0x80;
        offset += 1;
      } else {
        offset += 1;
      }
    }
  }
  
  function printDirect(x,y,str,color,bgcolor,charset = 0){
    let offset = x + y * charCodeBufferWidth;
    for(let i = 0,e = str.length;i < e;++i){
        let code = str.charCodeAt(i);
        charCodeBuffer[offset] = code;
        charAttrBuffer[offset] = (color << 4) | bgcolor;
        charAttrBuffer[offset] |= (charset << 7);
        offset += 1;
    }
  }
  
  
  // メイン
  function run(){
    var gen = (function * (){
      while (true) {
        cls();
        // palletColors.set([0,1,2,3,4,5,6,7]);
        // for (let y = 0; y < virtualHeight; ++y) {
        //   for (let x = 0; x < virtualWidth; ++x) {
        //     if((((y / 8) | 0) & 1) > 0){
        //       if(x % 16 < 8){
        //         pset(x, y, y % 8);
        //       } else {
        //         pset(x, y, x % 8);
        //       }
        //     } else {
        //       if(x % 16 >= 8){
        //         pset(x, y, 7 - y % 8);
        //       } else {
        //         pset(x, y, 7 - x % 8);
        //       }
        //     } 
        //   }
        //   yield;
        // }

        // パレットのスクロール
        // for(let t = 0;t < 128;++t)
        // {
        //   let p = palletColors[0];
        //   for (let i = 0; i < 7; ++i) {
        //     palletColors[i] = palletColors[i + 1];
        //   }
        //   palletColors[7] = p;
        //   yield;
        //   yield;
        // }
        
        // for(let t = 0;t < 640;++t){
        //   for(let u = 0;u < 128;++u){
        //     pset(Math.random() * 320,Math.random() * 240,Math.random() * 8);
        //   }
        //   yield;
        // }
        // //パレットのスクロール
        // for(let t = 0;t < 128;++t)
        // {
        //   for (let i = 0; i < 8; ++i) {
        //     palletColors[i] = 0;
        //   }

        //   palletColors[t % 7 + 1] = t % 7 + 1;

        //   for(let i = 0;i < 4;++i){
        //     yield;
        //   }
        // }
        // {
        //   for(let color = 0;color < 8;++color){
        //     let i = 0x0;
        //     for(let y = 0;y < 16;++y){
        //       for(let x = 0;x < 16;++x){
        //         charCodeBuffer[x + y * charCodeBufferWidth] = i % 256;
        //         charAttrBuffer[x + y * charCodeBufferWidth] = color << 4 | (7 - color);
        //         charCodeBuffer[x + 16 + y * charCodeBufferWidth] = i % 256;
        //         charAttrBuffer[x + 16 + y * charCodeBufferWidth] = 0x80 | color << 4 | (7-color);
        //         ++i;
        //       }
        //       yield;
        //     }
        //   }
        // }
        
        // yield;
        // for(let i = 256;i < 512;++i){
        //   charCodeBuffer[(i / 40 * 64) | 0 + i % 40] = i - 256;
        //   charAttrBuffer[(i / 40 * 64) | 0 + i % 40] =0x17;
        // }
        // yield;
        // for(let i = 512;i < 768;++i){
        //   charCodeBuffer[(i / 40 * 64) | 0 + i % 40] = i - 512;
        //   charAttrBuffer[(i / 40 * 64) | 0 + i % 40] =0xf1;
        // }
        // yield;
        let mes =  'MZ-700ﾌｫﾝﾄｦﾋｮｳｼﾞﾃﾞﾓ';
        let mes1 = '                   ';
        
        for(let i = 0;i < 5;++i){
          print(20 - (mes.length / 2) | 0,10,mes,7,0);
          for(let j = 0;j < 16;++j){
            yield;
          }
          print(20 - (mes1.length / 2) | 0,10,mes1,7,0);
          for(let j = 0;j < 16;++j){
            yield;
          }
        }
        {
          let i = 0;
          let xs = 0, xe = 40 ,ys = 0,ye = 25;
          let x = 0 , y = 0, c = 0;
          while(true){
            for(x = xs; x < xe; ++x){
              printDirect(x,y,String.fromCharCode(i % 256),c % 8,7 - c % 8,i > 255?1:0);
              ++i;
              i = i % 512;
              yield;
            }
            ++c;
            --x;
            ++ys;
            if((xs >= xe) || (ys >= ye)) break;
            for(y = ys; y < ye; ++y){
              printDirect(x,y,String.fromCharCode(i % 256),c % 8,7 - c % 8,i > 255?1:0);
              ++i;
              i = i % 512;
              yield;
            }
            ++c;
            --y;
            --xe;
            if((xs >= xe) || (ys >= ye)) break;
            for(x = xe - 1; x >= xs ; --x){
              printDirect(x,y,String.fromCharCode(i % 256),c % 8,7 - c % 8,i > 255?1:0);
              ++i;
              i = i % 512;
              yield;
            }
            ++c;
            --ye;
            ++x;
            if((xs >= xe) || (ys >= ye)) break;
            for(y = ye - 1; y >= ys;--y){
              printDirect(x,y,String.fromCharCode(i % 256),c % 8,7 - c % 8,i > 255?1:0);
              ++i;
              i = i % 512;
              yield;
            }
            ++c;
            ++y;
            ++xs;
            if((xs >= xe) || (ys >= ye)) break;
          }
          
        }
        for(let j = 0;j < 64;++j){
          yield;
        }
        cls();
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
