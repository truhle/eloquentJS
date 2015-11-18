// Adding array functionality to the Egg programming language
topEnv["array"] = function() {
  var array = [];
  for (var i = 0; i < arguments.length; i++)
    array.push(arguments[i]);
  return array;
};

topEnv["length"] = function(array) {
  return array.length;
};

topEnv["element"] = function(array, i) {
  return array[i];
};

// a more succinct way to define the array constructor

topEnv["array"] = function() {
  return Array.prototype.slice.call(arguments, 0);
};


// Modification of skipSpace to also skip comments (defined as the rest of a line following a "#")

function skipSpace(string) {
  var first = string.search(/\S/);
  if (first == -1) return "";
  else if (string.charAt(first) == "#") {
    var second = string.indexOf("\n", first);
    return skipSpace(string.slice(second));
  }
  return string.slice(first);
}

// A much more concise implementation of the same, using a RegEx

function skipSpace(string) {
  var skippable = string.match(/^(\s|#.*)*/);
  return string.slice(skippable[0].length);
}

// A way to set a variable to new value if the variable has already been deifned in the local scope or any wider scope.

specialForms["set"] = function(args, env) {
  if (args.length != 2 || args[0].type != "word")
    throw new SyntaxError("Bad use of define");
  var value = evaluate(args[1], env);
  var varName = args[0].name;
  if (Object.prototype.hasOwnProperty.call(env, varName)) {
    env[varName] = value;
    return value;
  }
  while (Object.getPrototypeOf(env)) {
    env = Object.getPrototypeOf(env);
    if (Object.prototype.hasOwnProperty.call(env, varName)) {
      env[varName] = value;
      return value;
    }
  }
  throw new ReferenceError(args[0].name + " hasn't been defined yet.");
};

//  A way to do the above, using a single for loop

specialForms["set"] = function(args, env) {
  if (args.length != 2 || args[0].type != "word")
    throw new SyntaxError("Bad use of set");
  var varName = args[0].name;
  var value = evaluate(args[1], env);

  for (var scope = env; scope; scope = Object.getPrototypeOf(scope)) {
    if (Object.prototype.hasOwnProperty.call(scope, varName)) {
      scope[varName] = value;
      return value;
    }
  }
  throw new ReferenceError("Setting undefined variable " + varName);
};
