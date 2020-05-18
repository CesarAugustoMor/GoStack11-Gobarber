import FakeAppointmentsRepository from '@modules/appointments/repositories/fakes/FakeAppointmentsRepository';
import ListProviderDayAvailabiliryService from './ListProviderDayAvailabiliryService';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let listProviderDayAvailabiliry: ListProviderDayAvailabiliryService;

describe('ListProviderDayAvailabiliry', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    listProviderDayAvailabiliry = new ListProviderDayAvailabiliryService(
      fakeAppointmentsRepository,
    );
  });

  it('shuld be able to list the day availabiliry from provider', async () => {
    await fakeAppointmentsRepository.create({
      provider_id: 'user',
      date: new Date(2020, 4, 20, 8, 0, 0),
    });

    await fakeAppointmentsRepository.create({
      provider_id: 'user',
      date: new Date(2020, 4, 20, 10, 0, 0),
    });

    const availabiliry = await listProviderDayAvailabiliry.execute({
      provider_id: 'user',
      month: 5,
      year: 2020,
      day: 20,
    });

    expect(availabiliry).toEqual(
      expect.arrayContaining([
        { hour: 8, available: false },
        { hour: 9, available: true },
        { hour: 10, available: false },
        { hour: 11, available: true },
      ]),
    );
  });
});
