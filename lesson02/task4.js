/**
 * Отчет о рейсе на данный момент
 *
 * @typedef {Object} Report
 * @property {string} flight Номер рейса
 * @property {boolean} registration Доступна регистрация на самолет
 * @property {boolean} complete Регистрация завершена или самолет улетел
 * @property {number} countOfSeats Общее количество мест
 * @property {number} reservedSeats Количество купленных (забронированных) мест
 * @property {number} registeredSeats Количество пассажиров, прошедших регистрацию
 * @property {number} countOfReservations Количество всех регистраций мест
 * @property {number} countOfReverts Количество возвратов билетов
 * @property {number} percentOfReverts Процент возвратов от общего числа бронирований
 */

 /**
 * Функция генерации отчета по рейсу
 *
 *  * проверка рейса
 *  * подсчет
 *
 * @param {string} flight номер рейса
 * @param {number} nowTime текущее время
 * @returns {Report} отчет
 */
function flightReport(flight, nowTime) {
    const flightObject = flights[flight];

    if (!flightObject)
        throw new Error('Рейс не существует');

    const timeToFly = (flightObject.registrationEnds - nowTime) / 1000 / 3600;
    const registration = timeToFly > 1 && timeToFly < 5;

    const complete = timeToFly < 1;

    const countOfSeats = flightObject.seats;

    const reservedSeats = activeTickets(flightObject).length;

    const registeredSeats = activeTickets(flightObject).filter(t => t.registrationTime).length

    const countOfReservations = flightObject.tickets.length;
    const countOfReverts = flightObject.tickets.filter(t => t.revertTime).length
    const percentOfReverts = countOfReverts / countOfReservations * 100;

    const report = {
        flight,
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
