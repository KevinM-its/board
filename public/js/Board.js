/**
 * @class
 * Maneaja las cordenadas y posicion de los diferentes elementos del tablero
 * como lo son jugadores, casillas, imagenes, tarjetas.
 */
class Coords {
  /**
   * @Constructor
   * @param {*} x - ubicacion del elemento en el eje x
   * @param {*} y - ubicacion del elemento en el eje y
   * @param {*} coordX - columna que ocupa el elemento
   * @param {*} coordY - fila que ocupa el elemento
   */
  constructor(x = 0, y = 0, coordX = 0, coordY = 0) {
    this.x = x;
    this.y = y;
    this.coordX = coordX;
    this.coordY = coordY;
  }

  /**
   * @typedef {position}
   * @property {number}
   * @property {number}
   */

  /**
   * @returns {position} - Posicion en el eje 'x' y 'y' del objeto
   */
  getPosition() {
    return { x: this.x, y: this.y };
  }

  /**
   * @typedef {coords}
   * @property {number}
   * @property {number}
   */

  /**
   * @returns {coords} - ubicacion de la columna y la fila del objeto
   */
  getCoords() {
    return { cx: this.coordX, cy: this.coordY };
  }

  /**
   * @description
   * actualiza el nuevo valor de los ejes cartesianos del objeto
   * @param {number} x ubicacion en el eje x
   * @param {number} y ubicacion en el eje y
   */
  setPosition(x, y) {
    this.x = x;
    this.y = y;
  }

  /**
   * @description
   * actualiza el nuevo valor de la fila y columana del objeto
   * @param {number} cx ubicacion de la columna
   * @param {number} cy ubicacion de la fila
   */
  setCoords(cx, cy) {
    this.coordX = cx;
    this.coordY = cy;
  }
}

class Board {
  constructor() {
    this.boxes = [];
    this.stars = [];
    this.players = [];
    this.playerTurn = 0;
    this.changeTurn = false;
    this.zoom = false;
    this.logo = new NewImage("./../assets/its.png");
    this.text = new CreateText(window.innerWidth, window.innerHeight / 2);

    for (let star = 0; star < STARS; star++) this.stars.push(new Star());

    this.fillBoard();
  }

  fillBoard() {
    for (let row = 0; row < BOARD_GAME.length; row++) {
      for (let col = 0; col < BOARD_GAME[row].length; col++) {
        if (BOARD_GAME[row][col] !== " ") {
          this.boxes.push(
            new Box(this.setImg(row, col), this.setFunc(row, col), col, row)
          );
        }
      }
    }
  }

  setImg(row, col) {
    let img = BOARD_GAME[row][col];

    switch (img) {
      case "C":
        return new NewImage("./../assets/tablero/cancelada.png");
      case "O":
        return new NewImage("./../assets/tablero/comodin.png");
      case "I":
        return new NewImage("./../assets/tablero/info.png");
      case "B":
        return new NewImage("./../assets/tablero/info-blue.png");
      case "S":
        return new NewImage("./../assets/tablero/inicio.png");
      case "P":
        return new NewImage("./../assets/tablero/pregunta.png");
      case "R":
        return new NewImage("./../assets/tablero/retorno.png");
      case "V":
        return new NewImage("./../assets/tablero/video.png");
      default:
        throw new Error("Letter not allowed");
    }
  }

  setFunc(row, col) {
    let func = BOARD_GAME[row][col];

    switch (func) {
      case "B":
        return null;
      case "R":
        return null;
      case "S":
        return null;
    }
    return null;
  }

  udpate(ctx) {
    for (const star of this.stars) {
      star.update(ctx);
    }
    if (this.zoom) {
      this.zoomMode(ctx);
    } else {
      this.completeMap(ctx);
    }
    this.showText(ctx);
  }

  zoomMode(ctx) {
    const { cx, cy } = this.players[this.playerTurn].getCoords();
    const boxZoomSize = window.innerWidth / 5 - 20;

    const x = window.innerWidth / 2 - boxZoomSize / 2;
    const y = window.innerHeight / 2 - boxZoomSize / 2;

    for (const box of this.boxes)
      box.drawZoomBoxes(ctx, cx, cy, x, y, boxZoomSize);

    for (const player of this.players)
      player.drawZoom(ctx, cx, cy, boxZoomSize, x, y);
  }

  ////////////////////

  completeMap(ctx) {
    const responsiveObj = this.responsive();

    for (const box of this.boxes) box.draw(ctx, responsiveObj);
    for (const player of this.players) player.draw(ctx, responsiveObj);

    this.drawLogo(ctx);
  }

  drawLogo(ctx) {
    let { w, h } = this.logoSize(window.innerWidth);
    let x = window.innerWidth / 2 - w / 2;
    let y = window.innerHeight / 2 - h / 2;
    ctx.drawImage(this.logo.img, x, y, w, h);
  }

  showText(ctx) {
    if (this.changeTurn) {
      if (
        this.text.update(`Turno de ${this.players[this.playerTurn].name}`, ctx)
      ) {
        this.changeTurn = false;
        this.text.x = window.innerWidth;
      }
    }
  }

  // Funciones creadas para el diseno responsivo del
  // tablero de juego y medidas de casillas y jugador
  //

  /**
   * Responsive Object
   * @typedef {Object} Responsive
   * @property {number} size - tamaño de las casillas
   * @property {number} x - Punto de origen en 'X' del dibujado del tablero
   * @property {number} y - Punto de origen en 'Y' del dibujado del tablero
   *
   */

