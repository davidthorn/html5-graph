import { GridObject, GridMargin, GridIncrementColor, GridAxisOption } from './graph.module'
import { GridAxis } from './graph';

export class GraphObject {

    context: any
    
    frame: GridObject

    incremetColor: GridIncrementColor = GridIncrementColor.increment

    separatorColor: GridIncrementColor = GridIncrementColor.seperator

    constructor(context: any, frame: GridObject) {
        this.context = context;
        this.frame = frame;
    }

    getColor(isModulus: boolean): GridIncrementColor  {
        return isModulus ? this.incremetColor : this.separatorColor;
    }

    redraw(frame: GridObject): void {
        this.frame = frame;
    }

    draw(numberOfXIncrements: number, incrementsX: number = 1, numberOfYIncrements: number, incrementsY: number = 1) {
        this.context.fillStyle = 'white';
        this.context.fillRect(0, 0, this.frame.width, this.frame.height);
        this.drawXAxis(numberOfXIncrements, incrementsX);
        this.drawYAxis(numberOfYIncrements, incrementsY);

    }

    drawYAxis(numberOfIncrements: number, increments: number = 1) {

        this.line(this.frame.centerX(), this.frame.margin.y, this.frame.centerX(), this.frame.height - this.frame.margin.y); /// vertical line y axis

        let space = ((this.frame.height / 2) - this.frame.margin.y) / numberOfIncrements;

        this.drawAxisIncrement(GridAxisOption.y, numberOfIncrements, increments, this.frame.height / 2, space, false)
        this.drawAxisIncrement(GridAxisOption.y, numberOfIncrements, increments, this.frame.height / 2, -space, true)
    }

    drawXAxis(numberOfIncrements: number, increments = 1) {

        this.line(this.frame.margin.x, this.frame.centerY(), this.frame.width - this.frame.margin.x, this.frame.centerY()); /// horizontal line x axis

        let space = ((this.frame.width / 2) - this.frame.margin.x) / numberOfIncrements;

        this.drawAxisIncrement(GridAxisOption.x, numberOfIncrements, increments, this.frame.width / 2, space, false)
        this.drawAxisIncrement(GridAxisOption.x, numberOfIncrements, increments, this.frame.width / 2, -space, true)
    }

    drawAxisIncrement(gridAxis: GridAxisOption, pieces: number, increments: number, centerPos: number, linePosition: number, isNegative: boolean) {

        for (let x = 1; x <= pieces; x++) {

            let line = (linePosition * x); // same

            let isModulus = this.isIncrementModulus(x, increments); // same
            let color = this.getColor(isModulus);

            switch (gridAxis) {
                case GridAxisOption.x:
                    this.addLabel(isModulus, centerPos + line, this.frame.centerY() + 20, String(isNegative ? -x : x));
                    this.line(centerPos + line, this.frame.centerY() - 5, centerPos + line, this.frame.centerY() + 5, color);
                    break;
                case GridAxisOption.y:
                    /// the isNegative needs to be negated because minus is positive and positive is minus
                    this.addLabel(isModulus, this.frame.centerX() - 30, centerPos + line + 5, String(!isNegative ? -x : x));
                    this.line(this.frame.centerX() - 5, centerPos + line, this.frame.centerX() + 5, centerPos + line, color);
                    break;
                default: break;
            }

        }
    }

    isIncrementModulus(increment: number, increments: number): boolean {
        return increment % increments === 0;
    }

    addLabel(isModulus: boolean, x: number, y: number, labelText: string): void{
        if (isModulus) {
            this.text(x, y, labelText);
        }
    }

    text(x: number, y: number, textString: string): void {
        this.context.font = "1em Arial";
        this.context.textAlign = "center";
        this.context.strokeStyle = 'black';
        this.context.strokeText(textString, x, y);
    }

    line(startX: number, startY: number, endX: number, endY: number, color = '#000000'): void {
        this.context.beginPath();
        this.context.strokeStyle = color;
        this.context.moveTo(startX, startY);
        this.context.lineTo(endX, endY);
        this.context.stroke();
        this.context.closePath();
    }

    plotPositionAt(x: number , y: number): void {

    }

}