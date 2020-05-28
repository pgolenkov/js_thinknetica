'use strict';

/**
 * Функция генерации отчета по рейсу
 *
 * Отчет строится на основании данных, содержащихся в параметре flight
 *
 *  * проверка рейса
 *  * подсчет
 *
 * @param {World} world
 * @param {Flight} flight номер рейса
 * @param {number} nowTime текущее время
 * @returns {Report} отчет
 */
function flightReport(world, flight, nowTime) {
    if (!world.flights[flight.name])
        throw new Error('Flight not found');

    const timeToFly = (flight.registrationEnds - nowTime) / 1000 / 3600;
    const registration = timeToFly > 1 && timeToFly < 5;

    const complete = timeToFly < 1;

    const countOfSeats = flight.seats;

    const reservedSeats = activeTickets(flight).length;

    const registeredSeats = activeTickets(flight).filter(t => t.registrationTime).length

    const countOfReservations = flight.tickets.length;

    const countOfReverts = flight.tickets.filter(t => t.revertTime).length

    const percentOfReverts = countOfReservations ? countOfReverts / countOfReservations * 100 : 0;

    const report = {
        flight: flight.name,
        registration,
        complete,
        countOfSeats,
        reservedSeats,
        registeredSeats,
        countOfReservations,
        countOfReverts,
        percentOfReverts
    }

    return report;
}
