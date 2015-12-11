// A pathfinding function that finds the shortest path between
// connected nodes.

function findPath(a, b) {
  var workList = [[a]];
  var seen = [];
  while (workList.length > 0) {
    var path = workList.shift();
    var finalNode = path[path.length - 1];
    if (finalNode == b) {
      return path;
    }
    else if (seen.indexOf(finalNode) != -1)
      continue;
    else if (finalNode.edges.length < 1) {
      seen.push(finalNode);
      continue;
    }
    else {
      for (var j = 0; j < finalNode.edges.length; j++) {
        var edge = finalNode.edges[j];
        if (seen.indexOf(edge) != -1)
          continue;
        else {
          var newPath = path.concat([edge]);
          workList.push(newPath);
          seen.push(finalNode);
        }
      }
    }
  }
  return null;
}

var graph = treeGraph(4, 4);
var root = graph[0], leaf = graph[graph.length - 1];
console.log(findPath(root, leaf).length);
// → 4

leaf.connect(root);
console.log(findPath(root, leaf).length);
// → 2

// A more concise (if 3x slower) way of doing the same thing

function findPath(a, b) {
  var work = [[a]];
  for (var i = 0; i < work.length; i++) {
    var cur = work[i], end = cur[cur.length - 1];
    if (end == b) return cur;
    end.edges.forEach(function(next) {
      if (!work.some(function(work) { return work[work.length - 1] == next; }))
        work.push(cur.concat([next]));
    });
  }
}
