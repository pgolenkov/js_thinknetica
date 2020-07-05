describe("Flight", () => {
    let flight;

    beforeEach(() => {
        flight = new Flight('BH118', 36, 4, makeTime(16, 0));
    });

    describe("constructor", () => {
        it("should create new flight with correct properties", () => {
            assert.equal(flight.name, 'BH118');
            assert.equal(flight.seats, 36);
            assert.equal(flight.businessSeats, 4);
            assert.equal(flight.registrationStarts, makeTime(16, 0) - 5 * 3600 * 1000);
            assert.equal(flight.registrationEnds, makeTime(16, 0) - 1 * 3600 * 1000);
            assert.deepEqual(flight.tickets, []);
        });
    });

    describe("methods", () => {
        describe("buyTicket", () => {
            it("creates new ticket with correct information", () => {
                const ticket = flight.buyTicket(makeTime(5, 0), 'Petrov I. I.', 0);

                assert.instanceOf(ticket, Ticket);
                assert.equal(ticket.flightName(), flight.name);
                assert.equal(ticket.fullName(), 'Petrov I. I.');
                assert.equal(ticket.type(), 0);
                assert.equal(ticket.buyTime(), makeTime(5, 0));
            });

            it("adds ticket to the tickets of flight", () => {
                const ticket = flight.buyTicket(makeTime(5, 0), 'Petrov I. I.', 0);

                assert.deepEqual(flight.tickets, [ticket]);

                const otherTicket = flight.buyTicket(makeTime(5, 0), 'Ivanov I. I.', 0);

                assert.deepEqual(flight.tickets, [ticket, otherTicket]);
            });

            it("should raise error if seats not available", () => {
                flight.seats = 0;

                assert.throws(() => flight.buyTicket(makeTime(5, 0), 'Petrov I. I.', 0), 'No seats available');
            });

            it("should raise error if seats of economic type not available", () => {
                flight.seats = 5;
                flight.businessSeats = 5;

                assert.throws(() => flight.buyTicket(makeTime(5, 0), 'Petrov I. I.', 0), `No seats of type 0 available. You can choose another type`);
            });

            it("should raise error if seats of business type not available", () => {
                flight.seats = 5;
                flight.businessSeats = 0;

                assert.throws(() => flight.buyTicket(makeTime(5, 0), 'Petrov I. I.', 1), `No seats of type 1 available. You can choose another type`);
            });

            it("should raise error if buy time after registration ends", () => {
                flight.registrationEnds = makeTime(4, 59);

                assert.throws(() => flight.buyTicket(makeTime(5, 0), 'Petrov I. I.', 0), 'Time away');
            });

            it("should not raise error if buy time equal registration ends", () => {
                flight.registrationEnds = makeTime(5, 0);

                assert.doesNotThrow(() => flight.buyTicket(makeTime(5, 0), 'Petrov I. I.', 0));
            });
        });

        describe("eRegistration", () => {
            let ticket;

            beforeEach(() => {
                ticket = flight.buyTicket(makeTime(5, 0), 'Petrov I. I.', 0);
                ticket.eRegistration = function() { this.eRegistrationCalled = true };
            });

            it("calls eRegistration method of ticket found by ticketId", () => {
                flight.eRegistration(ticket.id(), 'Petrov I. I.', makeTime(12, 0));
                assert.isTrue(ticket.eRegistrationCalled);
            });

            it("should raise error if ticket not found", () => {
                assert.throws(() => flight.eRegistration(ticket.id() + '0', 'Petrov I. I.', makeTime(12, 0)), 'Ticket not found');
            });

            it("should raise error if time is less than registration starts time", () => {
                assert.throws(() => flight.eRegistration(ticket.id(), 'Petrov I. I.', flight.registrationStarts - 1), 'Registration unavailable');
            });

            it("should raise error if time is grater than registration ends time", () => {
                assert.throws(() => flight.eRegistration(ticket.id(), 'Petrov I. I.', flight.registrationEnds + 1), 'Registration unavailable');
            });

            it("should not raise error if time equal registration starts time", () => {
                assert.doesNotThrow(() => flight.eRegistration(ticket.id(), 'Petrov I. I.', flight.registrationStarts));
            });

            it("should raise error if time is equal registration ends time", () => {
                assert.throws(() => flight.eRegistration(ticket.id(), 'Petrov I. I.', flight.registrationEnds), 'Registration unavailable');
            });
        });

        describe("revertTicket", () => {
            let ticket;

            beforeEach(() => {
                ticket = flight.buyTicket(makeTime(5, 0), 'Petrov I. I.', 0);
                ticket.revert = function() { this.revertCalled = true };
            });

            it("calls revert method of ticket found by ticketId", () => {
                flight.revertTicket(ticket.id(), makeTime(12, 0));
                assert.isTrue(ticket.revertCalled);
            });

            it("should raise error if ticket not found", () => {
                assert.throws(() => flight.revertTicket(ticket.id() + '0', 'Petrov I. I.', makeTime(12, 0)), 'Ticket not found');
            });

            it('throws error if reverting unavailable by time (2 hours before flytime)', () => {
                assert.throws(() => flight.revertTicket(ticket.id(), makeTime(14, 0)), 'Reverting ticket available 3 hours before flight only');
            });

            it('does not throw error if reverting available by time (3 hours before flytime)', () => {
                assert.doesNotThrow(() => flight.revertTicket(ticket.id(), makeTime(13, 0)));
            });
        });

        describe("report", () => {
            describe('when no tickets were bought', () => {
                it('returns Report object with no reserved seats', () => {
                    let result = flight.report(makeTime(12, 0));
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
                    assert.deepEqual(result, expectedResult);
                });
            });

            describe('when ticket was bought', () => {
                let ticket;

                beforeEach(() => {
                    ticket = flight.buyTicket(makeTime(5, 10), 'Petrov I. I.');
                });

                it('returns Report object when registration available', () => {
                    let result = flight.report(makeTime(12, 0));
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
                    let result = flight.report(makeTime(10, 0));
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
                    let result = flight.report(makeTime(11, 0));
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
                    let result = flight.report(makeTime(15, 0));
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
                    let result = flight.report(makeTime(16, 0));
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
                    ticket.revert(makeTime(12, 0));
                    flight.buyTicket(makeTime(5, 10), 'Ivanov I. I.');

                    let result = flight.report(makeTime(16, 0));
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
        });

    });
});
