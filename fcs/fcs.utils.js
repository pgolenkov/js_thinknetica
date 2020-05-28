'use strict';

/**
 * Создание таймштампа для времени
 * @param {number} hours Часы
 * @param {number} minutes Минуты
 * @returns {number} таймштамп
 */
function makeTime(hours, minutes) {
    const date = new Date();
    date.setHours(hours);
    date.setMinutes(minutes);
    date.setSeconds(0);
    date.setMilliseconds(0);
    return date.getTime();
}

function displayFlights() {
    console.log('*** List of all flights ***');
    console.table(flights);
}

function flightDetails(flightName) {
    console.log(`*** Details of flight ${flightName} ***`);
    const flight = flights[flightName];
    if (!flight) {
        console.warn('Flight not found');
        return;
    }

    console.table(flight);
    console.table(flight.tickets);
}

function random(from, to) {
    return Math.floor(Math.random() * (to - from) + from);
}

/**
 * Выбор только активных билетов рейса
 *
 * @param {Flight} flight
 * @returns {array} возвращает массив активных билетов
 */
const activeTickets = flight => flight.tickets.filter(item => !item.revertTime);

/**
 * Функция проверяет корректность билета по номеру и возвращает объекты билета и рейса
 *
 * @param {World} world
 * @param {string} ticketId номер билета
 * @returns { {flight: Flight, ticket: Ticket} }
 */
function getFlightTicket(world, ticketId) {
    let flightName, ticketNumber;
    [flightName, ticketNumber] = ticketId.split('-');

    if (!ticketNumber)
        throw new Error('Ticket number is invalid');

    const flight = world.flights[flightName];

    if (!flight)
        throw new Error('Flight not found');

    const ticket = flight.tickets.find(t => t.id === ticketId);

    if (!ticket)
        throw new Error('Ticket not found in flight');

    return { flight, ticket };
}
