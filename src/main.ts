 import { GraphObject, GridObject, GridPoint } from './models/graph.module'

 let points: GridPoint[] = []

 const graphXSize = 4;
 const graphYSize = graphXSize * graphXSize;
 const incrementsX = 2;
 const incrementsY = 4;

 const _container = () => {
     return document.getElementById('box');
 }
 const graphFactory = (container: HTMLElement ) => {
     const grid = new GridObject(container.getBoundingClientRect() as DOMRect, graphXSize , graphYSize, incrementsX , incrementsY);
     window.graph = new GraphObject(container, grid);
     return window.graph;
 }
   
Window.prototype.createGridPoint = (x: number, y: number): GraphGridPoint => {
    return new GridPoint(x, y)
}

 window.onload = () => {
     Window.prototype.graph = graphFactory(_container() as HTMLElement)
     window.graph.draw();
     window.graph.drawPoints(points);
 }

 window.onresize = () => {
     window.graph.redraw()
     window.graph.drawPoints(points);
 }