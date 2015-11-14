// regex golf

verify(/ca[rt]/,
       ["my car", "bad cats"],
       ["camper", "high art"]);

verify(/pr?op/,
       ["pop culture", "mad props"],
       ["plop"]);

verify(/ferr(et|y|ari)/,
       ["ferret", "ferry", "ferrari"],
       ["ferrum", "transfer A"]);

verify(/ious\b/,
       ["how delicious", "spacious room"],
       ["ruinous", "consciousness"]);

verify(/\s[\.,:;]/,
       ["bad punctuation ."],
       ["escape the dot"]);

verify(/\w{7,}/,
       ["hottentottententen"],
       ["no", "hotten totten tenten"]);

verify(/\b[^e\s]+\b/,
       ["red platypus", "wobbling nest"],
       ["earth bed", "learning ape"]);


function verify(regexp, yes, no) {
  // Ignore unfinished exercises
  if (regexp.source == "...") return;
  yes.forEach(function(s) {
    if (!regexp.test(s))
      console.log("Failure to match '" + s + "'");
  });
  no.forEach(function(s) {
    if (regexp.test(s))
      console.log("Unexpected match for '" + s + "'");
  });
}

// regex and function to replace all single quotes in a string with double quotes, ignoring apostrophes
var text = "'I'm the cook,' he said, 'it's my job.'";
var regex = /^'|\s'|[\.:;,]'/g;
console.log(text.replace(regex, function(str) {
  if (str.length > 1)
    return str.replace(/'/, '"');
  else
    return '"';
}));
// → "I'm the cook," he said, "it's my job."

// regular expression for Javascript numbers, including exponential notation and + and - signs

var number = /^[+-]?\d+?\.?\d*?e?-?\d*?$|^[+-]?\d*?\.?\d+?(e[+-]?\d+)?$/i;

/* The solution from the EJ website:
var number = /^(\+|-|)(\d+(\.\d*)?|\.\d+)([eE](\+|-|)\d+)?$/; */

// Tests:
["1", "-1", "+15", "1.55", ".5", "5.", "1.3e2", "1E-4",
 "1e+12"].forEach(function(s) {
  if (!number.test(s))
    console.log("Failed to match '" + s + "'");
});
["1a", "+-1", "1.2.3", "1+1", "1e4.5", ".5.", "1f5",
 "."].forEach(function(s) {
  if (number.test(s))
    console.log("Incorrectly accepted '" + s + "'");
});
