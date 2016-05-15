"use strict";

export function drawTriangle(vm,x1,y1,x2,y2,x3,y3,color)
{
  // 変数の並び替え
  if(y1 > y2){
    let tx = x1,ty = y1;
    x1 = x2;
    y1 = y2;
    x2 = tx;
    y2 = ty;
  } 
  
  if(y1 > y3){
    let tx = x1,ty = y1;
    x1 = x3;
    y1 = y3;
    x3 = tx;
    y3 = ty;
  }
  
  if(y2 > y3){
    let tx = x2,ty = y2;
    x2 = x3;
    y2 = y3;
    x3 = tx;
    y3 = ty;
  }
  
  let dy1 = y2 - y1;
  let dx1 = dy1?(x2 - x1) / dy1:0;

  let dy2 = y3 - y1;
  let dx2 = dy2?(x3 - x1) / dy2:0;
  
  let dy3 = y3 - y2;
  let dx3 = dy3?(x3 - x2) / dy3:0;
  

  let X1 = x1,X2 = x1; 
  let ch = String.fromCharCode(0xef);
  
 if(dy1){
  for(let Y = y1;Y <= y2;++Y)
  {
    vm.cline5(Math.floor(X1),Y,Math.floor(X2),Y,ch,color);
    X1 += dx1;
    X2 += dx2;
  }
 }
if(dy3){
  for(let Y = y2;Y <= y3;++Y)
  {
    vm.cline5(Math.floor(X1),Y,Math.floor(X2),Y,ch,color);
    X1 += dx3;
    X2 += dx2;
  }
}
}
