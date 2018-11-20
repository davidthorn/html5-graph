class GridObject {

    constructor(width, height, marginX = 10, marginY = 10) {
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
        this.context.fillRect(0, 0, this.frame.width, this.frame.height);
        this.drawXAxis(xAxis, incrementsX);
        this.drawYAxis(yAxis, incrementsY);

    }

    drawYAxis(yAxis, increments = 1) {

        this.line(this.frame.centerX(), this.frame.margin.y, this.frame.centerX(), this.frame.height - this.frame.margin.y); /// vertical line y axis

        let space = ((this.frame.height / 2) - this.frame.margin.y) / yAxis;

        this.drawAxisIncrement('y', yAxis, increments, this.frame.height / 2, space, false)
        this.drawAxisIncrement('y', yAxis, increments, this.frame.height / 2, -space, true)
    }

    drawXAxis(xAxis, increments = 1) {

        this.line(this.frame.margin.x, this.frame.centerY(), this.frame.width - this.frame.margin.x, this.frame.centerY()); /// horizontal line x axis

        let space = ((this.frame.width / 2) - this.frame.margin.x) / xAxis;

        this.drawAxisIncrement('x', xAxis, increments, this.frame.width / 2, space, false)
        this.drawAxisIncrement('x', xAxis, increments, this.frame.width / 2, -space, true)
    }

    drawAxisIncrement(axis, pieces, increments, centerPos, linePosition, isNegative) {

        for (let x = 1; x <= pieces; x++) {

            let line = (linePosition * x); // same

            let isModulus = this.isIncrementModulus(x, increments); // same
            let color = this.getColor(isModulus);

            switch (axis) {
                case 'x':
                    this.addLabel(isModulus, centerPos + line, this.frame.centerY() + 20, isNegative ? -x : x);
                    this.line(centerPos + line, this.frame.centerY() - 5, centerPos + line, this.frame.centerY() + 5, color);
                    break;
                case 'y':
                    /// the isNegative needs to be negated because minus is positive and positive is minus
                    this.addLabel(isModulus, this.frame.centerX() - 30, centerPos + line + 5, !isNegative ? -x : x);
                    this.line(this.frame.centerX() - 5, centerPos + line, this.frame.centerX() + 5, centerPos + line, color);
                    break;
                default: break;
            }

        }
    }

    isIncrementModulus(increment, increments) {
        return increment % increments === 0;
    }

    addLabel(isModulus, x, y, labelText) {
        if (isModulus) {
            this.text(x, y, labelText);
        }
    }

    text(x, y, textString) {
        this.context.font = "1em Arial";
        this.context.textAlign = "center";
        this.context.strokeStyle = 'black';
        this.context.strokeText(textString, x, y);
    }

    line(startX, startY, endX, endY, color = '#000000') {
        this.context.beginPath();
        this.context.strokeStyle = color;
        this.context.moveTo(startX, startY);
        this.context.lineTo(endX, endY);
        this.context.stroke();
        this.context.closePath();
    }

}