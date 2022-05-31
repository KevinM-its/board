

class Player {

    constructor (name, color) {
        this.name = name
        this.color = color;
        this.x = 0;
        this.y = 0;
        this.letter = name[0].toUpperCase();
        this.stars = 0;
        this.coins = 10;
        this.radius = BLOCK_SIZE / 2;
        this.coordX = 9;
        this.coordY = 0;
        this.direction = 'l';
        this.fontSize = size > 50 ? '40px' : '30px'
        this.setPositon(board.boxes);
    }

    getStatus () {
        return {
            name: this.name,
            coins: this.coins,
            stars: this.stars
        }
    }

    getCoords () {
        return {
            x: this.coordX,
            y: this.coordY 
        }
    }

    draw(ctx) {
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        ctx.fill();
        ctx.fillStyle = WHITE;
        context.font = `bold ${this.fontSize} arial`;
        ctx.fillText(this.letter, this.x - 14, this.y + 10);
    }

    move(sice, boxes) { 
        let number = sice.roll();

        switch(this.direction) {
            case 'r':
                this.moveRight(number);
                break;
            case 'l':
                this.moveLeft(number);
                break;
            case 'u':
                this.moveUp(number);
                break;
            case 'd':
                this.moveDown(number);
                break;
        }
        this.setPositon(boxes);
    }

    setPositon (boxes, coords = undefined) {
        coords = coords || this.getCoords();
        this.coordX = coords.x;
        this.coordY = coords.y;

        for (const box of boxes) {
            const { cX, cY } = box.getCoords();
            if (cX === this.coordX && cY === this.coordY) {
                const { x, y } = box.getPosition();
                this.x = x + this.radius;
                this.y = y + this.radius;
                break;
            }
        }
    }

    moveRight(num) {
        this.coordX += num;
        this.direction = 'r';

        if (this.coordX > 9) {
            let difx = this.coordX - 9;
            this.coordX = 9;
            this.moveUp(difx);
        }
    }

    moveLeft(num) {
        this.coordX -= num;
        this.direction = 'l';

        if (this.coordX < 0) {
            let difx = Math.abs(this.coordX);
            this.coordX = 0;
            this.moveDown(difx);
        }
    }

    moveDown(num) {
        this.coordY += num;
        this.direction = 'd';

        if (this.coordY > 4) {
            let dify = this.coordY - 4;
            this.coordY = 4;
            this.moveRight(dify);
        }
    }

    moveUp(num) {
        this.coordY -= num;
        this.direction = 'u';

        if (this.coordY < 0) {
            let dify = Math.abs(this.coordY)
            this.coordY = 0;
            this.moveLeft(dify);
        }
    }
}