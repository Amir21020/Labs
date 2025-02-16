class Figure{
    #x;
    #y;
    constructor(x, y){
        this.#x = x;
        this.#y = y;
    }
    getSquare(){
        return undefined;
    }
    print() {
        console.log(`Площадь фигуры - ${this.getSquare()}`)
    }
}

class Circle extends Figure{
    #r;
    constructor(x, y, r){
        super(x, y)
        this.#r = r
    }
    getSquare(){
        return Math.PI * Math.pow(this.#r,2)
    }
}
class Rectangle extends Figure{
    #h;
    #w;
    constructor(x, y, h, w){
        super(x, y)
        this.#h = h
        this.#w = w
    }
    getSquare(){
        return this.#h * this.#w
    }
}

const circle = new Circle(0, 0, 5);
circle.print();

const rectangle = new Rectangle(0, 0, 10, 5);
rectangle.print();