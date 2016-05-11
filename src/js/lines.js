"use strict";

// キャラクターによる線分描画
function cline(x1, y1, x2, y2, char = String.fromCharCode(0xef), color = 7, bgcolor = 0, attr = 0) {
  let dy = y2 - y1, dx = x2 - x1;
  let m = Math.abs(dy / dx);
  if (m <= 1) {
    m = m * (dy >= 0 ? 1 : -1);
    for (let x = x1, y = y1, i = 0, e = Math.abs(dx), d = (dx >= 0 ? 1 : -1); i <= e; ++i, x += d, y += m) {
      this.printDirect(x, Math.floor(y), char, color, bgcolor, attr);
    }
  } else {
    m = 1 / m;
    m = m * (dx >= 0 ? 1 : -1);
    for (let x = x1, y = y1, i = 0, e = Math.abs(dy), d = (dy >= 0 ? 1 : -1); i <= e; ++i, y += d, x += m) {
      this.printDirect(Math.floor(x), y, char, color, bgcolor, attr);
    }
  }
}


function cline1(x1, y1, x2, y2, char = String.fromCharCode(0xef), color = 7, bgcolor = 0, attr = 0) {
  let dy = y2 - y1, dx = x2 - x1;
  let m = Math.abs(dy / dx);
  if (m <= 1) {
    //m = m * (dy >= 0 ? 1:-1);
    for (let x = x1, y = y1, i = 0, e = Math.abs(dx), d = (dx >= 0 ? 1 : -1), D = 0.5; i <= e; ++i, x += d) {
      this.printDirect(x, y, char, color, bgcolor, attr);
      D = D + m;
      if (D >= 1.0) {
        D -= 1.0;
        y += d;
      }
    }
  } else {
    m = 1 / m;
    //m = m * (dx >= 0 ? 1:-1);
    for (let x = x1, y = y1, i = 0, e = Math.abs(dy), d = (dy >= 0 ? 1 : -1), D = 0.5; i <= e; ++i, y += d) {
      this.printDirect(x, y, char, color, bgcolor, attr);
      D = D + m;
      if (D >= 1.0) {
        D -= 1.0;
        x += d;
      }
    }
  }
}


function cline2(x1, y1, x2, y2, char = String.fromCharCode(0xef), color = 7, bgcolor = 0, attr = 0) {
  let dy = y2 - y1, dx = x2 - x1;
  let m = Math.abs(dy);
  if (m <= Math.abs(dx)) {
    //m = m * (dy >= 0 ? 1:-1);
    for (let x = x1, y = y1, i = 0, e = Math.abs(dx), d = (dx >= 0 ? 1 : -1), D = 0.5 * m; i <= e; ++i, x += d) {
      this.printDirect(x, y, char, color, bgcolor, attr);
      D = D + m;
      if (D >= Math.abs(dx)) {
        D -= Math.abs(dx);
        y += d;
      }
    }
  } else {
    //m = 1/m;
    m = Math.abs(dx);
    //m = m * (dx >= 0 ? 1:-1);
    for (let x = x1, y = y1, i = 0, e = Math.abs(dy), d = (dy >= 0 ? 1 : -1), D = 0.5 * m; i <= e; ++i, y += d) {
      this.printDirect(x, y, char, color, bgcolor, attr);
      D = D + m;
      if (D >= Math.abs(dy)) {
        D -= Math.abs(dy);
        x += d;
      }
    }
  }
}

function cline3(x1, y1, x2, y2, char = String.fromCharCode(0xef), color = 7, bgcolor = 0, attr = 0) {
  let dy = y2 - y1, dx = x2 - x1;
  let m = (Math.abs(dy) << 1);
  if (m <= (Math.abs(dx) << 1)) {
    //m = m * (dy >= 0 ? 1:-1);
    for (let x = x1, y = y1, i = 0, e = Math.abs(dx), d = (dx >= 0 ? 1 : -1), D = (m >> 1); i <= e; ++i, x += d) {
      this.printDirect(x, y, char, color, bgcolor, attr);
      D = D + m;
      if (D >= (Math.abs(dx) << 1)) {
        D -= (Math.abs(dx) << 1);
        y += d;
      }
    }
  } else {
    //m = 1/m;
    m = (Math.abs(dx) << 1);
    //m = m * (dx >= 0 ? 1:-1);
    for (let x = x1, y = y1, i = 0, e = Math.abs(dy), d = (dy >= 0 ? 1 : -1), D = (m >> 1); i <= e; ++i, y += d) {
      this.printDirect(x, y, char, color, bgcolor, attr);
      D = D + m;
      if (D >= (Math.abs(dy) << 1)) {
        D -= (Math.abs(dy) << 1);
        x += d;
      }
    }
  }
}


