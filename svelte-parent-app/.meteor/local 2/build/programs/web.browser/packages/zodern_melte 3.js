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
var Promise = Package.promise.Promise;

var require = meteorInstall({"node_modules":{"meteor":{"zodern:melte":{"tracker.js":function module(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////
//                                                                                 //
// packages/zodern_melte/tracker.js                                                //
//                                                                                 //
/////////////////////////////////////////////////////////////////////////////////////
                                                                                   //
!function (module1) {
  const {
    onDestroy
  } = require('svelte');

  const {
    Tracker
  } = require('meteor/tracker');

  module.exports = {
    createReactiveWrapper() {
      let computation = null;
      onDestroy(() => {
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
/////////////////////////////////////////////////////////////////////////////////////

},"hmr-runtime.js":function module(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////
//                                                                                 //
// packages/zodern_melte/hmr-runtime.js                                            //
//                                                                                 //
/////////////////////////////////////////////////////////////////////////////////////
                                                                                   //
!function (module1) {
  let _objectSpread;

  module1.link("@babel/runtime/helpers/objectSpread2", {
    default(v) {
      _objectSpread = v;
    }

  }, 0);

  const {
    makeApplyHmr
  } = require('meteor/zodern:melte-compiler/hmr-runtime.js');

  module.exports.applyHmr = makeApplyHmr(args => {
    var _args$m$hot$data;

    // Mark this file as reloadable
    args.m.hot.accept();
    let acceptCallback = null;

    if ((_args$m$hot$data = args.m.hot.data) !== null && _args$m$hot$data !== void 0 && _args$m$hot$data.acceptCallback) {
      // svelte-hmr expects accept to work as with nollup or vite
      // applying changes is done synchronously, so we wait until after it is done
      setTimeout(() => args.m.hot.data.acceptCallback(), 10);
    }

    args.m.hot.dispose(data => {
      if (acceptCallback) {
        data.acceptCallback = acceptCallback;
      }
    });
    return Object.assign({}, args, {
      hot: _objectSpread(_objectSpread({}, args.m.hot), {}, {
        accept(cb) {
          acceptCallback = cb;
        }

      }),
      hotOptions: _objectSpread(_objectSpread({}, args.hotOptions || {}), {}, {
        noOverlay: true
      }),

      reload() {
        if (Package && Package.reload) {
          Package.reload.Reload._reload({
            immediateMigration: true
          });
        } else {
          window.location.reload();
        }
      }

    });
  });
}.call(this, module);
/////////////////////////////////////////////////////////////////////////////////////

},"proxy-adapter.js":function module(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////
//                                                                                 //
// packages/zodern_melte/proxy-adapter.js                                          //
//                                                                                 //
/////////////////////////////////////////////////////////////////////////////////////
                                                                                   //
!function (module1) {
  if (process.env.NODE_ENV === "development") {
    const {
      proxyAdapter
    } = require('meteor/zodern:melte-compiler/hmr-runtime.js');

    module.exports = proxyAdapter;
  }
}.call(this, module);
/////////////////////////////////////////////////////////////////////////////////////

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
