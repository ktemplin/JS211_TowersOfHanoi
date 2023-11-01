'use strict';

const assert = require('assert');
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Added to make a pause upon a successful win
const keypress = async () => {
  process.stdin.setRawMode(true)
  return new Promise(resolve => process.stdin.once('data', () => {
    process.stdin.setRawMode(false)
    resolve()
  }))
}

// An object that represents the three stacks of Towers of Hanoi; 
  // * each key is an array of Numbers: 
    // * A is the far-left, 
    // * B is the middle, 
    // * C is the far-right stack
      // * Each number represents the largest to smallest tokens: 
        // * 4 is the largest, 
        // * 1 is the smallest

let stacks = {
  a: [4, 3, 2, 1],
  b: [],
  c: []
};

let inHand

// Start here. What is this function doing?
const printStacks = () => {
  console.log("a: " + stacks.a);
  console.log("b: " + stacks.b);
  console.log("c: " + stacks.c);
}

// Next, what do you think this function should do?
const movePiece = async (stack1, stack2) => {
  if (checkForWin()){
    console.log('You\'ve won!!!')
    //logic to show number of moves used
    //logic to show optimal number of moves possible
    console.log('Press any key to reset game.')
    await keypress()
    stacks = {
      a: [4, 3, 2, 1],
      b: [],
      c: []
    };
  }
  else if (isLegal(stack1, stack2)){
    inHand = stacks[stack1].pop()
    stacks[stack2].push(inHand)
  }
  else {
    console.log('Illegal Move! Try again')
  }
}

// Before you move, should you check if the move it actually allowed? Should 3 be able to be stacked on 2
const isLegal = (stack1, stack2) => {
  // const check1 = stacks[stack1].length-1
  // const check2 = stacks[stack2].length
  const check1 = stacks[stack1][stacks[stack1].length-1]
  const check2 = stacks[stack2][stacks[stack2].length-1]

  return check1 < check2 || stacks[stack2].length === 0
}

// What is a win in Towers of Hanoi? When should this function run?
const checkForWin = () => {
  if((stacks['b'].length == 4) || (stacks['c'].length == 4)){
    return true
  } else {
    return false
  }
}

// When is this function called? What should it do with its argument?
const towersOfHanoi = (startStack, endStack) => {
  movePiece(startStack, endStack);
}

const getPrompt = () => {
  printStacks();
  rl.question('start stack: ', (startStack) => {
    rl.question('end stack: ', (endStack) => {
      towersOfHanoi(startStack, endStack);
      getPrompt();
    });
  });
}

// Tests

if (typeof describe === 'function') {

  describe('#towersOfHanoi()', () => {
    it('should be able to move a block', () => {
      towersOfHanoi('a', 'b');
      assert.deepEqual(stacks, { a: [4, 3, 2], b: [1], c: [] });
    });
  });

  describe('#isLegal()', () => {
    it('should not allow an illegal move', () => {
      stacks = {
        a: [4, 3, 2],
        b: [1],
        c: []
      };
      assert.equal(isLegal('a', 'b'), false);
    });
    it('should allow a legal move', () => {
      stacks = {
        a: [4, 3, 2, 1],
        b: [],
        c: []
      };
      assert.equal(isLegal('a', 'c'), true);
    });
    it('should allow move of smaller ring onto larger', () => {
      stacks = {
        a: [4, 3],
        b: [2],
        c: [1]
      };
      assert.equal(isLegal('c','b'), true);
    });
    it('should allow move of smaller ring onto larger', () => {
      stacks = {
        a: [4, 2],
        b: [3],
        c: [1]
      };
      assert.equal(isLegal('c','b'), true);
    });
  });
  describe('#checkForWin()', () => {
    it('should detect a win', () => {
      stacks = { a: [], b: [4, 3, 2, 1], c: [] };
      assert.equal(checkForWin(), true);
      stacks = { a: [1], b: [4, 3, 2], c: [] };
      assert.equal(checkForWin(), false);
    });
  });

} else {

  getPrompt();

}
