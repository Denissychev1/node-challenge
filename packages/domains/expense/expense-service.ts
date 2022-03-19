import {BadRequest, InternalError} from "@nc/utils/errors";
import {Expenses} from "./type";
import {to} from "@nc/utils/async";
import {getExpensesByUserId} from "./data/db-expenses";

export async function getExpenceInfo(userId: string, page: number = 0, count: number = 10): Promise<Expenses> {
    if (!userId) throw BadRequest('No user id provided');
    let skip = page*count;
    const [error, result] = await to(getExpensesByUserId(userId, skip, count));
    if (error) throw InternalError(`An error occured while database fetch: ${error}`)
    return result;
}