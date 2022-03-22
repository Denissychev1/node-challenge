import {Sorting} from "./sort.type";

export class Options {
    sorting: Sorting[]
    filtering: Filter[]
    pageNumber: number
    pageCount: number
}

export class Filter {
    column: string
    condition: MathOperation
    value: string
}

export enum MathOperation {
    EQ = '=',
    GR = '>',
    LS = '<',
    GROREQ = '>=',
    LSOREQ = '<=',
    LIKE = 'like'
}