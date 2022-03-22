import {Router} from "express";
import {to} from "@nc/utils/async";
import {ApiError} from "@nc/utils/errors";
import {getExpenceInfo} from "../services/expense-service";
import {transformQueryParams} from "../services/query-params-service";

export const router = Router();
router.get('/get-user-expenses',
    async (req, res, next) => {
        if (!req.query.userId) return Error("no userId was provided");
        var [transformError, transformResult] = await to(transformQueryParams(req.query));
        if (transformError) return next(new ApiError(transformError, transformError.status));
        const [error, result] = await to(getExpenceInfo(req.query?.userId.toString(), transformResult)).then();
        if (error) {
            return next(new ApiError(error, error.status, 'An error occured while getting expenses'))
        }
        if (!result) res.send([]);
        if (result) res.send(result)
    }
)