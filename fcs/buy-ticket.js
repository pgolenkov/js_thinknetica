'use strict';

/**
 * Поиск свободного места нужного типа
 *
 * Гарантирует что найдет свободное место нужного типа или вернет null
 *
 * @param {Flight} flight
 * @param {number} type
 * @returns {number} seat
 */
function findAvailableSeat(flight, type) {
    let exists;
    let seat;
    let seatsOfType = 0;

    switch (type) {
        case 0: // standart
            const availableSeats = [];

            for (let i = flight.businessSeats + 1; i <= flight.seats; i++)
                if (!flight.tickets.find(item => item.seat === i))
                    availableSeats.push(i);

            if (availableSeats.length === 0)
                return null;

            const index = Math.floor(Math.random() * availableSeats.length);
            return availableSeats[index];
        case 1: // business
            for (let i = 1; i <= flight.businessSeats; i++)
                if (!flight.tickets.find(item => item.seat === i))
                    seatsOfType++;

            if (seatsOfType === 0)
                return null;

            do {
                seat = Math.floor(Math.random() * flight.businessSeats) + 1;
                exists = flight.tickets.find(item => item.seat === seat);
            } while (exists);

            return seat;
        default:
            throw new Error(`Unknown type`);
    }
}

/**
 * Покупка билета на самолет
 *
 * * проверка рейса
 * * проверка возможности купить (время и наличие мест)
 * * сохранение данных билета в информации о рейсе
 *
 * @param {World} world Мир
 * @param {string} flightName Номер рейса
 * @param {number} buyTime Время покупки
 * @param {string} fullName Имя пассажира
 * @param {number} type Тип места
 * @returns { {world: World, ticket: Ticket} } Возвращаем копию билета
 */
function buyTicket(world, flightName, buyTime, fullName, type = 0) {
    const flight = world.flights[flightName];

    if (!flight)
        throw new Error('Flight not found');

    if (flight.tickets.length >= flight.seats)
        throw new Error('No seats available');

    if (buyTime > flight.registartionEnds)
        throw new Error('Time away');

    const seat = findAvailableSeat(flight, type);
    if (!seat)
        throw new Error(`No seats of type ${type} available. You can choose another type`);

    let id, exists;
    do {
        id = flight.name + '-' + flight.tickets.length; // Math.random().toString().substr(2, 3);
        exists = flight.tickets.find(item => item.id === id);
    } while (exists);

    /**
     * @type {Ticket}
     */
    const ticket = {
        id,
        flight: flight.name,
        buyTime,
        fullName,
        registrationTime: null,
        type,
        seat,
    };

    const tickets = [
        ...flight.tickets,
        ticket,
    ];

    const newFlight = {
        ...flight,
        tickets,
    };

    const flights = {
        ...world.flights,
        [flightName]: newFlight,
    };

    const newWorld = {
        ...world,
        flights,
    };

    return {
        world: newWorld,
        ticket,
    }
}
