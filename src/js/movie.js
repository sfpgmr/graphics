"use strict";
import {xhrGet} from './xhrGet';
import lzbase62 from "./lzbase62.min";
import {json} from './json';

let kanaPos = {
  'ｱ' : {start:0.932,dulation:0.579},
  'ｲ' : {start:2.135,dulation:0.452},
  'ｳ' : {start:3.383,dulation:0.439},
  'ｴ' : {start:4.654,dulation:0.412},
  'ｵ' : {start:5.957,dulation:0.434},
  
  'ｶ' : {start:7.402,dulation:0.513},
  'ｷ' : {start:8.595,dulation:0.310},
  'ｸ' : {start:9.746,dulation:0.378},
  'ｹ' : {start:10.960,dulation:0.410},
  'ｺ' : {start:12.288,dulation:0.348},

  'ｻ' : {start:13.748,dulation:0.299},
  'ｼ' : {start:14.741,dulation:0.372},
  'ｽ' : {start:15.874,dulation:0.370},
  'ｾ' : {start:16.984,dulation:0.343},
  'ｿ' : {start:18.092,dulation:0.287},

  'ﾀ' : {start:19.486,dulation:0.391},
  'ﾁ' : {start:20.593,dulation:0.358},
  'ﾂ' : {start:21.701,dulation:0.378},
  'ﾃ' : {start:22.761,dulation:0.305},
  'ﾄ' : {start:23.819,dulation:0.269},

  'ﾅ' : {start:25.669,dulation:0.403},
  'ﾆ' : {start:26.730,dulation:0.400},
  'ﾇ' : {start:27.845,dulation:0.382},
  'ﾈ' : {start:28.987,dulation:0.359},
  'ﾉ' : {start:30.061,dulation:0.316},

  'ﾊ' : {start:32.065,dulation:0.444},
  'ﾋ' : {start:33.252,dulation:0.341},
  'ﾌ' : {start:34.221,dulation:0.464},
  'ﾍ' : {start:35.354,dulation:0.356},
  'ﾎ' : {start:36.435,dulation:0.395},
  
  'ﾏ' : {start:39.229,dulation:0.469},
  'ﾐ' : {start:40.265,dulation:0.349},
  'ﾑ' : {start:41.455,dulation:0.371},
  'ﾒ' : {start:42.586,dulation:0.343},
  'ﾓ' : {start:43.679,dulation:0.281},

  'ﾗ' : {start:46.607,dulation:0.367},
  'ﾘ' : {start:47.663,dulation:0.310},
  'ﾙ' : {start:48.765,dulation:0.335},
  'ﾚ' : {start:49.801,dulation:0.360},
  'ﾛ' : {start:50.803,dulation:0.310},


  'ﾔ' : {start:58.073,dulation:0.455},
  'ﾕ' : {start:59.019,dulation:0.390},
  'ﾖ' : {start:60.006,dulation:0.275},

  'ﾜ' : {start:53.676,dulation:0.505},
  'ｦ' : {start:54.744,dulation:0.351},
  'ﾝ' : {start:55.828,dulation:0.317},
  
  'ｶﾞ' : {start:62.907,dulation:0.365},
  'ｷﾞ' : {start:63.943,dulation:0.353},
  'ｸﾞ' : {start:65.178,dulation:0.307},
  'ｹﾞ' : {start:66.286,dulation:0.404},
  'ｺﾞ' : {start:67.435,dulation:0.382},

  'ｻﾞ' : {start:69.180,dulation:0.390},
  'ｼﾞ' : {start:70.200,dulation:0.363},
  'ｽﾞ' : {start:71.296,dulation:0.348},
  'ｾﾞ' : {start:72.418,dulation:0.327},
  'ｿﾞ' : {start:73.431,dulation:0.274},

  'ﾊﾞ' : {start:75.452,dulation:0.413},
  'ﾋﾞ' : {start:76.523,dulation:0.335},
  'ﾌﾞ' : {start:77.646,dulation:0.361},
  'ﾍﾞ' : {start:78.823,dulation:0.359},
  'ﾎﾞ' : {start:80.012,dulation:0.320},

  'ﾀﾞ' : {start:81.987,dulation:0.565},
  'ﾁﾞ' : {start:83.007,dulation:0.343},
  'ﾂﾞ' : {start:84.086,dulation:0.395},
  'ﾃﾞ' : {start:85.137,dulation:0.362},
  'ﾄﾞ' : {start:86.206,dulation:0.310},

  'ﾊﾟ' : {start:88.755,dulation:0.320},
  'ﾋﾟ' : {start:89.819,dulation:0.305},
  'ﾌﾟ' : {start:90.821,dulation:0.410},
  'ﾍﾟ' : {start:91.906,dulation:0.390},
  'ﾎﾟ' : {start:93.018,dulation:0.347},

  'ｷｬ' : {start:95.415,dulation:0.432},
  'ｷｭ' : {start:96.540,dulation:0.415},
  'ｷｮ' : {start:98.014,dulation:0.336},

  'ｼｬ' : {start:99.399,dulation:0.556},
  'ｼｭ' : {start:100.528,dulation:0.438},
  'ｼｮ' : {start:101.491,dulation:0.344},
  
  'ﾁｬ' : {start:103.782,dulation:0.462},
  'ﾁｭ' : {start:104.838,dulation:0.395},
  'ﾁｮ' : {start:105.913,dulation:0.275},

  'ﾆｬ' : {start:108.189,dulation:0.396},
  'ﾆｭ' : {start:109.302,dulation:0.378},
  'ﾆｮ' : {start:110.345,dulation:0.362},
  
  'ﾐｬ' : {start:112.013,dulation:0.455},
  'ﾐｭ' : {start:113.101,dulation:0.365},
  'ﾐｮ' : {start:114.149,dulation:0.298},

  'ｷﾞｬ' : {start:116.243,dulation:0.395},
  'ｷﾞｭ' : {start:117.311,dulation:0.508},
  'ｷﾞｮ' : {start:118.426,dulation:0.356},

  'ﾋﾞｬ' : {start:120.360,dulation:0.346},
  'ﾋﾞｭ' : {start:121.411,dulation:0.324},
  'ﾋﾞｮ' : {start:122.535,dulation:0.373},

  'ﾘｬ' : {start:124.609,dulation:0.389},
  'ﾘｭ' : {start:125.698,dulation:0.328},
  'ﾘｮ' : {start:126.783,dulation:0.298}
};
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



