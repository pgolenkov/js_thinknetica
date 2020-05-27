describe('eRegistration', () => {
    let bigWorld = {
        flights: {},
        history: [],
    };

    let ticket;

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

        result = buyTicket(bigWorld, 'BH118', makeTime(5, 10), 'Petrov I. I.');
        bigWorld = result.world;
        ticket = result.ticket;
    });

    describe('when ticketNumber and fullName are correct', () => {
        it('returns World object with registered ticket when registation available', () => {
            const nowTime = makeTime(12, 0);
            let newWorld = eRegistration(bigWorld, ticket.id, 'Petrov I. I.', nowTime);
            const registrationTime = newWorld.flights['BH118'].tickets[0].registrationTime;
            assert.equal(registrationTime, nowTime);
        });

        it('returns World object with registered ticket when registation starts (5 hours before flytime)', () => {
            const nowTime = makeTime(11, 0);
            let newWorld = eRegistration(bigWorld, ticket.id, 'Petrov I. I.', nowTime);
            const registrationTime = newWorld.flights['BH118'].tickets[0].registrationTime;
            assert.equal(registrationTime, nowTime);
        });

        it('throws error if registration unavailable by time (6 hours before flytime)', () => {
            const nowTime = makeTime(10, 0);
            assert.throws(() => eRegistration(bigWorld, ticket.id, 'Petrov I. I.', nowTime), 'Registration unavailable');
        });

        it('throws error if try register after end of registration', () => {
            const nowTime = makeTime(16, 0);
            assert.throws(() => eRegistration(bigWorld, ticket.id, 'Petrov I. I.', nowTime), 'Registration unavailable');
        });

        it('throws error if registration ends (1 hours before flytime)', () => {
            const nowTime = makeTime(15, 0);
            assert.throws(() => eRegistration(bigWorld, ticket.id, 'Petrov I. I.', nowTime), 'Registration unavailable');
        });

        it('throws error when ticket is already registered in flight', () => {
            let newWorld = eRegistration(bigWorld, ticket.id, 'Petrov I. I.', makeTime(12, 0));
            assert.throws(() => eRegistration(newWorld, ticket.id, 'Petrov I. I.', makeTime(13, 0)), 'Ticket has already been registered');
        });
    });

    it('throws error when ticket number is invalid', () => {
        const nowTime = makeTime(12, 0);
        assert.throws(() => eRegistration(bigWorld, 'BH1123', 'Petrov I. I.', nowTime), 'Ticket number is invalid');
    });

    it('throws error when flight is not found', () => {
        const nowTime = makeTime(12, 0);
        assert.throws(() => eRegistration(bigWorld, 'BH108-123', 'Petrov I. I.', nowTime), 'Flight not found');
    });

    it('throws error when ticket is not found in flight', () => {
        const nowTime = makeTime(12, 0);
        assert.throws(() => eRegistration(bigWorld, 'BH118-123', 'Petrov I. I.', nowTime), 'Ticket not found in flight');
    });
});
