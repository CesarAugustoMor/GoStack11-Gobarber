import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';

import ListProviderService from './ListProviderService';

let fakeUsersRepository: FakeUsersRepository;
let listProvider: ListProviderService;

describe('ListProviders', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    listProvider = new ListProviderService(fakeUsersRepository);
  });

  it('shuld be able to list the providers', async () => {
    const user1 = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@exemple.com',
      password: '12345678',
    });

    const user2 = await fakeUsersRepository.create({
      name: 'John Trê',
      email: 'johntre@exemple.com',
      password: '12345678',
    });

    const loggedUser = await fakeUsersRepository.create({
      name: 'John Qua',
      email: 'johnqua@exemple.com',
      password: '12345678',
    });

    const providers = await listProvider.execute({
      user_id: loggedUser.id,
    });
    expect(providers).toEqual([user1, user2]);
  });
});
