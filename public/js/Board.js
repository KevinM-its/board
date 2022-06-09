class Coords {
  constructor(x = 0, y = 0, coordX = 0, coordY = 0) {
    this.x = x;
    this.y = y;
    this.coordX = coordX;
    this.coordY = coordY;
  }

  getPosition() {
    return { x: this.x, y: this.y };
  }

  getCoords() {
    return { cx: this.coordX, cy: this.coordY };
  }

  setPosition(x, y) {
    this.x = x;
    this.y = y;
  }

  setCoords(cx, cy) {
    this.coordX = cx;
    this.coordY = cy;
  }
}

class Board {
  constructor() {
    this.boxes = [];
    this.stars = [];
    this.playerTurn = 0;
    this.changeTurn = false;
    this.logo = new NewImage("./../assets/its.png");
    this.text = new CreateText(window.innerWidth, window.innerHeight / 2);

    for (let star = 0; star < STARS; star++)
      this.stars.push(
        new Star(
          Math.floor(Math.random() * window.innerWidth),
          -10,
          Math.floor(Math.random() * 8)
        )
      );

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
    let responsiveObj = this.responsive();

    for (const star of this.stars) {
      star.update(ctx);
    }
    for (const box of this.boxes) {
      box.draw(ctx, responsiveObj);
    }
    this.drawLogo(ctx);
    this.showText(ctx);
  }

  drawLogo(ctx) {
    let { w, h } = this.logoSize(window.innerWidth);
    let x = window.innerWidth / 2 - w / 2;
    let y = window.innerHeight / 2 - h / 2;
    ctx.drawImage(this.logo.img, x, y, w, h);
  }

  showText(ctx) {
    if (this.changeTurn) {
      if (this.text.update(`Turno de ${players[this.playerTurn].name}`, ctx)) {
        this.changeTurn = false;
        this.text.x = window.innerWidth;
      }
    }
  }

  //
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
    else if (w > 768) size = { w: 320, h: 220 };
    else if (w > 576) size = { w: 280, h: 180 };
    else size = { w: 190, h: 110 };

    return size;
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
    this.img.update(ctx, size, this.x, this.y, cx, cy);
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
  constructor(x, y, speed) {
    this.x = x;
    this.y = y;
    this.starSize = 5;
    this.speed = speed;
  }

  update(ctx) {
    this.y += this.speed;

    if (this.y > 1000) {
      this.y = 0;
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

  update(ctx, size, x, y, cx, cy) {
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
