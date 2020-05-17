import nodemailer, { Transporter } from 'nodemailer';

import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider';

export default class EtherealMailProvider implements IMailProvider {
  private client: Transporter;

  constructor() {
    nodemailer.createTestAccount().then(account => {
      const tranporter = nodemailer.createTransport({
        host: account.smtp.host,
        port: account.smtp.port,
        secure: account.smtp.secure,
        auth: {
          user: account.user,
          pass: account.pass,
        },
      });

        this.client = tranporter;
      })
      .catch(err => {
        // eslint-disable-next-line no-console
        console.log('--------------------------------------------------------');
        // eslint-disable-next-line no-console
        console.log('Erro na criação da conta de teste:');
        // eslint-disable-next-line no-console
        console.log(err);
        // eslint-disable-next-line no-console
        console.log('--------------------------------------------------------');

        const tranporter = nodemailer.createTransport({
          host: 'smtp.ethereal.email',
          port: 587,
          secure: false,
          auth: {
            user: 'ernesto.hayes25@ethereal.email',
            pass: 'TX7kNVWvRTFBZRUgUj',
          },
        });

        this.client = tranporter;
      });
  }

  public async sendMail(to: string, body: string): Promise<void> {
    const message = await this.client.sendMail({
      from: 'Equipe GoBarber <equipe@gobarber.com.br>', // sender address
      to, // list of receivers
      subject: 'Recuperação de senha', // Subject line
      text: body, // plain text body
    });

    // eslint-disable-next-line no-console
    console.log('Message sent: %s', message.messageId);
    // Preview only available when sending through an Ethereal account
    // eslint-disable-next-line no-console
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(message));
  }
}
