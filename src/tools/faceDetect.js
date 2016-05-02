"use strict"
var cv = require('I:/libs/npm/node_modules/opencv/lib/opencv');
let fs = require('fs');

function denodeify(nodeFunc) {
  var baseArgs = Array.prototype.slice.call(arguments, 1);
  return function () {
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

const w = 80 * 1.5;
const h = 50 * 1.5;

var readFile = denodeify(fs.readFile);
var readDir = denodeify(fs.readdir);
var writeFile = denodeify(fs.writeFile);
var readImage = denodeify(cv.readImage);
//var detectObject = denodeify(cv.detectObject);

function faceDetect() {
  
  return readDir('./res/outmov/')
    .then((files) => {
      return files.filter(function (file) {
        return fs.statSync('./res/outmov/' + file).isFile() && /.*\.png$/ig.test(file); //絞り込み
      })
        .sort();
      //.map(d=>'./res/outmov/' + d);
    })
    .then(files => {
      let pr = Promise.resolve(0);
      files.forEach(f => {
        pr = pr.then(() => {
          return new Promise((resolve, reject) => {
            cv.readImage('./res/outmov/' + f, function (err, im) {
              if (err) reject(err);
              resolve(im);
            })
          });
        })
          .then((im) => {
            return new Promise((resolve, reject) => {
              im.detectObject(cv.FACE_CASCADE, {}, function (err, faces) {
                if (err) reject(err);
                if (faces.length > 0) {
                  //          for(let i = 0;i < faces.length;++i){
                  let pos = faces[faces.length - 1];
                  //            console.log(f,pos.x,pos.y,pos.width,pos.height);
                  let cx = pos.x + pos.width / 2, cy = pos.y + pos.height / 2;
                  let sx = cx - w / 2, sy = cy - h / 2 + 8;
                  if (sx < 0) sx = 0;
                  if (sy < 0) sy = 0;
                  let out = im.crop(sx, sy, w, h)
                  out.resize(40, 25, 2);
                  out.save('./res/outmov2/' + f);
                  //        }
                } else {
                  var sx = im.width() / 2 - w / 2;
                  var sy = im.height() / 2 - h / 2;
                  let out = im.crop(sx, sy, w, h);
                  out.resize(40, 25, 2);
                  out.save('./res/outmov2/' + f);
                }
                resolve();
              });
            });
          });
      });
      return pr;
    });
}

module.exports = faceDetect;
