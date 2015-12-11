// A much faster (approx 85x) approach to the pathfinding
// problem, which assigns ids to the node objects
// and tracks seen objects by those IDs.

function withIDs(graph) {
  for (var i = 0; i < graph.length; i++)
    graph[i].id = i;
  return graph;
}

function findPath(a, b) {
  var workList = [[a]];
  var seen = Object.create(null);
  while (workList.length > 0) {
    var path = workList.shift();
    var finalNode = path[path.length - 1];
    if (finalNode == b) {
      return path;
    }
    else if (seen[finalNode.id])
      continue;
    else if (finalNode.edges.length < 1) {
      seen[finalNode.id] = true;
      continue;
    }
    else {
      for (var j = 0; j < finalNode.edges.length; j++) {
        var edge = finalNode.edges[j];
        if (seen[edge.id])
          continue;
        else {
          var newPath = path.concat([edge]);
          workList.push(newPath);
          seen[finalNode.id] = true;
        }
      }
    }
  }
  return null;
}

var graph = withIDs(treeGraph(9, 3));
var startTime = Date.now();
console.log(findPath(graph[0], graph[graph.length - 1]).length);
console.log("Time taken:", Date.now() - startTime);
// 9
// Time taken: 5
