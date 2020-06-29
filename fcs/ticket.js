/**
 * @typedef {Object} Ticket
 * @property {string} id
 * @property {string} flightName
 * @property {string} fullName
 * @property {number} type Тип места (0 - стандарт, 1 - бизнес)
 * @property {number} seat
 * @property {number} buyTime
 * @property {number} registrationTime Время прохождения электронной регистрации
 */

function Ticket(id, flightName, fullName, type, seat, buyTime) {
    this.id = id;
    this.flightName = flightName;
    this.fullName = fullName;
    this.type = type;
    this.seat = seat;
    this.buyTime = buyTime;

    Object.freeze(this);
}
