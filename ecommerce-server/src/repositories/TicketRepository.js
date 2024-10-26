import Ticket from '../models/Ticket.js';

class TicketRepository {
    static async create(ticketData) {
        return await Ticket.create(ticketData);
    }

    static async getById(ticketId) {
        return await Ticket.findById(ticketId);
    }
}

export default TicketRepository;
