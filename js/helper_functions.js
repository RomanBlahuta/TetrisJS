var getCurrentObject =  () => objects.find(object => object.state === 'falling');
var createPlayground = () => (new Array(10).fill().map( el => (new Array(5).fill())));

var paused = false

function pause() {
    if (!paused) {
        clearInterval(gameInterval)
    }
    else {
        gameInterval = setInterval(() => {
            moveDown();
          }, 4000);
    }
    paused = !paused
}


function minCell(arr, coord) {
    let min = arr[0][coord]
    for (let i = 0; i < arr.length; i++) {
        if (arr[i][coord] <= min) {
            min = arr[i][coord]
        }
    }
    return min
}

function maxCell(arr, coord) {
    let max = arr[0][coord]
    for (let i = 0; i < arr.length; i++) {
        if (arr[i][coord] >= max) {
            max = arr[i][coord]
        }
    }
    return max
}



function matchCoords(obj, coords) {
    for (let i = 0; i < obj.position.length; i++) {
        if (obj.position[i][0] === coords[0] && obj.position[i][1] === coords[1]) {
                return true
        }
    }
    return false
}



function validateDown(currObj) {
    //let bottomCoord = minCell(currObj, 0)
    let downFlag = 0

    for (let i = 0; i < currObj.position.length; i++) {
        let y = currObj.position[i][0]
        let x = currObj.position[i][1]

        //console.log('pg cell  ', playground[y-1][x])
        if (y > 0 && playground[y-1][x] === undefined) {
            downFlag++
            //console.log('++1')
        }
        else if (y > 0 && matchCoords(currObj, [y-1, x])) {
            console.log(matchCoords(currObj, [y-1, x]))
            console.log([y-1, x])
            downFlag++
            //console.log('++2')
        }
    }
    //console.log('flag  ', downFlag)
    return (downFlag == currObj.position.length)
}

function validateLeft(currObj) {
    //let leftCoord = minCell(currObj, 1)
    let leftFlag = 0

    for (let i = 0; i < currObj.position.length; i++) {
        let y = currObj.position[i][0]
        let x = currObj.position[i][1]

        //console.log('pg cell  ', playground[y-1][x])
        console.log(playground[y][x-1], x-1)
        if (x > 0 && playground[y][x-1] === undefined) {
            leftFlag++
            //console.log('++1')
        }
        else if (x > 0 && matchCoords(currObj, [y, x-1])) {
            console.log(matchCoords(currObj, [y, x-1]))
            console.log([y, x-1])
            leftFlag++
            //console.log('++2')
        }
    }
    //console.log('flag  ', leftFlag)
    return (leftFlag == currObj.position.length)
}

function validateRight(currObj) {
    //let leftCoord = maxCell(currObj, 1)
    let rightFlag = 0

    for (let i = 0; i < currObj.position.length; i++) {
        let y = currObj.position[i][0]
        let x = currObj.position[i][1]

        //console.log('pg cell  ', playground[y-1][x])
        console.log(playground[y][x+1], x+1)
        if (x < 4 && playground[y][x+1] === undefined) {
            rightFlag++
            //console.log('++1')
        }
        else if (x < 4 && matchCoords(currObj, [y, x+1])) {
            console.log(matchCoords(currObj, [y, x+1]))
            console.log([y, x+1])
            rightFlag++
            //console.log('++2')
        }
    }
    //console.log('flag  ', rightFlag)
    return (rightFlag == currObj.position.length)
}



function createNewObject() {
    let newObj = {
        type: null,
        state: 'falling',
        position: []
    }
    let choice = Math.floor(Math.random() * 10)
    if (choice < 3) {
        newObj.type = 'L'
        newObj.position = JSON.parse(JSON.stringify(initialPositions.L))
    }
    else if (choice >= 3 && choice < 7) {
        newObj.type = 'T'
        newObj.position = JSON.parse(JSON.stringify(initialPositions.T))
    }
    else {
        newObj.type = 'I'
        newObj.position = JSON.parse(JSON.stringify(initialPositions.I))
    }

    //game over check
    for (let i=0; i < newObj.position.length; i++) {
        let y = newObj.position[i][0]
        let x = newObj.position[i][1]

        if (playground[y][x] !== undefined || playground[y-1][x] !== undefined) {
            alert("GAME OVER")
            pause()
            objects = [{
                type: 'L',
                state: 'falling',
                position: [[9, 1], [8, 1], [8, 2], [8, 3]]
              }
              ]
            newObj = objects[0]
            break
        } 
    }    

    return newObj
}



function rowClearHandler(rowIndx){

    let fullRow = 0;
  
    //check how full a row is
    for(let i = 0; i < playground[rowIndx].length; i++){
        if (playground[rowIndx][i] !== undefined) {
            fullRow++ 
        }
    }
  
    //go
    if (fullRow === playground[rowIndx].length){
        
        //clear full rows
        for(let i = 0; i < objects.length; i++) {
            
            if (objects[i].state !== 'falling') {
                let pos = objects[i].position.filter(e => e[0] !== rowIndx)
                objects[i].position = pos
            }
        }

        //collapse
        for(let i = 0; i < objects.length; i++) {
            objects[i].position.forEach(position => (position[0] > rowIndx && (position[0] -= 1)))
        }
    }
}