"use strict";
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
        // let mes =  'MZ-700ﾌｫﾝﾄｦﾋｮｳｼﾞﾃﾞﾓ';
        // let mes1 = '                   ';
        
        // for(let i = 0;i < 5;++i){
        //   print(20 - (mes.length / 2) | 0,10,mes,7,0);
        //   for(let j = 0;j < 16;++j){
        //     yield;
        //   }
        //   print(20 - (mes1.length / 2) | 0,10,mes1,7,0);
        //   for(let j = 0;j < 16;++j){
        //     yield;
        //   }
        // }
        // {
        //   let i = 0;
        //   let xs = 0, xe = 40 ,ys = 0,ye = 25;
        //   let x = 0 , y = 0, c = 0;
        //   while(true){
        //     for(x = xs; x < xe; ++x){
        //       printDirect(x,y,String.fromCharCode(i % 256),c % 8,7 - c % 8,i > 255?1:0);
        //       ++i;
        //       i = i % 512;
        //       yield;
        //     }
        //     ++c;
        //     --x;
        //     ++ys;
        //     if((xs >= xe) || (ys >= ye)) break;
        //     for(y = ys; y < ye; ++y){
        //       printDirect(x,y,String.fromCharCode(i % 256),c % 8,7 - c % 8,i > 255?1:0);
        //       ++i;
        //       i = i % 512;
        //       yield;
        //     }
        //     ++c;
        //     --y;
        //     --xe;
        //     if((xs >= xe) || (ys >= ye)) break;
        //     for(x = xe - 1; x >= xs ; --x){
        //       printDirect(x,y,String.fromCharCode(i % 256),c % 8,7 - c % 8,i > 255?1:0);
        //       ++i;
        //       i = i % 512;
        //       yield;
        //     }
        //     ++c;
        //     --ye;
        //     ++x;
        //     if((xs >= xe) || (ys >= ye)) break;
        //     for(y = ye - 1; y >= ys;--y){
        //       printDirect(x,y,String.fromCharCode(i % 256),c % 8,7 - c % 8,i > 255?1:0);
        //       ++i;
        //       i = i % 512;
        //       yield;
        //     }
        //     ++c;
        //     ++y;
        //     ++xs;
        //     if((xs >= xe) || (ys >= ye)) break;
        //   }
          
        // }
        // for(let j = 0;j < 64;++j){
        //   yield;
        // }
        // cls();
      //}