function cline4(x1, y1, x2, y2, char = String.fromCharCode(0xef), color = 7, bgcolor = 0, attr = 0) {
  let dy = (y2 - y1) << 1, dx = (x2 - x1) << 1;
  let ady = Math.abs(dy) | 0, adx = Math.abs(dx) | 0;
  let m = ady;
  if (m <= adx) {
    for (let x = x1, y = y1, i = 0, e = adx >> 1, d = (dx >= 0 ? 1 | 0 : -1 | 0), d1 = (dy >= 0 ? 1 | 0 : -1 | 0), D = (m >> 1); i <= e; ++i, x += d) {
      D = D + m;
      if (D >= adx) {
        D -= adx;
        y += d1;
      }
      this.printDirect(x, y, char, color, bgcolor, attr);
      //printDirect(x,y,char,color,bgcolor,attr);
    }
  } else {
    m = adx;
    for (let x = x1, y = y1, i = 0, e = ady >> 1, d = (dy >= 0 ? 1 | 0 : -1 | 0), d1 = (dx >= 0 ? 1 | 0 : -1 | 0), D = (m >> 1); i <= e; ++i, y += d) {
      D = D + m;
      if (D >= ady) {
        D -= ady;
        x += d1;
      }
      this.printDirect(x, y, char, color, bgcolor, attr);
      //        printDirect(x,y,char,color,bgcolor,attr);
    }
  }
}


function cline5(x1, y1, x2, y2, char = String.fromCharCode(0xef), color = 7, bgcolor = 0, attr = 0) {
  let dy = (y2 - y1) << 1, dx = (x2 - x1) << 1;
  let ady = Math.abs(dy) | 0, adx = Math.abs(dx) | 0;
  let m = ady;
  if (m <= adx) {
    for (let x = x1, y = y1, i = 0, e = adx >> 1, d = (dx >= 0 ? 1 | 0 : -1 | 0), d1 = (dy >= 0 ? 1 | 0 : -1 | 0), D = (adx >> 1) /* ここを修正 */; i <= e; ++i, x += d) {
      this.printDirect(x, y, char, color, bgcolor, attr);
      D = D + m;
      if (D >= adx) {
        D -= adx;
        y += d1;
      }
    }
  } else {
    m = adx;
    for (let x = x1, y = y1, i = 0, e = ady >> 1, d = (dy >= 0 ? 1 | 0 : -1 | 0), d1 = (dx >= 0 ? 1 | 0 : -1 | 0), D = (ady >> 1)/* ここを修正 */; i <= e; ++i, y += d) {
      this.printDirect(x, y, char, color, bgcolor, attr);
      D = D + m;
      if (D >= ady) {
        D -= ady;
        x += d1;
      }
    }
  }
}

function cline0(x1, y1, x2, y2, char = String.fromCharCode(0xef), color = 7, bgcolor = 0, attr = 0) {
  let m = Math.abs((y2 - y1) / (x2 - x1));
  for (let x = x1, y = y1; x <= x2; ++x, y += m) {
    this.printDirect(x, Math.floor(y), char, color, bgcolor, attr);
  }
}

