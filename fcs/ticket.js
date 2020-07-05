/**
 * @typedef {Object} Ticket
 * @property {string} id
 * @property {string} flightName
 * @property {string} fullName
 * @property {number} type Тип места (0 - стандарт, 1 - бизнес)
 * @property {number} seat
 * @property {number} buyTime
 * @property {number} registrationTime Время прохождения электронной регистрации
 * @property {number} revertTime Время возврата билета
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
    this.registrationTime = function() { return this._registrationTime };
    this.revertTime = function() { return this._revertTime };

    this.eRegistration = function (fullName, nowTime) {
        if (this._registrationTime)
            throw new Error('Ticket has already been registered');

        if (this._fullName !== fullName)
            throw new Error('Fullname is incorrect');

        this._registrationTime = nowTime;

        return this;
    }

    /**
     * Функция возврата билета
     *
     *  * вернуть билет можно если не бизнес класс
     * @param {number} nowTime текущее время
     * @returns {Ticket} если успешно или ошибка
     */
    this.revert = function(nowTime) {
        if (this._revertTime)
            throw new Error('Ticket was reverted before');

        if (this._type === 1)
            throw new Error('Reverting ticket not available for business class');

        this._revertTime = nowTime;

        return this;
    }
}
