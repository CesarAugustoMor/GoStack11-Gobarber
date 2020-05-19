import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListProviderAppointmentsService from '@modules/appointments/services/ListProviderAppointmentsService';

export default class ProviderAppointmentsController {
  /**
   * index
   */
  public async index(req: Request, res: Response): Promise<Response> {
    const provider_id = req.user.id;
    const { month, year, day } = req.body;

    const listProviderAppointments = container.resolve(
      ListProviderAppointmentsService,
    );

    const appointments = await listProviderAppointments.execute({
      provider_id,
      month,
      year,
      day,
    });

    return res.json(appointments);
  }
}
