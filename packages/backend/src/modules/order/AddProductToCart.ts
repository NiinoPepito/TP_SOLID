import { Controller, Post } from '@nestjs/common';
import { ExceptionTypeEnum } from '@src/modules/shared/domain/const/exception-type.enum';
import { Exception } from '@src/modules/shared/domain/service/util/exception/exceptions.service';

@Controller('/order')
export default class ProductToCartAdder {
  private maxProductsInOrder = 10;
  constructor(private readonly productRepository: ProductRepository, private readonly orderRepository: OrderRepository) {}

  @Post()
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

    const email = new EmailTemplate();
    const emailContent = '<h1>Order created</h1>';
    const emailSubject = 'Order created';
    const emailTo = 'admin@superecommerce.com';
    await email.sendEmail(order);
    return order;
  }
}
