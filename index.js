var server = require("./server");
var routine = require("./route");
var requestHandlers = require("./requestHandler");

var handle = {};
handle["/"] = requestHandlers.start;
handle["/start"] = requestHandlers.start;
handle["/upload"] = requestHandlers.upload;


server.start(routine.route, handle);
