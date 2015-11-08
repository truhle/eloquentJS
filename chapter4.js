function arrayToList(array) {
  if (array.length === 1) {
    var newList = {};
    newList.value = array.shift();
    newList.rest = null;
    return newList;
  } else {
    var newList = {};
    newList.value = array.shift();
    newList.rest = arrayToList(array);
    return newList;
  }
}
function listToArray(list, array) {
  if (!list) {
    var array = [];
    array.push(list.value);
    if (list.rest !== null) {
      return listToArray(list.rest, array);
    } else {
      return array;
    }
  } else {
    array.push(list.value);
    if (list.rest !== null) {
      return listToArray(list.rest, array);
    } else {
      return array;
    }
  }
}

function arrayToList(array) {
  if (array.length === 1) {
    var newList = {};
    newList.value = array.shift();
    newList.rest = null;
    return newList;
  } else {
    var newList = {};
    newList.value = array.shift();
    newList.rest = arrayToList(array);
    return newList;
  }
}
function listToArray(list) {
  var array = [];
  for (var node = list; node; node = node.rest) {
    array.push(node.value);
  }
  return array;
}

// My answers before recursive nth function:

function arrayToList(array) {
  if (array.length === 1) {
    var newList = {};
    newList.value = array.shift();
    newList.rest = null;
    return newList;
  } else {
    var newList = {};
    newList.value = array.shift();
    newList.rest = arrayToList(array);
    return newList;
  }
}
function listToArray(list) {
  var array = [];
  for (var node = list; node; node = node.rest)
    array.push(node.value);
  return array;
}
function prepend(element, list) {
  return {value: element, rest: list};
}
function nth(list, number) {
  var array = listToArray(list);
  var result = undefined;
  if (array.length - 1 >= number) {
    result = array[number];
  }
  return result;
}

// recursive nth

function nth(list, number) {
  if (number === 0)
    return list.value;
  else if (list.rest)
    return nth(list.rest, number - 1);
  else
    return undefined;
}

// deep comparison
function deepEqual(o1, o2) {
  var equality = false;
  if (o1 === o2)
    equality = true;
  else if (o1 !== null && o2 !== null) {
    if (typeof o1 === "object" && typeof o2 === "object") {
      var names1 = Object.getOwnPropertyNames(o1), names2 = Object.getOwnPropertyNames(o2);
      for (var i = 0; i < names1.length; i++) {
		if (names1[i] !== names2[i])
          return false
      }
      for (var j = 0; j < names1.length; j++) {
          equality = deepEqual(o1[names1[j]], o2[names2[j]]);
          if (equality === false)
            return equality
      }
    }
    else
      equality = false
  }
  return equality
}
// more robust deep comparison
function deepEqual(a, b) {
  if (a === b)
    return true;
  else if (a === null || b === null || typeof a !== "object" || typeof b !== "object")
    return false;
  else
    var aProps = 0, bProps = 0;
    for (var prop in a)
      aProps += 1;
    for (var prop in b) {
      bProps += 1;
      if (!(prop in a))
        return false;
      else if (!deepEqual(a[prop], b[prop]))
        return false;
    }
    return aProps === bProps;
}
