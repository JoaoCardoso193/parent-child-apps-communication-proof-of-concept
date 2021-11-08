//////////////////////////////////////////////////////////////////////////
//                                                                      //
// This is a generated file. You can view the original                  //
// source in your browser if your browser supports source maps.         //
// Source maps are supported by all recent versions of Chrome, Safari,  //
// and Firefox, and by Internet Explorer 11.                            //
//                                                                      //
//////////////////////////////////////////////////////////////////////////


(function () {

/* Imports */
var Meteor = Package.meteor.Meteor;
var global = Package.meteor.global;
var meteorEnv = Package.meteor.meteorEnv;
var Tracker = Package.tracker.Tracker;
var Deps = Package.tracker.Deps;
var meteorInstall = Package.modules.meteorInstall;
var meteorBabelHelpers = Package.modules.meteorBabelHelpers;
var Promise = Package.promise.Promise;
var Symbol = Package['ecmascript-runtime-client'].Symbol;
var Map = Package['ecmascript-runtime-client'].Map;
var Set = Package['ecmascript-runtime-client'].Set;

/* Package-scope variables */
var _subscribe;

var require = meteorInstall({"node_modules":{"meteor":{"rdb:svelte-meteor-data":{"index.js":function module(require,exports,module){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// packages/rdb_svelte-meteor-data/index.js                                                                           //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
module.link("./use-tracker", {
  "default": "useTracker"
}, 0);
module.link("./subscribe");
module.link("./autorun");

if (Package['mongo']) {
  module.link("./cursor");
}

if (Package['reactive-var']) {
  module.link("./reactive-var");
}

if (Package['session'] && Meteor.isClient) {
  module.link("./use-session", {
    "default": "useSession"
  }, 1);
} // Import this last, since it overwrites the built-in Tracker.autorun
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"autorun.js":function module(require,exports,module){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// packages/rdb_svelte-meteor-data/autorun.js                                                                         //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
var _createForOfIteratorHelperLoose;

module.link("@babel/runtime/helpers/createForOfIteratorHelperLoose", {
  default: function (v) {
    _createForOfIteratorHelperLoose = v;
  }
}, 0);

var _toConsumableArray;

module.link("@babel/runtime/helpers/toConsumableArray", {
  default: function (v) {
    _toConsumableArray = v;
  }
}, 1);
var Tracker;
module.link("meteor/tracker", {
  Tracker: function (v) {
    Tracker = v;
  }
}, 0);
var current_component, schedule_update, dirty_components;
module.link("svelte/internal", {
  current_component: function (v) {
    current_component = v;
  },
  schedule_update: function (v) {
    schedule_update = v;
  },
  dirty_components: function (v) {
    dirty_components = v;
  }
}, 1);
var _autorun = Tracker.autorun;
var _nonreactive = Tracker.nonreactive;

function svelteAwareAutorun(f, options) {
  var component = current_component;

  var computation = _autorun.apply(this, arguments);

  if (component) {
    // We're inside a Svelte component.  We have to stop the computation when
    // the component is destroyed.
    _autoStopComputation(computation, component);
  }

  return computation;
}

Tracker.autorun = svelteAwareAutorun;

Tracker.nonreactive = function () {
  function nonreactive(f) {
    if (current_component) {
      // A Tracker.autorun inside a Tracker.nonreactive should behave normally,
      // without the special Svelte stuff.
      var prevAutorun = Tracker.autorun;
      Tracker.autorun = _autorun;

      try {
        return _nonreactive.apply(this, arguments);
      } finally {
        Tracker.autorun = prevAutorun;
      }
    } else {
      return _nonreactive.apply(this, arguments);
    }
  }

  return nonreactive;
}();

function _autoStopComputation(computation, component) {
  var $$ = component.$$;
  $$.on_destroy.push(computation.stop.bind(computation));

  if (!$$.ctx) {
    // We're in initialization, so nothing else to do.
    return;
  }

  if ($$.fragment && $$.dirty[0] === -1) {
    // We have a fragment, but it's set to the initial dirty state, so we must
    // be in on onMount or so.  Don't do anything special, then.
    return;
  } // We are in a reactive Svelte update.  That means that we'll need to stop the
  // computation the next time that it is run.  But we don't know when that is,
  // because the next update may or may not hit this autorun again, depending on
  // the dirty flags.
  // So, we simply stop all computations the next time that the update is run,
  // but we keep listening for invalidations, so that if one of them becomes
  // invalid, we can force Svelte to re-run the updates to make it hit the
  // autorun again.
  // But first, remember which dirty flags made this autorun trigger, so that we
  // can reuse these bits to force Svelte to re-hit the autorun.
  // This will unfortunately most of the time be all bits set, since the first
  // time it is called is usually during initialization.  But if the autorun is
  // first enabled by a Svelte variable change, it will be a bit more efficient.


  computation._savedDirty = _toConsumableArray($$.dirty);

  if ($$._stopComputations) {
    $$._stopComputations.push(computation);

    return;
  }

  $$._stopComputations = [computation]; // Temporary hook around the update function so that it stops our computation
  // the next time it is called.

  var _update = $$.update;

  $$.update = function () {
    // Optimization: are we about to rerun everything?  If so, don't bother with
    // onInvalidate, just stop the computations right here.
    if ($$.dirty.every(function (d) {
      return d === 0x7fffffff;
    })) {
      $$._stopComputations.forEach(function (comp) {
        return comp.stop();
      });
    } else {
      var _loop = function (comp) {
        comp.stopped = true;
        comp.onInvalidate(function () {
          if ($$.dirty[0] === -1) {
            // We're the first to mark it dirty since the last update.
            dirty_components.push(component);
            schedule_update();
            $$.dirty.fill(0);
          }

          comp._savedDirty.forEach(function (mask, i) {
            $$.dirty[i] |= mask & 0x7fffffff;
          });
        });
      };

      // Otherwise, we are not sure whether all the autorun blocks will run
      // again, so we prevent the computations from continuing to run, but will
      // continue to watch it for changes.  If there is a change, we require the
      // update to be run again.
      for (var _iterator = _createForOfIteratorHelperLoose($$._stopComputations), _step; !(_step = _iterator()).done;) {
        var comp = _step.value;

        _loop(comp);
      }
    } // Leave everything as it was, so that the overhead is removed if the
    // Tracker.autorun was under a condition that has now becomes false.


    delete $$._stopComputations;
    $$.update = _update;
    return _update();
  };
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"cursor.js":function module(require,exports,module){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// packages/rdb_svelte-meteor-data/cursor.js                                                                          //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
var _toConsumableArray;

module.link("@babel/runtime/helpers/toConsumableArray", {
  default: function (v) {
    _toConsumableArray = v;
  }
}, 0);
var Mongo;
module.link("meteor/mongo", {
  Mongo: function (v) {
    Mongo = v;
  }
}, 0);

Mongo.Cursor.prototype.subscribe = function (set) {
  var _this = this;

  // Set the initial result directly, without going through the callbacks
  var mapFn = this._transform ? function (element) {
    return _this._transform(_this._projectionFn(element));
  } : function (element) {
    return _this._projectionFn(element);
  };

  var result = this._getRawObjects({
    ordered: true
  }).map(mapFn);

  var handle = this.observe({
    _suppress_initial: true,
    addedAt: function (doc, i) {
      result = [].concat(_toConsumableArray(result.slice(0, i)), [doc], _toConsumableArray(result.slice(i)));
      set(result);
    },
    changedAt: function (doc, old, i) {
      result = [].concat(_toConsumableArray(result.slice(0, i)), [doc], _toConsumableArray(result.slice(i + 1)));
      set(result);
    },
    removedAt: function (old, i) {
      result = [].concat(_toConsumableArray(result.slice(0, i)), _toConsumableArray(result.slice(i + 1)));
      set(result);
    },
    movedTo: function (doc, from, to) {
      result = [].concat(_toConsumableArray(result.slice(0, from)), _toConsumableArray(result.slice(from + 1)));
      result.splice(to, 0, doc);
      set(result);
    }
  });
  set(result);
  return handle.stop.bind(this);
};
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"reactive-var.js":function module(require,exports,module){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// packages/rdb_svelte-meteor-data/reactive-var.js                                                                    //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
var ReactiveVar;
module.link("meteor/reactive-var", {
  ReactiveVar: function (v) {
    ReactiveVar = v;
  }
}, 0);
var nextId = 1;

ReactiveVar.prototype.subscribe = function () {
  function subscribe(set) {
    var _this = this;

    var value = this.curValue;

    if (value !== undefined) {
      set(value);
    }

    var id = "svelte-" + nextId++;
    this.dep._dependentsById[id] = {
      _id: id,
      invalidate: function () {
        set(_this.curValue);
      }
    };
    return function () {
      delete _this.dep._dependentsById[id];
    };
  }

  return subscribe;
}();
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"subscribe.js":function module(require,exports,module){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// packages/rdb_svelte-meteor-data/subscribe.js                                                                       //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
var current_component;
module.link("svelte/internal", {
  current_component: function (v) {
    current_component = v;
  }
}, 0);
_subscribe = Meteor.subscribe;

Meteor.subscribe = function () {
  function subscribe(name) {
    var params = Array.from(arguments);
    var callbacks = Object.create(null);

    if (params.length > 1) {
      // Preserve existing callbacks.
      var last = params[params.length - 1];

      if (last) {
        // Last arg may be specified as a function, or as an object
        if (typeof last === 'function') {
          callbacks.onReady = params.pop();
        } else if ([last.onReady, last.onError, last.onStop].some(function (f) {
          return typeof f === "function";
        })) {
          callbacks = params.pop();
        }
      }
    }

    params.push(callbacks);
    var subscription; // Collect callbacks to call when subscription is ready or has errored.

    var readyCallbacks = [];
    var errorCallbacks = [];

    if (callbacks.onReady) {
      readyCallbacks.push(callbacks.onReady);
    }

    if (callbacks.onError) {
      errorCallbacks.push(callbacks.onError);
    }

    callbacks.onReady = function () {
      readyCallbacks.forEach(function (fn) {
        return fn(subscription);
      });
      readyCallbacks.length = 0;
    };

    callbacks.onError = function (err) {
      errorCallbacks.forEach(function (fn) {
        return fn(err);
      });
      errorCallbacks.length = 0;
    };

    subscription = _subscribe.apply(this, params);

    if (current_component) {
      current_component.$$.on_destroy.push(subscription.stop.bind(subscription));
    }

    subscription.then = function (fn, err) {
      if (subscription.ready()) {
        fn();
      } else {
        readyCallbacks.push(fn);
        err && errorCallbacks.push(err);
      }
    };

    return subscription;
  }

  return subscribe;
}();
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"use-session.js":function module(require,exports,module){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// packages/rdb_svelte-meteor-data/use-session.js                                                                     //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
module.export({
  "default": function () {
    return useSession;
  }
});
var Session;
module.link("meteor/session", {
  Session: function (v) {
    Session = v;
  }
}, 0);
var EJSON;
module.link("meteor/ejson", {
  EJSON: function (v) {
    EJSON = v;
  }
}, 1);
var nextId = 1;

var parse = function (serialized) {
  return serialized !== undefined && serialized !== 'undefined' ? EJSON.parse(serialized) : undefined;
};

function useSession(key, defaultValue) {
  if (arguments.length > 1) {
    Session.setDefault(key, defaultValue);
  }

  return {
    subscribe: function (set) {
      Session._ensureKey(key);

      var dep = Session.keyDeps[key];

      if (Object.prototype.hasOwnProperty.call(Session.keys, key)) {
        set(parse(Session.keys[key]));
      }

      var id = "svelte-session-" + nextId++;
      dep._dependentsById[id] = {
        _id: id,
        invalidate: function () {
          set(parse(Session.keys[key]));
        }
      };
      return function () {
        delete dep._dependentsById[id];
      };
    },
    set: function (value) {
      Session.set(key, value);
    }
  };
}

;
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"use-tracker.js":function module(require,exports,module){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// packages/rdb_svelte-meteor-data/use-tracker.js                                                                     //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
module.export({
  "default": function () {
    return useTracker;
  }
});

/**
 * This function wraps a reactive Meteor computation as a Svelte store.
 */
var nonreactive = Tracker.nonreactive;
var autorun = Tracker.autorun;

function useTracker(reactiveFn) {
  return {
    subscribe: function (set) {
      return nonreactive(function () {
        var computation = autorun(function () {
          return set(reactiveFn());
        });
        return computation.stop.bind(computation);
      });
    }
  };
}

;
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}}}}},{
  "extensions": [
    ".js",
    ".json"
  ]
});

var exports = require("/node_modules/meteor/rdb:svelte-meteor-data/index.js");

/* Exports */
Package._define("rdb:svelte-meteor-data", exports);

})();
