/**
 * @typedef {Object} World
 * @property {Flight[]} flights Массив всех рейсов
 * @property {Array<Flight[]>} history История состояний
 */

function World() {
    this.flights = [];
    this.history = [[]];

    const CHARCODE_A = 'A'.charCodeAt(0);

    /**
     * Добавление рейса
     *
     * * назначение номера рейса
     * * подготовка рейса
     *   * вычисление времени регистрации
     *   * подготовка структуры Flight
     *
     * @param {Airliner} airliner Информация о самолете
     * @param {number} time Время вылета
     * @param {string} name Имя рейса
     * @returns {Flight}
     */
    this.addFlight = function (airliner, time, name) {
        while(this.flights.map(f => f.name).includes(name)) {
            name = [
                String.fromCharCode(CHARCODE_A + random(0, 26)),
                String.fromCharCode(CHARCODE_A + random(0, 26)),
                random(100, 999)
            ].join('');
        };

        const flight = new Flight(
            name,
            airliner.seats,
            airliner.businessSeats,
            time
        );

        this.flights.push(flight);
        this.history = [
            ...this.history,
            [...this.flights]
        ];

        return flight;
    }

    this.getFlight = function(name) {
        return this.flights.find(f => f.name === name)
    }

    /**
     * Покупка билета на самолет
     *
     * * проверка рейса
     * * вызов метода покупки для рейса
     *
     * @param {string} flightName Номер рейса
     * @param {number} buyTime Время покупки
     * @param {string} fullName Имя пассажира
     * @param {number} type Тип места
     * @returns {Ticket} Возвращаем копию билета
     */
    this.buyTicket = function (flightName, buyTime, fullName, type = 0) {
        const flight = this.getFlight(flightName);

        if (!flight)
            throw new Error('Flight not found');

        return flight.buyTicket(buyTime, fullName, type);
    }

    /**
     * Функция пробует произвести электронную регистрацию пассажира
     *
     *  * поиск рейса
     *  * вызов метода электронной регистрации для рейса
     *
     * @param {string} ticketId номер билета
     * @param {string} fullName имя пассажира
     * @param {number} nowTime текущее время
     * @returns {Ticket} если успешно или ошибка
     */
    this.eRegistration = function (ticketId, fullName, nowTime) {
        let flightName, ticketNumber;
        [flightName, ticketNumber] = ticketId.split('-');

        if (!ticketNumber)
            throw new Error('Ticket number is invalid');

        const flight = this.getFlight(flightName);

        if (!flight)
            throw new Error('Flight not found');

        return flight.eRegistration(ticketId, fullName, nowTime);
    }
}
