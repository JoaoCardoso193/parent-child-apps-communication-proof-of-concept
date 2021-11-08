var require = meteorInstall({"imports":{"api":{"ChildToParentAPI.svelte":function module(require,exports,module){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// imports/api/ChildToParentAPI.svelte                                                                                //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
var _assertThisInitialized;

module.link("@babel/runtime/helpers/assertThisInitialized", {
  default: function (v) {
    _assertThisInitialized = v;
  }
}, 0);

var _inheritsLoose;

module.link("@babel/runtime/helpers/inheritsLoose", {
  default: function (v) {
    _inheritsLoose = v;
  }
}, 1);
var SvelteComponentDev, component_subscribe, dispatch_dev, globals, init, noop, safe_not_equal, validate_slots, validate_store;
module.link("svelte/internal", {
  SvelteComponentDev: function (v) {
    SvelteComponentDev = v;
  },
  component_subscribe: function (v) {
    component_subscribe = v;
  },
  dispatch_dev: function (v) {
    dispatch_dev = v;
  },
  globals: function (v) {
    globals = v;
  },
  init: function (v) {
    init = v;
  },
  noop: function (v) {
    noop = v;
  },
  safe_not_equal: function (v) {
    safe_not_equal = v;
  },
  validate_slots: function (v) {
    validate_slots = v;
  },
  validate_store: function (v) {
    validate_store = v;
  }
}, 0);
var PARENT_URL, CHILD_URL;
module.link("/public/constants", {
  PARENT_URL: function (v) {
    PARENT_URL = v;
  },
  CHILD_URL: function (v) {
    CHILD_URL = v;
  }
}, 1);
var incomingMessageText, count;
module.link("/imports/api/stores", {
  incomingMessageText: function (v) {
    incomingMessageText = v;
  },
  count: function (v) {
    count = v;
  }
}, 2);
var _globals = globals,
    Error_1 = _globals.Error,
    console_1 = _globals.console;
var file = "imports/api/ChildToParentAPI.svelte";

function create_fragment(ctx) {
  var block = {
    c: noop,
    l: function () {
      function claim(nodes) {
        throw new Error_1("options.hydrate only works if the component was compiled with the `hydratable: true` option");
      }

      return claim;
    }(),
    m: noop,
    p: noop,
    i: noop,
    o: noop,
    d: noop
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_fragment.name,
    type: "component",
    source: "",
    ctx: ctx
  });
  return block;
}

function alertMessage(args) {
  //sanity check
  console.log("alertMessage function triggered on parent with args " + args + "!"); //check args and alert

  if (typeof args.messageText === "string") {
    alert(args.messageText);
  }
}

function instance($$self, $$props, $$invalidate) {
  var $count;
  validate_store(count, 'count');
  component_subscribe($$self, count, function ($$value) {
    return $$invalidate(0, $count = $$value);
  });
  var _$$props$$$slots = $$props.$$slots,
      slots = _$$props$$$slots === void 0 ? {} : _$$props$$$slots,
      $$scope = $$props.$$scope;
  validate_slots('ChildToParentAPI', slots, []);

  function displayMessage(args) {
    //sanity check
    console.log("displayMessage function triggered on parent with args " + args + "!"); //check messageText is string

    if (typeof args.messageText === "string") {
      incomingMessageText.set(args.messageText);
    }
  } //function that increments count


  var incrementCount = function () {
    console.log("incrementCount function triggered on parent!");
    console.log($count);
    count.set($count + 1);
  }; //function that decrements count


  var decrementCount = function () {
    console.log("decrementCount function triggered on parent!");
    count.set($count - 1);
  }; //message handler


  window.addEventListener("message", function (message) {
    //function adapter
    var functionAdapter = {
      displayMessage: displayMessage,
      alertMessage: alertMessage,
      incrementCount: incrementCount,
      decrementCount: decrementCount
    };

    if (message.origin === CHILD_URL) {
      //sanity check
      console.log("incoming message in parent MessageHandler from child!");
      console.log(message); //parse input

      functionName = message.data.function;
      args = message.data.args; //call appropriate function

      if (functionAdapter[functionName]) {
        functionAdapter[functionName](args);
      } else {
        throw new Error("invalid function name");
      }
    } else if (message.origin === PARENT_URL) {
      //sanity check
      console.log("incoming message in parent MessageHandler from own URL");
    } else {
      //permission denied
      throw new Error("invalid parent URL, permission denied");
    }
  });
  var writable_props = [];
  Object.keys($$props).forEach(function (key) {
    if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console_1.warn("<ChildToParentAPI> was created with unknown prop '" + key + "'");
  });

  $$self.$capture_state = function () {
    return {
      PARENT_URL: PARENT_URL,
      CHILD_URL: CHILD_URL,
      incomingMessageText: incomingMessageText,
      count: count,
      displayMessage: displayMessage,
      alertMessage: alertMessage,
      incrementCount: incrementCount,
      decrementCount: decrementCount,
      $count: $count
    };
  };

  return [];
}

var ChildToParentAPI = /*#__PURE__*/function (_SvelteComponentDev) {
  _inheritsLoose(ChildToParentAPI, _SvelteComponentDev);

  function ChildToParentAPI(options) {
    var _this;

    _this = _SvelteComponentDev.call(this, options) || this;
    init(_assertThisInitialized(_this), options, instance, create_fragment, safe_not_equal, {});
    dispatch_dev("SvelteRegisterComponent", {
      component: _assertThisInitialized(_this),
      tagName: "ChildToParentAPI",
      options: options,
      id: create_fragment.name
    });
    return _this;
  }

  return ChildToParentAPI;
}(SvelteComponentDev);

module.exportDefault(ChildToParentAPI);
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"stores.js":function module(require,exports,module){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// imports/api/stores.js                                                                                              //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
module.export({
  iFrameLoaded: function () {
    return iFrameLoaded;
  },
  incomingMessageText: function () {
    return incomingMessageText;
  },
  count: function () {
    return count;
  }
});
var writable;
module.link("svelte/store", {
  writable: function (v) {
    writable = v;
  }
}, 0);
var iFrameLoaded = writable(false);
var incomingMessageText = writable("");
var count = writable(0);
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"db":{"foodsCollection.js":function module(require,exports,module){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// imports/db/foodsCollection.js                                                                                      //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
module.export({
  FoodsCollection: function () {
    return FoodsCollection;
  }
});
var Mongo;
module.link("meteor/mongo", {
  Mongo: function (v) {
    Mongo = v;
  }
}, 0);
var FoodsCollection = new Mongo.Collection("foods");
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"ui":{"AlertMessageForm.svelte":function module(require,exports,module){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// imports/ui/AlertMessageForm.svelte                                                                                 //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
var _assertThisInitialized;

module.link("@babel/runtime/helpers/assertThisInitialized", {
  default: function (v) {
    _assertThisInitialized = v;
  }
}, 0);

var _inheritsLoose;

module.link("@babel/runtime/helpers/inheritsLoose", {
  default: function (v) {
    _inheritsLoose = v;
  }
}, 1);

var _slicedToArray;

module.link("@babel/runtime/helpers/slicedToArray", {
  default: function (v) {
    _slicedToArray = v;
  }
}, 2);
var SvelteComponentDev, add_location, append_dev, attr_dev, detach_dev, dispatch_dev, element, globals, init, insert_dev, listen_dev, noop, prevent_default, run_all, safe_not_equal, set_input_value, space, validate_slots;
module.link("svelte/internal", {
  SvelteComponentDev: function (v) {
    SvelteComponentDev = v;
  },
  add_location: function (v) {
    add_location = v;
  },
  append_dev: function (v) {
    append_dev = v;
  },
  attr_dev: function (v) {
    attr_dev = v;
  },
  detach_dev: function (v) {
    detach_dev = v;
  },
  dispatch_dev: function (v) {
    dispatch_dev = v;
  },
  element: function (v) {
    element = v;
  },
  globals: function (v) {
    globals = v;
  },
  init: function (v) {
    init = v;
  },
  insert_dev: function (v) {
    insert_dev = v;
  },
  listen_dev: function (v) {
    listen_dev = v;
  },
  noop: function (v) {
    noop = v;
  },
  prevent_default: function (v) {
    prevent_default = v;
  },
  run_all: function (v) {
    run_all = v;
  },
  safe_not_equal: function (v) {
    safe_not_equal = v;
  },
  set_input_value: function (v) {
    set_input_value = v;
  },
  space: function (v) {
    space = v;
  },
  validate_slots: function (v) {
    validate_slots = v;
  }
}, 0);
var iFrameLoaded;
module.link("../api/stores", {
  iFrameLoaded: function (v) {
    iFrameLoaded = v;
  }
}, 1);
var _globals = globals,
    console_1 = _globals.console;
var file = "imports/ui/AlertMessageForm.svelte";

function create_fragment(ctx) {
  var div;
  var form;
  var h3;
  var label;
  var t1;
  var br;
  var t2;
  var input;
  var t3;
  var button;
  var mounted;
  var dispose;
  var block = {
    c: function () {
      function create() {
        div = element("div");
        form = element("form");
        h3 = element("h3");
        label = element("label");
        label.textContent = "Send a message to alert on the child app:";
        t1 = space();
        br = element("br");
        t2 = space();
        input = element("input");
        t3 = space();
        button = element("button");
        button.textContent = "Send Message";
        attr_dev(label, "for", "html");
        add_location(label, file, 20, 12, 678);
        add_location(h3, file, 20, 8, 674);
        add_location(br, file, 21, 8, 760);
        attr_dev(input, "type", "text");
        attr_dev(input, "name", "text");
        attr_dev(input, "placeholder", "Type message to send");
        add_location(input, file, 22, 8, 775);
        attr_dev(button, "type", "submit");
        add_location(button, file, 23, 8, 884);
        add_location(form, file, 19, 4, 619);
        add_location(div, file, 18, 0, 609);
      }

      return create;
    }(),
    l: function () {
      function claim(nodes) {
        throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
      }

      return claim;
    }(),
    m: function () {
      function mount(target, anchor) {
        insert_dev(target, div, anchor);
        append_dev(div, form);
        append_dev(form, h3);
        append_dev(h3, label);
        append_dev(form, t1);
        append_dev(form, br);
        append_dev(form, t2);
        append_dev(form, input);
        set_input_value(input,
        /*outgoingMessageText*/
        ctx[0]);
        append_dev(form, t3);
        append_dev(form, button);

        if (!mounted) {
          dispose = [listen_dev(input, "input",
          /*input_input_handler*/
          ctx[2]), listen_dev(form, "submit", prevent_default(
          /*handleSubmit*/
          ctx[1]), false, true, false)];
          mounted = true;
        }
      }

      return mount;
    }(),
    p: function () {
      function update(ctx, _ref) {
        var _ref2 = _slicedToArray(_ref, 1),
            dirty = _ref2[0];

        if (dirty &
        /*outgoingMessageText*/
        1 && input.value !==
        /*outgoingMessageText*/
        ctx[0]) {
          set_input_value(input,
          /*outgoingMessageText*/
          ctx[0]);
        }
      }

      return update;
    }(),
    i: noop,
    o: noop,
    d: function () {
      function destroy(detaching) {
        if (detaching) detach_dev(div);
        mounted = false;
        run_all(dispose);
      }

      return destroy;
    }()
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_fragment.name,
    type: "component",
    source: "",
    ctx: ctx
  });
  return block;
}

function instance($$self, $$props, $$invalidate) {
  var outgoingMessageText;
  var _$$props$$$slots = $$props.$$slots,
      slots = _$$props$$$slots === void 0 ? {} : _$$props$$$slots,
      $$scope = $$props.$$scope;
  validate_slots('AlertMessageForm', slots, []);

  var handleSubmit = function () {
    //check that iFrame has loaded before accessing it and sending message
    if (iFrameLoaded) {
      console.log('Sending message to display from parent to child!');
      document.getElementById('iframe').contentWindow.postMessage({
        "function": 'alertMessage',
        args: {
          messageText: outgoingMessageText
        }
      }, "http://localhost:3000/");
    } else {
      throw new Meteor.Error('iFrame not loaded yet!');
    }
  };

  var writable_props = [];
  Object.keys($$props).forEach(function (key) {
    if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console_1.warn("<AlertMessageForm> was created with unknown prop '" + key + "'");
  });

  function input_input_handler() {
    outgoingMessageText = this.value;
    $$invalidate(0, outgoingMessageText);
  }

  $$self.$capture_state = function () {
    return {
      iFrameLoaded: iFrameLoaded,
      handleSubmit: handleSubmit,
      outgoingMessageText: outgoingMessageText
    };
  };

  $$self.$inject_state = function ($$props) {
    if ('outgoingMessageText' in $$props) $$invalidate(0, outgoingMessageText = $$props.outgoingMessageText);
  };

  if ($$props && "$$inject" in $$props) {
    $$self.$inject_state($$props.$$inject);
  }

  $: $$invalidate(0, outgoingMessageText = "");

  return [outgoingMessageText, handleSubmit, input_input_handler];
}

var AlertMessageForm = /*#__PURE__*/function (_SvelteComponentDev) {
  _inheritsLoose(AlertMessageForm, _SvelteComponentDev);

  function AlertMessageForm(options) {
    var _this;

    _this = _SvelteComponentDev.call(this, options) || this;
    init(_assertThisInitialized(_this), options, instance, create_fragment, safe_not_equal, {});
    dispatch_dev("SvelteRegisterComponent", {
      component: _assertThisInitialized(_this),
      tagName: "AlertMessageForm",
      options: options,
      id: create_fragment.name
    });
    return _this;
  }

  return AlertMessageForm;
}(SvelteComponentDev);

module.exportDefault(AlertMessageForm);
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"App.svelte":function module(require,exports,module){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// imports/ui/App.svelte                                                                                              //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
var _assertThisInitialized;

module.link("@babel/runtime/helpers/assertThisInitialized", {
  default: function (v) {
    _assertThisInitialized = v;
  }
}, 0);

var _inheritsLoose;

module.link("@babel/runtime/helpers/inheritsLoose", {
  default: function (v) {
    _inheritsLoose = v;
  }
}, 1);
var SvelteComponentDev, add_location, append_dev, attr_dev, create_component, destroy_component, detach_dev, dispatch_dev, element, globals, init, insert_dev, listen_dev, mount_component, noop, safe_not_equal, space, src_url_equal, transition_in, transition_out, validate_slots;
module.link("svelte/internal", {
  SvelteComponentDev: function (v) {
    SvelteComponentDev = v;
  },
  add_location: function (v) {
    add_location = v;
  },
  append_dev: function (v) {
    append_dev = v;
  },
  attr_dev: function (v) {
    attr_dev = v;
  },
  create_component: function (v) {
    create_component = v;
  },
  destroy_component: function (v) {
    destroy_component = v;
  },
  detach_dev: function (v) {
    detach_dev = v;
  },
  dispatch_dev: function (v) {
    dispatch_dev = v;
  },
  element: function (v) {
    element = v;
  },
  globals: function (v) {
    globals = v;
  },
  init: function (v) {
    init = v;
  },
  insert_dev: function (v) {
    insert_dev = v;
  },
  listen_dev: function (v) {
    listen_dev = v;
  },
  mount_component: function (v) {
    mount_component = v;
  },
  noop: function (v) {
    noop = v;
  },
  safe_not_equal: function (v) {
    safe_not_equal = v;
  },
  space: function (v) {
    space = v;
  },
  src_url_equal: function (v) {
    src_url_equal = v;
  },
  transition_in: function (v) {
    transition_in = v;
  },
  transition_out: function (v) {
    transition_out = v;
  },
  validate_slots: function (v) {
    validate_slots = v;
  }
}, 0);
var Message;
module.link("/imports/ui/Message", {
  "default": function (v) {
    Message = v;
  }
}, 1);
var Counter;
module.link("/imports/ui/Counter", {
  "default": function (v) {
    Counter = v;
  }
}, 2);
var Foods;
module.link("/imports/ui/Foods", {
  "default": function (v) {
    Foods = v;
  }
}, 3);
var DisplayMessageForm;
module.link("/imports/ui/DisplayMessageForm", {
  "default": function (v) {
    DisplayMessageForm = v;
  }
}, 4);
var AlertMessageForm;
module.link("/imports/ui/AlertMessageForm", {
  "default": function (v) {
    AlertMessageForm = v;
  }
}, 5);
var ChildCounterButtons;
module.link("/imports/ui/ChildCounterButtons", {
  "default": function (v) {
    ChildCounterButtons = v;
  }
}, 6);
var iFrameLoaded;
module.link("/imports/api/stores", {
  iFrameLoaded: function (v) {
    iFrameLoaded = v;
  }
}, 7);
var ChildToParentAPI;
module.link("/imports/api/ChildToParentAPI", {
  "default": function (v) {
    ChildToParentAPI = v;
  }
}, 8);
var _globals = globals,
    console_1 = _globals.console;
var file = "imports/ui/App.svelte";

function create_fragment(ctx) {
  var div1;
  var childtoparentapi;
  var t0;
  var h1;
  var t2;
  var message;
  var t3;
  var counter;
  var t4;
  var foods;
  var t5;
  var displaymessageform;
  var t6;
  var alertmessageform;
  var t7;
  var childcounterbuttons;
  var t8;
  var br;
  var t9;
  var div0;
  var iframe;
  var iframe_src_value;
  var current;
  var mounted;
  var dispose;
  childtoparentapi = new ChildToParentAPI({
    $$inline: true
  });
  message = new Message({
    $$inline: true
  });
  counter = new Counter({
    $$inline: true
  });
  foods = new Foods({
    $$inline: true
  });
  displaymessageform = new DisplayMessageForm({
    $$inline: true
  });
  alertmessageform = new AlertMessageForm({
    $$inline: true
  });
  childcounterbuttons = new ChildCounterButtons({
    $$inline: true
  });
  var block = {
    c: function () {
      function create() {
        div1 = element("div");
        create_component(childtoparentapi.$$.fragment);
        t0 = space();
        h1 = element("h1");
        h1.textContent = "Svelte Parent App";
        t2 = space();
        create_component(message.$$.fragment);
        t3 = space();
        create_component(counter.$$.fragment);
        t4 = space();
        create_component(foods.$$.fragment);
        t5 = space();
        create_component(displaymessageform.$$.fragment);
        t6 = space();
        create_component(alertmessageform.$$.fragment);
        t7 = space();
        create_component(childcounterbuttons.$$.fragment);
        t8 = space();
        br = element("br");
        t9 = space();
        div0 = element("div");
        iframe = element("iframe");
        add_location(h1, file, 24, 2, 719);
        add_location(br, file, 31, 2, 862);
        attr_dev(iframe, "id", "iframe");
        attr_dev(iframe, "title", "react-child-app");
        if (!src_url_equal(iframe.src, iframe_src_value = "http://localhost:3000/")) attr_dev(iframe, "src", iframe_src_value);
        attr_dev(iframe, "width", "600");
        attr_dev(iframe, "height", "300");
        attr_dev(iframe, "sandbox", "allow-same-origin allow-scripts allow-forms allow-top-navigation allow-modals");
        add_location(iframe, file, 34, 4, 882);
        add_location(div0, file, 33, 2, 872);
        attr_dev(div1, "class", "container");
        add_location(div1, file, 22, 0, 670);
      }

      return create;
    }(),
    l: function () {
      function claim(nodes) {
        throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
      }

      return claim;
    }(),
    m: function () {
      function mount(target, anchor) {
        insert_dev(target, div1, anchor);
        mount_component(childtoparentapi, div1, null);
        append_dev(div1, t0);
        append_dev(div1, h1);
        append_dev(div1, t2);
        mount_component(message, div1, null);
        append_dev(div1, t3);
        mount_component(counter, div1, null);
        append_dev(div1, t4);
        mount_component(foods, div1, null);
        append_dev(div1, t5);
        mount_component(displaymessageform, div1, null);
        append_dev(div1, t6);
        mount_component(alertmessageform, div1, null);
        append_dev(div1, t7);
        mount_component(childcounterbuttons, div1, null);
        append_dev(div1, t8);
        append_dev(div1, br);
        append_dev(div1, t9);
        append_dev(div1, div0);
        append_dev(div0, iframe);
        current = true;

        if (!mounted) {
          dispose = listen_dev(iframe, "load",
          /*oniFrameLoad*/
          ctx[0], false, false, false);
          mounted = true;
        }
      }

      return mount;
    }(),
    p: noop,
    i: function () {
      function intro(local) {
        if (current) return;
        transition_in(childtoparentapi.$$.fragment, local);
        transition_in(message.$$.fragment, local);
        transition_in(counter.$$.fragment, local);
        transition_in(foods.$$.fragment, local);
        transition_in(displaymessageform.$$.fragment, local);
        transition_in(alertmessageform.$$.fragment, local);
        transition_in(childcounterbuttons.$$.fragment, local);
        current = true;
      }

      return intro;
    }(),
    o: function () {
      function outro(local) {
        transition_out(childtoparentapi.$$.fragment, local);
        transition_out(message.$$.fragment, local);
        transition_out(counter.$$.fragment, local);
        transition_out(foods.$$.fragment, local);
        transition_out(displaymessageform.$$.fragment, local);
        transition_out(alertmessageform.$$.fragment, local);
        transition_out(childcounterbuttons.$$.fragment, local);
        current = false;
      }

      return outro;
    }(),
    d: function () {
      function destroy(detaching) {
        if (detaching) detach_dev(div1);
        destroy_component(childtoparentapi);
        destroy_component(message);
        destroy_component(counter);
        destroy_component(foods);
        destroy_component(displaymessageform);
        destroy_component(alertmessageform);
        destroy_component(childcounterbuttons);
        mounted = false;
        dispose();
      }

      return destroy;
    }()
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_fragment.name,
    type: "component",
    source: "",
    ctx: ctx
  });
  return block;
}

function instance($$self, $$props, $$invalidate) {
  var _$$props$$$slots = $$props.$$slots,
      slots = _$$props$$$slots === void 0 ? {} : _$$props$$$slots,
      $$scope = $$props.$$scope;
  validate_slots('App', slots, []);

  var oniFrameLoad = function () {
    iFrameLoaded.set(true);

    if (iFrameLoaded) {
      console.log('child iFrame loaded, logging from parent!');
    }
  };

  var writable_props = [];
  Object.keys($$props).forEach(function (key) {
    if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console_1.warn("<App> was created with unknown prop '" + key + "'");
  });

  $$self.$capture_state = function () {
    return {
      Message: Message,
      Counter: Counter,
      Foods: Foods,
      DisplayMessageForm: DisplayMessageForm,
      AlertMessageForm: AlertMessageForm,
      ChildCounterButtons: ChildCounterButtons,
      iFrameLoaded: iFrameLoaded,
      ChildToParentAPI: ChildToParentAPI,
      oniFrameLoad: oniFrameLoad
    };
  };

  return [oniFrameLoad];
}

var App = /*#__PURE__*/function (_SvelteComponentDev) {
  _inheritsLoose(App, _SvelteComponentDev);

  function App(options) {
    var _this;

    _this = _SvelteComponentDev.call(this, options) || this;
    init(_assertThisInitialized(_this), options, instance, create_fragment, safe_not_equal, {});
    dispatch_dev("SvelteRegisterComponent", {
      component: _assertThisInitialized(_this),
      tagName: "App",
      options: options,
      id: create_fragment.name
    });
    return _this;
  }

  return App;
}(SvelteComponentDev);

module.exportDefault(App);
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"ChildCounterButtons.svelte":function module(require,exports,module){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// imports/ui/ChildCounterButtons.svelte                                                                              //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
var _assertThisInitialized;

module.link("@babel/runtime/helpers/assertThisInitialized", {
  default: function (v) {
    _assertThisInitialized = v;
  }
}, 0);

var _inheritsLoose;

module.link("@babel/runtime/helpers/inheritsLoose", {
  default: function (v) {
    _inheritsLoose = v;
  }
}, 1);
var SvelteComponentDev, add_location, append_dev, detach_dev, dispatch_dev, element, globals, init, insert_dev, listen_dev, noop, run_all, safe_not_equal, space, validate_slots;
module.link("svelte/internal", {
  SvelteComponentDev: function (v) {
    SvelteComponentDev = v;
  },
  add_location: function (v) {
    add_location = v;
  },
  append_dev: function (v) {
    append_dev = v;
  },
  detach_dev: function (v) {
    detach_dev = v;
  },
  dispatch_dev: function (v) {
    dispatch_dev = v;
  },
  element: function (v) {
    element = v;
  },
  globals: function (v) {
    globals = v;
  },
  init: function (v) {
    init = v;
  },
  insert_dev: function (v) {
    insert_dev = v;
  },
  listen_dev: function (v) {
    listen_dev = v;
  },
  noop: function (v) {
    noop = v;
  },
  run_all: function (v) {
    run_all = v;
  },
  safe_not_equal: function (v) {
    safe_not_equal = v;
  },
  space: function (v) {
    space = v;
  },
  validate_slots: function (v) {
    validate_slots = v;
  }
}, 0);
var iFrameLoaded;
module.link("/imports/api/stores", {
  iFrameLoaded: function (v) {
    iFrameLoaded = v;
  }
}, 1);
var _globals = globals,
    console_1 = _globals.console;
var file = "imports/ui/ChildCounterButtons.svelte";

function create_fragment(ctx) {
  var div;
  var h3;
  var t1;
  var button0;
  var t3;
  var button1;
  var mounted;
  var dispose;
  var block = {
    c: function () {
      function create() {
        div = element("div");
        h3 = element("h3");
        h3.textContent = "Change count on the child app:";
        t1 = space();
        button0 = element("button");
        button0.textContent = "+";
        t3 = space();
        button1 = element("button");
        button1.textContent = "-";
        add_location(h3, file, 25, 4, 728);
        add_location(button0, file, 26, 4, 772);
        add_location(button1, file, 27, 4, 816);
        add_location(div, file, 24, 0, 718);
      }

      return create;
    }(),
    l: function () {
      function claim(nodes) {
        throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
      }

      return claim;
    }(),
    m: function () {
      function mount(target, anchor) {
        insert_dev(target, div, anchor);
        append_dev(div, h3);
        append_dev(div, t1);
        append_dev(div, button0);
        append_dev(div, t3);
        append_dev(div, button1);

        if (!mounted) {
          dispose = [listen_dev(button0, "click",
          /*increment*/
          ctx[0], false, false, false), listen_dev(button1, "click",
          /*decrement*/
          ctx[1], false, false, false)];
          mounted = true;
        }
      }

      return mount;
    }(),
    p: noop,
    i: noop,
    o: noop,
    d: function () {
      function destroy(detaching) {
        if (detaching) detach_dev(div);
        mounted = false;
        run_all(dispose);
      }

      return destroy;
    }()
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_fragment.name,
    type: "component",
    source: "",
    ctx: ctx
  });
  return block;
}

function instance($$self, $$props, $$invalidate) {
  var _$$props$$$slots = $$props.$$slots,
      slots = _$$props$$$slots === void 0 ? {} : _$$props$$$slots,
      $$scope = $$props.$$scope;
  validate_slots('ChildCounterButtons', slots, []);

  var increment = function () {
    console.log('one increment trigger on parent');

    if (iFrameLoaded) {
      document.getElementById('iframe').contentWindow.postMessage({
        "function": 'incrementCount'
      }, "http://localhost:3000/");
    } else {
      throw new Meteor.Error('iFrame not loaded yet!');
    }

    return;
  };

  var decrement = function () {
    if (iFrameLoaded) {
      document.getElementById('iframe').contentWindow.postMessage({
        "function": 'decrementCount'
      }, "http://localhost:3000/");
    } else {
      throw new Meteor.Error('iFrame not loaded yet!');
    }
  };

  var writable_props = [];
  Object.keys($$props).forEach(function (key) {
    if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console_1.warn("<ChildCounterButtons> was created with unknown prop '" + key + "'");
  });

  $$self.$capture_state = function () {
    return {
      iFrameLoaded: iFrameLoaded,
      increment: increment,
      decrement: decrement
    };
  };

  return [increment, decrement];
}

var ChildCounterButtons = /*#__PURE__*/function (_SvelteComponentDev) {
  _inheritsLoose(ChildCounterButtons, _SvelteComponentDev);

  function ChildCounterButtons(options) {
    var _this;

    _this = _SvelteComponentDev.call(this, options) || this;
    init(_assertThisInitialized(_this), options, instance, create_fragment, safe_not_equal, {});
    dispatch_dev("SvelteRegisterComponent", {
      component: _assertThisInitialized(_this),
      tagName: "ChildCounterButtons",
      options: options,
      id: create_fragment.name
    });
    return _this;
  }

  return ChildCounterButtons;
}(SvelteComponentDev);

module.exportDefault(ChildCounterButtons);
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"Counter.svelte":function module(require,exports,module){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// imports/ui/Counter.svelte                                                                                          //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
var _assertThisInitialized;

module.link("@babel/runtime/helpers/assertThisInitialized", {
  default: function (v) {
    _assertThisInitialized = v;
  }
}, 0);

var _inheritsLoose;

module.link("@babel/runtime/helpers/inheritsLoose", {
  default: function (v) {
    _inheritsLoose = v;
  }
}, 1);

var _slicedToArray;

module.link("@babel/runtime/helpers/slicedToArray", {
  default: function (v) {
    _slicedToArray = v;
  }
}, 2);
var SvelteComponentDev, add_location, append_dev, component_subscribe, detach_dev, dispatch_dev, element, init, insert_dev, listen_dev, noop, run_all, safe_not_equal, set_data_dev, space, text, validate_slots, validate_store;
module.link("svelte/internal", {
  SvelteComponentDev: function (v) {
    SvelteComponentDev = v;
  },
  add_location: function (v) {
    add_location = v;
  },
  append_dev: function (v) {
    append_dev = v;
  },
  component_subscribe: function (v) {
    component_subscribe = v;
  },
  detach_dev: function (v) {
    detach_dev = v;
  },
  dispatch_dev: function (v) {
    dispatch_dev = v;
  },
  element: function (v) {
    element = v;
  },
  init: function (v) {
    init = v;
  },
  insert_dev: function (v) {
    insert_dev = v;
  },
  listen_dev: function (v) {
    listen_dev = v;
  },
  noop: function (v) {
    noop = v;
  },
  run_all: function (v) {
    run_all = v;
  },
  safe_not_equal: function (v) {
    safe_not_equal = v;
  },
  set_data_dev: function (v) {
    set_data_dev = v;
  },
  space: function (v) {
    space = v;
  },
  text: function (v) {
    text = v;
  },
  validate_slots: function (v) {
    validate_slots = v;
  },
  validate_store: function (v) {
    validate_store = v;
  }
}, 0);
var count;
module.link("/imports/api/stores", {
  count: function (v) {
    count = v;
  }
}, 1);
var file = "imports/ui/Counter.svelte";

function create_fragment(ctx) {
  var div;
  var h2;
  var t0;
  var t1;
  var t2;
  var button0;
  var t4;
  var button1;
  var mounted;
  var dispose;
  var block = {
    c: function () {
      function create() {
        div = element("div");
        h2 = element("h2");
        t0 = text("The current count is: ");
        t1 = text(
        /*$count*/
        ctx[0]);
        t2 = space();
        button0 = element("button");
        button0.textContent = "+";
        t4 = space();
        button1 = element("button");
        button1.textContent = "-";
        add_location(h2, file, 5, 4, 77);
        add_location(button0, file, 6, 4, 121);
        add_location(button1, file, 14, 4, 226);
        add_location(div, file, 4, 0, 67);
      }

      return create;
    }(),
    l: function () {
      function claim(nodes) {
        throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
      }

      return claim;
    }(),
    m: function () {
      function mount(target, anchor) {
        insert_dev(target, div, anchor);
        append_dev(div, h2);
        append_dev(h2, t0);
        append_dev(h2, t1);
        append_dev(div, t2);
        append_dev(div, button0);
        append_dev(div, t4);
        append_dev(div, button1);

        if (!mounted) {
          dispose = [listen_dev(button0, "click",
          /*click_handler*/
          ctx[1], false, false, false), listen_dev(button1, "click",
          /*click_handler_1*/
          ctx[2], false, false, false)];
          mounted = true;
        }
      }

      return mount;
    }(),
    p: function () {
      function update(ctx, _ref) {
        var _ref2 = _slicedToArray(_ref, 1),
            dirty = _ref2[0];

        if (dirty &
        /*$count*/
        1) set_data_dev(t1,
        /*$count*/
        ctx[0]);
      }

      return update;
    }(),
    i: noop,
    o: noop,
    d: function () {
      function destroy(detaching) {
        if (detaching) detach_dev(div);
        mounted = false;
        run_all(dispose);
      }

      return destroy;
    }()
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_fragment.name,
    type: "component",
    source: "",
    ctx: ctx
  });
  return block;
}

function instance($$self, $$props, $$invalidate) {
  var $count;
  validate_store(count, 'count');
  component_subscribe($$self, count, function ($$value) {
    return $$invalidate(0, $count = $$value);
  });
  var _$$props$$$slots = $$props.$$slots,
      slots = _$$props$$$slots === void 0 ? {} : _$$props$$$slots,
      $$scope = $$props.$$scope;
  validate_slots('Counter', slots, []);
  var writable_props = [];
  Object.keys($$props).forEach(function (key) {
    if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn("<Counter> was created with unknown prop '" + key + "'");
  });

  var click_handler = function () {
    count.set($count + 1);
  };

  var click_handler_1 = function () {
    count.set($count - 1);
  };

  $$self.$capture_state = function () {
    return {
      count: count,
      $count: $count
    };
  };

  return [$count, click_handler, click_handler_1];
}

var Counter = /*#__PURE__*/function (_SvelteComponentDev) {
  _inheritsLoose(Counter, _SvelteComponentDev);

  function Counter(options) {
    var _this;

    _this = _SvelteComponentDev.call(this, options) || this;
    init(_assertThisInitialized(_this), options, instance, create_fragment, safe_not_equal, {});
    dispatch_dev("SvelteRegisterComponent", {
      component: _assertThisInitialized(_this),
      tagName: "Counter",
      options: options,
      id: create_fragment.name
    });
    return _this;
  }

  return Counter;
}(SvelteComponentDev);

module.exportDefault(Counter);
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"DisplayMessageForm.svelte":function module(require,exports,module){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// imports/ui/DisplayMessageForm.svelte                                                                               //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
var _assertThisInitialized;

module.link("@babel/runtime/helpers/assertThisInitialized", {
  default: function (v) {
    _assertThisInitialized = v;
  }
}, 0);

var _inheritsLoose;

module.link("@babel/runtime/helpers/inheritsLoose", {
  default: function (v) {
    _inheritsLoose = v;
  }
}, 1);

var _slicedToArray;

module.link("@babel/runtime/helpers/slicedToArray", {
  default: function (v) {
    _slicedToArray = v;
  }
}, 2);
var SvelteComponentDev, add_location, append_dev, attr_dev, detach_dev, dispatch_dev, element, globals, init, insert_dev, listen_dev, noop, prevent_default, run_all, safe_not_equal, set_input_value, space, validate_slots;
module.link("svelte/internal", {
  SvelteComponentDev: function (v) {
    SvelteComponentDev = v;
  },
  add_location: function (v) {
    add_location = v;
  },
  append_dev: function (v) {
    append_dev = v;
  },
  attr_dev: function (v) {
    attr_dev = v;
  },
  detach_dev: function (v) {
    detach_dev = v;
  },
  dispatch_dev: function (v) {
    dispatch_dev = v;
  },
  element: function (v) {
    element = v;
  },
  globals: function (v) {
    globals = v;
  },
  init: function (v) {
    init = v;
  },
  insert_dev: function (v) {
    insert_dev = v;
  },
  listen_dev: function (v) {
    listen_dev = v;
  },
  noop: function (v) {
    noop = v;
  },
  prevent_default: function (v) {
    prevent_default = v;
  },
  run_all: function (v) {
    run_all = v;
  },
  safe_not_equal: function (v) {
    safe_not_equal = v;
  },
  set_input_value: function (v) {
    set_input_value = v;
  },
  space: function (v) {
    space = v;
  },
  validate_slots: function (v) {
    validate_slots = v;
  }
}, 0);
var iFrameLoaded;
module.link("../api/stores", {
  iFrameLoaded: function (v) {
    iFrameLoaded = v;
  }
}, 1);
var _globals = globals,
    console_1 = _globals.console;
var file = "imports/ui/DisplayMessageForm.svelte";

function create_fragment(ctx) {
  var div;
  var form;
  var h3;
  var label;
  var t1;
  var br;
  var t2;
  var input;
  var t3;
  var button;
  var mounted;
  var dispose;
  var block = {
    c: function () {
      function create() {
        div = element("div");
        form = element("form");
        h3 = element("h3");
        label = element("label");
        label.textContent = "Send a message to display on the child app:";
        t1 = space();
        br = element("br");
        t2 = space();
        input = element("input");
        t3 = space();
        button = element("button");
        button.textContent = "Send Message";
        attr_dev(label, "for", "html");
        add_location(label, file, 20, 12, 680);
        add_location(h3, file, 20, 8, 676);
        add_location(br, file, 21, 8, 764);
        attr_dev(input, "type", "text");
        attr_dev(input, "name", "text");
        attr_dev(input, "placeholder", "Type message to send");
        add_location(input, file, 22, 8, 779);
        attr_dev(button, "type", "submit");
        add_location(button, file, 23, 8, 888);
        add_location(form, file, 19, 4, 621);
        add_location(div, file, 18, 0, 611);
      }

      return create;
    }(),
    l: function () {
      function claim(nodes) {
        throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
      }

      return claim;
    }(),
    m: function () {
      function mount(target, anchor) {
        insert_dev(target, div, anchor);
        append_dev(div, form);
        append_dev(form, h3);
        append_dev(h3, label);
        append_dev(form, t1);
        append_dev(form, br);
        append_dev(form, t2);
        append_dev(form, input);
        set_input_value(input,
        /*outgoingMessageText*/
        ctx[0]);
        append_dev(form, t3);
        append_dev(form, button);

        if (!mounted) {
          dispose = [listen_dev(input, "input",
          /*input_input_handler*/
          ctx[2]), listen_dev(form, "submit", prevent_default(
          /*handleSubmit*/
          ctx[1]), false, true, false)];
          mounted = true;
        }
      }

      return mount;
    }(),
    p: function () {
      function update(ctx, _ref) {
        var _ref2 = _slicedToArray(_ref, 1),
            dirty = _ref2[0];

        if (dirty &
        /*outgoingMessageText*/
        1 && input.value !==
        /*outgoingMessageText*/
        ctx[0]) {
          set_input_value(input,
          /*outgoingMessageText*/
          ctx[0]);
        }
      }

      return update;
    }(),
    i: noop,
    o: noop,
    d: function () {
      function destroy(detaching) {
        if (detaching) detach_dev(div);
        mounted = false;
        run_all(dispose);
      }

      return destroy;
    }()
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_fragment.name,
    type: "component",
    source: "",
    ctx: ctx
  });
  return block;
}

function instance($$self, $$props, $$invalidate) {
  var outgoingMessageText;
  var _$$props$$$slots = $$props.$$slots,
      slots = _$$props$$$slots === void 0 ? {} : _$$props$$$slots,
      $$scope = $$props.$$scope;
  validate_slots('DisplayMessageForm', slots, []);

  var handleSubmit = function () {
    //check that iFrame has loaded before accessing it and sending message
    if (iFrameLoaded) {
      console.log('Sending message to display from parent to child!');
      document.getElementById('iframe').contentWindow.postMessage({
        "function": 'displayMessage',
        args: {
          messageText: outgoingMessageText
        }
      }, "http://localhost:3000/");
    } else {
      throw new Meteor.Error('iFrame not loaded yet!');
    }
  };

  var writable_props = [];
  Object.keys($$props).forEach(function (key) {
    if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console_1.warn("<DisplayMessageForm> was created with unknown prop '" + key + "'");
  });

  function input_input_handler() {
    outgoingMessageText = this.value;
    $$invalidate(0, outgoingMessageText);
  }

  $$self.$capture_state = function () {
    return {
      iFrameLoaded: iFrameLoaded,
      handleSubmit: handleSubmit,
      outgoingMessageText: outgoingMessageText
    };
  };

  $$self.$inject_state = function ($$props) {
    if ('outgoingMessageText' in $$props) $$invalidate(0, outgoingMessageText = $$props.outgoingMessageText);
  };

  if ($$props && "$$inject" in $$props) {
    $$self.$inject_state($$props.$$inject);
  }

  $: $$invalidate(0, outgoingMessageText = "");

  return [outgoingMessageText, handleSubmit, input_input_handler];
}

var DisplayMessageForm = /*#__PURE__*/function (_SvelteComponentDev) {
  _inheritsLoose(DisplayMessageForm, _SvelteComponentDev);

  function DisplayMessageForm(options) {
    var _this;

    _this = _SvelteComponentDev.call(this, options) || this;
    init(_assertThisInitialized(_this), options, instance, create_fragment, safe_not_equal, {});
    dispatch_dev("SvelteRegisterComponent", {
      component: _assertThisInitialized(_this),
      tagName: "DisplayMessageForm",
      options: options,
      id: create_fragment.name
    });
    return _this;
  }

  return DisplayMessageForm;
}(SvelteComponentDev);

module.exportDefault(DisplayMessageForm);
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"Foods.svelte":function module(require,exports,module){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// imports/ui/Foods.svelte                                                                                            //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
var _assertThisInitialized;

module.link("@babel/runtime/helpers/assertThisInitialized", {
  default: function (v) {
    _assertThisInitialized = v;
  }
}, 0);

var _inheritsLoose;

module.link("@babel/runtime/helpers/inheritsLoose", {
  default: function (v) {
    _inheritsLoose = v;
  }
}, 1);

var _slicedToArray;

module.link("@babel/runtime/helpers/slicedToArray", {
  default: function (v) {
    _slicedToArray = v;
  }
}, 2);
var SvelteComponentDev, add_location, append_dev, destroy_each, detach_dev, dispatch_dev, element, init, insert_dev, noop, safe_not_equal, space, validate_each_argument, validate_slots;
module.link("svelte/internal", {
  SvelteComponentDev: function (v) {
    SvelteComponentDev = v;
  },
  add_location: function (v) {
    add_location = v;
  },
  append_dev: function (v) {
    append_dev = v;
  },
  destroy_each: function (v) {
    destroy_each = v;
  },
  detach_dev: function (v) {
    detach_dev = v;
  },
  dispatch_dev: function (v) {
    dispatch_dev = v;
  },
  element: function (v) {
    element = v;
  },
  init: function (v) {
    init = v;
  },
  insert_dev: function (v) {
    insert_dev = v;
  },
  noop: function (v) {
    noop = v;
  },
  safe_not_equal: function (v) {
    safe_not_equal = v;
  },
  space: function (v) {
    space = v;
  },
  validate_each_argument: function (v) {
    validate_each_argument = v;
  },
  validate_slots: function (v) {
    validate_slots = v;
  }
}, 0);

var _m_createReactiveWrapper;

module.link("meteor/zodern:melte/tracker", {
  createReactiveWrapper: function (v) {
    _m_createReactiveWrapper = v;
  }
}, 1);
var FoodsCollection;
module.link("/imports/db/foodsCollection", {
  FoodsCollection: function (v) {
    FoodsCollection = v;
  }
}, 2);
var file = "imports/ui/Foods.svelte";

function get_each_context(ctx, list, i) {
  var child_ctx = ctx.slice();
  child_ctx[3] = list[i];
  return child_ctx;
} // (27:8) {#each foods as food}


function create_each_block(ctx) {
  var p;
  var block = {
    c: function () {
      function create() {
        p = element("p");
        p.textContent = "food.name";
        add_location(p, file, 27, 12, 584);
      }

      return create;
    }(),
    m: function () {
      function mount(target, anchor) {
        insert_dev(target, p, anchor);
      }

      return mount;
    }(),
    d: function () {
      function destroy(detaching) {
        if (detaching) detach_dev(p);
      }

      return destroy;
    }()
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_each_block.name,
    type: "each",
    source: "(27:8) {#each foods as food}",
    ctx: ctx
  });
  return block;
}

function create_fragment(ctx) {
  var div;
  var h2;
  var t1;
  var ul;
  var each_value =
  /*foods*/
  ctx[0];
  validate_each_argument(each_value);
  var each_blocks = [];

  for (var i = 0; i < each_value.length; i += 1) {
    each_blocks[i] = create_each_block(get_each_context(ctx, each_value, i));
  }

  var block = {
    c: function () {
      function create() {
        div = element("div");
        h2 = element("h2");
        h2.textContent = "Foods Collection:";
        t1 = space();
        ul = element("ul");

        for (var _i = 0; _i < each_blocks.length; _i += 1) {
          each_blocks[_i].c();
        }

        add_location(h2, file, 22, 4, 492);
        add_location(ul, file, 25, 4, 537);
        add_location(div, file, 21, 0, 482);
      }

      return create;
    }(),
    l: function () {
      function claim(nodes) {
        throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
      }

      return claim;
    }(),
    m: function () {
      function mount(target, anchor) {
        insert_dev(target, div, anchor);
        append_dev(div, h2);
        append_dev(div, t1);
        append_dev(div, ul);

        for (var _i2 = 0; _i2 < each_blocks.length; _i2 += 1) {
          each_blocks[_i2].m(ul, null);
        }
      }

      return mount;
    }(),
    p: function () {
      function update(ctx, _ref) {
        var _ref2 = _slicedToArray(_ref, 1),
            dirty = _ref2[0];

        if (dirty &
        /*foods*/
        1) {
          var old_length = each_value.length;
          each_value =
          /*foods*/
          ctx[0];
          validate_each_argument(each_value);

          var _i3;

          for (_i3 = old_length; _i3 < each_value.length; _i3 += 1) {
            var child_ctx = get_each_context(ctx, each_value, _i3);

            if (!each_blocks[_i3]) {
              each_blocks[_i3] = create_each_block(child_ctx);

              each_blocks[_i3].c();

              each_blocks[_i3].m(ul, null);
            }
          }

          for (_i3 = each_value.length; _i3 < old_length; _i3 += 1) {
            each_blocks[_i3].d(1);
          }

          each_blocks.length = each_value.length;
        }
      }

      return update;
    }(),
    i: noop,
    o: noop,
    d: function () {
      function destroy(detaching) {
        if (detaching) detach_dev(div);
        destroy_each(each_blocks, detaching);
      }

      return destroy;
    }()
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_fragment.name,
    type: "component",
    source: "",
    ctx: ctx
  });
  return block;
}

function instance($$self, $$props, $$invalidate) {
  var _$$props$$$slots = $$props.$$slots,
      slots = _$$props$$$slots === void 0 ? {} : _$$props$$$slots,
      $$scope = $$props.$$scope;
  validate_slots('Foods', slots, []);

  var _m_tracker0 = _m_createReactiveWrapper();

  var subscriber = Meteor.subscribe('foods');
  var foods = [];
  var writable_props = [];
  Object.keys($$props).forEach(function (key) {
    if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn("<Foods> was created with unknown prop '" + key + "'");
  });

  $$self.$capture_state = function () {
    return {
      _m_createReactiveWrapper: _m_createReactiveWrapper,
      _m_tracker0: _m_tracker0,
      FoodsCollection: FoodsCollection,
      subscriber: subscriber,
      foods: foods
    };
  };

  $$self.$inject_state = function ($$props) {
    if ('foods' in $$props) $$invalidate(0, foods = $$props.foods);
  };

  if ($$props && "$$inject" in $$props) {
    $$self.$inject_state($$props.$$inject);
  }

  $: _m_tracker0(function () {
    {
      if (subscriber.ready()) {
        $$invalidate(0, foods = FoodsCollection.find({}).fetch());
      }
    }
  });

  return [foods];
}

var Foods = /*#__PURE__*/function (_SvelteComponentDev) {
  _inheritsLoose(Foods, _SvelteComponentDev);

  function Foods(options) {
    var _this;

    _this = _SvelteComponentDev.call(this, options) || this;
    init(_assertThisInitialized(_this), options, instance, create_fragment, safe_not_equal, {});
    dispatch_dev("SvelteRegisterComponent", {
      component: _assertThisInitialized(_this),
      tagName: "Foods",
      options: options,
      id: create_fragment.name
    });
    return _this;
  }

  return Foods;
}(SvelteComponentDev);

module.exportDefault(Foods);
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"Message.svelte":function module(require,exports,module){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// imports/ui/Message.svelte                                                                                          //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
var _assertThisInitialized;

module.link("@babel/runtime/helpers/assertThisInitialized", {
  default: function (v) {
    _assertThisInitialized = v;
  }
}, 0);

var _inheritsLoose;

module.link("@babel/runtime/helpers/inheritsLoose", {
  default: function (v) {
    _inheritsLoose = v;
  }
}, 1);

var _slicedToArray;

module.link("@babel/runtime/helpers/slicedToArray", {
  default: function (v) {
    _slicedToArray = v;
  }
}, 2);
var SvelteComponentDev, add_location, append_dev, component_subscribe, detach_dev, dispatch_dev, element, init, insert_dev, noop, safe_not_equal, set_data_dev, text, validate_slots, validate_store;
module.link("svelte/internal", {
  SvelteComponentDev: function (v) {
    SvelteComponentDev = v;
  },
  add_location: function (v) {
    add_location = v;
  },
  append_dev: function (v) {
    append_dev = v;
  },
  component_subscribe: function (v) {
    component_subscribe = v;
  },
  detach_dev: function (v) {
    detach_dev = v;
  },
  dispatch_dev: function (v) {
    dispatch_dev = v;
  },
  element: function (v) {
    element = v;
  },
  init: function (v) {
    init = v;
  },
  insert_dev: function (v) {
    insert_dev = v;
  },
  noop: function (v) {
    noop = v;
  },
  safe_not_equal: function (v) {
    safe_not_equal = v;
  },
  set_data_dev: function (v) {
    set_data_dev = v;
  },
  text: function (v) {
    text = v;
  },
  validate_slots: function (v) {
    validate_slots = v;
  },
  validate_store: function (v) {
    validate_store = v;
  }
}, 0);
var incomingMessageText;
module.link("/imports/api/stores", {
  incomingMessageText: function (v) {
    incomingMessageText = v;
  }
}, 1);
var file = "imports/ui/Message.svelte"; // (8:4) {:else}

function create_else_block(ctx) {
  var h2;
  var t0;
  var t1;
  var block = {
    c: function () {
      function create() {
        h2 = element("h2");
        t0 = text("Message received from child: ");
        t1 = text(
        /*$incomingMessageText*/
        ctx[0]);
        add_location(h2, file, 8, 8, 185);
      }

      return create;
    }(),
    m: function () {
      function mount(target, anchor) {
        insert_dev(target, h2, anchor);
        append_dev(h2, t0);
        append_dev(h2, t1);
      }

      return mount;
    }(),
    p: function () {
      function update(ctx, dirty) {
        if (dirty &
        /*$incomingMessageText*/
        1) set_data_dev(t1,
        /*$incomingMessageText*/
        ctx[0]);
      }

      return update;
    }(),
    d: function () {
      function destroy(detaching) {
        if (detaching) detach_dev(h2);
      }

      return destroy;
    }()
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_else_block.name,
    type: "else",
    source: "(8:4) {:else}",
    ctx: ctx
  });
  return block;
} // (6:4) {#if (!$incomingMessageText)}


function create_if_block(ctx) {
  var h2;
  var block = {
    c: function () {
      function create() {
        h2 = element("h2");
        h2.textContent = "Listening for messages...";
        add_location(h2, file, 6, 8, 130);
      }

      return create;
    }(),
    m: function () {
      function mount(target, anchor) {
        insert_dev(target, h2, anchor);
      }

      return mount;
    }(),
    p: noop,
    d: function () {
      function destroy(detaching) {
        if (detaching) detach_dev(h2);
      }

      return destroy;
    }()
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_if_block.name,
    type: "if",
    source: "(6:4) {#if (!$incomingMessageText)}",
    ctx: ctx
  });
  return block;
}

function create_fragment(ctx) {
  var div;

  function select_block_type(ctx, dirty) {
    if (!
    /*$incomingMessageText*/
    ctx[0]) return create_if_block;
    return create_else_block;
  }

  var current_block_type = select_block_type(ctx, -1);
  var if_block = current_block_type(ctx);
  var block = {
    c: function () {
      function create() {
        div = element("div");
        if_block.c();
        add_location(div, file, 4, 0, 82);
      }

      return create;
    }(),
    l: function () {
      function claim(nodes) {
        throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
      }

      return claim;
    }(),
    m: function () {
      function mount(target, anchor) {
        insert_dev(target, div, anchor);
        if_block.m(div, null);
      }

      return mount;
    }(),
    p: function () {
      function update(ctx, _ref) {
        var _ref2 = _slicedToArray(_ref, 1),
            dirty = _ref2[0];

        if (current_block_type === (current_block_type = select_block_type(ctx, dirty)) && if_block) {
          if_block.p(ctx, dirty);
        } else {
          if_block.d(1);
          if_block = current_block_type(ctx);

          if (if_block) {
            if_block.c();
            if_block.m(div, null);
          }
        }
      }

      return update;
    }(),
    i: noop,
    o: noop,
    d: function () {
      function destroy(detaching) {
        if (detaching) detach_dev(div);
        if_block.d();
      }

      return destroy;
    }()
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_fragment.name,
    type: "component",
    source: "",
    ctx: ctx
  });
  return block;
}

function instance($$self, $$props, $$invalidate) {
  var $incomingMessageText;
  validate_store(incomingMessageText, 'incomingMessageText');
  component_subscribe($$self, incomingMessageText, function ($$value) {
    return $$invalidate(0, $incomingMessageText = $$value);
  });
  var _$$props$$$slots = $$props.$$slots,
      slots = _$$props$$$slots === void 0 ? {} : _$$props$$$slots,
      $$scope = $$props.$$scope;
  validate_slots('Message', slots, []);
  var writable_props = [];
  Object.keys($$props).forEach(function (key) {
    if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn("<Message> was created with unknown prop '" + key + "'");
  });

  $$self.$capture_state = function () {
    return {
      incomingMessageText: incomingMessageText,
      $incomingMessageText: $incomingMessageText
    };
  };

  return [$incomingMessageText];
}

var Message = /*#__PURE__*/function (_SvelteComponentDev) {
  _inheritsLoose(Message, _SvelteComponentDev);

  function Message(options) {
    var _this;

    _this = _SvelteComponentDev.call(this, options) || this;
    init(_assertThisInitialized(_this), options, instance, create_fragment, safe_not_equal, {});
    dispatch_dev("SvelteRegisterComponent", {
      component: _assertThisInitialized(_this),
      tagName: "Message",
      options: options,
      id: create_fragment.name
    });
    return _this;
  }

  return Message;
}(SvelteComponentDev);

module.exportDefault(Message);
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}}},"client":{"main.js":function module(require,exports,module){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// client/main.js                                                                                                     //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
var Meteor;
module.link("meteor/meteor", {
  Meteor: function (v) {
    Meteor = v;
  }
}, 0);
var App;
module.link("../imports/ui/App.svelte", {
  "default": function (v) {
    App = v;
  }
}, 1);
Meteor.startup(function () {
  new App({
    target: document.getElementById('app')
  });
});
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"public":{"constants.js":function module(require,exports,module){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// public/constants.js                                                                                                //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
module.export({PARENT_URL:function(){return PARENT_URL},CHILD_URL:function(){return CHILD_URL}},true);const PARENT_URL = "http://localhost:5000";
const CHILD_URL = "http://localhost:3000";

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}}},{
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

var exports = require("/client/main.js");