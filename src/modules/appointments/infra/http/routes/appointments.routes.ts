import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import AppointmentsController from '@modules/appointments/infra/http/controllers/AppointmentsController';

const appointmentsRouter = Router();
const appointmentsController = new AppointmentsController();

appointmentsRouter.use(ensureAuthenticated);

// appointmentsRouter.get('/', async (req, res) => {
// const appointmentsRepository = new AppointmentsRepository();
//   return res.json(await appointmentsRepository.find());
// });

appointmentsRouter.post('/', appointmentsController.create);

export default appointmentsRouter;
