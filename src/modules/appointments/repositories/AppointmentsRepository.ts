import { EntityRepository, Repository } from 'typeorm';

import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';

@EntityRepository(Appointment)
export default class AppointmentsRepository extends Repository<Appointment> {
  /**
   * Procura se a data já está cadastrada.
   * @param date Data a ser procurada
   */
  public async findByDate(date: Date): Promise<Appointment | null> {
    return (await this.findOne({ where: { date } })) || null;
  }
}
