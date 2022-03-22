import {Router} from "express";
import {to} from "@nc/utils/async";
import {ApiError} from "@nc/utils/errors";
import {getExpenceInfo} from "../services/expense-service";
import {transformQueryParams} from "../services/query-params-service";

export const router = Router();
router.get('/get-user-expenses',
    async (req, res, next) => {
        if (!req.query.userId) return next(new Error("no userId was provided"));
        try {
            const transformResult = transformQueryParams(req.query);
            const [error, result] = await to(getExpenceInfo(req.query?.userId.toString(), transformResult)).then();
            if (error) {
                return next(new ApiError(error, error.status, 'An error occured while getting expenses'))
            }
            if (!result) res.send([]);
            if (result) res.send(result)
        } catch (e) {
            return next(new ApiError(e, e.status,e.message))
        }
    }
)