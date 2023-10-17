export class DiscountCalculatorServiceInterface implements DiscountCalculatorServiceInterface { 
    calculate(order: Order, total: number): number {
        if (order.user.name == 'Jean-Pierre') {
            total = total - 10;
        }
        return total;
    }
}