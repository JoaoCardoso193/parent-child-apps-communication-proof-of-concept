var require = meteorInstall({"imports":{"api":{"ChildToParentAPI.svelte":function module(require,exports,module){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// imports/api/ChildToParentAPI.svelte                                                                                //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
!function (module1) {
  let SvelteComponentDev, component_subscribe, dispatch_dev, globals, init, noop, safe_not_equal, validate_slots, validate_store;
  module1.link("svelte/internal", {
    SvelteComponentDev(v) {
      SvelteComponentDev = v;
    },

    component_subscribe(v) {
      component_subscribe = v;
    },

    dispatch_dev(v) {
      dispatch_dev = v;
    },

    globals(v) {
      globals = v;
    },

    init(v) {
      init = v;
    },

    noop(v) {
      noop = v;
    },

    safe_not_equal(v) {
      safe_not_equal = v;
    },

    validate_slots(v) {
      validate_slots = v;
    },

    validate_store(v) {
      validate_store = v;
    }

  }, 0);
  let PARENT_URL, CHILD_URL;
  module1.link("/public/constants", {
    PARENT_URL(v) {
      PARENT_URL = v;
    },

    CHILD_URL(v) {
      CHILD_URL = v;
    }

  }, 1);
  let incomingMessageText, count;
  module1.link("/imports/api/stores", {
    incomingMessageText(v) {
      incomingMessageText = v;
    },

    count(v) {
      count = v;
    }

  }, 2);

  let ___SVELTE_HMR_HOT_API;

  module1.link("meteor/zodern:melte/hmr-runtime.js", {
    "*"(v) {
      ___SVELTE_HMR_HOT_API = v;
    }

  }, 3);

  let ___SVELTE_HMR_HOT_API_PROXY_ADAPTER;

  module1.link("meteor/zodern:melte/proxy-adapter.js", {
    adapter(v) {
      ___SVELTE_HMR_HOT_API_PROXY_ADAPTER = v;
    }

  }, 4);
  const {
    Error: Error_1,
    console: console_1
  } = globals;
  const file = "imports/api/ChildToParentAPI.svelte";

  function create_fragment(ctx) {
    const block = {
      c: noop,
      l: function claim(nodes) {
        throw new Error_1("options.hydrate only works if the component was compiled with the `hydratable: true` option");
      },
      m: noop,
      p: noop,
      i: noop,
      o: noop,
      d: noop
    };
    dispatch_dev("SvelteRegisterBlock", {
      block,
      id: create_fragment.name,
      type: "component",
      source: "",
      ctx
    });
    return block;
  }

  function alertMessage(args) {
    //sanity check
    console.log("alertMessage function triggered on parent with args ".concat(args, "!")); //check args and alert

    if (typeof args.messageText === "string") {
      alert(args.messageText);
    }
  }

  function instance($$self, $$props, $$invalidate) {
    let $count;
    validate_store(count, 'count');
    component_subscribe($$self, count, $$value => $$invalidate(0, $count = $$value));
    let {
      $$slots: slots = {},
      $$scope
    } = $$props;
    validate_slots('ChildToParentAPI', slots, []);

    function displayMessage(args) {
      //sanity check
      console.log("displayMessage function triggered on parent with args ".concat(args, "!")); //check messageText is string

      if (typeof args.messageText === "string") {
        incomingMessageText.set(args.messageText);
      }
    } //function that increments count


    const incrementCount = () => {
      console.log("incrementCount function triggered on parent!");
      console.log($count);
      count.set($count + 1);
    }; //function that decrements count


    const decrementCount = () => {
      console.log("decrementCount function triggered on parent!");
      count.set($count - 1);
    }; //message handler


    window.addEventListener("message", function (message) {
      //function adapter
      const functionAdapter = {
        displayMessage,
        alertMessage,
        incrementCount,
        decrementCount
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
    const writable_props = [];
    Object.keys($$props).forEach(key => {
      if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console_1.warn("<ChildToParentAPI> was created with unknown prop '".concat(key, "'"));
    });

    $$self.$capture_state = () => ({
      PARENT_URL,
      CHILD_URL,
      incomingMessageText,
      count,
      displayMessage,
      alertMessage,
      incrementCount,
      decrementCount,
      $count
    });

    return [];
  }

  class ChildToParentAPI extends SvelteComponentDev {
    constructor(options) {
      super(options);
      init(this, options, instance, create_fragment, safe_not_equal, {});
      dispatch_dev("SvelteRegisterComponent", {
        component: this,
        tagName: "ChildToParentAPI",
        options,
        id: create_fragment.name
      });
    }

  }

  if (module && module.hot) {
    ChildToParentAPI = ___SVELTE_HMR_HOT_API.applyHmr({
      m: module,
      id: "imports/api/ChildToParentAPI.svelte",
      hotOptions: {
        "preserveLocalState": false,
        "noPreserveStateKey": ["@hmr:reset", "@!hmr"],
        "preserveAllLocalStateKey": "@hmr:keep-all",
        "preserveLocalStateKey": "@hmr:keep",
        "noReload": false,
        "optimistic": true,
        "acceptNamedExports": true,
        "acceptAccessors": true,
        "injectCss": true,
        "cssEjectDelay": 100,
        "native": false,
        "importAdapterName": "___SVELTE_HMR_HOT_API_PROXY_ADAPTER",
        "noOverlay": false
      },
      Component: ChildToParentAPI,
      ProxyAdapter: ___SVELTE_HMR_HOT_API_PROXY_ADAPTER,
      acceptable: true,
      preserveLocalState: false,
      cssId: undefined,
      nonCssHash: undefined,
      ignoreCss: false
    });
  }

  module1.exportDefault(ChildToParentAPI);
}.call(this, module);
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"stores.js":function module(require,exports,module){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// imports/api/stores.js                                                                                              //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
module.export({
  iFrameLoaded: () => iFrameLoaded,
  incomingMessageText: () => incomingMessageText,
  count: () => count
});
let writable;
module.link("svelte/store", {
  writable(v) {
    writable = v;
  }

}, 0);
const iFrameLoaded = writable(false);
const incomingMessageText = writable("");
const count = writable(0);
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"db":{"foodsCollection.js":function module(require,exports,module){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// imports/db/foodsCollection.js                                                                                      //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
module.export({
  FoodsCollection: () => FoodsCollection
});
let Mongo;
module.link("meteor/mongo", {
  Mongo(v) {
    Mongo = v;
  }

}, 0);
const FoodsCollection = new Mongo.Collection("foods");
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"ui":{"AlertMessageForm.svelte":function module(require,exports,module){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// imports/ui/AlertMessageForm.svelte                                                                                 //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
!function (module1) {
  let SvelteComponentDev, add_location, append_dev, attr_dev, detach_dev, dispatch_dev, element, globals, init, insert_dev, listen_dev, noop, prevent_default, run_all, safe_not_equal, set_input_value, space, validate_slots;
  module1.link("svelte/internal", {
    SvelteComponentDev(v) {
      SvelteComponentDev = v;
    },

    add_location(v) {
      add_location = v;
    },

    append_dev(v) {
      append_dev = v;
    },

    attr_dev(v) {
      attr_dev = v;
    },

    detach_dev(v) {
      detach_dev = v;
    },

    dispatch_dev(v) {
      dispatch_dev = v;
    },

    element(v) {
      element = v;
    },

    globals(v) {
      globals = v;
    },

    init(v) {
      init = v;
    },

    insert_dev(v) {
      insert_dev = v;
    },

    listen_dev(v) {
      listen_dev = v;
    },

    noop(v) {
      noop = v;
    },

    prevent_default(v) {
      prevent_default = v;
    },

    run_all(v) {
      run_all = v;
    },

    safe_not_equal(v) {
      safe_not_equal = v;
    },

    set_input_value(v) {
      set_input_value = v;
    },

    space(v) {
      space = v;
    },

    validate_slots(v) {
      validate_slots = v;
    }

  }, 0);
  let iFrameLoaded;
  module1.link("../api/stores", {
    iFrameLoaded(v) {
      iFrameLoaded = v;
    }

  }, 1);

  let ___SVELTE_HMR_HOT_API;

  module1.link("meteor/zodern:melte/hmr-runtime.js", {
    "*"(v) {
      ___SVELTE_HMR_HOT_API = v;
    }

  }, 2);

  let ___SVELTE_HMR_HOT_API_PROXY_ADAPTER;

  module1.link("meteor/zodern:melte/proxy-adapter.js", {
    adapter(v) {
      ___SVELTE_HMR_HOT_API_PROXY_ADAPTER = v;
    }

  }, 3);
  const {
    console: console_1
  } = globals;
  const file = "imports/ui/AlertMessageForm.svelte";

  function create_fragment(ctx) {
    let div;
    let form;
    let h3;
    let label;
    let t1;
    let br;
    let t2;
    let input;
    let t3;
    let button;
    let mounted;
    let dispose;
    const block = {
      c: function create() {
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
      },
      l: function claim(nodes) {
        throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
      },
      m: function mount(target, anchor) {
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
      },
      p: function update(ctx, _ref) {
        let [dirty] = _ref;

        if (dirty &
        /*outgoingMessageText*/
        1 && input.value !==
        /*outgoingMessageText*/
        ctx[0]) {
          set_input_value(input,
          /*outgoingMessageText*/
          ctx[0]);
        }
      },
      i: noop,
      o: noop,
      d: function destroy(detaching) {
        if (detaching) detach_dev(div);
        mounted = false;
        run_all(dispose);
      }
    };
    dispatch_dev("SvelteRegisterBlock", {
      block,
      id: create_fragment.name,
      type: "component",
      source: "",
      ctx
    });
    return block;
  }

  function instance($$self, $$props, $$invalidate) {
    let outgoingMessageText;
    let {
      $$slots: slots = {},
      $$scope
    } = $$props;
    validate_slots('AlertMessageForm', slots, []);

    const handleSubmit = () => {
      //check that iFrame has loaded before accessing it and sending message
      if (iFrameLoaded) {
        console.log('Sending message to display from parent to child!');
        document.getElementById('iframe').contentWindow.postMessage({
          function: 'alertMessage',
          args: {
            messageText: outgoingMessageText
          }
        }, "http://localhost:3000/");
      } else {
        throw new Meteor.Error('iFrame not loaded yet!');
      }
    };

    const writable_props = [];
    Object.keys($$props).forEach(key => {
      if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console_1.warn("<AlertMessageForm> was created with unknown prop '".concat(key, "'"));
    });

    function input_input_handler() {
      outgoingMessageText = this.value;
      $$invalidate(0, outgoingMessageText);
    }

    $$self.$capture_state = () => ({
      iFrameLoaded,
      handleSubmit,
      outgoingMessageText
    });

    $$self.$inject_state = $$props => {
      if ('outgoingMessageText' in $$props) $$invalidate(0, outgoingMessageText = $$props.outgoingMessageText);
    };

    if ($$props && "$$inject" in $$props) {
      $$self.$inject_state($$props.$$inject);
    }

    $: $$invalidate(0, outgoingMessageText = "");

    return [outgoingMessageText, handleSubmit, input_input_handler];
  }

  class AlertMessageForm extends SvelteComponentDev {
    constructor(options) {
      super(options);
      init(this, options, instance, create_fragment, safe_not_equal, {});
      dispatch_dev("SvelteRegisterComponent", {
        component: this,
        tagName: "AlertMessageForm",
        options,
        id: create_fragment.name
      });
    }

  }

  if (module && module.hot) {
    AlertMessageForm = ___SVELTE_HMR_HOT_API.applyHmr({
      m: module,
      id: "imports/ui/AlertMessageForm.svelte",
      hotOptions: {
        "preserveLocalState": false,
        "noPreserveStateKey": ["@hmr:reset", "@!hmr"],
        "preserveAllLocalStateKey": "@hmr:keep-all",
        "preserveLocalStateKey": "@hmr:keep",
        "noReload": false,
        "optimistic": true,
        "acceptNamedExports": true,
        "acceptAccessors": true,
        "injectCss": true,
        "cssEjectDelay": 100,
        "native": false,
        "importAdapterName": "___SVELTE_HMR_HOT_API_PROXY_ADAPTER",
        "noOverlay": false
      },
      Component: AlertMessageForm,
      ProxyAdapter: ___SVELTE_HMR_HOT_API_PROXY_ADAPTER,
      acceptable: true,
      preserveLocalState: false,
      cssId: undefined,
      nonCssHash: undefined,
      ignoreCss: false
    });
  }

  module1.exportDefault(AlertMessageForm);
}.call(this, module);
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"App.svelte":function module(require,exports,module){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// imports/ui/App.svelte                                                                                              //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
!function (module1) {
  let SvelteComponentDev, add_location, append_dev, attr_dev, create_component, destroy_component, detach_dev, dispatch_dev, element, globals, init, insert_dev, listen_dev, mount_component, noop, safe_not_equal, space, src_url_equal, transition_in, transition_out, validate_slots;
  module1.link("svelte/internal", {
    SvelteComponentDev(v) {
      SvelteComponentDev = v;
    },

    add_location(v) {
      add_location = v;
    },

    append_dev(v) {
      append_dev = v;
    },

    attr_dev(v) {
      attr_dev = v;
    },

    create_component(v) {
      create_component = v;
    },

    destroy_component(v) {
      destroy_component = v;
    },

    detach_dev(v) {
      detach_dev = v;
    },

    dispatch_dev(v) {
      dispatch_dev = v;
    },

    element(v) {
      element = v;
    },

    globals(v) {
      globals = v;
    },

    init(v) {
      init = v;
    },

    insert_dev(v) {
      insert_dev = v;
    },

    listen_dev(v) {
      listen_dev = v;
    },

    mount_component(v) {
      mount_component = v;
    },

    noop(v) {
      noop = v;
    },

    safe_not_equal(v) {
      safe_not_equal = v;
    },

    space(v) {
      space = v;
    },

    src_url_equal(v) {
      src_url_equal = v;
    },

    transition_in(v) {
      transition_in = v;
    },

    transition_out(v) {
      transition_out = v;
    },

    validate_slots(v) {
      validate_slots = v;
    }

  }, 0);
  let Message;
  module1.link("/imports/ui/Message", {
    default(v) {
      Message = v;
    }

  }, 1);
  let Counter;
  module1.link("/imports/ui/Counter", {
    default(v) {
      Counter = v;
    }

  }, 2);
  let Foods;
  module1.link("/imports/ui/Foods", {
    default(v) {
      Foods = v;
    }

  }, 3);
  let DisplayMessageForm;
  module1.link("/imports/ui/DisplayMessageForm", {
    default(v) {
      DisplayMessageForm = v;
    }

  }, 4);
  let AlertMessageForm;
  module1.link("/imports/ui/AlertMessageForm", {
    default(v) {
      AlertMessageForm = v;
    }

  }, 5);
  let ChildCounterButtons;
  module1.link("/imports/ui/ChildCounterButtons", {
    default(v) {
      ChildCounterButtons = v;
    }

  }, 6);
  let iFrameLoaded;
  module1.link("/imports/api/stores", {
    iFrameLoaded(v) {
      iFrameLoaded = v;
    }

  }, 7);
  let ChildToParentAPI;
  module1.link("/imports/api/ChildToParentAPI", {
    default(v) {
      ChildToParentAPI = v;
    }

  }, 8);

  let ___SVELTE_HMR_HOT_API;

  module1.link("meteor/zodern:melte/hmr-runtime.js", {
    "*"(v) {
      ___SVELTE_HMR_HOT_API = v;
    }

  }, 9);

  let ___SVELTE_HMR_HOT_API_PROXY_ADAPTER;

  module1.link("meteor/zodern:melte/proxy-adapter.js", {
    adapter(v) {
      ___SVELTE_HMR_HOT_API_PROXY_ADAPTER = v;
    }

  }, 10);
  const {
    console: console_1
  } = globals;
  const file = "imports/ui/App.svelte";

  function create_fragment(ctx) {
    let div1;
    let childtoparentapi;
    let t0;
    let h1;
    let t2;
    let message;
    let t3;
    let counter;
    let t4;
    let foods;
    let t5;
    let displaymessageform;
    let t6;
    let alertmessageform;
    let t7;
    let childcounterbuttons;
    let t8;
    let br;
    let t9;
    let div0;
    let iframe;
    let iframe_src_value;
    let current;
    let mounted;
    let dispose;
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
    const block = {
      c: function create() {
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
      },
      l: function claim(nodes) {
        throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
      },
      m: function mount(target, anchor) {
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
      },
      p: noop,
      i: function intro(local) {
        if (current) return;
        transition_in(childtoparentapi.$$.fragment, local);
        transition_in(message.$$.fragment, local);
        transition_in(counter.$$.fragment, local);
        transition_in(foods.$$.fragment, local);
        transition_in(displaymessageform.$$.fragment, local);
        transition_in(alertmessageform.$$.fragment, local);
        transition_in(childcounterbuttons.$$.fragment, local);
        current = true;
      },
      o: function outro(local) {
        transition_out(childtoparentapi.$$.fragment, local);
        transition_out(message.$$.fragment, local);
        transition_out(counter.$$.fragment, local);
        transition_out(foods.$$.fragment, local);
        transition_out(displaymessageform.$$.fragment, local);
        transition_out(alertmessageform.$$.fragment, local);
        transition_out(childcounterbuttons.$$.fragment, local);
        current = false;
      },
      d: function destroy(detaching) {
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
    };
    dispatch_dev("SvelteRegisterBlock", {
      block,
      id: create_fragment.name,
      type: "component",
      source: "",
      ctx
    });
    return block;
  }

  function instance($$self, $$props, $$invalidate) {
    let {
      $$slots: slots = {},
      $$scope
    } = $$props;
    validate_slots('App', slots, []);

    const oniFrameLoad = () => {
      iFrameLoaded.set(true);

      if (iFrameLoaded) {
        console.log('child iFrame loaded, logging from parent!');
      }
    };

    const writable_props = [];
    Object.keys($$props).forEach(key => {
      if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console_1.warn("<App> was created with unknown prop '".concat(key, "'"));
    });

    $$self.$capture_state = () => ({
      Message,
      Counter,
      Foods,
      DisplayMessageForm,
      AlertMessageForm,
      ChildCounterButtons,
      iFrameLoaded,
      ChildToParentAPI,
      oniFrameLoad
    });

    return [oniFrameLoad];
  }

  class App extends SvelteComponentDev {
    constructor(options) {
      super(options);
      init(this, options, instance, create_fragment, safe_not_equal, {});
      dispatch_dev("SvelteRegisterComponent", {
        component: this,
        tagName: "App",
        options,
        id: create_fragment.name
      });
    }

  }

  if (module && module.hot) {
    App = ___SVELTE_HMR_HOT_API.applyHmr({
      m: module,
      id: "imports/ui/App.svelte",
      hotOptions: {
        "preserveLocalState": false,
        "noPreserveStateKey": ["@hmr:reset", "@!hmr"],
        "preserveAllLocalStateKey": "@hmr:keep-all",
        "preserveLocalStateKey": "@hmr:keep",
        "noReload": false,
        "optimistic": true,
        "acceptNamedExports": true,
        "acceptAccessors": true,
        "injectCss": true,
        "cssEjectDelay": 100,
        "native": false,
        "importAdapterName": "___SVELTE_HMR_HOT_API_PROXY_ADAPTER",
        "noOverlay": false
      },
      Component: App,
      ProxyAdapter: ___SVELTE_HMR_HOT_API_PROXY_ADAPTER,
      acceptable: true,
      preserveLocalState: false,
      cssId: undefined,
      nonCssHash: undefined,
      ignoreCss: false
    });
  }

  module1.exportDefault(App);
}.call(this, module);
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"ChildCounterButtons.svelte":function module(require,exports,module){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// imports/ui/ChildCounterButtons.svelte                                                                              //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
!function (module1) {
  let SvelteComponentDev, add_location, append_dev, detach_dev, dispatch_dev, element, globals, init, insert_dev, listen_dev, noop, run_all, safe_not_equal, space, validate_slots;
  module1.link("svelte/internal", {
    SvelteComponentDev(v) {
      SvelteComponentDev = v;
    },

    add_location(v) {
      add_location = v;
    },

    append_dev(v) {
      append_dev = v;
    },

    detach_dev(v) {
      detach_dev = v;
    },

    dispatch_dev(v) {
      dispatch_dev = v;
    },

    element(v) {
      element = v;
    },

    globals(v) {
      globals = v;
    },

    init(v) {
      init = v;
    },

    insert_dev(v) {
      insert_dev = v;
    },

    listen_dev(v) {
      listen_dev = v;
    },

    noop(v) {
      noop = v;
    },

    run_all(v) {
      run_all = v;
    },

    safe_not_equal(v) {
      safe_not_equal = v;
    },

    space(v) {
      space = v;
    },

    validate_slots(v) {
      validate_slots = v;
    }

  }, 0);
  let iFrameLoaded;
  module1.link("/imports/api/stores", {
    iFrameLoaded(v) {
      iFrameLoaded = v;
    }

  }, 1);

  let ___SVELTE_HMR_HOT_API;

  module1.link("meteor/zodern:melte/hmr-runtime.js", {
    "*"(v) {
      ___SVELTE_HMR_HOT_API = v;
    }

  }, 2);

  let ___SVELTE_HMR_HOT_API_PROXY_ADAPTER;

  module1.link("meteor/zodern:melte/proxy-adapter.js", {
    adapter(v) {
      ___SVELTE_HMR_HOT_API_PROXY_ADAPTER = v;
    }

  }, 3);
  const {
    console: console_1
  } = globals;
  const file = "imports/ui/ChildCounterButtons.svelte";

  function create_fragment(ctx) {
    let div;
    let h3;
    let t1;
    let button0;
    let t3;
    let button1;
    let mounted;
    let dispose;
    const block = {
      c: function create() {
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
      },
      l: function claim(nodes) {
        throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
      },
      m: function mount(target, anchor) {
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
      },
      p: noop,
      i: noop,
      o: noop,
      d: function destroy(detaching) {
        if (detaching) detach_dev(div);
        mounted = false;
        run_all(dispose);
      }
    };
    dispatch_dev("SvelteRegisterBlock", {
      block,
      id: create_fragment.name,
      type: "component",
      source: "",
      ctx
    });
    return block;
  }

  function instance($$self, $$props, $$invalidate) {
    let {
      $$slots: slots = {},
      $$scope
    } = $$props;
    validate_slots('ChildCounterButtons', slots, []);

    const increment = () => {
      console.log('one increment trigger on parent');

      if (iFrameLoaded) {
        document.getElementById('iframe').contentWindow.postMessage({
          function: 'incrementCount'
        }, "http://localhost:3000/");
      } else {
        throw new Meteor.Error('iFrame not loaded yet!');
      }

      return;
    };

    const decrement = () => {
      if (iFrameLoaded) {
        document.getElementById('iframe').contentWindow.postMessage({
          function: 'decrementCount'
        }, "http://localhost:3000/");
      } else {
        throw new Meteor.Error('iFrame not loaded yet!');
      }
    };

    const writable_props = [];
    Object.keys($$props).forEach(key => {
      if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console_1.warn("<ChildCounterButtons> was created with unknown prop '".concat(key, "'"));
    });

    $$self.$capture_state = () => ({
      iFrameLoaded,
      increment,
      decrement
    });

    return [increment, decrement];
  }

  class ChildCounterButtons extends SvelteComponentDev {
    constructor(options) {
      super(options);
      init(this, options, instance, create_fragment, safe_not_equal, {});
      dispatch_dev("SvelteRegisterComponent", {
        component: this,
        tagName: "ChildCounterButtons",
        options,
        id: create_fragment.name
      });
    }

  }

  if (module && module.hot) {
    ChildCounterButtons = ___SVELTE_HMR_HOT_API.applyHmr({
      m: module,
      id: "imports/ui/ChildCounterButtons.svelte",
      hotOptions: {
        "preserveLocalState": false,
        "noPreserveStateKey": ["@hmr:reset", "@!hmr"],
        "preserveAllLocalStateKey": "@hmr:keep-all",
        "preserveLocalStateKey": "@hmr:keep",
        "noReload": false,
        "optimistic": true,
        "acceptNamedExports": true,
        "acceptAccessors": true,
        "injectCss": true,
        "cssEjectDelay": 100,
        "native": false,
        "importAdapterName": "___SVELTE_HMR_HOT_API_PROXY_ADAPTER",
        "noOverlay": false
      },
      Component: ChildCounterButtons,
      ProxyAdapter: ___SVELTE_HMR_HOT_API_PROXY_ADAPTER,
      acceptable: true,
      preserveLocalState: false,
      cssId: undefined,
      nonCssHash: undefined,
      ignoreCss: false
    });
  }

  module1.exportDefault(ChildCounterButtons);
}.call(this, module);
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"Counter.svelte":function module(require,exports,module){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// imports/ui/Counter.svelte                                                                                          //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
!function (module1) {
  let SvelteComponentDev, add_location, append_dev, component_subscribe, detach_dev, dispatch_dev, element, init, insert_dev, listen_dev, noop, run_all, safe_not_equal, set_data_dev, space, text, validate_slots, validate_store;
  module1.link("svelte/internal", {
    SvelteComponentDev(v) {
      SvelteComponentDev = v;
    },

    add_location(v) {
      add_location = v;
    },

    append_dev(v) {
      append_dev = v;
    },

    component_subscribe(v) {
      component_subscribe = v;
    },

    detach_dev(v) {
      detach_dev = v;
    },

    dispatch_dev(v) {
      dispatch_dev = v;
    },

    element(v) {
      element = v;
    },

    init(v) {
      init = v;
    },

    insert_dev(v) {
      insert_dev = v;
    },

    listen_dev(v) {
      listen_dev = v;
    },

    noop(v) {
      noop = v;
    },

    run_all(v) {
      run_all = v;
    },

    safe_not_equal(v) {
      safe_not_equal = v;
    },

    set_data_dev(v) {
      set_data_dev = v;
    },

    space(v) {
      space = v;
    },

    text(v) {
      text = v;
    },

    validate_slots(v) {
      validate_slots = v;
    },

    validate_store(v) {
      validate_store = v;
    }

  }, 0);
  let count;
  module1.link("/imports/api/stores", {
    count(v) {
      count = v;
    }

  }, 1);

  let ___SVELTE_HMR_HOT_API;

  module1.link("meteor/zodern:melte/hmr-runtime.js", {
    "*"(v) {
      ___SVELTE_HMR_HOT_API = v;
    }

  }, 2);

  let ___SVELTE_HMR_HOT_API_PROXY_ADAPTER;

  module1.link("meteor/zodern:melte/proxy-adapter.js", {
    adapter(v) {
      ___SVELTE_HMR_HOT_API_PROXY_ADAPTER = v;
    }

  }, 3);
  const file = "imports/ui/Counter.svelte";

  function create_fragment(ctx) {
    let div;
    let h2;
    let t0;
    let t1;
    let t2;
    let button0;
    let t4;
    let button1;
    let mounted;
    let dispose;
    const block = {
      c: function create() {
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
      },
      l: function claim(nodes) {
        throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
      },
      m: function mount(target, anchor) {
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
      },
      p: function update(ctx, _ref) {
        let [dirty] = _ref;
        if (dirty &
        /*$count*/
        1) set_data_dev(t1,
        /*$count*/
        ctx[0]);
      },
      i: noop,
      o: noop,
      d: function destroy(detaching) {
        if (detaching) detach_dev(div);
        mounted = false;
        run_all(dispose);
      }
    };
    dispatch_dev("SvelteRegisterBlock", {
      block,
      id: create_fragment.name,
      type: "component",
      source: "",
      ctx
    });
    return block;
  }

  function instance($$self, $$props, $$invalidate) {
    let $count;
    validate_store(count, 'count');
    component_subscribe($$self, count, $$value => $$invalidate(0, $count = $$value));
    let {
      $$slots: slots = {},
      $$scope
    } = $$props;
    validate_slots('Counter', slots, []);
    const writable_props = [];
    Object.keys($$props).forEach(key => {
      if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn("<Counter> was created with unknown prop '".concat(key, "'"));
    });

    const click_handler = () => {
      count.set($count + 1);
    };

    const click_handler_1 = () => {
      count.set($count - 1);
    };

    $$self.$capture_state = () => ({
      count,
      $count
    });

    return [$count, click_handler, click_handler_1];
  }

  class Counter extends SvelteComponentDev {
    constructor(options) {
      super(options);
      init(this, options, instance, create_fragment, safe_not_equal, {});
      dispatch_dev("SvelteRegisterComponent", {
        component: this,
        tagName: "Counter",
        options,
        id: create_fragment.name
      });
    }

  }

  if (module && module.hot) {
    Counter = ___SVELTE_HMR_HOT_API.applyHmr({
      m: module,
      id: "imports/ui/Counter.svelte",
      hotOptions: {
        "preserveLocalState": false,
        "noPreserveStateKey": ["@hmr:reset", "@!hmr"],
        "preserveAllLocalStateKey": "@hmr:keep-all",
        "preserveLocalStateKey": "@hmr:keep",
        "noReload": false,
        "optimistic": true,
        "acceptNamedExports": true,
        "acceptAccessors": true,
        "injectCss": true,
        "cssEjectDelay": 100,
        "native": false,
        "importAdapterName": "___SVELTE_HMR_HOT_API_PROXY_ADAPTER",
        "noOverlay": false
      },
      Component: Counter,
      ProxyAdapter: ___SVELTE_HMR_HOT_API_PROXY_ADAPTER,
      acceptable: true,
      preserveLocalState: false,
      cssId: undefined,
      nonCssHash: undefined,
      ignoreCss: false
    });
  }

  module1.exportDefault(Counter);
}.call(this, module);
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"DisplayMessageForm.svelte":function module(require,exports,module){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// imports/ui/DisplayMessageForm.svelte                                                                               //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
!function (module1) {
  let SvelteComponentDev, add_location, append_dev, attr_dev, detach_dev, dispatch_dev, element, globals, init, insert_dev, listen_dev, noop, prevent_default, run_all, safe_not_equal, set_input_value, space, validate_slots;
  module1.link("svelte/internal", {
    SvelteComponentDev(v) {
      SvelteComponentDev = v;
    },

    add_location(v) {
      add_location = v;
    },

    append_dev(v) {
      append_dev = v;
    },

    attr_dev(v) {
      attr_dev = v;
    },

    detach_dev(v) {
      detach_dev = v;
    },

    dispatch_dev(v) {
      dispatch_dev = v;
    },

    element(v) {
      element = v;
    },

    globals(v) {
      globals = v;
    },

    init(v) {
      init = v;
    },

    insert_dev(v) {
      insert_dev = v;
    },

    listen_dev(v) {
      listen_dev = v;
    },

    noop(v) {
      noop = v;
    },

    prevent_default(v) {
      prevent_default = v;
    },

    run_all(v) {
      run_all = v;
    },

    safe_not_equal(v) {
      safe_not_equal = v;
    },

    set_input_value(v) {
      set_input_value = v;
    },

    space(v) {
      space = v;
    },

    validate_slots(v) {
      validate_slots = v;
    }

  }, 0);
  let iFrameLoaded;
  module1.link("../api/stores", {
    iFrameLoaded(v) {
      iFrameLoaded = v;
    }

  }, 1);

  let ___SVELTE_HMR_HOT_API;

  module1.link("meteor/zodern:melte/hmr-runtime.js", {
    "*"(v) {
      ___SVELTE_HMR_HOT_API = v;
    }

  }, 2);

  let ___SVELTE_HMR_HOT_API_PROXY_ADAPTER;

  module1.link("meteor/zodern:melte/proxy-adapter.js", {
    adapter(v) {
      ___SVELTE_HMR_HOT_API_PROXY_ADAPTER = v;
    }

  }, 3);
  const {
    console: console_1
  } = globals;
  const file = "imports/ui/DisplayMessageForm.svelte";

  function create_fragment(ctx) {
    let div;
    let form;
    let h3;
    let label;
    let t1;
    let br;
    let t2;
    let input;
    let t3;
    let button;
    let mounted;
    let dispose;
    const block = {
      c: function create() {
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
      },
      l: function claim(nodes) {
        throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
      },
      m: function mount(target, anchor) {
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
      },
      p: function update(ctx, _ref) {
        let [dirty] = _ref;

        if (dirty &
        /*outgoingMessageText*/
        1 && input.value !==
        /*outgoingMessageText*/
        ctx[0]) {
          set_input_value(input,
          /*outgoingMessageText*/
          ctx[0]);
        }
      },
      i: noop,
      o: noop,
      d: function destroy(detaching) {
        if (detaching) detach_dev(div);
        mounted = false;
        run_all(dispose);
      }
    };
    dispatch_dev("SvelteRegisterBlock", {
      block,
      id: create_fragment.name,
      type: "component",
      source: "",
      ctx
    });
    return block;
  }

  function instance($$self, $$props, $$invalidate) {
    let outgoingMessageText;
    let {
      $$slots: slots = {},
      $$scope
    } = $$props;
    validate_slots('DisplayMessageForm', slots, []);

    const handleSubmit = () => {
      //check that iFrame has loaded before accessing it and sending message
      if (iFrameLoaded) {
        console.log('Sending message to display from parent to child!');
        document.getElementById('iframe').contentWindow.postMessage({
          function: 'displayMessage',
          args: {
            messageText: outgoingMessageText
          }
        }, "http://localhost:3000/");
      } else {
        throw new Meteor.Error('iFrame not loaded yet!');
      }
    };

    const writable_props = [];
    Object.keys($$props).forEach(key => {
      if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console_1.warn("<DisplayMessageForm> was created with unknown prop '".concat(key, "'"));
    });

    function input_input_handler() {
      outgoingMessageText = this.value;
      $$invalidate(0, outgoingMessageText);
    }

    $$self.$capture_state = () => ({
      iFrameLoaded,
      handleSubmit,
      outgoingMessageText
    });

    $$self.$inject_state = $$props => {
      if ('outgoingMessageText' in $$props) $$invalidate(0, outgoingMessageText = $$props.outgoingMessageText);
    };

    if ($$props && "$$inject" in $$props) {
      $$self.$inject_state($$props.$$inject);
    }

    $: $$invalidate(0, outgoingMessageText = "");

    return [outgoingMessageText, handleSubmit, input_input_handler];
  }

  class DisplayMessageForm extends SvelteComponentDev {
    constructor(options) {
      super(options);
      init(this, options, instance, create_fragment, safe_not_equal, {});
      dispatch_dev("SvelteRegisterComponent", {
        component: this,
        tagName: "DisplayMessageForm",
        options,
        id: create_fragment.name
      });
    }

  }

  if (module && module.hot) {
    DisplayMessageForm = ___SVELTE_HMR_HOT_API.applyHmr({
      m: module,
      id: "imports/ui/DisplayMessageForm.svelte",
      hotOptions: {
        "preserveLocalState": false,
        "noPreserveStateKey": ["@hmr:reset", "@!hmr"],
        "preserveAllLocalStateKey": "@hmr:keep-all",
        "preserveLocalStateKey": "@hmr:keep",
        "noReload": false,
        "optimistic": true,
        "acceptNamedExports": true,
        "acceptAccessors": true,
        "injectCss": true,
        "cssEjectDelay": 100,
        "native": false,
        "importAdapterName": "___SVELTE_HMR_HOT_API_PROXY_ADAPTER",
        "noOverlay": false
      },
      Component: DisplayMessageForm,
      ProxyAdapter: ___SVELTE_HMR_HOT_API_PROXY_ADAPTER,
      acceptable: true,
      preserveLocalState: false,
      cssId: undefined,
      nonCssHash: undefined,
      ignoreCss: false
    });
  }

  module1.exportDefault(DisplayMessageForm);
}.call(this, module);
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"Foods.svelte":function module(require,exports,module){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// imports/ui/Foods.svelte                                                                                            //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
!function (module1) {
  let SvelteComponentDev, add_location, append_dev, destroy_each, detach_dev, dispatch_dev, element, init, insert_dev, noop, safe_not_equal, space, validate_each_argument, validate_slots;
  module1.link("svelte/internal", {
    SvelteComponentDev(v) {
      SvelteComponentDev = v;
    },

    add_location(v) {
      add_location = v;
    },

    append_dev(v) {
      append_dev = v;
    },

    destroy_each(v) {
      destroy_each = v;
    },

    detach_dev(v) {
      detach_dev = v;
    },

    dispatch_dev(v) {
      dispatch_dev = v;
    },

    element(v) {
      element = v;
    },

    init(v) {
      init = v;
    },

    insert_dev(v) {
      insert_dev = v;
    },

    noop(v) {
      noop = v;
    },

    safe_not_equal(v) {
      safe_not_equal = v;
    },

    space(v) {
      space = v;
    },

    validate_each_argument(v) {
      validate_each_argument = v;
    },

    validate_slots(v) {
      validate_slots = v;
    }

  }, 0);

  let _m_createReactiveWrapper;

  module1.link("meteor/zodern:melte/tracker", {
    createReactiveWrapper(v) {
      _m_createReactiveWrapper = v;
    }

  }, 1);
  let FoodsCollection;
  module1.link("/imports/db/foodsCollection", {
    FoodsCollection(v) {
      FoodsCollection = v;
    }

  }, 2);

  let ___SVELTE_HMR_HOT_API;

  module1.link("meteor/zodern:melte/hmr-runtime.js", {
    "*"(v) {
      ___SVELTE_HMR_HOT_API = v;
    }

  }, 3);

  let ___SVELTE_HMR_HOT_API_PROXY_ADAPTER;

  module1.link("meteor/zodern:melte/proxy-adapter.js", {
    adapter(v) {
      ___SVELTE_HMR_HOT_API_PROXY_ADAPTER = v;
    }

  }, 4);
  const file = "imports/ui/Foods.svelte";

  function get_each_context(ctx, list, i) {
    const child_ctx = ctx.slice();
    child_ctx[3] = list[i];
    return child_ctx;
  } // (27:8) {#each foods as food}


  function create_each_block(ctx) {
    let p;
    const block = {
      c: function create() {
        p = element("p");
        p.textContent = "food.name";
        add_location(p, file, 27, 12, 584);
      },
      m: function mount(target, anchor) {
        insert_dev(target, p, anchor);
      },
      d: function destroy(detaching) {
        if (detaching) detach_dev(p);
      }
    };
    dispatch_dev("SvelteRegisterBlock", {
      block,
      id: create_each_block.name,
      type: "each",
      source: "(27:8) {#each foods as food}",
      ctx
    });
    return block;
  }

  function create_fragment(ctx) {
    let div;
    let h2;
    let t1;
    let ul;
    let each_value =
    /*foods*/
    ctx[0];
    validate_each_argument(each_value);
    let each_blocks = [];

    for (let i = 0; i < each_value.length; i += 1) {
      each_blocks[i] = create_each_block(get_each_context(ctx, each_value, i));
    }

    const block = {
      c: function create() {
        div = element("div");
        h2 = element("h2");
        h2.textContent = "Foods Collection:";
        t1 = space();
        ul = element("ul");

        for (let i = 0; i < each_blocks.length; i += 1) {
          each_blocks[i].c();
        }

        add_location(h2, file, 22, 4, 492);
        add_location(ul, file, 25, 4, 537);
        add_location(div, file, 21, 0, 482);
      },
      l: function claim(nodes) {
        throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
      },
      m: function mount(target, anchor) {
        insert_dev(target, div, anchor);
        append_dev(div, h2);
        append_dev(div, t1);
        append_dev(div, ul);

        for (let i = 0; i < each_blocks.length; i += 1) {
          each_blocks[i].m(ul, null);
        }
      },
      p: function update(ctx, _ref) {
        let [dirty] = _ref;

        if (dirty &
        /*foods*/
        1) {
          const old_length = each_value.length;
          each_value =
          /*foods*/
          ctx[0];
          validate_each_argument(each_value);
          let i;

          for (i = old_length; i < each_value.length; i += 1) {
            const child_ctx = get_each_context(ctx, each_value, i);

            if (!each_blocks[i]) {
              each_blocks[i] = create_each_block(child_ctx);
              each_blocks[i].c();
              each_blocks[i].m(ul, null);
            }
          }

          for (i = each_value.length; i < old_length; i += 1) {
            each_blocks[i].d(1);
          }

          each_blocks.length = each_value.length;
        }
      },
      i: noop,
      o: noop,
      d: function destroy(detaching) {
        if (detaching) detach_dev(div);
        destroy_each(each_blocks, detaching);
      }
    };
    dispatch_dev("SvelteRegisterBlock", {
      block,
      id: create_fragment.name,
      type: "component",
      source: "",
      ctx
    });
    return block;
  }

  function instance($$self, $$props, $$invalidate) {
    let {
      $$slots: slots = {},
      $$scope
    } = $$props;
    validate_slots('Foods', slots, []);

    const _m_tracker0 = _m_createReactiveWrapper();

    const subscriber = Meteor.subscribe('foods');
    let foods = [];
    const writable_props = [];
    Object.keys($$props).forEach(key => {
      if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn("<Foods> was created with unknown prop '".concat(key, "'"));
    });

    $$self.$capture_state = () => ({
      _m_createReactiveWrapper,
      _m_tracker0,
      FoodsCollection,
      subscriber,
      foods
    });

    $$self.$inject_state = $$props => {
      if ('foods' in $$props) $$invalidate(0, foods = $$props.foods);
    };

    if ($$props && "$$inject" in $$props) {
      $$self.$inject_state($$props.$$inject);
    }

    $: _m_tracker0(() => {
      {
        if (subscriber.ready()) {
          $$invalidate(0, foods = FoodsCollection.find({}).fetch());
        }
      }
    });

    return [foods];
  }

  class Foods extends SvelteComponentDev {
    constructor(options) {
      super(options);
      init(this, options, instance, create_fragment, safe_not_equal, {});
      dispatch_dev("SvelteRegisterComponent", {
        component: this,
        tagName: "Foods",
        options,
        id: create_fragment.name
      });
    }

  }

  if (module && module.hot) {
    Foods = ___SVELTE_HMR_HOT_API.applyHmr({
      m: module,
      id: "imports/ui/Foods.svelte",
      hotOptions: {
        "preserveLocalState": false,
        "noPreserveStateKey": ["@hmr:reset", "@!hmr"],
        "preserveAllLocalStateKey": "@hmr:keep-all",
        "preserveLocalStateKey": "@hmr:keep",
        "noReload": false,
        "optimistic": true,
        "acceptNamedExports": true,
        "acceptAccessors": true,
        "injectCss": true,
        "cssEjectDelay": 100,
        "native": false,
        "importAdapterName": "___SVELTE_HMR_HOT_API_PROXY_ADAPTER",
        "noOverlay": false
      },
      Component: Foods,
      ProxyAdapter: ___SVELTE_HMR_HOT_API_PROXY_ADAPTER,
      acceptable: true,
      preserveLocalState: false,
      cssId: undefined,
      nonCssHash: undefined,
      ignoreCss: false
    });
  }

  module1.exportDefault(Foods);
}.call(this, module);
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"Message.svelte":function module(require,exports,module){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// imports/ui/Message.svelte                                                                                          //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
!function (module1) {
  let SvelteComponentDev, add_location, append_dev, component_subscribe, detach_dev, dispatch_dev, element, init, insert_dev, noop, safe_not_equal, set_data_dev, text, validate_slots, validate_store;
  module1.link("svelte/internal", {
    SvelteComponentDev(v) {
      SvelteComponentDev = v;
    },

    add_location(v) {
      add_location = v;
    },

    append_dev(v) {
      append_dev = v;
    },

    component_subscribe(v) {
      component_subscribe = v;
    },

    detach_dev(v) {
      detach_dev = v;
    },

    dispatch_dev(v) {
      dispatch_dev = v;
    },

    element(v) {
      element = v;
    },

    init(v) {
      init = v;
    },

    insert_dev(v) {
      insert_dev = v;
    },

    noop(v) {
      noop = v;
    },

    safe_not_equal(v) {
      safe_not_equal = v;
    },

    set_data_dev(v) {
      set_data_dev = v;
    },

    text(v) {
      text = v;
    },

    validate_slots(v) {
      validate_slots = v;
    },

    validate_store(v) {
      validate_store = v;
    }

  }, 0);
  let incomingMessageText;
  module1.link("/imports/api/stores", {
    incomingMessageText(v) {
      incomingMessageText = v;
    }

  }, 1);

  let ___SVELTE_HMR_HOT_API;

  module1.link("meteor/zodern:melte/hmr-runtime.js", {
    "*"(v) {
      ___SVELTE_HMR_HOT_API = v;
    }

  }, 2);

  let ___SVELTE_HMR_HOT_API_PROXY_ADAPTER;

  module1.link("meteor/zodern:melte/proxy-adapter.js", {
    adapter(v) {
      ___SVELTE_HMR_HOT_API_PROXY_ADAPTER = v;
    }

  }, 3);
  const file = "imports/ui/Message.svelte"; // (8:4) {:else}

  function create_else_block(ctx) {
    let h2;
    let t0;
    let t1;
    const block = {
      c: function create() {
        h2 = element("h2");
        t0 = text("Message received from child: ");
        t1 = text(
        /*$incomingMessageText*/
        ctx[0]);
        add_location(h2, file, 8, 8, 185);
      },
      m: function mount(target, anchor) {
        insert_dev(target, h2, anchor);
        append_dev(h2, t0);
        append_dev(h2, t1);
      },
      p: function update(ctx, dirty) {
        if (dirty &
        /*$incomingMessageText*/
        1) set_data_dev(t1,
        /*$incomingMessageText*/
        ctx[0]);
      },
      d: function destroy(detaching) {
        if (detaching) detach_dev(h2);
      }
    };
    dispatch_dev("SvelteRegisterBlock", {
      block,
      id: create_else_block.name,
      type: "else",
      source: "(8:4) {:else}",
      ctx
    });
    return block;
  } // (6:4) {#if (!$incomingMessageText)}


  function create_if_block(ctx) {
    let h2;
    const block = {
      c: function create() {
        h2 = element("h2");
        h2.textContent = "Listening for messages...";
        add_location(h2, file, 6, 8, 130);
      },
      m: function mount(target, anchor) {
        insert_dev(target, h2, anchor);
      },
      p: noop,
      d: function destroy(detaching) {
        if (detaching) detach_dev(h2);
      }
    };
    dispatch_dev("SvelteRegisterBlock", {
      block,
      id: create_if_block.name,
      type: "if",
      source: "(6:4) {#if (!$incomingMessageText)}",
      ctx
    });
    return block;
  }

  function create_fragment(ctx) {
    let div;

    function select_block_type(ctx, dirty) {
      if (!
      /*$incomingMessageText*/
      ctx[0]) return create_if_block;
      return create_else_block;
    }

    let current_block_type = select_block_type(ctx, -1);
    let if_block = current_block_type(ctx);
    const block = {
      c: function create() {
        div = element("div");
        if_block.c();
        add_location(div, file, 4, 0, 82);
      },
      l: function claim(nodes) {
        throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
      },
      m: function mount(target, anchor) {
        insert_dev(target, div, anchor);
        if_block.m(div, null);
      },
      p: function update(ctx, _ref) {
        let [dirty] = _ref;

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
      },
      i: noop,
      o: noop,
      d: function destroy(detaching) {
        if (detaching) detach_dev(div);
        if_block.d();
      }
    };
    dispatch_dev("SvelteRegisterBlock", {
      block,
      id: create_fragment.name,
      type: "component",
      source: "",
      ctx
    });
    return block;
  }

  function instance($$self, $$props, $$invalidate) {
    let $incomingMessageText;
    validate_store(incomingMessageText, 'incomingMessageText');
    component_subscribe($$self, incomingMessageText, $$value => $$invalidate(0, $incomingMessageText = $$value));
    let {
      $$slots: slots = {},
      $$scope
    } = $$props;
    validate_slots('Message', slots, []);
    const writable_props = [];
    Object.keys($$props).forEach(key => {
      if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn("<Message> was created with unknown prop '".concat(key, "'"));
    });

    $$self.$capture_state = () => ({
      incomingMessageText,
      $incomingMessageText
    });

    return [$incomingMessageText];
  }

  class Message extends SvelteComponentDev {
    constructor(options) {
      super(options);
      init(this, options, instance, create_fragment, safe_not_equal, {});
      dispatch_dev("SvelteRegisterComponent", {
        component: this,
        tagName: "Message",
        options,
        id: create_fragment.name
      });
    }

  }

  if (module && module.hot) {
    Message = ___SVELTE_HMR_HOT_API.applyHmr({
      m: module,
      id: "imports/ui/Message.svelte",
      hotOptions: {
        "preserveLocalState": false,
        "noPreserveStateKey": ["@hmr:reset", "@!hmr"],
        "preserveAllLocalStateKey": "@hmr:keep-all",
        "preserveLocalStateKey": "@hmr:keep",
        "noReload": false,
        "optimistic": true,
        "acceptNamedExports": true,
        "acceptAccessors": true,
        "injectCss": true,
        "cssEjectDelay": 100,
        "native": false,
        "importAdapterName": "___SVELTE_HMR_HOT_API_PROXY_ADAPTER",
        "noOverlay": false
      },
      Component: Message,
      ProxyAdapter: ___SVELTE_HMR_HOT_API_PROXY_ADAPTER,
      acceptable: true,
      preserveLocalState: false,
      cssId: undefined,
      nonCssHash: undefined,
      ignoreCss: false
    });
  }

  module1.exportDefault(Message);
}.call(this, module);
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}}},"client":{"main.js":function module(require,exports,module){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// client/main.js                                                                                                     //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
let Meteor;
module.link("meteor/meteor", {
  Meteor(v) {
    Meteor = v;
  }

}, 0);
let App;
module.link("../imports/ui/App.svelte", {
  default(v) {
    App = v;
  }

}, 1);
Meteor.startup(() => {
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
module.export({PARENT_URL:()=>PARENT_URL,CHILD_URL:()=>CHILD_URL},true);const PARENT_URL = "http://localhost:5000";
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