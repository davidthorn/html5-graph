
type GridMargin = {
    x: number
    y: number
}

interface GridType {
    centerXPos: number
    centerYPos: number
    width: number
    height: number
    margin: GridMargin
    x_axis_length: number
    y_axis_length: number
    x_increments: number
    y_increments: number
    bounds: DOMRect
    redraw(bounds: DOMRect): void 
    getPoint(x: number, y: number ): GraphGridPoint 
    setAxis(x: number, y: number): void 
    setAxisIncrements(x: number , y: number ): void 
}

interface GraphGridPoint {
    x: number
    y: number
}

interface Graph {
    frame: GridType
    drawSquareCurve(square: number, shouldRedraw: boolean): void 
    // drawCurve(from: GraphGridPoint , to: GraphGridPoint): void 
    drawPoints(points: GraphGridPoint[]): void
    draw(): void
    redraw(): void
    setAxis(x: number, y: number, redraw: boolean): void 
    setAxisIncrements(x: number , y: number, redraw: boolean ): void 
}

interface Window {
    graph: Graph
    createGridPoint(x: number, y: number): GraphGridPoint
}
