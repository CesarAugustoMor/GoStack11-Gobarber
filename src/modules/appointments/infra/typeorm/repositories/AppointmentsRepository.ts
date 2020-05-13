import { EntityRepository, Repository } from 'typeorm';

import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';

import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';

@EntityRepository(Appointment)
export default class AppointmentsRepository extends Repository<Appointment>
  implements IAppointmentsRepository {
  /**
   * Procura se a data já está cadastrada.
   * @param date Data a ser procurada
   */
  public async findByDate(date: Date): Promise<Appointment | undefined> {
    return this.findOne({ where: { date } });
  }
}
