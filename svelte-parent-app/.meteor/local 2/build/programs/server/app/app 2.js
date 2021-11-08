var require = meteorInstall({"server":{"main.js":function module(require,exports,module){

//////////////////////////////////////////////////////////////////////////////////////
//                                                                                  //
// server/main.js                                                                   //
//                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////
                                                                                    //
let Meteor;
module.link("meteor/meteor", {
  Meteor(v) {
    Meteor = v;
  }

}, 0);
Meteor.startup(() => {// CORS
  // WebApp.rawConnectHandlers.use(function (req, res, next) {
  //   res.setHeader("Access-Control-Allow-Origin", "*");
  //   res.setHeader("Access-Control-Allow-Headers", "Authorization,Content-Type");
  //   return next();
  // });
});
//////////////////////////////////////////////////////////////////////////////////////

}}},{
  "extensions": [
    ".js",
    ".json",
    ".ts",
    ".mjs",
    ".svelte"
  ]
});

var exports = require("/server/main.js");
//# sourceURL=meteor://💻app/app/app.js
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1ldGVvcjovL/CfkrthcHAvc2VydmVyL21haW4uanMiXSwibmFtZXMiOlsiTWV0ZW9yIiwibW9kdWxlIiwibGluayIsInYiLCJzdGFydHVwIl0sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBLElBQUlBLE1BQUo7QUFBV0MsTUFBTSxDQUFDQyxJQUFQLENBQVksZUFBWixFQUE0QjtBQUFDRixRQUFNLENBQUNHLENBQUQsRUFBRztBQUFDSCxVQUFNLEdBQUNHLENBQVA7QUFBUzs7QUFBcEIsQ0FBNUIsRUFBa0QsQ0FBbEQ7QUFFWEgsTUFBTSxDQUFDSSxPQUFQLENBQWUsTUFBTSxDQUNuQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDRCxDQVBELEUiLCJmaWxlIjoiL2FwcC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE1ldGVvciB9IGZyb20gXCJtZXRlb3IvbWV0ZW9yXCI7XG5cbk1ldGVvci5zdGFydHVwKCgpID0+IHtcbiAgLy8gQ09SU1xuICAvLyBXZWJBcHAucmF3Q29ubmVjdEhhbmRsZXJzLnVzZShmdW5jdGlvbiAocmVxLCByZXMsIG5leHQpIHtcbiAgLy8gICByZXMuc2V0SGVhZGVyKFwiQWNjZXNzLUNvbnRyb2wtQWxsb3ctT3JpZ2luXCIsIFwiKlwiKTtcbiAgLy8gICByZXMuc2V0SGVhZGVyKFwiQWNjZXNzLUNvbnRyb2wtQWxsb3ctSGVhZGVyc1wiLCBcIkF1dGhvcml6YXRpb24sQ29udGVudC1UeXBlXCIpO1xuICAvLyAgIHJldHVybiBuZXh0KCk7XG4gIC8vIH0pO1xufSk7XG4iXX0=
