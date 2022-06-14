const user = { name: null, id: null };

$button.addEventListener("click", () => {
  user.name = $input.value;

  if (user.name) {
    $login.innerHTML = `
      <h1>
        Esperando a un jugador
      </h1>
      <div
        class="preloader"
        style="visibility: visible"
      >
      </div>`;
    socketIO.emit("player ready", user);
  }
});

let start_game = false;
