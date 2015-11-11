// a smarter plant eater

function SmartPlantEater() {
	this.energy = 25;
  this.lastAction = null;
}
SmartPlantEater.prototype.act = function(context) {
  var space = context.find(" ");
  if (this.energy > 70 && space) {
    this.lastAction = "reproduce";
    return {type: "reproduce", direction: space};
  }
  var plant = context.find("*");
  if (plant && this.lastAction != "eat") {
    this.lastAction = "eat";
    return {type: "eat", direction: plant};
  }
  if (space) {
    this.lastAction = "move";
    return {type: "move", direction: space};
  }
};

// an even smarter plant eater

function SmartPlantEater() {
  this.energy = 30;
  this.direction = "s";
}

SmartPlantEater.prototype.act = function(context) {
  var space = context.find(" ");
  if (this.energy > 90 && space)
    return {type: "reproduce", direction: space}
  var plant = context.find("*");
  var plants = context.findAll("*");
  if (plants.length > 1)
    return {type: "eat", direction: plant};
  if (context.look(this.direction) != " " && space)
    this.direction = space;
  return {type: "move", direction: this.direction}
}

// A Tiger, eater of plant eaters

function Tiger() {
  this.energy = 40;
}
Tiger.prototype.act = function(context) {
  var critter = context.find("O");
  if (critter)
    return {type: "eat", direction: critter};
  var space = context.find(" ");
  if (this.energy > 100)
    return {type: "reproduce", direction: space};
  if (space)
    return {type: "move", direction: space};
};
