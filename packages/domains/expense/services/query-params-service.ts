import {Filter, MathOperation} from "../types/option.type";
import {Sorting} from "../types/sort.type";
import {getExpensesColumns} from "../data/db-expenses";
import {to} from "@nc/utils/async";
import {ApiError, BadRequest} from "@nc/utils/errors";

export async function transformQueryParams(query) {
    const filter: Filter[] = [];
    const [error, expensesColumns] = await to(getExpensesColumns());
    if (error) throw new ApiError(error);
    filter.push({column: 'user_id', condition: MathOperation.EQ, value: query.userId});
    if (query?.filter) {
        let parsedFilter = JSON.parse(query.filter.toString());
        parsedFilter.forEach(x => {
            if (x.length !== 3) throw BadRequest('Invalid filter structure');
            if (!expensesColumns.map(x => x.columnName).includes(x[0])) throw BadRequest(`There is no column ${x[0]} in expenses table`);
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
            if (x.length !== 2) throw BadRequest('Invalid sort structure');
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
