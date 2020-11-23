////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/// Classes
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// класс для рисования квадратиков, кругов и проверки координат по сравнению с другими элементами
class Block{
    constructor(col, row){
        this.col = col;
        this.row = row;
    }
    drawSquare(color) {
      let x = this.col * blockSize;
      let y = this.row * blockSize;
      ctx.fillStyle = color;
      ctx.fillRect(x, y, blockSize, blockSize);
    };
    drawCircle(color) {
      let centerX = this.col * blockSize + blockSize / 2;
      let centerY = this.row * blockSize + blockSize / 2;
      ctx.fillStyle = color;
      circle(centerX, centerY, blockSize / 2, true);
    };
    equal(otherBlock) {
      return this.col === otherBlock.col && this.row === otherBlock.row;
    };
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// класс змейка
class Snake{
    constructor(){
        this.segments = [
            new Block(7, 5),
            new Block(6, 5),
            new Block(5, 5)
          ];
        this.direction = "right";
        this.nextDirection = "right";
    }
    // сеттер направления движения
    setDirection(newDirection) {
        if (this.direction === "up" && newDirection === "down") {
            return;
        }
        if (this.direction === "right" && newDirection === "left") {
            return;
        }
        if (this.direction === "down" && newDirection === "up") {
            return;
        }
        if (this.direction === "left" && newDirection === "right") {
            return;
        }
        this.nextDirection = newDirection;
    }
    // метод для отрисовки тела змейки
    draw() {
        let isEvenSegment = false;

        for (let elem of this.segments) {
            if (isEvenSegment) {
                elem.drawSquare(firstColor);
            } else {
                elem.drawSquare(secondColor);
            }
            isEvenSegment = !isEvenSegment;
        }
    }
    // метод движения
    move() {
        let head = this.segments[0];
        let newHead;
        this.direction = this.nextDirection;

        if (this.direction === "right") {
            newHead = new Block(head.col + 1, head.row);
        } else if (this.direction === "down") {
            newHead = new Block(head.col, head.row + 1);
        } else if (this.direction === "left") {
            newHead = new Block(head.col - 1, head.row);
        } else if (this.direction === "up") {
            newHead = new Block(head.col, head.row - 1);
        }

        // проверка на столкновение
        if (this.collision(newHead)) {
            game = false;
            showMessage(messageEl,"Игра окончена",1);
            return;
        }

        this.segments.unshift(newHead);

        // съедание яблока
        if (newHead.equal(apple.position)) {
            score++;
            addNewRecord(score);
            scoreNumEl.innerHTML = "";
            scoreNumEl.innerHTML = score;
            apple.move(this.segments);
            clearInterval(timerId);

            // ускорение и ограничитель скорости
            if(animationTime > 50){
                animationTime -= acceleration;
            }

            timerId = setInterval(gameProcess, animationTime);

        } else {
            this.segments.pop();
        }
    }
    // метод проверки на столкновение
    collision(head) {
        let collision = false;

        if(head.col == -1 || head.col === widthInBlocks){
            collision = true;
        }
        if(head.row === -1 || head.row === heightInBlocks){
            collision = true;
        }

        for (let elem of this.segments) {
            if (head.equal(elem)) {
                collision = true;
            }
        }

        return collision;
    }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// класс яблоко
class Apple{
    constructor(){
        this.position = new Block(10, 10);
    }
    draw() {
        this.position.drawCircle("red");
    }
    // метод генерации координат проверки на столкновение, рекурсия
    move(occupiedBlocks) {
        let randomCol = getRandomNum(widthInBlocks);
        let randomRow = getRandomNum(heightInBlocks);

        this.position = new Block(randomCol, randomRow);

        for (let elem of occupiedBlocks) {
            if (this.position.equal(elem)) {
                this.move(occupiedBlocks);
                return;
            }
        }
    }
}
