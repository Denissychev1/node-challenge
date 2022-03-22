import {QueryType} from "../types/page.type";
import {query} from "@nc/utils/db";

/** Getting database data from query
 * @param userId - userID
 * @param queryString - query for selecting data
 * @param type - query type: data or data count
 */
export function getResultByQuery<T>(userId, queryString: string, type: QueryType): Promise<T> {
    return query(queryString)
        .then((response) =>
            type == QueryType.query ? response.rows : response.rows[0].count);
}