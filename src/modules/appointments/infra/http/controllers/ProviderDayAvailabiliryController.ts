import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListProviderDayAvailabiliryService from '@modules/appointments/services/ListProviderDayAvailabiliryService';

export default class ProviderDayAvailabiliryController {
  /**
   * index
   */
  public async index(req: Request, res: Response): Promise<Response> {
    const { provider_id } = req.params;
    const { month, year, day } = req.body;

    const listProviderAvailabiliry = container.resolve(
      ListProviderDayAvailabiliryService,
    );

    const providerAvailabiliry = await listProviderAvailabiliry.execute({
      provider_id,
      month,
      year,
      day,
    });

    return res.json(providerAvailabiliry);
  }
}
