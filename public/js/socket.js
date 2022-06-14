socketIO.on("start game", (ps) => {
  $login.style.top = "-150%";
  start_game = true;

  for (const p of ps) {
    if (user.name === p.player.name) {
      user.id = p.id;
    }
    board.players.push(
      new Player(
        p.player.name,
        new NewImage(`../assets/players/r${p.id + 1}.png`)
      )
    );
  }

  $login.innerHTML = "";
});

socketIO.on("update", (coords) => {
  board.players[board.playerTurn].setPositon(board.boxes, coords);
  board.setTurn();
  if (user.id === board.playerTurn) dice.setState("on");
  board.changeTurn = true;
});
