import { ParkingTicket } from './ticket.model';

export interface Invoice {
    id: string;
    ticket: ParkingTicket;
    totalAmount: number;
    generatedAt: string;
    duration: string;
    status: 'PAID' | 'UNPAID';
}
