// import SneakersInfo from "./SneakersInfo";

// export default class Discount {
//     private id: number = 0;
//     private productId: number = 0;
//     private discountRate: number;
//     private startDate: Date;
//     private endDate: Date;

//     // Construtor com valores opcionais
//     constructor(id: number = 0, productId: number = 0, discountRate: number = 0, startDate: Date = new Date(), endDate: Date = new Date()) {
//         this.id = id;
//         this.productId = productId;
//         this.discountRate = discountRate;
//         this.startDate = startDate;
//         this.endDate = endDate;
//     }

//     // Getters
//     getId(): number {
//         return this.id;
//     }

//     getProductId(): number {
//         return this.productId;
//     }

//     getDiscountRate(): number {
//         return this.discountRate;
//     }

//     getStartDate(): Date {
//         return this.startDate;
//     }

//     getEndDate(): Date {
//         return this.endDate;
//     }

//     // Setters
//     setDiscountRate(discountRate: number): void {
//         if (discountRate < 0 || discountRate > 1) {
//             throw new Error("A taxa de desconto deve estar entre 0 e 1 (0% a 100%).");
//         }
//         this.discountRate = discountRate;
//     }

//     setStartDate(startDate: Date): void {
//         this.startDate = startDate;
//     }

//     setEndDate(endDate: Date): void {
//         if (endDate <= this.startDate) {
//             throw new Error("A data de término deve ser posterior à data de início.");
//         }
//         this.endDate = endDate;
//     }

//     // Verifica se o desconto está ativo
//     isDiscountActive(): boolean {
//         const today = new Date();
//         return today >= this.startDate && today <= this.endDate;
//     }

//     // Aplica o desconto ao preço de um tênis específico
//     applyDiscount(sneaker: SneakersInfo): number {
//         if (sneaker.getId() === this.productId && this.isDiscountActive()) {
//             return sneaker.getPrice() * (1 - this.discountRate);
//         }
//         return sneaker.getPrice();
//     }
// }
