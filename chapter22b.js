// Measuring the time this function takes

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

var graph = treeGraph(9, 3);
var startTime = Date.now();
console.log(findPath(graph[0], graph[graph.length - 1]).length);
console.log("Time taken:", Date.now() - startTime);
// 9
// Time taken: 422


// The slower function:

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

var graph = treeGraph(9, 3);
var startTime = Date.now();
console.log(findPath(graph[0], graph[graph.length - 1]).length);
console.log("Time taken:", Date.now() - startTime);

// 9
// Time taken: 1508