// ブレゼンハム・アルゴリズムによる線分描画
var clineB0 = (() => {
  // 移動方向定義
  var M = [
    { dx: 1, dy: 0 }, // M1
    { dx: 1, dy: 1 }, // M2
    { dx: 0, dy: 1 }, // M3
    { dx: -1, dy: 1 }, // M4
    { dx: -1, dy: 0 }, // M5
    { dx: -1, dy: -1 }, // M6
    { dx: 0, dy: -1 }, // M7
    { dx: 1, dy: -1 } // M8
  ];
  return function (x1, y1, x2, y2, char = String.fromCharCode(0xef), color = 7, bgcolor = 0, attr = 0) {

    let dx = (x2 - x1) | 0;// Δx
    let dy = (y2 - y1) | 0;// Δy

    // X Y Z
    let X = dx >= 0 ? 1 : 0;
    let Y = dy >= 0 ? 1 : 0;
    let Z = ((Math.abs(dx) - Math.abs(dy)) >= 0 ? 1 : 0) | 0;
    let da, db, m1, m2;// Δa,Δb,m1,m2

    // (2)の決定
    if (Z == 1) {
      da = Math.abs(dx) | 0;
      db = Math.abs(dy) | 0;
    } else {
      da = Math.abs(dy) | 0;
      db = Math.abs(dx) | 0;
    }

    // (4)の決定
    // F(X,Y,Z)
    let f = [X & Z, (Y & (~Z & 1)), ((~X & 1) & Z), ((~Y & 1) & (~Z & 1))];

    if (f[0]) {
      m1 = M[0]; // F(X,Y,Z)
    } else if (f[1]) {
      m1 = M[2];
    } else if (f[2]) {
      m1 = M[4];
    } else if (f[3]) {
      m1 = M[6];
    }

    // G(X,Y)
    let g = [X & Y, ((~X & 1) & Y), ((~X & 1) & (~Y & 1)), X & (~Y & 1)];

    if (g[0]) {
      m2 = M[1];
    } else if (g[1]) {
      m2 = M[3];
    } else if (g[2]) {
      m2 = M[5];
    } else if (g[3]) {
      m2 = M[7];
    }

    let da2 = da << 1;// 2 * Δa
    let db2 = db << 1;// 2 * Δb 
    let t = db2 - da; // ▽1 = 2 * Δb - Δa 
    let i = 0;
    let x = x1, y = y1;
    let db2_da2 = db2 - da2;
    this.printDirect(x, y, char, color, bgcolor, attr);
    while (i++ <= da) {// 0 ... i ... Δa
      if (t >= 0) {
        t += db2_da2;// ▽i = ▽(i+1) + 2Δb - 2Δa

        // execute m1          
        x += m2.dx;
        y += m2.dy;
      } else {
        t += db2; // ▽i = ▽(i+1) + 2Δb

        // execute m2          
        x += m1.dx;
        y += m1.dy;
      }
      this.printDirect(x, y, char, color, bgcolor, attr);
    }
  };
})();

// ブレゼンハム・アルゴリズムによる線分描画
var clineB1 = (() => {
  // 移動方向定義
  var M = [
    { dx: 1, dy: 0 }, // M1
    { dx: 1, dy: 1 }, // M2
    { dx: 0, dy: 1 }, // M3
    { dx: -1, dy: 1 }, // M4
    { dx: -1, dy: 0 }, // M5
    { dx: -1, dy: -1 }, // M6
    { dx: 0, dy: -1 }, // M7
    { dx: 1, dy: -1 } // M8
  ];

  return function (x1, y1, x2, y2, char = String.fromCharCode(0xef), color = 7, bgcolor = 0, attr = 0) {

    let dx = (x2 - x1) | 0;// Δx
    let dy = (y2 - y1) | 0;// Δy

    // X Y Z
    let X = dx >= 0;
    let Y = dy >= 0;
    let Z = (Math.abs(dx) - Math.abs(dy)) >= 0;
    let da, db, m1, m2;// Δa,Δb,m1,m2

    // (2)の決定
    if (Z) {
      da = Math.abs(dx) | 0;
      db = Math.abs(dy) | 0;
    } else {
      da = Math.abs(dy) | 0;
      db = Math.abs(dx) | 0;
    }

    // (4)の決定
    // F(X,Y,Z)
    if (X && Z) {
      m1 = M[0];
    } else if (Y && (!Z)) {
      m1 = M[2];
    } else if ((!X) && Z) {
      m1 = M[4];
    } else if ((!Y) && (!Z)) {
      m1 = M[6];
    }

    // G(X,Y)
    //let g = [X && Y,(!X1) && Y,(!X) && (!Y),X && (!Y)];

    if (X && Y) {
      m2 = M[1];
    } else if ((!X) && Y) {
      m2 = M[3];
    } else if ((!X) && (!Y)) {
      m2 = M[5];
    } else if (X && (!Y)) {
      m2 = M[7];
    }

    let da2 = da << 1;// 2 * Δa
    let db2 = db << 1;// 2 * Δb 
    let t = db2 - da; // ▽1 = 2 * Δb - Δa 
    let i = 0;
    let x = x1, y = y1;
    let db2_da2 = db2 - da2;

    this.printDirect(x, y, char, color, bgcolor, attr);

    while (i++ <= da) {// 0 ... i ... Δa
      if (t >= 0) {
        t += db2_da2;// ▽i = ▽(i+1) + 2Δb - 2Δa

        // execute m1          
        x += m2.dx;
        y += m2.dy;
      } else {
        t += db2; // ▽i = ▽(i+1) + 2Δb

        // execute m2          
        x += m1.dx;
        y += m1.dy;
      }
      this.printDirect(x, y, char, color, bgcolor, attr);
    }
  };
})();

