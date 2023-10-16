import { Exception } from '@src/modules/shared/domain/service/util/exception/exceptions.service';
import EmailSenderService from '../utils/emailSender.service';
import { ExceptionTypeEnum } from '@src/modules/shared/domain/const/exception-type.enum';

export class addProductToCartService {
  private maxProductsInOrder = 10;

  constructor(
    private readonly productRepository: ProductRepository,
    private readonly orderRepository: OrderRepository,
    private readonly emailSender: EmailSenderService,
  ) {}

  async addProductToCart(productId: number, productQuantity: number, orderId: number): Promise<Order> {
    const orderFromDb = await this.getOrderFromDB(orderId);
    const productFromDb = await this.getProductFromDb(productId);

    if (productQuantity > this.maxProductsInOrder) {
      throw new Exception(ExceptionTypeEnum.BadRequest, `You can not order more than ${this.maxProductsInOrder} products`);
    }

    if (productFromDb.quantityMax < productQuantity) {
      throw new Exception(ExceptionTypeEnum.BadRequest, 'Not enough products in stock');
    }
    
    const order = await this.saveProductInOrder(productQuantity, productFromDb, orderFromDb);

    const emailContent = '<h1>Order created</h1>';
    const emailSubject = 'Order created';
    const emailSender = 'admin@email.com';

    this.emailSender.SendEmail(emailContent,emailSubject,emailSender);
    return order;
  }

  private getOrderFromDB(orderId: number) {
    return this.orderRepository.find(orderId);
  }

  private getProductFromDb(productId: number) {
    return this.productRepository.find(productId);
  }

  private saveProductInOrder(productQuantity: number, productFromDb: number, orderFromDb: Order) {}
}