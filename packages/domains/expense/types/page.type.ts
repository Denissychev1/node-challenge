import {Expenses} from "./expenses.type";


export class Page{
    pageNumber: number;
    pageCount: number;
    data: Expenses[];
    totalCount: number
}
export enum QueryType{
    countType='countType',
    query = 'query'
}