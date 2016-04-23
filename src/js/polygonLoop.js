"use strict";

  export function *circleLoop(vm,colors,cx,cy,t) 
  {
      //while (true) {
      //cls();
      let colorDiv = colors.length / 2;
      for(let i = 0;i < 256;++i)
      {
        for(let x = 0,ex = 40;x < ex;++x){
          for(let y = 0,ey = 25;y < ey;++y){
            let dx = Math.abs(x - cx),dy = Math.abs(y - cy);
            let c = colors[(Math.sin(Math.sqrt(dx*dx + dy*dy) + t) * colorDiv + colorDiv) | 0];
            vm.setColor(x,y,c[0],c[1]);         
          }
        }
        t += 0.2;
        yield;
      }
      
      return t;  
  }

  export function *rectLoop(vm,colors,cx,cy,t) 
  {
      //while (true) {
      //cls();
      let colorDiv = colors.length / 2;
      for(let i = 0;i < 256;++i)
      {
        for(let x = 0,ex = 40;x < ex;++x){
          for(let y = 0,ey = 25;y < ey;++y){
            let dt = t * 0.25;
            
            let ax = Math.cos(dt) * (x - cx) - Math.sin(dt) * (y - cy) + cx;
            let ay = Math.sin(dt) * (x - cx) + Math.cos(dt) * (y - cy) + cy;
            let dx = Math.abs(ax - cx),dy = Math.abs(ay - cy);
            let c;
            if(dx > dy) {
              c = colors[(Math.sin(dx + t) * colorDiv + colorDiv) | 0];
            } else {
              c = colors[(Math.sin(dy + t) * colorDiv + colorDiv) | 0];
            }
            vm.setColor(x,y,c[0],c[1]);         
          }
        }
        t += 0.1;
        yield;
      }
      
      return t;  
  }

  export function *rectLoop2(vm,colors,cx,cy,t) 
  {
      //while (true) {
      //cls();
      let colorDiv = colors.length / 2;
      
      for(let i = 0;i < 256;++i)
      {
        for(let x = 0,ex = 40;x < ex;++x){
          for(let y = 0,ey = 25;y < ey;++y){
            let dt = t * 0.25;
            
            let ax = Math.cos(dt) * (x - cx) - Math.sin(dt) * (y - cy) + cx;
            let ay = Math.sin(dt) * (x - cx) + Math.cos(dt) * (y - cy) + cy;
            let dx = Math.abs(ax - cx),dy = Math.abs(ay - cy);
            let c;
            if(dx > dy ) {
              c = colors[(Math.sin(Math.cos(dx) + t) * colorDiv + colorDiv) | 0];
            } else {
              c = colors[(Math.sin(Math.cos(dy) + t) * colorDiv + colorDiv) | 0];
            }
            vm.setColor(x,y,c[0],c[1]);         
          }
        }
        t += 0.1;
        yield;
      }
      
      return t;  
  }
  
  export function *polygonLoop(vm,colors,cx,cy,a,t)
  {
      let colorDiv = colors.length / 2;
      
      for(let i = 0;i < 128;++i)
      {
        for(let x1 = 0,ex1 = 40;x1 < ex1;++x1){
          for(let y1 = 0,ey1 = 25;y1 < ey1;++y1){
            let tx = x1 - cx;
            let ty = y1 - cy;
            let cost = Math.cos(t/4),sint = Math.sin(t/4);
            let dx = cost * tx - sint * ty;
            let dy = sint * tx + cost * ty;
            let theta = Math.atan2(dy,dx);
            let theta1 = (Math.floor(theta / (2 * Math.PI / a)) * (2 * Math.PI / a) + Math.PI / a);
            let x2 = dx * Math.cos(theta1) + dy * Math.sin(theta1);
            let c = colors[(Math.sin(x2 + t) * colorDiv + colorDiv) | 0];
            vm.setColor(x1,y1,c[0],c[1]);         
          }
        }
        vm.print(0,0,('0' + a).slice(-2) +'ｶｸｹｲ',7,0,true);
        t += 0.1;
        yield;
      }
      
      return t;  
    
  }  