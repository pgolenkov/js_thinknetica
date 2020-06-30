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
    this._id = id;
    this._flightName = flightName;
    this._fullName = fullName;
    this._type = type;
    this._seat = seat;
    this._buyTime = buyTime;

    this.id = function() { return this._id };
    this.flightName = function() { return this._flightName };
    this.fullName = function() { return this._fullName };
    this.type = function() { return this._type };
    this.seat = function() { return this._seat };
    this.buyTime = function() { return this._buyTime };

    this.eRegistration = function ( ) {
        if (this.registrationTime)
            throw new Error('Ticket has already been registered');

        this.registrationTime = nowTime;

        return this;
    }
}
