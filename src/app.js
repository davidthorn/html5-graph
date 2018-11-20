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
        this.incremetColor = '#000000';
        this.separatorColor = '#999999';
    }

    getColor(isModulus) {
        return isModulus ? this.incremetColor : this.separatorColor;
    }

    redraw(frame) {
        this.frame = frame;
    }

    draw(xAxis, increments = 1) {

        this.context.fillStyle = 'white';
        this.context.fillRect(0,0, this.frame.width , this.frame.height);
        this.line(this.frame.centerX() , this.frame.margin.y , this.frame.centerX() , this.frame.height - this.frame.margin.y); /// vertical line y axis
        this.line(this.frame.margin.x , this.frame.centerY() , this.frame.width - this.frame.margin.x, this.frame.centerY()); /// horizontal line x axis
        
        const pieces = xAxis;

        let space = ((this.frame.width  / 2) - this.frame.margin.x) / pieces ;

        for(let x = pieces; x >=  0; x--) {

            let lineX =  (space * x) + 10;
            
            let isModulus = this.isIncrementModulus(x, increments);

            this.addLabel(isModulus, (space * (pieces - x) ) + 10, this.frame.centerY() + 20  , -x );

            let color = this.getColor(isModulus);

            this.line( lineX , this.frame.centerY() - 5, lineX , this.frame.centerY() + 5, color);
         }

         for(let x = 1; x <= pieces; x++) {

            let bufferLeft = this.frame.width / 2; 
            let lineX =  (space * x) + bufferLeft;

            let isModulus = this.isIncrementModulus(x, increments);
            
            this.addLabel(isModulus, bufferLeft + (x * space), this.frame.centerY() + 20  , x );

            let color = this.getColor(isModulus);
            this.line( lineX , this.frame.centerY() - 5, lineX , this.frame.centerY() + 5, color);
             
         }
        
    }

    isIncrementModulus(increment, increments) {
        return increment % increments === 0;
    }

    addLabel(isModulus , x, y , labelText) {
        if ( isModulus ) {
            this.text( x, y , labelText);
        }
    }

    text(x, y , textString) {
        this.context.font = "1em Arial";
        //this.context.lineWidth = 3;
        this.context.textAlign = "center";
        this.context.strokeStyle = 'black';
        this.context.strokeText(textString , x, y);
    }

    line(startX, startY , endX, endY, color = '#000000') {
        this.context.beginPath();
        this.context.strokeStyle =  color;
        this.context.moveTo(startX, startY);
        this.context.lineTo(endX , endY);
        this.context.stroke();
        this.context.closePath();
    }
    

}