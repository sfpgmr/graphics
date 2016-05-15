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
exports.default = {
  tempo: 120,
  octave: 4,
  length: 4,
  velocity: 100,
  quantize: 75,
  loopCount: 2
};

},{}],292:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Syntax = require("./Syntax");

var _Syntax2 = _interopRequireDefault(_Syntax);

var _Scanner = require("./Scanner");

var _Scanner2 = _interopRequireDefault(_Scanner);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var NOTE_INDEXES = { c: 0, d: 2, e: 4, f: 5, g: 7, a: 9, b: 11 };

var MMLParser = function () {
  function MMLParser(source) {
    _classCallCheck(this, MMLParser);

    this.scanner = new _Scanner2.default(source);
  }

  _createClass(MMLParser, [{
    key: "parse",
    value: function parse() {
      var _this = this;

      var result = [];

      this._readUntil(";", function () {
        result = result.concat(_this.advance());
      });

      return result;
    }
  }, {
    key: "advance",
    value: function advance() {
      switch (this.scanner.peek()) {
        case "c":
        case "d":
        case "e":
        case "f":
        case "g":
        case "a":
        case "b":
          return this.readNote();
        case "[":
          return this.readChord();
        case "r":
          return this.readRest();
        case "o":
          return this.readOctave();
        case ">":
          return this.readOctaveShift(+1);
        case "<":
          return this.readOctaveShift(-1);
        case "l":
          return this.readNoteLength();
        case "q":
          return this.readNoteQuantize();
        case "v":
          return this.readNoteVelocity();
        case "t":
          return this.readTempo();
        case "$":
          return this.readInfiniteLoop();
        case "/":
          return this.readLoop();
        case "@":
          return this.readTone();
        case "w":
          return this.readWaveForm();
        case "s":
          return this.readEnvelope();
        default:
        // do nothing
      }
      this.scanner.throwUnexpectedToken();
    }
  }, {
    key: "readNote",
    value: function readNote() {
      return {
        type: _Syntax2.default.Note,
        noteNumbers: [this._readNoteNumber(0)],
        noteLength: this._readLength()
      };
    }
  }, {
    key: "readChord",
    value: function readChord() {
      var _this2 = this;

      this.scanner.expect("[");

      var noteList = [];
      var offset = 0;

      this._readUntil("]", function () {
        switch (_this2.scanner.peek()) {
          case "c":
          case "d":
          case "e":
          case "f":
          case "g":
          case "a":
          case "b":
            noteList.push(_this2._readNoteNumber(offset));
            break;
          case ">":
            _this2.scanner.next();
            offset += 12;
            break;
          case "<":
            _this2.scanner.next();
            offset -= 12;
            break;
          default:
            _this2.scanner.throwUnexpectedToken();
        }
      });

      this.scanner.expect("]");

      return {
        type: _Syntax2.default.Note,
        noteNumbers: noteList,
        noteLength: this._readLength()
      };
    }
  }, {
    key: "readRest",
    value: function readRest() {
      this.scanner.expect("r");

      return {
        type: _Syntax2.default.Rest,
        noteLength: this._readLength()
      };
    }
  }, {
    key: "readOctave",
    value: function readOctave() {
      this.scanner.expect("o");

      return {
        type: _Syntax2.default.Octave,
        value: this._readArgument(/\d+/)
      };
    }
  }, {
    key: "readOctaveShift",
    value: function readOctaveShift(direction) {
      this.scanner.expect(/<|>/);

      return {
        type: _Syntax2.default.OctaveShift,
        direction: direction | 0,
        value: this._readArgument(/\d+/)
      };
    }
  }, {
    key: "readNoteLength",
    value: function readNoteLength() {
      this.scanner.expect("l");

      return {
        type: _Syntax2.default.NoteLength,
        noteLength: this._readLength()
      };
    }
  }, {
    key: "readNoteQuantize",
    value: function readNoteQuantize() {
      this.scanner.expect("q");

      return {
        type: _Syntax2.default.NoteQuantize,
        value: this._readArgument(/\d+/)
      };
    }
  }, {
    key: "readNoteVelocity",
    value: function readNoteVelocity() {
      this.scanner.expect("v");

      return {
        type: _Syntax2.default.NoteVelocity,
        value: this._readArgument(/\d+/)
      };
    }
  }, {
    key: "readTempo",
    value: function readTempo() {
      this.scanner.expect("t");

      return {
        type: _Syntax2.default.Tempo,
        value: this._readArgument(/\d+(\.\d+)?/)
      };
    }
  }, {
    key: "readInfiniteLoop",
    value: function readInfiniteLoop() {
      this.scanner.expect("$");

      return {
        type: _Syntax2.default.InfiniteLoop
      };
    }
  }, {
    key: "readLoop",
    value: function readLoop() {
      var _this3 = this;

      this.scanner.expect("/");
      this.scanner.expect(":");

      var result = [];
      var loopBegin = { type: _Syntax2.default.LoopBegin };
      var loopEnd = { type: _Syntax2.default.LoopEnd };

      result = result.concat(loopBegin);
      this._readUntil(/[|:]/, function () {
        result = result.concat(_this3.advance());
      });
      result = result.concat(this._readLoopExit());

      this.scanner.expect(":");
      this.scanner.expect("/");

      loopBegin.value = this._readArgument(/\d+/) || null;

      result = result.concat(loopEnd);

      return result;
    }
  }, {
    key: "readTone",
    value: function readTone() {
      this.scanner.expect("@");
      return {
        type: _Syntax2.default.Tone,
        value: this._readArgument(/\d+/)
      };
    }
  }, {
    key: "readWaveForm",
    value: function readWaveForm() {
      this.scanner.expect("w");
      this.scanner.expect("\"");
      var waveData = this.scanner.scan(/[0-9a-fA-F]+?/);
      this.scanner.expect("\"");
      return {
        type: _Syntax2.default.WaveForm,
        value: waveData
      };
    }
  }, {
    key: "readEnvelope",
    value: function readEnvelope() {
      this.scanner.expect("s");
      var a = this._readArgument(/\d+(\.\d+)?/);
      this.scanner.expect(",");
      var d = this._readArgument(/\d+(\.\d+)?/);
      this.scanner.expect(",");
      var s = this._readArgument(/\d+(\.\d+)?/);
      this.scanner.expect(",");
      var r = this._readArgument(/\d+(\.\d+)?/);
      return {
        type: _Syntax2.default.Envelope,
        a: a, d: d, s: s, r: r
      };
    }
  }, {
    key: "_readUntil",
    value: function _readUntil(matcher, callback) {
      while (this.scanner.hasNext()) {
        this.scanner.forward();
        if (!this.scanner.hasNext() || this.scanner.match(matcher)) {
          break;
        }
        callback();
      }
    }
  }, {
    key: "_readArgument",
    value: function _readArgument(matcher) {
      var num = this.scanner.scan(matcher);

      return num !== null ? +num : null;
    }
  }, {
    key: "_readNoteNumber",
    value: function _readNoteNumber(offset) {
      var noteIndex = NOTE_INDEXES[this.scanner.next()];

      return noteIndex + this._readAccidental() + offset;
    }
  }, {
    key: "_readAccidental",
    value: function _readAccidental() {
      if (this.scanner.match("+")) {
        return +1 * this.scanner.scan(/\++/).length;
      }
      if (this.scanner.match("-")) {
        return -1 * this.scanner.scan(/\-+/).length;
      }
      return 0;
    }
  }, {
    key: "_readDot",
    value: function _readDot() {
      var len = (this.scanner.scan(/\.+/) || "").length;
      var result = new Array(len);

      for (var i = 0; i < len; i++) {
        result[i] = 0;
      }

      return result;
    }
  }, {
    key: "_readLength",
    value: function _readLength() {
      var result = [];

      result = result.concat(this._readArgument(/\d+/));
      result = result.concat(this._readDot());

      var tie = this._readTie();

      if (tie) {
        result = result.concat(tie);
      }

      return result;
    }
  }, {
    key: "_readTie",
    value: function _readTie() {
      this.scanner.forward();

      if (this.scanner.match("^")) {
        this.scanner.next();
        return this._readLength();
      }

      return null;
    }
  }, {
    key: "_readLoopExit",
    value: function _readLoopExit() {
      var _this4 = this;

      var result = [];

      if (this.scanner.match("|")) {
        this.scanner.next();

        var loopExit = { type: _Syntax2.default.LoopExit };

        result = result.concat(loopExit);

        this._readUntil(":", function () {
          result = result.concat(_this4.advance());
        });
      }

      return result;
    }
  }]);

  return MMLParser;
}();

exports.default = MMLParser;

},{"./Scanner":293,"./Syntax":294}],293:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Scanner = function () {
  function Scanner(source) {
    _classCallCheck(this, Scanner);

    this.source = source;
    this.index = 0;
  }

  _createClass(Scanner, [{
    key: "hasNext",
    value: function hasNext() {
      return this.index < this.source.length;
    }
  }, {
    key: "peek",
    value: function peek() {
      return this.source.charAt(this.index) || "";
    }
  }, {
    key: "next",
    value: function next() {
      return this.source.charAt(this.index++) || "";
    }
  }, {
    key: "forward",
    value: function forward() {
      while (this.hasNext() && this.match(/\s/)) {
        this.index += 1;
      }
    }
  }, {
    key: "match",
    value: function match(matcher) {
      if (matcher instanceof RegExp) {
        return matcher.test(this.peek());
      }
      return this.peek() === matcher;
    }
  }, {
    key: "expect",
    value: function expect(matcher) {
      if (!this.match(matcher)) {
        this.throwUnexpectedToken();
      }
      this.index += 1;
    }
  }, {
    key: "scan",
    value: function scan(matcher) {
      var target = this.source.substr(this.index);
      var result = null;

      if (matcher instanceof RegExp) {
        var matched = matcher.exec(target);

        if (matched && matched.index === 0) {
          result = matched[0];
        }
      } else if (target.substr(0, matcher.length) === matcher) {
        result = matcher;
      }

      if (result) {
        this.index += result.length;
      }

      return result;
    }
  }, {
    key: "throwUnexpectedToken",
    value: function throwUnexpectedToken() {
      var identifier = this.peek() || "ILLEGAL";

      throw new SyntaxError("Unexpected token: " + identifier);
    }
  }]);

  return Scanner;
}();

