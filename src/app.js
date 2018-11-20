class GridObject {

    constructor(width, height)  {
        this.width = width;
        this.height = height;
    }

    centerX() {
        return this.width / 2;
    }
    
    centerY() {
        return this.height / 2;
    }

}

class GraphObject {

    constructor(context, frame) {
        this.context = context;
        this.frame = frame;
    }

    redraw(frame) {
        this.frame = frame;
    }

    draw() {
        // this.context.beginPath();
        // this.context.fillStyle = 'black';
        // this.context.moveTo(this.frame.centerX(), 0);
        // this.context.lineTo(this.frame.centerX() , this.frame.height);
        // this.context.stroke();
        // this.context.closePath();
        this.line(this.frame.centerX() , 0 , this.frame.centerX() , this.frame.height);
        this.line(0 , this.frame.centerY() , this.frame.width , this.frame.centerY());
    }

    line(startX, startY , endX, endY) {
        this.context.beginPath();
        this.context.fillStyle = 'black';
        this.context.moveTo(startX, startY);
        this.context.lineTo(endX , endY);
        this.context.stroke();
        this.context.closePath();
    }
    

}