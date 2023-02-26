import { NextFunction, Request, Response, Router } from "express";
import { BasicValidationApproved } from '../helpers/Validate'
const router = Router();

router.get('/login', (req: Request, res: Response, next: NextFunction) => {

  if (!BasicValidationApproved(req)) { res.statusCode = 404; res.render('400/404'); return; };

  res.statusCode = 200;
  res.render('200/login');
});

router.post('/login', (req: Request, res: Response, next: NextFunction) => {

  if (!BasicValidationApproved(req)) { res.statusCode = 404; res.render('400/404'); return; };

  if (req.body.appPassphrase == "SuperSecretPassword") {  // TODO: This just compares the input to a hard-coded string. This is not secure.
    req.session.UsersName = 'User'; // The user's name

    res.statusCode = 200;
    res.redirect('/');
    return;

  } else {
    console.log(`Wrong passphrase: ${req.body.appPassphrase}`)

    res.statusCode = 403;
    res.redirect('/login');
    return;
  }

});

export default router;
