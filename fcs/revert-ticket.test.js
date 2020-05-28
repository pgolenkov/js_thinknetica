describe('revertTicket', () => {
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

    describe('when ticketNumber is correct', () => {
        it('returns World object with reverted ticket when 4 hours before flytime', () => {
            const nowTime = makeTime(12, 0);
            let newWorld = revertTicket(bigWorld, ticket.id, nowTime);
            const revertTime = newWorld.flights['BH118'].tickets[0].revertTime;
            assert.equal(revertTime, nowTime);
        });

        it('returns World object with reverted ticket when 3 hours before flytime', () => {
            const nowTime = makeTime(13, 0);
            let newWorld = revertTicket(bigWorld, ticket.id, nowTime);
            const revertTime = newWorld.flights['BH118'].tickets[0].revertTime;
            assert.equal(revertTime, nowTime);
        });

        it('throws error if reverting unavailable by time (2 hours before flytime)', () => {
            const nowTime = makeTime(14, 0);
            assert.throws(() => revertTicket(bigWorld, ticket.id, nowTime), 'Reverting ticket available 3 hours before flight only');
        });

        it('throws error if reverting unavailable by class', () => {
            let result = buyTicket(bigWorld, 'BH118', makeTime(5, 10), 'Ivanov I. I.', 1);
            let newWorld = result.world;
            let businessTicket = result.ticket;
            const nowTime = makeTime(12, 0);
            assert.throws(() => revertTicket(newWorld, businessTicket.id, nowTime), 'Reverting ticket not available for business class');
        });

        it('throws error if try to revert reverted ticket', () => {
            let nowTime = makeTime(11, 0);
            let newWorld = revertTicket(bigWorld, ticket.id, nowTime);
            nowTime = makeTime(12, 0);
            assert.throws(() => revertTicket(newWorld, ticket.id, nowTime), 'Ticket was reverted before');
        });
    });

    it('throws error when ticket number is invalid', () => {
        const nowTime = makeTime(12, 0);
        assert.throws(() => revertTicket(bigWorld, 'BH1123', nowTime), 'Ticket number is invalid');
    });

    it('throws error when flight is not found', () => {
        const nowTime = makeTime(12, 0);
        assert.throws(() => revertTicket(bigWorld, 'BH108-123', nowTime), 'Flight not found');
    });

    it('throws error when ticket is not found in flight', () => {
        const nowTime = makeTime(12, 0);
        assert.throws(() => revertTicket(bigWorld, 'BH118-123', nowTime), 'Ticket not found in flight');
    });
});
