

class Board {
    constructor (cw, ch) {
        this.board = BOARD_GAME;
        this.cw = cw;
        this.ch = ch;
        this.boxes = [];
        this.stars = [];
        this.numStars = STARS;
        this.BLOCK = BLOCK_SIZE;
        this.playerTurn = 0;
        this.changeTurn = false;
        this.text = new CreateText(window.innerWidth, window.innerHeight / 2);

        for(let star = 0; star < this.numStars; star++) 
            this.stars.push(new Star(
                Math.floor(Math.random() * window.innerWidth), -10, Math.floor(Math.random() * 8)
            ));

        this.fillBoard();
    }

    fillBoard() {
        for (let row = 0; row < this.board.length; row++) {
            for (let col = 0; col < this.board[row].length; col++) {
                if (this.board[row][col] !== ' ') {
                    this.boxes.push(new Box(
                        (col * (this.BLOCK)) + this.cw, (row * (this.BLOCK)) + this.ch,
                            this.BLOCK, this.setImg(row, col), this.setFunc(row, col), col, row
                    ));
                }
            }
        }
    }

    setImg(row, col) {
        let img = this.board[row][col];

        switch(img) {
            case 'C':
                return new NewImage(
                    './../assets/tablero/cancelada.png',
                        BLOCK_SIZE, BLOCK_SIZE);
            case 'O':
                return new NewImage(
                    './../assets/tablero/comodin.png',
                        BLOCK_SIZE, BLOCK_SIZE);
            case 'I':
                return new NewImage(
                    './../assets/tablero/info.png',
                        BLOCK_SIZE, BLOCK_SIZE);
            case 'B':
                return new NewImage(
                    './../assets/tablero/info-blue.png',
                        BLOCK_SIZE, BLOCK_SIZE);
            case 'S':
                return new NewImage(
                    './../assets/tablero/inicio.png',
                        BLOCK_SIZE, BLOCK_SIZE);
            case 'P':
                return new NewImage(
                    './../assets/tablero/pregunta.png',
                        BLOCK_SIZE, BLOCK_SIZE);
            case 'R':
                return new NewImage(
                    './../assets/tablero/retorno.png',
                        BLOCK_SIZE, BLOCK_SIZE);
            case 'V':
                return new NewImage(
                    './../assets/tablero/video.png',
                        BLOCK_SIZE, BLOCK_SIZE);
        }
    }

    setFunc(row, col) {
        let func = this.board[row][col];

        switch(func) {
            case 'B':
                return this.blueBox;
                break;
            case 'R':
                return this.redBox;
                break;
            case 'S':
                return null;
                break;
        }
    }

    udpate(ctx) {
        for (const star of this.stars) {{
            star.update(ctx);
        }}
        for (const box of this.boxes) {
            box.draw(ctx);
        } 
        this.showText(ctx);
    }

    showText(ctx) {
        if (this.changeTurn) {
            if (this.text.update(`Turno de ${players[this.playerTurn].name}`, ctx)) {
                this.changeTurn = false;
                this.text.x = window.innerWidth;
            }
        }
    }
}

class Box {
    constructor (x, y, size, color, func, coordX, coordY) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.color = color;
        this.func = func;
        this.coordX = coordX;
        this.coordY = coordY;
    }

    draw(ctx) {
        this.color.update(ctx, this.x, this.y);
    }

    getCoords() {
        return {cX : this.coordX, cY: this.coordY};
    }

    getPosition() {
        return {x : this.x, y: this.y};
    }
}

class Dice {
    constructor (dice, x, y) {
        this.x = x;
        this.y = y;
        this.w = 200;
        this.h = 200;
        this.radius = 30;
        this.dice = dice;
    }

    roll () {
        return Math.floor((Math.random() * 5) + 1 );
    }

    remove () { 
        this.dice.style.display = 'none'; 
    }

    show () {
        this.dice.style.display = 'block';
    }

    on () {
        this.dice.style.opacity = '1';
    }

    off () {
        this.dice.style.opacity = '.7';
    }
}

class Star {
    constructor (x, y, speed) {
        this.x = x;
        this.y = y;
        this.starSize = 5;
        this.speed = speed;
    }

    update (ctx) {
        this.y += this.speed;

        if (this.y > 1000) {
            this.y = 0;
            this.x = Math.floor(Math.random() * window.innerWidth);
            this.speed = Math.floor(Math.random() * 8) + 1;
        }

        this.draw(ctx);
    }

    draw(ctx) {
        ctx.fillStyle = '#fff8';
        ctx.fillRect(this.x, this.y, this.starSize, this.starSize);
    }
}

class NewImage { 
    constructor (src, w, h) {
        this.img = new Image();
        this.img.src    = src;
        this.img.width  = w;
        this.img.height = h;
    }

    update(ctx, x, y) {
        ctx.drawImage(this.img, x, y, this.img.width, this.img.height);
    }
}

class CreateText {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.speed = 15;
        this.fontSize =  size > 50 ? '80px' : '40px'; 
    }

    update(msg, ctx) {
        ctx.fillStyle = '#7d9';
        context.font = `bold ${this.fontSize} arial`;
        ctx.fillText(msg, this.x, this.y);

        if (this.x < -600) return true;
        
        this.x -= this.speed;
        return false;
        
    }
}


