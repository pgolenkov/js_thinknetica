describe('flightDetails', () => {
    let initWorld = {
        flights: {},
        history: [],
    };

    let bigWorld, ticket, container;

    before(() => {
        let result = addFlight(
            initWorld,
            {
                name: 'Airbus 747',
                seats: 36,
                businessSeats: 4,
            },
            makeTime(16, 0),
            'BH118'
        );
        initWorld = result.world;

        container = document.createElement('div');
        container.setAttribute("id", "flight-details");
        document.body.append(container);
    });

    beforeEach(() => {
        bigWorld = initWorld;
    });

    afterEach(() => {
        container.innerHTML = '';
    });

    after(() => {
        container.remove();
    })

    it('puts in container report of flight', () => {
        flightDetails(bigWorld, 'BH118');
        const flight = bigWorld.flights['BH118'];
        const nowTime = new Date().getTime();
        const report = flightReport(bigWorld, flight, nowTime);

        for (let field in report)
            assert.include(container.textContent, `${field}: ${report[field]}`);
    });

    it('puts in container message "No tickets reserved" instead table when no tickets', () => {
        flightDetails(bigWorld, 'BH118');

        const ticketTable = container.querySelector('table');

        assert.isNull(ticketTable);
        assert.include(container.textContent, "No tickets reserved");
    });

    describe('when some tickets reserved', () => {
        beforeEach(() => {
            let result = buyTicket(bigWorld, 'BH118', makeTime(5, 10), 'Petrov I. I.');
            bigWorld = result.world;
            result = buyTicket(bigWorld, 'BH118', makeTime(5, 10), 'Ivanov I. I.');
            bigWorld = result.world;
            ticket = result.ticket;
            bigWorld = eRegistration(bigWorld, ticket.id, 'Ivanov I. I.', makeTime(12, 10));
        })

        it('puts in container table with tickets info', () => {
            flightDetails(bigWorld, 'BH118');
            const flight = bigWorld.flights['BH118'];
            const nowTime = new Date().getTime();
            const report = flightReport(bigWorld, flight, nowTime);

            const ticketFields = ['id', 'seat', 'fullName', 'registrationTime'];

            const ticketTable = container.querySelector('table');
            const rows = ticketTable.querySelectorAll('tr');

            assert.equal(rows.length, flight.tickets.length + 1);
            assert.equal(rows[0].textContent, ticketFields.join(''));

            flight.tickets.forEach((t, index) => {
                assert.equal(rows[index + 1].textContent, [t.id, t.seat, t.fullName, t.registrationTime ? t.registrationTime : '-'].join(''));
            });
        });

        it('does not put in container not active tickets', () => {
            const newWorld = revertTicket(bigWorld, ticket.id, makeTime(6, 0));

            flightDetails(newWorld, 'BH118');

            const ticketTable = container.querySelector('table');
            const rows = ticketTable.querySelectorAll('tr');

            assert.equal(rows.length, 2);
            assert.notInclude(rows[1].textContent, ticket.id);
        });

        it('puts in container message "No tickets reserved" instead table when no active tickets', () => {
            const flight = bigWorld.flights['BH118'];
            let newWorld = revertTicket(bigWorld, flight.tickets[0].id, makeTime(6, 0));
            newWorld = revertTicket(newWorld, flight.tickets[1].id, makeTime(6, 0));

            flightDetails(newWorld, 'BH118');

            const ticketTable = container.querySelector('table');

            assert.isNull(ticketTable);
            assert.include(container.textContent, "No tickets reserved");
        });
    });

    it('throw error if flight not found', () => {
        assert.throws(() => flightDetails(bigWorld, 'BH119'), 'Flight not found');
    });

    it('throw error if container not found', () => {
        container.remove();

        assert.throws(() => flightDetails(bigWorld, 'BH118'), 'Container with id ="flight-details" is not found in the document');

        document.body.append(container);
    });
});
