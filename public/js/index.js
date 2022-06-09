const game_loop = () => {
  $canvas.width = window.innerWidth;
  $canvas.height = window.innerHeight - 5;

  context.clearRect(0, 0, $canvas.width, $canvas.height);
  board.udpate(context);
  if (start_game) {
    for (let player of players) player.draw(context);
  }
  requestAnimationFrame(game_loop);
};

game_loop();
