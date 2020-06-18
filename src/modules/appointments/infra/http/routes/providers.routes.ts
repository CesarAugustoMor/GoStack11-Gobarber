import ProviderDayAvailabiliryController from '@modules/appointments/infra/http/controllers/ProviderDayAvailabiliryController';
import ProviderMonthAvailabiliryController from '@modules/appointments/infra/http/controllers/ProviderMonthAvailabiliryController';
import ProvidersController from '@modules/appointments/infra/http/controllers/ProvidersController';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';

const providersRouter = Router();
const providersController = new ProvidersController();
const providerMonthAvailabiliryController = new ProviderMonthAvailabiliryController();
const providerDayAvailabiliryController = new ProviderDayAvailabiliryController();

providersRouter.use(ensureAuthenticated);

providersRouter.get('/', providersController.index);
providersRouter.get(
  '/:provider_id/month-availability',
  celebrate({
    [Segments.PARAMS]: {
      provider_id: Joi.string().required().uuid(),
    },
  }),
  providerMonthAvailabiliryController.index,
);
providersRouter.get(
  '/:provider_id/day-availability',
  celebrate({
    [Segments.PARAMS]: {
      provider_id: Joi.string().required().uuid(),
    },
  }),
  providerDayAvailabiliryController.index,
);

export default providersRouter;
