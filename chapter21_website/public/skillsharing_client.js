function request(options, callback) {
  var req = new XMLHttpRequest();
  req.open(options.method || "GET", options.pathname, true);
  req.addEventListener("load", function() {
    if (req.status < 400)
      callback(null, req.responseText);
    else
      callback(new Error("Request failed: " + req.statusText));
  });
  req.addEventListener("error", function() {
    callback(new Error("Network error"));
  });
  req.send(options.body || null);
}

var lastServerTime = 0;

request({pathname: "talks"}, function(error, response) {
  if (error) {
    reportError(error);
  } else {
    response = JSON.parse(response);
    displayTalks(response.talks);
    lastServerTime = response.serverTime;
    waitForChanges();
  }
});

function reportError(error) {
  if (error)
    alert(error.toString());
}

var talkDiv = document.querySelector("#talks");
var shownTalks = Object.create(null);

function displayTalks(talks) {
  talks.forEach(function(talk) {
    var shown = shownTalks[talk.title];
    if (talk.deleted) {
      if (shown) {
        talkDiv.removeChild(shown);
        delete shownTalks[talk.title];
      }
    } else {
      var node = drawTalk(talk);
      if (shown) {
        // Keep text in comment fields alive in a refresh
        var newCommentField = node.querySelector("input");
        var shownCommentField = shown.querySelector("input");
        var hasFocus = document.activeElement == shownCommentField;
        newCommentField.value = shownCommentField.value;
        // Update the talk
        talkDiv.replaceChild(node, shown);
        // Maintain focus
        if (hasFocus) newCommentField.focus();
      } else {
        talkDiv.appendChild(node);
      }
      shownTalks[talk.title] = node;
    }
  });
}

function instantiateTemplate(template, values) {
  function instantiateText(text, values) {
    return text.replace(/\{\{(\w+)\}\}/g, function(_, name) {
      return values[name];
    });
  }
  function attr(node, attrName) {
  return node.nodeType == document.ELEMENT_NODE &&
    node.getAttribute(attrName);
  }
  function instantiate(node, values) {
    if (node.nodeType == document.ELEMENT_NODE) {
      var copy = node.cloneNode();
      for (var i = 0; i < node.childNodes.length; i++) {
        var child = node.childNodes[i];
        var repeat = attr(child, "template-repeat");
        if (repeat) {
          (values[repeat] || []).forEach(function(element) {
            copy.appendChild(instantiate(child, element));
          });
        } else {
          copy.appendChild(instantiate(child, values));
        }
      }
      return copy;
    } else if (node.nodeType == document.TEXT_NODE) {
        return document.createTextNode(instantiateText(node.nodeValue, values))
    }
  }

  return instantiate(template, values);
}

function drawTalk(talk) {
  var template = document.querySelector("#template .talk");
  var node = instantiateTemplate(template, talk);

  node.querySelector("button.del").addEventListener(
    "click", deleteTalk.bind(null, talk.title));

  var form = node.querySelector("form");
  form.addEventListener("submit", function(event) {
    event.preventDefault();
    addComment(talk.title, form.elements.comment.value);
    form.reset();
  });
  return node;
}

function talkURL(title) {
  return "talks/" + encodeURIComponent(title);
}

function deleteTalk(title) {
  request({pathname: talkURL(title), method: "DELETE"},
          reportError);
}

function addComment(title, comment) {
  var comment = {author: nameField.value, message: comment};
  request({pathname: talkURL(title) + "/comments",
           body: JSON.stringify(comment),
           method: "POST"},
          reportError);
}

var nameField = document.querySelector("#name");

nameField.value = localStorage.getItem("name") || "";

nameField.addEventListener("change", function() {
  localStorage.setItem("name", nameField.value);
});

var talkForm = document.querySelector("#newtalk");

talkForm.addEventListener("submit", function(event) {
  event.preventDefault();
  request({pathname: talkURL(talkForm.elements.title.value),
           method: "PUT",
           body: JSON.stringify({
             presenter: nameField.value,
             summary: talkForm.elements.summary.value
           })}, reportError);
  talkForm.reset();
});

function waitForChanges() {
  request({pathname: "talks?changesSince=" + lastServerTime},
          function(error, response) {
    if (error) {
      setTimeout(waitForChanges, 2500);
      console.error(error.stack);
    } else {
      response = JSON.parse(response);
      displayTalks(response.talks);
      lastServerTime = response.serverTime;
      waitForChanges();
    }
  });
}
