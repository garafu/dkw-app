var options = {}, sentinels = [], server;
var host, servers, name, password, db;

// Split hostname and port.
var getHost = function (text = "") {
  var host, port;
  if (text.indexOf(":") > 0) {
    [host, port] = text.split(":");
    port = parseInt(port);
  } else {
    host = text;
    port = 6379;
  }
  return { host, port };
}

// Get environmental variables.
host = process.env.REDIS_HOST || "";
servers = (process.env.REDIS_SENTINELS || "").split(",");
name = process.env.REDIS_NAME || "";
password = process.env.REDIS_PASSWORD || "";
db = typeof process.env.REDIS_DATABASE === "string" ?
  parseInt(process.env.REDIS_DATABASE) : 0;

if (host) {
  server = getHost(host);
  options.host = server.host;
  options.port = server.port;
}

if (servers) {
  for (server of servers) {
    server = server.trim();
    sentinels[sentinels.length] = getHost(server);
  }
  options.sentinels = sentinels;
}

if (name) {
  options.name = name;
}

if (password) {
  options.password = password;
}

if (db) {
  options.db = db;
}

module.exports = {
  OPTIONS: options
};