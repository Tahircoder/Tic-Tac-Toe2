const boxes = document.querySelectorAll(".box");
const gameInfo = document.querySelector(".game-info");
const newGameBtn = document.querySelector(".btn");

let currentPlayer;
let gameGrid;

const winningPositions = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [0,4,8]
];

//let's create a function to initialize the game

function initGame(){
    currentPlayer = "X";
    gameGrid = ["","","","","","","","",""];
    //UI pr empty bhi karna padega boxes ko
    boxes.forEach((box, index) => {
        box.innerText = "";
        boxes[index].style.pointerEvents = "all";
        // one more thing is missing, initialize box with css properties again
        box.classList = `box box${index+1}`;
    });
    newGameBtn.classList.remove("active");
    gameInfo.innerText = `Current player - ${currentPlayer}`;
}

initGame();

function swapTurn(){
    if(currentPlayer === 'X'){
        currentPlayer = '0';
    }
    else{
        currentPlayer = 'X';
    }
    //UI update
    gameInfo.innerText = `Current Player - ${currentPlayer}`;
}

function checkGameOver(){
    //TODO


    let answer = "";

    winningPositions.forEach((position) => {
        //all 3 boxes should be non empty and exactly same in value
        console.log(gameGrid[position[0]]);
        console.log(gameGrid[position[1]]);
        console.log(gameGrid[position[2]]);
        console.log('break')

        if( (gameGrid[position[0]] !== "" || gameGrid[position[1]] !=="" || gameGrid[position[2]] !=="") && (gameGrid[position[0]] === gameGrid[position[1]] &&  gameGrid[position[1]] === gameGrid[position[2]]) ) {
            console.log(gameGrid[position[0]])
            //if check winner X
            if(gameGrid[position[0]] === "X")
               answer ="X";
            else{
                answer ="0";
            }

                newGameBtn.classList.add("active");

            //disable pointer events
            boxes.forEach((box) =>{
                box.style.pointerEvents = "none";
            })

            // Now we know X/0 is a winner
            boxes[position[0]].classList.add("win");
            boxes[position[1]].classList.add("win");
            boxes[position[2]].classList.add("win");
           
        
               
        }
    });

    //it means we have a winner 
    
    if(answer !== ""){
        gameInfo.innerText = `Winner Player - ${answer}`;
        newGameBtn.classList.add("active");
        return;
    }

    // Let's chech whether there is no tie

    let fillCount = 0;
    gameGrid.forEach((box) => {
        if(box !=="" )
        fillCount++;
    });

    //Board is filled, game is tied

    if(fillCount ===9) {
        gameInfo.innerText = "Game Tied !";
        newGameBtn.classList.add("active");
    }
}

function handleClick(index){
    if(gameGrid[index] === ""){
        boxes[index].innerText = currentPlayer;  //UI me change
        gameGrid[index] = currentPlayer;        //inner gamegrid change
        boxes[index].style.pointerEvents = "none";
        //Swap karo turn ko
        swapTurn();
        //check karo koi jeet to nahi gya
        checkGameOver();
    }
}

boxes.forEach((box, index) => {
    box.addEventListener("click", () => {
        handleClick(index);
    })
});

newGameBtn.addEventListener("click", initGame);

