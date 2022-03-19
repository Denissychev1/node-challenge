import {Router} from "express";
import {to} from "@nc/utils/async";
import {ApiError} from "@nc/utils/errors";
import {getExpenceInfo, transformQueryParams} from "../expense-service";

export const router = Router();
router.get('/get-user-expenses',
    async (req, res) => {
    if (!req.query.userId) return Error("no userId was provided");
        var options = transformQueryParams(req.query);
        const [error, result] = await to(getExpenceInfo(req.query?.userId.toString(), options)).then();
        if (error) {
            return ApiError(error, error.status, 'An error occured while getting expenses')
        }
        if (!result) res.send([]);
        if (result) res.send(result)
    }
)