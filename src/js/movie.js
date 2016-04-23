"use strict";
import {xhrGet} from './xhrGet';
import lzbase62 from "./lzbase62.min";
import {json} from './json';


export class Movie {
  constructor(vm){
    this.movieData = null;
    this.loaded = false;
    this.vm = vm;
    let audio = vm.audio;
    let filter = this.filter = audio.audioctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.value = 4000;
    filter.Q.value = 0.0001;
    this.gain = audio.audioctx.createGain();
    this.gain.gain.value = 0.5;
    this.gain.connect(audio.audioctx.destination);
    this.filter.connect(this.gain);
  }

  loadMovie(){
    let self = this;
    if(this.movieData){
        this.loaded = true;
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
                self.movieData = JSON.parse(t.join(''));
                self.loaded = true;
                resolve(self.movieData);
              }
            });
          });
          // movieData = JSON.parse(t);
          // loaded = true;
        });  }
    return Promise.resolve(this.movieData);
  }
  
   createMovieVoice(){
      let bs = this.vm.audio.audioctx.createBufferSource();
      let movieSample = this.vm.audio.getWaveSample(24);
      bs.buffer = movieSample.sample;
      bs.loop = false;
      bs.onended = (function(){
        this.disconnect();
      }).bind(bs);
      return bs;
    }
  
  *playMovie(colors)
  {
    let vm = this.vm;
    while(!this.loaded){
      yield;
    }
    let bs = this.bs = this.createMovieVoice();
    this.bs.connect(this.filter);
    bs.start(0);

    this.idx = 0;
    
      let e = this.movieData.length;
      for(this.idx = 0;this.idx < e;++this.idx){
        let md = this.movieData[this.idx];
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
  
 
  pause(){
    this.bs.stop();    
  }
  
  resume(){
    this.bs = this.createMovieVoice();
    this.bs.connect(this.filter);
    this.bs.connect(this.filter);
    this.bs.start(0,this.idx / 60);
  }
  
  stop(){
    this.bs.stop();
  }
  
  visibilityChange(){
    let bs = this.bs;
    if(window.document.hidden){
      bs.stop(0);
    } else {
      bs = createMovieVoice();
      bs.connect(this.filter);
      bs.start(0,this.idx / 60);
    }
  }
}



