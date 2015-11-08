// Mother-child age difference

var ageDifferences = [];
ancestry.forEach(function(person) {
  if (person.mother in byName) {
    var motherArray = ancestry.filter(function(ancestor) {
      if (person.mother === ancestor.name) return ancestor;
    });
    var ageDifference = person.born - motherArray[0].born;
    ageDifferences.push(ageDifference);
  }
});
console.log(average(ageDifferences));

// Historical life expectancy by century of death

function groupBy(array, func) {
  var output = {};
  for (var i = 0; i < array.length; i++) {
    if (func(array[i]) in output)
      output[func(array[i])].push(array[i]);
    else
      output[func(array[i])] = [array[i]];
  }
  return output;
}
function byCentury(elem) {
  var century = Math.ceil(elem.died / 100);
  return century;
}
var grouped = groupBy(ancestry, byCentury);
for (var elem in grouped) {
  grouped[elem] = grouped[elem].map(function(person) {
    return person.died - person.born;
  });
  console.log(elem + ":", average(grouped[elem]).toFixed(1));
}

// my every and some functions

function every (array, func) {
  for (var i = 0; i < array.length; i++)
    if (!func(array[i]))
      return false;
  return true;
}
function some (array, func) {
  for (var i = 0; i < array.length; i++)
    if (func(array[i]))
      return true;
  return false;
}
