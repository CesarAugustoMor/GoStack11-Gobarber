import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListProviderMonthAvailabiliryService from '@modules/appointments/services/ListProviderMonthAvailabiliryService';

export default class ProviderMonthAvailabiliryController {
  /**
   * index
   */
  public async index(req: Request, res: Response): Promise<Response> {
    const { provider_id } = req.params;
    const { month, year } = req.body;

    const listProviderAvailabiliry = container.resolve(
      ListProviderMonthAvailabiliryService,
    );

    const providerAvailabiliry = await listProviderAvailabiliry.execute({
      provider_id,
      month,
      year,
    });

    return res.json(providerAvailabiliry);
  }
}
