describe('flightReport', () => {
    let bigWorld = {
        flights: {},
        history: [],
    };

    before(() => {
        let result = addFlight(
            bigWorld,
            {
                name: 'Airbus 747',
                seats: 36,
                businessSeats: 4,
            },
            makeTime(16, 0),
            'BH118'
        );
        bigWorld = result.world;
    });

    describe('when no tickets were bought', () => {
        it('returns Report object with no reserved seats', () => {
            const flight = bigWorld.flights['BH118'];
            let result = flightReport(bigWorld, flight, makeTime(12, 0));
            const expectedResult = {
                flight: 'BH118',
                registration: true,
                complete: false,
                countOfSeats: 36,
                reservedSeats: 0,
                registeredSeats: 0,
                countOfReservations: 0,
                countOfReverts: 0,
                percentOfReverts: 0
            };
            console.log(result)
            assert.deepEqual(result, expectedResult);
        });
    });

    describe('when ticket was bought', () => {
        before(() => {
            let result = buyTicket(bigWorld, 'BH118', makeTime(5, 10), 'Petrov I. I.');
            bigWorld = result.world;
        });

        it('returns Report object when registration available', () => {
            const flight = bigWorld.flights['BH118'];
            let result = flightReport(bigWorld, flight, makeTime(12, 0));
            const expectedResult = {
                flight: 'BH118',
                registration: true,
                complete: false,
                countOfSeats: 36,
                reservedSeats: 1,
                registeredSeats: 0,
                countOfReservations: 1,
                countOfReverts: 0,
                percentOfReverts: 0
            };
            assert.deepEqual(result, expectedResult);
        });

        it('returns Report object when registration unavailable', () => {
            const flight = bigWorld.flights['BH118'];
            let result = flightReport(bigWorld, flight, makeTime(10, 0));
            const expectedResult = {
                flight: 'BH118',
                registration: false,
                complete: false,
                countOfSeats: 36,
                reservedSeats: 1,
                registeredSeats: 0,
                countOfReservations: 1,
                countOfReverts: 0,
                percentOfReverts: 0
            };
            assert.deepEqual(result, expectedResult);
        });

        it('returns Report object when registration begins', () => {
            const flight = bigWorld.flights['BH118'];
            let result = flightReport(bigWorld, flight, makeTime(11, 0));
            const expectedResult = {
                flight: 'BH118',
                registration: true,
                complete: false,
                countOfSeats: 36,
                reservedSeats: 1,
                registeredSeats: 0,
                countOfReservations: 1,
                countOfReverts: 0,
                percentOfReverts: 0
            };
            assert.deepEqual(result, expectedResult);
        });

        it('returns Report object when registration ends', () => {
            const flight = bigWorld.flights['BH118'];
            let result = flightReport(bigWorld, flight, makeTime(15, 0));
            const expectedResult = {
                flight: 'BH118',
                registration: false,
                complete: true,
                countOfSeats: 36,
                reservedSeats: 1,
                registeredSeats: 0,
                countOfReservations: 1,
                countOfReverts: 0,
                percentOfReverts: 0
            };
            assert.deepEqual(result, expectedResult);
        });

        it('returns Report object when the plane flew away', () => {
            const flight = bigWorld.flights['BH118'];
            let result = flightReport(bigWorld, flight, makeTime(16, 0));
            const expectedResult = {
                flight: 'BH118',
                registration: false,
                complete: true,
                countOfSeats: 36,
                reservedSeats: 1,
                registeredSeats: 0,
                countOfReservations: 1,
                countOfReverts: 0,
                percentOfReverts: 0
            };
            assert.deepEqual(result, expectedResult);
        });

        it('returns Report object with reverted ticket info', () => {
            let result = buyTicket(bigWorld, 'BH118', makeTime(5, 10), 'Ivanov I. I.');
            let newWorld = result.world;
            let ticket = result.ticket;
            newWorld = revertTicket(newWorld, ticket.id, makeTime(6, 10));
            const flight = newWorld.flights['BH118'];
            result = flightReport(newWorld, flight, makeTime(16, 0));
            const expectedResult = {
                flight: 'BH118',
                registration: false,
                complete: true,
                countOfSeats: 36,
                reservedSeats: 1,
                registeredSeats: 0,
                countOfReservations: 2,
                countOfReverts: 1,
                percentOfReverts: 50
            };
            assert.deepEqual(result, expectedResult);
        });
    });

    it('throws error when flight is not in world flights', () => {
        let emptyWorld = {
            flights: {},
            history: [],
        };
        const flight = bigWorld.flights['BH118'];
        assert.throws(() => flightReport(emptyWorld, flight, makeTime(15, 0), 'Flight not found'));
    });
});
