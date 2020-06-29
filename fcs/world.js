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

        const flight = {
            name,
            seats: airliner.seats,
            businessSeats: airliner.businessSeats,
            registrationStarts: time - 5 * 3600 * 1000,
            registrationEnds: time - 1 * 3600 * 1000,
            tickets: [],
        };

        this.flights.push(flight);
        this.history = [
            ...this.history,
            [...this.flights]
        ];

        return flight;
    }
}
