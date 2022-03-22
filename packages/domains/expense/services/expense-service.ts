import {BadRequest, InternalError} from "@nc/utils/errors";
import {Expenses} from "../types/expenses.type";
import {to} from "@nc/utils/async";
import {getResultByQuery} from "../data/db-expenses";
import {getExpensesQuery} from "../helpers/query-helper";
import {Page, QueryType} from "../types/page.type";
import {Options} from "../types/option.type";

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

