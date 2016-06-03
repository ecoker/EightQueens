var size = 8, recordKeeper = [];

var getAvailable = function(placement, available){
  var p = '' + placement;
  var a = [].concat(available);
  var placementIndex = a.indexOf(p);
  if (placementIndex > -1) a.splice(placementIndex,1);
  var currentCol = p.split('.')[0];
  var currentRow = p.split('.')[1];  
  /* CASTLES */
  for (var col=1;col<=size;col++) {
    var index = a.indexOf(col + '.' + currentRow);
    if (index > -1) a.splice(index,1);
  }
  for (var row=1;row<=size;row++) {
    var index = a.indexOf(currentCol + '.' + row);
    if (index > -1) a.splice(index,1); 
  }  
  /* BISHOPS */
  var colLeft = Number(p.split('.')[0]) - size;
  var colRight = Number(p.split('.')[0]) + size;
  var startRow = Number(p.split('.')[1]) - size;
  for (var row = startRow; row <= size; row++) {
    if (row > 0 && row <= size) {
      if (colLeft > 0 && colLeft <= size) {
        var index = a.indexOf(colLeft + '.' + row);
        if (index > -1) {
          a.splice(index,1);
        } 
      }
      if (colRight > 0 && colRight <= size) {
        var index = a.indexOf(colRight + '.' + row);
        if (index > -1) {
          a.splice(index,1);
        } 
      }  
    }
    colLeft++;
    colRight = colRight - 1;
  }
  return a;
}
var currentHigh = 1;
var loopAvailable = function(available, placements, placement) {
  var newPlacements = [].concat(placements);
  newPlacements.push(placement);
  if (available.length > 0 && (available.length + newPlacements.length) > 7) {
    available.forEach(function(placement){
      loopAvailable(getAvailable(placement, available), newPlacements, placement);
    }); 
  } else if (newPlacements.length >= currentHigh) {
    currentHigh = newPlacements.length;
    var pushPlacement = newPlacements.sort().join('-');
    if (recordKeeper.indexOf(pushPlacement) < 0) recordKeeper.push(pushPlacement)
  }
}
var forLoops = 0;
console.log("START: " + new Date());
for (var sr=1;sr<=(Math.ceil(size/2));sr++) {
  for (var sc=1;sc<=(Math.ceil(size/2));sc++) {
        
    var placements = [];
    var available = [];
    for (i=1; i<=size;i++) {
      for (j=1; j<=size;j++) {
        available.push(i + '.' + j);
      }
    }
    var placement = sc + '.' + sr;
    loopAvailable(getAvailable(placement, available), placements, placement);
  }
}
recordKeeper = recordKeeper.filter(function(record){
  return record.split('-').length >= currentHigh;
})
console.log("END: " + new Date());
console.log(recordKeeper);
console.log(recordKeeper.length);