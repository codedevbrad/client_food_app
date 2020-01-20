


function addZero(i) { if (i < 10) { i = "0" + i; } return i; }

function time( time ) {
  var d = time;
  var h = addZero(d.getHours());
  var m = addZero(d.getMinutes());
  return h + ':' + m;
};

module.exports = { addZero , time };