  /**
   *
   * Devuelve el objeto Responsive con las cordenadas y dimensiones del tablero
   * en base a las dimensiones de la pantalla
   * @returns {Responsive}
   *
   */
  responsive() {
    let w = window.innerWidth;
    let h = window.innerHeight;

    let size = this.blockSize(w);
    let { x, y } = this.boardPosition(size, w, h);

    return { size, x, y };
  }

  // Funciones Auxiliares //

  /**
   *
   * @param {number} size
   * @param {number} w
   * @param {number} h
   * @returns
   */
  boardPosition(size, w, h) {
    let boardWidth = size * BOARD_GAME[0].length;
    let boardHeight = size * BOARD_GAME.length;

    let x = (w - boardWidth) / 2;
    let y = (h - boardHeight) / 2;

    return { x, y };
  }

  blockSize(w) {
    let size;

    if (w > 1200) size = 62;
    else if (w > 992) size = 50;
    else if (w > 768) size = 38;
    else if (w > 576) size = 26;
    else size = 20;

    return size;
  }

  logoSize(w) {
    let size;
    if (w > 1200) size = { w: 400, h: 300 };
    else if (w > 992) size = { w: 360, h: 260 };
    else if (w > 768) size = { w: 310, h: 210 };
    else if (w > 576) size = { w: 260, h: 160 };
    else size = { w: 190, h: 110 };

    return size;
  }

  /**
   * @description
   * realiza la tirada del jugador
   */
  newTurn() {
    // Solo se podra activar si el turno corresponde al jugador indicado.
    if (user.id === this.playerTurn && !this.changeTurn) {
      //
      // Se establece el tiro del jugador
      this.players[user.id].move(dice, this.boxes); // se actualiza las nuevas coordenadas del jugador
      socketIO.emit("change", this.players[user.id].getCoords()); // se emite la nueva posicion a los demas jugadores
      this.changeTurn = true;
      dice.setState("off"); // se cambia el estado del dado
      this.setTurn(); // se actualiza el numero de turno
    }
  }

  setTurn() {
    this.playerTurn++;

    if (this.playerTurn === MAX_PLAYERS) {
      this.playerTurn = 0;
    }
  }
}

class Box extends Coords {
  constructor(img, func, coordX, coordY) {
    super(0, 0, coordX, coordY);
    this.img = img;
    this.func = func;
  }

  draw(ctx, responsiveObj) {
    let { size, x, y } = responsiveObj;
    let { cx, cy } = super.getCoords();

    super.setPosition(x, y);
    this.img.drawBox(ctx, size, this.x, this.y, cx, cy);
  }

  drawZoomBoxes(ctx, _cx, _cy, x, y, size) {
    const { cx, cy } = super.getCoords();
    const X = size * (cx - _cx) + x;
    const Y = size * (cy - _cy) + y;

    ctx.drawImage(this.img.img, X, Y, size, size);
  }
}

class Dice {
  constructor() {}

  roll() {
    return Math.floor(Math.random() * 5 + 1);
  }

  setState(state) {
    switch (state) {
      case "on":
        $dice.style.opacity = "1";
        break;
      case "off":
        $dice.style.opacity = ".7";
        break;
      default:
        throw new Error("state not found");
    }
  }
}

class Star {
  constructor() {
    this.x = Math.floor(Math.random() * window.innerWidth);
    this.y = -10;
    this.starSize = 5;
    this.speed = Math.floor(Math.random() * 8);
  }

  update(ctx) {
    this.y += this.speed;

    if (this.y > 1000) {
      this.y = -10;
      this.x = Math.floor(Math.random() * window.innerWidth);
      this.speed = Math.floor(Math.random() * 8) + 1;
    }

    this.draw(ctx);
  }

  draw(ctx) {
    ctx.fillStyle = "#fff8";
    ctx.fillRect(this.x, this.y, this.starSize, this.starSize);
  }
}

class NewImage {
  constructor(src) {
    this.img = new Image();
    this.img.src = src;
  }

  drawBox(ctx, size, x, y, cx, cy) {
    if (cx === 11 && cy === 7)
      ctx.drawImage(
        this.img,
        x + (cx - 1) * size,
        y + (cy - 1) * size,
        size * 2,
        size * 2
      );
    else ctx.drawImage(this.img, x + cx * size, y + cy * size, size, size);
  }

  drawPlayer(ctx, x, y, size) {
    ctx.drawImage(this.img, x, y, size, size);
  }
}

class CreateText {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.speed = 15;
    this.fontSize = "40px";
  }

  update(msg, ctx) {
    ctx.fillStyle = "#7d9";
    context.font = `bold ${this.fontSize} arial`;
    ctx.fillText(msg, this.x, this.y);

    if (this.x < -600) return true;

    this.x -= this.speed;
    return false;
  }
}

/* class changeViewAnimation {
  constructor(time) {
    this.counter = 0;
    this.reverse = false;
    this.time = Math.floor((time * 60) / 10);
    this.ticks = 0;
  }

  drawBlock() {
    context.fillStyle = `#000${this.counter}`;
    ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);
    this.changeReverse();
  }

  update() {
    if (!this.reverse) this.counter++;
    else this.counter--;
  }

  changeReverse() {
    this.ticks++;

    if (this.ticks === this.time) {
      this.update();
      this.ticks = 0;
    }

    if (this.counter === 9) this.reverse = true;
  }
} */
