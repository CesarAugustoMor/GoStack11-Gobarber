import AppError from '@shared/errors/AppError';
import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import CreateAppointmentService from './CreateAppointmentService';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let createAppointment: CreateAppointmentService;

describe('CreateAppointment', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    createAppointment = new CreateAppointmentService(
      fakeAppointmentsRepository,
    );
  });

  it('shuld be able to create a new appointment', async () => {
    const appointment = await createAppointment.execute({
      date: new Date(),
      provider_id: '12312312312312312311',
    });
    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe('12312312312312312311');
  });

  it('shuld not be able to create two appointments on the same time', async () => {
    const appontmentDate = new Date(2020, 5, 10, 11);

    await createAppointment.execute({
      date: appontmentDate,
      provider_id: '123123123',
    });

    await expect(
      createAppointment.execute({
        date: appontmentDate,
        provider_id: '123123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
