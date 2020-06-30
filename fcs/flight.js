/**
 * @typedef {Object} Flight
 * @property {string} name Номер рейса
 * @property {number} seats Общее количество мест (включая бизнес класс)
 * @property {number} businessSeats Количество мест бизнес класса (первые номера мест в нумерации)
 * @property {number} registrationStarts Время начала регистрации на борт
 * @property {number} registrationEnds Время окончания регистрации на борт
 * @property {Ticket[]} tickets Массив всех билетов
 */

function Flight(name, seats, businessSeats, time) {
    this.name = name;
    this.seats = seats;
    this.businessSeats = businessSeats;
    this.registrationStarts = time - 5 * 3600 * 1000;
    this.registrationEnds = time - 1 * 3600 * 1000,
    this.tickets = [];

    /**
     * @returns {array} возвращает массив активных билетов
     */
    this.activeTickets = function () {
        return this.tickets.filter(item => !item.revertTime);
    }

    /**
     * Поиск свободного места нужного типа
     *
     * Гарантирует что найдет свободное место нужного типа или вернет null
     *
     * @param {number} type
     * @returns {number} seat
     */
    this._findAvailableSeat = function(type) {
        let exists;
        let seat;
        let seatsOfType = 0;

        switch (type) {
            case 0: // standart
                const availableSeats = [];

                for (let i = this.businessSeats + 1; i <= this.seats; i++)
                    if (!this.activeTickets().find(item => item.seat === i))
                        availableSeats.push(i);

                if (availableSeats.length === 0)
                    return null;

                const index = Math.floor(Math.random() * availableSeats.length);
                return availableSeats[index];
            case 1: // business
                for (let i = 1; i <= this.businessSeats; i++)
                    if (!this.activeTickets().find(item => item.seat === i))
                        seatsOfType++;

                if (seatsOfType === 0)
                    return null;

                do {
                    seat = Math.floor(Math.random() * flight.businessSeats) + 1;
                    exists = this.activeTickets().find(item => item.seat === seat);
                } while (exists);

                return seat;
            default:
                throw new Error(`Unknown type`);
        }
    }

    /**
     * Покупка билета на самолет
     *
     * * проверка возможности купить (время и наличие мест)
     * * сохранение данных билета в информации о рейсе
     *
     * @param {number} buyTime Время покупки
     * @param {string} fullName Имя пассажира
     * @param {number} type Тип места
     * @returns {Ticket} Возвращаем копию билета
     */
    this.buyTicket = function(buyTime, fullName, type = 0) {
        if (this.activeTickets().length >= this.seats)
            throw new Error('No seats available');

        if (buyTime > this.registartionEnds)
            throw new Error('Time away');

        const seat = this._findAvailableSeat(type);
        if (!seat)
            throw new Error(`No seats of type ${type} available. You can choose another type`);

        let id, exists;
        do {
            id = this.name + '-' + this.tickets.length; // Math.random().toString().substr(2, 3);
            exists = flight.tickets.find(item => item.id === id);
        } while (exists);

        const ticket = new Ticket(
            id,
            flight.name,
            fullName,
            type,
            seat,
            buyTime
        );

        this.tickets.push(ticket);

        return {
            ...ticket
        }
    }


    /**
     * Функция проверяет корректность билета по номеру и возвращает объект билета
     *
     * @param {string} ticketId номер билета
     * @returns {Ticket}
     */
    this.getTicket = function(ticketId) {
        const ticket = this.tickets.find(t => t.id === ticketId);

        if (!ticket)
            throw new Error('Ticket not found in flight');

        return ticket;
    }

    this.eRegistration = function(ticketId, fullName, nowTime) {
        if (this.registrationStarts > nowTime || this.registrationEnds <= nowTime)
            throw new Error('Registration unavailable');

        const ticket = this.getTicket(ticketId);

        return ticket.eRegistration(fullName, nowTime);
    }

    /**
     * Функция генерации отчета по рейсу
     *
     * @param {number} nowTime текущее время
     * @returns {Report} отчет
     */
    this.flightReport = function (nowTime) {
        const timeToFly = (this.registrationEnds - nowTime) / 1000 / 3600;
        const registration = timeToFly > 1 && timeToFly < 5;

        const complete = timeToFly < 1;

        const countOfSeats = this.seats;

        const reservedSeats = this.activeTickets().length;

        const registeredSeats = this.activeTickets().filter(t => t.registrationTime).length

        const countOfReservations = this.tickets.length;

        const countOfReverts = this.tickets.filter(t => t.revertTime).length

        const percentOfReverts = countOfReservations ? countOfReverts / countOfReservations * 100 : 0;

        const report = {
            flight: this.name,
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
}
