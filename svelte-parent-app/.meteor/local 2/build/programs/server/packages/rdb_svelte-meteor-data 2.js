(function () {

/* Imports */
var Meteor = Package.meteor.Meteor;
var global = Package.meteor.global;
var meteorEnv = Package.meteor.meteorEnv;
var ECMAScript = Package.ecmascript.ECMAScript;
var Tracker = Package.tracker.Tracker;
var Deps = Package.tracker.Deps;
var meteorInstall = Package.modules.meteorInstall;
var Promise = Package.promise.Promise;

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
  default: "useTracker"
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
    default: "useSession"
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
let Tracker;
module.link("meteor/tracker", {
  Tracker(v) {
    Tracker = v;
  }

}, 0);
let current_component, schedule_update, dirty_components;
module.link("svelte/internal", {
  current_component(v) {
    current_component = v;
  },

  schedule_update(v) {
    schedule_update = v;
  },

  dirty_components(v) {
    dirty_components = v;
  }

}, 1);
const _autorun = Tracker.autorun;
const _nonreactive = Tracker.nonreactive;

function svelteAwareAutorun(f, options) {
  const component = current_component;

  const computation = _autorun.apply(this, arguments);

  if (component) {
    // We're inside a Svelte component.  We have to stop the computation when
    // the component is destroyed.
    _autoStopComputation(computation, component);
  }

  return computation;
}

Tracker.autorun = svelteAwareAutorun;

Tracker.nonreactive = function nonreactive(f) {
  if (current_component) {
    // A Tracker.autorun inside a Tracker.nonreactive should behave normally,
    // without the special Svelte stuff.
    const prevAutorun = Tracker.autorun;
    Tracker.autorun = _autorun;

    try {
      return _nonreactive.apply(this, arguments);
    } finally {
      Tracker.autorun = prevAutorun;
    }
  } else {
    return _nonreactive.apply(this, arguments);
  }
};

function _autoStopComputation(computation, component) {
  const $$ = component.$$;
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


  computation._savedDirty = [...$$.dirty];

  if ($$._stopComputations) {
    $$._stopComputations.push(computation);

    return;
  }

  $$._stopComputations = [computation]; // Temporary hook around the update function so that it stops our computation
  // the next time it is called.

  const _update = $$.update;

  $$.update = () => {
    // Optimization: are we about to rerun everything?  If so, don't bother with
    // onInvalidate, just stop the computations right here.
    if ($$.dirty.every(d => d === 0x7fffffff)) {
      $$._stopComputations.forEach(comp => comp.stop());
    } else {
      // Otherwise, we are not sure whether all the autorun blocks will run
      // again, so we prevent the computations from continuing to run, but will
      // continue to watch it for changes.  If there is a change, we require the
      // update to be run again.
      for (const comp of $$._stopComputations) {
        comp.stopped = true;
        comp.onInvalidate(() => {
          if ($$.dirty[0] === -1) {
            // We're the first to mark it dirty since the last update.
            dirty_components.push(component);
            schedule_update();
            $$.dirty.fill(0);
          }

          comp._savedDirty.forEach((mask, i) => {
            $$.dirty[i] |= mask & 0x7fffffff;
          });
        });
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
let Mongo;
module.link("meteor/mongo", {
  Mongo(v) {
    Mongo = v;
  }

}, 0);

Mongo.Cursor.prototype.subscribe = function (set) {
  // Set the initial result directly, without going through the callbacks
  const mapFn = this._transform ? element => this._transform(this._projectionFn(element)) : element => this._projectionFn(element);

  let result = this._getRawObjects({
    ordered: true
  }).map(mapFn);

  const handle = this.observe({
    _suppress_initial: true,
    addedAt: (doc, i) => {
      result = [...result.slice(0, i), doc, ...result.slice(i)];
      set(result);
    },
    changedAt: (doc, old, i) => {
      result = [...result.slice(0, i), doc, ...result.slice(i + 1)];
      set(result);
    },
    removedAt: (old, i) => {
      result = [...result.slice(0, i), ...result.slice(i + 1)];
      set(result);
    },
    movedTo: (doc, from, to) => {
      result = [...result.slice(0, from), ...result.slice(from + 1)];
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
let ReactiveVar;
module.link("meteor/reactive-var", {
  ReactiveVar(v) {
    ReactiveVar = v;
  }

}, 0);
let nextId = 1;

ReactiveVar.prototype.subscribe = function subscribe(set) {
  const value = this.curValue;

  if (value !== undefined) {
    set(value);
  }

  const id = "svelte-".concat(nextId++);
  this.dep._dependentsById[id] = {
    _id: id,
    invalidate: () => {
      set(this.curValue);
    }
  };
  return () => {
    delete this.dep._dependentsById[id];
  };
};
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"subscribe.js":function module(require,exports,module){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// packages/rdb_svelte-meteor-data/subscribe.js                                                                       //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
let current_component;
module.link("svelte/internal", {
  current_component(v) {
    current_component = v;
  }

}, 0);
_subscribe = Meteor.subscribe;

Meteor.subscribe = function subscribe(name) {
  const params = Array.from(arguments);
  let callbacks = Object.create(null);

  if (params.length > 1) {
    // Preserve existing callbacks.
    const last = params[params.length - 1];

    if (last) {
      // Last arg may be specified as a function, or as an object
      if (typeof last === 'function') {
        callbacks.onReady = params.pop();
      } else if ([last.onReady, last.onError, last.onStop].some(f => typeof f === "function")) {
        callbacks = params.pop();
      }
    }
  }

  params.push(callbacks);
  let subscription; // Collect callbacks to call when subscription is ready or has errored.

  let readyCallbacks = [];
  let errorCallbacks = [];

  if (callbacks.onReady) {
    readyCallbacks.push(callbacks.onReady);
  }

  if (callbacks.onError) {
    errorCallbacks.push(callbacks.onError);
  }

  callbacks.onReady = () => {
    readyCallbacks.forEach(fn => fn(subscription));
    readyCallbacks.length = 0;
  };

  callbacks.onError = err => {
    errorCallbacks.forEach(fn => fn(err));
    errorCallbacks.length = 0;
  };

  subscription = _subscribe.apply(this, params);

  if (current_component) {
    current_component.$$.on_destroy.push(subscription.stop.bind(subscription));
  }

  subscription.then = (fn, err) => {
    if (subscription.ready()) {
      fn();
    } else {
      readyCallbacks.push(fn);
      err && errorCallbacks.push(err);
    }
  };

  return subscription;
};
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"use-session.js":function module(require,exports,module){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// packages/rdb_svelte-meteor-data/use-session.js                                                                     //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
module.export({
  default: () => useSession
});
let Session;
module.link("meteor/session", {
  Session(v) {
    Session = v;
  }

}, 0);
let EJSON;
module.link("meteor/ejson", {
  EJSON(v) {
    EJSON = v;
  }

}, 1);
let nextId = 1;

const parse = serialized => serialized !== undefined && serialized !== 'undefined' ? EJSON.parse(serialized) : undefined;

function useSession(key, defaultValue) {
  if (arguments.length > 1) {
    Session.setDefault(key, defaultValue);
  }

  return {
    subscribe(set) {
      Session._ensureKey(key);

      const dep = Session.keyDeps[key];

      if (Object.prototype.hasOwnProperty.call(Session.keys, key)) {
        set(parse(Session.keys[key]));
      }

      const id = "svelte-session-".concat(nextId++);
      dep._dependentsById[id] = {
        _id: id,
        invalidate: () => {
          set(parse(Session.keys[key]));
        }
      };
      return () => {
        delete dep._dependentsById[id];
      };
    },

    set(value) {
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
  default: () => useTracker
});

/**
 * This function wraps a reactive Meteor computation as a Svelte store.
 */
const nonreactive = Tracker.nonreactive;
const autorun = Tracker.autorun;

function useTracker(reactiveFn) {
  return {
    subscribe(set) {
      return nonreactive(() => {
        const computation = autorun(() => set(reactiveFn()));
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

//# sourceURL=meteor://💻app/packages/rdb_svelte-meteor-data.js
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1ldGVvcjovL/CfkrthcHAvcGFja2FnZXMvcmRiOnN2ZWx0ZS1tZXRlb3ItZGF0YS9pbmRleC5qcyIsIm1ldGVvcjovL/CfkrthcHAvcGFja2FnZXMvcmRiOnN2ZWx0ZS1tZXRlb3ItZGF0YS9hdXRvcnVuLmpzIiwibWV0ZW9yOi8v8J+Su2FwcC9wYWNrYWdlcy9yZGI6c3ZlbHRlLW1ldGVvci1kYXRhL2N1cnNvci5qcyIsIm1ldGVvcjovL/CfkrthcHAvcGFja2FnZXMvcmRiOnN2ZWx0ZS1tZXRlb3ItZGF0YS9yZWFjdGl2ZS12YXIuanMiLCJtZXRlb3I6Ly/wn5K7YXBwL3BhY2thZ2VzL3JkYjpzdmVsdGUtbWV0ZW9yLWRhdGEvc3Vic2NyaWJlLmpzIiwibWV0ZW9yOi8v8J+Su2FwcC9wYWNrYWdlcy9yZGI6c3ZlbHRlLW1ldGVvci1kYXRhL3VzZS1zZXNzaW9uLmpzIiwibWV0ZW9yOi8v8J+Su2FwcC9wYWNrYWdlcy9yZGI6c3ZlbHRlLW1ldGVvci1kYXRhL3VzZS10cmFja2VyLmpzIl0sIm5hbWVzIjpbIm1vZHVsZSIsImxpbmsiLCJkZWZhdWx0IiwiUGFja2FnZSIsIk1ldGVvciIsImlzQ2xpZW50IiwiVHJhY2tlciIsInYiLCJjdXJyZW50X2NvbXBvbmVudCIsInNjaGVkdWxlX3VwZGF0ZSIsImRpcnR5X2NvbXBvbmVudHMiLCJfYXV0b3J1biIsImF1dG9ydW4iLCJfbm9ucmVhY3RpdmUiLCJub25yZWFjdGl2ZSIsInN2ZWx0ZUF3YXJlQXV0b3J1biIsImYiLCJvcHRpb25zIiwiY29tcG9uZW50IiwiY29tcHV0YXRpb24iLCJhcHBseSIsImFyZ3VtZW50cyIsIl9hdXRvU3RvcENvbXB1dGF0aW9uIiwicHJldkF1dG9ydW4iLCIkJCIsIm9uX2Rlc3Ryb3kiLCJwdXNoIiwic3RvcCIsImJpbmQiLCJjdHgiLCJmcmFnbWVudCIsImRpcnR5IiwiX3NhdmVkRGlydHkiLCJfc3RvcENvbXB1dGF0aW9ucyIsIl91cGRhdGUiLCJ1cGRhdGUiLCJldmVyeSIsImQiLCJmb3JFYWNoIiwiY29tcCIsInN0b3BwZWQiLCJvbkludmFsaWRhdGUiLCJmaWxsIiwibWFzayIsImkiLCJNb25nbyIsIkN1cnNvciIsInByb3RvdHlwZSIsInN1YnNjcmliZSIsInNldCIsIm1hcEZuIiwiX3RyYW5zZm9ybSIsImVsZW1lbnQiLCJfcHJvamVjdGlvbkZuIiwicmVzdWx0IiwiX2dldFJhd09iamVjdHMiLCJvcmRlcmVkIiwibWFwIiwiaGFuZGxlIiwib2JzZXJ2ZSIsIl9zdXBwcmVzc19pbml0aWFsIiwiYWRkZWRBdCIsImRvYyIsInNsaWNlIiwiY2hhbmdlZEF0Iiwib2xkIiwicmVtb3ZlZEF0IiwibW92ZWRUbyIsImZyb20iLCJ0byIsInNwbGljZSIsIlJlYWN0aXZlVmFyIiwibmV4dElkIiwidmFsdWUiLCJjdXJWYWx1ZSIsInVuZGVmaW5lZCIsImlkIiwiZGVwIiwiX2RlcGVuZGVudHNCeUlkIiwiX2lkIiwiaW52YWxpZGF0ZSIsIl9zdWJzY3JpYmUiLCJuYW1lIiwicGFyYW1zIiwiQXJyYXkiLCJjYWxsYmFja3MiLCJPYmplY3QiLCJjcmVhdGUiLCJsZW5ndGgiLCJsYXN0Iiwib25SZWFkeSIsInBvcCIsIm9uRXJyb3IiLCJvblN0b3AiLCJzb21lIiwic3Vic2NyaXB0aW9uIiwicmVhZHlDYWxsYmFja3MiLCJlcnJvckNhbGxiYWNrcyIsImZuIiwiZXJyIiwidGhlbiIsInJlYWR5IiwiZXhwb3J0IiwidXNlU2Vzc2lvbiIsIlNlc3Npb24iLCJFSlNPTiIsInBhcnNlIiwic2VyaWFsaXplZCIsImtleSIsImRlZmF1bHRWYWx1ZSIsInNldERlZmF1bHQiLCJfZW5zdXJlS2V5Iiwia2V5RGVwcyIsImhhc093blByb3BlcnR5IiwiY2FsbCIsImtleXMiLCJ1c2VUcmFja2VyIiwicmVhY3RpdmVGbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQUEsTUFBTSxDQUFDQyxJQUFQLENBQVksZUFBWixFQUE0QjtBQUFDQyxTQUFPLEVBQUM7QUFBVCxDQUE1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LEMiLCJmaWxlIjoiL3BhY2thZ2VzL3JkYl9zdmVsdGUtbWV0ZW9yLWRhdGEuanMiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgeyBkZWZhdWx0IGFzIHVzZVRyYWNrZXIgfSBmcm9tICcuL3VzZS10cmFja2VyJztcblxuaW1wb3J0ICcuL3N1YnNjcmliZSc7XG5cbmlmIChQYWNrYWdlWydtb25nbyddKSB7XG4gIGltcG9ydCAnLi9jdXJzb3InO1xufVxuXG5pZiAoUGFja2FnZVsncmVhY3RpdmUtdmFyJ10pIHtcbiAgaW1wb3J0ICcuL3JlYWN0aXZlLXZhcic7XG59XG5cbmlmIChQYWNrYWdlWydzZXNzaW9uJ10gJiYgTWV0ZW9yLmlzQ2xpZW50KSB7XG4gIGV4cG9ydCB7IGRlZmF1bHQgYXMgdXNlU2Vzc2lvbiB9IGZyb20gJy4vdXNlLXNlc3Npb24nO1xufVxuXG4vLyBJbXBvcnQgdGhpcyBsYXN0LCBzaW5jZSBpdCBvdmVyd3JpdGVzIHRoZSBidWlsdC1pbiBUcmFja2VyLmF1dG9ydW5cbmltcG9ydCAnLi9hdXRvcnVuJztcbiIsIi8qKlxuICogTWFrZXMgVHJhY2tlci5hdXRvcnVuKCkgY29tcHV0YXRpb25zIGF1dG9tYXRpY2FsbHkgc3RvcCB3aGVuIHRoZSBjb21wb25lbnQgaXNcbiAqIGRlc3Ryb3llZCwgb3IsIGlmIHJ1biBmcm9tIGEgcmVhY3RpdmUgU3ZlbHRlIGNvbXB1dGF0aW9uLCB3aGVuIHRoZSB1cGRhdGVcbiAqIGZ1bmN0aW9uIGlzIHJ1biBhZ2Fpbi5cbiAqL1xuXG5pbXBvcnQgeyBUcmFja2VyIH0gZnJvbSAnbWV0ZW9yL3RyYWNrZXInO1xuaW1wb3J0IHsgY3VycmVudF9jb21wb25lbnQsIHNjaGVkdWxlX3VwZGF0ZSwgZGlydHlfY29tcG9uZW50cyB9IGZyb20gJ3N2ZWx0ZS9pbnRlcm5hbCc7XG5cblxuY29uc3QgX2F1dG9ydW4gPSBUcmFja2VyLmF1dG9ydW47XG5jb25zdCBfbm9ucmVhY3RpdmUgPSBUcmFja2VyLm5vbnJlYWN0aXZlO1xuXG5mdW5jdGlvbiBzdmVsdGVBd2FyZUF1dG9ydW4oZiwgb3B0aW9ucykge1xuICBjb25zdCBjb21wb25lbnQgPSBjdXJyZW50X2NvbXBvbmVudDtcbiAgY29uc3QgY29tcHV0YXRpb24gPSBfYXV0b3J1bi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICBpZiAoY29tcG9uZW50KSB7XG4gICAgLy8gV2UncmUgaW5zaWRlIGEgU3ZlbHRlIGNvbXBvbmVudC4gIFdlIGhhdmUgdG8gc3RvcCB0aGUgY29tcHV0YXRpb24gd2hlblxuICAgIC8vIHRoZSBjb21wb25lbnQgaXMgZGVzdHJveWVkLlxuICAgIF9hdXRvU3RvcENvbXB1dGF0aW9uKGNvbXB1dGF0aW9uLCBjb21wb25lbnQpO1xuICB9XG4gIHJldHVybiBjb21wdXRhdGlvbjtcbn1cblxuVHJhY2tlci5hdXRvcnVuID0gc3ZlbHRlQXdhcmVBdXRvcnVuO1xuXG5UcmFja2VyLm5vbnJlYWN0aXZlID0gZnVuY3Rpb24gbm9ucmVhY3RpdmUoZikge1xuICBpZiAoY3VycmVudF9jb21wb25lbnQpIHtcbiAgICAvLyBBIFRyYWNrZXIuYXV0b3J1biBpbnNpZGUgYSBUcmFja2VyLm5vbnJlYWN0aXZlIHNob3VsZCBiZWhhdmUgbm9ybWFsbHksXG4gICAgLy8gd2l0aG91dCB0aGUgc3BlY2lhbCBTdmVsdGUgc3R1ZmYuXG4gICAgY29uc3QgcHJldkF1dG9ydW4gPSBUcmFja2VyLmF1dG9ydW47XG4gICAgVHJhY2tlci5hdXRvcnVuID0gX2F1dG9ydW47XG4gICAgdHJ5IHtcbiAgICAgIHJldHVybiBfbm9ucmVhY3RpdmUuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICB9IGZpbmFsbHkge1xuICAgICAgVHJhY2tlci5hdXRvcnVuID0gcHJldkF1dG9ydW47XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIHJldHVybiBfbm9ucmVhY3RpdmUuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgfVxufTtcblxuZnVuY3Rpb24gX2F1dG9TdG9wQ29tcHV0YXRpb24oY29tcHV0YXRpb24sIGNvbXBvbmVudCkge1xuICBjb25zdCAkJCA9IGNvbXBvbmVudC4kJDtcbiAgJCQub25fZGVzdHJveS5wdXNoKGNvbXB1dGF0aW9uLnN0b3AuYmluZChjb21wdXRhdGlvbikpO1xuICBpZiAoISQkLmN0eCkge1xuICAgIC8vIFdlJ3JlIGluIGluaXRpYWxpemF0aW9uLCBzbyBub3RoaW5nIGVsc2UgdG8gZG8uXG4gICAgcmV0dXJuO1xuICB9XG5cbiAgaWYgKCQkLmZyYWdtZW50ICYmICQkLmRpcnR5WzBdID09PSAtMSkge1xuICAgIC8vIFdlIGhhdmUgYSBmcmFnbWVudCwgYnV0IGl0J3Mgc2V0IHRvIHRoZSBpbml0aWFsIGRpcnR5IHN0YXRlLCBzbyB3ZSBtdXN0XG4gICAgLy8gYmUgaW4gb24gb25Nb3VudCBvciBzby4gIERvbid0IGRvIGFueXRoaW5nIHNwZWNpYWwsIHRoZW4uXG4gICAgcmV0dXJuO1xuICB9XG5cbiAgLy8gV2UgYXJlIGluIGEgcmVhY3RpdmUgU3ZlbHRlIHVwZGF0ZS4gIFRoYXQgbWVhbnMgdGhhdCB3ZSdsbCBuZWVkIHRvIHN0b3AgdGhlXG4gIC8vIGNvbXB1dGF0aW9uIHRoZSBuZXh0IHRpbWUgdGhhdCBpdCBpcyBydW4uICBCdXQgd2UgZG9uJ3Qga25vdyB3aGVuIHRoYXQgaXMsXG4gIC8vIGJlY2F1c2UgdGhlIG5leHQgdXBkYXRlIG1heSBvciBtYXkgbm90IGhpdCB0aGlzIGF1dG9ydW4gYWdhaW4sIGRlcGVuZGluZyBvblxuICAvLyB0aGUgZGlydHkgZmxhZ3MuXG4gIC8vIFNvLCB3ZSBzaW1wbHkgc3RvcCBhbGwgY29tcHV0YXRpb25zIHRoZSBuZXh0IHRpbWUgdGhhdCB0aGUgdXBkYXRlIGlzIHJ1bixcbiAgLy8gYnV0IHdlIGtlZXAgbGlzdGVuaW5nIGZvciBpbnZhbGlkYXRpb25zLCBzbyB0aGF0IGlmIG9uZSBvZiB0aGVtIGJlY29tZXNcbiAgLy8gaW52YWxpZCwgd2UgY2FuIGZvcmNlIFN2ZWx0ZSB0byByZS1ydW4gdGhlIHVwZGF0ZXMgdG8gbWFrZSBpdCBoaXQgdGhlXG4gIC8vIGF1dG9ydW4gYWdhaW4uXG5cbiAgLy8gQnV0IGZpcnN0LCByZW1lbWJlciB3aGljaCBkaXJ0eSBmbGFncyBtYWRlIHRoaXMgYXV0b3J1biB0cmlnZ2VyLCBzbyB0aGF0IHdlXG4gIC8vIGNhbiByZXVzZSB0aGVzZSBiaXRzIHRvIGZvcmNlIFN2ZWx0ZSB0byByZS1oaXQgdGhlIGF1dG9ydW4uXG4gIC8vIFRoaXMgd2lsbCB1bmZvcnR1bmF0ZWx5IG1vc3Qgb2YgdGhlIHRpbWUgYmUgYWxsIGJpdHMgc2V0LCBzaW5jZSB0aGUgZmlyc3RcbiAgLy8gdGltZSBpdCBpcyBjYWxsZWQgaXMgdXN1YWxseSBkdXJpbmcgaW5pdGlhbGl6YXRpb24uICBCdXQgaWYgdGhlIGF1dG9ydW4gaXNcbiAgLy8gZmlyc3QgZW5hYmxlZCBieSBhIFN2ZWx0ZSB2YXJpYWJsZSBjaGFuZ2UsIGl0IHdpbGwgYmUgYSBiaXQgbW9yZSBlZmZpY2llbnQuXG4gIGNvbXB1dGF0aW9uLl9zYXZlZERpcnR5ID0gWy4uLiQkLmRpcnR5XTtcblxuICBpZiAoJCQuX3N0b3BDb21wdXRhdGlvbnMpIHtcbiAgICAkJC5fc3RvcENvbXB1dGF0aW9ucy5wdXNoKGNvbXB1dGF0aW9uKTtcbiAgICByZXR1cm47XG4gIH1cblxuICAkJC5fc3RvcENvbXB1dGF0aW9ucyA9IFtjb21wdXRhdGlvbl07XG5cbiAgLy8gVGVtcG9yYXJ5IGhvb2sgYXJvdW5kIHRoZSB1cGRhdGUgZnVuY3Rpb24gc28gdGhhdCBpdCBzdG9wcyBvdXIgY29tcHV0YXRpb25cbiAgLy8gdGhlIG5leHQgdGltZSBpdCBpcyBjYWxsZWQuXG4gIGNvbnN0IF91cGRhdGUgPSAkJC51cGRhdGU7XG4gICQkLnVwZGF0ZSA9ICgpID0+IHtcbiAgICAvLyBPcHRpbWl6YXRpb246IGFyZSB3ZSBhYm91dCB0byByZXJ1biBldmVyeXRoaW5nPyAgSWYgc28sIGRvbid0IGJvdGhlciB3aXRoXG4gICAgLy8gb25JbnZhbGlkYXRlLCBqdXN0IHN0b3AgdGhlIGNvbXB1dGF0aW9ucyByaWdodCBoZXJlLlxuICAgIGlmICgkJC5kaXJ0eS5ldmVyeShkID0+IChkID09PSAweDdmZmZmZmZmKSkpIHtcbiAgICAgICQkLl9zdG9wQ29tcHV0YXRpb25zLmZvckVhY2goY29tcCA9PiBjb21wLnN0b3AoKSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIE90aGVyd2lzZSwgd2UgYXJlIG5vdCBzdXJlIHdoZXRoZXIgYWxsIHRoZSBhdXRvcnVuIGJsb2NrcyB3aWxsIHJ1blxuICAgICAgLy8gYWdhaW4sIHNvIHdlIHByZXZlbnQgdGhlIGNvbXB1dGF0aW9ucyBmcm9tIGNvbnRpbnVpbmcgdG8gcnVuLCBidXQgd2lsbFxuICAgICAgLy8gY29udGludWUgdG8gd2F0Y2ggaXQgZm9yIGNoYW5nZXMuICBJZiB0aGVyZSBpcyBhIGNoYW5nZSwgd2UgcmVxdWlyZSB0aGVcbiAgICAgIC8vIHVwZGF0ZSB0byBiZSBydW4gYWdhaW4uXG4gICAgICBmb3IgKGNvbnN0IGNvbXAgb2YgJCQuX3N0b3BDb21wdXRhdGlvbnMpIHtcbiAgICAgICAgY29tcC5zdG9wcGVkID0gdHJ1ZTtcbiAgICAgICAgY29tcC5vbkludmFsaWRhdGUoKCkgPT4ge1xuICAgICAgICAgIGlmICgkJC5kaXJ0eVswXSA9PT0gLTEpIHtcbiAgICAgICAgICAgIC8vIFdlJ3JlIHRoZSBmaXJzdCB0byBtYXJrIGl0IGRpcnR5IHNpbmNlIHRoZSBsYXN0IHVwZGF0ZS5cbiAgICAgICAgICAgIGRpcnR5X2NvbXBvbmVudHMucHVzaChjb21wb25lbnQpO1xuICAgICAgICAgICAgc2NoZWR1bGVfdXBkYXRlKCk7XG4gICAgICAgICAgICAkJC5kaXJ0eS5maWxsKDApO1xuICAgICAgICAgIH1cbiAgICAgICAgICBjb21wLl9zYXZlZERpcnR5LmZvckVhY2goKG1hc2ssIGkpID0+IHtcbiAgICAgICAgICAgICQkLmRpcnR5W2ldIHw9IG1hc2sgJiAweDdmZmZmZmZmO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBMZWF2ZSBldmVyeXRoaW5nIGFzIGl0IHdhcywgc28gdGhhdCB0aGUgb3ZlcmhlYWQgaXMgcmVtb3ZlZCBpZiB0aGVcbiAgICAvLyBUcmFja2VyLmF1dG9ydW4gd2FzIHVuZGVyIGEgY29uZGl0aW9uIHRoYXQgaGFzIG5vdyBiZWNvbWVzIGZhbHNlLlxuICAgIGRlbGV0ZSAkJC5fc3RvcENvbXB1dGF0aW9ucztcbiAgICAkJC51cGRhdGUgPSBfdXBkYXRlO1xuICAgIHJldHVybiBfdXBkYXRlKCk7XG4gIH07XG59XG4iLCIvKipcbiAqIEltcGxlbWVudHMgdGhlIFN2ZWx0ZSBzdG9yZSBjb250cmFjdCBmb3IgTW9uZ29EQiBjdXJzb3JzLlxuICovXG5cbmltcG9ydCB7IE1vbmdvIH0gZnJvbSAnbWV0ZW9yL21vbmdvJztcblxuTW9uZ28uQ3Vyc29yLnByb3RvdHlwZS5zdWJzY3JpYmUgPSBmdW5jdGlvbihzZXQpIHtcbiAgLy8gU2V0IHRoZSBpbml0aWFsIHJlc3VsdCBkaXJlY3RseSwgd2l0aG91dCBnb2luZyB0aHJvdWdoIHRoZSBjYWxsYmFja3NcbiAgY29uc3QgbWFwRm4gPSB0aGlzLl90cmFuc2Zvcm1cbiAgICA/IGVsZW1lbnQgPT4gdGhpcy5fdHJhbnNmb3JtKHRoaXMuX3Byb2plY3Rpb25GbihlbGVtZW50KSlcbiAgICA6IGVsZW1lbnQgPT4gdGhpcy5fcHJvamVjdGlvbkZuKGVsZW1lbnQpO1xuXG4gIGxldCByZXN1bHQgPSB0aGlzLl9nZXRSYXdPYmplY3RzKHtvcmRlcmVkOiB0cnVlfSkubWFwKG1hcEZuKTtcblxuICBjb25zdCBoYW5kbGUgPSB0aGlzLm9ic2VydmUoe1xuICAgIF9zdXBwcmVzc19pbml0aWFsOiB0cnVlLFxuICAgIGFkZGVkQXQ6IChkb2MsIGkpID0+IHtcbiAgICAgIHJlc3VsdCA9IFsuLi5yZXN1bHQuc2xpY2UoMCwgaSksIGRvYywgLi4ucmVzdWx0LnNsaWNlKGkpXTtcbiAgICAgIHNldChyZXN1bHQpO1xuICAgIH0sXG4gICAgY2hhbmdlZEF0OiAoZG9jLCBvbGQsIGkpID0+IHtcbiAgICAgIHJlc3VsdCA9IFsuLi5yZXN1bHQuc2xpY2UoMCwgaSksIGRvYywgLi4ucmVzdWx0LnNsaWNlKGkgKyAxKV07XG4gICAgICBzZXQocmVzdWx0KTtcbiAgICB9LFxuICAgIHJlbW92ZWRBdDogKG9sZCwgaSkgPT4ge1xuICAgICAgcmVzdWx0ID0gWy4uLnJlc3VsdC5zbGljZSgwLCBpKSwgLi4ucmVzdWx0LnNsaWNlKGkgKyAxKV07XG4gICAgICBzZXQocmVzdWx0KTtcbiAgICB9LFxuICAgIG1vdmVkVG86IChkb2MsIGZyb20sIHRvKSA9PiB7XG4gICAgICByZXN1bHQgPSBbLi4ucmVzdWx0LnNsaWNlKDAsIGZyb20pLCAuLi5yZXN1bHQuc2xpY2UoZnJvbSArIDEpXTtcbiAgICAgIHJlc3VsdC5zcGxpY2UodG8sIDAsIGRvYyk7XG4gICAgICBzZXQocmVzdWx0KTtcbiAgICB9LFxuICB9KTtcblxuICBzZXQocmVzdWx0KTtcbiAgcmV0dXJuIGhhbmRsZS5zdG9wLmJpbmQodGhpcyk7XG59O1xuIiwiLyoqXG4gKiBNYWtlcyBSZWFjdGl2ZVZhciBiZWhhdmUgYXMgYSBTdmVsdGUgc3RvcmUuXG4gKi9cblxuaW1wb3J0IHsgUmVhY3RpdmVWYXIgfSBmcm9tICdtZXRlb3IvcmVhY3RpdmUtdmFyJztcblxubGV0IG5leHRJZCA9IDE7XG5cblJlYWN0aXZlVmFyLnByb3RvdHlwZS5zdWJzY3JpYmUgPSBmdW5jdGlvbiBzdWJzY3JpYmUoc2V0KSB7XG4gIGNvbnN0IHZhbHVlID0gdGhpcy5jdXJWYWx1ZTtcbiAgaWYgKHZhbHVlICE9PSB1bmRlZmluZWQpIHtcbiAgICBzZXQodmFsdWUpO1xuICB9XG4gIGNvbnN0IGlkID0gYHN2ZWx0ZS0ke25leHRJZCsrfWA7XG4gIHRoaXMuZGVwLl9kZXBlbmRlbnRzQnlJZFtpZF0gPSB7XG4gICAgX2lkOiBpZCxcbiAgICBpbnZhbGlkYXRlOiAoKSA9PiB7XG4gICAgICBzZXQodGhpcy5jdXJWYWx1ZSk7XG4gICAgfSxcbiAgfTtcbiAgcmV0dXJuICgpID0+IHtcbiAgICBkZWxldGUgdGhpcy5kZXAuX2RlcGVuZGVudHNCeUlkW2lkXTtcbiAgfTtcbn07XG4iLCIvKipcbiAqIE92ZXJyaWRlcyBNZXRlb3Iuc3Vic2NyaWJlIHRvIGRvIHRoZSBmb2xsb3dpbmcgdGhpbmdzOlxuICogLSBBdXRvbWF0aWNhbGx5IHN0b3BzIHRoZSBzdWJzY3JpcHRpb24gd2hlbiB0aGUgY29tcG9uZW50IGlzIGRlc3Ryb3llZFxuICogLSBNYWtlcyB0aGUgcmV0dXJuIHZhbHVlIHVzYWJsZSBpbiB7I2F3YWl0fSBibG9ja3NcbiAqL1xuXG5pbXBvcnQgeyBjdXJyZW50X2NvbXBvbmVudCB9IGZyb20gJ3N2ZWx0ZS9pbnRlcm5hbCc7XG5cblxuX3N1YnNjcmliZSA9IE1ldGVvci5zdWJzY3JpYmU7XG5NZXRlb3Iuc3Vic2NyaWJlID0gZnVuY3Rpb24gc3Vic2NyaWJlKG5hbWUpIHtcbiAgY29uc3QgcGFyYW1zID0gQXJyYXkuZnJvbShhcmd1bWVudHMpO1xuICBsZXQgY2FsbGJhY2tzID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiAgaWYgKHBhcmFtcy5sZW5ndGggPiAxKSB7XG4gICAgLy8gUHJlc2VydmUgZXhpc3RpbmcgY2FsbGJhY2tzLlxuICAgIGNvbnN0IGxhc3QgPSBwYXJhbXNbcGFyYW1zLmxlbmd0aCAtIDFdO1xuICAgIGlmIChsYXN0KSB7XG4gICAgICAvLyBMYXN0IGFyZyBtYXkgYmUgc3BlY2lmaWVkIGFzIGEgZnVuY3Rpb24sIG9yIGFzIGFuIG9iamVjdFxuICAgICAgaWYgKHR5cGVvZiBsYXN0ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIGNhbGxiYWNrcy5vblJlYWR5ID0gcGFyYW1zLnBvcCgpO1xuICAgICAgfSBlbHNlIGlmIChbbGFzdC5vblJlYWR5LCBsYXN0Lm9uRXJyb3IsIGxhc3Qub25TdG9wXS5zb21lKGYgPT4gdHlwZW9mIGYgPT09IFwiZnVuY3Rpb25cIikpIHtcbiAgICAgICAgY2FsbGJhY2tzID0gcGFyYW1zLnBvcCgpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuICBwYXJhbXMucHVzaChjYWxsYmFja3MpO1xuXG4gIGxldCBzdWJzY3JpcHRpb247XG5cbiAgLy8gQ29sbGVjdCBjYWxsYmFja3MgdG8gY2FsbCB3aGVuIHN1YnNjcmlwdGlvbiBpcyByZWFkeSBvciBoYXMgZXJyb3JlZC5cbiAgbGV0IHJlYWR5Q2FsbGJhY2tzID0gW107XG4gIGxldCBlcnJvckNhbGxiYWNrcyA9IFtdO1xuICBpZiAoY2FsbGJhY2tzLm9uUmVhZHkpIHtcbiAgICByZWFkeUNhbGxiYWNrcy5wdXNoKGNhbGxiYWNrcy5vblJlYWR5KTtcbiAgfVxuICBpZiAoY2FsbGJhY2tzLm9uRXJyb3IpIHtcbiAgICBlcnJvckNhbGxiYWNrcy5wdXNoKGNhbGxiYWNrcy5vbkVycm9yKTtcbiAgfVxuICBjYWxsYmFja3Mub25SZWFkeSA9ICgpID0+IHtcbiAgICByZWFkeUNhbGxiYWNrcy5mb3JFYWNoKGZuID0+IGZuKHN1YnNjcmlwdGlvbikpO1xuICAgIHJlYWR5Q2FsbGJhY2tzLmxlbmd0aCA9IDA7XG4gIH07XG4gIGNhbGxiYWNrcy5vbkVycm9yID0gKGVycikgPT4ge1xuICAgIGVycm9yQ2FsbGJhY2tzLmZvckVhY2goZm4gPT4gZm4oZXJyKSk7XG4gICAgZXJyb3JDYWxsYmFja3MubGVuZ3RoID0gMDtcbiAgfTtcblxuICBzdWJzY3JpcHRpb24gPSBfc3Vic2NyaWJlLmFwcGx5KHRoaXMsIHBhcmFtcyk7XG4gIGlmIChjdXJyZW50X2NvbXBvbmVudCkge1xuICAgIGN1cnJlbnRfY29tcG9uZW50LiQkLm9uX2Rlc3Ryb3kucHVzaChzdWJzY3JpcHRpb24uc3RvcC5iaW5kKHN1YnNjcmlwdGlvbikpO1xuICB9XG4gIHN1YnNjcmlwdGlvbi50aGVuID0gKGZuLCBlcnIpID0+IHtcbiAgICBpZiAoc3Vic2NyaXB0aW9uLnJlYWR5KCkpIHtcbiAgICAgIGZuKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJlYWR5Q2FsbGJhY2tzLnB1c2goZm4pO1xuICAgICAgZXJyICYmIGVycm9yQ2FsbGJhY2tzLnB1c2goZXJyKTtcbiAgICB9XG4gIH07XG4gIHJldHVybiBzdWJzY3JpcHRpb247XG59O1xuIiwiLyoqXG4gKiBUaGlzIGZ1bmN0aW9uIHdyYXBzIGEgTWV0ZW9yIFNlc3Npb24gdmFyaWFibGUgYXMgYSBTdmVsdGUgc3RvcmUuXG4gKi9cblxuaW1wb3J0IHsgU2Vzc2lvbiB9IGZyb20gXCJtZXRlb3Ivc2Vzc2lvblwiO1xuaW1wb3J0IHsgRUpTT04gfSBmcm9tIFwibWV0ZW9yL2Vqc29uXCI7XG5cbmxldCBuZXh0SWQgPSAxO1xuXG5jb25zdCBwYXJzZSA9IHNlcmlhbGl6ZWQgPT5cbiAgKHNlcmlhbGl6ZWQgIT09IHVuZGVmaW5lZCAmJiBzZXJpYWxpemVkICE9PSAndW5kZWZpbmVkJylcbiAgICA/IEVKU09OLnBhcnNlKHNlcmlhbGl6ZWQpXG4gICAgOiB1bmRlZmluZWQ7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHVzZVNlc3Npb24oa2V5LCBkZWZhdWx0VmFsdWUpIHtcbiAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPiAxKSB7XG4gICAgU2Vzc2lvbi5zZXREZWZhdWx0KGtleSwgZGVmYXVsdFZhbHVlKTtcbiAgfVxuXG4gIHJldHVybiB7XG4gICAgc3Vic2NyaWJlKHNldCkge1xuICAgICAgU2Vzc2lvbi5fZW5zdXJlS2V5KGtleSk7XG4gICAgICBjb25zdCBkZXAgPSBTZXNzaW9uLmtleURlcHNba2V5XTtcbiAgICAgIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoU2Vzc2lvbi5rZXlzLCBrZXkpKSB7XG4gICAgICAgIHNldChwYXJzZShTZXNzaW9uLmtleXNba2V5XSkpO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBpZCA9IGBzdmVsdGUtc2Vzc2lvbi0ke25leHRJZCsrfWA7XG4gICAgICBkZXAuX2RlcGVuZGVudHNCeUlkW2lkXSA9IHtcbiAgICAgICAgX2lkOiBpZCxcbiAgICAgICAgaW52YWxpZGF0ZTogKCkgPT4ge1xuICAgICAgICAgIHNldChwYXJzZShTZXNzaW9uLmtleXNba2V5XSkpO1xuICAgICAgICB9LFxuICAgICAgfTtcblxuICAgICAgcmV0dXJuICgpID0+IHtcbiAgICAgICAgZGVsZXRlIGRlcC5fZGVwZW5kZW50c0J5SWRbaWRdO1xuICAgICAgfTtcbiAgICB9LFxuICAgIHNldCh2YWx1ZSkge1xuICAgICAgU2Vzc2lvbi5zZXQoa2V5LCB2YWx1ZSk7XG4gICAgfSxcbiAgfTtcbn07XG4iLCIvKipcbiAqIFRoaXMgZnVuY3Rpb24gd3JhcHMgYSByZWFjdGl2ZSBNZXRlb3IgY29tcHV0YXRpb24gYXMgYSBTdmVsdGUgc3RvcmUuXG4gKi9cblxuY29uc3Qgbm9ucmVhY3RpdmUgPSBUcmFja2VyLm5vbnJlYWN0aXZlO1xuY29uc3QgYXV0b3J1biA9IFRyYWNrZXIuYXV0b3J1bjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gdXNlVHJhY2tlcihyZWFjdGl2ZUZuKSB7XG4gIHJldHVybiB7XG4gICAgc3Vic2NyaWJlKHNldCkge1xuICAgICAgcmV0dXJuIG5vbnJlYWN0aXZlKCgpID0+IHtcbiAgICAgICAgY29uc3QgY29tcHV0YXRpb24gPSBhdXRvcnVuKCgpID0+IHNldChyZWFjdGl2ZUZuKCkpKTtcbiAgICAgICAgcmV0dXJuIGNvbXB1dGF0aW9uLnN0b3AuYmluZChjb21wdXRhdGlvbik7XG4gICAgICB9KTtcbiAgICB9LFxuICB9O1xufTtcbiJdfQ==
