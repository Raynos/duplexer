var duplex  = require("../index")
  , through = require("through")
  , test    = require("tape");

var readable = through()
  , writable = through(write)
  , written = 0
  , data = 0;

var stream = duplex(writable, readable);

function write() {
  written++
}

stream.on("data", ondata);

function ondata() {
  data++
}

test("emit and write", function(t) {
  t.plan(2);

  stream.write();
  readable.emit("data");

  t.equal(written, 1, "should have written once");
  t.equal(data, 1, "should have recived once");

});
