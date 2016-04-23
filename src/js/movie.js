"use strict";
import {xhrGet} from './xhrGet';
import lzbase62 from "./lzbase62.min";
import {json} from './json';

let movieData;
let loaded = false;

export function loadMovie()
{
  if(movieData){
      loaded = true;
    } else {
      xhrGet('../../dist/res/movie.txt')
      .then((d)=>{
        return new Promise((resolve,reject)=>{
          let t = [];
          lzbase62.decompress(d,{
            onData(data){
              t.push(data);
            },
            onEnd(){
              movieData = JSON.parse(t.join(''));
                loaded = true;
              resolve(movieData);
            }
          });
        });
        // movieData = JSON.parse(t);
        // loaded = true;
      });  }
  return Promise.resolve(movieData);
}

export function * playMovie(vm,colors)
{
   
    while(!loaded){
      yield;
    }
    
   let audio = vm.audio;
   let bs = audio.audioctx.createBufferSource();
   let movieSample = audio.getWaveSample(24);
   bs.buffer = movieSample.sample;
   bs.loop = false;
   bs.connect(audio.audioctx.destination);
   bs.onended = ()=>{
     console.log('end');
     bs.disconnect();
   }

   bs.start(0,0,1.5);
    
    for(let idx = 0,e = movieData.length;idx < e;++idx){
      let md = movieData[idx];
      for(var y = 0,ey = vm.consoleHeight;y < ey;++y){
        for(var x = 0,ex = vm.consoleWidth;x < ex;++x){
          let cn = md[x + y * ex];
          let c = colors[cn];
          vm.setColor(x,y,c[0],c[1]);
        }
      }
      yield;
    }
}