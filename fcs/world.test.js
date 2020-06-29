describe("World", () => {
    let world;

    beforeEach(() => {
        world = new World();
    });

    describe("constructor", () => {
        it("should create new world with empty flights and history", () => {
            assert.deepEqual(world.flights, []);
            assert.deepEqual(world.history, [[]]);
        });
    });

    describe("methods", () => {
        describe("addFlight", () => {
            let airliner, time, name, flight;

            beforeEach(() => {
                airliner = {
                    name: 'Airbus 747',
                    seats: 36,
                    businessSeats: 4,
                };
                time = makeTime(16, 0);
                name = 'BH118';

                flight = world.addFlight(airliner, time, name);
            });

            it("adds new flight to the world flights", () => {
                assert.equal(world.flights.length, 1);
                assert.deepEqual(world.flights[0], flight);
            });

            it("creates new flight with right properties", () => {
                assert.equal(flight.name, name);
                assert.equal(flight.seats, airliner.seats);
                assert.equal(flight.businessSeats, airliner.businessSeats);

                assert.equal(flight.registrationStarts, time - 5 * 3600 * 1000);
                assert.equal(flight.registrationEnds, time - 1 * 3600 * 1000);
                assert.deepEqual(flight.tickets, []);
            });

            it("generates new name for flight if flight with same name present in flights", () => {
                world.addFlight(airliner, time, name);

                assert.equal(world.flights.length, 2);
                const flight = world.flights[1];

                assert.notEqual(flight.name, name);
                assert.match(flight.name.substr(0, 2), /[A-Z]/);
                assert.match(flight.name.substr(2, 3), /[0-9]/);
            });

            it("saves history of flights", () => {
                assert.deepEqual(world.history, [[], [world.flights[0]]]);

                world.addFlight(airliner, time, name);

                assert.deepEqual(world.history, [[], [world.flights[0]], [world.flights[0], world.flights[1]]]);
            });
        });
    });
});
