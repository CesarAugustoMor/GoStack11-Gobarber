import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

import UserProfileController from '@modules/users/infra/http/controllers/UserProfileController';

const usersProfileRouter = Router();
const usersProfileController = new UserProfileController();

usersProfileRouter.use(ensureAuthenticated);

usersProfileRouter.get('/', usersProfileController.show);
usersProfileRouter.put('/', usersProfileController.update);

export default usersProfileRouter;
