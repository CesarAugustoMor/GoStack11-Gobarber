import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListProviderDayAvailabiliryService from '@modules/appointments/services/ListProviderDayAvailabiliryService';

export default class ProviderDayAvailabiliryController {
  /**
   * index
   */
  public async index(req: Request, res: Response): Promise<Response> {
    const { provider_id } = req.params;
    const { month, year, day } = req.query;

    const listProviderAvailabiliry = container.resolve(
      ListProviderDayAvailabiliryService,
    );

    const providerAvailabiliry = await listProviderAvailabiliry.execute({
      provider_id,
      month: Number(month),
      year: Number(year),
      day: Number(day),
    });

    return res.json(providerAvailabiliry);
  }
}
