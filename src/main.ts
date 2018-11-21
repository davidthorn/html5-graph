 import { GraphObject, GridObject } from './graph.module'

 const graphXSize = 100;
 const graphYSize = 100;
 const incrementsX = 10;
 const incrementsY = 10;

 const _container = () => {
     return document.getElementById('box');
 }

 const _canvas = (): any => {
     return document.getElementById('c');
 }
 
 const graphFactory = (container: any, context: any) => {

     const width = container.getBoundingClientRect().width;
     const height = container.getBoundingClientRect().height;
     const grid = new GridObject(width, height);
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
     graph.draw(graphXSize, incrementsX, graphYSize, incrementsY);
 }

 window.onresize = () => {
     const context = _canvas().getContext('2d');
     const graph = redraw(_container(), context);
     graph.draw(graphXSize, incrementsX, graphYSize, incrementsY);
 }