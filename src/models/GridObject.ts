import { GridPoint } from './GridPoint'

export class GridObject implements GridType {
    bounds: DOMRect
    centerXPos: number
    centerYPos: number
    width: number = 0
    height: number = 0
    margin: GridMargin
    x_axis_length: number
    y_axis_length: number
    x_increments: number = 1
    y_increments: number = 1 


    constructor(bounds: DOMRect, x_axis_length: number, y_axis_length: number,  x_increments: number, y_increments: number, marginX = 30, marginY = 30 ) {
        this.bounds = bounds
        this.centerXPos = bounds.width / 2
        this.centerYPos = bounds.height / 2
        this.x_increments  = x_increments
        this.y_increments = y_increments
        this.width = bounds.width - (marginX * 2 );
        this.height = bounds.height - (marginY * 2);
        this.margin = {
            x: marginX,
            y: marginY
        }
        this.x_axis_length = x_axis_length
        this.y_axis_length = y_axis_length
    }
    
    redraw(bounds: DOMRect): void {
        this.width = bounds.width - (this.margin.x * 2 );
        this.height = bounds.height - (this.margin.y * 2);
        this.centerXPos = bounds.width / 2
        this.centerYPos = bounds.height / 2
    }

    centerX(): number {   
        return this.width / 2;
    }

    centerY(): number {
        return this.height / 2;
    }

    getPoint(x: number, y: number ): GraphGridPoint {
        let space_x = (this.width / 2) / this.x_axis_length
        let space_y = (this.height / 2) / this.y_axis_length
        let x_point = this.centerXPos + (x * space_x)
        let y_point = this.centerYPos + (-y * space_y)
        return new GridPoint(x_point  , y_point)
    }

    setAxis(x: number , y: number ): void {
        this.x_axis_length  = x
        this.y_axis_length = y
        this.setAxisIncrements(x, y)
    }

    setAxisIncrements(x: number , y: number ): void {
        this.x_increments  = x
        this.y_increments = y
    }

}