'use strict';

const CHARCODE_A = 'A'.charCodeAt(0);

/**
 * Добавление рейса
 *
 * * назначение номера рейса
 * * подготовка рейса
 *   * вычисление времени регистрации
 *   * подготовка структуры Flight
 *
 * @param {World} world Информация о самолете
 * @param {Airliner} airliner Информация о самолете
 * @param {number} time Время вылета
 * @param {string} name Имя рейса
 * @returns { {world: World, flight: Flight} }
 */
function addFlight(world, airliner, time, name) {
    /// @type {Flight}

    while(name in world.flights) {
        name = [
            String.fromCharCode(CHARCODE_A + random(0, 26)),
            String.fromCharCode(CHARCODE_A + random(0, 26)),
            random(100, 999)
        ].join('');
        console.log(name);
    };

    console.log(name);

    const flight = {
        name,
        seats: airliner.seats,
        businessSeats: airliner.businessSeats,
        registrationStarts: time - 5 * 3600 * 1000,
        registrationEnds: time - 1 * 3600 * 1000,
        tickets: [],
    };

    /// @type {World}
    const newWorld = {
        flights: {
            ...world.flights,
            [name]: flight,
        },
        history: [
            ...world.history,
            world,
        ],
    };

    return {
        world: newWorld,
        flight,
    };
}