exports.default = Scanner;

},{}],294:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  Note: "Note",
  Rest: "Rest",
  Octave: "Octave",
  OctaveShift: "OctaveShift",
  NoteLength: "NoteLength",
  NoteVelocity: "NoteVelocity",
  NoteQuantize: "NoteQuantize",
  Tempo: "Tempo",
  InfiniteLoop: "InfiniteLoop",
  LoopBegin: "LoopBegin",
  LoopExit: "LoopExit",
  LoopEnd: "LoopEnd",
  Tone: "Tone",
  WaveForm: "WaveForm",
  Envelope: "Envelope"
};

},{}],295:[function(require,module,exports){
"use strict";
//// Web Audio API ラッパークラス ////

// MMLParserはmohayonaoさんのもの
// https://github.com/mohayonao/mml-iterator

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Sequencer = exports.Note = exports.Audio = exports.OscVoice = exports.Voice = exports.EnvelopeGenerator = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.decodeStr = decodeStr;
exports.WaveSample = WaveSample;
exports.createWaveSampleFromWaves = createWaveSampleFromWaves;

var _Syntax = require("./Syntax");

var _Syntax2 = _interopRequireDefault(_Syntax);

var _Scanner = require("./Scanner");

var _Scanner2 = _interopRequireDefault(_Scanner);

var _MMLParser = require("./MMLParser");

var _MMLParser2 = _interopRequireDefault(_MMLParser);

var _DefaultParams = require("./DefaultParams");

var _DefaultParams2 = _interopRequireDefault(_DefaultParams);

var _lzbase = require("./lzbase62.min");

var _lzbase2 = _interopRequireDefault(_lzbase);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// var fft = new FFT(4096, 44100);
var BUFFER_SIZE = 1024;
var TIME_BASE = 96;

// MIDIノート => 再生レート変換テーブル
var noteFreq = [];
for (var i = -69; i < 58; ++i) {
  noteFreq.push(Math.pow(2, i / 12));
}

// MIDIノート周波数 変換テーブル
var midiFreq = [];
for (var _i = 0; _i < 127; ++_i) {
  midiFreq.push(midicps(_i));
}
function midicps(noteNumber) {
  return 440 * Math.pow(2, (noteNumber - 69) * 1 / 12);
}

function decodeStr(bits, wavestr) {
  var arr = [];
  var n = bits / 4 | 0;
  var c = 0;
  var zeropos = 1 << bits - 1;
  while (c < wavestr.length) {
    var d = 0;
    for (var i = 0; i < n; ++i) {
      d = (d << 4) + parseInt(wavestr.charAt(c++), '16');
    }
    arr.push((d - zeropos) / zeropos);
  }
  return arr;
}

var waves = [decodeStr(4, 'EEEEEEEEEEEEEEEE0000000000000000'), decodeStr(4, '00112233445566778899AABBCCDDEEFF'), decodeStr(4, '023466459AA8A7A977965656ACAACDEF'), decodeStr(4, 'BDCDCA999ACDCDB94212367776321247'), decodeStr(4, '7ACDEDCA742101247BDEDB7320137E78'), decodeStr(4, 'ACCA779BDEDA66679994101267742247'), decodeStr(4, '7EC9CEA7CFD8AB728D94572038513531'), decodeStr(4, 'EE77EE77EE77EE770077007700770077'), decodeStr(4, 'EEEE8888888888880000888888888888') //ノイズ用のダミー波形
];

var waveSamples = [];
function WaveSample(audioctx, ch, sampleLength, sampleRate) {

  this.sample = audioctx.createBuffer(ch, sampleLength, sampleRate || audioctx.sampleRate);
  this.loop = false;
  this.start = 0;
  this.end = (sampleLength - 1) / (sampleRate || audioctx.sampleRate);
}

function createWaveSampleFromWaves(audioctx, sampleLength) {
  for (var i = 0, end = waves.length; i < end; ++i) {
    var sample = new WaveSample(audioctx, 1, sampleLength);
    waveSamples.push(sample);
    if (i != 8) {
      var wavedata = waves[i];
      var delta = 440.0 * wavedata.length / audioctx.sampleRate;
      var stime = 0;
      var output = sample.sample.getChannelData(0);
      var len = wavedata.length;
      var index = 0;
      var endsample = 0;
      for (var j = 0; j < sampleLength; ++j) {
        index = stime | 0;
        output[j] = wavedata[index];
        stime += delta;
        if (stime >= len) {
          stime = stime - len;
          endsample = j;
        }
      }
      sample.end = endsample / audioctx.sampleRate;
      sample.loop = true;
    } else {
      // ボイス8はノイズ波形とする
      var output = sample.sample.getChannelData(0);
      for (var j = 0; j < sampleLength; ++j) {
        output[j] = Math.random() * 2.0 - 1.0;
      }
      sample.end = sampleLength / audioctx.sampleRate;
      sample.loop = true;
    }
  }
}

// 参考：http://www.g200kg.com/archives/2014/12/webaudioapiperi.html
function fourier(waveform, len) {
  var real = new Float32Array(len),
      imag = new Float32Array(len);
  var wavlen = waveform.length;
  for (var i = 0; i < len; ++i) {
    for (var j = 0; j < len; ++j) {
      var wavj = j / len * wavlen;
      var d = waveform[wavj | 0];
      var th = i * j / len * 2 * Math.PI;
      real[i] += Math.cos(th) * d;
      imag[i] += Math.sin(th) * d;
    }
  }
  return [real, imag];
}

function createPeriodicWaveFromWaves(audioctx) {
  return waves.map(function (d, i) {
    if (i != 8) {
      var waveData = waves[i];
      var freqData = fourier(waveData, waveData.length);
      return audioctx.createPeriodicWave(freqData[0], freqData[1]);
    } else {
      var _waveData = [];
      for (var j = 0, e = waves[i].length; j < e; ++j) {
        _waveData.push(Math.random() * 2.0 - 1.0);
      }
      var _freqData = fourier(_waveData, _waveData.length);
      return audioctx.createPeriodicWave(_freqData[0], _freqData[1]);
    }
  });
}

// ドラムサンプル

var drumSamples = [{ name: 'bass1', path: 'bd1_lz.json' }, // @9
{ name: 'bass2', path: 'bd2_lz.json' }, // @10
{ name: 'closed', path: 'closed_lz.json' }, // @11
{ name: 'cowbell', path: 'cowbell_lz.json' }, // @12
{ name: 'crash', path: 'crash_lz.json' }, // @13
{ name: 'handclap', path: 'handclap_lz.json' }, // @14
{ name: 'hitom', path: 'hitom_lz.json' }, // @15
{ name: 'lowtom', path: 'lowtom_lz.json' }, // @16
{ name: 'midtom', path: 'midtom_lz.json' }, // @17
{ name: 'open', path: 'open_lz.json' }, // @18
{ name: 'ride', path: 'ride_lz.json' }, // @19
{ name: 'rimshot', path: 'rimshot_lz.json' }, // @20
{ name: 'sd1', path: 'sd1_lz.json' }, // @21
{ name: 'sd2', path: 'sd2_lz.json' }, // @22
{ name: 'tamb', path: 'tamb_lz.json' }, // @23
{ name: 'voice', path: 'movie_lz.json' } // @24
];

var xhr = new XMLHttpRequest();
function json(url) {
  return new Promise(function (resolve, reject) {
    xhr.open("get", url, true);
    xhr.onload = function () {
      if (xhr.status == 200) {
        resolve(JSON.parse(this.responseText));
      } else {
        reject(new Error('XMLHttpRequest Error:' + xhr.status));
      }
    };
    xhr.onerror = function (err) {
      reject(err);
    };
    xhr.send(null);
  });
}

function readDrumSample(audioctx) {
  var pr = Promise.resolve(0);

  drumSamples.forEach(function (d) {
    pr = pr.then(json.bind(null, '../../dist/res/' + d.path)).then(function (data) {
      var sampleStr = _lzbase2.default.decompress(data.samples);
      var samples = decodeStr(4, sampleStr);
      var ws = new WaveSample(audioctx, 1, samples.length, data.sampleRate);
      var sb = ws.sample.getChannelData(0);
      for (var _i2 = 0, e = sb.length; _i2 < e; ++_i2) {
        sb[_i2] = samples[_i2];
      }
      waveSamples.push(ws);
    });
  });

  return pr;
}

// export class WaveTexture {
//   constructor(wave) {
//     this.wave = wave || waves[0];
//     this.tex = new CanvasTexture(320, 10 * 16);
//     this.render();
//   }

//   render() {
//     var ctx = this.tex.ctx;
//     var wave = this.wave;
//     ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
//     ctx.beginPath();
//     ctx.strokeStyle = 'white';
//     for (var i = 0; i < 320; i += 10) {
//       ctx.moveTo(i, 0);
//       ctx.lineTo(i, 255);
//     }
//     for (var i = 0; i < 160; i += 10) {
//       ctx.moveTo(0, i);
//       ctx.lineTo(320, i);
//     }
//     ctx.fillStyle = 'rgba(255,255,255,0.7)';
//     ctx.rect(0, 0, ctx.canvas.width, ctx.canvas.height);
//     ctx.stroke();
//     for (var i = 0, c = 0; i < ctx.canvas.width; i += 10, ++c) {
//       ctx.fillRect(i, (wave[c] > 0) ? 80 - wave[c] * 80 : 80, 10, Math.abs(wave[c]) * 80);
//     }
//     this.tex.texture.needsUpdate = true;
//   }
// };

/// エンベロープジェネレーター

var EnvelopeGenerator = exports.EnvelopeGenerator = function () {
  function EnvelopeGenerator(voice, attack, decay, sustain, release) {
    _classCallCheck(this, EnvelopeGenerator);

    this.voice = voice;
    //this.keyon = false;
    this.attackTime = attack || 0.0005;
    this.decayTime = decay || 0.05;
    this.sustainLevel = sustain || 0.5;
    this.releaseTime = release || 0.5;
    this.v = 1.0;
    this.keyOnTime = 0;
    this.keyOffTime = 0;
    this.keyOn = false;
  }

  _createClass(EnvelopeGenerator, [{
    key: "keyon",
    value: function keyon(t, vel) {
      this.v = vel || 1.0;
      var v = this.v;
      var t0 = t || this.voice.audioctx.currentTime;
      var t1 = t0 + this.attackTime;
      var gain = this.voice.gain.gain;
      gain.cancelScheduledValues(t0);
      gain.setValueAtTime(0, t0);
      gain.linearRampToValueAtTime(v, t1);
      gain.linearRampToValueAtTime(this.sustainLevel * v, t1 + this.decayTime);
      //gain.setTargetAtTime(this.sustain * v, t1, t1 + this.decay / v);
      this.keyOnTime = t0;
      this.keyOffTime = 0;
      this.keyOn = true;
    }
  }, {
    key: "keyoff",
    value: function keyoff(t) {
      var voice = this.voice;
      var gain = voice.gain.gain;
      var t0 = t || voice.audioctx.currentTime;
      //    gain.cancelScheduledValues(this.keyOnTime);
      gain.cancelScheduledValues(t0);
      var release_time = t0 + this.releaseTime;
      gain.linearRampToValueAtTime(0, release_time);
      this.keyOffTime = t0;
      this.keyOnTime = 0;
      this.keyOn = false;
      return release_time;
    }
  }]);

  return EnvelopeGenerator;
}();

;

var Voice = exports.Voice = function () {
  function Voice(audioctx) {
    _classCallCheck(this, Voice);

    this.audioctx = audioctx;
    this.sample = waveSamples[6];
    this.volume = audioctx.createGain();
    this.envelope = new EnvelopeGenerator(this, 0.5, 0.25, 0.8, 2.5);
    this.initProcessor();
    this.detune = 1.0;
    this.volume.gain.value = 1.0;
    this.output = this.volume;
  }

  _createClass(Voice, [{
    key: "initProcessor",
    value: function initProcessor() {
      // if(this.processor){
      //   this.stop();
      //   this.processor.disconnect();
      //   this.processor = null;
      // }
      var processor = this.processor = this.audioctx.createBufferSource();
      var gain = this.gain = this.audioctx.createGain();
      gain.gain.value = 0.0;

      this.processor.buffer = this.sample.sample;
      this.processor.loop = this.sample.loop;
      this.processor.loopStart = 0;
      this.processor.playbackRate.value = 1.0;
      this.processor.loopEnd = this.sample.end;
      this.processor.connect(this.gain);
      this.processor.onended = function () {
        processor.disconnect();
        gain.disconnect();
      };
      gain.connect(this.volume);
    }

    // setSample (sample) {
    //     this.envelope.keyoff(0);
    //     this.processor.disconnect(this.gain);
    //     this.sample = sample;
    //     this.initProcessor();
    //     this.processor.start();
    // }

  }, {
    key: "start",
    value: function start(startTime) {
      //   this.processor.disconnect(this.gain);
      this.initProcessor();
      this.processor.start(startTime);
    }
  }, {
    key: "stop",
    value: function stop(time) {
      this.processor.stop(time);
      //this.reset();
    }
  }, {
    key: "keyon",
    value: function keyon(t, note, vel) {
      this.start(t);
      this.processor.playbackRate.setValueAtTime(noteFreq[note] * this.detune, t);
      this.keyOnTime = t;
      this.envelope.keyon(t, vel);
    }
  }, {
    key: "keyoff",
    value: function keyoff(t) {
      this.gain.gain.cancelScheduledValues(t /*this.keyOnTime*/);
      this.keyOffTime = this.envelope.keyoff(t);
      this.processor.stop(this.keyOffTime);
    }
  }, {
    key: "isKeyOn",
    value: function isKeyOn(t) {
      return this.envelope.keyOn && this.keyOnTime <= t;
    }
  }, {
    key: "isKeyOff",
    value: function isKeyOff(t) {
      return !this.envelope.keyOn && this.keyOffTime <= t;
    }
  }, {
    key: "reset",
    value: function reset() {
      this.processor.playbackRate.cancelScheduledValues(0);
      this.gain.gain.cancelScheduledValues(0);
      this.gain.gain.value = 0;
    }
  }]);

  return Voice;
}();

/// ボイス


var OscVoice = exports.OscVoice = function () {
  function OscVoice(audioctx, periodicWave) {
    _classCallCheck(this, OscVoice);

    this.audioctx = audioctx;
    this.sample = periodicWave;
    this.volume = audioctx.createGain();
    this.envelope = new EnvelopeGenerator(this, 0.5, 0.25, 0.8, 2.5);
    this.initProcessor();
    this.detune = 1.0;
    this.volume.gain.value = 1.0;
    this.output = this.volume;
  }

  _createClass(OscVoice, [{
    key: "initProcessor",
    value: function initProcessor() {
      var processor = this.processor = this.audioctx.createOscillator();
      var gain = this.gain = this.audioctx.createGain();
      this.gain.gain.value = 0.0;
      this.processor.setPeriodicWave(this.sample);
      this.processor.connect(this.gain);
      this.processor.onended = function () {
        processor.disconnect();
        gain.disconnect();
      };
      this.gain.connect(this.volume);
    }
  }, {
    key: "start",
    value: function start(startTime) {
      this.initProcessor();
      this.processor.start(startTime);
    }
  }, {
    key: "stop",
    value: function stop(time) {
      this.processor.stop(time);
    }
  }, {
    key: "keyon",
    value: function keyon(t, note, vel) {
      this.start(t);
      this.processor.frequency.setValueAtTime(midiFreq[note] * this.detune, t);
      this.keyOnTime = t;
      this.envelope.keyon(t, vel);
    }
  }, {
    key: "keyoff",
    value: function keyoff(t) {
      this.gain.gain.cancelScheduledValues(t /*this.keyOnTime*/);
      this.keyOffTime = this.envelope.keyoff(t);
      this.processor.stop(this.keyOffTime);
    }
  }, {
    key: "isKeyOn",
    value: function isKeyOn(t) {
      return this.envelope.keyOn && this.keyOnTime <= t;
    }
  }, {
    key: "isKeyOff",
    value: function isKeyOff(t) {
      return !this.envelope.keyOn && this.keyOffTime <= t;
    }
  }, {
    key: "reset",
    value: function reset() {
      this.processor.playbackRate.cancelScheduledValues(0);
      this.gain.gain.cancelScheduledValues(0);
      this.gain.gain.value = 0;
    }
  }]);

  return OscVoice;
}();

var Audio = exports.Audio = function () {
  function Audio() {
    _classCallCheck(this, Audio);

    this.VOICES = 16;
    this.enable = false;
    this.audioContext = window.AudioContext || window.webkitAudioContext || window.mozAudioContext;

    if (this.audioContext) {
      this.audioctx = new this.audioContext();
      this.enable = true;
    }

    this.voices = [];
    if (this.enable) {
      createWaveSampleFromWaves(this.audioctx, BUFFER_SIZE);
      this.periodicWaves = createPeriodicWaveFromWaves(this.audioctx);
      this.filter = this.audioctx.createBiquadFilter();
      this.filter.type = 'lowpass';
      this.filter.frequency.value = 20000;
      this.filter.Q.value = 0.0001;
      this.noiseFilter = this.audioctx.createBiquadFilter();
      this.noiseFilter.type = 'lowpass';
      this.noiseFilter.frequency.value = 1000;
      this.noiseFilter.Q.value = 1.8;
      this.comp = this.audioctx.createDynamicsCompressor();
      this.filter.connect(this.comp);
      this.noiseFilter.connect(this.comp);
      this.comp.connect(this.audioctx.destination);
      // this.filter.connect(this.audioctx.destination);
      // this.noiseFilter.connect(this.audioctx.destination);
      for (var i = 0, end = this.VOICES; i < end; ++i) {
        //var v = new OscVoice(this.audioctx,this.periodicWaves[0]);
        var v = new Voice(this.audioctx);
        this.voices.push(v);
        if (i == this.VOICES - 1) {
          v.output.connect(this.noiseFilter);
        } else {
          v.output.connect(this.filter);
        }
      }
      this.readDrumSample = readDrumSample(this.audioctx);
      //  this.started = false;
      //this.voices[0].output.connect();
    }
  }

  _createClass(Audio, [{
    key: "start",
    value: function start() {
      // var voices = this.voices;
      // for (var i = 0, end = voices.length; i < end; ++i)
      // {
      //   voices[i].start(0);
      // }
    }
  }, {
    key: "stop",
    value: function stop() {
      //if(this.started)
      //{
      var voices = this.voices;
      for (var i = 0, end = voices.length; i < end; ++i) {
        voices[i].stop(0);
      }
      //  this.started = false;
      //}
    }
  }, {
    key: "getWaveSample",
    value: function getWaveSample(no) {
      return waveSamples[no];
    }
  }]);

  return Audio;
}();

/**********************************************/
/* シーケンサーコマンド                       */
/**********************************************/

function calcStep(noteLength) {
  // 長さからステップを計算する
  var prev = null;
  var dotted = 0;

  var map = noteLength.map(function (elem) {
    switch (elem) {
      case null:
        elem = prev;
        break;
      case 0:
        elem = dotted *= 2;
        break;
      default:
        prev = dotted = elem;
        break;
    }

    var length = elem !== null ? elem : _DefaultParams2.default.length;

    return TIME_BASE * (4 / length);
  });
  return map.reduce(function (a, b) {
    return a + b;
  }, 0);
}

var Note = exports.Note = function () {
  function Note(notes, length) {
    _classCallCheck(this, Note);

    this.notes = notes;
    if (length[0]) {
      this.step = calcStep(length);
    }
  }

  _createClass(Note, [{
    key: "process",
    value: function process(track) {
      var _this = this;

      this.notes.forEach(function (n, i) {
        var back = track.back;
        var note = n;
        var oct = _this.oct || back.oct;
        var step = _this.step || back.step;
        var gate = _this.gate || back.gate;
        var vel = _this.vel || back.vel;
        setQueue(track, note, oct, i == 0 ? step : 0, gate, vel);
      });
    }
  }]);

  return Note;
}();

var SeqData = function () {
  function SeqData(note, oct, step, gate, vel) {
    _classCallCheck(this, SeqData);

    this.note = note;
    this.oct = oct;
    //this.no = note.no + oct * 12;
    this.step = step;
    this.gate = gate;
    this.vel = vel;
    this.sample = wave;
  }

  _createClass(SeqData, [{
    key: "process",
    value: function process(track) {
      var back = track.back;
      var note = this.note || back.note;
      var oct = this.oct || back.oct;
      var step = this.step || back.step;
      var gate = this.gate || back.gate;
      var vel = this.vel || back.vel;
      setQueue(track, note, oct, step, gate, vel);
    }
  }]);

  return SeqData;
}();

function setQueue(track, note, oct, step, gate, vel) {
  var no = note + oct * 12;
  var back = track.back;
  var step_time = step ? track.playingTime : back.playingTime;
  // var gate_time = ((gate >= 0) ? gate * 60 : step * gate * 60 * -1.0) / (TIME_BASE * track.localTempo) + track.playingTime;

  var gate_time = (step == 0 ? back.codeStep : step) * gate * 60 / (TIME_BASE * track.localTempo) + (step ? track.playingTime : back.playingTime);
  //let voice = track.audio.voices[track.channel];
  var voice = track.assignVoice(step_time);
  //voice.reset();
  voice.sample = back.sample;
  voice.envelope.attackTime = back.attack;
  voice.envelope.decayTime = back.decay;
  voice.envelope.sustainLevel = back.sustain;
  voice.envelope.releaseTime = back.release;
  voice.detune = back.detune;
  voice.volume.gain.setValueAtTime(back.volume, step_time);

  //voice.initProcessor();

  //console.log(track.sequencer.tempo);
  voice.keyon(step_time, no, vel);
  voice.keyoff(gate_time);
  if (step) {
    back.codeStep = step;
    back.playingTime = track.playingTime;
  }

  track.playingTime = step * 60 / (TIME_BASE * track.localTempo) + track.playingTime;
  // back.voice = voice;
  // back.note = note;
  // back.oct = oct;
  // back.gate = gate;
  // back.vel = vel;
}

function S(note, oct, step, gate, vel) {
  var args = Array.prototype.slice.call(arguments);
  if (S.length != args.length) {
    if (_typeof(args[args.length - 1]) == 'object' && !(args[args.length - 1] instanceof Note)) {
      var args1 = args[args.length - 1];
      var l = args.length - 1;
      return new SeqData((l != 0 ? note : false) || args1.note || args1.n || null, (l != 1 ? oct : false) || args1.oct || args1.o || null, (l != 2 ? step : false) || args1.step || args1.s || null, (l != 3 ? gate : false) || args1.gate || args1.g || null, (l != 4 ? vel : false) || args1.vel || args1.v || null);
    }
  }
  return new SeqData(note || null, oct || null, step || null, gate || null, vel || null);
}

function S1(note, oct, step, gate, vel) {
  return S(note, oct, l(step), gate, vel);
}

function S2(note, len, dot, oct, gate, vel) {
  return S(note, oct, l(len, dot), gate, vel);
}

function S3(note, step, gate, vel, oct) {
  return S(note, oct, step, gate, vel);
}

/// 音符の長さ指定

var Length = function () {
  function Length(len) {
    _classCallCheck(this, Length);

    this.step = calcStep(len);
  }

  _createClass(Length, [{
    key: "process",
    value: function process(track) {
      track.back.step = this.step;
    }
  }]);

  return Length;
}();

var Step = function () {
  function Step(step) {
    _classCallCheck(this, Step);

    this.step = step;
  }

  _createClass(Step, [{
    key: "process",
    value: function process(track) {
      track.back.step = this.step;
    }
  }]);

  return Step;
}();

/// ゲートタイム指定

var GateTime = function () {
  function GateTime(gate) {
    _classCallCheck(this, GateTime);

    this.gate = gate / 100;
  }

  _createClass(GateTime, [{
    key: "process",
    value: function process(track) {
      track.back.gate = this.gate;
    }
  }]);

  return GateTime;
}();

/// ベロシティ指定

var Velocity = function () {
  function Velocity(vel) {
    _classCallCheck(this, Velocity);

    this.vel = vel / 100;
  }

  _createClass(Velocity, [{
    key: "process",
    value: function process(track) {
      track.back.vel = this.vel;
    }
  }]);

  return Velocity;
}();

/// 音色設定


var Tone = function () {
  function Tone(no) {
    _classCallCheck(this, Tone);

    this.no = no;
    //this.sample = waveSamples[this.no];
  }

  _createClass(Tone, [{
    key: "process",
    value: function process(track) {
      //    track.back.sample = track.audio.periodicWaves[this.no];
      track.back.sample = waveSamples[this.no];
      //    track.audio.voices[track.channel].setSample(waveSamples[this.no]);
    }
  }]);

  return Tone;
}();

var Rest = function () {
  function Rest(length) {
    _classCallCheck(this, Rest);

    this.step = calcStep(length);
  }

  _createClass(Rest, [{
    key: "process",
    value: function process(track) {
      var step = this.step || track.back.step;
      track.playingTime = track.playingTime + this.step * 60 / (TIME_BASE * track.localTempo);
      //track.back.step = this.step;
    }
  }]);

  return Rest;
}();

var Octave = function () {
  function Octave(oct) {
    _classCallCheck(this, Octave);

    this.oct = oct;
  }

  _createClass(Octave, [{
    key: "process",
    value: function process(track) {
      track.back.oct = this.oct;
    }
  }]);

  return Octave;
}();

var OctaveUp = function () {
  function OctaveUp(v) {
    _classCallCheck(this, OctaveUp);

    this.v = v;
  }

  _createClass(OctaveUp, [{
    key: "process",
    value: function process(track) {
      track.back.oct += this.v;
    }
  }]);

  return OctaveUp;
}();

var OctaveDown = function () {
  function OctaveDown(v) {
    _classCallCheck(this, OctaveDown);

    this.v = v;
  }

  _createClass(OctaveDown, [{
    key: "process",
    value: function process(track) {
      track.back.oct -= this.v;
    }
  }]);

  return OctaveDown;
}();

var Tempo = function () {
  function Tempo(tempo) {
    _classCallCheck(this, Tempo);

    this.tempo = tempo;
  }

  _createClass(Tempo, [{
    key: "process",
    value: function process(track) {
      track.localTempo = this.tempo;
      //track.sequencer.tempo = this.tempo;
    }
  }]);

  return Tempo;
}();

var Envelope = function () {
  function Envelope(attack, decay, sustain, release) {
    _classCallCheck(this, Envelope);

    this.attack = attack;
    this.decay = decay;
    this.sustain = sustain;
    this.release = release;
  }

  _createClass(Envelope, [{
    key: "process",
    value: function process(track) {
      //var envelope = track.audio.voices[track.channel].envelope;
      track.back.attack = this.attack;
      track.back.decay = this.decay;
      track.back.sustain = this.sustain;
      track.back.release = this.release;
    }
  }]);

  return Envelope;
}();

/// デチューン


var Detune = function () {
  function Detune(detune) {
    _classCallCheck(this, Detune);

    this.detune = detune;
  }

  _createClass(Detune, [{
    key: "process",
    value: function process(track) {
      //var voice = track.audio.voices[track.channel];
      track.back.detune = this.detune;
    }
  }]);

  return Detune;
}();

var Volume = function () {
  function Volume(volume) {
    _classCallCheck(this, Volume);

    this.volume = volume / 100.0;
  }

  _createClass(Volume, [{
    key: "process",
    value: function process(track) {
      //
      track.back.volume = this.volume;
      // track.audio.voices[track.channel].volume.gain.setValueAtTime(this.volume, track.playingTime);
    }
  }]);

  return Volume;
}();

var LoopData = function () {
  function LoopData(obj, varname, count, seqPos) {
    _classCallCheck(this, LoopData);

    this.varname = varname;
    this.count = count || _DefaultParams2.default.loopCount;
    this.obj = obj;
    this.seqPos = seqPos;
    this.outSeqPos = -1;
  }

  _createClass(LoopData, [{
    key: "process",
    value: function process(track) {
      var stack = track.stack;
      if (stack.length == 0 || stack[stack.length - 1].obj !== this) {
        var ld = this;
        stack.push(new LoopData(this, ld.varname, ld.count, track.seqPos));
      }
    }
  }]);

  return LoopData;
}();

var LoopEnd = function () {
  function LoopEnd(seqPos) {
    _classCallCheck(this, LoopEnd);

    this.seqPos = seqPos;
  }

  _createClass(LoopEnd, [{
    key: "process",
    value: function process(track) {
      var ld = track.stack[track.stack.length - 1];
      if (ld.outSeqPos == -1) ld.outSeqPos = this.seqPos;
      ld.count--;
      if (ld.count > 0) {
        track.seqPos = ld.seqPos;
      } else {
        track.stack.pop();
      }
    }
  }]);

  return LoopEnd;
}();

var LoopExit = function () {
  function LoopExit() {
    _classCallCheck(this, LoopExit);
  }

  _createClass(LoopExit, [{
    key: "process",
    value: function process(track) {
      var ld = track.stack[track.stack.length - 1];
      if (ld.count <= 1 && ld.outSeqPos != -1) {
        track.seqPos = ld.outSeqPos;
        track.stack.pop();
      }
    }
  }]);

  return LoopExit;
}();

var InfiniteLoop = function () {
  function InfiniteLoop() {
    _classCallCheck(this, InfiniteLoop);
  }

  _createClass(InfiniteLoop, [{
    key: "process",
    value: function process(track) {
      track.infinitLoopIndex = track.seqPos;
    }
  }]);

  return InfiniteLoop;
}();
/////////////////////////////////
/// シーケンサートラック


var Track = function () {
  function Track(sequencer, seqdata, audio) {
    _classCallCheck(this, Track);

    this.name = '';
    this.end = false;
    this.oneshot = false;
    this.sequencer = sequencer;
    this.seqData = seqdata;
    this.seqPos = 0;
    this.mute = false;
    this.playingTime = -1;
    this.localTempo = sequencer.tempo;
    this.trackVolume = 1.0;
    this.transpose = 0;
    this.solo = false;
    this.channel = -1;
    this.track = -1;
    this.audio = audio;
    this.infinitLoopIndex = -1;
    this.back = {
      note: 72,
      oct: 5,
      step: 96,
      gate: 0.5,
      vel: 1.0,
      attack: 0.01,
      decay: 0.05,
      sustain: 0.6,
      release: 0.07,
      detune: 1.0,
      volume: 0.5,
      //      sample:audio.periodicWaves[0]
      sample: waveSamples[0]
    };
    this.stack = [];
  }

  _createClass(Track, [{
    key: "process",
    value: function process(currentTime) {

      if (this.end) return;

      if (this.oneshot) {
        this.reset();
      }

      var seqSize = this.seqData.length;
      if (this.seqPos >= seqSize) {
        if (this.sequencer.repeat) {
          this.seqPos = 0;
        } else if (this.infinitLoopIndex >= 0) {
          this.seqPos = this.infinitLoopIndex;
        } else {
          this.end = true;
          return;
        }
      }

      var seq = this.seqData;
      this.playingTime = this.playingTime > -1 ? this.playingTime : currentTime;
      var endTime = currentTime + 0.2 /*sec*/;

      while (this.seqPos < seqSize) {
        if (this.playingTime >= endTime && !this.oneshot) {
          break;
        } else {
          var d = seq[this.seqPos];
          d.process(this);
          this.seqPos++;
        }
      }
    }
  }, {
    key: "reset",
    value: function reset() {
      // var curVoice = this.audio.voices[this.channel];
      // curVoice.gain.gain.cancelScheduledValues(0);
      // curVoice.processor.playbackRate.cancelScheduledValues(0);
      // curVoice.gain.gain.value = 0;
      this.playingTime = -1;
      this.seqPos = 0;
      this.infinitLoopIndex = -1;
      this.end = false;
      this.stack.length = 0;
    }
  }, {
    key: "assignVoice",
    value: function assignVoice(t) {
      var ret = null;
      this.audio.voices.some(function (d, i) {
        if (d.isKeyOff(t)) {
          ret = d;
          return true;
        }
        return false;
      });
      if (!ret) {
        var oldestKeyOnData = this.audio.voices.map(function (d, i) {
          return { time: d.envelope.keyOnTime, d: d, i: i };
        }).sort(function (a, b) {
          return a.time - b.time;
        })[0];
        ret = oldestKeyOnData.d;
      }
      return ret;
    }
  }]);

  return Track;
}();

function loadTracks(self, tracks, trackdata) {
  for (var i = 0; i < trackdata.length; ++i) {
    var track = new Track(self, trackdata[i].data, self.audio);
    track.channel = trackdata[i].channel;
    track.oneshot = !trackdata[i].oneshot ? false : true;
    track.track = i;
    tracks.push(track);
  }
}

function createTracks(trackdata) {
  var tracks = [];
  loadTracks(this, tracks, trackdata);
  return tracks;
}

////////////////////////////
/// シーケンサー本体

var Sequencer = exports.Sequencer = function () {
  function Sequencer(audio) {
    _classCallCheck(this, Sequencer);

    this.STOP = 0 | 0;
    this.PLAY = 1 | 0;
    this.PAUSE = 2 | 0;

    this.audio = audio;
    this.tempo = 100.0;
    this.repeat = false;
    this.play = false;
    this.tracks = [];
    this.pauseTime = 0;
    this.status = this.STOP;
  }

  _createClass(Sequencer, [{
    key: "load",
    value: function load(data) {
      parseMML(data);
      if (this.play) {
        this.stop();
      }
      this.tracks.length = 0;
      loadTracks(this, this.tracks, data.tracks, this.audio);
    }
  }, {
    key: "start",
    value: function start() {
      var _this2 = this;

      //    this.handle = window.setTimeout(function () { self.process() }, 50);
      this.audio.readDrumSample.then(function () {
        _this2.status = _this2.PLAY;
        _this2.process();
      });
    }
  }, {
    key: "process",
    value: function process() {
      if (this.status == this.PLAY) {
        this.playTracks(this.tracks);
        this.handle = window.setTimeout(this.process.bind(this), 100);
      }
    }
  }, {
    key: "playTracks",
    value: function playTracks(tracks) {
      var currentTime = this.audio.audioctx.currentTime;
      //   console.log(this.audio.audioctx.currentTime);
      for (var i = 0, end = tracks.length; i < end; ++i) {
        tracks[i].process(currentTime);
      }
    }
  }, {
    key: "pause",
    value: function pause() {
      this.status = this.PAUSE;
      this.pauseTime = this.audio.audioctx.currentTime;
    }
  }, {
    key: "resume",
    value: function resume() {
      if (this.status == this.PAUSE) {
        this.status = this.PLAY;
        var tracks = this.tracks;
        var adjust = this.audio.audioctx.currentTime - this.pauseTime;
        for (var i = 0, end = tracks.length; i < end; ++i) {
          tracks[i].playingTime += adjust;
        }
        this.process();
      }
    }
  }, {
    key: "stop",
    value: function stop() {
      if (this.status != this.STOP) {
        clearTimeout(this.handle);
        //    clearInterval(this.handle);
        this.status = this.STOP;
        this.reset();
      }
    }
  }, {
    key: "reset",
    value: function reset() {
      for (var i = 0, end = this.tracks.length; i < end; ++i) {
        this.tracks[i].reset();
      }
    }
  }]);

  return Sequencer;
}();

function parseMML(data) {
  data.tracks.forEach(function (d) {
    d.data = parseMML_(d.mml);
  });
}

function parseMML_(mml) {
  var parser = new _MMLParser2.default(mml);
  var commands = parser.parse();
  var seqArray = [];
  commands.forEach(function (command) {
    switch (command.type) {
      case _Syntax2.default.Note:
        seqArray.push(new Note(command.noteNumbers, command.noteLength));
        break;
      case _Syntax2.default.Rest:
        seqArray.push(new Rest(command.noteLength));
        break;
      case _Syntax2.default.Octave:
        seqArray.push(new Octave(command.value));
        break;
      case _Syntax2.default.OctaveShift:
        if (command.direction >= 0) {
          seqArray.push(new OctaveUp(1));
        } else {
          seqArray.push(new OctaveDown(1));
        }
        break;
      case _Syntax2.default.NoteLength:
        seqArray.push(new Length(command.noteLength));
        break;
      case _Syntax2.default.NoteVelocity:
        seqArray.push(new Velocity(command.value));
        break;
      case _Syntax2.default.Tempo:
        seqArray.push(new Tempo(command.value));
        break;
      case _Syntax2.default.NoteQuantize:
        seqArray.push(new GateTime(command.value));
        break;
      case _Syntax2.default.InfiniteLoop:
        seqArray.push(new InfiniteLoop());
        break;
      case _Syntax2.default.LoopBegin:
        seqArray.push(new LoopData(null, '', command.value, null));
        break;
      case _Syntax2.default.LoopExit:
        seqArray.push(new LoopExit());
        break;
      case _Syntax2.default.LoopEnd:
        seqArray.push(new LoopEnd());
        break;
      case _Syntax2.default.Tone:
        seqArray.push(new Tone(command.value));
      case _Syntax2.default.WaveForm:
        break;
      case _Syntax2.default.Envelope:
        seqArray.push(new Envelope(command.a, command.d, command.s, command.r));
        break;
    }
  });
  return seqArray;
}

// export var seqData = {
//   name: 'Test',
//   tracks: [
//     {
//       name: 'part1',
//       channel: 0,
//       data:
//       [
//         ENV(0.01, 0.02, 0.5, 0.07),
//         TEMPO(180), TONE(0), VOLUME(0.5), L(8), GT(-0.5),O(4),
//         LOOP('i',4),
//         C, C, C, C, C, C, C, C,
//         LOOP_END,
//         JUMP(5)
//       ]
//     },
//     {
//       name: 'part2',
//       channel: 1,
//       data:
//         [
//         ENV(0.01, 0.05, 0.6, 0.07),
//         TEMPO(180),TONE(6), VOLUME(0.2), L(8), GT(-0.8),
//         R(1), R(1),
//         O(6),L(1), F,
//         E,
//         OD, L(8, true), Bb, G, L(4), Bb, OU, L(4), F, L(8), D,
//         L(4, true), E, L(2), C,R(8),
//         JUMP(8)
//         ]
//     },
//     {
//       name: 'part3',
//       channel: 2,
//       data:
//         [
//         ENV(0.01, 0.05, 0.6, 0.07),
//         TEMPO(180),TONE(6), VOLUME(0.1), L(8), GT(-0.5),
//         R(1), R(1),
//         O(6),L(1), C,C,
//         OD, L(8, true), G, D, L(4), G, OU, L(4), D, L(8),OD, G,
//         L(4, true), OU,C, L(2),OD, G, R(8),
//         JUMP(7)
//         ]
//     }
//   ]
// }

// export function SoundEffects(sequencer) {
//    this.soundEffects =
//     [
//     // Effect 0 ////////////////////////////////////
//     createTracks.call(sequencer,[
//     {
//       channel: 8,
//       oneshot:true,
//       data: [VOLUME(0.5),
//         ENV(0.0001, 0.01, 1.0, 0.0001),GT(-0.999),TONE(0), TEMPO(200), O(8),ST(3), C, D, E, F, G, A, B, OU, C, D, E, G, A, B,B,B,B
//       ]
//     },
//     {
//       channel: 9,
//       oneshot: true,
//       data: [VOLUME(0.5),
//         ENV(0.0001, 0.01, 1.0, 0.0001), DETUNE(0.9), GT(-0.999), TONE(0), TEMPO(200), O(5), ST(3), C, D, E, F, G, A, B, OU, C, D, E, G, A, B,B,B,B
//       ]
//     }
//     ]),
//     // Effect 1 /////////////////////////////////////
//     createTracks.call(sequencer,
//       [
//         {
//           channel: 10,
//           oneshot: true,
//           data: [
//            TONE(4), TEMPO(150), ST(4), GT(-0.9999), ENV(0.0001, 0.0001, 1.0, 0.0001),
//            O(6), G, A, B, O(7), B, A, G, F, E, D, C, E, G, A, B, OD, B, A, G, F, E, D, C, OD, B, A, G, F, E, D, C
//           ]
//         }
//       ]),
//     // Effect 2//////////////////////////////////////
//     createTracks.call(sequencer,
//       [
//         {
//           channel: 10,
//           oneshot: true,
//           data: [
//            TONE(0), TEMPO(150), ST(2), GT(-0.9999), ENV(0.0001, 0.0001, 1.0, 0.0001),
//            O(8), C,D,E,F,G,A,B,OU,C,D,E,F,OD,G,OU,A,OD,B,OU,A,OD,G,OU,F,OD,E,OU,E
//           ]
//         }
//       ]),
//       // Effect 3 ////////////////////////////////////
//       createTracks.call(sequencer,
//         [
//           {
//             channel: 10,
//             oneshot: true,
//             data: [
//              TONE(5), TEMPO(150), L(64), GT(-0.9999), ENV(0.0001, 0.0001, 1.0, 0.0001),
//              O(6),C,OD,C,OU,C,OD,C,OU,C,OD,C,OU,C,OD
//             ]
//           }
//         ]),
//       // Effect 4 ////////////////////////////////////////
//       createTracks.call(sequencer,
//         [
//           {
//             channel: 11,
//             oneshot: true,
//             data: [
//              TONE(8), VOLUME(2.0),TEMPO(120), L(2), GT(-0.9999), ENV(0.0001, 0.0001, 1.0, 0.25),
//              O(1), C
//             ]
//           }
//         ])
//    ];
//  }

},{"./DefaultParams":291,"./MMLParser":292,"./Scanner":293,"./Syntax":294,"./lzbase62.min":299}],296:[function(require,module,exports){
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

},{}],297:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var CharaGraphics = exports.CharaGraphics = function () {
  function CharaGraphics(vm) {
    _classCallCheck(this, CharaGraphics);

    this.vm = vm;
  }

  _createClass(CharaGraphics, [{
    key: "line",
    value: function line(x, y, bgcolor, frColor) {
      var vm = this.vm;
    }
  }]);

  return CharaGraphics;
}();

},{}],298:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.json = json;
var xhr = new XMLHttpRequest();
function json(url) {
  return new Promise(function (resolve, reject) {
    xhr.open("get", url, true);
    xhr.onload = function () {
      if (xhr.status == 200) {
        resolve(JSON.parse(this.responseText));
      } else {
        reject(new Error('XMLHttpRequest Error:' + xhr.status));
      }
    };
    xhr.onerror = function (err) {
      reject(err);
    };
    xhr.send(null);
  });
}

},{}],299:[function(require,module,exports){
"use strict";

/*!
 * lzbase62 v1.4.6 - LZ77(LZSS) based compression algorithm in base62 for JavaScript.
 * Copyright (c) 2014-2015 polygon planet <polygon.planet.aqua@gmail.com>
 * @license MIT
 */
!function (a, b, c) {
  "undefined" != typeof exports ? "undefined" != typeof module && module.exports ? module.exports = c() : exports[a] = c() : "function" == typeof define && define.amd ? define(c) : b[a] = c();
}("lzbase62", undefined, function () {
  "use strict";
  function a(a) {
    this._init(a);
  }function b(a) {
    this._init(a);
  }function c() {
    var a,
        b,
        c,
        d,
        e = "abcdefghijklmnopqrstuvwxyz",
        f = "",
        g = e.length;for (a = 0; g > a; a++) {
      for (c = e.charAt(a), b = g - 1; b > 15 && f.length < v; b--) {
        d = e.charAt(b), f += " " + c + " " + d;
      }
    }for (; f.length < v;) {
      f = " " + f;
    }return f = f.slice(0, v);
  }function d(a, b) {
    return a.length === b ? a : a.subarray ? a.subarray(0, b) : (a.length = b, a);
  }function e(a, b) {
    if (null == b ? b = a.length : a = d(a, b), l && m && o > b) {
      if (p) return j.apply(null, a);if (null === p) try {
        var c = j.apply(null, a);return b > o && (p = !0), c;
      } catch (e) {
        p = !1;
      }
    }return f(a);
  }function f(a) {
    for (var b, c = "", d = a.length, e = 0; d > e;) {
      if (b = a.subarray ? a.subarray(e, e + o) : a.slice(e, e + o), e += o, !p) {
        if (null === p) try {
          c += j.apply(null, b), b.length > o && (p = !0);continue;
        } catch (f) {
          p = !1;
        }return g(a);
      }c += j.apply(null, b);
    }return c;
  }function g(a) {
    for (var b = "", c = a.length, d = 0; c > d; d++) {
      b += j(a[d]);
    }return b;
  }function h(a, b) {
    if (!k) return new Array(b);switch (a) {case 8:
        return new Uint8Array(b);case 16:
        return new Uint16Array(b);}
  }function i(a) {
    for (var b = [], c = a && a.length, d = 0; c > d; d++) {
      b[d] = a.charCodeAt(d);
    }return b;
  }var j = String.fromCharCode,
      k = "undefined" != typeof Uint8Array && "undefined" != typeof Uint16Array,
      l = !1,
      m = !1;try {
    "a" === j.apply(null, [97]) && (l = !0);
  } catch (n) {}if (k) try {
    "a" === j.apply(null, new Uint8Array([97])) && (m = !0);
  } catch (n) {}var o = 65533,
      p = null,
      q = !1;-1 !== "abcほげ".lastIndexOf("ほげ", 1) && (q = !0);var r = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",
      s = r.length,
      t = Math.max(s, 62) - Math.min(s, 62),
      u = s - 1,
      v = 1024,
      w = 304,
      x = o,
      y = x - s,
      z = o,
      A = z + 2 * v,
      B = 11,
      C = B * (B + 1),
      D = 40,
      E = D * (D + 1),
      F = s + 1,
      G = t + 20,
      H = s + 5,
      I = s - t - 19,
      J = D + 7,
      K = J + 1,
      L = K + 1,
      M = L + 5,
      N = M + 5;a.prototype = { _init: function _init(a) {
      a = a || {}, this._data = null, this._table = null, this._result = null, this._onDataCallback = a.onData, this._onEndCallback = a.onEnd;
    }, _createTable: function _createTable() {
      for (var a = h(8, s), b = 0; s > b; b++) {
        a[b] = r.charCodeAt(b);
      }return a;
    }, _onData: function _onData(a, b) {
      var c = e(a, b);this._onDataCallback ? this._onDataCallback(c) : this._result += c;
    }, _onEnd: function _onEnd() {
      this._onEndCallback && this._onEndCallback(), this._data = this._table = null;
    }, _search: function _search() {
      var a = 2,
          b = this._data,
          c = this._offset,
          d = u;if (this._dataLen - c < d && (d = this._dataLen - c), a > d) return !1;var e,
          f,
          g,
          h,
          i,
          j,
          k = c - w,
          l = b.substring(k, c + d),
          m = c + a - 3 - k;do {
        if (2 === a) {
          if (f = b.charAt(c) + b.charAt(c + 1), g = l.indexOf(f), ! ~g || g > m) break;
        } else 3 === a ? f += b.charAt(c + 2) : f = b.substr(c, a);if (q ? (j = b.substring(k, c + a - 1), h = j.lastIndexOf(f)) : h = l.lastIndexOf(f, m), ! ~h) break;i = h, e = k + h;do {
          if (b.charCodeAt(c + a) !== b.charCodeAt(e + a)) break;
        } while (++a < d);if (g === h) {
          a++;break;
        }
      } while (++a < d);return 2 === a ? !1 : (this._index = w - i, this._length = a - 1, !0);
    }, compress: function compress(a) {
      if (null == a || 0 === a.length) return "";var b = "",
          d = this._createTable(),
          e = c(),
          f = h(8, x),
          g = 0;this._result = "", this._offset = e.length, this._data = e + a, this._dataLen = this._data.length, e = a = null;for (var i, j, k, l, m, n = -1, o = -1; this._offset < this._dataLen;) {
        this._search() ? (this._index < u ? (j = this._index, k = 0) : (j = this._index % u, k = (this._index - j) / u), 2 === this._length ? (f[g++] = d[k + M], f[g++] = d[j]) : (f[g++] = d[k + L], f[g++] = d[j], f[g++] = d[this._length]), this._offset += this._length, ~o && (o = -1)) : (i = this._data.charCodeAt(this._offset++), C > i ? (D > i ? (j = i, k = 0, n = F) : (j = i % D, k = (i - j) / D, n = k + F), o === n ? f[g++] = d[j] : (f[g++] = d[n - G], f[g++] = d[j], o = n)) : (E > i ? (j = i, k = 0, n = H) : (j = i % E, k = (i - j) / E, n = k + H), D > j ? (l = j, m = 0) : (l = j % D, m = (j - l) / D), o === n ? (f[g++] = d[l], f[g++] = d[m]) : (f[g++] = d[K], f[g++] = d[n - s], f[g++] = d[l], f[g++] = d[m], o = n))), g >= y && (this._onData(f, g), g = 0);
      }return g > 0 && this._onData(f, g), this._onEnd(), b = this._result, this._result = null, null === b ? "" : b;
    } }, b.prototype = { _init: function _init(a) {
      a = a || {}, this._result = null, this._onDataCallback = a.onData, this._onEndCallback = a.onEnd;
    }, _createTable: function _createTable() {
      for (var a = {}, b = 0; s > b; b++) {
        a[r.charAt(b)] = b;
      }return a;
    }, _onData: function _onData(a) {
      var b;if (this._onDataCallback) {
        if (a) b = this._result, this._result = [];else {
          var c = z - v;b = this._result.slice(v, v + c), this._result = this._result.slice(0, v).concat(this._result.slice(v + c));
        }b.length > 0 && this._onDataCallback(e(b));
      }
    }, _onEnd: function _onEnd() {
      this._onEndCallback && this._onEndCallback();
    }, decompress: function decompress(a) {
      if (null == a || 0 === a.length) return "";this._result = i(c());for (var b, d, f, g, h, j, k, l, m, n, o = "", p = this._createTable(), q = !1, r = null, s = a.length, t = 0; s > t; t++) {
        if (d = p[a.charAt(t)], void 0 !== d) {
          if (I > d) q ? (g = p[a.charAt(++t)], h = g * D + d + E * r) : h = r * D + d, this._result[this._result.length] = h;else if (J > d) r = d - I, q = !1;else if (d === K) f = p[a.charAt(++t)], r = f - 5, q = !0;else if (N > d) {
            if (f = p[a.charAt(++t)], M > d ? (j = (d - L) * u + f, k = p[a.charAt(++t)]) : (j = (d - M) * u + f, k = 2), l = this._result.slice(-j), l.length > k && (l.length = k), m = l.length, l.length > 0) for (n = 0; k > n;) {
              for (b = 0; m > b && (this._result[this._result.length] = l[b], !(++n >= k)); b++) {}
            }r = null;
          }this._result.length >= A && this._onData();
        }
      }return this._result = this._result.slice(v), this._onData(!0), this._onEnd(), o = e(this._result), this._result = null, o;
    } };var O = { compress: function compress(b, c) {
      return new a(c).compress(b);
    }, decompress: function decompress(a, c) {
      return new b(c).decompress(a);
    } };return O;
});

},{}],300:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Movie = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _xhrGet = require("./xhrGet");

