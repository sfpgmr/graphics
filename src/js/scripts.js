"use strict";


window.addEventListener('load',()=>{
  // コンソールの作成
  var view = document.getElementById('view');
  var viewCtx;
  var width,height;
  const bufferWidth = 320,bufferHeight = 240;
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
  function resize(){
    var cont = document.getElementById('content');
    if(cont.offsetWidth > 700){
      view.width = 640;
      view.height = 480;
    } else {
      view.width = 320;
      view.height = 240; 
    }
    width = view.offsetWidth;
    height = view.offsetHeight;
    viewCtx = view.getContext("2d");
    // viewCtx.mozImageSmoothingEnabled = false;
    // viewCtx.webkitImageSmoothingEnabled = false;
    // viewCtx.msImageSmoothingEnabled = false;    
    // viewCtx.imageSmoothingEnabled = false;
    viewCtx.fillStyle = "rgb(0, 0, 0)";
    viewCtx.fillRect(0,0,width,height);
  }
  resize();
  window.addEventListener('resize',resize);
  
  // バッファーのセットアップ
  var bufferCanvas = document.getElementById('buffer');
  var bufferCtx = bufferCanvas.getContext("2d");
  var buffer = bufferCtx.createImageData(bufferWidth,bufferHeight);
  var bufferData = buffer.data;
  
  // レンダリング
  function render(){
    requestAnimationFrame(render);
    if(status == STATUS.run){
      bufferCtx.putImageData(buffer,0,0);
      viewCtx.fillStyle = "rgb(0, 0, 0)";
      viewCtx.fillRect(0,0,width,height);
      viewCtx.drawImage(bufferCanvas,0,0,width,height);
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
    var offset = (y * bufferWidth + x) * 4;
    bufferData[offset] = color.r;
    bufferData[offset + 1]  = color.g;
    bufferData[offset + 2] = color.b;
    bufferData[offset + 3] = color.a; 
  }

  function preset(x,y){
    var offset = (y * bufferWidth + x) * 4;
    bufferData[offset] = 0;
    bufferData[offset + 1]  = 0;
    bufferData[offset + 2] = 0;
    bufferData[offset + 3] = 0; 
  }

  function cls(){
    for(var i = 0,e = bufferWidth * bufferHeight * 4;i < e;++i)
    {
      bufferData[i] = 0;
    }
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
