import {query} from "@nc/utils/db";

export function getExpensesByUserId(userId: string, skip: number = 0, take: number=10) {
    return query('SELECT e.id, e.merchant_name, e.currency, e.date_created, e.status FROM expenses e JOIN users u ON e.user_id = u.id WHERE user_id = $1 order by e.date_created offset $2 limit $3 ',
        [userId, skip, take])
        .then((response) => response.rows);
}