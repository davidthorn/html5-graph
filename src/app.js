class GridObject {

    constructor(width, height , marginX = 10 , marginY = 10)  {
        this.width = width;
        this.height = height;
        this.margin = {
            x: marginX,
            y: marginY
        }
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
        console.log(this.frame.marginY);
        this.line(this.frame.centerX() , this.frame.margin.y , this.frame.centerX() , this.frame.height - this.frame.margin.y); /// vertical line y axis
        this.line(this.frame.margin.x , this.frame.centerY() , this.frame.width - this.frame.margin.x, this.frame.centerY()); /// horizontal line x axis

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