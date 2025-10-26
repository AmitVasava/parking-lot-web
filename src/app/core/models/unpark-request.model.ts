export interface UnparkRequest {
  ticketId: string;
  exitTime: string; // ISO string
  paymentMode: string; // 'CASH', 'UPI', 'CARD'
}