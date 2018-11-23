export enum GridAxisOption {
    x = 'x',
    y = 'y'
}

export enum GridColor  {
    seperator = '#999999',
    increment = '#000000' 
}

export type GridAxis = {
    axis: GridAxisOption.x | GridAxisOption.y
}