var _lzbase = require("./lzbase62.min");

var _lzbase2 = _interopRequireDefault(_lzbase);

var _json = require("./json");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Movie = exports.Movie = function () {
  function Movie(vm) {
    _classCallCheck(this, Movie);

    this.movieData = null;
    this.loaded = false;
    this.vm = vm;
    var audio = vm.audio;
    var filter = this.filter = audio.audioctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.value = 4000;
    filter.Q.value = 0.0001;
    this.gain = audio.audioctx.createGain();
    this.gain.gain.value = 0.5;
    this.gain.connect(audio.audioctx.destination);
    this.filter.connect(this.gain);
  }

  _createClass(Movie, [{
    key: "loadMovie",
    value: function loadMovie() {
      var self = this;
      if (this.movieData) {
        this.loaded = true;
      } else {
        (0, _xhrGet.xhrGet)('../../dist/res/movie.txt').then(function (d) {
          return new Promise(function (resolve, reject) {
            var t = [];
            _lzbase2.default.decompress(d, {
              onData: function onData(data) {
                t.push(data);
              },
              onEnd: function onEnd() {
                self.movieData = JSON.parse(t.join(''));
                self.loaded = true;
                resolve(self.movieData);
              }
            });
          });
          // movieData = JSON.parse(t);
          // loaded = true;
        });
      }
      return Promise.resolve(this.movieData);
    }
  }, {
    key: "createMovieVoice",
    value: function createMovieVoice() {
      var bs = this.vm.audio.audioctx.createBufferSource();
      var movieSample = this.vm.audio.getWaveSample(24);
      bs.buffer = movieSample.sample;
      bs.loop = false;
      bs.onended = function () {
        this.disconnect();
      }.bind(bs);
      return bs;
    }
  }, {
    key: "playMovie",
    value: regeneratorRuntime.mark(function playMovie(colors) {
      var vm, bs, e, md, y, ey, x, ex, cn, c;
      return regeneratorRuntime.wrap(function playMovie$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              vm = this.vm;

            case 1:
              if (this.loaded) {
                _context.next = 6;
                break;
              }

              _context.next = 4;
              return;

            case 4:
              _context.next = 1;
              break;

            case 6:
              bs = this.bs = this.createMovieVoice();

              this.bs.connect(this.filter);
              bs.start(0);

              this.idx = 0;

              e = this.movieData.length;
              this.idx = 0;

            case 12:
              if (!(this.idx < e)) {
                _context.next = 20;
                break;
              }

              md = this.movieData[this.idx];

              for (y = 0, ey = vm.consoleHeight; y < ey; ++y) {
                for (x = 0, ex = vm.consoleWidth; x < ex; ++x) {
                  cn = md[x + y * ex];
                  c = colors[cn];

                  vm.setColor(x, y, c[0], c[1]);
                }
              }
              _context.next = 17;
              return;

            case 17:
              ++this.idx;
              _context.next = 12;
              break;

            case 20:
            case "end":
              return _context.stop();
          }
        }
      }, playMovie, this);
    })
  }, {
    key: "pause",
    value: function pause() {
      this.bs.stop();
    }
  }, {
    key: "resume",
    value: function resume() {
      this.bs = this.createMovieVoice();
      this.bs.connect(this.filter);
      this.bs.connect(this.filter);
      this.bs.start(0, this.idx / 60);
    }
  }, {
    key: "stop",
    value: function stop() {
      this.bs.stop();
    }
  }, {
    key: "visibilityChange",
    value: function visibilityChange() {
      var bs = this.bs;
      if (window.document.hidden) {
        bs.stop(0);
      } else {
        bs = createMovieVoice();
        bs.connect(this.filter);
        bs.start(0, this.idx / 60);
      }
    }
  }]);

  return Movie;
}();

},{"./json":298,"./lzbase62.min":299,"./xhrGet":305}],301:[function(require,module,exports){
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

},{}],302:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.circleLoop = circleLoop;
exports.rectLoop = rectLoop;
exports.rectLoop2 = rectLoop2;
exports.polygonLoop = polygonLoop;

