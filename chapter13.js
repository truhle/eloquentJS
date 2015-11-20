// A function that builds an html function from an array of objects with identical properties
//It aligns numbers with the right edge of their cells

function buildTable(data) {
  var headers = Object.keys(data[0]);
  var table = document.createElement("table");
  var headRow = document.createElement("tr");
  for (var i = 0; i < headers.length; i++) {
    var tableHeader = document.createElement("th");
    tableHeader.textContent = headers[i];
    headRow.appendChild(tableHeader);
  }
  table.appendChild(headRow);
  for (var i = 0; i < data.length; i++) {
    var newRow = document.createElement("tr");
    headers.forEach(function(header) {
      var tableCell = document.createElement("td");
      var content = data[i][header];
      tableCell.textContent = content;
      if (typeof content == "number")
        tableCell.style.textAlign = "right";
      newRow.appendChild(tableCell);
    });
    table.appendChild(newRow);
  }
  return table;
}

// function to return an array of all decendant elements of a given node that have a given tag name

function byTagName(node, tagName) {
  var nodes = [];
  var upperTagName = tagName.toUpperCase();
  var children = Array.prototype.slice.call(node.childNodes, 0);
  children.forEach(function(child) {
    if (child.nodeType == 1) {
      if (child.tagName == upperTagName)
        nodes.push(child);
      nodes = nodes.concat(byTagName(child, upperTagName));
    }
  });
  return nodes;
}

//An animation of a cat and a hat on opposite sides of a ellipse

<!doctype html>
<script src="code/mountains.js"></script>
<script src="code/chapter/13_dom.js"></script>

<img src="img/cat.png" id="cat" style="position: absolute">
<img src="img/hat.png" id="hat" style="position: absolute">

<body style="min-height: 300px">
<script>
  var cat = document.querySelector("#cat");
  var hat = document.querySelector("#hat");
  var catAngle = 0, hatAngle = 3.14, lastTime = null;
  function animate(time) {
    if (lastTime != null) {
      var addAngle = (time - lastTime) * 0.001;
      catAngle += addAngle;
      hatAngle += addAngle;
    }
    lastTime = time;
    cat.style.top = ((Math.sin(catAngle) * 70) + 150) + "px";
    cat.style.left = ((Math.cos(catAngle) * 200) + 250) + "px";
    hat.style.top = ((Math.sin(hatAngle) * 70) + 150) + "px";
    hat.style.left = ((Math.cos(hatAngle) * 200) + 250) + "px";
    requestAnimationFrame(animate);
  }
  requestAnimationFrame(animate);
</script>
</body>
