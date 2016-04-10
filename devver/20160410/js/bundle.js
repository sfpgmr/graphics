(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function (global){
/* eslint max-len: 0 */

"use strict";

require("core-js/shim");

require("babel-regenerator-runtime");

// Should be removed in the next major release:

require("core-js/fn/regexp/escape");

if (global._babelPolyfill) {
  throw new Error("only one instance of babel-polyfill is allowed");
}
global._babelPolyfill = true;

var DEFINE_PROPERTY = "defineProperty";
function define(O, key, value) {
  O[key] || Object[DEFINE_PROPERTY](O, key, {
    writable: true,
    configurable: true,
    value: value
  });
}

define(String.prototype, "padLeft", "".padStart);
define(String.prototype, "padRight", "".padEnd);

"pop,reverse,shift,keys,values,entries,indexOf,every,some,forEach,map,filter,find,findIndex,includes,join,slice,concat,push,splice,unshift,sort,lastIndexOf,reduce,reduceRight,copyWithin,fill".split(",").forEach(function (key) {
  [][key] && define(Array, key, Function.call.bind([][key]));
});
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"babel-regenerator-runtime":289,"core-js/fn/regexp/escape":2,"core-js/shim":288}],2:[function(require,module,exports){
require('../../modules/core.regexp.escape');
module.exports = require('../../modules/_core').RegExp.escape;
},{"../../modules/_core":22,"../../modules/core.regexp.escape":116}],3:[function(require,module,exports){
module.exports = function(it){
  if(typeof it != 'function')throw TypeError(it + ' is not a function!');
  return it;
};
},{}],4:[function(require,module,exports){
var cof = require('./_cof');
module.exports = function(it, msg){
  if(typeof it != 'number' && cof(it) != 'Number')throw TypeError(msg);
  return +it;
};
},{"./_cof":17}],5:[function(require,module,exports){
// 22.1.3.31 Array.prototype[@@unscopables]
var UNSCOPABLES = require('./_wks')('unscopables')
  , ArrayProto  = Array.prototype;
if(ArrayProto[UNSCOPABLES] == undefined)require('./_hide')(ArrayProto, UNSCOPABLES, {});
module.exports = function(key){
  ArrayProto[UNSCOPABLES][key] = true;
};
},{"./_hide":38,"./_wks":113}],6:[function(require,module,exports){
module.exports = function(it, Constructor, name, forbiddenField){
  if(!(it instanceof Constructor) || (forbiddenField !== undefined && forbiddenField in it)){
    throw TypeError(name + ': incorrect invocation!');
  } return it;
};
},{}],7:[function(require,module,exports){
var isObject = require('./_is-object');
module.exports = function(it){
  if(!isObject(it))throw TypeError(it + ' is not an object!');
  return it;
};
},{"./_is-object":47}],8:[function(require,module,exports){
// 22.1.3.3 Array.prototype.copyWithin(target, start, end = this.length)
'use strict';
var toObject = require('./_to-object')
  , toIndex  = require('./_to-index')
  , toLength = require('./_to-length');

module.exports = [].copyWithin || function copyWithin(target/*= 0*/, start/*= 0, end = @length*/){
  var O     = toObject(this)
    , len   = toLength(O.length)
    , to    = toIndex(target, len)
    , from  = toIndex(start, len)
    , end   = arguments.length > 2 ? arguments[2] : undefined
    , count = Math.min((end === undefined ? len : toIndex(end, len)) - from, len - to)
    , inc   = 1;
  if(from < to && to < from + count){
    inc  = -1;
    from += count - 1;
    to   += count - 1;
  }
  while(count-- > 0){
    if(from in O)O[to] = O[from];
    else delete O[to];
    to   += inc;
    from += inc;
  } return O;
};
},{"./_to-index":103,"./_to-length":106,"./_to-object":107}],9:[function(require,module,exports){
// 22.1.3.6 Array.prototype.fill(value, start = 0, end = this.length)
'use strict';
var toObject = require('./_to-object')
  , toIndex  = require('./_to-index')
  , toLength = require('./_to-length');
module.exports = function fill(value /*, start = 0, end = @length */){
  var O      = toObject(this)
    , length = toLength(O.length)
    , aLen   = arguments.length
    , index  = toIndex(aLen > 1 ? arguments[1] : undefined, length)
    , end    = aLen > 2 ? arguments[2] : undefined
    , endPos = end === undefined ? length : toIndex(end, length);
  while(endPos > index)O[index++] = value;
  return O;
};
},{"./_to-index":103,"./_to-length":106,"./_to-object":107}],10:[function(require,module,exports){
var forOf = require('./_for-of');

module.exports = function(iter, ITERATOR){
  var result = [];
  forOf(iter, false, result.push, result, ITERATOR);
  return result;
};

},{"./_for-of":35}],11:[function(require,module,exports){
// false -> Array#indexOf
// true  -> Array#includes
var toIObject = require('./_to-iobject')
  , toLength  = require('./_to-length')
  , toIndex   = require('./_to-index');
module.exports = function(IS_INCLUDES){
  return function($this, el, fromIndex){
    var O      = toIObject($this)
      , length = toLength(O.length)
      , index  = toIndex(fromIndex, length)
      , value;
    // Array#includes uses SameValueZero equality algorithm
    if(IS_INCLUDES && el != el)while(length > index){
      value = O[index++];
      if(value != value)return true;
    // Array#toIndex ignores holes, Array#includes - not
    } else for(;length > index; index++)if(IS_INCLUDES || index in O){
      if(O[index] === el)return IS_INCLUDES || index;
    } return !IS_INCLUDES && -1;
  };
};
},{"./_to-index":103,"./_to-iobject":105,"./_to-length":106}],12:[function(require,module,exports){
// 0 -> Array#forEach
// 1 -> Array#map
// 2 -> Array#filter
// 3 -> Array#some
// 4 -> Array#every
// 5 -> Array#find
// 6 -> Array#findIndex
var ctx      = require('./_ctx')
  , IObject  = require('./_iobject')
  , toObject = require('./_to-object')
  , toLength = require('./_to-length')
  , asc      = require('./_array-species-create');
module.exports = function(TYPE, $create){
  var IS_MAP        = TYPE == 1
    , IS_FILTER     = TYPE == 2
    , IS_SOME       = TYPE == 3
    , IS_EVERY      = TYPE == 4
    , IS_FIND_INDEX = TYPE == 6
    , NO_HOLES      = TYPE == 5 || IS_FIND_INDEX
    , create        = $create || asc;
  return function($this, callbackfn, that){
    var O      = toObject($this)
      , self   = IObject(O)
      , f      = ctx(callbackfn, that, 3)
      , length = toLength(self.length)
      , index  = 0
      , result = IS_MAP ? create($this, length) : IS_FILTER ? create($this, 0) : undefined
      , val, res;
    for(;length > index; index++)if(NO_HOLES || index in self){
      val = self[index];
      res = f(val, index, O);
      if(TYPE){
        if(IS_MAP)result[index] = res;            // map
        else if(res)switch(TYPE){
          case 3: return true;                    // some
          case 5: return val;                     // find
          case 6: return index;                   // findIndex
          case 2: result.push(val);               // filter
        } else if(IS_EVERY)return false;          // every
      }
    }
    return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : result;
  };
};
},{"./_array-species-create":14,"./_ctx":23,"./_iobject":43,"./_to-length":106,"./_to-object":107}],13:[function(require,module,exports){
var aFunction = require('./_a-function')
  , toObject  = require('./_to-object')
  , IObject   = require('./_iobject')
  , toLength  = require('./_to-length');

module.exports = function(that, callbackfn, aLen, memo, isRight){
  aFunction(callbackfn);
  var O      = toObject(that)
    , self   = IObject(O)
    , length = toLength(O.length)
    , index  = isRight ? length - 1 : 0
    , i      = isRight ? -1 : 1;
  if(aLen < 2)for(;;){
    if(index in self){
      memo = self[index];
      index += i;
      break;
    }
    index += i;
    if(isRight ? index < 0 : length <= index){
      throw TypeError('Reduce of empty array with no initial value');
    }
  }
  for(;isRight ? index >= 0 : length > index; index += i)if(index in self){
    memo = callbackfn(memo, self[index], index, O);
  }
  return memo;
};
},{"./_a-function":3,"./_iobject":43,"./_to-length":106,"./_to-object":107}],14:[function(require,module,exports){
// 9.4.2.3 ArraySpeciesCreate(originalArray, length)
var isObject = require('./_is-object')
  , isArray  = require('./_is-array')
  , SPECIES  = require('./_wks')('species');
module.exports = function(original, length){
  var C;
  if(isArray(original)){
    C = original.constructor;
    // cross-realm fallback
    if(typeof C == 'function' && (C === Array || isArray(C.prototype)))C = undefined;
    if(isObject(C)){
      C = C[SPECIES];
      if(C === null)C = undefined;
    }
  } return new (C === undefined ? Array : C)(length);
};
},{"./_is-array":45,"./_is-object":47,"./_wks":113}],15:[function(require,module,exports){
'use strict';
var aFunction  = require('./_a-function')
  , isObject   = require('./_is-object')
  , invoke     = require('./_invoke')
  , arraySlice = [].slice
  , factories  = {};

var construct = function(F, len, args){
  if(!(len in factories)){
    for(var n = [], i = 0; i < len; i++)n[i] = 'a[' + i + ']';
    factories[len] = Function('F,a', 'return new F(' + n.join(',') + ')');
  } return factories[len](F, args);
};

module.exports = Function.bind || function bind(that /*, args... */){
  var fn       = aFunction(this)
    , partArgs = arraySlice.call(arguments, 1);
  var bound = function(/* args... */){
    var args = partArgs.concat(arraySlice.call(arguments));
    return this instanceof bound ? construct(fn, args.length, args) : invoke(fn, args, that);
  };
  if(isObject(fn.prototype))bound.prototype = fn.prototype;
  return bound;
};
},{"./_a-function":3,"./_invoke":42,"./_is-object":47}],16:[function(require,module,exports){
// getting tag from 19.1.3.6 Object.prototype.toString()
var cof = require('./_cof')
  , TAG = require('./_wks')('toStringTag')
  // ES3 wrong here
  , ARG = cof(function(){ return arguments; }()) == 'Arguments';

// fallback for IE11 Script Access Denied error
var tryGet = function(it, key){
  try {
    return it[key];
  } catch(e){ /* empty */ }
};

module.exports = function(it){
  var O, T, B;
  return it === undefined ? 'Undefined' : it === null ? 'Null'
    // @@toStringTag case
    : typeof (T = tryGet(O = Object(it), TAG)) == 'string' ? T
    // builtinTag case
    : ARG ? cof(O)
    // ES3 arguments fallback
    : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
};
},{"./_cof":17,"./_wks":113}],17:[function(require,module,exports){
var toString = {}.toString;

module.exports = function(it){
  return toString.call(it).slice(8, -1);
};
},{}],18:[function(require,module,exports){
'use strict';
var dP          = require('./_object-dp').f
  , create      = require('./_object-create')
  , hide        = require('./_hide')
  , redefineAll = require('./_redefine-all')
  , ctx         = require('./_ctx')
  , anInstance  = require('./_an-instance')
  , defined     = require('./_defined')
  , forOf       = require('./_for-of')
  , $iterDefine = require('./_iter-define')
  , step        = require('./_iter-step')
  , setSpecies  = require('./_set-species')
  , DESCRIPTORS = require('./_descriptors')
  , fastKey     = require('./_meta').fastKey
  , SIZE        = DESCRIPTORS ? '_s' : 'size';

var getEntry = function(that, key){
  // fast case
  var index = fastKey(key), entry;
  if(index !== 'F')return that._i[index];
  // frozen object case
  for(entry = that._f; entry; entry = entry.n){
    if(entry.k == key)return entry;
  }
};

module.exports = {
  getConstructor: function(wrapper, NAME, IS_MAP, ADDER){
    var C = wrapper(function(that, iterable){
      anInstance(that, C, NAME, '_i');
      that._i = create(null); // index
      that._f = undefined;    // first entry
      that._l = undefined;    // last entry
      that[SIZE] = 0;         // size
      if(iterable != undefined)forOf(iterable, IS_MAP, that[ADDER], that);
    });
    redefineAll(C.prototype, {
      // 23.1.3.1 Map.prototype.clear()
      // 23.2.3.2 Set.prototype.clear()
      clear: function clear(){
        for(var that = this, data = that._i, entry = that._f; entry; entry = entry.n){
          entry.r = true;
          if(entry.p)entry.p = entry.p.n = undefined;
          delete data[entry.i];
        }
        that._f = that._l = undefined;
        that[SIZE] = 0;
      },
      // 23.1.3.3 Map.prototype.delete(key)
      // 23.2.3.4 Set.prototype.delete(value)
      'delete': function(key){
        var that  = this
          , entry = getEntry(that, key);
        if(entry){
          var next = entry.n
            , prev = entry.p;
          delete that._i[entry.i];
          entry.r = true;
          if(prev)prev.n = next;
          if(next)next.p = prev;
          if(that._f == entry)that._f = next;
          if(that._l == entry)that._l = prev;
          that[SIZE]--;
        } return !!entry;
      },
      // 23.2.3.6 Set.prototype.forEach(callbackfn, thisArg = undefined)
      // 23.1.3.5 Map.prototype.forEach(callbackfn, thisArg = undefined)
      forEach: function forEach(callbackfn /*, that = undefined */){
        anInstance(this, C, 'forEach');
        var f = ctx(callbackfn, arguments.length > 1 ? arguments[1] : undefined, 3)
          , entry;
        while(entry = entry ? entry.n : this._f){
          f(entry.v, entry.k, this);
          // revert to the last existing entry
          while(entry && entry.r)entry = entry.p;
        }
      },
      // 23.1.3.7 Map.prototype.has(key)
      // 23.2.3.7 Set.prototype.has(value)
      has: function has(key){
        return !!getEntry(this, key);
      }
    });
    if(DESCRIPTORS)dP(C.prototype, 'size', {
      get: function(){
        return defined(this[SIZE]);
      }
    });
    return C;
  },
  def: function(that, key, value){
    var entry = getEntry(that, key)
      , prev, index;
    // change existing entry
    if(entry){
      entry.v = value;
    // create new entry
    } else {
      that._l = entry = {
        i: index = fastKey(key, true), // <- index
        k: key,                        // <- key
        v: value,                      // <- value
        p: prev = that._l,             // <- previous entry
        n: undefined,                  // <- next entry
        r: false                       // <- removed
      };
      if(!that._f)that._f = entry;
      if(prev)prev.n = entry;
      that[SIZE]++;
      // add to index
      if(index !== 'F')that._i[index] = entry;
    } return that;
  },
  getEntry: getEntry,
  setStrong: function(C, NAME, IS_MAP){
    // add .keys, .values, .entries, [@@iterator]
    // 23.1.3.4, 23.1.3.8, 23.1.3.11, 23.1.3.12, 23.2.3.5, 23.2.3.8, 23.2.3.10, 23.2.3.11
    $iterDefine(C, NAME, function(iterated, kind){
      this._t = iterated;  // target
      this._k = kind;      // kind
      this._l = undefined; // previous
    }, function(){
      var that  = this
        , kind  = that._k
        , entry = that._l;
      // revert to the last existing entry
      while(entry && entry.r)entry = entry.p;
      // get next entry
      if(!that._t || !(that._l = entry = entry ? entry.n : that._t._f)){
        // or finish the iteration
        that._t = undefined;
        return step(1);
      }
      // return step by kind
      if(kind == 'keys'  )return step(0, entry.k);
      if(kind == 'values')return step(0, entry.v);
      return step(0, [entry.k, entry.v]);
    }, IS_MAP ? 'entries' : 'values' , !IS_MAP, true);

    // add [@@species], 23.1.2.2, 23.2.2.2
    setSpecies(NAME);
  }
};
},{"./_an-instance":6,"./_ctx":23,"./_defined":25,"./_descriptors":26,"./_for-of":35,"./_hide":38,"./_iter-define":51,"./_iter-step":53,"./_meta":60,"./_object-create":64,"./_object-dp":65,"./_redefine-all":84,"./_set-species":89}],19:[function(require,module,exports){
// https://github.com/DavidBruant/Map-Set.prototype.toJSON
var classof = require('./_classof')
  , from    = require('./_array-from-iterable');
module.exports = function(NAME){
  return function toJSON(){
    if(classof(this) != NAME)throw TypeError(NAME + "#toJSON isn't generic");
    return from(this);
  };
};
},{"./_array-from-iterable":10,"./_classof":16}],20:[function(require,module,exports){
'use strict';
var redefineAll       = require('./_redefine-all')
  , getWeak           = require('./_meta').getWeak
  , anObject          = require('./_an-object')
  , isObject          = require('./_is-object')
  , anInstance        = require('./_an-instance')
  , forOf             = require('./_for-of')
  , createArrayMethod = require('./_array-methods')
  , $has              = require('./_has')
  , arrayFind         = createArrayMethod(5)
  , arrayFindIndex    = createArrayMethod(6)
  , id                = 0;

// fallback for uncaught frozen keys
var uncaughtFrozenStore = function(that){
  return that._l || (that._l = new UncaughtFrozenStore);
};
var UncaughtFrozenStore = function(){
  this.a = [];
};
var findUncaughtFrozen = function(store, key){
  return arrayFind(store.a, function(it){
    return it[0] === key;
  });
};
UncaughtFrozenStore.prototype = {
  get: function(key){
    var entry = findUncaughtFrozen(this, key);
    if(entry)return entry[1];
  },
  has: function(key){
    return !!findUncaughtFrozen(this, key);
  },
  set: function(key, value){
    var entry = findUncaughtFrozen(this, key);
    if(entry)entry[1] = value;
    else this.a.push([key, value]);
  },
  'delete': function(key){
    var index = arrayFindIndex(this.a, function(it){
      return it[0] === key;
    });
    if(~index)this.a.splice(index, 1);
    return !!~index;
  }
};

module.exports = {
  getConstructor: function(wrapper, NAME, IS_MAP, ADDER){
    var C = wrapper(function(that, iterable){
      anInstance(that, C, NAME, '_i');
      that._i = id++;      // collection id
      that._l = undefined; // leak store for uncaught frozen objects
      if(iterable != undefined)forOf(iterable, IS_MAP, that[ADDER], that);
    });
    redefineAll(C.prototype, {
      // 23.3.3.2 WeakMap.prototype.delete(key)
      // 23.4.3.3 WeakSet.prototype.delete(value)
      'delete': function(key){
        if(!isObject(key))return false;
        var data = getWeak(key);
        if(data === true)return uncaughtFrozenStore(this)['delete'](key);
        return data && $has(data, this._i) && delete data[this._i];
      },
      // 23.3.3.4 WeakMap.prototype.has(key)
      // 23.4.3.4 WeakSet.prototype.has(value)
      has: function has(key){
        if(!isObject(key))return false;
        var data = getWeak(key);
        if(data === true)return uncaughtFrozenStore(this).has(key);
        return data && $has(data, this._i);
      }
    });
    return C;
  },
  def: function(that, key, value){
    var data = getWeak(anObject(key), true);
    if(data === true)uncaughtFrozenStore(that).set(key, value);
    else data[that._i] = value;
    return that;
  },
  ufstore: uncaughtFrozenStore
};
},{"./_an-instance":6,"./_an-object":7,"./_array-methods":12,"./_for-of":35,"./_has":37,"./_is-object":47,"./_meta":60,"./_redefine-all":84}],21:[function(require,module,exports){
'use strict';
var global            = require('./_global')
  , $export           = require('./_export')
  , redefine          = require('./_redefine')
  , redefineAll       = require('./_redefine-all')
  , meta              = require('./_meta')
  , forOf             = require('./_for-of')
  , anInstance        = require('./_an-instance')
  , isObject          = require('./_is-object')
  , fails             = require('./_fails')
  , $iterDetect       = require('./_iter-detect')
  , setToStringTag    = require('./_set-to-string-tag')
  , inheritIfRequired = require('./_inherit-if-required');

module.exports = function(NAME, wrapper, methods, common, IS_MAP, IS_WEAK){
  var Base  = global[NAME]
    , C     = Base
    , ADDER = IS_MAP ? 'set' : 'add'
    , proto = C && C.prototype
    , O     = {};
  var fixMethod = function(KEY){
    var fn = proto[KEY];
    redefine(proto, KEY,
      KEY == 'delete' ? function(a){
        return IS_WEAK && !isObject(a) ? false : fn.call(this, a === 0 ? 0 : a);
      } : KEY == 'has' ? function has(a){
        return IS_WEAK && !isObject(a) ? false : fn.call(this, a === 0 ? 0 : a);
      } : KEY == 'get' ? function get(a){
        return IS_WEAK && !isObject(a) ? undefined : fn.call(this, a === 0 ? 0 : a);
      } : KEY == 'add' ? function add(a){ fn.call(this, a === 0 ? 0 : a); return this; }
        : function set(a, b){ fn.call(this, a === 0 ? 0 : a, b); return this; }
    );
  };
  if(typeof C != 'function' || !(IS_WEAK || proto.forEach && !fails(function(){
    new C().entries().next();
  }))){
    // create collection constructor
    C = common.getConstructor(wrapper, NAME, IS_MAP, ADDER);
    redefineAll(C.prototype, methods);
    meta.NEED = true;
  } else {
    var instance             = new C
      // early implementations not supports chaining
      , HASNT_CHAINING       = instance[ADDER](IS_WEAK ? {} : -0, 1) != instance
      // V8 ~  Chromium 40- weak-collections throws on primitives, but should return false
      , THROWS_ON_PRIMITIVES = fails(function(){ instance.has(1); })
      // most early implementations doesn't supports iterables, most modern - not close it correctly
      , ACCEPT_ITERABLES     = $iterDetect(function(iter){ new C(iter); }) // eslint-disable-line no-new
      // for early implementations -0 and +0 not the same
      , BUGGY_ZERO = !IS_WEAK && fails(function(){
        // V8 ~ Chromium 42- fails only with 5+ elements
        var $instance = new C()
          , index     = 5;
        while(index--)$instance[ADDER](index, index);
        return !$instance.has(-0);
      });
    if(!ACCEPT_ITERABLES){ 
      C = wrapper(function(target, iterable){
        anInstance(target, C, NAME);
        var that = inheritIfRequired(new Base, target, C);
        if(iterable != undefined)forOf(iterable, IS_MAP, that[ADDER], that);
        return that;
      });
      C.prototype = proto;
      proto.constructor = C;
    }
    if(THROWS_ON_PRIMITIVES || BUGGY_ZERO){
      fixMethod('delete');
      fixMethod('has');
      IS_MAP && fixMethod('get');
    }
    if(BUGGY_ZERO || HASNT_CHAINING)fixMethod(ADDER);
    // weak collections should not contains .clear method
    if(IS_WEAK && proto.clear)delete proto.clear;
  }

  setToStringTag(C, NAME);

  O[NAME] = C;
  $export($export.G + $export.W + $export.F * (C != Base), O);

  if(!IS_WEAK)common.setStrong(C, NAME, IS_MAP);

  return C;
};
},{"./_an-instance":6,"./_export":30,"./_fails":32,"./_for-of":35,"./_global":36,"./_inherit-if-required":41,"./_is-object":47,"./_iter-detect":52,"./_meta":60,"./_redefine":85,"./_redefine-all":84,"./_set-to-string-tag":90}],22:[function(require,module,exports){
var core = module.exports = {version: '2.2.1'};
if(typeof __e == 'number')__e = core; // eslint-disable-line no-undef
},{}],23:[function(require,module,exports){
// optional / simple context binding
var aFunction = require('./_a-function');
module.exports = function(fn, that, length){
  aFunction(fn);
  if(that === undefined)return fn;
  switch(length){
    case 1: return function(a){
      return fn.call(that, a);
    };
    case 2: return function(a, b){
      return fn.call(that, a, b);
    };
    case 3: return function(a, b, c){
      return fn.call(that, a, b, c);
    };
  }
  return function(/* ...args */){
    return fn.apply(that, arguments);
  };
};
},{"./_a-function":3}],24:[function(require,module,exports){
'use strict';
var anObject    = require('./_an-object')
  , toPrimitive = require('./_to-primitive')
  , NUMBER      = 'number';

module.exports = function(hint){
  if(hint !== 'string' && hint !== NUMBER && hint !== 'default')throw TypeError('Incorrect hint');
  return toPrimitive(anObject(this), hint != NUMBER);
};
},{"./_an-object":7,"./_to-primitive":108}],25:[function(require,module,exports){
// 7.2.1 RequireObjectCoercible(argument)
module.exports = function(it){
  if(it == undefined)throw TypeError("Can't call method on  " + it);
  return it;
};
},{}],26:[function(require,module,exports){
// Thank's IE8 for his funny defineProperty
module.exports = !require('./_fails')(function(){
  return Object.defineProperty({}, 'a', {get: function(){ return 7; }}).a != 7;
});
},{"./_fails":32}],27:[function(require,module,exports){
var isObject = require('./_is-object')
  , document = require('./_global').document
  // in old IE typeof document.createElement is 'object'
  , is = isObject(document) && isObject(document.createElement);
module.exports = function(it){
  return is ? document.createElement(it) : {};
};
},{"./_global":36,"./_is-object":47}],28:[function(require,module,exports){
// IE 8- don't enum bug keys
module.exports = (
  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
).split(',');
},{}],29:[function(require,module,exports){
// all enumerable object keys, includes symbols
var getKeys = require('./_object-keys')
  , gOPS    = require('./_object-gops')
  , pIE     = require('./_object-pie');
module.exports = function(it){
  var result     = getKeys(it)
    , getSymbols = gOPS.f;
  if(getSymbols){
    var symbols = getSymbols(it)
      , isEnum  = pIE.f
      , i       = 0
      , key;
    while(symbols.length > i)if(isEnum.call(it, key = symbols[i++]))result.push(key);
  } return result;
};
},{"./_object-gops":71,"./_object-keys":74,"./_object-pie":75}],30:[function(require,module,exports){
var global    = require('./_global')
  , core      = require('./_core')
  , hide      = require('./_hide')
  , redefine  = require('./_redefine')
  , ctx       = require('./_ctx')
  , PROTOTYPE = 'prototype';

var $export = function(type, name, source){
  var IS_FORCED = type & $export.F
    , IS_GLOBAL = type & $export.G
    , IS_STATIC = type & $export.S
    , IS_PROTO  = type & $export.P
    , IS_BIND   = type & $export.B
    , target    = IS_GLOBAL ? global : IS_STATIC ? global[name] || (global[name] = {}) : (global[name] || {})[PROTOTYPE]
    , exports   = IS_GLOBAL ? core : core[name] || (core[name] = {})
    , expProto  = exports[PROTOTYPE] || (exports[PROTOTYPE] = {})
    , key, own, out, exp;
  if(IS_GLOBAL)source = name;
  for(key in source){
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined;
    // export native or passed
    out = (own ? target : source)[key];
    // bind timers to global for call from export context
    exp = IS_BIND && own ? ctx(out, global) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
    // extend global
    if(target)redefine(target, key, out, type & $export.U);
    // export
    if(exports[key] != out)hide(exports, key, exp);
    if(IS_PROTO && expProto[key] != out)expProto[key] = out;
  }
};
global.core = core;
// type bitmap
$export.F = 1;   // forced
$export.G = 2;   // global
$export.S = 4;   // static
$export.P = 8;   // proto
$export.B = 16;  // bind
$export.W = 32;  // wrap
$export.U = 64;  // safe
$export.R = 128; // real proto method for `library` 
module.exports = $export;
},{"./_core":22,"./_ctx":23,"./_global":36,"./_hide":38,"./_redefine":85}],31:[function(require,module,exports){
var MATCH = require('./_wks')('match');
module.exports = function(KEY){
  var re = /./;
  try {
    '/./'[KEY](re);
  } catch(e){
    try {
      re[MATCH] = false;
      return !'/./'[KEY](re);
    } catch(f){ /* empty */ }
  } return true;
};
},{"./_wks":113}],32:[function(require,module,exports){
module.exports = function(exec){
  try {
    return !!exec();
  } catch(e){
    return true;
  }
};
},{}],33:[function(require,module,exports){
'use strict';
var hide     = require('./_hide')
  , redefine = require('./_redefine')
  , fails    = require('./_fails')
  , defined  = require('./_defined')
  , wks      = require('./_wks');

module.exports = function(KEY, length, exec){
  var SYMBOL   = wks(KEY)
    , fns      = exec(defined, SYMBOL, ''[KEY])
    , strfn    = fns[0]
    , rxfn     = fns[1];
  if(fails(function(){
    var O = {};
    O[SYMBOL] = function(){ return 7; };
    return ''[KEY](O) != 7;
  })){
    redefine(String.prototype, KEY, strfn);
    hide(RegExp.prototype, SYMBOL, length == 2
      // 21.2.5.8 RegExp.prototype[@@replace](string, replaceValue)
      // 21.2.5.11 RegExp.prototype[@@split](string, limit)
      ? function(string, arg){ return rxfn.call(string, this, arg); }
      // 21.2.5.6 RegExp.prototype[@@match](string)
      // 21.2.5.9 RegExp.prototype[@@search](string)
      : function(string){ return rxfn.call(string, this); }
    );
  }
};
},{"./_defined":25,"./_fails":32,"./_hide":38,"./_redefine":85,"./_wks":113}],34:[function(require,module,exports){
'use strict';
// 21.2.5.3 get RegExp.prototype.flags
var anObject = require('./_an-object');
module.exports = function(){
  var that   = anObject(this)
    , result = '';
  if(that.global)     result += 'g';
  if(that.ignoreCase) result += 'i';
  if(that.multiline)  result += 'm';
  if(that.unicode)    result += 'u';
  if(that.sticky)     result += 'y';
  return result;
};
},{"./_an-object":7}],35:[function(require,module,exports){
var ctx         = require('./_ctx')
  , call        = require('./_iter-call')
  , isArrayIter = require('./_is-array-iter')
  , anObject    = require('./_an-object')
  , toLength    = require('./_to-length')
  , getIterFn   = require('./core.get-iterator-method');
module.exports = function(iterable, entries, fn, that, ITERATOR){
  var iterFn = ITERATOR ? function(){ return iterable; } : getIterFn(iterable)
    , f      = ctx(fn, that, entries ? 2 : 1)
    , index  = 0
    , length, step, iterator;
  if(typeof iterFn != 'function')throw TypeError(iterable + ' is not iterable!');
  // fast case for arrays with default iterator
  if(isArrayIter(iterFn))for(length = toLength(iterable.length); length > index; index++){
    entries ? f(anObject(step = iterable[index])[0], step[1]) : f(iterable[index]);
  } else for(iterator = iterFn.call(iterable); !(step = iterator.next()).done; ){
    call(iterator, f, step.value, entries);
  }
};
},{"./_an-object":7,"./_ctx":23,"./_is-array-iter":44,"./_iter-call":49,"./_to-length":106,"./core.get-iterator-method":114}],36:[function(require,module,exports){
// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self : Function('return this')();
if(typeof __g == 'number')__g = global; // eslint-disable-line no-undef
},{}],37:[function(require,module,exports){
var hasOwnProperty = {}.hasOwnProperty;
module.exports = function(it, key){
  return hasOwnProperty.call(it, key);
};
},{}],38:[function(require,module,exports){
var dP         = require('./_object-dp')
  , createDesc = require('./_property-desc');
module.exports = require('./_descriptors') ? function(object, key, value){
  return dP.f(object, key, createDesc(1, value));
} : function(object, key, value){
  object[key] = value;
  return object;
};
},{"./_descriptors":26,"./_object-dp":65,"./_property-desc":83}],39:[function(require,module,exports){
module.exports = require('./_global').document && document.documentElement;
},{"./_global":36}],40:[function(require,module,exports){
module.exports = !require('./_descriptors') && !require('./_fails')(function(){
  return Object.defineProperty(require('./_dom-create')('div'), 'a', {get: function(){ return 7; }}).a != 7;
});
},{"./_descriptors":26,"./_dom-create":27,"./_fails":32}],41:[function(require,module,exports){
var isObject       = require('./_is-object')
  , setPrototypeOf = require('./_set-proto').set;
module.exports = function(that, target, C){
  var P, S = target.constructor;
  if(S !== C && typeof S == 'function' && (P = S.prototype) !== C.prototype && isObject(P) && setPrototypeOf){
    setPrototypeOf(that, P);
  } return that;
};
},{"./_is-object":47,"./_set-proto":88}],42:[function(require,module,exports){
// fast apply, http://jsperf.lnkit.com/fast-apply/5
module.exports = function(fn, args, that){
  var un = that === undefined;
  switch(args.length){
    case 0: return un ? fn()
                      : fn.call(that);
    case 1: return un ? fn(args[0])
                      : fn.call(that, args[0]);
    case 2: return un ? fn(args[0], args[1])
                      : fn.call(that, args[0], args[1]);
    case 3: return un ? fn(args[0], args[1], args[2])
                      : fn.call(that, args[0], args[1], args[2]);
    case 4: return un ? fn(args[0], args[1], args[2], args[3])
                      : fn.call(that, args[0], args[1], args[2], args[3]);
  } return              fn.apply(that, args);
};
},{}],43:[function(require,module,exports){
// fallback for non-array-like ES3 and non-enumerable old V8 strings
var cof = require('./_cof');
module.exports = Object('z').propertyIsEnumerable(0) ? Object : function(it){
  return cof(it) == 'String' ? it.split('') : Object(it);
};
},{"./_cof":17}],44:[function(require,module,exports){
// check on default Array iterator
var Iterators  = require('./_iterators')
  , ITERATOR   = require('./_wks')('iterator')
  , ArrayProto = Array.prototype;

module.exports = function(it){
  return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
};
},{"./_iterators":54,"./_wks":113}],45:[function(require,module,exports){
// 7.2.2 IsArray(argument)
var cof = require('./_cof');
module.exports = Array.isArray || function isArray(arg){
  return cof(arg) == 'Array';
};
},{"./_cof":17}],46:[function(require,module,exports){
// 20.1.2.3 Number.isInteger(number)
var isObject = require('./_is-object')
  , floor    = Math.floor;
module.exports = function isInteger(it){
  return !isObject(it) && isFinite(it) && floor(it) === it;
};
},{"./_is-object":47}],47:[function(require,module,exports){
module.exports = function(it){
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};
},{}],48:[function(require,module,exports){
// 7.2.8 IsRegExp(argument)
var isObject = require('./_is-object')
  , cof      = require('./_cof')
  , MATCH    = require('./_wks')('match');
module.exports = function(it){
  var isRegExp;
  return isObject(it) && ((isRegExp = it[MATCH]) !== undefined ? !!isRegExp : cof(it) == 'RegExp');
};
},{"./_cof":17,"./_is-object":47,"./_wks":113}],49:[function(require,module,exports){
// call something on iterator step with safe closing on error
var anObject = require('./_an-object');
module.exports = function(iterator, fn, value, entries){
  try {
    return entries ? fn(anObject(value)[0], value[1]) : fn(value);
  // 7.4.6 IteratorClose(iterator, completion)
  } catch(e){
    var ret = iterator['return'];
    if(ret !== undefined)anObject(ret.call(iterator));
    throw e;
  }
};
},{"./_an-object":7}],50:[function(require,module,exports){
'use strict';
var create         = require('./_object-create')
  , descriptor     = require('./_property-desc')
  , setToStringTag = require('./_set-to-string-tag')
  , IteratorPrototype = {};

// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
require('./_hide')(IteratorPrototype, require('./_wks')('iterator'), function(){ return this; });

module.exports = function(Constructor, NAME, next){
  Constructor.prototype = create(IteratorPrototype, {next: descriptor(1, next)});
  setToStringTag(Constructor, NAME + ' Iterator');
};
},{"./_hide":38,"./_object-create":64,"./_property-desc":83,"./_set-to-string-tag":90,"./_wks":113}],51:[function(require,module,exports){
'use strict';
var LIBRARY        = require('./_library')
  , $export        = require('./_export')
  , redefine       = require('./_redefine')
  , hide           = require('./_hide')
  , has            = require('./_has')
  , Iterators      = require('./_iterators')
  , $iterCreate    = require('./_iter-create')
  , setToStringTag = require('./_set-to-string-tag')
  , getPrototypeOf = require('./_object-gpo')
  , ITERATOR       = require('./_wks')('iterator')
  , BUGGY          = !([].keys && 'next' in [].keys()) // Safari has buggy iterators w/o `next`
  , FF_ITERATOR    = '@@iterator'
  , KEYS           = 'keys'
  , VALUES         = 'values';

var returnThis = function(){ return this; };

module.exports = function(Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED){
  $iterCreate(Constructor, NAME, next);
  var getMethod = function(kind){
    if(!BUGGY && kind in proto)return proto[kind];
    switch(kind){
      case KEYS: return function keys(){ return new Constructor(this, kind); };
      case VALUES: return function values(){ return new Constructor(this, kind); };
    } return function entries(){ return new Constructor(this, kind); };
  };
  var TAG        = NAME + ' Iterator'
    , DEF_VALUES = DEFAULT == VALUES
    , VALUES_BUG = false
    , proto      = Base.prototype
    , $native    = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT]
    , $default   = $native || getMethod(DEFAULT)
    , $entries   = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined
    , $anyNative = NAME == 'Array' ? proto.entries || $native : $native
    , methods, key, IteratorPrototype;
  // Fix native
  if($anyNative){
    IteratorPrototype = getPrototypeOf($anyNative.call(new Base));
    if(IteratorPrototype !== Object.prototype){
      // Set @@toStringTag to native iterators
      setToStringTag(IteratorPrototype, TAG, true);
      // fix for some old engines
      if(!LIBRARY && !has(IteratorPrototype, ITERATOR))hide(IteratorPrototype, ITERATOR, returnThis);
    }
  }
  // fix Array#{values, @@iterator}.name in V8 / FF
  if(DEF_VALUES && $native && $native.name !== VALUES){
    VALUES_BUG = true;
    $default = function values(){ return $native.call(this); };
  }
  // Define iterator
  if((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])){
    hide(proto, ITERATOR, $default);
  }
  // Plug for library
  Iterators[NAME] = $default;
  Iterators[TAG]  = returnThis;
  if(DEFAULT){
    methods = {
      values:  DEF_VALUES ? $default : getMethod(VALUES),
      keys:    IS_SET     ? $default : getMethod(KEYS),
      entries: $entries
    };
    if(FORCED)for(key in methods){
      if(!(key in proto))redefine(proto, key, methods[key]);
    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
  }
  return methods;
};
},{"./_export":30,"./_has":37,"./_hide":38,"./_iter-create":50,"./_iterators":54,"./_library":56,"./_object-gpo":72,"./_redefine":85,"./_set-to-string-tag":90,"./_wks":113}],52:[function(require,module,exports){
var ITERATOR     = require('./_wks')('iterator')
  , SAFE_CLOSING = false;

try {
  var riter = [7][ITERATOR]();
  riter['return'] = function(){ SAFE_CLOSING = true; };
  Array.from(riter, function(){ throw 2; });
} catch(e){ /* empty */ }

module.exports = function(exec, skipClosing){
  if(!skipClosing && !SAFE_CLOSING)return false;
  var safe = false;
  try {
    var arr  = [7]
      , iter = arr[ITERATOR]();
    iter.next = function(){ safe = true; };
    arr[ITERATOR] = function(){ return iter; };
    exec(arr);
  } catch(e){ /* empty */ }
  return safe;
};
},{"./_wks":113}],53:[function(require,module,exports){
module.exports = function(done, value){
  return {value: value, done: !!done};
};
},{}],54:[function(require,module,exports){
module.exports = {};
},{}],55:[function(require,module,exports){
var getKeys   = require('./_object-keys')
  , toIObject = require('./_to-iobject');
module.exports = function(object, el){
  var O      = toIObject(object)
    , keys   = getKeys(O)
    , length = keys.length
    , index  = 0
    , key;
  while(length > index)if(O[key = keys[index++]] === el)return key;
};
},{"./_object-keys":74,"./_to-iobject":105}],56:[function(require,module,exports){
module.exports = false;
},{}],57:[function(require,module,exports){
// 20.2.2.14 Math.expm1(x)
module.exports = Math.expm1 || function expm1(x){
  return (x = +x) == 0 ? x : x > -1e-6 && x < 1e-6 ? x + x * x / 2 : Math.exp(x) - 1;
};
},{}],58:[function(require,module,exports){
// 20.2.2.20 Math.log1p(x)
module.exports = Math.log1p || function log1p(x){
  return (x = +x) > -1e-8 && x < 1e-8 ? x - x * x / 2 : Math.log(1 + x);
};
},{}],59:[function(require,module,exports){
// 20.2.2.28 Math.sign(x)
module.exports = Math.sign || function sign(x){
  return (x = +x) == 0 || x != x ? x : x < 0 ? -1 : 1;
};
},{}],60:[function(require,module,exports){
var META     = require('./_uid')('meta')
  , isObject = require('./_is-object')
  , has      = require('./_has')
  , setDesc  = require('./_object-dp').f
  , id       = 0;
var isExtensible = Object.isExtensible || function(){
  return true;
};
var FREEZE = !require('./_fails')(function(){
  return isExtensible(Object.preventExtensions({}));
});
var setMeta = function(it){
  setDesc(it, META, {value: {
    i: 'O' + ++id, // object ID
    w: {}          // weak collections IDs
  }});
};
var fastKey = function(it, create){
  // return primitive with prefix
  if(!isObject(it))return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
  if(!has(it, META)){
    // can't set metadata to uncaught frozen object
    if(!isExtensible(it))return 'F';
    // not necessary to add metadata
    if(!create)return 'E';
    // add missing metadata
    setMeta(it);
  // return object ID
  } return it[META].i;
};
var getWeak = function(it, create){
  if(!has(it, META)){
    // can't set metadata to uncaught frozen object
    if(!isExtensible(it))return true;
    // not necessary to add metadata
    if(!create)return false;
    // add missing metadata
    setMeta(it);
  // return hash weak collections IDs
  } return it[META].w;
};
// add metadata on freeze-family methods calling
var onFreeze = function(it){
  if(FREEZE && meta.NEED && isExtensible(it) && !has(it, META))setMeta(it);
  return it;
};
var meta = module.exports = {
  KEY:      META,
  NEED:     false,
  fastKey:  fastKey,
  getWeak:  getWeak,
  onFreeze: onFreeze
};
},{"./_fails":32,"./_has":37,"./_is-object":47,"./_object-dp":65,"./_uid":112}],61:[function(require,module,exports){
var Map     = require('./es6.map')
  , $export = require('./_export')
  , shared  = require('./_shared')('metadata')
  , store   = shared.store || (shared.store = new (require('./es6.weak-map')));

var getOrCreateMetadataMap = function(target, targetKey, create){
  var targetMetadata = store.get(target);
  if(!targetMetadata){
    if(!create)return undefined;
    store.set(target, targetMetadata = new Map);
  }
  var keyMetadata = targetMetadata.get(targetKey);
  if(!keyMetadata){
    if(!create)return undefined;
    targetMetadata.set(targetKey, keyMetadata = new Map);
  } return keyMetadata;
};
var ordinaryHasOwnMetadata = function(MetadataKey, O, P){
  var metadataMap = getOrCreateMetadataMap(O, P, false);
  return metadataMap === undefined ? false : metadataMap.has(MetadataKey);
};
var ordinaryGetOwnMetadata = function(MetadataKey, O, P){
  var metadataMap = getOrCreateMetadataMap(O, P, false);
  return metadataMap === undefined ? undefined : metadataMap.get(MetadataKey);
};
var ordinaryDefineOwnMetadata = function(MetadataKey, MetadataValue, O, P){
  getOrCreateMetadataMap(O, P, true).set(MetadataKey, MetadataValue);
};
var ordinaryOwnMetadataKeys = function(target, targetKey){
  var metadataMap = getOrCreateMetadataMap(target, targetKey, false)
    , keys        = [];
  if(metadataMap)metadataMap.forEach(function(_, key){ keys.push(key); });
  return keys;
};
var toMetaKey = function(it){
  return it === undefined || typeof it == 'symbol' ? it : String(it);
};
var exp = function(O){
  $export($export.S, 'Reflect', O);
};

module.exports = {
  store: store,
  map: getOrCreateMetadataMap,
  has: ordinaryHasOwnMetadata,
  get: ordinaryGetOwnMetadata,
  set: ordinaryDefineOwnMetadata,
  keys: ordinaryOwnMetadataKeys,
  key: toMetaKey,
  exp: exp
};
},{"./_export":30,"./_shared":92,"./es6.map":146,"./es6.weak-map":252}],62:[function(require,module,exports){
var global    = require('./_global')
  , macrotask = require('./_task').set
  , Observer  = global.MutationObserver || global.WebKitMutationObserver
  , process   = global.process
  , Promise   = global.Promise
  , isNode    = require('./_cof')(process) == 'process'
  , head, last, notify;

var flush = function(){
  var parent, fn;
  if(isNode && (parent = process.domain))parent.exit();
  while(head){
    fn = head.fn;
    fn(); // <- currently we use it only for Promise - try / catch not required
    head = head.next;
  } last = undefined;
  if(parent)parent.enter();
};

// Node.js
if(isNode){
  notify = function(){
    process.nextTick(flush);
  };
// browsers with MutationObserver
} else if(Observer){
  var toggle = true
    , node   = document.createTextNode('');
  new Observer(flush).observe(node, {characterData: true}); // eslint-disable-line no-new
  notify = function(){
    node.data = toggle = !toggle;
  };
// environments with maybe non-completely correct, but existent Promise
} else if(Promise && Promise.resolve){
  notify = function(){
    Promise.resolve().then(flush);
  };
// for other environments - macrotask based on:
// - setImmediate
// - MessageChannel
// - window.postMessag
// - onreadystatechange
// - setTimeout
} else {
  notify = function(){
    // strange IE + webpack dev server bug - use .call(global)
    macrotask.call(global, flush);
  };
}

module.exports = function(fn){
  var task = {fn: fn, next: undefined};
  if(last)last.next = task;
  if(!head){
    head = task;
    notify();
  } last = task;
};
},{"./_cof":17,"./_global":36,"./_task":102}],63:[function(require,module,exports){
'use strict';
// 19.1.2.1 Object.assign(target, source, ...)
var getKeys  = require('./_object-keys')
  , gOPS     = require('./_object-gops')
  , pIE      = require('./_object-pie')
  , toObject = require('./_to-object')
  , IObject  = require('./_iobject')
  , $assign  = Object.assign;

// should work with symbols and should have deterministic property order (V8 bug)
module.exports = !$assign || require('./_fails')(function(){
  var A = {}
    , B = {}
    , S = Symbol()
    , K = 'abcdefghijklmnopqrst';
  A[S] = 7;
  K.split('').forEach(function(k){ B[k] = k; });
  return $assign({}, A)[S] != 7 || Object.keys($assign({}, B)).join('') != K;
}) ? function assign(target, source){ // eslint-disable-line no-unused-vars
  var T     = toObject(target)
    , aLen  = arguments.length
    , index = 1
    , getSymbols = gOPS.f
    , isEnum     = pIE.f;
  while(aLen > index){
    var S      = IObject(arguments[index++])
      , keys   = getSymbols ? getKeys(S).concat(getSymbols(S)) : getKeys(S)
      , length = keys.length
      , j      = 0
      , key;
    while(length > j)if(isEnum.call(S, key = keys[j++]))T[key] = S[key];
  } return T;
} : $assign;
},{"./_fails":32,"./_iobject":43,"./_object-gops":71,"./_object-keys":74,"./_object-pie":75,"./_to-object":107}],64:[function(require,module,exports){
// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
var anObject    = require('./_an-object')
  , dPs         = require('./_object-dps')
  , enumBugKeys = require('./_enum-bug-keys')
  , IE_PROTO    = require('./_shared-key')('IE_PROTO')
  , Empty       = function(){ /* empty */ }
  , PROTOTYPE   = 'prototype';

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var createDict = function(){
  // Thrash, waste and sodomy: IE GC bug
  var iframe = require('./_dom-create')('iframe')
    , i      = enumBugKeys.length
    , gt     = '>'
    , iframeDocument;
  iframe.style.display = 'none';
  require('./_html').appendChild(iframe);
  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
  // createDict = iframe.contentWindow.Object;
  // html.removeChild(iframe);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write('<script>document.F=Object</script' + gt);
  iframeDocument.close();
  createDict = iframeDocument.F;
  while(i--)delete createDict[PROTOTYPE][enumBugKeys[i]];
  return createDict();
};

module.exports = Object.create || function create(O, Properties){
  var result;
  if(O !== null){
    Empty[PROTOTYPE] = anObject(O);
    result = new Empty;
    Empty[PROTOTYPE] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO] = O;
  } else result = createDict();
  return Properties === undefined ? result : dPs(result, Properties);
};
},{"./_an-object":7,"./_dom-create":27,"./_enum-bug-keys":28,"./_html":39,"./_object-dps":66,"./_shared-key":91}],65:[function(require,module,exports){
var anObject       = require('./_an-object')
  , IE8_DOM_DEFINE = require('./_ie8-dom-define')
  , toPrimitive    = require('./_to-primitive')
  , dP             = Object.defineProperty;

exports.f = require('./_descriptors') ? Object.defineProperty : function defineProperty(O, P, Attributes){
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if(IE8_DOM_DEFINE)try {
    return dP(O, P, Attributes);
  } catch(e){ /* empty */ }
  if('get' in Attributes || 'set' in Attributes)throw TypeError('Accessors not supported!');
  if('value' in Attributes)O[P] = Attributes.value;
  return O;
};
},{"./_an-object":7,"./_descriptors":26,"./_ie8-dom-define":40,"./_to-primitive":108}],66:[function(require,module,exports){
var dP       = require('./_object-dp')
  , anObject = require('./_an-object')
  , getKeys  = require('./_object-keys');

module.exports = require('./_descriptors') ? Object.defineProperties : function defineProperties(O, Properties){
  anObject(O);
  var keys   = getKeys(Properties)
    , length = keys.length
    , i = 0
    , P;
  while(length > i)dP.f(O, P = keys[i++], Properties[P]);
  return O;
};
},{"./_an-object":7,"./_descriptors":26,"./_object-dp":65,"./_object-keys":74}],67:[function(require,module,exports){
// Forced replacement prototype accessors methods
module.exports = require('./_library')|| !require('./_fails')(function(){
  var K = Math.random();
  // In FF throws only define methods
  __defineSetter__.call(null, K, function(){ /* empty */});
  delete require('./_global')[K];
});
},{"./_fails":32,"./_global":36,"./_library":56}],68:[function(require,module,exports){
var pIE            = require('./_object-pie')
  , createDesc     = require('./_property-desc')
  , toIObject      = require('./_to-iobject')
  , toPrimitive    = require('./_to-primitive')
  , has            = require('./_has')
  , IE8_DOM_DEFINE = require('./_ie8-dom-define')
  , gOPD           = Object.getOwnPropertyDescriptor;

exports.f = require('./_descriptors') ? gOPD : function getOwnPropertyDescriptor(O, P){
  O = toIObject(O);
  P = toPrimitive(P, true);
  if(IE8_DOM_DEFINE)try {
    return gOPD(O, P);
  } catch(e){ /* empty */ }
  if(has(O, P))return createDesc(!pIE.f.call(O, P), O[P]);
};
},{"./_descriptors":26,"./_has":37,"./_ie8-dom-define":40,"./_object-pie":75,"./_property-desc":83,"./_to-iobject":105,"./_to-primitive":108}],69:[function(require,module,exports){
// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
var toIObject = require('./_to-iobject')
  , gOPN      = require('./_object-gopn').f
  , toString  = {}.toString;

var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
  ? Object.getOwnPropertyNames(window) : [];

var getWindowNames = function(it){
  try {
    return gOPN(it);
  } catch(e){
    return windowNames.slice();
  }
};

module.exports.f = function getOwnPropertyNames(it){
  return windowNames && toString.call(it) == '[object Window]' ? getWindowNames(it) : gOPN(toIObject(it));
};

},{"./_object-gopn":70,"./_to-iobject":105}],70:[function(require,module,exports){
// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)
var $keys      = require('./_object-keys-internal')
  , hiddenKeys = require('./_enum-bug-keys').concat('length', 'prototype');

exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O){
  return $keys(O, hiddenKeys);
};
},{"./_enum-bug-keys":28,"./_object-keys-internal":73}],71:[function(require,module,exports){
exports.f = Object.getOwnPropertySymbols;
},{}],72:[function(require,module,exports){
// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
var has         = require('./_has')
  , toObject    = require('./_to-object')
  , IE_PROTO    = require('./_shared-key')('IE_PROTO')
  , ObjectProto = Object.prototype;

module.exports = Object.getPrototypeOf || function(O){
  O = toObject(O);
  if(has(O, IE_PROTO))return O[IE_PROTO];
  if(typeof O.constructor == 'function' && O instanceof O.constructor){
    return O.constructor.prototype;
  } return O instanceof Object ? ObjectProto : null;
};
},{"./_has":37,"./_shared-key":91,"./_to-object":107}],73:[function(require,module,exports){
var has          = require('./_has')
  , toIObject    = require('./_to-iobject')
  , arrayIndexOf = require('./_array-includes')(false)
  , IE_PROTO     = require('./_shared-key')('IE_PROTO');

module.exports = function(object, names){
  var O      = toIObject(object)
    , i      = 0
    , result = []
    , key;
  for(key in O)if(key != IE_PROTO)has(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while(names.length > i)if(has(O, key = names[i++])){
    ~arrayIndexOf(result, key) || result.push(key);
  }
  return result;
};
},{"./_array-includes":11,"./_has":37,"./_shared-key":91,"./_to-iobject":105}],74:[function(require,module,exports){
// 19.1.2.14 / 15.2.3.14 Object.keys(O)
var $keys       = require('./_object-keys-internal')
  , enumBugKeys = require('./_enum-bug-keys');

module.exports = Object.keys || function keys(O){
  return $keys(O, enumBugKeys);
};
},{"./_enum-bug-keys":28,"./_object-keys-internal":73}],75:[function(require,module,exports){
exports.f = {}.propertyIsEnumerable;
},{}],76:[function(require,module,exports){
// most Object methods by ES6 should accept primitives
var $export = require('./_export')
  , core    = require('./_core')
  , fails   = require('./_fails');
module.exports = function(KEY, exec){
  var fn  = (core.Object || {})[KEY] || Object[KEY]
    , exp = {};
  exp[KEY] = exec(fn);
  $export($export.S + $export.F * fails(function(){ fn(1); }), 'Object', exp);
};
},{"./_core":22,"./_export":30,"./_fails":32}],77:[function(require,module,exports){
var getKeys   = require('./_object-keys')
  , toIObject = require('./_to-iobject')
  , isEnum    = require('./_object-pie').f;
module.exports = function(isEntries){
  return function(it){
    var O      = toIObject(it)
      , keys   = getKeys(O)
      , length = keys.length
      , i      = 0
      , result = []
      , key;
    while(length > i)if(isEnum.call(O, key = keys[i++])){
      result.push(isEntries ? [key, O[key]] : O[key]);
    } return result;
  };
};
},{"./_object-keys":74,"./_object-pie":75,"./_to-iobject":105}],78:[function(require,module,exports){
// all object keys, includes non-enumerable and symbols
var gOPN     = require('./_object-gopn')
  , gOPS     = require('./_object-gops')
  , anObject = require('./_an-object')
  , Reflect  = require('./_global').Reflect;
module.exports = Reflect && Reflect.ownKeys || function ownKeys(it){
  var keys       = gOPN.f(anObject(it))
    , getSymbols = gOPS.f;
  return getSymbols ? keys.concat(getSymbols(it)) : keys;
};
},{"./_an-object":7,"./_global":36,"./_object-gopn":70,"./_object-gops":71}],79:[function(require,module,exports){
var $parseFloat = require('./_global').parseFloat
  , $trim       = require('./_string-trim').trim;

module.exports = 1 / $parseFloat(require('./_string-ws') + '-0') !== -Infinity ? function parseFloat(str){
  var string = $trim(String(str), 3)
    , result = $parseFloat(string);
  return result === 0 && string.charAt(0) == '-' ? -0 : result;
} : $parseFloat;
},{"./_global":36,"./_string-trim":100,"./_string-ws":101}],80:[function(require,module,exports){
var $parseInt = require('./_global').parseInt
  , $trim     = require('./_string-trim').trim
  , ws        = require('./_string-ws')
  , hex       = /^[\-+]?0[xX]/;

module.exports = $parseInt(ws + '08') !== 8 || $parseInt(ws + '0x16') !== 22 ? function parseInt(str, radix){
  var string = $trim(String(str), 3);
  return $parseInt(string, (radix >>> 0) || (hex.test(string) ? 16 : 10));
} : $parseInt;
},{"./_global":36,"./_string-trim":100,"./_string-ws":101}],81:[function(require,module,exports){
'use strict';
var path      = require('./_path')
  , invoke    = require('./_invoke')
  , aFunction = require('./_a-function');
module.exports = function(/* ...pargs */){
  var fn     = aFunction(this)
    , length = arguments.length
    , pargs  = Array(length)
    , i      = 0
    , _      = path._
    , holder = false;
  while(length > i)if((pargs[i] = arguments[i++]) === _)holder = true;
  return function(/* ...args */){
    var that = this
      , aLen = arguments.length
      , j = 0, k = 0, args;
    if(!holder && !aLen)return invoke(fn, pargs, that);
    args = pargs.slice();
    if(holder)for(;length > j; j++)if(args[j] === _)args[j] = arguments[k++];
    while(aLen > k)args.push(arguments[k++]);
    return invoke(fn, args, that);
  };
};
},{"./_a-function":3,"./_invoke":42,"./_path":82}],82:[function(require,module,exports){
module.exports = require('./_global');
},{"./_global":36}],83:[function(require,module,exports){
module.exports = function(bitmap, value){
  return {
    enumerable  : !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable    : !(bitmap & 4),
    value       : value
  };
};
},{}],84:[function(require,module,exports){
var redefine = require('./_redefine');
module.exports = function(target, src, safe){
  for(var key in src)redefine(target, key, src[key], safe);
  return target;
};
},{"./_redefine":85}],85:[function(require,module,exports){
var global    = require('./_global')
  , hide      = require('./_hide')
  , has       = require('./_has')
  , SRC       = require('./_uid')('src')
  , TO_STRING = 'toString'
  , $toString = Function[TO_STRING]
  , TPL       = ('' + $toString).split(TO_STRING);

require('./_core').inspectSource = function(it){
  return $toString.call(it);
};

(module.exports = function(O, key, val, safe){
  var isFunction = typeof val == 'function';
  if(isFunction)has(val, 'name') || hide(val, 'name', key);
  if(O[key] === val)return;
  if(isFunction)has(val, SRC) || hide(val, SRC, O[key] ? '' + O[key] : TPL.join(String(key)));
  if(O === global){
    O[key] = val;
  } else {
    if(!safe){
      delete O[key];
      hide(O, key, val);
    } else {
      if(O[key])O[key] = val;
      else hide(O, key, val);
    }
  }
// add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
})(Function.prototype, TO_STRING, function toString(){
  return typeof this == 'function' && this[SRC] || $toString.call(this);
});
},{"./_core":22,"./_global":36,"./_has":37,"./_hide":38,"./_uid":112}],86:[function(require,module,exports){
module.exports = function(regExp, replace){
  var replacer = replace === Object(replace) ? function(part){
    return replace[part];
  } : replace;
  return function(it){
    return String(it).replace(regExp, replacer);
  };
};
},{}],87:[function(require,module,exports){
// 7.2.9 SameValue(x, y)
module.exports = Object.is || function is(x, y){
  return x === y ? x !== 0 || 1 / x === 1 / y : x != x && y != y;
};
},{}],88:[function(require,module,exports){
// Works with __proto__ only. Old v8 can't work with null proto objects.
/* eslint-disable no-proto */
var isObject = require('./_is-object')
  , anObject = require('./_an-object');
var check = function(O, proto){
  anObject(O);
  if(!isObject(proto) && proto !== null)throw TypeError(proto + ": can't set as prototype!");
};
module.exports = {
  set: Object.setPrototypeOf || ('__proto__' in {} ? // eslint-disable-line
    function(test, buggy, set){
      try {
        set = require('./_ctx')(Function.call, require('./_object-gopd').f(Object.prototype, '__proto__').set, 2);
        set(test, []);
        buggy = !(test instanceof Array);
      } catch(e){ buggy = true; }
      return function setPrototypeOf(O, proto){
        check(O, proto);
        if(buggy)O.__proto__ = proto;
        else set(O, proto);
        return O;
      };
    }({}, false) : undefined),
  check: check
};
},{"./_an-object":7,"./_ctx":23,"./_is-object":47,"./_object-gopd":68}],89:[function(require,module,exports){
'use strict';
var global      = require('./_global')
  , dP          = require('./_object-dp')
  , DESCRIPTORS = require('./_descriptors')
  , SPECIES     = require('./_wks')('species');

module.exports = function(KEY){
  var C = global[KEY];
  if(DESCRIPTORS && C && !C[SPECIES])dP.f(C, SPECIES, {
    configurable: true,
    get: function(){ return this; }
  });
};
},{"./_descriptors":26,"./_global":36,"./_object-dp":65,"./_wks":113}],90:[function(require,module,exports){
var def = require('./_object-dp').f
  , has = require('./_has')
  , TAG = require('./_wks')('toStringTag');

module.exports = function(it, tag, stat){
  if(it && !has(it = stat ? it : it.prototype, TAG))def(it, TAG, {configurable: true, value: tag});
};
},{"./_has":37,"./_object-dp":65,"./_wks":113}],91:[function(require,module,exports){
var shared = require('./_shared')('keys')
  , uid    = require('./_uid');
module.exports = function(key){
  return shared[key] || (shared[key] = uid(key));
};
},{"./_shared":92,"./_uid":112}],92:[function(require,module,exports){
var global = require('./_global')
  , SHARED = '__core-js_shared__'
  , store  = global[SHARED] || (global[SHARED] = {});
module.exports = function(key){
  return store[key] || (store[key] = {});
};
},{"./_global":36}],93:[function(require,module,exports){
// 7.3.20 SpeciesConstructor(O, defaultConstructor)
var anObject  = require('./_an-object')
  , aFunction = require('./_a-function')
  , SPECIES   = require('./_wks')('species');
module.exports = function(O, D){
  var C = anObject(O).constructor, S;
  return C === undefined || (S = anObject(C)[SPECIES]) == undefined ? D : aFunction(S);
};
},{"./_a-function":3,"./_an-object":7,"./_wks":113}],94:[function(require,module,exports){
var fails = require('./_fails');

module.exports = function(method, arg){
  return !!method && fails(function(){
    arg ? method.call(null, function(){}, 1) : method.call(null);
  });
};
},{"./_fails":32}],95:[function(require,module,exports){
var toInteger = require('./_to-integer')
  , defined   = require('./_defined');
// true  -> String#at
// false -> String#codePointAt
module.exports = function(TO_STRING){
  return function(that, pos){
    var s = String(defined(that))
      , i = toInteger(pos)
      , l = s.length
      , a, b;
    if(i < 0 || i >= l)return TO_STRING ? '' : undefined;
    a = s.charCodeAt(i);
    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
      ? TO_STRING ? s.charAt(i) : a
      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
  };
};
},{"./_defined":25,"./_to-integer":104}],96:[function(require,module,exports){
// helper for String#{startsWith, endsWith, includes}
var isRegExp = require('./_is-regexp')
  , defined  = require('./_defined');

module.exports = function(that, searchString, NAME){
  if(isRegExp(searchString))throw TypeError('String#' + NAME + " doesn't accept regex!");
  return String(defined(that));
};
},{"./_defined":25,"./_is-regexp":48}],97:[function(require,module,exports){
var $export = require('./_export')
  , fails   = require('./_fails')
  , defined = require('./_defined')
  , quot    = /"/g;
// B.2.3.2.1 CreateHTML(string, tag, attribute, value)
var createHTML = function(string, tag, attribute, value) {
  var S  = String(defined(string))
    , p1 = '<' + tag;
  if(attribute !== '')p1 += ' ' + attribute + '="' + String(value).replace(quot, '&quot;') + '"';
  return p1 + '>' + S + '</' + tag + '>';
};
module.exports = function(NAME, exec){
  var O = {};
  O[NAME] = exec(createHTML);
  $export($export.P + $export.F * fails(function(){
    var test = ''[NAME]('"');
    return test !== test.toLowerCase() || test.split('"').length > 3;
  }), 'String', O);
};
},{"./_defined":25,"./_export":30,"./_fails":32}],98:[function(require,module,exports){
// https://github.com/tc39/proposal-string-pad-start-end
var toLength = require('./_to-length')
  , repeat   = require('./_string-repeat')
  , defined  = require('./_defined');

module.exports = function(that, maxLength, fillString, left){
  var S            = String(defined(that))
    , stringLength = S.length
    , fillStr      = fillString === undefined ? ' ' : String(fillString)
    , intMaxLength = toLength(maxLength);
  if(intMaxLength <= stringLength)return S;
  if(fillStr == '')fillStr = ' ';
  var fillLen = intMaxLength - stringLength
    , stringFiller = repeat.call(fillStr, Math.ceil(fillLen / fillStr.length));
  if(stringFiller.length > fillLen)stringFiller = stringFiller.slice(0, fillLen);
  return left ? stringFiller + S : S + stringFiller;
};

},{"./_defined":25,"./_string-repeat":99,"./_to-length":106}],99:[function(require,module,exports){
'use strict';
var toInteger = require('./_to-integer')
  , defined   = require('./_defined');

module.exports = function repeat(count){
  var str = String(defined(this))
    , res = ''
    , n   = toInteger(count);
  if(n < 0 || n == Infinity)throw RangeError("Count can't be negative");
  for(;n > 0; (n >>>= 1) && (str += str))if(n & 1)res += str;
  return res;
};
},{"./_defined":25,"./_to-integer":104}],100:[function(require,module,exports){
var $export = require('./_export')
  , defined = require('./_defined')
  , fails   = require('./_fails')
  , spaces  = require('./_string-ws')
  , space   = '[' + spaces + ']'
  , non     = '\u200b\u0085'
  , ltrim   = RegExp('^' + space + space + '*')
  , rtrim   = RegExp(space + space + '*$');

var exporter = function(KEY, exec, ALIAS){
  var exp   = {};
  var FORCE = fails(function(){
    return !!spaces[KEY]() || non[KEY]() != non;
  });
  var fn = exp[KEY] = FORCE ? exec(trim) : spaces[KEY];
  if(ALIAS)exp[ALIAS] = fn;
  $export($export.P + $export.F * FORCE, 'String', exp);
};

// 1 -> String#trimLeft
// 2 -> String#trimRight
// 3 -> String#trim
var trim = exporter.trim = function(string, TYPE){
  string = String(defined(string));
  if(TYPE & 1)string = string.replace(ltrim, '');
  if(TYPE & 2)string = string.replace(rtrim, '');
  return string;
};

module.exports = exporter;
},{"./_defined":25,"./_export":30,"./_fails":32,"./_string-ws":101}],101:[function(require,module,exports){
module.exports = '\x09\x0A\x0B\x0C\x0D\x20\xA0\u1680\u180E\u2000\u2001\u2002\u2003' +
  '\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF';
},{}],102:[function(require,module,exports){
var ctx                = require('./_ctx')
  , invoke             = require('./_invoke')
  , html               = require('./_html')
  , cel                = require('./_dom-create')
  , global             = require('./_global')
  , process            = global.process
  , setTask            = global.setImmediate
  , clearTask          = global.clearImmediate
  , MessageChannel     = global.MessageChannel
  , counter            = 0
  , queue              = {}
  , ONREADYSTATECHANGE = 'onreadystatechange'
  , defer, channel, port;
var run = function(){
  var id = +this;
  if(queue.hasOwnProperty(id)){
    var fn = queue[id];
    delete queue[id];
    fn();
  }
};
var listener = function(event){
  run.call(event.data);
};
// Node.js 0.9+ & IE10+ has setImmediate, otherwise:
if(!setTask || !clearTask){
  setTask = function setImmediate(fn){
    var args = [], i = 1;
    while(arguments.length > i)args.push(arguments[i++]);
    queue[++counter] = function(){
      invoke(typeof fn == 'function' ? fn : Function(fn), args);
    };
    defer(counter);
    return counter;
  };
  clearTask = function clearImmediate(id){
    delete queue[id];
  };
  // Node.js 0.8-
  if(require('./_cof')(process) == 'process'){
    defer = function(id){
      process.nextTick(ctx(run, id, 1));
    };
  // Browsers with MessageChannel, includes WebWorkers
  } else if(MessageChannel){
    channel = new MessageChannel;
    port    = channel.port2;
    channel.port1.onmessage = listener;
    defer = ctx(port.postMessage, port, 1);
  // Browsers with postMessage, skip WebWorkers
  // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
  } else if(global.addEventListener && typeof postMessage == 'function' && !global.importScripts){
    defer = function(id){
      global.postMessage(id + '', '*');
    };
    global.addEventListener('message', listener, false);
  // IE8-
  } else if(ONREADYSTATECHANGE in cel('script')){
    defer = function(id){
      html.appendChild(cel('script'))[ONREADYSTATECHANGE] = function(){
        html.removeChild(this);
        run.call(id);
      };
    };
  // Rest old browsers
  } else {
    defer = function(id){
      setTimeout(ctx(run, id, 1), 0);
    };
  }
}
module.exports = {
  set:   setTask,
  clear: clearTask
};
},{"./_cof":17,"./_ctx":23,"./_dom-create":27,"./_global":36,"./_html":39,"./_invoke":42}],103:[function(require,module,exports){
var toInteger = require('./_to-integer')
  , max       = Math.max
  , min       = Math.min;
module.exports = function(index, length){
  index = toInteger(index);
  return index < 0 ? max(index + length, 0) : min(index, length);
};
},{"./_to-integer":104}],104:[function(require,module,exports){
// 7.1.4 ToInteger
var ceil  = Math.ceil
  , floor = Math.floor;
module.exports = function(it){
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};
},{}],105:[function(require,module,exports){
// to indexed object, toObject with fallback for non-array-like ES3 strings
var IObject = require('./_iobject')
  , defined = require('./_defined');
module.exports = function(it){
  return IObject(defined(it));
};
},{"./_defined":25,"./_iobject":43}],106:[function(require,module,exports){
// 7.1.15 ToLength
var toInteger = require('./_to-integer')
  , min       = Math.min;
module.exports = function(it){
  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};
},{"./_to-integer":104}],107:[function(require,module,exports){
// 7.1.13 ToObject(argument)
var defined = require('./_defined');
module.exports = function(it){
  return Object(defined(it));
};
},{"./_defined":25}],108:[function(require,module,exports){
// 7.1.1 ToPrimitive(input [, PreferredType])
var isObject = require('./_is-object');
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
module.exports = function(it, S){
  if(!isObject(it))return it;
  var fn, val;
  if(S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it)))return val;
  if(typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it)))return val;
  if(!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it)))return val;
  throw TypeError("Can't convert object to primitive value");
};
},{"./_is-object":47}],109:[function(require,module,exports){
'use strict';
if(require('./_descriptors')){
  var LIBRARY             = require('./_library')
    , global              = require('./_global')
    , fails               = require('./_fails')
    , $export             = require('./_export')
    , $typed              = require('./_typed')
    , $buffer             = require('./_typed-buffer')
    , ctx                 = require('./_ctx')
    , anInstance          = require('./_an-instance')
    , propertyDesc        = require('./_property-desc')
    , hide                = require('./_hide')
    , redefineAll         = require('./_redefine-all')
    , isInteger           = require('./_is-integer')
    , toInteger           = require('./_to-integer')
    , toLength            = require('./_to-length')
    , toIndex             = require('./_to-index')
    , toPrimitive         = require('./_to-primitive')
    , has                 = require('./_has')
    , same                = require('./_same-value')
    , classof             = require('./_classof')
    , isObject            = require('./_is-object')
    , toObject            = require('./_to-object')
    , isArrayIter         = require('./_is-array-iter')
    , create              = require('./_object-create')
    , getPrototypeOf      = require('./_object-gpo')
    , gOPN                = require('./_object-gopn').f
    , isIterable          = require('./core.is-iterable')
    , getIterFn           = require('./core.get-iterator-method')
    , uid                 = require('./_uid')
    , wks                 = require('./_wks')
    , createArrayMethod   = require('./_array-methods')
    , createArrayIncludes = require('./_array-includes')
    , speciesConstructor  = require('./_species-constructor')
    , ArrayIterators      = require('./es6.array.iterator')
    , Iterators           = require('./_iterators')
    , $iterDetect         = require('./_iter-detect')
    , setSpecies          = require('./_set-species')
    , arrayFill           = require('./_array-fill')
    , arrayCopyWithin     = require('./_array-copy-within')
    , $DP                 = require('./_object-dp')
    , $GOPD               = require('./_object-gopd')
    , dP                  = $DP.f
    , gOPD                = $GOPD.f
    , RangeError          = global.RangeError
    , TypeError           = global.TypeError
    , Uint8Array          = global.Uint8Array
    , ARRAY_BUFFER        = 'ArrayBuffer'
    , SHARED_BUFFER       = 'Shared' + ARRAY_BUFFER
    , BYTES_PER_ELEMENT   = 'BYTES_PER_ELEMENT'
    , PROTOTYPE           = 'prototype'
    , ArrayProto          = Array[PROTOTYPE]
    , $ArrayBuffer        = $buffer.ArrayBuffer
    , $DataView           = $buffer.DataView
    , arrayForEach        = createArrayMethod(0)
    , arrayFilter         = createArrayMethod(2)
    , arraySome           = createArrayMethod(3)
    , arrayEvery          = createArrayMethod(4)
    , arrayFind           = createArrayMethod(5)
    , arrayFindIndex      = createArrayMethod(6)
    , arrayIncludes       = createArrayIncludes(true)
    , arrayIndexOf        = createArrayIncludes(false)
    , arrayValues         = ArrayIterators.values
    , arrayKeys           = ArrayIterators.keys
    , arrayEntries        = ArrayIterators.entries
    , arrayLastIndexOf    = ArrayProto.lastIndexOf
    , arrayReduce         = ArrayProto.reduce
    , arrayReduceRight    = ArrayProto.reduceRight
    , arrayJoin           = ArrayProto.join
    , arraySort           = ArrayProto.sort
    , arraySlice          = ArrayProto.slice
    , arrayToString       = ArrayProto.toString
    , arrayToLocaleString = ArrayProto.toLocaleString
    , ITERATOR            = wks('iterator')
    , TAG                 = wks('toStringTag')
    , TYPED_CONSTRUCTOR   = uid('typed_constructor')
    , DEF_CONSTRUCTOR     = uid('def_constructor')
    , ALL_CONSTRUCTORS    = $typed.CONSTR
    , TYPED_ARRAY         = $typed.TYPED
    , VIEW                = $typed.VIEW
    , WRONG_LENGTH        = 'Wrong length!';

  var $map = createArrayMethod(1, function(O, length){
    return allocate(speciesConstructor(O, O[DEF_CONSTRUCTOR]), length);
  });

  var LITTLE_ENDIAN = fails(function(){
    return new Uint8Array(new Uint16Array([1]).buffer)[0] === 1;
  });

  var FORCED_SET = !!Uint8Array && !!Uint8Array[PROTOTYPE].set && fails(function(){
    new Uint8Array(1).set({});
  });

  var strictToLength = function(it, SAME){
    if(it === undefined)throw TypeError(WRONG_LENGTH);
    var number = +it
      , length = toLength(it);
    if(SAME && !same(number, length))throw RangeError(WRONG_LENGTH);
    return length;
  };

  var toOffset = function(it, BYTES){
    var offset = toInteger(it);
    if(offset < 0 || offset % BYTES)throw RangeError('Wrong offset!');
    return offset;
  };

  var validate = function(it){
    if(isObject(it) && TYPED_ARRAY in it)return it;
    throw TypeError(it + ' is not a typed array!');
  };

  var allocate = function(C, length){
    if(!(isObject(C) && TYPED_CONSTRUCTOR in C)){
      throw TypeError('It is not a typed array constructor!');
    } return new C(length);
  };

  var speciesFromList = function(O, list){
    return fromList(speciesConstructor(O, O[DEF_CONSTRUCTOR]), list);
  };

  var fromList = function(C, list){
    var index  = 0
      , length = list.length
      , result = allocate(C, length);
    while(length > index)result[index] = list[index++];
    return result;
  };

  var addGetter = function(it, key, internal){
    dP(it, key, {get: function(){ return this._d[internal]; }});
  };

  var $from = function from(source /*, mapfn, thisArg */){
    var O       = toObject(source)
      , aLen    = arguments.length
      , mapfn   = aLen > 1 ? arguments[1] : undefined
      , mapping = mapfn !== undefined
      , iterFn  = getIterFn(O)
      , i, length, values, result, step, iterator;
    if(iterFn != undefined && !isArrayIter(iterFn)){
      for(iterator = iterFn.call(O), values = [], i = 0; !(step = iterator.next()).done; i++){
        values.push(step.value);
      } O = values;
    }
    if(mapping && aLen > 2)mapfn = ctx(mapfn, arguments[2], 2);
    for(i = 0, length = toLength(O.length), result = allocate(this, length); length > i; i++){
      result[i] = mapping ? mapfn(O[i], i) : O[i];
    }
    return result;
  };

  var $of = function of(/*...items*/){
    var index  = 0
      , length = arguments.length
      , result = allocate(this, length);
    while(length > index)result[index] = arguments[index++];
    return result;
  };

  // iOS Safari 6.x fails here
  var TO_LOCALE_BUG = !!Uint8Array && fails(function(){ arrayToLocaleString.call(new Uint8Array(1)); });

  var $toLocaleString = function toLocaleString(){
    return arrayToLocaleString.apply(TO_LOCALE_BUG ? arraySlice.call(validate(this)) : validate(this), arguments);
  };

  var proto = {
    copyWithin: function copyWithin(target, start /*, end */){
      return arrayCopyWithin.call(validate(this), target, start, arguments.length > 2 ? arguments[2] : undefined);
    },
    every: function every(callbackfn /*, thisArg */){
      return arrayEvery(validate(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
    },
    fill: function fill(value /*, start, end */){ // eslint-disable-line no-unused-vars
      return arrayFill.apply(validate(this), arguments);
    },
    filter: function filter(callbackfn /*, thisArg */){
      return speciesFromList(this, arrayFilter(validate(this), callbackfn,
        arguments.length > 1 ? arguments[1] : undefined));
    },
    find: function find(predicate /*, thisArg */){
      return arrayFind(validate(this), predicate, arguments.length > 1 ? arguments[1] : undefined);
    },
    findIndex: function findIndex(predicate /*, thisArg */){
      return arrayFindIndex(validate(this), predicate, arguments.length > 1 ? arguments[1] : undefined);
    },
    forEach: function forEach(callbackfn /*, thisArg */){
      arrayForEach(validate(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
    },
    indexOf: function indexOf(searchElement /*, fromIndex */){
      return arrayIndexOf(validate(this), searchElement, arguments.length > 1 ? arguments[1] : undefined);
    },
    includes: function includes(searchElement /*, fromIndex */){
      return arrayIncludes(validate(this), searchElement, arguments.length > 1 ? arguments[1] : undefined);
    },
    join: function join(separator){ // eslint-disable-line no-unused-vars
      return arrayJoin.apply(validate(this), arguments);
    },
    lastIndexOf: function lastIndexOf(searchElement /*, fromIndex */){ // eslint-disable-line no-unused-vars
      return arrayLastIndexOf.apply(validate(this), arguments);
    },
    map: function map(mapfn /*, thisArg */){
      return $map(validate(this), mapfn, arguments.length > 1 ? arguments[1] : undefined);
    },
    reduce: function reduce(callbackfn /*, initialValue */){ // eslint-disable-line no-unused-vars
      return arrayReduce.apply(validate(this), arguments);
    },
    reduceRight: function reduceRight(callbackfn /*, initialValue */){ // eslint-disable-line no-unused-vars
      return arrayReduceRight.apply(validate(this), arguments);
    },
    reverse: function reverse(){
      var that   = this
        , length = validate(that).length
        , middle = Math.floor(length / 2)
        , index  = 0
        , value;
      while(index < middle){
        value         = that[index];
        that[index++] = that[--length];
        that[length]  = value;
      } return that;
    },
    some: function some(callbackfn /*, thisArg */){
      return arraySome(validate(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
    },
    sort: function sort(comparefn){
      return arraySort.call(validate(this), comparefn);
    },
    subarray: function subarray(begin, end){
      var O      = validate(this)
        , length = O.length
        , $begin = toIndex(begin, length);
      return new (speciesConstructor(O, O[DEF_CONSTRUCTOR]))(
        O.buffer,
        O.byteOffset + $begin * O.BYTES_PER_ELEMENT,
        toLength((end === undefined ? length : toIndex(end, length)) - $begin)
      );
    }
  };

  var $slice = function slice(start, end){
    return speciesFromList(this, arraySlice.call(validate(this), start, end));
  };

  var $set = function set(arrayLike /*, offset */){
    validate(this);
    var offset = toOffset(arguments[1], 1)
      , length = this.length
      , src    = toObject(arrayLike)
      , len    = toLength(src.length)
      , index  = 0;
    if(len + offset > length)throw RangeError(WRONG_LENGTH);
    while(index < len)this[offset + index] = src[index++];
  };

  var $iterators = {
    entries: function entries(){
      return arrayEntries.call(validate(this));
    },
    keys: function keys(){
      return arrayKeys.call(validate(this));
    },
    values: function values(){
      return arrayValues.call(validate(this));
    }
  };

  var isTAIndex = function(target, key){
    return isObject(target)
      && target[TYPED_ARRAY]
      && typeof key != 'symbol'
      && key in target
      && String(+key) == String(key);
  };
  var $getDesc = function getOwnPropertyDescriptor(target, key){
    return isTAIndex(target, key = toPrimitive(key, true))
      ? propertyDesc(2, target[key])
      : gOPD(target, key);
  };
  var $setDesc = function defineProperty(target, key, desc){
    if(isTAIndex(target, key = toPrimitive(key, true))
      && isObject(desc)
      && has(desc, 'value')
      && !has(desc, 'get')
      && !has(desc, 'set')
      // TODO: add validation descriptor w/o calling accessors
      && !desc.configurable
      && (!has(desc, 'writable') || desc.writable)
      && (!has(desc, 'enumerable') || desc.enumerable)
    ){
      target[key] = desc.value;
      return target;
    } else return dP(target, key, desc);
  };

  if(!ALL_CONSTRUCTORS){
    $GOPD.f = $getDesc;
    $DP.f   = $setDesc;
  }

  $export($export.S + $export.F * !ALL_CONSTRUCTORS, 'Object', {
    getOwnPropertyDescriptor: $getDesc,
    defineProperty:           $setDesc
  });

  if(fails(function(){ arrayToString.call({}); })){
    arrayToString = arrayToLocaleString = function toString(){
      return arrayJoin.call(this);
    }
  }

  var $TypedArrayPrototype$ = redefineAll({}, proto);
  redefineAll($TypedArrayPrototype$, $iterators);
  hide($TypedArrayPrototype$, ITERATOR, $iterators.values);
  redefineAll($TypedArrayPrototype$, {
    slice:          $slice,
    set:            $set,
    constructor:    function(){ /* noop */ },
    toString:       arrayToString,
    toLocaleString: $toLocaleString
  });
  addGetter($TypedArrayPrototype$, 'buffer', 'b');
  addGetter($TypedArrayPrototype$, 'byteOffset', 'o');
  addGetter($TypedArrayPrototype$, 'byteLength', 'l');
  addGetter($TypedArrayPrototype$, 'length', 'e');
  dP($TypedArrayPrototype$, TAG, {
    get: function(){ return this[TYPED_ARRAY]; }
  });

  module.exports = function(KEY, BYTES, wrapper, CLAMPED){
    CLAMPED = !!CLAMPED;
    var NAME       = KEY + (CLAMPED ? 'Clamped' : '') + 'Array'
      , ISNT_UINT8 = NAME != 'Uint8Array'
      , GETTER     = 'get' + KEY
      , SETTER     = 'set' + KEY
      , TypedArray = global[NAME]
      , Base       = TypedArray || {}
      , TAC        = TypedArray && getPrototypeOf(TypedArray)
      , FORCED     = !TypedArray || !$typed.ABV
      , O          = {}
      , TypedArrayPrototype = TypedArray && TypedArray[PROTOTYPE];
    var getter = function(that, index){
      var data = that._d;
      return data.v[GETTER](index * BYTES + data.o, LITTLE_ENDIAN);
    };
    var setter = function(that, index, value){
      var data = that._d;
      if(CLAMPED)value = (value = Math.round(value)) < 0 ? 0 : value > 0xff ? 0xff : value & 0xff;
      data.v[SETTER](index * BYTES + data.o, value, LITTLE_ENDIAN);
    };
    var addElement = function(that, index){
      dP(that, index, {
        get: function(){
          return getter(this, index);
        },
        set: function(value){
          return setter(this, index, value);
        },
        enumerable: true
      });
    };
    if(FORCED){
      TypedArray = wrapper(function(that, data, $offset, $length){
        anInstance(that, TypedArray, NAME, '_d');
        var index  = 0
          , offset = 0
          , buffer, byteLength, length, klass;
        if(!isObject(data)){
          length     = strictToLength(data, true)
          byteLength = length * BYTES;
          buffer     = new $ArrayBuffer(byteLength);
        } else if(data instanceof $ArrayBuffer || (klass = classof(data)) == ARRAY_BUFFER || klass == SHARED_BUFFER){
          buffer = data;
          offset = toOffset($offset, BYTES);
          var $len = data.byteLength;
          if($length === undefined){
            if($len % BYTES)throw RangeError(WRONG_LENGTH);
            byteLength = $len - offset;
            if(byteLength < 0)throw RangeError(WRONG_LENGTH);
          } else {
            byteLength = toLength($length) * BYTES;
            if(byteLength + offset > $len)throw RangeError(WRONG_LENGTH);
          }
          length = byteLength / BYTES;
        } else if(TYPED_ARRAY in data){
          return fromList(TypedArray, data);
        } else {
          return $from.call(TypedArray, data);
        }
        hide(that, '_d', {
          b: buffer,
          o: offset,
          l: byteLength,
          e: length,
          v: new $DataView(buffer)
        });
        while(index < length)addElement(that, index++);
      });
      TypedArrayPrototype = TypedArray[PROTOTYPE] = create($TypedArrayPrototype$);
      hide(TypedArrayPrototype, 'constructor', TypedArray);
    } else if(!$iterDetect(function(iter){
      // V8 works with iterators, but fails in many other cases
      // https://code.google.com/p/v8/issues/detail?id=4552
      new TypedArray(null); // eslint-disable-line no-new
      new TypedArray(iter); // eslint-disable-line no-new
    }, true)){
      TypedArray = wrapper(function(that, data, $offset, $length){
        anInstance(that, TypedArray, NAME);
        var klass;
        // `ws` module bug, temporarily remove validation length for Uint8Array
        // https://github.com/websockets/ws/pull/645
        if(!isObject(data))return new Base(strictToLength(data, ISNT_UINT8));
        if(data instanceof $ArrayBuffer || (klass = classof(data)) == ARRAY_BUFFER || klass == SHARED_BUFFER){
          return $length !== undefined
            ? new Base(data, toOffset($offset, BYTES), $length)
            : $offset !== undefined
              ? new Base(data, toOffset($offset, BYTES))
              : new Base(data);
        }
        if(TYPED_ARRAY in data)return fromList(TypedArray, data);
        return $from.call(TypedArray, data);
      });
      arrayForEach(TAC !== Function.prototype ? gOPN(Base).concat(gOPN(TAC)) : gOPN(Base), function(key){
        if(!(key in TypedArray))hide(TypedArray, key, Base[key]);
      });
      TypedArray[PROTOTYPE] = TypedArrayPrototype;
      if(!LIBRARY)TypedArrayPrototype.constructor = TypedArray;
    }
    var $nativeIterator   = TypedArrayPrototype[ITERATOR]
      , CORRECT_ITER_NAME = !!$nativeIterator && ($nativeIterator.name == 'values' || $nativeIterator.name == undefined)
      , $iterator         = $iterators.values;
    hide(TypedArray, TYPED_CONSTRUCTOR, true);
    hide(TypedArrayPrototype, TYPED_ARRAY, NAME);
    hide(TypedArrayPrototype, VIEW, true);
    hide(TypedArrayPrototype, DEF_CONSTRUCTOR, TypedArray);

    if(CLAMPED ? new TypedArray(1)[TAG] != NAME : !(TAG in TypedArrayPrototype)){
      dP(TypedArrayPrototype, TAG, {
        get: function(){ return NAME; }
      });
    }

    O[NAME] = TypedArray;

    $export($export.G + $export.W + $export.F * (TypedArray != Base), O);

    $export($export.S, NAME, {
      BYTES_PER_ELEMENT: BYTES,
      from: $from,
      of: $of
    });

    if(!(BYTES_PER_ELEMENT in TypedArrayPrototype))hide(TypedArrayPrototype, BYTES_PER_ELEMENT, BYTES);

    $export($export.P, NAME, proto);

    setSpecies(NAME);

    $export($export.P + $export.F * FORCED_SET, NAME, {set: $set});

    $export($export.P + $export.F * !CORRECT_ITER_NAME, NAME, $iterators);

    $export($export.P + $export.F * (TypedArrayPrototype.toString != arrayToString), NAME, {toString: arrayToString});

    $export($export.P + $export.F * fails(function(){
      new TypedArray(1).slice();
    }), NAME, {slice: $slice});

    $export($export.P + $export.F * (fails(function(){
      return [1, 2].toLocaleString() != new TypedArray([1, 2]).toLocaleString()
    }) || !fails(function(){
      TypedArrayPrototype.toLocaleString.call([1, 2]);
    })), NAME, {toLocaleString: $toLocaleString});

    Iterators[NAME] = CORRECT_ITER_NAME ? $nativeIterator : $iterator;
    if(!LIBRARY && !CORRECT_ITER_NAME)hide(TypedArrayPrototype, ITERATOR, $iterator);
  };
} else module.exports = function(){ /* empty */ };
},{"./_an-instance":6,"./_array-copy-within":8,"./_array-fill":9,"./_array-includes":11,"./_array-methods":12,"./_classof":16,"./_ctx":23,"./_descriptors":26,"./_export":30,"./_fails":32,"./_global":36,"./_has":37,"./_hide":38,"./_is-array-iter":44,"./_is-integer":46,"./_is-object":47,"./_iter-detect":52,"./_iterators":54,"./_library":56,"./_object-create":64,"./_object-dp":65,"./_object-gopd":68,"./_object-gopn":70,"./_object-gpo":72,"./_property-desc":83,"./_redefine-all":84,"./_same-value":87,"./_set-species":89,"./_species-constructor":93,"./_to-index":103,"./_to-integer":104,"./_to-length":106,"./_to-object":107,"./_to-primitive":108,"./_typed":111,"./_typed-buffer":110,"./_uid":112,"./_wks":113,"./core.get-iterator-method":114,"./core.is-iterable":115,"./es6.array.iterator":127}],110:[function(require,module,exports){
'use strict';
var global         = require('./_global')
  , DESCRIPTORS    = require('./_descriptors')
  , LIBRARY        = require('./_library')
  , $typed         = require('./_typed')
  , hide           = require('./_hide')
  , redefineAll    = require('./_redefine-all')
  , fails          = require('./_fails')
  , anInstance     = require('./_an-instance')
  , toInteger      = require('./_to-integer')
  , toLength       = require('./_to-length')
  , gOPN           = require('./_object-gopn').f
  , dP             = require('./_object-dp').f
  , arrayFill      = require('./_array-fill')
  , setToStringTag = require('./_set-to-string-tag')
  , ARRAY_BUFFER   = 'ArrayBuffer'
  , DATA_VIEW      = 'DataView'
  , PROTOTYPE      = 'prototype'
  , WRONG_LENGTH   = 'Wrong length!'
  , WRONG_INDEX    = 'Wrong index!'
  , $ArrayBuffer   = global[ARRAY_BUFFER]
  , $DataView      = global[DATA_VIEW]
  , Math           = global.Math
  , parseInt       = global.parseInt
  , RangeError     = global.RangeError
  , Infinity       = global.Infinity
  , BaseBuffer     = $ArrayBuffer
  , abs            = Math.abs
  , pow            = Math.pow
  , min            = Math.min
  , floor          = Math.floor
  , log            = Math.log
  , LN2            = Math.LN2
  , BUFFER         = 'buffer'
  , BYTE_LENGTH    = 'byteLength'
  , BYTE_OFFSET    = 'byteOffset'
  , $BUFFER        = DESCRIPTORS ? '_b' : BUFFER
  , $LENGTH        = DESCRIPTORS ? '_l' : BYTE_LENGTH
  , $OFFSET        = DESCRIPTORS ? '_o' : BYTE_OFFSET;

// IEEE754 conversions based on https://github.com/feross/ieee754
var packIEEE754 = function(value, mLen, nBytes){
  var buffer = Array(nBytes)
    , eLen   = nBytes * 8 - mLen - 1
    , eMax   = (1 << eLen) - 1
    , eBias  = eMax >> 1
    , rt     = mLen === 23 ? pow(2, -24) - pow(2, -77) : 0
    , i      = 0
    , s      = value < 0 || value === 0 && 1 / value < 0 ? 1 : 0
    , e, m, c;
  value = abs(value)
  if(value != value || value === Infinity){
    m = value != value ? 1 : 0;
    e = eMax;
  } else {
    e = floor(log(value) / LN2);
    if(value * (c = pow(2, -e)) < 1){
      e--;
      c *= 2;
    }
    if(e + eBias >= 1){
      value += rt / c;
    } else {
      value += rt * pow(2, 1 - eBias);
    }
    if(value * c >= 2){
      e++;
      c /= 2;
    }
    if(e + eBias >= eMax){
      m = 0;
      e = eMax;
    } else if(e + eBias >= 1){
      m = (value * c - 1) * pow(2, mLen);
      e = e + eBias;
    } else {
      m = value * pow(2, eBias - 1) * pow(2, mLen);
      e = 0;
    }
  }
  for(; mLen >= 8; buffer[i++] = m & 255, m /= 256, mLen -= 8);
  e = e << mLen | m;
  eLen += mLen;
  for(; eLen > 0; buffer[i++] = e & 255, e /= 256, eLen -= 8);
  buffer[--i] |= s * 128;
  return buffer;
};
var unpackIEEE754 = function(buffer, mLen, nBytes){
  var eLen  = nBytes * 8 - mLen - 1
    , eMax  = (1 << eLen) - 1
    , eBias = eMax >> 1
    , nBits = eLen - 7
    , i     = nBytes - 1
    , s     = buffer[i--]
    , e     = s & 127
    , m;
  s >>= 7;
  for(; nBits > 0; e = e * 256 + buffer[i], i--, nBits -= 8);
  m = e & (1 << -nBits) - 1;
  e >>= -nBits;
  nBits += mLen;
  for(; nBits > 0; m = m * 256 + buffer[i], i--, nBits -= 8);
  if(e === 0){
    e = 1 - eBias;
  } else if(e === eMax){
    return m ? NaN : s ? -Infinity : Infinity;
  } else {
    m = m + pow(2, mLen);
    e = e - eBias;
  } return (s ? -1 : 1) * m * pow(2, e - mLen);
};

var unpackI32 = function(bytes){
  return bytes[3] << 24 | bytes[2] << 16 | bytes[1] << 8 | bytes[0];
};
var packI8 = function(it){
  return [it & 0xff];
};
var packI16 = function(it){
  return [it & 0xff, it >> 8 & 0xff];
};
var packI32 = function(it){
  return [it & 0xff, it >> 8 & 0xff, it >> 16 & 0xff, it >> 24 & 0xff];
};
var packF64 = function(it){
  return packIEEE754(it, 52, 8);
};
var packF32 = function(it){
  return packIEEE754(it, 23, 4);
};

var addGetter = function(C, key, internal){
  dP(C[PROTOTYPE], key, {get: function(){ return this[internal]; }});
};

var get = function(view, bytes, index, isLittleEndian){
  var numIndex = +index
    , intIndex = toInteger(numIndex);
  if(numIndex != intIndex || intIndex < 0 || intIndex + bytes > view[$LENGTH])throw RangeError(WRONG_INDEX);
  var store = view[$BUFFER]._b
    , start = intIndex + view[$OFFSET]
    , pack  = store.slice(start, start + bytes);
  return isLittleEndian ? pack : pack.reverse();
};
var set = function(view, bytes, index, conversion, value, isLittleEndian){
  var numIndex = +index
    , intIndex = toInteger(numIndex);
  if(numIndex != intIndex || intIndex < 0 || intIndex + bytes > view[$LENGTH])throw RangeError(WRONG_INDEX);
  var store = view[$BUFFER]._b
    , start = intIndex + view[$OFFSET]
    , pack  = conversion(+value);
  for(var i = 0; i < bytes; i++)store[start + i] = pack[isLittleEndian ? i : bytes - i - 1];
};

var validateArrayBufferArguments = function(that, length){
  anInstance(that, $ArrayBuffer, ARRAY_BUFFER);
  var numberLength = +length
    , byteLength   = toLength(numberLength);
  if(numberLength != byteLength)throw RangeError(WRONG_LENGTH);
  return byteLength;
};

if(!$typed.ABV){
  $ArrayBuffer = function ArrayBuffer(length){
    var byteLength = validateArrayBufferArguments(this, length);
    this._b       = arrayFill.call(Array(byteLength), 0);
    this[$LENGTH] = byteLength;
  };

  $DataView = function DataView(buffer, byteOffset, byteLength){
    anInstance(this, $DataView, DATA_VIEW);
    anInstance(buffer, $ArrayBuffer, DATA_VIEW);
    var bufferLength = buffer[$LENGTH]
      , offset       = toInteger(byteOffset);
    if(offset < 0 || offset > bufferLength)throw RangeError('Wrong offset!');
    byteLength = byteLength === undefined ? bufferLength - offset : toLength(byteLength);
    if(offset + byteLength > bufferLength)throw RangeError(WRONG_LENGTH);
    this[$BUFFER] = buffer;
    this[$OFFSET] = offset;
    this[$LENGTH] = byteLength;
  };

  if(DESCRIPTORS){
    addGetter($ArrayBuffer, BYTE_LENGTH, '_l');
    addGetter($DataView, BUFFER, '_b');
    addGetter($DataView, BYTE_LENGTH, '_l');
    addGetter($DataView, BYTE_OFFSET, '_o');
  }

  redefineAll($DataView[PROTOTYPE], {
    getInt8: function getInt8(byteOffset){
      return get(this, 1, byteOffset)[0] << 24 >> 24;
    },
    getUint8: function getUint8(byteOffset){
      return get(this, 1, byteOffset)[0];
    },
    getInt16: function getInt16(byteOffset /*, littleEndian */){
      var bytes = get(this, 2, byteOffset, arguments[1]);
      return (bytes[1] << 8 | bytes[0]) << 16 >> 16;
    },
    getUint16: function getUint16(byteOffset /*, littleEndian */){
      var bytes = get(this, 2, byteOffset, arguments[1]);
      return bytes[1] << 8 | bytes[0];
    },
    getInt32: function getInt32(byteOffset /*, littleEndian */){
      return unpackI32(get(this, 4, byteOffset, arguments[1]));
    },
    getUint32: function getUint32(byteOffset /*, littleEndian */){
      return unpackI32(get(this, 4, byteOffset, arguments[1])) >>> 0;
    },
    getFloat32: function getFloat32(byteOffset /*, littleEndian */){
      return unpackIEEE754(get(this, 4, byteOffset, arguments[1]), 23, 4);
    },
    getFloat64: function getFloat64(byteOffset /*, littleEndian */){
      return unpackIEEE754(get(this, 8, byteOffset, arguments[1]), 52, 8);
    },
    setInt8: function setInt8(byteOffset, value){
      set(this, 1, byteOffset, packI8, value);
    },
    setUint8: function setUint8(byteOffset, value){
      set(this, 1, byteOffset, packI8, value);
    },
    setInt16: function setInt16(byteOffset, value /*, littleEndian */){
      set(this, 2, byteOffset, packI16, value, arguments[2]);
    },
    setUint16: function setUint16(byteOffset, value /*, littleEndian */){
      set(this, 2, byteOffset, packI16, value, arguments[2]);
    },
    setInt32: function setInt32(byteOffset, value /*, littleEndian */){
      set(this, 4, byteOffset, packI32, value, arguments[2]);
    },
    setUint32: function setUint32(byteOffset, value /*, littleEndian */){
      set(this, 4, byteOffset, packI32, value, arguments[2]);
    },
    setFloat32: function setFloat32(byteOffset, value /*, littleEndian */){
      set(this, 4, byteOffset, packF32, value, arguments[2]);
    },
    setFloat64: function setFloat64(byteOffset, value /*, littleEndian */){
      set(this, 8, byteOffset, packF64, value, arguments[2]);
    }
  });
} else {
  if(!fails(function(){
    new $ArrayBuffer;     // eslint-disable-line no-new
  }) || !fails(function(){
    new $ArrayBuffer(.5); // eslint-disable-line no-new
  })){
    $ArrayBuffer = function ArrayBuffer(length){
      return new BaseBuffer(validateArrayBufferArguments(this, length));
    };
    var ArrayBufferProto = $ArrayBuffer[PROTOTYPE] = BaseBuffer[PROTOTYPE];
    for(var keys = gOPN(BaseBuffer), j = 0, key; keys.length > j; ){
      if(!((key = keys[j++]) in $ArrayBuffer))hide($ArrayBuffer, key, BaseBuffer[key]);
    };
    if(!LIBRARY)ArrayBufferProto.constructor = $ArrayBuffer;
  }
  // iOS Safari 7.x bug
  var view = new $DataView(new $ArrayBuffer(2))
    , $setInt8 = $DataView[PROTOTYPE].setInt8;
  view.setInt8(0, 2147483648);
  view.setInt8(1, 2147483649);
  if(view.getInt8(0) || !view.getInt8(1))redefineAll($DataView[PROTOTYPE], {
    setInt8: function setInt8(byteOffset, value){
      $setInt8.call(this, byteOffset, value << 24 >> 24);
    },
    setUint8: function setUint8(byteOffset, value){
      $setInt8.call(this, byteOffset, value << 24 >> 24);
    }
  }, true);
}
setToStringTag($ArrayBuffer, ARRAY_BUFFER);
setToStringTag($DataView, DATA_VIEW);
hide($DataView[PROTOTYPE], $typed.VIEW, true);
exports[ARRAY_BUFFER] = $ArrayBuffer;
exports[DATA_VIEW] = $DataView;
},{"./_an-instance":6,"./_array-fill":9,"./_descriptors":26,"./_fails":32,"./_global":36,"./_hide":38,"./_library":56,"./_object-dp":65,"./_object-gopn":70,"./_redefine-all":84,"./_set-to-string-tag":90,"./_to-integer":104,"./_to-length":106,"./_typed":111}],111:[function(require,module,exports){
var global = require('./_global')
  , hide   = require('./_hide')
  , uid    = require('./_uid')
  , TYPED  = uid('typed_array')
  , VIEW   = uid('view')
  , ABV    = !!(global.ArrayBuffer && global.DataView)
  , CONSTR = ABV
  , i = 0, l = 9, Typed;

var TypedArrayConstructors = (
  'Int8Array,Uint8Array,Uint8ClampedArray,Int16Array,Uint16Array,Int32Array,Uint32Array,Float32Array,Float64Array'
).split(',');

while(i < l){
  if(Typed = global[TypedArrayConstructors[i++]]){
    hide(Typed.prototype, TYPED, true);
    hide(Typed.prototype, VIEW, true);
  } else CONSTR = false;
}

module.exports = {
  ABV:    ABV,
  CONSTR: CONSTR,
  TYPED:  TYPED,
  VIEW:   VIEW
};
},{"./_global":36,"./_hide":38,"./_uid":112}],112:[function(require,module,exports){
var id = 0
  , px = Math.random();
module.exports = function(key){
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};
},{}],113:[function(require,module,exports){
var store      = require('./_shared')('wks')
  , uid        = require('./_uid')
  , Symbol     = require('./_global').Symbol
  , USE_SYMBOL = typeof Symbol == 'function';
module.exports = function(name){
  return store[name] || (store[name] =
    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
};
},{"./_global":36,"./_shared":92,"./_uid":112}],114:[function(require,module,exports){
var classof   = require('./_classof')
  , ITERATOR  = require('./_wks')('iterator')
  , Iterators = require('./_iterators');
module.exports = require('./_core').getIteratorMethod = function(it){
  if(it != undefined)return it[ITERATOR]
    || it['@@iterator']
    || Iterators[classof(it)];
};
},{"./_classof":16,"./_core":22,"./_iterators":54,"./_wks":113}],115:[function(require,module,exports){
var classof   = require('./_classof')
  , ITERATOR  = require('./_wks')('iterator')
  , Iterators = require('./_iterators');
module.exports = require('./_core').isIterable = function(it){
  var O = Object(it);
  return O[ITERATOR] !== undefined
    || '@@iterator' in O
    || Iterators.hasOwnProperty(classof(O));
};
},{"./_classof":16,"./_core":22,"./_iterators":54,"./_wks":113}],116:[function(require,module,exports){
// https://github.com/benjamingr/RexExp.escape
var $export = require('./_export')
  , $re     = require('./_replacer')(/[\\^$*+?.()|[\]{}]/g, '\\$&');

$export($export.S, 'RegExp', {escape: function escape(it){ return $re(it); }});

},{"./_export":30,"./_replacer":86}],117:[function(require,module,exports){
// 22.1.3.3 Array.prototype.copyWithin(target, start, end = this.length)
var $export = require('./_export');

$export($export.P, 'Array', {copyWithin: require('./_array-copy-within')});

require('./_add-to-unscopables')('copyWithin');
},{"./_add-to-unscopables":5,"./_array-copy-within":8,"./_export":30}],118:[function(require,module,exports){
'use strict';
var $export = require('./_export')
  , $every  = require('./_array-methods')(4);

$export($export.P + $export.F * !require('./_strict-method')([].every, true), 'Array', {
  // 22.1.3.5 / 15.4.4.16 Array.prototype.every(callbackfn [, thisArg])
  every: function every(callbackfn /* , thisArg */){
    return $every(this, callbackfn, arguments[1]);
  }
});
},{"./_array-methods":12,"./_export":30,"./_strict-method":94}],119:[function(require,module,exports){
// 22.1.3.6 Array.prototype.fill(value, start = 0, end = this.length)
var $export = require('./_export');

$export($export.P, 'Array', {fill: require('./_array-fill')});

require('./_add-to-unscopables')('fill');
},{"./_add-to-unscopables":5,"./_array-fill":9,"./_export":30}],120:[function(require,module,exports){
'use strict';
var $export = require('./_export')
  , $filter = require('./_array-methods')(2);

$export($export.P + $export.F * !require('./_strict-method')([].filter, true), 'Array', {
  // 22.1.3.7 / 15.4.4.20 Array.prototype.filter(callbackfn [, thisArg])
  filter: function filter(callbackfn /* , thisArg */){
    return $filter(this, callbackfn, arguments[1]);
  }
});
},{"./_array-methods":12,"./_export":30,"./_strict-method":94}],121:[function(require,module,exports){
'use strict';
// 22.1.3.9 Array.prototype.findIndex(predicate, thisArg = undefined)
var $export = require('./_export')
  , $find   = require('./_array-methods')(6)
  , KEY     = 'findIndex'
  , forced  = true;
// Shouldn't skip holes
if(KEY in [])Array(1)[KEY](function(){ forced = false; });
$export($export.P + $export.F * forced, 'Array', {
  findIndex: function findIndex(callbackfn/*, that = undefined */){
    return $find(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  }
});
require('./_add-to-unscopables')(KEY);
},{"./_add-to-unscopables":5,"./_array-methods":12,"./_export":30}],122:[function(require,module,exports){
'use strict';
// 22.1.3.8 Array.prototype.find(predicate, thisArg = undefined)
var $export = require('./_export')
  , $find   = require('./_array-methods')(5)
  , KEY     = 'find'
  , forced  = true;
// Shouldn't skip holes
if(KEY in [])Array(1)[KEY](function(){ forced = false; });
$export($export.P + $export.F * forced, 'Array', {
  find: function find(callbackfn/*, that = undefined */){
    return $find(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  }
});
require('./_add-to-unscopables')(KEY);
},{"./_add-to-unscopables":5,"./_array-methods":12,"./_export":30}],123:[function(require,module,exports){
'use strict';
var $export  = require('./_export')
  , $forEach = require('./_array-methods')(0)
  , STRICT   = require('./_strict-method')([].forEach, true);

$export($export.P + $export.F * !STRICT, 'Array', {
  // 22.1.3.10 / 15.4.4.18 Array.prototype.forEach(callbackfn [, thisArg])
  forEach: function forEach(callbackfn /* , thisArg */){
    return $forEach(this, callbackfn, arguments[1]);
  }
});
},{"./_array-methods":12,"./_export":30,"./_strict-method":94}],124:[function(require,module,exports){
'use strict';
var ctx         = require('./_ctx')
  , $export     = require('./_export')
  , toObject    = require('./_to-object')
  , call        = require('./_iter-call')
  , isArrayIter = require('./_is-array-iter')
  , toLength    = require('./_to-length')
  , getIterFn   = require('./core.get-iterator-method');
$export($export.S + $export.F * !require('./_iter-detect')(function(iter){ Array.from(iter); }), 'Array', {
  // 22.1.2.1 Array.from(arrayLike, mapfn = undefined, thisArg = undefined)
  from: function from(arrayLike/*, mapfn = undefined, thisArg = undefined*/){
    var O       = toObject(arrayLike)
      , C       = typeof this == 'function' ? this : Array
      , aLen    = arguments.length
      , mapfn   = aLen > 1 ? arguments[1] : undefined
      , mapping = mapfn !== undefined
      , index   = 0
      , iterFn  = getIterFn(O)
      , length, result, step, iterator;
    if(mapping)mapfn = ctx(mapfn, aLen > 2 ? arguments[2] : undefined, 2);
    // if object isn't iterable or it's array with default iterator - use simple case
    if(iterFn != undefined && !(C == Array && isArrayIter(iterFn))){
      for(iterator = iterFn.call(O), result = new C; !(step = iterator.next()).done; index++){
        result[index] = mapping ? call(iterator, mapfn, [step.value, index], true) : step.value;
      }
    } else {
      length = toLength(O.length);
      for(result = new C(length); length > index; index++){
        result[index] = mapping ? mapfn(O[index], index) : O[index];
      }
    }
    result.length = index;
    return result;
  }
});

},{"./_ctx":23,"./_export":30,"./_is-array-iter":44,"./_iter-call":49,"./_iter-detect":52,"./_to-length":106,"./_to-object":107,"./core.get-iterator-method":114}],125:[function(require,module,exports){
'use strict';
var $export  = require('./_export')
  , $indexOf = require('./_array-includes')(false);

$export($export.P + $export.F * !require('./_strict-method')([].indexOf), 'Array', {
  // 22.1.3.11 / 15.4.4.14 Array.prototype.indexOf(searchElement [, fromIndex])
  indexOf: function indexOf(searchElement /*, fromIndex = 0 */){
    return $indexOf(this, searchElement, arguments[1]);
  }
});
},{"./_array-includes":11,"./_export":30,"./_strict-method":94}],126:[function(require,module,exports){
// 22.1.2.2 / 15.4.3.2 Array.isArray(arg)
var $export = require('./_export');

$export($export.S, 'Array', {isArray: require('./_is-array')});
},{"./_export":30,"./_is-array":45}],127:[function(require,module,exports){
'use strict';
var addToUnscopables = require('./_add-to-unscopables')
  , step             = require('./_iter-step')
  , Iterators        = require('./_iterators')
  , toIObject        = require('./_to-iobject');

// 22.1.3.4 Array.prototype.entries()
// 22.1.3.13 Array.prototype.keys()
// 22.1.3.29 Array.prototype.values()
// 22.1.3.30 Array.prototype[@@iterator]()
module.exports = require('./_iter-define')(Array, 'Array', function(iterated, kind){
  this._t = toIObject(iterated); // target
  this._i = 0;                   // next index
  this._k = kind;                // kind
// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
}, function(){
  var O     = this._t
    , kind  = this._k
    , index = this._i++;
  if(!O || index >= O.length){
    this._t = undefined;
    return step(1);
  }
  if(kind == 'keys'  )return step(0, index);
  if(kind == 'values')return step(0, O[index]);
  return step(0, [index, O[index]]);
}, 'values');

// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
Iterators.Arguments = Iterators.Array;

addToUnscopables('keys');
addToUnscopables('values');
addToUnscopables('entries');
},{"./_add-to-unscopables":5,"./_iter-define":51,"./_iter-step":53,"./_iterators":54,"./_to-iobject":105}],128:[function(require,module,exports){
'use strict';
// 22.1.3.13 Array.prototype.join(separator)
var $export   = require('./_export')
  , toIObject = require('./_to-iobject')
  , arrayJoin = [].join;

// fallback for not array-like strings
$export($export.P + $export.F * (require('./_iobject') != Object || !require('./_strict-method')(arrayJoin)), 'Array', {
  join: function join(separator){
    return arrayJoin.call(toIObject(this), separator === undefined ? ',' : separator);
  }
});
},{"./_export":30,"./_iobject":43,"./_strict-method":94,"./_to-iobject":105}],129:[function(require,module,exports){
'use strict';
var $export   = require('./_export')
  , toIObject = require('./_to-iobject')
  , toInteger = require('./_to-integer')
  , toLength  = require('./_to-length');

$export($export.P + $export.F * !require('./_strict-method')([].lastIndexOf), 'Array', {
  // 22.1.3.14 / 15.4.4.15 Array.prototype.lastIndexOf(searchElement [, fromIndex])
  lastIndexOf: function lastIndexOf(searchElement /*, fromIndex = @[*-1] */){
    var O      = toIObject(this)
      , length = toLength(O.length)
      , index  = length - 1;
    if(arguments.length > 1)index = Math.min(index, toInteger(arguments[1]));
    if(index < 0)index = length + index;
    for(;index >= 0; index--)if(index in O)if(O[index] === searchElement)return index;
    return -1;
  }
});
},{"./_export":30,"./_strict-method":94,"./_to-integer":104,"./_to-iobject":105,"./_to-length":106}],130:[function(require,module,exports){
'use strict';
var $export = require('./_export')
  , $map    = require('./_array-methods')(1);

$export($export.P + $export.F * !require('./_strict-method')([].map, true), 'Array', {
  // 22.1.3.15 / 15.4.4.19 Array.prototype.map(callbackfn [, thisArg])
  map: function map(callbackfn /* , thisArg */){
    return $map(this, callbackfn, arguments[1]);
  }
});
},{"./_array-methods":12,"./_export":30,"./_strict-method":94}],131:[function(require,module,exports){
'use strict';
var $export = require('./_export');

// WebKit Array.of isn't generic
$export($export.S + $export.F * require('./_fails')(function(){
  function F(){}
  return !(Array.of.call(F) instanceof F);
}), 'Array', {
  // 22.1.2.3 Array.of( ...items)
  of: function of(/* ...args */){
    var index  = 0
      , aLen   = arguments.length
      , result = new (typeof this == 'function' ? this : Array)(aLen);
    while(aLen > index)result[index] = arguments[index++];
    result.length = aLen;
    return result;
  }
});
},{"./_export":30,"./_fails":32}],132:[function(require,module,exports){
'use strict';
var $export = require('./_export')
  , $reduce = require('./_array-reduce');

$export($export.P + $export.F * !require('./_strict-method')([].reduceRight, true), 'Array', {
  // 22.1.3.19 / 15.4.4.22 Array.prototype.reduceRight(callbackfn [, initialValue])
  reduceRight: function reduceRight(callbackfn /* , initialValue */){
    return $reduce(this, callbackfn, arguments.length, arguments[1], true);
  }
});
},{"./_array-reduce":13,"./_export":30,"./_strict-method":94}],133:[function(require,module,exports){
'use strict';
var $export = require('./_export')
  , $reduce = require('./_array-reduce');

$export($export.P + $export.F * !require('./_strict-method')([].reduce, true), 'Array', {
  // 22.1.3.18 / 15.4.4.21 Array.prototype.reduce(callbackfn [, initialValue])
  reduce: function reduce(callbackfn /* , initialValue */){
    return $reduce(this, callbackfn, arguments.length, arguments[1], false);
  }
});
},{"./_array-reduce":13,"./_export":30,"./_strict-method":94}],134:[function(require,module,exports){
'use strict';
var $export    = require('./_export')
  , html       = require('./_html')
  , cof        = require('./_cof')
  , toIndex    = require('./_to-index')
  , toLength   = require('./_to-length')
  , arraySlice = [].slice;

// fallback for not array-like ES3 strings and DOM objects
$export($export.P + $export.F * require('./_fails')(function(){
  if(html)arraySlice.call(html);
}), 'Array', {
  slice: function slice(begin, end){
    var len   = toLength(this.length)
      , klass = cof(this);
    end = end === undefined ? len : end;
    if(klass == 'Array')return arraySlice.call(this, begin, end);
    var start  = toIndex(begin, len)
      , upTo   = toIndex(end, len)
      , size   = toLength(upTo - start)
      , cloned = Array(size)
      , i      = 0;
    for(; i < size; i++)cloned[i] = klass == 'String'
      ? this.charAt(start + i)
      : this[start + i];
    return cloned;
  }
});
},{"./_cof":17,"./_export":30,"./_fails":32,"./_html":39,"./_to-index":103,"./_to-length":106}],135:[function(require,module,exports){
'use strict';
var $export = require('./_export')
  , $some   = require('./_array-methods')(3);

$export($export.P + $export.F * !require('./_strict-method')([].some, true), 'Array', {
  // 22.1.3.23 / 15.4.4.17 Array.prototype.some(callbackfn [, thisArg])
  some: function some(callbackfn /* , thisArg */){
    return $some(this, callbackfn, arguments[1]);
  }
});
},{"./_array-methods":12,"./_export":30,"./_strict-method":94}],136:[function(require,module,exports){
'use strict';
var $export   = require('./_export')
  , aFunction = require('./_a-function')
  , toObject  = require('./_to-object')
  , fails     = require('./_fails')
  , $sort     = [].sort
  , test      = [1, 2, 3];

$export($export.P + $export.F * (fails(function(){
  // IE8-
  test.sort(undefined);
}) || !fails(function(){
  // V8 bug
  test.sort(null);
  // Old WebKit
}) || !require('./_strict-method')($sort)), 'Array', {
  // 22.1.3.25 Array.prototype.sort(comparefn)
  sort: function sort(comparefn){
    return comparefn === undefined
      ? $sort.call(toObject(this))
      : $sort.call(toObject(this), aFunction(comparefn));
  }
});
},{"./_a-function":3,"./_export":30,"./_fails":32,"./_strict-method":94,"./_to-object":107}],137:[function(require,module,exports){
require('./_set-species')('Array');
},{"./_set-species":89}],138:[function(require,module,exports){
// 20.3.3.1 / 15.9.4.4 Date.now()
var $export = require('./_export');

$export($export.S, 'Date', {now: function(){ return new Date().getTime(); }});
},{"./_export":30}],139:[function(require,module,exports){
'use strict';
// 20.3.4.36 / 15.9.5.43 Date.prototype.toISOString()
var $export = require('./_export')
  , fails   = require('./_fails')
  , getTime = Date.prototype.getTime;

var lz = function(num){
  return num > 9 ? num : '0' + num;
};

// PhantomJS / old WebKit has a broken implementations
$export($export.P + $export.F * (fails(function(){
  return new Date(-5e13 - 1).toISOString() != '0385-07-25T07:06:39.999Z';
}) || !fails(function(){
  new Date(NaN).toISOString();
})), 'Date', {
  toISOString: function toISOString(){
    if(!isFinite(getTime.call(this)))throw RangeError('Invalid time value');
    var d = this
      , y = d.getUTCFullYear()
      , m = d.getUTCMilliseconds()
      , s = y < 0 ? '-' : y > 9999 ? '+' : '';
    return s + ('00000' + Math.abs(y)).slice(s ? -6 : -4) +
      '-' + lz(d.getUTCMonth() + 1) + '-' + lz(d.getUTCDate()) +
      'T' + lz(d.getUTCHours()) + ':' + lz(d.getUTCMinutes()) +
      ':' + lz(d.getUTCSeconds()) + '.' + (m > 99 ? m : '0' + lz(m)) + 'Z';
  }
});
},{"./_export":30,"./_fails":32}],140:[function(require,module,exports){
'use strict';
var $export     = require('./_export')
  , toObject    = require('./_to-object')
  , toPrimitive = require('./_to-primitive');

$export($export.P + $export.F * require('./_fails')(function(){
  return new Date(NaN).toJSON() !== null || Date.prototype.toJSON.call({toISOString: function(){ return 1; }}) !== 1;
}), 'Date', {
  toJSON: function toJSON(key){
    var O  = toObject(this)
      , pv = toPrimitive(O);
    return typeof pv == 'number' && !isFinite(pv) ? null : O.toISOString();
  }
});
},{"./_export":30,"./_fails":32,"./_to-object":107,"./_to-primitive":108}],141:[function(require,module,exports){
var TO_PRIMITIVE = require('./_wks')('toPrimitive')
  , proto        = Date.prototype;

if(!(TO_PRIMITIVE in proto))require('./_hide')(proto, TO_PRIMITIVE, require('./_date-to-primitive'));
},{"./_date-to-primitive":24,"./_hide":38,"./_wks":113}],142:[function(require,module,exports){
var DateProto    = Date.prototype
  , INVALID_DATE = 'Invalid Date'
  , TO_STRING    = 'toString'
  , $toString    = DateProto[TO_STRING]
  , getTime      = DateProto.getTime;
if(new Date(NaN) + '' != INVALID_DATE){
  require('./_redefine')(DateProto, TO_STRING, function toString(){
    var value = getTime.call(this);
    return value === value ? $toString.call(this) : INVALID_DATE;
  });
}
},{"./_redefine":85}],143:[function(require,module,exports){
// 19.2.3.2 / 15.3.4.5 Function.prototype.bind(thisArg, args...)
var $export = require('./_export');

$export($export.P, 'Function', {bind: require('./_bind')});
},{"./_bind":15,"./_export":30}],144:[function(require,module,exports){
'use strict';
var isObject       = require('./_is-object')
  , getPrototypeOf = require('./_object-gpo')
  , HAS_INSTANCE   = require('./_wks')('hasInstance')
  , FunctionProto  = Function.prototype;
// 19.2.3.6 Function.prototype[@@hasInstance](V)
if(!(HAS_INSTANCE in FunctionProto))require('./_object-dp').f(FunctionProto, HAS_INSTANCE, {value: function(O){
  if(typeof this != 'function' || !isObject(O))return false;
  if(!isObject(this.prototype))return O instanceof this;
  // for environment w/o native `@@hasInstance` logic enough `instanceof`, but add this:
  while(O = getPrototypeOf(O))if(this.prototype === O)return true;
  return false;
}});
},{"./_is-object":47,"./_object-dp":65,"./_object-gpo":72,"./_wks":113}],145:[function(require,module,exports){
var dP         = require('./_object-dp').f
  , createDesc = require('./_property-desc')
  , has        = require('./_has')
  , FProto     = Function.prototype
  , nameRE     = /^\s*function ([^ (]*)/
  , NAME       = 'name';
// 19.2.4.2 name
NAME in FProto || require('./_descriptors') && dP(FProto, NAME, {
  configurable: true,
  get: function(){
    var match = ('' + this).match(nameRE)
      , name  = match ? match[1] : '';
    has(this, NAME) || dP(this, NAME, createDesc(5, name));
    return name;
  }
});
},{"./_descriptors":26,"./_has":37,"./_object-dp":65,"./_property-desc":83}],146:[function(require,module,exports){
'use strict';
var strong = require('./_collection-strong');

// 23.1 Map Objects
module.exports = require('./_collection')('Map', function(get){
  return function Map(){ return get(this, arguments.length > 0 ? arguments[0] : undefined); };
}, {
  // 23.1.3.6 Map.prototype.get(key)
  get: function get(key){
    var entry = strong.getEntry(this, key);
    return entry && entry.v;
  },
  // 23.1.3.9 Map.prototype.set(key, value)
  set: function set(key, value){
    return strong.def(this, key === 0 ? 0 : key, value);
  }
}, strong, true);
},{"./_collection":21,"./_collection-strong":18}],147:[function(require,module,exports){
// 20.2.2.3 Math.acosh(x)
var $export = require('./_export')
  , log1p   = require('./_math-log1p')
  , sqrt    = Math.sqrt
  , $acosh  = Math.acosh;

// V8 bug https://code.google.com/p/v8/issues/detail?id=3509
$export($export.S + $export.F * !($acosh && Math.floor($acosh(Number.MAX_VALUE)) == 710), 'Math', {
  acosh: function acosh(x){
    return (x = +x) < 1 ? NaN : x > 94906265.62425156
      ? Math.log(x) + Math.LN2
      : log1p(x - 1 + sqrt(x - 1) * sqrt(x + 1));
  }
});
},{"./_export":30,"./_math-log1p":58}],148:[function(require,module,exports){
// 20.2.2.5 Math.asinh(x)
var $export = require('./_export');

function asinh(x){
  return !isFinite(x = +x) || x == 0 ? x : x < 0 ? -asinh(-x) : Math.log(x + Math.sqrt(x * x + 1));
}

$export($export.S, 'Math', {asinh: asinh});
},{"./_export":30}],149:[function(require,module,exports){
// 20.2.2.7 Math.atanh(x)
var $export = require('./_export');

$export($export.S, 'Math', {
  atanh: function atanh(x){
    return (x = +x) == 0 ? x : Math.log((1 + x) / (1 - x)) / 2;
  }
});
},{"./_export":30}],150:[function(require,module,exports){
// 20.2.2.9 Math.cbrt(x)
var $export = require('./_export')
  , sign    = require('./_math-sign');

$export($export.S, 'Math', {
  cbrt: function cbrt(x){
    return sign(x = +x) * Math.pow(Math.abs(x), 1 / 3);
  }
});
},{"./_export":30,"./_math-sign":59}],151:[function(require,module,exports){
// 20.2.2.11 Math.clz32(x)
var $export = require('./_export');

$export($export.S, 'Math', {
  clz32: function clz32(x){
    return (x >>>= 0) ? 31 - Math.floor(Math.log(x + 0.5) * Math.LOG2E) : 32;
  }
});
},{"./_export":30}],152:[function(require,module,exports){
// 20.2.2.12 Math.cosh(x)
var $export = require('./_export')
  , exp     = Math.exp;

$export($export.S, 'Math', {
  cosh: function cosh(x){
    return (exp(x = +x) + exp(-x)) / 2;
  }
});
},{"./_export":30}],153:[function(require,module,exports){
// 20.2.2.14 Math.expm1(x)
var $export = require('./_export');

$export($export.S, 'Math', {expm1: require('./_math-expm1')});
},{"./_export":30,"./_math-expm1":57}],154:[function(require,module,exports){
// 20.2.2.16 Math.fround(x)
var $export   = require('./_export')
  , sign      = require('./_math-sign')
  , pow       = Math.pow
  , EPSILON   = pow(2, -52)
  , EPSILON32 = pow(2, -23)
  , MAX32     = pow(2, 127) * (2 - EPSILON32)
  , MIN32     = pow(2, -126);

var roundTiesToEven = function(n){
  return n + 1 / EPSILON - 1 / EPSILON;
};


$export($export.S, 'Math', {
  fround: function fround(x){
    var $abs  = Math.abs(x)
      , $sign = sign(x)
      , a, result;
    if($abs < MIN32)return $sign * roundTiesToEven($abs / MIN32 / EPSILON32) * MIN32 * EPSILON32;
    a = (1 + EPSILON32 / EPSILON) * $abs;
    result = a - (a - $abs);
    if(result > MAX32 || result != result)return $sign * Infinity;
    return $sign * result;
  }
});
},{"./_export":30,"./_math-sign":59}],155:[function(require,module,exports){
// 20.2.2.17 Math.hypot([value1[, value2[, … ]]])
var $export = require('./_export')
  , abs     = Math.abs;

$export($export.S, 'Math', {
  hypot: function hypot(value1, value2){ // eslint-disable-line no-unused-vars
    var sum  = 0
      , i    = 0
      , aLen = arguments.length
      , larg = 0
      , arg, div;
    while(i < aLen){
      arg = abs(arguments[i++]);
      if(larg < arg){
        div  = larg / arg;
        sum  = sum * div * div + 1;
        larg = arg;
      } else if(arg > 0){
        div  = arg / larg;
        sum += div * div;
      } else sum += arg;
    }
    return larg === Infinity ? Infinity : larg * Math.sqrt(sum);
  }
});
},{"./_export":30}],156:[function(require,module,exports){
// 20.2.2.18 Math.imul(x, y)
var $export = require('./_export')
  , $imul   = Math.imul;

// some WebKit versions fails with big numbers, some has wrong arity
$export($export.S + $export.F * require('./_fails')(function(){
  return $imul(0xffffffff, 5) != -5 || $imul.length != 2;
}), 'Math', {
  imul: function imul(x, y){
    var UINT16 = 0xffff
      , xn = +x
      , yn = +y
      , xl = UINT16 & xn
      , yl = UINT16 & yn;
    return 0 | xl * yl + ((UINT16 & xn >>> 16) * yl + xl * (UINT16 & yn >>> 16) << 16 >>> 0);
  }
});
},{"./_export":30,"./_fails":32}],157:[function(require,module,exports){
// 20.2.2.21 Math.log10(x)
var $export = require('./_export');

$export($export.S, 'Math', {
  log10: function log10(x){
    return Math.log(x) / Math.LN10;
  }
});
},{"./_export":30}],158:[function(require,module,exports){
// 20.2.2.20 Math.log1p(x)
var $export = require('./_export');

$export($export.S, 'Math', {log1p: require('./_math-log1p')});
},{"./_export":30,"./_math-log1p":58}],159:[function(require,module,exports){
// 20.2.2.22 Math.log2(x)
var $export = require('./_export');

$export($export.S, 'Math', {
  log2: function log2(x){
    return Math.log(x) / Math.LN2;
  }
});
},{"./_export":30}],160:[function(require,module,exports){
// 20.2.2.28 Math.sign(x)
var $export = require('./_export');

$export($export.S, 'Math', {sign: require('./_math-sign')});
},{"./_export":30,"./_math-sign":59}],161:[function(require,module,exports){
// 20.2.2.30 Math.sinh(x)
var $export = require('./_export')
  , expm1   = require('./_math-expm1')
  , exp     = Math.exp;

// V8 near Chromium 38 has a problem with very small numbers
$export($export.S + $export.F * require('./_fails')(function(){
  return !Math.sinh(-2e-17) != -2e-17;
}), 'Math', {
  sinh: function sinh(x){
    return Math.abs(x = +x) < 1
      ? (expm1(x) - expm1(-x)) / 2
      : (exp(x - 1) - exp(-x - 1)) * (Math.E / 2);
  }
});
},{"./_export":30,"./_fails":32,"./_math-expm1":57}],162:[function(require,module,exports){
// 20.2.2.33 Math.tanh(x)
var $export = require('./_export')
  , expm1   = require('./_math-expm1')
  , exp     = Math.exp;

$export($export.S, 'Math', {
  tanh: function tanh(x){
    var a = expm1(x = +x)
      , b = expm1(-x);
    return a == Infinity ? 1 : b == Infinity ? -1 : (a - b) / (exp(x) + exp(-x));
  }
});
},{"./_export":30,"./_math-expm1":57}],163:[function(require,module,exports){
// 20.2.2.34 Math.trunc(x)
var $export = require('./_export');

$export($export.S, 'Math', {
  trunc: function trunc(it){
    return (it > 0 ? Math.floor : Math.ceil)(it);
  }
});
},{"./_export":30}],164:[function(require,module,exports){
'use strict';
var global            = require('./_global')
  , has               = require('./_has')
  , cof               = require('./_cof')
  , inheritIfRequired = require('./_inherit-if-required')
  , toPrimitive       = require('./_to-primitive')
  , fails             = require('./_fails')
  , gOPN              = require('./_object-gopn').f
  , gOPD              = require('./_object-gopd').f
  , dP                = require('./_object-dp').f
  , $trim             = require('./_string-trim').trim
  , NUMBER            = 'Number'
  , $Number           = global[NUMBER]
  , Base              = $Number
  , proto             = $Number.prototype
  // Opera ~12 has broken Object#toString
  , BROKEN_COF        = cof(require('./_object-create')(proto)) == NUMBER
  , TRIM              = 'trim' in String.prototype;

// 7.1.3 ToNumber(argument)
var toNumber = function(argument){
  var it = toPrimitive(argument, false);
  if(typeof it == 'string' && it.length > 2){
    it = TRIM ? it.trim() : $trim(it, 3);
    var first = it.charCodeAt(0)
      , third, radix, maxCode;
    if(first === 43 || first === 45){
      third = it.charCodeAt(2);
      if(third === 88 || third === 120)return NaN; // Number('+0x1') should be NaN, old V8 fix
    } else if(first === 48){
      switch(it.charCodeAt(1)){
        case 66 : case 98  : radix = 2; maxCode = 49; break; // fast equal /^0b[01]+$/i
        case 79 : case 111 : radix = 8; maxCode = 55; break; // fast equal /^0o[0-7]+$/i
        default : return +it;
      }
      for(var digits = it.slice(2), i = 0, l = digits.length, code; i < l; i++){
        code = digits.charCodeAt(i);
        // parseInt parses a string to a first unavailable symbol
        // but ToNumber should return NaN if a string contains unavailable symbols
        if(code < 48 || code > maxCode)return NaN;
      } return parseInt(digits, radix);
    }
  } return +it;
};

if(!$Number(' 0o1') || !$Number('0b1') || $Number('+0x1')){
  $Number = function Number(value){
    var it = arguments.length < 1 ? 0 : value
      , that = this;
    return that instanceof $Number
      // check on 1..constructor(foo) case
      && (BROKEN_COF ? fails(function(){ proto.valueOf.call(that); }) : cof(that) != NUMBER)
        ? inheritIfRequired(new Base(toNumber(it)), that, $Number) : toNumber(it);
  };
  for(var keys = require('./_descriptors') ? gOPN(Base) : (
    // ES3:
    'MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,' +
    // ES6 (in case, if modules with ES6 Number statics required before):
    'EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER,' +
    'MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger'
  ).split(','), j = 0, key; keys.length > j; j++){
    if(has(Base, key = keys[j]) && !has($Number, key)){
      dP($Number, key, gOPD(Base, key));
    }
  }
  $Number.prototype = proto;
  proto.constructor = $Number;
  require('./_redefine')(global, NUMBER, $Number);
}
},{"./_cof":17,"./_descriptors":26,"./_fails":32,"./_global":36,"./_has":37,"./_inherit-if-required":41,"./_object-create":64,"./_object-dp":65,"./_object-gopd":68,"./_object-gopn":70,"./_redefine":85,"./_string-trim":100,"./_to-primitive":108}],165:[function(require,module,exports){
// 20.1.2.1 Number.EPSILON
var $export = require('./_export');

$export($export.S, 'Number', {EPSILON: Math.pow(2, -52)});
},{"./_export":30}],166:[function(require,module,exports){
// 20.1.2.2 Number.isFinite(number)
var $export   = require('./_export')
  , _isFinite = require('./_global').isFinite;

$export($export.S, 'Number', {
  isFinite: function isFinite(it){
    return typeof it == 'number' && _isFinite(it);
  }
});
},{"./_export":30,"./_global":36}],167:[function(require,module,exports){
// 20.1.2.3 Number.isInteger(number)
var $export = require('./_export');

$export($export.S, 'Number', {isInteger: require('./_is-integer')});
},{"./_export":30,"./_is-integer":46}],168:[function(require,module,exports){
// 20.1.2.4 Number.isNaN(number)
var $export = require('./_export');

$export($export.S, 'Number', {
  isNaN: function isNaN(number){
    return number != number;
  }
});
},{"./_export":30}],169:[function(require,module,exports){
// 20.1.2.5 Number.isSafeInteger(number)
var $export   = require('./_export')
  , isInteger = require('./_is-integer')
  , abs       = Math.abs;

$export($export.S, 'Number', {
  isSafeInteger: function isSafeInteger(number){
    return isInteger(number) && abs(number) <= 0x1fffffffffffff;
  }
});
},{"./_export":30,"./_is-integer":46}],170:[function(require,module,exports){
// 20.1.2.6 Number.MAX_SAFE_INTEGER
var $export = require('./_export');

$export($export.S, 'Number', {MAX_SAFE_INTEGER: 0x1fffffffffffff});
},{"./_export":30}],171:[function(require,module,exports){
// 20.1.2.10 Number.MIN_SAFE_INTEGER
var $export = require('./_export');

$export($export.S, 'Number', {MIN_SAFE_INTEGER: -0x1fffffffffffff});
},{"./_export":30}],172:[function(require,module,exports){
var $export     = require('./_export')
  , $parseFloat = require('./_parse-float');
// 20.1.2.12 Number.parseFloat(string)
$export($export.S + $export.F * (Number.parseFloat != $parseFloat), 'Number', {parseFloat: $parseFloat});
},{"./_export":30,"./_parse-float":79}],173:[function(require,module,exports){
var $export   = require('./_export')
  , $parseInt = require('./_parse-int');
// 20.1.2.13 Number.parseInt(string, radix)
$export($export.S + $export.F * (Number.parseInt != $parseInt), 'Number', {parseInt: $parseInt});
},{"./_export":30,"./_parse-int":80}],174:[function(require,module,exports){
'use strict';
var $export      = require('./_export')
  , anInstance   = require('./_an-instance')
  , toInteger    = require('./_to-integer')
  , aNumberValue = require('./_a-number-value')
  , repeat       = require('./_string-repeat')
  , $toFixed     = 1..toFixed
  , floor        = Math.floor
  , data         = [0, 0, 0, 0, 0, 0]
  , ERROR        = 'Number.toFixed: incorrect invocation!'
  , ZERO         = '0';

var multiply = function(n, c){
  var i  = -1
    , c2 = c;
  while(++i < 6){
    c2 += n * data[i];
    data[i] = c2 % 1e7;
    c2 = floor(c2 / 1e7);
  }
};
var divide = function(n){
  var i = 6
    , c = 0;
  while(--i >= 0){
    c += data[i];
    data[i] = floor(c / n);
    c = (c % n) * 1e7;
  }
};
var numToString = function(){
  var i = 6
    , s = '';
  while(--i >= 0){
    if(s !== '' || i === 0 || data[i] !== 0){
      var t = String(data[i]);
      s = s === '' ? t : s + repeat.call(ZERO, 7 - t.length) + t;
    }
  } return s;
};
var pow = function(x, n, acc){
  return n === 0 ? acc : n % 2 === 1 ? pow(x, n - 1, acc * x) : pow(x * x, n / 2, acc);
};
var log = function(x){
  var n  = 0
    , x2 = x;
  while(x2 >= 4096){
    n += 12;
    x2 /= 4096;
  }
  while(x2 >= 2){
    n  += 1;
    x2 /= 2;
  } return n;
};

$export($export.P + $export.F * (!!$toFixed && (
  0.00008.toFixed(3) !== '0.000' ||
  0.9.toFixed(0) !== '1' ||
  1.255.toFixed(2) !== '1.25' ||
  1000000000000000128..toFixed(0) !== '1000000000000000128'
) || !require('./_fails')(function(){
  // V8 ~ Android 4.3-
  $toFixed.call({});
})), 'Number', {
  toFixed: function toFixed(fractionDigits){
    var x = aNumberValue(this, ERROR)
      , f = toInteger(fractionDigits)
      , s = ''
      , m = ZERO
      , e, z, j, k;
    if(f < 0 || f > 20)throw RangeError(ERROR);
    if(x != x)return 'NaN';
    if(x <= -1e21 || x >= 1e21)return String(x);
    if(x < 0){
      s = '-';
      x = -x;
    }
    if(x > 1e-21){
      e = log(x * pow(2, 69, 1)) - 69;
      z = e < 0 ? x * pow(2, -e, 1) : x / pow(2, e, 1);
      z *= 0x10000000000000;
      e = 52 - e;
      if(e > 0){
        multiply(0, z);
        j = f;
        while(j >= 7){
          multiply(1e7, 0);
          j -= 7;
        }
        multiply(pow(10, j, 1), 0);
        j = e - 1;
        while(j >= 23){
          divide(1 << 23);
          j -= 23;
        }
        divide(1 << j);
        multiply(1, 1);
        divide(2);
        m = numToString();
      } else {
        multiply(0, z);
        multiply(1 << -e, 0);
        m = numToString() + repeat.call(ZERO, f);
      }
    }
    if(f > 0){
      k = m.length;
      m = s + (k <= f ? '0.' + repeat.call(ZERO, f - k) + m : m.slice(0, k - f) + '.' + m.slice(k - f));
    } else {
      m = s + m;
    } return m;
  }
});
},{"./_a-number-value":4,"./_an-instance":6,"./_export":30,"./_fails":32,"./_string-repeat":99,"./_to-integer":104}],175:[function(require,module,exports){
'use strict';
var $export      = require('./_export')
  , $fails       = require('./_fails')
  , aNumberValue = require('./_a-number-value')
  , $toPrecision = 1..toPrecision;

$export($export.P + $export.F * ($fails(function(){
  // IE7-
  return $toPrecision.call(1, undefined) !== '1';
}) || !$fails(function(){
  // V8 ~ Android 4.3-
  $toPrecision.call({});
})), 'Number', {
  toPrecision: function toPrecision(precision){
    var that = aNumberValue(this, 'Number#toPrecision: incorrect invocation!');
    return precision === undefined ? $toPrecision.call(that) : $toPrecision.call(that, precision); 
  }
});
},{"./_a-number-value":4,"./_export":30,"./_fails":32}],176:[function(require,module,exports){
// 19.1.3.1 Object.assign(target, source)
var $export = require('./_export');

$export($export.S + $export.F, 'Object', {assign: require('./_object-assign')});
},{"./_export":30,"./_object-assign":63}],177:[function(require,module,exports){
var $export = require('./_export')
// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
$export($export.S, 'Object', {create: require('./_object-create')});
},{"./_export":30,"./_object-create":64}],178:[function(require,module,exports){
var $export = require('./_export');
// 19.1.2.3 / 15.2.3.7 Object.defineProperties(O, Properties)
$export($export.S + $export.F * !require('./_descriptors'), 'Object', {defineProperties: require('./_object-dps')});
},{"./_descriptors":26,"./_export":30,"./_object-dps":66}],179:[function(require,module,exports){
var $export = require('./_export');
// 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
$export($export.S + $export.F * !require('./_descriptors'), 'Object', {defineProperty: require('./_object-dp').f});
},{"./_descriptors":26,"./_export":30,"./_object-dp":65}],180:[function(require,module,exports){
// 19.1.2.5 Object.freeze(O)
var isObject = require('./_is-object')
  , meta     = require('./_meta').onFreeze;

require('./_object-sap')('freeze', function($freeze){
  return function freeze(it){
    return $freeze && isObject(it) ? $freeze(meta(it)) : it;
  };
});
},{"./_is-object":47,"./_meta":60,"./_object-sap":76}],181:[function(require,module,exports){
// 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
var toIObject                 = require('./_to-iobject')
  , $getOwnPropertyDescriptor = require('./_object-gopd').f;

require('./_object-sap')('getOwnPropertyDescriptor', function(){
  return function getOwnPropertyDescriptor(it, key){
    return $getOwnPropertyDescriptor(toIObject(it), key);
  };
});
},{"./_object-gopd":68,"./_object-sap":76,"./_to-iobject":105}],182:[function(require,module,exports){
// 19.1.2.7 Object.getOwnPropertyNames(O)
require('./_object-sap')('getOwnPropertyNames', function(){
  return require('./_object-gopn-ext').f;
});
},{"./_object-gopn-ext":69,"./_object-sap":76}],183:[function(require,module,exports){
// 19.1.2.9 Object.getPrototypeOf(O)
var toObject        = require('./_to-object')
  , $getPrototypeOf = require('./_object-gpo');

require('./_object-sap')('getPrototypeOf', function(){
  return function getPrototypeOf(it){
    return $getPrototypeOf(toObject(it));
  };
});
},{"./_object-gpo":72,"./_object-sap":76,"./_to-object":107}],184:[function(require,module,exports){
// 19.1.2.11 Object.isExtensible(O)
var isObject = require('./_is-object');

require('./_object-sap')('isExtensible', function($isExtensible){
  return function isExtensible(it){
    return isObject(it) ? $isExtensible ? $isExtensible(it) : true : false;
  };
});
},{"./_is-object":47,"./_object-sap":76}],185:[function(require,module,exports){
// 19.1.2.12 Object.isFrozen(O)
var isObject = require('./_is-object');

require('./_object-sap')('isFrozen', function($isFrozen){
  return function isFrozen(it){
    return isObject(it) ? $isFrozen ? $isFrozen(it) : false : true;
  };
});
},{"./_is-object":47,"./_object-sap":76}],186:[function(require,module,exports){
// 19.1.2.13 Object.isSealed(O)
var isObject = require('./_is-object');

require('./_object-sap')('isSealed', function($isSealed){
  return function isSealed(it){
    return isObject(it) ? $isSealed ? $isSealed(it) : false : true;
  };
});
},{"./_is-object":47,"./_object-sap":76}],187:[function(require,module,exports){
// 19.1.3.10 Object.is(value1, value2)
var $export = require('./_export');
$export($export.S, 'Object', {is: require('./_same-value')});
},{"./_export":30,"./_same-value":87}],188:[function(require,module,exports){
// 19.1.2.14 Object.keys(O)
var toObject = require('./_to-object')
  , $keys    = require('./_object-keys');

require('./_object-sap')('keys', function(){
  return function keys(it){
    return $keys(toObject(it));
  };
});
},{"./_object-keys":74,"./_object-sap":76,"./_to-object":107}],189:[function(require,module,exports){
// 19.1.2.15 Object.preventExtensions(O)
var isObject = require('./_is-object')
  , meta     = require('./_meta').onFreeze;

require('./_object-sap')('preventExtensions', function($preventExtensions){
  return function preventExtensions(it){
    return $preventExtensions && isObject(it) ? $preventExtensions(meta(it)) : it;
  };
});
},{"./_is-object":47,"./_meta":60,"./_object-sap":76}],190:[function(require,module,exports){
// 19.1.2.17 Object.seal(O)
var isObject = require('./_is-object')
  , meta     = require('./_meta').onFreeze;

require('./_object-sap')('seal', function($seal){
  return function seal(it){
    return $seal && isObject(it) ? $seal(meta(it)) : it;
  };
});
},{"./_is-object":47,"./_meta":60,"./_object-sap":76}],191:[function(require,module,exports){
// 19.1.3.19 Object.setPrototypeOf(O, proto)
var $export = require('./_export');
$export($export.S, 'Object', {setPrototypeOf: require('./_set-proto').set});
},{"./_export":30,"./_set-proto":88}],192:[function(require,module,exports){
'use strict';
// 19.1.3.6 Object.prototype.toString()
var classof = require('./_classof')
  , test    = {};
test[require('./_wks')('toStringTag')] = 'z';
if(test + '' != '[object z]'){
  require('./_redefine')(Object.prototype, 'toString', function toString(){
    return '[object ' + classof(this) + ']';
  }, true);
}
},{"./_classof":16,"./_redefine":85,"./_wks":113}],193:[function(require,module,exports){
var $export     = require('./_export')
  , $parseFloat = require('./_parse-float');
// 18.2.4 parseFloat(string)
$export($export.G + $export.F * (parseFloat != $parseFloat), {parseFloat: $parseFloat});
},{"./_export":30,"./_parse-float":79}],194:[function(require,module,exports){
var $export   = require('./_export')
  , $parseInt = require('./_parse-int');
// 18.2.5 parseInt(string, radix)
$export($export.G + $export.F * (parseInt != $parseInt), {parseInt: $parseInt});
},{"./_export":30,"./_parse-int":80}],195:[function(require,module,exports){
'use strict';
var LIBRARY            = require('./_library')
  , global             = require('./_global')
  , ctx                = require('./_ctx')
  , classof            = require('./_classof')
  , $export            = require('./_export')
  , isObject           = require('./_is-object')
  , anObject           = require('./_an-object')
  , aFunction          = require('./_a-function')
  , anInstance         = require('./_an-instance')
  , forOf              = require('./_for-of')
  , setProto           = require('./_set-proto').set
  , speciesConstructor = require('./_species-constructor')
  , task               = require('./_task').set
  , microtask          = require('./_microtask')
  , PROMISE            = 'Promise'
  , TypeError          = global.TypeError
  , process            = global.process
  , $Promise           = global[PROMISE]
  , process            = global.process
  , isNode             = classof(process) == 'process'
  , empty              = function(){ /* empty */ }
  , Internal, GenericPromiseCapability, Wrapper;

var USE_NATIVE = !!function(){
  try {
    // correct subclassing with @@species support
    var promise     = $Promise.resolve(1)
      , FakePromise = (promise.constructor = {})[require('./_wks')('species')] = function(exec){ exec(empty, empty); };
    // unhandled rejections tracking support, NodeJS Promise without it fails @@species test
    return (isNode || typeof PromiseRejectionEvent == 'function') && promise.then(empty) instanceof FakePromise;
  } catch(e){ /* empty */ }
}();

// helpers
var sameConstructor = function(a, b){
  // with library wrapper special case
  return a === b || a === $Promise && b === Wrapper;
};
var isThenable = function(it){
  var then;
  return isObject(it) && typeof (then = it.then) == 'function' ? then : false;
};
var newPromiseCapability = function(C){
  return sameConstructor($Promise, C)
    ? new PromiseCapability(C)
    : new GenericPromiseCapability(C);
};
var PromiseCapability = GenericPromiseCapability = function(C){
  var resolve, reject;
  this.promise = new C(function($$resolve, $$reject){
    if(resolve !== undefined || reject !== undefined)throw TypeError('Bad Promise constructor');
    resolve = $$resolve;
    reject  = $$reject;
  });
  this.resolve = aFunction(resolve);
  this.reject  = aFunction(reject);
};
var perform = function(exec){
  try {
    exec();
  } catch(e){
    return {error: e};
  }
};
var notify = function(promise, isReject){
  if(promise._n)return;
  promise._n = true;
  var chain = promise._c;
  microtask(function(){
    var value = promise._v
      , ok    = promise._s == 1
      , i     = 0;
    var run = function(reaction){
      var handler = ok ? reaction.ok : reaction.fail
        , resolve = reaction.resolve
        , reject  = reaction.reject
        , domain  = reaction.domain
        , result, then;
      try {
        if(handler){
          if(!ok){
            if(promise._h == 2)onHandleUnhandled(promise);
            promise._h = 1;
          }
          if(handler === true)result = value;
          else {
            if(domain)domain.enter();
            result = handler(value);
            if(domain)domain.exit();
          }
          if(result === reaction.promise){
            reject(TypeError('Promise-chain cycle'));
          } else if(then = isThenable(result)){
            then.call(result, resolve, reject);
          } else resolve(result);
        } else reject(value);
      } catch(e){
        reject(e);
      }
    };
    while(chain.length > i)run(chain[i++]); // variable length - can't use forEach
    promise._c = [];
    promise._n = false;
    if(isReject && !promise._h)onUnhandled(promise);
  });
};
var onUnhandled = function(promise){
  task.call(global, function(){
    var value = promise._v
      , abrupt, handler, console;
    if(isUnhandled(promise)){
      abrupt = perform(function(){
        if(isNode){
          process.emit('unhandledRejection', value, promise);
        } else if(handler = global.onunhandledrejection){
          handler({promise: promise, reason: value});
        } else if((console = global.console) && console.error){
          console.error('Unhandled promise rejection', value);
        }
      });
      // Browsers should not trigger `rejectionHandled` event if it was handled here, NodeJS - should
      promise._h = isNode || isUnhandled(promise) ? 2 : 1;
    } promise._a = undefined;
    if(abrupt)throw abrupt.error;
  });
};
var isUnhandled = function(promise){
  if(promise._h == 1)return false;
  var chain = promise._a || promise._c
    , i     = 0
    , reaction;
  while(chain.length > i){
    reaction = chain[i++];
    if(reaction.fail || !isUnhandled(reaction.promise))return false;
  } return true;
};
var onHandleUnhandled = function(promise){
  task.call(global, function(){
    var handler;
    if(isNode){
      process.emit('rejectionHandled', promise);
    } else if(handler = global.onrejectionhandled){
      handler({promise: promise, reason: promise._v});
    }
  });
};
var $reject = function(value){
  var promise = this;
  if(promise._d)return;
  promise._d = true;
  promise = promise._w || promise; // unwrap
  promise._v = value;
  promise._s = 2;
  if(!promise._a)promise._a = promise._c.slice();
  notify(promise, true);
};
var $resolve = function(value){
  var promise = this
    , then;
  if(promise._d)return;
  promise._d = true;
  promise = promise._w || promise; // unwrap
  try {
    if(promise === value)throw TypeError("Promise can't be resolved itself");
    if(then = isThenable(value)){
      microtask(function(){
        var wrapper = {_w: promise, _d: false}; // wrap
        try {
          then.call(value, ctx($resolve, wrapper, 1), ctx($reject, wrapper, 1));
        } catch(e){
          $reject.call(wrapper, e);
        }
      });
    } else {
      promise._v = value;
      promise._s = 1;
      notify(promise, false);
    }
  } catch(e){
    $reject.call({_w: promise, _d: false}, e); // wrap
  }
};

// constructor polyfill
if(!USE_NATIVE){
  // 25.4.3.1 Promise(executor)
  $Promise = function Promise(executor){
    anInstance(this, $Promise, PROMISE, '_h');
    aFunction(executor);
    Internal.call(this);
    try {
      executor(ctx($resolve, this, 1), ctx($reject, this, 1));
    } catch(err){
      $reject.call(this, err);
    }
  };
  Internal = function Promise(executor){
    this._c = [];             // <- awaiting reactions
    this._a = undefined;      // <- checked in isUnhandled reactions
    this._s = 0;              // <- state
    this._d = false;          // <- done
    this._v = undefined;      // <- value
    this._h = 0;              // <- rejection state, 0 - default, 1 - handled, 2 - unhandled
    this._n = false;          // <- notify
  };
  Internal.prototype = require('./_redefine-all')($Promise.prototype, {
    // 25.4.5.3 Promise.prototype.then(onFulfilled, onRejected)
    then: function then(onFulfilled, onRejected){
      var reaction    = newPromiseCapability(speciesConstructor(this, $Promise));
      reaction.ok     = typeof onFulfilled == 'function' ? onFulfilled : true;
      reaction.fail   = typeof onRejected == 'function' && onRejected;
      reaction.domain = isNode ? process.domain : undefined;
      this._c.push(reaction);
      if(this._a)this._a.push(reaction);
      if(this._s)notify(this, false);
      return reaction.promise;
    },
    // 25.4.5.1 Promise.prototype.catch(onRejected)
    'catch': function(onRejected){
      return this.then(undefined, onRejected);
    }
  });
  PromiseCapability = function(){
    var promise  = new Internal;
    this.promise = promise;
    this.resolve = ctx($resolve, promise, 1);
    this.reject  = ctx($reject, promise, 1);
  };
}

$export($export.G + $export.W + $export.F * !USE_NATIVE, {Promise: $Promise});
require('./_set-to-string-tag')($Promise, PROMISE);
require('./_set-species')(PROMISE);
Wrapper = require('./_core')[PROMISE];

// statics
$export($export.S + $export.F * !USE_NATIVE, PROMISE, {
  // 25.4.4.5 Promise.reject(r)
  reject: function reject(r){
    var capability = newPromiseCapability(this)
      , $$reject   = capability.reject;
    $$reject(r);
    return capability.promise;
  }
});
$export($export.S + $export.F * (LIBRARY || !USE_NATIVE), PROMISE, {
  // 25.4.4.6 Promise.resolve(x)
  resolve: function resolve(x){
    // instanceof instead of internal slot check because we should fix it without replacement native Promise core
    if(x instanceof $Promise && sameConstructor(x.constructor, this))return x;
    var capability = newPromiseCapability(this)
      , $$resolve  = capability.resolve;
    $$resolve(x);
    return capability.promise;
  }
});
$export($export.S + $export.F * !(USE_NATIVE && require('./_iter-detect')(function(iter){
  $Promise.all(iter)['catch'](empty);
})), PROMISE, {
  // 25.4.4.1 Promise.all(iterable)
  all: function all(iterable){
    var C          = this
      , capability = newPromiseCapability(C)
      , resolve    = capability.resolve
      , reject     = capability.reject;
    var abrupt = perform(function(){
      var values    = []
        , index     = 0
        , remaining = 1;
      forOf(iterable, false, function(promise){
        var $index        = index++
          , alreadyCalled = false;
        values.push(undefined);
        remaining++;
        C.resolve(promise).then(function(value){
          if(alreadyCalled)return;
          alreadyCalled  = true;
          values[$index] = value;
          --remaining || resolve(values);
        }, reject);
      });
      --remaining || resolve(values);
    });
    if(abrupt)reject(abrupt.error);
    return capability.promise;
  },
  // 25.4.4.4 Promise.race(iterable)
  race: function race(iterable){
    var C          = this
      , capability = newPromiseCapability(C)
      , reject     = capability.reject;
    var abrupt = perform(function(){
      forOf(iterable, false, function(promise){
        C.resolve(promise).then(capability.resolve, reject);
      });
    });
    if(abrupt)reject(abrupt.error);
    return capability.promise;
  }
});
},{"./_a-function":3,"./_an-instance":6,"./_an-object":7,"./_classof":16,"./_core":22,"./_ctx":23,"./_export":30,"./_for-of":35,"./_global":36,"./_is-object":47,"./_iter-detect":52,"./_library":56,"./_microtask":62,"./_redefine-all":84,"./_set-proto":88,"./_set-species":89,"./_set-to-string-tag":90,"./_species-constructor":93,"./_task":102,"./_wks":113}],196:[function(require,module,exports){
// 26.1.1 Reflect.apply(target, thisArgument, argumentsList)
var $export = require('./_export')
  , _apply  = Function.apply;

$export($export.S, 'Reflect', {
  apply: function apply(target, thisArgument, argumentsList){
    return _apply.call(target, thisArgument, argumentsList);
  }
});
},{"./_export":30}],197:[function(require,module,exports){
// 26.1.2 Reflect.construct(target, argumentsList [, newTarget])
var $export   = require('./_export')
  , create    = require('./_object-create')
  , aFunction = require('./_a-function')
  , anObject  = require('./_an-object')
  , isObject  = require('./_is-object')
  , bind      = require('./_bind');

// MS Edge supports only 2 arguments
// FF Nightly sets third argument as `new.target`, but does not create `this` from it
$export($export.S + $export.F * require('./_fails')(function(){
  function F(){}
  return !(Reflect.construct(function(){}, [], F) instanceof F);
}), 'Reflect', {
  construct: function construct(Target, args /*, newTarget*/){
    aFunction(Target);
    var newTarget = arguments.length < 3 ? Target : aFunction(arguments[2]);
    if(Target == newTarget){
      // w/o altered newTarget, optimization for 0-4 arguments
      if(args != undefined)switch(anObject(args).length){
        case 0: return new Target;
        case 1: return new Target(args[0]);
        case 2: return new Target(args[0], args[1]);
        case 3: return new Target(args[0], args[1], args[2]);
        case 4: return new Target(args[0], args[1], args[2], args[3]);
      }
      // w/o altered newTarget, lot of arguments case
      var $args = [null];
      $args.push.apply($args, args);
      return new (bind.apply(Target, $args));
    }
    // with altered newTarget, not support built-in constructors
    var proto    = newTarget.prototype
      , instance = create(isObject(proto) ? proto : Object.prototype)
      , result   = Function.apply.call(Target, instance, args);
    return isObject(result) ? result : instance;
  }
});
},{"./_a-function":3,"./_an-object":7,"./_bind":15,"./_export":30,"./_fails":32,"./_is-object":47,"./_object-create":64}],198:[function(require,module,exports){
// 26.1.3 Reflect.defineProperty(target, propertyKey, attributes)
var dP          = require('./_object-dp')
  , $export     = require('./_export')
  , anObject    = require('./_an-object')
  , toPrimitive = require('./_to-primitive');

// MS Edge has broken Reflect.defineProperty - throwing instead of returning false
$export($export.S + $export.F * require('./_fails')(function(){
  Reflect.defineProperty(dP.f({}, 1, {value: 1}), 1, {value: 2});
}), 'Reflect', {
  defineProperty: function defineProperty(target, propertyKey, attributes){
    anObject(target);
    propertyKey = toPrimitive(propertyKey, true);
    anObject(attributes);
    try {
      dP.f(target, propertyKey, attributes);
      return true;
    } catch(e){
      return false;
    }
  }
});
},{"./_an-object":7,"./_export":30,"./_fails":32,"./_object-dp":65,"./_to-primitive":108}],199:[function(require,module,exports){
// 26.1.4 Reflect.deleteProperty(target, propertyKey)
var $export  = require('./_export')
  , gOPD     = require('./_object-gopd').f
  , anObject = require('./_an-object');

$export($export.S, 'Reflect', {
  deleteProperty: function deleteProperty(target, propertyKey){
    var desc = gOPD(anObject(target), propertyKey);
    return desc && !desc.configurable ? false : delete target[propertyKey];
  }
});
},{"./_an-object":7,"./_export":30,"./_object-gopd":68}],200:[function(require,module,exports){
'use strict';
// 26.1.5 Reflect.enumerate(target)
var $export  = require('./_export')
  , anObject = require('./_an-object');
var Enumerate = function(iterated){
  this._t = anObject(iterated); // target
  this._i = 0;                  // next index
  var keys = this._k = []       // keys
    , key;
  for(key in iterated)keys.push(key);
};
require('./_iter-create')(Enumerate, 'Object', function(){
  var that = this
    , keys = that._k
    , key;
  do {
    if(that._i >= keys.length)return {value: undefined, done: true};
  } while(!((key = keys[that._i++]) in that._t));
  return {value: key, done: false};
});

$export($export.S, 'Reflect', {
  enumerate: function enumerate(target){
    return new Enumerate(target);
  }
});
},{"./_an-object":7,"./_export":30,"./_iter-create":50}],201:[function(require,module,exports){
// 26.1.7 Reflect.getOwnPropertyDescriptor(target, propertyKey)
var gOPD     = require('./_object-gopd')
  , $export  = require('./_export')
  , anObject = require('./_an-object');

$export($export.S, 'Reflect', {
  getOwnPropertyDescriptor: function getOwnPropertyDescriptor(target, propertyKey){
    return gOPD.f(anObject(target), propertyKey);
  }
});
},{"./_an-object":7,"./_export":30,"./_object-gopd":68}],202:[function(require,module,exports){
// 26.1.8 Reflect.getPrototypeOf(target)
var $export  = require('./_export')
  , getProto = require('./_object-gpo')
  , anObject = require('./_an-object');

$export($export.S, 'Reflect', {
  getPrototypeOf: function getPrototypeOf(target){
    return getProto(anObject(target));
  }
});
},{"./_an-object":7,"./_export":30,"./_object-gpo":72}],203:[function(require,module,exports){
// 26.1.6 Reflect.get(target, propertyKey [, receiver])
var gOPD           = require('./_object-gopd')
  , getPrototypeOf = require('./_object-gpo')
  , has            = require('./_has')
  , $export        = require('./_export')
  , isObject       = require('./_is-object')
  , anObject       = require('./_an-object');

function get(target, propertyKey/*, receiver*/){
  var receiver = arguments.length < 3 ? target : arguments[2]
    , desc, proto;
  if(anObject(target) === receiver)return target[propertyKey];
  if(desc = gOPD.f(target, propertyKey))return has(desc, 'value')
    ? desc.value
    : desc.get !== undefined
      ? desc.get.call(receiver)
      : undefined;
  if(isObject(proto = getPrototypeOf(target)))return get(proto, propertyKey, receiver);
}

$export($export.S, 'Reflect', {get: get});
},{"./_an-object":7,"./_export":30,"./_has":37,"./_is-object":47,"./_object-gopd":68,"./_object-gpo":72}],204:[function(require,module,exports){
// 26.1.9 Reflect.has(target, propertyKey)
var $export = require('./_export');

$export($export.S, 'Reflect', {
  has: function has(target, propertyKey){
    return propertyKey in target;
  }
});
},{"./_export":30}],205:[function(require,module,exports){
// 26.1.10 Reflect.isExtensible(target)
var $export       = require('./_export')
  , anObject      = require('./_an-object')
  , $isExtensible = Object.isExtensible;

$export($export.S, 'Reflect', {
  isExtensible: function isExtensible(target){
    anObject(target);
    return $isExtensible ? $isExtensible(target) : true;
  }
});
},{"./_an-object":7,"./_export":30}],206:[function(require,module,exports){
// 26.1.11 Reflect.ownKeys(target)
var $export = require('./_export');

$export($export.S, 'Reflect', {ownKeys: require('./_own-keys')});
},{"./_export":30,"./_own-keys":78}],207:[function(require,module,exports){
// 26.1.12 Reflect.preventExtensions(target)
var $export            = require('./_export')
  , anObject           = require('./_an-object')
  , $preventExtensions = Object.preventExtensions;

$export($export.S, 'Reflect', {
  preventExtensions: function preventExtensions(target){
    anObject(target);
    try {
      if($preventExtensions)$preventExtensions(target);
      return true;
    } catch(e){
      return false;
    }
  }
});
},{"./_an-object":7,"./_export":30}],208:[function(require,module,exports){
// 26.1.14 Reflect.setPrototypeOf(target, proto)
var $export  = require('./_export')
  , setProto = require('./_set-proto');

if(setProto)$export($export.S, 'Reflect', {
  setPrototypeOf: function setPrototypeOf(target, proto){
    setProto.check(target, proto);
    try {
      setProto.set(target, proto);
      return true;
    } catch(e){
      return false;
    }
  }
});
},{"./_export":30,"./_set-proto":88}],209:[function(require,module,exports){
// 26.1.13 Reflect.set(target, propertyKey, V [, receiver])
var dP             = require('./_object-dp')
  , gOPD           = require('./_object-gopd')
  , getPrototypeOf = require('./_object-gpo')
  , has            = require('./_has')
  , $export        = require('./_export')
  , createDesc     = require('./_property-desc')
  , anObject       = require('./_an-object')
  , isObject       = require('./_is-object');

function set(target, propertyKey, V/*, receiver*/){
  var receiver = arguments.length < 4 ? target : arguments[3]
    , ownDesc  = gOPD.f(anObject(target), propertyKey)
    , existingDescriptor, proto;
  if(!ownDesc){
    if(isObject(proto = getPrototypeOf(target))){
      return set(proto, propertyKey, V, receiver);
    }
    ownDesc = createDesc(0);
  }
  if(has(ownDesc, 'value')){
    if(ownDesc.writable === false || !isObject(receiver))return false;
    existingDescriptor = gOPD.f(receiver, propertyKey) || createDesc(0);
    existingDescriptor.value = V;
    dP.f(receiver, propertyKey, existingDescriptor);
    return true;
  }
  return ownDesc.set === undefined ? false : (ownDesc.set.call(receiver, V), true);
}

$export($export.S, 'Reflect', {set: set});
},{"./_an-object":7,"./_export":30,"./_has":37,"./_is-object":47,"./_object-dp":65,"./_object-gopd":68,"./_object-gpo":72,"./_property-desc":83}],210:[function(require,module,exports){
var global            = require('./_global')
  , inheritIfRequired = require('./_inherit-if-required')
  , dP                = require('./_object-dp').f
  , gOPN              = require('./_object-gopn').f
  , isRegExp          = require('./_is-regexp')
  , $flags            = require('./_flags')
  , $RegExp           = global.RegExp
  , Base              = $RegExp
  , proto             = $RegExp.prototype
  , re1               = /a/g
  , re2               = /a/g
  // "new" creates a new object, old webkit buggy here
  , CORRECT_NEW       = new $RegExp(re1) !== re1;

if(require('./_descriptors') && (!CORRECT_NEW || require('./_fails')(function(){
  re2[require('./_wks')('match')] = false;
  // RegExp constructor can alter flags and IsRegExp works correct with @@match
  return $RegExp(re1) != re1 || $RegExp(re2) == re2 || $RegExp(re1, 'i') != '/a/i';
}))){
  $RegExp = function RegExp(p, f){
    var tiRE = this instanceof $RegExp
      , piRE = isRegExp(p)
      , fiU  = f === undefined;
    return !tiRE && piRE && p.constructor === $RegExp && fiU ? p
      : inheritIfRequired(CORRECT_NEW
        ? new Base(piRE && !fiU ? p.source : p, f)
        : Base((piRE = p instanceof $RegExp) ? p.source : p, piRE && fiU ? $flags.call(p) : f)
      , tiRE ? this : proto, $RegExp);
  };
  var proxy = function(key){
    key in $RegExp || dP($RegExp, key, {
      configurable: true,
      get: function(){ return Base[key]; },
      set: function(it){ Base[key] = it; }
    });
  };
  for(var keys = gOPN(Base), i = 0; keys.length > i; )proxy(keys[i++]);
  proto.constructor = $RegExp;
  $RegExp.prototype = proto;
  require('./_redefine')(global, 'RegExp', $RegExp);
}

require('./_set-species')('RegExp');
},{"./_descriptors":26,"./_fails":32,"./_flags":34,"./_global":36,"./_inherit-if-required":41,"./_is-regexp":48,"./_object-dp":65,"./_object-gopn":70,"./_redefine":85,"./_set-species":89,"./_wks":113}],211:[function(require,module,exports){
// 21.2.5.3 get RegExp.prototype.flags()
if(require('./_descriptors') && /./g.flags != 'g')require('./_object-dp').f(RegExp.prototype, 'flags', {
  configurable: true,
  get: require('./_flags')
});
},{"./_descriptors":26,"./_flags":34,"./_object-dp":65}],212:[function(require,module,exports){
// @@match logic
require('./_fix-re-wks')('match', 1, function(defined, MATCH, $match){
  // 21.1.3.11 String.prototype.match(regexp)
  return [function match(regexp){
    'use strict';
    var O  = defined(this)
      , fn = regexp == undefined ? undefined : regexp[MATCH];
    return fn !== undefined ? fn.call(regexp, O) : new RegExp(regexp)[MATCH](String(O));
  }, $match];
});
},{"./_fix-re-wks":33}],213:[function(require,module,exports){
// @@replace logic
require('./_fix-re-wks')('replace', 2, function(defined, REPLACE, $replace){
  // 21.1.3.14 String.prototype.replace(searchValue, replaceValue)
  return [function replace(searchValue, replaceValue){
    'use strict';
    var O  = defined(this)
      , fn = searchValue == undefined ? undefined : searchValue[REPLACE];
    return fn !== undefined
      ? fn.call(searchValue, O, replaceValue)
      : $replace.call(String(O), searchValue, replaceValue);
  }, $replace];
});
},{"./_fix-re-wks":33}],214:[function(require,module,exports){
// @@search logic
require('./_fix-re-wks')('search', 1, function(defined, SEARCH, $search){
  // 21.1.3.15 String.prototype.search(regexp)
  return [function search(regexp){
    'use strict';
    var O  = defined(this)
      , fn = regexp == undefined ? undefined : regexp[SEARCH];
    return fn !== undefined ? fn.call(regexp, O) : new RegExp(regexp)[SEARCH](String(O));
  }, $search];
});
},{"./_fix-re-wks":33}],215:[function(require,module,exports){
// @@split logic
require('./_fix-re-wks')('split', 2, function(defined, SPLIT, $split){
  'use strict';
  var isRegExp   = require('./_is-regexp')
    , _split     = $split
    , $push      = [].push
    , $SPLIT     = 'split'
    , LENGTH     = 'length'
    , LAST_INDEX = 'lastIndex';
  if(
    'abbc'[$SPLIT](/(b)*/)[1] == 'c' ||
    'test'[$SPLIT](/(?:)/, -1)[LENGTH] != 4 ||
    'ab'[$SPLIT](/(?:ab)*/)[LENGTH] != 2 ||
    '.'[$SPLIT](/(.?)(.?)/)[LENGTH] != 4 ||
    '.'[$SPLIT](/()()/)[LENGTH] > 1 ||
    ''[$SPLIT](/.?/)[LENGTH]
  ){
    var NPCG = /()??/.exec('')[1] === undefined; // nonparticipating capturing group
    // based on es5-shim implementation, need to rework it
    $split = function(separator, limit){
      var string = String(this);
      if(separator === undefined && limit === 0)return [];
      // If `separator` is not a regex, use native split
      if(!isRegExp(separator))return _split.call(string, separator, limit);
      var output = [];
      var flags = (separator.ignoreCase ? 'i' : '') +
                  (separator.multiline ? 'm' : '') +
                  (separator.unicode ? 'u' : '') +
                  (separator.sticky ? 'y' : '');
      var lastLastIndex = 0;
      var splitLimit = limit === undefined ? 4294967295 : limit >>> 0;
      // Make `global` and avoid `lastIndex` issues by working with a copy
      var separatorCopy = new RegExp(separator.source, flags + 'g');
      var separator2, match, lastIndex, lastLength, i;
      // Doesn't need flags gy, but they don't hurt
      if(!NPCG)separator2 = new RegExp('^' + separatorCopy.source + '$(?!\\s)', flags);
      while(match = separatorCopy.exec(string)){
        // `separatorCopy.lastIndex` is not reliable cross-browser
        lastIndex = match.index + match[0][LENGTH];
        if(lastIndex > lastLastIndex){
          output.push(string.slice(lastLastIndex, match.index));
          // Fix browsers whose `exec` methods don't consistently return `undefined` for NPCG
          if(!NPCG && match[LENGTH] > 1)match[0].replace(separator2, function(){
            for(i = 1; i < arguments[LENGTH] - 2; i++)if(arguments[i] === undefined)match[i] = undefined;
          });
          if(match[LENGTH] > 1 && match.index < string[LENGTH])$push.apply(output, match.slice(1));
          lastLength = match[0][LENGTH];
          lastLastIndex = lastIndex;
          if(output[LENGTH] >= splitLimit)break;
        }
        if(separatorCopy[LAST_INDEX] === match.index)separatorCopy[LAST_INDEX]++; // Avoid an infinite loop
      }
      if(lastLastIndex === string[LENGTH]){
        if(lastLength || !separatorCopy.test(''))output.push('');
      } else output.push(string.slice(lastLastIndex));
      return output[LENGTH] > splitLimit ? output.slice(0, splitLimit) : output;
    };
  // Chakra, V8
  } else if('0'[$SPLIT](undefined, 0)[LENGTH]){
    $split = function(separator, limit){
      return separator === undefined && limit === 0 ? [] : _split.call(this, separator, limit);
    };
  }
  // 21.1.3.17 String.prototype.split(separator, limit)
  return [function split(separator, limit){
    var O  = defined(this)
      , fn = separator == undefined ? undefined : separator[SPLIT];
    return fn !== undefined ? fn.call(separator, O, limit) : $split.call(String(O), separator, limit);
  }, $split];
});
},{"./_fix-re-wks":33,"./_is-regexp":48}],216:[function(require,module,exports){
'use strict';
require('./es6.regexp.flags');
var anObject    = require('./_an-object')
  , $flags      = require('./_flags')
  , DESCRIPTORS = require('./_descriptors')
  , TO_STRING   = 'toString'
  , $toString   = /./[TO_STRING];

var define = function(fn){
  require('./_redefine')(RegExp.prototype, TO_STRING, fn, true);
};

// 21.2.5.14 RegExp.prototype.toString()
if(require('./_fails')(function(){ return $toString.call({source: 'a', flags: 'b'}) != '/a/b'; })){
  define(function toString(){
    var R = anObject(this);
    return '/'.concat(R.source, '/',
      'flags' in R ? R.flags : !DESCRIPTORS && R instanceof RegExp ? $flags.call(R) : undefined);
  });
// FF44- RegExp#toString has a wrong name
} else if($toString.name != TO_STRING){
  define(function toString(){
    return $toString.call(this);
  });
}
},{"./_an-object":7,"./_descriptors":26,"./_fails":32,"./_flags":34,"./_redefine":85,"./es6.regexp.flags":211}],217:[function(require,module,exports){
'use strict';
var strong = require('./_collection-strong');

// 23.2 Set Objects
module.exports = require('./_collection')('Set', function(get){
  return function Set(){ return get(this, arguments.length > 0 ? arguments[0] : undefined); };
}, {
  // 23.2.3.1 Set.prototype.add(value)
  add: function add(value){
    return strong.def(this, value = value === 0 ? 0 : value, value);
  }
}, strong);
},{"./_collection":21,"./_collection-strong":18}],218:[function(require,module,exports){
'use strict';
// B.2.3.2 String.prototype.anchor(name)
require('./_string-html')('anchor', function(createHTML){
  return function anchor(name){
    return createHTML(this, 'a', 'name', name);
  }
});
},{"./_string-html":97}],219:[function(require,module,exports){
'use strict';
// B.2.3.3 String.prototype.big()
require('./_string-html')('big', function(createHTML){
  return function big(){
    return createHTML(this, 'big', '', '');
  }
});
},{"./_string-html":97}],220:[function(require,module,exports){
'use strict';
// B.2.3.4 String.prototype.blink()
require('./_string-html')('blink', function(createHTML){
  return function blink(){
    return createHTML(this, 'blink', '', '');
  }
});
},{"./_string-html":97}],221:[function(require,module,exports){
'use strict';
// B.2.3.5 String.prototype.bold()
require('./_string-html')('bold', function(createHTML){
  return function bold(){
    return createHTML(this, 'b', '', '');
  }
});
},{"./_string-html":97}],222:[function(require,module,exports){
'use strict';
var $export = require('./_export')
  , $at     = require('./_string-at')(false);
$export($export.P, 'String', {
  // 21.1.3.3 String.prototype.codePointAt(pos)
  codePointAt: function codePointAt(pos){
    return $at(this, pos);
  }
});
},{"./_export":30,"./_string-at":95}],223:[function(require,module,exports){
// 21.1.3.6 String.prototype.endsWith(searchString [, endPosition])
'use strict';
var $export   = require('./_export')
  , toLength  = require('./_to-length')
  , context   = require('./_string-context')
  , ENDS_WITH = 'endsWith'
  , $endsWith = ''[ENDS_WITH];

$export($export.P + $export.F * require('./_fails-is-regexp')(ENDS_WITH), 'String', {
  endsWith: function endsWith(searchString /*, endPosition = @length */){
    var that = context(this, searchString, ENDS_WITH)
      , endPosition = arguments.length > 1 ? arguments[1] : undefined
      , len    = toLength(that.length)
      , end    = endPosition === undefined ? len : Math.min(toLength(endPosition), len)
      , search = String(searchString);
    return $endsWith
      ? $endsWith.call(that, search, end)
      : that.slice(end - search.length, end) === search;
  }
});
},{"./_export":30,"./_fails-is-regexp":31,"./_string-context":96,"./_to-length":106}],224:[function(require,module,exports){
'use strict';
// B.2.3.6 String.prototype.fixed()
require('./_string-html')('fixed', function(createHTML){
  return function fixed(){
    return createHTML(this, 'tt', '', '');
  }
});
},{"./_string-html":97}],225:[function(require,module,exports){
'use strict';
// B.2.3.7 String.prototype.fontcolor(color)
require('./_string-html')('fontcolor', function(createHTML){
  return function fontcolor(color){
    return createHTML(this, 'font', 'color', color);
  }
});
},{"./_string-html":97}],226:[function(require,module,exports){
'use strict';
// B.2.3.8 String.prototype.fontsize(size)
require('./_string-html')('fontsize', function(createHTML){
  return function fontsize(size){
    return createHTML(this, 'font', 'size', size);
  }
});
},{"./_string-html":97}],227:[function(require,module,exports){
var $export        = require('./_export')
  , toIndex        = require('./_to-index')
  , fromCharCode   = String.fromCharCode
  , $fromCodePoint = String.fromCodePoint;

// length should be 1, old FF problem
$export($export.S + $export.F * (!!$fromCodePoint && $fromCodePoint.length != 1), 'String', {
  // 21.1.2.2 String.fromCodePoint(...codePoints)
  fromCodePoint: function fromCodePoint(x){ // eslint-disable-line no-unused-vars
    var res  = []
      , aLen = arguments.length
      , i    = 0
      , code;
    while(aLen > i){
      code = +arguments[i++];
      if(toIndex(code, 0x10ffff) !== code)throw RangeError(code + ' is not a valid code point');
      res.push(code < 0x10000
        ? fromCharCode(code)
        : fromCharCode(((code -= 0x10000) >> 10) + 0xd800, code % 0x400 + 0xdc00)
      );
    } return res.join('');
  }
});
},{"./_export":30,"./_to-index":103}],228:[function(require,module,exports){
// 21.1.3.7 String.prototype.includes(searchString, position = 0)
'use strict';
var $export  = require('./_export')
  , context  = require('./_string-context')
  , INCLUDES = 'includes';

$export($export.P + $export.F * require('./_fails-is-regexp')(INCLUDES), 'String', {
  includes: function includes(searchString /*, position = 0 */){
    return !!~context(this, searchString, INCLUDES)
      .indexOf(searchString, arguments.length > 1 ? arguments[1] : undefined);
  }
});
},{"./_export":30,"./_fails-is-regexp":31,"./_string-context":96}],229:[function(require,module,exports){
'use strict';
// B.2.3.9 String.prototype.italics()
require('./_string-html')('italics', function(createHTML){
  return function italics(){
    return createHTML(this, 'i', '', '');
  }
});
},{"./_string-html":97}],230:[function(require,module,exports){
'use strict';
var $at  = require('./_string-at')(true);

// 21.1.3.27 String.prototype[@@iterator]()
require('./_iter-define')(String, 'String', function(iterated){
  this._t = String(iterated); // target
  this._i = 0;                // next index
// 21.1.5.2.1 %StringIteratorPrototype%.next()
}, function(){
  var O     = this._t
    , index = this._i
    , point;
  if(index >= O.length)return {value: undefined, done: true};
  point = $at(O, index);
  this._i += point.length;
  return {value: point, done: false};
});
},{"./_iter-define":51,"./_string-at":95}],231:[function(require,module,exports){
'use strict';
// B.2.3.10 String.prototype.link(url)
require('./_string-html')('link', function(createHTML){
  return function link(url){
    return createHTML(this, 'a', 'href', url);
  }
});
},{"./_string-html":97}],232:[function(require,module,exports){
var $export   = require('./_export')
  , toIObject = require('./_to-iobject')
  , toLength  = require('./_to-length');

$export($export.S, 'String', {
  // 21.1.2.4 String.raw(callSite, ...substitutions)
  raw: function raw(callSite){
    var tpl  = toIObject(callSite.raw)
      , len  = toLength(tpl.length)
      , aLen = arguments.length
      , res  = []
      , i    = 0;
    while(len > i){
      res.push(String(tpl[i++]));
      if(i < aLen)res.push(String(arguments[i]));
    } return res.join('');
  }
});
},{"./_export":30,"./_to-iobject":105,"./_to-length":106}],233:[function(require,module,exports){
var $export = require('./_export');

$export($export.P, 'String', {
  // 21.1.3.13 String.prototype.repeat(count)
  repeat: require('./_string-repeat')
});
},{"./_export":30,"./_string-repeat":99}],234:[function(require,module,exports){
'use strict';
// B.2.3.11 String.prototype.small()
require('./_string-html')('small', function(createHTML){
  return function small(){
    return createHTML(this, 'small', '', '');
  }
});
},{"./_string-html":97}],235:[function(require,module,exports){
// 21.1.3.18 String.prototype.startsWith(searchString [, position ])
'use strict';
var $export     = require('./_export')
  , toLength    = require('./_to-length')
  , context     = require('./_string-context')
  , STARTS_WITH = 'startsWith'
  , $startsWith = ''[STARTS_WITH];

$export($export.P + $export.F * require('./_fails-is-regexp')(STARTS_WITH), 'String', {
  startsWith: function startsWith(searchString /*, position = 0 */){
    var that   = context(this, searchString, STARTS_WITH)
      , index  = toLength(Math.min(arguments.length > 1 ? arguments[1] : undefined, that.length))
      , search = String(searchString);
    return $startsWith
      ? $startsWith.call(that, search, index)
      : that.slice(index, index + search.length) === search;
  }
});
},{"./_export":30,"./_fails-is-regexp":31,"./_string-context":96,"./_to-length":106}],236:[function(require,module,exports){
'use strict';
// B.2.3.12 String.prototype.strike()
require('./_string-html')('strike', function(createHTML){
  return function strike(){
    return createHTML(this, 'strike', '', '');
  }
});
},{"./_string-html":97}],237:[function(require,module,exports){
'use strict';
// B.2.3.13 String.prototype.sub()
require('./_string-html')('sub', function(createHTML){
  return function sub(){
    return createHTML(this, 'sub', '', '');
  }
});
},{"./_string-html":97}],238:[function(require,module,exports){
'use strict';
// B.2.3.14 String.prototype.sup()
require('./_string-html')('sup', function(createHTML){
  return function sup(){
    return createHTML(this, 'sup', '', '');
  }
});
},{"./_string-html":97}],239:[function(require,module,exports){
'use strict';
// 21.1.3.25 String.prototype.trim()
require('./_string-trim')('trim', function($trim){
  return function trim(){
    return $trim(this, 3);
  };
});
},{"./_string-trim":100}],240:[function(require,module,exports){
'use strict';
// ECMAScript 6 symbols shim
var global         = require('./_global')
  , core           = require('./_core')
  , has            = require('./_has')
  , DESCRIPTORS    = require('./_descriptors')
  , $export        = require('./_export')
  , redefine       = require('./_redefine')
  , META           = require('./_meta').KEY
  , $fails         = require('./_fails')
  , shared         = require('./_shared')
  , setToStringTag = require('./_set-to-string-tag')
  , uid            = require('./_uid')
  , wks            = require('./_wks')
  , keyOf          = require('./_keyof')
  , enumKeys       = require('./_enum-keys')
  , isArray        = require('./_is-array')
  , anObject       = require('./_an-object')
  , toIObject      = require('./_to-iobject')
  , toPrimitive    = require('./_to-primitive')
  , createDesc     = require('./_property-desc')
  , _create        = require('./_object-create')
  , gOPNExt        = require('./_object-gopn-ext')
  , $GOPD          = require('./_object-gopd')
  , $DP            = require('./_object-dp')
  , gOPD           = $GOPD.f
  , dP             = $DP.f
  , gOPN           = gOPNExt.f
  , $Symbol        = global.Symbol
  , $JSON          = global.JSON
  , _stringify     = $JSON && $JSON.stringify
  , setter         = false
  , PROTOTYPE      = 'prototype'
  , HIDDEN         = wks('_hidden')
  , TO_PRIMITIVE   = wks('toPrimitive')
  , isEnum         = {}.propertyIsEnumerable
  , SymbolRegistry = shared('symbol-registry')
  , AllSymbols     = shared('symbols')
  , ObjectProto    = Object[PROTOTYPE]
  , USE_NATIVE     = typeof $Symbol == 'function'
  , QObject        = global.QObject;

// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
var setSymbolDesc = DESCRIPTORS && $fails(function(){
  return _create(dP({}, 'a', {
    get: function(){ return dP(this, 'a', {value: 7}).a; }
  })).a != 7;
}) ? function(it, key, D){
  var protoDesc = gOPD(ObjectProto, key);
  if(protoDesc)delete ObjectProto[key];
  dP(it, key, D);
  if(protoDesc && it !== ObjectProto)dP(ObjectProto, key, protoDesc);
} : dP;

var wrap = function(tag){
  var sym = AllSymbols[tag] = _create($Symbol[PROTOTYPE]);
  sym._k = tag;
  DESCRIPTORS && setter && setSymbolDesc(ObjectProto, tag, {
    configurable: true,
    set: function(value){
      if(has(this, HIDDEN) && has(this[HIDDEN], tag))this[HIDDEN][tag] = false;
      setSymbolDesc(this, tag, createDesc(1, value));
    }
  });
  return sym;
};

var isSymbol = USE_NATIVE && typeof $Symbol.iterator == 'symbol' ? function(it){
  return typeof it == 'symbol';
} : function(it){
  return it instanceof $Symbol;
};

var $defineProperty = function defineProperty(it, key, D){
  anObject(it);
  key = toPrimitive(key, true);
  anObject(D);
  if(has(AllSymbols, key)){
    if(!D.enumerable){
      if(!has(it, HIDDEN))dP(it, HIDDEN, createDesc(1, {}));
      it[HIDDEN][key] = true;
    } else {
      if(has(it, HIDDEN) && it[HIDDEN][key])it[HIDDEN][key] = false;
      D = _create(D, {enumerable: createDesc(0, false)});
    } return setSymbolDesc(it, key, D);
  } return dP(it, key, D);
};
var $defineProperties = function defineProperties(it, P){
  anObject(it);
  var keys = enumKeys(P = toIObject(P))
    , i    = 0
    , l = keys.length
    , key;
  while(l > i)$defineProperty(it, key = keys[i++], P[key]);
  return it;
};
var $create = function create(it, P){
  return P === undefined ? _create(it) : $defineProperties(_create(it), P);
};
var $propertyIsEnumerable = function propertyIsEnumerable(key){
  var E = isEnum.call(this, key = toPrimitive(key, true));
  return E || !has(this, key) || !has(AllSymbols, key) || has(this, HIDDEN) && this[HIDDEN][key] ? E : true;
};
var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key){
  var D = gOPD(it = toIObject(it), key = toPrimitive(key, true));
  if(D && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key]))D.enumerable = true;
  return D;
};
var $getOwnPropertyNames = function getOwnPropertyNames(it){
  var names  = gOPN(toIObject(it))
    , result = []
    , i      = 0
    , key;
  while(names.length > i)if(!has(AllSymbols, key = names[i++]) && key != HIDDEN && key != META)result.push(key);
  return result;
};
var $getOwnPropertySymbols = function getOwnPropertySymbols(it){
  var names  = gOPN(toIObject(it))
    , result = []
    , i      = 0
    , key;
  while(names.length > i)if(has(AllSymbols, key = names[i++]))result.push(AllSymbols[key]);
  return result;
};
var $stringify = function stringify(it){
  if(it === undefined || isSymbol(it))return; // IE8 returns string on undefined
  var args = [it]
    , i    = 1
    , replacer, $replacer;
  while(arguments.length > i)args.push(arguments[i++]);
  replacer = args[1];
  if(typeof replacer == 'function')$replacer = replacer;
  if($replacer || !isArray(replacer))replacer = function(key, value){
    if($replacer)value = $replacer.call(this, key, value);
    if(!isSymbol(value))return value;
  };
  args[1] = replacer;
  return _stringify.apply($JSON, args);
};
var BUGGY_JSON = $fails(function(){
  var S = $Symbol();
  // MS Edge converts symbol values to JSON as {}
  // WebKit converts symbol values to JSON as null
  // V8 throws on boxed symbols
  return _stringify([S]) != '[null]' || _stringify({a: S}) != '{}' || _stringify(Object(S)) != '{}';
});

// 19.4.1.1 Symbol([description])
if(!USE_NATIVE){
  $Symbol = function Symbol(){
    if(this instanceof $Symbol)throw TypeError('Symbol is not a constructor!');
    return wrap(uid(arguments.length > 0 ? arguments[0] : undefined));
  };
  redefine($Symbol[PROTOTYPE], 'toString', function toString(){
    return this._k;
  });

  $GOPD.f = $getOwnPropertyDescriptor;
  $DP.f   = $defineProperty;
  require('./_object-gopn').f = gOPNExt.f = $getOwnPropertyNames;
  require('./_object-pie').f  = $propertyIsEnumerable
  require('./_object-gops').f = $getOwnPropertySymbols;

  if(DESCRIPTORS && !require('./_library')){
    redefine(ObjectProto, 'propertyIsEnumerable', $propertyIsEnumerable, true);
  }
}

$export($export.G + $export.W + $export.F * !USE_NATIVE, {Symbol: $Symbol});

// 19.4.2.2 Symbol.hasInstance
// 19.4.2.3 Symbol.isConcatSpreadable
// 19.4.2.4 Symbol.iterator
// 19.4.2.6 Symbol.match
// 19.4.2.8 Symbol.replace
// 19.4.2.9 Symbol.search
// 19.4.2.10 Symbol.species
// 19.4.2.11 Symbol.split
// 19.4.2.12 Symbol.toPrimitive
// 19.4.2.13 Symbol.toStringTag
// 19.4.2.14 Symbol.unscopables
for(var symbols = (
  'hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables'
).split(','), i = 0; symbols.length > i; ){
  var key     = symbols[i++]
    , Wrapper = core.Symbol
    , sym     = wks(key);
  if(!(key in Wrapper))dP(Wrapper, key, {value: USE_NATIVE ? sym : wrap(sym)});
};

// Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
if(!QObject || !QObject[PROTOTYPE] || !QObject[PROTOTYPE].findChild)setter = true;

$export($export.S + $export.F * !USE_NATIVE, 'Symbol', {
  // 19.4.2.1 Symbol.for(key)
  'for': function(key){
    return has(SymbolRegistry, key += '')
      ? SymbolRegistry[key]
      : SymbolRegistry[key] = $Symbol(key);
  },
  // 19.4.2.5 Symbol.keyFor(sym)
  keyFor: function keyFor(key){
    if(isSymbol(key))return keyOf(SymbolRegistry, key);
    throw TypeError(key + ' is not a symbol!');
  },
  useSetter: function(){ setter = true; },
  useSimple: function(){ setter = false; }
});

$export($export.S + $export.F * !USE_NATIVE, 'Object', {
  // 19.1.2.2 Object.create(O [, Properties])
  create: $create,
  // 19.1.2.4 Object.defineProperty(O, P, Attributes)
  defineProperty: $defineProperty,
  // 19.1.2.3 Object.defineProperties(O, Properties)
  defineProperties: $defineProperties,
  // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
  getOwnPropertyDescriptor: $getOwnPropertyDescriptor,
  // 19.1.2.7 Object.getOwnPropertyNames(O)
  getOwnPropertyNames: $getOwnPropertyNames,
  // 19.1.2.8 Object.getOwnPropertySymbols(O)
  getOwnPropertySymbols: $getOwnPropertySymbols
});

// 24.3.2 JSON.stringify(value [, replacer [, space]])
$JSON && $export($export.S + $export.F * (!USE_NATIVE || BUGGY_JSON), 'JSON', {stringify: $stringify});

// 19.4.3.4 Symbol.prototype[@@toPrimitive](hint)
$Symbol[PROTOTYPE][TO_PRIMITIVE] || require('./_hide')($Symbol[PROTOTYPE], TO_PRIMITIVE, $Symbol[PROTOTYPE].valueOf);
// 19.4.3.5 Symbol.prototype[@@toStringTag]
setToStringTag($Symbol, 'Symbol');
// 20.2.1.9 Math[@@toStringTag]
setToStringTag(Math, 'Math', true);
// 24.3.3 JSON[@@toStringTag]
setToStringTag(global.JSON, 'JSON', true);
},{"./_an-object":7,"./_core":22,"./_descriptors":26,"./_enum-keys":29,"./_export":30,"./_fails":32,"./_global":36,"./_has":37,"./_hide":38,"./_is-array":45,"./_keyof":55,"./_library":56,"./_meta":60,"./_object-create":64,"./_object-dp":65,"./_object-gopd":68,"./_object-gopn":70,"./_object-gopn-ext":69,"./_object-gops":71,"./_object-pie":75,"./_property-desc":83,"./_redefine":85,"./_set-to-string-tag":90,"./_shared":92,"./_to-iobject":105,"./_to-primitive":108,"./_uid":112,"./_wks":113}],241:[function(require,module,exports){
'use strict';
var $export      = require('./_export')
  , $typed       = require('./_typed')
  , buffer       = require('./_typed-buffer')
  , anObject     = require('./_an-object')
  , toIndex      = require('./_to-index')
  , toLength     = require('./_to-length')
  , isObject     = require('./_is-object')
  , TYPED_ARRAY  = require('./_wks')('typed_array')
  , ArrayBuffer  = require('./_global').ArrayBuffer
  , speciesConstructor = require('./_species-constructor')
  , $ArrayBuffer = buffer.ArrayBuffer
  , $DataView    = buffer.DataView
  , $isView      = $typed.ABV && ArrayBuffer.isView
  , $slice       = $ArrayBuffer.prototype.slice
  , VIEW         = $typed.VIEW
  , ARRAY_BUFFER = 'ArrayBuffer';

$export($export.G + $export.W + $export.F * (ArrayBuffer !== $ArrayBuffer), {ArrayBuffer: $ArrayBuffer});

$export($export.S + $export.F * !$typed.CONSTR, ARRAY_BUFFER, {
  // 24.1.3.1 ArrayBuffer.isView(arg)
  isView: function isView(it){
    return $isView && $isView(it) || isObject(it) && VIEW in it;
  }
});

$export($export.P + $export.U + $export.F * require('./_fails')(function(){
  return !new $ArrayBuffer(2).slice(1, undefined).byteLength;
}), ARRAY_BUFFER, {
  // 24.1.4.3 ArrayBuffer.prototype.slice(start, end)
  slice: function slice(start, end){
    if($slice !== undefined && end === undefined)return $slice.call(anObject(this), start); // FF fix
    var len    = anObject(this).byteLength
      , first  = toIndex(start, len)
      , final  = toIndex(end === undefined ? len : end, len)
      , result = new (speciesConstructor(this, $ArrayBuffer))(toLength(final - first))
      , viewS  = new $DataView(this)
      , viewT  = new $DataView(result)
      , index  = 0;
    while(first < final){
      viewT.setUint8(index++, viewS.getUint8(first++));
    } return result;
  }
});

require('./_set-species')(ARRAY_BUFFER);
},{"./_an-object":7,"./_export":30,"./_fails":32,"./_global":36,"./_is-object":47,"./_set-species":89,"./_species-constructor":93,"./_to-index":103,"./_to-length":106,"./_typed":111,"./_typed-buffer":110,"./_wks":113}],242:[function(require,module,exports){
var $export = require('./_export');
$export($export.G + $export.W + $export.F * !require('./_typed').ABV, {
  DataView: require('./_typed-buffer').DataView
});
},{"./_export":30,"./_typed":111,"./_typed-buffer":110}],243:[function(require,module,exports){
require('./_typed-array')('Float32', 4, function(init){
  return function Float32Array(data, byteOffset, length){
    return init(this, data, byteOffset, length);
  };
});
},{"./_typed-array":109}],244:[function(require,module,exports){
require('./_typed-array')('Float64', 8, function(init){
  return function Float64Array(data, byteOffset, length){
    return init(this, data, byteOffset, length);
  };
});
},{"./_typed-array":109}],245:[function(require,module,exports){
require('./_typed-array')('Int16', 2, function(init){
  return function Int16Array(data, byteOffset, length){
    return init(this, data, byteOffset, length);
  };
});
},{"./_typed-array":109}],246:[function(require,module,exports){
require('./_typed-array')('Int32', 4, function(init){
  return function Int32Array(data, byteOffset, length){
    return init(this, data, byteOffset, length);
  };
});
},{"./_typed-array":109}],247:[function(require,module,exports){
require('./_typed-array')('Int8', 1, function(init){
  return function Int8Array(data, byteOffset, length){
    return init(this, data, byteOffset, length);
  };
});
},{"./_typed-array":109}],248:[function(require,module,exports){
require('./_typed-array')('Uint16', 2, function(init){
  return function Uint16Array(data, byteOffset, length){
    return init(this, data, byteOffset, length);
  };
});
},{"./_typed-array":109}],249:[function(require,module,exports){
require('./_typed-array')('Uint32', 4, function(init){
  return function Uint32Array(data, byteOffset, length){
    return init(this, data, byteOffset, length);
  };
});
},{"./_typed-array":109}],250:[function(require,module,exports){
require('./_typed-array')('Uint8', 1, function(init){
  return function Uint8Array(data, byteOffset, length){
    return init(this, data, byteOffset, length);
  };
});
},{"./_typed-array":109}],251:[function(require,module,exports){
require('./_typed-array')('Uint8', 1, function(init){
  return function Uint8ClampedArray(data, byteOffset, length){
    return init(this, data, byteOffset, length);
  };
}, true);
},{"./_typed-array":109}],252:[function(require,module,exports){
'use strict';
var each         = require('./_array-methods')(0)
  , redefine     = require('./_redefine')
  , meta         = require('./_meta')
  , assign       = require('./_object-assign')
  , weak         = require('./_collection-weak')
  , isObject     = require('./_is-object')
  , has          = require('./_has')
  , getWeak      = meta.getWeak
  , isExtensible = Object.isExtensible
  , uncaughtFrozenStore = weak.ufstore
  , tmp          = {}
  , InternalMap;

var wrapper = function(get){
  return function WeakMap(){
    return get(this, arguments.length > 0 ? arguments[0] : undefined);
  };
};

var methods = {
  // 23.3.3.3 WeakMap.prototype.get(key)
  get: function get(key){
    if(isObject(key)){
      var data = getWeak(key);
      if(data === true)return uncaughtFrozenStore(this).get(key);
      return data ? data[this._i] : undefined;
    }
  },
  // 23.3.3.5 WeakMap.prototype.set(key, value)
  set: function set(key, value){
    return weak.def(this, key, value);
  }
};

// 23.3 WeakMap Objects
var $WeakMap = module.exports = require('./_collection')('WeakMap', wrapper, methods, weak, true, true);

// IE11 WeakMap frozen keys fix
if(new $WeakMap().set((Object.freeze || Object)(tmp), 7).get(tmp) != 7){
  InternalMap = weak.getConstructor(wrapper);
  assign(InternalMap.prototype, methods);
  meta.NEED = true;
  each(['delete', 'has', 'get', 'set'], function(key){
    var proto  = $WeakMap.prototype
      , method = proto[key];
    redefine(proto, key, function(a, b){
      // store frozen objects on internal weakmap shim
      if(isObject(a) && !isExtensible(a)){
        if(!this._f)this._f = new InternalMap;
        var result = this._f[key](a, b);
        return key == 'set' ? this : result;
      // store all the rest on native weakmap
      } return method.call(this, a, b);
    });
  });
}
},{"./_array-methods":12,"./_collection":21,"./_collection-weak":20,"./_has":37,"./_is-object":47,"./_meta":60,"./_object-assign":63,"./_redefine":85}],253:[function(require,module,exports){
'use strict';
var weak = require('./_collection-weak');

// 23.4 WeakSet Objects
require('./_collection')('WeakSet', function(get){
  return function WeakSet(){ return get(this, arguments.length > 0 ? arguments[0] : undefined); };
}, {
  // 23.4.3.1 WeakSet.prototype.add(value)
  add: function add(value){
    return weak.def(this, value, true);
  }
}, weak, false, true);
},{"./_collection":21,"./_collection-weak":20}],254:[function(require,module,exports){
'use strict';
// https://github.com/tc39/Array.prototype.includes
var $export   = require('./_export')
  , $includes = require('./_array-includes')(true);

$export($export.P, 'Array', {
  includes: function includes(el /*, fromIndex = 0 */){
    return $includes(this, el, arguments.length > 1 ? arguments[1] : undefined);
  }
});

require('./_add-to-unscopables')('includes');
},{"./_add-to-unscopables":5,"./_array-includes":11,"./_export":30}],255:[function(require,module,exports){
// https://github.com/ljharb/proposal-is-error
var $export = require('./_export')
  , cof     = require('./_cof');

$export($export.S, 'Error', {
  isError: function isError(it){
    return cof(it) === 'Error';
  }
});
},{"./_cof":17,"./_export":30}],256:[function(require,module,exports){
// https://github.com/DavidBruant/Map-Set.prototype.toJSON
var $export  = require('./_export');

$export($export.P + $export.R, 'Map', {toJSON: require('./_collection-to-json')('Map')});
},{"./_collection-to-json":19,"./_export":30}],257:[function(require,module,exports){
// https://gist.github.com/BrendanEich/4294d5c212a6d2254703
var $export = require('./_export');

$export($export.S, 'Math', {
  iaddh: function iaddh(x0, x1, y0, y1){
    var $x0 = x0 >>> 0
      , $x1 = x1 >>> 0
      , $y0 = y0 >>> 0;
    return $x1 + (y1 >>> 0) + (($x0 & $y0 | ($x0 | $y0) & ~($x0 + $y0 >>> 0)) >>> 31) | 0;
  }
});
},{"./_export":30}],258:[function(require,module,exports){
// https://gist.github.com/BrendanEich/4294d5c212a6d2254703
var $export = require('./_export');

$export($export.S, 'Math', {
  imulh: function imulh(u, v){
    var UINT16 = 0xffff
      , $u = +u
      , $v = +v
      , u0 = $u & UINT16
      , v0 = $v & UINT16
      , u1 = $u >> 16
      , v1 = $v >> 16
      , t  = (u1 * v0 >>> 0) + (u0 * v0 >>> 16);
    return u1 * v1 + (t >> 16) + ((u0 * v1 >>> 0) + (t & UINT16) >> 16);
  }
});
},{"./_export":30}],259:[function(require,module,exports){
// https://gist.github.com/BrendanEich/4294d5c212a6d2254703
var $export = require('./_export');

$export($export.S, 'Math', {
  isubh: function isubh(x0, x1, y0, y1){
    var $x0 = x0 >>> 0
      , $x1 = x1 >>> 0
      , $y0 = y0 >>> 0;
    return $x1 - (y1 >>> 0) - ((~$x0 & $y0 | ~($x0 ^ $y0) & $x0 - $y0 >>> 0) >>> 31) | 0;
  }
});
},{"./_export":30}],260:[function(require,module,exports){
// https://gist.github.com/BrendanEich/4294d5c212a6d2254703
var $export = require('./_export');

$export($export.S, 'Math', {
  umulh: function umulh(u, v){
    var UINT16 = 0xffff
      , $u = +u
      , $v = +v
      , u0 = $u & UINT16
      , v0 = $v & UINT16
      , u1 = $u >>> 16
      , v1 = $v >>> 16
      , t  = (u1 * v0 >>> 0) + (u0 * v0 >>> 16);
    return u1 * v1 + (t >>> 16) + ((u0 * v1 >>> 0) + (t & UINT16) >>> 16);
  }
});
},{"./_export":30}],261:[function(require,module,exports){
'use strict';
var $export         = require('./_export')
  , toObject        = require('./_to-object')
  , aFunction       = require('./_a-function')
  , $defineProperty = require('./_object-dp');

// B.2.2.2 Object.prototype.__defineGetter__(P, getter)
require('./_descriptors') && $export($export.P + require('./_object-forced-pam'), 'Object', {
  __defineGetter__: function __defineGetter__(P, getter){
    $defineProperty.f(toObject(this), P, {get: aFunction(getter), enumerable: true, configurable: true});
  }
});
},{"./_a-function":3,"./_descriptors":26,"./_export":30,"./_object-dp":65,"./_object-forced-pam":67,"./_to-object":107}],262:[function(require,module,exports){
'use strict';
var $export         = require('./_export')
  , toObject        = require('./_to-object')
  , aFunction       = require('./_a-function')
  , $defineProperty = require('./_object-dp');

// B.2.2.3 Object.prototype.__defineSetter__(P, setter)
require('./_descriptors') && $export($export.P + require('./_object-forced-pam'), 'Object', {
  __defineSetter__: function __defineSetter__(P, setter){
    $defineProperty.f(toObject(this), P, {set: aFunction(setter), enumerable: true, configurable: true});
  }
});
},{"./_a-function":3,"./_descriptors":26,"./_export":30,"./_object-dp":65,"./_object-forced-pam":67,"./_to-object":107}],263:[function(require,module,exports){
// https://github.com/tc39/proposal-object-values-entries
var $export  = require('./_export')
  , $entries = require('./_object-to-array')(true);

$export($export.S, 'Object', {
  entries: function entries(it){
    return $entries(it);
  }
});
},{"./_export":30,"./_object-to-array":77}],264:[function(require,module,exports){
// https://github.com/tc39/proposal-object-getownpropertydescriptors
var $export    = require('./_export')
  , ownKeys    = require('./_own-keys')
  , toIObject  = require('./_to-iobject')
  , createDesc = require('./_property-desc')
  , gOPD       = require('./_object-gopd')
  , dP         = require('./_object-dp');

$export($export.S, 'Object', {
  getOwnPropertyDescriptors: function getOwnPropertyDescriptors(object){
    var O       = toIObject(object)
      , getDesc = gOPD.f
      , keys    = ownKeys(O)
      , result  = {}
      , i       = 0
      , key, D;
    while(keys.length > i){
      D = getDesc(O, key = keys[i++]);
      if(key in result)dP.f(result, key, createDesc(0, D));
      else result[key] = D;
    } return result;
  }
});
},{"./_export":30,"./_object-dp":65,"./_object-gopd":68,"./_own-keys":78,"./_property-desc":83,"./_to-iobject":105}],265:[function(require,module,exports){
'use strict';
var $export                  = require('./_export')
  , toObject                 = require('./_to-object')
  , toPrimitive              = require('./_to-primitive')
  , getPrototypeOf           = require('./_object-gpo')
  , getOwnPropertyDescriptor = require('./_object-gopd').f;

// B.2.2.4 Object.prototype.__lookupGetter__(P)
require('./_descriptors') && $export($export.P + require('./_object-forced-pam'), 'Object', {
  __lookupGetter__: function __lookupGetter__(P){
    var O = toObject(this)
      , K = toPrimitive(P, true)
      , D;
    do {
      if(D = getOwnPropertyDescriptor(O, K))return D.get;
    } while(O = getPrototypeOf(O));
  }
});
},{"./_descriptors":26,"./_export":30,"./_object-forced-pam":67,"./_object-gopd":68,"./_object-gpo":72,"./_to-object":107,"./_to-primitive":108}],266:[function(require,module,exports){
'use strict';
var $export                  = require('./_export')
  , toObject                 = require('./_to-object')
  , toPrimitive              = require('./_to-primitive')
  , getPrototypeOf           = require('./_object-gpo')
  , getOwnPropertyDescriptor = require('./_object-gopd').f;

// B.2.2.5 Object.prototype.__lookupSetter__(P)
require('./_descriptors') && $export($export.P + require('./_object-forced-pam'), 'Object', {
  __lookupSetter__: function __lookupSetter__(P){
    var O = toObject(this)
      , K = toPrimitive(P, true)
      , D;
    do {
      if(D = getOwnPropertyDescriptor(O, K))return D.set;
    } while(O = getPrototypeOf(O));
  }
});
},{"./_descriptors":26,"./_export":30,"./_object-forced-pam":67,"./_object-gopd":68,"./_object-gpo":72,"./_to-object":107,"./_to-primitive":108}],267:[function(require,module,exports){
// https://github.com/tc39/proposal-object-values-entries
var $export = require('./_export')
  , $values = require('./_object-to-array')(false);

$export($export.S, 'Object', {
  values: function values(it){
    return $values(it);
  }
});
},{"./_export":30,"./_object-to-array":77}],268:[function(require,module,exports){
var metadata                  = require('./_metadata')
  , anObject                  = require('./_an-object')
  , toMetaKey                 = metadata.key
  , ordinaryDefineOwnMetadata = metadata.set;

metadata.exp({defineMetadata: function defineMetadata(metadataKey, metadataValue, target, targetKey){
  ordinaryDefineOwnMetadata(metadataKey, metadataValue, anObject(target), toMetaKey(targetKey));
}});
},{"./_an-object":7,"./_metadata":61}],269:[function(require,module,exports){
var metadata               = require('./_metadata')
  , anObject               = require('./_an-object')
  , toMetaKey              = metadata.key
  , getOrCreateMetadataMap = metadata.map
  , store                  = metadata.store;

metadata.exp({deleteMetadata: function deleteMetadata(metadataKey, target /*, targetKey */){
  var targetKey   = arguments.length < 3 ? undefined : toMetaKey(arguments[2])
    , metadataMap = getOrCreateMetadataMap(anObject(target), targetKey, false);
  if(metadataMap === undefined || !metadataMap['delete'](metadataKey))return false;
  if(metadataMap.size)return true;
  var targetMetadata = store.get(target);
  targetMetadata['delete'](targetKey);
  return !!targetMetadata.size || store['delete'](target);
}});
},{"./_an-object":7,"./_metadata":61}],270:[function(require,module,exports){
var Set                     = require('./es6.set')
  , from                    = require('./_array-from-iterable')
  , metadata                = require('./_metadata')
  , anObject                = require('./_an-object')
  , getPrototypeOf          = require('./_object-gpo')
  , ordinaryOwnMetadataKeys = metadata.keys
  , toMetaKey               = metadata.key;

var ordinaryMetadataKeys = function(O, P){
  var oKeys  = ordinaryOwnMetadataKeys(O, P)
    , parent = getPrototypeOf(O);
  if(parent === null)return oKeys;
  var pKeys  = ordinaryMetadataKeys(parent, P);
  return pKeys.length ? oKeys.length ? from(new Set(oKeys.concat(pKeys))) : pKeys : oKeys;
};

metadata.exp({getMetadataKeys: function getMetadataKeys(target /*, targetKey */){
  return ordinaryMetadataKeys(anObject(target), arguments.length < 2 ? undefined : toMetaKey(arguments[1]));
}});
},{"./_an-object":7,"./_array-from-iterable":10,"./_metadata":61,"./_object-gpo":72,"./es6.set":217}],271:[function(require,module,exports){
var metadata               = require('./_metadata')
  , anObject               = require('./_an-object')
  , getPrototypeOf         = require('./_object-gpo')
  , ordinaryHasOwnMetadata = metadata.has
  , ordinaryGetOwnMetadata = metadata.get
  , toMetaKey              = metadata.key;

var ordinaryGetMetadata = function(MetadataKey, O, P){
  var hasOwn = ordinaryHasOwnMetadata(MetadataKey, O, P);
  if(hasOwn)return ordinaryGetOwnMetadata(MetadataKey, O, P);
  var parent = getPrototypeOf(O);
  return parent !== null ? ordinaryGetMetadata(MetadataKey, parent, P) : undefined;
};

metadata.exp({getMetadata: function getMetadata(metadataKey, target /*, targetKey */){
  return ordinaryGetMetadata(metadataKey, anObject(target), arguments.length < 3 ? undefined : toMetaKey(arguments[2]));
}});
},{"./_an-object":7,"./_metadata":61,"./_object-gpo":72}],272:[function(require,module,exports){
var metadata                = require('./_metadata')
  , anObject                = require('./_an-object')
  , ordinaryOwnMetadataKeys = metadata.keys
  , toMetaKey               = metadata.key;

metadata.exp({getOwnMetadataKeys: function getOwnMetadataKeys(target /*, targetKey */){
  return ordinaryOwnMetadataKeys(anObject(target), arguments.length < 2 ? undefined : toMetaKey(arguments[1]));
}});
},{"./_an-object":7,"./_metadata":61}],273:[function(require,module,exports){
var metadata               = require('./_metadata')
  , anObject               = require('./_an-object')
  , ordinaryGetOwnMetadata = metadata.get
  , toMetaKey              = metadata.key;

metadata.exp({getOwnMetadata: function getOwnMetadata(metadataKey, target /*, targetKey */){
  return ordinaryGetOwnMetadata(metadataKey, anObject(target)
    , arguments.length < 3 ? undefined : toMetaKey(arguments[2]));
}});
},{"./_an-object":7,"./_metadata":61}],274:[function(require,module,exports){
var metadata               = require('./_metadata')
  , anObject               = require('./_an-object')
  , getPrototypeOf         = require('./_object-gpo')
  , ordinaryHasOwnMetadata = metadata.has
  , toMetaKey              = metadata.key;

var ordinaryHasMetadata = function(MetadataKey, O, P){
  var hasOwn = ordinaryHasOwnMetadata(MetadataKey, O, P);
  if(hasOwn)return true;
  var parent = getPrototypeOf(O);
  return parent !== null ? ordinaryHasMetadata(MetadataKey, parent, P) : false;
};

metadata.exp({hasMetadata: function hasMetadata(metadataKey, target /*, targetKey */){
  return ordinaryHasMetadata(metadataKey, anObject(target), arguments.length < 3 ? undefined : toMetaKey(arguments[2]));
}});
},{"./_an-object":7,"./_metadata":61,"./_object-gpo":72}],275:[function(require,module,exports){
var metadata               = require('./_metadata')
  , anObject               = require('./_an-object')
  , ordinaryHasOwnMetadata = metadata.has
  , toMetaKey              = metadata.key;

metadata.exp({hasOwnMetadata: function hasOwnMetadata(metadataKey, target /*, targetKey */){
  return ordinaryHasOwnMetadata(metadataKey, anObject(target)
    , arguments.length < 3 ? undefined : toMetaKey(arguments[2]));
}});
},{"./_an-object":7,"./_metadata":61}],276:[function(require,module,exports){
var metadata                  = require('./_metadata')
  , anObject                  = require('./_an-object')
  , aFunction                 = require('./_a-function')
  , toMetaKey                 = metadata.key
  , ordinaryDefineOwnMetadata = metadata.set;

metadata.exp({metadata: function metadata(metadataKey, metadataValue){
  return function decorator(target, targetKey){
    ordinaryDefineOwnMetadata(
      metadataKey, metadataValue,
      (targetKey !== undefined ? anObject : aFunction)(target),
      toMetaKey(targetKey)
    );
  };
}});
},{"./_a-function":3,"./_an-object":7,"./_metadata":61}],277:[function(require,module,exports){
// https://github.com/DavidBruant/Map-Set.prototype.toJSON
var $export  = require('./_export');

$export($export.P + $export.R, 'Set', {toJSON: require('./_collection-to-json')('Set')});
},{"./_collection-to-json":19,"./_export":30}],278:[function(require,module,exports){
'use strict';
// https://github.com/mathiasbynens/String.prototype.at
var $export = require('./_export')
  , $at     = require('./_string-at')(true);

$export($export.P, 'String', {
  at: function at(pos){
    return $at(this, pos);
  }
});
},{"./_export":30,"./_string-at":95}],279:[function(require,module,exports){
'use strict';
// https://tc39.github.io/String.prototype.matchAll/
var $export     = require('./_export')
  , defined     = require('./_defined')
  , toLength    = require('./_to-length')
  , isRegExp    = require('./_is-regexp')
  , getFlags    = require('./_flags')
  , RegExpProto = RegExp.prototype;

var $RegExpStringIterator = function(regexp, string){
  this._r = regexp;
  this._s = string;
};

require('./_iter-create')($RegExpStringIterator, 'RegExp String', function next(){
  var match = this._r.exec(this._s);
  return {value: match, done: match === null};
});

$export($export.P, 'String', {
  matchAll: function matchAll(regexp){
    defined(this);
    if(!isRegExp(regexp))throw TypeError(regexp + ' is not a regexp!');
    var S     = String(this)
      , flags = 'flags' in RegExpProto ? String(regexp.flags) : getFlags.call(regexp)
      , rx    = new RegExp(regexp.source, ~flags.indexOf('g') ? flags : 'g' + flags);
    rx.lastIndex = toLength(regexp.lastIndex);
    return new $RegExpStringIterator(rx, S);
  }
});
},{"./_defined":25,"./_export":30,"./_flags":34,"./_is-regexp":48,"./_iter-create":50,"./_to-length":106}],280:[function(require,module,exports){
'use strict';
// https://github.com/tc39/proposal-string-pad-start-end
var $export = require('./_export')
  , $pad    = require('./_string-pad');

$export($export.P, 'String', {
  padEnd: function padEnd(maxLength /*, fillString = ' ' */){
    return $pad(this, maxLength, arguments.length > 1 ? arguments[1] : undefined, false);
  }
});
},{"./_export":30,"./_string-pad":98}],281:[function(require,module,exports){
'use strict';
// https://github.com/tc39/proposal-string-pad-start-end
var $export = require('./_export')
  , $pad    = require('./_string-pad');

$export($export.P, 'String', {
  padStart: function padStart(maxLength /*, fillString = ' ' */){
    return $pad(this, maxLength, arguments.length > 1 ? arguments[1] : undefined, true);
  }
});
},{"./_export":30,"./_string-pad":98}],282:[function(require,module,exports){
'use strict';
// https://github.com/sebmarkbage/ecmascript-string-left-right-trim
require('./_string-trim')('trimLeft', function($trim){
  return function trimLeft(){
    return $trim(this, 1);
  };
}, 'trimStart');
},{"./_string-trim":100}],283:[function(require,module,exports){
'use strict';
// https://github.com/sebmarkbage/ecmascript-string-left-right-trim
require('./_string-trim')('trimRight', function($trim){
  return function trimRight(){
    return $trim(this, 2);
  };
}, 'trimEnd');
},{"./_string-trim":100}],284:[function(require,module,exports){
// https://github.com/ljharb/proposal-global
var $export = require('./_export');

$export($export.S, 'System', {global: require('./_global')});
},{"./_export":30,"./_global":36}],285:[function(require,module,exports){
var $iterators    = require('./es6.array.iterator')
  , redefine      = require('./_redefine')
  , global        = require('./_global')
  , hide          = require('./_hide')
  , Iterators     = require('./_iterators')
  , wks           = require('./_wks')
  , ITERATOR      = wks('iterator')
  , TO_STRING_TAG = wks('toStringTag')
  , ArrayValues   = Iterators.Array;

for(var collections = ['NodeList', 'DOMTokenList', 'MediaList', 'StyleSheetList', 'CSSRuleList'], i = 0; i < 5; i++){
  var NAME       = collections[i]
    , Collection = global[NAME]
    , proto      = Collection && Collection.prototype
    , key;
  if(proto){
    if(!proto[ITERATOR])hide(proto, ITERATOR, ArrayValues);
    if(!proto[TO_STRING_TAG])hide(proto, TO_STRING_TAG, NAME);
    Iterators[NAME] = ArrayValues;
    for(key in $iterators)if(!proto[key])redefine(proto, key, $iterators[key], true);
  }
}
},{"./_global":36,"./_hide":38,"./_iterators":54,"./_redefine":85,"./_wks":113,"./es6.array.iterator":127}],286:[function(require,module,exports){
var $export = require('./_export')
  , $task   = require('./_task');
$export($export.G + $export.B, {
  setImmediate:   $task.set,
  clearImmediate: $task.clear
});
},{"./_export":30,"./_task":102}],287:[function(require,module,exports){
// ie9- setTimeout & setInterval additional parameters fix
var global     = require('./_global')
  , $export    = require('./_export')
  , invoke     = require('./_invoke')
  , partial    = require('./_partial')
  , navigator  = global.navigator
  , MSIE       = !!navigator && /MSIE .\./.test(navigator.userAgent); // <- dirty ie9- check
var wrap = function(set){
  return MSIE ? function(fn, time /*, ...args */){
    return set(invoke(
      partial,
      [].slice.call(arguments, 2),
      typeof fn == 'function' ? fn : Function(fn)
    ), time);
  } : set;
};
$export($export.G + $export.B + $export.F * MSIE, {
  setTimeout:  wrap(global.setTimeout),
  setInterval: wrap(global.setInterval)
});
},{"./_export":30,"./_global":36,"./_invoke":42,"./_partial":81}],288:[function(require,module,exports){
require('./modules/es6.symbol');
require('./modules/es6.object.create');
require('./modules/es6.object.define-property');
require('./modules/es6.object.define-properties');
require('./modules/es6.object.get-own-property-descriptor');
require('./modules/es6.object.get-prototype-of');
require('./modules/es6.object.keys');
require('./modules/es6.object.get-own-property-names');
require('./modules/es6.object.freeze');
require('./modules/es6.object.seal');
require('./modules/es6.object.prevent-extensions');
require('./modules/es6.object.is-frozen');
require('./modules/es6.object.is-sealed');
require('./modules/es6.object.is-extensible');
require('./modules/es6.object.assign');
require('./modules/es6.object.is');
require('./modules/es6.object.set-prototype-of');
require('./modules/es6.object.to-string');
require('./modules/es6.function.bind');
require('./modules/es6.function.name');
require('./modules/es6.function.has-instance');
require('./modules/es6.parse-int');
require('./modules/es6.parse-float');
require('./modules/es6.number.constructor');
require('./modules/es6.number.to-fixed');
require('./modules/es6.number.to-precision');
require('./modules/es6.number.epsilon');
require('./modules/es6.number.is-finite');
require('./modules/es6.number.is-integer');
require('./modules/es6.number.is-nan');
require('./modules/es6.number.is-safe-integer');
require('./modules/es6.number.max-safe-integer');
require('./modules/es6.number.min-safe-integer');
require('./modules/es6.number.parse-float');
require('./modules/es6.number.parse-int');
require('./modules/es6.math.acosh');
require('./modules/es6.math.asinh');
require('./modules/es6.math.atanh');
require('./modules/es6.math.cbrt');
require('./modules/es6.math.clz32');
require('./modules/es6.math.cosh');
require('./modules/es6.math.expm1');
require('./modules/es6.math.fround');
require('./modules/es6.math.hypot');
require('./modules/es6.math.imul');
require('./modules/es6.math.log10');
require('./modules/es6.math.log1p');
require('./modules/es6.math.log2');
require('./modules/es6.math.sign');
require('./modules/es6.math.sinh');
require('./modules/es6.math.tanh');
require('./modules/es6.math.trunc');
require('./modules/es6.string.from-code-point');
require('./modules/es6.string.raw');
require('./modules/es6.string.trim');
require('./modules/es6.string.iterator');
require('./modules/es6.string.code-point-at');
require('./modules/es6.string.ends-with');
require('./modules/es6.string.includes');
require('./modules/es6.string.repeat');
require('./modules/es6.string.starts-with');
require('./modules/es6.string.anchor');
require('./modules/es6.string.big');
require('./modules/es6.string.blink');
require('./modules/es6.string.bold');
require('./modules/es6.string.fixed');
require('./modules/es6.string.fontcolor');
require('./modules/es6.string.fontsize');
require('./modules/es6.string.italics');
require('./modules/es6.string.link');
require('./modules/es6.string.small');
require('./modules/es6.string.strike');
require('./modules/es6.string.sub');
require('./modules/es6.string.sup');
require('./modules/es6.date.now');
require('./modules/es6.date.to-json');
require('./modules/es6.date.to-iso-string');
require('./modules/es6.date.to-string');
require('./modules/es6.date.to-primitive');
require('./modules/es6.array.is-array');
require('./modules/es6.array.from');
require('./modules/es6.array.of');
require('./modules/es6.array.join');
require('./modules/es6.array.slice');
require('./modules/es6.array.sort');
require('./modules/es6.array.for-each');
require('./modules/es6.array.map');
require('./modules/es6.array.filter');
require('./modules/es6.array.some');
require('./modules/es6.array.every');
require('./modules/es6.array.reduce');
require('./modules/es6.array.reduce-right');
require('./modules/es6.array.index-of');
require('./modules/es6.array.last-index-of');
require('./modules/es6.array.copy-within');
require('./modules/es6.array.fill');
require('./modules/es6.array.find');
require('./modules/es6.array.find-index');
require('./modules/es6.array.species');
require('./modules/es6.array.iterator');
require('./modules/es6.regexp.constructor');
require('./modules/es6.regexp.to-string');
require('./modules/es6.regexp.flags');
require('./modules/es6.regexp.match');
require('./modules/es6.regexp.replace');
require('./modules/es6.regexp.search');
require('./modules/es6.regexp.split');
require('./modules/es6.promise');
require('./modules/es6.map');
require('./modules/es6.set');
require('./modules/es6.weak-map');
require('./modules/es6.weak-set');
require('./modules/es6.typed.array-buffer');
require('./modules/es6.typed.data-view');
require('./modules/es6.typed.int8-array');
require('./modules/es6.typed.uint8-array');
require('./modules/es6.typed.uint8-clamped-array');
require('./modules/es6.typed.int16-array');
require('./modules/es6.typed.uint16-array');
require('./modules/es6.typed.int32-array');
require('./modules/es6.typed.uint32-array');
require('./modules/es6.typed.float32-array');
require('./modules/es6.typed.float64-array');
require('./modules/es6.reflect.apply');
require('./modules/es6.reflect.construct');
require('./modules/es6.reflect.define-property');
require('./modules/es6.reflect.delete-property');
require('./modules/es6.reflect.enumerate');
require('./modules/es6.reflect.get');
require('./modules/es6.reflect.get-own-property-descriptor');
require('./modules/es6.reflect.get-prototype-of');
require('./modules/es6.reflect.has');
require('./modules/es6.reflect.is-extensible');
require('./modules/es6.reflect.own-keys');
require('./modules/es6.reflect.prevent-extensions');
require('./modules/es6.reflect.set');
require('./modules/es6.reflect.set-prototype-of');
require('./modules/es7.array.includes');
require('./modules/es7.string.at');
require('./modules/es7.string.pad-start');
require('./modules/es7.string.pad-end');
require('./modules/es7.string.trim-left');
require('./modules/es7.string.trim-right');
require('./modules/es7.string.match-all');
require('./modules/es7.object.get-own-property-descriptors');
require('./modules/es7.object.values');
require('./modules/es7.object.entries');
require('./modules/es7.object.define-getter');
require('./modules/es7.object.define-setter');
require('./modules/es7.object.lookup-getter');
require('./modules/es7.object.lookup-setter');
require('./modules/es7.map.to-json');
require('./modules/es7.set.to-json');
require('./modules/es7.system.global');
require('./modules/es7.error.is-error');
require('./modules/es7.math.iaddh');
require('./modules/es7.math.isubh');
require('./modules/es7.math.imulh');
require('./modules/es7.math.umulh');
require('./modules/es7.reflect.define-metadata');
require('./modules/es7.reflect.delete-metadata');
require('./modules/es7.reflect.get-metadata');
require('./modules/es7.reflect.get-metadata-keys');
require('./modules/es7.reflect.get-own-metadata');
require('./modules/es7.reflect.get-own-metadata-keys');
require('./modules/es7.reflect.has-metadata');
require('./modules/es7.reflect.has-own-metadata');
require('./modules/es7.reflect.metadata');
require('./modules/web.timers');
require('./modules/web.immediate');
require('./modules/web.dom.iterable');
module.exports = require('./modules/_core');
},{"./modules/_core":22,"./modules/es6.array.copy-within":117,"./modules/es6.array.every":118,"./modules/es6.array.fill":119,"./modules/es6.array.filter":120,"./modules/es6.array.find":122,"./modules/es6.array.find-index":121,"./modules/es6.array.for-each":123,"./modules/es6.array.from":124,"./modules/es6.array.index-of":125,"./modules/es6.array.is-array":126,"./modules/es6.array.iterator":127,"./modules/es6.array.join":128,"./modules/es6.array.last-index-of":129,"./modules/es6.array.map":130,"./modules/es6.array.of":131,"./modules/es6.array.reduce":133,"./modules/es6.array.reduce-right":132,"./modules/es6.array.slice":134,"./modules/es6.array.some":135,"./modules/es6.array.sort":136,"./modules/es6.array.species":137,"./modules/es6.date.now":138,"./modules/es6.date.to-iso-string":139,"./modules/es6.date.to-json":140,"./modules/es6.date.to-primitive":141,"./modules/es6.date.to-string":142,"./modules/es6.function.bind":143,"./modules/es6.function.has-instance":144,"./modules/es6.function.name":145,"./modules/es6.map":146,"./modules/es6.math.acosh":147,"./modules/es6.math.asinh":148,"./modules/es6.math.atanh":149,"./modules/es6.math.cbrt":150,"./modules/es6.math.clz32":151,"./modules/es6.math.cosh":152,"./modules/es6.math.expm1":153,"./modules/es6.math.fround":154,"./modules/es6.math.hypot":155,"./modules/es6.math.imul":156,"./modules/es6.math.log10":157,"./modules/es6.math.log1p":158,"./modules/es6.math.log2":159,"./modules/es6.math.sign":160,"./modules/es6.math.sinh":161,"./modules/es6.math.tanh":162,"./modules/es6.math.trunc":163,"./modules/es6.number.constructor":164,"./modules/es6.number.epsilon":165,"./modules/es6.number.is-finite":166,"./modules/es6.number.is-integer":167,"./modules/es6.number.is-nan":168,"./modules/es6.number.is-safe-integer":169,"./modules/es6.number.max-safe-integer":170,"./modules/es6.number.min-safe-integer":171,"./modules/es6.number.parse-float":172,"./modules/es6.number.parse-int":173,"./modules/es6.number.to-fixed":174,"./modules/es6.number.to-precision":175,"./modules/es6.object.assign":176,"./modules/es6.object.create":177,"./modules/es6.object.define-properties":178,"./modules/es6.object.define-property":179,"./modules/es6.object.freeze":180,"./modules/es6.object.get-own-property-descriptor":181,"./modules/es6.object.get-own-property-names":182,"./modules/es6.object.get-prototype-of":183,"./modules/es6.object.is":187,"./modules/es6.object.is-extensible":184,"./modules/es6.object.is-frozen":185,"./modules/es6.object.is-sealed":186,"./modules/es6.object.keys":188,"./modules/es6.object.prevent-extensions":189,"./modules/es6.object.seal":190,"./modules/es6.object.set-prototype-of":191,"./modules/es6.object.to-string":192,"./modules/es6.parse-float":193,"./modules/es6.parse-int":194,"./modules/es6.promise":195,"./modules/es6.reflect.apply":196,"./modules/es6.reflect.construct":197,"./modules/es6.reflect.define-property":198,"./modules/es6.reflect.delete-property":199,"./modules/es6.reflect.enumerate":200,"./modules/es6.reflect.get":203,"./modules/es6.reflect.get-own-property-descriptor":201,"./modules/es6.reflect.get-prototype-of":202,"./modules/es6.reflect.has":204,"./modules/es6.reflect.is-extensible":205,"./modules/es6.reflect.own-keys":206,"./modules/es6.reflect.prevent-extensions":207,"./modules/es6.reflect.set":209,"./modules/es6.reflect.set-prototype-of":208,"./modules/es6.regexp.constructor":210,"./modules/es6.regexp.flags":211,"./modules/es6.regexp.match":212,"./modules/es6.regexp.replace":213,"./modules/es6.regexp.search":214,"./modules/es6.regexp.split":215,"./modules/es6.regexp.to-string":216,"./modules/es6.set":217,"./modules/es6.string.anchor":218,"./modules/es6.string.big":219,"./modules/es6.string.blink":220,"./modules/es6.string.bold":221,"./modules/es6.string.code-point-at":222,"./modules/es6.string.ends-with":223,"./modules/es6.string.fixed":224,"./modules/es6.string.fontcolor":225,"./modules/es6.string.fontsize":226,"./modules/es6.string.from-code-point":227,"./modules/es6.string.includes":228,"./modules/es6.string.italics":229,"./modules/es6.string.iterator":230,"./modules/es6.string.link":231,"./modules/es6.string.raw":232,"./modules/es6.string.repeat":233,"./modules/es6.string.small":234,"./modules/es6.string.starts-with":235,"./modules/es6.string.strike":236,"./modules/es6.string.sub":237,"./modules/es6.string.sup":238,"./modules/es6.string.trim":239,"./modules/es6.symbol":240,"./modules/es6.typed.array-buffer":241,"./modules/es6.typed.data-view":242,"./modules/es6.typed.float32-array":243,"./modules/es6.typed.float64-array":244,"./modules/es6.typed.int16-array":245,"./modules/es6.typed.int32-array":246,"./modules/es6.typed.int8-array":247,"./modules/es6.typed.uint16-array":248,"./modules/es6.typed.uint32-array":249,"./modules/es6.typed.uint8-array":250,"./modules/es6.typed.uint8-clamped-array":251,"./modules/es6.weak-map":252,"./modules/es6.weak-set":253,"./modules/es7.array.includes":254,"./modules/es7.error.is-error":255,"./modules/es7.map.to-json":256,"./modules/es7.math.iaddh":257,"./modules/es7.math.imulh":258,"./modules/es7.math.isubh":259,"./modules/es7.math.umulh":260,"./modules/es7.object.define-getter":261,"./modules/es7.object.define-setter":262,"./modules/es7.object.entries":263,"./modules/es7.object.get-own-property-descriptors":264,"./modules/es7.object.lookup-getter":265,"./modules/es7.object.lookup-setter":266,"./modules/es7.object.values":267,"./modules/es7.reflect.define-metadata":268,"./modules/es7.reflect.delete-metadata":269,"./modules/es7.reflect.get-metadata":271,"./modules/es7.reflect.get-metadata-keys":270,"./modules/es7.reflect.get-own-metadata":273,"./modules/es7.reflect.get-own-metadata-keys":272,"./modules/es7.reflect.has-metadata":274,"./modules/es7.reflect.has-own-metadata":275,"./modules/es7.reflect.metadata":276,"./modules/es7.set.to-json":277,"./modules/es7.string.at":278,"./modules/es7.string.match-all":279,"./modules/es7.string.pad-end":280,"./modules/es7.string.pad-start":281,"./modules/es7.string.trim-left":282,"./modules/es7.string.trim-right":283,"./modules/es7.system.global":284,"./modules/web.dom.iterable":285,"./modules/web.immediate":286,"./modules/web.timers":287}],289:[function(require,module,exports){
(function (process,global){
/**
 * Copyright (c) 2014, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * https://raw.github.com/facebook/regenerator/master/LICENSE file. An
 * additional grant of patent rights can be found in the PATENTS file in
 * the same directory.
 */

!(function(global) {
  "use strict";

  var hasOwn = Object.prototype.hasOwnProperty;
  var undefined; // More compressible than void 0.
  var iteratorSymbol =
    typeof Symbol === "function" && Symbol.iterator || "@@iterator";

  var inModule = typeof module === "object";
  var runtime = global.regeneratorRuntime;
  if (runtime) {
    if (inModule) {
      // If regeneratorRuntime is defined globally and we're in a module,
      // make the exports object identical to regeneratorRuntime.
      module.exports = runtime;
    }
    // Don't bother evaluating the rest of this file if the runtime was
    // already defined globally.
    return;
  }

  // Define the runtime globally (as expected by generated code) as either
  // module.exports (if we're in a module) or a new, empty object.
  runtime = global.regeneratorRuntime = inModule ? module.exports : {};

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided, then outerFn.prototype instanceof Generator.
    var generator = Object.create((outerFn || Generator).prototype);
    var context = new Context(tryLocsList || []);

    // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.
    generator._invoke = makeInvokeMethod(innerFn, self, context);

    return generator;
  }
  runtime.wrap = wrap;

  // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.
  function tryCatch(fn, obj, arg) {
    try {
      return { type: "normal", arg: fn.call(obj, arg) };
    } catch (err) {
      return { type: "throw", arg: err };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed";

  // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.
  var ContinueSentinel = {};

  // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}

  var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype;
  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
  GeneratorFunctionPrototype.constructor = GeneratorFunction;
  GeneratorFunction.displayName = "GeneratorFunction";

  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function(method) {
      prototype[method] = function(arg) {
        return this._invoke(method, arg);
      };
    });
  }

  runtime.isGeneratorFunction = function(genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor
      ? ctor === GeneratorFunction ||
        // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction"
      : false;
  };

  runtime.mark = function(genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
    }
    genFun.prototype = Object.create(Gp);
    return genFun;
  };

  // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `value instanceof AwaitArgument` to determine if the yielded value is
  // meant to be awaited. Some may consider the name of this method too
  // cutesy, but they are curmudgeons.
  runtime.awrap = function(arg) {
    return new AwaitArgument(arg);
  };

  function AwaitArgument(arg) {
    this.arg = arg;
  }

  function AsyncIterator(generator) {
    // This invoke function is written in a style that assumes some
    // calling function (or Promise) will handle exceptions.
    function invoke(method, arg) {
      var result = generator[method](arg);
      var value = result.value;
      return value instanceof AwaitArgument
        ? Promise.resolve(value.arg).then(invokeNext, invokeThrow)
        : Promise.resolve(value).then(function(unwrapped) {
            // When a yielded Promise is resolved, its final value becomes
            // the .value of the Promise<{value,done}> result for the
            // current iteration. If the Promise is rejected, however, the
            // result for this iteration will be rejected with the same
            // reason. Note that rejections of yielded Promises are not
            // thrown back into the generator function, as is the case
            // when an awaited Promise is rejected. This difference in
            // behavior between yield and await is important, because it
            // allows the consumer to decide what to do with the yielded
            // rejection (swallow it and continue, manually .throw it back
            // into the generator, abandon iteration, whatever). With
            // await, by contrast, there is no opportunity to examine the
            // rejection reason outside the generator function, so the
            // only option is to throw it from the await expression, and
            // let the generator function handle the exception.
            result.value = unwrapped;
            return result;
          });
    }

    if (typeof process === "object" && process.domain) {
      invoke = process.domain.bind(invoke);
    }

    var invokeNext = invoke.bind(generator, "next");
    var invokeThrow = invoke.bind(generator, "throw");
    var invokeReturn = invoke.bind(generator, "return");
    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return invoke(method, arg);
      }

      return previousPromise =
        // If enqueue has been called before, then we want to wait until
        // all previous Promises have been resolved before calling invoke,
        // so that results are always delivered in the correct order. If
        // enqueue has not been called before, then it is important to
        // call invoke immediately, without waiting on a callback to fire,
        // so that the async generator function has the opportunity to do
        // any necessary setup in a predictable way. This predictability
        // is why the Promise constructor synchronously invokes its
        // executor callback, and why async functions synchronously
        // execute code before the first await. Since we implement simple
        // async functions in terms of async generators, it is especially
        // important to get this right, even though it requires care.
        previousPromise ? previousPromise.then(
          callInvokeWithMethodAndArg,
          // Avoid propagating failures to Promises returned by later
          // invocations of the iterator.
          callInvokeWithMethodAndArg
        ) : new Promise(function (resolve) {
          resolve(callInvokeWithMethodAndArg());
        });
    }

    // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).
    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  runtime.async = function(innerFn, outerFn, self, tryLocsList) {
    var iter = new AsyncIterator(
      wrap(innerFn, outerFn, self, tryLocsList)
    );

    return runtime.isGeneratorFunction(outerFn)
      ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function(result) {
          return result.done ? result.value : iter.next();
        });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;

    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        }

        // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
        return doneResult();
      }

      while (true) {
        var delegate = context.delegate;
        if (delegate) {
          if (method === "return" ||
              (method === "throw" && delegate.iterator[method] === undefined)) {
            // A return or throw (when the delegate iterator has no throw
            // method) always terminates the yield* loop.
            context.delegate = null;

            // If the delegate iterator has a return method, give it a
            // chance to clean up.
            var returnMethod = delegate.iterator["return"];
            if (returnMethod) {
              var record = tryCatch(returnMethod, delegate.iterator, arg);
              if (record.type === "throw") {
                // If the return method threw an exception, let that
                // exception prevail over the original return or throw.
                method = "throw";
                arg = record.arg;
                continue;
              }
            }

            if (method === "return") {
              // Continue with the outer return, now that the delegate
              // iterator has been terminated.
              continue;
            }
          }

          var record = tryCatch(
            delegate.iterator[method],
            delegate.iterator,
            arg
          );

          if (record.type === "throw") {
            context.delegate = null;

            // Like returning generator.throw(uncaught), but without the
            // overhead of an extra function call.
            method = "throw";
            arg = record.arg;
            continue;
          }

          // Delegate generator ran and handled its own exceptions so
          // regardless of what the method was, we continue as if it is
          // "next" with an undefined arg.
          method = "next";
          arg = undefined;

          var info = record.arg;
          if (info.done) {
            context[delegate.resultName] = info.value;
            context.next = delegate.nextLoc;
          } else {
            state = GenStateSuspendedYield;
            return info;
          }

          context.delegate = null;
        }

        if (method === "next") {
          context._sent = arg;

          if (state === GenStateSuspendedYield) {
            context.sent = arg;
          } else {
            context.sent = undefined;
          }
        } else if (method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw arg;
          }

          if (context.dispatchException(arg)) {
            // If the dispatched exception was caught by a catch block,
            // then let that catch block handle the exception normally.
            method = "next";
            arg = undefined;
          }

        } else if (method === "return") {
          context.abrupt("return", arg);
        }

        state = GenStateExecuting;

        var record = tryCatch(innerFn, self, context);
        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done
            ? GenStateCompleted
            : GenStateSuspendedYield;

          var info = {
            value: record.arg,
            done: context.done
          };

          if (record.arg === ContinueSentinel) {
            if (context.delegate && method === "next") {
              // Deliberately forget the last sent value so that we don't
              // accidentally pass it on to the delegate.
              arg = undefined;
            }
          } else {
            return info;
          }

        } else if (record.type === "throw") {
          state = GenStateCompleted;
          // Dispatch the exception by looping back around to the
          // context.dispatchException(arg) call above.
          method = "throw";
          arg = record.arg;
        }
      }
    };
  }

  // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.
  defineIteratorMethods(Gp);

  Gp[iteratorSymbol] = function() {
    return this;
  };

  Gp.toString = function() {
    return "[object Generator]";
  };

  function pushTryEntry(locs) {
    var entry = { tryLoc: locs[0] };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{ tryLoc: "root" }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  runtime.keys = function(object) {
    var keys = [];
    for (var key in object) {
      keys.push(key);
    }
    keys.reverse();

    // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.
    return function next() {
      while (keys.length) {
        var key = keys.pop();
        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      }

      // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.
      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1, next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined;
          next.done = true;

          return next;
        };

        return next.next = next;
      }
    }

    // Return an iterator with no values.
    return { next: doneResult };
  }
  runtime.values = values;

  function doneResult() {
    return { value: undefined, done: true };
  }

  Context.prototype = {
    constructor: Context,

    reset: function(skipTempReset) {
      this.prev = 0;
      this.next = 0;
      this.sent = undefined;
      this.done = false;
      this.delegate = null;

      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" &&
              hasOwn.call(this, name) &&
              !isNaN(+name.slice(1))) {
            this[name] = undefined;
          }
        }
      }
    },

    stop: function() {
      this.done = true;

      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;
      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },

    dispatchException: function(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;
      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;
        return !!caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }

          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },

    abrupt: function(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev &&
            hasOwn.call(entry, "finallyLoc") &&
            this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry &&
          (type === "break" ||
           type === "continue") &&
          finallyEntry.tryLoc <= arg &&
          arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.next = finallyEntry.finallyLoc;
      } else {
        this.complete(record);
      }

      return ContinueSentinel;
    },

    complete: function(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" ||
          record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = record.arg;
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }
    },

    finish: function(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },

    "catch": function(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }

      // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.
      throw new Error("illegal catch attempt");
    },

    delegateYield: function(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      return ContinueSentinel;
    }
  };
})(
  // Among the various tricks for obtaining a reference to the global
  // object, this seems to be the most reliable technique that does not
  // use indirect eval (which violates Content Security Policy).
  typeof global === "object" ? global :
  typeof window === "object" ? window :
  typeof self === "object" ? self : this
);

}).call(this,require('_process'),typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"_process":290}],290:[function(require,module,exports){
// shim for using process in browser

var process = module.exports = {};
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = setTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    clearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        setTimeout(drainQueue, 0);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };

},{}],291:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var fontData = exports.fontData = [
// #0x000
["00000000", "00000000", "00000000", "00000000", "00000000", "00000000", "00000000", "00000000"],
// #0x001
["00011000", "00100100", "01000010", "01111110", "01000010", "01000010", "01000010", "00000000"],
// #0x002
["01111100", "00100010", "00100010", "00111100", "00100010", "00100010", "01111100", "00000000"],
// #0x003
["00011100", "00100010", "01000000", "01000000", "01000000", "00100010", "00011100", "00000000"],
// #0x004
["01111000", "00100100", "00100010", "00100010", "00100010", "00100100", "01111000", "00000000"],
// #0x005
["01111110", "01000000", "01000000", "01111000", "01000000", "01000000", "01111110", "00000000"],
// #0x006
["01111110", "01000000", "01000000", "01111000", "01000000", "01000000", "01000000", "00000000"],
// #0x007
["00011100", "00100010", "01000000", "01001110", "01000010", "00100010", "00011100", "00000000"],
// #0x008
["01000010", "01000010", "01000010", "01111110", "01000010", "01000010", "01000010", "00000000"],
// #0x009
["00011100", "00001000", "00001000", "00001000", "00001000", "00001000", "00011100", "00000000"],
// #0x00a
["00001110", "00000100", "00000100", "00000100", "00000100", "01000100", "00111000", "00000000"],
// #0x00b
["01000010", "01000100", "01001000", "01110000", "01001000", "01000100", "01000010", "00000000"],
// #0x00c
["01000000", "01000000", "01000000", "01000000", "01000000", "01000000", "01111110", "00000000"],
// #0x00d
["01000010", "01100110", "01011010", "01011010", "01000010", "01000010", "01000010", "00000000"],
// #0x00e
["01000010", "01100010", "01010010", "01001010", "01000110", "01000010", "01000010", "00000000"],
// #0x00f
["00011000", "00100100", "01000010", "01000010", "01000010", "00100100", "00011000", "00000000"],
// #0x010
["01111100", "01000010", "01000010", "01111100", "01000000", "01000000", "01000000", "00000000"],
// #0x011
["00011000", "00100100", "01000010", "01000010", "01001010", "00100100", "00011010", "00000000"],
// #0x012
["01111100", "01000010", "01000010", "01111100", "01001000", "01000100", "01000010", "00000000"],
// #0x013
["00111100", "01000010", "01000000", "00111100", "00000010", "01000010", "00111100", "00000000"],
// #0x014
["00111110", "00001000", "00001000", "00001000", "00001000", "00001000", "00001000", "00000000"],
// #0x015
["01000010", "01000010", "01000010", "01000010", "01000010", "01000010", "00111100", "00000000"],
// #0x016
["01000010", "01000010", "01000010", "00100100", "00100100", "00011000", "00011000", "00000000"],
// #0x017
["01000010", "01000010", "01000010", "01011010", "01011010", "01100110", "01000010", "00000000"],
// #0x018
["01000010", "01000010", "00100100", "00011000", "00100100", "01000010", "01000010", "00000000"],
// #0x019
["00100010", "00100010", "00100010", "00011100", "00001000", "00001000", "00001000", "00000000"],
// #0x01a
["01111110", "00000010", "00000100", "00011000", "00100000", "01000000", "01111110", "00000000"],
// #0x01b
["00001000", "00001000", "00001000", "00001000", "11111111", "00001000", "00001000", "00001000"],
// #0x01c
["00001000", "00001000", "00001000", "00001000", "00001111", "00000000", "00000000", "00000000"],
// #0x01d
["00001000", "00001000", "00001000", "00001000", "11111000", "00000000", "00000000", "00000000"],
// #0x01e
["00001000", "00001000", "00001000", "00001000", "00001111", "00001000", "00001000", "00001000"],
// #0x01f
["00001000", "00001000", "00001000", "00001000", "11111111", "00000000", "00000000", "00000000"],
// #0x020
["00111100", "01000010", "01000110", "01011010", "01100010", "01000010", "00111100", "00000000"],
// #0x021
["00001000", "00011000", "00101000", "00001000", "00001000", "00001000", "00111110", "00000000"],
// #0x022
["00111100", "01000010", "00000010", "00001100", "00110000", "01000000", "01111110", "00000000"],
// #0x023
["00111100", "01000010", "00000010", "00111100", "00000010", "01000010", "00111100", "00000000"],
// #0x024
["00000100", "00001100", "00010100", "00100100", "01111110", "00000100", "00000100", "00000000"],
// #0x025
["01111110", "01000000", "01111000", "00000100", "00000010", "01000100", "00111000", "00000000"],
// #0x026
["00011100", "00100000", "01000000", "01111100", "01000010", "01000010", "00111100", "00000000"],
// #0x027
["01111110", "01000010", "00000100", "00001000", "00010000", "00010000", "00010000", "00000000"],
// #0x028
["00111100", "01000010", "01000010", "00111100", "01000010", "01000010", "00111100", "00000000"],
// #0x029
["00111100", "01000010", "01000010", "00111110", "00000010", "00000100", "00111000", "00000000"],
// #0x02a
["00000000", "00000000", "00000000", "01111110", "00000000", "00000000", "00000000", "00000000"],
// #0x02b
["00000000", "00000000", "01111110", "00000000", "01111110", "00000000", "00000000", "00000000"],
// #0x02c
["00000000", "00000000", "00001000", "00000000", "00000000", "00001000", "00001000", "00010000"],
// #0x02d
["00000000", "00000010", "00000100", "00001000", "00010000", "00100000", "01000000", "00000000"],
// #0x02e
["00000000", "00000000", "00000000", "00000000", "00000000", "00011000", "00011000", "00000000"],
// #0x02f
["00000000", "00000000", "00000000", "00000000", "00000000", "00001000", "00001000", "00010000"],
// #0x030
["00000000", "11111111", "00000000", "00000000", "00000000", "00000000", "00000000", "00000000"],
// #0x031
["01000000", "01000000", "01000000", "01000000", "01000000", "01000000", "01000000", "01000000"],
// #0x032
["10000000", "10000000", "10000000", "10000000", "10000000", "10000000", "10000000", "11111111"],
// #0x033
["00000001", "00000001", "00000001", "00000001", "00000001", "00000001", "00000001", "11111111"],
// #0x034
["00000000", "00000000", "00000000", "11111111", "00000000", "00000000", "00000000", "00000000"],
// #0x035
["00010000", "00010000", "00010000", "00010000", "00010000", "00010000", "00010000", "00010000"],
// #0x036
["11111111", "11111111", "00000000", "00000000", "00000000", "00000000", "00000000", "00000000"],
// #0x037
["11000000", "11000000", "11000000", "11000000", "11000000", "11000000", "11000000", "11000000"],
// #0x038
["00000000", "00000000", "00000000", "00000000", "00000000", "11111111", "00000000", "00000000"],
// #0x039
["00000100", "00000100", "00000100", "00000100", "00000100", "00000100", "00000100", "00000100"],
// #0x03a
["00000000", "00000000", "00000000", "00000000", "11111111", "11111111", "11111111", "11111111"],
// #0x03b
["00001111", "00001111", "00001111", "00001111", "00001111", "00001111", "00001111", "00001111"],
// #0x03c
["00000000", "00000000", "00000000", "00000000", "00000000", "00000000", "00000000", "11111111"],
// #0x03d
["00000001", "00000001", "00000001", "00000001", "00000001", "00000001", "00000001", "00000001"],
// #0x03e
["00000000", "00000000", "00000000", "00000000", "00000000", "00000000", "11111111", "11111111"],
// #0x03f
["00000011", "00000011", "00000011", "00000011", "00000011", "00000011", "00000011", "00000011"],
// #0x040
["00000000", "00000000", "00001000", "00000100", "11111110", "00000100", "00001000", "00000000"],
// #0x041
["00001000", "00011100", "00111110", "01111111", "01111111", "00011100", "00111110", "00000000"],
// #0x042
["11111111", "01111111", "00111111", "00011111", "00001111", "00000111", "00000011", "00000001"],
// #0x043
["11111111", "11111111", "11111111", "11111111", "11111111", "11111111", "11111111", "11111111"],
// #0x044
["00001000", "00011100", "00111110", "01111111", "00111110", "00011100", "00001000", "00000000"],
// #0x045
["00000000", "00000000", "00010000", "00100000", "01111111", "00100000", "00010000", "00000000"],
// #0x046
["00001000", "00011100", "00101010", "01111111", "00101010", "00001000", "00001000", "00000000"],
// #0x047
["00000000", "00111100", "01111110", "01111110", "01111110", "01111110", "00111100", "00000000"],
// #0x048
["00000000", "00111100", "01000010", "01000010", "01000010", "01000010", "00111100", "00000000"],
// #0x049
["00111100", "01000010", "00000010", "00001100", "00010000", "00000000", "00010000", "00000000"],
// #0x04a
["11111111", "11000011", "10000001", "10000001", "10000001", "10000001", "11000011", "11111111"],
// #0x04b
["00000000", "00000000", "00000000", "00000000", "00000011", "00000100", "00001000", "00001000"],
// #0x04c
["00000000", "00000000", "00000000", "00000000", "11000000", "00100000", "00010000", "00010000"],
// #0x04d
["10000000", "11000000", "11100000", "11110000", "11111000", "11111100", "11111110", "11111111"],
// #0x04e
["00000001", "00000011", "00000111", "00001111", "00011111", "00111111", "01111111", "11111111"],
// #0x04f
["00000000", "00000000", "00001000", "00000000", "00000000", "00001000", "00000000", "00000000"],
// #0x050
["00000000", "00001000", "00011100", "00101010", "00001000", "00001000", "00001000", "00000000"],
// #0x051
["00001110", "00011000", "00110000", "01100000", "00110000", "00011000", "00001110", "00000000"],
// #0x052
["00111100", "00100000", "00100000", "00100000", "00100000", "00100000", "00111100", "00000000"],
// #0x053
["00110110", "01111111", "01111111", "01111111", "00111110", "00011100", "00001000", "00000000"],
// #0x054
["00111100", "00000100", "00000100", "00000100", "00000100", "00000100", "00111100", "00000000"],
// #0x055
["00011100", "00100010", "01001010", "01010110", "01001100", "00100000", "00011110", "00000000"],
// #0x056
["11111111", "11111110", "11111100", "11111000", "11110000", "11100000", "11000000", "10000000"],
// #0x057
["01110000", "00011000", "00001100", "00000110", "00001100", "00011000", "01110000", "00000000"],
// #0x058
["10100000", "01010000", "10100000", "01010000", "10100000", "01010000", "10100000", "01010000"],
// #0x059
["00000000", "01000000", "00100000", "00010000", "00001000", "00000100", "00000010", "00000000"],
// #0x05a
["10101010", "01010101", "10101010", "01010101", "10101010", "01010101", "10101010", "01010101"],
// #0x05b
["11110000", "11110000", "11110000", "11110000", "00001111", "00001111", "00001111", "00001111"],
// #0x05c
["00000000", "00000000", "00000000", "00000000", "00001111", "00001000", "00001000", "00001000"],
// #0x05d
["00000000", "00000000", "00000000", "00000000", "11111000", "00001000", "00001000", "00001000"],
// #0x05e
["00001000", "00001000", "00001000", "00001000", "11111000", "00001000", "00001000", "00001000"],
// #0x05f
["00000000", "00000000", "00000000", "00000000", "11111111", "00001000", "00001000", "00001000"],
// #0x060
["00000000", "00000000", "00000001", "00111110", "01010100", "00010100", "00010100", "00000000"],
// #0x061
["00001000", "00001000", "00001000", "00001000", "00000000", "00000000", "00001000", "00000000"],
// #0x062
["00100100", "00100100", "00100100", "00000000", "00000000", "00000000", "00000000", "00000000"],
// #0x063
["00100100", "00100100", "01111110", "00100100", "01111110", "00100100", "00100100", "00000000"],
// #0x064
["00001000", "00011110", "00101000", "00011100", "00001010", "00111100", "00001000", "00000000"],
// #0x065
["00000000", "01100010", "01100100", "00001000", "00010000", "00100110", "01000110", "00000000"],
// #0x066
["00110000", "01001000", "01001000", "00110000", "01001010", "01000100", "00111010", "00000000"],
// #0x067
["00000100", "00001000", "00010000", "00000000", "00000000", "00000000", "00000000", "00000000"],
// #0x068
["00000100", "00001000", "00010000", "00010000", "00010000", "00001000", "00000100", "00000000"],
// #0x069
["00100000", "00010000", "00001000", "00001000", "00001000", "00010000", "00100000", "00000000"],
// #0x06a
["00000000", "00001000", "00001000", "00111110", "00001000", "00001000", "00000000", "00000000"],
// #0x06b
["00001000", "00101010", "00011100", "00111110", "00011100", "00101010", "00001000", "00000000"],
// #0x06c
["00001111", "00001111", "00001111", "00001111", "11110000", "11110000", "11110000", "11110000"],
// #0x06d
["10000001", "01000010", "00100100", "00011000", "00011000", "00100100", "01000010", "10000001"],
// #0x06e
["00010000", "00010000", "00100000", "11000000", "00000000", "00000000", "00000000", "00000000"],
// #0x06f
["00001000", "00001000", "00000100", "00000011", "00000000", "00000000", "00000000", "00000000"],
// #0x070
["11111111", "00000000", "00000000", "00000000", "00000000", "00000000", "00000000", "00000000"],
// #0x071
["10000000", "10000000", "10000000", "10000000", "10000000", "10000000", "10000000", "10000000"],
// #0x072
["11111111", "10000000", "10000000", "10000000", "10000000", "10000000", "10000000", "10000000"],
// #0x073
["11111111", "00000001", "00000001", "00000001", "00000001", "00000001", "00000001", "00000001"],
// #0x074
["00000000", "00000000", "11111111", "00000000", "00000000", "00000000", "00000000", "00000000"],
// #0x075
["00100000", "00100000", "00100000", "00100000", "00100000", "00100000", "00100000", "00100000"],
// #0x076
["00000001", "00000010", "00000100", "00001000", "00010000", "00100000", "01000000", "10000000"],
// #0x077
["10000000", "01000000", "00100000", "00010000", "00001000", "00000100", "00000010", "00000001"],
// #0x078
["00000000", "00000000", "00000000", "00000000", "11111111", "00000000", "00000000", "00000000"],
// #0x079
["00001000", "00001000", "00001000", "00001000", "00001000", "00001000", "00001000", "00001000"],
// #0x07a
["11111111", "11111111", "11111111", "11111111", "00000000", "00000000", "00000000", "00000000"],
// #0x07b
["11110000", "11110000", "11110000", "11110000", "11110000", "11110000", "11110000", "11110000"],
// #0x07c
["00000000", "00000000", "00000000", "00000000", "00000000", "00000000", "11111111", "00000000"],
// #0x07d
["00000010", "00000010", "00000010", "00000010", "00000010", "00000010", "00000010", "00000010"],
// #0x07e
["00000000", "00000000", "00000000", "00000000", "00000000", "11111111", "11111111", "11111111"],
// #0x07f
["00000111", "00000111", "00000111", "00000111", "00000111", "00000111", "00000111", "00000111"],
// #0x080
["00000000", "00001000", "00001000", "00001000", "00101010", "00011100", "00001000", "00000000"],
// #0x081
["00000100", "00111000", "00001000", "00111110", "00001000", "00001000", "00010000", "00000000"],
// #0x082
["00000000", "00111110", "00000010", "00000010", "00000010", "00000010", "00111110", "00000000"],
// #0x083
["00000000", "00100010", "00100010", "00010010", "00000010", "00000100", "00011000", "00000000"],
// #0x084
["00000000", "00110000", "00000010", "00110010", "00000010", "00000100", "00111000", "00000000"],
// #0x085
["00000010", "00000100", "00001000", "00011000", "00101000", "00001000", "00001000", "00000000"],
// #0x086
["00000000", "00001000", "00000100", "00100010", "00100010", "00100010", "00100010", "00000000"],
// #0x087
["00001000", "00111110", "00001000", "00111110", "00001000", "00001000", "00001000", "00000000"],
// #0x088
["00000000", "00011110", "00010010", "00100010", "00000010", "00000100", "00011000", "00000000"],
// #0x089
["00000000", "00011100", "00000000", "00000000", "00000000", "00000000", "00111110", "00000000"],
// #0x08a
["00000000", "00111110", "00000010", "00000010", "00010100", "00001000", "00000100", "00000000"],
// #0x08b
["00000100", "00000100", "00000100", "00000100", "00000100", "00001000", "00010000", "00000000"],
// #0x08c
["00100100", "00100100", "00100100", "00100100", "00000100", "00001000", "00010000", "00000000"],
// #0x08d
["00000000", "00111110", "00010000", "00111110", "00010000", "00010000", "00001110", "00000000"],
// #0x08e
["00000000", "00011100", "00000000", "00011100", "00000000", "00111100", "00000010", "00000000"],
// #0x08f
["00011100", "00000000", "00111110", "00000010", "00000010", "00000100", "00001000", "00000000"],
// #0x090
["00010000", "00111110", "00010010", "00010100", "00010000", "00010000", "00001110", "00000000"],
// #0x091
["00000000", "00011110", "00010010", "00101010", "00000110", "00000100", "00011000", "00000000"],
// #0x092
["00000000", "00111110", "00000010", "00000100", "00001000", "00010100", "00100010", "00000000"],
// #0x093
["00010000", "00010000", "00010000", "00011000", "00010100", "00010000", "00010000", "00000000"],
// #0x094
["00010000", "00111110", "00010010", "00010010", "00010010", "00010010", "00100100", "00000000"],
// #0x095
["00001000", "00001000", "00111110", "00001000", "00001000", "00010000", "00100000", "00000000"],
// #0x096
["00100000", "00100000", "00111110", "00100000", "00100000", "00100000", "00011110", "00000000"],
// #0x097
["00011100", "00000000", "00111110", "00001000", "00001000", "00001000", "00010000", "00000000"],
// #0x098
["00010100", "00111110", "00010100", "00010100", "00000100", "00001000", "00010000", "00000000"],
// #0x099
["00000000", "00110000", "00000000", "00000010", "00000010", "00000100", "00111000", "00000000"],
// #0x09a
["00000000", "00101010", "00101010", "00101010", "00000010", "00000100", "00001000", "00000000"],
// #0x09b
["00000000", "00111110", "00100010", "00100010", "00100010", "00100010", "00111110", "00000000"],
// #0x09c
["00010000", "00011110", "00100100", "00000100", "00000100", "00000100", "00001000", "00000000"],
// #0x09d
["00011110", "00010000", "00010000", "00010000", "00000000", "00000000", "00000000", "00000000"],
// #0x09e
["00000000", "00000000", "00111110", "00000010", "00001100", "00001000", "00010000", "00000000"],
// #0x09f
["00000000", "00000000", "00010000", "00111110", "00010010", "00010100", "00010000", "00000000"],
// #0x0a0
["00000000", "00111110", "00100010", "00100010", "00000010", "00000100", "00001000", "00000000"],
// #0x0a1
["00000000", "00111110", "00000010", "00010100", "00001000", "00010100", "00100000", "00000000"],
// #0x0a2
["00000000", "00111110", "00000010", "00000010", "00000010", "00000100", "00011000", "00000000"],
// #0x0a3
["00111110", "00000010", "00001010", "00001100", "00001000", "00001000", "00010000", "00000000"],
// #0x0a4
["00001000", "00111110", "00100010", "00100010", "00000010", "00000100", "00001000", "00000000"],
// #0x0a5
["00000000", "00111110", "00001000", "00001000", "00001000", "00001000", "00111110", "00000000"],
// #0x0a6
["00000100", "00111110", "00000100", "00001100", "00010100", "00100100", "00000100", "00000000"],
// #0x0a7
["00010000", "00010000", "00111110", "00010010", "00010100", "00010000", "00010000", "00000000"],
// #0x0a8
["00000000", "00011100", "00000100", "00000100", "00000100", "00000100", "00111110", "00000000"],
// #0x0a9
["00000000", "00111110", "00000010", "00111110", "00000010", "00000010", "00111110", "00000000"],
// #0x0aa
["00001000", "00111110", "00001000", "00001000", "00101010", "00101010", "00001000", "00000000"],
// #0x0ab
["00000000", "00010000", "00101000", "00000100", "00000010", "00000010", "00000000", "00000000"],
// #0x0ac
["00000000", "00100000", "00100000", "00100010", "00100100", "00101000", "00110000", "00000000"],
// #0x0ad
["00000000", "00000010", "00000010", "00010100", "00001000", "00010100", "00100000", "00000000"],
// #0x0ae
["00000000", "00001000", "00101000", "00101000", "00101010", "00101010", "00101100", "00000000"],
// #0x0af
["00001000", "00111110", "00000100", "00001000", "00011100", "00101010", "00001000", "00000000"],
// #0x0b0
["00000000", "00001000", "00010000", "00100000", "00100010", "00111110", "00000010", "00000000"],
// #0x0b1
["00000000", "00000000", "00000000", "00001000", "00001000", "00001000", "01111000", "00000000"],
// #0x0b2
["00000000", "00000000", "00000100", "00001000", "00011000", "00101000", "00001000", "00000000"],
// #0x0b3
["00000000", "00000000", "00000000", "00011100", "00000100", "00000100", "00111110", "00000000"],
// #0x0b4
["00000000", "00111110", "00000010", "00111110", "00000010", "00000100", "00001000", "00000000"],
// #0x0b5
["00000000", "00000000", "00000000", "00000000", "01000000", "00100000", "00010000", "00000000"],
// #0x0b6
["00000000", "00000000", "00001000", "00111110", "00100010", "00000010", "00001100", "00000000"],
// #0x0b7
["00000000", "00000000", "00111100", "00000100", "00111100", "00000100", "00111100", "00000000"],
// #0x0b8
["01110000", "01010000", "01110000", "00000000", "00000000", "00000000", "00000000", "00000000"],
// #0x0b9
["00000000", "00000000", "00000000", "00000000", "00000000", "00000000", "00100000", "00000000"],
// #0x0ba
["00000000", "00000000", "00000000", "00111110", "00001000", "00001000", "00111110", "00000000"],
// #0x0bb
["00000000", "00000000", "00000000", "00101010", "00101010", "00000010", "00001100", "00000000"],
// #0x0bc
["00010000", "01001000", "00100000", "00000000", "00000000", "00000000", "00000000", "00000000"],
// #0x0bd
["00000000", "00000000", "00000000", "00000000", "01110000", "01010000", "01110000", "00000000"],
// #0x0be
["00000000", "00000000", "00000100", "00111110", "00001100", "00010100", "00100100", "00000000"],
// #0x0bf
["00000000", "00000000", "00000000", "00011100", "00000000", "00000000", "00000000", "00000000"],
// #0x0c0
["00011100", "00011100", "00111110", "00011100", "00001000", "00000000", "00111110", "00000000"],
// #0x0c1
["11111111", "11110111", "11110111", "11110111", "11010101", "11100011", "11110111", "11111111"],
// #0x0c2
["11111111", "11110111", "11100011", "11010101", "11110111", "11110111", "11110111", "11111111"],
// #0x0c3
["11111111", "11111111", "11110111", "11111011", "10000001", "11111011", "11110111", "11111111"],
// #0x0c4
["11111111", "11111111", "11101111", "11011111", "10000001", "11011111", "11101111", "11111111"],
// #0x0c5
["10111011", "10111011", "10111011", "10000011", "10111011", "10111011", "10111011", "11111111"],
// #0x0c6
["11100011", "11011101", "10111111", "10111111", "10111111", "11011101", "11100011", "11111111"],
// #0x0c7
["00011000", "00100100", "01111110", "11111111", "01011010", "00100100", "00000000", "00000000"],
// #0x0c8
["11100000", "01000111", "01000010", "01111110", "01000010", "01000111", "11100000", "00000000"],
// #0x0c9
["00100010", "00111110", "00101010", "00001000", "00001000", "01001001", "01111111", "01000001"],
// #0x0ca
["00011100", "00011100", "00001000", "00111110", "00001000", "00001000", "00010100", "00100010"],
// #0x0cb
["00000000", "00010001", "11010010", "11111100", "11010010", "00010001", "00000000", "00000000"],
// #0x0cc
["00000000", "10001000", "01001011", "00111111", "01001011", "10001000", "00000000", "00000000"],
// #0x0cd
["00100010", "00010100", "00001000", "00001000", "00111110", "00001000", "00011100", "00011100"],
// #0x0ce
["00111100", "01111110", "11111111", "11011011", "11111111", "11100111", "01111110", "00111100"],
// #0x0cf
["00111100", "01000010", "10000001", "10100101", "10000001", "10011001", "01000010", "00111100"],
// #0x0d0
["00111110", "00100010", "00100010", "00111110", "00100010", "00100010", "00111110", "00000000"],
// #0x0d1
["00111110", "00100010", "00111110", "00100010", "00111110", "00100010", "01000010", "00000000"],
// #0x0d2
["00001000", "00101010", "00101010", "00001000", "00010100", "00100010", "01000001", "00000000"],
// #0x0d3
["00001000", "00001001", "00111010", "00001100", "00011100", "00101010", "01001001", "00000000"],
// #0x0d4
["00001000", "00001000", "00111110", "00001000", "00011100", "00101010", "01001001", "00000000"],
// #0x0d5
["00001000", "00010100", "00111110", "01001001", "00111110", "00011100", "01111111", "00000000"],
// #0x0d6
["00000000", "00001000", "00001000", "00111110", "00001000", "00001000", "01111111", "00000000"],
// #0x0d7
["00001000", "01001000", "01111110", "01001000", "00111110", "00001000", "01111111", "00000000"],
// #0x0d8
["00100000", "00111110", "01001000", "00111100", "00101000", "01111110", "00001000", "00000000"],
// #0x0d9
["00000100", "01111110", "01010100", "01111111", "01010010", "01111111", "00001010", "00000000"],
// #0x0da
["00001000", "00010100", "00100010", "01111111", "00010010", "00010010", "00100100", "00000000"],
// #0x0db
["00111000", "00010010", "01111111", "00010111", "00111011", "01010010", "00010100", "00000000"],
// #0x0dc
["01111111", "01001001", "01001001", "01111111", "01000001", "01000001", "01000001", "00000000"],
// #0x0dd
["00100010", "00010100", "00111110", "00001000", "00111110", "00001000", "00001000", "00000000"],
// #0x0de
["00001100", "00010010", "00010000", "00111000", "00010000", "00010000", "00111110", "00000000"],
// #0x0df
["00000000", "11000000", "11001000", "01010100", "01010100", "01010101", "00100010", "00000000"],
// #0x0e0
["00000000", "00000000", "00000000", "00000000", "00000000", "00000010", "11111111", "00000010"],
// #0x0e1
["00000010", "00000010", "00000010", "00000010", "00000010", "00000010", "00000111", "00000010"],
// #0x0e2
["00000010", "00000010", "00000010", "00000010", "00000010", "00000010", "11111111", "00000010"],
// #0x0e3
["00000000", "00000000", "00100000", "01010000", "10001000", "00000101", "00000010", "00000000"],
// #0x0e4
["00000000", "00001110", "00010001", "00100010", "11000100", "00000100", "00000010", "00000001"],
// #0x0e5
["00000000", "11111111", "00000000", "10000001", "01000010", "01000010", "10000001", "00000000"],
// #0x0e6
["00000000", "01110000", "10001000", "01000100", "00100011", "00100000", "01000000", "10000000"],
// #0x0e7
["00000000", "11000100", "10100100", "10010100", "10001111", "10010100", "10100100", "11000100"],
// #0x0e8
["00000000", "00100011", "00100101", "00101001", "11110001", "00101001", "00100101", "00100011"],
// #0x0e9
["10001000", "10010000", "10100000", "11000000", "11000000", "10101000", "10011000", "10111000"],
// #0x0ea
["10101000", "10110000", "10111000", "11000000", "11000000", "10100000", "10010000", "10001000"],
// #0x0eb
["10000000", "01000000", "00100000", "00010000", "00011111", "00100000", "01000000", "10000000"],
// #0x0ec
["00000000", "00000000", "00100100", "00100100", "11100111", "00100100", "00100100", "00000000"],
// #0x0ed
["00001000", "00001000", "00111110", "00000000", "00000000", "00111110", "00001000", "00001000"],
// #0x0ee
["00001000", "00010000", "00100000", "00010000", "00001000", "00000100", "00000010", "00000100"],
// #0x0ef
["01010101", "10101010", "01010101", "10101010", "01010101", "10101010", "01010101", "10101010"],
// #0x0f0
["00000000", "00000000", "00000000", "00000000", "00000000", "00000000", "00000000", "00000000"],
// #0x0f1
["00000000", "01110000", "01110000", "01110000", "00000000", "00000000", "00000000", "00000000"],
// #0x0f2
["00000000", "00000111", "00000111", "00000111", "00000000", "00000000", "00000000", "00000000"],
// #0x0f3
["00000000", "01110111", "01110111", "01110111", "00000000", "00000000", "00000000", "00000000"],
// #0x0f4
["00000000", "00000000", "00000000", "00000000", "00000000", "01110000", "01110000", "01110000"],
// #0x0f5
["00000000", "01110000", "01110000", "01110000", "00000000", "01110000", "01110000", "01110000"],
// #0x0f6
["00000000", "00000111", "00000111", "00000111", "00000000", "01110000", "01110000", "01110000"],
// #0x0f7
["00000000", "01110111", "01110111", "01110111", "00000000", "01110000", "01110000", "01110000"],
// #0x0f8
["00000000", "00000000", "00000000", "00000000", "00000000", "00000111", "00000111", "00000111"],
// #0x0f9
["00000000", "01110000", "01110000", "01110000", "00000000", "00000111", "00000111", "00000111"],
// #0x0fa
["00000000", "00000111", "00000111", "00000111", "00000000", "00000111", "00000111", "00000111"],
// #0x0fb
["00000000", "01110111", "01110111", "01110111", "00000000", "00000111", "00000111", "00000111"],
// #0x0fc
["00000000", "00000000", "00000000", "00000000", "00000000", "01110111", "01110111", "01110111"],
// #0x0fd
["00000000", "01110000", "01110000", "01110000", "00000000", "01110111", "01110111", "01110111"],
// #0x0fe
["00000000", "00000111", "00000111", "00000111", "00000000", "01110111", "01110111", "01110111"],
// #0x0ff
["00000000", "01110111", "01110111", "01110111", "00000000", "01110111", "01110111", "01110111"],
// #0x100
["00000000", "00000000", "00000000", "00000000", "00000000", "00000000", "00000000", "00000000"],
// #0x101
["00000000", "00000000", "00111000", "00000100", "00111100", "01000100", "00111010", "00000000"],
// #0x102
["01000000", "01000000", "01011100", "01100010", "01000010", "01100010", "01011100", "00000000"],
// #0x103
["00000000", "00000000", "00111100", "01000010", "01000000", "01000010", "00111100", "00000000"],
// #0x104
["00000010", "00000010", "00111010", "01000110", "01000010", "01000110", "00111010", "00000000"],
// #0x105
["00000000", "00000000", "00111100", "01000010", "01111110", "01000000", "00111100", "00000000"],
// #0x106
["00001100", "00010010", "00010000", "01111100", "00010000", "00010000", "00010000", "00000000"],
// #0x107
["00000000", "00000000", "00111010", "01000110", "01000110", "00111010", "00000010", "00111100"],
// #0x108
["01000000", "01000000", "01011100", "01100010", "01000010", "01000010", "01000010", "00000000"],
// #0x109
["00001000", "00000000", "00011000", "00001000", "00001000", "00001000", "00011100", "00000000"],
// #0x10a
["00000100", "00000000", "00001100", "00000100", "00000100", "00000100", "01000100", "00111000"],
// #0x10b
["01000000", "01000000", "01000100", "01001000", "01010000", "01101000", "01000100", "00000000"],
// #0x10c
["00011000", "00001000", "00001000", "00001000", "00001000", "00001000", "00011100", "00000000"],
// #0x10d
["00000000", "00000000", "01110110", "01001001", "01001001", "01001001", "01001001", "00000000"],
// #0x10e
["00000000", "00000000", "01011100", "01100010", "01000010", "01000010", "01000010", "00000000"],
// #0x10f
["00000000", "00000000", "00111100", "01000010", "01000010", "01000010", "00111100", "00000000"],
// #0x110
["00000000", "00000000", "01011100", "01100010", "01100010", "01011100", "01000000", "01000000"],
// #0x111
["00000000", "00000000", "00111010", "01000110", "01000110", "00111010", "00000010", "00000010"],
// #0x112
["00000000", "00000000", "01011100", "01100010", "01000000", "01000000", "01000000", "00000000"],
// #0x113
["00000000", "00000000", "00111110", "01000000", "00111100", "00000010", "01111100", "00000000"],
// #0x114
["00010000", "00010000", "01111100", "00010000", "00010000", "00010010", "00001100", "00000000"],
// #0x115
["00000000", "00000000", "01000010", "01000010", "01000010", "01000010", "00111100", "00000000"],
// #0x116
["00000000", "00000000", "01000010", "01000010", "01000010", "00100100", "00011000", "00000000"],
// #0x117
["00000000", "00000000", "01000001", "01001001", "01001001", "01001001", "00110110", "00000000"],
// #0x118
["00000000", "00000000", "01000100", "00101000", "00010000", "00101000", "01000100", "00000000"],
// #0x119
["00000000", "00000000", "01000010", "01000010", "01000110", "00111010", "00000010", "00111100"],
// #0x11a
["00000000", "00000000", "01111110", "00000100", "00011000", "00100000", "01111110", "00000000"],
// #0x11b
["00001000", "00001000", "00001000", "00001000", "11111111", "00001000", "00001000", "00001000"],
// #0x11c
["00001000", "00001000", "00001000", "00001000", "00001111", "00000000", "00000000", "00000000"],
// #0x11d
["00001000", "00001000", "00001000", "00001000", "11111000", "00000000", "00000000", "00000000"],
// #0x11e
["00001000", "00001000", "00001000", "00001000", "00001111", "00001000", "00001000", "00001000"],
// #0x11f
["00001000", "00001000", "00001000", "00001000", "11111111", "00000000", "00000000", "00000000"],
// #0x120
["00111100", "01000010", "01000110", "01011010", "01100010", "01000010", "00111100", "00000000"],
// #0x121
["00001000", "00011000", "00101000", "00001000", "00001000", "00001000", "00111110", "00000000"],
// #0x122
["00111100", "01000010", "00000010", "00001100", "00110000", "01000000", "01111110", "00000000"],
// #0x123
["00111100", "01000010", "00000010", "00111100", "00000010", "01000010", "00111100", "00000000"],
// #0x124
["00000100", "00001100", "00010100", "00100100", "01111110", "00000100", "00000100", "00000000"],
// #0x125
["01111110", "01000000", "01111000", "00000100", "00000010", "01000100", "00111000", "00000000"],
// #0x126
["00011100", "00100000", "01000000", "01111100", "01000010", "01000010", "00111100", "00000000"],
// #0x127
["01111110", "01000010", "00000100", "00001000", "00010000", "00010000", "00010000", "00000000"],
// #0x128
["00111100", "01000010", "01000010", "00111100", "01000010", "01000010", "00111100", "00000000"],
// #0x129
["00111100", "01000010", "01000010", "00111110", "00000010", "00000100", "00111000", "00000000"],
// #0x12a
["00000000", "00000000", "00000000", "01111110", "00000000", "00000000", "00000000", "00000000"],
// #0x12b
["00000000", "00000000", "01111110", "00000000", "01111110", "00000000", "00000000", "00000000"],
// #0x12c
["00000000", "00000000", "00001000", "00000000", "00000000", "00001000", "00001000", "00010000"],
// #0x12d
["00000000", "00000010", "00000100", "00001000", "00010000", "00100000", "01000000", "00000000"],
// #0x12e
["00000000", "00000000", "00000000", "00000000", "00000000", "00011000", "00011000", "00000000"],
// #0x12f
["00000000", "00000000", "00000000", "00000000", "00000000", "00001000", "00001000", "00010000"],
// #0x130
["00000000", "11111111", "00000000", "00000000", "00000000", "00000000", "00000000", "00000000"],
// #0x131
["01000000", "01000000", "01000000", "01000000", "01000000", "01000000", "01000000", "01000000"],
// #0x132
["10000000", "10000000", "10000000", "10000000", "10000000", "10000000", "10000000", "11111111"],
// #0x133
["00000001", "00000001", "00000001", "00000001", "00000001", "00000001", "00000001", "11111111"],
// #0x134
["00000000", "00000000", "00000000", "11111111", "00000000", "00000000", "00000000", "00000000"],
// #0x135
["00010000", "00010000", "00010000", "00010000", "00010000", "00010000", "00010000", "00010000"],
// #0x136
["11111111", "11111111", "00000000", "00000000", "00000000", "00000000", "00000000", "00000000"],
// #0x137
["11000000", "11000000", "11000000", "11000000", "11000000", "11000000", "11000000", "11000000"],
// #0x138
["00000000", "00000000", "00000000", "00000000", "00000000", "11111111", "00000000", "00000000"],
// #0x139
["00000100", "00000100", "00000100", "00000100", "00000100", "00000100", "00000100", "00000100"],
// #0x13a
["00000000", "00000000", "00000000", "00000000", "11111111", "11111111", "11111111", "11111111"],
// #0x13b
["00001111", "00001111", "00001111", "00001111", "00001111", "00001111", "00001111", "00001111"],
// #0x13c
["00000000", "00000000", "00000000", "00000000", "00000000", "00000000", "00000000", "11111111"],
// #0x13d
["00000001", "00000001", "00000001", "00000001", "00000001", "00000001", "00000001", "00000001"],
// #0x13e
["00000000", "00000000", "00000000", "00000000", "00000000", "00000000", "11111111", "11111111"],
// #0x13f
["00000011", "00000011", "00000011", "00000011", "00000011", "00000011", "00000011", "00000011"],
// #0x140
["00000000", "00000000", "00001000", "00000100", "11111110", "00000100", "00001000", "00000000"],
// #0x141
["00001000", "00011100", "00111110", "01111111", "01111111", "00011100", "00111110", "00000000"],
// #0x142
["11111111", "01111111", "00111111", "00011111", "00001111", "00000111", "00000011", "00000001"],
// #0x143
["11111111", "11111111", "11111111", "11111111", "11111111", "11111111", "11111111", "11111111"],
// #0x144
["00001000", "00011100", "00111110", "01111111", "00111110", "00011100", "00001000", "00000000"],
// #0x145
["00000000", "00000000", "00010000", "00100000", "01111111", "00100000", "00010000", "00000000"],
// #0x146
["00001000", "00011100", "00101010", "01111111", "00101010", "00001000", "00001000", "00000000"],
// #0x147
["00000000", "00111100", "01111110", "01111110", "01111110", "01111110", "00111100", "00000000"],
// #0x148
["00000000", "00111100", "01000010", "01000010", "01000010", "01000010", "00111100", "00000000"],
// #0x149
["00111100", "01000010", "00000010", "00001100", "00010000", "00000000", "00010000", "00000000"],
// #0x14a
["11111111", "11000011", "10000001", "10000001", "10000001", "10000001", "11000011", "11111111"],
// #0x14b
["00000000", "00000000", "00000000", "00000000", "00000011", "00000100", "00001000", "00001000"],
// #0x14c
["00000000", "00000000", "00000000", "00000000", "11000000", "00100000", "00010000", "00010000"],
// #0x14d
["10000000", "11000000", "11100000", "11110000", "11111000", "11111100", "11111110", "11111111"],
// #0x14e
["00000001", "00000011", "00000111", "00001111", "00011111", "00111111", "01111111", "11111111"],
// #0x14f
["00000000", "00000000", "00001000", "00000000", "00000000", "00001000", "00000000", "00000000"],
// #0x150
["00000000", "00001000", "00011100", "00101010", "00001000", "00001000", "00001000", "00000000"],
// #0x151
["00001110", "00011000", "00110000", "01100000", "00110000", "00011000", "00001110", "00000000"],
// #0x152
["00111100", "00100000", "00100000", "00100000", "00100000", "00100000", "00111100", "00000000"],
// #0x153
["00110110", "01111111", "01111111", "01111111", "00111110", "00011100", "00001000", "00000000"],
// #0x154
["00111100", "00000100", "00000100", "00000100", "00000100", "00000100", "00111100", "00000000"],
// #0x155
["00011100", "00100010", "01001010", "01010110", "01001100", "00100000", "00011110", "00000000"],
// #0x156
["11111111", "11111110", "11111100", "11111000", "11110000", "11100000", "11000000", "10000000"],
// #0x157
["01110000", "00011000", "00001100", "00000110", "00001100", "00011000", "01110000", "00000000"],
// #0x158
["10100000", "01010000", "10100000", "01010000", "10100000", "01010000", "10100000", "01010000"],
// #0x159
["00000000", "01000000", "00100000", "00010000", "00001000", "00000100", "00000010", "00000000"],
// #0x15a
["10101010", "01010101", "10101010", "01010101", "10101010", "01010101", "10101010", "01010101"],
// #0x15b
["11110000", "11110000", "11110000", "11110000", "00001111", "00001111", "00001111", "00001111"],
// #0x15c
["00000000", "00000000", "00000000", "00000000", "00001111", "00001000", "00001000", "00001000"],
// #0x15d
["00000000", "00000000", "00000000", "00000000", "11111000", "00001000", "00001000", "00001000"],
// #0x15e
["00001000", "00001000", "00001000", "00001000", "11111000", "00001000", "00001000", "00001000"],
// #0x15f
["00000000", "00000000", "00000000", "00000000", "11111111", "00001000", "00001000", "00001000"],
// #0x160
["00000000", "00000000", "00000001", "00111110", "01010100", "00010100", "00010100", "00000000"],
// #0x161
["00001000", "00001000", "00001000", "00001000", "00000000", "00000000", "00001000", "00000000"],
// #0x162
["00100100", "00100100", "00100100", "00000000", "00000000", "00000000", "00000000", "00000000"],
// #0x163
["00100100", "00100100", "01111110", "00100100", "01111110", "00100100", "00100100", "00000000"],
// #0x164
["00001000", "00011110", "00101000", "00011100", "00001010", "00111100", "00001000", "00000000"],
// #0x165
["00000000", "01100010", "01100100", "00001000", "00010000", "00100110", "01000110", "00000000"],
// #0x166
["00110000", "01001000", "01001000", "00110000", "01001010", "01000100", "00111010", "00000000"],
// #0x167
["00000100", "00001000", "00010000", "00000000", "00000000", "00000000", "00000000", "00000000"],
// #0x168
["00000100", "00001000", "00010000", "00010000", "00010000", "00001000", "00000100", "00000000"],
// #0x169
["00100000", "00010000", "00001000", "00001000", "00001000", "00010000", "00100000", "00000000"],
// #0x16a
["00000000", "00001000", "00001000", "00111110", "00001000", "00001000", "00000000", "00000000"],
// #0x16b
["00001000", "00101010", "00011100", "00111110", "00011100", "00101010", "00001000", "00000000"],
// #0x16c
["00001111", "00001111", "00001111", "00001111", "11110000", "11110000", "11110000", "11110000"],
// #0x16d
["10000001", "01000010", "00100100", "00011000", "00011000", "00100100", "01000010", "10000001"],
// #0x16e
["00010000", "00010000", "00100000", "11000000", "00000000", "00000000", "00000000", "00000000"],
// #0x16f
["00001000", "00001000", "00000100", "00000011", "00000000", "00000000", "00000000", "00000000"],
// #0x170
["11111111", "00000000", "00000000", "00000000", "00000000", "00000000", "00000000", "00000000"],
// #0x171
["10000000", "10000000", "10000000", "10000000", "10000000", "10000000", "10000000", "10000000"],
// #0x172
["11111111", "10000000", "10000000", "10000000", "10000000", "10000000", "10000000", "10000000"],
// #0x173
["11111111", "00000001", "00000001", "00000001", "00000001", "00000001", "00000001", "00000001"],
// #0x174
["00000000", "00000000", "11111111", "00000000", "00000000", "00000000", "00000000", "00000000"],
// #0x175
["00100000", "00100000", "00100000", "00100000", "00100000", "00100000", "00100000", "00100000"],
// #0x176
["00000100", "00001000", "00010001", "00100010", "01000100", "10001000", "00010000", "00100000"],
// #0x177
["00100000", "00010000", "10001000", "01000100", "00100010", "00010001", "00001000", "00000100"],
// #0x178
["00000000", "00000000", "00000000", "00000000", "11111111", "00000000", "00000000", "00000000"],
// #0x179
["00001000", "00001000", "00001000", "00001000", "00001000", "00001000", "00001000", "00001000"],
// #0x17a
["11111111", "11111111", "11111111", "11111111", "00000000", "00000000", "00000000", "00000000"],
// #0x17b
["11110000", "11110000", "11110000", "11110000", "11110000", "11110000", "11110000", "11110000"],
// #0x17c
["00000000", "00000000", "00000000", "00000000", "00000000", "00000000", "11111111", "00000000"],
// #0x17d
["00000010", "00000010", "00000010", "00000010", "00000010", "00000010", "00000010", "00000010"],
// #0x17e
["00000000", "00000000", "00000000", "00000000", "00000000", "11111111", "11111111", "11111111"],
// #0x17f
["00000111", "00000111", "00000111", "00000111", "00000111", "00000111", "00000111", "00000111"],
// #0x180
["00000000", "00001000", "00001000", "00001000", "00101010", "00011100", "00001000", "00000000"],
// #0x181
["00010000", "11111110", "00100000", "01111100", "00000010", "00000010", "11111100", "00000000"],
// #0x182
["00000000", "11111100", "00000010", "00000000", "00000000", "10000000", "01111110", "00000000"],
// #0x183
["00111100", "00001000", "00010000", "01111110", "00001000", "00010000", "00001100", "00000000"],
// #0x184
["01000000", "01000000", "01000000", "01000000", "01000100", "01000100", "00111000", "00000000"],
// #0x185
["10000100", "10000010", "10000010", "10000010", "10000010", "10010000", "01100000", "00000000"],
// #0x186
["10000100", "10011110", "10000100", "10000100", "10011100", "10100110", "01011100", "00000000"],
// #0x187
["00010000", "01111110", "00001000", "01111110", "00000100", "00000010", "01100000", "00011000"],
// #0x188
["00001100", "00011000", "00110000", "01100000", "00110000", "00011000", "00001100", "00000000"],
// #0x189
["10011110", "10000000", "10000000", "10000000", "10000000", "10010000", "11011110", "00000000"],
// #0x18a
["00010000", "01111110", "00010000", "01111110", "00010000", "01110000", "10011100", "01110010"],
// #0x18b
["00111000", "01010100", "10010010", "10010010", "10010010", "10010010", "01100100", "00000000"],
// #0x18c
["01000100", "01000100", "01000100", "01100100", "00000100", "00001000", "00010000", "00000000"],
// #0x18d
["00100000", "11111000", "00100000", "11111000", "00100010", "00100010", "00011100", "00000000"],
// #0x18e
["01110000", "00010000", "00010100", "01111110", "10010100", "10010100", "01100100", "00000000"],
// #0x18f
["01100000", "00000000", "10011100", "10100010", "11000010", "10000010", "00011100", "00000000"],
// #0x190
["01000100", "01000100", "11111110", "01000100", "01011000", "01000000", "00111110", "00000000"],
// #0x191
["00100000", "11111100", "01000000", "01011110", "10000000", "10100000", "10111110", "00000000"],
// #0x192
["00001000", "11111110", "00001000", "00111000", "01001000", "00111000", "00001000", "00010000"],
// #0x193
["00100000", "00100010", "00101100", "00110000", "01000000", "10000000", "01111110", "00000000"],
// #0x194
["00100010", "11111001", "00100101", "00100100", "00100100", "00100100", "01001000", "00000000"],
// #0x195
["00100000", "11111010", "01000001", "01000100", "10011100", "10100110", "00011100", "00000000"],
// #0x196
["11100000", "00100110", "01000101", "10000100", "10000100", "10001000", "01110000", "00000000"],
// #0x197
["11111110", "00000100", "00001000", "00010000", "00010000", "00001000", "00000100", "00000000"],
// #0x198
["00100000", "11111110", "00010000", "00001000", "01000100", "00100000", "00011000", "00000000"],
// #0x199
["00010000", "00100000", "00100000", "01110000", "01001000", "10001000", "10000110", "00000000"],
// #0x19a
["10000000", "01111100", "00000010", "00000010", "00000010", "00000100", "00011000", "00000000"],
// #0x19b
["01111100", "00001000", "00010000", "00101100", "01000010", "00000010", "00100100", "00011000"],
// #0x19c
["10000100", "10111110", "10000100", "10000100", "10000100", "10000100", "01001000", "00000000"],
// #0x19d
["00011110", "00010000", "00010000", "00010000", "00000000", "00000000", "00000000", "00000000"],
// #0x19e
["00000000", "00100000", "01110000", "00100000", "01111000", "10010100", "01101000", "00000000"],
// #0x19f
["00000000", "00000000", "01011000", "11100100", "00101000", "00100000", "00010000", "00000000"],
// #0x1a0
["00100000", "11100100", "00101010", "00110010", "01100010", "10100010", "00100100", "00000000"],
// #0x1a1
["00000100", "01000100", "01111100", "01001010", "10110010", "10010111", "01100110", "00000000"],
// #0x1a2
["00111000", "00000000", "00010000", "01001010", "01001010", "10001010", "00110000", "00000000"],
// #0x1a3
["00100000", "11111100", "00100000", "01111100", "10101010", "10010010", "01100100", "00000000"],
// #0x1a4
["00011000", "00000000", "00111100", "01000010", "00000010", "00000100", "00001000", "00000000"],
// #0x1a5
["00010000", "00000000", "01111100", "00001000", "00010000", "00101000", "01000110", "00000000"],
// #0x1a6
["00100000", "11111101", "00100001", "01111100", "10100010", "10100010", "01100100", "00000000"],
// #0x1a7
["01001000", "01001100", "00110010", "11100010", "00100100", "00010000", "00010000", "00001000"],
// #0x1a8
["00001000", "10011100", "10101010", "11001010", "11001010", "10001100", "00011000", "00000000"],
// #0x1a9
["00001000", "00001110", "00001000", "00001000", "01111000", "10001110", "01111000", "00000000"],
// #0x1aa
["10011110", "10000100", "10011110", "10000100", "10011100", "10100110", "11011100", "00000000"],
// #0x1ab
["00000000", "00100000", "01010000", "10001000", "00000100", "00000010", "00000010", "00000000"],
// #0x1ac
["00100000", "11100110", "00101100", "00110100", "01100100", "10100100", "00100010", "00000000"],
// #0x1ad
["00000100", "01000100", "01111100", "01001010", "10110010", "10010010", "01100100", "00000000"],
// #0x1ae
["01111100", "00001000", "00010000", "00111100", "01000010", "00011010", "00100100", "00011000"],
// #0x1af
["00100000", "11100100", "00101010", "00110010", "01100110", "10101011", "00100110", "00000000"],
// #0x1b0
["00100000", "11111101", "00100001", "01100000", "10100000", "01100010", "00111110", "00000000"],
// #0x1b1
["00000000", "00000000", "00000000", "00000000", "00001000", "00001000", "00001000", "01111000"],
// #0x1b2
["00000000", "00000000", "01001000", "01000100", "01000100", "01000100", "00100000", "00000000"],
// #0x1b3
["00000000", "00000000", "00010000", "10111000", "11010100", "10011000", "00110000", "00000000"],
// #0x1b4
["00010000", "11111110", "00100000", "01110100", "10111000", "01001000", "01111110", "00000000"],
// #0x1b5
["00000000", "00000000", "00000000", "00000000", "00000000", "01000000", "00100000", "00010000"],
// #0x1b6
["00000000", "00100000", "00000000", "01111000", "00000100", "00000100", "00001000", "00000000"],
// #0x1b7
["00000000", "00000000", "00100000", "00111000", "00100000", "01111000", "01100000", "00000000"],
// #0x1b8
["01110000", "01010000", "01110000", "00000000", "00000000", "00000000", "00000000", "00000000"],
// #0x1b9
["00000000", "00000000", "00000000", "00000000", "00000000", "00000000", "00100000", "00000000"],
// #0x1ba
["00000000", "00100000", "00000000", "01111000", "00010000", "00110000", "01001100", "00000000"],
// #0x1bb
["00000000", "00000000", "00000000", "11111000", "00000100", "00000100", "00011000", "00000000"],
// #0x1bc
["00100000", "10010000", "01000000", "00000000", "00000000", "00000000", "00000000", "00000000"],
// #0x1bd
["00000000", "00000000", "00000000", "00000000", "00000000", "01110000", "01010000", "01110000"],
// #0x1be
["00000000", "00100000", "01110100", "00100000", "01111000", "10100100", "01101000", "00000000"],
// #0x1bf
["00000000", "00000000", "00000000", "00011100", "00000000", "00000000", "00000000", "00000000"],
// #0x1c0
["00011100", "00011100", "00111110", "00011100", "00001000", "00000000", "00111110", "00000000"],
// #0x1c1
["11111111", "11110111", "11110111", "11110111", "11010101", "11100011", "11110111", "11111111"],
// #0x1c2
["11111111", "11110111", "11100011", "11010101", "11110111", "11110111", "11110111", "11111111"],
// #0x1c3
["11111111", "11111111", "11110111", "11111011", "10000001", "11111011", "11110111", "11111111"],
// #0x1c4
["11111111", "11111111", "11101111", "11011111", "10000001", "11011111", "11101111", "11111111"],
// #0x1c5
["10111011", "10111011", "10111011", "10000011", "10111011", "10111011", "10111011", "11111111"],
// #0x1c6
["11100011", "11011101", "10111111", "10111111", "10111111", "11011101", "11100011", "11111111"],
// #0x1c7
["00011000", "00100100", "01111110", "11111111", "01011010", "00100100", "00000000", "00000000"],
// #0x1c8
["11100000", "01000111", "01000010", "01111110", "01000010", "01000111", "11100000", "00000000"],
// #0x1c9
["00100010", "00111110", "00101010", "00001000", "00001000", "01001001", "01111111", "01000001"],
// #0x1ca
["00011100", "00011100", "00001000", "00111110", "00001000", "00001000", "00010100", "00100010"],
// #0x1cb
["00000000", "00010001", "11010010", "11111100", "11010010", "00010001", "00000000", "00000000"],
// #0x1cc
["00000000", "10001000", "01001011", "00111111", "01001011", "10001000", "00000000", "00000000"],
// #0x1cd
["00100010", "00010100", "00001000", "00001000", "00111110", "00001000", "00011100", "00011100"],
// #0x1ce
["00111100", "01111110", "11111111", "11011011", "11111111", "11100111", "01111110", "00111100"],
// #0x1cf
["00111100", "01000010", "10000001", "10100101", "10000001", "10011001", "01000010", "00111100"],
// #0x1d0
["00111110", "00100010", "00100010", "00111110", "00100010", "00100010", "00111110", "00000000"],
// #0x1d1
["00111110", "00100010", "00111110", "00100010", "00111110", "00100010", "01000010", "00000000"],
// #0x1d2
["00001000", "00101010", "00101010", "00001000", "00010100", "00100010", "01000001", "00000000"],
// #0x1d3
["00001000", "00001001", "00111010", "00001100", "00011100", "00101010", "01001001", "00000000"],
// #0x1d4
["00001000", "00001000", "00111110", "00001000", "00011100", "00101010", "01001001", "00000000"],
// #0x1d5
["00001000", "00010100", "00111110", "01001001", "00111110", "00011100", "01111111", "00000000"],
// #0x1d6
["00000000", "00001000", "00001000", "00111110", "00001000", "00001000", "01111111", "00000000"],
// #0x1d7
["00001000", "01001000", "01111110", "01001000", "00111110", "00001000", "01111111", "00000000"],
// #0x1d8
["00100000", "00111110", "01001000", "00111100", "00101000", "01111110", "00001000", "00000000"],
// #0x1d9
["00000100", "01111110", "01010100", "01111111", "01010010", "01111111", "00001010", "00000000"],
// #0x1da
["00001000", "00010100", "00100010", "01111111", "00010010", "00010010", "00100100", "00000000"],
// #0x1db
["00111000", "00010010", "01111111", "00010111", "00111011", "01010010", "00010100", "00000000"],
// #0x1dc
["01111111", "01001001", "01001001", "01111111", "01000001", "01000001", "01000001", "00000000"],
// #0x1dd
["00100010", "00010100", "00111110", "00001000", "00111110", "00001000", "00001000", "00000000"],
// #0x1de
["00001100", "00010010", "00010000", "00111000", "00010000", "00010000", "00111110", "00000000"],
// #0x1df
["00000000", "11000000", "11001000", "01010100", "01010100", "01010101", "00100010", "00000000"],
// #0x1e0
["00000000", "00000000", "00000000", "00000000", "00000000", "00000010", "11111111", "00000010"],
// #0x1e1
["00000010", "00000010", "00000010", "00000010", "00000010", "00000010", "00000111", "00000010"],
// #0x1e2
["00000010", "00000010", "00000010", "00000010", "00000010", "00000010", "11111111", "00000010"],
// #0x1e3
["00000000", "00000000", "00100000", "01010000", "10001000", "00000101", "00000010", "00000000"],
// #0x1e4
["00000000", "00001110", "00010001", "00100010", "11000100", "00000100", "00000010", "00000001"],
// #0x1e5
["00000000", "11111111", "00000000", "10000001", "01000010", "01000010", "10000001", "00000000"],
// #0x1e6
["00000000", "01110000", "10001000", "01000100", "00100011", "00100000", "01000000", "10000000"],
// #0x1e7
["00000000", "11000100", "10100100", "10010100", "10001111", "10010100", "10100100", "11000100"],
// #0x1e8
["00000000", "00100011", "00100101", "00101001", "11110001", "00101001", "00100101", "00100011"],
// #0x1e9
["10001000", "10010000", "10100000", "11000000", "11000000", "10101000", "10011000", "10111000"],
// #0x1ea
["10101000", "10110000", "10111000", "11000000", "11000000", "10100000", "10010000", "10001000"],
// #0x1eb
["10000000", "01000000", "00100000", "00010000", "00011111", "00100000", "01000000", "10000000"],
// #0x1ec
["00000000", "00000000", "00100100", "00100100", "11100111", "00100100", "00100100", "00000000"],
// #0x1ed
["00001000", "00001000", "00111110", "00000000", "00000000", "00111110", "00001000", "00001000"],
// #0x1ee
["00001000", "00010000", "00100000", "00010000", "00001000", "00000100", "00000010", "00000100"],
// #0x1ef
["01010101", "10101010", "01010101", "10101010", "01010101", "10101010", "01010101", "10101010"],
// #0x1f0
["00000000", "00000000", "00000000", "00000000", "00000000", "00000000", "00000000", "00000000"],
// #0x1f1
["00000000", "01110000", "01110000", "01110000", "00000000", "00000000", "00000000", "00000000"],
// #0x1f2
["00000000", "00000111", "00000111", "00000111", "00000000", "00000000", "00000000", "00000000"],
// #0x1f3
["00000000", "01110111", "01110111", "01110111", "00000000", "00000000", "00000000", "00000000"],
// #0x1f4
["00000000", "00000000", "00000000", "00000000", "00000000", "01110000", "01110000", "01110000"],
// #0x1f5
["00000000", "01110000", "01110000", "01110000", "00000000", "01110000", "01110000", "01110000"],
// #0x1f6
["00000000", "00000111", "00000111", "00000111", "00000000", "01110000", "01110000", "01110000"],
// #0x1f7
["00000000", "01110111", "01110111", "01110111", "00000000", "01110000", "01110000", "01110000"],
// #0x1f8
["00000000", "00000000", "00000000", "00000000", "00000000", "00000111", "00000111", "00000111"],
// #0x1f9
["00000000", "01110000", "01110000", "01110000", "00000000", "00000111", "00000111", "00000111"],
// #0x1fa
["00000000", "00000111", "00000111", "00000111", "00000000", "00000111", "00000111", "00000111"],
// #0x1fb
["00000000", "01110111", "01110111", "01110111", "00000000", "00000111", "00000111", "00000111"],
// #0x1fc
["00000000", "00000000", "00000000", "00000000", "00000000", "01110111", "01110111", "01110111"],
// #0x1fd
["00000000", "01110000", "01110000", "01110000", "00000000", "01110111", "01110111", "01110111"],
// #0x1fe
["00000000", "00000111", "00000111", "00000111", "00000000", "01110111", "01110111", "01110111"], // #0x1ff
["00000000", "01110111", "01110111", "01110111", "00000000", "01110111", "01110111", "01110111"]];

},{}],292:[function(require,module,exports){
"use strict";

require("babel-polyfill");

var _mz700fon = require("./mz700fon");

// フレームバッファに書き込むシェーダー
// var vshaderFSrc =
// `precision mediump float;
// attribute vec2 position;
// attribute float color;
// uniform vec2 bufferSize;
// varying float vcolor;

// void main(void) {
//     vec2 bs = bufferSize - bufferSize /  2.0;
//     bs.y = -bs.y;
//     gl_Position = vec4(position / bs, 0.0,1.0);
//     vcolor = color;
// }
// `;

// var fshaderFSrc =
// `precision mediump float;
// varying float vcolor;
// void main(void){
//  gl_FragColor = vec4(vcolor, 0. , 0. , 1.);
// }
// `;

// パレットエミュレートシェーダー
var vshaderPSrc = "precision mediump float;\nattribute vec2 position;\nattribute vec2 texture_coord;\nvarying vec2 vtexture_coord;\n \nvoid main(void) {\n    gl_Position = vec4(position,0.0,1.0);\n    vtexture_coord = texture_coord;\n}\n";

var fshaderPSrc = "precision mediump float;\n\nuniform sampler2D textureB;\nuniform sampler2D textureG;\nuniform sampler2D textureR;\nuniform sampler2D pallet_color;\nuniform sampler2D textureFont;\nuniform sampler2D textureCharCode;\nuniform sampler2D textureCharAttr;\nuniform float time;\n\nvarying vec2 vtexture_coord;\n\n// グラフィック表示\nvec4 graphicPlane(void)\n{\n  //テクスチャ座標よりビット位置を求め、そのビットが立った2進数値を得る。\n  float t = exp2(floor(mod(vtexture_coord.x * 512.0,8.0)));\n  // RGB各プレーンの現在座標のバイトデータを読み込む\n  vec4 rt = texture2D(textureR, vtexture_coord);\n  vec4 gt = texture2D(textureG, vtexture_coord);\n  vec4 bt = texture2D(textureB, vtexture_coord);\n  \n  // バイトデータの中でビットが立っているかどうかを調べる\n  // Rプレーン\n  float r = floor(mod(min(rt.x * 256.0,255.0) / t,2.0)) * 4.0;\n  // Gプレーン\n  float g = floor(mod(min(gt.x * 256.0,255.0) / t,2.0)) * 2.0;\n  // Bプレーン\n  float b = floor(mod(min(bt.x * 256.0,255.0) / t,2.0));\n\n  // 各色の値を足して正規化を行い、パレットインデックスから実際の色を得る \n  vec4 p = texture2D(pallet_color,vec2((r + g + b) / 8.0 ,0.5));\n  float i = min(p.x * 256.0,255.0);\n  float ar = floor(mod(i * 0.5,2.0)); // bit3\n  float ag = floor(mod(i * 0.25,2.0));  // bit2\n  float ab = floor(mod(i,2.0)); // bit1\n  return vec4(ar,ag,ab,1.0);\n}\n\n// 文字表示\nvec4 textPlane(void){\n  // キャラクタコードを読み出し\n  vec4 cct = texture2D(textureCharCode, vtexture_coord);\n  float cc = min(cct.x * 256.0,255.0);// キャラクターコード\n\n  // アトリビュートを読み出し\n  vec4 attrt = texture2D(textureCharAttr, vtexture_coord);\n  \n  // 表示対象の文字のビット位置を求める\n  float x = exp2(floor(mod(vtexture_coord.x * 512.0,8.0)));\n  // 表示対象の文字のY位置を求める\n  float y = floor(mod(vtexture_coord.y * 256.0,8.0));\n  \n  // アトリビュートの評価 \n\n  float i = min(attrt.x * 256.0,255.0);// アトリビュートデータ\n  \n  // キャラクタセット(0.0 .. セット0, 1.0 .. セット1 )\n  float att = floor(mod(i / 128.0,2.0)) * 8.0;// bit 7\n\n  // 文字色\n  float ccg = floor(mod(i / 64.0,2.0));// bit 6\n  float ccr = floor(mod(i / 32.0,2.0));// bit 5\n  float ccb = floor(mod(i / 16.0,2.0));// bit 4\n\n  // 背景色\n  float bgg = floor(mod(i / 4.0,2.0));// bit 2\n  float bgr = floor(mod(i / 2.0,2.0));// bit 1\n  float bgb = floor(mod(i ,2.0));// bit 0\n  \n\n  // フォント読み出し位置\n  vec2 fontpos = vec2(cc / 256.0,(y + att) / 16.0);\n  // フォントデータの読み出し\n  vec4 pixByte = texture2D(textureFont,fontpos);\n  // 指定位置のビットが立っているかチェック\n  float pixBit = floor(mod(min(pixByte.x * 256.0,255.0) / x,2.0));\n  \n  if(pixBit == 1.0){\n    // ビットが立っているときは、文字色を設定\n    return vec4(ccr,ccg,ccb,1.0);\n  } \n  // ビットが立っていないときは背景色を設定\n  return vec4(bgr,bgb,bgg,1.0);\n}\n\nvoid main(void){\n  vec4 textColor = textPlane();\n  if((textColor.r + textColor.g + textColor.b) > 0.0){\n    gl_FragColor = textColor;  \n  } else {\n    vec4 color = graphicPlane();\n    gl_FragColor = color;\n  }\n}\n";
// `precision mediump float;

// uniform sampler2D tex;
// uniform sampler2D pallet_color;

// varying vec2 vtexture_coord;

// void main(void){
//  vec4 sampcolor = texture2D(tex, vtexture_coord);
//  vec4 color = texture2D(pallet_color,vec2(sampcolor.x * 32.0,0.5));
//  gl_FragColor = color;
// }
// `;

window.addEventListener('load', function () {
  // コンソールの作成
  var view = document.getElementById('view');
  var gl;
  var width, height;
  var virtualWidth = 320,
      virtualHeight = 240;
  var bufferWidth = 512,
      bufferHeight = 256,
      bufferXSize = bufferWidth / 8;
  var fontTexWidth = 256,
      fontTexHeight = 16; //8 * 16 * 2;
  var charCodeBufferWidth = 512 / 8,
      charCodeBufferHeight = 32;
  var runBtn = document.getElementById('run'),
      pauseBtn = document.getElementById('pause'),
      stopBtn = document.getElementById('stop');
  //      resetBtn = document.getElementById('reset');
  var bufferB = new Uint8Array(bufferXSize * bufferHeight),
      bufferG = new Uint8Array(bufferXSize * bufferHeight),
      bufferR = new Uint8Array(bufferXSize * bufferHeight),
      palletColors = new Uint8Array([0, 1, 2, 3, 4, 5, 6, 7]);
  var charCodeBuffer = new Uint8Array(charCodeBufferWidth * charCodeBufferHeight),
      charAttrBuffer = new Uint8Array(charCodeBufferWidth * charCodeBufferHeight);
  var fontBuffer = new Uint8Array(fontTexWidth * fontTexHeight);

  function rev(x) {
    x = (x & 0x55555555) << 1 | x >>> 1 & 0x55555555;
    x = (x & 0x33333333) << 2 | x >>> 2 & 0x33333333;
    x = (x & 0x0F0F0F0F) << 4 | x >>> 4 & 0x0F0F0F0F;
    x = x << 24 | (x & 0xFF00) << 8 | x >>> 8 & 0xFF00 | x >>> 24;
    return x;
  }

  // フォントデータの読み込み
  {
    (function () {
      var idx = 0;
      var offset = 0;
      _mz700fon.fontData.forEach(function (d, i) {
        offset = (i / 256 | 0) * 8;
        idx = i % 256;
        d.forEach(function (byteChar, iy) {
          var byte = parseInt(byteChar, 2);
          fontBuffer[idx + (iy + offset) * 256] = rev(byte) >>> 24;
        });
      });
    })();
  }

  var main;

  runBtn.disabled = "disabled";
  pauseBtn.disabled = "disabled";
  stopBtn.disabled = "disabled";
  //  resetBtn.disabled = "disabled";

  var STATUS = {
    stop: 0,
    run: 1,
    pause: 2,
    reset: 3
  };

  var status = STATUS.stop;

  // con.width = con.offsetWidth;
  // con.height = (con.offsetWidth * 3 / 4) | 0 ;
  gl = view.getContext('webgl', { antialias: false }) || view.getContext('experimental-webgl', { antialias: false });

  // シェーダの作成
  function createShader(src, shaderType) {
    var shader = void 0;
    shader = gl.createShader(shaderType);
    gl.shaderSource(shader, src);
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      throw new Error(gl.getShaderInfoLog(shader));
    }
    return shader;
  }

  // プログラムオブジェクトの作成
  function createProgram(vs, fs) {
    // プログラムオブジェクトの生成
    var program = gl.createProgram();

    // プログラムオブジェクトにシェーダを割り当てる
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);

    // シェーダをリンク
    gl.linkProgram(program);

    // シェーダのリンクが正しく行なわれたかチェック
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      throw new Error(gl.getProgramInfoLog(program));
    }
    gl.useProgram(program);
    return program;
  }

  //VBOの作成
  function createVbo(data) {
    var vbo = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vbo);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(data), gl.STATIC_DRAW);
    gl.bindBuffer(gl.ARRAY_BUFFER, null);
    return vbo;
  }

  // フレームバッファをオブジェクトとして生成する関数
  function createFramebuffer(width, height) {
    var frameBuffer = gl.createFramebuffer();

    gl.bindFramebuffer(gl.FRAMEBUFFER, frameBuffer);

    var depthRenderBuffer = gl.createRenderbuffer();
    gl.bindRenderbuffer(gl.RENDERBUFFER, depthRenderBuffer);
    gl.renderbufferStorage(gl.RENDERBUFFER, gl.DEPTH_COMPONENT16, width, height);
    gl.framebufferRenderbuffer(gl.FRAMEBUFFER, gl.DEPTH_ATTACHMENT, gl.RENDERBUFFER, depthRenderBuffer);

    var fTexture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, fTexture);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, width, height, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, fTexture, 0);

    gl.bindTexture(gl.TEXTURE_2D, null);
    gl.bindRenderbuffer(gl.RENDERBUFFER, null);
    gl.bindFramebuffer(gl.FRAMEBUFFER, null);

    return { f: frameBuffer, d: depthRenderBuffer, t: fTexture };
  }

  // VBOをバインドし登録する関数
  function setAttribute(vbo, attL, attS) {
    for (var i in vbo) {
      gl.bindBuffer(gl.ARRAY_BUFFER, vbo[i]);
      gl.enableVertexAttribArray(attL[i]);
      gl.vertexAttribPointer(attL[i], attS[i], gl.FLOAT, false, 0, 0);
    }
  }

  // IBOを生成する関数
  function createIbo(data) {
    var ibo = gl.createBuffer();

    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, ibo);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Int16Array(data), gl.STATIC_DRAW);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
    return ibo;
  }

  // 板ポリゴン
  var position = [-1.0, 1.0, 1.0, 1.0, -1.0, -1.0, 1.0, -1.0];

  var texCoord = [0.0, 0.0, virtualWidth / bufferWidth, 0.0, 0.0, virtualHeight / bufferHeight, virtualWidth / bufferWidth, virtualHeight / bufferHeight];

  // var texCoord = [
  // 	0.0, 0.0,
  // 	1.0 , 0.0,
  // 	0.0, 1.0,
  // 	1.0,1.0
  // ]; 
  var index = [0, 2, 1, 2, 3, 1];

  var vPosition = createVbo(position);
  var vTexCoord = createVbo(texCoord);
  var iIndex = createIbo(index);

  // canvasを黒でクリア(初期化)する
  gl.clearColor(0.0, 0.0, 0.0, 1.0);
  gl.viewport(0, 0, virtualWidth, virtualHeight);
  gl.clearDepth(1.0);
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

  var vsP = createShader(vshaderPSrc, gl.VERTEX_SHADER);
  var fsP = createShader(fshaderPSrc, gl.FRAGMENT_SHADER);

  var prgP = createProgram(vsP, fsP);

  var prgPPos = gl.getAttribLocation(prgP, 'position');
  var prgPTexCoord = gl.getAttribLocation(prgP, 'texture_coord');

  var attStride = 4;

  setAttribute([vPosition, vTexCoord], [prgPPos, prgPTexCoord], [2, 2]);
  //setAttribute([vPosition],[prgPPos],[2]);
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, iIndex);

  var prgPTexBPos = gl.getUniformLocation(prgP, 'textureB');
  var prgPTexGPos = gl.getUniformLocation(prgP, 'textureG');
  var prgPTexRPos = gl.getUniformLocation(prgP, 'textureR');
  var prgPPalettPos = gl.getUniformLocation(prgP, 'pallet_color');
  var prgPTexFont = gl.getUniformLocation(prgP, 'textureFont');
  var prgPTexCharCode = gl.getUniformLocation(prgP, 'textureCharCode');
  var prgPTexCharAttr = gl.getUniformLocation(prgP, 'textureCharAttr');
  var prgPTime = gl.getUniformLocation(prgP, 'time');

  // 仮想ビットマップテクスチャを作る
  var textureB = gl.createTexture();
  gl.activeTexture(gl.TEXTURE0);
  gl.bindTexture(gl.TEXTURE_2D, textureB);
  //	gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.LUMINANCE, bufferXSize, bufferHeight, 0, gl.LUMINANCE, gl.UNSIGNED_BYTE, bufferB);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

  var textureG = gl.createTexture();
  gl.activeTexture(gl.TEXTURE1);
  gl.bindTexture(gl.TEXTURE_2D, textureG);
  //	gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.LUMINANCE, bufferXSize, bufferHeight, 0, gl.LUMINANCE, gl.UNSIGNED_BYTE, bufferG);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

  var textureR = gl.createTexture();
  gl.activeTexture(gl.TEXTURE2);
  gl.bindTexture(gl.TEXTURE_2D, textureR);
  //	gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.LUMINANCE, bufferXSize, bufferHeight, 0, gl.LUMINANCE, gl.UNSIGNED_BYTE, bufferR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

  var paletteTexture = gl.createTexture();
  gl.activeTexture(gl.TEXTURE3);
  gl.bindTexture(gl.TEXTURE_2D, paletteTexture);
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.LUMINANCE, palletColors.length, 1, 0, gl.LUMINANCE, gl.UNSIGNED_BYTE, palletColors);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

  var fontTexture = gl.createTexture();
  gl.activeTexture(gl.TEXTURE4);
  gl.bindTexture(gl.TEXTURE_2D, fontTexture);
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.LUMINANCE, fontTexWidth, fontTexHeight, 0, gl.LUMINANCE, gl.UNSIGNED_BYTE, fontBuffer);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

  var charCodeTexture = gl.createTexture();
  gl.activeTexture(gl.TEXTURE5);
  gl.bindTexture(gl.TEXTURE_2D, charCodeTexture);
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.LUMINANCE, charCodeBufferWidth, charCodeBufferHeight, 0, gl.LUMINANCE, gl.UNSIGNED_BYTE, charCodeBuffer);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

  var charAttrTexture = gl.createTexture();
  gl.activeTexture(gl.TEXTURE6);
  gl.bindTexture(gl.TEXTURE_2D, charAttrTexture);
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.LUMINANCE, charCodeBufferWidth, charCodeBufferHeight, 0, gl.LUMINANCE, gl.UNSIGNED_BYTE, charAttrBuffer);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

  gl.uniform1i(prgPTexBPos, 0);
  gl.uniform1i(prgPTexGPos, 1);
  gl.uniform1i(prgPTexRPos, 2);
  gl.uniform1i(prgPPalettPos, 3);
  gl.uniform1i(prgPTexFont, 4);
  gl.uniform1i(prgPTexCharCode, 5);
  gl.uniform1i(prgPTexCharAttr, 6);

  function resize() {
    var cont = document.getElementById('content');
    if (cont.offsetWidth > 700) {
      view.width = virtualWidth * 2; //cont.offsetWidth;
      view.height = virtualHeight * 2; //cont.offsetWidth * 3 / 4;
    } else {
        view.width = virtualWidth;
        view.height = virtualHeight;
      }
    width = view.offsetWidth;
    height = view.offsetHeight;

    gl.viewport(0, 0, width, height);

    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);
  }
  resize();
  window.addEventListener('resize', resize);

  // レンダリング
  function render() {
    requestAnimationFrame(render);
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, textureB);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.LUMINANCE, bufferXSize, bufferHeight, 0, gl.LUMINANCE, gl.UNSIGNED_BYTE, bufferB);

    gl.activeTexture(gl.TEXTURE1);
    gl.bindTexture(gl.TEXTURE_2D, textureG);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.LUMINANCE, bufferXSize, bufferHeight, 0, gl.LUMINANCE, gl.UNSIGNED_BYTE, bufferG);

    gl.activeTexture(gl.TEXTURE2);
    gl.bindTexture(gl.TEXTURE_2D, textureR);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.LUMINANCE, bufferXSize, bufferHeight, 0, gl.LUMINANCE, gl.UNSIGNED_BYTE, bufferR);

    gl.activeTexture(gl.TEXTURE3);
    gl.bindTexture(gl.TEXTURE_2D, paletteTexture);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.LUMINANCE, palletColors.length, 1, 0, gl.LUMINANCE, gl.UNSIGNED_BYTE, palletColors);

    gl.activeTexture(gl.TEXTURE4);
    gl.bindTexture(gl.TEXTURE_2D, fontTexture);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.LUMINANCE, fontTexWidth, fontTexHeight, 0, gl.LUMINANCE, gl.UNSIGNED_BYTE, fontBuffer);

    gl.activeTexture(gl.TEXTURE5);
    gl.bindTexture(gl.TEXTURE_2D, charCodeTexture);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.LUMINANCE, charCodeBufferWidth, charCodeBufferHeight, 0, gl.LUMINANCE, gl.UNSIGNED_BYTE, charCodeBuffer);

    gl.activeTexture(gl.TEXTURE6);
    gl.bindTexture(gl.TEXTURE_2D, charAttrTexture);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.LUMINANCE, charCodeBufferWidth, charCodeBufferHeight, 0, gl.LUMINANCE, gl.UNSIGNED_BYTE, charAttrBuffer);

    gl.drawElements(gl.TRIANGLES, index.length, gl.UNSIGNED_SHORT, 0);
    gl.flush();
    if (status == STATUS.run) {
      main && main();
    }
  }

  function updateStatus(s) {
    status = s;
    switch (s) {
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

  function pset(x, y, color) {
    var offset = y * bufferXSize + x / 8 | 0;
    var bitpos = x % 8;

    var b = (color & 1) << bitpos;
    var m = ~(1 << bitpos) & 0xff;
    var g = (color >>> 1 & 1) << bitpos;
    var r = (color >>> 2 & 1) << bitpos;

    bufferB[offset] = bufferB[offset] & m | b;
    bufferG[offset] = bufferG[offset] & m | g;
    bufferR[offset] = bufferR[offset] & m | r;
  }

  function preset(x, y) {
    var offset = y * bufferXSize + x / 8 | 0;
    var bit = ~(1 << x % 8);
    bufferB[offset] &= bit;
    bufferG[offset] &= bit;
    bufferR[offset] &= bit;
  }

  function cls() {
    for (var i = 0, e = bufferXSize * bufferHeight; i < e; ++i) {
      bufferB[i] = 0;
      bufferG[i] = 0;
      bufferR[i] = 0;
    }
  }

  // メイン
  function run() {
    var gen = regeneratorRuntime.mark(function _callee() {
      var y, x, t, p, i, color, _i, _y, _x, _i2;

      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (!true) {
                _context.next = 47;
                break;
              }

              cls();
              palletColors.set([0, 1, 2, 3, 4, 5, 6, 7]);
              y = 0;

            case 4:
              if (!(y < virtualHeight)) {
                _context.next = 11;
                break;
              }

              for (x = 0; x < virtualWidth; ++x) {
                if (((y / 8 | 0) & 1) > 0) {
                  if (x % 16 < 8) {
                    pset(x, y, y % 8);
                  } else {
                    pset(x, y, x % 8);
                  }
                } else {
                  if (x % 16 >= 8) {
                    pset(x, y, 7 - y % 8);
                  } else {
                    pset(x, y, 7 - x % 8);
                  }
                }
              }
              _context.next = 8;
              return;

            case 8:
              ++y;
              _context.next = 4;
              break;

            case 11:
              t = 0;

            case 12:
              if (!(t < 128)) {
                _context.next = 23;
                break;
              }

              p = palletColors[0];

              for (i = 0; i < 7; ++i) {
                palletColors[i] = palletColors[i + 1];
              }
              palletColors[7] = p;
              _context.next = 18;
              return;

            case 18:
              _context.next = 20;
              return;

            case 20:
              ++t;
              _context.next = 12;
              break;

            case 23:
              color = 0;

            case 24:
              if (!(color < 8)) {
                _context.next = 37;
                break;
              }

              _i = 0x0;
              _y = 0;

            case 27:
              if (!(_y < 16)) {
                _context.next = 34;
                break;
              }

              for (_x = 0; _x < 16; ++_x) {
                charCodeBuffer[_x + _y * charCodeBufferWidth] = _i % 256;
                charAttrBuffer[_x + _y * charCodeBufferWidth] = color << 4 | 7 - color;
                charCodeBuffer[_x + 16 + _y * charCodeBufferWidth] = _i % 256;
                charAttrBuffer[_x + 16 + _y * charCodeBufferWidth] = 0x80 | color << 4 | 7 - color;
                ++_i;
              }
              _context.next = 31;
              return;

            case 31:
              ++_y;
              _context.next = 27;
              break;

            case 34:
              ++color;
              _context.next = 24;
              break;

            case 37:

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
              cls();
              _i2 = 0;

            case 39:
              if (!(_i2 < 128)) {
                _context.next = 45;
                break;
              }

              _context.next = 42;
              return;

            case 42:
              ++_i2;
              _context.next = 39;
              break;

            case 45:
              _context.next = 0;
              break;

            case 47:
              updateStatus(STATUS.stop);

            case 48:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, this);
    })();
    main = gen.next.bind(gen);
  }

  runBtn.addEventListener('click', function () {
    updateStatus(STATUS.run);
    run();
  });

  pauseBtn.addEventListener('click', function () {
    if (status == STATUS.pause) {
      updateStatus(STATUS.run);
    } else {
      updateStatus(STATUS.pause);
    }
  });

  stopBtn.addEventListener('click', function () {
    updateStatus(STATUS.stop);
  });

  // resetBtn.addEventListener('click',()=>{
  //   updateStatus(STATUS.reset);
  // });

  updateStatus(STATUS.stop);
  render();
});

},{"./mz700fon":291,"babel-polyfill":1}]},{},[292])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJub2RlX21vZHVsZXMvYmFiZWwtcG9seWZpbGwvbGliL2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsLXBvbHlmaWxsL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ZuL3JlZ2V4cC9lc2NhcGUuanMiLCJub2RlX21vZHVsZXMvYmFiZWwtcG9seWZpbGwvbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9fYS1mdW5jdGlvbi5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC1wb2x5ZmlsbC9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL19hLW51bWJlci12YWx1ZS5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC1wb2x5ZmlsbC9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL19hZGQtdG8tdW5zY29wYWJsZXMuanMiLCJub2RlX21vZHVsZXMvYmFiZWwtcG9seWZpbGwvbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9fYW4taW5zdGFuY2UuanMiLCJub2RlX21vZHVsZXMvYmFiZWwtcG9seWZpbGwvbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9fYW4tb2JqZWN0LmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsLXBvbHlmaWxsL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX2FycmF5LWNvcHktd2l0aGluLmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsLXBvbHlmaWxsL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX2FycmF5LWZpbGwuanMiLCJub2RlX21vZHVsZXMvYmFiZWwtcG9seWZpbGwvbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9fYXJyYXktZnJvbS1pdGVyYWJsZS5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC1wb2x5ZmlsbC9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL19hcnJheS1pbmNsdWRlcy5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC1wb2x5ZmlsbC9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL19hcnJheS1tZXRob2RzLmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsLXBvbHlmaWxsL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX2FycmF5LXJlZHVjZS5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC1wb2x5ZmlsbC9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL19hcnJheS1zcGVjaWVzLWNyZWF0ZS5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC1wb2x5ZmlsbC9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL19iaW5kLmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsLXBvbHlmaWxsL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX2NsYXNzb2YuanMiLCJub2RlX21vZHVsZXMvYmFiZWwtcG9seWZpbGwvbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9fY29mLmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsLXBvbHlmaWxsL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX2NvbGxlY3Rpb24tc3Ryb25nLmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsLXBvbHlmaWxsL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX2NvbGxlY3Rpb24tdG8tanNvbi5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC1wb2x5ZmlsbC9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL19jb2xsZWN0aW9uLXdlYWsuanMiLCJub2RlX21vZHVsZXMvYmFiZWwtcG9seWZpbGwvbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9fY29sbGVjdGlvbi5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC1wb2x5ZmlsbC9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL19jb3JlLmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsLXBvbHlmaWxsL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX2N0eC5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC1wb2x5ZmlsbC9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL19kYXRlLXRvLXByaW1pdGl2ZS5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC1wb2x5ZmlsbC9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL19kZWZpbmVkLmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsLXBvbHlmaWxsL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX2Rlc2NyaXB0b3JzLmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsLXBvbHlmaWxsL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX2RvbS1jcmVhdGUuanMiLCJub2RlX21vZHVsZXMvYmFiZWwtcG9seWZpbGwvbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9fZW51bS1idWcta2V5cy5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC1wb2x5ZmlsbC9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL19lbnVtLWtleXMuanMiLCJub2RlX21vZHVsZXMvYmFiZWwtcG9seWZpbGwvbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9fZXhwb3J0LmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsLXBvbHlmaWxsL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX2ZhaWxzLWlzLXJlZ2V4cC5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC1wb2x5ZmlsbC9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL19mYWlscy5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC1wb2x5ZmlsbC9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL19maXgtcmUtd2tzLmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsLXBvbHlmaWxsL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX2ZsYWdzLmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsLXBvbHlmaWxsL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX2Zvci1vZi5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC1wb2x5ZmlsbC9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL19nbG9iYWwuanMiLCJub2RlX21vZHVsZXMvYmFiZWwtcG9seWZpbGwvbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9faGFzLmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsLXBvbHlmaWxsL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX2hpZGUuanMiLCJub2RlX21vZHVsZXMvYmFiZWwtcG9seWZpbGwvbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9faHRtbC5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC1wb2x5ZmlsbC9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL19pZTgtZG9tLWRlZmluZS5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC1wb2x5ZmlsbC9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL19pbmhlcml0LWlmLXJlcXVpcmVkLmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsLXBvbHlmaWxsL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX2ludm9rZS5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC1wb2x5ZmlsbC9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL19pb2JqZWN0LmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsLXBvbHlmaWxsL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX2lzLWFycmF5LWl0ZXIuanMiLCJub2RlX21vZHVsZXMvYmFiZWwtcG9seWZpbGwvbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9faXMtYXJyYXkuanMiLCJub2RlX21vZHVsZXMvYmFiZWwtcG9seWZpbGwvbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9faXMtaW50ZWdlci5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC1wb2x5ZmlsbC9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL19pcy1vYmplY3QuanMiLCJub2RlX21vZHVsZXMvYmFiZWwtcG9seWZpbGwvbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9faXMtcmVnZXhwLmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsLXBvbHlmaWxsL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX2l0ZXItY2FsbC5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC1wb2x5ZmlsbC9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL19pdGVyLWNyZWF0ZS5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC1wb2x5ZmlsbC9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL19pdGVyLWRlZmluZS5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC1wb2x5ZmlsbC9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL19pdGVyLWRldGVjdC5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC1wb2x5ZmlsbC9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL19pdGVyLXN0ZXAuanMiLCJub2RlX21vZHVsZXMvYmFiZWwtcG9seWZpbGwvbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9faXRlcmF0b3JzLmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsLXBvbHlmaWxsL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX2tleW9mLmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsLXBvbHlmaWxsL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX2xpYnJhcnkuanMiLCJub2RlX21vZHVsZXMvYmFiZWwtcG9seWZpbGwvbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9fbWF0aC1leHBtMS5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC1wb2x5ZmlsbC9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL19tYXRoLWxvZzFwLmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsLXBvbHlmaWxsL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX21hdGgtc2lnbi5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC1wb2x5ZmlsbC9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL19tZXRhLmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsLXBvbHlmaWxsL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX21ldGFkYXRhLmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsLXBvbHlmaWxsL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX21pY3JvdGFzay5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC1wb2x5ZmlsbC9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL19vYmplY3QtYXNzaWduLmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsLXBvbHlmaWxsL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX29iamVjdC1jcmVhdGUuanMiLCJub2RlX21vZHVsZXMvYmFiZWwtcG9seWZpbGwvbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9fb2JqZWN0LWRwLmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsLXBvbHlmaWxsL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX29iamVjdC1kcHMuanMiLCJub2RlX21vZHVsZXMvYmFiZWwtcG9seWZpbGwvbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9fb2JqZWN0LWZvcmNlZC1wYW0uanMiLCJub2RlX21vZHVsZXMvYmFiZWwtcG9seWZpbGwvbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9fb2JqZWN0LWdvcGQuanMiLCJub2RlX21vZHVsZXMvYmFiZWwtcG9seWZpbGwvbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9fb2JqZWN0LWdvcG4tZXh0LmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsLXBvbHlmaWxsL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX29iamVjdC1nb3BuLmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsLXBvbHlmaWxsL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX29iamVjdC1nb3BzLmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsLXBvbHlmaWxsL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX29iamVjdC1ncG8uanMiLCJub2RlX21vZHVsZXMvYmFiZWwtcG9seWZpbGwvbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9fb2JqZWN0LWtleXMtaW50ZXJuYWwuanMiLCJub2RlX21vZHVsZXMvYmFiZWwtcG9seWZpbGwvbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9fb2JqZWN0LWtleXMuanMiLCJub2RlX21vZHVsZXMvYmFiZWwtcG9seWZpbGwvbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9fb2JqZWN0LXBpZS5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC1wb2x5ZmlsbC9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL19vYmplY3Qtc2FwLmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsLXBvbHlmaWxsL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX29iamVjdC10by1hcnJheS5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC1wb2x5ZmlsbC9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL19vd24ta2V5cy5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC1wb2x5ZmlsbC9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL19wYXJzZS1mbG9hdC5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC1wb2x5ZmlsbC9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL19wYXJzZS1pbnQuanMiLCJub2RlX21vZHVsZXMvYmFiZWwtcG9seWZpbGwvbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9fcGFydGlhbC5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC1wb2x5ZmlsbC9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL19wYXRoLmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsLXBvbHlmaWxsL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX3Byb3BlcnR5LWRlc2MuanMiLCJub2RlX21vZHVsZXMvYmFiZWwtcG9seWZpbGwvbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9fcmVkZWZpbmUtYWxsLmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsLXBvbHlmaWxsL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX3JlZGVmaW5lLmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsLXBvbHlmaWxsL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX3JlcGxhY2VyLmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsLXBvbHlmaWxsL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX3NhbWUtdmFsdWUuanMiLCJub2RlX21vZHVsZXMvYmFiZWwtcG9seWZpbGwvbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9fc2V0LXByb3RvLmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsLXBvbHlmaWxsL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX3NldC1zcGVjaWVzLmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsLXBvbHlmaWxsL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX3NldC10by1zdHJpbmctdGFnLmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsLXBvbHlmaWxsL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX3NoYXJlZC1rZXkuanMiLCJub2RlX21vZHVsZXMvYmFiZWwtcG9seWZpbGwvbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9fc2hhcmVkLmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsLXBvbHlmaWxsL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX3NwZWNpZXMtY29uc3RydWN0b3IuanMiLCJub2RlX21vZHVsZXMvYmFiZWwtcG9seWZpbGwvbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9fc3RyaWN0LW1ldGhvZC5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC1wb2x5ZmlsbC9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL19zdHJpbmctYXQuanMiLCJub2RlX21vZHVsZXMvYmFiZWwtcG9seWZpbGwvbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9fc3RyaW5nLWNvbnRleHQuanMiLCJub2RlX21vZHVsZXMvYmFiZWwtcG9seWZpbGwvbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9fc3RyaW5nLWh0bWwuanMiLCJub2RlX21vZHVsZXMvYmFiZWwtcG9seWZpbGwvbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9fc3RyaW5nLXBhZC5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC1wb2x5ZmlsbC9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL19zdHJpbmctcmVwZWF0LmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsLXBvbHlmaWxsL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX3N0cmluZy10cmltLmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsLXBvbHlmaWxsL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX3N0cmluZy13cy5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC1wb2x5ZmlsbC9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL190YXNrLmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsLXBvbHlmaWxsL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX3RvLWluZGV4LmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsLXBvbHlmaWxsL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX3RvLWludGVnZXIuanMiLCJub2RlX21vZHVsZXMvYmFiZWwtcG9seWZpbGwvbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9fdG8taW9iamVjdC5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC1wb2x5ZmlsbC9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL190by1sZW5ndGguanMiLCJub2RlX21vZHVsZXMvYmFiZWwtcG9seWZpbGwvbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9fdG8tb2JqZWN0LmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsLXBvbHlmaWxsL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX3RvLXByaW1pdGl2ZS5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC1wb2x5ZmlsbC9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL190eXBlZC1hcnJheS5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC1wb2x5ZmlsbC9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL190eXBlZC1idWZmZXIuanMiLCJub2RlX21vZHVsZXMvYmFiZWwtcG9seWZpbGwvbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9fdHlwZWQuanMiLCJub2RlX21vZHVsZXMvYmFiZWwtcG9seWZpbGwvbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9fdWlkLmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsLXBvbHlmaWxsL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX3drcy5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC1wb2x5ZmlsbC9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2NvcmUuZ2V0LWl0ZXJhdG9yLW1ldGhvZC5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC1wb2x5ZmlsbC9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2NvcmUuaXMtaXRlcmFibGUuanMiLCJub2RlX21vZHVsZXMvYmFiZWwtcG9seWZpbGwvbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9jb3JlLnJlZ2V4cC5lc2NhcGUuanMiLCJub2RlX21vZHVsZXMvYmFiZWwtcG9seWZpbGwvbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lczYuYXJyYXkuY29weS13aXRoaW4uanMiLCJub2RlX21vZHVsZXMvYmFiZWwtcG9seWZpbGwvbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lczYuYXJyYXkuZXZlcnkuanMiLCJub2RlX21vZHVsZXMvYmFiZWwtcG9seWZpbGwvbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lczYuYXJyYXkuZmlsbC5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC1wb2x5ZmlsbC9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzNi5hcnJheS5maWx0ZXIuanMiLCJub2RlX21vZHVsZXMvYmFiZWwtcG9seWZpbGwvbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lczYuYXJyYXkuZmluZC1pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC1wb2x5ZmlsbC9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzNi5hcnJheS5maW5kLmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsLXBvbHlmaWxsL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXM2LmFycmF5LmZvci1lYWNoLmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsLXBvbHlmaWxsL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXM2LmFycmF5LmZyb20uanMiLCJub2RlX21vZHVsZXMvYmFiZWwtcG9seWZpbGwvbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lczYuYXJyYXkuaW5kZXgtb2YuanMiLCJub2RlX21vZHVsZXMvYmFiZWwtcG9seWZpbGwvbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lczYuYXJyYXkuaXMtYXJyYXkuanMiLCJub2RlX21vZHVsZXMvYmFiZWwtcG9seWZpbGwvbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lczYuYXJyYXkuaXRlcmF0b3IuanMiLCJub2RlX21vZHVsZXMvYmFiZWwtcG9seWZpbGwvbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lczYuYXJyYXkuam9pbi5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC1wb2x5ZmlsbC9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzNi5hcnJheS5sYXN0LWluZGV4LW9mLmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsLXBvbHlmaWxsL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXM2LmFycmF5Lm1hcC5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC1wb2x5ZmlsbC9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzNi5hcnJheS5vZi5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC1wb2x5ZmlsbC9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzNi5hcnJheS5yZWR1Y2UtcmlnaHQuanMiLCJub2RlX21vZHVsZXMvYmFiZWwtcG9seWZpbGwvbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lczYuYXJyYXkucmVkdWNlLmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsLXBvbHlmaWxsL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXM2LmFycmF5LnNsaWNlLmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsLXBvbHlmaWxsL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXM2LmFycmF5LnNvbWUuanMiLCJub2RlX21vZHVsZXMvYmFiZWwtcG9seWZpbGwvbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lczYuYXJyYXkuc29ydC5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC1wb2x5ZmlsbC9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzNi5hcnJheS5zcGVjaWVzLmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsLXBvbHlmaWxsL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXM2LmRhdGUubm93LmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsLXBvbHlmaWxsL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXM2LmRhdGUudG8taXNvLXN0cmluZy5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC1wb2x5ZmlsbC9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzNi5kYXRlLnRvLWpzb24uanMiLCJub2RlX21vZHVsZXMvYmFiZWwtcG9seWZpbGwvbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lczYuZGF0ZS50by1wcmltaXRpdmUuanMiLCJub2RlX21vZHVsZXMvYmFiZWwtcG9seWZpbGwvbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lczYuZGF0ZS50by1zdHJpbmcuanMiLCJub2RlX21vZHVsZXMvYmFiZWwtcG9seWZpbGwvbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lczYuZnVuY3Rpb24uYmluZC5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC1wb2x5ZmlsbC9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzNi5mdW5jdGlvbi5oYXMtaW5zdGFuY2UuanMiLCJub2RlX21vZHVsZXMvYmFiZWwtcG9seWZpbGwvbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lczYuZnVuY3Rpb24ubmFtZS5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC1wb2x5ZmlsbC9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzNi5tYXAuanMiLCJub2RlX21vZHVsZXMvYmFiZWwtcG9seWZpbGwvbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lczYubWF0aC5hY29zaC5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC1wb2x5ZmlsbC9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzNi5tYXRoLmFzaW5oLmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsLXBvbHlmaWxsL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXM2Lm1hdGguYXRhbmguanMiLCJub2RlX21vZHVsZXMvYmFiZWwtcG9seWZpbGwvbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lczYubWF0aC5jYnJ0LmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsLXBvbHlmaWxsL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXM2Lm1hdGguY2x6MzIuanMiLCJub2RlX21vZHVsZXMvYmFiZWwtcG9seWZpbGwvbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lczYubWF0aC5jb3NoLmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsLXBvbHlmaWxsL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXM2Lm1hdGguZXhwbTEuanMiLCJub2RlX21vZHVsZXMvYmFiZWwtcG9seWZpbGwvbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lczYubWF0aC5mcm91bmQuanMiLCJub2RlX21vZHVsZXMvYmFiZWwtcG9seWZpbGwvbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lczYubWF0aC5oeXBvdC5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC1wb2x5ZmlsbC9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzNi5tYXRoLmltdWwuanMiLCJub2RlX21vZHVsZXMvYmFiZWwtcG9seWZpbGwvbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lczYubWF0aC5sb2cxMC5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC1wb2x5ZmlsbC9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzNi5tYXRoLmxvZzFwLmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsLXBvbHlmaWxsL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXM2Lm1hdGgubG9nMi5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC1wb2x5ZmlsbC9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzNi5tYXRoLnNpZ24uanMiLCJub2RlX21vZHVsZXMvYmFiZWwtcG9seWZpbGwvbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lczYubWF0aC5zaW5oLmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsLXBvbHlmaWxsL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXM2Lm1hdGgudGFuaC5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC1wb2x5ZmlsbC9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzNi5tYXRoLnRydW5jLmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsLXBvbHlmaWxsL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXM2Lm51bWJlci5jb25zdHJ1Y3Rvci5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC1wb2x5ZmlsbC9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzNi5udW1iZXIuZXBzaWxvbi5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC1wb2x5ZmlsbC9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzNi5udW1iZXIuaXMtZmluaXRlLmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsLXBvbHlmaWxsL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXM2Lm51bWJlci5pcy1pbnRlZ2VyLmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsLXBvbHlmaWxsL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXM2Lm51bWJlci5pcy1uYW4uanMiLCJub2RlX21vZHVsZXMvYmFiZWwtcG9seWZpbGwvbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lczYubnVtYmVyLmlzLXNhZmUtaW50ZWdlci5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC1wb2x5ZmlsbC9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzNi5udW1iZXIubWF4LXNhZmUtaW50ZWdlci5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC1wb2x5ZmlsbC9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzNi5udW1iZXIubWluLXNhZmUtaW50ZWdlci5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC1wb2x5ZmlsbC9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzNi5udW1iZXIucGFyc2UtZmxvYXQuanMiLCJub2RlX21vZHVsZXMvYmFiZWwtcG9seWZpbGwvbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lczYubnVtYmVyLnBhcnNlLWludC5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC1wb2x5ZmlsbC9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzNi5udW1iZXIudG8tZml4ZWQuanMiLCJub2RlX21vZHVsZXMvYmFiZWwtcG9seWZpbGwvbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lczYubnVtYmVyLnRvLXByZWNpc2lvbi5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC1wb2x5ZmlsbC9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzNi5vYmplY3QuYXNzaWduLmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsLXBvbHlmaWxsL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXM2Lm9iamVjdC5jcmVhdGUuanMiLCJub2RlX21vZHVsZXMvYmFiZWwtcG9seWZpbGwvbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lczYub2JqZWN0LmRlZmluZS1wcm9wZXJ0aWVzLmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsLXBvbHlmaWxsL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXM2Lm9iamVjdC5kZWZpbmUtcHJvcGVydHkuanMiLCJub2RlX21vZHVsZXMvYmFiZWwtcG9seWZpbGwvbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lczYub2JqZWN0LmZyZWV6ZS5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC1wb2x5ZmlsbC9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzNi5vYmplY3QuZ2V0LW93bi1wcm9wZXJ0eS1kZXNjcmlwdG9yLmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsLXBvbHlmaWxsL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXM2Lm9iamVjdC5nZXQtb3duLXByb3BlcnR5LW5hbWVzLmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsLXBvbHlmaWxsL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXM2Lm9iamVjdC5nZXQtcHJvdG90eXBlLW9mLmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsLXBvbHlmaWxsL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXM2Lm9iamVjdC5pcy1leHRlbnNpYmxlLmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsLXBvbHlmaWxsL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXM2Lm9iamVjdC5pcy1mcm96ZW4uanMiLCJub2RlX21vZHVsZXMvYmFiZWwtcG9seWZpbGwvbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lczYub2JqZWN0LmlzLXNlYWxlZC5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC1wb2x5ZmlsbC9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzNi5vYmplY3QuaXMuanMiLCJub2RlX21vZHVsZXMvYmFiZWwtcG9seWZpbGwvbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lczYub2JqZWN0LmtleXMuanMiLCJub2RlX21vZHVsZXMvYmFiZWwtcG9seWZpbGwvbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lczYub2JqZWN0LnByZXZlbnQtZXh0ZW5zaW9ucy5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC1wb2x5ZmlsbC9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzNi5vYmplY3Quc2VhbC5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC1wb2x5ZmlsbC9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzNi5vYmplY3Quc2V0LXByb3RvdHlwZS1vZi5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC1wb2x5ZmlsbC9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzNi5vYmplY3QudG8tc3RyaW5nLmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsLXBvbHlmaWxsL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXM2LnBhcnNlLWZsb2F0LmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsLXBvbHlmaWxsL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXM2LnBhcnNlLWludC5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC1wb2x5ZmlsbC9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzNi5wcm9taXNlLmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsLXBvbHlmaWxsL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXM2LnJlZmxlY3QuYXBwbHkuanMiLCJub2RlX21vZHVsZXMvYmFiZWwtcG9seWZpbGwvbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lczYucmVmbGVjdC5jb25zdHJ1Y3QuanMiLCJub2RlX21vZHVsZXMvYmFiZWwtcG9seWZpbGwvbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lczYucmVmbGVjdC5kZWZpbmUtcHJvcGVydHkuanMiLCJub2RlX21vZHVsZXMvYmFiZWwtcG9seWZpbGwvbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lczYucmVmbGVjdC5kZWxldGUtcHJvcGVydHkuanMiLCJub2RlX21vZHVsZXMvYmFiZWwtcG9seWZpbGwvbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lczYucmVmbGVjdC5lbnVtZXJhdGUuanMiLCJub2RlX21vZHVsZXMvYmFiZWwtcG9seWZpbGwvbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lczYucmVmbGVjdC5nZXQtb3duLXByb3BlcnR5LWRlc2NyaXB0b3IuanMiLCJub2RlX21vZHVsZXMvYmFiZWwtcG9seWZpbGwvbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lczYucmVmbGVjdC5nZXQtcHJvdG90eXBlLW9mLmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsLXBvbHlmaWxsL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXM2LnJlZmxlY3QuZ2V0LmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsLXBvbHlmaWxsL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXM2LnJlZmxlY3QuaGFzLmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsLXBvbHlmaWxsL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXM2LnJlZmxlY3QuaXMtZXh0ZW5zaWJsZS5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC1wb2x5ZmlsbC9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzNi5yZWZsZWN0Lm93bi1rZXlzLmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsLXBvbHlmaWxsL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXM2LnJlZmxlY3QucHJldmVudC1leHRlbnNpb25zLmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsLXBvbHlmaWxsL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXM2LnJlZmxlY3Quc2V0LXByb3RvdHlwZS1vZi5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC1wb2x5ZmlsbC9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzNi5yZWZsZWN0LnNldC5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC1wb2x5ZmlsbC9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzNi5yZWdleHAuY29uc3RydWN0b3IuanMiLCJub2RlX21vZHVsZXMvYmFiZWwtcG9seWZpbGwvbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lczYucmVnZXhwLmZsYWdzLmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsLXBvbHlmaWxsL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXM2LnJlZ2V4cC5tYXRjaC5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC1wb2x5ZmlsbC9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzNi5yZWdleHAucmVwbGFjZS5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC1wb2x5ZmlsbC9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzNi5yZWdleHAuc2VhcmNoLmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsLXBvbHlmaWxsL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXM2LnJlZ2V4cC5zcGxpdC5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC1wb2x5ZmlsbC9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzNi5yZWdleHAudG8tc3RyaW5nLmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsLXBvbHlmaWxsL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXM2LnNldC5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC1wb2x5ZmlsbC9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzNi5zdHJpbmcuYW5jaG9yLmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsLXBvbHlmaWxsL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXM2LnN0cmluZy5iaWcuanMiLCJub2RlX21vZHVsZXMvYmFiZWwtcG9seWZpbGwvbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lczYuc3RyaW5nLmJsaW5rLmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsLXBvbHlmaWxsL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXM2LnN0cmluZy5ib2xkLmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsLXBvbHlmaWxsL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXM2LnN0cmluZy5jb2RlLXBvaW50LWF0LmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsLXBvbHlmaWxsL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXM2LnN0cmluZy5lbmRzLXdpdGguanMiLCJub2RlX21vZHVsZXMvYmFiZWwtcG9seWZpbGwvbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lczYuc3RyaW5nLmZpeGVkLmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsLXBvbHlmaWxsL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXM2LnN0cmluZy5mb250Y29sb3IuanMiLCJub2RlX21vZHVsZXMvYmFiZWwtcG9seWZpbGwvbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lczYuc3RyaW5nLmZvbnRzaXplLmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsLXBvbHlmaWxsL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXM2LnN0cmluZy5mcm9tLWNvZGUtcG9pbnQuanMiLCJub2RlX21vZHVsZXMvYmFiZWwtcG9seWZpbGwvbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lczYuc3RyaW5nLmluY2x1ZGVzLmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsLXBvbHlmaWxsL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXM2LnN0cmluZy5pdGFsaWNzLmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsLXBvbHlmaWxsL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXM2LnN0cmluZy5pdGVyYXRvci5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC1wb2x5ZmlsbC9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzNi5zdHJpbmcubGluay5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC1wb2x5ZmlsbC9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzNi5zdHJpbmcucmF3LmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsLXBvbHlmaWxsL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXM2LnN0cmluZy5yZXBlYXQuanMiLCJub2RlX21vZHVsZXMvYmFiZWwtcG9seWZpbGwvbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lczYuc3RyaW5nLnNtYWxsLmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsLXBvbHlmaWxsL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXM2LnN0cmluZy5zdGFydHMtd2l0aC5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC1wb2x5ZmlsbC9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzNi5zdHJpbmcuc3RyaWtlLmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsLXBvbHlmaWxsL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXM2LnN0cmluZy5zdWIuanMiLCJub2RlX21vZHVsZXMvYmFiZWwtcG9seWZpbGwvbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lczYuc3RyaW5nLnN1cC5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC1wb2x5ZmlsbC9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzNi5zdHJpbmcudHJpbS5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC1wb2x5ZmlsbC9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzNi5zeW1ib2wuanMiLCJub2RlX21vZHVsZXMvYmFiZWwtcG9seWZpbGwvbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lczYudHlwZWQuYXJyYXktYnVmZmVyLmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsLXBvbHlmaWxsL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXM2LnR5cGVkLmRhdGEtdmlldy5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC1wb2x5ZmlsbC9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzNi50eXBlZC5mbG9hdDMyLWFycmF5LmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsLXBvbHlmaWxsL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXM2LnR5cGVkLmZsb2F0NjQtYXJyYXkuanMiLCJub2RlX21vZHVsZXMvYmFiZWwtcG9seWZpbGwvbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lczYudHlwZWQuaW50MTYtYXJyYXkuanMiLCJub2RlX21vZHVsZXMvYmFiZWwtcG9seWZpbGwvbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lczYudHlwZWQuaW50MzItYXJyYXkuanMiLCJub2RlX21vZHVsZXMvYmFiZWwtcG9seWZpbGwvbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lczYudHlwZWQuaW50OC1hcnJheS5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC1wb2x5ZmlsbC9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzNi50eXBlZC51aW50MTYtYXJyYXkuanMiLCJub2RlX21vZHVsZXMvYmFiZWwtcG9seWZpbGwvbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lczYudHlwZWQudWludDMyLWFycmF5LmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsLXBvbHlmaWxsL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXM2LnR5cGVkLnVpbnQ4LWFycmF5LmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsLXBvbHlmaWxsL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXM2LnR5cGVkLnVpbnQ4LWNsYW1wZWQtYXJyYXkuanMiLCJub2RlX21vZHVsZXMvYmFiZWwtcG9seWZpbGwvbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lczYud2Vhay1tYXAuanMiLCJub2RlX21vZHVsZXMvYmFiZWwtcG9seWZpbGwvbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lczYud2Vhay1zZXQuanMiLCJub2RlX21vZHVsZXMvYmFiZWwtcG9seWZpbGwvbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lczcuYXJyYXkuaW5jbHVkZXMuanMiLCJub2RlX21vZHVsZXMvYmFiZWwtcG9seWZpbGwvbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lczcuZXJyb3IuaXMtZXJyb3IuanMiLCJub2RlX21vZHVsZXMvYmFiZWwtcG9seWZpbGwvbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lczcubWFwLnRvLWpzb24uanMiLCJub2RlX21vZHVsZXMvYmFiZWwtcG9seWZpbGwvbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lczcubWF0aC5pYWRkaC5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC1wb2x5ZmlsbC9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzNy5tYXRoLmltdWxoLmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsLXBvbHlmaWxsL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXM3Lm1hdGguaXN1YmguanMiLCJub2RlX21vZHVsZXMvYmFiZWwtcG9seWZpbGwvbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lczcubWF0aC51bXVsaC5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC1wb2x5ZmlsbC9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzNy5vYmplY3QuZGVmaW5lLWdldHRlci5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC1wb2x5ZmlsbC9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzNy5vYmplY3QuZGVmaW5lLXNldHRlci5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC1wb2x5ZmlsbC9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzNy5vYmplY3QuZW50cmllcy5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC1wb2x5ZmlsbC9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzNy5vYmplY3QuZ2V0LW93bi1wcm9wZXJ0eS1kZXNjcmlwdG9ycy5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC1wb2x5ZmlsbC9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzNy5vYmplY3QubG9va3VwLWdldHRlci5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC1wb2x5ZmlsbC9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzNy5vYmplY3QubG9va3VwLXNldHRlci5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC1wb2x5ZmlsbC9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzNy5vYmplY3QudmFsdWVzLmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsLXBvbHlmaWxsL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXM3LnJlZmxlY3QuZGVmaW5lLW1ldGFkYXRhLmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsLXBvbHlmaWxsL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXM3LnJlZmxlY3QuZGVsZXRlLW1ldGFkYXRhLmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsLXBvbHlmaWxsL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXM3LnJlZmxlY3QuZ2V0LW1ldGFkYXRhLWtleXMuanMiLCJub2RlX21vZHVsZXMvYmFiZWwtcG9seWZpbGwvbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lczcucmVmbGVjdC5nZXQtbWV0YWRhdGEuanMiLCJub2RlX21vZHVsZXMvYmFiZWwtcG9seWZpbGwvbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lczcucmVmbGVjdC5nZXQtb3duLW1ldGFkYXRhLWtleXMuanMiLCJub2RlX21vZHVsZXMvYmFiZWwtcG9seWZpbGwvbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lczcucmVmbGVjdC5nZXQtb3duLW1ldGFkYXRhLmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsLXBvbHlmaWxsL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXM3LnJlZmxlY3QuaGFzLW1ldGFkYXRhLmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsLXBvbHlmaWxsL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXM3LnJlZmxlY3QuaGFzLW93bi1tZXRhZGF0YS5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC1wb2x5ZmlsbC9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzNy5yZWZsZWN0Lm1ldGFkYXRhLmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsLXBvbHlmaWxsL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXM3LnNldC50by1qc29uLmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsLXBvbHlmaWxsL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXM3LnN0cmluZy5hdC5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC1wb2x5ZmlsbC9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzNy5zdHJpbmcubWF0Y2gtYWxsLmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsLXBvbHlmaWxsL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXM3LnN0cmluZy5wYWQtZW5kLmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsLXBvbHlmaWxsL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXM3LnN0cmluZy5wYWQtc3RhcnQuanMiLCJub2RlX21vZHVsZXMvYmFiZWwtcG9seWZpbGwvbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lczcuc3RyaW5nLnRyaW0tbGVmdC5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC1wb2x5ZmlsbC9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzNy5zdHJpbmcudHJpbS1yaWdodC5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC1wb2x5ZmlsbC9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzNy5zeXN0ZW0uZ2xvYmFsLmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsLXBvbHlmaWxsL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvd2ViLmRvbS5pdGVyYWJsZS5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC1wb2x5ZmlsbC9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL3dlYi5pbW1lZGlhdGUuanMiLCJub2RlX21vZHVsZXMvYmFiZWwtcG9seWZpbGwvbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy93ZWIudGltZXJzLmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsLXBvbHlmaWxsL25vZGVfbW9kdWxlcy9jb3JlLWpzL3NoaW0uanMiLCJub2RlX21vZHVsZXMvYmFiZWwtcmVnZW5lcmF0b3ItcnVudGltZS9ydW50aW1lLmpzIiwibm9kZV9tb2R1bGVzL3Byb2Nlc3MvYnJvd3Nlci5qcyIsInNyY1xcanNcXG16NzAwZm9uLmpzIiwic3JjXFxqc1xcc2NyaXB0cy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FDL0JBO0FBQ0E7O0FDREE7QUFDQTtBQUNBO0FBQ0E7O0FDSEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNKQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNOQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ0pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDSkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN6QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDUEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3BCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzNDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMzQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDZkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3ZCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3RCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ0pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDOUlBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNSQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2xGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNwRkE7QUFDQTs7QUNEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ25CQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDUkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNKQTtBQUNBO0FBQ0E7QUFDQTs7QUNIQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNOQTtBQUNBO0FBQ0E7QUFDQTs7QUNIQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDZEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDMUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNYQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNOQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMzQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDWkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbEJBO0FBQ0E7QUFDQTtBQUNBOztBQ0hBO0FBQ0E7QUFDQTtBQUNBOztBQ0hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDUEE7O0FDQUE7QUFDQTtBQUNBOztBQ0ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDUEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDZkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNKQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1BBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDSkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ0xBO0FBQ0E7QUFDQTs7QUNGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1BBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNYQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNaQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNyRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3BCQTtBQUNBO0FBQ0E7O0FDRkE7O0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDVEE7O0FDQUE7QUFDQTtBQUNBO0FBQ0E7O0FDSEE7QUFDQTtBQUNBO0FBQ0E7O0FDSEE7QUFDQTtBQUNBO0FBQ0E7O0FDSEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNwREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2xEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN6REE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN2Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDZkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDWkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDTkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDZkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNuQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDTkE7O0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDWkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNoQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDTkE7O0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDVEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDZkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDVEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNQQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDUkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN0QkE7O0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNQQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ0pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDL0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDUEE7QUFDQTtBQUNBO0FBQ0E7O0FDSEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDeEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ05BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDSkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ0xBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDUEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDTkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNoQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNQQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNsQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2pCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDWEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzdCQTtBQUNBOztBQ0RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMxRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDTkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ0xBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNMQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDTEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNKQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDWEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaGVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbFJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDekJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDSkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNQQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1BBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNSQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDTEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ0xBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNMQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNUQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDYkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNWQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbkNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1RBO0FBQ0E7QUFDQTtBQUNBOztBQ0hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2pDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDWEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2pCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNUQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDakJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzNCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNUQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3RCQTs7QUNBQTtBQUNBO0FBQ0E7QUFDQTs7QUNIQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMzQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNiQTtBQUNBO0FBQ0E7QUFDQTs7QUNIQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1ZBO0FBQ0E7QUFDQTtBQUNBOztBQ0hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDYkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNQQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1BBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNSQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1BBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNSQTtBQUNBO0FBQ0E7QUFDQTs7QUNIQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3pCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN4QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNoQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNQQTtBQUNBO0FBQ0E7QUFDQTs7QUNIQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1BBO0FBQ0E7QUFDQTtBQUNBOztBQ0hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNkQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDWEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNQQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDcEVBO0FBQ0E7QUFDQTtBQUNBOztBQ0hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNSQTtBQUNBO0FBQ0E7QUFDQTs7QUNIQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1BBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1RBO0FBQ0E7QUFDQTtBQUNBOztBQ0hBO0FBQ0E7QUFDQTtBQUNBOztBQ0hBO0FBQ0E7QUFDQTtBQUNBOztBQ0hBO0FBQ0E7QUFDQTtBQUNBOztBQ0hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNqSEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2pCQTtBQUNBO0FBQ0E7QUFDQTs7QUNIQTtBQUNBO0FBQ0E7O0FDRkE7QUFDQTtBQUNBOztBQ0ZBO0FBQ0E7QUFDQTs7QUNGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDUkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1JBO0FBQ0E7QUFDQTtBQUNBOztBQ0hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNSQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1BBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDUEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNQQTtBQUNBO0FBQ0E7O0FDRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNSQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDUkE7QUFDQTtBQUNBOztBQ0ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1RBO0FBQ0E7QUFDQTtBQUNBOztBQ0hBO0FBQ0E7QUFDQTtBQUNBOztBQ0hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzVTQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDUkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNyQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDckJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDVkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN6QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDVEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDVEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3BCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1BBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDVkE7QUFDQTtBQUNBO0FBQ0E7O0FDSEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDZkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzlCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMxQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNKQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNUQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDWEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDVEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDckVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3hCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDWEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDTkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDTkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDTkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDTkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbkJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ05BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ05BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ05BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNYQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNOQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNOQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDakJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNMQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNOQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDakJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ05BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ05BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ05BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ05BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzFPQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzlDQTtBQUNBO0FBQ0E7QUFDQTs7QUNIQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ0pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDSkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNKQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ0pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDSkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNKQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ0pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDSkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNKQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDeERBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNYQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDWEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1JBO0FBQ0E7QUFDQTtBQUNBOztBQ0hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDVkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDZkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNWQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNmQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDWEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNSQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3RCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDakJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNqQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDUEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2xCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1BBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNSQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNmQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDUkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2RBO0FBQ0E7QUFDQTtBQUNBOztBQ0hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM3QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDVEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDVEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDTkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDTkE7QUFDQTtBQUNBO0FBQ0E7O0FDSEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDckJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNMQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ25CQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FDM0tBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNB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LENBQS9CIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIi8qIGVzbGludCBtYXgtbGVuOiAwICovXG5cblwidXNlIHN0cmljdFwiO1xuXG5yZXF1aXJlKFwiY29yZS1qcy9zaGltXCIpO1xuXG5yZXF1aXJlKFwiYmFiZWwtcmVnZW5lcmF0b3ItcnVudGltZVwiKTtcblxuLy8gU2hvdWxkIGJlIHJlbW92ZWQgaW4gdGhlIG5leHQgbWFqb3IgcmVsZWFzZTpcblxucmVxdWlyZShcImNvcmUtanMvZm4vcmVnZXhwL2VzY2FwZVwiKTtcblxuaWYgKGdsb2JhbC5fYmFiZWxQb2x5ZmlsbCkge1xuICB0aHJvdyBuZXcgRXJyb3IoXCJvbmx5IG9uZSBpbnN0YW5jZSBvZiBiYWJlbC1wb2x5ZmlsbCBpcyBhbGxvd2VkXCIpO1xufVxuZ2xvYmFsLl9iYWJlbFBvbHlmaWxsID0gdHJ1ZTtcblxudmFyIERFRklORV9QUk9QRVJUWSA9IFwiZGVmaW5lUHJvcGVydHlcIjtcbmZ1bmN0aW9uIGRlZmluZShPLCBrZXksIHZhbHVlKSB7XG4gIE9ba2V5XSB8fCBPYmplY3RbREVGSU5FX1BST1BFUlRZXShPLCBrZXksIHtcbiAgICB3cml0YWJsZTogdHJ1ZSxcbiAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgdmFsdWU6IHZhbHVlXG4gIH0pO1xufVxuXG5kZWZpbmUoU3RyaW5nLnByb3RvdHlwZSwgXCJwYWRMZWZ0XCIsIFwiXCIucGFkU3RhcnQpO1xuZGVmaW5lKFN0cmluZy5wcm90b3R5cGUsIFwicGFkUmlnaHRcIiwgXCJcIi5wYWRFbmQpO1xuXG5cInBvcCxyZXZlcnNlLHNoaWZ0LGtleXMsdmFsdWVzLGVudHJpZXMsaW5kZXhPZixldmVyeSxzb21lLGZvckVhY2gsbWFwLGZpbHRlcixmaW5kLGZpbmRJbmRleCxpbmNsdWRlcyxqb2luLHNsaWNlLGNvbmNhdCxwdXNoLHNwbGljZSx1bnNoaWZ0LHNvcnQsbGFzdEluZGV4T2YscmVkdWNlLHJlZHVjZVJpZ2h0LGNvcHlXaXRoaW4sZmlsbFwiLnNwbGl0KFwiLFwiKS5mb3JFYWNoKGZ1bmN0aW9uIChrZXkpIHtcbiAgW11ba2V5XSAmJiBkZWZpbmUoQXJyYXksIGtleSwgRnVuY3Rpb24uY2FsbC5iaW5kKFtdW2tleV0pKTtcbn0pOyIsInJlcXVpcmUoJy4uLy4uL21vZHVsZXMvY29yZS5yZWdleHAuZXNjYXBlJyk7XG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4uLy4uL21vZHVsZXMvX2NvcmUnKS5SZWdFeHAuZXNjYXBlOyIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oaXQpe1xuICBpZih0eXBlb2YgaXQgIT0gJ2Z1bmN0aW9uJyl0aHJvdyBUeXBlRXJyb3IoaXQgKyAnIGlzIG5vdCBhIGZ1bmN0aW9uIScpO1xuICByZXR1cm4gaXQ7XG59OyIsInZhciBjb2YgPSByZXF1aXJlKCcuL19jb2YnKTtcclxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpdCwgbXNnKXtcclxuICBpZih0eXBlb2YgaXQgIT0gJ251bWJlcicgJiYgY29mKGl0KSAhPSAnTnVtYmVyJyl0aHJvdyBUeXBlRXJyb3IobXNnKTtcclxuICByZXR1cm4gK2l0O1xyXG59OyIsIi8vIDIyLjEuMy4zMSBBcnJheS5wcm90b3R5cGVbQEB1bnNjb3BhYmxlc11cbnZhciBVTlNDT1BBQkxFUyA9IHJlcXVpcmUoJy4vX3drcycpKCd1bnNjb3BhYmxlcycpXG4gICwgQXJyYXlQcm90byAgPSBBcnJheS5wcm90b3R5cGU7XG5pZihBcnJheVByb3RvW1VOU0NPUEFCTEVTXSA9PSB1bmRlZmluZWQpcmVxdWlyZSgnLi9faGlkZScpKEFycmF5UHJvdG8sIFVOU0NPUEFCTEVTLCB7fSk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGtleSl7XG4gIEFycmF5UHJvdG9bVU5TQ09QQUJMRVNdW2tleV0gPSB0cnVlO1xufTsiLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGl0LCBDb25zdHJ1Y3RvciwgbmFtZSwgZm9yYmlkZGVuRmllbGQpe1xuICBpZighKGl0IGluc3RhbmNlb2YgQ29uc3RydWN0b3IpIHx8IChmb3JiaWRkZW5GaWVsZCAhPT0gdW5kZWZpbmVkICYmIGZvcmJpZGRlbkZpZWxkIGluIGl0KSl7XG4gICAgdGhyb3cgVHlwZUVycm9yKG5hbWUgKyAnOiBpbmNvcnJlY3QgaW52b2NhdGlvbiEnKTtcbiAgfSByZXR1cm4gaXQ7XG59OyIsInZhciBpc09iamVjdCA9IHJlcXVpcmUoJy4vX2lzLW9iamVjdCcpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpdCl7XG4gIGlmKCFpc09iamVjdChpdCkpdGhyb3cgVHlwZUVycm9yKGl0ICsgJyBpcyBub3QgYW4gb2JqZWN0IScpO1xuICByZXR1cm4gaXQ7XG59OyIsIi8vIDIyLjEuMy4zIEFycmF5LnByb3RvdHlwZS5jb3B5V2l0aGluKHRhcmdldCwgc3RhcnQsIGVuZCA9IHRoaXMubGVuZ3RoKVxuJ3VzZSBzdHJpY3QnO1xudmFyIHRvT2JqZWN0ID0gcmVxdWlyZSgnLi9fdG8tb2JqZWN0JylcbiAgLCB0b0luZGV4ICA9IHJlcXVpcmUoJy4vX3RvLWluZGV4JylcbiAgLCB0b0xlbmd0aCA9IHJlcXVpcmUoJy4vX3RvLWxlbmd0aCcpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IFtdLmNvcHlXaXRoaW4gfHwgZnVuY3Rpb24gY29weVdpdGhpbih0YXJnZXQvKj0gMCovLCBzdGFydC8qPSAwLCBlbmQgPSBAbGVuZ3RoKi8pe1xuICB2YXIgTyAgICAgPSB0b09iamVjdCh0aGlzKVxuICAgICwgbGVuICAgPSB0b0xlbmd0aChPLmxlbmd0aClcbiAgICAsIHRvICAgID0gdG9JbmRleCh0YXJnZXQsIGxlbilcbiAgICAsIGZyb20gID0gdG9JbmRleChzdGFydCwgbGVuKVxuICAgICwgZW5kICAgPSBhcmd1bWVudHMubGVuZ3RoID4gMiA/IGFyZ3VtZW50c1syXSA6IHVuZGVmaW5lZFxuICAgICwgY291bnQgPSBNYXRoLm1pbigoZW5kID09PSB1bmRlZmluZWQgPyBsZW4gOiB0b0luZGV4KGVuZCwgbGVuKSkgLSBmcm9tLCBsZW4gLSB0bylcbiAgICAsIGluYyAgID0gMTtcbiAgaWYoZnJvbSA8IHRvICYmIHRvIDwgZnJvbSArIGNvdW50KXtcbiAgICBpbmMgID0gLTE7XG4gICAgZnJvbSArPSBjb3VudCAtIDE7XG4gICAgdG8gICArPSBjb3VudCAtIDE7XG4gIH1cbiAgd2hpbGUoY291bnQtLSA+IDApe1xuICAgIGlmKGZyb20gaW4gTylPW3RvXSA9IE9bZnJvbV07XG4gICAgZWxzZSBkZWxldGUgT1t0b107XG4gICAgdG8gICArPSBpbmM7XG4gICAgZnJvbSArPSBpbmM7XG4gIH0gcmV0dXJuIE87XG59OyIsIi8vIDIyLjEuMy42IEFycmF5LnByb3RvdHlwZS5maWxsKHZhbHVlLCBzdGFydCA9IDAsIGVuZCA9IHRoaXMubGVuZ3RoKVxuJ3VzZSBzdHJpY3QnO1xudmFyIHRvT2JqZWN0ID0gcmVxdWlyZSgnLi9fdG8tb2JqZWN0JylcbiAgLCB0b0luZGV4ICA9IHJlcXVpcmUoJy4vX3RvLWluZGV4JylcbiAgLCB0b0xlbmd0aCA9IHJlcXVpcmUoJy4vX3RvLWxlbmd0aCcpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBmaWxsKHZhbHVlIC8qLCBzdGFydCA9IDAsIGVuZCA9IEBsZW5ndGggKi8pe1xuICB2YXIgTyAgICAgID0gdG9PYmplY3QodGhpcylcbiAgICAsIGxlbmd0aCA9IHRvTGVuZ3RoKE8ubGVuZ3RoKVxuICAgICwgYUxlbiAgID0gYXJndW1lbnRzLmxlbmd0aFxuICAgICwgaW5kZXggID0gdG9JbmRleChhTGVuID4gMSA/IGFyZ3VtZW50c1sxXSA6IHVuZGVmaW5lZCwgbGVuZ3RoKVxuICAgICwgZW5kICAgID0gYUxlbiA+IDIgPyBhcmd1bWVudHNbMl0gOiB1bmRlZmluZWRcbiAgICAsIGVuZFBvcyA9IGVuZCA9PT0gdW5kZWZpbmVkID8gbGVuZ3RoIDogdG9JbmRleChlbmQsIGxlbmd0aCk7XG4gIHdoaWxlKGVuZFBvcyA+IGluZGV4KU9baW5kZXgrK10gPSB2YWx1ZTtcbiAgcmV0dXJuIE87XG59OyIsInZhciBmb3JPZiA9IHJlcXVpcmUoJy4vX2Zvci1vZicpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGl0ZXIsIElURVJBVE9SKXtcbiAgdmFyIHJlc3VsdCA9IFtdO1xuICBmb3JPZihpdGVyLCBmYWxzZSwgcmVzdWx0LnB1c2gsIHJlc3VsdCwgSVRFUkFUT1IpO1xuICByZXR1cm4gcmVzdWx0O1xufTtcbiIsIi8vIGZhbHNlIC0+IEFycmF5I2luZGV4T2Zcbi8vIHRydWUgIC0+IEFycmF5I2luY2x1ZGVzXG52YXIgdG9JT2JqZWN0ID0gcmVxdWlyZSgnLi9fdG8taW9iamVjdCcpXG4gICwgdG9MZW5ndGggID0gcmVxdWlyZSgnLi9fdG8tbGVuZ3RoJylcbiAgLCB0b0luZGV4ICAgPSByZXF1aXJlKCcuL190by1pbmRleCcpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihJU19JTkNMVURFUyl7XG4gIHJldHVybiBmdW5jdGlvbigkdGhpcywgZWwsIGZyb21JbmRleCl7XG4gICAgdmFyIE8gICAgICA9IHRvSU9iamVjdCgkdGhpcylcbiAgICAgICwgbGVuZ3RoID0gdG9MZW5ndGgoTy5sZW5ndGgpXG4gICAgICAsIGluZGV4ICA9IHRvSW5kZXgoZnJvbUluZGV4LCBsZW5ndGgpXG4gICAgICAsIHZhbHVlO1xuICAgIC8vIEFycmF5I2luY2x1ZGVzIHVzZXMgU2FtZVZhbHVlWmVybyBlcXVhbGl0eSBhbGdvcml0aG1cbiAgICBpZihJU19JTkNMVURFUyAmJiBlbCAhPSBlbCl3aGlsZShsZW5ndGggPiBpbmRleCl7XG4gICAgICB2YWx1ZSA9IE9baW5kZXgrK107XG4gICAgICBpZih2YWx1ZSAhPSB2YWx1ZSlyZXR1cm4gdHJ1ZTtcbiAgICAvLyBBcnJheSN0b0luZGV4IGlnbm9yZXMgaG9sZXMsIEFycmF5I2luY2x1ZGVzIC0gbm90XG4gICAgfSBlbHNlIGZvcig7bGVuZ3RoID4gaW5kZXg7IGluZGV4KyspaWYoSVNfSU5DTFVERVMgfHwgaW5kZXggaW4gTyl7XG4gICAgICBpZihPW2luZGV4XSA9PT0gZWwpcmV0dXJuIElTX0lOQ0xVREVTIHx8IGluZGV4O1xuICAgIH0gcmV0dXJuICFJU19JTkNMVURFUyAmJiAtMTtcbiAgfTtcbn07IiwiLy8gMCAtPiBBcnJheSNmb3JFYWNoXG4vLyAxIC0+IEFycmF5I21hcFxuLy8gMiAtPiBBcnJheSNmaWx0ZXJcbi8vIDMgLT4gQXJyYXkjc29tZVxuLy8gNCAtPiBBcnJheSNldmVyeVxuLy8gNSAtPiBBcnJheSNmaW5kXG4vLyA2IC0+IEFycmF5I2ZpbmRJbmRleFxudmFyIGN0eCAgICAgID0gcmVxdWlyZSgnLi9fY3R4JylcbiAgLCBJT2JqZWN0ICA9IHJlcXVpcmUoJy4vX2lvYmplY3QnKVxuICAsIHRvT2JqZWN0ID0gcmVxdWlyZSgnLi9fdG8tb2JqZWN0JylcbiAgLCB0b0xlbmd0aCA9IHJlcXVpcmUoJy4vX3RvLWxlbmd0aCcpXG4gICwgYXNjICAgICAgPSByZXF1aXJlKCcuL19hcnJheS1zcGVjaWVzLWNyZWF0ZScpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihUWVBFLCAkY3JlYXRlKXtcbiAgdmFyIElTX01BUCAgICAgICAgPSBUWVBFID09IDFcbiAgICAsIElTX0ZJTFRFUiAgICAgPSBUWVBFID09IDJcbiAgICAsIElTX1NPTUUgICAgICAgPSBUWVBFID09IDNcbiAgICAsIElTX0VWRVJZICAgICAgPSBUWVBFID09IDRcbiAgICAsIElTX0ZJTkRfSU5ERVggPSBUWVBFID09IDZcbiAgICAsIE5PX0hPTEVTICAgICAgPSBUWVBFID09IDUgfHwgSVNfRklORF9JTkRFWFxuICAgICwgY3JlYXRlICAgICAgICA9ICRjcmVhdGUgfHwgYXNjO1xuICByZXR1cm4gZnVuY3Rpb24oJHRoaXMsIGNhbGxiYWNrZm4sIHRoYXQpe1xuICAgIHZhciBPICAgICAgPSB0b09iamVjdCgkdGhpcylcbiAgICAgICwgc2VsZiAgID0gSU9iamVjdChPKVxuICAgICAgLCBmICAgICAgPSBjdHgoY2FsbGJhY2tmbiwgdGhhdCwgMylcbiAgICAgICwgbGVuZ3RoID0gdG9MZW5ndGgoc2VsZi5sZW5ndGgpXG4gICAgICAsIGluZGV4ICA9IDBcbiAgICAgICwgcmVzdWx0ID0gSVNfTUFQID8gY3JlYXRlKCR0aGlzLCBsZW5ndGgpIDogSVNfRklMVEVSID8gY3JlYXRlKCR0aGlzLCAwKSA6IHVuZGVmaW5lZFxuICAgICAgLCB2YWwsIHJlcztcbiAgICBmb3IoO2xlbmd0aCA+IGluZGV4OyBpbmRleCsrKWlmKE5PX0hPTEVTIHx8IGluZGV4IGluIHNlbGYpe1xuICAgICAgdmFsID0gc2VsZltpbmRleF07XG4gICAgICByZXMgPSBmKHZhbCwgaW5kZXgsIE8pO1xuICAgICAgaWYoVFlQRSl7XG4gICAgICAgIGlmKElTX01BUClyZXN1bHRbaW5kZXhdID0gcmVzOyAgICAgICAgICAgIC8vIG1hcFxuICAgICAgICBlbHNlIGlmKHJlcylzd2l0Y2goVFlQRSl7XG4gICAgICAgICAgY2FzZSAzOiByZXR1cm4gdHJ1ZTsgICAgICAgICAgICAgICAgICAgIC8vIHNvbWVcbiAgICAgICAgICBjYXNlIDU6IHJldHVybiB2YWw7ICAgICAgICAgICAgICAgICAgICAgLy8gZmluZFxuICAgICAgICAgIGNhc2UgNjogcmV0dXJuIGluZGV4OyAgICAgICAgICAgICAgICAgICAvLyBmaW5kSW5kZXhcbiAgICAgICAgICBjYXNlIDI6IHJlc3VsdC5wdXNoKHZhbCk7ICAgICAgICAgICAgICAgLy8gZmlsdGVyXG4gICAgICAgIH0gZWxzZSBpZihJU19FVkVSWSlyZXR1cm4gZmFsc2U7ICAgICAgICAgIC8vIGV2ZXJ5XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBJU19GSU5EX0lOREVYID8gLTEgOiBJU19TT01FIHx8IElTX0VWRVJZID8gSVNfRVZFUlkgOiByZXN1bHQ7XG4gIH07XG59OyIsInZhciBhRnVuY3Rpb24gPSByZXF1aXJlKCcuL19hLWZ1bmN0aW9uJylcclxuICAsIHRvT2JqZWN0ICA9IHJlcXVpcmUoJy4vX3RvLW9iamVjdCcpXHJcbiAgLCBJT2JqZWN0ICAgPSByZXF1aXJlKCcuL19pb2JqZWN0JylcclxuICAsIHRvTGVuZ3RoICA9IHJlcXVpcmUoJy4vX3RvLWxlbmd0aCcpO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbih0aGF0LCBjYWxsYmFja2ZuLCBhTGVuLCBtZW1vLCBpc1JpZ2h0KXtcclxuICBhRnVuY3Rpb24oY2FsbGJhY2tmbik7XHJcbiAgdmFyIE8gICAgICA9IHRvT2JqZWN0KHRoYXQpXHJcbiAgICAsIHNlbGYgICA9IElPYmplY3QoTylcclxuICAgICwgbGVuZ3RoID0gdG9MZW5ndGgoTy5sZW5ndGgpXHJcbiAgICAsIGluZGV4ICA9IGlzUmlnaHQgPyBsZW5ndGggLSAxIDogMFxyXG4gICAgLCBpICAgICAgPSBpc1JpZ2h0ID8gLTEgOiAxO1xyXG4gIGlmKGFMZW4gPCAyKWZvcig7Oyl7XHJcbiAgICBpZihpbmRleCBpbiBzZWxmKXtcclxuICAgICAgbWVtbyA9IHNlbGZbaW5kZXhdO1xyXG4gICAgICBpbmRleCArPSBpO1xyXG4gICAgICBicmVhaztcclxuICAgIH1cclxuICAgIGluZGV4ICs9IGk7XHJcbiAgICBpZihpc1JpZ2h0ID8gaW5kZXggPCAwIDogbGVuZ3RoIDw9IGluZGV4KXtcclxuICAgICAgdGhyb3cgVHlwZUVycm9yKCdSZWR1Y2Ugb2YgZW1wdHkgYXJyYXkgd2l0aCBubyBpbml0aWFsIHZhbHVlJyk7XHJcbiAgICB9XHJcbiAgfVxyXG4gIGZvcig7aXNSaWdodCA/IGluZGV4ID49IDAgOiBsZW5ndGggPiBpbmRleDsgaW5kZXggKz0gaSlpZihpbmRleCBpbiBzZWxmKXtcclxuICAgIG1lbW8gPSBjYWxsYmFja2ZuKG1lbW8sIHNlbGZbaW5kZXhdLCBpbmRleCwgTyk7XHJcbiAgfVxyXG4gIHJldHVybiBtZW1vO1xyXG59OyIsIi8vIDkuNC4yLjMgQXJyYXlTcGVjaWVzQ3JlYXRlKG9yaWdpbmFsQXJyYXksIGxlbmd0aClcbnZhciBpc09iamVjdCA9IHJlcXVpcmUoJy4vX2lzLW9iamVjdCcpXG4gICwgaXNBcnJheSAgPSByZXF1aXJlKCcuL19pcy1hcnJheScpXG4gICwgU1BFQ0lFUyAgPSByZXF1aXJlKCcuL193a3MnKSgnc3BlY2llcycpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihvcmlnaW5hbCwgbGVuZ3RoKXtcbiAgdmFyIEM7XG4gIGlmKGlzQXJyYXkob3JpZ2luYWwpKXtcbiAgICBDID0gb3JpZ2luYWwuY29uc3RydWN0b3I7XG4gICAgLy8gY3Jvc3MtcmVhbG0gZmFsbGJhY2tcbiAgICBpZih0eXBlb2YgQyA9PSAnZnVuY3Rpb24nICYmIChDID09PSBBcnJheSB8fCBpc0FycmF5KEMucHJvdG90eXBlKSkpQyA9IHVuZGVmaW5lZDtcbiAgICBpZihpc09iamVjdChDKSl7XG4gICAgICBDID0gQ1tTUEVDSUVTXTtcbiAgICAgIGlmKEMgPT09IG51bGwpQyA9IHVuZGVmaW5lZDtcbiAgICB9XG4gIH0gcmV0dXJuIG5ldyAoQyA9PT0gdW5kZWZpbmVkID8gQXJyYXkgOiBDKShsZW5ndGgpO1xufTsiLCIndXNlIHN0cmljdCc7XG52YXIgYUZ1bmN0aW9uICA9IHJlcXVpcmUoJy4vX2EtZnVuY3Rpb24nKVxuICAsIGlzT2JqZWN0ICAgPSByZXF1aXJlKCcuL19pcy1vYmplY3QnKVxuICAsIGludm9rZSAgICAgPSByZXF1aXJlKCcuL19pbnZva2UnKVxuICAsIGFycmF5U2xpY2UgPSBbXS5zbGljZVxuICAsIGZhY3RvcmllcyAgPSB7fTtcblxudmFyIGNvbnN0cnVjdCA9IGZ1bmN0aW9uKEYsIGxlbiwgYXJncyl7XG4gIGlmKCEobGVuIGluIGZhY3Rvcmllcykpe1xuICAgIGZvcih2YXIgbiA9IFtdLCBpID0gMDsgaSA8IGxlbjsgaSsrKW5baV0gPSAnYVsnICsgaSArICddJztcbiAgICBmYWN0b3JpZXNbbGVuXSA9IEZ1bmN0aW9uKCdGLGEnLCAncmV0dXJuIG5ldyBGKCcgKyBuLmpvaW4oJywnKSArICcpJyk7XG4gIH0gcmV0dXJuIGZhY3Rvcmllc1tsZW5dKEYsIGFyZ3MpO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBGdW5jdGlvbi5iaW5kIHx8IGZ1bmN0aW9uIGJpbmQodGhhdCAvKiwgYXJncy4uLiAqLyl7XG4gIHZhciBmbiAgICAgICA9IGFGdW5jdGlvbih0aGlzKVxuICAgICwgcGFydEFyZ3MgPSBhcnJheVNsaWNlLmNhbGwoYXJndW1lbnRzLCAxKTtcbiAgdmFyIGJvdW5kID0gZnVuY3Rpb24oLyogYXJncy4uLiAqLyl7XG4gICAgdmFyIGFyZ3MgPSBwYXJ0QXJncy5jb25jYXQoYXJyYXlTbGljZS5jYWxsKGFyZ3VtZW50cykpO1xuICAgIHJldHVybiB0aGlzIGluc3RhbmNlb2YgYm91bmQgPyBjb25zdHJ1Y3QoZm4sIGFyZ3MubGVuZ3RoLCBhcmdzKSA6IGludm9rZShmbiwgYXJncywgdGhhdCk7XG4gIH07XG4gIGlmKGlzT2JqZWN0KGZuLnByb3RvdHlwZSkpYm91bmQucHJvdG90eXBlID0gZm4ucHJvdG90eXBlO1xuICByZXR1cm4gYm91bmQ7XG59OyIsIi8vIGdldHRpbmcgdGFnIGZyb20gMTkuMS4zLjYgT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZygpXG52YXIgY29mID0gcmVxdWlyZSgnLi9fY29mJylcbiAgLCBUQUcgPSByZXF1aXJlKCcuL193a3MnKSgndG9TdHJpbmdUYWcnKVxuICAvLyBFUzMgd3JvbmcgaGVyZVxuICAsIEFSRyA9IGNvZihmdW5jdGlvbigpeyByZXR1cm4gYXJndW1lbnRzOyB9KCkpID09ICdBcmd1bWVudHMnO1xuXG4vLyBmYWxsYmFjayBmb3IgSUUxMSBTY3JpcHQgQWNjZXNzIERlbmllZCBlcnJvclxudmFyIHRyeUdldCA9IGZ1bmN0aW9uKGl0LCBrZXkpe1xuICB0cnkge1xuICAgIHJldHVybiBpdFtrZXldO1xuICB9IGNhdGNoKGUpeyAvKiBlbXB0eSAqLyB9XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGl0KXtcbiAgdmFyIE8sIFQsIEI7XG4gIHJldHVybiBpdCA9PT0gdW5kZWZpbmVkID8gJ1VuZGVmaW5lZCcgOiBpdCA9PT0gbnVsbCA/ICdOdWxsJ1xuICAgIC8vIEBAdG9TdHJpbmdUYWcgY2FzZVxuICAgIDogdHlwZW9mIChUID0gdHJ5R2V0KE8gPSBPYmplY3QoaXQpLCBUQUcpKSA9PSAnc3RyaW5nJyA/IFRcbiAgICAvLyBidWlsdGluVGFnIGNhc2VcbiAgICA6IEFSRyA/IGNvZihPKVxuICAgIC8vIEVTMyBhcmd1bWVudHMgZmFsbGJhY2tcbiAgICA6IChCID0gY29mKE8pKSA9PSAnT2JqZWN0JyAmJiB0eXBlb2YgTy5jYWxsZWUgPT0gJ2Z1bmN0aW9uJyA/ICdBcmd1bWVudHMnIDogQjtcbn07IiwidmFyIHRvU3RyaW5nID0ge30udG9TdHJpbmc7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oaXQpe1xuICByZXR1cm4gdG9TdHJpbmcuY2FsbChpdCkuc2xpY2UoOCwgLTEpO1xufTsiLCIndXNlIHN0cmljdCc7XG52YXIgZFAgICAgICAgICAgPSByZXF1aXJlKCcuL19vYmplY3QtZHAnKS5mXG4gICwgY3JlYXRlICAgICAgPSByZXF1aXJlKCcuL19vYmplY3QtY3JlYXRlJylcbiAgLCBoaWRlICAgICAgICA9IHJlcXVpcmUoJy4vX2hpZGUnKVxuICAsIHJlZGVmaW5lQWxsID0gcmVxdWlyZSgnLi9fcmVkZWZpbmUtYWxsJylcbiAgLCBjdHggICAgICAgICA9IHJlcXVpcmUoJy4vX2N0eCcpXG4gICwgYW5JbnN0YW5jZSAgPSByZXF1aXJlKCcuL19hbi1pbnN0YW5jZScpXG4gICwgZGVmaW5lZCAgICAgPSByZXF1aXJlKCcuL19kZWZpbmVkJylcbiAgLCBmb3JPZiAgICAgICA9IHJlcXVpcmUoJy4vX2Zvci1vZicpXG4gICwgJGl0ZXJEZWZpbmUgPSByZXF1aXJlKCcuL19pdGVyLWRlZmluZScpXG4gICwgc3RlcCAgICAgICAgPSByZXF1aXJlKCcuL19pdGVyLXN0ZXAnKVxuICAsIHNldFNwZWNpZXMgID0gcmVxdWlyZSgnLi9fc2V0LXNwZWNpZXMnKVxuICAsIERFU0NSSVBUT1JTID0gcmVxdWlyZSgnLi9fZGVzY3JpcHRvcnMnKVxuICAsIGZhc3RLZXkgICAgID0gcmVxdWlyZSgnLi9fbWV0YScpLmZhc3RLZXlcbiAgLCBTSVpFICAgICAgICA9IERFU0NSSVBUT1JTID8gJ19zJyA6ICdzaXplJztcblxudmFyIGdldEVudHJ5ID0gZnVuY3Rpb24odGhhdCwga2V5KXtcbiAgLy8gZmFzdCBjYXNlXG4gIHZhciBpbmRleCA9IGZhc3RLZXkoa2V5KSwgZW50cnk7XG4gIGlmKGluZGV4ICE9PSAnRicpcmV0dXJuIHRoYXQuX2lbaW5kZXhdO1xuICAvLyBmcm96ZW4gb2JqZWN0IGNhc2VcbiAgZm9yKGVudHJ5ID0gdGhhdC5fZjsgZW50cnk7IGVudHJ5ID0gZW50cnkubil7XG4gICAgaWYoZW50cnkuayA9PSBrZXkpcmV0dXJuIGVudHJ5O1xuICB9XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgZ2V0Q29uc3RydWN0b3I6IGZ1bmN0aW9uKHdyYXBwZXIsIE5BTUUsIElTX01BUCwgQURERVIpe1xuICAgIHZhciBDID0gd3JhcHBlcihmdW5jdGlvbih0aGF0LCBpdGVyYWJsZSl7XG4gICAgICBhbkluc3RhbmNlKHRoYXQsIEMsIE5BTUUsICdfaScpO1xuICAgICAgdGhhdC5faSA9IGNyZWF0ZShudWxsKTsgLy8gaW5kZXhcbiAgICAgIHRoYXQuX2YgPSB1bmRlZmluZWQ7ICAgIC8vIGZpcnN0IGVudHJ5XG4gICAgICB0aGF0Ll9sID0gdW5kZWZpbmVkOyAgICAvLyBsYXN0IGVudHJ5XG4gICAgICB0aGF0W1NJWkVdID0gMDsgICAgICAgICAvLyBzaXplXG4gICAgICBpZihpdGVyYWJsZSAhPSB1bmRlZmluZWQpZm9yT2YoaXRlcmFibGUsIElTX01BUCwgdGhhdFtBRERFUl0sIHRoYXQpO1xuICAgIH0pO1xuICAgIHJlZGVmaW5lQWxsKEMucHJvdG90eXBlLCB7XG4gICAgICAvLyAyMy4xLjMuMSBNYXAucHJvdG90eXBlLmNsZWFyKClcbiAgICAgIC8vIDIzLjIuMy4yIFNldC5wcm90b3R5cGUuY2xlYXIoKVxuICAgICAgY2xlYXI6IGZ1bmN0aW9uIGNsZWFyKCl7XG4gICAgICAgIGZvcih2YXIgdGhhdCA9IHRoaXMsIGRhdGEgPSB0aGF0Ll9pLCBlbnRyeSA9IHRoYXQuX2Y7IGVudHJ5OyBlbnRyeSA9IGVudHJ5Lm4pe1xuICAgICAgICAgIGVudHJ5LnIgPSB0cnVlO1xuICAgICAgICAgIGlmKGVudHJ5LnApZW50cnkucCA9IGVudHJ5LnAubiA9IHVuZGVmaW5lZDtcbiAgICAgICAgICBkZWxldGUgZGF0YVtlbnRyeS5pXTtcbiAgICAgICAgfVxuICAgICAgICB0aGF0Ll9mID0gdGhhdC5fbCA9IHVuZGVmaW5lZDtcbiAgICAgICAgdGhhdFtTSVpFXSA9IDA7XG4gICAgICB9LFxuICAgICAgLy8gMjMuMS4zLjMgTWFwLnByb3RvdHlwZS5kZWxldGUoa2V5KVxuICAgICAgLy8gMjMuMi4zLjQgU2V0LnByb3RvdHlwZS5kZWxldGUodmFsdWUpXG4gICAgICAnZGVsZXRlJzogZnVuY3Rpb24oa2V5KXtcbiAgICAgICAgdmFyIHRoYXQgID0gdGhpc1xuICAgICAgICAgICwgZW50cnkgPSBnZXRFbnRyeSh0aGF0LCBrZXkpO1xuICAgICAgICBpZihlbnRyeSl7XG4gICAgICAgICAgdmFyIG5leHQgPSBlbnRyeS5uXG4gICAgICAgICAgICAsIHByZXYgPSBlbnRyeS5wO1xuICAgICAgICAgIGRlbGV0ZSB0aGF0Ll9pW2VudHJ5LmldO1xuICAgICAgICAgIGVudHJ5LnIgPSB0cnVlO1xuICAgICAgICAgIGlmKHByZXYpcHJldi5uID0gbmV4dDtcbiAgICAgICAgICBpZihuZXh0KW5leHQucCA9IHByZXY7XG4gICAgICAgICAgaWYodGhhdC5fZiA9PSBlbnRyeSl0aGF0Ll9mID0gbmV4dDtcbiAgICAgICAgICBpZih0aGF0Ll9sID09IGVudHJ5KXRoYXQuX2wgPSBwcmV2O1xuICAgICAgICAgIHRoYXRbU0laRV0tLTtcbiAgICAgICAgfSByZXR1cm4gISFlbnRyeTtcbiAgICAgIH0sXG4gICAgICAvLyAyMy4yLjMuNiBTZXQucHJvdG90eXBlLmZvckVhY2goY2FsbGJhY2tmbiwgdGhpc0FyZyA9IHVuZGVmaW5lZClcbiAgICAgIC8vIDIzLjEuMy41IE1hcC5wcm90b3R5cGUuZm9yRWFjaChjYWxsYmFja2ZuLCB0aGlzQXJnID0gdW5kZWZpbmVkKVxuICAgICAgZm9yRWFjaDogZnVuY3Rpb24gZm9yRWFjaChjYWxsYmFja2ZuIC8qLCB0aGF0ID0gdW5kZWZpbmVkICovKXtcbiAgICAgICAgYW5JbnN0YW5jZSh0aGlzLCBDLCAnZm9yRWFjaCcpO1xuICAgICAgICB2YXIgZiA9IGN0eChjYWxsYmFja2ZuLCBhcmd1bWVudHMubGVuZ3RoID4gMSA/IGFyZ3VtZW50c1sxXSA6IHVuZGVmaW5lZCwgMylcbiAgICAgICAgICAsIGVudHJ5O1xuICAgICAgICB3aGlsZShlbnRyeSA9IGVudHJ5ID8gZW50cnkubiA6IHRoaXMuX2Ype1xuICAgICAgICAgIGYoZW50cnkudiwgZW50cnkuaywgdGhpcyk7XG4gICAgICAgICAgLy8gcmV2ZXJ0IHRvIHRoZSBsYXN0IGV4aXN0aW5nIGVudHJ5XG4gICAgICAgICAgd2hpbGUoZW50cnkgJiYgZW50cnkucillbnRyeSA9IGVudHJ5LnA7XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICAvLyAyMy4xLjMuNyBNYXAucHJvdG90eXBlLmhhcyhrZXkpXG4gICAgICAvLyAyMy4yLjMuNyBTZXQucHJvdG90eXBlLmhhcyh2YWx1ZSlcbiAgICAgIGhhczogZnVuY3Rpb24gaGFzKGtleSl7XG4gICAgICAgIHJldHVybiAhIWdldEVudHJ5KHRoaXMsIGtleSk7XG4gICAgICB9XG4gICAgfSk7XG4gICAgaWYoREVTQ1JJUFRPUlMpZFAoQy5wcm90b3R5cGUsICdzaXplJywge1xuICAgICAgZ2V0OiBmdW5jdGlvbigpe1xuICAgICAgICByZXR1cm4gZGVmaW5lZCh0aGlzW1NJWkVdKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICByZXR1cm4gQztcbiAgfSxcbiAgZGVmOiBmdW5jdGlvbih0aGF0LCBrZXksIHZhbHVlKXtcbiAgICB2YXIgZW50cnkgPSBnZXRFbnRyeSh0aGF0LCBrZXkpXG4gICAgICAsIHByZXYsIGluZGV4O1xuICAgIC8vIGNoYW5nZSBleGlzdGluZyBlbnRyeVxuICAgIGlmKGVudHJ5KXtcbiAgICAgIGVudHJ5LnYgPSB2YWx1ZTtcbiAgICAvLyBjcmVhdGUgbmV3IGVudHJ5XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoYXQuX2wgPSBlbnRyeSA9IHtcbiAgICAgICAgaTogaW5kZXggPSBmYXN0S2V5KGtleSwgdHJ1ZSksIC8vIDwtIGluZGV4XG4gICAgICAgIGs6IGtleSwgICAgICAgICAgICAgICAgICAgICAgICAvLyA8LSBrZXlcbiAgICAgICAgdjogdmFsdWUsICAgICAgICAgICAgICAgICAgICAgIC8vIDwtIHZhbHVlXG4gICAgICAgIHA6IHByZXYgPSB0aGF0Ll9sLCAgICAgICAgICAgICAvLyA8LSBwcmV2aW91cyBlbnRyeVxuICAgICAgICBuOiB1bmRlZmluZWQsICAgICAgICAgICAgICAgICAgLy8gPC0gbmV4dCBlbnRyeVxuICAgICAgICByOiBmYWxzZSAgICAgICAgICAgICAgICAgICAgICAgLy8gPC0gcmVtb3ZlZFxuICAgICAgfTtcbiAgICAgIGlmKCF0aGF0Ll9mKXRoYXQuX2YgPSBlbnRyeTtcbiAgICAgIGlmKHByZXYpcHJldi5uID0gZW50cnk7XG4gICAgICB0aGF0W1NJWkVdKys7XG4gICAgICAvLyBhZGQgdG8gaW5kZXhcbiAgICAgIGlmKGluZGV4ICE9PSAnRicpdGhhdC5faVtpbmRleF0gPSBlbnRyeTtcbiAgICB9IHJldHVybiB0aGF0O1xuICB9LFxuICBnZXRFbnRyeTogZ2V0RW50cnksXG4gIHNldFN0cm9uZzogZnVuY3Rpb24oQywgTkFNRSwgSVNfTUFQKXtcbiAgICAvLyBhZGQgLmtleXMsIC52YWx1ZXMsIC5lbnRyaWVzLCBbQEBpdGVyYXRvcl1cbiAgICAvLyAyMy4xLjMuNCwgMjMuMS4zLjgsIDIzLjEuMy4xMSwgMjMuMS4zLjEyLCAyMy4yLjMuNSwgMjMuMi4zLjgsIDIzLjIuMy4xMCwgMjMuMi4zLjExXG4gICAgJGl0ZXJEZWZpbmUoQywgTkFNRSwgZnVuY3Rpb24oaXRlcmF0ZWQsIGtpbmQpe1xuICAgICAgdGhpcy5fdCA9IGl0ZXJhdGVkOyAgLy8gdGFyZ2V0XG4gICAgICB0aGlzLl9rID0ga2luZDsgICAgICAvLyBraW5kXG4gICAgICB0aGlzLl9sID0gdW5kZWZpbmVkOyAvLyBwcmV2aW91c1xuICAgIH0sIGZ1bmN0aW9uKCl7XG4gICAgICB2YXIgdGhhdCAgPSB0aGlzXG4gICAgICAgICwga2luZCAgPSB0aGF0Ll9rXG4gICAgICAgICwgZW50cnkgPSB0aGF0Ll9sO1xuICAgICAgLy8gcmV2ZXJ0IHRvIHRoZSBsYXN0IGV4aXN0aW5nIGVudHJ5XG4gICAgICB3aGlsZShlbnRyeSAmJiBlbnRyeS5yKWVudHJ5ID0gZW50cnkucDtcbiAgICAgIC8vIGdldCBuZXh0IGVudHJ5XG4gICAgICBpZighdGhhdC5fdCB8fCAhKHRoYXQuX2wgPSBlbnRyeSA9IGVudHJ5ID8gZW50cnkubiA6IHRoYXQuX3QuX2YpKXtcbiAgICAgICAgLy8gb3IgZmluaXNoIHRoZSBpdGVyYXRpb25cbiAgICAgICAgdGhhdC5fdCA9IHVuZGVmaW5lZDtcbiAgICAgICAgcmV0dXJuIHN0ZXAoMSk7XG4gICAgICB9XG4gICAgICAvLyByZXR1cm4gc3RlcCBieSBraW5kXG4gICAgICBpZihraW5kID09ICdrZXlzJyAgKXJldHVybiBzdGVwKDAsIGVudHJ5LmspO1xuICAgICAgaWYoa2luZCA9PSAndmFsdWVzJylyZXR1cm4gc3RlcCgwLCBlbnRyeS52KTtcbiAgICAgIHJldHVybiBzdGVwKDAsIFtlbnRyeS5rLCBlbnRyeS52XSk7XG4gICAgfSwgSVNfTUFQID8gJ2VudHJpZXMnIDogJ3ZhbHVlcycgLCAhSVNfTUFQLCB0cnVlKTtcblxuICAgIC8vIGFkZCBbQEBzcGVjaWVzXSwgMjMuMS4yLjIsIDIzLjIuMi4yXG4gICAgc2V0U3BlY2llcyhOQU1FKTtcbiAgfVxufTsiLCIvLyBodHRwczovL2dpdGh1Yi5jb20vRGF2aWRCcnVhbnQvTWFwLVNldC5wcm90b3R5cGUudG9KU09OXG52YXIgY2xhc3NvZiA9IHJlcXVpcmUoJy4vX2NsYXNzb2YnKVxuICAsIGZyb20gICAgPSByZXF1aXJlKCcuL19hcnJheS1mcm9tLWl0ZXJhYmxlJyk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKE5BTUUpe1xuICByZXR1cm4gZnVuY3Rpb24gdG9KU09OKCl7XG4gICAgaWYoY2xhc3NvZih0aGlzKSAhPSBOQU1FKXRocm93IFR5cGVFcnJvcihOQU1FICsgXCIjdG9KU09OIGlzbid0IGdlbmVyaWNcIik7XG4gICAgcmV0dXJuIGZyb20odGhpcyk7XG4gIH07XG59OyIsIid1c2Ugc3RyaWN0JztcbnZhciByZWRlZmluZUFsbCAgICAgICA9IHJlcXVpcmUoJy4vX3JlZGVmaW5lLWFsbCcpXG4gICwgZ2V0V2VhayAgICAgICAgICAgPSByZXF1aXJlKCcuL19tZXRhJykuZ2V0V2Vha1xuICAsIGFuT2JqZWN0ICAgICAgICAgID0gcmVxdWlyZSgnLi9fYW4tb2JqZWN0JylcbiAgLCBpc09iamVjdCAgICAgICAgICA9IHJlcXVpcmUoJy4vX2lzLW9iamVjdCcpXG4gICwgYW5JbnN0YW5jZSAgICAgICAgPSByZXF1aXJlKCcuL19hbi1pbnN0YW5jZScpXG4gICwgZm9yT2YgICAgICAgICAgICAgPSByZXF1aXJlKCcuL19mb3Itb2YnKVxuICAsIGNyZWF0ZUFycmF5TWV0aG9kID0gcmVxdWlyZSgnLi9fYXJyYXktbWV0aG9kcycpXG4gICwgJGhhcyAgICAgICAgICAgICAgPSByZXF1aXJlKCcuL19oYXMnKVxuICAsIGFycmF5RmluZCAgICAgICAgID0gY3JlYXRlQXJyYXlNZXRob2QoNSlcbiAgLCBhcnJheUZpbmRJbmRleCAgICA9IGNyZWF0ZUFycmF5TWV0aG9kKDYpXG4gICwgaWQgICAgICAgICAgICAgICAgPSAwO1xuXG4vLyBmYWxsYmFjayBmb3IgdW5jYXVnaHQgZnJvemVuIGtleXNcbnZhciB1bmNhdWdodEZyb3plblN0b3JlID0gZnVuY3Rpb24odGhhdCl7XG4gIHJldHVybiB0aGF0Ll9sIHx8ICh0aGF0Ll9sID0gbmV3IFVuY2F1Z2h0RnJvemVuU3RvcmUpO1xufTtcbnZhciBVbmNhdWdodEZyb3plblN0b3JlID0gZnVuY3Rpb24oKXtcbiAgdGhpcy5hID0gW107XG59O1xudmFyIGZpbmRVbmNhdWdodEZyb3plbiA9IGZ1bmN0aW9uKHN0b3JlLCBrZXkpe1xuICByZXR1cm4gYXJyYXlGaW5kKHN0b3JlLmEsIGZ1bmN0aW9uKGl0KXtcbiAgICByZXR1cm4gaXRbMF0gPT09IGtleTtcbiAgfSk7XG59O1xuVW5jYXVnaHRGcm96ZW5TdG9yZS5wcm90b3R5cGUgPSB7XG4gIGdldDogZnVuY3Rpb24oa2V5KXtcbiAgICB2YXIgZW50cnkgPSBmaW5kVW5jYXVnaHRGcm96ZW4odGhpcywga2V5KTtcbiAgICBpZihlbnRyeSlyZXR1cm4gZW50cnlbMV07XG4gIH0sXG4gIGhhczogZnVuY3Rpb24oa2V5KXtcbiAgICByZXR1cm4gISFmaW5kVW5jYXVnaHRGcm96ZW4odGhpcywga2V5KTtcbiAgfSxcbiAgc2V0OiBmdW5jdGlvbihrZXksIHZhbHVlKXtcbiAgICB2YXIgZW50cnkgPSBmaW5kVW5jYXVnaHRGcm96ZW4odGhpcywga2V5KTtcbiAgICBpZihlbnRyeSllbnRyeVsxXSA9IHZhbHVlO1xuICAgIGVsc2UgdGhpcy5hLnB1c2goW2tleSwgdmFsdWVdKTtcbiAgfSxcbiAgJ2RlbGV0ZSc6IGZ1bmN0aW9uKGtleSl7XG4gICAgdmFyIGluZGV4ID0gYXJyYXlGaW5kSW5kZXgodGhpcy5hLCBmdW5jdGlvbihpdCl7XG4gICAgICByZXR1cm4gaXRbMF0gPT09IGtleTtcbiAgICB9KTtcbiAgICBpZih+aW5kZXgpdGhpcy5hLnNwbGljZShpbmRleCwgMSk7XG4gICAgcmV0dXJuICEhfmluZGV4O1xuICB9XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgZ2V0Q29uc3RydWN0b3I6IGZ1bmN0aW9uKHdyYXBwZXIsIE5BTUUsIElTX01BUCwgQURERVIpe1xuICAgIHZhciBDID0gd3JhcHBlcihmdW5jdGlvbih0aGF0LCBpdGVyYWJsZSl7XG4gICAgICBhbkluc3RhbmNlKHRoYXQsIEMsIE5BTUUsICdfaScpO1xuICAgICAgdGhhdC5faSA9IGlkKys7ICAgICAgLy8gY29sbGVjdGlvbiBpZFxuICAgICAgdGhhdC5fbCA9IHVuZGVmaW5lZDsgLy8gbGVhayBzdG9yZSBmb3IgdW5jYXVnaHQgZnJvemVuIG9iamVjdHNcbiAgICAgIGlmKGl0ZXJhYmxlICE9IHVuZGVmaW5lZClmb3JPZihpdGVyYWJsZSwgSVNfTUFQLCB0aGF0W0FEREVSXSwgdGhhdCk7XG4gICAgfSk7XG4gICAgcmVkZWZpbmVBbGwoQy5wcm90b3R5cGUsIHtcbiAgICAgIC8vIDIzLjMuMy4yIFdlYWtNYXAucHJvdG90eXBlLmRlbGV0ZShrZXkpXG4gICAgICAvLyAyMy40LjMuMyBXZWFrU2V0LnByb3RvdHlwZS5kZWxldGUodmFsdWUpXG4gICAgICAnZGVsZXRlJzogZnVuY3Rpb24oa2V5KXtcbiAgICAgICAgaWYoIWlzT2JqZWN0KGtleSkpcmV0dXJuIGZhbHNlO1xuICAgICAgICB2YXIgZGF0YSA9IGdldFdlYWsoa2V5KTtcbiAgICAgICAgaWYoZGF0YSA9PT0gdHJ1ZSlyZXR1cm4gdW5jYXVnaHRGcm96ZW5TdG9yZSh0aGlzKVsnZGVsZXRlJ10oa2V5KTtcbiAgICAgICAgcmV0dXJuIGRhdGEgJiYgJGhhcyhkYXRhLCB0aGlzLl9pKSAmJiBkZWxldGUgZGF0YVt0aGlzLl9pXTtcbiAgICAgIH0sXG4gICAgICAvLyAyMy4zLjMuNCBXZWFrTWFwLnByb3RvdHlwZS5oYXMoa2V5KVxuICAgICAgLy8gMjMuNC4zLjQgV2Vha1NldC5wcm90b3R5cGUuaGFzKHZhbHVlKVxuICAgICAgaGFzOiBmdW5jdGlvbiBoYXMoa2V5KXtcbiAgICAgICAgaWYoIWlzT2JqZWN0KGtleSkpcmV0dXJuIGZhbHNlO1xuICAgICAgICB2YXIgZGF0YSA9IGdldFdlYWsoa2V5KTtcbiAgICAgICAgaWYoZGF0YSA9PT0gdHJ1ZSlyZXR1cm4gdW5jYXVnaHRGcm96ZW5TdG9yZSh0aGlzKS5oYXMoa2V5KTtcbiAgICAgICAgcmV0dXJuIGRhdGEgJiYgJGhhcyhkYXRhLCB0aGlzLl9pKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICByZXR1cm4gQztcbiAgfSxcbiAgZGVmOiBmdW5jdGlvbih0aGF0LCBrZXksIHZhbHVlKXtcbiAgICB2YXIgZGF0YSA9IGdldFdlYWsoYW5PYmplY3Qoa2V5KSwgdHJ1ZSk7XG4gICAgaWYoZGF0YSA9PT0gdHJ1ZSl1bmNhdWdodEZyb3plblN0b3JlKHRoYXQpLnNldChrZXksIHZhbHVlKTtcbiAgICBlbHNlIGRhdGFbdGhhdC5faV0gPSB2YWx1ZTtcbiAgICByZXR1cm4gdGhhdDtcbiAgfSxcbiAgdWZzdG9yZTogdW5jYXVnaHRGcm96ZW5TdG9yZVxufTsiLCIndXNlIHN0cmljdCc7XG52YXIgZ2xvYmFsICAgICAgICAgICAgPSByZXF1aXJlKCcuL19nbG9iYWwnKVxuICAsICRleHBvcnQgICAgICAgICAgID0gcmVxdWlyZSgnLi9fZXhwb3J0JylcbiAgLCByZWRlZmluZSAgICAgICAgICA9IHJlcXVpcmUoJy4vX3JlZGVmaW5lJylcbiAgLCByZWRlZmluZUFsbCAgICAgICA9IHJlcXVpcmUoJy4vX3JlZGVmaW5lLWFsbCcpXG4gICwgbWV0YSAgICAgICAgICAgICAgPSByZXF1aXJlKCcuL19tZXRhJylcbiAgLCBmb3JPZiAgICAgICAgICAgICA9IHJlcXVpcmUoJy4vX2Zvci1vZicpXG4gICwgYW5JbnN0YW5jZSAgICAgICAgPSByZXF1aXJlKCcuL19hbi1pbnN0YW5jZScpXG4gICwgaXNPYmplY3QgICAgICAgICAgPSByZXF1aXJlKCcuL19pcy1vYmplY3QnKVxuICAsIGZhaWxzICAgICAgICAgICAgID0gcmVxdWlyZSgnLi9fZmFpbHMnKVxuICAsICRpdGVyRGV0ZWN0ICAgICAgID0gcmVxdWlyZSgnLi9faXRlci1kZXRlY3QnKVxuICAsIHNldFRvU3RyaW5nVGFnICAgID0gcmVxdWlyZSgnLi9fc2V0LXRvLXN0cmluZy10YWcnKVxuICAsIGluaGVyaXRJZlJlcXVpcmVkID0gcmVxdWlyZSgnLi9faW5oZXJpdC1pZi1yZXF1aXJlZCcpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKE5BTUUsIHdyYXBwZXIsIG1ldGhvZHMsIGNvbW1vbiwgSVNfTUFQLCBJU19XRUFLKXtcbiAgdmFyIEJhc2UgID0gZ2xvYmFsW05BTUVdXG4gICAgLCBDICAgICA9IEJhc2VcbiAgICAsIEFEREVSID0gSVNfTUFQID8gJ3NldCcgOiAnYWRkJ1xuICAgICwgcHJvdG8gPSBDICYmIEMucHJvdG90eXBlXG4gICAgLCBPICAgICA9IHt9O1xuICB2YXIgZml4TWV0aG9kID0gZnVuY3Rpb24oS0VZKXtcbiAgICB2YXIgZm4gPSBwcm90b1tLRVldO1xuICAgIHJlZGVmaW5lKHByb3RvLCBLRVksXG4gICAgICBLRVkgPT0gJ2RlbGV0ZScgPyBmdW5jdGlvbihhKXtcbiAgICAgICAgcmV0dXJuIElTX1dFQUsgJiYgIWlzT2JqZWN0KGEpID8gZmFsc2UgOiBmbi5jYWxsKHRoaXMsIGEgPT09IDAgPyAwIDogYSk7XG4gICAgICB9IDogS0VZID09ICdoYXMnID8gZnVuY3Rpb24gaGFzKGEpe1xuICAgICAgICByZXR1cm4gSVNfV0VBSyAmJiAhaXNPYmplY3QoYSkgPyBmYWxzZSA6IGZuLmNhbGwodGhpcywgYSA9PT0gMCA/IDAgOiBhKTtcbiAgICAgIH0gOiBLRVkgPT0gJ2dldCcgPyBmdW5jdGlvbiBnZXQoYSl7XG4gICAgICAgIHJldHVybiBJU19XRUFLICYmICFpc09iamVjdChhKSA/IHVuZGVmaW5lZCA6IGZuLmNhbGwodGhpcywgYSA9PT0gMCA/IDAgOiBhKTtcbiAgICAgIH0gOiBLRVkgPT0gJ2FkZCcgPyBmdW5jdGlvbiBhZGQoYSl7IGZuLmNhbGwodGhpcywgYSA9PT0gMCA/IDAgOiBhKTsgcmV0dXJuIHRoaXM7IH1cbiAgICAgICAgOiBmdW5jdGlvbiBzZXQoYSwgYil7IGZuLmNhbGwodGhpcywgYSA9PT0gMCA/IDAgOiBhLCBiKTsgcmV0dXJuIHRoaXM7IH1cbiAgICApO1xuICB9O1xuICBpZih0eXBlb2YgQyAhPSAnZnVuY3Rpb24nIHx8ICEoSVNfV0VBSyB8fCBwcm90by5mb3JFYWNoICYmICFmYWlscyhmdW5jdGlvbigpe1xuICAgIG5ldyBDKCkuZW50cmllcygpLm5leHQoKTtcbiAgfSkpKXtcbiAgICAvLyBjcmVhdGUgY29sbGVjdGlvbiBjb25zdHJ1Y3RvclxuICAgIEMgPSBjb21tb24uZ2V0Q29uc3RydWN0b3Iod3JhcHBlciwgTkFNRSwgSVNfTUFQLCBBRERFUik7XG4gICAgcmVkZWZpbmVBbGwoQy5wcm90b3R5cGUsIG1ldGhvZHMpO1xuICAgIG1ldGEuTkVFRCA9IHRydWU7XG4gIH0gZWxzZSB7XG4gICAgdmFyIGluc3RhbmNlICAgICAgICAgICAgID0gbmV3IENcbiAgICAgIC8vIGVhcmx5IGltcGxlbWVudGF0aW9ucyBub3Qgc3VwcG9ydHMgY2hhaW5pbmdcbiAgICAgICwgSEFTTlRfQ0hBSU5JTkcgICAgICAgPSBpbnN0YW5jZVtBRERFUl0oSVNfV0VBSyA/IHt9IDogLTAsIDEpICE9IGluc3RhbmNlXG4gICAgICAvLyBWOCB+ICBDaHJvbWl1bSA0MC0gd2Vhay1jb2xsZWN0aW9ucyB0aHJvd3Mgb24gcHJpbWl0aXZlcywgYnV0IHNob3VsZCByZXR1cm4gZmFsc2VcbiAgICAgICwgVEhST1dTX09OX1BSSU1JVElWRVMgPSBmYWlscyhmdW5jdGlvbigpeyBpbnN0YW5jZS5oYXMoMSk7IH0pXG4gICAgICAvLyBtb3N0IGVhcmx5IGltcGxlbWVudGF0aW9ucyBkb2Vzbid0IHN1cHBvcnRzIGl0ZXJhYmxlcywgbW9zdCBtb2Rlcm4gLSBub3QgY2xvc2UgaXQgY29ycmVjdGx5XG4gICAgICAsIEFDQ0VQVF9JVEVSQUJMRVMgICAgID0gJGl0ZXJEZXRlY3QoZnVuY3Rpb24oaXRlcil7IG5ldyBDKGl0ZXIpOyB9KSAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLW5ld1xuICAgICAgLy8gZm9yIGVhcmx5IGltcGxlbWVudGF0aW9ucyAtMCBhbmQgKzAgbm90IHRoZSBzYW1lXG4gICAgICAsIEJVR0dZX1pFUk8gPSAhSVNfV0VBSyAmJiBmYWlscyhmdW5jdGlvbigpe1xuICAgICAgICAvLyBWOCB+IENocm9taXVtIDQyLSBmYWlscyBvbmx5IHdpdGggNSsgZWxlbWVudHNcbiAgICAgICAgdmFyICRpbnN0YW5jZSA9IG5ldyBDKClcbiAgICAgICAgICAsIGluZGV4ICAgICA9IDU7XG4gICAgICAgIHdoaWxlKGluZGV4LS0pJGluc3RhbmNlW0FEREVSXShpbmRleCwgaW5kZXgpO1xuICAgICAgICByZXR1cm4gISRpbnN0YW5jZS5oYXMoLTApO1xuICAgICAgfSk7XG4gICAgaWYoIUFDQ0VQVF9JVEVSQUJMRVMpeyBcbiAgICAgIEMgPSB3cmFwcGVyKGZ1bmN0aW9uKHRhcmdldCwgaXRlcmFibGUpe1xuICAgICAgICBhbkluc3RhbmNlKHRhcmdldCwgQywgTkFNRSk7XG4gICAgICAgIHZhciB0aGF0ID0gaW5oZXJpdElmUmVxdWlyZWQobmV3IEJhc2UsIHRhcmdldCwgQyk7XG4gICAgICAgIGlmKGl0ZXJhYmxlICE9IHVuZGVmaW5lZClmb3JPZihpdGVyYWJsZSwgSVNfTUFQLCB0aGF0W0FEREVSXSwgdGhhdCk7XG4gICAgICAgIHJldHVybiB0aGF0O1xuICAgICAgfSk7XG4gICAgICBDLnByb3RvdHlwZSA9IHByb3RvO1xuICAgICAgcHJvdG8uY29uc3RydWN0b3IgPSBDO1xuICAgIH1cbiAgICBpZihUSFJPV1NfT05fUFJJTUlUSVZFUyB8fCBCVUdHWV9aRVJPKXtcbiAgICAgIGZpeE1ldGhvZCgnZGVsZXRlJyk7XG4gICAgICBmaXhNZXRob2QoJ2hhcycpO1xuICAgICAgSVNfTUFQICYmIGZpeE1ldGhvZCgnZ2V0Jyk7XG4gICAgfVxuICAgIGlmKEJVR0dZX1pFUk8gfHwgSEFTTlRfQ0hBSU5JTkcpZml4TWV0aG9kKEFEREVSKTtcbiAgICAvLyB3ZWFrIGNvbGxlY3Rpb25zIHNob3VsZCBub3QgY29udGFpbnMgLmNsZWFyIG1ldGhvZFxuICAgIGlmKElTX1dFQUsgJiYgcHJvdG8uY2xlYXIpZGVsZXRlIHByb3RvLmNsZWFyO1xuICB9XG5cbiAgc2V0VG9TdHJpbmdUYWcoQywgTkFNRSk7XG5cbiAgT1tOQU1FXSA9IEM7XG4gICRleHBvcnQoJGV4cG9ydC5HICsgJGV4cG9ydC5XICsgJGV4cG9ydC5GICogKEMgIT0gQmFzZSksIE8pO1xuXG4gIGlmKCFJU19XRUFLKWNvbW1vbi5zZXRTdHJvbmcoQywgTkFNRSwgSVNfTUFQKTtcblxuICByZXR1cm4gQztcbn07IiwidmFyIGNvcmUgPSBtb2R1bGUuZXhwb3J0cyA9IHt2ZXJzaW9uOiAnMi4yLjEnfTtcbmlmKHR5cGVvZiBfX2UgPT0gJ251bWJlcicpX19lID0gY29yZTsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bmRlZiIsIi8vIG9wdGlvbmFsIC8gc2ltcGxlIGNvbnRleHQgYmluZGluZ1xudmFyIGFGdW5jdGlvbiA9IHJlcXVpcmUoJy4vX2EtZnVuY3Rpb24nKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oZm4sIHRoYXQsIGxlbmd0aCl7XG4gIGFGdW5jdGlvbihmbik7XG4gIGlmKHRoYXQgPT09IHVuZGVmaW5lZClyZXR1cm4gZm47XG4gIHN3aXRjaChsZW5ndGgpe1xuICAgIGNhc2UgMTogcmV0dXJuIGZ1bmN0aW9uKGEpe1xuICAgICAgcmV0dXJuIGZuLmNhbGwodGhhdCwgYSk7XG4gICAgfTtcbiAgICBjYXNlIDI6IHJldHVybiBmdW5jdGlvbihhLCBiKXtcbiAgICAgIHJldHVybiBmbi5jYWxsKHRoYXQsIGEsIGIpO1xuICAgIH07XG4gICAgY2FzZSAzOiByZXR1cm4gZnVuY3Rpb24oYSwgYiwgYyl7XG4gICAgICByZXR1cm4gZm4uY2FsbCh0aGF0LCBhLCBiLCBjKTtcbiAgICB9O1xuICB9XG4gIHJldHVybiBmdW5jdGlvbigvKiAuLi5hcmdzICovKXtcbiAgICByZXR1cm4gZm4uYXBwbHkodGhhdCwgYXJndW1lbnRzKTtcbiAgfTtcbn07IiwiJ3VzZSBzdHJpY3QnO1xyXG52YXIgYW5PYmplY3QgICAgPSByZXF1aXJlKCcuL19hbi1vYmplY3QnKVxyXG4gICwgdG9QcmltaXRpdmUgPSByZXF1aXJlKCcuL190by1wcmltaXRpdmUnKVxyXG4gICwgTlVNQkVSICAgICAgPSAnbnVtYmVyJztcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oaGludCl7XHJcbiAgaWYoaGludCAhPT0gJ3N0cmluZycgJiYgaGludCAhPT0gTlVNQkVSICYmIGhpbnQgIT09ICdkZWZhdWx0Jyl0aHJvdyBUeXBlRXJyb3IoJ0luY29ycmVjdCBoaW50Jyk7XHJcbiAgcmV0dXJuIHRvUHJpbWl0aXZlKGFuT2JqZWN0KHRoaXMpLCBoaW50ICE9IE5VTUJFUik7XHJcbn07IiwiLy8gNy4yLjEgUmVxdWlyZU9iamVjdENvZXJjaWJsZShhcmd1bWVudClcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oaXQpe1xuICBpZihpdCA9PSB1bmRlZmluZWQpdGhyb3cgVHlwZUVycm9yKFwiQ2FuJ3QgY2FsbCBtZXRob2Qgb24gIFwiICsgaXQpO1xuICByZXR1cm4gaXQ7XG59OyIsIi8vIFRoYW5rJ3MgSUU4IGZvciBoaXMgZnVubnkgZGVmaW5lUHJvcGVydHlcbm1vZHVsZS5leHBvcnRzID0gIXJlcXVpcmUoJy4vX2ZhaWxzJykoZnVuY3Rpb24oKXtcbiAgcmV0dXJuIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh7fSwgJ2EnLCB7Z2V0OiBmdW5jdGlvbigpeyByZXR1cm4gNzsgfX0pLmEgIT0gNztcbn0pOyIsInZhciBpc09iamVjdCA9IHJlcXVpcmUoJy4vX2lzLW9iamVjdCcpXG4gICwgZG9jdW1lbnQgPSByZXF1aXJlKCcuL19nbG9iYWwnKS5kb2N1bWVudFxuICAvLyBpbiBvbGQgSUUgdHlwZW9mIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQgaXMgJ29iamVjdCdcbiAgLCBpcyA9IGlzT2JqZWN0KGRvY3VtZW50KSAmJiBpc09iamVjdChkb2N1bWVudC5jcmVhdGVFbGVtZW50KTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oaXQpe1xuICByZXR1cm4gaXMgPyBkb2N1bWVudC5jcmVhdGVFbGVtZW50KGl0KSA6IHt9O1xufTsiLCIvLyBJRSA4LSBkb24ndCBlbnVtIGJ1ZyBrZXlzXHJcbm1vZHVsZS5leHBvcnRzID0gKFxyXG4gICdjb25zdHJ1Y3RvcixoYXNPd25Qcm9wZXJ0eSxpc1Byb3RvdHlwZU9mLHByb3BlcnR5SXNFbnVtZXJhYmxlLHRvTG9jYWxlU3RyaW5nLHRvU3RyaW5nLHZhbHVlT2YnXHJcbikuc3BsaXQoJywnKTsiLCIvLyBhbGwgZW51bWVyYWJsZSBvYmplY3Qga2V5cywgaW5jbHVkZXMgc3ltYm9sc1xudmFyIGdldEtleXMgPSByZXF1aXJlKCcuL19vYmplY3Qta2V5cycpXG4gICwgZ09QUyAgICA9IHJlcXVpcmUoJy4vX29iamVjdC1nb3BzJylcbiAgLCBwSUUgICAgID0gcmVxdWlyZSgnLi9fb2JqZWN0LXBpZScpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpdCl7XG4gIHZhciByZXN1bHQgICAgID0gZ2V0S2V5cyhpdClcbiAgICAsIGdldFN5bWJvbHMgPSBnT1BTLmY7XG4gIGlmKGdldFN5bWJvbHMpe1xuICAgIHZhciBzeW1ib2xzID0gZ2V0U3ltYm9scyhpdClcbiAgICAgICwgaXNFbnVtICA9IHBJRS5mXG4gICAgICAsIGkgICAgICAgPSAwXG4gICAgICAsIGtleTtcbiAgICB3aGlsZShzeW1ib2xzLmxlbmd0aCA+IGkpaWYoaXNFbnVtLmNhbGwoaXQsIGtleSA9IHN5bWJvbHNbaSsrXSkpcmVzdWx0LnB1c2goa2V5KTtcbiAgfSByZXR1cm4gcmVzdWx0O1xufTsiLCJ2YXIgZ2xvYmFsICAgID0gcmVxdWlyZSgnLi9fZ2xvYmFsJylcbiAgLCBjb3JlICAgICAgPSByZXF1aXJlKCcuL19jb3JlJylcbiAgLCBoaWRlICAgICAgPSByZXF1aXJlKCcuL19oaWRlJylcbiAgLCByZWRlZmluZSAgPSByZXF1aXJlKCcuL19yZWRlZmluZScpXG4gICwgY3R4ICAgICAgID0gcmVxdWlyZSgnLi9fY3R4JylcbiAgLCBQUk9UT1RZUEUgPSAncHJvdG90eXBlJztcblxudmFyICRleHBvcnQgPSBmdW5jdGlvbih0eXBlLCBuYW1lLCBzb3VyY2Upe1xuICB2YXIgSVNfRk9SQ0VEID0gdHlwZSAmICRleHBvcnQuRlxuICAgICwgSVNfR0xPQkFMID0gdHlwZSAmICRleHBvcnQuR1xuICAgICwgSVNfU1RBVElDID0gdHlwZSAmICRleHBvcnQuU1xuICAgICwgSVNfUFJPVE8gID0gdHlwZSAmICRleHBvcnQuUFxuICAgICwgSVNfQklORCAgID0gdHlwZSAmICRleHBvcnQuQlxuICAgICwgdGFyZ2V0ICAgID0gSVNfR0xPQkFMID8gZ2xvYmFsIDogSVNfU1RBVElDID8gZ2xvYmFsW25hbWVdIHx8IChnbG9iYWxbbmFtZV0gPSB7fSkgOiAoZ2xvYmFsW25hbWVdIHx8IHt9KVtQUk9UT1RZUEVdXG4gICAgLCBleHBvcnRzICAgPSBJU19HTE9CQUwgPyBjb3JlIDogY29yZVtuYW1lXSB8fCAoY29yZVtuYW1lXSA9IHt9KVxuICAgICwgZXhwUHJvdG8gID0gZXhwb3J0c1tQUk9UT1RZUEVdIHx8IChleHBvcnRzW1BST1RPVFlQRV0gPSB7fSlcbiAgICAsIGtleSwgb3duLCBvdXQsIGV4cDtcbiAgaWYoSVNfR0xPQkFMKXNvdXJjZSA9IG5hbWU7XG4gIGZvcihrZXkgaW4gc291cmNlKXtcbiAgICAvLyBjb250YWlucyBpbiBuYXRpdmVcbiAgICBvd24gPSAhSVNfRk9SQ0VEICYmIHRhcmdldCAmJiB0YXJnZXRba2V5XSAhPT0gdW5kZWZpbmVkO1xuICAgIC8vIGV4cG9ydCBuYXRpdmUgb3IgcGFzc2VkXG4gICAgb3V0ID0gKG93biA/IHRhcmdldCA6IHNvdXJjZSlba2V5XTtcbiAgICAvLyBiaW5kIHRpbWVycyB0byBnbG9iYWwgZm9yIGNhbGwgZnJvbSBleHBvcnQgY29udGV4dFxuICAgIGV4cCA9IElTX0JJTkQgJiYgb3duID8gY3R4KG91dCwgZ2xvYmFsKSA6IElTX1BST1RPICYmIHR5cGVvZiBvdXQgPT0gJ2Z1bmN0aW9uJyA/IGN0eChGdW5jdGlvbi5jYWxsLCBvdXQpIDogb3V0O1xuICAgIC8vIGV4dGVuZCBnbG9iYWxcbiAgICBpZih0YXJnZXQpcmVkZWZpbmUodGFyZ2V0LCBrZXksIG91dCwgdHlwZSAmICRleHBvcnQuVSk7XG4gICAgLy8gZXhwb3J0XG4gICAgaWYoZXhwb3J0c1trZXldICE9IG91dCloaWRlKGV4cG9ydHMsIGtleSwgZXhwKTtcbiAgICBpZihJU19QUk9UTyAmJiBleHBQcm90b1trZXldICE9IG91dClleHBQcm90b1trZXldID0gb3V0O1xuICB9XG59O1xuZ2xvYmFsLmNvcmUgPSBjb3JlO1xuLy8gdHlwZSBiaXRtYXBcbiRleHBvcnQuRiA9IDE7ICAgLy8gZm9yY2VkXG4kZXhwb3J0LkcgPSAyOyAgIC8vIGdsb2JhbFxuJGV4cG9ydC5TID0gNDsgICAvLyBzdGF0aWNcbiRleHBvcnQuUCA9IDg7ICAgLy8gcHJvdG9cbiRleHBvcnQuQiA9IDE2OyAgLy8gYmluZFxuJGV4cG9ydC5XID0gMzI7ICAvLyB3cmFwXG4kZXhwb3J0LlUgPSA2NDsgIC8vIHNhZmVcbiRleHBvcnQuUiA9IDEyODsgLy8gcmVhbCBwcm90byBtZXRob2QgZm9yIGBsaWJyYXJ5YCBcbm1vZHVsZS5leHBvcnRzID0gJGV4cG9ydDsiLCJ2YXIgTUFUQ0ggPSByZXF1aXJlKCcuL193a3MnKSgnbWF0Y2gnKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oS0VZKXtcbiAgdmFyIHJlID0gLy4vO1xuICB0cnkge1xuICAgICcvLi8nW0tFWV0ocmUpO1xuICB9IGNhdGNoKGUpe1xuICAgIHRyeSB7XG4gICAgICByZVtNQVRDSF0gPSBmYWxzZTtcbiAgICAgIHJldHVybiAhJy8uLydbS0VZXShyZSk7XG4gICAgfSBjYXRjaChmKXsgLyogZW1wdHkgKi8gfVxuICB9IHJldHVybiB0cnVlO1xufTsiLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGV4ZWMpe1xuICB0cnkge1xuICAgIHJldHVybiAhIWV4ZWMoKTtcbiAgfSBjYXRjaChlKXtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxufTsiLCIndXNlIHN0cmljdCc7XG52YXIgaGlkZSAgICAgPSByZXF1aXJlKCcuL19oaWRlJylcbiAgLCByZWRlZmluZSA9IHJlcXVpcmUoJy4vX3JlZGVmaW5lJylcbiAgLCBmYWlscyAgICA9IHJlcXVpcmUoJy4vX2ZhaWxzJylcbiAgLCBkZWZpbmVkICA9IHJlcXVpcmUoJy4vX2RlZmluZWQnKVxuICAsIHdrcyAgICAgID0gcmVxdWlyZSgnLi9fd2tzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oS0VZLCBsZW5ndGgsIGV4ZWMpe1xuICB2YXIgU1lNQk9MICAgPSB3a3MoS0VZKVxuICAgICwgZm5zICAgICAgPSBleGVjKGRlZmluZWQsIFNZTUJPTCwgJydbS0VZXSlcbiAgICAsIHN0cmZuICAgID0gZm5zWzBdXG4gICAgLCByeGZuICAgICA9IGZuc1sxXTtcbiAgaWYoZmFpbHMoZnVuY3Rpb24oKXtcbiAgICB2YXIgTyA9IHt9O1xuICAgIE9bU1lNQk9MXSA9IGZ1bmN0aW9uKCl7IHJldHVybiA3OyB9O1xuICAgIHJldHVybiAnJ1tLRVldKE8pICE9IDc7XG4gIH0pKXtcbiAgICByZWRlZmluZShTdHJpbmcucHJvdG90eXBlLCBLRVksIHN0cmZuKTtcbiAgICBoaWRlKFJlZ0V4cC5wcm90b3R5cGUsIFNZTUJPTCwgbGVuZ3RoID09IDJcbiAgICAgIC8vIDIxLjIuNS44IFJlZ0V4cC5wcm90b3R5cGVbQEByZXBsYWNlXShzdHJpbmcsIHJlcGxhY2VWYWx1ZSlcbiAgICAgIC8vIDIxLjIuNS4xMSBSZWdFeHAucHJvdG90eXBlW0BAc3BsaXRdKHN0cmluZywgbGltaXQpXG4gICAgICA/IGZ1bmN0aW9uKHN0cmluZywgYXJnKXsgcmV0dXJuIHJ4Zm4uY2FsbChzdHJpbmcsIHRoaXMsIGFyZyk7IH1cbiAgICAgIC8vIDIxLjIuNS42IFJlZ0V4cC5wcm90b3R5cGVbQEBtYXRjaF0oc3RyaW5nKVxuICAgICAgLy8gMjEuMi41LjkgUmVnRXhwLnByb3RvdHlwZVtAQHNlYXJjaF0oc3RyaW5nKVxuICAgICAgOiBmdW5jdGlvbihzdHJpbmcpeyByZXR1cm4gcnhmbi5jYWxsKHN0cmluZywgdGhpcyk7IH1cbiAgICApO1xuICB9XG59OyIsIid1c2Ugc3RyaWN0Jztcbi8vIDIxLjIuNS4zIGdldCBSZWdFeHAucHJvdG90eXBlLmZsYWdzXG52YXIgYW5PYmplY3QgPSByZXF1aXJlKCcuL19hbi1vYmplY3QnKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oKXtcbiAgdmFyIHRoYXQgICA9IGFuT2JqZWN0KHRoaXMpXG4gICAgLCByZXN1bHQgPSAnJztcbiAgaWYodGhhdC5nbG9iYWwpICAgICByZXN1bHQgKz0gJ2cnO1xuICBpZih0aGF0Lmlnbm9yZUNhc2UpIHJlc3VsdCArPSAnaSc7XG4gIGlmKHRoYXQubXVsdGlsaW5lKSAgcmVzdWx0ICs9ICdtJztcbiAgaWYodGhhdC51bmljb2RlKSAgICByZXN1bHQgKz0gJ3UnO1xuICBpZih0aGF0LnN0aWNreSkgICAgIHJlc3VsdCArPSAneSc7XG4gIHJldHVybiByZXN1bHQ7XG59OyIsInZhciBjdHggICAgICAgICA9IHJlcXVpcmUoJy4vX2N0eCcpXG4gICwgY2FsbCAgICAgICAgPSByZXF1aXJlKCcuL19pdGVyLWNhbGwnKVxuICAsIGlzQXJyYXlJdGVyID0gcmVxdWlyZSgnLi9faXMtYXJyYXktaXRlcicpXG4gICwgYW5PYmplY3QgICAgPSByZXF1aXJlKCcuL19hbi1vYmplY3QnKVxuICAsIHRvTGVuZ3RoICAgID0gcmVxdWlyZSgnLi9fdG8tbGVuZ3RoJylcbiAgLCBnZXRJdGVyRm4gICA9IHJlcXVpcmUoJy4vY29yZS5nZXQtaXRlcmF0b3ItbWV0aG9kJyk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGl0ZXJhYmxlLCBlbnRyaWVzLCBmbiwgdGhhdCwgSVRFUkFUT1Ipe1xuICB2YXIgaXRlckZuID0gSVRFUkFUT1IgPyBmdW5jdGlvbigpeyByZXR1cm4gaXRlcmFibGU7IH0gOiBnZXRJdGVyRm4oaXRlcmFibGUpXG4gICAgLCBmICAgICAgPSBjdHgoZm4sIHRoYXQsIGVudHJpZXMgPyAyIDogMSlcbiAgICAsIGluZGV4ICA9IDBcbiAgICAsIGxlbmd0aCwgc3RlcCwgaXRlcmF0b3I7XG4gIGlmKHR5cGVvZiBpdGVyRm4gIT0gJ2Z1bmN0aW9uJyl0aHJvdyBUeXBlRXJyb3IoaXRlcmFibGUgKyAnIGlzIG5vdCBpdGVyYWJsZSEnKTtcbiAgLy8gZmFzdCBjYXNlIGZvciBhcnJheXMgd2l0aCBkZWZhdWx0IGl0ZXJhdG9yXG4gIGlmKGlzQXJyYXlJdGVyKGl0ZXJGbikpZm9yKGxlbmd0aCA9IHRvTGVuZ3RoKGl0ZXJhYmxlLmxlbmd0aCk7IGxlbmd0aCA+IGluZGV4OyBpbmRleCsrKXtcbiAgICBlbnRyaWVzID8gZihhbk9iamVjdChzdGVwID0gaXRlcmFibGVbaW5kZXhdKVswXSwgc3RlcFsxXSkgOiBmKGl0ZXJhYmxlW2luZGV4XSk7XG4gIH0gZWxzZSBmb3IoaXRlcmF0b3IgPSBpdGVyRm4uY2FsbChpdGVyYWJsZSk7ICEoc3RlcCA9IGl0ZXJhdG9yLm5leHQoKSkuZG9uZTsgKXtcbiAgICBjYWxsKGl0ZXJhdG9yLCBmLCBzdGVwLnZhbHVlLCBlbnRyaWVzKTtcbiAgfVxufTsiLCIvLyBodHRwczovL2dpdGh1Yi5jb20vemxvaXJvY2svY29yZS1qcy9pc3N1ZXMvODYjaXNzdWVjb21tZW50LTExNTc1OTAyOFxudmFyIGdsb2JhbCA9IG1vZHVsZS5leHBvcnRzID0gdHlwZW9mIHdpbmRvdyAhPSAndW5kZWZpbmVkJyAmJiB3aW5kb3cuTWF0aCA9PSBNYXRoXG4gID8gd2luZG93IDogdHlwZW9mIHNlbGYgIT0gJ3VuZGVmaW5lZCcgJiYgc2VsZi5NYXRoID09IE1hdGggPyBzZWxmIDogRnVuY3Rpb24oJ3JldHVybiB0aGlzJykoKTtcbmlmKHR5cGVvZiBfX2cgPT0gJ251bWJlcicpX19nID0gZ2xvYmFsOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVuZGVmIiwidmFyIGhhc093blByb3BlcnR5ID0ge30uaGFzT3duUHJvcGVydHk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGl0LCBrZXkpe1xuICByZXR1cm4gaGFzT3duUHJvcGVydHkuY2FsbChpdCwga2V5KTtcbn07IiwidmFyIGRQICAgICAgICAgPSByZXF1aXJlKCcuL19vYmplY3QtZHAnKVxuICAsIGNyZWF0ZURlc2MgPSByZXF1aXJlKCcuL19wcm9wZXJ0eS1kZXNjJyk7XG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vX2Rlc2NyaXB0b3JzJykgPyBmdW5jdGlvbihvYmplY3QsIGtleSwgdmFsdWUpe1xuICByZXR1cm4gZFAuZihvYmplY3QsIGtleSwgY3JlYXRlRGVzYygxLCB2YWx1ZSkpO1xufSA6IGZ1bmN0aW9uKG9iamVjdCwga2V5LCB2YWx1ZSl7XG4gIG9iamVjdFtrZXldID0gdmFsdWU7XG4gIHJldHVybiBvYmplY3Q7XG59OyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9fZ2xvYmFsJykuZG9jdW1lbnQgJiYgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50OyIsIm1vZHVsZS5leHBvcnRzID0gIXJlcXVpcmUoJy4vX2Rlc2NyaXB0b3JzJykgJiYgIXJlcXVpcmUoJy4vX2ZhaWxzJykoZnVuY3Rpb24oKXtcclxuICByZXR1cm4gT2JqZWN0LmRlZmluZVByb3BlcnR5KHJlcXVpcmUoJy4vX2RvbS1jcmVhdGUnKSgnZGl2JyksICdhJywge2dldDogZnVuY3Rpb24oKXsgcmV0dXJuIDc7IH19KS5hICE9IDc7XHJcbn0pOyIsInZhciBpc09iamVjdCAgICAgICA9IHJlcXVpcmUoJy4vX2lzLW9iamVjdCcpXHJcbiAgLCBzZXRQcm90b3R5cGVPZiA9IHJlcXVpcmUoJy4vX3NldC1wcm90bycpLnNldDtcclxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbih0aGF0LCB0YXJnZXQsIEMpe1xyXG4gIHZhciBQLCBTID0gdGFyZ2V0LmNvbnN0cnVjdG9yO1xyXG4gIGlmKFMgIT09IEMgJiYgdHlwZW9mIFMgPT0gJ2Z1bmN0aW9uJyAmJiAoUCA9IFMucHJvdG90eXBlKSAhPT0gQy5wcm90b3R5cGUgJiYgaXNPYmplY3QoUCkgJiYgc2V0UHJvdG90eXBlT2Ype1xyXG4gICAgc2V0UHJvdG90eXBlT2YodGhhdCwgUCk7XHJcbiAgfSByZXR1cm4gdGhhdDtcclxufTsiLCIvLyBmYXN0IGFwcGx5LCBodHRwOi8vanNwZXJmLmxua2l0LmNvbS9mYXN0LWFwcGx5LzVcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oZm4sIGFyZ3MsIHRoYXQpe1xuICB2YXIgdW4gPSB0aGF0ID09PSB1bmRlZmluZWQ7XG4gIHN3aXRjaChhcmdzLmxlbmd0aCl7XG4gICAgY2FzZSAwOiByZXR1cm4gdW4gPyBmbigpXG4gICAgICAgICAgICAgICAgICAgICAgOiBmbi5jYWxsKHRoYXQpO1xuICAgIGNhc2UgMTogcmV0dXJuIHVuID8gZm4oYXJnc1swXSlcbiAgICAgICAgICAgICAgICAgICAgICA6IGZuLmNhbGwodGhhdCwgYXJnc1swXSk7XG4gICAgY2FzZSAyOiByZXR1cm4gdW4gPyBmbihhcmdzWzBdLCBhcmdzWzFdKVxuICAgICAgICAgICAgICAgICAgICAgIDogZm4uY2FsbCh0aGF0LCBhcmdzWzBdLCBhcmdzWzFdKTtcbiAgICBjYXNlIDM6IHJldHVybiB1biA/IGZuKGFyZ3NbMF0sIGFyZ3NbMV0sIGFyZ3NbMl0pXG4gICAgICAgICAgICAgICAgICAgICAgOiBmbi5jYWxsKHRoYXQsIGFyZ3NbMF0sIGFyZ3NbMV0sIGFyZ3NbMl0pO1xuICAgIGNhc2UgNDogcmV0dXJuIHVuID8gZm4oYXJnc1swXSwgYXJnc1sxXSwgYXJnc1syXSwgYXJnc1szXSlcbiAgICAgICAgICAgICAgICAgICAgICA6IGZuLmNhbGwodGhhdCwgYXJnc1swXSwgYXJnc1sxXSwgYXJnc1syXSwgYXJnc1szXSk7XG4gIH0gcmV0dXJuICAgICAgICAgICAgICBmbi5hcHBseSh0aGF0LCBhcmdzKTtcbn07IiwiLy8gZmFsbGJhY2sgZm9yIG5vbi1hcnJheS1saWtlIEVTMyBhbmQgbm9uLWVudW1lcmFibGUgb2xkIFY4IHN0cmluZ3NcbnZhciBjb2YgPSByZXF1aXJlKCcuL19jb2YnKTtcbm1vZHVsZS5leHBvcnRzID0gT2JqZWN0KCd6JykucHJvcGVydHlJc0VudW1lcmFibGUoMCkgPyBPYmplY3QgOiBmdW5jdGlvbihpdCl7XG4gIHJldHVybiBjb2YoaXQpID09ICdTdHJpbmcnID8gaXQuc3BsaXQoJycpIDogT2JqZWN0KGl0KTtcbn07IiwiLy8gY2hlY2sgb24gZGVmYXVsdCBBcnJheSBpdGVyYXRvclxudmFyIEl0ZXJhdG9ycyAgPSByZXF1aXJlKCcuL19pdGVyYXRvcnMnKVxuICAsIElURVJBVE9SICAgPSByZXF1aXJlKCcuL193a3MnKSgnaXRlcmF0b3InKVxuICAsIEFycmF5UHJvdG8gPSBBcnJheS5wcm90b3R5cGU7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oaXQpe1xuICByZXR1cm4gaXQgIT09IHVuZGVmaW5lZCAmJiAoSXRlcmF0b3JzLkFycmF5ID09PSBpdCB8fCBBcnJheVByb3RvW0lURVJBVE9SXSA9PT0gaXQpO1xufTsiLCIvLyA3LjIuMiBJc0FycmF5KGFyZ3VtZW50KVxudmFyIGNvZiA9IHJlcXVpcmUoJy4vX2NvZicpO1xubW9kdWxlLmV4cG9ydHMgPSBBcnJheS5pc0FycmF5IHx8IGZ1bmN0aW9uIGlzQXJyYXkoYXJnKXtcbiAgcmV0dXJuIGNvZihhcmcpID09ICdBcnJheSc7XG59OyIsIi8vIDIwLjEuMi4zIE51bWJlci5pc0ludGVnZXIobnVtYmVyKVxudmFyIGlzT2JqZWN0ID0gcmVxdWlyZSgnLi9faXMtb2JqZWN0JylcbiAgLCBmbG9vciAgICA9IE1hdGguZmxvb3I7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGlzSW50ZWdlcihpdCl7XG4gIHJldHVybiAhaXNPYmplY3QoaXQpICYmIGlzRmluaXRlKGl0KSAmJiBmbG9vcihpdCkgPT09IGl0O1xufTsiLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGl0KXtcbiAgcmV0dXJuIHR5cGVvZiBpdCA9PT0gJ29iamVjdCcgPyBpdCAhPT0gbnVsbCA6IHR5cGVvZiBpdCA9PT0gJ2Z1bmN0aW9uJztcbn07IiwiLy8gNy4yLjggSXNSZWdFeHAoYXJndW1lbnQpXG52YXIgaXNPYmplY3QgPSByZXF1aXJlKCcuL19pcy1vYmplY3QnKVxuICAsIGNvZiAgICAgID0gcmVxdWlyZSgnLi9fY29mJylcbiAgLCBNQVRDSCAgICA9IHJlcXVpcmUoJy4vX3drcycpKCdtYXRjaCcpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpdCl7XG4gIHZhciBpc1JlZ0V4cDtcbiAgcmV0dXJuIGlzT2JqZWN0KGl0KSAmJiAoKGlzUmVnRXhwID0gaXRbTUFUQ0hdKSAhPT0gdW5kZWZpbmVkID8gISFpc1JlZ0V4cCA6IGNvZihpdCkgPT0gJ1JlZ0V4cCcpO1xufTsiLCIvLyBjYWxsIHNvbWV0aGluZyBvbiBpdGVyYXRvciBzdGVwIHdpdGggc2FmZSBjbG9zaW5nIG9uIGVycm9yXG52YXIgYW5PYmplY3QgPSByZXF1aXJlKCcuL19hbi1vYmplY3QnKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oaXRlcmF0b3IsIGZuLCB2YWx1ZSwgZW50cmllcyl7XG4gIHRyeSB7XG4gICAgcmV0dXJuIGVudHJpZXMgPyBmbihhbk9iamVjdCh2YWx1ZSlbMF0sIHZhbHVlWzFdKSA6IGZuKHZhbHVlKTtcbiAgLy8gNy40LjYgSXRlcmF0b3JDbG9zZShpdGVyYXRvciwgY29tcGxldGlvbilcbiAgfSBjYXRjaChlKXtcbiAgICB2YXIgcmV0ID0gaXRlcmF0b3JbJ3JldHVybiddO1xuICAgIGlmKHJldCAhPT0gdW5kZWZpbmVkKWFuT2JqZWN0KHJldC5jYWxsKGl0ZXJhdG9yKSk7XG4gICAgdGhyb3cgZTtcbiAgfVxufTsiLCIndXNlIHN0cmljdCc7XG52YXIgY3JlYXRlICAgICAgICAgPSByZXF1aXJlKCcuL19vYmplY3QtY3JlYXRlJylcbiAgLCBkZXNjcmlwdG9yICAgICA9IHJlcXVpcmUoJy4vX3Byb3BlcnR5LWRlc2MnKVxuICAsIHNldFRvU3RyaW5nVGFnID0gcmVxdWlyZSgnLi9fc2V0LXRvLXN0cmluZy10YWcnKVxuICAsIEl0ZXJhdG9yUHJvdG90eXBlID0ge307XG5cbi8vIDI1LjEuMi4xLjEgJUl0ZXJhdG9yUHJvdG90eXBlJVtAQGl0ZXJhdG9yXSgpXG5yZXF1aXJlKCcuL19oaWRlJykoSXRlcmF0b3JQcm90b3R5cGUsIHJlcXVpcmUoJy4vX3drcycpKCdpdGVyYXRvcicpLCBmdW5jdGlvbigpeyByZXR1cm4gdGhpczsgfSk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oQ29uc3RydWN0b3IsIE5BTUUsIG5leHQpe1xuICBDb25zdHJ1Y3Rvci5wcm90b3R5cGUgPSBjcmVhdGUoSXRlcmF0b3JQcm90b3R5cGUsIHtuZXh0OiBkZXNjcmlwdG9yKDEsIG5leHQpfSk7XG4gIHNldFRvU3RyaW5nVGFnKENvbnN0cnVjdG9yLCBOQU1FICsgJyBJdGVyYXRvcicpO1xufTsiLCIndXNlIHN0cmljdCc7XG52YXIgTElCUkFSWSAgICAgICAgPSByZXF1aXJlKCcuL19saWJyYXJ5JylcbiAgLCAkZXhwb3J0ICAgICAgICA9IHJlcXVpcmUoJy4vX2V4cG9ydCcpXG4gICwgcmVkZWZpbmUgICAgICAgPSByZXF1aXJlKCcuL19yZWRlZmluZScpXG4gICwgaGlkZSAgICAgICAgICAgPSByZXF1aXJlKCcuL19oaWRlJylcbiAgLCBoYXMgICAgICAgICAgICA9IHJlcXVpcmUoJy4vX2hhcycpXG4gICwgSXRlcmF0b3JzICAgICAgPSByZXF1aXJlKCcuL19pdGVyYXRvcnMnKVxuICAsICRpdGVyQ3JlYXRlICAgID0gcmVxdWlyZSgnLi9faXRlci1jcmVhdGUnKVxuICAsIHNldFRvU3RyaW5nVGFnID0gcmVxdWlyZSgnLi9fc2V0LXRvLXN0cmluZy10YWcnKVxuICAsIGdldFByb3RvdHlwZU9mID0gcmVxdWlyZSgnLi9fb2JqZWN0LWdwbycpXG4gICwgSVRFUkFUT1IgICAgICAgPSByZXF1aXJlKCcuL193a3MnKSgnaXRlcmF0b3InKVxuICAsIEJVR0dZICAgICAgICAgID0gIShbXS5rZXlzICYmICduZXh0JyBpbiBbXS5rZXlzKCkpIC8vIFNhZmFyaSBoYXMgYnVnZ3kgaXRlcmF0b3JzIHcvbyBgbmV4dGBcbiAgLCBGRl9JVEVSQVRPUiAgICA9ICdAQGl0ZXJhdG9yJ1xuICAsIEtFWVMgICAgICAgICAgID0gJ2tleXMnXG4gICwgVkFMVUVTICAgICAgICAgPSAndmFsdWVzJztcblxudmFyIHJldHVyblRoaXMgPSBmdW5jdGlvbigpeyByZXR1cm4gdGhpczsgfTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihCYXNlLCBOQU1FLCBDb25zdHJ1Y3RvciwgbmV4dCwgREVGQVVMVCwgSVNfU0VULCBGT1JDRUQpe1xuICAkaXRlckNyZWF0ZShDb25zdHJ1Y3RvciwgTkFNRSwgbmV4dCk7XG4gIHZhciBnZXRNZXRob2QgPSBmdW5jdGlvbihraW5kKXtcbiAgICBpZighQlVHR1kgJiYga2luZCBpbiBwcm90bylyZXR1cm4gcHJvdG9ba2luZF07XG4gICAgc3dpdGNoKGtpbmQpe1xuICAgICAgY2FzZSBLRVlTOiByZXR1cm4gZnVuY3Rpb24ga2V5cygpeyByZXR1cm4gbmV3IENvbnN0cnVjdG9yKHRoaXMsIGtpbmQpOyB9O1xuICAgICAgY2FzZSBWQUxVRVM6IHJldHVybiBmdW5jdGlvbiB2YWx1ZXMoKXsgcmV0dXJuIG5ldyBDb25zdHJ1Y3Rvcih0aGlzLCBraW5kKTsgfTtcbiAgICB9IHJldHVybiBmdW5jdGlvbiBlbnRyaWVzKCl7IHJldHVybiBuZXcgQ29uc3RydWN0b3IodGhpcywga2luZCk7IH07XG4gIH07XG4gIHZhciBUQUcgICAgICAgID0gTkFNRSArICcgSXRlcmF0b3InXG4gICAgLCBERUZfVkFMVUVTID0gREVGQVVMVCA9PSBWQUxVRVNcbiAgICAsIFZBTFVFU19CVUcgPSBmYWxzZVxuICAgICwgcHJvdG8gICAgICA9IEJhc2UucHJvdG90eXBlXG4gICAgLCAkbmF0aXZlICAgID0gcHJvdG9bSVRFUkFUT1JdIHx8IHByb3RvW0ZGX0lURVJBVE9SXSB8fCBERUZBVUxUICYmIHByb3RvW0RFRkFVTFRdXG4gICAgLCAkZGVmYXVsdCAgID0gJG5hdGl2ZSB8fCBnZXRNZXRob2QoREVGQVVMVClcbiAgICAsICRlbnRyaWVzICAgPSBERUZBVUxUID8gIURFRl9WQUxVRVMgPyAkZGVmYXVsdCA6IGdldE1ldGhvZCgnZW50cmllcycpIDogdW5kZWZpbmVkXG4gICAgLCAkYW55TmF0aXZlID0gTkFNRSA9PSAnQXJyYXknID8gcHJvdG8uZW50cmllcyB8fCAkbmF0aXZlIDogJG5hdGl2ZVxuICAgICwgbWV0aG9kcywga2V5LCBJdGVyYXRvclByb3RvdHlwZTtcbiAgLy8gRml4IG5hdGl2ZVxuICBpZigkYW55TmF0aXZlKXtcbiAgICBJdGVyYXRvclByb3RvdHlwZSA9IGdldFByb3RvdHlwZU9mKCRhbnlOYXRpdmUuY2FsbChuZXcgQmFzZSkpO1xuICAgIGlmKEl0ZXJhdG9yUHJvdG90eXBlICE9PSBPYmplY3QucHJvdG90eXBlKXtcbiAgICAgIC8vIFNldCBAQHRvU3RyaW5nVGFnIHRvIG5hdGl2ZSBpdGVyYXRvcnNcbiAgICAgIHNldFRvU3RyaW5nVGFnKEl0ZXJhdG9yUHJvdG90eXBlLCBUQUcsIHRydWUpO1xuICAgICAgLy8gZml4IGZvciBzb21lIG9sZCBlbmdpbmVzXG4gICAgICBpZighTElCUkFSWSAmJiAhaGFzKEl0ZXJhdG9yUHJvdG90eXBlLCBJVEVSQVRPUikpaGlkZShJdGVyYXRvclByb3RvdHlwZSwgSVRFUkFUT1IsIHJldHVyblRoaXMpO1xuICAgIH1cbiAgfVxuICAvLyBmaXggQXJyYXkje3ZhbHVlcywgQEBpdGVyYXRvcn0ubmFtZSBpbiBWOCAvIEZGXG4gIGlmKERFRl9WQUxVRVMgJiYgJG5hdGl2ZSAmJiAkbmF0aXZlLm5hbWUgIT09IFZBTFVFUyl7XG4gICAgVkFMVUVTX0JVRyA9IHRydWU7XG4gICAgJGRlZmF1bHQgPSBmdW5jdGlvbiB2YWx1ZXMoKXsgcmV0dXJuICRuYXRpdmUuY2FsbCh0aGlzKTsgfTtcbiAgfVxuICAvLyBEZWZpbmUgaXRlcmF0b3JcbiAgaWYoKCFMSUJSQVJZIHx8IEZPUkNFRCkgJiYgKEJVR0dZIHx8IFZBTFVFU19CVUcgfHwgIXByb3RvW0lURVJBVE9SXSkpe1xuICAgIGhpZGUocHJvdG8sIElURVJBVE9SLCAkZGVmYXVsdCk7XG4gIH1cbiAgLy8gUGx1ZyBmb3IgbGlicmFyeVxuICBJdGVyYXRvcnNbTkFNRV0gPSAkZGVmYXVsdDtcbiAgSXRlcmF0b3JzW1RBR10gID0gcmV0dXJuVGhpcztcbiAgaWYoREVGQVVMVCl7XG4gICAgbWV0aG9kcyA9IHtcbiAgICAgIHZhbHVlczogIERFRl9WQUxVRVMgPyAkZGVmYXVsdCA6IGdldE1ldGhvZChWQUxVRVMpLFxuICAgICAga2V5czogICAgSVNfU0VUICAgICA/ICRkZWZhdWx0IDogZ2V0TWV0aG9kKEtFWVMpLFxuICAgICAgZW50cmllczogJGVudHJpZXNcbiAgICB9O1xuICAgIGlmKEZPUkNFRClmb3Ioa2V5IGluIG1ldGhvZHMpe1xuICAgICAgaWYoIShrZXkgaW4gcHJvdG8pKXJlZGVmaW5lKHByb3RvLCBrZXksIG1ldGhvZHNba2V5XSk7XG4gICAgfSBlbHNlICRleHBvcnQoJGV4cG9ydC5QICsgJGV4cG9ydC5GICogKEJVR0dZIHx8IFZBTFVFU19CVUcpLCBOQU1FLCBtZXRob2RzKTtcbiAgfVxuICByZXR1cm4gbWV0aG9kcztcbn07IiwidmFyIElURVJBVE9SICAgICA9IHJlcXVpcmUoJy4vX3drcycpKCdpdGVyYXRvcicpXG4gICwgU0FGRV9DTE9TSU5HID0gZmFsc2U7XG5cbnRyeSB7XG4gIHZhciByaXRlciA9IFs3XVtJVEVSQVRPUl0oKTtcbiAgcml0ZXJbJ3JldHVybiddID0gZnVuY3Rpb24oKXsgU0FGRV9DTE9TSU5HID0gdHJ1ZTsgfTtcbiAgQXJyYXkuZnJvbShyaXRlciwgZnVuY3Rpb24oKXsgdGhyb3cgMjsgfSk7XG59IGNhdGNoKGUpeyAvKiBlbXB0eSAqLyB9XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oZXhlYywgc2tpcENsb3Npbmcpe1xuICBpZighc2tpcENsb3NpbmcgJiYgIVNBRkVfQ0xPU0lORylyZXR1cm4gZmFsc2U7XG4gIHZhciBzYWZlID0gZmFsc2U7XG4gIHRyeSB7XG4gICAgdmFyIGFyciAgPSBbN11cbiAgICAgICwgaXRlciA9IGFycltJVEVSQVRPUl0oKTtcbiAgICBpdGVyLm5leHQgPSBmdW5jdGlvbigpeyBzYWZlID0gdHJ1ZTsgfTtcbiAgICBhcnJbSVRFUkFUT1JdID0gZnVuY3Rpb24oKXsgcmV0dXJuIGl0ZXI7IH07XG4gICAgZXhlYyhhcnIpO1xuICB9IGNhdGNoKGUpeyAvKiBlbXB0eSAqLyB9XG4gIHJldHVybiBzYWZlO1xufTsiLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGRvbmUsIHZhbHVlKXtcbiAgcmV0dXJuIHt2YWx1ZTogdmFsdWUsIGRvbmU6ICEhZG9uZX07XG59OyIsIm1vZHVsZS5leHBvcnRzID0ge307IiwidmFyIGdldEtleXMgICA9IHJlcXVpcmUoJy4vX29iamVjdC1rZXlzJylcbiAgLCB0b0lPYmplY3QgPSByZXF1aXJlKCcuL190by1pb2JqZWN0Jyk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKG9iamVjdCwgZWwpe1xuICB2YXIgTyAgICAgID0gdG9JT2JqZWN0KG9iamVjdClcbiAgICAsIGtleXMgICA9IGdldEtleXMoTylcbiAgICAsIGxlbmd0aCA9IGtleXMubGVuZ3RoXG4gICAgLCBpbmRleCAgPSAwXG4gICAgLCBrZXk7XG4gIHdoaWxlKGxlbmd0aCA+IGluZGV4KWlmKE9ba2V5ID0ga2V5c1tpbmRleCsrXV0gPT09IGVsKXJldHVybiBrZXk7XG59OyIsIm1vZHVsZS5leHBvcnRzID0gZmFsc2U7IiwiLy8gMjAuMi4yLjE0IE1hdGguZXhwbTEoeClcbm1vZHVsZS5leHBvcnRzID0gTWF0aC5leHBtMSB8fCBmdW5jdGlvbiBleHBtMSh4KXtcbiAgcmV0dXJuICh4ID0gK3gpID09IDAgPyB4IDogeCA+IC0xZS02ICYmIHggPCAxZS02ID8geCArIHggKiB4IC8gMiA6IE1hdGguZXhwKHgpIC0gMTtcbn07IiwiLy8gMjAuMi4yLjIwIE1hdGgubG9nMXAoeClcbm1vZHVsZS5leHBvcnRzID0gTWF0aC5sb2cxcCB8fCBmdW5jdGlvbiBsb2cxcCh4KXtcbiAgcmV0dXJuICh4ID0gK3gpID4gLTFlLTggJiYgeCA8IDFlLTggPyB4IC0geCAqIHggLyAyIDogTWF0aC5sb2coMSArIHgpO1xufTsiLCIvLyAyMC4yLjIuMjggTWF0aC5zaWduKHgpXG5tb2R1bGUuZXhwb3J0cyA9IE1hdGguc2lnbiB8fCBmdW5jdGlvbiBzaWduKHgpe1xuICByZXR1cm4gKHggPSAreCkgPT0gMCB8fCB4ICE9IHggPyB4IDogeCA8IDAgPyAtMSA6IDE7XG59OyIsInZhciBNRVRBICAgICA9IHJlcXVpcmUoJy4vX3VpZCcpKCdtZXRhJylcbiAgLCBpc09iamVjdCA9IHJlcXVpcmUoJy4vX2lzLW9iamVjdCcpXG4gICwgaGFzICAgICAgPSByZXF1aXJlKCcuL19oYXMnKVxuICAsIHNldERlc2MgID0gcmVxdWlyZSgnLi9fb2JqZWN0LWRwJykuZlxuICAsIGlkICAgICAgID0gMDtcbnZhciBpc0V4dGVuc2libGUgPSBPYmplY3QuaXNFeHRlbnNpYmxlIHx8IGZ1bmN0aW9uKCl7XG4gIHJldHVybiB0cnVlO1xufTtcbnZhciBGUkVFWkUgPSAhcmVxdWlyZSgnLi9fZmFpbHMnKShmdW5jdGlvbigpe1xuICByZXR1cm4gaXNFeHRlbnNpYmxlKE9iamVjdC5wcmV2ZW50RXh0ZW5zaW9ucyh7fSkpO1xufSk7XG52YXIgc2V0TWV0YSA9IGZ1bmN0aW9uKGl0KXtcbiAgc2V0RGVzYyhpdCwgTUVUQSwge3ZhbHVlOiB7XG4gICAgaTogJ08nICsgKytpZCwgLy8gb2JqZWN0IElEXG4gICAgdzoge30gICAgICAgICAgLy8gd2VhayBjb2xsZWN0aW9ucyBJRHNcbiAgfX0pO1xufTtcbnZhciBmYXN0S2V5ID0gZnVuY3Rpb24oaXQsIGNyZWF0ZSl7XG4gIC8vIHJldHVybiBwcmltaXRpdmUgd2l0aCBwcmVmaXhcbiAgaWYoIWlzT2JqZWN0KGl0KSlyZXR1cm4gdHlwZW9mIGl0ID09ICdzeW1ib2wnID8gaXQgOiAodHlwZW9mIGl0ID09ICdzdHJpbmcnID8gJ1MnIDogJ1AnKSArIGl0O1xuICBpZighaGFzKGl0LCBNRVRBKSl7XG4gICAgLy8gY2FuJ3Qgc2V0IG1ldGFkYXRhIHRvIHVuY2F1Z2h0IGZyb3plbiBvYmplY3RcbiAgICBpZighaXNFeHRlbnNpYmxlKGl0KSlyZXR1cm4gJ0YnO1xuICAgIC8vIG5vdCBuZWNlc3NhcnkgdG8gYWRkIG1ldGFkYXRhXG4gICAgaWYoIWNyZWF0ZSlyZXR1cm4gJ0UnO1xuICAgIC8vIGFkZCBtaXNzaW5nIG1ldGFkYXRhXG4gICAgc2V0TWV0YShpdCk7XG4gIC8vIHJldHVybiBvYmplY3QgSURcbiAgfSByZXR1cm4gaXRbTUVUQV0uaTtcbn07XG52YXIgZ2V0V2VhayA9IGZ1bmN0aW9uKGl0LCBjcmVhdGUpe1xuICBpZighaGFzKGl0LCBNRVRBKSl7XG4gICAgLy8gY2FuJ3Qgc2V0IG1ldGFkYXRhIHRvIHVuY2F1Z2h0IGZyb3plbiBvYmplY3RcbiAgICBpZighaXNFeHRlbnNpYmxlKGl0KSlyZXR1cm4gdHJ1ZTtcbiAgICAvLyBub3QgbmVjZXNzYXJ5IHRvIGFkZCBtZXRhZGF0YVxuICAgIGlmKCFjcmVhdGUpcmV0dXJuIGZhbHNlO1xuICAgIC8vIGFkZCBtaXNzaW5nIG1ldGFkYXRhXG4gICAgc2V0TWV0YShpdCk7XG4gIC8vIHJldHVybiBoYXNoIHdlYWsgY29sbGVjdGlvbnMgSURzXG4gIH0gcmV0dXJuIGl0W01FVEFdLnc7XG59O1xuLy8gYWRkIG1ldGFkYXRhIG9uIGZyZWV6ZS1mYW1pbHkgbWV0aG9kcyBjYWxsaW5nXG52YXIgb25GcmVlemUgPSBmdW5jdGlvbihpdCl7XG4gIGlmKEZSRUVaRSAmJiBtZXRhLk5FRUQgJiYgaXNFeHRlbnNpYmxlKGl0KSAmJiAhaGFzKGl0LCBNRVRBKSlzZXRNZXRhKGl0KTtcbiAgcmV0dXJuIGl0O1xufTtcbnZhciBtZXRhID0gbW9kdWxlLmV4cG9ydHMgPSB7XG4gIEtFWTogICAgICBNRVRBLFxuICBORUVEOiAgICAgZmFsc2UsXG4gIGZhc3RLZXk6ICBmYXN0S2V5LFxuICBnZXRXZWFrOiAgZ2V0V2VhayxcbiAgb25GcmVlemU6IG9uRnJlZXplXG59OyIsInZhciBNYXAgICAgID0gcmVxdWlyZSgnLi9lczYubWFwJylcbiAgLCAkZXhwb3J0ID0gcmVxdWlyZSgnLi9fZXhwb3J0JylcbiAgLCBzaGFyZWQgID0gcmVxdWlyZSgnLi9fc2hhcmVkJykoJ21ldGFkYXRhJylcbiAgLCBzdG9yZSAgID0gc2hhcmVkLnN0b3JlIHx8IChzaGFyZWQuc3RvcmUgPSBuZXcgKHJlcXVpcmUoJy4vZXM2LndlYWstbWFwJykpKTtcblxudmFyIGdldE9yQ3JlYXRlTWV0YWRhdGFNYXAgPSBmdW5jdGlvbih0YXJnZXQsIHRhcmdldEtleSwgY3JlYXRlKXtcbiAgdmFyIHRhcmdldE1ldGFkYXRhID0gc3RvcmUuZ2V0KHRhcmdldCk7XG4gIGlmKCF0YXJnZXRNZXRhZGF0YSl7XG4gICAgaWYoIWNyZWF0ZSlyZXR1cm4gdW5kZWZpbmVkO1xuICAgIHN0b3JlLnNldCh0YXJnZXQsIHRhcmdldE1ldGFkYXRhID0gbmV3IE1hcCk7XG4gIH1cbiAgdmFyIGtleU1ldGFkYXRhID0gdGFyZ2V0TWV0YWRhdGEuZ2V0KHRhcmdldEtleSk7XG4gIGlmKCFrZXlNZXRhZGF0YSl7XG4gICAgaWYoIWNyZWF0ZSlyZXR1cm4gdW5kZWZpbmVkO1xuICAgIHRhcmdldE1ldGFkYXRhLnNldCh0YXJnZXRLZXksIGtleU1ldGFkYXRhID0gbmV3IE1hcCk7XG4gIH0gcmV0dXJuIGtleU1ldGFkYXRhO1xufTtcbnZhciBvcmRpbmFyeUhhc093bk1ldGFkYXRhID0gZnVuY3Rpb24oTWV0YWRhdGFLZXksIE8sIFApe1xuICB2YXIgbWV0YWRhdGFNYXAgPSBnZXRPckNyZWF0ZU1ldGFkYXRhTWFwKE8sIFAsIGZhbHNlKTtcbiAgcmV0dXJuIG1ldGFkYXRhTWFwID09PSB1bmRlZmluZWQgPyBmYWxzZSA6IG1ldGFkYXRhTWFwLmhhcyhNZXRhZGF0YUtleSk7XG59O1xudmFyIG9yZGluYXJ5R2V0T3duTWV0YWRhdGEgPSBmdW5jdGlvbihNZXRhZGF0YUtleSwgTywgUCl7XG4gIHZhciBtZXRhZGF0YU1hcCA9IGdldE9yQ3JlYXRlTWV0YWRhdGFNYXAoTywgUCwgZmFsc2UpO1xuICByZXR1cm4gbWV0YWRhdGFNYXAgPT09IHVuZGVmaW5lZCA/IHVuZGVmaW5lZCA6IG1ldGFkYXRhTWFwLmdldChNZXRhZGF0YUtleSk7XG59O1xudmFyIG9yZGluYXJ5RGVmaW5lT3duTWV0YWRhdGEgPSBmdW5jdGlvbihNZXRhZGF0YUtleSwgTWV0YWRhdGFWYWx1ZSwgTywgUCl7XG4gIGdldE9yQ3JlYXRlTWV0YWRhdGFNYXAoTywgUCwgdHJ1ZSkuc2V0KE1ldGFkYXRhS2V5LCBNZXRhZGF0YVZhbHVlKTtcbn07XG52YXIgb3JkaW5hcnlPd25NZXRhZGF0YUtleXMgPSBmdW5jdGlvbih0YXJnZXQsIHRhcmdldEtleSl7XG4gIHZhciBtZXRhZGF0YU1hcCA9IGdldE9yQ3JlYXRlTWV0YWRhdGFNYXAodGFyZ2V0LCB0YXJnZXRLZXksIGZhbHNlKVxuICAgICwga2V5cyAgICAgICAgPSBbXTtcbiAgaWYobWV0YWRhdGFNYXApbWV0YWRhdGFNYXAuZm9yRWFjaChmdW5jdGlvbihfLCBrZXkpeyBrZXlzLnB1c2goa2V5KTsgfSk7XG4gIHJldHVybiBrZXlzO1xufTtcbnZhciB0b01ldGFLZXkgPSBmdW5jdGlvbihpdCl7XG4gIHJldHVybiBpdCA9PT0gdW5kZWZpbmVkIHx8IHR5cGVvZiBpdCA9PSAnc3ltYm9sJyA/IGl0IDogU3RyaW5nKGl0KTtcbn07XG52YXIgZXhwID0gZnVuY3Rpb24oTyl7XG4gICRleHBvcnQoJGV4cG9ydC5TLCAnUmVmbGVjdCcsIE8pO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIHN0b3JlOiBzdG9yZSxcbiAgbWFwOiBnZXRPckNyZWF0ZU1ldGFkYXRhTWFwLFxuICBoYXM6IG9yZGluYXJ5SGFzT3duTWV0YWRhdGEsXG4gIGdldDogb3JkaW5hcnlHZXRPd25NZXRhZGF0YSxcbiAgc2V0OiBvcmRpbmFyeURlZmluZU93bk1ldGFkYXRhLFxuICBrZXlzOiBvcmRpbmFyeU93bk1ldGFkYXRhS2V5cyxcbiAga2V5OiB0b01ldGFLZXksXG4gIGV4cDogZXhwXG59OyIsInZhciBnbG9iYWwgICAgPSByZXF1aXJlKCcuL19nbG9iYWwnKVxuICAsIG1hY3JvdGFzayA9IHJlcXVpcmUoJy4vX3Rhc2snKS5zZXRcbiAgLCBPYnNlcnZlciAgPSBnbG9iYWwuTXV0YXRpb25PYnNlcnZlciB8fCBnbG9iYWwuV2ViS2l0TXV0YXRpb25PYnNlcnZlclxuICAsIHByb2Nlc3MgICA9IGdsb2JhbC5wcm9jZXNzXG4gICwgUHJvbWlzZSAgID0gZ2xvYmFsLlByb21pc2VcbiAgLCBpc05vZGUgICAgPSByZXF1aXJlKCcuL19jb2YnKShwcm9jZXNzKSA9PSAncHJvY2VzcydcbiAgLCBoZWFkLCBsYXN0LCBub3RpZnk7XG5cbnZhciBmbHVzaCA9IGZ1bmN0aW9uKCl7XG4gIHZhciBwYXJlbnQsIGZuO1xuICBpZihpc05vZGUgJiYgKHBhcmVudCA9IHByb2Nlc3MuZG9tYWluKSlwYXJlbnQuZXhpdCgpO1xuICB3aGlsZShoZWFkKXtcbiAgICBmbiA9IGhlYWQuZm47XG4gICAgZm4oKTsgLy8gPC0gY3VycmVudGx5IHdlIHVzZSBpdCBvbmx5IGZvciBQcm9taXNlIC0gdHJ5IC8gY2F0Y2ggbm90IHJlcXVpcmVkXG4gICAgaGVhZCA9IGhlYWQubmV4dDtcbiAgfSBsYXN0ID0gdW5kZWZpbmVkO1xuICBpZihwYXJlbnQpcGFyZW50LmVudGVyKCk7XG59O1xuXG4vLyBOb2RlLmpzXG5pZihpc05vZGUpe1xuICBub3RpZnkgPSBmdW5jdGlvbigpe1xuICAgIHByb2Nlc3MubmV4dFRpY2soZmx1c2gpO1xuICB9O1xuLy8gYnJvd3NlcnMgd2l0aCBNdXRhdGlvbk9ic2VydmVyXG59IGVsc2UgaWYoT2JzZXJ2ZXIpe1xuICB2YXIgdG9nZ2xlID0gdHJ1ZVxuICAgICwgbm9kZSAgID0gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoJycpO1xuICBuZXcgT2JzZXJ2ZXIoZmx1c2gpLm9ic2VydmUobm9kZSwge2NoYXJhY3RlckRhdGE6IHRydWV9KTsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1uZXdcbiAgbm90aWZ5ID0gZnVuY3Rpb24oKXtcbiAgICBub2RlLmRhdGEgPSB0b2dnbGUgPSAhdG9nZ2xlO1xuICB9O1xuLy8gZW52aXJvbm1lbnRzIHdpdGggbWF5YmUgbm9uLWNvbXBsZXRlbHkgY29ycmVjdCwgYnV0IGV4aXN0ZW50IFByb21pc2Vcbn0gZWxzZSBpZihQcm9taXNlICYmIFByb21pc2UucmVzb2x2ZSl7XG4gIG5vdGlmeSA9IGZ1bmN0aW9uKCl7XG4gICAgUHJvbWlzZS5yZXNvbHZlKCkudGhlbihmbHVzaCk7XG4gIH07XG4vLyBmb3Igb3RoZXIgZW52aXJvbm1lbnRzIC0gbWFjcm90YXNrIGJhc2VkIG9uOlxuLy8gLSBzZXRJbW1lZGlhdGVcbi8vIC0gTWVzc2FnZUNoYW5uZWxcbi8vIC0gd2luZG93LnBvc3RNZXNzYWdcbi8vIC0gb25yZWFkeXN0YXRlY2hhbmdlXG4vLyAtIHNldFRpbWVvdXRcbn0gZWxzZSB7XG4gIG5vdGlmeSA9IGZ1bmN0aW9uKCl7XG4gICAgLy8gc3RyYW5nZSBJRSArIHdlYnBhY2sgZGV2IHNlcnZlciBidWcgLSB1c2UgLmNhbGwoZ2xvYmFsKVxuICAgIG1hY3JvdGFzay5jYWxsKGdsb2JhbCwgZmx1c2gpO1xuICB9O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGZuKXtcbiAgdmFyIHRhc2sgPSB7Zm46IGZuLCBuZXh0OiB1bmRlZmluZWR9O1xuICBpZihsYXN0KWxhc3QubmV4dCA9IHRhc2s7XG4gIGlmKCFoZWFkKXtcbiAgICBoZWFkID0gdGFzaztcbiAgICBub3RpZnkoKTtcbiAgfSBsYXN0ID0gdGFzaztcbn07IiwiJ3VzZSBzdHJpY3QnO1xuLy8gMTkuMS4yLjEgT2JqZWN0LmFzc2lnbih0YXJnZXQsIHNvdXJjZSwgLi4uKVxudmFyIGdldEtleXMgID0gcmVxdWlyZSgnLi9fb2JqZWN0LWtleXMnKVxuICAsIGdPUFMgICAgID0gcmVxdWlyZSgnLi9fb2JqZWN0LWdvcHMnKVxuICAsIHBJRSAgICAgID0gcmVxdWlyZSgnLi9fb2JqZWN0LXBpZScpXG4gICwgdG9PYmplY3QgPSByZXF1aXJlKCcuL190by1vYmplY3QnKVxuICAsIElPYmplY3QgID0gcmVxdWlyZSgnLi9faW9iamVjdCcpXG4gICwgJGFzc2lnbiAgPSBPYmplY3QuYXNzaWduO1xuXG4vLyBzaG91bGQgd29yayB3aXRoIHN5bWJvbHMgYW5kIHNob3VsZCBoYXZlIGRldGVybWluaXN0aWMgcHJvcGVydHkgb3JkZXIgKFY4IGJ1Zylcbm1vZHVsZS5leHBvcnRzID0gISRhc3NpZ24gfHwgcmVxdWlyZSgnLi9fZmFpbHMnKShmdW5jdGlvbigpe1xuICB2YXIgQSA9IHt9XG4gICAgLCBCID0ge31cbiAgICAsIFMgPSBTeW1ib2woKVxuICAgICwgSyA9ICdhYmNkZWZnaGlqa2xtbm9wcXJzdCc7XG4gIEFbU10gPSA3O1xuICBLLnNwbGl0KCcnKS5mb3JFYWNoKGZ1bmN0aW9uKGspeyBCW2tdID0gazsgfSk7XG4gIHJldHVybiAkYXNzaWduKHt9LCBBKVtTXSAhPSA3IHx8IE9iamVjdC5rZXlzKCRhc3NpZ24oe30sIEIpKS5qb2luKCcnKSAhPSBLO1xufSkgPyBmdW5jdGlvbiBhc3NpZ24odGFyZ2V0LCBzb3VyY2UpeyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVudXNlZC12YXJzXG4gIHZhciBUICAgICA9IHRvT2JqZWN0KHRhcmdldClcbiAgICAsIGFMZW4gID0gYXJndW1lbnRzLmxlbmd0aFxuICAgICwgaW5kZXggPSAxXG4gICAgLCBnZXRTeW1ib2xzID0gZ09QUy5mXG4gICAgLCBpc0VudW0gICAgID0gcElFLmY7XG4gIHdoaWxlKGFMZW4gPiBpbmRleCl7XG4gICAgdmFyIFMgICAgICA9IElPYmplY3QoYXJndW1lbnRzW2luZGV4KytdKVxuICAgICAgLCBrZXlzICAgPSBnZXRTeW1ib2xzID8gZ2V0S2V5cyhTKS5jb25jYXQoZ2V0U3ltYm9scyhTKSkgOiBnZXRLZXlzKFMpXG4gICAgICAsIGxlbmd0aCA9IGtleXMubGVuZ3RoXG4gICAgICAsIGogICAgICA9IDBcbiAgICAgICwga2V5O1xuICAgIHdoaWxlKGxlbmd0aCA+IGopaWYoaXNFbnVtLmNhbGwoUywga2V5ID0ga2V5c1tqKytdKSlUW2tleV0gPSBTW2tleV07XG4gIH0gcmV0dXJuIFQ7XG59IDogJGFzc2lnbjsiLCIvLyAxOS4xLjIuMiAvIDE1LjIuMy41IE9iamVjdC5jcmVhdGUoTyBbLCBQcm9wZXJ0aWVzXSlcclxudmFyIGFuT2JqZWN0ICAgID0gcmVxdWlyZSgnLi9fYW4tb2JqZWN0JylcclxuICAsIGRQcyAgICAgICAgID0gcmVxdWlyZSgnLi9fb2JqZWN0LWRwcycpXHJcbiAgLCBlbnVtQnVnS2V5cyA9IHJlcXVpcmUoJy4vX2VudW0tYnVnLWtleXMnKVxyXG4gICwgSUVfUFJPVE8gICAgPSByZXF1aXJlKCcuL19zaGFyZWQta2V5JykoJ0lFX1BST1RPJylcclxuICAsIEVtcHR5ICAgICAgID0gZnVuY3Rpb24oKXsgLyogZW1wdHkgKi8gfVxyXG4gICwgUFJPVE9UWVBFICAgPSAncHJvdG90eXBlJztcclxuXHJcbi8vIENyZWF0ZSBvYmplY3Qgd2l0aCBmYWtlIGBudWxsYCBwcm90b3R5cGU6IHVzZSBpZnJhbWUgT2JqZWN0IHdpdGggY2xlYXJlZCBwcm90b3R5cGVcclxudmFyIGNyZWF0ZURpY3QgPSBmdW5jdGlvbigpe1xyXG4gIC8vIFRocmFzaCwgd2FzdGUgYW5kIHNvZG9teTogSUUgR0MgYnVnXHJcbiAgdmFyIGlmcmFtZSA9IHJlcXVpcmUoJy4vX2RvbS1jcmVhdGUnKSgnaWZyYW1lJylcclxuICAgICwgaSAgICAgID0gZW51bUJ1Z0tleXMubGVuZ3RoXHJcbiAgICAsIGd0ICAgICA9ICc+J1xyXG4gICAgLCBpZnJhbWVEb2N1bWVudDtcclxuICBpZnJhbWUuc3R5bGUuZGlzcGxheSA9ICdub25lJztcclxuICByZXF1aXJlKCcuL19odG1sJykuYXBwZW5kQ2hpbGQoaWZyYW1lKTtcclxuICBpZnJhbWUuc3JjID0gJ2phdmFzY3JpcHQ6JzsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1zY3JpcHQtdXJsXHJcbiAgLy8gY3JlYXRlRGljdCA9IGlmcmFtZS5jb250ZW50V2luZG93Lk9iamVjdDtcclxuICAvLyBodG1sLnJlbW92ZUNoaWxkKGlmcmFtZSk7XHJcbiAgaWZyYW1lRG9jdW1lbnQgPSBpZnJhbWUuY29udGVudFdpbmRvdy5kb2N1bWVudDtcclxuICBpZnJhbWVEb2N1bWVudC5vcGVuKCk7XHJcbiAgaWZyYW1lRG9jdW1lbnQud3JpdGUoJzxzY3JpcHQ+ZG9jdW1lbnQuRj1PYmplY3Q8L3NjcmlwdCcgKyBndCk7XHJcbiAgaWZyYW1lRG9jdW1lbnQuY2xvc2UoKTtcclxuICBjcmVhdGVEaWN0ID0gaWZyYW1lRG9jdW1lbnQuRjtcclxuICB3aGlsZShpLS0pZGVsZXRlIGNyZWF0ZURpY3RbUFJPVE9UWVBFXVtlbnVtQnVnS2V5c1tpXV07XHJcbiAgcmV0dXJuIGNyZWF0ZURpY3QoKTtcclxufTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gT2JqZWN0LmNyZWF0ZSB8fCBmdW5jdGlvbiBjcmVhdGUoTywgUHJvcGVydGllcyl7XHJcbiAgdmFyIHJlc3VsdDtcclxuICBpZihPICE9PSBudWxsKXtcclxuICAgIEVtcHR5W1BST1RPVFlQRV0gPSBhbk9iamVjdChPKTtcclxuICAgIHJlc3VsdCA9IG5ldyBFbXB0eTtcclxuICAgIEVtcHR5W1BST1RPVFlQRV0gPSBudWxsO1xyXG4gICAgLy8gYWRkIFwiX19wcm90b19fXCIgZm9yIE9iamVjdC5nZXRQcm90b3R5cGVPZiBwb2x5ZmlsbFxyXG4gICAgcmVzdWx0W0lFX1BST1RPXSA9IE87XHJcbiAgfSBlbHNlIHJlc3VsdCA9IGNyZWF0ZURpY3QoKTtcclxuICByZXR1cm4gUHJvcGVydGllcyA9PT0gdW5kZWZpbmVkID8gcmVzdWx0IDogZFBzKHJlc3VsdCwgUHJvcGVydGllcyk7XHJcbn07IiwidmFyIGFuT2JqZWN0ICAgICAgID0gcmVxdWlyZSgnLi9fYW4tb2JqZWN0JylcbiAgLCBJRThfRE9NX0RFRklORSA9IHJlcXVpcmUoJy4vX2llOC1kb20tZGVmaW5lJylcbiAgLCB0b1ByaW1pdGl2ZSAgICA9IHJlcXVpcmUoJy4vX3RvLXByaW1pdGl2ZScpXG4gICwgZFAgICAgICAgICAgICAgPSBPYmplY3QuZGVmaW5lUHJvcGVydHk7XG5cbmV4cG9ydHMuZiA9IHJlcXVpcmUoJy4vX2Rlc2NyaXB0b3JzJykgPyBPYmplY3QuZGVmaW5lUHJvcGVydHkgOiBmdW5jdGlvbiBkZWZpbmVQcm9wZXJ0eShPLCBQLCBBdHRyaWJ1dGVzKXtcbiAgYW5PYmplY3QoTyk7XG4gIFAgPSB0b1ByaW1pdGl2ZShQLCB0cnVlKTtcbiAgYW5PYmplY3QoQXR0cmlidXRlcyk7XG4gIGlmKElFOF9ET01fREVGSU5FKXRyeSB7XG4gICAgcmV0dXJuIGRQKE8sIFAsIEF0dHJpYnV0ZXMpO1xuICB9IGNhdGNoKGUpeyAvKiBlbXB0eSAqLyB9XG4gIGlmKCdnZXQnIGluIEF0dHJpYnV0ZXMgfHwgJ3NldCcgaW4gQXR0cmlidXRlcyl0aHJvdyBUeXBlRXJyb3IoJ0FjY2Vzc29ycyBub3Qgc3VwcG9ydGVkIScpO1xuICBpZigndmFsdWUnIGluIEF0dHJpYnV0ZXMpT1tQXSA9IEF0dHJpYnV0ZXMudmFsdWU7XG4gIHJldHVybiBPO1xufTsiLCJ2YXIgZFAgICAgICAgPSByZXF1aXJlKCcuL19vYmplY3QtZHAnKVxyXG4gICwgYW5PYmplY3QgPSByZXF1aXJlKCcuL19hbi1vYmplY3QnKVxyXG4gICwgZ2V0S2V5cyAgPSByZXF1aXJlKCcuL19vYmplY3Qta2V5cycpO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL19kZXNjcmlwdG9ycycpID8gT2JqZWN0LmRlZmluZVByb3BlcnRpZXMgOiBmdW5jdGlvbiBkZWZpbmVQcm9wZXJ0aWVzKE8sIFByb3BlcnRpZXMpe1xyXG4gIGFuT2JqZWN0KE8pO1xyXG4gIHZhciBrZXlzICAgPSBnZXRLZXlzKFByb3BlcnRpZXMpXHJcbiAgICAsIGxlbmd0aCA9IGtleXMubGVuZ3RoXHJcbiAgICAsIGkgPSAwXHJcbiAgICAsIFA7XHJcbiAgd2hpbGUobGVuZ3RoID4gaSlkUC5mKE8sIFAgPSBrZXlzW2krK10sIFByb3BlcnRpZXNbUF0pO1xyXG4gIHJldHVybiBPO1xyXG59OyIsIi8vIEZvcmNlZCByZXBsYWNlbWVudCBwcm90b3R5cGUgYWNjZXNzb3JzIG1ldGhvZHNcclxubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL19saWJyYXJ5Jyl8fCAhcmVxdWlyZSgnLi9fZmFpbHMnKShmdW5jdGlvbigpe1xyXG4gIHZhciBLID0gTWF0aC5yYW5kb20oKTtcclxuICAvLyBJbiBGRiB0aHJvd3Mgb25seSBkZWZpbmUgbWV0aG9kc1xyXG4gIF9fZGVmaW5lU2V0dGVyX18uY2FsbChudWxsLCBLLCBmdW5jdGlvbigpeyAvKiBlbXB0eSAqL30pO1xyXG4gIGRlbGV0ZSByZXF1aXJlKCcuL19nbG9iYWwnKVtLXTtcclxufSk7IiwidmFyIHBJRSAgICAgICAgICAgID0gcmVxdWlyZSgnLi9fb2JqZWN0LXBpZScpXHJcbiAgLCBjcmVhdGVEZXNjICAgICA9IHJlcXVpcmUoJy4vX3Byb3BlcnR5LWRlc2MnKVxyXG4gICwgdG9JT2JqZWN0ICAgICAgPSByZXF1aXJlKCcuL190by1pb2JqZWN0JylcclxuICAsIHRvUHJpbWl0aXZlICAgID0gcmVxdWlyZSgnLi9fdG8tcHJpbWl0aXZlJylcclxuICAsIGhhcyAgICAgICAgICAgID0gcmVxdWlyZSgnLi9faGFzJylcclxuICAsIElFOF9ET01fREVGSU5FID0gcmVxdWlyZSgnLi9faWU4LWRvbS1kZWZpbmUnKVxyXG4gICwgZ09QRCAgICAgICAgICAgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yO1xyXG5cclxuZXhwb3J0cy5mID0gcmVxdWlyZSgnLi9fZGVzY3JpcHRvcnMnKSA/IGdPUEQgOiBmdW5jdGlvbiBnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IoTywgUCl7XHJcbiAgTyA9IHRvSU9iamVjdChPKTtcclxuICBQID0gdG9QcmltaXRpdmUoUCwgdHJ1ZSk7XHJcbiAgaWYoSUU4X0RPTV9ERUZJTkUpdHJ5IHtcclxuICAgIHJldHVybiBnT1BEKE8sIFApO1xyXG4gIH0gY2F0Y2goZSl7IC8qIGVtcHR5ICovIH1cclxuICBpZihoYXMoTywgUCkpcmV0dXJuIGNyZWF0ZURlc2MoIXBJRS5mLmNhbGwoTywgUCksIE9bUF0pO1xyXG59OyIsIi8vIGZhbGxiYWNrIGZvciBJRTExIGJ1Z2d5IE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzIHdpdGggaWZyYW1lIGFuZCB3aW5kb3dcbnZhciB0b0lPYmplY3QgPSByZXF1aXJlKCcuL190by1pb2JqZWN0JylcbiAgLCBnT1BOICAgICAgPSByZXF1aXJlKCcuL19vYmplY3QtZ29wbicpLmZcbiAgLCB0b1N0cmluZyAgPSB7fS50b1N0cmluZztcblxudmFyIHdpbmRvd05hbWVzID0gdHlwZW9mIHdpbmRvdyA9PSAnb2JqZWN0JyAmJiB3aW5kb3cgJiYgT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXNcbiAgPyBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyh3aW5kb3cpIDogW107XG5cbnZhciBnZXRXaW5kb3dOYW1lcyA9IGZ1bmN0aW9uKGl0KXtcbiAgdHJ5IHtcbiAgICByZXR1cm4gZ09QTihpdCk7XG4gIH0gY2F0Y2goZSl7XG4gICAgcmV0dXJuIHdpbmRvd05hbWVzLnNsaWNlKCk7XG4gIH1cbn07XG5cbm1vZHVsZS5leHBvcnRzLmYgPSBmdW5jdGlvbiBnZXRPd25Qcm9wZXJ0eU5hbWVzKGl0KXtcbiAgcmV0dXJuIHdpbmRvd05hbWVzICYmIHRvU3RyaW5nLmNhbGwoaXQpID09ICdbb2JqZWN0IFdpbmRvd10nID8gZ2V0V2luZG93TmFtZXMoaXQpIDogZ09QTih0b0lPYmplY3QoaXQpKTtcbn07XG4iLCIvLyAxOS4xLjIuNyAvIDE1LjIuMy40IE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKE8pXHJcbnZhciAka2V5cyAgICAgID0gcmVxdWlyZSgnLi9fb2JqZWN0LWtleXMtaW50ZXJuYWwnKVxyXG4gICwgaGlkZGVuS2V5cyA9IHJlcXVpcmUoJy4vX2VudW0tYnVnLWtleXMnKS5jb25jYXQoJ2xlbmd0aCcsICdwcm90b3R5cGUnKTtcclxuXHJcbmV4cG9ydHMuZiA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzIHx8IGZ1bmN0aW9uIGdldE93blByb3BlcnR5TmFtZXMoTyl7XHJcbiAgcmV0dXJuICRrZXlzKE8sIGhpZGRlbktleXMpO1xyXG59OyIsImV4cG9ydHMuZiA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHM7IiwiLy8gMTkuMS4yLjkgLyAxNS4yLjMuMiBPYmplY3QuZ2V0UHJvdG90eXBlT2YoTylcclxudmFyIGhhcyAgICAgICAgID0gcmVxdWlyZSgnLi9faGFzJylcclxuICAsIHRvT2JqZWN0ICAgID0gcmVxdWlyZSgnLi9fdG8tb2JqZWN0JylcclxuICAsIElFX1BST1RPICAgID0gcmVxdWlyZSgnLi9fc2hhcmVkLWtleScpKCdJRV9QUk9UTycpXHJcbiAgLCBPYmplY3RQcm90byA9IE9iamVjdC5wcm90b3R5cGU7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IE9iamVjdC5nZXRQcm90b3R5cGVPZiB8fCBmdW5jdGlvbihPKXtcclxuICBPID0gdG9PYmplY3QoTyk7XHJcbiAgaWYoaGFzKE8sIElFX1BST1RPKSlyZXR1cm4gT1tJRV9QUk9UT107XHJcbiAgaWYodHlwZW9mIE8uY29uc3RydWN0b3IgPT0gJ2Z1bmN0aW9uJyAmJiBPIGluc3RhbmNlb2YgTy5jb25zdHJ1Y3Rvcil7XHJcbiAgICByZXR1cm4gTy5jb25zdHJ1Y3Rvci5wcm90b3R5cGU7XHJcbiAgfSByZXR1cm4gTyBpbnN0YW5jZW9mIE9iamVjdCA/IE9iamVjdFByb3RvIDogbnVsbDtcclxufTsiLCJ2YXIgaGFzICAgICAgICAgID0gcmVxdWlyZSgnLi9faGFzJylcclxuICAsIHRvSU9iamVjdCAgICA9IHJlcXVpcmUoJy4vX3RvLWlvYmplY3QnKVxyXG4gICwgYXJyYXlJbmRleE9mID0gcmVxdWlyZSgnLi9fYXJyYXktaW5jbHVkZXMnKShmYWxzZSlcclxuICAsIElFX1BST1RPICAgICA9IHJlcXVpcmUoJy4vX3NoYXJlZC1rZXknKSgnSUVfUFJPVE8nKTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24ob2JqZWN0LCBuYW1lcyl7XHJcbiAgdmFyIE8gICAgICA9IHRvSU9iamVjdChvYmplY3QpXHJcbiAgICAsIGkgICAgICA9IDBcclxuICAgICwgcmVzdWx0ID0gW11cclxuICAgICwga2V5O1xyXG4gIGZvcihrZXkgaW4gTylpZihrZXkgIT0gSUVfUFJPVE8paGFzKE8sIGtleSkgJiYgcmVzdWx0LnB1c2goa2V5KTtcclxuICAvLyBEb24ndCBlbnVtIGJ1ZyAmIGhpZGRlbiBrZXlzXHJcbiAgd2hpbGUobmFtZXMubGVuZ3RoID4gaSlpZihoYXMoTywga2V5ID0gbmFtZXNbaSsrXSkpe1xyXG4gICAgfmFycmF5SW5kZXhPZihyZXN1bHQsIGtleSkgfHwgcmVzdWx0LnB1c2goa2V5KTtcclxuICB9XHJcbiAgcmV0dXJuIHJlc3VsdDtcclxufTsiLCIvLyAxOS4xLjIuMTQgLyAxNS4yLjMuMTQgT2JqZWN0LmtleXMoTylcclxudmFyICRrZXlzICAgICAgID0gcmVxdWlyZSgnLi9fb2JqZWN0LWtleXMtaW50ZXJuYWwnKVxyXG4gICwgZW51bUJ1Z0tleXMgPSByZXF1aXJlKCcuL19lbnVtLWJ1Zy1rZXlzJyk7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IE9iamVjdC5rZXlzIHx8IGZ1bmN0aW9uIGtleXMoTyl7XHJcbiAgcmV0dXJuICRrZXlzKE8sIGVudW1CdWdLZXlzKTtcclxufTsiLCJleHBvcnRzLmYgPSB7fS5wcm9wZXJ0eUlzRW51bWVyYWJsZTsiLCIvLyBtb3N0IE9iamVjdCBtZXRob2RzIGJ5IEVTNiBzaG91bGQgYWNjZXB0IHByaW1pdGl2ZXNcbnZhciAkZXhwb3J0ID0gcmVxdWlyZSgnLi9fZXhwb3J0JylcbiAgLCBjb3JlICAgID0gcmVxdWlyZSgnLi9fY29yZScpXG4gICwgZmFpbHMgICA9IHJlcXVpcmUoJy4vX2ZhaWxzJyk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKEtFWSwgZXhlYyl7XG4gIHZhciBmbiAgPSAoY29yZS5PYmplY3QgfHwge30pW0tFWV0gfHwgT2JqZWN0W0tFWV1cbiAgICAsIGV4cCA9IHt9O1xuICBleHBbS0VZXSA9IGV4ZWMoZm4pO1xuICAkZXhwb3J0KCRleHBvcnQuUyArICRleHBvcnQuRiAqIGZhaWxzKGZ1bmN0aW9uKCl7IGZuKDEpOyB9KSwgJ09iamVjdCcsIGV4cCk7XG59OyIsInZhciBnZXRLZXlzICAgPSByZXF1aXJlKCcuL19vYmplY3Qta2V5cycpXG4gICwgdG9JT2JqZWN0ID0gcmVxdWlyZSgnLi9fdG8taW9iamVjdCcpXG4gICwgaXNFbnVtICAgID0gcmVxdWlyZSgnLi9fb2JqZWN0LXBpZScpLmY7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGlzRW50cmllcyl7XG4gIHJldHVybiBmdW5jdGlvbihpdCl7XG4gICAgdmFyIE8gICAgICA9IHRvSU9iamVjdChpdClcbiAgICAgICwga2V5cyAgID0gZ2V0S2V5cyhPKVxuICAgICAgLCBsZW5ndGggPSBrZXlzLmxlbmd0aFxuICAgICAgLCBpICAgICAgPSAwXG4gICAgICAsIHJlc3VsdCA9IFtdXG4gICAgICAsIGtleTtcbiAgICB3aGlsZShsZW5ndGggPiBpKWlmKGlzRW51bS5jYWxsKE8sIGtleSA9IGtleXNbaSsrXSkpe1xuICAgICAgcmVzdWx0LnB1c2goaXNFbnRyaWVzID8gW2tleSwgT1trZXldXSA6IE9ba2V5XSk7XG4gICAgfSByZXR1cm4gcmVzdWx0O1xuICB9O1xufTsiLCIvLyBhbGwgb2JqZWN0IGtleXMsIGluY2x1ZGVzIG5vbi1lbnVtZXJhYmxlIGFuZCBzeW1ib2xzXG52YXIgZ09QTiAgICAgPSByZXF1aXJlKCcuL19vYmplY3QtZ29wbicpXG4gICwgZ09QUyAgICAgPSByZXF1aXJlKCcuL19vYmplY3QtZ29wcycpXG4gICwgYW5PYmplY3QgPSByZXF1aXJlKCcuL19hbi1vYmplY3QnKVxuICAsIFJlZmxlY3QgID0gcmVxdWlyZSgnLi9fZ2xvYmFsJykuUmVmbGVjdDtcbm1vZHVsZS5leHBvcnRzID0gUmVmbGVjdCAmJiBSZWZsZWN0Lm93bktleXMgfHwgZnVuY3Rpb24gb3duS2V5cyhpdCl7XG4gIHZhciBrZXlzICAgICAgID0gZ09QTi5mKGFuT2JqZWN0KGl0KSlcbiAgICAsIGdldFN5bWJvbHMgPSBnT1BTLmY7XG4gIHJldHVybiBnZXRTeW1ib2xzID8ga2V5cy5jb25jYXQoZ2V0U3ltYm9scyhpdCkpIDoga2V5cztcbn07IiwidmFyICRwYXJzZUZsb2F0ID0gcmVxdWlyZSgnLi9fZ2xvYmFsJykucGFyc2VGbG9hdFxuICAsICR0cmltICAgICAgID0gcmVxdWlyZSgnLi9fc3RyaW5nLXRyaW0nKS50cmltO1xuXG5tb2R1bGUuZXhwb3J0cyA9IDEgLyAkcGFyc2VGbG9hdChyZXF1aXJlKCcuL19zdHJpbmctd3MnKSArICctMCcpICE9PSAtSW5maW5pdHkgPyBmdW5jdGlvbiBwYXJzZUZsb2F0KHN0cil7XG4gIHZhciBzdHJpbmcgPSAkdHJpbShTdHJpbmcoc3RyKSwgMylcbiAgICAsIHJlc3VsdCA9ICRwYXJzZUZsb2F0KHN0cmluZyk7XG4gIHJldHVybiByZXN1bHQgPT09IDAgJiYgc3RyaW5nLmNoYXJBdCgwKSA9PSAnLScgPyAtMCA6IHJlc3VsdDtcbn0gOiAkcGFyc2VGbG9hdDsiLCJ2YXIgJHBhcnNlSW50ID0gcmVxdWlyZSgnLi9fZ2xvYmFsJykucGFyc2VJbnRcbiAgLCAkdHJpbSAgICAgPSByZXF1aXJlKCcuL19zdHJpbmctdHJpbScpLnRyaW1cbiAgLCB3cyAgICAgICAgPSByZXF1aXJlKCcuL19zdHJpbmctd3MnKVxuICAsIGhleCAgICAgICA9IC9eW1xcLStdPzBbeFhdLztcblxubW9kdWxlLmV4cG9ydHMgPSAkcGFyc2VJbnQod3MgKyAnMDgnKSAhPT0gOCB8fCAkcGFyc2VJbnQod3MgKyAnMHgxNicpICE9PSAyMiA/IGZ1bmN0aW9uIHBhcnNlSW50KHN0ciwgcmFkaXgpe1xuICB2YXIgc3RyaW5nID0gJHRyaW0oU3RyaW5nKHN0ciksIDMpO1xuICByZXR1cm4gJHBhcnNlSW50KHN0cmluZywgKHJhZGl4ID4+PiAwKSB8fCAoaGV4LnRlc3Qoc3RyaW5nKSA/IDE2IDogMTApKTtcbn0gOiAkcGFyc2VJbnQ7IiwiJ3VzZSBzdHJpY3QnO1xudmFyIHBhdGggICAgICA9IHJlcXVpcmUoJy4vX3BhdGgnKVxuICAsIGludm9rZSAgICA9IHJlcXVpcmUoJy4vX2ludm9rZScpXG4gICwgYUZ1bmN0aW9uID0gcmVxdWlyZSgnLi9fYS1mdW5jdGlvbicpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbigvKiAuLi5wYXJncyAqLyl7XG4gIHZhciBmbiAgICAgPSBhRnVuY3Rpb24odGhpcylcbiAgICAsIGxlbmd0aCA9IGFyZ3VtZW50cy5sZW5ndGhcbiAgICAsIHBhcmdzICA9IEFycmF5KGxlbmd0aClcbiAgICAsIGkgICAgICA9IDBcbiAgICAsIF8gICAgICA9IHBhdGguX1xuICAgICwgaG9sZGVyID0gZmFsc2U7XG4gIHdoaWxlKGxlbmd0aCA+IGkpaWYoKHBhcmdzW2ldID0gYXJndW1lbnRzW2krK10pID09PSBfKWhvbGRlciA9IHRydWU7XG4gIHJldHVybiBmdW5jdGlvbigvKiAuLi5hcmdzICovKXtcbiAgICB2YXIgdGhhdCA9IHRoaXNcbiAgICAgICwgYUxlbiA9IGFyZ3VtZW50cy5sZW5ndGhcbiAgICAgICwgaiA9IDAsIGsgPSAwLCBhcmdzO1xuICAgIGlmKCFob2xkZXIgJiYgIWFMZW4pcmV0dXJuIGludm9rZShmbiwgcGFyZ3MsIHRoYXQpO1xuICAgIGFyZ3MgPSBwYXJncy5zbGljZSgpO1xuICAgIGlmKGhvbGRlcilmb3IoO2xlbmd0aCA+IGo7IGorKylpZihhcmdzW2pdID09PSBfKWFyZ3Nbal0gPSBhcmd1bWVudHNbaysrXTtcbiAgICB3aGlsZShhTGVuID4gaylhcmdzLnB1c2goYXJndW1lbnRzW2srK10pO1xuICAgIHJldHVybiBpbnZva2UoZm4sIGFyZ3MsIHRoYXQpO1xuICB9O1xufTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vX2dsb2JhbCcpOyIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oYml0bWFwLCB2YWx1ZSl7XG4gIHJldHVybiB7XG4gICAgZW51bWVyYWJsZSAgOiAhKGJpdG1hcCAmIDEpLFxuICAgIGNvbmZpZ3VyYWJsZTogIShiaXRtYXAgJiAyKSxcbiAgICB3cml0YWJsZSAgICA6ICEoYml0bWFwICYgNCksXG4gICAgdmFsdWUgICAgICAgOiB2YWx1ZVxuICB9O1xufTsiLCJ2YXIgcmVkZWZpbmUgPSByZXF1aXJlKCcuL19yZWRlZmluZScpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbih0YXJnZXQsIHNyYywgc2FmZSl7XG4gIGZvcih2YXIga2V5IGluIHNyYylyZWRlZmluZSh0YXJnZXQsIGtleSwgc3JjW2tleV0sIHNhZmUpO1xuICByZXR1cm4gdGFyZ2V0O1xufTsiLCJ2YXIgZ2xvYmFsICAgID0gcmVxdWlyZSgnLi9fZ2xvYmFsJylcbiAgLCBoaWRlICAgICAgPSByZXF1aXJlKCcuL19oaWRlJylcbiAgLCBoYXMgICAgICAgPSByZXF1aXJlKCcuL19oYXMnKVxuICAsIFNSQyAgICAgICA9IHJlcXVpcmUoJy4vX3VpZCcpKCdzcmMnKVxuICAsIFRPX1NUUklORyA9ICd0b1N0cmluZydcbiAgLCAkdG9TdHJpbmcgPSBGdW5jdGlvbltUT19TVFJJTkddXG4gICwgVFBMICAgICAgID0gKCcnICsgJHRvU3RyaW5nKS5zcGxpdChUT19TVFJJTkcpO1xuXG5yZXF1aXJlKCcuL19jb3JlJykuaW5zcGVjdFNvdXJjZSA9IGZ1bmN0aW9uKGl0KXtcbiAgcmV0dXJuICR0b1N0cmluZy5jYWxsKGl0KTtcbn07XG5cbihtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKE8sIGtleSwgdmFsLCBzYWZlKXtcbiAgdmFyIGlzRnVuY3Rpb24gPSB0eXBlb2YgdmFsID09ICdmdW5jdGlvbic7XG4gIGlmKGlzRnVuY3Rpb24paGFzKHZhbCwgJ25hbWUnKSB8fCBoaWRlKHZhbCwgJ25hbWUnLCBrZXkpO1xuICBpZihPW2tleV0gPT09IHZhbClyZXR1cm47XG4gIGlmKGlzRnVuY3Rpb24paGFzKHZhbCwgU1JDKSB8fCBoaWRlKHZhbCwgU1JDLCBPW2tleV0gPyAnJyArIE9ba2V5XSA6IFRQTC5qb2luKFN0cmluZyhrZXkpKSk7XG4gIGlmKE8gPT09IGdsb2JhbCl7XG4gICAgT1trZXldID0gdmFsO1xuICB9IGVsc2Uge1xuICAgIGlmKCFzYWZlKXtcbiAgICAgIGRlbGV0ZSBPW2tleV07XG4gICAgICBoaWRlKE8sIGtleSwgdmFsKTtcbiAgICB9IGVsc2Uge1xuICAgICAgaWYoT1trZXldKU9ba2V5XSA9IHZhbDtcbiAgICAgIGVsc2UgaGlkZShPLCBrZXksIHZhbCk7XG4gICAgfVxuICB9XG4vLyBhZGQgZmFrZSBGdW5jdGlvbiN0b1N0cmluZyBmb3IgY29ycmVjdCB3b3JrIHdyYXBwZWQgbWV0aG9kcyAvIGNvbnN0cnVjdG9ycyB3aXRoIG1ldGhvZHMgbGlrZSBMb0Rhc2ggaXNOYXRpdmVcbn0pKEZ1bmN0aW9uLnByb3RvdHlwZSwgVE9fU1RSSU5HLCBmdW5jdGlvbiB0b1N0cmluZygpe1xuICByZXR1cm4gdHlwZW9mIHRoaXMgPT0gJ2Z1bmN0aW9uJyAmJiB0aGlzW1NSQ10gfHwgJHRvU3RyaW5nLmNhbGwodGhpcyk7XG59KTsiLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKHJlZ0V4cCwgcmVwbGFjZSl7XG4gIHZhciByZXBsYWNlciA9IHJlcGxhY2UgPT09IE9iamVjdChyZXBsYWNlKSA/IGZ1bmN0aW9uKHBhcnQpe1xuICAgIHJldHVybiByZXBsYWNlW3BhcnRdO1xuICB9IDogcmVwbGFjZTtcbiAgcmV0dXJuIGZ1bmN0aW9uKGl0KXtcbiAgICByZXR1cm4gU3RyaW5nKGl0KS5yZXBsYWNlKHJlZ0V4cCwgcmVwbGFjZXIpO1xuICB9O1xufTsiLCIvLyA3LjIuOSBTYW1lVmFsdWUoeCwgeSlcbm1vZHVsZS5leHBvcnRzID0gT2JqZWN0LmlzIHx8IGZ1bmN0aW9uIGlzKHgsIHkpe1xuICByZXR1cm4geCA9PT0geSA/IHggIT09IDAgfHwgMSAvIHggPT09IDEgLyB5IDogeCAhPSB4ICYmIHkgIT0geTtcbn07IiwiLy8gV29ya3Mgd2l0aCBfX3Byb3RvX18gb25seS4gT2xkIHY4IGNhbid0IHdvcmsgd2l0aCBudWxsIHByb3RvIG9iamVjdHMuXG4vKiBlc2xpbnQtZGlzYWJsZSBuby1wcm90byAqL1xudmFyIGlzT2JqZWN0ID0gcmVxdWlyZSgnLi9faXMtb2JqZWN0JylcbiAgLCBhbk9iamVjdCA9IHJlcXVpcmUoJy4vX2FuLW9iamVjdCcpO1xudmFyIGNoZWNrID0gZnVuY3Rpb24oTywgcHJvdG8pe1xuICBhbk9iamVjdChPKTtcbiAgaWYoIWlzT2JqZWN0KHByb3RvKSAmJiBwcm90byAhPT0gbnVsbCl0aHJvdyBUeXBlRXJyb3IocHJvdG8gKyBcIjogY2FuJ3Qgc2V0IGFzIHByb3RvdHlwZSFcIik7XG59O1xubW9kdWxlLmV4cG9ydHMgPSB7XG4gIHNldDogT2JqZWN0LnNldFByb3RvdHlwZU9mIHx8ICgnX19wcm90b19fJyBpbiB7fSA/IC8vIGVzbGludC1kaXNhYmxlLWxpbmVcbiAgICBmdW5jdGlvbih0ZXN0LCBidWdneSwgc2V0KXtcbiAgICAgIHRyeSB7XG4gICAgICAgIHNldCA9IHJlcXVpcmUoJy4vX2N0eCcpKEZ1bmN0aW9uLmNhbGwsIHJlcXVpcmUoJy4vX29iamVjdC1nb3BkJykuZihPYmplY3QucHJvdG90eXBlLCAnX19wcm90b19fJykuc2V0LCAyKTtcbiAgICAgICAgc2V0KHRlc3QsIFtdKTtcbiAgICAgICAgYnVnZ3kgPSAhKHRlc3QgaW5zdGFuY2VvZiBBcnJheSk7XG4gICAgICB9IGNhdGNoKGUpeyBidWdneSA9IHRydWU7IH1cbiAgICAgIHJldHVybiBmdW5jdGlvbiBzZXRQcm90b3R5cGVPZihPLCBwcm90byl7XG4gICAgICAgIGNoZWNrKE8sIHByb3RvKTtcbiAgICAgICAgaWYoYnVnZ3kpTy5fX3Byb3RvX18gPSBwcm90bztcbiAgICAgICAgZWxzZSBzZXQoTywgcHJvdG8pO1xuICAgICAgICByZXR1cm4gTztcbiAgICAgIH07XG4gICAgfSh7fSwgZmFsc2UpIDogdW5kZWZpbmVkKSxcbiAgY2hlY2s6IGNoZWNrXG59OyIsIid1c2Ugc3RyaWN0JztcbnZhciBnbG9iYWwgICAgICA9IHJlcXVpcmUoJy4vX2dsb2JhbCcpXG4gICwgZFAgICAgICAgICAgPSByZXF1aXJlKCcuL19vYmplY3QtZHAnKVxuICAsIERFU0NSSVBUT1JTID0gcmVxdWlyZSgnLi9fZGVzY3JpcHRvcnMnKVxuICAsIFNQRUNJRVMgICAgID0gcmVxdWlyZSgnLi9fd2tzJykoJ3NwZWNpZXMnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihLRVkpe1xuICB2YXIgQyA9IGdsb2JhbFtLRVldO1xuICBpZihERVNDUklQVE9SUyAmJiBDICYmICFDW1NQRUNJRVNdKWRQLmYoQywgU1BFQ0lFUywge1xuICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICBnZXQ6IGZ1bmN0aW9uKCl7IHJldHVybiB0aGlzOyB9XG4gIH0pO1xufTsiLCJ2YXIgZGVmID0gcmVxdWlyZSgnLi9fb2JqZWN0LWRwJykuZlxuICAsIGhhcyA9IHJlcXVpcmUoJy4vX2hhcycpXG4gICwgVEFHID0gcmVxdWlyZSgnLi9fd2tzJykoJ3RvU3RyaW5nVGFnJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oaXQsIHRhZywgc3RhdCl7XG4gIGlmKGl0ICYmICFoYXMoaXQgPSBzdGF0ID8gaXQgOiBpdC5wcm90b3R5cGUsIFRBRykpZGVmKGl0LCBUQUcsIHtjb25maWd1cmFibGU6IHRydWUsIHZhbHVlOiB0YWd9KTtcbn07IiwidmFyIHNoYXJlZCA9IHJlcXVpcmUoJy4vX3NoYXJlZCcpKCdrZXlzJylcclxuICAsIHVpZCAgICA9IHJlcXVpcmUoJy4vX3VpZCcpO1xyXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGtleSl7XHJcbiAgcmV0dXJuIHNoYXJlZFtrZXldIHx8IChzaGFyZWRba2V5XSA9IHVpZChrZXkpKTtcclxufTsiLCJ2YXIgZ2xvYmFsID0gcmVxdWlyZSgnLi9fZ2xvYmFsJylcbiAgLCBTSEFSRUQgPSAnX19jb3JlLWpzX3NoYXJlZF9fJ1xuICAsIHN0b3JlICA9IGdsb2JhbFtTSEFSRURdIHx8IChnbG9iYWxbU0hBUkVEXSA9IHt9KTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oa2V5KXtcbiAgcmV0dXJuIHN0b3JlW2tleV0gfHwgKHN0b3JlW2tleV0gPSB7fSk7XG59OyIsIi8vIDcuMy4yMCBTcGVjaWVzQ29uc3RydWN0b3IoTywgZGVmYXVsdENvbnN0cnVjdG9yKVxudmFyIGFuT2JqZWN0ICA9IHJlcXVpcmUoJy4vX2FuLW9iamVjdCcpXG4gICwgYUZ1bmN0aW9uID0gcmVxdWlyZSgnLi9fYS1mdW5jdGlvbicpXG4gICwgU1BFQ0lFUyAgID0gcmVxdWlyZSgnLi9fd2tzJykoJ3NwZWNpZXMnKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oTywgRCl7XG4gIHZhciBDID0gYW5PYmplY3QoTykuY29uc3RydWN0b3IsIFM7XG4gIHJldHVybiBDID09PSB1bmRlZmluZWQgfHwgKFMgPSBhbk9iamVjdChDKVtTUEVDSUVTXSkgPT0gdW5kZWZpbmVkID8gRCA6IGFGdW5jdGlvbihTKTtcbn07IiwidmFyIGZhaWxzID0gcmVxdWlyZSgnLi9fZmFpbHMnKTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24obWV0aG9kLCBhcmcpe1xyXG4gIHJldHVybiAhIW1ldGhvZCAmJiBmYWlscyhmdW5jdGlvbigpe1xyXG4gICAgYXJnID8gbWV0aG9kLmNhbGwobnVsbCwgZnVuY3Rpb24oKXt9LCAxKSA6IG1ldGhvZC5jYWxsKG51bGwpO1xyXG4gIH0pO1xyXG59OyIsInZhciB0b0ludGVnZXIgPSByZXF1aXJlKCcuL190by1pbnRlZ2VyJylcbiAgLCBkZWZpbmVkICAgPSByZXF1aXJlKCcuL19kZWZpbmVkJyk7XG4vLyB0cnVlICAtPiBTdHJpbmcjYXRcbi8vIGZhbHNlIC0+IFN0cmluZyNjb2RlUG9pbnRBdFxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihUT19TVFJJTkcpe1xuICByZXR1cm4gZnVuY3Rpb24odGhhdCwgcG9zKXtcbiAgICB2YXIgcyA9IFN0cmluZyhkZWZpbmVkKHRoYXQpKVxuICAgICAgLCBpID0gdG9JbnRlZ2VyKHBvcylcbiAgICAgICwgbCA9IHMubGVuZ3RoXG4gICAgICAsIGEsIGI7XG4gICAgaWYoaSA8IDAgfHwgaSA+PSBsKXJldHVybiBUT19TVFJJTkcgPyAnJyA6IHVuZGVmaW5lZDtcbiAgICBhID0gcy5jaGFyQ29kZUF0KGkpO1xuICAgIHJldHVybiBhIDwgMHhkODAwIHx8IGEgPiAweGRiZmYgfHwgaSArIDEgPT09IGwgfHwgKGIgPSBzLmNoYXJDb2RlQXQoaSArIDEpKSA8IDB4ZGMwMCB8fCBiID4gMHhkZmZmXG4gICAgICA/IFRPX1NUUklORyA/IHMuY2hhckF0KGkpIDogYVxuICAgICAgOiBUT19TVFJJTkcgPyBzLnNsaWNlKGksIGkgKyAyKSA6IChhIC0gMHhkODAwIDw8IDEwKSArIChiIC0gMHhkYzAwKSArIDB4MTAwMDA7XG4gIH07XG59OyIsIi8vIGhlbHBlciBmb3IgU3RyaW5nI3tzdGFydHNXaXRoLCBlbmRzV2l0aCwgaW5jbHVkZXN9XG52YXIgaXNSZWdFeHAgPSByZXF1aXJlKCcuL19pcy1yZWdleHAnKVxuICAsIGRlZmluZWQgID0gcmVxdWlyZSgnLi9fZGVmaW5lZCcpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKHRoYXQsIHNlYXJjaFN0cmluZywgTkFNRSl7XG4gIGlmKGlzUmVnRXhwKHNlYXJjaFN0cmluZykpdGhyb3cgVHlwZUVycm9yKCdTdHJpbmcjJyArIE5BTUUgKyBcIiBkb2Vzbid0IGFjY2VwdCByZWdleCFcIik7XG4gIHJldHVybiBTdHJpbmcoZGVmaW5lZCh0aGF0KSk7XG59OyIsInZhciAkZXhwb3J0ID0gcmVxdWlyZSgnLi9fZXhwb3J0JylcbiAgLCBmYWlscyAgID0gcmVxdWlyZSgnLi9fZmFpbHMnKVxuICAsIGRlZmluZWQgPSByZXF1aXJlKCcuL19kZWZpbmVkJylcbiAgLCBxdW90ICAgID0gL1wiL2c7XG4vLyBCLjIuMy4yLjEgQ3JlYXRlSFRNTChzdHJpbmcsIHRhZywgYXR0cmlidXRlLCB2YWx1ZSlcbnZhciBjcmVhdGVIVE1MID0gZnVuY3Rpb24oc3RyaW5nLCB0YWcsIGF0dHJpYnV0ZSwgdmFsdWUpIHtcbiAgdmFyIFMgID0gU3RyaW5nKGRlZmluZWQoc3RyaW5nKSlcbiAgICAsIHAxID0gJzwnICsgdGFnO1xuICBpZihhdHRyaWJ1dGUgIT09ICcnKXAxICs9ICcgJyArIGF0dHJpYnV0ZSArICc9XCInICsgU3RyaW5nKHZhbHVlKS5yZXBsYWNlKHF1b3QsICcmcXVvdDsnKSArICdcIic7XG4gIHJldHVybiBwMSArICc+JyArIFMgKyAnPC8nICsgdGFnICsgJz4nO1xufTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oTkFNRSwgZXhlYyl7XG4gIHZhciBPID0ge307XG4gIE9bTkFNRV0gPSBleGVjKGNyZWF0ZUhUTUwpO1xuICAkZXhwb3J0KCRleHBvcnQuUCArICRleHBvcnQuRiAqIGZhaWxzKGZ1bmN0aW9uKCl7XG4gICAgdmFyIHRlc3QgPSAnJ1tOQU1FXSgnXCInKTtcbiAgICByZXR1cm4gdGVzdCAhPT0gdGVzdC50b0xvd2VyQ2FzZSgpIHx8IHRlc3Quc3BsaXQoJ1wiJykubGVuZ3RoID4gMztcbiAgfSksICdTdHJpbmcnLCBPKTtcbn07IiwiLy8gaHR0cHM6Ly9naXRodWIuY29tL3RjMzkvcHJvcG9zYWwtc3RyaW5nLXBhZC1zdGFydC1lbmRcbnZhciB0b0xlbmd0aCA9IHJlcXVpcmUoJy4vX3RvLWxlbmd0aCcpXG4gICwgcmVwZWF0ICAgPSByZXF1aXJlKCcuL19zdHJpbmctcmVwZWF0JylcbiAgLCBkZWZpbmVkICA9IHJlcXVpcmUoJy4vX2RlZmluZWQnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbih0aGF0LCBtYXhMZW5ndGgsIGZpbGxTdHJpbmcsIGxlZnQpe1xuICB2YXIgUyAgICAgICAgICAgID0gU3RyaW5nKGRlZmluZWQodGhhdCkpXG4gICAgLCBzdHJpbmdMZW5ndGggPSBTLmxlbmd0aFxuICAgICwgZmlsbFN0ciAgICAgID0gZmlsbFN0cmluZyA9PT0gdW5kZWZpbmVkID8gJyAnIDogU3RyaW5nKGZpbGxTdHJpbmcpXG4gICAgLCBpbnRNYXhMZW5ndGggPSB0b0xlbmd0aChtYXhMZW5ndGgpO1xuICBpZihpbnRNYXhMZW5ndGggPD0gc3RyaW5nTGVuZ3RoKXJldHVybiBTO1xuICBpZihmaWxsU3RyID09ICcnKWZpbGxTdHIgPSAnICc7XG4gIHZhciBmaWxsTGVuID0gaW50TWF4TGVuZ3RoIC0gc3RyaW5nTGVuZ3RoXG4gICAgLCBzdHJpbmdGaWxsZXIgPSByZXBlYXQuY2FsbChmaWxsU3RyLCBNYXRoLmNlaWwoZmlsbExlbiAvIGZpbGxTdHIubGVuZ3RoKSk7XG4gIGlmKHN0cmluZ0ZpbGxlci5sZW5ndGggPiBmaWxsTGVuKXN0cmluZ0ZpbGxlciA9IHN0cmluZ0ZpbGxlci5zbGljZSgwLCBmaWxsTGVuKTtcbiAgcmV0dXJuIGxlZnQgPyBzdHJpbmdGaWxsZXIgKyBTIDogUyArIHN0cmluZ0ZpbGxlcjtcbn07XG4iLCIndXNlIHN0cmljdCc7XG52YXIgdG9JbnRlZ2VyID0gcmVxdWlyZSgnLi9fdG8taW50ZWdlcicpXG4gICwgZGVmaW5lZCAgID0gcmVxdWlyZSgnLi9fZGVmaW5lZCcpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHJlcGVhdChjb3VudCl7XG4gIHZhciBzdHIgPSBTdHJpbmcoZGVmaW5lZCh0aGlzKSlcbiAgICAsIHJlcyA9ICcnXG4gICAgLCBuICAgPSB0b0ludGVnZXIoY291bnQpO1xuICBpZihuIDwgMCB8fCBuID09IEluZmluaXR5KXRocm93IFJhbmdlRXJyb3IoXCJDb3VudCBjYW4ndCBiZSBuZWdhdGl2ZVwiKTtcbiAgZm9yKDtuID4gMDsgKG4gPj4+PSAxKSAmJiAoc3RyICs9IHN0cikpaWYobiAmIDEpcmVzICs9IHN0cjtcbiAgcmV0dXJuIHJlcztcbn07IiwidmFyICRleHBvcnQgPSByZXF1aXJlKCcuL19leHBvcnQnKVxuICAsIGRlZmluZWQgPSByZXF1aXJlKCcuL19kZWZpbmVkJylcbiAgLCBmYWlscyAgID0gcmVxdWlyZSgnLi9fZmFpbHMnKVxuICAsIHNwYWNlcyAgPSByZXF1aXJlKCcuL19zdHJpbmctd3MnKVxuICAsIHNwYWNlICAgPSAnWycgKyBzcGFjZXMgKyAnXSdcbiAgLCBub24gICAgID0gJ1xcdTIwMGJcXHUwMDg1J1xuICAsIGx0cmltICAgPSBSZWdFeHAoJ14nICsgc3BhY2UgKyBzcGFjZSArICcqJylcbiAgLCBydHJpbSAgID0gUmVnRXhwKHNwYWNlICsgc3BhY2UgKyAnKiQnKTtcblxudmFyIGV4cG9ydGVyID0gZnVuY3Rpb24oS0VZLCBleGVjLCBBTElBUyl7XG4gIHZhciBleHAgICA9IHt9O1xuICB2YXIgRk9SQ0UgPSBmYWlscyhmdW5jdGlvbigpe1xuICAgIHJldHVybiAhIXNwYWNlc1tLRVldKCkgfHwgbm9uW0tFWV0oKSAhPSBub247XG4gIH0pO1xuICB2YXIgZm4gPSBleHBbS0VZXSA9IEZPUkNFID8gZXhlYyh0cmltKSA6IHNwYWNlc1tLRVldO1xuICBpZihBTElBUylleHBbQUxJQVNdID0gZm47XG4gICRleHBvcnQoJGV4cG9ydC5QICsgJGV4cG9ydC5GICogRk9SQ0UsICdTdHJpbmcnLCBleHApO1xufTtcblxuLy8gMSAtPiBTdHJpbmcjdHJpbUxlZnRcbi8vIDIgLT4gU3RyaW5nI3RyaW1SaWdodFxuLy8gMyAtPiBTdHJpbmcjdHJpbVxudmFyIHRyaW0gPSBleHBvcnRlci50cmltID0gZnVuY3Rpb24oc3RyaW5nLCBUWVBFKXtcbiAgc3RyaW5nID0gU3RyaW5nKGRlZmluZWQoc3RyaW5nKSk7XG4gIGlmKFRZUEUgJiAxKXN0cmluZyA9IHN0cmluZy5yZXBsYWNlKGx0cmltLCAnJyk7XG4gIGlmKFRZUEUgJiAyKXN0cmluZyA9IHN0cmluZy5yZXBsYWNlKHJ0cmltLCAnJyk7XG4gIHJldHVybiBzdHJpbmc7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGV4cG9ydGVyOyIsIm1vZHVsZS5leHBvcnRzID0gJ1xceDA5XFx4MEFcXHgwQlxceDBDXFx4MERcXHgyMFxceEEwXFx1MTY4MFxcdTE4MEVcXHUyMDAwXFx1MjAwMVxcdTIwMDJcXHUyMDAzJyArXHJcbiAgJ1xcdTIwMDRcXHUyMDA1XFx1MjAwNlxcdTIwMDdcXHUyMDA4XFx1MjAwOVxcdTIwMEFcXHUyMDJGXFx1MjA1RlxcdTMwMDBcXHUyMDI4XFx1MjAyOVxcdUZFRkYnOyIsInZhciBjdHggICAgICAgICAgICAgICAgPSByZXF1aXJlKCcuL19jdHgnKVxuICAsIGludm9rZSAgICAgICAgICAgICA9IHJlcXVpcmUoJy4vX2ludm9rZScpXG4gICwgaHRtbCAgICAgICAgICAgICAgID0gcmVxdWlyZSgnLi9faHRtbCcpXG4gICwgY2VsICAgICAgICAgICAgICAgID0gcmVxdWlyZSgnLi9fZG9tLWNyZWF0ZScpXG4gICwgZ2xvYmFsICAgICAgICAgICAgID0gcmVxdWlyZSgnLi9fZ2xvYmFsJylcbiAgLCBwcm9jZXNzICAgICAgICAgICAgPSBnbG9iYWwucHJvY2Vzc1xuICAsIHNldFRhc2sgICAgICAgICAgICA9IGdsb2JhbC5zZXRJbW1lZGlhdGVcbiAgLCBjbGVhclRhc2sgICAgICAgICAgPSBnbG9iYWwuY2xlYXJJbW1lZGlhdGVcbiAgLCBNZXNzYWdlQ2hhbm5lbCAgICAgPSBnbG9iYWwuTWVzc2FnZUNoYW5uZWxcbiAgLCBjb3VudGVyICAgICAgICAgICAgPSAwXG4gICwgcXVldWUgICAgICAgICAgICAgID0ge31cbiAgLCBPTlJFQURZU1RBVEVDSEFOR0UgPSAnb25yZWFkeXN0YXRlY2hhbmdlJ1xuICAsIGRlZmVyLCBjaGFubmVsLCBwb3J0O1xudmFyIHJ1biA9IGZ1bmN0aW9uKCl7XG4gIHZhciBpZCA9ICt0aGlzO1xuICBpZihxdWV1ZS5oYXNPd25Qcm9wZXJ0eShpZCkpe1xuICAgIHZhciBmbiA9IHF1ZXVlW2lkXTtcbiAgICBkZWxldGUgcXVldWVbaWRdO1xuICAgIGZuKCk7XG4gIH1cbn07XG52YXIgbGlzdGVuZXIgPSBmdW5jdGlvbihldmVudCl7XG4gIHJ1bi5jYWxsKGV2ZW50LmRhdGEpO1xufTtcbi8vIE5vZGUuanMgMC45KyAmIElFMTArIGhhcyBzZXRJbW1lZGlhdGUsIG90aGVyd2lzZTpcbmlmKCFzZXRUYXNrIHx8ICFjbGVhclRhc2spe1xuICBzZXRUYXNrID0gZnVuY3Rpb24gc2V0SW1tZWRpYXRlKGZuKXtcbiAgICB2YXIgYXJncyA9IFtdLCBpID0gMTtcbiAgICB3aGlsZShhcmd1bWVudHMubGVuZ3RoID4gaSlhcmdzLnB1c2goYXJndW1lbnRzW2krK10pO1xuICAgIHF1ZXVlWysrY291bnRlcl0gPSBmdW5jdGlvbigpe1xuICAgICAgaW52b2tlKHR5cGVvZiBmbiA9PSAnZnVuY3Rpb24nID8gZm4gOiBGdW5jdGlvbihmbiksIGFyZ3MpO1xuICAgIH07XG4gICAgZGVmZXIoY291bnRlcik7XG4gICAgcmV0dXJuIGNvdW50ZXI7XG4gIH07XG4gIGNsZWFyVGFzayA9IGZ1bmN0aW9uIGNsZWFySW1tZWRpYXRlKGlkKXtcbiAgICBkZWxldGUgcXVldWVbaWRdO1xuICB9O1xuICAvLyBOb2RlLmpzIDAuOC1cbiAgaWYocmVxdWlyZSgnLi9fY29mJykocHJvY2VzcykgPT0gJ3Byb2Nlc3MnKXtcbiAgICBkZWZlciA9IGZ1bmN0aW9uKGlkKXtcbiAgICAgIHByb2Nlc3MubmV4dFRpY2soY3R4KHJ1biwgaWQsIDEpKTtcbiAgICB9O1xuICAvLyBCcm93c2VycyB3aXRoIE1lc3NhZ2VDaGFubmVsLCBpbmNsdWRlcyBXZWJXb3JrZXJzXG4gIH0gZWxzZSBpZihNZXNzYWdlQ2hhbm5lbCl7XG4gICAgY2hhbm5lbCA9IG5ldyBNZXNzYWdlQ2hhbm5lbDtcbiAgICBwb3J0ICAgID0gY2hhbm5lbC5wb3J0MjtcbiAgICBjaGFubmVsLnBvcnQxLm9ubWVzc2FnZSA9IGxpc3RlbmVyO1xuICAgIGRlZmVyID0gY3R4KHBvcnQucG9zdE1lc3NhZ2UsIHBvcnQsIDEpO1xuICAvLyBCcm93c2VycyB3aXRoIHBvc3RNZXNzYWdlLCBza2lwIFdlYldvcmtlcnNcbiAgLy8gSUU4IGhhcyBwb3N0TWVzc2FnZSwgYnV0IGl0J3Mgc3luYyAmIHR5cGVvZiBpdHMgcG9zdE1lc3NhZ2UgaXMgJ29iamVjdCdcbiAgfSBlbHNlIGlmKGdsb2JhbC5hZGRFdmVudExpc3RlbmVyICYmIHR5cGVvZiBwb3N0TWVzc2FnZSA9PSAnZnVuY3Rpb24nICYmICFnbG9iYWwuaW1wb3J0U2NyaXB0cyl7XG4gICAgZGVmZXIgPSBmdW5jdGlvbihpZCl7XG4gICAgICBnbG9iYWwucG9zdE1lc3NhZ2UoaWQgKyAnJywgJyonKTtcbiAgICB9O1xuICAgIGdsb2JhbC5hZGRFdmVudExpc3RlbmVyKCdtZXNzYWdlJywgbGlzdGVuZXIsIGZhbHNlKTtcbiAgLy8gSUU4LVxuICB9IGVsc2UgaWYoT05SRUFEWVNUQVRFQ0hBTkdFIGluIGNlbCgnc2NyaXB0Jykpe1xuICAgIGRlZmVyID0gZnVuY3Rpb24oaWQpe1xuICAgICAgaHRtbC5hcHBlbmRDaGlsZChjZWwoJ3NjcmlwdCcpKVtPTlJFQURZU1RBVEVDSEFOR0VdID0gZnVuY3Rpb24oKXtcbiAgICAgICAgaHRtbC5yZW1vdmVDaGlsZCh0aGlzKTtcbiAgICAgICAgcnVuLmNhbGwoaWQpO1xuICAgICAgfTtcbiAgICB9O1xuICAvLyBSZXN0IG9sZCBicm93c2Vyc1xuICB9IGVsc2Uge1xuICAgIGRlZmVyID0gZnVuY3Rpb24oaWQpe1xuICAgICAgc2V0VGltZW91dChjdHgocnVuLCBpZCwgMSksIDApO1xuICAgIH07XG4gIH1cbn1cbm1vZHVsZS5leHBvcnRzID0ge1xuICBzZXQ6ICAgc2V0VGFzayxcbiAgY2xlYXI6IGNsZWFyVGFza1xufTsiLCJ2YXIgdG9JbnRlZ2VyID0gcmVxdWlyZSgnLi9fdG8taW50ZWdlcicpXG4gICwgbWF4ICAgICAgID0gTWF0aC5tYXhcbiAgLCBtaW4gICAgICAgPSBNYXRoLm1pbjtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oaW5kZXgsIGxlbmd0aCl7XG4gIGluZGV4ID0gdG9JbnRlZ2VyKGluZGV4KTtcbiAgcmV0dXJuIGluZGV4IDwgMCA/IG1heChpbmRleCArIGxlbmd0aCwgMCkgOiBtaW4oaW5kZXgsIGxlbmd0aCk7XG59OyIsIi8vIDcuMS40IFRvSW50ZWdlclxudmFyIGNlaWwgID0gTWF0aC5jZWlsXG4gICwgZmxvb3IgPSBNYXRoLmZsb29yO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpdCl7XG4gIHJldHVybiBpc05hTihpdCA9ICtpdCkgPyAwIDogKGl0ID4gMCA/IGZsb29yIDogY2VpbCkoaXQpO1xufTsiLCIvLyB0byBpbmRleGVkIG9iamVjdCwgdG9PYmplY3Qgd2l0aCBmYWxsYmFjayBmb3Igbm9uLWFycmF5LWxpa2UgRVMzIHN0cmluZ3NcbnZhciBJT2JqZWN0ID0gcmVxdWlyZSgnLi9faW9iamVjdCcpXG4gICwgZGVmaW5lZCA9IHJlcXVpcmUoJy4vX2RlZmluZWQnKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oaXQpe1xuICByZXR1cm4gSU9iamVjdChkZWZpbmVkKGl0KSk7XG59OyIsIi8vIDcuMS4xNSBUb0xlbmd0aFxudmFyIHRvSW50ZWdlciA9IHJlcXVpcmUoJy4vX3RvLWludGVnZXInKVxuICAsIG1pbiAgICAgICA9IE1hdGgubWluO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpdCl7XG4gIHJldHVybiBpdCA+IDAgPyBtaW4odG9JbnRlZ2VyKGl0KSwgMHgxZmZmZmZmZmZmZmZmZikgOiAwOyAvLyBwb3coMiwgNTMpIC0gMSA9PSA5MDA3MTk5MjU0NzQwOTkxXG59OyIsIi8vIDcuMS4xMyBUb09iamVjdChhcmd1bWVudClcbnZhciBkZWZpbmVkID0gcmVxdWlyZSgnLi9fZGVmaW5lZCcpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpdCl7XG4gIHJldHVybiBPYmplY3QoZGVmaW5lZChpdCkpO1xufTsiLCIvLyA3LjEuMSBUb1ByaW1pdGl2ZShpbnB1dCBbLCBQcmVmZXJyZWRUeXBlXSlcbnZhciBpc09iamVjdCA9IHJlcXVpcmUoJy4vX2lzLW9iamVjdCcpO1xuLy8gaW5zdGVhZCBvZiB0aGUgRVM2IHNwZWMgdmVyc2lvbiwgd2UgZGlkbid0IGltcGxlbWVudCBAQHRvUHJpbWl0aXZlIGNhc2Vcbi8vIGFuZCB0aGUgc2Vjb25kIGFyZ3VtZW50IC0gZmxhZyAtIHByZWZlcnJlZCB0eXBlIGlzIGEgc3RyaW5nXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGl0LCBTKXtcbiAgaWYoIWlzT2JqZWN0KGl0KSlyZXR1cm4gaXQ7XG4gIHZhciBmbiwgdmFsO1xuICBpZihTICYmIHR5cGVvZiAoZm4gPSBpdC50b1N0cmluZykgPT0gJ2Z1bmN0aW9uJyAmJiAhaXNPYmplY3QodmFsID0gZm4uY2FsbChpdCkpKXJldHVybiB2YWw7XG4gIGlmKHR5cGVvZiAoZm4gPSBpdC52YWx1ZU9mKSA9PSAnZnVuY3Rpb24nICYmICFpc09iamVjdCh2YWwgPSBmbi5jYWxsKGl0KSkpcmV0dXJuIHZhbDtcbiAgaWYoIVMgJiYgdHlwZW9mIChmbiA9IGl0LnRvU3RyaW5nKSA9PSAnZnVuY3Rpb24nICYmICFpc09iamVjdCh2YWwgPSBmbi5jYWxsKGl0KSkpcmV0dXJuIHZhbDtcbiAgdGhyb3cgVHlwZUVycm9yKFwiQ2FuJ3QgY29udmVydCBvYmplY3QgdG8gcHJpbWl0aXZlIHZhbHVlXCIpO1xufTsiLCIndXNlIHN0cmljdCc7XG5pZihyZXF1aXJlKCcuL19kZXNjcmlwdG9ycycpKXtcbiAgdmFyIExJQlJBUlkgICAgICAgICAgICAgPSByZXF1aXJlKCcuL19saWJyYXJ5JylcbiAgICAsIGdsb2JhbCAgICAgICAgICAgICAgPSByZXF1aXJlKCcuL19nbG9iYWwnKVxuICAgICwgZmFpbHMgICAgICAgICAgICAgICA9IHJlcXVpcmUoJy4vX2ZhaWxzJylcbiAgICAsICRleHBvcnQgICAgICAgICAgICAgPSByZXF1aXJlKCcuL19leHBvcnQnKVxuICAgICwgJHR5cGVkICAgICAgICAgICAgICA9IHJlcXVpcmUoJy4vX3R5cGVkJylcbiAgICAsICRidWZmZXIgICAgICAgICAgICAgPSByZXF1aXJlKCcuL190eXBlZC1idWZmZXInKVxuICAgICwgY3R4ICAgICAgICAgICAgICAgICA9IHJlcXVpcmUoJy4vX2N0eCcpXG4gICAgLCBhbkluc3RhbmNlICAgICAgICAgID0gcmVxdWlyZSgnLi9fYW4taW5zdGFuY2UnKVxuICAgICwgcHJvcGVydHlEZXNjICAgICAgICA9IHJlcXVpcmUoJy4vX3Byb3BlcnR5LWRlc2MnKVxuICAgICwgaGlkZSAgICAgICAgICAgICAgICA9IHJlcXVpcmUoJy4vX2hpZGUnKVxuICAgICwgcmVkZWZpbmVBbGwgICAgICAgICA9IHJlcXVpcmUoJy4vX3JlZGVmaW5lLWFsbCcpXG4gICAgLCBpc0ludGVnZXIgICAgICAgICAgID0gcmVxdWlyZSgnLi9faXMtaW50ZWdlcicpXG4gICAgLCB0b0ludGVnZXIgICAgICAgICAgID0gcmVxdWlyZSgnLi9fdG8taW50ZWdlcicpXG4gICAgLCB0b0xlbmd0aCAgICAgICAgICAgID0gcmVxdWlyZSgnLi9fdG8tbGVuZ3RoJylcbiAgICAsIHRvSW5kZXggICAgICAgICAgICAgPSByZXF1aXJlKCcuL190by1pbmRleCcpXG4gICAgLCB0b1ByaW1pdGl2ZSAgICAgICAgID0gcmVxdWlyZSgnLi9fdG8tcHJpbWl0aXZlJylcbiAgICAsIGhhcyAgICAgICAgICAgICAgICAgPSByZXF1aXJlKCcuL19oYXMnKVxuICAgICwgc2FtZSAgICAgICAgICAgICAgICA9IHJlcXVpcmUoJy4vX3NhbWUtdmFsdWUnKVxuICAgICwgY2xhc3NvZiAgICAgICAgICAgICA9IHJlcXVpcmUoJy4vX2NsYXNzb2YnKVxuICAgICwgaXNPYmplY3QgICAgICAgICAgICA9IHJlcXVpcmUoJy4vX2lzLW9iamVjdCcpXG4gICAgLCB0b09iamVjdCAgICAgICAgICAgID0gcmVxdWlyZSgnLi9fdG8tb2JqZWN0JylcbiAgICAsIGlzQXJyYXlJdGVyICAgICAgICAgPSByZXF1aXJlKCcuL19pcy1hcnJheS1pdGVyJylcbiAgICAsIGNyZWF0ZSAgICAgICAgICAgICAgPSByZXF1aXJlKCcuL19vYmplY3QtY3JlYXRlJylcbiAgICAsIGdldFByb3RvdHlwZU9mICAgICAgPSByZXF1aXJlKCcuL19vYmplY3QtZ3BvJylcbiAgICAsIGdPUE4gICAgICAgICAgICAgICAgPSByZXF1aXJlKCcuL19vYmplY3QtZ29wbicpLmZcbiAgICAsIGlzSXRlcmFibGUgICAgICAgICAgPSByZXF1aXJlKCcuL2NvcmUuaXMtaXRlcmFibGUnKVxuICAgICwgZ2V0SXRlckZuICAgICAgICAgICA9IHJlcXVpcmUoJy4vY29yZS5nZXQtaXRlcmF0b3ItbWV0aG9kJylcbiAgICAsIHVpZCAgICAgICAgICAgICAgICAgPSByZXF1aXJlKCcuL191aWQnKVxuICAgICwgd2tzICAgICAgICAgICAgICAgICA9IHJlcXVpcmUoJy4vX3drcycpXG4gICAgLCBjcmVhdGVBcnJheU1ldGhvZCAgID0gcmVxdWlyZSgnLi9fYXJyYXktbWV0aG9kcycpXG4gICAgLCBjcmVhdGVBcnJheUluY2x1ZGVzID0gcmVxdWlyZSgnLi9fYXJyYXktaW5jbHVkZXMnKVxuICAgICwgc3BlY2llc0NvbnN0cnVjdG9yICA9IHJlcXVpcmUoJy4vX3NwZWNpZXMtY29uc3RydWN0b3InKVxuICAgICwgQXJyYXlJdGVyYXRvcnMgICAgICA9IHJlcXVpcmUoJy4vZXM2LmFycmF5Lml0ZXJhdG9yJylcbiAgICAsIEl0ZXJhdG9ycyAgICAgICAgICAgPSByZXF1aXJlKCcuL19pdGVyYXRvcnMnKVxuICAgICwgJGl0ZXJEZXRlY3QgICAgICAgICA9IHJlcXVpcmUoJy4vX2l0ZXItZGV0ZWN0JylcbiAgICAsIHNldFNwZWNpZXMgICAgICAgICAgPSByZXF1aXJlKCcuL19zZXQtc3BlY2llcycpXG4gICAgLCBhcnJheUZpbGwgICAgICAgICAgID0gcmVxdWlyZSgnLi9fYXJyYXktZmlsbCcpXG4gICAgLCBhcnJheUNvcHlXaXRoaW4gICAgID0gcmVxdWlyZSgnLi9fYXJyYXktY29weS13aXRoaW4nKVxuICAgICwgJERQICAgICAgICAgICAgICAgICA9IHJlcXVpcmUoJy4vX29iamVjdC1kcCcpXG4gICAgLCAkR09QRCAgICAgICAgICAgICAgID0gcmVxdWlyZSgnLi9fb2JqZWN0LWdvcGQnKVxuICAgICwgZFAgICAgICAgICAgICAgICAgICA9ICREUC5mXG4gICAgLCBnT1BEICAgICAgICAgICAgICAgID0gJEdPUEQuZlxuICAgICwgUmFuZ2VFcnJvciAgICAgICAgICA9IGdsb2JhbC5SYW5nZUVycm9yXG4gICAgLCBUeXBlRXJyb3IgICAgICAgICAgID0gZ2xvYmFsLlR5cGVFcnJvclxuICAgICwgVWludDhBcnJheSAgICAgICAgICA9IGdsb2JhbC5VaW50OEFycmF5XG4gICAgLCBBUlJBWV9CVUZGRVIgICAgICAgID0gJ0FycmF5QnVmZmVyJ1xuICAgICwgU0hBUkVEX0JVRkZFUiAgICAgICA9ICdTaGFyZWQnICsgQVJSQVlfQlVGRkVSXG4gICAgLCBCWVRFU19QRVJfRUxFTUVOVCAgID0gJ0JZVEVTX1BFUl9FTEVNRU5UJ1xuICAgICwgUFJPVE9UWVBFICAgICAgICAgICA9ICdwcm90b3R5cGUnXG4gICAgLCBBcnJheVByb3RvICAgICAgICAgID0gQXJyYXlbUFJPVE9UWVBFXVxuICAgICwgJEFycmF5QnVmZmVyICAgICAgICA9ICRidWZmZXIuQXJyYXlCdWZmZXJcbiAgICAsICREYXRhVmlldyAgICAgICAgICAgPSAkYnVmZmVyLkRhdGFWaWV3XG4gICAgLCBhcnJheUZvckVhY2ggICAgICAgID0gY3JlYXRlQXJyYXlNZXRob2QoMClcbiAgICAsIGFycmF5RmlsdGVyICAgICAgICAgPSBjcmVhdGVBcnJheU1ldGhvZCgyKVxuICAgICwgYXJyYXlTb21lICAgICAgICAgICA9IGNyZWF0ZUFycmF5TWV0aG9kKDMpXG4gICAgLCBhcnJheUV2ZXJ5ICAgICAgICAgID0gY3JlYXRlQXJyYXlNZXRob2QoNClcbiAgICAsIGFycmF5RmluZCAgICAgICAgICAgPSBjcmVhdGVBcnJheU1ldGhvZCg1KVxuICAgICwgYXJyYXlGaW5kSW5kZXggICAgICA9IGNyZWF0ZUFycmF5TWV0aG9kKDYpXG4gICAgLCBhcnJheUluY2x1ZGVzICAgICAgID0gY3JlYXRlQXJyYXlJbmNsdWRlcyh0cnVlKVxuICAgICwgYXJyYXlJbmRleE9mICAgICAgICA9IGNyZWF0ZUFycmF5SW5jbHVkZXMoZmFsc2UpXG4gICAgLCBhcnJheVZhbHVlcyAgICAgICAgID0gQXJyYXlJdGVyYXRvcnMudmFsdWVzXG4gICAgLCBhcnJheUtleXMgICAgICAgICAgID0gQXJyYXlJdGVyYXRvcnMua2V5c1xuICAgICwgYXJyYXlFbnRyaWVzICAgICAgICA9IEFycmF5SXRlcmF0b3JzLmVudHJpZXNcbiAgICAsIGFycmF5TGFzdEluZGV4T2YgICAgPSBBcnJheVByb3RvLmxhc3RJbmRleE9mXG4gICAgLCBhcnJheVJlZHVjZSAgICAgICAgID0gQXJyYXlQcm90by5yZWR1Y2VcbiAgICAsIGFycmF5UmVkdWNlUmlnaHQgICAgPSBBcnJheVByb3RvLnJlZHVjZVJpZ2h0XG4gICAgLCBhcnJheUpvaW4gICAgICAgICAgID0gQXJyYXlQcm90by5qb2luXG4gICAgLCBhcnJheVNvcnQgICAgICAgICAgID0gQXJyYXlQcm90by5zb3J0XG4gICAgLCBhcnJheVNsaWNlICAgICAgICAgID0gQXJyYXlQcm90by5zbGljZVxuICAgICwgYXJyYXlUb1N0cmluZyAgICAgICA9IEFycmF5UHJvdG8udG9TdHJpbmdcbiAgICAsIGFycmF5VG9Mb2NhbGVTdHJpbmcgPSBBcnJheVByb3RvLnRvTG9jYWxlU3RyaW5nXG4gICAgLCBJVEVSQVRPUiAgICAgICAgICAgID0gd2tzKCdpdGVyYXRvcicpXG4gICAgLCBUQUcgICAgICAgICAgICAgICAgID0gd2tzKCd0b1N0cmluZ1RhZycpXG4gICAgLCBUWVBFRF9DT05TVFJVQ1RPUiAgID0gdWlkKCd0eXBlZF9jb25zdHJ1Y3RvcicpXG4gICAgLCBERUZfQ09OU1RSVUNUT1IgICAgID0gdWlkKCdkZWZfY29uc3RydWN0b3InKVxuICAgICwgQUxMX0NPTlNUUlVDVE9SUyAgICA9ICR0eXBlZC5DT05TVFJcbiAgICAsIFRZUEVEX0FSUkFZICAgICAgICAgPSAkdHlwZWQuVFlQRURcbiAgICAsIFZJRVcgICAgICAgICAgICAgICAgPSAkdHlwZWQuVklFV1xuICAgICwgV1JPTkdfTEVOR1RIICAgICAgICA9ICdXcm9uZyBsZW5ndGghJztcblxuICB2YXIgJG1hcCA9IGNyZWF0ZUFycmF5TWV0aG9kKDEsIGZ1bmN0aW9uKE8sIGxlbmd0aCl7XG4gICAgcmV0dXJuIGFsbG9jYXRlKHNwZWNpZXNDb25zdHJ1Y3RvcihPLCBPW0RFRl9DT05TVFJVQ1RPUl0pLCBsZW5ndGgpO1xuICB9KTtcblxuICB2YXIgTElUVExFX0VORElBTiA9IGZhaWxzKGZ1bmN0aW9uKCl7XG4gICAgcmV0dXJuIG5ldyBVaW50OEFycmF5KG5ldyBVaW50MTZBcnJheShbMV0pLmJ1ZmZlcilbMF0gPT09IDE7XG4gIH0pO1xuXG4gIHZhciBGT1JDRURfU0VUID0gISFVaW50OEFycmF5ICYmICEhVWludDhBcnJheVtQUk9UT1RZUEVdLnNldCAmJiBmYWlscyhmdW5jdGlvbigpe1xuICAgIG5ldyBVaW50OEFycmF5KDEpLnNldCh7fSk7XG4gIH0pO1xuXG4gIHZhciBzdHJpY3RUb0xlbmd0aCA9IGZ1bmN0aW9uKGl0LCBTQU1FKXtcbiAgICBpZihpdCA9PT0gdW5kZWZpbmVkKXRocm93IFR5cGVFcnJvcihXUk9OR19MRU5HVEgpO1xuICAgIHZhciBudW1iZXIgPSAraXRcbiAgICAgICwgbGVuZ3RoID0gdG9MZW5ndGgoaXQpO1xuICAgIGlmKFNBTUUgJiYgIXNhbWUobnVtYmVyLCBsZW5ndGgpKXRocm93IFJhbmdlRXJyb3IoV1JPTkdfTEVOR1RIKTtcbiAgICByZXR1cm4gbGVuZ3RoO1xuICB9O1xuXG4gIHZhciB0b09mZnNldCA9IGZ1bmN0aW9uKGl0LCBCWVRFUyl7XG4gICAgdmFyIG9mZnNldCA9IHRvSW50ZWdlcihpdCk7XG4gICAgaWYob2Zmc2V0IDwgMCB8fCBvZmZzZXQgJSBCWVRFUyl0aHJvdyBSYW5nZUVycm9yKCdXcm9uZyBvZmZzZXQhJyk7XG4gICAgcmV0dXJuIG9mZnNldDtcbiAgfTtcblxuICB2YXIgdmFsaWRhdGUgPSBmdW5jdGlvbihpdCl7XG4gICAgaWYoaXNPYmplY3QoaXQpICYmIFRZUEVEX0FSUkFZIGluIGl0KXJldHVybiBpdDtcbiAgICB0aHJvdyBUeXBlRXJyb3IoaXQgKyAnIGlzIG5vdCBhIHR5cGVkIGFycmF5IScpO1xuICB9O1xuXG4gIHZhciBhbGxvY2F0ZSA9IGZ1bmN0aW9uKEMsIGxlbmd0aCl7XG4gICAgaWYoIShpc09iamVjdChDKSAmJiBUWVBFRF9DT05TVFJVQ1RPUiBpbiBDKSl7XG4gICAgICB0aHJvdyBUeXBlRXJyb3IoJ0l0IGlzIG5vdCBhIHR5cGVkIGFycmF5IGNvbnN0cnVjdG9yIScpO1xuICAgIH0gcmV0dXJuIG5ldyBDKGxlbmd0aCk7XG4gIH07XG5cbiAgdmFyIHNwZWNpZXNGcm9tTGlzdCA9IGZ1bmN0aW9uKE8sIGxpc3Qpe1xuICAgIHJldHVybiBmcm9tTGlzdChzcGVjaWVzQ29uc3RydWN0b3IoTywgT1tERUZfQ09OU1RSVUNUT1JdKSwgbGlzdCk7XG4gIH07XG5cbiAgdmFyIGZyb21MaXN0ID0gZnVuY3Rpb24oQywgbGlzdCl7XG4gICAgdmFyIGluZGV4ICA9IDBcbiAgICAgICwgbGVuZ3RoID0gbGlzdC5sZW5ndGhcbiAgICAgICwgcmVzdWx0ID0gYWxsb2NhdGUoQywgbGVuZ3RoKTtcbiAgICB3aGlsZShsZW5ndGggPiBpbmRleClyZXN1bHRbaW5kZXhdID0gbGlzdFtpbmRleCsrXTtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9O1xuXG4gIHZhciBhZGRHZXR0ZXIgPSBmdW5jdGlvbihpdCwga2V5LCBpbnRlcm5hbCl7XG4gICAgZFAoaXQsIGtleSwge2dldDogZnVuY3Rpb24oKXsgcmV0dXJuIHRoaXMuX2RbaW50ZXJuYWxdOyB9fSk7XG4gIH07XG5cbiAgdmFyICRmcm9tID0gZnVuY3Rpb24gZnJvbShzb3VyY2UgLyosIG1hcGZuLCB0aGlzQXJnICovKXtcbiAgICB2YXIgTyAgICAgICA9IHRvT2JqZWN0KHNvdXJjZSlcbiAgICAgICwgYUxlbiAgICA9IGFyZ3VtZW50cy5sZW5ndGhcbiAgICAgICwgbWFwZm4gICA9IGFMZW4gPiAxID8gYXJndW1lbnRzWzFdIDogdW5kZWZpbmVkXG4gICAgICAsIG1hcHBpbmcgPSBtYXBmbiAhPT0gdW5kZWZpbmVkXG4gICAgICAsIGl0ZXJGbiAgPSBnZXRJdGVyRm4oTylcbiAgICAgICwgaSwgbGVuZ3RoLCB2YWx1ZXMsIHJlc3VsdCwgc3RlcCwgaXRlcmF0b3I7XG4gICAgaWYoaXRlckZuICE9IHVuZGVmaW5lZCAmJiAhaXNBcnJheUl0ZXIoaXRlckZuKSl7XG4gICAgICBmb3IoaXRlcmF0b3IgPSBpdGVyRm4uY2FsbChPKSwgdmFsdWVzID0gW10sIGkgPSAwOyAhKHN0ZXAgPSBpdGVyYXRvci5uZXh0KCkpLmRvbmU7IGkrKyl7XG4gICAgICAgIHZhbHVlcy5wdXNoKHN0ZXAudmFsdWUpO1xuICAgICAgfSBPID0gdmFsdWVzO1xuICAgIH1cbiAgICBpZihtYXBwaW5nICYmIGFMZW4gPiAyKW1hcGZuID0gY3R4KG1hcGZuLCBhcmd1bWVudHNbMl0sIDIpO1xuICAgIGZvcihpID0gMCwgbGVuZ3RoID0gdG9MZW5ndGgoTy5sZW5ndGgpLCByZXN1bHQgPSBhbGxvY2F0ZSh0aGlzLCBsZW5ndGgpOyBsZW5ndGggPiBpOyBpKyspe1xuICAgICAgcmVzdWx0W2ldID0gbWFwcGluZyA/IG1hcGZuKE9baV0sIGkpIDogT1tpXTtcbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfTtcblxuICB2YXIgJG9mID0gZnVuY3Rpb24gb2YoLyouLi5pdGVtcyovKXtcbiAgICB2YXIgaW5kZXggID0gMFxuICAgICAgLCBsZW5ndGggPSBhcmd1bWVudHMubGVuZ3RoXG4gICAgICAsIHJlc3VsdCA9IGFsbG9jYXRlKHRoaXMsIGxlbmd0aCk7XG4gICAgd2hpbGUobGVuZ3RoID4gaW5kZXgpcmVzdWx0W2luZGV4XSA9IGFyZ3VtZW50c1tpbmRleCsrXTtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9O1xuXG4gIC8vIGlPUyBTYWZhcmkgNi54IGZhaWxzIGhlcmVcbiAgdmFyIFRPX0xPQ0FMRV9CVUcgPSAhIVVpbnQ4QXJyYXkgJiYgZmFpbHMoZnVuY3Rpb24oKXsgYXJyYXlUb0xvY2FsZVN0cmluZy5jYWxsKG5ldyBVaW50OEFycmF5KDEpKTsgfSk7XG5cbiAgdmFyICR0b0xvY2FsZVN0cmluZyA9IGZ1bmN0aW9uIHRvTG9jYWxlU3RyaW5nKCl7XG4gICAgcmV0dXJuIGFycmF5VG9Mb2NhbGVTdHJpbmcuYXBwbHkoVE9fTE9DQUxFX0JVRyA/IGFycmF5U2xpY2UuY2FsbCh2YWxpZGF0ZSh0aGlzKSkgOiB2YWxpZGF0ZSh0aGlzKSwgYXJndW1lbnRzKTtcbiAgfTtcblxuICB2YXIgcHJvdG8gPSB7XG4gICAgY29weVdpdGhpbjogZnVuY3Rpb24gY29weVdpdGhpbih0YXJnZXQsIHN0YXJ0IC8qLCBlbmQgKi8pe1xuICAgICAgcmV0dXJuIGFycmF5Q29weVdpdGhpbi5jYWxsKHZhbGlkYXRlKHRoaXMpLCB0YXJnZXQsIHN0YXJ0LCBhcmd1bWVudHMubGVuZ3RoID4gMiA/IGFyZ3VtZW50c1syXSA6IHVuZGVmaW5lZCk7XG4gICAgfSxcbiAgICBldmVyeTogZnVuY3Rpb24gZXZlcnkoY2FsbGJhY2tmbiAvKiwgdGhpc0FyZyAqLyl7XG4gICAgICByZXR1cm4gYXJyYXlFdmVyeSh2YWxpZGF0ZSh0aGlzKSwgY2FsbGJhY2tmbiwgYXJndW1lbnRzLmxlbmd0aCA+IDEgPyBhcmd1bWVudHNbMV0gOiB1bmRlZmluZWQpO1xuICAgIH0sXG4gICAgZmlsbDogZnVuY3Rpb24gZmlsbCh2YWx1ZSAvKiwgc3RhcnQsIGVuZCAqLyl7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW51c2VkLXZhcnNcbiAgICAgIHJldHVybiBhcnJheUZpbGwuYXBwbHkodmFsaWRhdGUodGhpcyksIGFyZ3VtZW50cyk7XG4gICAgfSxcbiAgICBmaWx0ZXI6IGZ1bmN0aW9uIGZpbHRlcihjYWxsYmFja2ZuIC8qLCB0aGlzQXJnICovKXtcbiAgICAgIHJldHVybiBzcGVjaWVzRnJvbUxpc3QodGhpcywgYXJyYXlGaWx0ZXIodmFsaWRhdGUodGhpcyksIGNhbGxiYWNrZm4sXG4gICAgICAgIGFyZ3VtZW50cy5sZW5ndGggPiAxID8gYXJndW1lbnRzWzFdIDogdW5kZWZpbmVkKSk7XG4gICAgfSxcbiAgICBmaW5kOiBmdW5jdGlvbiBmaW5kKHByZWRpY2F0ZSAvKiwgdGhpc0FyZyAqLyl7XG4gICAgICByZXR1cm4gYXJyYXlGaW5kKHZhbGlkYXRlKHRoaXMpLCBwcmVkaWNhdGUsIGFyZ3VtZW50cy5sZW5ndGggPiAxID8gYXJndW1lbnRzWzFdIDogdW5kZWZpbmVkKTtcbiAgICB9LFxuICAgIGZpbmRJbmRleDogZnVuY3Rpb24gZmluZEluZGV4KHByZWRpY2F0ZSAvKiwgdGhpc0FyZyAqLyl7XG4gICAgICByZXR1cm4gYXJyYXlGaW5kSW5kZXgodmFsaWRhdGUodGhpcyksIHByZWRpY2F0ZSwgYXJndW1lbnRzLmxlbmd0aCA+IDEgPyBhcmd1bWVudHNbMV0gOiB1bmRlZmluZWQpO1xuICAgIH0sXG4gICAgZm9yRWFjaDogZnVuY3Rpb24gZm9yRWFjaChjYWxsYmFja2ZuIC8qLCB0aGlzQXJnICovKXtcbiAgICAgIGFycmF5Rm9yRWFjaCh2YWxpZGF0ZSh0aGlzKSwgY2FsbGJhY2tmbiwgYXJndW1lbnRzLmxlbmd0aCA+IDEgPyBhcmd1bWVudHNbMV0gOiB1bmRlZmluZWQpO1xuICAgIH0sXG4gICAgaW5kZXhPZjogZnVuY3Rpb24gaW5kZXhPZihzZWFyY2hFbGVtZW50IC8qLCBmcm9tSW5kZXggKi8pe1xuICAgICAgcmV0dXJuIGFycmF5SW5kZXhPZih2YWxpZGF0ZSh0aGlzKSwgc2VhcmNoRWxlbWVudCwgYXJndW1lbnRzLmxlbmd0aCA+IDEgPyBhcmd1bWVudHNbMV0gOiB1bmRlZmluZWQpO1xuICAgIH0sXG4gICAgaW5jbHVkZXM6IGZ1bmN0aW9uIGluY2x1ZGVzKHNlYXJjaEVsZW1lbnQgLyosIGZyb21JbmRleCAqLyl7XG4gICAgICByZXR1cm4gYXJyYXlJbmNsdWRlcyh2YWxpZGF0ZSh0aGlzKSwgc2VhcmNoRWxlbWVudCwgYXJndW1lbnRzLmxlbmd0aCA+IDEgPyBhcmd1bWVudHNbMV0gOiB1bmRlZmluZWQpO1xuICAgIH0sXG4gICAgam9pbjogZnVuY3Rpb24gam9pbihzZXBhcmF0b3IpeyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVudXNlZC12YXJzXG4gICAgICByZXR1cm4gYXJyYXlKb2luLmFwcGx5KHZhbGlkYXRlKHRoaXMpLCBhcmd1bWVudHMpO1xuICAgIH0sXG4gICAgbGFzdEluZGV4T2Y6IGZ1bmN0aW9uIGxhc3RJbmRleE9mKHNlYXJjaEVsZW1lbnQgLyosIGZyb21JbmRleCAqLyl7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW51c2VkLXZhcnNcbiAgICAgIHJldHVybiBhcnJheUxhc3RJbmRleE9mLmFwcGx5KHZhbGlkYXRlKHRoaXMpLCBhcmd1bWVudHMpO1xuICAgIH0sXG4gICAgbWFwOiBmdW5jdGlvbiBtYXAobWFwZm4gLyosIHRoaXNBcmcgKi8pe1xuICAgICAgcmV0dXJuICRtYXAodmFsaWRhdGUodGhpcyksIG1hcGZuLCBhcmd1bWVudHMubGVuZ3RoID4gMSA/IGFyZ3VtZW50c1sxXSA6IHVuZGVmaW5lZCk7XG4gICAgfSxcbiAgICByZWR1Y2U6IGZ1bmN0aW9uIHJlZHVjZShjYWxsYmFja2ZuIC8qLCBpbml0aWFsVmFsdWUgKi8peyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVudXNlZC12YXJzXG4gICAgICByZXR1cm4gYXJyYXlSZWR1Y2UuYXBwbHkodmFsaWRhdGUodGhpcyksIGFyZ3VtZW50cyk7XG4gICAgfSxcbiAgICByZWR1Y2VSaWdodDogZnVuY3Rpb24gcmVkdWNlUmlnaHQoY2FsbGJhY2tmbiAvKiwgaW5pdGlhbFZhbHVlICovKXsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bnVzZWQtdmFyc1xuICAgICAgcmV0dXJuIGFycmF5UmVkdWNlUmlnaHQuYXBwbHkodmFsaWRhdGUodGhpcyksIGFyZ3VtZW50cyk7XG4gICAgfSxcbiAgICByZXZlcnNlOiBmdW5jdGlvbiByZXZlcnNlKCl7XG4gICAgICB2YXIgdGhhdCAgID0gdGhpc1xuICAgICAgICAsIGxlbmd0aCA9IHZhbGlkYXRlKHRoYXQpLmxlbmd0aFxuICAgICAgICAsIG1pZGRsZSA9IE1hdGguZmxvb3IobGVuZ3RoIC8gMilcbiAgICAgICAgLCBpbmRleCAgPSAwXG4gICAgICAgICwgdmFsdWU7XG4gICAgICB3aGlsZShpbmRleCA8IG1pZGRsZSl7XG4gICAgICAgIHZhbHVlICAgICAgICAgPSB0aGF0W2luZGV4XTtcbiAgICAgICAgdGhhdFtpbmRleCsrXSA9IHRoYXRbLS1sZW5ndGhdO1xuICAgICAgICB0aGF0W2xlbmd0aF0gID0gdmFsdWU7XG4gICAgICB9IHJldHVybiB0aGF0O1xuICAgIH0sXG4gICAgc29tZTogZnVuY3Rpb24gc29tZShjYWxsYmFja2ZuIC8qLCB0aGlzQXJnICovKXtcbiAgICAgIHJldHVybiBhcnJheVNvbWUodmFsaWRhdGUodGhpcyksIGNhbGxiYWNrZm4sIGFyZ3VtZW50cy5sZW5ndGggPiAxID8gYXJndW1lbnRzWzFdIDogdW5kZWZpbmVkKTtcbiAgICB9LFxuICAgIHNvcnQ6IGZ1bmN0aW9uIHNvcnQoY29tcGFyZWZuKXtcbiAgICAgIHJldHVybiBhcnJheVNvcnQuY2FsbCh2YWxpZGF0ZSh0aGlzKSwgY29tcGFyZWZuKTtcbiAgICB9LFxuICAgIHN1YmFycmF5OiBmdW5jdGlvbiBzdWJhcnJheShiZWdpbiwgZW5kKXtcbiAgICAgIHZhciBPICAgICAgPSB2YWxpZGF0ZSh0aGlzKVxuICAgICAgICAsIGxlbmd0aCA9IE8ubGVuZ3RoXG4gICAgICAgICwgJGJlZ2luID0gdG9JbmRleChiZWdpbiwgbGVuZ3RoKTtcbiAgICAgIHJldHVybiBuZXcgKHNwZWNpZXNDb25zdHJ1Y3RvcihPLCBPW0RFRl9DT05TVFJVQ1RPUl0pKShcbiAgICAgICAgTy5idWZmZXIsXG4gICAgICAgIE8uYnl0ZU9mZnNldCArICRiZWdpbiAqIE8uQllURVNfUEVSX0VMRU1FTlQsXG4gICAgICAgIHRvTGVuZ3RoKChlbmQgPT09IHVuZGVmaW5lZCA/IGxlbmd0aCA6IHRvSW5kZXgoZW5kLCBsZW5ndGgpKSAtICRiZWdpbilcbiAgICAgICk7XG4gICAgfVxuICB9O1xuXG4gIHZhciAkc2xpY2UgPSBmdW5jdGlvbiBzbGljZShzdGFydCwgZW5kKXtcbiAgICByZXR1cm4gc3BlY2llc0Zyb21MaXN0KHRoaXMsIGFycmF5U2xpY2UuY2FsbCh2YWxpZGF0ZSh0aGlzKSwgc3RhcnQsIGVuZCkpO1xuICB9O1xuXG4gIHZhciAkc2V0ID0gZnVuY3Rpb24gc2V0KGFycmF5TGlrZSAvKiwgb2Zmc2V0ICovKXtcbiAgICB2YWxpZGF0ZSh0aGlzKTtcbiAgICB2YXIgb2Zmc2V0ID0gdG9PZmZzZXQoYXJndW1lbnRzWzFdLCAxKVxuICAgICAgLCBsZW5ndGggPSB0aGlzLmxlbmd0aFxuICAgICAgLCBzcmMgICAgPSB0b09iamVjdChhcnJheUxpa2UpXG4gICAgICAsIGxlbiAgICA9IHRvTGVuZ3RoKHNyYy5sZW5ndGgpXG4gICAgICAsIGluZGV4ICA9IDA7XG4gICAgaWYobGVuICsgb2Zmc2V0ID4gbGVuZ3RoKXRocm93IFJhbmdlRXJyb3IoV1JPTkdfTEVOR1RIKTtcbiAgICB3aGlsZShpbmRleCA8IGxlbil0aGlzW29mZnNldCArIGluZGV4XSA9IHNyY1tpbmRleCsrXTtcbiAgfTtcblxuICB2YXIgJGl0ZXJhdG9ycyA9IHtcbiAgICBlbnRyaWVzOiBmdW5jdGlvbiBlbnRyaWVzKCl7XG4gICAgICByZXR1cm4gYXJyYXlFbnRyaWVzLmNhbGwodmFsaWRhdGUodGhpcykpO1xuICAgIH0sXG4gICAga2V5czogZnVuY3Rpb24ga2V5cygpe1xuICAgICAgcmV0dXJuIGFycmF5S2V5cy5jYWxsKHZhbGlkYXRlKHRoaXMpKTtcbiAgICB9LFxuICAgIHZhbHVlczogZnVuY3Rpb24gdmFsdWVzKCl7XG4gICAgICByZXR1cm4gYXJyYXlWYWx1ZXMuY2FsbCh2YWxpZGF0ZSh0aGlzKSk7XG4gICAgfVxuICB9O1xuXG4gIHZhciBpc1RBSW5kZXggPSBmdW5jdGlvbih0YXJnZXQsIGtleSl7XG4gICAgcmV0dXJuIGlzT2JqZWN0KHRhcmdldClcbiAgICAgICYmIHRhcmdldFtUWVBFRF9BUlJBWV1cbiAgICAgICYmIHR5cGVvZiBrZXkgIT0gJ3N5bWJvbCdcbiAgICAgICYmIGtleSBpbiB0YXJnZXRcbiAgICAgICYmIFN0cmluZygra2V5KSA9PSBTdHJpbmcoa2V5KTtcbiAgfTtcbiAgdmFyICRnZXREZXNjID0gZnVuY3Rpb24gZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHRhcmdldCwga2V5KXtcbiAgICByZXR1cm4gaXNUQUluZGV4KHRhcmdldCwga2V5ID0gdG9QcmltaXRpdmUoa2V5LCB0cnVlKSlcbiAgICAgID8gcHJvcGVydHlEZXNjKDIsIHRhcmdldFtrZXldKVxuICAgICAgOiBnT1BEKHRhcmdldCwga2V5KTtcbiAgfTtcbiAgdmFyICRzZXREZXNjID0gZnVuY3Rpb24gZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBrZXksIGRlc2Mpe1xuICAgIGlmKGlzVEFJbmRleCh0YXJnZXQsIGtleSA9IHRvUHJpbWl0aXZlKGtleSwgdHJ1ZSkpXG4gICAgICAmJiBpc09iamVjdChkZXNjKVxuICAgICAgJiYgaGFzKGRlc2MsICd2YWx1ZScpXG4gICAgICAmJiAhaGFzKGRlc2MsICdnZXQnKVxuICAgICAgJiYgIWhhcyhkZXNjLCAnc2V0JylcbiAgICAgIC8vIFRPRE86IGFkZCB2YWxpZGF0aW9uIGRlc2NyaXB0b3Igdy9vIGNhbGxpbmcgYWNjZXNzb3JzXG4gICAgICAmJiAhZGVzYy5jb25maWd1cmFibGVcbiAgICAgICYmICghaGFzKGRlc2MsICd3cml0YWJsZScpIHx8IGRlc2Mud3JpdGFibGUpXG4gICAgICAmJiAoIWhhcyhkZXNjLCAnZW51bWVyYWJsZScpIHx8IGRlc2MuZW51bWVyYWJsZSlcbiAgICApe1xuICAgICAgdGFyZ2V0W2tleV0gPSBkZXNjLnZhbHVlO1xuICAgICAgcmV0dXJuIHRhcmdldDtcbiAgICB9IGVsc2UgcmV0dXJuIGRQKHRhcmdldCwga2V5LCBkZXNjKTtcbiAgfTtcblxuICBpZighQUxMX0NPTlNUUlVDVE9SUyl7XG4gICAgJEdPUEQuZiA9ICRnZXREZXNjO1xuICAgICREUC5mICAgPSAkc2V0RGVzYztcbiAgfVxuXG4gICRleHBvcnQoJGV4cG9ydC5TICsgJGV4cG9ydC5GICogIUFMTF9DT05TVFJVQ1RPUlMsICdPYmplY3QnLCB7XG4gICAgZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yOiAkZ2V0RGVzYyxcbiAgICBkZWZpbmVQcm9wZXJ0eTogICAgICAgICAgICRzZXREZXNjXG4gIH0pO1xuXG4gIGlmKGZhaWxzKGZ1bmN0aW9uKCl7IGFycmF5VG9TdHJpbmcuY2FsbCh7fSk7IH0pKXtcbiAgICBhcnJheVRvU3RyaW5nID0gYXJyYXlUb0xvY2FsZVN0cmluZyA9IGZ1bmN0aW9uIHRvU3RyaW5nKCl7XG4gICAgICByZXR1cm4gYXJyYXlKb2luLmNhbGwodGhpcyk7XG4gICAgfVxuICB9XG5cbiAgdmFyICRUeXBlZEFycmF5UHJvdG90eXBlJCA9IHJlZGVmaW5lQWxsKHt9LCBwcm90byk7XG4gIHJlZGVmaW5lQWxsKCRUeXBlZEFycmF5UHJvdG90eXBlJCwgJGl0ZXJhdG9ycyk7XG4gIGhpZGUoJFR5cGVkQXJyYXlQcm90b3R5cGUkLCBJVEVSQVRPUiwgJGl0ZXJhdG9ycy52YWx1ZXMpO1xuICByZWRlZmluZUFsbCgkVHlwZWRBcnJheVByb3RvdHlwZSQsIHtcbiAgICBzbGljZTogICAgICAgICAgJHNsaWNlLFxuICAgIHNldDogICAgICAgICAgICAkc2V0LFxuICAgIGNvbnN0cnVjdG9yOiAgICBmdW5jdGlvbigpeyAvKiBub29wICovIH0sXG4gICAgdG9TdHJpbmc6ICAgICAgIGFycmF5VG9TdHJpbmcsXG4gICAgdG9Mb2NhbGVTdHJpbmc6ICR0b0xvY2FsZVN0cmluZ1xuICB9KTtcbiAgYWRkR2V0dGVyKCRUeXBlZEFycmF5UHJvdG90eXBlJCwgJ2J1ZmZlcicsICdiJyk7XG4gIGFkZEdldHRlcigkVHlwZWRBcnJheVByb3RvdHlwZSQsICdieXRlT2Zmc2V0JywgJ28nKTtcbiAgYWRkR2V0dGVyKCRUeXBlZEFycmF5UHJvdG90eXBlJCwgJ2J5dGVMZW5ndGgnLCAnbCcpO1xuICBhZGRHZXR0ZXIoJFR5cGVkQXJyYXlQcm90b3R5cGUkLCAnbGVuZ3RoJywgJ2UnKTtcbiAgZFAoJFR5cGVkQXJyYXlQcm90b3R5cGUkLCBUQUcsIHtcbiAgICBnZXQ6IGZ1bmN0aW9uKCl7IHJldHVybiB0aGlzW1RZUEVEX0FSUkFZXTsgfVxuICB9KTtcblxuICBtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKEtFWSwgQllURVMsIHdyYXBwZXIsIENMQU1QRUQpe1xuICAgIENMQU1QRUQgPSAhIUNMQU1QRUQ7XG4gICAgdmFyIE5BTUUgICAgICAgPSBLRVkgKyAoQ0xBTVBFRCA/ICdDbGFtcGVkJyA6ICcnKSArICdBcnJheSdcbiAgICAgICwgSVNOVF9VSU5UOCA9IE5BTUUgIT0gJ1VpbnQ4QXJyYXknXG4gICAgICAsIEdFVFRFUiAgICAgPSAnZ2V0JyArIEtFWVxuICAgICAgLCBTRVRURVIgICAgID0gJ3NldCcgKyBLRVlcbiAgICAgICwgVHlwZWRBcnJheSA9IGdsb2JhbFtOQU1FXVxuICAgICAgLCBCYXNlICAgICAgID0gVHlwZWRBcnJheSB8fCB7fVxuICAgICAgLCBUQUMgICAgICAgID0gVHlwZWRBcnJheSAmJiBnZXRQcm90b3R5cGVPZihUeXBlZEFycmF5KVxuICAgICAgLCBGT1JDRUQgICAgID0gIVR5cGVkQXJyYXkgfHwgISR0eXBlZC5BQlZcbiAgICAgICwgTyAgICAgICAgICA9IHt9XG4gICAgICAsIFR5cGVkQXJyYXlQcm90b3R5cGUgPSBUeXBlZEFycmF5ICYmIFR5cGVkQXJyYXlbUFJPVE9UWVBFXTtcbiAgICB2YXIgZ2V0dGVyID0gZnVuY3Rpb24odGhhdCwgaW5kZXgpe1xuICAgICAgdmFyIGRhdGEgPSB0aGF0Ll9kO1xuICAgICAgcmV0dXJuIGRhdGEudltHRVRURVJdKGluZGV4ICogQllURVMgKyBkYXRhLm8sIExJVFRMRV9FTkRJQU4pO1xuICAgIH07XG4gICAgdmFyIHNldHRlciA9IGZ1bmN0aW9uKHRoYXQsIGluZGV4LCB2YWx1ZSl7XG4gICAgICB2YXIgZGF0YSA9IHRoYXQuX2Q7XG4gICAgICBpZihDTEFNUEVEKXZhbHVlID0gKHZhbHVlID0gTWF0aC5yb3VuZCh2YWx1ZSkpIDwgMCA/IDAgOiB2YWx1ZSA+IDB4ZmYgPyAweGZmIDogdmFsdWUgJiAweGZmO1xuICAgICAgZGF0YS52W1NFVFRFUl0oaW5kZXggKiBCWVRFUyArIGRhdGEubywgdmFsdWUsIExJVFRMRV9FTkRJQU4pO1xuICAgIH07XG4gICAgdmFyIGFkZEVsZW1lbnQgPSBmdW5jdGlvbih0aGF0LCBpbmRleCl7XG4gICAgICBkUCh0aGF0LCBpbmRleCwge1xuICAgICAgICBnZXQ6IGZ1bmN0aW9uKCl7XG4gICAgICAgICAgcmV0dXJuIGdldHRlcih0aGlzLCBpbmRleCk7XG4gICAgICAgIH0sXG4gICAgICAgIHNldDogZnVuY3Rpb24odmFsdWUpe1xuICAgICAgICAgIHJldHVybiBzZXR0ZXIodGhpcywgaW5kZXgsIHZhbHVlKTtcbiAgICAgICAgfSxcbiAgICAgICAgZW51bWVyYWJsZTogdHJ1ZVxuICAgICAgfSk7XG4gICAgfTtcbiAgICBpZihGT1JDRUQpe1xuICAgICAgVHlwZWRBcnJheSA9IHdyYXBwZXIoZnVuY3Rpb24odGhhdCwgZGF0YSwgJG9mZnNldCwgJGxlbmd0aCl7XG4gICAgICAgIGFuSW5zdGFuY2UodGhhdCwgVHlwZWRBcnJheSwgTkFNRSwgJ19kJyk7XG4gICAgICAgIHZhciBpbmRleCAgPSAwXG4gICAgICAgICAgLCBvZmZzZXQgPSAwXG4gICAgICAgICAgLCBidWZmZXIsIGJ5dGVMZW5ndGgsIGxlbmd0aCwga2xhc3M7XG4gICAgICAgIGlmKCFpc09iamVjdChkYXRhKSl7XG4gICAgICAgICAgbGVuZ3RoICAgICA9IHN0cmljdFRvTGVuZ3RoKGRhdGEsIHRydWUpXG4gICAgICAgICAgYnl0ZUxlbmd0aCA9IGxlbmd0aCAqIEJZVEVTO1xuICAgICAgICAgIGJ1ZmZlciAgICAgPSBuZXcgJEFycmF5QnVmZmVyKGJ5dGVMZW5ndGgpO1xuICAgICAgICB9IGVsc2UgaWYoZGF0YSBpbnN0YW5jZW9mICRBcnJheUJ1ZmZlciB8fCAoa2xhc3MgPSBjbGFzc29mKGRhdGEpKSA9PSBBUlJBWV9CVUZGRVIgfHwga2xhc3MgPT0gU0hBUkVEX0JVRkZFUil7XG4gICAgICAgICAgYnVmZmVyID0gZGF0YTtcbiAgICAgICAgICBvZmZzZXQgPSB0b09mZnNldCgkb2Zmc2V0LCBCWVRFUyk7XG4gICAgICAgICAgdmFyICRsZW4gPSBkYXRhLmJ5dGVMZW5ndGg7XG4gICAgICAgICAgaWYoJGxlbmd0aCA9PT0gdW5kZWZpbmVkKXtcbiAgICAgICAgICAgIGlmKCRsZW4gJSBCWVRFUyl0aHJvdyBSYW5nZUVycm9yKFdST05HX0xFTkdUSCk7XG4gICAgICAgICAgICBieXRlTGVuZ3RoID0gJGxlbiAtIG9mZnNldDtcbiAgICAgICAgICAgIGlmKGJ5dGVMZW5ndGggPCAwKXRocm93IFJhbmdlRXJyb3IoV1JPTkdfTEVOR1RIKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgYnl0ZUxlbmd0aCA9IHRvTGVuZ3RoKCRsZW5ndGgpICogQllURVM7XG4gICAgICAgICAgICBpZihieXRlTGVuZ3RoICsgb2Zmc2V0ID4gJGxlbil0aHJvdyBSYW5nZUVycm9yKFdST05HX0xFTkdUSCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGxlbmd0aCA9IGJ5dGVMZW5ndGggLyBCWVRFUztcbiAgICAgICAgfSBlbHNlIGlmKFRZUEVEX0FSUkFZIGluIGRhdGEpe1xuICAgICAgICAgIHJldHVybiBmcm9tTGlzdChUeXBlZEFycmF5LCBkYXRhKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm4gJGZyb20uY2FsbChUeXBlZEFycmF5LCBkYXRhKTtcbiAgICAgICAgfVxuICAgICAgICBoaWRlKHRoYXQsICdfZCcsIHtcbiAgICAgICAgICBiOiBidWZmZXIsXG4gICAgICAgICAgbzogb2Zmc2V0LFxuICAgICAgICAgIGw6IGJ5dGVMZW5ndGgsXG4gICAgICAgICAgZTogbGVuZ3RoLFxuICAgICAgICAgIHY6IG5ldyAkRGF0YVZpZXcoYnVmZmVyKVxuICAgICAgICB9KTtcbiAgICAgICAgd2hpbGUoaW5kZXggPCBsZW5ndGgpYWRkRWxlbWVudCh0aGF0LCBpbmRleCsrKTtcbiAgICAgIH0pO1xuICAgICAgVHlwZWRBcnJheVByb3RvdHlwZSA9IFR5cGVkQXJyYXlbUFJPVE9UWVBFXSA9IGNyZWF0ZSgkVHlwZWRBcnJheVByb3RvdHlwZSQpO1xuICAgICAgaGlkZShUeXBlZEFycmF5UHJvdG90eXBlLCAnY29uc3RydWN0b3InLCBUeXBlZEFycmF5KTtcbiAgICB9IGVsc2UgaWYoISRpdGVyRGV0ZWN0KGZ1bmN0aW9uKGl0ZXIpe1xuICAgICAgLy8gVjggd29ya3Mgd2l0aCBpdGVyYXRvcnMsIGJ1dCBmYWlscyBpbiBtYW55IG90aGVyIGNhc2VzXG4gICAgICAvLyBodHRwczovL2NvZGUuZ29vZ2xlLmNvbS9wL3Y4L2lzc3Vlcy9kZXRhaWw/aWQ9NDU1MlxuICAgICAgbmV3IFR5cGVkQXJyYXkobnVsbCk7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tbmV3XG4gICAgICBuZXcgVHlwZWRBcnJheShpdGVyKTsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1uZXdcbiAgICB9LCB0cnVlKSl7XG4gICAgICBUeXBlZEFycmF5ID0gd3JhcHBlcihmdW5jdGlvbih0aGF0LCBkYXRhLCAkb2Zmc2V0LCAkbGVuZ3RoKXtcbiAgICAgICAgYW5JbnN0YW5jZSh0aGF0LCBUeXBlZEFycmF5LCBOQU1FKTtcbiAgICAgICAgdmFyIGtsYXNzO1xuICAgICAgICAvLyBgd3NgIG1vZHVsZSBidWcsIHRlbXBvcmFyaWx5IHJlbW92ZSB2YWxpZGF0aW9uIGxlbmd0aCBmb3IgVWludDhBcnJheVxuICAgICAgICAvLyBodHRwczovL2dpdGh1Yi5jb20vd2Vic29ja2V0cy93cy9wdWxsLzY0NVxuICAgICAgICBpZighaXNPYmplY3QoZGF0YSkpcmV0dXJuIG5ldyBCYXNlKHN0cmljdFRvTGVuZ3RoKGRhdGEsIElTTlRfVUlOVDgpKTtcbiAgICAgICAgaWYoZGF0YSBpbnN0YW5jZW9mICRBcnJheUJ1ZmZlciB8fCAoa2xhc3MgPSBjbGFzc29mKGRhdGEpKSA9PSBBUlJBWV9CVUZGRVIgfHwga2xhc3MgPT0gU0hBUkVEX0JVRkZFUil7XG4gICAgICAgICAgcmV0dXJuICRsZW5ndGggIT09IHVuZGVmaW5lZFxuICAgICAgICAgICAgPyBuZXcgQmFzZShkYXRhLCB0b09mZnNldCgkb2Zmc2V0LCBCWVRFUyksICRsZW5ndGgpXG4gICAgICAgICAgICA6ICRvZmZzZXQgIT09IHVuZGVmaW5lZFxuICAgICAgICAgICAgICA/IG5ldyBCYXNlKGRhdGEsIHRvT2Zmc2V0KCRvZmZzZXQsIEJZVEVTKSlcbiAgICAgICAgICAgICAgOiBuZXcgQmFzZShkYXRhKTtcbiAgICAgICAgfVxuICAgICAgICBpZihUWVBFRF9BUlJBWSBpbiBkYXRhKXJldHVybiBmcm9tTGlzdChUeXBlZEFycmF5LCBkYXRhKTtcbiAgICAgICAgcmV0dXJuICRmcm9tLmNhbGwoVHlwZWRBcnJheSwgZGF0YSk7XG4gICAgICB9KTtcbiAgICAgIGFycmF5Rm9yRWFjaChUQUMgIT09IEZ1bmN0aW9uLnByb3RvdHlwZSA/IGdPUE4oQmFzZSkuY29uY2F0KGdPUE4oVEFDKSkgOiBnT1BOKEJhc2UpLCBmdW5jdGlvbihrZXkpe1xuICAgICAgICBpZighKGtleSBpbiBUeXBlZEFycmF5KSloaWRlKFR5cGVkQXJyYXksIGtleSwgQmFzZVtrZXldKTtcbiAgICAgIH0pO1xuICAgICAgVHlwZWRBcnJheVtQUk9UT1RZUEVdID0gVHlwZWRBcnJheVByb3RvdHlwZTtcbiAgICAgIGlmKCFMSUJSQVJZKVR5cGVkQXJyYXlQcm90b3R5cGUuY29uc3RydWN0b3IgPSBUeXBlZEFycmF5O1xuICAgIH1cbiAgICB2YXIgJG5hdGl2ZUl0ZXJhdG9yICAgPSBUeXBlZEFycmF5UHJvdG90eXBlW0lURVJBVE9SXVxuICAgICAgLCBDT1JSRUNUX0lURVJfTkFNRSA9ICEhJG5hdGl2ZUl0ZXJhdG9yICYmICgkbmF0aXZlSXRlcmF0b3IubmFtZSA9PSAndmFsdWVzJyB8fCAkbmF0aXZlSXRlcmF0b3IubmFtZSA9PSB1bmRlZmluZWQpXG4gICAgICAsICRpdGVyYXRvciAgICAgICAgID0gJGl0ZXJhdG9ycy52YWx1ZXM7XG4gICAgaGlkZShUeXBlZEFycmF5LCBUWVBFRF9DT05TVFJVQ1RPUiwgdHJ1ZSk7XG4gICAgaGlkZShUeXBlZEFycmF5UHJvdG90eXBlLCBUWVBFRF9BUlJBWSwgTkFNRSk7XG4gICAgaGlkZShUeXBlZEFycmF5UHJvdG90eXBlLCBWSUVXLCB0cnVlKTtcbiAgICBoaWRlKFR5cGVkQXJyYXlQcm90b3R5cGUsIERFRl9DT05TVFJVQ1RPUiwgVHlwZWRBcnJheSk7XG5cbiAgICBpZihDTEFNUEVEID8gbmV3IFR5cGVkQXJyYXkoMSlbVEFHXSAhPSBOQU1FIDogIShUQUcgaW4gVHlwZWRBcnJheVByb3RvdHlwZSkpe1xuICAgICAgZFAoVHlwZWRBcnJheVByb3RvdHlwZSwgVEFHLCB7XG4gICAgICAgIGdldDogZnVuY3Rpb24oKXsgcmV0dXJuIE5BTUU7IH1cbiAgICAgIH0pO1xuICAgIH1cblxuICAgIE9bTkFNRV0gPSBUeXBlZEFycmF5O1xuXG4gICAgJGV4cG9ydCgkZXhwb3J0LkcgKyAkZXhwb3J0LlcgKyAkZXhwb3J0LkYgKiAoVHlwZWRBcnJheSAhPSBCYXNlKSwgTyk7XG5cbiAgICAkZXhwb3J0KCRleHBvcnQuUywgTkFNRSwge1xuICAgICAgQllURVNfUEVSX0VMRU1FTlQ6IEJZVEVTLFxuICAgICAgZnJvbTogJGZyb20sXG4gICAgICBvZjogJG9mXG4gICAgfSk7XG5cbiAgICBpZighKEJZVEVTX1BFUl9FTEVNRU5UIGluIFR5cGVkQXJyYXlQcm90b3R5cGUpKWhpZGUoVHlwZWRBcnJheVByb3RvdHlwZSwgQllURVNfUEVSX0VMRU1FTlQsIEJZVEVTKTtcblxuICAgICRleHBvcnQoJGV4cG9ydC5QLCBOQU1FLCBwcm90byk7XG5cbiAgICBzZXRTcGVjaWVzKE5BTUUpO1xuXG4gICAgJGV4cG9ydCgkZXhwb3J0LlAgKyAkZXhwb3J0LkYgKiBGT1JDRURfU0VULCBOQU1FLCB7c2V0OiAkc2V0fSk7XG5cbiAgICAkZXhwb3J0KCRleHBvcnQuUCArICRleHBvcnQuRiAqICFDT1JSRUNUX0lURVJfTkFNRSwgTkFNRSwgJGl0ZXJhdG9ycyk7XG5cbiAgICAkZXhwb3J0KCRleHBvcnQuUCArICRleHBvcnQuRiAqIChUeXBlZEFycmF5UHJvdG90eXBlLnRvU3RyaW5nICE9IGFycmF5VG9TdHJpbmcpLCBOQU1FLCB7dG9TdHJpbmc6IGFycmF5VG9TdHJpbmd9KTtcblxuICAgICRleHBvcnQoJGV4cG9ydC5QICsgJGV4cG9ydC5GICogZmFpbHMoZnVuY3Rpb24oKXtcbiAgICAgIG5ldyBUeXBlZEFycmF5KDEpLnNsaWNlKCk7XG4gICAgfSksIE5BTUUsIHtzbGljZTogJHNsaWNlfSk7XG5cbiAgICAkZXhwb3J0KCRleHBvcnQuUCArICRleHBvcnQuRiAqIChmYWlscyhmdW5jdGlvbigpe1xuICAgICAgcmV0dXJuIFsxLCAyXS50b0xvY2FsZVN0cmluZygpICE9IG5ldyBUeXBlZEFycmF5KFsxLCAyXSkudG9Mb2NhbGVTdHJpbmcoKVxuICAgIH0pIHx8ICFmYWlscyhmdW5jdGlvbigpe1xuICAgICAgVHlwZWRBcnJheVByb3RvdHlwZS50b0xvY2FsZVN0cmluZy5jYWxsKFsxLCAyXSk7XG4gICAgfSkpLCBOQU1FLCB7dG9Mb2NhbGVTdHJpbmc6ICR0b0xvY2FsZVN0cmluZ30pO1xuXG4gICAgSXRlcmF0b3JzW05BTUVdID0gQ09SUkVDVF9JVEVSX05BTUUgPyAkbmF0aXZlSXRlcmF0b3IgOiAkaXRlcmF0b3I7XG4gICAgaWYoIUxJQlJBUlkgJiYgIUNPUlJFQ1RfSVRFUl9OQU1FKWhpZGUoVHlwZWRBcnJheVByb3RvdHlwZSwgSVRFUkFUT1IsICRpdGVyYXRvcik7XG4gIH07XG59IGVsc2UgbW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbigpeyAvKiBlbXB0eSAqLyB9OyIsIid1c2Ugc3RyaWN0JztcbnZhciBnbG9iYWwgICAgICAgICA9IHJlcXVpcmUoJy4vX2dsb2JhbCcpXG4gICwgREVTQ1JJUFRPUlMgICAgPSByZXF1aXJlKCcuL19kZXNjcmlwdG9ycycpXG4gICwgTElCUkFSWSAgICAgICAgPSByZXF1aXJlKCcuL19saWJyYXJ5JylcbiAgLCAkdHlwZWQgICAgICAgICA9IHJlcXVpcmUoJy4vX3R5cGVkJylcbiAgLCBoaWRlICAgICAgICAgICA9IHJlcXVpcmUoJy4vX2hpZGUnKVxuICAsIHJlZGVmaW5lQWxsICAgID0gcmVxdWlyZSgnLi9fcmVkZWZpbmUtYWxsJylcbiAgLCBmYWlscyAgICAgICAgICA9IHJlcXVpcmUoJy4vX2ZhaWxzJylcbiAgLCBhbkluc3RhbmNlICAgICA9IHJlcXVpcmUoJy4vX2FuLWluc3RhbmNlJylcbiAgLCB0b0ludGVnZXIgICAgICA9IHJlcXVpcmUoJy4vX3RvLWludGVnZXInKVxuICAsIHRvTGVuZ3RoICAgICAgID0gcmVxdWlyZSgnLi9fdG8tbGVuZ3RoJylcbiAgLCBnT1BOICAgICAgICAgICA9IHJlcXVpcmUoJy4vX29iamVjdC1nb3BuJykuZlxuICAsIGRQICAgICAgICAgICAgID0gcmVxdWlyZSgnLi9fb2JqZWN0LWRwJykuZlxuICAsIGFycmF5RmlsbCAgICAgID0gcmVxdWlyZSgnLi9fYXJyYXktZmlsbCcpXG4gICwgc2V0VG9TdHJpbmdUYWcgPSByZXF1aXJlKCcuL19zZXQtdG8tc3RyaW5nLXRhZycpXG4gICwgQVJSQVlfQlVGRkVSICAgPSAnQXJyYXlCdWZmZXInXG4gICwgREFUQV9WSUVXICAgICAgPSAnRGF0YVZpZXcnXG4gICwgUFJPVE9UWVBFICAgICAgPSAncHJvdG90eXBlJ1xuICAsIFdST05HX0xFTkdUSCAgID0gJ1dyb25nIGxlbmd0aCEnXG4gICwgV1JPTkdfSU5ERVggICAgPSAnV3JvbmcgaW5kZXghJ1xuICAsICRBcnJheUJ1ZmZlciAgID0gZ2xvYmFsW0FSUkFZX0JVRkZFUl1cbiAgLCAkRGF0YVZpZXcgICAgICA9IGdsb2JhbFtEQVRBX1ZJRVddXG4gICwgTWF0aCAgICAgICAgICAgPSBnbG9iYWwuTWF0aFxuICAsIHBhcnNlSW50ICAgICAgID0gZ2xvYmFsLnBhcnNlSW50XG4gICwgUmFuZ2VFcnJvciAgICAgPSBnbG9iYWwuUmFuZ2VFcnJvclxuICAsIEluZmluaXR5ICAgICAgID0gZ2xvYmFsLkluZmluaXR5XG4gICwgQmFzZUJ1ZmZlciAgICAgPSAkQXJyYXlCdWZmZXJcbiAgLCBhYnMgICAgICAgICAgICA9IE1hdGguYWJzXG4gICwgcG93ICAgICAgICAgICAgPSBNYXRoLnBvd1xuICAsIG1pbiAgICAgICAgICAgID0gTWF0aC5taW5cbiAgLCBmbG9vciAgICAgICAgICA9IE1hdGguZmxvb3JcbiAgLCBsb2cgICAgICAgICAgICA9IE1hdGgubG9nXG4gICwgTE4yICAgICAgICAgICAgPSBNYXRoLkxOMlxuICAsIEJVRkZFUiAgICAgICAgID0gJ2J1ZmZlcidcbiAgLCBCWVRFX0xFTkdUSCAgICA9ICdieXRlTGVuZ3RoJ1xuICAsIEJZVEVfT0ZGU0VUICAgID0gJ2J5dGVPZmZzZXQnXG4gICwgJEJVRkZFUiAgICAgICAgPSBERVNDUklQVE9SUyA/ICdfYicgOiBCVUZGRVJcbiAgLCAkTEVOR1RIICAgICAgICA9IERFU0NSSVBUT1JTID8gJ19sJyA6IEJZVEVfTEVOR1RIXG4gICwgJE9GRlNFVCAgICAgICAgPSBERVNDUklQVE9SUyA/ICdfbycgOiBCWVRFX09GRlNFVDtcblxuLy8gSUVFRTc1NCBjb252ZXJzaW9ucyBiYXNlZCBvbiBodHRwczovL2dpdGh1Yi5jb20vZmVyb3NzL2llZWU3NTRcbnZhciBwYWNrSUVFRTc1NCA9IGZ1bmN0aW9uKHZhbHVlLCBtTGVuLCBuQnl0ZXMpe1xuICB2YXIgYnVmZmVyID0gQXJyYXkobkJ5dGVzKVxuICAgICwgZUxlbiAgID0gbkJ5dGVzICogOCAtIG1MZW4gLSAxXG4gICAgLCBlTWF4ICAgPSAoMSA8PCBlTGVuKSAtIDFcbiAgICAsIGVCaWFzICA9IGVNYXggPj4gMVxuICAgICwgcnQgICAgID0gbUxlbiA9PT0gMjMgPyBwb3coMiwgLTI0KSAtIHBvdygyLCAtNzcpIDogMFxuICAgICwgaSAgICAgID0gMFxuICAgICwgcyAgICAgID0gdmFsdWUgPCAwIHx8IHZhbHVlID09PSAwICYmIDEgLyB2YWx1ZSA8IDAgPyAxIDogMFxuICAgICwgZSwgbSwgYztcbiAgdmFsdWUgPSBhYnModmFsdWUpXG4gIGlmKHZhbHVlICE9IHZhbHVlIHx8IHZhbHVlID09PSBJbmZpbml0eSl7XG4gICAgbSA9IHZhbHVlICE9IHZhbHVlID8gMSA6IDA7XG4gICAgZSA9IGVNYXg7XG4gIH0gZWxzZSB7XG4gICAgZSA9IGZsb29yKGxvZyh2YWx1ZSkgLyBMTjIpO1xuICAgIGlmKHZhbHVlICogKGMgPSBwb3coMiwgLWUpKSA8IDEpe1xuICAgICAgZS0tO1xuICAgICAgYyAqPSAyO1xuICAgIH1cbiAgICBpZihlICsgZUJpYXMgPj0gMSl7XG4gICAgICB2YWx1ZSArPSBydCAvIGM7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhbHVlICs9IHJ0ICogcG93KDIsIDEgLSBlQmlhcyk7XG4gICAgfVxuICAgIGlmKHZhbHVlICogYyA+PSAyKXtcbiAgICAgIGUrKztcbiAgICAgIGMgLz0gMjtcbiAgICB9XG4gICAgaWYoZSArIGVCaWFzID49IGVNYXgpe1xuICAgICAgbSA9IDA7XG4gICAgICBlID0gZU1heDtcbiAgICB9IGVsc2UgaWYoZSArIGVCaWFzID49IDEpe1xuICAgICAgbSA9ICh2YWx1ZSAqIGMgLSAxKSAqIHBvdygyLCBtTGVuKTtcbiAgICAgIGUgPSBlICsgZUJpYXM7XG4gICAgfSBlbHNlIHtcbiAgICAgIG0gPSB2YWx1ZSAqIHBvdygyLCBlQmlhcyAtIDEpICogcG93KDIsIG1MZW4pO1xuICAgICAgZSA9IDA7XG4gICAgfVxuICB9XG4gIGZvcig7IG1MZW4gPj0gODsgYnVmZmVyW2krK10gPSBtICYgMjU1LCBtIC89IDI1NiwgbUxlbiAtPSA4KTtcbiAgZSA9IGUgPDwgbUxlbiB8IG07XG4gIGVMZW4gKz0gbUxlbjtcbiAgZm9yKDsgZUxlbiA+IDA7IGJ1ZmZlcltpKytdID0gZSAmIDI1NSwgZSAvPSAyNTYsIGVMZW4gLT0gOCk7XG4gIGJ1ZmZlclstLWldIHw9IHMgKiAxMjg7XG4gIHJldHVybiBidWZmZXI7XG59O1xudmFyIHVucGFja0lFRUU3NTQgPSBmdW5jdGlvbihidWZmZXIsIG1MZW4sIG5CeXRlcyl7XG4gIHZhciBlTGVuICA9IG5CeXRlcyAqIDggLSBtTGVuIC0gMVxuICAgICwgZU1heCAgPSAoMSA8PCBlTGVuKSAtIDFcbiAgICAsIGVCaWFzID0gZU1heCA+PiAxXG4gICAgLCBuQml0cyA9IGVMZW4gLSA3XG4gICAgLCBpICAgICA9IG5CeXRlcyAtIDFcbiAgICAsIHMgICAgID0gYnVmZmVyW2ktLV1cbiAgICAsIGUgICAgID0gcyAmIDEyN1xuICAgICwgbTtcbiAgcyA+Pj0gNztcbiAgZm9yKDsgbkJpdHMgPiAwOyBlID0gZSAqIDI1NiArIGJ1ZmZlcltpXSwgaS0tLCBuQml0cyAtPSA4KTtcbiAgbSA9IGUgJiAoMSA8PCAtbkJpdHMpIC0gMTtcbiAgZSA+Pj0gLW5CaXRzO1xuICBuQml0cyArPSBtTGVuO1xuICBmb3IoOyBuQml0cyA+IDA7IG0gPSBtICogMjU2ICsgYnVmZmVyW2ldLCBpLS0sIG5CaXRzIC09IDgpO1xuICBpZihlID09PSAwKXtcbiAgICBlID0gMSAtIGVCaWFzO1xuICB9IGVsc2UgaWYoZSA9PT0gZU1heCl7XG4gICAgcmV0dXJuIG0gPyBOYU4gOiBzID8gLUluZmluaXR5IDogSW5maW5pdHk7XG4gIH0gZWxzZSB7XG4gICAgbSA9IG0gKyBwb3coMiwgbUxlbik7XG4gICAgZSA9IGUgLSBlQmlhcztcbiAgfSByZXR1cm4gKHMgPyAtMSA6IDEpICogbSAqIHBvdygyLCBlIC0gbUxlbik7XG59O1xuXG52YXIgdW5wYWNrSTMyID0gZnVuY3Rpb24oYnl0ZXMpe1xuICByZXR1cm4gYnl0ZXNbM10gPDwgMjQgfCBieXRlc1syXSA8PCAxNiB8IGJ5dGVzWzFdIDw8IDggfCBieXRlc1swXTtcbn07XG52YXIgcGFja0k4ID0gZnVuY3Rpb24oaXQpe1xuICByZXR1cm4gW2l0ICYgMHhmZl07XG59O1xudmFyIHBhY2tJMTYgPSBmdW5jdGlvbihpdCl7XG4gIHJldHVybiBbaXQgJiAweGZmLCBpdCA+PiA4ICYgMHhmZl07XG59O1xudmFyIHBhY2tJMzIgPSBmdW5jdGlvbihpdCl7XG4gIHJldHVybiBbaXQgJiAweGZmLCBpdCA+PiA4ICYgMHhmZiwgaXQgPj4gMTYgJiAweGZmLCBpdCA+PiAyNCAmIDB4ZmZdO1xufTtcbnZhciBwYWNrRjY0ID0gZnVuY3Rpb24oaXQpe1xuICByZXR1cm4gcGFja0lFRUU3NTQoaXQsIDUyLCA4KTtcbn07XG52YXIgcGFja0YzMiA9IGZ1bmN0aW9uKGl0KXtcbiAgcmV0dXJuIHBhY2tJRUVFNzU0KGl0LCAyMywgNCk7XG59O1xuXG52YXIgYWRkR2V0dGVyID0gZnVuY3Rpb24oQywga2V5LCBpbnRlcm5hbCl7XG4gIGRQKENbUFJPVE9UWVBFXSwga2V5LCB7Z2V0OiBmdW5jdGlvbigpeyByZXR1cm4gdGhpc1tpbnRlcm5hbF07IH19KTtcbn07XG5cbnZhciBnZXQgPSBmdW5jdGlvbih2aWV3LCBieXRlcywgaW5kZXgsIGlzTGl0dGxlRW5kaWFuKXtcbiAgdmFyIG51bUluZGV4ID0gK2luZGV4XG4gICAgLCBpbnRJbmRleCA9IHRvSW50ZWdlcihudW1JbmRleCk7XG4gIGlmKG51bUluZGV4ICE9IGludEluZGV4IHx8IGludEluZGV4IDwgMCB8fCBpbnRJbmRleCArIGJ5dGVzID4gdmlld1skTEVOR1RIXSl0aHJvdyBSYW5nZUVycm9yKFdST05HX0lOREVYKTtcbiAgdmFyIHN0b3JlID0gdmlld1skQlVGRkVSXS5fYlxuICAgICwgc3RhcnQgPSBpbnRJbmRleCArIHZpZXdbJE9GRlNFVF1cbiAgICAsIHBhY2sgID0gc3RvcmUuc2xpY2Uoc3RhcnQsIHN0YXJ0ICsgYnl0ZXMpO1xuICByZXR1cm4gaXNMaXR0bGVFbmRpYW4gPyBwYWNrIDogcGFjay5yZXZlcnNlKCk7XG59O1xudmFyIHNldCA9IGZ1bmN0aW9uKHZpZXcsIGJ5dGVzLCBpbmRleCwgY29udmVyc2lvbiwgdmFsdWUsIGlzTGl0dGxlRW5kaWFuKXtcbiAgdmFyIG51bUluZGV4ID0gK2luZGV4XG4gICAgLCBpbnRJbmRleCA9IHRvSW50ZWdlcihudW1JbmRleCk7XG4gIGlmKG51bUluZGV4ICE9IGludEluZGV4IHx8IGludEluZGV4IDwgMCB8fCBpbnRJbmRleCArIGJ5dGVzID4gdmlld1skTEVOR1RIXSl0aHJvdyBSYW5nZUVycm9yKFdST05HX0lOREVYKTtcbiAgdmFyIHN0b3JlID0gdmlld1skQlVGRkVSXS5fYlxuICAgICwgc3RhcnQgPSBpbnRJbmRleCArIHZpZXdbJE9GRlNFVF1cbiAgICAsIHBhY2sgID0gY29udmVyc2lvbigrdmFsdWUpO1xuICBmb3IodmFyIGkgPSAwOyBpIDwgYnl0ZXM7IGkrKylzdG9yZVtzdGFydCArIGldID0gcGFja1tpc0xpdHRsZUVuZGlhbiA/IGkgOiBieXRlcyAtIGkgLSAxXTtcbn07XG5cbnZhciB2YWxpZGF0ZUFycmF5QnVmZmVyQXJndW1lbnRzID0gZnVuY3Rpb24odGhhdCwgbGVuZ3RoKXtcbiAgYW5JbnN0YW5jZSh0aGF0LCAkQXJyYXlCdWZmZXIsIEFSUkFZX0JVRkZFUik7XG4gIHZhciBudW1iZXJMZW5ndGggPSArbGVuZ3RoXG4gICAgLCBieXRlTGVuZ3RoICAgPSB0b0xlbmd0aChudW1iZXJMZW5ndGgpO1xuICBpZihudW1iZXJMZW5ndGggIT0gYnl0ZUxlbmd0aCl0aHJvdyBSYW5nZUVycm9yKFdST05HX0xFTkdUSCk7XG4gIHJldHVybiBieXRlTGVuZ3RoO1xufTtcblxuaWYoISR0eXBlZC5BQlYpe1xuICAkQXJyYXlCdWZmZXIgPSBmdW5jdGlvbiBBcnJheUJ1ZmZlcihsZW5ndGgpe1xuICAgIHZhciBieXRlTGVuZ3RoID0gdmFsaWRhdGVBcnJheUJ1ZmZlckFyZ3VtZW50cyh0aGlzLCBsZW5ndGgpO1xuICAgIHRoaXMuX2IgICAgICAgPSBhcnJheUZpbGwuY2FsbChBcnJheShieXRlTGVuZ3RoKSwgMCk7XG4gICAgdGhpc1skTEVOR1RIXSA9IGJ5dGVMZW5ndGg7XG4gIH07XG5cbiAgJERhdGFWaWV3ID0gZnVuY3Rpb24gRGF0YVZpZXcoYnVmZmVyLCBieXRlT2Zmc2V0LCBieXRlTGVuZ3RoKXtcbiAgICBhbkluc3RhbmNlKHRoaXMsICREYXRhVmlldywgREFUQV9WSUVXKTtcbiAgICBhbkluc3RhbmNlKGJ1ZmZlciwgJEFycmF5QnVmZmVyLCBEQVRBX1ZJRVcpO1xuICAgIHZhciBidWZmZXJMZW5ndGggPSBidWZmZXJbJExFTkdUSF1cbiAgICAgICwgb2Zmc2V0ICAgICAgID0gdG9JbnRlZ2VyKGJ5dGVPZmZzZXQpO1xuICAgIGlmKG9mZnNldCA8IDAgfHwgb2Zmc2V0ID4gYnVmZmVyTGVuZ3RoKXRocm93IFJhbmdlRXJyb3IoJ1dyb25nIG9mZnNldCEnKTtcbiAgICBieXRlTGVuZ3RoID0gYnl0ZUxlbmd0aCA9PT0gdW5kZWZpbmVkID8gYnVmZmVyTGVuZ3RoIC0gb2Zmc2V0IDogdG9MZW5ndGgoYnl0ZUxlbmd0aCk7XG4gICAgaWYob2Zmc2V0ICsgYnl0ZUxlbmd0aCA+IGJ1ZmZlckxlbmd0aCl0aHJvdyBSYW5nZUVycm9yKFdST05HX0xFTkdUSCk7XG4gICAgdGhpc1skQlVGRkVSXSA9IGJ1ZmZlcjtcbiAgICB0aGlzWyRPRkZTRVRdID0gb2Zmc2V0O1xuICAgIHRoaXNbJExFTkdUSF0gPSBieXRlTGVuZ3RoO1xuICB9O1xuXG4gIGlmKERFU0NSSVBUT1JTKXtcbiAgICBhZGRHZXR0ZXIoJEFycmF5QnVmZmVyLCBCWVRFX0xFTkdUSCwgJ19sJyk7XG4gICAgYWRkR2V0dGVyKCREYXRhVmlldywgQlVGRkVSLCAnX2InKTtcbiAgICBhZGRHZXR0ZXIoJERhdGFWaWV3LCBCWVRFX0xFTkdUSCwgJ19sJyk7XG4gICAgYWRkR2V0dGVyKCREYXRhVmlldywgQllURV9PRkZTRVQsICdfbycpO1xuICB9XG5cbiAgcmVkZWZpbmVBbGwoJERhdGFWaWV3W1BST1RPVFlQRV0sIHtcbiAgICBnZXRJbnQ4OiBmdW5jdGlvbiBnZXRJbnQ4KGJ5dGVPZmZzZXQpe1xuICAgICAgcmV0dXJuIGdldCh0aGlzLCAxLCBieXRlT2Zmc2V0KVswXSA8PCAyNCA+PiAyNDtcbiAgICB9LFxuICAgIGdldFVpbnQ4OiBmdW5jdGlvbiBnZXRVaW50OChieXRlT2Zmc2V0KXtcbiAgICAgIHJldHVybiBnZXQodGhpcywgMSwgYnl0ZU9mZnNldClbMF07XG4gICAgfSxcbiAgICBnZXRJbnQxNjogZnVuY3Rpb24gZ2V0SW50MTYoYnl0ZU9mZnNldCAvKiwgbGl0dGxlRW5kaWFuICovKXtcbiAgICAgIHZhciBieXRlcyA9IGdldCh0aGlzLCAyLCBieXRlT2Zmc2V0LCBhcmd1bWVudHNbMV0pO1xuICAgICAgcmV0dXJuIChieXRlc1sxXSA8PCA4IHwgYnl0ZXNbMF0pIDw8IDE2ID4+IDE2O1xuICAgIH0sXG4gICAgZ2V0VWludDE2OiBmdW5jdGlvbiBnZXRVaW50MTYoYnl0ZU9mZnNldCAvKiwgbGl0dGxlRW5kaWFuICovKXtcbiAgICAgIHZhciBieXRlcyA9IGdldCh0aGlzLCAyLCBieXRlT2Zmc2V0LCBhcmd1bWVudHNbMV0pO1xuICAgICAgcmV0dXJuIGJ5dGVzWzFdIDw8IDggfCBieXRlc1swXTtcbiAgICB9LFxuICAgIGdldEludDMyOiBmdW5jdGlvbiBnZXRJbnQzMihieXRlT2Zmc2V0IC8qLCBsaXR0bGVFbmRpYW4gKi8pe1xuICAgICAgcmV0dXJuIHVucGFja0kzMihnZXQodGhpcywgNCwgYnl0ZU9mZnNldCwgYXJndW1lbnRzWzFdKSk7XG4gICAgfSxcbiAgICBnZXRVaW50MzI6IGZ1bmN0aW9uIGdldFVpbnQzMihieXRlT2Zmc2V0IC8qLCBsaXR0bGVFbmRpYW4gKi8pe1xuICAgICAgcmV0dXJuIHVucGFja0kzMihnZXQodGhpcywgNCwgYnl0ZU9mZnNldCwgYXJndW1lbnRzWzFdKSkgPj4+IDA7XG4gICAgfSxcbiAgICBnZXRGbG9hdDMyOiBmdW5jdGlvbiBnZXRGbG9hdDMyKGJ5dGVPZmZzZXQgLyosIGxpdHRsZUVuZGlhbiAqLyl7XG4gICAgICByZXR1cm4gdW5wYWNrSUVFRTc1NChnZXQodGhpcywgNCwgYnl0ZU9mZnNldCwgYXJndW1lbnRzWzFdKSwgMjMsIDQpO1xuICAgIH0sXG4gICAgZ2V0RmxvYXQ2NDogZnVuY3Rpb24gZ2V0RmxvYXQ2NChieXRlT2Zmc2V0IC8qLCBsaXR0bGVFbmRpYW4gKi8pe1xuICAgICAgcmV0dXJuIHVucGFja0lFRUU3NTQoZ2V0KHRoaXMsIDgsIGJ5dGVPZmZzZXQsIGFyZ3VtZW50c1sxXSksIDUyLCA4KTtcbiAgICB9LFxuICAgIHNldEludDg6IGZ1bmN0aW9uIHNldEludDgoYnl0ZU9mZnNldCwgdmFsdWUpe1xuICAgICAgc2V0KHRoaXMsIDEsIGJ5dGVPZmZzZXQsIHBhY2tJOCwgdmFsdWUpO1xuICAgIH0sXG4gICAgc2V0VWludDg6IGZ1bmN0aW9uIHNldFVpbnQ4KGJ5dGVPZmZzZXQsIHZhbHVlKXtcbiAgICAgIHNldCh0aGlzLCAxLCBieXRlT2Zmc2V0LCBwYWNrSTgsIHZhbHVlKTtcbiAgICB9LFxuICAgIHNldEludDE2OiBmdW5jdGlvbiBzZXRJbnQxNihieXRlT2Zmc2V0LCB2YWx1ZSAvKiwgbGl0dGxlRW5kaWFuICovKXtcbiAgICAgIHNldCh0aGlzLCAyLCBieXRlT2Zmc2V0LCBwYWNrSTE2LCB2YWx1ZSwgYXJndW1lbnRzWzJdKTtcbiAgICB9LFxuICAgIHNldFVpbnQxNjogZnVuY3Rpb24gc2V0VWludDE2KGJ5dGVPZmZzZXQsIHZhbHVlIC8qLCBsaXR0bGVFbmRpYW4gKi8pe1xuICAgICAgc2V0KHRoaXMsIDIsIGJ5dGVPZmZzZXQsIHBhY2tJMTYsIHZhbHVlLCBhcmd1bWVudHNbMl0pO1xuICAgIH0sXG4gICAgc2V0SW50MzI6IGZ1bmN0aW9uIHNldEludDMyKGJ5dGVPZmZzZXQsIHZhbHVlIC8qLCBsaXR0bGVFbmRpYW4gKi8pe1xuICAgICAgc2V0KHRoaXMsIDQsIGJ5dGVPZmZzZXQsIHBhY2tJMzIsIHZhbHVlLCBhcmd1bWVudHNbMl0pO1xuICAgIH0sXG4gICAgc2V0VWludDMyOiBmdW5jdGlvbiBzZXRVaW50MzIoYnl0ZU9mZnNldCwgdmFsdWUgLyosIGxpdHRsZUVuZGlhbiAqLyl7XG4gICAgICBzZXQodGhpcywgNCwgYnl0ZU9mZnNldCwgcGFja0kzMiwgdmFsdWUsIGFyZ3VtZW50c1syXSk7XG4gICAgfSxcbiAgICBzZXRGbG9hdDMyOiBmdW5jdGlvbiBzZXRGbG9hdDMyKGJ5dGVPZmZzZXQsIHZhbHVlIC8qLCBsaXR0bGVFbmRpYW4gKi8pe1xuICAgICAgc2V0KHRoaXMsIDQsIGJ5dGVPZmZzZXQsIHBhY2tGMzIsIHZhbHVlLCBhcmd1bWVudHNbMl0pO1xuICAgIH0sXG4gICAgc2V0RmxvYXQ2NDogZnVuY3Rpb24gc2V0RmxvYXQ2NChieXRlT2Zmc2V0LCB2YWx1ZSAvKiwgbGl0dGxlRW5kaWFuICovKXtcbiAgICAgIHNldCh0aGlzLCA4LCBieXRlT2Zmc2V0LCBwYWNrRjY0LCB2YWx1ZSwgYXJndW1lbnRzWzJdKTtcbiAgICB9XG4gIH0pO1xufSBlbHNlIHtcbiAgaWYoIWZhaWxzKGZ1bmN0aW9uKCl7XG4gICAgbmV3ICRBcnJheUJ1ZmZlcjsgICAgIC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tbmV3XG4gIH0pIHx8ICFmYWlscyhmdW5jdGlvbigpe1xuICAgIG5ldyAkQXJyYXlCdWZmZXIoLjUpOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLW5ld1xuICB9KSl7XG4gICAgJEFycmF5QnVmZmVyID0gZnVuY3Rpb24gQXJyYXlCdWZmZXIobGVuZ3RoKXtcbiAgICAgIHJldHVybiBuZXcgQmFzZUJ1ZmZlcih2YWxpZGF0ZUFycmF5QnVmZmVyQXJndW1lbnRzKHRoaXMsIGxlbmd0aCkpO1xuICAgIH07XG4gICAgdmFyIEFycmF5QnVmZmVyUHJvdG8gPSAkQXJyYXlCdWZmZXJbUFJPVE9UWVBFXSA9IEJhc2VCdWZmZXJbUFJPVE9UWVBFXTtcbiAgICBmb3IodmFyIGtleXMgPSBnT1BOKEJhc2VCdWZmZXIpLCBqID0gMCwga2V5OyBrZXlzLmxlbmd0aCA+IGo7ICl7XG4gICAgICBpZighKChrZXkgPSBrZXlzW2orK10pIGluICRBcnJheUJ1ZmZlcikpaGlkZSgkQXJyYXlCdWZmZXIsIGtleSwgQmFzZUJ1ZmZlcltrZXldKTtcbiAgICB9O1xuICAgIGlmKCFMSUJSQVJZKUFycmF5QnVmZmVyUHJvdG8uY29uc3RydWN0b3IgPSAkQXJyYXlCdWZmZXI7XG4gIH1cbiAgLy8gaU9TIFNhZmFyaSA3LnggYnVnXG4gIHZhciB2aWV3ID0gbmV3ICREYXRhVmlldyhuZXcgJEFycmF5QnVmZmVyKDIpKVxuICAgICwgJHNldEludDggPSAkRGF0YVZpZXdbUFJPVE9UWVBFXS5zZXRJbnQ4O1xuICB2aWV3LnNldEludDgoMCwgMjE0NzQ4MzY0OCk7XG4gIHZpZXcuc2V0SW50OCgxLCAyMTQ3NDgzNjQ5KTtcbiAgaWYodmlldy5nZXRJbnQ4KDApIHx8ICF2aWV3LmdldEludDgoMSkpcmVkZWZpbmVBbGwoJERhdGFWaWV3W1BST1RPVFlQRV0sIHtcbiAgICBzZXRJbnQ4OiBmdW5jdGlvbiBzZXRJbnQ4KGJ5dGVPZmZzZXQsIHZhbHVlKXtcbiAgICAgICRzZXRJbnQ4LmNhbGwodGhpcywgYnl0ZU9mZnNldCwgdmFsdWUgPDwgMjQgPj4gMjQpO1xuICAgIH0sXG4gICAgc2V0VWludDg6IGZ1bmN0aW9uIHNldFVpbnQ4KGJ5dGVPZmZzZXQsIHZhbHVlKXtcbiAgICAgICRzZXRJbnQ4LmNhbGwodGhpcywgYnl0ZU9mZnNldCwgdmFsdWUgPDwgMjQgPj4gMjQpO1xuICAgIH1cbiAgfSwgdHJ1ZSk7XG59XG5zZXRUb1N0cmluZ1RhZygkQXJyYXlCdWZmZXIsIEFSUkFZX0JVRkZFUik7XG5zZXRUb1N0cmluZ1RhZygkRGF0YVZpZXcsIERBVEFfVklFVyk7XG5oaWRlKCREYXRhVmlld1tQUk9UT1RZUEVdLCAkdHlwZWQuVklFVywgdHJ1ZSk7XG5leHBvcnRzW0FSUkFZX0JVRkZFUl0gPSAkQXJyYXlCdWZmZXI7XG5leHBvcnRzW0RBVEFfVklFV10gPSAkRGF0YVZpZXc7IiwidmFyIGdsb2JhbCA9IHJlcXVpcmUoJy4vX2dsb2JhbCcpXG4gICwgaGlkZSAgID0gcmVxdWlyZSgnLi9faGlkZScpXG4gICwgdWlkICAgID0gcmVxdWlyZSgnLi9fdWlkJylcbiAgLCBUWVBFRCAgPSB1aWQoJ3R5cGVkX2FycmF5JylcbiAgLCBWSUVXICAgPSB1aWQoJ3ZpZXcnKVxuICAsIEFCViAgICA9ICEhKGdsb2JhbC5BcnJheUJ1ZmZlciAmJiBnbG9iYWwuRGF0YVZpZXcpXG4gICwgQ09OU1RSID0gQUJWXG4gICwgaSA9IDAsIGwgPSA5LCBUeXBlZDtcblxudmFyIFR5cGVkQXJyYXlDb25zdHJ1Y3RvcnMgPSAoXG4gICdJbnQ4QXJyYXksVWludDhBcnJheSxVaW50OENsYW1wZWRBcnJheSxJbnQxNkFycmF5LFVpbnQxNkFycmF5LEludDMyQXJyYXksVWludDMyQXJyYXksRmxvYXQzMkFycmF5LEZsb2F0NjRBcnJheSdcbikuc3BsaXQoJywnKTtcblxud2hpbGUoaSA8IGwpe1xuICBpZihUeXBlZCA9IGdsb2JhbFtUeXBlZEFycmF5Q29uc3RydWN0b3JzW2krK11dKXtcbiAgICBoaWRlKFR5cGVkLnByb3RvdHlwZSwgVFlQRUQsIHRydWUpO1xuICAgIGhpZGUoVHlwZWQucHJvdG90eXBlLCBWSUVXLCB0cnVlKTtcbiAgfSBlbHNlIENPTlNUUiA9IGZhbHNlO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgQUJWOiAgICBBQlYsXG4gIENPTlNUUjogQ09OU1RSLFxuICBUWVBFRDogIFRZUEVELFxuICBWSUVXOiAgIFZJRVdcbn07IiwidmFyIGlkID0gMFxuICAsIHB4ID0gTWF0aC5yYW5kb20oKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oa2V5KXtcbiAgcmV0dXJuICdTeW1ib2woJy5jb25jYXQoa2V5ID09PSB1bmRlZmluZWQgPyAnJyA6IGtleSwgJylfJywgKCsraWQgKyBweCkudG9TdHJpbmcoMzYpKTtcbn07IiwidmFyIHN0b3JlICAgICAgPSByZXF1aXJlKCcuL19zaGFyZWQnKSgnd2tzJylcbiAgLCB1aWQgICAgICAgID0gcmVxdWlyZSgnLi9fdWlkJylcbiAgLCBTeW1ib2wgICAgID0gcmVxdWlyZSgnLi9fZ2xvYmFsJykuU3ltYm9sXG4gICwgVVNFX1NZTUJPTCA9IHR5cGVvZiBTeW1ib2wgPT0gJ2Z1bmN0aW9uJztcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24obmFtZSl7XG4gIHJldHVybiBzdG9yZVtuYW1lXSB8fCAoc3RvcmVbbmFtZV0gPVxuICAgIFVTRV9TWU1CT0wgJiYgU3ltYm9sW25hbWVdIHx8IChVU0VfU1lNQk9MID8gU3ltYm9sIDogdWlkKSgnU3ltYm9sLicgKyBuYW1lKSk7XG59OyIsInZhciBjbGFzc29mICAgPSByZXF1aXJlKCcuL19jbGFzc29mJylcbiAgLCBJVEVSQVRPUiAgPSByZXF1aXJlKCcuL193a3MnKSgnaXRlcmF0b3InKVxuICAsIEl0ZXJhdG9ycyA9IHJlcXVpcmUoJy4vX2l0ZXJhdG9ycycpO1xubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL19jb3JlJykuZ2V0SXRlcmF0b3JNZXRob2QgPSBmdW5jdGlvbihpdCl7XG4gIGlmKGl0ICE9IHVuZGVmaW5lZClyZXR1cm4gaXRbSVRFUkFUT1JdXG4gICAgfHwgaXRbJ0BAaXRlcmF0b3InXVxuICAgIHx8IEl0ZXJhdG9yc1tjbGFzc29mKGl0KV07XG59OyIsInZhciBjbGFzc29mICAgPSByZXF1aXJlKCcuL19jbGFzc29mJylcbiAgLCBJVEVSQVRPUiAgPSByZXF1aXJlKCcuL193a3MnKSgnaXRlcmF0b3InKVxuICAsIEl0ZXJhdG9ycyA9IHJlcXVpcmUoJy4vX2l0ZXJhdG9ycycpO1xubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL19jb3JlJykuaXNJdGVyYWJsZSA9IGZ1bmN0aW9uKGl0KXtcbiAgdmFyIE8gPSBPYmplY3QoaXQpO1xuICByZXR1cm4gT1tJVEVSQVRPUl0gIT09IHVuZGVmaW5lZFxuICAgIHx8ICdAQGl0ZXJhdG9yJyBpbiBPXG4gICAgfHwgSXRlcmF0b3JzLmhhc093blByb3BlcnR5KGNsYXNzb2YoTykpO1xufTsiLCIvLyBodHRwczovL2dpdGh1Yi5jb20vYmVuamFtaW5nci9SZXhFeHAuZXNjYXBlXG52YXIgJGV4cG9ydCA9IHJlcXVpcmUoJy4vX2V4cG9ydCcpXG4gICwgJHJlICAgICA9IHJlcXVpcmUoJy4vX3JlcGxhY2VyJykoL1tcXFxcXiQqKz8uKCl8W1xcXXt9XS9nLCAnXFxcXCQmJyk7XG5cbiRleHBvcnQoJGV4cG9ydC5TLCAnUmVnRXhwJywge2VzY2FwZTogZnVuY3Rpb24gZXNjYXBlKGl0KXsgcmV0dXJuICRyZShpdCk7IH19KTtcbiIsIi8vIDIyLjEuMy4zIEFycmF5LnByb3RvdHlwZS5jb3B5V2l0aGluKHRhcmdldCwgc3RhcnQsIGVuZCA9IHRoaXMubGVuZ3RoKVxudmFyICRleHBvcnQgPSByZXF1aXJlKCcuL19leHBvcnQnKTtcblxuJGV4cG9ydCgkZXhwb3J0LlAsICdBcnJheScsIHtjb3B5V2l0aGluOiByZXF1aXJlKCcuL19hcnJheS1jb3B5LXdpdGhpbicpfSk7XG5cbnJlcXVpcmUoJy4vX2FkZC10by11bnNjb3BhYmxlcycpKCdjb3B5V2l0aGluJyk7IiwiJ3VzZSBzdHJpY3QnO1xyXG52YXIgJGV4cG9ydCA9IHJlcXVpcmUoJy4vX2V4cG9ydCcpXHJcbiAgLCAkZXZlcnkgID0gcmVxdWlyZSgnLi9fYXJyYXktbWV0aG9kcycpKDQpO1xyXG5cclxuJGV4cG9ydCgkZXhwb3J0LlAgKyAkZXhwb3J0LkYgKiAhcmVxdWlyZSgnLi9fc3RyaWN0LW1ldGhvZCcpKFtdLmV2ZXJ5LCB0cnVlKSwgJ0FycmF5Jywge1xyXG4gIC8vIDIyLjEuMy41IC8gMTUuNC40LjE2IEFycmF5LnByb3RvdHlwZS5ldmVyeShjYWxsYmFja2ZuIFssIHRoaXNBcmddKVxyXG4gIGV2ZXJ5OiBmdW5jdGlvbiBldmVyeShjYWxsYmFja2ZuIC8qICwgdGhpc0FyZyAqLyl7XHJcbiAgICByZXR1cm4gJGV2ZXJ5KHRoaXMsIGNhbGxiYWNrZm4sIGFyZ3VtZW50c1sxXSk7XHJcbiAgfVxyXG59KTsiLCIvLyAyMi4xLjMuNiBBcnJheS5wcm90b3R5cGUuZmlsbCh2YWx1ZSwgc3RhcnQgPSAwLCBlbmQgPSB0aGlzLmxlbmd0aClcbnZhciAkZXhwb3J0ID0gcmVxdWlyZSgnLi9fZXhwb3J0Jyk7XG5cbiRleHBvcnQoJGV4cG9ydC5QLCAnQXJyYXknLCB7ZmlsbDogcmVxdWlyZSgnLi9fYXJyYXktZmlsbCcpfSk7XG5cbnJlcXVpcmUoJy4vX2FkZC10by11bnNjb3BhYmxlcycpKCdmaWxsJyk7IiwiJ3VzZSBzdHJpY3QnO1xyXG52YXIgJGV4cG9ydCA9IHJlcXVpcmUoJy4vX2V4cG9ydCcpXHJcbiAgLCAkZmlsdGVyID0gcmVxdWlyZSgnLi9fYXJyYXktbWV0aG9kcycpKDIpO1xyXG5cclxuJGV4cG9ydCgkZXhwb3J0LlAgKyAkZXhwb3J0LkYgKiAhcmVxdWlyZSgnLi9fc3RyaWN0LW1ldGhvZCcpKFtdLmZpbHRlciwgdHJ1ZSksICdBcnJheScsIHtcclxuICAvLyAyMi4xLjMuNyAvIDE1LjQuNC4yMCBBcnJheS5wcm90b3R5cGUuZmlsdGVyKGNhbGxiYWNrZm4gWywgdGhpc0FyZ10pXHJcbiAgZmlsdGVyOiBmdW5jdGlvbiBmaWx0ZXIoY2FsbGJhY2tmbiAvKiAsIHRoaXNBcmcgKi8pe1xyXG4gICAgcmV0dXJuICRmaWx0ZXIodGhpcywgY2FsbGJhY2tmbiwgYXJndW1lbnRzWzFdKTtcclxuICB9XHJcbn0pOyIsIid1c2Ugc3RyaWN0Jztcbi8vIDIyLjEuMy45IEFycmF5LnByb3RvdHlwZS5maW5kSW5kZXgocHJlZGljYXRlLCB0aGlzQXJnID0gdW5kZWZpbmVkKVxudmFyICRleHBvcnQgPSByZXF1aXJlKCcuL19leHBvcnQnKVxuICAsICRmaW5kICAgPSByZXF1aXJlKCcuL19hcnJheS1tZXRob2RzJykoNilcbiAgLCBLRVkgICAgID0gJ2ZpbmRJbmRleCdcbiAgLCBmb3JjZWQgID0gdHJ1ZTtcbi8vIFNob3VsZG4ndCBza2lwIGhvbGVzXG5pZihLRVkgaW4gW10pQXJyYXkoMSlbS0VZXShmdW5jdGlvbigpeyBmb3JjZWQgPSBmYWxzZTsgfSk7XG4kZXhwb3J0KCRleHBvcnQuUCArICRleHBvcnQuRiAqIGZvcmNlZCwgJ0FycmF5Jywge1xuICBmaW5kSW5kZXg6IGZ1bmN0aW9uIGZpbmRJbmRleChjYWxsYmFja2ZuLyosIHRoYXQgPSB1bmRlZmluZWQgKi8pe1xuICAgIHJldHVybiAkZmluZCh0aGlzLCBjYWxsYmFja2ZuLCBhcmd1bWVudHMubGVuZ3RoID4gMSA/IGFyZ3VtZW50c1sxXSA6IHVuZGVmaW5lZCk7XG4gIH1cbn0pO1xucmVxdWlyZSgnLi9fYWRkLXRvLXVuc2NvcGFibGVzJykoS0VZKTsiLCIndXNlIHN0cmljdCc7XG4vLyAyMi4xLjMuOCBBcnJheS5wcm90b3R5cGUuZmluZChwcmVkaWNhdGUsIHRoaXNBcmcgPSB1bmRlZmluZWQpXG52YXIgJGV4cG9ydCA9IHJlcXVpcmUoJy4vX2V4cG9ydCcpXG4gICwgJGZpbmQgICA9IHJlcXVpcmUoJy4vX2FycmF5LW1ldGhvZHMnKSg1KVxuICAsIEtFWSAgICAgPSAnZmluZCdcbiAgLCBmb3JjZWQgID0gdHJ1ZTtcbi8vIFNob3VsZG4ndCBza2lwIGhvbGVzXG5pZihLRVkgaW4gW10pQXJyYXkoMSlbS0VZXShmdW5jdGlvbigpeyBmb3JjZWQgPSBmYWxzZTsgfSk7XG4kZXhwb3J0KCRleHBvcnQuUCArICRleHBvcnQuRiAqIGZvcmNlZCwgJ0FycmF5Jywge1xuICBmaW5kOiBmdW5jdGlvbiBmaW5kKGNhbGxiYWNrZm4vKiwgdGhhdCA9IHVuZGVmaW5lZCAqLyl7XG4gICAgcmV0dXJuICRmaW5kKHRoaXMsIGNhbGxiYWNrZm4sIGFyZ3VtZW50cy5sZW5ndGggPiAxID8gYXJndW1lbnRzWzFdIDogdW5kZWZpbmVkKTtcbiAgfVxufSk7XG5yZXF1aXJlKCcuL19hZGQtdG8tdW5zY29wYWJsZXMnKShLRVkpOyIsIid1c2Ugc3RyaWN0JztcclxudmFyICRleHBvcnQgID0gcmVxdWlyZSgnLi9fZXhwb3J0JylcclxuICAsICRmb3JFYWNoID0gcmVxdWlyZSgnLi9fYXJyYXktbWV0aG9kcycpKDApXHJcbiAgLCBTVFJJQ1QgICA9IHJlcXVpcmUoJy4vX3N0cmljdC1tZXRob2QnKShbXS5mb3JFYWNoLCB0cnVlKTtcclxuXHJcbiRleHBvcnQoJGV4cG9ydC5QICsgJGV4cG9ydC5GICogIVNUUklDVCwgJ0FycmF5Jywge1xyXG4gIC8vIDIyLjEuMy4xMCAvIDE1LjQuNC4xOCBBcnJheS5wcm90b3R5cGUuZm9yRWFjaChjYWxsYmFja2ZuIFssIHRoaXNBcmddKVxyXG4gIGZvckVhY2g6IGZ1bmN0aW9uIGZvckVhY2goY2FsbGJhY2tmbiAvKiAsIHRoaXNBcmcgKi8pe1xyXG4gICAgcmV0dXJuICRmb3JFYWNoKHRoaXMsIGNhbGxiYWNrZm4sIGFyZ3VtZW50c1sxXSk7XHJcbiAgfVxyXG59KTsiLCIndXNlIHN0cmljdCc7XG52YXIgY3R4ICAgICAgICAgPSByZXF1aXJlKCcuL19jdHgnKVxuICAsICRleHBvcnQgICAgID0gcmVxdWlyZSgnLi9fZXhwb3J0JylcbiAgLCB0b09iamVjdCAgICA9IHJlcXVpcmUoJy4vX3RvLW9iamVjdCcpXG4gICwgY2FsbCAgICAgICAgPSByZXF1aXJlKCcuL19pdGVyLWNhbGwnKVxuICAsIGlzQXJyYXlJdGVyID0gcmVxdWlyZSgnLi9faXMtYXJyYXktaXRlcicpXG4gICwgdG9MZW5ndGggICAgPSByZXF1aXJlKCcuL190by1sZW5ndGgnKVxuICAsIGdldEl0ZXJGbiAgID0gcmVxdWlyZSgnLi9jb3JlLmdldC1pdGVyYXRvci1tZXRob2QnKTtcbiRleHBvcnQoJGV4cG9ydC5TICsgJGV4cG9ydC5GICogIXJlcXVpcmUoJy4vX2l0ZXItZGV0ZWN0JykoZnVuY3Rpb24oaXRlcil7IEFycmF5LmZyb20oaXRlcik7IH0pLCAnQXJyYXknLCB7XG4gIC8vIDIyLjEuMi4xIEFycmF5LmZyb20oYXJyYXlMaWtlLCBtYXBmbiA9IHVuZGVmaW5lZCwgdGhpc0FyZyA9IHVuZGVmaW5lZClcbiAgZnJvbTogZnVuY3Rpb24gZnJvbShhcnJheUxpa2UvKiwgbWFwZm4gPSB1bmRlZmluZWQsIHRoaXNBcmcgPSB1bmRlZmluZWQqLyl7XG4gICAgdmFyIE8gICAgICAgPSB0b09iamVjdChhcnJheUxpa2UpXG4gICAgICAsIEMgICAgICAgPSB0eXBlb2YgdGhpcyA9PSAnZnVuY3Rpb24nID8gdGhpcyA6IEFycmF5XG4gICAgICAsIGFMZW4gICAgPSBhcmd1bWVudHMubGVuZ3RoXG4gICAgICAsIG1hcGZuICAgPSBhTGVuID4gMSA/IGFyZ3VtZW50c1sxXSA6IHVuZGVmaW5lZFxuICAgICAgLCBtYXBwaW5nID0gbWFwZm4gIT09IHVuZGVmaW5lZFxuICAgICAgLCBpbmRleCAgID0gMFxuICAgICAgLCBpdGVyRm4gID0gZ2V0SXRlckZuKE8pXG4gICAgICAsIGxlbmd0aCwgcmVzdWx0LCBzdGVwLCBpdGVyYXRvcjtcbiAgICBpZihtYXBwaW5nKW1hcGZuID0gY3R4KG1hcGZuLCBhTGVuID4gMiA/IGFyZ3VtZW50c1syXSA6IHVuZGVmaW5lZCwgMik7XG4gICAgLy8gaWYgb2JqZWN0IGlzbid0IGl0ZXJhYmxlIG9yIGl0J3MgYXJyYXkgd2l0aCBkZWZhdWx0IGl0ZXJhdG9yIC0gdXNlIHNpbXBsZSBjYXNlXG4gICAgaWYoaXRlckZuICE9IHVuZGVmaW5lZCAmJiAhKEMgPT0gQXJyYXkgJiYgaXNBcnJheUl0ZXIoaXRlckZuKSkpe1xuICAgICAgZm9yKGl0ZXJhdG9yID0gaXRlckZuLmNhbGwoTyksIHJlc3VsdCA9IG5ldyBDOyAhKHN0ZXAgPSBpdGVyYXRvci5uZXh0KCkpLmRvbmU7IGluZGV4Kyspe1xuICAgICAgICByZXN1bHRbaW5kZXhdID0gbWFwcGluZyA/IGNhbGwoaXRlcmF0b3IsIG1hcGZuLCBbc3RlcC52YWx1ZSwgaW5kZXhdLCB0cnVlKSA6IHN0ZXAudmFsdWU7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGxlbmd0aCA9IHRvTGVuZ3RoKE8ubGVuZ3RoKTtcbiAgICAgIGZvcihyZXN1bHQgPSBuZXcgQyhsZW5ndGgpOyBsZW5ndGggPiBpbmRleDsgaW5kZXgrKyl7XG4gICAgICAgIHJlc3VsdFtpbmRleF0gPSBtYXBwaW5nID8gbWFwZm4oT1tpbmRleF0sIGluZGV4KSA6IE9baW5kZXhdO1xuICAgICAgfVxuICAgIH1cbiAgICByZXN1bHQubGVuZ3RoID0gaW5kZXg7XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxufSk7XG4iLCIndXNlIHN0cmljdCc7XHJcbnZhciAkZXhwb3J0ICA9IHJlcXVpcmUoJy4vX2V4cG9ydCcpXHJcbiAgLCAkaW5kZXhPZiA9IHJlcXVpcmUoJy4vX2FycmF5LWluY2x1ZGVzJykoZmFsc2UpO1xyXG5cclxuJGV4cG9ydCgkZXhwb3J0LlAgKyAkZXhwb3J0LkYgKiAhcmVxdWlyZSgnLi9fc3RyaWN0LW1ldGhvZCcpKFtdLmluZGV4T2YpLCAnQXJyYXknLCB7XHJcbiAgLy8gMjIuMS4zLjExIC8gMTUuNC40LjE0IEFycmF5LnByb3RvdHlwZS5pbmRleE9mKHNlYXJjaEVsZW1lbnQgWywgZnJvbUluZGV4XSlcclxuICBpbmRleE9mOiBmdW5jdGlvbiBpbmRleE9mKHNlYXJjaEVsZW1lbnQgLyosIGZyb21JbmRleCA9IDAgKi8pe1xyXG4gICAgcmV0dXJuICRpbmRleE9mKHRoaXMsIHNlYXJjaEVsZW1lbnQsIGFyZ3VtZW50c1sxXSk7XHJcbiAgfVxyXG59KTsiLCIvLyAyMi4xLjIuMiAvIDE1LjQuMy4yIEFycmF5LmlzQXJyYXkoYXJnKVxyXG52YXIgJGV4cG9ydCA9IHJlcXVpcmUoJy4vX2V4cG9ydCcpO1xyXG5cclxuJGV4cG9ydCgkZXhwb3J0LlMsICdBcnJheScsIHtpc0FycmF5OiByZXF1aXJlKCcuL19pcy1hcnJheScpfSk7IiwiJ3VzZSBzdHJpY3QnO1xudmFyIGFkZFRvVW5zY29wYWJsZXMgPSByZXF1aXJlKCcuL19hZGQtdG8tdW5zY29wYWJsZXMnKVxuICAsIHN0ZXAgICAgICAgICAgICAgPSByZXF1aXJlKCcuL19pdGVyLXN0ZXAnKVxuICAsIEl0ZXJhdG9ycyAgICAgICAgPSByZXF1aXJlKCcuL19pdGVyYXRvcnMnKVxuICAsIHRvSU9iamVjdCAgICAgICAgPSByZXF1aXJlKCcuL190by1pb2JqZWN0Jyk7XG5cbi8vIDIyLjEuMy40IEFycmF5LnByb3RvdHlwZS5lbnRyaWVzKClcbi8vIDIyLjEuMy4xMyBBcnJheS5wcm90b3R5cGUua2V5cygpXG4vLyAyMi4xLjMuMjkgQXJyYXkucHJvdG90eXBlLnZhbHVlcygpXG4vLyAyMi4xLjMuMzAgQXJyYXkucHJvdG90eXBlW0BAaXRlcmF0b3JdKClcbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9faXRlci1kZWZpbmUnKShBcnJheSwgJ0FycmF5JywgZnVuY3Rpb24oaXRlcmF0ZWQsIGtpbmQpe1xuICB0aGlzLl90ID0gdG9JT2JqZWN0KGl0ZXJhdGVkKTsgLy8gdGFyZ2V0XG4gIHRoaXMuX2kgPSAwOyAgICAgICAgICAgICAgICAgICAvLyBuZXh0IGluZGV4XG4gIHRoaXMuX2sgPSBraW5kOyAgICAgICAgICAgICAgICAvLyBraW5kXG4vLyAyMi4xLjUuMi4xICVBcnJheUl0ZXJhdG9yUHJvdG90eXBlJS5uZXh0KClcbn0sIGZ1bmN0aW9uKCl7XG4gIHZhciBPICAgICA9IHRoaXMuX3RcbiAgICAsIGtpbmQgID0gdGhpcy5fa1xuICAgICwgaW5kZXggPSB0aGlzLl9pKys7XG4gIGlmKCFPIHx8IGluZGV4ID49IE8ubGVuZ3RoKXtcbiAgICB0aGlzLl90ID0gdW5kZWZpbmVkO1xuICAgIHJldHVybiBzdGVwKDEpO1xuICB9XG4gIGlmKGtpbmQgPT0gJ2tleXMnICApcmV0dXJuIHN0ZXAoMCwgaW5kZXgpO1xuICBpZihraW5kID09ICd2YWx1ZXMnKXJldHVybiBzdGVwKDAsIE9baW5kZXhdKTtcbiAgcmV0dXJuIHN0ZXAoMCwgW2luZGV4LCBPW2luZGV4XV0pO1xufSwgJ3ZhbHVlcycpO1xuXG4vLyBhcmd1bWVudHNMaXN0W0BAaXRlcmF0b3JdIGlzICVBcnJheVByb3RvX3ZhbHVlcyUgKDkuNC40LjYsIDkuNC40LjcpXG5JdGVyYXRvcnMuQXJndW1lbnRzID0gSXRlcmF0b3JzLkFycmF5O1xuXG5hZGRUb1Vuc2NvcGFibGVzKCdrZXlzJyk7XG5hZGRUb1Vuc2NvcGFibGVzKCd2YWx1ZXMnKTtcbmFkZFRvVW5zY29wYWJsZXMoJ2VudHJpZXMnKTsiLCIndXNlIHN0cmljdCc7XHJcbi8vIDIyLjEuMy4xMyBBcnJheS5wcm90b3R5cGUuam9pbihzZXBhcmF0b3IpXHJcbnZhciAkZXhwb3J0ICAgPSByZXF1aXJlKCcuL19leHBvcnQnKVxyXG4gICwgdG9JT2JqZWN0ID0gcmVxdWlyZSgnLi9fdG8taW9iamVjdCcpXHJcbiAgLCBhcnJheUpvaW4gPSBbXS5qb2luO1xyXG5cclxuLy8gZmFsbGJhY2sgZm9yIG5vdCBhcnJheS1saWtlIHN0cmluZ3NcclxuJGV4cG9ydCgkZXhwb3J0LlAgKyAkZXhwb3J0LkYgKiAocmVxdWlyZSgnLi9faW9iamVjdCcpICE9IE9iamVjdCB8fCAhcmVxdWlyZSgnLi9fc3RyaWN0LW1ldGhvZCcpKGFycmF5Sm9pbikpLCAnQXJyYXknLCB7XHJcbiAgam9pbjogZnVuY3Rpb24gam9pbihzZXBhcmF0b3Ipe1xyXG4gICAgcmV0dXJuIGFycmF5Sm9pbi5jYWxsKHRvSU9iamVjdCh0aGlzKSwgc2VwYXJhdG9yID09PSB1bmRlZmluZWQgPyAnLCcgOiBzZXBhcmF0b3IpO1xyXG4gIH1cclxufSk7IiwiJ3VzZSBzdHJpY3QnO1xyXG52YXIgJGV4cG9ydCAgID0gcmVxdWlyZSgnLi9fZXhwb3J0JylcclxuICAsIHRvSU9iamVjdCA9IHJlcXVpcmUoJy4vX3RvLWlvYmplY3QnKVxyXG4gICwgdG9JbnRlZ2VyID0gcmVxdWlyZSgnLi9fdG8taW50ZWdlcicpXHJcbiAgLCB0b0xlbmd0aCAgPSByZXF1aXJlKCcuL190by1sZW5ndGgnKTtcclxuXHJcbiRleHBvcnQoJGV4cG9ydC5QICsgJGV4cG9ydC5GICogIXJlcXVpcmUoJy4vX3N0cmljdC1tZXRob2QnKShbXS5sYXN0SW5kZXhPZiksICdBcnJheScsIHtcclxuICAvLyAyMi4xLjMuMTQgLyAxNS40LjQuMTUgQXJyYXkucHJvdG90eXBlLmxhc3RJbmRleE9mKHNlYXJjaEVsZW1lbnQgWywgZnJvbUluZGV4XSlcclxuICBsYXN0SW5kZXhPZjogZnVuY3Rpb24gbGFzdEluZGV4T2Yoc2VhcmNoRWxlbWVudCAvKiwgZnJvbUluZGV4ID0gQFsqLTFdICovKXtcclxuICAgIHZhciBPICAgICAgPSB0b0lPYmplY3QodGhpcylcclxuICAgICAgLCBsZW5ndGggPSB0b0xlbmd0aChPLmxlbmd0aClcclxuICAgICAgLCBpbmRleCAgPSBsZW5ndGggLSAxO1xyXG4gICAgaWYoYXJndW1lbnRzLmxlbmd0aCA+IDEpaW5kZXggPSBNYXRoLm1pbihpbmRleCwgdG9JbnRlZ2VyKGFyZ3VtZW50c1sxXSkpO1xyXG4gICAgaWYoaW5kZXggPCAwKWluZGV4ID0gbGVuZ3RoICsgaW5kZXg7XHJcbiAgICBmb3IoO2luZGV4ID49IDA7IGluZGV4LS0paWYoaW5kZXggaW4gTylpZihPW2luZGV4XSA9PT0gc2VhcmNoRWxlbWVudClyZXR1cm4gaW5kZXg7XHJcbiAgICByZXR1cm4gLTE7XHJcbiAgfVxyXG59KTsiLCIndXNlIHN0cmljdCc7XHJcbnZhciAkZXhwb3J0ID0gcmVxdWlyZSgnLi9fZXhwb3J0JylcclxuICAsICRtYXAgICAgPSByZXF1aXJlKCcuL19hcnJheS1tZXRob2RzJykoMSk7XHJcblxyXG4kZXhwb3J0KCRleHBvcnQuUCArICRleHBvcnQuRiAqICFyZXF1aXJlKCcuL19zdHJpY3QtbWV0aG9kJykoW10ubWFwLCB0cnVlKSwgJ0FycmF5Jywge1xyXG4gIC8vIDIyLjEuMy4xNSAvIDE1LjQuNC4xOSBBcnJheS5wcm90b3R5cGUubWFwKGNhbGxiYWNrZm4gWywgdGhpc0FyZ10pXHJcbiAgbWFwOiBmdW5jdGlvbiBtYXAoY2FsbGJhY2tmbiAvKiAsIHRoaXNBcmcgKi8pe1xyXG4gICAgcmV0dXJuICRtYXAodGhpcywgY2FsbGJhY2tmbiwgYXJndW1lbnRzWzFdKTtcclxuICB9XHJcbn0pOyIsIid1c2Ugc3RyaWN0JztcbnZhciAkZXhwb3J0ID0gcmVxdWlyZSgnLi9fZXhwb3J0Jyk7XG5cbi8vIFdlYktpdCBBcnJheS5vZiBpc24ndCBnZW5lcmljXG4kZXhwb3J0KCRleHBvcnQuUyArICRleHBvcnQuRiAqIHJlcXVpcmUoJy4vX2ZhaWxzJykoZnVuY3Rpb24oKXtcbiAgZnVuY3Rpb24gRigpe31cbiAgcmV0dXJuICEoQXJyYXkub2YuY2FsbChGKSBpbnN0YW5jZW9mIEYpO1xufSksICdBcnJheScsIHtcbiAgLy8gMjIuMS4yLjMgQXJyYXkub2YoIC4uLml0ZW1zKVxuICBvZjogZnVuY3Rpb24gb2YoLyogLi4uYXJncyAqLyl7XG4gICAgdmFyIGluZGV4ICA9IDBcbiAgICAgICwgYUxlbiAgID0gYXJndW1lbnRzLmxlbmd0aFxuICAgICAgLCByZXN1bHQgPSBuZXcgKHR5cGVvZiB0aGlzID09ICdmdW5jdGlvbicgPyB0aGlzIDogQXJyYXkpKGFMZW4pO1xuICAgIHdoaWxlKGFMZW4gPiBpbmRleClyZXN1bHRbaW5kZXhdID0gYXJndW1lbnRzW2luZGV4KytdO1xuICAgIHJlc3VsdC5sZW5ndGggPSBhTGVuO1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cbn0pOyIsIid1c2Ugc3RyaWN0JztcclxudmFyICRleHBvcnQgPSByZXF1aXJlKCcuL19leHBvcnQnKVxyXG4gICwgJHJlZHVjZSA9IHJlcXVpcmUoJy4vX2FycmF5LXJlZHVjZScpO1xyXG5cclxuJGV4cG9ydCgkZXhwb3J0LlAgKyAkZXhwb3J0LkYgKiAhcmVxdWlyZSgnLi9fc3RyaWN0LW1ldGhvZCcpKFtdLnJlZHVjZVJpZ2h0LCB0cnVlKSwgJ0FycmF5Jywge1xyXG4gIC8vIDIyLjEuMy4xOSAvIDE1LjQuNC4yMiBBcnJheS5wcm90b3R5cGUucmVkdWNlUmlnaHQoY2FsbGJhY2tmbiBbLCBpbml0aWFsVmFsdWVdKVxyXG4gIHJlZHVjZVJpZ2h0OiBmdW5jdGlvbiByZWR1Y2VSaWdodChjYWxsYmFja2ZuIC8qICwgaW5pdGlhbFZhbHVlICovKXtcclxuICAgIHJldHVybiAkcmVkdWNlKHRoaXMsIGNhbGxiYWNrZm4sIGFyZ3VtZW50cy5sZW5ndGgsIGFyZ3VtZW50c1sxXSwgdHJ1ZSk7XHJcbiAgfVxyXG59KTsiLCIndXNlIHN0cmljdCc7XHJcbnZhciAkZXhwb3J0ID0gcmVxdWlyZSgnLi9fZXhwb3J0JylcclxuICAsICRyZWR1Y2UgPSByZXF1aXJlKCcuL19hcnJheS1yZWR1Y2UnKTtcclxuXHJcbiRleHBvcnQoJGV4cG9ydC5QICsgJGV4cG9ydC5GICogIXJlcXVpcmUoJy4vX3N0cmljdC1tZXRob2QnKShbXS5yZWR1Y2UsIHRydWUpLCAnQXJyYXknLCB7XHJcbiAgLy8gMjIuMS4zLjE4IC8gMTUuNC40LjIxIEFycmF5LnByb3RvdHlwZS5yZWR1Y2UoY2FsbGJhY2tmbiBbLCBpbml0aWFsVmFsdWVdKVxyXG4gIHJlZHVjZTogZnVuY3Rpb24gcmVkdWNlKGNhbGxiYWNrZm4gLyogLCBpbml0aWFsVmFsdWUgKi8pe1xyXG4gICAgcmV0dXJuICRyZWR1Y2UodGhpcywgY2FsbGJhY2tmbiwgYXJndW1lbnRzLmxlbmd0aCwgYXJndW1lbnRzWzFdLCBmYWxzZSk7XHJcbiAgfVxyXG59KTsiLCIndXNlIHN0cmljdCc7XHJcbnZhciAkZXhwb3J0ICAgID0gcmVxdWlyZSgnLi9fZXhwb3J0JylcclxuICAsIGh0bWwgICAgICAgPSByZXF1aXJlKCcuL19odG1sJylcclxuICAsIGNvZiAgICAgICAgPSByZXF1aXJlKCcuL19jb2YnKVxyXG4gICwgdG9JbmRleCAgICA9IHJlcXVpcmUoJy4vX3RvLWluZGV4JylcclxuICAsIHRvTGVuZ3RoICAgPSByZXF1aXJlKCcuL190by1sZW5ndGgnKVxyXG4gICwgYXJyYXlTbGljZSA9IFtdLnNsaWNlO1xyXG5cclxuLy8gZmFsbGJhY2sgZm9yIG5vdCBhcnJheS1saWtlIEVTMyBzdHJpbmdzIGFuZCBET00gb2JqZWN0c1xyXG4kZXhwb3J0KCRleHBvcnQuUCArICRleHBvcnQuRiAqIHJlcXVpcmUoJy4vX2ZhaWxzJykoZnVuY3Rpb24oKXtcclxuICBpZihodG1sKWFycmF5U2xpY2UuY2FsbChodG1sKTtcclxufSksICdBcnJheScsIHtcclxuICBzbGljZTogZnVuY3Rpb24gc2xpY2UoYmVnaW4sIGVuZCl7XHJcbiAgICB2YXIgbGVuICAgPSB0b0xlbmd0aCh0aGlzLmxlbmd0aClcclxuICAgICAgLCBrbGFzcyA9IGNvZih0aGlzKTtcclxuICAgIGVuZCA9IGVuZCA9PT0gdW5kZWZpbmVkID8gbGVuIDogZW5kO1xyXG4gICAgaWYoa2xhc3MgPT0gJ0FycmF5JylyZXR1cm4gYXJyYXlTbGljZS5jYWxsKHRoaXMsIGJlZ2luLCBlbmQpO1xyXG4gICAgdmFyIHN0YXJ0ICA9IHRvSW5kZXgoYmVnaW4sIGxlbilcclxuICAgICAgLCB1cFRvICAgPSB0b0luZGV4KGVuZCwgbGVuKVxyXG4gICAgICAsIHNpemUgICA9IHRvTGVuZ3RoKHVwVG8gLSBzdGFydClcclxuICAgICAgLCBjbG9uZWQgPSBBcnJheShzaXplKVxyXG4gICAgICAsIGkgICAgICA9IDA7XHJcbiAgICBmb3IoOyBpIDwgc2l6ZTsgaSsrKWNsb25lZFtpXSA9IGtsYXNzID09ICdTdHJpbmcnXHJcbiAgICAgID8gdGhpcy5jaGFyQXQoc3RhcnQgKyBpKVxyXG4gICAgICA6IHRoaXNbc3RhcnQgKyBpXTtcclxuICAgIHJldHVybiBjbG9uZWQ7XHJcbiAgfVxyXG59KTsiLCIndXNlIHN0cmljdCc7XHJcbnZhciAkZXhwb3J0ID0gcmVxdWlyZSgnLi9fZXhwb3J0JylcclxuICAsICRzb21lICAgPSByZXF1aXJlKCcuL19hcnJheS1tZXRob2RzJykoMyk7XHJcblxyXG4kZXhwb3J0KCRleHBvcnQuUCArICRleHBvcnQuRiAqICFyZXF1aXJlKCcuL19zdHJpY3QtbWV0aG9kJykoW10uc29tZSwgdHJ1ZSksICdBcnJheScsIHtcclxuICAvLyAyMi4xLjMuMjMgLyAxNS40LjQuMTcgQXJyYXkucHJvdG90eXBlLnNvbWUoY2FsbGJhY2tmbiBbLCB0aGlzQXJnXSlcclxuICBzb21lOiBmdW5jdGlvbiBzb21lKGNhbGxiYWNrZm4gLyogLCB0aGlzQXJnICovKXtcclxuICAgIHJldHVybiAkc29tZSh0aGlzLCBjYWxsYmFja2ZuLCBhcmd1bWVudHNbMV0pO1xyXG4gIH1cclxufSk7IiwiJ3VzZSBzdHJpY3QnO1xyXG52YXIgJGV4cG9ydCAgID0gcmVxdWlyZSgnLi9fZXhwb3J0JylcclxuICAsIGFGdW5jdGlvbiA9IHJlcXVpcmUoJy4vX2EtZnVuY3Rpb24nKVxyXG4gICwgdG9PYmplY3QgID0gcmVxdWlyZSgnLi9fdG8tb2JqZWN0JylcclxuICAsIGZhaWxzICAgICA9IHJlcXVpcmUoJy4vX2ZhaWxzJylcclxuICAsICRzb3J0ICAgICA9IFtdLnNvcnRcclxuICAsIHRlc3QgICAgICA9IFsxLCAyLCAzXTtcclxuXHJcbiRleHBvcnQoJGV4cG9ydC5QICsgJGV4cG9ydC5GICogKGZhaWxzKGZ1bmN0aW9uKCl7XHJcbiAgLy8gSUU4LVxyXG4gIHRlc3Quc29ydCh1bmRlZmluZWQpO1xyXG59KSB8fCAhZmFpbHMoZnVuY3Rpb24oKXtcclxuICAvLyBWOCBidWdcclxuICB0ZXN0LnNvcnQobnVsbCk7XHJcbiAgLy8gT2xkIFdlYktpdFxyXG59KSB8fCAhcmVxdWlyZSgnLi9fc3RyaWN0LW1ldGhvZCcpKCRzb3J0KSksICdBcnJheScsIHtcclxuICAvLyAyMi4xLjMuMjUgQXJyYXkucHJvdG90eXBlLnNvcnQoY29tcGFyZWZuKVxyXG4gIHNvcnQ6IGZ1bmN0aW9uIHNvcnQoY29tcGFyZWZuKXtcclxuICAgIHJldHVybiBjb21wYXJlZm4gPT09IHVuZGVmaW5lZFxyXG4gICAgICA/ICRzb3J0LmNhbGwodG9PYmplY3QodGhpcykpXHJcbiAgICAgIDogJHNvcnQuY2FsbCh0b09iamVjdCh0aGlzKSwgYUZ1bmN0aW9uKGNvbXBhcmVmbikpO1xyXG4gIH1cclxufSk7IiwicmVxdWlyZSgnLi9fc2V0LXNwZWNpZXMnKSgnQXJyYXknKTsiLCIvLyAyMC4zLjMuMSAvIDE1LjkuNC40IERhdGUubm93KClcclxudmFyICRleHBvcnQgPSByZXF1aXJlKCcuL19leHBvcnQnKTtcclxuXHJcbiRleHBvcnQoJGV4cG9ydC5TLCAnRGF0ZScsIHtub3c6IGZ1bmN0aW9uKCl7IHJldHVybiBuZXcgRGF0ZSgpLmdldFRpbWUoKTsgfX0pOyIsIid1c2Ugc3RyaWN0JztcclxuLy8gMjAuMy40LjM2IC8gMTUuOS41LjQzIERhdGUucHJvdG90eXBlLnRvSVNPU3RyaW5nKClcclxudmFyICRleHBvcnQgPSByZXF1aXJlKCcuL19leHBvcnQnKVxyXG4gICwgZmFpbHMgICA9IHJlcXVpcmUoJy4vX2ZhaWxzJylcclxuICAsIGdldFRpbWUgPSBEYXRlLnByb3RvdHlwZS5nZXRUaW1lO1xyXG5cclxudmFyIGx6ID0gZnVuY3Rpb24obnVtKXtcclxuICByZXR1cm4gbnVtID4gOSA/IG51bSA6ICcwJyArIG51bTtcclxufTtcclxuXHJcbi8vIFBoYW50b21KUyAvIG9sZCBXZWJLaXQgaGFzIGEgYnJva2VuIGltcGxlbWVudGF0aW9uc1xyXG4kZXhwb3J0KCRleHBvcnQuUCArICRleHBvcnQuRiAqIChmYWlscyhmdW5jdGlvbigpe1xyXG4gIHJldHVybiBuZXcgRGF0ZSgtNWUxMyAtIDEpLnRvSVNPU3RyaW5nKCkgIT0gJzAzODUtMDctMjVUMDc6MDY6MzkuOTk5Wic7XHJcbn0pIHx8ICFmYWlscyhmdW5jdGlvbigpe1xyXG4gIG5ldyBEYXRlKE5hTikudG9JU09TdHJpbmcoKTtcclxufSkpLCAnRGF0ZScsIHtcclxuICB0b0lTT1N0cmluZzogZnVuY3Rpb24gdG9JU09TdHJpbmcoKXtcclxuICAgIGlmKCFpc0Zpbml0ZShnZXRUaW1lLmNhbGwodGhpcykpKXRocm93IFJhbmdlRXJyb3IoJ0ludmFsaWQgdGltZSB2YWx1ZScpO1xyXG4gICAgdmFyIGQgPSB0aGlzXHJcbiAgICAgICwgeSA9IGQuZ2V0VVRDRnVsbFllYXIoKVxyXG4gICAgICAsIG0gPSBkLmdldFVUQ01pbGxpc2Vjb25kcygpXHJcbiAgICAgICwgcyA9IHkgPCAwID8gJy0nIDogeSA+IDk5OTkgPyAnKycgOiAnJztcclxuICAgIHJldHVybiBzICsgKCcwMDAwMCcgKyBNYXRoLmFicyh5KSkuc2xpY2UocyA/IC02IDogLTQpICtcclxuICAgICAgJy0nICsgbHooZC5nZXRVVENNb250aCgpICsgMSkgKyAnLScgKyBseihkLmdldFVUQ0RhdGUoKSkgK1xyXG4gICAgICAnVCcgKyBseihkLmdldFVUQ0hvdXJzKCkpICsgJzonICsgbHooZC5nZXRVVENNaW51dGVzKCkpICtcclxuICAgICAgJzonICsgbHooZC5nZXRVVENTZWNvbmRzKCkpICsgJy4nICsgKG0gPiA5OSA/IG0gOiAnMCcgKyBseihtKSkgKyAnWic7XHJcbiAgfVxyXG59KTsiLCIndXNlIHN0cmljdCc7XG52YXIgJGV4cG9ydCAgICAgPSByZXF1aXJlKCcuL19leHBvcnQnKVxuICAsIHRvT2JqZWN0ICAgID0gcmVxdWlyZSgnLi9fdG8tb2JqZWN0JylcbiAgLCB0b1ByaW1pdGl2ZSA9IHJlcXVpcmUoJy4vX3RvLXByaW1pdGl2ZScpO1xuXG4kZXhwb3J0KCRleHBvcnQuUCArICRleHBvcnQuRiAqIHJlcXVpcmUoJy4vX2ZhaWxzJykoZnVuY3Rpb24oKXtcbiAgcmV0dXJuIG5ldyBEYXRlKE5hTikudG9KU09OKCkgIT09IG51bGwgfHwgRGF0ZS5wcm90b3R5cGUudG9KU09OLmNhbGwoe3RvSVNPU3RyaW5nOiBmdW5jdGlvbigpeyByZXR1cm4gMTsgfX0pICE9PSAxO1xufSksICdEYXRlJywge1xuICB0b0pTT046IGZ1bmN0aW9uIHRvSlNPTihrZXkpe1xuICAgIHZhciBPICA9IHRvT2JqZWN0KHRoaXMpXG4gICAgICAsIHB2ID0gdG9QcmltaXRpdmUoTyk7XG4gICAgcmV0dXJuIHR5cGVvZiBwdiA9PSAnbnVtYmVyJyAmJiAhaXNGaW5pdGUocHYpID8gbnVsbCA6IE8udG9JU09TdHJpbmcoKTtcbiAgfVxufSk7IiwidmFyIFRPX1BSSU1JVElWRSA9IHJlcXVpcmUoJy4vX3drcycpKCd0b1ByaW1pdGl2ZScpXHJcbiAgLCBwcm90byAgICAgICAgPSBEYXRlLnByb3RvdHlwZTtcclxuXHJcbmlmKCEoVE9fUFJJTUlUSVZFIGluIHByb3RvKSlyZXF1aXJlKCcuL19oaWRlJykocHJvdG8sIFRPX1BSSU1JVElWRSwgcmVxdWlyZSgnLi9fZGF0ZS10by1wcmltaXRpdmUnKSk7IiwidmFyIERhdGVQcm90byAgICA9IERhdGUucHJvdG90eXBlXG4gICwgSU5WQUxJRF9EQVRFID0gJ0ludmFsaWQgRGF0ZSdcbiAgLCBUT19TVFJJTkcgICAgPSAndG9TdHJpbmcnXG4gICwgJHRvU3RyaW5nICAgID0gRGF0ZVByb3RvW1RPX1NUUklOR11cbiAgLCBnZXRUaW1lICAgICAgPSBEYXRlUHJvdG8uZ2V0VGltZTtcbmlmKG5ldyBEYXRlKE5hTikgKyAnJyAhPSBJTlZBTElEX0RBVEUpe1xuICByZXF1aXJlKCcuL19yZWRlZmluZScpKERhdGVQcm90bywgVE9fU1RSSU5HLCBmdW5jdGlvbiB0b1N0cmluZygpe1xuICAgIHZhciB2YWx1ZSA9IGdldFRpbWUuY2FsbCh0aGlzKTtcbiAgICByZXR1cm4gdmFsdWUgPT09IHZhbHVlID8gJHRvU3RyaW5nLmNhbGwodGhpcykgOiBJTlZBTElEX0RBVEU7XG4gIH0pO1xufSIsIi8vIDE5LjIuMy4yIC8gMTUuMy40LjUgRnVuY3Rpb24ucHJvdG90eXBlLmJpbmQodGhpc0FyZywgYXJncy4uLilcclxudmFyICRleHBvcnQgPSByZXF1aXJlKCcuL19leHBvcnQnKTtcclxuXHJcbiRleHBvcnQoJGV4cG9ydC5QLCAnRnVuY3Rpb24nLCB7YmluZDogcmVxdWlyZSgnLi9fYmluZCcpfSk7IiwiJ3VzZSBzdHJpY3QnO1xudmFyIGlzT2JqZWN0ICAgICAgID0gcmVxdWlyZSgnLi9faXMtb2JqZWN0JylcbiAgLCBnZXRQcm90b3R5cGVPZiA9IHJlcXVpcmUoJy4vX29iamVjdC1ncG8nKVxuICAsIEhBU19JTlNUQU5DRSAgID0gcmVxdWlyZSgnLi9fd2tzJykoJ2hhc0luc3RhbmNlJylcbiAgLCBGdW5jdGlvblByb3RvICA9IEZ1bmN0aW9uLnByb3RvdHlwZTtcbi8vIDE5LjIuMy42IEZ1bmN0aW9uLnByb3RvdHlwZVtAQGhhc0luc3RhbmNlXShWKVxuaWYoIShIQVNfSU5TVEFOQ0UgaW4gRnVuY3Rpb25Qcm90bykpcmVxdWlyZSgnLi9fb2JqZWN0LWRwJykuZihGdW5jdGlvblByb3RvLCBIQVNfSU5TVEFOQ0UsIHt2YWx1ZTogZnVuY3Rpb24oTyl7XG4gIGlmKHR5cGVvZiB0aGlzICE9ICdmdW5jdGlvbicgfHwgIWlzT2JqZWN0KE8pKXJldHVybiBmYWxzZTtcbiAgaWYoIWlzT2JqZWN0KHRoaXMucHJvdG90eXBlKSlyZXR1cm4gTyBpbnN0YW5jZW9mIHRoaXM7XG4gIC8vIGZvciBlbnZpcm9ubWVudCB3L28gbmF0aXZlIGBAQGhhc0luc3RhbmNlYCBsb2dpYyBlbm91Z2ggYGluc3RhbmNlb2ZgLCBidXQgYWRkIHRoaXM6XG4gIHdoaWxlKE8gPSBnZXRQcm90b3R5cGVPZihPKSlpZih0aGlzLnByb3RvdHlwZSA9PT0gTylyZXR1cm4gdHJ1ZTtcbiAgcmV0dXJuIGZhbHNlO1xufX0pOyIsInZhciBkUCAgICAgICAgID0gcmVxdWlyZSgnLi9fb2JqZWN0LWRwJykuZlxuICAsIGNyZWF0ZURlc2MgPSByZXF1aXJlKCcuL19wcm9wZXJ0eS1kZXNjJylcbiAgLCBoYXMgICAgICAgID0gcmVxdWlyZSgnLi9faGFzJylcbiAgLCBGUHJvdG8gICAgID0gRnVuY3Rpb24ucHJvdG90eXBlXG4gICwgbmFtZVJFICAgICA9IC9eXFxzKmZ1bmN0aW9uIChbXiAoXSopL1xuICAsIE5BTUUgICAgICAgPSAnbmFtZSc7XG4vLyAxOS4yLjQuMiBuYW1lXG5OQU1FIGluIEZQcm90byB8fCByZXF1aXJlKCcuL19kZXNjcmlwdG9ycycpICYmIGRQKEZQcm90bywgTkFNRSwge1xuICBjb25maWd1cmFibGU6IHRydWUsXG4gIGdldDogZnVuY3Rpb24oKXtcbiAgICB2YXIgbWF0Y2ggPSAoJycgKyB0aGlzKS5tYXRjaChuYW1lUkUpXG4gICAgICAsIG5hbWUgID0gbWF0Y2ggPyBtYXRjaFsxXSA6ICcnO1xuICAgIGhhcyh0aGlzLCBOQU1FKSB8fCBkUCh0aGlzLCBOQU1FLCBjcmVhdGVEZXNjKDUsIG5hbWUpKTtcbiAgICByZXR1cm4gbmFtZTtcbiAgfVxufSk7IiwiJ3VzZSBzdHJpY3QnO1xudmFyIHN0cm9uZyA9IHJlcXVpcmUoJy4vX2NvbGxlY3Rpb24tc3Ryb25nJyk7XG5cbi8vIDIzLjEgTWFwIE9iamVjdHNcbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9fY29sbGVjdGlvbicpKCdNYXAnLCBmdW5jdGlvbihnZXQpe1xuICByZXR1cm4gZnVuY3Rpb24gTWFwKCl7IHJldHVybiBnZXQodGhpcywgYXJndW1lbnRzLmxlbmd0aCA+IDAgPyBhcmd1bWVudHNbMF0gOiB1bmRlZmluZWQpOyB9O1xufSwge1xuICAvLyAyMy4xLjMuNiBNYXAucHJvdG90eXBlLmdldChrZXkpXG4gIGdldDogZnVuY3Rpb24gZ2V0KGtleSl7XG4gICAgdmFyIGVudHJ5ID0gc3Ryb25nLmdldEVudHJ5KHRoaXMsIGtleSk7XG4gICAgcmV0dXJuIGVudHJ5ICYmIGVudHJ5LnY7XG4gIH0sXG4gIC8vIDIzLjEuMy45IE1hcC5wcm90b3R5cGUuc2V0KGtleSwgdmFsdWUpXG4gIHNldDogZnVuY3Rpb24gc2V0KGtleSwgdmFsdWUpe1xuICAgIHJldHVybiBzdHJvbmcuZGVmKHRoaXMsIGtleSA9PT0gMCA/IDAgOiBrZXksIHZhbHVlKTtcbiAgfVxufSwgc3Ryb25nLCB0cnVlKTsiLCIvLyAyMC4yLjIuMyBNYXRoLmFjb3NoKHgpXG52YXIgJGV4cG9ydCA9IHJlcXVpcmUoJy4vX2V4cG9ydCcpXG4gICwgbG9nMXAgICA9IHJlcXVpcmUoJy4vX21hdGgtbG9nMXAnKVxuICAsIHNxcnQgICAgPSBNYXRoLnNxcnRcbiAgLCAkYWNvc2ggID0gTWF0aC5hY29zaDtcblxuLy8gVjggYnVnIGh0dHBzOi8vY29kZS5nb29nbGUuY29tL3AvdjgvaXNzdWVzL2RldGFpbD9pZD0zNTA5XG4kZXhwb3J0KCRleHBvcnQuUyArICRleHBvcnQuRiAqICEoJGFjb3NoICYmIE1hdGguZmxvb3IoJGFjb3NoKE51bWJlci5NQVhfVkFMVUUpKSA9PSA3MTApLCAnTWF0aCcsIHtcbiAgYWNvc2g6IGZ1bmN0aW9uIGFjb3NoKHgpe1xuICAgIHJldHVybiAoeCA9ICt4KSA8IDEgPyBOYU4gOiB4ID4gOTQ5MDYyNjUuNjI0MjUxNTZcbiAgICAgID8gTWF0aC5sb2coeCkgKyBNYXRoLkxOMlxuICAgICAgOiBsb2cxcCh4IC0gMSArIHNxcnQoeCAtIDEpICogc3FydCh4ICsgMSkpO1xuICB9XG59KTsiLCIvLyAyMC4yLjIuNSBNYXRoLmFzaW5oKHgpXG52YXIgJGV4cG9ydCA9IHJlcXVpcmUoJy4vX2V4cG9ydCcpO1xuXG5mdW5jdGlvbiBhc2luaCh4KXtcbiAgcmV0dXJuICFpc0Zpbml0ZSh4ID0gK3gpIHx8IHggPT0gMCA/IHggOiB4IDwgMCA/IC1hc2luaCgteCkgOiBNYXRoLmxvZyh4ICsgTWF0aC5zcXJ0KHggKiB4ICsgMSkpO1xufVxuXG4kZXhwb3J0KCRleHBvcnQuUywgJ01hdGgnLCB7YXNpbmg6IGFzaW5ofSk7IiwiLy8gMjAuMi4yLjcgTWF0aC5hdGFuaCh4KVxudmFyICRleHBvcnQgPSByZXF1aXJlKCcuL19leHBvcnQnKTtcblxuJGV4cG9ydCgkZXhwb3J0LlMsICdNYXRoJywge1xuICBhdGFuaDogZnVuY3Rpb24gYXRhbmgoeCl7XG4gICAgcmV0dXJuICh4ID0gK3gpID09IDAgPyB4IDogTWF0aC5sb2coKDEgKyB4KSAvICgxIC0geCkpIC8gMjtcbiAgfVxufSk7IiwiLy8gMjAuMi4yLjkgTWF0aC5jYnJ0KHgpXG52YXIgJGV4cG9ydCA9IHJlcXVpcmUoJy4vX2V4cG9ydCcpXG4gICwgc2lnbiAgICA9IHJlcXVpcmUoJy4vX21hdGgtc2lnbicpO1xuXG4kZXhwb3J0KCRleHBvcnQuUywgJ01hdGgnLCB7XG4gIGNicnQ6IGZ1bmN0aW9uIGNicnQoeCl7XG4gICAgcmV0dXJuIHNpZ24oeCA9ICt4KSAqIE1hdGgucG93KE1hdGguYWJzKHgpLCAxIC8gMyk7XG4gIH1cbn0pOyIsIi8vIDIwLjIuMi4xMSBNYXRoLmNsejMyKHgpXG52YXIgJGV4cG9ydCA9IHJlcXVpcmUoJy4vX2V4cG9ydCcpO1xuXG4kZXhwb3J0KCRleHBvcnQuUywgJ01hdGgnLCB7XG4gIGNsejMyOiBmdW5jdGlvbiBjbHozMih4KXtcbiAgICByZXR1cm4gKHggPj4+PSAwKSA/IDMxIC0gTWF0aC5mbG9vcihNYXRoLmxvZyh4ICsgMC41KSAqIE1hdGguTE9HMkUpIDogMzI7XG4gIH1cbn0pOyIsIi8vIDIwLjIuMi4xMiBNYXRoLmNvc2goeClcbnZhciAkZXhwb3J0ID0gcmVxdWlyZSgnLi9fZXhwb3J0JylcbiAgLCBleHAgICAgID0gTWF0aC5leHA7XG5cbiRleHBvcnQoJGV4cG9ydC5TLCAnTWF0aCcsIHtcbiAgY29zaDogZnVuY3Rpb24gY29zaCh4KXtcbiAgICByZXR1cm4gKGV4cCh4ID0gK3gpICsgZXhwKC14KSkgLyAyO1xuICB9XG59KTsiLCIvLyAyMC4yLjIuMTQgTWF0aC5leHBtMSh4KVxudmFyICRleHBvcnQgPSByZXF1aXJlKCcuL19leHBvcnQnKTtcblxuJGV4cG9ydCgkZXhwb3J0LlMsICdNYXRoJywge2V4cG0xOiByZXF1aXJlKCcuL19tYXRoLWV4cG0xJyl9KTsiLCIvLyAyMC4yLjIuMTYgTWF0aC5mcm91bmQoeClcbnZhciAkZXhwb3J0ICAgPSByZXF1aXJlKCcuL19leHBvcnQnKVxuICAsIHNpZ24gICAgICA9IHJlcXVpcmUoJy4vX21hdGgtc2lnbicpXG4gICwgcG93ICAgICAgID0gTWF0aC5wb3dcbiAgLCBFUFNJTE9OICAgPSBwb3coMiwgLTUyKVxuICAsIEVQU0lMT04zMiA9IHBvdygyLCAtMjMpXG4gICwgTUFYMzIgICAgID0gcG93KDIsIDEyNykgKiAoMiAtIEVQU0lMT04zMilcbiAgLCBNSU4zMiAgICAgPSBwb3coMiwgLTEyNik7XG5cbnZhciByb3VuZFRpZXNUb0V2ZW4gPSBmdW5jdGlvbihuKXtcbiAgcmV0dXJuIG4gKyAxIC8gRVBTSUxPTiAtIDEgLyBFUFNJTE9OO1xufTtcblxuXG4kZXhwb3J0KCRleHBvcnQuUywgJ01hdGgnLCB7XG4gIGZyb3VuZDogZnVuY3Rpb24gZnJvdW5kKHgpe1xuICAgIHZhciAkYWJzICA9IE1hdGguYWJzKHgpXG4gICAgICAsICRzaWduID0gc2lnbih4KVxuICAgICAgLCBhLCByZXN1bHQ7XG4gICAgaWYoJGFicyA8IE1JTjMyKXJldHVybiAkc2lnbiAqIHJvdW5kVGllc1RvRXZlbigkYWJzIC8gTUlOMzIgLyBFUFNJTE9OMzIpICogTUlOMzIgKiBFUFNJTE9OMzI7XG4gICAgYSA9ICgxICsgRVBTSUxPTjMyIC8gRVBTSUxPTikgKiAkYWJzO1xuICAgIHJlc3VsdCA9IGEgLSAoYSAtICRhYnMpO1xuICAgIGlmKHJlc3VsdCA+IE1BWDMyIHx8IHJlc3VsdCAhPSByZXN1bHQpcmV0dXJuICRzaWduICogSW5maW5pdHk7XG4gICAgcmV0dXJuICRzaWduICogcmVzdWx0O1xuICB9XG59KTsiLCIvLyAyMC4yLjIuMTcgTWF0aC5oeXBvdChbdmFsdWUxWywgdmFsdWUyWywg4oCmIF1dXSlcbnZhciAkZXhwb3J0ID0gcmVxdWlyZSgnLi9fZXhwb3J0JylcbiAgLCBhYnMgICAgID0gTWF0aC5hYnM7XG5cbiRleHBvcnQoJGV4cG9ydC5TLCAnTWF0aCcsIHtcbiAgaHlwb3Q6IGZ1bmN0aW9uIGh5cG90KHZhbHVlMSwgdmFsdWUyKXsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bnVzZWQtdmFyc1xuICAgIHZhciBzdW0gID0gMFxuICAgICAgLCBpICAgID0gMFxuICAgICAgLCBhTGVuID0gYXJndW1lbnRzLmxlbmd0aFxuICAgICAgLCBsYXJnID0gMFxuICAgICAgLCBhcmcsIGRpdjtcbiAgICB3aGlsZShpIDwgYUxlbil7XG4gICAgICBhcmcgPSBhYnMoYXJndW1lbnRzW2krK10pO1xuICAgICAgaWYobGFyZyA8IGFyZyl7XG4gICAgICAgIGRpdiAgPSBsYXJnIC8gYXJnO1xuICAgICAgICBzdW0gID0gc3VtICogZGl2ICogZGl2ICsgMTtcbiAgICAgICAgbGFyZyA9IGFyZztcbiAgICAgIH0gZWxzZSBpZihhcmcgPiAwKXtcbiAgICAgICAgZGl2ICA9IGFyZyAvIGxhcmc7XG4gICAgICAgIHN1bSArPSBkaXYgKiBkaXY7XG4gICAgICB9IGVsc2Ugc3VtICs9IGFyZztcbiAgICB9XG4gICAgcmV0dXJuIGxhcmcgPT09IEluZmluaXR5ID8gSW5maW5pdHkgOiBsYXJnICogTWF0aC5zcXJ0KHN1bSk7XG4gIH1cbn0pOyIsIi8vIDIwLjIuMi4xOCBNYXRoLmltdWwoeCwgeSlcbnZhciAkZXhwb3J0ID0gcmVxdWlyZSgnLi9fZXhwb3J0JylcbiAgLCAkaW11bCAgID0gTWF0aC5pbXVsO1xuXG4vLyBzb21lIFdlYktpdCB2ZXJzaW9ucyBmYWlscyB3aXRoIGJpZyBudW1iZXJzLCBzb21lIGhhcyB3cm9uZyBhcml0eVxuJGV4cG9ydCgkZXhwb3J0LlMgKyAkZXhwb3J0LkYgKiByZXF1aXJlKCcuL19mYWlscycpKGZ1bmN0aW9uKCl7XG4gIHJldHVybiAkaW11bCgweGZmZmZmZmZmLCA1KSAhPSAtNSB8fCAkaW11bC5sZW5ndGggIT0gMjtcbn0pLCAnTWF0aCcsIHtcbiAgaW11bDogZnVuY3Rpb24gaW11bCh4LCB5KXtcbiAgICB2YXIgVUlOVDE2ID0gMHhmZmZmXG4gICAgICAsIHhuID0gK3hcbiAgICAgICwgeW4gPSAreVxuICAgICAgLCB4bCA9IFVJTlQxNiAmIHhuXG4gICAgICAsIHlsID0gVUlOVDE2ICYgeW47XG4gICAgcmV0dXJuIDAgfCB4bCAqIHlsICsgKChVSU5UMTYgJiB4biA+Pj4gMTYpICogeWwgKyB4bCAqIChVSU5UMTYgJiB5biA+Pj4gMTYpIDw8IDE2ID4+PiAwKTtcbiAgfVxufSk7IiwiLy8gMjAuMi4yLjIxIE1hdGgubG9nMTAoeClcbnZhciAkZXhwb3J0ID0gcmVxdWlyZSgnLi9fZXhwb3J0Jyk7XG5cbiRleHBvcnQoJGV4cG9ydC5TLCAnTWF0aCcsIHtcbiAgbG9nMTA6IGZ1bmN0aW9uIGxvZzEwKHgpe1xuICAgIHJldHVybiBNYXRoLmxvZyh4KSAvIE1hdGguTE4xMDtcbiAgfVxufSk7IiwiLy8gMjAuMi4yLjIwIE1hdGgubG9nMXAoeClcbnZhciAkZXhwb3J0ID0gcmVxdWlyZSgnLi9fZXhwb3J0Jyk7XG5cbiRleHBvcnQoJGV4cG9ydC5TLCAnTWF0aCcsIHtsb2cxcDogcmVxdWlyZSgnLi9fbWF0aC1sb2cxcCcpfSk7IiwiLy8gMjAuMi4yLjIyIE1hdGgubG9nMih4KVxudmFyICRleHBvcnQgPSByZXF1aXJlKCcuL19leHBvcnQnKTtcblxuJGV4cG9ydCgkZXhwb3J0LlMsICdNYXRoJywge1xuICBsb2cyOiBmdW5jdGlvbiBsb2cyKHgpe1xuICAgIHJldHVybiBNYXRoLmxvZyh4KSAvIE1hdGguTE4yO1xuICB9XG59KTsiLCIvLyAyMC4yLjIuMjggTWF0aC5zaWduKHgpXG52YXIgJGV4cG9ydCA9IHJlcXVpcmUoJy4vX2V4cG9ydCcpO1xuXG4kZXhwb3J0KCRleHBvcnQuUywgJ01hdGgnLCB7c2lnbjogcmVxdWlyZSgnLi9fbWF0aC1zaWduJyl9KTsiLCIvLyAyMC4yLjIuMzAgTWF0aC5zaW5oKHgpXG52YXIgJGV4cG9ydCA9IHJlcXVpcmUoJy4vX2V4cG9ydCcpXG4gICwgZXhwbTEgICA9IHJlcXVpcmUoJy4vX21hdGgtZXhwbTEnKVxuICAsIGV4cCAgICAgPSBNYXRoLmV4cDtcblxuLy8gVjggbmVhciBDaHJvbWl1bSAzOCBoYXMgYSBwcm9ibGVtIHdpdGggdmVyeSBzbWFsbCBudW1iZXJzXG4kZXhwb3J0KCRleHBvcnQuUyArICRleHBvcnQuRiAqIHJlcXVpcmUoJy4vX2ZhaWxzJykoZnVuY3Rpb24oKXtcbiAgcmV0dXJuICFNYXRoLnNpbmgoLTJlLTE3KSAhPSAtMmUtMTc7XG59KSwgJ01hdGgnLCB7XG4gIHNpbmg6IGZ1bmN0aW9uIHNpbmgoeCl7XG4gICAgcmV0dXJuIE1hdGguYWJzKHggPSAreCkgPCAxXG4gICAgICA/IChleHBtMSh4KSAtIGV4cG0xKC14KSkgLyAyXG4gICAgICA6IChleHAoeCAtIDEpIC0gZXhwKC14IC0gMSkpICogKE1hdGguRSAvIDIpO1xuICB9XG59KTsiLCIvLyAyMC4yLjIuMzMgTWF0aC50YW5oKHgpXG52YXIgJGV4cG9ydCA9IHJlcXVpcmUoJy4vX2V4cG9ydCcpXG4gICwgZXhwbTEgICA9IHJlcXVpcmUoJy4vX21hdGgtZXhwbTEnKVxuICAsIGV4cCAgICAgPSBNYXRoLmV4cDtcblxuJGV4cG9ydCgkZXhwb3J0LlMsICdNYXRoJywge1xuICB0YW5oOiBmdW5jdGlvbiB0YW5oKHgpe1xuICAgIHZhciBhID0gZXhwbTEoeCA9ICt4KVxuICAgICAgLCBiID0gZXhwbTEoLXgpO1xuICAgIHJldHVybiBhID09IEluZmluaXR5ID8gMSA6IGIgPT0gSW5maW5pdHkgPyAtMSA6IChhIC0gYikgLyAoZXhwKHgpICsgZXhwKC14KSk7XG4gIH1cbn0pOyIsIi8vIDIwLjIuMi4zNCBNYXRoLnRydW5jKHgpXG52YXIgJGV4cG9ydCA9IHJlcXVpcmUoJy4vX2V4cG9ydCcpO1xuXG4kZXhwb3J0KCRleHBvcnQuUywgJ01hdGgnLCB7XG4gIHRydW5jOiBmdW5jdGlvbiB0cnVuYyhpdCl7XG4gICAgcmV0dXJuIChpdCA+IDAgPyBNYXRoLmZsb29yIDogTWF0aC5jZWlsKShpdCk7XG4gIH1cbn0pOyIsIid1c2Ugc3RyaWN0JztcbnZhciBnbG9iYWwgICAgICAgICAgICA9IHJlcXVpcmUoJy4vX2dsb2JhbCcpXG4gICwgaGFzICAgICAgICAgICAgICAgPSByZXF1aXJlKCcuL19oYXMnKVxuICAsIGNvZiAgICAgICAgICAgICAgID0gcmVxdWlyZSgnLi9fY29mJylcbiAgLCBpbmhlcml0SWZSZXF1aXJlZCA9IHJlcXVpcmUoJy4vX2luaGVyaXQtaWYtcmVxdWlyZWQnKVxuICAsIHRvUHJpbWl0aXZlICAgICAgID0gcmVxdWlyZSgnLi9fdG8tcHJpbWl0aXZlJylcbiAgLCBmYWlscyAgICAgICAgICAgICA9IHJlcXVpcmUoJy4vX2ZhaWxzJylcbiAgLCBnT1BOICAgICAgICAgICAgICA9IHJlcXVpcmUoJy4vX29iamVjdC1nb3BuJykuZlxuICAsIGdPUEQgICAgICAgICAgICAgID0gcmVxdWlyZSgnLi9fb2JqZWN0LWdvcGQnKS5mXG4gICwgZFAgICAgICAgICAgICAgICAgPSByZXF1aXJlKCcuL19vYmplY3QtZHAnKS5mXG4gICwgJHRyaW0gICAgICAgICAgICAgPSByZXF1aXJlKCcuL19zdHJpbmctdHJpbScpLnRyaW1cbiAgLCBOVU1CRVIgICAgICAgICAgICA9ICdOdW1iZXInXG4gICwgJE51bWJlciAgICAgICAgICAgPSBnbG9iYWxbTlVNQkVSXVxuICAsIEJhc2UgICAgICAgICAgICAgID0gJE51bWJlclxuICAsIHByb3RvICAgICAgICAgICAgID0gJE51bWJlci5wcm90b3R5cGVcbiAgLy8gT3BlcmEgfjEyIGhhcyBicm9rZW4gT2JqZWN0I3RvU3RyaW5nXG4gICwgQlJPS0VOX0NPRiAgICAgICAgPSBjb2YocmVxdWlyZSgnLi9fb2JqZWN0LWNyZWF0ZScpKHByb3RvKSkgPT0gTlVNQkVSXG4gICwgVFJJTSAgICAgICAgICAgICAgPSAndHJpbScgaW4gU3RyaW5nLnByb3RvdHlwZTtcblxuLy8gNy4xLjMgVG9OdW1iZXIoYXJndW1lbnQpXG52YXIgdG9OdW1iZXIgPSBmdW5jdGlvbihhcmd1bWVudCl7XG4gIHZhciBpdCA9IHRvUHJpbWl0aXZlKGFyZ3VtZW50LCBmYWxzZSk7XG4gIGlmKHR5cGVvZiBpdCA9PSAnc3RyaW5nJyAmJiBpdC5sZW5ndGggPiAyKXtcbiAgICBpdCA9IFRSSU0gPyBpdC50cmltKCkgOiAkdHJpbShpdCwgMyk7XG4gICAgdmFyIGZpcnN0ID0gaXQuY2hhckNvZGVBdCgwKVxuICAgICAgLCB0aGlyZCwgcmFkaXgsIG1heENvZGU7XG4gICAgaWYoZmlyc3QgPT09IDQzIHx8IGZpcnN0ID09PSA0NSl7XG4gICAgICB0aGlyZCA9IGl0LmNoYXJDb2RlQXQoMik7XG4gICAgICBpZih0aGlyZCA9PT0gODggfHwgdGhpcmQgPT09IDEyMClyZXR1cm4gTmFOOyAvLyBOdW1iZXIoJysweDEnKSBzaG91bGQgYmUgTmFOLCBvbGQgVjggZml4XG4gICAgfSBlbHNlIGlmKGZpcnN0ID09PSA0OCl7XG4gICAgICBzd2l0Y2goaXQuY2hhckNvZGVBdCgxKSl7XG4gICAgICAgIGNhc2UgNjYgOiBjYXNlIDk4ICA6IHJhZGl4ID0gMjsgbWF4Q29kZSA9IDQ5OyBicmVhazsgLy8gZmFzdCBlcXVhbCAvXjBiWzAxXSskL2lcbiAgICAgICAgY2FzZSA3OSA6IGNhc2UgMTExIDogcmFkaXggPSA4OyBtYXhDb2RlID0gNTU7IGJyZWFrOyAvLyBmYXN0IGVxdWFsIC9eMG9bMC03XSskL2lcbiAgICAgICAgZGVmYXVsdCA6IHJldHVybiAraXQ7XG4gICAgICB9XG4gICAgICBmb3IodmFyIGRpZ2l0cyA9IGl0LnNsaWNlKDIpLCBpID0gMCwgbCA9IGRpZ2l0cy5sZW5ndGgsIGNvZGU7IGkgPCBsOyBpKyspe1xuICAgICAgICBjb2RlID0gZGlnaXRzLmNoYXJDb2RlQXQoaSk7XG4gICAgICAgIC8vIHBhcnNlSW50IHBhcnNlcyBhIHN0cmluZyB0byBhIGZpcnN0IHVuYXZhaWxhYmxlIHN5bWJvbFxuICAgICAgICAvLyBidXQgVG9OdW1iZXIgc2hvdWxkIHJldHVybiBOYU4gaWYgYSBzdHJpbmcgY29udGFpbnMgdW5hdmFpbGFibGUgc3ltYm9sc1xuICAgICAgICBpZihjb2RlIDwgNDggfHwgY29kZSA+IG1heENvZGUpcmV0dXJuIE5hTjtcbiAgICAgIH0gcmV0dXJuIHBhcnNlSW50KGRpZ2l0cywgcmFkaXgpO1xuICAgIH1cbiAgfSByZXR1cm4gK2l0O1xufTtcblxuaWYoISROdW1iZXIoJyAwbzEnKSB8fCAhJE51bWJlcignMGIxJykgfHwgJE51bWJlcignKzB4MScpKXtcbiAgJE51bWJlciA9IGZ1bmN0aW9uIE51bWJlcih2YWx1ZSl7XG4gICAgdmFyIGl0ID0gYXJndW1lbnRzLmxlbmd0aCA8IDEgPyAwIDogdmFsdWVcbiAgICAgICwgdGhhdCA9IHRoaXM7XG4gICAgcmV0dXJuIHRoYXQgaW5zdGFuY2VvZiAkTnVtYmVyXG4gICAgICAvLyBjaGVjayBvbiAxLi5jb25zdHJ1Y3Rvcihmb28pIGNhc2VcbiAgICAgICYmIChCUk9LRU5fQ09GID8gZmFpbHMoZnVuY3Rpb24oKXsgcHJvdG8udmFsdWVPZi5jYWxsKHRoYXQpOyB9KSA6IGNvZih0aGF0KSAhPSBOVU1CRVIpXG4gICAgICAgID8gaW5oZXJpdElmUmVxdWlyZWQobmV3IEJhc2UodG9OdW1iZXIoaXQpKSwgdGhhdCwgJE51bWJlcikgOiB0b051bWJlcihpdCk7XG4gIH07XG4gIGZvcih2YXIga2V5cyA9IHJlcXVpcmUoJy4vX2Rlc2NyaXB0b3JzJykgPyBnT1BOKEJhc2UpIDogKFxuICAgIC8vIEVTMzpcbiAgICAnTUFYX1ZBTFVFLE1JTl9WQUxVRSxOYU4sTkVHQVRJVkVfSU5GSU5JVFksUE9TSVRJVkVfSU5GSU5JVFksJyArXG4gICAgLy8gRVM2IChpbiBjYXNlLCBpZiBtb2R1bGVzIHdpdGggRVM2IE51bWJlciBzdGF0aWNzIHJlcXVpcmVkIGJlZm9yZSk6XG4gICAgJ0VQU0lMT04saXNGaW5pdGUsaXNJbnRlZ2VyLGlzTmFOLGlzU2FmZUludGVnZXIsTUFYX1NBRkVfSU5URUdFUiwnICtcbiAgICAnTUlOX1NBRkVfSU5URUdFUixwYXJzZUZsb2F0LHBhcnNlSW50LGlzSW50ZWdlcidcbiAgKS5zcGxpdCgnLCcpLCBqID0gMCwga2V5OyBrZXlzLmxlbmd0aCA+IGo7IGorKyl7XG4gICAgaWYoaGFzKEJhc2UsIGtleSA9IGtleXNbal0pICYmICFoYXMoJE51bWJlciwga2V5KSl7XG4gICAgICBkUCgkTnVtYmVyLCBrZXksIGdPUEQoQmFzZSwga2V5KSk7XG4gICAgfVxuICB9XG4gICROdW1iZXIucHJvdG90eXBlID0gcHJvdG87XG4gIHByb3RvLmNvbnN0cnVjdG9yID0gJE51bWJlcjtcbiAgcmVxdWlyZSgnLi9fcmVkZWZpbmUnKShnbG9iYWwsIE5VTUJFUiwgJE51bWJlcik7XG59IiwiLy8gMjAuMS4yLjEgTnVtYmVyLkVQU0lMT05cbnZhciAkZXhwb3J0ID0gcmVxdWlyZSgnLi9fZXhwb3J0Jyk7XG5cbiRleHBvcnQoJGV4cG9ydC5TLCAnTnVtYmVyJywge0VQU0lMT046IE1hdGgucG93KDIsIC01Mil9KTsiLCIvLyAyMC4xLjIuMiBOdW1iZXIuaXNGaW5pdGUobnVtYmVyKVxudmFyICRleHBvcnQgICA9IHJlcXVpcmUoJy4vX2V4cG9ydCcpXG4gICwgX2lzRmluaXRlID0gcmVxdWlyZSgnLi9fZ2xvYmFsJykuaXNGaW5pdGU7XG5cbiRleHBvcnQoJGV4cG9ydC5TLCAnTnVtYmVyJywge1xuICBpc0Zpbml0ZTogZnVuY3Rpb24gaXNGaW5pdGUoaXQpe1xuICAgIHJldHVybiB0eXBlb2YgaXQgPT0gJ251bWJlcicgJiYgX2lzRmluaXRlKGl0KTtcbiAgfVxufSk7IiwiLy8gMjAuMS4yLjMgTnVtYmVyLmlzSW50ZWdlcihudW1iZXIpXG52YXIgJGV4cG9ydCA9IHJlcXVpcmUoJy4vX2V4cG9ydCcpO1xuXG4kZXhwb3J0KCRleHBvcnQuUywgJ051bWJlcicsIHtpc0ludGVnZXI6IHJlcXVpcmUoJy4vX2lzLWludGVnZXInKX0pOyIsIi8vIDIwLjEuMi40IE51bWJlci5pc05hTihudW1iZXIpXG52YXIgJGV4cG9ydCA9IHJlcXVpcmUoJy4vX2V4cG9ydCcpO1xuXG4kZXhwb3J0KCRleHBvcnQuUywgJ051bWJlcicsIHtcbiAgaXNOYU46IGZ1bmN0aW9uIGlzTmFOKG51bWJlcil7XG4gICAgcmV0dXJuIG51bWJlciAhPSBudW1iZXI7XG4gIH1cbn0pOyIsIi8vIDIwLjEuMi41IE51bWJlci5pc1NhZmVJbnRlZ2VyKG51bWJlcilcbnZhciAkZXhwb3J0ICAgPSByZXF1aXJlKCcuL19leHBvcnQnKVxuICAsIGlzSW50ZWdlciA9IHJlcXVpcmUoJy4vX2lzLWludGVnZXInKVxuICAsIGFicyAgICAgICA9IE1hdGguYWJzO1xuXG4kZXhwb3J0KCRleHBvcnQuUywgJ051bWJlcicsIHtcbiAgaXNTYWZlSW50ZWdlcjogZnVuY3Rpb24gaXNTYWZlSW50ZWdlcihudW1iZXIpe1xuICAgIHJldHVybiBpc0ludGVnZXIobnVtYmVyKSAmJiBhYnMobnVtYmVyKSA8PSAweDFmZmZmZmZmZmZmZmZmO1xuICB9XG59KTsiLCIvLyAyMC4xLjIuNiBOdW1iZXIuTUFYX1NBRkVfSU5URUdFUlxudmFyICRleHBvcnQgPSByZXF1aXJlKCcuL19leHBvcnQnKTtcblxuJGV4cG9ydCgkZXhwb3J0LlMsICdOdW1iZXInLCB7TUFYX1NBRkVfSU5URUdFUjogMHgxZmZmZmZmZmZmZmZmZn0pOyIsIi8vIDIwLjEuMi4xMCBOdW1iZXIuTUlOX1NBRkVfSU5URUdFUlxudmFyICRleHBvcnQgPSByZXF1aXJlKCcuL19leHBvcnQnKTtcblxuJGV4cG9ydCgkZXhwb3J0LlMsICdOdW1iZXInLCB7TUlOX1NBRkVfSU5URUdFUjogLTB4MWZmZmZmZmZmZmZmZmZ9KTsiLCJ2YXIgJGV4cG9ydCAgICAgPSByZXF1aXJlKCcuL19leHBvcnQnKVxuICAsICRwYXJzZUZsb2F0ID0gcmVxdWlyZSgnLi9fcGFyc2UtZmxvYXQnKTtcbi8vIDIwLjEuMi4xMiBOdW1iZXIucGFyc2VGbG9hdChzdHJpbmcpXG4kZXhwb3J0KCRleHBvcnQuUyArICRleHBvcnQuRiAqIChOdW1iZXIucGFyc2VGbG9hdCAhPSAkcGFyc2VGbG9hdCksICdOdW1iZXInLCB7cGFyc2VGbG9hdDogJHBhcnNlRmxvYXR9KTsiLCJ2YXIgJGV4cG9ydCAgID0gcmVxdWlyZSgnLi9fZXhwb3J0JylcbiAgLCAkcGFyc2VJbnQgPSByZXF1aXJlKCcuL19wYXJzZS1pbnQnKTtcbi8vIDIwLjEuMi4xMyBOdW1iZXIucGFyc2VJbnQoc3RyaW5nLCByYWRpeClcbiRleHBvcnQoJGV4cG9ydC5TICsgJGV4cG9ydC5GICogKE51bWJlci5wYXJzZUludCAhPSAkcGFyc2VJbnQpLCAnTnVtYmVyJywge3BhcnNlSW50OiAkcGFyc2VJbnR9KTsiLCIndXNlIHN0cmljdCc7XHJcbnZhciAkZXhwb3J0ICAgICAgPSByZXF1aXJlKCcuL19leHBvcnQnKVxyXG4gICwgYW5JbnN0YW5jZSAgID0gcmVxdWlyZSgnLi9fYW4taW5zdGFuY2UnKVxyXG4gICwgdG9JbnRlZ2VyICAgID0gcmVxdWlyZSgnLi9fdG8taW50ZWdlcicpXHJcbiAgLCBhTnVtYmVyVmFsdWUgPSByZXF1aXJlKCcuL19hLW51bWJlci12YWx1ZScpXHJcbiAgLCByZXBlYXQgICAgICAgPSByZXF1aXJlKCcuL19zdHJpbmctcmVwZWF0JylcclxuICAsICR0b0ZpeGVkICAgICA9IDEuLnRvRml4ZWRcclxuICAsIGZsb29yICAgICAgICA9IE1hdGguZmxvb3JcclxuICAsIGRhdGEgICAgICAgICA9IFswLCAwLCAwLCAwLCAwLCAwXVxyXG4gICwgRVJST1IgICAgICAgID0gJ051bWJlci50b0ZpeGVkOiBpbmNvcnJlY3QgaW52b2NhdGlvbiEnXHJcbiAgLCBaRVJPICAgICAgICAgPSAnMCc7XHJcblxyXG52YXIgbXVsdGlwbHkgPSBmdW5jdGlvbihuLCBjKXtcclxuICB2YXIgaSAgPSAtMVxyXG4gICAgLCBjMiA9IGM7XHJcbiAgd2hpbGUoKytpIDwgNil7XHJcbiAgICBjMiArPSBuICogZGF0YVtpXTtcclxuICAgIGRhdGFbaV0gPSBjMiAlIDFlNztcclxuICAgIGMyID0gZmxvb3IoYzIgLyAxZTcpO1xyXG4gIH1cclxufTtcclxudmFyIGRpdmlkZSA9IGZ1bmN0aW9uKG4pe1xyXG4gIHZhciBpID0gNlxyXG4gICAgLCBjID0gMDtcclxuICB3aGlsZSgtLWkgPj0gMCl7XHJcbiAgICBjICs9IGRhdGFbaV07XHJcbiAgICBkYXRhW2ldID0gZmxvb3IoYyAvIG4pO1xyXG4gICAgYyA9IChjICUgbikgKiAxZTc7XHJcbiAgfVxyXG59O1xyXG52YXIgbnVtVG9TdHJpbmcgPSBmdW5jdGlvbigpe1xyXG4gIHZhciBpID0gNlxyXG4gICAgLCBzID0gJyc7XHJcbiAgd2hpbGUoLS1pID49IDApe1xyXG4gICAgaWYocyAhPT0gJycgfHwgaSA9PT0gMCB8fCBkYXRhW2ldICE9PSAwKXtcclxuICAgICAgdmFyIHQgPSBTdHJpbmcoZGF0YVtpXSk7XHJcbiAgICAgIHMgPSBzID09PSAnJyA/IHQgOiBzICsgcmVwZWF0LmNhbGwoWkVSTywgNyAtIHQubGVuZ3RoKSArIHQ7XHJcbiAgICB9XHJcbiAgfSByZXR1cm4gcztcclxufTtcclxudmFyIHBvdyA9IGZ1bmN0aW9uKHgsIG4sIGFjYyl7XHJcbiAgcmV0dXJuIG4gPT09IDAgPyBhY2MgOiBuICUgMiA9PT0gMSA/IHBvdyh4LCBuIC0gMSwgYWNjICogeCkgOiBwb3coeCAqIHgsIG4gLyAyLCBhY2MpO1xyXG59O1xyXG52YXIgbG9nID0gZnVuY3Rpb24oeCl7XHJcbiAgdmFyIG4gID0gMFxyXG4gICAgLCB4MiA9IHg7XHJcbiAgd2hpbGUoeDIgPj0gNDA5Nil7XHJcbiAgICBuICs9IDEyO1xyXG4gICAgeDIgLz0gNDA5NjtcclxuICB9XHJcbiAgd2hpbGUoeDIgPj0gMil7XHJcbiAgICBuICArPSAxO1xyXG4gICAgeDIgLz0gMjtcclxuICB9IHJldHVybiBuO1xyXG59O1xyXG5cclxuJGV4cG9ydCgkZXhwb3J0LlAgKyAkZXhwb3J0LkYgKiAoISEkdG9GaXhlZCAmJiAoXHJcbiAgMC4wMDAwOC50b0ZpeGVkKDMpICE9PSAnMC4wMDAnIHx8XHJcbiAgMC45LnRvRml4ZWQoMCkgIT09ICcxJyB8fFxyXG4gIDEuMjU1LnRvRml4ZWQoMikgIT09ICcxLjI1JyB8fFxyXG4gIDEwMDAwMDAwMDAwMDAwMDAxMjguLnRvRml4ZWQoMCkgIT09ICcxMDAwMDAwMDAwMDAwMDAwMTI4J1xyXG4pIHx8ICFyZXF1aXJlKCcuL19mYWlscycpKGZ1bmN0aW9uKCl7XHJcbiAgLy8gVjggfiBBbmRyb2lkIDQuMy1cclxuICAkdG9GaXhlZC5jYWxsKHt9KTtcclxufSkpLCAnTnVtYmVyJywge1xyXG4gIHRvRml4ZWQ6IGZ1bmN0aW9uIHRvRml4ZWQoZnJhY3Rpb25EaWdpdHMpe1xyXG4gICAgdmFyIHggPSBhTnVtYmVyVmFsdWUodGhpcywgRVJST1IpXHJcbiAgICAgICwgZiA9IHRvSW50ZWdlcihmcmFjdGlvbkRpZ2l0cylcclxuICAgICAgLCBzID0gJydcclxuICAgICAgLCBtID0gWkVST1xyXG4gICAgICAsIGUsIHosIGosIGs7XHJcbiAgICBpZihmIDwgMCB8fCBmID4gMjApdGhyb3cgUmFuZ2VFcnJvcihFUlJPUik7XHJcbiAgICBpZih4ICE9IHgpcmV0dXJuICdOYU4nO1xyXG4gICAgaWYoeCA8PSAtMWUyMSB8fCB4ID49IDFlMjEpcmV0dXJuIFN0cmluZyh4KTtcclxuICAgIGlmKHggPCAwKXtcclxuICAgICAgcyA9ICctJztcclxuICAgICAgeCA9IC14O1xyXG4gICAgfVxyXG4gICAgaWYoeCA+IDFlLTIxKXtcclxuICAgICAgZSA9IGxvZyh4ICogcG93KDIsIDY5LCAxKSkgLSA2OTtcclxuICAgICAgeiA9IGUgPCAwID8geCAqIHBvdygyLCAtZSwgMSkgOiB4IC8gcG93KDIsIGUsIDEpO1xyXG4gICAgICB6ICo9IDB4MTAwMDAwMDAwMDAwMDA7XHJcbiAgICAgIGUgPSA1MiAtIGU7XHJcbiAgICAgIGlmKGUgPiAwKXtcclxuICAgICAgICBtdWx0aXBseSgwLCB6KTtcclxuICAgICAgICBqID0gZjtcclxuICAgICAgICB3aGlsZShqID49IDcpe1xyXG4gICAgICAgICAgbXVsdGlwbHkoMWU3LCAwKTtcclxuICAgICAgICAgIGogLT0gNztcclxuICAgICAgICB9XHJcbiAgICAgICAgbXVsdGlwbHkocG93KDEwLCBqLCAxKSwgMCk7XHJcbiAgICAgICAgaiA9IGUgLSAxO1xyXG4gICAgICAgIHdoaWxlKGogPj0gMjMpe1xyXG4gICAgICAgICAgZGl2aWRlKDEgPDwgMjMpO1xyXG4gICAgICAgICAgaiAtPSAyMztcclxuICAgICAgICB9XHJcbiAgICAgICAgZGl2aWRlKDEgPDwgaik7XHJcbiAgICAgICAgbXVsdGlwbHkoMSwgMSk7XHJcbiAgICAgICAgZGl2aWRlKDIpO1xyXG4gICAgICAgIG0gPSBudW1Ub1N0cmluZygpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIG11bHRpcGx5KDAsIHopO1xyXG4gICAgICAgIG11bHRpcGx5KDEgPDwgLWUsIDApO1xyXG4gICAgICAgIG0gPSBudW1Ub1N0cmluZygpICsgcmVwZWF0LmNhbGwoWkVSTywgZik7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIGlmKGYgPiAwKXtcclxuICAgICAgayA9IG0ubGVuZ3RoO1xyXG4gICAgICBtID0gcyArIChrIDw9IGYgPyAnMC4nICsgcmVwZWF0LmNhbGwoWkVSTywgZiAtIGspICsgbSA6IG0uc2xpY2UoMCwgayAtIGYpICsgJy4nICsgbS5zbGljZShrIC0gZikpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgbSA9IHMgKyBtO1xyXG4gICAgfSByZXR1cm4gbTtcclxuICB9XHJcbn0pOyIsIid1c2Ugc3RyaWN0JztcclxudmFyICRleHBvcnQgICAgICA9IHJlcXVpcmUoJy4vX2V4cG9ydCcpXHJcbiAgLCAkZmFpbHMgICAgICAgPSByZXF1aXJlKCcuL19mYWlscycpXHJcbiAgLCBhTnVtYmVyVmFsdWUgPSByZXF1aXJlKCcuL19hLW51bWJlci12YWx1ZScpXHJcbiAgLCAkdG9QcmVjaXNpb24gPSAxLi50b1ByZWNpc2lvbjtcclxuXHJcbiRleHBvcnQoJGV4cG9ydC5QICsgJGV4cG9ydC5GICogKCRmYWlscyhmdW5jdGlvbigpe1xyXG4gIC8vIElFNy1cclxuICByZXR1cm4gJHRvUHJlY2lzaW9uLmNhbGwoMSwgdW5kZWZpbmVkKSAhPT0gJzEnO1xyXG59KSB8fCAhJGZhaWxzKGZ1bmN0aW9uKCl7XHJcbiAgLy8gVjggfiBBbmRyb2lkIDQuMy1cclxuICAkdG9QcmVjaXNpb24uY2FsbCh7fSk7XHJcbn0pKSwgJ051bWJlcicsIHtcclxuICB0b1ByZWNpc2lvbjogZnVuY3Rpb24gdG9QcmVjaXNpb24ocHJlY2lzaW9uKXtcclxuICAgIHZhciB0aGF0ID0gYU51bWJlclZhbHVlKHRoaXMsICdOdW1iZXIjdG9QcmVjaXNpb246IGluY29ycmVjdCBpbnZvY2F0aW9uIScpO1xyXG4gICAgcmV0dXJuIHByZWNpc2lvbiA9PT0gdW5kZWZpbmVkID8gJHRvUHJlY2lzaW9uLmNhbGwodGhhdCkgOiAkdG9QcmVjaXNpb24uY2FsbCh0aGF0LCBwcmVjaXNpb24pOyBcclxuICB9XHJcbn0pOyIsIi8vIDE5LjEuMy4xIE9iamVjdC5hc3NpZ24odGFyZ2V0LCBzb3VyY2UpXG52YXIgJGV4cG9ydCA9IHJlcXVpcmUoJy4vX2V4cG9ydCcpO1xuXG4kZXhwb3J0KCRleHBvcnQuUyArICRleHBvcnQuRiwgJ09iamVjdCcsIHthc3NpZ246IHJlcXVpcmUoJy4vX29iamVjdC1hc3NpZ24nKX0pOyIsInZhciAkZXhwb3J0ID0gcmVxdWlyZSgnLi9fZXhwb3J0JylcclxuLy8gMTkuMS4yLjIgLyAxNS4yLjMuNSBPYmplY3QuY3JlYXRlKE8gWywgUHJvcGVydGllc10pXHJcbiRleHBvcnQoJGV4cG9ydC5TLCAnT2JqZWN0Jywge2NyZWF0ZTogcmVxdWlyZSgnLi9fb2JqZWN0LWNyZWF0ZScpfSk7IiwidmFyICRleHBvcnQgPSByZXF1aXJlKCcuL19leHBvcnQnKTtcclxuLy8gMTkuMS4yLjMgLyAxNS4yLjMuNyBPYmplY3QuZGVmaW5lUHJvcGVydGllcyhPLCBQcm9wZXJ0aWVzKVxyXG4kZXhwb3J0KCRleHBvcnQuUyArICRleHBvcnQuRiAqICFyZXF1aXJlKCcuL19kZXNjcmlwdG9ycycpLCAnT2JqZWN0Jywge2RlZmluZVByb3BlcnRpZXM6IHJlcXVpcmUoJy4vX29iamVjdC1kcHMnKX0pOyIsInZhciAkZXhwb3J0ID0gcmVxdWlyZSgnLi9fZXhwb3J0Jyk7XHJcbi8vIDE5LjEuMi40IC8gMTUuMi4zLjYgT2JqZWN0LmRlZmluZVByb3BlcnR5KE8sIFAsIEF0dHJpYnV0ZXMpXHJcbiRleHBvcnQoJGV4cG9ydC5TICsgJGV4cG9ydC5GICogIXJlcXVpcmUoJy4vX2Rlc2NyaXB0b3JzJyksICdPYmplY3QnLCB7ZGVmaW5lUHJvcGVydHk6IHJlcXVpcmUoJy4vX29iamVjdC1kcCcpLmZ9KTsiLCIvLyAxOS4xLjIuNSBPYmplY3QuZnJlZXplKE8pXG52YXIgaXNPYmplY3QgPSByZXF1aXJlKCcuL19pcy1vYmplY3QnKVxuICAsIG1ldGEgICAgID0gcmVxdWlyZSgnLi9fbWV0YScpLm9uRnJlZXplO1xuXG5yZXF1aXJlKCcuL19vYmplY3Qtc2FwJykoJ2ZyZWV6ZScsIGZ1bmN0aW9uKCRmcmVlemUpe1xuICByZXR1cm4gZnVuY3Rpb24gZnJlZXplKGl0KXtcbiAgICByZXR1cm4gJGZyZWV6ZSAmJiBpc09iamVjdChpdCkgPyAkZnJlZXplKG1ldGEoaXQpKSA6IGl0O1xuICB9O1xufSk7IiwiLy8gMTkuMS4yLjYgT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihPLCBQKVxudmFyIHRvSU9iamVjdCAgICAgICAgICAgICAgICAgPSByZXF1aXJlKCcuL190by1pb2JqZWN0JylcbiAgLCAkZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yID0gcmVxdWlyZSgnLi9fb2JqZWN0LWdvcGQnKS5mO1xuXG5yZXF1aXJlKCcuL19vYmplY3Qtc2FwJykoJ2dldE93blByb3BlcnR5RGVzY3JpcHRvcicsIGZ1bmN0aW9uKCl7XG4gIHJldHVybiBmdW5jdGlvbiBnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IoaXQsIGtleSl7XG4gICAgcmV0dXJuICRnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IodG9JT2JqZWN0KGl0KSwga2V5KTtcbiAgfTtcbn0pOyIsIi8vIDE5LjEuMi43IE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKE8pXG5yZXF1aXJlKCcuL19vYmplY3Qtc2FwJykoJ2dldE93blByb3BlcnR5TmFtZXMnLCBmdW5jdGlvbigpe1xuICByZXR1cm4gcmVxdWlyZSgnLi9fb2JqZWN0LWdvcG4tZXh0JykuZjtcbn0pOyIsIi8vIDE5LjEuMi45IE9iamVjdC5nZXRQcm90b3R5cGVPZihPKVxudmFyIHRvT2JqZWN0ICAgICAgICA9IHJlcXVpcmUoJy4vX3RvLW9iamVjdCcpXG4gICwgJGdldFByb3RvdHlwZU9mID0gcmVxdWlyZSgnLi9fb2JqZWN0LWdwbycpO1xuXG5yZXF1aXJlKCcuL19vYmplY3Qtc2FwJykoJ2dldFByb3RvdHlwZU9mJywgZnVuY3Rpb24oKXtcbiAgcmV0dXJuIGZ1bmN0aW9uIGdldFByb3RvdHlwZU9mKGl0KXtcbiAgICByZXR1cm4gJGdldFByb3RvdHlwZU9mKHRvT2JqZWN0KGl0KSk7XG4gIH07XG59KTsiLCIvLyAxOS4xLjIuMTEgT2JqZWN0LmlzRXh0ZW5zaWJsZShPKVxudmFyIGlzT2JqZWN0ID0gcmVxdWlyZSgnLi9faXMtb2JqZWN0Jyk7XG5cbnJlcXVpcmUoJy4vX29iamVjdC1zYXAnKSgnaXNFeHRlbnNpYmxlJywgZnVuY3Rpb24oJGlzRXh0ZW5zaWJsZSl7XG4gIHJldHVybiBmdW5jdGlvbiBpc0V4dGVuc2libGUoaXQpe1xuICAgIHJldHVybiBpc09iamVjdChpdCkgPyAkaXNFeHRlbnNpYmxlID8gJGlzRXh0ZW5zaWJsZShpdCkgOiB0cnVlIDogZmFsc2U7XG4gIH07XG59KTsiLCIvLyAxOS4xLjIuMTIgT2JqZWN0LmlzRnJvemVuKE8pXG52YXIgaXNPYmplY3QgPSByZXF1aXJlKCcuL19pcy1vYmplY3QnKTtcblxucmVxdWlyZSgnLi9fb2JqZWN0LXNhcCcpKCdpc0Zyb3plbicsIGZ1bmN0aW9uKCRpc0Zyb3plbil7XG4gIHJldHVybiBmdW5jdGlvbiBpc0Zyb3plbihpdCl7XG4gICAgcmV0dXJuIGlzT2JqZWN0KGl0KSA/ICRpc0Zyb3plbiA/ICRpc0Zyb3plbihpdCkgOiBmYWxzZSA6IHRydWU7XG4gIH07XG59KTsiLCIvLyAxOS4xLjIuMTMgT2JqZWN0LmlzU2VhbGVkKE8pXG52YXIgaXNPYmplY3QgPSByZXF1aXJlKCcuL19pcy1vYmplY3QnKTtcblxucmVxdWlyZSgnLi9fb2JqZWN0LXNhcCcpKCdpc1NlYWxlZCcsIGZ1bmN0aW9uKCRpc1NlYWxlZCl7XG4gIHJldHVybiBmdW5jdGlvbiBpc1NlYWxlZChpdCl7XG4gICAgcmV0dXJuIGlzT2JqZWN0KGl0KSA/ICRpc1NlYWxlZCA/ICRpc1NlYWxlZChpdCkgOiBmYWxzZSA6IHRydWU7XG4gIH07XG59KTsiLCIvLyAxOS4xLjMuMTAgT2JqZWN0LmlzKHZhbHVlMSwgdmFsdWUyKVxudmFyICRleHBvcnQgPSByZXF1aXJlKCcuL19leHBvcnQnKTtcbiRleHBvcnQoJGV4cG9ydC5TLCAnT2JqZWN0Jywge2lzOiByZXF1aXJlKCcuL19zYW1lLXZhbHVlJyl9KTsiLCIvLyAxOS4xLjIuMTQgT2JqZWN0LmtleXMoTylcbnZhciB0b09iamVjdCA9IHJlcXVpcmUoJy4vX3RvLW9iamVjdCcpXG4gICwgJGtleXMgICAgPSByZXF1aXJlKCcuL19vYmplY3Qta2V5cycpO1xuXG5yZXF1aXJlKCcuL19vYmplY3Qtc2FwJykoJ2tleXMnLCBmdW5jdGlvbigpe1xuICByZXR1cm4gZnVuY3Rpb24ga2V5cyhpdCl7XG4gICAgcmV0dXJuICRrZXlzKHRvT2JqZWN0KGl0KSk7XG4gIH07XG59KTsiLCIvLyAxOS4xLjIuMTUgT2JqZWN0LnByZXZlbnRFeHRlbnNpb25zKE8pXG52YXIgaXNPYmplY3QgPSByZXF1aXJlKCcuL19pcy1vYmplY3QnKVxuICAsIG1ldGEgICAgID0gcmVxdWlyZSgnLi9fbWV0YScpLm9uRnJlZXplO1xuXG5yZXF1aXJlKCcuL19vYmplY3Qtc2FwJykoJ3ByZXZlbnRFeHRlbnNpb25zJywgZnVuY3Rpb24oJHByZXZlbnRFeHRlbnNpb25zKXtcbiAgcmV0dXJuIGZ1bmN0aW9uIHByZXZlbnRFeHRlbnNpb25zKGl0KXtcbiAgICByZXR1cm4gJHByZXZlbnRFeHRlbnNpb25zICYmIGlzT2JqZWN0KGl0KSA/ICRwcmV2ZW50RXh0ZW5zaW9ucyhtZXRhKGl0KSkgOiBpdDtcbiAgfTtcbn0pOyIsIi8vIDE5LjEuMi4xNyBPYmplY3Quc2VhbChPKVxudmFyIGlzT2JqZWN0ID0gcmVxdWlyZSgnLi9faXMtb2JqZWN0JylcbiAgLCBtZXRhICAgICA9IHJlcXVpcmUoJy4vX21ldGEnKS5vbkZyZWV6ZTtcblxucmVxdWlyZSgnLi9fb2JqZWN0LXNhcCcpKCdzZWFsJywgZnVuY3Rpb24oJHNlYWwpe1xuICByZXR1cm4gZnVuY3Rpb24gc2VhbChpdCl7XG4gICAgcmV0dXJuICRzZWFsICYmIGlzT2JqZWN0KGl0KSA/ICRzZWFsKG1ldGEoaXQpKSA6IGl0O1xuICB9O1xufSk7IiwiLy8gMTkuMS4zLjE5IE9iamVjdC5zZXRQcm90b3R5cGVPZihPLCBwcm90bylcbnZhciAkZXhwb3J0ID0gcmVxdWlyZSgnLi9fZXhwb3J0Jyk7XG4kZXhwb3J0KCRleHBvcnQuUywgJ09iamVjdCcsIHtzZXRQcm90b3R5cGVPZjogcmVxdWlyZSgnLi9fc2V0LXByb3RvJykuc2V0fSk7IiwiJ3VzZSBzdHJpY3QnO1xuLy8gMTkuMS4zLjYgT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZygpXG52YXIgY2xhc3NvZiA9IHJlcXVpcmUoJy4vX2NsYXNzb2YnKVxuICAsIHRlc3QgICAgPSB7fTtcbnRlc3RbcmVxdWlyZSgnLi9fd2tzJykoJ3RvU3RyaW5nVGFnJyldID0gJ3onO1xuaWYodGVzdCArICcnICE9ICdbb2JqZWN0IHpdJyl7XG4gIHJlcXVpcmUoJy4vX3JlZGVmaW5lJykoT2JqZWN0LnByb3RvdHlwZSwgJ3RvU3RyaW5nJywgZnVuY3Rpb24gdG9TdHJpbmcoKXtcbiAgICByZXR1cm4gJ1tvYmplY3QgJyArIGNsYXNzb2YodGhpcykgKyAnXSc7XG4gIH0sIHRydWUpO1xufSIsInZhciAkZXhwb3J0ICAgICA9IHJlcXVpcmUoJy4vX2V4cG9ydCcpXHJcbiAgLCAkcGFyc2VGbG9hdCA9IHJlcXVpcmUoJy4vX3BhcnNlLWZsb2F0Jyk7XHJcbi8vIDE4LjIuNCBwYXJzZUZsb2F0KHN0cmluZylcclxuJGV4cG9ydCgkZXhwb3J0LkcgKyAkZXhwb3J0LkYgKiAocGFyc2VGbG9hdCAhPSAkcGFyc2VGbG9hdCksIHtwYXJzZUZsb2F0OiAkcGFyc2VGbG9hdH0pOyIsInZhciAkZXhwb3J0ICAgPSByZXF1aXJlKCcuL19leHBvcnQnKVxyXG4gICwgJHBhcnNlSW50ID0gcmVxdWlyZSgnLi9fcGFyc2UtaW50Jyk7XHJcbi8vIDE4LjIuNSBwYXJzZUludChzdHJpbmcsIHJhZGl4KVxyXG4kZXhwb3J0KCRleHBvcnQuRyArICRleHBvcnQuRiAqIChwYXJzZUludCAhPSAkcGFyc2VJbnQpLCB7cGFyc2VJbnQ6ICRwYXJzZUludH0pOyIsIid1c2Ugc3RyaWN0JztcbnZhciBMSUJSQVJZICAgICAgICAgICAgPSByZXF1aXJlKCcuL19saWJyYXJ5JylcbiAgLCBnbG9iYWwgICAgICAgICAgICAgPSByZXF1aXJlKCcuL19nbG9iYWwnKVxuICAsIGN0eCAgICAgICAgICAgICAgICA9IHJlcXVpcmUoJy4vX2N0eCcpXG4gICwgY2xhc3NvZiAgICAgICAgICAgID0gcmVxdWlyZSgnLi9fY2xhc3NvZicpXG4gICwgJGV4cG9ydCAgICAgICAgICAgID0gcmVxdWlyZSgnLi9fZXhwb3J0JylcbiAgLCBpc09iamVjdCAgICAgICAgICAgPSByZXF1aXJlKCcuL19pcy1vYmplY3QnKVxuICAsIGFuT2JqZWN0ICAgICAgICAgICA9IHJlcXVpcmUoJy4vX2FuLW9iamVjdCcpXG4gICwgYUZ1bmN0aW9uICAgICAgICAgID0gcmVxdWlyZSgnLi9fYS1mdW5jdGlvbicpXG4gICwgYW5JbnN0YW5jZSAgICAgICAgID0gcmVxdWlyZSgnLi9fYW4taW5zdGFuY2UnKVxuICAsIGZvck9mICAgICAgICAgICAgICA9IHJlcXVpcmUoJy4vX2Zvci1vZicpXG4gICwgc2V0UHJvdG8gICAgICAgICAgID0gcmVxdWlyZSgnLi9fc2V0LXByb3RvJykuc2V0XG4gICwgc3BlY2llc0NvbnN0cnVjdG9yID0gcmVxdWlyZSgnLi9fc3BlY2llcy1jb25zdHJ1Y3RvcicpXG4gICwgdGFzayAgICAgICAgICAgICAgID0gcmVxdWlyZSgnLi9fdGFzaycpLnNldFxuICAsIG1pY3JvdGFzayAgICAgICAgICA9IHJlcXVpcmUoJy4vX21pY3JvdGFzaycpXG4gICwgUFJPTUlTRSAgICAgICAgICAgID0gJ1Byb21pc2UnXG4gICwgVHlwZUVycm9yICAgICAgICAgID0gZ2xvYmFsLlR5cGVFcnJvclxuICAsIHByb2Nlc3MgICAgICAgICAgICA9IGdsb2JhbC5wcm9jZXNzXG4gICwgJFByb21pc2UgICAgICAgICAgID0gZ2xvYmFsW1BST01JU0VdXG4gICwgcHJvY2VzcyAgICAgICAgICAgID0gZ2xvYmFsLnByb2Nlc3NcbiAgLCBpc05vZGUgICAgICAgICAgICAgPSBjbGFzc29mKHByb2Nlc3MpID09ICdwcm9jZXNzJ1xuICAsIGVtcHR5ICAgICAgICAgICAgICA9IGZ1bmN0aW9uKCl7IC8qIGVtcHR5ICovIH1cbiAgLCBJbnRlcm5hbCwgR2VuZXJpY1Byb21pc2VDYXBhYmlsaXR5LCBXcmFwcGVyO1xuXG52YXIgVVNFX05BVElWRSA9ICEhZnVuY3Rpb24oKXtcbiAgdHJ5IHtcbiAgICAvLyBjb3JyZWN0IHN1YmNsYXNzaW5nIHdpdGggQEBzcGVjaWVzIHN1cHBvcnRcbiAgICB2YXIgcHJvbWlzZSAgICAgPSAkUHJvbWlzZS5yZXNvbHZlKDEpXG4gICAgICAsIEZha2VQcm9taXNlID0gKHByb21pc2UuY29uc3RydWN0b3IgPSB7fSlbcmVxdWlyZSgnLi9fd2tzJykoJ3NwZWNpZXMnKV0gPSBmdW5jdGlvbihleGVjKXsgZXhlYyhlbXB0eSwgZW1wdHkpOyB9O1xuICAgIC8vIHVuaGFuZGxlZCByZWplY3Rpb25zIHRyYWNraW5nIHN1cHBvcnQsIE5vZGVKUyBQcm9taXNlIHdpdGhvdXQgaXQgZmFpbHMgQEBzcGVjaWVzIHRlc3RcbiAgICByZXR1cm4gKGlzTm9kZSB8fCB0eXBlb2YgUHJvbWlzZVJlamVjdGlvbkV2ZW50ID09ICdmdW5jdGlvbicpICYmIHByb21pc2UudGhlbihlbXB0eSkgaW5zdGFuY2VvZiBGYWtlUHJvbWlzZTtcbiAgfSBjYXRjaChlKXsgLyogZW1wdHkgKi8gfVxufSgpO1xuXG4vLyBoZWxwZXJzXG52YXIgc2FtZUNvbnN0cnVjdG9yID0gZnVuY3Rpb24oYSwgYil7XG4gIC8vIHdpdGggbGlicmFyeSB3cmFwcGVyIHNwZWNpYWwgY2FzZVxuICByZXR1cm4gYSA9PT0gYiB8fCBhID09PSAkUHJvbWlzZSAmJiBiID09PSBXcmFwcGVyO1xufTtcbnZhciBpc1RoZW5hYmxlID0gZnVuY3Rpb24oaXQpe1xuICB2YXIgdGhlbjtcbiAgcmV0dXJuIGlzT2JqZWN0KGl0KSAmJiB0eXBlb2YgKHRoZW4gPSBpdC50aGVuKSA9PSAnZnVuY3Rpb24nID8gdGhlbiA6IGZhbHNlO1xufTtcbnZhciBuZXdQcm9taXNlQ2FwYWJpbGl0eSA9IGZ1bmN0aW9uKEMpe1xuICByZXR1cm4gc2FtZUNvbnN0cnVjdG9yKCRQcm9taXNlLCBDKVxuICAgID8gbmV3IFByb21pc2VDYXBhYmlsaXR5KEMpXG4gICAgOiBuZXcgR2VuZXJpY1Byb21pc2VDYXBhYmlsaXR5KEMpO1xufTtcbnZhciBQcm9taXNlQ2FwYWJpbGl0eSA9IEdlbmVyaWNQcm9taXNlQ2FwYWJpbGl0eSA9IGZ1bmN0aW9uKEMpe1xuICB2YXIgcmVzb2x2ZSwgcmVqZWN0O1xuICB0aGlzLnByb21pc2UgPSBuZXcgQyhmdW5jdGlvbigkJHJlc29sdmUsICQkcmVqZWN0KXtcbiAgICBpZihyZXNvbHZlICE9PSB1bmRlZmluZWQgfHwgcmVqZWN0ICE9PSB1bmRlZmluZWQpdGhyb3cgVHlwZUVycm9yKCdCYWQgUHJvbWlzZSBjb25zdHJ1Y3RvcicpO1xuICAgIHJlc29sdmUgPSAkJHJlc29sdmU7XG4gICAgcmVqZWN0ICA9ICQkcmVqZWN0O1xuICB9KTtcbiAgdGhpcy5yZXNvbHZlID0gYUZ1bmN0aW9uKHJlc29sdmUpO1xuICB0aGlzLnJlamVjdCAgPSBhRnVuY3Rpb24ocmVqZWN0KTtcbn07XG52YXIgcGVyZm9ybSA9IGZ1bmN0aW9uKGV4ZWMpe1xuICB0cnkge1xuICAgIGV4ZWMoKTtcbiAgfSBjYXRjaChlKXtcbiAgICByZXR1cm4ge2Vycm9yOiBlfTtcbiAgfVxufTtcbnZhciBub3RpZnkgPSBmdW5jdGlvbihwcm9taXNlLCBpc1JlamVjdCl7XG4gIGlmKHByb21pc2UuX24pcmV0dXJuO1xuICBwcm9taXNlLl9uID0gdHJ1ZTtcbiAgdmFyIGNoYWluID0gcHJvbWlzZS5fYztcbiAgbWljcm90YXNrKGZ1bmN0aW9uKCl7XG4gICAgdmFyIHZhbHVlID0gcHJvbWlzZS5fdlxuICAgICAgLCBvayAgICA9IHByb21pc2UuX3MgPT0gMVxuICAgICAgLCBpICAgICA9IDA7XG4gICAgdmFyIHJ1biA9IGZ1bmN0aW9uKHJlYWN0aW9uKXtcbiAgICAgIHZhciBoYW5kbGVyID0gb2sgPyByZWFjdGlvbi5vayA6IHJlYWN0aW9uLmZhaWxcbiAgICAgICAgLCByZXNvbHZlID0gcmVhY3Rpb24ucmVzb2x2ZVxuICAgICAgICAsIHJlamVjdCAgPSByZWFjdGlvbi5yZWplY3RcbiAgICAgICAgLCBkb21haW4gID0gcmVhY3Rpb24uZG9tYWluXG4gICAgICAgICwgcmVzdWx0LCB0aGVuO1xuICAgICAgdHJ5IHtcbiAgICAgICAgaWYoaGFuZGxlcil7XG4gICAgICAgICAgaWYoIW9rKXtcbiAgICAgICAgICAgIGlmKHByb21pc2UuX2ggPT0gMilvbkhhbmRsZVVuaGFuZGxlZChwcm9taXNlKTtcbiAgICAgICAgICAgIHByb21pc2UuX2ggPSAxO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZihoYW5kbGVyID09PSB0cnVlKXJlc3VsdCA9IHZhbHVlO1xuICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgaWYoZG9tYWluKWRvbWFpbi5lbnRlcigpO1xuICAgICAgICAgICAgcmVzdWx0ID0gaGFuZGxlcih2YWx1ZSk7XG4gICAgICAgICAgICBpZihkb21haW4pZG9tYWluLmV4aXQoKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYocmVzdWx0ID09PSByZWFjdGlvbi5wcm9taXNlKXtcbiAgICAgICAgICAgIHJlamVjdChUeXBlRXJyb3IoJ1Byb21pc2UtY2hhaW4gY3ljbGUnKSk7XG4gICAgICAgICAgfSBlbHNlIGlmKHRoZW4gPSBpc1RoZW5hYmxlKHJlc3VsdCkpe1xuICAgICAgICAgICAgdGhlbi5jYWxsKHJlc3VsdCwgcmVzb2x2ZSwgcmVqZWN0KTtcbiAgICAgICAgICB9IGVsc2UgcmVzb2x2ZShyZXN1bHQpO1xuICAgICAgICB9IGVsc2UgcmVqZWN0KHZhbHVlKTtcbiAgICAgIH0gY2F0Y2goZSl7XG4gICAgICAgIHJlamVjdChlKTtcbiAgICAgIH1cbiAgICB9O1xuICAgIHdoaWxlKGNoYWluLmxlbmd0aCA+IGkpcnVuKGNoYWluW2krK10pOyAvLyB2YXJpYWJsZSBsZW5ndGggLSBjYW4ndCB1c2UgZm9yRWFjaFxuICAgIHByb21pc2UuX2MgPSBbXTtcbiAgICBwcm9taXNlLl9uID0gZmFsc2U7XG4gICAgaWYoaXNSZWplY3QgJiYgIXByb21pc2UuX2gpb25VbmhhbmRsZWQocHJvbWlzZSk7XG4gIH0pO1xufTtcbnZhciBvblVuaGFuZGxlZCA9IGZ1bmN0aW9uKHByb21pc2Upe1xuICB0YXNrLmNhbGwoZ2xvYmFsLCBmdW5jdGlvbigpe1xuICAgIHZhciB2YWx1ZSA9IHByb21pc2UuX3ZcbiAgICAgICwgYWJydXB0LCBoYW5kbGVyLCBjb25zb2xlO1xuICAgIGlmKGlzVW5oYW5kbGVkKHByb21pc2UpKXtcbiAgICAgIGFicnVwdCA9IHBlcmZvcm0oZnVuY3Rpb24oKXtcbiAgICAgICAgaWYoaXNOb2RlKXtcbiAgICAgICAgICBwcm9jZXNzLmVtaXQoJ3VuaGFuZGxlZFJlamVjdGlvbicsIHZhbHVlLCBwcm9taXNlKTtcbiAgICAgICAgfSBlbHNlIGlmKGhhbmRsZXIgPSBnbG9iYWwub251bmhhbmRsZWRyZWplY3Rpb24pe1xuICAgICAgICAgIGhhbmRsZXIoe3Byb21pc2U6IHByb21pc2UsIHJlYXNvbjogdmFsdWV9KTtcbiAgICAgICAgfSBlbHNlIGlmKChjb25zb2xlID0gZ2xvYmFsLmNvbnNvbGUpICYmIGNvbnNvbGUuZXJyb3Ipe1xuICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ1VuaGFuZGxlZCBwcm9taXNlIHJlamVjdGlvbicsIHZhbHVlKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgICAvLyBCcm93c2VycyBzaG91bGQgbm90IHRyaWdnZXIgYHJlamVjdGlvbkhhbmRsZWRgIGV2ZW50IGlmIGl0IHdhcyBoYW5kbGVkIGhlcmUsIE5vZGVKUyAtIHNob3VsZFxuICAgICAgcHJvbWlzZS5faCA9IGlzTm9kZSB8fCBpc1VuaGFuZGxlZChwcm9taXNlKSA/IDIgOiAxO1xuICAgIH0gcHJvbWlzZS5fYSA9IHVuZGVmaW5lZDtcbiAgICBpZihhYnJ1cHQpdGhyb3cgYWJydXB0LmVycm9yO1xuICB9KTtcbn07XG52YXIgaXNVbmhhbmRsZWQgPSBmdW5jdGlvbihwcm9taXNlKXtcbiAgaWYocHJvbWlzZS5faCA9PSAxKXJldHVybiBmYWxzZTtcbiAgdmFyIGNoYWluID0gcHJvbWlzZS5fYSB8fCBwcm9taXNlLl9jXG4gICAgLCBpICAgICA9IDBcbiAgICAsIHJlYWN0aW9uO1xuICB3aGlsZShjaGFpbi5sZW5ndGggPiBpKXtcbiAgICByZWFjdGlvbiA9IGNoYWluW2krK107XG4gICAgaWYocmVhY3Rpb24uZmFpbCB8fCAhaXNVbmhhbmRsZWQocmVhY3Rpb24ucHJvbWlzZSkpcmV0dXJuIGZhbHNlO1xuICB9IHJldHVybiB0cnVlO1xufTtcbnZhciBvbkhhbmRsZVVuaGFuZGxlZCA9IGZ1bmN0aW9uKHByb21pc2Upe1xuICB0YXNrLmNhbGwoZ2xvYmFsLCBmdW5jdGlvbigpe1xuICAgIHZhciBoYW5kbGVyO1xuICAgIGlmKGlzTm9kZSl7XG4gICAgICBwcm9jZXNzLmVtaXQoJ3JlamVjdGlvbkhhbmRsZWQnLCBwcm9taXNlKTtcbiAgICB9IGVsc2UgaWYoaGFuZGxlciA9IGdsb2JhbC5vbnJlamVjdGlvbmhhbmRsZWQpe1xuICAgICAgaGFuZGxlcih7cHJvbWlzZTogcHJvbWlzZSwgcmVhc29uOiBwcm9taXNlLl92fSk7XG4gICAgfVxuICB9KTtcbn07XG52YXIgJHJlamVjdCA9IGZ1bmN0aW9uKHZhbHVlKXtcbiAgdmFyIHByb21pc2UgPSB0aGlzO1xuICBpZihwcm9taXNlLl9kKXJldHVybjtcbiAgcHJvbWlzZS5fZCA9IHRydWU7XG4gIHByb21pc2UgPSBwcm9taXNlLl93IHx8IHByb21pc2U7IC8vIHVud3JhcFxuICBwcm9taXNlLl92ID0gdmFsdWU7XG4gIHByb21pc2UuX3MgPSAyO1xuICBpZighcHJvbWlzZS5fYSlwcm9taXNlLl9hID0gcHJvbWlzZS5fYy5zbGljZSgpO1xuICBub3RpZnkocHJvbWlzZSwgdHJ1ZSk7XG59O1xudmFyICRyZXNvbHZlID0gZnVuY3Rpb24odmFsdWUpe1xuICB2YXIgcHJvbWlzZSA9IHRoaXNcbiAgICAsIHRoZW47XG4gIGlmKHByb21pc2UuX2QpcmV0dXJuO1xuICBwcm9taXNlLl9kID0gdHJ1ZTtcbiAgcHJvbWlzZSA9IHByb21pc2UuX3cgfHwgcHJvbWlzZTsgLy8gdW53cmFwXG4gIHRyeSB7XG4gICAgaWYocHJvbWlzZSA9PT0gdmFsdWUpdGhyb3cgVHlwZUVycm9yKFwiUHJvbWlzZSBjYW4ndCBiZSByZXNvbHZlZCBpdHNlbGZcIik7XG4gICAgaWYodGhlbiA9IGlzVGhlbmFibGUodmFsdWUpKXtcbiAgICAgIG1pY3JvdGFzayhmdW5jdGlvbigpe1xuICAgICAgICB2YXIgd3JhcHBlciA9IHtfdzogcHJvbWlzZSwgX2Q6IGZhbHNlfTsgLy8gd3JhcFxuICAgICAgICB0cnkge1xuICAgICAgICAgIHRoZW4uY2FsbCh2YWx1ZSwgY3R4KCRyZXNvbHZlLCB3cmFwcGVyLCAxKSwgY3R4KCRyZWplY3QsIHdyYXBwZXIsIDEpKTtcbiAgICAgICAgfSBjYXRjaChlKXtcbiAgICAgICAgICAkcmVqZWN0LmNhbGwod3JhcHBlciwgZSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICBwcm9taXNlLl92ID0gdmFsdWU7XG4gICAgICBwcm9taXNlLl9zID0gMTtcbiAgICAgIG5vdGlmeShwcm9taXNlLCBmYWxzZSk7XG4gICAgfVxuICB9IGNhdGNoKGUpe1xuICAgICRyZWplY3QuY2FsbCh7X3c6IHByb21pc2UsIF9kOiBmYWxzZX0sIGUpOyAvLyB3cmFwXG4gIH1cbn07XG5cbi8vIGNvbnN0cnVjdG9yIHBvbHlmaWxsXG5pZighVVNFX05BVElWRSl7XG4gIC8vIDI1LjQuMy4xIFByb21pc2UoZXhlY3V0b3IpXG4gICRQcm9taXNlID0gZnVuY3Rpb24gUHJvbWlzZShleGVjdXRvcil7XG4gICAgYW5JbnN0YW5jZSh0aGlzLCAkUHJvbWlzZSwgUFJPTUlTRSwgJ19oJyk7XG4gICAgYUZ1bmN0aW9uKGV4ZWN1dG9yKTtcbiAgICBJbnRlcm5hbC5jYWxsKHRoaXMpO1xuICAgIHRyeSB7XG4gICAgICBleGVjdXRvcihjdHgoJHJlc29sdmUsIHRoaXMsIDEpLCBjdHgoJHJlamVjdCwgdGhpcywgMSkpO1xuICAgIH0gY2F0Y2goZXJyKXtcbiAgICAgICRyZWplY3QuY2FsbCh0aGlzLCBlcnIpO1xuICAgIH1cbiAgfTtcbiAgSW50ZXJuYWwgPSBmdW5jdGlvbiBQcm9taXNlKGV4ZWN1dG9yKXtcbiAgICB0aGlzLl9jID0gW107ICAgICAgICAgICAgIC8vIDwtIGF3YWl0aW5nIHJlYWN0aW9uc1xuICAgIHRoaXMuX2EgPSB1bmRlZmluZWQ7ICAgICAgLy8gPC0gY2hlY2tlZCBpbiBpc1VuaGFuZGxlZCByZWFjdGlvbnNcbiAgICB0aGlzLl9zID0gMDsgICAgICAgICAgICAgIC8vIDwtIHN0YXRlXG4gICAgdGhpcy5fZCA9IGZhbHNlOyAgICAgICAgICAvLyA8LSBkb25lXG4gICAgdGhpcy5fdiA9IHVuZGVmaW5lZDsgICAgICAvLyA8LSB2YWx1ZVxuICAgIHRoaXMuX2ggPSAwOyAgICAgICAgICAgICAgLy8gPC0gcmVqZWN0aW9uIHN0YXRlLCAwIC0gZGVmYXVsdCwgMSAtIGhhbmRsZWQsIDIgLSB1bmhhbmRsZWRcbiAgICB0aGlzLl9uID0gZmFsc2U7ICAgICAgICAgIC8vIDwtIG5vdGlmeVxuICB9O1xuICBJbnRlcm5hbC5wcm90b3R5cGUgPSByZXF1aXJlKCcuL19yZWRlZmluZS1hbGwnKSgkUHJvbWlzZS5wcm90b3R5cGUsIHtcbiAgICAvLyAyNS40LjUuMyBQcm9taXNlLnByb3RvdHlwZS50aGVuKG9uRnVsZmlsbGVkLCBvblJlamVjdGVkKVxuICAgIHRoZW46IGZ1bmN0aW9uIHRoZW4ob25GdWxmaWxsZWQsIG9uUmVqZWN0ZWQpe1xuICAgICAgdmFyIHJlYWN0aW9uICAgID0gbmV3UHJvbWlzZUNhcGFiaWxpdHkoc3BlY2llc0NvbnN0cnVjdG9yKHRoaXMsICRQcm9taXNlKSk7XG4gICAgICByZWFjdGlvbi5vayAgICAgPSB0eXBlb2Ygb25GdWxmaWxsZWQgPT0gJ2Z1bmN0aW9uJyA/IG9uRnVsZmlsbGVkIDogdHJ1ZTtcbiAgICAgIHJlYWN0aW9uLmZhaWwgICA9IHR5cGVvZiBvblJlamVjdGVkID09ICdmdW5jdGlvbicgJiYgb25SZWplY3RlZDtcbiAgICAgIHJlYWN0aW9uLmRvbWFpbiA9IGlzTm9kZSA/IHByb2Nlc3MuZG9tYWluIDogdW5kZWZpbmVkO1xuICAgICAgdGhpcy5fYy5wdXNoKHJlYWN0aW9uKTtcbiAgICAgIGlmKHRoaXMuX2EpdGhpcy5fYS5wdXNoKHJlYWN0aW9uKTtcbiAgICAgIGlmKHRoaXMuX3Mpbm90aWZ5KHRoaXMsIGZhbHNlKTtcbiAgICAgIHJldHVybiByZWFjdGlvbi5wcm9taXNlO1xuICAgIH0sXG4gICAgLy8gMjUuNC41LjEgUHJvbWlzZS5wcm90b3R5cGUuY2F0Y2gob25SZWplY3RlZClcbiAgICAnY2F0Y2gnOiBmdW5jdGlvbihvblJlamVjdGVkKXtcbiAgICAgIHJldHVybiB0aGlzLnRoZW4odW5kZWZpbmVkLCBvblJlamVjdGVkKTtcbiAgICB9XG4gIH0pO1xuICBQcm9taXNlQ2FwYWJpbGl0eSA9IGZ1bmN0aW9uKCl7XG4gICAgdmFyIHByb21pc2UgID0gbmV3IEludGVybmFsO1xuICAgIHRoaXMucHJvbWlzZSA9IHByb21pc2U7XG4gICAgdGhpcy5yZXNvbHZlID0gY3R4KCRyZXNvbHZlLCBwcm9taXNlLCAxKTtcbiAgICB0aGlzLnJlamVjdCAgPSBjdHgoJHJlamVjdCwgcHJvbWlzZSwgMSk7XG4gIH07XG59XG5cbiRleHBvcnQoJGV4cG9ydC5HICsgJGV4cG9ydC5XICsgJGV4cG9ydC5GICogIVVTRV9OQVRJVkUsIHtQcm9taXNlOiAkUHJvbWlzZX0pO1xucmVxdWlyZSgnLi9fc2V0LXRvLXN0cmluZy10YWcnKSgkUHJvbWlzZSwgUFJPTUlTRSk7XG5yZXF1aXJlKCcuL19zZXQtc3BlY2llcycpKFBST01JU0UpO1xuV3JhcHBlciA9IHJlcXVpcmUoJy4vX2NvcmUnKVtQUk9NSVNFXTtcblxuLy8gc3RhdGljc1xuJGV4cG9ydCgkZXhwb3J0LlMgKyAkZXhwb3J0LkYgKiAhVVNFX05BVElWRSwgUFJPTUlTRSwge1xuICAvLyAyNS40LjQuNSBQcm9taXNlLnJlamVjdChyKVxuICByZWplY3Q6IGZ1bmN0aW9uIHJlamVjdChyKXtcbiAgICB2YXIgY2FwYWJpbGl0eSA9IG5ld1Byb21pc2VDYXBhYmlsaXR5KHRoaXMpXG4gICAgICAsICQkcmVqZWN0ICAgPSBjYXBhYmlsaXR5LnJlamVjdDtcbiAgICAkJHJlamVjdChyKTtcbiAgICByZXR1cm4gY2FwYWJpbGl0eS5wcm9taXNlO1xuICB9XG59KTtcbiRleHBvcnQoJGV4cG9ydC5TICsgJGV4cG9ydC5GICogKExJQlJBUlkgfHwgIVVTRV9OQVRJVkUpLCBQUk9NSVNFLCB7XG4gIC8vIDI1LjQuNC42IFByb21pc2UucmVzb2x2ZSh4KVxuICByZXNvbHZlOiBmdW5jdGlvbiByZXNvbHZlKHgpe1xuICAgIC8vIGluc3RhbmNlb2YgaW5zdGVhZCBvZiBpbnRlcm5hbCBzbG90IGNoZWNrIGJlY2F1c2Ugd2Ugc2hvdWxkIGZpeCBpdCB3aXRob3V0IHJlcGxhY2VtZW50IG5hdGl2ZSBQcm9taXNlIGNvcmVcbiAgICBpZih4IGluc3RhbmNlb2YgJFByb21pc2UgJiYgc2FtZUNvbnN0cnVjdG9yKHguY29uc3RydWN0b3IsIHRoaXMpKXJldHVybiB4O1xuICAgIHZhciBjYXBhYmlsaXR5ID0gbmV3UHJvbWlzZUNhcGFiaWxpdHkodGhpcylcbiAgICAgICwgJCRyZXNvbHZlICA9IGNhcGFiaWxpdHkucmVzb2x2ZTtcbiAgICAkJHJlc29sdmUoeCk7XG4gICAgcmV0dXJuIGNhcGFiaWxpdHkucHJvbWlzZTtcbiAgfVxufSk7XG4kZXhwb3J0KCRleHBvcnQuUyArICRleHBvcnQuRiAqICEoVVNFX05BVElWRSAmJiByZXF1aXJlKCcuL19pdGVyLWRldGVjdCcpKGZ1bmN0aW9uKGl0ZXIpe1xuICAkUHJvbWlzZS5hbGwoaXRlcilbJ2NhdGNoJ10oZW1wdHkpO1xufSkpLCBQUk9NSVNFLCB7XG4gIC8vIDI1LjQuNC4xIFByb21pc2UuYWxsKGl0ZXJhYmxlKVxuICBhbGw6IGZ1bmN0aW9uIGFsbChpdGVyYWJsZSl7XG4gICAgdmFyIEMgICAgICAgICAgPSB0aGlzXG4gICAgICAsIGNhcGFiaWxpdHkgPSBuZXdQcm9taXNlQ2FwYWJpbGl0eShDKVxuICAgICAgLCByZXNvbHZlICAgID0gY2FwYWJpbGl0eS5yZXNvbHZlXG4gICAgICAsIHJlamVjdCAgICAgPSBjYXBhYmlsaXR5LnJlamVjdDtcbiAgICB2YXIgYWJydXB0ID0gcGVyZm9ybShmdW5jdGlvbigpe1xuICAgICAgdmFyIHZhbHVlcyAgICA9IFtdXG4gICAgICAgICwgaW5kZXggICAgID0gMFxuICAgICAgICAsIHJlbWFpbmluZyA9IDE7XG4gICAgICBmb3JPZihpdGVyYWJsZSwgZmFsc2UsIGZ1bmN0aW9uKHByb21pc2Upe1xuICAgICAgICB2YXIgJGluZGV4ICAgICAgICA9IGluZGV4KytcbiAgICAgICAgICAsIGFscmVhZHlDYWxsZWQgPSBmYWxzZTtcbiAgICAgICAgdmFsdWVzLnB1c2godW5kZWZpbmVkKTtcbiAgICAgICAgcmVtYWluaW5nKys7XG4gICAgICAgIEMucmVzb2x2ZShwcm9taXNlKS50aGVuKGZ1bmN0aW9uKHZhbHVlKXtcbiAgICAgICAgICBpZihhbHJlYWR5Q2FsbGVkKXJldHVybjtcbiAgICAgICAgICBhbHJlYWR5Q2FsbGVkICA9IHRydWU7XG4gICAgICAgICAgdmFsdWVzWyRpbmRleF0gPSB2YWx1ZTtcbiAgICAgICAgICAtLXJlbWFpbmluZyB8fCByZXNvbHZlKHZhbHVlcyk7XG4gICAgICAgIH0sIHJlamVjdCk7XG4gICAgICB9KTtcbiAgICAgIC0tcmVtYWluaW5nIHx8IHJlc29sdmUodmFsdWVzKTtcbiAgICB9KTtcbiAgICBpZihhYnJ1cHQpcmVqZWN0KGFicnVwdC5lcnJvcik7XG4gICAgcmV0dXJuIGNhcGFiaWxpdHkucHJvbWlzZTtcbiAgfSxcbiAgLy8gMjUuNC40LjQgUHJvbWlzZS5yYWNlKGl0ZXJhYmxlKVxuICByYWNlOiBmdW5jdGlvbiByYWNlKGl0ZXJhYmxlKXtcbiAgICB2YXIgQyAgICAgICAgICA9IHRoaXNcbiAgICAgICwgY2FwYWJpbGl0eSA9IG5ld1Byb21pc2VDYXBhYmlsaXR5KEMpXG4gICAgICAsIHJlamVjdCAgICAgPSBjYXBhYmlsaXR5LnJlamVjdDtcbiAgICB2YXIgYWJydXB0ID0gcGVyZm9ybShmdW5jdGlvbigpe1xuICAgICAgZm9yT2YoaXRlcmFibGUsIGZhbHNlLCBmdW5jdGlvbihwcm9taXNlKXtcbiAgICAgICAgQy5yZXNvbHZlKHByb21pc2UpLnRoZW4oY2FwYWJpbGl0eS5yZXNvbHZlLCByZWplY3QpO1xuICAgICAgfSk7XG4gICAgfSk7XG4gICAgaWYoYWJydXB0KXJlamVjdChhYnJ1cHQuZXJyb3IpO1xuICAgIHJldHVybiBjYXBhYmlsaXR5LnByb21pc2U7XG4gIH1cbn0pOyIsIi8vIDI2LjEuMSBSZWZsZWN0LmFwcGx5KHRhcmdldCwgdGhpc0FyZ3VtZW50LCBhcmd1bWVudHNMaXN0KVxudmFyICRleHBvcnQgPSByZXF1aXJlKCcuL19leHBvcnQnKVxuICAsIF9hcHBseSAgPSBGdW5jdGlvbi5hcHBseTtcblxuJGV4cG9ydCgkZXhwb3J0LlMsICdSZWZsZWN0Jywge1xuICBhcHBseTogZnVuY3Rpb24gYXBwbHkodGFyZ2V0LCB0aGlzQXJndW1lbnQsIGFyZ3VtZW50c0xpc3Qpe1xuICAgIHJldHVybiBfYXBwbHkuY2FsbCh0YXJnZXQsIHRoaXNBcmd1bWVudCwgYXJndW1lbnRzTGlzdCk7XG4gIH1cbn0pOyIsIi8vIDI2LjEuMiBSZWZsZWN0LmNvbnN0cnVjdCh0YXJnZXQsIGFyZ3VtZW50c0xpc3QgWywgbmV3VGFyZ2V0XSlcbnZhciAkZXhwb3J0ICAgPSByZXF1aXJlKCcuL19leHBvcnQnKVxuICAsIGNyZWF0ZSAgICA9IHJlcXVpcmUoJy4vX29iamVjdC1jcmVhdGUnKVxuICAsIGFGdW5jdGlvbiA9IHJlcXVpcmUoJy4vX2EtZnVuY3Rpb24nKVxuICAsIGFuT2JqZWN0ICA9IHJlcXVpcmUoJy4vX2FuLW9iamVjdCcpXG4gICwgaXNPYmplY3QgID0gcmVxdWlyZSgnLi9faXMtb2JqZWN0JylcbiAgLCBiaW5kICAgICAgPSByZXF1aXJlKCcuL19iaW5kJyk7XG5cbi8vIE1TIEVkZ2Ugc3VwcG9ydHMgb25seSAyIGFyZ3VtZW50c1xuLy8gRkYgTmlnaHRseSBzZXRzIHRoaXJkIGFyZ3VtZW50IGFzIGBuZXcudGFyZ2V0YCwgYnV0IGRvZXMgbm90IGNyZWF0ZSBgdGhpc2AgZnJvbSBpdFxuJGV4cG9ydCgkZXhwb3J0LlMgKyAkZXhwb3J0LkYgKiByZXF1aXJlKCcuL19mYWlscycpKGZ1bmN0aW9uKCl7XG4gIGZ1bmN0aW9uIEYoKXt9XG4gIHJldHVybiAhKFJlZmxlY3QuY29uc3RydWN0KGZ1bmN0aW9uKCl7fSwgW10sIEYpIGluc3RhbmNlb2YgRik7XG59KSwgJ1JlZmxlY3QnLCB7XG4gIGNvbnN0cnVjdDogZnVuY3Rpb24gY29uc3RydWN0KFRhcmdldCwgYXJncyAvKiwgbmV3VGFyZ2V0Ki8pe1xuICAgIGFGdW5jdGlvbihUYXJnZXQpO1xuICAgIHZhciBuZXdUYXJnZXQgPSBhcmd1bWVudHMubGVuZ3RoIDwgMyA/IFRhcmdldCA6IGFGdW5jdGlvbihhcmd1bWVudHNbMl0pO1xuICAgIGlmKFRhcmdldCA9PSBuZXdUYXJnZXQpe1xuICAgICAgLy8gdy9vIGFsdGVyZWQgbmV3VGFyZ2V0LCBvcHRpbWl6YXRpb24gZm9yIDAtNCBhcmd1bWVudHNcbiAgICAgIGlmKGFyZ3MgIT0gdW5kZWZpbmVkKXN3aXRjaChhbk9iamVjdChhcmdzKS5sZW5ndGgpe1xuICAgICAgICBjYXNlIDA6IHJldHVybiBuZXcgVGFyZ2V0O1xuICAgICAgICBjYXNlIDE6IHJldHVybiBuZXcgVGFyZ2V0KGFyZ3NbMF0pO1xuICAgICAgICBjYXNlIDI6IHJldHVybiBuZXcgVGFyZ2V0KGFyZ3NbMF0sIGFyZ3NbMV0pO1xuICAgICAgICBjYXNlIDM6IHJldHVybiBuZXcgVGFyZ2V0KGFyZ3NbMF0sIGFyZ3NbMV0sIGFyZ3NbMl0pO1xuICAgICAgICBjYXNlIDQ6IHJldHVybiBuZXcgVGFyZ2V0KGFyZ3NbMF0sIGFyZ3NbMV0sIGFyZ3NbMl0sIGFyZ3NbM10pO1xuICAgICAgfVxuICAgICAgLy8gdy9vIGFsdGVyZWQgbmV3VGFyZ2V0LCBsb3Qgb2YgYXJndW1lbnRzIGNhc2VcbiAgICAgIHZhciAkYXJncyA9IFtudWxsXTtcbiAgICAgICRhcmdzLnB1c2guYXBwbHkoJGFyZ3MsIGFyZ3MpO1xuICAgICAgcmV0dXJuIG5ldyAoYmluZC5hcHBseShUYXJnZXQsICRhcmdzKSk7XG4gICAgfVxuICAgIC8vIHdpdGggYWx0ZXJlZCBuZXdUYXJnZXQsIG5vdCBzdXBwb3J0IGJ1aWx0LWluIGNvbnN0cnVjdG9yc1xuICAgIHZhciBwcm90byAgICA9IG5ld1RhcmdldC5wcm90b3R5cGVcbiAgICAgICwgaW5zdGFuY2UgPSBjcmVhdGUoaXNPYmplY3QocHJvdG8pID8gcHJvdG8gOiBPYmplY3QucHJvdG90eXBlKVxuICAgICAgLCByZXN1bHQgICA9IEZ1bmN0aW9uLmFwcGx5LmNhbGwoVGFyZ2V0LCBpbnN0YW5jZSwgYXJncyk7XG4gICAgcmV0dXJuIGlzT2JqZWN0KHJlc3VsdCkgPyByZXN1bHQgOiBpbnN0YW5jZTtcbiAgfVxufSk7IiwiLy8gMjYuMS4zIFJlZmxlY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBwcm9wZXJ0eUtleSwgYXR0cmlidXRlcylcbnZhciBkUCAgICAgICAgICA9IHJlcXVpcmUoJy4vX29iamVjdC1kcCcpXG4gICwgJGV4cG9ydCAgICAgPSByZXF1aXJlKCcuL19leHBvcnQnKVxuICAsIGFuT2JqZWN0ICAgID0gcmVxdWlyZSgnLi9fYW4tb2JqZWN0JylcbiAgLCB0b1ByaW1pdGl2ZSA9IHJlcXVpcmUoJy4vX3RvLXByaW1pdGl2ZScpO1xuXG4vLyBNUyBFZGdlIGhhcyBicm9rZW4gUmVmbGVjdC5kZWZpbmVQcm9wZXJ0eSAtIHRocm93aW5nIGluc3RlYWQgb2YgcmV0dXJuaW5nIGZhbHNlXG4kZXhwb3J0KCRleHBvcnQuUyArICRleHBvcnQuRiAqIHJlcXVpcmUoJy4vX2ZhaWxzJykoZnVuY3Rpb24oKXtcbiAgUmVmbGVjdC5kZWZpbmVQcm9wZXJ0eShkUC5mKHt9LCAxLCB7dmFsdWU6IDF9KSwgMSwge3ZhbHVlOiAyfSk7XG59KSwgJ1JlZmxlY3QnLCB7XG4gIGRlZmluZVByb3BlcnR5OiBmdW5jdGlvbiBkZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIHByb3BlcnR5S2V5LCBhdHRyaWJ1dGVzKXtcbiAgICBhbk9iamVjdCh0YXJnZXQpO1xuICAgIHByb3BlcnR5S2V5ID0gdG9QcmltaXRpdmUocHJvcGVydHlLZXksIHRydWUpO1xuICAgIGFuT2JqZWN0KGF0dHJpYnV0ZXMpO1xuICAgIHRyeSB7XG4gICAgICBkUC5mKHRhcmdldCwgcHJvcGVydHlLZXksIGF0dHJpYnV0ZXMpO1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSBjYXRjaChlKXtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH1cbn0pOyIsIi8vIDI2LjEuNCBSZWZsZWN0LmRlbGV0ZVByb3BlcnR5KHRhcmdldCwgcHJvcGVydHlLZXkpXG52YXIgJGV4cG9ydCAgPSByZXF1aXJlKCcuL19leHBvcnQnKVxuICAsIGdPUEQgICAgID0gcmVxdWlyZSgnLi9fb2JqZWN0LWdvcGQnKS5mXG4gICwgYW5PYmplY3QgPSByZXF1aXJlKCcuL19hbi1vYmplY3QnKTtcblxuJGV4cG9ydCgkZXhwb3J0LlMsICdSZWZsZWN0Jywge1xuICBkZWxldGVQcm9wZXJ0eTogZnVuY3Rpb24gZGVsZXRlUHJvcGVydHkodGFyZ2V0LCBwcm9wZXJ0eUtleSl7XG4gICAgdmFyIGRlc2MgPSBnT1BEKGFuT2JqZWN0KHRhcmdldCksIHByb3BlcnR5S2V5KTtcbiAgICByZXR1cm4gZGVzYyAmJiAhZGVzYy5jb25maWd1cmFibGUgPyBmYWxzZSA6IGRlbGV0ZSB0YXJnZXRbcHJvcGVydHlLZXldO1xuICB9XG59KTsiLCIndXNlIHN0cmljdCc7XG4vLyAyNi4xLjUgUmVmbGVjdC5lbnVtZXJhdGUodGFyZ2V0KVxudmFyICRleHBvcnQgID0gcmVxdWlyZSgnLi9fZXhwb3J0JylcbiAgLCBhbk9iamVjdCA9IHJlcXVpcmUoJy4vX2FuLW9iamVjdCcpO1xudmFyIEVudW1lcmF0ZSA9IGZ1bmN0aW9uKGl0ZXJhdGVkKXtcbiAgdGhpcy5fdCA9IGFuT2JqZWN0KGl0ZXJhdGVkKTsgLy8gdGFyZ2V0XG4gIHRoaXMuX2kgPSAwOyAgICAgICAgICAgICAgICAgIC8vIG5leHQgaW5kZXhcbiAgdmFyIGtleXMgPSB0aGlzLl9rID0gW10gICAgICAgLy8ga2V5c1xuICAgICwga2V5O1xuICBmb3Ioa2V5IGluIGl0ZXJhdGVkKWtleXMucHVzaChrZXkpO1xufTtcbnJlcXVpcmUoJy4vX2l0ZXItY3JlYXRlJykoRW51bWVyYXRlLCAnT2JqZWN0JywgZnVuY3Rpb24oKXtcbiAgdmFyIHRoYXQgPSB0aGlzXG4gICAgLCBrZXlzID0gdGhhdC5fa1xuICAgICwga2V5O1xuICBkbyB7XG4gICAgaWYodGhhdC5faSA+PSBrZXlzLmxlbmd0aClyZXR1cm4ge3ZhbHVlOiB1bmRlZmluZWQsIGRvbmU6IHRydWV9O1xuICB9IHdoaWxlKCEoKGtleSA9IGtleXNbdGhhdC5faSsrXSkgaW4gdGhhdC5fdCkpO1xuICByZXR1cm4ge3ZhbHVlOiBrZXksIGRvbmU6IGZhbHNlfTtcbn0pO1xuXG4kZXhwb3J0KCRleHBvcnQuUywgJ1JlZmxlY3QnLCB7XG4gIGVudW1lcmF0ZTogZnVuY3Rpb24gZW51bWVyYXRlKHRhcmdldCl7XG4gICAgcmV0dXJuIG5ldyBFbnVtZXJhdGUodGFyZ2V0KTtcbiAgfVxufSk7IiwiLy8gMjYuMS43IFJlZmxlY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHRhcmdldCwgcHJvcGVydHlLZXkpXG52YXIgZ09QRCAgICAgPSByZXF1aXJlKCcuL19vYmplY3QtZ29wZCcpXG4gICwgJGV4cG9ydCAgPSByZXF1aXJlKCcuL19leHBvcnQnKVxuICAsIGFuT2JqZWN0ID0gcmVxdWlyZSgnLi9fYW4tb2JqZWN0Jyk7XG5cbiRleHBvcnQoJGV4cG9ydC5TLCAnUmVmbGVjdCcsIHtcbiAgZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yOiBmdW5jdGlvbiBnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IodGFyZ2V0LCBwcm9wZXJ0eUtleSl7XG4gICAgcmV0dXJuIGdPUEQuZihhbk9iamVjdCh0YXJnZXQpLCBwcm9wZXJ0eUtleSk7XG4gIH1cbn0pOyIsIi8vIDI2LjEuOCBSZWZsZWN0LmdldFByb3RvdHlwZU9mKHRhcmdldClcbnZhciAkZXhwb3J0ICA9IHJlcXVpcmUoJy4vX2V4cG9ydCcpXG4gICwgZ2V0UHJvdG8gPSByZXF1aXJlKCcuL19vYmplY3QtZ3BvJylcbiAgLCBhbk9iamVjdCA9IHJlcXVpcmUoJy4vX2FuLW9iamVjdCcpO1xuXG4kZXhwb3J0KCRleHBvcnQuUywgJ1JlZmxlY3QnLCB7XG4gIGdldFByb3RvdHlwZU9mOiBmdW5jdGlvbiBnZXRQcm90b3R5cGVPZih0YXJnZXQpe1xuICAgIHJldHVybiBnZXRQcm90byhhbk9iamVjdCh0YXJnZXQpKTtcbiAgfVxufSk7IiwiLy8gMjYuMS42IFJlZmxlY3QuZ2V0KHRhcmdldCwgcHJvcGVydHlLZXkgWywgcmVjZWl2ZXJdKVxudmFyIGdPUEQgICAgICAgICAgID0gcmVxdWlyZSgnLi9fb2JqZWN0LWdvcGQnKVxuICAsIGdldFByb3RvdHlwZU9mID0gcmVxdWlyZSgnLi9fb2JqZWN0LWdwbycpXG4gICwgaGFzICAgICAgICAgICAgPSByZXF1aXJlKCcuL19oYXMnKVxuICAsICRleHBvcnQgICAgICAgID0gcmVxdWlyZSgnLi9fZXhwb3J0JylcbiAgLCBpc09iamVjdCAgICAgICA9IHJlcXVpcmUoJy4vX2lzLW9iamVjdCcpXG4gICwgYW5PYmplY3QgICAgICAgPSByZXF1aXJlKCcuL19hbi1vYmplY3QnKTtcblxuZnVuY3Rpb24gZ2V0KHRhcmdldCwgcHJvcGVydHlLZXkvKiwgcmVjZWl2ZXIqLyl7XG4gIHZhciByZWNlaXZlciA9IGFyZ3VtZW50cy5sZW5ndGggPCAzID8gdGFyZ2V0IDogYXJndW1lbnRzWzJdXG4gICAgLCBkZXNjLCBwcm90bztcbiAgaWYoYW5PYmplY3QodGFyZ2V0KSA9PT0gcmVjZWl2ZXIpcmV0dXJuIHRhcmdldFtwcm9wZXJ0eUtleV07XG4gIGlmKGRlc2MgPSBnT1BELmYodGFyZ2V0LCBwcm9wZXJ0eUtleSkpcmV0dXJuIGhhcyhkZXNjLCAndmFsdWUnKVxuICAgID8gZGVzYy52YWx1ZVxuICAgIDogZGVzYy5nZXQgIT09IHVuZGVmaW5lZFxuICAgICAgPyBkZXNjLmdldC5jYWxsKHJlY2VpdmVyKVxuICAgICAgOiB1bmRlZmluZWQ7XG4gIGlmKGlzT2JqZWN0KHByb3RvID0gZ2V0UHJvdG90eXBlT2YodGFyZ2V0KSkpcmV0dXJuIGdldChwcm90bywgcHJvcGVydHlLZXksIHJlY2VpdmVyKTtcbn1cblxuJGV4cG9ydCgkZXhwb3J0LlMsICdSZWZsZWN0Jywge2dldDogZ2V0fSk7IiwiLy8gMjYuMS45IFJlZmxlY3QuaGFzKHRhcmdldCwgcHJvcGVydHlLZXkpXG52YXIgJGV4cG9ydCA9IHJlcXVpcmUoJy4vX2V4cG9ydCcpO1xuXG4kZXhwb3J0KCRleHBvcnQuUywgJ1JlZmxlY3QnLCB7XG4gIGhhczogZnVuY3Rpb24gaGFzKHRhcmdldCwgcHJvcGVydHlLZXkpe1xuICAgIHJldHVybiBwcm9wZXJ0eUtleSBpbiB0YXJnZXQ7XG4gIH1cbn0pOyIsIi8vIDI2LjEuMTAgUmVmbGVjdC5pc0V4dGVuc2libGUodGFyZ2V0KVxudmFyICRleHBvcnQgICAgICAgPSByZXF1aXJlKCcuL19leHBvcnQnKVxuICAsIGFuT2JqZWN0ICAgICAgPSByZXF1aXJlKCcuL19hbi1vYmplY3QnKVxuICAsICRpc0V4dGVuc2libGUgPSBPYmplY3QuaXNFeHRlbnNpYmxlO1xuXG4kZXhwb3J0KCRleHBvcnQuUywgJ1JlZmxlY3QnLCB7XG4gIGlzRXh0ZW5zaWJsZTogZnVuY3Rpb24gaXNFeHRlbnNpYmxlKHRhcmdldCl7XG4gICAgYW5PYmplY3QodGFyZ2V0KTtcbiAgICByZXR1cm4gJGlzRXh0ZW5zaWJsZSA/ICRpc0V4dGVuc2libGUodGFyZ2V0KSA6IHRydWU7XG4gIH1cbn0pOyIsIi8vIDI2LjEuMTEgUmVmbGVjdC5vd25LZXlzKHRhcmdldClcbnZhciAkZXhwb3J0ID0gcmVxdWlyZSgnLi9fZXhwb3J0Jyk7XG5cbiRleHBvcnQoJGV4cG9ydC5TLCAnUmVmbGVjdCcsIHtvd25LZXlzOiByZXF1aXJlKCcuL19vd24ta2V5cycpfSk7IiwiLy8gMjYuMS4xMiBSZWZsZWN0LnByZXZlbnRFeHRlbnNpb25zKHRhcmdldClcbnZhciAkZXhwb3J0ICAgICAgICAgICAgPSByZXF1aXJlKCcuL19leHBvcnQnKVxuICAsIGFuT2JqZWN0ICAgICAgICAgICA9IHJlcXVpcmUoJy4vX2FuLW9iamVjdCcpXG4gICwgJHByZXZlbnRFeHRlbnNpb25zID0gT2JqZWN0LnByZXZlbnRFeHRlbnNpb25zO1xuXG4kZXhwb3J0KCRleHBvcnQuUywgJ1JlZmxlY3QnLCB7XG4gIHByZXZlbnRFeHRlbnNpb25zOiBmdW5jdGlvbiBwcmV2ZW50RXh0ZW5zaW9ucyh0YXJnZXQpe1xuICAgIGFuT2JqZWN0KHRhcmdldCk7XG4gICAgdHJ5IHtcbiAgICAgIGlmKCRwcmV2ZW50RXh0ZW5zaW9ucykkcHJldmVudEV4dGVuc2lvbnModGFyZ2V0KTtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH0gY2F0Y2goZSl7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9XG59KTsiLCIvLyAyNi4xLjE0IFJlZmxlY3Quc2V0UHJvdG90eXBlT2YodGFyZ2V0LCBwcm90bylcbnZhciAkZXhwb3J0ICA9IHJlcXVpcmUoJy4vX2V4cG9ydCcpXG4gICwgc2V0UHJvdG8gPSByZXF1aXJlKCcuL19zZXQtcHJvdG8nKTtcblxuaWYoc2V0UHJvdG8pJGV4cG9ydCgkZXhwb3J0LlMsICdSZWZsZWN0Jywge1xuICBzZXRQcm90b3R5cGVPZjogZnVuY3Rpb24gc2V0UHJvdG90eXBlT2YodGFyZ2V0LCBwcm90byl7XG4gICAgc2V0UHJvdG8uY2hlY2sodGFyZ2V0LCBwcm90byk7XG4gICAgdHJ5IHtcbiAgICAgIHNldFByb3RvLnNldCh0YXJnZXQsIHByb3RvKTtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH0gY2F0Y2goZSl7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9XG59KTsiLCIvLyAyNi4xLjEzIFJlZmxlY3Quc2V0KHRhcmdldCwgcHJvcGVydHlLZXksIFYgWywgcmVjZWl2ZXJdKVxudmFyIGRQICAgICAgICAgICAgID0gcmVxdWlyZSgnLi9fb2JqZWN0LWRwJylcbiAgLCBnT1BEICAgICAgICAgICA9IHJlcXVpcmUoJy4vX29iamVjdC1nb3BkJylcbiAgLCBnZXRQcm90b3R5cGVPZiA9IHJlcXVpcmUoJy4vX29iamVjdC1ncG8nKVxuICAsIGhhcyAgICAgICAgICAgID0gcmVxdWlyZSgnLi9faGFzJylcbiAgLCAkZXhwb3J0ICAgICAgICA9IHJlcXVpcmUoJy4vX2V4cG9ydCcpXG4gICwgY3JlYXRlRGVzYyAgICAgPSByZXF1aXJlKCcuL19wcm9wZXJ0eS1kZXNjJylcbiAgLCBhbk9iamVjdCAgICAgICA9IHJlcXVpcmUoJy4vX2FuLW9iamVjdCcpXG4gICwgaXNPYmplY3QgICAgICAgPSByZXF1aXJlKCcuL19pcy1vYmplY3QnKTtcblxuZnVuY3Rpb24gc2V0KHRhcmdldCwgcHJvcGVydHlLZXksIFYvKiwgcmVjZWl2ZXIqLyl7XG4gIHZhciByZWNlaXZlciA9IGFyZ3VtZW50cy5sZW5ndGggPCA0ID8gdGFyZ2V0IDogYXJndW1lbnRzWzNdXG4gICAgLCBvd25EZXNjICA9IGdPUEQuZihhbk9iamVjdCh0YXJnZXQpLCBwcm9wZXJ0eUtleSlcbiAgICAsIGV4aXN0aW5nRGVzY3JpcHRvciwgcHJvdG87XG4gIGlmKCFvd25EZXNjKXtcbiAgICBpZihpc09iamVjdChwcm90byA9IGdldFByb3RvdHlwZU9mKHRhcmdldCkpKXtcbiAgICAgIHJldHVybiBzZXQocHJvdG8sIHByb3BlcnR5S2V5LCBWLCByZWNlaXZlcik7XG4gICAgfVxuICAgIG93bkRlc2MgPSBjcmVhdGVEZXNjKDApO1xuICB9XG4gIGlmKGhhcyhvd25EZXNjLCAndmFsdWUnKSl7XG4gICAgaWYob3duRGVzYy53cml0YWJsZSA9PT0gZmFsc2UgfHwgIWlzT2JqZWN0KHJlY2VpdmVyKSlyZXR1cm4gZmFsc2U7XG4gICAgZXhpc3RpbmdEZXNjcmlwdG9yID0gZ09QRC5mKHJlY2VpdmVyLCBwcm9wZXJ0eUtleSkgfHwgY3JlYXRlRGVzYygwKTtcbiAgICBleGlzdGluZ0Rlc2NyaXB0b3IudmFsdWUgPSBWO1xuICAgIGRQLmYocmVjZWl2ZXIsIHByb3BlcnR5S2V5LCBleGlzdGluZ0Rlc2NyaXB0b3IpO1xuICAgIHJldHVybiB0cnVlO1xuICB9XG4gIHJldHVybiBvd25EZXNjLnNldCA9PT0gdW5kZWZpbmVkID8gZmFsc2UgOiAob3duRGVzYy5zZXQuY2FsbChyZWNlaXZlciwgViksIHRydWUpO1xufVxuXG4kZXhwb3J0KCRleHBvcnQuUywgJ1JlZmxlY3QnLCB7c2V0OiBzZXR9KTsiLCJ2YXIgZ2xvYmFsICAgICAgICAgICAgPSByZXF1aXJlKCcuL19nbG9iYWwnKVxuICAsIGluaGVyaXRJZlJlcXVpcmVkID0gcmVxdWlyZSgnLi9faW5oZXJpdC1pZi1yZXF1aXJlZCcpXG4gICwgZFAgICAgICAgICAgICAgICAgPSByZXF1aXJlKCcuL19vYmplY3QtZHAnKS5mXG4gICwgZ09QTiAgICAgICAgICAgICAgPSByZXF1aXJlKCcuL19vYmplY3QtZ29wbicpLmZcbiAgLCBpc1JlZ0V4cCAgICAgICAgICA9IHJlcXVpcmUoJy4vX2lzLXJlZ2V4cCcpXG4gICwgJGZsYWdzICAgICAgICAgICAgPSByZXF1aXJlKCcuL19mbGFncycpXG4gICwgJFJlZ0V4cCAgICAgICAgICAgPSBnbG9iYWwuUmVnRXhwXG4gICwgQmFzZSAgICAgICAgICAgICAgPSAkUmVnRXhwXG4gICwgcHJvdG8gICAgICAgICAgICAgPSAkUmVnRXhwLnByb3RvdHlwZVxuICAsIHJlMSAgICAgICAgICAgICAgID0gL2EvZ1xuICAsIHJlMiAgICAgICAgICAgICAgID0gL2EvZ1xuICAvLyBcIm5ld1wiIGNyZWF0ZXMgYSBuZXcgb2JqZWN0LCBvbGQgd2Via2l0IGJ1Z2d5IGhlcmVcbiAgLCBDT1JSRUNUX05FVyAgICAgICA9IG5ldyAkUmVnRXhwKHJlMSkgIT09IHJlMTtcblxuaWYocmVxdWlyZSgnLi9fZGVzY3JpcHRvcnMnKSAmJiAoIUNPUlJFQ1RfTkVXIHx8IHJlcXVpcmUoJy4vX2ZhaWxzJykoZnVuY3Rpb24oKXtcbiAgcmUyW3JlcXVpcmUoJy4vX3drcycpKCdtYXRjaCcpXSA9IGZhbHNlO1xuICAvLyBSZWdFeHAgY29uc3RydWN0b3IgY2FuIGFsdGVyIGZsYWdzIGFuZCBJc1JlZ0V4cCB3b3JrcyBjb3JyZWN0IHdpdGggQEBtYXRjaFxuICByZXR1cm4gJFJlZ0V4cChyZTEpICE9IHJlMSB8fCAkUmVnRXhwKHJlMikgPT0gcmUyIHx8ICRSZWdFeHAocmUxLCAnaScpICE9ICcvYS9pJztcbn0pKSl7XG4gICRSZWdFeHAgPSBmdW5jdGlvbiBSZWdFeHAocCwgZil7XG4gICAgdmFyIHRpUkUgPSB0aGlzIGluc3RhbmNlb2YgJFJlZ0V4cFxuICAgICAgLCBwaVJFID0gaXNSZWdFeHAocClcbiAgICAgICwgZmlVICA9IGYgPT09IHVuZGVmaW5lZDtcbiAgICByZXR1cm4gIXRpUkUgJiYgcGlSRSAmJiBwLmNvbnN0cnVjdG9yID09PSAkUmVnRXhwICYmIGZpVSA/IHBcbiAgICAgIDogaW5oZXJpdElmUmVxdWlyZWQoQ09SUkVDVF9ORVdcbiAgICAgICAgPyBuZXcgQmFzZShwaVJFICYmICFmaVUgPyBwLnNvdXJjZSA6IHAsIGYpXG4gICAgICAgIDogQmFzZSgocGlSRSA9IHAgaW5zdGFuY2VvZiAkUmVnRXhwKSA/IHAuc291cmNlIDogcCwgcGlSRSAmJiBmaVUgPyAkZmxhZ3MuY2FsbChwKSA6IGYpXG4gICAgICAsIHRpUkUgPyB0aGlzIDogcHJvdG8sICRSZWdFeHApO1xuICB9O1xuICB2YXIgcHJveHkgPSBmdW5jdGlvbihrZXkpe1xuICAgIGtleSBpbiAkUmVnRXhwIHx8IGRQKCRSZWdFeHAsIGtleSwge1xuICAgICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgICAgZ2V0OiBmdW5jdGlvbigpeyByZXR1cm4gQmFzZVtrZXldOyB9LFxuICAgICAgc2V0OiBmdW5jdGlvbihpdCl7IEJhc2Vba2V5XSA9IGl0OyB9XG4gICAgfSk7XG4gIH07XG4gIGZvcih2YXIga2V5cyA9IGdPUE4oQmFzZSksIGkgPSAwOyBrZXlzLmxlbmd0aCA+IGk7IClwcm94eShrZXlzW2krK10pO1xuICBwcm90by5jb25zdHJ1Y3RvciA9ICRSZWdFeHA7XG4gICRSZWdFeHAucHJvdG90eXBlID0gcHJvdG87XG4gIHJlcXVpcmUoJy4vX3JlZGVmaW5lJykoZ2xvYmFsLCAnUmVnRXhwJywgJFJlZ0V4cCk7XG59XG5cbnJlcXVpcmUoJy4vX3NldC1zcGVjaWVzJykoJ1JlZ0V4cCcpOyIsIi8vIDIxLjIuNS4zIGdldCBSZWdFeHAucHJvdG90eXBlLmZsYWdzKClcbmlmKHJlcXVpcmUoJy4vX2Rlc2NyaXB0b3JzJykgJiYgLy4vZy5mbGFncyAhPSAnZycpcmVxdWlyZSgnLi9fb2JqZWN0LWRwJykuZihSZWdFeHAucHJvdG90eXBlLCAnZmxhZ3MnLCB7XG4gIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgZ2V0OiByZXF1aXJlKCcuL19mbGFncycpXG59KTsiLCIvLyBAQG1hdGNoIGxvZ2ljXG5yZXF1aXJlKCcuL19maXgtcmUtd2tzJykoJ21hdGNoJywgMSwgZnVuY3Rpb24oZGVmaW5lZCwgTUFUQ0gsICRtYXRjaCl7XG4gIC8vIDIxLjEuMy4xMSBTdHJpbmcucHJvdG90eXBlLm1hdGNoKHJlZ2V4cClcbiAgcmV0dXJuIFtmdW5jdGlvbiBtYXRjaChyZWdleHApe1xuICAgICd1c2Ugc3RyaWN0JztcbiAgICB2YXIgTyAgPSBkZWZpbmVkKHRoaXMpXG4gICAgICAsIGZuID0gcmVnZXhwID09IHVuZGVmaW5lZCA/IHVuZGVmaW5lZCA6IHJlZ2V4cFtNQVRDSF07XG4gICAgcmV0dXJuIGZuICE9PSB1bmRlZmluZWQgPyBmbi5jYWxsKHJlZ2V4cCwgTykgOiBuZXcgUmVnRXhwKHJlZ2V4cClbTUFUQ0hdKFN0cmluZyhPKSk7XG4gIH0sICRtYXRjaF07XG59KTsiLCIvLyBAQHJlcGxhY2UgbG9naWNcbnJlcXVpcmUoJy4vX2ZpeC1yZS13a3MnKSgncmVwbGFjZScsIDIsIGZ1bmN0aW9uKGRlZmluZWQsIFJFUExBQ0UsICRyZXBsYWNlKXtcbiAgLy8gMjEuMS4zLjE0IFN0cmluZy5wcm90b3R5cGUucmVwbGFjZShzZWFyY2hWYWx1ZSwgcmVwbGFjZVZhbHVlKVxuICByZXR1cm4gW2Z1bmN0aW9uIHJlcGxhY2Uoc2VhcmNoVmFsdWUsIHJlcGxhY2VWYWx1ZSl7XG4gICAgJ3VzZSBzdHJpY3QnO1xuICAgIHZhciBPICA9IGRlZmluZWQodGhpcylcbiAgICAgICwgZm4gPSBzZWFyY2hWYWx1ZSA9PSB1bmRlZmluZWQgPyB1bmRlZmluZWQgOiBzZWFyY2hWYWx1ZVtSRVBMQUNFXTtcbiAgICByZXR1cm4gZm4gIT09IHVuZGVmaW5lZFxuICAgICAgPyBmbi5jYWxsKHNlYXJjaFZhbHVlLCBPLCByZXBsYWNlVmFsdWUpXG4gICAgICA6ICRyZXBsYWNlLmNhbGwoU3RyaW5nKE8pLCBzZWFyY2hWYWx1ZSwgcmVwbGFjZVZhbHVlKTtcbiAgfSwgJHJlcGxhY2VdO1xufSk7IiwiLy8gQEBzZWFyY2ggbG9naWNcbnJlcXVpcmUoJy4vX2ZpeC1yZS13a3MnKSgnc2VhcmNoJywgMSwgZnVuY3Rpb24oZGVmaW5lZCwgU0VBUkNILCAkc2VhcmNoKXtcbiAgLy8gMjEuMS4zLjE1IFN0cmluZy5wcm90b3R5cGUuc2VhcmNoKHJlZ2V4cClcbiAgcmV0dXJuIFtmdW5jdGlvbiBzZWFyY2gocmVnZXhwKXtcbiAgICAndXNlIHN0cmljdCc7XG4gICAgdmFyIE8gID0gZGVmaW5lZCh0aGlzKVxuICAgICAgLCBmbiA9IHJlZ2V4cCA9PSB1bmRlZmluZWQgPyB1bmRlZmluZWQgOiByZWdleHBbU0VBUkNIXTtcbiAgICByZXR1cm4gZm4gIT09IHVuZGVmaW5lZCA/IGZuLmNhbGwocmVnZXhwLCBPKSA6IG5ldyBSZWdFeHAocmVnZXhwKVtTRUFSQ0hdKFN0cmluZyhPKSk7XG4gIH0sICRzZWFyY2hdO1xufSk7IiwiLy8gQEBzcGxpdCBsb2dpY1xucmVxdWlyZSgnLi9fZml4LXJlLXdrcycpKCdzcGxpdCcsIDIsIGZ1bmN0aW9uKGRlZmluZWQsIFNQTElULCAkc3BsaXQpe1xuICAndXNlIHN0cmljdCc7XG4gIHZhciBpc1JlZ0V4cCAgID0gcmVxdWlyZSgnLi9faXMtcmVnZXhwJylcbiAgICAsIF9zcGxpdCAgICAgPSAkc3BsaXRcbiAgICAsICRwdXNoICAgICAgPSBbXS5wdXNoXG4gICAgLCAkU1BMSVQgICAgID0gJ3NwbGl0J1xuICAgICwgTEVOR1RIICAgICA9ICdsZW5ndGgnXG4gICAgLCBMQVNUX0lOREVYID0gJ2xhc3RJbmRleCc7XG4gIGlmKFxuICAgICdhYmJjJ1skU1BMSVRdKC8oYikqLylbMV0gPT0gJ2MnIHx8XG4gICAgJ3Rlc3QnWyRTUExJVF0oLyg/OikvLCAtMSlbTEVOR1RIXSAhPSA0IHx8XG4gICAgJ2FiJ1skU1BMSVRdKC8oPzphYikqLylbTEVOR1RIXSAhPSAyIHx8XG4gICAgJy4nWyRTUExJVF0oLyguPykoLj8pLylbTEVOR1RIXSAhPSA0IHx8XG4gICAgJy4nWyRTUExJVF0oLygpKCkvKVtMRU5HVEhdID4gMSB8fFxuICAgICcnWyRTUExJVF0oLy4/LylbTEVOR1RIXVxuICApe1xuICAgIHZhciBOUENHID0gLygpPz8vLmV4ZWMoJycpWzFdID09PSB1bmRlZmluZWQ7IC8vIG5vbnBhcnRpY2lwYXRpbmcgY2FwdHVyaW5nIGdyb3VwXG4gICAgLy8gYmFzZWQgb24gZXM1LXNoaW0gaW1wbGVtZW50YXRpb24sIG5lZWQgdG8gcmV3b3JrIGl0XG4gICAgJHNwbGl0ID0gZnVuY3Rpb24oc2VwYXJhdG9yLCBsaW1pdCl7XG4gICAgICB2YXIgc3RyaW5nID0gU3RyaW5nKHRoaXMpO1xuICAgICAgaWYoc2VwYXJhdG9yID09PSB1bmRlZmluZWQgJiYgbGltaXQgPT09IDApcmV0dXJuIFtdO1xuICAgICAgLy8gSWYgYHNlcGFyYXRvcmAgaXMgbm90IGEgcmVnZXgsIHVzZSBuYXRpdmUgc3BsaXRcbiAgICAgIGlmKCFpc1JlZ0V4cChzZXBhcmF0b3IpKXJldHVybiBfc3BsaXQuY2FsbChzdHJpbmcsIHNlcGFyYXRvciwgbGltaXQpO1xuICAgICAgdmFyIG91dHB1dCA9IFtdO1xuICAgICAgdmFyIGZsYWdzID0gKHNlcGFyYXRvci5pZ25vcmVDYXNlID8gJ2knIDogJycpICtcbiAgICAgICAgICAgICAgICAgIChzZXBhcmF0b3IubXVsdGlsaW5lID8gJ20nIDogJycpICtcbiAgICAgICAgICAgICAgICAgIChzZXBhcmF0b3IudW5pY29kZSA/ICd1JyA6ICcnKSArXG4gICAgICAgICAgICAgICAgICAoc2VwYXJhdG9yLnN0aWNreSA/ICd5JyA6ICcnKTtcbiAgICAgIHZhciBsYXN0TGFzdEluZGV4ID0gMDtcbiAgICAgIHZhciBzcGxpdExpbWl0ID0gbGltaXQgPT09IHVuZGVmaW5lZCA/IDQyOTQ5NjcyOTUgOiBsaW1pdCA+Pj4gMDtcbiAgICAgIC8vIE1ha2UgYGdsb2JhbGAgYW5kIGF2b2lkIGBsYXN0SW5kZXhgIGlzc3VlcyBieSB3b3JraW5nIHdpdGggYSBjb3B5XG4gICAgICB2YXIgc2VwYXJhdG9yQ29weSA9IG5ldyBSZWdFeHAoc2VwYXJhdG9yLnNvdXJjZSwgZmxhZ3MgKyAnZycpO1xuICAgICAgdmFyIHNlcGFyYXRvcjIsIG1hdGNoLCBsYXN0SW5kZXgsIGxhc3RMZW5ndGgsIGk7XG4gICAgICAvLyBEb2Vzbid0IG5lZWQgZmxhZ3MgZ3ksIGJ1dCB0aGV5IGRvbid0IGh1cnRcbiAgICAgIGlmKCFOUENHKXNlcGFyYXRvcjIgPSBuZXcgUmVnRXhwKCdeJyArIHNlcGFyYXRvckNvcHkuc291cmNlICsgJyQoPyFcXFxccyknLCBmbGFncyk7XG4gICAgICB3aGlsZShtYXRjaCA9IHNlcGFyYXRvckNvcHkuZXhlYyhzdHJpbmcpKXtcbiAgICAgICAgLy8gYHNlcGFyYXRvckNvcHkubGFzdEluZGV4YCBpcyBub3QgcmVsaWFibGUgY3Jvc3MtYnJvd3NlclxuICAgICAgICBsYXN0SW5kZXggPSBtYXRjaC5pbmRleCArIG1hdGNoWzBdW0xFTkdUSF07XG4gICAgICAgIGlmKGxhc3RJbmRleCA+IGxhc3RMYXN0SW5kZXgpe1xuICAgICAgICAgIG91dHB1dC5wdXNoKHN0cmluZy5zbGljZShsYXN0TGFzdEluZGV4LCBtYXRjaC5pbmRleCkpO1xuICAgICAgICAgIC8vIEZpeCBicm93c2VycyB3aG9zZSBgZXhlY2AgbWV0aG9kcyBkb24ndCBjb25zaXN0ZW50bHkgcmV0dXJuIGB1bmRlZmluZWRgIGZvciBOUENHXG4gICAgICAgICAgaWYoIU5QQ0cgJiYgbWF0Y2hbTEVOR1RIXSA+IDEpbWF0Y2hbMF0ucmVwbGFjZShzZXBhcmF0b3IyLCBmdW5jdGlvbigpe1xuICAgICAgICAgICAgZm9yKGkgPSAxOyBpIDwgYXJndW1lbnRzW0xFTkdUSF0gLSAyOyBpKyspaWYoYXJndW1lbnRzW2ldID09PSB1bmRlZmluZWQpbWF0Y2hbaV0gPSB1bmRlZmluZWQ7XG4gICAgICAgICAgfSk7XG4gICAgICAgICAgaWYobWF0Y2hbTEVOR1RIXSA+IDEgJiYgbWF0Y2guaW5kZXggPCBzdHJpbmdbTEVOR1RIXSkkcHVzaC5hcHBseShvdXRwdXQsIG1hdGNoLnNsaWNlKDEpKTtcbiAgICAgICAgICBsYXN0TGVuZ3RoID0gbWF0Y2hbMF1bTEVOR1RIXTtcbiAgICAgICAgICBsYXN0TGFzdEluZGV4ID0gbGFzdEluZGV4O1xuICAgICAgICAgIGlmKG91dHB1dFtMRU5HVEhdID49IHNwbGl0TGltaXQpYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgaWYoc2VwYXJhdG9yQ29weVtMQVNUX0lOREVYXSA9PT0gbWF0Y2guaW5kZXgpc2VwYXJhdG9yQ29weVtMQVNUX0lOREVYXSsrOyAvLyBBdm9pZCBhbiBpbmZpbml0ZSBsb29wXG4gICAgICB9XG4gICAgICBpZihsYXN0TGFzdEluZGV4ID09PSBzdHJpbmdbTEVOR1RIXSl7XG4gICAgICAgIGlmKGxhc3RMZW5ndGggfHwgIXNlcGFyYXRvckNvcHkudGVzdCgnJykpb3V0cHV0LnB1c2goJycpO1xuICAgICAgfSBlbHNlIG91dHB1dC5wdXNoKHN0cmluZy5zbGljZShsYXN0TGFzdEluZGV4KSk7XG4gICAgICByZXR1cm4gb3V0cHV0W0xFTkdUSF0gPiBzcGxpdExpbWl0ID8gb3V0cHV0LnNsaWNlKDAsIHNwbGl0TGltaXQpIDogb3V0cHV0O1xuICAgIH07XG4gIC8vIENoYWtyYSwgVjhcbiAgfSBlbHNlIGlmKCcwJ1skU1BMSVRdKHVuZGVmaW5lZCwgMClbTEVOR1RIXSl7XG4gICAgJHNwbGl0ID0gZnVuY3Rpb24oc2VwYXJhdG9yLCBsaW1pdCl7XG4gICAgICByZXR1cm4gc2VwYXJhdG9yID09PSB1bmRlZmluZWQgJiYgbGltaXQgPT09IDAgPyBbXSA6IF9zcGxpdC5jYWxsKHRoaXMsIHNlcGFyYXRvciwgbGltaXQpO1xuICAgIH07XG4gIH1cbiAgLy8gMjEuMS4zLjE3IFN0cmluZy5wcm90b3R5cGUuc3BsaXQoc2VwYXJhdG9yLCBsaW1pdClcbiAgcmV0dXJuIFtmdW5jdGlvbiBzcGxpdChzZXBhcmF0b3IsIGxpbWl0KXtcbiAgICB2YXIgTyAgPSBkZWZpbmVkKHRoaXMpXG4gICAgICAsIGZuID0gc2VwYXJhdG9yID09IHVuZGVmaW5lZCA/IHVuZGVmaW5lZCA6IHNlcGFyYXRvcltTUExJVF07XG4gICAgcmV0dXJuIGZuICE9PSB1bmRlZmluZWQgPyBmbi5jYWxsKHNlcGFyYXRvciwgTywgbGltaXQpIDogJHNwbGl0LmNhbGwoU3RyaW5nKE8pLCBzZXBhcmF0b3IsIGxpbWl0KTtcbiAgfSwgJHNwbGl0XTtcbn0pOyIsIid1c2Ugc3RyaWN0JztcclxucmVxdWlyZSgnLi9lczYucmVnZXhwLmZsYWdzJyk7XHJcbnZhciBhbk9iamVjdCAgICA9IHJlcXVpcmUoJy4vX2FuLW9iamVjdCcpXHJcbiAgLCAkZmxhZ3MgICAgICA9IHJlcXVpcmUoJy4vX2ZsYWdzJylcclxuICAsIERFU0NSSVBUT1JTID0gcmVxdWlyZSgnLi9fZGVzY3JpcHRvcnMnKVxyXG4gICwgVE9fU1RSSU5HICAgPSAndG9TdHJpbmcnXHJcbiAgLCAkdG9TdHJpbmcgICA9IC8uL1tUT19TVFJJTkddO1xyXG5cclxudmFyIGRlZmluZSA9IGZ1bmN0aW9uKGZuKXtcclxuICByZXF1aXJlKCcuL19yZWRlZmluZScpKFJlZ0V4cC5wcm90b3R5cGUsIFRPX1NUUklORywgZm4sIHRydWUpO1xyXG59O1xyXG5cclxuLy8gMjEuMi41LjE0IFJlZ0V4cC5wcm90b3R5cGUudG9TdHJpbmcoKVxyXG5pZihyZXF1aXJlKCcuL19mYWlscycpKGZ1bmN0aW9uKCl7IHJldHVybiAkdG9TdHJpbmcuY2FsbCh7c291cmNlOiAnYScsIGZsYWdzOiAnYid9KSAhPSAnL2EvYic7IH0pKXtcclxuICBkZWZpbmUoZnVuY3Rpb24gdG9TdHJpbmcoKXtcclxuICAgIHZhciBSID0gYW5PYmplY3QodGhpcyk7XHJcbiAgICByZXR1cm4gJy8nLmNvbmNhdChSLnNvdXJjZSwgJy8nLFxyXG4gICAgICAnZmxhZ3MnIGluIFIgPyBSLmZsYWdzIDogIURFU0NSSVBUT1JTICYmIFIgaW5zdGFuY2VvZiBSZWdFeHAgPyAkZmxhZ3MuY2FsbChSKSA6IHVuZGVmaW5lZCk7XHJcbiAgfSk7XHJcbi8vIEZGNDQtIFJlZ0V4cCN0b1N0cmluZyBoYXMgYSB3cm9uZyBuYW1lXHJcbn0gZWxzZSBpZigkdG9TdHJpbmcubmFtZSAhPSBUT19TVFJJTkcpe1xyXG4gIGRlZmluZShmdW5jdGlvbiB0b1N0cmluZygpe1xyXG4gICAgcmV0dXJuICR0b1N0cmluZy5jYWxsKHRoaXMpO1xyXG4gIH0pO1xyXG59IiwiJ3VzZSBzdHJpY3QnO1xudmFyIHN0cm9uZyA9IHJlcXVpcmUoJy4vX2NvbGxlY3Rpb24tc3Ryb25nJyk7XG5cbi8vIDIzLjIgU2V0IE9iamVjdHNcbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9fY29sbGVjdGlvbicpKCdTZXQnLCBmdW5jdGlvbihnZXQpe1xuICByZXR1cm4gZnVuY3Rpb24gU2V0KCl7IHJldHVybiBnZXQodGhpcywgYXJndW1lbnRzLmxlbmd0aCA+IDAgPyBhcmd1bWVudHNbMF0gOiB1bmRlZmluZWQpOyB9O1xufSwge1xuICAvLyAyMy4yLjMuMSBTZXQucHJvdG90eXBlLmFkZCh2YWx1ZSlcbiAgYWRkOiBmdW5jdGlvbiBhZGQodmFsdWUpe1xuICAgIHJldHVybiBzdHJvbmcuZGVmKHRoaXMsIHZhbHVlID0gdmFsdWUgPT09IDAgPyAwIDogdmFsdWUsIHZhbHVlKTtcbiAgfVxufSwgc3Ryb25nKTsiLCIndXNlIHN0cmljdCc7XG4vLyBCLjIuMy4yIFN0cmluZy5wcm90b3R5cGUuYW5jaG9yKG5hbWUpXG5yZXF1aXJlKCcuL19zdHJpbmctaHRtbCcpKCdhbmNob3InLCBmdW5jdGlvbihjcmVhdGVIVE1MKXtcbiAgcmV0dXJuIGZ1bmN0aW9uIGFuY2hvcihuYW1lKXtcbiAgICByZXR1cm4gY3JlYXRlSFRNTCh0aGlzLCAnYScsICduYW1lJywgbmFtZSk7XG4gIH1cbn0pOyIsIid1c2Ugc3RyaWN0Jztcbi8vIEIuMi4zLjMgU3RyaW5nLnByb3RvdHlwZS5iaWcoKVxucmVxdWlyZSgnLi9fc3RyaW5nLWh0bWwnKSgnYmlnJywgZnVuY3Rpb24oY3JlYXRlSFRNTCl7XG4gIHJldHVybiBmdW5jdGlvbiBiaWcoKXtcbiAgICByZXR1cm4gY3JlYXRlSFRNTCh0aGlzLCAnYmlnJywgJycsICcnKTtcbiAgfVxufSk7IiwiJ3VzZSBzdHJpY3QnO1xuLy8gQi4yLjMuNCBTdHJpbmcucHJvdG90eXBlLmJsaW5rKClcbnJlcXVpcmUoJy4vX3N0cmluZy1odG1sJykoJ2JsaW5rJywgZnVuY3Rpb24oY3JlYXRlSFRNTCl7XG4gIHJldHVybiBmdW5jdGlvbiBibGluaygpe1xuICAgIHJldHVybiBjcmVhdGVIVE1MKHRoaXMsICdibGluaycsICcnLCAnJyk7XG4gIH1cbn0pOyIsIid1c2Ugc3RyaWN0Jztcbi8vIEIuMi4zLjUgU3RyaW5nLnByb3RvdHlwZS5ib2xkKClcbnJlcXVpcmUoJy4vX3N0cmluZy1odG1sJykoJ2JvbGQnLCBmdW5jdGlvbihjcmVhdGVIVE1MKXtcbiAgcmV0dXJuIGZ1bmN0aW9uIGJvbGQoKXtcbiAgICByZXR1cm4gY3JlYXRlSFRNTCh0aGlzLCAnYicsICcnLCAnJyk7XG4gIH1cbn0pOyIsIid1c2Ugc3RyaWN0JztcbnZhciAkZXhwb3J0ID0gcmVxdWlyZSgnLi9fZXhwb3J0JylcbiAgLCAkYXQgICAgID0gcmVxdWlyZSgnLi9fc3RyaW5nLWF0JykoZmFsc2UpO1xuJGV4cG9ydCgkZXhwb3J0LlAsICdTdHJpbmcnLCB7XG4gIC8vIDIxLjEuMy4zIFN0cmluZy5wcm90b3R5cGUuY29kZVBvaW50QXQocG9zKVxuICBjb2RlUG9pbnRBdDogZnVuY3Rpb24gY29kZVBvaW50QXQocG9zKXtcbiAgICByZXR1cm4gJGF0KHRoaXMsIHBvcyk7XG4gIH1cbn0pOyIsIi8vIDIxLjEuMy42IFN0cmluZy5wcm90b3R5cGUuZW5kc1dpdGgoc2VhcmNoU3RyaW5nIFssIGVuZFBvc2l0aW9uXSlcbid1c2Ugc3RyaWN0JztcbnZhciAkZXhwb3J0ICAgPSByZXF1aXJlKCcuL19leHBvcnQnKVxuICAsIHRvTGVuZ3RoICA9IHJlcXVpcmUoJy4vX3RvLWxlbmd0aCcpXG4gICwgY29udGV4dCAgID0gcmVxdWlyZSgnLi9fc3RyaW5nLWNvbnRleHQnKVxuICAsIEVORFNfV0lUSCA9ICdlbmRzV2l0aCdcbiAgLCAkZW5kc1dpdGggPSAnJ1tFTkRTX1dJVEhdO1xuXG4kZXhwb3J0KCRleHBvcnQuUCArICRleHBvcnQuRiAqIHJlcXVpcmUoJy4vX2ZhaWxzLWlzLXJlZ2V4cCcpKEVORFNfV0lUSCksICdTdHJpbmcnLCB7XG4gIGVuZHNXaXRoOiBmdW5jdGlvbiBlbmRzV2l0aChzZWFyY2hTdHJpbmcgLyosIGVuZFBvc2l0aW9uID0gQGxlbmd0aCAqLyl7XG4gICAgdmFyIHRoYXQgPSBjb250ZXh0KHRoaXMsIHNlYXJjaFN0cmluZywgRU5EU19XSVRIKVxuICAgICAgLCBlbmRQb3NpdGlvbiA9IGFyZ3VtZW50cy5sZW5ndGggPiAxID8gYXJndW1lbnRzWzFdIDogdW5kZWZpbmVkXG4gICAgICAsIGxlbiAgICA9IHRvTGVuZ3RoKHRoYXQubGVuZ3RoKVxuICAgICAgLCBlbmQgICAgPSBlbmRQb3NpdGlvbiA9PT0gdW5kZWZpbmVkID8gbGVuIDogTWF0aC5taW4odG9MZW5ndGgoZW5kUG9zaXRpb24pLCBsZW4pXG4gICAgICAsIHNlYXJjaCA9IFN0cmluZyhzZWFyY2hTdHJpbmcpO1xuICAgIHJldHVybiAkZW5kc1dpdGhcbiAgICAgID8gJGVuZHNXaXRoLmNhbGwodGhhdCwgc2VhcmNoLCBlbmQpXG4gICAgICA6IHRoYXQuc2xpY2UoZW5kIC0gc2VhcmNoLmxlbmd0aCwgZW5kKSA9PT0gc2VhcmNoO1xuICB9XG59KTsiLCIndXNlIHN0cmljdCc7XG4vLyBCLjIuMy42IFN0cmluZy5wcm90b3R5cGUuZml4ZWQoKVxucmVxdWlyZSgnLi9fc3RyaW5nLWh0bWwnKSgnZml4ZWQnLCBmdW5jdGlvbihjcmVhdGVIVE1MKXtcbiAgcmV0dXJuIGZ1bmN0aW9uIGZpeGVkKCl7XG4gICAgcmV0dXJuIGNyZWF0ZUhUTUwodGhpcywgJ3R0JywgJycsICcnKTtcbiAgfVxufSk7IiwiJ3VzZSBzdHJpY3QnO1xuLy8gQi4yLjMuNyBTdHJpbmcucHJvdG90eXBlLmZvbnRjb2xvcihjb2xvcilcbnJlcXVpcmUoJy4vX3N0cmluZy1odG1sJykoJ2ZvbnRjb2xvcicsIGZ1bmN0aW9uKGNyZWF0ZUhUTUwpe1xuICByZXR1cm4gZnVuY3Rpb24gZm9udGNvbG9yKGNvbG9yKXtcbiAgICByZXR1cm4gY3JlYXRlSFRNTCh0aGlzLCAnZm9udCcsICdjb2xvcicsIGNvbG9yKTtcbiAgfVxufSk7IiwiJ3VzZSBzdHJpY3QnO1xuLy8gQi4yLjMuOCBTdHJpbmcucHJvdG90eXBlLmZvbnRzaXplKHNpemUpXG5yZXF1aXJlKCcuL19zdHJpbmctaHRtbCcpKCdmb250c2l6ZScsIGZ1bmN0aW9uKGNyZWF0ZUhUTUwpe1xuICByZXR1cm4gZnVuY3Rpb24gZm9udHNpemUoc2l6ZSl7XG4gICAgcmV0dXJuIGNyZWF0ZUhUTUwodGhpcywgJ2ZvbnQnLCAnc2l6ZScsIHNpemUpO1xuICB9XG59KTsiLCJ2YXIgJGV4cG9ydCAgICAgICAgPSByZXF1aXJlKCcuL19leHBvcnQnKVxuICAsIHRvSW5kZXggICAgICAgID0gcmVxdWlyZSgnLi9fdG8taW5kZXgnKVxuICAsIGZyb21DaGFyQ29kZSAgID0gU3RyaW5nLmZyb21DaGFyQ29kZVxuICAsICRmcm9tQ29kZVBvaW50ID0gU3RyaW5nLmZyb21Db2RlUG9pbnQ7XG5cbi8vIGxlbmd0aCBzaG91bGQgYmUgMSwgb2xkIEZGIHByb2JsZW1cbiRleHBvcnQoJGV4cG9ydC5TICsgJGV4cG9ydC5GICogKCEhJGZyb21Db2RlUG9pbnQgJiYgJGZyb21Db2RlUG9pbnQubGVuZ3RoICE9IDEpLCAnU3RyaW5nJywge1xuICAvLyAyMS4xLjIuMiBTdHJpbmcuZnJvbUNvZGVQb2ludCguLi5jb2RlUG9pbnRzKVxuICBmcm9tQ29kZVBvaW50OiBmdW5jdGlvbiBmcm9tQ29kZVBvaW50KHgpeyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVudXNlZC12YXJzXG4gICAgdmFyIHJlcyAgPSBbXVxuICAgICAgLCBhTGVuID0gYXJndW1lbnRzLmxlbmd0aFxuICAgICAgLCBpICAgID0gMFxuICAgICAgLCBjb2RlO1xuICAgIHdoaWxlKGFMZW4gPiBpKXtcbiAgICAgIGNvZGUgPSArYXJndW1lbnRzW2krK107XG4gICAgICBpZih0b0luZGV4KGNvZGUsIDB4MTBmZmZmKSAhPT0gY29kZSl0aHJvdyBSYW5nZUVycm9yKGNvZGUgKyAnIGlzIG5vdCBhIHZhbGlkIGNvZGUgcG9pbnQnKTtcbiAgICAgIHJlcy5wdXNoKGNvZGUgPCAweDEwMDAwXG4gICAgICAgID8gZnJvbUNoYXJDb2RlKGNvZGUpXG4gICAgICAgIDogZnJvbUNoYXJDb2RlKCgoY29kZSAtPSAweDEwMDAwKSA+PiAxMCkgKyAweGQ4MDAsIGNvZGUgJSAweDQwMCArIDB4ZGMwMClcbiAgICAgICk7XG4gICAgfSByZXR1cm4gcmVzLmpvaW4oJycpO1xuICB9XG59KTsiLCIvLyAyMS4xLjMuNyBTdHJpbmcucHJvdG90eXBlLmluY2x1ZGVzKHNlYXJjaFN0cmluZywgcG9zaXRpb24gPSAwKVxuJ3VzZSBzdHJpY3QnO1xudmFyICRleHBvcnQgID0gcmVxdWlyZSgnLi9fZXhwb3J0JylcbiAgLCBjb250ZXh0ICA9IHJlcXVpcmUoJy4vX3N0cmluZy1jb250ZXh0JylcbiAgLCBJTkNMVURFUyA9ICdpbmNsdWRlcyc7XG5cbiRleHBvcnQoJGV4cG9ydC5QICsgJGV4cG9ydC5GICogcmVxdWlyZSgnLi9fZmFpbHMtaXMtcmVnZXhwJykoSU5DTFVERVMpLCAnU3RyaW5nJywge1xuICBpbmNsdWRlczogZnVuY3Rpb24gaW5jbHVkZXMoc2VhcmNoU3RyaW5nIC8qLCBwb3NpdGlvbiA9IDAgKi8pe1xuICAgIHJldHVybiAhIX5jb250ZXh0KHRoaXMsIHNlYXJjaFN0cmluZywgSU5DTFVERVMpXG4gICAgICAuaW5kZXhPZihzZWFyY2hTdHJpbmcsIGFyZ3VtZW50cy5sZW5ndGggPiAxID8gYXJndW1lbnRzWzFdIDogdW5kZWZpbmVkKTtcbiAgfVxufSk7IiwiJ3VzZSBzdHJpY3QnO1xuLy8gQi4yLjMuOSBTdHJpbmcucHJvdG90eXBlLml0YWxpY3MoKVxucmVxdWlyZSgnLi9fc3RyaW5nLWh0bWwnKSgnaXRhbGljcycsIGZ1bmN0aW9uKGNyZWF0ZUhUTUwpe1xuICByZXR1cm4gZnVuY3Rpb24gaXRhbGljcygpe1xuICAgIHJldHVybiBjcmVhdGVIVE1MKHRoaXMsICdpJywgJycsICcnKTtcbiAgfVxufSk7IiwiJ3VzZSBzdHJpY3QnO1xudmFyICRhdCAgPSByZXF1aXJlKCcuL19zdHJpbmctYXQnKSh0cnVlKTtcblxuLy8gMjEuMS4zLjI3IFN0cmluZy5wcm90b3R5cGVbQEBpdGVyYXRvcl0oKVxucmVxdWlyZSgnLi9faXRlci1kZWZpbmUnKShTdHJpbmcsICdTdHJpbmcnLCBmdW5jdGlvbihpdGVyYXRlZCl7XG4gIHRoaXMuX3QgPSBTdHJpbmcoaXRlcmF0ZWQpOyAvLyB0YXJnZXRcbiAgdGhpcy5faSA9IDA7ICAgICAgICAgICAgICAgIC8vIG5leHQgaW5kZXhcbi8vIDIxLjEuNS4yLjEgJVN0cmluZ0l0ZXJhdG9yUHJvdG90eXBlJS5uZXh0KClcbn0sIGZ1bmN0aW9uKCl7XG4gIHZhciBPICAgICA9IHRoaXMuX3RcbiAgICAsIGluZGV4ID0gdGhpcy5faVxuICAgICwgcG9pbnQ7XG4gIGlmKGluZGV4ID49IE8ubGVuZ3RoKXJldHVybiB7dmFsdWU6IHVuZGVmaW5lZCwgZG9uZTogdHJ1ZX07XG4gIHBvaW50ID0gJGF0KE8sIGluZGV4KTtcbiAgdGhpcy5faSArPSBwb2ludC5sZW5ndGg7XG4gIHJldHVybiB7dmFsdWU6IHBvaW50LCBkb25lOiBmYWxzZX07XG59KTsiLCIndXNlIHN0cmljdCc7XG4vLyBCLjIuMy4xMCBTdHJpbmcucHJvdG90eXBlLmxpbmsodXJsKVxucmVxdWlyZSgnLi9fc3RyaW5nLWh0bWwnKSgnbGluaycsIGZ1bmN0aW9uKGNyZWF0ZUhUTUwpe1xuICByZXR1cm4gZnVuY3Rpb24gbGluayh1cmwpe1xuICAgIHJldHVybiBjcmVhdGVIVE1MKHRoaXMsICdhJywgJ2hyZWYnLCB1cmwpO1xuICB9XG59KTsiLCJ2YXIgJGV4cG9ydCAgID0gcmVxdWlyZSgnLi9fZXhwb3J0JylcbiAgLCB0b0lPYmplY3QgPSByZXF1aXJlKCcuL190by1pb2JqZWN0JylcbiAgLCB0b0xlbmd0aCAgPSByZXF1aXJlKCcuL190by1sZW5ndGgnKTtcblxuJGV4cG9ydCgkZXhwb3J0LlMsICdTdHJpbmcnLCB7XG4gIC8vIDIxLjEuMi40IFN0cmluZy5yYXcoY2FsbFNpdGUsIC4uLnN1YnN0aXR1dGlvbnMpXG4gIHJhdzogZnVuY3Rpb24gcmF3KGNhbGxTaXRlKXtcbiAgICB2YXIgdHBsICA9IHRvSU9iamVjdChjYWxsU2l0ZS5yYXcpXG4gICAgICAsIGxlbiAgPSB0b0xlbmd0aCh0cGwubGVuZ3RoKVxuICAgICAgLCBhTGVuID0gYXJndW1lbnRzLmxlbmd0aFxuICAgICAgLCByZXMgID0gW11cbiAgICAgICwgaSAgICA9IDA7XG4gICAgd2hpbGUobGVuID4gaSl7XG4gICAgICByZXMucHVzaChTdHJpbmcodHBsW2krK10pKTtcbiAgICAgIGlmKGkgPCBhTGVuKXJlcy5wdXNoKFN0cmluZyhhcmd1bWVudHNbaV0pKTtcbiAgICB9IHJldHVybiByZXMuam9pbignJyk7XG4gIH1cbn0pOyIsInZhciAkZXhwb3J0ID0gcmVxdWlyZSgnLi9fZXhwb3J0Jyk7XG5cbiRleHBvcnQoJGV4cG9ydC5QLCAnU3RyaW5nJywge1xuICAvLyAyMS4xLjMuMTMgU3RyaW5nLnByb3RvdHlwZS5yZXBlYXQoY291bnQpXG4gIHJlcGVhdDogcmVxdWlyZSgnLi9fc3RyaW5nLXJlcGVhdCcpXG59KTsiLCIndXNlIHN0cmljdCc7XG4vLyBCLjIuMy4xMSBTdHJpbmcucHJvdG90eXBlLnNtYWxsKClcbnJlcXVpcmUoJy4vX3N0cmluZy1odG1sJykoJ3NtYWxsJywgZnVuY3Rpb24oY3JlYXRlSFRNTCl7XG4gIHJldHVybiBmdW5jdGlvbiBzbWFsbCgpe1xuICAgIHJldHVybiBjcmVhdGVIVE1MKHRoaXMsICdzbWFsbCcsICcnLCAnJyk7XG4gIH1cbn0pOyIsIi8vIDIxLjEuMy4xOCBTdHJpbmcucHJvdG90eXBlLnN0YXJ0c1dpdGgoc2VhcmNoU3RyaW5nIFssIHBvc2l0aW9uIF0pXG4ndXNlIHN0cmljdCc7XG52YXIgJGV4cG9ydCAgICAgPSByZXF1aXJlKCcuL19leHBvcnQnKVxuICAsIHRvTGVuZ3RoICAgID0gcmVxdWlyZSgnLi9fdG8tbGVuZ3RoJylcbiAgLCBjb250ZXh0ICAgICA9IHJlcXVpcmUoJy4vX3N0cmluZy1jb250ZXh0JylcbiAgLCBTVEFSVFNfV0lUSCA9ICdzdGFydHNXaXRoJ1xuICAsICRzdGFydHNXaXRoID0gJydbU1RBUlRTX1dJVEhdO1xuXG4kZXhwb3J0KCRleHBvcnQuUCArICRleHBvcnQuRiAqIHJlcXVpcmUoJy4vX2ZhaWxzLWlzLXJlZ2V4cCcpKFNUQVJUU19XSVRIKSwgJ1N0cmluZycsIHtcbiAgc3RhcnRzV2l0aDogZnVuY3Rpb24gc3RhcnRzV2l0aChzZWFyY2hTdHJpbmcgLyosIHBvc2l0aW9uID0gMCAqLyl7XG4gICAgdmFyIHRoYXQgICA9IGNvbnRleHQodGhpcywgc2VhcmNoU3RyaW5nLCBTVEFSVFNfV0lUSClcbiAgICAgICwgaW5kZXggID0gdG9MZW5ndGgoTWF0aC5taW4oYXJndW1lbnRzLmxlbmd0aCA+IDEgPyBhcmd1bWVudHNbMV0gOiB1bmRlZmluZWQsIHRoYXQubGVuZ3RoKSlcbiAgICAgICwgc2VhcmNoID0gU3RyaW5nKHNlYXJjaFN0cmluZyk7XG4gICAgcmV0dXJuICRzdGFydHNXaXRoXG4gICAgICA/ICRzdGFydHNXaXRoLmNhbGwodGhhdCwgc2VhcmNoLCBpbmRleClcbiAgICAgIDogdGhhdC5zbGljZShpbmRleCwgaW5kZXggKyBzZWFyY2gubGVuZ3RoKSA9PT0gc2VhcmNoO1xuICB9XG59KTsiLCIndXNlIHN0cmljdCc7XG4vLyBCLjIuMy4xMiBTdHJpbmcucHJvdG90eXBlLnN0cmlrZSgpXG5yZXF1aXJlKCcuL19zdHJpbmctaHRtbCcpKCdzdHJpa2UnLCBmdW5jdGlvbihjcmVhdGVIVE1MKXtcbiAgcmV0dXJuIGZ1bmN0aW9uIHN0cmlrZSgpe1xuICAgIHJldHVybiBjcmVhdGVIVE1MKHRoaXMsICdzdHJpa2UnLCAnJywgJycpO1xuICB9XG59KTsiLCIndXNlIHN0cmljdCc7XG4vLyBCLjIuMy4xMyBTdHJpbmcucHJvdG90eXBlLnN1YigpXG5yZXF1aXJlKCcuL19zdHJpbmctaHRtbCcpKCdzdWInLCBmdW5jdGlvbihjcmVhdGVIVE1MKXtcbiAgcmV0dXJuIGZ1bmN0aW9uIHN1Yigpe1xuICAgIHJldHVybiBjcmVhdGVIVE1MKHRoaXMsICdzdWInLCAnJywgJycpO1xuICB9XG59KTsiLCIndXNlIHN0cmljdCc7XG4vLyBCLjIuMy4xNCBTdHJpbmcucHJvdG90eXBlLnN1cCgpXG5yZXF1aXJlKCcuL19zdHJpbmctaHRtbCcpKCdzdXAnLCBmdW5jdGlvbihjcmVhdGVIVE1MKXtcbiAgcmV0dXJuIGZ1bmN0aW9uIHN1cCgpe1xuICAgIHJldHVybiBjcmVhdGVIVE1MKHRoaXMsICdzdXAnLCAnJywgJycpO1xuICB9XG59KTsiLCIndXNlIHN0cmljdCc7XG4vLyAyMS4xLjMuMjUgU3RyaW5nLnByb3RvdHlwZS50cmltKClcbnJlcXVpcmUoJy4vX3N0cmluZy10cmltJykoJ3RyaW0nLCBmdW5jdGlvbigkdHJpbSl7XG4gIHJldHVybiBmdW5jdGlvbiB0cmltKCl7XG4gICAgcmV0dXJuICR0cmltKHRoaXMsIDMpO1xuICB9O1xufSk7IiwiJ3VzZSBzdHJpY3QnO1xuLy8gRUNNQVNjcmlwdCA2IHN5bWJvbHMgc2hpbVxudmFyIGdsb2JhbCAgICAgICAgID0gcmVxdWlyZSgnLi9fZ2xvYmFsJylcbiAgLCBjb3JlICAgICAgICAgICA9IHJlcXVpcmUoJy4vX2NvcmUnKVxuICAsIGhhcyAgICAgICAgICAgID0gcmVxdWlyZSgnLi9faGFzJylcbiAgLCBERVNDUklQVE9SUyAgICA9IHJlcXVpcmUoJy4vX2Rlc2NyaXB0b3JzJylcbiAgLCAkZXhwb3J0ICAgICAgICA9IHJlcXVpcmUoJy4vX2V4cG9ydCcpXG4gICwgcmVkZWZpbmUgICAgICAgPSByZXF1aXJlKCcuL19yZWRlZmluZScpXG4gICwgTUVUQSAgICAgICAgICAgPSByZXF1aXJlKCcuL19tZXRhJykuS0VZXG4gICwgJGZhaWxzICAgICAgICAgPSByZXF1aXJlKCcuL19mYWlscycpXG4gICwgc2hhcmVkICAgICAgICAgPSByZXF1aXJlKCcuL19zaGFyZWQnKVxuICAsIHNldFRvU3RyaW5nVGFnID0gcmVxdWlyZSgnLi9fc2V0LXRvLXN0cmluZy10YWcnKVxuICAsIHVpZCAgICAgICAgICAgID0gcmVxdWlyZSgnLi9fdWlkJylcbiAgLCB3a3MgICAgICAgICAgICA9IHJlcXVpcmUoJy4vX3drcycpXG4gICwga2V5T2YgICAgICAgICAgPSByZXF1aXJlKCcuL19rZXlvZicpXG4gICwgZW51bUtleXMgICAgICAgPSByZXF1aXJlKCcuL19lbnVtLWtleXMnKVxuICAsIGlzQXJyYXkgICAgICAgID0gcmVxdWlyZSgnLi9faXMtYXJyYXknKVxuICAsIGFuT2JqZWN0ICAgICAgID0gcmVxdWlyZSgnLi9fYW4tb2JqZWN0JylcbiAgLCB0b0lPYmplY3QgICAgICA9IHJlcXVpcmUoJy4vX3RvLWlvYmplY3QnKVxuICAsIHRvUHJpbWl0aXZlICAgID0gcmVxdWlyZSgnLi9fdG8tcHJpbWl0aXZlJylcbiAgLCBjcmVhdGVEZXNjICAgICA9IHJlcXVpcmUoJy4vX3Byb3BlcnR5LWRlc2MnKVxuICAsIF9jcmVhdGUgICAgICAgID0gcmVxdWlyZSgnLi9fb2JqZWN0LWNyZWF0ZScpXG4gICwgZ09QTkV4dCAgICAgICAgPSByZXF1aXJlKCcuL19vYmplY3QtZ29wbi1leHQnKVxuICAsICRHT1BEICAgICAgICAgID0gcmVxdWlyZSgnLi9fb2JqZWN0LWdvcGQnKVxuICAsICREUCAgICAgICAgICAgID0gcmVxdWlyZSgnLi9fb2JqZWN0LWRwJylcbiAgLCBnT1BEICAgICAgICAgICA9ICRHT1BELmZcbiAgLCBkUCAgICAgICAgICAgICA9ICREUC5mXG4gICwgZ09QTiAgICAgICAgICAgPSBnT1BORXh0LmZcbiAgLCAkU3ltYm9sICAgICAgICA9IGdsb2JhbC5TeW1ib2xcbiAgLCAkSlNPTiAgICAgICAgICA9IGdsb2JhbC5KU09OXG4gICwgX3N0cmluZ2lmeSAgICAgPSAkSlNPTiAmJiAkSlNPTi5zdHJpbmdpZnlcbiAgLCBzZXR0ZXIgICAgICAgICA9IGZhbHNlXG4gICwgUFJPVE9UWVBFICAgICAgPSAncHJvdG90eXBlJ1xuICAsIEhJRERFTiAgICAgICAgID0gd2tzKCdfaGlkZGVuJylcbiAgLCBUT19QUklNSVRJVkUgICA9IHdrcygndG9QcmltaXRpdmUnKVxuICAsIGlzRW51bSAgICAgICAgID0ge30ucHJvcGVydHlJc0VudW1lcmFibGVcbiAgLCBTeW1ib2xSZWdpc3RyeSA9IHNoYXJlZCgnc3ltYm9sLXJlZ2lzdHJ5JylcbiAgLCBBbGxTeW1ib2xzICAgICA9IHNoYXJlZCgnc3ltYm9scycpXG4gICwgT2JqZWN0UHJvdG8gICAgPSBPYmplY3RbUFJPVE9UWVBFXVxuICAsIFVTRV9OQVRJVkUgICAgID0gdHlwZW9mICRTeW1ib2wgPT0gJ2Z1bmN0aW9uJ1xuICAsIFFPYmplY3QgICAgICAgID0gZ2xvYmFsLlFPYmplY3Q7XG5cbi8vIGZhbGxiYWNrIGZvciBvbGQgQW5kcm9pZCwgaHR0cHM6Ly9jb2RlLmdvb2dsZS5jb20vcC92OC9pc3N1ZXMvZGV0YWlsP2lkPTY4N1xudmFyIHNldFN5bWJvbERlc2MgPSBERVNDUklQVE9SUyAmJiAkZmFpbHMoZnVuY3Rpb24oKXtcbiAgcmV0dXJuIF9jcmVhdGUoZFAoe30sICdhJywge1xuICAgIGdldDogZnVuY3Rpb24oKXsgcmV0dXJuIGRQKHRoaXMsICdhJywge3ZhbHVlOiA3fSkuYTsgfVxuICB9KSkuYSAhPSA3O1xufSkgPyBmdW5jdGlvbihpdCwga2V5LCBEKXtcbiAgdmFyIHByb3RvRGVzYyA9IGdPUEQoT2JqZWN0UHJvdG8sIGtleSk7XG4gIGlmKHByb3RvRGVzYylkZWxldGUgT2JqZWN0UHJvdG9ba2V5XTtcbiAgZFAoaXQsIGtleSwgRCk7XG4gIGlmKHByb3RvRGVzYyAmJiBpdCAhPT0gT2JqZWN0UHJvdG8pZFAoT2JqZWN0UHJvdG8sIGtleSwgcHJvdG9EZXNjKTtcbn0gOiBkUDtcblxudmFyIHdyYXAgPSBmdW5jdGlvbih0YWcpe1xuICB2YXIgc3ltID0gQWxsU3ltYm9sc1t0YWddID0gX2NyZWF0ZSgkU3ltYm9sW1BST1RPVFlQRV0pO1xuICBzeW0uX2sgPSB0YWc7XG4gIERFU0NSSVBUT1JTICYmIHNldHRlciAmJiBzZXRTeW1ib2xEZXNjKE9iamVjdFByb3RvLCB0YWcsIHtcbiAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgc2V0OiBmdW5jdGlvbih2YWx1ZSl7XG4gICAgICBpZihoYXModGhpcywgSElEREVOKSAmJiBoYXModGhpc1tISURERU5dLCB0YWcpKXRoaXNbSElEREVOXVt0YWddID0gZmFsc2U7XG4gICAgICBzZXRTeW1ib2xEZXNjKHRoaXMsIHRhZywgY3JlYXRlRGVzYygxLCB2YWx1ZSkpO1xuICAgIH1cbiAgfSk7XG4gIHJldHVybiBzeW07XG59O1xuXG52YXIgaXNTeW1ib2wgPSBVU0VfTkFUSVZFICYmIHR5cGVvZiAkU3ltYm9sLml0ZXJhdG9yID09ICdzeW1ib2wnID8gZnVuY3Rpb24oaXQpe1xuICByZXR1cm4gdHlwZW9mIGl0ID09ICdzeW1ib2wnO1xufSA6IGZ1bmN0aW9uKGl0KXtcbiAgcmV0dXJuIGl0IGluc3RhbmNlb2YgJFN5bWJvbDtcbn07XG5cbnZhciAkZGVmaW5lUHJvcGVydHkgPSBmdW5jdGlvbiBkZWZpbmVQcm9wZXJ0eShpdCwga2V5LCBEKXtcbiAgYW5PYmplY3QoaXQpO1xuICBrZXkgPSB0b1ByaW1pdGl2ZShrZXksIHRydWUpO1xuICBhbk9iamVjdChEKTtcbiAgaWYoaGFzKEFsbFN5bWJvbHMsIGtleSkpe1xuICAgIGlmKCFELmVudW1lcmFibGUpe1xuICAgICAgaWYoIWhhcyhpdCwgSElEREVOKSlkUChpdCwgSElEREVOLCBjcmVhdGVEZXNjKDEsIHt9KSk7XG4gICAgICBpdFtISURERU5dW2tleV0gPSB0cnVlO1xuICAgIH0gZWxzZSB7XG4gICAgICBpZihoYXMoaXQsIEhJRERFTikgJiYgaXRbSElEREVOXVtrZXldKWl0W0hJRERFTl1ba2V5XSA9IGZhbHNlO1xuICAgICAgRCA9IF9jcmVhdGUoRCwge2VudW1lcmFibGU6IGNyZWF0ZURlc2MoMCwgZmFsc2UpfSk7XG4gICAgfSByZXR1cm4gc2V0U3ltYm9sRGVzYyhpdCwga2V5LCBEKTtcbiAgfSByZXR1cm4gZFAoaXQsIGtleSwgRCk7XG59O1xudmFyICRkZWZpbmVQcm9wZXJ0aWVzID0gZnVuY3Rpb24gZGVmaW5lUHJvcGVydGllcyhpdCwgUCl7XG4gIGFuT2JqZWN0KGl0KTtcbiAgdmFyIGtleXMgPSBlbnVtS2V5cyhQID0gdG9JT2JqZWN0KFApKVxuICAgICwgaSAgICA9IDBcbiAgICAsIGwgPSBrZXlzLmxlbmd0aFxuICAgICwga2V5O1xuICB3aGlsZShsID4gaSkkZGVmaW5lUHJvcGVydHkoaXQsIGtleSA9IGtleXNbaSsrXSwgUFtrZXldKTtcbiAgcmV0dXJuIGl0O1xufTtcbnZhciAkY3JlYXRlID0gZnVuY3Rpb24gY3JlYXRlKGl0LCBQKXtcbiAgcmV0dXJuIFAgPT09IHVuZGVmaW5lZCA/IF9jcmVhdGUoaXQpIDogJGRlZmluZVByb3BlcnRpZXMoX2NyZWF0ZShpdCksIFApO1xufTtcbnZhciAkcHJvcGVydHlJc0VudW1lcmFibGUgPSBmdW5jdGlvbiBwcm9wZXJ0eUlzRW51bWVyYWJsZShrZXkpe1xuICB2YXIgRSA9IGlzRW51bS5jYWxsKHRoaXMsIGtleSA9IHRvUHJpbWl0aXZlKGtleSwgdHJ1ZSkpO1xuICByZXR1cm4gRSB8fCAhaGFzKHRoaXMsIGtleSkgfHwgIWhhcyhBbGxTeW1ib2xzLCBrZXkpIHx8IGhhcyh0aGlzLCBISURERU4pICYmIHRoaXNbSElEREVOXVtrZXldID8gRSA6IHRydWU7XG59O1xudmFyICRnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IgPSBmdW5jdGlvbiBnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IoaXQsIGtleSl7XG4gIHZhciBEID0gZ09QRChpdCA9IHRvSU9iamVjdChpdCksIGtleSA9IHRvUHJpbWl0aXZlKGtleSwgdHJ1ZSkpO1xuICBpZihEICYmIGhhcyhBbGxTeW1ib2xzLCBrZXkpICYmICEoaGFzKGl0LCBISURERU4pICYmIGl0W0hJRERFTl1ba2V5XSkpRC5lbnVtZXJhYmxlID0gdHJ1ZTtcbiAgcmV0dXJuIEQ7XG59O1xudmFyICRnZXRPd25Qcm9wZXJ0eU5hbWVzID0gZnVuY3Rpb24gZ2V0T3duUHJvcGVydHlOYW1lcyhpdCl7XG4gIHZhciBuYW1lcyAgPSBnT1BOKHRvSU9iamVjdChpdCkpXG4gICAgLCByZXN1bHQgPSBbXVxuICAgICwgaSAgICAgID0gMFxuICAgICwga2V5O1xuICB3aGlsZShuYW1lcy5sZW5ndGggPiBpKWlmKCFoYXMoQWxsU3ltYm9scywga2V5ID0gbmFtZXNbaSsrXSkgJiYga2V5ICE9IEhJRERFTiAmJiBrZXkgIT0gTUVUQSlyZXN1bHQucHVzaChrZXkpO1xuICByZXR1cm4gcmVzdWx0O1xufTtcbnZhciAkZ2V0T3duUHJvcGVydHlTeW1ib2xzID0gZnVuY3Rpb24gZ2V0T3duUHJvcGVydHlTeW1ib2xzKGl0KXtcbiAgdmFyIG5hbWVzICA9IGdPUE4odG9JT2JqZWN0KGl0KSlcbiAgICAsIHJlc3VsdCA9IFtdXG4gICAgLCBpICAgICAgPSAwXG4gICAgLCBrZXk7XG4gIHdoaWxlKG5hbWVzLmxlbmd0aCA+IGkpaWYoaGFzKEFsbFN5bWJvbHMsIGtleSA9IG5hbWVzW2krK10pKXJlc3VsdC5wdXNoKEFsbFN5bWJvbHNba2V5XSk7XG4gIHJldHVybiByZXN1bHQ7XG59O1xudmFyICRzdHJpbmdpZnkgPSBmdW5jdGlvbiBzdHJpbmdpZnkoaXQpe1xuICBpZihpdCA9PT0gdW5kZWZpbmVkIHx8IGlzU3ltYm9sKGl0KSlyZXR1cm47IC8vIElFOCByZXR1cm5zIHN0cmluZyBvbiB1bmRlZmluZWRcbiAgdmFyIGFyZ3MgPSBbaXRdXG4gICAgLCBpICAgID0gMVxuICAgICwgcmVwbGFjZXIsICRyZXBsYWNlcjtcbiAgd2hpbGUoYXJndW1lbnRzLmxlbmd0aCA+IGkpYXJncy5wdXNoKGFyZ3VtZW50c1tpKytdKTtcbiAgcmVwbGFjZXIgPSBhcmdzWzFdO1xuICBpZih0eXBlb2YgcmVwbGFjZXIgPT0gJ2Z1bmN0aW9uJykkcmVwbGFjZXIgPSByZXBsYWNlcjtcbiAgaWYoJHJlcGxhY2VyIHx8ICFpc0FycmF5KHJlcGxhY2VyKSlyZXBsYWNlciA9IGZ1bmN0aW9uKGtleSwgdmFsdWUpe1xuICAgIGlmKCRyZXBsYWNlcil2YWx1ZSA9ICRyZXBsYWNlci5jYWxsKHRoaXMsIGtleSwgdmFsdWUpO1xuICAgIGlmKCFpc1N5bWJvbCh2YWx1ZSkpcmV0dXJuIHZhbHVlO1xuICB9O1xuICBhcmdzWzFdID0gcmVwbGFjZXI7XG4gIHJldHVybiBfc3RyaW5naWZ5LmFwcGx5KCRKU09OLCBhcmdzKTtcbn07XG52YXIgQlVHR1lfSlNPTiA9ICRmYWlscyhmdW5jdGlvbigpe1xuICB2YXIgUyA9ICRTeW1ib2woKTtcbiAgLy8gTVMgRWRnZSBjb252ZXJ0cyBzeW1ib2wgdmFsdWVzIHRvIEpTT04gYXMge31cbiAgLy8gV2ViS2l0IGNvbnZlcnRzIHN5bWJvbCB2YWx1ZXMgdG8gSlNPTiBhcyBudWxsXG4gIC8vIFY4IHRocm93cyBvbiBib3hlZCBzeW1ib2xzXG4gIHJldHVybiBfc3RyaW5naWZ5KFtTXSkgIT0gJ1tudWxsXScgfHwgX3N0cmluZ2lmeSh7YTogU30pICE9ICd7fScgfHwgX3N0cmluZ2lmeShPYmplY3QoUykpICE9ICd7fSc7XG59KTtcblxuLy8gMTkuNC4xLjEgU3ltYm9sKFtkZXNjcmlwdGlvbl0pXG5pZighVVNFX05BVElWRSl7XG4gICRTeW1ib2wgPSBmdW5jdGlvbiBTeW1ib2woKXtcbiAgICBpZih0aGlzIGluc3RhbmNlb2YgJFN5bWJvbCl0aHJvdyBUeXBlRXJyb3IoJ1N5bWJvbCBpcyBub3QgYSBjb25zdHJ1Y3RvciEnKTtcbiAgICByZXR1cm4gd3JhcCh1aWQoYXJndW1lbnRzLmxlbmd0aCA+IDAgPyBhcmd1bWVudHNbMF0gOiB1bmRlZmluZWQpKTtcbiAgfTtcbiAgcmVkZWZpbmUoJFN5bWJvbFtQUk9UT1RZUEVdLCAndG9TdHJpbmcnLCBmdW5jdGlvbiB0b1N0cmluZygpe1xuICAgIHJldHVybiB0aGlzLl9rO1xuICB9KTtcblxuICAkR09QRC5mID0gJGdldE93blByb3BlcnR5RGVzY3JpcHRvcjtcbiAgJERQLmYgICA9ICRkZWZpbmVQcm9wZXJ0eTtcbiAgcmVxdWlyZSgnLi9fb2JqZWN0LWdvcG4nKS5mID0gZ09QTkV4dC5mID0gJGdldE93blByb3BlcnR5TmFtZXM7XG4gIHJlcXVpcmUoJy4vX29iamVjdC1waWUnKS5mICA9ICRwcm9wZXJ0eUlzRW51bWVyYWJsZVxuICByZXF1aXJlKCcuL19vYmplY3QtZ29wcycpLmYgPSAkZ2V0T3duUHJvcGVydHlTeW1ib2xzO1xuXG4gIGlmKERFU0NSSVBUT1JTICYmICFyZXF1aXJlKCcuL19saWJyYXJ5Jykpe1xuICAgIHJlZGVmaW5lKE9iamVjdFByb3RvLCAncHJvcGVydHlJc0VudW1lcmFibGUnLCAkcHJvcGVydHlJc0VudW1lcmFibGUsIHRydWUpO1xuICB9XG59XG5cbiRleHBvcnQoJGV4cG9ydC5HICsgJGV4cG9ydC5XICsgJGV4cG9ydC5GICogIVVTRV9OQVRJVkUsIHtTeW1ib2w6ICRTeW1ib2x9KTtcblxuLy8gMTkuNC4yLjIgU3ltYm9sLmhhc0luc3RhbmNlXG4vLyAxOS40LjIuMyBTeW1ib2wuaXNDb25jYXRTcHJlYWRhYmxlXG4vLyAxOS40LjIuNCBTeW1ib2wuaXRlcmF0b3Jcbi8vIDE5LjQuMi42IFN5bWJvbC5tYXRjaFxuLy8gMTkuNC4yLjggU3ltYm9sLnJlcGxhY2Vcbi8vIDE5LjQuMi45IFN5bWJvbC5zZWFyY2hcbi8vIDE5LjQuMi4xMCBTeW1ib2wuc3BlY2llc1xuLy8gMTkuNC4yLjExIFN5bWJvbC5zcGxpdFxuLy8gMTkuNC4yLjEyIFN5bWJvbC50b1ByaW1pdGl2ZVxuLy8gMTkuNC4yLjEzIFN5bWJvbC50b1N0cmluZ1RhZ1xuLy8gMTkuNC4yLjE0IFN5bWJvbC51bnNjb3BhYmxlc1xuZm9yKHZhciBzeW1ib2xzID0gKFxuICAnaGFzSW5zdGFuY2UsaXNDb25jYXRTcHJlYWRhYmxlLGl0ZXJhdG9yLG1hdGNoLHJlcGxhY2Usc2VhcmNoLHNwZWNpZXMsc3BsaXQsdG9QcmltaXRpdmUsdG9TdHJpbmdUYWcsdW5zY29wYWJsZXMnXG4pLnNwbGl0KCcsJyksIGkgPSAwOyBzeW1ib2xzLmxlbmd0aCA+IGk7ICl7XG4gIHZhciBrZXkgICAgID0gc3ltYm9sc1tpKytdXG4gICAgLCBXcmFwcGVyID0gY29yZS5TeW1ib2xcbiAgICAsIHN5bSAgICAgPSB3a3Moa2V5KTtcbiAgaWYoIShrZXkgaW4gV3JhcHBlcikpZFAoV3JhcHBlciwga2V5LCB7dmFsdWU6IFVTRV9OQVRJVkUgPyBzeW0gOiB3cmFwKHN5bSl9KTtcbn07XG5cbi8vIERvbid0IHVzZSBzZXR0ZXJzIGluIFF0IFNjcmlwdCwgaHR0cHM6Ly9naXRodWIuY29tL3psb2lyb2NrL2NvcmUtanMvaXNzdWVzLzE3M1xuaWYoIVFPYmplY3QgfHwgIVFPYmplY3RbUFJPVE9UWVBFXSB8fCAhUU9iamVjdFtQUk9UT1RZUEVdLmZpbmRDaGlsZClzZXR0ZXIgPSB0cnVlO1xuXG4kZXhwb3J0KCRleHBvcnQuUyArICRleHBvcnQuRiAqICFVU0VfTkFUSVZFLCAnU3ltYm9sJywge1xuICAvLyAxOS40LjIuMSBTeW1ib2wuZm9yKGtleSlcbiAgJ2Zvcic6IGZ1bmN0aW9uKGtleSl7XG4gICAgcmV0dXJuIGhhcyhTeW1ib2xSZWdpc3RyeSwga2V5ICs9ICcnKVxuICAgICAgPyBTeW1ib2xSZWdpc3RyeVtrZXldXG4gICAgICA6IFN5bWJvbFJlZ2lzdHJ5W2tleV0gPSAkU3ltYm9sKGtleSk7XG4gIH0sXG4gIC8vIDE5LjQuMi41IFN5bWJvbC5rZXlGb3Ioc3ltKVxuICBrZXlGb3I6IGZ1bmN0aW9uIGtleUZvcihrZXkpe1xuICAgIGlmKGlzU3ltYm9sKGtleSkpcmV0dXJuIGtleU9mKFN5bWJvbFJlZ2lzdHJ5LCBrZXkpO1xuICAgIHRocm93IFR5cGVFcnJvcihrZXkgKyAnIGlzIG5vdCBhIHN5bWJvbCEnKTtcbiAgfSxcbiAgdXNlU2V0dGVyOiBmdW5jdGlvbigpeyBzZXR0ZXIgPSB0cnVlOyB9LFxuICB1c2VTaW1wbGU6IGZ1bmN0aW9uKCl7IHNldHRlciA9IGZhbHNlOyB9XG59KTtcblxuJGV4cG9ydCgkZXhwb3J0LlMgKyAkZXhwb3J0LkYgKiAhVVNFX05BVElWRSwgJ09iamVjdCcsIHtcbiAgLy8gMTkuMS4yLjIgT2JqZWN0LmNyZWF0ZShPIFssIFByb3BlcnRpZXNdKVxuICBjcmVhdGU6ICRjcmVhdGUsXG4gIC8vIDE5LjEuMi40IE9iamVjdC5kZWZpbmVQcm9wZXJ0eShPLCBQLCBBdHRyaWJ1dGVzKVxuICBkZWZpbmVQcm9wZXJ0eTogJGRlZmluZVByb3BlcnR5LFxuICAvLyAxOS4xLjIuMyBPYmplY3QuZGVmaW5lUHJvcGVydGllcyhPLCBQcm9wZXJ0aWVzKVxuICBkZWZpbmVQcm9wZXJ0aWVzOiAkZGVmaW5lUHJvcGVydGllcyxcbiAgLy8gMTkuMS4yLjYgT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihPLCBQKVxuICBnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3I6ICRnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IsXG4gIC8vIDE5LjEuMi43IE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKE8pXG4gIGdldE93blByb3BlcnR5TmFtZXM6ICRnZXRPd25Qcm9wZXJ0eU5hbWVzLFxuICAvLyAxOS4xLjIuOCBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKE8pXG4gIGdldE93blByb3BlcnR5U3ltYm9sczogJGdldE93blByb3BlcnR5U3ltYm9sc1xufSk7XG5cbi8vIDI0LjMuMiBKU09OLnN0cmluZ2lmeSh2YWx1ZSBbLCByZXBsYWNlciBbLCBzcGFjZV1dKVxuJEpTT04gJiYgJGV4cG9ydCgkZXhwb3J0LlMgKyAkZXhwb3J0LkYgKiAoIVVTRV9OQVRJVkUgfHwgQlVHR1lfSlNPTiksICdKU09OJywge3N0cmluZ2lmeTogJHN0cmluZ2lmeX0pO1xuXG4vLyAxOS40LjMuNCBTeW1ib2wucHJvdG90eXBlW0BAdG9QcmltaXRpdmVdKGhpbnQpXG4kU3ltYm9sW1BST1RPVFlQRV1bVE9fUFJJTUlUSVZFXSB8fCByZXF1aXJlKCcuL19oaWRlJykoJFN5bWJvbFtQUk9UT1RZUEVdLCBUT19QUklNSVRJVkUsICRTeW1ib2xbUFJPVE9UWVBFXS52YWx1ZU9mKTtcbi8vIDE5LjQuMy41IFN5bWJvbC5wcm90b3R5cGVbQEB0b1N0cmluZ1RhZ11cbnNldFRvU3RyaW5nVGFnKCRTeW1ib2wsICdTeW1ib2wnKTtcbi8vIDIwLjIuMS45IE1hdGhbQEB0b1N0cmluZ1RhZ11cbnNldFRvU3RyaW5nVGFnKE1hdGgsICdNYXRoJywgdHJ1ZSk7XG4vLyAyNC4zLjMgSlNPTltAQHRvU3RyaW5nVGFnXVxuc2V0VG9TdHJpbmdUYWcoZ2xvYmFsLkpTT04sICdKU09OJywgdHJ1ZSk7IiwiJ3VzZSBzdHJpY3QnO1xudmFyICRleHBvcnQgICAgICA9IHJlcXVpcmUoJy4vX2V4cG9ydCcpXG4gICwgJHR5cGVkICAgICAgID0gcmVxdWlyZSgnLi9fdHlwZWQnKVxuICAsIGJ1ZmZlciAgICAgICA9IHJlcXVpcmUoJy4vX3R5cGVkLWJ1ZmZlcicpXG4gICwgYW5PYmplY3QgICAgID0gcmVxdWlyZSgnLi9fYW4tb2JqZWN0JylcbiAgLCB0b0luZGV4ICAgICAgPSByZXF1aXJlKCcuL190by1pbmRleCcpXG4gICwgdG9MZW5ndGggICAgID0gcmVxdWlyZSgnLi9fdG8tbGVuZ3RoJylcbiAgLCBpc09iamVjdCAgICAgPSByZXF1aXJlKCcuL19pcy1vYmplY3QnKVxuICAsIFRZUEVEX0FSUkFZICA9IHJlcXVpcmUoJy4vX3drcycpKCd0eXBlZF9hcnJheScpXG4gICwgQXJyYXlCdWZmZXIgID0gcmVxdWlyZSgnLi9fZ2xvYmFsJykuQXJyYXlCdWZmZXJcbiAgLCBzcGVjaWVzQ29uc3RydWN0b3IgPSByZXF1aXJlKCcuL19zcGVjaWVzLWNvbnN0cnVjdG9yJylcbiAgLCAkQXJyYXlCdWZmZXIgPSBidWZmZXIuQXJyYXlCdWZmZXJcbiAgLCAkRGF0YVZpZXcgICAgPSBidWZmZXIuRGF0YVZpZXdcbiAgLCAkaXNWaWV3ICAgICAgPSAkdHlwZWQuQUJWICYmIEFycmF5QnVmZmVyLmlzVmlld1xuICAsICRzbGljZSAgICAgICA9ICRBcnJheUJ1ZmZlci5wcm90b3R5cGUuc2xpY2VcbiAgLCBWSUVXICAgICAgICAgPSAkdHlwZWQuVklFV1xuICAsIEFSUkFZX0JVRkZFUiA9ICdBcnJheUJ1ZmZlcic7XG5cbiRleHBvcnQoJGV4cG9ydC5HICsgJGV4cG9ydC5XICsgJGV4cG9ydC5GICogKEFycmF5QnVmZmVyICE9PSAkQXJyYXlCdWZmZXIpLCB7QXJyYXlCdWZmZXI6ICRBcnJheUJ1ZmZlcn0pO1xuXG4kZXhwb3J0KCRleHBvcnQuUyArICRleHBvcnQuRiAqICEkdHlwZWQuQ09OU1RSLCBBUlJBWV9CVUZGRVIsIHtcbiAgLy8gMjQuMS4zLjEgQXJyYXlCdWZmZXIuaXNWaWV3KGFyZylcbiAgaXNWaWV3OiBmdW5jdGlvbiBpc1ZpZXcoaXQpe1xuICAgIHJldHVybiAkaXNWaWV3ICYmICRpc1ZpZXcoaXQpIHx8IGlzT2JqZWN0KGl0KSAmJiBWSUVXIGluIGl0O1xuICB9XG59KTtcblxuJGV4cG9ydCgkZXhwb3J0LlAgKyAkZXhwb3J0LlUgKyAkZXhwb3J0LkYgKiByZXF1aXJlKCcuL19mYWlscycpKGZ1bmN0aW9uKCl7XG4gIHJldHVybiAhbmV3ICRBcnJheUJ1ZmZlcigyKS5zbGljZSgxLCB1bmRlZmluZWQpLmJ5dGVMZW5ndGg7XG59KSwgQVJSQVlfQlVGRkVSLCB7XG4gIC8vIDI0LjEuNC4zIEFycmF5QnVmZmVyLnByb3RvdHlwZS5zbGljZShzdGFydCwgZW5kKVxuICBzbGljZTogZnVuY3Rpb24gc2xpY2Uoc3RhcnQsIGVuZCl7XG4gICAgaWYoJHNsaWNlICE9PSB1bmRlZmluZWQgJiYgZW5kID09PSB1bmRlZmluZWQpcmV0dXJuICRzbGljZS5jYWxsKGFuT2JqZWN0KHRoaXMpLCBzdGFydCk7IC8vIEZGIGZpeFxuICAgIHZhciBsZW4gICAgPSBhbk9iamVjdCh0aGlzKS5ieXRlTGVuZ3RoXG4gICAgICAsIGZpcnN0ICA9IHRvSW5kZXgoc3RhcnQsIGxlbilcbiAgICAgICwgZmluYWwgID0gdG9JbmRleChlbmQgPT09IHVuZGVmaW5lZCA/IGxlbiA6IGVuZCwgbGVuKVxuICAgICAgLCByZXN1bHQgPSBuZXcgKHNwZWNpZXNDb25zdHJ1Y3Rvcih0aGlzLCAkQXJyYXlCdWZmZXIpKSh0b0xlbmd0aChmaW5hbCAtIGZpcnN0KSlcbiAgICAgICwgdmlld1MgID0gbmV3ICREYXRhVmlldyh0aGlzKVxuICAgICAgLCB2aWV3VCAgPSBuZXcgJERhdGFWaWV3KHJlc3VsdClcbiAgICAgICwgaW5kZXggID0gMDtcbiAgICB3aGlsZShmaXJzdCA8IGZpbmFsKXtcbiAgICAgIHZpZXdULnNldFVpbnQ4KGluZGV4KyssIHZpZXdTLmdldFVpbnQ4KGZpcnN0KyspKTtcbiAgICB9IHJldHVybiByZXN1bHQ7XG4gIH1cbn0pO1xuXG5yZXF1aXJlKCcuL19zZXQtc3BlY2llcycpKEFSUkFZX0JVRkZFUik7IiwidmFyICRleHBvcnQgPSByZXF1aXJlKCcuL19leHBvcnQnKTtcbiRleHBvcnQoJGV4cG9ydC5HICsgJGV4cG9ydC5XICsgJGV4cG9ydC5GICogIXJlcXVpcmUoJy4vX3R5cGVkJykuQUJWLCB7XG4gIERhdGFWaWV3OiByZXF1aXJlKCcuL190eXBlZC1idWZmZXInKS5EYXRhVmlld1xufSk7IiwicmVxdWlyZSgnLi9fdHlwZWQtYXJyYXknKSgnRmxvYXQzMicsIDQsIGZ1bmN0aW9uKGluaXQpe1xuICByZXR1cm4gZnVuY3Rpb24gRmxvYXQzMkFycmF5KGRhdGEsIGJ5dGVPZmZzZXQsIGxlbmd0aCl7XG4gICAgcmV0dXJuIGluaXQodGhpcywgZGF0YSwgYnl0ZU9mZnNldCwgbGVuZ3RoKTtcbiAgfTtcbn0pOyIsInJlcXVpcmUoJy4vX3R5cGVkLWFycmF5JykoJ0Zsb2F0NjQnLCA4LCBmdW5jdGlvbihpbml0KXtcbiAgcmV0dXJuIGZ1bmN0aW9uIEZsb2F0NjRBcnJheShkYXRhLCBieXRlT2Zmc2V0LCBsZW5ndGgpe1xuICAgIHJldHVybiBpbml0KHRoaXMsIGRhdGEsIGJ5dGVPZmZzZXQsIGxlbmd0aCk7XG4gIH07XG59KTsiLCJyZXF1aXJlKCcuL190eXBlZC1hcnJheScpKCdJbnQxNicsIDIsIGZ1bmN0aW9uKGluaXQpe1xuICByZXR1cm4gZnVuY3Rpb24gSW50MTZBcnJheShkYXRhLCBieXRlT2Zmc2V0LCBsZW5ndGgpe1xuICAgIHJldHVybiBpbml0KHRoaXMsIGRhdGEsIGJ5dGVPZmZzZXQsIGxlbmd0aCk7XG4gIH07XG59KTsiLCJyZXF1aXJlKCcuL190eXBlZC1hcnJheScpKCdJbnQzMicsIDQsIGZ1bmN0aW9uKGluaXQpe1xuICByZXR1cm4gZnVuY3Rpb24gSW50MzJBcnJheShkYXRhLCBieXRlT2Zmc2V0LCBsZW5ndGgpe1xuICAgIHJldHVybiBpbml0KHRoaXMsIGRhdGEsIGJ5dGVPZmZzZXQsIGxlbmd0aCk7XG4gIH07XG59KTsiLCJyZXF1aXJlKCcuL190eXBlZC1hcnJheScpKCdJbnQ4JywgMSwgZnVuY3Rpb24oaW5pdCl7XG4gIHJldHVybiBmdW5jdGlvbiBJbnQ4QXJyYXkoZGF0YSwgYnl0ZU9mZnNldCwgbGVuZ3RoKXtcbiAgICByZXR1cm4gaW5pdCh0aGlzLCBkYXRhLCBieXRlT2Zmc2V0LCBsZW5ndGgpO1xuICB9O1xufSk7IiwicmVxdWlyZSgnLi9fdHlwZWQtYXJyYXknKSgnVWludDE2JywgMiwgZnVuY3Rpb24oaW5pdCl7XG4gIHJldHVybiBmdW5jdGlvbiBVaW50MTZBcnJheShkYXRhLCBieXRlT2Zmc2V0LCBsZW5ndGgpe1xuICAgIHJldHVybiBpbml0KHRoaXMsIGRhdGEsIGJ5dGVPZmZzZXQsIGxlbmd0aCk7XG4gIH07XG59KTsiLCJyZXF1aXJlKCcuL190eXBlZC1hcnJheScpKCdVaW50MzInLCA0LCBmdW5jdGlvbihpbml0KXtcbiAgcmV0dXJuIGZ1bmN0aW9uIFVpbnQzMkFycmF5KGRhdGEsIGJ5dGVPZmZzZXQsIGxlbmd0aCl7XG4gICAgcmV0dXJuIGluaXQodGhpcywgZGF0YSwgYnl0ZU9mZnNldCwgbGVuZ3RoKTtcbiAgfTtcbn0pOyIsInJlcXVpcmUoJy4vX3R5cGVkLWFycmF5JykoJ1VpbnQ4JywgMSwgZnVuY3Rpb24oaW5pdCl7XG4gIHJldHVybiBmdW5jdGlvbiBVaW50OEFycmF5KGRhdGEsIGJ5dGVPZmZzZXQsIGxlbmd0aCl7XG4gICAgcmV0dXJuIGluaXQodGhpcywgZGF0YSwgYnl0ZU9mZnNldCwgbGVuZ3RoKTtcbiAgfTtcbn0pOyIsInJlcXVpcmUoJy4vX3R5cGVkLWFycmF5JykoJ1VpbnQ4JywgMSwgZnVuY3Rpb24oaW5pdCl7XG4gIHJldHVybiBmdW5jdGlvbiBVaW50OENsYW1wZWRBcnJheShkYXRhLCBieXRlT2Zmc2V0LCBsZW5ndGgpe1xuICAgIHJldHVybiBpbml0KHRoaXMsIGRhdGEsIGJ5dGVPZmZzZXQsIGxlbmd0aCk7XG4gIH07XG59LCB0cnVlKTsiLCIndXNlIHN0cmljdCc7XG52YXIgZWFjaCAgICAgICAgID0gcmVxdWlyZSgnLi9fYXJyYXktbWV0aG9kcycpKDApXG4gICwgcmVkZWZpbmUgICAgID0gcmVxdWlyZSgnLi9fcmVkZWZpbmUnKVxuICAsIG1ldGEgICAgICAgICA9IHJlcXVpcmUoJy4vX21ldGEnKVxuICAsIGFzc2lnbiAgICAgICA9IHJlcXVpcmUoJy4vX29iamVjdC1hc3NpZ24nKVxuICAsIHdlYWsgICAgICAgICA9IHJlcXVpcmUoJy4vX2NvbGxlY3Rpb24td2VhaycpXG4gICwgaXNPYmplY3QgICAgID0gcmVxdWlyZSgnLi9faXMtb2JqZWN0JylcbiAgLCBoYXMgICAgICAgICAgPSByZXF1aXJlKCcuL19oYXMnKVxuICAsIGdldFdlYWsgICAgICA9IG1ldGEuZ2V0V2Vha1xuICAsIGlzRXh0ZW5zaWJsZSA9IE9iamVjdC5pc0V4dGVuc2libGVcbiAgLCB1bmNhdWdodEZyb3plblN0b3JlID0gd2Vhay51ZnN0b3JlXG4gICwgdG1wICAgICAgICAgID0ge31cbiAgLCBJbnRlcm5hbE1hcDtcblxudmFyIHdyYXBwZXIgPSBmdW5jdGlvbihnZXQpe1xuICByZXR1cm4gZnVuY3Rpb24gV2Vha01hcCgpe1xuICAgIHJldHVybiBnZXQodGhpcywgYXJndW1lbnRzLmxlbmd0aCA+IDAgPyBhcmd1bWVudHNbMF0gOiB1bmRlZmluZWQpO1xuICB9O1xufTtcblxudmFyIG1ldGhvZHMgPSB7XG4gIC8vIDIzLjMuMy4zIFdlYWtNYXAucHJvdG90eXBlLmdldChrZXkpXG4gIGdldDogZnVuY3Rpb24gZ2V0KGtleSl7XG4gICAgaWYoaXNPYmplY3Qoa2V5KSl7XG4gICAgICB2YXIgZGF0YSA9IGdldFdlYWsoa2V5KTtcbiAgICAgIGlmKGRhdGEgPT09IHRydWUpcmV0dXJuIHVuY2F1Z2h0RnJvemVuU3RvcmUodGhpcykuZ2V0KGtleSk7XG4gICAgICByZXR1cm4gZGF0YSA/IGRhdGFbdGhpcy5faV0gOiB1bmRlZmluZWQ7XG4gICAgfVxuICB9LFxuICAvLyAyMy4zLjMuNSBXZWFrTWFwLnByb3RvdHlwZS5zZXQoa2V5LCB2YWx1ZSlcbiAgc2V0OiBmdW5jdGlvbiBzZXQoa2V5LCB2YWx1ZSl7XG4gICAgcmV0dXJuIHdlYWsuZGVmKHRoaXMsIGtleSwgdmFsdWUpO1xuICB9XG59O1xuXG4vLyAyMy4zIFdlYWtNYXAgT2JqZWN0c1xudmFyICRXZWFrTWFwID0gbW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL19jb2xsZWN0aW9uJykoJ1dlYWtNYXAnLCB3cmFwcGVyLCBtZXRob2RzLCB3ZWFrLCB0cnVlLCB0cnVlKTtcblxuLy8gSUUxMSBXZWFrTWFwIGZyb3plbiBrZXlzIGZpeFxuaWYobmV3ICRXZWFrTWFwKCkuc2V0KChPYmplY3QuZnJlZXplIHx8IE9iamVjdCkodG1wKSwgNykuZ2V0KHRtcCkgIT0gNyl7XG4gIEludGVybmFsTWFwID0gd2Vhay5nZXRDb25zdHJ1Y3Rvcih3cmFwcGVyKTtcbiAgYXNzaWduKEludGVybmFsTWFwLnByb3RvdHlwZSwgbWV0aG9kcyk7XG4gIG1ldGEuTkVFRCA9IHRydWU7XG4gIGVhY2goWydkZWxldGUnLCAnaGFzJywgJ2dldCcsICdzZXQnXSwgZnVuY3Rpb24oa2V5KXtcbiAgICB2YXIgcHJvdG8gID0gJFdlYWtNYXAucHJvdG90eXBlXG4gICAgICAsIG1ldGhvZCA9IHByb3RvW2tleV07XG4gICAgcmVkZWZpbmUocHJvdG8sIGtleSwgZnVuY3Rpb24oYSwgYil7XG4gICAgICAvLyBzdG9yZSBmcm96ZW4gb2JqZWN0cyBvbiBpbnRlcm5hbCB3ZWFrbWFwIHNoaW1cbiAgICAgIGlmKGlzT2JqZWN0KGEpICYmICFpc0V4dGVuc2libGUoYSkpe1xuICAgICAgICBpZighdGhpcy5fZil0aGlzLl9mID0gbmV3IEludGVybmFsTWFwO1xuICAgICAgICB2YXIgcmVzdWx0ID0gdGhpcy5fZltrZXldKGEsIGIpO1xuICAgICAgICByZXR1cm4ga2V5ID09ICdzZXQnID8gdGhpcyA6IHJlc3VsdDtcbiAgICAgIC8vIHN0b3JlIGFsbCB0aGUgcmVzdCBvbiBuYXRpdmUgd2Vha21hcFxuICAgICAgfSByZXR1cm4gbWV0aG9kLmNhbGwodGhpcywgYSwgYik7XG4gICAgfSk7XG4gIH0pO1xufSIsIid1c2Ugc3RyaWN0JztcbnZhciB3ZWFrID0gcmVxdWlyZSgnLi9fY29sbGVjdGlvbi13ZWFrJyk7XG5cbi8vIDIzLjQgV2Vha1NldCBPYmplY3RzXG5yZXF1aXJlKCcuL19jb2xsZWN0aW9uJykoJ1dlYWtTZXQnLCBmdW5jdGlvbihnZXQpe1xuICByZXR1cm4gZnVuY3Rpb24gV2Vha1NldCgpeyByZXR1cm4gZ2V0KHRoaXMsIGFyZ3VtZW50cy5sZW5ndGggPiAwID8gYXJndW1lbnRzWzBdIDogdW5kZWZpbmVkKTsgfTtcbn0sIHtcbiAgLy8gMjMuNC4zLjEgV2Vha1NldC5wcm90b3R5cGUuYWRkKHZhbHVlKVxuICBhZGQ6IGZ1bmN0aW9uIGFkZCh2YWx1ZSl7XG4gICAgcmV0dXJuIHdlYWsuZGVmKHRoaXMsIHZhbHVlLCB0cnVlKTtcbiAgfVxufSwgd2VhaywgZmFsc2UsIHRydWUpOyIsIid1c2Ugc3RyaWN0Jztcbi8vIGh0dHBzOi8vZ2l0aHViLmNvbS90YzM5L0FycmF5LnByb3RvdHlwZS5pbmNsdWRlc1xudmFyICRleHBvcnQgICA9IHJlcXVpcmUoJy4vX2V4cG9ydCcpXG4gICwgJGluY2x1ZGVzID0gcmVxdWlyZSgnLi9fYXJyYXktaW5jbHVkZXMnKSh0cnVlKTtcblxuJGV4cG9ydCgkZXhwb3J0LlAsICdBcnJheScsIHtcbiAgaW5jbHVkZXM6IGZ1bmN0aW9uIGluY2x1ZGVzKGVsIC8qLCBmcm9tSW5kZXggPSAwICovKXtcbiAgICByZXR1cm4gJGluY2x1ZGVzKHRoaXMsIGVsLCBhcmd1bWVudHMubGVuZ3RoID4gMSA/IGFyZ3VtZW50c1sxXSA6IHVuZGVmaW5lZCk7XG4gIH1cbn0pO1xuXG5yZXF1aXJlKCcuL19hZGQtdG8tdW5zY29wYWJsZXMnKSgnaW5jbHVkZXMnKTsiLCIvLyBodHRwczovL2dpdGh1Yi5jb20vbGpoYXJiL3Byb3Bvc2FsLWlzLWVycm9yXG52YXIgJGV4cG9ydCA9IHJlcXVpcmUoJy4vX2V4cG9ydCcpXG4gICwgY29mICAgICA9IHJlcXVpcmUoJy4vX2NvZicpO1xuXG4kZXhwb3J0KCRleHBvcnQuUywgJ0Vycm9yJywge1xuICBpc0Vycm9yOiBmdW5jdGlvbiBpc0Vycm9yKGl0KXtcbiAgICByZXR1cm4gY29mKGl0KSA9PT0gJ0Vycm9yJztcbiAgfVxufSk7IiwiLy8gaHR0cHM6Ly9naXRodWIuY29tL0RhdmlkQnJ1YW50L01hcC1TZXQucHJvdG90eXBlLnRvSlNPTlxudmFyICRleHBvcnQgID0gcmVxdWlyZSgnLi9fZXhwb3J0Jyk7XG5cbiRleHBvcnQoJGV4cG9ydC5QICsgJGV4cG9ydC5SLCAnTWFwJywge3RvSlNPTjogcmVxdWlyZSgnLi9fY29sbGVjdGlvbi10by1qc29uJykoJ01hcCcpfSk7IiwiLy8gaHR0cHM6Ly9naXN0LmdpdGh1Yi5jb20vQnJlbmRhbkVpY2gvNDI5NGQ1YzIxMmE2ZDIyNTQ3MDNcbnZhciAkZXhwb3J0ID0gcmVxdWlyZSgnLi9fZXhwb3J0Jyk7XG5cbiRleHBvcnQoJGV4cG9ydC5TLCAnTWF0aCcsIHtcbiAgaWFkZGg6IGZ1bmN0aW9uIGlhZGRoKHgwLCB4MSwgeTAsIHkxKXtcbiAgICB2YXIgJHgwID0geDAgPj4+IDBcbiAgICAgICwgJHgxID0geDEgPj4+IDBcbiAgICAgICwgJHkwID0geTAgPj4+IDA7XG4gICAgcmV0dXJuICR4MSArICh5MSA+Pj4gMCkgKyAoKCR4MCAmICR5MCB8ICgkeDAgfCAkeTApICYgfigkeDAgKyAkeTAgPj4+IDApKSA+Pj4gMzEpIHwgMDtcbiAgfVxufSk7IiwiLy8gaHR0cHM6Ly9naXN0LmdpdGh1Yi5jb20vQnJlbmRhbkVpY2gvNDI5NGQ1YzIxMmE2ZDIyNTQ3MDNcbnZhciAkZXhwb3J0ID0gcmVxdWlyZSgnLi9fZXhwb3J0Jyk7XG5cbiRleHBvcnQoJGV4cG9ydC5TLCAnTWF0aCcsIHtcbiAgaW11bGg6IGZ1bmN0aW9uIGltdWxoKHUsIHYpe1xuICAgIHZhciBVSU5UMTYgPSAweGZmZmZcbiAgICAgICwgJHUgPSArdVxuICAgICAgLCAkdiA9ICt2XG4gICAgICAsIHUwID0gJHUgJiBVSU5UMTZcbiAgICAgICwgdjAgPSAkdiAmIFVJTlQxNlxuICAgICAgLCB1MSA9ICR1ID4+IDE2XG4gICAgICAsIHYxID0gJHYgPj4gMTZcbiAgICAgICwgdCAgPSAodTEgKiB2MCA+Pj4gMCkgKyAodTAgKiB2MCA+Pj4gMTYpO1xuICAgIHJldHVybiB1MSAqIHYxICsgKHQgPj4gMTYpICsgKCh1MCAqIHYxID4+PiAwKSArICh0ICYgVUlOVDE2KSA+PiAxNik7XG4gIH1cbn0pOyIsIi8vIGh0dHBzOi8vZ2lzdC5naXRodWIuY29tL0JyZW5kYW5FaWNoLzQyOTRkNWMyMTJhNmQyMjU0NzAzXG52YXIgJGV4cG9ydCA9IHJlcXVpcmUoJy4vX2V4cG9ydCcpO1xuXG4kZXhwb3J0KCRleHBvcnQuUywgJ01hdGgnLCB7XG4gIGlzdWJoOiBmdW5jdGlvbiBpc3ViaCh4MCwgeDEsIHkwLCB5MSl7XG4gICAgdmFyICR4MCA9IHgwID4+PiAwXG4gICAgICAsICR4MSA9IHgxID4+PiAwXG4gICAgICAsICR5MCA9IHkwID4+PiAwO1xuICAgIHJldHVybiAkeDEgLSAoeTEgPj4+IDApIC0gKCh+JHgwICYgJHkwIHwgfigkeDAgXiAkeTApICYgJHgwIC0gJHkwID4+PiAwKSA+Pj4gMzEpIHwgMDtcbiAgfVxufSk7IiwiLy8gaHR0cHM6Ly9naXN0LmdpdGh1Yi5jb20vQnJlbmRhbkVpY2gvNDI5NGQ1YzIxMmE2ZDIyNTQ3MDNcbnZhciAkZXhwb3J0ID0gcmVxdWlyZSgnLi9fZXhwb3J0Jyk7XG5cbiRleHBvcnQoJGV4cG9ydC5TLCAnTWF0aCcsIHtcbiAgdW11bGg6IGZ1bmN0aW9uIHVtdWxoKHUsIHYpe1xuICAgIHZhciBVSU5UMTYgPSAweGZmZmZcbiAgICAgICwgJHUgPSArdVxuICAgICAgLCAkdiA9ICt2XG4gICAgICAsIHUwID0gJHUgJiBVSU5UMTZcbiAgICAgICwgdjAgPSAkdiAmIFVJTlQxNlxuICAgICAgLCB1MSA9ICR1ID4+PiAxNlxuICAgICAgLCB2MSA9ICR2ID4+PiAxNlxuICAgICAgLCB0ICA9ICh1MSAqIHYwID4+PiAwKSArICh1MCAqIHYwID4+PiAxNik7XG4gICAgcmV0dXJuIHUxICogdjEgKyAodCA+Pj4gMTYpICsgKCh1MCAqIHYxID4+PiAwKSArICh0ICYgVUlOVDE2KSA+Pj4gMTYpO1xuICB9XG59KTsiLCIndXNlIHN0cmljdCc7XHJcbnZhciAkZXhwb3J0ICAgICAgICAgPSByZXF1aXJlKCcuL19leHBvcnQnKVxyXG4gICwgdG9PYmplY3QgICAgICAgID0gcmVxdWlyZSgnLi9fdG8tb2JqZWN0JylcclxuICAsIGFGdW5jdGlvbiAgICAgICA9IHJlcXVpcmUoJy4vX2EtZnVuY3Rpb24nKVxyXG4gICwgJGRlZmluZVByb3BlcnR5ID0gcmVxdWlyZSgnLi9fb2JqZWN0LWRwJyk7XHJcblxyXG4vLyBCLjIuMi4yIE9iamVjdC5wcm90b3R5cGUuX19kZWZpbmVHZXR0ZXJfXyhQLCBnZXR0ZXIpXHJcbnJlcXVpcmUoJy4vX2Rlc2NyaXB0b3JzJykgJiYgJGV4cG9ydCgkZXhwb3J0LlAgKyByZXF1aXJlKCcuL19vYmplY3QtZm9yY2VkLXBhbScpLCAnT2JqZWN0Jywge1xyXG4gIF9fZGVmaW5lR2V0dGVyX186IGZ1bmN0aW9uIF9fZGVmaW5lR2V0dGVyX18oUCwgZ2V0dGVyKXtcclxuICAgICRkZWZpbmVQcm9wZXJ0eS5mKHRvT2JqZWN0KHRoaXMpLCBQLCB7Z2V0OiBhRnVuY3Rpb24oZ2V0dGVyKSwgZW51bWVyYWJsZTogdHJ1ZSwgY29uZmlndXJhYmxlOiB0cnVlfSk7XHJcbiAgfVxyXG59KTsiLCIndXNlIHN0cmljdCc7XHJcbnZhciAkZXhwb3J0ICAgICAgICAgPSByZXF1aXJlKCcuL19leHBvcnQnKVxyXG4gICwgdG9PYmplY3QgICAgICAgID0gcmVxdWlyZSgnLi9fdG8tb2JqZWN0JylcclxuICAsIGFGdW5jdGlvbiAgICAgICA9IHJlcXVpcmUoJy4vX2EtZnVuY3Rpb24nKVxyXG4gICwgJGRlZmluZVByb3BlcnR5ID0gcmVxdWlyZSgnLi9fb2JqZWN0LWRwJyk7XHJcblxyXG4vLyBCLjIuMi4zIE9iamVjdC5wcm90b3R5cGUuX19kZWZpbmVTZXR0ZXJfXyhQLCBzZXR0ZXIpXHJcbnJlcXVpcmUoJy4vX2Rlc2NyaXB0b3JzJykgJiYgJGV4cG9ydCgkZXhwb3J0LlAgKyByZXF1aXJlKCcuL19vYmplY3QtZm9yY2VkLXBhbScpLCAnT2JqZWN0Jywge1xyXG4gIF9fZGVmaW5lU2V0dGVyX186IGZ1bmN0aW9uIF9fZGVmaW5lU2V0dGVyX18oUCwgc2V0dGVyKXtcclxuICAgICRkZWZpbmVQcm9wZXJ0eS5mKHRvT2JqZWN0KHRoaXMpLCBQLCB7c2V0OiBhRnVuY3Rpb24oc2V0dGVyKSwgZW51bWVyYWJsZTogdHJ1ZSwgY29uZmlndXJhYmxlOiB0cnVlfSk7XHJcbiAgfVxyXG59KTsiLCIvLyBodHRwczovL2dpdGh1Yi5jb20vdGMzOS9wcm9wb3NhbC1vYmplY3QtdmFsdWVzLWVudHJpZXNcbnZhciAkZXhwb3J0ICA9IHJlcXVpcmUoJy4vX2V4cG9ydCcpXG4gICwgJGVudHJpZXMgPSByZXF1aXJlKCcuL19vYmplY3QtdG8tYXJyYXknKSh0cnVlKTtcblxuJGV4cG9ydCgkZXhwb3J0LlMsICdPYmplY3QnLCB7XG4gIGVudHJpZXM6IGZ1bmN0aW9uIGVudHJpZXMoaXQpe1xuICAgIHJldHVybiAkZW50cmllcyhpdCk7XG4gIH1cbn0pOyIsIi8vIGh0dHBzOi8vZ2l0aHViLmNvbS90YzM5L3Byb3Bvc2FsLW9iamVjdC1nZXRvd25wcm9wZXJ0eWRlc2NyaXB0b3JzXG52YXIgJGV4cG9ydCAgICA9IHJlcXVpcmUoJy4vX2V4cG9ydCcpXG4gICwgb3duS2V5cyAgICA9IHJlcXVpcmUoJy4vX293bi1rZXlzJylcbiAgLCB0b0lPYmplY3QgID0gcmVxdWlyZSgnLi9fdG8taW9iamVjdCcpXG4gICwgY3JlYXRlRGVzYyA9IHJlcXVpcmUoJy4vX3Byb3BlcnR5LWRlc2MnKVxuICAsIGdPUEQgICAgICAgPSByZXF1aXJlKCcuL19vYmplY3QtZ29wZCcpXG4gICwgZFAgICAgICAgICA9IHJlcXVpcmUoJy4vX29iamVjdC1kcCcpO1xuXG4kZXhwb3J0KCRleHBvcnQuUywgJ09iamVjdCcsIHtcbiAgZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yczogZnVuY3Rpb24gZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9ycyhvYmplY3Qpe1xuICAgIHZhciBPICAgICAgID0gdG9JT2JqZWN0KG9iamVjdClcbiAgICAgICwgZ2V0RGVzYyA9IGdPUEQuZlxuICAgICAgLCBrZXlzICAgID0gb3duS2V5cyhPKVxuICAgICAgLCByZXN1bHQgID0ge31cbiAgICAgICwgaSAgICAgICA9IDBcbiAgICAgICwga2V5LCBEO1xuICAgIHdoaWxlKGtleXMubGVuZ3RoID4gaSl7XG4gICAgICBEID0gZ2V0RGVzYyhPLCBrZXkgPSBrZXlzW2krK10pO1xuICAgICAgaWYoa2V5IGluIHJlc3VsdClkUC5mKHJlc3VsdCwga2V5LCBjcmVhdGVEZXNjKDAsIEQpKTtcbiAgICAgIGVsc2UgcmVzdWx0W2tleV0gPSBEO1xuICAgIH0gcmV0dXJuIHJlc3VsdDtcbiAgfVxufSk7IiwiJ3VzZSBzdHJpY3QnO1xyXG52YXIgJGV4cG9ydCAgICAgICAgICAgICAgICAgID0gcmVxdWlyZSgnLi9fZXhwb3J0JylcclxuICAsIHRvT2JqZWN0ICAgICAgICAgICAgICAgICA9IHJlcXVpcmUoJy4vX3RvLW9iamVjdCcpXHJcbiAgLCB0b1ByaW1pdGl2ZSAgICAgICAgICAgICAgPSByZXF1aXJlKCcuL190by1wcmltaXRpdmUnKVxyXG4gICwgZ2V0UHJvdG90eXBlT2YgICAgICAgICAgID0gcmVxdWlyZSgnLi9fb2JqZWN0LWdwbycpXHJcbiAgLCBnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IgPSByZXF1aXJlKCcuL19vYmplY3QtZ29wZCcpLmY7XHJcblxyXG4vLyBCLjIuMi40IE9iamVjdC5wcm90b3R5cGUuX19sb29rdXBHZXR0ZXJfXyhQKVxyXG5yZXF1aXJlKCcuL19kZXNjcmlwdG9ycycpICYmICRleHBvcnQoJGV4cG9ydC5QICsgcmVxdWlyZSgnLi9fb2JqZWN0LWZvcmNlZC1wYW0nKSwgJ09iamVjdCcsIHtcclxuICBfX2xvb2t1cEdldHRlcl9fOiBmdW5jdGlvbiBfX2xvb2t1cEdldHRlcl9fKFApe1xyXG4gICAgdmFyIE8gPSB0b09iamVjdCh0aGlzKVxyXG4gICAgICAsIEsgPSB0b1ByaW1pdGl2ZShQLCB0cnVlKVxyXG4gICAgICAsIEQ7XHJcbiAgICBkbyB7XHJcbiAgICAgIGlmKEQgPSBnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IoTywgSykpcmV0dXJuIEQuZ2V0O1xyXG4gICAgfSB3aGlsZShPID0gZ2V0UHJvdG90eXBlT2YoTykpO1xyXG4gIH1cclxufSk7IiwiJ3VzZSBzdHJpY3QnO1xyXG52YXIgJGV4cG9ydCAgICAgICAgICAgICAgICAgID0gcmVxdWlyZSgnLi9fZXhwb3J0JylcclxuICAsIHRvT2JqZWN0ICAgICAgICAgICAgICAgICA9IHJlcXVpcmUoJy4vX3RvLW9iamVjdCcpXHJcbiAgLCB0b1ByaW1pdGl2ZSAgICAgICAgICAgICAgPSByZXF1aXJlKCcuL190by1wcmltaXRpdmUnKVxyXG4gICwgZ2V0UHJvdG90eXBlT2YgICAgICAgICAgID0gcmVxdWlyZSgnLi9fb2JqZWN0LWdwbycpXHJcbiAgLCBnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IgPSByZXF1aXJlKCcuL19vYmplY3QtZ29wZCcpLmY7XHJcblxyXG4vLyBCLjIuMi41IE9iamVjdC5wcm90b3R5cGUuX19sb29rdXBTZXR0ZXJfXyhQKVxyXG5yZXF1aXJlKCcuL19kZXNjcmlwdG9ycycpICYmICRleHBvcnQoJGV4cG9ydC5QICsgcmVxdWlyZSgnLi9fb2JqZWN0LWZvcmNlZC1wYW0nKSwgJ09iamVjdCcsIHtcclxuICBfX2xvb2t1cFNldHRlcl9fOiBmdW5jdGlvbiBfX2xvb2t1cFNldHRlcl9fKFApe1xyXG4gICAgdmFyIE8gPSB0b09iamVjdCh0aGlzKVxyXG4gICAgICAsIEsgPSB0b1ByaW1pdGl2ZShQLCB0cnVlKVxyXG4gICAgICAsIEQ7XHJcbiAgICBkbyB7XHJcbiAgICAgIGlmKEQgPSBnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IoTywgSykpcmV0dXJuIEQuc2V0O1xyXG4gICAgfSB3aGlsZShPID0gZ2V0UHJvdG90eXBlT2YoTykpO1xyXG4gIH1cclxufSk7IiwiLy8gaHR0cHM6Ly9naXRodWIuY29tL3RjMzkvcHJvcG9zYWwtb2JqZWN0LXZhbHVlcy1lbnRyaWVzXG52YXIgJGV4cG9ydCA9IHJlcXVpcmUoJy4vX2V4cG9ydCcpXG4gICwgJHZhbHVlcyA9IHJlcXVpcmUoJy4vX29iamVjdC10by1hcnJheScpKGZhbHNlKTtcblxuJGV4cG9ydCgkZXhwb3J0LlMsICdPYmplY3QnLCB7XG4gIHZhbHVlczogZnVuY3Rpb24gdmFsdWVzKGl0KXtcbiAgICByZXR1cm4gJHZhbHVlcyhpdCk7XG4gIH1cbn0pOyIsInZhciBtZXRhZGF0YSAgICAgICAgICAgICAgICAgID0gcmVxdWlyZSgnLi9fbWV0YWRhdGEnKVxuICAsIGFuT2JqZWN0ICAgICAgICAgICAgICAgICAgPSByZXF1aXJlKCcuL19hbi1vYmplY3QnKVxuICAsIHRvTWV0YUtleSAgICAgICAgICAgICAgICAgPSBtZXRhZGF0YS5rZXlcbiAgLCBvcmRpbmFyeURlZmluZU93bk1ldGFkYXRhID0gbWV0YWRhdGEuc2V0O1xuXG5tZXRhZGF0YS5leHAoe2RlZmluZU1ldGFkYXRhOiBmdW5jdGlvbiBkZWZpbmVNZXRhZGF0YShtZXRhZGF0YUtleSwgbWV0YWRhdGFWYWx1ZSwgdGFyZ2V0LCB0YXJnZXRLZXkpe1xuICBvcmRpbmFyeURlZmluZU93bk1ldGFkYXRhKG1ldGFkYXRhS2V5LCBtZXRhZGF0YVZhbHVlLCBhbk9iamVjdCh0YXJnZXQpLCB0b01ldGFLZXkodGFyZ2V0S2V5KSk7XG59fSk7IiwidmFyIG1ldGFkYXRhICAgICAgICAgICAgICAgPSByZXF1aXJlKCcuL19tZXRhZGF0YScpXG4gICwgYW5PYmplY3QgICAgICAgICAgICAgICA9IHJlcXVpcmUoJy4vX2FuLW9iamVjdCcpXG4gICwgdG9NZXRhS2V5ICAgICAgICAgICAgICA9IG1ldGFkYXRhLmtleVxuICAsIGdldE9yQ3JlYXRlTWV0YWRhdGFNYXAgPSBtZXRhZGF0YS5tYXBcbiAgLCBzdG9yZSAgICAgICAgICAgICAgICAgID0gbWV0YWRhdGEuc3RvcmU7XG5cbm1ldGFkYXRhLmV4cCh7ZGVsZXRlTWV0YWRhdGE6IGZ1bmN0aW9uIGRlbGV0ZU1ldGFkYXRhKG1ldGFkYXRhS2V5LCB0YXJnZXQgLyosIHRhcmdldEtleSAqLyl7XG4gIHZhciB0YXJnZXRLZXkgICA9IGFyZ3VtZW50cy5sZW5ndGggPCAzID8gdW5kZWZpbmVkIDogdG9NZXRhS2V5KGFyZ3VtZW50c1syXSlcbiAgICAsIG1ldGFkYXRhTWFwID0gZ2V0T3JDcmVhdGVNZXRhZGF0YU1hcChhbk9iamVjdCh0YXJnZXQpLCB0YXJnZXRLZXksIGZhbHNlKTtcbiAgaWYobWV0YWRhdGFNYXAgPT09IHVuZGVmaW5lZCB8fCAhbWV0YWRhdGFNYXBbJ2RlbGV0ZSddKG1ldGFkYXRhS2V5KSlyZXR1cm4gZmFsc2U7XG4gIGlmKG1ldGFkYXRhTWFwLnNpemUpcmV0dXJuIHRydWU7XG4gIHZhciB0YXJnZXRNZXRhZGF0YSA9IHN0b3JlLmdldCh0YXJnZXQpO1xuICB0YXJnZXRNZXRhZGF0YVsnZGVsZXRlJ10odGFyZ2V0S2V5KTtcbiAgcmV0dXJuICEhdGFyZ2V0TWV0YWRhdGEuc2l6ZSB8fCBzdG9yZVsnZGVsZXRlJ10odGFyZ2V0KTtcbn19KTsiLCJ2YXIgU2V0ICAgICAgICAgICAgICAgICAgICAgPSByZXF1aXJlKCcuL2VzNi5zZXQnKVxuICAsIGZyb20gICAgICAgICAgICAgICAgICAgID0gcmVxdWlyZSgnLi9fYXJyYXktZnJvbS1pdGVyYWJsZScpXG4gICwgbWV0YWRhdGEgICAgICAgICAgICAgICAgPSByZXF1aXJlKCcuL19tZXRhZGF0YScpXG4gICwgYW5PYmplY3QgICAgICAgICAgICAgICAgPSByZXF1aXJlKCcuL19hbi1vYmplY3QnKVxuICAsIGdldFByb3RvdHlwZU9mICAgICAgICAgID0gcmVxdWlyZSgnLi9fb2JqZWN0LWdwbycpXG4gICwgb3JkaW5hcnlPd25NZXRhZGF0YUtleXMgPSBtZXRhZGF0YS5rZXlzXG4gICwgdG9NZXRhS2V5ICAgICAgICAgICAgICAgPSBtZXRhZGF0YS5rZXk7XG5cbnZhciBvcmRpbmFyeU1ldGFkYXRhS2V5cyA9IGZ1bmN0aW9uKE8sIFApe1xuICB2YXIgb0tleXMgID0gb3JkaW5hcnlPd25NZXRhZGF0YUtleXMoTywgUClcbiAgICAsIHBhcmVudCA9IGdldFByb3RvdHlwZU9mKE8pO1xuICBpZihwYXJlbnQgPT09IG51bGwpcmV0dXJuIG9LZXlzO1xuICB2YXIgcEtleXMgID0gb3JkaW5hcnlNZXRhZGF0YUtleXMocGFyZW50LCBQKTtcbiAgcmV0dXJuIHBLZXlzLmxlbmd0aCA/IG9LZXlzLmxlbmd0aCA/IGZyb20obmV3IFNldChvS2V5cy5jb25jYXQocEtleXMpKSkgOiBwS2V5cyA6IG9LZXlzO1xufTtcblxubWV0YWRhdGEuZXhwKHtnZXRNZXRhZGF0YUtleXM6IGZ1bmN0aW9uIGdldE1ldGFkYXRhS2V5cyh0YXJnZXQgLyosIHRhcmdldEtleSAqLyl7XG4gIHJldHVybiBvcmRpbmFyeU1ldGFkYXRhS2V5cyhhbk9iamVjdCh0YXJnZXQpLCBhcmd1bWVudHMubGVuZ3RoIDwgMiA/IHVuZGVmaW5lZCA6IHRvTWV0YUtleShhcmd1bWVudHNbMV0pKTtcbn19KTsiLCJ2YXIgbWV0YWRhdGEgICAgICAgICAgICAgICA9IHJlcXVpcmUoJy4vX21ldGFkYXRhJylcbiAgLCBhbk9iamVjdCAgICAgICAgICAgICAgID0gcmVxdWlyZSgnLi9fYW4tb2JqZWN0JylcbiAgLCBnZXRQcm90b3R5cGVPZiAgICAgICAgID0gcmVxdWlyZSgnLi9fb2JqZWN0LWdwbycpXG4gICwgb3JkaW5hcnlIYXNPd25NZXRhZGF0YSA9IG1ldGFkYXRhLmhhc1xuICAsIG9yZGluYXJ5R2V0T3duTWV0YWRhdGEgPSBtZXRhZGF0YS5nZXRcbiAgLCB0b01ldGFLZXkgICAgICAgICAgICAgID0gbWV0YWRhdGEua2V5O1xuXG52YXIgb3JkaW5hcnlHZXRNZXRhZGF0YSA9IGZ1bmN0aW9uKE1ldGFkYXRhS2V5LCBPLCBQKXtcbiAgdmFyIGhhc093biA9IG9yZGluYXJ5SGFzT3duTWV0YWRhdGEoTWV0YWRhdGFLZXksIE8sIFApO1xuICBpZihoYXNPd24pcmV0dXJuIG9yZGluYXJ5R2V0T3duTWV0YWRhdGEoTWV0YWRhdGFLZXksIE8sIFApO1xuICB2YXIgcGFyZW50ID0gZ2V0UHJvdG90eXBlT2YoTyk7XG4gIHJldHVybiBwYXJlbnQgIT09IG51bGwgPyBvcmRpbmFyeUdldE1ldGFkYXRhKE1ldGFkYXRhS2V5LCBwYXJlbnQsIFApIDogdW5kZWZpbmVkO1xufTtcblxubWV0YWRhdGEuZXhwKHtnZXRNZXRhZGF0YTogZnVuY3Rpb24gZ2V0TWV0YWRhdGEobWV0YWRhdGFLZXksIHRhcmdldCAvKiwgdGFyZ2V0S2V5ICovKXtcbiAgcmV0dXJuIG9yZGluYXJ5R2V0TWV0YWRhdGEobWV0YWRhdGFLZXksIGFuT2JqZWN0KHRhcmdldCksIGFyZ3VtZW50cy5sZW5ndGggPCAzID8gdW5kZWZpbmVkIDogdG9NZXRhS2V5KGFyZ3VtZW50c1syXSkpO1xufX0pOyIsInZhciBtZXRhZGF0YSAgICAgICAgICAgICAgICA9IHJlcXVpcmUoJy4vX21ldGFkYXRhJylcbiAgLCBhbk9iamVjdCAgICAgICAgICAgICAgICA9IHJlcXVpcmUoJy4vX2FuLW9iamVjdCcpXG4gICwgb3JkaW5hcnlPd25NZXRhZGF0YUtleXMgPSBtZXRhZGF0YS5rZXlzXG4gICwgdG9NZXRhS2V5ICAgICAgICAgICAgICAgPSBtZXRhZGF0YS5rZXk7XG5cbm1ldGFkYXRhLmV4cCh7Z2V0T3duTWV0YWRhdGFLZXlzOiBmdW5jdGlvbiBnZXRPd25NZXRhZGF0YUtleXModGFyZ2V0IC8qLCB0YXJnZXRLZXkgKi8pe1xuICByZXR1cm4gb3JkaW5hcnlPd25NZXRhZGF0YUtleXMoYW5PYmplY3QodGFyZ2V0KSwgYXJndW1lbnRzLmxlbmd0aCA8IDIgPyB1bmRlZmluZWQgOiB0b01ldGFLZXkoYXJndW1lbnRzWzFdKSk7XG59fSk7IiwidmFyIG1ldGFkYXRhICAgICAgICAgICAgICAgPSByZXF1aXJlKCcuL19tZXRhZGF0YScpXG4gICwgYW5PYmplY3QgICAgICAgICAgICAgICA9IHJlcXVpcmUoJy4vX2FuLW9iamVjdCcpXG4gICwgb3JkaW5hcnlHZXRPd25NZXRhZGF0YSA9IG1ldGFkYXRhLmdldFxuICAsIHRvTWV0YUtleSAgICAgICAgICAgICAgPSBtZXRhZGF0YS5rZXk7XG5cbm1ldGFkYXRhLmV4cCh7Z2V0T3duTWV0YWRhdGE6IGZ1bmN0aW9uIGdldE93bk1ldGFkYXRhKG1ldGFkYXRhS2V5LCB0YXJnZXQgLyosIHRhcmdldEtleSAqLyl7XG4gIHJldHVybiBvcmRpbmFyeUdldE93bk1ldGFkYXRhKG1ldGFkYXRhS2V5LCBhbk9iamVjdCh0YXJnZXQpXG4gICAgLCBhcmd1bWVudHMubGVuZ3RoIDwgMyA/IHVuZGVmaW5lZCA6IHRvTWV0YUtleShhcmd1bWVudHNbMl0pKTtcbn19KTsiLCJ2YXIgbWV0YWRhdGEgICAgICAgICAgICAgICA9IHJlcXVpcmUoJy4vX21ldGFkYXRhJylcbiAgLCBhbk9iamVjdCAgICAgICAgICAgICAgID0gcmVxdWlyZSgnLi9fYW4tb2JqZWN0JylcbiAgLCBnZXRQcm90b3R5cGVPZiAgICAgICAgID0gcmVxdWlyZSgnLi9fb2JqZWN0LWdwbycpXG4gICwgb3JkaW5hcnlIYXNPd25NZXRhZGF0YSA9IG1ldGFkYXRhLmhhc1xuICAsIHRvTWV0YUtleSAgICAgICAgICAgICAgPSBtZXRhZGF0YS5rZXk7XG5cbnZhciBvcmRpbmFyeUhhc01ldGFkYXRhID0gZnVuY3Rpb24oTWV0YWRhdGFLZXksIE8sIFApe1xuICB2YXIgaGFzT3duID0gb3JkaW5hcnlIYXNPd25NZXRhZGF0YShNZXRhZGF0YUtleSwgTywgUCk7XG4gIGlmKGhhc093bilyZXR1cm4gdHJ1ZTtcbiAgdmFyIHBhcmVudCA9IGdldFByb3RvdHlwZU9mKE8pO1xuICByZXR1cm4gcGFyZW50ICE9PSBudWxsID8gb3JkaW5hcnlIYXNNZXRhZGF0YShNZXRhZGF0YUtleSwgcGFyZW50LCBQKSA6IGZhbHNlO1xufTtcblxubWV0YWRhdGEuZXhwKHtoYXNNZXRhZGF0YTogZnVuY3Rpb24gaGFzTWV0YWRhdGEobWV0YWRhdGFLZXksIHRhcmdldCAvKiwgdGFyZ2V0S2V5ICovKXtcbiAgcmV0dXJuIG9yZGluYXJ5SGFzTWV0YWRhdGEobWV0YWRhdGFLZXksIGFuT2JqZWN0KHRhcmdldCksIGFyZ3VtZW50cy5sZW5ndGggPCAzID8gdW5kZWZpbmVkIDogdG9NZXRhS2V5KGFyZ3VtZW50c1syXSkpO1xufX0pOyIsInZhciBtZXRhZGF0YSAgICAgICAgICAgICAgID0gcmVxdWlyZSgnLi9fbWV0YWRhdGEnKVxuICAsIGFuT2JqZWN0ICAgICAgICAgICAgICAgPSByZXF1aXJlKCcuL19hbi1vYmplY3QnKVxuICAsIG9yZGluYXJ5SGFzT3duTWV0YWRhdGEgPSBtZXRhZGF0YS5oYXNcbiAgLCB0b01ldGFLZXkgICAgICAgICAgICAgID0gbWV0YWRhdGEua2V5O1xuXG5tZXRhZGF0YS5leHAoe2hhc093bk1ldGFkYXRhOiBmdW5jdGlvbiBoYXNPd25NZXRhZGF0YShtZXRhZGF0YUtleSwgdGFyZ2V0IC8qLCB0YXJnZXRLZXkgKi8pe1xuICByZXR1cm4gb3JkaW5hcnlIYXNPd25NZXRhZGF0YShtZXRhZGF0YUtleSwgYW5PYmplY3QodGFyZ2V0KVxuICAgICwgYXJndW1lbnRzLmxlbmd0aCA8IDMgPyB1bmRlZmluZWQgOiB0b01ldGFLZXkoYXJndW1lbnRzWzJdKSk7XG59fSk7IiwidmFyIG1ldGFkYXRhICAgICAgICAgICAgICAgICAgPSByZXF1aXJlKCcuL19tZXRhZGF0YScpXG4gICwgYW5PYmplY3QgICAgICAgICAgICAgICAgICA9IHJlcXVpcmUoJy4vX2FuLW9iamVjdCcpXG4gICwgYUZ1bmN0aW9uICAgICAgICAgICAgICAgICA9IHJlcXVpcmUoJy4vX2EtZnVuY3Rpb24nKVxuICAsIHRvTWV0YUtleSAgICAgICAgICAgICAgICAgPSBtZXRhZGF0YS5rZXlcbiAgLCBvcmRpbmFyeURlZmluZU93bk1ldGFkYXRhID0gbWV0YWRhdGEuc2V0O1xuXG5tZXRhZGF0YS5leHAoe21ldGFkYXRhOiBmdW5jdGlvbiBtZXRhZGF0YShtZXRhZGF0YUtleSwgbWV0YWRhdGFWYWx1ZSl7XG4gIHJldHVybiBmdW5jdGlvbiBkZWNvcmF0b3IodGFyZ2V0LCB0YXJnZXRLZXkpe1xuICAgIG9yZGluYXJ5RGVmaW5lT3duTWV0YWRhdGEoXG4gICAgICBtZXRhZGF0YUtleSwgbWV0YWRhdGFWYWx1ZSxcbiAgICAgICh0YXJnZXRLZXkgIT09IHVuZGVmaW5lZCA/IGFuT2JqZWN0IDogYUZ1bmN0aW9uKSh0YXJnZXQpLFxuICAgICAgdG9NZXRhS2V5KHRhcmdldEtleSlcbiAgICApO1xuICB9O1xufX0pOyIsIi8vIGh0dHBzOi8vZ2l0aHViLmNvbS9EYXZpZEJydWFudC9NYXAtU2V0LnByb3RvdHlwZS50b0pTT05cbnZhciAkZXhwb3J0ICA9IHJlcXVpcmUoJy4vX2V4cG9ydCcpO1xuXG4kZXhwb3J0KCRleHBvcnQuUCArICRleHBvcnQuUiwgJ1NldCcsIHt0b0pTT046IHJlcXVpcmUoJy4vX2NvbGxlY3Rpb24tdG8tanNvbicpKCdTZXQnKX0pOyIsIid1c2Ugc3RyaWN0Jztcbi8vIGh0dHBzOi8vZ2l0aHViLmNvbS9tYXRoaWFzYnluZW5zL1N0cmluZy5wcm90b3R5cGUuYXRcbnZhciAkZXhwb3J0ID0gcmVxdWlyZSgnLi9fZXhwb3J0JylcbiAgLCAkYXQgICAgID0gcmVxdWlyZSgnLi9fc3RyaW5nLWF0JykodHJ1ZSk7XG5cbiRleHBvcnQoJGV4cG9ydC5QLCAnU3RyaW5nJywge1xuICBhdDogZnVuY3Rpb24gYXQocG9zKXtcbiAgICByZXR1cm4gJGF0KHRoaXMsIHBvcyk7XG4gIH1cbn0pOyIsIid1c2Ugc3RyaWN0JztcclxuLy8gaHR0cHM6Ly90YzM5LmdpdGh1Yi5pby9TdHJpbmcucHJvdG90eXBlLm1hdGNoQWxsL1xyXG52YXIgJGV4cG9ydCAgICAgPSByZXF1aXJlKCcuL19leHBvcnQnKVxyXG4gICwgZGVmaW5lZCAgICAgPSByZXF1aXJlKCcuL19kZWZpbmVkJylcclxuICAsIHRvTGVuZ3RoICAgID0gcmVxdWlyZSgnLi9fdG8tbGVuZ3RoJylcclxuICAsIGlzUmVnRXhwICAgID0gcmVxdWlyZSgnLi9faXMtcmVnZXhwJylcclxuICAsIGdldEZsYWdzICAgID0gcmVxdWlyZSgnLi9fZmxhZ3MnKVxyXG4gICwgUmVnRXhwUHJvdG8gPSBSZWdFeHAucHJvdG90eXBlO1xyXG5cclxudmFyICRSZWdFeHBTdHJpbmdJdGVyYXRvciA9IGZ1bmN0aW9uKHJlZ2V4cCwgc3RyaW5nKXtcclxuICB0aGlzLl9yID0gcmVnZXhwO1xyXG4gIHRoaXMuX3MgPSBzdHJpbmc7XHJcbn07XHJcblxyXG5yZXF1aXJlKCcuL19pdGVyLWNyZWF0ZScpKCRSZWdFeHBTdHJpbmdJdGVyYXRvciwgJ1JlZ0V4cCBTdHJpbmcnLCBmdW5jdGlvbiBuZXh0KCl7XHJcbiAgdmFyIG1hdGNoID0gdGhpcy5fci5leGVjKHRoaXMuX3MpO1xyXG4gIHJldHVybiB7dmFsdWU6IG1hdGNoLCBkb25lOiBtYXRjaCA9PT0gbnVsbH07XHJcbn0pO1xyXG5cclxuJGV4cG9ydCgkZXhwb3J0LlAsICdTdHJpbmcnLCB7XHJcbiAgbWF0Y2hBbGw6IGZ1bmN0aW9uIG1hdGNoQWxsKHJlZ2V4cCl7XHJcbiAgICBkZWZpbmVkKHRoaXMpO1xyXG4gICAgaWYoIWlzUmVnRXhwKHJlZ2V4cCkpdGhyb3cgVHlwZUVycm9yKHJlZ2V4cCArICcgaXMgbm90IGEgcmVnZXhwIScpO1xyXG4gICAgdmFyIFMgICAgID0gU3RyaW5nKHRoaXMpXHJcbiAgICAgICwgZmxhZ3MgPSAnZmxhZ3MnIGluIFJlZ0V4cFByb3RvID8gU3RyaW5nKHJlZ2V4cC5mbGFncykgOiBnZXRGbGFncy5jYWxsKHJlZ2V4cClcclxuICAgICAgLCByeCAgICA9IG5ldyBSZWdFeHAocmVnZXhwLnNvdXJjZSwgfmZsYWdzLmluZGV4T2YoJ2cnKSA/IGZsYWdzIDogJ2cnICsgZmxhZ3MpO1xyXG4gICAgcngubGFzdEluZGV4ID0gdG9MZW5ndGgocmVnZXhwLmxhc3RJbmRleCk7XHJcbiAgICByZXR1cm4gbmV3ICRSZWdFeHBTdHJpbmdJdGVyYXRvcihyeCwgUyk7XHJcbiAgfVxyXG59KTsiLCIndXNlIHN0cmljdCc7XG4vLyBodHRwczovL2dpdGh1Yi5jb20vdGMzOS9wcm9wb3NhbC1zdHJpbmctcGFkLXN0YXJ0LWVuZFxudmFyICRleHBvcnQgPSByZXF1aXJlKCcuL19leHBvcnQnKVxuICAsICRwYWQgICAgPSByZXF1aXJlKCcuL19zdHJpbmctcGFkJyk7XG5cbiRleHBvcnQoJGV4cG9ydC5QLCAnU3RyaW5nJywge1xuICBwYWRFbmQ6IGZ1bmN0aW9uIHBhZEVuZChtYXhMZW5ndGggLyosIGZpbGxTdHJpbmcgPSAnICcgKi8pe1xuICAgIHJldHVybiAkcGFkKHRoaXMsIG1heExlbmd0aCwgYXJndW1lbnRzLmxlbmd0aCA+IDEgPyBhcmd1bWVudHNbMV0gOiB1bmRlZmluZWQsIGZhbHNlKTtcbiAgfVxufSk7IiwiJ3VzZSBzdHJpY3QnO1xuLy8gaHR0cHM6Ly9naXRodWIuY29tL3RjMzkvcHJvcG9zYWwtc3RyaW5nLXBhZC1zdGFydC1lbmRcbnZhciAkZXhwb3J0ID0gcmVxdWlyZSgnLi9fZXhwb3J0JylcbiAgLCAkcGFkICAgID0gcmVxdWlyZSgnLi9fc3RyaW5nLXBhZCcpO1xuXG4kZXhwb3J0KCRleHBvcnQuUCwgJ1N0cmluZycsIHtcbiAgcGFkU3RhcnQ6IGZ1bmN0aW9uIHBhZFN0YXJ0KG1heExlbmd0aCAvKiwgZmlsbFN0cmluZyA9ICcgJyAqLyl7XG4gICAgcmV0dXJuICRwYWQodGhpcywgbWF4TGVuZ3RoLCBhcmd1bWVudHMubGVuZ3RoID4gMSA/IGFyZ3VtZW50c1sxXSA6IHVuZGVmaW5lZCwgdHJ1ZSk7XG4gIH1cbn0pOyIsIid1c2Ugc3RyaWN0Jztcbi8vIGh0dHBzOi8vZ2l0aHViLmNvbS9zZWJtYXJrYmFnZS9lY21hc2NyaXB0LXN0cmluZy1sZWZ0LXJpZ2h0LXRyaW1cbnJlcXVpcmUoJy4vX3N0cmluZy10cmltJykoJ3RyaW1MZWZ0JywgZnVuY3Rpb24oJHRyaW0pe1xuICByZXR1cm4gZnVuY3Rpb24gdHJpbUxlZnQoKXtcbiAgICByZXR1cm4gJHRyaW0odGhpcywgMSk7XG4gIH07XG59LCAndHJpbVN0YXJ0Jyk7IiwiJ3VzZSBzdHJpY3QnO1xuLy8gaHR0cHM6Ly9naXRodWIuY29tL3NlYm1hcmtiYWdlL2VjbWFzY3JpcHQtc3RyaW5nLWxlZnQtcmlnaHQtdHJpbVxucmVxdWlyZSgnLi9fc3RyaW5nLXRyaW0nKSgndHJpbVJpZ2h0JywgZnVuY3Rpb24oJHRyaW0pe1xuICByZXR1cm4gZnVuY3Rpb24gdHJpbVJpZ2h0KCl7XG4gICAgcmV0dXJuICR0cmltKHRoaXMsIDIpO1xuICB9O1xufSwgJ3RyaW1FbmQnKTsiLCIvLyBodHRwczovL2dpdGh1Yi5jb20vbGpoYXJiL3Byb3Bvc2FsLWdsb2JhbFxudmFyICRleHBvcnQgPSByZXF1aXJlKCcuL19leHBvcnQnKTtcblxuJGV4cG9ydCgkZXhwb3J0LlMsICdTeXN0ZW0nLCB7Z2xvYmFsOiByZXF1aXJlKCcuL19nbG9iYWwnKX0pOyIsInZhciAkaXRlcmF0b3JzICAgID0gcmVxdWlyZSgnLi9lczYuYXJyYXkuaXRlcmF0b3InKVxuICAsIHJlZGVmaW5lICAgICAgPSByZXF1aXJlKCcuL19yZWRlZmluZScpXG4gICwgZ2xvYmFsICAgICAgICA9IHJlcXVpcmUoJy4vX2dsb2JhbCcpXG4gICwgaGlkZSAgICAgICAgICA9IHJlcXVpcmUoJy4vX2hpZGUnKVxuICAsIEl0ZXJhdG9ycyAgICAgPSByZXF1aXJlKCcuL19pdGVyYXRvcnMnKVxuICAsIHdrcyAgICAgICAgICAgPSByZXF1aXJlKCcuL193a3MnKVxuICAsIElURVJBVE9SICAgICAgPSB3a3MoJ2l0ZXJhdG9yJylcbiAgLCBUT19TVFJJTkdfVEFHID0gd2tzKCd0b1N0cmluZ1RhZycpXG4gICwgQXJyYXlWYWx1ZXMgICA9IEl0ZXJhdG9ycy5BcnJheTtcblxuZm9yKHZhciBjb2xsZWN0aW9ucyA9IFsnTm9kZUxpc3QnLCAnRE9NVG9rZW5MaXN0JywgJ01lZGlhTGlzdCcsICdTdHlsZVNoZWV0TGlzdCcsICdDU1NSdWxlTGlzdCddLCBpID0gMDsgaSA8IDU7IGkrKyl7XG4gIHZhciBOQU1FICAgICAgID0gY29sbGVjdGlvbnNbaV1cbiAgICAsIENvbGxlY3Rpb24gPSBnbG9iYWxbTkFNRV1cbiAgICAsIHByb3RvICAgICAgPSBDb2xsZWN0aW9uICYmIENvbGxlY3Rpb24ucHJvdG90eXBlXG4gICAgLCBrZXk7XG4gIGlmKHByb3RvKXtcbiAgICBpZighcHJvdG9bSVRFUkFUT1JdKWhpZGUocHJvdG8sIElURVJBVE9SLCBBcnJheVZhbHVlcyk7XG4gICAgaWYoIXByb3RvW1RPX1NUUklOR19UQUddKWhpZGUocHJvdG8sIFRPX1NUUklOR19UQUcsIE5BTUUpO1xuICAgIEl0ZXJhdG9yc1tOQU1FXSA9IEFycmF5VmFsdWVzO1xuICAgIGZvcihrZXkgaW4gJGl0ZXJhdG9ycylpZighcHJvdG9ba2V5XSlyZWRlZmluZShwcm90bywga2V5LCAkaXRlcmF0b3JzW2tleV0sIHRydWUpO1xuICB9XG59IiwidmFyICRleHBvcnQgPSByZXF1aXJlKCcuL19leHBvcnQnKVxuICAsICR0YXNrICAgPSByZXF1aXJlKCcuL190YXNrJyk7XG4kZXhwb3J0KCRleHBvcnQuRyArICRleHBvcnQuQiwge1xuICBzZXRJbW1lZGlhdGU6ICAgJHRhc2suc2V0LFxuICBjbGVhckltbWVkaWF0ZTogJHRhc2suY2xlYXJcbn0pOyIsIi8vIGllOS0gc2V0VGltZW91dCAmIHNldEludGVydmFsIGFkZGl0aW9uYWwgcGFyYW1ldGVycyBmaXhcbnZhciBnbG9iYWwgICAgID0gcmVxdWlyZSgnLi9fZ2xvYmFsJylcbiAgLCAkZXhwb3J0ICAgID0gcmVxdWlyZSgnLi9fZXhwb3J0JylcbiAgLCBpbnZva2UgICAgID0gcmVxdWlyZSgnLi9faW52b2tlJylcbiAgLCBwYXJ0aWFsICAgID0gcmVxdWlyZSgnLi9fcGFydGlhbCcpXG4gICwgbmF2aWdhdG9yICA9IGdsb2JhbC5uYXZpZ2F0b3JcbiAgLCBNU0lFICAgICAgID0gISFuYXZpZ2F0b3IgJiYgL01TSUUgLlxcLi8udGVzdChuYXZpZ2F0b3IudXNlckFnZW50KTsgLy8gPC0gZGlydHkgaWU5LSBjaGVja1xudmFyIHdyYXAgPSBmdW5jdGlvbihzZXQpe1xuICByZXR1cm4gTVNJRSA/IGZ1bmN0aW9uKGZuLCB0aW1lIC8qLCAuLi5hcmdzICovKXtcbiAgICByZXR1cm4gc2V0KGludm9rZShcbiAgICAgIHBhcnRpYWwsXG4gICAgICBbXS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMiksXG4gICAgICB0eXBlb2YgZm4gPT0gJ2Z1bmN0aW9uJyA/IGZuIDogRnVuY3Rpb24oZm4pXG4gICAgKSwgdGltZSk7XG4gIH0gOiBzZXQ7XG59O1xuJGV4cG9ydCgkZXhwb3J0LkcgKyAkZXhwb3J0LkIgKyAkZXhwb3J0LkYgKiBNU0lFLCB7XG4gIHNldFRpbWVvdXQ6ICB3cmFwKGdsb2JhbC5zZXRUaW1lb3V0KSxcbiAgc2V0SW50ZXJ2YWw6IHdyYXAoZ2xvYmFsLnNldEludGVydmFsKVxufSk7IiwicmVxdWlyZSgnLi9tb2R1bGVzL2VzNi5zeW1ib2wnKTtcbnJlcXVpcmUoJy4vbW9kdWxlcy9lczYub2JqZWN0LmNyZWF0ZScpO1xucmVxdWlyZSgnLi9tb2R1bGVzL2VzNi5vYmplY3QuZGVmaW5lLXByb3BlcnR5Jyk7XG5yZXF1aXJlKCcuL21vZHVsZXMvZXM2Lm9iamVjdC5kZWZpbmUtcHJvcGVydGllcycpO1xucmVxdWlyZSgnLi9tb2R1bGVzL2VzNi5vYmplY3QuZ2V0LW93bi1wcm9wZXJ0eS1kZXNjcmlwdG9yJyk7XG5yZXF1aXJlKCcuL21vZHVsZXMvZXM2Lm9iamVjdC5nZXQtcHJvdG90eXBlLW9mJyk7XG5yZXF1aXJlKCcuL21vZHVsZXMvZXM2Lm9iamVjdC5rZXlzJyk7XG5yZXF1aXJlKCcuL21vZHVsZXMvZXM2Lm9iamVjdC5nZXQtb3duLXByb3BlcnR5LW5hbWVzJyk7XG5yZXF1aXJlKCcuL21vZHVsZXMvZXM2Lm9iamVjdC5mcmVlemUnKTtcbnJlcXVpcmUoJy4vbW9kdWxlcy9lczYub2JqZWN0LnNlYWwnKTtcbnJlcXVpcmUoJy4vbW9kdWxlcy9lczYub2JqZWN0LnByZXZlbnQtZXh0ZW5zaW9ucycpO1xucmVxdWlyZSgnLi9tb2R1bGVzL2VzNi5vYmplY3QuaXMtZnJvemVuJyk7XG5yZXF1aXJlKCcuL21vZHVsZXMvZXM2Lm9iamVjdC5pcy1zZWFsZWQnKTtcbnJlcXVpcmUoJy4vbW9kdWxlcy9lczYub2JqZWN0LmlzLWV4dGVuc2libGUnKTtcbnJlcXVpcmUoJy4vbW9kdWxlcy9lczYub2JqZWN0LmFzc2lnbicpO1xucmVxdWlyZSgnLi9tb2R1bGVzL2VzNi5vYmplY3QuaXMnKTtcbnJlcXVpcmUoJy4vbW9kdWxlcy9lczYub2JqZWN0LnNldC1wcm90b3R5cGUtb2YnKTtcbnJlcXVpcmUoJy4vbW9kdWxlcy9lczYub2JqZWN0LnRvLXN0cmluZycpO1xucmVxdWlyZSgnLi9tb2R1bGVzL2VzNi5mdW5jdGlvbi5iaW5kJyk7XG5yZXF1aXJlKCcuL21vZHVsZXMvZXM2LmZ1bmN0aW9uLm5hbWUnKTtcbnJlcXVpcmUoJy4vbW9kdWxlcy9lczYuZnVuY3Rpb24uaGFzLWluc3RhbmNlJyk7XG5yZXF1aXJlKCcuL21vZHVsZXMvZXM2LnBhcnNlLWludCcpO1xucmVxdWlyZSgnLi9tb2R1bGVzL2VzNi5wYXJzZS1mbG9hdCcpO1xucmVxdWlyZSgnLi9tb2R1bGVzL2VzNi5udW1iZXIuY29uc3RydWN0b3InKTtcbnJlcXVpcmUoJy4vbW9kdWxlcy9lczYubnVtYmVyLnRvLWZpeGVkJyk7XG5yZXF1aXJlKCcuL21vZHVsZXMvZXM2Lm51bWJlci50by1wcmVjaXNpb24nKTtcbnJlcXVpcmUoJy4vbW9kdWxlcy9lczYubnVtYmVyLmVwc2lsb24nKTtcbnJlcXVpcmUoJy4vbW9kdWxlcy9lczYubnVtYmVyLmlzLWZpbml0ZScpO1xucmVxdWlyZSgnLi9tb2R1bGVzL2VzNi5udW1iZXIuaXMtaW50ZWdlcicpO1xucmVxdWlyZSgnLi9tb2R1bGVzL2VzNi5udW1iZXIuaXMtbmFuJyk7XG5yZXF1aXJlKCcuL21vZHVsZXMvZXM2Lm51bWJlci5pcy1zYWZlLWludGVnZXInKTtcbnJlcXVpcmUoJy4vbW9kdWxlcy9lczYubnVtYmVyLm1heC1zYWZlLWludGVnZXInKTtcbnJlcXVpcmUoJy4vbW9kdWxlcy9lczYubnVtYmVyLm1pbi1zYWZlLWludGVnZXInKTtcbnJlcXVpcmUoJy4vbW9kdWxlcy9lczYubnVtYmVyLnBhcnNlLWZsb2F0Jyk7XG5yZXF1aXJlKCcuL21vZHVsZXMvZXM2Lm51bWJlci5wYXJzZS1pbnQnKTtcbnJlcXVpcmUoJy4vbW9kdWxlcy9lczYubWF0aC5hY29zaCcpO1xucmVxdWlyZSgnLi9tb2R1bGVzL2VzNi5tYXRoLmFzaW5oJyk7XG5yZXF1aXJlKCcuL21vZHVsZXMvZXM2Lm1hdGguYXRhbmgnKTtcbnJlcXVpcmUoJy4vbW9kdWxlcy9lczYubWF0aC5jYnJ0Jyk7XG5yZXF1aXJlKCcuL21vZHVsZXMvZXM2Lm1hdGguY2x6MzInKTtcbnJlcXVpcmUoJy4vbW9kdWxlcy9lczYubWF0aC5jb3NoJyk7XG5yZXF1aXJlKCcuL21vZHVsZXMvZXM2Lm1hdGguZXhwbTEnKTtcbnJlcXVpcmUoJy4vbW9kdWxlcy9lczYubWF0aC5mcm91bmQnKTtcbnJlcXVpcmUoJy4vbW9kdWxlcy9lczYubWF0aC5oeXBvdCcpO1xucmVxdWlyZSgnLi9tb2R1bGVzL2VzNi5tYXRoLmltdWwnKTtcbnJlcXVpcmUoJy4vbW9kdWxlcy9lczYubWF0aC5sb2cxMCcpO1xucmVxdWlyZSgnLi9tb2R1bGVzL2VzNi5tYXRoLmxvZzFwJyk7XG5yZXF1aXJlKCcuL21vZHVsZXMvZXM2Lm1hdGgubG9nMicpO1xucmVxdWlyZSgnLi9tb2R1bGVzL2VzNi5tYXRoLnNpZ24nKTtcbnJlcXVpcmUoJy4vbW9kdWxlcy9lczYubWF0aC5zaW5oJyk7XG5yZXF1aXJlKCcuL21vZHVsZXMvZXM2Lm1hdGgudGFuaCcpO1xucmVxdWlyZSgnLi9tb2R1bGVzL2VzNi5tYXRoLnRydW5jJyk7XG5yZXF1aXJlKCcuL21vZHVsZXMvZXM2LnN0cmluZy5mcm9tLWNvZGUtcG9pbnQnKTtcbnJlcXVpcmUoJy4vbW9kdWxlcy9lczYuc3RyaW5nLnJhdycpO1xucmVxdWlyZSgnLi9tb2R1bGVzL2VzNi5zdHJpbmcudHJpbScpO1xucmVxdWlyZSgnLi9tb2R1bGVzL2VzNi5zdHJpbmcuaXRlcmF0b3InKTtcbnJlcXVpcmUoJy4vbW9kdWxlcy9lczYuc3RyaW5nLmNvZGUtcG9pbnQtYXQnKTtcbnJlcXVpcmUoJy4vbW9kdWxlcy9lczYuc3RyaW5nLmVuZHMtd2l0aCcpO1xucmVxdWlyZSgnLi9tb2R1bGVzL2VzNi5zdHJpbmcuaW5jbHVkZXMnKTtcbnJlcXVpcmUoJy4vbW9kdWxlcy9lczYuc3RyaW5nLnJlcGVhdCcpO1xucmVxdWlyZSgnLi9tb2R1bGVzL2VzNi5zdHJpbmcuc3RhcnRzLXdpdGgnKTtcbnJlcXVpcmUoJy4vbW9kdWxlcy9lczYuc3RyaW5nLmFuY2hvcicpO1xucmVxdWlyZSgnLi9tb2R1bGVzL2VzNi5zdHJpbmcuYmlnJyk7XG5yZXF1aXJlKCcuL21vZHVsZXMvZXM2LnN0cmluZy5ibGluaycpO1xucmVxdWlyZSgnLi9tb2R1bGVzL2VzNi5zdHJpbmcuYm9sZCcpO1xucmVxdWlyZSgnLi9tb2R1bGVzL2VzNi5zdHJpbmcuZml4ZWQnKTtcbnJlcXVpcmUoJy4vbW9kdWxlcy9lczYuc3RyaW5nLmZvbnRjb2xvcicpO1xucmVxdWlyZSgnLi9tb2R1bGVzL2VzNi5zdHJpbmcuZm9udHNpemUnKTtcbnJlcXVpcmUoJy4vbW9kdWxlcy9lczYuc3RyaW5nLml0YWxpY3MnKTtcbnJlcXVpcmUoJy4vbW9kdWxlcy9lczYuc3RyaW5nLmxpbmsnKTtcbnJlcXVpcmUoJy4vbW9kdWxlcy9lczYuc3RyaW5nLnNtYWxsJyk7XG5yZXF1aXJlKCcuL21vZHVsZXMvZXM2LnN0cmluZy5zdHJpa2UnKTtcbnJlcXVpcmUoJy4vbW9kdWxlcy9lczYuc3RyaW5nLnN1YicpO1xucmVxdWlyZSgnLi9tb2R1bGVzL2VzNi5zdHJpbmcuc3VwJyk7XG5yZXF1aXJlKCcuL21vZHVsZXMvZXM2LmRhdGUubm93Jyk7XG5yZXF1aXJlKCcuL21vZHVsZXMvZXM2LmRhdGUudG8tanNvbicpO1xucmVxdWlyZSgnLi9tb2R1bGVzL2VzNi5kYXRlLnRvLWlzby1zdHJpbmcnKTtcbnJlcXVpcmUoJy4vbW9kdWxlcy9lczYuZGF0ZS50by1zdHJpbmcnKTtcbnJlcXVpcmUoJy4vbW9kdWxlcy9lczYuZGF0ZS50by1wcmltaXRpdmUnKTtcbnJlcXVpcmUoJy4vbW9kdWxlcy9lczYuYXJyYXkuaXMtYXJyYXknKTtcbnJlcXVpcmUoJy4vbW9kdWxlcy9lczYuYXJyYXkuZnJvbScpO1xucmVxdWlyZSgnLi9tb2R1bGVzL2VzNi5hcnJheS5vZicpO1xucmVxdWlyZSgnLi9tb2R1bGVzL2VzNi5hcnJheS5qb2luJyk7XG5yZXF1aXJlKCcuL21vZHVsZXMvZXM2LmFycmF5LnNsaWNlJyk7XG5yZXF1aXJlKCcuL21vZHVsZXMvZXM2LmFycmF5LnNvcnQnKTtcbnJlcXVpcmUoJy4vbW9kdWxlcy9lczYuYXJyYXkuZm9yLWVhY2gnKTtcbnJlcXVpcmUoJy4vbW9kdWxlcy9lczYuYXJyYXkubWFwJyk7XG5yZXF1aXJlKCcuL21vZHVsZXMvZXM2LmFycmF5LmZpbHRlcicpO1xucmVxdWlyZSgnLi9tb2R1bGVzL2VzNi5hcnJheS5zb21lJyk7XG5yZXF1aXJlKCcuL21vZHVsZXMvZXM2LmFycmF5LmV2ZXJ5Jyk7XG5yZXF1aXJlKCcuL21vZHVsZXMvZXM2LmFycmF5LnJlZHVjZScpO1xucmVxdWlyZSgnLi9tb2R1bGVzL2VzNi5hcnJheS5yZWR1Y2UtcmlnaHQnKTtcbnJlcXVpcmUoJy4vbW9kdWxlcy9lczYuYXJyYXkuaW5kZXgtb2YnKTtcbnJlcXVpcmUoJy4vbW9kdWxlcy9lczYuYXJyYXkubGFzdC1pbmRleC1vZicpO1xucmVxdWlyZSgnLi9tb2R1bGVzL2VzNi5hcnJheS5jb3B5LXdpdGhpbicpO1xucmVxdWlyZSgnLi9tb2R1bGVzL2VzNi5hcnJheS5maWxsJyk7XG5yZXF1aXJlKCcuL21vZHVsZXMvZXM2LmFycmF5LmZpbmQnKTtcbnJlcXVpcmUoJy4vbW9kdWxlcy9lczYuYXJyYXkuZmluZC1pbmRleCcpO1xucmVxdWlyZSgnLi9tb2R1bGVzL2VzNi5hcnJheS5zcGVjaWVzJyk7XG5yZXF1aXJlKCcuL21vZHVsZXMvZXM2LmFycmF5Lml0ZXJhdG9yJyk7XG5yZXF1aXJlKCcuL21vZHVsZXMvZXM2LnJlZ2V4cC5jb25zdHJ1Y3RvcicpO1xucmVxdWlyZSgnLi9tb2R1bGVzL2VzNi5yZWdleHAudG8tc3RyaW5nJyk7XG5yZXF1aXJlKCcuL21vZHVsZXMvZXM2LnJlZ2V4cC5mbGFncycpO1xucmVxdWlyZSgnLi9tb2R1bGVzL2VzNi5yZWdleHAubWF0Y2gnKTtcbnJlcXVpcmUoJy4vbW9kdWxlcy9lczYucmVnZXhwLnJlcGxhY2UnKTtcbnJlcXVpcmUoJy4vbW9kdWxlcy9lczYucmVnZXhwLnNlYXJjaCcpO1xucmVxdWlyZSgnLi9tb2R1bGVzL2VzNi5yZWdleHAuc3BsaXQnKTtcbnJlcXVpcmUoJy4vbW9kdWxlcy9lczYucHJvbWlzZScpO1xucmVxdWlyZSgnLi9tb2R1bGVzL2VzNi5tYXAnKTtcbnJlcXVpcmUoJy4vbW9kdWxlcy9lczYuc2V0Jyk7XG5yZXF1aXJlKCcuL21vZHVsZXMvZXM2LndlYWstbWFwJyk7XG5yZXF1aXJlKCcuL21vZHVsZXMvZXM2LndlYWstc2V0Jyk7XG5yZXF1aXJlKCcuL21vZHVsZXMvZXM2LnR5cGVkLmFycmF5LWJ1ZmZlcicpO1xucmVxdWlyZSgnLi9tb2R1bGVzL2VzNi50eXBlZC5kYXRhLXZpZXcnKTtcbnJlcXVpcmUoJy4vbW9kdWxlcy9lczYudHlwZWQuaW50OC1hcnJheScpO1xucmVxdWlyZSgnLi9tb2R1bGVzL2VzNi50eXBlZC51aW50OC1hcnJheScpO1xucmVxdWlyZSgnLi9tb2R1bGVzL2VzNi50eXBlZC51aW50OC1jbGFtcGVkLWFycmF5Jyk7XG5yZXF1aXJlKCcuL21vZHVsZXMvZXM2LnR5cGVkLmludDE2LWFycmF5Jyk7XG5yZXF1aXJlKCcuL21vZHVsZXMvZXM2LnR5cGVkLnVpbnQxNi1hcnJheScpO1xucmVxdWlyZSgnLi9tb2R1bGVzL2VzNi50eXBlZC5pbnQzMi1hcnJheScpO1xucmVxdWlyZSgnLi9tb2R1bGVzL2VzNi50eXBlZC51aW50MzItYXJyYXknKTtcbnJlcXVpcmUoJy4vbW9kdWxlcy9lczYudHlwZWQuZmxvYXQzMi1hcnJheScpO1xucmVxdWlyZSgnLi9tb2R1bGVzL2VzNi50eXBlZC5mbG9hdDY0LWFycmF5Jyk7XG5yZXF1aXJlKCcuL21vZHVsZXMvZXM2LnJlZmxlY3QuYXBwbHknKTtcbnJlcXVpcmUoJy4vbW9kdWxlcy9lczYucmVmbGVjdC5jb25zdHJ1Y3QnKTtcbnJlcXVpcmUoJy4vbW9kdWxlcy9lczYucmVmbGVjdC5kZWZpbmUtcHJvcGVydHknKTtcbnJlcXVpcmUoJy4vbW9kdWxlcy9lczYucmVmbGVjdC5kZWxldGUtcHJvcGVydHknKTtcbnJlcXVpcmUoJy4vbW9kdWxlcy9lczYucmVmbGVjdC5lbnVtZXJhdGUnKTtcbnJlcXVpcmUoJy4vbW9kdWxlcy9lczYucmVmbGVjdC5nZXQnKTtcbnJlcXVpcmUoJy4vbW9kdWxlcy9lczYucmVmbGVjdC5nZXQtb3duLXByb3BlcnR5LWRlc2NyaXB0b3InKTtcbnJlcXVpcmUoJy4vbW9kdWxlcy9lczYucmVmbGVjdC5nZXQtcHJvdG90eXBlLW9mJyk7XG5yZXF1aXJlKCcuL21vZHVsZXMvZXM2LnJlZmxlY3QuaGFzJyk7XG5yZXF1aXJlKCcuL21vZHVsZXMvZXM2LnJlZmxlY3QuaXMtZXh0ZW5zaWJsZScpO1xucmVxdWlyZSgnLi9tb2R1bGVzL2VzNi5yZWZsZWN0Lm93bi1rZXlzJyk7XG5yZXF1aXJlKCcuL21vZHVsZXMvZXM2LnJlZmxlY3QucHJldmVudC1leHRlbnNpb25zJyk7XG5yZXF1aXJlKCcuL21vZHVsZXMvZXM2LnJlZmxlY3Quc2V0Jyk7XG5yZXF1aXJlKCcuL21vZHVsZXMvZXM2LnJlZmxlY3Quc2V0LXByb3RvdHlwZS1vZicpO1xucmVxdWlyZSgnLi9tb2R1bGVzL2VzNy5hcnJheS5pbmNsdWRlcycpO1xucmVxdWlyZSgnLi9tb2R1bGVzL2VzNy5zdHJpbmcuYXQnKTtcbnJlcXVpcmUoJy4vbW9kdWxlcy9lczcuc3RyaW5nLnBhZC1zdGFydCcpO1xucmVxdWlyZSgnLi9tb2R1bGVzL2VzNy5zdHJpbmcucGFkLWVuZCcpO1xucmVxdWlyZSgnLi9tb2R1bGVzL2VzNy5zdHJpbmcudHJpbS1sZWZ0Jyk7XG5yZXF1aXJlKCcuL21vZHVsZXMvZXM3LnN0cmluZy50cmltLXJpZ2h0Jyk7XG5yZXF1aXJlKCcuL21vZHVsZXMvZXM3LnN0cmluZy5tYXRjaC1hbGwnKTtcbnJlcXVpcmUoJy4vbW9kdWxlcy9lczcub2JqZWN0LmdldC1vd24tcHJvcGVydHktZGVzY3JpcHRvcnMnKTtcbnJlcXVpcmUoJy4vbW9kdWxlcy9lczcub2JqZWN0LnZhbHVlcycpO1xucmVxdWlyZSgnLi9tb2R1bGVzL2VzNy5vYmplY3QuZW50cmllcycpO1xucmVxdWlyZSgnLi9tb2R1bGVzL2VzNy5vYmplY3QuZGVmaW5lLWdldHRlcicpO1xucmVxdWlyZSgnLi9tb2R1bGVzL2VzNy5vYmplY3QuZGVmaW5lLXNldHRlcicpO1xucmVxdWlyZSgnLi9tb2R1bGVzL2VzNy5vYmplY3QubG9va3VwLWdldHRlcicpO1xucmVxdWlyZSgnLi9tb2R1bGVzL2VzNy5vYmplY3QubG9va3VwLXNldHRlcicpO1xucmVxdWlyZSgnLi9tb2R1bGVzL2VzNy5tYXAudG8tanNvbicpO1xucmVxdWlyZSgnLi9tb2R1bGVzL2VzNy5zZXQudG8tanNvbicpO1xucmVxdWlyZSgnLi9tb2R1bGVzL2VzNy5zeXN0ZW0uZ2xvYmFsJyk7XG5yZXF1aXJlKCcuL21vZHVsZXMvZXM3LmVycm9yLmlzLWVycm9yJyk7XG5yZXF1aXJlKCcuL21vZHVsZXMvZXM3Lm1hdGguaWFkZGgnKTtcbnJlcXVpcmUoJy4vbW9kdWxlcy9lczcubWF0aC5pc3ViaCcpO1xucmVxdWlyZSgnLi9tb2R1bGVzL2VzNy5tYXRoLmltdWxoJyk7XG5yZXF1aXJlKCcuL21vZHVsZXMvZXM3Lm1hdGgudW11bGgnKTtcbnJlcXVpcmUoJy4vbW9kdWxlcy9lczcucmVmbGVjdC5kZWZpbmUtbWV0YWRhdGEnKTtcbnJlcXVpcmUoJy4vbW9kdWxlcy9lczcucmVmbGVjdC5kZWxldGUtbWV0YWRhdGEnKTtcbnJlcXVpcmUoJy4vbW9kdWxlcy9lczcucmVmbGVjdC5nZXQtbWV0YWRhdGEnKTtcbnJlcXVpcmUoJy4vbW9kdWxlcy9lczcucmVmbGVjdC5nZXQtbWV0YWRhdGEta2V5cycpO1xucmVxdWlyZSgnLi9tb2R1bGVzL2VzNy5yZWZsZWN0LmdldC1vd24tbWV0YWRhdGEnKTtcbnJlcXVpcmUoJy4vbW9kdWxlcy9lczcucmVmbGVjdC5nZXQtb3duLW1ldGFkYXRhLWtleXMnKTtcbnJlcXVpcmUoJy4vbW9kdWxlcy9lczcucmVmbGVjdC5oYXMtbWV0YWRhdGEnKTtcbnJlcXVpcmUoJy4vbW9kdWxlcy9lczcucmVmbGVjdC5oYXMtb3duLW1ldGFkYXRhJyk7XG5yZXF1aXJlKCcuL21vZHVsZXMvZXM3LnJlZmxlY3QubWV0YWRhdGEnKTtcbnJlcXVpcmUoJy4vbW9kdWxlcy93ZWIudGltZXJzJyk7XG5yZXF1aXJlKCcuL21vZHVsZXMvd2ViLmltbWVkaWF0ZScpO1xucmVxdWlyZSgnLi9tb2R1bGVzL3dlYi5kb20uaXRlcmFibGUnKTtcbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9tb2R1bGVzL19jb3JlJyk7IiwiLyoqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTQsIEZhY2Vib29rLCBJbmMuXG4gKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIEJTRC1zdHlsZSBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogaHR0cHM6Ly9yYXcuZ2l0aHViLmNvbS9mYWNlYm9vay9yZWdlbmVyYXRvci9tYXN0ZXIvTElDRU5TRSBmaWxlLiBBblxuICogYWRkaXRpb25hbCBncmFudCBvZiBwYXRlbnQgcmlnaHRzIGNhbiBiZSBmb3VuZCBpbiB0aGUgUEFURU5UUyBmaWxlIGluXG4gKiB0aGUgc2FtZSBkaXJlY3RvcnkuXG4gKi9cblxuIShmdW5jdGlvbihnbG9iYWwpIHtcbiAgXCJ1c2Ugc3RyaWN0XCI7XG5cbiAgdmFyIGhhc093biA9IE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHk7XG4gIHZhciB1bmRlZmluZWQ7IC8vIE1vcmUgY29tcHJlc3NpYmxlIHRoYW4gdm9pZCAwLlxuICB2YXIgaXRlcmF0b3JTeW1ib2wgPVxuICAgIHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBTeW1ib2wuaXRlcmF0b3IgfHwgXCJAQGl0ZXJhdG9yXCI7XG5cbiAgdmFyIGluTW9kdWxlID0gdHlwZW9mIG1vZHVsZSA9PT0gXCJvYmplY3RcIjtcbiAgdmFyIHJ1bnRpbWUgPSBnbG9iYWwucmVnZW5lcmF0b3JSdW50aW1lO1xuICBpZiAocnVudGltZSkge1xuICAgIGlmIChpbk1vZHVsZSkge1xuICAgICAgLy8gSWYgcmVnZW5lcmF0b3JSdW50aW1lIGlzIGRlZmluZWQgZ2xvYmFsbHkgYW5kIHdlJ3JlIGluIGEgbW9kdWxlLFxuICAgICAgLy8gbWFrZSB0aGUgZXhwb3J0cyBvYmplY3QgaWRlbnRpY2FsIHRvIHJlZ2VuZXJhdG9yUnVudGltZS5cbiAgICAgIG1vZHVsZS5leHBvcnRzID0gcnVudGltZTtcbiAgICB9XG4gICAgLy8gRG9uJ3QgYm90aGVyIGV2YWx1YXRpbmcgdGhlIHJlc3Qgb2YgdGhpcyBmaWxlIGlmIHRoZSBydW50aW1lIHdhc1xuICAgIC8vIGFscmVhZHkgZGVmaW5lZCBnbG9iYWxseS5cbiAgICByZXR1cm47XG4gIH1cblxuICAvLyBEZWZpbmUgdGhlIHJ1bnRpbWUgZ2xvYmFsbHkgKGFzIGV4cGVjdGVkIGJ5IGdlbmVyYXRlZCBjb2RlKSBhcyBlaXRoZXJcbiAgLy8gbW9kdWxlLmV4cG9ydHMgKGlmIHdlJ3JlIGluIGEgbW9kdWxlKSBvciBhIG5ldywgZW1wdHkgb2JqZWN0LlxuICBydW50aW1lID0gZ2xvYmFsLnJlZ2VuZXJhdG9yUnVudGltZSA9IGluTW9kdWxlID8gbW9kdWxlLmV4cG9ydHMgOiB7fTtcblxuICBmdW5jdGlvbiB3cmFwKGlubmVyRm4sIG91dGVyRm4sIHNlbGYsIHRyeUxvY3NMaXN0KSB7XG4gICAgLy8gSWYgb3V0ZXJGbiBwcm92aWRlZCwgdGhlbiBvdXRlckZuLnByb3RvdHlwZSBpbnN0YW5jZW9mIEdlbmVyYXRvci5cbiAgICB2YXIgZ2VuZXJhdG9yID0gT2JqZWN0LmNyZWF0ZSgob3V0ZXJGbiB8fCBHZW5lcmF0b3IpLnByb3RvdHlwZSk7XG4gICAgdmFyIGNvbnRleHQgPSBuZXcgQ29udGV4dCh0cnlMb2NzTGlzdCB8fCBbXSk7XG5cbiAgICAvLyBUaGUgLl9pbnZva2UgbWV0aG9kIHVuaWZpZXMgdGhlIGltcGxlbWVudGF0aW9ucyBvZiB0aGUgLm5leHQsXG4gICAgLy8gLnRocm93LCBhbmQgLnJldHVybiBtZXRob2RzLlxuICAgIGdlbmVyYXRvci5faW52b2tlID0gbWFrZUludm9rZU1ldGhvZChpbm5lckZuLCBzZWxmLCBjb250ZXh0KTtcblxuICAgIHJldHVybiBnZW5lcmF0b3I7XG4gIH1cbiAgcnVudGltZS53cmFwID0gd3JhcDtcblxuICAvLyBUcnkvY2F0Y2ggaGVscGVyIHRvIG1pbmltaXplIGRlb3B0aW1pemF0aW9ucy4gUmV0dXJucyBhIGNvbXBsZXRpb25cbiAgLy8gcmVjb3JkIGxpa2UgY29udGV4dC50cnlFbnRyaWVzW2ldLmNvbXBsZXRpb24uIFRoaXMgaW50ZXJmYWNlIGNvdWxkXG4gIC8vIGhhdmUgYmVlbiAoYW5kIHdhcyBwcmV2aW91c2x5KSBkZXNpZ25lZCB0byB0YWtlIGEgY2xvc3VyZSB0byBiZVxuICAvLyBpbnZva2VkIHdpdGhvdXQgYXJndW1lbnRzLCBidXQgaW4gYWxsIHRoZSBjYXNlcyB3ZSBjYXJlIGFib3V0IHdlXG4gIC8vIGFscmVhZHkgaGF2ZSBhbiBleGlzdGluZyBtZXRob2Qgd2Ugd2FudCB0byBjYWxsLCBzbyB0aGVyZSdzIG5vIG5lZWRcbiAgLy8gdG8gY3JlYXRlIGEgbmV3IGZ1bmN0aW9uIG9iamVjdC4gV2UgY2FuIGV2ZW4gZ2V0IGF3YXkgd2l0aCBhc3N1bWluZ1xuICAvLyB0aGUgbWV0aG9kIHRha2VzIGV4YWN0bHkgb25lIGFyZ3VtZW50LCBzaW5jZSB0aGF0IGhhcHBlbnMgdG8gYmUgdHJ1ZVxuICAvLyBpbiBldmVyeSBjYXNlLCBzbyB3ZSBkb24ndCBoYXZlIHRvIHRvdWNoIHRoZSBhcmd1bWVudHMgb2JqZWN0LiBUaGVcbiAgLy8gb25seSBhZGRpdGlvbmFsIGFsbG9jYXRpb24gcmVxdWlyZWQgaXMgdGhlIGNvbXBsZXRpb24gcmVjb3JkLCB3aGljaFxuICAvLyBoYXMgYSBzdGFibGUgc2hhcGUgYW5kIHNvIGhvcGVmdWxseSBzaG91bGQgYmUgY2hlYXAgdG8gYWxsb2NhdGUuXG4gIGZ1bmN0aW9uIHRyeUNhdGNoKGZuLCBvYmosIGFyZykge1xuICAgIHRyeSB7XG4gICAgICByZXR1cm4geyB0eXBlOiBcIm5vcm1hbFwiLCBhcmc6IGZuLmNhbGwob2JqLCBhcmcpIH07XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICByZXR1cm4geyB0eXBlOiBcInRocm93XCIsIGFyZzogZXJyIH07XG4gICAgfVxuICB9XG5cbiAgdmFyIEdlblN0YXRlU3VzcGVuZGVkU3RhcnQgPSBcInN1c3BlbmRlZFN0YXJ0XCI7XG4gIHZhciBHZW5TdGF0ZVN1c3BlbmRlZFlpZWxkID0gXCJzdXNwZW5kZWRZaWVsZFwiO1xuICB2YXIgR2VuU3RhdGVFeGVjdXRpbmcgPSBcImV4ZWN1dGluZ1wiO1xuICB2YXIgR2VuU3RhdGVDb21wbGV0ZWQgPSBcImNvbXBsZXRlZFwiO1xuXG4gIC8vIFJldHVybmluZyB0aGlzIG9iamVjdCBmcm9tIHRoZSBpbm5lckZuIGhhcyB0aGUgc2FtZSBlZmZlY3QgYXNcbiAgLy8gYnJlYWtpbmcgb3V0IG9mIHRoZSBkaXNwYXRjaCBzd2l0Y2ggc3RhdGVtZW50LlxuICB2YXIgQ29udGludWVTZW50aW5lbCA9IHt9O1xuXG4gIC8vIER1bW15IGNvbnN0cnVjdG9yIGZ1bmN0aW9ucyB0aGF0IHdlIHVzZSBhcyB0aGUgLmNvbnN0cnVjdG9yIGFuZFxuICAvLyAuY29uc3RydWN0b3IucHJvdG90eXBlIHByb3BlcnRpZXMgZm9yIGZ1bmN0aW9ucyB0aGF0IHJldHVybiBHZW5lcmF0b3JcbiAgLy8gb2JqZWN0cy4gRm9yIGZ1bGwgc3BlYyBjb21wbGlhbmNlLCB5b3UgbWF5IHdpc2ggdG8gY29uZmlndXJlIHlvdXJcbiAgLy8gbWluaWZpZXIgbm90IHRvIG1hbmdsZSB0aGUgbmFtZXMgb2YgdGhlc2UgdHdvIGZ1bmN0aW9ucy5cbiAgZnVuY3Rpb24gR2VuZXJhdG9yKCkge31cbiAgZnVuY3Rpb24gR2VuZXJhdG9yRnVuY3Rpb24oKSB7fVxuICBmdW5jdGlvbiBHZW5lcmF0b3JGdW5jdGlvblByb3RvdHlwZSgpIHt9XG5cbiAgdmFyIEdwID0gR2VuZXJhdG9yRnVuY3Rpb25Qcm90b3R5cGUucHJvdG90eXBlID0gR2VuZXJhdG9yLnByb3RvdHlwZTtcbiAgR2VuZXJhdG9yRnVuY3Rpb24ucHJvdG90eXBlID0gR3AuY29uc3RydWN0b3IgPSBHZW5lcmF0b3JGdW5jdGlvblByb3RvdHlwZTtcbiAgR2VuZXJhdG9yRnVuY3Rpb25Qcm90b3R5cGUuY29uc3RydWN0b3IgPSBHZW5lcmF0b3JGdW5jdGlvbjtcbiAgR2VuZXJhdG9yRnVuY3Rpb24uZGlzcGxheU5hbWUgPSBcIkdlbmVyYXRvckZ1bmN0aW9uXCI7XG5cbiAgLy8gSGVscGVyIGZvciBkZWZpbmluZyB0aGUgLm5leHQsIC50aHJvdywgYW5kIC5yZXR1cm4gbWV0aG9kcyBvZiB0aGVcbiAgLy8gSXRlcmF0b3IgaW50ZXJmYWNlIGluIHRlcm1zIG9mIGEgc2luZ2xlIC5faW52b2tlIG1ldGhvZC5cbiAgZnVuY3Rpb24gZGVmaW5lSXRlcmF0b3JNZXRob2RzKHByb3RvdHlwZSkge1xuICAgIFtcIm5leHRcIiwgXCJ0aHJvd1wiLCBcInJldHVyblwiXS5mb3JFYWNoKGZ1bmN0aW9uKG1ldGhvZCkge1xuICAgICAgcHJvdG90eXBlW21ldGhvZF0gPSBmdW5jdGlvbihhcmcpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2ludm9rZShtZXRob2QsIGFyZyk7XG4gICAgICB9O1xuICAgIH0pO1xuICB9XG5cbiAgcnVudGltZS5pc0dlbmVyYXRvckZ1bmN0aW9uID0gZnVuY3Rpb24oZ2VuRnVuKSB7XG4gICAgdmFyIGN0b3IgPSB0eXBlb2YgZ2VuRnVuID09PSBcImZ1bmN0aW9uXCIgJiYgZ2VuRnVuLmNvbnN0cnVjdG9yO1xuICAgIHJldHVybiBjdG9yXG4gICAgICA/IGN0b3IgPT09IEdlbmVyYXRvckZ1bmN0aW9uIHx8XG4gICAgICAgIC8vIEZvciB0aGUgbmF0aXZlIEdlbmVyYXRvckZ1bmN0aW9uIGNvbnN0cnVjdG9yLCB0aGUgYmVzdCB3ZSBjYW5cbiAgICAgICAgLy8gZG8gaXMgdG8gY2hlY2sgaXRzIC5uYW1lIHByb3BlcnR5LlxuICAgICAgICAoY3Rvci5kaXNwbGF5TmFtZSB8fCBjdG9yLm5hbWUpID09PSBcIkdlbmVyYXRvckZ1bmN0aW9uXCJcbiAgICAgIDogZmFsc2U7XG4gIH07XG5cbiAgcnVudGltZS5tYXJrID0gZnVuY3Rpb24oZ2VuRnVuKSB7XG4gICAgaWYgKE9iamVjdC5zZXRQcm90b3R5cGVPZikge1xuICAgICAgT2JqZWN0LnNldFByb3RvdHlwZU9mKGdlbkZ1biwgR2VuZXJhdG9yRnVuY3Rpb25Qcm90b3R5cGUpO1xuICAgIH0gZWxzZSB7XG4gICAgICBnZW5GdW4uX19wcm90b19fID0gR2VuZXJhdG9yRnVuY3Rpb25Qcm90b3R5cGU7XG4gICAgfVxuICAgIGdlbkZ1bi5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKEdwKTtcbiAgICByZXR1cm4gZ2VuRnVuO1xuICB9O1xuXG4gIC8vIFdpdGhpbiB0aGUgYm9keSBvZiBhbnkgYXN5bmMgZnVuY3Rpb24sIGBhd2FpdCB4YCBpcyB0cmFuc2Zvcm1lZCB0b1xuICAvLyBgeWllbGQgcmVnZW5lcmF0b3JSdW50aW1lLmF3cmFwKHgpYCwgc28gdGhhdCB0aGUgcnVudGltZSBjYW4gdGVzdFxuICAvLyBgdmFsdWUgaW5zdGFuY2VvZiBBd2FpdEFyZ3VtZW50YCB0byBkZXRlcm1pbmUgaWYgdGhlIHlpZWxkZWQgdmFsdWUgaXNcbiAgLy8gbWVhbnQgdG8gYmUgYXdhaXRlZC4gU29tZSBtYXkgY29uc2lkZXIgdGhlIG5hbWUgb2YgdGhpcyBtZXRob2QgdG9vXG4gIC8vIGN1dGVzeSwgYnV0IHRoZXkgYXJlIGN1cm11ZGdlb25zLlxuICBydW50aW1lLmF3cmFwID0gZnVuY3Rpb24oYXJnKSB7XG4gICAgcmV0dXJuIG5ldyBBd2FpdEFyZ3VtZW50KGFyZyk7XG4gIH07XG5cbiAgZnVuY3Rpb24gQXdhaXRBcmd1bWVudChhcmcpIHtcbiAgICB0aGlzLmFyZyA9IGFyZztcbiAgfVxuXG4gIGZ1bmN0aW9uIEFzeW5jSXRlcmF0b3IoZ2VuZXJhdG9yKSB7XG4gICAgLy8gVGhpcyBpbnZva2UgZnVuY3Rpb24gaXMgd3JpdHRlbiBpbiBhIHN0eWxlIHRoYXQgYXNzdW1lcyBzb21lXG4gICAgLy8gY2FsbGluZyBmdW5jdGlvbiAob3IgUHJvbWlzZSkgd2lsbCBoYW5kbGUgZXhjZXB0aW9ucy5cbiAgICBmdW5jdGlvbiBpbnZva2UobWV0aG9kLCBhcmcpIHtcbiAgICAgIHZhciByZXN1bHQgPSBnZW5lcmF0b3JbbWV0aG9kXShhcmcpO1xuICAgICAgdmFyIHZhbHVlID0gcmVzdWx0LnZhbHVlO1xuICAgICAgcmV0dXJuIHZhbHVlIGluc3RhbmNlb2YgQXdhaXRBcmd1bWVudFxuICAgICAgICA/IFByb21pc2UucmVzb2x2ZSh2YWx1ZS5hcmcpLnRoZW4oaW52b2tlTmV4dCwgaW52b2tlVGhyb3cpXG4gICAgICAgIDogUHJvbWlzZS5yZXNvbHZlKHZhbHVlKS50aGVuKGZ1bmN0aW9uKHVud3JhcHBlZCkge1xuICAgICAgICAgICAgLy8gV2hlbiBhIHlpZWxkZWQgUHJvbWlzZSBpcyByZXNvbHZlZCwgaXRzIGZpbmFsIHZhbHVlIGJlY29tZXNcbiAgICAgICAgICAgIC8vIHRoZSAudmFsdWUgb2YgdGhlIFByb21pc2U8e3ZhbHVlLGRvbmV9PiByZXN1bHQgZm9yIHRoZVxuICAgICAgICAgICAgLy8gY3VycmVudCBpdGVyYXRpb24uIElmIHRoZSBQcm9taXNlIGlzIHJlamVjdGVkLCBob3dldmVyLCB0aGVcbiAgICAgICAgICAgIC8vIHJlc3VsdCBmb3IgdGhpcyBpdGVyYXRpb24gd2lsbCBiZSByZWplY3RlZCB3aXRoIHRoZSBzYW1lXG4gICAgICAgICAgICAvLyByZWFzb24uIE5vdGUgdGhhdCByZWplY3Rpb25zIG9mIHlpZWxkZWQgUHJvbWlzZXMgYXJlIG5vdFxuICAgICAgICAgICAgLy8gdGhyb3duIGJhY2sgaW50byB0aGUgZ2VuZXJhdG9yIGZ1bmN0aW9uLCBhcyBpcyB0aGUgY2FzZVxuICAgICAgICAgICAgLy8gd2hlbiBhbiBhd2FpdGVkIFByb21pc2UgaXMgcmVqZWN0ZWQuIFRoaXMgZGlmZmVyZW5jZSBpblxuICAgICAgICAgICAgLy8gYmVoYXZpb3IgYmV0d2VlbiB5aWVsZCBhbmQgYXdhaXQgaXMgaW1wb3J0YW50LCBiZWNhdXNlIGl0XG4gICAgICAgICAgICAvLyBhbGxvd3MgdGhlIGNvbnN1bWVyIHRvIGRlY2lkZSB3aGF0IHRvIGRvIHdpdGggdGhlIHlpZWxkZWRcbiAgICAgICAgICAgIC8vIHJlamVjdGlvbiAoc3dhbGxvdyBpdCBhbmQgY29udGludWUsIG1hbnVhbGx5IC50aHJvdyBpdCBiYWNrXG4gICAgICAgICAgICAvLyBpbnRvIHRoZSBnZW5lcmF0b3IsIGFiYW5kb24gaXRlcmF0aW9uLCB3aGF0ZXZlcikuIFdpdGhcbiAgICAgICAgICAgIC8vIGF3YWl0LCBieSBjb250cmFzdCwgdGhlcmUgaXMgbm8gb3Bwb3J0dW5pdHkgdG8gZXhhbWluZSB0aGVcbiAgICAgICAgICAgIC8vIHJlamVjdGlvbiByZWFzb24gb3V0c2lkZSB0aGUgZ2VuZXJhdG9yIGZ1bmN0aW9uLCBzbyB0aGVcbiAgICAgICAgICAgIC8vIG9ubHkgb3B0aW9uIGlzIHRvIHRocm93IGl0IGZyb20gdGhlIGF3YWl0IGV4cHJlc3Npb24sIGFuZFxuICAgICAgICAgICAgLy8gbGV0IHRoZSBnZW5lcmF0b3IgZnVuY3Rpb24gaGFuZGxlIHRoZSBleGNlcHRpb24uXG4gICAgICAgICAgICByZXN1bHQudmFsdWUgPSB1bndyYXBwZWQ7XG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICAgIH0pO1xuICAgIH1cblxuICAgIGlmICh0eXBlb2YgcHJvY2VzcyA9PT0gXCJvYmplY3RcIiAmJiBwcm9jZXNzLmRvbWFpbikge1xuICAgICAgaW52b2tlID0gcHJvY2Vzcy5kb21haW4uYmluZChpbnZva2UpO1xuICAgIH1cblxuICAgIHZhciBpbnZva2VOZXh0ID0gaW52b2tlLmJpbmQoZ2VuZXJhdG9yLCBcIm5leHRcIik7XG4gICAgdmFyIGludm9rZVRocm93ID0gaW52b2tlLmJpbmQoZ2VuZXJhdG9yLCBcInRocm93XCIpO1xuICAgIHZhciBpbnZva2VSZXR1cm4gPSBpbnZva2UuYmluZChnZW5lcmF0b3IsIFwicmV0dXJuXCIpO1xuICAgIHZhciBwcmV2aW91c1Byb21pc2U7XG5cbiAgICBmdW5jdGlvbiBlbnF1ZXVlKG1ldGhvZCwgYXJnKSB7XG4gICAgICBmdW5jdGlvbiBjYWxsSW52b2tlV2l0aE1ldGhvZEFuZEFyZygpIHtcbiAgICAgICAgcmV0dXJuIGludm9rZShtZXRob2QsIGFyZyk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBwcmV2aW91c1Byb21pc2UgPVxuICAgICAgICAvLyBJZiBlbnF1ZXVlIGhhcyBiZWVuIGNhbGxlZCBiZWZvcmUsIHRoZW4gd2Ugd2FudCB0byB3YWl0IHVudGlsXG4gICAgICAgIC8vIGFsbCBwcmV2aW91cyBQcm9taXNlcyBoYXZlIGJlZW4gcmVzb2x2ZWQgYmVmb3JlIGNhbGxpbmcgaW52b2tlLFxuICAgICAgICAvLyBzbyB0aGF0IHJlc3VsdHMgYXJlIGFsd2F5cyBkZWxpdmVyZWQgaW4gdGhlIGNvcnJlY3Qgb3JkZXIuIElmXG4gICAgICAgIC8vIGVucXVldWUgaGFzIG5vdCBiZWVuIGNhbGxlZCBiZWZvcmUsIHRoZW4gaXQgaXMgaW1wb3J0YW50IHRvXG4gICAgICAgIC8vIGNhbGwgaW52b2tlIGltbWVkaWF0ZWx5LCB3aXRob3V0IHdhaXRpbmcgb24gYSBjYWxsYmFjayB0byBmaXJlLFxuICAgICAgICAvLyBzbyB0aGF0IHRoZSBhc3luYyBnZW5lcmF0b3IgZnVuY3Rpb24gaGFzIHRoZSBvcHBvcnR1bml0eSB0byBkb1xuICAgICAgICAvLyBhbnkgbmVjZXNzYXJ5IHNldHVwIGluIGEgcHJlZGljdGFibGUgd2F5LiBUaGlzIHByZWRpY3RhYmlsaXR5XG4gICAgICAgIC8vIGlzIHdoeSB0aGUgUHJvbWlzZSBjb25zdHJ1Y3RvciBzeW5jaHJvbm91c2x5IGludm9rZXMgaXRzXG4gICAgICAgIC8vIGV4ZWN1dG9yIGNhbGxiYWNrLCBhbmQgd2h5IGFzeW5jIGZ1bmN0aW9ucyBzeW5jaHJvbm91c2x5XG4gICAgICAgIC8vIGV4ZWN1dGUgY29kZSBiZWZvcmUgdGhlIGZpcnN0IGF3YWl0LiBTaW5jZSB3ZSBpbXBsZW1lbnQgc2ltcGxlXG4gICAgICAgIC8vIGFzeW5jIGZ1bmN0aW9ucyBpbiB0ZXJtcyBvZiBhc3luYyBnZW5lcmF0b3JzLCBpdCBpcyBlc3BlY2lhbGx5XG4gICAgICAgIC8vIGltcG9ydGFudCB0byBnZXQgdGhpcyByaWdodCwgZXZlbiB0aG91Z2ggaXQgcmVxdWlyZXMgY2FyZS5cbiAgICAgICAgcHJldmlvdXNQcm9taXNlID8gcHJldmlvdXNQcm9taXNlLnRoZW4oXG4gICAgICAgICAgY2FsbEludm9rZVdpdGhNZXRob2RBbmRBcmcsXG4gICAgICAgICAgLy8gQXZvaWQgcHJvcGFnYXRpbmcgZmFpbHVyZXMgdG8gUHJvbWlzZXMgcmV0dXJuZWQgYnkgbGF0ZXJcbiAgICAgICAgICAvLyBpbnZvY2F0aW9ucyBvZiB0aGUgaXRlcmF0b3IuXG4gICAgICAgICAgY2FsbEludm9rZVdpdGhNZXRob2RBbmRBcmdcbiAgICAgICAgKSA6IG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlKSB7XG4gICAgICAgICAgcmVzb2x2ZShjYWxsSW52b2tlV2l0aE1ldGhvZEFuZEFyZygpKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLy8gRGVmaW5lIHRoZSB1bmlmaWVkIGhlbHBlciBtZXRob2QgdGhhdCBpcyB1c2VkIHRvIGltcGxlbWVudCAubmV4dCxcbiAgICAvLyAudGhyb3csIGFuZCAucmV0dXJuIChzZWUgZGVmaW5lSXRlcmF0b3JNZXRob2RzKS5cbiAgICB0aGlzLl9pbnZva2UgPSBlbnF1ZXVlO1xuICB9XG5cbiAgZGVmaW5lSXRlcmF0b3JNZXRob2RzKEFzeW5jSXRlcmF0b3IucHJvdG90eXBlKTtcblxuICAvLyBOb3RlIHRoYXQgc2ltcGxlIGFzeW5jIGZ1bmN0aW9ucyBhcmUgaW1wbGVtZW50ZWQgb24gdG9wIG9mXG4gIC8vIEFzeW5jSXRlcmF0b3Igb2JqZWN0czsgdGhleSBqdXN0IHJldHVybiBhIFByb21pc2UgZm9yIHRoZSB2YWx1ZSBvZlxuICAvLyB0aGUgZmluYWwgcmVzdWx0IHByb2R1Y2VkIGJ5IHRoZSBpdGVyYXRvci5cbiAgcnVudGltZS5hc3luYyA9IGZ1bmN0aW9uKGlubmVyRm4sIG91dGVyRm4sIHNlbGYsIHRyeUxvY3NMaXN0KSB7XG4gICAgdmFyIGl0ZXIgPSBuZXcgQXN5bmNJdGVyYXRvcihcbiAgICAgIHdyYXAoaW5uZXJGbiwgb3V0ZXJGbiwgc2VsZiwgdHJ5TG9jc0xpc3QpXG4gICAgKTtcblxuICAgIHJldHVybiBydW50aW1lLmlzR2VuZXJhdG9yRnVuY3Rpb24ob3V0ZXJGbilcbiAgICAgID8gaXRlciAvLyBJZiBvdXRlckZuIGlzIGEgZ2VuZXJhdG9yLCByZXR1cm4gdGhlIGZ1bGwgaXRlcmF0b3IuXG4gICAgICA6IGl0ZXIubmV4dCgpLnRoZW4oZnVuY3Rpb24ocmVzdWx0KSB7XG4gICAgICAgICAgcmV0dXJuIHJlc3VsdC5kb25lID8gcmVzdWx0LnZhbHVlIDogaXRlci5uZXh0KCk7XG4gICAgICAgIH0pO1xuICB9O1xuXG4gIGZ1bmN0aW9uIG1ha2VJbnZva2VNZXRob2QoaW5uZXJGbiwgc2VsZiwgY29udGV4dCkge1xuICAgIHZhciBzdGF0ZSA9IEdlblN0YXRlU3VzcGVuZGVkU3RhcnQ7XG5cbiAgICByZXR1cm4gZnVuY3Rpb24gaW52b2tlKG1ldGhvZCwgYXJnKSB7XG4gICAgICBpZiAoc3RhdGUgPT09IEdlblN0YXRlRXhlY3V0aW5nKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIkdlbmVyYXRvciBpcyBhbHJlYWR5IHJ1bm5pbmdcIik7XG4gICAgICB9XG5cbiAgICAgIGlmIChzdGF0ZSA9PT0gR2VuU3RhdGVDb21wbGV0ZWQpIHtcbiAgICAgICAgaWYgKG1ldGhvZCA9PT0gXCJ0aHJvd1wiKSB7XG4gICAgICAgICAgdGhyb3cgYXJnO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gQmUgZm9yZ2l2aW5nLCBwZXIgMjUuMy4zLjMuMyBvZiB0aGUgc3BlYzpcbiAgICAgICAgLy8gaHR0cHM6Ly9wZW9wbGUubW96aWxsYS5vcmcvfmpvcmVuZG9yZmYvZXM2LWRyYWZ0Lmh0bWwjc2VjLWdlbmVyYXRvcnJlc3VtZVxuICAgICAgICByZXR1cm4gZG9uZVJlc3VsdCgpO1xuICAgICAgfVxuXG4gICAgICB3aGlsZSAodHJ1ZSkge1xuICAgICAgICB2YXIgZGVsZWdhdGUgPSBjb250ZXh0LmRlbGVnYXRlO1xuICAgICAgICBpZiAoZGVsZWdhdGUpIHtcbiAgICAgICAgICBpZiAobWV0aG9kID09PSBcInJldHVyblwiIHx8XG4gICAgICAgICAgICAgIChtZXRob2QgPT09IFwidGhyb3dcIiAmJiBkZWxlZ2F0ZS5pdGVyYXRvclttZXRob2RdID09PSB1bmRlZmluZWQpKSB7XG4gICAgICAgICAgICAvLyBBIHJldHVybiBvciB0aHJvdyAod2hlbiB0aGUgZGVsZWdhdGUgaXRlcmF0b3IgaGFzIG5vIHRocm93XG4gICAgICAgICAgICAvLyBtZXRob2QpIGFsd2F5cyB0ZXJtaW5hdGVzIHRoZSB5aWVsZCogbG9vcC5cbiAgICAgICAgICAgIGNvbnRleHQuZGVsZWdhdGUgPSBudWxsO1xuXG4gICAgICAgICAgICAvLyBJZiB0aGUgZGVsZWdhdGUgaXRlcmF0b3IgaGFzIGEgcmV0dXJuIG1ldGhvZCwgZ2l2ZSBpdCBhXG4gICAgICAgICAgICAvLyBjaGFuY2UgdG8gY2xlYW4gdXAuXG4gICAgICAgICAgICB2YXIgcmV0dXJuTWV0aG9kID0gZGVsZWdhdGUuaXRlcmF0b3JbXCJyZXR1cm5cIl07XG4gICAgICAgICAgICBpZiAocmV0dXJuTWV0aG9kKSB7XG4gICAgICAgICAgICAgIHZhciByZWNvcmQgPSB0cnlDYXRjaChyZXR1cm5NZXRob2QsIGRlbGVnYXRlLml0ZXJhdG9yLCBhcmcpO1xuICAgICAgICAgICAgICBpZiAocmVjb3JkLnR5cGUgPT09IFwidGhyb3dcIikge1xuICAgICAgICAgICAgICAgIC8vIElmIHRoZSByZXR1cm4gbWV0aG9kIHRocmV3IGFuIGV4Y2VwdGlvbiwgbGV0IHRoYXRcbiAgICAgICAgICAgICAgICAvLyBleGNlcHRpb24gcHJldmFpbCBvdmVyIHRoZSBvcmlnaW5hbCByZXR1cm4gb3IgdGhyb3cuXG4gICAgICAgICAgICAgICAgbWV0aG9kID0gXCJ0aHJvd1wiO1xuICAgICAgICAgICAgICAgIGFyZyA9IHJlY29yZC5hcmc7XG4gICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKG1ldGhvZCA9PT0gXCJyZXR1cm5cIikge1xuICAgICAgICAgICAgICAvLyBDb250aW51ZSB3aXRoIHRoZSBvdXRlciByZXR1cm4sIG5vdyB0aGF0IHRoZSBkZWxlZ2F0ZVxuICAgICAgICAgICAgICAvLyBpdGVyYXRvciBoYXMgYmVlbiB0ZXJtaW5hdGVkLlxuICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG5cbiAgICAgICAgICB2YXIgcmVjb3JkID0gdHJ5Q2F0Y2goXG4gICAgICAgICAgICBkZWxlZ2F0ZS5pdGVyYXRvclttZXRob2RdLFxuICAgICAgICAgICAgZGVsZWdhdGUuaXRlcmF0b3IsXG4gICAgICAgICAgICBhcmdcbiAgICAgICAgICApO1xuXG4gICAgICAgICAgaWYgKHJlY29yZC50eXBlID09PSBcInRocm93XCIpIHtcbiAgICAgICAgICAgIGNvbnRleHQuZGVsZWdhdGUgPSBudWxsO1xuXG4gICAgICAgICAgICAvLyBMaWtlIHJldHVybmluZyBnZW5lcmF0b3IudGhyb3codW5jYXVnaHQpLCBidXQgd2l0aG91dCB0aGVcbiAgICAgICAgICAgIC8vIG92ZXJoZWFkIG9mIGFuIGV4dHJhIGZ1bmN0aW9uIGNhbGwuXG4gICAgICAgICAgICBtZXRob2QgPSBcInRocm93XCI7XG4gICAgICAgICAgICBhcmcgPSByZWNvcmQuYXJnO1xuICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgLy8gRGVsZWdhdGUgZ2VuZXJhdG9yIHJhbiBhbmQgaGFuZGxlZCBpdHMgb3duIGV4Y2VwdGlvbnMgc29cbiAgICAgICAgICAvLyByZWdhcmRsZXNzIG9mIHdoYXQgdGhlIG1ldGhvZCB3YXMsIHdlIGNvbnRpbnVlIGFzIGlmIGl0IGlzXG4gICAgICAgICAgLy8gXCJuZXh0XCIgd2l0aCBhbiB1bmRlZmluZWQgYXJnLlxuICAgICAgICAgIG1ldGhvZCA9IFwibmV4dFwiO1xuICAgICAgICAgIGFyZyA9IHVuZGVmaW5lZDtcblxuICAgICAgICAgIHZhciBpbmZvID0gcmVjb3JkLmFyZztcbiAgICAgICAgICBpZiAoaW5mby5kb25lKSB7XG4gICAgICAgICAgICBjb250ZXh0W2RlbGVnYXRlLnJlc3VsdE5hbWVdID0gaW5mby52YWx1ZTtcbiAgICAgICAgICAgIGNvbnRleHQubmV4dCA9IGRlbGVnYXRlLm5leHRMb2M7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHN0YXRlID0gR2VuU3RhdGVTdXNwZW5kZWRZaWVsZDtcbiAgICAgICAgICAgIHJldHVybiBpbmZvO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGNvbnRleHQuZGVsZWdhdGUgPSBudWxsO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKG1ldGhvZCA9PT0gXCJuZXh0XCIpIHtcbiAgICAgICAgICBjb250ZXh0Ll9zZW50ID0gYXJnO1xuXG4gICAgICAgICAgaWYgKHN0YXRlID09PSBHZW5TdGF0ZVN1c3BlbmRlZFlpZWxkKSB7XG4gICAgICAgICAgICBjb250ZXh0LnNlbnQgPSBhcmc7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNvbnRleHQuc2VudCA9IHVuZGVmaW5lZDtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAobWV0aG9kID09PSBcInRocm93XCIpIHtcbiAgICAgICAgICBpZiAoc3RhdGUgPT09IEdlblN0YXRlU3VzcGVuZGVkU3RhcnQpIHtcbiAgICAgICAgICAgIHN0YXRlID0gR2VuU3RhdGVDb21wbGV0ZWQ7XG4gICAgICAgICAgICB0aHJvdyBhcmc7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKGNvbnRleHQuZGlzcGF0Y2hFeGNlcHRpb24oYXJnKSkge1xuICAgICAgICAgICAgLy8gSWYgdGhlIGRpc3BhdGNoZWQgZXhjZXB0aW9uIHdhcyBjYXVnaHQgYnkgYSBjYXRjaCBibG9jayxcbiAgICAgICAgICAgIC8vIHRoZW4gbGV0IHRoYXQgY2F0Y2ggYmxvY2sgaGFuZGxlIHRoZSBleGNlcHRpb24gbm9ybWFsbHkuXG4gICAgICAgICAgICBtZXRob2QgPSBcIm5leHRcIjtcbiAgICAgICAgICAgIGFyZyA9IHVuZGVmaW5lZDtcbiAgICAgICAgICB9XG5cbiAgICAgICAgfSBlbHNlIGlmIChtZXRob2QgPT09IFwicmV0dXJuXCIpIHtcbiAgICAgICAgICBjb250ZXh0LmFicnVwdChcInJldHVyblwiLCBhcmcpO1xuICAgICAgICB9XG5cbiAgICAgICAgc3RhdGUgPSBHZW5TdGF0ZUV4ZWN1dGluZztcblxuICAgICAgICB2YXIgcmVjb3JkID0gdHJ5Q2F0Y2goaW5uZXJGbiwgc2VsZiwgY29udGV4dCk7XG4gICAgICAgIGlmIChyZWNvcmQudHlwZSA9PT0gXCJub3JtYWxcIikge1xuICAgICAgICAgIC8vIElmIGFuIGV4Y2VwdGlvbiBpcyB0aHJvd24gZnJvbSBpbm5lckZuLCB3ZSBsZWF2ZSBzdGF0ZSA9PT1cbiAgICAgICAgICAvLyBHZW5TdGF0ZUV4ZWN1dGluZyBhbmQgbG9vcCBiYWNrIGZvciBhbm90aGVyIGludm9jYXRpb24uXG4gICAgICAgICAgc3RhdGUgPSBjb250ZXh0LmRvbmVcbiAgICAgICAgICAgID8gR2VuU3RhdGVDb21wbGV0ZWRcbiAgICAgICAgICAgIDogR2VuU3RhdGVTdXNwZW5kZWRZaWVsZDtcblxuICAgICAgICAgIHZhciBpbmZvID0ge1xuICAgICAgICAgICAgdmFsdWU6IHJlY29yZC5hcmcsXG4gICAgICAgICAgICBkb25lOiBjb250ZXh0LmRvbmVcbiAgICAgICAgICB9O1xuXG4gICAgICAgICAgaWYgKHJlY29yZC5hcmcgPT09IENvbnRpbnVlU2VudGluZWwpIHtcbiAgICAgICAgICAgIGlmIChjb250ZXh0LmRlbGVnYXRlICYmIG1ldGhvZCA9PT0gXCJuZXh0XCIpIHtcbiAgICAgICAgICAgICAgLy8gRGVsaWJlcmF0ZWx5IGZvcmdldCB0aGUgbGFzdCBzZW50IHZhbHVlIHNvIHRoYXQgd2UgZG9uJ3RcbiAgICAgICAgICAgICAgLy8gYWNjaWRlbnRhbGx5IHBhc3MgaXQgb24gdG8gdGhlIGRlbGVnYXRlLlxuICAgICAgICAgICAgICBhcmcgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBpbmZvO1xuICAgICAgICAgIH1cblxuICAgICAgICB9IGVsc2UgaWYgKHJlY29yZC50eXBlID09PSBcInRocm93XCIpIHtcbiAgICAgICAgICBzdGF0ZSA9IEdlblN0YXRlQ29tcGxldGVkO1xuICAgICAgICAgIC8vIERpc3BhdGNoIHRoZSBleGNlcHRpb24gYnkgbG9vcGluZyBiYWNrIGFyb3VuZCB0byB0aGVcbiAgICAgICAgICAvLyBjb250ZXh0LmRpc3BhdGNoRXhjZXB0aW9uKGFyZykgY2FsbCBhYm92ZS5cbiAgICAgICAgICBtZXRob2QgPSBcInRocm93XCI7XG4gICAgICAgICAgYXJnID0gcmVjb3JkLmFyZztcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH07XG4gIH1cblxuICAvLyBEZWZpbmUgR2VuZXJhdG9yLnByb3RvdHlwZS57bmV4dCx0aHJvdyxyZXR1cm59IGluIHRlcm1zIG9mIHRoZVxuICAvLyB1bmlmaWVkIC5faW52b2tlIGhlbHBlciBtZXRob2QuXG4gIGRlZmluZUl0ZXJhdG9yTWV0aG9kcyhHcCk7XG5cbiAgR3BbaXRlcmF0b3JTeW1ib2xdID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG5cbiAgR3AudG9TdHJpbmcgPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gXCJbb2JqZWN0IEdlbmVyYXRvcl1cIjtcbiAgfTtcblxuICBmdW5jdGlvbiBwdXNoVHJ5RW50cnkobG9jcykge1xuICAgIHZhciBlbnRyeSA9IHsgdHJ5TG9jOiBsb2NzWzBdIH07XG5cbiAgICBpZiAoMSBpbiBsb2NzKSB7XG4gICAgICBlbnRyeS5jYXRjaExvYyA9IGxvY3NbMV07XG4gICAgfVxuXG4gICAgaWYgKDIgaW4gbG9jcykge1xuICAgICAgZW50cnkuZmluYWxseUxvYyA9IGxvY3NbMl07XG4gICAgICBlbnRyeS5hZnRlckxvYyA9IGxvY3NbM107XG4gICAgfVxuXG4gICAgdGhpcy50cnlFbnRyaWVzLnB1c2goZW50cnkpO1xuICB9XG5cbiAgZnVuY3Rpb24gcmVzZXRUcnlFbnRyeShlbnRyeSkge1xuICAgIHZhciByZWNvcmQgPSBlbnRyeS5jb21wbGV0aW9uIHx8IHt9O1xuICAgIHJlY29yZC50eXBlID0gXCJub3JtYWxcIjtcbiAgICBkZWxldGUgcmVjb3JkLmFyZztcbiAgICBlbnRyeS5jb21wbGV0aW9uID0gcmVjb3JkO1xuICB9XG5cbiAgZnVuY3Rpb24gQ29udGV4dCh0cnlMb2NzTGlzdCkge1xuICAgIC8vIFRoZSByb290IGVudHJ5IG9iamVjdCAoZWZmZWN0aXZlbHkgYSB0cnkgc3RhdGVtZW50IHdpdGhvdXQgYSBjYXRjaFxuICAgIC8vIG9yIGEgZmluYWxseSBibG9jaykgZ2l2ZXMgdXMgYSBwbGFjZSB0byBzdG9yZSB2YWx1ZXMgdGhyb3duIGZyb21cbiAgICAvLyBsb2NhdGlvbnMgd2hlcmUgdGhlcmUgaXMgbm8gZW5jbG9zaW5nIHRyeSBzdGF0ZW1lbnQuXG4gICAgdGhpcy50cnlFbnRyaWVzID0gW3sgdHJ5TG9jOiBcInJvb3RcIiB9XTtcbiAgICB0cnlMb2NzTGlzdC5mb3JFYWNoKHB1c2hUcnlFbnRyeSwgdGhpcyk7XG4gICAgdGhpcy5yZXNldCh0cnVlKTtcbiAgfVxuXG4gIHJ1bnRpbWUua2V5cyA9IGZ1bmN0aW9uKG9iamVjdCkge1xuICAgIHZhciBrZXlzID0gW107XG4gICAgZm9yICh2YXIga2V5IGluIG9iamVjdCkge1xuICAgICAga2V5cy5wdXNoKGtleSk7XG4gICAgfVxuICAgIGtleXMucmV2ZXJzZSgpO1xuXG4gICAgLy8gUmF0aGVyIHRoYW4gcmV0dXJuaW5nIGFuIG9iamVjdCB3aXRoIGEgbmV4dCBtZXRob2QsIHdlIGtlZXBcbiAgICAvLyB0aGluZ3Mgc2ltcGxlIGFuZCByZXR1cm4gdGhlIG5leHQgZnVuY3Rpb24gaXRzZWxmLlxuICAgIHJldHVybiBmdW5jdGlvbiBuZXh0KCkge1xuICAgICAgd2hpbGUgKGtleXMubGVuZ3RoKSB7XG4gICAgICAgIHZhciBrZXkgPSBrZXlzLnBvcCgpO1xuICAgICAgICBpZiAoa2V5IGluIG9iamVjdCkge1xuICAgICAgICAgIG5leHQudmFsdWUgPSBrZXk7XG4gICAgICAgICAgbmV4dC5kb25lID0gZmFsc2U7XG4gICAgICAgICAgcmV0dXJuIG5leHQ7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgLy8gVG8gYXZvaWQgY3JlYXRpbmcgYW4gYWRkaXRpb25hbCBvYmplY3QsIHdlIGp1c3QgaGFuZyB0aGUgLnZhbHVlXG4gICAgICAvLyBhbmQgLmRvbmUgcHJvcGVydGllcyBvZmYgdGhlIG5leHQgZnVuY3Rpb24gb2JqZWN0IGl0c2VsZi4gVGhpc1xuICAgICAgLy8gYWxzbyBlbnN1cmVzIHRoYXQgdGhlIG1pbmlmaWVyIHdpbGwgbm90IGFub255bWl6ZSB0aGUgZnVuY3Rpb24uXG4gICAgICBuZXh0LmRvbmUgPSB0cnVlO1xuICAgICAgcmV0dXJuIG5leHQ7XG4gICAgfTtcbiAgfTtcblxuICBmdW5jdGlvbiB2YWx1ZXMoaXRlcmFibGUpIHtcbiAgICBpZiAoaXRlcmFibGUpIHtcbiAgICAgIHZhciBpdGVyYXRvck1ldGhvZCA9IGl0ZXJhYmxlW2l0ZXJhdG9yU3ltYm9sXTtcbiAgICAgIGlmIChpdGVyYXRvck1ldGhvZCkge1xuICAgICAgICByZXR1cm4gaXRlcmF0b3JNZXRob2QuY2FsbChpdGVyYWJsZSk7XG4gICAgICB9XG5cbiAgICAgIGlmICh0eXBlb2YgaXRlcmFibGUubmV4dCA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgIHJldHVybiBpdGVyYWJsZTtcbiAgICAgIH1cblxuICAgICAgaWYgKCFpc05hTihpdGVyYWJsZS5sZW5ndGgpKSB7XG4gICAgICAgIHZhciBpID0gLTEsIG5leHQgPSBmdW5jdGlvbiBuZXh0KCkge1xuICAgICAgICAgIHdoaWxlICgrK2kgPCBpdGVyYWJsZS5sZW5ndGgpIHtcbiAgICAgICAgICAgIGlmIChoYXNPd24uY2FsbChpdGVyYWJsZSwgaSkpIHtcbiAgICAgICAgICAgICAgbmV4dC52YWx1ZSA9IGl0ZXJhYmxlW2ldO1xuICAgICAgICAgICAgICBuZXh0LmRvbmUgPSBmYWxzZTtcbiAgICAgICAgICAgICAgcmV0dXJuIG5leHQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgbmV4dC52YWx1ZSA9IHVuZGVmaW5lZDtcbiAgICAgICAgICBuZXh0LmRvbmUgPSB0cnVlO1xuXG4gICAgICAgICAgcmV0dXJuIG5leHQ7XG4gICAgICAgIH07XG5cbiAgICAgICAgcmV0dXJuIG5leHQubmV4dCA9IG5leHQ7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gUmV0dXJuIGFuIGl0ZXJhdG9yIHdpdGggbm8gdmFsdWVzLlxuICAgIHJldHVybiB7IG5leHQ6IGRvbmVSZXN1bHQgfTtcbiAgfVxuICBydW50aW1lLnZhbHVlcyA9IHZhbHVlcztcblxuICBmdW5jdGlvbiBkb25lUmVzdWx0KCkge1xuICAgIHJldHVybiB7IHZhbHVlOiB1bmRlZmluZWQsIGRvbmU6IHRydWUgfTtcbiAgfVxuXG4gIENvbnRleHQucHJvdG90eXBlID0ge1xuICAgIGNvbnN0cnVjdG9yOiBDb250ZXh0LFxuXG4gICAgcmVzZXQ6IGZ1bmN0aW9uKHNraXBUZW1wUmVzZXQpIHtcbiAgICAgIHRoaXMucHJldiA9IDA7XG4gICAgICB0aGlzLm5leHQgPSAwO1xuICAgICAgdGhpcy5zZW50ID0gdW5kZWZpbmVkO1xuICAgICAgdGhpcy5kb25lID0gZmFsc2U7XG4gICAgICB0aGlzLmRlbGVnYXRlID0gbnVsbDtcblxuICAgICAgdGhpcy50cnlFbnRyaWVzLmZvckVhY2gocmVzZXRUcnlFbnRyeSk7XG5cbiAgICAgIGlmICghc2tpcFRlbXBSZXNldCkge1xuICAgICAgICBmb3IgKHZhciBuYW1lIGluIHRoaXMpIHtcbiAgICAgICAgICAvLyBOb3Qgc3VyZSBhYm91dCB0aGUgb3B0aW1hbCBvcmRlciBvZiB0aGVzZSBjb25kaXRpb25zOlxuICAgICAgICAgIGlmIChuYW1lLmNoYXJBdCgwKSA9PT0gXCJ0XCIgJiZcbiAgICAgICAgICAgICAgaGFzT3duLmNhbGwodGhpcywgbmFtZSkgJiZcbiAgICAgICAgICAgICAgIWlzTmFOKCtuYW1lLnNsaWNlKDEpKSkge1xuICAgICAgICAgICAgdGhpc1tuYW1lXSA9IHVuZGVmaW5lZDtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LFxuXG4gICAgc3RvcDogZnVuY3Rpb24oKSB7XG4gICAgICB0aGlzLmRvbmUgPSB0cnVlO1xuXG4gICAgICB2YXIgcm9vdEVudHJ5ID0gdGhpcy50cnlFbnRyaWVzWzBdO1xuICAgICAgdmFyIHJvb3RSZWNvcmQgPSByb290RW50cnkuY29tcGxldGlvbjtcbiAgICAgIGlmIChyb290UmVjb3JkLnR5cGUgPT09IFwidGhyb3dcIikge1xuICAgICAgICB0aHJvdyByb290UmVjb3JkLmFyZztcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHRoaXMucnZhbDtcbiAgICB9LFxuXG4gICAgZGlzcGF0Y2hFeGNlcHRpb246IGZ1bmN0aW9uKGV4Y2VwdGlvbikge1xuICAgICAgaWYgKHRoaXMuZG9uZSkge1xuICAgICAgICB0aHJvdyBleGNlcHRpb247XG4gICAgICB9XG5cbiAgICAgIHZhciBjb250ZXh0ID0gdGhpcztcbiAgICAgIGZ1bmN0aW9uIGhhbmRsZShsb2MsIGNhdWdodCkge1xuICAgICAgICByZWNvcmQudHlwZSA9IFwidGhyb3dcIjtcbiAgICAgICAgcmVjb3JkLmFyZyA9IGV4Y2VwdGlvbjtcbiAgICAgICAgY29udGV4dC5uZXh0ID0gbG9jO1xuICAgICAgICByZXR1cm4gISFjYXVnaHQ7XG4gICAgICB9XG5cbiAgICAgIGZvciAodmFyIGkgPSB0aGlzLnRyeUVudHJpZXMubGVuZ3RoIC0gMTsgaSA+PSAwOyAtLWkpIHtcbiAgICAgICAgdmFyIGVudHJ5ID0gdGhpcy50cnlFbnRyaWVzW2ldO1xuICAgICAgICB2YXIgcmVjb3JkID0gZW50cnkuY29tcGxldGlvbjtcblxuICAgICAgICBpZiAoZW50cnkudHJ5TG9jID09PSBcInJvb3RcIikge1xuICAgICAgICAgIC8vIEV4Y2VwdGlvbiB0aHJvd24gb3V0c2lkZSBvZiBhbnkgdHJ5IGJsb2NrIHRoYXQgY291bGQgaGFuZGxlXG4gICAgICAgICAgLy8gaXQsIHNvIHNldCB0aGUgY29tcGxldGlvbiB2YWx1ZSBvZiB0aGUgZW50aXJlIGZ1bmN0aW9uIHRvXG4gICAgICAgICAgLy8gdGhyb3cgdGhlIGV4Y2VwdGlvbi5cbiAgICAgICAgICByZXR1cm4gaGFuZGxlKFwiZW5kXCIpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGVudHJ5LnRyeUxvYyA8PSB0aGlzLnByZXYpIHtcbiAgICAgICAgICB2YXIgaGFzQ2F0Y2ggPSBoYXNPd24uY2FsbChlbnRyeSwgXCJjYXRjaExvY1wiKTtcbiAgICAgICAgICB2YXIgaGFzRmluYWxseSA9IGhhc093bi5jYWxsKGVudHJ5LCBcImZpbmFsbHlMb2NcIik7XG5cbiAgICAgICAgICBpZiAoaGFzQ2F0Y2ggJiYgaGFzRmluYWxseSkge1xuICAgICAgICAgICAgaWYgKHRoaXMucHJldiA8IGVudHJ5LmNhdGNoTG9jKSB7XG4gICAgICAgICAgICAgIHJldHVybiBoYW5kbGUoZW50cnkuY2F0Y2hMb2MsIHRydWUpO1xuICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLnByZXYgPCBlbnRyeS5maW5hbGx5TG9jKSB7XG4gICAgICAgICAgICAgIHJldHVybiBoYW5kbGUoZW50cnkuZmluYWxseUxvYyk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICB9IGVsc2UgaWYgKGhhc0NhdGNoKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5wcmV2IDwgZW50cnkuY2F0Y2hMb2MpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIGhhbmRsZShlbnRyeS5jYXRjaExvYywgdHJ1ZSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICB9IGVsc2UgaWYgKGhhc0ZpbmFsbHkpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnByZXYgPCBlbnRyeS5maW5hbGx5TG9jKSB7XG4gICAgICAgICAgICAgIHJldHVybiBoYW5kbGUoZW50cnkuZmluYWxseUxvYyk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwidHJ5IHN0YXRlbWVudCB3aXRob3V0IGNhdGNoIG9yIGZpbmFsbHlcIik7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSxcblxuICAgIGFicnVwdDogZnVuY3Rpb24odHlwZSwgYXJnKSB7XG4gICAgICBmb3IgKHZhciBpID0gdGhpcy50cnlFbnRyaWVzLmxlbmd0aCAtIDE7IGkgPj0gMDsgLS1pKSB7XG4gICAgICAgIHZhciBlbnRyeSA9IHRoaXMudHJ5RW50cmllc1tpXTtcbiAgICAgICAgaWYgKGVudHJ5LnRyeUxvYyA8PSB0aGlzLnByZXYgJiZcbiAgICAgICAgICAgIGhhc093bi5jYWxsKGVudHJ5LCBcImZpbmFsbHlMb2NcIikgJiZcbiAgICAgICAgICAgIHRoaXMucHJldiA8IGVudHJ5LmZpbmFsbHlMb2MpIHtcbiAgICAgICAgICB2YXIgZmluYWxseUVudHJ5ID0gZW50cnk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKGZpbmFsbHlFbnRyeSAmJlxuICAgICAgICAgICh0eXBlID09PSBcImJyZWFrXCIgfHxcbiAgICAgICAgICAgdHlwZSA9PT0gXCJjb250aW51ZVwiKSAmJlxuICAgICAgICAgIGZpbmFsbHlFbnRyeS50cnlMb2MgPD0gYXJnICYmXG4gICAgICAgICAgYXJnIDw9IGZpbmFsbHlFbnRyeS5maW5hbGx5TG9jKSB7XG4gICAgICAgIC8vIElnbm9yZSB0aGUgZmluYWxseSBlbnRyeSBpZiBjb250cm9sIGlzIG5vdCBqdW1waW5nIHRvIGFcbiAgICAgICAgLy8gbG9jYXRpb24gb3V0c2lkZSB0aGUgdHJ5L2NhdGNoIGJsb2NrLlxuICAgICAgICBmaW5hbGx5RW50cnkgPSBudWxsO1xuICAgICAgfVxuXG4gICAgICB2YXIgcmVjb3JkID0gZmluYWxseUVudHJ5ID8gZmluYWxseUVudHJ5LmNvbXBsZXRpb24gOiB7fTtcbiAgICAgIHJlY29yZC50eXBlID0gdHlwZTtcbiAgICAgIHJlY29yZC5hcmcgPSBhcmc7XG5cbiAgICAgIGlmIChmaW5hbGx5RW50cnkpIHtcbiAgICAgICAgdGhpcy5uZXh0ID0gZmluYWxseUVudHJ5LmZpbmFsbHlMb2M7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLmNvbXBsZXRlKHJlY29yZCk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBDb250aW51ZVNlbnRpbmVsO1xuICAgIH0sXG5cbiAgICBjb21wbGV0ZTogZnVuY3Rpb24ocmVjb3JkLCBhZnRlckxvYykge1xuICAgICAgaWYgKHJlY29yZC50eXBlID09PSBcInRocm93XCIpIHtcbiAgICAgICAgdGhyb3cgcmVjb3JkLmFyZztcbiAgICAgIH1cblxuICAgICAgaWYgKHJlY29yZC50eXBlID09PSBcImJyZWFrXCIgfHxcbiAgICAgICAgICByZWNvcmQudHlwZSA9PT0gXCJjb250aW51ZVwiKSB7XG4gICAgICAgIHRoaXMubmV4dCA9IHJlY29yZC5hcmc7XG4gICAgICB9IGVsc2UgaWYgKHJlY29yZC50eXBlID09PSBcInJldHVyblwiKSB7XG4gICAgICAgIHRoaXMucnZhbCA9IHJlY29yZC5hcmc7XG4gICAgICAgIHRoaXMubmV4dCA9IFwiZW5kXCI7XG4gICAgICB9IGVsc2UgaWYgKHJlY29yZC50eXBlID09PSBcIm5vcm1hbFwiICYmIGFmdGVyTG9jKSB7XG4gICAgICAgIHRoaXMubmV4dCA9IGFmdGVyTG9jO1xuICAgICAgfVxuICAgIH0sXG5cbiAgICBmaW5pc2g6IGZ1bmN0aW9uKGZpbmFsbHlMb2MpIHtcbiAgICAgIGZvciAodmFyIGkgPSB0aGlzLnRyeUVudHJpZXMubGVuZ3RoIC0gMTsgaSA+PSAwOyAtLWkpIHtcbiAgICAgICAgdmFyIGVudHJ5ID0gdGhpcy50cnlFbnRyaWVzW2ldO1xuICAgICAgICBpZiAoZW50cnkuZmluYWxseUxvYyA9PT0gZmluYWxseUxvYykge1xuICAgICAgICAgIHRoaXMuY29tcGxldGUoZW50cnkuY29tcGxldGlvbiwgZW50cnkuYWZ0ZXJMb2MpO1xuICAgICAgICAgIHJlc2V0VHJ5RW50cnkoZW50cnkpO1xuICAgICAgICAgIHJldHVybiBDb250aW51ZVNlbnRpbmVsO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSxcblxuICAgIFwiY2F0Y2hcIjogZnVuY3Rpb24odHJ5TG9jKSB7XG4gICAgICBmb3IgKHZhciBpID0gdGhpcy50cnlFbnRyaWVzLmxlbmd0aCAtIDE7IGkgPj0gMDsgLS1pKSB7XG4gICAgICAgIHZhciBlbnRyeSA9IHRoaXMudHJ5RW50cmllc1tpXTtcbiAgICAgICAgaWYgKGVudHJ5LnRyeUxvYyA9PT0gdHJ5TG9jKSB7XG4gICAgICAgICAgdmFyIHJlY29yZCA9IGVudHJ5LmNvbXBsZXRpb247XG4gICAgICAgICAgaWYgKHJlY29yZC50eXBlID09PSBcInRocm93XCIpIHtcbiAgICAgICAgICAgIHZhciB0aHJvd24gPSByZWNvcmQuYXJnO1xuICAgICAgICAgICAgcmVzZXRUcnlFbnRyeShlbnRyeSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiB0aHJvd247XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgLy8gVGhlIGNvbnRleHQuY2F0Y2ggbWV0aG9kIG11c3Qgb25seSBiZSBjYWxsZWQgd2l0aCBhIGxvY2F0aW9uXG4gICAgICAvLyBhcmd1bWVudCB0aGF0IGNvcnJlc3BvbmRzIHRvIGEga25vd24gY2F0Y2ggYmxvY2suXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJpbGxlZ2FsIGNhdGNoIGF0dGVtcHRcIik7XG4gICAgfSxcblxuICAgIGRlbGVnYXRlWWllbGQ6IGZ1bmN0aW9uKGl0ZXJhYmxlLCByZXN1bHROYW1lLCBuZXh0TG9jKSB7XG4gICAgICB0aGlzLmRlbGVnYXRlID0ge1xuICAgICAgICBpdGVyYXRvcjogdmFsdWVzKGl0ZXJhYmxlKSxcbiAgICAgICAgcmVzdWx0TmFtZTogcmVzdWx0TmFtZSxcbiAgICAgICAgbmV4dExvYzogbmV4dExvY1xuICAgICAgfTtcblxuICAgICAgcmV0dXJuIENvbnRpbnVlU2VudGluZWw7XG4gICAgfVxuICB9O1xufSkoXG4gIC8vIEFtb25nIHRoZSB2YXJpb3VzIHRyaWNrcyBmb3Igb2J0YWluaW5nIGEgcmVmZXJlbmNlIHRvIHRoZSBnbG9iYWxcbiAgLy8gb2JqZWN0LCB0aGlzIHNlZW1zIHRvIGJlIHRoZSBtb3N0IHJlbGlhYmxlIHRlY2huaXF1ZSB0aGF0IGRvZXMgbm90XG4gIC8vIHVzZSBpbmRpcmVjdCBldmFsICh3aGljaCB2aW9sYXRlcyBDb250ZW50IFNlY3VyaXR5IFBvbGljeSkuXG4gIHR5cGVvZiBnbG9iYWwgPT09IFwib2JqZWN0XCIgPyBnbG9iYWwgOlxuICB0eXBlb2Ygd2luZG93ID09PSBcIm9iamVjdFwiID8gd2luZG93IDpcbiAgdHlwZW9mIHNlbGYgPT09IFwib2JqZWN0XCIgPyBzZWxmIDogdGhpc1xuKTtcbiIsIi8vIHNoaW0gZm9yIHVzaW5nIHByb2Nlc3MgaW4gYnJvd3NlclxuXG52YXIgcHJvY2VzcyA9IG1vZHVsZS5leHBvcnRzID0ge307XG52YXIgcXVldWUgPSBbXTtcbnZhciBkcmFpbmluZyA9IGZhbHNlO1xudmFyIGN1cnJlbnRRdWV1ZTtcbnZhciBxdWV1ZUluZGV4ID0gLTE7XG5cbmZ1bmN0aW9uIGNsZWFuVXBOZXh0VGljaygpIHtcbiAgICBkcmFpbmluZyA9IGZhbHNlO1xuICAgIGlmIChjdXJyZW50UXVldWUubGVuZ3RoKSB7XG4gICAgICAgIHF1ZXVlID0gY3VycmVudFF1ZXVlLmNvbmNhdChxdWV1ZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgcXVldWVJbmRleCA9IC0xO1xuICAgIH1cbiAgICBpZiAocXVldWUubGVuZ3RoKSB7XG4gICAgICAgIGRyYWluUXVldWUoKTtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIGRyYWluUXVldWUoKSB7XG4gICAgaWYgKGRyYWluaW5nKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdmFyIHRpbWVvdXQgPSBzZXRUaW1lb3V0KGNsZWFuVXBOZXh0VGljayk7XG4gICAgZHJhaW5pbmcgPSB0cnVlO1xuXG4gICAgdmFyIGxlbiA9IHF1ZXVlLmxlbmd0aDtcbiAgICB3aGlsZShsZW4pIHtcbiAgICAgICAgY3VycmVudFF1ZXVlID0gcXVldWU7XG4gICAgICAgIHF1ZXVlID0gW107XG4gICAgICAgIHdoaWxlICgrK3F1ZXVlSW5kZXggPCBsZW4pIHtcbiAgICAgICAgICAgIGlmIChjdXJyZW50UXVldWUpIHtcbiAgICAgICAgICAgICAgICBjdXJyZW50UXVldWVbcXVldWVJbmRleF0ucnVuKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcXVldWVJbmRleCA9IC0xO1xuICAgICAgICBsZW4gPSBxdWV1ZS5sZW5ndGg7XG4gICAgfVxuICAgIGN1cnJlbnRRdWV1ZSA9IG51bGw7XG4gICAgZHJhaW5pbmcgPSBmYWxzZTtcbiAgICBjbGVhclRpbWVvdXQodGltZW91dCk7XG59XG5cbnByb2Nlc3MubmV4dFRpY2sgPSBmdW5jdGlvbiAoZnVuKSB7XG4gICAgdmFyIGFyZ3MgPSBuZXcgQXJyYXkoYXJndW1lbnRzLmxlbmd0aCAtIDEpO1xuICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID4gMSkge1xuICAgICAgICBmb3IgKHZhciBpID0gMTsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgYXJnc1tpIC0gMV0gPSBhcmd1bWVudHNbaV07XG4gICAgICAgIH1cbiAgICB9XG4gICAgcXVldWUucHVzaChuZXcgSXRlbShmdW4sIGFyZ3MpKTtcbiAgICBpZiAocXVldWUubGVuZ3RoID09PSAxICYmICFkcmFpbmluZykge1xuICAgICAgICBzZXRUaW1lb3V0KGRyYWluUXVldWUsIDApO1xuICAgIH1cbn07XG5cbi8vIHY4IGxpa2VzIHByZWRpY3RpYmxlIG9iamVjdHNcbmZ1bmN0aW9uIEl0ZW0oZnVuLCBhcnJheSkge1xuICAgIHRoaXMuZnVuID0gZnVuO1xuICAgIHRoaXMuYXJyYXkgPSBhcnJheTtcbn1cbkl0ZW0ucHJvdG90eXBlLnJ1biA9IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLmZ1bi5hcHBseShudWxsLCB0aGlzLmFycmF5KTtcbn07XG5wcm9jZXNzLnRpdGxlID0gJ2Jyb3dzZXInO1xucHJvY2Vzcy5icm93c2VyID0gdHJ1ZTtcbnByb2Nlc3MuZW52ID0ge307XG5wcm9jZXNzLmFyZ3YgPSBbXTtcbnByb2Nlc3MudmVyc2lvbiA9ICcnOyAvLyBlbXB0eSBzdHJpbmcgdG8gYXZvaWQgcmVnZXhwIGlzc3Vlc1xucHJvY2Vzcy52ZXJzaW9ucyA9IHt9O1xuXG5mdW5jdGlvbiBub29wKCkge31cblxucHJvY2Vzcy5vbiA9IG5vb3A7XG5wcm9jZXNzLmFkZExpc3RlbmVyID0gbm9vcDtcbnByb2Nlc3Mub25jZSA9IG5vb3A7XG5wcm9jZXNzLm9mZiA9IG5vb3A7XG5wcm9jZXNzLnJlbW92ZUxpc3RlbmVyID0gbm9vcDtcbnByb2Nlc3MucmVtb3ZlQWxsTGlzdGVuZXJzID0gbm9vcDtcbnByb2Nlc3MuZW1pdCA9IG5vb3A7XG5cbnByb2Nlc3MuYmluZGluZyA9IGZ1bmN0aW9uIChuYW1lKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdwcm9jZXNzLmJpbmRpbmcgaXMgbm90IHN1cHBvcnRlZCcpO1xufTtcblxucHJvY2Vzcy5jd2QgPSBmdW5jdGlvbiAoKSB7IHJldHVybiAnLycgfTtcbnByb2Nlc3MuY2hkaXIgPSBmdW5jdGlvbiAoZGlyKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdwcm9jZXNzLmNoZGlyIGlzIG5vdCBzdXBwb3J0ZWQnKTtcbn07XG5wcm9jZXNzLnVtYXNrID0gZnVuY3Rpb24oKSB7IHJldHVybiAwOyB9O1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbmV4cG9ydCB2YXIgZm9udERhdGEgPSBbXHJcbi8vICMweDAwMCBcclxuWyBcclxuXCIwMDAwMDAwMFwiLFxyXG5cIjAwMDAwMDAwXCIsXHJcblwiMDAwMDAwMDBcIixcclxuXCIwMDAwMDAwMFwiLFxyXG5cIjAwMDAwMDAwXCIsXHJcblwiMDAwMDAwMDBcIixcclxuXCIwMDAwMDAwMFwiLFxyXG5cIjAwMDAwMDAwXCJcclxuXSxcclxuLy8gIzB4MDAxIFxyXG5bIFxyXG5cIjAwMDExMDAwXCIsXHJcblwiMDAxMDAxMDBcIixcclxuXCIwMTAwMDAxMFwiLFxyXG5cIjAxMTExMTEwXCIsXHJcblwiMDEwMDAwMTBcIixcclxuXCIwMTAwMDAxMFwiLFxyXG5cIjAxMDAwMDEwXCIsXHJcblwiMDAwMDAwMDBcIlxyXG5dLFxyXG4vLyAjMHgwMDIgXHJcblsgXHJcblwiMDExMTExMDBcIixcclxuXCIwMDEwMDAxMFwiLFxyXG5cIjAwMTAwMDEwXCIsXHJcblwiMDAxMTExMDBcIixcclxuXCIwMDEwMDAxMFwiLFxyXG5cIjAwMTAwMDEwXCIsXHJcblwiMDExMTExMDBcIixcclxuXCIwMDAwMDAwMFwiXHJcbl0sXHJcbi8vICMweDAwMyBcclxuWyBcclxuXCIwMDAxMTEwMFwiLFxyXG5cIjAwMTAwMDEwXCIsXHJcblwiMDEwMDAwMDBcIixcclxuXCIwMTAwMDAwMFwiLFxyXG5cIjAxMDAwMDAwXCIsXHJcblwiMDAxMDAwMTBcIixcclxuXCIwMDAxMTEwMFwiLFxyXG5cIjAwMDAwMDAwXCJcclxuXSxcclxuLy8gIzB4MDA0IFxyXG5bIFxyXG5cIjAxMTExMDAwXCIsXHJcblwiMDAxMDAxMDBcIixcclxuXCIwMDEwMDAxMFwiLFxyXG5cIjAwMTAwMDEwXCIsXHJcblwiMDAxMDAwMTBcIixcclxuXCIwMDEwMDEwMFwiLFxyXG5cIjAxMTExMDAwXCIsXHJcblwiMDAwMDAwMDBcIlxyXG5dLFxyXG4vLyAjMHgwMDUgXHJcblsgXHJcblwiMDExMTExMTBcIixcclxuXCIwMTAwMDAwMFwiLFxyXG5cIjAxMDAwMDAwXCIsXHJcblwiMDExMTEwMDBcIixcclxuXCIwMTAwMDAwMFwiLFxyXG5cIjAxMDAwMDAwXCIsXHJcblwiMDExMTExMTBcIixcclxuXCIwMDAwMDAwMFwiXHJcbl0sXHJcbi8vICMweDAwNiBcclxuWyBcclxuXCIwMTExMTExMFwiLFxyXG5cIjAxMDAwMDAwXCIsXHJcblwiMDEwMDAwMDBcIixcclxuXCIwMTExMTAwMFwiLFxyXG5cIjAxMDAwMDAwXCIsXHJcblwiMDEwMDAwMDBcIixcclxuXCIwMTAwMDAwMFwiLFxyXG5cIjAwMDAwMDAwXCJcclxuXSxcclxuLy8gIzB4MDA3IFxyXG5bIFxyXG5cIjAwMDExMTAwXCIsXHJcblwiMDAxMDAwMTBcIixcclxuXCIwMTAwMDAwMFwiLFxyXG5cIjAxMDAxMTEwXCIsXHJcblwiMDEwMDAwMTBcIixcclxuXCIwMDEwMDAxMFwiLFxyXG5cIjAwMDExMTAwXCIsXHJcblwiMDAwMDAwMDBcIlxyXG5dLFxyXG4vLyAjMHgwMDggXHJcblsgXHJcblwiMDEwMDAwMTBcIixcclxuXCIwMTAwMDAxMFwiLFxyXG5cIjAxMDAwMDEwXCIsXHJcblwiMDExMTExMTBcIixcclxuXCIwMTAwMDAxMFwiLFxyXG5cIjAxMDAwMDEwXCIsXHJcblwiMDEwMDAwMTBcIixcclxuXCIwMDAwMDAwMFwiXHJcbl0sXHJcbi8vICMweDAwOSBcclxuWyBcclxuXCIwMDAxMTEwMFwiLFxyXG5cIjAwMDAxMDAwXCIsXHJcblwiMDAwMDEwMDBcIixcclxuXCIwMDAwMTAwMFwiLFxyXG5cIjAwMDAxMDAwXCIsXHJcblwiMDAwMDEwMDBcIixcclxuXCIwMDAxMTEwMFwiLFxyXG5cIjAwMDAwMDAwXCJcclxuXSxcclxuLy8gIzB4MDBhIFxyXG5bIFxyXG5cIjAwMDAxMTEwXCIsXHJcblwiMDAwMDAxMDBcIixcclxuXCIwMDAwMDEwMFwiLFxyXG5cIjAwMDAwMTAwXCIsXHJcblwiMDAwMDAxMDBcIixcclxuXCIwMTAwMDEwMFwiLFxyXG5cIjAwMTExMDAwXCIsXHJcblwiMDAwMDAwMDBcIlxyXG5dLFxyXG4vLyAjMHgwMGIgXHJcblsgXHJcblwiMDEwMDAwMTBcIixcclxuXCIwMTAwMDEwMFwiLFxyXG5cIjAxMDAxMDAwXCIsXHJcblwiMDExMTAwMDBcIixcclxuXCIwMTAwMTAwMFwiLFxyXG5cIjAxMDAwMTAwXCIsXHJcblwiMDEwMDAwMTBcIixcclxuXCIwMDAwMDAwMFwiXHJcbl0sXHJcbi8vICMweDAwYyBcclxuWyBcclxuXCIwMTAwMDAwMFwiLFxyXG5cIjAxMDAwMDAwXCIsXHJcblwiMDEwMDAwMDBcIixcclxuXCIwMTAwMDAwMFwiLFxyXG5cIjAxMDAwMDAwXCIsXHJcblwiMDEwMDAwMDBcIixcclxuXCIwMTExMTExMFwiLFxyXG5cIjAwMDAwMDAwXCJcclxuXSxcclxuLy8gIzB4MDBkIFxyXG5bIFxyXG5cIjAxMDAwMDEwXCIsXHJcblwiMDExMDAxMTBcIixcclxuXCIwMTAxMTAxMFwiLFxyXG5cIjAxMDExMDEwXCIsXHJcblwiMDEwMDAwMTBcIixcclxuXCIwMTAwMDAxMFwiLFxyXG5cIjAxMDAwMDEwXCIsXHJcblwiMDAwMDAwMDBcIlxyXG5dLFxyXG4vLyAjMHgwMGUgXHJcblsgXHJcblwiMDEwMDAwMTBcIixcclxuXCIwMTEwMDAxMFwiLFxyXG5cIjAxMDEwMDEwXCIsXHJcblwiMDEwMDEwMTBcIixcclxuXCIwMTAwMDExMFwiLFxyXG5cIjAxMDAwMDEwXCIsXHJcblwiMDEwMDAwMTBcIixcclxuXCIwMDAwMDAwMFwiXHJcbl0sXHJcbi8vICMweDAwZiBcclxuWyBcclxuXCIwMDAxMTAwMFwiLFxyXG5cIjAwMTAwMTAwXCIsXHJcblwiMDEwMDAwMTBcIixcclxuXCIwMTAwMDAxMFwiLFxyXG5cIjAxMDAwMDEwXCIsXHJcblwiMDAxMDAxMDBcIixcclxuXCIwMDAxMTAwMFwiLFxyXG5cIjAwMDAwMDAwXCJcclxuXSxcclxuLy8gIzB4MDEwIFxyXG5bIFxyXG5cIjAxMTExMTAwXCIsXHJcblwiMDEwMDAwMTBcIixcclxuXCIwMTAwMDAxMFwiLFxyXG5cIjAxMTExMTAwXCIsXHJcblwiMDEwMDAwMDBcIixcclxuXCIwMTAwMDAwMFwiLFxyXG5cIjAxMDAwMDAwXCIsXHJcblwiMDAwMDAwMDBcIlxyXG5dLFxyXG4vLyAjMHgwMTEgXHJcblsgXHJcblwiMDAwMTEwMDBcIixcclxuXCIwMDEwMDEwMFwiLFxyXG5cIjAxMDAwMDEwXCIsXHJcblwiMDEwMDAwMTBcIixcclxuXCIwMTAwMTAxMFwiLFxyXG5cIjAwMTAwMTAwXCIsXHJcblwiMDAwMTEwMTBcIixcclxuXCIwMDAwMDAwMFwiXHJcbl0sXHJcbi8vICMweDAxMiBcclxuWyBcclxuXCIwMTExMTEwMFwiLFxyXG5cIjAxMDAwMDEwXCIsXHJcblwiMDEwMDAwMTBcIixcclxuXCIwMTExMTEwMFwiLFxyXG5cIjAxMDAxMDAwXCIsXHJcblwiMDEwMDAxMDBcIixcclxuXCIwMTAwMDAxMFwiLFxyXG5cIjAwMDAwMDAwXCJcclxuXSxcclxuLy8gIzB4MDEzIFxyXG5bIFxyXG5cIjAwMTExMTAwXCIsXHJcblwiMDEwMDAwMTBcIixcclxuXCIwMTAwMDAwMFwiLFxyXG5cIjAwMTExMTAwXCIsXHJcblwiMDAwMDAwMTBcIixcclxuXCIwMTAwMDAxMFwiLFxyXG5cIjAwMTExMTAwXCIsXHJcblwiMDAwMDAwMDBcIlxyXG5dLFxyXG4vLyAjMHgwMTQgXHJcblsgXHJcblwiMDAxMTExMTBcIixcclxuXCIwMDAwMTAwMFwiLFxyXG5cIjAwMDAxMDAwXCIsXHJcblwiMDAwMDEwMDBcIixcclxuXCIwMDAwMTAwMFwiLFxyXG5cIjAwMDAxMDAwXCIsXHJcblwiMDAwMDEwMDBcIixcclxuXCIwMDAwMDAwMFwiXHJcbl0sXHJcbi8vICMweDAxNSBcclxuWyBcclxuXCIwMTAwMDAxMFwiLFxyXG5cIjAxMDAwMDEwXCIsXHJcblwiMDEwMDAwMTBcIixcclxuXCIwMTAwMDAxMFwiLFxyXG5cIjAxMDAwMDEwXCIsXHJcblwiMDEwMDAwMTBcIixcclxuXCIwMDExMTEwMFwiLFxyXG5cIjAwMDAwMDAwXCJcclxuXSxcclxuLy8gIzB4MDE2IFxyXG5bIFxyXG5cIjAxMDAwMDEwXCIsXHJcblwiMDEwMDAwMTBcIixcclxuXCIwMTAwMDAxMFwiLFxyXG5cIjAwMTAwMTAwXCIsXHJcblwiMDAxMDAxMDBcIixcclxuXCIwMDAxMTAwMFwiLFxyXG5cIjAwMDExMDAwXCIsXHJcblwiMDAwMDAwMDBcIlxyXG5dLFxyXG4vLyAjMHgwMTcgXHJcblsgXHJcblwiMDEwMDAwMTBcIixcclxuXCIwMTAwMDAxMFwiLFxyXG5cIjAxMDAwMDEwXCIsXHJcblwiMDEwMTEwMTBcIixcclxuXCIwMTAxMTAxMFwiLFxyXG5cIjAxMTAwMTEwXCIsXHJcblwiMDEwMDAwMTBcIixcclxuXCIwMDAwMDAwMFwiXHJcbl0sXHJcbi8vICMweDAxOCBcclxuWyBcclxuXCIwMTAwMDAxMFwiLFxyXG5cIjAxMDAwMDEwXCIsXHJcblwiMDAxMDAxMDBcIixcclxuXCIwMDAxMTAwMFwiLFxyXG5cIjAwMTAwMTAwXCIsXHJcblwiMDEwMDAwMTBcIixcclxuXCIwMTAwMDAxMFwiLFxyXG5cIjAwMDAwMDAwXCJcclxuXSxcclxuLy8gIzB4MDE5IFxyXG5bIFxyXG5cIjAwMTAwMDEwXCIsXHJcblwiMDAxMDAwMTBcIixcclxuXCIwMDEwMDAxMFwiLFxyXG5cIjAwMDExMTAwXCIsXHJcblwiMDAwMDEwMDBcIixcclxuXCIwMDAwMTAwMFwiLFxyXG5cIjAwMDAxMDAwXCIsXHJcblwiMDAwMDAwMDBcIlxyXG5dLFxyXG4vLyAjMHgwMWEgXHJcblsgXHJcblwiMDExMTExMTBcIixcclxuXCIwMDAwMDAxMFwiLFxyXG5cIjAwMDAwMTAwXCIsXHJcblwiMDAwMTEwMDBcIixcclxuXCIwMDEwMDAwMFwiLFxyXG5cIjAxMDAwMDAwXCIsXHJcblwiMDExMTExMTBcIixcclxuXCIwMDAwMDAwMFwiXHJcbl0sXHJcbi8vICMweDAxYiBcclxuWyBcclxuXCIwMDAwMTAwMFwiLFxyXG5cIjAwMDAxMDAwXCIsXHJcblwiMDAwMDEwMDBcIixcclxuXCIwMDAwMTAwMFwiLFxyXG5cIjExMTExMTExXCIsXHJcblwiMDAwMDEwMDBcIixcclxuXCIwMDAwMTAwMFwiLFxyXG5cIjAwMDAxMDAwXCJcclxuXSxcclxuLy8gIzB4MDFjIFxyXG5bIFxyXG5cIjAwMDAxMDAwXCIsXHJcblwiMDAwMDEwMDBcIixcclxuXCIwMDAwMTAwMFwiLFxyXG5cIjAwMDAxMDAwXCIsXHJcblwiMDAwMDExMTFcIixcclxuXCIwMDAwMDAwMFwiLFxyXG5cIjAwMDAwMDAwXCIsXHJcblwiMDAwMDAwMDBcIlxyXG5dLFxyXG4vLyAjMHgwMWQgXHJcblsgXHJcblwiMDAwMDEwMDBcIixcclxuXCIwMDAwMTAwMFwiLFxyXG5cIjAwMDAxMDAwXCIsXHJcblwiMDAwMDEwMDBcIixcclxuXCIxMTExMTAwMFwiLFxyXG5cIjAwMDAwMDAwXCIsXHJcblwiMDAwMDAwMDBcIixcclxuXCIwMDAwMDAwMFwiXHJcbl0sXHJcbi8vICMweDAxZSBcclxuWyBcclxuXCIwMDAwMTAwMFwiLFxyXG5cIjAwMDAxMDAwXCIsXHJcblwiMDAwMDEwMDBcIixcclxuXCIwMDAwMTAwMFwiLFxyXG5cIjAwMDAxMTExXCIsXHJcblwiMDAwMDEwMDBcIixcclxuXCIwMDAwMTAwMFwiLFxyXG5cIjAwMDAxMDAwXCJcclxuXSxcclxuLy8gIzB4MDFmIFxyXG5bIFxyXG5cIjAwMDAxMDAwXCIsXHJcblwiMDAwMDEwMDBcIixcclxuXCIwMDAwMTAwMFwiLFxyXG5cIjAwMDAxMDAwXCIsXHJcblwiMTExMTExMTFcIixcclxuXCIwMDAwMDAwMFwiLFxyXG5cIjAwMDAwMDAwXCIsXHJcblwiMDAwMDAwMDBcIlxyXG5dLFxyXG4vLyAjMHgwMjAgXHJcblsgXHJcblwiMDAxMTExMDBcIixcclxuXCIwMTAwMDAxMFwiLFxyXG5cIjAxMDAwMTEwXCIsXHJcblwiMDEwMTEwMTBcIixcclxuXCIwMTEwMDAxMFwiLFxyXG5cIjAxMDAwMDEwXCIsXHJcblwiMDAxMTExMDBcIixcclxuXCIwMDAwMDAwMFwiXHJcbl0sXHJcbi8vICMweDAyMSBcclxuWyBcclxuXCIwMDAwMTAwMFwiLFxyXG5cIjAwMDExMDAwXCIsXHJcblwiMDAxMDEwMDBcIixcclxuXCIwMDAwMTAwMFwiLFxyXG5cIjAwMDAxMDAwXCIsXHJcblwiMDAwMDEwMDBcIixcclxuXCIwMDExMTExMFwiLFxyXG5cIjAwMDAwMDAwXCJcclxuXSxcclxuLy8gIzB4MDIyIFxyXG5bIFxyXG5cIjAwMTExMTAwXCIsXHJcblwiMDEwMDAwMTBcIixcclxuXCIwMDAwMDAxMFwiLFxyXG5cIjAwMDAxMTAwXCIsXHJcblwiMDAxMTAwMDBcIixcclxuXCIwMTAwMDAwMFwiLFxyXG5cIjAxMTExMTEwXCIsXHJcblwiMDAwMDAwMDBcIlxyXG5dLFxyXG4vLyAjMHgwMjMgXHJcblsgXHJcblwiMDAxMTExMDBcIixcclxuXCIwMTAwMDAxMFwiLFxyXG5cIjAwMDAwMDEwXCIsXHJcblwiMDAxMTExMDBcIixcclxuXCIwMDAwMDAxMFwiLFxyXG5cIjAxMDAwMDEwXCIsXHJcblwiMDAxMTExMDBcIixcclxuXCIwMDAwMDAwMFwiXHJcbl0sXHJcbi8vICMweDAyNCBcclxuWyBcclxuXCIwMDAwMDEwMFwiLFxyXG5cIjAwMDAxMTAwXCIsXHJcblwiMDAwMTAxMDBcIixcclxuXCIwMDEwMDEwMFwiLFxyXG5cIjAxMTExMTEwXCIsXHJcblwiMDAwMDAxMDBcIixcclxuXCIwMDAwMDEwMFwiLFxyXG5cIjAwMDAwMDAwXCJcclxuXSxcclxuLy8gIzB4MDI1IFxyXG5bIFxyXG5cIjAxMTExMTEwXCIsXHJcblwiMDEwMDAwMDBcIixcclxuXCIwMTExMTAwMFwiLFxyXG5cIjAwMDAwMTAwXCIsXHJcblwiMDAwMDAwMTBcIixcclxuXCIwMTAwMDEwMFwiLFxyXG5cIjAwMTExMDAwXCIsXHJcblwiMDAwMDAwMDBcIlxyXG5dLFxyXG4vLyAjMHgwMjYgXHJcblsgXHJcblwiMDAwMTExMDBcIixcclxuXCIwMDEwMDAwMFwiLFxyXG5cIjAxMDAwMDAwXCIsXHJcblwiMDExMTExMDBcIixcclxuXCIwMTAwMDAxMFwiLFxyXG5cIjAxMDAwMDEwXCIsXHJcblwiMDAxMTExMDBcIixcclxuXCIwMDAwMDAwMFwiXHJcbl0sXHJcbi8vICMweDAyNyBcclxuWyBcclxuXCIwMTExMTExMFwiLFxyXG5cIjAxMDAwMDEwXCIsXHJcblwiMDAwMDAxMDBcIixcclxuXCIwMDAwMTAwMFwiLFxyXG5cIjAwMDEwMDAwXCIsXHJcblwiMDAwMTAwMDBcIixcclxuXCIwMDAxMDAwMFwiLFxyXG5cIjAwMDAwMDAwXCJcclxuXSxcclxuLy8gIzB4MDI4IFxyXG5bIFxyXG5cIjAwMTExMTAwXCIsXHJcblwiMDEwMDAwMTBcIixcclxuXCIwMTAwMDAxMFwiLFxyXG5cIjAwMTExMTAwXCIsXHJcblwiMDEwMDAwMTBcIixcclxuXCIwMTAwMDAxMFwiLFxyXG5cIjAwMTExMTAwXCIsXHJcblwiMDAwMDAwMDBcIlxyXG5dLFxyXG4vLyAjMHgwMjkgXHJcblsgXHJcblwiMDAxMTExMDBcIixcclxuXCIwMTAwMDAxMFwiLFxyXG5cIjAxMDAwMDEwXCIsXHJcblwiMDAxMTExMTBcIixcclxuXCIwMDAwMDAxMFwiLFxyXG5cIjAwMDAwMTAwXCIsXHJcblwiMDAxMTEwMDBcIixcclxuXCIwMDAwMDAwMFwiXHJcbl0sXHJcbi8vICMweDAyYSBcclxuWyBcclxuXCIwMDAwMDAwMFwiLFxyXG5cIjAwMDAwMDAwXCIsXHJcblwiMDAwMDAwMDBcIixcclxuXCIwMTExMTExMFwiLFxyXG5cIjAwMDAwMDAwXCIsXHJcblwiMDAwMDAwMDBcIixcclxuXCIwMDAwMDAwMFwiLFxyXG5cIjAwMDAwMDAwXCJcclxuXSxcclxuLy8gIzB4MDJiIFxyXG5bIFxyXG5cIjAwMDAwMDAwXCIsXHJcblwiMDAwMDAwMDBcIixcclxuXCIwMTExMTExMFwiLFxyXG5cIjAwMDAwMDAwXCIsXHJcblwiMDExMTExMTBcIixcclxuXCIwMDAwMDAwMFwiLFxyXG5cIjAwMDAwMDAwXCIsXHJcblwiMDAwMDAwMDBcIlxyXG5dLFxyXG4vLyAjMHgwMmMgXHJcblsgXHJcblwiMDAwMDAwMDBcIixcclxuXCIwMDAwMDAwMFwiLFxyXG5cIjAwMDAxMDAwXCIsXHJcblwiMDAwMDAwMDBcIixcclxuXCIwMDAwMDAwMFwiLFxyXG5cIjAwMDAxMDAwXCIsXHJcblwiMDAwMDEwMDBcIixcclxuXCIwMDAxMDAwMFwiXHJcbl0sXHJcbi8vICMweDAyZCBcclxuWyBcclxuXCIwMDAwMDAwMFwiLFxyXG5cIjAwMDAwMDEwXCIsXHJcblwiMDAwMDAxMDBcIixcclxuXCIwMDAwMTAwMFwiLFxyXG5cIjAwMDEwMDAwXCIsXHJcblwiMDAxMDAwMDBcIixcclxuXCIwMTAwMDAwMFwiLFxyXG5cIjAwMDAwMDAwXCJcclxuXSxcclxuLy8gIzB4MDJlIFxyXG5bIFxyXG5cIjAwMDAwMDAwXCIsXHJcblwiMDAwMDAwMDBcIixcclxuXCIwMDAwMDAwMFwiLFxyXG5cIjAwMDAwMDAwXCIsXHJcblwiMDAwMDAwMDBcIixcclxuXCIwMDAxMTAwMFwiLFxyXG5cIjAwMDExMDAwXCIsXHJcblwiMDAwMDAwMDBcIlxyXG5dLFxyXG4vLyAjMHgwMmYgXHJcblsgXHJcblwiMDAwMDAwMDBcIixcclxuXCIwMDAwMDAwMFwiLFxyXG5cIjAwMDAwMDAwXCIsXHJcblwiMDAwMDAwMDBcIixcclxuXCIwMDAwMDAwMFwiLFxyXG5cIjAwMDAxMDAwXCIsXHJcblwiMDAwMDEwMDBcIixcclxuXCIwMDAxMDAwMFwiXHJcbl0sXHJcbi8vICMweDAzMCBcclxuWyBcclxuXCIwMDAwMDAwMFwiLFxyXG5cIjExMTExMTExXCIsXHJcblwiMDAwMDAwMDBcIixcclxuXCIwMDAwMDAwMFwiLFxyXG5cIjAwMDAwMDAwXCIsXHJcblwiMDAwMDAwMDBcIixcclxuXCIwMDAwMDAwMFwiLFxyXG5cIjAwMDAwMDAwXCJcclxuXSxcclxuLy8gIzB4MDMxIFxyXG5bIFxyXG5cIjAxMDAwMDAwXCIsXHJcblwiMDEwMDAwMDBcIixcclxuXCIwMTAwMDAwMFwiLFxyXG5cIjAxMDAwMDAwXCIsXHJcblwiMDEwMDAwMDBcIixcclxuXCIwMTAwMDAwMFwiLFxyXG5cIjAxMDAwMDAwXCIsXHJcblwiMDEwMDAwMDBcIlxyXG5dLFxyXG4vLyAjMHgwMzIgXHJcblsgXHJcblwiMTAwMDAwMDBcIixcclxuXCIxMDAwMDAwMFwiLFxyXG5cIjEwMDAwMDAwXCIsXHJcblwiMTAwMDAwMDBcIixcclxuXCIxMDAwMDAwMFwiLFxyXG5cIjEwMDAwMDAwXCIsXHJcblwiMTAwMDAwMDBcIixcclxuXCIxMTExMTExMVwiXHJcbl0sXHJcbi8vICMweDAzMyBcclxuWyBcclxuXCIwMDAwMDAwMVwiLFxyXG5cIjAwMDAwMDAxXCIsXHJcblwiMDAwMDAwMDFcIixcclxuXCIwMDAwMDAwMVwiLFxyXG5cIjAwMDAwMDAxXCIsXHJcblwiMDAwMDAwMDFcIixcclxuXCIwMDAwMDAwMVwiLFxyXG5cIjExMTExMTExXCJcclxuXSxcclxuLy8gIzB4MDM0IFxyXG5bIFxyXG5cIjAwMDAwMDAwXCIsXHJcblwiMDAwMDAwMDBcIixcclxuXCIwMDAwMDAwMFwiLFxyXG5cIjExMTExMTExXCIsXHJcblwiMDAwMDAwMDBcIixcclxuXCIwMDAwMDAwMFwiLFxyXG5cIjAwMDAwMDAwXCIsXHJcblwiMDAwMDAwMDBcIlxyXG5dLFxyXG4vLyAjMHgwMzUgXHJcblsgXHJcblwiMDAwMTAwMDBcIixcclxuXCIwMDAxMDAwMFwiLFxyXG5cIjAwMDEwMDAwXCIsXHJcblwiMDAwMTAwMDBcIixcclxuXCIwMDAxMDAwMFwiLFxyXG5cIjAwMDEwMDAwXCIsXHJcblwiMDAwMTAwMDBcIixcclxuXCIwMDAxMDAwMFwiXHJcbl0sXHJcbi8vICMweDAzNiBcclxuWyBcclxuXCIxMTExMTExMVwiLFxyXG5cIjExMTExMTExXCIsXHJcblwiMDAwMDAwMDBcIixcclxuXCIwMDAwMDAwMFwiLFxyXG5cIjAwMDAwMDAwXCIsXHJcblwiMDAwMDAwMDBcIixcclxuXCIwMDAwMDAwMFwiLFxyXG5cIjAwMDAwMDAwXCJcclxuXSxcclxuLy8gIzB4MDM3IFxyXG5bIFxyXG5cIjExMDAwMDAwXCIsXHJcblwiMTEwMDAwMDBcIixcclxuXCIxMTAwMDAwMFwiLFxyXG5cIjExMDAwMDAwXCIsXHJcblwiMTEwMDAwMDBcIixcclxuXCIxMTAwMDAwMFwiLFxyXG5cIjExMDAwMDAwXCIsXHJcblwiMTEwMDAwMDBcIlxyXG5dLFxyXG4vLyAjMHgwMzggXHJcblsgXHJcblwiMDAwMDAwMDBcIixcclxuXCIwMDAwMDAwMFwiLFxyXG5cIjAwMDAwMDAwXCIsXHJcblwiMDAwMDAwMDBcIixcclxuXCIwMDAwMDAwMFwiLFxyXG5cIjExMTExMTExXCIsXHJcblwiMDAwMDAwMDBcIixcclxuXCIwMDAwMDAwMFwiXHJcbl0sXHJcbi8vICMweDAzOSBcclxuWyBcclxuXCIwMDAwMDEwMFwiLFxyXG5cIjAwMDAwMTAwXCIsXHJcblwiMDAwMDAxMDBcIixcclxuXCIwMDAwMDEwMFwiLFxyXG5cIjAwMDAwMTAwXCIsXHJcblwiMDAwMDAxMDBcIixcclxuXCIwMDAwMDEwMFwiLFxyXG5cIjAwMDAwMTAwXCJcclxuXSxcclxuLy8gIzB4MDNhIFxyXG5bIFxyXG5cIjAwMDAwMDAwXCIsXHJcblwiMDAwMDAwMDBcIixcclxuXCIwMDAwMDAwMFwiLFxyXG5cIjAwMDAwMDAwXCIsXHJcblwiMTExMTExMTFcIixcclxuXCIxMTExMTExMVwiLFxyXG5cIjExMTExMTExXCIsXHJcblwiMTExMTExMTFcIlxyXG5dLFxyXG4vLyAjMHgwM2IgXHJcblsgXHJcblwiMDAwMDExMTFcIixcclxuXCIwMDAwMTExMVwiLFxyXG5cIjAwMDAxMTExXCIsXHJcblwiMDAwMDExMTFcIixcclxuXCIwMDAwMTExMVwiLFxyXG5cIjAwMDAxMTExXCIsXHJcblwiMDAwMDExMTFcIixcclxuXCIwMDAwMTExMVwiXHJcbl0sXHJcbi8vICMweDAzYyBcclxuWyBcclxuXCIwMDAwMDAwMFwiLFxyXG5cIjAwMDAwMDAwXCIsXHJcblwiMDAwMDAwMDBcIixcclxuXCIwMDAwMDAwMFwiLFxyXG5cIjAwMDAwMDAwXCIsXHJcblwiMDAwMDAwMDBcIixcclxuXCIwMDAwMDAwMFwiLFxyXG5cIjExMTExMTExXCJcclxuXSxcclxuLy8gIzB4MDNkIFxyXG5bIFxyXG5cIjAwMDAwMDAxXCIsXHJcblwiMDAwMDAwMDFcIixcclxuXCIwMDAwMDAwMVwiLFxyXG5cIjAwMDAwMDAxXCIsXHJcblwiMDAwMDAwMDFcIixcclxuXCIwMDAwMDAwMVwiLFxyXG5cIjAwMDAwMDAxXCIsXHJcblwiMDAwMDAwMDFcIlxyXG5dLFxyXG4vLyAjMHgwM2UgXHJcblsgXHJcblwiMDAwMDAwMDBcIixcclxuXCIwMDAwMDAwMFwiLFxyXG5cIjAwMDAwMDAwXCIsXHJcblwiMDAwMDAwMDBcIixcclxuXCIwMDAwMDAwMFwiLFxyXG5cIjAwMDAwMDAwXCIsXHJcblwiMTExMTExMTFcIixcclxuXCIxMTExMTExMVwiXHJcbl0sXHJcbi8vICMweDAzZiBcclxuWyBcclxuXCIwMDAwMDAxMVwiLFxyXG5cIjAwMDAwMDExXCIsXHJcblwiMDAwMDAwMTFcIixcclxuXCIwMDAwMDAxMVwiLFxyXG5cIjAwMDAwMDExXCIsXHJcblwiMDAwMDAwMTFcIixcclxuXCIwMDAwMDAxMVwiLFxyXG5cIjAwMDAwMDExXCJcclxuXSxcclxuLy8gIzB4MDQwIFxyXG5bIFxyXG5cIjAwMDAwMDAwXCIsXHJcblwiMDAwMDAwMDBcIixcclxuXCIwMDAwMTAwMFwiLFxyXG5cIjAwMDAwMTAwXCIsXHJcblwiMTExMTExMTBcIixcclxuXCIwMDAwMDEwMFwiLFxyXG5cIjAwMDAxMDAwXCIsXHJcblwiMDAwMDAwMDBcIlxyXG5dLFxyXG4vLyAjMHgwNDEgXHJcblsgXHJcblwiMDAwMDEwMDBcIixcclxuXCIwMDAxMTEwMFwiLFxyXG5cIjAwMTExMTEwXCIsXHJcblwiMDExMTExMTFcIixcclxuXCIwMTExMTExMVwiLFxyXG5cIjAwMDExMTAwXCIsXHJcblwiMDAxMTExMTBcIixcclxuXCIwMDAwMDAwMFwiXHJcbl0sXHJcbi8vICMweDA0MiBcclxuWyBcclxuXCIxMTExMTExMVwiLFxyXG5cIjAxMTExMTExXCIsXHJcblwiMDAxMTExMTFcIixcclxuXCIwMDAxMTExMVwiLFxyXG5cIjAwMDAxMTExXCIsXHJcblwiMDAwMDAxMTFcIixcclxuXCIwMDAwMDAxMVwiLFxyXG5cIjAwMDAwMDAxXCJcclxuXSxcclxuLy8gIzB4MDQzIFxyXG5bIFxyXG5cIjExMTExMTExXCIsXHJcblwiMTExMTExMTFcIixcclxuXCIxMTExMTExMVwiLFxyXG5cIjExMTExMTExXCIsXHJcblwiMTExMTExMTFcIixcclxuXCIxMTExMTExMVwiLFxyXG5cIjExMTExMTExXCIsXHJcblwiMTExMTExMTFcIlxyXG5dLFxyXG4vLyAjMHgwNDQgXHJcblsgXHJcblwiMDAwMDEwMDBcIixcclxuXCIwMDAxMTEwMFwiLFxyXG5cIjAwMTExMTEwXCIsXHJcblwiMDExMTExMTFcIixcclxuXCIwMDExMTExMFwiLFxyXG5cIjAwMDExMTAwXCIsXHJcblwiMDAwMDEwMDBcIixcclxuXCIwMDAwMDAwMFwiXHJcbl0sXHJcbi8vICMweDA0NSBcclxuWyBcclxuXCIwMDAwMDAwMFwiLFxyXG5cIjAwMDAwMDAwXCIsXHJcblwiMDAwMTAwMDBcIixcclxuXCIwMDEwMDAwMFwiLFxyXG5cIjAxMTExMTExXCIsXHJcblwiMDAxMDAwMDBcIixcclxuXCIwMDAxMDAwMFwiLFxyXG5cIjAwMDAwMDAwXCJcclxuXSxcclxuLy8gIzB4MDQ2IFxyXG5bIFxyXG5cIjAwMDAxMDAwXCIsXHJcblwiMDAwMTExMDBcIixcclxuXCIwMDEwMTAxMFwiLFxyXG5cIjAxMTExMTExXCIsXHJcblwiMDAxMDEwMTBcIixcclxuXCIwMDAwMTAwMFwiLFxyXG5cIjAwMDAxMDAwXCIsXHJcblwiMDAwMDAwMDBcIlxyXG5dLFxyXG4vLyAjMHgwNDcgXHJcblsgXHJcblwiMDAwMDAwMDBcIixcclxuXCIwMDExMTEwMFwiLFxyXG5cIjAxMTExMTEwXCIsXHJcblwiMDExMTExMTBcIixcclxuXCIwMTExMTExMFwiLFxyXG5cIjAxMTExMTEwXCIsXHJcblwiMDAxMTExMDBcIixcclxuXCIwMDAwMDAwMFwiXHJcbl0sXHJcbi8vICMweDA0OCBcclxuWyBcclxuXCIwMDAwMDAwMFwiLFxyXG5cIjAwMTExMTAwXCIsXHJcblwiMDEwMDAwMTBcIixcclxuXCIwMTAwMDAxMFwiLFxyXG5cIjAxMDAwMDEwXCIsXHJcblwiMDEwMDAwMTBcIixcclxuXCIwMDExMTEwMFwiLFxyXG5cIjAwMDAwMDAwXCJcclxuXSxcclxuLy8gIzB4MDQ5IFxyXG5bIFxyXG5cIjAwMTExMTAwXCIsXHJcblwiMDEwMDAwMTBcIixcclxuXCIwMDAwMDAxMFwiLFxyXG5cIjAwMDAxMTAwXCIsXHJcblwiMDAwMTAwMDBcIixcclxuXCIwMDAwMDAwMFwiLFxyXG5cIjAwMDEwMDAwXCIsXHJcblwiMDAwMDAwMDBcIlxyXG5dLFxyXG4vLyAjMHgwNGEgXHJcblsgXHJcblwiMTExMTExMTFcIixcclxuXCIxMTAwMDAxMVwiLFxyXG5cIjEwMDAwMDAxXCIsXHJcblwiMTAwMDAwMDFcIixcclxuXCIxMDAwMDAwMVwiLFxyXG5cIjEwMDAwMDAxXCIsXHJcblwiMTEwMDAwMTFcIixcclxuXCIxMTExMTExMVwiXHJcbl0sXHJcbi8vICMweDA0YiBcclxuWyBcclxuXCIwMDAwMDAwMFwiLFxyXG5cIjAwMDAwMDAwXCIsXHJcblwiMDAwMDAwMDBcIixcclxuXCIwMDAwMDAwMFwiLFxyXG5cIjAwMDAwMDExXCIsXHJcblwiMDAwMDAxMDBcIixcclxuXCIwMDAwMTAwMFwiLFxyXG5cIjAwMDAxMDAwXCJcclxuXSxcclxuLy8gIzB4MDRjIFxyXG5bIFxyXG5cIjAwMDAwMDAwXCIsXHJcblwiMDAwMDAwMDBcIixcclxuXCIwMDAwMDAwMFwiLFxyXG5cIjAwMDAwMDAwXCIsXHJcblwiMTEwMDAwMDBcIixcclxuXCIwMDEwMDAwMFwiLFxyXG5cIjAwMDEwMDAwXCIsXHJcblwiMDAwMTAwMDBcIlxyXG5dLFxyXG4vLyAjMHgwNGQgXHJcblsgXHJcblwiMTAwMDAwMDBcIixcclxuXCIxMTAwMDAwMFwiLFxyXG5cIjExMTAwMDAwXCIsXHJcblwiMTExMTAwMDBcIixcclxuXCIxMTExMTAwMFwiLFxyXG5cIjExMTExMTAwXCIsXHJcblwiMTExMTExMTBcIixcclxuXCIxMTExMTExMVwiXHJcbl0sXHJcbi8vICMweDA0ZSBcclxuWyBcclxuXCIwMDAwMDAwMVwiLFxyXG5cIjAwMDAwMDExXCIsXHJcblwiMDAwMDAxMTFcIixcclxuXCIwMDAwMTExMVwiLFxyXG5cIjAwMDExMTExXCIsXHJcblwiMDAxMTExMTFcIixcclxuXCIwMTExMTExMVwiLFxyXG5cIjExMTExMTExXCJcclxuXSxcclxuLy8gIzB4MDRmIFxyXG5bIFxyXG5cIjAwMDAwMDAwXCIsXHJcblwiMDAwMDAwMDBcIixcclxuXCIwMDAwMTAwMFwiLFxyXG5cIjAwMDAwMDAwXCIsXHJcblwiMDAwMDAwMDBcIixcclxuXCIwMDAwMTAwMFwiLFxyXG5cIjAwMDAwMDAwXCIsXHJcblwiMDAwMDAwMDBcIlxyXG5dLFxyXG4vLyAjMHgwNTAgXHJcblsgXHJcblwiMDAwMDAwMDBcIixcclxuXCIwMDAwMTAwMFwiLFxyXG5cIjAwMDExMTAwXCIsXHJcblwiMDAxMDEwMTBcIixcclxuXCIwMDAwMTAwMFwiLFxyXG5cIjAwMDAxMDAwXCIsXHJcblwiMDAwMDEwMDBcIixcclxuXCIwMDAwMDAwMFwiXHJcbl0sXHJcbi8vICMweDA1MSBcclxuWyBcclxuXCIwMDAwMTExMFwiLFxyXG5cIjAwMDExMDAwXCIsXHJcblwiMDAxMTAwMDBcIixcclxuXCIwMTEwMDAwMFwiLFxyXG5cIjAwMTEwMDAwXCIsXHJcblwiMDAwMTEwMDBcIixcclxuXCIwMDAwMTExMFwiLFxyXG5cIjAwMDAwMDAwXCJcclxuXSxcclxuLy8gIzB4MDUyIFxyXG5bIFxyXG5cIjAwMTExMTAwXCIsXHJcblwiMDAxMDAwMDBcIixcclxuXCIwMDEwMDAwMFwiLFxyXG5cIjAwMTAwMDAwXCIsXHJcblwiMDAxMDAwMDBcIixcclxuXCIwMDEwMDAwMFwiLFxyXG5cIjAwMTExMTAwXCIsXHJcblwiMDAwMDAwMDBcIlxyXG5dLFxyXG4vLyAjMHgwNTMgXHJcblsgXHJcblwiMDAxMTAxMTBcIixcclxuXCIwMTExMTExMVwiLFxyXG5cIjAxMTExMTExXCIsXHJcblwiMDExMTExMTFcIixcclxuXCIwMDExMTExMFwiLFxyXG5cIjAwMDExMTAwXCIsXHJcblwiMDAwMDEwMDBcIixcclxuXCIwMDAwMDAwMFwiXHJcbl0sXHJcbi8vICMweDA1NCBcclxuWyBcclxuXCIwMDExMTEwMFwiLFxyXG5cIjAwMDAwMTAwXCIsXHJcblwiMDAwMDAxMDBcIixcclxuXCIwMDAwMDEwMFwiLFxyXG5cIjAwMDAwMTAwXCIsXHJcblwiMDAwMDAxMDBcIixcclxuXCIwMDExMTEwMFwiLFxyXG5cIjAwMDAwMDAwXCJcclxuXSxcclxuLy8gIzB4MDU1IFxyXG5bIFxyXG5cIjAwMDExMTAwXCIsXHJcblwiMDAxMDAwMTBcIixcclxuXCIwMTAwMTAxMFwiLFxyXG5cIjAxMDEwMTEwXCIsXHJcblwiMDEwMDExMDBcIixcclxuXCIwMDEwMDAwMFwiLFxyXG5cIjAwMDExMTEwXCIsXHJcblwiMDAwMDAwMDBcIlxyXG5dLFxyXG4vLyAjMHgwNTYgXHJcblsgXHJcblwiMTExMTExMTFcIixcclxuXCIxMTExMTExMFwiLFxyXG5cIjExMTExMTAwXCIsXHJcblwiMTExMTEwMDBcIixcclxuXCIxMTExMDAwMFwiLFxyXG5cIjExMTAwMDAwXCIsXHJcblwiMTEwMDAwMDBcIixcclxuXCIxMDAwMDAwMFwiXHJcbl0sXHJcbi8vICMweDA1NyBcclxuWyBcclxuXCIwMTExMDAwMFwiLFxyXG5cIjAwMDExMDAwXCIsXHJcblwiMDAwMDExMDBcIixcclxuXCIwMDAwMDExMFwiLFxyXG5cIjAwMDAxMTAwXCIsXHJcblwiMDAwMTEwMDBcIixcclxuXCIwMTExMDAwMFwiLFxyXG5cIjAwMDAwMDAwXCJcclxuXSxcclxuLy8gIzB4MDU4IFxyXG5bIFxyXG5cIjEwMTAwMDAwXCIsXHJcblwiMDEwMTAwMDBcIixcclxuXCIxMDEwMDAwMFwiLFxyXG5cIjAxMDEwMDAwXCIsXHJcblwiMTAxMDAwMDBcIixcclxuXCIwMTAxMDAwMFwiLFxyXG5cIjEwMTAwMDAwXCIsXHJcblwiMDEwMTAwMDBcIlxyXG5dLFxyXG4vLyAjMHgwNTkgXHJcblsgXHJcblwiMDAwMDAwMDBcIixcclxuXCIwMTAwMDAwMFwiLFxyXG5cIjAwMTAwMDAwXCIsXHJcblwiMDAwMTAwMDBcIixcclxuXCIwMDAwMTAwMFwiLFxyXG5cIjAwMDAwMTAwXCIsXHJcblwiMDAwMDAwMTBcIixcclxuXCIwMDAwMDAwMFwiXHJcbl0sXHJcbi8vICMweDA1YSBcclxuWyBcclxuXCIxMDEwMTAxMFwiLFxyXG5cIjAxMDEwMTAxXCIsXHJcblwiMTAxMDEwMTBcIixcclxuXCIwMTAxMDEwMVwiLFxyXG5cIjEwMTAxMDEwXCIsXHJcblwiMDEwMTAxMDFcIixcclxuXCIxMDEwMTAxMFwiLFxyXG5cIjAxMDEwMTAxXCJcclxuXSxcclxuLy8gIzB4MDViIFxyXG5bIFxyXG5cIjExMTEwMDAwXCIsXHJcblwiMTExMTAwMDBcIixcclxuXCIxMTExMDAwMFwiLFxyXG5cIjExMTEwMDAwXCIsXHJcblwiMDAwMDExMTFcIixcclxuXCIwMDAwMTExMVwiLFxyXG5cIjAwMDAxMTExXCIsXHJcblwiMDAwMDExMTFcIlxyXG5dLFxyXG4vLyAjMHgwNWMgXHJcblsgXHJcblwiMDAwMDAwMDBcIixcclxuXCIwMDAwMDAwMFwiLFxyXG5cIjAwMDAwMDAwXCIsXHJcblwiMDAwMDAwMDBcIixcclxuXCIwMDAwMTExMVwiLFxyXG5cIjAwMDAxMDAwXCIsXHJcblwiMDAwMDEwMDBcIixcclxuXCIwMDAwMTAwMFwiXHJcbl0sXHJcbi8vICMweDA1ZCBcclxuWyBcclxuXCIwMDAwMDAwMFwiLFxyXG5cIjAwMDAwMDAwXCIsXHJcblwiMDAwMDAwMDBcIixcclxuXCIwMDAwMDAwMFwiLFxyXG5cIjExMTExMDAwXCIsXHJcblwiMDAwMDEwMDBcIixcclxuXCIwMDAwMTAwMFwiLFxyXG5cIjAwMDAxMDAwXCJcclxuXSxcclxuLy8gIzB4MDVlIFxyXG5bIFxyXG5cIjAwMDAxMDAwXCIsXHJcblwiMDAwMDEwMDBcIixcclxuXCIwMDAwMTAwMFwiLFxyXG5cIjAwMDAxMDAwXCIsXHJcblwiMTExMTEwMDBcIixcclxuXCIwMDAwMTAwMFwiLFxyXG5cIjAwMDAxMDAwXCIsXHJcblwiMDAwMDEwMDBcIlxyXG5dLFxyXG4vLyAjMHgwNWYgXHJcblsgXHJcblwiMDAwMDAwMDBcIixcclxuXCIwMDAwMDAwMFwiLFxyXG5cIjAwMDAwMDAwXCIsXHJcblwiMDAwMDAwMDBcIixcclxuXCIxMTExMTExMVwiLFxyXG5cIjAwMDAxMDAwXCIsXHJcblwiMDAwMDEwMDBcIixcclxuXCIwMDAwMTAwMFwiXHJcbl0sXHJcbi8vICMweDA2MCBcclxuWyBcclxuXCIwMDAwMDAwMFwiLFxyXG5cIjAwMDAwMDAwXCIsXHJcblwiMDAwMDAwMDFcIixcclxuXCIwMDExMTExMFwiLFxyXG5cIjAxMDEwMTAwXCIsXHJcblwiMDAwMTAxMDBcIixcclxuXCIwMDAxMDEwMFwiLFxyXG5cIjAwMDAwMDAwXCJcclxuXSxcclxuLy8gIzB4MDYxIFxyXG5bIFxyXG5cIjAwMDAxMDAwXCIsXHJcblwiMDAwMDEwMDBcIixcclxuXCIwMDAwMTAwMFwiLFxyXG5cIjAwMDAxMDAwXCIsXHJcblwiMDAwMDAwMDBcIixcclxuXCIwMDAwMDAwMFwiLFxyXG5cIjAwMDAxMDAwXCIsXHJcblwiMDAwMDAwMDBcIlxyXG5dLFxyXG4vLyAjMHgwNjIgXHJcblsgXHJcblwiMDAxMDAxMDBcIixcclxuXCIwMDEwMDEwMFwiLFxyXG5cIjAwMTAwMTAwXCIsXHJcblwiMDAwMDAwMDBcIixcclxuXCIwMDAwMDAwMFwiLFxyXG5cIjAwMDAwMDAwXCIsXHJcblwiMDAwMDAwMDBcIixcclxuXCIwMDAwMDAwMFwiXHJcbl0sXHJcbi8vICMweDA2MyBcclxuWyBcclxuXCIwMDEwMDEwMFwiLFxyXG5cIjAwMTAwMTAwXCIsXHJcblwiMDExMTExMTBcIixcclxuXCIwMDEwMDEwMFwiLFxyXG5cIjAxMTExMTEwXCIsXHJcblwiMDAxMDAxMDBcIixcclxuXCIwMDEwMDEwMFwiLFxyXG5cIjAwMDAwMDAwXCJcclxuXSxcclxuLy8gIzB4MDY0IFxyXG5bIFxyXG5cIjAwMDAxMDAwXCIsXHJcblwiMDAwMTExMTBcIixcclxuXCIwMDEwMTAwMFwiLFxyXG5cIjAwMDExMTAwXCIsXHJcblwiMDAwMDEwMTBcIixcclxuXCIwMDExMTEwMFwiLFxyXG5cIjAwMDAxMDAwXCIsXHJcblwiMDAwMDAwMDBcIlxyXG5dLFxyXG4vLyAjMHgwNjUgXHJcblsgXHJcblwiMDAwMDAwMDBcIixcclxuXCIwMTEwMDAxMFwiLFxyXG5cIjAxMTAwMTAwXCIsXHJcblwiMDAwMDEwMDBcIixcclxuXCIwMDAxMDAwMFwiLFxyXG5cIjAwMTAwMTEwXCIsXHJcblwiMDEwMDAxMTBcIixcclxuXCIwMDAwMDAwMFwiXHJcbl0sXHJcbi8vICMweDA2NiBcclxuWyBcclxuXCIwMDExMDAwMFwiLFxyXG5cIjAxMDAxMDAwXCIsXHJcblwiMDEwMDEwMDBcIixcclxuXCIwMDExMDAwMFwiLFxyXG5cIjAxMDAxMDEwXCIsXHJcblwiMDEwMDAxMDBcIixcclxuXCIwMDExMTAxMFwiLFxyXG5cIjAwMDAwMDAwXCJcclxuXSxcclxuLy8gIzB4MDY3IFxyXG5bIFxyXG5cIjAwMDAwMTAwXCIsXHJcblwiMDAwMDEwMDBcIixcclxuXCIwMDAxMDAwMFwiLFxyXG5cIjAwMDAwMDAwXCIsXHJcblwiMDAwMDAwMDBcIixcclxuXCIwMDAwMDAwMFwiLFxyXG5cIjAwMDAwMDAwXCIsXHJcblwiMDAwMDAwMDBcIlxyXG5dLFxyXG4vLyAjMHgwNjggXHJcblsgXHJcblwiMDAwMDAxMDBcIixcclxuXCIwMDAwMTAwMFwiLFxyXG5cIjAwMDEwMDAwXCIsXHJcblwiMDAwMTAwMDBcIixcclxuXCIwMDAxMDAwMFwiLFxyXG5cIjAwMDAxMDAwXCIsXHJcblwiMDAwMDAxMDBcIixcclxuXCIwMDAwMDAwMFwiXHJcbl0sXHJcbi8vICMweDA2OSBcclxuWyBcclxuXCIwMDEwMDAwMFwiLFxyXG5cIjAwMDEwMDAwXCIsXHJcblwiMDAwMDEwMDBcIixcclxuXCIwMDAwMTAwMFwiLFxyXG5cIjAwMDAxMDAwXCIsXHJcblwiMDAwMTAwMDBcIixcclxuXCIwMDEwMDAwMFwiLFxyXG5cIjAwMDAwMDAwXCJcclxuXSxcclxuLy8gIzB4MDZhIFxyXG5bIFxyXG5cIjAwMDAwMDAwXCIsXHJcblwiMDAwMDEwMDBcIixcclxuXCIwMDAwMTAwMFwiLFxyXG5cIjAwMTExMTEwXCIsXHJcblwiMDAwMDEwMDBcIixcclxuXCIwMDAwMTAwMFwiLFxyXG5cIjAwMDAwMDAwXCIsXHJcblwiMDAwMDAwMDBcIlxyXG5dLFxyXG4vLyAjMHgwNmIgXHJcblsgXHJcblwiMDAwMDEwMDBcIixcclxuXCIwMDEwMTAxMFwiLFxyXG5cIjAwMDExMTAwXCIsXHJcblwiMDAxMTExMTBcIixcclxuXCIwMDAxMTEwMFwiLFxyXG5cIjAwMTAxMDEwXCIsXHJcblwiMDAwMDEwMDBcIixcclxuXCIwMDAwMDAwMFwiXHJcbl0sXHJcbi8vICMweDA2YyBcclxuWyBcclxuXCIwMDAwMTExMVwiLFxyXG5cIjAwMDAxMTExXCIsXHJcblwiMDAwMDExMTFcIixcclxuXCIwMDAwMTExMVwiLFxyXG5cIjExMTEwMDAwXCIsXHJcblwiMTExMTAwMDBcIixcclxuXCIxMTExMDAwMFwiLFxyXG5cIjExMTEwMDAwXCJcclxuXSxcclxuLy8gIzB4MDZkIFxyXG5bIFxyXG5cIjEwMDAwMDAxXCIsXHJcblwiMDEwMDAwMTBcIixcclxuXCIwMDEwMDEwMFwiLFxyXG5cIjAwMDExMDAwXCIsXHJcblwiMDAwMTEwMDBcIixcclxuXCIwMDEwMDEwMFwiLFxyXG5cIjAxMDAwMDEwXCIsXHJcblwiMTAwMDAwMDFcIlxyXG5dLFxyXG4vLyAjMHgwNmUgXHJcblsgXHJcblwiMDAwMTAwMDBcIixcclxuXCIwMDAxMDAwMFwiLFxyXG5cIjAwMTAwMDAwXCIsXHJcblwiMTEwMDAwMDBcIixcclxuXCIwMDAwMDAwMFwiLFxyXG5cIjAwMDAwMDAwXCIsXHJcblwiMDAwMDAwMDBcIixcclxuXCIwMDAwMDAwMFwiXHJcbl0sXHJcbi8vICMweDA2ZiBcclxuWyBcclxuXCIwMDAwMTAwMFwiLFxyXG5cIjAwMDAxMDAwXCIsXHJcblwiMDAwMDAxMDBcIixcclxuXCIwMDAwMDAxMVwiLFxyXG5cIjAwMDAwMDAwXCIsXHJcblwiMDAwMDAwMDBcIixcclxuXCIwMDAwMDAwMFwiLFxyXG5cIjAwMDAwMDAwXCJcclxuXSxcclxuLy8gIzB4MDcwIFxyXG5bIFxyXG5cIjExMTExMTExXCIsXHJcblwiMDAwMDAwMDBcIixcclxuXCIwMDAwMDAwMFwiLFxyXG5cIjAwMDAwMDAwXCIsXHJcblwiMDAwMDAwMDBcIixcclxuXCIwMDAwMDAwMFwiLFxyXG5cIjAwMDAwMDAwXCIsXHJcblwiMDAwMDAwMDBcIlxyXG5dLFxyXG4vLyAjMHgwNzEgXHJcblsgXHJcblwiMTAwMDAwMDBcIixcclxuXCIxMDAwMDAwMFwiLFxyXG5cIjEwMDAwMDAwXCIsXHJcblwiMTAwMDAwMDBcIixcclxuXCIxMDAwMDAwMFwiLFxyXG5cIjEwMDAwMDAwXCIsXHJcblwiMTAwMDAwMDBcIixcclxuXCIxMDAwMDAwMFwiXHJcbl0sXHJcbi8vICMweDA3MiBcclxuWyBcclxuXCIxMTExMTExMVwiLFxyXG5cIjEwMDAwMDAwXCIsXHJcblwiMTAwMDAwMDBcIixcclxuXCIxMDAwMDAwMFwiLFxyXG5cIjEwMDAwMDAwXCIsXHJcblwiMTAwMDAwMDBcIixcclxuXCIxMDAwMDAwMFwiLFxyXG5cIjEwMDAwMDAwXCJcclxuXSxcclxuLy8gIzB4MDczIFxyXG5bIFxyXG5cIjExMTExMTExXCIsXHJcblwiMDAwMDAwMDFcIixcclxuXCIwMDAwMDAwMVwiLFxyXG5cIjAwMDAwMDAxXCIsXHJcblwiMDAwMDAwMDFcIixcclxuXCIwMDAwMDAwMVwiLFxyXG5cIjAwMDAwMDAxXCIsXHJcblwiMDAwMDAwMDFcIlxyXG5dLFxyXG4vLyAjMHgwNzQgXHJcblsgXHJcblwiMDAwMDAwMDBcIixcclxuXCIwMDAwMDAwMFwiLFxyXG5cIjExMTExMTExXCIsXHJcblwiMDAwMDAwMDBcIixcclxuXCIwMDAwMDAwMFwiLFxyXG5cIjAwMDAwMDAwXCIsXHJcblwiMDAwMDAwMDBcIixcclxuXCIwMDAwMDAwMFwiXHJcbl0sXHJcbi8vICMweDA3NSBcclxuWyBcclxuXCIwMDEwMDAwMFwiLFxyXG5cIjAwMTAwMDAwXCIsXHJcblwiMDAxMDAwMDBcIixcclxuXCIwMDEwMDAwMFwiLFxyXG5cIjAwMTAwMDAwXCIsXHJcblwiMDAxMDAwMDBcIixcclxuXCIwMDEwMDAwMFwiLFxyXG5cIjAwMTAwMDAwXCJcclxuXSxcclxuLy8gIzB4MDc2IFxyXG5bIFxyXG5cIjAwMDAwMDAxXCIsXHJcblwiMDAwMDAwMTBcIixcclxuXCIwMDAwMDEwMFwiLFxyXG5cIjAwMDAxMDAwXCIsXHJcblwiMDAwMTAwMDBcIixcclxuXCIwMDEwMDAwMFwiLFxyXG5cIjAxMDAwMDAwXCIsXHJcblwiMTAwMDAwMDBcIlxyXG5dLFxyXG4vLyAjMHgwNzcgXHJcblsgXHJcblwiMTAwMDAwMDBcIixcclxuXCIwMTAwMDAwMFwiLFxyXG5cIjAwMTAwMDAwXCIsXHJcblwiMDAwMTAwMDBcIixcclxuXCIwMDAwMTAwMFwiLFxyXG5cIjAwMDAwMTAwXCIsXHJcblwiMDAwMDAwMTBcIixcclxuXCIwMDAwMDAwMVwiXHJcbl0sXHJcbi8vICMweDA3OCBcclxuWyBcclxuXCIwMDAwMDAwMFwiLFxyXG5cIjAwMDAwMDAwXCIsXHJcblwiMDAwMDAwMDBcIixcclxuXCIwMDAwMDAwMFwiLFxyXG5cIjExMTExMTExXCIsXHJcblwiMDAwMDAwMDBcIixcclxuXCIwMDAwMDAwMFwiLFxyXG5cIjAwMDAwMDAwXCJcclxuXSxcclxuLy8gIzB4MDc5IFxyXG5bIFxyXG5cIjAwMDAxMDAwXCIsXHJcblwiMDAwMDEwMDBcIixcclxuXCIwMDAwMTAwMFwiLFxyXG5cIjAwMDAxMDAwXCIsXHJcblwiMDAwMDEwMDBcIixcclxuXCIwMDAwMTAwMFwiLFxyXG5cIjAwMDAxMDAwXCIsXHJcblwiMDAwMDEwMDBcIlxyXG5dLFxyXG4vLyAjMHgwN2EgXHJcblsgXHJcblwiMTExMTExMTFcIixcclxuXCIxMTExMTExMVwiLFxyXG5cIjExMTExMTExXCIsXHJcblwiMTExMTExMTFcIixcclxuXCIwMDAwMDAwMFwiLFxyXG5cIjAwMDAwMDAwXCIsXHJcblwiMDAwMDAwMDBcIixcclxuXCIwMDAwMDAwMFwiXHJcbl0sXHJcbi8vICMweDA3YiBcclxuWyBcclxuXCIxMTExMDAwMFwiLFxyXG5cIjExMTEwMDAwXCIsXHJcblwiMTExMTAwMDBcIixcclxuXCIxMTExMDAwMFwiLFxyXG5cIjExMTEwMDAwXCIsXHJcblwiMTExMTAwMDBcIixcclxuXCIxMTExMDAwMFwiLFxyXG5cIjExMTEwMDAwXCJcclxuXSxcclxuLy8gIzB4MDdjIFxyXG5bIFxyXG5cIjAwMDAwMDAwXCIsXHJcblwiMDAwMDAwMDBcIixcclxuXCIwMDAwMDAwMFwiLFxyXG5cIjAwMDAwMDAwXCIsXHJcblwiMDAwMDAwMDBcIixcclxuXCIwMDAwMDAwMFwiLFxyXG5cIjExMTExMTExXCIsXHJcblwiMDAwMDAwMDBcIlxyXG5dLFxyXG4vLyAjMHgwN2QgXHJcblsgXHJcblwiMDAwMDAwMTBcIixcclxuXCIwMDAwMDAxMFwiLFxyXG5cIjAwMDAwMDEwXCIsXHJcblwiMDAwMDAwMTBcIixcclxuXCIwMDAwMDAxMFwiLFxyXG5cIjAwMDAwMDEwXCIsXHJcblwiMDAwMDAwMTBcIixcclxuXCIwMDAwMDAxMFwiXHJcbl0sXHJcbi8vICMweDA3ZSBcclxuWyBcclxuXCIwMDAwMDAwMFwiLFxyXG5cIjAwMDAwMDAwXCIsXHJcblwiMDAwMDAwMDBcIixcclxuXCIwMDAwMDAwMFwiLFxyXG5cIjAwMDAwMDAwXCIsXHJcblwiMTExMTExMTFcIixcclxuXCIxMTExMTExMVwiLFxyXG5cIjExMTExMTExXCJcclxuXSxcclxuLy8gIzB4MDdmIFxyXG5bIFxyXG5cIjAwMDAwMTExXCIsXHJcblwiMDAwMDAxMTFcIixcclxuXCIwMDAwMDExMVwiLFxyXG5cIjAwMDAwMTExXCIsXHJcblwiMDAwMDAxMTFcIixcclxuXCIwMDAwMDExMVwiLFxyXG5cIjAwMDAwMTExXCIsXHJcblwiMDAwMDAxMTFcIlxyXG5dLFxyXG4vLyAjMHgwODAgXHJcblsgXHJcblwiMDAwMDAwMDBcIixcclxuXCIwMDAwMTAwMFwiLFxyXG5cIjAwMDAxMDAwXCIsXHJcblwiMDAwMDEwMDBcIixcclxuXCIwMDEwMTAxMFwiLFxyXG5cIjAwMDExMTAwXCIsXHJcblwiMDAwMDEwMDBcIixcclxuXCIwMDAwMDAwMFwiXHJcbl0sXHJcbi8vICMweDA4MSBcclxuWyBcclxuXCIwMDAwMDEwMFwiLFxyXG5cIjAwMTExMDAwXCIsXHJcblwiMDAwMDEwMDBcIixcclxuXCIwMDExMTExMFwiLFxyXG5cIjAwMDAxMDAwXCIsXHJcblwiMDAwMDEwMDBcIixcclxuXCIwMDAxMDAwMFwiLFxyXG5cIjAwMDAwMDAwXCJcclxuXSxcclxuLy8gIzB4MDgyIFxyXG5bIFxyXG5cIjAwMDAwMDAwXCIsXHJcblwiMDAxMTExMTBcIixcclxuXCIwMDAwMDAxMFwiLFxyXG5cIjAwMDAwMDEwXCIsXHJcblwiMDAwMDAwMTBcIixcclxuXCIwMDAwMDAxMFwiLFxyXG5cIjAwMTExMTEwXCIsXHJcblwiMDAwMDAwMDBcIlxyXG5dLFxyXG4vLyAjMHgwODMgXHJcblsgXHJcblwiMDAwMDAwMDBcIixcclxuXCIwMDEwMDAxMFwiLFxyXG5cIjAwMTAwMDEwXCIsXHJcblwiMDAwMTAwMTBcIixcclxuXCIwMDAwMDAxMFwiLFxyXG5cIjAwMDAwMTAwXCIsXHJcblwiMDAwMTEwMDBcIixcclxuXCIwMDAwMDAwMFwiXHJcbl0sXHJcbi8vICMweDA4NCBcclxuWyBcclxuXCIwMDAwMDAwMFwiLFxyXG5cIjAwMTEwMDAwXCIsXHJcblwiMDAwMDAwMTBcIixcclxuXCIwMDExMDAxMFwiLFxyXG5cIjAwMDAwMDEwXCIsXHJcblwiMDAwMDAxMDBcIixcclxuXCIwMDExMTAwMFwiLFxyXG5cIjAwMDAwMDAwXCJcclxuXSxcclxuLy8gIzB4MDg1IFxyXG5bIFxyXG5cIjAwMDAwMDEwXCIsXHJcblwiMDAwMDAxMDBcIixcclxuXCIwMDAwMTAwMFwiLFxyXG5cIjAwMDExMDAwXCIsXHJcblwiMDAxMDEwMDBcIixcclxuXCIwMDAwMTAwMFwiLFxyXG5cIjAwMDAxMDAwXCIsXHJcblwiMDAwMDAwMDBcIlxyXG5dLFxyXG4vLyAjMHgwODYgXHJcblsgXHJcblwiMDAwMDAwMDBcIixcclxuXCIwMDAwMTAwMFwiLFxyXG5cIjAwMDAwMTAwXCIsXHJcblwiMDAxMDAwMTBcIixcclxuXCIwMDEwMDAxMFwiLFxyXG5cIjAwMTAwMDEwXCIsXHJcblwiMDAxMDAwMTBcIixcclxuXCIwMDAwMDAwMFwiXHJcbl0sXHJcbi8vICMweDA4NyBcclxuWyBcclxuXCIwMDAwMTAwMFwiLFxyXG5cIjAwMTExMTEwXCIsXHJcblwiMDAwMDEwMDBcIixcclxuXCIwMDExMTExMFwiLFxyXG5cIjAwMDAxMDAwXCIsXHJcblwiMDAwMDEwMDBcIixcclxuXCIwMDAwMTAwMFwiLFxyXG5cIjAwMDAwMDAwXCJcclxuXSxcclxuLy8gIzB4MDg4IFxyXG5bIFxyXG5cIjAwMDAwMDAwXCIsXHJcblwiMDAwMTExMTBcIixcclxuXCIwMDAxMDAxMFwiLFxyXG5cIjAwMTAwMDEwXCIsXHJcblwiMDAwMDAwMTBcIixcclxuXCIwMDAwMDEwMFwiLFxyXG5cIjAwMDExMDAwXCIsXHJcblwiMDAwMDAwMDBcIlxyXG5dLFxyXG4vLyAjMHgwODkgXHJcblsgXHJcblwiMDAwMDAwMDBcIixcclxuXCIwMDAxMTEwMFwiLFxyXG5cIjAwMDAwMDAwXCIsXHJcblwiMDAwMDAwMDBcIixcclxuXCIwMDAwMDAwMFwiLFxyXG5cIjAwMDAwMDAwXCIsXHJcblwiMDAxMTExMTBcIixcclxuXCIwMDAwMDAwMFwiXHJcbl0sXHJcbi8vICMweDA4YSBcclxuWyBcclxuXCIwMDAwMDAwMFwiLFxyXG5cIjAwMTExMTEwXCIsXHJcblwiMDAwMDAwMTBcIixcclxuXCIwMDAwMDAxMFwiLFxyXG5cIjAwMDEwMTAwXCIsXHJcblwiMDAwMDEwMDBcIixcclxuXCIwMDAwMDEwMFwiLFxyXG5cIjAwMDAwMDAwXCJcclxuXSxcclxuLy8gIzB4MDhiIFxyXG5bIFxyXG5cIjAwMDAwMTAwXCIsXHJcblwiMDAwMDAxMDBcIixcclxuXCIwMDAwMDEwMFwiLFxyXG5cIjAwMDAwMTAwXCIsXHJcblwiMDAwMDAxMDBcIixcclxuXCIwMDAwMTAwMFwiLFxyXG5cIjAwMDEwMDAwXCIsXHJcblwiMDAwMDAwMDBcIlxyXG5dLFxyXG4vLyAjMHgwOGMgXHJcblsgXHJcblwiMDAxMDAxMDBcIixcclxuXCIwMDEwMDEwMFwiLFxyXG5cIjAwMTAwMTAwXCIsXHJcblwiMDAxMDAxMDBcIixcclxuXCIwMDAwMDEwMFwiLFxyXG5cIjAwMDAxMDAwXCIsXHJcblwiMDAwMTAwMDBcIixcclxuXCIwMDAwMDAwMFwiXHJcbl0sXHJcbi8vICMweDA4ZCBcclxuWyBcclxuXCIwMDAwMDAwMFwiLFxyXG5cIjAwMTExMTEwXCIsXHJcblwiMDAwMTAwMDBcIixcclxuXCIwMDExMTExMFwiLFxyXG5cIjAwMDEwMDAwXCIsXHJcblwiMDAwMTAwMDBcIixcclxuXCIwMDAwMTExMFwiLFxyXG5cIjAwMDAwMDAwXCJcclxuXSxcclxuLy8gIzB4MDhlIFxyXG5bIFxyXG5cIjAwMDAwMDAwXCIsXHJcblwiMDAwMTExMDBcIixcclxuXCIwMDAwMDAwMFwiLFxyXG5cIjAwMDExMTAwXCIsXHJcblwiMDAwMDAwMDBcIixcclxuXCIwMDExMTEwMFwiLFxyXG5cIjAwMDAwMDEwXCIsXHJcblwiMDAwMDAwMDBcIlxyXG5dLFxyXG4vLyAjMHgwOGYgXHJcblsgXHJcblwiMDAwMTExMDBcIixcclxuXCIwMDAwMDAwMFwiLFxyXG5cIjAwMTExMTEwXCIsXHJcblwiMDAwMDAwMTBcIixcclxuXCIwMDAwMDAxMFwiLFxyXG5cIjAwMDAwMTAwXCIsXHJcblwiMDAwMDEwMDBcIixcclxuXCIwMDAwMDAwMFwiXHJcbl0sXHJcbi8vICMweDA5MCBcclxuWyBcclxuXCIwMDAxMDAwMFwiLFxyXG5cIjAwMTExMTEwXCIsXHJcblwiMDAwMTAwMTBcIixcclxuXCIwMDAxMDEwMFwiLFxyXG5cIjAwMDEwMDAwXCIsXHJcblwiMDAwMTAwMDBcIixcclxuXCIwMDAwMTExMFwiLFxyXG5cIjAwMDAwMDAwXCJcclxuXSxcclxuLy8gIzB4MDkxIFxyXG5bIFxyXG5cIjAwMDAwMDAwXCIsXHJcblwiMDAwMTExMTBcIixcclxuXCIwMDAxMDAxMFwiLFxyXG5cIjAwMTAxMDEwXCIsXHJcblwiMDAwMDAxMTBcIixcclxuXCIwMDAwMDEwMFwiLFxyXG5cIjAwMDExMDAwXCIsXHJcblwiMDAwMDAwMDBcIlxyXG5dLFxyXG4vLyAjMHgwOTIgXHJcblsgXHJcblwiMDAwMDAwMDBcIixcclxuXCIwMDExMTExMFwiLFxyXG5cIjAwMDAwMDEwXCIsXHJcblwiMDAwMDAxMDBcIixcclxuXCIwMDAwMTAwMFwiLFxyXG5cIjAwMDEwMTAwXCIsXHJcblwiMDAxMDAwMTBcIixcclxuXCIwMDAwMDAwMFwiXHJcbl0sXHJcbi8vICMweDA5MyBcclxuWyBcclxuXCIwMDAxMDAwMFwiLFxyXG5cIjAwMDEwMDAwXCIsXHJcblwiMDAwMTAwMDBcIixcclxuXCIwMDAxMTAwMFwiLFxyXG5cIjAwMDEwMTAwXCIsXHJcblwiMDAwMTAwMDBcIixcclxuXCIwMDAxMDAwMFwiLFxyXG5cIjAwMDAwMDAwXCJcclxuXSxcclxuLy8gIzB4MDk0IFxyXG5bIFxyXG5cIjAwMDEwMDAwXCIsXHJcblwiMDAxMTExMTBcIixcclxuXCIwMDAxMDAxMFwiLFxyXG5cIjAwMDEwMDEwXCIsXHJcblwiMDAwMTAwMTBcIixcclxuXCIwMDAxMDAxMFwiLFxyXG5cIjAwMTAwMTAwXCIsXHJcblwiMDAwMDAwMDBcIlxyXG5dLFxyXG4vLyAjMHgwOTUgXHJcblsgXHJcblwiMDAwMDEwMDBcIixcclxuXCIwMDAwMTAwMFwiLFxyXG5cIjAwMTExMTEwXCIsXHJcblwiMDAwMDEwMDBcIixcclxuXCIwMDAwMTAwMFwiLFxyXG5cIjAwMDEwMDAwXCIsXHJcblwiMDAxMDAwMDBcIixcclxuXCIwMDAwMDAwMFwiXHJcbl0sXHJcbi8vICMweDA5NiBcclxuWyBcclxuXCIwMDEwMDAwMFwiLFxyXG5cIjAwMTAwMDAwXCIsXHJcblwiMDAxMTExMTBcIixcclxuXCIwMDEwMDAwMFwiLFxyXG5cIjAwMTAwMDAwXCIsXHJcblwiMDAxMDAwMDBcIixcclxuXCIwMDAxMTExMFwiLFxyXG5cIjAwMDAwMDAwXCJcclxuXSxcclxuLy8gIzB4MDk3IFxyXG5bIFxyXG5cIjAwMDExMTAwXCIsXHJcblwiMDAwMDAwMDBcIixcclxuXCIwMDExMTExMFwiLFxyXG5cIjAwMDAxMDAwXCIsXHJcblwiMDAwMDEwMDBcIixcclxuXCIwMDAwMTAwMFwiLFxyXG5cIjAwMDEwMDAwXCIsXHJcblwiMDAwMDAwMDBcIlxyXG5dLFxyXG4vLyAjMHgwOTggXHJcblsgXHJcblwiMDAwMTAxMDBcIixcclxuXCIwMDExMTExMFwiLFxyXG5cIjAwMDEwMTAwXCIsXHJcblwiMDAwMTAxMDBcIixcclxuXCIwMDAwMDEwMFwiLFxyXG5cIjAwMDAxMDAwXCIsXHJcblwiMDAwMTAwMDBcIixcclxuXCIwMDAwMDAwMFwiXHJcbl0sXHJcbi8vICMweDA5OSBcclxuWyBcclxuXCIwMDAwMDAwMFwiLFxyXG5cIjAwMTEwMDAwXCIsXHJcblwiMDAwMDAwMDBcIixcclxuXCIwMDAwMDAxMFwiLFxyXG5cIjAwMDAwMDEwXCIsXHJcblwiMDAwMDAxMDBcIixcclxuXCIwMDExMTAwMFwiLFxyXG5cIjAwMDAwMDAwXCJcclxuXSxcclxuLy8gIzB4MDlhIFxyXG5bIFxyXG5cIjAwMDAwMDAwXCIsXHJcblwiMDAxMDEwMTBcIixcclxuXCIwMDEwMTAxMFwiLFxyXG5cIjAwMTAxMDEwXCIsXHJcblwiMDAwMDAwMTBcIixcclxuXCIwMDAwMDEwMFwiLFxyXG5cIjAwMDAxMDAwXCIsXHJcblwiMDAwMDAwMDBcIlxyXG5dLFxyXG4vLyAjMHgwOWIgXHJcblsgXHJcblwiMDAwMDAwMDBcIixcclxuXCIwMDExMTExMFwiLFxyXG5cIjAwMTAwMDEwXCIsXHJcblwiMDAxMDAwMTBcIixcclxuXCIwMDEwMDAxMFwiLFxyXG5cIjAwMTAwMDEwXCIsXHJcblwiMDAxMTExMTBcIixcclxuXCIwMDAwMDAwMFwiXHJcbl0sXHJcbi8vICMweDA5YyBcclxuWyBcclxuXCIwMDAxMDAwMFwiLFxyXG5cIjAwMDExMTEwXCIsXHJcblwiMDAxMDAxMDBcIixcclxuXCIwMDAwMDEwMFwiLFxyXG5cIjAwMDAwMTAwXCIsXHJcblwiMDAwMDAxMDBcIixcclxuXCIwMDAwMTAwMFwiLFxyXG5cIjAwMDAwMDAwXCJcclxuXSxcclxuLy8gIzB4MDlkIFxyXG5bIFxyXG5cIjAwMDExMTEwXCIsXHJcblwiMDAwMTAwMDBcIixcclxuXCIwMDAxMDAwMFwiLFxyXG5cIjAwMDEwMDAwXCIsXHJcblwiMDAwMDAwMDBcIixcclxuXCIwMDAwMDAwMFwiLFxyXG5cIjAwMDAwMDAwXCIsXHJcblwiMDAwMDAwMDBcIlxyXG5dLFxyXG4vLyAjMHgwOWUgXHJcblsgXHJcblwiMDAwMDAwMDBcIixcclxuXCIwMDAwMDAwMFwiLFxyXG5cIjAwMTExMTEwXCIsXHJcblwiMDAwMDAwMTBcIixcclxuXCIwMDAwMTEwMFwiLFxyXG5cIjAwMDAxMDAwXCIsXHJcblwiMDAwMTAwMDBcIixcclxuXCIwMDAwMDAwMFwiXHJcbl0sXHJcbi8vICMweDA5ZiBcclxuWyBcclxuXCIwMDAwMDAwMFwiLFxyXG5cIjAwMDAwMDAwXCIsXHJcblwiMDAwMTAwMDBcIixcclxuXCIwMDExMTExMFwiLFxyXG5cIjAwMDEwMDEwXCIsXHJcblwiMDAwMTAxMDBcIixcclxuXCIwMDAxMDAwMFwiLFxyXG5cIjAwMDAwMDAwXCJcclxuXSxcclxuLy8gIzB4MGEwIFxyXG5bIFxyXG5cIjAwMDAwMDAwXCIsXHJcblwiMDAxMTExMTBcIixcclxuXCIwMDEwMDAxMFwiLFxyXG5cIjAwMTAwMDEwXCIsXHJcblwiMDAwMDAwMTBcIixcclxuXCIwMDAwMDEwMFwiLFxyXG5cIjAwMDAxMDAwXCIsXHJcblwiMDAwMDAwMDBcIlxyXG5dLFxyXG4vLyAjMHgwYTEgXHJcblsgXHJcblwiMDAwMDAwMDBcIixcclxuXCIwMDExMTExMFwiLFxyXG5cIjAwMDAwMDEwXCIsXHJcblwiMDAwMTAxMDBcIixcclxuXCIwMDAwMTAwMFwiLFxyXG5cIjAwMDEwMTAwXCIsXHJcblwiMDAxMDAwMDBcIixcclxuXCIwMDAwMDAwMFwiXHJcbl0sXHJcbi8vICMweDBhMiBcclxuWyBcclxuXCIwMDAwMDAwMFwiLFxyXG5cIjAwMTExMTEwXCIsXHJcblwiMDAwMDAwMTBcIixcclxuXCIwMDAwMDAxMFwiLFxyXG5cIjAwMDAwMDEwXCIsXHJcblwiMDAwMDAxMDBcIixcclxuXCIwMDAxMTAwMFwiLFxyXG5cIjAwMDAwMDAwXCJcclxuXSxcclxuLy8gIzB4MGEzIFxyXG5bIFxyXG5cIjAwMTExMTEwXCIsXHJcblwiMDAwMDAwMTBcIixcclxuXCIwMDAwMTAxMFwiLFxyXG5cIjAwMDAxMTAwXCIsXHJcblwiMDAwMDEwMDBcIixcclxuXCIwMDAwMTAwMFwiLFxyXG5cIjAwMDEwMDAwXCIsXHJcblwiMDAwMDAwMDBcIlxyXG5dLFxyXG4vLyAjMHgwYTQgXHJcblsgXHJcblwiMDAwMDEwMDBcIixcclxuXCIwMDExMTExMFwiLFxyXG5cIjAwMTAwMDEwXCIsXHJcblwiMDAxMDAwMTBcIixcclxuXCIwMDAwMDAxMFwiLFxyXG5cIjAwMDAwMTAwXCIsXHJcblwiMDAwMDEwMDBcIixcclxuXCIwMDAwMDAwMFwiXHJcbl0sXHJcbi8vICMweDBhNSBcclxuWyBcclxuXCIwMDAwMDAwMFwiLFxyXG5cIjAwMTExMTEwXCIsXHJcblwiMDAwMDEwMDBcIixcclxuXCIwMDAwMTAwMFwiLFxyXG5cIjAwMDAxMDAwXCIsXHJcblwiMDAwMDEwMDBcIixcclxuXCIwMDExMTExMFwiLFxyXG5cIjAwMDAwMDAwXCJcclxuXSxcclxuLy8gIzB4MGE2IFxyXG5bIFxyXG5cIjAwMDAwMTAwXCIsXHJcblwiMDAxMTExMTBcIixcclxuXCIwMDAwMDEwMFwiLFxyXG5cIjAwMDAxMTAwXCIsXHJcblwiMDAwMTAxMDBcIixcclxuXCIwMDEwMDEwMFwiLFxyXG5cIjAwMDAwMTAwXCIsXHJcblwiMDAwMDAwMDBcIlxyXG5dLFxyXG4vLyAjMHgwYTcgXHJcblsgXHJcblwiMDAwMTAwMDBcIixcclxuXCIwMDAxMDAwMFwiLFxyXG5cIjAwMTExMTEwXCIsXHJcblwiMDAwMTAwMTBcIixcclxuXCIwMDAxMDEwMFwiLFxyXG5cIjAwMDEwMDAwXCIsXHJcblwiMDAwMTAwMDBcIixcclxuXCIwMDAwMDAwMFwiXHJcbl0sXHJcbi8vICMweDBhOCBcclxuWyBcclxuXCIwMDAwMDAwMFwiLFxyXG5cIjAwMDExMTAwXCIsXHJcblwiMDAwMDAxMDBcIixcclxuXCIwMDAwMDEwMFwiLFxyXG5cIjAwMDAwMTAwXCIsXHJcblwiMDAwMDAxMDBcIixcclxuXCIwMDExMTExMFwiLFxyXG5cIjAwMDAwMDAwXCJcclxuXSxcclxuLy8gIzB4MGE5IFxyXG5bIFxyXG5cIjAwMDAwMDAwXCIsXHJcblwiMDAxMTExMTBcIixcclxuXCIwMDAwMDAxMFwiLFxyXG5cIjAwMTExMTEwXCIsXHJcblwiMDAwMDAwMTBcIixcclxuXCIwMDAwMDAxMFwiLFxyXG5cIjAwMTExMTEwXCIsXHJcblwiMDAwMDAwMDBcIlxyXG5dLFxyXG4vLyAjMHgwYWEgXHJcblsgXHJcblwiMDAwMDEwMDBcIixcclxuXCIwMDExMTExMFwiLFxyXG5cIjAwMDAxMDAwXCIsXHJcblwiMDAwMDEwMDBcIixcclxuXCIwMDEwMTAxMFwiLFxyXG5cIjAwMTAxMDEwXCIsXHJcblwiMDAwMDEwMDBcIixcclxuXCIwMDAwMDAwMFwiXHJcbl0sXHJcbi8vICMweDBhYiBcclxuWyBcclxuXCIwMDAwMDAwMFwiLFxyXG5cIjAwMDEwMDAwXCIsXHJcblwiMDAxMDEwMDBcIixcclxuXCIwMDAwMDEwMFwiLFxyXG5cIjAwMDAwMDEwXCIsXHJcblwiMDAwMDAwMTBcIixcclxuXCIwMDAwMDAwMFwiLFxyXG5cIjAwMDAwMDAwXCJcclxuXSxcclxuLy8gIzB4MGFjIFxyXG5bIFxyXG5cIjAwMDAwMDAwXCIsXHJcblwiMDAxMDAwMDBcIixcclxuXCIwMDEwMDAwMFwiLFxyXG5cIjAwMTAwMDEwXCIsXHJcblwiMDAxMDAxMDBcIixcclxuXCIwMDEwMTAwMFwiLFxyXG5cIjAwMTEwMDAwXCIsXHJcblwiMDAwMDAwMDBcIlxyXG5dLFxyXG4vLyAjMHgwYWQgXHJcblsgXHJcblwiMDAwMDAwMDBcIixcclxuXCIwMDAwMDAxMFwiLFxyXG5cIjAwMDAwMDEwXCIsXHJcblwiMDAwMTAxMDBcIixcclxuXCIwMDAwMTAwMFwiLFxyXG5cIjAwMDEwMTAwXCIsXHJcblwiMDAxMDAwMDBcIixcclxuXCIwMDAwMDAwMFwiXHJcbl0sXHJcbi8vICMweDBhZSBcclxuWyBcclxuXCIwMDAwMDAwMFwiLFxyXG5cIjAwMDAxMDAwXCIsXHJcblwiMDAxMDEwMDBcIixcclxuXCIwMDEwMTAwMFwiLFxyXG5cIjAwMTAxMDEwXCIsXHJcblwiMDAxMDEwMTBcIixcclxuXCIwMDEwMTEwMFwiLFxyXG5cIjAwMDAwMDAwXCJcclxuXSxcclxuLy8gIzB4MGFmIFxyXG5bIFxyXG5cIjAwMDAxMDAwXCIsXHJcblwiMDAxMTExMTBcIixcclxuXCIwMDAwMDEwMFwiLFxyXG5cIjAwMDAxMDAwXCIsXHJcblwiMDAwMTExMDBcIixcclxuXCIwMDEwMTAxMFwiLFxyXG5cIjAwMDAxMDAwXCIsXHJcblwiMDAwMDAwMDBcIlxyXG5dLFxyXG4vLyAjMHgwYjAgXHJcblsgXHJcblwiMDAwMDAwMDBcIixcclxuXCIwMDAwMTAwMFwiLFxyXG5cIjAwMDEwMDAwXCIsXHJcblwiMDAxMDAwMDBcIixcclxuXCIwMDEwMDAxMFwiLFxyXG5cIjAwMTExMTEwXCIsXHJcblwiMDAwMDAwMTBcIixcclxuXCIwMDAwMDAwMFwiXHJcbl0sXHJcbi8vICMweDBiMSBcclxuWyBcclxuXCIwMDAwMDAwMFwiLFxyXG5cIjAwMDAwMDAwXCIsXHJcblwiMDAwMDAwMDBcIixcclxuXCIwMDAwMTAwMFwiLFxyXG5cIjAwMDAxMDAwXCIsXHJcblwiMDAwMDEwMDBcIixcclxuXCIwMTExMTAwMFwiLFxyXG5cIjAwMDAwMDAwXCJcclxuXSxcclxuLy8gIzB4MGIyIFxyXG5bIFxyXG5cIjAwMDAwMDAwXCIsXHJcblwiMDAwMDAwMDBcIixcclxuXCIwMDAwMDEwMFwiLFxyXG5cIjAwMDAxMDAwXCIsXHJcblwiMDAwMTEwMDBcIixcclxuXCIwMDEwMTAwMFwiLFxyXG5cIjAwMDAxMDAwXCIsXHJcblwiMDAwMDAwMDBcIlxyXG5dLFxyXG4vLyAjMHgwYjMgXHJcblsgXHJcblwiMDAwMDAwMDBcIixcclxuXCIwMDAwMDAwMFwiLFxyXG5cIjAwMDAwMDAwXCIsXHJcblwiMDAwMTExMDBcIixcclxuXCIwMDAwMDEwMFwiLFxyXG5cIjAwMDAwMTAwXCIsXHJcblwiMDAxMTExMTBcIixcclxuXCIwMDAwMDAwMFwiXHJcbl0sXHJcbi8vICMweDBiNCBcclxuWyBcclxuXCIwMDAwMDAwMFwiLFxyXG5cIjAwMTExMTEwXCIsXHJcblwiMDAwMDAwMTBcIixcclxuXCIwMDExMTExMFwiLFxyXG5cIjAwMDAwMDEwXCIsXHJcblwiMDAwMDAxMDBcIixcclxuXCIwMDAwMTAwMFwiLFxyXG5cIjAwMDAwMDAwXCJcclxuXSxcclxuLy8gIzB4MGI1IFxyXG5bIFxyXG5cIjAwMDAwMDAwXCIsXHJcblwiMDAwMDAwMDBcIixcclxuXCIwMDAwMDAwMFwiLFxyXG5cIjAwMDAwMDAwXCIsXHJcblwiMDEwMDAwMDBcIixcclxuXCIwMDEwMDAwMFwiLFxyXG5cIjAwMDEwMDAwXCIsXHJcblwiMDAwMDAwMDBcIlxyXG5dLFxyXG4vLyAjMHgwYjYgXHJcblsgXHJcblwiMDAwMDAwMDBcIixcclxuXCIwMDAwMDAwMFwiLFxyXG5cIjAwMDAxMDAwXCIsXHJcblwiMDAxMTExMTBcIixcclxuXCIwMDEwMDAxMFwiLFxyXG5cIjAwMDAwMDEwXCIsXHJcblwiMDAwMDExMDBcIixcclxuXCIwMDAwMDAwMFwiXHJcbl0sXHJcbi8vICMweDBiNyBcclxuWyBcclxuXCIwMDAwMDAwMFwiLFxyXG5cIjAwMDAwMDAwXCIsXHJcblwiMDAxMTExMDBcIixcclxuXCIwMDAwMDEwMFwiLFxyXG5cIjAwMTExMTAwXCIsXHJcblwiMDAwMDAxMDBcIixcclxuXCIwMDExMTEwMFwiLFxyXG5cIjAwMDAwMDAwXCJcclxuXSxcclxuLy8gIzB4MGI4IFxyXG5bIFxyXG5cIjAxMTEwMDAwXCIsXHJcblwiMDEwMTAwMDBcIixcclxuXCIwMTExMDAwMFwiLFxyXG5cIjAwMDAwMDAwXCIsXHJcblwiMDAwMDAwMDBcIixcclxuXCIwMDAwMDAwMFwiLFxyXG5cIjAwMDAwMDAwXCIsXHJcblwiMDAwMDAwMDBcIlxyXG5dLFxyXG4vLyAjMHgwYjkgXHJcblsgXHJcblwiMDAwMDAwMDBcIixcclxuXCIwMDAwMDAwMFwiLFxyXG5cIjAwMDAwMDAwXCIsXHJcblwiMDAwMDAwMDBcIixcclxuXCIwMDAwMDAwMFwiLFxyXG5cIjAwMDAwMDAwXCIsXHJcblwiMDAxMDAwMDBcIixcclxuXCIwMDAwMDAwMFwiXHJcbl0sXHJcbi8vICMweDBiYSBcclxuWyBcclxuXCIwMDAwMDAwMFwiLFxyXG5cIjAwMDAwMDAwXCIsXHJcblwiMDAwMDAwMDBcIixcclxuXCIwMDExMTExMFwiLFxyXG5cIjAwMDAxMDAwXCIsXHJcblwiMDAwMDEwMDBcIixcclxuXCIwMDExMTExMFwiLFxyXG5cIjAwMDAwMDAwXCJcclxuXSxcclxuLy8gIzB4MGJiIFxyXG5bIFxyXG5cIjAwMDAwMDAwXCIsXHJcblwiMDAwMDAwMDBcIixcclxuXCIwMDAwMDAwMFwiLFxyXG5cIjAwMTAxMDEwXCIsXHJcblwiMDAxMDEwMTBcIixcclxuXCIwMDAwMDAxMFwiLFxyXG5cIjAwMDAxMTAwXCIsXHJcblwiMDAwMDAwMDBcIlxyXG5dLFxyXG4vLyAjMHgwYmMgXHJcblsgXHJcblwiMDAwMTAwMDBcIixcclxuXCIwMTAwMTAwMFwiLFxyXG5cIjAwMTAwMDAwXCIsXHJcblwiMDAwMDAwMDBcIixcclxuXCIwMDAwMDAwMFwiLFxyXG5cIjAwMDAwMDAwXCIsXHJcblwiMDAwMDAwMDBcIixcclxuXCIwMDAwMDAwMFwiXHJcbl0sXHJcbi8vICMweDBiZCBcclxuWyBcclxuXCIwMDAwMDAwMFwiLFxyXG5cIjAwMDAwMDAwXCIsXHJcblwiMDAwMDAwMDBcIixcclxuXCIwMDAwMDAwMFwiLFxyXG5cIjAxMTEwMDAwXCIsXHJcblwiMDEwMTAwMDBcIixcclxuXCIwMTExMDAwMFwiLFxyXG5cIjAwMDAwMDAwXCJcclxuXSxcclxuLy8gIzB4MGJlIFxyXG5bIFxyXG5cIjAwMDAwMDAwXCIsXHJcblwiMDAwMDAwMDBcIixcclxuXCIwMDAwMDEwMFwiLFxyXG5cIjAwMTExMTEwXCIsXHJcblwiMDAwMDExMDBcIixcclxuXCIwMDAxMDEwMFwiLFxyXG5cIjAwMTAwMTAwXCIsXHJcblwiMDAwMDAwMDBcIlxyXG5dLFxyXG4vLyAjMHgwYmYgXHJcblsgXHJcblwiMDAwMDAwMDBcIixcclxuXCIwMDAwMDAwMFwiLFxyXG5cIjAwMDAwMDAwXCIsXHJcblwiMDAwMTExMDBcIixcclxuXCIwMDAwMDAwMFwiLFxyXG5cIjAwMDAwMDAwXCIsXHJcblwiMDAwMDAwMDBcIixcclxuXCIwMDAwMDAwMFwiXHJcbl0sXHJcbi8vICMweDBjMCBcclxuWyBcclxuXCIwMDAxMTEwMFwiLFxyXG5cIjAwMDExMTAwXCIsXHJcblwiMDAxMTExMTBcIixcclxuXCIwMDAxMTEwMFwiLFxyXG5cIjAwMDAxMDAwXCIsXHJcblwiMDAwMDAwMDBcIixcclxuXCIwMDExMTExMFwiLFxyXG5cIjAwMDAwMDAwXCJcclxuXSxcclxuLy8gIzB4MGMxIFxyXG5bIFxyXG5cIjExMTExMTExXCIsXHJcblwiMTExMTAxMTFcIixcclxuXCIxMTExMDExMVwiLFxyXG5cIjExMTEwMTExXCIsXHJcblwiMTEwMTAxMDFcIixcclxuXCIxMTEwMDAxMVwiLFxyXG5cIjExMTEwMTExXCIsXHJcblwiMTExMTExMTFcIlxyXG5dLFxyXG4vLyAjMHgwYzIgXHJcblsgXHJcblwiMTExMTExMTFcIixcclxuXCIxMTExMDExMVwiLFxyXG5cIjExMTAwMDExXCIsXHJcblwiMTEwMTAxMDFcIixcclxuXCIxMTExMDExMVwiLFxyXG5cIjExMTEwMTExXCIsXHJcblwiMTExMTAxMTFcIixcclxuXCIxMTExMTExMVwiXHJcbl0sXHJcbi8vICMweDBjMyBcclxuWyBcclxuXCIxMTExMTExMVwiLFxyXG5cIjExMTExMTExXCIsXHJcblwiMTExMTAxMTFcIixcclxuXCIxMTExMTAxMVwiLFxyXG5cIjEwMDAwMDAxXCIsXHJcblwiMTExMTEwMTFcIixcclxuXCIxMTExMDExMVwiLFxyXG5cIjExMTExMTExXCJcclxuXSxcclxuLy8gIzB4MGM0IFxyXG5bIFxyXG5cIjExMTExMTExXCIsXHJcblwiMTExMTExMTFcIixcclxuXCIxMTEwMTExMVwiLFxyXG5cIjExMDExMTExXCIsXHJcblwiMTAwMDAwMDFcIixcclxuXCIxMTAxMTExMVwiLFxyXG5cIjExMTAxMTExXCIsXHJcblwiMTExMTExMTFcIlxyXG5dLFxyXG4vLyAjMHgwYzUgXHJcblsgXHJcblwiMTAxMTEwMTFcIixcclxuXCIxMDExMTAxMVwiLFxyXG5cIjEwMTExMDExXCIsXHJcblwiMTAwMDAwMTFcIixcclxuXCIxMDExMTAxMVwiLFxyXG5cIjEwMTExMDExXCIsXHJcblwiMTAxMTEwMTFcIixcclxuXCIxMTExMTExMVwiXHJcbl0sXHJcbi8vICMweDBjNiBcclxuWyBcclxuXCIxMTEwMDAxMVwiLFxyXG5cIjExMDExMTAxXCIsXHJcblwiMTAxMTExMTFcIixcclxuXCIxMDExMTExMVwiLFxyXG5cIjEwMTExMTExXCIsXHJcblwiMTEwMTExMDFcIixcclxuXCIxMTEwMDAxMVwiLFxyXG5cIjExMTExMTExXCJcclxuXSxcclxuLy8gIzB4MGM3IFxyXG5bIFxyXG5cIjAwMDExMDAwXCIsXHJcblwiMDAxMDAxMDBcIixcclxuXCIwMTExMTExMFwiLFxyXG5cIjExMTExMTExXCIsXHJcblwiMDEwMTEwMTBcIixcclxuXCIwMDEwMDEwMFwiLFxyXG5cIjAwMDAwMDAwXCIsXHJcblwiMDAwMDAwMDBcIlxyXG5dLFxyXG4vLyAjMHgwYzggXHJcblsgXHJcblwiMTExMDAwMDBcIixcclxuXCIwMTAwMDExMVwiLFxyXG5cIjAxMDAwMDEwXCIsXHJcblwiMDExMTExMTBcIixcclxuXCIwMTAwMDAxMFwiLFxyXG5cIjAxMDAwMTExXCIsXHJcblwiMTExMDAwMDBcIixcclxuXCIwMDAwMDAwMFwiXHJcbl0sXHJcbi8vICMweDBjOSBcclxuWyBcclxuXCIwMDEwMDAxMFwiLFxyXG5cIjAwMTExMTEwXCIsXHJcblwiMDAxMDEwMTBcIixcclxuXCIwMDAwMTAwMFwiLFxyXG5cIjAwMDAxMDAwXCIsXHJcblwiMDEwMDEwMDFcIixcclxuXCIwMTExMTExMVwiLFxyXG5cIjAxMDAwMDAxXCJcclxuXSxcclxuLy8gIzB4MGNhIFxyXG5bIFxyXG5cIjAwMDExMTAwXCIsXHJcblwiMDAwMTExMDBcIixcclxuXCIwMDAwMTAwMFwiLFxyXG5cIjAwMTExMTEwXCIsXHJcblwiMDAwMDEwMDBcIixcclxuXCIwMDAwMTAwMFwiLFxyXG5cIjAwMDEwMTAwXCIsXHJcblwiMDAxMDAwMTBcIlxyXG5dLFxyXG4vLyAjMHgwY2IgXHJcblsgXHJcblwiMDAwMDAwMDBcIixcclxuXCIwMDAxMDAwMVwiLFxyXG5cIjExMDEwMDEwXCIsXHJcblwiMTExMTExMDBcIixcclxuXCIxMTAxMDAxMFwiLFxyXG5cIjAwMDEwMDAxXCIsXHJcblwiMDAwMDAwMDBcIixcclxuXCIwMDAwMDAwMFwiXHJcbl0sXHJcbi8vICMweDBjYyBcclxuWyBcclxuXCIwMDAwMDAwMFwiLFxyXG5cIjEwMDAxMDAwXCIsXHJcblwiMDEwMDEwMTFcIixcclxuXCIwMDExMTExMVwiLFxyXG5cIjAxMDAxMDExXCIsXHJcblwiMTAwMDEwMDBcIixcclxuXCIwMDAwMDAwMFwiLFxyXG5cIjAwMDAwMDAwXCJcclxuXSxcclxuLy8gIzB4MGNkIFxyXG5bIFxyXG5cIjAwMTAwMDEwXCIsXHJcblwiMDAwMTAxMDBcIixcclxuXCIwMDAwMTAwMFwiLFxyXG5cIjAwMDAxMDAwXCIsXHJcblwiMDAxMTExMTBcIixcclxuXCIwMDAwMTAwMFwiLFxyXG5cIjAwMDExMTAwXCIsXHJcblwiMDAwMTExMDBcIlxyXG5dLFxyXG4vLyAjMHgwY2UgXHJcblsgXHJcblwiMDAxMTExMDBcIixcclxuXCIwMTExMTExMFwiLFxyXG5cIjExMTExMTExXCIsXHJcblwiMTEwMTEwMTFcIixcclxuXCIxMTExMTExMVwiLFxyXG5cIjExMTAwMTExXCIsXHJcblwiMDExMTExMTBcIixcclxuXCIwMDExMTEwMFwiXHJcbl0sXHJcbi8vICMweDBjZiBcclxuWyBcclxuXCIwMDExMTEwMFwiLFxyXG5cIjAxMDAwMDEwXCIsXHJcblwiMTAwMDAwMDFcIixcclxuXCIxMDEwMDEwMVwiLFxyXG5cIjEwMDAwMDAxXCIsXHJcblwiMTAwMTEwMDFcIixcclxuXCIwMTAwMDAxMFwiLFxyXG5cIjAwMTExMTAwXCJcclxuXSxcclxuLy8gIzB4MGQwIFxyXG5bIFxyXG5cIjAwMTExMTEwXCIsXHJcblwiMDAxMDAwMTBcIixcclxuXCIwMDEwMDAxMFwiLFxyXG5cIjAwMTExMTEwXCIsXHJcblwiMDAxMDAwMTBcIixcclxuXCIwMDEwMDAxMFwiLFxyXG5cIjAwMTExMTEwXCIsXHJcblwiMDAwMDAwMDBcIlxyXG5dLFxyXG4vLyAjMHgwZDEgXHJcblsgXHJcblwiMDAxMTExMTBcIixcclxuXCIwMDEwMDAxMFwiLFxyXG5cIjAwMTExMTEwXCIsXHJcblwiMDAxMDAwMTBcIixcclxuXCIwMDExMTExMFwiLFxyXG5cIjAwMTAwMDEwXCIsXHJcblwiMDEwMDAwMTBcIixcclxuXCIwMDAwMDAwMFwiXHJcbl0sXHJcbi8vICMweDBkMiBcclxuWyBcclxuXCIwMDAwMTAwMFwiLFxyXG5cIjAwMTAxMDEwXCIsXHJcblwiMDAxMDEwMTBcIixcclxuXCIwMDAwMTAwMFwiLFxyXG5cIjAwMDEwMTAwXCIsXHJcblwiMDAxMDAwMTBcIixcclxuXCIwMTAwMDAwMVwiLFxyXG5cIjAwMDAwMDAwXCJcclxuXSxcclxuLy8gIzB4MGQzIFxyXG5bIFxyXG5cIjAwMDAxMDAwXCIsXHJcblwiMDAwMDEwMDFcIixcclxuXCIwMDExMTAxMFwiLFxyXG5cIjAwMDAxMTAwXCIsXHJcblwiMDAwMTExMDBcIixcclxuXCIwMDEwMTAxMFwiLFxyXG5cIjAxMDAxMDAxXCIsXHJcblwiMDAwMDAwMDBcIlxyXG5dLFxyXG4vLyAjMHgwZDQgXHJcblsgXHJcblwiMDAwMDEwMDBcIixcclxuXCIwMDAwMTAwMFwiLFxyXG5cIjAwMTExMTEwXCIsXHJcblwiMDAwMDEwMDBcIixcclxuXCIwMDAxMTEwMFwiLFxyXG5cIjAwMTAxMDEwXCIsXHJcblwiMDEwMDEwMDFcIixcclxuXCIwMDAwMDAwMFwiXHJcbl0sXHJcbi8vICMweDBkNSBcclxuWyBcclxuXCIwMDAwMTAwMFwiLFxyXG5cIjAwMDEwMTAwXCIsXHJcblwiMDAxMTExMTBcIixcclxuXCIwMTAwMTAwMVwiLFxyXG5cIjAwMTExMTEwXCIsXHJcblwiMDAwMTExMDBcIixcclxuXCIwMTExMTExMVwiLFxyXG5cIjAwMDAwMDAwXCJcclxuXSxcclxuLy8gIzB4MGQ2IFxyXG5bIFxyXG5cIjAwMDAwMDAwXCIsXHJcblwiMDAwMDEwMDBcIixcclxuXCIwMDAwMTAwMFwiLFxyXG5cIjAwMTExMTEwXCIsXHJcblwiMDAwMDEwMDBcIixcclxuXCIwMDAwMTAwMFwiLFxyXG5cIjAxMTExMTExXCIsXHJcblwiMDAwMDAwMDBcIlxyXG5dLFxyXG4vLyAjMHgwZDcgXHJcblsgXHJcblwiMDAwMDEwMDBcIixcclxuXCIwMTAwMTAwMFwiLFxyXG5cIjAxMTExMTEwXCIsXHJcblwiMDEwMDEwMDBcIixcclxuXCIwMDExMTExMFwiLFxyXG5cIjAwMDAxMDAwXCIsXHJcblwiMDExMTExMTFcIixcclxuXCIwMDAwMDAwMFwiXHJcbl0sXHJcbi8vICMweDBkOCBcclxuWyBcclxuXCIwMDEwMDAwMFwiLFxyXG5cIjAwMTExMTEwXCIsXHJcblwiMDEwMDEwMDBcIixcclxuXCIwMDExMTEwMFwiLFxyXG5cIjAwMTAxMDAwXCIsXHJcblwiMDExMTExMTBcIixcclxuXCIwMDAwMTAwMFwiLFxyXG5cIjAwMDAwMDAwXCJcclxuXSxcclxuLy8gIzB4MGQ5IFxyXG5bIFxyXG5cIjAwMDAwMTAwXCIsXHJcblwiMDExMTExMTBcIixcclxuXCIwMTAxMDEwMFwiLFxyXG5cIjAxMTExMTExXCIsXHJcblwiMDEwMTAwMTBcIixcclxuXCIwMTExMTExMVwiLFxyXG5cIjAwMDAxMDEwXCIsXHJcblwiMDAwMDAwMDBcIlxyXG5dLFxyXG4vLyAjMHgwZGEgXHJcblsgXHJcblwiMDAwMDEwMDBcIixcclxuXCIwMDAxMDEwMFwiLFxyXG5cIjAwMTAwMDEwXCIsXHJcblwiMDExMTExMTFcIixcclxuXCIwMDAxMDAxMFwiLFxyXG5cIjAwMDEwMDEwXCIsXHJcblwiMDAxMDAxMDBcIixcclxuXCIwMDAwMDAwMFwiXHJcbl0sXHJcbi8vICMweDBkYiBcclxuWyBcclxuXCIwMDExMTAwMFwiLFxyXG5cIjAwMDEwMDEwXCIsXHJcblwiMDExMTExMTFcIixcclxuXCIwMDAxMDExMVwiLFxyXG5cIjAwMTExMDExXCIsXHJcblwiMDEwMTAwMTBcIixcclxuXCIwMDAxMDEwMFwiLFxyXG5cIjAwMDAwMDAwXCJcclxuXSxcclxuLy8gIzB4MGRjIFxyXG5bIFxyXG5cIjAxMTExMTExXCIsXHJcblwiMDEwMDEwMDFcIixcclxuXCIwMTAwMTAwMVwiLFxyXG5cIjAxMTExMTExXCIsXHJcblwiMDEwMDAwMDFcIixcclxuXCIwMTAwMDAwMVwiLFxyXG5cIjAxMDAwMDAxXCIsXHJcblwiMDAwMDAwMDBcIlxyXG5dLFxyXG4vLyAjMHgwZGQgXHJcblsgXHJcblwiMDAxMDAwMTBcIixcclxuXCIwMDAxMDEwMFwiLFxyXG5cIjAwMTExMTEwXCIsXHJcblwiMDAwMDEwMDBcIixcclxuXCIwMDExMTExMFwiLFxyXG5cIjAwMDAxMDAwXCIsXHJcblwiMDAwMDEwMDBcIixcclxuXCIwMDAwMDAwMFwiXHJcbl0sXHJcbi8vICMweDBkZSBcclxuWyBcclxuXCIwMDAwMTEwMFwiLFxyXG5cIjAwMDEwMDEwXCIsXHJcblwiMDAwMTAwMDBcIixcclxuXCIwMDExMTAwMFwiLFxyXG5cIjAwMDEwMDAwXCIsXHJcblwiMDAwMTAwMDBcIixcclxuXCIwMDExMTExMFwiLFxyXG5cIjAwMDAwMDAwXCJcclxuXSxcclxuLy8gIzB4MGRmIFxyXG5bIFxyXG5cIjAwMDAwMDAwXCIsXHJcblwiMTEwMDAwMDBcIixcclxuXCIxMTAwMTAwMFwiLFxyXG5cIjAxMDEwMTAwXCIsXHJcblwiMDEwMTAxMDBcIixcclxuXCIwMTAxMDEwMVwiLFxyXG5cIjAwMTAwMDEwXCIsXHJcblwiMDAwMDAwMDBcIlxyXG5dLFxyXG4vLyAjMHgwZTAgXHJcblsgXHJcblwiMDAwMDAwMDBcIixcclxuXCIwMDAwMDAwMFwiLFxyXG5cIjAwMDAwMDAwXCIsXHJcblwiMDAwMDAwMDBcIixcclxuXCIwMDAwMDAwMFwiLFxyXG5cIjAwMDAwMDEwXCIsXHJcblwiMTExMTExMTFcIixcclxuXCIwMDAwMDAxMFwiXHJcbl0sXHJcbi8vICMweDBlMSBcclxuWyBcclxuXCIwMDAwMDAxMFwiLFxyXG5cIjAwMDAwMDEwXCIsXHJcblwiMDAwMDAwMTBcIixcclxuXCIwMDAwMDAxMFwiLFxyXG5cIjAwMDAwMDEwXCIsXHJcblwiMDAwMDAwMTBcIixcclxuXCIwMDAwMDExMVwiLFxyXG5cIjAwMDAwMDEwXCJcclxuXSxcclxuLy8gIzB4MGUyIFxyXG5bIFxyXG5cIjAwMDAwMDEwXCIsXHJcblwiMDAwMDAwMTBcIixcclxuXCIwMDAwMDAxMFwiLFxyXG5cIjAwMDAwMDEwXCIsXHJcblwiMDAwMDAwMTBcIixcclxuXCIwMDAwMDAxMFwiLFxyXG5cIjExMTExMTExXCIsXHJcblwiMDAwMDAwMTBcIlxyXG5dLFxyXG4vLyAjMHgwZTMgXHJcblsgXHJcblwiMDAwMDAwMDBcIixcclxuXCIwMDAwMDAwMFwiLFxyXG5cIjAwMTAwMDAwXCIsXHJcblwiMDEwMTAwMDBcIixcclxuXCIxMDAwMTAwMFwiLFxyXG5cIjAwMDAwMTAxXCIsXHJcblwiMDAwMDAwMTBcIixcclxuXCIwMDAwMDAwMFwiXHJcbl0sXHJcbi8vICMweDBlNCBcclxuWyBcclxuXCIwMDAwMDAwMFwiLFxyXG5cIjAwMDAxMTEwXCIsXHJcblwiMDAwMTAwMDFcIixcclxuXCIwMDEwMDAxMFwiLFxyXG5cIjExMDAwMTAwXCIsXHJcblwiMDAwMDAxMDBcIixcclxuXCIwMDAwMDAxMFwiLFxyXG5cIjAwMDAwMDAxXCJcclxuXSxcclxuLy8gIzB4MGU1IFxyXG5bIFxyXG5cIjAwMDAwMDAwXCIsXHJcblwiMTExMTExMTFcIixcclxuXCIwMDAwMDAwMFwiLFxyXG5cIjEwMDAwMDAxXCIsXHJcblwiMDEwMDAwMTBcIixcclxuXCIwMTAwMDAxMFwiLFxyXG5cIjEwMDAwMDAxXCIsXHJcblwiMDAwMDAwMDBcIlxyXG5dLFxyXG4vLyAjMHgwZTYgXHJcblsgXHJcblwiMDAwMDAwMDBcIixcclxuXCIwMTExMDAwMFwiLFxyXG5cIjEwMDAxMDAwXCIsXHJcblwiMDEwMDAxMDBcIixcclxuXCIwMDEwMDAxMVwiLFxyXG5cIjAwMTAwMDAwXCIsXHJcblwiMDEwMDAwMDBcIixcclxuXCIxMDAwMDAwMFwiXHJcbl0sXHJcbi8vICMweDBlNyBcclxuWyBcclxuXCIwMDAwMDAwMFwiLFxyXG5cIjExMDAwMTAwXCIsXHJcblwiMTAxMDAxMDBcIixcclxuXCIxMDAxMDEwMFwiLFxyXG5cIjEwMDAxMTExXCIsXHJcblwiMTAwMTAxMDBcIixcclxuXCIxMDEwMDEwMFwiLFxyXG5cIjExMDAwMTAwXCJcclxuXSxcclxuLy8gIzB4MGU4IFxyXG5bIFxyXG5cIjAwMDAwMDAwXCIsXHJcblwiMDAxMDAwMTFcIixcclxuXCIwMDEwMDEwMVwiLFxyXG5cIjAwMTAxMDAxXCIsXHJcblwiMTExMTAwMDFcIixcclxuXCIwMDEwMTAwMVwiLFxyXG5cIjAwMTAwMTAxXCIsXHJcblwiMDAxMDAwMTFcIlxyXG5dLFxyXG4vLyAjMHgwZTkgXHJcblsgXHJcblwiMTAwMDEwMDBcIixcclxuXCIxMDAxMDAwMFwiLFxyXG5cIjEwMTAwMDAwXCIsXHJcblwiMTEwMDAwMDBcIixcclxuXCIxMTAwMDAwMFwiLFxyXG5cIjEwMTAxMDAwXCIsXHJcblwiMTAwMTEwMDBcIixcclxuXCIxMDExMTAwMFwiXHJcbl0sXHJcbi8vICMweDBlYSBcclxuWyBcclxuXCIxMDEwMTAwMFwiLFxyXG5cIjEwMTEwMDAwXCIsXHJcblwiMTAxMTEwMDBcIixcclxuXCIxMTAwMDAwMFwiLFxyXG5cIjExMDAwMDAwXCIsXHJcblwiMTAxMDAwMDBcIixcclxuXCIxMDAxMDAwMFwiLFxyXG5cIjEwMDAxMDAwXCJcclxuXSxcclxuLy8gIzB4MGViIFxyXG5bIFxyXG5cIjEwMDAwMDAwXCIsXHJcblwiMDEwMDAwMDBcIixcclxuXCIwMDEwMDAwMFwiLFxyXG5cIjAwMDEwMDAwXCIsXHJcblwiMDAwMTExMTFcIixcclxuXCIwMDEwMDAwMFwiLFxyXG5cIjAxMDAwMDAwXCIsXHJcblwiMTAwMDAwMDBcIlxyXG5dLFxyXG4vLyAjMHgwZWMgXHJcblsgXHJcblwiMDAwMDAwMDBcIixcclxuXCIwMDAwMDAwMFwiLFxyXG5cIjAwMTAwMTAwXCIsXHJcblwiMDAxMDAxMDBcIixcclxuXCIxMTEwMDExMVwiLFxyXG5cIjAwMTAwMTAwXCIsXHJcblwiMDAxMDAxMDBcIixcclxuXCIwMDAwMDAwMFwiXHJcbl0sXHJcbi8vICMweDBlZCBcclxuWyBcclxuXCIwMDAwMTAwMFwiLFxyXG5cIjAwMDAxMDAwXCIsXHJcblwiMDAxMTExMTBcIixcclxuXCIwMDAwMDAwMFwiLFxyXG5cIjAwMDAwMDAwXCIsXHJcblwiMDAxMTExMTBcIixcclxuXCIwMDAwMTAwMFwiLFxyXG5cIjAwMDAxMDAwXCJcclxuXSxcclxuLy8gIzB4MGVlIFxyXG5bIFxyXG5cIjAwMDAxMDAwXCIsXHJcblwiMDAwMTAwMDBcIixcclxuXCIwMDEwMDAwMFwiLFxyXG5cIjAwMDEwMDAwXCIsXHJcblwiMDAwMDEwMDBcIixcclxuXCIwMDAwMDEwMFwiLFxyXG5cIjAwMDAwMDEwXCIsXHJcblwiMDAwMDAxMDBcIlxyXG5dLFxyXG4vLyAjMHgwZWYgXHJcblsgXHJcblwiMDEwMTAxMDFcIixcclxuXCIxMDEwMTAxMFwiLFxyXG5cIjAxMDEwMTAxXCIsXHJcblwiMTAxMDEwMTBcIixcclxuXCIwMTAxMDEwMVwiLFxyXG5cIjEwMTAxMDEwXCIsXHJcblwiMDEwMTAxMDFcIixcclxuXCIxMDEwMTAxMFwiXHJcbl0sXHJcbi8vICMweDBmMCBcclxuWyBcclxuXCIwMDAwMDAwMFwiLFxyXG5cIjAwMDAwMDAwXCIsXHJcblwiMDAwMDAwMDBcIixcclxuXCIwMDAwMDAwMFwiLFxyXG5cIjAwMDAwMDAwXCIsXHJcblwiMDAwMDAwMDBcIixcclxuXCIwMDAwMDAwMFwiLFxyXG5cIjAwMDAwMDAwXCJcclxuXSxcclxuLy8gIzB4MGYxIFxyXG5bIFxyXG5cIjAwMDAwMDAwXCIsXHJcblwiMDExMTAwMDBcIixcclxuXCIwMTExMDAwMFwiLFxyXG5cIjAxMTEwMDAwXCIsXHJcblwiMDAwMDAwMDBcIixcclxuXCIwMDAwMDAwMFwiLFxyXG5cIjAwMDAwMDAwXCIsXHJcblwiMDAwMDAwMDBcIlxyXG5dLFxyXG4vLyAjMHgwZjIgXHJcblsgXHJcblwiMDAwMDAwMDBcIixcclxuXCIwMDAwMDExMVwiLFxyXG5cIjAwMDAwMTExXCIsXHJcblwiMDAwMDAxMTFcIixcclxuXCIwMDAwMDAwMFwiLFxyXG5cIjAwMDAwMDAwXCIsXHJcblwiMDAwMDAwMDBcIixcclxuXCIwMDAwMDAwMFwiXHJcbl0sXHJcbi8vICMweDBmMyBcclxuWyBcclxuXCIwMDAwMDAwMFwiLFxyXG5cIjAxMTEwMTExXCIsXHJcblwiMDExMTAxMTFcIixcclxuXCIwMTExMDExMVwiLFxyXG5cIjAwMDAwMDAwXCIsXHJcblwiMDAwMDAwMDBcIixcclxuXCIwMDAwMDAwMFwiLFxyXG5cIjAwMDAwMDAwXCJcclxuXSxcclxuLy8gIzB4MGY0IFxyXG5bIFxyXG5cIjAwMDAwMDAwXCIsXHJcblwiMDAwMDAwMDBcIixcclxuXCIwMDAwMDAwMFwiLFxyXG5cIjAwMDAwMDAwXCIsXHJcblwiMDAwMDAwMDBcIixcclxuXCIwMTExMDAwMFwiLFxyXG5cIjAxMTEwMDAwXCIsXHJcblwiMDExMTAwMDBcIlxyXG5dLFxyXG4vLyAjMHgwZjUgXHJcblsgXHJcblwiMDAwMDAwMDBcIixcclxuXCIwMTExMDAwMFwiLFxyXG5cIjAxMTEwMDAwXCIsXHJcblwiMDExMTAwMDBcIixcclxuXCIwMDAwMDAwMFwiLFxyXG5cIjAxMTEwMDAwXCIsXHJcblwiMDExMTAwMDBcIixcclxuXCIwMTExMDAwMFwiXHJcbl0sXHJcbi8vICMweDBmNiBcclxuWyBcclxuXCIwMDAwMDAwMFwiLFxyXG5cIjAwMDAwMTExXCIsXHJcblwiMDAwMDAxMTFcIixcclxuXCIwMDAwMDExMVwiLFxyXG5cIjAwMDAwMDAwXCIsXHJcblwiMDExMTAwMDBcIixcclxuXCIwMTExMDAwMFwiLFxyXG5cIjAxMTEwMDAwXCJcclxuXSxcclxuLy8gIzB4MGY3IFxyXG5bIFxyXG5cIjAwMDAwMDAwXCIsXHJcblwiMDExMTAxMTFcIixcclxuXCIwMTExMDExMVwiLFxyXG5cIjAxMTEwMTExXCIsXHJcblwiMDAwMDAwMDBcIixcclxuXCIwMTExMDAwMFwiLFxyXG5cIjAxMTEwMDAwXCIsXHJcblwiMDExMTAwMDBcIlxyXG5dLFxyXG4vLyAjMHgwZjggXHJcblsgXHJcblwiMDAwMDAwMDBcIixcclxuXCIwMDAwMDAwMFwiLFxyXG5cIjAwMDAwMDAwXCIsXHJcblwiMDAwMDAwMDBcIixcclxuXCIwMDAwMDAwMFwiLFxyXG5cIjAwMDAwMTExXCIsXHJcblwiMDAwMDAxMTFcIixcclxuXCIwMDAwMDExMVwiXHJcbl0sXHJcbi8vICMweDBmOSBcclxuWyBcclxuXCIwMDAwMDAwMFwiLFxyXG5cIjAxMTEwMDAwXCIsXHJcblwiMDExMTAwMDBcIixcclxuXCIwMTExMDAwMFwiLFxyXG5cIjAwMDAwMDAwXCIsXHJcblwiMDAwMDAxMTFcIixcclxuXCIwMDAwMDExMVwiLFxyXG5cIjAwMDAwMTExXCJcclxuXSxcclxuLy8gIzB4MGZhIFxyXG5bIFxyXG5cIjAwMDAwMDAwXCIsXHJcblwiMDAwMDAxMTFcIixcclxuXCIwMDAwMDExMVwiLFxyXG5cIjAwMDAwMTExXCIsXHJcblwiMDAwMDAwMDBcIixcclxuXCIwMDAwMDExMVwiLFxyXG5cIjAwMDAwMTExXCIsXHJcblwiMDAwMDAxMTFcIlxyXG5dLFxyXG4vLyAjMHgwZmIgXHJcblsgXHJcblwiMDAwMDAwMDBcIixcclxuXCIwMTExMDExMVwiLFxyXG5cIjAxMTEwMTExXCIsXHJcblwiMDExMTAxMTFcIixcclxuXCIwMDAwMDAwMFwiLFxyXG5cIjAwMDAwMTExXCIsXHJcblwiMDAwMDAxMTFcIixcclxuXCIwMDAwMDExMVwiXHJcbl0sXHJcbi8vICMweDBmYyBcclxuWyBcclxuXCIwMDAwMDAwMFwiLFxyXG5cIjAwMDAwMDAwXCIsXHJcblwiMDAwMDAwMDBcIixcclxuXCIwMDAwMDAwMFwiLFxyXG5cIjAwMDAwMDAwXCIsXHJcblwiMDExMTAxMTFcIixcclxuXCIwMTExMDExMVwiLFxyXG5cIjAxMTEwMTExXCJcclxuXSxcclxuLy8gIzB4MGZkIFxyXG5bIFxyXG5cIjAwMDAwMDAwXCIsXHJcblwiMDExMTAwMDBcIixcclxuXCIwMTExMDAwMFwiLFxyXG5cIjAxMTEwMDAwXCIsXHJcblwiMDAwMDAwMDBcIixcclxuXCIwMTExMDExMVwiLFxyXG5cIjAxMTEwMTExXCIsXHJcblwiMDExMTAxMTFcIlxyXG5dLFxyXG4vLyAjMHgwZmUgXHJcblsgXHJcblwiMDAwMDAwMDBcIixcclxuXCIwMDAwMDExMVwiLFxyXG5cIjAwMDAwMTExXCIsXHJcblwiMDAwMDAxMTFcIixcclxuXCIwMDAwMDAwMFwiLFxyXG5cIjAxMTEwMTExXCIsXHJcblwiMDExMTAxMTFcIixcclxuXCIwMTExMDExMVwiXHJcbl0sXHJcbi8vICMweDBmZiBcclxuWyBcclxuXCIwMDAwMDAwMFwiLFxyXG5cIjAxMTEwMTExXCIsXHJcblwiMDExMTAxMTFcIixcclxuXCIwMTExMDExMVwiLFxyXG5cIjAwMDAwMDAwXCIsXHJcblwiMDExMTAxMTFcIixcclxuXCIwMTExMDExMVwiLFxyXG5cIjAxMTEwMTExXCJcclxuXSxcclxuLy8gIzB4MTAwIFxyXG5bIFxyXG5cIjAwMDAwMDAwXCIsXHJcblwiMDAwMDAwMDBcIixcclxuXCIwMDAwMDAwMFwiLFxyXG5cIjAwMDAwMDAwXCIsXHJcblwiMDAwMDAwMDBcIixcclxuXCIwMDAwMDAwMFwiLFxyXG5cIjAwMDAwMDAwXCIsXHJcblwiMDAwMDAwMDBcIlxyXG5dLFxyXG4vLyAjMHgxMDEgXHJcblsgXHJcblwiMDAwMDAwMDBcIixcclxuXCIwMDAwMDAwMFwiLFxyXG5cIjAwMTExMDAwXCIsXHJcblwiMDAwMDAxMDBcIixcclxuXCIwMDExMTEwMFwiLFxyXG5cIjAxMDAwMTAwXCIsXHJcblwiMDAxMTEwMTBcIixcclxuXCIwMDAwMDAwMFwiXHJcbl0sXHJcbi8vICMweDEwMiBcclxuWyBcclxuXCIwMTAwMDAwMFwiLFxyXG5cIjAxMDAwMDAwXCIsXHJcblwiMDEwMTExMDBcIixcclxuXCIwMTEwMDAxMFwiLFxyXG5cIjAxMDAwMDEwXCIsXHJcblwiMDExMDAwMTBcIixcclxuXCIwMTAxMTEwMFwiLFxyXG5cIjAwMDAwMDAwXCJcclxuXSxcclxuLy8gIzB4MTAzIFxyXG5bIFxyXG5cIjAwMDAwMDAwXCIsXHJcblwiMDAwMDAwMDBcIixcclxuXCIwMDExMTEwMFwiLFxyXG5cIjAxMDAwMDEwXCIsXHJcblwiMDEwMDAwMDBcIixcclxuXCIwMTAwMDAxMFwiLFxyXG5cIjAwMTExMTAwXCIsXHJcblwiMDAwMDAwMDBcIlxyXG5dLFxyXG4vLyAjMHgxMDQgXHJcblsgXHJcblwiMDAwMDAwMTBcIixcclxuXCIwMDAwMDAxMFwiLFxyXG5cIjAwMTExMDEwXCIsXHJcblwiMDEwMDAxMTBcIixcclxuXCIwMTAwMDAxMFwiLFxyXG5cIjAxMDAwMTEwXCIsXHJcblwiMDAxMTEwMTBcIixcclxuXCIwMDAwMDAwMFwiXHJcbl0sXHJcbi8vICMweDEwNSBcclxuWyBcclxuXCIwMDAwMDAwMFwiLFxyXG5cIjAwMDAwMDAwXCIsXHJcblwiMDAxMTExMDBcIixcclxuXCIwMTAwMDAxMFwiLFxyXG5cIjAxMTExMTEwXCIsXHJcblwiMDEwMDAwMDBcIixcclxuXCIwMDExMTEwMFwiLFxyXG5cIjAwMDAwMDAwXCJcclxuXSxcclxuLy8gIzB4MTA2IFxyXG5bIFxyXG5cIjAwMDAxMTAwXCIsXHJcblwiMDAwMTAwMTBcIixcclxuXCIwMDAxMDAwMFwiLFxyXG5cIjAxMTExMTAwXCIsXHJcblwiMDAwMTAwMDBcIixcclxuXCIwMDAxMDAwMFwiLFxyXG5cIjAwMDEwMDAwXCIsXHJcblwiMDAwMDAwMDBcIlxyXG5dLFxyXG4vLyAjMHgxMDcgXHJcblsgXHJcblwiMDAwMDAwMDBcIixcclxuXCIwMDAwMDAwMFwiLFxyXG5cIjAwMTExMDEwXCIsXHJcblwiMDEwMDAxMTBcIixcclxuXCIwMTAwMDExMFwiLFxyXG5cIjAwMTExMDEwXCIsXHJcblwiMDAwMDAwMTBcIixcclxuXCIwMDExMTEwMFwiXHJcbl0sXHJcbi8vICMweDEwOCBcclxuWyBcclxuXCIwMTAwMDAwMFwiLFxyXG5cIjAxMDAwMDAwXCIsXHJcblwiMDEwMTExMDBcIixcclxuXCIwMTEwMDAxMFwiLFxyXG5cIjAxMDAwMDEwXCIsXHJcblwiMDEwMDAwMTBcIixcclxuXCIwMTAwMDAxMFwiLFxyXG5cIjAwMDAwMDAwXCJcclxuXSxcclxuLy8gIzB4MTA5IFxyXG5bIFxyXG5cIjAwMDAxMDAwXCIsXHJcblwiMDAwMDAwMDBcIixcclxuXCIwMDAxMTAwMFwiLFxyXG5cIjAwMDAxMDAwXCIsXHJcblwiMDAwMDEwMDBcIixcclxuXCIwMDAwMTAwMFwiLFxyXG5cIjAwMDExMTAwXCIsXHJcblwiMDAwMDAwMDBcIlxyXG5dLFxyXG4vLyAjMHgxMGEgXHJcblsgXHJcblwiMDAwMDAxMDBcIixcclxuXCIwMDAwMDAwMFwiLFxyXG5cIjAwMDAxMTAwXCIsXHJcblwiMDAwMDAxMDBcIixcclxuXCIwMDAwMDEwMFwiLFxyXG5cIjAwMDAwMTAwXCIsXHJcblwiMDEwMDAxMDBcIixcclxuXCIwMDExMTAwMFwiXHJcbl0sXHJcbi8vICMweDEwYiBcclxuWyBcclxuXCIwMTAwMDAwMFwiLFxyXG5cIjAxMDAwMDAwXCIsXHJcblwiMDEwMDAxMDBcIixcclxuXCIwMTAwMTAwMFwiLFxyXG5cIjAxMDEwMDAwXCIsXHJcblwiMDExMDEwMDBcIixcclxuXCIwMTAwMDEwMFwiLFxyXG5cIjAwMDAwMDAwXCJcclxuXSxcclxuLy8gIzB4MTBjIFxyXG5bIFxyXG5cIjAwMDExMDAwXCIsXHJcblwiMDAwMDEwMDBcIixcclxuXCIwMDAwMTAwMFwiLFxyXG5cIjAwMDAxMDAwXCIsXHJcblwiMDAwMDEwMDBcIixcclxuXCIwMDAwMTAwMFwiLFxyXG5cIjAwMDExMTAwXCIsXHJcblwiMDAwMDAwMDBcIlxyXG5dLFxyXG4vLyAjMHgxMGQgXHJcblsgXHJcblwiMDAwMDAwMDBcIixcclxuXCIwMDAwMDAwMFwiLFxyXG5cIjAxMTEwMTEwXCIsXHJcblwiMDEwMDEwMDFcIixcclxuXCIwMTAwMTAwMVwiLFxyXG5cIjAxMDAxMDAxXCIsXHJcblwiMDEwMDEwMDFcIixcclxuXCIwMDAwMDAwMFwiXHJcbl0sXHJcbi8vICMweDEwZSBcclxuWyBcclxuXCIwMDAwMDAwMFwiLFxyXG5cIjAwMDAwMDAwXCIsXHJcblwiMDEwMTExMDBcIixcclxuXCIwMTEwMDAxMFwiLFxyXG5cIjAxMDAwMDEwXCIsXHJcblwiMDEwMDAwMTBcIixcclxuXCIwMTAwMDAxMFwiLFxyXG5cIjAwMDAwMDAwXCJcclxuXSxcclxuLy8gIzB4MTBmIFxyXG5bIFxyXG5cIjAwMDAwMDAwXCIsXHJcblwiMDAwMDAwMDBcIixcclxuXCIwMDExMTEwMFwiLFxyXG5cIjAxMDAwMDEwXCIsXHJcblwiMDEwMDAwMTBcIixcclxuXCIwMTAwMDAxMFwiLFxyXG5cIjAwMTExMTAwXCIsXHJcblwiMDAwMDAwMDBcIlxyXG5dLFxyXG4vLyAjMHgxMTAgXHJcblsgXHJcblwiMDAwMDAwMDBcIixcclxuXCIwMDAwMDAwMFwiLFxyXG5cIjAxMDExMTAwXCIsXHJcblwiMDExMDAwMTBcIixcclxuXCIwMTEwMDAxMFwiLFxyXG5cIjAxMDExMTAwXCIsXHJcblwiMDEwMDAwMDBcIixcclxuXCIwMTAwMDAwMFwiXHJcbl0sXHJcbi8vICMweDExMSBcclxuWyBcclxuXCIwMDAwMDAwMFwiLFxyXG5cIjAwMDAwMDAwXCIsXHJcblwiMDAxMTEwMTBcIixcclxuXCIwMTAwMDExMFwiLFxyXG5cIjAxMDAwMTEwXCIsXHJcblwiMDAxMTEwMTBcIixcclxuXCIwMDAwMDAxMFwiLFxyXG5cIjAwMDAwMDEwXCJcclxuXSxcclxuLy8gIzB4MTEyIFxyXG5bIFxyXG5cIjAwMDAwMDAwXCIsXHJcblwiMDAwMDAwMDBcIixcclxuXCIwMTAxMTEwMFwiLFxyXG5cIjAxMTAwMDEwXCIsXHJcblwiMDEwMDAwMDBcIixcclxuXCIwMTAwMDAwMFwiLFxyXG5cIjAxMDAwMDAwXCIsXHJcblwiMDAwMDAwMDBcIlxyXG5dLFxyXG4vLyAjMHgxMTMgXHJcblsgXHJcblwiMDAwMDAwMDBcIixcclxuXCIwMDAwMDAwMFwiLFxyXG5cIjAwMTExMTEwXCIsXHJcblwiMDEwMDAwMDBcIixcclxuXCIwMDExMTEwMFwiLFxyXG5cIjAwMDAwMDEwXCIsXHJcblwiMDExMTExMDBcIixcclxuXCIwMDAwMDAwMFwiXHJcbl0sXHJcbi8vICMweDExNCBcclxuWyBcclxuXCIwMDAxMDAwMFwiLFxyXG5cIjAwMDEwMDAwXCIsXHJcblwiMDExMTExMDBcIixcclxuXCIwMDAxMDAwMFwiLFxyXG5cIjAwMDEwMDAwXCIsXHJcblwiMDAwMTAwMTBcIixcclxuXCIwMDAwMTEwMFwiLFxyXG5cIjAwMDAwMDAwXCJcclxuXSxcclxuLy8gIzB4MTE1IFxyXG5bIFxyXG5cIjAwMDAwMDAwXCIsXHJcblwiMDAwMDAwMDBcIixcclxuXCIwMTAwMDAxMFwiLFxyXG5cIjAxMDAwMDEwXCIsXHJcblwiMDEwMDAwMTBcIixcclxuXCIwMTAwMDAxMFwiLFxyXG5cIjAwMTExMTAwXCIsXHJcblwiMDAwMDAwMDBcIlxyXG5dLFxyXG4vLyAjMHgxMTYgXHJcblsgXHJcblwiMDAwMDAwMDBcIixcclxuXCIwMDAwMDAwMFwiLFxyXG5cIjAxMDAwMDEwXCIsXHJcblwiMDEwMDAwMTBcIixcclxuXCIwMTAwMDAxMFwiLFxyXG5cIjAwMTAwMTAwXCIsXHJcblwiMDAwMTEwMDBcIixcclxuXCIwMDAwMDAwMFwiXHJcbl0sXHJcbi8vICMweDExNyBcclxuWyBcclxuXCIwMDAwMDAwMFwiLFxyXG5cIjAwMDAwMDAwXCIsXHJcblwiMDEwMDAwMDFcIixcclxuXCIwMTAwMTAwMVwiLFxyXG5cIjAxMDAxMDAxXCIsXHJcblwiMDEwMDEwMDFcIixcclxuXCIwMDExMDExMFwiLFxyXG5cIjAwMDAwMDAwXCJcclxuXSxcclxuLy8gIzB4MTE4IFxyXG5bIFxyXG5cIjAwMDAwMDAwXCIsXHJcblwiMDAwMDAwMDBcIixcclxuXCIwMTAwMDEwMFwiLFxyXG5cIjAwMTAxMDAwXCIsXHJcblwiMDAwMTAwMDBcIixcclxuXCIwMDEwMTAwMFwiLFxyXG5cIjAxMDAwMTAwXCIsXHJcblwiMDAwMDAwMDBcIlxyXG5dLFxyXG4vLyAjMHgxMTkgXHJcblsgXHJcblwiMDAwMDAwMDBcIixcclxuXCIwMDAwMDAwMFwiLFxyXG5cIjAxMDAwMDEwXCIsXHJcblwiMDEwMDAwMTBcIixcclxuXCIwMTAwMDExMFwiLFxyXG5cIjAwMTExMDEwXCIsXHJcblwiMDAwMDAwMTBcIixcclxuXCIwMDExMTEwMFwiXHJcbl0sXHJcbi8vICMweDExYSBcclxuWyBcclxuXCIwMDAwMDAwMFwiLFxyXG5cIjAwMDAwMDAwXCIsXHJcblwiMDExMTExMTBcIixcclxuXCIwMDAwMDEwMFwiLFxyXG5cIjAwMDExMDAwXCIsXHJcblwiMDAxMDAwMDBcIixcclxuXCIwMTExMTExMFwiLFxyXG5cIjAwMDAwMDAwXCJcclxuXSxcclxuLy8gIzB4MTFiIFxyXG5bIFxyXG5cIjAwMDAxMDAwXCIsXHJcblwiMDAwMDEwMDBcIixcclxuXCIwMDAwMTAwMFwiLFxyXG5cIjAwMDAxMDAwXCIsXHJcblwiMTExMTExMTFcIixcclxuXCIwMDAwMTAwMFwiLFxyXG5cIjAwMDAxMDAwXCIsXHJcblwiMDAwMDEwMDBcIlxyXG5dLFxyXG4vLyAjMHgxMWMgXHJcblsgXHJcblwiMDAwMDEwMDBcIixcclxuXCIwMDAwMTAwMFwiLFxyXG5cIjAwMDAxMDAwXCIsXHJcblwiMDAwMDEwMDBcIixcclxuXCIwMDAwMTExMVwiLFxyXG5cIjAwMDAwMDAwXCIsXHJcblwiMDAwMDAwMDBcIixcclxuXCIwMDAwMDAwMFwiXHJcbl0sXHJcbi8vICMweDExZCBcclxuWyBcclxuXCIwMDAwMTAwMFwiLFxyXG5cIjAwMDAxMDAwXCIsXHJcblwiMDAwMDEwMDBcIixcclxuXCIwMDAwMTAwMFwiLFxyXG5cIjExMTExMDAwXCIsXHJcblwiMDAwMDAwMDBcIixcclxuXCIwMDAwMDAwMFwiLFxyXG5cIjAwMDAwMDAwXCJcclxuXSxcclxuLy8gIzB4MTFlIFxyXG5bIFxyXG5cIjAwMDAxMDAwXCIsXHJcblwiMDAwMDEwMDBcIixcclxuXCIwMDAwMTAwMFwiLFxyXG5cIjAwMDAxMDAwXCIsXHJcblwiMDAwMDExMTFcIixcclxuXCIwMDAwMTAwMFwiLFxyXG5cIjAwMDAxMDAwXCIsXHJcblwiMDAwMDEwMDBcIlxyXG5dLFxyXG4vLyAjMHgxMWYgXHJcblsgXHJcblwiMDAwMDEwMDBcIixcclxuXCIwMDAwMTAwMFwiLFxyXG5cIjAwMDAxMDAwXCIsXHJcblwiMDAwMDEwMDBcIixcclxuXCIxMTExMTExMVwiLFxyXG5cIjAwMDAwMDAwXCIsXHJcblwiMDAwMDAwMDBcIixcclxuXCIwMDAwMDAwMFwiXHJcbl0sXHJcbi8vICMweDEyMCBcclxuWyBcclxuXCIwMDExMTEwMFwiLFxyXG5cIjAxMDAwMDEwXCIsXHJcblwiMDEwMDAxMTBcIixcclxuXCIwMTAxMTAxMFwiLFxyXG5cIjAxMTAwMDEwXCIsXHJcblwiMDEwMDAwMTBcIixcclxuXCIwMDExMTEwMFwiLFxyXG5cIjAwMDAwMDAwXCJcclxuXSxcclxuLy8gIzB4MTIxIFxyXG5bIFxyXG5cIjAwMDAxMDAwXCIsXHJcblwiMDAwMTEwMDBcIixcclxuXCIwMDEwMTAwMFwiLFxyXG5cIjAwMDAxMDAwXCIsXHJcblwiMDAwMDEwMDBcIixcclxuXCIwMDAwMTAwMFwiLFxyXG5cIjAwMTExMTEwXCIsXHJcblwiMDAwMDAwMDBcIlxyXG5dLFxyXG4vLyAjMHgxMjIgXHJcblsgXHJcblwiMDAxMTExMDBcIixcclxuXCIwMTAwMDAxMFwiLFxyXG5cIjAwMDAwMDEwXCIsXHJcblwiMDAwMDExMDBcIixcclxuXCIwMDExMDAwMFwiLFxyXG5cIjAxMDAwMDAwXCIsXHJcblwiMDExMTExMTBcIixcclxuXCIwMDAwMDAwMFwiXHJcbl0sXHJcbi8vICMweDEyMyBcclxuWyBcclxuXCIwMDExMTEwMFwiLFxyXG5cIjAxMDAwMDEwXCIsXHJcblwiMDAwMDAwMTBcIixcclxuXCIwMDExMTEwMFwiLFxyXG5cIjAwMDAwMDEwXCIsXHJcblwiMDEwMDAwMTBcIixcclxuXCIwMDExMTEwMFwiLFxyXG5cIjAwMDAwMDAwXCJcclxuXSxcclxuLy8gIzB4MTI0IFxyXG5bIFxyXG5cIjAwMDAwMTAwXCIsXHJcblwiMDAwMDExMDBcIixcclxuXCIwMDAxMDEwMFwiLFxyXG5cIjAwMTAwMTAwXCIsXHJcblwiMDExMTExMTBcIixcclxuXCIwMDAwMDEwMFwiLFxyXG5cIjAwMDAwMTAwXCIsXHJcblwiMDAwMDAwMDBcIlxyXG5dLFxyXG4vLyAjMHgxMjUgXHJcblsgXHJcblwiMDExMTExMTBcIixcclxuXCIwMTAwMDAwMFwiLFxyXG5cIjAxMTExMDAwXCIsXHJcblwiMDAwMDAxMDBcIixcclxuXCIwMDAwMDAxMFwiLFxyXG5cIjAxMDAwMTAwXCIsXHJcblwiMDAxMTEwMDBcIixcclxuXCIwMDAwMDAwMFwiXHJcbl0sXHJcbi8vICMweDEyNiBcclxuWyBcclxuXCIwMDAxMTEwMFwiLFxyXG5cIjAwMTAwMDAwXCIsXHJcblwiMDEwMDAwMDBcIixcclxuXCIwMTExMTEwMFwiLFxyXG5cIjAxMDAwMDEwXCIsXHJcblwiMDEwMDAwMTBcIixcclxuXCIwMDExMTEwMFwiLFxyXG5cIjAwMDAwMDAwXCJcclxuXSxcclxuLy8gIzB4MTI3IFxyXG5bIFxyXG5cIjAxMTExMTEwXCIsXHJcblwiMDEwMDAwMTBcIixcclxuXCIwMDAwMDEwMFwiLFxyXG5cIjAwMDAxMDAwXCIsXHJcblwiMDAwMTAwMDBcIixcclxuXCIwMDAxMDAwMFwiLFxyXG5cIjAwMDEwMDAwXCIsXHJcblwiMDAwMDAwMDBcIlxyXG5dLFxyXG4vLyAjMHgxMjggXHJcblsgXHJcblwiMDAxMTExMDBcIixcclxuXCIwMTAwMDAxMFwiLFxyXG5cIjAxMDAwMDEwXCIsXHJcblwiMDAxMTExMDBcIixcclxuXCIwMTAwMDAxMFwiLFxyXG5cIjAxMDAwMDEwXCIsXHJcblwiMDAxMTExMDBcIixcclxuXCIwMDAwMDAwMFwiXHJcbl0sXHJcbi8vICMweDEyOSBcclxuWyBcclxuXCIwMDExMTEwMFwiLFxyXG5cIjAxMDAwMDEwXCIsXHJcblwiMDEwMDAwMTBcIixcclxuXCIwMDExMTExMFwiLFxyXG5cIjAwMDAwMDEwXCIsXHJcblwiMDAwMDAxMDBcIixcclxuXCIwMDExMTAwMFwiLFxyXG5cIjAwMDAwMDAwXCJcclxuXSxcclxuLy8gIzB4MTJhIFxyXG5bIFxyXG5cIjAwMDAwMDAwXCIsXHJcblwiMDAwMDAwMDBcIixcclxuXCIwMDAwMDAwMFwiLFxyXG5cIjAxMTExMTEwXCIsXHJcblwiMDAwMDAwMDBcIixcclxuXCIwMDAwMDAwMFwiLFxyXG5cIjAwMDAwMDAwXCIsXHJcblwiMDAwMDAwMDBcIlxyXG5dLFxyXG4vLyAjMHgxMmIgXHJcblsgXHJcblwiMDAwMDAwMDBcIixcclxuXCIwMDAwMDAwMFwiLFxyXG5cIjAxMTExMTEwXCIsXHJcblwiMDAwMDAwMDBcIixcclxuXCIwMTExMTExMFwiLFxyXG5cIjAwMDAwMDAwXCIsXHJcblwiMDAwMDAwMDBcIixcclxuXCIwMDAwMDAwMFwiXHJcbl0sXHJcbi8vICMweDEyYyBcclxuWyBcclxuXCIwMDAwMDAwMFwiLFxyXG5cIjAwMDAwMDAwXCIsXHJcblwiMDAwMDEwMDBcIixcclxuXCIwMDAwMDAwMFwiLFxyXG5cIjAwMDAwMDAwXCIsXHJcblwiMDAwMDEwMDBcIixcclxuXCIwMDAwMTAwMFwiLFxyXG5cIjAwMDEwMDAwXCJcclxuXSxcclxuLy8gIzB4MTJkIFxyXG5bIFxyXG5cIjAwMDAwMDAwXCIsXHJcblwiMDAwMDAwMTBcIixcclxuXCIwMDAwMDEwMFwiLFxyXG5cIjAwMDAxMDAwXCIsXHJcblwiMDAwMTAwMDBcIixcclxuXCIwMDEwMDAwMFwiLFxyXG5cIjAxMDAwMDAwXCIsXHJcblwiMDAwMDAwMDBcIlxyXG5dLFxyXG4vLyAjMHgxMmUgXHJcblsgXHJcblwiMDAwMDAwMDBcIixcclxuXCIwMDAwMDAwMFwiLFxyXG5cIjAwMDAwMDAwXCIsXHJcblwiMDAwMDAwMDBcIixcclxuXCIwMDAwMDAwMFwiLFxyXG5cIjAwMDExMDAwXCIsXHJcblwiMDAwMTEwMDBcIixcclxuXCIwMDAwMDAwMFwiXHJcbl0sXHJcbi8vICMweDEyZiBcclxuWyBcclxuXCIwMDAwMDAwMFwiLFxyXG5cIjAwMDAwMDAwXCIsXHJcblwiMDAwMDAwMDBcIixcclxuXCIwMDAwMDAwMFwiLFxyXG5cIjAwMDAwMDAwXCIsXHJcblwiMDAwMDEwMDBcIixcclxuXCIwMDAwMTAwMFwiLFxyXG5cIjAwMDEwMDAwXCJcclxuXSxcclxuLy8gIzB4MTMwIFxyXG5bIFxyXG5cIjAwMDAwMDAwXCIsXHJcblwiMTExMTExMTFcIixcclxuXCIwMDAwMDAwMFwiLFxyXG5cIjAwMDAwMDAwXCIsXHJcblwiMDAwMDAwMDBcIixcclxuXCIwMDAwMDAwMFwiLFxyXG5cIjAwMDAwMDAwXCIsXHJcblwiMDAwMDAwMDBcIlxyXG5dLFxyXG4vLyAjMHgxMzEgXHJcblsgXHJcblwiMDEwMDAwMDBcIixcclxuXCIwMTAwMDAwMFwiLFxyXG5cIjAxMDAwMDAwXCIsXHJcblwiMDEwMDAwMDBcIixcclxuXCIwMTAwMDAwMFwiLFxyXG5cIjAxMDAwMDAwXCIsXHJcblwiMDEwMDAwMDBcIixcclxuXCIwMTAwMDAwMFwiXHJcbl0sXHJcbi8vICMweDEzMiBcclxuWyBcclxuXCIxMDAwMDAwMFwiLFxyXG5cIjEwMDAwMDAwXCIsXHJcblwiMTAwMDAwMDBcIixcclxuXCIxMDAwMDAwMFwiLFxyXG5cIjEwMDAwMDAwXCIsXHJcblwiMTAwMDAwMDBcIixcclxuXCIxMDAwMDAwMFwiLFxyXG5cIjExMTExMTExXCJcclxuXSxcclxuLy8gIzB4MTMzIFxyXG5bIFxyXG5cIjAwMDAwMDAxXCIsXHJcblwiMDAwMDAwMDFcIixcclxuXCIwMDAwMDAwMVwiLFxyXG5cIjAwMDAwMDAxXCIsXHJcblwiMDAwMDAwMDFcIixcclxuXCIwMDAwMDAwMVwiLFxyXG5cIjAwMDAwMDAxXCIsXHJcblwiMTExMTExMTFcIlxyXG5dLFxyXG4vLyAjMHgxMzQgXHJcblsgXHJcblwiMDAwMDAwMDBcIixcclxuXCIwMDAwMDAwMFwiLFxyXG5cIjAwMDAwMDAwXCIsXHJcblwiMTExMTExMTFcIixcclxuXCIwMDAwMDAwMFwiLFxyXG5cIjAwMDAwMDAwXCIsXHJcblwiMDAwMDAwMDBcIixcclxuXCIwMDAwMDAwMFwiXHJcbl0sXHJcbi8vICMweDEzNSBcclxuWyBcclxuXCIwMDAxMDAwMFwiLFxyXG5cIjAwMDEwMDAwXCIsXHJcblwiMDAwMTAwMDBcIixcclxuXCIwMDAxMDAwMFwiLFxyXG5cIjAwMDEwMDAwXCIsXHJcblwiMDAwMTAwMDBcIixcclxuXCIwMDAxMDAwMFwiLFxyXG5cIjAwMDEwMDAwXCJcclxuXSxcclxuLy8gIzB4MTM2IFxyXG5bIFxyXG5cIjExMTExMTExXCIsXHJcblwiMTExMTExMTFcIixcclxuXCIwMDAwMDAwMFwiLFxyXG5cIjAwMDAwMDAwXCIsXHJcblwiMDAwMDAwMDBcIixcclxuXCIwMDAwMDAwMFwiLFxyXG5cIjAwMDAwMDAwXCIsXHJcblwiMDAwMDAwMDBcIlxyXG5dLFxyXG4vLyAjMHgxMzcgXHJcblsgXHJcblwiMTEwMDAwMDBcIixcclxuXCIxMTAwMDAwMFwiLFxyXG5cIjExMDAwMDAwXCIsXHJcblwiMTEwMDAwMDBcIixcclxuXCIxMTAwMDAwMFwiLFxyXG5cIjExMDAwMDAwXCIsXHJcblwiMTEwMDAwMDBcIixcclxuXCIxMTAwMDAwMFwiXHJcbl0sXHJcbi8vICMweDEzOCBcclxuWyBcclxuXCIwMDAwMDAwMFwiLFxyXG5cIjAwMDAwMDAwXCIsXHJcblwiMDAwMDAwMDBcIixcclxuXCIwMDAwMDAwMFwiLFxyXG5cIjAwMDAwMDAwXCIsXHJcblwiMTExMTExMTFcIixcclxuXCIwMDAwMDAwMFwiLFxyXG5cIjAwMDAwMDAwXCJcclxuXSxcclxuLy8gIzB4MTM5IFxyXG5bIFxyXG5cIjAwMDAwMTAwXCIsXHJcblwiMDAwMDAxMDBcIixcclxuXCIwMDAwMDEwMFwiLFxyXG5cIjAwMDAwMTAwXCIsXHJcblwiMDAwMDAxMDBcIixcclxuXCIwMDAwMDEwMFwiLFxyXG5cIjAwMDAwMTAwXCIsXHJcblwiMDAwMDAxMDBcIlxyXG5dLFxyXG4vLyAjMHgxM2EgXHJcblsgXHJcblwiMDAwMDAwMDBcIixcclxuXCIwMDAwMDAwMFwiLFxyXG5cIjAwMDAwMDAwXCIsXHJcblwiMDAwMDAwMDBcIixcclxuXCIxMTExMTExMVwiLFxyXG5cIjExMTExMTExXCIsXHJcblwiMTExMTExMTFcIixcclxuXCIxMTExMTExMVwiXHJcbl0sXHJcbi8vICMweDEzYiBcclxuWyBcclxuXCIwMDAwMTExMVwiLFxyXG5cIjAwMDAxMTExXCIsXHJcblwiMDAwMDExMTFcIixcclxuXCIwMDAwMTExMVwiLFxyXG5cIjAwMDAxMTExXCIsXHJcblwiMDAwMDExMTFcIixcclxuXCIwMDAwMTExMVwiLFxyXG5cIjAwMDAxMTExXCJcclxuXSxcclxuLy8gIzB4MTNjIFxyXG5bIFxyXG5cIjAwMDAwMDAwXCIsXHJcblwiMDAwMDAwMDBcIixcclxuXCIwMDAwMDAwMFwiLFxyXG5cIjAwMDAwMDAwXCIsXHJcblwiMDAwMDAwMDBcIixcclxuXCIwMDAwMDAwMFwiLFxyXG5cIjAwMDAwMDAwXCIsXHJcblwiMTExMTExMTFcIlxyXG5dLFxyXG4vLyAjMHgxM2QgXHJcblsgXHJcblwiMDAwMDAwMDFcIixcclxuXCIwMDAwMDAwMVwiLFxyXG5cIjAwMDAwMDAxXCIsXHJcblwiMDAwMDAwMDFcIixcclxuXCIwMDAwMDAwMVwiLFxyXG5cIjAwMDAwMDAxXCIsXHJcblwiMDAwMDAwMDFcIixcclxuXCIwMDAwMDAwMVwiXHJcbl0sXHJcbi8vICMweDEzZSBcclxuWyBcclxuXCIwMDAwMDAwMFwiLFxyXG5cIjAwMDAwMDAwXCIsXHJcblwiMDAwMDAwMDBcIixcclxuXCIwMDAwMDAwMFwiLFxyXG5cIjAwMDAwMDAwXCIsXHJcblwiMDAwMDAwMDBcIixcclxuXCIxMTExMTExMVwiLFxyXG5cIjExMTExMTExXCJcclxuXSxcclxuLy8gIzB4MTNmIFxyXG5bIFxyXG5cIjAwMDAwMDExXCIsXHJcblwiMDAwMDAwMTFcIixcclxuXCIwMDAwMDAxMVwiLFxyXG5cIjAwMDAwMDExXCIsXHJcblwiMDAwMDAwMTFcIixcclxuXCIwMDAwMDAxMVwiLFxyXG5cIjAwMDAwMDExXCIsXHJcblwiMDAwMDAwMTFcIlxyXG5dLFxyXG4vLyAjMHgxNDAgXHJcblsgXHJcblwiMDAwMDAwMDBcIixcclxuXCIwMDAwMDAwMFwiLFxyXG5cIjAwMDAxMDAwXCIsXHJcblwiMDAwMDAxMDBcIixcclxuXCIxMTExMTExMFwiLFxyXG5cIjAwMDAwMTAwXCIsXHJcblwiMDAwMDEwMDBcIixcclxuXCIwMDAwMDAwMFwiXHJcbl0sXHJcbi8vICMweDE0MSBcclxuWyBcclxuXCIwMDAwMTAwMFwiLFxyXG5cIjAwMDExMTAwXCIsXHJcblwiMDAxMTExMTBcIixcclxuXCIwMTExMTExMVwiLFxyXG5cIjAxMTExMTExXCIsXHJcblwiMDAwMTExMDBcIixcclxuXCIwMDExMTExMFwiLFxyXG5cIjAwMDAwMDAwXCJcclxuXSxcclxuLy8gIzB4MTQyIFxyXG5bIFxyXG5cIjExMTExMTExXCIsXHJcblwiMDExMTExMTFcIixcclxuXCIwMDExMTExMVwiLFxyXG5cIjAwMDExMTExXCIsXHJcblwiMDAwMDExMTFcIixcclxuXCIwMDAwMDExMVwiLFxyXG5cIjAwMDAwMDExXCIsXHJcblwiMDAwMDAwMDFcIlxyXG5dLFxyXG4vLyAjMHgxNDMgXHJcblsgXHJcblwiMTExMTExMTFcIixcclxuXCIxMTExMTExMVwiLFxyXG5cIjExMTExMTExXCIsXHJcblwiMTExMTExMTFcIixcclxuXCIxMTExMTExMVwiLFxyXG5cIjExMTExMTExXCIsXHJcblwiMTExMTExMTFcIixcclxuXCIxMTExMTExMVwiXHJcbl0sXHJcbi8vICMweDE0NCBcclxuWyBcclxuXCIwMDAwMTAwMFwiLFxyXG5cIjAwMDExMTAwXCIsXHJcblwiMDAxMTExMTBcIixcclxuXCIwMTExMTExMVwiLFxyXG5cIjAwMTExMTEwXCIsXHJcblwiMDAwMTExMDBcIixcclxuXCIwMDAwMTAwMFwiLFxyXG5cIjAwMDAwMDAwXCJcclxuXSxcclxuLy8gIzB4MTQ1IFxyXG5bIFxyXG5cIjAwMDAwMDAwXCIsXHJcblwiMDAwMDAwMDBcIixcclxuXCIwMDAxMDAwMFwiLFxyXG5cIjAwMTAwMDAwXCIsXHJcblwiMDExMTExMTFcIixcclxuXCIwMDEwMDAwMFwiLFxyXG5cIjAwMDEwMDAwXCIsXHJcblwiMDAwMDAwMDBcIlxyXG5dLFxyXG4vLyAjMHgxNDYgXHJcblsgXHJcblwiMDAwMDEwMDBcIixcclxuXCIwMDAxMTEwMFwiLFxyXG5cIjAwMTAxMDEwXCIsXHJcblwiMDExMTExMTFcIixcclxuXCIwMDEwMTAxMFwiLFxyXG5cIjAwMDAxMDAwXCIsXHJcblwiMDAwMDEwMDBcIixcclxuXCIwMDAwMDAwMFwiXHJcbl0sXHJcbi8vICMweDE0NyBcclxuWyBcclxuXCIwMDAwMDAwMFwiLFxyXG5cIjAwMTExMTAwXCIsXHJcblwiMDExMTExMTBcIixcclxuXCIwMTExMTExMFwiLFxyXG5cIjAxMTExMTEwXCIsXHJcblwiMDExMTExMTBcIixcclxuXCIwMDExMTEwMFwiLFxyXG5cIjAwMDAwMDAwXCJcclxuXSxcclxuLy8gIzB4MTQ4IFxyXG5bIFxyXG5cIjAwMDAwMDAwXCIsXHJcblwiMDAxMTExMDBcIixcclxuXCIwMTAwMDAxMFwiLFxyXG5cIjAxMDAwMDEwXCIsXHJcblwiMDEwMDAwMTBcIixcclxuXCIwMTAwMDAxMFwiLFxyXG5cIjAwMTExMTAwXCIsXHJcblwiMDAwMDAwMDBcIlxyXG5dLFxyXG4vLyAjMHgxNDkgXHJcblsgXHJcblwiMDAxMTExMDBcIixcclxuXCIwMTAwMDAxMFwiLFxyXG5cIjAwMDAwMDEwXCIsXHJcblwiMDAwMDExMDBcIixcclxuXCIwMDAxMDAwMFwiLFxyXG5cIjAwMDAwMDAwXCIsXHJcblwiMDAwMTAwMDBcIixcclxuXCIwMDAwMDAwMFwiXHJcbl0sXHJcbi8vICMweDE0YSBcclxuWyBcclxuXCIxMTExMTExMVwiLFxyXG5cIjExMDAwMDExXCIsXHJcblwiMTAwMDAwMDFcIixcclxuXCIxMDAwMDAwMVwiLFxyXG5cIjEwMDAwMDAxXCIsXHJcblwiMTAwMDAwMDFcIixcclxuXCIxMTAwMDAxMVwiLFxyXG5cIjExMTExMTExXCJcclxuXSxcclxuLy8gIzB4MTRiIFxyXG5bIFxyXG5cIjAwMDAwMDAwXCIsXHJcblwiMDAwMDAwMDBcIixcclxuXCIwMDAwMDAwMFwiLFxyXG5cIjAwMDAwMDAwXCIsXHJcblwiMDAwMDAwMTFcIixcclxuXCIwMDAwMDEwMFwiLFxyXG5cIjAwMDAxMDAwXCIsXHJcblwiMDAwMDEwMDBcIlxyXG5dLFxyXG4vLyAjMHgxNGMgXHJcblsgXHJcblwiMDAwMDAwMDBcIixcclxuXCIwMDAwMDAwMFwiLFxyXG5cIjAwMDAwMDAwXCIsXHJcblwiMDAwMDAwMDBcIixcclxuXCIxMTAwMDAwMFwiLFxyXG5cIjAwMTAwMDAwXCIsXHJcblwiMDAwMTAwMDBcIixcclxuXCIwMDAxMDAwMFwiXHJcbl0sXHJcbi8vICMweDE0ZCBcclxuWyBcclxuXCIxMDAwMDAwMFwiLFxyXG5cIjExMDAwMDAwXCIsXHJcblwiMTExMDAwMDBcIixcclxuXCIxMTExMDAwMFwiLFxyXG5cIjExMTExMDAwXCIsXHJcblwiMTExMTExMDBcIixcclxuXCIxMTExMTExMFwiLFxyXG5cIjExMTExMTExXCJcclxuXSxcclxuLy8gIzB4MTRlIFxyXG5bIFxyXG5cIjAwMDAwMDAxXCIsXHJcblwiMDAwMDAwMTFcIixcclxuXCIwMDAwMDExMVwiLFxyXG5cIjAwMDAxMTExXCIsXHJcblwiMDAwMTExMTFcIixcclxuXCIwMDExMTExMVwiLFxyXG5cIjAxMTExMTExXCIsXHJcblwiMTExMTExMTFcIlxyXG5dLFxyXG4vLyAjMHgxNGYgXHJcblsgXHJcblwiMDAwMDAwMDBcIixcclxuXCIwMDAwMDAwMFwiLFxyXG5cIjAwMDAxMDAwXCIsXHJcblwiMDAwMDAwMDBcIixcclxuXCIwMDAwMDAwMFwiLFxyXG5cIjAwMDAxMDAwXCIsXHJcblwiMDAwMDAwMDBcIixcclxuXCIwMDAwMDAwMFwiXHJcbl0sXHJcbi8vICMweDE1MCBcclxuWyBcclxuXCIwMDAwMDAwMFwiLFxyXG5cIjAwMDAxMDAwXCIsXHJcblwiMDAwMTExMDBcIixcclxuXCIwMDEwMTAxMFwiLFxyXG5cIjAwMDAxMDAwXCIsXHJcblwiMDAwMDEwMDBcIixcclxuXCIwMDAwMTAwMFwiLFxyXG5cIjAwMDAwMDAwXCJcclxuXSxcclxuLy8gIzB4MTUxIFxyXG5bIFxyXG5cIjAwMDAxMTEwXCIsXHJcblwiMDAwMTEwMDBcIixcclxuXCIwMDExMDAwMFwiLFxyXG5cIjAxMTAwMDAwXCIsXHJcblwiMDAxMTAwMDBcIixcclxuXCIwMDAxMTAwMFwiLFxyXG5cIjAwMDAxMTEwXCIsXHJcblwiMDAwMDAwMDBcIlxyXG5dLFxyXG4vLyAjMHgxNTIgXHJcblsgXHJcblwiMDAxMTExMDBcIixcclxuXCIwMDEwMDAwMFwiLFxyXG5cIjAwMTAwMDAwXCIsXHJcblwiMDAxMDAwMDBcIixcclxuXCIwMDEwMDAwMFwiLFxyXG5cIjAwMTAwMDAwXCIsXHJcblwiMDAxMTExMDBcIixcclxuXCIwMDAwMDAwMFwiXHJcbl0sXHJcbi8vICMweDE1MyBcclxuWyBcclxuXCIwMDExMDExMFwiLFxyXG5cIjAxMTExMTExXCIsXHJcblwiMDExMTExMTFcIixcclxuXCIwMTExMTExMVwiLFxyXG5cIjAwMTExMTEwXCIsXHJcblwiMDAwMTExMDBcIixcclxuXCIwMDAwMTAwMFwiLFxyXG5cIjAwMDAwMDAwXCJcclxuXSxcclxuLy8gIzB4MTU0IFxyXG5bIFxyXG5cIjAwMTExMTAwXCIsXHJcblwiMDAwMDAxMDBcIixcclxuXCIwMDAwMDEwMFwiLFxyXG5cIjAwMDAwMTAwXCIsXHJcblwiMDAwMDAxMDBcIixcclxuXCIwMDAwMDEwMFwiLFxyXG5cIjAwMTExMTAwXCIsXHJcblwiMDAwMDAwMDBcIlxyXG5dLFxyXG4vLyAjMHgxNTUgXHJcblsgXHJcblwiMDAwMTExMDBcIixcclxuXCIwMDEwMDAxMFwiLFxyXG5cIjAxMDAxMDEwXCIsXHJcblwiMDEwMTAxMTBcIixcclxuXCIwMTAwMTEwMFwiLFxyXG5cIjAwMTAwMDAwXCIsXHJcblwiMDAwMTExMTBcIixcclxuXCIwMDAwMDAwMFwiXHJcbl0sXHJcbi8vICMweDE1NiBcclxuWyBcclxuXCIxMTExMTExMVwiLFxyXG5cIjExMTExMTEwXCIsXHJcblwiMTExMTExMDBcIixcclxuXCIxMTExMTAwMFwiLFxyXG5cIjExMTEwMDAwXCIsXHJcblwiMTExMDAwMDBcIixcclxuXCIxMTAwMDAwMFwiLFxyXG5cIjEwMDAwMDAwXCJcclxuXSxcclxuLy8gIzB4MTU3IFxyXG5bIFxyXG5cIjAxMTEwMDAwXCIsXHJcblwiMDAwMTEwMDBcIixcclxuXCIwMDAwMTEwMFwiLFxyXG5cIjAwMDAwMTEwXCIsXHJcblwiMDAwMDExMDBcIixcclxuXCIwMDAxMTAwMFwiLFxyXG5cIjAxMTEwMDAwXCIsXHJcblwiMDAwMDAwMDBcIlxyXG5dLFxyXG4vLyAjMHgxNTggXHJcblsgXHJcblwiMTAxMDAwMDBcIixcclxuXCIwMTAxMDAwMFwiLFxyXG5cIjEwMTAwMDAwXCIsXHJcblwiMDEwMTAwMDBcIixcclxuXCIxMDEwMDAwMFwiLFxyXG5cIjAxMDEwMDAwXCIsXHJcblwiMTAxMDAwMDBcIixcclxuXCIwMTAxMDAwMFwiXHJcbl0sXHJcbi8vICMweDE1OSBcclxuWyBcclxuXCIwMDAwMDAwMFwiLFxyXG5cIjAxMDAwMDAwXCIsXHJcblwiMDAxMDAwMDBcIixcclxuXCIwMDAxMDAwMFwiLFxyXG5cIjAwMDAxMDAwXCIsXHJcblwiMDAwMDAxMDBcIixcclxuXCIwMDAwMDAxMFwiLFxyXG5cIjAwMDAwMDAwXCJcclxuXSxcclxuLy8gIzB4MTVhIFxyXG5bIFxyXG5cIjEwMTAxMDEwXCIsXHJcblwiMDEwMTAxMDFcIixcclxuXCIxMDEwMTAxMFwiLFxyXG5cIjAxMDEwMTAxXCIsXHJcblwiMTAxMDEwMTBcIixcclxuXCIwMTAxMDEwMVwiLFxyXG5cIjEwMTAxMDEwXCIsXHJcblwiMDEwMTAxMDFcIlxyXG5dLFxyXG4vLyAjMHgxNWIgXHJcblsgXHJcblwiMTExMTAwMDBcIixcclxuXCIxMTExMDAwMFwiLFxyXG5cIjExMTEwMDAwXCIsXHJcblwiMTExMTAwMDBcIixcclxuXCIwMDAwMTExMVwiLFxyXG5cIjAwMDAxMTExXCIsXHJcblwiMDAwMDExMTFcIixcclxuXCIwMDAwMTExMVwiXHJcbl0sXHJcbi8vICMweDE1YyBcclxuWyBcclxuXCIwMDAwMDAwMFwiLFxyXG5cIjAwMDAwMDAwXCIsXHJcblwiMDAwMDAwMDBcIixcclxuXCIwMDAwMDAwMFwiLFxyXG5cIjAwMDAxMTExXCIsXHJcblwiMDAwMDEwMDBcIixcclxuXCIwMDAwMTAwMFwiLFxyXG5cIjAwMDAxMDAwXCJcclxuXSxcclxuLy8gIzB4MTVkIFxyXG5bIFxyXG5cIjAwMDAwMDAwXCIsXHJcblwiMDAwMDAwMDBcIixcclxuXCIwMDAwMDAwMFwiLFxyXG5cIjAwMDAwMDAwXCIsXHJcblwiMTExMTEwMDBcIixcclxuXCIwMDAwMTAwMFwiLFxyXG5cIjAwMDAxMDAwXCIsXHJcblwiMDAwMDEwMDBcIlxyXG5dLFxyXG4vLyAjMHgxNWUgXHJcblsgXHJcblwiMDAwMDEwMDBcIixcclxuXCIwMDAwMTAwMFwiLFxyXG5cIjAwMDAxMDAwXCIsXHJcblwiMDAwMDEwMDBcIixcclxuXCIxMTExMTAwMFwiLFxyXG5cIjAwMDAxMDAwXCIsXHJcblwiMDAwMDEwMDBcIixcclxuXCIwMDAwMTAwMFwiXHJcbl0sXHJcbi8vICMweDE1ZiBcclxuWyBcclxuXCIwMDAwMDAwMFwiLFxyXG5cIjAwMDAwMDAwXCIsXHJcblwiMDAwMDAwMDBcIixcclxuXCIwMDAwMDAwMFwiLFxyXG5cIjExMTExMTExXCIsXHJcblwiMDAwMDEwMDBcIixcclxuXCIwMDAwMTAwMFwiLFxyXG5cIjAwMDAxMDAwXCJcclxuXSxcclxuLy8gIzB4MTYwIFxyXG5bIFxyXG5cIjAwMDAwMDAwXCIsXHJcblwiMDAwMDAwMDBcIixcclxuXCIwMDAwMDAwMVwiLFxyXG5cIjAwMTExMTEwXCIsXHJcblwiMDEwMTAxMDBcIixcclxuXCIwMDAxMDEwMFwiLFxyXG5cIjAwMDEwMTAwXCIsXHJcblwiMDAwMDAwMDBcIlxyXG5dLFxyXG4vLyAjMHgxNjEgXHJcblsgXHJcblwiMDAwMDEwMDBcIixcclxuXCIwMDAwMTAwMFwiLFxyXG5cIjAwMDAxMDAwXCIsXHJcblwiMDAwMDEwMDBcIixcclxuXCIwMDAwMDAwMFwiLFxyXG5cIjAwMDAwMDAwXCIsXHJcblwiMDAwMDEwMDBcIixcclxuXCIwMDAwMDAwMFwiXHJcbl0sXHJcbi8vICMweDE2MiBcclxuWyBcclxuXCIwMDEwMDEwMFwiLFxyXG5cIjAwMTAwMTAwXCIsXHJcblwiMDAxMDAxMDBcIixcclxuXCIwMDAwMDAwMFwiLFxyXG5cIjAwMDAwMDAwXCIsXHJcblwiMDAwMDAwMDBcIixcclxuXCIwMDAwMDAwMFwiLFxyXG5cIjAwMDAwMDAwXCJcclxuXSxcclxuLy8gIzB4MTYzIFxyXG5bIFxyXG5cIjAwMTAwMTAwXCIsXHJcblwiMDAxMDAxMDBcIixcclxuXCIwMTExMTExMFwiLFxyXG5cIjAwMTAwMTAwXCIsXHJcblwiMDExMTExMTBcIixcclxuXCIwMDEwMDEwMFwiLFxyXG5cIjAwMTAwMTAwXCIsXHJcblwiMDAwMDAwMDBcIlxyXG5dLFxyXG4vLyAjMHgxNjQgXHJcblsgXHJcblwiMDAwMDEwMDBcIixcclxuXCIwMDAxMTExMFwiLFxyXG5cIjAwMTAxMDAwXCIsXHJcblwiMDAwMTExMDBcIixcclxuXCIwMDAwMTAxMFwiLFxyXG5cIjAwMTExMTAwXCIsXHJcblwiMDAwMDEwMDBcIixcclxuXCIwMDAwMDAwMFwiXHJcbl0sXHJcbi8vICMweDE2NSBcclxuWyBcclxuXCIwMDAwMDAwMFwiLFxyXG5cIjAxMTAwMDEwXCIsXHJcblwiMDExMDAxMDBcIixcclxuXCIwMDAwMTAwMFwiLFxyXG5cIjAwMDEwMDAwXCIsXHJcblwiMDAxMDAxMTBcIixcclxuXCIwMTAwMDExMFwiLFxyXG5cIjAwMDAwMDAwXCJcclxuXSxcclxuLy8gIzB4MTY2IFxyXG5bIFxyXG5cIjAwMTEwMDAwXCIsXHJcblwiMDEwMDEwMDBcIixcclxuXCIwMTAwMTAwMFwiLFxyXG5cIjAwMTEwMDAwXCIsXHJcblwiMDEwMDEwMTBcIixcclxuXCIwMTAwMDEwMFwiLFxyXG5cIjAwMTExMDEwXCIsXHJcblwiMDAwMDAwMDBcIlxyXG5dLFxyXG4vLyAjMHgxNjcgXHJcblsgXHJcblwiMDAwMDAxMDBcIixcclxuXCIwMDAwMTAwMFwiLFxyXG5cIjAwMDEwMDAwXCIsXHJcblwiMDAwMDAwMDBcIixcclxuXCIwMDAwMDAwMFwiLFxyXG5cIjAwMDAwMDAwXCIsXHJcblwiMDAwMDAwMDBcIixcclxuXCIwMDAwMDAwMFwiXHJcbl0sXHJcbi8vICMweDE2OCBcclxuWyBcclxuXCIwMDAwMDEwMFwiLFxyXG5cIjAwMDAxMDAwXCIsXHJcblwiMDAwMTAwMDBcIixcclxuXCIwMDAxMDAwMFwiLFxyXG5cIjAwMDEwMDAwXCIsXHJcblwiMDAwMDEwMDBcIixcclxuXCIwMDAwMDEwMFwiLFxyXG5cIjAwMDAwMDAwXCJcclxuXSxcclxuLy8gIzB4MTY5IFxyXG5bIFxyXG5cIjAwMTAwMDAwXCIsXHJcblwiMDAwMTAwMDBcIixcclxuXCIwMDAwMTAwMFwiLFxyXG5cIjAwMDAxMDAwXCIsXHJcblwiMDAwMDEwMDBcIixcclxuXCIwMDAxMDAwMFwiLFxyXG5cIjAwMTAwMDAwXCIsXHJcblwiMDAwMDAwMDBcIlxyXG5dLFxyXG4vLyAjMHgxNmEgXHJcblsgXHJcblwiMDAwMDAwMDBcIixcclxuXCIwMDAwMTAwMFwiLFxyXG5cIjAwMDAxMDAwXCIsXHJcblwiMDAxMTExMTBcIixcclxuXCIwMDAwMTAwMFwiLFxyXG5cIjAwMDAxMDAwXCIsXHJcblwiMDAwMDAwMDBcIixcclxuXCIwMDAwMDAwMFwiXHJcbl0sXHJcbi8vICMweDE2YiBcclxuWyBcclxuXCIwMDAwMTAwMFwiLFxyXG5cIjAwMTAxMDEwXCIsXHJcblwiMDAwMTExMDBcIixcclxuXCIwMDExMTExMFwiLFxyXG5cIjAwMDExMTAwXCIsXHJcblwiMDAxMDEwMTBcIixcclxuXCIwMDAwMTAwMFwiLFxyXG5cIjAwMDAwMDAwXCJcclxuXSxcclxuLy8gIzB4MTZjIFxyXG5bIFxyXG5cIjAwMDAxMTExXCIsXHJcblwiMDAwMDExMTFcIixcclxuXCIwMDAwMTExMVwiLFxyXG5cIjAwMDAxMTExXCIsXHJcblwiMTExMTAwMDBcIixcclxuXCIxMTExMDAwMFwiLFxyXG5cIjExMTEwMDAwXCIsXHJcblwiMTExMTAwMDBcIlxyXG5dLFxyXG4vLyAjMHgxNmQgXHJcblsgXHJcblwiMTAwMDAwMDFcIixcclxuXCIwMTAwMDAxMFwiLFxyXG5cIjAwMTAwMTAwXCIsXHJcblwiMDAwMTEwMDBcIixcclxuXCIwMDAxMTAwMFwiLFxyXG5cIjAwMTAwMTAwXCIsXHJcblwiMDEwMDAwMTBcIixcclxuXCIxMDAwMDAwMVwiXHJcbl0sXHJcbi8vICMweDE2ZSBcclxuWyBcclxuXCIwMDAxMDAwMFwiLFxyXG5cIjAwMDEwMDAwXCIsXHJcblwiMDAxMDAwMDBcIixcclxuXCIxMTAwMDAwMFwiLFxyXG5cIjAwMDAwMDAwXCIsXHJcblwiMDAwMDAwMDBcIixcclxuXCIwMDAwMDAwMFwiLFxyXG5cIjAwMDAwMDAwXCJcclxuXSxcclxuLy8gIzB4MTZmIFxyXG5bIFxyXG5cIjAwMDAxMDAwXCIsXHJcblwiMDAwMDEwMDBcIixcclxuXCIwMDAwMDEwMFwiLFxyXG5cIjAwMDAwMDExXCIsXHJcblwiMDAwMDAwMDBcIixcclxuXCIwMDAwMDAwMFwiLFxyXG5cIjAwMDAwMDAwXCIsXHJcblwiMDAwMDAwMDBcIlxyXG5dLFxyXG4vLyAjMHgxNzAgXHJcblsgXHJcblwiMTExMTExMTFcIixcclxuXCIwMDAwMDAwMFwiLFxyXG5cIjAwMDAwMDAwXCIsXHJcblwiMDAwMDAwMDBcIixcclxuXCIwMDAwMDAwMFwiLFxyXG5cIjAwMDAwMDAwXCIsXHJcblwiMDAwMDAwMDBcIixcclxuXCIwMDAwMDAwMFwiXHJcbl0sXHJcbi8vICMweDE3MSBcclxuWyBcclxuXCIxMDAwMDAwMFwiLFxyXG5cIjEwMDAwMDAwXCIsXHJcblwiMTAwMDAwMDBcIixcclxuXCIxMDAwMDAwMFwiLFxyXG5cIjEwMDAwMDAwXCIsXHJcblwiMTAwMDAwMDBcIixcclxuXCIxMDAwMDAwMFwiLFxyXG5cIjEwMDAwMDAwXCJcclxuXSxcclxuLy8gIzB4MTcyIFxyXG5bIFxyXG5cIjExMTExMTExXCIsXHJcblwiMTAwMDAwMDBcIixcclxuXCIxMDAwMDAwMFwiLFxyXG5cIjEwMDAwMDAwXCIsXHJcblwiMTAwMDAwMDBcIixcclxuXCIxMDAwMDAwMFwiLFxyXG5cIjEwMDAwMDAwXCIsXHJcblwiMTAwMDAwMDBcIlxyXG5dLFxyXG4vLyAjMHgxNzMgXHJcblsgXHJcblwiMTExMTExMTFcIixcclxuXCIwMDAwMDAwMVwiLFxyXG5cIjAwMDAwMDAxXCIsXHJcblwiMDAwMDAwMDFcIixcclxuXCIwMDAwMDAwMVwiLFxyXG5cIjAwMDAwMDAxXCIsXHJcblwiMDAwMDAwMDFcIixcclxuXCIwMDAwMDAwMVwiXHJcbl0sXHJcbi8vICMweDE3NCBcclxuWyBcclxuXCIwMDAwMDAwMFwiLFxyXG5cIjAwMDAwMDAwXCIsXHJcblwiMTExMTExMTFcIixcclxuXCIwMDAwMDAwMFwiLFxyXG5cIjAwMDAwMDAwXCIsXHJcblwiMDAwMDAwMDBcIixcclxuXCIwMDAwMDAwMFwiLFxyXG5cIjAwMDAwMDAwXCJcclxuXSxcclxuLy8gIzB4MTc1IFxyXG5bIFxyXG5cIjAwMTAwMDAwXCIsXHJcblwiMDAxMDAwMDBcIixcclxuXCIwMDEwMDAwMFwiLFxyXG5cIjAwMTAwMDAwXCIsXHJcblwiMDAxMDAwMDBcIixcclxuXCIwMDEwMDAwMFwiLFxyXG5cIjAwMTAwMDAwXCIsXHJcblwiMDAxMDAwMDBcIlxyXG5dLFxyXG4vLyAjMHgxNzYgXHJcblsgXHJcblwiMDAwMDAxMDBcIixcclxuXCIwMDAwMTAwMFwiLFxyXG5cIjAwMDEwMDAxXCIsXHJcblwiMDAxMDAwMTBcIixcclxuXCIwMTAwMDEwMFwiLFxyXG5cIjEwMDAxMDAwXCIsXHJcblwiMDAwMTAwMDBcIixcclxuXCIwMDEwMDAwMFwiXHJcbl0sXHJcbi8vICMweDE3NyBcclxuWyBcclxuXCIwMDEwMDAwMFwiLFxyXG5cIjAwMDEwMDAwXCIsXHJcblwiMTAwMDEwMDBcIixcclxuXCIwMTAwMDEwMFwiLFxyXG5cIjAwMTAwMDEwXCIsXHJcblwiMDAwMTAwMDFcIixcclxuXCIwMDAwMTAwMFwiLFxyXG5cIjAwMDAwMTAwXCJcclxuXSxcclxuLy8gIzB4MTc4IFxyXG5bIFxyXG5cIjAwMDAwMDAwXCIsXHJcblwiMDAwMDAwMDBcIixcclxuXCIwMDAwMDAwMFwiLFxyXG5cIjAwMDAwMDAwXCIsXHJcblwiMTExMTExMTFcIixcclxuXCIwMDAwMDAwMFwiLFxyXG5cIjAwMDAwMDAwXCIsXHJcblwiMDAwMDAwMDBcIlxyXG5dLFxyXG4vLyAjMHgxNzkgXHJcblsgXHJcblwiMDAwMDEwMDBcIixcclxuXCIwMDAwMTAwMFwiLFxyXG5cIjAwMDAxMDAwXCIsXHJcblwiMDAwMDEwMDBcIixcclxuXCIwMDAwMTAwMFwiLFxyXG5cIjAwMDAxMDAwXCIsXHJcblwiMDAwMDEwMDBcIixcclxuXCIwMDAwMTAwMFwiXHJcbl0sXHJcbi8vICMweDE3YSBcclxuWyBcclxuXCIxMTExMTExMVwiLFxyXG5cIjExMTExMTExXCIsXHJcblwiMTExMTExMTFcIixcclxuXCIxMTExMTExMVwiLFxyXG5cIjAwMDAwMDAwXCIsXHJcblwiMDAwMDAwMDBcIixcclxuXCIwMDAwMDAwMFwiLFxyXG5cIjAwMDAwMDAwXCJcclxuXSxcclxuLy8gIzB4MTdiIFxyXG5bIFxyXG5cIjExMTEwMDAwXCIsXHJcblwiMTExMTAwMDBcIixcclxuXCIxMTExMDAwMFwiLFxyXG5cIjExMTEwMDAwXCIsXHJcblwiMTExMTAwMDBcIixcclxuXCIxMTExMDAwMFwiLFxyXG5cIjExMTEwMDAwXCIsXHJcblwiMTExMTAwMDBcIlxyXG5dLFxyXG4vLyAjMHgxN2MgXHJcblsgXHJcblwiMDAwMDAwMDBcIixcclxuXCIwMDAwMDAwMFwiLFxyXG5cIjAwMDAwMDAwXCIsXHJcblwiMDAwMDAwMDBcIixcclxuXCIwMDAwMDAwMFwiLFxyXG5cIjAwMDAwMDAwXCIsXHJcblwiMTExMTExMTFcIixcclxuXCIwMDAwMDAwMFwiXHJcbl0sXHJcbi8vICMweDE3ZCBcclxuWyBcclxuXCIwMDAwMDAxMFwiLFxyXG5cIjAwMDAwMDEwXCIsXHJcblwiMDAwMDAwMTBcIixcclxuXCIwMDAwMDAxMFwiLFxyXG5cIjAwMDAwMDEwXCIsXHJcblwiMDAwMDAwMTBcIixcclxuXCIwMDAwMDAxMFwiLFxyXG5cIjAwMDAwMDEwXCJcclxuXSxcclxuLy8gIzB4MTdlIFxyXG5bIFxyXG5cIjAwMDAwMDAwXCIsXHJcblwiMDAwMDAwMDBcIixcclxuXCIwMDAwMDAwMFwiLFxyXG5cIjAwMDAwMDAwXCIsXHJcblwiMDAwMDAwMDBcIixcclxuXCIxMTExMTExMVwiLFxyXG5cIjExMTExMTExXCIsXHJcblwiMTExMTExMTFcIlxyXG5dLFxyXG4vLyAjMHgxN2YgXHJcblsgXHJcblwiMDAwMDAxMTFcIixcclxuXCIwMDAwMDExMVwiLFxyXG5cIjAwMDAwMTExXCIsXHJcblwiMDAwMDAxMTFcIixcclxuXCIwMDAwMDExMVwiLFxyXG5cIjAwMDAwMTExXCIsXHJcblwiMDAwMDAxMTFcIixcclxuXCIwMDAwMDExMVwiXHJcbl0sXHJcbi8vICMweDE4MCBcclxuWyBcclxuXCIwMDAwMDAwMFwiLFxyXG5cIjAwMDAxMDAwXCIsXHJcblwiMDAwMDEwMDBcIixcclxuXCIwMDAwMTAwMFwiLFxyXG5cIjAwMTAxMDEwXCIsXHJcblwiMDAwMTExMDBcIixcclxuXCIwMDAwMTAwMFwiLFxyXG5cIjAwMDAwMDAwXCJcclxuXSxcclxuLy8gIzB4MTgxIFxyXG5bIFxyXG5cIjAwMDEwMDAwXCIsXHJcblwiMTExMTExMTBcIixcclxuXCIwMDEwMDAwMFwiLFxyXG5cIjAxMTExMTAwXCIsXHJcblwiMDAwMDAwMTBcIixcclxuXCIwMDAwMDAxMFwiLFxyXG5cIjExMTExMTAwXCIsXHJcblwiMDAwMDAwMDBcIlxyXG5dLFxyXG4vLyAjMHgxODIgXHJcblsgXHJcblwiMDAwMDAwMDBcIixcclxuXCIxMTExMTEwMFwiLFxyXG5cIjAwMDAwMDEwXCIsXHJcblwiMDAwMDAwMDBcIixcclxuXCIwMDAwMDAwMFwiLFxyXG5cIjEwMDAwMDAwXCIsXHJcblwiMDExMTExMTBcIixcclxuXCIwMDAwMDAwMFwiXHJcbl0sXHJcbi8vICMweDE4MyBcclxuWyBcclxuXCIwMDExMTEwMFwiLFxyXG5cIjAwMDAxMDAwXCIsXHJcblwiMDAwMTAwMDBcIixcclxuXCIwMTExMTExMFwiLFxyXG5cIjAwMDAxMDAwXCIsXHJcblwiMDAwMTAwMDBcIixcclxuXCIwMDAwMTEwMFwiLFxyXG5cIjAwMDAwMDAwXCJcclxuXSxcclxuLy8gIzB4MTg0IFxyXG5bIFxyXG5cIjAxMDAwMDAwXCIsXHJcblwiMDEwMDAwMDBcIixcclxuXCIwMTAwMDAwMFwiLFxyXG5cIjAxMDAwMDAwXCIsXHJcblwiMDEwMDAxMDBcIixcclxuXCIwMTAwMDEwMFwiLFxyXG5cIjAwMTExMDAwXCIsXHJcblwiMDAwMDAwMDBcIlxyXG5dLFxyXG4vLyAjMHgxODUgXHJcblsgXHJcblwiMTAwMDAxMDBcIixcclxuXCIxMDAwMDAxMFwiLFxyXG5cIjEwMDAwMDEwXCIsXHJcblwiMTAwMDAwMTBcIixcclxuXCIxMDAwMDAxMFwiLFxyXG5cIjEwMDEwMDAwXCIsXHJcblwiMDExMDAwMDBcIixcclxuXCIwMDAwMDAwMFwiXHJcbl0sXHJcbi8vICMweDE4NiBcclxuWyBcclxuXCIxMDAwMDEwMFwiLFxyXG5cIjEwMDExMTEwXCIsXHJcblwiMTAwMDAxMDBcIixcclxuXCIxMDAwMDEwMFwiLFxyXG5cIjEwMDExMTAwXCIsXHJcblwiMTAxMDAxMTBcIixcclxuXCIwMTAxMTEwMFwiLFxyXG5cIjAwMDAwMDAwXCJcclxuXSxcclxuLy8gIzB4MTg3IFxyXG5bIFxyXG5cIjAwMDEwMDAwXCIsXHJcblwiMDExMTExMTBcIixcclxuXCIwMDAwMTAwMFwiLFxyXG5cIjAxMTExMTEwXCIsXHJcblwiMDAwMDAxMDBcIixcclxuXCIwMDAwMDAxMFwiLFxyXG5cIjAxMTAwMDAwXCIsXHJcblwiMDAwMTEwMDBcIlxyXG5dLFxyXG4vLyAjMHgxODggXHJcblsgXHJcblwiMDAwMDExMDBcIixcclxuXCIwMDAxMTAwMFwiLFxyXG5cIjAwMTEwMDAwXCIsXHJcblwiMDExMDAwMDBcIixcclxuXCIwMDExMDAwMFwiLFxyXG5cIjAwMDExMDAwXCIsXHJcblwiMDAwMDExMDBcIixcclxuXCIwMDAwMDAwMFwiXHJcbl0sXHJcbi8vICMweDE4OSBcclxuWyBcclxuXCIxMDAxMTExMFwiLFxyXG5cIjEwMDAwMDAwXCIsXHJcblwiMTAwMDAwMDBcIixcclxuXCIxMDAwMDAwMFwiLFxyXG5cIjEwMDAwMDAwXCIsXHJcblwiMTAwMTAwMDBcIixcclxuXCIxMTAxMTExMFwiLFxyXG5cIjAwMDAwMDAwXCJcclxuXSxcclxuLy8gIzB4MThhIFxyXG5bIFxyXG5cIjAwMDEwMDAwXCIsXHJcblwiMDExMTExMTBcIixcclxuXCIwMDAxMDAwMFwiLFxyXG5cIjAxMTExMTEwXCIsXHJcblwiMDAwMTAwMDBcIixcclxuXCIwMTExMDAwMFwiLFxyXG5cIjEwMDExMTAwXCIsXHJcblwiMDExMTAwMTBcIlxyXG5dLFxyXG4vLyAjMHgxOGIgXHJcblsgXHJcblwiMDAxMTEwMDBcIixcclxuXCIwMTAxMDEwMFwiLFxyXG5cIjEwMDEwMDEwXCIsXHJcblwiMTAwMTAwMTBcIixcclxuXCIxMDAxMDAxMFwiLFxyXG5cIjEwMDEwMDEwXCIsXHJcblwiMDExMDAxMDBcIixcclxuXCIwMDAwMDAwMFwiXHJcbl0sXHJcbi8vICMweDE4YyBcclxuWyBcclxuXCIwMTAwMDEwMFwiLFxyXG5cIjAxMDAwMTAwXCIsXHJcblwiMDEwMDAxMDBcIixcclxuXCIwMTEwMDEwMFwiLFxyXG5cIjAwMDAwMTAwXCIsXHJcblwiMDAwMDEwMDBcIixcclxuXCIwMDAxMDAwMFwiLFxyXG5cIjAwMDAwMDAwXCJcclxuXSxcclxuLy8gIzB4MThkIFxyXG5bIFxyXG5cIjAwMTAwMDAwXCIsXHJcblwiMTExMTEwMDBcIixcclxuXCIwMDEwMDAwMFwiLFxyXG5cIjExMTExMDAwXCIsXHJcblwiMDAxMDAwMTBcIixcclxuXCIwMDEwMDAxMFwiLFxyXG5cIjAwMDExMTAwXCIsXHJcblwiMDAwMDAwMDBcIlxyXG5dLFxyXG4vLyAjMHgxOGUgXHJcblsgXHJcblwiMDExMTAwMDBcIixcclxuXCIwMDAxMDAwMFwiLFxyXG5cIjAwMDEwMTAwXCIsXHJcblwiMDExMTExMTBcIixcclxuXCIxMDAxMDEwMFwiLFxyXG5cIjEwMDEwMTAwXCIsXHJcblwiMDExMDAxMDBcIixcclxuXCIwMDAwMDAwMFwiXHJcbl0sXHJcbi8vICMweDE4ZiBcclxuWyBcclxuXCIwMTEwMDAwMFwiLFxyXG5cIjAwMDAwMDAwXCIsXHJcblwiMTAwMTExMDBcIixcclxuXCIxMDEwMDAxMFwiLFxyXG5cIjExMDAwMDEwXCIsXHJcblwiMTAwMDAwMTBcIixcclxuXCIwMDAxMTEwMFwiLFxyXG5cIjAwMDAwMDAwXCJcclxuXSxcclxuLy8gIzB4MTkwIFxyXG5bIFxyXG5cIjAxMDAwMTAwXCIsXHJcblwiMDEwMDAxMDBcIixcclxuXCIxMTExMTExMFwiLFxyXG5cIjAxMDAwMTAwXCIsXHJcblwiMDEwMTEwMDBcIixcclxuXCIwMTAwMDAwMFwiLFxyXG5cIjAwMTExMTEwXCIsXHJcblwiMDAwMDAwMDBcIlxyXG5dLFxyXG4vLyAjMHgxOTEgXHJcblsgXHJcblwiMDAxMDAwMDBcIixcclxuXCIxMTExMTEwMFwiLFxyXG5cIjAxMDAwMDAwXCIsXHJcblwiMDEwMTExMTBcIixcclxuXCIxMDAwMDAwMFwiLFxyXG5cIjEwMTAwMDAwXCIsXHJcblwiMTAxMTExMTBcIixcclxuXCIwMDAwMDAwMFwiXHJcbl0sXHJcbi8vICMweDE5MiBcclxuWyBcclxuXCIwMDAwMTAwMFwiLFxyXG5cIjExMTExMTEwXCIsXHJcblwiMDAwMDEwMDBcIixcclxuXCIwMDExMTAwMFwiLFxyXG5cIjAxMDAxMDAwXCIsXHJcblwiMDAxMTEwMDBcIixcclxuXCIwMDAwMTAwMFwiLFxyXG5cIjAwMDEwMDAwXCJcclxuXSxcclxuLy8gIzB4MTkzIFxyXG5bIFxyXG5cIjAwMTAwMDAwXCIsXHJcblwiMDAxMDAwMTBcIixcclxuXCIwMDEwMTEwMFwiLFxyXG5cIjAwMTEwMDAwXCIsXHJcblwiMDEwMDAwMDBcIixcclxuXCIxMDAwMDAwMFwiLFxyXG5cIjAxMTExMTEwXCIsXHJcblwiMDAwMDAwMDBcIlxyXG5dLFxyXG4vLyAjMHgxOTQgXHJcblsgXHJcblwiMDAxMDAwMTBcIixcclxuXCIxMTExMTAwMVwiLFxyXG5cIjAwMTAwMTAxXCIsXHJcblwiMDAxMDAxMDBcIixcclxuXCIwMDEwMDEwMFwiLFxyXG5cIjAwMTAwMTAwXCIsXHJcblwiMDEwMDEwMDBcIixcclxuXCIwMDAwMDAwMFwiXHJcbl0sXHJcbi8vICMweDE5NSBcclxuWyBcclxuXCIwMDEwMDAwMFwiLFxyXG5cIjExMTExMDEwXCIsXHJcblwiMDEwMDAwMDFcIixcclxuXCIwMTAwMDEwMFwiLFxyXG5cIjEwMDExMTAwXCIsXHJcblwiMTAxMDAxMTBcIixcclxuXCIwMDAxMTEwMFwiLFxyXG5cIjAwMDAwMDAwXCJcclxuXSxcclxuLy8gIzB4MTk2IFxyXG5bIFxyXG5cIjExMTAwMDAwXCIsXHJcblwiMDAxMDAxMTBcIixcclxuXCIwMTAwMDEwMVwiLFxyXG5cIjEwMDAwMTAwXCIsXHJcblwiMTAwMDAxMDBcIixcclxuXCIxMDAwMTAwMFwiLFxyXG5cIjAxMTEwMDAwXCIsXHJcblwiMDAwMDAwMDBcIlxyXG5dLFxyXG4vLyAjMHgxOTcgXHJcblsgXHJcblwiMTExMTExMTBcIixcclxuXCIwMDAwMDEwMFwiLFxyXG5cIjAwMDAxMDAwXCIsXHJcblwiMDAwMTAwMDBcIixcclxuXCIwMDAxMDAwMFwiLFxyXG5cIjAwMDAxMDAwXCIsXHJcblwiMDAwMDAxMDBcIixcclxuXCIwMDAwMDAwMFwiXHJcbl0sXHJcbi8vICMweDE5OCBcclxuWyBcclxuXCIwMDEwMDAwMFwiLFxyXG5cIjExMTExMTEwXCIsXHJcblwiMDAwMTAwMDBcIixcclxuXCIwMDAwMTAwMFwiLFxyXG5cIjAxMDAwMTAwXCIsXHJcblwiMDAxMDAwMDBcIixcclxuXCIwMDAxMTAwMFwiLFxyXG5cIjAwMDAwMDAwXCJcclxuXSxcclxuLy8gIzB4MTk5IFxyXG5bIFxyXG5cIjAwMDEwMDAwXCIsXHJcblwiMDAxMDAwMDBcIixcclxuXCIwMDEwMDAwMFwiLFxyXG5cIjAxMTEwMDAwXCIsXHJcblwiMDEwMDEwMDBcIixcclxuXCIxMDAwMTAwMFwiLFxyXG5cIjEwMDAwMTEwXCIsXHJcblwiMDAwMDAwMDBcIlxyXG5dLFxyXG4vLyAjMHgxOWEgXHJcblsgXHJcblwiMTAwMDAwMDBcIixcclxuXCIwMTExMTEwMFwiLFxyXG5cIjAwMDAwMDEwXCIsXHJcblwiMDAwMDAwMTBcIixcclxuXCIwMDAwMDAxMFwiLFxyXG5cIjAwMDAwMTAwXCIsXHJcblwiMDAwMTEwMDBcIixcclxuXCIwMDAwMDAwMFwiXHJcbl0sXHJcbi8vICMweDE5YiBcclxuWyBcclxuXCIwMTExMTEwMFwiLFxyXG5cIjAwMDAxMDAwXCIsXHJcblwiMDAwMTAwMDBcIixcclxuXCIwMDEwMTEwMFwiLFxyXG5cIjAxMDAwMDEwXCIsXHJcblwiMDAwMDAwMTBcIixcclxuXCIwMDEwMDEwMFwiLFxyXG5cIjAwMDExMDAwXCJcclxuXSxcclxuLy8gIzB4MTljIFxyXG5bIFxyXG5cIjEwMDAwMTAwXCIsXHJcblwiMTAxMTExMTBcIixcclxuXCIxMDAwMDEwMFwiLFxyXG5cIjEwMDAwMTAwXCIsXHJcblwiMTAwMDAxMDBcIixcclxuXCIxMDAwMDEwMFwiLFxyXG5cIjAxMDAxMDAwXCIsXHJcblwiMDAwMDAwMDBcIlxyXG5dLFxyXG4vLyAjMHgxOWQgXHJcblsgXHJcblwiMDAwMTExMTBcIixcclxuXCIwMDAxMDAwMFwiLFxyXG5cIjAwMDEwMDAwXCIsXHJcblwiMDAwMTAwMDBcIixcclxuXCIwMDAwMDAwMFwiLFxyXG5cIjAwMDAwMDAwXCIsXHJcblwiMDAwMDAwMDBcIixcclxuXCIwMDAwMDAwMFwiXHJcbl0sXHJcbi8vICMweDE5ZSBcclxuWyBcclxuXCIwMDAwMDAwMFwiLFxyXG5cIjAwMTAwMDAwXCIsXHJcblwiMDExMTAwMDBcIixcclxuXCIwMDEwMDAwMFwiLFxyXG5cIjAxMTExMDAwXCIsXHJcblwiMTAwMTAxMDBcIixcclxuXCIwMTEwMTAwMFwiLFxyXG5cIjAwMDAwMDAwXCJcclxuXSxcclxuLy8gIzB4MTlmIFxyXG5bIFxyXG5cIjAwMDAwMDAwXCIsXHJcblwiMDAwMDAwMDBcIixcclxuXCIwMTAxMTAwMFwiLFxyXG5cIjExMTAwMTAwXCIsXHJcblwiMDAxMDEwMDBcIixcclxuXCIwMDEwMDAwMFwiLFxyXG5cIjAwMDEwMDAwXCIsXHJcblwiMDAwMDAwMDBcIlxyXG5dLFxyXG4vLyAjMHgxYTAgXHJcblsgXHJcblwiMDAxMDAwMDBcIixcclxuXCIxMTEwMDEwMFwiLFxyXG5cIjAwMTAxMDEwXCIsXHJcblwiMDAxMTAwMTBcIixcclxuXCIwMTEwMDAxMFwiLFxyXG5cIjEwMTAwMDEwXCIsXHJcblwiMDAxMDAxMDBcIixcclxuXCIwMDAwMDAwMFwiXHJcbl0sXHJcbi8vICMweDFhMSBcclxuWyBcclxuXCIwMDAwMDEwMFwiLFxyXG5cIjAxMDAwMTAwXCIsXHJcblwiMDExMTExMDBcIixcclxuXCIwMTAwMTAxMFwiLFxyXG5cIjEwMTEwMDEwXCIsXHJcblwiMTAwMTAxMTFcIixcclxuXCIwMTEwMDExMFwiLFxyXG5cIjAwMDAwMDAwXCJcclxuXSxcclxuLy8gIzB4MWEyIFxyXG5bIFxyXG5cIjAwMTExMDAwXCIsXHJcblwiMDAwMDAwMDBcIixcclxuXCIwMDAxMDAwMFwiLFxyXG5cIjAxMDAxMDEwXCIsXHJcblwiMDEwMDEwMTBcIixcclxuXCIxMDAwMTAxMFwiLFxyXG5cIjAwMTEwMDAwXCIsXHJcblwiMDAwMDAwMDBcIlxyXG5dLFxyXG4vLyAjMHgxYTMgXHJcblsgXHJcblwiMDAxMDAwMDBcIixcclxuXCIxMTExMTEwMFwiLFxyXG5cIjAwMTAwMDAwXCIsXHJcblwiMDExMTExMDBcIixcclxuXCIxMDEwMTAxMFwiLFxyXG5cIjEwMDEwMDEwXCIsXHJcblwiMDExMDAxMDBcIixcclxuXCIwMDAwMDAwMFwiXHJcbl0sXHJcbi8vICMweDFhNCBcclxuWyBcclxuXCIwMDAxMTAwMFwiLFxyXG5cIjAwMDAwMDAwXCIsXHJcblwiMDAxMTExMDBcIixcclxuXCIwMTAwMDAxMFwiLFxyXG5cIjAwMDAwMDEwXCIsXHJcblwiMDAwMDAxMDBcIixcclxuXCIwMDAwMTAwMFwiLFxyXG5cIjAwMDAwMDAwXCJcclxuXSxcclxuLy8gIzB4MWE1IFxyXG5bIFxyXG5cIjAwMDEwMDAwXCIsXHJcblwiMDAwMDAwMDBcIixcclxuXCIwMTExMTEwMFwiLFxyXG5cIjAwMDAxMDAwXCIsXHJcblwiMDAwMTAwMDBcIixcclxuXCIwMDEwMTAwMFwiLFxyXG5cIjAxMDAwMTEwXCIsXHJcblwiMDAwMDAwMDBcIlxyXG5dLFxyXG4vLyAjMHgxYTYgXHJcblsgXHJcblwiMDAxMDAwMDBcIixcclxuXCIxMTExMTEwMVwiLFxyXG5cIjAwMTAwMDAxXCIsXHJcblwiMDExMTExMDBcIixcclxuXCIxMDEwMDAxMFwiLFxyXG5cIjEwMTAwMDEwXCIsXHJcblwiMDExMDAxMDBcIixcclxuXCIwMDAwMDAwMFwiXHJcbl0sXHJcbi8vICMweDFhNyBcclxuWyBcclxuXCIwMTAwMTAwMFwiLFxyXG5cIjAxMDAxMTAwXCIsXHJcblwiMDAxMTAwMTBcIixcclxuXCIxMTEwMDAxMFwiLFxyXG5cIjAwMTAwMTAwXCIsXHJcblwiMDAwMTAwMDBcIixcclxuXCIwMDAxMDAwMFwiLFxyXG5cIjAwMDAxMDAwXCJcclxuXSxcclxuLy8gIzB4MWE4IFxyXG5bIFxyXG5cIjAwMDAxMDAwXCIsXHJcblwiMTAwMTExMDBcIixcclxuXCIxMDEwMTAxMFwiLFxyXG5cIjExMDAxMDEwXCIsXHJcblwiMTEwMDEwMTBcIixcclxuXCIxMDAwMTEwMFwiLFxyXG5cIjAwMDExMDAwXCIsXHJcblwiMDAwMDAwMDBcIlxyXG5dLFxyXG4vLyAjMHgxYTkgXHJcblsgXHJcblwiMDAwMDEwMDBcIixcclxuXCIwMDAwMTExMFwiLFxyXG5cIjAwMDAxMDAwXCIsXHJcblwiMDAwMDEwMDBcIixcclxuXCIwMTExMTAwMFwiLFxyXG5cIjEwMDAxMTEwXCIsXHJcblwiMDExMTEwMDBcIixcclxuXCIwMDAwMDAwMFwiXHJcbl0sXHJcbi8vICMweDFhYSBcclxuWyBcclxuXCIxMDAxMTExMFwiLFxyXG5cIjEwMDAwMTAwXCIsXHJcblwiMTAwMTExMTBcIixcclxuXCIxMDAwMDEwMFwiLFxyXG5cIjEwMDExMTAwXCIsXHJcblwiMTAxMDAxMTBcIixcclxuXCIxMTAxMTEwMFwiLFxyXG5cIjAwMDAwMDAwXCJcclxuXSxcclxuLy8gIzB4MWFiIFxyXG5bIFxyXG5cIjAwMDAwMDAwXCIsXHJcblwiMDAxMDAwMDBcIixcclxuXCIwMTAxMDAwMFwiLFxyXG5cIjEwMDAxMDAwXCIsXHJcblwiMDAwMDAxMDBcIixcclxuXCIwMDAwMDAxMFwiLFxyXG5cIjAwMDAwMDEwXCIsXHJcblwiMDAwMDAwMDBcIlxyXG5dLFxyXG4vLyAjMHgxYWMgXHJcblsgXHJcblwiMDAxMDAwMDBcIixcclxuXCIxMTEwMDExMFwiLFxyXG5cIjAwMTAxMTAwXCIsXHJcblwiMDAxMTAxMDBcIixcclxuXCIwMTEwMDEwMFwiLFxyXG5cIjEwMTAwMTAwXCIsXHJcblwiMDAxMDAwMTBcIixcclxuXCIwMDAwMDAwMFwiXHJcbl0sXHJcbi8vICMweDFhZCBcclxuWyBcclxuXCIwMDAwMDEwMFwiLFxyXG5cIjAxMDAwMTAwXCIsXHJcblwiMDExMTExMDBcIixcclxuXCIwMTAwMTAxMFwiLFxyXG5cIjEwMTEwMDEwXCIsXHJcblwiMTAwMTAwMTBcIixcclxuXCIwMTEwMDEwMFwiLFxyXG5cIjAwMDAwMDAwXCJcclxuXSxcclxuLy8gIzB4MWFlIFxyXG5bIFxyXG5cIjAxMTExMTAwXCIsXHJcblwiMDAwMDEwMDBcIixcclxuXCIwMDAxMDAwMFwiLFxyXG5cIjAwMTExMTAwXCIsXHJcblwiMDEwMDAwMTBcIixcclxuXCIwMDAxMTAxMFwiLFxyXG5cIjAwMTAwMTAwXCIsXHJcblwiMDAwMTEwMDBcIlxyXG5dLFxyXG4vLyAjMHgxYWYgXHJcblsgXHJcblwiMDAxMDAwMDBcIixcclxuXCIxMTEwMDEwMFwiLFxyXG5cIjAwMTAxMDEwXCIsXHJcblwiMDAxMTAwMTBcIixcclxuXCIwMTEwMDExMFwiLFxyXG5cIjEwMTAxMDExXCIsXHJcblwiMDAxMDAxMTBcIixcclxuXCIwMDAwMDAwMFwiXHJcbl0sXHJcbi8vICMweDFiMCBcclxuWyBcclxuXCIwMDEwMDAwMFwiLFxyXG5cIjExMTExMTAxXCIsXHJcblwiMDAxMDAwMDFcIixcclxuXCIwMTEwMDAwMFwiLFxyXG5cIjEwMTAwMDAwXCIsXHJcblwiMDExMDAwMTBcIixcclxuXCIwMDExMTExMFwiLFxyXG5cIjAwMDAwMDAwXCJcclxuXSxcclxuLy8gIzB4MWIxIFxyXG5bIFxyXG5cIjAwMDAwMDAwXCIsXHJcblwiMDAwMDAwMDBcIixcclxuXCIwMDAwMDAwMFwiLFxyXG5cIjAwMDAwMDAwXCIsXHJcblwiMDAwMDEwMDBcIixcclxuXCIwMDAwMTAwMFwiLFxyXG5cIjAwMDAxMDAwXCIsXHJcblwiMDExMTEwMDBcIlxyXG5dLFxyXG4vLyAjMHgxYjIgXHJcblsgXHJcblwiMDAwMDAwMDBcIixcclxuXCIwMDAwMDAwMFwiLFxyXG5cIjAxMDAxMDAwXCIsXHJcblwiMDEwMDAxMDBcIixcclxuXCIwMTAwMDEwMFwiLFxyXG5cIjAxMDAwMTAwXCIsXHJcblwiMDAxMDAwMDBcIixcclxuXCIwMDAwMDAwMFwiXHJcbl0sXHJcbi8vICMweDFiMyBcclxuWyBcclxuXCIwMDAwMDAwMFwiLFxyXG5cIjAwMDAwMDAwXCIsXHJcblwiMDAwMTAwMDBcIixcclxuXCIxMDExMTAwMFwiLFxyXG5cIjExMDEwMTAwXCIsXHJcblwiMTAwMTEwMDBcIixcclxuXCIwMDExMDAwMFwiLFxyXG5cIjAwMDAwMDAwXCJcclxuXSxcclxuLy8gIzB4MWI0IFxyXG5bIFxyXG5cIjAwMDEwMDAwXCIsXHJcblwiMTExMTExMTBcIixcclxuXCIwMDEwMDAwMFwiLFxyXG5cIjAxMTEwMTAwXCIsXHJcblwiMTAxMTEwMDBcIixcclxuXCIwMTAwMTAwMFwiLFxyXG5cIjAxMTExMTEwXCIsXHJcblwiMDAwMDAwMDBcIlxyXG5dLFxyXG4vLyAjMHgxYjUgXHJcblsgXHJcblwiMDAwMDAwMDBcIixcclxuXCIwMDAwMDAwMFwiLFxyXG5cIjAwMDAwMDAwXCIsXHJcblwiMDAwMDAwMDBcIixcclxuXCIwMDAwMDAwMFwiLFxyXG5cIjAxMDAwMDAwXCIsXHJcblwiMDAxMDAwMDBcIixcclxuXCIwMDAxMDAwMFwiXHJcbl0sXHJcbi8vICMweDFiNiBcclxuWyBcclxuXCIwMDAwMDAwMFwiLFxyXG5cIjAwMTAwMDAwXCIsXHJcblwiMDAwMDAwMDBcIixcclxuXCIwMTExMTAwMFwiLFxyXG5cIjAwMDAwMTAwXCIsXHJcblwiMDAwMDAxMDBcIixcclxuXCIwMDAwMTAwMFwiLFxyXG5cIjAwMDAwMDAwXCJcclxuXSxcclxuLy8gIzB4MWI3IFxyXG5bIFxyXG5cIjAwMDAwMDAwXCIsXHJcblwiMDAwMDAwMDBcIixcclxuXCIwMDEwMDAwMFwiLFxyXG5cIjAwMTExMDAwXCIsXHJcblwiMDAxMDAwMDBcIixcclxuXCIwMTExMTAwMFwiLFxyXG5cIjAxMTAwMDAwXCIsXHJcblwiMDAwMDAwMDBcIlxyXG5dLFxyXG4vLyAjMHgxYjggXHJcblsgXHJcblwiMDExMTAwMDBcIixcclxuXCIwMTAxMDAwMFwiLFxyXG5cIjAxMTEwMDAwXCIsXHJcblwiMDAwMDAwMDBcIixcclxuXCIwMDAwMDAwMFwiLFxyXG5cIjAwMDAwMDAwXCIsXHJcblwiMDAwMDAwMDBcIixcclxuXCIwMDAwMDAwMFwiXHJcbl0sXHJcbi8vICMweDFiOSBcclxuWyBcclxuXCIwMDAwMDAwMFwiLFxyXG5cIjAwMDAwMDAwXCIsXHJcblwiMDAwMDAwMDBcIixcclxuXCIwMDAwMDAwMFwiLFxyXG5cIjAwMDAwMDAwXCIsXHJcblwiMDAwMDAwMDBcIixcclxuXCIwMDEwMDAwMFwiLFxyXG5cIjAwMDAwMDAwXCJcclxuXSxcclxuLy8gIzB4MWJhIFxyXG5bIFxyXG5cIjAwMDAwMDAwXCIsXHJcblwiMDAxMDAwMDBcIixcclxuXCIwMDAwMDAwMFwiLFxyXG5cIjAxMTExMDAwXCIsXHJcblwiMDAwMTAwMDBcIixcclxuXCIwMDExMDAwMFwiLFxyXG5cIjAxMDAxMTAwXCIsXHJcblwiMDAwMDAwMDBcIlxyXG5dLFxyXG4vLyAjMHgxYmIgXHJcblsgXHJcblwiMDAwMDAwMDBcIixcclxuXCIwMDAwMDAwMFwiLFxyXG5cIjAwMDAwMDAwXCIsXHJcblwiMTExMTEwMDBcIixcclxuXCIwMDAwMDEwMFwiLFxyXG5cIjAwMDAwMTAwXCIsXHJcblwiMDAwMTEwMDBcIixcclxuXCIwMDAwMDAwMFwiXHJcbl0sXHJcbi8vICMweDFiYyBcclxuWyBcclxuXCIwMDEwMDAwMFwiLFxyXG5cIjEwMDEwMDAwXCIsXHJcblwiMDEwMDAwMDBcIixcclxuXCIwMDAwMDAwMFwiLFxyXG5cIjAwMDAwMDAwXCIsXHJcblwiMDAwMDAwMDBcIixcclxuXCIwMDAwMDAwMFwiLFxyXG5cIjAwMDAwMDAwXCJcclxuXSxcclxuLy8gIzB4MWJkIFxyXG5bIFxyXG5cIjAwMDAwMDAwXCIsXHJcblwiMDAwMDAwMDBcIixcclxuXCIwMDAwMDAwMFwiLFxyXG5cIjAwMDAwMDAwXCIsXHJcblwiMDAwMDAwMDBcIixcclxuXCIwMTExMDAwMFwiLFxyXG5cIjAxMDEwMDAwXCIsXHJcblwiMDExMTAwMDBcIlxyXG5dLFxyXG4vLyAjMHgxYmUgXHJcblsgXHJcblwiMDAwMDAwMDBcIixcclxuXCIwMDEwMDAwMFwiLFxyXG5cIjAxMTEwMTAwXCIsXHJcblwiMDAxMDAwMDBcIixcclxuXCIwMTExMTAwMFwiLFxyXG5cIjEwMTAwMTAwXCIsXHJcblwiMDExMDEwMDBcIixcclxuXCIwMDAwMDAwMFwiXHJcbl0sXHJcbi8vICMweDFiZiBcclxuWyBcclxuXCIwMDAwMDAwMFwiLFxyXG5cIjAwMDAwMDAwXCIsXHJcblwiMDAwMDAwMDBcIixcclxuXCIwMDAxMTEwMFwiLFxyXG5cIjAwMDAwMDAwXCIsXHJcblwiMDAwMDAwMDBcIixcclxuXCIwMDAwMDAwMFwiLFxyXG5cIjAwMDAwMDAwXCJcclxuXSxcclxuLy8gIzB4MWMwIFxyXG5bIFxyXG5cIjAwMDExMTAwXCIsXHJcblwiMDAwMTExMDBcIixcclxuXCIwMDExMTExMFwiLFxyXG5cIjAwMDExMTAwXCIsXHJcblwiMDAwMDEwMDBcIixcclxuXCIwMDAwMDAwMFwiLFxyXG5cIjAwMTExMTEwXCIsXHJcblwiMDAwMDAwMDBcIlxyXG5dLFxyXG4vLyAjMHgxYzEgXHJcblsgXHJcblwiMTExMTExMTFcIixcclxuXCIxMTExMDExMVwiLFxyXG5cIjExMTEwMTExXCIsXHJcblwiMTExMTAxMTFcIixcclxuXCIxMTAxMDEwMVwiLFxyXG5cIjExMTAwMDExXCIsXHJcblwiMTExMTAxMTFcIixcclxuXCIxMTExMTExMVwiXHJcbl0sXHJcbi8vICMweDFjMiBcclxuWyBcclxuXCIxMTExMTExMVwiLFxyXG5cIjExMTEwMTExXCIsXHJcblwiMTExMDAwMTFcIixcclxuXCIxMTAxMDEwMVwiLFxyXG5cIjExMTEwMTExXCIsXHJcblwiMTExMTAxMTFcIixcclxuXCIxMTExMDExMVwiLFxyXG5cIjExMTExMTExXCJcclxuXSxcclxuLy8gIzB4MWMzIFxyXG5bIFxyXG5cIjExMTExMTExXCIsXHJcblwiMTExMTExMTFcIixcclxuXCIxMTExMDExMVwiLFxyXG5cIjExMTExMDExXCIsXHJcblwiMTAwMDAwMDFcIixcclxuXCIxMTExMTAxMVwiLFxyXG5cIjExMTEwMTExXCIsXHJcblwiMTExMTExMTFcIlxyXG5dLFxyXG4vLyAjMHgxYzQgXHJcblsgXHJcblwiMTExMTExMTFcIixcclxuXCIxMTExMTExMVwiLFxyXG5cIjExMTAxMTExXCIsXHJcblwiMTEwMTExMTFcIixcclxuXCIxMDAwMDAwMVwiLFxyXG5cIjExMDExMTExXCIsXHJcblwiMTExMDExMTFcIixcclxuXCIxMTExMTExMVwiXHJcbl0sXHJcbi8vICMweDFjNSBcclxuWyBcclxuXCIxMDExMTAxMVwiLFxyXG5cIjEwMTExMDExXCIsXHJcblwiMTAxMTEwMTFcIixcclxuXCIxMDAwMDAxMVwiLFxyXG5cIjEwMTExMDExXCIsXHJcblwiMTAxMTEwMTFcIixcclxuXCIxMDExMTAxMVwiLFxyXG5cIjExMTExMTExXCJcclxuXSxcclxuLy8gIzB4MWM2IFxyXG5bIFxyXG5cIjExMTAwMDExXCIsXHJcblwiMTEwMTExMDFcIixcclxuXCIxMDExMTExMVwiLFxyXG5cIjEwMTExMTExXCIsXHJcblwiMTAxMTExMTFcIixcclxuXCIxMTAxMTEwMVwiLFxyXG5cIjExMTAwMDExXCIsXHJcblwiMTExMTExMTFcIlxyXG5dLFxyXG4vLyAjMHgxYzcgXHJcblsgXHJcblwiMDAwMTEwMDBcIixcclxuXCIwMDEwMDEwMFwiLFxyXG5cIjAxMTExMTEwXCIsXHJcblwiMTExMTExMTFcIixcclxuXCIwMTAxMTAxMFwiLFxyXG5cIjAwMTAwMTAwXCIsXHJcblwiMDAwMDAwMDBcIixcclxuXCIwMDAwMDAwMFwiXHJcbl0sXHJcbi8vICMweDFjOCBcclxuWyBcclxuXCIxMTEwMDAwMFwiLFxyXG5cIjAxMDAwMTExXCIsXHJcblwiMDEwMDAwMTBcIixcclxuXCIwMTExMTExMFwiLFxyXG5cIjAxMDAwMDEwXCIsXHJcblwiMDEwMDAxMTFcIixcclxuXCIxMTEwMDAwMFwiLFxyXG5cIjAwMDAwMDAwXCJcclxuXSxcclxuLy8gIzB4MWM5IFxyXG5bIFxyXG5cIjAwMTAwMDEwXCIsXHJcblwiMDAxMTExMTBcIixcclxuXCIwMDEwMTAxMFwiLFxyXG5cIjAwMDAxMDAwXCIsXHJcblwiMDAwMDEwMDBcIixcclxuXCIwMTAwMTAwMVwiLFxyXG5cIjAxMTExMTExXCIsXHJcblwiMDEwMDAwMDFcIlxyXG5dLFxyXG4vLyAjMHgxY2EgXHJcblsgXHJcblwiMDAwMTExMDBcIixcclxuXCIwMDAxMTEwMFwiLFxyXG5cIjAwMDAxMDAwXCIsXHJcblwiMDAxMTExMTBcIixcclxuXCIwMDAwMTAwMFwiLFxyXG5cIjAwMDAxMDAwXCIsXHJcblwiMDAwMTAxMDBcIixcclxuXCIwMDEwMDAxMFwiXHJcbl0sXHJcbi8vICMweDFjYiBcclxuWyBcclxuXCIwMDAwMDAwMFwiLFxyXG5cIjAwMDEwMDAxXCIsXHJcblwiMTEwMTAwMTBcIixcclxuXCIxMTExMTEwMFwiLFxyXG5cIjExMDEwMDEwXCIsXHJcblwiMDAwMTAwMDFcIixcclxuXCIwMDAwMDAwMFwiLFxyXG5cIjAwMDAwMDAwXCJcclxuXSxcclxuLy8gIzB4MWNjIFxyXG5bIFxyXG5cIjAwMDAwMDAwXCIsXHJcblwiMTAwMDEwMDBcIixcclxuXCIwMTAwMTAxMVwiLFxyXG5cIjAwMTExMTExXCIsXHJcblwiMDEwMDEwMTFcIixcclxuXCIxMDAwMTAwMFwiLFxyXG5cIjAwMDAwMDAwXCIsXHJcblwiMDAwMDAwMDBcIlxyXG5dLFxyXG4vLyAjMHgxY2QgXHJcblsgXHJcblwiMDAxMDAwMTBcIixcclxuXCIwMDAxMDEwMFwiLFxyXG5cIjAwMDAxMDAwXCIsXHJcblwiMDAwMDEwMDBcIixcclxuXCIwMDExMTExMFwiLFxyXG5cIjAwMDAxMDAwXCIsXHJcblwiMDAwMTExMDBcIixcclxuXCIwMDAxMTEwMFwiXHJcbl0sXHJcbi8vICMweDFjZSBcclxuWyBcclxuXCIwMDExMTEwMFwiLFxyXG5cIjAxMTExMTEwXCIsXHJcblwiMTExMTExMTFcIixcclxuXCIxMTAxMTAxMVwiLFxyXG5cIjExMTExMTExXCIsXHJcblwiMTExMDAxMTFcIixcclxuXCIwMTExMTExMFwiLFxyXG5cIjAwMTExMTAwXCJcclxuXSxcclxuLy8gIzB4MWNmIFxyXG5bIFxyXG5cIjAwMTExMTAwXCIsXHJcblwiMDEwMDAwMTBcIixcclxuXCIxMDAwMDAwMVwiLFxyXG5cIjEwMTAwMTAxXCIsXHJcblwiMTAwMDAwMDFcIixcclxuXCIxMDAxMTAwMVwiLFxyXG5cIjAxMDAwMDEwXCIsXHJcblwiMDAxMTExMDBcIlxyXG5dLFxyXG4vLyAjMHgxZDAgXHJcblsgXHJcblwiMDAxMTExMTBcIixcclxuXCIwMDEwMDAxMFwiLFxyXG5cIjAwMTAwMDEwXCIsXHJcblwiMDAxMTExMTBcIixcclxuXCIwMDEwMDAxMFwiLFxyXG5cIjAwMTAwMDEwXCIsXHJcblwiMDAxMTExMTBcIixcclxuXCIwMDAwMDAwMFwiXHJcbl0sXHJcbi8vICMweDFkMSBcclxuWyBcclxuXCIwMDExMTExMFwiLFxyXG5cIjAwMTAwMDEwXCIsXHJcblwiMDAxMTExMTBcIixcclxuXCIwMDEwMDAxMFwiLFxyXG5cIjAwMTExMTEwXCIsXHJcblwiMDAxMDAwMTBcIixcclxuXCIwMTAwMDAxMFwiLFxyXG5cIjAwMDAwMDAwXCJcclxuXSxcclxuLy8gIzB4MWQyIFxyXG5bIFxyXG5cIjAwMDAxMDAwXCIsXHJcblwiMDAxMDEwMTBcIixcclxuXCIwMDEwMTAxMFwiLFxyXG5cIjAwMDAxMDAwXCIsXHJcblwiMDAwMTAxMDBcIixcclxuXCIwMDEwMDAxMFwiLFxyXG5cIjAxMDAwMDAxXCIsXHJcblwiMDAwMDAwMDBcIlxyXG5dLFxyXG4vLyAjMHgxZDMgXHJcblsgXHJcblwiMDAwMDEwMDBcIixcclxuXCIwMDAwMTAwMVwiLFxyXG5cIjAwMTExMDEwXCIsXHJcblwiMDAwMDExMDBcIixcclxuXCIwMDAxMTEwMFwiLFxyXG5cIjAwMTAxMDEwXCIsXHJcblwiMDEwMDEwMDFcIixcclxuXCIwMDAwMDAwMFwiXHJcbl0sXHJcbi8vICMweDFkNCBcclxuWyBcclxuXCIwMDAwMTAwMFwiLFxyXG5cIjAwMDAxMDAwXCIsXHJcblwiMDAxMTExMTBcIixcclxuXCIwMDAwMTAwMFwiLFxyXG5cIjAwMDExMTAwXCIsXHJcblwiMDAxMDEwMTBcIixcclxuXCIwMTAwMTAwMVwiLFxyXG5cIjAwMDAwMDAwXCJcclxuXSxcclxuLy8gIzB4MWQ1IFxyXG5bIFxyXG5cIjAwMDAxMDAwXCIsXHJcblwiMDAwMTAxMDBcIixcclxuXCIwMDExMTExMFwiLFxyXG5cIjAxMDAxMDAxXCIsXHJcblwiMDAxMTExMTBcIixcclxuXCIwMDAxMTEwMFwiLFxyXG5cIjAxMTExMTExXCIsXHJcblwiMDAwMDAwMDBcIlxyXG5dLFxyXG4vLyAjMHgxZDYgXHJcblsgXHJcblwiMDAwMDAwMDBcIixcclxuXCIwMDAwMTAwMFwiLFxyXG5cIjAwMDAxMDAwXCIsXHJcblwiMDAxMTExMTBcIixcclxuXCIwMDAwMTAwMFwiLFxyXG5cIjAwMDAxMDAwXCIsXHJcblwiMDExMTExMTFcIixcclxuXCIwMDAwMDAwMFwiXHJcbl0sXHJcbi8vICMweDFkNyBcclxuWyBcclxuXCIwMDAwMTAwMFwiLFxyXG5cIjAxMDAxMDAwXCIsXHJcblwiMDExMTExMTBcIixcclxuXCIwMTAwMTAwMFwiLFxyXG5cIjAwMTExMTEwXCIsXHJcblwiMDAwMDEwMDBcIixcclxuXCIwMTExMTExMVwiLFxyXG5cIjAwMDAwMDAwXCJcclxuXSxcclxuLy8gIzB4MWQ4IFxyXG5bIFxyXG5cIjAwMTAwMDAwXCIsXHJcblwiMDAxMTExMTBcIixcclxuXCIwMTAwMTAwMFwiLFxyXG5cIjAwMTExMTAwXCIsXHJcblwiMDAxMDEwMDBcIixcclxuXCIwMTExMTExMFwiLFxyXG5cIjAwMDAxMDAwXCIsXHJcblwiMDAwMDAwMDBcIlxyXG5dLFxyXG4vLyAjMHgxZDkgXHJcblsgXHJcblwiMDAwMDAxMDBcIixcclxuXCIwMTExMTExMFwiLFxyXG5cIjAxMDEwMTAwXCIsXHJcblwiMDExMTExMTFcIixcclxuXCIwMTAxMDAxMFwiLFxyXG5cIjAxMTExMTExXCIsXHJcblwiMDAwMDEwMTBcIixcclxuXCIwMDAwMDAwMFwiXHJcbl0sXHJcbi8vICMweDFkYSBcclxuWyBcclxuXCIwMDAwMTAwMFwiLFxyXG5cIjAwMDEwMTAwXCIsXHJcblwiMDAxMDAwMTBcIixcclxuXCIwMTExMTExMVwiLFxyXG5cIjAwMDEwMDEwXCIsXHJcblwiMDAwMTAwMTBcIixcclxuXCIwMDEwMDEwMFwiLFxyXG5cIjAwMDAwMDAwXCJcclxuXSxcclxuLy8gIzB4MWRiIFxyXG5bIFxyXG5cIjAwMTExMDAwXCIsXHJcblwiMDAwMTAwMTBcIixcclxuXCIwMTExMTExMVwiLFxyXG5cIjAwMDEwMTExXCIsXHJcblwiMDAxMTEwMTFcIixcclxuXCIwMTAxMDAxMFwiLFxyXG5cIjAwMDEwMTAwXCIsXHJcblwiMDAwMDAwMDBcIlxyXG5dLFxyXG4vLyAjMHgxZGMgXHJcblsgXHJcblwiMDExMTExMTFcIixcclxuXCIwMTAwMTAwMVwiLFxyXG5cIjAxMDAxMDAxXCIsXHJcblwiMDExMTExMTFcIixcclxuXCIwMTAwMDAwMVwiLFxyXG5cIjAxMDAwMDAxXCIsXHJcblwiMDEwMDAwMDFcIixcclxuXCIwMDAwMDAwMFwiXHJcbl0sXHJcbi8vICMweDFkZCBcclxuWyBcclxuXCIwMDEwMDAxMFwiLFxyXG5cIjAwMDEwMTAwXCIsXHJcblwiMDAxMTExMTBcIixcclxuXCIwMDAwMTAwMFwiLFxyXG5cIjAwMTExMTEwXCIsXHJcblwiMDAwMDEwMDBcIixcclxuXCIwMDAwMTAwMFwiLFxyXG5cIjAwMDAwMDAwXCJcclxuXSxcclxuLy8gIzB4MWRlIFxyXG5bIFxyXG5cIjAwMDAxMTAwXCIsXHJcblwiMDAwMTAwMTBcIixcclxuXCIwMDAxMDAwMFwiLFxyXG5cIjAwMTExMDAwXCIsXHJcblwiMDAwMTAwMDBcIixcclxuXCIwMDAxMDAwMFwiLFxyXG5cIjAwMTExMTEwXCIsXHJcblwiMDAwMDAwMDBcIlxyXG5dLFxyXG4vLyAjMHgxZGYgXHJcblsgXHJcblwiMDAwMDAwMDBcIixcclxuXCIxMTAwMDAwMFwiLFxyXG5cIjExMDAxMDAwXCIsXHJcblwiMDEwMTAxMDBcIixcclxuXCIwMTAxMDEwMFwiLFxyXG5cIjAxMDEwMTAxXCIsXHJcblwiMDAxMDAwMTBcIixcclxuXCIwMDAwMDAwMFwiXHJcbl0sXHJcbi8vICMweDFlMCBcclxuWyBcclxuXCIwMDAwMDAwMFwiLFxyXG5cIjAwMDAwMDAwXCIsXHJcblwiMDAwMDAwMDBcIixcclxuXCIwMDAwMDAwMFwiLFxyXG5cIjAwMDAwMDAwXCIsXHJcblwiMDAwMDAwMTBcIixcclxuXCIxMTExMTExMVwiLFxyXG5cIjAwMDAwMDEwXCJcclxuXSxcclxuLy8gIzB4MWUxIFxyXG5bIFxyXG5cIjAwMDAwMDEwXCIsXHJcblwiMDAwMDAwMTBcIixcclxuXCIwMDAwMDAxMFwiLFxyXG5cIjAwMDAwMDEwXCIsXHJcblwiMDAwMDAwMTBcIixcclxuXCIwMDAwMDAxMFwiLFxyXG5cIjAwMDAwMTExXCIsXHJcblwiMDAwMDAwMTBcIlxyXG5dLFxyXG4vLyAjMHgxZTIgXHJcblsgXHJcblwiMDAwMDAwMTBcIixcclxuXCIwMDAwMDAxMFwiLFxyXG5cIjAwMDAwMDEwXCIsXHJcblwiMDAwMDAwMTBcIixcclxuXCIwMDAwMDAxMFwiLFxyXG5cIjAwMDAwMDEwXCIsXHJcblwiMTExMTExMTFcIixcclxuXCIwMDAwMDAxMFwiXHJcbl0sXHJcbi8vICMweDFlMyBcclxuWyBcclxuXCIwMDAwMDAwMFwiLFxyXG5cIjAwMDAwMDAwXCIsXHJcblwiMDAxMDAwMDBcIixcclxuXCIwMTAxMDAwMFwiLFxyXG5cIjEwMDAxMDAwXCIsXHJcblwiMDAwMDAxMDFcIixcclxuXCIwMDAwMDAxMFwiLFxyXG5cIjAwMDAwMDAwXCJcclxuXSxcclxuLy8gIzB4MWU0IFxyXG5bIFxyXG5cIjAwMDAwMDAwXCIsXHJcblwiMDAwMDExMTBcIixcclxuXCIwMDAxMDAwMVwiLFxyXG5cIjAwMTAwMDEwXCIsXHJcblwiMTEwMDAxMDBcIixcclxuXCIwMDAwMDEwMFwiLFxyXG5cIjAwMDAwMDEwXCIsXHJcblwiMDAwMDAwMDFcIlxyXG5dLFxyXG4vLyAjMHgxZTUgXHJcblsgXHJcblwiMDAwMDAwMDBcIixcclxuXCIxMTExMTExMVwiLFxyXG5cIjAwMDAwMDAwXCIsXHJcblwiMTAwMDAwMDFcIixcclxuXCIwMTAwMDAxMFwiLFxyXG5cIjAxMDAwMDEwXCIsXHJcblwiMTAwMDAwMDFcIixcclxuXCIwMDAwMDAwMFwiXHJcbl0sXHJcbi8vICMweDFlNiBcclxuWyBcclxuXCIwMDAwMDAwMFwiLFxyXG5cIjAxMTEwMDAwXCIsXHJcblwiMTAwMDEwMDBcIixcclxuXCIwMTAwMDEwMFwiLFxyXG5cIjAwMTAwMDExXCIsXHJcblwiMDAxMDAwMDBcIixcclxuXCIwMTAwMDAwMFwiLFxyXG5cIjEwMDAwMDAwXCJcclxuXSxcclxuLy8gIzB4MWU3IFxyXG5bIFxyXG5cIjAwMDAwMDAwXCIsXHJcblwiMTEwMDAxMDBcIixcclxuXCIxMDEwMDEwMFwiLFxyXG5cIjEwMDEwMTAwXCIsXHJcblwiMTAwMDExMTFcIixcclxuXCIxMDAxMDEwMFwiLFxyXG5cIjEwMTAwMTAwXCIsXHJcblwiMTEwMDAxMDBcIlxyXG5dLFxyXG4vLyAjMHgxZTggXHJcblsgXHJcblwiMDAwMDAwMDBcIixcclxuXCIwMDEwMDAxMVwiLFxyXG5cIjAwMTAwMTAxXCIsXHJcblwiMDAxMDEwMDFcIixcclxuXCIxMTExMDAwMVwiLFxyXG5cIjAwMTAxMDAxXCIsXHJcblwiMDAxMDAxMDFcIixcclxuXCIwMDEwMDAxMVwiXHJcbl0sXHJcbi8vICMweDFlOSBcclxuWyBcclxuXCIxMDAwMTAwMFwiLFxyXG5cIjEwMDEwMDAwXCIsXHJcblwiMTAxMDAwMDBcIixcclxuXCIxMTAwMDAwMFwiLFxyXG5cIjExMDAwMDAwXCIsXHJcblwiMTAxMDEwMDBcIixcclxuXCIxMDAxMTAwMFwiLFxyXG5cIjEwMTExMDAwXCJcclxuXSxcclxuLy8gIzB4MWVhIFxyXG5bIFxyXG5cIjEwMTAxMDAwXCIsXHJcblwiMTAxMTAwMDBcIixcclxuXCIxMDExMTAwMFwiLFxyXG5cIjExMDAwMDAwXCIsXHJcblwiMTEwMDAwMDBcIixcclxuXCIxMDEwMDAwMFwiLFxyXG5cIjEwMDEwMDAwXCIsXHJcblwiMTAwMDEwMDBcIlxyXG5dLFxyXG4vLyAjMHgxZWIgXHJcblsgXHJcblwiMTAwMDAwMDBcIixcclxuXCIwMTAwMDAwMFwiLFxyXG5cIjAwMTAwMDAwXCIsXHJcblwiMDAwMTAwMDBcIixcclxuXCIwMDAxMTExMVwiLFxyXG5cIjAwMTAwMDAwXCIsXHJcblwiMDEwMDAwMDBcIixcclxuXCIxMDAwMDAwMFwiXHJcbl0sXHJcbi8vICMweDFlYyBcclxuWyBcclxuXCIwMDAwMDAwMFwiLFxyXG5cIjAwMDAwMDAwXCIsXHJcblwiMDAxMDAxMDBcIixcclxuXCIwMDEwMDEwMFwiLFxyXG5cIjExMTAwMTExXCIsXHJcblwiMDAxMDAxMDBcIixcclxuXCIwMDEwMDEwMFwiLFxyXG5cIjAwMDAwMDAwXCJcclxuXSxcclxuLy8gIzB4MWVkIFxyXG5bIFxyXG5cIjAwMDAxMDAwXCIsXHJcblwiMDAwMDEwMDBcIixcclxuXCIwMDExMTExMFwiLFxyXG5cIjAwMDAwMDAwXCIsXHJcblwiMDAwMDAwMDBcIixcclxuXCIwMDExMTExMFwiLFxyXG5cIjAwMDAxMDAwXCIsXHJcblwiMDAwMDEwMDBcIlxyXG5dLFxyXG4vLyAjMHgxZWUgXHJcblsgXHJcblwiMDAwMDEwMDBcIixcclxuXCIwMDAxMDAwMFwiLFxyXG5cIjAwMTAwMDAwXCIsXHJcblwiMDAwMTAwMDBcIixcclxuXCIwMDAwMTAwMFwiLFxyXG5cIjAwMDAwMTAwXCIsXHJcblwiMDAwMDAwMTBcIixcclxuXCIwMDAwMDEwMFwiXHJcbl0sXHJcbi8vICMweDFlZiBcclxuWyBcclxuXCIwMTAxMDEwMVwiLFxyXG5cIjEwMTAxMDEwXCIsXHJcblwiMDEwMTAxMDFcIixcclxuXCIxMDEwMTAxMFwiLFxyXG5cIjAxMDEwMTAxXCIsXHJcblwiMTAxMDEwMTBcIixcclxuXCIwMTAxMDEwMVwiLFxyXG5cIjEwMTAxMDEwXCJcclxuXSxcclxuLy8gIzB4MWYwIFxyXG5bIFxyXG5cIjAwMDAwMDAwXCIsXHJcblwiMDAwMDAwMDBcIixcclxuXCIwMDAwMDAwMFwiLFxyXG5cIjAwMDAwMDAwXCIsXHJcblwiMDAwMDAwMDBcIixcclxuXCIwMDAwMDAwMFwiLFxyXG5cIjAwMDAwMDAwXCIsXHJcblwiMDAwMDAwMDBcIlxyXG5dLFxyXG4vLyAjMHgxZjEgXHJcblsgXHJcblwiMDAwMDAwMDBcIixcclxuXCIwMTExMDAwMFwiLFxyXG5cIjAxMTEwMDAwXCIsXHJcblwiMDExMTAwMDBcIixcclxuXCIwMDAwMDAwMFwiLFxyXG5cIjAwMDAwMDAwXCIsXHJcblwiMDAwMDAwMDBcIixcclxuXCIwMDAwMDAwMFwiXHJcbl0sXHJcbi8vICMweDFmMiBcclxuWyBcclxuXCIwMDAwMDAwMFwiLFxyXG5cIjAwMDAwMTExXCIsXHJcblwiMDAwMDAxMTFcIixcclxuXCIwMDAwMDExMVwiLFxyXG5cIjAwMDAwMDAwXCIsXHJcblwiMDAwMDAwMDBcIixcclxuXCIwMDAwMDAwMFwiLFxyXG5cIjAwMDAwMDAwXCJcclxuXSxcclxuLy8gIzB4MWYzIFxyXG5bIFxyXG5cIjAwMDAwMDAwXCIsXHJcblwiMDExMTAxMTFcIixcclxuXCIwMTExMDExMVwiLFxyXG5cIjAxMTEwMTExXCIsXHJcblwiMDAwMDAwMDBcIixcclxuXCIwMDAwMDAwMFwiLFxyXG5cIjAwMDAwMDAwXCIsXHJcblwiMDAwMDAwMDBcIlxyXG5dLFxyXG4vLyAjMHgxZjQgXHJcblsgXHJcblwiMDAwMDAwMDBcIixcclxuXCIwMDAwMDAwMFwiLFxyXG5cIjAwMDAwMDAwXCIsXHJcblwiMDAwMDAwMDBcIixcclxuXCIwMDAwMDAwMFwiLFxyXG5cIjAxMTEwMDAwXCIsXHJcblwiMDExMTAwMDBcIixcclxuXCIwMTExMDAwMFwiXHJcbl0sXHJcbi8vICMweDFmNSBcclxuWyBcclxuXCIwMDAwMDAwMFwiLFxyXG5cIjAxMTEwMDAwXCIsXHJcblwiMDExMTAwMDBcIixcclxuXCIwMTExMDAwMFwiLFxyXG5cIjAwMDAwMDAwXCIsXHJcblwiMDExMTAwMDBcIixcclxuXCIwMTExMDAwMFwiLFxyXG5cIjAxMTEwMDAwXCJcclxuXSxcclxuLy8gIzB4MWY2IFxyXG5bIFxyXG5cIjAwMDAwMDAwXCIsXHJcblwiMDAwMDAxMTFcIixcclxuXCIwMDAwMDExMVwiLFxyXG5cIjAwMDAwMTExXCIsXHJcblwiMDAwMDAwMDBcIixcclxuXCIwMTExMDAwMFwiLFxyXG5cIjAxMTEwMDAwXCIsXHJcblwiMDExMTAwMDBcIlxyXG5dLFxyXG4vLyAjMHgxZjcgXHJcblsgXHJcblwiMDAwMDAwMDBcIixcclxuXCIwMTExMDExMVwiLFxyXG5cIjAxMTEwMTExXCIsXHJcblwiMDExMTAxMTFcIixcclxuXCIwMDAwMDAwMFwiLFxyXG5cIjAxMTEwMDAwXCIsXHJcblwiMDExMTAwMDBcIixcclxuXCIwMTExMDAwMFwiXHJcbl0sXHJcbi8vICMweDFmOCBcclxuWyBcclxuXCIwMDAwMDAwMFwiLFxyXG5cIjAwMDAwMDAwXCIsXHJcblwiMDAwMDAwMDBcIixcclxuXCIwMDAwMDAwMFwiLFxyXG5cIjAwMDAwMDAwXCIsXHJcblwiMDAwMDAxMTFcIixcclxuXCIwMDAwMDExMVwiLFxyXG5cIjAwMDAwMTExXCJcclxuXSxcclxuLy8gIzB4MWY5IFxyXG5bIFxyXG5cIjAwMDAwMDAwXCIsXHJcblwiMDExMTAwMDBcIixcclxuXCIwMTExMDAwMFwiLFxyXG5cIjAxMTEwMDAwXCIsXHJcblwiMDAwMDAwMDBcIixcclxuXCIwMDAwMDExMVwiLFxyXG5cIjAwMDAwMTExXCIsXHJcblwiMDAwMDAxMTFcIlxyXG5dLFxyXG4vLyAjMHgxZmEgXHJcblsgXHJcblwiMDAwMDAwMDBcIixcclxuXCIwMDAwMDExMVwiLFxyXG5cIjAwMDAwMTExXCIsXHJcblwiMDAwMDAxMTFcIixcclxuXCIwMDAwMDAwMFwiLFxyXG5cIjAwMDAwMTExXCIsXHJcblwiMDAwMDAxMTFcIixcclxuXCIwMDAwMDExMVwiXHJcbl0sXHJcbi8vICMweDFmYiBcclxuWyBcclxuXCIwMDAwMDAwMFwiLFxyXG5cIjAxMTEwMTExXCIsXHJcblwiMDExMTAxMTFcIixcclxuXCIwMTExMDExMVwiLFxyXG5cIjAwMDAwMDAwXCIsXHJcblwiMDAwMDAxMTFcIixcclxuXCIwMDAwMDExMVwiLFxyXG5cIjAwMDAwMTExXCJcclxuXSxcclxuLy8gIzB4MWZjIFxyXG5bIFxyXG5cIjAwMDAwMDAwXCIsXHJcblwiMDAwMDAwMDBcIixcclxuXCIwMDAwMDAwMFwiLFxyXG5cIjAwMDAwMDAwXCIsXHJcblwiMDAwMDAwMDBcIixcclxuXCIwMTExMDExMVwiLFxyXG5cIjAxMTEwMTExXCIsXHJcblwiMDExMTAxMTFcIlxyXG5dLFxyXG4vLyAjMHgxZmQgXHJcblsgXHJcblwiMDAwMDAwMDBcIixcclxuXCIwMTExMDAwMFwiLFxyXG5cIjAxMTEwMDAwXCIsXHJcblwiMDExMTAwMDBcIixcclxuXCIwMDAwMDAwMFwiLFxyXG5cIjAxMTEwMTExXCIsXHJcblwiMDExMTAxMTFcIixcclxuXCIwMTExMDExMVwiXSxcclxuLy8gIzB4MWZlIFxyXG5bIFxyXG5cIjAwMDAwMDAwXCIsXHJcblwiMDAwMDAxMTFcIixcclxuXCIwMDAwMDExMVwiLFxyXG5cIjAwMDAwMTExXCIsXHJcblwiMDAwMDAwMDBcIixcclxuXCIwMTExMDExMVwiLFxyXG5cIjAxMTEwMTExXCIsXHJcblwiMDExMTAxMTFcIlxyXG5dLC8vICMweDFmZiBcclxuWyBcclxuXCIwMDAwMDAwMFwiLFxyXG5cIjAxMTEwMTExXCIsXHJcblwiMDExMTAxMTFcIixcclxuXCIwMTExMDExMVwiLFxyXG5cIjAwMDAwMDAwXCIsXHJcblwiMDExMTAxMTFcIixcclxuXCIwMTExMDExMVwiLFxyXG5cIjAxMTEwMTExXCJcclxuXVxyXG5dO1xyXG5cclxuIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbmltcG9ydCBcImJhYmVsLXBvbHlmaWxsXCI7XHJcbmltcG9ydCB7Zm9udERhdGF9IGZyb20gXCIuL216NzAwZm9uXCI7XHJcblxyXG4vLyDjg5Xjg6zjg7zjg6Djg5Djg4Pjg5XjgqHjgavmm7jjgY3ovrzjgoDjgrfjgqfjg7zjg4Djg7xcclxuLy8gdmFyIHZzaGFkZXJGU3JjID0gXHJcbi8vIGBwcmVjaXNpb24gbWVkaXVtcCBmbG9hdDtcclxuLy8gYXR0cmlidXRlIHZlYzIgcG9zaXRpb247XHJcbi8vIGF0dHJpYnV0ZSBmbG9hdCBjb2xvcjtcclxuLy8gdW5pZm9ybSB2ZWMyIGJ1ZmZlclNpemU7XHJcbi8vIHZhcnlpbmcgZmxvYXQgdmNvbG9yO1xyXG4gXHJcbi8vIHZvaWQgbWFpbih2b2lkKSB7XHJcbi8vICAgICB2ZWMyIGJzID0gYnVmZmVyU2l6ZSAtIGJ1ZmZlclNpemUgLyAgMi4wO1xyXG4vLyAgICAgYnMueSA9IC1icy55O1xyXG4vLyAgICAgZ2xfUG9zaXRpb24gPSB2ZWM0KHBvc2l0aW9uIC8gYnMsIDAuMCwxLjApO1xyXG4vLyAgICAgdmNvbG9yID0gY29sb3I7XHJcbi8vIH1cclxuLy8gYDtcclxuXHJcbi8vIHZhciBmc2hhZGVyRlNyYyA9IFxyXG4vLyBgcHJlY2lzaW9uIG1lZGl1bXAgZmxvYXQ7XHJcbi8vIHZhcnlpbmcgZmxvYXQgdmNvbG9yO1xyXG4vLyB2b2lkIG1haW4odm9pZCl7XHJcbi8vICBnbF9GcmFnQ29sb3IgPSB2ZWM0KHZjb2xvciwgMC4gLCAwLiAsIDEuKTtcclxuLy8gfVxyXG4vLyBgO1xyXG5cclxuLy8g44OR44Os44OD44OI44Ko44Of44Ol44Os44O844OI44K344Kn44O844OA44O8XHJcbnZhciB2c2hhZGVyUFNyYyA9IFxyXG5gcHJlY2lzaW9uIG1lZGl1bXAgZmxvYXQ7XHJcbmF0dHJpYnV0ZSB2ZWMyIHBvc2l0aW9uO1xyXG5hdHRyaWJ1dGUgdmVjMiB0ZXh0dXJlX2Nvb3JkO1xyXG52YXJ5aW5nIHZlYzIgdnRleHR1cmVfY29vcmQ7XHJcbiBcclxudm9pZCBtYWluKHZvaWQpIHtcclxuICAgIGdsX1Bvc2l0aW9uID0gdmVjNChwb3NpdGlvbiwwLjAsMS4wKTtcclxuICAgIHZ0ZXh0dXJlX2Nvb3JkID0gdGV4dHVyZV9jb29yZDtcclxufVxyXG5gO1xyXG5cclxudmFyIGZzaGFkZXJQU3JjID0gXHJcbmBwcmVjaXNpb24gbWVkaXVtcCBmbG9hdDtcclxuXHJcbnVuaWZvcm0gc2FtcGxlcjJEIHRleHR1cmVCO1xyXG51bmlmb3JtIHNhbXBsZXIyRCB0ZXh0dXJlRztcclxudW5pZm9ybSBzYW1wbGVyMkQgdGV4dHVyZVI7XHJcbnVuaWZvcm0gc2FtcGxlcjJEIHBhbGxldF9jb2xvcjtcclxudW5pZm9ybSBzYW1wbGVyMkQgdGV4dHVyZUZvbnQ7XHJcbnVuaWZvcm0gc2FtcGxlcjJEIHRleHR1cmVDaGFyQ29kZTtcclxudW5pZm9ybSBzYW1wbGVyMkQgdGV4dHVyZUNoYXJBdHRyO1xyXG51bmlmb3JtIGZsb2F0IHRpbWU7XHJcblxyXG52YXJ5aW5nIHZlYzIgdnRleHR1cmVfY29vcmQ7XHJcblxyXG4vLyDjgrDjg6njg5XjgqPjg4Pjgq/ooajnpLpcclxudmVjNCBncmFwaGljUGxhbmUodm9pZClcclxue1xyXG4gIC8v44OG44Kv44K544OB44Oj5bqn5qiZ44KI44KK44OT44OD44OI5L2N572u44KS5rGC44KB44CB44Gd44Gu44OT44OD44OI44GM56uL44Gj44GfMumAsuaVsOWApOOCkuW+l+OCi+OAglxyXG4gIGZsb2F0IHQgPSBleHAyKGZsb29yKG1vZCh2dGV4dHVyZV9jb29yZC54ICogNTEyLjAsOC4wKSkpO1xyXG4gIC8vIFJHQuWQhOODl+ODrOODvOODs+OBruePvuWcqOW6p+aomeOBruODkOOCpOODiOODh+ODvOOCv+OCkuiqreOBv+i+vOOCgFxyXG4gIHZlYzQgcnQgPSB0ZXh0dXJlMkQodGV4dHVyZVIsIHZ0ZXh0dXJlX2Nvb3JkKTtcclxuICB2ZWM0IGd0ID0gdGV4dHVyZTJEKHRleHR1cmVHLCB2dGV4dHVyZV9jb29yZCk7XHJcbiAgdmVjNCBidCA9IHRleHR1cmUyRCh0ZXh0dXJlQiwgdnRleHR1cmVfY29vcmQpO1xyXG4gIFxyXG4gIC8vIOODkOOCpOODiOODh+ODvOOCv+OBruS4reOBp+ODk+ODg+ODiOOBjOeri+OBo+OBpuOBhOOCi+OBi+OBqeOBhuOBi+OCkuiqv+OBueOCi1xyXG4gIC8vIFLjg5fjg6zjg7zjg7NcclxuICBmbG9hdCByID0gZmxvb3IobW9kKG1pbihydC54ICogMjU2LjAsMjU1LjApIC8gdCwyLjApKSAqIDQuMDtcclxuICAvLyBH44OX44Os44O844OzXHJcbiAgZmxvYXQgZyA9IGZsb29yKG1vZChtaW4oZ3QueCAqIDI1Ni4wLDI1NS4wKSAvIHQsMi4wKSkgKiAyLjA7XHJcbiAgLy8gQuODl+ODrOODvOODs1xyXG4gIGZsb2F0IGIgPSBmbG9vcihtb2QobWluKGJ0LnggKiAyNTYuMCwyNTUuMCkgLyB0LDIuMCkpO1xyXG5cclxuICAvLyDlkIToibLjga7lgKTjgpLotrPjgZfjgabmraPopo/ljJbjgpLooYzjgYTjgIHjg5Hjg6zjg4Pjg4jjgqTjg7Pjg4fjg4Pjgq/jgrnjgYvjgonlrp/pmpvjga7oibLjgpLlvpfjgosgXHJcbiAgdmVjNCBwID0gdGV4dHVyZTJEKHBhbGxldF9jb2xvcix2ZWMyKChyICsgZyArIGIpIC8gOC4wICwwLjUpKTtcclxuICBmbG9hdCBpID0gbWluKHAueCAqIDI1Ni4wLDI1NS4wKTtcclxuICBmbG9hdCBhciA9IGZsb29yKG1vZChpICogMC41LDIuMCkpOyAvLyBiaXQzXHJcbiAgZmxvYXQgYWcgPSBmbG9vcihtb2QoaSAqIDAuMjUsMi4wKSk7ICAvLyBiaXQyXHJcbiAgZmxvYXQgYWIgPSBmbG9vcihtb2QoaSwyLjApKTsgLy8gYml0MVxyXG4gIHJldHVybiB2ZWM0KGFyLGFnLGFiLDEuMCk7XHJcbn1cclxuXHJcbi8vIOaWh+Wtl+ihqOekulxyXG52ZWM0IHRleHRQbGFuZSh2b2lkKXtcclxuICAvLyDjgq3jg6Pjg6njgq/jgr/jgrPjg7zjg4njgpLoqq3jgb/lh7rjgZdcclxuICB2ZWM0IGNjdCA9IHRleHR1cmUyRCh0ZXh0dXJlQ2hhckNvZGUsIHZ0ZXh0dXJlX2Nvb3JkKTtcclxuICBmbG9hdCBjYyA9IG1pbihjY3QueCAqIDI1Ni4wLDI1NS4wKTsvLyDjgq3jg6Pjg6njgq/jgr/jg7zjgrPjg7zjg4lcclxuXHJcbiAgLy8g44Ki44OI44Oq44OT44Ol44O844OI44KS6Kqt44G/5Ye644GXXHJcbiAgdmVjNCBhdHRydCA9IHRleHR1cmUyRCh0ZXh0dXJlQ2hhckF0dHIsIHZ0ZXh0dXJlX2Nvb3JkKTtcclxuICBcclxuICAvLyDooajnpLrlr77osaHjga7mloflrZfjga7jg5Pjg4Pjg4jkvY3nva7jgpLmsYLjgoHjgotcclxuICBmbG9hdCB4ID0gZXhwMihmbG9vcihtb2QodnRleHR1cmVfY29vcmQueCAqIDUxMi4wLDguMCkpKTtcclxuICAvLyDooajnpLrlr77osaHjga7mloflrZfjga5Z5L2N572u44KS5rGC44KB44KLXHJcbiAgZmxvYXQgeSA9IGZsb29yKG1vZCh2dGV4dHVyZV9jb29yZC55ICogMjU2LjAsOC4wKSk7XHJcbiAgXHJcbiAgLy8g44Ki44OI44Oq44OT44Ol44O844OI44Gu6KmV5L6hIFxyXG5cclxuICBmbG9hdCBpID0gbWluKGF0dHJ0LnggKiAyNTYuMCwyNTUuMCk7Ly8g44Ki44OI44Oq44OT44Ol44O844OI44OH44O844K/XHJcbiAgXHJcbiAgLy8g44Kt44Oj44Op44Kv44K/44K744OD44OIKDAuMCAuLiDjgrvjg4Pjg4gwLCAxLjAgLi4g44K744OD44OIMSApXHJcbiAgZmxvYXQgYXR0ID0gZmxvb3IobW9kKGkgLyAxMjguMCwyLjApKSAqIDguMDsvLyBiaXQgN1xyXG5cclxuICAvLyDmloflrZfoibJcclxuICBmbG9hdCBjY2cgPSBmbG9vcihtb2QoaSAvIDY0LjAsMi4wKSk7Ly8gYml0IDZcclxuICBmbG9hdCBjY3IgPSBmbG9vcihtb2QoaSAvIDMyLjAsMi4wKSk7Ly8gYml0IDVcclxuICBmbG9hdCBjY2IgPSBmbG9vcihtb2QoaSAvIDE2LjAsMi4wKSk7Ly8gYml0IDRcclxuXHJcbiAgLy8g6IOM5pmv6ImyXHJcbiAgZmxvYXQgYmdnID0gZmxvb3IobW9kKGkgLyA0LjAsMi4wKSk7Ly8gYml0IDJcclxuICBmbG9hdCBiZ3IgPSBmbG9vcihtb2QoaSAvIDIuMCwyLjApKTsvLyBiaXQgMVxyXG4gIGZsb2F0IGJnYiA9IGZsb29yKG1vZChpICwyLjApKTsvLyBiaXQgMFxyXG4gIFxyXG5cclxuICAvLyDjg5Xjgqnjg7Pjg4joqq3jgb/lh7rjgZfkvY3nva5cclxuICB2ZWMyIGZvbnRwb3MgPSB2ZWMyKGNjIC8gMjU2LjAsKHkgKyBhdHQpIC8gMTYuMCk7XHJcbiAgLy8g44OV44Kp44Oz44OI44OH44O844K/44Gu6Kqt44G/5Ye644GXXHJcbiAgdmVjNCBwaXhCeXRlID0gdGV4dHVyZTJEKHRleHR1cmVGb250LGZvbnRwb3MpO1xyXG4gIC8vIOaMh+WumuS9jee9ruOBruODk+ODg+ODiOOBjOeri+OBo+OBpuOBhOOCi+OBi+ODgeOCp+ODg+OCr1xyXG4gIGZsb2F0IHBpeEJpdCA9IGZsb29yKG1vZChtaW4ocGl4Qnl0ZS54ICogMjU2LjAsMjU1LjApIC8geCwyLjApKTtcclxuICBcclxuICBpZihwaXhCaXQgPT0gMS4wKXtcclxuICAgIC8vIOODk+ODg+ODiOOBjOeri+OBo+OBpuOBhOOCi+OBqOOBjeOBr+OAgeaWh+Wtl+iJsuOCkuioreWumlxyXG4gICAgcmV0dXJuIHZlYzQoY2NyLGNjZyxjY2IsMS4wKTtcclxuICB9IFxyXG4gIC8vIOODk+ODg+ODiOOBjOeri+OBo+OBpuOBhOOBquOBhOOBqOOBjeOBr+iDjOaZr+iJsuOCkuioreWumlxyXG4gIHJldHVybiB2ZWM0KGJncixiZ2IsYmdnLDEuMCk7XHJcbn1cclxuXHJcbnZvaWQgbWFpbih2b2lkKXtcclxuICB2ZWM0IHRleHRDb2xvciA9IHRleHRQbGFuZSgpO1xyXG4gIGlmKCh0ZXh0Q29sb3IuciArIHRleHRDb2xvci5nICsgdGV4dENvbG9yLmIpID4gMC4wKXtcclxuICAgIGdsX0ZyYWdDb2xvciA9IHRleHRDb2xvcjsgIFxyXG4gIH0gZWxzZSB7XHJcbiAgICB2ZWM0IGNvbG9yID0gZ3JhcGhpY1BsYW5lKCk7XHJcbiAgICBnbF9GcmFnQ29sb3IgPSBjb2xvcjtcclxuICB9XHJcbn1cclxuYDtcclxuLy8gYHByZWNpc2lvbiBtZWRpdW1wIGZsb2F0O1xyXG5cclxuLy8gdW5pZm9ybSBzYW1wbGVyMkQgdGV4O1xyXG4vLyB1bmlmb3JtIHNhbXBsZXIyRCBwYWxsZXRfY29sb3I7XHJcblxyXG4vLyB2YXJ5aW5nIHZlYzIgdnRleHR1cmVfY29vcmQ7XHJcblxyXG4vLyB2b2lkIG1haW4odm9pZCl7XHJcbi8vICB2ZWM0IHNhbXBjb2xvciA9IHRleHR1cmUyRCh0ZXgsIHZ0ZXh0dXJlX2Nvb3JkKTtcclxuLy8gIHZlYzQgY29sb3IgPSB0ZXh0dXJlMkQocGFsbGV0X2NvbG9yLHZlYzIoc2FtcGNvbG9yLnggKiAzMi4wLDAuNSkpO1xyXG4vLyAgZ2xfRnJhZ0NvbG9yID0gY29sb3I7XHJcbi8vIH1cclxuLy8gYDtcclxuXHJcblxyXG53aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignbG9hZCcsKCk9PntcclxuICAvLyDjgrPjg7Pjgr3jg7zjg6vjga7kvZzmiJBcclxuICB2YXIgdmlldyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd2aWV3Jyk7XHJcbiAgdmFyIGdsO1xyXG4gIHZhciB3aWR0aCxoZWlnaHQ7XHJcbiAgY29uc3QgdmlydHVhbFdpZHRoID0gMzIwLHZpcnR1YWxIZWlnaHQgPSAyNDA7XHJcbiAgY29uc3QgYnVmZmVyV2lkdGggPSA1MTIgLGJ1ZmZlckhlaWdodCA9IDI1NixidWZmZXJYU2l6ZSA9IGJ1ZmZlcldpZHRoIC8gODtcclxuICBjb25zdCBmb250VGV4V2lkdGggPSAyNTYsZm9udFRleEhlaWdodCA9IDE2Oy8vOCAqIDE2ICogMjtcclxuICBjb25zdCBjaGFyQ29kZUJ1ZmZlcldpZHRoID0gNTEyIC8gOCxjaGFyQ29kZUJ1ZmZlckhlaWdodCA9IDMyO1xyXG4gIHZhciBydW5CdG4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncnVuJyksXHJcbiAgICAgIHBhdXNlQnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3BhdXNlJyksXHJcbiAgICAgIHN0b3BCdG4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc3RvcCcpO1xyXG4vLyAgICAgIHJlc2V0QnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Jlc2V0Jyk7XHJcblx0dmFyIGJ1ZmZlckIgPSBuZXcgVWludDhBcnJheShidWZmZXJYU2l6ZSAqIGJ1ZmZlckhlaWdodCksXHJcbiAgYnVmZmVyRyA9IG5ldyBVaW50OEFycmF5KGJ1ZmZlclhTaXplICogYnVmZmVySGVpZ2h0KSxcclxuICBidWZmZXJSID0gbmV3IFVpbnQ4QXJyYXkoYnVmZmVyWFNpemUgKiBidWZmZXJIZWlnaHQpLFxyXG4gIHBhbGxldENvbG9ycyA9IG5ldyBVaW50OEFycmF5KFtcclxuICAgIDAsMSwyLDMsNCw1LDYsNyAgICBcclxuICBdKTtcclxuICB2YXIgY2hhckNvZGVCdWZmZXIgPSBuZXcgVWludDhBcnJheShjaGFyQ29kZUJ1ZmZlcldpZHRoICogY2hhckNvZGVCdWZmZXJIZWlnaHQpLFxyXG4gICAgICBjaGFyQXR0ckJ1ZmZlciA9IG5ldyBVaW50OEFycmF5KGNoYXJDb2RlQnVmZmVyV2lkdGggKiBjaGFyQ29kZUJ1ZmZlckhlaWdodCk7XHJcbiAgdmFyIGZvbnRCdWZmZXIgPSBuZXcgVWludDhBcnJheShmb250VGV4V2lkdGggKiBmb250VGV4SGVpZ2h0KTtcclxuICBcclxuICBmdW5jdGlvbiByZXYoeCl7XHJcbiAgICB4ID0gKHggJiAweDU1NTU1NTU1KSA8PCAxIHwgKHggPj4+IDEpICYgMHg1NTU1NTU1NTtcclxuICAgIHggPSAoeCAmIDB4MzMzMzMzMzMpIDw8IDIgfCAoeCA+Pj4gMikgJiAweDMzMzMzMzMzO1xyXG4gICAgeCA9ICh4ICYgMHgwRjBGMEYwRikgPDwgNCB8ICh4ID4+PiA0KSAmIDB4MEYwRjBGMEY7XHJcbiAgICB4ID0gKHggPDwgMjQpIHwgKCh4ICYgMHhGRjAwKSA8PCA4KSB8XHJcbiAgICAgICgoeCA+Pj4gOCkgJiAweEZGMDApIHwgKHggPj4+IDI0KTtcclxuICAgIHJldHVybiB4O1xyXG4gIH1cclxuICBcclxuICAvLyDjg5Xjgqnjg7Pjg4jjg4fjg7zjgr/jga7oqq3jgb/ovrzjgb9cclxuICB7XHJcbiAgICBsZXQgaWR4ID0gMDtcclxuICAgIGxldCBvZmZzZXQgPSAwO1xyXG4gICAgZm9udERhdGEuZm9yRWFjaCgoZCxpKT0+e1xyXG4gICAgICBvZmZzZXQgPSAoKGkgLyAyNTYpIHwgMCkgKiA4OyBcclxuICAgICAgaWR4ID0gaSAlIDI1NjtcclxuICAgICAgZC5mb3JFYWNoKChieXRlQ2hhcixpeSk9PntcclxuICAgICAgICBsZXQgYnl0ZSA9IHBhcnNlSW50KGJ5dGVDaGFyLDIpO1xyXG4gICAgICAgIGZvbnRCdWZmZXJbaWR4ICsgKGl5ICsgb2Zmc2V0KSAqIDI1Nl0gPSByZXYoYnl0ZSkgPj4+IDI0O1xyXG4gICAgICB9KTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgdmFyIG1haW47XHJcbiAgICAgIFxyXG4gIHJ1bkJ0bi5kaXNhYmxlZCA9IFwiZGlzYWJsZWRcIjtcclxuICBwYXVzZUJ0bi5kaXNhYmxlZCA9IFwiZGlzYWJsZWRcIjtcclxuICBzdG9wQnRuLmRpc2FibGVkID0gXCJkaXNhYmxlZFwiO1xyXG4vLyAgcmVzZXRCdG4uZGlzYWJsZWQgPSBcImRpc2FibGVkXCI7XHJcblxyXG4gIGNvbnN0IFNUQVRVUyA9IHtcclxuICAgIHN0b3A6MCxcclxuICAgIHJ1bjoxLFxyXG4gICAgcGF1c2U6MixcclxuICAgIHJlc2V0OjNcclxuICB9O1xyXG5cclxuICB2YXIgc3RhdHVzID0gU1RBVFVTLnN0b3A7XHJcbiAgICAgIFxyXG4gIC8vIGNvbi53aWR0aCA9IGNvbi5vZmZzZXRXaWR0aDtcclxuICAvLyBjb24uaGVpZ2h0ID0gKGNvbi5vZmZzZXRXaWR0aCAqIDMgLyA0KSB8IDAgO1xyXG4gIGdsID0gdmlldy5nZXRDb250ZXh0KCd3ZWJnbCcse2FudGlhbGlhczpmYWxzZX0pIHx8IHZpZXcuZ2V0Q29udGV4dCgnZXhwZXJpbWVudGFsLXdlYmdsJyx7YW50aWFsaWFzOmZhbHNlfSk7XHJcblxyXG4gIFxyXG4gIC8vIOOCt+OCp+ODvOODgOOBruS9nOaIkFxyXG4gIGZ1bmN0aW9uIGNyZWF0ZVNoYWRlcihzcmMsc2hhZGVyVHlwZSl7XHJcbiAgICBsZXQgc2hhZGVyO1xyXG4gICAgc2hhZGVyID0gZ2wuY3JlYXRlU2hhZGVyKHNoYWRlclR5cGUpO1xyXG4gICAgZ2wuc2hhZGVyU291cmNlKHNoYWRlcixzcmMpO1xyXG4gICAgZ2wuY29tcGlsZVNoYWRlcihzaGFkZXIpO1xyXG4gICAgaWYoIWdsLmdldFNoYWRlclBhcmFtZXRlcihzaGFkZXIsIGdsLkNPTVBJTEVfU1RBVFVTKSl7XHJcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGdsLmdldFNoYWRlckluZm9Mb2coc2hhZGVyKSk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gc2hhZGVyO1xyXG4gIH1cclxuICBcclxuICAvLyDjg5fjg63jgrDjg6njg6Djgqrjg5bjgrjjgqfjgq/jg4jjga7kvZzmiJBcclxuICBmdW5jdGlvbiBjcmVhdGVQcm9ncmFtKHZzLGZzKXtcclxuICAgIC8vIOODl+ODreOCsOODqeODoOOCquODluOCuOOCp+OCr+ODiOOBrueUn+aIkFxyXG4gICAgdmFyIHByb2dyYW0gPSBnbC5jcmVhdGVQcm9ncmFtKCk7XHJcbiAgICBcclxuICAgIC8vIOODl+ODreOCsOODqeODoOOCquODluOCuOOCp+OCr+ODiOOBq+OCt+OCp+ODvOODgOOCkuWJsuOCiuW9k+OBpuOCi1xyXG4gICAgZ2wuYXR0YWNoU2hhZGVyKHByb2dyYW0sIHZzKTtcclxuICAgIGdsLmF0dGFjaFNoYWRlcihwcm9ncmFtLCBmcyk7XHJcbiAgICBcclxuICAgIC8vIOOCt+OCp+ODvOODgOOCkuODquODs+OCr1xyXG4gICAgZ2wubGlua1Byb2dyYW0ocHJvZ3JhbSk7XHJcbiAgICBcclxuICAgIC8vIOOCt+OCp+ODvOODgOOBruODquODs+OCr+OBjOato+OBl+OBj+ihjOOBquOCj+OCjOOBn+OBi+ODgeOCp+ODg+OCr1xyXG4gICAgaWYoIWdsLmdldFByb2dyYW1QYXJhbWV0ZXIocHJvZ3JhbSwgZ2wuTElOS19TVEFUVVMpKXtcclxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoZ2wuZ2V0UHJvZ3JhbUluZm9Mb2cocHJvZ3JhbSkpO1xyXG4gICAgfSAgICBcclxuICAgIGdsLnVzZVByb2dyYW0ocHJvZ3JhbSk7XHJcbiAgICByZXR1cm4gcHJvZ3JhbTtcclxuICB9XHJcbiAgXHJcbiAgLy9WQk/jga7kvZzmiJBcclxuICBmdW5jdGlvbiBjcmVhdGVWYm8oZGF0YSl7XHJcbiAgICB2YXIgdmJvID0gZ2wuY3JlYXRlQnVmZmVyKCk7XHJcbiAgICBnbC5iaW5kQnVmZmVyKGdsLkFSUkFZX0JVRkZFUiwgdmJvKTtcclxuICAgIGdsLmJ1ZmZlckRhdGEoZ2wuQVJSQVlfQlVGRkVSLCBuZXcgRmxvYXQzMkFycmF5KGRhdGEpLCBnbC5TVEFUSUNfRFJBVyk7XHJcbiAgICBnbC5iaW5kQnVmZmVyKGdsLkFSUkFZX0JVRkZFUiwgbnVsbCk7XHJcbiAgICByZXR1cm4gdmJvO1xyXG4gIH1cclxuICBcclxuICBcclxuICAvLyDjg5Xjg6zjg7zjg6Djg5Djg4Pjg5XjgqHjgpLjgqrjg5bjgrjjgqfjgq/jg4jjgajjgZfjgabnlJ/miJDjgZnjgovplqLmlbBcclxuICBmdW5jdGlvbiBjcmVhdGVGcmFtZWJ1ZmZlcih3aWR0aCwgaGVpZ2h0KXtcclxuICAgIHZhciBmcmFtZUJ1ZmZlciA9IGdsLmNyZWF0ZUZyYW1lYnVmZmVyKCk7XHJcbiAgICBcclxuICAgIGdsLmJpbmRGcmFtZWJ1ZmZlcihnbC5GUkFNRUJVRkZFUiwgZnJhbWVCdWZmZXIpO1xyXG4gICAgXHJcbiAgICB2YXIgZGVwdGhSZW5kZXJCdWZmZXIgPSBnbC5jcmVhdGVSZW5kZXJidWZmZXIoKTtcclxuICAgIGdsLmJpbmRSZW5kZXJidWZmZXIoZ2wuUkVOREVSQlVGRkVSLCBkZXB0aFJlbmRlckJ1ZmZlcik7XHJcbiAgICBnbC5yZW5kZXJidWZmZXJTdG9yYWdlKGdsLlJFTkRFUkJVRkZFUiwgZ2wuREVQVEhfQ09NUE9ORU5UMTYsIHdpZHRoLCBoZWlnaHQpO1xyXG4gICAgZ2wuZnJhbWVidWZmZXJSZW5kZXJidWZmZXIoZ2wuRlJBTUVCVUZGRVIsIGdsLkRFUFRIX0FUVEFDSE1FTlQsIGdsLlJFTkRFUkJVRkZFUiwgZGVwdGhSZW5kZXJCdWZmZXIpO1xyXG4gICAgXHJcbiAgICB2YXIgZlRleHR1cmUgPSBnbC5jcmVhdGVUZXh0dXJlKCk7XHJcbiAgICBnbC5iaW5kVGV4dHVyZShnbC5URVhUVVJFXzJELCBmVGV4dHVyZSk7XHJcbiAgICBnbC50ZXhJbWFnZTJEKGdsLlRFWFRVUkVfMkQsIDAsIGdsLlJHQkEsIHdpZHRoLCBoZWlnaHQsIDAsIGdsLlJHQkEsIGdsLlVOU0lHTkVEX0JZVEUsIG51bGwpO1xyXG4gICAgZ2wudGV4UGFyYW1ldGVyaShnbC5URVhUVVJFXzJELCBnbC5URVhUVVJFX01BR19GSUxURVIsIGdsLkxJTkVBUik7XHJcbiAgICBnbC50ZXhQYXJhbWV0ZXJpKGdsLlRFWFRVUkVfMkQsIGdsLlRFWFRVUkVfTUlOX0ZJTFRFUiwgZ2wuTElORUFSKTtcclxuICAgIGdsLmZyYW1lYnVmZmVyVGV4dHVyZTJEKGdsLkZSQU1FQlVGRkVSLCBnbC5DT0xPUl9BVFRBQ0hNRU5UMCwgZ2wuVEVYVFVSRV8yRCwgZlRleHR1cmUsIDApO1xyXG4gICAgXHJcbiAgICBnbC5iaW5kVGV4dHVyZShnbC5URVhUVVJFXzJELCBudWxsKTtcclxuICAgIGdsLmJpbmRSZW5kZXJidWZmZXIoZ2wuUkVOREVSQlVGRkVSLCBudWxsKTtcclxuICAgIGdsLmJpbmRGcmFtZWJ1ZmZlcihnbC5GUkFNRUJVRkZFUiwgbnVsbCk7XHJcbiAgICBcclxuICAgIHJldHVybiB7ZiA6IGZyYW1lQnVmZmVyLCBkIDogZGVwdGhSZW5kZXJCdWZmZXIsIHQgOiBmVGV4dHVyZX07XHJcbiAgfVxyXG4gIFxyXG4gIC8vIFZCT+OCkuODkOOCpOODs+ODieOBl+eZu+mMsuOBmeOCi+mWouaVsFxyXG4gIGZ1bmN0aW9uIHNldEF0dHJpYnV0ZSh2Ym8sIGF0dEwsIGF0dFMpe1xyXG4gICAgICBmb3IobGV0IGkgaW4gdmJvKXtcclxuICAgICAgICAgIGdsLmJpbmRCdWZmZXIoZ2wuQVJSQVlfQlVGRkVSLCB2Ym9baV0pO1xyXG4gICAgICAgICAgZ2wuZW5hYmxlVmVydGV4QXR0cmliQXJyYXkoYXR0TFtpXSk7XHJcbiAgICAgICAgICBnbC52ZXJ0ZXhBdHRyaWJQb2ludGVyKGF0dExbaV0sIGF0dFNbaV0sIGdsLkZMT0FULCBmYWxzZSwgMCwgMCk7XHJcbiAgICAgIH1cclxuICB9XHJcbiAgXHJcblx0Ly8gSUJP44KS55Sf5oiQ44GZ44KL6Zai5pWwXHJcblx0ZnVuY3Rpb24gY3JlYXRlSWJvKGRhdGEpe1xyXG5cdFx0dmFyIGlibyA9IGdsLmNyZWF0ZUJ1ZmZlcigpO1xyXG5cdFx0XHJcblx0XHRnbC5iaW5kQnVmZmVyKGdsLkVMRU1FTlRfQVJSQVlfQlVGRkVSLCBpYm8pO1xyXG5cdFx0Z2wuYnVmZmVyRGF0YShnbC5FTEVNRU5UX0FSUkFZX0JVRkZFUiwgbmV3IEludDE2QXJyYXkoZGF0YSksIGdsLlNUQVRJQ19EUkFXKTtcclxuXHRcdGdsLmJpbmRCdWZmZXIoZ2wuRUxFTUVOVF9BUlJBWV9CVUZGRVIsIG51bGwpO1xyXG5cdFx0cmV0dXJuIGlibztcclxuXHR9ICBcclxuICBcclxuIFx0Ly8g5p2/44Od44Oq44K044OzXHJcblx0dmFyIHBvc2l0aW9uID0gW1xyXG5cdFx0LTEuMCwgIDEuMCxcclxuXHRcdCAxLjAsICAxLjAsXHJcblx0XHQtMS4wLCAtMS4wLFxyXG5cdFx0IDEuMCwgLTEuMFxyXG5cdF07XHJcbiAgXHJcblx0dmFyIHRleENvb3JkID0gW1xyXG5cdDAuMCwgMC4wLFxyXG5cdCBcdHZpcnR1YWxXaWR0aCAvIGJ1ZmZlcldpZHRoICwgMC4wLFxyXG5cdCBcdDAuMCwgdmlydHVhbEhlaWdodCAvIGJ1ZmZlckhlaWdodCxcclxuXHQgXHR2aXJ0dWFsV2lkdGggLyBidWZmZXJXaWR0aCwgdmlydHVhbEhlaWdodCAvIGJ1ZmZlckhlaWdodFxyXG5cdCBdO1xyXG4gIFxyXG5cdC8vIHZhciB0ZXhDb29yZCA9IFtcclxuXHQvLyBcdDAuMCwgMC4wLFxyXG5cdC8vIFx0MS4wICwgMC4wLFxyXG5cdC8vIFx0MC4wLCAxLjAsXHJcblx0Ly8gXHQxLjAsMS4wXHJcblx0Ly8gXTsgIFxyXG5cdHZhciBpbmRleCA9IFtcclxuXHRcdDAsIDIsIDEsXHJcblx0XHQyLCAzLCAxXHJcblx0XTtcclxuICBcclxuXHR2YXIgdlBvc2l0aW9uID0gY3JlYXRlVmJvKHBvc2l0aW9uKTtcclxuXHR2YXIgdlRleENvb3JkID0gY3JlYXRlVmJvKHRleENvb3JkKTtcclxuXHR2YXIgaUluZGV4ICAgID0gY3JlYXRlSWJvKGluZGV4KTtcclxuICAgXHJcbiAgLy8gY2FudmFz44KS6buS44Gn44Kv44Oq44KiKOWIneacn+WMlinjgZnjgotcclxuICBnbC5jbGVhckNvbG9yKDAuMCwgMC4wLCAwLjAsIDEuMCk7XHJcbiAgZ2wudmlld3BvcnQoMCwwLHZpcnR1YWxXaWR0aCx2aXJ0dWFsSGVpZ2h0KTtcclxuICBnbC5jbGVhckRlcHRoKDEuMCk7XHJcbiAgZ2wuY2xlYXIoZ2wuQ09MT1JfQlVGRkVSX0JJVCB8IGdsLkRFUFRIX0JVRkZFUl9CSVQpO1xyXG5cclxuICBsZXQgdnNQID0gY3JlYXRlU2hhZGVyKHZzaGFkZXJQU3JjLGdsLlZFUlRFWF9TSEFERVIpO1xyXG4gIGxldCBmc1AgPSBjcmVhdGVTaGFkZXIoZnNoYWRlclBTcmMsZ2wuRlJBR01FTlRfU0hBREVSKTtcclxuICBcclxuICBsZXQgcHJnUCA9IGNyZWF0ZVByb2dyYW0odnNQLGZzUCk7XHJcbiAgXHJcbiAgbGV0IHByZ1BQb3MgPSBnbC5nZXRBdHRyaWJMb2NhdGlvbihwcmdQLCdwb3NpdGlvbicpO1xyXG4gIGxldCBwcmdQVGV4Q29vcmQgPSBnbC5nZXRBdHRyaWJMb2NhdGlvbihwcmdQLCd0ZXh0dXJlX2Nvb3JkJyk7XHJcbiAgXHJcbiAgbGV0IGF0dFN0cmlkZSA9IDQ7XHJcbiAgXHJcbiAgc2V0QXR0cmlidXRlKFt2UG9zaXRpb24sdlRleENvb3JkXSxbcHJnUFBvcyxwcmdQVGV4Q29vcmRdLFsyLDJdKTtcclxuICAvL3NldEF0dHJpYnV0ZShbdlBvc2l0aW9uXSxbcHJnUFBvc10sWzJdKTtcclxuICBnbC5iaW5kQnVmZmVyKGdsLkVMRU1FTlRfQVJSQVlfQlVGRkVSLGlJbmRleCk7XHJcbiAgXHJcbiAgdmFyIHByZ1BUZXhCUG9zID0gZ2wuZ2V0VW5pZm9ybUxvY2F0aW9uKHByZ1AsJ3RleHR1cmVCJyk7XHJcbiAgdmFyIHByZ1BUZXhHUG9zID0gZ2wuZ2V0VW5pZm9ybUxvY2F0aW9uKHByZ1AsJ3RleHR1cmVHJyk7XHJcbiAgdmFyIHByZ1BUZXhSUG9zID0gZ2wuZ2V0VW5pZm9ybUxvY2F0aW9uKHByZ1AsJ3RleHR1cmVSJyk7XHJcbiAgdmFyIHByZ1BQYWxldHRQb3MgPSBnbC5nZXRVbmlmb3JtTG9jYXRpb24ocHJnUCwncGFsbGV0X2NvbG9yJyk7XHJcbiAgdmFyIHByZ1BUZXhGb250ID0gZ2wuZ2V0VW5pZm9ybUxvY2F0aW9uKHByZ1AsJ3RleHR1cmVGb250Jyk7XHJcbiAgdmFyIHByZ1BUZXhDaGFyQ29kZSA9IGdsLmdldFVuaWZvcm1Mb2NhdGlvbihwcmdQLCd0ZXh0dXJlQ2hhckNvZGUnKTtcclxuICB2YXIgcHJnUFRleENoYXJBdHRyID0gZ2wuZ2V0VW5pZm9ybUxvY2F0aW9uKHByZ1AsJ3RleHR1cmVDaGFyQXR0cicpO1xyXG4gIHZhciBwcmdQVGltZSA9IGdsLmdldFVuaWZvcm1Mb2NhdGlvbihwcmdQLCd0aW1lJyk7XHJcbiAgXHJcbiAgLy8g5Luu5oOz44OT44OD44OI44Oe44OD44OX44OG44Kv44K544OB44Oj44KS5L2c44KLXHJcbiAgdmFyIHRleHR1cmVCID0gZ2wuY3JlYXRlVGV4dHVyZSgpO1xyXG4gIGdsLmFjdGl2ZVRleHR1cmUoZ2wuVEVYVFVSRTApO1xyXG4gIGdsLmJpbmRUZXh0dXJlKGdsLlRFWFRVUkVfMkQsdGV4dHVyZUIpO1xyXG4vL1x0Z2wucGl4ZWxTdG9yZWkoZ2wuVU5QQUNLX0ZMSVBfWV9XRUJHTCwgdHJ1ZSk7XHJcbiAgZ2wudGV4SW1hZ2UyRChnbC5URVhUVVJFXzJELCAwLCBnbC5MVU1JTkFOQ0UsIGJ1ZmZlclhTaXplLCBidWZmZXJIZWlnaHQsIDAsIGdsLkxVTUlOQU5DRSwgXHRnbC5VTlNJR05FRF9CWVRFLCBidWZmZXJCKTtcclxuXHRnbC50ZXhQYXJhbWV0ZXJpKGdsLlRFWFRVUkVfMkQsIGdsLlRFWFRVUkVfTUFHX0ZJTFRFUiwgZ2wuTkVBUkVTVCk7XHJcblx0Z2wudGV4UGFyYW1ldGVyaShnbC5URVhUVVJFXzJELCBnbC5URVhUVVJFX01JTl9GSUxURVIsIGdsLk5FQVJFU1QpO1xyXG5cdGdsLnRleFBhcmFtZXRlcmkoZ2wuVEVYVFVSRV8yRCwgZ2wuVEVYVFVSRV9XUkFQX1MsIGdsLkNMQU1QX1RPX0VER0UpO1xyXG5cdGdsLnRleFBhcmFtZXRlcmkoZ2wuVEVYVFVSRV8yRCwgZ2wuVEVYVFVSRV9XUkFQX1QsIGdsLkNMQU1QX1RPX0VER0UpO1xyXG4gIFxyXG4gIHZhciB0ZXh0dXJlRyA9IGdsLmNyZWF0ZVRleHR1cmUoKTtcclxuICBnbC5hY3RpdmVUZXh0dXJlKGdsLlRFWFRVUkUxKTtcclxuICBnbC5iaW5kVGV4dHVyZShnbC5URVhUVVJFXzJELHRleHR1cmVHKTtcclxuLy9cdGdsLnBpeGVsU3RvcmVpKGdsLlVOUEFDS19GTElQX1lfV0VCR0wsIHRydWUpO1xyXG4gIGdsLnRleEltYWdlMkQoZ2wuVEVYVFVSRV8yRCwgMCwgZ2wuTFVNSU5BTkNFLCBidWZmZXJYU2l6ZSwgYnVmZmVySGVpZ2h0LCAwLCBnbC5MVU1JTkFOQ0UsIFx0Z2wuVU5TSUdORURfQllURSwgYnVmZmVyRyk7XHJcblx0Z2wudGV4UGFyYW1ldGVyaShnbC5URVhUVVJFXzJELCBnbC5URVhUVVJFX01BR19GSUxURVIsIGdsLk5FQVJFU1QpO1xyXG5cdGdsLnRleFBhcmFtZXRlcmkoZ2wuVEVYVFVSRV8yRCwgZ2wuVEVYVFVSRV9NSU5fRklMVEVSLCBnbC5ORUFSRVNUKTtcclxuXHRnbC50ZXhQYXJhbWV0ZXJpKGdsLlRFWFRVUkVfMkQsIGdsLlRFWFRVUkVfV1JBUF9TLCBnbC5DTEFNUF9UT19FREdFKTtcclxuXHRnbC50ZXhQYXJhbWV0ZXJpKGdsLlRFWFRVUkVfMkQsIGdsLlRFWFRVUkVfV1JBUF9ULCBnbC5DTEFNUF9UT19FREdFKTtcclxuXHJcbiAgdmFyIHRleHR1cmVSID0gZ2wuY3JlYXRlVGV4dHVyZSgpO1xyXG4gIGdsLmFjdGl2ZVRleHR1cmUoZ2wuVEVYVFVSRTIpO1xyXG4gIGdsLmJpbmRUZXh0dXJlKGdsLlRFWFRVUkVfMkQsdGV4dHVyZVIpO1xyXG4vL1x0Z2wucGl4ZWxTdG9yZWkoZ2wuVU5QQUNLX0ZMSVBfWV9XRUJHTCwgdHJ1ZSk7XHJcbiAgZ2wudGV4SW1hZ2UyRChnbC5URVhUVVJFXzJELCAwLCBnbC5MVU1JTkFOQ0UsIGJ1ZmZlclhTaXplLCBidWZmZXJIZWlnaHQsIDAsIGdsLkxVTUlOQU5DRSwgXHRnbC5VTlNJR05FRF9CWVRFLCBidWZmZXJSKTtcclxuXHRnbC50ZXhQYXJhbWV0ZXJpKGdsLlRFWFRVUkVfMkQsIGdsLlRFWFRVUkVfTUFHX0ZJTFRFUiwgZ2wuTkVBUkVTVCk7XHJcblx0Z2wudGV4UGFyYW1ldGVyaShnbC5URVhUVVJFXzJELCBnbC5URVhUVVJFX01JTl9GSUxURVIsIGdsLk5FQVJFU1QpO1xyXG5cdGdsLnRleFBhcmFtZXRlcmkoZ2wuVEVYVFVSRV8yRCwgZ2wuVEVYVFVSRV9XUkFQX1MsIGdsLkNMQU1QX1RPX0VER0UpO1xyXG5cdGdsLnRleFBhcmFtZXRlcmkoZ2wuVEVYVFVSRV8yRCwgZ2wuVEVYVFVSRV9XUkFQX1QsIGdsLkNMQU1QX1RPX0VER0UpO1xyXG4gIFxyXG5cdHZhciBwYWxldHRlVGV4dHVyZSA9IGdsLmNyZWF0ZVRleHR1cmUoKTtcclxuXHRnbC5hY3RpdmVUZXh0dXJlKGdsLlRFWFRVUkUzKTtcclxuXHRnbC5iaW5kVGV4dHVyZShnbC5URVhUVVJFXzJELCBwYWxldHRlVGV4dHVyZSk7XHJcblx0Z2wudGV4SW1hZ2UyRChnbC5URVhUVVJFXzJELCAwLCBnbC5MVU1JTkFOQ0UsIHBhbGxldENvbG9ycy5sZW5ndGggLCAxLCAwLCBnbC5MVU1JTkFOQ0UsZ2wuVU5TSUdORURfQllURSwgcGFsbGV0Q29sb3JzKTtcclxuXHRnbC50ZXhQYXJhbWV0ZXJpKGdsLlRFWFRVUkVfMkQsIGdsLlRFWFRVUkVfTUFHX0ZJTFRFUiwgZ2wuTkVBUkVTVCk7XHJcblx0Z2wudGV4UGFyYW1ldGVyaShnbC5URVhUVVJFXzJELCBnbC5URVhUVVJFX01JTl9GSUxURVIsIGdsLk5FQVJFU1QpO1xyXG5cdGdsLnRleFBhcmFtZXRlcmkoZ2wuVEVYVFVSRV8yRCwgZ2wuVEVYVFVSRV9XUkFQX1MsIGdsLkNMQU1QX1RPX0VER0UpO1xyXG5cdGdsLnRleFBhcmFtZXRlcmkoZ2wuVEVYVFVSRV8yRCwgZ2wuVEVYVFVSRV9XUkFQX1QsIGdsLkNMQU1QX1RPX0VER0UpO1xyXG5cclxuXHR2YXIgZm9udFRleHR1cmUgPSBnbC5jcmVhdGVUZXh0dXJlKCk7XHJcblx0Z2wuYWN0aXZlVGV4dHVyZShnbC5URVhUVVJFNCk7XHJcblx0Z2wuYmluZFRleHR1cmUoZ2wuVEVYVFVSRV8yRCwgZm9udFRleHR1cmUpO1xyXG5cdGdsLnRleEltYWdlMkQoZ2wuVEVYVFVSRV8yRCwgMCwgZ2wuTFVNSU5BTkNFLCBmb250VGV4V2lkdGggLCBmb250VGV4SGVpZ2h0LCAwLCBnbC5MVU1JTkFOQ0UsZ2wuVU5TSUdORURfQllURSwgZm9udEJ1ZmZlcik7XHJcblx0Z2wudGV4UGFyYW1ldGVyaShnbC5URVhUVVJFXzJELCBnbC5URVhUVVJFX01BR19GSUxURVIsIGdsLk5FQVJFU1QpO1xyXG5cdGdsLnRleFBhcmFtZXRlcmkoZ2wuVEVYVFVSRV8yRCwgZ2wuVEVYVFVSRV9NSU5fRklMVEVSLCBnbC5ORUFSRVNUKTtcclxuXHRnbC50ZXhQYXJhbWV0ZXJpKGdsLlRFWFRVUkVfMkQsIGdsLlRFWFRVUkVfV1JBUF9TLCBnbC5DTEFNUF9UT19FREdFKTtcclxuXHRnbC50ZXhQYXJhbWV0ZXJpKGdsLlRFWFRVUkVfMkQsIGdsLlRFWFRVUkVfV1JBUF9ULCBnbC5DTEFNUF9UT19FREdFKTtcclxuICBcclxuXHR2YXIgY2hhckNvZGVUZXh0dXJlID0gZ2wuY3JlYXRlVGV4dHVyZSgpO1xyXG5cdGdsLmFjdGl2ZVRleHR1cmUoZ2wuVEVYVFVSRTUpO1xyXG5cdGdsLmJpbmRUZXh0dXJlKGdsLlRFWFRVUkVfMkQsIGNoYXJDb2RlVGV4dHVyZSk7XHJcblx0Z2wudGV4SW1hZ2UyRChnbC5URVhUVVJFXzJELCAwLCBnbC5MVU1JTkFOQ0UsIGNoYXJDb2RlQnVmZmVyV2lkdGggLCBjaGFyQ29kZUJ1ZmZlckhlaWdodCwgMCwgZ2wuTFVNSU5BTkNFLGdsLlVOU0lHTkVEX0JZVEUsIGNoYXJDb2RlQnVmZmVyKTtcclxuXHRnbC50ZXhQYXJhbWV0ZXJpKGdsLlRFWFRVUkVfMkQsIGdsLlRFWFRVUkVfTUFHX0ZJTFRFUiwgZ2wuTkVBUkVTVCk7XHJcblx0Z2wudGV4UGFyYW1ldGVyaShnbC5URVhUVVJFXzJELCBnbC5URVhUVVJFX01JTl9GSUxURVIsIGdsLk5FQVJFU1QpO1xyXG5cdGdsLnRleFBhcmFtZXRlcmkoZ2wuVEVYVFVSRV8yRCwgZ2wuVEVYVFVSRV9XUkFQX1MsIGdsLkNMQU1QX1RPX0VER0UpO1xyXG5cdGdsLnRleFBhcmFtZXRlcmkoZ2wuVEVYVFVSRV8yRCwgZ2wuVEVYVFVSRV9XUkFQX1QsIGdsLkNMQU1QX1RPX0VER0UpO1xyXG4gIFxyXG5cdHZhciBjaGFyQXR0clRleHR1cmUgPSBnbC5jcmVhdGVUZXh0dXJlKCk7XHJcblx0Z2wuYWN0aXZlVGV4dHVyZShnbC5URVhUVVJFNik7XHJcblx0Z2wuYmluZFRleHR1cmUoZ2wuVEVYVFVSRV8yRCwgY2hhckF0dHJUZXh0dXJlKTtcclxuXHRnbC50ZXhJbWFnZTJEKGdsLlRFWFRVUkVfMkQsIDAsIGdsLkxVTUlOQU5DRSwgY2hhckNvZGVCdWZmZXJXaWR0aCAsIGNoYXJDb2RlQnVmZmVySGVpZ2h0LCAwLCBnbC5MVU1JTkFOQ0UsZ2wuVU5TSUdORURfQllURSwgY2hhckF0dHJCdWZmZXIpO1xyXG5cdGdsLnRleFBhcmFtZXRlcmkoZ2wuVEVYVFVSRV8yRCwgZ2wuVEVYVFVSRV9NQUdfRklMVEVSLCBnbC5ORUFSRVNUKTtcclxuXHRnbC50ZXhQYXJhbWV0ZXJpKGdsLlRFWFRVUkVfMkQsIGdsLlRFWFRVUkVfTUlOX0ZJTFRFUiwgZ2wuTkVBUkVTVCk7XHJcblx0Z2wudGV4UGFyYW1ldGVyaShnbC5URVhUVVJFXzJELCBnbC5URVhUVVJFX1dSQVBfUywgZ2wuQ0xBTVBfVE9fRURHRSk7XHJcblx0Z2wudGV4UGFyYW1ldGVyaShnbC5URVhUVVJFXzJELCBnbC5URVhUVVJFX1dSQVBfVCwgZ2wuQ0xBTVBfVE9fRURHRSk7XHJcblxyXG5cdGdsLnVuaWZvcm0xaShwcmdQVGV4QlBvcywgMCk7XHJcblx0Z2wudW5pZm9ybTFpKHByZ1BUZXhHUG9zLCAxKTtcclxuXHRnbC51bmlmb3JtMWkocHJnUFRleFJQb3MsIDIpO1xyXG5cdGdsLnVuaWZvcm0xaShwcmdQUGFsZXR0UG9zLCAzKTtcclxuXHRnbC51bmlmb3JtMWkocHJnUFRleEZvbnQsIDQpO1xyXG5cdGdsLnVuaWZvcm0xaShwcmdQVGV4Q2hhckNvZGUsIDUpO1xyXG5cdGdsLnVuaWZvcm0xaShwcmdQVGV4Q2hhckF0dHIsIDYpO1xyXG4gIFxyXG5cclxuICBcclxuICBmdW5jdGlvbiByZXNpemUoKXtcclxuICAgIHZhciBjb250ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NvbnRlbnQnKTtcclxuICAgIGlmKGNvbnQub2Zmc2V0V2lkdGggPiA3MDApe1xyXG4gICAgICB2aWV3LndpZHRoID0gdmlydHVhbFdpZHRoICogMjsvL2NvbnQub2Zmc2V0V2lkdGg7XHJcbiAgICAgIHZpZXcuaGVpZ2h0ID0gdmlydHVhbEhlaWdodCAqIDI7Ly9jb250Lm9mZnNldFdpZHRoICogMyAvIDQ7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB2aWV3LndpZHRoID0gdmlydHVhbFdpZHRoO1xyXG4gICAgICB2aWV3LmhlaWdodCA9IHZpcnR1YWxIZWlnaHQ7XHJcbiAgICB9XHJcbiAgICB3aWR0aCA9IHZpZXcub2Zmc2V0V2lkdGg7XHJcbiAgICBoZWlnaHQgPSB2aWV3Lm9mZnNldEhlaWdodDtcclxuICAgIFxyXG4gICAgZ2wudmlld3BvcnQoMCwwLHdpZHRoLGhlaWdodCk7XHJcblxyXG4gICAgXHJcbiAgICBnbC5jbGVhckNvbG9yKDAuMCwgMC4wLCAwLjAsIDEuMCk7XHJcbiAgICBnbC5jbGVhcihnbC5DT0xPUl9CVUZGRVJfQklUKTtcclxuICAgIFxyXG4gIH1cclxuICByZXNpemUoKTtcclxuICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJyxyZXNpemUpO1xyXG5cclxuICAvLyDjg6zjg7Pjg4Djg6rjg7PjgrBcclxuICBmdW5jdGlvbiByZW5kZXIoKXtcclxuICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZShyZW5kZXIpO1xyXG5cdFx0Z2wuY2xlYXJDb2xvcigwLjAsIDAuMCwgMC4wLCAxLjApO1xyXG5cdFx0Z2wuY2xlYXIoZ2wuQ09MT1JfQlVGRkVSX0JJVCB8IGdsLkRFUFRIX0JVRkZFUl9CSVQpO1xyXG5cclxuICBcdGdsLmFjdGl2ZVRleHR1cmUoZ2wuVEVYVFVSRTApO1xyXG4gICAgZ2wuYmluZFRleHR1cmUoZ2wuVEVYVFVSRV8yRCx0ZXh0dXJlQik7XHJcbiAgICBnbC50ZXhJbWFnZTJEKGdsLlRFWFRVUkVfMkQsIDAsIGdsLkxVTUlOQU5DRSwgYnVmZmVyWFNpemUsIGJ1ZmZlckhlaWdodCwgMCwgZ2wuTFVNSU5BTkNFLCBcdGdsLlVOU0lHTkVEX0JZVEUsIGJ1ZmZlckIpO1xyXG4gICAgXHJcbiAgXHRnbC5hY3RpdmVUZXh0dXJlKGdsLlRFWFRVUkUxKTtcclxuICAgIGdsLmJpbmRUZXh0dXJlKGdsLlRFWFRVUkVfMkQsdGV4dHVyZUcpO1xyXG4gICAgZ2wudGV4SW1hZ2UyRChnbC5URVhUVVJFXzJELCAwLCBnbC5MVU1JTkFOQ0UsIGJ1ZmZlclhTaXplLCBidWZmZXJIZWlnaHQsIDAsIGdsLkxVTUlOQU5DRSwgXHRnbC5VTlNJR05FRF9CWVRFLCBidWZmZXJHKTtcclxuXHJcbiAgXHRnbC5hY3RpdmVUZXh0dXJlKGdsLlRFWFRVUkUyKTtcclxuICAgIGdsLmJpbmRUZXh0dXJlKGdsLlRFWFRVUkVfMkQsdGV4dHVyZVIpO1xyXG4gICAgZ2wudGV4SW1hZ2UyRChnbC5URVhUVVJFXzJELCAwLCBnbC5MVU1JTkFOQ0UsIGJ1ZmZlclhTaXplLCBidWZmZXJIZWlnaHQsIDAsIGdsLkxVTUlOQU5DRSwgXHRnbC5VTlNJR05FRF9CWVRFLCBidWZmZXJSKTtcclxuXHJcbiAgXHRnbC5hY3RpdmVUZXh0dXJlKGdsLlRFWFRVUkUzKTtcclxuICBcdGdsLmJpbmRUZXh0dXJlKGdsLlRFWFRVUkVfMkQsIHBhbGV0dGVUZXh0dXJlKTtcclxuICBcdGdsLnRleEltYWdlMkQoZ2wuVEVYVFVSRV8yRCwgMCwgZ2wuTFVNSU5BTkNFLCBwYWxsZXRDb2xvcnMubGVuZ3RoLCAxLCAwLGdsLkxVTUlOQU5DRSxnbC5VTlNJR05FRF9CWVRFLCBwYWxsZXRDb2xvcnMpO1xyXG4gICAgXHJcbiAgICBnbC5hY3RpdmVUZXh0dXJlKGdsLlRFWFRVUkU0KTtcclxuICAgIGdsLmJpbmRUZXh0dXJlKGdsLlRFWFRVUkVfMkQsIGZvbnRUZXh0dXJlKTtcclxuICAgIGdsLnRleEltYWdlMkQoZ2wuVEVYVFVSRV8yRCwgMCwgZ2wuTFVNSU5BTkNFLCBmb250VGV4V2lkdGggLCBmb250VGV4SGVpZ2h0LCAwLCBnbC5MVU1JTkFOQ0UsZ2wuVU5TSUdORURfQllURSwgZm9udEJ1ZmZlcik7XHJcbiAgICBcclxuICAgIGdsLmFjdGl2ZVRleHR1cmUoZ2wuVEVYVFVSRTUpO1xyXG4gICAgZ2wuYmluZFRleHR1cmUoZ2wuVEVYVFVSRV8yRCwgY2hhckNvZGVUZXh0dXJlKTtcclxuICAgIGdsLnRleEltYWdlMkQoZ2wuVEVYVFVSRV8yRCwgMCwgZ2wuTFVNSU5BTkNFLCBjaGFyQ29kZUJ1ZmZlcldpZHRoICwgY2hhckNvZGVCdWZmZXJIZWlnaHQsIDAsIGdsLkxVTUlOQU5DRSxnbC5VTlNJR05FRF9CWVRFLCBjaGFyQ29kZUJ1ZmZlcik7XHJcbiAgXHJcbiAgICBnbC5hY3RpdmVUZXh0dXJlKGdsLlRFWFRVUkU2KTtcclxuICAgIGdsLmJpbmRUZXh0dXJlKGdsLlRFWFRVUkVfMkQsIGNoYXJBdHRyVGV4dHVyZSk7XHJcbiAgICBnbC50ZXhJbWFnZTJEKGdsLlRFWFRVUkVfMkQsIDAsIGdsLkxVTUlOQU5DRSwgY2hhckNvZGVCdWZmZXJXaWR0aCAsIGNoYXJDb2RlQnVmZmVySGVpZ2h0LCAwLCBnbC5MVU1JTkFOQ0UsZ2wuVU5TSUdORURfQllURSwgY2hhckF0dHJCdWZmZXIpO1xyXG5cclxuICAgIGdsLmRyYXdFbGVtZW50cyhnbC5UUklBTkdMRVMsIGluZGV4Lmxlbmd0aCwgZ2wuVU5TSUdORURfU0hPUlQsIDApO1xyXG5cdFx0Z2wuZmx1c2goKTtcclxuICAgIGlmKHN0YXR1cyA9PSBTVEFUVVMucnVuKXtcclxuICAgICAgbWFpbiAmJiBtYWluKCk7XHJcbiAgICB9XHJcbiAgfVxyXG4gIFxyXG4gIGZ1bmN0aW9uIHVwZGF0ZVN0YXR1cyhzKXtcclxuICAgIHN0YXR1cyA9IHM7XHJcbiAgICBzd2l0Y2gocyl7XHJcbiAgICAgIGNhc2UgU1RBVFVTLnN0b3A6XHJcbiAgICAgICAgcnVuQnRuLmRpc2FibGVkID0gXCJcIjtcclxuICAgICAgICBwYXVzZUJ0bi5kaXNhYmxlZCA9IFwiZGlzYWJsZWRcIjtcclxuICAgICAgICBzdG9wQnRuLmRpc2FibGVkID0gXCJkaXNhYmxlZFwiO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlIFNUQVRVUy5ydW46XHJcbiAgICAgICAgcnVuQnRuLmRpc2FibGVkID0gXCJkaXNhYmxlZFwiO1xyXG4gICAgICAgIHBhdXNlQnRuLmRpc2FibGVkID0gXCJcIjtcclxuICAgICAgICBzdG9wQnRuLmRpc2FibGVkID0gXCJcIjtcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSBTVEFUVVMucGF1c2U6XHJcbiAgICAgICAgcnVuQnRuLmRpc2FibGVkID0gXCJkaXNhYmxlZFwiO1xyXG4gICAgICAgIHBhdXNlQnRuLmRpc2FibGVkID0gXCJcIjtcclxuICAgICAgICBzdG9wQnRuLmRpc2FibGVkID0gXCJcIjtcclxuICAgICAgICBicmVhaztcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGZ1bmN0aW9uIHBzZXQoeCx5LGNvbG9yKXtcclxuICAgIHZhciBvZmZzZXQgPSAoeSAqIGJ1ZmZlclhTaXplICsgeCAvIDgpIHwgMDtcclxuICAgIHZhciBiaXRwb3MgPSB4ICUgODtcclxuXHJcbiAgICBcclxuICAgIGxldCBiID0gKGNvbG9yICYgMSkgPDwgYml0cG9zO1xyXG4gICAgbGV0IG0gPSB+KDEgPDwgYml0cG9zKSAmIDB4ZmY7XHJcbiAgICBsZXQgZyA9ICgoY29sb3IgPj4+IDEpICYgMSkgPDwgYml0cG9zO1xyXG4gICAgbGV0IHIgPSAoKGNvbG9yID4+PiAyKSAmIDEpIDw8IGJpdHBvcztcclxuXHJcbiAgICBidWZmZXJCW29mZnNldF0gPSAoYnVmZmVyQltvZmZzZXRdICYgbSkgfCBiO1xyXG4gICAgYnVmZmVyR1tvZmZzZXRdID0gKGJ1ZmZlckdbb2Zmc2V0XSAmIG0pIHwgZztcclxuICAgIGJ1ZmZlclJbb2Zmc2V0XSA9IChidWZmZXJSW29mZnNldF0gJiBtKSB8IHI7XHJcbiAgfVxyXG5cclxuICBmdW5jdGlvbiBwcmVzZXQoeCx5KXtcclxuICAgIHZhciBvZmZzZXQgPSAoeSAqIGJ1ZmZlclhTaXplICsgeCAvIDgpIHwgMDtcclxuICAgIHZhciBiaXQgPSB+KDEgPDwgKHggJSA4KSk7XHJcbiAgICBidWZmZXJCW29mZnNldF0gJj0gYml0O1xyXG4gICAgYnVmZmVyR1tvZmZzZXRdICY9IGJpdDtcclxuICAgIGJ1ZmZlclJbb2Zmc2V0XSAmPSBiaXQ7XHJcbiAgfVxyXG5cclxuICBmdW5jdGlvbiBjbHMoKXtcclxuICAgIGZvcih2YXIgaSA9IDAsZSA9IGJ1ZmZlclhTaXplICogYnVmZmVySGVpZ2h0O2kgPCBlOysraSlcclxuICAgIHtcclxuICAgICAgIGJ1ZmZlckJbaV0gPSAwO1xyXG4gICAgICAgYnVmZmVyR1tpXSA9IDA7XHJcbiAgICAgICBidWZmZXJSW2ldID0gMDtcclxuICAgIH1cclxuICB9XHJcbiAgXHJcbiAgLy8g44Oh44Kk44OzXHJcbiAgZnVuY3Rpb24gcnVuKCl7XHJcbiAgICB2YXIgZ2VuID0gKGZ1bmN0aW9uICogKCl7XHJcbiAgICAgIHdoaWxlICh0cnVlKSB7XHJcbiAgICAgICAgY2xzKCk7XHJcbiAgICAgICAgcGFsbGV0Q29sb3JzLnNldChbMCwxLDIsMyw0LDUsNiw3XSk7XHJcbiAgICAgICAgZm9yIChsZXQgeSA9IDA7IHkgPCB2aXJ0dWFsSGVpZ2h0OyArK3kpIHtcclxuICAgICAgICAgIGZvciAobGV0IHggPSAwOyB4IDwgdmlydHVhbFdpZHRoOyArK3gpIHtcclxuICAgICAgICAgICAgaWYoKCgoeSAvIDgpIHwgMCkgJiAxKSA+IDApe1xyXG4gICAgICAgICAgICAgIGlmKHggJSAxNiA8IDgpe1xyXG4gICAgICAgICAgICAgICAgcHNldCh4LCB5LCB5ICUgOCk7XHJcbiAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHBzZXQoeCwgeSwgeCAlIDgpO1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICBpZih4ICUgMTYgPj0gOCl7XHJcbiAgICAgICAgICAgICAgICBwc2V0KHgsIHksIDcgLSB5ICUgOCk7XHJcbiAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHBzZXQoeCwgeSwgNyAtIHggJSA4KTtcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICB5aWVsZDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8v44OR44Os44OD44OI44Gu44K544Kv44Ot44O844OrXHJcbiAgICAgICAgZm9yKGxldCB0ID0gMDt0IDwgMTI4OysrdClcclxuICAgICAgICB7XHJcbiAgICAgICAgICBsZXQgcCA9IHBhbGxldENvbG9yc1swXTtcclxuICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgNzsgKytpKSB7XHJcbiAgICAgICAgICAgIHBhbGxldENvbG9yc1tpXSA9IHBhbGxldENvbG9yc1tpICsgMV07XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBwYWxsZXRDb2xvcnNbN10gPSBwO1xyXG4gICAgICAgICAgeWllbGQ7XHJcbiAgICAgICAgICB5aWVsZDtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy8gZm9yKGxldCB0ID0gMDt0IDwgNjQwOysrdCl7XHJcbiAgICAgICAgLy8gICBmb3IobGV0IHUgPSAwO3UgPCAxMjg7Kyt1KXtcclxuICAgICAgICAvLyAgICAgcHNldChNYXRoLnJhbmRvbSgpICogMzIwLE1hdGgucmFuZG9tKCkgKiAyNDAsTWF0aC5yYW5kb20oKSAqIDgpO1xyXG4gICAgICAgIC8vICAgfVxyXG4gICAgICAgIC8vICAgeWllbGQ7XHJcbiAgICAgICAgLy8gfVxyXG4gICAgICAgIC8vIC8v44OR44Os44OD44OI44Gu44K544Kv44Ot44O844OrXHJcbiAgICAgICAgLy8gZm9yKGxldCB0ID0gMDt0IDwgMTI4OysrdClcclxuICAgICAgICAvLyB7XHJcbiAgICAgICAgLy8gICBmb3IgKGxldCBpID0gMDsgaSA8IDg7ICsraSkge1xyXG4gICAgICAgIC8vICAgICBwYWxsZXRDb2xvcnNbaV0gPSAwO1xyXG4gICAgICAgIC8vICAgfVxyXG5cclxuICAgICAgICAvLyAgIHBhbGxldENvbG9yc1t0ICUgNyArIDFdID0gdCAlIDcgKyAxO1xyXG5cclxuICAgICAgICAvLyAgIGZvcihsZXQgaSA9IDA7aSA8IDQ7KytpKXtcclxuICAgICAgICAvLyAgICAgeWllbGQ7XHJcbiAgICAgICAgLy8gICB9XHJcbiAgICAgICAgLy8gfVxyXG4gICAgICAgIHtcclxuICAgICAgICAgIGZvcihsZXQgY29sb3IgPSAwO2NvbG9yIDwgODsrK2NvbG9yKXtcclxuICAgICAgICAgICAgbGV0IGkgPSAweDA7XHJcbiAgICAgICAgICAgIGZvcihsZXQgeSA9IDA7eSA8IDE2OysreSl7XHJcbiAgICAgICAgICAgICAgZm9yKGxldCB4ID0gMDt4IDwgMTY7Kyt4KXtcclxuICAgICAgICAgICAgICAgIGNoYXJDb2RlQnVmZmVyW3ggKyB5ICogY2hhckNvZGVCdWZmZXJXaWR0aF0gPSBpICUgMjU2O1xyXG4gICAgICAgICAgICAgICAgY2hhckF0dHJCdWZmZXJbeCArIHkgKiBjaGFyQ29kZUJ1ZmZlcldpZHRoXSA9IGNvbG9yIDw8IDQgfCAoNyAtIGNvbG9yKTtcclxuICAgICAgICAgICAgICAgIGNoYXJDb2RlQnVmZmVyW3ggKyAxNiArIHkgKiBjaGFyQ29kZUJ1ZmZlcldpZHRoXSA9IGkgJSAyNTY7XHJcbiAgICAgICAgICAgICAgICBjaGFyQXR0ckJ1ZmZlclt4ICsgMTYgKyB5ICogY2hhckNvZGVCdWZmZXJXaWR0aF0gPSAweDgwIHwgY29sb3IgPDwgNCB8ICg3LWNvbG9yKTtcclxuICAgICAgICAgICAgICAgICsraTtcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgeWllbGQ7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIC8vIHlpZWxkO1xyXG4gICAgICAgIC8vIGZvcihsZXQgaSA9IDI1NjtpIDwgNTEyOysraSl7XHJcbiAgICAgICAgLy8gICBjaGFyQ29kZUJ1ZmZlclsoaSAvIDQwICogNjQpIHwgMCArIGkgJSA0MF0gPSBpIC0gMjU2O1xyXG4gICAgICAgIC8vICAgY2hhckF0dHJCdWZmZXJbKGkgLyA0MCAqIDY0KSB8IDAgKyBpICUgNDBdID0weDE3O1xyXG4gICAgICAgIC8vIH1cclxuICAgICAgICAvLyB5aWVsZDtcclxuICAgICAgICAvLyBmb3IobGV0IGkgPSA1MTI7aSA8IDc2ODsrK2kpe1xyXG4gICAgICAgIC8vICAgY2hhckNvZGVCdWZmZXJbKGkgLyA0MCAqIDY0KSB8IDAgKyBpICUgNDBdID0gaSAtIDUxMjtcclxuICAgICAgICAvLyAgIGNoYXJBdHRyQnVmZmVyWyhpIC8gNDAgKiA2NCkgfCAwICsgaSAlIDQwXSA9MHhmMTtcclxuICAgICAgICAvLyB9XHJcbiAgICAgICAgLy8geWllbGQ7XHJcbiAgICAgICAgY2xzKCk7XHJcbiAgICAgICAgZm9yKGxldCBpID0gMDtpIDwgMTI4OysraSl7XHJcbiAgICAgICAgICB5aWVsZDtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgICAgdXBkYXRlU3RhdHVzKFNUQVRVUy5zdG9wKTtcclxuICAgIH0pKCk7ICBcclxuICAgIG1haW4gPSBnZW4ubmV4dC5iaW5kKGdlbik7XHJcbiAgfVxyXG5cclxuICBydW5CdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCgpPT57XHJcbiAgICB1cGRhdGVTdGF0dXMoU1RBVFVTLnJ1bik7XHJcbiAgICBydW4oKTtcclxuICB9KTtcclxuICBcclxuICBwYXVzZUJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsKCk9PntcclxuICAgIGlmKHN0YXR1cyA9PSBTVEFUVVMucGF1c2Upe1xyXG4gICAgICB1cGRhdGVTdGF0dXMoU1RBVFVTLnJ1bik7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB1cGRhdGVTdGF0dXMoU1RBVFVTLnBhdXNlKTtcclxuICAgIH1cclxuICB9KTtcclxuXHJcbiAgc3RvcEJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsKCk9PntcclxuICAgIHVwZGF0ZVN0YXR1cyhTVEFUVVMuc3RvcCk7XHJcbiAgfSk7XHJcblxyXG4gIC8vIHJlc2V0QnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywoKT0+e1xyXG4gIC8vICAgdXBkYXRlU3RhdHVzKFNUQVRVUy5yZXNldCk7XHJcbiAgLy8gfSk7XHJcblxyXG4gIHVwZGF0ZVN0YXR1cyhTVEFUVVMuc3RvcCk7XHJcbiAgcmVuZGVyKCk7XHJcbn0pO1xyXG4iXX0=
