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
var charCodes = exports.charCodes = [
// 0x00
[0x00, 0x00], [0x00, 0x00], [0x00, 0x00], [0x00, 0x00], [0x00, 0x00], [0x00, 0x00], [0x00, 0x00], [0x00, 0x00], [0x00, 0x00], [0x00, 0x00], [0x00, 0x00], [0x00, 0x00], [0x00, 0x00], [0x00, 0x00], [0x00, 0x00], [0x00, 0x00],
// 0x10
[0x00, 0x00], [0x00, 0x00], [0x00, 0x00], [0x00, 0x00], [0x00, 0x00], [0x00, 0x00], [0x00, 0x00], [0x00, 0x00], [0x00, 0x00], [0x00, 0x00], [0x00, 0x00], [0x00, 0x00], [0x00, 0x00], [0x00, 0x00], [0x00, 0x00], [0x00, 0x00],
// 0x20
[0x00, 0x00], [0x61, 0x00], [0x62, 0x00], [0x63, 0x00], [0x64, 0x00], [0x65, 0x00], [0x66, 0x00], [0x67, 0x00], [0x68, 0x00], [0x69, 0x00], [0x6b, 0x00], [0x6a, 0x00], [0x2f, 0x00], [0x2a, 0x00], [0x2e, 0x00], [0x2d, 0x00],
// 0x30
[0x20, 0x00], [0x21, 0x00], [0x22, 0x00], [0x23, 0x00], [0x24, 0x00], [0x25, 0x00], [0x26, 0x00], [0x27, 0x00], [0x28, 0x00], [0x29, 0x00], [0x4f, 0x00], [0x2c, 0x00], [0x51, 0x00], [0x2b, 0x00], [0x57, 0x00], [0x49, 0x00],
// 0x40
[0x55, 0x00], [0x01, 0x00], [0x02, 0x00], [0x03, 0x00], [0x04, 0x00], [0x05, 0x00], [0x06, 0x00], [0x07, 0x00], [0x08, 0x00], [0x09, 0x00], [0x0a, 0x00], [0x0b, 0x00], [0x0c, 0x00], [0x0d, 0x00], [0x0e, 0x00], [0x0f, 0x00],
// 0x50
[0x10, 0x00], [0x11, 0x00], [0x12, 0x00], [0x13, 0x00], [0x14, 0x00], [0x15, 0x00], [0x16, 0x00], [0x17, 0x00], [0x18, 0x00], [0x19, 0x00], [0x1a, 0x00], [0x52, 0x00], [0xdd, 0x00], [0x54, 0x00], [0x00, 0x00], [0x3c, 0x00],
// 0x60
[0x00, 0x00], [0x01, 0x80], [0x02, 0x80], [0x03, 0x80], [0x04, 0x80], [0x05, 0x80], [0x06, 0x80], [0x07, 0x80], [0x08, 0x80], [0x09, 0x80], [0x0a, 0x80], [0x0b, 0x80], [0x0c, 0x80], [0x0d, 0x80], [0x0e, 0x80], [0x0f, 0x80],
// 0x7f
[0x10, 0x80], [0x11, 0x80], [0x12, 0x80], [0x13, 0x80], [0x14, 0x80], [0x15, 0x80], [0x16, 0x80], [0x17, 0x80], [0x18, 0x80], [0x19, 0x80], [0x1a, 0x80], [0x00, 0x00], [0x00, 0x00], [0x00, 0x00], [0x00, 0x00], [0x00, 0x00]];

var canaCodes = exports.canaCodes = [
// 0xff60
[0x00, 0x00], //
[0xbd, 0x00], // ｡
[0x9d, 0x00], // ｢
[0xb1, 0x00], // ｣
[0xb5, 0x00], // ､
[0xb9, 0x00], // ･
[0xb4, 0x00], // ｦ
[0x9e, 0x00], // ｧ
[0xb2, 0x00], // ｨ
[0xb6, 0x00], // ｩ
[0xba, 0x00], // ｪ
[0xbe, 0x00], // ｫ
[0x9f, 0x00], // ｬ
[0xb3, 0x00], // ｭ
[0xb7, 0x00], // ｮ
[0xbb, 0x00], // ｯ

[0xbf, 0x00], // -
[0xa3, 0x00], // ｱ
[0x85, 0x00], // ｲ
[0xa4, 0x00], // ｳ
[0xa5, 0x00], // ｴ
[0xa6, 0x00], // ｵ
[0x94, 0x00], // ｶ
[0x87, 0x00], // ｷ
[0x88, 0x00], // ｸ
[0x9c, 0x00], // ｹ
[0x82, 0x00], // ｺ
[0x98, 0x00], // ｻ
[0x84, 0x00], // ｼ
[0x92, 0x00], // ｽ
[0x90, 0x00], // ｾ
[0x83, 0x00], // ｿ

[0x91, 0x00], // ﾀ
[0x81, 0x00], // ﾁ
[0x9a, 0x00], // ﾂ
[0x97, 0x00], // ﾃ
[0x93, 0x00], // ﾄ
[0x95, 0x00], // ﾅ
[0x89, 0x00], // ﾆ
[0xa1, 0x00], // ﾇ
[0xaf, 0x00], // ﾈ
[0x8b, 0x00], // ﾉ
[0x86, 0x00], // ﾊ
[0x96, 0x00], // ﾋ
[0xa2, 0x00], // ﾌ
[0xab, 0x00], // ﾍ
[0xaa, 0x00], // ﾎ
[0x8a, 0x00], // ﾏ

[0x8e, 0x00], // ﾐ
[0xb0, 0x00], // ﾑ
[0xad, 0x00], // ﾒ
[0x8d, 0x00], // ﾓ
[0xa7, 0x00], // ﾔ
[0xa8, 0x00], // ﾕ
[0xa9, 0x00], // ﾖ
[0x8f, 0x00], // ﾗ
[0x8c, 0x00], // ﾘ
[0xae, 0x00], // ﾙ
[0xac, 0x00], // ﾚ
[0x9b, 0x00], // ﾛ
[0xa0, 0x00], // ﾜ
[0x99, 0x00], // ﾝ
[0xbc, 0x00], // ﾞ
[0xb8, 0x00]];

},{}],292:[function(require,module,exports){
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

},{}],293:[function(require,module,exports){
"use strict";

require("babel-polyfill");

var _mz700fon = require("./mz700fon");

var _charCodes = require("./charCodes");

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

var fshaderPSrc = "precision mediump float;\n\nuniform sampler2D textureB;\nuniform sampler2D textureG;\nuniform sampler2D textureR;\nuniform sampler2D pallet_color;\nuniform sampler2D textureFont;\nuniform sampler2D textureCharCode;\nuniform sampler2D textureCharAttr;\nuniform float time;\n\nvarying vec2 vtexture_coord;\n\n// グラフィック表示\nvec4 graphicPlane(void)\n{\n  //テクスチャ座標よりビット位置を求め、そのビットが立った2進数値を得る。\n  float t = exp2(floor(mod(vtexture_coord.x * 512.0,8.0)));\n  // RGB各プレーンの現在座標のバイトデータを読み込む\n  vec4 rt = texture2D(textureR, vtexture_coord);\n  vec4 gt = texture2D(textureG, vtexture_coord);\n  vec4 bt = texture2D(textureB, vtexture_coord);\n  \n  // バイトデータの中でビットが立っているかどうかを調べる\n  // Rプレーン\n  float r = floor(mod(min(rt.x * 256.0,255.0) / t,2.0)) * 4.0;\n  // Gプレーン\n  float g = floor(mod(min(gt.x * 256.0,255.0) / t,2.0)) * 2.0;\n  // Bプレーン\n  float b = floor(mod(min(bt.x * 256.0,255.0) / t,2.0));\n\n  // 各色の値を足して正規化を行い、パレットインデックスから実際の色を得る \n  vec4 p = texture2D(pallet_color,vec2((r + g + b) / 8.0 ,0.5));\n  float i = min(p.x * 256.0,255.0);\n  float ar = floor(mod(i * 0.5,2.0)); // bit3\n  float ag = floor(mod(i * 0.25,2.0));  // bit2\n  float ab = floor(mod(i,2.0)); // bit1\n  return vec4(ar,ag,ab,1.0);\n}\n\n// 文字表示\nvec4 textPlane(void){\n  // キャラクタコードを読み出し\n  vec4 cct = texture2D(textureCharCode, vtexture_coord);\n  float cc = min(cct.x * 256.0,255.0);// キャラクターコード\n\n  // アトリビュートを読み出し\n  vec4 attrt = texture2D(textureCharAttr, vtexture_coord);\n  \n  // 表示対象の文字のビット位置を求める\n  float x = exp2(floor(mod(vtexture_coord.x * 512.0,8.0)));\n  // 表示対象の文字のY位置を求める\n  float y = floor(mod(vtexture_coord.y * 256.0,8.0));\n  \n  // アトリビュートの評価 \n\n  float i = min(attrt.x * 256.0,255.0);// アトリビュートデータ\n  \n  // キャラクタセット(0.0 .. セット0, 1.0 .. セット1 )\n  float att = floor(mod(i / 128.0,2.0)) * 8.0;// bit 7\n\n  // 文字色\n  float ccg = floor(mod(i / 64.0,2.0));// bit 6\n  float ccr = floor(mod(i / 32.0,2.0));// bit 5\n  float ccb = floor(mod(i / 16.0,2.0));// bit 4\n\n  // 背景色\n  float bgg = floor(mod(i / 4.0,2.0));// bit 2\n  float bgr = floor(mod(i / 2.0,2.0));// bit 1\n  float bgb = floor(mod(i ,2.0));// bit 0\n  \n\n  // フォント読み出し位置\n  vec2 fontpos = vec2(cc / 256.0,(y + att) / 16.0);\n  // フォントデータの読み出し\n  vec4 pixByte = texture2D(textureFont,fontpos);\n  // 指定位置のビットが立っているかチェック\n  float pixBit = floor(mod(min(pixByte.x * 256.0,255.0) / x,2.0));\n  \n  if(pixBit == 1.0){\n    // ビットが立っているときは、文字色を設定\n    return vec4(ccr,ccg,ccb,1.0);\n  } \n  // ビットが立っていないときは背景色を設定\n  return vec4(bgr,bgg,bgb,1.0);\n}\n\nvoid main(void){\n  vec4 textColor = textPlane();\n  if((textColor.r + textColor.g + textColor.b) > 0.0){\n    gl_FragColor = textColor;  \n  } else {\n    vec4 color = graphicPlane();\n    gl_FragColor = color;\n  }\n}\n";
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
      virtualHeight = 200;
  var bufferWidth = 512,
      bufferHeight = 256,
      bufferXSize = bufferWidth / 8;
  var fontTexWidth = 256,
      fontTexHeight = 16; //8 * 16 * 2;
  var charCodeBufferWidth = 512 / 8,
      charCodeBufferHeight = 32,
      consoleWidth = 40,
      consoleHeight = 25;
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

  // ビットのMSBとLSBを入れ替えるメソッド
  function rev(x) {
    x = x & 0xff;
    // 0bitと1bit、2bitと3bit、4bitと5bit、6bitと7ビットの反転
    x = (x & 0x55) << 1 | x >>> 1 & 0x55;
    // 0-1bitと2-3bit、4-5bitと6-7bitの反転
    x = (x & 0x33) << 2 | x >>> 2 & 0x33;
    // 0-3bit、4-7bitの反転
    x = (x & 0x0F) << 4 | x >>> 4 & 0x0F;
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
          fontBuffer[idx + (iy + offset) * 256] = rev(byte);
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

  function createLuminaceTexture(textureNo, width, height, srcBuffer) {
    var texture = gl.createTexture();
    gl.activeTexture(textureNo);
    gl.bindTexture(gl.TEXTURE_2D, texture);
    //	gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.LUMINANCE, width, height, 0, gl.LUMINANCE, gl.UNSIGNED_BYTE, srcBuffer);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    return texture;
  }

  function updateLuminanceTexture(textureNo, texture, width, height, srcBuffer) {
    gl.activeTexture(textureNo);
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.LUMINANCE, width, height, 0, gl.LUMINANCE, gl.UNSIGNED_BYTE, srcBuffer);
  }

  var textureB = createLuminaceTexture(gl.TEXTURE0, bufferXSize, bufferHeight, bufferB);
  var textureG = createLuminaceTexture(gl.TEXTURE1, bufferXSize, bufferHeight, bufferG);
  var textureR = createLuminaceTexture(gl.TEXTURE2, bufferXSize, bufferHeight, bufferR);

  var paletteTexture = createLuminaceTexture(gl.TEXTURE3, palletColors.length, 1, palletColors);
  var fontTexture = createLuminaceTexture(gl.TEXTURE4, fontTexWidth, fontTexHeight, fontBuffer);
  var charCodeTexture = createLuminaceTexture(gl.TEXTURE5, charCodeBufferWidth, charCodeBufferHeight, charCodeBuffer);
  var charAttrTexture = createLuminaceTexture(gl.TEXTURE6, charCodeBufferWidth, charCodeBufferHeight, charAttrBuffer);

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

    updateLuminanceTexture(gl.TEXTURE0, textureB, bufferXSize, bufferHeight, bufferB);
    updateLuminanceTexture(gl.TEXTURE1, textureG, bufferXSize, bufferHeight, bufferG);
    updateLuminanceTexture(gl.TEXTURE2, textureR, bufferXSize, bufferHeight, bufferR);

    updateLuminanceTexture(gl.TEXTURE3, paletteTexture, palletColors.length, 1, palletColors);

    updateLuminanceTexture(gl.TEXTURE5, charCodeTexture, charCodeBufferWidth, charCodeBufferHeight, charCodeBuffer);
    updateLuminanceTexture(gl.TEXTURE6, charAttrTexture, charCodeBufferWidth, charCodeBufferHeight, charAttrBuffer);

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

  // グラフィックのメソッドたち

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

    for (var i = 0, e = charCodeBufferWidth * charCodeBufferHeight; i < e; ++i) {
      charCodeBuffer[i] = 0;
      charAttrBuffer[i] = 0;
    }
  }

  // 文字列の表示
  function addPosition(offset, delta) {
    offset += delta;
  }

  function print(x, y, str, color, bgcolor) {
    var hirakana = arguments.length <= 5 || arguments[5] === undefined ? false : arguments[5];

    var offset = x + y * charCodeBufferWidth;
    for (var i = 0, e = str.length; i < e; ++i) {
      var code = str.charCodeAt(i);
      if (code >= 0xff60 && code < 0xffa0) {
        code -= 0xff60;
        charCodeBuffer[offset] = _charCodes.canaCodes[code][0];
        charAttrBuffer[offset] = color << 4 | bgcolor | _charCodes.canaCodes[code][1];
        if (hirakana) charAttrBuffer[offset] |= 0x80;
        offset += 1;
      } else if (code < 0x80) {
        charCodeBuffer[offset] = _charCodes.charCodes[code][0];
        charAttrBuffer[offset] = color << 4 | bgcolor | _charCodes.charCodes[code][1];
        if (hirakana) charAttrBuffer[offset] |= 0x80;
        offset += 1;
      } else if (code <= 0xff) {
        charCodeBuffer[offset] = code;
        charAttrBuffer[offset] = color << 4 | bgcolor;
        if (hirakana) charAttrBuffer[offset] |= 0x80;
        offset += 1;
      } else {
        offset += 1;
      }
    }
  }

  function printDirect(x, y, str, color, bgcolor) {
    var charset = arguments.length <= 5 || arguments[5] === undefined ? 0 : arguments[5];

    var offset = x + y * charCodeBufferWidth;
    for (var i = 0, e = str.length; i < e; ++i) {
      var code = str.charCodeAt(i);
      charCodeBuffer[offset] = code;
      charAttrBuffer[offset] = color << 4 | bgcolor;
      charAttrBuffer[offset] |= charset << 7;
      offset += 1;
    }
  }

  // メイン
  function run() {
    var gen = regeneratorRuntime.mark(function _callee() {
      var mes, mes1, i, j, _j, _i, xs, xe, ys, ye, x, y, c, _j2;

      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (!true) {
                _context.next = 101;
                break;
              }

              cls();
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
              mes = 'MZ-700ﾌｫﾝﾄｦﾋｮｳｼﾞﾃﾞﾓ';
              mes1 = '                   ';
              i = 0;

            case 5:
              if (!(i < 5)) {
                _context.next = 25;
                break;
              }

              print(20 - mes.length / 2 | 0, 10, mes, 7, 0);
              j = 0;

            case 8:
              if (!(j < 16)) {
                _context.next = 14;
                break;
              }

              _context.next = 11;
              return;

            case 11:
              ++j;
              _context.next = 8;
              break;

            case 14:
              print(20 - mes1.length / 2 | 0, 10, mes1, 7, 0);
              _j = 0;

            case 16:
              if (!(_j < 16)) {
                _context.next = 22;
                break;
              }

              _context.next = 19;
              return;

            case 19:
              ++_j;
              _context.next = 16;
              break;

            case 22:
              ++i;
              _context.next = 5;
              break;

            case 25:
              _i = 0;
              xs = 0, xe = 40, ys = 0, ye = 25;
              x = 0, y = 0, c = 0;

            case 28:
              if (!true) {
                _context.next = 91;
                break;
              }

              x = xs;

            case 30:
              if (!(x < xe)) {
                _context.next = 39;
                break;
              }

              printDirect(x, y, String.fromCharCode(_i % 256), c % 8, 7 - c % 8, _i > 255 ? 1 : 0);
              ++_i;
              _i = _i % 512;
              _context.next = 36;
              return;

            case 36:
              ++x;
              _context.next = 30;
              break;

            case 39:
              ++c;
              --x;
              ++ys;

              if (!(xs >= xe || ys >= ye)) {
                _context.next = 44;
                break;
              }

              return _context.abrupt("break", 91);

            case 44:
              y = ys;

            case 45:
              if (!(y < ye)) {
                _context.next = 54;
                break;
              }

              printDirect(x, y, String.fromCharCode(_i % 256), c % 8, 7 - c % 8, _i > 255 ? 1 : 0);
              ++_i;
              _i = _i % 512;
              _context.next = 51;
              return;

            case 51:
              ++y;
              _context.next = 45;
              break;

            case 54:
              ++c;
              --y;
              --xe;

              if (!(xs >= xe || ys >= ye)) {
                _context.next = 59;
                break;
              }

              return _context.abrupt("break", 91);

            case 59:
              x = xe - 1;

            case 60:
              if (!(x >= xs)) {
                _context.next = 69;
                break;
              }

              printDirect(x, y, String.fromCharCode(_i % 256), c % 8, 7 - c % 8, _i > 255 ? 1 : 0);
              ++_i;
              _i = _i % 512;
              _context.next = 66;
              return;

            case 66:
              --x;
              _context.next = 60;
              break;

            case 69:
              ++c;
              --ye;
              ++x;

              if (!(xs >= xe || ys >= ye)) {
                _context.next = 74;
                break;
              }

              return _context.abrupt("break", 91);

            case 74:
              y = ye - 1;

            case 75:
              if (!(y >= ys)) {
                _context.next = 84;
                break;
              }

              printDirect(x, y, String.fromCharCode(_i % 256), c % 8, 7 - c % 8, _i > 255 ? 1 : 0);
              ++_i;
              _i = _i % 512;
              _context.next = 81;
              return;

            case 81:
              --y;
              _context.next = 75;
              break;

            case 84:
              ++c;
              ++y;
              ++xs;

              if (!(xs >= xe || ys >= ye)) {
                _context.next = 89;
                break;
              }

              return _context.abrupt("break", 91);

            case 89:
              _context.next = 28;
              break;

            case 91:
              _j2 = 0;

            case 92:
              if (!(_j2 < 64)) {
                _context.next = 98;
                break;
              }

              _context.next = 95;
              return;

            case 95:
              ++_j2;
              _context.next = 92;
              break;

            case 98:
              cls();
              _context.next = 0;
              break;

            case 101:
              updateStatus(STATUS.stop);

            case 102:
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

},{"./charCodes":291,"./mz700fon":292,"babel-polyfill":1}]},{},[293])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJub2RlX21vZHVsZXMvYmFiZWwtcG9seWZpbGwvbGliL2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsLXBvbHlmaWxsL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ZuL3JlZ2V4cC9lc2NhcGUuanMiLCJub2RlX21vZHVsZXMvYmFiZWwtcG9seWZpbGwvbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9fYS1mdW5jdGlvbi5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC1wb2x5ZmlsbC9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL19hLW51bWJlci12YWx1ZS5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC1wb2x5ZmlsbC9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL19hZGQtdG8tdW5zY29wYWJsZXMuanMiLCJub2RlX21vZHVsZXMvYmFiZWwtcG9seWZpbGwvbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9fYW4taW5zdGFuY2UuanMiLCJub2RlX21vZHVsZXMvYmFiZWwtcG9seWZpbGwvbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9fYW4tb2JqZWN0LmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsLXBvbHlmaWxsL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX2FycmF5LWNvcHktd2l0aGluLmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsLXBvbHlmaWxsL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX2FycmF5LWZpbGwuanMiLCJub2RlX21vZHVsZXMvYmFiZWwtcG9seWZpbGwvbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9fYXJyYXktZnJvbS1pdGVyYWJsZS5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC1wb2x5ZmlsbC9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL19hcnJheS1pbmNsdWRlcy5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC1wb2x5ZmlsbC9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL19hcnJheS1tZXRob2RzLmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsLXBvbHlmaWxsL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX2FycmF5LXJlZHVjZS5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC1wb2x5ZmlsbC9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL19hcnJheS1zcGVjaWVzLWNyZWF0ZS5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC1wb2x5ZmlsbC9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL19iaW5kLmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsLXBvbHlmaWxsL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX2NsYXNzb2YuanMiLCJub2RlX21vZHVsZXMvYmFiZWwtcG9seWZpbGwvbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9fY29mLmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsLXBvbHlmaWxsL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX2NvbGxlY3Rpb24tc3Ryb25nLmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsLXBvbHlmaWxsL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX2NvbGxlY3Rpb24tdG8tanNvbi5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC1wb2x5ZmlsbC9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL19jb2xsZWN0aW9uLXdlYWsuanMiLCJub2RlX21vZHVsZXMvYmFiZWwtcG9seWZpbGwvbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9fY29sbGVjdGlvbi5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC1wb2x5ZmlsbC9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL19jb3JlLmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsLXBvbHlmaWxsL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX2N0eC5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC1wb2x5ZmlsbC9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL19kYXRlLXRvLXByaW1pdGl2ZS5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC1wb2x5ZmlsbC9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL19kZWZpbmVkLmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsLXBvbHlmaWxsL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX2Rlc2NyaXB0b3JzLmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsLXBvbHlmaWxsL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX2RvbS1jcmVhdGUuanMiLCJub2RlX21vZHVsZXMvYmFiZWwtcG9seWZpbGwvbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9fZW51bS1idWcta2V5cy5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC1wb2x5ZmlsbC9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL19lbnVtLWtleXMuanMiLCJub2RlX21vZHVsZXMvYmFiZWwtcG9seWZpbGwvbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9fZXhwb3J0LmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsLXBvbHlmaWxsL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX2ZhaWxzLWlzLXJlZ2V4cC5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC1wb2x5ZmlsbC9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL19mYWlscy5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC1wb2x5ZmlsbC9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL19maXgtcmUtd2tzLmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsLXBvbHlmaWxsL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX2ZsYWdzLmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsLXBvbHlmaWxsL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX2Zvci1vZi5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC1wb2x5ZmlsbC9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL19nbG9iYWwuanMiLCJub2RlX21vZHVsZXMvYmFiZWwtcG9seWZpbGwvbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9faGFzLmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsLXBvbHlmaWxsL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX2hpZGUuanMiLCJub2RlX21vZHVsZXMvYmFiZWwtcG9seWZpbGwvbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9faHRtbC5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC1wb2x5ZmlsbC9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL19pZTgtZG9tLWRlZmluZS5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC1wb2x5ZmlsbC9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL19pbmhlcml0LWlmLXJlcXVpcmVkLmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsLXBvbHlmaWxsL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX2ludm9rZS5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC1wb2x5ZmlsbC9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL19pb2JqZWN0LmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsLXBvbHlmaWxsL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX2lzLWFycmF5LWl0ZXIuanMiLCJub2RlX21vZHVsZXMvYmFiZWwtcG9seWZpbGwvbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9faXMtYXJyYXkuanMiLCJub2RlX21vZHVsZXMvYmFiZWwtcG9seWZpbGwvbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9faXMtaW50ZWdlci5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC1wb2x5ZmlsbC9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL19pcy1vYmplY3QuanMiLCJub2RlX21vZHVsZXMvYmFiZWwtcG9seWZpbGwvbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9faXMtcmVnZXhwLmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsLXBvbHlmaWxsL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX2l0ZXItY2FsbC5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC1wb2x5ZmlsbC9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL19pdGVyLWNyZWF0ZS5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC1wb2x5ZmlsbC9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL19pdGVyLWRlZmluZS5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC1wb2x5ZmlsbC9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL19pdGVyLWRldGVjdC5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC1wb2x5ZmlsbC9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL19pdGVyLXN0ZXAuanMiLCJub2RlX21vZHVsZXMvYmFiZWwtcG9seWZpbGwvbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9faXRlcmF0b3JzLmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsLXBvbHlmaWxsL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX2tleW9mLmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsLXBvbHlmaWxsL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX2xpYnJhcnkuanMiLCJub2RlX21vZHVsZXMvYmFiZWwtcG9seWZpbGwvbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9fbWF0aC1leHBtMS5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC1wb2x5ZmlsbC9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL19tYXRoLWxvZzFwLmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsLXBvbHlmaWxsL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX21hdGgtc2lnbi5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC1wb2x5ZmlsbC9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL19tZXRhLmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsLXBvbHlmaWxsL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX21ldGFkYXRhLmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsLXBvbHlmaWxsL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX21pY3JvdGFzay5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC1wb2x5ZmlsbC9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL19vYmplY3QtYXNzaWduLmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsLXBvbHlmaWxsL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX29iamVjdC1jcmVhdGUuanMiLCJub2RlX21vZHVsZXMvYmFiZWwtcG9seWZpbGwvbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9fb2JqZWN0LWRwLmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsLXBvbHlmaWxsL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX29iamVjdC1kcHMuanMiLCJub2RlX21vZHVsZXMvYmFiZWwtcG9seWZpbGwvbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9fb2JqZWN0LWZvcmNlZC1wYW0uanMiLCJub2RlX21vZHVsZXMvYmFiZWwtcG9seWZpbGwvbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9fb2JqZWN0LWdvcGQuanMiLCJub2RlX21vZHVsZXMvYmFiZWwtcG9seWZpbGwvbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9fb2JqZWN0LWdvcG4tZXh0LmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsLXBvbHlmaWxsL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX29iamVjdC1nb3BuLmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsLXBvbHlmaWxsL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX29iamVjdC1nb3BzLmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsLXBvbHlmaWxsL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX29iamVjdC1ncG8uanMiLCJub2RlX21vZHVsZXMvYmFiZWwtcG9seWZpbGwvbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9fb2JqZWN0LWtleXMtaW50ZXJuYWwuanMiLCJub2RlX21vZHVsZXMvYmFiZWwtcG9seWZpbGwvbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9fb2JqZWN0LWtleXMuanMiLCJub2RlX21vZHVsZXMvYmFiZWwtcG9seWZpbGwvbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9fb2JqZWN0LXBpZS5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC1wb2x5ZmlsbC9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL19vYmplY3Qtc2FwLmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsLXBvbHlmaWxsL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX29iamVjdC10by1hcnJheS5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC1wb2x5ZmlsbC9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL19vd24ta2V5cy5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC1wb2x5ZmlsbC9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL19wYXJzZS1mbG9hdC5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC1wb2x5ZmlsbC9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL19wYXJzZS1pbnQuanMiLCJub2RlX21vZHVsZXMvYmFiZWwtcG9seWZpbGwvbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9fcGFydGlhbC5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC1wb2x5ZmlsbC9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL19wYXRoLmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsLXBvbHlmaWxsL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX3Byb3BlcnR5LWRlc2MuanMiLCJub2RlX21vZHVsZXMvYmFiZWwtcG9seWZpbGwvbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9fcmVkZWZpbmUtYWxsLmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsLXBvbHlmaWxsL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX3JlZGVmaW5lLmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsLXBvbHlmaWxsL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX3JlcGxhY2VyLmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsLXBvbHlmaWxsL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX3NhbWUtdmFsdWUuanMiLCJub2RlX21vZHVsZXMvYmFiZWwtcG9seWZpbGwvbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9fc2V0LXByb3RvLmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsLXBvbHlmaWxsL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX3NldC1zcGVjaWVzLmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsLXBvbHlmaWxsL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX3NldC10by1zdHJpbmctdGFnLmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsLXBvbHlmaWxsL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX3NoYXJlZC1rZXkuanMiLCJub2RlX21vZHVsZXMvYmFiZWwtcG9seWZpbGwvbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9fc2hhcmVkLmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsLXBvbHlmaWxsL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX3NwZWNpZXMtY29uc3RydWN0b3IuanMiLCJub2RlX21vZHVsZXMvYmFiZWwtcG9seWZpbGwvbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9fc3RyaWN0LW1ldGhvZC5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC1wb2x5ZmlsbC9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL19zdHJpbmctYXQuanMiLCJub2RlX21vZHVsZXMvYmFiZWwtcG9seWZpbGwvbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9fc3RyaW5nLWNvbnRleHQuanMiLCJub2RlX21vZHVsZXMvYmFiZWwtcG9seWZpbGwvbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9fc3RyaW5nLWh0bWwuanMiLCJub2RlX21vZHVsZXMvYmFiZWwtcG9seWZpbGwvbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9fc3RyaW5nLXBhZC5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC1wb2x5ZmlsbC9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL19zdHJpbmctcmVwZWF0LmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsLXBvbHlmaWxsL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX3N0cmluZy10cmltLmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsLXBvbHlmaWxsL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX3N0cmluZy13cy5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC1wb2x5ZmlsbC9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL190YXNrLmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsLXBvbHlmaWxsL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX3RvLWluZGV4LmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsLXBvbHlmaWxsL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX3RvLWludGVnZXIuanMiLCJub2RlX21vZHVsZXMvYmFiZWwtcG9seWZpbGwvbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9fdG8taW9iamVjdC5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC1wb2x5ZmlsbC9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL190by1sZW5ndGguanMiLCJub2RlX21vZHVsZXMvYmFiZWwtcG9seWZpbGwvbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9fdG8tb2JqZWN0LmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsLXBvbHlmaWxsL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX3RvLXByaW1pdGl2ZS5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC1wb2x5ZmlsbC9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL190eXBlZC1hcnJheS5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC1wb2x5ZmlsbC9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL190eXBlZC1idWZmZXIuanMiLCJub2RlX21vZHVsZXMvYmFiZWwtcG9seWZpbGwvbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9fdHlwZWQuanMiLCJub2RlX21vZHVsZXMvYmFiZWwtcG9seWZpbGwvbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9fdWlkLmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsLXBvbHlmaWxsL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX3drcy5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC1wb2x5ZmlsbC9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2NvcmUuZ2V0LWl0ZXJhdG9yLW1ldGhvZC5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC1wb2x5ZmlsbC9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2NvcmUuaXMtaXRlcmFibGUuanMiLCJub2RlX21vZHVsZXMvYmFiZWwtcG9seWZpbGwvbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9jb3JlLnJlZ2V4cC5lc2NhcGUuanMiLCJub2RlX21vZHVsZXMvYmFiZWwtcG9seWZpbGwvbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lczYuYXJyYXkuY29weS13aXRoaW4uanMiLCJub2RlX21vZHVsZXMvYmFiZWwtcG9seWZpbGwvbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lczYuYXJyYXkuZXZlcnkuanMiLCJub2RlX21vZHVsZXMvYmFiZWwtcG9seWZpbGwvbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lczYuYXJyYXkuZmlsbC5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC1wb2x5ZmlsbC9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzNi5hcnJheS5maWx0ZXIuanMiLCJub2RlX21vZHVsZXMvYmFiZWwtcG9seWZpbGwvbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lczYuYXJyYXkuZmluZC1pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC1wb2x5ZmlsbC9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzNi5hcnJheS5maW5kLmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsLXBvbHlmaWxsL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXM2LmFycmF5LmZvci1lYWNoLmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsLXBvbHlmaWxsL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXM2LmFycmF5LmZyb20uanMiLCJub2RlX21vZHVsZXMvYmFiZWwtcG9seWZpbGwvbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lczYuYXJyYXkuaW5kZXgtb2YuanMiLCJub2RlX21vZHVsZXMvYmFiZWwtcG9seWZpbGwvbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lczYuYXJyYXkuaXMtYXJyYXkuanMiLCJub2RlX21vZHVsZXMvYmFiZWwtcG9seWZpbGwvbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lczYuYXJyYXkuaXRlcmF0b3IuanMiLCJub2RlX21vZHVsZXMvYmFiZWwtcG9seWZpbGwvbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lczYuYXJyYXkuam9pbi5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC1wb2x5ZmlsbC9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzNi5hcnJheS5sYXN0LWluZGV4LW9mLmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsLXBvbHlmaWxsL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXM2LmFycmF5Lm1hcC5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC1wb2x5ZmlsbC9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzNi5hcnJheS5vZi5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC1wb2x5ZmlsbC9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzNi5hcnJheS5yZWR1Y2UtcmlnaHQuanMiLCJub2RlX21vZHVsZXMvYmFiZWwtcG9seWZpbGwvbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lczYuYXJyYXkucmVkdWNlLmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsLXBvbHlmaWxsL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXM2LmFycmF5LnNsaWNlLmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsLXBvbHlmaWxsL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXM2LmFycmF5LnNvbWUuanMiLCJub2RlX21vZHVsZXMvYmFiZWwtcG9seWZpbGwvbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lczYuYXJyYXkuc29ydC5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC1wb2x5ZmlsbC9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzNi5hcnJheS5zcGVjaWVzLmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsLXBvbHlmaWxsL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXM2LmRhdGUubm93LmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsLXBvbHlmaWxsL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXM2LmRhdGUudG8taXNvLXN0cmluZy5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC1wb2x5ZmlsbC9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzNi5kYXRlLnRvLWpzb24uanMiLCJub2RlX21vZHVsZXMvYmFiZWwtcG9seWZpbGwvbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lczYuZGF0ZS50by1wcmltaXRpdmUuanMiLCJub2RlX21vZHVsZXMvYmFiZWwtcG9seWZpbGwvbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lczYuZGF0ZS50by1zdHJpbmcuanMiLCJub2RlX21vZHVsZXMvYmFiZWwtcG9seWZpbGwvbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lczYuZnVuY3Rpb24uYmluZC5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC1wb2x5ZmlsbC9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzNi5mdW5jdGlvbi5oYXMtaW5zdGFuY2UuanMiLCJub2RlX21vZHVsZXMvYmFiZWwtcG9seWZpbGwvbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lczYuZnVuY3Rpb24ubmFtZS5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC1wb2x5ZmlsbC9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzNi5tYXAuanMiLCJub2RlX21vZHVsZXMvYmFiZWwtcG9seWZpbGwvbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lczYubWF0aC5hY29zaC5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC1wb2x5ZmlsbC9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzNi5tYXRoLmFzaW5oLmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsLXBvbHlmaWxsL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXM2Lm1hdGguYXRhbmguanMiLCJub2RlX21vZHVsZXMvYmFiZWwtcG9seWZpbGwvbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lczYubWF0aC5jYnJ0LmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsLXBvbHlmaWxsL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXM2Lm1hdGguY2x6MzIuanMiLCJub2RlX21vZHVsZXMvYmFiZWwtcG9seWZpbGwvbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lczYubWF0aC5jb3NoLmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsLXBvbHlmaWxsL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXM2Lm1hdGguZXhwbTEuanMiLCJub2RlX21vZHVsZXMvYmFiZWwtcG9seWZpbGwvbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lczYubWF0aC5mcm91bmQuanMiLCJub2RlX21vZHVsZXMvYmFiZWwtcG9seWZpbGwvbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lczYubWF0aC5oeXBvdC5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC1wb2x5ZmlsbC9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzNi5tYXRoLmltdWwuanMiLCJub2RlX21vZHVsZXMvYmFiZWwtcG9seWZpbGwvbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lczYubWF0aC5sb2cxMC5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC1wb2x5ZmlsbC9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzNi5tYXRoLmxvZzFwLmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsLXBvbHlmaWxsL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXM2Lm1hdGgubG9nMi5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC1wb2x5ZmlsbC9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzNi5tYXRoLnNpZ24uanMiLCJub2RlX21vZHVsZXMvYmFiZWwtcG9seWZpbGwvbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lczYubWF0aC5zaW5oLmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsLXBvbHlmaWxsL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXM2Lm1hdGgudGFuaC5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC1wb2x5ZmlsbC9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzNi5tYXRoLnRydW5jLmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsLXBvbHlmaWxsL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXM2Lm51bWJlci5jb25zdHJ1Y3Rvci5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC1wb2x5ZmlsbC9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzNi5udW1iZXIuZXBzaWxvbi5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC1wb2x5ZmlsbC9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzNi5udW1iZXIuaXMtZmluaXRlLmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsLXBvbHlmaWxsL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXM2Lm51bWJlci5pcy1pbnRlZ2VyLmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsLXBvbHlmaWxsL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXM2Lm51bWJlci5pcy1uYW4uanMiLCJub2RlX21vZHVsZXMvYmFiZWwtcG9seWZpbGwvbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lczYubnVtYmVyLmlzLXNhZmUtaW50ZWdlci5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC1wb2x5ZmlsbC9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzNi5udW1iZXIubWF4LXNhZmUtaW50ZWdlci5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC1wb2x5ZmlsbC9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzNi5udW1iZXIubWluLXNhZmUtaW50ZWdlci5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC1wb2x5ZmlsbC9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzNi5udW1iZXIucGFyc2UtZmxvYXQuanMiLCJub2RlX21vZHVsZXMvYmFiZWwtcG9seWZpbGwvbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lczYubnVtYmVyLnBhcnNlLWludC5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC1wb2x5ZmlsbC9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzNi5udW1iZXIudG8tZml4ZWQuanMiLCJub2RlX21vZHVsZXMvYmFiZWwtcG9seWZpbGwvbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lczYubnVtYmVyLnRvLXByZWNpc2lvbi5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC1wb2x5ZmlsbC9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzNi5vYmplY3QuYXNzaWduLmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsLXBvbHlmaWxsL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXM2Lm9iamVjdC5jcmVhdGUuanMiLCJub2RlX21vZHVsZXMvYmFiZWwtcG9seWZpbGwvbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lczYub2JqZWN0LmRlZmluZS1wcm9wZXJ0aWVzLmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsLXBvbHlmaWxsL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXM2Lm9iamVjdC5kZWZpbmUtcHJvcGVydHkuanMiLCJub2RlX21vZHVsZXMvYmFiZWwtcG9seWZpbGwvbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lczYub2JqZWN0LmZyZWV6ZS5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC1wb2x5ZmlsbC9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzNi5vYmplY3QuZ2V0LW93bi1wcm9wZXJ0eS1kZXNjcmlwdG9yLmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsLXBvbHlmaWxsL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXM2Lm9iamVjdC5nZXQtb3duLXByb3BlcnR5LW5hbWVzLmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsLXBvbHlmaWxsL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXM2Lm9iamVjdC5nZXQtcHJvdG90eXBlLW9mLmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsLXBvbHlmaWxsL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXM2Lm9iamVjdC5pcy1leHRlbnNpYmxlLmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsLXBvbHlmaWxsL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXM2Lm9iamVjdC5pcy1mcm96ZW4uanMiLCJub2RlX21vZHVsZXMvYmFiZWwtcG9seWZpbGwvbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lczYub2JqZWN0LmlzLXNlYWxlZC5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC1wb2x5ZmlsbC9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzNi5vYmplY3QuaXMuanMiLCJub2RlX21vZHVsZXMvYmFiZWwtcG9seWZpbGwvbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lczYub2JqZWN0LmtleXMuanMiLCJub2RlX21vZHVsZXMvYmFiZWwtcG9seWZpbGwvbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lczYub2JqZWN0LnByZXZlbnQtZXh0ZW5zaW9ucy5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC1wb2x5ZmlsbC9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzNi5vYmplY3Quc2VhbC5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC1wb2x5ZmlsbC9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzNi5vYmplY3Quc2V0LXByb3RvdHlwZS1vZi5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC1wb2x5ZmlsbC9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzNi5vYmplY3QudG8tc3RyaW5nLmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsLXBvbHlmaWxsL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXM2LnBhcnNlLWZsb2F0LmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsLXBvbHlmaWxsL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXM2LnBhcnNlLWludC5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC1wb2x5ZmlsbC9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzNi5wcm9taXNlLmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsLXBvbHlmaWxsL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXM2LnJlZmxlY3QuYXBwbHkuanMiLCJub2RlX21vZHVsZXMvYmFiZWwtcG9seWZpbGwvbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lczYucmVmbGVjdC5jb25zdHJ1Y3QuanMiLCJub2RlX21vZHVsZXMvYmFiZWwtcG9seWZpbGwvbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lczYucmVmbGVjdC5kZWZpbmUtcHJvcGVydHkuanMiLCJub2RlX21vZHVsZXMvYmFiZWwtcG9seWZpbGwvbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lczYucmVmbGVjdC5kZWxldGUtcHJvcGVydHkuanMiLCJub2RlX21vZHVsZXMvYmFiZWwtcG9seWZpbGwvbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lczYucmVmbGVjdC5lbnVtZXJhdGUuanMiLCJub2RlX21vZHVsZXMvYmFiZWwtcG9seWZpbGwvbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lczYucmVmbGVjdC5nZXQtb3duLXByb3BlcnR5LWRlc2NyaXB0b3IuanMiLCJub2RlX21vZHVsZXMvYmFiZWwtcG9seWZpbGwvbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lczYucmVmbGVjdC5nZXQtcHJvdG90eXBlLW9mLmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsLXBvbHlmaWxsL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXM2LnJlZmxlY3QuZ2V0LmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsLXBvbHlmaWxsL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXM2LnJlZmxlY3QuaGFzLmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsLXBvbHlmaWxsL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXM2LnJlZmxlY3QuaXMtZXh0ZW5zaWJsZS5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC1wb2x5ZmlsbC9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzNi5yZWZsZWN0Lm93bi1rZXlzLmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsLXBvbHlmaWxsL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXM2LnJlZmxlY3QucHJldmVudC1leHRlbnNpb25zLmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsLXBvbHlmaWxsL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXM2LnJlZmxlY3Quc2V0LXByb3RvdHlwZS1vZi5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC1wb2x5ZmlsbC9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzNi5yZWZsZWN0LnNldC5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC1wb2x5ZmlsbC9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzNi5yZWdleHAuY29uc3RydWN0b3IuanMiLCJub2RlX21vZHVsZXMvYmFiZWwtcG9seWZpbGwvbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lczYucmVnZXhwLmZsYWdzLmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsLXBvbHlmaWxsL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXM2LnJlZ2V4cC5tYXRjaC5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC1wb2x5ZmlsbC9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzNi5yZWdleHAucmVwbGFjZS5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC1wb2x5ZmlsbC9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzNi5yZWdleHAuc2VhcmNoLmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsLXBvbHlmaWxsL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXM2LnJlZ2V4cC5zcGxpdC5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC1wb2x5ZmlsbC9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzNi5yZWdleHAudG8tc3RyaW5nLmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsLXBvbHlmaWxsL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXM2LnNldC5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC1wb2x5ZmlsbC9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzNi5zdHJpbmcuYW5jaG9yLmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsLXBvbHlmaWxsL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXM2LnN0cmluZy5iaWcuanMiLCJub2RlX21vZHVsZXMvYmFiZWwtcG9seWZpbGwvbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lczYuc3RyaW5nLmJsaW5rLmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsLXBvbHlmaWxsL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXM2LnN0cmluZy5ib2xkLmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsLXBvbHlmaWxsL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXM2LnN0cmluZy5jb2RlLXBvaW50LWF0LmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsLXBvbHlmaWxsL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXM2LnN0cmluZy5lbmRzLXdpdGguanMiLCJub2RlX21vZHVsZXMvYmFiZWwtcG9seWZpbGwvbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lczYuc3RyaW5nLmZpeGVkLmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsLXBvbHlmaWxsL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXM2LnN0cmluZy5mb250Y29sb3IuanMiLCJub2RlX21vZHVsZXMvYmFiZWwtcG9seWZpbGwvbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lczYuc3RyaW5nLmZvbnRzaXplLmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsLXBvbHlmaWxsL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXM2LnN0cmluZy5mcm9tLWNvZGUtcG9pbnQuanMiLCJub2RlX21vZHVsZXMvYmFiZWwtcG9seWZpbGwvbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lczYuc3RyaW5nLmluY2x1ZGVzLmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsLXBvbHlmaWxsL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXM2LnN0cmluZy5pdGFsaWNzLmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsLXBvbHlmaWxsL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXM2LnN0cmluZy5pdGVyYXRvci5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC1wb2x5ZmlsbC9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzNi5zdHJpbmcubGluay5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC1wb2x5ZmlsbC9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzNi5zdHJpbmcucmF3LmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsLXBvbHlmaWxsL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXM2LnN0cmluZy5yZXBlYXQuanMiLCJub2RlX21vZHVsZXMvYmFiZWwtcG9seWZpbGwvbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lczYuc3RyaW5nLnNtYWxsLmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsLXBvbHlmaWxsL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXM2LnN0cmluZy5zdGFydHMtd2l0aC5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC1wb2x5ZmlsbC9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzNi5zdHJpbmcuc3RyaWtlLmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsLXBvbHlmaWxsL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXM2LnN0cmluZy5zdWIuanMiLCJub2RlX21vZHVsZXMvYmFiZWwtcG9seWZpbGwvbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lczYuc3RyaW5nLnN1cC5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC1wb2x5ZmlsbC9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzNi5zdHJpbmcudHJpbS5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC1wb2x5ZmlsbC9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzNi5zeW1ib2wuanMiLCJub2RlX21vZHVsZXMvYmFiZWwtcG9seWZpbGwvbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lczYudHlwZWQuYXJyYXktYnVmZmVyLmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsLXBvbHlmaWxsL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXM2LnR5cGVkLmRhdGEtdmlldy5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC1wb2x5ZmlsbC9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzNi50eXBlZC5mbG9hdDMyLWFycmF5LmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsLXBvbHlmaWxsL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXM2LnR5cGVkLmZsb2F0NjQtYXJyYXkuanMiLCJub2RlX21vZHVsZXMvYmFiZWwtcG9seWZpbGwvbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lczYudHlwZWQuaW50MTYtYXJyYXkuanMiLCJub2RlX21vZHVsZXMvYmFiZWwtcG9seWZpbGwvbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lczYudHlwZWQuaW50MzItYXJyYXkuanMiLCJub2RlX21vZHVsZXMvYmFiZWwtcG9seWZpbGwvbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lczYudHlwZWQuaW50OC1hcnJheS5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC1wb2x5ZmlsbC9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzNi50eXBlZC51aW50MTYtYXJyYXkuanMiLCJub2RlX21vZHVsZXMvYmFiZWwtcG9seWZpbGwvbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lczYudHlwZWQudWludDMyLWFycmF5LmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsLXBvbHlmaWxsL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXM2LnR5cGVkLnVpbnQ4LWFycmF5LmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsLXBvbHlmaWxsL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXM2LnR5cGVkLnVpbnQ4LWNsYW1wZWQtYXJyYXkuanMiLCJub2RlX21vZHVsZXMvYmFiZWwtcG9seWZpbGwvbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lczYud2Vhay1tYXAuanMiLCJub2RlX21vZHVsZXMvYmFiZWwtcG9seWZpbGwvbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lczYud2Vhay1zZXQuanMiLCJub2RlX21vZHVsZXMvYmFiZWwtcG9seWZpbGwvbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lczcuYXJyYXkuaW5jbHVkZXMuanMiLCJub2RlX21vZHVsZXMvYmFiZWwtcG9seWZpbGwvbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lczcuZXJyb3IuaXMtZXJyb3IuanMiLCJub2RlX21vZHVsZXMvYmFiZWwtcG9seWZpbGwvbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lczcubWFwLnRvLWpzb24uanMiLCJub2RlX21vZHVsZXMvYmFiZWwtcG9seWZpbGwvbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lczcubWF0aC5pYWRkaC5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC1wb2x5ZmlsbC9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzNy5tYXRoLmltdWxoLmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsLXBvbHlmaWxsL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXM3Lm1hdGguaXN1YmguanMiLCJub2RlX21vZHVsZXMvYmFiZWwtcG9seWZpbGwvbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lczcubWF0aC51bXVsaC5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC1wb2x5ZmlsbC9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzNy5vYmplY3QuZGVmaW5lLWdldHRlci5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC1wb2x5ZmlsbC9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzNy5vYmplY3QuZGVmaW5lLXNldHRlci5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC1wb2x5ZmlsbC9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzNy5vYmplY3QuZW50cmllcy5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC1wb2x5ZmlsbC9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzNy5vYmplY3QuZ2V0LW93bi1wcm9wZXJ0eS1kZXNjcmlwdG9ycy5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC1wb2x5ZmlsbC9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzNy5vYmplY3QubG9va3VwLWdldHRlci5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC1wb2x5ZmlsbC9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzNy5vYmplY3QubG9va3VwLXNldHRlci5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC1wb2x5ZmlsbC9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzNy5vYmplY3QudmFsdWVzLmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsLXBvbHlmaWxsL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXM3LnJlZmxlY3QuZGVmaW5lLW1ldGFkYXRhLmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsLXBvbHlmaWxsL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXM3LnJlZmxlY3QuZGVsZXRlLW1ldGFkYXRhLmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsLXBvbHlmaWxsL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXM3LnJlZmxlY3QuZ2V0LW1ldGFkYXRhLWtleXMuanMiLCJub2RlX21vZHVsZXMvYmFiZWwtcG9seWZpbGwvbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lczcucmVmbGVjdC5nZXQtbWV0YWRhdGEuanMiLCJub2RlX21vZHVsZXMvYmFiZWwtcG9seWZpbGwvbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lczcucmVmbGVjdC5nZXQtb3duLW1ldGFkYXRhLWtleXMuanMiLCJub2RlX21vZHVsZXMvYmFiZWwtcG9seWZpbGwvbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lczcucmVmbGVjdC5nZXQtb3duLW1ldGFkYXRhLmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsLXBvbHlmaWxsL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXM3LnJlZmxlY3QuaGFzLW1ldGFkYXRhLmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsLXBvbHlmaWxsL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXM3LnJlZmxlY3QuaGFzLW93bi1tZXRhZGF0YS5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC1wb2x5ZmlsbC9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzNy5yZWZsZWN0Lm1ldGFkYXRhLmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsLXBvbHlmaWxsL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXM3LnNldC50by1qc29uLmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsLXBvbHlmaWxsL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXM3LnN0cmluZy5hdC5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC1wb2x5ZmlsbC9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzNy5zdHJpbmcubWF0Y2gtYWxsLmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsLXBvbHlmaWxsL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXM3LnN0cmluZy5wYWQtZW5kLmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsLXBvbHlmaWxsL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXM3LnN0cmluZy5wYWQtc3RhcnQuanMiLCJub2RlX21vZHVsZXMvYmFiZWwtcG9seWZpbGwvbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lczcuc3RyaW5nLnRyaW0tbGVmdC5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC1wb2x5ZmlsbC9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzNy5zdHJpbmcudHJpbS1yaWdodC5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC1wb2x5ZmlsbC9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzNy5zeXN0ZW0uZ2xvYmFsLmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsLXBvbHlmaWxsL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvd2ViLmRvbS5pdGVyYWJsZS5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC1wb2x5ZmlsbC9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL3dlYi5pbW1lZGlhdGUuanMiLCJub2RlX21vZHVsZXMvYmFiZWwtcG9seWZpbGwvbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy93ZWIudGltZXJzLmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsLXBvbHlmaWxsL25vZGVfbW9kdWxlcy9jb3JlLWpzL3NoaW0uanMiLCJub2RlX21vZHVsZXMvYmFiZWwtcmVnZW5lcmF0b3ItcnVudGltZS9ydW50aW1lLmpzIiwibm9kZV9tb2R1bGVzL3Byb2Nlc3MvYnJvd3Nlci5qcyIsInNyY1xcanNcXGNoYXJDb2Rlcy5qcyIsInNyY1xcanNcXG16NzAwZm9uLmpzIiwic3JjXFxqc1xcc2NyaXB0cy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FDL0JBO0FBQ0E7O0FDREE7QUFDQTtBQUNBO0FBQ0E7O0FDSEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNKQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNOQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ0pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDSkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN6QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDUEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3BCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzNDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMzQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDZkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3ZCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3RCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ0pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDOUlBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNSQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2xGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNwRkE7QUFDQTs7QUNEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ25CQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDUkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNKQTtBQUNBO0FBQ0E7QUFDQTs7QUNIQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNOQTtBQUNBO0FBQ0E7QUFDQTs7QUNIQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDZEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDMUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNYQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNOQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMzQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDWkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbEJBO0FBQ0E7QUFDQTtBQUNBOztBQ0hBO0FBQ0E7QUFDQTtBQUNBOztBQ0hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDUEE7O0FDQUE7QUFDQTtBQUNBOztBQ0ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDUEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDZkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNKQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1BBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDSkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ0xBO0FBQ0E7QUFDQTs7QUNGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1BBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNYQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNaQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNyRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3BCQTtBQUNBO0FBQ0E7O0FDRkE7O0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDVEE7O0FDQUE7QUFDQTtBQUNBO0FBQ0E7O0FDSEE7QUFDQTtBQUNBO0FBQ0E7O0FDSEE7QUFDQTtBQUNBO0FBQ0E7O0FDSEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNwREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2xEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN6REE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN2Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDZkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDWkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDTkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDZkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNuQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDTkE7O0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDWkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNoQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDTkE7O0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDVEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDZkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDVEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNQQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDUkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN0QkE7O0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNQQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ0pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDL0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDUEE7QUFDQTtBQUNBO0FBQ0E7O0FDSEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDeEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ05BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDSkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ0xBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDUEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDTkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNoQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNQQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNsQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2pCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDWEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzdCQTtBQUNBOztBQ0RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMxRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDTkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ0xBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNMQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDTEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNKQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDWEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaGVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbFJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDekJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDSkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNQQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1BBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNSQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDTEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ0xBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNMQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNUQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDYkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNWQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbkNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1RBO0FBQ0E7QUFDQTtBQUNBOztBQ0hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2pDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDWEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2pCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNUQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDakJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzNCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNUQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3RCQTs7QUNBQTtBQUNBO0FBQ0E7QUFDQTs7QUNIQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMzQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNiQTtBQUNBO0FBQ0E7QUFDQTs7QUNIQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1ZBO0FBQ0E7QUFDQTtBQUNBOztBQ0hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDYkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNQQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1BBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNSQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1BBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNSQTtBQUNBO0FBQ0E7QUFDQTs7QUNIQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3pCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN4QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNoQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNQQTtBQUNBO0FBQ0E7QUFDQTs7QUNIQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1BBO0FBQ0E7QUFDQTtBQUNBOztBQ0hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNkQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDWEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNQQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDcEVBO0FBQ0E7QUFDQTtBQUNBOztBQ0hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNSQTtBQUNBO0FBQ0E7QUFDQTs7QUNIQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1BBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1RBO0FBQ0E7QUFDQTtBQUNBOztBQ0hBO0FBQ0E7QUFDQTtBQUNBOztBQ0hBO0FBQ0E7QUFDQTtBQUNBOztBQ0hBO0FBQ0E7QUFDQTtBQUNBOztBQ0hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNqSEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2pCQTtBQUNBO0FBQ0E7QUFDQTs7QUNIQTtBQUNBO0FBQ0E7O0FDRkE7QUFDQTtBQUNBOztBQ0ZBO0FBQ0E7QUFDQTs7QUNGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDUkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1JBO0FBQ0E7QUFDQTtBQUNBOztBQ0hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNSQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1BBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDUEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNQQTtBQUNBO0FBQ0E7O0FDRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNSQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDUkE7QUFDQTtBQUNBOztBQ0ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1RBO0FBQ0E7QUFDQTtBQUNBOztBQ0hBO0FBQ0E7QUFDQTtBQUNBOztBQ0hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzVTQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDUkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNyQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDckJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDVkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN6QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDVEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDVEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3BCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1BBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDVkE7QUFDQTtBQUNBO0FBQ0E7O0FDSEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDZkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzlCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMxQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNKQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNUQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDWEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDVEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDckVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3hCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDWEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDTkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDTkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDTkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDTkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbkJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ05BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ05BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ05BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNYQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNOQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNOQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDakJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNMQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNOQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDakJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ05BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ05BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ05BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ05BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzFPQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzlDQTtBQUNBO0FBQ0E7QUFDQTs7QUNIQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ0pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDSkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNKQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ0pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDSkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNKQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ0pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDSkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNKQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDeERBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNYQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDWEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1JBO0FBQ0E7QUFDQTtBQUNBOztBQ0hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDVkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDZkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNWQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNmQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDWEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNSQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3RCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDakJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNqQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDUEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2xCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1BBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNSQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNmQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDUkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2RBO0FBQ0E7QUFDQTtBQUNBOztBQ0hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM3QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDVEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDVEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDTkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDTkE7QUFDQTtBQUNBO0FBQ0E7O0FDSEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDckJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNMQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ25CQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FDM0tBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FDanBCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzNGQTs7Ozs7QUFDTyxJQUFJLGdDQUNYOztBQUVFLENBQUMsSUFBRCxFQUFNLElBQU4sQ0FGRixFQUdFLENBQUMsSUFBRCxFQUFNLElBQU4sQ0FIRixFQUlFLENBQUMsSUFBRCxFQUFNLElBQU4sQ0FKRixFQUtFLENBQUMsSUFBRCxFQUFNLElBQU4sQ0FMRixFQU1FLENBQUMsSUFBRCxFQUFNLElBQU4sQ0FORixFQU9FLENBQUMsSUFBRCxFQUFNLElBQU4sQ0FQRixFQVFFLENBQUMsSUFBRCxFQUFNLElBQU4sQ0FSRixFQVNFLENBQUMsSUFBRCxFQUFNLElBQU4sQ0FURixFQVVFLENBQUMsSUFBRCxFQUFNLElBQU4sQ0FWRixFQVdFLENBQUMsSUFBRCxFQUFNLElBQU4sQ0FYRixFQVlFLENBQUMsSUFBRCxFQUFNLElB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O0FBcGpCaUMsY0E0akJqQyxDQUFhLE9BQU8sSUFBUCxDQUFiLENBNWpCaUM7QUE2akJqQyxXQTdqQmlDO0NBQUosQ0FBL0IiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiLyogZXNsaW50IG1heC1sZW46IDAgKi9cblxuXCJ1c2Ugc3RyaWN0XCI7XG5cbnJlcXVpcmUoXCJjb3JlLWpzL3NoaW1cIik7XG5cbnJlcXVpcmUoXCJiYWJlbC1yZWdlbmVyYXRvci1ydW50aW1lXCIpO1xuXG4vLyBTaG91bGQgYmUgcmVtb3ZlZCBpbiB0aGUgbmV4dCBtYWpvciByZWxlYXNlOlxuXG5yZXF1aXJlKFwiY29yZS1qcy9mbi9yZWdleHAvZXNjYXBlXCIpO1xuXG5pZiAoZ2xvYmFsLl9iYWJlbFBvbHlmaWxsKSB7XG4gIHRocm93IG5ldyBFcnJvcihcIm9ubHkgb25lIGluc3RhbmNlIG9mIGJhYmVsLXBvbHlmaWxsIGlzIGFsbG93ZWRcIik7XG59XG5nbG9iYWwuX2JhYmVsUG9seWZpbGwgPSB0cnVlO1xuXG52YXIgREVGSU5FX1BST1BFUlRZID0gXCJkZWZpbmVQcm9wZXJ0eVwiO1xuZnVuY3Rpb24gZGVmaW5lKE8sIGtleSwgdmFsdWUpIHtcbiAgT1trZXldIHx8IE9iamVjdFtERUZJTkVfUFJPUEVSVFldKE8sIGtleSwge1xuICAgIHdyaXRhYmxlOiB0cnVlLFxuICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICB2YWx1ZTogdmFsdWVcbiAgfSk7XG59XG5cbmRlZmluZShTdHJpbmcucHJvdG90eXBlLCBcInBhZExlZnRcIiwgXCJcIi5wYWRTdGFydCk7XG5kZWZpbmUoU3RyaW5nLnByb3RvdHlwZSwgXCJwYWRSaWdodFwiLCBcIlwiLnBhZEVuZCk7XG5cblwicG9wLHJldmVyc2Usc2hpZnQsa2V5cyx2YWx1ZXMsZW50cmllcyxpbmRleE9mLGV2ZXJ5LHNvbWUsZm9yRWFjaCxtYXAsZmlsdGVyLGZpbmQsZmluZEluZGV4LGluY2x1ZGVzLGpvaW4sc2xpY2UsY29uY2F0LHB1c2gsc3BsaWNlLHVuc2hpZnQsc29ydCxsYXN0SW5kZXhPZixyZWR1Y2UscmVkdWNlUmlnaHQsY29weVdpdGhpbixmaWxsXCIuc3BsaXQoXCIsXCIpLmZvckVhY2goZnVuY3Rpb24gKGtleSkge1xuICBbXVtrZXldICYmIGRlZmluZShBcnJheSwga2V5LCBGdW5jdGlvbi5jYWxsLmJpbmQoW11ba2V5XSkpO1xufSk7IiwicmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9jb3JlLnJlZ2V4cC5lc2NhcGUnKTtcbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9fY29yZScpLlJlZ0V4cC5lc2NhcGU7IiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpdCl7XG4gIGlmKHR5cGVvZiBpdCAhPSAnZnVuY3Rpb24nKXRocm93IFR5cGVFcnJvcihpdCArICcgaXMgbm90IGEgZnVuY3Rpb24hJyk7XG4gIHJldHVybiBpdDtcbn07IiwidmFyIGNvZiA9IHJlcXVpcmUoJy4vX2NvZicpO1xyXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGl0LCBtc2cpe1xyXG4gIGlmKHR5cGVvZiBpdCAhPSAnbnVtYmVyJyAmJiBjb2YoaXQpICE9ICdOdW1iZXInKXRocm93IFR5cGVFcnJvcihtc2cpO1xyXG4gIHJldHVybiAraXQ7XHJcbn07IiwiLy8gMjIuMS4zLjMxIEFycmF5LnByb3RvdHlwZVtAQHVuc2NvcGFibGVzXVxudmFyIFVOU0NPUEFCTEVTID0gcmVxdWlyZSgnLi9fd2tzJykoJ3Vuc2NvcGFibGVzJylcbiAgLCBBcnJheVByb3RvICA9IEFycmF5LnByb3RvdHlwZTtcbmlmKEFycmF5UHJvdG9bVU5TQ09QQUJMRVNdID09IHVuZGVmaW5lZClyZXF1aXJlKCcuL19oaWRlJykoQXJyYXlQcm90bywgVU5TQ09QQUJMRVMsIHt9KTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oa2V5KXtcbiAgQXJyYXlQcm90b1tVTlNDT1BBQkxFU11ba2V5XSA9IHRydWU7XG59OyIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oaXQsIENvbnN0cnVjdG9yLCBuYW1lLCBmb3JiaWRkZW5GaWVsZCl7XG4gIGlmKCEoaXQgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikgfHwgKGZvcmJpZGRlbkZpZWxkICE9PSB1bmRlZmluZWQgJiYgZm9yYmlkZGVuRmllbGQgaW4gaXQpKXtcbiAgICB0aHJvdyBUeXBlRXJyb3IobmFtZSArICc6IGluY29ycmVjdCBpbnZvY2F0aW9uIScpO1xuICB9IHJldHVybiBpdDtcbn07IiwidmFyIGlzT2JqZWN0ID0gcmVxdWlyZSgnLi9faXMtb2JqZWN0Jyk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGl0KXtcbiAgaWYoIWlzT2JqZWN0KGl0KSl0aHJvdyBUeXBlRXJyb3IoaXQgKyAnIGlzIG5vdCBhbiBvYmplY3QhJyk7XG4gIHJldHVybiBpdDtcbn07IiwiLy8gMjIuMS4zLjMgQXJyYXkucHJvdG90eXBlLmNvcHlXaXRoaW4odGFyZ2V0LCBzdGFydCwgZW5kID0gdGhpcy5sZW5ndGgpXG4ndXNlIHN0cmljdCc7XG52YXIgdG9PYmplY3QgPSByZXF1aXJlKCcuL190by1vYmplY3QnKVxuICAsIHRvSW5kZXggID0gcmVxdWlyZSgnLi9fdG8taW5kZXgnKVxuICAsIHRvTGVuZ3RoID0gcmVxdWlyZSgnLi9fdG8tbGVuZ3RoJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gW10uY29weVdpdGhpbiB8fCBmdW5jdGlvbiBjb3B5V2l0aGluKHRhcmdldC8qPSAwKi8sIHN0YXJ0Lyo9IDAsIGVuZCA9IEBsZW5ndGgqLyl7XG4gIHZhciBPICAgICA9IHRvT2JqZWN0KHRoaXMpXG4gICAgLCBsZW4gICA9IHRvTGVuZ3RoKE8ubGVuZ3RoKVxuICAgICwgdG8gICAgPSB0b0luZGV4KHRhcmdldCwgbGVuKVxuICAgICwgZnJvbSAgPSB0b0luZGV4KHN0YXJ0LCBsZW4pXG4gICAgLCBlbmQgICA9IGFyZ3VtZW50cy5sZW5ndGggPiAyID8gYXJndW1lbnRzWzJdIDogdW5kZWZpbmVkXG4gICAgLCBjb3VudCA9IE1hdGgubWluKChlbmQgPT09IHVuZGVmaW5lZCA/IGxlbiA6IHRvSW5kZXgoZW5kLCBsZW4pKSAtIGZyb20sIGxlbiAtIHRvKVxuICAgICwgaW5jICAgPSAxO1xuICBpZihmcm9tIDwgdG8gJiYgdG8gPCBmcm9tICsgY291bnQpe1xuICAgIGluYyAgPSAtMTtcbiAgICBmcm9tICs9IGNvdW50IC0gMTtcbiAgICB0byAgICs9IGNvdW50IC0gMTtcbiAgfVxuICB3aGlsZShjb3VudC0tID4gMCl7XG4gICAgaWYoZnJvbSBpbiBPKU9bdG9dID0gT1tmcm9tXTtcbiAgICBlbHNlIGRlbGV0ZSBPW3RvXTtcbiAgICB0byAgICs9IGluYztcbiAgICBmcm9tICs9IGluYztcbiAgfSByZXR1cm4gTztcbn07IiwiLy8gMjIuMS4zLjYgQXJyYXkucHJvdG90eXBlLmZpbGwodmFsdWUsIHN0YXJ0ID0gMCwgZW5kID0gdGhpcy5sZW5ndGgpXG4ndXNlIHN0cmljdCc7XG52YXIgdG9PYmplY3QgPSByZXF1aXJlKCcuL190by1vYmplY3QnKVxuICAsIHRvSW5kZXggID0gcmVxdWlyZSgnLi9fdG8taW5kZXgnKVxuICAsIHRvTGVuZ3RoID0gcmVxdWlyZSgnLi9fdG8tbGVuZ3RoJyk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGZpbGwodmFsdWUgLyosIHN0YXJ0ID0gMCwgZW5kID0gQGxlbmd0aCAqLyl7XG4gIHZhciBPICAgICAgPSB0b09iamVjdCh0aGlzKVxuICAgICwgbGVuZ3RoID0gdG9MZW5ndGgoTy5sZW5ndGgpXG4gICAgLCBhTGVuICAgPSBhcmd1bWVudHMubGVuZ3RoXG4gICAgLCBpbmRleCAgPSB0b0luZGV4KGFMZW4gPiAxID8gYXJndW1lbnRzWzFdIDogdW5kZWZpbmVkLCBsZW5ndGgpXG4gICAgLCBlbmQgICAgPSBhTGVuID4gMiA/IGFyZ3VtZW50c1syXSA6IHVuZGVmaW5lZFxuICAgICwgZW5kUG9zID0gZW5kID09PSB1bmRlZmluZWQgPyBsZW5ndGggOiB0b0luZGV4KGVuZCwgbGVuZ3RoKTtcbiAgd2hpbGUoZW5kUG9zID4gaW5kZXgpT1tpbmRleCsrXSA9IHZhbHVlO1xuICByZXR1cm4gTztcbn07IiwidmFyIGZvck9mID0gcmVxdWlyZSgnLi9fZm9yLW9mJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oaXRlciwgSVRFUkFUT1Ipe1xuICB2YXIgcmVzdWx0ID0gW107XG4gIGZvck9mKGl0ZXIsIGZhbHNlLCByZXN1bHQucHVzaCwgcmVzdWx0LCBJVEVSQVRPUik7XG4gIHJldHVybiByZXN1bHQ7XG59O1xuIiwiLy8gZmFsc2UgLT4gQXJyYXkjaW5kZXhPZlxuLy8gdHJ1ZSAgLT4gQXJyYXkjaW5jbHVkZXNcbnZhciB0b0lPYmplY3QgPSByZXF1aXJlKCcuL190by1pb2JqZWN0JylcbiAgLCB0b0xlbmd0aCAgPSByZXF1aXJlKCcuL190by1sZW5ndGgnKVxuICAsIHRvSW5kZXggICA9IHJlcXVpcmUoJy4vX3RvLWluZGV4Jyk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKElTX0lOQ0xVREVTKXtcbiAgcmV0dXJuIGZ1bmN0aW9uKCR0aGlzLCBlbCwgZnJvbUluZGV4KXtcbiAgICB2YXIgTyAgICAgID0gdG9JT2JqZWN0KCR0aGlzKVxuICAgICAgLCBsZW5ndGggPSB0b0xlbmd0aChPLmxlbmd0aClcbiAgICAgICwgaW5kZXggID0gdG9JbmRleChmcm9tSW5kZXgsIGxlbmd0aClcbiAgICAgICwgdmFsdWU7XG4gICAgLy8gQXJyYXkjaW5jbHVkZXMgdXNlcyBTYW1lVmFsdWVaZXJvIGVxdWFsaXR5IGFsZ29yaXRobVxuICAgIGlmKElTX0lOQ0xVREVTICYmIGVsICE9IGVsKXdoaWxlKGxlbmd0aCA+IGluZGV4KXtcbiAgICAgIHZhbHVlID0gT1tpbmRleCsrXTtcbiAgICAgIGlmKHZhbHVlICE9IHZhbHVlKXJldHVybiB0cnVlO1xuICAgIC8vIEFycmF5I3RvSW5kZXggaWdub3JlcyBob2xlcywgQXJyYXkjaW5jbHVkZXMgLSBub3RcbiAgICB9IGVsc2UgZm9yKDtsZW5ndGggPiBpbmRleDsgaW5kZXgrKylpZihJU19JTkNMVURFUyB8fCBpbmRleCBpbiBPKXtcbiAgICAgIGlmKE9baW5kZXhdID09PSBlbClyZXR1cm4gSVNfSU5DTFVERVMgfHwgaW5kZXg7XG4gICAgfSByZXR1cm4gIUlTX0lOQ0xVREVTICYmIC0xO1xuICB9O1xufTsiLCIvLyAwIC0+IEFycmF5I2ZvckVhY2hcbi8vIDEgLT4gQXJyYXkjbWFwXG4vLyAyIC0+IEFycmF5I2ZpbHRlclxuLy8gMyAtPiBBcnJheSNzb21lXG4vLyA0IC0+IEFycmF5I2V2ZXJ5XG4vLyA1IC0+IEFycmF5I2ZpbmRcbi8vIDYgLT4gQXJyYXkjZmluZEluZGV4XG52YXIgY3R4ICAgICAgPSByZXF1aXJlKCcuL19jdHgnKVxuICAsIElPYmplY3QgID0gcmVxdWlyZSgnLi9faW9iamVjdCcpXG4gICwgdG9PYmplY3QgPSByZXF1aXJlKCcuL190by1vYmplY3QnKVxuICAsIHRvTGVuZ3RoID0gcmVxdWlyZSgnLi9fdG8tbGVuZ3RoJylcbiAgLCBhc2MgICAgICA9IHJlcXVpcmUoJy4vX2FycmF5LXNwZWNpZXMtY3JlYXRlJyk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKFRZUEUsICRjcmVhdGUpe1xuICB2YXIgSVNfTUFQICAgICAgICA9IFRZUEUgPT0gMVxuICAgICwgSVNfRklMVEVSICAgICA9IFRZUEUgPT0gMlxuICAgICwgSVNfU09NRSAgICAgICA9IFRZUEUgPT0gM1xuICAgICwgSVNfRVZFUlkgICAgICA9IFRZUEUgPT0gNFxuICAgICwgSVNfRklORF9JTkRFWCA9IFRZUEUgPT0gNlxuICAgICwgTk9fSE9MRVMgICAgICA9IFRZUEUgPT0gNSB8fCBJU19GSU5EX0lOREVYXG4gICAgLCBjcmVhdGUgICAgICAgID0gJGNyZWF0ZSB8fCBhc2M7XG4gIHJldHVybiBmdW5jdGlvbigkdGhpcywgY2FsbGJhY2tmbiwgdGhhdCl7XG4gICAgdmFyIE8gICAgICA9IHRvT2JqZWN0KCR0aGlzKVxuICAgICAgLCBzZWxmICAgPSBJT2JqZWN0KE8pXG4gICAgICAsIGYgICAgICA9IGN0eChjYWxsYmFja2ZuLCB0aGF0LCAzKVxuICAgICAgLCBsZW5ndGggPSB0b0xlbmd0aChzZWxmLmxlbmd0aClcbiAgICAgICwgaW5kZXggID0gMFxuICAgICAgLCByZXN1bHQgPSBJU19NQVAgPyBjcmVhdGUoJHRoaXMsIGxlbmd0aCkgOiBJU19GSUxURVIgPyBjcmVhdGUoJHRoaXMsIDApIDogdW5kZWZpbmVkXG4gICAgICAsIHZhbCwgcmVzO1xuICAgIGZvcig7bGVuZ3RoID4gaW5kZXg7IGluZGV4KyspaWYoTk9fSE9MRVMgfHwgaW5kZXggaW4gc2VsZil7XG4gICAgICB2YWwgPSBzZWxmW2luZGV4XTtcbiAgICAgIHJlcyA9IGYodmFsLCBpbmRleCwgTyk7XG4gICAgICBpZihUWVBFKXtcbiAgICAgICAgaWYoSVNfTUFQKXJlc3VsdFtpbmRleF0gPSByZXM7ICAgICAgICAgICAgLy8gbWFwXG4gICAgICAgIGVsc2UgaWYocmVzKXN3aXRjaChUWVBFKXtcbiAgICAgICAgICBjYXNlIDM6IHJldHVybiB0cnVlOyAgICAgICAgICAgICAgICAgICAgLy8gc29tZVxuICAgICAgICAgIGNhc2UgNTogcmV0dXJuIHZhbDsgICAgICAgICAgICAgICAgICAgICAvLyBmaW5kXG4gICAgICAgICAgY2FzZSA2OiByZXR1cm4gaW5kZXg7ICAgICAgICAgICAgICAgICAgIC8vIGZpbmRJbmRleFxuICAgICAgICAgIGNhc2UgMjogcmVzdWx0LnB1c2godmFsKTsgICAgICAgICAgICAgICAvLyBmaWx0ZXJcbiAgICAgICAgfSBlbHNlIGlmKElTX0VWRVJZKXJldHVybiBmYWxzZTsgICAgICAgICAgLy8gZXZlcnlcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIElTX0ZJTkRfSU5ERVggPyAtMSA6IElTX1NPTUUgfHwgSVNfRVZFUlkgPyBJU19FVkVSWSA6IHJlc3VsdDtcbiAgfTtcbn07IiwidmFyIGFGdW5jdGlvbiA9IHJlcXVpcmUoJy4vX2EtZnVuY3Rpb24nKVxyXG4gICwgdG9PYmplY3QgID0gcmVxdWlyZSgnLi9fdG8tb2JqZWN0JylcclxuICAsIElPYmplY3QgICA9IHJlcXVpcmUoJy4vX2lvYmplY3QnKVxyXG4gICwgdG9MZW5ndGggID0gcmVxdWlyZSgnLi9fdG8tbGVuZ3RoJyk7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKHRoYXQsIGNhbGxiYWNrZm4sIGFMZW4sIG1lbW8sIGlzUmlnaHQpe1xyXG4gIGFGdW5jdGlvbihjYWxsYmFja2ZuKTtcclxuICB2YXIgTyAgICAgID0gdG9PYmplY3QodGhhdClcclxuICAgICwgc2VsZiAgID0gSU9iamVjdChPKVxyXG4gICAgLCBsZW5ndGggPSB0b0xlbmd0aChPLmxlbmd0aClcclxuICAgICwgaW5kZXggID0gaXNSaWdodCA/IGxlbmd0aCAtIDEgOiAwXHJcbiAgICAsIGkgICAgICA9IGlzUmlnaHQgPyAtMSA6IDE7XHJcbiAgaWYoYUxlbiA8IDIpZm9yKDs7KXtcclxuICAgIGlmKGluZGV4IGluIHNlbGYpe1xyXG4gICAgICBtZW1vID0gc2VsZltpbmRleF07XHJcbiAgICAgIGluZGV4ICs9IGk7XHJcbiAgICAgIGJyZWFrO1xyXG4gICAgfVxyXG4gICAgaW5kZXggKz0gaTtcclxuICAgIGlmKGlzUmlnaHQgPyBpbmRleCA8IDAgOiBsZW5ndGggPD0gaW5kZXgpe1xyXG4gICAgICB0aHJvdyBUeXBlRXJyb3IoJ1JlZHVjZSBvZiBlbXB0eSBhcnJheSB3aXRoIG5vIGluaXRpYWwgdmFsdWUnKTtcclxuICAgIH1cclxuICB9XHJcbiAgZm9yKDtpc1JpZ2h0ID8gaW5kZXggPj0gMCA6IGxlbmd0aCA+IGluZGV4OyBpbmRleCArPSBpKWlmKGluZGV4IGluIHNlbGYpe1xyXG4gICAgbWVtbyA9IGNhbGxiYWNrZm4obWVtbywgc2VsZltpbmRleF0sIGluZGV4LCBPKTtcclxuICB9XHJcbiAgcmV0dXJuIG1lbW87XHJcbn07IiwiLy8gOS40LjIuMyBBcnJheVNwZWNpZXNDcmVhdGUob3JpZ2luYWxBcnJheSwgbGVuZ3RoKVxudmFyIGlzT2JqZWN0ID0gcmVxdWlyZSgnLi9faXMtb2JqZWN0JylcbiAgLCBpc0FycmF5ICA9IHJlcXVpcmUoJy4vX2lzLWFycmF5JylcbiAgLCBTUEVDSUVTICA9IHJlcXVpcmUoJy4vX3drcycpKCdzcGVjaWVzJyk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKG9yaWdpbmFsLCBsZW5ndGgpe1xuICB2YXIgQztcbiAgaWYoaXNBcnJheShvcmlnaW5hbCkpe1xuICAgIEMgPSBvcmlnaW5hbC5jb25zdHJ1Y3RvcjtcbiAgICAvLyBjcm9zcy1yZWFsbSBmYWxsYmFja1xuICAgIGlmKHR5cGVvZiBDID09ICdmdW5jdGlvbicgJiYgKEMgPT09IEFycmF5IHx8IGlzQXJyYXkoQy5wcm90b3R5cGUpKSlDID0gdW5kZWZpbmVkO1xuICAgIGlmKGlzT2JqZWN0KEMpKXtcbiAgICAgIEMgPSBDW1NQRUNJRVNdO1xuICAgICAgaWYoQyA9PT0gbnVsbClDID0gdW5kZWZpbmVkO1xuICAgIH1cbiAgfSByZXR1cm4gbmV3IChDID09PSB1bmRlZmluZWQgPyBBcnJheSA6IEMpKGxlbmd0aCk7XG59OyIsIid1c2Ugc3RyaWN0JztcbnZhciBhRnVuY3Rpb24gID0gcmVxdWlyZSgnLi9fYS1mdW5jdGlvbicpXG4gICwgaXNPYmplY3QgICA9IHJlcXVpcmUoJy4vX2lzLW9iamVjdCcpXG4gICwgaW52b2tlICAgICA9IHJlcXVpcmUoJy4vX2ludm9rZScpXG4gICwgYXJyYXlTbGljZSA9IFtdLnNsaWNlXG4gICwgZmFjdG9yaWVzICA9IHt9O1xuXG52YXIgY29uc3RydWN0ID0gZnVuY3Rpb24oRiwgbGVuLCBhcmdzKXtcbiAgaWYoIShsZW4gaW4gZmFjdG9yaWVzKSl7XG4gICAgZm9yKHZhciBuID0gW10sIGkgPSAwOyBpIDwgbGVuOyBpKyspbltpXSA9ICdhWycgKyBpICsgJ10nO1xuICAgIGZhY3Rvcmllc1tsZW5dID0gRnVuY3Rpb24oJ0YsYScsICdyZXR1cm4gbmV3IEYoJyArIG4uam9pbignLCcpICsgJyknKTtcbiAgfSByZXR1cm4gZmFjdG9yaWVzW2xlbl0oRiwgYXJncyk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IEZ1bmN0aW9uLmJpbmQgfHwgZnVuY3Rpb24gYmluZCh0aGF0IC8qLCBhcmdzLi4uICovKXtcbiAgdmFyIGZuICAgICAgID0gYUZ1bmN0aW9uKHRoaXMpXG4gICAgLCBwYXJ0QXJncyA9IGFycmF5U2xpY2UuY2FsbChhcmd1bWVudHMsIDEpO1xuICB2YXIgYm91bmQgPSBmdW5jdGlvbigvKiBhcmdzLi4uICovKXtcbiAgICB2YXIgYXJncyA9IHBhcnRBcmdzLmNvbmNhdChhcnJheVNsaWNlLmNhbGwoYXJndW1lbnRzKSk7XG4gICAgcmV0dXJuIHRoaXMgaW5zdGFuY2VvZiBib3VuZCA/IGNvbnN0cnVjdChmbiwgYXJncy5sZW5ndGgsIGFyZ3MpIDogaW52b2tlKGZuLCBhcmdzLCB0aGF0KTtcbiAgfTtcbiAgaWYoaXNPYmplY3QoZm4ucHJvdG90eXBlKSlib3VuZC5wcm90b3R5cGUgPSBmbi5wcm90b3R5cGU7XG4gIHJldHVybiBib3VuZDtcbn07IiwiLy8gZ2V0dGluZyB0YWcgZnJvbSAxOS4xLjMuNiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nKClcbnZhciBjb2YgPSByZXF1aXJlKCcuL19jb2YnKVxuICAsIFRBRyA9IHJlcXVpcmUoJy4vX3drcycpKCd0b1N0cmluZ1RhZycpXG4gIC8vIEVTMyB3cm9uZyBoZXJlXG4gICwgQVJHID0gY29mKGZ1bmN0aW9uKCl7IHJldHVybiBhcmd1bWVudHM7IH0oKSkgPT0gJ0FyZ3VtZW50cyc7XG5cbi8vIGZhbGxiYWNrIGZvciBJRTExIFNjcmlwdCBBY2Nlc3MgRGVuaWVkIGVycm9yXG52YXIgdHJ5R2V0ID0gZnVuY3Rpb24oaXQsIGtleSl7XG4gIHRyeSB7XG4gICAgcmV0dXJuIGl0W2tleV07XG4gIH0gY2F0Y2goZSl7IC8qIGVtcHR5ICovIH1cbn07XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oaXQpe1xuICB2YXIgTywgVCwgQjtcbiAgcmV0dXJuIGl0ID09PSB1bmRlZmluZWQgPyAnVW5kZWZpbmVkJyA6IGl0ID09PSBudWxsID8gJ051bGwnXG4gICAgLy8gQEB0b1N0cmluZ1RhZyBjYXNlXG4gICAgOiB0eXBlb2YgKFQgPSB0cnlHZXQoTyA9IE9iamVjdChpdCksIFRBRykpID09ICdzdHJpbmcnID8gVFxuICAgIC8vIGJ1aWx0aW5UYWcgY2FzZVxuICAgIDogQVJHID8gY29mKE8pXG4gICAgLy8gRVMzIGFyZ3VtZW50cyBmYWxsYmFja1xuICAgIDogKEIgPSBjb2YoTykpID09ICdPYmplY3QnICYmIHR5cGVvZiBPLmNhbGxlZSA9PSAnZnVuY3Rpb24nID8gJ0FyZ3VtZW50cycgOiBCO1xufTsiLCJ2YXIgdG9TdHJpbmcgPSB7fS50b1N0cmluZztcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpdCl7XG4gIHJldHVybiB0b1N0cmluZy5jYWxsKGl0KS5zbGljZSg4LCAtMSk7XG59OyIsIid1c2Ugc3RyaWN0JztcbnZhciBkUCAgICAgICAgICA9IHJlcXVpcmUoJy4vX29iamVjdC1kcCcpLmZcbiAgLCBjcmVhdGUgICAgICA9IHJlcXVpcmUoJy4vX29iamVjdC1jcmVhdGUnKVxuICAsIGhpZGUgICAgICAgID0gcmVxdWlyZSgnLi9faGlkZScpXG4gICwgcmVkZWZpbmVBbGwgPSByZXF1aXJlKCcuL19yZWRlZmluZS1hbGwnKVxuICAsIGN0eCAgICAgICAgID0gcmVxdWlyZSgnLi9fY3R4JylcbiAgLCBhbkluc3RhbmNlICA9IHJlcXVpcmUoJy4vX2FuLWluc3RhbmNlJylcbiAgLCBkZWZpbmVkICAgICA9IHJlcXVpcmUoJy4vX2RlZmluZWQnKVxuICAsIGZvck9mICAgICAgID0gcmVxdWlyZSgnLi9fZm9yLW9mJylcbiAgLCAkaXRlckRlZmluZSA9IHJlcXVpcmUoJy4vX2l0ZXItZGVmaW5lJylcbiAgLCBzdGVwICAgICAgICA9IHJlcXVpcmUoJy4vX2l0ZXItc3RlcCcpXG4gICwgc2V0U3BlY2llcyAgPSByZXF1aXJlKCcuL19zZXQtc3BlY2llcycpXG4gICwgREVTQ1JJUFRPUlMgPSByZXF1aXJlKCcuL19kZXNjcmlwdG9ycycpXG4gICwgZmFzdEtleSAgICAgPSByZXF1aXJlKCcuL19tZXRhJykuZmFzdEtleVxuICAsIFNJWkUgICAgICAgID0gREVTQ1JJUFRPUlMgPyAnX3MnIDogJ3NpemUnO1xuXG52YXIgZ2V0RW50cnkgPSBmdW5jdGlvbih0aGF0LCBrZXkpe1xuICAvLyBmYXN0IGNhc2VcbiAgdmFyIGluZGV4ID0gZmFzdEtleShrZXkpLCBlbnRyeTtcbiAgaWYoaW5kZXggIT09ICdGJylyZXR1cm4gdGhhdC5faVtpbmRleF07XG4gIC8vIGZyb3plbiBvYmplY3QgY2FzZVxuICBmb3IoZW50cnkgPSB0aGF0Ll9mOyBlbnRyeTsgZW50cnkgPSBlbnRyeS5uKXtcbiAgICBpZihlbnRyeS5rID09IGtleSlyZXR1cm4gZW50cnk7XG4gIH1cbn07XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBnZXRDb25zdHJ1Y3RvcjogZnVuY3Rpb24od3JhcHBlciwgTkFNRSwgSVNfTUFQLCBBRERFUil7XG4gICAgdmFyIEMgPSB3cmFwcGVyKGZ1bmN0aW9uKHRoYXQsIGl0ZXJhYmxlKXtcbiAgICAgIGFuSW5zdGFuY2UodGhhdCwgQywgTkFNRSwgJ19pJyk7XG4gICAgICB0aGF0Ll9pID0gY3JlYXRlKG51bGwpOyAvLyBpbmRleFxuICAgICAgdGhhdC5fZiA9IHVuZGVmaW5lZDsgICAgLy8gZmlyc3QgZW50cnlcbiAgICAgIHRoYXQuX2wgPSB1bmRlZmluZWQ7ICAgIC8vIGxhc3QgZW50cnlcbiAgICAgIHRoYXRbU0laRV0gPSAwOyAgICAgICAgIC8vIHNpemVcbiAgICAgIGlmKGl0ZXJhYmxlICE9IHVuZGVmaW5lZClmb3JPZihpdGVyYWJsZSwgSVNfTUFQLCB0aGF0W0FEREVSXSwgdGhhdCk7XG4gICAgfSk7XG4gICAgcmVkZWZpbmVBbGwoQy5wcm90b3R5cGUsIHtcbiAgICAgIC8vIDIzLjEuMy4xIE1hcC5wcm90b3R5cGUuY2xlYXIoKVxuICAgICAgLy8gMjMuMi4zLjIgU2V0LnByb3RvdHlwZS5jbGVhcigpXG4gICAgICBjbGVhcjogZnVuY3Rpb24gY2xlYXIoKXtcbiAgICAgICAgZm9yKHZhciB0aGF0ID0gdGhpcywgZGF0YSA9IHRoYXQuX2ksIGVudHJ5ID0gdGhhdC5fZjsgZW50cnk7IGVudHJ5ID0gZW50cnkubil7XG4gICAgICAgICAgZW50cnkuciA9IHRydWU7XG4gICAgICAgICAgaWYoZW50cnkucCllbnRyeS5wID0gZW50cnkucC5uID0gdW5kZWZpbmVkO1xuICAgICAgICAgIGRlbGV0ZSBkYXRhW2VudHJ5LmldO1xuICAgICAgICB9XG4gICAgICAgIHRoYXQuX2YgPSB0aGF0Ll9sID0gdW5kZWZpbmVkO1xuICAgICAgICB0aGF0W1NJWkVdID0gMDtcbiAgICAgIH0sXG4gICAgICAvLyAyMy4xLjMuMyBNYXAucHJvdG90eXBlLmRlbGV0ZShrZXkpXG4gICAgICAvLyAyMy4yLjMuNCBTZXQucHJvdG90eXBlLmRlbGV0ZSh2YWx1ZSlcbiAgICAgICdkZWxldGUnOiBmdW5jdGlvbihrZXkpe1xuICAgICAgICB2YXIgdGhhdCAgPSB0aGlzXG4gICAgICAgICAgLCBlbnRyeSA9IGdldEVudHJ5KHRoYXQsIGtleSk7XG4gICAgICAgIGlmKGVudHJ5KXtcbiAgICAgICAgICB2YXIgbmV4dCA9IGVudHJ5Lm5cbiAgICAgICAgICAgICwgcHJldiA9IGVudHJ5LnA7XG4gICAgICAgICAgZGVsZXRlIHRoYXQuX2lbZW50cnkuaV07XG4gICAgICAgICAgZW50cnkuciA9IHRydWU7XG4gICAgICAgICAgaWYocHJldilwcmV2Lm4gPSBuZXh0O1xuICAgICAgICAgIGlmKG5leHQpbmV4dC5wID0gcHJldjtcbiAgICAgICAgICBpZih0aGF0Ll9mID09IGVudHJ5KXRoYXQuX2YgPSBuZXh0O1xuICAgICAgICAgIGlmKHRoYXQuX2wgPT0gZW50cnkpdGhhdC5fbCA9IHByZXY7XG4gICAgICAgICAgdGhhdFtTSVpFXS0tO1xuICAgICAgICB9IHJldHVybiAhIWVudHJ5O1xuICAgICAgfSxcbiAgICAgIC8vIDIzLjIuMy42IFNldC5wcm90b3R5cGUuZm9yRWFjaChjYWxsYmFja2ZuLCB0aGlzQXJnID0gdW5kZWZpbmVkKVxuICAgICAgLy8gMjMuMS4zLjUgTWFwLnByb3RvdHlwZS5mb3JFYWNoKGNhbGxiYWNrZm4sIHRoaXNBcmcgPSB1bmRlZmluZWQpXG4gICAgICBmb3JFYWNoOiBmdW5jdGlvbiBmb3JFYWNoKGNhbGxiYWNrZm4gLyosIHRoYXQgPSB1bmRlZmluZWQgKi8pe1xuICAgICAgICBhbkluc3RhbmNlKHRoaXMsIEMsICdmb3JFYWNoJyk7XG4gICAgICAgIHZhciBmID0gY3R4KGNhbGxiYWNrZm4sIGFyZ3VtZW50cy5sZW5ndGggPiAxID8gYXJndW1lbnRzWzFdIDogdW5kZWZpbmVkLCAzKVxuICAgICAgICAgICwgZW50cnk7XG4gICAgICAgIHdoaWxlKGVudHJ5ID0gZW50cnkgPyBlbnRyeS5uIDogdGhpcy5fZil7XG4gICAgICAgICAgZihlbnRyeS52LCBlbnRyeS5rLCB0aGlzKTtcbiAgICAgICAgICAvLyByZXZlcnQgdG8gdGhlIGxhc3QgZXhpc3RpbmcgZW50cnlcbiAgICAgICAgICB3aGlsZShlbnRyeSAmJiBlbnRyeS5yKWVudHJ5ID0gZW50cnkucDtcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIC8vIDIzLjEuMy43IE1hcC5wcm90b3R5cGUuaGFzKGtleSlcbiAgICAgIC8vIDIzLjIuMy43IFNldC5wcm90b3R5cGUuaGFzKHZhbHVlKVxuICAgICAgaGFzOiBmdW5jdGlvbiBoYXMoa2V5KXtcbiAgICAgICAgcmV0dXJuICEhZ2V0RW50cnkodGhpcywga2V5KTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICBpZihERVNDUklQVE9SUylkUChDLnByb3RvdHlwZSwgJ3NpemUnLCB7XG4gICAgICBnZXQ6IGZ1bmN0aW9uKCl7XG4gICAgICAgIHJldHVybiBkZWZpbmVkKHRoaXNbU0laRV0pO1xuICAgICAgfVxuICAgIH0pO1xuICAgIHJldHVybiBDO1xuICB9LFxuICBkZWY6IGZ1bmN0aW9uKHRoYXQsIGtleSwgdmFsdWUpe1xuICAgIHZhciBlbnRyeSA9IGdldEVudHJ5KHRoYXQsIGtleSlcbiAgICAgICwgcHJldiwgaW5kZXg7XG4gICAgLy8gY2hhbmdlIGV4aXN0aW5nIGVudHJ5XG4gICAgaWYoZW50cnkpe1xuICAgICAgZW50cnkudiA9IHZhbHVlO1xuICAgIC8vIGNyZWF0ZSBuZXcgZW50cnlcbiAgICB9IGVsc2Uge1xuICAgICAgdGhhdC5fbCA9IGVudHJ5ID0ge1xuICAgICAgICBpOiBpbmRleCA9IGZhc3RLZXkoa2V5LCB0cnVlKSwgLy8gPC0gaW5kZXhcbiAgICAgICAgazoga2V5LCAgICAgICAgICAgICAgICAgICAgICAgIC8vIDwtIGtleVxuICAgICAgICB2OiB2YWx1ZSwgICAgICAgICAgICAgICAgICAgICAgLy8gPC0gdmFsdWVcbiAgICAgICAgcDogcHJldiA9IHRoYXQuX2wsICAgICAgICAgICAgIC8vIDwtIHByZXZpb3VzIGVudHJ5XG4gICAgICAgIG46IHVuZGVmaW5lZCwgICAgICAgICAgICAgICAgICAvLyA8LSBuZXh0IGVudHJ5XG4gICAgICAgIHI6IGZhbHNlICAgICAgICAgICAgICAgICAgICAgICAvLyA8LSByZW1vdmVkXG4gICAgICB9O1xuICAgICAgaWYoIXRoYXQuX2YpdGhhdC5fZiA9IGVudHJ5O1xuICAgICAgaWYocHJldilwcmV2Lm4gPSBlbnRyeTtcbiAgICAgIHRoYXRbU0laRV0rKztcbiAgICAgIC8vIGFkZCB0byBpbmRleFxuICAgICAgaWYoaW5kZXggIT09ICdGJyl0aGF0Ll9pW2luZGV4XSA9IGVudHJ5O1xuICAgIH0gcmV0dXJuIHRoYXQ7XG4gIH0sXG4gIGdldEVudHJ5OiBnZXRFbnRyeSxcbiAgc2V0U3Ryb25nOiBmdW5jdGlvbihDLCBOQU1FLCBJU19NQVApe1xuICAgIC8vIGFkZCAua2V5cywgLnZhbHVlcywgLmVudHJpZXMsIFtAQGl0ZXJhdG9yXVxuICAgIC8vIDIzLjEuMy40LCAyMy4xLjMuOCwgMjMuMS4zLjExLCAyMy4xLjMuMTIsIDIzLjIuMy41LCAyMy4yLjMuOCwgMjMuMi4zLjEwLCAyMy4yLjMuMTFcbiAgICAkaXRlckRlZmluZShDLCBOQU1FLCBmdW5jdGlvbihpdGVyYXRlZCwga2luZCl7XG4gICAgICB0aGlzLl90ID0gaXRlcmF0ZWQ7ICAvLyB0YXJnZXRcbiAgICAgIHRoaXMuX2sgPSBraW5kOyAgICAgIC8vIGtpbmRcbiAgICAgIHRoaXMuX2wgPSB1bmRlZmluZWQ7IC8vIHByZXZpb3VzXG4gICAgfSwgZnVuY3Rpb24oKXtcbiAgICAgIHZhciB0aGF0ICA9IHRoaXNcbiAgICAgICAgLCBraW5kICA9IHRoYXQuX2tcbiAgICAgICAgLCBlbnRyeSA9IHRoYXQuX2w7XG4gICAgICAvLyByZXZlcnQgdG8gdGhlIGxhc3QgZXhpc3RpbmcgZW50cnlcbiAgICAgIHdoaWxlKGVudHJ5ICYmIGVudHJ5LnIpZW50cnkgPSBlbnRyeS5wO1xuICAgICAgLy8gZ2V0IG5leHQgZW50cnlcbiAgICAgIGlmKCF0aGF0Ll90IHx8ICEodGhhdC5fbCA9IGVudHJ5ID0gZW50cnkgPyBlbnRyeS5uIDogdGhhdC5fdC5fZikpe1xuICAgICAgICAvLyBvciBmaW5pc2ggdGhlIGl0ZXJhdGlvblxuICAgICAgICB0aGF0Ll90ID0gdW5kZWZpbmVkO1xuICAgICAgICByZXR1cm4gc3RlcCgxKTtcbiAgICAgIH1cbiAgICAgIC8vIHJldHVybiBzdGVwIGJ5IGtpbmRcbiAgICAgIGlmKGtpbmQgPT0gJ2tleXMnICApcmV0dXJuIHN0ZXAoMCwgZW50cnkuayk7XG4gICAgICBpZihraW5kID09ICd2YWx1ZXMnKXJldHVybiBzdGVwKDAsIGVudHJ5LnYpO1xuICAgICAgcmV0dXJuIHN0ZXAoMCwgW2VudHJ5LmssIGVudHJ5LnZdKTtcbiAgICB9LCBJU19NQVAgPyAnZW50cmllcycgOiAndmFsdWVzJyAsICFJU19NQVAsIHRydWUpO1xuXG4gICAgLy8gYWRkIFtAQHNwZWNpZXNdLCAyMy4xLjIuMiwgMjMuMi4yLjJcbiAgICBzZXRTcGVjaWVzKE5BTUUpO1xuICB9XG59OyIsIi8vIGh0dHBzOi8vZ2l0aHViLmNvbS9EYXZpZEJydWFudC9NYXAtU2V0LnByb3RvdHlwZS50b0pTT05cbnZhciBjbGFzc29mID0gcmVxdWlyZSgnLi9fY2xhc3NvZicpXG4gICwgZnJvbSAgICA9IHJlcXVpcmUoJy4vX2FycmF5LWZyb20taXRlcmFibGUnKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oTkFNRSl7XG4gIHJldHVybiBmdW5jdGlvbiB0b0pTT04oKXtcbiAgICBpZihjbGFzc29mKHRoaXMpICE9IE5BTUUpdGhyb3cgVHlwZUVycm9yKE5BTUUgKyBcIiN0b0pTT04gaXNuJ3QgZ2VuZXJpY1wiKTtcbiAgICByZXR1cm4gZnJvbSh0aGlzKTtcbiAgfTtcbn07IiwiJ3VzZSBzdHJpY3QnO1xudmFyIHJlZGVmaW5lQWxsICAgICAgID0gcmVxdWlyZSgnLi9fcmVkZWZpbmUtYWxsJylcbiAgLCBnZXRXZWFrICAgICAgICAgICA9IHJlcXVpcmUoJy4vX21ldGEnKS5nZXRXZWFrXG4gICwgYW5PYmplY3QgICAgICAgICAgPSByZXF1aXJlKCcuL19hbi1vYmplY3QnKVxuICAsIGlzT2JqZWN0ICAgICAgICAgID0gcmVxdWlyZSgnLi9faXMtb2JqZWN0JylcbiAgLCBhbkluc3RhbmNlICAgICAgICA9IHJlcXVpcmUoJy4vX2FuLWluc3RhbmNlJylcbiAgLCBmb3JPZiAgICAgICAgICAgICA9IHJlcXVpcmUoJy4vX2Zvci1vZicpXG4gICwgY3JlYXRlQXJyYXlNZXRob2QgPSByZXF1aXJlKCcuL19hcnJheS1tZXRob2RzJylcbiAgLCAkaGFzICAgICAgICAgICAgICA9IHJlcXVpcmUoJy4vX2hhcycpXG4gICwgYXJyYXlGaW5kICAgICAgICAgPSBjcmVhdGVBcnJheU1ldGhvZCg1KVxuICAsIGFycmF5RmluZEluZGV4ICAgID0gY3JlYXRlQXJyYXlNZXRob2QoNilcbiAgLCBpZCAgICAgICAgICAgICAgICA9IDA7XG5cbi8vIGZhbGxiYWNrIGZvciB1bmNhdWdodCBmcm96ZW4ga2V5c1xudmFyIHVuY2F1Z2h0RnJvemVuU3RvcmUgPSBmdW5jdGlvbih0aGF0KXtcbiAgcmV0dXJuIHRoYXQuX2wgfHwgKHRoYXQuX2wgPSBuZXcgVW5jYXVnaHRGcm96ZW5TdG9yZSk7XG59O1xudmFyIFVuY2F1Z2h0RnJvemVuU3RvcmUgPSBmdW5jdGlvbigpe1xuICB0aGlzLmEgPSBbXTtcbn07XG52YXIgZmluZFVuY2F1Z2h0RnJvemVuID0gZnVuY3Rpb24oc3RvcmUsIGtleSl7XG4gIHJldHVybiBhcnJheUZpbmQoc3RvcmUuYSwgZnVuY3Rpb24oaXQpe1xuICAgIHJldHVybiBpdFswXSA9PT0ga2V5O1xuICB9KTtcbn07XG5VbmNhdWdodEZyb3plblN0b3JlLnByb3RvdHlwZSA9IHtcbiAgZ2V0OiBmdW5jdGlvbihrZXkpe1xuICAgIHZhciBlbnRyeSA9IGZpbmRVbmNhdWdodEZyb3plbih0aGlzLCBrZXkpO1xuICAgIGlmKGVudHJ5KXJldHVybiBlbnRyeVsxXTtcbiAgfSxcbiAgaGFzOiBmdW5jdGlvbihrZXkpe1xuICAgIHJldHVybiAhIWZpbmRVbmNhdWdodEZyb3plbih0aGlzLCBrZXkpO1xuICB9LFxuICBzZXQ6IGZ1bmN0aW9uKGtleSwgdmFsdWUpe1xuICAgIHZhciBlbnRyeSA9IGZpbmRVbmNhdWdodEZyb3plbih0aGlzLCBrZXkpO1xuICAgIGlmKGVudHJ5KWVudHJ5WzFdID0gdmFsdWU7XG4gICAgZWxzZSB0aGlzLmEucHVzaChba2V5LCB2YWx1ZV0pO1xuICB9LFxuICAnZGVsZXRlJzogZnVuY3Rpb24oa2V5KXtcbiAgICB2YXIgaW5kZXggPSBhcnJheUZpbmRJbmRleCh0aGlzLmEsIGZ1bmN0aW9uKGl0KXtcbiAgICAgIHJldHVybiBpdFswXSA9PT0ga2V5O1xuICAgIH0pO1xuICAgIGlmKH5pbmRleCl0aGlzLmEuc3BsaWNlKGluZGV4LCAxKTtcbiAgICByZXR1cm4gISF+aW5kZXg7XG4gIH1cbn07XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBnZXRDb25zdHJ1Y3RvcjogZnVuY3Rpb24od3JhcHBlciwgTkFNRSwgSVNfTUFQLCBBRERFUil7XG4gICAgdmFyIEMgPSB3cmFwcGVyKGZ1bmN0aW9uKHRoYXQsIGl0ZXJhYmxlKXtcbiAgICAgIGFuSW5zdGFuY2UodGhhdCwgQywgTkFNRSwgJ19pJyk7XG4gICAgICB0aGF0Ll9pID0gaWQrKzsgICAgICAvLyBjb2xsZWN0aW9uIGlkXG4gICAgICB0aGF0Ll9sID0gdW5kZWZpbmVkOyAvLyBsZWFrIHN0b3JlIGZvciB1bmNhdWdodCBmcm96ZW4gb2JqZWN0c1xuICAgICAgaWYoaXRlcmFibGUgIT0gdW5kZWZpbmVkKWZvck9mKGl0ZXJhYmxlLCBJU19NQVAsIHRoYXRbQURERVJdLCB0aGF0KTtcbiAgICB9KTtcbiAgICByZWRlZmluZUFsbChDLnByb3RvdHlwZSwge1xuICAgICAgLy8gMjMuMy4zLjIgV2Vha01hcC5wcm90b3R5cGUuZGVsZXRlKGtleSlcbiAgICAgIC8vIDIzLjQuMy4zIFdlYWtTZXQucHJvdG90eXBlLmRlbGV0ZSh2YWx1ZSlcbiAgICAgICdkZWxldGUnOiBmdW5jdGlvbihrZXkpe1xuICAgICAgICBpZighaXNPYmplY3Qoa2V5KSlyZXR1cm4gZmFsc2U7XG4gICAgICAgIHZhciBkYXRhID0gZ2V0V2VhayhrZXkpO1xuICAgICAgICBpZihkYXRhID09PSB0cnVlKXJldHVybiB1bmNhdWdodEZyb3plblN0b3JlKHRoaXMpWydkZWxldGUnXShrZXkpO1xuICAgICAgICByZXR1cm4gZGF0YSAmJiAkaGFzKGRhdGEsIHRoaXMuX2kpICYmIGRlbGV0ZSBkYXRhW3RoaXMuX2ldO1xuICAgICAgfSxcbiAgICAgIC8vIDIzLjMuMy40IFdlYWtNYXAucHJvdG90eXBlLmhhcyhrZXkpXG4gICAgICAvLyAyMy40LjMuNCBXZWFrU2V0LnByb3RvdHlwZS5oYXModmFsdWUpXG4gICAgICBoYXM6IGZ1bmN0aW9uIGhhcyhrZXkpe1xuICAgICAgICBpZighaXNPYmplY3Qoa2V5KSlyZXR1cm4gZmFsc2U7XG4gICAgICAgIHZhciBkYXRhID0gZ2V0V2VhayhrZXkpO1xuICAgICAgICBpZihkYXRhID09PSB0cnVlKXJldHVybiB1bmNhdWdodEZyb3plblN0b3JlKHRoaXMpLmhhcyhrZXkpO1xuICAgICAgICByZXR1cm4gZGF0YSAmJiAkaGFzKGRhdGEsIHRoaXMuX2kpO1xuICAgICAgfVxuICAgIH0pO1xuICAgIHJldHVybiBDO1xuICB9LFxuICBkZWY6IGZ1bmN0aW9uKHRoYXQsIGtleSwgdmFsdWUpe1xuICAgIHZhciBkYXRhID0gZ2V0V2Vhayhhbk9iamVjdChrZXkpLCB0cnVlKTtcbiAgICBpZihkYXRhID09PSB0cnVlKXVuY2F1Z2h0RnJvemVuU3RvcmUodGhhdCkuc2V0KGtleSwgdmFsdWUpO1xuICAgIGVsc2UgZGF0YVt0aGF0Ll9pXSA9IHZhbHVlO1xuICAgIHJldHVybiB0aGF0O1xuICB9LFxuICB1ZnN0b3JlOiB1bmNhdWdodEZyb3plblN0b3JlXG59OyIsIid1c2Ugc3RyaWN0JztcbnZhciBnbG9iYWwgICAgICAgICAgICA9IHJlcXVpcmUoJy4vX2dsb2JhbCcpXG4gICwgJGV4cG9ydCAgICAgICAgICAgPSByZXF1aXJlKCcuL19leHBvcnQnKVxuICAsIHJlZGVmaW5lICAgICAgICAgID0gcmVxdWlyZSgnLi9fcmVkZWZpbmUnKVxuICAsIHJlZGVmaW5lQWxsICAgICAgID0gcmVxdWlyZSgnLi9fcmVkZWZpbmUtYWxsJylcbiAgLCBtZXRhICAgICAgICAgICAgICA9IHJlcXVpcmUoJy4vX21ldGEnKVxuICAsIGZvck9mICAgICAgICAgICAgID0gcmVxdWlyZSgnLi9fZm9yLW9mJylcbiAgLCBhbkluc3RhbmNlICAgICAgICA9IHJlcXVpcmUoJy4vX2FuLWluc3RhbmNlJylcbiAgLCBpc09iamVjdCAgICAgICAgICA9IHJlcXVpcmUoJy4vX2lzLW9iamVjdCcpXG4gICwgZmFpbHMgICAgICAgICAgICAgPSByZXF1aXJlKCcuL19mYWlscycpXG4gICwgJGl0ZXJEZXRlY3QgICAgICAgPSByZXF1aXJlKCcuL19pdGVyLWRldGVjdCcpXG4gICwgc2V0VG9TdHJpbmdUYWcgICAgPSByZXF1aXJlKCcuL19zZXQtdG8tc3RyaW5nLXRhZycpXG4gICwgaW5oZXJpdElmUmVxdWlyZWQgPSByZXF1aXJlKCcuL19pbmhlcml0LWlmLXJlcXVpcmVkJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oTkFNRSwgd3JhcHBlciwgbWV0aG9kcywgY29tbW9uLCBJU19NQVAsIElTX1dFQUspe1xuICB2YXIgQmFzZSAgPSBnbG9iYWxbTkFNRV1cbiAgICAsIEMgICAgID0gQmFzZVxuICAgICwgQURERVIgPSBJU19NQVAgPyAnc2V0JyA6ICdhZGQnXG4gICAgLCBwcm90byA9IEMgJiYgQy5wcm90b3R5cGVcbiAgICAsIE8gICAgID0ge307XG4gIHZhciBmaXhNZXRob2QgPSBmdW5jdGlvbihLRVkpe1xuICAgIHZhciBmbiA9IHByb3RvW0tFWV07XG4gICAgcmVkZWZpbmUocHJvdG8sIEtFWSxcbiAgICAgIEtFWSA9PSAnZGVsZXRlJyA/IGZ1bmN0aW9uKGEpe1xuICAgICAgICByZXR1cm4gSVNfV0VBSyAmJiAhaXNPYmplY3QoYSkgPyBmYWxzZSA6IGZuLmNhbGwodGhpcywgYSA9PT0gMCA/IDAgOiBhKTtcbiAgICAgIH0gOiBLRVkgPT0gJ2hhcycgPyBmdW5jdGlvbiBoYXMoYSl7XG4gICAgICAgIHJldHVybiBJU19XRUFLICYmICFpc09iamVjdChhKSA/IGZhbHNlIDogZm4uY2FsbCh0aGlzLCBhID09PSAwID8gMCA6IGEpO1xuICAgICAgfSA6IEtFWSA9PSAnZ2V0JyA/IGZ1bmN0aW9uIGdldChhKXtcbiAgICAgICAgcmV0dXJuIElTX1dFQUsgJiYgIWlzT2JqZWN0KGEpID8gdW5kZWZpbmVkIDogZm4uY2FsbCh0aGlzLCBhID09PSAwID8gMCA6IGEpO1xuICAgICAgfSA6IEtFWSA9PSAnYWRkJyA/IGZ1bmN0aW9uIGFkZChhKXsgZm4uY2FsbCh0aGlzLCBhID09PSAwID8gMCA6IGEpOyByZXR1cm4gdGhpczsgfVxuICAgICAgICA6IGZ1bmN0aW9uIHNldChhLCBiKXsgZm4uY2FsbCh0aGlzLCBhID09PSAwID8gMCA6IGEsIGIpOyByZXR1cm4gdGhpczsgfVxuICAgICk7XG4gIH07XG4gIGlmKHR5cGVvZiBDICE9ICdmdW5jdGlvbicgfHwgIShJU19XRUFLIHx8IHByb3RvLmZvckVhY2ggJiYgIWZhaWxzKGZ1bmN0aW9uKCl7XG4gICAgbmV3IEMoKS5lbnRyaWVzKCkubmV4dCgpO1xuICB9KSkpe1xuICAgIC8vIGNyZWF0ZSBjb2xsZWN0aW9uIGNvbnN0cnVjdG9yXG4gICAgQyA9IGNvbW1vbi5nZXRDb25zdHJ1Y3Rvcih3cmFwcGVyLCBOQU1FLCBJU19NQVAsIEFEREVSKTtcbiAgICByZWRlZmluZUFsbChDLnByb3RvdHlwZSwgbWV0aG9kcyk7XG4gICAgbWV0YS5ORUVEID0gdHJ1ZTtcbiAgfSBlbHNlIHtcbiAgICB2YXIgaW5zdGFuY2UgICAgICAgICAgICAgPSBuZXcgQ1xuICAgICAgLy8gZWFybHkgaW1wbGVtZW50YXRpb25zIG5vdCBzdXBwb3J0cyBjaGFpbmluZ1xuICAgICAgLCBIQVNOVF9DSEFJTklORyAgICAgICA9IGluc3RhbmNlW0FEREVSXShJU19XRUFLID8ge30gOiAtMCwgMSkgIT0gaW5zdGFuY2VcbiAgICAgIC8vIFY4IH4gIENocm9taXVtIDQwLSB3ZWFrLWNvbGxlY3Rpb25zIHRocm93cyBvbiBwcmltaXRpdmVzLCBidXQgc2hvdWxkIHJldHVybiBmYWxzZVxuICAgICAgLCBUSFJPV1NfT05fUFJJTUlUSVZFUyA9IGZhaWxzKGZ1bmN0aW9uKCl7IGluc3RhbmNlLmhhcygxKTsgfSlcbiAgICAgIC8vIG1vc3QgZWFybHkgaW1wbGVtZW50YXRpb25zIGRvZXNuJ3Qgc3VwcG9ydHMgaXRlcmFibGVzLCBtb3N0IG1vZGVybiAtIG5vdCBjbG9zZSBpdCBjb3JyZWN0bHlcbiAgICAgICwgQUNDRVBUX0lURVJBQkxFUyAgICAgPSAkaXRlckRldGVjdChmdW5jdGlvbihpdGVyKXsgbmV3IEMoaXRlcik7IH0pIC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tbmV3XG4gICAgICAvLyBmb3IgZWFybHkgaW1wbGVtZW50YXRpb25zIC0wIGFuZCArMCBub3QgdGhlIHNhbWVcbiAgICAgICwgQlVHR1lfWkVSTyA9ICFJU19XRUFLICYmIGZhaWxzKGZ1bmN0aW9uKCl7XG4gICAgICAgIC8vIFY4IH4gQ2hyb21pdW0gNDItIGZhaWxzIG9ubHkgd2l0aCA1KyBlbGVtZW50c1xuICAgICAgICB2YXIgJGluc3RhbmNlID0gbmV3IEMoKVxuICAgICAgICAgICwgaW5kZXggICAgID0gNTtcbiAgICAgICAgd2hpbGUoaW5kZXgtLSkkaW5zdGFuY2VbQURERVJdKGluZGV4LCBpbmRleCk7XG4gICAgICAgIHJldHVybiAhJGluc3RhbmNlLmhhcygtMCk7XG4gICAgICB9KTtcbiAgICBpZighQUNDRVBUX0lURVJBQkxFUyl7IFxuICAgICAgQyA9IHdyYXBwZXIoZnVuY3Rpb24odGFyZ2V0LCBpdGVyYWJsZSl7XG4gICAgICAgIGFuSW5zdGFuY2UodGFyZ2V0LCBDLCBOQU1FKTtcbiAgICAgICAgdmFyIHRoYXQgPSBpbmhlcml0SWZSZXF1aXJlZChuZXcgQmFzZSwgdGFyZ2V0LCBDKTtcbiAgICAgICAgaWYoaXRlcmFibGUgIT0gdW5kZWZpbmVkKWZvck9mKGl0ZXJhYmxlLCBJU19NQVAsIHRoYXRbQURERVJdLCB0aGF0KTtcbiAgICAgICAgcmV0dXJuIHRoYXQ7XG4gICAgICB9KTtcbiAgICAgIEMucHJvdG90eXBlID0gcHJvdG87XG4gICAgICBwcm90by5jb25zdHJ1Y3RvciA9IEM7XG4gICAgfVxuICAgIGlmKFRIUk9XU19PTl9QUklNSVRJVkVTIHx8IEJVR0dZX1pFUk8pe1xuICAgICAgZml4TWV0aG9kKCdkZWxldGUnKTtcbiAgICAgIGZpeE1ldGhvZCgnaGFzJyk7XG4gICAgICBJU19NQVAgJiYgZml4TWV0aG9kKCdnZXQnKTtcbiAgICB9XG4gICAgaWYoQlVHR1lfWkVSTyB8fCBIQVNOVF9DSEFJTklORylmaXhNZXRob2QoQURERVIpO1xuICAgIC8vIHdlYWsgY29sbGVjdGlvbnMgc2hvdWxkIG5vdCBjb250YWlucyAuY2xlYXIgbWV0aG9kXG4gICAgaWYoSVNfV0VBSyAmJiBwcm90by5jbGVhcilkZWxldGUgcHJvdG8uY2xlYXI7XG4gIH1cblxuICBzZXRUb1N0cmluZ1RhZyhDLCBOQU1FKTtcblxuICBPW05BTUVdID0gQztcbiAgJGV4cG9ydCgkZXhwb3J0LkcgKyAkZXhwb3J0LlcgKyAkZXhwb3J0LkYgKiAoQyAhPSBCYXNlKSwgTyk7XG5cbiAgaWYoIUlTX1dFQUspY29tbW9uLnNldFN0cm9uZyhDLCBOQU1FLCBJU19NQVApO1xuXG4gIHJldHVybiBDO1xufTsiLCJ2YXIgY29yZSA9IG1vZHVsZS5leHBvcnRzID0ge3ZlcnNpb246ICcyLjIuMSd9O1xuaWYodHlwZW9mIF9fZSA9PSAnbnVtYmVyJylfX2UgPSBjb3JlOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVuZGVmIiwiLy8gb3B0aW9uYWwgLyBzaW1wbGUgY29udGV4dCBiaW5kaW5nXG52YXIgYUZ1bmN0aW9uID0gcmVxdWlyZSgnLi9fYS1mdW5jdGlvbicpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihmbiwgdGhhdCwgbGVuZ3RoKXtcbiAgYUZ1bmN0aW9uKGZuKTtcbiAgaWYodGhhdCA9PT0gdW5kZWZpbmVkKXJldHVybiBmbjtcbiAgc3dpdGNoKGxlbmd0aCl7XG4gICAgY2FzZSAxOiByZXR1cm4gZnVuY3Rpb24oYSl7XG4gICAgICByZXR1cm4gZm4uY2FsbCh0aGF0LCBhKTtcbiAgICB9O1xuICAgIGNhc2UgMjogcmV0dXJuIGZ1bmN0aW9uKGEsIGIpe1xuICAgICAgcmV0dXJuIGZuLmNhbGwodGhhdCwgYSwgYik7XG4gICAgfTtcbiAgICBjYXNlIDM6IHJldHVybiBmdW5jdGlvbihhLCBiLCBjKXtcbiAgICAgIHJldHVybiBmbi5jYWxsKHRoYXQsIGEsIGIsIGMpO1xuICAgIH07XG4gIH1cbiAgcmV0dXJuIGZ1bmN0aW9uKC8qIC4uLmFyZ3MgKi8pe1xuICAgIHJldHVybiBmbi5hcHBseSh0aGF0LCBhcmd1bWVudHMpO1xuICB9O1xufTsiLCIndXNlIHN0cmljdCc7XHJcbnZhciBhbk9iamVjdCAgICA9IHJlcXVpcmUoJy4vX2FuLW9iamVjdCcpXHJcbiAgLCB0b1ByaW1pdGl2ZSA9IHJlcXVpcmUoJy4vX3RvLXByaW1pdGl2ZScpXHJcbiAgLCBOVU1CRVIgICAgICA9ICdudW1iZXInO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihoaW50KXtcclxuICBpZihoaW50ICE9PSAnc3RyaW5nJyAmJiBoaW50ICE9PSBOVU1CRVIgJiYgaGludCAhPT0gJ2RlZmF1bHQnKXRocm93IFR5cGVFcnJvcignSW5jb3JyZWN0IGhpbnQnKTtcclxuICByZXR1cm4gdG9QcmltaXRpdmUoYW5PYmplY3QodGhpcyksIGhpbnQgIT0gTlVNQkVSKTtcclxufTsiLCIvLyA3LjIuMSBSZXF1aXJlT2JqZWN0Q29lcmNpYmxlKGFyZ3VtZW50KVxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpdCl7XG4gIGlmKGl0ID09IHVuZGVmaW5lZCl0aHJvdyBUeXBlRXJyb3IoXCJDYW4ndCBjYWxsIG1ldGhvZCBvbiAgXCIgKyBpdCk7XG4gIHJldHVybiBpdDtcbn07IiwiLy8gVGhhbmsncyBJRTggZm9yIGhpcyBmdW5ueSBkZWZpbmVQcm9wZXJ0eVxubW9kdWxlLmV4cG9ydHMgPSAhcmVxdWlyZSgnLi9fZmFpbHMnKShmdW5jdGlvbigpe1xuICByZXR1cm4gT2JqZWN0LmRlZmluZVByb3BlcnR5KHt9LCAnYScsIHtnZXQ6IGZ1bmN0aW9uKCl7IHJldHVybiA3OyB9fSkuYSAhPSA3O1xufSk7IiwidmFyIGlzT2JqZWN0ID0gcmVxdWlyZSgnLi9faXMtb2JqZWN0JylcbiAgLCBkb2N1bWVudCA9IHJlcXVpcmUoJy4vX2dsb2JhbCcpLmRvY3VtZW50XG4gIC8vIGluIG9sZCBJRSB0eXBlb2YgZG9jdW1lbnQuY3JlYXRlRWxlbWVudCBpcyAnb2JqZWN0J1xuICAsIGlzID0gaXNPYmplY3QoZG9jdW1lbnQpICYmIGlzT2JqZWN0KGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpdCl7XG4gIHJldHVybiBpcyA/IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoaXQpIDoge307XG59OyIsIi8vIElFIDgtIGRvbid0IGVudW0gYnVnIGtleXNcclxubW9kdWxlLmV4cG9ydHMgPSAoXHJcbiAgJ2NvbnN0cnVjdG9yLGhhc093blByb3BlcnR5LGlzUHJvdG90eXBlT2YscHJvcGVydHlJc0VudW1lcmFibGUsdG9Mb2NhbGVTdHJpbmcsdG9TdHJpbmcsdmFsdWVPZidcclxuKS5zcGxpdCgnLCcpOyIsIi8vIGFsbCBlbnVtZXJhYmxlIG9iamVjdCBrZXlzLCBpbmNsdWRlcyBzeW1ib2xzXG52YXIgZ2V0S2V5cyA9IHJlcXVpcmUoJy4vX29iamVjdC1rZXlzJylcbiAgLCBnT1BTICAgID0gcmVxdWlyZSgnLi9fb2JqZWN0LWdvcHMnKVxuICAsIHBJRSAgICAgPSByZXF1aXJlKCcuL19vYmplY3QtcGllJyk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGl0KXtcbiAgdmFyIHJlc3VsdCAgICAgPSBnZXRLZXlzKGl0KVxuICAgICwgZ2V0U3ltYm9scyA9IGdPUFMuZjtcbiAgaWYoZ2V0U3ltYm9scyl7XG4gICAgdmFyIHN5bWJvbHMgPSBnZXRTeW1ib2xzKGl0KVxuICAgICAgLCBpc0VudW0gID0gcElFLmZcbiAgICAgICwgaSAgICAgICA9IDBcbiAgICAgICwga2V5O1xuICAgIHdoaWxlKHN5bWJvbHMubGVuZ3RoID4gaSlpZihpc0VudW0uY2FsbChpdCwga2V5ID0gc3ltYm9sc1tpKytdKSlyZXN1bHQucHVzaChrZXkpO1xuICB9IHJldHVybiByZXN1bHQ7XG59OyIsInZhciBnbG9iYWwgICAgPSByZXF1aXJlKCcuL19nbG9iYWwnKVxuICAsIGNvcmUgICAgICA9IHJlcXVpcmUoJy4vX2NvcmUnKVxuICAsIGhpZGUgICAgICA9IHJlcXVpcmUoJy4vX2hpZGUnKVxuICAsIHJlZGVmaW5lICA9IHJlcXVpcmUoJy4vX3JlZGVmaW5lJylcbiAgLCBjdHggICAgICAgPSByZXF1aXJlKCcuL19jdHgnKVxuICAsIFBST1RPVFlQRSA9ICdwcm90b3R5cGUnO1xuXG52YXIgJGV4cG9ydCA9IGZ1bmN0aW9uKHR5cGUsIG5hbWUsIHNvdXJjZSl7XG4gIHZhciBJU19GT1JDRUQgPSB0eXBlICYgJGV4cG9ydC5GXG4gICAgLCBJU19HTE9CQUwgPSB0eXBlICYgJGV4cG9ydC5HXG4gICAgLCBJU19TVEFUSUMgPSB0eXBlICYgJGV4cG9ydC5TXG4gICAgLCBJU19QUk9UTyAgPSB0eXBlICYgJGV4cG9ydC5QXG4gICAgLCBJU19CSU5EICAgPSB0eXBlICYgJGV4cG9ydC5CXG4gICAgLCB0YXJnZXQgICAgPSBJU19HTE9CQUwgPyBnbG9iYWwgOiBJU19TVEFUSUMgPyBnbG9iYWxbbmFtZV0gfHwgKGdsb2JhbFtuYW1lXSA9IHt9KSA6IChnbG9iYWxbbmFtZV0gfHwge30pW1BST1RPVFlQRV1cbiAgICAsIGV4cG9ydHMgICA9IElTX0dMT0JBTCA/IGNvcmUgOiBjb3JlW25hbWVdIHx8IChjb3JlW25hbWVdID0ge30pXG4gICAgLCBleHBQcm90byAgPSBleHBvcnRzW1BST1RPVFlQRV0gfHwgKGV4cG9ydHNbUFJPVE9UWVBFXSA9IHt9KVxuICAgICwga2V5LCBvd24sIG91dCwgZXhwO1xuICBpZihJU19HTE9CQUwpc291cmNlID0gbmFtZTtcbiAgZm9yKGtleSBpbiBzb3VyY2Upe1xuICAgIC8vIGNvbnRhaW5zIGluIG5hdGl2ZVxuICAgIG93biA9ICFJU19GT1JDRUQgJiYgdGFyZ2V0ICYmIHRhcmdldFtrZXldICE9PSB1bmRlZmluZWQ7XG4gICAgLy8gZXhwb3J0IG5hdGl2ZSBvciBwYXNzZWRcbiAgICBvdXQgPSAob3duID8gdGFyZ2V0IDogc291cmNlKVtrZXldO1xuICAgIC8vIGJpbmQgdGltZXJzIHRvIGdsb2JhbCBmb3IgY2FsbCBmcm9tIGV4cG9ydCBjb250ZXh0XG4gICAgZXhwID0gSVNfQklORCAmJiBvd24gPyBjdHgob3V0LCBnbG9iYWwpIDogSVNfUFJPVE8gJiYgdHlwZW9mIG91dCA9PSAnZnVuY3Rpb24nID8gY3R4KEZ1bmN0aW9uLmNhbGwsIG91dCkgOiBvdXQ7XG4gICAgLy8gZXh0ZW5kIGdsb2JhbFxuICAgIGlmKHRhcmdldClyZWRlZmluZSh0YXJnZXQsIGtleSwgb3V0LCB0eXBlICYgJGV4cG9ydC5VKTtcbiAgICAvLyBleHBvcnRcbiAgICBpZihleHBvcnRzW2tleV0gIT0gb3V0KWhpZGUoZXhwb3J0cywga2V5LCBleHApO1xuICAgIGlmKElTX1BST1RPICYmIGV4cFByb3RvW2tleV0gIT0gb3V0KWV4cFByb3RvW2tleV0gPSBvdXQ7XG4gIH1cbn07XG5nbG9iYWwuY29yZSA9IGNvcmU7XG4vLyB0eXBlIGJpdG1hcFxuJGV4cG9ydC5GID0gMTsgICAvLyBmb3JjZWRcbiRleHBvcnQuRyA9IDI7ICAgLy8gZ2xvYmFsXG4kZXhwb3J0LlMgPSA0OyAgIC8vIHN0YXRpY1xuJGV4cG9ydC5QID0gODsgICAvLyBwcm90b1xuJGV4cG9ydC5CID0gMTY7ICAvLyBiaW5kXG4kZXhwb3J0LlcgPSAzMjsgIC8vIHdyYXBcbiRleHBvcnQuVSA9IDY0OyAgLy8gc2FmZVxuJGV4cG9ydC5SID0gMTI4OyAvLyByZWFsIHByb3RvIG1ldGhvZCBmb3IgYGxpYnJhcnlgIFxubW9kdWxlLmV4cG9ydHMgPSAkZXhwb3J0OyIsInZhciBNQVRDSCA9IHJlcXVpcmUoJy4vX3drcycpKCdtYXRjaCcpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihLRVkpe1xuICB2YXIgcmUgPSAvLi87XG4gIHRyeSB7XG4gICAgJy8uLydbS0VZXShyZSk7XG4gIH0gY2F0Y2goZSl7XG4gICAgdHJ5IHtcbiAgICAgIHJlW01BVENIXSA9IGZhbHNlO1xuICAgICAgcmV0dXJuICEnLy4vJ1tLRVldKHJlKTtcbiAgICB9IGNhdGNoKGYpeyAvKiBlbXB0eSAqLyB9XG4gIH0gcmV0dXJuIHRydWU7XG59OyIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oZXhlYyl7XG4gIHRyeSB7XG4gICAgcmV0dXJuICEhZXhlYygpO1xuICB9IGNhdGNoKGUpe1xuICAgIHJldHVybiB0cnVlO1xuICB9XG59OyIsIid1c2Ugc3RyaWN0JztcbnZhciBoaWRlICAgICA9IHJlcXVpcmUoJy4vX2hpZGUnKVxuICAsIHJlZGVmaW5lID0gcmVxdWlyZSgnLi9fcmVkZWZpbmUnKVxuICAsIGZhaWxzICAgID0gcmVxdWlyZSgnLi9fZmFpbHMnKVxuICAsIGRlZmluZWQgID0gcmVxdWlyZSgnLi9fZGVmaW5lZCcpXG4gICwgd2tzICAgICAgPSByZXF1aXJlKCcuL193a3MnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihLRVksIGxlbmd0aCwgZXhlYyl7XG4gIHZhciBTWU1CT0wgICA9IHdrcyhLRVkpXG4gICAgLCBmbnMgICAgICA9IGV4ZWMoZGVmaW5lZCwgU1lNQk9MLCAnJ1tLRVldKVxuICAgICwgc3RyZm4gICAgPSBmbnNbMF1cbiAgICAsIHJ4Zm4gICAgID0gZm5zWzFdO1xuICBpZihmYWlscyhmdW5jdGlvbigpe1xuICAgIHZhciBPID0ge307XG4gICAgT1tTWU1CT0xdID0gZnVuY3Rpb24oKXsgcmV0dXJuIDc7IH07XG4gICAgcmV0dXJuICcnW0tFWV0oTykgIT0gNztcbiAgfSkpe1xuICAgIHJlZGVmaW5lKFN0cmluZy5wcm90b3R5cGUsIEtFWSwgc3RyZm4pO1xuICAgIGhpZGUoUmVnRXhwLnByb3RvdHlwZSwgU1lNQk9MLCBsZW5ndGggPT0gMlxuICAgICAgLy8gMjEuMi41LjggUmVnRXhwLnByb3RvdHlwZVtAQHJlcGxhY2VdKHN0cmluZywgcmVwbGFjZVZhbHVlKVxuICAgICAgLy8gMjEuMi41LjExIFJlZ0V4cC5wcm90b3R5cGVbQEBzcGxpdF0oc3RyaW5nLCBsaW1pdClcbiAgICAgID8gZnVuY3Rpb24oc3RyaW5nLCBhcmcpeyByZXR1cm4gcnhmbi5jYWxsKHN0cmluZywgdGhpcywgYXJnKTsgfVxuICAgICAgLy8gMjEuMi41LjYgUmVnRXhwLnByb3RvdHlwZVtAQG1hdGNoXShzdHJpbmcpXG4gICAgICAvLyAyMS4yLjUuOSBSZWdFeHAucHJvdG90eXBlW0BAc2VhcmNoXShzdHJpbmcpXG4gICAgICA6IGZ1bmN0aW9uKHN0cmluZyl7IHJldHVybiByeGZuLmNhbGwoc3RyaW5nLCB0aGlzKTsgfVxuICAgICk7XG4gIH1cbn07IiwiJ3VzZSBzdHJpY3QnO1xuLy8gMjEuMi41LjMgZ2V0IFJlZ0V4cC5wcm90b3R5cGUuZmxhZ3NcbnZhciBhbk9iamVjdCA9IHJlcXVpcmUoJy4vX2FuLW9iamVjdCcpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbigpe1xuICB2YXIgdGhhdCAgID0gYW5PYmplY3QodGhpcylcbiAgICAsIHJlc3VsdCA9ICcnO1xuICBpZih0aGF0Lmdsb2JhbCkgICAgIHJlc3VsdCArPSAnZyc7XG4gIGlmKHRoYXQuaWdub3JlQ2FzZSkgcmVzdWx0ICs9ICdpJztcbiAgaWYodGhhdC5tdWx0aWxpbmUpICByZXN1bHQgKz0gJ20nO1xuICBpZih0aGF0LnVuaWNvZGUpICAgIHJlc3VsdCArPSAndSc7XG4gIGlmKHRoYXQuc3RpY2t5KSAgICAgcmVzdWx0ICs9ICd5JztcbiAgcmV0dXJuIHJlc3VsdDtcbn07IiwidmFyIGN0eCAgICAgICAgID0gcmVxdWlyZSgnLi9fY3R4JylcbiAgLCBjYWxsICAgICAgICA9IHJlcXVpcmUoJy4vX2l0ZXItY2FsbCcpXG4gICwgaXNBcnJheUl0ZXIgPSByZXF1aXJlKCcuL19pcy1hcnJheS1pdGVyJylcbiAgLCBhbk9iamVjdCAgICA9IHJlcXVpcmUoJy4vX2FuLW9iamVjdCcpXG4gICwgdG9MZW5ndGggICAgPSByZXF1aXJlKCcuL190by1sZW5ndGgnKVxuICAsIGdldEl0ZXJGbiAgID0gcmVxdWlyZSgnLi9jb3JlLmdldC1pdGVyYXRvci1tZXRob2QnKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oaXRlcmFibGUsIGVudHJpZXMsIGZuLCB0aGF0LCBJVEVSQVRPUil7XG4gIHZhciBpdGVyRm4gPSBJVEVSQVRPUiA/IGZ1bmN0aW9uKCl7IHJldHVybiBpdGVyYWJsZTsgfSA6IGdldEl0ZXJGbihpdGVyYWJsZSlcbiAgICAsIGYgICAgICA9IGN0eChmbiwgdGhhdCwgZW50cmllcyA/IDIgOiAxKVxuICAgICwgaW5kZXggID0gMFxuICAgICwgbGVuZ3RoLCBzdGVwLCBpdGVyYXRvcjtcbiAgaWYodHlwZW9mIGl0ZXJGbiAhPSAnZnVuY3Rpb24nKXRocm93IFR5cGVFcnJvcihpdGVyYWJsZSArICcgaXMgbm90IGl0ZXJhYmxlIScpO1xuICAvLyBmYXN0IGNhc2UgZm9yIGFycmF5cyB3aXRoIGRlZmF1bHQgaXRlcmF0b3JcbiAgaWYoaXNBcnJheUl0ZXIoaXRlckZuKSlmb3IobGVuZ3RoID0gdG9MZW5ndGgoaXRlcmFibGUubGVuZ3RoKTsgbGVuZ3RoID4gaW5kZXg7IGluZGV4Kyspe1xuICAgIGVudHJpZXMgPyBmKGFuT2JqZWN0KHN0ZXAgPSBpdGVyYWJsZVtpbmRleF0pWzBdLCBzdGVwWzFdKSA6IGYoaXRlcmFibGVbaW5kZXhdKTtcbiAgfSBlbHNlIGZvcihpdGVyYXRvciA9IGl0ZXJGbi5jYWxsKGl0ZXJhYmxlKTsgIShzdGVwID0gaXRlcmF0b3IubmV4dCgpKS5kb25lOyApe1xuICAgIGNhbGwoaXRlcmF0b3IsIGYsIHN0ZXAudmFsdWUsIGVudHJpZXMpO1xuICB9XG59OyIsIi8vIGh0dHBzOi8vZ2l0aHViLmNvbS96bG9pcm9jay9jb3JlLWpzL2lzc3Vlcy84NiNpc3N1ZWNvbW1lbnQtMTE1NzU5MDI4XG52YXIgZ2xvYmFsID0gbW9kdWxlLmV4cG9ydHMgPSB0eXBlb2Ygd2luZG93ICE9ICd1bmRlZmluZWQnICYmIHdpbmRvdy5NYXRoID09IE1hdGhcbiAgPyB3aW5kb3cgOiB0eXBlb2Ygc2VsZiAhPSAndW5kZWZpbmVkJyAmJiBzZWxmLk1hdGggPT0gTWF0aCA/IHNlbGYgOiBGdW5jdGlvbigncmV0dXJuIHRoaXMnKSgpO1xuaWYodHlwZW9mIF9fZyA9PSAnbnVtYmVyJylfX2cgPSBnbG9iYWw7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW5kZWYiLCJ2YXIgaGFzT3duUHJvcGVydHkgPSB7fS5oYXNPd25Qcm9wZXJ0eTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oaXQsIGtleSl7XG4gIHJldHVybiBoYXNPd25Qcm9wZXJ0eS5jYWxsKGl0LCBrZXkpO1xufTsiLCJ2YXIgZFAgICAgICAgICA9IHJlcXVpcmUoJy4vX29iamVjdC1kcCcpXG4gICwgY3JlYXRlRGVzYyA9IHJlcXVpcmUoJy4vX3Byb3BlcnR5LWRlc2MnKTtcbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9fZGVzY3JpcHRvcnMnKSA/IGZ1bmN0aW9uKG9iamVjdCwga2V5LCB2YWx1ZSl7XG4gIHJldHVybiBkUC5mKG9iamVjdCwga2V5LCBjcmVhdGVEZXNjKDEsIHZhbHVlKSk7XG59IDogZnVuY3Rpb24ob2JqZWN0LCBrZXksIHZhbHVlKXtcbiAgb2JqZWN0W2tleV0gPSB2YWx1ZTtcbiAgcmV0dXJuIG9iamVjdDtcbn07IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL19nbG9iYWwnKS5kb2N1bWVudCAmJiBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQ7IiwibW9kdWxlLmV4cG9ydHMgPSAhcmVxdWlyZSgnLi9fZGVzY3JpcHRvcnMnKSAmJiAhcmVxdWlyZSgnLi9fZmFpbHMnKShmdW5jdGlvbigpe1xyXG4gIHJldHVybiBPYmplY3QuZGVmaW5lUHJvcGVydHkocmVxdWlyZSgnLi9fZG9tLWNyZWF0ZScpKCdkaXYnKSwgJ2EnLCB7Z2V0OiBmdW5jdGlvbigpeyByZXR1cm4gNzsgfX0pLmEgIT0gNztcclxufSk7IiwidmFyIGlzT2JqZWN0ICAgICAgID0gcmVxdWlyZSgnLi9faXMtb2JqZWN0JylcclxuICAsIHNldFByb3RvdHlwZU9mID0gcmVxdWlyZSgnLi9fc2V0LXByb3RvJykuc2V0O1xyXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKHRoYXQsIHRhcmdldCwgQyl7XHJcbiAgdmFyIFAsIFMgPSB0YXJnZXQuY29uc3RydWN0b3I7XHJcbiAgaWYoUyAhPT0gQyAmJiB0eXBlb2YgUyA9PSAnZnVuY3Rpb24nICYmIChQID0gUy5wcm90b3R5cGUpICE9PSBDLnByb3RvdHlwZSAmJiBpc09iamVjdChQKSAmJiBzZXRQcm90b3R5cGVPZil7XHJcbiAgICBzZXRQcm90b3R5cGVPZih0aGF0LCBQKTtcclxuICB9IHJldHVybiB0aGF0O1xyXG59OyIsIi8vIGZhc3QgYXBwbHksIGh0dHA6Ly9qc3BlcmYubG5raXQuY29tL2Zhc3QtYXBwbHkvNVxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihmbiwgYXJncywgdGhhdCl7XG4gIHZhciB1biA9IHRoYXQgPT09IHVuZGVmaW5lZDtcbiAgc3dpdGNoKGFyZ3MubGVuZ3RoKXtcbiAgICBjYXNlIDA6IHJldHVybiB1biA/IGZuKClcbiAgICAgICAgICAgICAgICAgICAgICA6IGZuLmNhbGwodGhhdCk7XG4gICAgY2FzZSAxOiByZXR1cm4gdW4gPyBmbihhcmdzWzBdKVxuICAgICAgICAgICAgICAgICAgICAgIDogZm4uY2FsbCh0aGF0LCBhcmdzWzBdKTtcbiAgICBjYXNlIDI6IHJldHVybiB1biA/IGZuKGFyZ3NbMF0sIGFyZ3NbMV0pXG4gICAgICAgICAgICAgICAgICAgICAgOiBmbi5jYWxsKHRoYXQsIGFyZ3NbMF0sIGFyZ3NbMV0pO1xuICAgIGNhc2UgMzogcmV0dXJuIHVuID8gZm4oYXJnc1swXSwgYXJnc1sxXSwgYXJnc1syXSlcbiAgICAgICAgICAgICAgICAgICAgICA6IGZuLmNhbGwodGhhdCwgYXJnc1swXSwgYXJnc1sxXSwgYXJnc1syXSk7XG4gICAgY2FzZSA0OiByZXR1cm4gdW4gPyBmbihhcmdzWzBdLCBhcmdzWzFdLCBhcmdzWzJdLCBhcmdzWzNdKVxuICAgICAgICAgICAgICAgICAgICAgIDogZm4uY2FsbCh0aGF0LCBhcmdzWzBdLCBhcmdzWzFdLCBhcmdzWzJdLCBhcmdzWzNdKTtcbiAgfSByZXR1cm4gICAgICAgICAgICAgIGZuLmFwcGx5KHRoYXQsIGFyZ3MpO1xufTsiLCIvLyBmYWxsYmFjayBmb3Igbm9uLWFycmF5LWxpa2UgRVMzIGFuZCBub24tZW51bWVyYWJsZSBvbGQgVjggc3RyaW5nc1xudmFyIGNvZiA9IHJlcXVpcmUoJy4vX2NvZicpO1xubW9kdWxlLmV4cG9ydHMgPSBPYmplY3QoJ3onKS5wcm9wZXJ0eUlzRW51bWVyYWJsZSgwKSA/IE9iamVjdCA6IGZ1bmN0aW9uKGl0KXtcbiAgcmV0dXJuIGNvZihpdCkgPT0gJ1N0cmluZycgPyBpdC5zcGxpdCgnJykgOiBPYmplY3QoaXQpO1xufTsiLCIvLyBjaGVjayBvbiBkZWZhdWx0IEFycmF5IGl0ZXJhdG9yXG52YXIgSXRlcmF0b3JzICA9IHJlcXVpcmUoJy4vX2l0ZXJhdG9ycycpXG4gICwgSVRFUkFUT1IgICA9IHJlcXVpcmUoJy4vX3drcycpKCdpdGVyYXRvcicpXG4gICwgQXJyYXlQcm90byA9IEFycmF5LnByb3RvdHlwZTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpdCl7XG4gIHJldHVybiBpdCAhPT0gdW5kZWZpbmVkICYmIChJdGVyYXRvcnMuQXJyYXkgPT09IGl0IHx8IEFycmF5UHJvdG9bSVRFUkFUT1JdID09PSBpdCk7XG59OyIsIi8vIDcuMi4yIElzQXJyYXkoYXJndW1lbnQpXG52YXIgY29mID0gcmVxdWlyZSgnLi9fY29mJyk7XG5tb2R1bGUuZXhwb3J0cyA9IEFycmF5LmlzQXJyYXkgfHwgZnVuY3Rpb24gaXNBcnJheShhcmcpe1xuICByZXR1cm4gY29mKGFyZykgPT0gJ0FycmF5Jztcbn07IiwiLy8gMjAuMS4yLjMgTnVtYmVyLmlzSW50ZWdlcihudW1iZXIpXG52YXIgaXNPYmplY3QgPSByZXF1aXJlKCcuL19pcy1vYmplY3QnKVxuICAsIGZsb29yICAgID0gTWF0aC5mbG9vcjtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gaXNJbnRlZ2VyKGl0KXtcbiAgcmV0dXJuICFpc09iamVjdChpdCkgJiYgaXNGaW5pdGUoaXQpICYmIGZsb29yKGl0KSA9PT0gaXQ7XG59OyIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oaXQpe1xuICByZXR1cm4gdHlwZW9mIGl0ID09PSAnb2JqZWN0JyA/IGl0ICE9PSBudWxsIDogdHlwZW9mIGl0ID09PSAnZnVuY3Rpb24nO1xufTsiLCIvLyA3LjIuOCBJc1JlZ0V4cChhcmd1bWVudClcbnZhciBpc09iamVjdCA9IHJlcXVpcmUoJy4vX2lzLW9iamVjdCcpXG4gICwgY29mICAgICAgPSByZXF1aXJlKCcuL19jb2YnKVxuICAsIE1BVENIICAgID0gcmVxdWlyZSgnLi9fd2tzJykoJ21hdGNoJyk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGl0KXtcbiAgdmFyIGlzUmVnRXhwO1xuICByZXR1cm4gaXNPYmplY3QoaXQpICYmICgoaXNSZWdFeHAgPSBpdFtNQVRDSF0pICE9PSB1bmRlZmluZWQgPyAhIWlzUmVnRXhwIDogY29mKGl0KSA9PSAnUmVnRXhwJyk7XG59OyIsIi8vIGNhbGwgc29tZXRoaW5nIG9uIGl0ZXJhdG9yIHN0ZXAgd2l0aCBzYWZlIGNsb3Npbmcgb24gZXJyb3JcbnZhciBhbk9iamVjdCA9IHJlcXVpcmUoJy4vX2FuLW9iamVjdCcpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpdGVyYXRvciwgZm4sIHZhbHVlLCBlbnRyaWVzKXtcbiAgdHJ5IHtcbiAgICByZXR1cm4gZW50cmllcyA/IGZuKGFuT2JqZWN0KHZhbHVlKVswXSwgdmFsdWVbMV0pIDogZm4odmFsdWUpO1xuICAvLyA3LjQuNiBJdGVyYXRvckNsb3NlKGl0ZXJhdG9yLCBjb21wbGV0aW9uKVxuICB9IGNhdGNoKGUpe1xuICAgIHZhciByZXQgPSBpdGVyYXRvclsncmV0dXJuJ107XG4gICAgaWYocmV0ICE9PSB1bmRlZmluZWQpYW5PYmplY3QocmV0LmNhbGwoaXRlcmF0b3IpKTtcbiAgICB0aHJvdyBlO1xuICB9XG59OyIsIid1c2Ugc3RyaWN0JztcbnZhciBjcmVhdGUgICAgICAgICA9IHJlcXVpcmUoJy4vX29iamVjdC1jcmVhdGUnKVxuICAsIGRlc2NyaXB0b3IgICAgID0gcmVxdWlyZSgnLi9fcHJvcGVydHktZGVzYycpXG4gICwgc2V0VG9TdHJpbmdUYWcgPSByZXF1aXJlKCcuL19zZXQtdG8tc3RyaW5nLXRhZycpXG4gICwgSXRlcmF0b3JQcm90b3R5cGUgPSB7fTtcblxuLy8gMjUuMS4yLjEuMSAlSXRlcmF0b3JQcm90b3R5cGUlW0BAaXRlcmF0b3JdKClcbnJlcXVpcmUoJy4vX2hpZGUnKShJdGVyYXRvclByb3RvdHlwZSwgcmVxdWlyZSgnLi9fd2tzJykoJ2l0ZXJhdG9yJyksIGZ1bmN0aW9uKCl7IHJldHVybiB0aGlzOyB9KTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihDb25zdHJ1Y3RvciwgTkFNRSwgbmV4dCl7XG4gIENvbnN0cnVjdG9yLnByb3RvdHlwZSA9IGNyZWF0ZShJdGVyYXRvclByb3RvdHlwZSwge25leHQ6IGRlc2NyaXB0b3IoMSwgbmV4dCl9KTtcbiAgc2V0VG9TdHJpbmdUYWcoQ29uc3RydWN0b3IsIE5BTUUgKyAnIEl0ZXJhdG9yJyk7XG59OyIsIid1c2Ugc3RyaWN0JztcbnZhciBMSUJSQVJZICAgICAgICA9IHJlcXVpcmUoJy4vX2xpYnJhcnknKVxuICAsICRleHBvcnQgICAgICAgID0gcmVxdWlyZSgnLi9fZXhwb3J0JylcbiAgLCByZWRlZmluZSAgICAgICA9IHJlcXVpcmUoJy4vX3JlZGVmaW5lJylcbiAgLCBoaWRlICAgICAgICAgICA9IHJlcXVpcmUoJy4vX2hpZGUnKVxuICAsIGhhcyAgICAgICAgICAgID0gcmVxdWlyZSgnLi9faGFzJylcbiAgLCBJdGVyYXRvcnMgICAgICA9IHJlcXVpcmUoJy4vX2l0ZXJhdG9ycycpXG4gICwgJGl0ZXJDcmVhdGUgICAgPSByZXF1aXJlKCcuL19pdGVyLWNyZWF0ZScpXG4gICwgc2V0VG9TdHJpbmdUYWcgPSByZXF1aXJlKCcuL19zZXQtdG8tc3RyaW5nLXRhZycpXG4gICwgZ2V0UHJvdG90eXBlT2YgPSByZXF1aXJlKCcuL19vYmplY3QtZ3BvJylcbiAgLCBJVEVSQVRPUiAgICAgICA9IHJlcXVpcmUoJy4vX3drcycpKCdpdGVyYXRvcicpXG4gICwgQlVHR1kgICAgICAgICAgPSAhKFtdLmtleXMgJiYgJ25leHQnIGluIFtdLmtleXMoKSkgLy8gU2FmYXJpIGhhcyBidWdneSBpdGVyYXRvcnMgdy9vIGBuZXh0YFxuICAsIEZGX0lURVJBVE9SICAgID0gJ0BAaXRlcmF0b3InXG4gICwgS0VZUyAgICAgICAgICAgPSAna2V5cydcbiAgLCBWQUxVRVMgICAgICAgICA9ICd2YWx1ZXMnO1xuXG52YXIgcmV0dXJuVGhpcyA9IGZ1bmN0aW9uKCl7IHJldHVybiB0aGlzOyB9O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKEJhc2UsIE5BTUUsIENvbnN0cnVjdG9yLCBuZXh0LCBERUZBVUxULCBJU19TRVQsIEZPUkNFRCl7XG4gICRpdGVyQ3JlYXRlKENvbnN0cnVjdG9yLCBOQU1FLCBuZXh0KTtcbiAgdmFyIGdldE1ldGhvZCA9IGZ1bmN0aW9uKGtpbmQpe1xuICAgIGlmKCFCVUdHWSAmJiBraW5kIGluIHByb3RvKXJldHVybiBwcm90b1traW5kXTtcbiAgICBzd2l0Y2goa2luZCl7XG4gICAgICBjYXNlIEtFWVM6IHJldHVybiBmdW5jdGlvbiBrZXlzKCl7IHJldHVybiBuZXcgQ29uc3RydWN0b3IodGhpcywga2luZCk7IH07XG4gICAgICBjYXNlIFZBTFVFUzogcmV0dXJuIGZ1bmN0aW9uIHZhbHVlcygpeyByZXR1cm4gbmV3IENvbnN0cnVjdG9yKHRoaXMsIGtpbmQpOyB9O1xuICAgIH0gcmV0dXJuIGZ1bmN0aW9uIGVudHJpZXMoKXsgcmV0dXJuIG5ldyBDb25zdHJ1Y3Rvcih0aGlzLCBraW5kKTsgfTtcbiAgfTtcbiAgdmFyIFRBRyAgICAgICAgPSBOQU1FICsgJyBJdGVyYXRvcidcbiAgICAsIERFRl9WQUxVRVMgPSBERUZBVUxUID09IFZBTFVFU1xuICAgICwgVkFMVUVTX0JVRyA9IGZhbHNlXG4gICAgLCBwcm90byAgICAgID0gQmFzZS5wcm90b3R5cGVcbiAgICAsICRuYXRpdmUgICAgPSBwcm90b1tJVEVSQVRPUl0gfHwgcHJvdG9bRkZfSVRFUkFUT1JdIHx8IERFRkFVTFQgJiYgcHJvdG9bREVGQVVMVF1cbiAgICAsICRkZWZhdWx0ICAgPSAkbmF0aXZlIHx8IGdldE1ldGhvZChERUZBVUxUKVxuICAgICwgJGVudHJpZXMgICA9IERFRkFVTFQgPyAhREVGX1ZBTFVFUyA/ICRkZWZhdWx0IDogZ2V0TWV0aG9kKCdlbnRyaWVzJykgOiB1bmRlZmluZWRcbiAgICAsICRhbnlOYXRpdmUgPSBOQU1FID09ICdBcnJheScgPyBwcm90by5lbnRyaWVzIHx8ICRuYXRpdmUgOiAkbmF0aXZlXG4gICAgLCBtZXRob2RzLCBrZXksIEl0ZXJhdG9yUHJvdG90eXBlO1xuICAvLyBGaXggbmF0aXZlXG4gIGlmKCRhbnlOYXRpdmUpe1xuICAgIEl0ZXJhdG9yUHJvdG90eXBlID0gZ2V0UHJvdG90eXBlT2YoJGFueU5hdGl2ZS5jYWxsKG5ldyBCYXNlKSk7XG4gICAgaWYoSXRlcmF0b3JQcm90b3R5cGUgIT09IE9iamVjdC5wcm90b3R5cGUpe1xuICAgICAgLy8gU2V0IEBAdG9TdHJpbmdUYWcgdG8gbmF0aXZlIGl0ZXJhdG9yc1xuICAgICAgc2V0VG9TdHJpbmdUYWcoSXRlcmF0b3JQcm90b3R5cGUsIFRBRywgdHJ1ZSk7XG4gICAgICAvLyBmaXggZm9yIHNvbWUgb2xkIGVuZ2luZXNcbiAgICAgIGlmKCFMSUJSQVJZICYmICFoYXMoSXRlcmF0b3JQcm90b3R5cGUsIElURVJBVE9SKSloaWRlKEl0ZXJhdG9yUHJvdG90eXBlLCBJVEVSQVRPUiwgcmV0dXJuVGhpcyk7XG4gICAgfVxuICB9XG4gIC8vIGZpeCBBcnJheSN7dmFsdWVzLCBAQGl0ZXJhdG9yfS5uYW1lIGluIFY4IC8gRkZcbiAgaWYoREVGX1ZBTFVFUyAmJiAkbmF0aXZlICYmICRuYXRpdmUubmFtZSAhPT0gVkFMVUVTKXtcbiAgICBWQUxVRVNfQlVHID0gdHJ1ZTtcbiAgICAkZGVmYXVsdCA9IGZ1bmN0aW9uIHZhbHVlcygpeyByZXR1cm4gJG5hdGl2ZS5jYWxsKHRoaXMpOyB9O1xuICB9XG4gIC8vIERlZmluZSBpdGVyYXRvclxuICBpZigoIUxJQlJBUlkgfHwgRk9SQ0VEKSAmJiAoQlVHR1kgfHwgVkFMVUVTX0JVRyB8fCAhcHJvdG9bSVRFUkFUT1JdKSl7XG4gICAgaGlkZShwcm90bywgSVRFUkFUT1IsICRkZWZhdWx0KTtcbiAgfVxuICAvLyBQbHVnIGZvciBsaWJyYXJ5XG4gIEl0ZXJhdG9yc1tOQU1FXSA9ICRkZWZhdWx0O1xuICBJdGVyYXRvcnNbVEFHXSAgPSByZXR1cm5UaGlzO1xuICBpZihERUZBVUxUKXtcbiAgICBtZXRob2RzID0ge1xuICAgICAgdmFsdWVzOiAgREVGX1ZBTFVFUyA/ICRkZWZhdWx0IDogZ2V0TWV0aG9kKFZBTFVFUyksXG4gICAgICBrZXlzOiAgICBJU19TRVQgICAgID8gJGRlZmF1bHQgOiBnZXRNZXRob2QoS0VZUyksXG4gICAgICBlbnRyaWVzOiAkZW50cmllc1xuICAgIH07XG4gICAgaWYoRk9SQ0VEKWZvcihrZXkgaW4gbWV0aG9kcyl7XG4gICAgICBpZighKGtleSBpbiBwcm90bykpcmVkZWZpbmUocHJvdG8sIGtleSwgbWV0aG9kc1trZXldKTtcbiAgICB9IGVsc2UgJGV4cG9ydCgkZXhwb3J0LlAgKyAkZXhwb3J0LkYgKiAoQlVHR1kgfHwgVkFMVUVTX0JVRyksIE5BTUUsIG1ldGhvZHMpO1xuICB9XG4gIHJldHVybiBtZXRob2RzO1xufTsiLCJ2YXIgSVRFUkFUT1IgICAgID0gcmVxdWlyZSgnLi9fd2tzJykoJ2l0ZXJhdG9yJylcbiAgLCBTQUZFX0NMT1NJTkcgPSBmYWxzZTtcblxudHJ5IHtcbiAgdmFyIHJpdGVyID0gWzddW0lURVJBVE9SXSgpO1xuICByaXRlclsncmV0dXJuJ10gPSBmdW5jdGlvbigpeyBTQUZFX0NMT1NJTkcgPSB0cnVlOyB9O1xuICBBcnJheS5mcm9tKHJpdGVyLCBmdW5jdGlvbigpeyB0aHJvdyAyOyB9KTtcbn0gY2F0Y2goZSl7IC8qIGVtcHR5ICovIH1cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihleGVjLCBza2lwQ2xvc2luZyl7XG4gIGlmKCFza2lwQ2xvc2luZyAmJiAhU0FGRV9DTE9TSU5HKXJldHVybiBmYWxzZTtcbiAgdmFyIHNhZmUgPSBmYWxzZTtcbiAgdHJ5IHtcbiAgICB2YXIgYXJyICA9IFs3XVxuICAgICAgLCBpdGVyID0gYXJyW0lURVJBVE9SXSgpO1xuICAgIGl0ZXIubmV4dCA9IGZ1bmN0aW9uKCl7IHNhZmUgPSB0cnVlOyB9O1xuICAgIGFycltJVEVSQVRPUl0gPSBmdW5jdGlvbigpeyByZXR1cm4gaXRlcjsgfTtcbiAgICBleGVjKGFycik7XG4gIH0gY2F0Y2goZSl7IC8qIGVtcHR5ICovIH1cbiAgcmV0dXJuIHNhZmU7XG59OyIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oZG9uZSwgdmFsdWUpe1xuICByZXR1cm4ge3ZhbHVlOiB2YWx1ZSwgZG9uZTogISFkb25lfTtcbn07IiwibW9kdWxlLmV4cG9ydHMgPSB7fTsiLCJ2YXIgZ2V0S2V5cyAgID0gcmVxdWlyZSgnLi9fb2JqZWN0LWtleXMnKVxuICAsIHRvSU9iamVjdCA9IHJlcXVpcmUoJy4vX3RvLWlvYmplY3QnKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24ob2JqZWN0LCBlbCl7XG4gIHZhciBPICAgICAgPSB0b0lPYmplY3Qob2JqZWN0KVxuICAgICwga2V5cyAgID0gZ2V0S2V5cyhPKVxuICAgICwgbGVuZ3RoID0ga2V5cy5sZW5ndGhcbiAgICAsIGluZGV4ICA9IDBcbiAgICAsIGtleTtcbiAgd2hpbGUobGVuZ3RoID4gaW5kZXgpaWYoT1trZXkgPSBrZXlzW2luZGV4KytdXSA9PT0gZWwpcmV0dXJuIGtleTtcbn07IiwibW9kdWxlLmV4cG9ydHMgPSBmYWxzZTsiLCIvLyAyMC4yLjIuMTQgTWF0aC5leHBtMSh4KVxubW9kdWxlLmV4cG9ydHMgPSBNYXRoLmV4cG0xIHx8IGZ1bmN0aW9uIGV4cG0xKHgpe1xuICByZXR1cm4gKHggPSAreCkgPT0gMCA/IHggOiB4ID4gLTFlLTYgJiYgeCA8IDFlLTYgPyB4ICsgeCAqIHggLyAyIDogTWF0aC5leHAoeCkgLSAxO1xufTsiLCIvLyAyMC4yLjIuMjAgTWF0aC5sb2cxcCh4KVxubW9kdWxlLmV4cG9ydHMgPSBNYXRoLmxvZzFwIHx8IGZ1bmN0aW9uIGxvZzFwKHgpe1xuICByZXR1cm4gKHggPSAreCkgPiAtMWUtOCAmJiB4IDwgMWUtOCA/IHggLSB4ICogeCAvIDIgOiBNYXRoLmxvZygxICsgeCk7XG59OyIsIi8vIDIwLjIuMi4yOCBNYXRoLnNpZ24oeClcbm1vZHVsZS5leHBvcnRzID0gTWF0aC5zaWduIHx8IGZ1bmN0aW9uIHNpZ24oeCl7XG4gIHJldHVybiAoeCA9ICt4KSA9PSAwIHx8IHggIT0geCA/IHggOiB4IDwgMCA/IC0xIDogMTtcbn07IiwidmFyIE1FVEEgICAgID0gcmVxdWlyZSgnLi9fdWlkJykoJ21ldGEnKVxuICAsIGlzT2JqZWN0ID0gcmVxdWlyZSgnLi9faXMtb2JqZWN0JylcbiAgLCBoYXMgICAgICA9IHJlcXVpcmUoJy4vX2hhcycpXG4gICwgc2V0RGVzYyAgPSByZXF1aXJlKCcuL19vYmplY3QtZHAnKS5mXG4gICwgaWQgICAgICAgPSAwO1xudmFyIGlzRXh0ZW5zaWJsZSA9IE9iamVjdC5pc0V4dGVuc2libGUgfHwgZnVuY3Rpb24oKXtcbiAgcmV0dXJuIHRydWU7XG59O1xudmFyIEZSRUVaRSA9ICFyZXF1aXJlKCcuL19mYWlscycpKGZ1bmN0aW9uKCl7XG4gIHJldHVybiBpc0V4dGVuc2libGUoT2JqZWN0LnByZXZlbnRFeHRlbnNpb25zKHt9KSk7XG59KTtcbnZhciBzZXRNZXRhID0gZnVuY3Rpb24oaXQpe1xuICBzZXREZXNjKGl0LCBNRVRBLCB7dmFsdWU6IHtcbiAgICBpOiAnTycgKyArK2lkLCAvLyBvYmplY3QgSURcbiAgICB3OiB7fSAgICAgICAgICAvLyB3ZWFrIGNvbGxlY3Rpb25zIElEc1xuICB9fSk7XG59O1xudmFyIGZhc3RLZXkgPSBmdW5jdGlvbihpdCwgY3JlYXRlKXtcbiAgLy8gcmV0dXJuIHByaW1pdGl2ZSB3aXRoIHByZWZpeFxuICBpZighaXNPYmplY3QoaXQpKXJldHVybiB0eXBlb2YgaXQgPT0gJ3N5bWJvbCcgPyBpdCA6ICh0eXBlb2YgaXQgPT0gJ3N0cmluZycgPyAnUycgOiAnUCcpICsgaXQ7XG4gIGlmKCFoYXMoaXQsIE1FVEEpKXtcbiAgICAvLyBjYW4ndCBzZXQgbWV0YWRhdGEgdG8gdW5jYXVnaHQgZnJvemVuIG9iamVjdFxuICAgIGlmKCFpc0V4dGVuc2libGUoaXQpKXJldHVybiAnRic7XG4gICAgLy8gbm90IG5lY2Vzc2FyeSB0byBhZGQgbWV0YWRhdGFcbiAgICBpZighY3JlYXRlKXJldHVybiAnRSc7XG4gICAgLy8gYWRkIG1pc3NpbmcgbWV0YWRhdGFcbiAgICBzZXRNZXRhKGl0KTtcbiAgLy8gcmV0dXJuIG9iamVjdCBJRFxuICB9IHJldHVybiBpdFtNRVRBXS5pO1xufTtcbnZhciBnZXRXZWFrID0gZnVuY3Rpb24oaXQsIGNyZWF0ZSl7XG4gIGlmKCFoYXMoaXQsIE1FVEEpKXtcbiAgICAvLyBjYW4ndCBzZXQgbWV0YWRhdGEgdG8gdW5jYXVnaHQgZnJvemVuIG9iamVjdFxuICAgIGlmKCFpc0V4dGVuc2libGUoaXQpKXJldHVybiB0cnVlO1xuICAgIC8vIG5vdCBuZWNlc3NhcnkgdG8gYWRkIG1ldGFkYXRhXG4gICAgaWYoIWNyZWF0ZSlyZXR1cm4gZmFsc2U7XG4gICAgLy8gYWRkIG1pc3NpbmcgbWV0YWRhdGFcbiAgICBzZXRNZXRhKGl0KTtcbiAgLy8gcmV0dXJuIGhhc2ggd2VhayBjb2xsZWN0aW9ucyBJRHNcbiAgfSByZXR1cm4gaXRbTUVUQV0udztcbn07XG4vLyBhZGQgbWV0YWRhdGEgb24gZnJlZXplLWZhbWlseSBtZXRob2RzIGNhbGxpbmdcbnZhciBvbkZyZWV6ZSA9IGZ1bmN0aW9uKGl0KXtcbiAgaWYoRlJFRVpFICYmIG1ldGEuTkVFRCAmJiBpc0V4dGVuc2libGUoaXQpICYmICFoYXMoaXQsIE1FVEEpKXNldE1ldGEoaXQpO1xuICByZXR1cm4gaXQ7XG59O1xudmFyIG1ldGEgPSBtb2R1bGUuZXhwb3J0cyA9IHtcbiAgS0VZOiAgICAgIE1FVEEsXG4gIE5FRUQ6ICAgICBmYWxzZSxcbiAgZmFzdEtleTogIGZhc3RLZXksXG4gIGdldFdlYWs6ICBnZXRXZWFrLFxuICBvbkZyZWV6ZTogb25GcmVlemVcbn07IiwidmFyIE1hcCAgICAgPSByZXF1aXJlKCcuL2VzNi5tYXAnKVxuICAsICRleHBvcnQgPSByZXF1aXJlKCcuL19leHBvcnQnKVxuICAsIHNoYXJlZCAgPSByZXF1aXJlKCcuL19zaGFyZWQnKSgnbWV0YWRhdGEnKVxuICAsIHN0b3JlICAgPSBzaGFyZWQuc3RvcmUgfHwgKHNoYXJlZC5zdG9yZSA9IG5ldyAocmVxdWlyZSgnLi9lczYud2Vhay1tYXAnKSkpO1xuXG52YXIgZ2V0T3JDcmVhdGVNZXRhZGF0YU1hcCA9IGZ1bmN0aW9uKHRhcmdldCwgdGFyZ2V0S2V5LCBjcmVhdGUpe1xuICB2YXIgdGFyZ2V0TWV0YWRhdGEgPSBzdG9yZS5nZXQodGFyZ2V0KTtcbiAgaWYoIXRhcmdldE1ldGFkYXRhKXtcbiAgICBpZighY3JlYXRlKXJldHVybiB1bmRlZmluZWQ7XG4gICAgc3RvcmUuc2V0KHRhcmdldCwgdGFyZ2V0TWV0YWRhdGEgPSBuZXcgTWFwKTtcbiAgfVxuICB2YXIga2V5TWV0YWRhdGEgPSB0YXJnZXRNZXRhZGF0YS5nZXQodGFyZ2V0S2V5KTtcbiAgaWYoIWtleU1ldGFkYXRhKXtcbiAgICBpZighY3JlYXRlKXJldHVybiB1bmRlZmluZWQ7XG4gICAgdGFyZ2V0TWV0YWRhdGEuc2V0KHRhcmdldEtleSwga2V5TWV0YWRhdGEgPSBuZXcgTWFwKTtcbiAgfSByZXR1cm4ga2V5TWV0YWRhdGE7XG59O1xudmFyIG9yZGluYXJ5SGFzT3duTWV0YWRhdGEgPSBmdW5jdGlvbihNZXRhZGF0YUtleSwgTywgUCl7XG4gIHZhciBtZXRhZGF0YU1hcCA9IGdldE9yQ3JlYXRlTWV0YWRhdGFNYXAoTywgUCwgZmFsc2UpO1xuICByZXR1cm4gbWV0YWRhdGFNYXAgPT09IHVuZGVmaW5lZCA/IGZhbHNlIDogbWV0YWRhdGFNYXAuaGFzKE1ldGFkYXRhS2V5KTtcbn07XG52YXIgb3JkaW5hcnlHZXRPd25NZXRhZGF0YSA9IGZ1bmN0aW9uKE1ldGFkYXRhS2V5LCBPLCBQKXtcbiAgdmFyIG1ldGFkYXRhTWFwID0gZ2V0T3JDcmVhdGVNZXRhZGF0YU1hcChPLCBQLCBmYWxzZSk7XG4gIHJldHVybiBtZXRhZGF0YU1hcCA9PT0gdW5kZWZpbmVkID8gdW5kZWZpbmVkIDogbWV0YWRhdGFNYXAuZ2V0KE1ldGFkYXRhS2V5KTtcbn07XG52YXIgb3JkaW5hcnlEZWZpbmVPd25NZXRhZGF0YSA9IGZ1bmN0aW9uKE1ldGFkYXRhS2V5LCBNZXRhZGF0YVZhbHVlLCBPLCBQKXtcbiAgZ2V0T3JDcmVhdGVNZXRhZGF0YU1hcChPLCBQLCB0cnVlKS5zZXQoTWV0YWRhdGFLZXksIE1ldGFkYXRhVmFsdWUpO1xufTtcbnZhciBvcmRpbmFyeU93bk1ldGFkYXRhS2V5cyA9IGZ1bmN0aW9uKHRhcmdldCwgdGFyZ2V0S2V5KXtcbiAgdmFyIG1ldGFkYXRhTWFwID0gZ2V0T3JDcmVhdGVNZXRhZGF0YU1hcCh0YXJnZXQsIHRhcmdldEtleSwgZmFsc2UpXG4gICAgLCBrZXlzICAgICAgICA9IFtdO1xuICBpZihtZXRhZGF0YU1hcCltZXRhZGF0YU1hcC5mb3JFYWNoKGZ1bmN0aW9uKF8sIGtleSl7IGtleXMucHVzaChrZXkpOyB9KTtcbiAgcmV0dXJuIGtleXM7XG59O1xudmFyIHRvTWV0YUtleSA9IGZ1bmN0aW9uKGl0KXtcbiAgcmV0dXJuIGl0ID09PSB1bmRlZmluZWQgfHwgdHlwZW9mIGl0ID09ICdzeW1ib2wnID8gaXQgOiBTdHJpbmcoaXQpO1xufTtcbnZhciBleHAgPSBmdW5jdGlvbihPKXtcbiAgJGV4cG9ydCgkZXhwb3J0LlMsICdSZWZsZWN0JywgTyk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgc3RvcmU6IHN0b3JlLFxuICBtYXA6IGdldE9yQ3JlYXRlTWV0YWRhdGFNYXAsXG4gIGhhczogb3JkaW5hcnlIYXNPd25NZXRhZGF0YSxcbiAgZ2V0OiBvcmRpbmFyeUdldE93bk1ldGFkYXRhLFxuICBzZXQ6IG9yZGluYXJ5RGVmaW5lT3duTWV0YWRhdGEsXG4gIGtleXM6IG9yZGluYXJ5T3duTWV0YWRhdGFLZXlzLFxuICBrZXk6IHRvTWV0YUtleSxcbiAgZXhwOiBleHBcbn07IiwidmFyIGdsb2JhbCAgICA9IHJlcXVpcmUoJy4vX2dsb2JhbCcpXG4gICwgbWFjcm90YXNrID0gcmVxdWlyZSgnLi9fdGFzaycpLnNldFxuICAsIE9ic2VydmVyICA9IGdsb2JhbC5NdXRhdGlvbk9ic2VydmVyIHx8IGdsb2JhbC5XZWJLaXRNdXRhdGlvbk9ic2VydmVyXG4gICwgcHJvY2VzcyAgID0gZ2xvYmFsLnByb2Nlc3NcbiAgLCBQcm9taXNlICAgPSBnbG9iYWwuUHJvbWlzZVxuICAsIGlzTm9kZSAgICA9IHJlcXVpcmUoJy4vX2NvZicpKHByb2Nlc3MpID09ICdwcm9jZXNzJ1xuICAsIGhlYWQsIGxhc3QsIG5vdGlmeTtcblxudmFyIGZsdXNoID0gZnVuY3Rpb24oKXtcbiAgdmFyIHBhcmVudCwgZm47XG4gIGlmKGlzTm9kZSAmJiAocGFyZW50ID0gcHJvY2Vzcy5kb21haW4pKXBhcmVudC5leGl0KCk7XG4gIHdoaWxlKGhlYWQpe1xuICAgIGZuID0gaGVhZC5mbjtcbiAgICBmbigpOyAvLyA8LSBjdXJyZW50bHkgd2UgdXNlIGl0IG9ubHkgZm9yIFByb21pc2UgLSB0cnkgLyBjYXRjaCBub3QgcmVxdWlyZWRcbiAgICBoZWFkID0gaGVhZC5uZXh0O1xuICB9IGxhc3QgPSB1bmRlZmluZWQ7XG4gIGlmKHBhcmVudClwYXJlbnQuZW50ZXIoKTtcbn07XG5cbi8vIE5vZGUuanNcbmlmKGlzTm9kZSl7XG4gIG5vdGlmeSA9IGZ1bmN0aW9uKCl7XG4gICAgcHJvY2Vzcy5uZXh0VGljayhmbHVzaCk7XG4gIH07XG4vLyBicm93c2VycyB3aXRoIE11dGF0aW9uT2JzZXJ2ZXJcbn0gZWxzZSBpZihPYnNlcnZlcil7XG4gIHZhciB0b2dnbGUgPSB0cnVlXG4gICAgLCBub2RlICAgPSBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZSgnJyk7XG4gIG5ldyBPYnNlcnZlcihmbHVzaCkub2JzZXJ2ZShub2RlLCB7Y2hhcmFjdGVyRGF0YTogdHJ1ZX0pOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLW5ld1xuICBub3RpZnkgPSBmdW5jdGlvbigpe1xuICAgIG5vZGUuZGF0YSA9IHRvZ2dsZSA9ICF0b2dnbGU7XG4gIH07XG4vLyBlbnZpcm9ubWVudHMgd2l0aCBtYXliZSBub24tY29tcGxldGVseSBjb3JyZWN0LCBidXQgZXhpc3RlbnQgUHJvbWlzZVxufSBlbHNlIGlmKFByb21pc2UgJiYgUHJvbWlzZS5yZXNvbHZlKXtcbiAgbm90aWZ5ID0gZnVuY3Rpb24oKXtcbiAgICBQcm9taXNlLnJlc29sdmUoKS50aGVuKGZsdXNoKTtcbiAgfTtcbi8vIGZvciBvdGhlciBlbnZpcm9ubWVudHMgLSBtYWNyb3Rhc2sgYmFzZWQgb246XG4vLyAtIHNldEltbWVkaWF0ZVxuLy8gLSBNZXNzYWdlQ2hhbm5lbFxuLy8gLSB3aW5kb3cucG9zdE1lc3NhZ1xuLy8gLSBvbnJlYWR5c3RhdGVjaGFuZ2Vcbi8vIC0gc2V0VGltZW91dFxufSBlbHNlIHtcbiAgbm90aWZ5ID0gZnVuY3Rpb24oKXtcbiAgICAvLyBzdHJhbmdlIElFICsgd2VicGFjayBkZXYgc2VydmVyIGJ1ZyAtIHVzZSAuY2FsbChnbG9iYWwpXG4gICAgbWFjcm90YXNrLmNhbGwoZ2xvYmFsLCBmbHVzaCk7XG4gIH07XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oZm4pe1xuICB2YXIgdGFzayA9IHtmbjogZm4sIG5leHQ6IHVuZGVmaW5lZH07XG4gIGlmKGxhc3QpbGFzdC5uZXh0ID0gdGFzaztcbiAgaWYoIWhlYWQpe1xuICAgIGhlYWQgPSB0YXNrO1xuICAgIG5vdGlmeSgpO1xuICB9IGxhc3QgPSB0YXNrO1xufTsiLCIndXNlIHN0cmljdCc7XG4vLyAxOS4xLjIuMSBPYmplY3QuYXNzaWduKHRhcmdldCwgc291cmNlLCAuLi4pXG52YXIgZ2V0S2V5cyAgPSByZXF1aXJlKCcuL19vYmplY3Qta2V5cycpXG4gICwgZ09QUyAgICAgPSByZXF1aXJlKCcuL19vYmplY3QtZ29wcycpXG4gICwgcElFICAgICAgPSByZXF1aXJlKCcuL19vYmplY3QtcGllJylcbiAgLCB0b09iamVjdCA9IHJlcXVpcmUoJy4vX3RvLW9iamVjdCcpXG4gICwgSU9iamVjdCAgPSByZXF1aXJlKCcuL19pb2JqZWN0JylcbiAgLCAkYXNzaWduICA9IE9iamVjdC5hc3NpZ247XG5cbi8vIHNob3VsZCB3b3JrIHdpdGggc3ltYm9scyBhbmQgc2hvdWxkIGhhdmUgZGV0ZXJtaW5pc3RpYyBwcm9wZXJ0eSBvcmRlciAoVjggYnVnKVxubW9kdWxlLmV4cG9ydHMgPSAhJGFzc2lnbiB8fCByZXF1aXJlKCcuL19mYWlscycpKGZ1bmN0aW9uKCl7XG4gIHZhciBBID0ge31cbiAgICAsIEIgPSB7fVxuICAgICwgUyA9IFN5bWJvbCgpXG4gICAgLCBLID0gJ2FiY2RlZmdoaWprbG1ub3BxcnN0JztcbiAgQVtTXSA9IDc7XG4gIEsuc3BsaXQoJycpLmZvckVhY2goZnVuY3Rpb24oayl7IEJba10gPSBrOyB9KTtcbiAgcmV0dXJuICRhc3NpZ24oe30sIEEpW1NdICE9IDcgfHwgT2JqZWN0LmtleXMoJGFzc2lnbih7fSwgQikpLmpvaW4oJycpICE9IEs7XG59KSA/IGZ1bmN0aW9uIGFzc2lnbih0YXJnZXQsIHNvdXJjZSl7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW51c2VkLXZhcnNcbiAgdmFyIFQgICAgID0gdG9PYmplY3QodGFyZ2V0KVxuICAgICwgYUxlbiAgPSBhcmd1bWVudHMubGVuZ3RoXG4gICAgLCBpbmRleCA9IDFcbiAgICAsIGdldFN5bWJvbHMgPSBnT1BTLmZcbiAgICAsIGlzRW51bSAgICAgPSBwSUUuZjtcbiAgd2hpbGUoYUxlbiA+IGluZGV4KXtcbiAgICB2YXIgUyAgICAgID0gSU9iamVjdChhcmd1bWVudHNbaW5kZXgrK10pXG4gICAgICAsIGtleXMgICA9IGdldFN5bWJvbHMgPyBnZXRLZXlzKFMpLmNvbmNhdChnZXRTeW1ib2xzKFMpKSA6IGdldEtleXMoUylcbiAgICAgICwgbGVuZ3RoID0ga2V5cy5sZW5ndGhcbiAgICAgICwgaiAgICAgID0gMFxuICAgICAgLCBrZXk7XG4gICAgd2hpbGUobGVuZ3RoID4gailpZihpc0VudW0uY2FsbChTLCBrZXkgPSBrZXlzW2orK10pKVRba2V5XSA9IFNba2V5XTtcbiAgfSByZXR1cm4gVDtcbn0gOiAkYXNzaWduOyIsIi8vIDE5LjEuMi4yIC8gMTUuMi4zLjUgT2JqZWN0LmNyZWF0ZShPIFssIFByb3BlcnRpZXNdKVxyXG52YXIgYW5PYmplY3QgICAgPSByZXF1aXJlKCcuL19hbi1vYmplY3QnKVxyXG4gICwgZFBzICAgICAgICAgPSByZXF1aXJlKCcuL19vYmplY3QtZHBzJylcclxuICAsIGVudW1CdWdLZXlzID0gcmVxdWlyZSgnLi9fZW51bS1idWcta2V5cycpXHJcbiAgLCBJRV9QUk9UTyAgICA9IHJlcXVpcmUoJy4vX3NoYXJlZC1rZXknKSgnSUVfUFJPVE8nKVxyXG4gICwgRW1wdHkgICAgICAgPSBmdW5jdGlvbigpeyAvKiBlbXB0eSAqLyB9XHJcbiAgLCBQUk9UT1RZUEUgICA9ICdwcm90b3R5cGUnO1xyXG5cclxuLy8gQ3JlYXRlIG9iamVjdCB3aXRoIGZha2UgYG51bGxgIHByb3RvdHlwZTogdXNlIGlmcmFtZSBPYmplY3Qgd2l0aCBjbGVhcmVkIHByb3RvdHlwZVxyXG52YXIgY3JlYXRlRGljdCA9IGZ1bmN0aW9uKCl7XHJcbiAgLy8gVGhyYXNoLCB3YXN0ZSBhbmQgc29kb215OiBJRSBHQyBidWdcclxuICB2YXIgaWZyYW1lID0gcmVxdWlyZSgnLi9fZG9tLWNyZWF0ZScpKCdpZnJhbWUnKVxyXG4gICAgLCBpICAgICAgPSBlbnVtQnVnS2V5cy5sZW5ndGhcclxuICAgICwgZ3QgICAgID0gJz4nXHJcbiAgICAsIGlmcmFtZURvY3VtZW50O1xyXG4gIGlmcmFtZS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xyXG4gIHJlcXVpcmUoJy4vX2h0bWwnKS5hcHBlbmRDaGlsZChpZnJhbWUpO1xyXG4gIGlmcmFtZS5zcmMgPSAnamF2YXNjcmlwdDonOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXNjcmlwdC11cmxcclxuICAvLyBjcmVhdGVEaWN0ID0gaWZyYW1lLmNvbnRlbnRXaW5kb3cuT2JqZWN0O1xyXG4gIC8vIGh0bWwucmVtb3ZlQ2hpbGQoaWZyYW1lKTtcclxuICBpZnJhbWVEb2N1bWVudCA9IGlmcmFtZS5jb250ZW50V2luZG93LmRvY3VtZW50O1xyXG4gIGlmcmFtZURvY3VtZW50Lm9wZW4oKTtcclxuICBpZnJhbWVEb2N1bWVudC53cml0ZSgnPHNjcmlwdD5kb2N1bWVudC5GPU9iamVjdDwvc2NyaXB0JyArIGd0KTtcclxuICBpZnJhbWVEb2N1bWVudC5jbG9zZSgpO1xyXG4gIGNyZWF0ZURpY3QgPSBpZnJhbWVEb2N1bWVudC5GO1xyXG4gIHdoaWxlKGktLSlkZWxldGUgY3JlYXRlRGljdFtQUk9UT1RZUEVdW2VudW1CdWdLZXlzW2ldXTtcclxuICByZXR1cm4gY3JlYXRlRGljdCgpO1xyXG59O1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBPYmplY3QuY3JlYXRlIHx8IGZ1bmN0aW9uIGNyZWF0ZShPLCBQcm9wZXJ0aWVzKXtcclxuICB2YXIgcmVzdWx0O1xyXG4gIGlmKE8gIT09IG51bGwpe1xyXG4gICAgRW1wdHlbUFJPVE9UWVBFXSA9IGFuT2JqZWN0KE8pO1xyXG4gICAgcmVzdWx0ID0gbmV3IEVtcHR5O1xyXG4gICAgRW1wdHlbUFJPVE9UWVBFXSA9IG51bGw7XHJcbiAgICAvLyBhZGQgXCJfX3Byb3RvX19cIiBmb3IgT2JqZWN0LmdldFByb3RvdHlwZU9mIHBvbHlmaWxsXHJcbiAgICByZXN1bHRbSUVfUFJPVE9dID0gTztcclxuICB9IGVsc2UgcmVzdWx0ID0gY3JlYXRlRGljdCgpO1xyXG4gIHJldHVybiBQcm9wZXJ0aWVzID09PSB1bmRlZmluZWQgPyByZXN1bHQgOiBkUHMocmVzdWx0LCBQcm9wZXJ0aWVzKTtcclxufTsiLCJ2YXIgYW5PYmplY3QgICAgICAgPSByZXF1aXJlKCcuL19hbi1vYmplY3QnKVxuICAsIElFOF9ET01fREVGSU5FID0gcmVxdWlyZSgnLi9faWU4LWRvbS1kZWZpbmUnKVxuICAsIHRvUHJpbWl0aXZlICAgID0gcmVxdWlyZSgnLi9fdG8tcHJpbWl0aXZlJylcbiAgLCBkUCAgICAgICAgICAgICA9IE9iamVjdC5kZWZpbmVQcm9wZXJ0eTtcblxuZXhwb3J0cy5mID0gcmVxdWlyZSgnLi9fZGVzY3JpcHRvcnMnKSA/IE9iamVjdC5kZWZpbmVQcm9wZXJ0eSA6IGZ1bmN0aW9uIGRlZmluZVByb3BlcnR5KE8sIFAsIEF0dHJpYnV0ZXMpe1xuICBhbk9iamVjdChPKTtcbiAgUCA9IHRvUHJpbWl0aXZlKFAsIHRydWUpO1xuICBhbk9iamVjdChBdHRyaWJ1dGVzKTtcbiAgaWYoSUU4X0RPTV9ERUZJTkUpdHJ5IHtcbiAgICByZXR1cm4gZFAoTywgUCwgQXR0cmlidXRlcyk7XG4gIH0gY2F0Y2goZSl7IC8qIGVtcHR5ICovIH1cbiAgaWYoJ2dldCcgaW4gQXR0cmlidXRlcyB8fCAnc2V0JyBpbiBBdHRyaWJ1dGVzKXRocm93IFR5cGVFcnJvcignQWNjZXNzb3JzIG5vdCBzdXBwb3J0ZWQhJyk7XG4gIGlmKCd2YWx1ZScgaW4gQXR0cmlidXRlcylPW1BdID0gQXR0cmlidXRlcy52YWx1ZTtcbiAgcmV0dXJuIE87XG59OyIsInZhciBkUCAgICAgICA9IHJlcXVpcmUoJy4vX29iamVjdC1kcCcpXHJcbiAgLCBhbk9iamVjdCA9IHJlcXVpcmUoJy4vX2FuLW9iamVjdCcpXHJcbiAgLCBnZXRLZXlzICA9IHJlcXVpcmUoJy4vX29iamVjdC1rZXlzJyk7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vX2Rlc2NyaXB0b3JzJykgPyBPYmplY3QuZGVmaW5lUHJvcGVydGllcyA6IGZ1bmN0aW9uIGRlZmluZVByb3BlcnRpZXMoTywgUHJvcGVydGllcyl7XHJcbiAgYW5PYmplY3QoTyk7XHJcbiAgdmFyIGtleXMgICA9IGdldEtleXMoUHJvcGVydGllcylcclxuICAgICwgbGVuZ3RoID0ga2V5cy5sZW5ndGhcclxuICAgICwgaSA9IDBcclxuICAgICwgUDtcclxuICB3aGlsZShsZW5ndGggPiBpKWRQLmYoTywgUCA9IGtleXNbaSsrXSwgUHJvcGVydGllc1tQXSk7XHJcbiAgcmV0dXJuIE87XHJcbn07IiwiLy8gRm9yY2VkIHJlcGxhY2VtZW50IHByb3RvdHlwZSBhY2Nlc3NvcnMgbWV0aG9kc1xyXG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vX2xpYnJhcnknKXx8ICFyZXF1aXJlKCcuL19mYWlscycpKGZ1bmN0aW9uKCl7XHJcbiAgdmFyIEsgPSBNYXRoLnJhbmRvbSgpO1xyXG4gIC8vIEluIEZGIHRocm93cyBvbmx5IGRlZmluZSBtZXRob2RzXHJcbiAgX19kZWZpbmVTZXR0ZXJfXy5jYWxsKG51bGwsIEssIGZ1bmN0aW9uKCl7IC8qIGVtcHR5ICovfSk7XHJcbiAgZGVsZXRlIHJlcXVpcmUoJy4vX2dsb2JhbCcpW0tdO1xyXG59KTsiLCJ2YXIgcElFICAgICAgICAgICAgPSByZXF1aXJlKCcuL19vYmplY3QtcGllJylcclxuICAsIGNyZWF0ZURlc2MgICAgID0gcmVxdWlyZSgnLi9fcHJvcGVydHktZGVzYycpXHJcbiAgLCB0b0lPYmplY3QgICAgICA9IHJlcXVpcmUoJy4vX3RvLWlvYmplY3QnKVxyXG4gICwgdG9QcmltaXRpdmUgICAgPSByZXF1aXJlKCcuL190by1wcmltaXRpdmUnKVxyXG4gICwgaGFzICAgICAgICAgICAgPSByZXF1aXJlKCcuL19oYXMnKVxyXG4gICwgSUU4X0RPTV9ERUZJTkUgPSByZXF1aXJlKCcuL19pZTgtZG9tLWRlZmluZScpXHJcbiAgLCBnT1BEICAgICAgICAgICA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3I7XHJcblxyXG5leHBvcnRzLmYgPSByZXF1aXJlKCcuL19kZXNjcmlwdG9ycycpID8gZ09QRCA6IGZ1bmN0aW9uIGdldE93blByb3BlcnR5RGVzY3JpcHRvcihPLCBQKXtcclxuICBPID0gdG9JT2JqZWN0KE8pO1xyXG4gIFAgPSB0b1ByaW1pdGl2ZShQLCB0cnVlKTtcclxuICBpZihJRThfRE9NX0RFRklORSl0cnkge1xyXG4gICAgcmV0dXJuIGdPUEQoTywgUCk7XHJcbiAgfSBjYXRjaChlKXsgLyogZW1wdHkgKi8gfVxyXG4gIGlmKGhhcyhPLCBQKSlyZXR1cm4gY3JlYXRlRGVzYyghcElFLmYuY2FsbChPLCBQKSwgT1tQXSk7XHJcbn07IiwiLy8gZmFsbGJhY2sgZm9yIElFMTEgYnVnZ3kgT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMgd2l0aCBpZnJhbWUgYW5kIHdpbmRvd1xudmFyIHRvSU9iamVjdCA9IHJlcXVpcmUoJy4vX3RvLWlvYmplY3QnKVxuICAsIGdPUE4gICAgICA9IHJlcXVpcmUoJy4vX29iamVjdC1nb3BuJykuZlxuICAsIHRvU3RyaW5nICA9IHt9LnRvU3RyaW5nO1xuXG52YXIgd2luZG93TmFtZXMgPSB0eXBlb2Ygd2luZG93ID09ICdvYmplY3QnICYmIHdpbmRvdyAmJiBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lc1xuICA/IE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKHdpbmRvdykgOiBbXTtcblxudmFyIGdldFdpbmRvd05hbWVzID0gZnVuY3Rpb24oaXQpe1xuICB0cnkge1xuICAgIHJldHVybiBnT1BOKGl0KTtcbiAgfSBjYXRjaChlKXtcbiAgICByZXR1cm4gd2luZG93TmFtZXMuc2xpY2UoKTtcbiAgfVxufTtcblxubW9kdWxlLmV4cG9ydHMuZiA9IGZ1bmN0aW9uIGdldE93blByb3BlcnR5TmFtZXMoaXQpe1xuICByZXR1cm4gd2luZG93TmFtZXMgJiYgdG9TdHJpbmcuY2FsbChpdCkgPT0gJ1tvYmplY3QgV2luZG93XScgPyBnZXRXaW5kb3dOYW1lcyhpdCkgOiBnT1BOKHRvSU9iamVjdChpdCkpO1xufTtcbiIsIi8vIDE5LjEuMi43IC8gMTUuMi4zLjQgT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMoTylcclxudmFyICRrZXlzICAgICAgPSByZXF1aXJlKCcuL19vYmplY3Qta2V5cy1pbnRlcm5hbCcpXHJcbiAgLCBoaWRkZW5LZXlzID0gcmVxdWlyZSgnLi9fZW51bS1idWcta2V5cycpLmNvbmNhdCgnbGVuZ3RoJywgJ3Byb3RvdHlwZScpO1xyXG5cclxuZXhwb3J0cy5mID0gT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMgfHwgZnVuY3Rpb24gZ2V0T3duUHJvcGVydHlOYW1lcyhPKXtcclxuICByZXR1cm4gJGtleXMoTywgaGlkZGVuS2V5cyk7XHJcbn07IiwiZXhwb3J0cy5mID0gT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9sczsiLCIvLyAxOS4xLjIuOSAvIDE1LjIuMy4yIE9iamVjdC5nZXRQcm90b3R5cGVPZihPKVxyXG52YXIgaGFzICAgICAgICAgPSByZXF1aXJlKCcuL19oYXMnKVxyXG4gICwgdG9PYmplY3QgICAgPSByZXF1aXJlKCcuL190by1vYmplY3QnKVxyXG4gICwgSUVfUFJPVE8gICAgPSByZXF1aXJlKCcuL19zaGFyZWQta2V5JykoJ0lFX1BST1RPJylcclxuICAsIE9iamVjdFByb3RvID0gT2JqZWN0LnByb3RvdHlwZTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gT2JqZWN0LmdldFByb3RvdHlwZU9mIHx8IGZ1bmN0aW9uKE8pe1xyXG4gIE8gPSB0b09iamVjdChPKTtcclxuICBpZihoYXMoTywgSUVfUFJPVE8pKXJldHVybiBPW0lFX1BST1RPXTtcclxuICBpZih0eXBlb2YgTy5jb25zdHJ1Y3RvciA9PSAnZnVuY3Rpb24nICYmIE8gaW5zdGFuY2VvZiBPLmNvbnN0cnVjdG9yKXtcclxuICAgIHJldHVybiBPLmNvbnN0cnVjdG9yLnByb3RvdHlwZTtcclxuICB9IHJldHVybiBPIGluc3RhbmNlb2YgT2JqZWN0ID8gT2JqZWN0UHJvdG8gOiBudWxsO1xyXG59OyIsInZhciBoYXMgICAgICAgICAgPSByZXF1aXJlKCcuL19oYXMnKVxyXG4gICwgdG9JT2JqZWN0ICAgID0gcmVxdWlyZSgnLi9fdG8taW9iamVjdCcpXHJcbiAgLCBhcnJheUluZGV4T2YgPSByZXF1aXJlKCcuL19hcnJheS1pbmNsdWRlcycpKGZhbHNlKVxyXG4gICwgSUVfUFJPVE8gICAgID0gcmVxdWlyZSgnLi9fc2hhcmVkLWtleScpKCdJRV9QUk9UTycpO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihvYmplY3QsIG5hbWVzKXtcclxuICB2YXIgTyAgICAgID0gdG9JT2JqZWN0KG9iamVjdClcclxuICAgICwgaSAgICAgID0gMFxyXG4gICAgLCByZXN1bHQgPSBbXVxyXG4gICAgLCBrZXk7XHJcbiAgZm9yKGtleSBpbiBPKWlmKGtleSAhPSBJRV9QUk9UTyloYXMoTywga2V5KSAmJiByZXN1bHQucHVzaChrZXkpO1xyXG4gIC8vIERvbid0IGVudW0gYnVnICYgaGlkZGVuIGtleXNcclxuICB3aGlsZShuYW1lcy5sZW5ndGggPiBpKWlmKGhhcyhPLCBrZXkgPSBuYW1lc1tpKytdKSl7XHJcbiAgICB+YXJyYXlJbmRleE9mKHJlc3VsdCwga2V5KSB8fCByZXN1bHQucHVzaChrZXkpO1xyXG4gIH1cclxuICByZXR1cm4gcmVzdWx0O1xyXG59OyIsIi8vIDE5LjEuMi4xNCAvIDE1LjIuMy4xNCBPYmplY3Qua2V5cyhPKVxyXG52YXIgJGtleXMgICAgICAgPSByZXF1aXJlKCcuL19vYmplY3Qta2V5cy1pbnRlcm5hbCcpXHJcbiAgLCBlbnVtQnVnS2V5cyA9IHJlcXVpcmUoJy4vX2VudW0tYnVnLWtleXMnKTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gT2JqZWN0LmtleXMgfHwgZnVuY3Rpb24ga2V5cyhPKXtcclxuICByZXR1cm4gJGtleXMoTywgZW51bUJ1Z0tleXMpO1xyXG59OyIsImV4cG9ydHMuZiA9IHt9LnByb3BlcnR5SXNFbnVtZXJhYmxlOyIsIi8vIG1vc3QgT2JqZWN0IG1ldGhvZHMgYnkgRVM2IHNob3VsZCBhY2NlcHQgcHJpbWl0aXZlc1xudmFyICRleHBvcnQgPSByZXF1aXJlKCcuL19leHBvcnQnKVxuICAsIGNvcmUgICAgPSByZXF1aXJlKCcuL19jb3JlJylcbiAgLCBmYWlscyAgID0gcmVxdWlyZSgnLi9fZmFpbHMnKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oS0VZLCBleGVjKXtcbiAgdmFyIGZuICA9IChjb3JlLk9iamVjdCB8fCB7fSlbS0VZXSB8fCBPYmplY3RbS0VZXVxuICAgICwgZXhwID0ge307XG4gIGV4cFtLRVldID0gZXhlYyhmbik7XG4gICRleHBvcnQoJGV4cG9ydC5TICsgJGV4cG9ydC5GICogZmFpbHMoZnVuY3Rpb24oKXsgZm4oMSk7IH0pLCAnT2JqZWN0JywgZXhwKTtcbn07IiwidmFyIGdldEtleXMgICA9IHJlcXVpcmUoJy4vX29iamVjdC1rZXlzJylcbiAgLCB0b0lPYmplY3QgPSByZXF1aXJlKCcuL190by1pb2JqZWN0JylcbiAgLCBpc0VudW0gICAgPSByZXF1aXJlKCcuL19vYmplY3QtcGllJykuZjtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oaXNFbnRyaWVzKXtcbiAgcmV0dXJuIGZ1bmN0aW9uKGl0KXtcbiAgICB2YXIgTyAgICAgID0gdG9JT2JqZWN0KGl0KVxuICAgICAgLCBrZXlzICAgPSBnZXRLZXlzKE8pXG4gICAgICAsIGxlbmd0aCA9IGtleXMubGVuZ3RoXG4gICAgICAsIGkgICAgICA9IDBcbiAgICAgICwgcmVzdWx0ID0gW11cbiAgICAgICwga2V5O1xuICAgIHdoaWxlKGxlbmd0aCA+IGkpaWYoaXNFbnVtLmNhbGwoTywga2V5ID0ga2V5c1tpKytdKSl7XG4gICAgICByZXN1bHQucHVzaChpc0VudHJpZXMgPyBba2V5LCBPW2tleV1dIDogT1trZXldKTtcbiAgICB9IHJldHVybiByZXN1bHQ7XG4gIH07XG59OyIsIi8vIGFsbCBvYmplY3Qga2V5cywgaW5jbHVkZXMgbm9uLWVudW1lcmFibGUgYW5kIHN5bWJvbHNcbnZhciBnT1BOICAgICA9IHJlcXVpcmUoJy4vX29iamVjdC1nb3BuJylcbiAgLCBnT1BTICAgICA9IHJlcXVpcmUoJy4vX29iamVjdC1nb3BzJylcbiAgLCBhbk9iamVjdCA9IHJlcXVpcmUoJy4vX2FuLW9iamVjdCcpXG4gICwgUmVmbGVjdCAgPSByZXF1aXJlKCcuL19nbG9iYWwnKS5SZWZsZWN0O1xubW9kdWxlLmV4cG9ydHMgPSBSZWZsZWN0ICYmIFJlZmxlY3Qub3duS2V5cyB8fCBmdW5jdGlvbiBvd25LZXlzKGl0KXtcbiAgdmFyIGtleXMgICAgICAgPSBnT1BOLmYoYW5PYmplY3QoaXQpKVxuICAgICwgZ2V0U3ltYm9scyA9IGdPUFMuZjtcbiAgcmV0dXJuIGdldFN5bWJvbHMgPyBrZXlzLmNvbmNhdChnZXRTeW1ib2xzKGl0KSkgOiBrZXlzO1xufTsiLCJ2YXIgJHBhcnNlRmxvYXQgPSByZXF1aXJlKCcuL19nbG9iYWwnKS5wYXJzZUZsb2F0XG4gICwgJHRyaW0gICAgICAgPSByZXF1aXJlKCcuL19zdHJpbmctdHJpbScpLnRyaW07XG5cbm1vZHVsZS5leHBvcnRzID0gMSAvICRwYXJzZUZsb2F0KHJlcXVpcmUoJy4vX3N0cmluZy13cycpICsgJy0wJykgIT09IC1JbmZpbml0eSA/IGZ1bmN0aW9uIHBhcnNlRmxvYXQoc3RyKXtcbiAgdmFyIHN0cmluZyA9ICR0cmltKFN0cmluZyhzdHIpLCAzKVxuICAgICwgcmVzdWx0ID0gJHBhcnNlRmxvYXQoc3RyaW5nKTtcbiAgcmV0dXJuIHJlc3VsdCA9PT0gMCAmJiBzdHJpbmcuY2hhckF0KDApID09ICctJyA/IC0wIDogcmVzdWx0O1xufSA6ICRwYXJzZUZsb2F0OyIsInZhciAkcGFyc2VJbnQgPSByZXF1aXJlKCcuL19nbG9iYWwnKS5wYXJzZUludFxuICAsICR0cmltICAgICA9IHJlcXVpcmUoJy4vX3N0cmluZy10cmltJykudHJpbVxuICAsIHdzICAgICAgICA9IHJlcXVpcmUoJy4vX3N0cmluZy13cycpXG4gICwgaGV4ICAgICAgID0gL15bXFwtK10/MFt4WF0vO1xuXG5tb2R1bGUuZXhwb3J0cyA9ICRwYXJzZUludCh3cyArICcwOCcpICE9PSA4IHx8ICRwYXJzZUludCh3cyArICcweDE2JykgIT09IDIyID8gZnVuY3Rpb24gcGFyc2VJbnQoc3RyLCByYWRpeCl7XG4gIHZhciBzdHJpbmcgPSAkdHJpbShTdHJpbmcoc3RyKSwgMyk7XG4gIHJldHVybiAkcGFyc2VJbnQoc3RyaW5nLCAocmFkaXggPj4+IDApIHx8IChoZXgudGVzdChzdHJpbmcpID8gMTYgOiAxMCkpO1xufSA6ICRwYXJzZUludDsiLCIndXNlIHN0cmljdCc7XG52YXIgcGF0aCAgICAgID0gcmVxdWlyZSgnLi9fcGF0aCcpXG4gICwgaW52b2tlICAgID0gcmVxdWlyZSgnLi9faW52b2tlJylcbiAgLCBhRnVuY3Rpb24gPSByZXF1aXJlKCcuL19hLWZ1bmN0aW9uJyk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKC8qIC4uLnBhcmdzICovKXtcbiAgdmFyIGZuICAgICA9IGFGdW5jdGlvbih0aGlzKVxuICAgICwgbGVuZ3RoID0gYXJndW1lbnRzLmxlbmd0aFxuICAgICwgcGFyZ3MgID0gQXJyYXkobGVuZ3RoKVxuICAgICwgaSAgICAgID0gMFxuICAgICwgXyAgICAgID0gcGF0aC5fXG4gICAgLCBob2xkZXIgPSBmYWxzZTtcbiAgd2hpbGUobGVuZ3RoID4gaSlpZigocGFyZ3NbaV0gPSBhcmd1bWVudHNbaSsrXSkgPT09IF8paG9sZGVyID0gdHJ1ZTtcbiAgcmV0dXJuIGZ1bmN0aW9uKC8qIC4uLmFyZ3MgKi8pe1xuICAgIHZhciB0aGF0ID0gdGhpc1xuICAgICAgLCBhTGVuID0gYXJndW1lbnRzLmxlbmd0aFxuICAgICAgLCBqID0gMCwgayA9IDAsIGFyZ3M7XG4gICAgaWYoIWhvbGRlciAmJiAhYUxlbilyZXR1cm4gaW52b2tlKGZuLCBwYXJncywgdGhhdCk7XG4gICAgYXJncyA9IHBhcmdzLnNsaWNlKCk7XG4gICAgaWYoaG9sZGVyKWZvcig7bGVuZ3RoID4gajsgaisrKWlmKGFyZ3Nbal0gPT09IF8pYXJnc1tqXSA9IGFyZ3VtZW50c1trKytdO1xuICAgIHdoaWxlKGFMZW4gPiBrKWFyZ3MucHVzaChhcmd1bWVudHNbaysrXSk7XG4gICAgcmV0dXJuIGludm9rZShmbiwgYXJncywgdGhhdCk7XG4gIH07XG59OyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9fZ2xvYmFsJyk7IiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihiaXRtYXAsIHZhbHVlKXtcbiAgcmV0dXJuIHtcbiAgICBlbnVtZXJhYmxlICA6ICEoYml0bWFwICYgMSksXG4gICAgY29uZmlndXJhYmxlOiAhKGJpdG1hcCAmIDIpLFxuICAgIHdyaXRhYmxlICAgIDogIShiaXRtYXAgJiA0KSxcbiAgICB2YWx1ZSAgICAgICA6IHZhbHVlXG4gIH07XG59OyIsInZhciByZWRlZmluZSA9IHJlcXVpcmUoJy4vX3JlZGVmaW5lJyk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKHRhcmdldCwgc3JjLCBzYWZlKXtcbiAgZm9yKHZhciBrZXkgaW4gc3JjKXJlZGVmaW5lKHRhcmdldCwga2V5LCBzcmNba2V5XSwgc2FmZSk7XG4gIHJldHVybiB0YXJnZXQ7XG59OyIsInZhciBnbG9iYWwgICAgPSByZXF1aXJlKCcuL19nbG9iYWwnKVxuICAsIGhpZGUgICAgICA9IHJlcXVpcmUoJy4vX2hpZGUnKVxuICAsIGhhcyAgICAgICA9IHJlcXVpcmUoJy4vX2hhcycpXG4gICwgU1JDICAgICAgID0gcmVxdWlyZSgnLi9fdWlkJykoJ3NyYycpXG4gICwgVE9fU1RSSU5HID0gJ3RvU3RyaW5nJ1xuICAsICR0b1N0cmluZyA9IEZ1bmN0aW9uW1RPX1NUUklOR11cbiAgLCBUUEwgICAgICAgPSAoJycgKyAkdG9TdHJpbmcpLnNwbGl0KFRPX1NUUklORyk7XG5cbnJlcXVpcmUoJy4vX2NvcmUnKS5pbnNwZWN0U291cmNlID0gZnVuY3Rpb24oaXQpe1xuICByZXR1cm4gJHRvU3RyaW5nLmNhbGwoaXQpO1xufTtcblxuKG1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oTywga2V5LCB2YWwsIHNhZmUpe1xuICB2YXIgaXNGdW5jdGlvbiA9IHR5cGVvZiB2YWwgPT0gJ2Z1bmN0aW9uJztcbiAgaWYoaXNGdW5jdGlvbiloYXModmFsLCAnbmFtZScpIHx8IGhpZGUodmFsLCAnbmFtZScsIGtleSk7XG4gIGlmKE9ba2V5XSA9PT0gdmFsKXJldHVybjtcbiAgaWYoaXNGdW5jdGlvbiloYXModmFsLCBTUkMpIHx8IGhpZGUodmFsLCBTUkMsIE9ba2V5XSA/ICcnICsgT1trZXldIDogVFBMLmpvaW4oU3RyaW5nKGtleSkpKTtcbiAgaWYoTyA9PT0gZ2xvYmFsKXtcbiAgICBPW2tleV0gPSB2YWw7XG4gIH0gZWxzZSB7XG4gICAgaWYoIXNhZmUpe1xuICAgICAgZGVsZXRlIE9ba2V5XTtcbiAgICAgIGhpZGUoTywga2V5LCB2YWwpO1xuICAgIH0gZWxzZSB7XG4gICAgICBpZihPW2tleV0pT1trZXldID0gdmFsO1xuICAgICAgZWxzZSBoaWRlKE8sIGtleSwgdmFsKTtcbiAgICB9XG4gIH1cbi8vIGFkZCBmYWtlIEZ1bmN0aW9uI3RvU3RyaW5nIGZvciBjb3JyZWN0IHdvcmsgd3JhcHBlZCBtZXRob2RzIC8gY29uc3RydWN0b3JzIHdpdGggbWV0aG9kcyBsaWtlIExvRGFzaCBpc05hdGl2ZVxufSkoRnVuY3Rpb24ucHJvdG90eXBlLCBUT19TVFJJTkcsIGZ1bmN0aW9uIHRvU3RyaW5nKCl7XG4gIHJldHVybiB0eXBlb2YgdGhpcyA9PSAnZnVuY3Rpb24nICYmIHRoaXNbU1JDXSB8fCAkdG9TdHJpbmcuY2FsbCh0aGlzKTtcbn0pOyIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24ocmVnRXhwLCByZXBsYWNlKXtcbiAgdmFyIHJlcGxhY2VyID0gcmVwbGFjZSA9PT0gT2JqZWN0KHJlcGxhY2UpID8gZnVuY3Rpb24ocGFydCl7XG4gICAgcmV0dXJuIHJlcGxhY2VbcGFydF07XG4gIH0gOiByZXBsYWNlO1xuICByZXR1cm4gZnVuY3Rpb24oaXQpe1xuICAgIHJldHVybiBTdHJpbmcoaXQpLnJlcGxhY2UocmVnRXhwLCByZXBsYWNlcik7XG4gIH07XG59OyIsIi8vIDcuMi45IFNhbWVWYWx1ZSh4LCB5KVxubW9kdWxlLmV4cG9ydHMgPSBPYmplY3QuaXMgfHwgZnVuY3Rpb24gaXMoeCwgeSl7XG4gIHJldHVybiB4ID09PSB5ID8geCAhPT0gMCB8fCAxIC8geCA9PT0gMSAvIHkgOiB4ICE9IHggJiYgeSAhPSB5O1xufTsiLCIvLyBXb3JrcyB3aXRoIF9fcHJvdG9fXyBvbmx5LiBPbGQgdjggY2FuJ3Qgd29yayB3aXRoIG51bGwgcHJvdG8gb2JqZWN0cy5cbi8qIGVzbGludC1kaXNhYmxlIG5vLXByb3RvICovXG52YXIgaXNPYmplY3QgPSByZXF1aXJlKCcuL19pcy1vYmplY3QnKVxuICAsIGFuT2JqZWN0ID0gcmVxdWlyZSgnLi9fYW4tb2JqZWN0Jyk7XG52YXIgY2hlY2sgPSBmdW5jdGlvbihPLCBwcm90byl7XG4gIGFuT2JqZWN0KE8pO1xuICBpZighaXNPYmplY3QocHJvdG8pICYmIHByb3RvICE9PSBudWxsKXRocm93IFR5cGVFcnJvcihwcm90byArIFwiOiBjYW4ndCBzZXQgYXMgcHJvdG90eXBlIVwiKTtcbn07XG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgc2V0OiBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHwgKCdfX3Byb3RvX18nIGluIHt9ID8gLy8gZXNsaW50LWRpc2FibGUtbGluZVxuICAgIGZ1bmN0aW9uKHRlc3QsIGJ1Z2d5LCBzZXQpe1xuICAgICAgdHJ5IHtcbiAgICAgICAgc2V0ID0gcmVxdWlyZSgnLi9fY3R4JykoRnVuY3Rpb24uY2FsbCwgcmVxdWlyZSgnLi9fb2JqZWN0LWdvcGQnKS5mKE9iamVjdC5wcm90b3R5cGUsICdfX3Byb3RvX18nKS5zZXQsIDIpO1xuICAgICAgICBzZXQodGVzdCwgW10pO1xuICAgICAgICBidWdneSA9ICEodGVzdCBpbnN0YW5jZW9mIEFycmF5KTtcbiAgICAgIH0gY2F0Y2goZSl7IGJ1Z2d5ID0gdHJ1ZTsgfVxuICAgICAgcmV0dXJuIGZ1bmN0aW9uIHNldFByb3RvdHlwZU9mKE8sIHByb3RvKXtcbiAgICAgICAgY2hlY2soTywgcHJvdG8pO1xuICAgICAgICBpZihidWdneSlPLl9fcHJvdG9fXyA9IHByb3RvO1xuICAgICAgICBlbHNlIHNldChPLCBwcm90byk7XG4gICAgICAgIHJldHVybiBPO1xuICAgICAgfTtcbiAgICB9KHt9LCBmYWxzZSkgOiB1bmRlZmluZWQpLFxuICBjaGVjazogY2hlY2tcbn07IiwiJ3VzZSBzdHJpY3QnO1xudmFyIGdsb2JhbCAgICAgID0gcmVxdWlyZSgnLi9fZ2xvYmFsJylcbiAgLCBkUCAgICAgICAgICA9IHJlcXVpcmUoJy4vX29iamVjdC1kcCcpXG4gICwgREVTQ1JJUFRPUlMgPSByZXF1aXJlKCcuL19kZXNjcmlwdG9ycycpXG4gICwgU1BFQ0lFUyAgICAgPSByZXF1aXJlKCcuL193a3MnKSgnc3BlY2llcycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKEtFWSl7XG4gIHZhciBDID0gZ2xvYmFsW0tFWV07XG4gIGlmKERFU0NSSVBUT1JTICYmIEMgJiYgIUNbU1BFQ0lFU10pZFAuZihDLCBTUEVDSUVTLCB7XG4gICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgIGdldDogZnVuY3Rpb24oKXsgcmV0dXJuIHRoaXM7IH1cbiAgfSk7XG59OyIsInZhciBkZWYgPSByZXF1aXJlKCcuL19vYmplY3QtZHAnKS5mXG4gICwgaGFzID0gcmVxdWlyZSgnLi9faGFzJylcbiAgLCBUQUcgPSByZXF1aXJlKCcuL193a3MnKSgndG9TdHJpbmdUYWcnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpdCwgdGFnLCBzdGF0KXtcbiAgaWYoaXQgJiYgIWhhcyhpdCA9IHN0YXQgPyBpdCA6IGl0LnByb3RvdHlwZSwgVEFHKSlkZWYoaXQsIFRBRywge2NvbmZpZ3VyYWJsZTogdHJ1ZSwgdmFsdWU6IHRhZ30pO1xufTsiLCJ2YXIgc2hhcmVkID0gcmVxdWlyZSgnLi9fc2hhcmVkJykoJ2tleXMnKVxyXG4gICwgdWlkICAgID0gcmVxdWlyZSgnLi9fdWlkJyk7XHJcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oa2V5KXtcclxuICByZXR1cm4gc2hhcmVkW2tleV0gfHwgKHNoYXJlZFtrZXldID0gdWlkKGtleSkpO1xyXG59OyIsInZhciBnbG9iYWwgPSByZXF1aXJlKCcuL19nbG9iYWwnKVxuICAsIFNIQVJFRCA9ICdfX2NvcmUtanNfc2hhcmVkX18nXG4gICwgc3RvcmUgID0gZ2xvYmFsW1NIQVJFRF0gfHwgKGdsb2JhbFtTSEFSRURdID0ge30pO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihrZXkpe1xuICByZXR1cm4gc3RvcmVba2V5XSB8fCAoc3RvcmVba2V5XSA9IHt9KTtcbn07IiwiLy8gNy4zLjIwIFNwZWNpZXNDb25zdHJ1Y3RvcihPLCBkZWZhdWx0Q29uc3RydWN0b3IpXG52YXIgYW5PYmplY3QgID0gcmVxdWlyZSgnLi9fYW4tb2JqZWN0JylcbiAgLCBhRnVuY3Rpb24gPSByZXF1aXJlKCcuL19hLWZ1bmN0aW9uJylcbiAgLCBTUEVDSUVTICAgPSByZXF1aXJlKCcuL193a3MnKSgnc3BlY2llcycpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihPLCBEKXtcbiAgdmFyIEMgPSBhbk9iamVjdChPKS5jb25zdHJ1Y3RvciwgUztcbiAgcmV0dXJuIEMgPT09IHVuZGVmaW5lZCB8fCAoUyA9IGFuT2JqZWN0KEMpW1NQRUNJRVNdKSA9PSB1bmRlZmluZWQgPyBEIDogYUZ1bmN0aW9uKFMpO1xufTsiLCJ2YXIgZmFpbHMgPSByZXF1aXJlKCcuL19mYWlscycpO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihtZXRob2QsIGFyZyl7XHJcbiAgcmV0dXJuICEhbWV0aG9kICYmIGZhaWxzKGZ1bmN0aW9uKCl7XHJcbiAgICBhcmcgPyBtZXRob2QuY2FsbChudWxsLCBmdW5jdGlvbigpe30sIDEpIDogbWV0aG9kLmNhbGwobnVsbCk7XHJcbiAgfSk7XHJcbn07IiwidmFyIHRvSW50ZWdlciA9IHJlcXVpcmUoJy4vX3RvLWludGVnZXInKVxuICAsIGRlZmluZWQgICA9IHJlcXVpcmUoJy4vX2RlZmluZWQnKTtcbi8vIHRydWUgIC0+IFN0cmluZyNhdFxuLy8gZmFsc2UgLT4gU3RyaW5nI2NvZGVQb2ludEF0XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKFRPX1NUUklORyl7XG4gIHJldHVybiBmdW5jdGlvbih0aGF0LCBwb3Mpe1xuICAgIHZhciBzID0gU3RyaW5nKGRlZmluZWQodGhhdCkpXG4gICAgICAsIGkgPSB0b0ludGVnZXIocG9zKVxuICAgICAgLCBsID0gcy5sZW5ndGhcbiAgICAgICwgYSwgYjtcbiAgICBpZihpIDwgMCB8fCBpID49IGwpcmV0dXJuIFRPX1NUUklORyA/ICcnIDogdW5kZWZpbmVkO1xuICAgIGEgPSBzLmNoYXJDb2RlQXQoaSk7XG4gICAgcmV0dXJuIGEgPCAweGQ4MDAgfHwgYSA+IDB4ZGJmZiB8fCBpICsgMSA9PT0gbCB8fCAoYiA9IHMuY2hhckNvZGVBdChpICsgMSkpIDwgMHhkYzAwIHx8IGIgPiAweGRmZmZcbiAgICAgID8gVE9fU1RSSU5HID8gcy5jaGFyQXQoaSkgOiBhXG4gICAgICA6IFRPX1NUUklORyA/IHMuc2xpY2UoaSwgaSArIDIpIDogKGEgLSAweGQ4MDAgPDwgMTApICsgKGIgLSAweGRjMDApICsgMHgxMDAwMDtcbiAgfTtcbn07IiwiLy8gaGVscGVyIGZvciBTdHJpbmcje3N0YXJ0c1dpdGgsIGVuZHNXaXRoLCBpbmNsdWRlc31cbnZhciBpc1JlZ0V4cCA9IHJlcXVpcmUoJy4vX2lzLXJlZ2V4cCcpXG4gICwgZGVmaW5lZCAgPSByZXF1aXJlKCcuL19kZWZpbmVkJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24odGhhdCwgc2VhcmNoU3RyaW5nLCBOQU1FKXtcbiAgaWYoaXNSZWdFeHAoc2VhcmNoU3RyaW5nKSl0aHJvdyBUeXBlRXJyb3IoJ1N0cmluZyMnICsgTkFNRSArIFwiIGRvZXNuJ3QgYWNjZXB0IHJlZ2V4IVwiKTtcbiAgcmV0dXJuIFN0cmluZyhkZWZpbmVkKHRoYXQpKTtcbn07IiwidmFyICRleHBvcnQgPSByZXF1aXJlKCcuL19leHBvcnQnKVxuICAsIGZhaWxzICAgPSByZXF1aXJlKCcuL19mYWlscycpXG4gICwgZGVmaW5lZCA9IHJlcXVpcmUoJy4vX2RlZmluZWQnKVxuICAsIHF1b3QgICAgPSAvXCIvZztcbi8vIEIuMi4zLjIuMSBDcmVhdGVIVE1MKHN0cmluZywgdGFnLCBhdHRyaWJ1dGUsIHZhbHVlKVxudmFyIGNyZWF0ZUhUTUwgPSBmdW5jdGlvbihzdHJpbmcsIHRhZywgYXR0cmlidXRlLCB2YWx1ZSkge1xuICB2YXIgUyAgPSBTdHJpbmcoZGVmaW5lZChzdHJpbmcpKVxuICAgICwgcDEgPSAnPCcgKyB0YWc7XG4gIGlmKGF0dHJpYnV0ZSAhPT0gJycpcDEgKz0gJyAnICsgYXR0cmlidXRlICsgJz1cIicgKyBTdHJpbmcodmFsdWUpLnJlcGxhY2UocXVvdCwgJyZxdW90OycpICsgJ1wiJztcbiAgcmV0dXJuIHAxICsgJz4nICsgUyArICc8LycgKyB0YWcgKyAnPic7XG59O1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihOQU1FLCBleGVjKXtcbiAgdmFyIE8gPSB7fTtcbiAgT1tOQU1FXSA9IGV4ZWMoY3JlYXRlSFRNTCk7XG4gICRleHBvcnQoJGV4cG9ydC5QICsgJGV4cG9ydC5GICogZmFpbHMoZnVuY3Rpb24oKXtcbiAgICB2YXIgdGVzdCA9ICcnW05BTUVdKCdcIicpO1xuICAgIHJldHVybiB0ZXN0ICE9PSB0ZXN0LnRvTG93ZXJDYXNlKCkgfHwgdGVzdC5zcGxpdCgnXCInKS5sZW5ndGggPiAzO1xuICB9KSwgJ1N0cmluZycsIE8pO1xufTsiLCIvLyBodHRwczovL2dpdGh1Yi5jb20vdGMzOS9wcm9wb3NhbC1zdHJpbmctcGFkLXN0YXJ0LWVuZFxudmFyIHRvTGVuZ3RoID0gcmVxdWlyZSgnLi9fdG8tbGVuZ3RoJylcbiAgLCByZXBlYXQgICA9IHJlcXVpcmUoJy4vX3N0cmluZy1yZXBlYXQnKVxuICAsIGRlZmluZWQgID0gcmVxdWlyZSgnLi9fZGVmaW5lZCcpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKHRoYXQsIG1heExlbmd0aCwgZmlsbFN0cmluZywgbGVmdCl7XG4gIHZhciBTICAgICAgICAgICAgPSBTdHJpbmcoZGVmaW5lZCh0aGF0KSlcbiAgICAsIHN0cmluZ0xlbmd0aCA9IFMubGVuZ3RoXG4gICAgLCBmaWxsU3RyICAgICAgPSBmaWxsU3RyaW5nID09PSB1bmRlZmluZWQgPyAnICcgOiBTdHJpbmcoZmlsbFN0cmluZylcbiAgICAsIGludE1heExlbmd0aCA9IHRvTGVuZ3RoKG1heExlbmd0aCk7XG4gIGlmKGludE1heExlbmd0aCA8PSBzdHJpbmdMZW5ndGgpcmV0dXJuIFM7XG4gIGlmKGZpbGxTdHIgPT0gJycpZmlsbFN0ciA9ICcgJztcbiAgdmFyIGZpbGxMZW4gPSBpbnRNYXhMZW5ndGggLSBzdHJpbmdMZW5ndGhcbiAgICAsIHN0cmluZ0ZpbGxlciA9IHJlcGVhdC5jYWxsKGZpbGxTdHIsIE1hdGguY2VpbChmaWxsTGVuIC8gZmlsbFN0ci5sZW5ndGgpKTtcbiAgaWYoc3RyaW5nRmlsbGVyLmxlbmd0aCA+IGZpbGxMZW4pc3RyaW5nRmlsbGVyID0gc3RyaW5nRmlsbGVyLnNsaWNlKDAsIGZpbGxMZW4pO1xuICByZXR1cm4gbGVmdCA/IHN0cmluZ0ZpbGxlciArIFMgOiBTICsgc3RyaW5nRmlsbGVyO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcbnZhciB0b0ludGVnZXIgPSByZXF1aXJlKCcuL190by1pbnRlZ2VyJylcbiAgLCBkZWZpbmVkICAgPSByZXF1aXJlKCcuL19kZWZpbmVkJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gcmVwZWF0KGNvdW50KXtcbiAgdmFyIHN0ciA9IFN0cmluZyhkZWZpbmVkKHRoaXMpKVxuICAgICwgcmVzID0gJydcbiAgICAsIG4gICA9IHRvSW50ZWdlcihjb3VudCk7XG4gIGlmKG4gPCAwIHx8IG4gPT0gSW5maW5pdHkpdGhyb3cgUmFuZ2VFcnJvcihcIkNvdW50IGNhbid0IGJlIG5lZ2F0aXZlXCIpO1xuICBmb3IoO24gPiAwOyAobiA+Pj49IDEpICYmIChzdHIgKz0gc3RyKSlpZihuICYgMSlyZXMgKz0gc3RyO1xuICByZXR1cm4gcmVzO1xufTsiLCJ2YXIgJGV4cG9ydCA9IHJlcXVpcmUoJy4vX2V4cG9ydCcpXG4gICwgZGVmaW5lZCA9IHJlcXVpcmUoJy4vX2RlZmluZWQnKVxuICAsIGZhaWxzICAgPSByZXF1aXJlKCcuL19mYWlscycpXG4gICwgc3BhY2VzICA9IHJlcXVpcmUoJy4vX3N0cmluZy13cycpXG4gICwgc3BhY2UgICA9ICdbJyArIHNwYWNlcyArICddJ1xuICAsIG5vbiAgICAgPSAnXFx1MjAwYlxcdTAwODUnXG4gICwgbHRyaW0gICA9IFJlZ0V4cCgnXicgKyBzcGFjZSArIHNwYWNlICsgJyonKVxuICAsIHJ0cmltICAgPSBSZWdFeHAoc3BhY2UgKyBzcGFjZSArICcqJCcpO1xuXG52YXIgZXhwb3J0ZXIgPSBmdW5jdGlvbihLRVksIGV4ZWMsIEFMSUFTKXtcbiAgdmFyIGV4cCAgID0ge307XG4gIHZhciBGT1JDRSA9IGZhaWxzKGZ1bmN0aW9uKCl7XG4gICAgcmV0dXJuICEhc3BhY2VzW0tFWV0oKSB8fCBub25bS0VZXSgpICE9IG5vbjtcbiAgfSk7XG4gIHZhciBmbiA9IGV4cFtLRVldID0gRk9SQ0UgPyBleGVjKHRyaW0pIDogc3BhY2VzW0tFWV07XG4gIGlmKEFMSUFTKWV4cFtBTElBU10gPSBmbjtcbiAgJGV4cG9ydCgkZXhwb3J0LlAgKyAkZXhwb3J0LkYgKiBGT1JDRSwgJ1N0cmluZycsIGV4cCk7XG59O1xuXG4vLyAxIC0+IFN0cmluZyN0cmltTGVmdFxuLy8gMiAtPiBTdHJpbmcjdHJpbVJpZ2h0XG4vLyAzIC0+IFN0cmluZyN0cmltXG52YXIgdHJpbSA9IGV4cG9ydGVyLnRyaW0gPSBmdW5jdGlvbihzdHJpbmcsIFRZUEUpe1xuICBzdHJpbmcgPSBTdHJpbmcoZGVmaW5lZChzdHJpbmcpKTtcbiAgaWYoVFlQRSAmIDEpc3RyaW5nID0gc3RyaW5nLnJlcGxhY2UobHRyaW0sICcnKTtcbiAgaWYoVFlQRSAmIDIpc3RyaW5nID0gc3RyaW5nLnJlcGxhY2UocnRyaW0sICcnKTtcbiAgcmV0dXJuIHN0cmluZztcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gZXhwb3J0ZXI7IiwibW9kdWxlLmV4cG9ydHMgPSAnXFx4MDlcXHgwQVxceDBCXFx4MENcXHgwRFxceDIwXFx4QTBcXHUxNjgwXFx1MTgwRVxcdTIwMDBcXHUyMDAxXFx1MjAwMlxcdTIwMDMnICtcclxuICAnXFx1MjAwNFxcdTIwMDVcXHUyMDA2XFx1MjAwN1xcdTIwMDhcXHUyMDA5XFx1MjAwQVxcdTIwMkZcXHUyMDVGXFx1MzAwMFxcdTIwMjhcXHUyMDI5XFx1RkVGRic7IiwidmFyIGN0eCAgICAgICAgICAgICAgICA9IHJlcXVpcmUoJy4vX2N0eCcpXG4gICwgaW52b2tlICAgICAgICAgICAgID0gcmVxdWlyZSgnLi9faW52b2tlJylcbiAgLCBodG1sICAgICAgICAgICAgICAgPSByZXF1aXJlKCcuL19odG1sJylcbiAgLCBjZWwgICAgICAgICAgICAgICAgPSByZXF1aXJlKCcuL19kb20tY3JlYXRlJylcbiAgLCBnbG9iYWwgICAgICAgICAgICAgPSByZXF1aXJlKCcuL19nbG9iYWwnKVxuICAsIHByb2Nlc3MgICAgICAgICAgICA9IGdsb2JhbC5wcm9jZXNzXG4gICwgc2V0VGFzayAgICAgICAgICAgID0gZ2xvYmFsLnNldEltbWVkaWF0ZVxuICAsIGNsZWFyVGFzayAgICAgICAgICA9IGdsb2JhbC5jbGVhckltbWVkaWF0ZVxuICAsIE1lc3NhZ2VDaGFubmVsICAgICA9IGdsb2JhbC5NZXNzYWdlQ2hhbm5lbFxuICAsIGNvdW50ZXIgICAgICAgICAgICA9IDBcbiAgLCBxdWV1ZSAgICAgICAgICAgICAgPSB7fVxuICAsIE9OUkVBRFlTVEFURUNIQU5HRSA9ICdvbnJlYWR5c3RhdGVjaGFuZ2UnXG4gICwgZGVmZXIsIGNoYW5uZWwsIHBvcnQ7XG52YXIgcnVuID0gZnVuY3Rpb24oKXtcbiAgdmFyIGlkID0gK3RoaXM7XG4gIGlmKHF1ZXVlLmhhc093blByb3BlcnR5KGlkKSl7XG4gICAgdmFyIGZuID0gcXVldWVbaWRdO1xuICAgIGRlbGV0ZSBxdWV1ZVtpZF07XG4gICAgZm4oKTtcbiAgfVxufTtcbnZhciBsaXN0ZW5lciA9IGZ1bmN0aW9uKGV2ZW50KXtcbiAgcnVuLmNhbGwoZXZlbnQuZGF0YSk7XG59O1xuLy8gTm9kZS5qcyAwLjkrICYgSUUxMCsgaGFzIHNldEltbWVkaWF0ZSwgb3RoZXJ3aXNlOlxuaWYoIXNldFRhc2sgfHwgIWNsZWFyVGFzayl7XG4gIHNldFRhc2sgPSBmdW5jdGlvbiBzZXRJbW1lZGlhdGUoZm4pe1xuICAgIHZhciBhcmdzID0gW10sIGkgPSAxO1xuICAgIHdoaWxlKGFyZ3VtZW50cy5sZW5ndGggPiBpKWFyZ3MucHVzaChhcmd1bWVudHNbaSsrXSk7XG4gICAgcXVldWVbKytjb3VudGVyXSA9IGZ1bmN0aW9uKCl7XG4gICAgICBpbnZva2UodHlwZW9mIGZuID09ICdmdW5jdGlvbicgPyBmbiA6IEZ1bmN0aW9uKGZuKSwgYXJncyk7XG4gICAgfTtcbiAgICBkZWZlcihjb3VudGVyKTtcbiAgICByZXR1cm4gY291bnRlcjtcbiAgfTtcbiAgY2xlYXJUYXNrID0gZnVuY3Rpb24gY2xlYXJJbW1lZGlhdGUoaWQpe1xuICAgIGRlbGV0ZSBxdWV1ZVtpZF07XG4gIH07XG4gIC8vIE5vZGUuanMgMC44LVxuICBpZihyZXF1aXJlKCcuL19jb2YnKShwcm9jZXNzKSA9PSAncHJvY2Vzcycpe1xuICAgIGRlZmVyID0gZnVuY3Rpb24oaWQpe1xuICAgICAgcHJvY2Vzcy5uZXh0VGljayhjdHgocnVuLCBpZCwgMSkpO1xuICAgIH07XG4gIC8vIEJyb3dzZXJzIHdpdGggTWVzc2FnZUNoYW5uZWwsIGluY2x1ZGVzIFdlYldvcmtlcnNcbiAgfSBlbHNlIGlmKE1lc3NhZ2VDaGFubmVsKXtcbiAgICBjaGFubmVsID0gbmV3IE1lc3NhZ2VDaGFubmVsO1xuICAgIHBvcnQgICAgPSBjaGFubmVsLnBvcnQyO1xuICAgIGNoYW5uZWwucG9ydDEub25tZXNzYWdlID0gbGlzdGVuZXI7XG4gICAgZGVmZXIgPSBjdHgocG9ydC5wb3N0TWVzc2FnZSwgcG9ydCwgMSk7XG4gIC8vIEJyb3dzZXJzIHdpdGggcG9zdE1lc3NhZ2UsIHNraXAgV2ViV29ya2Vyc1xuICAvLyBJRTggaGFzIHBvc3RNZXNzYWdlLCBidXQgaXQncyBzeW5jICYgdHlwZW9mIGl0cyBwb3N0TWVzc2FnZSBpcyAnb2JqZWN0J1xuICB9IGVsc2UgaWYoZ2xvYmFsLmFkZEV2ZW50TGlzdGVuZXIgJiYgdHlwZW9mIHBvc3RNZXNzYWdlID09ICdmdW5jdGlvbicgJiYgIWdsb2JhbC5pbXBvcnRTY3JpcHRzKXtcbiAgICBkZWZlciA9IGZ1bmN0aW9uKGlkKXtcbiAgICAgIGdsb2JhbC5wb3N0TWVzc2FnZShpZCArICcnLCAnKicpO1xuICAgIH07XG4gICAgZ2xvYmFsLmFkZEV2ZW50TGlzdGVuZXIoJ21lc3NhZ2UnLCBsaXN0ZW5lciwgZmFsc2UpO1xuICAvLyBJRTgtXG4gIH0gZWxzZSBpZihPTlJFQURZU1RBVEVDSEFOR0UgaW4gY2VsKCdzY3JpcHQnKSl7XG4gICAgZGVmZXIgPSBmdW5jdGlvbihpZCl7XG4gICAgICBodG1sLmFwcGVuZENoaWxkKGNlbCgnc2NyaXB0JykpW09OUkVBRFlTVEFURUNIQU5HRV0gPSBmdW5jdGlvbigpe1xuICAgICAgICBodG1sLnJlbW92ZUNoaWxkKHRoaXMpO1xuICAgICAgICBydW4uY2FsbChpZCk7XG4gICAgICB9O1xuICAgIH07XG4gIC8vIFJlc3Qgb2xkIGJyb3dzZXJzXG4gIH0gZWxzZSB7XG4gICAgZGVmZXIgPSBmdW5jdGlvbihpZCl7XG4gICAgICBzZXRUaW1lb3V0KGN0eChydW4sIGlkLCAxKSwgMCk7XG4gICAgfTtcbiAgfVxufVxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIHNldDogICBzZXRUYXNrLFxuICBjbGVhcjogY2xlYXJUYXNrXG59OyIsInZhciB0b0ludGVnZXIgPSByZXF1aXJlKCcuL190by1pbnRlZ2VyJylcbiAgLCBtYXggICAgICAgPSBNYXRoLm1heFxuICAsIG1pbiAgICAgICA9IE1hdGgubWluO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpbmRleCwgbGVuZ3RoKXtcbiAgaW5kZXggPSB0b0ludGVnZXIoaW5kZXgpO1xuICByZXR1cm4gaW5kZXggPCAwID8gbWF4KGluZGV4ICsgbGVuZ3RoLCAwKSA6IG1pbihpbmRleCwgbGVuZ3RoKTtcbn07IiwiLy8gNy4xLjQgVG9JbnRlZ2VyXG52YXIgY2VpbCAgPSBNYXRoLmNlaWxcbiAgLCBmbG9vciA9IE1hdGguZmxvb3I7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGl0KXtcbiAgcmV0dXJuIGlzTmFOKGl0ID0gK2l0KSA/IDAgOiAoaXQgPiAwID8gZmxvb3IgOiBjZWlsKShpdCk7XG59OyIsIi8vIHRvIGluZGV4ZWQgb2JqZWN0LCB0b09iamVjdCB3aXRoIGZhbGxiYWNrIGZvciBub24tYXJyYXktbGlrZSBFUzMgc3RyaW5nc1xudmFyIElPYmplY3QgPSByZXF1aXJlKCcuL19pb2JqZWN0JylcbiAgLCBkZWZpbmVkID0gcmVxdWlyZSgnLi9fZGVmaW5lZCcpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpdCl7XG4gIHJldHVybiBJT2JqZWN0KGRlZmluZWQoaXQpKTtcbn07IiwiLy8gNy4xLjE1IFRvTGVuZ3RoXG52YXIgdG9JbnRlZ2VyID0gcmVxdWlyZSgnLi9fdG8taW50ZWdlcicpXG4gICwgbWluICAgICAgID0gTWF0aC5taW47XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGl0KXtcbiAgcmV0dXJuIGl0ID4gMCA/IG1pbih0b0ludGVnZXIoaXQpLCAweDFmZmZmZmZmZmZmZmZmKSA6IDA7IC8vIHBvdygyLCA1MykgLSAxID09IDkwMDcxOTkyNTQ3NDA5OTFcbn07IiwiLy8gNy4xLjEzIFRvT2JqZWN0KGFyZ3VtZW50KVxudmFyIGRlZmluZWQgPSByZXF1aXJlKCcuL19kZWZpbmVkJyk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGl0KXtcbiAgcmV0dXJuIE9iamVjdChkZWZpbmVkKGl0KSk7XG59OyIsIi8vIDcuMS4xIFRvUHJpbWl0aXZlKGlucHV0IFssIFByZWZlcnJlZFR5cGVdKVxudmFyIGlzT2JqZWN0ID0gcmVxdWlyZSgnLi9faXMtb2JqZWN0Jyk7XG4vLyBpbnN0ZWFkIG9mIHRoZSBFUzYgc3BlYyB2ZXJzaW9uLCB3ZSBkaWRuJ3QgaW1wbGVtZW50IEBAdG9QcmltaXRpdmUgY2FzZVxuLy8gYW5kIHRoZSBzZWNvbmQgYXJndW1lbnQgLSBmbGFnIC0gcHJlZmVycmVkIHR5cGUgaXMgYSBzdHJpbmdcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oaXQsIFMpe1xuICBpZighaXNPYmplY3QoaXQpKXJldHVybiBpdDtcbiAgdmFyIGZuLCB2YWw7XG4gIGlmKFMgJiYgdHlwZW9mIChmbiA9IGl0LnRvU3RyaW5nKSA9PSAnZnVuY3Rpb24nICYmICFpc09iamVjdCh2YWwgPSBmbi5jYWxsKGl0KSkpcmV0dXJuIHZhbDtcbiAgaWYodHlwZW9mIChmbiA9IGl0LnZhbHVlT2YpID09ICdmdW5jdGlvbicgJiYgIWlzT2JqZWN0KHZhbCA9IGZuLmNhbGwoaXQpKSlyZXR1cm4gdmFsO1xuICBpZighUyAmJiB0eXBlb2YgKGZuID0gaXQudG9TdHJpbmcpID09ICdmdW5jdGlvbicgJiYgIWlzT2JqZWN0KHZhbCA9IGZuLmNhbGwoaXQpKSlyZXR1cm4gdmFsO1xuICB0aHJvdyBUeXBlRXJyb3IoXCJDYW4ndCBjb252ZXJ0IG9iamVjdCB0byBwcmltaXRpdmUgdmFsdWVcIik7XG59OyIsIid1c2Ugc3RyaWN0JztcbmlmKHJlcXVpcmUoJy4vX2Rlc2NyaXB0b3JzJykpe1xuICB2YXIgTElCUkFSWSAgICAgICAgICAgICA9IHJlcXVpcmUoJy4vX2xpYnJhcnknKVxuICAgICwgZ2xvYmFsICAgICAgICAgICAgICA9IHJlcXVpcmUoJy4vX2dsb2JhbCcpXG4gICAgLCBmYWlscyAgICAgICAgICAgICAgID0gcmVxdWlyZSgnLi9fZmFpbHMnKVxuICAgICwgJGV4cG9ydCAgICAgICAgICAgICA9IHJlcXVpcmUoJy4vX2V4cG9ydCcpXG4gICAgLCAkdHlwZWQgICAgICAgICAgICAgID0gcmVxdWlyZSgnLi9fdHlwZWQnKVxuICAgICwgJGJ1ZmZlciAgICAgICAgICAgICA9IHJlcXVpcmUoJy4vX3R5cGVkLWJ1ZmZlcicpXG4gICAgLCBjdHggICAgICAgICAgICAgICAgID0gcmVxdWlyZSgnLi9fY3R4JylcbiAgICAsIGFuSW5zdGFuY2UgICAgICAgICAgPSByZXF1aXJlKCcuL19hbi1pbnN0YW5jZScpXG4gICAgLCBwcm9wZXJ0eURlc2MgICAgICAgID0gcmVxdWlyZSgnLi9fcHJvcGVydHktZGVzYycpXG4gICAgLCBoaWRlICAgICAgICAgICAgICAgID0gcmVxdWlyZSgnLi9faGlkZScpXG4gICAgLCByZWRlZmluZUFsbCAgICAgICAgID0gcmVxdWlyZSgnLi9fcmVkZWZpbmUtYWxsJylcbiAgICAsIGlzSW50ZWdlciAgICAgICAgICAgPSByZXF1aXJlKCcuL19pcy1pbnRlZ2VyJylcbiAgICAsIHRvSW50ZWdlciAgICAgICAgICAgPSByZXF1aXJlKCcuL190by1pbnRlZ2VyJylcbiAgICAsIHRvTGVuZ3RoICAgICAgICAgICAgPSByZXF1aXJlKCcuL190by1sZW5ndGgnKVxuICAgICwgdG9JbmRleCAgICAgICAgICAgICA9IHJlcXVpcmUoJy4vX3RvLWluZGV4JylcbiAgICAsIHRvUHJpbWl0aXZlICAgICAgICAgPSByZXF1aXJlKCcuL190by1wcmltaXRpdmUnKVxuICAgICwgaGFzICAgICAgICAgICAgICAgICA9IHJlcXVpcmUoJy4vX2hhcycpXG4gICAgLCBzYW1lICAgICAgICAgICAgICAgID0gcmVxdWlyZSgnLi9fc2FtZS12YWx1ZScpXG4gICAgLCBjbGFzc29mICAgICAgICAgICAgID0gcmVxdWlyZSgnLi9fY2xhc3NvZicpXG4gICAgLCBpc09iamVjdCAgICAgICAgICAgID0gcmVxdWlyZSgnLi9faXMtb2JqZWN0JylcbiAgICAsIHRvT2JqZWN0ICAgICAgICAgICAgPSByZXF1aXJlKCcuL190by1vYmplY3QnKVxuICAgICwgaXNBcnJheUl0ZXIgICAgICAgICA9IHJlcXVpcmUoJy4vX2lzLWFycmF5LWl0ZXInKVxuICAgICwgY3JlYXRlICAgICAgICAgICAgICA9IHJlcXVpcmUoJy4vX29iamVjdC1jcmVhdGUnKVxuICAgICwgZ2V0UHJvdG90eXBlT2YgICAgICA9IHJlcXVpcmUoJy4vX29iamVjdC1ncG8nKVxuICAgICwgZ09QTiAgICAgICAgICAgICAgICA9IHJlcXVpcmUoJy4vX29iamVjdC1nb3BuJykuZlxuICAgICwgaXNJdGVyYWJsZSAgICAgICAgICA9IHJlcXVpcmUoJy4vY29yZS5pcy1pdGVyYWJsZScpXG4gICAgLCBnZXRJdGVyRm4gICAgICAgICAgID0gcmVxdWlyZSgnLi9jb3JlLmdldC1pdGVyYXRvci1tZXRob2QnKVxuICAgICwgdWlkICAgICAgICAgICAgICAgICA9IHJlcXVpcmUoJy4vX3VpZCcpXG4gICAgLCB3a3MgICAgICAgICAgICAgICAgID0gcmVxdWlyZSgnLi9fd2tzJylcbiAgICAsIGNyZWF0ZUFycmF5TWV0aG9kICAgPSByZXF1aXJlKCcuL19hcnJheS1tZXRob2RzJylcbiAgICAsIGNyZWF0ZUFycmF5SW5jbHVkZXMgPSByZXF1aXJlKCcuL19hcnJheS1pbmNsdWRlcycpXG4gICAgLCBzcGVjaWVzQ29uc3RydWN0b3IgID0gcmVxdWlyZSgnLi9fc3BlY2llcy1jb25zdHJ1Y3RvcicpXG4gICAgLCBBcnJheUl0ZXJhdG9ycyAgICAgID0gcmVxdWlyZSgnLi9lczYuYXJyYXkuaXRlcmF0b3InKVxuICAgICwgSXRlcmF0b3JzICAgICAgICAgICA9IHJlcXVpcmUoJy4vX2l0ZXJhdG9ycycpXG4gICAgLCAkaXRlckRldGVjdCAgICAgICAgID0gcmVxdWlyZSgnLi9faXRlci1kZXRlY3QnKVxuICAgICwgc2V0U3BlY2llcyAgICAgICAgICA9IHJlcXVpcmUoJy4vX3NldC1zcGVjaWVzJylcbiAgICAsIGFycmF5RmlsbCAgICAgICAgICAgPSByZXF1aXJlKCcuL19hcnJheS1maWxsJylcbiAgICAsIGFycmF5Q29weVdpdGhpbiAgICAgPSByZXF1aXJlKCcuL19hcnJheS1jb3B5LXdpdGhpbicpXG4gICAgLCAkRFAgICAgICAgICAgICAgICAgID0gcmVxdWlyZSgnLi9fb2JqZWN0LWRwJylcbiAgICAsICRHT1BEICAgICAgICAgICAgICAgPSByZXF1aXJlKCcuL19vYmplY3QtZ29wZCcpXG4gICAgLCBkUCAgICAgICAgICAgICAgICAgID0gJERQLmZcbiAgICAsIGdPUEQgICAgICAgICAgICAgICAgPSAkR09QRC5mXG4gICAgLCBSYW5nZUVycm9yICAgICAgICAgID0gZ2xvYmFsLlJhbmdlRXJyb3JcbiAgICAsIFR5cGVFcnJvciAgICAgICAgICAgPSBnbG9iYWwuVHlwZUVycm9yXG4gICAgLCBVaW50OEFycmF5ICAgICAgICAgID0gZ2xvYmFsLlVpbnQ4QXJyYXlcbiAgICAsIEFSUkFZX0JVRkZFUiAgICAgICAgPSAnQXJyYXlCdWZmZXInXG4gICAgLCBTSEFSRURfQlVGRkVSICAgICAgID0gJ1NoYXJlZCcgKyBBUlJBWV9CVUZGRVJcbiAgICAsIEJZVEVTX1BFUl9FTEVNRU5UICAgPSAnQllURVNfUEVSX0VMRU1FTlQnXG4gICAgLCBQUk9UT1RZUEUgICAgICAgICAgID0gJ3Byb3RvdHlwZSdcbiAgICAsIEFycmF5UHJvdG8gICAgICAgICAgPSBBcnJheVtQUk9UT1RZUEVdXG4gICAgLCAkQXJyYXlCdWZmZXIgICAgICAgID0gJGJ1ZmZlci5BcnJheUJ1ZmZlclxuICAgICwgJERhdGFWaWV3ICAgICAgICAgICA9ICRidWZmZXIuRGF0YVZpZXdcbiAgICAsIGFycmF5Rm9yRWFjaCAgICAgICAgPSBjcmVhdGVBcnJheU1ldGhvZCgwKVxuICAgICwgYXJyYXlGaWx0ZXIgICAgICAgICA9IGNyZWF0ZUFycmF5TWV0aG9kKDIpXG4gICAgLCBhcnJheVNvbWUgICAgICAgICAgID0gY3JlYXRlQXJyYXlNZXRob2QoMylcbiAgICAsIGFycmF5RXZlcnkgICAgICAgICAgPSBjcmVhdGVBcnJheU1ldGhvZCg0KVxuICAgICwgYXJyYXlGaW5kICAgICAgICAgICA9IGNyZWF0ZUFycmF5TWV0aG9kKDUpXG4gICAgLCBhcnJheUZpbmRJbmRleCAgICAgID0gY3JlYXRlQXJyYXlNZXRob2QoNilcbiAgICAsIGFycmF5SW5jbHVkZXMgICAgICAgPSBjcmVhdGVBcnJheUluY2x1ZGVzKHRydWUpXG4gICAgLCBhcnJheUluZGV4T2YgICAgICAgID0gY3JlYXRlQXJyYXlJbmNsdWRlcyhmYWxzZSlcbiAgICAsIGFycmF5VmFsdWVzICAgICAgICAgPSBBcnJheUl0ZXJhdG9ycy52YWx1ZXNcbiAgICAsIGFycmF5S2V5cyAgICAgICAgICAgPSBBcnJheUl0ZXJhdG9ycy5rZXlzXG4gICAgLCBhcnJheUVudHJpZXMgICAgICAgID0gQXJyYXlJdGVyYXRvcnMuZW50cmllc1xuICAgICwgYXJyYXlMYXN0SW5kZXhPZiAgICA9IEFycmF5UHJvdG8ubGFzdEluZGV4T2ZcbiAgICAsIGFycmF5UmVkdWNlICAgICAgICAgPSBBcnJheVByb3RvLnJlZHVjZVxuICAgICwgYXJyYXlSZWR1Y2VSaWdodCAgICA9IEFycmF5UHJvdG8ucmVkdWNlUmlnaHRcbiAgICAsIGFycmF5Sm9pbiAgICAgICAgICAgPSBBcnJheVByb3RvLmpvaW5cbiAgICAsIGFycmF5U29ydCAgICAgICAgICAgPSBBcnJheVByb3RvLnNvcnRcbiAgICAsIGFycmF5U2xpY2UgICAgICAgICAgPSBBcnJheVByb3RvLnNsaWNlXG4gICAgLCBhcnJheVRvU3RyaW5nICAgICAgID0gQXJyYXlQcm90by50b1N0cmluZ1xuICAgICwgYXJyYXlUb0xvY2FsZVN0cmluZyA9IEFycmF5UHJvdG8udG9Mb2NhbGVTdHJpbmdcbiAgICAsIElURVJBVE9SICAgICAgICAgICAgPSB3a3MoJ2l0ZXJhdG9yJylcbiAgICAsIFRBRyAgICAgICAgICAgICAgICAgPSB3a3MoJ3RvU3RyaW5nVGFnJylcbiAgICAsIFRZUEVEX0NPTlNUUlVDVE9SICAgPSB1aWQoJ3R5cGVkX2NvbnN0cnVjdG9yJylcbiAgICAsIERFRl9DT05TVFJVQ1RPUiAgICAgPSB1aWQoJ2RlZl9jb25zdHJ1Y3RvcicpXG4gICAgLCBBTExfQ09OU1RSVUNUT1JTICAgID0gJHR5cGVkLkNPTlNUUlxuICAgICwgVFlQRURfQVJSQVkgICAgICAgICA9ICR0eXBlZC5UWVBFRFxuICAgICwgVklFVyAgICAgICAgICAgICAgICA9ICR0eXBlZC5WSUVXXG4gICAgLCBXUk9OR19MRU5HVEggICAgICAgID0gJ1dyb25nIGxlbmd0aCEnO1xuXG4gIHZhciAkbWFwID0gY3JlYXRlQXJyYXlNZXRob2QoMSwgZnVuY3Rpb24oTywgbGVuZ3RoKXtcbiAgICByZXR1cm4gYWxsb2NhdGUoc3BlY2llc0NvbnN0cnVjdG9yKE8sIE9bREVGX0NPTlNUUlVDVE9SXSksIGxlbmd0aCk7XG4gIH0pO1xuXG4gIHZhciBMSVRUTEVfRU5ESUFOID0gZmFpbHMoZnVuY3Rpb24oKXtcbiAgICByZXR1cm4gbmV3IFVpbnQ4QXJyYXkobmV3IFVpbnQxNkFycmF5KFsxXSkuYnVmZmVyKVswXSA9PT0gMTtcbiAgfSk7XG5cbiAgdmFyIEZPUkNFRF9TRVQgPSAhIVVpbnQ4QXJyYXkgJiYgISFVaW50OEFycmF5W1BST1RPVFlQRV0uc2V0ICYmIGZhaWxzKGZ1bmN0aW9uKCl7XG4gICAgbmV3IFVpbnQ4QXJyYXkoMSkuc2V0KHt9KTtcbiAgfSk7XG5cbiAgdmFyIHN0cmljdFRvTGVuZ3RoID0gZnVuY3Rpb24oaXQsIFNBTUUpe1xuICAgIGlmKGl0ID09PSB1bmRlZmluZWQpdGhyb3cgVHlwZUVycm9yKFdST05HX0xFTkdUSCk7XG4gICAgdmFyIG51bWJlciA9ICtpdFxuICAgICAgLCBsZW5ndGggPSB0b0xlbmd0aChpdCk7XG4gICAgaWYoU0FNRSAmJiAhc2FtZShudW1iZXIsIGxlbmd0aCkpdGhyb3cgUmFuZ2VFcnJvcihXUk9OR19MRU5HVEgpO1xuICAgIHJldHVybiBsZW5ndGg7XG4gIH07XG5cbiAgdmFyIHRvT2Zmc2V0ID0gZnVuY3Rpb24oaXQsIEJZVEVTKXtcbiAgICB2YXIgb2Zmc2V0ID0gdG9JbnRlZ2VyKGl0KTtcbiAgICBpZihvZmZzZXQgPCAwIHx8IG9mZnNldCAlIEJZVEVTKXRocm93IFJhbmdlRXJyb3IoJ1dyb25nIG9mZnNldCEnKTtcbiAgICByZXR1cm4gb2Zmc2V0O1xuICB9O1xuXG4gIHZhciB2YWxpZGF0ZSA9IGZ1bmN0aW9uKGl0KXtcbiAgICBpZihpc09iamVjdChpdCkgJiYgVFlQRURfQVJSQVkgaW4gaXQpcmV0dXJuIGl0O1xuICAgIHRocm93IFR5cGVFcnJvcihpdCArICcgaXMgbm90IGEgdHlwZWQgYXJyYXkhJyk7XG4gIH07XG5cbiAgdmFyIGFsbG9jYXRlID0gZnVuY3Rpb24oQywgbGVuZ3RoKXtcbiAgICBpZighKGlzT2JqZWN0KEMpICYmIFRZUEVEX0NPTlNUUlVDVE9SIGluIEMpKXtcbiAgICAgIHRocm93IFR5cGVFcnJvcignSXQgaXMgbm90IGEgdHlwZWQgYXJyYXkgY29uc3RydWN0b3IhJyk7XG4gICAgfSByZXR1cm4gbmV3IEMobGVuZ3RoKTtcbiAgfTtcblxuICB2YXIgc3BlY2llc0Zyb21MaXN0ID0gZnVuY3Rpb24oTywgbGlzdCl7XG4gICAgcmV0dXJuIGZyb21MaXN0KHNwZWNpZXNDb25zdHJ1Y3RvcihPLCBPW0RFRl9DT05TVFJVQ1RPUl0pLCBsaXN0KTtcbiAgfTtcblxuICB2YXIgZnJvbUxpc3QgPSBmdW5jdGlvbihDLCBsaXN0KXtcbiAgICB2YXIgaW5kZXggID0gMFxuICAgICAgLCBsZW5ndGggPSBsaXN0Lmxlbmd0aFxuICAgICAgLCByZXN1bHQgPSBhbGxvY2F0ZShDLCBsZW5ndGgpO1xuICAgIHdoaWxlKGxlbmd0aCA+IGluZGV4KXJlc3VsdFtpbmRleF0gPSBsaXN0W2luZGV4KytdO1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH07XG5cbiAgdmFyIGFkZEdldHRlciA9IGZ1bmN0aW9uKGl0LCBrZXksIGludGVybmFsKXtcbiAgICBkUChpdCwga2V5LCB7Z2V0OiBmdW5jdGlvbigpeyByZXR1cm4gdGhpcy5fZFtpbnRlcm5hbF07IH19KTtcbiAgfTtcblxuICB2YXIgJGZyb20gPSBmdW5jdGlvbiBmcm9tKHNvdXJjZSAvKiwgbWFwZm4sIHRoaXNBcmcgKi8pe1xuICAgIHZhciBPICAgICAgID0gdG9PYmplY3Qoc291cmNlKVxuICAgICAgLCBhTGVuICAgID0gYXJndW1lbnRzLmxlbmd0aFxuICAgICAgLCBtYXBmbiAgID0gYUxlbiA+IDEgPyBhcmd1bWVudHNbMV0gOiB1bmRlZmluZWRcbiAgICAgICwgbWFwcGluZyA9IG1hcGZuICE9PSB1bmRlZmluZWRcbiAgICAgICwgaXRlckZuICA9IGdldEl0ZXJGbihPKVxuICAgICAgLCBpLCBsZW5ndGgsIHZhbHVlcywgcmVzdWx0LCBzdGVwLCBpdGVyYXRvcjtcbiAgICBpZihpdGVyRm4gIT0gdW5kZWZpbmVkICYmICFpc0FycmF5SXRlcihpdGVyRm4pKXtcbiAgICAgIGZvcihpdGVyYXRvciA9IGl0ZXJGbi5jYWxsKE8pLCB2YWx1ZXMgPSBbXSwgaSA9IDA7ICEoc3RlcCA9IGl0ZXJhdG9yLm5leHQoKSkuZG9uZTsgaSsrKXtcbiAgICAgICAgdmFsdWVzLnB1c2goc3RlcC52YWx1ZSk7XG4gICAgICB9IE8gPSB2YWx1ZXM7XG4gICAgfVxuICAgIGlmKG1hcHBpbmcgJiYgYUxlbiA+IDIpbWFwZm4gPSBjdHgobWFwZm4sIGFyZ3VtZW50c1syXSwgMik7XG4gICAgZm9yKGkgPSAwLCBsZW5ndGggPSB0b0xlbmd0aChPLmxlbmd0aCksIHJlc3VsdCA9IGFsbG9jYXRlKHRoaXMsIGxlbmd0aCk7IGxlbmd0aCA+IGk7IGkrKyl7XG4gICAgICByZXN1bHRbaV0gPSBtYXBwaW5nID8gbWFwZm4oT1tpXSwgaSkgOiBPW2ldO1xuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9O1xuXG4gIHZhciAkb2YgPSBmdW5jdGlvbiBvZigvKi4uLml0ZW1zKi8pe1xuICAgIHZhciBpbmRleCAgPSAwXG4gICAgICAsIGxlbmd0aCA9IGFyZ3VtZW50cy5sZW5ndGhcbiAgICAgICwgcmVzdWx0ID0gYWxsb2NhdGUodGhpcywgbGVuZ3RoKTtcbiAgICB3aGlsZShsZW5ndGggPiBpbmRleClyZXN1bHRbaW5kZXhdID0gYXJndW1lbnRzW2luZGV4KytdO1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH07XG5cbiAgLy8gaU9TIFNhZmFyaSA2LnggZmFpbHMgaGVyZVxuICB2YXIgVE9fTE9DQUxFX0JVRyA9ICEhVWludDhBcnJheSAmJiBmYWlscyhmdW5jdGlvbigpeyBhcnJheVRvTG9jYWxlU3RyaW5nLmNhbGwobmV3IFVpbnQ4QXJyYXkoMSkpOyB9KTtcblxuICB2YXIgJHRvTG9jYWxlU3RyaW5nID0gZnVuY3Rpb24gdG9Mb2NhbGVTdHJpbmcoKXtcbiAgICByZXR1cm4gYXJyYXlUb0xvY2FsZVN0cmluZy5hcHBseShUT19MT0NBTEVfQlVHID8gYXJyYXlTbGljZS5jYWxsKHZhbGlkYXRlKHRoaXMpKSA6IHZhbGlkYXRlKHRoaXMpLCBhcmd1bWVudHMpO1xuICB9O1xuXG4gIHZhciBwcm90byA9IHtcbiAgICBjb3B5V2l0aGluOiBmdW5jdGlvbiBjb3B5V2l0aGluKHRhcmdldCwgc3RhcnQgLyosIGVuZCAqLyl7XG4gICAgICByZXR1cm4gYXJyYXlDb3B5V2l0aGluLmNhbGwodmFsaWRhdGUodGhpcyksIHRhcmdldCwgc3RhcnQsIGFyZ3VtZW50cy5sZW5ndGggPiAyID8gYXJndW1lbnRzWzJdIDogdW5kZWZpbmVkKTtcbiAgICB9LFxuICAgIGV2ZXJ5OiBmdW5jdGlvbiBldmVyeShjYWxsYmFja2ZuIC8qLCB0aGlzQXJnICovKXtcbiAgICAgIHJldHVybiBhcnJheUV2ZXJ5KHZhbGlkYXRlKHRoaXMpLCBjYWxsYmFja2ZuLCBhcmd1bWVudHMubGVuZ3RoID4gMSA/IGFyZ3VtZW50c1sxXSA6IHVuZGVmaW5lZCk7XG4gICAgfSxcbiAgICBmaWxsOiBmdW5jdGlvbiBmaWxsKHZhbHVlIC8qLCBzdGFydCwgZW5kICovKXsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bnVzZWQtdmFyc1xuICAgICAgcmV0dXJuIGFycmF5RmlsbC5hcHBseSh2YWxpZGF0ZSh0aGlzKSwgYXJndW1lbnRzKTtcbiAgICB9LFxuICAgIGZpbHRlcjogZnVuY3Rpb24gZmlsdGVyKGNhbGxiYWNrZm4gLyosIHRoaXNBcmcgKi8pe1xuICAgICAgcmV0dXJuIHNwZWNpZXNGcm9tTGlzdCh0aGlzLCBhcnJheUZpbHRlcih2YWxpZGF0ZSh0aGlzKSwgY2FsbGJhY2tmbixcbiAgICAgICAgYXJndW1lbnRzLmxlbmd0aCA+IDEgPyBhcmd1bWVudHNbMV0gOiB1bmRlZmluZWQpKTtcbiAgICB9LFxuICAgIGZpbmQ6IGZ1bmN0aW9uIGZpbmQocHJlZGljYXRlIC8qLCB0aGlzQXJnICovKXtcbiAgICAgIHJldHVybiBhcnJheUZpbmQodmFsaWRhdGUodGhpcyksIHByZWRpY2F0ZSwgYXJndW1lbnRzLmxlbmd0aCA+IDEgPyBhcmd1bWVudHNbMV0gOiB1bmRlZmluZWQpO1xuICAgIH0sXG4gICAgZmluZEluZGV4OiBmdW5jdGlvbiBmaW5kSW5kZXgocHJlZGljYXRlIC8qLCB0aGlzQXJnICovKXtcbiAgICAgIHJldHVybiBhcnJheUZpbmRJbmRleCh2YWxpZGF0ZSh0aGlzKSwgcHJlZGljYXRlLCBhcmd1bWVudHMubGVuZ3RoID4gMSA/IGFyZ3VtZW50c1sxXSA6IHVuZGVmaW5lZCk7XG4gICAgfSxcbiAgICBmb3JFYWNoOiBmdW5jdGlvbiBmb3JFYWNoKGNhbGxiYWNrZm4gLyosIHRoaXNBcmcgKi8pe1xuICAgICAgYXJyYXlGb3JFYWNoKHZhbGlkYXRlKHRoaXMpLCBjYWxsYmFja2ZuLCBhcmd1bWVudHMubGVuZ3RoID4gMSA/IGFyZ3VtZW50c1sxXSA6IHVuZGVmaW5lZCk7XG4gICAgfSxcbiAgICBpbmRleE9mOiBmdW5jdGlvbiBpbmRleE9mKHNlYXJjaEVsZW1lbnQgLyosIGZyb21JbmRleCAqLyl7XG4gICAgICByZXR1cm4gYXJyYXlJbmRleE9mKHZhbGlkYXRlKHRoaXMpLCBzZWFyY2hFbGVtZW50LCBhcmd1bWVudHMubGVuZ3RoID4gMSA/IGFyZ3VtZW50c1sxXSA6IHVuZGVmaW5lZCk7XG4gICAgfSxcbiAgICBpbmNsdWRlczogZnVuY3Rpb24gaW5jbHVkZXMoc2VhcmNoRWxlbWVudCAvKiwgZnJvbUluZGV4ICovKXtcbiAgICAgIHJldHVybiBhcnJheUluY2x1ZGVzKHZhbGlkYXRlKHRoaXMpLCBzZWFyY2hFbGVtZW50LCBhcmd1bWVudHMubGVuZ3RoID4gMSA/IGFyZ3VtZW50c1sxXSA6IHVuZGVmaW5lZCk7XG4gICAgfSxcbiAgICBqb2luOiBmdW5jdGlvbiBqb2luKHNlcGFyYXRvcil7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW51c2VkLXZhcnNcbiAgICAgIHJldHVybiBhcnJheUpvaW4uYXBwbHkodmFsaWRhdGUodGhpcyksIGFyZ3VtZW50cyk7XG4gICAgfSxcbiAgICBsYXN0SW5kZXhPZjogZnVuY3Rpb24gbGFzdEluZGV4T2Yoc2VhcmNoRWxlbWVudCAvKiwgZnJvbUluZGV4ICovKXsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bnVzZWQtdmFyc1xuICAgICAgcmV0dXJuIGFycmF5TGFzdEluZGV4T2YuYXBwbHkodmFsaWRhdGUodGhpcyksIGFyZ3VtZW50cyk7XG4gICAgfSxcbiAgICBtYXA6IGZ1bmN0aW9uIG1hcChtYXBmbiAvKiwgdGhpc0FyZyAqLyl7XG4gICAgICByZXR1cm4gJG1hcCh2YWxpZGF0ZSh0aGlzKSwgbWFwZm4sIGFyZ3VtZW50cy5sZW5ndGggPiAxID8gYXJndW1lbnRzWzFdIDogdW5kZWZpbmVkKTtcbiAgICB9LFxuICAgIHJlZHVjZTogZnVuY3Rpb24gcmVkdWNlKGNhbGxiYWNrZm4gLyosIGluaXRpYWxWYWx1ZSAqLyl7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW51c2VkLXZhcnNcbiAgICAgIHJldHVybiBhcnJheVJlZHVjZS5hcHBseSh2YWxpZGF0ZSh0aGlzKSwgYXJndW1lbnRzKTtcbiAgICB9LFxuICAgIHJlZHVjZVJpZ2h0OiBmdW5jdGlvbiByZWR1Y2VSaWdodChjYWxsYmFja2ZuIC8qLCBpbml0aWFsVmFsdWUgKi8peyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVudXNlZC12YXJzXG4gICAgICByZXR1cm4gYXJyYXlSZWR1Y2VSaWdodC5hcHBseSh2YWxpZGF0ZSh0aGlzKSwgYXJndW1lbnRzKTtcbiAgICB9LFxuICAgIHJldmVyc2U6IGZ1bmN0aW9uIHJldmVyc2UoKXtcbiAgICAgIHZhciB0aGF0ICAgPSB0aGlzXG4gICAgICAgICwgbGVuZ3RoID0gdmFsaWRhdGUodGhhdCkubGVuZ3RoXG4gICAgICAgICwgbWlkZGxlID0gTWF0aC5mbG9vcihsZW5ndGggLyAyKVxuICAgICAgICAsIGluZGV4ICA9IDBcbiAgICAgICAgLCB2YWx1ZTtcbiAgICAgIHdoaWxlKGluZGV4IDwgbWlkZGxlKXtcbiAgICAgICAgdmFsdWUgICAgICAgICA9IHRoYXRbaW5kZXhdO1xuICAgICAgICB0aGF0W2luZGV4KytdID0gdGhhdFstLWxlbmd0aF07XG4gICAgICAgIHRoYXRbbGVuZ3RoXSAgPSB2YWx1ZTtcbiAgICAgIH0gcmV0dXJuIHRoYXQ7XG4gICAgfSxcbiAgICBzb21lOiBmdW5jdGlvbiBzb21lKGNhbGxiYWNrZm4gLyosIHRoaXNBcmcgKi8pe1xuICAgICAgcmV0dXJuIGFycmF5U29tZSh2YWxpZGF0ZSh0aGlzKSwgY2FsbGJhY2tmbiwgYXJndW1lbnRzLmxlbmd0aCA+IDEgPyBhcmd1bWVudHNbMV0gOiB1bmRlZmluZWQpO1xuICAgIH0sXG4gICAgc29ydDogZnVuY3Rpb24gc29ydChjb21wYXJlZm4pe1xuICAgICAgcmV0dXJuIGFycmF5U29ydC5jYWxsKHZhbGlkYXRlKHRoaXMpLCBjb21wYXJlZm4pO1xuICAgIH0sXG4gICAgc3ViYXJyYXk6IGZ1bmN0aW9uIHN1YmFycmF5KGJlZ2luLCBlbmQpe1xuICAgICAgdmFyIE8gICAgICA9IHZhbGlkYXRlKHRoaXMpXG4gICAgICAgICwgbGVuZ3RoID0gTy5sZW5ndGhcbiAgICAgICAgLCAkYmVnaW4gPSB0b0luZGV4KGJlZ2luLCBsZW5ndGgpO1xuICAgICAgcmV0dXJuIG5ldyAoc3BlY2llc0NvbnN0cnVjdG9yKE8sIE9bREVGX0NPTlNUUlVDVE9SXSkpKFxuICAgICAgICBPLmJ1ZmZlcixcbiAgICAgICAgTy5ieXRlT2Zmc2V0ICsgJGJlZ2luICogTy5CWVRFU19QRVJfRUxFTUVOVCxcbiAgICAgICAgdG9MZW5ndGgoKGVuZCA9PT0gdW5kZWZpbmVkID8gbGVuZ3RoIDogdG9JbmRleChlbmQsIGxlbmd0aCkpIC0gJGJlZ2luKVxuICAgICAgKTtcbiAgICB9XG4gIH07XG5cbiAgdmFyICRzbGljZSA9IGZ1bmN0aW9uIHNsaWNlKHN0YXJ0LCBlbmQpe1xuICAgIHJldHVybiBzcGVjaWVzRnJvbUxpc3QodGhpcywgYXJyYXlTbGljZS5jYWxsKHZhbGlkYXRlKHRoaXMpLCBzdGFydCwgZW5kKSk7XG4gIH07XG5cbiAgdmFyICRzZXQgPSBmdW5jdGlvbiBzZXQoYXJyYXlMaWtlIC8qLCBvZmZzZXQgKi8pe1xuICAgIHZhbGlkYXRlKHRoaXMpO1xuICAgIHZhciBvZmZzZXQgPSB0b09mZnNldChhcmd1bWVudHNbMV0sIDEpXG4gICAgICAsIGxlbmd0aCA9IHRoaXMubGVuZ3RoXG4gICAgICAsIHNyYyAgICA9IHRvT2JqZWN0KGFycmF5TGlrZSlcbiAgICAgICwgbGVuICAgID0gdG9MZW5ndGgoc3JjLmxlbmd0aClcbiAgICAgICwgaW5kZXggID0gMDtcbiAgICBpZihsZW4gKyBvZmZzZXQgPiBsZW5ndGgpdGhyb3cgUmFuZ2VFcnJvcihXUk9OR19MRU5HVEgpO1xuICAgIHdoaWxlKGluZGV4IDwgbGVuKXRoaXNbb2Zmc2V0ICsgaW5kZXhdID0gc3JjW2luZGV4KytdO1xuICB9O1xuXG4gIHZhciAkaXRlcmF0b3JzID0ge1xuICAgIGVudHJpZXM6IGZ1bmN0aW9uIGVudHJpZXMoKXtcbiAgICAgIHJldHVybiBhcnJheUVudHJpZXMuY2FsbCh2YWxpZGF0ZSh0aGlzKSk7XG4gICAgfSxcbiAgICBrZXlzOiBmdW5jdGlvbiBrZXlzKCl7XG4gICAgICByZXR1cm4gYXJyYXlLZXlzLmNhbGwodmFsaWRhdGUodGhpcykpO1xuICAgIH0sXG4gICAgdmFsdWVzOiBmdW5jdGlvbiB2YWx1ZXMoKXtcbiAgICAgIHJldHVybiBhcnJheVZhbHVlcy5jYWxsKHZhbGlkYXRlKHRoaXMpKTtcbiAgICB9XG4gIH07XG5cbiAgdmFyIGlzVEFJbmRleCA9IGZ1bmN0aW9uKHRhcmdldCwga2V5KXtcbiAgICByZXR1cm4gaXNPYmplY3QodGFyZ2V0KVxuICAgICAgJiYgdGFyZ2V0W1RZUEVEX0FSUkFZXVxuICAgICAgJiYgdHlwZW9mIGtleSAhPSAnc3ltYm9sJ1xuICAgICAgJiYga2V5IGluIHRhcmdldFxuICAgICAgJiYgU3RyaW5nKCtrZXkpID09IFN0cmluZyhrZXkpO1xuICB9O1xuICB2YXIgJGdldERlc2MgPSBmdW5jdGlvbiBnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IodGFyZ2V0LCBrZXkpe1xuICAgIHJldHVybiBpc1RBSW5kZXgodGFyZ2V0LCBrZXkgPSB0b1ByaW1pdGl2ZShrZXksIHRydWUpKVxuICAgICAgPyBwcm9wZXJ0eURlc2MoMiwgdGFyZ2V0W2tleV0pXG4gICAgICA6IGdPUEQodGFyZ2V0LCBrZXkpO1xuICB9O1xuICB2YXIgJHNldERlc2MgPSBmdW5jdGlvbiBkZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGtleSwgZGVzYyl7XG4gICAgaWYoaXNUQUluZGV4KHRhcmdldCwga2V5ID0gdG9QcmltaXRpdmUoa2V5LCB0cnVlKSlcbiAgICAgICYmIGlzT2JqZWN0KGRlc2MpXG4gICAgICAmJiBoYXMoZGVzYywgJ3ZhbHVlJylcbiAgICAgICYmICFoYXMoZGVzYywgJ2dldCcpXG4gICAgICAmJiAhaGFzKGRlc2MsICdzZXQnKVxuICAgICAgLy8gVE9ETzogYWRkIHZhbGlkYXRpb24gZGVzY3JpcHRvciB3L28gY2FsbGluZyBhY2Nlc3NvcnNcbiAgICAgICYmICFkZXNjLmNvbmZpZ3VyYWJsZVxuICAgICAgJiYgKCFoYXMoZGVzYywgJ3dyaXRhYmxlJykgfHwgZGVzYy53cml0YWJsZSlcbiAgICAgICYmICghaGFzKGRlc2MsICdlbnVtZXJhYmxlJykgfHwgZGVzYy5lbnVtZXJhYmxlKVxuICAgICl7XG4gICAgICB0YXJnZXRba2V5XSA9IGRlc2MudmFsdWU7XG4gICAgICByZXR1cm4gdGFyZ2V0O1xuICAgIH0gZWxzZSByZXR1cm4gZFAodGFyZ2V0LCBrZXksIGRlc2MpO1xuICB9O1xuXG4gIGlmKCFBTExfQ09OU1RSVUNUT1JTKXtcbiAgICAkR09QRC5mID0gJGdldERlc2M7XG4gICAgJERQLmYgICA9ICRzZXREZXNjO1xuICB9XG5cbiAgJGV4cG9ydCgkZXhwb3J0LlMgKyAkZXhwb3J0LkYgKiAhQUxMX0NPTlNUUlVDVE9SUywgJ09iamVjdCcsIHtcbiAgICBnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3I6ICRnZXREZXNjLFxuICAgIGRlZmluZVByb3BlcnR5OiAgICAgICAgICAgJHNldERlc2NcbiAgfSk7XG5cbiAgaWYoZmFpbHMoZnVuY3Rpb24oKXsgYXJyYXlUb1N0cmluZy5jYWxsKHt9KTsgfSkpe1xuICAgIGFycmF5VG9TdHJpbmcgPSBhcnJheVRvTG9jYWxlU3RyaW5nID0gZnVuY3Rpb24gdG9TdHJpbmcoKXtcbiAgICAgIHJldHVybiBhcnJheUpvaW4uY2FsbCh0aGlzKTtcbiAgICB9XG4gIH1cblxuICB2YXIgJFR5cGVkQXJyYXlQcm90b3R5cGUkID0gcmVkZWZpbmVBbGwoe30sIHByb3RvKTtcbiAgcmVkZWZpbmVBbGwoJFR5cGVkQXJyYXlQcm90b3R5cGUkLCAkaXRlcmF0b3JzKTtcbiAgaGlkZSgkVHlwZWRBcnJheVByb3RvdHlwZSQsIElURVJBVE9SLCAkaXRlcmF0b3JzLnZhbHVlcyk7XG4gIHJlZGVmaW5lQWxsKCRUeXBlZEFycmF5UHJvdG90eXBlJCwge1xuICAgIHNsaWNlOiAgICAgICAgICAkc2xpY2UsXG4gICAgc2V0OiAgICAgICAgICAgICRzZXQsXG4gICAgY29uc3RydWN0b3I6ICAgIGZ1bmN0aW9uKCl7IC8qIG5vb3AgKi8gfSxcbiAgICB0b1N0cmluZzogICAgICAgYXJyYXlUb1N0cmluZyxcbiAgICB0b0xvY2FsZVN0cmluZzogJHRvTG9jYWxlU3RyaW5nXG4gIH0pO1xuICBhZGRHZXR0ZXIoJFR5cGVkQXJyYXlQcm90b3R5cGUkLCAnYnVmZmVyJywgJ2InKTtcbiAgYWRkR2V0dGVyKCRUeXBlZEFycmF5UHJvdG90eXBlJCwgJ2J5dGVPZmZzZXQnLCAnbycpO1xuICBhZGRHZXR0ZXIoJFR5cGVkQXJyYXlQcm90b3R5cGUkLCAnYnl0ZUxlbmd0aCcsICdsJyk7XG4gIGFkZEdldHRlcigkVHlwZWRBcnJheVByb3RvdHlwZSQsICdsZW5ndGgnLCAnZScpO1xuICBkUCgkVHlwZWRBcnJheVByb3RvdHlwZSQsIFRBRywge1xuICAgIGdldDogZnVuY3Rpb24oKXsgcmV0dXJuIHRoaXNbVFlQRURfQVJSQVldOyB9XG4gIH0pO1xuXG4gIG1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oS0VZLCBCWVRFUywgd3JhcHBlciwgQ0xBTVBFRCl7XG4gICAgQ0xBTVBFRCA9ICEhQ0xBTVBFRDtcbiAgICB2YXIgTkFNRSAgICAgICA9IEtFWSArIChDTEFNUEVEID8gJ0NsYW1wZWQnIDogJycpICsgJ0FycmF5J1xuICAgICAgLCBJU05UX1VJTlQ4ID0gTkFNRSAhPSAnVWludDhBcnJheSdcbiAgICAgICwgR0VUVEVSICAgICA9ICdnZXQnICsgS0VZXG4gICAgICAsIFNFVFRFUiAgICAgPSAnc2V0JyArIEtFWVxuICAgICAgLCBUeXBlZEFycmF5ID0gZ2xvYmFsW05BTUVdXG4gICAgICAsIEJhc2UgICAgICAgPSBUeXBlZEFycmF5IHx8IHt9XG4gICAgICAsIFRBQyAgICAgICAgPSBUeXBlZEFycmF5ICYmIGdldFByb3RvdHlwZU9mKFR5cGVkQXJyYXkpXG4gICAgICAsIEZPUkNFRCAgICAgPSAhVHlwZWRBcnJheSB8fCAhJHR5cGVkLkFCVlxuICAgICAgLCBPICAgICAgICAgID0ge31cbiAgICAgICwgVHlwZWRBcnJheVByb3RvdHlwZSA9IFR5cGVkQXJyYXkgJiYgVHlwZWRBcnJheVtQUk9UT1RZUEVdO1xuICAgIHZhciBnZXR0ZXIgPSBmdW5jdGlvbih0aGF0LCBpbmRleCl7XG4gICAgICB2YXIgZGF0YSA9IHRoYXQuX2Q7XG4gICAgICByZXR1cm4gZGF0YS52W0dFVFRFUl0oaW5kZXggKiBCWVRFUyArIGRhdGEubywgTElUVExFX0VORElBTik7XG4gICAgfTtcbiAgICB2YXIgc2V0dGVyID0gZnVuY3Rpb24odGhhdCwgaW5kZXgsIHZhbHVlKXtcbiAgICAgIHZhciBkYXRhID0gdGhhdC5fZDtcbiAgICAgIGlmKENMQU1QRUQpdmFsdWUgPSAodmFsdWUgPSBNYXRoLnJvdW5kKHZhbHVlKSkgPCAwID8gMCA6IHZhbHVlID4gMHhmZiA/IDB4ZmYgOiB2YWx1ZSAmIDB4ZmY7XG4gICAgICBkYXRhLnZbU0VUVEVSXShpbmRleCAqIEJZVEVTICsgZGF0YS5vLCB2YWx1ZSwgTElUVExFX0VORElBTik7XG4gICAgfTtcbiAgICB2YXIgYWRkRWxlbWVudCA9IGZ1bmN0aW9uKHRoYXQsIGluZGV4KXtcbiAgICAgIGRQKHRoYXQsIGluZGV4LCB7XG4gICAgICAgIGdldDogZnVuY3Rpb24oKXtcbiAgICAgICAgICByZXR1cm4gZ2V0dGVyKHRoaXMsIGluZGV4KTtcbiAgICAgICAgfSxcbiAgICAgICAgc2V0OiBmdW5jdGlvbih2YWx1ZSl7XG4gICAgICAgICAgcmV0dXJuIHNldHRlcih0aGlzLCBpbmRleCwgdmFsdWUpO1xuICAgICAgICB9LFxuICAgICAgICBlbnVtZXJhYmxlOiB0cnVlXG4gICAgICB9KTtcbiAgICB9O1xuICAgIGlmKEZPUkNFRCl7XG4gICAgICBUeXBlZEFycmF5ID0gd3JhcHBlcihmdW5jdGlvbih0aGF0LCBkYXRhLCAkb2Zmc2V0LCAkbGVuZ3RoKXtcbiAgICAgICAgYW5JbnN0YW5jZSh0aGF0LCBUeXBlZEFycmF5LCBOQU1FLCAnX2QnKTtcbiAgICAgICAgdmFyIGluZGV4ICA9IDBcbiAgICAgICAgICAsIG9mZnNldCA9IDBcbiAgICAgICAgICAsIGJ1ZmZlciwgYnl0ZUxlbmd0aCwgbGVuZ3RoLCBrbGFzcztcbiAgICAgICAgaWYoIWlzT2JqZWN0KGRhdGEpKXtcbiAgICAgICAgICBsZW5ndGggICAgID0gc3RyaWN0VG9MZW5ndGgoZGF0YSwgdHJ1ZSlcbiAgICAgICAgICBieXRlTGVuZ3RoID0gbGVuZ3RoICogQllURVM7XG4gICAgICAgICAgYnVmZmVyICAgICA9IG5ldyAkQXJyYXlCdWZmZXIoYnl0ZUxlbmd0aCk7XG4gICAgICAgIH0gZWxzZSBpZihkYXRhIGluc3RhbmNlb2YgJEFycmF5QnVmZmVyIHx8IChrbGFzcyA9IGNsYXNzb2YoZGF0YSkpID09IEFSUkFZX0JVRkZFUiB8fCBrbGFzcyA9PSBTSEFSRURfQlVGRkVSKXtcbiAgICAgICAgICBidWZmZXIgPSBkYXRhO1xuICAgICAgICAgIG9mZnNldCA9IHRvT2Zmc2V0KCRvZmZzZXQsIEJZVEVTKTtcbiAgICAgICAgICB2YXIgJGxlbiA9IGRhdGEuYnl0ZUxlbmd0aDtcbiAgICAgICAgICBpZigkbGVuZ3RoID09PSB1bmRlZmluZWQpe1xuICAgICAgICAgICAgaWYoJGxlbiAlIEJZVEVTKXRocm93IFJhbmdlRXJyb3IoV1JPTkdfTEVOR1RIKTtcbiAgICAgICAgICAgIGJ5dGVMZW5ndGggPSAkbGVuIC0gb2Zmc2V0O1xuICAgICAgICAgICAgaWYoYnl0ZUxlbmd0aCA8IDApdGhyb3cgUmFuZ2VFcnJvcihXUk9OR19MRU5HVEgpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBieXRlTGVuZ3RoID0gdG9MZW5ndGgoJGxlbmd0aCkgKiBCWVRFUztcbiAgICAgICAgICAgIGlmKGJ5dGVMZW5ndGggKyBvZmZzZXQgPiAkbGVuKXRocm93IFJhbmdlRXJyb3IoV1JPTkdfTEVOR1RIKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgbGVuZ3RoID0gYnl0ZUxlbmd0aCAvIEJZVEVTO1xuICAgICAgICB9IGVsc2UgaWYoVFlQRURfQVJSQVkgaW4gZGF0YSl7XG4gICAgICAgICAgcmV0dXJuIGZyb21MaXN0KFR5cGVkQXJyYXksIGRhdGEpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldHVybiAkZnJvbS5jYWxsKFR5cGVkQXJyYXksIGRhdGEpO1xuICAgICAgICB9XG4gICAgICAgIGhpZGUodGhhdCwgJ19kJywge1xuICAgICAgICAgIGI6IGJ1ZmZlcixcbiAgICAgICAgICBvOiBvZmZzZXQsXG4gICAgICAgICAgbDogYnl0ZUxlbmd0aCxcbiAgICAgICAgICBlOiBsZW5ndGgsXG4gICAgICAgICAgdjogbmV3ICREYXRhVmlldyhidWZmZXIpXG4gICAgICAgIH0pO1xuICAgICAgICB3aGlsZShpbmRleCA8IGxlbmd0aClhZGRFbGVtZW50KHRoYXQsIGluZGV4KyspO1xuICAgICAgfSk7XG4gICAgICBUeXBlZEFycmF5UHJvdG90eXBlID0gVHlwZWRBcnJheVtQUk9UT1RZUEVdID0gY3JlYXRlKCRUeXBlZEFycmF5UHJvdG90eXBlJCk7XG4gICAgICBoaWRlKFR5cGVkQXJyYXlQcm90b3R5cGUsICdjb25zdHJ1Y3RvcicsIFR5cGVkQXJyYXkpO1xuICAgIH0gZWxzZSBpZighJGl0ZXJEZXRlY3QoZnVuY3Rpb24oaXRlcil7XG4gICAgICAvLyBWOCB3b3JrcyB3aXRoIGl0ZXJhdG9ycywgYnV0IGZhaWxzIGluIG1hbnkgb3RoZXIgY2FzZXNcbiAgICAgIC8vIGh0dHBzOi8vY29kZS5nb29nbGUuY29tL3AvdjgvaXNzdWVzL2RldGFpbD9pZD00NTUyXG4gICAgICBuZXcgVHlwZWRBcnJheShudWxsKTsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1uZXdcbiAgICAgIG5ldyBUeXBlZEFycmF5KGl0ZXIpOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLW5ld1xuICAgIH0sIHRydWUpKXtcbiAgICAgIFR5cGVkQXJyYXkgPSB3cmFwcGVyKGZ1bmN0aW9uKHRoYXQsIGRhdGEsICRvZmZzZXQsICRsZW5ndGgpe1xuICAgICAgICBhbkluc3RhbmNlKHRoYXQsIFR5cGVkQXJyYXksIE5BTUUpO1xuICAgICAgICB2YXIga2xhc3M7XG4gICAgICAgIC8vIGB3c2AgbW9kdWxlIGJ1ZywgdGVtcG9yYXJpbHkgcmVtb3ZlIHZhbGlkYXRpb24gbGVuZ3RoIGZvciBVaW50OEFycmF5XG4gICAgICAgIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS93ZWJzb2NrZXRzL3dzL3B1bGwvNjQ1XG4gICAgICAgIGlmKCFpc09iamVjdChkYXRhKSlyZXR1cm4gbmV3IEJhc2Uoc3RyaWN0VG9MZW5ndGgoZGF0YSwgSVNOVF9VSU5UOCkpO1xuICAgICAgICBpZihkYXRhIGluc3RhbmNlb2YgJEFycmF5QnVmZmVyIHx8IChrbGFzcyA9IGNsYXNzb2YoZGF0YSkpID09IEFSUkFZX0JVRkZFUiB8fCBrbGFzcyA9PSBTSEFSRURfQlVGRkVSKXtcbiAgICAgICAgICByZXR1cm4gJGxlbmd0aCAhPT0gdW5kZWZpbmVkXG4gICAgICAgICAgICA/IG5ldyBCYXNlKGRhdGEsIHRvT2Zmc2V0KCRvZmZzZXQsIEJZVEVTKSwgJGxlbmd0aClcbiAgICAgICAgICAgIDogJG9mZnNldCAhPT0gdW5kZWZpbmVkXG4gICAgICAgICAgICAgID8gbmV3IEJhc2UoZGF0YSwgdG9PZmZzZXQoJG9mZnNldCwgQllURVMpKVxuICAgICAgICAgICAgICA6IG5ldyBCYXNlKGRhdGEpO1xuICAgICAgICB9XG4gICAgICAgIGlmKFRZUEVEX0FSUkFZIGluIGRhdGEpcmV0dXJuIGZyb21MaXN0KFR5cGVkQXJyYXksIGRhdGEpO1xuICAgICAgICByZXR1cm4gJGZyb20uY2FsbChUeXBlZEFycmF5LCBkYXRhKTtcbiAgICAgIH0pO1xuICAgICAgYXJyYXlGb3JFYWNoKFRBQyAhPT0gRnVuY3Rpb24ucHJvdG90eXBlID8gZ09QTihCYXNlKS5jb25jYXQoZ09QTihUQUMpKSA6IGdPUE4oQmFzZSksIGZ1bmN0aW9uKGtleSl7XG4gICAgICAgIGlmKCEoa2V5IGluIFR5cGVkQXJyYXkpKWhpZGUoVHlwZWRBcnJheSwga2V5LCBCYXNlW2tleV0pO1xuICAgICAgfSk7XG4gICAgICBUeXBlZEFycmF5W1BST1RPVFlQRV0gPSBUeXBlZEFycmF5UHJvdG90eXBlO1xuICAgICAgaWYoIUxJQlJBUlkpVHlwZWRBcnJheVByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IFR5cGVkQXJyYXk7XG4gICAgfVxuICAgIHZhciAkbmF0aXZlSXRlcmF0b3IgICA9IFR5cGVkQXJyYXlQcm90b3R5cGVbSVRFUkFUT1JdXG4gICAgICAsIENPUlJFQ1RfSVRFUl9OQU1FID0gISEkbmF0aXZlSXRlcmF0b3IgJiYgKCRuYXRpdmVJdGVyYXRvci5uYW1lID09ICd2YWx1ZXMnIHx8ICRuYXRpdmVJdGVyYXRvci5uYW1lID09IHVuZGVmaW5lZClcbiAgICAgICwgJGl0ZXJhdG9yICAgICAgICAgPSAkaXRlcmF0b3JzLnZhbHVlcztcbiAgICBoaWRlKFR5cGVkQXJyYXksIFRZUEVEX0NPTlNUUlVDVE9SLCB0cnVlKTtcbiAgICBoaWRlKFR5cGVkQXJyYXlQcm90b3R5cGUsIFRZUEVEX0FSUkFZLCBOQU1FKTtcbiAgICBoaWRlKFR5cGVkQXJyYXlQcm90b3R5cGUsIFZJRVcsIHRydWUpO1xuICAgIGhpZGUoVHlwZWRBcnJheVByb3RvdHlwZSwgREVGX0NPTlNUUlVDVE9SLCBUeXBlZEFycmF5KTtcblxuICAgIGlmKENMQU1QRUQgPyBuZXcgVHlwZWRBcnJheSgxKVtUQUddICE9IE5BTUUgOiAhKFRBRyBpbiBUeXBlZEFycmF5UHJvdG90eXBlKSl7XG4gICAgICBkUChUeXBlZEFycmF5UHJvdG90eXBlLCBUQUcsIHtcbiAgICAgICAgZ2V0OiBmdW5jdGlvbigpeyByZXR1cm4gTkFNRTsgfVxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgT1tOQU1FXSA9IFR5cGVkQXJyYXk7XG5cbiAgICAkZXhwb3J0KCRleHBvcnQuRyArICRleHBvcnQuVyArICRleHBvcnQuRiAqIChUeXBlZEFycmF5ICE9IEJhc2UpLCBPKTtcblxuICAgICRleHBvcnQoJGV4cG9ydC5TLCBOQU1FLCB7XG4gICAgICBCWVRFU19QRVJfRUxFTUVOVDogQllURVMsXG4gICAgICBmcm9tOiAkZnJvbSxcbiAgICAgIG9mOiAkb2ZcbiAgICB9KTtcblxuICAgIGlmKCEoQllURVNfUEVSX0VMRU1FTlQgaW4gVHlwZWRBcnJheVByb3RvdHlwZSkpaGlkZShUeXBlZEFycmF5UHJvdG90eXBlLCBCWVRFU19QRVJfRUxFTUVOVCwgQllURVMpO1xuXG4gICAgJGV4cG9ydCgkZXhwb3J0LlAsIE5BTUUsIHByb3RvKTtcblxuICAgIHNldFNwZWNpZXMoTkFNRSk7XG5cbiAgICAkZXhwb3J0KCRleHBvcnQuUCArICRleHBvcnQuRiAqIEZPUkNFRF9TRVQsIE5BTUUsIHtzZXQ6ICRzZXR9KTtcblxuICAgICRleHBvcnQoJGV4cG9ydC5QICsgJGV4cG9ydC5GICogIUNPUlJFQ1RfSVRFUl9OQU1FLCBOQU1FLCAkaXRlcmF0b3JzKTtcblxuICAgICRleHBvcnQoJGV4cG9ydC5QICsgJGV4cG9ydC5GICogKFR5cGVkQXJyYXlQcm90b3R5cGUudG9TdHJpbmcgIT0gYXJyYXlUb1N0cmluZyksIE5BTUUsIHt0b1N0cmluZzogYXJyYXlUb1N0cmluZ30pO1xuXG4gICAgJGV4cG9ydCgkZXhwb3J0LlAgKyAkZXhwb3J0LkYgKiBmYWlscyhmdW5jdGlvbigpe1xuICAgICAgbmV3IFR5cGVkQXJyYXkoMSkuc2xpY2UoKTtcbiAgICB9KSwgTkFNRSwge3NsaWNlOiAkc2xpY2V9KTtcblxuICAgICRleHBvcnQoJGV4cG9ydC5QICsgJGV4cG9ydC5GICogKGZhaWxzKGZ1bmN0aW9uKCl7XG4gICAgICByZXR1cm4gWzEsIDJdLnRvTG9jYWxlU3RyaW5nKCkgIT0gbmV3IFR5cGVkQXJyYXkoWzEsIDJdKS50b0xvY2FsZVN0cmluZygpXG4gICAgfSkgfHwgIWZhaWxzKGZ1bmN0aW9uKCl7XG4gICAgICBUeXBlZEFycmF5UHJvdG90eXBlLnRvTG9jYWxlU3RyaW5nLmNhbGwoWzEsIDJdKTtcbiAgICB9KSksIE5BTUUsIHt0b0xvY2FsZVN0cmluZzogJHRvTG9jYWxlU3RyaW5nfSk7XG5cbiAgICBJdGVyYXRvcnNbTkFNRV0gPSBDT1JSRUNUX0lURVJfTkFNRSA/ICRuYXRpdmVJdGVyYXRvciA6ICRpdGVyYXRvcjtcbiAgICBpZighTElCUkFSWSAmJiAhQ09SUkVDVF9JVEVSX05BTUUpaGlkZShUeXBlZEFycmF5UHJvdG90eXBlLCBJVEVSQVRPUiwgJGl0ZXJhdG9yKTtcbiAgfTtcbn0gZWxzZSBtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKCl7IC8qIGVtcHR5ICovIH07IiwiJ3VzZSBzdHJpY3QnO1xudmFyIGdsb2JhbCAgICAgICAgID0gcmVxdWlyZSgnLi9fZ2xvYmFsJylcbiAgLCBERVNDUklQVE9SUyAgICA9IHJlcXVpcmUoJy4vX2Rlc2NyaXB0b3JzJylcbiAgLCBMSUJSQVJZICAgICAgICA9IHJlcXVpcmUoJy4vX2xpYnJhcnknKVxuICAsICR0eXBlZCAgICAgICAgID0gcmVxdWlyZSgnLi9fdHlwZWQnKVxuICAsIGhpZGUgICAgICAgICAgID0gcmVxdWlyZSgnLi9faGlkZScpXG4gICwgcmVkZWZpbmVBbGwgICAgPSByZXF1aXJlKCcuL19yZWRlZmluZS1hbGwnKVxuICAsIGZhaWxzICAgICAgICAgID0gcmVxdWlyZSgnLi9fZmFpbHMnKVxuICAsIGFuSW5zdGFuY2UgICAgID0gcmVxdWlyZSgnLi9fYW4taW5zdGFuY2UnKVxuICAsIHRvSW50ZWdlciAgICAgID0gcmVxdWlyZSgnLi9fdG8taW50ZWdlcicpXG4gICwgdG9MZW5ndGggICAgICAgPSByZXF1aXJlKCcuL190by1sZW5ndGgnKVxuICAsIGdPUE4gICAgICAgICAgID0gcmVxdWlyZSgnLi9fb2JqZWN0LWdvcG4nKS5mXG4gICwgZFAgICAgICAgICAgICAgPSByZXF1aXJlKCcuL19vYmplY3QtZHAnKS5mXG4gICwgYXJyYXlGaWxsICAgICAgPSByZXF1aXJlKCcuL19hcnJheS1maWxsJylcbiAgLCBzZXRUb1N0cmluZ1RhZyA9IHJlcXVpcmUoJy4vX3NldC10by1zdHJpbmctdGFnJylcbiAgLCBBUlJBWV9CVUZGRVIgICA9ICdBcnJheUJ1ZmZlcidcbiAgLCBEQVRBX1ZJRVcgICAgICA9ICdEYXRhVmlldydcbiAgLCBQUk9UT1RZUEUgICAgICA9ICdwcm90b3R5cGUnXG4gICwgV1JPTkdfTEVOR1RIICAgPSAnV3JvbmcgbGVuZ3RoISdcbiAgLCBXUk9OR19JTkRFWCAgICA9ICdXcm9uZyBpbmRleCEnXG4gICwgJEFycmF5QnVmZmVyICAgPSBnbG9iYWxbQVJSQVlfQlVGRkVSXVxuICAsICREYXRhVmlldyAgICAgID0gZ2xvYmFsW0RBVEFfVklFV11cbiAgLCBNYXRoICAgICAgICAgICA9IGdsb2JhbC5NYXRoXG4gICwgcGFyc2VJbnQgICAgICAgPSBnbG9iYWwucGFyc2VJbnRcbiAgLCBSYW5nZUVycm9yICAgICA9IGdsb2JhbC5SYW5nZUVycm9yXG4gICwgSW5maW5pdHkgICAgICAgPSBnbG9iYWwuSW5maW5pdHlcbiAgLCBCYXNlQnVmZmVyICAgICA9ICRBcnJheUJ1ZmZlclxuICAsIGFicyAgICAgICAgICAgID0gTWF0aC5hYnNcbiAgLCBwb3cgICAgICAgICAgICA9IE1hdGgucG93XG4gICwgbWluICAgICAgICAgICAgPSBNYXRoLm1pblxuICAsIGZsb29yICAgICAgICAgID0gTWF0aC5mbG9vclxuICAsIGxvZyAgICAgICAgICAgID0gTWF0aC5sb2dcbiAgLCBMTjIgICAgICAgICAgICA9IE1hdGguTE4yXG4gICwgQlVGRkVSICAgICAgICAgPSAnYnVmZmVyJ1xuICAsIEJZVEVfTEVOR1RIICAgID0gJ2J5dGVMZW5ndGgnXG4gICwgQllURV9PRkZTRVQgICAgPSAnYnl0ZU9mZnNldCdcbiAgLCAkQlVGRkVSICAgICAgICA9IERFU0NSSVBUT1JTID8gJ19iJyA6IEJVRkZFUlxuICAsICRMRU5HVEggICAgICAgID0gREVTQ1JJUFRPUlMgPyAnX2wnIDogQllURV9MRU5HVEhcbiAgLCAkT0ZGU0VUICAgICAgICA9IERFU0NSSVBUT1JTID8gJ19vJyA6IEJZVEVfT0ZGU0VUO1xuXG4vLyBJRUVFNzU0IGNvbnZlcnNpb25zIGJhc2VkIG9uIGh0dHBzOi8vZ2l0aHViLmNvbS9mZXJvc3MvaWVlZTc1NFxudmFyIHBhY2tJRUVFNzU0ID0gZnVuY3Rpb24odmFsdWUsIG1MZW4sIG5CeXRlcyl7XG4gIHZhciBidWZmZXIgPSBBcnJheShuQnl0ZXMpXG4gICAgLCBlTGVuICAgPSBuQnl0ZXMgKiA4IC0gbUxlbiAtIDFcbiAgICAsIGVNYXggICA9ICgxIDw8IGVMZW4pIC0gMVxuICAgICwgZUJpYXMgID0gZU1heCA+PiAxXG4gICAgLCBydCAgICAgPSBtTGVuID09PSAyMyA/IHBvdygyLCAtMjQpIC0gcG93KDIsIC03NykgOiAwXG4gICAgLCBpICAgICAgPSAwXG4gICAgLCBzICAgICAgPSB2YWx1ZSA8IDAgfHwgdmFsdWUgPT09IDAgJiYgMSAvIHZhbHVlIDwgMCA/IDEgOiAwXG4gICAgLCBlLCBtLCBjO1xuICB2YWx1ZSA9IGFicyh2YWx1ZSlcbiAgaWYodmFsdWUgIT0gdmFsdWUgfHwgdmFsdWUgPT09IEluZmluaXR5KXtcbiAgICBtID0gdmFsdWUgIT0gdmFsdWUgPyAxIDogMDtcbiAgICBlID0gZU1heDtcbiAgfSBlbHNlIHtcbiAgICBlID0gZmxvb3IobG9nKHZhbHVlKSAvIExOMik7XG4gICAgaWYodmFsdWUgKiAoYyA9IHBvdygyLCAtZSkpIDwgMSl7XG4gICAgICBlLS07XG4gICAgICBjICo9IDI7XG4gICAgfVxuICAgIGlmKGUgKyBlQmlhcyA+PSAxKXtcbiAgICAgIHZhbHVlICs9IHJ0IC8gYztcbiAgICB9IGVsc2Uge1xuICAgICAgdmFsdWUgKz0gcnQgKiBwb3coMiwgMSAtIGVCaWFzKTtcbiAgICB9XG4gICAgaWYodmFsdWUgKiBjID49IDIpe1xuICAgICAgZSsrO1xuICAgICAgYyAvPSAyO1xuICAgIH1cbiAgICBpZihlICsgZUJpYXMgPj0gZU1heCl7XG4gICAgICBtID0gMDtcbiAgICAgIGUgPSBlTWF4O1xuICAgIH0gZWxzZSBpZihlICsgZUJpYXMgPj0gMSl7XG4gICAgICBtID0gKHZhbHVlICogYyAtIDEpICogcG93KDIsIG1MZW4pO1xuICAgICAgZSA9IGUgKyBlQmlhcztcbiAgICB9IGVsc2Uge1xuICAgICAgbSA9IHZhbHVlICogcG93KDIsIGVCaWFzIC0gMSkgKiBwb3coMiwgbUxlbik7XG4gICAgICBlID0gMDtcbiAgICB9XG4gIH1cbiAgZm9yKDsgbUxlbiA+PSA4OyBidWZmZXJbaSsrXSA9IG0gJiAyNTUsIG0gLz0gMjU2LCBtTGVuIC09IDgpO1xuICBlID0gZSA8PCBtTGVuIHwgbTtcbiAgZUxlbiArPSBtTGVuO1xuICBmb3IoOyBlTGVuID4gMDsgYnVmZmVyW2krK10gPSBlICYgMjU1LCBlIC89IDI1NiwgZUxlbiAtPSA4KTtcbiAgYnVmZmVyWy0taV0gfD0gcyAqIDEyODtcbiAgcmV0dXJuIGJ1ZmZlcjtcbn07XG52YXIgdW5wYWNrSUVFRTc1NCA9IGZ1bmN0aW9uKGJ1ZmZlciwgbUxlbiwgbkJ5dGVzKXtcbiAgdmFyIGVMZW4gID0gbkJ5dGVzICogOCAtIG1MZW4gLSAxXG4gICAgLCBlTWF4ICA9ICgxIDw8IGVMZW4pIC0gMVxuICAgICwgZUJpYXMgPSBlTWF4ID4+IDFcbiAgICAsIG5CaXRzID0gZUxlbiAtIDdcbiAgICAsIGkgICAgID0gbkJ5dGVzIC0gMVxuICAgICwgcyAgICAgPSBidWZmZXJbaS0tXVxuICAgICwgZSAgICAgPSBzICYgMTI3XG4gICAgLCBtO1xuICBzID4+PSA3O1xuICBmb3IoOyBuQml0cyA+IDA7IGUgPSBlICogMjU2ICsgYnVmZmVyW2ldLCBpLS0sIG5CaXRzIC09IDgpO1xuICBtID0gZSAmICgxIDw8IC1uQml0cykgLSAxO1xuICBlID4+PSAtbkJpdHM7XG4gIG5CaXRzICs9IG1MZW47XG4gIGZvcig7IG5CaXRzID4gMDsgbSA9IG0gKiAyNTYgKyBidWZmZXJbaV0sIGktLSwgbkJpdHMgLT0gOCk7XG4gIGlmKGUgPT09IDApe1xuICAgIGUgPSAxIC0gZUJpYXM7XG4gIH0gZWxzZSBpZihlID09PSBlTWF4KXtcbiAgICByZXR1cm4gbSA/IE5hTiA6IHMgPyAtSW5maW5pdHkgOiBJbmZpbml0eTtcbiAgfSBlbHNlIHtcbiAgICBtID0gbSArIHBvdygyLCBtTGVuKTtcbiAgICBlID0gZSAtIGVCaWFzO1xuICB9IHJldHVybiAocyA/IC0xIDogMSkgKiBtICogcG93KDIsIGUgLSBtTGVuKTtcbn07XG5cbnZhciB1bnBhY2tJMzIgPSBmdW5jdGlvbihieXRlcyl7XG4gIHJldHVybiBieXRlc1szXSA8PCAyNCB8IGJ5dGVzWzJdIDw8IDE2IHwgYnl0ZXNbMV0gPDwgOCB8IGJ5dGVzWzBdO1xufTtcbnZhciBwYWNrSTggPSBmdW5jdGlvbihpdCl7XG4gIHJldHVybiBbaXQgJiAweGZmXTtcbn07XG52YXIgcGFja0kxNiA9IGZ1bmN0aW9uKGl0KXtcbiAgcmV0dXJuIFtpdCAmIDB4ZmYsIGl0ID4+IDggJiAweGZmXTtcbn07XG52YXIgcGFja0kzMiA9IGZ1bmN0aW9uKGl0KXtcbiAgcmV0dXJuIFtpdCAmIDB4ZmYsIGl0ID4+IDggJiAweGZmLCBpdCA+PiAxNiAmIDB4ZmYsIGl0ID4+IDI0ICYgMHhmZl07XG59O1xudmFyIHBhY2tGNjQgPSBmdW5jdGlvbihpdCl7XG4gIHJldHVybiBwYWNrSUVFRTc1NChpdCwgNTIsIDgpO1xufTtcbnZhciBwYWNrRjMyID0gZnVuY3Rpb24oaXQpe1xuICByZXR1cm4gcGFja0lFRUU3NTQoaXQsIDIzLCA0KTtcbn07XG5cbnZhciBhZGRHZXR0ZXIgPSBmdW5jdGlvbihDLCBrZXksIGludGVybmFsKXtcbiAgZFAoQ1tQUk9UT1RZUEVdLCBrZXksIHtnZXQ6IGZ1bmN0aW9uKCl7IHJldHVybiB0aGlzW2ludGVybmFsXTsgfX0pO1xufTtcblxudmFyIGdldCA9IGZ1bmN0aW9uKHZpZXcsIGJ5dGVzLCBpbmRleCwgaXNMaXR0bGVFbmRpYW4pe1xuICB2YXIgbnVtSW5kZXggPSAraW5kZXhcbiAgICAsIGludEluZGV4ID0gdG9JbnRlZ2VyKG51bUluZGV4KTtcbiAgaWYobnVtSW5kZXggIT0gaW50SW5kZXggfHwgaW50SW5kZXggPCAwIHx8IGludEluZGV4ICsgYnl0ZXMgPiB2aWV3WyRMRU5HVEhdKXRocm93IFJhbmdlRXJyb3IoV1JPTkdfSU5ERVgpO1xuICB2YXIgc3RvcmUgPSB2aWV3WyRCVUZGRVJdLl9iXG4gICAgLCBzdGFydCA9IGludEluZGV4ICsgdmlld1skT0ZGU0VUXVxuICAgICwgcGFjayAgPSBzdG9yZS5zbGljZShzdGFydCwgc3RhcnQgKyBieXRlcyk7XG4gIHJldHVybiBpc0xpdHRsZUVuZGlhbiA/IHBhY2sgOiBwYWNrLnJldmVyc2UoKTtcbn07XG52YXIgc2V0ID0gZnVuY3Rpb24odmlldywgYnl0ZXMsIGluZGV4LCBjb252ZXJzaW9uLCB2YWx1ZSwgaXNMaXR0bGVFbmRpYW4pe1xuICB2YXIgbnVtSW5kZXggPSAraW5kZXhcbiAgICAsIGludEluZGV4ID0gdG9JbnRlZ2VyKG51bUluZGV4KTtcbiAgaWYobnVtSW5kZXggIT0gaW50SW5kZXggfHwgaW50SW5kZXggPCAwIHx8IGludEluZGV4ICsgYnl0ZXMgPiB2aWV3WyRMRU5HVEhdKXRocm93IFJhbmdlRXJyb3IoV1JPTkdfSU5ERVgpO1xuICB2YXIgc3RvcmUgPSB2aWV3WyRCVUZGRVJdLl9iXG4gICAgLCBzdGFydCA9IGludEluZGV4ICsgdmlld1skT0ZGU0VUXVxuICAgICwgcGFjayAgPSBjb252ZXJzaW9uKCt2YWx1ZSk7XG4gIGZvcih2YXIgaSA9IDA7IGkgPCBieXRlczsgaSsrKXN0b3JlW3N0YXJ0ICsgaV0gPSBwYWNrW2lzTGl0dGxlRW5kaWFuID8gaSA6IGJ5dGVzIC0gaSAtIDFdO1xufTtcblxudmFyIHZhbGlkYXRlQXJyYXlCdWZmZXJBcmd1bWVudHMgPSBmdW5jdGlvbih0aGF0LCBsZW5ndGgpe1xuICBhbkluc3RhbmNlKHRoYXQsICRBcnJheUJ1ZmZlciwgQVJSQVlfQlVGRkVSKTtcbiAgdmFyIG51bWJlckxlbmd0aCA9ICtsZW5ndGhcbiAgICAsIGJ5dGVMZW5ndGggICA9IHRvTGVuZ3RoKG51bWJlckxlbmd0aCk7XG4gIGlmKG51bWJlckxlbmd0aCAhPSBieXRlTGVuZ3RoKXRocm93IFJhbmdlRXJyb3IoV1JPTkdfTEVOR1RIKTtcbiAgcmV0dXJuIGJ5dGVMZW5ndGg7XG59O1xuXG5pZighJHR5cGVkLkFCVil7XG4gICRBcnJheUJ1ZmZlciA9IGZ1bmN0aW9uIEFycmF5QnVmZmVyKGxlbmd0aCl7XG4gICAgdmFyIGJ5dGVMZW5ndGggPSB2YWxpZGF0ZUFycmF5QnVmZmVyQXJndW1lbnRzKHRoaXMsIGxlbmd0aCk7XG4gICAgdGhpcy5fYiAgICAgICA9IGFycmF5RmlsbC5jYWxsKEFycmF5KGJ5dGVMZW5ndGgpLCAwKTtcbiAgICB0aGlzWyRMRU5HVEhdID0gYnl0ZUxlbmd0aDtcbiAgfTtcblxuICAkRGF0YVZpZXcgPSBmdW5jdGlvbiBEYXRhVmlldyhidWZmZXIsIGJ5dGVPZmZzZXQsIGJ5dGVMZW5ndGgpe1xuICAgIGFuSW5zdGFuY2UodGhpcywgJERhdGFWaWV3LCBEQVRBX1ZJRVcpO1xuICAgIGFuSW5zdGFuY2UoYnVmZmVyLCAkQXJyYXlCdWZmZXIsIERBVEFfVklFVyk7XG4gICAgdmFyIGJ1ZmZlckxlbmd0aCA9IGJ1ZmZlclskTEVOR1RIXVxuICAgICAgLCBvZmZzZXQgICAgICAgPSB0b0ludGVnZXIoYnl0ZU9mZnNldCk7XG4gICAgaWYob2Zmc2V0IDwgMCB8fCBvZmZzZXQgPiBidWZmZXJMZW5ndGgpdGhyb3cgUmFuZ2VFcnJvcignV3Jvbmcgb2Zmc2V0IScpO1xuICAgIGJ5dGVMZW5ndGggPSBieXRlTGVuZ3RoID09PSB1bmRlZmluZWQgPyBidWZmZXJMZW5ndGggLSBvZmZzZXQgOiB0b0xlbmd0aChieXRlTGVuZ3RoKTtcbiAgICBpZihvZmZzZXQgKyBieXRlTGVuZ3RoID4gYnVmZmVyTGVuZ3RoKXRocm93IFJhbmdlRXJyb3IoV1JPTkdfTEVOR1RIKTtcbiAgICB0aGlzWyRCVUZGRVJdID0gYnVmZmVyO1xuICAgIHRoaXNbJE9GRlNFVF0gPSBvZmZzZXQ7XG4gICAgdGhpc1skTEVOR1RIXSA9IGJ5dGVMZW5ndGg7XG4gIH07XG5cbiAgaWYoREVTQ1JJUFRPUlMpe1xuICAgIGFkZEdldHRlcigkQXJyYXlCdWZmZXIsIEJZVEVfTEVOR1RILCAnX2wnKTtcbiAgICBhZGRHZXR0ZXIoJERhdGFWaWV3LCBCVUZGRVIsICdfYicpO1xuICAgIGFkZEdldHRlcigkRGF0YVZpZXcsIEJZVEVfTEVOR1RILCAnX2wnKTtcbiAgICBhZGRHZXR0ZXIoJERhdGFWaWV3LCBCWVRFX09GRlNFVCwgJ19vJyk7XG4gIH1cblxuICByZWRlZmluZUFsbCgkRGF0YVZpZXdbUFJPVE9UWVBFXSwge1xuICAgIGdldEludDg6IGZ1bmN0aW9uIGdldEludDgoYnl0ZU9mZnNldCl7XG4gICAgICByZXR1cm4gZ2V0KHRoaXMsIDEsIGJ5dGVPZmZzZXQpWzBdIDw8IDI0ID4+IDI0O1xuICAgIH0sXG4gICAgZ2V0VWludDg6IGZ1bmN0aW9uIGdldFVpbnQ4KGJ5dGVPZmZzZXQpe1xuICAgICAgcmV0dXJuIGdldCh0aGlzLCAxLCBieXRlT2Zmc2V0KVswXTtcbiAgICB9LFxuICAgIGdldEludDE2OiBmdW5jdGlvbiBnZXRJbnQxNihieXRlT2Zmc2V0IC8qLCBsaXR0bGVFbmRpYW4gKi8pe1xuICAgICAgdmFyIGJ5dGVzID0gZ2V0KHRoaXMsIDIsIGJ5dGVPZmZzZXQsIGFyZ3VtZW50c1sxXSk7XG4gICAgICByZXR1cm4gKGJ5dGVzWzFdIDw8IDggfCBieXRlc1swXSkgPDwgMTYgPj4gMTY7XG4gICAgfSxcbiAgICBnZXRVaW50MTY6IGZ1bmN0aW9uIGdldFVpbnQxNihieXRlT2Zmc2V0IC8qLCBsaXR0bGVFbmRpYW4gKi8pe1xuICAgICAgdmFyIGJ5dGVzID0gZ2V0KHRoaXMsIDIsIGJ5dGVPZmZzZXQsIGFyZ3VtZW50c1sxXSk7XG4gICAgICByZXR1cm4gYnl0ZXNbMV0gPDwgOCB8IGJ5dGVzWzBdO1xuICAgIH0sXG4gICAgZ2V0SW50MzI6IGZ1bmN0aW9uIGdldEludDMyKGJ5dGVPZmZzZXQgLyosIGxpdHRsZUVuZGlhbiAqLyl7XG4gICAgICByZXR1cm4gdW5wYWNrSTMyKGdldCh0aGlzLCA0LCBieXRlT2Zmc2V0LCBhcmd1bWVudHNbMV0pKTtcbiAgICB9LFxuICAgIGdldFVpbnQzMjogZnVuY3Rpb24gZ2V0VWludDMyKGJ5dGVPZmZzZXQgLyosIGxpdHRsZUVuZGlhbiAqLyl7XG4gICAgICByZXR1cm4gdW5wYWNrSTMyKGdldCh0aGlzLCA0LCBieXRlT2Zmc2V0LCBhcmd1bWVudHNbMV0pKSA+Pj4gMDtcbiAgICB9LFxuICAgIGdldEZsb2F0MzI6IGZ1bmN0aW9uIGdldEZsb2F0MzIoYnl0ZU9mZnNldCAvKiwgbGl0dGxlRW5kaWFuICovKXtcbiAgICAgIHJldHVybiB1bnBhY2tJRUVFNzU0KGdldCh0aGlzLCA0LCBieXRlT2Zmc2V0LCBhcmd1bWVudHNbMV0pLCAyMywgNCk7XG4gICAgfSxcbiAgICBnZXRGbG9hdDY0OiBmdW5jdGlvbiBnZXRGbG9hdDY0KGJ5dGVPZmZzZXQgLyosIGxpdHRsZUVuZGlhbiAqLyl7XG4gICAgICByZXR1cm4gdW5wYWNrSUVFRTc1NChnZXQodGhpcywgOCwgYnl0ZU9mZnNldCwgYXJndW1lbnRzWzFdKSwgNTIsIDgpO1xuICAgIH0sXG4gICAgc2V0SW50ODogZnVuY3Rpb24gc2V0SW50OChieXRlT2Zmc2V0LCB2YWx1ZSl7XG4gICAgICBzZXQodGhpcywgMSwgYnl0ZU9mZnNldCwgcGFja0k4LCB2YWx1ZSk7XG4gICAgfSxcbiAgICBzZXRVaW50ODogZnVuY3Rpb24gc2V0VWludDgoYnl0ZU9mZnNldCwgdmFsdWUpe1xuICAgICAgc2V0KHRoaXMsIDEsIGJ5dGVPZmZzZXQsIHBhY2tJOCwgdmFsdWUpO1xuICAgIH0sXG4gICAgc2V0SW50MTY6IGZ1bmN0aW9uIHNldEludDE2KGJ5dGVPZmZzZXQsIHZhbHVlIC8qLCBsaXR0bGVFbmRpYW4gKi8pe1xuICAgICAgc2V0KHRoaXMsIDIsIGJ5dGVPZmZzZXQsIHBhY2tJMTYsIHZhbHVlLCBhcmd1bWVudHNbMl0pO1xuICAgIH0sXG4gICAgc2V0VWludDE2OiBmdW5jdGlvbiBzZXRVaW50MTYoYnl0ZU9mZnNldCwgdmFsdWUgLyosIGxpdHRsZUVuZGlhbiAqLyl7XG4gICAgICBzZXQodGhpcywgMiwgYnl0ZU9mZnNldCwgcGFja0kxNiwgdmFsdWUsIGFyZ3VtZW50c1syXSk7XG4gICAgfSxcbiAgICBzZXRJbnQzMjogZnVuY3Rpb24gc2V0SW50MzIoYnl0ZU9mZnNldCwgdmFsdWUgLyosIGxpdHRsZUVuZGlhbiAqLyl7XG4gICAgICBzZXQodGhpcywgNCwgYnl0ZU9mZnNldCwgcGFja0kzMiwgdmFsdWUsIGFyZ3VtZW50c1syXSk7XG4gICAgfSxcbiAgICBzZXRVaW50MzI6IGZ1bmN0aW9uIHNldFVpbnQzMihieXRlT2Zmc2V0LCB2YWx1ZSAvKiwgbGl0dGxlRW5kaWFuICovKXtcbiAgICAgIHNldCh0aGlzLCA0LCBieXRlT2Zmc2V0LCBwYWNrSTMyLCB2YWx1ZSwgYXJndW1lbnRzWzJdKTtcbiAgICB9LFxuICAgIHNldEZsb2F0MzI6IGZ1bmN0aW9uIHNldEZsb2F0MzIoYnl0ZU9mZnNldCwgdmFsdWUgLyosIGxpdHRsZUVuZGlhbiAqLyl7XG4gICAgICBzZXQodGhpcywgNCwgYnl0ZU9mZnNldCwgcGFja0YzMiwgdmFsdWUsIGFyZ3VtZW50c1syXSk7XG4gICAgfSxcbiAgICBzZXRGbG9hdDY0OiBmdW5jdGlvbiBzZXRGbG9hdDY0KGJ5dGVPZmZzZXQsIHZhbHVlIC8qLCBsaXR0bGVFbmRpYW4gKi8pe1xuICAgICAgc2V0KHRoaXMsIDgsIGJ5dGVPZmZzZXQsIHBhY2tGNjQsIHZhbHVlLCBhcmd1bWVudHNbMl0pO1xuICAgIH1cbiAgfSk7XG59IGVsc2Uge1xuICBpZighZmFpbHMoZnVuY3Rpb24oKXtcbiAgICBuZXcgJEFycmF5QnVmZmVyOyAgICAgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1uZXdcbiAgfSkgfHwgIWZhaWxzKGZ1bmN0aW9uKCl7XG4gICAgbmV3ICRBcnJheUJ1ZmZlciguNSk7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tbmV3XG4gIH0pKXtcbiAgICAkQXJyYXlCdWZmZXIgPSBmdW5jdGlvbiBBcnJheUJ1ZmZlcihsZW5ndGgpe1xuICAgICAgcmV0dXJuIG5ldyBCYXNlQnVmZmVyKHZhbGlkYXRlQXJyYXlCdWZmZXJBcmd1bWVudHModGhpcywgbGVuZ3RoKSk7XG4gICAgfTtcbiAgICB2YXIgQXJyYXlCdWZmZXJQcm90byA9ICRBcnJheUJ1ZmZlcltQUk9UT1RZUEVdID0gQmFzZUJ1ZmZlcltQUk9UT1RZUEVdO1xuICAgIGZvcih2YXIga2V5cyA9IGdPUE4oQmFzZUJ1ZmZlciksIGogPSAwLCBrZXk7IGtleXMubGVuZ3RoID4gajsgKXtcbiAgICAgIGlmKCEoKGtleSA9IGtleXNbaisrXSkgaW4gJEFycmF5QnVmZmVyKSloaWRlKCRBcnJheUJ1ZmZlciwga2V5LCBCYXNlQnVmZmVyW2tleV0pO1xuICAgIH07XG4gICAgaWYoIUxJQlJBUlkpQXJyYXlCdWZmZXJQcm90by5jb25zdHJ1Y3RvciA9ICRBcnJheUJ1ZmZlcjtcbiAgfVxuICAvLyBpT1MgU2FmYXJpIDcueCBidWdcbiAgdmFyIHZpZXcgPSBuZXcgJERhdGFWaWV3KG5ldyAkQXJyYXlCdWZmZXIoMikpXG4gICAgLCAkc2V0SW50OCA9ICREYXRhVmlld1tQUk9UT1RZUEVdLnNldEludDg7XG4gIHZpZXcuc2V0SW50OCgwLCAyMTQ3NDgzNjQ4KTtcbiAgdmlldy5zZXRJbnQ4KDEsIDIxNDc0ODM2NDkpO1xuICBpZih2aWV3LmdldEludDgoMCkgfHwgIXZpZXcuZ2V0SW50OCgxKSlyZWRlZmluZUFsbCgkRGF0YVZpZXdbUFJPVE9UWVBFXSwge1xuICAgIHNldEludDg6IGZ1bmN0aW9uIHNldEludDgoYnl0ZU9mZnNldCwgdmFsdWUpe1xuICAgICAgJHNldEludDguY2FsbCh0aGlzLCBieXRlT2Zmc2V0LCB2YWx1ZSA8PCAyNCA+PiAyNCk7XG4gICAgfSxcbiAgICBzZXRVaW50ODogZnVuY3Rpb24gc2V0VWludDgoYnl0ZU9mZnNldCwgdmFsdWUpe1xuICAgICAgJHNldEludDguY2FsbCh0aGlzLCBieXRlT2Zmc2V0LCB2YWx1ZSA8PCAyNCA+PiAyNCk7XG4gICAgfVxuICB9LCB0cnVlKTtcbn1cbnNldFRvU3RyaW5nVGFnKCRBcnJheUJ1ZmZlciwgQVJSQVlfQlVGRkVSKTtcbnNldFRvU3RyaW5nVGFnKCREYXRhVmlldywgREFUQV9WSUVXKTtcbmhpZGUoJERhdGFWaWV3W1BST1RPVFlQRV0sICR0eXBlZC5WSUVXLCB0cnVlKTtcbmV4cG9ydHNbQVJSQVlfQlVGRkVSXSA9ICRBcnJheUJ1ZmZlcjtcbmV4cG9ydHNbREFUQV9WSUVXXSA9ICREYXRhVmlldzsiLCJ2YXIgZ2xvYmFsID0gcmVxdWlyZSgnLi9fZ2xvYmFsJylcbiAgLCBoaWRlICAgPSByZXF1aXJlKCcuL19oaWRlJylcbiAgLCB1aWQgICAgPSByZXF1aXJlKCcuL191aWQnKVxuICAsIFRZUEVEICA9IHVpZCgndHlwZWRfYXJyYXknKVxuICAsIFZJRVcgICA9IHVpZCgndmlldycpXG4gICwgQUJWICAgID0gISEoZ2xvYmFsLkFycmF5QnVmZmVyICYmIGdsb2JhbC5EYXRhVmlldylcbiAgLCBDT05TVFIgPSBBQlZcbiAgLCBpID0gMCwgbCA9IDksIFR5cGVkO1xuXG52YXIgVHlwZWRBcnJheUNvbnN0cnVjdG9ycyA9IChcbiAgJ0ludDhBcnJheSxVaW50OEFycmF5LFVpbnQ4Q2xhbXBlZEFycmF5LEludDE2QXJyYXksVWludDE2QXJyYXksSW50MzJBcnJheSxVaW50MzJBcnJheSxGbG9hdDMyQXJyYXksRmxvYXQ2NEFycmF5J1xuKS5zcGxpdCgnLCcpO1xuXG53aGlsZShpIDwgbCl7XG4gIGlmKFR5cGVkID0gZ2xvYmFsW1R5cGVkQXJyYXlDb25zdHJ1Y3RvcnNbaSsrXV0pe1xuICAgIGhpZGUoVHlwZWQucHJvdG90eXBlLCBUWVBFRCwgdHJ1ZSk7XG4gICAgaGlkZShUeXBlZC5wcm90b3R5cGUsIFZJRVcsIHRydWUpO1xuICB9IGVsc2UgQ09OU1RSID0gZmFsc2U7XG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBBQlY6ICAgIEFCVixcbiAgQ09OU1RSOiBDT05TVFIsXG4gIFRZUEVEOiAgVFlQRUQsXG4gIFZJRVc6ICAgVklFV1xufTsiLCJ2YXIgaWQgPSAwXG4gICwgcHggPSBNYXRoLnJhbmRvbSgpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihrZXkpe1xuICByZXR1cm4gJ1N5bWJvbCgnLmNvbmNhdChrZXkgPT09IHVuZGVmaW5lZCA/ICcnIDoga2V5LCAnKV8nLCAoKytpZCArIHB4KS50b1N0cmluZygzNikpO1xufTsiLCJ2YXIgc3RvcmUgICAgICA9IHJlcXVpcmUoJy4vX3NoYXJlZCcpKCd3a3MnKVxuICAsIHVpZCAgICAgICAgPSByZXF1aXJlKCcuL191aWQnKVxuICAsIFN5bWJvbCAgICAgPSByZXF1aXJlKCcuL19nbG9iYWwnKS5TeW1ib2xcbiAgLCBVU0VfU1lNQk9MID0gdHlwZW9mIFN5bWJvbCA9PSAnZnVuY3Rpb24nO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihuYW1lKXtcbiAgcmV0dXJuIHN0b3JlW25hbWVdIHx8IChzdG9yZVtuYW1lXSA9XG4gICAgVVNFX1NZTUJPTCAmJiBTeW1ib2xbbmFtZV0gfHwgKFVTRV9TWU1CT0wgPyBTeW1ib2wgOiB1aWQpKCdTeW1ib2wuJyArIG5hbWUpKTtcbn07IiwidmFyIGNsYXNzb2YgICA9IHJlcXVpcmUoJy4vX2NsYXNzb2YnKVxuICAsIElURVJBVE9SICA9IHJlcXVpcmUoJy4vX3drcycpKCdpdGVyYXRvcicpXG4gICwgSXRlcmF0b3JzID0gcmVxdWlyZSgnLi9faXRlcmF0b3JzJyk7XG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vX2NvcmUnKS5nZXRJdGVyYXRvck1ldGhvZCA9IGZ1bmN0aW9uKGl0KXtcbiAgaWYoaXQgIT0gdW5kZWZpbmVkKXJldHVybiBpdFtJVEVSQVRPUl1cbiAgICB8fCBpdFsnQEBpdGVyYXRvciddXG4gICAgfHwgSXRlcmF0b3JzW2NsYXNzb2YoaXQpXTtcbn07IiwidmFyIGNsYXNzb2YgICA9IHJlcXVpcmUoJy4vX2NsYXNzb2YnKVxuICAsIElURVJBVE9SICA9IHJlcXVpcmUoJy4vX3drcycpKCdpdGVyYXRvcicpXG4gICwgSXRlcmF0b3JzID0gcmVxdWlyZSgnLi9faXRlcmF0b3JzJyk7XG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vX2NvcmUnKS5pc0l0ZXJhYmxlID0gZnVuY3Rpb24oaXQpe1xuICB2YXIgTyA9IE9iamVjdChpdCk7XG4gIHJldHVybiBPW0lURVJBVE9SXSAhPT0gdW5kZWZpbmVkXG4gICAgfHwgJ0BAaXRlcmF0b3InIGluIE9cbiAgICB8fCBJdGVyYXRvcnMuaGFzT3duUHJvcGVydHkoY2xhc3NvZihPKSk7XG59OyIsIi8vIGh0dHBzOi8vZ2l0aHViLmNvbS9iZW5qYW1pbmdyL1JleEV4cC5lc2NhcGVcbnZhciAkZXhwb3J0ID0gcmVxdWlyZSgnLi9fZXhwb3J0JylcbiAgLCAkcmUgICAgID0gcmVxdWlyZSgnLi9fcmVwbGFjZXInKSgvW1xcXFxeJCorPy4oKXxbXFxde31dL2csICdcXFxcJCYnKTtcblxuJGV4cG9ydCgkZXhwb3J0LlMsICdSZWdFeHAnLCB7ZXNjYXBlOiBmdW5jdGlvbiBlc2NhcGUoaXQpeyByZXR1cm4gJHJlKGl0KTsgfX0pO1xuIiwiLy8gMjIuMS4zLjMgQXJyYXkucHJvdG90eXBlLmNvcHlXaXRoaW4odGFyZ2V0LCBzdGFydCwgZW5kID0gdGhpcy5sZW5ndGgpXG52YXIgJGV4cG9ydCA9IHJlcXVpcmUoJy4vX2V4cG9ydCcpO1xuXG4kZXhwb3J0KCRleHBvcnQuUCwgJ0FycmF5Jywge2NvcHlXaXRoaW46IHJlcXVpcmUoJy4vX2FycmF5LWNvcHktd2l0aGluJyl9KTtcblxucmVxdWlyZSgnLi9fYWRkLXRvLXVuc2NvcGFibGVzJykoJ2NvcHlXaXRoaW4nKTsiLCIndXNlIHN0cmljdCc7XHJcbnZhciAkZXhwb3J0ID0gcmVxdWlyZSgnLi9fZXhwb3J0JylcclxuICAsICRldmVyeSAgPSByZXF1aXJlKCcuL19hcnJheS1tZXRob2RzJykoNCk7XHJcblxyXG4kZXhwb3J0KCRleHBvcnQuUCArICRleHBvcnQuRiAqICFyZXF1aXJlKCcuL19zdHJpY3QtbWV0aG9kJykoW10uZXZlcnksIHRydWUpLCAnQXJyYXknLCB7XHJcbiAgLy8gMjIuMS4zLjUgLyAxNS40LjQuMTYgQXJyYXkucHJvdG90eXBlLmV2ZXJ5KGNhbGxiYWNrZm4gWywgdGhpc0FyZ10pXHJcbiAgZXZlcnk6IGZ1bmN0aW9uIGV2ZXJ5KGNhbGxiYWNrZm4gLyogLCB0aGlzQXJnICovKXtcclxuICAgIHJldHVybiAkZXZlcnkodGhpcywgY2FsbGJhY2tmbiwgYXJndW1lbnRzWzFdKTtcclxuICB9XHJcbn0pOyIsIi8vIDIyLjEuMy42IEFycmF5LnByb3RvdHlwZS5maWxsKHZhbHVlLCBzdGFydCA9IDAsIGVuZCA9IHRoaXMubGVuZ3RoKVxudmFyICRleHBvcnQgPSByZXF1aXJlKCcuL19leHBvcnQnKTtcblxuJGV4cG9ydCgkZXhwb3J0LlAsICdBcnJheScsIHtmaWxsOiByZXF1aXJlKCcuL19hcnJheS1maWxsJyl9KTtcblxucmVxdWlyZSgnLi9fYWRkLXRvLXVuc2NvcGFibGVzJykoJ2ZpbGwnKTsiLCIndXNlIHN0cmljdCc7XHJcbnZhciAkZXhwb3J0ID0gcmVxdWlyZSgnLi9fZXhwb3J0JylcclxuICAsICRmaWx0ZXIgPSByZXF1aXJlKCcuL19hcnJheS1tZXRob2RzJykoMik7XHJcblxyXG4kZXhwb3J0KCRleHBvcnQuUCArICRleHBvcnQuRiAqICFyZXF1aXJlKCcuL19zdHJpY3QtbWV0aG9kJykoW10uZmlsdGVyLCB0cnVlKSwgJ0FycmF5Jywge1xyXG4gIC8vIDIyLjEuMy43IC8gMTUuNC40LjIwIEFycmF5LnByb3RvdHlwZS5maWx0ZXIoY2FsbGJhY2tmbiBbLCB0aGlzQXJnXSlcclxuICBmaWx0ZXI6IGZ1bmN0aW9uIGZpbHRlcihjYWxsYmFja2ZuIC8qICwgdGhpc0FyZyAqLyl7XHJcbiAgICByZXR1cm4gJGZpbHRlcih0aGlzLCBjYWxsYmFja2ZuLCBhcmd1bWVudHNbMV0pO1xyXG4gIH1cclxufSk7IiwiJ3VzZSBzdHJpY3QnO1xuLy8gMjIuMS4zLjkgQXJyYXkucHJvdG90eXBlLmZpbmRJbmRleChwcmVkaWNhdGUsIHRoaXNBcmcgPSB1bmRlZmluZWQpXG52YXIgJGV4cG9ydCA9IHJlcXVpcmUoJy4vX2V4cG9ydCcpXG4gICwgJGZpbmQgICA9IHJlcXVpcmUoJy4vX2FycmF5LW1ldGhvZHMnKSg2KVxuICAsIEtFWSAgICAgPSAnZmluZEluZGV4J1xuICAsIGZvcmNlZCAgPSB0cnVlO1xuLy8gU2hvdWxkbid0IHNraXAgaG9sZXNcbmlmKEtFWSBpbiBbXSlBcnJheSgxKVtLRVldKGZ1bmN0aW9uKCl7IGZvcmNlZCA9IGZhbHNlOyB9KTtcbiRleHBvcnQoJGV4cG9ydC5QICsgJGV4cG9ydC5GICogZm9yY2VkLCAnQXJyYXknLCB7XG4gIGZpbmRJbmRleDogZnVuY3Rpb24gZmluZEluZGV4KGNhbGxiYWNrZm4vKiwgdGhhdCA9IHVuZGVmaW5lZCAqLyl7XG4gICAgcmV0dXJuICRmaW5kKHRoaXMsIGNhbGxiYWNrZm4sIGFyZ3VtZW50cy5sZW5ndGggPiAxID8gYXJndW1lbnRzWzFdIDogdW5kZWZpbmVkKTtcbiAgfVxufSk7XG5yZXF1aXJlKCcuL19hZGQtdG8tdW5zY29wYWJsZXMnKShLRVkpOyIsIid1c2Ugc3RyaWN0Jztcbi8vIDIyLjEuMy44IEFycmF5LnByb3RvdHlwZS5maW5kKHByZWRpY2F0ZSwgdGhpc0FyZyA9IHVuZGVmaW5lZClcbnZhciAkZXhwb3J0ID0gcmVxdWlyZSgnLi9fZXhwb3J0JylcbiAgLCAkZmluZCAgID0gcmVxdWlyZSgnLi9fYXJyYXktbWV0aG9kcycpKDUpXG4gICwgS0VZICAgICA9ICdmaW5kJ1xuICAsIGZvcmNlZCAgPSB0cnVlO1xuLy8gU2hvdWxkbid0IHNraXAgaG9sZXNcbmlmKEtFWSBpbiBbXSlBcnJheSgxKVtLRVldKGZ1bmN0aW9uKCl7IGZvcmNlZCA9IGZhbHNlOyB9KTtcbiRleHBvcnQoJGV4cG9ydC5QICsgJGV4cG9ydC5GICogZm9yY2VkLCAnQXJyYXknLCB7XG4gIGZpbmQ6IGZ1bmN0aW9uIGZpbmQoY2FsbGJhY2tmbi8qLCB0aGF0ID0gdW5kZWZpbmVkICovKXtcbiAgICByZXR1cm4gJGZpbmQodGhpcywgY2FsbGJhY2tmbiwgYXJndW1lbnRzLmxlbmd0aCA+IDEgPyBhcmd1bWVudHNbMV0gOiB1bmRlZmluZWQpO1xuICB9XG59KTtcbnJlcXVpcmUoJy4vX2FkZC10by11bnNjb3BhYmxlcycpKEtFWSk7IiwiJ3VzZSBzdHJpY3QnO1xyXG52YXIgJGV4cG9ydCAgPSByZXF1aXJlKCcuL19leHBvcnQnKVxyXG4gICwgJGZvckVhY2ggPSByZXF1aXJlKCcuL19hcnJheS1tZXRob2RzJykoMClcclxuICAsIFNUUklDVCAgID0gcmVxdWlyZSgnLi9fc3RyaWN0LW1ldGhvZCcpKFtdLmZvckVhY2gsIHRydWUpO1xyXG5cclxuJGV4cG9ydCgkZXhwb3J0LlAgKyAkZXhwb3J0LkYgKiAhU1RSSUNULCAnQXJyYXknLCB7XHJcbiAgLy8gMjIuMS4zLjEwIC8gMTUuNC40LjE4IEFycmF5LnByb3RvdHlwZS5mb3JFYWNoKGNhbGxiYWNrZm4gWywgdGhpc0FyZ10pXHJcbiAgZm9yRWFjaDogZnVuY3Rpb24gZm9yRWFjaChjYWxsYmFja2ZuIC8qICwgdGhpc0FyZyAqLyl7XHJcbiAgICByZXR1cm4gJGZvckVhY2godGhpcywgY2FsbGJhY2tmbiwgYXJndW1lbnRzWzFdKTtcclxuICB9XHJcbn0pOyIsIid1c2Ugc3RyaWN0JztcbnZhciBjdHggICAgICAgICA9IHJlcXVpcmUoJy4vX2N0eCcpXG4gICwgJGV4cG9ydCAgICAgPSByZXF1aXJlKCcuL19leHBvcnQnKVxuICAsIHRvT2JqZWN0ICAgID0gcmVxdWlyZSgnLi9fdG8tb2JqZWN0JylcbiAgLCBjYWxsICAgICAgICA9IHJlcXVpcmUoJy4vX2l0ZXItY2FsbCcpXG4gICwgaXNBcnJheUl0ZXIgPSByZXF1aXJlKCcuL19pcy1hcnJheS1pdGVyJylcbiAgLCB0b0xlbmd0aCAgICA9IHJlcXVpcmUoJy4vX3RvLWxlbmd0aCcpXG4gICwgZ2V0SXRlckZuICAgPSByZXF1aXJlKCcuL2NvcmUuZ2V0LWl0ZXJhdG9yLW1ldGhvZCcpO1xuJGV4cG9ydCgkZXhwb3J0LlMgKyAkZXhwb3J0LkYgKiAhcmVxdWlyZSgnLi9faXRlci1kZXRlY3QnKShmdW5jdGlvbihpdGVyKXsgQXJyYXkuZnJvbShpdGVyKTsgfSksICdBcnJheScsIHtcbiAgLy8gMjIuMS4yLjEgQXJyYXkuZnJvbShhcnJheUxpa2UsIG1hcGZuID0gdW5kZWZpbmVkLCB0aGlzQXJnID0gdW5kZWZpbmVkKVxuICBmcm9tOiBmdW5jdGlvbiBmcm9tKGFycmF5TGlrZS8qLCBtYXBmbiA9IHVuZGVmaW5lZCwgdGhpc0FyZyA9IHVuZGVmaW5lZCovKXtcbiAgICB2YXIgTyAgICAgICA9IHRvT2JqZWN0KGFycmF5TGlrZSlcbiAgICAgICwgQyAgICAgICA9IHR5cGVvZiB0aGlzID09ICdmdW5jdGlvbicgPyB0aGlzIDogQXJyYXlcbiAgICAgICwgYUxlbiAgICA9IGFyZ3VtZW50cy5sZW5ndGhcbiAgICAgICwgbWFwZm4gICA9IGFMZW4gPiAxID8gYXJndW1lbnRzWzFdIDogdW5kZWZpbmVkXG4gICAgICAsIG1hcHBpbmcgPSBtYXBmbiAhPT0gdW5kZWZpbmVkXG4gICAgICAsIGluZGV4ICAgPSAwXG4gICAgICAsIGl0ZXJGbiAgPSBnZXRJdGVyRm4oTylcbiAgICAgICwgbGVuZ3RoLCByZXN1bHQsIHN0ZXAsIGl0ZXJhdG9yO1xuICAgIGlmKG1hcHBpbmcpbWFwZm4gPSBjdHgobWFwZm4sIGFMZW4gPiAyID8gYXJndW1lbnRzWzJdIDogdW5kZWZpbmVkLCAyKTtcbiAgICAvLyBpZiBvYmplY3QgaXNuJ3QgaXRlcmFibGUgb3IgaXQncyBhcnJheSB3aXRoIGRlZmF1bHQgaXRlcmF0b3IgLSB1c2Ugc2ltcGxlIGNhc2VcbiAgICBpZihpdGVyRm4gIT0gdW5kZWZpbmVkICYmICEoQyA9PSBBcnJheSAmJiBpc0FycmF5SXRlcihpdGVyRm4pKSl7XG4gICAgICBmb3IoaXRlcmF0b3IgPSBpdGVyRm4uY2FsbChPKSwgcmVzdWx0ID0gbmV3IEM7ICEoc3RlcCA9IGl0ZXJhdG9yLm5leHQoKSkuZG9uZTsgaW5kZXgrKyl7XG4gICAgICAgIHJlc3VsdFtpbmRleF0gPSBtYXBwaW5nID8gY2FsbChpdGVyYXRvciwgbWFwZm4sIFtzdGVwLnZhbHVlLCBpbmRleF0sIHRydWUpIDogc3RlcC52YWx1ZTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgbGVuZ3RoID0gdG9MZW5ndGgoTy5sZW5ndGgpO1xuICAgICAgZm9yKHJlc3VsdCA9IG5ldyBDKGxlbmd0aCk7IGxlbmd0aCA+IGluZGV4OyBpbmRleCsrKXtcbiAgICAgICAgcmVzdWx0W2luZGV4XSA9IG1hcHBpbmcgPyBtYXBmbihPW2luZGV4XSwgaW5kZXgpIDogT1tpbmRleF07XG4gICAgICB9XG4gICAgfVxuICAgIHJlc3VsdC5sZW5ndGggPSBpbmRleDtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG59KTtcbiIsIid1c2Ugc3RyaWN0JztcclxudmFyICRleHBvcnQgID0gcmVxdWlyZSgnLi9fZXhwb3J0JylcclxuICAsICRpbmRleE9mID0gcmVxdWlyZSgnLi9fYXJyYXktaW5jbHVkZXMnKShmYWxzZSk7XHJcblxyXG4kZXhwb3J0KCRleHBvcnQuUCArICRleHBvcnQuRiAqICFyZXF1aXJlKCcuL19zdHJpY3QtbWV0aG9kJykoW10uaW5kZXhPZiksICdBcnJheScsIHtcclxuICAvLyAyMi4xLjMuMTEgLyAxNS40LjQuMTQgQXJyYXkucHJvdG90eXBlLmluZGV4T2Yoc2VhcmNoRWxlbWVudCBbLCBmcm9tSW5kZXhdKVxyXG4gIGluZGV4T2Y6IGZ1bmN0aW9uIGluZGV4T2Yoc2VhcmNoRWxlbWVudCAvKiwgZnJvbUluZGV4ID0gMCAqLyl7XHJcbiAgICByZXR1cm4gJGluZGV4T2YodGhpcywgc2VhcmNoRWxlbWVudCwgYXJndW1lbnRzWzFdKTtcclxuICB9XHJcbn0pOyIsIi8vIDIyLjEuMi4yIC8gMTUuNC4zLjIgQXJyYXkuaXNBcnJheShhcmcpXHJcbnZhciAkZXhwb3J0ID0gcmVxdWlyZSgnLi9fZXhwb3J0Jyk7XHJcblxyXG4kZXhwb3J0KCRleHBvcnQuUywgJ0FycmF5Jywge2lzQXJyYXk6IHJlcXVpcmUoJy4vX2lzLWFycmF5Jyl9KTsiLCIndXNlIHN0cmljdCc7XG52YXIgYWRkVG9VbnNjb3BhYmxlcyA9IHJlcXVpcmUoJy4vX2FkZC10by11bnNjb3BhYmxlcycpXG4gICwgc3RlcCAgICAgICAgICAgICA9IHJlcXVpcmUoJy4vX2l0ZXItc3RlcCcpXG4gICwgSXRlcmF0b3JzICAgICAgICA9IHJlcXVpcmUoJy4vX2l0ZXJhdG9ycycpXG4gICwgdG9JT2JqZWN0ICAgICAgICA9IHJlcXVpcmUoJy4vX3RvLWlvYmplY3QnKTtcblxuLy8gMjIuMS4zLjQgQXJyYXkucHJvdG90eXBlLmVudHJpZXMoKVxuLy8gMjIuMS4zLjEzIEFycmF5LnByb3RvdHlwZS5rZXlzKClcbi8vIDIyLjEuMy4yOSBBcnJheS5wcm90b3R5cGUudmFsdWVzKClcbi8vIDIyLjEuMy4zMCBBcnJheS5wcm90b3R5cGVbQEBpdGVyYXRvcl0oKVxubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL19pdGVyLWRlZmluZScpKEFycmF5LCAnQXJyYXknLCBmdW5jdGlvbihpdGVyYXRlZCwga2luZCl7XG4gIHRoaXMuX3QgPSB0b0lPYmplY3QoaXRlcmF0ZWQpOyAvLyB0YXJnZXRcbiAgdGhpcy5faSA9IDA7ICAgICAgICAgICAgICAgICAgIC8vIG5leHQgaW5kZXhcbiAgdGhpcy5fayA9IGtpbmQ7ICAgICAgICAgICAgICAgIC8vIGtpbmRcbi8vIDIyLjEuNS4yLjEgJUFycmF5SXRlcmF0b3JQcm90b3R5cGUlLm5leHQoKVxufSwgZnVuY3Rpb24oKXtcbiAgdmFyIE8gICAgID0gdGhpcy5fdFxuICAgICwga2luZCAgPSB0aGlzLl9rXG4gICAgLCBpbmRleCA9IHRoaXMuX2krKztcbiAgaWYoIU8gfHwgaW5kZXggPj0gTy5sZW5ndGgpe1xuICAgIHRoaXMuX3QgPSB1bmRlZmluZWQ7XG4gICAgcmV0dXJuIHN0ZXAoMSk7XG4gIH1cbiAgaWYoa2luZCA9PSAna2V5cycgIClyZXR1cm4gc3RlcCgwLCBpbmRleCk7XG4gIGlmKGtpbmQgPT0gJ3ZhbHVlcycpcmV0dXJuIHN0ZXAoMCwgT1tpbmRleF0pO1xuICByZXR1cm4gc3RlcCgwLCBbaW5kZXgsIE9baW5kZXhdXSk7XG59LCAndmFsdWVzJyk7XG5cbi8vIGFyZ3VtZW50c0xpc3RbQEBpdGVyYXRvcl0gaXMgJUFycmF5UHJvdG9fdmFsdWVzJSAoOS40LjQuNiwgOS40LjQuNylcbkl0ZXJhdG9ycy5Bcmd1bWVudHMgPSBJdGVyYXRvcnMuQXJyYXk7XG5cbmFkZFRvVW5zY29wYWJsZXMoJ2tleXMnKTtcbmFkZFRvVW5zY29wYWJsZXMoJ3ZhbHVlcycpO1xuYWRkVG9VbnNjb3BhYmxlcygnZW50cmllcycpOyIsIid1c2Ugc3RyaWN0JztcclxuLy8gMjIuMS4zLjEzIEFycmF5LnByb3RvdHlwZS5qb2luKHNlcGFyYXRvcilcclxudmFyICRleHBvcnQgICA9IHJlcXVpcmUoJy4vX2V4cG9ydCcpXHJcbiAgLCB0b0lPYmplY3QgPSByZXF1aXJlKCcuL190by1pb2JqZWN0JylcclxuICAsIGFycmF5Sm9pbiA9IFtdLmpvaW47XHJcblxyXG4vLyBmYWxsYmFjayBmb3Igbm90IGFycmF5LWxpa2Ugc3RyaW5nc1xyXG4kZXhwb3J0KCRleHBvcnQuUCArICRleHBvcnQuRiAqIChyZXF1aXJlKCcuL19pb2JqZWN0JykgIT0gT2JqZWN0IHx8ICFyZXF1aXJlKCcuL19zdHJpY3QtbWV0aG9kJykoYXJyYXlKb2luKSksICdBcnJheScsIHtcclxuICBqb2luOiBmdW5jdGlvbiBqb2luKHNlcGFyYXRvcil7XHJcbiAgICByZXR1cm4gYXJyYXlKb2luLmNhbGwodG9JT2JqZWN0KHRoaXMpLCBzZXBhcmF0b3IgPT09IHVuZGVmaW5lZCA/ICcsJyA6IHNlcGFyYXRvcik7XHJcbiAgfVxyXG59KTsiLCIndXNlIHN0cmljdCc7XHJcbnZhciAkZXhwb3J0ICAgPSByZXF1aXJlKCcuL19leHBvcnQnKVxyXG4gICwgdG9JT2JqZWN0ID0gcmVxdWlyZSgnLi9fdG8taW9iamVjdCcpXHJcbiAgLCB0b0ludGVnZXIgPSByZXF1aXJlKCcuL190by1pbnRlZ2VyJylcclxuICAsIHRvTGVuZ3RoICA9IHJlcXVpcmUoJy4vX3RvLWxlbmd0aCcpO1xyXG5cclxuJGV4cG9ydCgkZXhwb3J0LlAgKyAkZXhwb3J0LkYgKiAhcmVxdWlyZSgnLi9fc3RyaWN0LW1ldGhvZCcpKFtdLmxhc3RJbmRleE9mKSwgJ0FycmF5Jywge1xyXG4gIC8vIDIyLjEuMy4xNCAvIDE1LjQuNC4xNSBBcnJheS5wcm90b3R5cGUubGFzdEluZGV4T2Yoc2VhcmNoRWxlbWVudCBbLCBmcm9tSW5kZXhdKVxyXG4gIGxhc3RJbmRleE9mOiBmdW5jdGlvbiBsYXN0SW5kZXhPZihzZWFyY2hFbGVtZW50IC8qLCBmcm9tSW5kZXggPSBAWyotMV0gKi8pe1xyXG4gICAgdmFyIE8gICAgICA9IHRvSU9iamVjdCh0aGlzKVxyXG4gICAgICAsIGxlbmd0aCA9IHRvTGVuZ3RoKE8ubGVuZ3RoKVxyXG4gICAgICAsIGluZGV4ICA9IGxlbmd0aCAtIDE7XHJcbiAgICBpZihhcmd1bWVudHMubGVuZ3RoID4gMSlpbmRleCA9IE1hdGgubWluKGluZGV4LCB0b0ludGVnZXIoYXJndW1lbnRzWzFdKSk7XHJcbiAgICBpZihpbmRleCA8IDApaW5kZXggPSBsZW5ndGggKyBpbmRleDtcclxuICAgIGZvcig7aW5kZXggPj0gMDsgaW5kZXgtLSlpZihpbmRleCBpbiBPKWlmKE9baW5kZXhdID09PSBzZWFyY2hFbGVtZW50KXJldHVybiBpbmRleDtcclxuICAgIHJldHVybiAtMTtcclxuICB9XHJcbn0pOyIsIid1c2Ugc3RyaWN0JztcclxudmFyICRleHBvcnQgPSByZXF1aXJlKCcuL19leHBvcnQnKVxyXG4gICwgJG1hcCAgICA9IHJlcXVpcmUoJy4vX2FycmF5LW1ldGhvZHMnKSgxKTtcclxuXHJcbiRleHBvcnQoJGV4cG9ydC5QICsgJGV4cG9ydC5GICogIXJlcXVpcmUoJy4vX3N0cmljdC1tZXRob2QnKShbXS5tYXAsIHRydWUpLCAnQXJyYXknLCB7XHJcbiAgLy8gMjIuMS4zLjE1IC8gMTUuNC40LjE5IEFycmF5LnByb3RvdHlwZS5tYXAoY2FsbGJhY2tmbiBbLCB0aGlzQXJnXSlcclxuICBtYXA6IGZ1bmN0aW9uIG1hcChjYWxsYmFja2ZuIC8qICwgdGhpc0FyZyAqLyl7XHJcbiAgICByZXR1cm4gJG1hcCh0aGlzLCBjYWxsYmFja2ZuLCBhcmd1bWVudHNbMV0pO1xyXG4gIH1cclxufSk7IiwiJ3VzZSBzdHJpY3QnO1xudmFyICRleHBvcnQgPSByZXF1aXJlKCcuL19leHBvcnQnKTtcblxuLy8gV2ViS2l0IEFycmF5Lm9mIGlzbid0IGdlbmVyaWNcbiRleHBvcnQoJGV4cG9ydC5TICsgJGV4cG9ydC5GICogcmVxdWlyZSgnLi9fZmFpbHMnKShmdW5jdGlvbigpe1xuICBmdW5jdGlvbiBGKCl7fVxuICByZXR1cm4gIShBcnJheS5vZi5jYWxsKEYpIGluc3RhbmNlb2YgRik7XG59KSwgJ0FycmF5Jywge1xuICAvLyAyMi4xLjIuMyBBcnJheS5vZiggLi4uaXRlbXMpXG4gIG9mOiBmdW5jdGlvbiBvZigvKiAuLi5hcmdzICovKXtcbiAgICB2YXIgaW5kZXggID0gMFxuICAgICAgLCBhTGVuICAgPSBhcmd1bWVudHMubGVuZ3RoXG4gICAgICAsIHJlc3VsdCA9IG5ldyAodHlwZW9mIHRoaXMgPT0gJ2Z1bmN0aW9uJyA/IHRoaXMgOiBBcnJheSkoYUxlbik7XG4gICAgd2hpbGUoYUxlbiA+IGluZGV4KXJlc3VsdFtpbmRleF0gPSBhcmd1bWVudHNbaW5kZXgrK107XG4gICAgcmVzdWx0Lmxlbmd0aCA9IGFMZW47XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxufSk7IiwiJ3VzZSBzdHJpY3QnO1xyXG52YXIgJGV4cG9ydCA9IHJlcXVpcmUoJy4vX2V4cG9ydCcpXHJcbiAgLCAkcmVkdWNlID0gcmVxdWlyZSgnLi9fYXJyYXktcmVkdWNlJyk7XHJcblxyXG4kZXhwb3J0KCRleHBvcnQuUCArICRleHBvcnQuRiAqICFyZXF1aXJlKCcuL19zdHJpY3QtbWV0aG9kJykoW10ucmVkdWNlUmlnaHQsIHRydWUpLCAnQXJyYXknLCB7XHJcbiAgLy8gMjIuMS4zLjE5IC8gMTUuNC40LjIyIEFycmF5LnByb3RvdHlwZS5yZWR1Y2VSaWdodChjYWxsYmFja2ZuIFssIGluaXRpYWxWYWx1ZV0pXHJcbiAgcmVkdWNlUmlnaHQ6IGZ1bmN0aW9uIHJlZHVjZVJpZ2h0KGNhbGxiYWNrZm4gLyogLCBpbml0aWFsVmFsdWUgKi8pe1xyXG4gICAgcmV0dXJuICRyZWR1Y2UodGhpcywgY2FsbGJhY2tmbiwgYXJndW1lbnRzLmxlbmd0aCwgYXJndW1lbnRzWzFdLCB0cnVlKTtcclxuICB9XHJcbn0pOyIsIid1c2Ugc3RyaWN0JztcclxudmFyICRleHBvcnQgPSByZXF1aXJlKCcuL19leHBvcnQnKVxyXG4gICwgJHJlZHVjZSA9IHJlcXVpcmUoJy4vX2FycmF5LXJlZHVjZScpO1xyXG5cclxuJGV4cG9ydCgkZXhwb3J0LlAgKyAkZXhwb3J0LkYgKiAhcmVxdWlyZSgnLi9fc3RyaWN0LW1ldGhvZCcpKFtdLnJlZHVjZSwgdHJ1ZSksICdBcnJheScsIHtcclxuICAvLyAyMi4xLjMuMTggLyAxNS40LjQuMjEgQXJyYXkucHJvdG90eXBlLnJlZHVjZShjYWxsYmFja2ZuIFssIGluaXRpYWxWYWx1ZV0pXHJcbiAgcmVkdWNlOiBmdW5jdGlvbiByZWR1Y2UoY2FsbGJhY2tmbiAvKiAsIGluaXRpYWxWYWx1ZSAqLyl7XHJcbiAgICByZXR1cm4gJHJlZHVjZSh0aGlzLCBjYWxsYmFja2ZuLCBhcmd1bWVudHMubGVuZ3RoLCBhcmd1bWVudHNbMV0sIGZhbHNlKTtcclxuICB9XHJcbn0pOyIsIid1c2Ugc3RyaWN0JztcclxudmFyICRleHBvcnQgICAgPSByZXF1aXJlKCcuL19leHBvcnQnKVxyXG4gICwgaHRtbCAgICAgICA9IHJlcXVpcmUoJy4vX2h0bWwnKVxyXG4gICwgY29mICAgICAgICA9IHJlcXVpcmUoJy4vX2NvZicpXHJcbiAgLCB0b0luZGV4ICAgID0gcmVxdWlyZSgnLi9fdG8taW5kZXgnKVxyXG4gICwgdG9MZW5ndGggICA9IHJlcXVpcmUoJy4vX3RvLWxlbmd0aCcpXHJcbiAgLCBhcnJheVNsaWNlID0gW10uc2xpY2U7XHJcblxyXG4vLyBmYWxsYmFjayBmb3Igbm90IGFycmF5LWxpa2UgRVMzIHN0cmluZ3MgYW5kIERPTSBvYmplY3RzXHJcbiRleHBvcnQoJGV4cG9ydC5QICsgJGV4cG9ydC5GICogcmVxdWlyZSgnLi9fZmFpbHMnKShmdW5jdGlvbigpe1xyXG4gIGlmKGh0bWwpYXJyYXlTbGljZS5jYWxsKGh0bWwpO1xyXG59KSwgJ0FycmF5Jywge1xyXG4gIHNsaWNlOiBmdW5jdGlvbiBzbGljZShiZWdpbiwgZW5kKXtcclxuICAgIHZhciBsZW4gICA9IHRvTGVuZ3RoKHRoaXMubGVuZ3RoKVxyXG4gICAgICAsIGtsYXNzID0gY29mKHRoaXMpO1xyXG4gICAgZW5kID0gZW5kID09PSB1bmRlZmluZWQgPyBsZW4gOiBlbmQ7XHJcbiAgICBpZihrbGFzcyA9PSAnQXJyYXknKXJldHVybiBhcnJheVNsaWNlLmNhbGwodGhpcywgYmVnaW4sIGVuZCk7XHJcbiAgICB2YXIgc3RhcnQgID0gdG9JbmRleChiZWdpbiwgbGVuKVxyXG4gICAgICAsIHVwVG8gICA9IHRvSW5kZXgoZW5kLCBsZW4pXHJcbiAgICAgICwgc2l6ZSAgID0gdG9MZW5ndGgodXBUbyAtIHN0YXJ0KVxyXG4gICAgICAsIGNsb25lZCA9IEFycmF5KHNpemUpXHJcbiAgICAgICwgaSAgICAgID0gMDtcclxuICAgIGZvcig7IGkgPCBzaXplOyBpKyspY2xvbmVkW2ldID0ga2xhc3MgPT0gJ1N0cmluZydcclxuICAgICAgPyB0aGlzLmNoYXJBdChzdGFydCArIGkpXHJcbiAgICAgIDogdGhpc1tzdGFydCArIGldO1xyXG4gICAgcmV0dXJuIGNsb25lZDtcclxuICB9XHJcbn0pOyIsIid1c2Ugc3RyaWN0JztcclxudmFyICRleHBvcnQgPSByZXF1aXJlKCcuL19leHBvcnQnKVxyXG4gICwgJHNvbWUgICA9IHJlcXVpcmUoJy4vX2FycmF5LW1ldGhvZHMnKSgzKTtcclxuXHJcbiRleHBvcnQoJGV4cG9ydC5QICsgJGV4cG9ydC5GICogIXJlcXVpcmUoJy4vX3N0cmljdC1tZXRob2QnKShbXS5zb21lLCB0cnVlKSwgJ0FycmF5Jywge1xyXG4gIC8vIDIyLjEuMy4yMyAvIDE1LjQuNC4xNyBBcnJheS5wcm90b3R5cGUuc29tZShjYWxsYmFja2ZuIFssIHRoaXNBcmddKVxyXG4gIHNvbWU6IGZ1bmN0aW9uIHNvbWUoY2FsbGJhY2tmbiAvKiAsIHRoaXNBcmcgKi8pe1xyXG4gICAgcmV0dXJuICRzb21lKHRoaXMsIGNhbGxiYWNrZm4sIGFyZ3VtZW50c1sxXSk7XHJcbiAgfVxyXG59KTsiLCIndXNlIHN0cmljdCc7XHJcbnZhciAkZXhwb3J0ICAgPSByZXF1aXJlKCcuL19leHBvcnQnKVxyXG4gICwgYUZ1bmN0aW9uID0gcmVxdWlyZSgnLi9fYS1mdW5jdGlvbicpXHJcbiAgLCB0b09iamVjdCAgPSByZXF1aXJlKCcuL190by1vYmplY3QnKVxyXG4gICwgZmFpbHMgICAgID0gcmVxdWlyZSgnLi9fZmFpbHMnKVxyXG4gICwgJHNvcnQgICAgID0gW10uc29ydFxyXG4gICwgdGVzdCAgICAgID0gWzEsIDIsIDNdO1xyXG5cclxuJGV4cG9ydCgkZXhwb3J0LlAgKyAkZXhwb3J0LkYgKiAoZmFpbHMoZnVuY3Rpb24oKXtcclxuICAvLyBJRTgtXHJcbiAgdGVzdC5zb3J0KHVuZGVmaW5lZCk7XHJcbn0pIHx8ICFmYWlscyhmdW5jdGlvbigpe1xyXG4gIC8vIFY4IGJ1Z1xyXG4gIHRlc3Quc29ydChudWxsKTtcclxuICAvLyBPbGQgV2ViS2l0XHJcbn0pIHx8ICFyZXF1aXJlKCcuL19zdHJpY3QtbWV0aG9kJykoJHNvcnQpKSwgJ0FycmF5Jywge1xyXG4gIC8vIDIyLjEuMy4yNSBBcnJheS5wcm90b3R5cGUuc29ydChjb21wYXJlZm4pXHJcbiAgc29ydDogZnVuY3Rpb24gc29ydChjb21wYXJlZm4pe1xyXG4gICAgcmV0dXJuIGNvbXBhcmVmbiA9PT0gdW5kZWZpbmVkXHJcbiAgICAgID8gJHNvcnQuY2FsbCh0b09iamVjdCh0aGlzKSlcclxuICAgICAgOiAkc29ydC5jYWxsKHRvT2JqZWN0KHRoaXMpLCBhRnVuY3Rpb24oY29tcGFyZWZuKSk7XHJcbiAgfVxyXG59KTsiLCJyZXF1aXJlKCcuL19zZXQtc3BlY2llcycpKCdBcnJheScpOyIsIi8vIDIwLjMuMy4xIC8gMTUuOS40LjQgRGF0ZS5ub3coKVxyXG52YXIgJGV4cG9ydCA9IHJlcXVpcmUoJy4vX2V4cG9ydCcpO1xyXG5cclxuJGV4cG9ydCgkZXhwb3J0LlMsICdEYXRlJywge25vdzogZnVuY3Rpb24oKXsgcmV0dXJuIG5ldyBEYXRlKCkuZ2V0VGltZSgpOyB9fSk7IiwiJ3VzZSBzdHJpY3QnO1xyXG4vLyAyMC4zLjQuMzYgLyAxNS45LjUuNDMgRGF0ZS5wcm90b3R5cGUudG9JU09TdHJpbmcoKVxyXG52YXIgJGV4cG9ydCA9IHJlcXVpcmUoJy4vX2V4cG9ydCcpXHJcbiAgLCBmYWlscyAgID0gcmVxdWlyZSgnLi9fZmFpbHMnKVxyXG4gICwgZ2V0VGltZSA9IERhdGUucHJvdG90eXBlLmdldFRpbWU7XHJcblxyXG52YXIgbHogPSBmdW5jdGlvbihudW0pe1xyXG4gIHJldHVybiBudW0gPiA5ID8gbnVtIDogJzAnICsgbnVtO1xyXG59O1xyXG5cclxuLy8gUGhhbnRvbUpTIC8gb2xkIFdlYktpdCBoYXMgYSBicm9rZW4gaW1wbGVtZW50YXRpb25zXHJcbiRleHBvcnQoJGV4cG9ydC5QICsgJGV4cG9ydC5GICogKGZhaWxzKGZ1bmN0aW9uKCl7XHJcbiAgcmV0dXJuIG5ldyBEYXRlKC01ZTEzIC0gMSkudG9JU09TdHJpbmcoKSAhPSAnMDM4NS0wNy0yNVQwNzowNjozOS45OTlaJztcclxufSkgfHwgIWZhaWxzKGZ1bmN0aW9uKCl7XHJcbiAgbmV3IERhdGUoTmFOKS50b0lTT1N0cmluZygpO1xyXG59KSksICdEYXRlJywge1xyXG4gIHRvSVNPU3RyaW5nOiBmdW5jdGlvbiB0b0lTT1N0cmluZygpe1xyXG4gICAgaWYoIWlzRmluaXRlKGdldFRpbWUuY2FsbCh0aGlzKSkpdGhyb3cgUmFuZ2VFcnJvcignSW52YWxpZCB0aW1lIHZhbHVlJyk7XHJcbiAgICB2YXIgZCA9IHRoaXNcclxuICAgICAgLCB5ID0gZC5nZXRVVENGdWxsWWVhcigpXHJcbiAgICAgICwgbSA9IGQuZ2V0VVRDTWlsbGlzZWNvbmRzKClcclxuICAgICAgLCBzID0geSA8IDAgPyAnLScgOiB5ID4gOTk5OSA/ICcrJyA6ICcnO1xyXG4gICAgcmV0dXJuIHMgKyAoJzAwMDAwJyArIE1hdGguYWJzKHkpKS5zbGljZShzID8gLTYgOiAtNCkgK1xyXG4gICAgICAnLScgKyBseihkLmdldFVUQ01vbnRoKCkgKyAxKSArICctJyArIGx6KGQuZ2V0VVRDRGF0ZSgpKSArXHJcbiAgICAgICdUJyArIGx6KGQuZ2V0VVRDSG91cnMoKSkgKyAnOicgKyBseihkLmdldFVUQ01pbnV0ZXMoKSkgK1xyXG4gICAgICAnOicgKyBseihkLmdldFVUQ1NlY29uZHMoKSkgKyAnLicgKyAobSA+IDk5ID8gbSA6ICcwJyArIGx6KG0pKSArICdaJztcclxuICB9XHJcbn0pOyIsIid1c2Ugc3RyaWN0JztcbnZhciAkZXhwb3J0ICAgICA9IHJlcXVpcmUoJy4vX2V4cG9ydCcpXG4gICwgdG9PYmplY3QgICAgPSByZXF1aXJlKCcuL190by1vYmplY3QnKVxuICAsIHRvUHJpbWl0aXZlID0gcmVxdWlyZSgnLi9fdG8tcHJpbWl0aXZlJyk7XG5cbiRleHBvcnQoJGV4cG9ydC5QICsgJGV4cG9ydC5GICogcmVxdWlyZSgnLi9fZmFpbHMnKShmdW5jdGlvbigpe1xuICByZXR1cm4gbmV3IERhdGUoTmFOKS50b0pTT04oKSAhPT0gbnVsbCB8fCBEYXRlLnByb3RvdHlwZS50b0pTT04uY2FsbCh7dG9JU09TdHJpbmc6IGZ1bmN0aW9uKCl7IHJldHVybiAxOyB9fSkgIT09IDE7XG59KSwgJ0RhdGUnLCB7XG4gIHRvSlNPTjogZnVuY3Rpb24gdG9KU09OKGtleSl7XG4gICAgdmFyIE8gID0gdG9PYmplY3QodGhpcylcbiAgICAgICwgcHYgPSB0b1ByaW1pdGl2ZShPKTtcbiAgICByZXR1cm4gdHlwZW9mIHB2ID09ICdudW1iZXInICYmICFpc0Zpbml0ZShwdikgPyBudWxsIDogTy50b0lTT1N0cmluZygpO1xuICB9XG59KTsiLCJ2YXIgVE9fUFJJTUlUSVZFID0gcmVxdWlyZSgnLi9fd2tzJykoJ3RvUHJpbWl0aXZlJylcclxuICAsIHByb3RvICAgICAgICA9IERhdGUucHJvdG90eXBlO1xyXG5cclxuaWYoIShUT19QUklNSVRJVkUgaW4gcHJvdG8pKXJlcXVpcmUoJy4vX2hpZGUnKShwcm90bywgVE9fUFJJTUlUSVZFLCByZXF1aXJlKCcuL19kYXRlLXRvLXByaW1pdGl2ZScpKTsiLCJ2YXIgRGF0ZVByb3RvICAgID0gRGF0ZS5wcm90b3R5cGVcbiAgLCBJTlZBTElEX0RBVEUgPSAnSW52YWxpZCBEYXRlJ1xuICAsIFRPX1NUUklORyAgICA9ICd0b1N0cmluZydcbiAgLCAkdG9TdHJpbmcgICAgPSBEYXRlUHJvdG9bVE9fU1RSSU5HXVxuICAsIGdldFRpbWUgICAgICA9IERhdGVQcm90by5nZXRUaW1lO1xuaWYobmV3IERhdGUoTmFOKSArICcnICE9IElOVkFMSURfREFURSl7XG4gIHJlcXVpcmUoJy4vX3JlZGVmaW5lJykoRGF0ZVByb3RvLCBUT19TVFJJTkcsIGZ1bmN0aW9uIHRvU3RyaW5nKCl7XG4gICAgdmFyIHZhbHVlID0gZ2V0VGltZS5jYWxsKHRoaXMpO1xuICAgIHJldHVybiB2YWx1ZSA9PT0gdmFsdWUgPyAkdG9TdHJpbmcuY2FsbCh0aGlzKSA6IElOVkFMSURfREFURTtcbiAgfSk7XG59IiwiLy8gMTkuMi4zLjIgLyAxNS4zLjQuNSBGdW5jdGlvbi5wcm90b3R5cGUuYmluZCh0aGlzQXJnLCBhcmdzLi4uKVxyXG52YXIgJGV4cG9ydCA9IHJlcXVpcmUoJy4vX2V4cG9ydCcpO1xyXG5cclxuJGV4cG9ydCgkZXhwb3J0LlAsICdGdW5jdGlvbicsIHtiaW5kOiByZXF1aXJlKCcuL19iaW5kJyl9KTsiLCIndXNlIHN0cmljdCc7XG52YXIgaXNPYmplY3QgICAgICAgPSByZXF1aXJlKCcuL19pcy1vYmplY3QnKVxuICAsIGdldFByb3RvdHlwZU9mID0gcmVxdWlyZSgnLi9fb2JqZWN0LWdwbycpXG4gICwgSEFTX0lOU1RBTkNFICAgPSByZXF1aXJlKCcuL193a3MnKSgnaGFzSW5zdGFuY2UnKVxuICAsIEZ1bmN0aW9uUHJvdG8gID0gRnVuY3Rpb24ucHJvdG90eXBlO1xuLy8gMTkuMi4zLjYgRnVuY3Rpb24ucHJvdG90eXBlW0BAaGFzSW5zdGFuY2VdKFYpXG5pZighKEhBU19JTlNUQU5DRSBpbiBGdW5jdGlvblByb3RvKSlyZXF1aXJlKCcuL19vYmplY3QtZHAnKS5mKEZ1bmN0aW9uUHJvdG8sIEhBU19JTlNUQU5DRSwge3ZhbHVlOiBmdW5jdGlvbihPKXtcbiAgaWYodHlwZW9mIHRoaXMgIT0gJ2Z1bmN0aW9uJyB8fCAhaXNPYmplY3QoTykpcmV0dXJuIGZhbHNlO1xuICBpZighaXNPYmplY3QodGhpcy5wcm90b3R5cGUpKXJldHVybiBPIGluc3RhbmNlb2YgdGhpcztcbiAgLy8gZm9yIGVudmlyb25tZW50IHcvbyBuYXRpdmUgYEBAaGFzSW5zdGFuY2VgIGxvZ2ljIGVub3VnaCBgaW5zdGFuY2VvZmAsIGJ1dCBhZGQgdGhpczpcbiAgd2hpbGUoTyA9IGdldFByb3RvdHlwZU9mKE8pKWlmKHRoaXMucHJvdG90eXBlID09PSBPKXJldHVybiB0cnVlO1xuICByZXR1cm4gZmFsc2U7XG59fSk7IiwidmFyIGRQICAgICAgICAgPSByZXF1aXJlKCcuL19vYmplY3QtZHAnKS5mXG4gICwgY3JlYXRlRGVzYyA9IHJlcXVpcmUoJy4vX3Byb3BlcnR5LWRlc2MnKVxuICAsIGhhcyAgICAgICAgPSByZXF1aXJlKCcuL19oYXMnKVxuICAsIEZQcm90byAgICAgPSBGdW5jdGlvbi5wcm90b3R5cGVcbiAgLCBuYW1lUkUgICAgID0gL15cXHMqZnVuY3Rpb24gKFteIChdKikvXG4gICwgTkFNRSAgICAgICA9ICduYW1lJztcbi8vIDE5LjIuNC4yIG5hbWVcbk5BTUUgaW4gRlByb3RvIHx8IHJlcXVpcmUoJy4vX2Rlc2NyaXB0b3JzJykgJiYgZFAoRlByb3RvLCBOQU1FLCB7XG4gIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgZ2V0OiBmdW5jdGlvbigpe1xuICAgIHZhciBtYXRjaCA9ICgnJyArIHRoaXMpLm1hdGNoKG5hbWVSRSlcbiAgICAgICwgbmFtZSAgPSBtYXRjaCA/IG1hdGNoWzFdIDogJyc7XG4gICAgaGFzKHRoaXMsIE5BTUUpIHx8IGRQKHRoaXMsIE5BTUUsIGNyZWF0ZURlc2MoNSwgbmFtZSkpO1xuICAgIHJldHVybiBuYW1lO1xuICB9XG59KTsiLCIndXNlIHN0cmljdCc7XG52YXIgc3Ryb25nID0gcmVxdWlyZSgnLi9fY29sbGVjdGlvbi1zdHJvbmcnKTtcblxuLy8gMjMuMSBNYXAgT2JqZWN0c1xubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL19jb2xsZWN0aW9uJykoJ01hcCcsIGZ1bmN0aW9uKGdldCl7XG4gIHJldHVybiBmdW5jdGlvbiBNYXAoKXsgcmV0dXJuIGdldCh0aGlzLCBhcmd1bWVudHMubGVuZ3RoID4gMCA/IGFyZ3VtZW50c1swXSA6IHVuZGVmaW5lZCk7IH07XG59LCB7XG4gIC8vIDIzLjEuMy42IE1hcC5wcm90b3R5cGUuZ2V0KGtleSlcbiAgZ2V0OiBmdW5jdGlvbiBnZXQoa2V5KXtcbiAgICB2YXIgZW50cnkgPSBzdHJvbmcuZ2V0RW50cnkodGhpcywga2V5KTtcbiAgICByZXR1cm4gZW50cnkgJiYgZW50cnkudjtcbiAgfSxcbiAgLy8gMjMuMS4zLjkgTWFwLnByb3RvdHlwZS5zZXQoa2V5LCB2YWx1ZSlcbiAgc2V0OiBmdW5jdGlvbiBzZXQoa2V5LCB2YWx1ZSl7XG4gICAgcmV0dXJuIHN0cm9uZy5kZWYodGhpcywga2V5ID09PSAwID8gMCA6IGtleSwgdmFsdWUpO1xuICB9XG59LCBzdHJvbmcsIHRydWUpOyIsIi8vIDIwLjIuMi4zIE1hdGguYWNvc2goeClcbnZhciAkZXhwb3J0ID0gcmVxdWlyZSgnLi9fZXhwb3J0JylcbiAgLCBsb2cxcCAgID0gcmVxdWlyZSgnLi9fbWF0aC1sb2cxcCcpXG4gICwgc3FydCAgICA9IE1hdGguc3FydFxuICAsICRhY29zaCAgPSBNYXRoLmFjb3NoO1xuXG4vLyBWOCBidWcgaHR0cHM6Ly9jb2RlLmdvb2dsZS5jb20vcC92OC9pc3N1ZXMvZGV0YWlsP2lkPTM1MDlcbiRleHBvcnQoJGV4cG9ydC5TICsgJGV4cG9ydC5GICogISgkYWNvc2ggJiYgTWF0aC5mbG9vcigkYWNvc2goTnVtYmVyLk1BWF9WQUxVRSkpID09IDcxMCksICdNYXRoJywge1xuICBhY29zaDogZnVuY3Rpb24gYWNvc2goeCl7XG4gICAgcmV0dXJuICh4ID0gK3gpIDwgMSA/IE5hTiA6IHggPiA5NDkwNjI2NS42MjQyNTE1NlxuICAgICAgPyBNYXRoLmxvZyh4KSArIE1hdGguTE4yXG4gICAgICA6IGxvZzFwKHggLSAxICsgc3FydCh4IC0gMSkgKiBzcXJ0KHggKyAxKSk7XG4gIH1cbn0pOyIsIi8vIDIwLjIuMi41IE1hdGguYXNpbmgoeClcbnZhciAkZXhwb3J0ID0gcmVxdWlyZSgnLi9fZXhwb3J0Jyk7XG5cbmZ1bmN0aW9uIGFzaW5oKHgpe1xuICByZXR1cm4gIWlzRmluaXRlKHggPSAreCkgfHwgeCA9PSAwID8geCA6IHggPCAwID8gLWFzaW5oKC14KSA6IE1hdGgubG9nKHggKyBNYXRoLnNxcnQoeCAqIHggKyAxKSk7XG59XG5cbiRleHBvcnQoJGV4cG9ydC5TLCAnTWF0aCcsIHthc2luaDogYXNpbmh9KTsiLCIvLyAyMC4yLjIuNyBNYXRoLmF0YW5oKHgpXG52YXIgJGV4cG9ydCA9IHJlcXVpcmUoJy4vX2V4cG9ydCcpO1xuXG4kZXhwb3J0KCRleHBvcnQuUywgJ01hdGgnLCB7XG4gIGF0YW5oOiBmdW5jdGlvbiBhdGFuaCh4KXtcbiAgICByZXR1cm4gKHggPSAreCkgPT0gMCA/IHggOiBNYXRoLmxvZygoMSArIHgpIC8gKDEgLSB4KSkgLyAyO1xuICB9XG59KTsiLCIvLyAyMC4yLjIuOSBNYXRoLmNicnQoeClcbnZhciAkZXhwb3J0ID0gcmVxdWlyZSgnLi9fZXhwb3J0JylcbiAgLCBzaWduICAgID0gcmVxdWlyZSgnLi9fbWF0aC1zaWduJyk7XG5cbiRleHBvcnQoJGV4cG9ydC5TLCAnTWF0aCcsIHtcbiAgY2JydDogZnVuY3Rpb24gY2JydCh4KXtcbiAgICByZXR1cm4gc2lnbih4ID0gK3gpICogTWF0aC5wb3coTWF0aC5hYnMoeCksIDEgLyAzKTtcbiAgfVxufSk7IiwiLy8gMjAuMi4yLjExIE1hdGguY2x6MzIoeClcbnZhciAkZXhwb3J0ID0gcmVxdWlyZSgnLi9fZXhwb3J0Jyk7XG5cbiRleHBvcnQoJGV4cG9ydC5TLCAnTWF0aCcsIHtcbiAgY2x6MzI6IGZ1bmN0aW9uIGNsejMyKHgpe1xuICAgIHJldHVybiAoeCA+Pj49IDApID8gMzEgLSBNYXRoLmZsb29yKE1hdGgubG9nKHggKyAwLjUpICogTWF0aC5MT0cyRSkgOiAzMjtcbiAgfVxufSk7IiwiLy8gMjAuMi4yLjEyIE1hdGguY29zaCh4KVxudmFyICRleHBvcnQgPSByZXF1aXJlKCcuL19leHBvcnQnKVxuICAsIGV4cCAgICAgPSBNYXRoLmV4cDtcblxuJGV4cG9ydCgkZXhwb3J0LlMsICdNYXRoJywge1xuICBjb3NoOiBmdW5jdGlvbiBjb3NoKHgpe1xuICAgIHJldHVybiAoZXhwKHggPSAreCkgKyBleHAoLXgpKSAvIDI7XG4gIH1cbn0pOyIsIi8vIDIwLjIuMi4xNCBNYXRoLmV4cG0xKHgpXG52YXIgJGV4cG9ydCA9IHJlcXVpcmUoJy4vX2V4cG9ydCcpO1xuXG4kZXhwb3J0KCRleHBvcnQuUywgJ01hdGgnLCB7ZXhwbTE6IHJlcXVpcmUoJy4vX21hdGgtZXhwbTEnKX0pOyIsIi8vIDIwLjIuMi4xNiBNYXRoLmZyb3VuZCh4KVxudmFyICRleHBvcnQgICA9IHJlcXVpcmUoJy4vX2V4cG9ydCcpXG4gICwgc2lnbiAgICAgID0gcmVxdWlyZSgnLi9fbWF0aC1zaWduJylcbiAgLCBwb3cgICAgICAgPSBNYXRoLnBvd1xuICAsIEVQU0lMT04gICA9IHBvdygyLCAtNTIpXG4gICwgRVBTSUxPTjMyID0gcG93KDIsIC0yMylcbiAgLCBNQVgzMiAgICAgPSBwb3coMiwgMTI3KSAqICgyIC0gRVBTSUxPTjMyKVxuICAsIE1JTjMyICAgICA9IHBvdygyLCAtMTI2KTtcblxudmFyIHJvdW5kVGllc1RvRXZlbiA9IGZ1bmN0aW9uKG4pe1xuICByZXR1cm4gbiArIDEgLyBFUFNJTE9OIC0gMSAvIEVQU0lMT047XG59O1xuXG5cbiRleHBvcnQoJGV4cG9ydC5TLCAnTWF0aCcsIHtcbiAgZnJvdW5kOiBmdW5jdGlvbiBmcm91bmQoeCl7XG4gICAgdmFyICRhYnMgID0gTWF0aC5hYnMoeClcbiAgICAgICwgJHNpZ24gPSBzaWduKHgpXG4gICAgICAsIGEsIHJlc3VsdDtcbiAgICBpZigkYWJzIDwgTUlOMzIpcmV0dXJuICRzaWduICogcm91bmRUaWVzVG9FdmVuKCRhYnMgLyBNSU4zMiAvIEVQU0lMT04zMikgKiBNSU4zMiAqIEVQU0lMT04zMjtcbiAgICBhID0gKDEgKyBFUFNJTE9OMzIgLyBFUFNJTE9OKSAqICRhYnM7XG4gICAgcmVzdWx0ID0gYSAtIChhIC0gJGFicyk7XG4gICAgaWYocmVzdWx0ID4gTUFYMzIgfHwgcmVzdWx0ICE9IHJlc3VsdClyZXR1cm4gJHNpZ24gKiBJbmZpbml0eTtcbiAgICByZXR1cm4gJHNpZ24gKiByZXN1bHQ7XG4gIH1cbn0pOyIsIi8vIDIwLjIuMi4xNyBNYXRoLmh5cG90KFt2YWx1ZTFbLCB2YWx1ZTJbLCDigKYgXV1dKVxudmFyICRleHBvcnQgPSByZXF1aXJlKCcuL19leHBvcnQnKVxuICAsIGFicyAgICAgPSBNYXRoLmFicztcblxuJGV4cG9ydCgkZXhwb3J0LlMsICdNYXRoJywge1xuICBoeXBvdDogZnVuY3Rpb24gaHlwb3QodmFsdWUxLCB2YWx1ZTIpeyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVudXNlZC12YXJzXG4gICAgdmFyIHN1bSAgPSAwXG4gICAgICAsIGkgICAgPSAwXG4gICAgICAsIGFMZW4gPSBhcmd1bWVudHMubGVuZ3RoXG4gICAgICAsIGxhcmcgPSAwXG4gICAgICAsIGFyZywgZGl2O1xuICAgIHdoaWxlKGkgPCBhTGVuKXtcbiAgICAgIGFyZyA9IGFicyhhcmd1bWVudHNbaSsrXSk7XG4gICAgICBpZihsYXJnIDwgYXJnKXtcbiAgICAgICAgZGl2ICA9IGxhcmcgLyBhcmc7XG4gICAgICAgIHN1bSAgPSBzdW0gKiBkaXYgKiBkaXYgKyAxO1xuICAgICAgICBsYXJnID0gYXJnO1xuICAgICAgfSBlbHNlIGlmKGFyZyA+IDApe1xuICAgICAgICBkaXYgID0gYXJnIC8gbGFyZztcbiAgICAgICAgc3VtICs9IGRpdiAqIGRpdjtcbiAgICAgIH0gZWxzZSBzdW0gKz0gYXJnO1xuICAgIH1cbiAgICByZXR1cm4gbGFyZyA9PT0gSW5maW5pdHkgPyBJbmZpbml0eSA6IGxhcmcgKiBNYXRoLnNxcnQoc3VtKTtcbiAgfVxufSk7IiwiLy8gMjAuMi4yLjE4IE1hdGguaW11bCh4LCB5KVxudmFyICRleHBvcnQgPSByZXF1aXJlKCcuL19leHBvcnQnKVxuICAsICRpbXVsICAgPSBNYXRoLmltdWw7XG5cbi8vIHNvbWUgV2ViS2l0IHZlcnNpb25zIGZhaWxzIHdpdGggYmlnIG51bWJlcnMsIHNvbWUgaGFzIHdyb25nIGFyaXR5XG4kZXhwb3J0KCRleHBvcnQuUyArICRleHBvcnQuRiAqIHJlcXVpcmUoJy4vX2ZhaWxzJykoZnVuY3Rpb24oKXtcbiAgcmV0dXJuICRpbXVsKDB4ZmZmZmZmZmYsIDUpICE9IC01IHx8ICRpbXVsLmxlbmd0aCAhPSAyO1xufSksICdNYXRoJywge1xuICBpbXVsOiBmdW5jdGlvbiBpbXVsKHgsIHkpe1xuICAgIHZhciBVSU5UMTYgPSAweGZmZmZcbiAgICAgICwgeG4gPSAreFxuICAgICAgLCB5biA9ICt5XG4gICAgICAsIHhsID0gVUlOVDE2ICYgeG5cbiAgICAgICwgeWwgPSBVSU5UMTYgJiB5bjtcbiAgICByZXR1cm4gMCB8IHhsICogeWwgKyAoKFVJTlQxNiAmIHhuID4+PiAxNikgKiB5bCArIHhsICogKFVJTlQxNiAmIHluID4+PiAxNikgPDwgMTYgPj4+IDApO1xuICB9XG59KTsiLCIvLyAyMC4yLjIuMjEgTWF0aC5sb2cxMCh4KVxudmFyICRleHBvcnQgPSByZXF1aXJlKCcuL19leHBvcnQnKTtcblxuJGV4cG9ydCgkZXhwb3J0LlMsICdNYXRoJywge1xuICBsb2cxMDogZnVuY3Rpb24gbG9nMTAoeCl7XG4gICAgcmV0dXJuIE1hdGgubG9nKHgpIC8gTWF0aC5MTjEwO1xuICB9XG59KTsiLCIvLyAyMC4yLjIuMjAgTWF0aC5sb2cxcCh4KVxudmFyICRleHBvcnQgPSByZXF1aXJlKCcuL19leHBvcnQnKTtcblxuJGV4cG9ydCgkZXhwb3J0LlMsICdNYXRoJywge2xvZzFwOiByZXF1aXJlKCcuL19tYXRoLWxvZzFwJyl9KTsiLCIvLyAyMC4yLjIuMjIgTWF0aC5sb2cyKHgpXG52YXIgJGV4cG9ydCA9IHJlcXVpcmUoJy4vX2V4cG9ydCcpO1xuXG4kZXhwb3J0KCRleHBvcnQuUywgJ01hdGgnLCB7XG4gIGxvZzI6IGZ1bmN0aW9uIGxvZzIoeCl7XG4gICAgcmV0dXJuIE1hdGgubG9nKHgpIC8gTWF0aC5MTjI7XG4gIH1cbn0pOyIsIi8vIDIwLjIuMi4yOCBNYXRoLnNpZ24oeClcbnZhciAkZXhwb3J0ID0gcmVxdWlyZSgnLi9fZXhwb3J0Jyk7XG5cbiRleHBvcnQoJGV4cG9ydC5TLCAnTWF0aCcsIHtzaWduOiByZXF1aXJlKCcuL19tYXRoLXNpZ24nKX0pOyIsIi8vIDIwLjIuMi4zMCBNYXRoLnNpbmgoeClcbnZhciAkZXhwb3J0ID0gcmVxdWlyZSgnLi9fZXhwb3J0JylcbiAgLCBleHBtMSAgID0gcmVxdWlyZSgnLi9fbWF0aC1leHBtMScpXG4gICwgZXhwICAgICA9IE1hdGguZXhwO1xuXG4vLyBWOCBuZWFyIENocm9taXVtIDM4IGhhcyBhIHByb2JsZW0gd2l0aCB2ZXJ5IHNtYWxsIG51bWJlcnNcbiRleHBvcnQoJGV4cG9ydC5TICsgJGV4cG9ydC5GICogcmVxdWlyZSgnLi9fZmFpbHMnKShmdW5jdGlvbigpe1xuICByZXR1cm4gIU1hdGguc2luaCgtMmUtMTcpICE9IC0yZS0xNztcbn0pLCAnTWF0aCcsIHtcbiAgc2luaDogZnVuY3Rpb24gc2luaCh4KXtcbiAgICByZXR1cm4gTWF0aC5hYnMoeCA9ICt4KSA8IDFcbiAgICAgID8gKGV4cG0xKHgpIC0gZXhwbTEoLXgpKSAvIDJcbiAgICAgIDogKGV4cCh4IC0gMSkgLSBleHAoLXggLSAxKSkgKiAoTWF0aC5FIC8gMik7XG4gIH1cbn0pOyIsIi8vIDIwLjIuMi4zMyBNYXRoLnRhbmgoeClcbnZhciAkZXhwb3J0ID0gcmVxdWlyZSgnLi9fZXhwb3J0JylcbiAgLCBleHBtMSAgID0gcmVxdWlyZSgnLi9fbWF0aC1leHBtMScpXG4gICwgZXhwICAgICA9IE1hdGguZXhwO1xuXG4kZXhwb3J0KCRleHBvcnQuUywgJ01hdGgnLCB7XG4gIHRhbmg6IGZ1bmN0aW9uIHRhbmgoeCl7XG4gICAgdmFyIGEgPSBleHBtMSh4ID0gK3gpXG4gICAgICAsIGIgPSBleHBtMSgteCk7XG4gICAgcmV0dXJuIGEgPT0gSW5maW5pdHkgPyAxIDogYiA9PSBJbmZpbml0eSA/IC0xIDogKGEgLSBiKSAvIChleHAoeCkgKyBleHAoLXgpKTtcbiAgfVxufSk7IiwiLy8gMjAuMi4yLjM0IE1hdGgudHJ1bmMoeClcbnZhciAkZXhwb3J0ID0gcmVxdWlyZSgnLi9fZXhwb3J0Jyk7XG5cbiRleHBvcnQoJGV4cG9ydC5TLCAnTWF0aCcsIHtcbiAgdHJ1bmM6IGZ1bmN0aW9uIHRydW5jKGl0KXtcbiAgICByZXR1cm4gKGl0ID4gMCA/IE1hdGguZmxvb3IgOiBNYXRoLmNlaWwpKGl0KTtcbiAgfVxufSk7IiwiJ3VzZSBzdHJpY3QnO1xudmFyIGdsb2JhbCAgICAgICAgICAgID0gcmVxdWlyZSgnLi9fZ2xvYmFsJylcbiAgLCBoYXMgICAgICAgICAgICAgICA9IHJlcXVpcmUoJy4vX2hhcycpXG4gICwgY29mICAgICAgICAgICAgICAgPSByZXF1aXJlKCcuL19jb2YnKVxuICAsIGluaGVyaXRJZlJlcXVpcmVkID0gcmVxdWlyZSgnLi9faW5oZXJpdC1pZi1yZXF1aXJlZCcpXG4gICwgdG9QcmltaXRpdmUgICAgICAgPSByZXF1aXJlKCcuL190by1wcmltaXRpdmUnKVxuICAsIGZhaWxzICAgICAgICAgICAgID0gcmVxdWlyZSgnLi9fZmFpbHMnKVxuICAsIGdPUE4gICAgICAgICAgICAgID0gcmVxdWlyZSgnLi9fb2JqZWN0LWdvcG4nKS5mXG4gICwgZ09QRCAgICAgICAgICAgICAgPSByZXF1aXJlKCcuL19vYmplY3QtZ29wZCcpLmZcbiAgLCBkUCAgICAgICAgICAgICAgICA9IHJlcXVpcmUoJy4vX29iamVjdC1kcCcpLmZcbiAgLCAkdHJpbSAgICAgICAgICAgICA9IHJlcXVpcmUoJy4vX3N0cmluZy10cmltJykudHJpbVxuICAsIE5VTUJFUiAgICAgICAgICAgID0gJ051bWJlcidcbiAgLCAkTnVtYmVyICAgICAgICAgICA9IGdsb2JhbFtOVU1CRVJdXG4gICwgQmFzZSAgICAgICAgICAgICAgPSAkTnVtYmVyXG4gICwgcHJvdG8gICAgICAgICAgICAgPSAkTnVtYmVyLnByb3RvdHlwZVxuICAvLyBPcGVyYSB+MTIgaGFzIGJyb2tlbiBPYmplY3QjdG9TdHJpbmdcbiAgLCBCUk9LRU5fQ09GICAgICAgICA9IGNvZihyZXF1aXJlKCcuL19vYmplY3QtY3JlYXRlJykocHJvdG8pKSA9PSBOVU1CRVJcbiAgLCBUUklNICAgICAgICAgICAgICA9ICd0cmltJyBpbiBTdHJpbmcucHJvdG90eXBlO1xuXG4vLyA3LjEuMyBUb051bWJlcihhcmd1bWVudClcbnZhciB0b051bWJlciA9IGZ1bmN0aW9uKGFyZ3VtZW50KXtcbiAgdmFyIGl0ID0gdG9QcmltaXRpdmUoYXJndW1lbnQsIGZhbHNlKTtcbiAgaWYodHlwZW9mIGl0ID09ICdzdHJpbmcnICYmIGl0Lmxlbmd0aCA+IDIpe1xuICAgIGl0ID0gVFJJTSA/IGl0LnRyaW0oKSA6ICR0cmltKGl0LCAzKTtcbiAgICB2YXIgZmlyc3QgPSBpdC5jaGFyQ29kZUF0KDApXG4gICAgICAsIHRoaXJkLCByYWRpeCwgbWF4Q29kZTtcbiAgICBpZihmaXJzdCA9PT0gNDMgfHwgZmlyc3QgPT09IDQ1KXtcbiAgICAgIHRoaXJkID0gaXQuY2hhckNvZGVBdCgyKTtcbiAgICAgIGlmKHRoaXJkID09PSA4OCB8fCB0aGlyZCA9PT0gMTIwKXJldHVybiBOYU47IC8vIE51bWJlcignKzB4MScpIHNob3VsZCBiZSBOYU4sIG9sZCBWOCBmaXhcbiAgICB9IGVsc2UgaWYoZmlyc3QgPT09IDQ4KXtcbiAgICAgIHN3aXRjaChpdC5jaGFyQ29kZUF0KDEpKXtcbiAgICAgICAgY2FzZSA2NiA6IGNhc2UgOTggIDogcmFkaXggPSAyOyBtYXhDb2RlID0gNDk7IGJyZWFrOyAvLyBmYXN0IGVxdWFsIC9eMGJbMDFdKyQvaVxuICAgICAgICBjYXNlIDc5IDogY2FzZSAxMTEgOiByYWRpeCA9IDg7IG1heENvZGUgPSA1NTsgYnJlYWs7IC8vIGZhc3QgZXF1YWwgL14wb1swLTddKyQvaVxuICAgICAgICBkZWZhdWx0IDogcmV0dXJuICtpdDtcbiAgICAgIH1cbiAgICAgIGZvcih2YXIgZGlnaXRzID0gaXQuc2xpY2UoMiksIGkgPSAwLCBsID0gZGlnaXRzLmxlbmd0aCwgY29kZTsgaSA8IGw7IGkrKyl7XG4gICAgICAgIGNvZGUgPSBkaWdpdHMuY2hhckNvZGVBdChpKTtcbiAgICAgICAgLy8gcGFyc2VJbnQgcGFyc2VzIGEgc3RyaW5nIHRvIGEgZmlyc3QgdW5hdmFpbGFibGUgc3ltYm9sXG4gICAgICAgIC8vIGJ1dCBUb051bWJlciBzaG91bGQgcmV0dXJuIE5hTiBpZiBhIHN0cmluZyBjb250YWlucyB1bmF2YWlsYWJsZSBzeW1ib2xzXG4gICAgICAgIGlmKGNvZGUgPCA0OCB8fCBjb2RlID4gbWF4Q29kZSlyZXR1cm4gTmFOO1xuICAgICAgfSByZXR1cm4gcGFyc2VJbnQoZGlnaXRzLCByYWRpeCk7XG4gICAgfVxuICB9IHJldHVybiAraXQ7XG59O1xuXG5pZighJE51bWJlcignIDBvMScpIHx8ICEkTnVtYmVyKCcwYjEnKSB8fCAkTnVtYmVyKCcrMHgxJykpe1xuICAkTnVtYmVyID0gZnVuY3Rpb24gTnVtYmVyKHZhbHVlKXtcbiAgICB2YXIgaXQgPSBhcmd1bWVudHMubGVuZ3RoIDwgMSA/IDAgOiB2YWx1ZVxuICAgICAgLCB0aGF0ID0gdGhpcztcbiAgICByZXR1cm4gdGhhdCBpbnN0YW5jZW9mICROdW1iZXJcbiAgICAgIC8vIGNoZWNrIG9uIDEuLmNvbnN0cnVjdG9yKGZvbykgY2FzZVxuICAgICAgJiYgKEJST0tFTl9DT0YgPyBmYWlscyhmdW5jdGlvbigpeyBwcm90by52YWx1ZU9mLmNhbGwodGhhdCk7IH0pIDogY29mKHRoYXQpICE9IE5VTUJFUilcbiAgICAgICAgPyBpbmhlcml0SWZSZXF1aXJlZChuZXcgQmFzZSh0b051bWJlcihpdCkpLCB0aGF0LCAkTnVtYmVyKSA6IHRvTnVtYmVyKGl0KTtcbiAgfTtcbiAgZm9yKHZhciBrZXlzID0gcmVxdWlyZSgnLi9fZGVzY3JpcHRvcnMnKSA/IGdPUE4oQmFzZSkgOiAoXG4gICAgLy8gRVMzOlxuICAgICdNQVhfVkFMVUUsTUlOX1ZBTFVFLE5hTixORUdBVElWRV9JTkZJTklUWSxQT1NJVElWRV9JTkZJTklUWSwnICtcbiAgICAvLyBFUzYgKGluIGNhc2UsIGlmIG1vZHVsZXMgd2l0aCBFUzYgTnVtYmVyIHN0YXRpY3MgcmVxdWlyZWQgYmVmb3JlKTpcbiAgICAnRVBTSUxPTixpc0Zpbml0ZSxpc0ludGVnZXIsaXNOYU4saXNTYWZlSW50ZWdlcixNQVhfU0FGRV9JTlRFR0VSLCcgK1xuICAgICdNSU5fU0FGRV9JTlRFR0VSLHBhcnNlRmxvYXQscGFyc2VJbnQsaXNJbnRlZ2VyJ1xuICApLnNwbGl0KCcsJyksIGogPSAwLCBrZXk7IGtleXMubGVuZ3RoID4gajsgaisrKXtcbiAgICBpZihoYXMoQmFzZSwga2V5ID0ga2V5c1tqXSkgJiYgIWhhcygkTnVtYmVyLCBrZXkpKXtcbiAgICAgIGRQKCROdW1iZXIsIGtleSwgZ09QRChCYXNlLCBrZXkpKTtcbiAgICB9XG4gIH1cbiAgJE51bWJlci5wcm90b3R5cGUgPSBwcm90bztcbiAgcHJvdG8uY29uc3RydWN0b3IgPSAkTnVtYmVyO1xuICByZXF1aXJlKCcuL19yZWRlZmluZScpKGdsb2JhbCwgTlVNQkVSLCAkTnVtYmVyKTtcbn0iLCIvLyAyMC4xLjIuMSBOdW1iZXIuRVBTSUxPTlxudmFyICRleHBvcnQgPSByZXF1aXJlKCcuL19leHBvcnQnKTtcblxuJGV4cG9ydCgkZXhwb3J0LlMsICdOdW1iZXInLCB7RVBTSUxPTjogTWF0aC5wb3coMiwgLTUyKX0pOyIsIi8vIDIwLjEuMi4yIE51bWJlci5pc0Zpbml0ZShudW1iZXIpXG52YXIgJGV4cG9ydCAgID0gcmVxdWlyZSgnLi9fZXhwb3J0JylcbiAgLCBfaXNGaW5pdGUgPSByZXF1aXJlKCcuL19nbG9iYWwnKS5pc0Zpbml0ZTtcblxuJGV4cG9ydCgkZXhwb3J0LlMsICdOdW1iZXInLCB7XG4gIGlzRmluaXRlOiBmdW5jdGlvbiBpc0Zpbml0ZShpdCl7XG4gICAgcmV0dXJuIHR5cGVvZiBpdCA9PSAnbnVtYmVyJyAmJiBfaXNGaW5pdGUoaXQpO1xuICB9XG59KTsiLCIvLyAyMC4xLjIuMyBOdW1iZXIuaXNJbnRlZ2VyKG51bWJlcilcbnZhciAkZXhwb3J0ID0gcmVxdWlyZSgnLi9fZXhwb3J0Jyk7XG5cbiRleHBvcnQoJGV4cG9ydC5TLCAnTnVtYmVyJywge2lzSW50ZWdlcjogcmVxdWlyZSgnLi9faXMtaW50ZWdlcicpfSk7IiwiLy8gMjAuMS4yLjQgTnVtYmVyLmlzTmFOKG51bWJlcilcbnZhciAkZXhwb3J0ID0gcmVxdWlyZSgnLi9fZXhwb3J0Jyk7XG5cbiRleHBvcnQoJGV4cG9ydC5TLCAnTnVtYmVyJywge1xuICBpc05hTjogZnVuY3Rpb24gaXNOYU4obnVtYmVyKXtcbiAgICByZXR1cm4gbnVtYmVyICE9IG51bWJlcjtcbiAgfVxufSk7IiwiLy8gMjAuMS4yLjUgTnVtYmVyLmlzU2FmZUludGVnZXIobnVtYmVyKVxudmFyICRleHBvcnQgICA9IHJlcXVpcmUoJy4vX2V4cG9ydCcpXG4gICwgaXNJbnRlZ2VyID0gcmVxdWlyZSgnLi9faXMtaW50ZWdlcicpXG4gICwgYWJzICAgICAgID0gTWF0aC5hYnM7XG5cbiRleHBvcnQoJGV4cG9ydC5TLCAnTnVtYmVyJywge1xuICBpc1NhZmVJbnRlZ2VyOiBmdW5jdGlvbiBpc1NhZmVJbnRlZ2VyKG51bWJlcil7XG4gICAgcmV0dXJuIGlzSW50ZWdlcihudW1iZXIpICYmIGFicyhudW1iZXIpIDw9IDB4MWZmZmZmZmZmZmZmZmY7XG4gIH1cbn0pOyIsIi8vIDIwLjEuMi42IE51bWJlci5NQVhfU0FGRV9JTlRFR0VSXG52YXIgJGV4cG9ydCA9IHJlcXVpcmUoJy4vX2V4cG9ydCcpO1xuXG4kZXhwb3J0KCRleHBvcnQuUywgJ051bWJlcicsIHtNQVhfU0FGRV9JTlRFR0VSOiAweDFmZmZmZmZmZmZmZmZmfSk7IiwiLy8gMjAuMS4yLjEwIE51bWJlci5NSU5fU0FGRV9JTlRFR0VSXG52YXIgJGV4cG9ydCA9IHJlcXVpcmUoJy4vX2V4cG9ydCcpO1xuXG4kZXhwb3J0KCRleHBvcnQuUywgJ051bWJlcicsIHtNSU5fU0FGRV9JTlRFR0VSOiAtMHgxZmZmZmZmZmZmZmZmZn0pOyIsInZhciAkZXhwb3J0ICAgICA9IHJlcXVpcmUoJy4vX2V4cG9ydCcpXG4gICwgJHBhcnNlRmxvYXQgPSByZXF1aXJlKCcuL19wYXJzZS1mbG9hdCcpO1xuLy8gMjAuMS4yLjEyIE51bWJlci5wYXJzZUZsb2F0KHN0cmluZylcbiRleHBvcnQoJGV4cG9ydC5TICsgJGV4cG9ydC5GICogKE51bWJlci5wYXJzZUZsb2F0ICE9ICRwYXJzZUZsb2F0KSwgJ051bWJlcicsIHtwYXJzZUZsb2F0OiAkcGFyc2VGbG9hdH0pOyIsInZhciAkZXhwb3J0ICAgPSByZXF1aXJlKCcuL19leHBvcnQnKVxuICAsICRwYXJzZUludCA9IHJlcXVpcmUoJy4vX3BhcnNlLWludCcpO1xuLy8gMjAuMS4yLjEzIE51bWJlci5wYXJzZUludChzdHJpbmcsIHJhZGl4KVxuJGV4cG9ydCgkZXhwb3J0LlMgKyAkZXhwb3J0LkYgKiAoTnVtYmVyLnBhcnNlSW50ICE9ICRwYXJzZUludCksICdOdW1iZXInLCB7cGFyc2VJbnQ6ICRwYXJzZUludH0pOyIsIid1c2Ugc3RyaWN0JztcclxudmFyICRleHBvcnQgICAgICA9IHJlcXVpcmUoJy4vX2V4cG9ydCcpXHJcbiAgLCBhbkluc3RhbmNlICAgPSByZXF1aXJlKCcuL19hbi1pbnN0YW5jZScpXHJcbiAgLCB0b0ludGVnZXIgICAgPSByZXF1aXJlKCcuL190by1pbnRlZ2VyJylcclxuICAsIGFOdW1iZXJWYWx1ZSA9IHJlcXVpcmUoJy4vX2EtbnVtYmVyLXZhbHVlJylcclxuICAsIHJlcGVhdCAgICAgICA9IHJlcXVpcmUoJy4vX3N0cmluZy1yZXBlYXQnKVxyXG4gICwgJHRvRml4ZWQgICAgID0gMS4udG9GaXhlZFxyXG4gICwgZmxvb3IgICAgICAgID0gTWF0aC5mbG9vclxyXG4gICwgZGF0YSAgICAgICAgID0gWzAsIDAsIDAsIDAsIDAsIDBdXHJcbiAgLCBFUlJPUiAgICAgICAgPSAnTnVtYmVyLnRvRml4ZWQ6IGluY29ycmVjdCBpbnZvY2F0aW9uISdcclxuICAsIFpFUk8gICAgICAgICA9ICcwJztcclxuXHJcbnZhciBtdWx0aXBseSA9IGZ1bmN0aW9uKG4sIGMpe1xyXG4gIHZhciBpICA9IC0xXHJcbiAgICAsIGMyID0gYztcclxuICB3aGlsZSgrK2kgPCA2KXtcclxuICAgIGMyICs9IG4gKiBkYXRhW2ldO1xyXG4gICAgZGF0YVtpXSA9IGMyICUgMWU3O1xyXG4gICAgYzIgPSBmbG9vcihjMiAvIDFlNyk7XHJcbiAgfVxyXG59O1xyXG52YXIgZGl2aWRlID0gZnVuY3Rpb24obil7XHJcbiAgdmFyIGkgPSA2XHJcbiAgICAsIGMgPSAwO1xyXG4gIHdoaWxlKC0taSA+PSAwKXtcclxuICAgIGMgKz0gZGF0YVtpXTtcclxuICAgIGRhdGFbaV0gPSBmbG9vcihjIC8gbik7XHJcbiAgICBjID0gKGMgJSBuKSAqIDFlNztcclxuICB9XHJcbn07XHJcbnZhciBudW1Ub1N0cmluZyA9IGZ1bmN0aW9uKCl7XHJcbiAgdmFyIGkgPSA2XHJcbiAgICAsIHMgPSAnJztcclxuICB3aGlsZSgtLWkgPj0gMCl7XHJcbiAgICBpZihzICE9PSAnJyB8fCBpID09PSAwIHx8IGRhdGFbaV0gIT09IDApe1xyXG4gICAgICB2YXIgdCA9IFN0cmluZyhkYXRhW2ldKTtcclxuICAgICAgcyA9IHMgPT09ICcnID8gdCA6IHMgKyByZXBlYXQuY2FsbChaRVJPLCA3IC0gdC5sZW5ndGgpICsgdDtcclxuICAgIH1cclxuICB9IHJldHVybiBzO1xyXG59O1xyXG52YXIgcG93ID0gZnVuY3Rpb24oeCwgbiwgYWNjKXtcclxuICByZXR1cm4gbiA9PT0gMCA/IGFjYyA6IG4gJSAyID09PSAxID8gcG93KHgsIG4gLSAxLCBhY2MgKiB4KSA6IHBvdyh4ICogeCwgbiAvIDIsIGFjYyk7XHJcbn07XHJcbnZhciBsb2cgPSBmdW5jdGlvbih4KXtcclxuICB2YXIgbiAgPSAwXHJcbiAgICAsIHgyID0geDtcclxuICB3aGlsZSh4MiA+PSA0MDk2KXtcclxuICAgIG4gKz0gMTI7XHJcbiAgICB4MiAvPSA0MDk2O1xyXG4gIH1cclxuICB3aGlsZSh4MiA+PSAyKXtcclxuICAgIG4gICs9IDE7XHJcbiAgICB4MiAvPSAyO1xyXG4gIH0gcmV0dXJuIG47XHJcbn07XHJcblxyXG4kZXhwb3J0KCRleHBvcnQuUCArICRleHBvcnQuRiAqICghISR0b0ZpeGVkICYmIChcclxuICAwLjAwMDA4LnRvRml4ZWQoMykgIT09ICcwLjAwMCcgfHxcclxuICAwLjkudG9GaXhlZCgwKSAhPT0gJzEnIHx8XHJcbiAgMS4yNTUudG9GaXhlZCgyKSAhPT0gJzEuMjUnIHx8XHJcbiAgMTAwMDAwMDAwMDAwMDAwMDEyOC4udG9GaXhlZCgwKSAhPT0gJzEwMDAwMDAwMDAwMDAwMDAxMjgnXHJcbikgfHwgIXJlcXVpcmUoJy4vX2ZhaWxzJykoZnVuY3Rpb24oKXtcclxuICAvLyBWOCB+IEFuZHJvaWQgNC4zLVxyXG4gICR0b0ZpeGVkLmNhbGwoe30pO1xyXG59KSksICdOdW1iZXInLCB7XHJcbiAgdG9GaXhlZDogZnVuY3Rpb24gdG9GaXhlZChmcmFjdGlvbkRpZ2l0cyl7XHJcbiAgICB2YXIgeCA9IGFOdW1iZXJWYWx1ZSh0aGlzLCBFUlJPUilcclxuICAgICAgLCBmID0gdG9JbnRlZ2VyKGZyYWN0aW9uRGlnaXRzKVxyXG4gICAgICAsIHMgPSAnJ1xyXG4gICAgICAsIG0gPSBaRVJPXHJcbiAgICAgICwgZSwgeiwgaiwgaztcclxuICAgIGlmKGYgPCAwIHx8IGYgPiAyMCl0aHJvdyBSYW5nZUVycm9yKEVSUk9SKTtcclxuICAgIGlmKHggIT0geClyZXR1cm4gJ05hTic7XHJcbiAgICBpZih4IDw9IC0xZTIxIHx8IHggPj0gMWUyMSlyZXR1cm4gU3RyaW5nKHgpO1xyXG4gICAgaWYoeCA8IDApe1xyXG4gICAgICBzID0gJy0nO1xyXG4gICAgICB4ID0gLXg7XHJcbiAgICB9XHJcbiAgICBpZih4ID4gMWUtMjEpe1xyXG4gICAgICBlID0gbG9nKHggKiBwb3coMiwgNjksIDEpKSAtIDY5O1xyXG4gICAgICB6ID0gZSA8IDAgPyB4ICogcG93KDIsIC1lLCAxKSA6IHggLyBwb3coMiwgZSwgMSk7XHJcbiAgICAgIHogKj0gMHgxMDAwMDAwMDAwMDAwMDtcclxuICAgICAgZSA9IDUyIC0gZTtcclxuICAgICAgaWYoZSA+IDApe1xyXG4gICAgICAgIG11bHRpcGx5KDAsIHopO1xyXG4gICAgICAgIGogPSBmO1xyXG4gICAgICAgIHdoaWxlKGogPj0gNyl7XHJcbiAgICAgICAgICBtdWx0aXBseSgxZTcsIDApO1xyXG4gICAgICAgICAgaiAtPSA3O1xyXG4gICAgICAgIH1cclxuICAgICAgICBtdWx0aXBseShwb3coMTAsIGosIDEpLCAwKTtcclxuICAgICAgICBqID0gZSAtIDE7XHJcbiAgICAgICAgd2hpbGUoaiA+PSAyMyl7XHJcbiAgICAgICAgICBkaXZpZGUoMSA8PCAyMyk7XHJcbiAgICAgICAgICBqIC09IDIzO1xyXG4gICAgICAgIH1cclxuICAgICAgICBkaXZpZGUoMSA8PCBqKTtcclxuICAgICAgICBtdWx0aXBseSgxLCAxKTtcclxuICAgICAgICBkaXZpZGUoMik7XHJcbiAgICAgICAgbSA9IG51bVRvU3RyaW5nKCk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgbXVsdGlwbHkoMCwgeik7XHJcbiAgICAgICAgbXVsdGlwbHkoMSA8PCAtZSwgMCk7XHJcbiAgICAgICAgbSA9IG51bVRvU3RyaW5nKCkgKyByZXBlYXQuY2FsbChaRVJPLCBmKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgaWYoZiA+IDApe1xyXG4gICAgICBrID0gbS5sZW5ndGg7XHJcbiAgICAgIG0gPSBzICsgKGsgPD0gZiA/ICcwLicgKyByZXBlYXQuY2FsbChaRVJPLCBmIC0gaykgKyBtIDogbS5zbGljZSgwLCBrIC0gZikgKyAnLicgKyBtLnNsaWNlKGsgLSBmKSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBtID0gcyArIG07XHJcbiAgICB9IHJldHVybiBtO1xyXG4gIH1cclxufSk7IiwiJ3VzZSBzdHJpY3QnO1xyXG52YXIgJGV4cG9ydCAgICAgID0gcmVxdWlyZSgnLi9fZXhwb3J0JylcclxuICAsICRmYWlscyAgICAgICA9IHJlcXVpcmUoJy4vX2ZhaWxzJylcclxuICAsIGFOdW1iZXJWYWx1ZSA9IHJlcXVpcmUoJy4vX2EtbnVtYmVyLXZhbHVlJylcclxuICAsICR0b1ByZWNpc2lvbiA9IDEuLnRvUHJlY2lzaW9uO1xyXG5cclxuJGV4cG9ydCgkZXhwb3J0LlAgKyAkZXhwb3J0LkYgKiAoJGZhaWxzKGZ1bmN0aW9uKCl7XHJcbiAgLy8gSUU3LVxyXG4gIHJldHVybiAkdG9QcmVjaXNpb24uY2FsbCgxLCB1bmRlZmluZWQpICE9PSAnMSc7XHJcbn0pIHx8ICEkZmFpbHMoZnVuY3Rpb24oKXtcclxuICAvLyBWOCB+IEFuZHJvaWQgNC4zLVxyXG4gICR0b1ByZWNpc2lvbi5jYWxsKHt9KTtcclxufSkpLCAnTnVtYmVyJywge1xyXG4gIHRvUHJlY2lzaW9uOiBmdW5jdGlvbiB0b1ByZWNpc2lvbihwcmVjaXNpb24pe1xyXG4gICAgdmFyIHRoYXQgPSBhTnVtYmVyVmFsdWUodGhpcywgJ051bWJlciN0b1ByZWNpc2lvbjogaW5jb3JyZWN0IGludm9jYXRpb24hJyk7XHJcbiAgICByZXR1cm4gcHJlY2lzaW9uID09PSB1bmRlZmluZWQgPyAkdG9QcmVjaXNpb24uY2FsbCh0aGF0KSA6ICR0b1ByZWNpc2lvbi5jYWxsKHRoYXQsIHByZWNpc2lvbik7IFxyXG4gIH1cclxufSk7IiwiLy8gMTkuMS4zLjEgT2JqZWN0LmFzc2lnbih0YXJnZXQsIHNvdXJjZSlcbnZhciAkZXhwb3J0ID0gcmVxdWlyZSgnLi9fZXhwb3J0Jyk7XG5cbiRleHBvcnQoJGV4cG9ydC5TICsgJGV4cG9ydC5GLCAnT2JqZWN0Jywge2Fzc2lnbjogcmVxdWlyZSgnLi9fb2JqZWN0LWFzc2lnbicpfSk7IiwidmFyICRleHBvcnQgPSByZXF1aXJlKCcuL19leHBvcnQnKVxyXG4vLyAxOS4xLjIuMiAvIDE1LjIuMy41IE9iamVjdC5jcmVhdGUoTyBbLCBQcm9wZXJ0aWVzXSlcclxuJGV4cG9ydCgkZXhwb3J0LlMsICdPYmplY3QnLCB7Y3JlYXRlOiByZXF1aXJlKCcuL19vYmplY3QtY3JlYXRlJyl9KTsiLCJ2YXIgJGV4cG9ydCA9IHJlcXVpcmUoJy4vX2V4cG9ydCcpO1xyXG4vLyAxOS4xLjIuMyAvIDE1LjIuMy43IE9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzKE8sIFByb3BlcnRpZXMpXHJcbiRleHBvcnQoJGV4cG9ydC5TICsgJGV4cG9ydC5GICogIXJlcXVpcmUoJy4vX2Rlc2NyaXB0b3JzJyksICdPYmplY3QnLCB7ZGVmaW5lUHJvcGVydGllczogcmVxdWlyZSgnLi9fb2JqZWN0LWRwcycpfSk7IiwidmFyICRleHBvcnQgPSByZXF1aXJlKCcuL19leHBvcnQnKTtcclxuLy8gMTkuMS4yLjQgLyAxNS4yLjMuNiBPYmplY3QuZGVmaW5lUHJvcGVydHkoTywgUCwgQXR0cmlidXRlcylcclxuJGV4cG9ydCgkZXhwb3J0LlMgKyAkZXhwb3J0LkYgKiAhcmVxdWlyZSgnLi9fZGVzY3JpcHRvcnMnKSwgJ09iamVjdCcsIHtkZWZpbmVQcm9wZXJ0eTogcmVxdWlyZSgnLi9fb2JqZWN0LWRwJykuZn0pOyIsIi8vIDE5LjEuMi41IE9iamVjdC5mcmVlemUoTylcbnZhciBpc09iamVjdCA9IHJlcXVpcmUoJy4vX2lzLW9iamVjdCcpXG4gICwgbWV0YSAgICAgPSByZXF1aXJlKCcuL19tZXRhJykub25GcmVlemU7XG5cbnJlcXVpcmUoJy4vX29iamVjdC1zYXAnKSgnZnJlZXplJywgZnVuY3Rpb24oJGZyZWV6ZSl7XG4gIHJldHVybiBmdW5jdGlvbiBmcmVlemUoaXQpe1xuICAgIHJldHVybiAkZnJlZXplICYmIGlzT2JqZWN0KGl0KSA/ICRmcmVlemUobWV0YShpdCkpIDogaXQ7XG4gIH07XG59KTsiLCIvLyAxOS4xLjIuNiBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKE8sIFApXG52YXIgdG9JT2JqZWN0ICAgICAgICAgICAgICAgICA9IHJlcXVpcmUoJy4vX3RvLWlvYmplY3QnKVxuICAsICRnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IgPSByZXF1aXJlKCcuL19vYmplY3QtZ29wZCcpLmY7XG5cbnJlcXVpcmUoJy4vX29iamVjdC1zYXAnKSgnZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yJywgZnVuY3Rpb24oKXtcbiAgcmV0dXJuIGZ1bmN0aW9uIGdldE93blByb3BlcnR5RGVzY3JpcHRvcihpdCwga2V5KXtcbiAgICByZXR1cm4gJGdldE93blByb3BlcnR5RGVzY3JpcHRvcih0b0lPYmplY3QoaXQpLCBrZXkpO1xuICB9O1xufSk7IiwiLy8gMTkuMS4yLjcgT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMoTylcbnJlcXVpcmUoJy4vX29iamVjdC1zYXAnKSgnZ2V0T3duUHJvcGVydHlOYW1lcycsIGZ1bmN0aW9uKCl7XG4gIHJldHVybiByZXF1aXJlKCcuL19vYmplY3QtZ29wbi1leHQnKS5mO1xufSk7IiwiLy8gMTkuMS4yLjkgT2JqZWN0LmdldFByb3RvdHlwZU9mKE8pXG52YXIgdG9PYmplY3QgICAgICAgID0gcmVxdWlyZSgnLi9fdG8tb2JqZWN0JylcbiAgLCAkZ2V0UHJvdG90eXBlT2YgPSByZXF1aXJlKCcuL19vYmplY3QtZ3BvJyk7XG5cbnJlcXVpcmUoJy4vX29iamVjdC1zYXAnKSgnZ2V0UHJvdG90eXBlT2YnLCBmdW5jdGlvbigpe1xuICByZXR1cm4gZnVuY3Rpb24gZ2V0UHJvdG90eXBlT2YoaXQpe1xuICAgIHJldHVybiAkZ2V0UHJvdG90eXBlT2YodG9PYmplY3QoaXQpKTtcbiAgfTtcbn0pOyIsIi8vIDE5LjEuMi4xMSBPYmplY3QuaXNFeHRlbnNpYmxlKE8pXG52YXIgaXNPYmplY3QgPSByZXF1aXJlKCcuL19pcy1vYmplY3QnKTtcblxucmVxdWlyZSgnLi9fb2JqZWN0LXNhcCcpKCdpc0V4dGVuc2libGUnLCBmdW5jdGlvbigkaXNFeHRlbnNpYmxlKXtcbiAgcmV0dXJuIGZ1bmN0aW9uIGlzRXh0ZW5zaWJsZShpdCl7XG4gICAgcmV0dXJuIGlzT2JqZWN0KGl0KSA/ICRpc0V4dGVuc2libGUgPyAkaXNFeHRlbnNpYmxlKGl0KSA6IHRydWUgOiBmYWxzZTtcbiAgfTtcbn0pOyIsIi8vIDE5LjEuMi4xMiBPYmplY3QuaXNGcm96ZW4oTylcbnZhciBpc09iamVjdCA9IHJlcXVpcmUoJy4vX2lzLW9iamVjdCcpO1xuXG5yZXF1aXJlKCcuL19vYmplY3Qtc2FwJykoJ2lzRnJvemVuJywgZnVuY3Rpb24oJGlzRnJvemVuKXtcbiAgcmV0dXJuIGZ1bmN0aW9uIGlzRnJvemVuKGl0KXtcbiAgICByZXR1cm4gaXNPYmplY3QoaXQpID8gJGlzRnJvemVuID8gJGlzRnJvemVuKGl0KSA6IGZhbHNlIDogdHJ1ZTtcbiAgfTtcbn0pOyIsIi8vIDE5LjEuMi4xMyBPYmplY3QuaXNTZWFsZWQoTylcbnZhciBpc09iamVjdCA9IHJlcXVpcmUoJy4vX2lzLW9iamVjdCcpO1xuXG5yZXF1aXJlKCcuL19vYmplY3Qtc2FwJykoJ2lzU2VhbGVkJywgZnVuY3Rpb24oJGlzU2VhbGVkKXtcbiAgcmV0dXJuIGZ1bmN0aW9uIGlzU2VhbGVkKGl0KXtcbiAgICByZXR1cm4gaXNPYmplY3QoaXQpID8gJGlzU2VhbGVkID8gJGlzU2VhbGVkKGl0KSA6IGZhbHNlIDogdHJ1ZTtcbiAgfTtcbn0pOyIsIi8vIDE5LjEuMy4xMCBPYmplY3QuaXModmFsdWUxLCB2YWx1ZTIpXG52YXIgJGV4cG9ydCA9IHJlcXVpcmUoJy4vX2V4cG9ydCcpO1xuJGV4cG9ydCgkZXhwb3J0LlMsICdPYmplY3QnLCB7aXM6IHJlcXVpcmUoJy4vX3NhbWUtdmFsdWUnKX0pOyIsIi8vIDE5LjEuMi4xNCBPYmplY3Qua2V5cyhPKVxudmFyIHRvT2JqZWN0ID0gcmVxdWlyZSgnLi9fdG8tb2JqZWN0JylcbiAgLCAka2V5cyAgICA9IHJlcXVpcmUoJy4vX29iamVjdC1rZXlzJyk7XG5cbnJlcXVpcmUoJy4vX29iamVjdC1zYXAnKSgna2V5cycsIGZ1bmN0aW9uKCl7XG4gIHJldHVybiBmdW5jdGlvbiBrZXlzKGl0KXtcbiAgICByZXR1cm4gJGtleXModG9PYmplY3QoaXQpKTtcbiAgfTtcbn0pOyIsIi8vIDE5LjEuMi4xNSBPYmplY3QucHJldmVudEV4dGVuc2lvbnMoTylcbnZhciBpc09iamVjdCA9IHJlcXVpcmUoJy4vX2lzLW9iamVjdCcpXG4gICwgbWV0YSAgICAgPSByZXF1aXJlKCcuL19tZXRhJykub25GcmVlemU7XG5cbnJlcXVpcmUoJy4vX29iamVjdC1zYXAnKSgncHJldmVudEV4dGVuc2lvbnMnLCBmdW5jdGlvbigkcHJldmVudEV4dGVuc2lvbnMpe1xuICByZXR1cm4gZnVuY3Rpb24gcHJldmVudEV4dGVuc2lvbnMoaXQpe1xuICAgIHJldHVybiAkcHJldmVudEV4dGVuc2lvbnMgJiYgaXNPYmplY3QoaXQpID8gJHByZXZlbnRFeHRlbnNpb25zKG1ldGEoaXQpKSA6IGl0O1xuICB9O1xufSk7IiwiLy8gMTkuMS4yLjE3IE9iamVjdC5zZWFsKE8pXG52YXIgaXNPYmplY3QgPSByZXF1aXJlKCcuL19pcy1vYmplY3QnKVxuICAsIG1ldGEgICAgID0gcmVxdWlyZSgnLi9fbWV0YScpLm9uRnJlZXplO1xuXG5yZXF1aXJlKCcuL19vYmplY3Qtc2FwJykoJ3NlYWwnLCBmdW5jdGlvbigkc2VhbCl7XG4gIHJldHVybiBmdW5jdGlvbiBzZWFsKGl0KXtcbiAgICByZXR1cm4gJHNlYWwgJiYgaXNPYmplY3QoaXQpID8gJHNlYWwobWV0YShpdCkpIDogaXQ7XG4gIH07XG59KTsiLCIvLyAxOS4xLjMuMTkgT2JqZWN0LnNldFByb3RvdHlwZU9mKE8sIHByb3RvKVxudmFyICRleHBvcnQgPSByZXF1aXJlKCcuL19leHBvcnQnKTtcbiRleHBvcnQoJGV4cG9ydC5TLCAnT2JqZWN0Jywge3NldFByb3RvdHlwZU9mOiByZXF1aXJlKCcuL19zZXQtcHJvdG8nKS5zZXR9KTsiLCIndXNlIHN0cmljdCc7XG4vLyAxOS4xLjMuNiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nKClcbnZhciBjbGFzc29mID0gcmVxdWlyZSgnLi9fY2xhc3NvZicpXG4gICwgdGVzdCAgICA9IHt9O1xudGVzdFtyZXF1aXJlKCcuL193a3MnKSgndG9TdHJpbmdUYWcnKV0gPSAneic7XG5pZih0ZXN0ICsgJycgIT0gJ1tvYmplY3Qgel0nKXtcbiAgcmVxdWlyZSgnLi9fcmVkZWZpbmUnKShPYmplY3QucHJvdG90eXBlLCAndG9TdHJpbmcnLCBmdW5jdGlvbiB0b1N0cmluZygpe1xuICAgIHJldHVybiAnW29iamVjdCAnICsgY2xhc3NvZih0aGlzKSArICddJztcbiAgfSwgdHJ1ZSk7XG59IiwidmFyICRleHBvcnQgICAgID0gcmVxdWlyZSgnLi9fZXhwb3J0JylcclxuICAsICRwYXJzZUZsb2F0ID0gcmVxdWlyZSgnLi9fcGFyc2UtZmxvYXQnKTtcclxuLy8gMTguMi40IHBhcnNlRmxvYXQoc3RyaW5nKVxyXG4kZXhwb3J0KCRleHBvcnQuRyArICRleHBvcnQuRiAqIChwYXJzZUZsb2F0ICE9ICRwYXJzZUZsb2F0KSwge3BhcnNlRmxvYXQ6ICRwYXJzZUZsb2F0fSk7IiwidmFyICRleHBvcnQgICA9IHJlcXVpcmUoJy4vX2V4cG9ydCcpXHJcbiAgLCAkcGFyc2VJbnQgPSByZXF1aXJlKCcuL19wYXJzZS1pbnQnKTtcclxuLy8gMTguMi41IHBhcnNlSW50KHN0cmluZywgcmFkaXgpXHJcbiRleHBvcnQoJGV4cG9ydC5HICsgJGV4cG9ydC5GICogKHBhcnNlSW50ICE9ICRwYXJzZUludCksIHtwYXJzZUludDogJHBhcnNlSW50fSk7IiwiJ3VzZSBzdHJpY3QnO1xudmFyIExJQlJBUlkgICAgICAgICAgICA9IHJlcXVpcmUoJy4vX2xpYnJhcnknKVxuICAsIGdsb2JhbCAgICAgICAgICAgICA9IHJlcXVpcmUoJy4vX2dsb2JhbCcpXG4gICwgY3R4ICAgICAgICAgICAgICAgID0gcmVxdWlyZSgnLi9fY3R4JylcbiAgLCBjbGFzc29mICAgICAgICAgICAgPSByZXF1aXJlKCcuL19jbGFzc29mJylcbiAgLCAkZXhwb3J0ICAgICAgICAgICAgPSByZXF1aXJlKCcuL19leHBvcnQnKVxuICAsIGlzT2JqZWN0ICAgICAgICAgICA9IHJlcXVpcmUoJy4vX2lzLW9iamVjdCcpXG4gICwgYW5PYmplY3QgICAgICAgICAgID0gcmVxdWlyZSgnLi9fYW4tb2JqZWN0JylcbiAgLCBhRnVuY3Rpb24gICAgICAgICAgPSByZXF1aXJlKCcuL19hLWZ1bmN0aW9uJylcbiAgLCBhbkluc3RhbmNlICAgICAgICAgPSByZXF1aXJlKCcuL19hbi1pbnN0YW5jZScpXG4gICwgZm9yT2YgICAgICAgICAgICAgID0gcmVxdWlyZSgnLi9fZm9yLW9mJylcbiAgLCBzZXRQcm90byAgICAgICAgICAgPSByZXF1aXJlKCcuL19zZXQtcHJvdG8nKS5zZXRcbiAgLCBzcGVjaWVzQ29uc3RydWN0b3IgPSByZXF1aXJlKCcuL19zcGVjaWVzLWNvbnN0cnVjdG9yJylcbiAgLCB0YXNrICAgICAgICAgICAgICAgPSByZXF1aXJlKCcuL190YXNrJykuc2V0XG4gICwgbWljcm90YXNrICAgICAgICAgID0gcmVxdWlyZSgnLi9fbWljcm90YXNrJylcbiAgLCBQUk9NSVNFICAgICAgICAgICAgPSAnUHJvbWlzZSdcbiAgLCBUeXBlRXJyb3IgICAgICAgICAgPSBnbG9iYWwuVHlwZUVycm9yXG4gICwgcHJvY2VzcyAgICAgICAgICAgID0gZ2xvYmFsLnByb2Nlc3NcbiAgLCAkUHJvbWlzZSAgICAgICAgICAgPSBnbG9iYWxbUFJPTUlTRV1cbiAgLCBwcm9jZXNzICAgICAgICAgICAgPSBnbG9iYWwucHJvY2Vzc1xuICAsIGlzTm9kZSAgICAgICAgICAgICA9IGNsYXNzb2YocHJvY2VzcykgPT0gJ3Byb2Nlc3MnXG4gICwgZW1wdHkgICAgICAgICAgICAgID0gZnVuY3Rpb24oKXsgLyogZW1wdHkgKi8gfVxuICAsIEludGVybmFsLCBHZW5lcmljUHJvbWlzZUNhcGFiaWxpdHksIFdyYXBwZXI7XG5cbnZhciBVU0VfTkFUSVZFID0gISFmdW5jdGlvbigpe1xuICB0cnkge1xuICAgIC8vIGNvcnJlY3Qgc3ViY2xhc3Npbmcgd2l0aCBAQHNwZWNpZXMgc3VwcG9ydFxuICAgIHZhciBwcm9taXNlICAgICA9ICRQcm9taXNlLnJlc29sdmUoMSlcbiAgICAgICwgRmFrZVByb21pc2UgPSAocHJvbWlzZS5jb25zdHJ1Y3RvciA9IHt9KVtyZXF1aXJlKCcuL193a3MnKSgnc3BlY2llcycpXSA9IGZ1bmN0aW9uKGV4ZWMpeyBleGVjKGVtcHR5LCBlbXB0eSk7IH07XG4gICAgLy8gdW5oYW5kbGVkIHJlamVjdGlvbnMgdHJhY2tpbmcgc3VwcG9ydCwgTm9kZUpTIFByb21pc2Ugd2l0aG91dCBpdCBmYWlscyBAQHNwZWNpZXMgdGVzdFxuICAgIHJldHVybiAoaXNOb2RlIHx8IHR5cGVvZiBQcm9taXNlUmVqZWN0aW9uRXZlbnQgPT0gJ2Z1bmN0aW9uJykgJiYgcHJvbWlzZS50aGVuKGVtcHR5KSBpbnN0YW5jZW9mIEZha2VQcm9taXNlO1xuICB9IGNhdGNoKGUpeyAvKiBlbXB0eSAqLyB9XG59KCk7XG5cbi8vIGhlbHBlcnNcbnZhciBzYW1lQ29uc3RydWN0b3IgPSBmdW5jdGlvbihhLCBiKXtcbiAgLy8gd2l0aCBsaWJyYXJ5IHdyYXBwZXIgc3BlY2lhbCBjYXNlXG4gIHJldHVybiBhID09PSBiIHx8IGEgPT09ICRQcm9taXNlICYmIGIgPT09IFdyYXBwZXI7XG59O1xudmFyIGlzVGhlbmFibGUgPSBmdW5jdGlvbihpdCl7XG4gIHZhciB0aGVuO1xuICByZXR1cm4gaXNPYmplY3QoaXQpICYmIHR5cGVvZiAodGhlbiA9IGl0LnRoZW4pID09ICdmdW5jdGlvbicgPyB0aGVuIDogZmFsc2U7XG59O1xudmFyIG5ld1Byb21pc2VDYXBhYmlsaXR5ID0gZnVuY3Rpb24oQyl7XG4gIHJldHVybiBzYW1lQ29uc3RydWN0b3IoJFByb21pc2UsIEMpXG4gICAgPyBuZXcgUHJvbWlzZUNhcGFiaWxpdHkoQylcbiAgICA6IG5ldyBHZW5lcmljUHJvbWlzZUNhcGFiaWxpdHkoQyk7XG59O1xudmFyIFByb21pc2VDYXBhYmlsaXR5ID0gR2VuZXJpY1Byb21pc2VDYXBhYmlsaXR5ID0gZnVuY3Rpb24oQyl7XG4gIHZhciByZXNvbHZlLCByZWplY3Q7XG4gIHRoaXMucHJvbWlzZSA9IG5ldyBDKGZ1bmN0aW9uKCQkcmVzb2x2ZSwgJCRyZWplY3Qpe1xuICAgIGlmKHJlc29sdmUgIT09IHVuZGVmaW5lZCB8fCByZWplY3QgIT09IHVuZGVmaW5lZCl0aHJvdyBUeXBlRXJyb3IoJ0JhZCBQcm9taXNlIGNvbnN0cnVjdG9yJyk7XG4gICAgcmVzb2x2ZSA9ICQkcmVzb2x2ZTtcbiAgICByZWplY3QgID0gJCRyZWplY3Q7XG4gIH0pO1xuICB0aGlzLnJlc29sdmUgPSBhRnVuY3Rpb24ocmVzb2x2ZSk7XG4gIHRoaXMucmVqZWN0ICA9IGFGdW5jdGlvbihyZWplY3QpO1xufTtcbnZhciBwZXJmb3JtID0gZnVuY3Rpb24oZXhlYyl7XG4gIHRyeSB7XG4gICAgZXhlYygpO1xuICB9IGNhdGNoKGUpe1xuICAgIHJldHVybiB7ZXJyb3I6IGV9O1xuICB9XG59O1xudmFyIG5vdGlmeSA9IGZ1bmN0aW9uKHByb21pc2UsIGlzUmVqZWN0KXtcbiAgaWYocHJvbWlzZS5fbilyZXR1cm47XG4gIHByb21pc2UuX24gPSB0cnVlO1xuICB2YXIgY2hhaW4gPSBwcm9taXNlLl9jO1xuICBtaWNyb3Rhc2soZnVuY3Rpb24oKXtcbiAgICB2YXIgdmFsdWUgPSBwcm9taXNlLl92XG4gICAgICAsIG9rICAgID0gcHJvbWlzZS5fcyA9PSAxXG4gICAgICAsIGkgICAgID0gMDtcbiAgICB2YXIgcnVuID0gZnVuY3Rpb24ocmVhY3Rpb24pe1xuICAgICAgdmFyIGhhbmRsZXIgPSBvayA/IHJlYWN0aW9uLm9rIDogcmVhY3Rpb24uZmFpbFxuICAgICAgICAsIHJlc29sdmUgPSByZWFjdGlvbi5yZXNvbHZlXG4gICAgICAgICwgcmVqZWN0ICA9IHJlYWN0aW9uLnJlamVjdFxuICAgICAgICAsIGRvbWFpbiAgPSByZWFjdGlvbi5kb21haW5cbiAgICAgICAgLCByZXN1bHQsIHRoZW47XG4gICAgICB0cnkge1xuICAgICAgICBpZihoYW5kbGVyKXtcbiAgICAgICAgICBpZighb2spe1xuICAgICAgICAgICAgaWYocHJvbWlzZS5faCA9PSAyKW9uSGFuZGxlVW5oYW5kbGVkKHByb21pc2UpO1xuICAgICAgICAgICAgcHJvbWlzZS5faCA9IDE7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmKGhhbmRsZXIgPT09IHRydWUpcmVzdWx0ID0gdmFsdWU7XG4gICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBpZihkb21haW4pZG9tYWluLmVudGVyKCk7XG4gICAgICAgICAgICByZXN1bHQgPSBoYW5kbGVyKHZhbHVlKTtcbiAgICAgICAgICAgIGlmKGRvbWFpbilkb21haW4uZXhpdCgpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZihyZXN1bHQgPT09IHJlYWN0aW9uLnByb21pc2Upe1xuICAgICAgICAgICAgcmVqZWN0KFR5cGVFcnJvcignUHJvbWlzZS1jaGFpbiBjeWNsZScpKTtcbiAgICAgICAgICB9IGVsc2UgaWYodGhlbiA9IGlzVGhlbmFibGUocmVzdWx0KSl7XG4gICAgICAgICAgICB0aGVuLmNhbGwocmVzdWx0LCByZXNvbHZlLCByZWplY3QpO1xuICAgICAgICAgIH0gZWxzZSByZXNvbHZlKHJlc3VsdCk7XG4gICAgICAgIH0gZWxzZSByZWplY3QodmFsdWUpO1xuICAgICAgfSBjYXRjaChlKXtcbiAgICAgICAgcmVqZWN0KGUpO1xuICAgICAgfVxuICAgIH07XG4gICAgd2hpbGUoY2hhaW4ubGVuZ3RoID4gaSlydW4oY2hhaW5baSsrXSk7IC8vIHZhcmlhYmxlIGxlbmd0aCAtIGNhbid0IHVzZSBmb3JFYWNoXG4gICAgcHJvbWlzZS5fYyA9IFtdO1xuICAgIHByb21pc2UuX24gPSBmYWxzZTtcbiAgICBpZihpc1JlamVjdCAmJiAhcHJvbWlzZS5faClvblVuaGFuZGxlZChwcm9taXNlKTtcbiAgfSk7XG59O1xudmFyIG9uVW5oYW5kbGVkID0gZnVuY3Rpb24ocHJvbWlzZSl7XG4gIHRhc2suY2FsbChnbG9iYWwsIGZ1bmN0aW9uKCl7XG4gICAgdmFyIHZhbHVlID0gcHJvbWlzZS5fdlxuICAgICAgLCBhYnJ1cHQsIGhhbmRsZXIsIGNvbnNvbGU7XG4gICAgaWYoaXNVbmhhbmRsZWQocHJvbWlzZSkpe1xuICAgICAgYWJydXB0ID0gcGVyZm9ybShmdW5jdGlvbigpe1xuICAgICAgICBpZihpc05vZGUpe1xuICAgICAgICAgIHByb2Nlc3MuZW1pdCgndW5oYW5kbGVkUmVqZWN0aW9uJywgdmFsdWUsIHByb21pc2UpO1xuICAgICAgICB9IGVsc2UgaWYoaGFuZGxlciA9IGdsb2JhbC5vbnVuaGFuZGxlZHJlamVjdGlvbil7XG4gICAgICAgICAgaGFuZGxlcih7cHJvbWlzZTogcHJvbWlzZSwgcmVhc29uOiB2YWx1ZX0pO1xuICAgICAgICB9IGVsc2UgaWYoKGNvbnNvbGUgPSBnbG9iYWwuY29uc29sZSkgJiYgY29uc29sZS5lcnJvcil7XG4gICAgICAgICAgY29uc29sZS5lcnJvcignVW5oYW5kbGVkIHByb21pc2UgcmVqZWN0aW9uJywgdmFsdWUpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgIC8vIEJyb3dzZXJzIHNob3VsZCBub3QgdHJpZ2dlciBgcmVqZWN0aW9uSGFuZGxlZGAgZXZlbnQgaWYgaXQgd2FzIGhhbmRsZWQgaGVyZSwgTm9kZUpTIC0gc2hvdWxkXG4gICAgICBwcm9taXNlLl9oID0gaXNOb2RlIHx8IGlzVW5oYW5kbGVkKHByb21pc2UpID8gMiA6IDE7XG4gICAgfSBwcm9taXNlLl9hID0gdW5kZWZpbmVkO1xuICAgIGlmKGFicnVwdCl0aHJvdyBhYnJ1cHQuZXJyb3I7XG4gIH0pO1xufTtcbnZhciBpc1VuaGFuZGxlZCA9IGZ1bmN0aW9uKHByb21pc2Upe1xuICBpZihwcm9taXNlLl9oID09IDEpcmV0dXJuIGZhbHNlO1xuICB2YXIgY2hhaW4gPSBwcm9taXNlLl9hIHx8IHByb21pc2UuX2NcbiAgICAsIGkgICAgID0gMFxuICAgICwgcmVhY3Rpb247XG4gIHdoaWxlKGNoYWluLmxlbmd0aCA+IGkpe1xuICAgIHJlYWN0aW9uID0gY2hhaW5baSsrXTtcbiAgICBpZihyZWFjdGlvbi5mYWlsIHx8ICFpc1VuaGFuZGxlZChyZWFjdGlvbi5wcm9taXNlKSlyZXR1cm4gZmFsc2U7XG4gIH0gcmV0dXJuIHRydWU7XG59O1xudmFyIG9uSGFuZGxlVW5oYW5kbGVkID0gZnVuY3Rpb24ocHJvbWlzZSl7XG4gIHRhc2suY2FsbChnbG9iYWwsIGZ1bmN0aW9uKCl7XG4gICAgdmFyIGhhbmRsZXI7XG4gICAgaWYoaXNOb2RlKXtcbiAgICAgIHByb2Nlc3MuZW1pdCgncmVqZWN0aW9uSGFuZGxlZCcsIHByb21pc2UpO1xuICAgIH0gZWxzZSBpZihoYW5kbGVyID0gZ2xvYmFsLm9ucmVqZWN0aW9uaGFuZGxlZCl7XG4gICAgICBoYW5kbGVyKHtwcm9taXNlOiBwcm9taXNlLCByZWFzb246IHByb21pc2UuX3Z9KTtcbiAgICB9XG4gIH0pO1xufTtcbnZhciAkcmVqZWN0ID0gZnVuY3Rpb24odmFsdWUpe1xuICB2YXIgcHJvbWlzZSA9IHRoaXM7XG4gIGlmKHByb21pc2UuX2QpcmV0dXJuO1xuICBwcm9taXNlLl9kID0gdHJ1ZTtcbiAgcHJvbWlzZSA9IHByb21pc2UuX3cgfHwgcHJvbWlzZTsgLy8gdW53cmFwXG4gIHByb21pc2UuX3YgPSB2YWx1ZTtcbiAgcHJvbWlzZS5fcyA9IDI7XG4gIGlmKCFwcm9taXNlLl9hKXByb21pc2UuX2EgPSBwcm9taXNlLl9jLnNsaWNlKCk7XG4gIG5vdGlmeShwcm9taXNlLCB0cnVlKTtcbn07XG52YXIgJHJlc29sdmUgPSBmdW5jdGlvbih2YWx1ZSl7XG4gIHZhciBwcm9taXNlID0gdGhpc1xuICAgICwgdGhlbjtcbiAgaWYocHJvbWlzZS5fZClyZXR1cm47XG4gIHByb21pc2UuX2QgPSB0cnVlO1xuICBwcm9taXNlID0gcHJvbWlzZS5fdyB8fCBwcm9taXNlOyAvLyB1bndyYXBcbiAgdHJ5IHtcbiAgICBpZihwcm9taXNlID09PSB2YWx1ZSl0aHJvdyBUeXBlRXJyb3IoXCJQcm9taXNlIGNhbid0IGJlIHJlc29sdmVkIGl0c2VsZlwiKTtcbiAgICBpZih0aGVuID0gaXNUaGVuYWJsZSh2YWx1ZSkpe1xuICAgICAgbWljcm90YXNrKGZ1bmN0aW9uKCl7XG4gICAgICAgIHZhciB3cmFwcGVyID0ge193OiBwcm9taXNlLCBfZDogZmFsc2V9OyAvLyB3cmFwXG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgdGhlbi5jYWxsKHZhbHVlLCBjdHgoJHJlc29sdmUsIHdyYXBwZXIsIDEpLCBjdHgoJHJlamVjdCwgd3JhcHBlciwgMSkpO1xuICAgICAgICB9IGNhdGNoKGUpe1xuICAgICAgICAgICRyZWplY3QuY2FsbCh3cmFwcGVyLCBlKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHByb21pc2UuX3YgPSB2YWx1ZTtcbiAgICAgIHByb21pc2UuX3MgPSAxO1xuICAgICAgbm90aWZ5KHByb21pc2UsIGZhbHNlKTtcbiAgICB9XG4gIH0gY2F0Y2goZSl7XG4gICAgJHJlamVjdC5jYWxsKHtfdzogcHJvbWlzZSwgX2Q6IGZhbHNlfSwgZSk7IC8vIHdyYXBcbiAgfVxufTtcblxuLy8gY29uc3RydWN0b3IgcG9seWZpbGxcbmlmKCFVU0VfTkFUSVZFKXtcbiAgLy8gMjUuNC4zLjEgUHJvbWlzZShleGVjdXRvcilcbiAgJFByb21pc2UgPSBmdW5jdGlvbiBQcm9taXNlKGV4ZWN1dG9yKXtcbiAgICBhbkluc3RhbmNlKHRoaXMsICRQcm9taXNlLCBQUk9NSVNFLCAnX2gnKTtcbiAgICBhRnVuY3Rpb24oZXhlY3V0b3IpO1xuICAgIEludGVybmFsLmNhbGwodGhpcyk7XG4gICAgdHJ5IHtcbiAgICAgIGV4ZWN1dG9yKGN0eCgkcmVzb2x2ZSwgdGhpcywgMSksIGN0eCgkcmVqZWN0LCB0aGlzLCAxKSk7XG4gICAgfSBjYXRjaChlcnIpe1xuICAgICAgJHJlamVjdC5jYWxsKHRoaXMsIGVycik7XG4gICAgfVxuICB9O1xuICBJbnRlcm5hbCA9IGZ1bmN0aW9uIFByb21pc2UoZXhlY3V0b3Ipe1xuICAgIHRoaXMuX2MgPSBbXTsgICAgICAgICAgICAgLy8gPC0gYXdhaXRpbmcgcmVhY3Rpb25zXG4gICAgdGhpcy5fYSA9IHVuZGVmaW5lZDsgICAgICAvLyA8LSBjaGVja2VkIGluIGlzVW5oYW5kbGVkIHJlYWN0aW9uc1xuICAgIHRoaXMuX3MgPSAwOyAgICAgICAgICAgICAgLy8gPC0gc3RhdGVcbiAgICB0aGlzLl9kID0gZmFsc2U7ICAgICAgICAgIC8vIDwtIGRvbmVcbiAgICB0aGlzLl92ID0gdW5kZWZpbmVkOyAgICAgIC8vIDwtIHZhbHVlXG4gICAgdGhpcy5faCA9IDA7ICAgICAgICAgICAgICAvLyA8LSByZWplY3Rpb24gc3RhdGUsIDAgLSBkZWZhdWx0LCAxIC0gaGFuZGxlZCwgMiAtIHVuaGFuZGxlZFxuICAgIHRoaXMuX24gPSBmYWxzZTsgICAgICAgICAgLy8gPC0gbm90aWZ5XG4gIH07XG4gIEludGVybmFsLnByb3RvdHlwZSA9IHJlcXVpcmUoJy4vX3JlZGVmaW5lLWFsbCcpKCRQcm9taXNlLnByb3RvdHlwZSwge1xuICAgIC8vIDI1LjQuNS4zIFByb21pc2UucHJvdG90eXBlLnRoZW4ob25GdWxmaWxsZWQsIG9uUmVqZWN0ZWQpXG4gICAgdGhlbjogZnVuY3Rpb24gdGhlbihvbkZ1bGZpbGxlZCwgb25SZWplY3RlZCl7XG4gICAgICB2YXIgcmVhY3Rpb24gICAgPSBuZXdQcm9taXNlQ2FwYWJpbGl0eShzcGVjaWVzQ29uc3RydWN0b3IodGhpcywgJFByb21pc2UpKTtcbiAgICAgIHJlYWN0aW9uLm9rICAgICA9IHR5cGVvZiBvbkZ1bGZpbGxlZCA9PSAnZnVuY3Rpb24nID8gb25GdWxmaWxsZWQgOiB0cnVlO1xuICAgICAgcmVhY3Rpb24uZmFpbCAgID0gdHlwZW9mIG9uUmVqZWN0ZWQgPT0gJ2Z1bmN0aW9uJyAmJiBvblJlamVjdGVkO1xuICAgICAgcmVhY3Rpb24uZG9tYWluID0gaXNOb2RlID8gcHJvY2Vzcy5kb21haW4gOiB1bmRlZmluZWQ7XG4gICAgICB0aGlzLl9jLnB1c2gocmVhY3Rpb24pO1xuICAgICAgaWYodGhpcy5fYSl0aGlzLl9hLnB1c2gocmVhY3Rpb24pO1xuICAgICAgaWYodGhpcy5fcylub3RpZnkodGhpcywgZmFsc2UpO1xuICAgICAgcmV0dXJuIHJlYWN0aW9uLnByb21pc2U7XG4gICAgfSxcbiAgICAvLyAyNS40LjUuMSBQcm9taXNlLnByb3RvdHlwZS5jYXRjaChvblJlamVjdGVkKVxuICAgICdjYXRjaCc6IGZ1bmN0aW9uKG9uUmVqZWN0ZWQpe1xuICAgICAgcmV0dXJuIHRoaXMudGhlbih1bmRlZmluZWQsIG9uUmVqZWN0ZWQpO1xuICAgIH1cbiAgfSk7XG4gIFByb21pc2VDYXBhYmlsaXR5ID0gZnVuY3Rpb24oKXtcbiAgICB2YXIgcHJvbWlzZSAgPSBuZXcgSW50ZXJuYWw7XG4gICAgdGhpcy5wcm9taXNlID0gcHJvbWlzZTtcbiAgICB0aGlzLnJlc29sdmUgPSBjdHgoJHJlc29sdmUsIHByb21pc2UsIDEpO1xuICAgIHRoaXMucmVqZWN0ICA9IGN0eCgkcmVqZWN0LCBwcm9taXNlLCAxKTtcbiAgfTtcbn1cblxuJGV4cG9ydCgkZXhwb3J0LkcgKyAkZXhwb3J0LlcgKyAkZXhwb3J0LkYgKiAhVVNFX05BVElWRSwge1Byb21pc2U6ICRQcm9taXNlfSk7XG5yZXF1aXJlKCcuL19zZXQtdG8tc3RyaW5nLXRhZycpKCRQcm9taXNlLCBQUk9NSVNFKTtcbnJlcXVpcmUoJy4vX3NldC1zcGVjaWVzJykoUFJPTUlTRSk7XG5XcmFwcGVyID0gcmVxdWlyZSgnLi9fY29yZScpW1BST01JU0VdO1xuXG4vLyBzdGF0aWNzXG4kZXhwb3J0KCRleHBvcnQuUyArICRleHBvcnQuRiAqICFVU0VfTkFUSVZFLCBQUk9NSVNFLCB7XG4gIC8vIDI1LjQuNC41IFByb21pc2UucmVqZWN0KHIpXG4gIHJlamVjdDogZnVuY3Rpb24gcmVqZWN0KHIpe1xuICAgIHZhciBjYXBhYmlsaXR5ID0gbmV3UHJvbWlzZUNhcGFiaWxpdHkodGhpcylcbiAgICAgICwgJCRyZWplY3QgICA9IGNhcGFiaWxpdHkucmVqZWN0O1xuICAgICQkcmVqZWN0KHIpO1xuICAgIHJldHVybiBjYXBhYmlsaXR5LnByb21pc2U7XG4gIH1cbn0pO1xuJGV4cG9ydCgkZXhwb3J0LlMgKyAkZXhwb3J0LkYgKiAoTElCUkFSWSB8fCAhVVNFX05BVElWRSksIFBST01JU0UsIHtcbiAgLy8gMjUuNC40LjYgUHJvbWlzZS5yZXNvbHZlKHgpXG4gIHJlc29sdmU6IGZ1bmN0aW9uIHJlc29sdmUoeCl7XG4gICAgLy8gaW5zdGFuY2VvZiBpbnN0ZWFkIG9mIGludGVybmFsIHNsb3QgY2hlY2sgYmVjYXVzZSB3ZSBzaG91bGQgZml4IGl0IHdpdGhvdXQgcmVwbGFjZW1lbnQgbmF0aXZlIFByb21pc2UgY29yZVxuICAgIGlmKHggaW5zdGFuY2VvZiAkUHJvbWlzZSAmJiBzYW1lQ29uc3RydWN0b3IoeC5jb25zdHJ1Y3RvciwgdGhpcykpcmV0dXJuIHg7XG4gICAgdmFyIGNhcGFiaWxpdHkgPSBuZXdQcm9taXNlQ2FwYWJpbGl0eSh0aGlzKVxuICAgICAgLCAkJHJlc29sdmUgID0gY2FwYWJpbGl0eS5yZXNvbHZlO1xuICAgICQkcmVzb2x2ZSh4KTtcbiAgICByZXR1cm4gY2FwYWJpbGl0eS5wcm9taXNlO1xuICB9XG59KTtcbiRleHBvcnQoJGV4cG9ydC5TICsgJGV4cG9ydC5GICogIShVU0VfTkFUSVZFICYmIHJlcXVpcmUoJy4vX2l0ZXItZGV0ZWN0JykoZnVuY3Rpb24oaXRlcil7XG4gICRQcm9taXNlLmFsbChpdGVyKVsnY2F0Y2gnXShlbXB0eSk7XG59KSksIFBST01JU0UsIHtcbiAgLy8gMjUuNC40LjEgUHJvbWlzZS5hbGwoaXRlcmFibGUpXG4gIGFsbDogZnVuY3Rpb24gYWxsKGl0ZXJhYmxlKXtcbiAgICB2YXIgQyAgICAgICAgICA9IHRoaXNcbiAgICAgICwgY2FwYWJpbGl0eSA9IG5ld1Byb21pc2VDYXBhYmlsaXR5KEMpXG4gICAgICAsIHJlc29sdmUgICAgPSBjYXBhYmlsaXR5LnJlc29sdmVcbiAgICAgICwgcmVqZWN0ICAgICA9IGNhcGFiaWxpdHkucmVqZWN0O1xuICAgIHZhciBhYnJ1cHQgPSBwZXJmb3JtKGZ1bmN0aW9uKCl7XG4gICAgICB2YXIgdmFsdWVzICAgID0gW11cbiAgICAgICAgLCBpbmRleCAgICAgPSAwXG4gICAgICAgICwgcmVtYWluaW5nID0gMTtcbiAgICAgIGZvck9mKGl0ZXJhYmxlLCBmYWxzZSwgZnVuY3Rpb24ocHJvbWlzZSl7XG4gICAgICAgIHZhciAkaW5kZXggICAgICAgID0gaW5kZXgrK1xuICAgICAgICAgICwgYWxyZWFkeUNhbGxlZCA9IGZhbHNlO1xuICAgICAgICB2YWx1ZXMucHVzaCh1bmRlZmluZWQpO1xuICAgICAgICByZW1haW5pbmcrKztcbiAgICAgICAgQy5yZXNvbHZlKHByb21pc2UpLnRoZW4oZnVuY3Rpb24odmFsdWUpe1xuICAgICAgICAgIGlmKGFscmVhZHlDYWxsZWQpcmV0dXJuO1xuICAgICAgICAgIGFscmVhZHlDYWxsZWQgID0gdHJ1ZTtcbiAgICAgICAgICB2YWx1ZXNbJGluZGV4XSA9IHZhbHVlO1xuICAgICAgICAgIC0tcmVtYWluaW5nIHx8IHJlc29sdmUodmFsdWVzKTtcbiAgICAgICAgfSwgcmVqZWN0KTtcbiAgICAgIH0pO1xuICAgICAgLS1yZW1haW5pbmcgfHwgcmVzb2x2ZSh2YWx1ZXMpO1xuICAgIH0pO1xuICAgIGlmKGFicnVwdClyZWplY3QoYWJydXB0LmVycm9yKTtcbiAgICByZXR1cm4gY2FwYWJpbGl0eS5wcm9taXNlO1xuICB9LFxuICAvLyAyNS40LjQuNCBQcm9taXNlLnJhY2UoaXRlcmFibGUpXG4gIHJhY2U6IGZ1bmN0aW9uIHJhY2UoaXRlcmFibGUpe1xuICAgIHZhciBDICAgICAgICAgID0gdGhpc1xuICAgICAgLCBjYXBhYmlsaXR5ID0gbmV3UHJvbWlzZUNhcGFiaWxpdHkoQylcbiAgICAgICwgcmVqZWN0ICAgICA9IGNhcGFiaWxpdHkucmVqZWN0O1xuICAgIHZhciBhYnJ1cHQgPSBwZXJmb3JtKGZ1bmN0aW9uKCl7XG4gICAgICBmb3JPZihpdGVyYWJsZSwgZmFsc2UsIGZ1bmN0aW9uKHByb21pc2Upe1xuICAgICAgICBDLnJlc29sdmUocHJvbWlzZSkudGhlbihjYXBhYmlsaXR5LnJlc29sdmUsIHJlamVjdCk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgICBpZihhYnJ1cHQpcmVqZWN0KGFicnVwdC5lcnJvcik7XG4gICAgcmV0dXJuIGNhcGFiaWxpdHkucHJvbWlzZTtcbiAgfVxufSk7IiwiLy8gMjYuMS4xIFJlZmxlY3QuYXBwbHkodGFyZ2V0LCB0aGlzQXJndW1lbnQsIGFyZ3VtZW50c0xpc3QpXG52YXIgJGV4cG9ydCA9IHJlcXVpcmUoJy4vX2V4cG9ydCcpXG4gICwgX2FwcGx5ICA9IEZ1bmN0aW9uLmFwcGx5O1xuXG4kZXhwb3J0KCRleHBvcnQuUywgJ1JlZmxlY3QnLCB7XG4gIGFwcGx5OiBmdW5jdGlvbiBhcHBseSh0YXJnZXQsIHRoaXNBcmd1bWVudCwgYXJndW1lbnRzTGlzdCl7XG4gICAgcmV0dXJuIF9hcHBseS5jYWxsKHRhcmdldCwgdGhpc0FyZ3VtZW50LCBhcmd1bWVudHNMaXN0KTtcbiAgfVxufSk7IiwiLy8gMjYuMS4yIFJlZmxlY3QuY29uc3RydWN0KHRhcmdldCwgYXJndW1lbnRzTGlzdCBbLCBuZXdUYXJnZXRdKVxudmFyICRleHBvcnQgICA9IHJlcXVpcmUoJy4vX2V4cG9ydCcpXG4gICwgY3JlYXRlICAgID0gcmVxdWlyZSgnLi9fb2JqZWN0LWNyZWF0ZScpXG4gICwgYUZ1bmN0aW9uID0gcmVxdWlyZSgnLi9fYS1mdW5jdGlvbicpXG4gICwgYW5PYmplY3QgID0gcmVxdWlyZSgnLi9fYW4tb2JqZWN0JylcbiAgLCBpc09iamVjdCAgPSByZXF1aXJlKCcuL19pcy1vYmplY3QnKVxuICAsIGJpbmQgICAgICA9IHJlcXVpcmUoJy4vX2JpbmQnKTtcblxuLy8gTVMgRWRnZSBzdXBwb3J0cyBvbmx5IDIgYXJndW1lbnRzXG4vLyBGRiBOaWdodGx5IHNldHMgdGhpcmQgYXJndW1lbnQgYXMgYG5ldy50YXJnZXRgLCBidXQgZG9lcyBub3QgY3JlYXRlIGB0aGlzYCBmcm9tIGl0XG4kZXhwb3J0KCRleHBvcnQuUyArICRleHBvcnQuRiAqIHJlcXVpcmUoJy4vX2ZhaWxzJykoZnVuY3Rpb24oKXtcbiAgZnVuY3Rpb24gRigpe31cbiAgcmV0dXJuICEoUmVmbGVjdC5jb25zdHJ1Y3QoZnVuY3Rpb24oKXt9LCBbXSwgRikgaW5zdGFuY2VvZiBGKTtcbn0pLCAnUmVmbGVjdCcsIHtcbiAgY29uc3RydWN0OiBmdW5jdGlvbiBjb25zdHJ1Y3QoVGFyZ2V0LCBhcmdzIC8qLCBuZXdUYXJnZXQqLyl7XG4gICAgYUZ1bmN0aW9uKFRhcmdldCk7XG4gICAgdmFyIG5ld1RhcmdldCA9IGFyZ3VtZW50cy5sZW5ndGggPCAzID8gVGFyZ2V0IDogYUZ1bmN0aW9uKGFyZ3VtZW50c1syXSk7XG4gICAgaWYoVGFyZ2V0ID09IG5ld1RhcmdldCl7XG4gICAgICAvLyB3L28gYWx0ZXJlZCBuZXdUYXJnZXQsIG9wdGltaXphdGlvbiBmb3IgMC00IGFyZ3VtZW50c1xuICAgICAgaWYoYXJncyAhPSB1bmRlZmluZWQpc3dpdGNoKGFuT2JqZWN0KGFyZ3MpLmxlbmd0aCl7XG4gICAgICAgIGNhc2UgMDogcmV0dXJuIG5ldyBUYXJnZXQ7XG4gICAgICAgIGNhc2UgMTogcmV0dXJuIG5ldyBUYXJnZXQoYXJnc1swXSk7XG4gICAgICAgIGNhc2UgMjogcmV0dXJuIG5ldyBUYXJnZXQoYXJnc1swXSwgYXJnc1sxXSk7XG4gICAgICAgIGNhc2UgMzogcmV0dXJuIG5ldyBUYXJnZXQoYXJnc1swXSwgYXJnc1sxXSwgYXJnc1syXSk7XG4gICAgICAgIGNhc2UgNDogcmV0dXJuIG5ldyBUYXJnZXQoYXJnc1swXSwgYXJnc1sxXSwgYXJnc1syXSwgYXJnc1szXSk7XG4gICAgICB9XG4gICAgICAvLyB3L28gYWx0ZXJlZCBuZXdUYXJnZXQsIGxvdCBvZiBhcmd1bWVudHMgY2FzZVxuICAgICAgdmFyICRhcmdzID0gW251bGxdO1xuICAgICAgJGFyZ3MucHVzaC5hcHBseSgkYXJncywgYXJncyk7XG4gICAgICByZXR1cm4gbmV3IChiaW5kLmFwcGx5KFRhcmdldCwgJGFyZ3MpKTtcbiAgICB9XG4gICAgLy8gd2l0aCBhbHRlcmVkIG5ld1RhcmdldCwgbm90IHN1cHBvcnQgYnVpbHQtaW4gY29uc3RydWN0b3JzXG4gICAgdmFyIHByb3RvICAgID0gbmV3VGFyZ2V0LnByb3RvdHlwZVxuICAgICAgLCBpbnN0YW5jZSA9IGNyZWF0ZShpc09iamVjdChwcm90bykgPyBwcm90byA6IE9iamVjdC5wcm90b3R5cGUpXG4gICAgICAsIHJlc3VsdCAgID0gRnVuY3Rpb24uYXBwbHkuY2FsbChUYXJnZXQsIGluc3RhbmNlLCBhcmdzKTtcbiAgICByZXR1cm4gaXNPYmplY3QocmVzdWx0KSA/IHJlc3VsdCA6IGluc3RhbmNlO1xuICB9XG59KTsiLCIvLyAyNi4xLjMgUmVmbGVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIHByb3BlcnR5S2V5LCBhdHRyaWJ1dGVzKVxudmFyIGRQICAgICAgICAgID0gcmVxdWlyZSgnLi9fb2JqZWN0LWRwJylcbiAgLCAkZXhwb3J0ICAgICA9IHJlcXVpcmUoJy4vX2V4cG9ydCcpXG4gICwgYW5PYmplY3QgICAgPSByZXF1aXJlKCcuL19hbi1vYmplY3QnKVxuICAsIHRvUHJpbWl0aXZlID0gcmVxdWlyZSgnLi9fdG8tcHJpbWl0aXZlJyk7XG5cbi8vIE1TIEVkZ2UgaGFzIGJyb2tlbiBSZWZsZWN0LmRlZmluZVByb3BlcnR5IC0gdGhyb3dpbmcgaW5zdGVhZCBvZiByZXR1cm5pbmcgZmFsc2VcbiRleHBvcnQoJGV4cG9ydC5TICsgJGV4cG9ydC5GICogcmVxdWlyZSgnLi9fZmFpbHMnKShmdW5jdGlvbigpe1xuICBSZWZsZWN0LmRlZmluZVByb3BlcnR5KGRQLmYoe30sIDEsIHt2YWx1ZTogMX0pLCAxLCB7dmFsdWU6IDJ9KTtcbn0pLCAnUmVmbGVjdCcsIHtcbiAgZGVmaW5lUHJvcGVydHk6IGZ1bmN0aW9uIGRlZmluZVByb3BlcnR5KHRhcmdldCwgcHJvcGVydHlLZXksIGF0dHJpYnV0ZXMpe1xuICAgIGFuT2JqZWN0KHRhcmdldCk7XG4gICAgcHJvcGVydHlLZXkgPSB0b1ByaW1pdGl2ZShwcm9wZXJ0eUtleSwgdHJ1ZSk7XG4gICAgYW5PYmplY3QoYXR0cmlidXRlcyk7XG4gICAgdHJ5IHtcbiAgICAgIGRQLmYodGFyZ2V0LCBwcm9wZXJ0eUtleSwgYXR0cmlidXRlcyk7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9IGNhdGNoKGUpe1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfVxufSk7IiwiLy8gMjYuMS40IFJlZmxlY3QuZGVsZXRlUHJvcGVydHkodGFyZ2V0LCBwcm9wZXJ0eUtleSlcbnZhciAkZXhwb3J0ICA9IHJlcXVpcmUoJy4vX2V4cG9ydCcpXG4gICwgZ09QRCAgICAgPSByZXF1aXJlKCcuL19vYmplY3QtZ29wZCcpLmZcbiAgLCBhbk9iamVjdCA9IHJlcXVpcmUoJy4vX2FuLW9iamVjdCcpO1xuXG4kZXhwb3J0KCRleHBvcnQuUywgJ1JlZmxlY3QnLCB7XG4gIGRlbGV0ZVByb3BlcnR5OiBmdW5jdGlvbiBkZWxldGVQcm9wZXJ0eSh0YXJnZXQsIHByb3BlcnR5S2V5KXtcbiAgICB2YXIgZGVzYyA9IGdPUEQoYW5PYmplY3QodGFyZ2V0KSwgcHJvcGVydHlLZXkpO1xuICAgIHJldHVybiBkZXNjICYmICFkZXNjLmNvbmZpZ3VyYWJsZSA/IGZhbHNlIDogZGVsZXRlIHRhcmdldFtwcm9wZXJ0eUtleV07XG4gIH1cbn0pOyIsIid1c2Ugc3RyaWN0Jztcbi8vIDI2LjEuNSBSZWZsZWN0LmVudW1lcmF0ZSh0YXJnZXQpXG52YXIgJGV4cG9ydCAgPSByZXF1aXJlKCcuL19leHBvcnQnKVxuICAsIGFuT2JqZWN0ID0gcmVxdWlyZSgnLi9fYW4tb2JqZWN0Jyk7XG52YXIgRW51bWVyYXRlID0gZnVuY3Rpb24oaXRlcmF0ZWQpe1xuICB0aGlzLl90ID0gYW5PYmplY3QoaXRlcmF0ZWQpOyAvLyB0YXJnZXRcbiAgdGhpcy5faSA9IDA7ICAgICAgICAgICAgICAgICAgLy8gbmV4dCBpbmRleFxuICB2YXIga2V5cyA9IHRoaXMuX2sgPSBbXSAgICAgICAvLyBrZXlzXG4gICAgLCBrZXk7XG4gIGZvcihrZXkgaW4gaXRlcmF0ZWQpa2V5cy5wdXNoKGtleSk7XG59O1xucmVxdWlyZSgnLi9faXRlci1jcmVhdGUnKShFbnVtZXJhdGUsICdPYmplY3QnLCBmdW5jdGlvbigpe1xuICB2YXIgdGhhdCA9IHRoaXNcbiAgICAsIGtleXMgPSB0aGF0Ll9rXG4gICAgLCBrZXk7XG4gIGRvIHtcbiAgICBpZih0aGF0Ll9pID49IGtleXMubGVuZ3RoKXJldHVybiB7dmFsdWU6IHVuZGVmaW5lZCwgZG9uZTogdHJ1ZX07XG4gIH0gd2hpbGUoISgoa2V5ID0ga2V5c1t0aGF0Ll9pKytdKSBpbiB0aGF0Ll90KSk7XG4gIHJldHVybiB7dmFsdWU6IGtleSwgZG9uZTogZmFsc2V9O1xufSk7XG5cbiRleHBvcnQoJGV4cG9ydC5TLCAnUmVmbGVjdCcsIHtcbiAgZW51bWVyYXRlOiBmdW5jdGlvbiBlbnVtZXJhdGUodGFyZ2V0KXtcbiAgICByZXR1cm4gbmV3IEVudW1lcmF0ZSh0YXJnZXQpO1xuICB9XG59KTsiLCIvLyAyNi4xLjcgUmVmbGVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IodGFyZ2V0LCBwcm9wZXJ0eUtleSlcbnZhciBnT1BEICAgICA9IHJlcXVpcmUoJy4vX29iamVjdC1nb3BkJylcbiAgLCAkZXhwb3J0ICA9IHJlcXVpcmUoJy4vX2V4cG9ydCcpXG4gICwgYW5PYmplY3QgPSByZXF1aXJlKCcuL19hbi1vYmplY3QnKTtcblxuJGV4cG9ydCgkZXhwb3J0LlMsICdSZWZsZWN0Jywge1xuICBnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3I6IGZ1bmN0aW9uIGdldE93blByb3BlcnR5RGVzY3JpcHRvcih0YXJnZXQsIHByb3BlcnR5S2V5KXtcbiAgICByZXR1cm4gZ09QRC5mKGFuT2JqZWN0KHRhcmdldCksIHByb3BlcnR5S2V5KTtcbiAgfVxufSk7IiwiLy8gMjYuMS44IFJlZmxlY3QuZ2V0UHJvdG90eXBlT2YodGFyZ2V0KVxudmFyICRleHBvcnQgID0gcmVxdWlyZSgnLi9fZXhwb3J0JylcbiAgLCBnZXRQcm90byA9IHJlcXVpcmUoJy4vX29iamVjdC1ncG8nKVxuICAsIGFuT2JqZWN0ID0gcmVxdWlyZSgnLi9fYW4tb2JqZWN0Jyk7XG5cbiRleHBvcnQoJGV4cG9ydC5TLCAnUmVmbGVjdCcsIHtcbiAgZ2V0UHJvdG90eXBlT2Y6IGZ1bmN0aW9uIGdldFByb3RvdHlwZU9mKHRhcmdldCl7XG4gICAgcmV0dXJuIGdldFByb3RvKGFuT2JqZWN0KHRhcmdldCkpO1xuICB9XG59KTsiLCIvLyAyNi4xLjYgUmVmbGVjdC5nZXQodGFyZ2V0LCBwcm9wZXJ0eUtleSBbLCByZWNlaXZlcl0pXG52YXIgZ09QRCAgICAgICAgICAgPSByZXF1aXJlKCcuL19vYmplY3QtZ29wZCcpXG4gICwgZ2V0UHJvdG90eXBlT2YgPSByZXF1aXJlKCcuL19vYmplY3QtZ3BvJylcbiAgLCBoYXMgICAgICAgICAgICA9IHJlcXVpcmUoJy4vX2hhcycpXG4gICwgJGV4cG9ydCAgICAgICAgPSByZXF1aXJlKCcuL19leHBvcnQnKVxuICAsIGlzT2JqZWN0ICAgICAgID0gcmVxdWlyZSgnLi9faXMtb2JqZWN0JylcbiAgLCBhbk9iamVjdCAgICAgICA9IHJlcXVpcmUoJy4vX2FuLW9iamVjdCcpO1xuXG5mdW5jdGlvbiBnZXQodGFyZ2V0LCBwcm9wZXJ0eUtleS8qLCByZWNlaXZlciovKXtcbiAgdmFyIHJlY2VpdmVyID0gYXJndW1lbnRzLmxlbmd0aCA8IDMgPyB0YXJnZXQgOiBhcmd1bWVudHNbMl1cbiAgICAsIGRlc2MsIHByb3RvO1xuICBpZihhbk9iamVjdCh0YXJnZXQpID09PSByZWNlaXZlcilyZXR1cm4gdGFyZ2V0W3Byb3BlcnR5S2V5XTtcbiAgaWYoZGVzYyA9IGdPUEQuZih0YXJnZXQsIHByb3BlcnR5S2V5KSlyZXR1cm4gaGFzKGRlc2MsICd2YWx1ZScpXG4gICAgPyBkZXNjLnZhbHVlXG4gICAgOiBkZXNjLmdldCAhPT0gdW5kZWZpbmVkXG4gICAgICA/IGRlc2MuZ2V0LmNhbGwocmVjZWl2ZXIpXG4gICAgICA6IHVuZGVmaW5lZDtcbiAgaWYoaXNPYmplY3QocHJvdG8gPSBnZXRQcm90b3R5cGVPZih0YXJnZXQpKSlyZXR1cm4gZ2V0KHByb3RvLCBwcm9wZXJ0eUtleSwgcmVjZWl2ZXIpO1xufVxuXG4kZXhwb3J0KCRleHBvcnQuUywgJ1JlZmxlY3QnLCB7Z2V0OiBnZXR9KTsiLCIvLyAyNi4xLjkgUmVmbGVjdC5oYXModGFyZ2V0LCBwcm9wZXJ0eUtleSlcbnZhciAkZXhwb3J0ID0gcmVxdWlyZSgnLi9fZXhwb3J0Jyk7XG5cbiRleHBvcnQoJGV4cG9ydC5TLCAnUmVmbGVjdCcsIHtcbiAgaGFzOiBmdW5jdGlvbiBoYXModGFyZ2V0LCBwcm9wZXJ0eUtleSl7XG4gICAgcmV0dXJuIHByb3BlcnR5S2V5IGluIHRhcmdldDtcbiAgfVxufSk7IiwiLy8gMjYuMS4xMCBSZWZsZWN0LmlzRXh0ZW5zaWJsZSh0YXJnZXQpXG52YXIgJGV4cG9ydCAgICAgICA9IHJlcXVpcmUoJy4vX2V4cG9ydCcpXG4gICwgYW5PYmplY3QgICAgICA9IHJlcXVpcmUoJy4vX2FuLW9iamVjdCcpXG4gICwgJGlzRXh0ZW5zaWJsZSA9IE9iamVjdC5pc0V4dGVuc2libGU7XG5cbiRleHBvcnQoJGV4cG9ydC5TLCAnUmVmbGVjdCcsIHtcbiAgaXNFeHRlbnNpYmxlOiBmdW5jdGlvbiBpc0V4dGVuc2libGUodGFyZ2V0KXtcbiAgICBhbk9iamVjdCh0YXJnZXQpO1xuICAgIHJldHVybiAkaXNFeHRlbnNpYmxlID8gJGlzRXh0ZW5zaWJsZSh0YXJnZXQpIDogdHJ1ZTtcbiAgfVxufSk7IiwiLy8gMjYuMS4xMSBSZWZsZWN0Lm93bktleXModGFyZ2V0KVxudmFyICRleHBvcnQgPSByZXF1aXJlKCcuL19leHBvcnQnKTtcblxuJGV4cG9ydCgkZXhwb3J0LlMsICdSZWZsZWN0Jywge293bktleXM6IHJlcXVpcmUoJy4vX293bi1rZXlzJyl9KTsiLCIvLyAyNi4xLjEyIFJlZmxlY3QucHJldmVudEV4dGVuc2lvbnModGFyZ2V0KVxudmFyICRleHBvcnQgICAgICAgICAgICA9IHJlcXVpcmUoJy4vX2V4cG9ydCcpXG4gICwgYW5PYmplY3QgICAgICAgICAgID0gcmVxdWlyZSgnLi9fYW4tb2JqZWN0JylcbiAgLCAkcHJldmVudEV4dGVuc2lvbnMgPSBPYmplY3QucHJldmVudEV4dGVuc2lvbnM7XG5cbiRleHBvcnQoJGV4cG9ydC5TLCAnUmVmbGVjdCcsIHtcbiAgcHJldmVudEV4dGVuc2lvbnM6IGZ1bmN0aW9uIHByZXZlbnRFeHRlbnNpb25zKHRhcmdldCl7XG4gICAgYW5PYmplY3QodGFyZ2V0KTtcbiAgICB0cnkge1xuICAgICAgaWYoJHByZXZlbnRFeHRlbnNpb25zKSRwcmV2ZW50RXh0ZW5zaW9ucyh0YXJnZXQpO1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSBjYXRjaChlKXtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH1cbn0pOyIsIi8vIDI2LjEuMTQgUmVmbGVjdC5zZXRQcm90b3R5cGVPZih0YXJnZXQsIHByb3RvKVxudmFyICRleHBvcnQgID0gcmVxdWlyZSgnLi9fZXhwb3J0JylcbiAgLCBzZXRQcm90byA9IHJlcXVpcmUoJy4vX3NldC1wcm90bycpO1xuXG5pZihzZXRQcm90bykkZXhwb3J0KCRleHBvcnQuUywgJ1JlZmxlY3QnLCB7XG4gIHNldFByb3RvdHlwZU9mOiBmdW5jdGlvbiBzZXRQcm90b3R5cGVPZih0YXJnZXQsIHByb3RvKXtcbiAgICBzZXRQcm90by5jaGVjayh0YXJnZXQsIHByb3RvKTtcbiAgICB0cnkge1xuICAgICAgc2V0UHJvdG8uc2V0KHRhcmdldCwgcHJvdG8pO1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSBjYXRjaChlKXtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH1cbn0pOyIsIi8vIDI2LjEuMTMgUmVmbGVjdC5zZXQodGFyZ2V0LCBwcm9wZXJ0eUtleSwgViBbLCByZWNlaXZlcl0pXG52YXIgZFAgICAgICAgICAgICAgPSByZXF1aXJlKCcuL19vYmplY3QtZHAnKVxuICAsIGdPUEQgICAgICAgICAgID0gcmVxdWlyZSgnLi9fb2JqZWN0LWdvcGQnKVxuICAsIGdldFByb3RvdHlwZU9mID0gcmVxdWlyZSgnLi9fb2JqZWN0LWdwbycpXG4gICwgaGFzICAgICAgICAgICAgPSByZXF1aXJlKCcuL19oYXMnKVxuICAsICRleHBvcnQgICAgICAgID0gcmVxdWlyZSgnLi9fZXhwb3J0JylcbiAgLCBjcmVhdGVEZXNjICAgICA9IHJlcXVpcmUoJy4vX3Byb3BlcnR5LWRlc2MnKVxuICAsIGFuT2JqZWN0ICAgICAgID0gcmVxdWlyZSgnLi9fYW4tb2JqZWN0JylcbiAgLCBpc09iamVjdCAgICAgICA9IHJlcXVpcmUoJy4vX2lzLW9iamVjdCcpO1xuXG5mdW5jdGlvbiBzZXQodGFyZ2V0LCBwcm9wZXJ0eUtleSwgVi8qLCByZWNlaXZlciovKXtcbiAgdmFyIHJlY2VpdmVyID0gYXJndW1lbnRzLmxlbmd0aCA8IDQgPyB0YXJnZXQgOiBhcmd1bWVudHNbM11cbiAgICAsIG93bkRlc2MgID0gZ09QRC5mKGFuT2JqZWN0KHRhcmdldCksIHByb3BlcnR5S2V5KVxuICAgICwgZXhpc3RpbmdEZXNjcmlwdG9yLCBwcm90bztcbiAgaWYoIW93bkRlc2Mpe1xuICAgIGlmKGlzT2JqZWN0KHByb3RvID0gZ2V0UHJvdG90eXBlT2YodGFyZ2V0KSkpe1xuICAgICAgcmV0dXJuIHNldChwcm90bywgcHJvcGVydHlLZXksIFYsIHJlY2VpdmVyKTtcbiAgICB9XG4gICAgb3duRGVzYyA9IGNyZWF0ZURlc2MoMCk7XG4gIH1cbiAgaWYoaGFzKG93bkRlc2MsICd2YWx1ZScpKXtcbiAgICBpZihvd25EZXNjLndyaXRhYmxlID09PSBmYWxzZSB8fCAhaXNPYmplY3QocmVjZWl2ZXIpKXJldHVybiBmYWxzZTtcbiAgICBleGlzdGluZ0Rlc2NyaXB0b3IgPSBnT1BELmYocmVjZWl2ZXIsIHByb3BlcnR5S2V5KSB8fCBjcmVhdGVEZXNjKDApO1xuICAgIGV4aXN0aW5nRGVzY3JpcHRvci52YWx1ZSA9IFY7XG4gICAgZFAuZihyZWNlaXZlciwgcHJvcGVydHlLZXksIGV4aXN0aW5nRGVzY3JpcHRvcik7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cbiAgcmV0dXJuIG93bkRlc2Muc2V0ID09PSB1bmRlZmluZWQgPyBmYWxzZSA6IChvd25EZXNjLnNldC5jYWxsKHJlY2VpdmVyLCBWKSwgdHJ1ZSk7XG59XG5cbiRleHBvcnQoJGV4cG9ydC5TLCAnUmVmbGVjdCcsIHtzZXQ6IHNldH0pOyIsInZhciBnbG9iYWwgICAgICAgICAgICA9IHJlcXVpcmUoJy4vX2dsb2JhbCcpXG4gICwgaW5oZXJpdElmUmVxdWlyZWQgPSByZXF1aXJlKCcuL19pbmhlcml0LWlmLXJlcXVpcmVkJylcbiAgLCBkUCAgICAgICAgICAgICAgICA9IHJlcXVpcmUoJy4vX29iamVjdC1kcCcpLmZcbiAgLCBnT1BOICAgICAgICAgICAgICA9IHJlcXVpcmUoJy4vX29iamVjdC1nb3BuJykuZlxuICAsIGlzUmVnRXhwICAgICAgICAgID0gcmVxdWlyZSgnLi9faXMtcmVnZXhwJylcbiAgLCAkZmxhZ3MgICAgICAgICAgICA9IHJlcXVpcmUoJy4vX2ZsYWdzJylcbiAgLCAkUmVnRXhwICAgICAgICAgICA9IGdsb2JhbC5SZWdFeHBcbiAgLCBCYXNlICAgICAgICAgICAgICA9ICRSZWdFeHBcbiAgLCBwcm90byAgICAgICAgICAgICA9ICRSZWdFeHAucHJvdG90eXBlXG4gICwgcmUxICAgICAgICAgICAgICAgPSAvYS9nXG4gICwgcmUyICAgICAgICAgICAgICAgPSAvYS9nXG4gIC8vIFwibmV3XCIgY3JlYXRlcyBhIG5ldyBvYmplY3QsIG9sZCB3ZWJraXQgYnVnZ3kgaGVyZVxuICAsIENPUlJFQ1RfTkVXICAgICAgID0gbmV3ICRSZWdFeHAocmUxKSAhPT0gcmUxO1xuXG5pZihyZXF1aXJlKCcuL19kZXNjcmlwdG9ycycpICYmICghQ09SUkVDVF9ORVcgfHwgcmVxdWlyZSgnLi9fZmFpbHMnKShmdW5jdGlvbigpe1xuICByZTJbcmVxdWlyZSgnLi9fd2tzJykoJ21hdGNoJyldID0gZmFsc2U7XG4gIC8vIFJlZ0V4cCBjb25zdHJ1Y3RvciBjYW4gYWx0ZXIgZmxhZ3MgYW5kIElzUmVnRXhwIHdvcmtzIGNvcnJlY3Qgd2l0aCBAQG1hdGNoXG4gIHJldHVybiAkUmVnRXhwKHJlMSkgIT0gcmUxIHx8ICRSZWdFeHAocmUyKSA9PSByZTIgfHwgJFJlZ0V4cChyZTEsICdpJykgIT0gJy9hL2knO1xufSkpKXtcbiAgJFJlZ0V4cCA9IGZ1bmN0aW9uIFJlZ0V4cChwLCBmKXtcbiAgICB2YXIgdGlSRSA9IHRoaXMgaW5zdGFuY2VvZiAkUmVnRXhwXG4gICAgICAsIHBpUkUgPSBpc1JlZ0V4cChwKVxuICAgICAgLCBmaVUgID0gZiA9PT0gdW5kZWZpbmVkO1xuICAgIHJldHVybiAhdGlSRSAmJiBwaVJFICYmIHAuY29uc3RydWN0b3IgPT09ICRSZWdFeHAgJiYgZmlVID8gcFxuICAgICAgOiBpbmhlcml0SWZSZXF1aXJlZChDT1JSRUNUX05FV1xuICAgICAgICA/IG5ldyBCYXNlKHBpUkUgJiYgIWZpVSA/IHAuc291cmNlIDogcCwgZilcbiAgICAgICAgOiBCYXNlKChwaVJFID0gcCBpbnN0YW5jZW9mICRSZWdFeHApID8gcC5zb3VyY2UgOiBwLCBwaVJFICYmIGZpVSA/ICRmbGFncy5jYWxsKHApIDogZilcbiAgICAgICwgdGlSRSA/IHRoaXMgOiBwcm90bywgJFJlZ0V4cCk7XG4gIH07XG4gIHZhciBwcm94eSA9IGZ1bmN0aW9uKGtleSl7XG4gICAga2V5IGluICRSZWdFeHAgfHwgZFAoJFJlZ0V4cCwga2V5LCB7XG4gICAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgICBnZXQ6IGZ1bmN0aW9uKCl7IHJldHVybiBCYXNlW2tleV07IH0sXG4gICAgICBzZXQ6IGZ1bmN0aW9uKGl0KXsgQmFzZVtrZXldID0gaXQ7IH1cbiAgICB9KTtcbiAgfTtcbiAgZm9yKHZhciBrZXlzID0gZ09QTihCYXNlKSwgaSA9IDA7IGtleXMubGVuZ3RoID4gaTsgKXByb3h5KGtleXNbaSsrXSk7XG4gIHByb3RvLmNvbnN0cnVjdG9yID0gJFJlZ0V4cDtcbiAgJFJlZ0V4cC5wcm90b3R5cGUgPSBwcm90bztcbiAgcmVxdWlyZSgnLi9fcmVkZWZpbmUnKShnbG9iYWwsICdSZWdFeHAnLCAkUmVnRXhwKTtcbn1cblxucmVxdWlyZSgnLi9fc2V0LXNwZWNpZXMnKSgnUmVnRXhwJyk7IiwiLy8gMjEuMi41LjMgZ2V0IFJlZ0V4cC5wcm90b3R5cGUuZmxhZ3MoKVxuaWYocmVxdWlyZSgnLi9fZGVzY3JpcHRvcnMnKSAmJiAvLi9nLmZsYWdzICE9ICdnJylyZXF1aXJlKCcuL19vYmplY3QtZHAnKS5mKFJlZ0V4cC5wcm90b3R5cGUsICdmbGFncycsIHtcbiAgY29uZmlndXJhYmxlOiB0cnVlLFxuICBnZXQ6IHJlcXVpcmUoJy4vX2ZsYWdzJylcbn0pOyIsIi8vIEBAbWF0Y2ggbG9naWNcbnJlcXVpcmUoJy4vX2ZpeC1yZS13a3MnKSgnbWF0Y2gnLCAxLCBmdW5jdGlvbihkZWZpbmVkLCBNQVRDSCwgJG1hdGNoKXtcbiAgLy8gMjEuMS4zLjExIFN0cmluZy5wcm90b3R5cGUubWF0Y2gocmVnZXhwKVxuICByZXR1cm4gW2Z1bmN0aW9uIG1hdGNoKHJlZ2V4cCl7XG4gICAgJ3VzZSBzdHJpY3QnO1xuICAgIHZhciBPICA9IGRlZmluZWQodGhpcylcbiAgICAgICwgZm4gPSByZWdleHAgPT0gdW5kZWZpbmVkID8gdW5kZWZpbmVkIDogcmVnZXhwW01BVENIXTtcbiAgICByZXR1cm4gZm4gIT09IHVuZGVmaW5lZCA/IGZuLmNhbGwocmVnZXhwLCBPKSA6IG5ldyBSZWdFeHAocmVnZXhwKVtNQVRDSF0oU3RyaW5nKE8pKTtcbiAgfSwgJG1hdGNoXTtcbn0pOyIsIi8vIEBAcmVwbGFjZSBsb2dpY1xucmVxdWlyZSgnLi9fZml4LXJlLXdrcycpKCdyZXBsYWNlJywgMiwgZnVuY3Rpb24oZGVmaW5lZCwgUkVQTEFDRSwgJHJlcGxhY2Upe1xuICAvLyAyMS4xLjMuMTQgU3RyaW5nLnByb3RvdHlwZS5yZXBsYWNlKHNlYXJjaFZhbHVlLCByZXBsYWNlVmFsdWUpXG4gIHJldHVybiBbZnVuY3Rpb24gcmVwbGFjZShzZWFyY2hWYWx1ZSwgcmVwbGFjZVZhbHVlKXtcbiAgICAndXNlIHN0cmljdCc7XG4gICAgdmFyIE8gID0gZGVmaW5lZCh0aGlzKVxuICAgICAgLCBmbiA9IHNlYXJjaFZhbHVlID09IHVuZGVmaW5lZCA/IHVuZGVmaW5lZCA6IHNlYXJjaFZhbHVlW1JFUExBQ0VdO1xuICAgIHJldHVybiBmbiAhPT0gdW5kZWZpbmVkXG4gICAgICA/IGZuLmNhbGwoc2VhcmNoVmFsdWUsIE8sIHJlcGxhY2VWYWx1ZSlcbiAgICAgIDogJHJlcGxhY2UuY2FsbChTdHJpbmcoTyksIHNlYXJjaFZhbHVlLCByZXBsYWNlVmFsdWUpO1xuICB9LCAkcmVwbGFjZV07XG59KTsiLCIvLyBAQHNlYXJjaCBsb2dpY1xucmVxdWlyZSgnLi9fZml4LXJlLXdrcycpKCdzZWFyY2gnLCAxLCBmdW5jdGlvbihkZWZpbmVkLCBTRUFSQ0gsICRzZWFyY2gpe1xuICAvLyAyMS4xLjMuMTUgU3RyaW5nLnByb3RvdHlwZS5zZWFyY2gocmVnZXhwKVxuICByZXR1cm4gW2Z1bmN0aW9uIHNlYXJjaChyZWdleHApe1xuICAgICd1c2Ugc3RyaWN0JztcbiAgICB2YXIgTyAgPSBkZWZpbmVkKHRoaXMpXG4gICAgICAsIGZuID0gcmVnZXhwID09IHVuZGVmaW5lZCA/IHVuZGVmaW5lZCA6IHJlZ2V4cFtTRUFSQ0hdO1xuICAgIHJldHVybiBmbiAhPT0gdW5kZWZpbmVkID8gZm4uY2FsbChyZWdleHAsIE8pIDogbmV3IFJlZ0V4cChyZWdleHApW1NFQVJDSF0oU3RyaW5nKE8pKTtcbiAgfSwgJHNlYXJjaF07XG59KTsiLCIvLyBAQHNwbGl0IGxvZ2ljXG5yZXF1aXJlKCcuL19maXgtcmUtd2tzJykoJ3NwbGl0JywgMiwgZnVuY3Rpb24oZGVmaW5lZCwgU1BMSVQsICRzcGxpdCl7XG4gICd1c2Ugc3RyaWN0JztcbiAgdmFyIGlzUmVnRXhwICAgPSByZXF1aXJlKCcuL19pcy1yZWdleHAnKVxuICAgICwgX3NwbGl0ICAgICA9ICRzcGxpdFxuICAgICwgJHB1c2ggICAgICA9IFtdLnB1c2hcbiAgICAsICRTUExJVCAgICAgPSAnc3BsaXQnXG4gICAgLCBMRU5HVEggICAgID0gJ2xlbmd0aCdcbiAgICAsIExBU1RfSU5ERVggPSAnbGFzdEluZGV4JztcbiAgaWYoXG4gICAgJ2FiYmMnWyRTUExJVF0oLyhiKSovKVsxXSA9PSAnYycgfHxcbiAgICAndGVzdCdbJFNQTElUXSgvKD86KS8sIC0xKVtMRU5HVEhdICE9IDQgfHxcbiAgICAnYWInWyRTUExJVF0oLyg/OmFiKSovKVtMRU5HVEhdICE9IDIgfHxcbiAgICAnLidbJFNQTElUXSgvKC4/KSguPykvKVtMRU5HVEhdICE9IDQgfHxcbiAgICAnLidbJFNQTElUXSgvKCkoKS8pW0xFTkdUSF0gPiAxIHx8XG4gICAgJydbJFNQTElUXSgvLj8vKVtMRU5HVEhdXG4gICl7XG4gICAgdmFyIE5QQ0cgPSAvKCk/Py8uZXhlYygnJylbMV0gPT09IHVuZGVmaW5lZDsgLy8gbm9ucGFydGljaXBhdGluZyBjYXB0dXJpbmcgZ3JvdXBcbiAgICAvLyBiYXNlZCBvbiBlczUtc2hpbSBpbXBsZW1lbnRhdGlvbiwgbmVlZCB0byByZXdvcmsgaXRcbiAgICAkc3BsaXQgPSBmdW5jdGlvbihzZXBhcmF0b3IsIGxpbWl0KXtcbiAgICAgIHZhciBzdHJpbmcgPSBTdHJpbmcodGhpcyk7XG4gICAgICBpZihzZXBhcmF0b3IgPT09IHVuZGVmaW5lZCAmJiBsaW1pdCA9PT0gMClyZXR1cm4gW107XG4gICAgICAvLyBJZiBgc2VwYXJhdG9yYCBpcyBub3QgYSByZWdleCwgdXNlIG5hdGl2ZSBzcGxpdFxuICAgICAgaWYoIWlzUmVnRXhwKHNlcGFyYXRvcikpcmV0dXJuIF9zcGxpdC5jYWxsKHN0cmluZywgc2VwYXJhdG9yLCBsaW1pdCk7XG4gICAgICB2YXIgb3V0cHV0ID0gW107XG4gICAgICB2YXIgZmxhZ3MgPSAoc2VwYXJhdG9yLmlnbm9yZUNhc2UgPyAnaScgOiAnJykgK1xuICAgICAgICAgICAgICAgICAgKHNlcGFyYXRvci5tdWx0aWxpbmUgPyAnbScgOiAnJykgK1xuICAgICAgICAgICAgICAgICAgKHNlcGFyYXRvci51bmljb2RlID8gJ3UnIDogJycpICtcbiAgICAgICAgICAgICAgICAgIChzZXBhcmF0b3Iuc3RpY2t5ID8gJ3knIDogJycpO1xuICAgICAgdmFyIGxhc3RMYXN0SW5kZXggPSAwO1xuICAgICAgdmFyIHNwbGl0TGltaXQgPSBsaW1pdCA9PT0gdW5kZWZpbmVkID8gNDI5NDk2NzI5NSA6IGxpbWl0ID4+PiAwO1xuICAgICAgLy8gTWFrZSBgZ2xvYmFsYCBhbmQgYXZvaWQgYGxhc3RJbmRleGAgaXNzdWVzIGJ5IHdvcmtpbmcgd2l0aCBhIGNvcHlcbiAgICAgIHZhciBzZXBhcmF0b3JDb3B5ID0gbmV3IFJlZ0V4cChzZXBhcmF0b3Iuc291cmNlLCBmbGFncyArICdnJyk7XG4gICAgICB2YXIgc2VwYXJhdG9yMiwgbWF0Y2gsIGxhc3RJbmRleCwgbGFzdExlbmd0aCwgaTtcbiAgICAgIC8vIERvZXNuJ3QgbmVlZCBmbGFncyBneSwgYnV0IHRoZXkgZG9uJ3QgaHVydFxuICAgICAgaWYoIU5QQ0cpc2VwYXJhdG9yMiA9IG5ldyBSZWdFeHAoJ14nICsgc2VwYXJhdG9yQ29weS5zb3VyY2UgKyAnJCg/IVxcXFxzKScsIGZsYWdzKTtcbiAgICAgIHdoaWxlKG1hdGNoID0gc2VwYXJhdG9yQ29weS5leGVjKHN0cmluZykpe1xuICAgICAgICAvLyBgc2VwYXJhdG9yQ29weS5sYXN0SW5kZXhgIGlzIG5vdCByZWxpYWJsZSBjcm9zcy1icm93c2VyXG4gICAgICAgIGxhc3RJbmRleCA9IG1hdGNoLmluZGV4ICsgbWF0Y2hbMF1bTEVOR1RIXTtcbiAgICAgICAgaWYobGFzdEluZGV4ID4gbGFzdExhc3RJbmRleCl7XG4gICAgICAgICAgb3V0cHV0LnB1c2goc3RyaW5nLnNsaWNlKGxhc3RMYXN0SW5kZXgsIG1hdGNoLmluZGV4KSk7XG4gICAgICAgICAgLy8gRml4IGJyb3dzZXJzIHdob3NlIGBleGVjYCBtZXRob2RzIGRvbid0IGNvbnNpc3RlbnRseSByZXR1cm4gYHVuZGVmaW5lZGAgZm9yIE5QQ0dcbiAgICAgICAgICBpZighTlBDRyAmJiBtYXRjaFtMRU5HVEhdID4gMSltYXRjaFswXS5yZXBsYWNlKHNlcGFyYXRvcjIsIGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICBmb3IoaSA9IDE7IGkgPCBhcmd1bWVudHNbTEVOR1RIXSAtIDI7IGkrKylpZihhcmd1bWVudHNbaV0gPT09IHVuZGVmaW5lZCltYXRjaFtpXSA9IHVuZGVmaW5lZDtcbiAgICAgICAgICB9KTtcbiAgICAgICAgICBpZihtYXRjaFtMRU5HVEhdID4gMSAmJiBtYXRjaC5pbmRleCA8IHN0cmluZ1tMRU5HVEhdKSRwdXNoLmFwcGx5KG91dHB1dCwgbWF0Y2guc2xpY2UoMSkpO1xuICAgICAgICAgIGxhc3RMZW5ndGggPSBtYXRjaFswXVtMRU5HVEhdO1xuICAgICAgICAgIGxhc3RMYXN0SW5kZXggPSBsYXN0SW5kZXg7XG4gICAgICAgICAgaWYob3V0cHV0W0xFTkdUSF0gPj0gc3BsaXRMaW1pdClicmVhaztcbiAgICAgICAgfVxuICAgICAgICBpZihzZXBhcmF0b3JDb3B5W0xBU1RfSU5ERVhdID09PSBtYXRjaC5pbmRleClzZXBhcmF0b3JDb3B5W0xBU1RfSU5ERVhdKys7IC8vIEF2b2lkIGFuIGluZmluaXRlIGxvb3BcbiAgICAgIH1cbiAgICAgIGlmKGxhc3RMYXN0SW5kZXggPT09IHN0cmluZ1tMRU5HVEhdKXtcbiAgICAgICAgaWYobGFzdExlbmd0aCB8fCAhc2VwYXJhdG9yQ29weS50ZXN0KCcnKSlvdXRwdXQucHVzaCgnJyk7XG4gICAgICB9IGVsc2Ugb3V0cHV0LnB1c2goc3RyaW5nLnNsaWNlKGxhc3RMYXN0SW5kZXgpKTtcbiAgICAgIHJldHVybiBvdXRwdXRbTEVOR1RIXSA+IHNwbGl0TGltaXQgPyBvdXRwdXQuc2xpY2UoMCwgc3BsaXRMaW1pdCkgOiBvdXRwdXQ7XG4gICAgfTtcbiAgLy8gQ2hha3JhLCBWOFxuICB9IGVsc2UgaWYoJzAnWyRTUExJVF0odW5kZWZpbmVkLCAwKVtMRU5HVEhdKXtcbiAgICAkc3BsaXQgPSBmdW5jdGlvbihzZXBhcmF0b3IsIGxpbWl0KXtcbiAgICAgIHJldHVybiBzZXBhcmF0b3IgPT09IHVuZGVmaW5lZCAmJiBsaW1pdCA9PT0gMCA/IFtdIDogX3NwbGl0LmNhbGwodGhpcywgc2VwYXJhdG9yLCBsaW1pdCk7XG4gICAgfTtcbiAgfVxuICAvLyAyMS4xLjMuMTcgU3RyaW5nLnByb3RvdHlwZS5zcGxpdChzZXBhcmF0b3IsIGxpbWl0KVxuICByZXR1cm4gW2Z1bmN0aW9uIHNwbGl0KHNlcGFyYXRvciwgbGltaXQpe1xuICAgIHZhciBPICA9IGRlZmluZWQodGhpcylcbiAgICAgICwgZm4gPSBzZXBhcmF0b3IgPT0gdW5kZWZpbmVkID8gdW5kZWZpbmVkIDogc2VwYXJhdG9yW1NQTElUXTtcbiAgICByZXR1cm4gZm4gIT09IHVuZGVmaW5lZCA/IGZuLmNhbGwoc2VwYXJhdG9yLCBPLCBsaW1pdCkgOiAkc3BsaXQuY2FsbChTdHJpbmcoTyksIHNlcGFyYXRvciwgbGltaXQpO1xuICB9LCAkc3BsaXRdO1xufSk7IiwiJ3VzZSBzdHJpY3QnO1xyXG5yZXF1aXJlKCcuL2VzNi5yZWdleHAuZmxhZ3MnKTtcclxudmFyIGFuT2JqZWN0ICAgID0gcmVxdWlyZSgnLi9fYW4tb2JqZWN0JylcclxuICAsICRmbGFncyAgICAgID0gcmVxdWlyZSgnLi9fZmxhZ3MnKVxyXG4gICwgREVTQ1JJUFRPUlMgPSByZXF1aXJlKCcuL19kZXNjcmlwdG9ycycpXHJcbiAgLCBUT19TVFJJTkcgICA9ICd0b1N0cmluZydcclxuICAsICR0b1N0cmluZyAgID0gLy4vW1RPX1NUUklOR107XHJcblxyXG52YXIgZGVmaW5lID0gZnVuY3Rpb24oZm4pe1xyXG4gIHJlcXVpcmUoJy4vX3JlZGVmaW5lJykoUmVnRXhwLnByb3RvdHlwZSwgVE9fU1RSSU5HLCBmbiwgdHJ1ZSk7XHJcbn07XHJcblxyXG4vLyAyMS4yLjUuMTQgUmVnRXhwLnByb3RvdHlwZS50b1N0cmluZygpXHJcbmlmKHJlcXVpcmUoJy4vX2ZhaWxzJykoZnVuY3Rpb24oKXsgcmV0dXJuICR0b1N0cmluZy5jYWxsKHtzb3VyY2U6ICdhJywgZmxhZ3M6ICdiJ30pICE9ICcvYS9iJzsgfSkpe1xyXG4gIGRlZmluZShmdW5jdGlvbiB0b1N0cmluZygpe1xyXG4gICAgdmFyIFIgPSBhbk9iamVjdCh0aGlzKTtcclxuICAgIHJldHVybiAnLycuY29uY2F0KFIuc291cmNlLCAnLycsXHJcbiAgICAgICdmbGFncycgaW4gUiA/IFIuZmxhZ3MgOiAhREVTQ1JJUFRPUlMgJiYgUiBpbnN0YW5jZW9mIFJlZ0V4cCA/ICRmbGFncy5jYWxsKFIpIDogdW5kZWZpbmVkKTtcclxuICB9KTtcclxuLy8gRkY0NC0gUmVnRXhwI3RvU3RyaW5nIGhhcyBhIHdyb25nIG5hbWVcclxufSBlbHNlIGlmKCR0b1N0cmluZy5uYW1lICE9IFRPX1NUUklORyl7XHJcbiAgZGVmaW5lKGZ1bmN0aW9uIHRvU3RyaW5nKCl7XHJcbiAgICByZXR1cm4gJHRvU3RyaW5nLmNhbGwodGhpcyk7XHJcbiAgfSk7XHJcbn0iLCIndXNlIHN0cmljdCc7XG52YXIgc3Ryb25nID0gcmVxdWlyZSgnLi9fY29sbGVjdGlvbi1zdHJvbmcnKTtcblxuLy8gMjMuMiBTZXQgT2JqZWN0c1xubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL19jb2xsZWN0aW9uJykoJ1NldCcsIGZ1bmN0aW9uKGdldCl7XG4gIHJldHVybiBmdW5jdGlvbiBTZXQoKXsgcmV0dXJuIGdldCh0aGlzLCBhcmd1bWVudHMubGVuZ3RoID4gMCA/IGFyZ3VtZW50c1swXSA6IHVuZGVmaW5lZCk7IH07XG59LCB7XG4gIC8vIDIzLjIuMy4xIFNldC5wcm90b3R5cGUuYWRkKHZhbHVlKVxuICBhZGQ6IGZ1bmN0aW9uIGFkZCh2YWx1ZSl7XG4gICAgcmV0dXJuIHN0cm9uZy5kZWYodGhpcywgdmFsdWUgPSB2YWx1ZSA9PT0gMCA/IDAgOiB2YWx1ZSwgdmFsdWUpO1xuICB9XG59LCBzdHJvbmcpOyIsIid1c2Ugc3RyaWN0Jztcbi8vIEIuMi4zLjIgU3RyaW5nLnByb3RvdHlwZS5hbmNob3IobmFtZSlcbnJlcXVpcmUoJy4vX3N0cmluZy1odG1sJykoJ2FuY2hvcicsIGZ1bmN0aW9uKGNyZWF0ZUhUTUwpe1xuICByZXR1cm4gZnVuY3Rpb24gYW5jaG9yKG5hbWUpe1xuICAgIHJldHVybiBjcmVhdGVIVE1MKHRoaXMsICdhJywgJ25hbWUnLCBuYW1lKTtcbiAgfVxufSk7IiwiJ3VzZSBzdHJpY3QnO1xuLy8gQi4yLjMuMyBTdHJpbmcucHJvdG90eXBlLmJpZygpXG5yZXF1aXJlKCcuL19zdHJpbmctaHRtbCcpKCdiaWcnLCBmdW5jdGlvbihjcmVhdGVIVE1MKXtcbiAgcmV0dXJuIGZ1bmN0aW9uIGJpZygpe1xuICAgIHJldHVybiBjcmVhdGVIVE1MKHRoaXMsICdiaWcnLCAnJywgJycpO1xuICB9XG59KTsiLCIndXNlIHN0cmljdCc7XG4vLyBCLjIuMy40IFN0cmluZy5wcm90b3R5cGUuYmxpbmsoKVxucmVxdWlyZSgnLi9fc3RyaW5nLWh0bWwnKSgnYmxpbmsnLCBmdW5jdGlvbihjcmVhdGVIVE1MKXtcbiAgcmV0dXJuIGZ1bmN0aW9uIGJsaW5rKCl7XG4gICAgcmV0dXJuIGNyZWF0ZUhUTUwodGhpcywgJ2JsaW5rJywgJycsICcnKTtcbiAgfVxufSk7IiwiJ3VzZSBzdHJpY3QnO1xuLy8gQi4yLjMuNSBTdHJpbmcucHJvdG90eXBlLmJvbGQoKVxucmVxdWlyZSgnLi9fc3RyaW5nLWh0bWwnKSgnYm9sZCcsIGZ1bmN0aW9uKGNyZWF0ZUhUTUwpe1xuICByZXR1cm4gZnVuY3Rpb24gYm9sZCgpe1xuICAgIHJldHVybiBjcmVhdGVIVE1MKHRoaXMsICdiJywgJycsICcnKTtcbiAgfVxufSk7IiwiJ3VzZSBzdHJpY3QnO1xudmFyICRleHBvcnQgPSByZXF1aXJlKCcuL19leHBvcnQnKVxuICAsICRhdCAgICAgPSByZXF1aXJlKCcuL19zdHJpbmctYXQnKShmYWxzZSk7XG4kZXhwb3J0KCRleHBvcnQuUCwgJ1N0cmluZycsIHtcbiAgLy8gMjEuMS4zLjMgU3RyaW5nLnByb3RvdHlwZS5jb2RlUG9pbnRBdChwb3MpXG4gIGNvZGVQb2ludEF0OiBmdW5jdGlvbiBjb2RlUG9pbnRBdChwb3Mpe1xuICAgIHJldHVybiAkYXQodGhpcywgcG9zKTtcbiAgfVxufSk7IiwiLy8gMjEuMS4zLjYgU3RyaW5nLnByb3RvdHlwZS5lbmRzV2l0aChzZWFyY2hTdHJpbmcgWywgZW5kUG9zaXRpb25dKVxuJ3VzZSBzdHJpY3QnO1xudmFyICRleHBvcnQgICA9IHJlcXVpcmUoJy4vX2V4cG9ydCcpXG4gICwgdG9MZW5ndGggID0gcmVxdWlyZSgnLi9fdG8tbGVuZ3RoJylcbiAgLCBjb250ZXh0ICAgPSByZXF1aXJlKCcuL19zdHJpbmctY29udGV4dCcpXG4gICwgRU5EU19XSVRIID0gJ2VuZHNXaXRoJ1xuICAsICRlbmRzV2l0aCA9ICcnW0VORFNfV0lUSF07XG5cbiRleHBvcnQoJGV4cG9ydC5QICsgJGV4cG9ydC5GICogcmVxdWlyZSgnLi9fZmFpbHMtaXMtcmVnZXhwJykoRU5EU19XSVRIKSwgJ1N0cmluZycsIHtcbiAgZW5kc1dpdGg6IGZ1bmN0aW9uIGVuZHNXaXRoKHNlYXJjaFN0cmluZyAvKiwgZW5kUG9zaXRpb24gPSBAbGVuZ3RoICovKXtcbiAgICB2YXIgdGhhdCA9IGNvbnRleHQodGhpcywgc2VhcmNoU3RyaW5nLCBFTkRTX1dJVEgpXG4gICAgICAsIGVuZFBvc2l0aW9uID0gYXJndW1lbnRzLmxlbmd0aCA+IDEgPyBhcmd1bWVudHNbMV0gOiB1bmRlZmluZWRcbiAgICAgICwgbGVuICAgID0gdG9MZW5ndGgodGhhdC5sZW5ndGgpXG4gICAgICAsIGVuZCAgICA9IGVuZFBvc2l0aW9uID09PSB1bmRlZmluZWQgPyBsZW4gOiBNYXRoLm1pbih0b0xlbmd0aChlbmRQb3NpdGlvbiksIGxlbilcbiAgICAgICwgc2VhcmNoID0gU3RyaW5nKHNlYXJjaFN0cmluZyk7XG4gICAgcmV0dXJuICRlbmRzV2l0aFxuICAgICAgPyAkZW5kc1dpdGguY2FsbCh0aGF0LCBzZWFyY2gsIGVuZClcbiAgICAgIDogdGhhdC5zbGljZShlbmQgLSBzZWFyY2gubGVuZ3RoLCBlbmQpID09PSBzZWFyY2g7XG4gIH1cbn0pOyIsIid1c2Ugc3RyaWN0Jztcbi8vIEIuMi4zLjYgU3RyaW5nLnByb3RvdHlwZS5maXhlZCgpXG5yZXF1aXJlKCcuL19zdHJpbmctaHRtbCcpKCdmaXhlZCcsIGZ1bmN0aW9uKGNyZWF0ZUhUTUwpe1xuICByZXR1cm4gZnVuY3Rpb24gZml4ZWQoKXtcbiAgICByZXR1cm4gY3JlYXRlSFRNTCh0aGlzLCAndHQnLCAnJywgJycpO1xuICB9XG59KTsiLCIndXNlIHN0cmljdCc7XG4vLyBCLjIuMy43IFN0cmluZy5wcm90b3R5cGUuZm9udGNvbG9yKGNvbG9yKVxucmVxdWlyZSgnLi9fc3RyaW5nLWh0bWwnKSgnZm9udGNvbG9yJywgZnVuY3Rpb24oY3JlYXRlSFRNTCl7XG4gIHJldHVybiBmdW5jdGlvbiBmb250Y29sb3IoY29sb3Ipe1xuICAgIHJldHVybiBjcmVhdGVIVE1MKHRoaXMsICdmb250JywgJ2NvbG9yJywgY29sb3IpO1xuICB9XG59KTsiLCIndXNlIHN0cmljdCc7XG4vLyBCLjIuMy44IFN0cmluZy5wcm90b3R5cGUuZm9udHNpemUoc2l6ZSlcbnJlcXVpcmUoJy4vX3N0cmluZy1odG1sJykoJ2ZvbnRzaXplJywgZnVuY3Rpb24oY3JlYXRlSFRNTCl7XG4gIHJldHVybiBmdW5jdGlvbiBmb250c2l6ZShzaXplKXtcbiAgICByZXR1cm4gY3JlYXRlSFRNTCh0aGlzLCAnZm9udCcsICdzaXplJywgc2l6ZSk7XG4gIH1cbn0pOyIsInZhciAkZXhwb3J0ICAgICAgICA9IHJlcXVpcmUoJy4vX2V4cG9ydCcpXG4gICwgdG9JbmRleCAgICAgICAgPSByZXF1aXJlKCcuL190by1pbmRleCcpXG4gICwgZnJvbUNoYXJDb2RlICAgPSBTdHJpbmcuZnJvbUNoYXJDb2RlXG4gICwgJGZyb21Db2RlUG9pbnQgPSBTdHJpbmcuZnJvbUNvZGVQb2ludDtcblxuLy8gbGVuZ3RoIHNob3VsZCBiZSAxLCBvbGQgRkYgcHJvYmxlbVxuJGV4cG9ydCgkZXhwb3J0LlMgKyAkZXhwb3J0LkYgKiAoISEkZnJvbUNvZGVQb2ludCAmJiAkZnJvbUNvZGVQb2ludC5sZW5ndGggIT0gMSksICdTdHJpbmcnLCB7XG4gIC8vIDIxLjEuMi4yIFN0cmluZy5mcm9tQ29kZVBvaW50KC4uLmNvZGVQb2ludHMpXG4gIGZyb21Db2RlUG9pbnQ6IGZ1bmN0aW9uIGZyb21Db2RlUG9pbnQoeCl7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW51c2VkLXZhcnNcbiAgICB2YXIgcmVzICA9IFtdXG4gICAgICAsIGFMZW4gPSBhcmd1bWVudHMubGVuZ3RoXG4gICAgICAsIGkgICAgPSAwXG4gICAgICAsIGNvZGU7XG4gICAgd2hpbGUoYUxlbiA+IGkpe1xuICAgICAgY29kZSA9ICthcmd1bWVudHNbaSsrXTtcbiAgICAgIGlmKHRvSW5kZXgoY29kZSwgMHgxMGZmZmYpICE9PSBjb2RlKXRocm93IFJhbmdlRXJyb3IoY29kZSArICcgaXMgbm90IGEgdmFsaWQgY29kZSBwb2ludCcpO1xuICAgICAgcmVzLnB1c2goY29kZSA8IDB4MTAwMDBcbiAgICAgICAgPyBmcm9tQ2hhckNvZGUoY29kZSlcbiAgICAgICAgOiBmcm9tQ2hhckNvZGUoKChjb2RlIC09IDB4MTAwMDApID4+IDEwKSArIDB4ZDgwMCwgY29kZSAlIDB4NDAwICsgMHhkYzAwKVxuICAgICAgKTtcbiAgICB9IHJldHVybiByZXMuam9pbignJyk7XG4gIH1cbn0pOyIsIi8vIDIxLjEuMy43IFN0cmluZy5wcm90b3R5cGUuaW5jbHVkZXMoc2VhcmNoU3RyaW5nLCBwb3NpdGlvbiA9IDApXG4ndXNlIHN0cmljdCc7XG52YXIgJGV4cG9ydCAgPSByZXF1aXJlKCcuL19leHBvcnQnKVxuICAsIGNvbnRleHQgID0gcmVxdWlyZSgnLi9fc3RyaW5nLWNvbnRleHQnKVxuICAsIElOQ0xVREVTID0gJ2luY2x1ZGVzJztcblxuJGV4cG9ydCgkZXhwb3J0LlAgKyAkZXhwb3J0LkYgKiByZXF1aXJlKCcuL19mYWlscy1pcy1yZWdleHAnKShJTkNMVURFUyksICdTdHJpbmcnLCB7XG4gIGluY2x1ZGVzOiBmdW5jdGlvbiBpbmNsdWRlcyhzZWFyY2hTdHJpbmcgLyosIHBvc2l0aW9uID0gMCAqLyl7XG4gICAgcmV0dXJuICEhfmNvbnRleHQodGhpcywgc2VhcmNoU3RyaW5nLCBJTkNMVURFUylcbiAgICAgIC5pbmRleE9mKHNlYXJjaFN0cmluZywgYXJndW1lbnRzLmxlbmd0aCA+IDEgPyBhcmd1bWVudHNbMV0gOiB1bmRlZmluZWQpO1xuICB9XG59KTsiLCIndXNlIHN0cmljdCc7XG4vLyBCLjIuMy45IFN0cmluZy5wcm90b3R5cGUuaXRhbGljcygpXG5yZXF1aXJlKCcuL19zdHJpbmctaHRtbCcpKCdpdGFsaWNzJywgZnVuY3Rpb24oY3JlYXRlSFRNTCl7XG4gIHJldHVybiBmdW5jdGlvbiBpdGFsaWNzKCl7XG4gICAgcmV0dXJuIGNyZWF0ZUhUTUwodGhpcywgJ2knLCAnJywgJycpO1xuICB9XG59KTsiLCIndXNlIHN0cmljdCc7XG52YXIgJGF0ICA9IHJlcXVpcmUoJy4vX3N0cmluZy1hdCcpKHRydWUpO1xuXG4vLyAyMS4xLjMuMjcgU3RyaW5nLnByb3RvdHlwZVtAQGl0ZXJhdG9yXSgpXG5yZXF1aXJlKCcuL19pdGVyLWRlZmluZScpKFN0cmluZywgJ1N0cmluZycsIGZ1bmN0aW9uKGl0ZXJhdGVkKXtcbiAgdGhpcy5fdCA9IFN0cmluZyhpdGVyYXRlZCk7IC8vIHRhcmdldFxuICB0aGlzLl9pID0gMDsgICAgICAgICAgICAgICAgLy8gbmV4dCBpbmRleFxuLy8gMjEuMS41LjIuMSAlU3RyaW5nSXRlcmF0b3JQcm90b3R5cGUlLm5leHQoKVxufSwgZnVuY3Rpb24oKXtcbiAgdmFyIE8gICAgID0gdGhpcy5fdFxuICAgICwgaW5kZXggPSB0aGlzLl9pXG4gICAgLCBwb2ludDtcbiAgaWYoaW5kZXggPj0gTy5sZW5ndGgpcmV0dXJuIHt2YWx1ZTogdW5kZWZpbmVkLCBkb25lOiB0cnVlfTtcbiAgcG9pbnQgPSAkYXQoTywgaW5kZXgpO1xuICB0aGlzLl9pICs9IHBvaW50Lmxlbmd0aDtcbiAgcmV0dXJuIHt2YWx1ZTogcG9pbnQsIGRvbmU6IGZhbHNlfTtcbn0pOyIsIid1c2Ugc3RyaWN0Jztcbi8vIEIuMi4zLjEwIFN0cmluZy5wcm90b3R5cGUubGluayh1cmwpXG5yZXF1aXJlKCcuL19zdHJpbmctaHRtbCcpKCdsaW5rJywgZnVuY3Rpb24oY3JlYXRlSFRNTCl7XG4gIHJldHVybiBmdW5jdGlvbiBsaW5rKHVybCl7XG4gICAgcmV0dXJuIGNyZWF0ZUhUTUwodGhpcywgJ2EnLCAnaHJlZicsIHVybCk7XG4gIH1cbn0pOyIsInZhciAkZXhwb3J0ICAgPSByZXF1aXJlKCcuL19leHBvcnQnKVxuICAsIHRvSU9iamVjdCA9IHJlcXVpcmUoJy4vX3RvLWlvYmplY3QnKVxuICAsIHRvTGVuZ3RoICA9IHJlcXVpcmUoJy4vX3RvLWxlbmd0aCcpO1xuXG4kZXhwb3J0KCRleHBvcnQuUywgJ1N0cmluZycsIHtcbiAgLy8gMjEuMS4yLjQgU3RyaW5nLnJhdyhjYWxsU2l0ZSwgLi4uc3Vic3RpdHV0aW9ucylcbiAgcmF3OiBmdW5jdGlvbiByYXcoY2FsbFNpdGUpe1xuICAgIHZhciB0cGwgID0gdG9JT2JqZWN0KGNhbGxTaXRlLnJhdylcbiAgICAgICwgbGVuICA9IHRvTGVuZ3RoKHRwbC5sZW5ndGgpXG4gICAgICAsIGFMZW4gPSBhcmd1bWVudHMubGVuZ3RoXG4gICAgICAsIHJlcyAgPSBbXVxuICAgICAgLCBpICAgID0gMDtcbiAgICB3aGlsZShsZW4gPiBpKXtcbiAgICAgIHJlcy5wdXNoKFN0cmluZyh0cGxbaSsrXSkpO1xuICAgICAgaWYoaSA8IGFMZW4pcmVzLnB1c2goU3RyaW5nKGFyZ3VtZW50c1tpXSkpO1xuICAgIH0gcmV0dXJuIHJlcy5qb2luKCcnKTtcbiAgfVxufSk7IiwidmFyICRleHBvcnQgPSByZXF1aXJlKCcuL19leHBvcnQnKTtcblxuJGV4cG9ydCgkZXhwb3J0LlAsICdTdHJpbmcnLCB7XG4gIC8vIDIxLjEuMy4xMyBTdHJpbmcucHJvdG90eXBlLnJlcGVhdChjb3VudClcbiAgcmVwZWF0OiByZXF1aXJlKCcuL19zdHJpbmctcmVwZWF0Jylcbn0pOyIsIid1c2Ugc3RyaWN0Jztcbi8vIEIuMi4zLjExIFN0cmluZy5wcm90b3R5cGUuc21hbGwoKVxucmVxdWlyZSgnLi9fc3RyaW5nLWh0bWwnKSgnc21hbGwnLCBmdW5jdGlvbihjcmVhdGVIVE1MKXtcbiAgcmV0dXJuIGZ1bmN0aW9uIHNtYWxsKCl7XG4gICAgcmV0dXJuIGNyZWF0ZUhUTUwodGhpcywgJ3NtYWxsJywgJycsICcnKTtcbiAgfVxufSk7IiwiLy8gMjEuMS4zLjE4IFN0cmluZy5wcm90b3R5cGUuc3RhcnRzV2l0aChzZWFyY2hTdHJpbmcgWywgcG9zaXRpb24gXSlcbid1c2Ugc3RyaWN0JztcbnZhciAkZXhwb3J0ICAgICA9IHJlcXVpcmUoJy4vX2V4cG9ydCcpXG4gICwgdG9MZW5ndGggICAgPSByZXF1aXJlKCcuL190by1sZW5ndGgnKVxuICAsIGNvbnRleHQgICAgID0gcmVxdWlyZSgnLi9fc3RyaW5nLWNvbnRleHQnKVxuICAsIFNUQVJUU19XSVRIID0gJ3N0YXJ0c1dpdGgnXG4gICwgJHN0YXJ0c1dpdGggPSAnJ1tTVEFSVFNfV0lUSF07XG5cbiRleHBvcnQoJGV4cG9ydC5QICsgJGV4cG9ydC5GICogcmVxdWlyZSgnLi9fZmFpbHMtaXMtcmVnZXhwJykoU1RBUlRTX1dJVEgpLCAnU3RyaW5nJywge1xuICBzdGFydHNXaXRoOiBmdW5jdGlvbiBzdGFydHNXaXRoKHNlYXJjaFN0cmluZyAvKiwgcG9zaXRpb24gPSAwICovKXtcbiAgICB2YXIgdGhhdCAgID0gY29udGV4dCh0aGlzLCBzZWFyY2hTdHJpbmcsIFNUQVJUU19XSVRIKVxuICAgICAgLCBpbmRleCAgPSB0b0xlbmd0aChNYXRoLm1pbihhcmd1bWVudHMubGVuZ3RoID4gMSA/IGFyZ3VtZW50c1sxXSA6IHVuZGVmaW5lZCwgdGhhdC5sZW5ndGgpKVxuICAgICAgLCBzZWFyY2ggPSBTdHJpbmcoc2VhcmNoU3RyaW5nKTtcbiAgICByZXR1cm4gJHN0YXJ0c1dpdGhcbiAgICAgID8gJHN0YXJ0c1dpdGguY2FsbCh0aGF0LCBzZWFyY2gsIGluZGV4KVxuICAgICAgOiB0aGF0LnNsaWNlKGluZGV4LCBpbmRleCArIHNlYXJjaC5sZW5ndGgpID09PSBzZWFyY2g7XG4gIH1cbn0pOyIsIid1c2Ugc3RyaWN0Jztcbi8vIEIuMi4zLjEyIFN0cmluZy5wcm90b3R5cGUuc3RyaWtlKClcbnJlcXVpcmUoJy4vX3N0cmluZy1odG1sJykoJ3N0cmlrZScsIGZ1bmN0aW9uKGNyZWF0ZUhUTUwpe1xuICByZXR1cm4gZnVuY3Rpb24gc3RyaWtlKCl7XG4gICAgcmV0dXJuIGNyZWF0ZUhUTUwodGhpcywgJ3N0cmlrZScsICcnLCAnJyk7XG4gIH1cbn0pOyIsIid1c2Ugc3RyaWN0Jztcbi8vIEIuMi4zLjEzIFN0cmluZy5wcm90b3R5cGUuc3ViKClcbnJlcXVpcmUoJy4vX3N0cmluZy1odG1sJykoJ3N1YicsIGZ1bmN0aW9uKGNyZWF0ZUhUTUwpe1xuICByZXR1cm4gZnVuY3Rpb24gc3ViKCl7XG4gICAgcmV0dXJuIGNyZWF0ZUhUTUwodGhpcywgJ3N1YicsICcnLCAnJyk7XG4gIH1cbn0pOyIsIid1c2Ugc3RyaWN0Jztcbi8vIEIuMi4zLjE0IFN0cmluZy5wcm90b3R5cGUuc3VwKClcbnJlcXVpcmUoJy4vX3N0cmluZy1odG1sJykoJ3N1cCcsIGZ1bmN0aW9uKGNyZWF0ZUhUTUwpe1xuICByZXR1cm4gZnVuY3Rpb24gc3VwKCl7XG4gICAgcmV0dXJuIGNyZWF0ZUhUTUwodGhpcywgJ3N1cCcsICcnLCAnJyk7XG4gIH1cbn0pOyIsIid1c2Ugc3RyaWN0Jztcbi8vIDIxLjEuMy4yNSBTdHJpbmcucHJvdG90eXBlLnRyaW0oKVxucmVxdWlyZSgnLi9fc3RyaW5nLXRyaW0nKSgndHJpbScsIGZ1bmN0aW9uKCR0cmltKXtcbiAgcmV0dXJuIGZ1bmN0aW9uIHRyaW0oKXtcbiAgICByZXR1cm4gJHRyaW0odGhpcywgMyk7XG4gIH07XG59KTsiLCIndXNlIHN0cmljdCc7XG4vLyBFQ01BU2NyaXB0IDYgc3ltYm9scyBzaGltXG52YXIgZ2xvYmFsICAgICAgICAgPSByZXF1aXJlKCcuL19nbG9iYWwnKVxuICAsIGNvcmUgICAgICAgICAgID0gcmVxdWlyZSgnLi9fY29yZScpXG4gICwgaGFzICAgICAgICAgICAgPSByZXF1aXJlKCcuL19oYXMnKVxuICAsIERFU0NSSVBUT1JTICAgID0gcmVxdWlyZSgnLi9fZGVzY3JpcHRvcnMnKVxuICAsICRleHBvcnQgICAgICAgID0gcmVxdWlyZSgnLi9fZXhwb3J0JylcbiAgLCByZWRlZmluZSAgICAgICA9IHJlcXVpcmUoJy4vX3JlZGVmaW5lJylcbiAgLCBNRVRBICAgICAgICAgICA9IHJlcXVpcmUoJy4vX21ldGEnKS5LRVlcbiAgLCAkZmFpbHMgICAgICAgICA9IHJlcXVpcmUoJy4vX2ZhaWxzJylcbiAgLCBzaGFyZWQgICAgICAgICA9IHJlcXVpcmUoJy4vX3NoYXJlZCcpXG4gICwgc2V0VG9TdHJpbmdUYWcgPSByZXF1aXJlKCcuL19zZXQtdG8tc3RyaW5nLXRhZycpXG4gICwgdWlkICAgICAgICAgICAgPSByZXF1aXJlKCcuL191aWQnKVxuICAsIHdrcyAgICAgICAgICAgID0gcmVxdWlyZSgnLi9fd2tzJylcbiAgLCBrZXlPZiAgICAgICAgICA9IHJlcXVpcmUoJy4vX2tleW9mJylcbiAgLCBlbnVtS2V5cyAgICAgICA9IHJlcXVpcmUoJy4vX2VudW0ta2V5cycpXG4gICwgaXNBcnJheSAgICAgICAgPSByZXF1aXJlKCcuL19pcy1hcnJheScpXG4gICwgYW5PYmplY3QgICAgICAgPSByZXF1aXJlKCcuL19hbi1vYmplY3QnKVxuICAsIHRvSU9iamVjdCAgICAgID0gcmVxdWlyZSgnLi9fdG8taW9iamVjdCcpXG4gICwgdG9QcmltaXRpdmUgICAgPSByZXF1aXJlKCcuL190by1wcmltaXRpdmUnKVxuICAsIGNyZWF0ZURlc2MgICAgID0gcmVxdWlyZSgnLi9fcHJvcGVydHktZGVzYycpXG4gICwgX2NyZWF0ZSAgICAgICAgPSByZXF1aXJlKCcuL19vYmplY3QtY3JlYXRlJylcbiAgLCBnT1BORXh0ICAgICAgICA9IHJlcXVpcmUoJy4vX29iamVjdC1nb3BuLWV4dCcpXG4gICwgJEdPUEQgICAgICAgICAgPSByZXF1aXJlKCcuL19vYmplY3QtZ29wZCcpXG4gICwgJERQICAgICAgICAgICAgPSByZXF1aXJlKCcuL19vYmplY3QtZHAnKVxuICAsIGdPUEQgICAgICAgICAgID0gJEdPUEQuZlxuICAsIGRQICAgICAgICAgICAgID0gJERQLmZcbiAgLCBnT1BOICAgICAgICAgICA9IGdPUE5FeHQuZlxuICAsICRTeW1ib2wgICAgICAgID0gZ2xvYmFsLlN5bWJvbFxuICAsICRKU09OICAgICAgICAgID0gZ2xvYmFsLkpTT05cbiAgLCBfc3RyaW5naWZ5ICAgICA9ICRKU09OICYmICRKU09OLnN0cmluZ2lmeVxuICAsIHNldHRlciAgICAgICAgID0gZmFsc2VcbiAgLCBQUk9UT1RZUEUgICAgICA9ICdwcm90b3R5cGUnXG4gICwgSElEREVOICAgICAgICAgPSB3a3MoJ19oaWRkZW4nKVxuICAsIFRPX1BSSU1JVElWRSAgID0gd2tzKCd0b1ByaW1pdGl2ZScpXG4gICwgaXNFbnVtICAgICAgICAgPSB7fS5wcm9wZXJ0eUlzRW51bWVyYWJsZVxuICAsIFN5bWJvbFJlZ2lzdHJ5ID0gc2hhcmVkKCdzeW1ib2wtcmVnaXN0cnknKVxuICAsIEFsbFN5bWJvbHMgICAgID0gc2hhcmVkKCdzeW1ib2xzJylcbiAgLCBPYmplY3RQcm90byAgICA9IE9iamVjdFtQUk9UT1RZUEVdXG4gICwgVVNFX05BVElWRSAgICAgPSB0eXBlb2YgJFN5bWJvbCA9PSAnZnVuY3Rpb24nXG4gICwgUU9iamVjdCAgICAgICAgPSBnbG9iYWwuUU9iamVjdDtcblxuLy8gZmFsbGJhY2sgZm9yIG9sZCBBbmRyb2lkLCBodHRwczovL2NvZGUuZ29vZ2xlLmNvbS9wL3Y4L2lzc3Vlcy9kZXRhaWw/aWQ9Njg3XG52YXIgc2V0U3ltYm9sRGVzYyA9IERFU0NSSVBUT1JTICYmICRmYWlscyhmdW5jdGlvbigpe1xuICByZXR1cm4gX2NyZWF0ZShkUCh7fSwgJ2EnLCB7XG4gICAgZ2V0OiBmdW5jdGlvbigpeyByZXR1cm4gZFAodGhpcywgJ2EnLCB7dmFsdWU6IDd9KS5hOyB9XG4gIH0pKS5hICE9IDc7XG59KSA/IGZ1bmN0aW9uKGl0LCBrZXksIEQpe1xuICB2YXIgcHJvdG9EZXNjID0gZ09QRChPYmplY3RQcm90bywga2V5KTtcbiAgaWYocHJvdG9EZXNjKWRlbGV0ZSBPYmplY3RQcm90b1trZXldO1xuICBkUChpdCwga2V5LCBEKTtcbiAgaWYocHJvdG9EZXNjICYmIGl0ICE9PSBPYmplY3RQcm90bylkUChPYmplY3RQcm90bywga2V5LCBwcm90b0Rlc2MpO1xufSA6IGRQO1xuXG52YXIgd3JhcCA9IGZ1bmN0aW9uKHRhZyl7XG4gIHZhciBzeW0gPSBBbGxTeW1ib2xzW3RhZ10gPSBfY3JlYXRlKCRTeW1ib2xbUFJPVE9UWVBFXSk7XG4gIHN5bS5fayA9IHRhZztcbiAgREVTQ1JJUFRPUlMgJiYgc2V0dGVyICYmIHNldFN5bWJvbERlc2MoT2JqZWN0UHJvdG8sIHRhZywge1xuICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICBzZXQ6IGZ1bmN0aW9uKHZhbHVlKXtcbiAgICAgIGlmKGhhcyh0aGlzLCBISURERU4pICYmIGhhcyh0aGlzW0hJRERFTl0sIHRhZykpdGhpc1tISURERU5dW3RhZ10gPSBmYWxzZTtcbiAgICAgIHNldFN5bWJvbERlc2ModGhpcywgdGFnLCBjcmVhdGVEZXNjKDEsIHZhbHVlKSk7XG4gICAgfVxuICB9KTtcbiAgcmV0dXJuIHN5bTtcbn07XG5cbnZhciBpc1N5bWJvbCA9IFVTRV9OQVRJVkUgJiYgdHlwZW9mICRTeW1ib2wuaXRlcmF0b3IgPT0gJ3N5bWJvbCcgPyBmdW5jdGlvbihpdCl7XG4gIHJldHVybiB0eXBlb2YgaXQgPT0gJ3N5bWJvbCc7XG59IDogZnVuY3Rpb24oaXQpe1xuICByZXR1cm4gaXQgaW5zdGFuY2VvZiAkU3ltYm9sO1xufTtcblxudmFyICRkZWZpbmVQcm9wZXJ0eSA9IGZ1bmN0aW9uIGRlZmluZVByb3BlcnR5KGl0LCBrZXksIEQpe1xuICBhbk9iamVjdChpdCk7XG4gIGtleSA9IHRvUHJpbWl0aXZlKGtleSwgdHJ1ZSk7XG4gIGFuT2JqZWN0KEQpO1xuICBpZihoYXMoQWxsU3ltYm9scywga2V5KSl7XG4gICAgaWYoIUQuZW51bWVyYWJsZSl7XG4gICAgICBpZighaGFzKGl0LCBISURERU4pKWRQKGl0LCBISURERU4sIGNyZWF0ZURlc2MoMSwge30pKTtcbiAgICAgIGl0W0hJRERFTl1ba2V5XSA9IHRydWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmKGhhcyhpdCwgSElEREVOKSAmJiBpdFtISURERU5dW2tleV0paXRbSElEREVOXVtrZXldID0gZmFsc2U7XG4gICAgICBEID0gX2NyZWF0ZShELCB7ZW51bWVyYWJsZTogY3JlYXRlRGVzYygwLCBmYWxzZSl9KTtcbiAgICB9IHJldHVybiBzZXRTeW1ib2xEZXNjKGl0LCBrZXksIEQpO1xuICB9IHJldHVybiBkUChpdCwga2V5LCBEKTtcbn07XG52YXIgJGRlZmluZVByb3BlcnRpZXMgPSBmdW5jdGlvbiBkZWZpbmVQcm9wZXJ0aWVzKGl0LCBQKXtcbiAgYW5PYmplY3QoaXQpO1xuICB2YXIga2V5cyA9IGVudW1LZXlzKFAgPSB0b0lPYmplY3QoUCkpXG4gICAgLCBpICAgID0gMFxuICAgICwgbCA9IGtleXMubGVuZ3RoXG4gICAgLCBrZXk7XG4gIHdoaWxlKGwgPiBpKSRkZWZpbmVQcm9wZXJ0eShpdCwga2V5ID0ga2V5c1tpKytdLCBQW2tleV0pO1xuICByZXR1cm4gaXQ7XG59O1xudmFyICRjcmVhdGUgPSBmdW5jdGlvbiBjcmVhdGUoaXQsIFApe1xuICByZXR1cm4gUCA9PT0gdW5kZWZpbmVkID8gX2NyZWF0ZShpdCkgOiAkZGVmaW5lUHJvcGVydGllcyhfY3JlYXRlKGl0KSwgUCk7XG59O1xudmFyICRwcm9wZXJ0eUlzRW51bWVyYWJsZSA9IGZ1bmN0aW9uIHByb3BlcnR5SXNFbnVtZXJhYmxlKGtleSl7XG4gIHZhciBFID0gaXNFbnVtLmNhbGwodGhpcywga2V5ID0gdG9QcmltaXRpdmUoa2V5LCB0cnVlKSk7XG4gIHJldHVybiBFIHx8ICFoYXModGhpcywga2V5KSB8fCAhaGFzKEFsbFN5bWJvbHMsIGtleSkgfHwgaGFzKHRoaXMsIEhJRERFTikgJiYgdGhpc1tISURERU5dW2tleV0gPyBFIDogdHJ1ZTtcbn07XG52YXIgJGdldE93blByb3BlcnR5RGVzY3JpcHRvciA9IGZ1bmN0aW9uIGdldE93blByb3BlcnR5RGVzY3JpcHRvcihpdCwga2V5KXtcbiAgdmFyIEQgPSBnT1BEKGl0ID0gdG9JT2JqZWN0KGl0KSwga2V5ID0gdG9QcmltaXRpdmUoa2V5LCB0cnVlKSk7XG4gIGlmKEQgJiYgaGFzKEFsbFN5bWJvbHMsIGtleSkgJiYgIShoYXMoaXQsIEhJRERFTikgJiYgaXRbSElEREVOXVtrZXldKSlELmVudW1lcmFibGUgPSB0cnVlO1xuICByZXR1cm4gRDtcbn07XG52YXIgJGdldE93blByb3BlcnR5TmFtZXMgPSBmdW5jdGlvbiBnZXRPd25Qcm9wZXJ0eU5hbWVzKGl0KXtcbiAgdmFyIG5hbWVzICA9IGdPUE4odG9JT2JqZWN0KGl0KSlcbiAgICAsIHJlc3VsdCA9IFtdXG4gICAgLCBpICAgICAgPSAwXG4gICAgLCBrZXk7XG4gIHdoaWxlKG5hbWVzLmxlbmd0aCA+IGkpaWYoIWhhcyhBbGxTeW1ib2xzLCBrZXkgPSBuYW1lc1tpKytdKSAmJiBrZXkgIT0gSElEREVOICYmIGtleSAhPSBNRVRBKXJlc3VsdC5wdXNoKGtleSk7XG4gIHJldHVybiByZXN1bHQ7XG59O1xudmFyICRnZXRPd25Qcm9wZXJ0eVN5bWJvbHMgPSBmdW5jdGlvbiBnZXRPd25Qcm9wZXJ0eVN5bWJvbHMoaXQpe1xuICB2YXIgbmFtZXMgID0gZ09QTih0b0lPYmplY3QoaXQpKVxuICAgICwgcmVzdWx0ID0gW11cbiAgICAsIGkgICAgICA9IDBcbiAgICAsIGtleTtcbiAgd2hpbGUobmFtZXMubGVuZ3RoID4gaSlpZihoYXMoQWxsU3ltYm9scywga2V5ID0gbmFtZXNbaSsrXSkpcmVzdWx0LnB1c2goQWxsU3ltYm9sc1trZXldKTtcbiAgcmV0dXJuIHJlc3VsdDtcbn07XG52YXIgJHN0cmluZ2lmeSA9IGZ1bmN0aW9uIHN0cmluZ2lmeShpdCl7XG4gIGlmKGl0ID09PSB1bmRlZmluZWQgfHwgaXNTeW1ib2woaXQpKXJldHVybjsgLy8gSUU4IHJldHVybnMgc3RyaW5nIG9uIHVuZGVmaW5lZFxuICB2YXIgYXJncyA9IFtpdF1cbiAgICAsIGkgICAgPSAxXG4gICAgLCByZXBsYWNlciwgJHJlcGxhY2VyO1xuICB3aGlsZShhcmd1bWVudHMubGVuZ3RoID4gaSlhcmdzLnB1c2goYXJndW1lbnRzW2krK10pO1xuICByZXBsYWNlciA9IGFyZ3NbMV07XG4gIGlmKHR5cGVvZiByZXBsYWNlciA9PSAnZnVuY3Rpb24nKSRyZXBsYWNlciA9IHJlcGxhY2VyO1xuICBpZigkcmVwbGFjZXIgfHwgIWlzQXJyYXkocmVwbGFjZXIpKXJlcGxhY2VyID0gZnVuY3Rpb24oa2V5LCB2YWx1ZSl7XG4gICAgaWYoJHJlcGxhY2VyKXZhbHVlID0gJHJlcGxhY2VyLmNhbGwodGhpcywga2V5LCB2YWx1ZSk7XG4gICAgaWYoIWlzU3ltYm9sKHZhbHVlKSlyZXR1cm4gdmFsdWU7XG4gIH07XG4gIGFyZ3NbMV0gPSByZXBsYWNlcjtcbiAgcmV0dXJuIF9zdHJpbmdpZnkuYXBwbHkoJEpTT04sIGFyZ3MpO1xufTtcbnZhciBCVUdHWV9KU09OID0gJGZhaWxzKGZ1bmN0aW9uKCl7XG4gIHZhciBTID0gJFN5bWJvbCgpO1xuICAvLyBNUyBFZGdlIGNvbnZlcnRzIHN5bWJvbCB2YWx1ZXMgdG8gSlNPTiBhcyB7fVxuICAvLyBXZWJLaXQgY29udmVydHMgc3ltYm9sIHZhbHVlcyB0byBKU09OIGFzIG51bGxcbiAgLy8gVjggdGhyb3dzIG9uIGJveGVkIHN5bWJvbHNcbiAgcmV0dXJuIF9zdHJpbmdpZnkoW1NdKSAhPSAnW251bGxdJyB8fCBfc3RyaW5naWZ5KHthOiBTfSkgIT0gJ3t9JyB8fCBfc3RyaW5naWZ5KE9iamVjdChTKSkgIT0gJ3t9Jztcbn0pO1xuXG4vLyAxOS40LjEuMSBTeW1ib2woW2Rlc2NyaXB0aW9uXSlcbmlmKCFVU0VfTkFUSVZFKXtcbiAgJFN5bWJvbCA9IGZ1bmN0aW9uIFN5bWJvbCgpe1xuICAgIGlmKHRoaXMgaW5zdGFuY2VvZiAkU3ltYm9sKXRocm93IFR5cGVFcnJvcignU3ltYm9sIGlzIG5vdCBhIGNvbnN0cnVjdG9yIScpO1xuICAgIHJldHVybiB3cmFwKHVpZChhcmd1bWVudHMubGVuZ3RoID4gMCA/IGFyZ3VtZW50c1swXSA6IHVuZGVmaW5lZCkpO1xuICB9O1xuICByZWRlZmluZSgkU3ltYm9sW1BST1RPVFlQRV0sICd0b1N0cmluZycsIGZ1bmN0aW9uIHRvU3RyaW5nKCl7XG4gICAgcmV0dXJuIHRoaXMuX2s7XG4gIH0pO1xuXG4gICRHT1BELmYgPSAkZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yO1xuICAkRFAuZiAgID0gJGRlZmluZVByb3BlcnR5O1xuICByZXF1aXJlKCcuL19vYmplY3QtZ29wbicpLmYgPSBnT1BORXh0LmYgPSAkZ2V0T3duUHJvcGVydHlOYW1lcztcbiAgcmVxdWlyZSgnLi9fb2JqZWN0LXBpZScpLmYgID0gJHByb3BlcnR5SXNFbnVtZXJhYmxlXG4gIHJlcXVpcmUoJy4vX29iamVjdC1nb3BzJykuZiA9ICRnZXRPd25Qcm9wZXJ0eVN5bWJvbHM7XG5cbiAgaWYoREVTQ1JJUFRPUlMgJiYgIXJlcXVpcmUoJy4vX2xpYnJhcnknKSl7XG4gICAgcmVkZWZpbmUoT2JqZWN0UHJvdG8sICdwcm9wZXJ0eUlzRW51bWVyYWJsZScsICRwcm9wZXJ0eUlzRW51bWVyYWJsZSwgdHJ1ZSk7XG4gIH1cbn1cblxuJGV4cG9ydCgkZXhwb3J0LkcgKyAkZXhwb3J0LlcgKyAkZXhwb3J0LkYgKiAhVVNFX05BVElWRSwge1N5bWJvbDogJFN5bWJvbH0pO1xuXG4vLyAxOS40LjIuMiBTeW1ib2wuaGFzSW5zdGFuY2Vcbi8vIDE5LjQuMi4zIFN5bWJvbC5pc0NvbmNhdFNwcmVhZGFibGVcbi8vIDE5LjQuMi40IFN5bWJvbC5pdGVyYXRvclxuLy8gMTkuNC4yLjYgU3ltYm9sLm1hdGNoXG4vLyAxOS40LjIuOCBTeW1ib2wucmVwbGFjZVxuLy8gMTkuNC4yLjkgU3ltYm9sLnNlYXJjaFxuLy8gMTkuNC4yLjEwIFN5bWJvbC5zcGVjaWVzXG4vLyAxOS40LjIuMTEgU3ltYm9sLnNwbGl0XG4vLyAxOS40LjIuMTIgU3ltYm9sLnRvUHJpbWl0aXZlXG4vLyAxOS40LjIuMTMgU3ltYm9sLnRvU3RyaW5nVGFnXG4vLyAxOS40LjIuMTQgU3ltYm9sLnVuc2NvcGFibGVzXG5mb3IodmFyIHN5bWJvbHMgPSAoXG4gICdoYXNJbnN0YW5jZSxpc0NvbmNhdFNwcmVhZGFibGUsaXRlcmF0b3IsbWF0Y2gscmVwbGFjZSxzZWFyY2gsc3BlY2llcyxzcGxpdCx0b1ByaW1pdGl2ZSx0b1N0cmluZ1RhZyx1bnNjb3BhYmxlcydcbikuc3BsaXQoJywnKSwgaSA9IDA7IHN5bWJvbHMubGVuZ3RoID4gaTsgKXtcbiAgdmFyIGtleSAgICAgPSBzeW1ib2xzW2krK11cbiAgICAsIFdyYXBwZXIgPSBjb3JlLlN5bWJvbFxuICAgICwgc3ltICAgICA9IHdrcyhrZXkpO1xuICBpZighKGtleSBpbiBXcmFwcGVyKSlkUChXcmFwcGVyLCBrZXksIHt2YWx1ZTogVVNFX05BVElWRSA/IHN5bSA6IHdyYXAoc3ltKX0pO1xufTtcblxuLy8gRG9uJ3QgdXNlIHNldHRlcnMgaW4gUXQgU2NyaXB0LCBodHRwczovL2dpdGh1Yi5jb20vemxvaXJvY2svY29yZS1qcy9pc3N1ZXMvMTczXG5pZighUU9iamVjdCB8fCAhUU9iamVjdFtQUk9UT1RZUEVdIHx8ICFRT2JqZWN0W1BST1RPVFlQRV0uZmluZENoaWxkKXNldHRlciA9IHRydWU7XG5cbiRleHBvcnQoJGV4cG9ydC5TICsgJGV4cG9ydC5GICogIVVTRV9OQVRJVkUsICdTeW1ib2wnLCB7XG4gIC8vIDE5LjQuMi4xIFN5bWJvbC5mb3Ioa2V5KVxuICAnZm9yJzogZnVuY3Rpb24oa2V5KXtcbiAgICByZXR1cm4gaGFzKFN5bWJvbFJlZ2lzdHJ5LCBrZXkgKz0gJycpXG4gICAgICA/IFN5bWJvbFJlZ2lzdHJ5W2tleV1cbiAgICAgIDogU3ltYm9sUmVnaXN0cnlba2V5XSA9ICRTeW1ib2woa2V5KTtcbiAgfSxcbiAgLy8gMTkuNC4yLjUgU3ltYm9sLmtleUZvcihzeW0pXG4gIGtleUZvcjogZnVuY3Rpb24ga2V5Rm9yKGtleSl7XG4gICAgaWYoaXNTeW1ib2woa2V5KSlyZXR1cm4ga2V5T2YoU3ltYm9sUmVnaXN0cnksIGtleSk7XG4gICAgdGhyb3cgVHlwZUVycm9yKGtleSArICcgaXMgbm90IGEgc3ltYm9sIScpO1xuICB9LFxuICB1c2VTZXR0ZXI6IGZ1bmN0aW9uKCl7IHNldHRlciA9IHRydWU7IH0sXG4gIHVzZVNpbXBsZTogZnVuY3Rpb24oKXsgc2V0dGVyID0gZmFsc2U7IH1cbn0pO1xuXG4kZXhwb3J0KCRleHBvcnQuUyArICRleHBvcnQuRiAqICFVU0VfTkFUSVZFLCAnT2JqZWN0Jywge1xuICAvLyAxOS4xLjIuMiBPYmplY3QuY3JlYXRlKE8gWywgUHJvcGVydGllc10pXG4gIGNyZWF0ZTogJGNyZWF0ZSxcbiAgLy8gMTkuMS4yLjQgT2JqZWN0LmRlZmluZVByb3BlcnR5KE8sIFAsIEF0dHJpYnV0ZXMpXG4gIGRlZmluZVByb3BlcnR5OiAkZGVmaW5lUHJvcGVydHksXG4gIC8vIDE5LjEuMi4zIE9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzKE8sIFByb3BlcnRpZXMpXG4gIGRlZmluZVByb3BlcnRpZXM6ICRkZWZpbmVQcm9wZXJ0aWVzLFxuICAvLyAxOS4xLjIuNiBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKE8sIFApXG4gIGdldE93blByb3BlcnR5RGVzY3JpcHRvcjogJGdldE93blByb3BlcnR5RGVzY3JpcHRvcixcbiAgLy8gMTkuMS4yLjcgT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMoTylcbiAgZ2V0T3duUHJvcGVydHlOYW1lczogJGdldE93blByb3BlcnR5TmFtZXMsXG4gIC8vIDE5LjEuMi44IE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMoTylcbiAgZ2V0T3duUHJvcGVydHlTeW1ib2xzOiAkZ2V0T3duUHJvcGVydHlTeW1ib2xzXG59KTtcblxuLy8gMjQuMy4yIEpTT04uc3RyaW5naWZ5KHZhbHVlIFssIHJlcGxhY2VyIFssIHNwYWNlXV0pXG4kSlNPTiAmJiAkZXhwb3J0KCRleHBvcnQuUyArICRleHBvcnQuRiAqICghVVNFX05BVElWRSB8fCBCVUdHWV9KU09OKSwgJ0pTT04nLCB7c3RyaW5naWZ5OiAkc3RyaW5naWZ5fSk7XG5cbi8vIDE5LjQuMy40IFN5bWJvbC5wcm90b3R5cGVbQEB0b1ByaW1pdGl2ZV0oaGludClcbiRTeW1ib2xbUFJPVE9UWVBFXVtUT19QUklNSVRJVkVdIHx8IHJlcXVpcmUoJy4vX2hpZGUnKSgkU3ltYm9sW1BST1RPVFlQRV0sIFRPX1BSSU1JVElWRSwgJFN5bWJvbFtQUk9UT1RZUEVdLnZhbHVlT2YpO1xuLy8gMTkuNC4zLjUgU3ltYm9sLnByb3RvdHlwZVtAQHRvU3RyaW5nVGFnXVxuc2V0VG9TdHJpbmdUYWcoJFN5bWJvbCwgJ1N5bWJvbCcpO1xuLy8gMjAuMi4xLjkgTWF0aFtAQHRvU3RyaW5nVGFnXVxuc2V0VG9TdHJpbmdUYWcoTWF0aCwgJ01hdGgnLCB0cnVlKTtcbi8vIDI0LjMuMyBKU09OW0BAdG9TdHJpbmdUYWddXG5zZXRUb1N0cmluZ1RhZyhnbG9iYWwuSlNPTiwgJ0pTT04nLCB0cnVlKTsiLCIndXNlIHN0cmljdCc7XG52YXIgJGV4cG9ydCAgICAgID0gcmVxdWlyZSgnLi9fZXhwb3J0JylcbiAgLCAkdHlwZWQgICAgICAgPSByZXF1aXJlKCcuL190eXBlZCcpXG4gICwgYnVmZmVyICAgICAgID0gcmVxdWlyZSgnLi9fdHlwZWQtYnVmZmVyJylcbiAgLCBhbk9iamVjdCAgICAgPSByZXF1aXJlKCcuL19hbi1vYmplY3QnKVxuICAsIHRvSW5kZXggICAgICA9IHJlcXVpcmUoJy4vX3RvLWluZGV4JylcbiAgLCB0b0xlbmd0aCAgICAgPSByZXF1aXJlKCcuL190by1sZW5ndGgnKVxuICAsIGlzT2JqZWN0ICAgICA9IHJlcXVpcmUoJy4vX2lzLW9iamVjdCcpXG4gICwgVFlQRURfQVJSQVkgID0gcmVxdWlyZSgnLi9fd2tzJykoJ3R5cGVkX2FycmF5JylcbiAgLCBBcnJheUJ1ZmZlciAgPSByZXF1aXJlKCcuL19nbG9iYWwnKS5BcnJheUJ1ZmZlclxuICAsIHNwZWNpZXNDb25zdHJ1Y3RvciA9IHJlcXVpcmUoJy4vX3NwZWNpZXMtY29uc3RydWN0b3InKVxuICAsICRBcnJheUJ1ZmZlciA9IGJ1ZmZlci5BcnJheUJ1ZmZlclxuICAsICREYXRhVmlldyAgICA9IGJ1ZmZlci5EYXRhVmlld1xuICAsICRpc1ZpZXcgICAgICA9ICR0eXBlZC5BQlYgJiYgQXJyYXlCdWZmZXIuaXNWaWV3XG4gICwgJHNsaWNlICAgICAgID0gJEFycmF5QnVmZmVyLnByb3RvdHlwZS5zbGljZVxuICAsIFZJRVcgICAgICAgICA9ICR0eXBlZC5WSUVXXG4gICwgQVJSQVlfQlVGRkVSID0gJ0FycmF5QnVmZmVyJztcblxuJGV4cG9ydCgkZXhwb3J0LkcgKyAkZXhwb3J0LlcgKyAkZXhwb3J0LkYgKiAoQXJyYXlCdWZmZXIgIT09ICRBcnJheUJ1ZmZlciksIHtBcnJheUJ1ZmZlcjogJEFycmF5QnVmZmVyfSk7XG5cbiRleHBvcnQoJGV4cG9ydC5TICsgJGV4cG9ydC5GICogISR0eXBlZC5DT05TVFIsIEFSUkFZX0JVRkZFUiwge1xuICAvLyAyNC4xLjMuMSBBcnJheUJ1ZmZlci5pc1ZpZXcoYXJnKVxuICBpc1ZpZXc6IGZ1bmN0aW9uIGlzVmlldyhpdCl7XG4gICAgcmV0dXJuICRpc1ZpZXcgJiYgJGlzVmlldyhpdCkgfHwgaXNPYmplY3QoaXQpICYmIFZJRVcgaW4gaXQ7XG4gIH1cbn0pO1xuXG4kZXhwb3J0KCRleHBvcnQuUCArICRleHBvcnQuVSArICRleHBvcnQuRiAqIHJlcXVpcmUoJy4vX2ZhaWxzJykoZnVuY3Rpb24oKXtcbiAgcmV0dXJuICFuZXcgJEFycmF5QnVmZmVyKDIpLnNsaWNlKDEsIHVuZGVmaW5lZCkuYnl0ZUxlbmd0aDtcbn0pLCBBUlJBWV9CVUZGRVIsIHtcbiAgLy8gMjQuMS40LjMgQXJyYXlCdWZmZXIucHJvdG90eXBlLnNsaWNlKHN0YXJ0LCBlbmQpXG4gIHNsaWNlOiBmdW5jdGlvbiBzbGljZShzdGFydCwgZW5kKXtcbiAgICBpZigkc2xpY2UgIT09IHVuZGVmaW5lZCAmJiBlbmQgPT09IHVuZGVmaW5lZClyZXR1cm4gJHNsaWNlLmNhbGwoYW5PYmplY3QodGhpcyksIHN0YXJ0KTsgLy8gRkYgZml4XG4gICAgdmFyIGxlbiAgICA9IGFuT2JqZWN0KHRoaXMpLmJ5dGVMZW5ndGhcbiAgICAgICwgZmlyc3QgID0gdG9JbmRleChzdGFydCwgbGVuKVxuICAgICAgLCBmaW5hbCAgPSB0b0luZGV4KGVuZCA9PT0gdW5kZWZpbmVkID8gbGVuIDogZW5kLCBsZW4pXG4gICAgICAsIHJlc3VsdCA9IG5ldyAoc3BlY2llc0NvbnN0cnVjdG9yKHRoaXMsICRBcnJheUJ1ZmZlcikpKHRvTGVuZ3RoKGZpbmFsIC0gZmlyc3QpKVxuICAgICAgLCB2aWV3UyAgPSBuZXcgJERhdGFWaWV3KHRoaXMpXG4gICAgICAsIHZpZXdUICA9IG5ldyAkRGF0YVZpZXcocmVzdWx0KVxuICAgICAgLCBpbmRleCAgPSAwO1xuICAgIHdoaWxlKGZpcnN0IDwgZmluYWwpe1xuICAgICAgdmlld1Quc2V0VWludDgoaW5kZXgrKywgdmlld1MuZ2V0VWludDgoZmlyc3QrKykpO1xuICAgIH0gcmV0dXJuIHJlc3VsdDtcbiAgfVxufSk7XG5cbnJlcXVpcmUoJy4vX3NldC1zcGVjaWVzJykoQVJSQVlfQlVGRkVSKTsiLCJ2YXIgJGV4cG9ydCA9IHJlcXVpcmUoJy4vX2V4cG9ydCcpO1xuJGV4cG9ydCgkZXhwb3J0LkcgKyAkZXhwb3J0LlcgKyAkZXhwb3J0LkYgKiAhcmVxdWlyZSgnLi9fdHlwZWQnKS5BQlYsIHtcbiAgRGF0YVZpZXc6IHJlcXVpcmUoJy4vX3R5cGVkLWJ1ZmZlcicpLkRhdGFWaWV3XG59KTsiLCJyZXF1aXJlKCcuL190eXBlZC1hcnJheScpKCdGbG9hdDMyJywgNCwgZnVuY3Rpb24oaW5pdCl7XG4gIHJldHVybiBmdW5jdGlvbiBGbG9hdDMyQXJyYXkoZGF0YSwgYnl0ZU9mZnNldCwgbGVuZ3RoKXtcbiAgICByZXR1cm4gaW5pdCh0aGlzLCBkYXRhLCBieXRlT2Zmc2V0LCBsZW5ndGgpO1xuICB9O1xufSk7IiwicmVxdWlyZSgnLi9fdHlwZWQtYXJyYXknKSgnRmxvYXQ2NCcsIDgsIGZ1bmN0aW9uKGluaXQpe1xuICByZXR1cm4gZnVuY3Rpb24gRmxvYXQ2NEFycmF5KGRhdGEsIGJ5dGVPZmZzZXQsIGxlbmd0aCl7XG4gICAgcmV0dXJuIGluaXQodGhpcywgZGF0YSwgYnl0ZU9mZnNldCwgbGVuZ3RoKTtcbiAgfTtcbn0pOyIsInJlcXVpcmUoJy4vX3R5cGVkLWFycmF5JykoJ0ludDE2JywgMiwgZnVuY3Rpb24oaW5pdCl7XG4gIHJldHVybiBmdW5jdGlvbiBJbnQxNkFycmF5KGRhdGEsIGJ5dGVPZmZzZXQsIGxlbmd0aCl7XG4gICAgcmV0dXJuIGluaXQodGhpcywgZGF0YSwgYnl0ZU9mZnNldCwgbGVuZ3RoKTtcbiAgfTtcbn0pOyIsInJlcXVpcmUoJy4vX3R5cGVkLWFycmF5JykoJ0ludDMyJywgNCwgZnVuY3Rpb24oaW5pdCl7XG4gIHJldHVybiBmdW5jdGlvbiBJbnQzMkFycmF5KGRhdGEsIGJ5dGVPZmZzZXQsIGxlbmd0aCl7XG4gICAgcmV0dXJuIGluaXQodGhpcywgZGF0YSwgYnl0ZU9mZnNldCwgbGVuZ3RoKTtcbiAgfTtcbn0pOyIsInJlcXVpcmUoJy4vX3R5cGVkLWFycmF5JykoJ0ludDgnLCAxLCBmdW5jdGlvbihpbml0KXtcbiAgcmV0dXJuIGZ1bmN0aW9uIEludDhBcnJheShkYXRhLCBieXRlT2Zmc2V0LCBsZW5ndGgpe1xuICAgIHJldHVybiBpbml0KHRoaXMsIGRhdGEsIGJ5dGVPZmZzZXQsIGxlbmd0aCk7XG4gIH07XG59KTsiLCJyZXF1aXJlKCcuL190eXBlZC1hcnJheScpKCdVaW50MTYnLCAyLCBmdW5jdGlvbihpbml0KXtcbiAgcmV0dXJuIGZ1bmN0aW9uIFVpbnQxNkFycmF5KGRhdGEsIGJ5dGVPZmZzZXQsIGxlbmd0aCl7XG4gICAgcmV0dXJuIGluaXQodGhpcywgZGF0YSwgYnl0ZU9mZnNldCwgbGVuZ3RoKTtcbiAgfTtcbn0pOyIsInJlcXVpcmUoJy4vX3R5cGVkLWFycmF5JykoJ1VpbnQzMicsIDQsIGZ1bmN0aW9uKGluaXQpe1xuICByZXR1cm4gZnVuY3Rpb24gVWludDMyQXJyYXkoZGF0YSwgYnl0ZU9mZnNldCwgbGVuZ3RoKXtcbiAgICByZXR1cm4gaW5pdCh0aGlzLCBkYXRhLCBieXRlT2Zmc2V0LCBsZW5ndGgpO1xuICB9O1xufSk7IiwicmVxdWlyZSgnLi9fdHlwZWQtYXJyYXknKSgnVWludDgnLCAxLCBmdW5jdGlvbihpbml0KXtcbiAgcmV0dXJuIGZ1bmN0aW9uIFVpbnQ4QXJyYXkoZGF0YSwgYnl0ZU9mZnNldCwgbGVuZ3RoKXtcbiAgICByZXR1cm4gaW5pdCh0aGlzLCBkYXRhLCBieXRlT2Zmc2V0LCBsZW5ndGgpO1xuICB9O1xufSk7IiwicmVxdWlyZSgnLi9fdHlwZWQtYXJyYXknKSgnVWludDgnLCAxLCBmdW5jdGlvbihpbml0KXtcbiAgcmV0dXJuIGZ1bmN0aW9uIFVpbnQ4Q2xhbXBlZEFycmF5KGRhdGEsIGJ5dGVPZmZzZXQsIGxlbmd0aCl7XG4gICAgcmV0dXJuIGluaXQodGhpcywgZGF0YSwgYnl0ZU9mZnNldCwgbGVuZ3RoKTtcbiAgfTtcbn0sIHRydWUpOyIsIid1c2Ugc3RyaWN0JztcbnZhciBlYWNoICAgICAgICAgPSByZXF1aXJlKCcuL19hcnJheS1tZXRob2RzJykoMClcbiAgLCByZWRlZmluZSAgICAgPSByZXF1aXJlKCcuL19yZWRlZmluZScpXG4gICwgbWV0YSAgICAgICAgID0gcmVxdWlyZSgnLi9fbWV0YScpXG4gICwgYXNzaWduICAgICAgID0gcmVxdWlyZSgnLi9fb2JqZWN0LWFzc2lnbicpXG4gICwgd2VhayAgICAgICAgID0gcmVxdWlyZSgnLi9fY29sbGVjdGlvbi13ZWFrJylcbiAgLCBpc09iamVjdCAgICAgPSByZXF1aXJlKCcuL19pcy1vYmplY3QnKVxuICAsIGhhcyAgICAgICAgICA9IHJlcXVpcmUoJy4vX2hhcycpXG4gICwgZ2V0V2VhayAgICAgID0gbWV0YS5nZXRXZWFrXG4gICwgaXNFeHRlbnNpYmxlID0gT2JqZWN0LmlzRXh0ZW5zaWJsZVxuICAsIHVuY2F1Z2h0RnJvemVuU3RvcmUgPSB3ZWFrLnVmc3RvcmVcbiAgLCB0bXAgICAgICAgICAgPSB7fVxuICAsIEludGVybmFsTWFwO1xuXG52YXIgd3JhcHBlciA9IGZ1bmN0aW9uKGdldCl7XG4gIHJldHVybiBmdW5jdGlvbiBXZWFrTWFwKCl7XG4gICAgcmV0dXJuIGdldCh0aGlzLCBhcmd1bWVudHMubGVuZ3RoID4gMCA/IGFyZ3VtZW50c1swXSA6IHVuZGVmaW5lZCk7XG4gIH07XG59O1xuXG52YXIgbWV0aG9kcyA9IHtcbiAgLy8gMjMuMy4zLjMgV2Vha01hcC5wcm90b3R5cGUuZ2V0KGtleSlcbiAgZ2V0OiBmdW5jdGlvbiBnZXQoa2V5KXtcbiAgICBpZihpc09iamVjdChrZXkpKXtcbiAgICAgIHZhciBkYXRhID0gZ2V0V2VhayhrZXkpO1xuICAgICAgaWYoZGF0YSA9PT0gdHJ1ZSlyZXR1cm4gdW5jYXVnaHRGcm96ZW5TdG9yZSh0aGlzKS5nZXQoa2V5KTtcbiAgICAgIHJldHVybiBkYXRhID8gZGF0YVt0aGlzLl9pXSA6IHVuZGVmaW5lZDtcbiAgICB9XG4gIH0sXG4gIC8vIDIzLjMuMy41IFdlYWtNYXAucHJvdG90eXBlLnNldChrZXksIHZhbHVlKVxuICBzZXQ6IGZ1bmN0aW9uIHNldChrZXksIHZhbHVlKXtcbiAgICByZXR1cm4gd2Vhay5kZWYodGhpcywga2V5LCB2YWx1ZSk7XG4gIH1cbn07XG5cbi8vIDIzLjMgV2Vha01hcCBPYmplY3RzXG52YXIgJFdlYWtNYXAgPSBtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vX2NvbGxlY3Rpb24nKSgnV2Vha01hcCcsIHdyYXBwZXIsIG1ldGhvZHMsIHdlYWssIHRydWUsIHRydWUpO1xuXG4vLyBJRTExIFdlYWtNYXAgZnJvemVuIGtleXMgZml4XG5pZihuZXcgJFdlYWtNYXAoKS5zZXQoKE9iamVjdC5mcmVlemUgfHwgT2JqZWN0KSh0bXApLCA3KS5nZXQodG1wKSAhPSA3KXtcbiAgSW50ZXJuYWxNYXAgPSB3ZWFrLmdldENvbnN0cnVjdG9yKHdyYXBwZXIpO1xuICBhc3NpZ24oSW50ZXJuYWxNYXAucHJvdG90eXBlLCBtZXRob2RzKTtcbiAgbWV0YS5ORUVEID0gdHJ1ZTtcbiAgZWFjaChbJ2RlbGV0ZScsICdoYXMnLCAnZ2V0JywgJ3NldCddLCBmdW5jdGlvbihrZXkpe1xuICAgIHZhciBwcm90byAgPSAkV2Vha01hcC5wcm90b3R5cGVcbiAgICAgICwgbWV0aG9kID0gcHJvdG9ba2V5XTtcbiAgICByZWRlZmluZShwcm90bywga2V5LCBmdW5jdGlvbihhLCBiKXtcbiAgICAgIC8vIHN0b3JlIGZyb3plbiBvYmplY3RzIG9uIGludGVybmFsIHdlYWttYXAgc2hpbVxuICAgICAgaWYoaXNPYmplY3QoYSkgJiYgIWlzRXh0ZW5zaWJsZShhKSl7XG4gICAgICAgIGlmKCF0aGlzLl9mKXRoaXMuX2YgPSBuZXcgSW50ZXJuYWxNYXA7XG4gICAgICAgIHZhciByZXN1bHQgPSB0aGlzLl9mW2tleV0oYSwgYik7XG4gICAgICAgIHJldHVybiBrZXkgPT0gJ3NldCcgPyB0aGlzIDogcmVzdWx0O1xuICAgICAgLy8gc3RvcmUgYWxsIHRoZSByZXN0IG9uIG5hdGl2ZSB3ZWFrbWFwXG4gICAgICB9IHJldHVybiBtZXRob2QuY2FsbCh0aGlzLCBhLCBiKTtcbiAgICB9KTtcbiAgfSk7XG59IiwiJ3VzZSBzdHJpY3QnO1xudmFyIHdlYWsgPSByZXF1aXJlKCcuL19jb2xsZWN0aW9uLXdlYWsnKTtcblxuLy8gMjMuNCBXZWFrU2V0IE9iamVjdHNcbnJlcXVpcmUoJy4vX2NvbGxlY3Rpb24nKSgnV2Vha1NldCcsIGZ1bmN0aW9uKGdldCl7XG4gIHJldHVybiBmdW5jdGlvbiBXZWFrU2V0KCl7IHJldHVybiBnZXQodGhpcywgYXJndW1lbnRzLmxlbmd0aCA+IDAgPyBhcmd1bWVudHNbMF0gOiB1bmRlZmluZWQpOyB9O1xufSwge1xuICAvLyAyMy40LjMuMSBXZWFrU2V0LnByb3RvdHlwZS5hZGQodmFsdWUpXG4gIGFkZDogZnVuY3Rpb24gYWRkKHZhbHVlKXtcbiAgICByZXR1cm4gd2Vhay5kZWYodGhpcywgdmFsdWUsIHRydWUpO1xuICB9XG59LCB3ZWFrLCBmYWxzZSwgdHJ1ZSk7IiwiJ3VzZSBzdHJpY3QnO1xuLy8gaHR0cHM6Ly9naXRodWIuY29tL3RjMzkvQXJyYXkucHJvdG90eXBlLmluY2x1ZGVzXG52YXIgJGV4cG9ydCAgID0gcmVxdWlyZSgnLi9fZXhwb3J0JylcbiAgLCAkaW5jbHVkZXMgPSByZXF1aXJlKCcuL19hcnJheS1pbmNsdWRlcycpKHRydWUpO1xuXG4kZXhwb3J0KCRleHBvcnQuUCwgJ0FycmF5Jywge1xuICBpbmNsdWRlczogZnVuY3Rpb24gaW5jbHVkZXMoZWwgLyosIGZyb21JbmRleCA9IDAgKi8pe1xuICAgIHJldHVybiAkaW5jbHVkZXModGhpcywgZWwsIGFyZ3VtZW50cy5sZW5ndGggPiAxID8gYXJndW1lbnRzWzFdIDogdW5kZWZpbmVkKTtcbiAgfVxufSk7XG5cbnJlcXVpcmUoJy4vX2FkZC10by11bnNjb3BhYmxlcycpKCdpbmNsdWRlcycpOyIsIi8vIGh0dHBzOi8vZ2l0aHViLmNvbS9samhhcmIvcHJvcG9zYWwtaXMtZXJyb3JcbnZhciAkZXhwb3J0ID0gcmVxdWlyZSgnLi9fZXhwb3J0JylcbiAgLCBjb2YgICAgID0gcmVxdWlyZSgnLi9fY29mJyk7XG5cbiRleHBvcnQoJGV4cG9ydC5TLCAnRXJyb3InLCB7XG4gIGlzRXJyb3I6IGZ1bmN0aW9uIGlzRXJyb3IoaXQpe1xuICAgIHJldHVybiBjb2YoaXQpID09PSAnRXJyb3InO1xuICB9XG59KTsiLCIvLyBodHRwczovL2dpdGh1Yi5jb20vRGF2aWRCcnVhbnQvTWFwLVNldC5wcm90b3R5cGUudG9KU09OXG52YXIgJGV4cG9ydCAgPSByZXF1aXJlKCcuL19leHBvcnQnKTtcblxuJGV4cG9ydCgkZXhwb3J0LlAgKyAkZXhwb3J0LlIsICdNYXAnLCB7dG9KU09OOiByZXF1aXJlKCcuL19jb2xsZWN0aW9uLXRvLWpzb24nKSgnTWFwJyl9KTsiLCIvLyBodHRwczovL2dpc3QuZ2l0aHViLmNvbS9CcmVuZGFuRWljaC80Mjk0ZDVjMjEyYTZkMjI1NDcwM1xudmFyICRleHBvcnQgPSByZXF1aXJlKCcuL19leHBvcnQnKTtcblxuJGV4cG9ydCgkZXhwb3J0LlMsICdNYXRoJywge1xuICBpYWRkaDogZnVuY3Rpb24gaWFkZGgoeDAsIHgxLCB5MCwgeTEpe1xuICAgIHZhciAkeDAgPSB4MCA+Pj4gMFxuICAgICAgLCAkeDEgPSB4MSA+Pj4gMFxuICAgICAgLCAkeTAgPSB5MCA+Pj4gMDtcbiAgICByZXR1cm4gJHgxICsgKHkxID4+PiAwKSArICgoJHgwICYgJHkwIHwgKCR4MCB8ICR5MCkgJiB+KCR4MCArICR5MCA+Pj4gMCkpID4+PiAzMSkgfCAwO1xuICB9XG59KTsiLCIvLyBodHRwczovL2dpc3QuZ2l0aHViLmNvbS9CcmVuZGFuRWljaC80Mjk0ZDVjMjEyYTZkMjI1NDcwM1xudmFyICRleHBvcnQgPSByZXF1aXJlKCcuL19leHBvcnQnKTtcblxuJGV4cG9ydCgkZXhwb3J0LlMsICdNYXRoJywge1xuICBpbXVsaDogZnVuY3Rpb24gaW11bGgodSwgdil7XG4gICAgdmFyIFVJTlQxNiA9IDB4ZmZmZlxuICAgICAgLCAkdSA9ICt1XG4gICAgICAsICR2ID0gK3ZcbiAgICAgICwgdTAgPSAkdSAmIFVJTlQxNlxuICAgICAgLCB2MCA9ICR2ICYgVUlOVDE2XG4gICAgICAsIHUxID0gJHUgPj4gMTZcbiAgICAgICwgdjEgPSAkdiA+PiAxNlxuICAgICAgLCB0ICA9ICh1MSAqIHYwID4+PiAwKSArICh1MCAqIHYwID4+PiAxNik7XG4gICAgcmV0dXJuIHUxICogdjEgKyAodCA+PiAxNikgKyAoKHUwICogdjEgPj4+IDApICsgKHQgJiBVSU5UMTYpID4+IDE2KTtcbiAgfVxufSk7IiwiLy8gaHR0cHM6Ly9naXN0LmdpdGh1Yi5jb20vQnJlbmRhbkVpY2gvNDI5NGQ1YzIxMmE2ZDIyNTQ3MDNcbnZhciAkZXhwb3J0ID0gcmVxdWlyZSgnLi9fZXhwb3J0Jyk7XG5cbiRleHBvcnQoJGV4cG9ydC5TLCAnTWF0aCcsIHtcbiAgaXN1Ymg6IGZ1bmN0aW9uIGlzdWJoKHgwLCB4MSwgeTAsIHkxKXtcbiAgICB2YXIgJHgwID0geDAgPj4+IDBcbiAgICAgICwgJHgxID0geDEgPj4+IDBcbiAgICAgICwgJHkwID0geTAgPj4+IDA7XG4gICAgcmV0dXJuICR4MSAtICh5MSA+Pj4gMCkgLSAoKH4keDAgJiAkeTAgfCB+KCR4MCBeICR5MCkgJiAkeDAgLSAkeTAgPj4+IDApID4+PiAzMSkgfCAwO1xuICB9XG59KTsiLCIvLyBodHRwczovL2dpc3QuZ2l0aHViLmNvbS9CcmVuZGFuRWljaC80Mjk0ZDVjMjEyYTZkMjI1NDcwM1xudmFyICRleHBvcnQgPSByZXF1aXJlKCcuL19leHBvcnQnKTtcblxuJGV4cG9ydCgkZXhwb3J0LlMsICdNYXRoJywge1xuICB1bXVsaDogZnVuY3Rpb24gdW11bGgodSwgdil7XG4gICAgdmFyIFVJTlQxNiA9IDB4ZmZmZlxuICAgICAgLCAkdSA9ICt1XG4gICAgICAsICR2ID0gK3ZcbiAgICAgICwgdTAgPSAkdSAmIFVJTlQxNlxuICAgICAgLCB2MCA9ICR2ICYgVUlOVDE2XG4gICAgICAsIHUxID0gJHUgPj4+IDE2XG4gICAgICAsIHYxID0gJHYgPj4+IDE2XG4gICAgICAsIHQgID0gKHUxICogdjAgPj4+IDApICsgKHUwICogdjAgPj4+IDE2KTtcbiAgICByZXR1cm4gdTEgKiB2MSArICh0ID4+PiAxNikgKyAoKHUwICogdjEgPj4+IDApICsgKHQgJiBVSU5UMTYpID4+PiAxNik7XG4gIH1cbn0pOyIsIid1c2Ugc3RyaWN0JztcclxudmFyICRleHBvcnQgICAgICAgICA9IHJlcXVpcmUoJy4vX2V4cG9ydCcpXHJcbiAgLCB0b09iamVjdCAgICAgICAgPSByZXF1aXJlKCcuL190by1vYmplY3QnKVxyXG4gICwgYUZ1bmN0aW9uICAgICAgID0gcmVxdWlyZSgnLi9fYS1mdW5jdGlvbicpXHJcbiAgLCAkZGVmaW5lUHJvcGVydHkgPSByZXF1aXJlKCcuL19vYmplY3QtZHAnKTtcclxuXHJcbi8vIEIuMi4yLjIgT2JqZWN0LnByb3RvdHlwZS5fX2RlZmluZUdldHRlcl9fKFAsIGdldHRlcilcclxucmVxdWlyZSgnLi9fZGVzY3JpcHRvcnMnKSAmJiAkZXhwb3J0KCRleHBvcnQuUCArIHJlcXVpcmUoJy4vX29iamVjdC1mb3JjZWQtcGFtJyksICdPYmplY3QnLCB7XHJcbiAgX19kZWZpbmVHZXR0ZXJfXzogZnVuY3Rpb24gX19kZWZpbmVHZXR0ZXJfXyhQLCBnZXR0ZXIpe1xyXG4gICAgJGRlZmluZVByb3BlcnR5LmYodG9PYmplY3QodGhpcyksIFAsIHtnZXQ6IGFGdW5jdGlvbihnZXR0ZXIpLCBlbnVtZXJhYmxlOiB0cnVlLCBjb25maWd1cmFibGU6IHRydWV9KTtcclxuICB9XHJcbn0pOyIsIid1c2Ugc3RyaWN0JztcclxudmFyICRleHBvcnQgICAgICAgICA9IHJlcXVpcmUoJy4vX2V4cG9ydCcpXHJcbiAgLCB0b09iamVjdCAgICAgICAgPSByZXF1aXJlKCcuL190by1vYmplY3QnKVxyXG4gICwgYUZ1bmN0aW9uICAgICAgID0gcmVxdWlyZSgnLi9fYS1mdW5jdGlvbicpXHJcbiAgLCAkZGVmaW5lUHJvcGVydHkgPSByZXF1aXJlKCcuL19vYmplY3QtZHAnKTtcclxuXHJcbi8vIEIuMi4yLjMgT2JqZWN0LnByb3RvdHlwZS5fX2RlZmluZVNldHRlcl9fKFAsIHNldHRlcilcclxucmVxdWlyZSgnLi9fZGVzY3JpcHRvcnMnKSAmJiAkZXhwb3J0KCRleHBvcnQuUCArIHJlcXVpcmUoJy4vX29iamVjdC1mb3JjZWQtcGFtJyksICdPYmplY3QnLCB7XHJcbiAgX19kZWZpbmVTZXR0ZXJfXzogZnVuY3Rpb24gX19kZWZpbmVTZXR0ZXJfXyhQLCBzZXR0ZXIpe1xyXG4gICAgJGRlZmluZVByb3BlcnR5LmYodG9PYmplY3QodGhpcyksIFAsIHtzZXQ6IGFGdW5jdGlvbihzZXR0ZXIpLCBlbnVtZXJhYmxlOiB0cnVlLCBjb25maWd1cmFibGU6IHRydWV9KTtcclxuICB9XHJcbn0pOyIsIi8vIGh0dHBzOi8vZ2l0aHViLmNvbS90YzM5L3Byb3Bvc2FsLW9iamVjdC12YWx1ZXMtZW50cmllc1xudmFyICRleHBvcnQgID0gcmVxdWlyZSgnLi9fZXhwb3J0JylcbiAgLCAkZW50cmllcyA9IHJlcXVpcmUoJy4vX29iamVjdC10by1hcnJheScpKHRydWUpO1xuXG4kZXhwb3J0KCRleHBvcnQuUywgJ09iamVjdCcsIHtcbiAgZW50cmllczogZnVuY3Rpb24gZW50cmllcyhpdCl7XG4gICAgcmV0dXJuICRlbnRyaWVzKGl0KTtcbiAgfVxufSk7IiwiLy8gaHR0cHM6Ly9naXRodWIuY29tL3RjMzkvcHJvcG9zYWwtb2JqZWN0LWdldG93bnByb3BlcnR5ZGVzY3JpcHRvcnNcbnZhciAkZXhwb3J0ICAgID0gcmVxdWlyZSgnLi9fZXhwb3J0JylcbiAgLCBvd25LZXlzICAgID0gcmVxdWlyZSgnLi9fb3duLWtleXMnKVxuICAsIHRvSU9iamVjdCAgPSByZXF1aXJlKCcuL190by1pb2JqZWN0JylcbiAgLCBjcmVhdGVEZXNjID0gcmVxdWlyZSgnLi9fcHJvcGVydHktZGVzYycpXG4gICwgZ09QRCAgICAgICA9IHJlcXVpcmUoJy4vX29iamVjdC1nb3BkJylcbiAgLCBkUCAgICAgICAgID0gcmVxdWlyZSgnLi9fb2JqZWN0LWRwJyk7XG5cbiRleHBvcnQoJGV4cG9ydC5TLCAnT2JqZWN0Jywge1xuICBnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3JzOiBmdW5jdGlvbiBnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3JzKG9iamVjdCl7XG4gICAgdmFyIE8gICAgICAgPSB0b0lPYmplY3Qob2JqZWN0KVxuICAgICAgLCBnZXREZXNjID0gZ09QRC5mXG4gICAgICAsIGtleXMgICAgPSBvd25LZXlzKE8pXG4gICAgICAsIHJlc3VsdCAgPSB7fVxuICAgICAgLCBpICAgICAgID0gMFxuICAgICAgLCBrZXksIEQ7XG4gICAgd2hpbGUoa2V5cy5sZW5ndGggPiBpKXtcbiAgICAgIEQgPSBnZXREZXNjKE8sIGtleSA9IGtleXNbaSsrXSk7XG4gICAgICBpZihrZXkgaW4gcmVzdWx0KWRQLmYocmVzdWx0LCBrZXksIGNyZWF0ZURlc2MoMCwgRCkpO1xuICAgICAgZWxzZSByZXN1bHRba2V5XSA9IEQ7XG4gICAgfSByZXR1cm4gcmVzdWx0O1xuICB9XG59KTsiLCIndXNlIHN0cmljdCc7XHJcbnZhciAkZXhwb3J0ICAgICAgICAgICAgICAgICAgPSByZXF1aXJlKCcuL19leHBvcnQnKVxyXG4gICwgdG9PYmplY3QgICAgICAgICAgICAgICAgID0gcmVxdWlyZSgnLi9fdG8tb2JqZWN0JylcclxuICAsIHRvUHJpbWl0aXZlICAgICAgICAgICAgICA9IHJlcXVpcmUoJy4vX3RvLXByaW1pdGl2ZScpXHJcbiAgLCBnZXRQcm90b3R5cGVPZiAgICAgICAgICAgPSByZXF1aXJlKCcuL19vYmplY3QtZ3BvJylcclxuICAsIGdldE93blByb3BlcnR5RGVzY3JpcHRvciA9IHJlcXVpcmUoJy4vX29iamVjdC1nb3BkJykuZjtcclxuXHJcbi8vIEIuMi4yLjQgT2JqZWN0LnByb3RvdHlwZS5fX2xvb2t1cEdldHRlcl9fKFApXHJcbnJlcXVpcmUoJy4vX2Rlc2NyaXB0b3JzJykgJiYgJGV4cG9ydCgkZXhwb3J0LlAgKyByZXF1aXJlKCcuL19vYmplY3QtZm9yY2VkLXBhbScpLCAnT2JqZWN0Jywge1xyXG4gIF9fbG9va3VwR2V0dGVyX186IGZ1bmN0aW9uIF9fbG9va3VwR2V0dGVyX18oUCl7XHJcbiAgICB2YXIgTyA9IHRvT2JqZWN0KHRoaXMpXHJcbiAgICAgICwgSyA9IHRvUHJpbWl0aXZlKFAsIHRydWUpXHJcbiAgICAgICwgRDtcclxuICAgIGRvIHtcclxuICAgICAgaWYoRCA9IGdldE93blByb3BlcnR5RGVzY3JpcHRvcihPLCBLKSlyZXR1cm4gRC5nZXQ7XHJcbiAgICB9IHdoaWxlKE8gPSBnZXRQcm90b3R5cGVPZihPKSk7XHJcbiAgfVxyXG59KTsiLCIndXNlIHN0cmljdCc7XHJcbnZhciAkZXhwb3J0ICAgICAgICAgICAgICAgICAgPSByZXF1aXJlKCcuL19leHBvcnQnKVxyXG4gICwgdG9PYmplY3QgICAgICAgICAgICAgICAgID0gcmVxdWlyZSgnLi9fdG8tb2JqZWN0JylcclxuICAsIHRvUHJpbWl0aXZlICAgICAgICAgICAgICA9IHJlcXVpcmUoJy4vX3RvLXByaW1pdGl2ZScpXHJcbiAgLCBnZXRQcm90b3R5cGVPZiAgICAgICAgICAgPSByZXF1aXJlKCcuL19vYmplY3QtZ3BvJylcclxuICAsIGdldE93blByb3BlcnR5RGVzY3JpcHRvciA9IHJlcXVpcmUoJy4vX29iamVjdC1nb3BkJykuZjtcclxuXHJcbi8vIEIuMi4yLjUgT2JqZWN0LnByb3RvdHlwZS5fX2xvb2t1cFNldHRlcl9fKFApXHJcbnJlcXVpcmUoJy4vX2Rlc2NyaXB0b3JzJykgJiYgJGV4cG9ydCgkZXhwb3J0LlAgKyByZXF1aXJlKCcuL19vYmplY3QtZm9yY2VkLXBhbScpLCAnT2JqZWN0Jywge1xyXG4gIF9fbG9va3VwU2V0dGVyX186IGZ1bmN0aW9uIF9fbG9va3VwU2V0dGVyX18oUCl7XHJcbiAgICB2YXIgTyA9IHRvT2JqZWN0KHRoaXMpXHJcbiAgICAgICwgSyA9IHRvUHJpbWl0aXZlKFAsIHRydWUpXHJcbiAgICAgICwgRDtcclxuICAgIGRvIHtcclxuICAgICAgaWYoRCA9IGdldE93blByb3BlcnR5RGVzY3JpcHRvcihPLCBLKSlyZXR1cm4gRC5zZXQ7XHJcbiAgICB9IHdoaWxlKE8gPSBnZXRQcm90b3R5cGVPZihPKSk7XHJcbiAgfVxyXG59KTsiLCIvLyBodHRwczovL2dpdGh1Yi5jb20vdGMzOS9wcm9wb3NhbC1vYmplY3QtdmFsdWVzLWVudHJpZXNcbnZhciAkZXhwb3J0ID0gcmVxdWlyZSgnLi9fZXhwb3J0JylcbiAgLCAkdmFsdWVzID0gcmVxdWlyZSgnLi9fb2JqZWN0LXRvLWFycmF5JykoZmFsc2UpO1xuXG4kZXhwb3J0KCRleHBvcnQuUywgJ09iamVjdCcsIHtcbiAgdmFsdWVzOiBmdW5jdGlvbiB2YWx1ZXMoaXQpe1xuICAgIHJldHVybiAkdmFsdWVzKGl0KTtcbiAgfVxufSk7IiwidmFyIG1ldGFkYXRhICAgICAgICAgICAgICAgICAgPSByZXF1aXJlKCcuL19tZXRhZGF0YScpXG4gICwgYW5PYmplY3QgICAgICAgICAgICAgICAgICA9IHJlcXVpcmUoJy4vX2FuLW9iamVjdCcpXG4gICwgdG9NZXRhS2V5ICAgICAgICAgICAgICAgICA9IG1ldGFkYXRhLmtleVxuICAsIG9yZGluYXJ5RGVmaW5lT3duTWV0YWRhdGEgPSBtZXRhZGF0YS5zZXQ7XG5cbm1ldGFkYXRhLmV4cCh7ZGVmaW5lTWV0YWRhdGE6IGZ1bmN0aW9uIGRlZmluZU1ldGFkYXRhKG1ldGFkYXRhS2V5LCBtZXRhZGF0YVZhbHVlLCB0YXJnZXQsIHRhcmdldEtleSl7XG4gIG9yZGluYXJ5RGVmaW5lT3duTWV0YWRhdGEobWV0YWRhdGFLZXksIG1ldGFkYXRhVmFsdWUsIGFuT2JqZWN0KHRhcmdldCksIHRvTWV0YUtleSh0YXJnZXRLZXkpKTtcbn19KTsiLCJ2YXIgbWV0YWRhdGEgICAgICAgICAgICAgICA9IHJlcXVpcmUoJy4vX21ldGFkYXRhJylcbiAgLCBhbk9iamVjdCAgICAgICAgICAgICAgID0gcmVxdWlyZSgnLi9fYW4tb2JqZWN0JylcbiAgLCB0b01ldGFLZXkgICAgICAgICAgICAgID0gbWV0YWRhdGEua2V5XG4gICwgZ2V0T3JDcmVhdGVNZXRhZGF0YU1hcCA9IG1ldGFkYXRhLm1hcFxuICAsIHN0b3JlICAgICAgICAgICAgICAgICAgPSBtZXRhZGF0YS5zdG9yZTtcblxubWV0YWRhdGEuZXhwKHtkZWxldGVNZXRhZGF0YTogZnVuY3Rpb24gZGVsZXRlTWV0YWRhdGEobWV0YWRhdGFLZXksIHRhcmdldCAvKiwgdGFyZ2V0S2V5ICovKXtcbiAgdmFyIHRhcmdldEtleSAgID0gYXJndW1lbnRzLmxlbmd0aCA8IDMgPyB1bmRlZmluZWQgOiB0b01ldGFLZXkoYXJndW1lbnRzWzJdKVxuICAgICwgbWV0YWRhdGFNYXAgPSBnZXRPckNyZWF0ZU1ldGFkYXRhTWFwKGFuT2JqZWN0KHRhcmdldCksIHRhcmdldEtleSwgZmFsc2UpO1xuICBpZihtZXRhZGF0YU1hcCA9PT0gdW5kZWZpbmVkIHx8ICFtZXRhZGF0YU1hcFsnZGVsZXRlJ10obWV0YWRhdGFLZXkpKXJldHVybiBmYWxzZTtcbiAgaWYobWV0YWRhdGFNYXAuc2l6ZSlyZXR1cm4gdHJ1ZTtcbiAgdmFyIHRhcmdldE1ldGFkYXRhID0gc3RvcmUuZ2V0KHRhcmdldCk7XG4gIHRhcmdldE1ldGFkYXRhWydkZWxldGUnXSh0YXJnZXRLZXkpO1xuICByZXR1cm4gISF0YXJnZXRNZXRhZGF0YS5zaXplIHx8IHN0b3JlWydkZWxldGUnXSh0YXJnZXQpO1xufX0pOyIsInZhciBTZXQgICAgICAgICAgICAgICAgICAgICA9IHJlcXVpcmUoJy4vZXM2LnNldCcpXG4gICwgZnJvbSAgICAgICAgICAgICAgICAgICAgPSByZXF1aXJlKCcuL19hcnJheS1mcm9tLWl0ZXJhYmxlJylcbiAgLCBtZXRhZGF0YSAgICAgICAgICAgICAgICA9IHJlcXVpcmUoJy4vX21ldGFkYXRhJylcbiAgLCBhbk9iamVjdCAgICAgICAgICAgICAgICA9IHJlcXVpcmUoJy4vX2FuLW9iamVjdCcpXG4gICwgZ2V0UHJvdG90eXBlT2YgICAgICAgICAgPSByZXF1aXJlKCcuL19vYmplY3QtZ3BvJylcbiAgLCBvcmRpbmFyeU93bk1ldGFkYXRhS2V5cyA9IG1ldGFkYXRhLmtleXNcbiAgLCB0b01ldGFLZXkgICAgICAgICAgICAgICA9IG1ldGFkYXRhLmtleTtcblxudmFyIG9yZGluYXJ5TWV0YWRhdGFLZXlzID0gZnVuY3Rpb24oTywgUCl7XG4gIHZhciBvS2V5cyAgPSBvcmRpbmFyeU93bk1ldGFkYXRhS2V5cyhPLCBQKVxuICAgICwgcGFyZW50ID0gZ2V0UHJvdG90eXBlT2YoTyk7XG4gIGlmKHBhcmVudCA9PT0gbnVsbClyZXR1cm4gb0tleXM7XG4gIHZhciBwS2V5cyAgPSBvcmRpbmFyeU1ldGFkYXRhS2V5cyhwYXJlbnQsIFApO1xuICByZXR1cm4gcEtleXMubGVuZ3RoID8gb0tleXMubGVuZ3RoID8gZnJvbShuZXcgU2V0KG9LZXlzLmNvbmNhdChwS2V5cykpKSA6IHBLZXlzIDogb0tleXM7XG59O1xuXG5tZXRhZGF0YS5leHAoe2dldE1ldGFkYXRhS2V5czogZnVuY3Rpb24gZ2V0TWV0YWRhdGFLZXlzKHRhcmdldCAvKiwgdGFyZ2V0S2V5ICovKXtcbiAgcmV0dXJuIG9yZGluYXJ5TWV0YWRhdGFLZXlzKGFuT2JqZWN0KHRhcmdldCksIGFyZ3VtZW50cy5sZW5ndGggPCAyID8gdW5kZWZpbmVkIDogdG9NZXRhS2V5KGFyZ3VtZW50c1sxXSkpO1xufX0pOyIsInZhciBtZXRhZGF0YSAgICAgICAgICAgICAgID0gcmVxdWlyZSgnLi9fbWV0YWRhdGEnKVxuICAsIGFuT2JqZWN0ICAgICAgICAgICAgICAgPSByZXF1aXJlKCcuL19hbi1vYmplY3QnKVxuICAsIGdldFByb3RvdHlwZU9mICAgICAgICAgPSByZXF1aXJlKCcuL19vYmplY3QtZ3BvJylcbiAgLCBvcmRpbmFyeUhhc093bk1ldGFkYXRhID0gbWV0YWRhdGEuaGFzXG4gICwgb3JkaW5hcnlHZXRPd25NZXRhZGF0YSA9IG1ldGFkYXRhLmdldFxuICAsIHRvTWV0YUtleSAgICAgICAgICAgICAgPSBtZXRhZGF0YS5rZXk7XG5cbnZhciBvcmRpbmFyeUdldE1ldGFkYXRhID0gZnVuY3Rpb24oTWV0YWRhdGFLZXksIE8sIFApe1xuICB2YXIgaGFzT3duID0gb3JkaW5hcnlIYXNPd25NZXRhZGF0YShNZXRhZGF0YUtleSwgTywgUCk7XG4gIGlmKGhhc093bilyZXR1cm4gb3JkaW5hcnlHZXRPd25NZXRhZGF0YShNZXRhZGF0YUtleSwgTywgUCk7XG4gIHZhciBwYXJlbnQgPSBnZXRQcm90b3R5cGVPZihPKTtcbiAgcmV0dXJuIHBhcmVudCAhPT0gbnVsbCA/IG9yZGluYXJ5R2V0TWV0YWRhdGEoTWV0YWRhdGFLZXksIHBhcmVudCwgUCkgOiB1bmRlZmluZWQ7XG59O1xuXG5tZXRhZGF0YS5leHAoe2dldE1ldGFkYXRhOiBmdW5jdGlvbiBnZXRNZXRhZGF0YShtZXRhZGF0YUtleSwgdGFyZ2V0IC8qLCB0YXJnZXRLZXkgKi8pe1xuICByZXR1cm4gb3JkaW5hcnlHZXRNZXRhZGF0YShtZXRhZGF0YUtleSwgYW5PYmplY3QodGFyZ2V0KSwgYXJndW1lbnRzLmxlbmd0aCA8IDMgPyB1bmRlZmluZWQgOiB0b01ldGFLZXkoYXJndW1lbnRzWzJdKSk7XG59fSk7IiwidmFyIG1ldGFkYXRhICAgICAgICAgICAgICAgID0gcmVxdWlyZSgnLi9fbWV0YWRhdGEnKVxuICAsIGFuT2JqZWN0ICAgICAgICAgICAgICAgID0gcmVxdWlyZSgnLi9fYW4tb2JqZWN0JylcbiAgLCBvcmRpbmFyeU93bk1ldGFkYXRhS2V5cyA9IG1ldGFkYXRhLmtleXNcbiAgLCB0b01ldGFLZXkgICAgICAgICAgICAgICA9IG1ldGFkYXRhLmtleTtcblxubWV0YWRhdGEuZXhwKHtnZXRPd25NZXRhZGF0YUtleXM6IGZ1bmN0aW9uIGdldE93bk1ldGFkYXRhS2V5cyh0YXJnZXQgLyosIHRhcmdldEtleSAqLyl7XG4gIHJldHVybiBvcmRpbmFyeU93bk1ldGFkYXRhS2V5cyhhbk9iamVjdCh0YXJnZXQpLCBhcmd1bWVudHMubGVuZ3RoIDwgMiA/IHVuZGVmaW5lZCA6IHRvTWV0YUtleShhcmd1bWVudHNbMV0pKTtcbn19KTsiLCJ2YXIgbWV0YWRhdGEgICAgICAgICAgICAgICA9IHJlcXVpcmUoJy4vX21ldGFkYXRhJylcbiAgLCBhbk9iamVjdCAgICAgICAgICAgICAgID0gcmVxdWlyZSgnLi9fYW4tb2JqZWN0JylcbiAgLCBvcmRpbmFyeUdldE93bk1ldGFkYXRhID0gbWV0YWRhdGEuZ2V0XG4gICwgdG9NZXRhS2V5ICAgICAgICAgICAgICA9IG1ldGFkYXRhLmtleTtcblxubWV0YWRhdGEuZXhwKHtnZXRPd25NZXRhZGF0YTogZnVuY3Rpb24gZ2V0T3duTWV0YWRhdGEobWV0YWRhdGFLZXksIHRhcmdldCAvKiwgdGFyZ2V0S2V5ICovKXtcbiAgcmV0dXJuIG9yZGluYXJ5R2V0T3duTWV0YWRhdGEobWV0YWRhdGFLZXksIGFuT2JqZWN0KHRhcmdldClcbiAgICAsIGFyZ3VtZW50cy5sZW5ndGggPCAzID8gdW5kZWZpbmVkIDogdG9NZXRhS2V5KGFyZ3VtZW50c1syXSkpO1xufX0pOyIsInZhciBtZXRhZGF0YSAgICAgICAgICAgICAgID0gcmVxdWlyZSgnLi9fbWV0YWRhdGEnKVxuICAsIGFuT2JqZWN0ICAgICAgICAgICAgICAgPSByZXF1aXJlKCcuL19hbi1vYmplY3QnKVxuICAsIGdldFByb3RvdHlwZU9mICAgICAgICAgPSByZXF1aXJlKCcuL19vYmplY3QtZ3BvJylcbiAgLCBvcmRpbmFyeUhhc093bk1ldGFkYXRhID0gbWV0YWRhdGEuaGFzXG4gICwgdG9NZXRhS2V5ICAgICAgICAgICAgICA9IG1ldGFkYXRhLmtleTtcblxudmFyIG9yZGluYXJ5SGFzTWV0YWRhdGEgPSBmdW5jdGlvbihNZXRhZGF0YUtleSwgTywgUCl7XG4gIHZhciBoYXNPd24gPSBvcmRpbmFyeUhhc093bk1ldGFkYXRhKE1ldGFkYXRhS2V5LCBPLCBQKTtcbiAgaWYoaGFzT3duKXJldHVybiB0cnVlO1xuICB2YXIgcGFyZW50ID0gZ2V0UHJvdG90eXBlT2YoTyk7XG4gIHJldHVybiBwYXJlbnQgIT09IG51bGwgPyBvcmRpbmFyeUhhc01ldGFkYXRhKE1ldGFkYXRhS2V5LCBwYXJlbnQsIFApIDogZmFsc2U7XG59O1xuXG5tZXRhZGF0YS5leHAoe2hhc01ldGFkYXRhOiBmdW5jdGlvbiBoYXNNZXRhZGF0YShtZXRhZGF0YUtleSwgdGFyZ2V0IC8qLCB0YXJnZXRLZXkgKi8pe1xuICByZXR1cm4gb3JkaW5hcnlIYXNNZXRhZGF0YShtZXRhZGF0YUtleSwgYW5PYmplY3QodGFyZ2V0KSwgYXJndW1lbnRzLmxlbmd0aCA8IDMgPyB1bmRlZmluZWQgOiB0b01ldGFLZXkoYXJndW1lbnRzWzJdKSk7XG59fSk7IiwidmFyIG1ldGFkYXRhICAgICAgICAgICAgICAgPSByZXF1aXJlKCcuL19tZXRhZGF0YScpXG4gICwgYW5PYmplY3QgICAgICAgICAgICAgICA9IHJlcXVpcmUoJy4vX2FuLW9iamVjdCcpXG4gICwgb3JkaW5hcnlIYXNPd25NZXRhZGF0YSA9IG1ldGFkYXRhLmhhc1xuICAsIHRvTWV0YUtleSAgICAgICAgICAgICAgPSBtZXRhZGF0YS5rZXk7XG5cbm1ldGFkYXRhLmV4cCh7aGFzT3duTWV0YWRhdGE6IGZ1bmN0aW9uIGhhc093bk1ldGFkYXRhKG1ldGFkYXRhS2V5LCB0YXJnZXQgLyosIHRhcmdldEtleSAqLyl7XG4gIHJldHVybiBvcmRpbmFyeUhhc093bk1ldGFkYXRhKG1ldGFkYXRhS2V5LCBhbk9iamVjdCh0YXJnZXQpXG4gICAgLCBhcmd1bWVudHMubGVuZ3RoIDwgMyA/IHVuZGVmaW5lZCA6IHRvTWV0YUtleShhcmd1bWVudHNbMl0pKTtcbn19KTsiLCJ2YXIgbWV0YWRhdGEgICAgICAgICAgICAgICAgICA9IHJlcXVpcmUoJy4vX21ldGFkYXRhJylcbiAgLCBhbk9iamVjdCAgICAgICAgICAgICAgICAgID0gcmVxdWlyZSgnLi9fYW4tb2JqZWN0JylcbiAgLCBhRnVuY3Rpb24gICAgICAgICAgICAgICAgID0gcmVxdWlyZSgnLi9fYS1mdW5jdGlvbicpXG4gICwgdG9NZXRhS2V5ICAgICAgICAgICAgICAgICA9IG1ldGFkYXRhLmtleVxuICAsIG9yZGluYXJ5RGVmaW5lT3duTWV0YWRhdGEgPSBtZXRhZGF0YS5zZXQ7XG5cbm1ldGFkYXRhLmV4cCh7bWV0YWRhdGE6IGZ1bmN0aW9uIG1ldGFkYXRhKG1ldGFkYXRhS2V5LCBtZXRhZGF0YVZhbHVlKXtcbiAgcmV0dXJuIGZ1bmN0aW9uIGRlY29yYXRvcih0YXJnZXQsIHRhcmdldEtleSl7XG4gICAgb3JkaW5hcnlEZWZpbmVPd25NZXRhZGF0YShcbiAgICAgIG1ldGFkYXRhS2V5LCBtZXRhZGF0YVZhbHVlLFxuICAgICAgKHRhcmdldEtleSAhPT0gdW5kZWZpbmVkID8gYW5PYmplY3QgOiBhRnVuY3Rpb24pKHRhcmdldCksXG4gICAgICB0b01ldGFLZXkodGFyZ2V0S2V5KVxuICAgICk7XG4gIH07XG59fSk7IiwiLy8gaHR0cHM6Ly9naXRodWIuY29tL0RhdmlkQnJ1YW50L01hcC1TZXQucHJvdG90eXBlLnRvSlNPTlxudmFyICRleHBvcnQgID0gcmVxdWlyZSgnLi9fZXhwb3J0Jyk7XG5cbiRleHBvcnQoJGV4cG9ydC5QICsgJGV4cG9ydC5SLCAnU2V0Jywge3RvSlNPTjogcmVxdWlyZSgnLi9fY29sbGVjdGlvbi10by1qc29uJykoJ1NldCcpfSk7IiwiJ3VzZSBzdHJpY3QnO1xuLy8gaHR0cHM6Ly9naXRodWIuY29tL21hdGhpYXNieW5lbnMvU3RyaW5nLnByb3RvdHlwZS5hdFxudmFyICRleHBvcnQgPSByZXF1aXJlKCcuL19leHBvcnQnKVxuICAsICRhdCAgICAgPSByZXF1aXJlKCcuL19zdHJpbmctYXQnKSh0cnVlKTtcblxuJGV4cG9ydCgkZXhwb3J0LlAsICdTdHJpbmcnLCB7XG4gIGF0OiBmdW5jdGlvbiBhdChwb3Mpe1xuICAgIHJldHVybiAkYXQodGhpcywgcG9zKTtcbiAgfVxufSk7IiwiJ3VzZSBzdHJpY3QnO1xyXG4vLyBodHRwczovL3RjMzkuZ2l0aHViLmlvL1N0cmluZy5wcm90b3R5cGUubWF0Y2hBbGwvXHJcbnZhciAkZXhwb3J0ICAgICA9IHJlcXVpcmUoJy4vX2V4cG9ydCcpXHJcbiAgLCBkZWZpbmVkICAgICA9IHJlcXVpcmUoJy4vX2RlZmluZWQnKVxyXG4gICwgdG9MZW5ndGggICAgPSByZXF1aXJlKCcuL190by1sZW5ndGgnKVxyXG4gICwgaXNSZWdFeHAgICAgPSByZXF1aXJlKCcuL19pcy1yZWdleHAnKVxyXG4gICwgZ2V0RmxhZ3MgICAgPSByZXF1aXJlKCcuL19mbGFncycpXHJcbiAgLCBSZWdFeHBQcm90byA9IFJlZ0V4cC5wcm90b3R5cGU7XHJcblxyXG52YXIgJFJlZ0V4cFN0cmluZ0l0ZXJhdG9yID0gZnVuY3Rpb24ocmVnZXhwLCBzdHJpbmcpe1xyXG4gIHRoaXMuX3IgPSByZWdleHA7XHJcbiAgdGhpcy5fcyA9IHN0cmluZztcclxufTtcclxuXHJcbnJlcXVpcmUoJy4vX2l0ZXItY3JlYXRlJykoJFJlZ0V4cFN0cmluZ0l0ZXJhdG9yLCAnUmVnRXhwIFN0cmluZycsIGZ1bmN0aW9uIG5leHQoKXtcclxuICB2YXIgbWF0Y2ggPSB0aGlzLl9yLmV4ZWModGhpcy5fcyk7XHJcbiAgcmV0dXJuIHt2YWx1ZTogbWF0Y2gsIGRvbmU6IG1hdGNoID09PSBudWxsfTtcclxufSk7XHJcblxyXG4kZXhwb3J0KCRleHBvcnQuUCwgJ1N0cmluZycsIHtcclxuICBtYXRjaEFsbDogZnVuY3Rpb24gbWF0Y2hBbGwocmVnZXhwKXtcclxuICAgIGRlZmluZWQodGhpcyk7XHJcbiAgICBpZighaXNSZWdFeHAocmVnZXhwKSl0aHJvdyBUeXBlRXJyb3IocmVnZXhwICsgJyBpcyBub3QgYSByZWdleHAhJyk7XHJcbiAgICB2YXIgUyAgICAgPSBTdHJpbmcodGhpcylcclxuICAgICAgLCBmbGFncyA9ICdmbGFncycgaW4gUmVnRXhwUHJvdG8gPyBTdHJpbmcocmVnZXhwLmZsYWdzKSA6IGdldEZsYWdzLmNhbGwocmVnZXhwKVxyXG4gICAgICAsIHJ4ICAgID0gbmV3IFJlZ0V4cChyZWdleHAuc291cmNlLCB+ZmxhZ3MuaW5kZXhPZignZycpID8gZmxhZ3MgOiAnZycgKyBmbGFncyk7XHJcbiAgICByeC5sYXN0SW5kZXggPSB0b0xlbmd0aChyZWdleHAubGFzdEluZGV4KTtcclxuICAgIHJldHVybiBuZXcgJFJlZ0V4cFN0cmluZ0l0ZXJhdG9yKHJ4LCBTKTtcclxuICB9XHJcbn0pOyIsIid1c2Ugc3RyaWN0Jztcbi8vIGh0dHBzOi8vZ2l0aHViLmNvbS90YzM5L3Byb3Bvc2FsLXN0cmluZy1wYWQtc3RhcnQtZW5kXG52YXIgJGV4cG9ydCA9IHJlcXVpcmUoJy4vX2V4cG9ydCcpXG4gICwgJHBhZCAgICA9IHJlcXVpcmUoJy4vX3N0cmluZy1wYWQnKTtcblxuJGV4cG9ydCgkZXhwb3J0LlAsICdTdHJpbmcnLCB7XG4gIHBhZEVuZDogZnVuY3Rpb24gcGFkRW5kKG1heExlbmd0aCAvKiwgZmlsbFN0cmluZyA9ICcgJyAqLyl7XG4gICAgcmV0dXJuICRwYWQodGhpcywgbWF4TGVuZ3RoLCBhcmd1bWVudHMubGVuZ3RoID4gMSA/IGFyZ3VtZW50c1sxXSA6IHVuZGVmaW5lZCwgZmFsc2UpO1xuICB9XG59KTsiLCIndXNlIHN0cmljdCc7XG4vLyBodHRwczovL2dpdGh1Yi5jb20vdGMzOS9wcm9wb3NhbC1zdHJpbmctcGFkLXN0YXJ0LWVuZFxudmFyICRleHBvcnQgPSByZXF1aXJlKCcuL19leHBvcnQnKVxuICAsICRwYWQgICAgPSByZXF1aXJlKCcuL19zdHJpbmctcGFkJyk7XG5cbiRleHBvcnQoJGV4cG9ydC5QLCAnU3RyaW5nJywge1xuICBwYWRTdGFydDogZnVuY3Rpb24gcGFkU3RhcnQobWF4TGVuZ3RoIC8qLCBmaWxsU3RyaW5nID0gJyAnICovKXtcbiAgICByZXR1cm4gJHBhZCh0aGlzLCBtYXhMZW5ndGgsIGFyZ3VtZW50cy5sZW5ndGggPiAxID8gYXJndW1lbnRzWzFdIDogdW5kZWZpbmVkLCB0cnVlKTtcbiAgfVxufSk7IiwiJ3VzZSBzdHJpY3QnO1xuLy8gaHR0cHM6Ly9naXRodWIuY29tL3NlYm1hcmtiYWdlL2VjbWFzY3JpcHQtc3RyaW5nLWxlZnQtcmlnaHQtdHJpbVxucmVxdWlyZSgnLi9fc3RyaW5nLXRyaW0nKSgndHJpbUxlZnQnLCBmdW5jdGlvbigkdHJpbSl7XG4gIHJldHVybiBmdW5jdGlvbiB0cmltTGVmdCgpe1xuICAgIHJldHVybiAkdHJpbSh0aGlzLCAxKTtcbiAgfTtcbn0sICd0cmltU3RhcnQnKTsiLCIndXNlIHN0cmljdCc7XG4vLyBodHRwczovL2dpdGh1Yi5jb20vc2VibWFya2JhZ2UvZWNtYXNjcmlwdC1zdHJpbmctbGVmdC1yaWdodC10cmltXG5yZXF1aXJlKCcuL19zdHJpbmctdHJpbScpKCd0cmltUmlnaHQnLCBmdW5jdGlvbigkdHJpbSl7XG4gIHJldHVybiBmdW5jdGlvbiB0cmltUmlnaHQoKXtcbiAgICByZXR1cm4gJHRyaW0odGhpcywgMik7XG4gIH07XG59LCAndHJpbUVuZCcpOyIsIi8vIGh0dHBzOi8vZ2l0aHViLmNvbS9samhhcmIvcHJvcG9zYWwtZ2xvYmFsXG52YXIgJGV4cG9ydCA9IHJlcXVpcmUoJy4vX2V4cG9ydCcpO1xuXG4kZXhwb3J0KCRleHBvcnQuUywgJ1N5c3RlbScsIHtnbG9iYWw6IHJlcXVpcmUoJy4vX2dsb2JhbCcpfSk7IiwidmFyICRpdGVyYXRvcnMgICAgPSByZXF1aXJlKCcuL2VzNi5hcnJheS5pdGVyYXRvcicpXG4gICwgcmVkZWZpbmUgICAgICA9IHJlcXVpcmUoJy4vX3JlZGVmaW5lJylcbiAgLCBnbG9iYWwgICAgICAgID0gcmVxdWlyZSgnLi9fZ2xvYmFsJylcbiAgLCBoaWRlICAgICAgICAgID0gcmVxdWlyZSgnLi9faGlkZScpXG4gICwgSXRlcmF0b3JzICAgICA9IHJlcXVpcmUoJy4vX2l0ZXJhdG9ycycpXG4gICwgd2tzICAgICAgICAgICA9IHJlcXVpcmUoJy4vX3drcycpXG4gICwgSVRFUkFUT1IgICAgICA9IHdrcygnaXRlcmF0b3InKVxuICAsIFRPX1NUUklOR19UQUcgPSB3a3MoJ3RvU3RyaW5nVGFnJylcbiAgLCBBcnJheVZhbHVlcyAgID0gSXRlcmF0b3JzLkFycmF5O1xuXG5mb3IodmFyIGNvbGxlY3Rpb25zID0gWydOb2RlTGlzdCcsICdET01Ub2tlbkxpc3QnLCAnTWVkaWFMaXN0JywgJ1N0eWxlU2hlZXRMaXN0JywgJ0NTU1J1bGVMaXN0J10sIGkgPSAwOyBpIDwgNTsgaSsrKXtcbiAgdmFyIE5BTUUgICAgICAgPSBjb2xsZWN0aW9uc1tpXVxuICAgICwgQ29sbGVjdGlvbiA9IGdsb2JhbFtOQU1FXVxuICAgICwgcHJvdG8gICAgICA9IENvbGxlY3Rpb24gJiYgQ29sbGVjdGlvbi5wcm90b3R5cGVcbiAgICAsIGtleTtcbiAgaWYocHJvdG8pe1xuICAgIGlmKCFwcm90b1tJVEVSQVRPUl0paGlkZShwcm90bywgSVRFUkFUT1IsIEFycmF5VmFsdWVzKTtcbiAgICBpZighcHJvdG9bVE9fU1RSSU5HX1RBR10paGlkZShwcm90bywgVE9fU1RSSU5HX1RBRywgTkFNRSk7XG4gICAgSXRlcmF0b3JzW05BTUVdID0gQXJyYXlWYWx1ZXM7XG4gICAgZm9yKGtleSBpbiAkaXRlcmF0b3JzKWlmKCFwcm90b1trZXldKXJlZGVmaW5lKHByb3RvLCBrZXksICRpdGVyYXRvcnNba2V5XSwgdHJ1ZSk7XG4gIH1cbn0iLCJ2YXIgJGV4cG9ydCA9IHJlcXVpcmUoJy4vX2V4cG9ydCcpXG4gICwgJHRhc2sgICA9IHJlcXVpcmUoJy4vX3Rhc2snKTtcbiRleHBvcnQoJGV4cG9ydC5HICsgJGV4cG9ydC5CLCB7XG4gIHNldEltbWVkaWF0ZTogICAkdGFzay5zZXQsXG4gIGNsZWFySW1tZWRpYXRlOiAkdGFzay5jbGVhclxufSk7IiwiLy8gaWU5LSBzZXRUaW1lb3V0ICYgc2V0SW50ZXJ2YWwgYWRkaXRpb25hbCBwYXJhbWV0ZXJzIGZpeFxudmFyIGdsb2JhbCAgICAgPSByZXF1aXJlKCcuL19nbG9iYWwnKVxuICAsICRleHBvcnQgICAgPSByZXF1aXJlKCcuL19leHBvcnQnKVxuICAsIGludm9rZSAgICAgPSByZXF1aXJlKCcuL19pbnZva2UnKVxuICAsIHBhcnRpYWwgICAgPSByZXF1aXJlKCcuL19wYXJ0aWFsJylcbiAgLCBuYXZpZ2F0b3IgID0gZ2xvYmFsLm5hdmlnYXRvclxuICAsIE1TSUUgICAgICAgPSAhIW5hdmlnYXRvciAmJiAvTVNJRSAuXFwuLy50ZXN0KG5hdmlnYXRvci51c2VyQWdlbnQpOyAvLyA8LSBkaXJ0eSBpZTktIGNoZWNrXG52YXIgd3JhcCA9IGZ1bmN0aW9uKHNldCl7XG4gIHJldHVybiBNU0lFID8gZnVuY3Rpb24oZm4sIHRpbWUgLyosIC4uLmFyZ3MgKi8pe1xuICAgIHJldHVybiBzZXQoaW52b2tlKFxuICAgICAgcGFydGlhbCxcbiAgICAgIFtdLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAyKSxcbiAgICAgIHR5cGVvZiBmbiA9PSAnZnVuY3Rpb24nID8gZm4gOiBGdW5jdGlvbihmbilcbiAgICApLCB0aW1lKTtcbiAgfSA6IHNldDtcbn07XG4kZXhwb3J0KCRleHBvcnQuRyArICRleHBvcnQuQiArICRleHBvcnQuRiAqIE1TSUUsIHtcbiAgc2V0VGltZW91dDogIHdyYXAoZ2xvYmFsLnNldFRpbWVvdXQpLFxuICBzZXRJbnRlcnZhbDogd3JhcChnbG9iYWwuc2V0SW50ZXJ2YWwpXG59KTsiLCJyZXF1aXJlKCcuL21vZHVsZXMvZXM2LnN5bWJvbCcpO1xucmVxdWlyZSgnLi9tb2R1bGVzL2VzNi5vYmplY3QuY3JlYXRlJyk7XG5yZXF1aXJlKCcuL21vZHVsZXMvZXM2Lm9iamVjdC5kZWZpbmUtcHJvcGVydHknKTtcbnJlcXVpcmUoJy4vbW9kdWxlcy9lczYub2JqZWN0LmRlZmluZS1wcm9wZXJ0aWVzJyk7XG5yZXF1aXJlKCcuL21vZHVsZXMvZXM2Lm9iamVjdC5nZXQtb3duLXByb3BlcnR5LWRlc2NyaXB0b3InKTtcbnJlcXVpcmUoJy4vbW9kdWxlcy9lczYub2JqZWN0LmdldC1wcm90b3R5cGUtb2YnKTtcbnJlcXVpcmUoJy4vbW9kdWxlcy9lczYub2JqZWN0LmtleXMnKTtcbnJlcXVpcmUoJy4vbW9kdWxlcy9lczYub2JqZWN0LmdldC1vd24tcHJvcGVydHktbmFtZXMnKTtcbnJlcXVpcmUoJy4vbW9kdWxlcy9lczYub2JqZWN0LmZyZWV6ZScpO1xucmVxdWlyZSgnLi9tb2R1bGVzL2VzNi5vYmplY3Quc2VhbCcpO1xucmVxdWlyZSgnLi9tb2R1bGVzL2VzNi5vYmplY3QucHJldmVudC1leHRlbnNpb25zJyk7XG5yZXF1aXJlKCcuL21vZHVsZXMvZXM2Lm9iamVjdC5pcy1mcm96ZW4nKTtcbnJlcXVpcmUoJy4vbW9kdWxlcy9lczYub2JqZWN0LmlzLXNlYWxlZCcpO1xucmVxdWlyZSgnLi9tb2R1bGVzL2VzNi5vYmplY3QuaXMtZXh0ZW5zaWJsZScpO1xucmVxdWlyZSgnLi9tb2R1bGVzL2VzNi5vYmplY3QuYXNzaWduJyk7XG5yZXF1aXJlKCcuL21vZHVsZXMvZXM2Lm9iamVjdC5pcycpO1xucmVxdWlyZSgnLi9tb2R1bGVzL2VzNi5vYmplY3Quc2V0LXByb3RvdHlwZS1vZicpO1xucmVxdWlyZSgnLi9tb2R1bGVzL2VzNi5vYmplY3QudG8tc3RyaW5nJyk7XG5yZXF1aXJlKCcuL21vZHVsZXMvZXM2LmZ1bmN0aW9uLmJpbmQnKTtcbnJlcXVpcmUoJy4vbW9kdWxlcy9lczYuZnVuY3Rpb24ubmFtZScpO1xucmVxdWlyZSgnLi9tb2R1bGVzL2VzNi5mdW5jdGlvbi5oYXMtaW5zdGFuY2UnKTtcbnJlcXVpcmUoJy4vbW9kdWxlcy9lczYucGFyc2UtaW50Jyk7XG5yZXF1aXJlKCcuL21vZHVsZXMvZXM2LnBhcnNlLWZsb2F0Jyk7XG5yZXF1aXJlKCcuL21vZHVsZXMvZXM2Lm51bWJlci5jb25zdHJ1Y3RvcicpO1xucmVxdWlyZSgnLi9tb2R1bGVzL2VzNi5udW1iZXIudG8tZml4ZWQnKTtcbnJlcXVpcmUoJy4vbW9kdWxlcy9lczYubnVtYmVyLnRvLXByZWNpc2lvbicpO1xucmVxdWlyZSgnLi9tb2R1bGVzL2VzNi5udW1iZXIuZXBzaWxvbicpO1xucmVxdWlyZSgnLi9tb2R1bGVzL2VzNi5udW1iZXIuaXMtZmluaXRlJyk7XG5yZXF1aXJlKCcuL21vZHVsZXMvZXM2Lm51bWJlci5pcy1pbnRlZ2VyJyk7XG5yZXF1aXJlKCcuL21vZHVsZXMvZXM2Lm51bWJlci5pcy1uYW4nKTtcbnJlcXVpcmUoJy4vbW9kdWxlcy9lczYubnVtYmVyLmlzLXNhZmUtaW50ZWdlcicpO1xucmVxdWlyZSgnLi9tb2R1bGVzL2VzNi5udW1iZXIubWF4LXNhZmUtaW50ZWdlcicpO1xucmVxdWlyZSgnLi9tb2R1bGVzL2VzNi5udW1iZXIubWluLXNhZmUtaW50ZWdlcicpO1xucmVxdWlyZSgnLi9tb2R1bGVzL2VzNi5udW1iZXIucGFyc2UtZmxvYXQnKTtcbnJlcXVpcmUoJy4vbW9kdWxlcy9lczYubnVtYmVyLnBhcnNlLWludCcpO1xucmVxdWlyZSgnLi9tb2R1bGVzL2VzNi5tYXRoLmFjb3NoJyk7XG5yZXF1aXJlKCcuL21vZHVsZXMvZXM2Lm1hdGguYXNpbmgnKTtcbnJlcXVpcmUoJy4vbW9kdWxlcy9lczYubWF0aC5hdGFuaCcpO1xucmVxdWlyZSgnLi9tb2R1bGVzL2VzNi5tYXRoLmNicnQnKTtcbnJlcXVpcmUoJy4vbW9kdWxlcy9lczYubWF0aC5jbHozMicpO1xucmVxdWlyZSgnLi9tb2R1bGVzL2VzNi5tYXRoLmNvc2gnKTtcbnJlcXVpcmUoJy4vbW9kdWxlcy9lczYubWF0aC5leHBtMScpO1xucmVxdWlyZSgnLi9tb2R1bGVzL2VzNi5tYXRoLmZyb3VuZCcpO1xucmVxdWlyZSgnLi9tb2R1bGVzL2VzNi5tYXRoLmh5cG90Jyk7XG5yZXF1aXJlKCcuL21vZHVsZXMvZXM2Lm1hdGguaW11bCcpO1xucmVxdWlyZSgnLi9tb2R1bGVzL2VzNi5tYXRoLmxvZzEwJyk7XG5yZXF1aXJlKCcuL21vZHVsZXMvZXM2Lm1hdGgubG9nMXAnKTtcbnJlcXVpcmUoJy4vbW9kdWxlcy9lczYubWF0aC5sb2cyJyk7XG5yZXF1aXJlKCcuL21vZHVsZXMvZXM2Lm1hdGguc2lnbicpO1xucmVxdWlyZSgnLi9tb2R1bGVzL2VzNi5tYXRoLnNpbmgnKTtcbnJlcXVpcmUoJy4vbW9kdWxlcy9lczYubWF0aC50YW5oJyk7XG5yZXF1aXJlKCcuL21vZHVsZXMvZXM2Lm1hdGgudHJ1bmMnKTtcbnJlcXVpcmUoJy4vbW9kdWxlcy9lczYuc3RyaW5nLmZyb20tY29kZS1wb2ludCcpO1xucmVxdWlyZSgnLi9tb2R1bGVzL2VzNi5zdHJpbmcucmF3Jyk7XG5yZXF1aXJlKCcuL21vZHVsZXMvZXM2LnN0cmluZy50cmltJyk7XG5yZXF1aXJlKCcuL21vZHVsZXMvZXM2LnN0cmluZy5pdGVyYXRvcicpO1xucmVxdWlyZSgnLi9tb2R1bGVzL2VzNi5zdHJpbmcuY29kZS1wb2ludC1hdCcpO1xucmVxdWlyZSgnLi9tb2R1bGVzL2VzNi5zdHJpbmcuZW5kcy13aXRoJyk7XG5yZXF1aXJlKCcuL21vZHVsZXMvZXM2LnN0cmluZy5pbmNsdWRlcycpO1xucmVxdWlyZSgnLi9tb2R1bGVzL2VzNi5zdHJpbmcucmVwZWF0Jyk7XG5yZXF1aXJlKCcuL21vZHVsZXMvZXM2LnN0cmluZy5zdGFydHMtd2l0aCcpO1xucmVxdWlyZSgnLi9tb2R1bGVzL2VzNi5zdHJpbmcuYW5jaG9yJyk7XG5yZXF1aXJlKCcuL21vZHVsZXMvZXM2LnN0cmluZy5iaWcnKTtcbnJlcXVpcmUoJy4vbW9kdWxlcy9lczYuc3RyaW5nLmJsaW5rJyk7XG5yZXF1aXJlKCcuL21vZHVsZXMvZXM2LnN0cmluZy5ib2xkJyk7XG5yZXF1aXJlKCcuL21vZHVsZXMvZXM2LnN0cmluZy5maXhlZCcpO1xucmVxdWlyZSgnLi9tb2R1bGVzL2VzNi5zdHJpbmcuZm9udGNvbG9yJyk7XG5yZXF1aXJlKCcuL21vZHVsZXMvZXM2LnN0cmluZy5mb250c2l6ZScpO1xucmVxdWlyZSgnLi9tb2R1bGVzL2VzNi5zdHJpbmcuaXRhbGljcycpO1xucmVxdWlyZSgnLi9tb2R1bGVzL2VzNi5zdHJpbmcubGluaycpO1xucmVxdWlyZSgnLi9tb2R1bGVzL2VzNi5zdHJpbmcuc21hbGwnKTtcbnJlcXVpcmUoJy4vbW9kdWxlcy9lczYuc3RyaW5nLnN0cmlrZScpO1xucmVxdWlyZSgnLi9tb2R1bGVzL2VzNi5zdHJpbmcuc3ViJyk7XG5yZXF1aXJlKCcuL21vZHVsZXMvZXM2LnN0cmluZy5zdXAnKTtcbnJlcXVpcmUoJy4vbW9kdWxlcy9lczYuZGF0ZS5ub3cnKTtcbnJlcXVpcmUoJy4vbW9kdWxlcy9lczYuZGF0ZS50by1qc29uJyk7XG5yZXF1aXJlKCcuL21vZHVsZXMvZXM2LmRhdGUudG8taXNvLXN0cmluZycpO1xucmVxdWlyZSgnLi9tb2R1bGVzL2VzNi5kYXRlLnRvLXN0cmluZycpO1xucmVxdWlyZSgnLi9tb2R1bGVzL2VzNi5kYXRlLnRvLXByaW1pdGl2ZScpO1xucmVxdWlyZSgnLi9tb2R1bGVzL2VzNi5hcnJheS5pcy1hcnJheScpO1xucmVxdWlyZSgnLi9tb2R1bGVzL2VzNi5hcnJheS5mcm9tJyk7XG5yZXF1aXJlKCcuL21vZHVsZXMvZXM2LmFycmF5Lm9mJyk7XG5yZXF1aXJlKCcuL21vZHVsZXMvZXM2LmFycmF5LmpvaW4nKTtcbnJlcXVpcmUoJy4vbW9kdWxlcy9lczYuYXJyYXkuc2xpY2UnKTtcbnJlcXVpcmUoJy4vbW9kdWxlcy9lczYuYXJyYXkuc29ydCcpO1xucmVxdWlyZSgnLi9tb2R1bGVzL2VzNi5hcnJheS5mb3ItZWFjaCcpO1xucmVxdWlyZSgnLi9tb2R1bGVzL2VzNi5hcnJheS5tYXAnKTtcbnJlcXVpcmUoJy4vbW9kdWxlcy9lczYuYXJyYXkuZmlsdGVyJyk7XG5yZXF1aXJlKCcuL21vZHVsZXMvZXM2LmFycmF5LnNvbWUnKTtcbnJlcXVpcmUoJy4vbW9kdWxlcy9lczYuYXJyYXkuZXZlcnknKTtcbnJlcXVpcmUoJy4vbW9kdWxlcy9lczYuYXJyYXkucmVkdWNlJyk7XG5yZXF1aXJlKCcuL21vZHVsZXMvZXM2LmFycmF5LnJlZHVjZS1yaWdodCcpO1xucmVxdWlyZSgnLi9tb2R1bGVzL2VzNi5hcnJheS5pbmRleC1vZicpO1xucmVxdWlyZSgnLi9tb2R1bGVzL2VzNi5hcnJheS5sYXN0LWluZGV4LW9mJyk7XG5yZXF1aXJlKCcuL21vZHVsZXMvZXM2LmFycmF5LmNvcHktd2l0aGluJyk7XG5yZXF1aXJlKCcuL21vZHVsZXMvZXM2LmFycmF5LmZpbGwnKTtcbnJlcXVpcmUoJy4vbW9kdWxlcy9lczYuYXJyYXkuZmluZCcpO1xucmVxdWlyZSgnLi9tb2R1bGVzL2VzNi5hcnJheS5maW5kLWluZGV4Jyk7XG5yZXF1aXJlKCcuL21vZHVsZXMvZXM2LmFycmF5LnNwZWNpZXMnKTtcbnJlcXVpcmUoJy4vbW9kdWxlcy9lczYuYXJyYXkuaXRlcmF0b3InKTtcbnJlcXVpcmUoJy4vbW9kdWxlcy9lczYucmVnZXhwLmNvbnN0cnVjdG9yJyk7XG5yZXF1aXJlKCcuL21vZHVsZXMvZXM2LnJlZ2V4cC50by1zdHJpbmcnKTtcbnJlcXVpcmUoJy4vbW9kdWxlcy9lczYucmVnZXhwLmZsYWdzJyk7XG5yZXF1aXJlKCcuL21vZHVsZXMvZXM2LnJlZ2V4cC5tYXRjaCcpO1xucmVxdWlyZSgnLi9tb2R1bGVzL2VzNi5yZWdleHAucmVwbGFjZScpO1xucmVxdWlyZSgnLi9tb2R1bGVzL2VzNi5yZWdleHAuc2VhcmNoJyk7XG5yZXF1aXJlKCcuL21vZHVsZXMvZXM2LnJlZ2V4cC5zcGxpdCcpO1xucmVxdWlyZSgnLi9tb2R1bGVzL2VzNi5wcm9taXNlJyk7XG5yZXF1aXJlKCcuL21vZHVsZXMvZXM2Lm1hcCcpO1xucmVxdWlyZSgnLi9tb2R1bGVzL2VzNi5zZXQnKTtcbnJlcXVpcmUoJy4vbW9kdWxlcy9lczYud2Vhay1tYXAnKTtcbnJlcXVpcmUoJy4vbW9kdWxlcy9lczYud2Vhay1zZXQnKTtcbnJlcXVpcmUoJy4vbW9kdWxlcy9lczYudHlwZWQuYXJyYXktYnVmZmVyJyk7XG5yZXF1aXJlKCcuL21vZHVsZXMvZXM2LnR5cGVkLmRhdGEtdmlldycpO1xucmVxdWlyZSgnLi9tb2R1bGVzL2VzNi50eXBlZC5pbnQ4LWFycmF5Jyk7XG5yZXF1aXJlKCcuL21vZHVsZXMvZXM2LnR5cGVkLnVpbnQ4LWFycmF5Jyk7XG5yZXF1aXJlKCcuL21vZHVsZXMvZXM2LnR5cGVkLnVpbnQ4LWNsYW1wZWQtYXJyYXknKTtcbnJlcXVpcmUoJy4vbW9kdWxlcy9lczYudHlwZWQuaW50MTYtYXJyYXknKTtcbnJlcXVpcmUoJy4vbW9kdWxlcy9lczYudHlwZWQudWludDE2LWFycmF5Jyk7XG5yZXF1aXJlKCcuL21vZHVsZXMvZXM2LnR5cGVkLmludDMyLWFycmF5Jyk7XG5yZXF1aXJlKCcuL21vZHVsZXMvZXM2LnR5cGVkLnVpbnQzMi1hcnJheScpO1xucmVxdWlyZSgnLi9tb2R1bGVzL2VzNi50eXBlZC5mbG9hdDMyLWFycmF5Jyk7XG5yZXF1aXJlKCcuL21vZHVsZXMvZXM2LnR5cGVkLmZsb2F0NjQtYXJyYXknKTtcbnJlcXVpcmUoJy4vbW9kdWxlcy9lczYucmVmbGVjdC5hcHBseScpO1xucmVxdWlyZSgnLi9tb2R1bGVzL2VzNi5yZWZsZWN0LmNvbnN0cnVjdCcpO1xucmVxdWlyZSgnLi9tb2R1bGVzL2VzNi5yZWZsZWN0LmRlZmluZS1wcm9wZXJ0eScpO1xucmVxdWlyZSgnLi9tb2R1bGVzL2VzNi5yZWZsZWN0LmRlbGV0ZS1wcm9wZXJ0eScpO1xucmVxdWlyZSgnLi9tb2R1bGVzL2VzNi5yZWZsZWN0LmVudW1lcmF0ZScpO1xucmVxdWlyZSgnLi9tb2R1bGVzL2VzNi5yZWZsZWN0LmdldCcpO1xucmVxdWlyZSgnLi9tb2R1bGVzL2VzNi5yZWZsZWN0LmdldC1vd24tcHJvcGVydHktZGVzY3JpcHRvcicpO1xucmVxdWlyZSgnLi9tb2R1bGVzL2VzNi5yZWZsZWN0LmdldC1wcm90b3R5cGUtb2YnKTtcbnJlcXVpcmUoJy4vbW9kdWxlcy9lczYucmVmbGVjdC5oYXMnKTtcbnJlcXVpcmUoJy4vbW9kdWxlcy9lczYucmVmbGVjdC5pcy1leHRlbnNpYmxlJyk7XG5yZXF1aXJlKCcuL21vZHVsZXMvZXM2LnJlZmxlY3Qub3duLWtleXMnKTtcbnJlcXVpcmUoJy4vbW9kdWxlcy9lczYucmVmbGVjdC5wcmV2ZW50LWV4dGVuc2lvbnMnKTtcbnJlcXVpcmUoJy4vbW9kdWxlcy9lczYucmVmbGVjdC5zZXQnKTtcbnJlcXVpcmUoJy4vbW9kdWxlcy9lczYucmVmbGVjdC5zZXQtcHJvdG90eXBlLW9mJyk7XG5yZXF1aXJlKCcuL21vZHVsZXMvZXM3LmFycmF5LmluY2x1ZGVzJyk7XG5yZXF1aXJlKCcuL21vZHVsZXMvZXM3LnN0cmluZy5hdCcpO1xucmVxdWlyZSgnLi9tb2R1bGVzL2VzNy5zdHJpbmcucGFkLXN0YXJ0Jyk7XG5yZXF1aXJlKCcuL21vZHVsZXMvZXM3LnN0cmluZy5wYWQtZW5kJyk7XG5yZXF1aXJlKCcuL21vZHVsZXMvZXM3LnN0cmluZy50cmltLWxlZnQnKTtcbnJlcXVpcmUoJy4vbW9kdWxlcy9lczcuc3RyaW5nLnRyaW0tcmlnaHQnKTtcbnJlcXVpcmUoJy4vbW9kdWxlcy9lczcuc3RyaW5nLm1hdGNoLWFsbCcpO1xucmVxdWlyZSgnLi9tb2R1bGVzL2VzNy5vYmplY3QuZ2V0LW93bi1wcm9wZXJ0eS1kZXNjcmlwdG9ycycpO1xucmVxdWlyZSgnLi9tb2R1bGVzL2VzNy5vYmplY3QudmFsdWVzJyk7XG5yZXF1aXJlKCcuL21vZHVsZXMvZXM3Lm9iamVjdC5lbnRyaWVzJyk7XG5yZXF1aXJlKCcuL21vZHVsZXMvZXM3Lm9iamVjdC5kZWZpbmUtZ2V0dGVyJyk7XG5yZXF1aXJlKCcuL21vZHVsZXMvZXM3Lm9iamVjdC5kZWZpbmUtc2V0dGVyJyk7XG5yZXF1aXJlKCcuL21vZHVsZXMvZXM3Lm9iamVjdC5sb29rdXAtZ2V0dGVyJyk7XG5yZXF1aXJlKCcuL21vZHVsZXMvZXM3Lm9iamVjdC5sb29rdXAtc2V0dGVyJyk7XG5yZXF1aXJlKCcuL21vZHVsZXMvZXM3Lm1hcC50by1qc29uJyk7XG5yZXF1aXJlKCcuL21vZHVsZXMvZXM3LnNldC50by1qc29uJyk7XG5yZXF1aXJlKCcuL21vZHVsZXMvZXM3LnN5c3RlbS5nbG9iYWwnKTtcbnJlcXVpcmUoJy4vbW9kdWxlcy9lczcuZXJyb3IuaXMtZXJyb3InKTtcbnJlcXVpcmUoJy4vbW9kdWxlcy9lczcubWF0aC5pYWRkaCcpO1xucmVxdWlyZSgnLi9tb2R1bGVzL2VzNy5tYXRoLmlzdWJoJyk7XG5yZXF1aXJlKCcuL21vZHVsZXMvZXM3Lm1hdGguaW11bGgnKTtcbnJlcXVpcmUoJy4vbW9kdWxlcy9lczcubWF0aC51bXVsaCcpO1xucmVxdWlyZSgnLi9tb2R1bGVzL2VzNy5yZWZsZWN0LmRlZmluZS1tZXRhZGF0YScpO1xucmVxdWlyZSgnLi9tb2R1bGVzL2VzNy5yZWZsZWN0LmRlbGV0ZS1tZXRhZGF0YScpO1xucmVxdWlyZSgnLi9tb2R1bGVzL2VzNy5yZWZsZWN0LmdldC1tZXRhZGF0YScpO1xucmVxdWlyZSgnLi9tb2R1bGVzL2VzNy5yZWZsZWN0LmdldC1tZXRhZGF0YS1rZXlzJyk7XG5yZXF1aXJlKCcuL21vZHVsZXMvZXM3LnJlZmxlY3QuZ2V0LW93bi1tZXRhZGF0YScpO1xucmVxdWlyZSgnLi9tb2R1bGVzL2VzNy5yZWZsZWN0LmdldC1vd24tbWV0YWRhdGEta2V5cycpO1xucmVxdWlyZSgnLi9tb2R1bGVzL2VzNy5yZWZsZWN0Lmhhcy1tZXRhZGF0YScpO1xucmVxdWlyZSgnLi9tb2R1bGVzL2VzNy5yZWZsZWN0Lmhhcy1vd24tbWV0YWRhdGEnKTtcbnJlcXVpcmUoJy4vbW9kdWxlcy9lczcucmVmbGVjdC5tZXRhZGF0YScpO1xucmVxdWlyZSgnLi9tb2R1bGVzL3dlYi50aW1lcnMnKTtcbnJlcXVpcmUoJy4vbW9kdWxlcy93ZWIuaW1tZWRpYXRlJyk7XG5yZXF1aXJlKCcuL21vZHVsZXMvd2ViLmRvbS5pdGVyYWJsZScpO1xubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL21vZHVsZXMvX2NvcmUnKTsiLCIvKipcbiAqIENvcHlyaWdodCAoYykgMjAxNCwgRmFjZWJvb2ssIEluYy5cbiAqIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgQlNELXN0eWxlIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBodHRwczovL3Jhdy5naXRodWIuY29tL2ZhY2Vib29rL3JlZ2VuZXJhdG9yL21hc3Rlci9MSUNFTlNFIGZpbGUuIEFuXG4gKiBhZGRpdGlvbmFsIGdyYW50IG9mIHBhdGVudCByaWdodHMgY2FuIGJlIGZvdW5kIGluIHRoZSBQQVRFTlRTIGZpbGUgaW5cbiAqIHRoZSBzYW1lIGRpcmVjdG9yeS5cbiAqL1xuXG4hKGZ1bmN0aW9uKGdsb2JhbCkge1xuICBcInVzZSBzdHJpY3RcIjtcblxuICB2YXIgaGFzT3duID0gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eTtcbiAgdmFyIHVuZGVmaW5lZDsgLy8gTW9yZSBjb21wcmVzc2libGUgdGhhbiB2b2lkIDAuXG4gIHZhciBpdGVyYXRvclN5bWJvbCA9XG4gICAgdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIFN5bWJvbC5pdGVyYXRvciB8fCBcIkBAaXRlcmF0b3JcIjtcblxuICB2YXIgaW5Nb2R1bGUgPSB0eXBlb2YgbW9kdWxlID09PSBcIm9iamVjdFwiO1xuICB2YXIgcnVudGltZSA9IGdsb2JhbC5yZWdlbmVyYXRvclJ1bnRpbWU7XG4gIGlmIChydW50aW1lKSB7XG4gICAgaWYgKGluTW9kdWxlKSB7XG4gICAgICAvLyBJZiByZWdlbmVyYXRvclJ1bnRpbWUgaXMgZGVmaW5lZCBnbG9iYWxseSBhbmQgd2UncmUgaW4gYSBtb2R1bGUsXG4gICAgICAvLyBtYWtlIHRoZSBleHBvcnRzIG9iamVjdCBpZGVudGljYWwgdG8gcmVnZW5lcmF0b3JSdW50aW1lLlxuICAgICAgbW9kdWxlLmV4cG9ydHMgPSBydW50aW1lO1xuICAgIH1cbiAgICAvLyBEb24ndCBib3RoZXIgZXZhbHVhdGluZyB0aGUgcmVzdCBvZiB0aGlzIGZpbGUgaWYgdGhlIHJ1bnRpbWUgd2FzXG4gICAgLy8gYWxyZWFkeSBkZWZpbmVkIGdsb2JhbGx5LlxuICAgIHJldHVybjtcbiAgfVxuXG4gIC8vIERlZmluZSB0aGUgcnVudGltZSBnbG9iYWxseSAoYXMgZXhwZWN0ZWQgYnkgZ2VuZXJhdGVkIGNvZGUpIGFzIGVpdGhlclxuICAvLyBtb2R1bGUuZXhwb3J0cyAoaWYgd2UncmUgaW4gYSBtb2R1bGUpIG9yIGEgbmV3LCBlbXB0eSBvYmplY3QuXG4gIHJ1bnRpbWUgPSBnbG9iYWwucmVnZW5lcmF0b3JSdW50aW1lID0gaW5Nb2R1bGUgPyBtb2R1bGUuZXhwb3J0cyA6IHt9O1xuXG4gIGZ1bmN0aW9uIHdyYXAoaW5uZXJGbiwgb3V0ZXJGbiwgc2VsZiwgdHJ5TG9jc0xpc3QpIHtcbiAgICAvLyBJZiBvdXRlckZuIHByb3ZpZGVkLCB0aGVuIG91dGVyRm4ucHJvdG90eXBlIGluc3RhbmNlb2YgR2VuZXJhdG9yLlxuICAgIHZhciBnZW5lcmF0b3IgPSBPYmplY3QuY3JlYXRlKChvdXRlckZuIHx8IEdlbmVyYXRvcikucHJvdG90eXBlKTtcbiAgICB2YXIgY29udGV4dCA9IG5ldyBDb250ZXh0KHRyeUxvY3NMaXN0IHx8IFtdKTtcblxuICAgIC8vIFRoZSAuX2ludm9rZSBtZXRob2QgdW5pZmllcyB0aGUgaW1wbGVtZW50YXRpb25zIG9mIHRoZSAubmV4dCxcbiAgICAvLyAudGhyb3csIGFuZCAucmV0dXJuIG1ldGhvZHMuXG4gICAgZ2VuZXJhdG9yLl9pbnZva2UgPSBtYWtlSW52b2tlTWV0aG9kKGlubmVyRm4sIHNlbGYsIGNvbnRleHQpO1xuXG4gICAgcmV0dXJuIGdlbmVyYXRvcjtcbiAgfVxuICBydW50aW1lLndyYXAgPSB3cmFwO1xuXG4gIC8vIFRyeS9jYXRjaCBoZWxwZXIgdG8gbWluaW1pemUgZGVvcHRpbWl6YXRpb25zLiBSZXR1cm5zIGEgY29tcGxldGlvblxuICAvLyByZWNvcmQgbGlrZSBjb250ZXh0LnRyeUVudHJpZXNbaV0uY29tcGxldGlvbi4gVGhpcyBpbnRlcmZhY2UgY291bGRcbiAgLy8gaGF2ZSBiZWVuIChhbmQgd2FzIHByZXZpb3VzbHkpIGRlc2lnbmVkIHRvIHRha2UgYSBjbG9zdXJlIHRvIGJlXG4gIC8vIGludm9rZWQgd2l0aG91dCBhcmd1bWVudHMsIGJ1dCBpbiBhbGwgdGhlIGNhc2VzIHdlIGNhcmUgYWJvdXQgd2VcbiAgLy8gYWxyZWFkeSBoYXZlIGFuIGV4aXN0aW5nIG1ldGhvZCB3ZSB3YW50IHRvIGNhbGwsIHNvIHRoZXJlJ3Mgbm8gbmVlZFxuICAvLyB0byBjcmVhdGUgYSBuZXcgZnVuY3Rpb24gb2JqZWN0LiBXZSBjYW4gZXZlbiBnZXQgYXdheSB3aXRoIGFzc3VtaW5nXG4gIC8vIHRoZSBtZXRob2QgdGFrZXMgZXhhY3RseSBvbmUgYXJndW1lbnQsIHNpbmNlIHRoYXQgaGFwcGVucyB0byBiZSB0cnVlXG4gIC8vIGluIGV2ZXJ5IGNhc2UsIHNvIHdlIGRvbid0IGhhdmUgdG8gdG91Y2ggdGhlIGFyZ3VtZW50cyBvYmplY3QuIFRoZVxuICAvLyBvbmx5IGFkZGl0aW9uYWwgYWxsb2NhdGlvbiByZXF1aXJlZCBpcyB0aGUgY29tcGxldGlvbiByZWNvcmQsIHdoaWNoXG4gIC8vIGhhcyBhIHN0YWJsZSBzaGFwZSBhbmQgc28gaG9wZWZ1bGx5IHNob3VsZCBiZSBjaGVhcCB0byBhbGxvY2F0ZS5cbiAgZnVuY3Rpb24gdHJ5Q2F0Y2goZm4sIG9iaiwgYXJnKSB7XG4gICAgdHJ5IHtcbiAgICAgIHJldHVybiB7IHR5cGU6IFwibm9ybWFsXCIsIGFyZzogZm4uY2FsbChvYmosIGFyZykgfTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIHJldHVybiB7IHR5cGU6IFwidGhyb3dcIiwgYXJnOiBlcnIgfTtcbiAgICB9XG4gIH1cblxuICB2YXIgR2VuU3RhdGVTdXNwZW5kZWRTdGFydCA9IFwic3VzcGVuZGVkU3RhcnRcIjtcbiAgdmFyIEdlblN0YXRlU3VzcGVuZGVkWWllbGQgPSBcInN1c3BlbmRlZFlpZWxkXCI7XG4gIHZhciBHZW5TdGF0ZUV4ZWN1dGluZyA9IFwiZXhlY3V0aW5nXCI7XG4gIHZhciBHZW5TdGF0ZUNvbXBsZXRlZCA9IFwiY29tcGxldGVkXCI7XG5cbiAgLy8gUmV0dXJuaW5nIHRoaXMgb2JqZWN0IGZyb20gdGhlIGlubmVyRm4gaGFzIHRoZSBzYW1lIGVmZmVjdCBhc1xuICAvLyBicmVha2luZyBvdXQgb2YgdGhlIGRpc3BhdGNoIHN3aXRjaCBzdGF0ZW1lbnQuXG4gIHZhciBDb250aW51ZVNlbnRpbmVsID0ge307XG5cbiAgLy8gRHVtbXkgY29uc3RydWN0b3IgZnVuY3Rpb25zIHRoYXQgd2UgdXNlIGFzIHRoZSAuY29uc3RydWN0b3IgYW5kXG4gIC8vIC5jb25zdHJ1Y3Rvci5wcm90b3R5cGUgcHJvcGVydGllcyBmb3IgZnVuY3Rpb25zIHRoYXQgcmV0dXJuIEdlbmVyYXRvclxuICAvLyBvYmplY3RzLiBGb3IgZnVsbCBzcGVjIGNvbXBsaWFuY2UsIHlvdSBtYXkgd2lzaCB0byBjb25maWd1cmUgeW91clxuICAvLyBtaW5pZmllciBub3QgdG8gbWFuZ2xlIHRoZSBuYW1lcyBvZiB0aGVzZSB0d28gZnVuY3Rpb25zLlxuICBmdW5jdGlvbiBHZW5lcmF0b3IoKSB7fVxuICBmdW5jdGlvbiBHZW5lcmF0b3JGdW5jdGlvbigpIHt9XG4gIGZ1bmN0aW9uIEdlbmVyYXRvckZ1bmN0aW9uUHJvdG90eXBlKCkge31cblxuICB2YXIgR3AgPSBHZW5lcmF0b3JGdW5jdGlvblByb3RvdHlwZS5wcm90b3R5cGUgPSBHZW5lcmF0b3IucHJvdG90eXBlO1xuICBHZW5lcmF0b3JGdW5jdGlvbi5wcm90b3R5cGUgPSBHcC5jb25zdHJ1Y3RvciA9IEdlbmVyYXRvckZ1bmN0aW9uUHJvdG90eXBlO1xuICBHZW5lcmF0b3JGdW5jdGlvblByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IEdlbmVyYXRvckZ1bmN0aW9uO1xuICBHZW5lcmF0b3JGdW5jdGlvbi5kaXNwbGF5TmFtZSA9IFwiR2VuZXJhdG9yRnVuY3Rpb25cIjtcblxuICAvLyBIZWxwZXIgZm9yIGRlZmluaW5nIHRoZSAubmV4dCwgLnRocm93LCBhbmQgLnJldHVybiBtZXRob2RzIG9mIHRoZVxuICAvLyBJdGVyYXRvciBpbnRlcmZhY2UgaW4gdGVybXMgb2YgYSBzaW5nbGUgLl9pbnZva2UgbWV0aG9kLlxuICBmdW5jdGlvbiBkZWZpbmVJdGVyYXRvck1ldGhvZHMocHJvdG90eXBlKSB7XG4gICAgW1wibmV4dFwiLCBcInRocm93XCIsIFwicmV0dXJuXCJdLmZvckVhY2goZnVuY3Rpb24obWV0aG9kKSB7XG4gICAgICBwcm90b3R5cGVbbWV0aG9kXSA9IGZ1bmN0aW9uKGFyZykge1xuICAgICAgICByZXR1cm4gdGhpcy5faW52b2tlKG1ldGhvZCwgYXJnKTtcbiAgICAgIH07XG4gICAgfSk7XG4gIH1cblxuICBydW50aW1lLmlzR2VuZXJhdG9yRnVuY3Rpb24gPSBmdW5jdGlvbihnZW5GdW4pIHtcbiAgICB2YXIgY3RvciA9IHR5cGVvZiBnZW5GdW4gPT09IFwiZnVuY3Rpb25cIiAmJiBnZW5GdW4uY29uc3RydWN0b3I7XG4gICAgcmV0dXJuIGN0b3JcbiAgICAgID8gY3RvciA9PT0gR2VuZXJhdG9yRnVuY3Rpb24gfHxcbiAgICAgICAgLy8gRm9yIHRoZSBuYXRpdmUgR2VuZXJhdG9yRnVuY3Rpb24gY29uc3RydWN0b3IsIHRoZSBiZXN0IHdlIGNhblxuICAgICAgICAvLyBkbyBpcyB0byBjaGVjayBpdHMgLm5hbWUgcHJvcGVydHkuXG4gICAgICAgIChjdG9yLmRpc3BsYXlOYW1lIHx8IGN0b3IubmFtZSkgPT09IFwiR2VuZXJhdG9yRnVuY3Rpb25cIlxuICAgICAgOiBmYWxzZTtcbiAgfTtcblxuICBydW50aW1lLm1hcmsgPSBmdW5jdGlvbihnZW5GdW4pIHtcbiAgICBpZiAoT2JqZWN0LnNldFByb3RvdHlwZU9mKSB7XG4gICAgICBPYmplY3Quc2V0UHJvdG90eXBlT2YoZ2VuRnVuLCBHZW5lcmF0b3JGdW5jdGlvblByb3RvdHlwZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGdlbkZ1bi5fX3Byb3RvX18gPSBHZW5lcmF0b3JGdW5jdGlvblByb3RvdHlwZTtcbiAgICB9XG4gICAgZ2VuRnVuLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoR3ApO1xuICAgIHJldHVybiBnZW5GdW47XG4gIH07XG5cbiAgLy8gV2l0aGluIHRoZSBib2R5IG9mIGFueSBhc3luYyBmdW5jdGlvbiwgYGF3YWl0IHhgIGlzIHRyYW5zZm9ybWVkIHRvXG4gIC8vIGB5aWVsZCByZWdlbmVyYXRvclJ1bnRpbWUuYXdyYXAoeClgLCBzbyB0aGF0IHRoZSBydW50aW1lIGNhbiB0ZXN0XG4gIC8vIGB2YWx1ZSBpbnN0YW5jZW9mIEF3YWl0QXJndW1lbnRgIHRvIGRldGVybWluZSBpZiB0aGUgeWllbGRlZCB2YWx1ZSBpc1xuICAvLyBtZWFudCB0byBiZSBhd2FpdGVkLiBTb21lIG1heSBjb25zaWRlciB0aGUgbmFtZSBvZiB0aGlzIG1ldGhvZCB0b29cbiAgLy8gY3V0ZXN5LCBidXQgdGhleSBhcmUgY3VybXVkZ2VvbnMuXG4gIHJ1bnRpbWUuYXdyYXAgPSBmdW5jdGlvbihhcmcpIHtcbiAgICByZXR1cm4gbmV3IEF3YWl0QXJndW1lbnQoYXJnKTtcbiAgfTtcblxuICBmdW5jdGlvbiBBd2FpdEFyZ3VtZW50KGFyZykge1xuICAgIHRoaXMuYXJnID0gYXJnO1xuICB9XG5cbiAgZnVuY3Rpb24gQXN5bmNJdGVyYXRvcihnZW5lcmF0b3IpIHtcbiAgICAvLyBUaGlzIGludm9rZSBmdW5jdGlvbiBpcyB3cml0dGVuIGluIGEgc3R5bGUgdGhhdCBhc3N1bWVzIHNvbWVcbiAgICAvLyBjYWxsaW5nIGZ1bmN0aW9uIChvciBQcm9taXNlKSB3aWxsIGhhbmRsZSBleGNlcHRpb25zLlxuICAgIGZ1bmN0aW9uIGludm9rZShtZXRob2QsIGFyZykge1xuICAgICAgdmFyIHJlc3VsdCA9IGdlbmVyYXRvclttZXRob2RdKGFyZyk7XG4gICAgICB2YXIgdmFsdWUgPSByZXN1bHQudmFsdWU7XG4gICAgICByZXR1cm4gdmFsdWUgaW5zdGFuY2VvZiBBd2FpdEFyZ3VtZW50XG4gICAgICAgID8gUHJvbWlzZS5yZXNvbHZlKHZhbHVlLmFyZykudGhlbihpbnZva2VOZXh0LCBpbnZva2VUaHJvdylcbiAgICAgICAgOiBQcm9taXNlLnJlc29sdmUodmFsdWUpLnRoZW4oZnVuY3Rpb24odW53cmFwcGVkKSB7XG4gICAgICAgICAgICAvLyBXaGVuIGEgeWllbGRlZCBQcm9taXNlIGlzIHJlc29sdmVkLCBpdHMgZmluYWwgdmFsdWUgYmVjb21lc1xuICAgICAgICAgICAgLy8gdGhlIC52YWx1ZSBvZiB0aGUgUHJvbWlzZTx7dmFsdWUsZG9uZX0+IHJlc3VsdCBmb3IgdGhlXG4gICAgICAgICAgICAvLyBjdXJyZW50IGl0ZXJhdGlvbi4gSWYgdGhlIFByb21pc2UgaXMgcmVqZWN0ZWQsIGhvd2V2ZXIsIHRoZVxuICAgICAgICAgICAgLy8gcmVzdWx0IGZvciB0aGlzIGl0ZXJhdGlvbiB3aWxsIGJlIHJlamVjdGVkIHdpdGggdGhlIHNhbWVcbiAgICAgICAgICAgIC8vIHJlYXNvbi4gTm90ZSB0aGF0IHJlamVjdGlvbnMgb2YgeWllbGRlZCBQcm9taXNlcyBhcmUgbm90XG4gICAgICAgICAgICAvLyB0aHJvd24gYmFjayBpbnRvIHRoZSBnZW5lcmF0b3IgZnVuY3Rpb24sIGFzIGlzIHRoZSBjYXNlXG4gICAgICAgICAgICAvLyB3aGVuIGFuIGF3YWl0ZWQgUHJvbWlzZSBpcyByZWplY3RlZC4gVGhpcyBkaWZmZXJlbmNlIGluXG4gICAgICAgICAgICAvLyBiZWhhdmlvciBiZXR3ZWVuIHlpZWxkIGFuZCBhd2FpdCBpcyBpbXBvcnRhbnQsIGJlY2F1c2UgaXRcbiAgICAgICAgICAgIC8vIGFsbG93cyB0aGUgY29uc3VtZXIgdG8gZGVjaWRlIHdoYXQgdG8gZG8gd2l0aCB0aGUgeWllbGRlZFxuICAgICAgICAgICAgLy8gcmVqZWN0aW9uIChzd2FsbG93IGl0IGFuZCBjb250aW51ZSwgbWFudWFsbHkgLnRocm93IGl0IGJhY2tcbiAgICAgICAgICAgIC8vIGludG8gdGhlIGdlbmVyYXRvciwgYWJhbmRvbiBpdGVyYXRpb24sIHdoYXRldmVyKS4gV2l0aFxuICAgICAgICAgICAgLy8gYXdhaXQsIGJ5IGNvbnRyYXN0LCB0aGVyZSBpcyBubyBvcHBvcnR1bml0eSB0byBleGFtaW5lIHRoZVxuICAgICAgICAgICAgLy8gcmVqZWN0aW9uIHJlYXNvbiBvdXRzaWRlIHRoZSBnZW5lcmF0b3IgZnVuY3Rpb24sIHNvIHRoZVxuICAgICAgICAgICAgLy8gb25seSBvcHRpb24gaXMgdG8gdGhyb3cgaXQgZnJvbSB0aGUgYXdhaXQgZXhwcmVzc2lvbiwgYW5kXG4gICAgICAgICAgICAvLyBsZXQgdGhlIGdlbmVyYXRvciBmdW5jdGlvbiBoYW5kbGUgdGhlIGV4Y2VwdGlvbi5cbiAgICAgICAgICAgIHJlc3VsdC52YWx1ZSA9IHVud3JhcHBlZDtcbiAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgaWYgKHR5cGVvZiBwcm9jZXNzID09PSBcIm9iamVjdFwiICYmIHByb2Nlc3MuZG9tYWluKSB7XG4gICAgICBpbnZva2UgPSBwcm9jZXNzLmRvbWFpbi5iaW5kKGludm9rZSk7XG4gICAgfVxuXG4gICAgdmFyIGludm9rZU5leHQgPSBpbnZva2UuYmluZChnZW5lcmF0b3IsIFwibmV4dFwiKTtcbiAgICB2YXIgaW52b2tlVGhyb3cgPSBpbnZva2UuYmluZChnZW5lcmF0b3IsIFwidGhyb3dcIik7XG4gICAgdmFyIGludm9rZVJldHVybiA9IGludm9rZS5iaW5kKGdlbmVyYXRvciwgXCJyZXR1cm5cIik7XG4gICAgdmFyIHByZXZpb3VzUHJvbWlzZTtcblxuICAgIGZ1bmN0aW9uIGVucXVldWUobWV0aG9kLCBhcmcpIHtcbiAgICAgIGZ1bmN0aW9uIGNhbGxJbnZva2VXaXRoTWV0aG9kQW5kQXJnKCkge1xuICAgICAgICByZXR1cm4gaW52b2tlKG1ldGhvZCwgYXJnKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHByZXZpb3VzUHJvbWlzZSA9XG4gICAgICAgIC8vIElmIGVucXVldWUgaGFzIGJlZW4gY2FsbGVkIGJlZm9yZSwgdGhlbiB3ZSB3YW50IHRvIHdhaXQgdW50aWxcbiAgICAgICAgLy8gYWxsIHByZXZpb3VzIFByb21pc2VzIGhhdmUgYmVlbiByZXNvbHZlZCBiZWZvcmUgY2FsbGluZyBpbnZva2UsXG4gICAgICAgIC8vIHNvIHRoYXQgcmVzdWx0cyBhcmUgYWx3YXlzIGRlbGl2ZXJlZCBpbiB0aGUgY29ycmVjdCBvcmRlci4gSWZcbiAgICAgICAgLy8gZW5xdWV1ZSBoYXMgbm90IGJlZW4gY2FsbGVkIGJlZm9yZSwgdGhlbiBpdCBpcyBpbXBvcnRhbnQgdG9cbiAgICAgICAgLy8gY2FsbCBpbnZva2UgaW1tZWRpYXRlbHksIHdpdGhvdXQgd2FpdGluZyBvbiBhIGNhbGxiYWNrIHRvIGZpcmUsXG4gICAgICAgIC8vIHNvIHRoYXQgdGhlIGFzeW5jIGdlbmVyYXRvciBmdW5jdGlvbiBoYXMgdGhlIG9wcG9ydHVuaXR5IHRvIGRvXG4gICAgICAgIC8vIGFueSBuZWNlc3Nhcnkgc2V0dXAgaW4gYSBwcmVkaWN0YWJsZSB3YXkuIFRoaXMgcHJlZGljdGFiaWxpdHlcbiAgICAgICAgLy8gaXMgd2h5IHRoZSBQcm9taXNlIGNvbnN0cnVjdG9yIHN5bmNocm9ub3VzbHkgaW52b2tlcyBpdHNcbiAgICAgICAgLy8gZXhlY3V0b3IgY2FsbGJhY2ssIGFuZCB3aHkgYXN5bmMgZnVuY3Rpb25zIHN5bmNocm9ub3VzbHlcbiAgICAgICAgLy8gZXhlY3V0ZSBjb2RlIGJlZm9yZSB0aGUgZmlyc3QgYXdhaXQuIFNpbmNlIHdlIGltcGxlbWVudCBzaW1wbGVcbiAgICAgICAgLy8gYXN5bmMgZnVuY3Rpb25zIGluIHRlcm1zIG9mIGFzeW5jIGdlbmVyYXRvcnMsIGl0IGlzIGVzcGVjaWFsbHlcbiAgICAgICAgLy8gaW1wb3J0YW50IHRvIGdldCB0aGlzIHJpZ2h0LCBldmVuIHRob3VnaCBpdCByZXF1aXJlcyBjYXJlLlxuICAgICAgICBwcmV2aW91c1Byb21pc2UgPyBwcmV2aW91c1Byb21pc2UudGhlbihcbiAgICAgICAgICBjYWxsSW52b2tlV2l0aE1ldGhvZEFuZEFyZyxcbiAgICAgICAgICAvLyBBdm9pZCBwcm9wYWdhdGluZyBmYWlsdXJlcyB0byBQcm9taXNlcyByZXR1cm5lZCBieSBsYXRlclxuICAgICAgICAgIC8vIGludm9jYXRpb25zIG9mIHRoZSBpdGVyYXRvci5cbiAgICAgICAgICBjYWxsSW52b2tlV2l0aE1ldGhvZEFuZEFyZ1xuICAgICAgICApIDogbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUpIHtcbiAgICAgICAgICByZXNvbHZlKGNhbGxJbnZva2VXaXRoTWV0aG9kQW5kQXJnKCkpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvLyBEZWZpbmUgdGhlIHVuaWZpZWQgaGVscGVyIG1ldGhvZCB0aGF0IGlzIHVzZWQgdG8gaW1wbGVtZW50IC5uZXh0LFxuICAgIC8vIC50aHJvdywgYW5kIC5yZXR1cm4gKHNlZSBkZWZpbmVJdGVyYXRvck1ldGhvZHMpLlxuICAgIHRoaXMuX2ludm9rZSA9IGVucXVldWU7XG4gIH1cblxuICBkZWZpbmVJdGVyYXRvck1ldGhvZHMoQXN5bmNJdGVyYXRvci5wcm90b3R5cGUpO1xuXG4gIC8vIE5vdGUgdGhhdCBzaW1wbGUgYXN5bmMgZnVuY3Rpb25zIGFyZSBpbXBsZW1lbnRlZCBvbiB0b3Agb2ZcbiAgLy8gQXN5bmNJdGVyYXRvciBvYmplY3RzOyB0aGV5IGp1c3QgcmV0dXJuIGEgUHJvbWlzZSBmb3IgdGhlIHZhbHVlIG9mXG4gIC8vIHRoZSBmaW5hbCByZXN1bHQgcHJvZHVjZWQgYnkgdGhlIGl0ZXJhdG9yLlxuICBydW50aW1lLmFzeW5jID0gZnVuY3Rpb24oaW5uZXJGbiwgb3V0ZXJGbiwgc2VsZiwgdHJ5TG9jc0xpc3QpIHtcbiAgICB2YXIgaXRlciA9IG5ldyBBc3luY0l0ZXJhdG9yKFxuICAgICAgd3JhcChpbm5lckZuLCBvdXRlckZuLCBzZWxmLCB0cnlMb2NzTGlzdClcbiAgICApO1xuXG4gICAgcmV0dXJuIHJ1bnRpbWUuaXNHZW5lcmF0b3JGdW5jdGlvbihvdXRlckZuKVxuICAgICAgPyBpdGVyIC8vIElmIG91dGVyRm4gaXMgYSBnZW5lcmF0b3IsIHJldHVybiB0aGUgZnVsbCBpdGVyYXRvci5cbiAgICAgIDogaXRlci5uZXh0KCkudGhlbihmdW5jdGlvbihyZXN1bHQpIHtcbiAgICAgICAgICByZXR1cm4gcmVzdWx0LmRvbmUgPyByZXN1bHQudmFsdWUgOiBpdGVyLm5leHQoKTtcbiAgICAgICAgfSk7XG4gIH07XG5cbiAgZnVuY3Rpb24gbWFrZUludm9rZU1ldGhvZChpbm5lckZuLCBzZWxmLCBjb250ZXh0KSB7XG4gICAgdmFyIHN0YXRlID0gR2VuU3RhdGVTdXNwZW5kZWRTdGFydDtcblxuICAgIHJldHVybiBmdW5jdGlvbiBpbnZva2UobWV0aG9kLCBhcmcpIHtcbiAgICAgIGlmIChzdGF0ZSA9PT0gR2VuU3RhdGVFeGVjdXRpbmcpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiR2VuZXJhdG9yIGlzIGFscmVhZHkgcnVubmluZ1wiKTtcbiAgICAgIH1cblxuICAgICAgaWYgKHN0YXRlID09PSBHZW5TdGF0ZUNvbXBsZXRlZCkge1xuICAgICAgICBpZiAobWV0aG9kID09PSBcInRocm93XCIpIHtcbiAgICAgICAgICB0aHJvdyBhcmc7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBCZSBmb3JnaXZpbmcsIHBlciAyNS4zLjMuMy4zIG9mIHRoZSBzcGVjOlxuICAgICAgICAvLyBodHRwczovL3Blb3BsZS5tb3ppbGxhLm9yZy9+am9yZW5kb3JmZi9lczYtZHJhZnQuaHRtbCNzZWMtZ2VuZXJhdG9ycmVzdW1lXG4gICAgICAgIHJldHVybiBkb25lUmVzdWx0KCk7XG4gICAgICB9XG5cbiAgICAgIHdoaWxlICh0cnVlKSB7XG4gICAgICAgIHZhciBkZWxlZ2F0ZSA9IGNvbnRleHQuZGVsZWdhdGU7XG4gICAgICAgIGlmIChkZWxlZ2F0ZSkge1xuICAgICAgICAgIGlmIChtZXRob2QgPT09IFwicmV0dXJuXCIgfHxcbiAgICAgICAgICAgICAgKG1ldGhvZCA9PT0gXCJ0aHJvd1wiICYmIGRlbGVnYXRlLml0ZXJhdG9yW21ldGhvZF0gPT09IHVuZGVmaW5lZCkpIHtcbiAgICAgICAgICAgIC8vIEEgcmV0dXJuIG9yIHRocm93ICh3aGVuIHRoZSBkZWxlZ2F0ZSBpdGVyYXRvciBoYXMgbm8gdGhyb3dcbiAgICAgICAgICAgIC8vIG1ldGhvZCkgYWx3YXlzIHRlcm1pbmF0ZXMgdGhlIHlpZWxkKiBsb29wLlxuICAgICAgICAgICAgY29udGV4dC5kZWxlZ2F0ZSA9IG51bGw7XG5cbiAgICAgICAgICAgIC8vIElmIHRoZSBkZWxlZ2F0ZSBpdGVyYXRvciBoYXMgYSByZXR1cm4gbWV0aG9kLCBnaXZlIGl0IGFcbiAgICAgICAgICAgIC8vIGNoYW5jZSB0byBjbGVhbiB1cC5cbiAgICAgICAgICAgIHZhciByZXR1cm5NZXRob2QgPSBkZWxlZ2F0ZS5pdGVyYXRvcltcInJldHVyblwiXTtcbiAgICAgICAgICAgIGlmIChyZXR1cm5NZXRob2QpIHtcbiAgICAgICAgICAgICAgdmFyIHJlY29yZCA9IHRyeUNhdGNoKHJldHVybk1ldGhvZCwgZGVsZWdhdGUuaXRlcmF0b3IsIGFyZyk7XG4gICAgICAgICAgICAgIGlmIChyZWNvcmQudHlwZSA9PT0gXCJ0aHJvd1wiKSB7XG4gICAgICAgICAgICAgICAgLy8gSWYgdGhlIHJldHVybiBtZXRob2QgdGhyZXcgYW4gZXhjZXB0aW9uLCBsZXQgdGhhdFxuICAgICAgICAgICAgICAgIC8vIGV4Y2VwdGlvbiBwcmV2YWlsIG92ZXIgdGhlIG9yaWdpbmFsIHJldHVybiBvciB0aHJvdy5cbiAgICAgICAgICAgICAgICBtZXRob2QgPSBcInRocm93XCI7XG4gICAgICAgICAgICAgICAgYXJnID0gcmVjb3JkLmFyZztcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAobWV0aG9kID09PSBcInJldHVyblwiKSB7XG4gICAgICAgICAgICAgIC8vIENvbnRpbnVlIHdpdGggdGhlIG91dGVyIHJldHVybiwgbm93IHRoYXQgdGhlIGRlbGVnYXRlXG4gICAgICAgICAgICAgIC8vIGl0ZXJhdG9yIGhhcyBiZWVuIHRlcm1pbmF0ZWQuXG4gICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cblxuICAgICAgICAgIHZhciByZWNvcmQgPSB0cnlDYXRjaChcbiAgICAgICAgICAgIGRlbGVnYXRlLml0ZXJhdG9yW21ldGhvZF0sXG4gICAgICAgICAgICBkZWxlZ2F0ZS5pdGVyYXRvcixcbiAgICAgICAgICAgIGFyZ1xuICAgICAgICAgICk7XG5cbiAgICAgICAgICBpZiAocmVjb3JkLnR5cGUgPT09IFwidGhyb3dcIikge1xuICAgICAgICAgICAgY29udGV4dC5kZWxlZ2F0ZSA9IG51bGw7XG5cbiAgICAgICAgICAgIC8vIExpa2UgcmV0dXJuaW5nIGdlbmVyYXRvci50aHJvdyh1bmNhdWdodCksIGJ1dCB3aXRob3V0IHRoZVxuICAgICAgICAgICAgLy8gb3ZlcmhlYWQgb2YgYW4gZXh0cmEgZnVuY3Rpb24gY2FsbC5cbiAgICAgICAgICAgIG1ldGhvZCA9IFwidGhyb3dcIjtcbiAgICAgICAgICAgIGFyZyA9IHJlY29yZC5hcmc7XG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICAvLyBEZWxlZ2F0ZSBnZW5lcmF0b3IgcmFuIGFuZCBoYW5kbGVkIGl0cyBvd24gZXhjZXB0aW9ucyBzb1xuICAgICAgICAgIC8vIHJlZ2FyZGxlc3Mgb2Ygd2hhdCB0aGUgbWV0aG9kIHdhcywgd2UgY29udGludWUgYXMgaWYgaXQgaXNcbiAgICAgICAgICAvLyBcIm5leHRcIiB3aXRoIGFuIHVuZGVmaW5lZCBhcmcuXG4gICAgICAgICAgbWV0aG9kID0gXCJuZXh0XCI7XG4gICAgICAgICAgYXJnID0gdW5kZWZpbmVkO1xuXG4gICAgICAgICAgdmFyIGluZm8gPSByZWNvcmQuYXJnO1xuICAgICAgICAgIGlmIChpbmZvLmRvbmUpIHtcbiAgICAgICAgICAgIGNvbnRleHRbZGVsZWdhdGUucmVzdWx0TmFtZV0gPSBpbmZvLnZhbHVlO1xuICAgICAgICAgICAgY29udGV4dC5uZXh0ID0gZGVsZWdhdGUubmV4dExvYztcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgc3RhdGUgPSBHZW5TdGF0ZVN1c3BlbmRlZFlpZWxkO1xuICAgICAgICAgICAgcmV0dXJuIGluZm87XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgY29udGV4dC5kZWxlZ2F0ZSA9IG51bGw7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAobWV0aG9kID09PSBcIm5leHRcIikge1xuICAgICAgICAgIGNvbnRleHQuX3NlbnQgPSBhcmc7XG5cbiAgICAgICAgICBpZiAoc3RhdGUgPT09IEdlblN0YXRlU3VzcGVuZGVkWWllbGQpIHtcbiAgICAgICAgICAgIGNvbnRleHQuc2VudCA9IGFyZztcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY29udGV4dC5zZW50ID0gdW5kZWZpbmVkO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmIChtZXRob2QgPT09IFwidGhyb3dcIikge1xuICAgICAgICAgIGlmIChzdGF0ZSA9PT0gR2VuU3RhdGVTdXNwZW5kZWRTdGFydCkge1xuICAgICAgICAgICAgc3RhdGUgPSBHZW5TdGF0ZUNvbXBsZXRlZDtcbiAgICAgICAgICAgIHRocm93IGFyZztcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAoY29udGV4dC5kaXNwYXRjaEV4Y2VwdGlvbihhcmcpKSB7XG4gICAgICAgICAgICAvLyBJZiB0aGUgZGlzcGF0Y2hlZCBleGNlcHRpb24gd2FzIGNhdWdodCBieSBhIGNhdGNoIGJsb2NrLFxuICAgICAgICAgICAgLy8gdGhlbiBsZXQgdGhhdCBjYXRjaCBibG9jayBoYW5kbGUgdGhlIGV4Y2VwdGlvbiBub3JtYWxseS5cbiAgICAgICAgICAgIG1ldGhvZCA9IFwibmV4dFwiO1xuICAgICAgICAgICAgYXJnID0gdW5kZWZpbmVkO1xuICAgICAgICAgIH1cblxuICAgICAgICB9IGVsc2UgaWYgKG1ldGhvZCA9PT0gXCJyZXR1cm5cIikge1xuICAgICAgICAgIGNvbnRleHQuYWJydXB0KFwicmV0dXJuXCIsIGFyZyk7XG4gICAgICAgIH1cblxuICAgICAgICBzdGF0ZSA9IEdlblN0YXRlRXhlY3V0aW5nO1xuXG4gICAgICAgIHZhciByZWNvcmQgPSB0cnlDYXRjaChpbm5lckZuLCBzZWxmLCBjb250ZXh0KTtcbiAgICAgICAgaWYgKHJlY29yZC50eXBlID09PSBcIm5vcm1hbFwiKSB7XG4gICAgICAgICAgLy8gSWYgYW4gZXhjZXB0aW9uIGlzIHRocm93biBmcm9tIGlubmVyRm4sIHdlIGxlYXZlIHN0YXRlID09PVxuICAgICAgICAgIC8vIEdlblN0YXRlRXhlY3V0aW5nIGFuZCBsb29wIGJhY2sgZm9yIGFub3RoZXIgaW52b2NhdGlvbi5cbiAgICAgICAgICBzdGF0ZSA9IGNvbnRleHQuZG9uZVxuICAgICAgICAgICAgPyBHZW5TdGF0ZUNvbXBsZXRlZFxuICAgICAgICAgICAgOiBHZW5TdGF0ZVN1c3BlbmRlZFlpZWxkO1xuXG4gICAgICAgICAgdmFyIGluZm8gPSB7XG4gICAgICAgICAgICB2YWx1ZTogcmVjb3JkLmFyZyxcbiAgICAgICAgICAgIGRvbmU6IGNvbnRleHQuZG9uZVxuICAgICAgICAgIH07XG5cbiAgICAgICAgICBpZiAocmVjb3JkLmFyZyA9PT0gQ29udGludWVTZW50aW5lbCkge1xuICAgICAgICAgICAgaWYgKGNvbnRleHQuZGVsZWdhdGUgJiYgbWV0aG9kID09PSBcIm5leHRcIikge1xuICAgICAgICAgICAgICAvLyBEZWxpYmVyYXRlbHkgZm9yZ2V0IHRoZSBsYXN0IHNlbnQgdmFsdWUgc28gdGhhdCB3ZSBkb24ndFxuICAgICAgICAgICAgICAvLyBhY2NpZGVudGFsbHkgcGFzcyBpdCBvbiB0byB0aGUgZGVsZWdhdGUuXG4gICAgICAgICAgICAgIGFyZyA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIGluZm87XG4gICAgICAgICAgfVxuXG4gICAgICAgIH0gZWxzZSBpZiAocmVjb3JkLnR5cGUgPT09IFwidGhyb3dcIikge1xuICAgICAgICAgIHN0YXRlID0gR2VuU3RhdGVDb21wbGV0ZWQ7XG4gICAgICAgICAgLy8gRGlzcGF0Y2ggdGhlIGV4Y2VwdGlvbiBieSBsb29waW5nIGJhY2sgYXJvdW5kIHRvIHRoZVxuICAgICAgICAgIC8vIGNvbnRleHQuZGlzcGF0Y2hFeGNlcHRpb24oYXJnKSBjYWxsIGFib3ZlLlxuICAgICAgICAgIG1ldGhvZCA9IFwidGhyb3dcIjtcbiAgICAgICAgICBhcmcgPSByZWNvcmQuYXJnO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfTtcbiAgfVxuXG4gIC8vIERlZmluZSBHZW5lcmF0b3IucHJvdG90eXBlLntuZXh0LHRocm93LHJldHVybn0gaW4gdGVybXMgb2YgdGhlXG4gIC8vIHVuaWZpZWQgLl9pbnZva2UgaGVscGVyIG1ldGhvZC5cbiAgZGVmaW5lSXRlcmF0b3JNZXRob2RzKEdwKTtcblxuICBHcFtpdGVyYXRvclN5bWJvbF0gPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gdGhpcztcbiAgfTtcblxuICBHcC50b1N0cmluZyA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiBcIltvYmplY3QgR2VuZXJhdG9yXVwiO1xuICB9O1xuXG4gIGZ1bmN0aW9uIHB1c2hUcnlFbnRyeShsb2NzKSB7XG4gICAgdmFyIGVudHJ5ID0geyB0cnlMb2M6IGxvY3NbMF0gfTtcblxuICAgIGlmICgxIGluIGxvY3MpIHtcbiAgICAgIGVudHJ5LmNhdGNoTG9jID0gbG9jc1sxXTtcbiAgICB9XG5cbiAgICBpZiAoMiBpbiBsb2NzKSB7XG4gICAgICBlbnRyeS5maW5hbGx5TG9jID0gbG9jc1syXTtcbiAgICAgIGVudHJ5LmFmdGVyTG9jID0gbG9jc1szXTtcbiAgICB9XG5cbiAgICB0aGlzLnRyeUVudHJpZXMucHVzaChlbnRyeSk7XG4gIH1cblxuICBmdW5jdGlvbiByZXNldFRyeUVudHJ5KGVudHJ5KSB7XG4gICAgdmFyIHJlY29yZCA9IGVudHJ5LmNvbXBsZXRpb24gfHwge307XG4gICAgcmVjb3JkLnR5cGUgPSBcIm5vcm1hbFwiO1xuICAgIGRlbGV0ZSByZWNvcmQuYXJnO1xuICAgIGVudHJ5LmNvbXBsZXRpb24gPSByZWNvcmQ7XG4gIH1cblxuICBmdW5jdGlvbiBDb250ZXh0KHRyeUxvY3NMaXN0KSB7XG4gICAgLy8gVGhlIHJvb3QgZW50cnkgb2JqZWN0IChlZmZlY3RpdmVseSBhIHRyeSBzdGF0ZW1lbnQgd2l0aG91dCBhIGNhdGNoXG4gICAgLy8gb3IgYSBmaW5hbGx5IGJsb2NrKSBnaXZlcyB1cyBhIHBsYWNlIHRvIHN0b3JlIHZhbHVlcyB0aHJvd24gZnJvbVxuICAgIC8vIGxvY2F0aW9ucyB3aGVyZSB0aGVyZSBpcyBubyBlbmNsb3NpbmcgdHJ5IHN0YXRlbWVudC5cbiAgICB0aGlzLnRyeUVudHJpZXMgPSBbeyB0cnlMb2M6IFwicm9vdFwiIH1dO1xuICAgIHRyeUxvY3NMaXN0LmZvckVhY2gocHVzaFRyeUVudHJ5LCB0aGlzKTtcbiAgICB0aGlzLnJlc2V0KHRydWUpO1xuICB9XG5cbiAgcnVudGltZS5rZXlzID0gZnVuY3Rpb24ob2JqZWN0KSB7XG4gICAgdmFyIGtleXMgPSBbXTtcbiAgICBmb3IgKHZhciBrZXkgaW4gb2JqZWN0KSB7XG4gICAgICBrZXlzLnB1c2goa2V5KTtcbiAgICB9XG4gICAga2V5cy5yZXZlcnNlKCk7XG5cbiAgICAvLyBSYXRoZXIgdGhhbiByZXR1cm5pbmcgYW4gb2JqZWN0IHdpdGggYSBuZXh0IG1ldGhvZCwgd2Uga2VlcFxuICAgIC8vIHRoaW5ncyBzaW1wbGUgYW5kIHJldHVybiB0aGUgbmV4dCBmdW5jdGlvbiBpdHNlbGYuXG4gICAgcmV0dXJuIGZ1bmN0aW9uIG5leHQoKSB7XG4gICAgICB3aGlsZSAoa2V5cy5sZW5ndGgpIHtcbiAgICAgICAgdmFyIGtleSA9IGtleXMucG9wKCk7XG4gICAgICAgIGlmIChrZXkgaW4gb2JqZWN0KSB7XG4gICAgICAgICAgbmV4dC52YWx1ZSA9IGtleTtcbiAgICAgICAgICBuZXh0LmRvbmUgPSBmYWxzZTtcbiAgICAgICAgICByZXR1cm4gbmV4dDtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICAvLyBUbyBhdm9pZCBjcmVhdGluZyBhbiBhZGRpdGlvbmFsIG9iamVjdCwgd2UganVzdCBoYW5nIHRoZSAudmFsdWVcbiAgICAgIC8vIGFuZCAuZG9uZSBwcm9wZXJ0aWVzIG9mZiB0aGUgbmV4dCBmdW5jdGlvbiBvYmplY3QgaXRzZWxmLiBUaGlzXG4gICAgICAvLyBhbHNvIGVuc3VyZXMgdGhhdCB0aGUgbWluaWZpZXIgd2lsbCBub3QgYW5vbnltaXplIHRoZSBmdW5jdGlvbi5cbiAgICAgIG5leHQuZG9uZSA9IHRydWU7XG4gICAgICByZXR1cm4gbmV4dDtcbiAgICB9O1xuICB9O1xuXG4gIGZ1bmN0aW9uIHZhbHVlcyhpdGVyYWJsZSkge1xuICAgIGlmIChpdGVyYWJsZSkge1xuICAgICAgdmFyIGl0ZXJhdG9yTWV0aG9kID0gaXRlcmFibGVbaXRlcmF0b3JTeW1ib2xdO1xuICAgICAgaWYgKGl0ZXJhdG9yTWV0aG9kKSB7XG4gICAgICAgIHJldHVybiBpdGVyYXRvck1ldGhvZC5jYWxsKGl0ZXJhYmxlKTtcbiAgICAgIH1cblxuICAgICAgaWYgKHR5cGVvZiBpdGVyYWJsZS5uZXh0ID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgcmV0dXJuIGl0ZXJhYmxlO1xuICAgICAgfVxuXG4gICAgICBpZiAoIWlzTmFOKGl0ZXJhYmxlLmxlbmd0aCkpIHtcbiAgICAgICAgdmFyIGkgPSAtMSwgbmV4dCA9IGZ1bmN0aW9uIG5leHQoKSB7XG4gICAgICAgICAgd2hpbGUgKCsraSA8IGl0ZXJhYmxlLmxlbmd0aCkge1xuICAgICAgICAgICAgaWYgKGhhc093bi5jYWxsKGl0ZXJhYmxlLCBpKSkge1xuICAgICAgICAgICAgICBuZXh0LnZhbHVlID0gaXRlcmFibGVbaV07XG4gICAgICAgICAgICAgIG5leHQuZG9uZSA9IGZhbHNlO1xuICAgICAgICAgICAgICByZXR1cm4gbmV4dDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG5cbiAgICAgICAgICBuZXh0LnZhbHVlID0gdW5kZWZpbmVkO1xuICAgICAgICAgIG5leHQuZG9uZSA9IHRydWU7XG5cbiAgICAgICAgICByZXR1cm4gbmV4dDtcbiAgICAgICAgfTtcblxuICAgICAgICByZXR1cm4gbmV4dC5uZXh0ID0gbmV4dDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBSZXR1cm4gYW4gaXRlcmF0b3Igd2l0aCBubyB2YWx1ZXMuXG4gICAgcmV0dXJuIHsgbmV4dDogZG9uZVJlc3VsdCB9O1xuICB9XG4gIHJ1bnRpbWUudmFsdWVzID0gdmFsdWVzO1xuXG4gIGZ1bmN0aW9uIGRvbmVSZXN1bHQoKSB7XG4gICAgcmV0dXJuIHsgdmFsdWU6IHVuZGVmaW5lZCwgZG9uZTogdHJ1ZSB9O1xuICB9XG5cbiAgQ29udGV4dC5wcm90b3R5cGUgPSB7XG4gICAgY29uc3RydWN0b3I6IENvbnRleHQsXG5cbiAgICByZXNldDogZnVuY3Rpb24oc2tpcFRlbXBSZXNldCkge1xuICAgICAgdGhpcy5wcmV2ID0gMDtcbiAgICAgIHRoaXMubmV4dCA9IDA7XG4gICAgICB0aGlzLnNlbnQgPSB1bmRlZmluZWQ7XG4gICAgICB0aGlzLmRvbmUgPSBmYWxzZTtcbiAgICAgIHRoaXMuZGVsZWdhdGUgPSBudWxsO1xuXG4gICAgICB0aGlzLnRyeUVudHJpZXMuZm9yRWFjaChyZXNldFRyeUVudHJ5KTtcblxuICAgICAgaWYgKCFza2lwVGVtcFJlc2V0KSB7XG4gICAgICAgIGZvciAodmFyIG5hbWUgaW4gdGhpcykge1xuICAgICAgICAgIC8vIE5vdCBzdXJlIGFib3V0IHRoZSBvcHRpbWFsIG9yZGVyIG9mIHRoZXNlIGNvbmRpdGlvbnM6XG4gICAgICAgICAgaWYgKG5hbWUuY2hhckF0KDApID09PSBcInRcIiAmJlxuICAgICAgICAgICAgICBoYXNPd24uY2FsbCh0aGlzLCBuYW1lKSAmJlxuICAgICAgICAgICAgICAhaXNOYU4oK25hbWUuc2xpY2UoMSkpKSB7XG4gICAgICAgICAgICB0aGlzW25hbWVdID0gdW5kZWZpbmVkO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sXG5cbiAgICBzdG9wOiBmdW5jdGlvbigpIHtcbiAgICAgIHRoaXMuZG9uZSA9IHRydWU7XG5cbiAgICAgIHZhciByb290RW50cnkgPSB0aGlzLnRyeUVudHJpZXNbMF07XG4gICAgICB2YXIgcm9vdFJlY29yZCA9IHJvb3RFbnRyeS5jb21wbGV0aW9uO1xuICAgICAgaWYgKHJvb3RSZWNvcmQudHlwZSA9PT0gXCJ0aHJvd1wiKSB7XG4gICAgICAgIHRocm93IHJvb3RSZWNvcmQuYXJnO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gdGhpcy5ydmFsO1xuICAgIH0sXG5cbiAgICBkaXNwYXRjaEV4Y2VwdGlvbjogZnVuY3Rpb24oZXhjZXB0aW9uKSB7XG4gICAgICBpZiAodGhpcy5kb25lKSB7XG4gICAgICAgIHRocm93IGV4Y2VwdGlvbjtcbiAgICAgIH1cblxuICAgICAgdmFyIGNvbnRleHQgPSB0aGlzO1xuICAgICAgZnVuY3Rpb24gaGFuZGxlKGxvYywgY2F1Z2h0KSB7XG4gICAgICAgIHJlY29yZC50eXBlID0gXCJ0aHJvd1wiO1xuICAgICAgICByZWNvcmQuYXJnID0gZXhjZXB0aW9uO1xuICAgICAgICBjb250ZXh0Lm5leHQgPSBsb2M7XG4gICAgICAgIHJldHVybiAhIWNhdWdodDtcbiAgICAgIH1cblxuICAgICAgZm9yICh2YXIgaSA9IHRoaXMudHJ5RW50cmllcy5sZW5ndGggLSAxOyBpID49IDA7IC0taSkge1xuICAgICAgICB2YXIgZW50cnkgPSB0aGlzLnRyeUVudHJpZXNbaV07XG4gICAgICAgIHZhciByZWNvcmQgPSBlbnRyeS5jb21wbGV0aW9uO1xuXG4gICAgICAgIGlmIChlbnRyeS50cnlMb2MgPT09IFwicm9vdFwiKSB7XG4gICAgICAgICAgLy8gRXhjZXB0aW9uIHRocm93biBvdXRzaWRlIG9mIGFueSB0cnkgYmxvY2sgdGhhdCBjb3VsZCBoYW5kbGVcbiAgICAgICAgICAvLyBpdCwgc28gc2V0IHRoZSBjb21wbGV0aW9uIHZhbHVlIG9mIHRoZSBlbnRpcmUgZnVuY3Rpb24gdG9cbiAgICAgICAgICAvLyB0aHJvdyB0aGUgZXhjZXB0aW9uLlxuICAgICAgICAgIHJldHVybiBoYW5kbGUoXCJlbmRcIik7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoZW50cnkudHJ5TG9jIDw9IHRoaXMucHJldikge1xuICAgICAgICAgIHZhciBoYXNDYXRjaCA9IGhhc093bi5jYWxsKGVudHJ5LCBcImNhdGNoTG9jXCIpO1xuICAgICAgICAgIHZhciBoYXNGaW5hbGx5ID0gaGFzT3duLmNhbGwoZW50cnksIFwiZmluYWxseUxvY1wiKTtcblxuICAgICAgICAgIGlmIChoYXNDYXRjaCAmJiBoYXNGaW5hbGx5KSB7XG4gICAgICAgICAgICBpZiAodGhpcy5wcmV2IDwgZW50cnkuY2F0Y2hMb2MpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIGhhbmRsZShlbnRyeS5jYXRjaExvYywgdHJ1ZSk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMucHJldiA8IGVudHJ5LmZpbmFsbHlMb2MpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIGhhbmRsZShlbnRyeS5maW5hbGx5TG9jKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgIH0gZWxzZSBpZiAoaGFzQ2F0Y2gpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnByZXYgPCBlbnRyeS5jYXRjaExvYykge1xuICAgICAgICAgICAgICByZXR1cm4gaGFuZGxlKGVudHJ5LmNhdGNoTG9jLCB0cnVlKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgIH0gZWxzZSBpZiAoaGFzRmluYWxseSkge1xuICAgICAgICAgICAgaWYgKHRoaXMucHJldiA8IGVudHJ5LmZpbmFsbHlMb2MpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIGhhbmRsZShlbnRyeS5maW5hbGx5TG9jKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJ0cnkgc3RhdGVtZW50IHdpdGhvdXQgY2F0Y2ggb3IgZmluYWxseVwiKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LFxuXG4gICAgYWJydXB0OiBmdW5jdGlvbih0eXBlLCBhcmcpIHtcbiAgICAgIGZvciAodmFyIGkgPSB0aGlzLnRyeUVudHJpZXMubGVuZ3RoIC0gMTsgaSA+PSAwOyAtLWkpIHtcbiAgICAgICAgdmFyIGVudHJ5ID0gdGhpcy50cnlFbnRyaWVzW2ldO1xuICAgICAgICBpZiAoZW50cnkudHJ5TG9jIDw9IHRoaXMucHJldiAmJlxuICAgICAgICAgICAgaGFzT3duLmNhbGwoZW50cnksIFwiZmluYWxseUxvY1wiKSAmJlxuICAgICAgICAgICAgdGhpcy5wcmV2IDwgZW50cnkuZmluYWxseUxvYykge1xuICAgICAgICAgIHZhciBmaW5hbGx5RW50cnkgPSBlbnRyeTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAoZmluYWxseUVudHJ5ICYmXG4gICAgICAgICAgKHR5cGUgPT09IFwiYnJlYWtcIiB8fFxuICAgICAgICAgICB0eXBlID09PSBcImNvbnRpbnVlXCIpICYmXG4gICAgICAgICAgZmluYWxseUVudHJ5LnRyeUxvYyA8PSBhcmcgJiZcbiAgICAgICAgICBhcmcgPD0gZmluYWxseUVudHJ5LmZpbmFsbHlMb2MpIHtcbiAgICAgICAgLy8gSWdub3JlIHRoZSBmaW5hbGx5IGVudHJ5IGlmIGNvbnRyb2wgaXMgbm90IGp1bXBpbmcgdG8gYVxuICAgICAgICAvLyBsb2NhdGlvbiBvdXRzaWRlIHRoZSB0cnkvY2F0Y2ggYmxvY2suXG4gICAgICAgIGZpbmFsbHlFbnRyeSA9IG51bGw7XG4gICAgICB9XG5cbiAgICAgIHZhciByZWNvcmQgPSBmaW5hbGx5RW50cnkgPyBmaW5hbGx5RW50cnkuY29tcGxldGlvbiA6IHt9O1xuICAgICAgcmVjb3JkLnR5cGUgPSB0eXBlO1xuICAgICAgcmVjb3JkLmFyZyA9IGFyZztcblxuICAgICAgaWYgKGZpbmFsbHlFbnRyeSkge1xuICAgICAgICB0aGlzLm5leHQgPSBmaW5hbGx5RW50cnkuZmluYWxseUxvYztcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuY29tcGxldGUocmVjb3JkKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIENvbnRpbnVlU2VudGluZWw7XG4gICAgfSxcblxuICAgIGNvbXBsZXRlOiBmdW5jdGlvbihyZWNvcmQsIGFmdGVyTG9jKSB7XG4gICAgICBpZiAocmVjb3JkLnR5cGUgPT09IFwidGhyb3dcIikge1xuICAgICAgICB0aHJvdyByZWNvcmQuYXJnO1xuICAgICAgfVxuXG4gICAgICBpZiAocmVjb3JkLnR5cGUgPT09IFwiYnJlYWtcIiB8fFxuICAgICAgICAgIHJlY29yZC50eXBlID09PSBcImNvbnRpbnVlXCIpIHtcbiAgICAgICAgdGhpcy5uZXh0ID0gcmVjb3JkLmFyZztcbiAgICAgIH0gZWxzZSBpZiAocmVjb3JkLnR5cGUgPT09IFwicmV0dXJuXCIpIHtcbiAgICAgICAgdGhpcy5ydmFsID0gcmVjb3JkLmFyZztcbiAgICAgICAgdGhpcy5uZXh0ID0gXCJlbmRcIjtcbiAgICAgIH0gZWxzZSBpZiAocmVjb3JkLnR5cGUgPT09IFwibm9ybWFsXCIgJiYgYWZ0ZXJMb2MpIHtcbiAgICAgICAgdGhpcy5uZXh0ID0gYWZ0ZXJMb2M7XG4gICAgICB9XG4gICAgfSxcblxuICAgIGZpbmlzaDogZnVuY3Rpb24oZmluYWxseUxvYykge1xuICAgICAgZm9yICh2YXIgaSA9IHRoaXMudHJ5RW50cmllcy5sZW5ndGggLSAxOyBpID49IDA7IC0taSkge1xuICAgICAgICB2YXIgZW50cnkgPSB0aGlzLnRyeUVudHJpZXNbaV07XG4gICAgICAgIGlmIChlbnRyeS5maW5hbGx5TG9jID09PSBmaW5hbGx5TG9jKSB7XG4gICAgICAgICAgdGhpcy5jb21wbGV0ZShlbnRyeS5jb21wbGV0aW9uLCBlbnRyeS5hZnRlckxvYyk7XG4gICAgICAgICAgcmVzZXRUcnlFbnRyeShlbnRyeSk7XG4gICAgICAgICAgcmV0dXJuIENvbnRpbnVlU2VudGluZWw7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LFxuXG4gICAgXCJjYXRjaFwiOiBmdW5jdGlvbih0cnlMb2MpIHtcbiAgICAgIGZvciAodmFyIGkgPSB0aGlzLnRyeUVudHJpZXMubGVuZ3RoIC0gMTsgaSA+PSAwOyAtLWkpIHtcbiAgICAgICAgdmFyIGVudHJ5ID0gdGhpcy50cnlFbnRyaWVzW2ldO1xuICAgICAgICBpZiAoZW50cnkudHJ5TG9jID09PSB0cnlMb2MpIHtcbiAgICAgICAgICB2YXIgcmVjb3JkID0gZW50cnkuY29tcGxldGlvbjtcbiAgICAgICAgICBpZiAocmVjb3JkLnR5cGUgPT09IFwidGhyb3dcIikge1xuICAgICAgICAgICAgdmFyIHRocm93biA9IHJlY29yZC5hcmc7XG4gICAgICAgICAgICByZXNldFRyeUVudHJ5KGVudHJ5KTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIHRocm93bjtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICAvLyBUaGUgY29udGV4dC5jYXRjaCBtZXRob2QgbXVzdCBvbmx5IGJlIGNhbGxlZCB3aXRoIGEgbG9jYXRpb25cbiAgICAgIC8vIGFyZ3VtZW50IHRoYXQgY29ycmVzcG9uZHMgdG8gYSBrbm93biBjYXRjaCBibG9jay5cbiAgICAgIHRocm93IG5ldyBFcnJvcihcImlsbGVnYWwgY2F0Y2ggYXR0ZW1wdFwiKTtcbiAgICB9LFxuXG4gICAgZGVsZWdhdGVZaWVsZDogZnVuY3Rpb24oaXRlcmFibGUsIHJlc3VsdE5hbWUsIG5leHRMb2MpIHtcbiAgICAgIHRoaXMuZGVsZWdhdGUgPSB7XG4gICAgICAgIGl0ZXJhdG9yOiB2YWx1ZXMoaXRlcmFibGUpLFxuICAgICAgICByZXN1bHROYW1lOiByZXN1bHROYW1lLFxuICAgICAgICBuZXh0TG9jOiBuZXh0TG9jXG4gICAgICB9O1xuXG4gICAgICByZXR1cm4gQ29udGludWVTZW50aW5lbDtcbiAgICB9XG4gIH07XG59KShcbiAgLy8gQW1vbmcgdGhlIHZhcmlvdXMgdHJpY2tzIGZvciBvYnRhaW5pbmcgYSByZWZlcmVuY2UgdG8gdGhlIGdsb2JhbFxuICAvLyBvYmplY3QsIHRoaXMgc2VlbXMgdG8gYmUgdGhlIG1vc3QgcmVsaWFibGUgdGVjaG5pcXVlIHRoYXQgZG9lcyBub3RcbiAgLy8gdXNlIGluZGlyZWN0IGV2YWwgKHdoaWNoIHZpb2xhdGVzIENvbnRlbnQgU2VjdXJpdHkgUG9saWN5KS5cbiAgdHlwZW9mIGdsb2JhbCA9PT0gXCJvYmplY3RcIiA/IGdsb2JhbCA6XG4gIHR5cGVvZiB3aW5kb3cgPT09IFwib2JqZWN0XCIgPyB3aW5kb3cgOlxuICB0eXBlb2Ygc2VsZiA9PT0gXCJvYmplY3RcIiA/IHNlbGYgOiB0aGlzXG4pO1xuIiwiLy8gc2hpbSBmb3IgdXNpbmcgcHJvY2VzcyBpbiBicm93c2VyXG5cbnZhciBwcm9jZXNzID0gbW9kdWxlLmV4cG9ydHMgPSB7fTtcbnZhciBxdWV1ZSA9IFtdO1xudmFyIGRyYWluaW5nID0gZmFsc2U7XG52YXIgY3VycmVudFF1ZXVlO1xudmFyIHF1ZXVlSW5kZXggPSAtMTtcblxuZnVuY3Rpb24gY2xlYW5VcE5leHRUaWNrKCkge1xuICAgIGRyYWluaW5nID0gZmFsc2U7XG4gICAgaWYgKGN1cnJlbnRRdWV1ZS5sZW5ndGgpIHtcbiAgICAgICAgcXVldWUgPSBjdXJyZW50UXVldWUuY29uY2F0KHF1ZXVlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBxdWV1ZUluZGV4ID0gLTE7XG4gICAgfVxuICAgIGlmIChxdWV1ZS5sZW5ndGgpIHtcbiAgICAgICAgZHJhaW5RdWV1ZSgpO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gZHJhaW5RdWV1ZSgpIHtcbiAgICBpZiAoZHJhaW5pbmcpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB2YXIgdGltZW91dCA9IHNldFRpbWVvdXQoY2xlYW5VcE5leHRUaWNrKTtcbiAgICBkcmFpbmluZyA9IHRydWU7XG5cbiAgICB2YXIgbGVuID0gcXVldWUubGVuZ3RoO1xuICAgIHdoaWxlKGxlbikge1xuICAgICAgICBjdXJyZW50UXVldWUgPSBxdWV1ZTtcbiAgICAgICAgcXVldWUgPSBbXTtcbiAgICAgICAgd2hpbGUgKCsrcXVldWVJbmRleCA8IGxlbikge1xuICAgICAgICAgICAgaWYgKGN1cnJlbnRRdWV1ZSkge1xuICAgICAgICAgICAgICAgIGN1cnJlbnRRdWV1ZVtxdWV1ZUluZGV4XS5ydW4oKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBxdWV1ZUluZGV4ID0gLTE7XG4gICAgICAgIGxlbiA9IHF1ZXVlLmxlbmd0aDtcbiAgICB9XG4gICAgY3VycmVudFF1ZXVlID0gbnVsbDtcbiAgICBkcmFpbmluZyA9IGZhbHNlO1xuICAgIGNsZWFyVGltZW91dCh0aW1lb3V0KTtcbn1cblxucHJvY2Vzcy5uZXh0VGljayA9IGZ1bmN0aW9uIChmdW4pIHtcbiAgICB2YXIgYXJncyA9IG5ldyBBcnJheShhcmd1bWVudHMubGVuZ3RoIC0gMSk7XG4gICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPiAxKSB7XG4gICAgICAgIGZvciAodmFyIGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBhcmdzW2kgLSAxXSA9IGFyZ3VtZW50c1tpXTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBxdWV1ZS5wdXNoKG5ldyBJdGVtKGZ1biwgYXJncykpO1xuICAgIGlmIChxdWV1ZS5sZW5ndGggPT09IDEgJiYgIWRyYWluaW5nKSB7XG4gICAgICAgIHNldFRpbWVvdXQoZHJhaW5RdWV1ZSwgMCk7XG4gICAgfVxufTtcblxuLy8gdjggbGlrZXMgcHJlZGljdGlibGUgb2JqZWN0c1xuZnVuY3Rpb24gSXRlbShmdW4sIGFycmF5KSB7XG4gICAgdGhpcy5mdW4gPSBmdW47XG4gICAgdGhpcy5hcnJheSA9IGFycmF5O1xufVxuSXRlbS5wcm90b3R5cGUucnVuID0gZnVuY3Rpb24gKCkge1xuICAgIHRoaXMuZnVuLmFwcGx5KG51bGwsIHRoaXMuYXJyYXkpO1xufTtcbnByb2Nlc3MudGl0bGUgPSAnYnJvd3Nlcic7XG5wcm9jZXNzLmJyb3dzZXIgPSB0cnVlO1xucHJvY2Vzcy5lbnYgPSB7fTtcbnByb2Nlc3MuYXJndiA9IFtdO1xucHJvY2Vzcy52ZXJzaW9uID0gJyc7IC8vIGVtcHR5IHN0cmluZyB0byBhdm9pZCByZWdleHAgaXNzdWVzXG5wcm9jZXNzLnZlcnNpb25zID0ge307XG5cbmZ1bmN0aW9uIG5vb3AoKSB7fVxuXG5wcm9jZXNzLm9uID0gbm9vcDtcbnByb2Nlc3MuYWRkTGlzdGVuZXIgPSBub29wO1xucHJvY2Vzcy5vbmNlID0gbm9vcDtcbnByb2Nlc3Mub2ZmID0gbm9vcDtcbnByb2Nlc3MucmVtb3ZlTGlzdGVuZXIgPSBub29wO1xucHJvY2Vzcy5yZW1vdmVBbGxMaXN0ZW5lcnMgPSBub29wO1xucHJvY2Vzcy5lbWl0ID0gbm9vcDtcblxucHJvY2Vzcy5iaW5kaW5nID0gZnVuY3Rpb24gKG5hbWUpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3Byb2Nlc3MuYmluZGluZyBpcyBub3Qgc3VwcG9ydGVkJyk7XG59O1xuXG5wcm9jZXNzLmN3ZCA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuICcvJyB9O1xucHJvY2Vzcy5jaGRpciA9IGZ1bmN0aW9uIChkaXIpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3Byb2Nlc3MuY2hkaXIgaXMgbm90IHN1cHBvcnRlZCcpO1xufTtcbnByb2Nlc3MudW1hc2sgPSBmdW5jdGlvbigpIHsgcmV0dXJuIDA7IH07XG4iLCJcInVzZSBzdHJpY3RcIjtcclxuZXhwb3J0IHZhciBjaGFyQ29kZXMgPSBcclxuW1xyXG4gIC8vIDB4MDBcclxuICBbMHgwMCwweDAwXSxcclxuICBbMHgwMCwweDAwXSxcclxuICBbMHgwMCwweDAwXSxcclxuICBbMHgwMCwweDAwXSxcclxuICBbMHgwMCwweDAwXSxcclxuICBbMHgwMCwweDAwXSxcclxuICBbMHgwMCwweDAwXSxcclxuICBbMHgwMCwweDAwXSwgIFxyXG4gIFsweDAwLDB4MDBdLFxyXG4gIFsweDAwLDB4MDBdLFxyXG4gIFsweDAwLDB4MDBdLFxyXG4gIFsweDAwLDB4MDBdLFxyXG4gIFsweDAwLDB4MDBdLFxyXG4gIFsweDAwLDB4MDBdLFxyXG4gIFsweDAwLDB4MDBdLFxyXG4gIFsweDAwLDB4MDBdLFxyXG4gIC8vIDB4MTBcclxuICBbMHgwMCwweDAwXSxcclxuICBbMHgwMCwweDAwXSxcclxuICBbMHgwMCwweDAwXSxcclxuICBbMHgwMCwweDAwXSxcclxuICBbMHgwMCwweDAwXSxcclxuICBbMHgwMCwweDAwXSxcclxuICBbMHgwMCwweDAwXSxcclxuICBbMHgwMCwweDAwXSwgIFxyXG4gIFsweDAwLDB4MDBdLFxyXG4gIFsweDAwLDB4MDBdLFxyXG4gIFsweDAwLDB4MDBdLFxyXG4gIFsweDAwLDB4MDBdLFxyXG4gIFsweDAwLDB4MDBdLFxyXG4gIFsweDAwLDB4MDBdLFxyXG4gIFsweDAwLDB4MDBdLFxyXG4gIFsweDAwLDB4MDBdLFxyXG4gIC8vIDB4MjBcclxuICBbMHgwMCwweDAwXSxcclxuICBbMHg2MSwweDAwXSxcclxuICBbMHg2MiwweDAwXSxcclxuICBbMHg2MywweDAwXSxcclxuICBbMHg2NCwweDAwXSxcclxuICBbMHg2NSwweDAwXSxcclxuICBbMHg2NiwweDAwXSxcclxuICBbMHg2NywweDAwXSwgIFxyXG4gIFsweDY4LDB4MDBdLFxyXG4gIFsweDY5LDB4MDBdLFxyXG4gIFsweDZiLDB4MDBdLFxyXG4gIFsweDZhLDB4MDBdLFxyXG4gIFsweDJmLDB4MDBdLFxyXG4gIFsweDJhLDB4MDBdLFxyXG4gIFsweDJlLDB4MDBdLFxyXG4gIFsweDJkLDB4MDBdLFxyXG4gIC8vIDB4MzBcclxuICBbMHgyMCwweDAwXSxcclxuICBbMHgyMSwweDAwXSxcclxuICBbMHgyMiwweDAwXSxcclxuICBbMHgyMywweDAwXSxcclxuICBbMHgyNCwweDAwXSxcclxuICBbMHgyNSwweDAwXSxcclxuICBbMHgyNiwweDAwXSxcclxuICBbMHgyNywweDAwXSwgIFxyXG4gIFsweDI4LDB4MDBdLFxyXG4gIFsweDI5LDB4MDBdLFxyXG4gIFsweDRmLDB4MDBdLFxyXG4gIFsweDJjLDB4MDBdLFxyXG4gIFsweDUxLDB4MDBdLFxyXG4gIFsweDJiLDB4MDBdLFxyXG4gIFsweDU3LDB4MDBdLFxyXG4gIFsweDQ5LDB4MDBdLFxyXG4gIC8vIDB4NDBcclxuICBbMHg1NSwweDAwXSxcclxuICBbMHgwMSwweDAwXSxcclxuICBbMHgwMiwweDAwXSxcclxuICBbMHgwMywweDAwXSxcclxuICBbMHgwNCwweDAwXSxcclxuICBbMHgwNSwweDAwXSxcclxuICBbMHgwNiwweDAwXSxcclxuICBbMHgwNywweDAwXSwgIFxyXG4gIFsweDA4LDB4MDBdLFxyXG4gIFsweDA5LDB4MDBdLFxyXG4gIFsweDBhLDB4MDBdLFxyXG4gIFsweDBiLDB4MDBdLFxyXG4gIFsweDBjLDB4MDBdLFxyXG4gIFsweDBkLDB4MDBdLFxyXG4gIFsweDBlLDB4MDBdLFxyXG4gIFsweDBmLDB4MDBdLFxyXG4gIC8vIDB4NTBcclxuICBbMHgxMCwweDAwXSxcclxuICBbMHgxMSwweDAwXSxcclxuICBbMHgxMiwweDAwXSxcclxuICBbMHgxMywweDAwXSxcclxuICBbMHgxNCwweDAwXSxcclxuICBbMHgxNSwweDAwXSxcclxuICBbMHgxNiwweDAwXSxcclxuICBbMHgxNywweDAwXSwgIFxyXG4gIFsweDE4LDB4MDBdLFxyXG4gIFsweDE5LDB4MDBdLFxyXG4gIFsweDFhLDB4MDBdLFxyXG4gIFsweDUyLDB4MDBdLFxyXG4gIFsweGRkLDB4MDBdLFxyXG4gIFsweDU0LDB4MDBdLFxyXG4gIFsweDAwLDB4MDBdLFxyXG4gIFsweDNjLDB4MDBdLFxyXG4gIC8vIDB4NjBcclxuICBbMHgwMCwweDAwXSxcclxuICBbMHgwMSwweDgwXSxcclxuICBbMHgwMiwweDgwXSxcclxuICBbMHgwMywweDgwXSxcclxuICBbMHgwNCwweDgwXSxcclxuICBbMHgwNSwweDgwXSxcclxuICBbMHgwNiwweDgwXSxcclxuICBbMHgwNywweDgwXSwgIFxyXG4gIFsweDA4LDB4ODBdLFxyXG4gIFsweDA5LDB4ODBdLFxyXG4gIFsweDBhLDB4ODBdLFxyXG4gIFsweDBiLDB4ODBdLFxyXG4gIFsweDBjLDB4ODBdLFxyXG4gIFsweDBkLDB4ODBdLFxyXG4gIFsweDBlLDB4ODBdLFxyXG4gIFsweDBmLDB4ODBdLFxyXG4gIC8vIDB4N2ZcclxuICBbMHgxMCwweDgwXSxcclxuICBbMHgxMSwweDgwXSxcclxuICBbMHgxMiwweDgwXSxcclxuICBbMHgxMywweDgwXSxcclxuICBbMHgxNCwweDgwXSxcclxuICBbMHgxNSwweDgwXSxcclxuICBbMHgxNiwweDgwXSxcclxuICBbMHgxNywweDgwXSwgIFxyXG4gIFsweDE4LDB4ODBdLFxyXG4gIFsweDE5LDB4ODBdLFxyXG4gIFsweDFhLDB4ODBdLFxyXG4gIFsweDAwLDB4MDBdLFxyXG4gIFsweDAwLDB4MDBdLFxyXG4gIFsweDAwLDB4MDBdLFxyXG4gIFsweDAwLDB4MDBdLFxyXG4gIFsweDAwLDB4MDBdXHJcbl07XHJcblxyXG5leHBvcnQgdmFyIGNhbmFDb2RlcyA9XHJcblsgXHJcbiAgLy8gMHhmZjYwXHJcbiAgWzB4MDAsMHgwMF0sIC8vXHJcbiAgWzB4YmQsMHgwMF0sIC8vIO+9oVxyXG4gIFsweDlkLDB4MDBdLCAvLyDvvaJcclxuICBbMHhiMSwweDAwXSwgLy8g772jXHJcbiAgWzB4YjUsMHgwMF0sIC8vIO+9pFxyXG4gIFsweGI5LDB4MDBdLCAvLyDvvaVcclxuICBbMHhiNCwweDAwXSwgLy8g772mXHJcbiAgWzB4OWUsMHgwMF0sIC8vIO+9p1xyXG4gIFsweGIyLDB4MDBdLCAvLyDvvahcclxuICBbMHhiNiwweDAwXSwgLy8g772pXHJcbiAgWzB4YmEsMHgwMF0sIC8vIO+9qlxyXG4gIFsweGJlLDB4MDBdLCAvLyDvvatcclxuICBbMHg5ZiwweDAwXSwgLy8g772sXHJcbiAgWzB4YjMsMHgwMF0sIC8vIO+9rVxyXG4gIFsweGI3LDB4MDBdLCAvLyDvva5cclxuICBbMHhiYiwweDAwXSwgLy8g772vXHJcbiAgXHJcbiAgWzB4YmYsMHgwMF0sIC8vIC1cclxuICBbMHhhMywweDAwXSwgLy8g772xXHJcbiAgWzB4ODUsMHgwMF0sIC8vIO+9slxyXG4gIFsweGE0LDB4MDBdLCAvLyDvvbNcclxuICBbMHhhNSwweDAwXSwgLy8g7720XHJcbiAgWzB4YTYsMHgwMF0sIC8vIO+9tVxyXG4gIFsweDk0LDB4MDBdLCAvLyDvvbZcclxuICBbMHg4NywweDAwXSwgLy8g7723XHJcbiAgWzB4ODgsMHgwMF0sIC8vIO+9uFxyXG4gIFsweDljLDB4MDBdLCAvLyDvvblcclxuICBbMHg4MiwweDAwXSwgLy8g7726XHJcbiAgWzB4OTgsMHgwMF0sIC8vIO+9u1xyXG4gIFsweDg0LDB4MDBdLCAvLyDvvbxcclxuICBbMHg5MiwweDAwXSwgLy8g7729XHJcbiAgWzB4OTAsMHgwMF0sIC8vIO+9vlxyXG4gIFsweDgzLDB4MDBdLCAvLyDvvb9cclxuXHJcbiAgWzB4OTEsMHgwMF0sIC8vIO++gFxyXG4gIFsweDgxLDB4MDBdLCAvLyDvvoFcclxuICBbMHg5YSwweDAwXSwgLy8g776CXHJcbiAgWzB4OTcsMHgwMF0sIC8vIO++g1xyXG4gIFsweDkzLDB4MDBdLCAvLyDvvoRcclxuICBbMHg5NSwweDAwXSwgLy8g776FXHJcbiAgWzB4ODksMHgwMF0sIC8vIO++hlxyXG4gIFsweGExLDB4MDBdLCAvLyDvvodcclxuICBbMHhhZiwweDAwXSwgLy8g776IXHJcbiAgWzB4OGIsMHgwMF0sIC8vIO++iVxyXG4gIFsweDg2LDB4MDBdLCAvLyDvvopcclxuICBbMHg5NiwweDAwXSwgLy8g776LXHJcbiAgWzB4YTIsMHgwMF0sIC8vIO++jFxyXG4gIFsweGFiLDB4MDBdLCAvLyDvvo1cclxuICBbMHhhYSwweDAwXSwgLy8g776OXHJcbiAgWzB4OGEsMHgwMF0sIC8vIO++j1xyXG4gIFxyXG4gIFsweDhlLDB4MDBdLCAvLyDvvpBcclxuICBbMHhiMCwweDAwXSwgLy8g776RXHJcbiAgWzB4YWQsMHgwMF0sIC8vIO++klxyXG4gIFsweDhkLDB4MDBdLCAvLyDvvpNcclxuICBbMHhhNywweDAwXSwgLy8g776UXHJcbiAgWzB4YTgsMHgwMF0sIC8vIO++lVxyXG4gIFsweGE5LDB4MDBdLCAvLyDvvpZcclxuICBbMHg4ZiwweDAwXSwgLy8g776XXHJcbiAgWzB4OGMsMHgwMF0sIC8vIO++mFxyXG4gIFsweGFlLDB4MDBdLCAvLyDvvplcclxuICBbMHhhYywweDAwXSwgLy8g776aXHJcbiAgWzB4OWIsMHgwMF0sIC8vIO++m1xyXG4gIFsweGEwLDB4MDBdLCAvLyDvvpxcclxuICBbMHg5OSwweDAwXSwgLy8g776dXHJcbiAgWzB4YmMsMHgwMF0sIC8vIO++nlxyXG4gIFsweGI4LDB4MDBdLCAvLyDvvp9cclxuXHJcbl07XHJcbiIsIlwidXNlIHN0cmljdFwiO1xyXG5leHBvcnQgdmFyIGZvbnREYXRhID0gW1xyXG4vLyAjMHgwMDAgXHJcblsgXHJcblwiMDAwMDAwMDBcIixcclxuXCIwMDAwMDAwMFwiLFxyXG5cIjAwMDAwMDAwXCIsXHJcblwiMDAwMDAwMDBcIixcclxuXCIwMDAwMDAwMFwiLFxyXG5cIjAwMDAwMDAwXCIsXHJcblwiMDAwMDAwMDBcIixcclxuXCIwMDAwMDAwMFwiXHJcbl0sXHJcbi8vICMweDAwMSBcclxuWyBcclxuXCIwMDAxMTAwMFwiLFxyXG5cIjAwMTAwMTAwXCIsXHJcblwiMDEwMDAwMTBcIixcclxuXCIwMTExMTExMFwiLFxyXG5cIjAxMDAwMDEwXCIsXHJcblwiMDEwMDAwMTBcIixcclxuXCIwMTAwMDAxMFwiLFxyXG5cIjAwMDAwMDAwXCJcclxuXSxcclxuLy8gIzB4MDAyIFxyXG5bIFxyXG5cIjAxMTExMTAwXCIsXHJcblwiMDAxMDAwMTBcIixcclxuXCIwMDEwMDAxMFwiLFxyXG5cIjAwMTExMTAwXCIsXHJcblwiMDAxMDAwMTBcIixcclxuXCIwMDEwMDAxMFwiLFxyXG5cIjAxMTExMTAwXCIsXHJcblwiMDAwMDAwMDBcIlxyXG5dLFxyXG4vLyAjMHgwMDMgXHJcblsgXHJcblwiMDAwMTExMDBcIixcclxuXCIwMDEwMDAxMFwiLFxyXG5cIjAxMDAwMDAwXCIsXHJcblwiMDEwMDAwMDBcIixcclxuXCIwMTAwMDAwMFwiLFxyXG5cIjAwMTAwMDEwXCIsXHJcblwiMDAwMTExMDBcIixcclxuXCIwMDAwMDAwMFwiXHJcbl0sXHJcbi8vICMweDAwNCBcclxuWyBcclxuXCIwMTExMTAwMFwiLFxyXG5cIjAwMTAwMTAwXCIsXHJcblwiMDAxMDAwMTBcIixcclxuXCIwMDEwMDAxMFwiLFxyXG5cIjAwMTAwMDEwXCIsXHJcblwiMDAxMDAxMDBcIixcclxuXCIwMTExMTAwMFwiLFxyXG5cIjAwMDAwMDAwXCJcclxuXSxcclxuLy8gIzB4MDA1IFxyXG5bIFxyXG5cIjAxMTExMTEwXCIsXHJcblwiMDEwMDAwMDBcIixcclxuXCIwMTAwMDAwMFwiLFxyXG5cIjAxMTExMDAwXCIsXHJcblwiMDEwMDAwMDBcIixcclxuXCIwMTAwMDAwMFwiLFxyXG5cIjAxMTExMTEwXCIsXHJcblwiMDAwMDAwMDBcIlxyXG5dLFxyXG4vLyAjMHgwMDYgXHJcblsgXHJcblwiMDExMTExMTBcIixcclxuXCIwMTAwMDAwMFwiLFxyXG5cIjAxMDAwMDAwXCIsXHJcblwiMDExMTEwMDBcIixcclxuXCIwMTAwMDAwMFwiLFxyXG5cIjAxMDAwMDAwXCIsXHJcblwiMDEwMDAwMDBcIixcclxuXCIwMDAwMDAwMFwiXHJcbl0sXHJcbi8vICMweDAwNyBcclxuWyBcclxuXCIwMDAxMTEwMFwiLFxyXG5cIjAwMTAwMDEwXCIsXHJcblwiMDEwMDAwMDBcIixcclxuXCIwMTAwMTExMFwiLFxyXG5cIjAxMDAwMDEwXCIsXHJcblwiMDAxMDAwMTBcIixcclxuXCIwMDAxMTEwMFwiLFxyXG5cIjAwMDAwMDAwXCJcclxuXSxcclxuLy8gIzB4MDA4IFxyXG5bIFxyXG5cIjAxMDAwMDEwXCIsXHJcblwiMDEwMDAwMTBcIixcclxuXCIwMTAwMDAxMFwiLFxyXG5cIjAxMTExMTEwXCIsXHJcblwiMDEwMDAwMTBcIixcclxuXCIwMTAwMDAxMFwiLFxyXG5cIjAxMDAwMDEwXCIsXHJcblwiMDAwMDAwMDBcIlxyXG5dLFxyXG4vLyAjMHgwMDkgXHJcblsgXHJcblwiMDAwMTExMDBcIixcclxuXCIwMDAwMTAwMFwiLFxyXG5cIjAwMDAxMDAwXCIsXHJcblwiMDAwMDEwMDBcIixcclxuXCIwMDAwMTAwMFwiLFxyXG5cIjAwMDAxMDAwXCIsXHJcblwiMDAwMTExMDBcIixcclxuXCIwMDAwMDAwMFwiXHJcbl0sXHJcbi8vICMweDAwYSBcclxuWyBcclxuXCIwMDAwMTExMFwiLFxyXG5cIjAwMDAwMTAwXCIsXHJcblwiMDAwMDAxMDBcIixcclxuXCIwMDAwMDEwMFwiLFxyXG5cIjAwMDAwMTAwXCIsXHJcblwiMDEwMDAxMDBcIixcclxuXCIwMDExMTAwMFwiLFxyXG5cIjAwMDAwMDAwXCJcclxuXSxcclxuLy8gIzB4MDBiIFxyXG5bIFxyXG5cIjAxMDAwMDEwXCIsXHJcblwiMDEwMDAxMDBcIixcclxuXCIwMTAwMTAwMFwiLFxyXG5cIjAxMTEwMDAwXCIsXHJcblwiMDEwMDEwMDBcIixcclxuXCIwMTAwMDEwMFwiLFxyXG5cIjAxMDAwMDEwXCIsXHJcblwiMDAwMDAwMDBcIlxyXG5dLFxyXG4vLyAjMHgwMGMgXHJcblsgXHJcblwiMDEwMDAwMDBcIixcclxuXCIwMTAwMDAwMFwiLFxyXG5cIjAxMDAwMDAwXCIsXHJcblwiMDEwMDAwMDBcIixcclxuXCIwMTAwMDAwMFwiLFxyXG5cIjAxMDAwMDAwXCIsXHJcblwiMDExMTExMTBcIixcclxuXCIwMDAwMDAwMFwiXHJcbl0sXHJcbi8vICMweDAwZCBcclxuWyBcclxuXCIwMTAwMDAxMFwiLFxyXG5cIjAxMTAwMTEwXCIsXHJcblwiMDEwMTEwMTBcIixcclxuXCIwMTAxMTAxMFwiLFxyXG5cIjAxMDAwMDEwXCIsXHJcblwiMDEwMDAwMTBcIixcclxuXCIwMTAwMDAxMFwiLFxyXG5cIjAwMDAwMDAwXCJcclxuXSxcclxuLy8gIzB4MDBlIFxyXG5bIFxyXG5cIjAxMDAwMDEwXCIsXHJcblwiMDExMDAwMTBcIixcclxuXCIwMTAxMDAxMFwiLFxyXG5cIjAxMDAxMDEwXCIsXHJcblwiMDEwMDAxMTBcIixcclxuXCIwMTAwMDAxMFwiLFxyXG5cIjAxMDAwMDEwXCIsXHJcblwiMDAwMDAwMDBcIlxyXG5dLFxyXG4vLyAjMHgwMGYgXHJcblsgXHJcblwiMDAwMTEwMDBcIixcclxuXCIwMDEwMDEwMFwiLFxyXG5cIjAxMDAwMDEwXCIsXHJcblwiMDEwMDAwMTBcIixcclxuXCIwMTAwMDAxMFwiLFxyXG5cIjAwMTAwMTAwXCIsXHJcblwiMDAwMTEwMDBcIixcclxuXCIwMDAwMDAwMFwiXHJcbl0sXHJcbi8vICMweDAxMCBcclxuWyBcclxuXCIwMTExMTEwMFwiLFxyXG5cIjAxMDAwMDEwXCIsXHJcblwiMDEwMDAwMTBcIixcclxuXCIwMTExMTEwMFwiLFxyXG5cIjAxMDAwMDAwXCIsXHJcblwiMDEwMDAwMDBcIixcclxuXCIwMTAwMDAwMFwiLFxyXG5cIjAwMDAwMDAwXCJcclxuXSxcclxuLy8gIzB4MDExIFxyXG5bIFxyXG5cIjAwMDExMDAwXCIsXHJcblwiMDAxMDAxMDBcIixcclxuXCIwMTAwMDAxMFwiLFxyXG5cIjAxMDAwMDEwXCIsXHJcblwiMDEwMDEwMTBcIixcclxuXCIwMDEwMDEwMFwiLFxyXG5cIjAwMDExMDEwXCIsXHJcblwiMDAwMDAwMDBcIlxyXG5dLFxyXG4vLyAjMHgwMTIgXHJcblsgXHJcblwiMDExMTExMDBcIixcclxuXCIwMTAwMDAxMFwiLFxyXG5cIjAxMDAwMDEwXCIsXHJcblwiMDExMTExMDBcIixcclxuXCIwMTAwMTAwMFwiLFxyXG5cIjAxMDAwMTAwXCIsXHJcblwiMDEwMDAwMTBcIixcclxuXCIwMDAwMDAwMFwiXHJcbl0sXHJcbi8vICMweDAxMyBcclxuWyBcclxuXCIwMDExMTEwMFwiLFxyXG5cIjAxMDAwMDEwXCIsXHJcblwiMDEwMDAwMDBcIixcclxuXCIwMDExMTEwMFwiLFxyXG5cIjAwMDAwMDEwXCIsXHJcblwiMDEwMDAwMTBcIixcclxuXCIwMDExMTEwMFwiLFxyXG5cIjAwMDAwMDAwXCJcclxuXSxcclxuLy8gIzB4MDE0IFxyXG5bIFxyXG5cIjAwMTExMTEwXCIsXHJcblwiMDAwMDEwMDBcIixcclxuXCIwMDAwMTAwMFwiLFxyXG5cIjAwMDAxMDAwXCIsXHJcblwiMDAwMDEwMDBcIixcclxuXCIwMDAwMTAwMFwiLFxyXG5cIjAwMDAxMDAwXCIsXHJcblwiMDAwMDAwMDBcIlxyXG5dLFxyXG4vLyAjMHgwMTUgXHJcblsgXHJcblwiMDEwMDAwMTBcIixcclxuXCIwMTAwMDAxMFwiLFxyXG5cIjAxMDAwMDEwXCIsXHJcblwiMDEwMDAwMTBcIixcclxuXCIwMTAwMDAxMFwiLFxyXG5cIjAxMDAwMDEwXCIsXHJcblwiMDAxMTExMDBcIixcclxuXCIwMDAwMDAwMFwiXHJcbl0sXHJcbi8vICMweDAxNiBcclxuWyBcclxuXCIwMTAwMDAxMFwiLFxyXG5cIjAxMDAwMDEwXCIsXHJcblwiMDEwMDAwMTBcIixcclxuXCIwMDEwMDEwMFwiLFxyXG5cIjAwMTAwMTAwXCIsXHJcblwiMDAwMTEwMDBcIixcclxuXCIwMDAxMTAwMFwiLFxyXG5cIjAwMDAwMDAwXCJcclxuXSxcclxuLy8gIzB4MDE3IFxyXG5bIFxyXG5cIjAxMDAwMDEwXCIsXHJcblwiMDEwMDAwMTBcIixcclxuXCIwMTAwMDAxMFwiLFxyXG5cIjAxMDExMDEwXCIsXHJcblwiMDEwMTEwMTBcIixcclxuXCIwMTEwMDExMFwiLFxyXG5cIjAxMDAwMDEwXCIsXHJcblwiMDAwMDAwMDBcIlxyXG5dLFxyXG4vLyAjMHgwMTggXHJcblsgXHJcblwiMDEwMDAwMTBcIixcclxuXCIwMTAwMDAxMFwiLFxyXG5cIjAwMTAwMTAwXCIsXHJcblwiMDAwMTEwMDBcIixcclxuXCIwMDEwMDEwMFwiLFxyXG5cIjAxMDAwMDEwXCIsXHJcblwiMDEwMDAwMTBcIixcclxuXCIwMDAwMDAwMFwiXHJcbl0sXHJcbi8vICMweDAxOSBcclxuWyBcclxuXCIwMDEwMDAxMFwiLFxyXG5cIjAwMTAwMDEwXCIsXHJcblwiMDAxMDAwMTBcIixcclxuXCIwMDAxMTEwMFwiLFxyXG5cIjAwMDAxMDAwXCIsXHJcblwiMDAwMDEwMDBcIixcclxuXCIwMDAwMTAwMFwiLFxyXG5cIjAwMDAwMDAwXCJcclxuXSxcclxuLy8gIzB4MDFhIFxyXG5bIFxyXG5cIjAxMTExMTEwXCIsXHJcblwiMDAwMDAwMTBcIixcclxuXCIwMDAwMDEwMFwiLFxyXG5cIjAwMDExMDAwXCIsXHJcblwiMDAxMDAwMDBcIixcclxuXCIwMTAwMDAwMFwiLFxyXG5cIjAxMTExMTEwXCIsXHJcblwiMDAwMDAwMDBcIlxyXG5dLFxyXG4vLyAjMHgwMWIgXHJcblsgXHJcblwiMDAwMDEwMDBcIixcclxuXCIwMDAwMTAwMFwiLFxyXG5cIjAwMDAxMDAwXCIsXHJcblwiMDAwMDEwMDBcIixcclxuXCIxMTExMTExMVwiLFxyXG5cIjAwMDAxMDAwXCIsXHJcblwiMDAwMDEwMDBcIixcclxuXCIwMDAwMTAwMFwiXHJcbl0sXHJcbi8vICMweDAxYyBcclxuWyBcclxuXCIwMDAwMTAwMFwiLFxyXG5cIjAwMDAxMDAwXCIsXHJcblwiMDAwMDEwMDBcIixcclxuXCIwMDAwMTAwMFwiLFxyXG5cIjAwMDAxMTExXCIsXHJcblwiMDAwMDAwMDBcIixcclxuXCIwMDAwMDAwMFwiLFxyXG5cIjAwMDAwMDAwXCJcclxuXSxcclxuLy8gIzB4MDFkIFxyXG5bIFxyXG5cIjAwMDAxMDAwXCIsXHJcblwiMDAwMDEwMDBcIixcclxuXCIwMDAwMTAwMFwiLFxyXG5cIjAwMDAxMDAwXCIsXHJcblwiMTExMTEwMDBcIixcclxuXCIwMDAwMDAwMFwiLFxyXG5cIjAwMDAwMDAwXCIsXHJcblwiMDAwMDAwMDBcIlxyXG5dLFxyXG4vLyAjMHgwMWUgXHJcblsgXHJcblwiMDAwMDEwMDBcIixcclxuXCIwMDAwMTAwMFwiLFxyXG5cIjAwMDAxMDAwXCIsXHJcblwiMDAwMDEwMDBcIixcclxuXCIwMDAwMTExMVwiLFxyXG5cIjAwMDAxMDAwXCIsXHJcblwiMDAwMDEwMDBcIixcclxuXCIwMDAwMTAwMFwiXHJcbl0sXHJcbi8vICMweDAxZiBcclxuWyBcclxuXCIwMDAwMTAwMFwiLFxyXG5cIjAwMDAxMDAwXCIsXHJcblwiMDAwMDEwMDBcIixcclxuXCIwMDAwMTAwMFwiLFxyXG5cIjExMTExMTExXCIsXHJcblwiMDAwMDAwMDBcIixcclxuXCIwMDAwMDAwMFwiLFxyXG5cIjAwMDAwMDAwXCJcclxuXSxcclxuLy8gIzB4MDIwIFxyXG5bIFxyXG5cIjAwMTExMTAwXCIsXHJcblwiMDEwMDAwMTBcIixcclxuXCIwMTAwMDExMFwiLFxyXG5cIjAxMDExMDEwXCIsXHJcblwiMDExMDAwMTBcIixcclxuXCIwMTAwMDAxMFwiLFxyXG5cIjAwMTExMTAwXCIsXHJcblwiMDAwMDAwMDBcIlxyXG5dLFxyXG4vLyAjMHgwMjEgXHJcblsgXHJcblwiMDAwMDEwMDBcIixcclxuXCIwMDAxMTAwMFwiLFxyXG5cIjAwMTAxMDAwXCIsXHJcblwiMDAwMDEwMDBcIixcclxuXCIwMDAwMTAwMFwiLFxyXG5cIjAwMDAxMDAwXCIsXHJcblwiMDAxMTExMTBcIixcclxuXCIwMDAwMDAwMFwiXHJcbl0sXHJcbi8vICMweDAyMiBcclxuWyBcclxuXCIwMDExMTEwMFwiLFxyXG5cIjAxMDAwMDEwXCIsXHJcblwiMDAwMDAwMTBcIixcclxuXCIwMDAwMTEwMFwiLFxyXG5cIjAwMTEwMDAwXCIsXHJcblwiMDEwMDAwMDBcIixcclxuXCIwMTExMTExMFwiLFxyXG5cIjAwMDAwMDAwXCJcclxuXSxcclxuLy8gIzB4MDIzIFxyXG5bIFxyXG5cIjAwMTExMTAwXCIsXHJcblwiMDEwMDAwMTBcIixcclxuXCIwMDAwMDAxMFwiLFxyXG5cIjAwMTExMTAwXCIsXHJcblwiMDAwMDAwMTBcIixcclxuXCIwMTAwMDAxMFwiLFxyXG5cIjAwMTExMTAwXCIsXHJcblwiMDAwMDAwMDBcIlxyXG5dLFxyXG4vLyAjMHgwMjQgXHJcblsgXHJcblwiMDAwMDAxMDBcIixcclxuXCIwMDAwMTEwMFwiLFxyXG5cIjAwMDEwMTAwXCIsXHJcblwiMDAxMDAxMDBcIixcclxuXCIwMTExMTExMFwiLFxyXG5cIjAwMDAwMTAwXCIsXHJcblwiMDAwMDAxMDBcIixcclxuXCIwMDAwMDAwMFwiXHJcbl0sXHJcbi8vICMweDAyNSBcclxuWyBcclxuXCIwMTExMTExMFwiLFxyXG5cIjAxMDAwMDAwXCIsXHJcblwiMDExMTEwMDBcIixcclxuXCIwMDAwMDEwMFwiLFxyXG5cIjAwMDAwMDEwXCIsXHJcblwiMDEwMDAxMDBcIixcclxuXCIwMDExMTAwMFwiLFxyXG5cIjAwMDAwMDAwXCJcclxuXSxcclxuLy8gIzB4MDI2IFxyXG5bIFxyXG5cIjAwMDExMTAwXCIsXHJcblwiMDAxMDAwMDBcIixcclxuXCIwMTAwMDAwMFwiLFxyXG5cIjAxMTExMTAwXCIsXHJcblwiMDEwMDAwMTBcIixcclxuXCIwMTAwMDAxMFwiLFxyXG5cIjAwMTExMTAwXCIsXHJcblwiMDAwMDAwMDBcIlxyXG5dLFxyXG4vLyAjMHgwMjcgXHJcblsgXHJcblwiMDExMTExMTBcIixcclxuXCIwMTAwMDAxMFwiLFxyXG5cIjAwMDAwMTAwXCIsXHJcblwiMDAwMDEwMDBcIixcclxuXCIwMDAxMDAwMFwiLFxyXG5cIjAwMDEwMDAwXCIsXHJcblwiMDAwMTAwMDBcIixcclxuXCIwMDAwMDAwMFwiXHJcbl0sXHJcbi8vICMweDAyOCBcclxuWyBcclxuXCIwMDExMTEwMFwiLFxyXG5cIjAxMDAwMDEwXCIsXHJcblwiMDEwMDAwMTBcIixcclxuXCIwMDExMTEwMFwiLFxyXG5cIjAxMDAwMDEwXCIsXHJcblwiMDEwMDAwMTBcIixcclxuXCIwMDExMTEwMFwiLFxyXG5cIjAwMDAwMDAwXCJcclxuXSxcclxuLy8gIzB4MDI5IFxyXG5bIFxyXG5cIjAwMTExMTAwXCIsXHJcblwiMDEwMDAwMTBcIixcclxuXCIwMTAwMDAxMFwiLFxyXG5cIjAwMTExMTEwXCIsXHJcblwiMDAwMDAwMTBcIixcclxuXCIwMDAwMDEwMFwiLFxyXG5cIjAwMTExMDAwXCIsXHJcblwiMDAwMDAwMDBcIlxyXG5dLFxyXG4vLyAjMHgwMmEgXHJcblsgXHJcblwiMDAwMDAwMDBcIixcclxuXCIwMDAwMDAwMFwiLFxyXG5cIjAwMDAwMDAwXCIsXHJcblwiMDExMTExMTBcIixcclxuXCIwMDAwMDAwMFwiLFxyXG5cIjAwMDAwMDAwXCIsXHJcblwiMDAwMDAwMDBcIixcclxuXCIwMDAwMDAwMFwiXHJcbl0sXHJcbi8vICMweDAyYiBcclxuWyBcclxuXCIwMDAwMDAwMFwiLFxyXG5cIjAwMDAwMDAwXCIsXHJcblwiMDExMTExMTBcIixcclxuXCIwMDAwMDAwMFwiLFxyXG5cIjAxMTExMTEwXCIsXHJcblwiMDAwMDAwMDBcIixcclxuXCIwMDAwMDAwMFwiLFxyXG5cIjAwMDAwMDAwXCJcclxuXSxcclxuLy8gIzB4MDJjIFxyXG5bIFxyXG5cIjAwMDAwMDAwXCIsXHJcblwiMDAwMDAwMDBcIixcclxuXCIwMDAwMTAwMFwiLFxyXG5cIjAwMDAwMDAwXCIsXHJcblwiMDAwMDAwMDBcIixcclxuXCIwMDAwMTAwMFwiLFxyXG5cIjAwMDAxMDAwXCIsXHJcblwiMDAwMTAwMDBcIlxyXG5dLFxyXG4vLyAjMHgwMmQgXHJcblsgXHJcblwiMDAwMDAwMDBcIixcclxuXCIwMDAwMDAxMFwiLFxyXG5cIjAwMDAwMTAwXCIsXHJcblwiMDAwMDEwMDBcIixcclxuXCIwMDAxMDAwMFwiLFxyXG5cIjAwMTAwMDAwXCIsXHJcblwiMDEwMDAwMDBcIixcclxuXCIwMDAwMDAwMFwiXHJcbl0sXHJcbi8vICMweDAyZSBcclxuWyBcclxuXCIwMDAwMDAwMFwiLFxyXG5cIjAwMDAwMDAwXCIsXHJcblwiMDAwMDAwMDBcIixcclxuXCIwMDAwMDAwMFwiLFxyXG5cIjAwMDAwMDAwXCIsXHJcblwiMDAwMTEwMDBcIixcclxuXCIwMDAxMTAwMFwiLFxyXG5cIjAwMDAwMDAwXCJcclxuXSxcclxuLy8gIzB4MDJmIFxyXG5bIFxyXG5cIjAwMDAwMDAwXCIsXHJcblwiMDAwMDAwMDBcIixcclxuXCIwMDAwMDAwMFwiLFxyXG5cIjAwMDAwMDAwXCIsXHJcblwiMDAwMDAwMDBcIixcclxuXCIwMDAwMTAwMFwiLFxyXG5cIjAwMDAxMDAwXCIsXHJcblwiMDAwMTAwMDBcIlxyXG5dLFxyXG4vLyAjMHgwMzAgXHJcblsgXHJcblwiMDAwMDAwMDBcIixcclxuXCIxMTExMTExMVwiLFxyXG5cIjAwMDAwMDAwXCIsXHJcblwiMDAwMDAwMDBcIixcclxuXCIwMDAwMDAwMFwiLFxyXG5cIjAwMDAwMDAwXCIsXHJcblwiMDAwMDAwMDBcIixcclxuXCIwMDAwMDAwMFwiXHJcbl0sXHJcbi8vICMweDAzMSBcclxuWyBcclxuXCIwMTAwMDAwMFwiLFxyXG5cIjAxMDAwMDAwXCIsXHJcblwiMDEwMDAwMDBcIixcclxuXCIwMTAwMDAwMFwiLFxyXG5cIjAxMDAwMDAwXCIsXHJcblwiMDEwMDAwMDBcIixcclxuXCIwMTAwMDAwMFwiLFxyXG5cIjAxMDAwMDAwXCJcclxuXSxcclxuLy8gIzB4MDMyIFxyXG5bIFxyXG5cIjEwMDAwMDAwXCIsXHJcblwiMTAwMDAwMDBcIixcclxuXCIxMDAwMDAwMFwiLFxyXG5cIjEwMDAwMDAwXCIsXHJcblwiMTAwMDAwMDBcIixcclxuXCIxMDAwMDAwMFwiLFxyXG5cIjEwMDAwMDAwXCIsXHJcblwiMTExMTExMTFcIlxyXG5dLFxyXG4vLyAjMHgwMzMgXHJcblsgXHJcblwiMDAwMDAwMDFcIixcclxuXCIwMDAwMDAwMVwiLFxyXG5cIjAwMDAwMDAxXCIsXHJcblwiMDAwMDAwMDFcIixcclxuXCIwMDAwMDAwMVwiLFxyXG5cIjAwMDAwMDAxXCIsXHJcblwiMDAwMDAwMDFcIixcclxuXCIxMTExMTExMVwiXHJcbl0sXHJcbi8vICMweDAzNCBcclxuWyBcclxuXCIwMDAwMDAwMFwiLFxyXG5cIjAwMDAwMDAwXCIsXHJcblwiMDAwMDAwMDBcIixcclxuXCIxMTExMTExMVwiLFxyXG5cIjAwMDAwMDAwXCIsXHJcblwiMDAwMDAwMDBcIixcclxuXCIwMDAwMDAwMFwiLFxyXG5cIjAwMDAwMDAwXCJcclxuXSxcclxuLy8gIzB4MDM1IFxyXG5bIFxyXG5cIjAwMDEwMDAwXCIsXHJcblwiMDAwMTAwMDBcIixcclxuXCIwMDAxMDAwMFwiLFxyXG5cIjAwMDEwMDAwXCIsXHJcblwiMDAwMTAwMDBcIixcclxuXCIwMDAxMDAwMFwiLFxyXG5cIjAwMDEwMDAwXCIsXHJcblwiMDAwMTAwMDBcIlxyXG5dLFxyXG4vLyAjMHgwMzYgXHJcblsgXHJcblwiMTExMTExMTFcIixcclxuXCIxMTExMTExMVwiLFxyXG5cIjAwMDAwMDAwXCIsXHJcblwiMDAwMDAwMDBcIixcclxuXCIwMDAwMDAwMFwiLFxyXG5cIjAwMDAwMDAwXCIsXHJcblwiMDAwMDAwMDBcIixcclxuXCIwMDAwMDAwMFwiXHJcbl0sXHJcbi8vICMweDAzNyBcclxuWyBcclxuXCIxMTAwMDAwMFwiLFxyXG5cIjExMDAwMDAwXCIsXHJcblwiMTEwMDAwMDBcIixcclxuXCIxMTAwMDAwMFwiLFxyXG5cIjExMDAwMDAwXCIsXHJcblwiMTEwMDAwMDBcIixcclxuXCIxMTAwMDAwMFwiLFxyXG5cIjExMDAwMDAwXCJcclxuXSxcclxuLy8gIzB4MDM4IFxyXG5bIFxyXG5cIjAwMDAwMDAwXCIsXHJcblwiMDAwMDAwMDBcIixcclxuXCIwMDAwMDAwMFwiLFxyXG5cIjAwMDAwMDAwXCIsXHJcblwiMDAwMDAwMDBcIixcclxuXCIxMTExMTExMVwiLFxyXG5cIjAwMDAwMDAwXCIsXHJcblwiMDAwMDAwMDBcIlxyXG5dLFxyXG4vLyAjMHgwMzkgXHJcblsgXHJcblwiMDAwMDAxMDBcIixcclxuXCIwMDAwMDEwMFwiLFxyXG5cIjAwMDAwMTAwXCIsXHJcblwiMDAwMDAxMDBcIixcclxuXCIwMDAwMDEwMFwiLFxyXG5cIjAwMDAwMTAwXCIsXHJcblwiMDAwMDAxMDBcIixcclxuXCIwMDAwMDEwMFwiXHJcbl0sXHJcbi8vICMweDAzYSBcclxuWyBcclxuXCIwMDAwMDAwMFwiLFxyXG5cIjAwMDAwMDAwXCIsXHJcblwiMDAwMDAwMDBcIixcclxuXCIwMDAwMDAwMFwiLFxyXG5cIjExMTExMTExXCIsXHJcblwiMTExMTExMTFcIixcclxuXCIxMTExMTExMVwiLFxyXG5cIjExMTExMTExXCJcclxuXSxcclxuLy8gIzB4MDNiIFxyXG5bIFxyXG5cIjAwMDAxMTExXCIsXHJcblwiMDAwMDExMTFcIixcclxuXCIwMDAwMTExMVwiLFxyXG5cIjAwMDAxMTExXCIsXHJcblwiMDAwMDExMTFcIixcclxuXCIwMDAwMTExMVwiLFxyXG5cIjAwMDAxMTExXCIsXHJcblwiMDAwMDExMTFcIlxyXG5dLFxyXG4vLyAjMHgwM2MgXHJcblsgXHJcblwiMDAwMDAwMDBcIixcclxuXCIwMDAwMDAwMFwiLFxyXG5cIjAwMDAwMDAwXCIsXHJcblwiMDAwMDAwMDBcIixcclxuXCIwMDAwMDAwMFwiLFxyXG5cIjAwMDAwMDAwXCIsXHJcblwiMDAwMDAwMDBcIixcclxuXCIxMTExMTExMVwiXHJcbl0sXHJcbi8vICMweDAzZCBcclxuWyBcclxuXCIwMDAwMDAwMVwiLFxyXG5cIjAwMDAwMDAxXCIsXHJcblwiMDAwMDAwMDFcIixcclxuXCIwMDAwMDAwMVwiLFxyXG5cIjAwMDAwMDAxXCIsXHJcblwiMDAwMDAwMDFcIixcclxuXCIwMDAwMDAwMVwiLFxyXG5cIjAwMDAwMDAxXCJcclxuXSxcclxuLy8gIzB4MDNlIFxyXG5bIFxyXG5cIjAwMDAwMDAwXCIsXHJcblwiMDAwMDAwMDBcIixcclxuXCIwMDAwMDAwMFwiLFxyXG5cIjAwMDAwMDAwXCIsXHJcblwiMDAwMDAwMDBcIixcclxuXCIwMDAwMDAwMFwiLFxyXG5cIjExMTExMTExXCIsXHJcblwiMTExMTExMTFcIlxyXG5dLFxyXG4vLyAjMHgwM2YgXHJcblsgXHJcblwiMDAwMDAwMTFcIixcclxuXCIwMDAwMDAxMVwiLFxyXG5cIjAwMDAwMDExXCIsXHJcblwiMDAwMDAwMTFcIixcclxuXCIwMDAwMDAxMVwiLFxyXG5cIjAwMDAwMDExXCIsXHJcblwiMDAwMDAwMTFcIixcclxuXCIwMDAwMDAxMVwiXHJcbl0sXHJcbi8vICMweDA0MCBcclxuWyBcclxuXCIwMDAwMDAwMFwiLFxyXG5cIjAwMDAwMDAwXCIsXHJcblwiMDAwMDEwMDBcIixcclxuXCIwMDAwMDEwMFwiLFxyXG5cIjExMTExMTEwXCIsXHJcblwiMDAwMDAxMDBcIixcclxuXCIwMDAwMTAwMFwiLFxyXG5cIjAwMDAwMDAwXCJcclxuXSxcclxuLy8gIzB4MDQxIFxyXG5bIFxyXG5cIjAwMDAxMDAwXCIsXHJcblwiMDAwMTExMDBcIixcclxuXCIwMDExMTExMFwiLFxyXG5cIjAxMTExMTExXCIsXHJcblwiMDExMTExMTFcIixcclxuXCIwMDAxMTEwMFwiLFxyXG5cIjAwMTExMTEwXCIsXHJcblwiMDAwMDAwMDBcIlxyXG5dLFxyXG4vLyAjMHgwNDIgXHJcblsgXHJcblwiMTExMTExMTFcIixcclxuXCIwMTExMTExMVwiLFxyXG5cIjAwMTExMTExXCIsXHJcblwiMDAwMTExMTFcIixcclxuXCIwMDAwMTExMVwiLFxyXG5cIjAwMDAwMTExXCIsXHJcblwiMDAwMDAwMTFcIixcclxuXCIwMDAwMDAwMVwiXHJcbl0sXHJcbi8vICMweDA0MyBcclxuWyBcclxuXCIxMTExMTExMVwiLFxyXG5cIjExMTExMTExXCIsXHJcblwiMTExMTExMTFcIixcclxuXCIxMTExMTExMVwiLFxyXG5cIjExMTExMTExXCIsXHJcblwiMTExMTExMTFcIixcclxuXCIxMTExMTExMVwiLFxyXG5cIjExMTExMTExXCJcclxuXSxcclxuLy8gIzB4MDQ0IFxyXG5bIFxyXG5cIjAwMDAxMDAwXCIsXHJcblwiMDAwMTExMDBcIixcclxuXCIwMDExMTExMFwiLFxyXG5cIjAxMTExMTExXCIsXHJcblwiMDAxMTExMTBcIixcclxuXCIwMDAxMTEwMFwiLFxyXG5cIjAwMDAxMDAwXCIsXHJcblwiMDAwMDAwMDBcIlxyXG5dLFxyXG4vLyAjMHgwNDUgXHJcblsgXHJcblwiMDAwMDAwMDBcIixcclxuXCIwMDAwMDAwMFwiLFxyXG5cIjAwMDEwMDAwXCIsXHJcblwiMDAxMDAwMDBcIixcclxuXCIwMTExMTExMVwiLFxyXG5cIjAwMTAwMDAwXCIsXHJcblwiMDAwMTAwMDBcIixcclxuXCIwMDAwMDAwMFwiXHJcbl0sXHJcbi8vICMweDA0NiBcclxuWyBcclxuXCIwMDAwMTAwMFwiLFxyXG5cIjAwMDExMTAwXCIsXHJcblwiMDAxMDEwMTBcIixcclxuXCIwMTExMTExMVwiLFxyXG5cIjAwMTAxMDEwXCIsXHJcblwiMDAwMDEwMDBcIixcclxuXCIwMDAwMTAwMFwiLFxyXG5cIjAwMDAwMDAwXCJcclxuXSxcclxuLy8gIzB4MDQ3IFxyXG5bIFxyXG5cIjAwMDAwMDAwXCIsXHJcblwiMDAxMTExMDBcIixcclxuXCIwMTExMTExMFwiLFxyXG5cIjAxMTExMTEwXCIsXHJcblwiMDExMTExMTBcIixcclxuXCIwMTExMTExMFwiLFxyXG5cIjAwMTExMTAwXCIsXHJcblwiMDAwMDAwMDBcIlxyXG5dLFxyXG4vLyAjMHgwNDggXHJcblsgXHJcblwiMDAwMDAwMDBcIixcclxuXCIwMDExMTEwMFwiLFxyXG5cIjAxMDAwMDEwXCIsXHJcblwiMDEwMDAwMTBcIixcclxuXCIwMTAwMDAxMFwiLFxyXG5cIjAxMDAwMDEwXCIsXHJcblwiMDAxMTExMDBcIixcclxuXCIwMDAwMDAwMFwiXHJcbl0sXHJcbi8vICMweDA0OSBcclxuWyBcclxuXCIwMDExMTEwMFwiLFxyXG5cIjAxMDAwMDEwXCIsXHJcblwiMDAwMDAwMTBcIixcclxuXCIwMDAwMTEwMFwiLFxyXG5cIjAwMDEwMDAwXCIsXHJcblwiMDAwMDAwMDBcIixcclxuXCIwMDAxMDAwMFwiLFxyXG5cIjAwMDAwMDAwXCJcclxuXSxcclxuLy8gIzB4MDRhIFxyXG5bIFxyXG5cIjExMTExMTExXCIsXHJcblwiMTEwMDAwMTFcIixcclxuXCIxMDAwMDAwMVwiLFxyXG5cIjEwMDAwMDAxXCIsXHJcblwiMTAwMDAwMDFcIixcclxuXCIxMDAwMDAwMVwiLFxyXG5cIjExMDAwMDExXCIsXHJcblwiMTExMTExMTFcIlxyXG5dLFxyXG4vLyAjMHgwNGIgXHJcblsgXHJcblwiMDAwMDAwMDBcIixcclxuXCIwMDAwMDAwMFwiLFxyXG5cIjAwMDAwMDAwXCIsXHJcblwiMDAwMDAwMDBcIixcclxuXCIwMDAwMDAxMVwiLFxyXG5cIjAwMDAwMTAwXCIsXHJcblwiMDAwMDEwMDBcIixcclxuXCIwMDAwMTAwMFwiXHJcbl0sXHJcbi8vICMweDA0YyBcclxuWyBcclxuXCIwMDAwMDAwMFwiLFxyXG5cIjAwMDAwMDAwXCIsXHJcblwiMDAwMDAwMDBcIixcclxuXCIwMDAwMDAwMFwiLFxyXG5cIjExMDAwMDAwXCIsXHJcblwiMDAxMDAwMDBcIixcclxuXCIwMDAxMDAwMFwiLFxyXG5cIjAwMDEwMDAwXCJcclxuXSxcclxuLy8gIzB4MDRkIFxyXG5bIFxyXG5cIjEwMDAwMDAwXCIsXHJcblwiMTEwMDAwMDBcIixcclxuXCIxMTEwMDAwMFwiLFxyXG5cIjExMTEwMDAwXCIsXHJcblwiMTExMTEwMDBcIixcclxuXCIxMTExMTEwMFwiLFxyXG5cIjExMTExMTEwXCIsXHJcblwiMTExMTExMTFcIlxyXG5dLFxyXG4vLyAjMHgwNGUgXHJcblsgXHJcblwiMDAwMDAwMDFcIixcclxuXCIwMDAwMDAxMVwiLFxyXG5cIjAwMDAwMTExXCIsXHJcblwiMDAwMDExMTFcIixcclxuXCIwMDAxMTExMVwiLFxyXG5cIjAwMTExMTExXCIsXHJcblwiMDExMTExMTFcIixcclxuXCIxMTExMTExMVwiXHJcbl0sXHJcbi8vICMweDA0ZiBcclxuWyBcclxuXCIwMDAwMDAwMFwiLFxyXG5cIjAwMDAwMDAwXCIsXHJcblwiMDAwMDEwMDBcIixcclxuXCIwMDAwMDAwMFwiLFxyXG5cIjAwMDAwMDAwXCIsXHJcblwiMDAwMDEwMDBcIixcclxuXCIwMDAwMDAwMFwiLFxyXG5cIjAwMDAwMDAwXCJcclxuXSxcclxuLy8gIzB4MDUwIFxyXG5bIFxyXG5cIjAwMDAwMDAwXCIsXHJcblwiMDAwMDEwMDBcIixcclxuXCIwMDAxMTEwMFwiLFxyXG5cIjAwMTAxMDEwXCIsXHJcblwiMDAwMDEwMDBcIixcclxuXCIwMDAwMTAwMFwiLFxyXG5cIjAwMDAxMDAwXCIsXHJcblwiMDAwMDAwMDBcIlxyXG5dLFxyXG4vLyAjMHgwNTEgXHJcblsgXHJcblwiMDAwMDExMTBcIixcclxuXCIwMDAxMTAwMFwiLFxyXG5cIjAwMTEwMDAwXCIsXHJcblwiMDExMDAwMDBcIixcclxuXCIwMDExMDAwMFwiLFxyXG5cIjAwMDExMDAwXCIsXHJcblwiMDAwMDExMTBcIixcclxuXCIwMDAwMDAwMFwiXHJcbl0sXHJcbi8vICMweDA1MiBcclxuWyBcclxuXCIwMDExMTEwMFwiLFxyXG5cIjAwMTAwMDAwXCIsXHJcblwiMDAxMDAwMDBcIixcclxuXCIwMDEwMDAwMFwiLFxyXG5cIjAwMTAwMDAwXCIsXHJcblwiMDAxMDAwMDBcIixcclxuXCIwMDExMTEwMFwiLFxyXG5cIjAwMDAwMDAwXCJcclxuXSxcclxuLy8gIzB4MDUzIFxyXG5bIFxyXG5cIjAwMTEwMTEwXCIsXHJcblwiMDExMTExMTFcIixcclxuXCIwMTExMTExMVwiLFxyXG5cIjAxMTExMTExXCIsXHJcblwiMDAxMTExMTBcIixcclxuXCIwMDAxMTEwMFwiLFxyXG5cIjAwMDAxMDAwXCIsXHJcblwiMDAwMDAwMDBcIlxyXG5dLFxyXG4vLyAjMHgwNTQgXHJcblsgXHJcblwiMDAxMTExMDBcIixcclxuXCIwMDAwMDEwMFwiLFxyXG5cIjAwMDAwMTAwXCIsXHJcblwiMDAwMDAxMDBcIixcclxuXCIwMDAwMDEwMFwiLFxyXG5cIjAwMDAwMTAwXCIsXHJcblwiMDAxMTExMDBcIixcclxuXCIwMDAwMDAwMFwiXHJcbl0sXHJcbi8vICMweDA1NSBcclxuWyBcclxuXCIwMDAxMTEwMFwiLFxyXG5cIjAwMTAwMDEwXCIsXHJcblwiMDEwMDEwMTBcIixcclxuXCIwMTAxMDExMFwiLFxyXG5cIjAxMDAxMTAwXCIsXHJcblwiMDAxMDAwMDBcIixcclxuXCIwMDAxMTExMFwiLFxyXG5cIjAwMDAwMDAwXCJcclxuXSxcclxuLy8gIzB4MDU2IFxyXG5bIFxyXG5cIjExMTExMTExXCIsXHJcblwiMTExMTExMTBcIixcclxuXCIxMTExMTEwMFwiLFxyXG5cIjExMTExMDAwXCIsXHJcblwiMTExMTAwMDBcIixcclxuXCIxMTEwMDAwMFwiLFxyXG5cIjExMDAwMDAwXCIsXHJcblwiMTAwMDAwMDBcIlxyXG5dLFxyXG4vLyAjMHgwNTcgXHJcblsgXHJcblwiMDExMTAwMDBcIixcclxuXCIwMDAxMTAwMFwiLFxyXG5cIjAwMDAxMTAwXCIsXHJcblwiMDAwMDAxMTBcIixcclxuXCIwMDAwMTEwMFwiLFxyXG5cIjAwMDExMDAwXCIsXHJcblwiMDExMTAwMDBcIixcclxuXCIwMDAwMDAwMFwiXHJcbl0sXHJcbi8vICMweDA1OCBcclxuWyBcclxuXCIxMDEwMDAwMFwiLFxyXG5cIjAxMDEwMDAwXCIsXHJcblwiMTAxMDAwMDBcIixcclxuXCIwMTAxMDAwMFwiLFxyXG5cIjEwMTAwMDAwXCIsXHJcblwiMDEwMTAwMDBcIixcclxuXCIxMDEwMDAwMFwiLFxyXG5cIjAxMDEwMDAwXCJcclxuXSxcclxuLy8gIzB4MDU5IFxyXG5bIFxyXG5cIjAwMDAwMDAwXCIsXHJcblwiMDEwMDAwMDBcIixcclxuXCIwMDEwMDAwMFwiLFxyXG5cIjAwMDEwMDAwXCIsXHJcblwiMDAwMDEwMDBcIixcclxuXCIwMDAwMDEwMFwiLFxyXG5cIjAwMDAwMDEwXCIsXHJcblwiMDAwMDAwMDBcIlxyXG5dLFxyXG4vLyAjMHgwNWEgXHJcblsgXHJcblwiMTAxMDEwMTBcIixcclxuXCIwMTAxMDEwMVwiLFxyXG5cIjEwMTAxMDEwXCIsXHJcblwiMDEwMTAxMDFcIixcclxuXCIxMDEwMTAxMFwiLFxyXG5cIjAxMDEwMTAxXCIsXHJcblwiMTAxMDEwMTBcIixcclxuXCIwMTAxMDEwMVwiXHJcbl0sXHJcbi8vICMweDA1YiBcclxuWyBcclxuXCIxMTExMDAwMFwiLFxyXG5cIjExMTEwMDAwXCIsXHJcblwiMTExMTAwMDBcIixcclxuXCIxMTExMDAwMFwiLFxyXG5cIjAwMDAxMTExXCIsXHJcblwiMDAwMDExMTFcIixcclxuXCIwMDAwMTExMVwiLFxyXG5cIjAwMDAxMTExXCJcclxuXSxcclxuLy8gIzB4MDVjIFxyXG5bIFxyXG5cIjAwMDAwMDAwXCIsXHJcblwiMDAwMDAwMDBcIixcclxuXCIwMDAwMDAwMFwiLFxyXG5cIjAwMDAwMDAwXCIsXHJcblwiMDAwMDExMTFcIixcclxuXCIwMDAwMTAwMFwiLFxyXG5cIjAwMDAxMDAwXCIsXHJcblwiMDAwMDEwMDBcIlxyXG5dLFxyXG4vLyAjMHgwNWQgXHJcblsgXHJcblwiMDAwMDAwMDBcIixcclxuXCIwMDAwMDAwMFwiLFxyXG5cIjAwMDAwMDAwXCIsXHJcblwiMDAwMDAwMDBcIixcclxuXCIxMTExMTAwMFwiLFxyXG5cIjAwMDAxMDAwXCIsXHJcblwiMDAwMDEwMDBcIixcclxuXCIwMDAwMTAwMFwiXHJcbl0sXHJcbi8vICMweDA1ZSBcclxuWyBcclxuXCIwMDAwMTAwMFwiLFxyXG5cIjAwMDAxMDAwXCIsXHJcblwiMDAwMDEwMDBcIixcclxuXCIwMDAwMTAwMFwiLFxyXG5cIjExMTExMDAwXCIsXHJcblwiMDAwMDEwMDBcIixcclxuXCIwMDAwMTAwMFwiLFxyXG5cIjAwMDAxMDAwXCJcclxuXSxcclxuLy8gIzB4MDVmIFxyXG5bIFxyXG5cIjAwMDAwMDAwXCIsXHJcblwiMDAwMDAwMDBcIixcclxuXCIwMDAwMDAwMFwiLFxyXG5cIjAwMDAwMDAwXCIsXHJcblwiMTExMTExMTFcIixcclxuXCIwMDAwMTAwMFwiLFxyXG5cIjAwMDAxMDAwXCIsXHJcblwiMDAwMDEwMDBcIlxyXG5dLFxyXG4vLyAjMHgwNjAgXHJcblsgXHJcblwiMDAwMDAwMDBcIixcclxuXCIwMDAwMDAwMFwiLFxyXG5cIjAwMDAwMDAxXCIsXHJcblwiMDAxMTExMTBcIixcclxuXCIwMTAxMDEwMFwiLFxyXG5cIjAwMDEwMTAwXCIsXHJcblwiMDAwMTAxMDBcIixcclxuXCIwMDAwMDAwMFwiXHJcbl0sXHJcbi8vICMweDA2MSBcclxuWyBcclxuXCIwMDAwMTAwMFwiLFxyXG5cIjAwMDAxMDAwXCIsXHJcblwiMDAwMDEwMDBcIixcclxuXCIwMDAwMTAwMFwiLFxyXG5cIjAwMDAwMDAwXCIsXHJcblwiMDAwMDAwMDBcIixcclxuXCIwMDAwMTAwMFwiLFxyXG5cIjAwMDAwMDAwXCJcclxuXSxcclxuLy8gIzB4MDYyIFxyXG5bIFxyXG5cIjAwMTAwMTAwXCIsXHJcblwiMDAxMDAxMDBcIixcclxuXCIwMDEwMDEwMFwiLFxyXG5cIjAwMDAwMDAwXCIsXHJcblwiMDAwMDAwMDBcIixcclxuXCIwMDAwMDAwMFwiLFxyXG5cIjAwMDAwMDAwXCIsXHJcblwiMDAwMDAwMDBcIlxyXG5dLFxyXG4vLyAjMHgwNjMgXHJcblsgXHJcblwiMDAxMDAxMDBcIixcclxuXCIwMDEwMDEwMFwiLFxyXG5cIjAxMTExMTEwXCIsXHJcblwiMDAxMDAxMDBcIixcclxuXCIwMTExMTExMFwiLFxyXG5cIjAwMTAwMTAwXCIsXHJcblwiMDAxMDAxMDBcIixcclxuXCIwMDAwMDAwMFwiXHJcbl0sXHJcbi8vICMweDA2NCBcclxuWyBcclxuXCIwMDAwMTAwMFwiLFxyXG5cIjAwMDExMTEwXCIsXHJcblwiMDAxMDEwMDBcIixcclxuXCIwMDAxMTEwMFwiLFxyXG5cIjAwMDAxMDEwXCIsXHJcblwiMDAxMTExMDBcIixcclxuXCIwMDAwMTAwMFwiLFxyXG5cIjAwMDAwMDAwXCJcclxuXSxcclxuLy8gIzB4MDY1IFxyXG5bIFxyXG5cIjAwMDAwMDAwXCIsXHJcblwiMDExMDAwMTBcIixcclxuXCIwMTEwMDEwMFwiLFxyXG5cIjAwMDAxMDAwXCIsXHJcblwiMDAwMTAwMDBcIixcclxuXCIwMDEwMDExMFwiLFxyXG5cIjAxMDAwMTEwXCIsXHJcblwiMDAwMDAwMDBcIlxyXG5dLFxyXG4vLyAjMHgwNjYgXHJcblsgXHJcblwiMDAxMTAwMDBcIixcclxuXCIwMTAwMTAwMFwiLFxyXG5cIjAxMDAxMDAwXCIsXHJcblwiMDAxMTAwMDBcIixcclxuXCIwMTAwMTAxMFwiLFxyXG5cIjAxMDAwMTAwXCIsXHJcblwiMDAxMTEwMTBcIixcclxuXCIwMDAwMDAwMFwiXHJcbl0sXHJcbi8vICMweDA2NyBcclxuWyBcclxuXCIwMDAwMDEwMFwiLFxyXG5cIjAwMDAxMDAwXCIsXHJcblwiMDAwMTAwMDBcIixcclxuXCIwMDAwMDAwMFwiLFxyXG5cIjAwMDAwMDAwXCIsXHJcblwiMDAwMDAwMDBcIixcclxuXCIwMDAwMDAwMFwiLFxyXG5cIjAwMDAwMDAwXCJcclxuXSxcclxuLy8gIzB4MDY4IFxyXG5bIFxyXG5cIjAwMDAwMTAwXCIsXHJcblwiMDAwMDEwMDBcIixcclxuXCIwMDAxMDAwMFwiLFxyXG5cIjAwMDEwMDAwXCIsXHJcblwiMDAwMTAwMDBcIixcclxuXCIwMDAwMTAwMFwiLFxyXG5cIjAwMDAwMTAwXCIsXHJcblwiMDAwMDAwMDBcIlxyXG5dLFxyXG4vLyAjMHgwNjkgXHJcblsgXHJcblwiMDAxMDAwMDBcIixcclxuXCIwMDAxMDAwMFwiLFxyXG5cIjAwMDAxMDAwXCIsXHJcblwiMDAwMDEwMDBcIixcclxuXCIwMDAwMTAwMFwiLFxyXG5cIjAwMDEwMDAwXCIsXHJcblwiMDAxMDAwMDBcIixcclxuXCIwMDAwMDAwMFwiXHJcbl0sXHJcbi8vICMweDA2YSBcclxuWyBcclxuXCIwMDAwMDAwMFwiLFxyXG5cIjAwMDAxMDAwXCIsXHJcblwiMDAwMDEwMDBcIixcclxuXCIwMDExMTExMFwiLFxyXG5cIjAwMDAxMDAwXCIsXHJcblwiMDAwMDEwMDBcIixcclxuXCIwMDAwMDAwMFwiLFxyXG5cIjAwMDAwMDAwXCJcclxuXSxcclxuLy8gIzB4MDZiIFxyXG5bIFxyXG5cIjAwMDAxMDAwXCIsXHJcblwiMDAxMDEwMTBcIixcclxuXCIwMDAxMTEwMFwiLFxyXG5cIjAwMTExMTEwXCIsXHJcblwiMDAwMTExMDBcIixcclxuXCIwMDEwMTAxMFwiLFxyXG5cIjAwMDAxMDAwXCIsXHJcblwiMDAwMDAwMDBcIlxyXG5dLFxyXG4vLyAjMHgwNmMgXHJcblsgXHJcblwiMDAwMDExMTFcIixcclxuXCIwMDAwMTExMVwiLFxyXG5cIjAwMDAxMTExXCIsXHJcblwiMDAwMDExMTFcIixcclxuXCIxMTExMDAwMFwiLFxyXG5cIjExMTEwMDAwXCIsXHJcblwiMTExMTAwMDBcIixcclxuXCIxMTExMDAwMFwiXHJcbl0sXHJcbi8vICMweDA2ZCBcclxuWyBcclxuXCIxMDAwMDAwMVwiLFxyXG5cIjAxMDAwMDEwXCIsXHJcblwiMDAxMDAxMDBcIixcclxuXCIwMDAxMTAwMFwiLFxyXG5cIjAwMDExMDAwXCIsXHJcblwiMDAxMDAxMDBcIixcclxuXCIwMTAwMDAxMFwiLFxyXG5cIjEwMDAwMDAxXCJcclxuXSxcclxuLy8gIzB4MDZlIFxyXG5bIFxyXG5cIjAwMDEwMDAwXCIsXHJcblwiMDAwMTAwMDBcIixcclxuXCIwMDEwMDAwMFwiLFxyXG5cIjExMDAwMDAwXCIsXHJcblwiMDAwMDAwMDBcIixcclxuXCIwMDAwMDAwMFwiLFxyXG5cIjAwMDAwMDAwXCIsXHJcblwiMDAwMDAwMDBcIlxyXG5dLFxyXG4vLyAjMHgwNmYgXHJcblsgXHJcblwiMDAwMDEwMDBcIixcclxuXCIwMDAwMTAwMFwiLFxyXG5cIjAwMDAwMTAwXCIsXHJcblwiMDAwMDAwMTFcIixcclxuXCIwMDAwMDAwMFwiLFxyXG5cIjAwMDAwMDAwXCIsXHJcblwiMDAwMDAwMDBcIixcclxuXCIwMDAwMDAwMFwiXHJcbl0sXHJcbi8vICMweDA3MCBcclxuWyBcclxuXCIxMTExMTExMVwiLFxyXG5cIjAwMDAwMDAwXCIsXHJcblwiMDAwMDAwMDBcIixcclxuXCIwMDAwMDAwMFwiLFxyXG5cIjAwMDAwMDAwXCIsXHJcblwiMDAwMDAwMDBcIixcclxuXCIwMDAwMDAwMFwiLFxyXG5cIjAwMDAwMDAwXCJcclxuXSxcclxuLy8gIzB4MDcxIFxyXG5bIFxyXG5cIjEwMDAwMDAwXCIsXHJcblwiMTAwMDAwMDBcIixcclxuXCIxMDAwMDAwMFwiLFxyXG5cIjEwMDAwMDAwXCIsXHJcblwiMTAwMDAwMDBcIixcclxuXCIxMDAwMDAwMFwiLFxyXG5cIjEwMDAwMDAwXCIsXHJcblwiMTAwMDAwMDBcIlxyXG5dLFxyXG4vLyAjMHgwNzIgXHJcblsgXHJcblwiMTExMTExMTFcIixcclxuXCIxMDAwMDAwMFwiLFxyXG5cIjEwMDAwMDAwXCIsXHJcblwiMTAwMDAwMDBcIixcclxuXCIxMDAwMDAwMFwiLFxyXG5cIjEwMDAwMDAwXCIsXHJcblwiMTAwMDAwMDBcIixcclxuXCIxMDAwMDAwMFwiXHJcbl0sXHJcbi8vICMweDA3MyBcclxuWyBcclxuXCIxMTExMTExMVwiLFxyXG5cIjAwMDAwMDAxXCIsXHJcblwiMDAwMDAwMDFcIixcclxuXCIwMDAwMDAwMVwiLFxyXG5cIjAwMDAwMDAxXCIsXHJcblwiMDAwMDAwMDFcIixcclxuXCIwMDAwMDAwMVwiLFxyXG5cIjAwMDAwMDAxXCJcclxuXSxcclxuLy8gIzB4MDc0IFxyXG5bIFxyXG5cIjAwMDAwMDAwXCIsXHJcblwiMDAwMDAwMDBcIixcclxuXCIxMTExMTExMVwiLFxyXG5cIjAwMDAwMDAwXCIsXHJcblwiMDAwMDAwMDBcIixcclxuXCIwMDAwMDAwMFwiLFxyXG5cIjAwMDAwMDAwXCIsXHJcblwiMDAwMDAwMDBcIlxyXG5dLFxyXG4vLyAjMHgwNzUgXHJcblsgXHJcblwiMDAxMDAwMDBcIixcclxuXCIwMDEwMDAwMFwiLFxyXG5cIjAwMTAwMDAwXCIsXHJcblwiMDAxMDAwMDBcIixcclxuXCIwMDEwMDAwMFwiLFxyXG5cIjAwMTAwMDAwXCIsXHJcblwiMDAxMDAwMDBcIixcclxuXCIwMDEwMDAwMFwiXHJcbl0sXHJcbi8vICMweDA3NiBcclxuWyBcclxuXCIwMDAwMDAwMVwiLFxyXG5cIjAwMDAwMDEwXCIsXHJcblwiMDAwMDAxMDBcIixcclxuXCIwMDAwMTAwMFwiLFxyXG5cIjAwMDEwMDAwXCIsXHJcblwiMDAxMDAwMDBcIixcclxuXCIwMTAwMDAwMFwiLFxyXG5cIjEwMDAwMDAwXCJcclxuXSxcclxuLy8gIzB4MDc3IFxyXG5bIFxyXG5cIjEwMDAwMDAwXCIsXHJcblwiMDEwMDAwMDBcIixcclxuXCIwMDEwMDAwMFwiLFxyXG5cIjAwMDEwMDAwXCIsXHJcblwiMDAwMDEwMDBcIixcclxuXCIwMDAwMDEwMFwiLFxyXG5cIjAwMDAwMDEwXCIsXHJcblwiMDAwMDAwMDFcIlxyXG5dLFxyXG4vLyAjMHgwNzggXHJcblsgXHJcblwiMDAwMDAwMDBcIixcclxuXCIwMDAwMDAwMFwiLFxyXG5cIjAwMDAwMDAwXCIsXHJcblwiMDAwMDAwMDBcIixcclxuXCIxMTExMTExMVwiLFxyXG5cIjAwMDAwMDAwXCIsXHJcblwiMDAwMDAwMDBcIixcclxuXCIwMDAwMDAwMFwiXHJcbl0sXHJcbi8vICMweDA3OSBcclxuWyBcclxuXCIwMDAwMTAwMFwiLFxyXG5cIjAwMDAxMDAwXCIsXHJcblwiMDAwMDEwMDBcIixcclxuXCIwMDAwMTAwMFwiLFxyXG5cIjAwMDAxMDAwXCIsXHJcblwiMDAwMDEwMDBcIixcclxuXCIwMDAwMTAwMFwiLFxyXG5cIjAwMDAxMDAwXCJcclxuXSxcclxuLy8gIzB4MDdhIFxyXG5bIFxyXG5cIjExMTExMTExXCIsXHJcblwiMTExMTExMTFcIixcclxuXCIxMTExMTExMVwiLFxyXG5cIjExMTExMTExXCIsXHJcblwiMDAwMDAwMDBcIixcclxuXCIwMDAwMDAwMFwiLFxyXG5cIjAwMDAwMDAwXCIsXHJcblwiMDAwMDAwMDBcIlxyXG5dLFxyXG4vLyAjMHgwN2IgXHJcblsgXHJcblwiMTExMTAwMDBcIixcclxuXCIxMTExMDAwMFwiLFxyXG5cIjExMTEwMDAwXCIsXHJcblwiMTExMTAwMDBcIixcclxuXCIxMTExMDAwMFwiLFxyXG5cIjExMTEwMDAwXCIsXHJcblwiMTExMTAwMDBcIixcclxuXCIxMTExMDAwMFwiXHJcbl0sXHJcbi8vICMweDA3YyBcclxuWyBcclxuXCIwMDAwMDAwMFwiLFxyXG5cIjAwMDAwMDAwXCIsXHJcblwiMDAwMDAwMDBcIixcclxuXCIwMDAwMDAwMFwiLFxyXG5cIjAwMDAwMDAwXCIsXHJcblwiMDAwMDAwMDBcIixcclxuXCIxMTExMTExMVwiLFxyXG5cIjAwMDAwMDAwXCJcclxuXSxcclxuLy8gIzB4MDdkIFxyXG5bIFxyXG5cIjAwMDAwMDEwXCIsXHJcblwiMDAwMDAwMTBcIixcclxuXCIwMDAwMDAxMFwiLFxyXG5cIjAwMDAwMDEwXCIsXHJcblwiMDAwMDAwMTBcIixcclxuXCIwMDAwMDAxMFwiLFxyXG5cIjAwMDAwMDEwXCIsXHJcblwiMDAwMDAwMTBcIlxyXG5dLFxyXG4vLyAjMHgwN2UgXHJcblsgXHJcblwiMDAwMDAwMDBcIixcclxuXCIwMDAwMDAwMFwiLFxyXG5cIjAwMDAwMDAwXCIsXHJcblwiMDAwMDAwMDBcIixcclxuXCIwMDAwMDAwMFwiLFxyXG5cIjExMTExMTExXCIsXHJcblwiMTExMTExMTFcIixcclxuXCIxMTExMTExMVwiXHJcbl0sXHJcbi8vICMweDA3ZiBcclxuWyBcclxuXCIwMDAwMDExMVwiLFxyXG5cIjAwMDAwMTExXCIsXHJcblwiMDAwMDAxMTFcIixcclxuXCIwMDAwMDExMVwiLFxyXG5cIjAwMDAwMTExXCIsXHJcblwiMDAwMDAxMTFcIixcclxuXCIwMDAwMDExMVwiLFxyXG5cIjAwMDAwMTExXCJcclxuXSxcclxuLy8gIzB4MDgwIFxyXG5bIFxyXG5cIjAwMDAwMDAwXCIsXHJcblwiMDAwMDEwMDBcIixcclxuXCIwMDAwMTAwMFwiLFxyXG5cIjAwMDAxMDAwXCIsXHJcblwiMDAxMDEwMTBcIixcclxuXCIwMDAxMTEwMFwiLFxyXG5cIjAwMDAxMDAwXCIsXHJcblwiMDAwMDAwMDBcIlxyXG5dLFxyXG4vLyAjMHgwODEgXHJcblsgXHJcblwiMDAwMDAxMDBcIixcclxuXCIwMDExMTAwMFwiLFxyXG5cIjAwMDAxMDAwXCIsXHJcblwiMDAxMTExMTBcIixcclxuXCIwMDAwMTAwMFwiLFxyXG5cIjAwMDAxMDAwXCIsXHJcblwiMDAwMTAwMDBcIixcclxuXCIwMDAwMDAwMFwiXHJcbl0sXHJcbi8vICMweDA4MiBcclxuWyBcclxuXCIwMDAwMDAwMFwiLFxyXG5cIjAwMTExMTEwXCIsXHJcblwiMDAwMDAwMTBcIixcclxuXCIwMDAwMDAxMFwiLFxyXG5cIjAwMDAwMDEwXCIsXHJcblwiMDAwMDAwMTBcIixcclxuXCIwMDExMTExMFwiLFxyXG5cIjAwMDAwMDAwXCJcclxuXSxcclxuLy8gIzB4MDgzIFxyXG5bIFxyXG5cIjAwMDAwMDAwXCIsXHJcblwiMDAxMDAwMTBcIixcclxuXCIwMDEwMDAxMFwiLFxyXG5cIjAwMDEwMDEwXCIsXHJcblwiMDAwMDAwMTBcIixcclxuXCIwMDAwMDEwMFwiLFxyXG5cIjAwMDExMDAwXCIsXHJcblwiMDAwMDAwMDBcIlxyXG5dLFxyXG4vLyAjMHgwODQgXHJcblsgXHJcblwiMDAwMDAwMDBcIixcclxuXCIwMDExMDAwMFwiLFxyXG5cIjAwMDAwMDEwXCIsXHJcblwiMDAxMTAwMTBcIixcclxuXCIwMDAwMDAxMFwiLFxyXG5cIjAwMDAwMTAwXCIsXHJcblwiMDAxMTEwMDBcIixcclxuXCIwMDAwMDAwMFwiXHJcbl0sXHJcbi8vICMweDA4NSBcclxuWyBcclxuXCIwMDAwMDAxMFwiLFxyXG5cIjAwMDAwMTAwXCIsXHJcblwiMDAwMDEwMDBcIixcclxuXCIwMDAxMTAwMFwiLFxyXG5cIjAwMTAxMDAwXCIsXHJcblwiMDAwMDEwMDBcIixcclxuXCIwMDAwMTAwMFwiLFxyXG5cIjAwMDAwMDAwXCJcclxuXSxcclxuLy8gIzB4MDg2IFxyXG5bIFxyXG5cIjAwMDAwMDAwXCIsXHJcblwiMDAwMDEwMDBcIixcclxuXCIwMDAwMDEwMFwiLFxyXG5cIjAwMTAwMDEwXCIsXHJcblwiMDAxMDAwMTBcIixcclxuXCIwMDEwMDAxMFwiLFxyXG5cIjAwMTAwMDEwXCIsXHJcblwiMDAwMDAwMDBcIlxyXG5dLFxyXG4vLyAjMHgwODcgXHJcblsgXHJcblwiMDAwMDEwMDBcIixcclxuXCIwMDExMTExMFwiLFxyXG5cIjAwMDAxMDAwXCIsXHJcblwiMDAxMTExMTBcIixcclxuXCIwMDAwMTAwMFwiLFxyXG5cIjAwMDAxMDAwXCIsXHJcblwiMDAwMDEwMDBcIixcclxuXCIwMDAwMDAwMFwiXHJcbl0sXHJcbi8vICMweDA4OCBcclxuWyBcclxuXCIwMDAwMDAwMFwiLFxyXG5cIjAwMDExMTEwXCIsXHJcblwiMDAwMTAwMTBcIixcclxuXCIwMDEwMDAxMFwiLFxyXG5cIjAwMDAwMDEwXCIsXHJcblwiMDAwMDAxMDBcIixcclxuXCIwMDAxMTAwMFwiLFxyXG5cIjAwMDAwMDAwXCJcclxuXSxcclxuLy8gIzB4MDg5IFxyXG5bIFxyXG5cIjAwMDAwMDAwXCIsXHJcblwiMDAwMTExMDBcIixcclxuXCIwMDAwMDAwMFwiLFxyXG5cIjAwMDAwMDAwXCIsXHJcblwiMDAwMDAwMDBcIixcclxuXCIwMDAwMDAwMFwiLFxyXG5cIjAwMTExMTEwXCIsXHJcblwiMDAwMDAwMDBcIlxyXG5dLFxyXG4vLyAjMHgwOGEgXHJcblsgXHJcblwiMDAwMDAwMDBcIixcclxuXCIwMDExMTExMFwiLFxyXG5cIjAwMDAwMDEwXCIsXHJcblwiMDAwMDAwMTBcIixcclxuXCIwMDAxMDEwMFwiLFxyXG5cIjAwMDAxMDAwXCIsXHJcblwiMDAwMDAxMDBcIixcclxuXCIwMDAwMDAwMFwiXHJcbl0sXHJcbi8vICMweDA4YiBcclxuWyBcclxuXCIwMDAwMDEwMFwiLFxyXG5cIjAwMDAwMTAwXCIsXHJcblwiMDAwMDAxMDBcIixcclxuXCIwMDAwMDEwMFwiLFxyXG5cIjAwMDAwMTAwXCIsXHJcblwiMDAwMDEwMDBcIixcclxuXCIwMDAxMDAwMFwiLFxyXG5cIjAwMDAwMDAwXCJcclxuXSxcclxuLy8gIzB4MDhjIFxyXG5bIFxyXG5cIjAwMTAwMTAwXCIsXHJcblwiMDAxMDAxMDBcIixcclxuXCIwMDEwMDEwMFwiLFxyXG5cIjAwMTAwMTAwXCIsXHJcblwiMDAwMDAxMDBcIixcclxuXCIwMDAwMTAwMFwiLFxyXG5cIjAwMDEwMDAwXCIsXHJcblwiMDAwMDAwMDBcIlxyXG5dLFxyXG4vLyAjMHgwOGQgXHJcblsgXHJcblwiMDAwMDAwMDBcIixcclxuXCIwMDExMTExMFwiLFxyXG5cIjAwMDEwMDAwXCIsXHJcblwiMDAxMTExMTBcIixcclxuXCIwMDAxMDAwMFwiLFxyXG5cIjAwMDEwMDAwXCIsXHJcblwiMDAwMDExMTBcIixcclxuXCIwMDAwMDAwMFwiXHJcbl0sXHJcbi8vICMweDA4ZSBcclxuWyBcclxuXCIwMDAwMDAwMFwiLFxyXG5cIjAwMDExMTAwXCIsXHJcblwiMDAwMDAwMDBcIixcclxuXCIwMDAxMTEwMFwiLFxyXG5cIjAwMDAwMDAwXCIsXHJcblwiMDAxMTExMDBcIixcclxuXCIwMDAwMDAxMFwiLFxyXG5cIjAwMDAwMDAwXCJcclxuXSxcclxuLy8gIzB4MDhmIFxyXG5bIFxyXG5cIjAwMDExMTAwXCIsXHJcblwiMDAwMDAwMDBcIixcclxuXCIwMDExMTExMFwiLFxyXG5cIjAwMDAwMDEwXCIsXHJcblwiMDAwMDAwMTBcIixcclxuXCIwMDAwMDEwMFwiLFxyXG5cIjAwMDAxMDAwXCIsXHJcblwiMDAwMDAwMDBcIlxyXG5dLFxyXG4vLyAjMHgwOTAgXHJcblsgXHJcblwiMDAwMTAwMDBcIixcclxuXCIwMDExMTExMFwiLFxyXG5cIjAwMDEwMDEwXCIsXHJcblwiMDAwMTAxMDBcIixcclxuXCIwMDAxMDAwMFwiLFxyXG5cIjAwMDEwMDAwXCIsXHJcblwiMDAwMDExMTBcIixcclxuXCIwMDAwMDAwMFwiXHJcbl0sXHJcbi8vICMweDA5MSBcclxuWyBcclxuXCIwMDAwMDAwMFwiLFxyXG5cIjAwMDExMTEwXCIsXHJcblwiMDAwMTAwMTBcIixcclxuXCIwMDEwMTAxMFwiLFxyXG5cIjAwMDAwMTEwXCIsXHJcblwiMDAwMDAxMDBcIixcclxuXCIwMDAxMTAwMFwiLFxyXG5cIjAwMDAwMDAwXCJcclxuXSxcclxuLy8gIzB4MDkyIFxyXG5bIFxyXG5cIjAwMDAwMDAwXCIsXHJcblwiMDAxMTExMTBcIixcclxuXCIwMDAwMDAxMFwiLFxyXG5cIjAwMDAwMTAwXCIsXHJcblwiMDAwMDEwMDBcIixcclxuXCIwMDAxMDEwMFwiLFxyXG5cIjAwMTAwMDEwXCIsXHJcblwiMDAwMDAwMDBcIlxyXG5dLFxyXG4vLyAjMHgwOTMgXHJcblsgXHJcblwiMDAwMTAwMDBcIixcclxuXCIwMDAxMDAwMFwiLFxyXG5cIjAwMDEwMDAwXCIsXHJcblwiMDAwMTEwMDBcIixcclxuXCIwMDAxMDEwMFwiLFxyXG5cIjAwMDEwMDAwXCIsXHJcblwiMDAwMTAwMDBcIixcclxuXCIwMDAwMDAwMFwiXHJcbl0sXHJcbi8vICMweDA5NCBcclxuWyBcclxuXCIwMDAxMDAwMFwiLFxyXG5cIjAwMTExMTEwXCIsXHJcblwiMDAwMTAwMTBcIixcclxuXCIwMDAxMDAxMFwiLFxyXG5cIjAwMDEwMDEwXCIsXHJcblwiMDAwMTAwMTBcIixcclxuXCIwMDEwMDEwMFwiLFxyXG5cIjAwMDAwMDAwXCJcclxuXSxcclxuLy8gIzB4MDk1IFxyXG5bIFxyXG5cIjAwMDAxMDAwXCIsXHJcblwiMDAwMDEwMDBcIixcclxuXCIwMDExMTExMFwiLFxyXG5cIjAwMDAxMDAwXCIsXHJcblwiMDAwMDEwMDBcIixcclxuXCIwMDAxMDAwMFwiLFxyXG5cIjAwMTAwMDAwXCIsXHJcblwiMDAwMDAwMDBcIlxyXG5dLFxyXG4vLyAjMHgwOTYgXHJcblsgXHJcblwiMDAxMDAwMDBcIixcclxuXCIwMDEwMDAwMFwiLFxyXG5cIjAwMTExMTEwXCIsXHJcblwiMDAxMDAwMDBcIixcclxuXCIwMDEwMDAwMFwiLFxyXG5cIjAwMTAwMDAwXCIsXHJcblwiMDAwMTExMTBcIixcclxuXCIwMDAwMDAwMFwiXHJcbl0sXHJcbi8vICMweDA5NyBcclxuWyBcclxuXCIwMDAxMTEwMFwiLFxyXG5cIjAwMDAwMDAwXCIsXHJcblwiMDAxMTExMTBcIixcclxuXCIwMDAwMTAwMFwiLFxyXG5cIjAwMDAxMDAwXCIsXHJcblwiMDAwMDEwMDBcIixcclxuXCIwMDAxMDAwMFwiLFxyXG5cIjAwMDAwMDAwXCJcclxuXSxcclxuLy8gIzB4MDk4IFxyXG5bIFxyXG5cIjAwMDEwMTAwXCIsXHJcblwiMDAxMTExMTBcIixcclxuXCIwMDAxMDEwMFwiLFxyXG5cIjAwMDEwMTAwXCIsXHJcblwiMDAwMDAxMDBcIixcclxuXCIwMDAwMTAwMFwiLFxyXG5cIjAwMDEwMDAwXCIsXHJcblwiMDAwMDAwMDBcIlxyXG5dLFxyXG4vLyAjMHgwOTkgXHJcblsgXHJcblwiMDAwMDAwMDBcIixcclxuXCIwMDExMDAwMFwiLFxyXG5cIjAwMDAwMDAwXCIsXHJcblwiMDAwMDAwMTBcIixcclxuXCIwMDAwMDAxMFwiLFxyXG5cIjAwMDAwMTAwXCIsXHJcblwiMDAxMTEwMDBcIixcclxuXCIwMDAwMDAwMFwiXHJcbl0sXHJcbi8vICMweDA5YSBcclxuWyBcclxuXCIwMDAwMDAwMFwiLFxyXG5cIjAwMTAxMDEwXCIsXHJcblwiMDAxMDEwMTBcIixcclxuXCIwMDEwMTAxMFwiLFxyXG5cIjAwMDAwMDEwXCIsXHJcblwiMDAwMDAxMDBcIixcclxuXCIwMDAwMTAwMFwiLFxyXG5cIjAwMDAwMDAwXCJcclxuXSxcclxuLy8gIzB4MDliIFxyXG5bIFxyXG5cIjAwMDAwMDAwXCIsXHJcblwiMDAxMTExMTBcIixcclxuXCIwMDEwMDAxMFwiLFxyXG5cIjAwMTAwMDEwXCIsXHJcblwiMDAxMDAwMTBcIixcclxuXCIwMDEwMDAxMFwiLFxyXG5cIjAwMTExMTEwXCIsXHJcblwiMDAwMDAwMDBcIlxyXG5dLFxyXG4vLyAjMHgwOWMgXHJcblsgXHJcblwiMDAwMTAwMDBcIixcclxuXCIwMDAxMTExMFwiLFxyXG5cIjAwMTAwMTAwXCIsXHJcblwiMDAwMDAxMDBcIixcclxuXCIwMDAwMDEwMFwiLFxyXG5cIjAwMDAwMTAwXCIsXHJcblwiMDAwMDEwMDBcIixcclxuXCIwMDAwMDAwMFwiXHJcbl0sXHJcbi8vICMweDA5ZCBcclxuWyBcclxuXCIwMDAxMTExMFwiLFxyXG5cIjAwMDEwMDAwXCIsXHJcblwiMDAwMTAwMDBcIixcclxuXCIwMDAxMDAwMFwiLFxyXG5cIjAwMDAwMDAwXCIsXHJcblwiMDAwMDAwMDBcIixcclxuXCIwMDAwMDAwMFwiLFxyXG5cIjAwMDAwMDAwXCJcclxuXSxcclxuLy8gIzB4MDllIFxyXG5bIFxyXG5cIjAwMDAwMDAwXCIsXHJcblwiMDAwMDAwMDBcIixcclxuXCIwMDExMTExMFwiLFxyXG5cIjAwMDAwMDEwXCIsXHJcblwiMDAwMDExMDBcIixcclxuXCIwMDAwMTAwMFwiLFxyXG5cIjAwMDEwMDAwXCIsXHJcblwiMDAwMDAwMDBcIlxyXG5dLFxyXG4vLyAjMHgwOWYgXHJcblsgXHJcblwiMDAwMDAwMDBcIixcclxuXCIwMDAwMDAwMFwiLFxyXG5cIjAwMDEwMDAwXCIsXHJcblwiMDAxMTExMTBcIixcclxuXCIwMDAxMDAxMFwiLFxyXG5cIjAwMDEwMTAwXCIsXHJcblwiMDAwMTAwMDBcIixcclxuXCIwMDAwMDAwMFwiXHJcbl0sXHJcbi8vICMweDBhMCBcclxuWyBcclxuXCIwMDAwMDAwMFwiLFxyXG5cIjAwMTExMTEwXCIsXHJcblwiMDAxMDAwMTBcIixcclxuXCIwMDEwMDAxMFwiLFxyXG5cIjAwMDAwMDEwXCIsXHJcblwiMDAwMDAxMDBcIixcclxuXCIwMDAwMTAwMFwiLFxyXG5cIjAwMDAwMDAwXCJcclxuXSxcclxuLy8gIzB4MGExIFxyXG5bIFxyXG5cIjAwMDAwMDAwXCIsXHJcblwiMDAxMTExMTBcIixcclxuXCIwMDAwMDAxMFwiLFxyXG5cIjAwMDEwMTAwXCIsXHJcblwiMDAwMDEwMDBcIixcclxuXCIwMDAxMDEwMFwiLFxyXG5cIjAwMTAwMDAwXCIsXHJcblwiMDAwMDAwMDBcIlxyXG5dLFxyXG4vLyAjMHgwYTIgXHJcblsgXHJcblwiMDAwMDAwMDBcIixcclxuXCIwMDExMTExMFwiLFxyXG5cIjAwMDAwMDEwXCIsXHJcblwiMDAwMDAwMTBcIixcclxuXCIwMDAwMDAxMFwiLFxyXG5cIjAwMDAwMTAwXCIsXHJcblwiMDAwMTEwMDBcIixcclxuXCIwMDAwMDAwMFwiXHJcbl0sXHJcbi8vICMweDBhMyBcclxuWyBcclxuXCIwMDExMTExMFwiLFxyXG5cIjAwMDAwMDEwXCIsXHJcblwiMDAwMDEwMTBcIixcclxuXCIwMDAwMTEwMFwiLFxyXG5cIjAwMDAxMDAwXCIsXHJcblwiMDAwMDEwMDBcIixcclxuXCIwMDAxMDAwMFwiLFxyXG5cIjAwMDAwMDAwXCJcclxuXSxcclxuLy8gIzB4MGE0IFxyXG5bIFxyXG5cIjAwMDAxMDAwXCIsXHJcblwiMDAxMTExMTBcIixcclxuXCIwMDEwMDAxMFwiLFxyXG5cIjAwMTAwMDEwXCIsXHJcblwiMDAwMDAwMTBcIixcclxuXCIwMDAwMDEwMFwiLFxyXG5cIjAwMDAxMDAwXCIsXHJcblwiMDAwMDAwMDBcIlxyXG5dLFxyXG4vLyAjMHgwYTUgXHJcblsgXHJcblwiMDAwMDAwMDBcIixcclxuXCIwMDExMTExMFwiLFxyXG5cIjAwMDAxMDAwXCIsXHJcblwiMDAwMDEwMDBcIixcclxuXCIwMDAwMTAwMFwiLFxyXG5cIjAwMDAxMDAwXCIsXHJcblwiMDAxMTExMTBcIixcclxuXCIwMDAwMDAwMFwiXHJcbl0sXHJcbi8vICMweDBhNiBcclxuWyBcclxuXCIwMDAwMDEwMFwiLFxyXG5cIjAwMTExMTEwXCIsXHJcblwiMDAwMDAxMDBcIixcclxuXCIwMDAwMTEwMFwiLFxyXG5cIjAwMDEwMTAwXCIsXHJcblwiMDAxMDAxMDBcIixcclxuXCIwMDAwMDEwMFwiLFxyXG5cIjAwMDAwMDAwXCJcclxuXSxcclxuLy8gIzB4MGE3IFxyXG5bIFxyXG5cIjAwMDEwMDAwXCIsXHJcblwiMDAwMTAwMDBcIixcclxuXCIwMDExMTExMFwiLFxyXG5cIjAwMDEwMDEwXCIsXHJcblwiMDAwMTAxMDBcIixcclxuXCIwMDAxMDAwMFwiLFxyXG5cIjAwMDEwMDAwXCIsXHJcblwiMDAwMDAwMDBcIlxyXG5dLFxyXG4vLyAjMHgwYTggXHJcblsgXHJcblwiMDAwMDAwMDBcIixcclxuXCIwMDAxMTEwMFwiLFxyXG5cIjAwMDAwMTAwXCIsXHJcblwiMDAwMDAxMDBcIixcclxuXCIwMDAwMDEwMFwiLFxyXG5cIjAwMDAwMTAwXCIsXHJcblwiMDAxMTExMTBcIixcclxuXCIwMDAwMDAwMFwiXHJcbl0sXHJcbi8vICMweDBhOSBcclxuWyBcclxuXCIwMDAwMDAwMFwiLFxyXG5cIjAwMTExMTEwXCIsXHJcblwiMDAwMDAwMTBcIixcclxuXCIwMDExMTExMFwiLFxyXG5cIjAwMDAwMDEwXCIsXHJcblwiMDAwMDAwMTBcIixcclxuXCIwMDExMTExMFwiLFxyXG5cIjAwMDAwMDAwXCJcclxuXSxcclxuLy8gIzB4MGFhIFxyXG5bIFxyXG5cIjAwMDAxMDAwXCIsXHJcblwiMDAxMTExMTBcIixcclxuXCIwMDAwMTAwMFwiLFxyXG5cIjAwMDAxMDAwXCIsXHJcblwiMDAxMDEwMTBcIixcclxuXCIwMDEwMTAxMFwiLFxyXG5cIjAwMDAxMDAwXCIsXHJcblwiMDAwMDAwMDBcIlxyXG5dLFxyXG4vLyAjMHgwYWIgXHJcblsgXHJcblwiMDAwMDAwMDBcIixcclxuXCIwMDAxMDAwMFwiLFxyXG5cIjAwMTAxMDAwXCIsXHJcblwiMDAwMDAxMDBcIixcclxuXCIwMDAwMDAxMFwiLFxyXG5cIjAwMDAwMDEwXCIsXHJcblwiMDAwMDAwMDBcIixcclxuXCIwMDAwMDAwMFwiXHJcbl0sXHJcbi8vICMweDBhYyBcclxuWyBcclxuXCIwMDAwMDAwMFwiLFxyXG5cIjAwMTAwMDAwXCIsXHJcblwiMDAxMDAwMDBcIixcclxuXCIwMDEwMDAxMFwiLFxyXG5cIjAwMTAwMTAwXCIsXHJcblwiMDAxMDEwMDBcIixcclxuXCIwMDExMDAwMFwiLFxyXG5cIjAwMDAwMDAwXCJcclxuXSxcclxuLy8gIzB4MGFkIFxyXG5bIFxyXG5cIjAwMDAwMDAwXCIsXHJcblwiMDAwMDAwMTBcIixcclxuXCIwMDAwMDAxMFwiLFxyXG5cIjAwMDEwMTAwXCIsXHJcblwiMDAwMDEwMDBcIixcclxuXCIwMDAxMDEwMFwiLFxyXG5cIjAwMTAwMDAwXCIsXHJcblwiMDAwMDAwMDBcIlxyXG5dLFxyXG4vLyAjMHgwYWUgXHJcblsgXHJcblwiMDAwMDAwMDBcIixcclxuXCIwMDAwMTAwMFwiLFxyXG5cIjAwMTAxMDAwXCIsXHJcblwiMDAxMDEwMDBcIixcclxuXCIwMDEwMTAxMFwiLFxyXG5cIjAwMTAxMDEwXCIsXHJcblwiMDAxMDExMDBcIixcclxuXCIwMDAwMDAwMFwiXHJcbl0sXHJcbi8vICMweDBhZiBcclxuWyBcclxuXCIwMDAwMTAwMFwiLFxyXG5cIjAwMTExMTEwXCIsXHJcblwiMDAwMDAxMDBcIixcclxuXCIwMDAwMTAwMFwiLFxyXG5cIjAwMDExMTAwXCIsXHJcblwiMDAxMDEwMTBcIixcclxuXCIwMDAwMTAwMFwiLFxyXG5cIjAwMDAwMDAwXCJcclxuXSxcclxuLy8gIzB4MGIwIFxyXG5bIFxyXG5cIjAwMDAwMDAwXCIsXHJcblwiMDAwMDEwMDBcIixcclxuXCIwMDAxMDAwMFwiLFxyXG5cIjAwMTAwMDAwXCIsXHJcblwiMDAxMDAwMTBcIixcclxuXCIwMDExMTExMFwiLFxyXG5cIjAwMDAwMDEwXCIsXHJcblwiMDAwMDAwMDBcIlxyXG5dLFxyXG4vLyAjMHgwYjEgXHJcblsgXHJcblwiMDAwMDAwMDBcIixcclxuXCIwMDAwMDAwMFwiLFxyXG5cIjAwMDAwMDAwXCIsXHJcblwiMDAwMDEwMDBcIixcclxuXCIwMDAwMTAwMFwiLFxyXG5cIjAwMDAxMDAwXCIsXHJcblwiMDExMTEwMDBcIixcclxuXCIwMDAwMDAwMFwiXHJcbl0sXHJcbi8vICMweDBiMiBcclxuWyBcclxuXCIwMDAwMDAwMFwiLFxyXG5cIjAwMDAwMDAwXCIsXHJcblwiMDAwMDAxMDBcIixcclxuXCIwMDAwMTAwMFwiLFxyXG5cIjAwMDExMDAwXCIsXHJcblwiMDAxMDEwMDBcIixcclxuXCIwMDAwMTAwMFwiLFxyXG5cIjAwMDAwMDAwXCJcclxuXSxcclxuLy8gIzB4MGIzIFxyXG5bIFxyXG5cIjAwMDAwMDAwXCIsXHJcblwiMDAwMDAwMDBcIixcclxuXCIwMDAwMDAwMFwiLFxyXG5cIjAwMDExMTAwXCIsXHJcblwiMDAwMDAxMDBcIixcclxuXCIwMDAwMDEwMFwiLFxyXG5cIjAwMTExMTEwXCIsXHJcblwiMDAwMDAwMDBcIlxyXG5dLFxyXG4vLyAjMHgwYjQgXHJcblsgXHJcblwiMDAwMDAwMDBcIixcclxuXCIwMDExMTExMFwiLFxyXG5cIjAwMDAwMDEwXCIsXHJcblwiMDAxMTExMTBcIixcclxuXCIwMDAwMDAxMFwiLFxyXG5cIjAwMDAwMTAwXCIsXHJcblwiMDAwMDEwMDBcIixcclxuXCIwMDAwMDAwMFwiXHJcbl0sXHJcbi8vICMweDBiNSBcclxuWyBcclxuXCIwMDAwMDAwMFwiLFxyXG5cIjAwMDAwMDAwXCIsXHJcblwiMDAwMDAwMDBcIixcclxuXCIwMDAwMDAwMFwiLFxyXG5cIjAxMDAwMDAwXCIsXHJcblwiMDAxMDAwMDBcIixcclxuXCIwMDAxMDAwMFwiLFxyXG5cIjAwMDAwMDAwXCJcclxuXSxcclxuLy8gIzB4MGI2IFxyXG5bIFxyXG5cIjAwMDAwMDAwXCIsXHJcblwiMDAwMDAwMDBcIixcclxuXCIwMDAwMTAwMFwiLFxyXG5cIjAwMTExMTEwXCIsXHJcblwiMDAxMDAwMTBcIixcclxuXCIwMDAwMDAxMFwiLFxyXG5cIjAwMDAxMTAwXCIsXHJcblwiMDAwMDAwMDBcIlxyXG5dLFxyXG4vLyAjMHgwYjcgXHJcblsgXHJcblwiMDAwMDAwMDBcIixcclxuXCIwMDAwMDAwMFwiLFxyXG5cIjAwMTExMTAwXCIsXHJcblwiMDAwMDAxMDBcIixcclxuXCIwMDExMTEwMFwiLFxyXG5cIjAwMDAwMTAwXCIsXHJcblwiMDAxMTExMDBcIixcclxuXCIwMDAwMDAwMFwiXHJcbl0sXHJcbi8vICMweDBiOCBcclxuWyBcclxuXCIwMTExMDAwMFwiLFxyXG5cIjAxMDEwMDAwXCIsXHJcblwiMDExMTAwMDBcIixcclxuXCIwMDAwMDAwMFwiLFxyXG5cIjAwMDAwMDAwXCIsXHJcblwiMDAwMDAwMDBcIixcclxuXCIwMDAwMDAwMFwiLFxyXG5cIjAwMDAwMDAwXCJcclxuXSxcclxuLy8gIzB4MGI5IFxyXG5bIFxyXG5cIjAwMDAwMDAwXCIsXHJcblwiMDAwMDAwMDBcIixcclxuXCIwMDAwMDAwMFwiLFxyXG5cIjAwMDAwMDAwXCIsXHJcblwiMDAwMDAwMDBcIixcclxuXCIwMDAwMDAwMFwiLFxyXG5cIjAwMTAwMDAwXCIsXHJcblwiMDAwMDAwMDBcIlxyXG5dLFxyXG4vLyAjMHgwYmEgXHJcblsgXHJcblwiMDAwMDAwMDBcIixcclxuXCIwMDAwMDAwMFwiLFxyXG5cIjAwMDAwMDAwXCIsXHJcblwiMDAxMTExMTBcIixcclxuXCIwMDAwMTAwMFwiLFxyXG5cIjAwMDAxMDAwXCIsXHJcblwiMDAxMTExMTBcIixcclxuXCIwMDAwMDAwMFwiXHJcbl0sXHJcbi8vICMweDBiYiBcclxuWyBcclxuXCIwMDAwMDAwMFwiLFxyXG5cIjAwMDAwMDAwXCIsXHJcblwiMDAwMDAwMDBcIixcclxuXCIwMDEwMTAxMFwiLFxyXG5cIjAwMTAxMDEwXCIsXHJcblwiMDAwMDAwMTBcIixcclxuXCIwMDAwMTEwMFwiLFxyXG5cIjAwMDAwMDAwXCJcclxuXSxcclxuLy8gIzB4MGJjIFxyXG5bIFxyXG5cIjAwMDEwMDAwXCIsXHJcblwiMDEwMDEwMDBcIixcclxuXCIwMDEwMDAwMFwiLFxyXG5cIjAwMDAwMDAwXCIsXHJcblwiMDAwMDAwMDBcIixcclxuXCIwMDAwMDAwMFwiLFxyXG5cIjAwMDAwMDAwXCIsXHJcblwiMDAwMDAwMDBcIlxyXG5dLFxyXG4vLyAjMHgwYmQgXHJcblsgXHJcblwiMDAwMDAwMDBcIixcclxuXCIwMDAwMDAwMFwiLFxyXG5cIjAwMDAwMDAwXCIsXHJcblwiMDAwMDAwMDBcIixcclxuXCIwMTExMDAwMFwiLFxyXG5cIjAxMDEwMDAwXCIsXHJcblwiMDExMTAwMDBcIixcclxuXCIwMDAwMDAwMFwiXHJcbl0sXHJcbi8vICMweDBiZSBcclxuWyBcclxuXCIwMDAwMDAwMFwiLFxyXG5cIjAwMDAwMDAwXCIsXHJcblwiMDAwMDAxMDBcIixcclxuXCIwMDExMTExMFwiLFxyXG5cIjAwMDAxMTAwXCIsXHJcblwiMDAwMTAxMDBcIixcclxuXCIwMDEwMDEwMFwiLFxyXG5cIjAwMDAwMDAwXCJcclxuXSxcclxuLy8gIzB4MGJmIFxyXG5bIFxyXG5cIjAwMDAwMDAwXCIsXHJcblwiMDAwMDAwMDBcIixcclxuXCIwMDAwMDAwMFwiLFxyXG5cIjAwMDExMTAwXCIsXHJcblwiMDAwMDAwMDBcIixcclxuXCIwMDAwMDAwMFwiLFxyXG5cIjAwMDAwMDAwXCIsXHJcblwiMDAwMDAwMDBcIlxyXG5dLFxyXG4vLyAjMHgwYzAgXHJcblsgXHJcblwiMDAwMTExMDBcIixcclxuXCIwMDAxMTEwMFwiLFxyXG5cIjAwMTExMTEwXCIsXHJcblwiMDAwMTExMDBcIixcclxuXCIwMDAwMTAwMFwiLFxyXG5cIjAwMDAwMDAwXCIsXHJcblwiMDAxMTExMTBcIixcclxuXCIwMDAwMDAwMFwiXHJcbl0sXHJcbi8vICMweDBjMSBcclxuWyBcclxuXCIxMTExMTExMVwiLFxyXG5cIjExMTEwMTExXCIsXHJcblwiMTExMTAxMTFcIixcclxuXCIxMTExMDExMVwiLFxyXG5cIjExMDEwMTAxXCIsXHJcblwiMTExMDAwMTFcIixcclxuXCIxMTExMDExMVwiLFxyXG5cIjExMTExMTExXCJcclxuXSxcclxuLy8gIzB4MGMyIFxyXG5bIFxyXG5cIjExMTExMTExXCIsXHJcblwiMTExMTAxMTFcIixcclxuXCIxMTEwMDAxMVwiLFxyXG5cIjExMDEwMTAxXCIsXHJcblwiMTExMTAxMTFcIixcclxuXCIxMTExMDExMVwiLFxyXG5cIjExMTEwMTExXCIsXHJcblwiMTExMTExMTFcIlxyXG5dLFxyXG4vLyAjMHgwYzMgXHJcblsgXHJcblwiMTExMTExMTFcIixcclxuXCIxMTExMTExMVwiLFxyXG5cIjExMTEwMTExXCIsXHJcblwiMTExMTEwMTFcIixcclxuXCIxMDAwMDAwMVwiLFxyXG5cIjExMTExMDExXCIsXHJcblwiMTExMTAxMTFcIixcclxuXCIxMTExMTExMVwiXHJcbl0sXHJcbi8vICMweDBjNCBcclxuWyBcclxuXCIxMTExMTExMVwiLFxyXG5cIjExMTExMTExXCIsXHJcblwiMTExMDExMTFcIixcclxuXCIxMTAxMTExMVwiLFxyXG5cIjEwMDAwMDAxXCIsXHJcblwiMTEwMTExMTFcIixcclxuXCIxMTEwMTExMVwiLFxyXG5cIjExMTExMTExXCJcclxuXSxcclxuLy8gIzB4MGM1IFxyXG5bIFxyXG5cIjEwMTExMDExXCIsXHJcblwiMTAxMTEwMTFcIixcclxuXCIxMDExMTAxMVwiLFxyXG5cIjEwMDAwMDExXCIsXHJcblwiMTAxMTEwMTFcIixcclxuXCIxMDExMTAxMVwiLFxyXG5cIjEwMTExMDExXCIsXHJcblwiMTExMTExMTFcIlxyXG5dLFxyXG4vLyAjMHgwYzYgXHJcblsgXHJcblwiMTExMDAwMTFcIixcclxuXCIxMTAxMTEwMVwiLFxyXG5cIjEwMTExMTExXCIsXHJcblwiMTAxMTExMTFcIixcclxuXCIxMDExMTExMVwiLFxyXG5cIjExMDExMTAxXCIsXHJcblwiMTExMDAwMTFcIixcclxuXCIxMTExMTExMVwiXHJcbl0sXHJcbi8vICMweDBjNyBcclxuWyBcclxuXCIwMDAxMTAwMFwiLFxyXG5cIjAwMTAwMTAwXCIsXHJcblwiMDExMTExMTBcIixcclxuXCIxMTExMTExMVwiLFxyXG5cIjAxMDExMDEwXCIsXHJcblwiMDAxMDAxMDBcIixcclxuXCIwMDAwMDAwMFwiLFxyXG5cIjAwMDAwMDAwXCJcclxuXSxcclxuLy8gIzB4MGM4IFxyXG5bIFxyXG5cIjExMTAwMDAwXCIsXHJcblwiMDEwMDAxMTFcIixcclxuXCIwMTAwMDAxMFwiLFxyXG5cIjAxMTExMTEwXCIsXHJcblwiMDEwMDAwMTBcIixcclxuXCIwMTAwMDExMVwiLFxyXG5cIjExMTAwMDAwXCIsXHJcblwiMDAwMDAwMDBcIlxyXG5dLFxyXG4vLyAjMHgwYzkgXHJcblsgXHJcblwiMDAxMDAwMTBcIixcclxuXCIwMDExMTExMFwiLFxyXG5cIjAwMTAxMDEwXCIsXHJcblwiMDAwMDEwMDBcIixcclxuXCIwMDAwMTAwMFwiLFxyXG5cIjAxMDAxMDAxXCIsXHJcblwiMDExMTExMTFcIixcclxuXCIwMTAwMDAwMVwiXHJcbl0sXHJcbi8vICMweDBjYSBcclxuWyBcclxuXCIwMDAxMTEwMFwiLFxyXG5cIjAwMDExMTAwXCIsXHJcblwiMDAwMDEwMDBcIixcclxuXCIwMDExMTExMFwiLFxyXG5cIjAwMDAxMDAwXCIsXHJcblwiMDAwMDEwMDBcIixcclxuXCIwMDAxMDEwMFwiLFxyXG5cIjAwMTAwMDEwXCJcclxuXSxcclxuLy8gIzB4MGNiIFxyXG5bIFxyXG5cIjAwMDAwMDAwXCIsXHJcblwiMDAwMTAwMDFcIixcclxuXCIxMTAxMDAxMFwiLFxyXG5cIjExMTExMTAwXCIsXHJcblwiMTEwMTAwMTBcIixcclxuXCIwMDAxMDAwMVwiLFxyXG5cIjAwMDAwMDAwXCIsXHJcblwiMDAwMDAwMDBcIlxyXG5dLFxyXG4vLyAjMHgwY2MgXHJcblsgXHJcblwiMDAwMDAwMDBcIixcclxuXCIxMDAwMTAwMFwiLFxyXG5cIjAxMDAxMDExXCIsXHJcblwiMDAxMTExMTFcIixcclxuXCIwMTAwMTAxMVwiLFxyXG5cIjEwMDAxMDAwXCIsXHJcblwiMDAwMDAwMDBcIixcclxuXCIwMDAwMDAwMFwiXHJcbl0sXHJcbi8vICMweDBjZCBcclxuWyBcclxuXCIwMDEwMDAxMFwiLFxyXG5cIjAwMDEwMTAwXCIsXHJcblwiMDAwMDEwMDBcIixcclxuXCIwMDAwMTAwMFwiLFxyXG5cIjAwMTExMTEwXCIsXHJcblwiMDAwMDEwMDBcIixcclxuXCIwMDAxMTEwMFwiLFxyXG5cIjAwMDExMTAwXCJcclxuXSxcclxuLy8gIzB4MGNlIFxyXG5bIFxyXG5cIjAwMTExMTAwXCIsXHJcblwiMDExMTExMTBcIixcclxuXCIxMTExMTExMVwiLFxyXG5cIjExMDExMDExXCIsXHJcblwiMTExMTExMTFcIixcclxuXCIxMTEwMDExMVwiLFxyXG5cIjAxMTExMTEwXCIsXHJcblwiMDAxMTExMDBcIlxyXG5dLFxyXG4vLyAjMHgwY2YgXHJcblsgXHJcblwiMDAxMTExMDBcIixcclxuXCIwMTAwMDAxMFwiLFxyXG5cIjEwMDAwMDAxXCIsXHJcblwiMTAxMDAxMDFcIixcclxuXCIxMDAwMDAwMVwiLFxyXG5cIjEwMDExMDAxXCIsXHJcblwiMDEwMDAwMTBcIixcclxuXCIwMDExMTEwMFwiXHJcbl0sXHJcbi8vICMweDBkMCBcclxuWyBcclxuXCIwMDExMTExMFwiLFxyXG5cIjAwMTAwMDEwXCIsXHJcblwiMDAxMDAwMTBcIixcclxuXCIwMDExMTExMFwiLFxyXG5cIjAwMTAwMDEwXCIsXHJcblwiMDAxMDAwMTBcIixcclxuXCIwMDExMTExMFwiLFxyXG5cIjAwMDAwMDAwXCJcclxuXSxcclxuLy8gIzB4MGQxIFxyXG5bIFxyXG5cIjAwMTExMTEwXCIsXHJcblwiMDAxMDAwMTBcIixcclxuXCIwMDExMTExMFwiLFxyXG5cIjAwMTAwMDEwXCIsXHJcblwiMDAxMTExMTBcIixcclxuXCIwMDEwMDAxMFwiLFxyXG5cIjAxMDAwMDEwXCIsXHJcblwiMDAwMDAwMDBcIlxyXG5dLFxyXG4vLyAjMHgwZDIgXHJcblsgXHJcblwiMDAwMDEwMDBcIixcclxuXCIwMDEwMTAxMFwiLFxyXG5cIjAwMTAxMDEwXCIsXHJcblwiMDAwMDEwMDBcIixcclxuXCIwMDAxMDEwMFwiLFxyXG5cIjAwMTAwMDEwXCIsXHJcblwiMDEwMDAwMDFcIixcclxuXCIwMDAwMDAwMFwiXHJcbl0sXHJcbi8vICMweDBkMyBcclxuWyBcclxuXCIwMDAwMTAwMFwiLFxyXG5cIjAwMDAxMDAxXCIsXHJcblwiMDAxMTEwMTBcIixcclxuXCIwMDAwMTEwMFwiLFxyXG5cIjAwMDExMTAwXCIsXHJcblwiMDAxMDEwMTBcIixcclxuXCIwMTAwMTAwMVwiLFxyXG5cIjAwMDAwMDAwXCJcclxuXSxcclxuLy8gIzB4MGQ0IFxyXG5bIFxyXG5cIjAwMDAxMDAwXCIsXHJcblwiMDAwMDEwMDBcIixcclxuXCIwMDExMTExMFwiLFxyXG5cIjAwMDAxMDAwXCIsXHJcblwiMDAwMTExMDBcIixcclxuXCIwMDEwMTAxMFwiLFxyXG5cIjAxMDAxMDAxXCIsXHJcblwiMDAwMDAwMDBcIlxyXG5dLFxyXG4vLyAjMHgwZDUgXHJcblsgXHJcblwiMDAwMDEwMDBcIixcclxuXCIwMDAxMDEwMFwiLFxyXG5cIjAwMTExMTEwXCIsXHJcblwiMDEwMDEwMDFcIixcclxuXCIwMDExMTExMFwiLFxyXG5cIjAwMDExMTAwXCIsXHJcblwiMDExMTExMTFcIixcclxuXCIwMDAwMDAwMFwiXHJcbl0sXHJcbi8vICMweDBkNiBcclxuWyBcclxuXCIwMDAwMDAwMFwiLFxyXG5cIjAwMDAxMDAwXCIsXHJcblwiMDAwMDEwMDBcIixcclxuXCIwMDExMTExMFwiLFxyXG5cIjAwMDAxMDAwXCIsXHJcblwiMDAwMDEwMDBcIixcclxuXCIwMTExMTExMVwiLFxyXG5cIjAwMDAwMDAwXCJcclxuXSxcclxuLy8gIzB4MGQ3IFxyXG5bIFxyXG5cIjAwMDAxMDAwXCIsXHJcblwiMDEwMDEwMDBcIixcclxuXCIwMTExMTExMFwiLFxyXG5cIjAxMDAxMDAwXCIsXHJcblwiMDAxMTExMTBcIixcclxuXCIwMDAwMTAwMFwiLFxyXG5cIjAxMTExMTExXCIsXHJcblwiMDAwMDAwMDBcIlxyXG5dLFxyXG4vLyAjMHgwZDggXHJcblsgXHJcblwiMDAxMDAwMDBcIixcclxuXCIwMDExMTExMFwiLFxyXG5cIjAxMDAxMDAwXCIsXHJcblwiMDAxMTExMDBcIixcclxuXCIwMDEwMTAwMFwiLFxyXG5cIjAxMTExMTEwXCIsXHJcblwiMDAwMDEwMDBcIixcclxuXCIwMDAwMDAwMFwiXHJcbl0sXHJcbi8vICMweDBkOSBcclxuWyBcclxuXCIwMDAwMDEwMFwiLFxyXG5cIjAxMTExMTEwXCIsXHJcblwiMDEwMTAxMDBcIixcclxuXCIwMTExMTExMVwiLFxyXG5cIjAxMDEwMDEwXCIsXHJcblwiMDExMTExMTFcIixcclxuXCIwMDAwMTAxMFwiLFxyXG5cIjAwMDAwMDAwXCJcclxuXSxcclxuLy8gIzB4MGRhIFxyXG5bIFxyXG5cIjAwMDAxMDAwXCIsXHJcblwiMDAwMTAxMDBcIixcclxuXCIwMDEwMDAxMFwiLFxyXG5cIjAxMTExMTExXCIsXHJcblwiMDAwMTAwMTBcIixcclxuXCIwMDAxMDAxMFwiLFxyXG5cIjAwMTAwMTAwXCIsXHJcblwiMDAwMDAwMDBcIlxyXG5dLFxyXG4vLyAjMHgwZGIgXHJcblsgXHJcblwiMDAxMTEwMDBcIixcclxuXCIwMDAxMDAxMFwiLFxyXG5cIjAxMTExMTExXCIsXHJcblwiMDAwMTAxMTFcIixcclxuXCIwMDExMTAxMVwiLFxyXG5cIjAxMDEwMDEwXCIsXHJcblwiMDAwMTAxMDBcIixcclxuXCIwMDAwMDAwMFwiXHJcbl0sXHJcbi8vICMweDBkYyBcclxuWyBcclxuXCIwMTExMTExMVwiLFxyXG5cIjAxMDAxMDAxXCIsXHJcblwiMDEwMDEwMDFcIixcclxuXCIwMTExMTExMVwiLFxyXG5cIjAxMDAwMDAxXCIsXHJcblwiMDEwMDAwMDFcIixcclxuXCIwMTAwMDAwMVwiLFxyXG5cIjAwMDAwMDAwXCJcclxuXSxcclxuLy8gIzB4MGRkIFxyXG5bIFxyXG5cIjAwMTAwMDEwXCIsXHJcblwiMDAwMTAxMDBcIixcclxuXCIwMDExMTExMFwiLFxyXG5cIjAwMDAxMDAwXCIsXHJcblwiMDAxMTExMTBcIixcclxuXCIwMDAwMTAwMFwiLFxyXG5cIjAwMDAxMDAwXCIsXHJcblwiMDAwMDAwMDBcIlxyXG5dLFxyXG4vLyAjMHgwZGUgXHJcblsgXHJcblwiMDAwMDExMDBcIixcclxuXCIwMDAxMDAxMFwiLFxyXG5cIjAwMDEwMDAwXCIsXHJcblwiMDAxMTEwMDBcIixcclxuXCIwMDAxMDAwMFwiLFxyXG5cIjAwMDEwMDAwXCIsXHJcblwiMDAxMTExMTBcIixcclxuXCIwMDAwMDAwMFwiXHJcbl0sXHJcbi8vICMweDBkZiBcclxuWyBcclxuXCIwMDAwMDAwMFwiLFxyXG5cIjExMDAwMDAwXCIsXHJcblwiMTEwMDEwMDBcIixcclxuXCIwMTAxMDEwMFwiLFxyXG5cIjAxMDEwMTAwXCIsXHJcblwiMDEwMTAxMDFcIixcclxuXCIwMDEwMDAxMFwiLFxyXG5cIjAwMDAwMDAwXCJcclxuXSxcclxuLy8gIzB4MGUwIFxyXG5bIFxyXG5cIjAwMDAwMDAwXCIsXHJcblwiMDAwMDAwMDBcIixcclxuXCIwMDAwMDAwMFwiLFxyXG5cIjAwMDAwMDAwXCIsXHJcblwiMDAwMDAwMDBcIixcclxuXCIwMDAwMDAxMFwiLFxyXG5cIjExMTExMTExXCIsXHJcblwiMDAwMDAwMTBcIlxyXG5dLFxyXG4vLyAjMHgwZTEgXHJcblsgXHJcblwiMDAwMDAwMTBcIixcclxuXCIwMDAwMDAxMFwiLFxyXG5cIjAwMDAwMDEwXCIsXHJcblwiMDAwMDAwMTBcIixcclxuXCIwMDAwMDAxMFwiLFxyXG5cIjAwMDAwMDEwXCIsXHJcblwiMDAwMDAxMTFcIixcclxuXCIwMDAwMDAxMFwiXHJcbl0sXHJcbi8vICMweDBlMiBcclxuWyBcclxuXCIwMDAwMDAxMFwiLFxyXG5cIjAwMDAwMDEwXCIsXHJcblwiMDAwMDAwMTBcIixcclxuXCIwMDAwMDAxMFwiLFxyXG5cIjAwMDAwMDEwXCIsXHJcblwiMDAwMDAwMTBcIixcclxuXCIxMTExMTExMVwiLFxyXG5cIjAwMDAwMDEwXCJcclxuXSxcclxuLy8gIzB4MGUzIFxyXG5bIFxyXG5cIjAwMDAwMDAwXCIsXHJcblwiMDAwMDAwMDBcIixcclxuXCIwMDEwMDAwMFwiLFxyXG5cIjAxMDEwMDAwXCIsXHJcblwiMTAwMDEwMDBcIixcclxuXCIwMDAwMDEwMVwiLFxyXG5cIjAwMDAwMDEwXCIsXHJcblwiMDAwMDAwMDBcIlxyXG5dLFxyXG4vLyAjMHgwZTQgXHJcblsgXHJcblwiMDAwMDAwMDBcIixcclxuXCIwMDAwMTExMFwiLFxyXG5cIjAwMDEwMDAxXCIsXHJcblwiMDAxMDAwMTBcIixcclxuXCIxMTAwMDEwMFwiLFxyXG5cIjAwMDAwMTAwXCIsXHJcblwiMDAwMDAwMTBcIixcclxuXCIwMDAwMDAwMVwiXHJcbl0sXHJcbi8vICMweDBlNSBcclxuWyBcclxuXCIwMDAwMDAwMFwiLFxyXG5cIjExMTExMTExXCIsXHJcblwiMDAwMDAwMDBcIixcclxuXCIxMDAwMDAwMVwiLFxyXG5cIjAxMDAwMDEwXCIsXHJcblwiMDEwMDAwMTBcIixcclxuXCIxMDAwMDAwMVwiLFxyXG5cIjAwMDAwMDAwXCJcclxuXSxcclxuLy8gIzB4MGU2IFxyXG5bIFxyXG5cIjAwMDAwMDAwXCIsXHJcblwiMDExMTAwMDBcIixcclxuXCIxMDAwMTAwMFwiLFxyXG5cIjAxMDAwMTAwXCIsXHJcblwiMDAxMDAwMTFcIixcclxuXCIwMDEwMDAwMFwiLFxyXG5cIjAxMDAwMDAwXCIsXHJcblwiMTAwMDAwMDBcIlxyXG5dLFxyXG4vLyAjMHgwZTcgXHJcblsgXHJcblwiMDAwMDAwMDBcIixcclxuXCIxMTAwMDEwMFwiLFxyXG5cIjEwMTAwMTAwXCIsXHJcblwiMTAwMTAxMDBcIixcclxuXCIxMDAwMTExMVwiLFxyXG5cIjEwMDEwMTAwXCIsXHJcblwiMTAxMDAxMDBcIixcclxuXCIxMTAwMDEwMFwiXHJcbl0sXHJcbi8vICMweDBlOCBcclxuWyBcclxuXCIwMDAwMDAwMFwiLFxyXG5cIjAwMTAwMDExXCIsXHJcblwiMDAxMDAxMDFcIixcclxuXCIwMDEwMTAwMVwiLFxyXG5cIjExMTEwMDAxXCIsXHJcblwiMDAxMDEwMDFcIixcclxuXCIwMDEwMDEwMVwiLFxyXG5cIjAwMTAwMDExXCJcclxuXSxcclxuLy8gIzB4MGU5IFxyXG5bIFxyXG5cIjEwMDAxMDAwXCIsXHJcblwiMTAwMTAwMDBcIixcclxuXCIxMDEwMDAwMFwiLFxyXG5cIjExMDAwMDAwXCIsXHJcblwiMTEwMDAwMDBcIixcclxuXCIxMDEwMTAwMFwiLFxyXG5cIjEwMDExMDAwXCIsXHJcblwiMTAxMTEwMDBcIlxyXG5dLFxyXG4vLyAjMHgwZWEgXHJcblsgXHJcblwiMTAxMDEwMDBcIixcclxuXCIxMDExMDAwMFwiLFxyXG5cIjEwMTExMDAwXCIsXHJcblwiMTEwMDAwMDBcIixcclxuXCIxMTAwMDAwMFwiLFxyXG5cIjEwMTAwMDAwXCIsXHJcblwiMTAwMTAwMDBcIixcclxuXCIxMDAwMTAwMFwiXHJcbl0sXHJcbi8vICMweDBlYiBcclxuWyBcclxuXCIxMDAwMDAwMFwiLFxyXG5cIjAxMDAwMDAwXCIsXHJcblwiMDAxMDAwMDBcIixcclxuXCIwMDAxMDAwMFwiLFxyXG5cIjAwMDExMTExXCIsXHJcblwiMDAxMDAwMDBcIixcclxuXCIwMTAwMDAwMFwiLFxyXG5cIjEwMDAwMDAwXCJcclxuXSxcclxuLy8gIzB4MGVjIFxyXG5bIFxyXG5cIjAwMDAwMDAwXCIsXHJcblwiMDAwMDAwMDBcIixcclxuXCIwMDEwMDEwMFwiLFxyXG5cIjAwMTAwMTAwXCIsXHJcblwiMTExMDAxMTFcIixcclxuXCIwMDEwMDEwMFwiLFxyXG5cIjAwMTAwMTAwXCIsXHJcblwiMDAwMDAwMDBcIlxyXG5dLFxyXG4vLyAjMHgwZWQgXHJcblsgXHJcblwiMDAwMDEwMDBcIixcclxuXCIwMDAwMTAwMFwiLFxyXG5cIjAwMTExMTEwXCIsXHJcblwiMDAwMDAwMDBcIixcclxuXCIwMDAwMDAwMFwiLFxyXG5cIjAwMTExMTEwXCIsXHJcblwiMDAwMDEwMDBcIixcclxuXCIwMDAwMTAwMFwiXHJcbl0sXHJcbi8vICMweDBlZSBcclxuWyBcclxuXCIwMDAwMTAwMFwiLFxyXG5cIjAwMDEwMDAwXCIsXHJcblwiMDAxMDAwMDBcIixcclxuXCIwMDAxMDAwMFwiLFxyXG5cIjAwMDAxMDAwXCIsXHJcblwiMDAwMDAxMDBcIixcclxuXCIwMDAwMDAxMFwiLFxyXG5cIjAwMDAwMTAwXCJcclxuXSxcclxuLy8gIzB4MGVmIFxyXG5bIFxyXG5cIjAxMDEwMTAxXCIsXHJcblwiMTAxMDEwMTBcIixcclxuXCIwMTAxMDEwMVwiLFxyXG5cIjEwMTAxMDEwXCIsXHJcblwiMDEwMTAxMDFcIixcclxuXCIxMDEwMTAxMFwiLFxyXG5cIjAxMDEwMTAxXCIsXHJcblwiMTAxMDEwMTBcIlxyXG5dLFxyXG4vLyAjMHgwZjAgXHJcblsgXHJcblwiMDAwMDAwMDBcIixcclxuXCIwMDAwMDAwMFwiLFxyXG5cIjAwMDAwMDAwXCIsXHJcblwiMDAwMDAwMDBcIixcclxuXCIwMDAwMDAwMFwiLFxyXG5cIjAwMDAwMDAwXCIsXHJcblwiMDAwMDAwMDBcIixcclxuXCIwMDAwMDAwMFwiXHJcbl0sXHJcbi8vICMweDBmMSBcclxuWyBcclxuXCIwMDAwMDAwMFwiLFxyXG5cIjAxMTEwMDAwXCIsXHJcblwiMDExMTAwMDBcIixcclxuXCIwMTExMDAwMFwiLFxyXG5cIjAwMDAwMDAwXCIsXHJcblwiMDAwMDAwMDBcIixcclxuXCIwMDAwMDAwMFwiLFxyXG5cIjAwMDAwMDAwXCJcclxuXSxcclxuLy8gIzB4MGYyIFxyXG5bIFxyXG5cIjAwMDAwMDAwXCIsXHJcblwiMDAwMDAxMTFcIixcclxuXCIwMDAwMDExMVwiLFxyXG5cIjAwMDAwMTExXCIsXHJcblwiMDAwMDAwMDBcIixcclxuXCIwMDAwMDAwMFwiLFxyXG5cIjAwMDAwMDAwXCIsXHJcblwiMDAwMDAwMDBcIlxyXG5dLFxyXG4vLyAjMHgwZjMgXHJcblsgXHJcblwiMDAwMDAwMDBcIixcclxuXCIwMTExMDExMVwiLFxyXG5cIjAxMTEwMTExXCIsXHJcblwiMDExMTAxMTFcIixcclxuXCIwMDAwMDAwMFwiLFxyXG5cIjAwMDAwMDAwXCIsXHJcblwiMDAwMDAwMDBcIixcclxuXCIwMDAwMDAwMFwiXHJcbl0sXHJcbi8vICMweDBmNCBcclxuWyBcclxuXCIwMDAwMDAwMFwiLFxyXG5cIjAwMDAwMDAwXCIsXHJcblwiMDAwMDAwMDBcIixcclxuXCIwMDAwMDAwMFwiLFxyXG5cIjAwMDAwMDAwXCIsXHJcblwiMDExMTAwMDBcIixcclxuXCIwMTExMDAwMFwiLFxyXG5cIjAxMTEwMDAwXCJcclxuXSxcclxuLy8gIzB4MGY1IFxyXG5bIFxyXG5cIjAwMDAwMDAwXCIsXHJcblwiMDExMTAwMDBcIixcclxuXCIwMTExMDAwMFwiLFxyXG5cIjAxMTEwMDAwXCIsXHJcblwiMDAwMDAwMDBcIixcclxuXCIwMTExMDAwMFwiLFxyXG5cIjAxMTEwMDAwXCIsXHJcblwiMDExMTAwMDBcIlxyXG5dLFxyXG4vLyAjMHgwZjYgXHJcblsgXHJcblwiMDAwMDAwMDBcIixcclxuXCIwMDAwMDExMVwiLFxyXG5cIjAwMDAwMTExXCIsXHJcblwiMDAwMDAxMTFcIixcclxuXCIwMDAwMDAwMFwiLFxyXG5cIjAxMTEwMDAwXCIsXHJcblwiMDExMTAwMDBcIixcclxuXCIwMTExMDAwMFwiXHJcbl0sXHJcbi8vICMweDBmNyBcclxuWyBcclxuXCIwMDAwMDAwMFwiLFxyXG5cIjAxMTEwMTExXCIsXHJcblwiMDExMTAxMTFcIixcclxuXCIwMTExMDExMVwiLFxyXG5cIjAwMDAwMDAwXCIsXHJcblwiMDExMTAwMDBcIixcclxuXCIwMTExMDAwMFwiLFxyXG5cIjAxMTEwMDAwXCJcclxuXSxcclxuLy8gIzB4MGY4IFxyXG5bIFxyXG5cIjAwMDAwMDAwXCIsXHJcblwiMDAwMDAwMDBcIixcclxuXCIwMDAwMDAwMFwiLFxyXG5cIjAwMDAwMDAwXCIsXHJcblwiMDAwMDAwMDBcIixcclxuXCIwMDAwMDExMVwiLFxyXG5cIjAwMDAwMTExXCIsXHJcblwiMDAwMDAxMTFcIlxyXG5dLFxyXG4vLyAjMHgwZjkgXHJcblsgXHJcblwiMDAwMDAwMDBcIixcclxuXCIwMTExMDAwMFwiLFxyXG5cIjAxMTEwMDAwXCIsXHJcblwiMDExMTAwMDBcIixcclxuXCIwMDAwMDAwMFwiLFxyXG5cIjAwMDAwMTExXCIsXHJcblwiMDAwMDAxMTFcIixcclxuXCIwMDAwMDExMVwiXHJcbl0sXHJcbi8vICMweDBmYSBcclxuWyBcclxuXCIwMDAwMDAwMFwiLFxyXG5cIjAwMDAwMTExXCIsXHJcblwiMDAwMDAxMTFcIixcclxuXCIwMDAwMDExMVwiLFxyXG5cIjAwMDAwMDAwXCIsXHJcblwiMDAwMDAxMTFcIixcclxuXCIwMDAwMDExMVwiLFxyXG5cIjAwMDAwMTExXCJcclxuXSxcclxuLy8gIzB4MGZiIFxyXG5bIFxyXG5cIjAwMDAwMDAwXCIsXHJcblwiMDExMTAxMTFcIixcclxuXCIwMTExMDExMVwiLFxyXG5cIjAxMTEwMTExXCIsXHJcblwiMDAwMDAwMDBcIixcclxuXCIwMDAwMDExMVwiLFxyXG5cIjAwMDAwMTExXCIsXHJcblwiMDAwMDAxMTFcIlxyXG5dLFxyXG4vLyAjMHgwZmMgXHJcblsgXHJcblwiMDAwMDAwMDBcIixcclxuXCIwMDAwMDAwMFwiLFxyXG5cIjAwMDAwMDAwXCIsXHJcblwiMDAwMDAwMDBcIixcclxuXCIwMDAwMDAwMFwiLFxyXG5cIjAxMTEwMTExXCIsXHJcblwiMDExMTAxMTFcIixcclxuXCIwMTExMDExMVwiXHJcbl0sXHJcbi8vICMweDBmZCBcclxuWyBcclxuXCIwMDAwMDAwMFwiLFxyXG5cIjAxMTEwMDAwXCIsXHJcblwiMDExMTAwMDBcIixcclxuXCIwMTExMDAwMFwiLFxyXG5cIjAwMDAwMDAwXCIsXHJcblwiMDExMTAxMTFcIixcclxuXCIwMTExMDExMVwiLFxyXG5cIjAxMTEwMTExXCJcclxuXSxcclxuLy8gIzB4MGZlIFxyXG5bIFxyXG5cIjAwMDAwMDAwXCIsXHJcblwiMDAwMDAxMTFcIixcclxuXCIwMDAwMDExMVwiLFxyXG5cIjAwMDAwMTExXCIsXHJcblwiMDAwMDAwMDBcIixcclxuXCIwMTExMDExMVwiLFxyXG5cIjAxMTEwMTExXCIsXHJcblwiMDExMTAxMTFcIlxyXG5dLFxyXG4vLyAjMHgwZmYgXHJcblsgXHJcblwiMDAwMDAwMDBcIixcclxuXCIwMTExMDExMVwiLFxyXG5cIjAxMTEwMTExXCIsXHJcblwiMDExMTAxMTFcIixcclxuXCIwMDAwMDAwMFwiLFxyXG5cIjAxMTEwMTExXCIsXHJcblwiMDExMTAxMTFcIixcclxuXCIwMTExMDExMVwiXHJcbl0sXHJcbi8vICMweDEwMCBcclxuWyBcclxuXCIwMDAwMDAwMFwiLFxyXG5cIjAwMDAwMDAwXCIsXHJcblwiMDAwMDAwMDBcIixcclxuXCIwMDAwMDAwMFwiLFxyXG5cIjAwMDAwMDAwXCIsXHJcblwiMDAwMDAwMDBcIixcclxuXCIwMDAwMDAwMFwiLFxyXG5cIjAwMDAwMDAwXCJcclxuXSxcclxuLy8gIzB4MTAxIFxyXG5bIFxyXG5cIjAwMDAwMDAwXCIsXHJcblwiMDAwMDAwMDBcIixcclxuXCIwMDExMTAwMFwiLFxyXG5cIjAwMDAwMTAwXCIsXHJcblwiMDAxMTExMDBcIixcclxuXCIwMTAwMDEwMFwiLFxyXG5cIjAwMTExMDEwXCIsXHJcblwiMDAwMDAwMDBcIlxyXG5dLFxyXG4vLyAjMHgxMDIgXHJcblsgXHJcblwiMDEwMDAwMDBcIixcclxuXCIwMTAwMDAwMFwiLFxyXG5cIjAxMDExMTAwXCIsXHJcblwiMDExMDAwMTBcIixcclxuXCIwMTAwMDAxMFwiLFxyXG5cIjAxMTAwMDEwXCIsXHJcblwiMDEwMTExMDBcIixcclxuXCIwMDAwMDAwMFwiXHJcbl0sXHJcbi8vICMweDEwMyBcclxuWyBcclxuXCIwMDAwMDAwMFwiLFxyXG5cIjAwMDAwMDAwXCIsXHJcblwiMDAxMTExMDBcIixcclxuXCIwMTAwMDAxMFwiLFxyXG5cIjAxMDAwMDAwXCIsXHJcblwiMDEwMDAwMTBcIixcclxuXCIwMDExMTEwMFwiLFxyXG5cIjAwMDAwMDAwXCJcclxuXSxcclxuLy8gIzB4MTA0IFxyXG5bIFxyXG5cIjAwMDAwMDEwXCIsXHJcblwiMDAwMDAwMTBcIixcclxuXCIwMDExMTAxMFwiLFxyXG5cIjAxMDAwMTEwXCIsXHJcblwiMDEwMDAwMTBcIixcclxuXCIwMTAwMDExMFwiLFxyXG5cIjAwMTExMDEwXCIsXHJcblwiMDAwMDAwMDBcIlxyXG5dLFxyXG4vLyAjMHgxMDUgXHJcblsgXHJcblwiMDAwMDAwMDBcIixcclxuXCIwMDAwMDAwMFwiLFxyXG5cIjAwMTExMTAwXCIsXHJcblwiMDEwMDAwMTBcIixcclxuXCIwMTExMTExMFwiLFxyXG5cIjAxMDAwMDAwXCIsXHJcblwiMDAxMTExMDBcIixcclxuXCIwMDAwMDAwMFwiXHJcbl0sXHJcbi8vICMweDEwNiBcclxuWyBcclxuXCIwMDAwMTEwMFwiLFxyXG5cIjAwMDEwMDEwXCIsXHJcblwiMDAwMTAwMDBcIixcclxuXCIwMTExMTEwMFwiLFxyXG5cIjAwMDEwMDAwXCIsXHJcblwiMDAwMTAwMDBcIixcclxuXCIwMDAxMDAwMFwiLFxyXG5cIjAwMDAwMDAwXCJcclxuXSxcclxuLy8gIzB4MTA3IFxyXG5bIFxyXG5cIjAwMDAwMDAwXCIsXHJcblwiMDAwMDAwMDBcIixcclxuXCIwMDExMTAxMFwiLFxyXG5cIjAxMDAwMTEwXCIsXHJcblwiMDEwMDAxMTBcIixcclxuXCIwMDExMTAxMFwiLFxyXG5cIjAwMDAwMDEwXCIsXHJcblwiMDAxMTExMDBcIlxyXG5dLFxyXG4vLyAjMHgxMDggXHJcblsgXHJcblwiMDEwMDAwMDBcIixcclxuXCIwMTAwMDAwMFwiLFxyXG5cIjAxMDExMTAwXCIsXHJcblwiMDExMDAwMTBcIixcclxuXCIwMTAwMDAxMFwiLFxyXG5cIjAxMDAwMDEwXCIsXHJcblwiMDEwMDAwMTBcIixcclxuXCIwMDAwMDAwMFwiXHJcbl0sXHJcbi8vICMweDEwOSBcclxuWyBcclxuXCIwMDAwMTAwMFwiLFxyXG5cIjAwMDAwMDAwXCIsXHJcblwiMDAwMTEwMDBcIixcclxuXCIwMDAwMTAwMFwiLFxyXG5cIjAwMDAxMDAwXCIsXHJcblwiMDAwMDEwMDBcIixcclxuXCIwMDAxMTEwMFwiLFxyXG5cIjAwMDAwMDAwXCJcclxuXSxcclxuLy8gIzB4MTBhIFxyXG5bIFxyXG5cIjAwMDAwMTAwXCIsXHJcblwiMDAwMDAwMDBcIixcclxuXCIwMDAwMTEwMFwiLFxyXG5cIjAwMDAwMTAwXCIsXHJcblwiMDAwMDAxMDBcIixcclxuXCIwMDAwMDEwMFwiLFxyXG5cIjAxMDAwMTAwXCIsXHJcblwiMDAxMTEwMDBcIlxyXG5dLFxyXG4vLyAjMHgxMGIgXHJcblsgXHJcblwiMDEwMDAwMDBcIixcclxuXCIwMTAwMDAwMFwiLFxyXG5cIjAxMDAwMTAwXCIsXHJcblwiMDEwMDEwMDBcIixcclxuXCIwMTAxMDAwMFwiLFxyXG5cIjAxMTAxMDAwXCIsXHJcblwiMDEwMDAxMDBcIixcclxuXCIwMDAwMDAwMFwiXHJcbl0sXHJcbi8vICMweDEwYyBcclxuWyBcclxuXCIwMDAxMTAwMFwiLFxyXG5cIjAwMDAxMDAwXCIsXHJcblwiMDAwMDEwMDBcIixcclxuXCIwMDAwMTAwMFwiLFxyXG5cIjAwMDAxMDAwXCIsXHJcblwiMDAwMDEwMDBcIixcclxuXCIwMDAxMTEwMFwiLFxyXG5cIjAwMDAwMDAwXCJcclxuXSxcclxuLy8gIzB4MTBkIFxyXG5bIFxyXG5cIjAwMDAwMDAwXCIsXHJcblwiMDAwMDAwMDBcIixcclxuXCIwMTExMDExMFwiLFxyXG5cIjAxMDAxMDAxXCIsXHJcblwiMDEwMDEwMDFcIixcclxuXCIwMTAwMTAwMVwiLFxyXG5cIjAxMDAxMDAxXCIsXHJcblwiMDAwMDAwMDBcIlxyXG5dLFxyXG4vLyAjMHgxMGUgXHJcblsgXHJcblwiMDAwMDAwMDBcIixcclxuXCIwMDAwMDAwMFwiLFxyXG5cIjAxMDExMTAwXCIsXHJcblwiMDExMDAwMTBcIixcclxuXCIwMTAwMDAxMFwiLFxyXG5cIjAxMDAwMDEwXCIsXHJcblwiMDEwMDAwMTBcIixcclxuXCIwMDAwMDAwMFwiXHJcbl0sXHJcbi8vICMweDEwZiBcclxuWyBcclxuXCIwMDAwMDAwMFwiLFxyXG5cIjAwMDAwMDAwXCIsXHJcblwiMDAxMTExMDBcIixcclxuXCIwMTAwMDAxMFwiLFxyXG5cIjAxMDAwMDEwXCIsXHJcblwiMDEwMDAwMTBcIixcclxuXCIwMDExMTEwMFwiLFxyXG5cIjAwMDAwMDAwXCJcclxuXSxcclxuLy8gIzB4MTEwIFxyXG5bIFxyXG5cIjAwMDAwMDAwXCIsXHJcblwiMDAwMDAwMDBcIixcclxuXCIwMTAxMTEwMFwiLFxyXG5cIjAxMTAwMDEwXCIsXHJcblwiMDExMDAwMTBcIixcclxuXCIwMTAxMTEwMFwiLFxyXG5cIjAxMDAwMDAwXCIsXHJcblwiMDEwMDAwMDBcIlxyXG5dLFxyXG4vLyAjMHgxMTEgXHJcblsgXHJcblwiMDAwMDAwMDBcIixcclxuXCIwMDAwMDAwMFwiLFxyXG5cIjAwMTExMDEwXCIsXHJcblwiMDEwMDAxMTBcIixcclxuXCIwMTAwMDExMFwiLFxyXG5cIjAwMTExMDEwXCIsXHJcblwiMDAwMDAwMTBcIixcclxuXCIwMDAwMDAxMFwiXHJcbl0sXHJcbi8vICMweDExMiBcclxuWyBcclxuXCIwMDAwMDAwMFwiLFxyXG5cIjAwMDAwMDAwXCIsXHJcblwiMDEwMTExMDBcIixcclxuXCIwMTEwMDAxMFwiLFxyXG5cIjAxMDAwMDAwXCIsXHJcblwiMDEwMDAwMDBcIixcclxuXCIwMTAwMDAwMFwiLFxyXG5cIjAwMDAwMDAwXCJcclxuXSxcclxuLy8gIzB4MTEzIFxyXG5bIFxyXG5cIjAwMDAwMDAwXCIsXHJcblwiMDAwMDAwMDBcIixcclxuXCIwMDExMTExMFwiLFxyXG5cIjAxMDAwMDAwXCIsXHJcblwiMDAxMTExMDBcIixcclxuXCIwMDAwMDAxMFwiLFxyXG5cIjAxMTExMTAwXCIsXHJcblwiMDAwMDAwMDBcIlxyXG5dLFxyXG4vLyAjMHgxMTQgXHJcblsgXHJcblwiMDAwMTAwMDBcIixcclxuXCIwMDAxMDAwMFwiLFxyXG5cIjAxMTExMTAwXCIsXHJcblwiMDAwMTAwMDBcIixcclxuXCIwMDAxMDAwMFwiLFxyXG5cIjAwMDEwMDEwXCIsXHJcblwiMDAwMDExMDBcIixcclxuXCIwMDAwMDAwMFwiXHJcbl0sXHJcbi8vICMweDExNSBcclxuWyBcclxuXCIwMDAwMDAwMFwiLFxyXG5cIjAwMDAwMDAwXCIsXHJcblwiMDEwMDAwMTBcIixcclxuXCIwMTAwMDAxMFwiLFxyXG5cIjAxMDAwMDEwXCIsXHJcblwiMDEwMDAwMTBcIixcclxuXCIwMDExMTEwMFwiLFxyXG5cIjAwMDAwMDAwXCJcclxuXSxcclxuLy8gIzB4MTE2IFxyXG5bIFxyXG5cIjAwMDAwMDAwXCIsXHJcblwiMDAwMDAwMDBcIixcclxuXCIwMTAwMDAxMFwiLFxyXG5cIjAxMDAwMDEwXCIsXHJcblwiMDEwMDAwMTBcIixcclxuXCIwMDEwMDEwMFwiLFxyXG5cIjAwMDExMDAwXCIsXHJcblwiMDAwMDAwMDBcIlxyXG5dLFxyXG4vLyAjMHgxMTcgXHJcblsgXHJcblwiMDAwMDAwMDBcIixcclxuXCIwMDAwMDAwMFwiLFxyXG5cIjAxMDAwMDAxXCIsXHJcblwiMDEwMDEwMDFcIixcclxuXCIwMTAwMTAwMVwiLFxyXG5cIjAxMDAxMDAxXCIsXHJcblwiMDAxMTAxMTBcIixcclxuXCIwMDAwMDAwMFwiXHJcbl0sXHJcbi8vICMweDExOCBcclxuWyBcclxuXCIwMDAwMDAwMFwiLFxyXG5cIjAwMDAwMDAwXCIsXHJcblwiMDEwMDAxMDBcIixcclxuXCIwMDEwMTAwMFwiLFxyXG5cIjAwMDEwMDAwXCIsXHJcblwiMDAxMDEwMDBcIixcclxuXCIwMTAwMDEwMFwiLFxyXG5cIjAwMDAwMDAwXCJcclxuXSxcclxuLy8gIzB4MTE5IFxyXG5bIFxyXG5cIjAwMDAwMDAwXCIsXHJcblwiMDAwMDAwMDBcIixcclxuXCIwMTAwMDAxMFwiLFxyXG5cIjAxMDAwMDEwXCIsXHJcblwiMDEwMDAxMTBcIixcclxuXCIwMDExMTAxMFwiLFxyXG5cIjAwMDAwMDEwXCIsXHJcblwiMDAxMTExMDBcIlxyXG5dLFxyXG4vLyAjMHgxMWEgXHJcblsgXHJcblwiMDAwMDAwMDBcIixcclxuXCIwMDAwMDAwMFwiLFxyXG5cIjAxMTExMTEwXCIsXHJcblwiMDAwMDAxMDBcIixcclxuXCIwMDAxMTAwMFwiLFxyXG5cIjAwMTAwMDAwXCIsXHJcblwiMDExMTExMTBcIixcclxuXCIwMDAwMDAwMFwiXHJcbl0sXHJcbi8vICMweDExYiBcclxuWyBcclxuXCIwMDAwMTAwMFwiLFxyXG5cIjAwMDAxMDAwXCIsXHJcblwiMDAwMDEwMDBcIixcclxuXCIwMDAwMTAwMFwiLFxyXG5cIjExMTExMTExXCIsXHJcblwiMDAwMDEwMDBcIixcclxuXCIwMDAwMTAwMFwiLFxyXG5cIjAwMDAxMDAwXCJcclxuXSxcclxuLy8gIzB4MTFjIFxyXG5bIFxyXG5cIjAwMDAxMDAwXCIsXHJcblwiMDAwMDEwMDBcIixcclxuXCIwMDAwMTAwMFwiLFxyXG5cIjAwMDAxMDAwXCIsXHJcblwiMDAwMDExMTFcIixcclxuXCIwMDAwMDAwMFwiLFxyXG5cIjAwMDAwMDAwXCIsXHJcblwiMDAwMDAwMDBcIlxyXG5dLFxyXG4vLyAjMHgxMWQgXHJcblsgXHJcblwiMDAwMDEwMDBcIixcclxuXCIwMDAwMTAwMFwiLFxyXG5cIjAwMDAxMDAwXCIsXHJcblwiMDAwMDEwMDBcIixcclxuXCIxMTExMTAwMFwiLFxyXG5cIjAwMDAwMDAwXCIsXHJcblwiMDAwMDAwMDBcIixcclxuXCIwMDAwMDAwMFwiXHJcbl0sXHJcbi8vICMweDExZSBcclxuWyBcclxuXCIwMDAwMTAwMFwiLFxyXG5cIjAwMDAxMDAwXCIsXHJcblwiMDAwMDEwMDBcIixcclxuXCIwMDAwMTAwMFwiLFxyXG5cIjAwMDAxMTExXCIsXHJcblwiMDAwMDEwMDBcIixcclxuXCIwMDAwMTAwMFwiLFxyXG5cIjAwMDAxMDAwXCJcclxuXSxcclxuLy8gIzB4MTFmIFxyXG5bIFxyXG5cIjAwMDAxMDAwXCIsXHJcblwiMDAwMDEwMDBcIixcclxuXCIwMDAwMTAwMFwiLFxyXG5cIjAwMDAxMDAwXCIsXHJcblwiMTExMTExMTFcIixcclxuXCIwMDAwMDAwMFwiLFxyXG5cIjAwMDAwMDAwXCIsXHJcblwiMDAwMDAwMDBcIlxyXG5dLFxyXG4vLyAjMHgxMjAgXHJcblsgXHJcblwiMDAxMTExMDBcIixcclxuXCIwMTAwMDAxMFwiLFxyXG5cIjAxMDAwMTEwXCIsXHJcblwiMDEwMTEwMTBcIixcclxuXCIwMTEwMDAxMFwiLFxyXG5cIjAxMDAwMDEwXCIsXHJcblwiMDAxMTExMDBcIixcclxuXCIwMDAwMDAwMFwiXHJcbl0sXHJcbi8vICMweDEyMSBcclxuWyBcclxuXCIwMDAwMTAwMFwiLFxyXG5cIjAwMDExMDAwXCIsXHJcblwiMDAxMDEwMDBcIixcclxuXCIwMDAwMTAwMFwiLFxyXG5cIjAwMDAxMDAwXCIsXHJcblwiMDAwMDEwMDBcIixcclxuXCIwMDExMTExMFwiLFxyXG5cIjAwMDAwMDAwXCJcclxuXSxcclxuLy8gIzB4MTIyIFxyXG5bIFxyXG5cIjAwMTExMTAwXCIsXHJcblwiMDEwMDAwMTBcIixcclxuXCIwMDAwMDAxMFwiLFxyXG5cIjAwMDAxMTAwXCIsXHJcblwiMDAxMTAwMDBcIixcclxuXCIwMTAwMDAwMFwiLFxyXG5cIjAxMTExMTEwXCIsXHJcblwiMDAwMDAwMDBcIlxyXG5dLFxyXG4vLyAjMHgxMjMgXHJcblsgXHJcblwiMDAxMTExMDBcIixcclxuXCIwMTAwMDAxMFwiLFxyXG5cIjAwMDAwMDEwXCIsXHJcblwiMDAxMTExMDBcIixcclxuXCIwMDAwMDAxMFwiLFxyXG5cIjAxMDAwMDEwXCIsXHJcblwiMDAxMTExMDBcIixcclxuXCIwMDAwMDAwMFwiXHJcbl0sXHJcbi8vICMweDEyNCBcclxuWyBcclxuXCIwMDAwMDEwMFwiLFxyXG5cIjAwMDAxMTAwXCIsXHJcblwiMDAwMTAxMDBcIixcclxuXCIwMDEwMDEwMFwiLFxyXG5cIjAxMTExMTEwXCIsXHJcblwiMDAwMDAxMDBcIixcclxuXCIwMDAwMDEwMFwiLFxyXG5cIjAwMDAwMDAwXCJcclxuXSxcclxuLy8gIzB4MTI1IFxyXG5bIFxyXG5cIjAxMTExMTEwXCIsXHJcblwiMDEwMDAwMDBcIixcclxuXCIwMTExMTAwMFwiLFxyXG5cIjAwMDAwMTAwXCIsXHJcblwiMDAwMDAwMTBcIixcclxuXCIwMTAwMDEwMFwiLFxyXG5cIjAwMTExMDAwXCIsXHJcblwiMDAwMDAwMDBcIlxyXG5dLFxyXG4vLyAjMHgxMjYgXHJcblsgXHJcblwiMDAwMTExMDBcIixcclxuXCIwMDEwMDAwMFwiLFxyXG5cIjAxMDAwMDAwXCIsXHJcblwiMDExMTExMDBcIixcclxuXCIwMTAwMDAxMFwiLFxyXG5cIjAxMDAwMDEwXCIsXHJcblwiMDAxMTExMDBcIixcclxuXCIwMDAwMDAwMFwiXHJcbl0sXHJcbi8vICMweDEyNyBcclxuWyBcclxuXCIwMTExMTExMFwiLFxyXG5cIjAxMDAwMDEwXCIsXHJcblwiMDAwMDAxMDBcIixcclxuXCIwMDAwMTAwMFwiLFxyXG5cIjAwMDEwMDAwXCIsXHJcblwiMDAwMTAwMDBcIixcclxuXCIwMDAxMDAwMFwiLFxyXG5cIjAwMDAwMDAwXCJcclxuXSxcclxuLy8gIzB4MTI4IFxyXG5bIFxyXG5cIjAwMTExMTAwXCIsXHJcblwiMDEwMDAwMTBcIixcclxuXCIwMTAwMDAxMFwiLFxyXG5cIjAwMTExMTAwXCIsXHJcblwiMDEwMDAwMTBcIixcclxuXCIwMTAwMDAxMFwiLFxyXG5cIjAwMTExMTAwXCIsXHJcblwiMDAwMDAwMDBcIlxyXG5dLFxyXG4vLyAjMHgxMjkgXHJcblsgXHJcblwiMDAxMTExMDBcIixcclxuXCIwMTAwMDAxMFwiLFxyXG5cIjAxMDAwMDEwXCIsXHJcblwiMDAxMTExMTBcIixcclxuXCIwMDAwMDAxMFwiLFxyXG5cIjAwMDAwMTAwXCIsXHJcblwiMDAxMTEwMDBcIixcclxuXCIwMDAwMDAwMFwiXHJcbl0sXHJcbi8vICMweDEyYSBcclxuWyBcclxuXCIwMDAwMDAwMFwiLFxyXG5cIjAwMDAwMDAwXCIsXHJcblwiMDAwMDAwMDBcIixcclxuXCIwMTExMTExMFwiLFxyXG5cIjAwMDAwMDAwXCIsXHJcblwiMDAwMDAwMDBcIixcclxuXCIwMDAwMDAwMFwiLFxyXG5cIjAwMDAwMDAwXCJcclxuXSxcclxuLy8gIzB4MTJiIFxyXG5bIFxyXG5cIjAwMDAwMDAwXCIsXHJcblwiMDAwMDAwMDBcIixcclxuXCIwMTExMTExMFwiLFxyXG5cIjAwMDAwMDAwXCIsXHJcblwiMDExMTExMTBcIixcclxuXCIwMDAwMDAwMFwiLFxyXG5cIjAwMDAwMDAwXCIsXHJcblwiMDAwMDAwMDBcIlxyXG5dLFxyXG4vLyAjMHgxMmMgXHJcblsgXHJcblwiMDAwMDAwMDBcIixcclxuXCIwMDAwMDAwMFwiLFxyXG5cIjAwMDAxMDAwXCIsXHJcblwiMDAwMDAwMDBcIixcclxuXCIwMDAwMDAwMFwiLFxyXG5cIjAwMDAxMDAwXCIsXHJcblwiMDAwMDEwMDBcIixcclxuXCIwMDAxMDAwMFwiXHJcbl0sXHJcbi8vICMweDEyZCBcclxuWyBcclxuXCIwMDAwMDAwMFwiLFxyXG5cIjAwMDAwMDEwXCIsXHJcblwiMDAwMDAxMDBcIixcclxuXCIwMDAwMTAwMFwiLFxyXG5cIjAwMDEwMDAwXCIsXHJcblwiMDAxMDAwMDBcIixcclxuXCIwMTAwMDAwMFwiLFxyXG5cIjAwMDAwMDAwXCJcclxuXSxcclxuLy8gIzB4MTJlIFxyXG5bIFxyXG5cIjAwMDAwMDAwXCIsXHJcblwiMDAwMDAwMDBcIixcclxuXCIwMDAwMDAwMFwiLFxyXG5cIjAwMDAwMDAwXCIsXHJcblwiMDAwMDAwMDBcIixcclxuXCIwMDAxMTAwMFwiLFxyXG5cIjAwMDExMDAwXCIsXHJcblwiMDAwMDAwMDBcIlxyXG5dLFxyXG4vLyAjMHgxMmYgXHJcblsgXHJcblwiMDAwMDAwMDBcIixcclxuXCIwMDAwMDAwMFwiLFxyXG5cIjAwMDAwMDAwXCIsXHJcblwiMDAwMDAwMDBcIixcclxuXCIwMDAwMDAwMFwiLFxyXG5cIjAwMDAxMDAwXCIsXHJcblwiMDAwMDEwMDBcIixcclxuXCIwMDAxMDAwMFwiXHJcbl0sXHJcbi8vICMweDEzMCBcclxuWyBcclxuXCIwMDAwMDAwMFwiLFxyXG5cIjExMTExMTExXCIsXHJcblwiMDAwMDAwMDBcIixcclxuXCIwMDAwMDAwMFwiLFxyXG5cIjAwMDAwMDAwXCIsXHJcblwiMDAwMDAwMDBcIixcclxuXCIwMDAwMDAwMFwiLFxyXG5cIjAwMDAwMDAwXCJcclxuXSxcclxuLy8gIzB4MTMxIFxyXG5bIFxyXG5cIjAxMDAwMDAwXCIsXHJcblwiMDEwMDAwMDBcIixcclxuXCIwMTAwMDAwMFwiLFxyXG5cIjAxMDAwMDAwXCIsXHJcblwiMDEwMDAwMDBcIixcclxuXCIwMTAwMDAwMFwiLFxyXG5cIjAxMDAwMDAwXCIsXHJcblwiMDEwMDAwMDBcIlxyXG5dLFxyXG4vLyAjMHgxMzIgXHJcblsgXHJcblwiMTAwMDAwMDBcIixcclxuXCIxMDAwMDAwMFwiLFxyXG5cIjEwMDAwMDAwXCIsXHJcblwiMTAwMDAwMDBcIixcclxuXCIxMDAwMDAwMFwiLFxyXG5cIjEwMDAwMDAwXCIsXHJcblwiMTAwMDAwMDBcIixcclxuXCIxMTExMTExMVwiXHJcbl0sXHJcbi8vICMweDEzMyBcclxuWyBcclxuXCIwMDAwMDAwMVwiLFxyXG5cIjAwMDAwMDAxXCIsXHJcblwiMDAwMDAwMDFcIixcclxuXCIwMDAwMDAwMVwiLFxyXG5cIjAwMDAwMDAxXCIsXHJcblwiMDAwMDAwMDFcIixcclxuXCIwMDAwMDAwMVwiLFxyXG5cIjExMTExMTExXCJcclxuXSxcclxuLy8gIzB4MTM0IFxyXG5bIFxyXG5cIjAwMDAwMDAwXCIsXHJcblwiMDAwMDAwMDBcIixcclxuXCIwMDAwMDAwMFwiLFxyXG5cIjExMTExMTExXCIsXHJcblwiMDAwMDAwMDBcIixcclxuXCIwMDAwMDAwMFwiLFxyXG5cIjAwMDAwMDAwXCIsXHJcblwiMDAwMDAwMDBcIlxyXG5dLFxyXG4vLyAjMHgxMzUgXHJcblsgXHJcblwiMDAwMTAwMDBcIixcclxuXCIwMDAxMDAwMFwiLFxyXG5cIjAwMDEwMDAwXCIsXHJcblwiMDAwMTAwMDBcIixcclxuXCIwMDAxMDAwMFwiLFxyXG5cIjAwMDEwMDAwXCIsXHJcblwiMDAwMTAwMDBcIixcclxuXCIwMDAxMDAwMFwiXHJcbl0sXHJcbi8vICMweDEzNiBcclxuWyBcclxuXCIxMTExMTExMVwiLFxyXG5cIjExMTExMTExXCIsXHJcblwiMDAwMDAwMDBcIixcclxuXCIwMDAwMDAwMFwiLFxyXG5cIjAwMDAwMDAwXCIsXHJcblwiMDAwMDAwMDBcIixcclxuXCIwMDAwMDAwMFwiLFxyXG5cIjAwMDAwMDAwXCJcclxuXSxcclxuLy8gIzB4MTM3IFxyXG5bIFxyXG5cIjExMDAwMDAwXCIsXHJcblwiMTEwMDAwMDBcIixcclxuXCIxMTAwMDAwMFwiLFxyXG5cIjExMDAwMDAwXCIsXHJcblwiMTEwMDAwMDBcIixcclxuXCIxMTAwMDAwMFwiLFxyXG5cIjExMDAwMDAwXCIsXHJcblwiMTEwMDAwMDBcIlxyXG5dLFxyXG4vLyAjMHgxMzggXHJcblsgXHJcblwiMDAwMDAwMDBcIixcclxuXCIwMDAwMDAwMFwiLFxyXG5cIjAwMDAwMDAwXCIsXHJcblwiMDAwMDAwMDBcIixcclxuXCIwMDAwMDAwMFwiLFxyXG5cIjExMTExMTExXCIsXHJcblwiMDAwMDAwMDBcIixcclxuXCIwMDAwMDAwMFwiXHJcbl0sXHJcbi8vICMweDEzOSBcclxuWyBcclxuXCIwMDAwMDEwMFwiLFxyXG5cIjAwMDAwMTAwXCIsXHJcblwiMDAwMDAxMDBcIixcclxuXCIwMDAwMDEwMFwiLFxyXG5cIjAwMDAwMTAwXCIsXHJcblwiMDAwMDAxMDBcIixcclxuXCIwMDAwMDEwMFwiLFxyXG5cIjAwMDAwMTAwXCJcclxuXSxcclxuLy8gIzB4MTNhIFxyXG5bIFxyXG5cIjAwMDAwMDAwXCIsXHJcblwiMDAwMDAwMDBcIixcclxuXCIwMDAwMDAwMFwiLFxyXG5cIjAwMDAwMDAwXCIsXHJcblwiMTExMTExMTFcIixcclxuXCIxMTExMTExMVwiLFxyXG5cIjExMTExMTExXCIsXHJcblwiMTExMTExMTFcIlxyXG5dLFxyXG4vLyAjMHgxM2IgXHJcblsgXHJcblwiMDAwMDExMTFcIixcclxuXCIwMDAwMTExMVwiLFxyXG5cIjAwMDAxMTExXCIsXHJcblwiMDAwMDExMTFcIixcclxuXCIwMDAwMTExMVwiLFxyXG5cIjAwMDAxMTExXCIsXHJcblwiMDAwMDExMTFcIixcclxuXCIwMDAwMTExMVwiXHJcbl0sXHJcbi8vICMweDEzYyBcclxuWyBcclxuXCIwMDAwMDAwMFwiLFxyXG5cIjAwMDAwMDAwXCIsXHJcblwiMDAwMDAwMDBcIixcclxuXCIwMDAwMDAwMFwiLFxyXG5cIjAwMDAwMDAwXCIsXHJcblwiMDAwMDAwMDBcIixcclxuXCIwMDAwMDAwMFwiLFxyXG5cIjExMTExMTExXCJcclxuXSxcclxuLy8gIzB4MTNkIFxyXG5bIFxyXG5cIjAwMDAwMDAxXCIsXHJcblwiMDAwMDAwMDFcIixcclxuXCIwMDAwMDAwMVwiLFxyXG5cIjAwMDAwMDAxXCIsXHJcblwiMDAwMDAwMDFcIixcclxuXCIwMDAwMDAwMVwiLFxyXG5cIjAwMDAwMDAxXCIsXHJcblwiMDAwMDAwMDFcIlxyXG5dLFxyXG4vLyAjMHgxM2UgXHJcblsgXHJcblwiMDAwMDAwMDBcIixcclxuXCIwMDAwMDAwMFwiLFxyXG5cIjAwMDAwMDAwXCIsXHJcblwiMDAwMDAwMDBcIixcclxuXCIwMDAwMDAwMFwiLFxyXG5cIjAwMDAwMDAwXCIsXHJcblwiMTExMTExMTFcIixcclxuXCIxMTExMTExMVwiXHJcbl0sXHJcbi8vICMweDEzZiBcclxuWyBcclxuXCIwMDAwMDAxMVwiLFxyXG5cIjAwMDAwMDExXCIsXHJcblwiMDAwMDAwMTFcIixcclxuXCIwMDAwMDAxMVwiLFxyXG5cIjAwMDAwMDExXCIsXHJcblwiMDAwMDAwMTFcIixcclxuXCIwMDAwMDAxMVwiLFxyXG5cIjAwMDAwMDExXCJcclxuXSxcclxuLy8gIzB4MTQwIFxyXG5bIFxyXG5cIjAwMDAwMDAwXCIsXHJcblwiMDAwMDAwMDBcIixcclxuXCIwMDAwMTAwMFwiLFxyXG5cIjAwMDAwMTAwXCIsXHJcblwiMTExMTExMTBcIixcclxuXCIwMDAwMDEwMFwiLFxyXG5cIjAwMDAxMDAwXCIsXHJcblwiMDAwMDAwMDBcIlxyXG5dLFxyXG4vLyAjMHgxNDEgXHJcblsgXHJcblwiMDAwMDEwMDBcIixcclxuXCIwMDAxMTEwMFwiLFxyXG5cIjAwMTExMTEwXCIsXHJcblwiMDExMTExMTFcIixcclxuXCIwMTExMTExMVwiLFxyXG5cIjAwMDExMTAwXCIsXHJcblwiMDAxMTExMTBcIixcclxuXCIwMDAwMDAwMFwiXHJcbl0sXHJcbi8vICMweDE0MiBcclxuWyBcclxuXCIxMTExMTExMVwiLFxyXG5cIjAxMTExMTExXCIsXHJcblwiMDAxMTExMTFcIixcclxuXCIwMDAxMTExMVwiLFxyXG5cIjAwMDAxMTExXCIsXHJcblwiMDAwMDAxMTFcIixcclxuXCIwMDAwMDAxMVwiLFxyXG5cIjAwMDAwMDAxXCJcclxuXSxcclxuLy8gIzB4MTQzIFxyXG5bIFxyXG5cIjExMTExMTExXCIsXHJcblwiMTExMTExMTFcIixcclxuXCIxMTExMTExMVwiLFxyXG5cIjExMTExMTExXCIsXHJcblwiMTExMTExMTFcIixcclxuXCIxMTExMTExMVwiLFxyXG5cIjExMTExMTExXCIsXHJcblwiMTExMTExMTFcIlxyXG5dLFxyXG4vLyAjMHgxNDQgXHJcblsgXHJcblwiMDAwMDEwMDBcIixcclxuXCIwMDAxMTEwMFwiLFxyXG5cIjAwMTExMTEwXCIsXHJcblwiMDExMTExMTFcIixcclxuXCIwMDExMTExMFwiLFxyXG5cIjAwMDExMTAwXCIsXHJcblwiMDAwMDEwMDBcIixcclxuXCIwMDAwMDAwMFwiXHJcbl0sXHJcbi8vICMweDE0NSBcclxuWyBcclxuXCIwMDAwMDAwMFwiLFxyXG5cIjAwMDAwMDAwXCIsXHJcblwiMDAwMTAwMDBcIixcclxuXCIwMDEwMDAwMFwiLFxyXG5cIjAxMTExMTExXCIsXHJcblwiMDAxMDAwMDBcIixcclxuXCIwMDAxMDAwMFwiLFxyXG5cIjAwMDAwMDAwXCJcclxuXSxcclxuLy8gIzB4MTQ2IFxyXG5bIFxyXG5cIjAwMDAxMDAwXCIsXHJcblwiMDAwMTExMDBcIixcclxuXCIwMDEwMTAxMFwiLFxyXG5cIjAxMTExMTExXCIsXHJcblwiMDAxMDEwMTBcIixcclxuXCIwMDAwMTAwMFwiLFxyXG5cIjAwMDAxMDAwXCIsXHJcblwiMDAwMDAwMDBcIlxyXG5dLFxyXG4vLyAjMHgxNDcgXHJcblsgXHJcblwiMDAwMDAwMDBcIixcclxuXCIwMDExMTEwMFwiLFxyXG5cIjAxMTExMTEwXCIsXHJcblwiMDExMTExMTBcIixcclxuXCIwMTExMTExMFwiLFxyXG5cIjAxMTExMTEwXCIsXHJcblwiMDAxMTExMDBcIixcclxuXCIwMDAwMDAwMFwiXHJcbl0sXHJcbi8vICMweDE0OCBcclxuWyBcclxuXCIwMDAwMDAwMFwiLFxyXG5cIjAwMTExMTAwXCIsXHJcblwiMDEwMDAwMTBcIixcclxuXCIwMTAwMDAxMFwiLFxyXG5cIjAxMDAwMDEwXCIsXHJcblwiMDEwMDAwMTBcIixcclxuXCIwMDExMTEwMFwiLFxyXG5cIjAwMDAwMDAwXCJcclxuXSxcclxuLy8gIzB4MTQ5IFxyXG5bIFxyXG5cIjAwMTExMTAwXCIsXHJcblwiMDEwMDAwMTBcIixcclxuXCIwMDAwMDAxMFwiLFxyXG5cIjAwMDAxMTAwXCIsXHJcblwiMDAwMTAwMDBcIixcclxuXCIwMDAwMDAwMFwiLFxyXG5cIjAwMDEwMDAwXCIsXHJcblwiMDAwMDAwMDBcIlxyXG5dLFxyXG4vLyAjMHgxNGEgXHJcblsgXHJcblwiMTExMTExMTFcIixcclxuXCIxMTAwMDAxMVwiLFxyXG5cIjEwMDAwMDAxXCIsXHJcblwiMTAwMDAwMDFcIixcclxuXCIxMDAwMDAwMVwiLFxyXG5cIjEwMDAwMDAxXCIsXHJcblwiMTEwMDAwMTFcIixcclxuXCIxMTExMTExMVwiXHJcbl0sXHJcbi8vICMweDE0YiBcclxuWyBcclxuXCIwMDAwMDAwMFwiLFxyXG5cIjAwMDAwMDAwXCIsXHJcblwiMDAwMDAwMDBcIixcclxuXCIwMDAwMDAwMFwiLFxyXG5cIjAwMDAwMDExXCIsXHJcblwiMDAwMDAxMDBcIixcclxuXCIwMDAwMTAwMFwiLFxyXG5cIjAwMDAxMDAwXCJcclxuXSxcclxuLy8gIzB4MTRjIFxyXG5bIFxyXG5cIjAwMDAwMDAwXCIsXHJcblwiMDAwMDAwMDBcIixcclxuXCIwMDAwMDAwMFwiLFxyXG5cIjAwMDAwMDAwXCIsXHJcblwiMTEwMDAwMDBcIixcclxuXCIwMDEwMDAwMFwiLFxyXG5cIjAwMDEwMDAwXCIsXHJcblwiMDAwMTAwMDBcIlxyXG5dLFxyXG4vLyAjMHgxNGQgXHJcblsgXHJcblwiMTAwMDAwMDBcIixcclxuXCIxMTAwMDAwMFwiLFxyXG5cIjExMTAwMDAwXCIsXHJcblwiMTExMTAwMDBcIixcclxuXCIxMTExMTAwMFwiLFxyXG5cIjExMTExMTAwXCIsXHJcblwiMTExMTExMTBcIixcclxuXCIxMTExMTExMVwiXHJcbl0sXHJcbi8vICMweDE0ZSBcclxuWyBcclxuXCIwMDAwMDAwMVwiLFxyXG5cIjAwMDAwMDExXCIsXHJcblwiMDAwMDAxMTFcIixcclxuXCIwMDAwMTExMVwiLFxyXG5cIjAwMDExMTExXCIsXHJcblwiMDAxMTExMTFcIixcclxuXCIwMTExMTExMVwiLFxyXG5cIjExMTExMTExXCJcclxuXSxcclxuLy8gIzB4MTRmIFxyXG5bIFxyXG5cIjAwMDAwMDAwXCIsXHJcblwiMDAwMDAwMDBcIixcclxuXCIwMDAwMTAwMFwiLFxyXG5cIjAwMDAwMDAwXCIsXHJcblwiMDAwMDAwMDBcIixcclxuXCIwMDAwMTAwMFwiLFxyXG5cIjAwMDAwMDAwXCIsXHJcblwiMDAwMDAwMDBcIlxyXG5dLFxyXG4vLyAjMHgxNTAgXHJcblsgXHJcblwiMDAwMDAwMDBcIixcclxuXCIwMDAwMTAwMFwiLFxyXG5cIjAwMDExMTAwXCIsXHJcblwiMDAxMDEwMTBcIixcclxuXCIwMDAwMTAwMFwiLFxyXG5cIjAwMDAxMDAwXCIsXHJcblwiMDAwMDEwMDBcIixcclxuXCIwMDAwMDAwMFwiXHJcbl0sXHJcbi8vICMweDE1MSBcclxuWyBcclxuXCIwMDAwMTExMFwiLFxyXG5cIjAwMDExMDAwXCIsXHJcblwiMDAxMTAwMDBcIixcclxuXCIwMTEwMDAwMFwiLFxyXG5cIjAwMTEwMDAwXCIsXHJcblwiMDAwMTEwMDBcIixcclxuXCIwMDAwMTExMFwiLFxyXG5cIjAwMDAwMDAwXCJcclxuXSxcclxuLy8gIzB4MTUyIFxyXG5bIFxyXG5cIjAwMTExMTAwXCIsXHJcblwiMDAxMDAwMDBcIixcclxuXCIwMDEwMDAwMFwiLFxyXG5cIjAwMTAwMDAwXCIsXHJcblwiMDAxMDAwMDBcIixcclxuXCIwMDEwMDAwMFwiLFxyXG5cIjAwMTExMTAwXCIsXHJcblwiMDAwMDAwMDBcIlxyXG5dLFxyXG4vLyAjMHgxNTMgXHJcblsgXHJcblwiMDAxMTAxMTBcIixcclxuXCIwMTExMTExMVwiLFxyXG5cIjAxMTExMTExXCIsXHJcblwiMDExMTExMTFcIixcclxuXCIwMDExMTExMFwiLFxyXG5cIjAwMDExMTAwXCIsXHJcblwiMDAwMDEwMDBcIixcclxuXCIwMDAwMDAwMFwiXHJcbl0sXHJcbi8vICMweDE1NCBcclxuWyBcclxuXCIwMDExMTEwMFwiLFxyXG5cIjAwMDAwMTAwXCIsXHJcblwiMDAwMDAxMDBcIixcclxuXCIwMDAwMDEwMFwiLFxyXG5cIjAwMDAwMTAwXCIsXHJcblwiMDAwMDAxMDBcIixcclxuXCIwMDExMTEwMFwiLFxyXG5cIjAwMDAwMDAwXCJcclxuXSxcclxuLy8gIzB4MTU1IFxyXG5bIFxyXG5cIjAwMDExMTAwXCIsXHJcblwiMDAxMDAwMTBcIixcclxuXCIwMTAwMTAxMFwiLFxyXG5cIjAxMDEwMTEwXCIsXHJcblwiMDEwMDExMDBcIixcclxuXCIwMDEwMDAwMFwiLFxyXG5cIjAwMDExMTEwXCIsXHJcblwiMDAwMDAwMDBcIlxyXG5dLFxyXG4vLyAjMHgxNTYgXHJcblsgXHJcblwiMTExMTExMTFcIixcclxuXCIxMTExMTExMFwiLFxyXG5cIjExMTExMTAwXCIsXHJcblwiMTExMTEwMDBcIixcclxuXCIxMTExMDAwMFwiLFxyXG5cIjExMTAwMDAwXCIsXHJcblwiMTEwMDAwMDBcIixcclxuXCIxMDAwMDAwMFwiXHJcbl0sXHJcbi8vICMweDE1NyBcclxuWyBcclxuXCIwMTExMDAwMFwiLFxyXG5cIjAwMDExMDAwXCIsXHJcblwiMDAwMDExMDBcIixcclxuXCIwMDAwMDExMFwiLFxyXG5cIjAwMDAxMTAwXCIsXHJcblwiMDAwMTEwMDBcIixcclxuXCIwMTExMDAwMFwiLFxyXG5cIjAwMDAwMDAwXCJcclxuXSxcclxuLy8gIzB4MTU4IFxyXG5bIFxyXG5cIjEwMTAwMDAwXCIsXHJcblwiMDEwMTAwMDBcIixcclxuXCIxMDEwMDAwMFwiLFxyXG5cIjAxMDEwMDAwXCIsXHJcblwiMTAxMDAwMDBcIixcclxuXCIwMTAxMDAwMFwiLFxyXG5cIjEwMTAwMDAwXCIsXHJcblwiMDEwMTAwMDBcIlxyXG5dLFxyXG4vLyAjMHgxNTkgXHJcblsgXHJcblwiMDAwMDAwMDBcIixcclxuXCIwMTAwMDAwMFwiLFxyXG5cIjAwMTAwMDAwXCIsXHJcblwiMDAwMTAwMDBcIixcclxuXCIwMDAwMTAwMFwiLFxyXG5cIjAwMDAwMTAwXCIsXHJcblwiMDAwMDAwMTBcIixcclxuXCIwMDAwMDAwMFwiXHJcbl0sXHJcbi8vICMweDE1YSBcclxuWyBcclxuXCIxMDEwMTAxMFwiLFxyXG5cIjAxMDEwMTAxXCIsXHJcblwiMTAxMDEwMTBcIixcclxuXCIwMTAxMDEwMVwiLFxyXG5cIjEwMTAxMDEwXCIsXHJcblwiMDEwMTAxMDFcIixcclxuXCIxMDEwMTAxMFwiLFxyXG5cIjAxMDEwMTAxXCJcclxuXSxcclxuLy8gIzB4MTViIFxyXG5bIFxyXG5cIjExMTEwMDAwXCIsXHJcblwiMTExMTAwMDBcIixcclxuXCIxMTExMDAwMFwiLFxyXG5cIjExMTEwMDAwXCIsXHJcblwiMDAwMDExMTFcIixcclxuXCIwMDAwMTExMVwiLFxyXG5cIjAwMDAxMTExXCIsXHJcblwiMDAwMDExMTFcIlxyXG5dLFxyXG4vLyAjMHgxNWMgXHJcblsgXHJcblwiMDAwMDAwMDBcIixcclxuXCIwMDAwMDAwMFwiLFxyXG5cIjAwMDAwMDAwXCIsXHJcblwiMDAwMDAwMDBcIixcclxuXCIwMDAwMTExMVwiLFxyXG5cIjAwMDAxMDAwXCIsXHJcblwiMDAwMDEwMDBcIixcclxuXCIwMDAwMTAwMFwiXHJcbl0sXHJcbi8vICMweDE1ZCBcclxuWyBcclxuXCIwMDAwMDAwMFwiLFxyXG5cIjAwMDAwMDAwXCIsXHJcblwiMDAwMDAwMDBcIixcclxuXCIwMDAwMDAwMFwiLFxyXG5cIjExMTExMDAwXCIsXHJcblwiMDAwMDEwMDBcIixcclxuXCIwMDAwMTAwMFwiLFxyXG5cIjAwMDAxMDAwXCJcclxuXSxcclxuLy8gIzB4MTVlIFxyXG5bIFxyXG5cIjAwMDAxMDAwXCIsXHJcblwiMDAwMDEwMDBcIixcclxuXCIwMDAwMTAwMFwiLFxyXG5cIjAwMDAxMDAwXCIsXHJcblwiMTExMTEwMDBcIixcclxuXCIwMDAwMTAwMFwiLFxyXG5cIjAwMDAxMDAwXCIsXHJcblwiMDAwMDEwMDBcIlxyXG5dLFxyXG4vLyAjMHgxNWYgXHJcblsgXHJcblwiMDAwMDAwMDBcIixcclxuXCIwMDAwMDAwMFwiLFxyXG5cIjAwMDAwMDAwXCIsXHJcblwiMDAwMDAwMDBcIixcclxuXCIxMTExMTExMVwiLFxyXG5cIjAwMDAxMDAwXCIsXHJcblwiMDAwMDEwMDBcIixcclxuXCIwMDAwMTAwMFwiXHJcbl0sXHJcbi8vICMweDE2MCBcclxuWyBcclxuXCIwMDAwMDAwMFwiLFxyXG5cIjAwMDAwMDAwXCIsXHJcblwiMDAwMDAwMDFcIixcclxuXCIwMDExMTExMFwiLFxyXG5cIjAxMDEwMTAwXCIsXHJcblwiMDAwMTAxMDBcIixcclxuXCIwMDAxMDEwMFwiLFxyXG5cIjAwMDAwMDAwXCJcclxuXSxcclxuLy8gIzB4MTYxIFxyXG5bIFxyXG5cIjAwMDAxMDAwXCIsXHJcblwiMDAwMDEwMDBcIixcclxuXCIwMDAwMTAwMFwiLFxyXG5cIjAwMDAxMDAwXCIsXHJcblwiMDAwMDAwMDBcIixcclxuXCIwMDAwMDAwMFwiLFxyXG5cIjAwMDAxMDAwXCIsXHJcblwiMDAwMDAwMDBcIlxyXG5dLFxyXG4vLyAjMHgxNjIgXHJcblsgXHJcblwiMDAxMDAxMDBcIixcclxuXCIwMDEwMDEwMFwiLFxyXG5cIjAwMTAwMTAwXCIsXHJcblwiMDAwMDAwMDBcIixcclxuXCIwMDAwMDAwMFwiLFxyXG5cIjAwMDAwMDAwXCIsXHJcblwiMDAwMDAwMDBcIixcclxuXCIwMDAwMDAwMFwiXHJcbl0sXHJcbi8vICMweDE2MyBcclxuWyBcclxuXCIwMDEwMDEwMFwiLFxyXG5cIjAwMTAwMTAwXCIsXHJcblwiMDExMTExMTBcIixcclxuXCIwMDEwMDEwMFwiLFxyXG5cIjAxMTExMTEwXCIsXHJcblwiMDAxMDAxMDBcIixcclxuXCIwMDEwMDEwMFwiLFxyXG5cIjAwMDAwMDAwXCJcclxuXSxcclxuLy8gIzB4MTY0IFxyXG5bIFxyXG5cIjAwMDAxMDAwXCIsXHJcblwiMDAwMTExMTBcIixcclxuXCIwMDEwMTAwMFwiLFxyXG5cIjAwMDExMTAwXCIsXHJcblwiMDAwMDEwMTBcIixcclxuXCIwMDExMTEwMFwiLFxyXG5cIjAwMDAxMDAwXCIsXHJcblwiMDAwMDAwMDBcIlxyXG5dLFxyXG4vLyAjMHgxNjUgXHJcblsgXHJcblwiMDAwMDAwMDBcIixcclxuXCIwMTEwMDAxMFwiLFxyXG5cIjAxMTAwMTAwXCIsXHJcblwiMDAwMDEwMDBcIixcclxuXCIwMDAxMDAwMFwiLFxyXG5cIjAwMTAwMTEwXCIsXHJcblwiMDEwMDAxMTBcIixcclxuXCIwMDAwMDAwMFwiXHJcbl0sXHJcbi8vICMweDE2NiBcclxuWyBcclxuXCIwMDExMDAwMFwiLFxyXG5cIjAxMDAxMDAwXCIsXHJcblwiMDEwMDEwMDBcIixcclxuXCIwMDExMDAwMFwiLFxyXG5cIjAxMDAxMDEwXCIsXHJcblwiMDEwMDAxMDBcIixcclxuXCIwMDExMTAxMFwiLFxyXG5cIjAwMDAwMDAwXCJcclxuXSxcclxuLy8gIzB4MTY3IFxyXG5bIFxyXG5cIjAwMDAwMTAwXCIsXHJcblwiMDAwMDEwMDBcIixcclxuXCIwMDAxMDAwMFwiLFxyXG5cIjAwMDAwMDAwXCIsXHJcblwiMDAwMDAwMDBcIixcclxuXCIwMDAwMDAwMFwiLFxyXG5cIjAwMDAwMDAwXCIsXHJcblwiMDAwMDAwMDBcIlxyXG5dLFxyXG4vLyAjMHgxNjggXHJcblsgXHJcblwiMDAwMDAxMDBcIixcclxuXCIwMDAwMTAwMFwiLFxyXG5cIjAwMDEwMDAwXCIsXHJcblwiMDAwMTAwMDBcIixcclxuXCIwMDAxMDAwMFwiLFxyXG5cIjAwMDAxMDAwXCIsXHJcblwiMDAwMDAxMDBcIixcclxuXCIwMDAwMDAwMFwiXHJcbl0sXHJcbi8vICMweDE2OSBcclxuWyBcclxuXCIwMDEwMDAwMFwiLFxyXG5cIjAwMDEwMDAwXCIsXHJcblwiMDAwMDEwMDBcIixcclxuXCIwMDAwMTAwMFwiLFxyXG5cIjAwMDAxMDAwXCIsXHJcblwiMDAwMTAwMDBcIixcclxuXCIwMDEwMDAwMFwiLFxyXG5cIjAwMDAwMDAwXCJcclxuXSxcclxuLy8gIzB4MTZhIFxyXG5bIFxyXG5cIjAwMDAwMDAwXCIsXHJcblwiMDAwMDEwMDBcIixcclxuXCIwMDAwMTAwMFwiLFxyXG5cIjAwMTExMTEwXCIsXHJcblwiMDAwMDEwMDBcIixcclxuXCIwMDAwMTAwMFwiLFxyXG5cIjAwMDAwMDAwXCIsXHJcblwiMDAwMDAwMDBcIlxyXG5dLFxyXG4vLyAjMHgxNmIgXHJcblsgXHJcblwiMDAwMDEwMDBcIixcclxuXCIwMDEwMTAxMFwiLFxyXG5cIjAwMDExMTAwXCIsXHJcblwiMDAxMTExMTBcIixcclxuXCIwMDAxMTEwMFwiLFxyXG5cIjAwMTAxMDEwXCIsXHJcblwiMDAwMDEwMDBcIixcclxuXCIwMDAwMDAwMFwiXHJcbl0sXHJcbi8vICMweDE2YyBcclxuWyBcclxuXCIwMDAwMTExMVwiLFxyXG5cIjAwMDAxMTExXCIsXHJcblwiMDAwMDExMTFcIixcclxuXCIwMDAwMTExMVwiLFxyXG5cIjExMTEwMDAwXCIsXHJcblwiMTExMTAwMDBcIixcclxuXCIxMTExMDAwMFwiLFxyXG5cIjExMTEwMDAwXCJcclxuXSxcclxuLy8gIzB4MTZkIFxyXG5bIFxyXG5cIjEwMDAwMDAxXCIsXHJcblwiMDEwMDAwMTBcIixcclxuXCIwMDEwMDEwMFwiLFxyXG5cIjAwMDExMDAwXCIsXHJcblwiMDAwMTEwMDBcIixcclxuXCIwMDEwMDEwMFwiLFxyXG5cIjAxMDAwMDEwXCIsXHJcblwiMTAwMDAwMDFcIlxyXG5dLFxyXG4vLyAjMHgxNmUgXHJcblsgXHJcblwiMDAwMTAwMDBcIixcclxuXCIwMDAxMDAwMFwiLFxyXG5cIjAwMTAwMDAwXCIsXHJcblwiMTEwMDAwMDBcIixcclxuXCIwMDAwMDAwMFwiLFxyXG5cIjAwMDAwMDAwXCIsXHJcblwiMDAwMDAwMDBcIixcclxuXCIwMDAwMDAwMFwiXHJcbl0sXHJcbi8vICMweDE2ZiBcclxuWyBcclxuXCIwMDAwMTAwMFwiLFxyXG5cIjAwMDAxMDAwXCIsXHJcblwiMDAwMDAxMDBcIixcclxuXCIwMDAwMDAxMVwiLFxyXG5cIjAwMDAwMDAwXCIsXHJcblwiMDAwMDAwMDBcIixcclxuXCIwMDAwMDAwMFwiLFxyXG5cIjAwMDAwMDAwXCJcclxuXSxcclxuLy8gIzB4MTcwIFxyXG5bIFxyXG5cIjExMTExMTExXCIsXHJcblwiMDAwMDAwMDBcIixcclxuXCIwMDAwMDAwMFwiLFxyXG5cIjAwMDAwMDAwXCIsXHJcblwiMDAwMDAwMDBcIixcclxuXCIwMDAwMDAwMFwiLFxyXG5cIjAwMDAwMDAwXCIsXHJcblwiMDAwMDAwMDBcIlxyXG5dLFxyXG4vLyAjMHgxNzEgXHJcblsgXHJcblwiMTAwMDAwMDBcIixcclxuXCIxMDAwMDAwMFwiLFxyXG5cIjEwMDAwMDAwXCIsXHJcblwiMTAwMDAwMDBcIixcclxuXCIxMDAwMDAwMFwiLFxyXG5cIjEwMDAwMDAwXCIsXHJcblwiMTAwMDAwMDBcIixcclxuXCIxMDAwMDAwMFwiXHJcbl0sXHJcbi8vICMweDE3MiBcclxuWyBcclxuXCIxMTExMTExMVwiLFxyXG5cIjEwMDAwMDAwXCIsXHJcblwiMTAwMDAwMDBcIixcclxuXCIxMDAwMDAwMFwiLFxyXG5cIjEwMDAwMDAwXCIsXHJcblwiMTAwMDAwMDBcIixcclxuXCIxMDAwMDAwMFwiLFxyXG5cIjEwMDAwMDAwXCJcclxuXSxcclxuLy8gIzB4MTczIFxyXG5bIFxyXG5cIjExMTExMTExXCIsXHJcblwiMDAwMDAwMDFcIixcclxuXCIwMDAwMDAwMVwiLFxyXG5cIjAwMDAwMDAxXCIsXHJcblwiMDAwMDAwMDFcIixcclxuXCIwMDAwMDAwMVwiLFxyXG5cIjAwMDAwMDAxXCIsXHJcblwiMDAwMDAwMDFcIlxyXG5dLFxyXG4vLyAjMHgxNzQgXHJcblsgXHJcblwiMDAwMDAwMDBcIixcclxuXCIwMDAwMDAwMFwiLFxyXG5cIjExMTExMTExXCIsXHJcblwiMDAwMDAwMDBcIixcclxuXCIwMDAwMDAwMFwiLFxyXG5cIjAwMDAwMDAwXCIsXHJcblwiMDAwMDAwMDBcIixcclxuXCIwMDAwMDAwMFwiXHJcbl0sXHJcbi8vICMweDE3NSBcclxuWyBcclxuXCIwMDEwMDAwMFwiLFxyXG5cIjAwMTAwMDAwXCIsXHJcblwiMDAxMDAwMDBcIixcclxuXCIwMDEwMDAwMFwiLFxyXG5cIjAwMTAwMDAwXCIsXHJcblwiMDAxMDAwMDBcIixcclxuXCIwMDEwMDAwMFwiLFxyXG5cIjAwMTAwMDAwXCJcclxuXSxcclxuLy8gIzB4MTc2IFxyXG5bIFxyXG5cIjAwMDAwMTAwXCIsXHJcblwiMDAwMDEwMDBcIixcclxuXCIwMDAxMDAwMVwiLFxyXG5cIjAwMTAwMDEwXCIsXHJcblwiMDEwMDAxMDBcIixcclxuXCIxMDAwMTAwMFwiLFxyXG5cIjAwMDEwMDAwXCIsXHJcblwiMDAxMDAwMDBcIlxyXG5dLFxyXG4vLyAjMHgxNzcgXHJcblsgXHJcblwiMDAxMDAwMDBcIixcclxuXCIwMDAxMDAwMFwiLFxyXG5cIjEwMDAxMDAwXCIsXHJcblwiMDEwMDAxMDBcIixcclxuXCIwMDEwMDAxMFwiLFxyXG5cIjAwMDEwMDAxXCIsXHJcblwiMDAwMDEwMDBcIixcclxuXCIwMDAwMDEwMFwiXHJcbl0sXHJcbi8vICMweDE3OCBcclxuWyBcclxuXCIwMDAwMDAwMFwiLFxyXG5cIjAwMDAwMDAwXCIsXHJcblwiMDAwMDAwMDBcIixcclxuXCIwMDAwMDAwMFwiLFxyXG5cIjExMTExMTExXCIsXHJcblwiMDAwMDAwMDBcIixcclxuXCIwMDAwMDAwMFwiLFxyXG5cIjAwMDAwMDAwXCJcclxuXSxcclxuLy8gIzB4MTc5IFxyXG5bIFxyXG5cIjAwMDAxMDAwXCIsXHJcblwiMDAwMDEwMDBcIixcclxuXCIwMDAwMTAwMFwiLFxyXG5cIjAwMDAxMDAwXCIsXHJcblwiMDAwMDEwMDBcIixcclxuXCIwMDAwMTAwMFwiLFxyXG5cIjAwMDAxMDAwXCIsXHJcblwiMDAwMDEwMDBcIlxyXG5dLFxyXG4vLyAjMHgxN2EgXHJcblsgXHJcblwiMTExMTExMTFcIixcclxuXCIxMTExMTExMVwiLFxyXG5cIjExMTExMTExXCIsXHJcblwiMTExMTExMTFcIixcclxuXCIwMDAwMDAwMFwiLFxyXG5cIjAwMDAwMDAwXCIsXHJcblwiMDAwMDAwMDBcIixcclxuXCIwMDAwMDAwMFwiXHJcbl0sXHJcbi8vICMweDE3YiBcclxuWyBcclxuXCIxMTExMDAwMFwiLFxyXG5cIjExMTEwMDAwXCIsXHJcblwiMTExMTAwMDBcIixcclxuXCIxMTExMDAwMFwiLFxyXG5cIjExMTEwMDAwXCIsXHJcblwiMTExMTAwMDBcIixcclxuXCIxMTExMDAwMFwiLFxyXG5cIjExMTEwMDAwXCJcclxuXSxcclxuLy8gIzB4MTdjIFxyXG5bIFxyXG5cIjAwMDAwMDAwXCIsXHJcblwiMDAwMDAwMDBcIixcclxuXCIwMDAwMDAwMFwiLFxyXG5cIjAwMDAwMDAwXCIsXHJcblwiMDAwMDAwMDBcIixcclxuXCIwMDAwMDAwMFwiLFxyXG5cIjExMTExMTExXCIsXHJcblwiMDAwMDAwMDBcIlxyXG5dLFxyXG4vLyAjMHgxN2QgXHJcblsgXHJcblwiMDAwMDAwMTBcIixcclxuXCIwMDAwMDAxMFwiLFxyXG5cIjAwMDAwMDEwXCIsXHJcblwiMDAwMDAwMTBcIixcclxuXCIwMDAwMDAxMFwiLFxyXG5cIjAwMDAwMDEwXCIsXHJcblwiMDAwMDAwMTBcIixcclxuXCIwMDAwMDAxMFwiXHJcbl0sXHJcbi8vICMweDE3ZSBcclxuWyBcclxuXCIwMDAwMDAwMFwiLFxyXG5cIjAwMDAwMDAwXCIsXHJcblwiMDAwMDAwMDBcIixcclxuXCIwMDAwMDAwMFwiLFxyXG5cIjAwMDAwMDAwXCIsXHJcblwiMTExMTExMTFcIixcclxuXCIxMTExMTExMVwiLFxyXG5cIjExMTExMTExXCJcclxuXSxcclxuLy8gIzB4MTdmIFxyXG5bIFxyXG5cIjAwMDAwMTExXCIsXHJcblwiMDAwMDAxMTFcIixcclxuXCIwMDAwMDExMVwiLFxyXG5cIjAwMDAwMTExXCIsXHJcblwiMDAwMDAxMTFcIixcclxuXCIwMDAwMDExMVwiLFxyXG5cIjAwMDAwMTExXCIsXHJcblwiMDAwMDAxMTFcIlxyXG5dLFxyXG4vLyAjMHgxODAgXHJcblsgXHJcblwiMDAwMDAwMDBcIixcclxuXCIwMDAwMTAwMFwiLFxyXG5cIjAwMDAxMDAwXCIsXHJcblwiMDAwMDEwMDBcIixcclxuXCIwMDEwMTAxMFwiLFxyXG5cIjAwMDExMTAwXCIsXHJcblwiMDAwMDEwMDBcIixcclxuXCIwMDAwMDAwMFwiXHJcbl0sXHJcbi8vICMweDE4MSBcclxuWyBcclxuXCIwMDAxMDAwMFwiLFxyXG5cIjExMTExMTEwXCIsXHJcblwiMDAxMDAwMDBcIixcclxuXCIwMTExMTEwMFwiLFxyXG5cIjAwMDAwMDEwXCIsXHJcblwiMDAwMDAwMTBcIixcclxuXCIxMTExMTEwMFwiLFxyXG5cIjAwMDAwMDAwXCJcclxuXSxcclxuLy8gIzB4MTgyIFxyXG5bIFxyXG5cIjAwMDAwMDAwXCIsXHJcblwiMTExMTExMDBcIixcclxuXCIwMDAwMDAxMFwiLFxyXG5cIjAwMDAwMDAwXCIsXHJcblwiMDAwMDAwMDBcIixcclxuXCIxMDAwMDAwMFwiLFxyXG5cIjAxMTExMTEwXCIsXHJcblwiMDAwMDAwMDBcIlxyXG5dLFxyXG4vLyAjMHgxODMgXHJcblsgXHJcblwiMDAxMTExMDBcIixcclxuXCIwMDAwMTAwMFwiLFxyXG5cIjAwMDEwMDAwXCIsXHJcblwiMDExMTExMTBcIixcclxuXCIwMDAwMTAwMFwiLFxyXG5cIjAwMDEwMDAwXCIsXHJcblwiMDAwMDExMDBcIixcclxuXCIwMDAwMDAwMFwiXHJcbl0sXHJcbi8vICMweDE4NCBcclxuWyBcclxuXCIwMTAwMDAwMFwiLFxyXG5cIjAxMDAwMDAwXCIsXHJcblwiMDEwMDAwMDBcIixcclxuXCIwMTAwMDAwMFwiLFxyXG5cIjAxMDAwMTAwXCIsXHJcblwiMDEwMDAxMDBcIixcclxuXCIwMDExMTAwMFwiLFxyXG5cIjAwMDAwMDAwXCJcclxuXSxcclxuLy8gIzB4MTg1IFxyXG5bIFxyXG5cIjEwMDAwMTAwXCIsXHJcblwiMTAwMDAwMTBcIixcclxuXCIxMDAwMDAxMFwiLFxyXG5cIjEwMDAwMDEwXCIsXHJcblwiMTAwMDAwMTBcIixcclxuXCIxMDAxMDAwMFwiLFxyXG5cIjAxMTAwMDAwXCIsXHJcblwiMDAwMDAwMDBcIlxyXG5dLFxyXG4vLyAjMHgxODYgXHJcblsgXHJcblwiMTAwMDAxMDBcIixcclxuXCIxMDAxMTExMFwiLFxyXG5cIjEwMDAwMTAwXCIsXHJcblwiMTAwMDAxMDBcIixcclxuXCIxMDAxMTEwMFwiLFxyXG5cIjEwMTAwMTEwXCIsXHJcblwiMDEwMTExMDBcIixcclxuXCIwMDAwMDAwMFwiXHJcbl0sXHJcbi8vICMweDE4NyBcclxuWyBcclxuXCIwMDAxMDAwMFwiLFxyXG5cIjAxMTExMTEwXCIsXHJcblwiMDAwMDEwMDBcIixcclxuXCIwMTExMTExMFwiLFxyXG5cIjAwMDAwMTAwXCIsXHJcblwiMDAwMDAwMTBcIixcclxuXCIwMTEwMDAwMFwiLFxyXG5cIjAwMDExMDAwXCJcclxuXSxcclxuLy8gIzB4MTg4IFxyXG5bIFxyXG5cIjAwMDAxMTAwXCIsXHJcblwiMDAwMTEwMDBcIixcclxuXCIwMDExMDAwMFwiLFxyXG5cIjAxMTAwMDAwXCIsXHJcblwiMDAxMTAwMDBcIixcclxuXCIwMDAxMTAwMFwiLFxyXG5cIjAwMDAxMTAwXCIsXHJcblwiMDAwMDAwMDBcIlxyXG5dLFxyXG4vLyAjMHgxODkgXHJcblsgXHJcblwiMTAwMTExMTBcIixcclxuXCIxMDAwMDAwMFwiLFxyXG5cIjEwMDAwMDAwXCIsXHJcblwiMTAwMDAwMDBcIixcclxuXCIxMDAwMDAwMFwiLFxyXG5cIjEwMDEwMDAwXCIsXHJcblwiMTEwMTExMTBcIixcclxuXCIwMDAwMDAwMFwiXHJcbl0sXHJcbi8vICMweDE4YSBcclxuWyBcclxuXCIwMDAxMDAwMFwiLFxyXG5cIjAxMTExMTEwXCIsXHJcblwiMDAwMTAwMDBcIixcclxuXCIwMTExMTExMFwiLFxyXG5cIjAwMDEwMDAwXCIsXHJcblwiMDExMTAwMDBcIixcclxuXCIxMDAxMTEwMFwiLFxyXG5cIjAxMTEwMDEwXCJcclxuXSxcclxuLy8gIzB4MThiIFxyXG5bIFxyXG5cIjAwMTExMDAwXCIsXHJcblwiMDEwMTAxMDBcIixcclxuXCIxMDAxMDAxMFwiLFxyXG5cIjEwMDEwMDEwXCIsXHJcblwiMTAwMTAwMTBcIixcclxuXCIxMDAxMDAxMFwiLFxyXG5cIjAxMTAwMTAwXCIsXHJcblwiMDAwMDAwMDBcIlxyXG5dLFxyXG4vLyAjMHgxOGMgXHJcblsgXHJcblwiMDEwMDAxMDBcIixcclxuXCIwMTAwMDEwMFwiLFxyXG5cIjAxMDAwMTAwXCIsXHJcblwiMDExMDAxMDBcIixcclxuXCIwMDAwMDEwMFwiLFxyXG5cIjAwMDAxMDAwXCIsXHJcblwiMDAwMTAwMDBcIixcclxuXCIwMDAwMDAwMFwiXHJcbl0sXHJcbi8vICMweDE4ZCBcclxuWyBcclxuXCIwMDEwMDAwMFwiLFxyXG5cIjExMTExMDAwXCIsXHJcblwiMDAxMDAwMDBcIixcclxuXCIxMTExMTAwMFwiLFxyXG5cIjAwMTAwMDEwXCIsXHJcblwiMDAxMDAwMTBcIixcclxuXCIwMDAxMTEwMFwiLFxyXG5cIjAwMDAwMDAwXCJcclxuXSxcclxuLy8gIzB4MThlIFxyXG5bIFxyXG5cIjAxMTEwMDAwXCIsXHJcblwiMDAwMTAwMDBcIixcclxuXCIwMDAxMDEwMFwiLFxyXG5cIjAxMTExMTEwXCIsXHJcblwiMTAwMTAxMDBcIixcclxuXCIxMDAxMDEwMFwiLFxyXG5cIjAxMTAwMTAwXCIsXHJcblwiMDAwMDAwMDBcIlxyXG5dLFxyXG4vLyAjMHgxOGYgXHJcblsgXHJcblwiMDExMDAwMDBcIixcclxuXCIwMDAwMDAwMFwiLFxyXG5cIjEwMDExMTAwXCIsXHJcblwiMTAxMDAwMTBcIixcclxuXCIxMTAwMDAxMFwiLFxyXG5cIjEwMDAwMDEwXCIsXHJcblwiMDAwMTExMDBcIixcclxuXCIwMDAwMDAwMFwiXHJcbl0sXHJcbi8vICMweDE5MCBcclxuWyBcclxuXCIwMTAwMDEwMFwiLFxyXG5cIjAxMDAwMTAwXCIsXHJcblwiMTExMTExMTBcIixcclxuXCIwMTAwMDEwMFwiLFxyXG5cIjAxMDExMDAwXCIsXHJcblwiMDEwMDAwMDBcIixcclxuXCIwMDExMTExMFwiLFxyXG5cIjAwMDAwMDAwXCJcclxuXSxcclxuLy8gIzB4MTkxIFxyXG5bIFxyXG5cIjAwMTAwMDAwXCIsXHJcblwiMTExMTExMDBcIixcclxuXCIwMTAwMDAwMFwiLFxyXG5cIjAxMDExMTEwXCIsXHJcblwiMTAwMDAwMDBcIixcclxuXCIxMDEwMDAwMFwiLFxyXG5cIjEwMTExMTEwXCIsXHJcblwiMDAwMDAwMDBcIlxyXG5dLFxyXG4vLyAjMHgxOTIgXHJcblsgXHJcblwiMDAwMDEwMDBcIixcclxuXCIxMTExMTExMFwiLFxyXG5cIjAwMDAxMDAwXCIsXHJcblwiMDAxMTEwMDBcIixcclxuXCIwMTAwMTAwMFwiLFxyXG5cIjAwMTExMDAwXCIsXHJcblwiMDAwMDEwMDBcIixcclxuXCIwMDAxMDAwMFwiXHJcbl0sXHJcbi8vICMweDE5MyBcclxuWyBcclxuXCIwMDEwMDAwMFwiLFxyXG5cIjAwMTAwMDEwXCIsXHJcblwiMDAxMDExMDBcIixcclxuXCIwMDExMDAwMFwiLFxyXG5cIjAxMDAwMDAwXCIsXHJcblwiMTAwMDAwMDBcIixcclxuXCIwMTExMTExMFwiLFxyXG5cIjAwMDAwMDAwXCJcclxuXSxcclxuLy8gIzB4MTk0IFxyXG5bIFxyXG5cIjAwMTAwMDEwXCIsXHJcblwiMTExMTEwMDFcIixcclxuXCIwMDEwMDEwMVwiLFxyXG5cIjAwMTAwMTAwXCIsXHJcblwiMDAxMDAxMDBcIixcclxuXCIwMDEwMDEwMFwiLFxyXG5cIjAxMDAxMDAwXCIsXHJcblwiMDAwMDAwMDBcIlxyXG5dLFxyXG4vLyAjMHgxOTUgXHJcblsgXHJcblwiMDAxMDAwMDBcIixcclxuXCIxMTExMTAxMFwiLFxyXG5cIjAxMDAwMDAxXCIsXHJcblwiMDEwMDAxMDBcIixcclxuXCIxMDAxMTEwMFwiLFxyXG5cIjEwMTAwMTEwXCIsXHJcblwiMDAwMTExMDBcIixcclxuXCIwMDAwMDAwMFwiXHJcbl0sXHJcbi8vICMweDE5NiBcclxuWyBcclxuXCIxMTEwMDAwMFwiLFxyXG5cIjAwMTAwMTEwXCIsXHJcblwiMDEwMDAxMDFcIixcclxuXCIxMDAwMDEwMFwiLFxyXG5cIjEwMDAwMTAwXCIsXHJcblwiMTAwMDEwMDBcIixcclxuXCIwMTExMDAwMFwiLFxyXG5cIjAwMDAwMDAwXCJcclxuXSxcclxuLy8gIzB4MTk3IFxyXG5bIFxyXG5cIjExMTExMTEwXCIsXHJcblwiMDAwMDAxMDBcIixcclxuXCIwMDAwMTAwMFwiLFxyXG5cIjAwMDEwMDAwXCIsXHJcblwiMDAwMTAwMDBcIixcclxuXCIwMDAwMTAwMFwiLFxyXG5cIjAwMDAwMTAwXCIsXHJcblwiMDAwMDAwMDBcIlxyXG5dLFxyXG4vLyAjMHgxOTggXHJcblsgXHJcblwiMDAxMDAwMDBcIixcclxuXCIxMTExMTExMFwiLFxyXG5cIjAwMDEwMDAwXCIsXHJcblwiMDAwMDEwMDBcIixcclxuXCIwMTAwMDEwMFwiLFxyXG5cIjAwMTAwMDAwXCIsXHJcblwiMDAwMTEwMDBcIixcclxuXCIwMDAwMDAwMFwiXHJcbl0sXHJcbi8vICMweDE5OSBcclxuWyBcclxuXCIwMDAxMDAwMFwiLFxyXG5cIjAwMTAwMDAwXCIsXHJcblwiMDAxMDAwMDBcIixcclxuXCIwMTExMDAwMFwiLFxyXG5cIjAxMDAxMDAwXCIsXHJcblwiMTAwMDEwMDBcIixcclxuXCIxMDAwMDExMFwiLFxyXG5cIjAwMDAwMDAwXCJcclxuXSxcclxuLy8gIzB4MTlhIFxyXG5bIFxyXG5cIjEwMDAwMDAwXCIsXHJcblwiMDExMTExMDBcIixcclxuXCIwMDAwMDAxMFwiLFxyXG5cIjAwMDAwMDEwXCIsXHJcblwiMDAwMDAwMTBcIixcclxuXCIwMDAwMDEwMFwiLFxyXG5cIjAwMDExMDAwXCIsXHJcblwiMDAwMDAwMDBcIlxyXG5dLFxyXG4vLyAjMHgxOWIgXHJcblsgXHJcblwiMDExMTExMDBcIixcclxuXCIwMDAwMTAwMFwiLFxyXG5cIjAwMDEwMDAwXCIsXHJcblwiMDAxMDExMDBcIixcclxuXCIwMTAwMDAxMFwiLFxyXG5cIjAwMDAwMDEwXCIsXHJcblwiMDAxMDAxMDBcIixcclxuXCIwMDAxMTAwMFwiXHJcbl0sXHJcbi8vICMweDE5YyBcclxuWyBcclxuXCIxMDAwMDEwMFwiLFxyXG5cIjEwMTExMTEwXCIsXHJcblwiMTAwMDAxMDBcIixcclxuXCIxMDAwMDEwMFwiLFxyXG5cIjEwMDAwMTAwXCIsXHJcblwiMTAwMDAxMDBcIixcclxuXCIwMTAwMTAwMFwiLFxyXG5cIjAwMDAwMDAwXCJcclxuXSxcclxuLy8gIzB4MTlkIFxyXG5bIFxyXG5cIjAwMDExMTEwXCIsXHJcblwiMDAwMTAwMDBcIixcclxuXCIwMDAxMDAwMFwiLFxyXG5cIjAwMDEwMDAwXCIsXHJcblwiMDAwMDAwMDBcIixcclxuXCIwMDAwMDAwMFwiLFxyXG5cIjAwMDAwMDAwXCIsXHJcblwiMDAwMDAwMDBcIlxyXG5dLFxyXG4vLyAjMHgxOWUgXHJcblsgXHJcblwiMDAwMDAwMDBcIixcclxuXCIwMDEwMDAwMFwiLFxyXG5cIjAxMTEwMDAwXCIsXHJcblwiMDAxMDAwMDBcIixcclxuXCIwMTExMTAwMFwiLFxyXG5cIjEwMDEwMTAwXCIsXHJcblwiMDExMDEwMDBcIixcclxuXCIwMDAwMDAwMFwiXHJcbl0sXHJcbi8vICMweDE5ZiBcclxuWyBcclxuXCIwMDAwMDAwMFwiLFxyXG5cIjAwMDAwMDAwXCIsXHJcblwiMDEwMTEwMDBcIixcclxuXCIxMTEwMDEwMFwiLFxyXG5cIjAwMTAxMDAwXCIsXHJcblwiMDAxMDAwMDBcIixcclxuXCIwMDAxMDAwMFwiLFxyXG5cIjAwMDAwMDAwXCJcclxuXSxcclxuLy8gIzB4MWEwIFxyXG5bIFxyXG5cIjAwMTAwMDAwXCIsXHJcblwiMTExMDAxMDBcIixcclxuXCIwMDEwMTAxMFwiLFxyXG5cIjAwMTEwMDEwXCIsXHJcblwiMDExMDAwMTBcIixcclxuXCIxMDEwMDAxMFwiLFxyXG5cIjAwMTAwMTAwXCIsXHJcblwiMDAwMDAwMDBcIlxyXG5dLFxyXG4vLyAjMHgxYTEgXHJcblsgXHJcblwiMDAwMDAxMDBcIixcclxuXCIwMTAwMDEwMFwiLFxyXG5cIjAxMTExMTAwXCIsXHJcblwiMDEwMDEwMTBcIixcclxuXCIxMDExMDAxMFwiLFxyXG5cIjEwMDEwMTExXCIsXHJcblwiMDExMDAxMTBcIixcclxuXCIwMDAwMDAwMFwiXHJcbl0sXHJcbi8vICMweDFhMiBcclxuWyBcclxuXCIwMDExMTAwMFwiLFxyXG5cIjAwMDAwMDAwXCIsXHJcblwiMDAwMTAwMDBcIixcclxuXCIwMTAwMTAxMFwiLFxyXG5cIjAxMDAxMDEwXCIsXHJcblwiMTAwMDEwMTBcIixcclxuXCIwMDExMDAwMFwiLFxyXG5cIjAwMDAwMDAwXCJcclxuXSxcclxuLy8gIzB4MWEzIFxyXG5bIFxyXG5cIjAwMTAwMDAwXCIsXHJcblwiMTExMTExMDBcIixcclxuXCIwMDEwMDAwMFwiLFxyXG5cIjAxMTExMTAwXCIsXHJcblwiMTAxMDEwMTBcIixcclxuXCIxMDAxMDAxMFwiLFxyXG5cIjAxMTAwMTAwXCIsXHJcblwiMDAwMDAwMDBcIlxyXG5dLFxyXG4vLyAjMHgxYTQgXHJcblsgXHJcblwiMDAwMTEwMDBcIixcclxuXCIwMDAwMDAwMFwiLFxyXG5cIjAwMTExMTAwXCIsXHJcblwiMDEwMDAwMTBcIixcclxuXCIwMDAwMDAxMFwiLFxyXG5cIjAwMDAwMTAwXCIsXHJcblwiMDAwMDEwMDBcIixcclxuXCIwMDAwMDAwMFwiXHJcbl0sXHJcbi8vICMweDFhNSBcclxuWyBcclxuXCIwMDAxMDAwMFwiLFxyXG5cIjAwMDAwMDAwXCIsXHJcblwiMDExMTExMDBcIixcclxuXCIwMDAwMTAwMFwiLFxyXG5cIjAwMDEwMDAwXCIsXHJcblwiMDAxMDEwMDBcIixcclxuXCIwMTAwMDExMFwiLFxyXG5cIjAwMDAwMDAwXCJcclxuXSxcclxuLy8gIzB4MWE2IFxyXG5bIFxyXG5cIjAwMTAwMDAwXCIsXHJcblwiMTExMTExMDFcIixcclxuXCIwMDEwMDAwMVwiLFxyXG5cIjAxMTExMTAwXCIsXHJcblwiMTAxMDAwMTBcIixcclxuXCIxMDEwMDAxMFwiLFxyXG5cIjAxMTAwMTAwXCIsXHJcblwiMDAwMDAwMDBcIlxyXG5dLFxyXG4vLyAjMHgxYTcgXHJcblsgXHJcblwiMDEwMDEwMDBcIixcclxuXCIwMTAwMTEwMFwiLFxyXG5cIjAwMTEwMDEwXCIsXHJcblwiMTExMDAwMTBcIixcclxuXCIwMDEwMDEwMFwiLFxyXG5cIjAwMDEwMDAwXCIsXHJcblwiMDAwMTAwMDBcIixcclxuXCIwMDAwMTAwMFwiXHJcbl0sXHJcbi8vICMweDFhOCBcclxuWyBcclxuXCIwMDAwMTAwMFwiLFxyXG5cIjEwMDExMTAwXCIsXHJcblwiMTAxMDEwMTBcIixcclxuXCIxMTAwMTAxMFwiLFxyXG5cIjExMDAxMDEwXCIsXHJcblwiMTAwMDExMDBcIixcclxuXCIwMDAxMTAwMFwiLFxyXG5cIjAwMDAwMDAwXCJcclxuXSxcclxuLy8gIzB4MWE5IFxyXG5bIFxyXG5cIjAwMDAxMDAwXCIsXHJcblwiMDAwMDExMTBcIixcclxuXCIwMDAwMTAwMFwiLFxyXG5cIjAwMDAxMDAwXCIsXHJcblwiMDExMTEwMDBcIixcclxuXCIxMDAwMTExMFwiLFxyXG5cIjAxMTExMDAwXCIsXHJcblwiMDAwMDAwMDBcIlxyXG5dLFxyXG4vLyAjMHgxYWEgXHJcblsgXHJcblwiMTAwMTExMTBcIixcclxuXCIxMDAwMDEwMFwiLFxyXG5cIjEwMDExMTEwXCIsXHJcblwiMTAwMDAxMDBcIixcclxuXCIxMDAxMTEwMFwiLFxyXG5cIjEwMTAwMTEwXCIsXHJcblwiMTEwMTExMDBcIixcclxuXCIwMDAwMDAwMFwiXHJcbl0sXHJcbi8vICMweDFhYiBcclxuWyBcclxuXCIwMDAwMDAwMFwiLFxyXG5cIjAwMTAwMDAwXCIsXHJcblwiMDEwMTAwMDBcIixcclxuXCIxMDAwMTAwMFwiLFxyXG5cIjAwMDAwMTAwXCIsXHJcblwiMDAwMDAwMTBcIixcclxuXCIwMDAwMDAxMFwiLFxyXG5cIjAwMDAwMDAwXCJcclxuXSxcclxuLy8gIzB4MWFjIFxyXG5bIFxyXG5cIjAwMTAwMDAwXCIsXHJcblwiMTExMDAxMTBcIixcclxuXCIwMDEwMTEwMFwiLFxyXG5cIjAwMTEwMTAwXCIsXHJcblwiMDExMDAxMDBcIixcclxuXCIxMDEwMDEwMFwiLFxyXG5cIjAwMTAwMDEwXCIsXHJcblwiMDAwMDAwMDBcIlxyXG5dLFxyXG4vLyAjMHgxYWQgXHJcblsgXHJcblwiMDAwMDAxMDBcIixcclxuXCIwMTAwMDEwMFwiLFxyXG5cIjAxMTExMTAwXCIsXHJcblwiMDEwMDEwMTBcIixcclxuXCIxMDExMDAxMFwiLFxyXG5cIjEwMDEwMDEwXCIsXHJcblwiMDExMDAxMDBcIixcclxuXCIwMDAwMDAwMFwiXHJcbl0sXHJcbi8vICMweDFhZSBcclxuWyBcclxuXCIwMTExMTEwMFwiLFxyXG5cIjAwMDAxMDAwXCIsXHJcblwiMDAwMTAwMDBcIixcclxuXCIwMDExMTEwMFwiLFxyXG5cIjAxMDAwMDEwXCIsXHJcblwiMDAwMTEwMTBcIixcclxuXCIwMDEwMDEwMFwiLFxyXG5cIjAwMDExMDAwXCJcclxuXSxcclxuLy8gIzB4MWFmIFxyXG5bIFxyXG5cIjAwMTAwMDAwXCIsXHJcblwiMTExMDAxMDBcIixcclxuXCIwMDEwMTAxMFwiLFxyXG5cIjAwMTEwMDEwXCIsXHJcblwiMDExMDAxMTBcIixcclxuXCIxMDEwMTAxMVwiLFxyXG5cIjAwMTAwMTEwXCIsXHJcblwiMDAwMDAwMDBcIlxyXG5dLFxyXG4vLyAjMHgxYjAgXHJcblsgXHJcblwiMDAxMDAwMDBcIixcclxuXCIxMTExMTEwMVwiLFxyXG5cIjAwMTAwMDAxXCIsXHJcblwiMDExMDAwMDBcIixcclxuXCIxMDEwMDAwMFwiLFxyXG5cIjAxMTAwMDEwXCIsXHJcblwiMDAxMTExMTBcIixcclxuXCIwMDAwMDAwMFwiXHJcbl0sXHJcbi8vICMweDFiMSBcclxuWyBcclxuXCIwMDAwMDAwMFwiLFxyXG5cIjAwMDAwMDAwXCIsXHJcblwiMDAwMDAwMDBcIixcclxuXCIwMDAwMDAwMFwiLFxyXG5cIjAwMDAxMDAwXCIsXHJcblwiMDAwMDEwMDBcIixcclxuXCIwMDAwMTAwMFwiLFxyXG5cIjAxMTExMDAwXCJcclxuXSxcclxuLy8gIzB4MWIyIFxyXG5bIFxyXG5cIjAwMDAwMDAwXCIsXHJcblwiMDAwMDAwMDBcIixcclxuXCIwMTAwMTAwMFwiLFxyXG5cIjAxMDAwMTAwXCIsXHJcblwiMDEwMDAxMDBcIixcclxuXCIwMTAwMDEwMFwiLFxyXG5cIjAwMTAwMDAwXCIsXHJcblwiMDAwMDAwMDBcIlxyXG5dLFxyXG4vLyAjMHgxYjMgXHJcblsgXHJcblwiMDAwMDAwMDBcIixcclxuXCIwMDAwMDAwMFwiLFxyXG5cIjAwMDEwMDAwXCIsXHJcblwiMTAxMTEwMDBcIixcclxuXCIxMTAxMDEwMFwiLFxyXG5cIjEwMDExMDAwXCIsXHJcblwiMDAxMTAwMDBcIixcclxuXCIwMDAwMDAwMFwiXHJcbl0sXHJcbi8vICMweDFiNCBcclxuWyBcclxuXCIwMDAxMDAwMFwiLFxyXG5cIjExMTExMTEwXCIsXHJcblwiMDAxMDAwMDBcIixcclxuXCIwMTExMDEwMFwiLFxyXG5cIjEwMTExMDAwXCIsXHJcblwiMDEwMDEwMDBcIixcclxuXCIwMTExMTExMFwiLFxyXG5cIjAwMDAwMDAwXCJcclxuXSxcclxuLy8gIzB4MWI1IFxyXG5bIFxyXG5cIjAwMDAwMDAwXCIsXHJcblwiMDAwMDAwMDBcIixcclxuXCIwMDAwMDAwMFwiLFxyXG5cIjAwMDAwMDAwXCIsXHJcblwiMDAwMDAwMDBcIixcclxuXCIwMTAwMDAwMFwiLFxyXG5cIjAwMTAwMDAwXCIsXHJcblwiMDAwMTAwMDBcIlxyXG5dLFxyXG4vLyAjMHgxYjYgXHJcblsgXHJcblwiMDAwMDAwMDBcIixcclxuXCIwMDEwMDAwMFwiLFxyXG5cIjAwMDAwMDAwXCIsXHJcblwiMDExMTEwMDBcIixcclxuXCIwMDAwMDEwMFwiLFxyXG5cIjAwMDAwMTAwXCIsXHJcblwiMDAwMDEwMDBcIixcclxuXCIwMDAwMDAwMFwiXHJcbl0sXHJcbi8vICMweDFiNyBcclxuWyBcclxuXCIwMDAwMDAwMFwiLFxyXG5cIjAwMDAwMDAwXCIsXHJcblwiMDAxMDAwMDBcIixcclxuXCIwMDExMTAwMFwiLFxyXG5cIjAwMTAwMDAwXCIsXHJcblwiMDExMTEwMDBcIixcclxuXCIwMTEwMDAwMFwiLFxyXG5cIjAwMDAwMDAwXCJcclxuXSxcclxuLy8gIzB4MWI4IFxyXG5bIFxyXG5cIjAxMTEwMDAwXCIsXHJcblwiMDEwMTAwMDBcIixcclxuXCIwMTExMDAwMFwiLFxyXG5cIjAwMDAwMDAwXCIsXHJcblwiMDAwMDAwMDBcIixcclxuXCIwMDAwMDAwMFwiLFxyXG5cIjAwMDAwMDAwXCIsXHJcblwiMDAwMDAwMDBcIlxyXG5dLFxyXG4vLyAjMHgxYjkgXHJcblsgXHJcblwiMDAwMDAwMDBcIixcclxuXCIwMDAwMDAwMFwiLFxyXG5cIjAwMDAwMDAwXCIsXHJcblwiMDAwMDAwMDBcIixcclxuXCIwMDAwMDAwMFwiLFxyXG5cIjAwMDAwMDAwXCIsXHJcblwiMDAxMDAwMDBcIixcclxuXCIwMDAwMDAwMFwiXHJcbl0sXHJcbi8vICMweDFiYSBcclxuWyBcclxuXCIwMDAwMDAwMFwiLFxyXG5cIjAwMTAwMDAwXCIsXHJcblwiMDAwMDAwMDBcIixcclxuXCIwMTExMTAwMFwiLFxyXG5cIjAwMDEwMDAwXCIsXHJcblwiMDAxMTAwMDBcIixcclxuXCIwMTAwMTEwMFwiLFxyXG5cIjAwMDAwMDAwXCJcclxuXSxcclxuLy8gIzB4MWJiIFxyXG5bIFxyXG5cIjAwMDAwMDAwXCIsXHJcblwiMDAwMDAwMDBcIixcclxuXCIwMDAwMDAwMFwiLFxyXG5cIjExMTExMDAwXCIsXHJcblwiMDAwMDAxMDBcIixcclxuXCIwMDAwMDEwMFwiLFxyXG5cIjAwMDExMDAwXCIsXHJcblwiMDAwMDAwMDBcIlxyXG5dLFxyXG4vLyAjMHgxYmMgXHJcblsgXHJcblwiMDAxMDAwMDBcIixcclxuXCIxMDAxMDAwMFwiLFxyXG5cIjAxMDAwMDAwXCIsXHJcblwiMDAwMDAwMDBcIixcclxuXCIwMDAwMDAwMFwiLFxyXG5cIjAwMDAwMDAwXCIsXHJcblwiMDAwMDAwMDBcIixcclxuXCIwMDAwMDAwMFwiXHJcbl0sXHJcbi8vICMweDFiZCBcclxuWyBcclxuXCIwMDAwMDAwMFwiLFxyXG5cIjAwMDAwMDAwXCIsXHJcblwiMDAwMDAwMDBcIixcclxuXCIwMDAwMDAwMFwiLFxyXG5cIjAwMDAwMDAwXCIsXHJcblwiMDExMTAwMDBcIixcclxuXCIwMTAxMDAwMFwiLFxyXG5cIjAxMTEwMDAwXCJcclxuXSxcclxuLy8gIzB4MWJlIFxyXG5bIFxyXG5cIjAwMDAwMDAwXCIsXHJcblwiMDAxMDAwMDBcIixcclxuXCIwMTExMDEwMFwiLFxyXG5cIjAwMTAwMDAwXCIsXHJcblwiMDExMTEwMDBcIixcclxuXCIxMDEwMDEwMFwiLFxyXG5cIjAxMTAxMDAwXCIsXHJcblwiMDAwMDAwMDBcIlxyXG5dLFxyXG4vLyAjMHgxYmYgXHJcblsgXHJcblwiMDAwMDAwMDBcIixcclxuXCIwMDAwMDAwMFwiLFxyXG5cIjAwMDAwMDAwXCIsXHJcblwiMDAwMTExMDBcIixcclxuXCIwMDAwMDAwMFwiLFxyXG5cIjAwMDAwMDAwXCIsXHJcblwiMDAwMDAwMDBcIixcclxuXCIwMDAwMDAwMFwiXHJcbl0sXHJcbi8vICMweDFjMCBcclxuWyBcclxuXCIwMDAxMTEwMFwiLFxyXG5cIjAwMDExMTAwXCIsXHJcblwiMDAxMTExMTBcIixcclxuXCIwMDAxMTEwMFwiLFxyXG5cIjAwMDAxMDAwXCIsXHJcblwiMDAwMDAwMDBcIixcclxuXCIwMDExMTExMFwiLFxyXG5cIjAwMDAwMDAwXCJcclxuXSxcclxuLy8gIzB4MWMxIFxyXG5bIFxyXG5cIjExMTExMTExXCIsXHJcblwiMTExMTAxMTFcIixcclxuXCIxMTExMDExMVwiLFxyXG5cIjExMTEwMTExXCIsXHJcblwiMTEwMTAxMDFcIixcclxuXCIxMTEwMDAxMVwiLFxyXG5cIjExMTEwMTExXCIsXHJcblwiMTExMTExMTFcIlxyXG5dLFxyXG4vLyAjMHgxYzIgXHJcblsgXHJcblwiMTExMTExMTFcIixcclxuXCIxMTExMDExMVwiLFxyXG5cIjExMTAwMDExXCIsXHJcblwiMTEwMTAxMDFcIixcclxuXCIxMTExMDExMVwiLFxyXG5cIjExMTEwMTExXCIsXHJcblwiMTExMTAxMTFcIixcclxuXCIxMTExMTExMVwiXHJcbl0sXHJcbi8vICMweDFjMyBcclxuWyBcclxuXCIxMTExMTExMVwiLFxyXG5cIjExMTExMTExXCIsXHJcblwiMTExMTAxMTFcIixcclxuXCIxMTExMTAxMVwiLFxyXG5cIjEwMDAwMDAxXCIsXHJcblwiMTExMTEwMTFcIixcclxuXCIxMTExMDExMVwiLFxyXG5cIjExMTExMTExXCJcclxuXSxcclxuLy8gIzB4MWM0IFxyXG5bIFxyXG5cIjExMTExMTExXCIsXHJcblwiMTExMTExMTFcIixcclxuXCIxMTEwMTExMVwiLFxyXG5cIjExMDExMTExXCIsXHJcblwiMTAwMDAwMDFcIixcclxuXCIxMTAxMTExMVwiLFxyXG5cIjExMTAxMTExXCIsXHJcblwiMTExMTExMTFcIlxyXG5dLFxyXG4vLyAjMHgxYzUgXHJcblsgXHJcblwiMTAxMTEwMTFcIixcclxuXCIxMDExMTAxMVwiLFxyXG5cIjEwMTExMDExXCIsXHJcblwiMTAwMDAwMTFcIixcclxuXCIxMDExMTAxMVwiLFxyXG5cIjEwMTExMDExXCIsXHJcblwiMTAxMTEwMTFcIixcclxuXCIxMTExMTExMVwiXHJcbl0sXHJcbi8vICMweDFjNiBcclxuWyBcclxuXCIxMTEwMDAxMVwiLFxyXG5cIjExMDExMTAxXCIsXHJcblwiMTAxMTExMTFcIixcclxuXCIxMDExMTExMVwiLFxyXG5cIjEwMTExMTExXCIsXHJcblwiMTEwMTExMDFcIixcclxuXCIxMTEwMDAxMVwiLFxyXG5cIjExMTExMTExXCJcclxuXSxcclxuLy8gIzB4MWM3IFxyXG5bIFxyXG5cIjAwMDExMDAwXCIsXHJcblwiMDAxMDAxMDBcIixcclxuXCIwMTExMTExMFwiLFxyXG5cIjExMTExMTExXCIsXHJcblwiMDEwMTEwMTBcIixcclxuXCIwMDEwMDEwMFwiLFxyXG5cIjAwMDAwMDAwXCIsXHJcblwiMDAwMDAwMDBcIlxyXG5dLFxyXG4vLyAjMHgxYzggXHJcblsgXHJcblwiMTExMDAwMDBcIixcclxuXCIwMTAwMDExMVwiLFxyXG5cIjAxMDAwMDEwXCIsXHJcblwiMDExMTExMTBcIixcclxuXCIwMTAwMDAxMFwiLFxyXG5cIjAxMDAwMTExXCIsXHJcblwiMTExMDAwMDBcIixcclxuXCIwMDAwMDAwMFwiXHJcbl0sXHJcbi8vICMweDFjOSBcclxuWyBcclxuXCIwMDEwMDAxMFwiLFxyXG5cIjAwMTExMTEwXCIsXHJcblwiMDAxMDEwMTBcIixcclxuXCIwMDAwMTAwMFwiLFxyXG5cIjAwMDAxMDAwXCIsXHJcblwiMDEwMDEwMDFcIixcclxuXCIwMTExMTExMVwiLFxyXG5cIjAxMDAwMDAxXCJcclxuXSxcclxuLy8gIzB4MWNhIFxyXG5bIFxyXG5cIjAwMDExMTAwXCIsXHJcblwiMDAwMTExMDBcIixcclxuXCIwMDAwMTAwMFwiLFxyXG5cIjAwMTExMTEwXCIsXHJcblwiMDAwMDEwMDBcIixcclxuXCIwMDAwMTAwMFwiLFxyXG5cIjAwMDEwMTAwXCIsXHJcblwiMDAxMDAwMTBcIlxyXG5dLFxyXG4vLyAjMHgxY2IgXHJcblsgXHJcblwiMDAwMDAwMDBcIixcclxuXCIwMDAxMDAwMVwiLFxyXG5cIjExMDEwMDEwXCIsXHJcblwiMTExMTExMDBcIixcclxuXCIxMTAxMDAxMFwiLFxyXG5cIjAwMDEwMDAxXCIsXHJcblwiMDAwMDAwMDBcIixcclxuXCIwMDAwMDAwMFwiXHJcbl0sXHJcbi8vICMweDFjYyBcclxuWyBcclxuXCIwMDAwMDAwMFwiLFxyXG5cIjEwMDAxMDAwXCIsXHJcblwiMDEwMDEwMTFcIixcclxuXCIwMDExMTExMVwiLFxyXG5cIjAxMDAxMDExXCIsXHJcblwiMTAwMDEwMDBcIixcclxuXCIwMDAwMDAwMFwiLFxyXG5cIjAwMDAwMDAwXCJcclxuXSxcclxuLy8gIzB4MWNkIFxyXG5bIFxyXG5cIjAwMTAwMDEwXCIsXHJcblwiMDAwMTAxMDBcIixcclxuXCIwMDAwMTAwMFwiLFxyXG5cIjAwMDAxMDAwXCIsXHJcblwiMDAxMTExMTBcIixcclxuXCIwMDAwMTAwMFwiLFxyXG5cIjAwMDExMTAwXCIsXHJcblwiMDAwMTExMDBcIlxyXG5dLFxyXG4vLyAjMHgxY2UgXHJcblsgXHJcblwiMDAxMTExMDBcIixcclxuXCIwMTExMTExMFwiLFxyXG5cIjExMTExMTExXCIsXHJcblwiMTEwMTEwMTFcIixcclxuXCIxMTExMTExMVwiLFxyXG5cIjExMTAwMTExXCIsXHJcblwiMDExMTExMTBcIixcclxuXCIwMDExMTEwMFwiXHJcbl0sXHJcbi8vICMweDFjZiBcclxuWyBcclxuXCIwMDExMTEwMFwiLFxyXG5cIjAxMDAwMDEwXCIsXHJcblwiMTAwMDAwMDFcIixcclxuXCIxMDEwMDEwMVwiLFxyXG5cIjEwMDAwMDAxXCIsXHJcblwiMTAwMTEwMDFcIixcclxuXCIwMTAwMDAxMFwiLFxyXG5cIjAwMTExMTAwXCJcclxuXSxcclxuLy8gIzB4MWQwIFxyXG5bIFxyXG5cIjAwMTExMTEwXCIsXHJcblwiMDAxMDAwMTBcIixcclxuXCIwMDEwMDAxMFwiLFxyXG5cIjAwMTExMTEwXCIsXHJcblwiMDAxMDAwMTBcIixcclxuXCIwMDEwMDAxMFwiLFxyXG5cIjAwMTExMTEwXCIsXHJcblwiMDAwMDAwMDBcIlxyXG5dLFxyXG4vLyAjMHgxZDEgXHJcblsgXHJcblwiMDAxMTExMTBcIixcclxuXCIwMDEwMDAxMFwiLFxyXG5cIjAwMTExMTEwXCIsXHJcblwiMDAxMDAwMTBcIixcclxuXCIwMDExMTExMFwiLFxyXG5cIjAwMTAwMDEwXCIsXHJcblwiMDEwMDAwMTBcIixcclxuXCIwMDAwMDAwMFwiXHJcbl0sXHJcbi8vICMweDFkMiBcclxuWyBcclxuXCIwMDAwMTAwMFwiLFxyXG5cIjAwMTAxMDEwXCIsXHJcblwiMDAxMDEwMTBcIixcclxuXCIwMDAwMTAwMFwiLFxyXG5cIjAwMDEwMTAwXCIsXHJcblwiMDAxMDAwMTBcIixcclxuXCIwMTAwMDAwMVwiLFxyXG5cIjAwMDAwMDAwXCJcclxuXSxcclxuLy8gIzB4MWQzIFxyXG5bIFxyXG5cIjAwMDAxMDAwXCIsXHJcblwiMDAwMDEwMDFcIixcclxuXCIwMDExMTAxMFwiLFxyXG5cIjAwMDAxMTAwXCIsXHJcblwiMDAwMTExMDBcIixcclxuXCIwMDEwMTAxMFwiLFxyXG5cIjAxMDAxMDAxXCIsXHJcblwiMDAwMDAwMDBcIlxyXG5dLFxyXG4vLyAjMHgxZDQgXHJcblsgXHJcblwiMDAwMDEwMDBcIixcclxuXCIwMDAwMTAwMFwiLFxyXG5cIjAwMTExMTEwXCIsXHJcblwiMDAwMDEwMDBcIixcclxuXCIwMDAxMTEwMFwiLFxyXG5cIjAwMTAxMDEwXCIsXHJcblwiMDEwMDEwMDFcIixcclxuXCIwMDAwMDAwMFwiXHJcbl0sXHJcbi8vICMweDFkNSBcclxuWyBcclxuXCIwMDAwMTAwMFwiLFxyXG5cIjAwMDEwMTAwXCIsXHJcblwiMDAxMTExMTBcIixcclxuXCIwMTAwMTAwMVwiLFxyXG5cIjAwMTExMTEwXCIsXHJcblwiMDAwMTExMDBcIixcclxuXCIwMTExMTExMVwiLFxyXG5cIjAwMDAwMDAwXCJcclxuXSxcclxuLy8gIzB4MWQ2IFxyXG5bIFxyXG5cIjAwMDAwMDAwXCIsXHJcblwiMDAwMDEwMDBcIixcclxuXCIwMDAwMTAwMFwiLFxyXG5cIjAwMTExMTEwXCIsXHJcblwiMDAwMDEwMDBcIixcclxuXCIwMDAwMTAwMFwiLFxyXG5cIjAxMTExMTExXCIsXHJcblwiMDAwMDAwMDBcIlxyXG5dLFxyXG4vLyAjMHgxZDcgXHJcblsgXHJcblwiMDAwMDEwMDBcIixcclxuXCIwMTAwMTAwMFwiLFxyXG5cIjAxMTExMTEwXCIsXHJcblwiMDEwMDEwMDBcIixcclxuXCIwMDExMTExMFwiLFxyXG5cIjAwMDAxMDAwXCIsXHJcblwiMDExMTExMTFcIixcclxuXCIwMDAwMDAwMFwiXHJcbl0sXHJcbi8vICMweDFkOCBcclxuWyBcclxuXCIwMDEwMDAwMFwiLFxyXG5cIjAwMTExMTEwXCIsXHJcblwiMDEwMDEwMDBcIixcclxuXCIwMDExMTEwMFwiLFxyXG5cIjAwMTAxMDAwXCIsXHJcblwiMDExMTExMTBcIixcclxuXCIwMDAwMTAwMFwiLFxyXG5cIjAwMDAwMDAwXCJcclxuXSxcclxuLy8gIzB4MWQ5IFxyXG5bIFxyXG5cIjAwMDAwMTAwXCIsXHJcblwiMDExMTExMTBcIixcclxuXCIwMTAxMDEwMFwiLFxyXG5cIjAxMTExMTExXCIsXHJcblwiMDEwMTAwMTBcIixcclxuXCIwMTExMTExMVwiLFxyXG5cIjAwMDAxMDEwXCIsXHJcblwiMDAwMDAwMDBcIlxyXG5dLFxyXG4vLyAjMHgxZGEgXHJcblsgXHJcblwiMDAwMDEwMDBcIixcclxuXCIwMDAxMDEwMFwiLFxyXG5cIjAwMTAwMDEwXCIsXHJcblwiMDExMTExMTFcIixcclxuXCIwMDAxMDAxMFwiLFxyXG5cIjAwMDEwMDEwXCIsXHJcblwiMDAxMDAxMDBcIixcclxuXCIwMDAwMDAwMFwiXHJcbl0sXHJcbi8vICMweDFkYiBcclxuWyBcclxuXCIwMDExMTAwMFwiLFxyXG5cIjAwMDEwMDEwXCIsXHJcblwiMDExMTExMTFcIixcclxuXCIwMDAxMDExMVwiLFxyXG5cIjAwMTExMDExXCIsXHJcblwiMDEwMTAwMTBcIixcclxuXCIwMDAxMDEwMFwiLFxyXG5cIjAwMDAwMDAwXCJcclxuXSxcclxuLy8gIzB4MWRjIFxyXG5bIFxyXG5cIjAxMTExMTExXCIsXHJcblwiMDEwMDEwMDFcIixcclxuXCIwMTAwMTAwMVwiLFxyXG5cIjAxMTExMTExXCIsXHJcblwiMDEwMDAwMDFcIixcclxuXCIwMTAwMDAwMVwiLFxyXG5cIjAxMDAwMDAxXCIsXHJcblwiMDAwMDAwMDBcIlxyXG5dLFxyXG4vLyAjMHgxZGQgXHJcblsgXHJcblwiMDAxMDAwMTBcIixcclxuXCIwMDAxMDEwMFwiLFxyXG5cIjAwMTExMTEwXCIsXHJcblwiMDAwMDEwMDBcIixcclxuXCIwMDExMTExMFwiLFxyXG5cIjAwMDAxMDAwXCIsXHJcblwiMDAwMDEwMDBcIixcclxuXCIwMDAwMDAwMFwiXHJcbl0sXHJcbi8vICMweDFkZSBcclxuWyBcclxuXCIwMDAwMTEwMFwiLFxyXG5cIjAwMDEwMDEwXCIsXHJcblwiMDAwMTAwMDBcIixcclxuXCIwMDExMTAwMFwiLFxyXG5cIjAwMDEwMDAwXCIsXHJcblwiMDAwMTAwMDBcIixcclxuXCIwMDExMTExMFwiLFxyXG5cIjAwMDAwMDAwXCJcclxuXSxcclxuLy8gIzB4MWRmIFxyXG5bIFxyXG5cIjAwMDAwMDAwXCIsXHJcblwiMTEwMDAwMDBcIixcclxuXCIxMTAwMTAwMFwiLFxyXG5cIjAxMDEwMTAwXCIsXHJcblwiMDEwMTAxMDBcIixcclxuXCIwMTAxMDEwMVwiLFxyXG5cIjAwMTAwMDEwXCIsXHJcblwiMDAwMDAwMDBcIlxyXG5dLFxyXG4vLyAjMHgxZTAgXHJcblsgXHJcblwiMDAwMDAwMDBcIixcclxuXCIwMDAwMDAwMFwiLFxyXG5cIjAwMDAwMDAwXCIsXHJcblwiMDAwMDAwMDBcIixcclxuXCIwMDAwMDAwMFwiLFxyXG5cIjAwMDAwMDEwXCIsXHJcblwiMTExMTExMTFcIixcclxuXCIwMDAwMDAxMFwiXHJcbl0sXHJcbi8vICMweDFlMSBcclxuWyBcclxuXCIwMDAwMDAxMFwiLFxyXG5cIjAwMDAwMDEwXCIsXHJcblwiMDAwMDAwMTBcIixcclxuXCIwMDAwMDAxMFwiLFxyXG5cIjAwMDAwMDEwXCIsXHJcblwiMDAwMDAwMTBcIixcclxuXCIwMDAwMDExMVwiLFxyXG5cIjAwMDAwMDEwXCJcclxuXSxcclxuLy8gIzB4MWUyIFxyXG5bIFxyXG5cIjAwMDAwMDEwXCIsXHJcblwiMDAwMDAwMTBcIixcclxuXCIwMDAwMDAxMFwiLFxyXG5cIjAwMDAwMDEwXCIsXHJcblwiMDAwMDAwMTBcIixcclxuXCIwMDAwMDAxMFwiLFxyXG5cIjExMTExMTExXCIsXHJcblwiMDAwMDAwMTBcIlxyXG5dLFxyXG4vLyAjMHgxZTMgXHJcblsgXHJcblwiMDAwMDAwMDBcIixcclxuXCIwMDAwMDAwMFwiLFxyXG5cIjAwMTAwMDAwXCIsXHJcblwiMDEwMTAwMDBcIixcclxuXCIxMDAwMTAwMFwiLFxyXG5cIjAwMDAwMTAxXCIsXHJcblwiMDAwMDAwMTBcIixcclxuXCIwMDAwMDAwMFwiXHJcbl0sXHJcbi8vICMweDFlNCBcclxuWyBcclxuXCIwMDAwMDAwMFwiLFxyXG5cIjAwMDAxMTEwXCIsXHJcblwiMDAwMTAwMDFcIixcclxuXCIwMDEwMDAxMFwiLFxyXG5cIjExMDAwMTAwXCIsXHJcblwiMDAwMDAxMDBcIixcclxuXCIwMDAwMDAxMFwiLFxyXG5cIjAwMDAwMDAxXCJcclxuXSxcclxuLy8gIzB4MWU1IFxyXG5bIFxyXG5cIjAwMDAwMDAwXCIsXHJcblwiMTExMTExMTFcIixcclxuXCIwMDAwMDAwMFwiLFxyXG5cIjEwMDAwMDAxXCIsXHJcblwiMDEwMDAwMTBcIixcclxuXCIwMTAwMDAxMFwiLFxyXG5cIjEwMDAwMDAxXCIsXHJcblwiMDAwMDAwMDBcIlxyXG5dLFxyXG4vLyAjMHgxZTYgXHJcblsgXHJcblwiMDAwMDAwMDBcIixcclxuXCIwMTExMDAwMFwiLFxyXG5cIjEwMDAxMDAwXCIsXHJcblwiMDEwMDAxMDBcIixcclxuXCIwMDEwMDAxMVwiLFxyXG5cIjAwMTAwMDAwXCIsXHJcblwiMDEwMDAwMDBcIixcclxuXCIxMDAwMDAwMFwiXHJcbl0sXHJcbi8vICMweDFlNyBcclxuWyBcclxuXCIwMDAwMDAwMFwiLFxyXG5cIjExMDAwMTAwXCIsXHJcblwiMTAxMDAxMDBcIixcclxuXCIxMDAxMDEwMFwiLFxyXG5cIjEwMDAxMTExXCIsXHJcblwiMTAwMTAxMDBcIixcclxuXCIxMDEwMDEwMFwiLFxyXG5cIjExMDAwMTAwXCJcclxuXSxcclxuLy8gIzB4MWU4IFxyXG5bIFxyXG5cIjAwMDAwMDAwXCIsXHJcblwiMDAxMDAwMTFcIixcclxuXCIwMDEwMDEwMVwiLFxyXG5cIjAwMTAxMDAxXCIsXHJcblwiMTExMTAwMDFcIixcclxuXCIwMDEwMTAwMVwiLFxyXG5cIjAwMTAwMTAxXCIsXHJcblwiMDAxMDAwMTFcIlxyXG5dLFxyXG4vLyAjMHgxZTkgXHJcblsgXHJcblwiMTAwMDEwMDBcIixcclxuXCIxMDAxMDAwMFwiLFxyXG5cIjEwMTAwMDAwXCIsXHJcblwiMTEwMDAwMDBcIixcclxuXCIxMTAwMDAwMFwiLFxyXG5cIjEwMTAxMDAwXCIsXHJcblwiMTAwMTEwMDBcIixcclxuXCIxMDExMTAwMFwiXHJcbl0sXHJcbi8vICMweDFlYSBcclxuWyBcclxuXCIxMDEwMTAwMFwiLFxyXG5cIjEwMTEwMDAwXCIsXHJcblwiMTAxMTEwMDBcIixcclxuXCIxMTAwMDAwMFwiLFxyXG5cIjExMDAwMDAwXCIsXHJcblwiMTAxMDAwMDBcIixcclxuXCIxMDAxMDAwMFwiLFxyXG5cIjEwMDAxMDAwXCJcclxuXSxcclxuLy8gIzB4MWViIFxyXG5bIFxyXG5cIjEwMDAwMDAwXCIsXHJcblwiMDEwMDAwMDBcIixcclxuXCIwMDEwMDAwMFwiLFxyXG5cIjAwMDEwMDAwXCIsXHJcblwiMDAwMTExMTFcIixcclxuXCIwMDEwMDAwMFwiLFxyXG5cIjAxMDAwMDAwXCIsXHJcblwiMTAwMDAwMDBcIlxyXG5dLFxyXG4vLyAjMHgxZWMgXHJcblsgXHJcblwiMDAwMDAwMDBcIixcclxuXCIwMDAwMDAwMFwiLFxyXG5cIjAwMTAwMTAwXCIsXHJcblwiMDAxMDAxMDBcIixcclxuXCIxMTEwMDExMVwiLFxyXG5cIjAwMTAwMTAwXCIsXHJcblwiMDAxMDAxMDBcIixcclxuXCIwMDAwMDAwMFwiXHJcbl0sXHJcbi8vICMweDFlZCBcclxuWyBcclxuXCIwMDAwMTAwMFwiLFxyXG5cIjAwMDAxMDAwXCIsXHJcblwiMDAxMTExMTBcIixcclxuXCIwMDAwMDAwMFwiLFxyXG5cIjAwMDAwMDAwXCIsXHJcblwiMDAxMTExMTBcIixcclxuXCIwMDAwMTAwMFwiLFxyXG5cIjAwMDAxMDAwXCJcclxuXSxcclxuLy8gIzB4MWVlIFxyXG5bIFxyXG5cIjAwMDAxMDAwXCIsXHJcblwiMDAwMTAwMDBcIixcclxuXCIwMDEwMDAwMFwiLFxyXG5cIjAwMDEwMDAwXCIsXHJcblwiMDAwMDEwMDBcIixcclxuXCIwMDAwMDEwMFwiLFxyXG5cIjAwMDAwMDEwXCIsXHJcblwiMDAwMDAxMDBcIlxyXG5dLFxyXG4vLyAjMHgxZWYgXHJcblsgXHJcblwiMDEwMTAxMDFcIixcclxuXCIxMDEwMTAxMFwiLFxyXG5cIjAxMDEwMTAxXCIsXHJcblwiMTAxMDEwMTBcIixcclxuXCIwMTAxMDEwMVwiLFxyXG5cIjEwMTAxMDEwXCIsXHJcblwiMDEwMTAxMDFcIixcclxuXCIxMDEwMTAxMFwiXHJcbl0sXHJcbi8vICMweDFmMCBcclxuWyBcclxuXCIwMDAwMDAwMFwiLFxyXG5cIjAwMDAwMDAwXCIsXHJcblwiMDAwMDAwMDBcIixcclxuXCIwMDAwMDAwMFwiLFxyXG5cIjAwMDAwMDAwXCIsXHJcblwiMDAwMDAwMDBcIixcclxuXCIwMDAwMDAwMFwiLFxyXG5cIjAwMDAwMDAwXCJcclxuXSxcclxuLy8gIzB4MWYxIFxyXG5bIFxyXG5cIjAwMDAwMDAwXCIsXHJcblwiMDExMTAwMDBcIixcclxuXCIwMTExMDAwMFwiLFxyXG5cIjAxMTEwMDAwXCIsXHJcblwiMDAwMDAwMDBcIixcclxuXCIwMDAwMDAwMFwiLFxyXG5cIjAwMDAwMDAwXCIsXHJcblwiMDAwMDAwMDBcIlxyXG5dLFxyXG4vLyAjMHgxZjIgXHJcblsgXHJcblwiMDAwMDAwMDBcIixcclxuXCIwMDAwMDExMVwiLFxyXG5cIjAwMDAwMTExXCIsXHJcblwiMDAwMDAxMTFcIixcclxuXCIwMDAwMDAwMFwiLFxyXG5cIjAwMDAwMDAwXCIsXHJcblwiMDAwMDAwMDBcIixcclxuXCIwMDAwMDAwMFwiXHJcbl0sXHJcbi8vICMweDFmMyBcclxuWyBcclxuXCIwMDAwMDAwMFwiLFxyXG5cIjAxMTEwMTExXCIsXHJcblwiMDExMTAxMTFcIixcclxuXCIwMTExMDExMVwiLFxyXG5cIjAwMDAwMDAwXCIsXHJcblwiMDAwMDAwMDBcIixcclxuXCIwMDAwMDAwMFwiLFxyXG5cIjAwMDAwMDAwXCJcclxuXSxcclxuLy8gIzB4MWY0IFxyXG5bIFxyXG5cIjAwMDAwMDAwXCIsXHJcblwiMDAwMDAwMDBcIixcclxuXCIwMDAwMDAwMFwiLFxyXG5cIjAwMDAwMDAwXCIsXHJcblwiMDAwMDAwMDBcIixcclxuXCIwMTExMDAwMFwiLFxyXG5cIjAxMTEwMDAwXCIsXHJcblwiMDExMTAwMDBcIlxyXG5dLFxyXG4vLyAjMHgxZjUgXHJcblsgXHJcblwiMDAwMDAwMDBcIixcclxuXCIwMTExMDAwMFwiLFxyXG5cIjAxMTEwMDAwXCIsXHJcblwiMDExMTAwMDBcIixcclxuXCIwMDAwMDAwMFwiLFxyXG5cIjAxMTEwMDAwXCIsXHJcblwiMDExMTAwMDBcIixcclxuXCIwMTExMDAwMFwiXHJcbl0sXHJcbi8vICMweDFmNiBcclxuWyBcclxuXCIwMDAwMDAwMFwiLFxyXG5cIjAwMDAwMTExXCIsXHJcblwiMDAwMDAxMTFcIixcclxuXCIwMDAwMDExMVwiLFxyXG5cIjAwMDAwMDAwXCIsXHJcblwiMDExMTAwMDBcIixcclxuXCIwMTExMDAwMFwiLFxyXG5cIjAxMTEwMDAwXCJcclxuXSxcclxuLy8gIzB4MWY3IFxyXG5bIFxyXG5cIjAwMDAwMDAwXCIsXHJcblwiMDExMTAxMTFcIixcclxuXCIwMTExMDExMVwiLFxyXG5cIjAxMTEwMTExXCIsXHJcblwiMDAwMDAwMDBcIixcclxuXCIwMTExMDAwMFwiLFxyXG5cIjAxMTEwMDAwXCIsXHJcblwiMDExMTAwMDBcIlxyXG5dLFxyXG4vLyAjMHgxZjggXHJcblsgXHJcblwiMDAwMDAwMDBcIixcclxuXCIwMDAwMDAwMFwiLFxyXG5cIjAwMDAwMDAwXCIsXHJcblwiMDAwMDAwMDBcIixcclxuXCIwMDAwMDAwMFwiLFxyXG5cIjAwMDAwMTExXCIsXHJcblwiMDAwMDAxMTFcIixcclxuXCIwMDAwMDExMVwiXHJcbl0sXHJcbi8vICMweDFmOSBcclxuWyBcclxuXCIwMDAwMDAwMFwiLFxyXG5cIjAxMTEwMDAwXCIsXHJcblwiMDExMTAwMDBcIixcclxuXCIwMTExMDAwMFwiLFxyXG5cIjAwMDAwMDAwXCIsXHJcblwiMDAwMDAxMTFcIixcclxuXCIwMDAwMDExMVwiLFxyXG5cIjAwMDAwMTExXCJcclxuXSxcclxuLy8gIzB4MWZhIFxyXG5bIFxyXG5cIjAwMDAwMDAwXCIsXHJcblwiMDAwMDAxMTFcIixcclxuXCIwMDAwMDExMVwiLFxyXG5cIjAwMDAwMTExXCIsXHJcblwiMDAwMDAwMDBcIixcclxuXCIwMDAwMDExMVwiLFxyXG5cIjAwMDAwMTExXCIsXHJcblwiMDAwMDAxMTFcIlxyXG5dLFxyXG4vLyAjMHgxZmIgXHJcblsgXHJcblwiMDAwMDAwMDBcIixcclxuXCIwMTExMDExMVwiLFxyXG5cIjAxMTEwMTExXCIsXHJcblwiMDExMTAxMTFcIixcclxuXCIwMDAwMDAwMFwiLFxyXG5cIjAwMDAwMTExXCIsXHJcblwiMDAwMDAxMTFcIixcclxuXCIwMDAwMDExMVwiXHJcbl0sXHJcbi8vICMweDFmYyBcclxuWyBcclxuXCIwMDAwMDAwMFwiLFxyXG5cIjAwMDAwMDAwXCIsXHJcblwiMDAwMDAwMDBcIixcclxuXCIwMDAwMDAwMFwiLFxyXG5cIjAwMDAwMDAwXCIsXHJcblwiMDExMTAxMTFcIixcclxuXCIwMTExMDExMVwiLFxyXG5cIjAxMTEwMTExXCJcclxuXSxcclxuLy8gIzB4MWZkIFxyXG5bIFxyXG5cIjAwMDAwMDAwXCIsXHJcblwiMDExMTAwMDBcIixcclxuXCIwMTExMDAwMFwiLFxyXG5cIjAxMTEwMDAwXCIsXHJcblwiMDAwMDAwMDBcIixcclxuXCIwMTExMDExMVwiLFxyXG5cIjAxMTEwMTExXCIsXHJcblwiMDExMTAxMTFcIl0sXHJcbi8vICMweDFmZSBcclxuWyBcclxuXCIwMDAwMDAwMFwiLFxyXG5cIjAwMDAwMTExXCIsXHJcblwiMDAwMDAxMTFcIixcclxuXCIwMDAwMDExMVwiLFxyXG5cIjAwMDAwMDAwXCIsXHJcblwiMDExMTAxMTFcIixcclxuXCIwMTExMDExMVwiLFxyXG5cIjAxMTEwMTExXCJcclxuXSwvLyAjMHgxZmYgXHJcblsgXHJcblwiMDAwMDAwMDBcIixcclxuXCIwMTExMDExMVwiLFxyXG5cIjAxMTEwMTExXCIsXHJcblwiMDExMTAxMTFcIixcclxuXCIwMDAwMDAwMFwiLFxyXG5cIjAxMTEwMTExXCIsXHJcblwiMDExMTAxMTFcIixcclxuXCIwMTExMDExMVwiXHJcbl1cclxuXTtcclxuXHJcbiIsIlwidXNlIHN0cmljdFwiO1xyXG5pbXBvcnQgXCJiYWJlbC1wb2x5ZmlsbFwiO1xyXG5pbXBvcnQge2ZvbnREYXRhfSBmcm9tIFwiLi9tejcwMGZvblwiO1xyXG5pbXBvcnQge2NoYXJDb2RlcyxjYW5hQ29kZXN9IGZyb20gXCIuL2NoYXJDb2Rlc1wiO1xyXG5cclxuLy8g44OV44Os44O844Og44OQ44OD44OV44Kh44Gr5pu444GN6L6844KA44K344Kn44O844OA44O8XHJcbi8vIHZhciB2c2hhZGVyRlNyYyA9IFxyXG4vLyBgcHJlY2lzaW9uIG1lZGl1bXAgZmxvYXQ7XHJcbi8vIGF0dHJpYnV0ZSB2ZWMyIHBvc2l0aW9uO1xyXG4vLyBhdHRyaWJ1dGUgZmxvYXQgY29sb3I7XHJcbi8vIHVuaWZvcm0gdmVjMiBidWZmZXJTaXplO1xyXG4vLyB2YXJ5aW5nIGZsb2F0IHZjb2xvcjtcclxuIFxyXG4vLyB2b2lkIG1haW4odm9pZCkge1xyXG4vLyAgICAgdmVjMiBicyA9IGJ1ZmZlclNpemUgLSBidWZmZXJTaXplIC8gIDIuMDtcclxuLy8gICAgIGJzLnkgPSAtYnMueTtcclxuLy8gICAgIGdsX1Bvc2l0aW9uID0gdmVjNChwb3NpdGlvbiAvIGJzLCAwLjAsMS4wKTtcclxuLy8gICAgIHZjb2xvciA9IGNvbG9yO1xyXG4vLyB9XHJcbi8vIGA7XHJcblxyXG4vLyB2YXIgZnNoYWRlckZTcmMgPSBcclxuLy8gYHByZWNpc2lvbiBtZWRpdW1wIGZsb2F0O1xyXG4vLyB2YXJ5aW5nIGZsb2F0IHZjb2xvcjtcclxuLy8gdm9pZCBtYWluKHZvaWQpe1xyXG4vLyAgZ2xfRnJhZ0NvbG9yID0gdmVjNCh2Y29sb3IsIDAuICwgMC4gLCAxLik7XHJcbi8vIH1cclxuLy8gYDtcclxuXHJcbi8vIOODkeODrOODg+ODiOOCqOODn+ODpeODrOODvOODiOOCt+OCp+ODvOODgOODvFxyXG52YXIgdnNoYWRlclBTcmMgPSBcclxuYHByZWNpc2lvbiBtZWRpdW1wIGZsb2F0O1xyXG5hdHRyaWJ1dGUgdmVjMiBwb3NpdGlvbjtcclxuYXR0cmlidXRlIHZlYzIgdGV4dHVyZV9jb29yZDtcclxudmFyeWluZyB2ZWMyIHZ0ZXh0dXJlX2Nvb3JkO1xyXG4gXHJcbnZvaWQgbWFpbih2b2lkKSB7XHJcbiAgICBnbF9Qb3NpdGlvbiA9IHZlYzQocG9zaXRpb24sMC4wLDEuMCk7XHJcbiAgICB2dGV4dHVyZV9jb29yZCA9IHRleHR1cmVfY29vcmQ7XHJcbn1cclxuYDtcclxuXHJcbnZhciBmc2hhZGVyUFNyYyA9IFxyXG5gcHJlY2lzaW9uIG1lZGl1bXAgZmxvYXQ7XHJcblxyXG51bmlmb3JtIHNhbXBsZXIyRCB0ZXh0dXJlQjtcclxudW5pZm9ybSBzYW1wbGVyMkQgdGV4dHVyZUc7XHJcbnVuaWZvcm0gc2FtcGxlcjJEIHRleHR1cmVSO1xyXG51bmlmb3JtIHNhbXBsZXIyRCBwYWxsZXRfY29sb3I7XHJcbnVuaWZvcm0gc2FtcGxlcjJEIHRleHR1cmVGb250O1xyXG51bmlmb3JtIHNhbXBsZXIyRCB0ZXh0dXJlQ2hhckNvZGU7XHJcbnVuaWZvcm0gc2FtcGxlcjJEIHRleHR1cmVDaGFyQXR0cjtcclxudW5pZm9ybSBmbG9hdCB0aW1lO1xyXG5cclxudmFyeWluZyB2ZWMyIHZ0ZXh0dXJlX2Nvb3JkO1xyXG5cclxuLy8g44Kw44Op44OV44Kj44OD44Kv6KGo56S6XHJcbnZlYzQgZ3JhcGhpY1BsYW5lKHZvaWQpXHJcbntcclxuICAvL+ODhuOCr+OCueODgeODo+W6p+aomeOCiOOCiuODk+ODg+ODiOS9jee9ruOCkuaxguOCgeOAgeOBneOBruODk+ODg+ODiOOBjOeri+OBo+OBnzLpgLLmlbDlgKTjgpLlvpfjgovjgIJcclxuICBmbG9hdCB0ID0gZXhwMihmbG9vcihtb2QodnRleHR1cmVfY29vcmQueCAqIDUxMi4wLDguMCkpKTtcclxuICAvLyBSR0LlkITjg5fjg6zjg7zjg7Pjga7nj77lnKjluqfmqJnjga7jg5DjgqTjg4jjg4fjg7zjgr/jgpLoqq3jgb/ovrzjgoBcclxuICB2ZWM0IHJ0ID0gdGV4dHVyZTJEKHRleHR1cmVSLCB2dGV4dHVyZV9jb29yZCk7XHJcbiAgdmVjNCBndCA9IHRleHR1cmUyRCh0ZXh0dXJlRywgdnRleHR1cmVfY29vcmQpO1xyXG4gIHZlYzQgYnQgPSB0ZXh0dXJlMkQodGV4dHVyZUIsIHZ0ZXh0dXJlX2Nvb3JkKTtcclxuICBcclxuICAvLyDjg5DjgqTjg4jjg4fjg7zjgr/jga7kuK3jgafjg5Pjg4Pjg4jjgYznq4vjgaPjgabjgYTjgovjgYvjganjgYbjgYvjgpLoqr/jgbnjgotcclxuICAvLyBS44OX44Os44O844OzXHJcbiAgZmxvYXQgciA9IGZsb29yKG1vZChtaW4ocnQueCAqIDI1Ni4wLDI1NS4wKSAvIHQsMi4wKSkgKiA0LjA7XHJcbiAgLy8gR+ODl+ODrOODvOODs1xyXG4gIGZsb2F0IGcgPSBmbG9vcihtb2QobWluKGd0LnggKiAyNTYuMCwyNTUuMCkgLyB0LDIuMCkpICogMi4wO1xyXG4gIC8vIELjg5fjg6zjg7zjg7NcclxuICBmbG9hdCBiID0gZmxvb3IobW9kKG1pbihidC54ICogMjU2LjAsMjU1LjApIC8gdCwyLjApKTtcclxuXHJcbiAgLy8g5ZCE6Imy44Gu5YCk44KS6Laz44GX44Gm5q2j6KaP5YyW44KS6KGM44GE44CB44OR44Os44OD44OI44Kk44Oz44OH44OD44Kv44K544GL44KJ5a6f6Zqb44Gu6Imy44KS5b6X44KLIFxyXG4gIHZlYzQgcCA9IHRleHR1cmUyRChwYWxsZXRfY29sb3IsdmVjMigociArIGcgKyBiKSAvIDguMCAsMC41KSk7XHJcbiAgZmxvYXQgaSA9IG1pbihwLnggKiAyNTYuMCwyNTUuMCk7XHJcbiAgZmxvYXQgYXIgPSBmbG9vcihtb2QoaSAqIDAuNSwyLjApKTsgLy8gYml0M1xyXG4gIGZsb2F0IGFnID0gZmxvb3IobW9kKGkgKiAwLjI1LDIuMCkpOyAgLy8gYml0MlxyXG4gIGZsb2F0IGFiID0gZmxvb3IobW9kKGksMi4wKSk7IC8vIGJpdDFcclxuICByZXR1cm4gdmVjNChhcixhZyxhYiwxLjApO1xyXG59XHJcblxyXG4vLyDmloflrZfooajnpLpcclxudmVjNCB0ZXh0UGxhbmUodm9pZCl7XHJcbiAgLy8g44Kt44Oj44Op44Kv44K/44Kz44O844OJ44KS6Kqt44G/5Ye644GXXHJcbiAgdmVjNCBjY3QgPSB0ZXh0dXJlMkQodGV4dHVyZUNoYXJDb2RlLCB2dGV4dHVyZV9jb29yZCk7XHJcbiAgZmxvYXQgY2MgPSBtaW4oY2N0LnggKiAyNTYuMCwyNTUuMCk7Ly8g44Kt44Oj44Op44Kv44K/44O844Kz44O844OJXHJcblxyXG4gIC8vIOOCouODiOODquODk+ODpeODvOODiOOCkuiqreOBv+WHuuOBl1xyXG4gIHZlYzQgYXR0cnQgPSB0ZXh0dXJlMkQodGV4dHVyZUNoYXJBdHRyLCB2dGV4dHVyZV9jb29yZCk7XHJcbiAgXHJcbiAgLy8g6KGo56S65a++6LGh44Gu5paH5a2X44Gu44OT44OD44OI5L2N572u44KS5rGC44KB44KLXHJcbiAgZmxvYXQgeCA9IGV4cDIoZmxvb3IobW9kKHZ0ZXh0dXJlX2Nvb3JkLnggKiA1MTIuMCw4LjApKSk7XHJcbiAgLy8g6KGo56S65a++6LGh44Gu5paH5a2X44GuWeS9jee9ruOCkuaxguOCgeOCi1xyXG4gIGZsb2F0IHkgPSBmbG9vcihtb2QodnRleHR1cmVfY29vcmQueSAqIDI1Ni4wLDguMCkpO1xyXG4gIFxyXG4gIC8vIOOCouODiOODquODk+ODpeODvOODiOOBruipleS+oSBcclxuXHJcbiAgZmxvYXQgaSA9IG1pbihhdHRydC54ICogMjU2LjAsMjU1LjApOy8vIOOCouODiOODquODk+ODpeODvOODiOODh+ODvOOCv1xyXG4gIFxyXG4gIC8vIOOCreODo+ODqeOCr+OCv+OCu+ODg+ODiCgwLjAgLi4g44K744OD44OIMCwgMS4wIC4uIOOCu+ODg+ODiDEgKVxyXG4gIGZsb2F0IGF0dCA9IGZsb29yKG1vZChpIC8gMTI4LjAsMi4wKSkgKiA4LjA7Ly8gYml0IDdcclxuXHJcbiAgLy8g5paH5a2X6ImyXHJcbiAgZmxvYXQgY2NnID0gZmxvb3IobW9kKGkgLyA2NC4wLDIuMCkpOy8vIGJpdCA2XHJcbiAgZmxvYXQgY2NyID0gZmxvb3IobW9kKGkgLyAzMi4wLDIuMCkpOy8vIGJpdCA1XHJcbiAgZmxvYXQgY2NiID0gZmxvb3IobW9kKGkgLyAxNi4wLDIuMCkpOy8vIGJpdCA0XHJcblxyXG4gIC8vIOiDjOaZr+iJslxyXG4gIGZsb2F0IGJnZyA9IGZsb29yKG1vZChpIC8gNC4wLDIuMCkpOy8vIGJpdCAyXHJcbiAgZmxvYXQgYmdyID0gZmxvb3IobW9kKGkgLyAyLjAsMi4wKSk7Ly8gYml0IDFcclxuICBmbG9hdCBiZ2IgPSBmbG9vcihtb2QoaSAsMi4wKSk7Ly8gYml0IDBcclxuICBcclxuXHJcbiAgLy8g44OV44Kp44Oz44OI6Kqt44G/5Ye644GX5L2N572uXHJcbiAgdmVjMiBmb250cG9zID0gdmVjMihjYyAvIDI1Ni4wLCh5ICsgYXR0KSAvIDE2LjApO1xyXG4gIC8vIOODleOCqeODs+ODiOODh+ODvOOCv+OBruiqreOBv+WHuuOBl1xyXG4gIHZlYzQgcGl4Qnl0ZSA9IHRleHR1cmUyRCh0ZXh0dXJlRm9udCxmb250cG9zKTtcclxuICAvLyDmjIflrprkvY3nva7jga7jg5Pjg4Pjg4jjgYznq4vjgaPjgabjgYTjgovjgYvjg4Hjgqfjg4Pjgq9cclxuICBmbG9hdCBwaXhCaXQgPSBmbG9vcihtb2QobWluKHBpeEJ5dGUueCAqIDI1Ni4wLDI1NS4wKSAvIHgsMi4wKSk7XHJcbiAgXHJcbiAgaWYocGl4Qml0ID09IDEuMCl7XHJcbiAgICAvLyDjg5Pjg4Pjg4jjgYznq4vjgaPjgabjgYTjgovjgajjgY3jga/jgIHmloflrZfoibLjgpLoqK3lrppcclxuICAgIHJldHVybiB2ZWM0KGNjcixjY2csY2NiLDEuMCk7XHJcbiAgfSBcclxuICAvLyDjg5Pjg4Pjg4jjgYznq4vjgaPjgabjgYTjgarjgYTjgajjgY3jga/og4zmma/oibLjgpLoqK3lrppcclxuICByZXR1cm4gdmVjNChiZ3IsYmdnLGJnYiwxLjApO1xyXG59XHJcblxyXG52b2lkIG1haW4odm9pZCl7XHJcbiAgdmVjNCB0ZXh0Q29sb3IgPSB0ZXh0UGxhbmUoKTtcclxuICBpZigodGV4dENvbG9yLnIgKyB0ZXh0Q29sb3IuZyArIHRleHRDb2xvci5iKSA+IDAuMCl7XHJcbiAgICBnbF9GcmFnQ29sb3IgPSB0ZXh0Q29sb3I7ICBcclxuICB9IGVsc2Uge1xyXG4gICAgdmVjNCBjb2xvciA9IGdyYXBoaWNQbGFuZSgpO1xyXG4gICAgZ2xfRnJhZ0NvbG9yID0gY29sb3I7XHJcbiAgfVxyXG59XHJcbmA7XHJcbi8vIGBwcmVjaXNpb24gbWVkaXVtcCBmbG9hdDtcclxuXHJcbi8vIHVuaWZvcm0gc2FtcGxlcjJEIHRleDtcclxuLy8gdW5pZm9ybSBzYW1wbGVyMkQgcGFsbGV0X2NvbG9yO1xyXG5cclxuLy8gdmFyeWluZyB2ZWMyIHZ0ZXh0dXJlX2Nvb3JkO1xyXG5cclxuLy8gdm9pZCBtYWluKHZvaWQpe1xyXG4vLyAgdmVjNCBzYW1wY29sb3IgPSB0ZXh0dXJlMkQodGV4LCB2dGV4dHVyZV9jb29yZCk7XHJcbi8vICB2ZWM0IGNvbG9yID0gdGV4dHVyZTJEKHBhbGxldF9jb2xvcix2ZWMyKHNhbXBjb2xvci54ICogMzIuMCwwLjUpKTtcclxuLy8gIGdsX0ZyYWdDb2xvciA9IGNvbG9yO1xyXG4vLyB9XHJcbi8vIGA7XHJcblxyXG5cclxud2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWQnLCgpPT57XHJcbiAgLy8g44Kz44Oz44K944O844Or44Gu5L2c5oiQXHJcbiAgdmFyIHZpZXcgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndmlldycpO1xyXG4gIHZhciBnbDtcclxuICB2YXIgd2lkdGgsaGVpZ2h0O1xyXG4gIGNvbnN0IHZpcnR1YWxXaWR0aCA9IDMyMCx2aXJ0dWFsSGVpZ2h0ID0gMjAwO1xyXG4gIGNvbnN0IGJ1ZmZlcldpZHRoID0gNTEyICxidWZmZXJIZWlnaHQgPSAyNTYsYnVmZmVyWFNpemUgPSBidWZmZXJXaWR0aCAvIDg7XHJcbiAgY29uc3QgZm9udFRleFdpZHRoID0gMjU2LGZvbnRUZXhIZWlnaHQgPSAxNjsvLzggKiAxNiAqIDI7XHJcbiAgY29uc3QgY2hhckNvZGVCdWZmZXJXaWR0aCA9IDUxMiAvIDgsY2hhckNvZGVCdWZmZXJIZWlnaHQgPSAzMixjb25zb2xlV2lkdGggPSA0MCxjb25zb2xlSGVpZ2h0ID0gMjU7XHJcbiAgdmFyIHJ1bkJ0biA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdydW4nKSxcclxuICAgICAgcGF1c2VCdG4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncGF1c2UnKSxcclxuICAgICAgc3RvcEJ0biA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzdG9wJyk7XHJcbi8vICAgICAgcmVzZXRCdG4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncmVzZXQnKTtcclxuXHR2YXIgYnVmZmVyQiA9IG5ldyBVaW50OEFycmF5KGJ1ZmZlclhTaXplICogYnVmZmVySGVpZ2h0KSxcclxuICBidWZmZXJHID0gbmV3IFVpbnQ4QXJyYXkoYnVmZmVyWFNpemUgKiBidWZmZXJIZWlnaHQpLFxyXG4gIGJ1ZmZlclIgPSBuZXcgVWludDhBcnJheShidWZmZXJYU2l6ZSAqIGJ1ZmZlckhlaWdodCksXHJcbiAgcGFsbGV0Q29sb3JzID0gbmV3IFVpbnQ4QXJyYXkoW1xyXG4gICAgMCwxLDIsMyw0LDUsNiw3ICAgIFxyXG4gIF0pO1xyXG4gIHZhciBjaGFyQ29kZUJ1ZmZlciA9IG5ldyBVaW50OEFycmF5KGNoYXJDb2RlQnVmZmVyV2lkdGggKiBjaGFyQ29kZUJ1ZmZlckhlaWdodCksXHJcbiAgICAgIGNoYXJBdHRyQnVmZmVyID0gbmV3IFVpbnQ4QXJyYXkoY2hhckNvZGVCdWZmZXJXaWR0aCAqIGNoYXJDb2RlQnVmZmVySGVpZ2h0KTtcclxuICB2YXIgZm9udEJ1ZmZlciA9IG5ldyBVaW50OEFycmF5KGZvbnRUZXhXaWR0aCAqIGZvbnRUZXhIZWlnaHQpO1xyXG4gIFxyXG4gIC8vIOODk+ODg+ODiOOBrk1TQuOBqExTQuOCkuWFpeOCjOabv+OBiOOCi+ODoeOCveODg+ODiVxyXG4gIGZ1bmN0aW9uIHJldih4KXtcclxuICAgIHggPSB4ICYgMHhmZjtcclxuICAgIC8vIDBiaXTjgagxYml044CBMmJpdOOBqDNiaXTjgIE0Yml044GoNWJpdOOAgTZiaXTjgag344OT44OD44OI44Gu5Y+N6LuiXHJcbiAgICB4ID0gKCh4ICYgMHg1NSkgPDwgMSkgfCAoKHggPj4+IDEpICYgMHg1NSk7XHJcbiAgICAvLyAwLTFiaXTjgagyLTNiaXTjgIE0LTViaXTjgag2LTdiaXTjga7lj43ou6JcclxuICAgIHggPSAoKHggJiAweDMzKSA8PCAyKSB8ICgoeCA+Pj4gMikgJiAweDMzKTtcclxuICAgIC8vIDAtM2JpdOOAgTQtN2JpdOOBruWPjei7olxyXG4gICAgeCA9ICgoeCAmIDB4MEYpIDw8IDQpIHwgKCh4ID4+PiA0KSAmIDB4MEYpO1xyXG4gICAgcmV0dXJuIHg7XHJcbiAgfVxyXG4gIFxyXG4gIC8vIOODleOCqeODs+ODiOODh+ODvOOCv+OBruiqreOBv+i+vOOBv1xyXG4gIHtcclxuICAgIGxldCBpZHggPSAwO1xyXG4gICAgbGV0IG9mZnNldCA9IDA7XHJcbiAgICBmb250RGF0YS5mb3JFYWNoKChkLGkpPT57XHJcbiAgICAgIG9mZnNldCA9ICgoaSAvIDI1NikgfCAwKSAqIDg7IFxyXG4gICAgICBpZHggPSBpICUgMjU2O1xyXG4gICAgICBkLmZvckVhY2goKGJ5dGVDaGFyLGl5KT0+e1xyXG4gICAgICAgIGxldCBieXRlID0gcGFyc2VJbnQoYnl0ZUNoYXIsMik7XHJcbiAgICAgICAgZm9udEJ1ZmZlcltpZHggKyAoaXkgKyBvZmZzZXQpICogMjU2XSA9IHJldihieXRlKTtcclxuICAgICAgfSk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIHZhciBtYWluO1xyXG4gICAgICBcclxuICBydW5CdG4uZGlzYWJsZWQgPSBcImRpc2FibGVkXCI7XHJcbiAgcGF1c2VCdG4uZGlzYWJsZWQgPSBcImRpc2FibGVkXCI7XHJcbiAgc3RvcEJ0bi5kaXNhYmxlZCA9IFwiZGlzYWJsZWRcIjtcclxuLy8gIHJlc2V0QnRuLmRpc2FibGVkID0gXCJkaXNhYmxlZFwiO1xyXG5cclxuICBjb25zdCBTVEFUVVMgPSB7XHJcbiAgICBzdG9wOjAsXHJcbiAgICBydW46MSxcclxuICAgIHBhdXNlOjIsXHJcbiAgICByZXNldDozXHJcbiAgfTtcclxuXHJcbiAgdmFyIHN0YXR1cyA9IFNUQVRVUy5zdG9wO1xyXG4gICAgICBcclxuICAvLyBjb24ud2lkdGggPSBjb24ub2Zmc2V0V2lkdGg7XHJcbiAgLy8gY29uLmhlaWdodCA9IChjb24ub2Zmc2V0V2lkdGggKiAzIC8gNCkgfCAwIDtcclxuICBnbCA9IHZpZXcuZ2V0Q29udGV4dCgnd2ViZ2wnLHthbnRpYWxpYXM6ZmFsc2V9KSB8fCB2aWV3LmdldENvbnRleHQoJ2V4cGVyaW1lbnRhbC13ZWJnbCcse2FudGlhbGlhczpmYWxzZX0pO1xyXG5cclxuICBcclxuICAvLyDjgrfjgqfjg7zjg4Djga7kvZzmiJBcclxuICBmdW5jdGlvbiBjcmVhdGVTaGFkZXIoc3JjLHNoYWRlclR5cGUpe1xyXG4gICAgbGV0IHNoYWRlcjtcclxuICAgIHNoYWRlciA9IGdsLmNyZWF0ZVNoYWRlcihzaGFkZXJUeXBlKTtcclxuICAgIGdsLnNoYWRlclNvdXJjZShzaGFkZXIsc3JjKTtcclxuICAgIGdsLmNvbXBpbGVTaGFkZXIoc2hhZGVyKTtcclxuICAgIGlmKCFnbC5nZXRTaGFkZXJQYXJhbWV0ZXIoc2hhZGVyLCBnbC5DT01QSUxFX1NUQVRVUykpe1xyXG4gICAgICAgIHRocm93IG5ldyBFcnJvcihnbC5nZXRTaGFkZXJJbmZvTG9nKHNoYWRlcikpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHNoYWRlcjtcclxuICB9XHJcbiAgXHJcbiAgLy8g44OX44Ot44Kw44Op44Og44Kq44OW44K444Kn44Kv44OI44Gu5L2c5oiQXHJcbiAgZnVuY3Rpb24gY3JlYXRlUHJvZ3JhbSh2cyxmcyl7XHJcbiAgICAvLyDjg5fjg63jgrDjg6njg6Djgqrjg5bjgrjjgqfjgq/jg4jjga7nlJ/miJBcclxuICAgIHZhciBwcm9ncmFtID0gZ2wuY3JlYXRlUHJvZ3JhbSgpO1xyXG4gICAgXHJcbiAgICAvLyDjg5fjg63jgrDjg6njg6Djgqrjg5bjgrjjgqfjgq/jg4jjgavjgrfjgqfjg7zjg4DjgpLlibLjgorlvZPjgabjgotcclxuICAgIGdsLmF0dGFjaFNoYWRlcihwcm9ncmFtLCB2cyk7XHJcbiAgICBnbC5hdHRhY2hTaGFkZXIocHJvZ3JhbSwgZnMpO1xyXG4gICAgXHJcbiAgICAvLyDjgrfjgqfjg7zjg4DjgpLjg6rjg7Pjgq9cclxuICAgIGdsLmxpbmtQcm9ncmFtKHByb2dyYW0pO1xyXG4gICAgXHJcbiAgICAvLyDjgrfjgqfjg7zjg4Djga7jg6rjg7Pjgq/jgYzmraPjgZfjgY/ooYzjgarjgo/jgozjgZ/jgYvjg4Hjgqfjg4Pjgq9cclxuICAgIGlmKCFnbC5nZXRQcm9ncmFtUGFyYW1ldGVyKHByb2dyYW0sIGdsLkxJTktfU1RBVFVTKSl7XHJcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGdsLmdldFByb2dyYW1JbmZvTG9nKHByb2dyYW0pKTtcclxuICAgIH0gICAgXHJcbiAgICBnbC51c2VQcm9ncmFtKHByb2dyYW0pO1xyXG4gICAgcmV0dXJuIHByb2dyYW07XHJcbiAgfVxyXG4gIFxyXG4gIC8vVkJP44Gu5L2c5oiQXHJcbiAgZnVuY3Rpb24gY3JlYXRlVmJvKGRhdGEpe1xyXG4gICAgdmFyIHZibyA9IGdsLmNyZWF0ZUJ1ZmZlcigpO1xyXG4gICAgZ2wuYmluZEJ1ZmZlcihnbC5BUlJBWV9CVUZGRVIsIHZibyk7XHJcbiAgICBnbC5idWZmZXJEYXRhKGdsLkFSUkFZX0JVRkZFUiwgbmV3IEZsb2F0MzJBcnJheShkYXRhKSwgZ2wuU1RBVElDX0RSQVcpO1xyXG4gICAgZ2wuYmluZEJ1ZmZlcihnbC5BUlJBWV9CVUZGRVIsIG51bGwpO1xyXG4gICAgcmV0dXJuIHZibztcclxuICB9XHJcbiAgXHJcbiAgXHJcbiAgLy8g44OV44Os44O844Og44OQ44OD44OV44Kh44KS44Kq44OW44K444Kn44Kv44OI44Go44GX44Gm55Sf5oiQ44GZ44KL6Zai5pWwXHJcbiAgZnVuY3Rpb24gY3JlYXRlRnJhbWVidWZmZXIod2lkdGgsIGhlaWdodCl7XHJcbiAgICB2YXIgZnJhbWVCdWZmZXIgPSBnbC5jcmVhdGVGcmFtZWJ1ZmZlcigpO1xyXG4gICAgXHJcbiAgICBnbC5iaW5kRnJhbWVidWZmZXIoZ2wuRlJBTUVCVUZGRVIsIGZyYW1lQnVmZmVyKTtcclxuICAgIFxyXG4gICAgdmFyIGRlcHRoUmVuZGVyQnVmZmVyID0gZ2wuY3JlYXRlUmVuZGVyYnVmZmVyKCk7XHJcbiAgICBnbC5iaW5kUmVuZGVyYnVmZmVyKGdsLlJFTkRFUkJVRkZFUiwgZGVwdGhSZW5kZXJCdWZmZXIpO1xyXG4gICAgZ2wucmVuZGVyYnVmZmVyU3RvcmFnZShnbC5SRU5ERVJCVUZGRVIsIGdsLkRFUFRIX0NPTVBPTkVOVDE2LCB3aWR0aCwgaGVpZ2h0KTtcclxuICAgIGdsLmZyYW1lYnVmZmVyUmVuZGVyYnVmZmVyKGdsLkZSQU1FQlVGRkVSLCBnbC5ERVBUSF9BVFRBQ0hNRU5ULCBnbC5SRU5ERVJCVUZGRVIsIGRlcHRoUmVuZGVyQnVmZmVyKTtcclxuICAgIFxyXG4gICAgdmFyIGZUZXh0dXJlID0gZ2wuY3JlYXRlVGV4dHVyZSgpO1xyXG4gICAgZ2wuYmluZFRleHR1cmUoZ2wuVEVYVFVSRV8yRCwgZlRleHR1cmUpO1xyXG4gICAgZ2wudGV4SW1hZ2UyRChnbC5URVhUVVJFXzJELCAwLCBnbC5SR0JBLCB3aWR0aCwgaGVpZ2h0LCAwLCBnbC5SR0JBLCBnbC5VTlNJR05FRF9CWVRFLCBudWxsKTtcclxuICAgIGdsLnRleFBhcmFtZXRlcmkoZ2wuVEVYVFVSRV8yRCwgZ2wuVEVYVFVSRV9NQUdfRklMVEVSLCBnbC5MSU5FQVIpO1xyXG4gICAgZ2wudGV4UGFyYW1ldGVyaShnbC5URVhUVVJFXzJELCBnbC5URVhUVVJFX01JTl9GSUxURVIsIGdsLkxJTkVBUik7XHJcbiAgICBnbC5mcmFtZWJ1ZmZlclRleHR1cmUyRChnbC5GUkFNRUJVRkZFUiwgZ2wuQ09MT1JfQVRUQUNITUVOVDAsIGdsLlRFWFRVUkVfMkQsIGZUZXh0dXJlLCAwKTtcclxuICAgIFxyXG4gICAgZ2wuYmluZFRleHR1cmUoZ2wuVEVYVFVSRV8yRCwgbnVsbCk7XHJcbiAgICBnbC5iaW5kUmVuZGVyYnVmZmVyKGdsLlJFTkRFUkJVRkZFUiwgbnVsbCk7XHJcbiAgICBnbC5iaW5kRnJhbWVidWZmZXIoZ2wuRlJBTUVCVUZGRVIsIG51bGwpO1xyXG4gICAgXHJcbiAgICByZXR1cm4ge2YgOiBmcmFtZUJ1ZmZlciwgZCA6IGRlcHRoUmVuZGVyQnVmZmVyLCB0IDogZlRleHR1cmV9O1xyXG4gIH1cclxuICBcclxuICAvLyBWQk/jgpLjg5DjgqTjg7Pjg4njgZfnmbvpjLLjgZnjgovplqLmlbBcclxuICBmdW5jdGlvbiBzZXRBdHRyaWJ1dGUodmJvLCBhdHRMLCBhdHRTKXtcclxuICAgICAgZm9yKGxldCBpIGluIHZibyl7XHJcbiAgICAgICAgICBnbC5iaW5kQnVmZmVyKGdsLkFSUkFZX0JVRkZFUiwgdmJvW2ldKTtcclxuICAgICAgICAgIGdsLmVuYWJsZVZlcnRleEF0dHJpYkFycmF5KGF0dExbaV0pO1xyXG4gICAgICAgICAgZ2wudmVydGV4QXR0cmliUG9pbnRlcihhdHRMW2ldLCBhdHRTW2ldLCBnbC5GTE9BVCwgZmFsc2UsIDAsIDApO1xyXG4gICAgICB9XHJcbiAgfVxyXG4gIFxyXG5cdC8vIElCT+OCkueUn+aIkOOBmeOCi+mWouaVsFxyXG5cdGZ1bmN0aW9uIGNyZWF0ZUlibyhkYXRhKXtcclxuXHRcdHZhciBpYm8gPSBnbC5jcmVhdGVCdWZmZXIoKTtcclxuXHRcdFxyXG5cdFx0Z2wuYmluZEJ1ZmZlcihnbC5FTEVNRU5UX0FSUkFZX0JVRkZFUiwgaWJvKTtcclxuXHRcdGdsLmJ1ZmZlckRhdGEoZ2wuRUxFTUVOVF9BUlJBWV9CVUZGRVIsIG5ldyBJbnQxNkFycmF5KGRhdGEpLCBnbC5TVEFUSUNfRFJBVyk7XHJcblx0XHRnbC5iaW5kQnVmZmVyKGdsLkVMRU1FTlRfQVJSQVlfQlVGRkVSLCBudWxsKTtcclxuXHRcdHJldHVybiBpYm87XHJcblx0fSAgXHJcbiAgXHJcbiBcdC8vIOadv+ODneODquOCtOODs1xyXG5cdHZhciBwb3NpdGlvbiA9IFtcclxuXHRcdC0xLjAsICAxLjAsXHJcblx0XHQgMS4wLCAgMS4wLFxyXG5cdFx0LTEuMCwgLTEuMCxcclxuXHRcdCAxLjAsIC0xLjBcclxuXHRdO1xyXG4gIFxyXG5cdHZhciB0ZXhDb29yZCA9IFtcclxuXHQwLjAsIDAuMCxcclxuXHQgXHR2aXJ0dWFsV2lkdGggLyBidWZmZXJXaWR0aCAsIDAuMCxcclxuXHQgXHQwLjAsIHZpcnR1YWxIZWlnaHQgLyBidWZmZXJIZWlnaHQsXHJcblx0IFx0dmlydHVhbFdpZHRoIC8gYnVmZmVyV2lkdGgsIHZpcnR1YWxIZWlnaHQgLyBidWZmZXJIZWlnaHRcclxuXHQgXTtcclxuICBcclxuXHR2YXIgaW5kZXggPSBbXHJcblx0XHQwLCAyLCAxLFxyXG5cdFx0MiwgMywgMVxyXG5cdF07XHJcbiAgXHJcblx0dmFyIHZQb3NpdGlvbiA9IGNyZWF0ZVZibyhwb3NpdGlvbik7XHJcblx0dmFyIHZUZXhDb29yZCA9IGNyZWF0ZVZibyh0ZXhDb29yZCk7XHJcblx0dmFyIGlJbmRleCAgICA9IGNyZWF0ZUlibyhpbmRleCk7XHJcbiAgIFxyXG4gIC8vIGNhbnZhc+OCkum7kuOBp+OCr+ODquOCoijliJ3mnJ/ljJYp44GZ44KLXHJcbiAgZ2wuY2xlYXJDb2xvcigwLjAsIDAuMCwgMC4wLCAxLjApO1xyXG4gIGdsLnZpZXdwb3J0KDAsMCx2aXJ0dWFsV2lkdGgsdmlydHVhbEhlaWdodCk7XHJcbiAgZ2wuY2xlYXJEZXB0aCgxLjApO1xyXG4gIGdsLmNsZWFyKGdsLkNPTE9SX0JVRkZFUl9CSVQgfCBnbC5ERVBUSF9CVUZGRVJfQklUKTtcclxuXHJcbiAgbGV0IHZzUCA9IGNyZWF0ZVNoYWRlcih2c2hhZGVyUFNyYyxnbC5WRVJURVhfU0hBREVSKTtcclxuICBsZXQgZnNQID0gY3JlYXRlU2hhZGVyKGZzaGFkZXJQU3JjLGdsLkZSQUdNRU5UX1NIQURFUik7XHJcbiAgXHJcbiAgbGV0IHByZ1AgPSBjcmVhdGVQcm9ncmFtKHZzUCxmc1ApO1xyXG4gIFxyXG4gIGxldCBwcmdQUG9zID0gZ2wuZ2V0QXR0cmliTG9jYXRpb24ocHJnUCwncG9zaXRpb24nKTtcclxuICBsZXQgcHJnUFRleENvb3JkID0gZ2wuZ2V0QXR0cmliTG9jYXRpb24ocHJnUCwndGV4dHVyZV9jb29yZCcpO1xyXG4gIFxyXG4gIGxldCBhdHRTdHJpZGUgPSA0O1xyXG4gIFxyXG4gIHNldEF0dHJpYnV0ZShbdlBvc2l0aW9uLHZUZXhDb29yZF0sW3ByZ1BQb3MscHJnUFRleENvb3JkXSxbMiwyXSk7XHJcbiAgLy9zZXRBdHRyaWJ1dGUoW3ZQb3NpdGlvbl0sW3ByZ1BQb3NdLFsyXSk7XHJcbiAgZ2wuYmluZEJ1ZmZlcihnbC5FTEVNRU5UX0FSUkFZX0JVRkZFUixpSW5kZXgpO1xyXG4gIFxyXG4gIHZhciBwcmdQVGV4QlBvcyA9IGdsLmdldFVuaWZvcm1Mb2NhdGlvbihwcmdQLCd0ZXh0dXJlQicpO1xyXG4gIHZhciBwcmdQVGV4R1BvcyA9IGdsLmdldFVuaWZvcm1Mb2NhdGlvbihwcmdQLCd0ZXh0dXJlRycpO1xyXG4gIHZhciBwcmdQVGV4UlBvcyA9IGdsLmdldFVuaWZvcm1Mb2NhdGlvbihwcmdQLCd0ZXh0dXJlUicpO1xyXG4gIHZhciBwcmdQUGFsZXR0UG9zID0gZ2wuZ2V0VW5pZm9ybUxvY2F0aW9uKHByZ1AsJ3BhbGxldF9jb2xvcicpO1xyXG4gIHZhciBwcmdQVGV4Rm9udCA9IGdsLmdldFVuaWZvcm1Mb2NhdGlvbihwcmdQLCd0ZXh0dXJlRm9udCcpO1xyXG4gIHZhciBwcmdQVGV4Q2hhckNvZGUgPSBnbC5nZXRVbmlmb3JtTG9jYXRpb24ocHJnUCwndGV4dHVyZUNoYXJDb2RlJyk7XHJcbiAgdmFyIHByZ1BUZXhDaGFyQXR0ciA9IGdsLmdldFVuaWZvcm1Mb2NhdGlvbihwcmdQLCd0ZXh0dXJlQ2hhckF0dHInKTtcclxuICB2YXIgcHJnUFRpbWUgPSBnbC5nZXRVbmlmb3JtTG9jYXRpb24ocHJnUCwndGltZScpO1xyXG4gIFxyXG4gIC8vIOS7ruaDs+ODk+ODg+ODiOODnuODg+ODl+ODhuOCr+OCueODgeODo+OCkuS9nOOCi1xyXG4gIFxyXG4gIGZ1bmN0aW9uIGNyZWF0ZUx1bWluYWNlVGV4dHVyZSh0ZXh0dXJlTm8sd2lkdGgsaGVpZ2h0LHNyY0J1ZmZlcilcclxuICB7XHJcbiAgICB2YXIgdGV4dHVyZSA9IGdsLmNyZWF0ZVRleHR1cmUoKTtcclxuICAgIGdsLmFjdGl2ZVRleHR1cmUodGV4dHVyZU5vKTtcclxuICAgIGdsLmJpbmRUZXh0dXJlKGdsLlRFWFRVUkVfMkQsdGV4dHVyZSk7XHJcbiAgLy9cdGdsLnBpeGVsU3RvcmVpKGdsLlVOUEFDS19GTElQX1lfV0VCR0wsIHRydWUpO1xyXG4gICAgZ2wudGV4SW1hZ2UyRChnbC5URVhUVVJFXzJELCAwLCBnbC5MVU1JTkFOQ0UsIHdpZHRoLCBoZWlnaHQsIDAsIGdsLkxVTUlOQU5DRSwgXHRnbC5VTlNJR05FRF9CWVRFLCBzcmNCdWZmZXIpO1xyXG4gICAgZ2wudGV4UGFyYW1ldGVyaShnbC5URVhUVVJFXzJELCBnbC5URVhUVVJFX01BR19GSUxURVIsIGdsLk5FQVJFU1QpO1xyXG4gICAgZ2wudGV4UGFyYW1ldGVyaShnbC5URVhUVVJFXzJELCBnbC5URVhUVVJFX01JTl9GSUxURVIsIGdsLk5FQVJFU1QpO1xyXG4gICAgZ2wudGV4UGFyYW1ldGVyaShnbC5URVhUVVJFXzJELCBnbC5URVhUVVJFX1dSQVBfUywgZ2wuQ0xBTVBfVE9fRURHRSk7XHJcbiAgICBnbC50ZXhQYXJhbWV0ZXJpKGdsLlRFWFRVUkVfMkQsIGdsLlRFWFRVUkVfV1JBUF9ULCBnbC5DTEFNUF9UT19FREdFKTtcclxuICAgIHJldHVybiB0ZXh0dXJlOyAgIFxyXG4gIH1cclxuICBcclxuICBmdW5jdGlvbiB1cGRhdGVMdW1pbmFuY2VUZXh0dXJlKHRleHR1cmVObyx0ZXh0dXJlLHdpZHRoLGhlaWdodCxzcmNCdWZmZXIpXHJcbiAge1xyXG4gICAgZ2wuYWN0aXZlVGV4dHVyZSh0ZXh0dXJlTm8pO1xyXG4gICAgZ2wuYmluZFRleHR1cmUoZ2wuVEVYVFVSRV8yRCx0ZXh0dXJlKTtcclxuICAgIGdsLnRleEltYWdlMkQoZ2wuVEVYVFVSRV8yRCwgMCwgZ2wuTFVNSU5BTkNFLCB3aWR0aCwgaGVpZ2h0LCAwLCBnbC5MVU1JTkFOQ0UsIFx0Z2wuVU5TSUdORURfQllURSwgc3JjQnVmZmVyKTtcclxuICB9XHJcbiAgXHJcbiAgdmFyIHRleHR1cmVCID0gY3JlYXRlTHVtaW5hY2VUZXh0dXJlKGdsLlRFWFRVUkUwLGJ1ZmZlclhTaXplLGJ1ZmZlckhlaWdodCxidWZmZXJCKTtcclxuICB2YXIgdGV4dHVyZUcgPSBjcmVhdGVMdW1pbmFjZVRleHR1cmUoZ2wuVEVYVFVSRTEsYnVmZmVyWFNpemUsYnVmZmVySGVpZ2h0LGJ1ZmZlckcpO1xyXG4gIHZhciB0ZXh0dXJlUiA9IGNyZWF0ZUx1bWluYWNlVGV4dHVyZShnbC5URVhUVVJFMixidWZmZXJYU2l6ZSxidWZmZXJIZWlnaHQsYnVmZmVyUik7XHJcbiAgXHJcblx0dmFyIHBhbGV0dGVUZXh0dXJlID0gY3JlYXRlTHVtaW5hY2VUZXh0dXJlKGdsLlRFWFRVUkUzLHBhbGxldENvbG9ycy5sZW5ndGgsMSxwYWxsZXRDb2xvcnMpO1xyXG5cdHZhciBmb250VGV4dHVyZSA9IGNyZWF0ZUx1bWluYWNlVGV4dHVyZShnbC5URVhUVVJFNCxmb250VGV4V2lkdGgsZm9udFRleEhlaWdodCxmb250QnVmZmVyKTtcclxuXHR2YXIgY2hhckNvZGVUZXh0dXJlID0gY3JlYXRlTHVtaW5hY2VUZXh0dXJlKGdsLlRFWFRVUkU1LGNoYXJDb2RlQnVmZmVyV2lkdGgsY2hhckNvZGVCdWZmZXJIZWlnaHQsY2hhckNvZGVCdWZmZXIpO1xyXG5cdHZhciBjaGFyQXR0clRleHR1cmUgPSBjcmVhdGVMdW1pbmFjZVRleHR1cmUoZ2wuVEVYVFVSRTYsY2hhckNvZGVCdWZmZXJXaWR0aCxjaGFyQ29kZUJ1ZmZlckhlaWdodCxjaGFyQXR0ckJ1ZmZlcik7XHJcblxyXG5cdGdsLnVuaWZvcm0xaShwcmdQVGV4QlBvcywgMCk7XHJcblx0Z2wudW5pZm9ybTFpKHByZ1BUZXhHUG9zLCAxKTtcclxuXHRnbC51bmlmb3JtMWkocHJnUFRleFJQb3MsIDIpO1xyXG5cdGdsLnVuaWZvcm0xaShwcmdQUGFsZXR0UG9zLCAzKTtcclxuXHRnbC51bmlmb3JtMWkocHJnUFRleEZvbnQsIDQpO1xyXG5cdGdsLnVuaWZvcm0xaShwcmdQVGV4Q2hhckNvZGUsIDUpO1xyXG5cdGdsLnVuaWZvcm0xaShwcmdQVGV4Q2hhckF0dHIsIDYpO1xyXG5cclxuICBmdW5jdGlvbiByZXNpemUoKXtcclxuICAgIHZhciBjb250ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NvbnRlbnQnKTtcclxuICAgIGlmKGNvbnQub2Zmc2V0V2lkdGggPiA3MDApe1xyXG4gICAgICB2aWV3LndpZHRoID0gdmlydHVhbFdpZHRoICogMjsvL2NvbnQub2Zmc2V0V2lkdGg7XHJcbiAgICAgIHZpZXcuaGVpZ2h0ID0gdmlydHVhbEhlaWdodCAqIDI7Ly9jb250Lm9mZnNldFdpZHRoICogMyAvIDQ7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB2aWV3LndpZHRoID0gdmlydHVhbFdpZHRoO1xyXG4gICAgICB2aWV3LmhlaWdodCA9IHZpcnR1YWxIZWlnaHQ7XHJcbiAgICB9XHJcbiAgICB3aWR0aCA9IHZpZXcub2Zmc2V0V2lkdGg7XHJcbiAgICBoZWlnaHQgPSB2aWV3Lm9mZnNldEhlaWdodDtcclxuICAgIFxyXG4gICAgZ2wudmlld3BvcnQoMCwwLHdpZHRoLGhlaWdodCk7XHJcblxyXG4gICAgXHJcbiAgICBnbC5jbGVhckNvbG9yKDAuMCwgMC4wLCAwLjAsIDEuMCk7XHJcbiAgICBnbC5jbGVhcihnbC5DT0xPUl9CVUZGRVJfQklUKTtcclxuICAgIFxyXG4gIH1cclxuICByZXNpemUoKTtcclxuICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJyxyZXNpemUpO1xyXG5cclxuICAvLyDjg6zjg7Pjg4Djg6rjg7PjgrBcclxuICBmdW5jdGlvbiByZW5kZXIoKXtcclxuICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZShyZW5kZXIpO1xyXG5cdFx0Z2wuY2xlYXJDb2xvcigwLjAsIDAuMCwgMC4wLCAxLjApO1xyXG5cdFx0Z2wuY2xlYXIoZ2wuQ09MT1JfQlVGRkVSX0JJVCB8IGdsLkRFUFRIX0JVRkZFUl9CSVQpO1xyXG5cclxuXHJcbiAgICB1cGRhdGVMdW1pbmFuY2VUZXh0dXJlKGdsLlRFWFRVUkUwLHRleHR1cmVCLGJ1ZmZlclhTaXplLGJ1ZmZlckhlaWdodCxidWZmZXJCKTtcclxuICAgIHVwZGF0ZUx1bWluYW5jZVRleHR1cmUoZ2wuVEVYVFVSRTEsdGV4dHVyZUcsYnVmZmVyWFNpemUsYnVmZmVySGVpZ2h0LGJ1ZmZlckcpO1xyXG4gICAgdXBkYXRlTHVtaW5hbmNlVGV4dHVyZShnbC5URVhUVVJFMix0ZXh0dXJlUixidWZmZXJYU2l6ZSxidWZmZXJIZWlnaHQsYnVmZmVyUik7XHJcbiBcclxuICAgIHVwZGF0ZUx1bWluYW5jZVRleHR1cmUoZ2wuVEVYVFVSRTMscGFsZXR0ZVRleHR1cmUscGFsbGV0Q29sb3JzLmxlbmd0aCwxLHBhbGxldENvbG9ycyk7XHJcblxyXG4gICAgdXBkYXRlTHVtaW5hbmNlVGV4dHVyZShnbC5URVhUVVJFNSxjaGFyQ29kZVRleHR1cmUsY2hhckNvZGVCdWZmZXJXaWR0aCxjaGFyQ29kZUJ1ZmZlckhlaWdodCxjaGFyQ29kZUJ1ZmZlcik7XHJcbiAgICB1cGRhdGVMdW1pbmFuY2VUZXh0dXJlKGdsLlRFWFRVUkU2LGNoYXJBdHRyVGV4dHVyZSxjaGFyQ29kZUJ1ZmZlcldpZHRoLGNoYXJDb2RlQnVmZmVySGVpZ2h0LGNoYXJBdHRyQnVmZmVyKTtcclxuXHJcbiAgICBnbC5kcmF3RWxlbWVudHMoZ2wuVFJJQU5HTEVTLCBpbmRleC5sZW5ndGgsIGdsLlVOU0lHTkVEX1NIT1JULCAwKTtcclxuXHRcdGdsLmZsdXNoKCk7XHJcbiAgICBpZihzdGF0dXMgPT0gU1RBVFVTLnJ1bil7XHJcbiAgICAgIG1haW4gJiYgbWFpbigpO1xyXG4gICAgfVxyXG4gIH1cclxuICBcclxuICBmdW5jdGlvbiB1cGRhdGVTdGF0dXMocyl7XHJcbiAgICBzdGF0dXMgPSBzO1xyXG4gICAgc3dpdGNoKHMpe1xyXG4gICAgICBjYXNlIFNUQVRVUy5zdG9wOlxyXG4gICAgICAgIHJ1bkJ0bi5kaXNhYmxlZCA9IFwiXCI7XHJcbiAgICAgICAgcGF1c2VCdG4uZGlzYWJsZWQgPSBcImRpc2FibGVkXCI7XHJcbiAgICAgICAgc3RvcEJ0bi5kaXNhYmxlZCA9IFwiZGlzYWJsZWRcIjtcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSBTVEFUVVMucnVuOlxyXG4gICAgICAgIHJ1bkJ0bi5kaXNhYmxlZCA9IFwiZGlzYWJsZWRcIjtcclxuICAgICAgICBwYXVzZUJ0bi5kaXNhYmxlZCA9IFwiXCI7XHJcbiAgICAgICAgc3RvcEJ0bi5kaXNhYmxlZCA9IFwiXCI7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgU1RBVFVTLnBhdXNlOlxyXG4gICAgICAgIHJ1bkJ0bi5kaXNhYmxlZCA9IFwiZGlzYWJsZWRcIjtcclxuICAgICAgICBwYXVzZUJ0bi5kaXNhYmxlZCA9IFwiXCI7XHJcbiAgICAgICAgc3RvcEJ0bi5kaXNhYmxlZCA9IFwiXCI7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICB9XHJcbiAgfVxyXG4gIFxyXG4gIC8vIOOCsOODqeODleOCo+ODg+OCr+OBruODoeOCveODg+ODieOBn+OBoVxyXG5cclxuICBmdW5jdGlvbiBwc2V0KHgseSxjb2xvcil7XHJcbiAgICB2YXIgb2Zmc2V0ID0gKHkgKiBidWZmZXJYU2l6ZSArIHggLyA4KSB8IDA7XHJcbiAgICB2YXIgYml0cG9zID0geCAlIDg7XHJcblxyXG4gICAgXHJcbiAgICBsZXQgYiA9IChjb2xvciAmIDEpIDw8IGJpdHBvcztcclxuICAgIGxldCBtID0gfigxIDw8IGJpdHBvcykgJiAweGZmO1xyXG4gICAgbGV0IGcgPSAoKGNvbG9yID4+PiAxKSAmIDEpIDw8IGJpdHBvcztcclxuICAgIGxldCByID0gKChjb2xvciA+Pj4gMikgJiAxKSA8PCBiaXRwb3M7XHJcblxyXG4gICAgYnVmZmVyQltvZmZzZXRdID0gKGJ1ZmZlckJbb2Zmc2V0XSAmIG0pIHwgYjtcclxuICAgIGJ1ZmZlckdbb2Zmc2V0XSA9IChidWZmZXJHW29mZnNldF0gJiBtKSB8IGc7XHJcbiAgICBidWZmZXJSW29mZnNldF0gPSAoYnVmZmVyUltvZmZzZXRdICYgbSkgfCByO1xyXG4gIH1cclxuXHJcbiAgZnVuY3Rpb24gcHJlc2V0KHgseSl7XHJcbiAgICB2YXIgb2Zmc2V0ID0gKHkgKiBidWZmZXJYU2l6ZSArIHggLyA4KSB8IDA7XHJcbiAgICB2YXIgYml0ID0gfigxIDw8ICh4ICUgOCkpO1xyXG4gICAgYnVmZmVyQltvZmZzZXRdICY9IGJpdDtcclxuICAgIGJ1ZmZlckdbb2Zmc2V0XSAmPSBiaXQ7XHJcbiAgICBidWZmZXJSW29mZnNldF0gJj0gYml0O1xyXG4gIH1cclxuXHJcbiAgZnVuY3Rpb24gY2xzKCl7XHJcbiAgICBmb3IodmFyIGkgPSAwLGUgPSBidWZmZXJYU2l6ZSAqIGJ1ZmZlckhlaWdodDtpIDwgZTsrK2kpIHtcclxuICAgICAgIGJ1ZmZlckJbaV0gPSAwO1xyXG4gICAgICAgYnVmZmVyR1tpXSA9IDA7XHJcbiAgICAgICBidWZmZXJSW2ldID0gMDtcclxuICAgIH1cclxuICAgIFxyXG4gICAgZm9yKHZhciBpID0gMCxlID0gY2hhckNvZGVCdWZmZXJXaWR0aCAqIGNoYXJDb2RlQnVmZmVySGVpZ2h0O2kgPCBlOysraSl7XHJcbiAgICAgIGNoYXJDb2RlQnVmZmVyW2ldID0gMDtcclxuICAgICAgY2hhckF0dHJCdWZmZXJbaV0gPSAwO1xyXG4gICAgfVxyXG4gIH1cclxuICBcclxuICAvLyDmloflrZfliJfjga7ooajnpLpcclxuICBmdW5jdGlvbiBhZGRQb3NpdGlvbihvZmZzZXQsZGVsdGEpXHJcbiAge1xyXG4gICAgb2Zmc2V0ICs9IGRlbHRhO1xyXG4gIH1cclxuICBcclxuICBmdW5jdGlvbiBwcmludCh4LHksc3RyLGNvbG9yLGJnY29sb3IsaGlyYWthbmEgPSBmYWxzZSl7XHJcbiAgICBsZXQgb2Zmc2V0ID0geCArIHkgKiBjaGFyQ29kZUJ1ZmZlcldpZHRoO1xyXG4gICAgZm9yKGxldCBpID0gMCxlID0gc3RyLmxlbmd0aDtpIDwgZTsrK2kpe1xyXG4gICAgICBsZXQgY29kZSA9IHN0ci5jaGFyQ29kZUF0KGkpO1xyXG4gICAgICBpZihjb2RlID49IDB4ZmY2MCAmJiBjb2RlIDwgMHhmZmEwKXtcclxuICAgICAgICBjb2RlIC09IDB4ZmY2MDtcclxuICAgICAgICBjaGFyQ29kZUJ1ZmZlcltvZmZzZXRdID0gY2FuYUNvZGVzW2NvZGVdWzBdO1xyXG4gICAgICAgIGNoYXJBdHRyQnVmZmVyW29mZnNldF0gPSAoY29sb3IgPDwgNCkgfCBiZ2NvbG9yIHwgY2FuYUNvZGVzW2NvZGVdWzFdO1xyXG4gICAgICAgIGlmKGhpcmFrYW5hKSBjaGFyQXR0ckJ1ZmZlcltvZmZzZXRdIHw9IDB4ODA7XHJcbiAgICAgICAgb2Zmc2V0ICs9IDE7XHJcbiAgICAgIH0gZWxzZSBpZihjb2RlIDwgMHg4MCl7XHJcbiAgICAgICAgY2hhckNvZGVCdWZmZXJbb2Zmc2V0XSA9IGNoYXJDb2Rlc1tjb2RlXVswXTtcclxuICAgICAgICBjaGFyQXR0ckJ1ZmZlcltvZmZzZXRdID0gKGNvbG9yIDw8IDQpIHwgYmdjb2xvciB8IGNoYXJDb2Rlc1tjb2RlXVsxXTtcclxuICAgICAgICBpZihoaXJha2FuYSkgY2hhckF0dHJCdWZmZXJbb2Zmc2V0XSB8PSAweDgwO1xyXG4gICAgICAgIG9mZnNldCArPSAxO1xyXG4gICAgICB9IGVsc2UgaWYoY29kZSA8PSAweGZmKXtcclxuICAgICAgICBjaGFyQ29kZUJ1ZmZlcltvZmZzZXRdID0gY29kZTtcclxuICAgICAgICBjaGFyQXR0ckJ1ZmZlcltvZmZzZXRdID0gKGNvbG9yIDw8IDQpIHwgYmdjb2xvcjtcclxuICAgICAgICBpZihoaXJha2FuYSkgY2hhckF0dHJCdWZmZXJbb2Zmc2V0XSB8PSAweDgwO1xyXG4gICAgICAgIG9mZnNldCArPSAxO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIG9mZnNldCArPSAxO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG4gIFxyXG4gIGZ1bmN0aW9uIHByaW50RGlyZWN0KHgseSxzdHIsY29sb3IsYmdjb2xvcixjaGFyc2V0ID0gMCl7XHJcbiAgICBsZXQgb2Zmc2V0ID0geCArIHkgKiBjaGFyQ29kZUJ1ZmZlcldpZHRoO1xyXG4gICAgZm9yKGxldCBpID0gMCxlID0gc3RyLmxlbmd0aDtpIDwgZTsrK2kpe1xyXG4gICAgICAgIGxldCBjb2RlID0gc3RyLmNoYXJDb2RlQXQoaSk7XHJcbiAgICAgICAgY2hhckNvZGVCdWZmZXJbb2Zmc2V0XSA9IGNvZGU7XHJcbiAgICAgICAgY2hhckF0dHJCdWZmZXJbb2Zmc2V0XSA9IChjb2xvciA8PCA0KSB8IGJnY29sb3I7XHJcbiAgICAgICAgY2hhckF0dHJCdWZmZXJbb2Zmc2V0XSB8PSAoY2hhcnNldCA8PCA3KTtcclxuICAgICAgICBvZmZzZXQgKz0gMTtcclxuICAgIH1cclxuICB9XHJcbiAgXHJcbiAgXHJcbiAgLy8g44Oh44Kk44OzXHJcbiAgZnVuY3Rpb24gcnVuKCl7XHJcbiAgICB2YXIgZ2VuID0gKGZ1bmN0aW9uICogKCl7XHJcbiAgICAgIHdoaWxlICh0cnVlKSB7XHJcbiAgICAgICAgY2xzKCk7XHJcbiAgICAgICAgLy8gcGFsbGV0Q29sb3JzLnNldChbMCwxLDIsMyw0LDUsNiw3XSk7XHJcbiAgICAgICAgLy8gZm9yIChsZXQgeSA9IDA7IHkgPCB2aXJ0dWFsSGVpZ2h0OyArK3kpIHtcclxuICAgICAgICAvLyAgIGZvciAobGV0IHggPSAwOyB4IDwgdmlydHVhbFdpZHRoOyArK3gpIHtcclxuICAgICAgICAvLyAgICAgaWYoKCgoeSAvIDgpIHwgMCkgJiAxKSA+IDApe1xyXG4gICAgICAgIC8vICAgICAgIGlmKHggJSAxNiA8IDgpe1xyXG4gICAgICAgIC8vICAgICAgICAgcHNldCh4LCB5LCB5ICUgOCk7XHJcbiAgICAgICAgLy8gICAgICAgfSBlbHNlIHtcclxuICAgICAgICAvLyAgICAgICAgIHBzZXQoeCwgeSwgeCAlIDgpO1xyXG4gICAgICAgIC8vICAgICAgIH1cclxuICAgICAgICAvLyAgICAgfSBlbHNlIHtcclxuICAgICAgICAvLyAgICAgICBpZih4ICUgMTYgPj0gOCl7XHJcbiAgICAgICAgLy8gICAgICAgICBwc2V0KHgsIHksIDcgLSB5ICUgOCk7XHJcbiAgICAgICAgLy8gICAgICAgfSBlbHNlIHtcclxuICAgICAgICAvLyAgICAgICAgIHBzZXQoeCwgeSwgNyAtIHggJSA4KTtcclxuICAgICAgICAvLyAgICAgICB9XHJcbiAgICAgICAgLy8gICAgIH0gXHJcbiAgICAgICAgLy8gICB9XHJcbiAgICAgICAgLy8gICB5aWVsZDtcclxuICAgICAgICAvLyB9XHJcblxyXG4gICAgICAgIC8vIOODkeODrOODg+ODiOOBruOCueOCr+ODreODvOODq1xyXG4gICAgICAgIC8vIGZvcihsZXQgdCA9IDA7dCA8IDEyODsrK3QpXHJcbiAgICAgICAgLy8ge1xyXG4gICAgICAgIC8vICAgbGV0IHAgPSBwYWxsZXRDb2xvcnNbMF07XHJcbiAgICAgICAgLy8gICBmb3IgKGxldCBpID0gMDsgaSA8IDc7ICsraSkge1xyXG4gICAgICAgIC8vICAgICBwYWxsZXRDb2xvcnNbaV0gPSBwYWxsZXRDb2xvcnNbaSArIDFdO1xyXG4gICAgICAgIC8vICAgfVxyXG4gICAgICAgIC8vICAgcGFsbGV0Q29sb3JzWzddID0gcDtcclxuICAgICAgICAvLyAgIHlpZWxkO1xyXG4gICAgICAgIC8vICAgeWllbGQ7XHJcbiAgICAgICAgLy8gfVxyXG4gICAgICAgIFxyXG4gICAgICAgIC8vIGZvcihsZXQgdCA9IDA7dCA8IDY0MDsrK3Qpe1xyXG4gICAgICAgIC8vICAgZm9yKGxldCB1ID0gMDt1IDwgMTI4OysrdSl7XHJcbiAgICAgICAgLy8gICAgIHBzZXQoTWF0aC5yYW5kb20oKSAqIDMyMCxNYXRoLnJhbmRvbSgpICogMjQwLE1hdGgucmFuZG9tKCkgKiA4KTtcclxuICAgICAgICAvLyAgIH1cclxuICAgICAgICAvLyAgIHlpZWxkO1xyXG4gICAgICAgIC8vIH1cclxuICAgICAgICAvLyAvL+ODkeODrOODg+ODiOOBruOCueOCr+ODreODvOODq1xyXG4gICAgICAgIC8vIGZvcihsZXQgdCA9IDA7dCA8IDEyODsrK3QpXHJcbiAgICAgICAgLy8ge1xyXG4gICAgICAgIC8vICAgZm9yIChsZXQgaSA9IDA7IGkgPCA4OyArK2kpIHtcclxuICAgICAgICAvLyAgICAgcGFsbGV0Q29sb3JzW2ldID0gMDtcclxuICAgICAgICAvLyAgIH1cclxuXHJcbiAgICAgICAgLy8gICBwYWxsZXRDb2xvcnNbdCAlIDcgKyAxXSA9IHQgJSA3ICsgMTtcclxuXHJcbiAgICAgICAgLy8gICBmb3IobGV0IGkgPSAwO2kgPCA0OysraSl7XHJcbiAgICAgICAgLy8gICAgIHlpZWxkO1xyXG4gICAgICAgIC8vICAgfVxyXG4gICAgICAgIC8vIH1cclxuICAgICAgICAvLyB7XHJcbiAgICAgICAgLy8gICBmb3IobGV0IGNvbG9yID0gMDtjb2xvciA8IDg7Kytjb2xvcil7XHJcbiAgICAgICAgLy8gICAgIGxldCBpID0gMHgwO1xyXG4gICAgICAgIC8vICAgICBmb3IobGV0IHkgPSAwO3kgPCAxNjsrK3kpe1xyXG4gICAgICAgIC8vICAgICAgIGZvcihsZXQgeCA9IDA7eCA8IDE2OysreCl7XHJcbiAgICAgICAgLy8gICAgICAgICBjaGFyQ29kZUJ1ZmZlclt4ICsgeSAqIGNoYXJDb2RlQnVmZmVyV2lkdGhdID0gaSAlIDI1NjtcclxuICAgICAgICAvLyAgICAgICAgIGNoYXJBdHRyQnVmZmVyW3ggKyB5ICogY2hhckNvZGVCdWZmZXJXaWR0aF0gPSBjb2xvciA8PCA0IHwgKDcgLSBjb2xvcik7XHJcbiAgICAgICAgLy8gICAgICAgICBjaGFyQ29kZUJ1ZmZlclt4ICsgMTYgKyB5ICogY2hhckNvZGVCdWZmZXJXaWR0aF0gPSBpICUgMjU2O1xyXG4gICAgICAgIC8vICAgICAgICAgY2hhckF0dHJCdWZmZXJbeCArIDE2ICsgeSAqIGNoYXJDb2RlQnVmZmVyV2lkdGhdID0gMHg4MCB8IGNvbG9yIDw8IDQgfCAoNy1jb2xvcik7XHJcbiAgICAgICAgLy8gICAgICAgICArK2k7XHJcbiAgICAgICAgLy8gICAgICAgfVxyXG4gICAgICAgIC8vICAgICAgIHlpZWxkO1xyXG4gICAgICAgIC8vICAgICB9XHJcbiAgICAgICAgLy8gICB9XHJcbiAgICAgICAgLy8gfVxyXG4gICAgICAgIFxyXG4gICAgICAgIC8vIHlpZWxkO1xyXG4gICAgICAgIC8vIGZvcihsZXQgaSA9IDI1NjtpIDwgNTEyOysraSl7XHJcbiAgICAgICAgLy8gICBjaGFyQ29kZUJ1ZmZlclsoaSAvIDQwICogNjQpIHwgMCArIGkgJSA0MF0gPSBpIC0gMjU2O1xyXG4gICAgICAgIC8vICAgY2hhckF0dHJCdWZmZXJbKGkgLyA0MCAqIDY0KSB8IDAgKyBpICUgNDBdID0weDE3O1xyXG4gICAgICAgIC8vIH1cclxuICAgICAgICAvLyB5aWVsZDtcclxuICAgICAgICAvLyBmb3IobGV0IGkgPSA1MTI7aSA8IDc2ODsrK2kpe1xyXG4gICAgICAgIC8vICAgY2hhckNvZGVCdWZmZXJbKGkgLyA0MCAqIDY0KSB8IDAgKyBpICUgNDBdID0gaSAtIDUxMjtcclxuICAgICAgICAvLyAgIGNoYXJBdHRyQnVmZmVyWyhpIC8gNDAgKiA2NCkgfCAwICsgaSAlIDQwXSA9MHhmMTtcclxuICAgICAgICAvLyB9XHJcbiAgICAgICAgLy8geWllbGQ7XHJcbiAgICAgICAgbGV0IG1lcyA9ICAnTVotNzAw776M772r776d776E772m776L772u772z7728776e776D776e776TJztcclxuICAgICAgICBsZXQgbWVzMSA9ICcgICAgICAgICAgICAgICAgICAgJztcclxuICAgICAgICBcclxuICAgICAgICBmb3IobGV0IGkgPSAwO2kgPCA1OysraSl7XHJcbiAgICAgICAgICBwcmludCgyMCAtIChtZXMubGVuZ3RoIC8gMikgfCAwLDEwLG1lcyw3LDApO1xyXG4gICAgICAgICAgZm9yKGxldCBqID0gMDtqIDwgMTY7KytqKXtcclxuICAgICAgICAgICAgeWllbGQ7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBwcmludCgyMCAtIChtZXMxLmxlbmd0aCAvIDIpIHwgMCwxMCxtZXMxLDcsMCk7XHJcbiAgICAgICAgICBmb3IobGV0IGogPSAwO2ogPCAxNjsrK2ope1xyXG4gICAgICAgICAgICB5aWVsZDtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAge1xyXG4gICAgICAgICAgbGV0IGkgPSAwO1xyXG4gICAgICAgICAgbGV0IHhzID0gMCwgeGUgPSA0MCAseXMgPSAwLHllID0gMjU7XHJcbiAgICAgICAgICBsZXQgeCA9IDAgLCB5ID0gMCwgYyA9IDA7XHJcbiAgICAgICAgICB3aGlsZSh0cnVlKXtcclxuICAgICAgICAgICAgZm9yKHggPSB4czsgeCA8IHhlOyArK3gpe1xyXG4gICAgICAgICAgICAgIHByaW50RGlyZWN0KHgseSxTdHJpbmcuZnJvbUNoYXJDb2RlKGkgJSAyNTYpLGMgJSA4LDcgLSBjICUgOCxpID4gMjU1PzE6MCk7XHJcbiAgICAgICAgICAgICAgKytpO1xyXG4gICAgICAgICAgICAgIGkgPSBpICUgNTEyO1xyXG4gICAgICAgICAgICAgIHlpZWxkO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICsrYztcclxuICAgICAgICAgICAgLS14O1xyXG4gICAgICAgICAgICArK3lzO1xyXG4gICAgICAgICAgICBpZigoeHMgPj0geGUpIHx8ICh5cyA+PSB5ZSkpIGJyZWFrO1xyXG4gICAgICAgICAgICBmb3IoeSA9IHlzOyB5IDwgeWU7ICsreSl7XHJcbiAgICAgICAgICAgICAgcHJpbnREaXJlY3QoeCx5LFN0cmluZy5mcm9tQ2hhckNvZGUoaSAlIDI1NiksYyAlIDgsNyAtIGMgJSA4LGkgPiAyNTU/MTowKTtcclxuICAgICAgICAgICAgICArK2k7XHJcbiAgICAgICAgICAgICAgaSA9IGkgJSA1MTI7XHJcbiAgICAgICAgICAgICAgeWllbGQ7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgKytjO1xyXG4gICAgICAgICAgICAtLXk7XHJcbiAgICAgICAgICAgIC0teGU7XHJcbiAgICAgICAgICAgIGlmKCh4cyA+PSB4ZSkgfHwgKHlzID49IHllKSkgYnJlYWs7XHJcbiAgICAgICAgICAgIGZvcih4ID0geGUgLSAxOyB4ID49IHhzIDsgLS14KXtcclxuICAgICAgICAgICAgICBwcmludERpcmVjdCh4LHksU3RyaW5nLmZyb21DaGFyQ29kZShpICUgMjU2KSxjICUgOCw3IC0gYyAlIDgsaSA+IDI1NT8xOjApO1xyXG4gICAgICAgICAgICAgICsraTtcclxuICAgICAgICAgICAgICBpID0gaSAlIDUxMjtcclxuICAgICAgICAgICAgICB5aWVsZDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICArK2M7XHJcbiAgICAgICAgICAgIC0teWU7XHJcbiAgICAgICAgICAgICsreDtcclxuICAgICAgICAgICAgaWYoKHhzID49IHhlKSB8fCAoeXMgPj0geWUpKSBicmVhaztcclxuICAgICAgICAgICAgZm9yKHkgPSB5ZSAtIDE7IHkgPj0geXM7LS15KXtcclxuICAgICAgICAgICAgICBwcmludERpcmVjdCh4LHksU3RyaW5nLmZyb21DaGFyQ29kZShpICUgMjU2KSxjICUgOCw3IC0gYyAlIDgsaSA+IDI1NT8xOjApO1xyXG4gICAgICAgICAgICAgICsraTtcclxuICAgICAgICAgICAgICBpID0gaSAlIDUxMjtcclxuICAgICAgICAgICAgICB5aWVsZDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICArK2M7XHJcbiAgICAgICAgICAgICsreTtcclxuICAgICAgICAgICAgKyt4cztcclxuICAgICAgICAgICAgaWYoKHhzID49IHhlKSB8fCAoeXMgPj0geWUpKSBicmVhaztcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIFxyXG4gICAgICAgIH1cclxuICAgICAgICBmb3IobGV0IGogPSAwO2ogPCA2NDsrK2ope1xyXG4gICAgICAgICAgeWllbGQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNscygpO1xyXG4gICAgICB9XHJcbiAgICAgIHVwZGF0ZVN0YXR1cyhTVEFUVVMuc3RvcCk7XHJcbiAgICB9KSgpOyAgXHJcbiAgICBtYWluID0gZ2VuLm5leHQuYmluZChnZW4pO1xyXG4gIH1cclxuXHJcbiAgcnVuQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywoKT0+e1xyXG4gICAgdXBkYXRlU3RhdHVzKFNUQVRVUy5ydW4pO1xyXG4gICAgcnVuKCk7XHJcbiAgfSk7XHJcbiAgXHJcbiAgcGF1c2VCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCgpPT57XHJcbiAgICBpZihzdGF0dXMgPT0gU1RBVFVTLnBhdXNlKXtcclxuICAgICAgdXBkYXRlU3RhdHVzKFNUQVRVUy5ydW4pO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdXBkYXRlU3RhdHVzKFNUQVRVUy5wYXVzZSk7XHJcbiAgICB9XHJcbiAgfSk7XHJcblxyXG4gIHN0b3BCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCgpPT57XHJcbiAgICB1cGRhdGVTdGF0dXMoU1RBVFVTLnN0b3ApO1xyXG4gIH0pO1xyXG5cclxuICAvLyByZXNldEJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsKCk9PntcclxuICAvLyAgIHVwZGF0ZVN0YXR1cyhTVEFUVVMucmVzZXQpO1xyXG4gIC8vIH0pO1xyXG5cclxuICB1cGRhdGVTdGF0dXMoU1RBVFVTLnN0b3ApO1xyXG4gIHJlbmRlcigpO1xyXG59KTtcclxuIl19
