
// Playing with media requests

var mediaTypes = ["text/plain", "text/html", "application/json",
                  "application/rainbows+unicorns"];

function mediaRequest(mediaType, url) {
  var req = new XMLHttpRequest();
  req.open("GET", url, false);
  req.setRequestHeader("accept", mediaType);
  req.send(null);
  return req.responseText;
}

mediaTypes.forEach(function(type) {
  console.log(type + ":\n", mediaRequest(type, "http://eloquentjavascript.net/author"), "\n");
});

// A version that does error handling

mediaTypes.forEach(function(type) {
  try {
    console.log(type + ":\n", mediaRequest(type, "http://eloquentjavascript.net/author"));
  } catch (e) {
    console.log("Raised error: " + e);
  }
});
