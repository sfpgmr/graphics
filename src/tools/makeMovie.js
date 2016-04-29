'use strict';

let faceDetect = require('./faceDetect');

let fs = require('fs');
let PNG = require('node-png').PNG;
let lzbase62 = require('lzbase62');

function denodeify(nodeFunc){
    var baseArgs = Array.prototype.slice.call(arguments, 1);
    return function() {
        var nodeArgs = baseArgs.concat(Array.prototype.slice.call(arguments));
        return new Promise((resolve, reject) => {
            nodeArgs.push((error, data) => {
                if (error) {
                    reject(error);
                } else if (arguments.length > 2) {
                    resolve(Array.prototype.slice.call(arguments, 1));
                } else {
                    resolve(data);
                }
            });
            nodeFunc.apply(null, nodeArgs);
        });
    }
}

var readFile = denodeify(fs.readFile);
var readDir = denodeify(fs.readdir);
var writeFile = denodeify(fs.writeFile);
let movieArray = [];

faceDetect()
.then(readDir.bind(null,'./res/outmov2/'))
.then((files)=>{
    return files.filter(function(file){
        return fs.statSync('./res/outmov2/' + file).isFile() && /.*\.png$/ig.test(file); //絞り込み
    })
    .sort()
    .map(d=>'./res/outmov2/' + d);
})
.then((files)=>{
  let pr = Promise.resolve(0);  
  files.forEach((file)=>{
    pr = pr
    .then(createMovieData.bind(null,file))
    .then(d=>{movieArray.push(d[0],d[1],d[2]);})
    ;
  });
  return pr;
})
.then(()=>{
  writeFile('../res/movie.txt',lzbase62.compress(JSON.stringify(movieArray)),'utf-8');
})
.catch(err=>{console.log('err:' + err);});

function createMovieData(path){
  return new Promise((resolve,reject)=>{
    let out = [],out1 = [],out2 = [];
    fs.createReadStream(path)
    .pipe(new PNG({
      filterType: 4
    }))
    .on('parsed', function() {
      for (var y = 0; y < this.height; y++) {
        for (var x = 0; x < this.width; x++) {
            var idx = (this.width * y + x) << 2;
            let g = ((this.data[idx + 1] / 28.4444 ) | 0);
            let r = ((this.data[idx] / 28.4444 ) | 0);
            let b = (this.data[idx + 2] / 28.4444 ) | 0;
            out2.push((g < 3 ? g : 2) * 9 + (r < 3 ? r : 2) * 3 + (b < 3 ? b:2));
            //out.push(g1 * 9 + r1 * 3 + b1);
            //out1.push((g % 3 ) * 9 + (r % 3 ) * 3 + (b % 3));
            //out1.push((g < 3 ? 0 : g1 ) * 9 + (r < 3 ? 0 : r1 ) * 3 + (b < 3  ? 0 : b1 ));
            out1.push(((g < 6 && g > 2)? g - 3 : g > 5 ? 2 : 0) * 9 + ((r < 6 && r > 2)? r - 3 : r > 5 ? 2 : 0) * 3 + ((b < 6 && b > 2) ? b - 3:b > 5 ? 2 : 0));
            out.push(((g < 9 && g > 5)? g - 6 : 0) * 9 + ((r < 9 && r > 5)? r - 6 : 0) * 3 + ((b < 9 && b > 5) ? b - 6:0));
            //out2.push((g < 6 ? 0 : g1 ) * 9 + (r < 6 ? 0 : r1 ) * 3 + (b < 6  ? 0 : b1 ));
            //out2.push((g < 6 ? 0 : g1 ) * 9 + (r < 6 ? 0 : r1 ) * 3 + (b < 6  ? 0 : b1 ));
            //out.push((g % 3 | 0) * 9 + (r % 3 | 0) * 3 + (b % 3 | 0));
            //out1.push((g % 3 | 0) * 9 + (r % 3 | 0) * 3 + (b % 3 | 0));
            //out1.push((g % 3 | 0) * 9 + (r % 3 | 0) * 3 + (b % 3 | 0));
            //out1.push((g > 2 ? g % 3 : 0) * 9 + (r > 2 ? r % 3 : 0) * 3 + (b > 2 ? b: 0));
        }
      }
      resolve([out,out1,out2]);
      //fs.writeFileSync('./out.json',JSON.stringify(out),'utf-8');
    })
    .on('error',(err)=>{reject(err);});
  });
} 


    