var _marked = [circleLoop, rectLoop, rectLoop2, polygonLoop].map(regeneratorRuntime.mark);

function circleLoop(vm, colors, cx, cy, t) {
  var colorDiv, i, x, ex, y, ey, dx, dy, c;
  return regeneratorRuntime.wrap(function circleLoop$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          //while (true) {
          //cls();
          colorDiv = colors.length / 2;
          i = 0;

        case 2:
          if (!(i < 256)) {
            _context.next = 10;
            break;
          }

          for (x = 0, ex = 40; x < ex; ++x) {
            for (y = 0, ey = 25; y < ey; ++y) {
              dx = Math.abs(x - cx), dy = Math.abs(y - cy);
              c = colors[Math.sin(Math.sqrt(dx * dx + dy * dy) + t) * colorDiv + colorDiv | 0];

              vm.setColor(x, y, c[0], c[1]);
            }
          }
          t += 0.2;
          _context.next = 7;
          return;

        case 7:
          ++i;
          _context.next = 2;
          break;

        case 10:
          return _context.abrupt('return', t);

        case 11:
        case 'end':
          return _context.stop();
      }
    }
  }, _marked[0], this);
}

function rectLoop(vm, colors, cx, cy, t) {
  var colorDiv, i, x, ex, y, ey, dt, ax, ay, dx, dy, c;
  return regeneratorRuntime.wrap(function rectLoop$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          //while (true) {
          //cls();
          colorDiv = colors.length / 2;
          i = 0;

        case 2:
          if (!(i < 256)) {
            _context2.next = 10;
            break;
          }

          for (x = 0, ex = 40; x < ex; ++x) {
            for (y = 0, ey = 25; y < ey; ++y) {
              dt = t * 0.25;
              ax = Math.cos(dt) * (x - cx) - Math.sin(dt) * (y - cy) + cx;
              ay = Math.sin(dt) * (x - cx) + Math.cos(dt) * (y - cy) + cy;
              dx = Math.abs(ax - cx), dy = Math.abs(ay - cy);
              c = void 0;

              if (dx > dy) {
                c = colors[Math.sin(dx + t) * colorDiv + colorDiv | 0];
              } else {
                c = colors[Math.sin(dy + t) * colorDiv + colorDiv | 0];
              }
              vm.setColor(x, y, c[0], c[1]);
            }
          }
          t += 0.1;
          _context2.next = 7;
          return;

        case 7:
          ++i;
          _context2.next = 2;
          break;

        case 10:
          return _context2.abrupt('return', t);

        case 11:
        case 'end':
          return _context2.stop();
      }
    }
  }, _marked[1], this);
}

