// Creating a text field that one cannot type "Q", "W", or "X" into

<!doctype html>

<input type="text">
<script>
  var field = document.querySelector("input");
  addEventListener("keydown", function(event) {
  var key = event.keyCode;
  if (key == 81 || key == 87 || key == 88)
    event.preventDefault();
  });

</script>

// Creating a window where a trail of teal dots follows the mouse cursor

<!doctype html>

<style>
  .trail { /* className for the trail elements */
    position: absolute;
    height: 6px; width: 6px;
    border-radius: 3px;
    background: teal;
  }
  body {
    height: 300px;
  }
</style>

<script>
  var trail = (function() {
    var array = [];
    for (var i = 0; i < 30; i++) {
      var spot = document.createElement("div");
      spot.className = "trail";
      array[i] = spot;
    }
    return array;
  })();
  var lastX;
  var lastY;
  var trailIndex = 0;
  addEventListener("mousemove", function(event) {
    lastX = event.pageX;
    lastY = event.pageY;
    var spot = trail[trailIndex];
    spot.style.left = (lastX - 3) + "px"
    spot.style.top = (lastY - 3) + "px";
    document.body.appendChild(spot);
    trailIndex++;
    if (trailIndex == 30)
      trailIndex = 0;
  });
</script>

// A page with a simple tabbed interface

<!doctype html>

<div id="wrapper">
  <p></p>
  <div data-tabname="one">Tab one</div>
  <div data-tabname="two">Tab two</div>
  <div data-tabname="three">Tab three</div>
</div>
<script>
  function asTabs(node) {
    var tabs = Array.prototype.slice.call(node.querySelectorAll("div"), 0);
    var para = node.querySelector("p");
    var buttons = [];
    tabs.forEach(function(tab) {
      tab.style.display = "none";
      var text = tab.getAttribute("data-tabname");
      var button = document.createElement("button");
      button.textContent = text;
      para.appendChild(button);
      button.addEventListener("click", function(event) {
        tabs.forEach(function(tab) {
          if (tab.style.display == "block")
            tab.style.display = "none";
        });
        tab.style.display = "block";
        buttons.forEach(function(button) {
          if (button.style.color != "black")
            button.style.color = "black";
            button.style.fontWeight = "normal";
        });
        button.style.color = "cornflowerblue";
        button.style.fontWeight = "bolder";
      });
      buttons.push(button);
    });

  }
  asTabs(document.querySelector("#wrapper"));
</script>
