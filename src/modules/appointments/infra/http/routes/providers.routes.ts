import { Router } from 'express';

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
  providerMonthAvailabiliryController.index,
);
providersRouter.get(
  '/:provider_id/day-availabiliry',
  providerDayAvailabiliryController.index,
);

export default providersRouter;
