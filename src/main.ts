 import { GraphObject, GridObject, GridPoint } from './graph.module'

 let points: GridPoint[] = []

 const graphXSize = 6;
 const graphYSize = 6;
 const incrementsX = 1;
 const incrementsY = 1;

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

    points.push({
        x: -0.5,
        y: 0.5
    });

    points.push({
        x: 6,
        y: -3
    });

    points.push({
        x: 0,
        y: 1
    });

    points.push({
        x: 0,
        y: 2
    });

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