// ブレゼンハム・アルゴリズムによる線分描画
var line = (() => {
  // 移動方向定義
  var M = [
    { dx: 1, dy: 0 }, // M1
    { dx: 1, dy: 1 }, // M2
    { dx: 0, dy: 1 }, // M3
    { dx: -1, dy: 1 }, // M4
    { dx: -1, dy: 0 }, // M5
    { dx: -1, dy: -1 }, // M6
    { dx: 0, dy: -1 }, // M7
    { dx: 1, dy: -1 } // M8
  ];

  return function (x1, y1, x2, y2, color = 7) {

    let dx = (x2 - x1) | 0;// Δx
    let dy = (y2 - y1) | 0;// Δy

    // X Y Z
    let X = dx >= 0;
    let Y = dy >= 0;
    let Z = (Math.abs(dx) - Math.abs(dy)) >= 0;
    let da, db, m1, m2;// Δa,Δb,m1,m2

    // (2)の決定
    if (Z) {
      da = Math.abs(dx) | 0;
      db = Math.abs(dy) | 0;
    } else {
      da = Math.abs(dy) | 0;
      db = Math.abs(dx) | 0;
    }

    // (4)の決定
    // F(X,Y,Z)
    if (X && Z) {
      m1 = M[0];
    } else if (Y && (!Z)) {
      m1 = M[2];
    } else if ((!X) && Z) {
      m1 = M[4];
    } else if ((!Y) && (!Z)) {
      m1 = M[6];
    }

    // G(X,Y)
    //let g = [X && Y,(!X1) && Y,(!X) && (!Y),X && (!Y)];

    if (X && Y) {
      m2 = M[1];
    } else if ((!X) && Y) {
      m2 = M[3];
    } else if ((!X) && (!Y)) {
      m2 = M[5];
    } else if (X && (!Y)) {
      m2 = M[7];
    }

    let da2 = da << 1;// 2 * Δa
    let db2 = db << 1;// 2 * Δb 
    let t = db2 - da; // ▽1 = 2 * Δb - Δa 
    let i = 0;
    let x = x1, y = y1;
    let db2_da2 = db2 - da2;

    this.pset(x, y, color);

    while (i++ <= da) {// 0 ... i ... Δa
      if (t >= 0) {
        t += db2_da2;// ▽i = ▽(i+1) + 2Δb - 2Δa

        // execute m1          
        x += m2.dx;
        y += m2.dy;
      } else {
        t += db2; // ▽i = ▽(i+1) + 2Δb

        // execute m2          
        x += m1.dx;
        y += m1.dy;
      }
      this.pset(x, y, color);
    }
  };
})();

export function initLine(vm){
  vm.cline = cline.bind(vm);
  vm.cline0 = cline0.bind(vm);
  vm.cline1 = cline1.bind(vm);
  vm.cline2 = cline2.bind(vm);
  vm.cline3 = cline3.bind(vm);
  vm.cline4 = cline4.bind(vm);
  vm.cline5 = cline5.bind(vm);
  vm.clineB0 = clineB0.bind(vm);
  vm.clineB1 = clineB1.bind(vm);
  vm.line = line.bind(vm);
}