import { GridObject, GridPoint, GridColor, GridAxisOption } from './graph.module'

export class GraphObject implements Graph {

    container: HTMLElement

    canvas: HTMLCanvasElement

    context: any
    
    frame: GridType

    incremetColor: GridColor = GridColor.increment

    separatorColor: GridColor = GridColor.seperator

    constructor(container: HTMLElement , frame: GridType) {
        this.container = container
        this.canvas = document.createElement('canvas') as HTMLCanvasElement
        this.canvas.setAttribute('id' , 'html5-graph')
        this.canvas.setAttribute('class' , 'html5-canvas')
        this.container.appendChild(this.canvas)
        this.canvas.width = this.container.getBoundingClientRect().width
        this.canvas.height = this.container.getBoundingClientRect().height
        this.context = this.canvas.getContext('2d') as CanvasRenderingContext2D;
        this.frame = frame;
    }

    getColor(isModulus: boolean): GridColor  {
        return isModulus ? this.incremetColor : this.separatorColor;
    }

    redraw(): void {
        this.frame.redraw(this.container.getBoundingClientRect() as DOMRect)
        this.draw()
    }

    draw() {
        this.context.fillStyle = 'white';
        this.context.fillRect(0, 0, this.frame.centerXPos * 2, this.frame.centerYPos * 2);
        this.drawXAxis(this.frame.x_axis_length, this.frame.x_increments);
        this.drawYAxis(this.frame.y_axis_length, this.frame.y_increments);
    }

    drawYAxis(numberOfIncrements: number, increments: number = 1) {

        this.line(this.frame.centerXPos, this.frame.margin.y, this.frame.centerXPos, this.frame.height + this.frame.margin.y); /// vertical line y axis
   
        let space = ((this.frame.height / 2)) / numberOfIncrements;

        this.drawAxisIncrement(GridAxisOption.y, numberOfIncrements, increments, this.frame.centerYPos, space, false)
        this.drawAxisIncrement(GridAxisOption.y, numberOfIncrements, increments, this.frame.centerYPos, -space, true)
    }

    drawXAxis(numberOfIncrements: number, increments = 1) {

        this.line(this.frame.margin.x, this.frame.centerYPos, this.frame.width + this.frame.margin.x, this.frame.centerYPos); /// horizontal line x axis

        let space = ((this.frame.width / 2) ) / numberOfIncrements;

        this.drawAxisIncrement(GridAxisOption.x, numberOfIncrements, increments, this.frame.centerXPos, space, false)
        this.drawAxisIncrement(GridAxisOption.x, numberOfIncrements, increments, this.frame.centerXPos, -space, true)
    }

    drawAxisIncrement(gridAxis: GridAxisOption, pieces: number, increments: number, centerPos: number, linePosition: number, isNegative: boolean) {

        for (let x = 1; x <= pieces; x++) {

            let line = (linePosition * x); // same
            
            let isModulus = this.isIncrementModulus(x, increments); // same
            let color = this.getColor(isModulus);
            switch (gridAxis) {
                case GridAxisOption.x:
                    this.addLabel(isModulus, centerPos + line, this.frame.centerYPos + 25, String(isNegative ? -x : x));
                    this.line(centerPos + line, this.frame.centerYPos + 0, centerPos + line, this.frame.centerYPos + 5, color);
                    break;
                case GridAxisOption.y:
                    /// the isNegative needs to be negated because minus is positive and positive is minus
                    this.addLabel(isModulus, this.frame.centerXPos - 30, centerPos + line + 5, String(!isNegative ? -x : x));
                    this.line(this.frame.centerXPos - 5, centerPos + line, this.frame.centerXPos + 5, centerPos + line, color);
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
        const point: GridPoint = this.frame.getPoint(x, y)
        this.context.beginPath();
        this.context.fillStyle = "red";
        this.context.arc(point.x , point.y , 6, 0 , 2*Math.PI)
        this.context.fill()
        this.context.closePath();
    }

    drawPoints(points: GraphGridPoint[]): void {
        points.forEach(point => {
            this.plotPositionAt(point.x ,  point.y)
        })

       // this.drawCurve(new GridPoint(0, 0), new GridPoint(-4 , 4))
       // this.drawCurve(new GridPoint(0, 0), new GridPoint(4 , 4))

       // this.drawCurve(new GridPoint(0, 0), new GridPoint(-4 , -4))
       // this.drawCurve(new GridPoint(0, 0), new GridPoint(4 , -4))

        
        
        
    }

    drawCurve(from: GraphGridPoint , to: GraphGridPoint): void {
        const fromPoint: GraphGridPoint = this.frame.getPoint(from.x, from.y)
        const midPoint: GraphGridPoint = this.frame.getPoint(to.x, from.y)
        const toPoint: GraphGridPoint = this.frame.getPoint(to.x, to.y)
        this.context.beginPath();
        this.context.moveTo(fromPoint.x , fromPoint.y)
        this.context.strokeStyle = 'black'
        this.context.quadraticCurveTo(midPoint.x , midPoint.y , toPoint.x , toPoint.y)
        this.context.stroke()
        this.context.closePath();
    }

    drawSquareCurve(square: number, shouldRedraw: boolean = true): void {
        
        if(shouldRedraw) {
            this.frame.setAxis(square , square * square)
            this.frame.setAxisIncrements(square % 2 === 0 ? 2 : 1 , square)
            this.redraw()
        }

        let absValue = Math.abs(square)
        let start = this.frame.getPoint(0, 0)
        let startPos = this.frame.getPoint(0, 0)

        for(let x = 0; x <= absValue; x += 0.001) {
            let y = square < 0 ? -(x * x) : x * x 
            let newPointNeg = this.frame.getPoint(-x , y)
            this.line(start.x , start.y , newPointNeg.x , newPointNeg.y)
            let newPointPos = this.frame.getPoint(x , y)
            this.line(startPos.x , startPos.y , newPointPos.x , newPointPos.y)
            start = newPointNeg
            startPos = newPointPos
        }

        if(square < 0) return
        this.drawSquareCurve(-square, false)
        
    }

    setAxis(x: number , y: number, redraw: boolean = false ): void {
        this.frame.setAxis(x, y)
        if(!redraw) return
        this.redraw()
    }

    setAxisIncrements(x: number , y: number , redraw: boolean = false): void {
        this.frame.setAxisIncrements(x, y)
        if(!redraw) return
        this.redraw()
    }
}