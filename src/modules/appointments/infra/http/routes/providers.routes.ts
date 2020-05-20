import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import ProvidersController from '@modules/appointments/infra/http/controllers/ProvidersController';
import ProviderMonthAvailabiliryController from '@modules/appointments/infra/http/controllers/ProviderMonthAvailabiliryController';
import ProviderDayAvailabiliryController from '@modules/appointments/infra/http/controllers/ProviderDayAvailabiliryController';

const providersRouter = Router();
const providersController = new ProvidersController();
const providerMonthAvailabiliryController = new ProviderMonthAvailabiliryController();
const providerDayAvailabiliryController = new ProviderDayAvailabiliryController();

providersRouter.use(ensureAuthenticated);

providersRouter.get('/', providersController.index);
providersRouter.get(
  '/:provider_id/month-availabiliry',
  celebrate({
    [Segments.PARAMS]: {
      provider_id: Joi.string().required().uuid(),
    },
  }),
  providerMonthAvailabiliryController.index,
);
providersRouter.get(
  '/:provider_id/day-availabiliry',
  celebrate({
    [Segments.PARAMS]: {
      provider_id: Joi.string().required().uuid(),
    },
  }),
  providerDayAvailabiliryController.index,
);

export default providersRouter;
