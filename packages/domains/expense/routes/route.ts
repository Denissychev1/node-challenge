import {Router} from "express";
import {to} from "@nc/utils/async";
import {ApiError} from "@nc/utils/errors";
import {getExpenceInfo} from "../expense-service";

export const router = Router();
router.get('/get-user-expenses', async (req, res) => {
        const [error, result] = await to(getExpenceInfo(req.query?.userId.toString())).then();
        if (error) {
            return ApiError(error, error.status, 'An error occured while getting expenses')
        }
        if (!result) res.send([]);
        if (result) res.send(result)
    }
)