import { NextFunction, Request, Response, Router } from "express";
import { BasicValidationApproved, IsLoggedIn } from '../helpers/Validate'
const router = Router();

router.get('/', (req: Request, res: Response, next: NextFunction) => {

    console.log(`You were visited`)

    res.statusCode = 200;
    res.send("Yo");
});

export default router;
