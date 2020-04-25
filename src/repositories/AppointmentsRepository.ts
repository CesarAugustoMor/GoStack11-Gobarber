import { isEqual } from 'date-fns';
import Appointment from '../models/Appointment';

interface CreateAppontmentDTO {
  provider: string;
  date: Date;
}
export default class AppointmentsRepository {
  private appointments: Appointment[];

  constructor() {
    this.appointments = [];
  }

  /**
   * Retorna Todos os repositorios cadastrados.
   */

  public all(): Appointment[] {
    return this.appointments;
  }

  /**
   *Cria um agendamento.
   * @param provider Nome do barbeiro
   * @param date Data do agendamento
   */

  public create({ provider, date }: CreateAppontmentDTO): Appointment {
    const appointment = new Appointment({ provider, date });

    this.appointments.push(appointment);
    return appointment;
  }

  /**
   * Procura se a data já está cadastrada.
   * @param date Data a ser procurada
   */

  public findByDate(date: Date): Appointment | null {
    return (
      this.appointments.find(appointment => isEqual(date, appointment.date)) ||
      null
    );
  }
}
