import {BadRequest, InternalError} from "@nc/utils/errors";
import {Expenses} from "./types/expenses.type";
import {to} from "@nc/utils/async";
import {getResultByQuery} from "./data/db-expenses";
import {getExpensesQuery} from "./helpers/query-helper";
import {Page, QueryType} from "./types/page.type";
import {Filter, MathOperation, Options} from "./types/option.type";
import {Sorting} from "./types/sort.type";

/**
 * Service describing logic for getting data from db
 * @param userId
 * @param options - options for filter/sort
 */
export async function getExpenceInfo(userId: string, options?: Options): Promise<Page> {
    if (!userId) throw BadRequest('No user id provided');
    let query = getExpensesQuery(QueryType.query, options || null);
    const [error, result] = await
        to(getResultByQuery<Expenses[]>(userId, query, QueryType.query));

    let countQuery = getExpensesQuery(QueryType.countType, options || null);
    const [countError, totalCount] = await
        to(getResultByQuery<number>(userId, countQuery, QueryType.countType));

    if (error || countError) throw InternalError
    (`An error occured while database fetch: ${error || countError}`);
    return {
        totalCount,
        data: result,
        pageCount: options?.pageCount || 1,
        pageNumber: options?.pageNumber || 1
    };
}

export function transformQueryParams(query) {
    const filter: Filter[] = [];
    filter.push({column: 'user_id', condition: MathOperation.EQ, value: query.userId});
    if (query?.filter) {
        var parsedFilter = JSON.parse(query.filter.toString());
        parsedFilter.forEach(x => {
            if (x.length !== 3) return Error('Invalid filter structure');
            filter.push({
                column: x[0],
                condition: Object.values(MathOperation).find(v => v === x[1]),
                value: x[2]
            });
        })
    }
    const sort: Sorting[] = [];
    if (query?.sort) {
        var parsedSort = JSON.parse(query.sort.toString());
        parsedSort.forEach(x => {
            if (x.length !== 2) return Error('Invalid sort structure');
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
