export interface Ticket {
    title: string;
    description: string;
    active: boolean;
    archived: boolean;
}

export interface TicketPayload {
    data: Ticket;
}
// export interface TicketPayload {
//     data: {
//         attributes: Ticket;
//     };
// }