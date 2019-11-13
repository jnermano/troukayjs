var holes = [];
var current_hole;
var start_hole;

var currentPlayer = 0;
var users = [];

var stonesInHand = 0;
let speed = 1000 * 0.1;
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

    if(hole.stones == 0){
        inProgress = false;
        return;
    }

    users[currentPlayer].inHand = hole.stones;
    hole.stones = 0;

    start_hole = hole;
    $("#hole-"+start_hole.id).addClass("start");
    
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

        if(current_hole != null){
            $("#hole-"+current_hole.id).removeClass("active");
        }
    
        current_hole = h;
        $("#hole-"+current_hole.id).addClass("active");

        h.stones += 1;
        users[currentPlayer].inHand -= 1;

        updateBoard();

        if(h.stones == 5){
            users[currentPlayer].earnigs += h.stones;
            h.stones = 0;
        }

        if(users[currentPlayer].inHand == 0 && h.stones > 1){
            users[currentPlayer].inHand = h.stones;
            h.stones = 0;
            updateBoard();
        }


        if(users[currentPlayer].inHand == 0){
            clearInterval(gameLoop);
            inProgress = false;
            $("#hole-"+current_hole.id).removeClass("active");
            $("#hole-"+start_hole.id).removeClass("start");
            
            currentPlayer = currentPlayer == 0? 1 : 0;

            updateBoard();
        }
            
    }, 
    speed);

}

function updateBoard(){
    holes.forEach(hole => {
        if(hole.active){
            $(`#nb_stones_hole_${hole.id}`).text(hole.stones);
        }
    });

    $(`#current_player`).text(currentPlayer + 1);

    
    $(`#player-${currentPlayer == 0? 2: 1}`).removeClass("playing");
    $(`#player-${currentPlayer == 0? 1: 2}`).addClass("playing");

    updateGameStates();
}

function updateGameStates(){
    users.forEach(user => {
        $(`#player-${user.id}-earnigs`).text(user.earnigs);
        $(`#player-${user.id}-hands`).text(user.inHand);
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

    users = [
        {
            id: 1,
            name: "Player 1",
            earnigs: 0,
            inHand: 0
        },
        {
            id: 2,
            name: "Player 2",
            earnigs: 0,
            inHand: 0
        }
    ];

    updateBoard();
}