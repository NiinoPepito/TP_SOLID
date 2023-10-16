export default class EmailSenderService {
  async SendEmail(order: Order): Promise<void> {
    const emailContent = '<h1>Order created</h1>';
    const emailSubject = 'Order created';
    const emailSender = 'admin@email.com';

    const email = new EmailTemplate(emailContent, emailSubject, emailSender);

    await email.sendEmail(order);
  }
}
