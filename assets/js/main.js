var holes = [];
var currentPlayer = 1;
var stonesInHand = 0;
let speed = 1000 * 1;
var inProgress = false;
var gameLoop;

resetGame();

$(document).ready(function(){
    $('.hole').click(function(evt){
        play(this.id);
    });
});

function play(holeDOMId){
    if(inProgress == true)
        return;
    
    inProgress = true;

    let holeNumber = parseInt(holeDOMId.split("-").pop());
    hole = holes[holeNumber - 1];

    if(holeNumber.stones == 0)
        return;

    stonesInHand = hole.stones;
    hole.stones = 0;
    
    updateBoard();

    counter = holeNumber - 1;
    if(counter < 0)
        counter = 0;

    gameLoop = setInterval(function(){
        counter += 1;
        if(counter > 9)
            counter = 0

        console.log(`counter: ${counter} | ${counter%9}`);
        h = holes[counter];

        h.stones += 1;
        stonesInHand -= 1;

        updateBoard();

        if(stonesInHand == 0 && h.stones > 1){
            stonesInHand = h.stones;
            h.stones = 0;
            updateBoard();
        }

        if(stonesInHand == 0)
            clearInterval(gameLoop);
    }, 
    speed);

}

function updateBoard(){
    holes.forEach(hole => {
        if(hole.active){
            $(`#nb_stones_hole_${hole.id}`).text(hole.stones);
        }
    });
}

//reset de game
function resetGame(){
    // reset holes values
    holes = [
        {id: 1, stones: 5, active: true},
        {id: 2, stones: 5, active: true},
        {id: 3, stones: 5, active: true},
        {id: 4, stones: 5, active: true},
        {id: 5, stones: 5, active: true},
        {id: 6, stones: 5, active: true},
        {id: 7, stones: 5, active: true},
        {id: 8, stones: 5, active: true},
        {id: 9, stones: 5, active: true},
        {id: 10, stones: 5, active: true},
    ];

    updateBoard();
}