import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeMailProvider from '@shared/container/providers/MailProvider/fakes/FakeMailProvider';

import SendForgotPasswordEMailService from '@modules/users/services/SendForgotPasswordEMailService';

describe('SendForgotPasswordEMail', () => {
  it('shuld be able to recover the password using the e-mail', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeMailProvider = new FakeMailProvider();

    const sendMail = jest.spyOn(fakeMailProvider, 'sendMail');
    const sendForgotPasswordEMailService = new SendForgotPasswordEMailService(
      fakeUsersRepository,
      fakeMailProvider,
    );

    await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@exemple.com',
      password: '12345678',
    });

    await sendForgotPasswordEMailService.execute({
      email: 'johndoe@exemple.com',
    });
    expect(sendMail).toHaveBeenCalled();
  });
});
