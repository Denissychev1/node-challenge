import {SortType} from "../types/sort.type";
import {Options} from "../types/option.type";
import {QueryType} from "../types/page.type";

/**
 * Method for getting query for expenses
 * @param type
 * @param params - options used for query (filter, sort)
 */
export function getExpensesQuery(type: QueryType, params?: Options): string {
    let baseQuery: string = (
        type === QueryType.query ?
            'SELECT e.id, e.merchant_name, e.amount_in_cents, e.currency, e.date_created, e.status ' +
            'FROM expenses e JOIN users u ON e.user_id = u.id ' +
            'addWhere addOrder addPaging' :
            'SELECT count(*) FROM expenses e ' +
            'JOIN users u ON e.user_id = u.id ' +
            'addWhere');
    return transformQuery(baseQuery, params);
}

/**
 * Method for making query with options
 * @param query - base query
 * @param options - options for query
 * @return transformedQuery - query with options
 */

function transformQuery(query: string, options: Options) {
    var transformedQuery = query
    if (options.sorting.length > 0)
        transformedQuery = query.replace(
            'addOrder',
            options.sorting[0].column ?
                `order by ${options.sorting[0].column} ${options.sorting[0].sortType || SortType.ASC}`
                : '')
    if (options.filtering.length > 0) {
        var filter = 'where ';
        options.filtering.forEach(x => {
            options.filtering.map(y => y.column).indexOf(x.column) === 0 ?
                (filter = filter + x.column + ' ' + x.condition + ' ' + `'${x.value}'`) :
                (filter = filter + ' and ' + x.column + ' ' + x.condition + ' ' + `'${x.value}'`)
        })
        transformedQuery = transformedQuery.replace('addWhere', filter);
    }
    if (options.pageCount || options.pageNumber) {
        let skip = ((options.pageNumber - 1) || 0) * (options.pageCount || 10);
        transformedQuery = transformedQuery
            .replace('addPaging',
                `offset ${skip} limit ${options.pageCount}`)
    }
    return transformedQuery.replace('addWhere', '')
        .replace('addPaging', '')
        .replace('addOrder', '')
}