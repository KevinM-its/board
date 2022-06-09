class Player extends Coords {
  constructor(name, color) {
    super(0, 0, BOARD_GAME[0].length - 1, BOARD_GAME.length - 1);
    this.name = name;
    this.color = color;
    this.direction = "u";
    this.fontSize = "30px";
    this.setPositon(board.boxes);
  }

  getStatus() {
    return { name: this.name, letter: this.letter };
  }

  draw(ctx) {
    let responsive = board.responsive();
    ctx.beginPath();
    ctx.fillStyle = this.color;
    let radius = responsive.size / 2;
    ctx.arc(
      responsive.x + this.coordX * responsive.size + radius,
      responsive.y + this.coordY * responsive.size + radius,
      radius,
      0,
      2 * Math.PI
    );
    ctx.fill();
  }

  move(sice, boxes) {
    let number = sice.roll();

    switch (this.direction) {
      case "r":
        this.moveRight(number);
        break;
      case "l":
        this.moveLeft(number);
        break;
      case "u":
        this.moveUp(number);
        break;
      case "d":
        this.moveDown(number);
        break;
    }
    this.setPositon(boxes);
  }

  setPositon(boxes, coords = undefined) {
    coords = coords || super.getCoords();
    this.coordX = coords.cx;
    this.coordY = coords.cy;

    for (const box of boxes) {
      const { cX, cY } = box.getCoords();
      if (cX === this.coordX && cY === this.coordY) {
        const { x, y } = box.getPosition();
        super.setPosition(x + this.radius, y + this.radius);
        break;
      }
    }
  }

  moveRight(num) {
    this.coordX += num;
    this.direction = "r";

    if (this.coordX > BOARD_GAME[0].length - 1) {
      let difx = this.coordX - (BOARD_GAME[0].length - 1);
      this.coordX = BOARD_GAME[0].length - 1;
      this.moveUp(difx);
    }
  }

  moveLeft(num) {
    this.coordX -= num;
    this.direction = "l";

    if (this.coordX < 0) {
      let difx = Math.abs(this.coordX);
      this.coordX = 0;
      this.moveDown(difx);
    }
  }

  moveDown(num) {
    this.coordY += num;
    this.direction = "d";

    if (this.coordY > BOARD_GAME.length - 1) {
      let dify = this.coordY - (BOARD_GAME.length - 1);
      this.coordY = BOARD_GAME.length - 1;
      this.moveRight(dify);
    }
  }

  moveUp(num) {
    this.coordY -= num;
    this.direction = "u";

    if (this.coordY < 0) {
      let dify = Math.abs(this.coordY);
      this.coordY = 0;
      this.moveLeft(dify);
    }
  }
}
