'use strict';

/**
 * Функция возврата билета
 *
 *  * проверка рейса
 *  * проверка билета
 *  * вернуть билет можно если до рейса не менее 3 часов
 *  * вернуть билет можно если не бизнес класс
 * @param {World} world
 * @param {string} ticketId номер билета
 * @param {number} nowTime текущее время
 * @returns {World} если успешно или ошибка
 */
function revertTicket(world, ticketId, nowTime) {
    const result = getFlightTicket(world, ticketId);
    const ticket = result.ticket;
    const flight = result.flight;

    if (ticket.revertTime)
        throw new Error('Ticket was reverted before');

    if (flight.registrationEnds - 2 * 3600 * 1000 < nowTime)
        throw new Error('Reverting ticket available 3 hours before flight only');

    if (ticket.type === 1)
        throw new Error('Reverting ticket not available for business class');

    const revertedTicket = {
        ...ticket,
        revertTime: nowTime
    };

    const tickets = [
        ...flight.tickets.filter(t => t.id !== ticketId),
        revertedTicket
    ]

    const newFlight = {
        ...flight,
        tickets
    }

    const flights = {
        ...world.flights,
        [flight.name]: newFlight,
    };

    const newWorld = {
        ...world,
        flights,
    };

    return newWorld;
}
