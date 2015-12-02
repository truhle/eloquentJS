// An extension of the Eloquent Javascript file server that
// allows one to make directories via the MKCOL method

method.MKCOL = function(path, respond, request) {
  fs.stat(path, function(error, stats) {
    if (error && error.code == "ENOENT")
      fs.mkdir(path, respondErrorOrNothing(respond));
    else if (error)
      respond(500, error.toString());
    else if (stats.isDirectory())
      respond(204);
    else
      respond(400, "File exists");
  });
};
