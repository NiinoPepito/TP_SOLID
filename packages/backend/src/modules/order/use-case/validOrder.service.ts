export class ValidOrderService {
    constructor(
        private readonly orderRepository: OrderRepository,
        private readonly discountCalculatorServices: DiscountCalculatorServiceInterface[],
        ) {}

    validOrder(orderId: number): Order {
        const order = this.orderRepository.findOne(orderId);

        let total = 0;

        order.products.array.forEach((product) => {
            total += product.price;
        });

        this.discountCalculatorServices.forEach((discountCalculatorService) => {
            total = discountCalculatorService.calculate(order, total);
        });

        order.total = total;
        order.status = 'completed';

        return order;
    }
}