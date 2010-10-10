/*
  This is an example route-node with faye(http://faye.jcoglan.com http://github.com/jcoglan/faye)
*/

var faye = require('faye');

var bayeux = new faye.NodeAdapter({
    mount: '/faye',
    timeout: 45
});

var server = require('./lib/node-router').getServer();

server.get("/", function(req,res,match) {
	return "root";
});

/* static directory example*/
server.get(new RegExp("^/static(.*)$"), function(req,res,match) {
	var staticDir = require('./lib/node-router').staticDirHandler('./','');
	return staticDir(req,res);
})

bayeux.attach(server.server);
server.listen(9000);