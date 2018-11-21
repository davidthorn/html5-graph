import { GridPoint } from './graph.module'
import { GridMargin } from './GridMargin'

export class GridObject {

    centerXPos: number
    centerYPos: number
    width: number = 0
    height: number = 0
    margin: GridMargin
    x_axis_length: number
    y_axis_length: number
    x_increments: number = 1
    y_increments: number = 1 

    constructor(width: number, height: number, x_axis_length: number, y_axis_length: number,  x_increments: number, y_increments: number, marginX = 30, marginY = 30 ) {
        this.centerXPos = width / 2
        this.centerYPos = height / 2
        this.width = width - (marginX * 2 );
        this.height = height - (marginY * 2);
        this.margin = {
            x: marginX,
            y: marginY
        }
        this.x_axis_length = x_axis_length
        this.y_axis_length = y_axis_length
    }

    centerX() {   
        return this.width / 2;
    }

    centerY() {
        return this.height / 2;
    }

    getPoint(x: number, y: number ): GridPoint {
        let space_x = (this.width / 2) / this.x_axis_length
        let space_y = (this.height / 2) / this.y_axis_length
        let x_point = this.centerXPos + (x * space_x)
        let y_point = this.centerYPos + (y * space_y)
        return new GridPoint(x_point  , y_point)
    }

}