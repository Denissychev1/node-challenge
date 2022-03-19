import {Expenses} from "./expenses.type";


export class Page{
    pageNumber: string;
    pageCount: string;
    data: Expenses[];
    totalCount: number
}
export enum QueryType{
    countType='countType',
    query = 'query'
}