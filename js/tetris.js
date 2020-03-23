var playground = createPlayground();


// will add object positions to the emply playground array
function renderPositions() {
  objects.forEach( object => {
    object.position.forEach( ([rowIndex, cellIndex]) => {
      playground[rowIndex][cellIndex] = TYPE_COLORS[object.type]
    })
  });
}



////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



function moveDown() {
  console.log('moving down')
  // 1. get current object - done
  let currentObject = getCurrentObject();

  // 2. re-define objects - done
  //currentObject.position.forEach(position => (position[0] > 0 && (position[0] -= 1)))

  if (validateDown(currentObject)) {
    let mc = minCell(currentObject.position, 0)
    for (let i = 0; i < currentObject.position.length; i++) {
    
      let lim = currentObject.position[i][0] - mc
    
      if (currentObject.position[i][0] > lim) {
        currentObject.position[i][0] -= 1
      }
    }
  }
  else {
    currentObject.state = 'static'
    objects.push(createNewObject())
    if (paused) {
      pause()
    }

    for (let row = 0; row < 10; row++) {
      let dbg = rowClearHandler(row)
    }
  }
  
  // 3. re-define clear playground

  playground = createPlayground();

  renderPlayground()
}



function moveRight() {
  console.log('moving right')
  // 1. get current object - done
  let currentObject = getCurrentObject();

  // 2a. re-define objects - done
  //currentObject.position.forEach(position => (position[0] > 0 && (position[0] -= 1)))

  if (validateRight(currentObject)) {
    let mc = maxCell(currentObject.position, 1)
    for (let i = 0; i < currentObject.position.length; i++) {
      
      let lim = mc - currentObject.position[i][1]
      
      if (currentObject.position[i][1] < 4 - lim) {
        currentObject.position[i][1] += 1
      }
    }
  }

  // 2b. if bottom is the bound or has objects - make falling static
  
  
  // 3. re-define clear playground
  playground = createPlayground();

  // 4. re-renderPositions
  // 5. re-renderPlayground
  renderPlayground()
}



function moveLeft() {
  console.log('moving left')
  // 1. get current object - done
  let currentObject = getCurrentObject();

  // 2. re-define objects - done
  //currentObject.position.forEach(position => (position[0] > 0 && (position[0] -= 1)))

  if (validateLeft(currentObject)) {
    let mc = minCell(currentObject.position, 1)
    for (let i = 0; i < currentObject.position.length; i++) {
      
      let lim = currentObject.position[i][1] - mc
      
      if (currentObject.position[i][1] > lim) {
        currentObject.position[i][1] -= 1
      }
    }
  }
  
  // 3. re-define clear playground
  playground = createPlayground();

  // 4. re-renderPositions
  // 5. re-renderPlayground
  renderPlayground()
}



function pauseGame() {
  console.log('pausing the game')
  clearInterval(gameInterval);
}



////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



// function createObj() {}

// Events
// 1. move to bottom
// 2. move right
// 3. move left
// 4. pause
// 5. game over
// 6. (re)render playground

renderPlayground()


// interval 1 second
var gameInterval = setInterval(() => {
  moveDown();
}, 4000);