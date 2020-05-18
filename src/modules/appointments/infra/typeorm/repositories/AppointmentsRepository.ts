import { getRepository, Repository, Raw } from 'typeorm';

import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentDTO';

import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';
import IFindAllInMonthFromProviderDTO from '@modules/appointments/dtos/IFindAllInMonthFromProviderDTO';
import IFindAllInDayFromProviderDTO from '@modules/appointments/dtos/IFindAllInDayFromProviderDTO';

export default class AppointmentsRepository implements IAppointmentsRepository {
  private ormRepository: Repository<Appointment>;

  constructor() {
    this.ormRepository = getRepository(Appointment);
  }

  /**
   * Procura se a data já está cadastrada.
   * @param date Data a ser procurada
   */
  public async findByDate(date: Date): Promise<Appointment | undefined> {
    return this.ormRepository.findOne({ where: { date } });
  }

  public async findAllInMonthFromProvider({
    year,
    month,
    provider_id,
  }: IFindAllInMonthFromProviderDTO): Promise<Appointment[]> {
    const parsedMoth = month.toString().padStart(2, '0');
    const appointments = this.ormRepository.find({
      where: {
        provider_id,
        date: Raw(
          dataFildName =>
            `to_char(${dataFildName}, 'MM-YYYY')='${parsedMoth}-${year}'`,
        ),
      },
    });
    return appointments;
  }

  public async findAllInDayFromProvider({
    year,
    month,
    provider_id,
    day,
  }: IFindAllInDayFromProviderDTO): Promise<Appointment[]> {
    const parsedMoth = month.toString().padStart(2, '0');
    const parsedDay = day.toString().padStart(2, '0');

    const appointments = this.ormRepository.find({
      where: {
        provider_id,
        date: Raw(
          dataFildName =>
            `to_char(${dataFildName}, 'DD-MM-YYYY')='${parsedDay}-${parsedMoth}-${year}'`,
        ),
      },
    });
    return appointments;
  }

  /**
   * create
   */
  public async create({
    provider_id,
    date,
  }: ICreateAppointmentDTO): Promise<Appointment> {
    const appointment = this.ormRepository.create({
      provider_id,
      date,
    });

    await this.ormRepository.save(appointment);

    return appointment;
  }
}
