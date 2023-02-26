import { NextFunction, Request, Response, Router } from "express";
const router = Router();

router.all('*', (req: Request, res: Response, next: NextFunction) => {
    res.statusCode = 404;
    res.render('400/404');
});

export default router;
