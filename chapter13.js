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
