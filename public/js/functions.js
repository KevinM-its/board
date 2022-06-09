const changeTurn = () => {
  if (numPlayer === board.playerTurn && !board.changeTurn) {
    update_move();
    board.playerTurn++;

    if (board.playerTurn === MAX_PLAYERS) board.playerTurn = 0;
  }
};

const update_move = () => {
  players[numPlayer].move(dice, board.boxes);
  socketIO.emit("change", players[numPlayer].getCoords());
  board.changeTurn = true;
  dice.setState("off");
};

$dice.addEventListener("click", changeTurn);
