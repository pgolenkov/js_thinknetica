'use strict';

/**
 * Функция пробует произвести электронную регистрацию пассажира
 *
 *  * проверка билета
 *  * проверка данных пассажира
 *  * в информации о рейсе указано время начала
 *  * и конца электронной регистрации
 *
 * @param {World} world
 * @param {string} ticketId номер билета
 * @param {string} fullName имя пассажира
 * @param {number} nowTime текущее время
 * @returns {World} если успешно или ошибка
 */
function eRegistration(world, ticketId, fullName, nowTime) {
    const result = getFlightTicket(world, ticketId);
    const ticket = result.ticket;
    const flight = result.flight;

    if (flight.registrationStarts > nowTime || flight.registrationEnds <= nowTime)
        throw new Error('Registration unavailable');

    if (ticket.registrationTime)
        throw new Error('Ticket has already been registered');

    const registeredTicket = {
        ...ticket,
        registrationTime: nowTime
    };

    const tickets = [
        ...flight.tickets.filter(t => t.id !== ticketId),
        registeredTicket
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
