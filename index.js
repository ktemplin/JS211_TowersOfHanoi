// * This js file is incomplete. It will log to the console the elements you click
    // call another function and set stone. You will have to work through the logic
    // of the game as you know it from building it in the terminal. Work through the
    // puzzle slowly, stepping through the flow of logic, and making the game work.
    // Have fun!!
// * First run the program in your browser with live server and double-click on the row you'd like to select an element from.
// * Why are you get a warning in your console? Fix it.
// * Delete these comment lines!

let stone = null
let moveCount = 0

// this function is called when a row is clicked. 
// Open your inspector tool to see what is being captured and can be used.
const selectRow = (row) => {
  let currentRow = row.getAttribute("data-row")
  
  console.log("Yay, we clicked an item", row)
  console.log("Here is the stone's id: ", row.id)
  console.log("Here is the stone's data-size: ", currentRow)

  if(stone === null){
    pickUpStone(row.id)}
    else {
      let lastStone = row.lastChild
      dropStone(row, row.id)
    }
} 

// this function can be called to get the last stone in the stack
// but there might be something wrong with it...
const pickUpStone = (rowID) => {
  const selectedRow = document.getElementById(rowID);
  stone = selectedRow.removeChild(selectedRow.lastElementChild);
  console.log(stone)
  console.log(rowID)
}

// You could use this function to drop the stone but you'll need to toggle between pickUpStone & dropStone
// Once you figure that out you'll need to figure out if its a legal move...
// Something like: if(!stone){pickupStone} else{dropStone}

const dropStone = (row, rowID) => {
  if (isLegal(row, rowID)){
    document.getElementById(rowID).appendChild(stone)
    stone = null
    moveCount++
    document.getElementById('move-count').innerText = moveCount
    checkForWin(rowID)
  } else {
    alert('Invalid move.')
  }
}

// * Remember you can use your logic from 'main.js' to maintain the rules of the game. But how? Follow the flow of data just like falling dominoes.

const isLegal = (row, rowID) => {
  // const check1 = stacks[stack1][stacks[stack1].length-1]
  // const check2 = stacks[stack2][stacks[stack2].length-1]
  if (row.lastElementChild == null) {
    return true
  } else if (stone.getAttribute("data-size") < row.lastElementChild.getAttribute("data-size"))
  return true
else
  return false

  // return check1 < check2 || stacks[stack2].length === 0
}

// What is a win in Towers of Hanoi? When should this function run?
const checkForWin = (rowID) => {
  if((rowID) !== "bottom-row" && 
  document.getElementById(rowID).getElementsByClassName('stone').length == 4){
    alert("You win!!! It took you " + moveCount + " moves!")
  }
}