function rectLoop2(vm, colors, cx, cy, t) {
  var colorDiv, i, x, ex, y, ey, dt, ax, ay, dx, dy, c;
  return regeneratorRuntime.wrap(function rectLoop2$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          //while (true) {
          //cls();
          colorDiv = colors.length / 2;
          i = 0;

        case 2:
          if (!(i < 256)) {
            _context3.next = 10;
            break;
          }

          for (x = 0, ex = 40; x < ex; ++x) {
            for (y = 0, ey = 25; y < ey; ++y) {
              dt = t * 0.25;
              ax = Math.cos(dt) * (x - cx) - Math.sin(dt) * (y - cy) + cx;
              ay = Math.sin(dt) * (x - cx) + Math.cos(dt) * (y - cy) + cy;
              dx = Math.abs(ax - cx), dy = Math.abs(ay - cy);
              c = void 0;

              if (dx > dy) {
                c = colors[Math.sin(Math.cos(dx) + t) * colorDiv + colorDiv | 0];
              } else {
                c = colors[Math.sin(Math.cos(dy) + t) * colorDiv + colorDiv | 0];
              }
              vm.setColor(x, y, c[0], c[1]);
            }
          }
          t += 0.1;
          _context3.next = 7;
          return;

        case 7:
          ++i;
          _context3.next = 2;
          break;

        case 10:
          return _context3.abrupt('return', t);

        case 11:
        case 'end':
          return _context3.stop();
      }
    }
  }, _marked[2], this);
}

