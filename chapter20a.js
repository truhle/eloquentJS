// A script to log the status code and body of a webpage in various formats, utilizing response streams

var http = require("http");
var contentTypes = [
  "text/plain", "text/html", "application/json", "application/rainbows+unicorns"
];

function httpRequestForType(type) {
  var request = http.request({
    hostname: "eloquentjavascript.net",
    path: "/author",
    method: "GET",
    headers: {Accept: type},
  }, function(response) {
    var body = "";
    response.on("data", function(chunk) {
      body += chunk;
    });
    response.on("end", function(){
      console.log("\n\n\n" + type + ":\n\n" + "Response Status Code:", response.statusCode + "\nBody:\n" + body);
    });
  }).on("error", function(e) {
    console.log("Get error:", e.message)
  });
  request.end();
}

contentTypes.forEach(function(type) {
  httpRequestForType(type);
});
