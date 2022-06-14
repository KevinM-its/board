class Player extends Coords {
  constructor(name, img) {
    //super(0, 0, BOARD_GAME[0].length - 1, BOARD_GAME.length - 1);
    super(0, 0, 8, 0);

    this.name = name;
    this.img = img;
    this.direction = "l";
    this.setPositon(board.boxes);
  }

  getStatus() {
    return { name: this.name, letter: this.letter };
  }

  draw(ctx, res) {
    const { size, x, y } = res;
    const { cx, cy } = super.getCoords();
    this.img.drawPlayer(ctx, x + cx * size, y + cy * size, size);
  }

  drawZoom(ctx, _cx, _cy, size, x, y) {
    const { cx, cy } = super.getCoords();
    const X = size * (cx - _cx) + x;
    const Y = size * (cy - _cy) + y;
    this.img.drawPlayer(ctx, X, Y, size);
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
      default:
        throw new Error("Movement not allowed");
    }
    this.setPositon(boxes);
  }

  setPositon(boxes, coords = undefined) {
    coords = coords || super.getCoords();
    super.setCoords(coords.cx, coords.cy);

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
