export interface DiscountCalculatorServiceInterface {
    calculate(order: Order, total: number): number;
  
    sendEmail(order: Order): void;
  }