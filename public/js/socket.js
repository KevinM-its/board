

socketIO.on('start game', (ps) => {
    $login.style.top = '-150%';
    start_game = true; 

    for (const p of ps) {
        if (user.name === p.player.name) {
            numPlayer = p.id;
        } players.push(new Player(p.player.name, COLORS[p.id]));
    }

    $login.innerHTML = '';
});


socketIO.on('update', (coords) => {

    players[board.playerTurn].setPositon(board.boxes, coords);

    board.playerTurn++;

    if (board.playerTurn === MAX_PLAYERS)
        board.playerTurn = 0;

    if (numPlayer === board.playerTurn) dice.on();

    board.changeTurn = true;
});