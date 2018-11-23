 import { GraphObject, GridObject, GridPoint } from './models/graph.module'

 let points: GridPoint[] = []

 const graphXSize = 4;
 const graphYSize = graphXSize * graphXSize;
 const incrementsX = 2;
 const incrementsY = 4;

 const _container = () => {
     return document.getElementById('box');
 }

 const _canvas = (): any => {
     return document.getElementById('html5-graph');
 }
 
 const graphFactory = (container: any, context: any) => {

     const width = container.getBoundingClientRect().width;
     const height = container.getBoundingClientRect().height;
     const grid = new GridObject(width, height, graphXSize , graphYSize, incrementsX , incrementsY);
     const graph = new GraphObject(context,grid);
     _canvas().width = width;
     _canvas().height = height;
     return graph;
 }
   
 const redraw = (container: any, context: any) => {
     const graph = graphFactory(container,context);
     graph.redraw(graph.frame);
     return graph;
 }

 window.onload = () => {
     const graph = redraw(_container(), _canvas().getContext('2d'));
     graph.draw();
     graph.drawPoints(points);
 }

 window.onresize = () => {
     const context = _canvas().getContext('2d');
     const graph = redraw(_container(), context);
     graph.draw();
     graph.drawPoints(points);
 }