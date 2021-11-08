var require = meteorInstall({"imports":{"db":{"foodsCollection.js":function module(require,exports,module){

//////////////////////////////////////////////////////////////////////////////////////
//                                                                                  //
// imports/db/foodsCollection.js                                                    //
//                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////
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
//////////////////////////////////////////////////////////////////////////////////////

}}},"server":{"main.js":function module(require,exports,module){

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
let FoodsCollection;
module.link("/imports/db/foodsCollection", {
  FoodsCollection(v) {
    FoodsCollection = v;
  }

}, 1);

//function to insert foods into food collection
const insertFood = foodName => {
  FoodsCollection.insert({
    name: foodName,
    createdAt: new Date()
  });
};

Meteor.startup(() => {
  // CORS
  // WebApp.rawConnectHandlers.use(function (req, res, next) {
  //   res.setHeader("Access-Control-Allow-Origin", "*");
  //   res.setHeader("Access-Control-Allow-Headers", "Authorization,Content-Type");
  //   return next();
  // });
  //populate foods collection
  if (FoodsCollection.find().count() == 0) {
    ["Blueberries", "Raspberries", "Blackberries", "Strawberries", "Cranberries"].forEach(foodName => insertFood(foodName));
  }
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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1ldGVvcjovL/CfkrthcHAvaW1wb3J0cy9kYi9mb29kc0NvbGxlY3Rpb24uanMiLCJtZXRlb3I6Ly/wn5K7YXBwL3NlcnZlci9tYWluLmpzIl0sIm5hbWVzIjpbIm1vZHVsZSIsImV4cG9ydCIsIkZvb2RzQ29sbGVjdGlvbiIsIk1vbmdvIiwibGluayIsInYiLCJDb2xsZWN0aW9uIiwiTWV0ZW9yIiwiaW5zZXJ0Rm9vZCIsImZvb2ROYW1lIiwiaW5zZXJ0IiwibmFtZSIsImNyZWF0ZWRBdCIsIkRhdGUiLCJzdGFydHVwIiwiZmluZCIsImNvdW50IiwiZm9yRWFjaCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQUEsTUFBTSxDQUFDQyxNQUFQLENBQWM7QUFBQ0MsaUJBQWUsRUFBQyxNQUFJQTtBQUFyQixDQUFkO0FBQXFELElBQUlDLEtBQUo7QUFBVUgsTUFBTSxDQUFDSSxJQUFQLENBQVksY0FBWixFQUEyQjtBQUFDRCxPQUFLLENBQUNFLENBQUQsRUFBRztBQUFDRixTQUFLLEdBQUNFLENBQU47QUFBUTs7QUFBbEIsQ0FBM0IsRUFBK0MsQ0FBL0M7QUFFeEQsTUFBTUgsZUFBZSxHQUFHLElBQUlDLEtBQUssQ0FBQ0csVUFBVixDQUFxQixPQUFyQixDQUF4QixDOzs7Ozs7Ozs7OztBQ0ZQLElBQUlDLE1BQUo7QUFBV1AsTUFBTSxDQUFDSSxJQUFQLENBQVksZUFBWixFQUE0QjtBQUFDRyxRQUFNLENBQUNGLENBQUQsRUFBRztBQUFDRSxVQUFNLEdBQUNGLENBQVA7QUFBUzs7QUFBcEIsQ0FBNUIsRUFBa0QsQ0FBbEQ7QUFBcUQsSUFBSUgsZUFBSjtBQUFvQkYsTUFBTSxDQUFDSSxJQUFQLENBQVksNkJBQVosRUFBMEM7QUFBQ0YsaUJBQWUsQ0FBQ0csQ0FBRCxFQUFHO0FBQUNILG1CQUFlLEdBQUNHLENBQWhCO0FBQWtCOztBQUF0QyxDQUExQyxFQUFrRixDQUFsRjs7QUFHcEY7QUFDQSxNQUFNRyxVQUFVLEdBQUlDLFFBQUQsSUFBYztBQUMvQlAsaUJBQWUsQ0FBQ1EsTUFBaEIsQ0FBdUI7QUFDckJDLFFBQUksRUFBRUYsUUFEZTtBQUVyQkcsYUFBUyxFQUFFLElBQUlDLElBQUo7QUFGVSxHQUF2QjtBQUlELENBTEQ7O0FBT0FOLE1BQU0sQ0FBQ08sT0FBUCxDQUFlLE1BQU07QUFDbkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQSxNQUFJWixlQUFlLENBQUNhLElBQWhCLEdBQXVCQyxLQUF2QixNQUFrQyxDQUF0QyxFQUF5QztBQUN2QyxLQUNFLGFBREYsRUFFRSxhQUZGLEVBR0UsY0FIRixFQUlFLGNBSkYsRUFLRSxhQUxGLEVBTUVDLE9BTkYsQ0FNV1IsUUFBRCxJQUFjRCxVQUFVLENBQUNDLFFBQUQsQ0FObEM7QUFPRDtBQUNGLENBbEJELEUiLCJmaWxlIjoiL2FwcC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE1vbmdvIH0gZnJvbSBcIm1ldGVvci9tb25nb1wiO1xuXG5leHBvcnQgY29uc3QgRm9vZHNDb2xsZWN0aW9uID0gbmV3IE1vbmdvLkNvbGxlY3Rpb24oXCJmb29kc1wiKTtcbiIsImltcG9ydCB7IE1ldGVvciB9IGZyb20gXCJtZXRlb3IvbWV0ZW9yXCI7XG5pbXBvcnQgeyBGb29kc0NvbGxlY3Rpb24gfSBmcm9tIFwiL2ltcG9ydHMvZGIvZm9vZHNDb2xsZWN0aW9uXCI7XG5cbi8vZnVuY3Rpb24gdG8gaW5zZXJ0IGZvb2RzIGludG8gZm9vZCBjb2xsZWN0aW9uXG5jb25zdCBpbnNlcnRGb29kID0gKGZvb2ROYW1lKSA9PiB7XG4gIEZvb2RzQ29sbGVjdGlvbi5pbnNlcnQoe1xuICAgIG5hbWU6IGZvb2ROYW1lLFxuICAgIGNyZWF0ZWRBdDogbmV3IERhdGUoKSxcbiAgfSk7XG59O1xuXG5NZXRlb3Iuc3RhcnR1cCgoKSA9PiB7XG4gIC8vIENPUlNcbiAgLy8gV2ViQXBwLnJhd0Nvbm5lY3RIYW5kbGVycy51c2UoZnVuY3Rpb24gKHJlcSwgcmVzLCBuZXh0KSB7XG4gIC8vICAgcmVzLnNldEhlYWRlcihcIkFjY2Vzcy1Db250cm9sLUFsbG93LU9yaWdpblwiLCBcIipcIik7XG4gIC8vICAgcmVzLnNldEhlYWRlcihcIkFjY2Vzcy1Db250cm9sLUFsbG93LUhlYWRlcnNcIiwgXCJBdXRob3JpemF0aW9uLENvbnRlbnQtVHlwZVwiKTtcbiAgLy8gICByZXR1cm4gbmV4dCgpO1xuICAvLyB9KTtcblxuICAvL3BvcHVsYXRlIGZvb2RzIGNvbGxlY3Rpb25cbiAgaWYgKEZvb2RzQ29sbGVjdGlvbi5maW5kKCkuY291bnQoKSA9PSAwKSB7XG4gICAgW1xuICAgICAgXCJCbHVlYmVycmllc1wiLFxuICAgICAgXCJSYXNwYmVycmllc1wiLFxuICAgICAgXCJCbGFja2JlcnJpZXNcIixcbiAgICAgIFwiU3RyYXdiZXJyaWVzXCIsXG4gICAgICBcIkNyYW5iZXJyaWVzXCIsXG4gICAgXS5mb3JFYWNoKChmb29kTmFtZSkgPT4gaW5zZXJ0Rm9vZChmb29kTmFtZSkpO1xuICB9XG59KTtcbiJdfQ==
