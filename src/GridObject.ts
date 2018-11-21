import { GridMargin } from './GridMargin'

export class GridObject {

    width: number = 0
    height: number = 0
    margin: GridMargin

    constructor(width: number, height: number, marginX = 30, marginY = 30) {
        this.width = width - (marginX * 2 );
        this.height = height - (marginY * 2);
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