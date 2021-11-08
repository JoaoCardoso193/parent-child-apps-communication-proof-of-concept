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
var meteorInstall = Package['modules-runtime'].meteorInstall;

/* Package-scope variables */
var meteorBabelHelpers;

var require = meteorInstall({"node_modules":{"meteor":{"modules":{"client.js":function module(require,exports){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/modules/client.js                                                                                          //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
require("./install-packages.js");
require("./stubs.js");
require("./process.js");
require("./reify.js");

exports.addStyles = require("./css").addStyles;

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"legacy.js":function module(require){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/modules/legacy.js                                                                                          //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
// The meteor-babel/plugins/sanitize-for-in-objects plugin generates code
// that uses meteorBabelHelpers.sanitizeForInObject, but only when
// compiling code for the web.browser.legacy bundle. See #10595.
meteorBabelHelpers = require("meteor-babel-helpers");

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"css.js":function module(require,exports){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/modules/css.js                                                                                             //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
var doc = document;
var head = doc.getElementsByTagName("head").item(0);

exports.addStyles = function (css) {
  var style = doc.createElement("style");

  style.setAttribute("type", "text/css");

  // https://msdn.microsoft.com/en-us/library/ms535871(v=vs.85).aspx
  var internetExplorerSheetObject =
    style.sheet || // Edge/IE11.
    style.styleSheet; // Older IEs.

  if (internetExplorerSheetObject) {
    internetExplorerSheetObject.cssText = css;
  } else {
    style.appendChild(doc.createTextNode(css));
  }

  return head.appendChild(style);
};

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"install-packages.js":function module(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/modules/install-packages.js                                                                                //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
function install(name, mainModule) {
  var meteorDir = {};

  // Given a package name <name>, install a stub module in the
  // /node_modules/meteor directory called <name>.js, so that
  // require.resolve("meteor/<name>") will always return
  // /node_modules/meteor/<name>.js instead of something like
  // /node_modules/meteor/<name>/index.js, in the rare but possible event
  // that the package contains a file called index.js (#6590).

  if (typeof mainModule === "string") {
    // Set up an alias from /node_modules/meteor/<package>.js to the main
    // module, e.g. meteor/<package>/index.js.
    meteorDir[name + ".js"] = mainModule;
  } else {
    // back compat with old Meteor packages
    meteorDir[name + ".js"] = function (r, e, module) {
      module.exports = Package[name];
    };
  }

  meteorInstall({
    node_modules: {
      meteor: meteorDir
    }
  });
}

// This file will be modified during computeJsOutputFilesMap to include
// install(<name>) calls for every Meteor package.

install("meteor");
install("meteor-base");
install("mobile-experience");
install("modules-runtime");
install("modules-runtime-hot");
install("modules", "meteor/modules/client.js");
install("modern-browsers");
install("babel-compiler");
install("hot-module-replacement");
install("react-fast-refresh");
install("ecmascript");
install("ecmascript-runtime");
install("babel-runtime", "meteor/babel-runtime/babel-runtime.js");
install("promise", "meteor/promise/client.js");
install("fetch", "meteor/fetch/legacy.js");
install("dynamic-import", "meteor/dynamic-import/client.js");
install("es5-shim", "meteor/es5-shim/client.js");
install("ecmascript-runtime-client", "meteor/ecmascript-runtime-client/legacy.js");
install("base64", "meteor/base64/base64.js");
install("ejson", "meteor/ejson/ejson.js");
install("diff-sequence", "meteor/diff-sequence/diff.js");
install("geojson-utils", "meteor/geojson-utils/main.js");
install("id-map", "meteor/id-map/id-map.js");
install("random", "meteor/random/main_client.js");
install("mongo-id", "meteor/mongo-id/id.js");
install("ordered-dict", "meteor/ordered-dict/ordered_dict.js");
install("tracker");
install("minimongo", "meteor/minimongo/minimongo_client.js");
install("check", "meteor/check/match.js");
install("retry", "meteor/retry/retry.js");
install("callback-hook", "meteor/callback-hook/hook.js");
install("ddp-common");
install("reload", "meteor/reload/reload.js");
install("socket-stream-client", "meteor/socket-stream-client/browser.js");
install("ddp-client", "meteor/ddp-client/client/client.js");
install("ddp");
install("ddp-server");
install("allow-deny");
install("mongo-dev-server");
install("insecure");
install("mongo");
install("reactive-var");
install("minifier-css");
install("standard-minifier-css");
install("standard-minifier-js");
install("typescript");
install("shell-server");
install("autopublish");
install("static-html");
install("zodern:melte-compiler", "meteor/zodern:melte-compiler/hmr-runtime.js");
install("zodern:melte");
install("svelte:compiler");
install("rdb:svelte-meteor-data", "meteor/rdb:svelte-meteor-data/index.js");
install("webapp", "meteor/webapp/webapp_client.js");
install("hot-code-push");
install("launch-screen");
install("autoupdate", "meteor/autoupdate/autoupdate_client.js");

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"process.js":function module(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/modules/process.js                                                                                         //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
if (! global.process) {
  try {
    // The application can run `npm install process` to provide its own
    // process stub; otherwise this module will provide a partial stub.
    global.process = require("process");
  } catch (missing) {
    global.process = {};
  }
}

var proc = global.process;

if (Meteor.isServer) {
  // Make require("process") work on the server in all versions of Node.
  meteorInstall({
    node_modules: {
      "process.js": function (r, e, module) {
        module.exports = proc;
      }
    }
  });
} else {
  proc.platform = "browser";
  proc.nextTick = proc.nextTick || Meteor._setImmediate;
}

if (typeof proc.env !== "object") {
  proc.env = {};
}

var hasOwn = Object.prototype.hasOwnProperty;
for (var key in meteorEnv) {
  if (hasOwn.call(meteorEnv, key)) {
    proc.env[key] = meteorEnv[key];
  }
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"reify.js":function module(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/modules/reify.js                                                                                           //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
require("reify/lib/runtime").enable(
  module.constructor.prototype
);

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"stubs.js":function module(require){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/modules/stubs.js                                                                                           //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
var haveStubs = false;
try {
  require.resolve("meteor-node-stubs");
  haveStubs = true;
} catch (noStubs) {}

if (haveStubs) {
  // When meteor-node-stubs is installed in the application's root
  // node_modules directory, requiring it here installs aliases for stubs
  // for all Node built-in modules, such as fs, util, and http.
  require("meteor-node-stubs");
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"node_modules":{"reify":{"lib":{"runtime":{"index.js":function module(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// node_modules/meteor/modules/node_modules/reify/lib/runtime/index.js                                                 //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
"use strict";

// This module should be compatible with PhantomJS v1, just like the other files
// in reify/lib/runtime. Node 4+ features like const/let and arrow functions are
// not acceptable here, and importing any npm packages should be contemplated
// with extreme skepticism.

var utils = require("./utils.js");
var Entry = require("./entry.js");

// The exports.enable method can be used to enable the Reify runtime for
// specific module objects, or for Module.prototype (where implemented),
// to make the runtime available throughout the entire module system.
exports.enable = function (mod) {
  if (mod.link !== moduleLink) {
    mod.link = moduleLink;
    mod["export"] = moduleExport;
    mod.exportDefault = moduleExportDefault;
    mod.exportAs = moduleExportAs;
    mod.runSetters = runSetters;

    // Legacy shorthand for mod.exportAs("*").
    mod.makeNsSetter = moduleMakeNsSetter;

    return true;
  }

  return false;
};

// Calling module.link(id, setters) resolves the given ID using
// module.resolve(id), which should return a canonical absolute module
// identifier string (like require.resolve); then creates an Entry object
// for the child module and evaluates its code (if this is the first time
// it has been imported) by calling module.require(id). Finally, the
// provided setter functions will be called with values exported by the
// module, possibly multiple times when/if those exported values change.
// The module.link name is intended to evoke the "liveness" of the
// exported bindings, since we are subscribing to all future exports of
// the child module, not just taking a snapshot of its current exports.
function moduleLink(id, setters, key) {
  utils.setESModule(this.exports);
  Entry.getOrCreate(this.id, this);

  var absChildId = this.resolve(id);
  var childEntry = Entry.getOrCreate(absChildId);

  if (utils.isObject(setters)) {
    childEntry.addSetters(this, setters, key);
  }

  var exports = this.require(absChildId);

  if (childEntry.module === null) {
    childEntry.module = {
      id: absChildId,
      exports: exports
    };
  }

  childEntry.runSetters();
}

// Register getter functions for local variables in the scope of an export
// statement. Pass true as the second argument to indicate that the getter
// functions always return the same values.
function moduleExport(getters, constant) {
  utils.setESModule(this.exports);
  var entry = Entry.getOrCreate(this.id, this);
  entry.addGetters(getters, constant);
  if (this.loaded) {
    // If the module has already been evaluated, then we need to trigger
    // another round of entry.runSetters calls, which begins by calling
    // entry.runModuleGetters(module).
    entry.runSetters();
  }
}

// Register a getter function that always returns the given value.
function moduleExportDefault(value) {
  return this["export"]({
    "default": function () {
      return value;
    }
  }, true);
}

// Returns a function suitable for passing as a setter callback to
// module.link. If name is an identifier, calling the function will set
// the export of that name to the given value. If the name is "*", all
// properties of the value object will be exported by name, except for
// "default" (use "*+" instead of "*" to include it). Why the "default"
// property is skipped: https://github.com/tc39/ecma262/issues/948
function moduleExportAs(name) {
  var entry = this;
  var includeDefault = name === "*+";
  return function (value) {
    if (name === "*" || name === "*+") {
      Object.keys(value).forEach(function (key) {
        if (includeDefault || key !== "default") {
          utils.copyKey(key, entry.exports, value);
        }
      });
    } else {
      entry.exports[name] = value;
    }
  };
}

// Platform-specific code should find a way to call this method whenever
// the module system is about to return module.exports from require. This
// might happen more than once per module, in case of dependency cycles,
// so we want Module.prototype.runSetters to run each time.
function runSetters(valueToPassThrough) {
  Entry.getOrCreate(this.id, this).runSetters();

  // Assignments to exported local variables get wrapped with calls to
  // module.runSetters, so module.runSetters returns the
  // valueToPassThrough parameter to allow the value of the original
  // expression to pass through. For example,
  //
  //   export var a = 1;
  //   console.log(a += 3);
  //
  // becomes
  //
  //   module.export("a", () => a);
  //   var a = 1;
  //   console.log(module.runSetters(a += 3));
  //
  // This ensures module.runSetters runs immediately after the assignment,
  // and does not interfere with the larger computation.
  return valueToPassThrough;
}

// Legacy helper that returns a function that takes a namespace object and
// copies the properties of the namespace to module.exports, excluding any
// "default" property (unless includeDefault is true), which is useful for
// implementing `export * from "module"`.
//
// Instead of using this helper like so:
//
//   module.link(id, { "*": module.makeNsSetter() });
//
// non-legacy code should simply use a string-valued setter:
//
//   module.link(id, { "*": "*" });
//
// or, to include the "default" property:
//
//   module.link(id, { "*": "*+" });
//
// This helper may be removed in a future version of Reify.
function moduleMakeNsSetter(includeDefault) {
  return this.exportAs(includeDefault ? "*+" : "*");
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"utils.js":function module(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// node_modules/meteor/modules/node_modules/reify/lib/runtime/utils.js                                                 //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
"use strict";

// This module should be compatible with PhantomJS v1, just like the other files
// in reify/lib/runtime. Node 4+ features like const/let and arrow functions are
// not acceptable here, and importing any npm packages should be contemplated
// with extreme skepticism.

var useSetPrototypeOf = typeof Object.setPrototypeOf === "function";
var useSymbol = typeof Symbol === "function";

var esStrKey = "__esModule";
var esSymKey = useSymbol ? Symbol.for(esStrKey) : null;
var useToStringTag = useSymbol && typeof Symbol.toStringTag === "symbol";
var useGetOwnPropDesc =
  typeof Object.getOwnPropertyDescriptor === "function";
var hasOwn = Object.prototype.hasOwnProperty;

function copyKey(key, target, source) {
  if (useGetOwnPropDesc) {
    var desc = Object.getOwnPropertyDescriptor(source, key);
    desc.configurable = true; // Allow redefinition.
    Object.defineProperty(target, key, desc);
  } else {
    target[key] = source[key];
  }
}

exports.copyKey = copyKey;

// Returns obj[key] unless that property is defined by a getter function,
// in which case the getter function is returned.
exports.valueOrGetter = function (obj, key) {
  if (useGetOwnPropDesc && hasOwn.call(obj, key)) {
    var desc = Object.getOwnPropertyDescriptor(obj, key);
    if (typeof desc.get === "function") {
      return desc.get;
    }
  }

  return obj[key];
};

function getESModule(exported) {
  if (isObjectLike(exported)) {
    if (useSymbol && hasOwn.call(exported, esSymKey)) {
      return !! exported[esSymKey];
    }

    if (hasOwn.call(exported, esStrKey)) {
      return !! exported[esStrKey];
    }
  }

  return false;
}

exports.getESModule = getESModule;

function setESModule(exported) {
  if (isObjectLike(exported)) {
    if (useSymbol) {
      exported[esSymKey] = true;
    }

    if (! exported[esStrKey]) {
      // Other module runtime systems may set exported.__esModule such
      // that it can't be redefined, so we call Object.defineProperty only
      // when exported.__esModule is not already true.
      Object.defineProperty(exported, esStrKey, {
        configurable: true,
        enumerable: false,
        value: true,
        writable: false
      });
    }
  }
}

exports.setESModule = setESModule;

function isObject(value) {
  return typeof value === "object" && value !== null;
}

exports.isObject = isObject;

function isObjectLike(value) {
  var type = typeof value;
  return type === "function" || (type === "object" && value !== null);
}

exports.isObjectLike = isObjectLike;

function createNamespace() {
  var namespace = Object.create(null);

  if (useToStringTag) {
    Object.defineProperty(namespace, Symbol.toStringTag, {
      value: "Module",
      configurable: false,
      enumerable: false,
      writable: false
    });
  }

  setESModule(namespace);

  return namespace;
}

exports.createNamespace = createNamespace;

function setPrototypeOf(object, proto) {
  if (useSetPrototypeOf) {
    Object.setPrototypeOf(object, proto);
  } else {
    object.__proto__ = proto;
  }
  return object;
}

exports.setPrototypeOf = setPrototypeOf;

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"entry.js":function module(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// node_modules/meteor/modules/node_modules/reify/lib/runtime/entry.js                                                 //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
"use strict";

// This module should be compatible with PhantomJS v1, just like the other files
// in reify/lib/runtime. Node 4+ features like const/let and arrow functions are
// not acceptable here, and importing any npm packages should be contemplated
// with extreme skepticism.

var utils = require("./utils.js");

var GETTER_ERROR = {};
var NAN = {};
var UNDEFINED = {};
var hasOwn = Object.prototype.hasOwnProperty;
var keySalt = 0;

function Entry(id) {
  // The canonical absolute module ID of the module this Entry manages.
  this.id = id;
  // The Module object this Entry manages, unknown until module.export or
  // module.link is called for the first time.
  this.module = null;
  // Getters for local variables exported from the managed module.
  this.getters = Object.create(null);
  // Setters for assigning to local variables in parent modules.
  this.setters = Object.create(null);
  // The normalized namespace object that importers receive when they use
  // `import * as namespace from "..."` syntax.
  this.namespace = utils.createNamespace();
}

var Ep = utils.setPrototypeOf(Entry.prototype, null);
var entryMap = Object.create(null);

Entry.getOrCreate = function (id, mod) {
  var entry = hasOwn.call(entryMap, id)
    ? entryMap[id]
    : entryMap[id] = new Entry(id);

  if (utils.isObject(mod) &&
      mod.id === entry.id) {
    entry.module = mod;
  }

  return entry;
};

function safeKeys(obj) {
  var keys = Object.keys(obj);
  var esModuleIndex = keys.indexOf("__esModule");
  if (esModuleIndex >= 0) {
    keys.splice(esModuleIndex, 1);
  }
  return keys;
}

Ep.addGetters = function (getters, constant) {
  var names = safeKeys(getters);
  var nameCount = names.length;
  constant = !! constant;

  for (var i = 0; i < nameCount; ++i) {
    var name = names[i];
    var getter = getters[name];

    if (typeof getter === "function" &&
        // Should this throw if this.getters[name] exists?
        ! (name in this.getters)) {
      this.getters[name] = getter;
      getter.constant = constant;
      getter.runCount = 0;
    }
  }
};

Ep.addSetters = function (parent, setters, key) {
  var names = safeKeys(setters);
  var nameCount = names.length;

  if (! nameCount) {
    return;
  }

  // If no key is provided, make a unique key. Otherwise, make sure the key is
  // distinct from keys provided by other parent modules.
  key = key === void 0
    ? makeUniqueKey()
    : parent.id + ":" + key;

  var entry = this;

  for (var i = 0; i < nameCount; ++i) {
    var name = names[i];
    var setter = normalizeSetterValue(parent, setters[name]);

    if (typeof setter === "function") {
      setter.parent = parent;
      if (! (name in entry.setters)) {
        entry.setters[name] = Object.create(null);
      }
      entry.setters[name][key] = setter;
    }
  }

  entry.runSetters(names);
};

function normalizeSetterValue(module, setter) {
  if (typeof setter === "function") {
    return setter;
  }

  if (typeof setter === "string") {
    // If the value of the setter property is a string, the setter will
    // re-export the imported value using that string as the name of the
    // exported value. If the string is "*", all properties of the value
    // object will be re-exported as individual exports, except for the
    // "default" property (use "*+" instead of "*" to include it).
    return module.exportAs(setter);
  }

  if (Array.isArray(setter)) {
    switch (setter.length) {
    case 0: return null;
    case 1: return normalizeSetterValue(module, setter[0]);
    default:
      var setterFns = setter.map(function (elem) {
        return normalizeSetterValue(module, elem);
      });

      // Return a combined function that calls all of the nested setter
      // functions with the same value.
      return function (value) {
        setterFns.forEach(function (fn) {
          fn(value);
        });
      };
    }
  }

  return null;
}

Ep.runGetters = function (names) {
  // Before running getters, copy anything added to the exports object
  // over to the namespace. Values returned by getters take precedence
  // over these values, but we don't want to miss anything.
  syncExportsToNamespace(this, names);

  if (names === void 0 ||
      names.indexOf("*") >= 0) {
    names = Object.keys(this.getters);
  }

  var nameCount = names.length;

  for (var i = 0; i < nameCount; ++i) {
    var name = names[i];
    var value = runGetter(this, name);

    // If the getter is run without error, update both entry.namespace and
    // module.exports with the current value so that CommonJS require
    // calls remain consistent with module.watch.
    if (value !== GETTER_ERROR) {
      this.namespace[name] = value;
      this.module.exports[name] = value;
    }
  }
};

function syncExportsToNamespace(entry, names) {
  var setDefault = false;

  if (entry.module === null) return;
  var exports = entry.module.exports;

  if (! utils.getESModule(exports)) {
    // If the module entry is managing overrides module.exports, that
    // value should be exposed as the .default property of the namespace,
    // unless module.exports is marked as an ECMASCript module.
    entry.namespace.default = exports;
    setDefault = true;
  }

  if (! utils.isObjectLike(exports)) {
    return;
  }

  if (names === void 0 ||
      names.indexOf("*") >= 0) {
    names = Object.keys(exports);
  }

  names.forEach(function (key) {
    // Don't set any properties for which a getter function exists in
    // entry.getters, don't accidentally override entry.namespace.default,
    // and only copy own properties from entry.module.exports.
    if (! hasOwn.call(entry.getters, key) &&
        ! (setDefault && key === "default") &&
        hasOwn.call(exports, key)) {
      utils.copyKey(key, entry.namespace, exports);
    }
  });
}

// Called whenever module.exports might have changed, to trigger any
// setters associated with the newly exported values. The names parameter
// is optional; without it, all getters and setters will run.
Ep.runSetters = function (names) {
  // Make sure entry.namespace and module.exports are up to date before we
  // call getExportByName(entry, name).
  this.runGetters(names);

  // Lazily-initialized object mapping parent module identifiers to parent
  // module objects whose setters we might need to run.
  var parents;

  forEachSetter(this, names, function (setter, name, value) {
    if (parents === void 0) {
      parents = Object.create(null);
    }
    parents[setter.parent.id] = setter.parent;

    // The param order for setters is `value` then `name` because the `name`
    // param is only used by namespace exports.
    setter(value, name);
  });

  if (! parents) {
    return;
  }

  // If any of the setters updated the module.exports of a parent module,
  // or updated local variables that are exported by that parent module,
  // then we must re-run any setters registered by that parent module.
  var parentIDs = Object.keys(parents);
  var parentIDCount = parentIDs.length;

  for (var i = 0; i < parentIDCount; ++i) {
    // What happens if parents[parentIDs[id]] === module, or if
    // longer cycles exist in the parent chain? Thanks to our setter.last
    // bookkeeping above, the runSetters broadcast will only proceed
    // as far as there are any actual changes to report.
    var parent = parents[parentIDs[i]];
    var parentEntry = entryMap[parent.id];
    if (parentEntry) {
      parentEntry.runSetters();
    }
  }
};

function callSetterIfNecessary(setter, name, value, callback) {
  if (name === "__esModule") {
    // Ignore setters asking for module.exports.__esModule.
    return;
  }

  var shouldCall = false;

  if (setter.last === void 0) {
    setter.last = Object.create(null);
    // Always call the setter if it has never been called before.
    shouldCall = true;
  }

  function changed(name, value) {
    var valueToCompare = value;
    if (valueToCompare !== valueToCompare) {
      valueToCompare = NAN;
    } else if (valueToCompare === void 0) {
      valueToCompare = UNDEFINED;
    }

    if (setter.last[name] === valueToCompare) {
      return false;
    }

    setter.last[name] = valueToCompare;
    return true;
  }

  if (name === "*") {
    var keys = safeKeys(value);
    var keyCount = keys.length;
    for (var i = 0; i < keyCount; ++i) {
      var key = keys[i];
      // Evaluating value[key] is risky because the property might be
      // defined by a getter function that logs a deprecation warning (or
      // worse) when evaluated. For example, Node uses this trick to
      // display a deprecation warning whenever crypto.createCredentials
      // is accessed. Fortunately, when value[key] is defined by a getter
      // function, it's enough to check whether the getter function itself
      // has changed, since we are careful elsewhere to preserve getters
      // rather than prematurely evaluating them.
      if (changed(key, utils.valueOrGetter(value, key))) {
        shouldCall = true;
      }
    }
  } else if (changed(name, value)) {
    shouldCall = true;
  }

  if (shouldCall) {
    // Only invoke the callback if we have not called this setter
    // (with a value of this name) before, or the current value is
    // different from the last value we passed to this setter.
    return callback(setter, name, value);
  }
}

// Invoke the given callback once for every (setter, name, value) that needs to
// be called. Note that forEachSetter does not call any setters itself, only the
// given callback.
function forEachSetter(entry, names, callback) {
  var needToCheckNames = true;

  if (names === void 0) {
    names = Object.keys(entry.setters);
    needToCheckNames = false;
  }

  var nameCount = names.length;

  for (var i = 0; i < nameCount; ++i) {
    var name = names[i];

    if (needToCheckNames &&
        ! hasOwn.call(entry.setters, name)) {
      continue;
    }

    var setters = entry.setters[name];
    var keys = Object.keys(setters);
    var keyCount = keys.length;

    for (var j = 0; j < keyCount; ++j) {
      var key = keys[j];
      var value = getExportByName(entry, name);

      callSetterIfNecessary(setters[key], name, value, callback);

      var getter = entry.getters[name];
      if (typeof getter === "function" &&
          // Sometimes a getter function will throw because it's called
          // before the variable it's supposed to return has been
          // initialized, so we need to know that the getter function has
          // run to completion at least once.
          getter.runCount > 0 &&
          getter.constant) {
        // If we happen to know that this getter function has run
        // successfully, and will never return a different value, then we
        // can forget the corresponding setter, because we've already
        // reported that constant value. Note that we can't forget the
        // getter, because we need to remember the original value in case
        // anyone tampers with entry.module.exports[name].
        delete setters[key];
      }
    }
  }
}

function getExportByName(entry, name) {
  if (name === "*") {
    return entry.namespace;
  }

  if (hasOwn.call(entry.namespace, name)) {
    return entry.namespace[name];
  }

  if (entry.module === null) return;
  var exports = entry.module.exports;

  if (name === "default" &&
      ! (utils.getESModule(exports) &&
         "default" in exports)) {
    return exports;
  }

  if (exports == null) {
    return;
  }

  return exports[name];
}

function makeUniqueKey() {
  return Math.random()
    .toString(36)
    // Add an incrementing salt to help track key ordering and also
    // absolutely guarantee we never return the same key twice.
    .replace("0.", ++keySalt + "$");
}

function runGetter(entry, name) {
  var getter = entry.getters[name];
  try {
    var result = getter();
    ++getter.runCount;
    return result;
  } catch (e) {}
  return GETTER_ERROR;
}

module.exports = Entry;

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}}}},"meteor-babel-helpers":{"package.json":function module(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// node_modules/meteor/modules/node_modules/meteor-babel-helpers/package.json                                          //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
module.exports = {
  "name": "meteor-babel-helpers",
  "version": "0.0.3",
  "main": "index.js"
};

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"index.js":function module(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// node_modules/meteor/modules/node_modules/meteor-babel-helpers/index.js                                              //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
function canDefineNonEnumerableProperties() {
  var testObj = {};
  var testPropName = "t";

  try {
    Object.defineProperty(testObj, testPropName, {
      enumerable: false,
      value: testObj
    });

    for (var k in testObj) {
      if (k === testPropName) {
        return false;
      }
    }
  } catch (e) {
    return false;
  }

  return testObj[testPropName] === testObj;
}

function sanitizeEasy(value) {
  return value;
}

function sanitizeHard(obj) {
  if (Array.isArray(obj)) {
    var newObj = {};
    var keys = Object.keys(obj);
    var keyCount = keys.length;
    for (var i = 0; i < keyCount; ++i) {
      var key = keys[i];
      newObj[key] = obj[key];
    }
    return newObj;
  }

  return obj;
}

meteorBabelHelpers = module.exports = {
  // Meteor-specific runtime helper for wrapping the object of for-in
  // loops, so that inherited Array methods defined by es5-shim can be
  // ignored in browsers where they cannot be defined as non-enumerable.
  sanitizeForInObject: canDefineNonEnumerableProperties()
    ? sanitizeEasy
    : sanitizeHard,

  // Exposed so that we can test sanitizeForInObject in environments that
  // support defining non-enumerable properties.
  _sanitizeForInObjectHard: sanitizeHard
};

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}}}}}}},{
  "extensions": [
    ".js",
    ".json"
  ]
});
meteorInstall({"node_modules":{"@babel":{"runtime":{"helpers":{"assertThisInitialized.js":function module(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// node_modules/@babel/runtime/helpers/assertThisInitialized.js                                                        //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

module.exports = _assertThisInitialized;
module.exports["default"] = module.exports, module.exports.__esModule = true;
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"inheritsLoose.js":function module(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// node_modules/@babel/runtime/helpers/inheritsLoose.js                                                                //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
var setPrototypeOf = require("./setPrototypeOf.js");

function _inheritsLoose(subClass, superClass) {
  subClass.prototype = Object.create(superClass.prototype);
  subClass.prototype.constructor = subClass;
  setPrototypeOf(subClass, superClass);
}

module.exports = _inheritsLoose;
module.exports["default"] = module.exports, module.exports.__esModule = true;
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"setPrototypeOf.js":function module(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// node_modules/@babel/runtime/helpers/setPrototypeOf.js                                                               //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
function _setPrototypeOf(o, p) {
  module.exports = _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  module.exports["default"] = module.exports, module.exports.__esModule = true;
  return _setPrototypeOf(o, p);
}

module.exports = _setPrototypeOf;
module.exports["default"] = module.exports, module.exports.__esModule = true;
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"slicedToArray.js":function module(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// node_modules/@babel/runtime/helpers/slicedToArray.js                                                                //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
var arrayWithHoles = require("./arrayWithHoles.js");

var iterableToArrayLimit = require("./iterableToArrayLimit.js");

var unsupportedIterableToArray = require("./unsupportedIterableToArray.js");

var nonIterableRest = require("./nonIterableRest.js");

function _slicedToArray(arr, i) {
  return arrayWithHoles(arr) || iterableToArrayLimit(arr, i) || unsupportedIterableToArray(arr, i) || nonIterableRest();
}

module.exports = _slicedToArray;
module.exports["default"] = module.exports, module.exports.__esModule = true;
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"arrayWithHoles.js":function module(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// node_modules/@babel/runtime/helpers/arrayWithHoles.js                                                               //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

module.exports = _arrayWithHoles;
module.exports["default"] = module.exports, module.exports.__esModule = true;
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"iterableToArrayLimit.js":function module(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// node_modules/@babel/runtime/helpers/iterableToArrayLimit.js                                                         //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
function _iterableToArrayLimit(arr, i) {
  var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];

  if (_i == null) return;
  var _arr = [];
  var _n = true;
  var _d = false;

  var _s, _e;

  try {
    for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

module.exports = _iterableToArrayLimit;
module.exports["default"] = module.exports, module.exports.__esModule = true;
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"unsupportedIterableToArray.js":function module(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// node_modules/@babel/runtime/helpers/unsupportedIterableToArray.js                                                   //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
var arrayLikeToArray = require("./arrayLikeToArray.js");

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return arrayLikeToArray(o, minLen);
}

module.exports = _unsupportedIterableToArray;
module.exports["default"] = module.exports, module.exports.__esModule = true;
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"arrayLikeToArray.js":function module(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// node_modules/@babel/runtime/helpers/arrayLikeToArray.js                                                             //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }

  return arr2;
}

module.exports = _arrayLikeToArray;
module.exports["default"] = module.exports, module.exports.__esModule = true;
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"nonIterableRest.js":function module(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// node_modules/@babel/runtime/helpers/nonIterableRest.js                                                              //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

module.exports = _nonIterableRest;
module.exports["default"] = module.exports, module.exports.__esModule = true;
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"typeof.js":function module(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// node_modules/@babel/runtime/helpers/typeof.js                                                                       //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
function _typeof(obj) {
  "@babel/helpers - typeof";

  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    module.exports = _typeof = function _typeof(obj) {
      return typeof obj;
    };

    module.exports["default"] = module.exports, module.exports.__esModule = true;
  } else {
    module.exports = _typeof = function _typeof(obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };

    module.exports["default"] = module.exports, module.exports.__esModule = true;
  }

  return _typeof(obj);
}

module.exports = _typeof;
module.exports["default"] = module.exports, module.exports.__esModule = true;
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"createForOfIteratorHelperLoose.js":function module(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// node_modules/@babel/runtime/helpers/createForOfIteratorHelperLoose.js                                               //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
var unsupportedIterableToArray = require("./unsupportedIterableToArray.js");

function _createForOfIteratorHelperLoose(o, allowArrayLike) {
  var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"];
  if (it) return (it = it.call(o)).next.bind(it);

  if (Array.isArray(o) || (it = unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
    if (it) o = it;
    var i = 0;
    return function () {
      if (i >= o.length) return {
        done: true
      };
      return {
        done: false,
        value: o[i++]
      };
    };
  }

  throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

module.exports = _createForOfIteratorHelperLoose;
module.exports["default"] = module.exports, module.exports.__esModule = true;
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"toConsumableArray.js":function module(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// node_modules/@babel/runtime/helpers/toConsumableArray.js                                                            //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
var arrayWithoutHoles = require("./arrayWithoutHoles.js");

var iterableToArray = require("./iterableToArray.js");

var unsupportedIterableToArray = require("./unsupportedIterableToArray.js");

var nonIterableSpread = require("./nonIterableSpread.js");

function _toConsumableArray(arr) {
  return arrayWithoutHoles(arr) || iterableToArray(arr) || unsupportedIterableToArray(arr) || nonIterableSpread();
}

module.exports = _toConsumableArray;
module.exports["default"] = module.exports, module.exports.__esModule = true;
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"arrayWithoutHoles.js":function module(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// node_modules/@babel/runtime/helpers/arrayWithoutHoles.js                                                            //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
var arrayLikeToArray = require("./arrayLikeToArray.js");

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return arrayLikeToArray(arr);
}

module.exports = _arrayWithoutHoles;
module.exports["default"] = module.exports, module.exports.__esModule = true;
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"iterableToArray.js":function module(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// node_modules/@babel/runtime/helpers/iterableToArray.js                                                              //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}

module.exports = _iterableToArray;
module.exports["default"] = module.exports, module.exports.__esModule = true;
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"nonIterableSpread.js":function module(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// node_modules/@babel/runtime/helpers/nonIterableSpread.js                                                            //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

module.exports = _nonIterableSpread;
module.exports["default"] = module.exports, module.exports.__esModule = true;
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"objectSpread2.js":function module(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// node_modules/@babel/runtime/helpers/objectSpread2.js                                                                //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
var defineProperty = require("./defineProperty.js");

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);

    if (enumerableOnly) {
      symbols = symbols.filter(function (sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      });
    }

    keys.push.apply(keys, symbols);
  }

  return keys;
}

function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};

    if (i % 2) {
      ownKeys(Object(source), true).forEach(function (key) {
        defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }

  return target;
}

module.exports = _objectSpread2;
module.exports["default"] = module.exports, module.exports.__esModule = true;
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"defineProperty.js":function module(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// node_modules/@babel/runtime/helpers/defineProperty.js                                                               //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

module.exports = _defineProperty;
module.exports["default"] = module.exports, module.exports.__esModule = true;
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"package.json":function module(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// node_modules/@babel/runtime/package.json                                                                            //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
module.exports = {
  "author": {
    "name": "The Babel Team",
    "url": "https://babel.dev/team"
  },
  "bugs": {
    "url": "https://github.com/babel/babel/issues"
  },
  "bundleDependencies": false,
  "dependencies": {
    "regenerator-runtime": "^0.13.4"
  },
  "deprecated": false,
  "description": "babel's modular runtime helpers",
  "engines": {
    "node": ">=6.9.0"
  },
  "exports": {
    "./helpers/jsx": [
      {
        "node": "./helpers/jsx.js",
        "import": "./helpers/esm/jsx.js",
        "default": "./helpers/jsx.js"
      },
      "./helpers/jsx.js"
    ],
    "./helpers/esm/jsx": "./helpers/esm/jsx.js",
    "./helpers/objectSpread2": [
      {
        "node": "./helpers/objectSpread2.js",
        "import": "./helpers/esm/objectSpread2.js",
        "default": "./helpers/objectSpread2.js"
      },
      "./helpers/objectSpread2.js"
    ],
    "./helpers/esm/objectSpread2": "./helpers/esm/objectSpread2.js",
    "./helpers/typeof": [
      {
        "node": "./helpers/typeof.js",
        "import": "./helpers/esm/typeof.js",
        "default": "./helpers/typeof.js"
      },
      "./helpers/typeof.js"
    ],
    "./helpers/esm/typeof": "./helpers/esm/typeof.js",
    "./helpers/wrapRegExp": [
      {
        "node": "./helpers/wrapRegExp.js",
        "import": "./helpers/esm/wrapRegExp.js",
        "default": "./helpers/wrapRegExp.js"
      },
      "./helpers/wrapRegExp.js"
    ],
    "./helpers/esm/wrapRegExp": "./helpers/esm/wrapRegExp.js",
    "./helpers/asyncIterator": [
      {
        "node": "./helpers/asyncIterator.js",
        "import": "./helpers/esm/asyncIterator.js",
        "default": "./helpers/asyncIterator.js"
      },
      "./helpers/asyncIterator.js"
    ],
    "./helpers/esm/asyncIterator": "./helpers/esm/asyncIterator.js",
    "./helpers/AwaitValue": [
      {
        "node": "./helpers/AwaitValue.js",
        "import": "./helpers/esm/AwaitValue.js",
        "default": "./helpers/AwaitValue.js"
      },
      "./helpers/AwaitValue.js"
    ],
    "./helpers/esm/AwaitValue": "./helpers/esm/AwaitValue.js",
    "./helpers/AsyncGenerator": [
      {
        "node": "./helpers/AsyncGenerator.js",
        "import": "./helpers/esm/AsyncGenerator.js",
        "default": "./helpers/AsyncGenerator.js"
      },
      "./helpers/AsyncGenerator.js"
    ],
    "./helpers/esm/AsyncGenerator": "./helpers/esm/AsyncGenerator.js",
    "./helpers/wrapAsyncGenerator": [
      {
        "node": "./helpers/wrapAsyncGenerator.js",
        "import": "./helpers/esm/wrapAsyncGenerator.js",
        "default": "./helpers/wrapAsyncGenerator.js"
      },
      "./helpers/wrapAsyncGenerator.js"
    ],
    "./helpers/esm/wrapAsyncGenerator": "./helpers/esm/wrapAsyncGenerator.js",
    "./helpers/awaitAsyncGenerator": [
      {
        "node": "./helpers/awaitAsyncGenerator.js",
        "import": "./helpers/esm/awaitAsyncGenerator.js",
        "default": "./helpers/awaitAsyncGenerator.js"
      },
      "./helpers/awaitAsyncGenerator.js"
    ],
    "./helpers/esm/awaitAsyncGenerator": "./helpers/esm/awaitAsyncGenerator.js",
    "./helpers/asyncGeneratorDelegate": [
      {
        "node": "./helpers/asyncGeneratorDelegate.js",
        "import": "./helpers/esm/asyncGeneratorDelegate.js",
        "default": "./helpers/asyncGeneratorDelegate.js"
      },
      "./helpers/asyncGeneratorDelegate.js"
    ],
    "./helpers/esm/asyncGeneratorDelegate": "./helpers/esm/asyncGeneratorDelegate.js",
    "./helpers/asyncToGenerator": [
      {
        "node": "./helpers/asyncToGenerator.js",
        "import": "./helpers/esm/asyncToGenerator.js",
        "default": "./helpers/asyncToGenerator.js"
      },
      "./helpers/asyncToGenerator.js"
    ],
    "./helpers/esm/asyncToGenerator": "./helpers/esm/asyncToGenerator.js",
    "./helpers/classCallCheck": [
      {
        "node": "./helpers/classCallCheck.js",
        "import": "./helpers/esm/classCallCheck.js",
        "default": "./helpers/classCallCheck.js"
      },
      "./helpers/classCallCheck.js"
    ],
    "./helpers/esm/classCallCheck": "./helpers/esm/classCallCheck.js",
    "./helpers/createClass": [
      {
        "node": "./helpers/createClass.js",
        "import": "./helpers/esm/createClass.js",
        "default": "./helpers/createClass.js"
      },
      "./helpers/createClass.js"
    ],
    "./helpers/esm/createClass": "./helpers/esm/createClass.js",
    "./helpers/defineEnumerableProperties": [
      {
        "node": "./helpers/defineEnumerableProperties.js",
        "import": "./helpers/esm/defineEnumerableProperties.js",
        "default": "./helpers/defineEnumerableProperties.js"
      },
      "./helpers/defineEnumerableProperties.js"
    ],
    "./helpers/esm/defineEnumerableProperties": "./helpers/esm/defineEnumerableProperties.js",
    "./helpers/defaults": [
      {
        "node": "./helpers/defaults.js",
        "import": "./helpers/esm/defaults.js",
        "default": "./helpers/defaults.js"
      },
      "./helpers/defaults.js"
    ],
    "./helpers/esm/defaults": "./helpers/esm/defaults.js",
    "./helpers/defineProperty": [
      {
        "node": "./helpers/defineProperty.js",
        "import": "./helpers/esm/defineProperty.js",
        "default": "./helpers/defineProperty.js"
      },
      "./helpers/defineProperty.js"
    ],
    "./helpers/esm/defineProperty": "./helpers/esm/defineProperty.js",
    "./helpers/extends": [
      {
        "node": "./helpers/extends.js",
        "import": "./helpers/esm/extends.js",
        "default": "./helpers/extends.js"
      },
      "./helpers/extends.js"
    ],
    "./helpers/esm/extends": "./helpers/esm/extends.js",
    "./helpers/objectSpread": [
      {
        "node": "./helpers/objectSpread.js",
        "import": "./helpers/esm/objectSpread.js",
        "default": "./helpers/objectSpread.js"
      },
      "./helpers/objectSpread.js"
    ],
    "./helpers/esm/objectSpread": "./helpers/esm/objectSpread.js",
    "./helpers/inherits": [
      {
        "node": "./helpers/inherits.js",
        "import": "./helpers/esm/inherits.js",
        "default": "./helpers/inherits.js"
      },
      "./helpers/inherits.js"
    ],
    "./helpers/esm/inherits": "./helpers/esm/inherits.js",
    "./helpers/inheritsLoose": [
      {
        "node": "./helpers/inheritsLoose.js",
        "import": "./helpers/esm/inheritsLoose.js",
        "default": "./helpers/inheritsLoose.js"
      },
      "./helpers/inheritsLoose.js"
    ],
    "./helpers/esm/inheritsLoose": "./helpers/esm/inheritsLoose.js",
    "./helpers/getPrototypeOf": [
      {
        "node": "./helpers/getPrototypeOf.js",
        "import": "./helpers/esm/getPrototypeOf.js",
        "default": "./helpers/getPrototypeOf.js"
      },
      "./helpers/getPrototypeOf.js"
    ],
    "./helpers/esm/getPrototypeOf": "./helpers/esm/getPrototypeOf.js",
    "./helpers/setPrototypeOf": [
      {
        "node": "./helpers/setPrototypeOf.js",
        "import": "./helpers/esm/setPrototypeOf.js",
        "default": "./helpers/setPrototypeOf.js"
      },
      "./helpers/setPrototypeOf.js"
    ],
    "./helpers/esm/setPrototypeOf": "./helpers/esm/setPrototypeOf.js",
    "./helpers/isNativeReflectConstruct": [
      {
        "node": "./helpers/isNativeReflectConstruct.js",
        "import": "./helpers/esm/isNativeReflectConstruct.js",
        "default": "./helpers/isNativeReflectConstruct.js"
      },
      "./helpers/isNativeReflectConstruct.js"
    ],
    "./helpers/esm/isNativeReflectConstruct": "./helpers/esm/isNativeReflectConstruct.js",
    "./helpers/construct": [
      {
        "node": "./helpers/construct.js",
        "import": "./helpers/esm/construct.js",
        "default": "./helpers/construct.js"
      },
      "./helpers/construct.js"
    ],
    "./helpers/esm/construct": "./helpers/esm/construct.js",
    "./helpers/isNativeFunction": [
      {
        "node": "./helpers/isNativeFunction.js",
        "import": "./helpers/esm/isNativeFunction.js",
        "default": "./helpers/isNativeFunction.js"
      },
      "./helpers/isNativeFunction.js"
    ],
    "./helpers/esm/isNativeFunction": "./helpers/esm/isNativeFunction.js",
    "./helpers/wrapNativeSuper": [
      {
        "node": "./helpers/wrapNativeSuper.js",
        "import": "./helpers/esm/wrapNativeSuper.js",
        "default": "./helpers/wrapNativeSuper.js"
      },
      "./helpers/wrapNativeSuper.js"
    ],
    "./helpers/esm/wrapNativeSuper": "./helpers/esm/wrapNativeSuper.js",
    "./helpers/instanceof": [
      {
        "node": "./helpers/instanceof.js",
        "import": "./helpers/esm/instanceof.js",
        "default": "./helpers/instanceof.js"
      },
      "./helpers/instanceof.js"
    ],
    "./helpers/esm/instanceof": "./helpers/esm/instanceof.js",
    "./helpers/interopRequireDefault": [
      {
        "node": "./helpers/interopRequireDefault.js",
        "import": "./helpers/esm/interopRequireDefault.js",
        "default": "./helpers/interopRequireDefault.js"
      },
      "./helpers/interopRequireDefault.js"
    ],
    "./helpers/esm/interopRequireDefault": "./helpers/esm/interopRequireDefault.js",
    "./helpers/interopRequireWildcard": [
      {
        "node": "./helpers/interopRequireWildcard.js",
        "import": "./helpers/esm/interopRequireWildcard.js",
        "default": "./helpers/interopRequireWildcard.js"
      },
      "./helpers/interopRequireWildcard.js"
    ],
    "./helpers/esm/interopRequireWildcard": "./helpers/esm/interopRequireWildcard.js",
    "./helpers/newArrowCheck": [
      {
        "node": "./helpers/newArrowCheck.js",
        "import": "./helpers/esm/newArrowCheck.js",
        "default": "./helpers/newArrowCheck.js"
      },
      "./helpers/newArrowCheck.js"
    ],
    "./helpers/esm/newArrowCheck": "./helpers/esm/newArrowCheck.js",
    "./helpers/objectDestructuringEmpty": [
      {
        "node": "./helpers/objectDestructuringEmpty.js",
        "import": "./helpers/esm/objectDestructuringEmpty.js",
        "default": "./helpers/objectDestructuringEmpty.js"
      },
      "./helpers/objectDestructuringEmpty.js"
    ],
    "./helpers/esm/objectDestructuringEmpty": "./helpers/esm/objectDestructuringEmpty.js",
    "./helpers/objectWithoutPropertiesLoose": [
      {
        "node": "./helpers/objectWithoutPropertiesLoose.js",
        "import": "./helpers/esm/objectWithoutPropertiesLoose.js",
        "default": "./helpers/objectWithoutPropertiesLoose.js"
      },
      "./helpers/objectWithoutPropertiesLoose.js"
    ],
    "./helpers/esm/objectWithoutPropertiesLoose": "./helpers/esm/objectWithoutPropertiesLoose.js",
    "./helpers/objectWithoutProperties": [
      {
        "node": "./helpers/objectWithoutProperties.js",
        "import": "./helpers/esm/objectWithoutProperties.js",
        "default": "./helpers/objectWithoutProperties.js"
      },
      "./helpers/objectWithoutProperties.js"
    ],
    "./helpers/esm/objectWithoutProperties": "./helpers/esm/objectWithoutProperties.js",
    "./helpers/assertThisInitialized": [
      {
        "node": "./helpers/assertThisInitialized.js",
        "import": "./helpers/esm/assertThisInitialized.js",
        "default": "./helpers/assertThisInitialized.js"
      },
      "./helpers/assertThisInitialized.js"
    ],
    "./helpers/esm/assertThisInitialized": "./helpers/esm/assertThisInitialized.js",
    "./helpers/possibleConstructorReturn": [
      {
        "node": "./helpers/possibleConstructorReturn.js",
        "import": "./helpers/esm/possibleConstructorReturn.js",
        "default": "./helpers/possibleConstructorReturn.js"
      },
      "./helpers/possibleConstructorReturn.js"
    ],
    "./helpers/esm/possibleConstructorReturn": "./helpers/esm/possibleConstructorReturn.js",
    "./helpers/createSuper": [
      {
        "node": "./helpers/createSuper.js",
        "import": "./helpers/esm/createSuper.js",
        "default": "./helpers/createSuper.js"
      },
      "./helpers/createSuper.js"
    ],
    "./helpers/esm/createSuper": "./helpers/esm/createSuper.js",
    "./helpers/superPropBase": [
      {
        "node": "./helpers/superPropBase.js",
        "import": "./helpers/esm/superPropBase.js",
        "default": "./helpers/superPropBase.js"
      },
      "./helpers/superPropBase.js"
    ],
    "./helpers/esm/superPropBase": "./helpers/esm/superPropBase.js",
    "./helpers/get": [
      {
        "node": "./helpers/get.js",
        "import": "./helpers/esm/get.js",
        "default": "./helpers/get.js"
      },
      "./helpers/get.js"
    ],
    "./helpers/esm/get": "./helpers/esm/get.js",
    "./helpers/set": [
      {
        "node": "./helpers/set.js",
        "import": "./helpers/esm/set.js",
        "default": "./helpers/set.js"
      },
      "./helpers/set.js"
    ],
    "./helpers/esm/set": "./helpers/esm/set.js",
    "./helpers/taggedTemplateLiteral": [
      {
        "node": "./helpers/taggedTemplateLiteral.js",
        "import": "./helpers/esm/taggedTemplateLiteral.js",
        "default": "./helpers/taggedTemplateLiteral.js"
      },
      "./helpers/taggedTemplateLiteral.js"
    ],
    "./helpers/esm/taggedTemplateLiteral": "./helpers/esm/taggedTemplateLiteral.js",
    "./helpers/taggedTemplateLiteralLoose": [
      {
        "node": "./helpers/taggedTemplateLiteralLoose.js",
        "import": "./helpers/esm/taggedTemplateLiteralLoose.js",
        "default": "./helpers/taggedTemplateLiteralLoose.js"
      },
      "./helpers/taggedTemplateLiteralLoose.js"
    ],
    "./helpers/esm/taggedTemplateLiteralLoose": "./helpers/esm/taggedTemplateLiteralLoose.js",
    "./helpers/readOnlyError": [
      {
        "node": "./helpers/readOnlyError.js",
        "import": "./helpers/esm/readOnlyError.js",
        "default": "./helpers/readOnlyError.js"
      },
      "./helpers/readOnlyError.js"
    ],
    "./helpers/esm/readOnlyError": "./helpers/esm/readOnlyError.js",
    "./helpers/writeOnlyError": [
      {
        "node": "./helpers/writeOnlyError.js",
        "import": "./helpers/esm/writeOnlyError.js",
        "default": "./helpers/writeOnlyError.js"
      },
      "./helpers/writeOnlyError.js"
    ],
    "./helpers/esm/writeOnlyError": "./helpers/esm/writeOnlyError.js",
    "./helpers/classNameTDZError": [
      {
        "node": "./helpers/classNameTDZError.js",
        "import": "./helpers/esm/classNameTDZError.js",
        "default": "./helpers/classNameTDZError.js"
      },
      "./helpers/classNameTDZError.js"
    ],
    "./helpers/esm/classNameTDZError": "./helpers/esm/classNameTDZError.js",
    "./helpers/temporalUndefined": [
      {
        "node": "./helpers/temporalUndefined.js",
        "import": "./helpers/esm/temporalUndefined.js",
        "default": "./helpers/temporalUndefined.js"
      },
      "./helpers/temporalUndefined.js"
    ],
    "./helpers/esm/temporalUndefined": "./helpers/esm/temporalUndefined.js",
    "./helpers/tdz": [
      {
        "node": "./helpers/tdz.js",
        "import": "./helpers/esm/tdz.js",
        "default": "./helpers/tdz.js"
      },
      "./helpers/tdz.js"
    ],
    "./helpers/esm/tdz": "./helpers/esm/tdz.js",
    "./helpers/temporalRef": [
      {
        "node": "./helpers/temporalRef.js",
        "import": "./helpers/esm/temporalRef.js",
        "default": "./helpers/temporalRef.js"
      },
      "./helpers/temporalRef.js"
    ],
    "./helpers/esm/temporalRef": "./helpers/esm/temporalRef.js",
    "./helpers/slicedToArray": [
      {
        "node": "./helpers/slicedToArray.js",
        "import": "./helpers/esm/slicedToArray.js",
        "default": "./helpers/slicedToArray.js"
      },
      "./helpers/slicedToArray.js"
    ],
    "./helpers/esm/slicedToArray": "./helpers/esm/slicedToArray.js",
    "./helpers/slicedToArrayLoose": [
      {
        "node": "./helpers/slicedToArrayLoose.js",
        "import": "./helpers/esm/slicedToArrayLoose.js",
        "default": "./helpers/slicedToArrayLoose.js"
      },
      "./helpers/slicedToArrayLoose.js"
    ],
    "./helpers/esm/slicedToArrayLoose": "./helpers/esm/slicedToArrayLoose.js",
    "./helpers/toArray": [
      {
        "node": "./helpers/toArray.js",
        "import": "./helpers/esm/toArray.js",
        "default": "./helpers/toArray.js"
      },
      "./helpers/toArray.js"
    ],
    "./helpers/esm/toArray": "./helpers/esm/toArray.js",
    "./helpers/toConsumableArray": [
      {
        "node": "./helpers/toConsumableArray.js",
        "import": "./helpers/esm/toConsumableArray.js",
        "default": "./helpers/toConsumableArray.js"
      },
      "./helpers/toConsumableArray.js"
    ],
    "./helpers/esm/toConsumableArray": "./helpers/esm/toConsumableArray.js",
    "./helpers/arrayWithoutHoles": [
      {
        "node": "./helpers/arrayWithoutHoles.js",
        "import": "./helpers/esm/arrayWithoutHoles.js",
        "default": "./helpers/arrayWithoutHoles.js"
      },
      "./helpers/arrayWithoutHoles.js"
    ],
    "./helpers/esm/arrayWithoutHoles": "./helpers/esm/arrayWithoutHoles.js",
    "./helpers/arrayWithHoles": [
      {
        "node": "./helpers/arrayWithHoles.js",
        "import": "./helpers/esm/arrayWithHoles.js",
        "default": "./helpers/arrayWithHoles.js"
      },
      "./helpers/arrayWithHoles.js"
    ],
    "./helpers/esm/arrayWithHoles": "./helpers/esm/arrayWithHoles.js",
    "./helpers/maybeArrayLike": [
      {
        "node": "./helpers/maybeArrayLike.js",
        "import": "./helpers/esm/maybeArrayLike.js",
        "default": "./helpers/maybeArrayLike.js"
      },
      "./helpers/maybeArrayLike.js"
    ],
    "./helpers/esm/maybeArrayLike": "./helpers/esm/maybeArrayLike.js",
    "./helpers/iterableToArray": [
      {
        "node": "./helpers/iterableToArray.js",
        "import": "./helpers/esm/iterableToArray.js",
        "default": "./helpers/iterableToArray.js"
      },
      "./helpers/iterableToArray.js"
    ],
    "./helpers/esm/iterableToArray": "./helpers/esm/iterableToArray.js",
    "./helpers/iterableToArrayLimit": [
      {
        "node": "./helpers/iterableToArrayLimit.js",
        "import": "./helpers/esm/iterableToArrayLimit.js",
        "default": "./helpers/iterableToArrayLimit.js"
      },
      "./helpers/iterableToArrayLimit.js"
    ],
    "./helpers/esm/iterableToArrayLimit": "./helpers/esm/iterableToArrayLimit.js",
    "./helpers/iterableToArrayLimitLoose": [
      {
        "node": "./helpers/iterableToArrayLimitLoose.js",
        "import": "./helpers/esm/iterableToArrayLimitLoose.js",
        "default": "./helpers/iterableToArrayLimitLoose.js"
      },
      "./helpers/iterableToArrayLimitLoose.js"
    ],
    "./helpers/esm/iterableToArrayLimitLoose": "./helpers/esm/iterableToArrayLimitLoose.js",
    "./helpers/unsupportedIterableToArray": [
      {
        "node": "./helpers/unsupportedIterableToArray.js",
        "import": "./helpers/esm/unsupportedIterableToArray.js",
        "default": "./helpers/unsupportedIterableToArray.js"
      },
      "./helpers/unsupportedIterableToArray.js"
    ],
    "./helpers/esm/unsupportedIterableToArray": "./helpers/esm/unsupportedIterableToArray.js",
    "./helpers/arrayLikeToArray": [
      {
        "node": "./helpers/arrayLikeToArray.js",
        "import": "./helpers/esm/arrayLikeToArray.js",
        "default": "./helpers/arrayLikeToArray.js"
      },
      "./helpers/arrayLikeToArray.js"
    ],
    "./helpers/esm/arrayLikeToArray": "./helpers/esm/arrayLikeToArray.js",
    "./helpers/nonIterableSpread": [
      {
        "node": "./helpers/nonIterableSpread.js",
        "import": "./helpers/esm/nonIterableSpread.js",
        "default": "./helpers/nonIterableSpread.js"
      },
      "./helpers/nonIterableSpread.js"
    ],
    "./helpers/esm/nonIterableSpread": "./helpers/esm/nonIterableSpread.js",
    "./helpers/nonIterableRest": [
      {
        "node": "./helpers/nonIterableRest.js",
        "import": "./helpers/esm/nonIterableRest.js",
        "default": "./helpers/nonIterableRest.js"
      },
      "./helpers/nonIterableRest.js"
    ],
    "./helpers/esm/nonIterableRest": "./helpers/esm/nonIterableRest.js",
    "./helpers/createForOfIteratorHelper": [
      {
        "node": "./helpers/createForOfIteratorHelper.js",
        "import": "./helpers/esm/createForOfIteratorHelper.js",
        "default": "./helpers/createForOfIteratorHelper.js"
      },
      "./helpers/createForOfIteratorHelper.js"
    ],
    "./helpers/esm/createForOfIteratorHelper": "./helpers/esm/createForOfIteratorHelper.js",
    "./helpers/createForOfIteratorHelperLoose": [
      {
        "node": "./helpers/createForOfIteratorHelperLoose.js",
        "import": "./helpers/esm/createForOfIteratorHelperLoose.js",
        "default": "./helpers/createForOfIteratorHelperLoose.js"
      },
      "./helpers/createForOfIteratorHelperLoose.js"
    ],
    "./helpers/esm/createForOfIteratorHelperLoose": "./helpers/esm/createForOfIteratorHelperLoose.js",
    "./helpers/skipFirstGeneratorNext": [
      {
        "node": "./helpers/skipFirstGeneratorNext.js",
        "import": "./helpers/esm/skipFirstGeneratorNext.js",
        "default": "./helpers/skipFirstGeneratorNext.js"
      },
      "./helpers/skipFirstGeneratorNext.js"
    ],
    "./helpers/esm/skipFirstGeneratorNext": "./helpers/esm/skipFirstGeneratorNext.js",
    "./helpers/toPrimitive": [
      {
        "node": "./helpers/toPrimitive.js",
        "import": "./helpers/esm/toPrimitive.js",
        "default": "./helpers/toPrimitive.js"
      },
      "./helpers/toPrimitive.js"
    ],
    "./helpers/esm/toPrimitive": "./helpers/esm/toPrimitive.js",
    "./helpers/toPropertyKey": [
      {
        "node": "./helpers/toPropertyKey.js",
        "import": "./helpers/esm/toPropertyKey.js",
        "default": "./helpers/toPropertyKey.js"
      },
      "./helpers/toPropertyKey.js"
    ],
    "./helpers/esm/toPropertyKey": "./helpers/esm/toPropertyKey.js",
    "./helpers/initializerWarningHelper": [
      {
        "node": "./helpers/initializerWarningHelper.js",
        "import": "./helpers/esm/initializerWarningHelper.js",
        "default": "./helpers/initializerWarningHelper.js"
      },
      "./helpers/initializerWarningHelper.js"
    ],
    "./helpers/esm/initializerWarningHelper": "./helpers/esm/initializerWarningHelper.js",
    "./helpers/initializerDefineProperty": [
      {
        "node": "./helpers/initializerDefineProperty.js",
        "import": "./helpers/esm/initializerDefineProperty.js",
        "default": "./helpers/initializerDefineProperty.js"
      },
      "./helpers/initializerDefineProperty.js"
    ],
    "./helpers/esm/initializerDefineProperty": "./helpers/esm/initializerDefineProperty.js",
    "./helpers/applyDecoratedDescriptor": [
      {
        "node": "./helpers/applyDecoratedDescriptor.js",
        "import": "./helpers/esm/applyDecoratedDescriptor.js",
        "default": "./helpers/applyDecoratedDescriptor.js"
      },
      "./helpers/applyDecoratedDescriptor.js"
    ],
    "./helpers/esm/applyDecoratedDescriptor": "./helpers/esm/applyDecoratedDescriptor.js",
    "./helpers/classPrivateFieldLooseKey": [
      {
        "node": "./helpers/classPrivateFieldLooseKey.js",
        "import": "./helpers/esm/classPrivateFieldLooseKey.js",
        "default": "./helpers/classPrivateFieldLooseKey.js"
      },
      "./helpers/classPrivateFieldLooseKey.js"
    ],
    "./helpers/esm/classPrivateFieldLooseKey": "./helpers/esm/classPrivateFieldLooseKey.js",
    "./helpers/classPrivateFieldLooseBase": [
      {
        "node": "./helpers/classPrivateFieldLooseBase.js",
        "import": "./helpers/esm/classPrivateFieldLooseBase.js",
        "default": "./helpers/classPrivateFieldLooseBase.js"
      },
      "./helpers/classPrivateFieldLooseBase.js"
    ],
    "./helpers/esm/classPrivateFieldLooseBase": "./helpers/esm/classPrivateFieldLooseBase.js",
    "./helpers/classPrivateFieldGet": [
      {
        "node": "./helpers/classPrivateFieldGet.js",
        "import": "./helpers/esm/classPrivateFieldGet.js",
        "default": "./helpers/classPrivateFieldGet.js"
      },
      "./helpers/classPrivateFieldGet.js"
    ],
    "./helpers/esm/classPrivateFieldGet": "./helpers/esm/classPrivateFieldGet.js",
    "./helpers/classPrivateFieldSet": [
      {
        "node": "./helpers/classPrivateFieldSet.js",
        "import": "./helpers/esm/classPrivateFieldSet.js",
        "default": "./helpers/classPrivateFieldSet.js"
      },
      "./helpers/classPrivateFieldSet.js"
    ],
    "./helpers/esm/classPrivateFieldSet": "./helpers/esm/classPrivateFieldSet.js",
    "./helpers/classPrivateFieldDestructureSet": [
      {
        "node": "./helpers/classPrivateFieldDestructureSet.js",
        "import": "./helpers/esm/classPrivateFieldDestructureSet.js",
        "default": "./helpers/classPrivateFieldDestructureSet.js"
      },
      "./helpers/classPrivateFieldDestructureSet.js"
    ],
    "./helpers/esm/classPrivateFieldDestructureSet": "./helpers/esm/classPrivateFieldDestructureSet.js",
    "./helpers/classExtractFieldDescriptor": [
      {
        "node": "./helpers/classExtractFieldDescriptor.js",
        "import": "./helpers/esm/classExtractFieldDescriptor.js",
        "default": "./helpers/classExtractFieldDescriptor.js"
      },
      "./helpers/classExtractFieldDescriptor.js"
    ],
    "./helpers/esm/classExtractFieldDescriptor": "./helpers/esm/classExtractFieldDescriptor.js",
    "./helpers/classStaticPrivateFieldSpecGet": [
      {
        "node": "./helpers/classStaticPrivateFieldSpecGet.js",
        "import": "./helpers/esm/classStaticPrivateFieldSpecGet.js",
        "default": "./helpers/classStaticPrivateFieldSpecGet.js"
      },
      "./helpers/classStaticPrivateFieldSpecGet.js"
    ],
    "./helpers/esm/classStaticPrivateFieldSpecGet": "./helpers/esm/classStaticPrivateFieldSpecGet.js",
    "./helpers/classStaticPrivateFieldSpecSet": [
      {
        "node": "./helpers/classStaticPrivateFieldSpecSet.js",
        "import": "./helpers/esm/classStaticPrivateFieldSpecSet.js",
        "default": "./helpers/classStaticPrivateFieldSpecSet.js"
      },
      "./helpers/classStaticPrivateFieldSpecSet.js"
    ],
    "./helpers/esm/classStaticPrivateFieldSpecSet": "./helpers/esm/classStaticPrivateFieldSpecSet.js",
    "./helpers/classStaticPrivateMethodGet": [
      {
        "node": "./helpers/classStaticPrivateMethodGet.js",
        "import": "./helpers/esm/classStaticPrivateMethodGet.js",
        "default": "./helpers/classStaticPrivateMethodGet.js"
      },
      "./helpers/classStaticPrivateMethodGet.js"
    ],
    "./helpers/esm/classStaticPrivateMethodGet": "./helpers/esm/classStaticPrivateMethodGet.js",
    "./helpers/classStaticPrivateMethodSet": [
      {
        "node": "./helpers/classStaticPrivateMethodSet.js",
        "import": "./helpers/esm/classStaticPrivateMethodSet.js",
        "default": "./helpers/classStaticPrivateMethodSet.js"
      },
      "./helpers/classStaticPrivateMethodSet.js"
    ],
    "./helpers/esm/classStaticPrivateMethodSet": "./helpers/esm/classStaticPrivateMethodSet.js",
    "./helpers/classApplyDescriptorGet": [
      {
        "node": "./helpers/classApplyDescriptorGet.js",
        "import": "./helpers/esm/classApplyDescriptorGet.js",
        "default": "./helpers/classApplyDescriptorGet.js"
      },
      "./helpers/classApplyDescriptorGet.js"
    ],
    "./helpers/esm/classApplyDescriptorGet": "./helpers/esm/classApplyDescriptorGet.js",
    "./helpers/classApplyDescriptorSet": [
      {
        "node": "./helpers/classApplyDescriptorSet.js",
        "import": "./helpers/esm/classApplyDescriptorSet.js",
        "default": "./helpers/classApplyDescriptorSet.js"
      },
      "./helpers/classApplyDescriptorSet.js"
    ],
    "./helpers/esm/classApplyDescriptorSet": "./helpers/esm/classApplyDescriptorSet.js",
    "./helpers/classApplyDescriptorDestructureSet": [
      {
        "node": "./helpers/classApplyDescriptorDestructureSet.js",
        "import": "./helpers/esm/classApplyDescriptorDestructureSet.js",
        "default": "./helpers/classApplyDescriptorDestructureSet.js"
      },
      "./helpers/classApplyDescriptorDestructureSet.js"
    ],
    "./helpers/esm/classApplyDescriptorDestructureSet": "./helpers/esm/classApplyDescriptorDestructureSet.js",
    "./helpers/classStaticPrivateFieldDestructureSet": [
      {
        "node": "./helpers/classStaticPrivateFieldDestructureSet.js",
        "import": "./helpers/esm/classStaticPrivateFieldDestructureSet.js",
        "default": "./helpers/classStaticPrivateFieldDestructureSet.js"
      },
      "./helpers/classStaticPrivateFieldDestructureSet.js"
    ],
    "./helpers/esm/classStaticPrivateFieldDestructureSet": "./helpers/esm/classStaticPrivateFieldDestructureSet.js",
    "./helpers/classCheckPrivateStaticAccess": [
      {
        "node": "./helpers/classCheckPrivateStaticAccess.js",
        "import": "./helpers/esm/classCheckPrivateStaticAccess.js",
        "default": "./helpers/classCheckPrivateStaticAccess.js"
      },
      "./helpers/classCheckPrivateStaticAccess.js"
    ],
    "./helpers/esm/classCheckPrivateStaticAccess": "./helpers/esm/classCheckPrivateStaticAccess.js",
    "./helpers/classCheckPrivateStaticFieldDescriptor": [
      {
        "node": "./helpers/classCheckPrivateStaticFieldDescriptor.js",
        "import": "./helpers/esm/classCheckPrivateStaticFieldDescriptor.js",
        "default": "./helpers/classCheckPrivateStaticFieldDescriptor.js"
      },
      "./helpers/classCheckPrivateStaticFieldDescriptor.js"
    ],
    "./helpers/esm/classCheckPrivateStaticFieldDescriptor": "./helpers/esm/classCheckPrivateStaticFieldDescriptor.js",
    "./helpers/decorate": [
      {
        "node": "./helpers/decorate.js",
        "import": "./helpers/esm/decorate.js",
        "default": "./helpers/decorate.js"
      },
      "./helpers/decorate.js"
    ],
    "./helpers/esm/decorate": "./helpers/esm/decorate.js",
    "./helpers/classPrivateMethodGet": [
      {
        "node": "./helpers/classPrivateMethodGet.js",
        "import": "./helpers/esm/classPrivateMethodGet.js",
        "default": "./helpers/classPrivateMethodGet.js"
      },
      "./helpers/classPrivateMethodGet.js"
    ],
    "./helpers/esm/classPrivateMethodGet": "./helpers/esm/classPrivateMethodGet.js",
    "./helpers/classPrivateMethodSet": [
      {
        "node": "./helpers/classPrivateMethodSet.js",
        "import": "./helpers/esm/classPrivateMethodSet.js",
        "default": "./helpers/classPrivateMethodSet.js"
      },
      "./helpers/classPrivateMethodSet.js"
    ],
    "./helpers/esm/classPrivateMethodSet": "./helpers/esm/classPrivateMethodSet.js",
    "./package": "./package.json",
    "./package.json": "./package.json",
    "./regenerator": "./regenerator/index.js",
    "./regenerator/*.js": "./regenerator/*.js",
    "./regenerator/": "./regenerator/"
  },
  "homepage": "https://babel.dev/docs/en/next/babel-runtime",
  "license": "MIT",
  "name": "@babel/runtime",
  "publishConfig": {
    "access": "public"
  },
  "repository": {
    "type": "git",
    "url": "git+https://github.com/babel/babel.git",
    "directory": "packages/babel-runtime"
  },
  "version": "7.15.3"
};

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}}},"svelte":{"internal":{"package.json":function module(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// node_modules/svelte/internal/package.json                                                                           //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
module.exports = {
  "main": "./index",
  "module": "./index.mjs"
};

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"index.js":function module(require,exports){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// node_modules/svelte/internal/index.js                                                                               //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function noop() { }
const identity = x => x;
function assign(tar, src) {
    // @ts-ignore
    for (const k in src)
        tar[k] = src[k];
    return tar;
}
function is_promise(value) {
    return value && typeof value === 'object' && typeof value.then === 'function';
}
function add_location(element, file, line, column, char) {
    element.__svelte_meta = {
        loc: { file, line, column, char }
    };
}
function run(fn) {
    return fn();
}
function blank_object() {
    return Object.create(null);
}
function run_all(fns) {
    fns.forEach(run);
}
function is_function(thing) {
    return typeof thing === 'function';
}
function safe_not_equal(a, b) {
    return a != a ? b == b : a !== b || ((a && typeof a === 'object') || typeof a === 'function');
}
let src_url_equal_anchor;
function src_url_equal(element_src, url) {
    if (!src_url_equal_anchor) {
        src_url_equal_anchor = document.createElement('a');
    }
    src_url_equal_anchor.href = url;
    return element_src === src_url_equal_anchor.href;
}
function not_equal(a, b) {
    return a != a ? b == b : a !== b;
}
function is_empty(obj) {
    return Object.keys(obj).length === 0;
}
function validate_store(store, name) {
    if (store != null && typeof store.subscribe !== 'function') {
        throw new Error(`'${name}' is not a store with a 'subscribe' method`);
    }
}
function subscribe(store, ...callbacks) {
    if (store == null) {
        return noop;
    }
    const unsub = store.subscribe(...callbacks);
    return unsub.unsubscribe ? () => unsub.unsubscribe() : unsub;
}
function get_store_value(store) {
    let value;
    subscribe(store, _ => value = _)();
    return value;
}
function component_subscribe(component, store, callback) {
    component.$$.on_destroy.push(subscribe(store, callback));
}
function create_slot(definition, ctx, $$scope, fn) {
    if (definition) {
        const slot_ctx = get_slot_context(definition, ctx, $$scope, fn);
        return definition[0](slot_ctx);
    }
}
function get_slot_context(definition, ctx, $$scope, fn) {
    return definition[1] && fn
        ? assign($$scope.ctx.slice(), definition[1](fn(ctx)))
        : $$scope.ctx;
}
function get_slot_changes(definition, $$scope, dirty, fn) {
    if (definition[2] && fn) {
        const lets = definition[2](fn(dirty));
        if ($$scope.dirty === undefined) {
            return lets;
        }
        if (typeof lets === 'object') {
            const merged = [];
            const len = Math.max($$scope.dirty.length, lets.length);
            for (let i = 0; i < len; i += 1) {
                merged[i] = $$scope.dirty[i] | lets[i];
            }
            return merged;
        }
        return $$scope.dirty | lets;
    }
    return $$scope.dirty;
}
function update_slot_base(slot, slot_definition, ctx, $$scope, slot_changes, get_slot_context_fn) {
    if (slot_changes) {
        const slot_context = get_slot_context(slot_definition, ctx, $$scope, get_slot_context_fn);
        slot.p(slot_context, slot_changes);
    }
}
function update_slot(slot, slot_definition, ctx, $$scope, dirty, get_slot_changes_fn, get_slot_context_fn) {
    const slot_changes = get_slot_changes(slot_definition, $$scope, dirty, get_slot_changes_fn);
    update_slot_base(slot, slot_definition, ctx, $$scope, slot_changes, get_slot_context_fn);
}
function get_all_dirty_from_scope($$scope) {
    if ($$scope.ctx.length > 32) {
        const dirty = [];
        const length = $$scope.ctx.length / 32;
        for (let i = 0; i < length; i++) {
            dirty[i] = -1;
        }
        return dirty;
    }
    return -1;
}
function exclude_internal_props(props) {
    const result = {};
    for (const k in props)
        if (k[0] !== '$')
            result[k] = props[k];
    return result;
}
function compute_rest_props(props, keys) {
    const rest = {};
    keys = new Set(keys);
    for (const k in props)
        if (!keys.has(k) && k[0] !== '$')
            rest[k] = props[k];
    return rest;
}
function compute_slots(slots) {
    const result = {};
    for (const key in slots) {
        result[key] = true;
    }
    return result;
}
function once(fn) {
    let ran = false;
    return function (...args) {
        if (ran)
            return;
        ran = true;
        fn.call(this, ...args);
    };
}
function null_to_empty(value) {
    return value == null ? '' : value;
}
function set_store_value(store, ret, value) {
    store.set(value);
    return ret;
}
const has_prop = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop);
function action_destroyer(action_result) {
    return action_result && is_function(action_result.destroy) ? action_result.destroy : noop;
}

const is_client = typeof window !== 'undefined';
exports.now = is_client
    ? () => window.performance.now()
    : () => Date.now();
exports.raf = is_client ? cb => requestAnimationFrame(cb) : noop;
// used internally for testing
function set_now(fn) {
    exports.now = fn;
}
function set_raf(fn) {
    exports.raf = fn;
}

const tasks = new Set();
function run_tasks(now) {
    tasks.forEach(task => {
        if (!task.c(now)) {
            tasks.delete(task);
            task.f();
        }
    });
    if (tasks.size !== 0)
        exports.raf(run_tasks);
}
/**
 * For testing purposes only!
 */
function clear_loops() {
    tasks.clear();
}
/**
 * Creates a new task that runs on each raf frame
 * until it returns a falsy value or is aborted
 */
function loop(callback) {
    let task;
    if (tasks.size === 0)
        exports.raf(run_tasks);
    return {
        promise: new Promise(fulfill => {
            tasks.add(task = { c: callback, f: fulfill });
        }),
        abort() {
            tasks.delete(task);
        }
    };
}

// Track which nodes are claimed during hydration. Unclaimed nodes can then be removed from the DOM
// at the end of hydration without touching the remaining nodes.
let is_hydrating = false;
function start_hydrating() {
    is_hydrating = true;
}
function end_hydrating() {
    is_hydrating = false;
}
function upper_bound(low, high, key, value) {
    // Return first index of value larger than input value in the range [low, high)
    while (low < high) {
        const mid = low + ((high - low) >> 1);
        if (key(mid) <= value) {
            low = mid + 1;
        }
        else {
            high = mid;
        }
    }
    return low;
}
function init_hydrate(target) {
    if (target.hydrate_init)
        return;
    target.hydrate_init = true;
    // We know that all children have claim_order values since the unclaimed have been detached if target is not <head>
    let children = target.childNodes;
    // If target is <head>, there may be children without claim_order
    if (target.nodeName === 'HEAD') {
        const myChildren = [];
        for (let i = 0; i < children.length; i++) {
            const node = children[i];
            if (node.claim_order !== undefined) {
                myChildren.push(node);
            }
        }
        children = myChildren;
    }
    /*
    * Reorder claimed children optimally.
    * We can reorder claimed children optimally by finding the longest subsequence of
    * nodes that are already claimed in order and only moving the rest. The longest
    * subsequence subsequence of nodes that are claimed in order can be found by
    * computing the longest increasing subsequence of .claim_order values.
    *
    * This algorithm is optimal in generating the least amount of reorder operations
    * possible.
    *
    * Proof:
    * We know that, given a set of reordering operations, the nodes that do not move
    * always form an increasing subsequence, since they do not move among each other
    * meaning that they must be already ordered among each other. Thus, the maximal
    * set of nodes that do not move form a longest increasing subsequence.
    */
    // Compute longest increasing subsequence
    // m: subsequence length j => index k of smallest value that ends an increasing subsequence of length j
    const m = new Int32Array(children.length + 1);
    // Predecessor indices + 1
    const p = new Int32Array(children.length);
    m[0] = -1;
    let longest = 0;
    for (let i = 0; i < children.length; i++) {
        const current = children[i].claim_order;
        // Find the largest subsequence length such that it ends in a value less than our current value
        // upper_bound returns first greater value, so we subtract one
        // with fast path for when we are on the current longest subsequence
        const seqLen = ((longest > 0 && children[m[longest]].claim_order <= current) ? longest + 1 : upper_bound(1, longest, idx => children[m[idx]].claim_order, current)) - 1;
        p[i] = m[seqLen] + 1;
        const newLen = seqLen + 1;
        // We can guarantee that current is the smallest value. Otherwise, we would have generated a longer sequence.
        m[newLen] = i;
        longest = Math.max(newLen, longest);
    }
    // The longest increasing subsequence of nodes (initially reversed)
    const lis = [];
    // The rest of the nodes, nodes that will be moved
    const toMove = [];
    let last = children.length - 1;
    for (let cur = m[longest] + 1; cur != 0; cur = p[cur - 1]) {
        lis.push(children[cur - 1]);
        for (; last >= cur; last--) {
            toMove.push(children[last]);
        }
        last--;
    }
    for (; last >= 0; last--) {
        toMove.push(children[last]);
    }
    lis.reverse();
    // We sort the nodes being moved to guarantee that their insertion order matches the claim order
    toMove.sort((a, b) => a.claim_order - b.claim_order);
    // Finally, we move the nodes
    for (let i = 0, j = 0; i < toMove.length; i++) {
        while (j < lis.length && toMove[i].claim_order >= lis[j].claim_order) {
            j++;
        }
        const anchor = j < lis.length ? lis[j] : null;
        target.insertBefore(toMove[i], anchor);
    }
}
function append(target, node) {
    target.appendChild(node);
}
function append_styles(target, style_sheet_id, styles) {
    const append_styles_to = get_root_for_style(target);
    if (!append_styles_to.getElementById(style_sheet_id)) {
        const style = element('style');
        style.id = style_sheet_id;
        style.textContent = styles;
        append_stylesheet(append_styles_to, style);
    }
}
function get_root_for_style(node) {
    if (!node)
        return document;
    const root = node.getRootNode ? node.getRootNode() : node.ownerDocument;
    if (root && root.host) {
        return root;
    }
    return node.ownerDocument;
}
function append_empty_stylesheet(node) {
    const style_element = element('style');
    append_stylesheet(get_root_for_style(node), style_element);
    return style_element;
}
function append_stylesheet(node, style) {
    append(node.head || node, style);
}
function append_hydration(target, node) {
    if (is_hydrating) {
        init_hydrate(target);
        if ((target.actual_end_child === undefined) || ((target.actual_end_child !== null) && (target.actual_end_child.parentElement !== target))) {
            target.actual_end_child = target.firstChild;
        }
        // Skip nodes of undefined ordering
        while ((target.actual_end_child !== null) && (target.actual_end_child.claim_order === undefined)) {
            target.actual_end_child = target.actual_end_child.nextSibling;
        }
        if (node !== target.actual_end_child) {
            // We only insert if the ordering of this node should be modified or the parent node is not target
            if (node.claim_order !== undefined || node.parentNode !== target) {
                target.insertBefore(node, target.actual_end_child);
            }
        }
        else {
            target.actual_end_child = node.nextSibling;
        }
    }
    else if (node.parentNode !== target || node.nextSibling !== null) {
        target.appendChild(node);
    }
}
function insert(target, node, anchor) {
    target.insertBefore(node, anchor || null);
}
function insert_hydration(target, node, anchor) {
    if (is_hydrating && !anchor) {
        append_hydration(target, node);
    }
    else if (node.parentNode !== target || node.nextSibling != anchor) {
        target.insertBefore(node, anchor || null);
    }
}
function detach(node) {
    node.parentNode.removeChild(node);
}
function destroy_each(iterations, detaching) {
    for (let i = 0; i < iterations.length; i += 1) {
        if (iterations[i])
            iterations[i].d(detaching);
    }
}
function element(name) {
    return document.createElement(name);
}
function element_is(name, is) {
    return document.createElement(name, { is });
}
function object_without_properties(obj, exclude) {
    const target = {};
    for (const k in obj) {
        if (has_prop(obj, k)
            // @ts-ignore
            && exclude.indexOf(k) === -1) {
            // @ts-ignore
            target[k] = obj[k];
        }
    }
    return target;
}
function svg_element(name) {
    return document.createElementNS('http://www.w3.org/2000/svg', name);
}
function text(data) {
    return document.createTextNode(data);
}
function space() {
    return text(' ');
}
function empty() {
    return text('');
}
function listen(node, event, handler, options) {
    node.addEventListener(event, handler, options);
    return () => node.removeEventListener(event, handler, options);
}
function prevent_default(fn) {
    return function (event) {
        event.preventDefault();
        // @ts-ignore
        return fn.call(this, event);
    };
}
function stop_propagation(fn) {
    return function (event) {
        event.stopPropagation();
        // @ts-ignore
        return fn.call(this, event);
    };
}
function self(fn) {
    return function (event) {
        // @ts-ignore
        if (event.target === this)
            fn.call(this, event);
    };
}
function trusted(fn) {
    return function (event) {
        // @ts-ignore
        if (event.isTrusted)
            fn.call(this, event);
    };
}
function attr(node, attribute, value) {
    if (value == null)
        node.removeAttribute(attribute);
    else if (node.getAttribute(attribute) !== value)
        node.setAttribute(attribute, value);
}
function set_attributes(node, attributes) {
    // @ts-ignore
    const descriptors = Object.getOwnPropertyDescriptors(node.__proto__);
    for (const key in attributes) {
        if (attributes[key] == null) {
            node.removeAttribute(key);
        }
        else if (key === 'style') {
            node.style.cssText = attributes[key];
        }
        else if (key === '__value') {
            node.value = node[key] = attributes[key];
        }
        else if (descriptors[key] && descriptors[key].set) {
            node[key] = attributes[key];
        }
        else {
            attr(node, key, attributes[key]);
        }
    }
}
function set_svg_attributes(node, attributes) {
    for (const key in attributes) {
        attr(node, key, attributes[key]);
    }
}
function set_custom_element_data(node, prop, value) {
    if (prop in node) {
        node[prop] = typeof node[prop] === 'boolean' && value === '' ? true : value;
    }
    else {
        attr(node, prop, value);
    }
}
function xlink_attr(node, attribute, value) {
    node.setAttributeNS('http://www.w3.org/1999/xlink', attribute, value);
}
function get_binding_group_value(group, __value, checked) {
    const value = new Set();
    for (let i = 0; i < group.length; i += 1) {
        if (group[i].checked)
            value.add(group[i].__value);
    }
    if (!checked) {
        value.delete(__value);
    }
    return Array.from(value);
}
function to_number(value) {
    return value === '' ? null : +value;
}
function time_ranges_to_array(ranges) {
    const array = [];
    for (let i = 0; i < ranges.length; i += 1) {
        array.push({ start: ranges.start(i), end: ranges.end(i) });
    }
    return array;
}
function children(element) {
    return Array.from(element.childNodes);
}
function init_claim_info(nodes) {
    if (nodes.claim_info === undefined) {
        nodes.claim_info = { last_index: 0, total_claimed: 0 };
    }
}
function claim_node(nodes, predicate, processNode, createNode, dontUpdateLastIndex = false) {
    // Try to find nodes in an order such that we lengthen the longest increasing subsequence
    init_claim_info(nodes);
    const resultNode = (() => {
        // We first try to find an element after the previous one
        for (let i = nodes.claim_info.last_index; i < nodes.length; i++) {
            const node = nodes[i];
            if (predicate(node)) {
                const replacement = processNode(node);
                if (replacement === undefined) {
                    nodes.splice(i, 1);
                }
                else {
                    nodes[i] = replacement;
                }
                if (!dontUpdateLastIndex) {
                    nodes.claim_info.last_index = i;
                }
                return node;
            }
        }
        // Otherwise, we try to find one before
        // We iterate in reverse so that we don't go too far back
        for (let i = nodes.claim_info.last_index - 1; i >= 0; i--) {
            const node = nodes[i];
            if (predicate(node)) {
                const replacement = processNode(node);
                if (replacement === undefined) {
                    nodes.splice(i, 1);
                }
                else {
                    nodes[i] = replacement;
                }
                if (!dontUpdateLastIndex) {
                    nodes.claim_info.last_index = i;
                }
                else if (replacement === undefined) {
                    // Since we spliced before the last_index, we decrease it
                    nodes.claim_info.last_index--;
                }
                return node;
            }
        }
        // If we can't find any matching node, we create a new one
        return createNode();
    })();
    resultNode.claim_order = nodes.claim_info.total_claimed;
    nodes.claim_info.total_claimed += 1;
    return resultNode;
}
function claim_element_base(nodes, name, attributes, create_element) {
    return claim_node(nodes, (node) => node.nodeName === name, (node) => {
        const remove = [];
        for (let j = 0; j < node.attributes.length; j++) {
            const attribute = node.attributes[j];
            if (!attributes[attribute.name]) {
                remove.push(attribute.name);
            }
        }
        remove.forEach(v => node.removeAttribute(v));
        return undefined;
    }, () => create_element(name));
}
function claim_element(nodes, name, attributes) {
    return claim_element_base(nodes, name, attributes, element);
}
function claim_svg_element(nodes, name, attributes) {
    return claim_element_base(nodes, name, attributes, svg_element);
}
function claim_text(nodes, data) {
    return claim_node(nodes, (node) => node.nodeType === 3, (node) => {
        const dataStr = '' + data;
        if (node.data.startsWith(dataStr)) {
            if (node.data.length !== dataStr.length) {
                return node.splitText(dataStr.length);
            }
        }
        else {
            node.data = dataStr;
        }
    }, () => text(data), true // Text nodes should not update last index since it is likely not worth it to eliminate an increasing subsequence of actual elements
    );
}
function claim_space(nodes) {
    return claim_text(nodes, ' ');
}
function find_comment(nodes, text, start) {
    for (let i = start; i < nodes.length; i += 1) {
        const node = nodes[i];
        if (node.nodeType === 8 /* comment node */ && node.textContent.trim() === text) {
            return i;
        }
    }
    return nodes.length;
}
function claim_html_tag(nodes) {
    // find html opening tag
    const start_index = find_comment(nodes, 'HTML_TAG_START', 0);
    const end_index = find_comment(nodes, 'HTML_TAG_END', start_index);
    if (start_index === end_index) {
        return new HtmlTagHydration();
    }
    init_claim_info(nodes);
    const html_tag_nodes = nodes.splice(start_index, end_index + 1);
    detach(html_tag_nodes[0]);
    detach(html_tag_nodes[html_tag_nodes.length - 1]);
    const claimed_nodes = html_tag_nodes.slice(1, html_tag_nodes.length - 1);
    for (const n of claimed_nodes) {
        n.claim_order = nodes.claim_info.total_claimed;
        nodes.claim_info.total_claimed += 1;
    }
    return new HtmlTagHydration(claimed_nodes);
}
function set_data(text, data) {
    data = '' + data;
    if (text.wholeText !== data)
        text.data = data;
}
function set_input_value(input, value) {
    input.value = value == null ? '' : value;
}
function set_input_type(input, type) {
    try {
        input.type = type;
    }
    catch (e) {
        // do nothing
    }
}
function set_style(node, key, value, important) {
    node.style.setProperty(key, value, important ? 'important' : '');
}
function select_option(select, value) {
    for (let i = 0; i < select.options.length; i += 1) {
        const option = select.options[i];
        if (option.__value === value) {
            option.selected = true;
            return;
        }
    }
    select.selectedIndex = -1; // no option should be selected
}
function select_options(select, value) {
    for (let i = 0; i < select.options.length; i += 1) {
        const option = select.options[i];
        option.selected = ~value.indexOf(option.__value);
    }
}
function select_value(select) {
    const selected_option = select.querySelector(':checked') || select.options[0];
    return selected_option && selected_option.__value;
}
function select_multiple_value(select) {
    return [].map.call(select.querySelectorAll(':checked'), option => option.__value);
}
// unfortunately this can't be a constant as that wouldn't be tree-shakeable
// so we cache the result instead
let crossorigin;
function is_crossorigin() {
    if (crossorigin === undefined) {
        crossorigin = false;
        try {
            if (typeof window !== 'undefined' && window.parent) {
                void window.parent.document;
            }
        }
        catch (error) {
            crossorigin = true;
        }
    }
    return crossorigin;
}
function add_resize_listener(node, fn) {
    const computed_style = getComputedStyle(node);
    if (computed_style.position === 'static') {
        node.style.position = 'relative';
    }
    const iframe = element('iframe');
    iframe.setAttribute('style', 'display: block; position: absolute; top: 0; left: 0; width: 100%; height: 100%; ' +
        'overflow: hidden; border: 0; opacity: 0; pointer-events: none; z-index: -1;');
    iframe.setAttribute('aria-hidden', 'true');
    iframe.tabIndex = -1;
    const crossorigin = is_crossorigin();
    let unsubscribe;
    if (crossorigin) {
        iframe.src = "data:text/html,<script>onresize=function(){parent.postMessage(0,'*')}</script>";
        unsubscribe = listen(window, 'message', (event) => {
            if (event.source === iframe.contentWindow)
                fn();
        });
    }
    else {
        iframe.src = 'about:blank';
        iframe.onload = () => {
            unsubscribe = listen(iframe.contentWindow, 'resize', fn);
        };
    }
    append(node, iframe);
    return () => {
        if (crossorigin) {
            unsubscribe();
        }
        else if (unsubscribe && iframe.contentWindow) {
            unsubscribe();
        }
        detach(iframe);
    };
}
function toggle_class(element, name, toggle) {
    element.classList[toggle ? 'add' : 'remove'](name);
}
function custom_event(type, detail, bubbles = false) {
    const e = document.createEvent('CustomEvent');
    e.initCustomEvent(type, bubbles, false, detail);
    return e;
}
function query_selector_all(selector, parent = document.body) {
    return Array.from(parent.querySelectorAll(selector));
}
class HtmlTag {
    constructor() {
        this.e = this.n = null;
    }
    c(html) {
        this.h(html);
    }
    m(html, target, anchor = null) {
        if (!this.e) {
            this.e = element(target.nodeName);
            this.t = target;
            this.c(html);
        }
        this.i(anchor);
    }
    h(html) {
        this.e.innerHTML = html;
        this.n = Array.from(this.e.childNodes);
    }
    i(anchor) {
        for (let i = 0; i < this.n.length; i += 1) {
            insert(this.t, this.n[i], anchor);
        }
    }
    p(html) {
        this.d();
        this.h(html);
        this.i(this.a);
    }
    d() {
        this.n.forEach(detach);
    }
}
class HtmlTagHydration extends HtmlTag {
    constructor(claimed_nodes) {
        super();
        this.e = this.n = null;
        this.l = claimed_nodes;
    }
    c(html) {
        if (this.l) {
            this.n = this.l;
        }
        else {
            super.c(html);
        }
    }
    i(anchor) {
        for (let i = 0; i < this.n.length; i += 1) {
            insert_hydration(this.t, this.n[i], anchor);
        }
    }
}
function attribute_to_object(attributes) {
    const result = {};
    for (const attribute of attributes) {
        result[attribute.name] = attribute.value;
    }
    return result;
}
function get_custom_elements_slots(element) {
    const result = {};
    element.childNodes.forEach((node) => {
        result[node.slot || 'default'] = true;
    });
    return result;
}

const active_docs = new Set();
let active = 0;
// https://github.com/darkskyapp/string-hash/blob/master/index.js
function hash(str) {
    let hash = 5381;
    let i = str.length;
    while (i--)
        hash = ((hash << 5) - hash) ^ str.charCodeAt(i);
    return hash >>> 0;
}
function create_rule(node, a, b, duration, delay, ease, fn, uid = 0) {
    const step = 16.666 / duration;
    let keyframes = '{\n';
    for (let p = 0; p <= 1; p += step) {
        const t = a + (b - a) * ease(p);
        keyframes += p * 100 + `%{${fn(t, 1 - t)}}\n`;
    }
    const rule = keyframes + `100% {${fn(b, 1 - b)}}\n}`;
    const name = `__svelte_${hash(rule)}_${uid}`;
    const doc = get_root_for_style(node);
    active_docs.add(doc);
    const stylesheet = doc.__svelte_stylesheet || (doc.__svelte_stylesheet = append_empty_stylesheet(node).sheet);
    const current_rules = doc.__svelte_rules || (doc.__svelte_rules = {});
    if (!current_rules[name]) {
        current_rules[name] = true;
        stylesheet.insertRule(`@keyframes ${name} ${rule}`, stylesheet.cssRules.length);
    }
    const animation = node.style.animation || '';
    node.style.animation = `${animation ? `${animation}, ` : ''}${name} ${duration}ms linear ${delay}ms 1 both`;
    active += 1;
    return name;
}
function delete_rule(node, name) {
    const previous = (node.style.animation || '').split(', ');
    const next = previous.filter(name
        ? anim => anim.indexOf(name) < 0 // remove specific animation
        : anim => anim.indexOf('__svelte') === -1 // remove all Svelte animations
    );
    const deleted = previous.length - next.length;
    if (deleted) {
        node.style.animation = next.join(', ');
        active -= deleted;
        if (!active)
            clear_rules();
    }
}
function clear_rules() {
    exports.raf(() => {
        if (active)
            return;
        active_docs.forEach(doc => {
            const stylesheet = doc.__svelte_stylesheet;
            let i = stylesheet.cssRules.length;
            while (i--)
                stylesheet.deleteRule(i);
            doc.__svelte_rules = {};
        });
        active_docs.clear();
    });
}

function create_animation(node, from, fn, params) {
    if (!from)
        return noop;
    const to = node.getBoundingClientRect();
    if (from.left === to.left && from.right === to.right && from.top === to.top && from.bottom === to.bottom)
        return noop;
    const { delay = 0, duration = 300, easing = identity, 
    // @ts-ignore todo: should this be separated from destructuring? Or start/end added to public api and documentation?
    start: start_time = exports.now() + delay, 
    // @ts-ignore todo:
    end = start_time + duration, tick = noop, css } = fn(node, { from, to }, params);
    let running = true;
    let started = false;
    let name;
    function start() {
        if (css) {
            name = create_rule(node, 0, 1, duration, delay, easing, css);
        }
        if (!delay) {
            started = true;
        }
    }
    function stop() {
        if (css)
            delete_rule(node, name);
        running = false;
    }
    loop(now => {
        if (!started && now >= start_time) {
            started = true;
        }
        if (started && now >= end) {
            tick(1, 0);
            stop();
        }
        if (!running) {
            return false;
        }
        if (started) {
            const p = now - start_time;
            const t = 0 + 1 * easing(p / duration);
            tick(t, 1 - t);
        }
        return true;
    });
    start();
    tick(0, 1);
    return stop;
}
function fix_position(node) {
    const style = getComputedStyle(node);
    if (style.position !== 'absolute' && style.position !== 'fixed') {
        const { width, height } = style;
        const a = node.getBoundingClientRect();
        node.style.position = 'absolute';
        node.style.width = width;
        node.style.height = height;
        add_transform(node, a);
    }
}
function add_transform(node, a) {
    const b = node.getBoundingClientRect();
    if (a.left !== b.left || a.top !== b.top) {
        const style = getComputedStyle(node);
        const transform = style.transform === 'none' ? '' : style.transform;
        node.style.transform = `${transform} translate(${a.left - b.left}px, ${a.top - b.top}px)`;
    }
}

function set_current_component(component) {
    exports.current_component = component;
}
function get_current_component() {
    if (!exports.current_component)
        throw new Error('Function called outside component initialization');
    return exports.current_component;
}
function beforeUpdate(fn) {
    get_current_component().$$.before_update.push(fn);
}
function onMount(fn) {
    get_current_component().$$.on_mount.push(fn);
}
function afterUpdate(fn) {
    get_current_component().$$.after_update.push(fn);
}
function onDestroy(fn) {
    get_current_component().$$.on_destroy.push(fn);
}
function createEventDispatcher() {
    const component = get_current_component();
    return (type, detail) => {
        const callbacks = component.$$.callbacks[type];
        if (callbacks) {
            // TODO are there situations where events could be dispatched
            // in a server (non-DOM) environment?
            const event = custom_event(type, detail);
            callbacks.slice().forEach(fn => {
                fn.call(component, event);
            });
        }
    };
}
function setContext(key, context) {
    get_current_component().$$.context.set(key, context);
}
function getContext(key) {
    return get_current_component().$$.context.get(key);
}
function getAllContexts() {
    return get_current_component().$$.context;
}
function hasContext(key) {
    return get_current_component().$$.context.has(key);
}
// TODO figure out if we still want to support
// shorthand events, or if we want to implement
// a real bubbling mechanism
function bubble(component, event) {
    const callbacks = component.$$.callbacks[event.type];
    if (callbacks) {
        // @ts-ignore
        callbacks.slice().forEach(fn => fn.call(this, event));
    }
}

const dirty_components = [];
const intros = { enabled: false };
const binding_callbacks = [];
const render_callbacks = [];
const flush_callbacks = [];
const resolved_promise = Promise.resolve();
let update_scheduled = false;
function schedule_update() {
    if (!update_scheduled) {
        update_scheduled = true;
        resolved_promise.then(flush);
    }
}
function tick() {
    schedule_update();
    return resolved_promise;
}
function add_render_callback(fn) {
    render_callbacks.push(fn);
}
function add_flush_callback(fn) {
    flush_callbacks.push(fn);
}
let flushing = false;
const seen_callbacks = new Set();
function flush() {
    if (flushing)
        return;
    flushing = true;
    do {
        // first, call beforeUpdate functions
        // and update components
        for (let i = 0; i < dirty_components.length; i += 1) {
            const component = dirty_components[i];
            set_current_component(component);
            update(component.$$);
        }
        set_current_component(null);
        dirty_components.length = 0;
        while (binding_callbacks.length)
            binding_callbacks.pop()();
        // then, once components are updated, call
        // afterUpdate functions. This may cause
        // subsequent updates...
        for (let i = 0; i < render_callbacks.length; i += 1) {
            const callback = render_callbacks[i];
            if (!seen_callbacks.has(callback)) {
                // ...so guard against infinite loops
                seen_callbacks.add(callback);
                callback();
            }
        }
        render_callbacks.length = 0;
    } while (dirty_components.length);
    while (flush_callbacks.length) {
        flush_callbacks.pop()();
    }
    update_scheduled = false;
    flushing = false;
    seen_callbacks.clear();
}
function update($$) {
    if ($$.fragment !== null) {
        $$.update();
        run_all($$.before_update);
        const dirty = $$.dirty;
        $$.dirty = [-1];
        $$.fragment && $$.fragment.p($$.ctx, dirty);
        $$.after_update.forEach(add_render_callback);
    }
}

let promise;
function wait() {
    if (!promise) {
        promise = Promise.resolve();
        promise.then(() => {
            promise = null;
        });
    }
    return promise;
}
function dispatch(node, direction, kind) {
    node.dispatchEvent(custom_event(`${direction ? 'intro' : 'outro'}${kind}`));
}
const outroing = new Set();
let outros;
function group_outros() {
    outros = {
        r: 0,
        c: [],
        p: outros // parent group
    };
}
function check_outros() {
    if (!outros.r) {
        run_all(outros.c);
    }
    outros = outros.p;
}
function transition_in(block, local) {
    if (block && block.i) {
        outroing.delete(block);
        block.i(local);
    }
}
function transition_out(block, local, detach, callback) {
    if (block && block.o) {
        if (outroing.has(block))
            return;
        outroing.add(block);
        outros.c.push(() => {
            outroing.delete(block);
            if (callback) {
                if (detach)
                    block.d(1);
                callback();
            }
        });
        block.o(local);
    }
}
const null_transition = { duration: 0 };
function create_in_transition(node, fn, params) {
    let config = fn(node, params);
    let running = false;
    let animation_name;
    let task;
    let uid = 0;
    function cleanup() {
        if (animation_name)
            delete_rule(node, animation_name);
    }
    function go() {
        const { delay = 0, duration = 300, easing = identity, tick = noop, css } = config || null_transition;
        if (css)
            animation_name = create_rule(node, 0, 1, duration, delay, easing, css, uid++);
        tick(0, 1);
        const start_time = exports.now() + delay;
        const end_time = start_time + duration;
        if (task)
            task.abort();
        running = true;
        add_render_callback(() => dispatch(node, true, 'start'));
        task = loop(now => {
            if (running) {
                if (now >= end_time) {
                    tick(1, 0);
                    dispatch(node, true, 'end');
                    cleanup();
                    return running = false;
                }
                if (now >= start_time) {
                    const t = easing((now - start_time) / duration);
                    tick(t, 1 - t);
                }
            }
            return running;
        });
    }
    let started = false;
    return {
        start() {
            if (started)
                return;
            started = true;
            delete_rule(node);
            if (is_function(config)) {
                config = config();
                wait().then(go);
            }
            else {
                go();
            }
        },
        invalidate() {
            started = false;
        },
        end() {
            if (running) {
                cleanup();
                running = false;
            }
        }
    };
}
function create_out_transition(node, fn, params) {
    let config = fn(node, params);
    let running = true;
    let animation_name;
    const group = outros;
    group.r += 1;
    function go() {
        const { delay = 0, duration = 300, easing = identity, tick = noop, css } = config || null_transition;
        if (css)
            animation_name = create_rule(node, 1, 0, duration, delay, easing, css);
        const start_time = exports.now() + delay;
        const end_time = start_time + duration;
        add_render_callback(() => dispatch(node, false, 'start'));
        loop(now => {
            if (running) {
                if (now >= end_time) {
                    tick(0, 1);
                    dispatch(node, false, 'end');
                    if (!--group.r) {
                        // this will result in `end()` being called,
                        // so we don't need to clean up here
                        run_all(group.c);
                    }
                    return false;
                }
                if (now >= start_time) {
                    const t = easing((now - start_time) / duration);
                    tick(1 - t, t);
                }
            }
            return running;
        });
    }
    if (is_function(config)) {
        wait().then(() => {
            // @ts-ignore
            config = config();
            go();
        });
    }
    else {
        go();
    }
    return {
        end(reset) {
            if (reset && config.tick) {
                config.tick(1, 0);
            }
            if (running) {
                if (animation_name)
                    delete_rule(node, animation_name);
                running = false;
            }
        }
    };
}
function create_bidirectional_transition(node, fn, params, intro) {
    let config = fn(node, params);
    let t = intro ? 0 : 1;
    let running_program = null;
    let pending_program = null;
    let animation_name = null;
    function clear_animation() {
        if (animation_name)
            delete_rule(node, animation_name);
    }
    function init(program, duration) {
        const d = (program.b - t);
        duration *= Math.abs(d);
        return {
            a: t,
            b: program.b,
            d,
            duration,
            start: program.start,
            end: program.start + duration,
            group: program.group
        };
    }
    function go(b) {
        const { delay = 0, duration = 300, easing = identity, tick = noop, css } = config || null_transition;
        const program = {
            start: exports.now() + delay,
            b
        };
        if (!b) {
            // @ts-ignore todo: improve typings
            program.group = outros;
            outros.r += 1;
        }
        if (running_program || pending_program) {
            pending_program = program;
        }
        else {
            // if this is an intro, and there's a delay, we need to do
            // an initial tick and/or apply CSS animation immediately
            if (css) {
                clear_animation();
                animation_name = create_rule(node, t, b, duration, delay, easing, css);
            }
            if (b)
                tick(0, 1);
            running_program = init(program, duration);
            add_render_callback(() => dispatch(node, b, 'start'));
            loop(now => {
                if (pending_program && now > pending_program.start) {
                    running_program = init(pending_program, duration);
                    pending_program = null;
                    dispatch(node, running_program.b, 'start');
                    if (css) {
                        clear_animation();
                        animation_name = create_rule(node, t, running_program.b, running_program.duration, 0, easing, config.css);
                    }
                }
                if (running_program) {
                    if (now >= running_program.end) {
                        tick(t = running_program.b, 1 - t);
                        dispatch(node, running_program.b, 'end');
                        if (!pending_program) {
                            // we're done
                            if (running_program.b) {
                                // intro — we can tidy up immediately
                                clear_animation();
                            }
                            else {
                                // outro — needs to be coordinated
                                if (!--running_program.group.r)
                                    run_all(running_program.group.c);
                            }
                        }
                        running_program = null;
                    }
                    else if (now >= running_program.start) {
                        const p = now - running_program.start;
                        t = running_program.a + running_program.d * easing(p / running_program.duration);
                        tick(t, 1 - t);
                    }
                }
                return !!(running_program || pending_program);
            });
        }
    }
    return {
        run(b) {
            if (is_function(config)) {
                wait().then(() => {
                    // @ts-ignore
                    config = config();
                    go(b);
                });
            }
            else {
                go(b);
            }
        },
        end() {
            clear_animation();
            running_program = pending_program = null;
        }
    };
}

function handle_promise(promise, info) {
    const token = info.token = {};
    function update(type, index, key, value) {
        if (info.token !== token)
            return;
        info.resolved = value;
        let child_ctx = info.ctx;
        if (key !== undefined) {
            child_ctx = child_ctx.slice();
            child_ctx[key] = value;
        }
        const block = type && (info.current = type)(child_ctx);
        let needs_flush = false;
        if (info.block) {
            if (info.blocks) {
                info.blocks.forEach((block, i) => {
                    if (i !== index && block) {
                        group_outros();
                        transition_out(block, 1, 1, () => {
                            if (info.blocks[i] === block) {
                                info.blocks[i] = null;
                            }
                        });
                        check_outros();
                    }
                });
            }
            else {
                info.block.d(1);
            }
            block.c();
            transition_in(block, 1);
            block.m(info.mount(), info.anchor);
            needs_flush = true;
        }
        info.block = block;
        if (info.blocks)
            info.blocks[index] = block;
        if (needs_flush) {
            flush();
        }
    }
    if (is_promise(promise)) {
        const current_component = get_current_component();
        promise.then(value => {
            set_current_component(current_component);
            update(info.then, 1, info.value, value);
            set_current_component(null);
        }, error => {
            set_current_component(current_component);
            update(info.catch, 2, info.error, error);
            set_current_component(null);
            if (!info.hasCatch) {
                throw error;
            }
        });
        // if we previously had a then/catch block, destroy it
        if (info.current !== info.pending) {
            update(info.pending, 0);
            return true;
        }
    }
    else {
        if (info.current !== info.then) {
            update(info.then, 1, info.value, promise);
            return true;
        }
        info.resolved = promise;
    }
}
function update_await_block_branch(info, ctx, dirty) {
    const child_ctx = ctx.slice();
    const { resolved } = info;
    if (info.current === info.then) {
        child_ctx[info.value] = resolved;
    }
    if (info.current === info.catch) {
        child_ctx[info.error] = resolved;
    }
    info.block.p(child_ctx, dirty);
}

const globals = (typeof window !== 'undefined'
    ? window
    : typeof globalThis !== 'undefined'
        ? globalThis
        : global);

function destroy_block(block, lookup) {
    block.d(1);
    lookup.delete(block.key);
}
function outro_and_destroy_block(block, lookup) {
    transition_out(block, 1, 1, () => {
        lookup.delete(block.key);
    });
}
function fix_and_destroy_block(block, lookup) {
    block.f();
    destroy_block(block, lookup);
}
function fix_and_outro_and_destroy_block(block, lookup) {
    block.f();
    outro_and_destroy_block(block, lookup);
}
function update_keyed_each(old_blocks, dirty, get_key, dynamic, ctx, list, lookup, node, destroy, create_each_block, next, get_context) {
    let o = old_blocks.length;
    let n = list.length;
    let i = o;
    const old_indexes = {};
    while (i--)
        old_indexes[old_blocks[i].key] = i;
    const new_blocks = [];
    const new_lookup = new Map();
    const deltas = new Map();
    i = n;
    while (i--) {
        const child_ctx = get_context(ctx, list, i);
        const key = get_key(child_ctx);
        let block = lookup.get(key);
        if (!block) {
            block = create_each_block(key, child_ctx);
            block.c();
        }
        else if (dynamic) {
            block.p(child_ctx, dirty);
        }
        new_lookup.set(key, new_blocks[i] = block);
        if (key in old_indexes)
            deltas.set(key, Math.abs(i - old_indexes[key]));
    }
    const will_move = new Set();
    const did_move = new Set();
    function insert(block) {
        transition_in(block, 1);
        block.m(node, next);
        lookup.set(block.key, block);
        next = block.first;
        n--;
    }
    while (o && n) {
        const new_block = new_blocks[n - 1];
        const old_block = old_blocks[o - 1];
        const new_key = new_block.key;
        const old_key = old_block.key;
        if (new_block === old_block) {
            // do nothing
            next = new_block.first;
            o--;
            n--;
        }
        else if (!new_lookup.has(old_key)) {
            // remove old block
            destroy(old_block, lookup);
            o--;
        }
        else if (!lookup.has(new_key) || will_move.has(new_key)) {
            insert(new_block);
        }
        else if (did_move.has(old_key)) {
            o--;
        }
        else if (deltas.get(new_key) > deltas.get(old_key)) {
            did_move.add(new_key);
            insert(new_block);
        }
        else {
            will_move.add(old_key);
            o--;
        }
    }
    while (o--) {
        const old_block = old_blocks[o];
        if (!new_lookup.has(old_block.key))
            destroy(old_block, lookup);
    }
    while (n)
        insert(new_blocks[n - 1]);
    return new_blocks;
}
function validate_each_keys(ctx, list, get_context, get_key) {
    const keys = new Set();
    for (let i = 0; i < list.length; i++) {
        const key = get_key(get_context(ctx, list, i));
        if (keys.has(key)) {
            throw new Error('Cannot have duplicate keys in a keyed each');
        }
        keys.add(key);
    }
}

function get_spread_update(levels, updates) {
    const update = {};
    const to_null_out = {};
    const accounted_for = { $$scope: 1 };
    let i = levels.length;
    while (i--) {
        const o = levels[i];
        const n = updates[i];
        if (n) {
            for (const key in o) {
                if (!(key in n))
                    to_null_out[key] = 1;
            }
            for (const key in n) {
                if (!accounted_for[key]) {
                    update[key] = n[key];
                    accounted_for[key] = 1;
                }
            }
            levels[i] = n;
        }
        else {
            for (const key in o) {
                accounted_for[key] = 1;
            }
        }
    }
    for (const key in to_null_out) {
        if (!(key in update))
            update[key] = undefined;
    }
    return update;
}
function get_spread_object(spread_props) {
    return typeof spread_props === 'object' && spread_props !== null ? spread_props : {};
}

// source: https://html.spec.whatwg.org/multipage/indices.html
const boolean_attributes = new Set([
    'allowfullscreen',
    'allowpaymentrequest',
    'async',
    'autofocus',
    'autoplay',
    'checked',
    'controls',
    'default',
    'defer',
    'disabled',
    'formnovalidate',
    'hidden',
    'ismap',
    'loop',
    'multiple',
    'muted',
    'nomodule',
    'novalidate',
    'open',
    'playsinline',
    'readonly',
    'required',
    'reversed',
    'selected'
]);

const invalid_attribute_name_character = /[\s'">/=\u{FDD0}-\u{FDEF}\u{FFFE}\u{FFFF}\u{1FFFE}\u{1FFFF}\u{2FFFE}\u{2FFFF}\u{3FFFE}\u{3FFFF}\u{4FFFE}\u{4FFFF}\u{5FFFE}\u{5FFFF}\u{6FFFE}\u{6FFFF}\u{7FFFE}\u{7FFFF}\u{8FFFE}\u{8FFFF}\u{9FFFE}\u{9FFFF}\u{AFFFE}\u{AFFFF}\u{BFFFE}\u{BFFFF}\u{CFFFE}\u{CFFFF}\u{DFFFE}\u{DFFFF}\u{EFFFE}\u{EFFFF}\u{FFFFE}\u{FFFFF}\u{10FFFE}\u{10FFFF}]/u;
// https://html.spec.whatwg.org/multipage/syntax.html#attributes-2
// https://infra.spec.whatwg.org/#noncharacter
function spread(args, classes_to_add) {
    const attributes = Object.assign({}, ...args);
    if (classes_to_add) {
        if (attributes.class == null) {
            attributes.class = classes_to_add;
        }
        else {
            attributes.class += ' ' + classes_to_add;
        }
    }
    let str = '';
    Object.keys(attributes).forEach(name => {
        if (invalid_attribute_name_character.test(name))
            return;
        const value = attributes[name];
        if (value === true)
            str += ' ' + name;
        else if (boolean_attributes.has(name.toLowerCase())) {
            if (value)
                str += ' ' + name;
        }
        else if (value != null) {
            str += ` ${name}="${value}"`;
        }
    });
    return str;
}
const escaped = {
    '"': '&quot;',
    "'": '&#39;',
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;'
};
function escape(html) {
    return String(html).replace(/["'&<>]/g, match => escaped[match]);
}
function escape_attribute_value(value) {
    return typeof value === 'string' ? escape(value) : value;
}
function escape_object(obj) {
    const result = {};
    for (const key in obj) {
        result[key] = escape_attribute_value(obj[key]);
    }
    return result;
}
function each(items, fn) {
    let str = '';
    for (let i = 0; i < items.length; i += 1) {
        str += fn(items[i], i);
    }
    return str;
}
const missing_component = {
    $$render: () => ''
};
function validate_component(component, name) {
    if (!component || !component.$$render) {
        if (name === 'svelte:component')
            name += ' this={...}';
        throw new Error(`<${name}> is not a valid SSR component. You may need to review your build config to ensure that dependencies are compiled, rather than imported as pre-compiled modules`);
    }
    return component;
}
function debug(file, line, column, values) {
    console.log(`{@debug} ${file ? file + ' ' : ''}(${line}:${column})`); // eslint-disable-line no-console
    console.log(values); // eslint-disable-line no-console
    return '';
}
let on_destroy;
function create_ssr_component(fn) {
    function $$render(result, props, bindings, slots, context) {
        const parent_component = exports.current_component;
        const $$ = {
            on_destroy,
            context: new Map(parent_component ? parent_component.$$.context : context || []),
            // these will be immediately discarded
            on_mount: [],
            before_update: [],
            after_update: [],
            callbacks: blank_object()
        };
        set_current_component({ $$ });
        const html = fn(result, props, bindings, slots);
        set_current_component(parent_component);
        return html;
    }
    return {
        render: (props = {}, { $$slots = {}, context = new Map() } = {}) => {
            on_destroy = [];
            const result = { title: '', head: '', css: new Set() };
            const html = $$render(result, props, {}, $$slots, context);
            run_all(on_destroy);
            return {
                html,
                css: {
                    code: Array.from(result.css).map(css => css.code).join('\n'),
                    map: null // TODO
                },
                head: result.title + result.head
            };
        },
        $$render
    };
}
function add_attribute(name, value, boolean) {
    if (value == null || (boolean && !value))
        return '';
    return ` ${name}${value === true ? '' : `=${typeof value === 'string' ? JSON.stringify(escape(value)) : `"${value}"`}`}`;
}
function add_classes(classes) {
    return classes ? ` class="${classes}"` : '';
}

function bind(component, name, callback) {
    const index = component.$$.props[name];
    if (index !== undefined) {
        component.$$.bound[index] = callback;
        callback(component.$$.ctx[index]);
    }
}
function create_component(block) {
    block && block.c();
}
function claim_component(block, parent_nodes) {
    block && block.l(parent_nodes);
}
function mount_component(component, target, anchor, customElement) {
    const { fragment, on_mount, on_destroy, after_update } = component.$$;
    fragment && fragment.m(target, anchor);
    if (!customElement) {
        // onMount happens before the initial afterUpdate
        add_render_callback(() => {
            const new_on_destroy = on_mount.map(run).filter(is_function);
            if (on_destroy) {
                on_destroy.push(...new_on_destroy);
            }
            else {
                // Edge case - component was destroyed immediately,
                // most likely as a result of a binding initialising
                run_all(new_on_destroy);
            }
            component.$$.on_mount = [];
        });
    }
    after_update.forEach(add_render_callback);
}
function destroy_component(component, detaching) {
    const $$ = component.$$;
    if ($$.fragment !== null) {
        run_all($$.on_destroy);
        $$.fragment && $$.fragment.d(detaching);
        // TODO null out other refs, including component.$$ (but need to
        // preserve final state?)
        $$.on_destroy = $$.fragment = null;
        $$.ctx = [];
    }
}
function make_dirty(component, i) {
    if (component.$$.dirty[0] === -1) {
        dirty_components.push(component);
        schedule_update();
        component.$$.dirty.fill(0);
    }
    component.$$.dirty[(i / 31) | 0] |= (1 << (i % 31));
}
function init(component, options, instance, create_fragment, not_equal, props, append_styles, dirty = [-1]) {
    const parent_component = exports.current_component;
    set_current_component(component);
    const $$ = component.$$ = {
        fragment: null,
        ctx: null,
        // state
        props,
        update: noop,
        not_equal,
        bound: blank_object(),
        // lifecycle
        on_mount: [],
        on_destroy: [],
        on_disconnect: [],
        before_update: [],
        after_update: [],
        context: new Map(parent_component ? parent_component.$$.context : options.context || []),
        // everything else
        callbacks: blank_object(),
        dirty,
        skip_bound: false,
        root: options.target || parent_component.$$.root
    };
    append_styles && append_styles($$.root);
    let ready = false;
    $$.ctx = instance
        ? instance(component, options.props || {}, (i, ret, ...rest) => {
            const value = rest.length ? rest[0] : ret;
            if ($$.ctx && not_equal($$.ctx[i], $$.ctx[i] = value)) {
                if (!$$.skip_bound && $$.bound[i])
                    $$.bound[i](value);
                if (ready)
                    make_dirty(component, i);
            }
            return ret;
        })
        : [];
    $$.update();
    ready = true;
    run_all($$.before_update);
    // `false` as a special case of no DOM component
    $$.fragment = create_fragment ? create_fragment($$.ctx) : false;
    if (options.target) {
        if (options.hydrate) {
            start_hydrating();
            const nodes = children(options.target);
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            $$.fragment && $$.fragment.l(nodes);
            nodes.forEach(detach);
        }
        else {
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            $$.fragment && $$.fragment.c();
        }
        if (options.intro)
            transition_in(component.$$.fragment);
        mount_component(component, options.target, options.anchor, options.customElement);
        end_hydrating();
        flush();
    }
    set_current_component(parent_component);
}
if (typeof HTMLElement === 'function') {
    exports.SvelteElement = class extends HTMLElement {
        constructor() {
            super();
            this.attachShadow({ mode: 'open' });
        }
        connectedCallback() {
            const { on_mount } = this.$$;
            this.$$.on_disconnect = on_mount.map(run).filter(is_function);
            // @ts-ignore todo: improve typings
            for (const key in this.$$.slotted) {
                // @ts-ignore todo: improve typings
                this.appendChild(this.$$.slotted[key]);
            }
        }
        attributeChangedCallback(attr, _oldValue, newValue) {
            this[attr] = newValue;
        }
        disconnectedCallback() {
            run_all(this.$$.on_disconnect);
        }
        $destroy() {
            destroy_component(this, 1);
            this.$destroy = noop;
        }
        $on(type, callback) {
            // TODO should this delegate to addEventListener?
            const callbacks = (this.$$.callbacks[type] || (this.$$.callbacks[type] = []));
            callbacks.push(callback);
            return () => {
                const index = callbacks.indexOf(callback);
                if (index !== -1)
                    callbacks.splice(index, 1);
            };
        }
        $set($$props) {
            if (this.$$set && !is_empty($$props)) {
                this.$$.skip_bound = true;
                this.$$set($$props);
                this.$$.skip_bound = false;
            }
        }
    };
}
/**
 * Base class for Svelte components. Used when dev=false.
 */
class SvelteComponent {
    $destroy() {
        destroy_component(this, 1);
        this.$destroy = noop;
    }
    $on(type, callback) {
        const callbacks = (this.$$.callbacks[type] || (this.$$.callbacks[type] = []));
        callbacks.push(callback);
        return () => {
            const index = callbacks.indexOf(callback);
            if (index !== -1)
                callbacks.splice(index, 1);
        };
    }
    $set($$props) {
        if (this.$$set && !is_empty($$props)) {
            this.$$.skip_bound = true;
            this.$$set($$props);
            this.$$.skip_bound = false;
        }
    }
}

function dispatch_dev(type, detail) {
    document.dispatchEvent(custom_event(type, Object.assign({ version: '3.42.4' }, detail), true));
}
function append_dev(target, node) {
    dispatch_dev('SvelteDOMInsert', { target, node });
    append(target, node);
}
function append_hydration_dev(target, node) {
    dispatch_dev('SvelteDOMInsert', { target, node });
    append_hydration(target, node);
}
function insert_dev(target, node, anchor) {
    dispatch_dev('SvelteDOMInsert', { target, node, anchor });
    insert(target, node, anchor);
}
function insert_hydration_dev(target, node, anchor) {
    dispatch_dev('SvelteDOMInsert', { target, node, anchor });
    insert_hydration(target, node, anchor);
}
function detach_dev(node) {
    dispatch_dev('SvelteDOMRemove', { node });
    detach(node);
}
function detach_between_dev(before, after) {
    while (before.nextSibling && before.nextSibling !== after) {
        detach_dev(before.nextSibling);
    }
}
function detach_before_dev(after) {
    while (after.previousSibling) {
        detach_dev(after.previousSibling);
    }
}
function detach_after_dev(before) {
    while (before.nextSibling) {
        detach_dev(before.nextSibling);
    }
}
function listen_dev(node, event, handler, options, has_prevent_default, has_stop_propagation) {
    const modifiers = options === true ? ['capture'] : options ? Array.from(Object.keys(options)) : [];
    if (has_prevent_default)
        modifiers.push('preventDefault');
    if (has_stop_propagation)
        modifiers.push('stopPropagation');
    dispatch_dev('SvelteDOMAddEventListener', { node, event, handler, modifiers });
    const dispose = listen(node, event, handler, options);
    return () => {
        dispatch_dev('SvelteDOMRemoveEventListener', { node, event, handler, modifiers });
        dispose();
    };
}
function attr_dev(node, attribute, value) {
    attr(node, attribute, value);
    if (value == null)
        dispatch_dev('SvelteDOMRemoveAttribute', { node, attribute });
    else
        dispatch_dev('SvelteDOMSetAttribute', { node, attribute, value });
}
function prop_dev(node, property, value) {
    node[property] = value;
    dispatch_dev('SvelteDOMSetProperty', { node, property, value });
}
function dataset_dev(node, property, value) {
    node.dataset[property] = value;
    dispatch_dev('SvelteDOMSetDataset', { node, property, value });
}
function set_data_dev(text, data) {
    data = '' + data;
    if (text.wholeText === data)
        return;
    dispatch_dev('SvelteDOMSetData', { node: text, data });
    text.data = data;
}
function validate_each_argument(arg) {
    if (typeof arg !== 'string' && !(arg && typeof arg === 'object' && 'length' in arg)) {
        let msg = '{#each} only iterates over array-like objects.';
        if (typeof Symbol === 'function' && arg && Symbol.iterator in arg) {
            msg += ' You can use a spread to convert this iterable into an array.';
        }
        throw new Error(msg);
    }
}
function validate_slots(name, slot, keys) {
    for (const slot_key of Object.keys(slot)) {
        if (!~keys.indexOf(slot_key)) {
            console.warn(`<${name}> received an unexpected slot "${slot_key}".`);
        }
    }
}
/**
 * Base class for Svelte components with some minor dev-enhancements. Used when dev=true.
 */
class SvelteComponentDev extends SvelteComponent {
    constructor(options) {
        if (!options || (!options.target && !options.$$inline)) {
            throw new Error("'target' is a required option");
        }
        super();
    }
    $destroy() {
        super.$destroy();
        this.$destroy = () => {
            console.warn('Component was already destroyed'); // eslint-disable-line no-console
        };
    }
    $capture_state() { }
    $inject_state() { }
}
/**
 * Base class to create strongly typed Svelte components.
 * This only exists for typing purposes and should be used in `.d.ts` files.
 *
 * ### Example:
 *
 * You have component library on npm called `component-library`, from which
 * you export a component called `MyComponent`. For Svelte+TypeScript users,
 * you want to provide typings. Therefore you create a `index.d.ts`:
 * ```ts
 * import { SvelteComponentTyped } from "svelte";
 * export class MyComponent extends SvelteComponentTyped<{foo: string}> {}
 * ```
 * Typing this makes it possible for IDEs like VS Code with the Svelte extension
 * to provide intellisense and to use the component like this in a Svelte file
 * with TypeScript:
 * ```svelte
 * <script lang="ts">
 * 	import { MyComponent } from "component-library";
 * </script>
 * <MyComponent foo={'bar'} />
 * ```
 *
 * #### Why not make this part of `SvelteComponent(Dev)`?
 * Because
 * ```ts
 * class ASubclassOfSvelteComponent extends SvelteComponent<{foo: string}> {}
 * const component: typeof SvelteComponent = ASubclassOfSvelteComponent;
 * ```
 * will throw a type error, so we need to separate the more strictly typed class.
 */
class SvelteComponentTyped extends SvelteComponentDev {
    constructor(options) {
        super(options);
    }
}
function loop_guard(timeout) {
    const start = Date.now();
    return () => {
        if (Date.now() - start > timeout) {
            throw new Error('Infinite loop detected');
        }
    };
}

exports.HtmlTag = HtmlTag;
exports.HtmlTagHydration = HtmlTagHydration;
exports.SvelteComponent = SvelteComponent;
exports.SvelteComponentDev = SvelteComponentDev;
exports.SvelteComponentTyped = SvelteComponentTyped;
exports.action_destroyer = action_destroyer;
exports.add_attribute = add_attribute;
exports.add_classes = add_classes;
exports.add_flush_callback = add_flush_callback;
exports.add_location = add_location;
exports.add_render_callback = add_render_callback;
exports.add_resize_listener = add_resize_listener;
exports.add_transform = add_transform;
exports.afterUpdate = afterUpdate;
exports.append = append;
exports.append_dev = append_dev;
exports.append_empty_stylesheet = append_empty_stylesheet;
exports.append_hydration = append_hydration;
exports.append_hydration_dev = append_hydration_dev;
exports.append_styles = append_styles;
exports.assign = assign;
exports.attr = attr;
exports.attr_dev = attr_dev;
exports.attribute_to_object = attribute_to_object;
exports.beforeUpdate = beforeUpdate;
exports.bind = bind;
exports.binding_callbacks = binding_callbacks;
exports.blank_object = blank_object;
exports.bubble = bubble;
exports.check_outros = check_outros;
exports.children = children;
exports.claim_component = claim_component;
exports.claim_element = claim_element;
exports.claim_html_tag = claim_html_tag;
exports.claim_space = claim_space;
exports.claim_svg_element = claim_svg_element;
exports.claim_text = claim_text;
exports.clear_loops = clear_loops;
exports.component_subscribe = component_subscribe;
exports.compute_rest_props = compute_rest_props;
exports.compute_slots = compute_slots;
exports.createEventDispatcher = createEventDispatcher;
exports.create_animation = create_animation;
exports.create_bidirectional_transition = create_bidirectional_transition;
exports.create_component = create_component;
exports.create_in_transition = create_in_transition;
exports.create_out_transition = create_out_transition;
exports.create_slot = create_slot;
exports.create_ssr_component = create_ssr_component;
exports.custom_event = custom_event;
exports.dataset_dev = dataset_dev;
exports.debug = debug;
exports.destroy_block = destroy_block;
exports.destroy_component = destroy_component;
exports.destroy_each = destroy_each;
exports.detach = detach;
exports.detach_after_dev = detach_after_dev;
exports.detach_before_dev = detach_before_dev;
exports.detach_between_dev = detach_between_dev;
exports.detach_dev = detach_dev;
exports.dirty_components = dirty_components;
exports.dispatch_dev = dispatch_dev;
exports.each = each;
exports.element = element;
exports.element_is = element_is;
exports.empty = empty;
exports.end_hydrating = end_hydrating;
exports.escape = escape;
exports.escape_attribute_value = escape_attribute_value;
exports.escape_object = escape_object;
exports.escaped = escaped;
exports.exclude_internal_props = exclude_internal_props;
exports.fix_and_destroy_block = fix_and_destroy_block;
exports.fix_and_outro_and_destroy_block = fix_and_outro_and_destroy_block;
exports.fix_position = fix_position;
exports.flush = flush;
exports.getAllContexts = getAllContexts;
exports.getContext = getContext;
exports.get_all_dirty_from_scope = get_all_dirty_from_scope;
exports.get_binding_group_value = get_binding_group_value;
exports.get_current_component = get_current_component;
exports.get_custom_elements_slots = get_custom_elements_slots;
exports.get_root_for_style = get_root_for_style;
exports.get_slot_changes = get_slot_changes;
exports.get_spread_object = get_spread_object;
exports.get_spread_update = get_spread_update;
exports.get_store_value = get_store_value;
exports.globals = globals;
exports.group_outros = group_outros;
exports.handle_promise = handle_promise;
exports.hasContext = hasContext;
exports.has_prop = has_prop;
exports.identity = identity;
exports.init = init;
exports.insert = insert;
exports.insert_dev = insert_dev;
exports.insert_hydration = insert_hydration;
exports.insert_hydration_dev = insert_hydration_dev;
exports.intros = intros;
exports.invalid_attribute_name_character = invalid_attribute_name_character;
exports.is_client = is_client;
exports.is_crossorigin = is_crossorigin;
exports.is_empty = is_empty;
exports.is_function = is_function;
exports.is_promise = is_promise;
exports.listen = listen;
exports.listen_dev = listen_dev;
exports.loop = loop;
exports.loop_guard = loop_guard;
exports.missing_component = missing_component;
exports.mount_component = mount_component;
exports.noop = noop;
exports.not_equal = not_equal;
exports.null_to_empty = null_to_empty;
exports.object_without_properties = object_without_properties;
exports.onDestroy = onDestroy;
exports.onMount = onMount;
exports.once = once;
exports.outro_and_destroy_block = outro_and_destroy_block;
exports.prevent_default = prevent_default;
exports.prop_dev = prop_dev;
exports.query_selector_all = query_selector_all;
exports.run = run;
exports.run_all = run_all;
exports.safe_not_equal = safe_not_equal;
exports.schedule_update = schedule_update;
exports.select_multiple_value = select_multiple_value;
exports.select_option = select_option;
exports.select_options = select_options;
exports.select_value = select_value;
exports.self = self;
exports.setContext = setContext;
exports.set_attributes = set_attributes;
exports.set_current_component = set_current_component;
exports.set_custom_element_data = set_custom_element_data;
exports.set_data = set_data;
exports.set_data_dev = set_data_dev;
exports.set_input_type = set_input_type;
exports.set_input_value = set_input_value;
exports.set_now = set_now;
exports.set_raf = set_raf;
exports.set_store_value = set_store_value;
exports.set_style = set_style;
exports.set_svg_attributes = set_svg_attributes;
exports.space = space;
exports.spread = spread;
exports.src_url_equal = src_url_equal;
exports.start_hydrating = start_hydrating;
exports.stop_propagation = stop_propagation;
exports.subscribe = subscribe;
exports.svg_element = svg_element;
exports.text = text;
exports.tick = tick;
exports.time_ranges_to_array = time_ranges_to_array;
exports.to_number = to_number;
exports.toggle_class = toggle_class;
exports.transition_in = transition_in;
exports.transition_out = transition_out;
exports.trusted = trusted;
exports.update_await_block_branch = update_await_block_branch;
exports.update_keyed_each = update_keyed_each;
exports.update_slot = update_slot;
exports.update_slot_base = update_slot_base;
exports.validate_component = validate_component;
exports.validate_each_argument = validate_each_argument;
exports.validate_each_keys = validate_each_keys;
exports.validate_slots = validate_slots;
exports.validate_store = validate_store;
exports.xlink_attr = xlink_attr;

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"package.json":function module(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// node_modules/svelte/package.json                                                                                    //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
module.exports = {
  "name": "svelte",
  "version": "3.42.4",
  "main": "index",
  "module": "index.mjs"
};

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"index.js":function module(require,exports){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// node_modules/svelte/index.js                                                                                        //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var internal = require('./internal/index.js');



Object.defineProperty(exports, 'SvelteComponent', {
	enumerable: true,
	get: function () {
		return internal.SvelteComponentDev;
	}
});
Object.defineProperty(exports, 'SvelteComponentTyped', {
	enumerable: true,
	get: function () {
		return internal.SvelteComponentTyped;
	}
});
Object.defineProperty(exports, 'afterUpdate', {
	enumerable: true,
	get: function () {
		return internal.afterUpdate;
	}
});
Object.defineProperty(exports, 'beforeUpdate', {
	enumerable: true,
	get: function () {
		return internal.beforeUpdate;
	}
});
Object.defineProperty(exports, 'createEventDispatcher', {
	enumerable: true,
	get: function () {
		return internal.createEventDispatcher;
	}
});
Object.defineProperty(exports, 'getAllContexts', {
	enumerable: true,
	get: function () {
		return internal.getAllContexts;
	}
});
Object.defineProperty(exports, 'getContext', {
	enumerable: true,
	get: function () {
		return internal.getContext;
	}
});
Object.defineProperty(exports, 'hasContext', {
	enumerable: true,
	get: function () {
		return internal.hasContext;
	}
});
Object.defineProperty(exports, 'onDestroy', {
	enumerable: true,
	get: function () {
		return internal.onDestroy;
	}
});
Object.defineProperty(exports, 'onMount', {
	enumerable: true,
	get: function () {
		return internal.onMount;
	}
});
Object.defineProperty(exports, 'setContext', {
	enumerable: true,
	get: function () {
		return internal.setContext;
	}
});
Object.defineProperty(exports, 'tick', {
	enumerable: true,
	get: function () {
		return internal.tick;
	}
});

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"meteor-node-stubs":{"package.json":function module(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// node_modules/meteor-node-stubs/package.json                                                                         //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
module.exports = {
  "name": "meteor-node-stubs",
  "version": "1.1.0",
  "main": "index.js"
};

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"index.js":function module(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// node_modules/meteor-node-stubs/index.js                                                                             //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
var map = require("./map.json");
var meteorAliases = {};

Object.keys(map).forEach(function (id) {
  if (typeof map[id] === "string") {
    var aliasParts = module.id.split("/");
    aliasParts.pop();
    aliasParts.push("node_modules", map[id]);
    exports[id] = meteorAliases[id + ".js"] =
      aliasParts.join("/");
  } else {
    exports[id] = map[id];
    meteorAliases[id + ".js"] = function(){};
  }
});

if (typeof meteorInstall === "function") {
  meteorInstall({
    // Install the aliases into a node_modules directory one level up from
    // the root directory, so that they do not clutter the namespace
    // available to apps and packages.
    "..": {
      node_modules: meteorAliases
    }
  });
}

// If Buffer is not defined globally, but the "buffer" built-in stub is
// installed and can be imported, use it to define global.Buffer so that
// modules like core-util-is/lib/util.js can refer to Buffer without
// crashing application startup.
if (typeof global.Buffer !== "function") {
  try {
    // Use (0, require)(...) to avoid registering a dependency on the
    // "buffer" stub, in case it is not otherwise bundled.
    global.Buffer = (0, require)("buffer").Buffer;
  } catch (ok) {
    // Failure to import "buffer" is fine as long as the Buffer global
    // variable is not used.
  }
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"map.json":function module(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// node_modules/meteor-node-stubs/map.json                                                                             //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
module.exports = {
  "assert": "assert/",
  "buffer": "buffer/",
  "child_process": null,
  "cluster": null,
  "console": "console-browserify",
  "constants": "constants-browserify",
  "crypto": "../wrappers/crypto.js",
  "dgram": null,
  "dns": null,
  "domain": "domain-browser",
  "events": "events/",
  "fs": null,
  "http": "stream-http",
  "https": "https-browserify",
  "module": "../wrappers/module.js",
  "net": null,
  "os": "os-browserify/browser.js",
  "path": "path-browserify",
  "process": "process/browser.js",
  "punycode": "punycode/",
  "querystring": "querystring-es3/",
  "readline": null,
  "repl": null,
  "stream": "stream-browserify",
  "_stream_duplex": "readable-stream/lib/_stream_duplex.js",
  "_stream_passthrough": "readable-stream/lib/_stream_passthrough.js",
  "_stream_readable": "readable-stream/lib/_stream_readable.js",
  "_stream_transform": "readable-stream/lib/_stream_transform.js",
  "_stream_writable": "readable-stream/lib/_stream_writable.js",
  "string_decoder": "string_decoder/",
  "sys": "util/util.js",
  "timers": "timers-browserify",
  "tls": null,
  "tty": "tty-browserify",
  "url": "url/",
  "util": "util/util.js",
  "vm": "vm-browserify",
  "zlib": "browserify-zlib"
};

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"deps":{"process.js":function module(require){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// node_modules/meteor-node-stubs/deps/process.js                                                                      //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
require("process/browser.js");

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"node_modules":{"process":{"browser.js":function module(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// node_modules/meteor-node-stubs/node_modules/process/browser.js                                                      //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
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
    var timeout = runTimeout(cleanUpNextTick);
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
    runClearTimeout(timeout);
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
        runTimeout(drainQueue);
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
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}}}}}},{
  "extensions": [
    ".js",
    ".json",
    ".html",
    ".ts",
    ".mjs",
    ".svelte",
    ".css"
  ]
});

var exports = require("/node_modules/meteor/modules/client.js");
require("/node_modules/meteor/modules/legacy.js");

/* Exports */
Package._define("modules", exports, {
  meteorInstall: meteorInstall,
  meteorBabelHelpers: meteorBabelHelpers
});

})();
