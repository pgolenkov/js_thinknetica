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

    const reservedSeats = flightObject.tickets.length;

    const registeredSeats = flightObject.tickets.filter(t => t.registrationTime).length

    const report = {
        flight,
        registration,
        complete,
        countOfSeats,
        reservedSeats,
        registeredSeats
    }

    return report;
}
