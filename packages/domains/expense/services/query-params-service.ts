import {Filter, MathOperation} from "../types/option.type";
import {Sorting, SortType} from "../types/sort.type";
import { BadRequest} from "@nc/utils/errors";

export function transformQueryParams(query) {
    const filter: Filter[] = [];
    filter.push({column: 'user_id', condition: MathOperation.EQ, value: query.userId});
    if (query?.filter) {
        let parsedFilter = JSON.parse(query.filter.toString());
        parsedFilter.forEach(x => {
            if (x.length !== 3) return BadRequest('Invalid filter structure. It has to be like [["columnName","operation", "value"]]');
            let mathOperation =  Object.values(MathOperation).find(v => v === x[1]);
            if (!mathOperation) throw BadRequest(`Invalid math operation! Allowed operations are ${Object.values(MathOperation)}`)
            filter.push({
                column: x[0],
                condition: mathOperation,
                value: x[2]
            });
        })
    }
    const sort: Sorting[] = [];
    if (query?.sort) {
        var parsedSort = JSON.parse(query.sort.toString());
        parsedSort.forEach(x => {
            if (x.length !== 2) throw BadRequest('Invalid sort structure. It has to be like [["column", "asc/desc"]]');
            let ordering =  Object.values(SortType).find(t => t === x[1]);
            if (!ordering) throw BadRequest(`Invalid order type! Allowed type are ${Object.values(SortType)}`)

            sort.push({
                column: x[0],
                sortType: x[1],
            });
        })

    }
    return {
        pageCount: query?.pageCount || 10,
        pageNumber: query?.page || 1,
        sorting: sort,
        filtering: filter
    };

}
