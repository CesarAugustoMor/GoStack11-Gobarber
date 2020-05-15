import { Router } from 'express';

import ForgotPasswordController from '@modules/users/infra/http/controllers/ForgotPasswordController';
import ResetForgotPasswordController from '@modules/users/infra/http/controllers/ResetForgotPasswordController';

const passwordRouter = Router();
const forgotPasswordController = new ForgotPasswordController();
const restForgotPasswordController = new ResetForgotPasswordController();

passwordRouter.post('/forgot', forgotPasswordController.create);
passwordRouter.post('/reset', restForgotPasswordController.create);

export default passwordRouter;
