export default class EmailSenderService {
  async SendEmail(emailContent: string, emailSubject: string, emailSender: string): Promise<void> {

    const email = new EmailTemplate(emailContent, emailSubject, emailSender);

    await email.sendEmail();
  }
}
