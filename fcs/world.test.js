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

        describe("addFlight", () => {
            it("creates new flight", () => {
                assert.instanceOf(flight, Flight);
            });

            it("adds new flight to the world flights", () => {
                assert.equal(world.flights.length, 1);
                assert.deepEqual(world.flights[0], flight);
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

        describe("buyTicket", () => {
            it("calls buyTicket method of flight found by flightName", () => {
                flight.buyTicket = function() { this.buyTicketCalled = true };

                world.buyTicket(flight.name, makeTime(5, 10), 'Petrov I. I.');
                assert.isTrue(flight.buyTicketCalled);
            });

            it("should raise error if flight not found", () => {
                assert.throws(() => world.buyTicket('A118', makeTime(5, 10), 'Petrov I. I.'), 'Flight not found');
            });
        });

        describe("eRegistration", () => {
            it("calls eRegistration method of flight found by ticketId", () => {
                flight.eRegistration = function() { this.eRegistrationCalled = true };

                world.eRegistration('BH118-123', 'Petrov I. I.', makeTime(5, 10));
                assert.isTrue(flight.eRegistrationCalled);
            });

            it("should raise error if flight not found", () => {
                assert.throws(() => world.eRegistration('AH118-123', 'Petrov I. I.', makeTime(5, 10)), 'Flight not found');
            });

            it("should raise error if ticketId is invalid", () => {
                assert.throws(() => world.eRegistration('BH118', 'Petrov I. I.', makeTime(5, 10)), 'Ticket number is invalid');
            });
        });
    });
});
