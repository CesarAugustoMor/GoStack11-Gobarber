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
      date: new Date(2020, 4, 20, 14, 0, 0),
    });

    await fakeAppointmentsRepository.create({
      provider_id: 'user',
      date: new Date(2020, 4, 20, 15, 0, 0),
    });

    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 20, 11).getTime();
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
        { hour: 9, available: false },
        { hour: 10, available: false },
        { hour: 13, available: true },
        { hour: 14, available: false },
        { hour: 15, available: false },
        { hour: 16, available: true },
      ]),
    );
  });
});