function polygonLoop(vm, colors, cx, cy, a, t) {
  var colorDiv, i, x1, ex1, y1, ey1, tx, ty, cost, sint, dx, dy, theta, theta1, x2, c;
  return regeneratorRuntime.wrap(function polygonLoop$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          colorDiv = colors.length / 2;
          i = 0;

        case 2:
          if (!(i < 128)) {
            _context4.next = 11;
            break;
          }

          for (x1 = 0, ex1 = 40; x1 < ex1; ++x1) {
            for (y1 = 0, ey1 = 25; y1 < ey1; ++y1) {
              tx = x1 - cx;
              ty = y1 - cy;
              cost = Math.cos(t / 4), sint = Math.sin(t / 4);
              dx = cost * tx - sint * ty;
              dy = sint * tx + cost * ty;
              theta = Math.atan2(dy, dx);
              theta1 = Math.floor(theta / (2 * Math.PI / a)) * (2 * Math.PI / a) + Math.PI / a;
              x2 = dx * Math.cos(theta1) + dy * Math.sin(theta1);
              c = colors[Math.sin(x2 + t) * colorDiv + colorDiv | 0];

              vm.setColor(x1, y1, c[0], c[1]);
            }
          }
          vm.print(0, 0, ('0' + a).slice(-2) + 'ｶｸｹｲ', 7, 0, true);
          t += 0.1;
          _context4.next = 8;
          return;

        case 8:
          ++i;
          _context4.next = 2;
          break;

        case 11:
          return _context4.abrupt('return', t);

        case 12:
        case 'end':
          return _context4.stop();
      }
    }
  }, _marked[3], this);
}

},{}],303:[function(require,module,exports){
"use strict";

require("babel-polyfill");

var _mz700fon = require("./mz700fon");

var _charCodes = require("./charCodes");

var _audio = require("./audio");

var audio = _interopRequireWildcard(_audio);

var _seqData = require("./seqData");

var _polygonLoop = require("./polygonLoop");

var loops = _interopRequireWildcard(_polygonLoop);

var _charGraphics = require("./charGraphics");

var _json = require("./json");

var _movie = require("./movie");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

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

var colorTable = [[0, 0], [0, 1], [1, 1], [0, 2], [0, 3], [1, 2], [1, 3], [2, 2], [2, 3], [3, 3], [0, 4], [0, 5], [1, 4], [1, 5], [0, 6], [2, 4], [0, 7], [1, 6], [2, 5], [3, 4], [1, 7], [3, 5], [2, 6], [2, 7], [3, 6], [3, 7], [4, 4], [4, 5], [5, 5], [4, 6], [4, 7], [5, 6], [5, 7], [6, 6], [6, 7], [7, 7]];

var colorTable1 = [[0, 0], [0, 1], [1, 1], [0, 2], [0, 3], [1, 3], [2, 2], [2, 3], [3, 3], [0, 4], [0, 5], [1, 5], [0, 6], [0, 7], [1, 7], [2, 6], [2, 7], [3, 7], [4, 4], [4, 5], [5, 5], [4, 6], [4, 7], [5, 7], [6, 6], [6, 7], [7, 7]];

window.addEventListener('load', function () {
  var vm = {};
  // audioの初期化
  var audio_ = new audio.Audio();
  var sequencer = new audio.Sequencer(audio_);

  vm.audio = audio_;
  vm.sequencer = sequencer;

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

  vm.cg = new _charGraphics.CharaGraphics(vm);

  vm.bufferB = bufferB;
  vm.bufferG = bufferG;
  vm.bufferR = bufferR;
  vm.palletColors = palletColors;
  vm.virtualWidth = virtualWidth;
  vm.virtualHeight = virtualHeight;
  vm.bufferWidth = bufferWidth;
  vm.bufferHeight = bufferHeight;
  vm.bufferXSize = bufferXSize;
  vm.fontTexWidth = fontTexWidth;
  vm.fontTexHeight = fontTexHeight;
  vm.charCodeBufferWidth = charCodeBufferWidth;
  vm.charCodeBufferHeight = charCodeBufferHeight;
  vm.consoleWidth = consoleWidth;
  vm.consoleHeight = consoleHeight;
  vm.charCodeBuffer = charCodeBuffer;
  vm.charAttrBuffer = charAttrBuffer;
  vm.fontBuffer = fontBuffer;
  vm.runBtn = runBtn;
  vm.stopBtn = runBtn;
  vm.resumeBtn = runBtn;

  var movie = void 0;

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

  vm.pset = pset;

  function preset(x, y) {
    var offset = y * bufferXSize + x / 8 | 0;
    var bit = ~(1 << x % 8);
    bufferB[offset] &= bit;
    bufferG[offset] &= bit;
    bufferR[offset] &= bit;
  }

  vm.preset = preset;

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
  vm.cls = cls;

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

  vm.print = print;

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

  vm.printDirect = printDirect;

  function setColor(x, y, color, bgcolor) {
    var offset = x + y * charCodeBufferWidth;
    charAttrBuffer[offset] = color << 4 | bgcolor | charAttrBuffer[offset] & 0x80;
  }

  vm.setColor = setColor;

  vm.colors = colorTable1;

  // メイン
  function run() {
    var gen = regeneratorRuntime.mark(function _callee() {
      var cx, cy, i, colors, checker, back, front, x, ex, y, ey;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              //while (true) {
              cx = 20, cy = 13;
              i = 0;
              colors = [];
              checker = String.fromCharCode(0xef);

              for (back = 0; back < 8; ++back) {
                for (front = back; front < 8; ++front) {
                  colors.push({ back: back, front: front });
                }
              }

              for (x = 0, ex = 40; x < ex; ++x) {
                for (y = 0, ey = 25; y < ey; ++y) {
                  printDirect(x, y, checker, 0, 0);
                }
              }
              //while(true){
              // for(let a = 3; a < 11;++a){
              //   i = yield * loops.polygonLoop(vm,colorTable1,cx,cy,a,i);
              // }
              // for(let a = 9; a > 3;--a){
              //   i = yield * loops.polygonLoop(vm,colorTable1,cx,cy,a,i);
              // }
              // i = yield * rectLoop(colorTable1,cx,cy,i);
              // i = yield * rectLoop2(colorTable1,cx,cy,i);
              // i = yield * circleLoop(colorTable1,cx,cy,i);
              return _context.delegateYield(movie.playMovie(colorTable1), "t0", 7);

            case 7:
              //}

              // for(let i = 0,e = colorTable.length;i<e;++i){
              //   printDirect(i,0,checker,colorTable[i][0],colorTable[i][1]);
              // }
              // for(let i = 0,e = colorTable1.length;i<e;++i){
              //   printDirect(i,2,checker,colorTable1[i][0],colorTable1[i][1]);
              // }

              updateStatus(STATUS.stop);
              sequencer.stop();

            case 9:
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
    sequencer.start();
    run();
  });

  pauseBtn.addEventListener('click', function () {
    if (status == STATUS.pause) {
      updateStatus(STATUS.run);
      sequencer.resume();
      movie.resume();
    } else {
      sequencer.pause();
      movie.pause();
      updateStatus(STATUS.pause);
    }
  });

  stopBtn.addEventListener('click', function () {
    sequencer.stop();
    movie.stop();
    updateStatus(STATUS.stop);
  });

  document.addEventListener("visibilitychange", function () {
    if (document.hidden) {
      if (sequencer.status == sequencer.PLAY) {
        sequencer.pause();
        movie.pause();
        sequencer.isHiddenPause = true;
      }
    } else {
      if (sequencer.isHiddenPause) {
        sequencer.resume();
        movie.resume();
        sequencer.isHiddenPause = false;
      }
    }
  });
  // resetBtn.addEventListener('click',()=>{
  //   updateStatus(STATUS.reset);
  // });

  movie = new _movie.Movie(vm);
  var loadMovie = movie.loadMovie();

  sequencer.load(_seqData.seqData);
  Promise.all([audio_.readDrumSample, loadMovie]).then(function () {
    cls();
    updateStatus(STATUS.stop);
    //render();
  });
  print(0, 0, 'ﾘｿｰｽｦﾛｰﾄﾞﾁｭｳ.ｵﾏﾁｸﾀﾞｻｲ..', 7, 1, true);
  render();
});

},{"./audio":295,"./charCodes":296,"./charGraphics":297,"./json":298,"./movie":300,"./mz700fon":301,"./polygonLoop":302,"./seqData":304,"babel-polyfill":1}],304:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var seqData = exports.seqData = {
  name: 'Test',
  tracks: [
  // {
  //   name: 'part1',
  //   channel: 0,
  //   mml:
  //   `
  //    s0.01,0.2,0.2,0.03 @2
  //    t90  q35 v30 l1r1r1r1r1 $l16o3 cccccccc<ggggaabb> cccccccc<gggg>cc<bb b-b-b-b-b-b-b-b-ffffggg+g+ g+g+g+g+g+g+g+g+ggggaabb >
  //          `
  //   },
  {
    name: 'part3',
    channel: 1,
    mml: 's0.01,0.01,1.0,0.05 o5 t80 @10 v10 q20 $l4grgr'
  },
  // {
  //   name: 'part4',
  //   channel: 2,
  //   mml:
  //   `s0.01,0.01,1.0,0.05 o5 t80 @20 v60 q80 $/:l4rv60b8.v30b16rl16v60b8r8:/3l4rb8.b16rl16br16bb`
  // }
  //  ,
  {
    name: 'part5',
    channel: 3,
    mml: 's0.01,0.01,1.0,0.05 o5 t80 @11 l8 $ q20 v10 r8a8 r8a8'
  }, {
    name: 'part5',
    channel: 4,
    mml: 's0.01,0.01,1.0,0.05 o5 t80 @20 q95 $v15 l4 rrg2 '
  }]
};

},{}],305:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.xhrGet = xhrGet;
var xhr = new XMLHttpRequest();
function xhrGet(url) {
  return new Promise(function (resolve, reject) {
    xhr.open("get", url, true);
    xhr.onload = function () {
      if (xhr.status == 200) {
        resolve(this.responseText);
      } else {
        reject(new Error('XMLHttpRequest Error:' + xhr.status));
      }
    };
    xhr.onerror = function (err) {
      reject(err);
    };
    xhr.send(null);
  });
}

},{}]},{},[303])