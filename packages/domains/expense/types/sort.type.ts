export enum SortType {
    ASC = 'asc',
    DESC = 'desc'
}

export class Sorting {
    public column: string
    public sortType: SortType
}