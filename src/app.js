class GridObject {

    constructor(width, height , marginX , marginY)  {
        this.width = width;
        this.height = height;
        this.marginX = marginX;
        this.marginY = marginY;
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
        this.context.fillStyle = 'beige';
        this.context.fillRect(0,0, this.frame.width , this.frame.height);
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