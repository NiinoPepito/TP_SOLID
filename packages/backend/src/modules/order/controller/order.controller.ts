import { Controller, Post } from '@nestjs/common';
import { addProductToCartService } from '../use-case/addProductToCart.service';

@Controller('/order')
export default class AddProductToCartController {
  constructor(private readonly addProductToCartService: addProductToCartService) {}

  @Post()
  async addProductToCart(request: Request): Promise<Order> {
    const productId = request.body.productId;
    const productQuantity = request.body.productQuantity;
    const orderId = request.body.orderId;

    return await this.addProductToCartService.addProductToCart(productId, productQuantity, orderId);
  }
}
