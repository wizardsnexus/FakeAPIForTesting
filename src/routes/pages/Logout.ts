import { NextFunction, Request, Response, Router } from "express";
import { BasicValidationApproved } from '../helpers/Validate'
const router = Router();

router.get('/logout', (req: Request, res: Response, next: NextFunction) => {

  if (!BasicValidationApproved(req)) { res.statusCode = 404; res.render('400/404'); return; };

  req.session.destroy(err => {
    if (err) console.error(err);
  });

  res.statusCode = 200;
  res.redirect('/');
});


export default router;
