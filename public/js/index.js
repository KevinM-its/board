


const game_loop = () => {
    context.clearRect(0, 0, $canvas.width, $canvas.height);
    board.udpate(context); 
    image.update(context, ($canvas.width / 2) - (image.img.width / 2), ($canvas.height / 2) - (image.img.height / 2));
    if (start_game) {
        for (let player of players)
            player.draw(context);
    }
    requestAnimationFrame(game_loop);
}

game_loop();
