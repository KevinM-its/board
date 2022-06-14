$map.addEventListener("click", () => (board.zoom = !board.zoom));
$dice.addEventListener("click", () => board.newTurn.call(board));

const update = () => {
  $canvas.width = window.innerWidth;
  $canvas.height = window.innerHeight - 4;

  context.clearRect(0, 0, $canvas.width, $canvas.height);
};

const game_loop = () => {
  update();
  if (start_game) {
    board.udpate(context);
  }
  requestAnimationFrame(game_loop);
};

game_loop();
