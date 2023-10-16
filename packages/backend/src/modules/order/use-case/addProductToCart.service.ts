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

  async addProductToCart(request: Request): Promise<Order> {
    const productId = request.body.productId;
    const productQuantity = request.body.quantity;
    const orderId = request.body.orderId;
    const orderFromDb = await this.getOrderFromDB(orderId);
    const productFromDb = await this.getProductFromDb(productId);

    if (productQuantity > this.maxProductsInOrder) {
      throw new Exception(ExceptionTypeEnum.BadRequest, `You can not order more than ${this.maxProductsInOrder} products`);
    }

    if (productFromDb.quantityMax < productQuantity) {
      throw new Exception(ExceptionTypeEnum.BadRequest, 'Not enough products in stock');
    }
    
    const order = await this.saveProductInOrder(productQuantity, productFromDb, orderFromDb);

    this.emailSender.SendEmail(order);
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