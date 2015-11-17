// A month module that namespaces name and number functions and hides the months variable

var month = function() {
  var months = ["January", "February", "March", "April",
                "May", "June", "July", "August", "September",
                "October", "November", "December"];
  return {
    name: function(number) { return months[number]; },
    number: function(name) { return months.indexOf(name); }
  }
}();

// Same module, using the exports approach

(function(exports) {
  var months = ["January", "February", "March", "April",
                "May", "June", "July", "August", "September",
                "October", "November", "December"];
  exports.name = function(number) {
    return months[number];
  };
  exports.number = function(name) {
    return months.indexOf(name);
  };
})(this.month = {});
