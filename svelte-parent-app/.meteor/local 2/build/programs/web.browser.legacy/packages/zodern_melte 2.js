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

var require = meteorInstall({"node_modules":{"meteor":{"zodern:melte":{"tracker.js":function module(require,exports,module){

///////////////////////////////////////////////////////////////////////
//                                                                   //
// packages/zodern_melte/tracker.js                                  //
//                                                                   //
///////////////////////////////////////////////////////////////////////
                                                                     //
!function (module1) {
  var _require = require('svelte'),
      onDestroy = _require.onDestroy;

  var _require2 = require('meteor/tracker'),
      Tracker = _require2.Tracker;

  module.exports = {
    createReactiveWrapper: function () {
      var computation = null;
      onDestroy(function () {
        if (computation) {
          computation.stop();
        }
      });
      return function (func) {
        if (computation) {
          computation.stop();
        }

        computation = Tracker.autorun(func);
        return computation;
      };
    }
  };
}.call(this, module);
///////////////////////////////////////////////////////////////////////

}}}}},{
  "extensions": [
    ".js",
    ".json"
  ]
});

require("/node_modules/meteor/zodern:melte/tracker.js");

/* Exports */
Package._define("zodern:melte");

})();
