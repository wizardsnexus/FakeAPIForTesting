import { NextFunction, Request, Response, Router } from "express";
import { BasicValidationApproved, IsLoggedIn } from '../helpers/Validate'
const router = Router();

router.get('/', (req: Request, res: Response, next: NextFunction) => {

    if (!BasicValidationApproved(req)) {res.statusCode = 404; res.render('400/404'); return;};
    if (!IsLoggedIn(req)) {res.redirect('/login'); return;};


    console.log(`You are ${req.session.UsersName}`)

    res.statusCode = 200;
    res.render('200/index');
});

export default router;
