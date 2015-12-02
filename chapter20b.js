// a rewrite to urlToPath in the file server from Eloquent Javascript that removes updirectory path elements

function urlToPath(url) {
  var path = require("url").parse(nonRelativeURL).pathname;
  var decoded = decodeURIComponent(path);
  return "." + decoded.replace(/[\\\/]\.\./g, "");
}
