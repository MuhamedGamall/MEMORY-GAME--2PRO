/* Memory_Game */

let blocksContainer = document.querySelector(".block-container");
let allBlocks = document.querySelectorAll(".game-block");
let username = document.querySelector(".name span");
let wrongCount = document.querySelector(".tries-number span");
let startContainer = document.querySelector(".start-game ");
let startBtn = document.querySelector(".start-game button");
let endGame = document.querySelector(".endGame");
let reset = document.querySelector(".endGame button");
let span = document.querySelector(".endGame span");
let blocks = [...allBlocks];
let orderBlocks = [...Array(blocks.length).keys()];

startBtn.onclick = () => userName();
function userName() {
  let yourName = prompt("Whats Your Name?");
  username.innerHTML = yourName || "Unknown";
  startContainer.remove();
  showCards();
}
//shuffle function
function shuffle() {
  orderBlocks.sort(() => Math.random() - 0.5);
  orderBlocks.sort(() => Math.random() - 0.5);
}

// show cards function
function showCards() {
  blocks.forEach((el) => {
    el.classList.add("is-flipped");
    setTimeout(() => {
      el.classList.remove("is-flipped");
    }, 2000);
  });
  setTimeout(() => {
    randomBlocks();
  }, 500);
}

function randomBlocks() {
  shuffle();
  blocks.forEach((el, i) => {
    el.style.order = orderBlocks[i];
    el.onclick = () => flipBlock(el);
  });
}

//function flep Bock block
function flipBlock(block) {
  block.classList.add("is-flipped");
  let allFliepped = blocks.filter((el) => el.classList.contains("is-flipped"));
  if (allFliepped.length == 2) {
    checkBlocks(allFliepped[0], allFliepped[1]);
    stopClicking();
  }
  winner();
}

function checkBlocks(firstBlock, secoundBlock) {
  if (firstBlock.dataset.count$tries == secoundBlock.dataset.count$tries) {
    firstBlock.classList.remove("is-flipped");
    secoundBlock.classList.remove("is-flipped");
    firstBlock.classList.add("has-match");
    secoundBlock.classList.add("has-match");
    document.querySelector("#succes").play();
  } else {
    document.querySelector("#fail").play();
    wrongCount.innerHTML++;
    setTimeout(() => {
      firstBlock.classList.remove("is-flipped");
      secoundBlock.classList.remove("is-flipped");
    }, 700);
    winner();
    console.log(wrongCount.innerHTML);
  }
}
// winner function
function winner() {
  let hasMatch = blocks.filter((el) => el.classList.contains("has-match"));
  if (hasMatch.length == blocks.length) {
    span.innerHTML = "You Win";
    endGame.style.display = "flex";
  }
  if (wrongCount.innerHTML == 10) {
    endGame.style.display = "flex";
  }
}

// reset function
reset.onclick = () => resetFun();
function resetFun() {
  blocks.forEach((el) => {
    el.classList.remove("is-flipped");
    el.classList.remove("has-match");
  });
  wrongCount.innerHTML =0
  endGame.style.display = "none";
  showCards() 
}
// stopClicking function
function stopClicking() {
  blocksContainer.classList.add("no-clicking");
  setTimeout(() => {
    blocksContainer.classList.remove("no-clicking");
  }, 700);
}
