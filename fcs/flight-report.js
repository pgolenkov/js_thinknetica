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

    const reservedSeats = flight.tickets.length;

    const registeredSeats = flight.tickets.filter(t => t.registrationTime).length

    const report = {
        flight: flight.name,
        registration,
        complete,
        countOfSeats,
        reservedSeats,
        registeredSeats
    }

    return report;
}
