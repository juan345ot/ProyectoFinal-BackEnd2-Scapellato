import Ticket from '../models/Ticket.js';

class TicketRepository {
    static async create(ticketData) {
        return await Ticket.create(ticketData);
    }
}

export default TicketRepository;
