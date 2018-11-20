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

    draw(xAxis, incrementsX = 1, yAxis, incrementsY = 1) {

        this.context.fillStyle = 'white';
        this.context.fillRect(0,0, this.frame.width , this.frame.height);
        this.drawXAxis(xAxis, incrementsX);
        this.drawYAxis(yAxis, incrementsY);
        
    }

    drawYAxisIncrement(pieces, increments, centerPos, lineYPosition , isNegative) {
        
        let space = ((this.frame.height  / 2) - this.frame.margin.y) / pieces ;

        for(let x = 1; x <= pieces; x++) {

            let lineY =  (lineYPosition * x); // same
            
            let isModulus = this.isIncrementModulus(x, increments); // same

            this.addLabel(isModulus, this.frame.centerX() - 30 , centerPos + lineY + 5, isNegative ? -x : x );

            let color = this.getColor(isModulus);

            this.line( this.frame.centerX() - 5 , centerPos + lineY  , this.frame.centerX() + 5  , centerPos + lineY , color);
         }
    }

    drawYAxis(yAxis, increments = 1) {
        
        this.line(this.frame.centerX() , this.frame.margin.y , this.frame.centerX() , this.frame.height - this.frame.margin.y); /// vertical line y axis
        
        const pieces = yAxis;

        let space = ((this.frame.height  / 2) - this.frame.margin.y) / pieces ;

        let centerPos = this.frame.height / 2;

        this.drawYAxisIncrement(pieces , increments , centerPos , -space , false);
        this.drawYAxisIncrement(pieces , increments , centerPos , space , true);

        // for(let x = 1; x <= pieces; x++) {

        //     let lineY =  (space * x);
            
        //     let isModulus = this.isIncrementModulus(x, increments);

        //     this.addLabel(isModulus, this.frame.centerX() - 30 , centerPos + (space * x) + 5, -x );

        //     let color = this.getColor(isModulus);

        //     this.line( this.frame.centerX() - 5 , centerPos + lineY  , this.frame.centerX() + 5  , centerPos + lineY , color);
        // }

    }

    drawXAxis(xAxis, increments = 1 ) {
        
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