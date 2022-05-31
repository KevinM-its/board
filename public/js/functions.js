

function responsive () {
    let w = window.innerWidth;
    let h = window.innerHeight;

    let size = blockSize(w);
    let {x, y} = boardPosition(size, w, h);

    return {size, x, y};
}


function boardPosition (size, w, h) {
    let boardWidth = size * 10;
    let boardHeight = size * 5;

    let x = (w - boardWidth ) / 2;
    let y = (h - boardHeight) / 2;

    return {x, y};

}

function blockSize (w) {
    let size;
    
    if (w > 1200)      size = 100;
    else if (w > 1000) size = 80;
    else if (w > 800)  size = 60;
    else if (w > 600)  size = 50;
    else               size = 30;

    return size;
}

function changeTurn() {
    if (numPlayer === board.playerTurn && !board.changeTurn) {

        update_move();
        board.playerTurn++;

        if (board.playerTurn === MAX_PLAYERS) 
            board.playerTurn = 0;
    }
}

function update_move() {
    players[numPlayer].move(dice, board.boxes);
    socketIO.emit('change', players[numPlayer].getCoords());
    board.changeTurn = true;
    dice.off();
}

$dice.addEventListener('click', changeTurn);

