import { MailerService } from '@nestjs-modules/mailer';
import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';

@Processor('send-mail')
export class EmailConsumer {
  constructor(private mailerService: MailerService) {}

  @Process('send_mail_otp')
  async sendOtpMail(job: Job<unknown>) {
    console.log(job.data);

    await this.mailerService.sendMail({
      to: 'truongdinhthao12@gmail.com',
      subject: 'Welcome to my website',
      template: './send_otp',
      context: {
        name: job.data['name'],
        email: job.data['email'],
        code: job.data['code'],
      },
    });
  }
}
