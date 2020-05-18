import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListProviderService from '@modules/appointments/services/ListProviderService';

export default class ProvidersController {
  /**
   * index
   */
  public async index(req: Request, res: Response): Promise<Response> {
    const user_id = req.user.id;

    const listProvider = container.resolve(ListProviderService);

    const providers = await listProvider.execute({
      user_id,
    });

    providers.forEach(provider => {
      // eslint-disable-next-line no-param-reassign
      delete provider.password;
    });

    return res.json(providers);
  }
}
