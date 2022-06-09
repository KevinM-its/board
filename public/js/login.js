const user = { name: null, color: BLUES };

$button.addEventListener("click", () => {
  user.name = $input.value;

  if (user.color && user.name) {
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

let players = [];
let start_game = false;
let numPlayer;
