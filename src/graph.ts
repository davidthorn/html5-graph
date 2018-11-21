export type GridMargin = {
    x: number
    y: number
}

export enum GridAxisOption {
    x = 'x',
    y = 'y'
}

export type GridAxis = {
    axis: GridAxisOption.x | GridAxisOption.y
}

export enum GridIncrementColor {
    seperator = '#999999',
    increment = '#000000'

}