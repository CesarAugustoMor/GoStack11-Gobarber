import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import AppointmentsController from '@modules/appointments/infra/http/controllers/AppointmentsController';
import ProviderAppointmentsController from '@modules/appointments/infra/http/controllers/ProviderAppointmentsController';

const appointmentsRouter = Router();
const appointmentsController = new AppointmentsController();
const providerAppointmentsController = new ProviderAppointmentsController();

appointmentsRouter.use(ensureAuthenticated);

// appointmentsRouter.get('/', async (req, res) => {
// const appointmentsRepository = new AppointmentsRepository();
//   return res.json(await appointmentsRepository.find());
// });

appointmentsRouter.post('/', appointmentsController.create);
appointmentsRouter.get('/schedule', providerAppointmentsController.index);

export default appointmentsRouter;
