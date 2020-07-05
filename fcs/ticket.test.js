describe("Ticket", () => {
    let ticket;

    beforeEach(() => {
        ticket = new Ticket('BH118-123', 'BH118', 'Petrov I. I.', 0, 1, makeTime(5, 10));
    });

    describe("constructor", () => {
        it("should create new ticket with all parameters", () => {
            assert.equal(ticket.id(), 'BH118-123');
            assert.equal(ticket.flightName(), 'BH118');
            assert.equal(ticket.fullName(), 'Petrov I. I.');
            assert.equal(ticket.type(), 0);
            assert.equal(ticket.seat(), 1);
            assert.equal(ticket.buyTime(), makeTime(5, 10));
        });
    });

    describe("methods", () => {
        describe('eRegistration', () => {
            it('set registrationTime property of ticket if all ok', () => {
                const nowTime = makeTime(12, 0);
                ticket.eRegistration('Petrov I. I.', nowTime);

                assert.equal(ticket.registrationTime(), nowTime);
            });

            it('throws error when ticket fullName and param fullName are different', () => {
                assert.throws(() => ticket.eRegistration('Ivanov I. I.', makeTime(12, 0)), 'Fullname is incorrect');
            });

            it('throws error when ticket is already registered in flight', () => {
                ticket.eRegistration('Petrov I. I.', makeTime(12, 0));
                assert.throws(() => ticket.eRegistration('Petrov I. I.', makeTime(13, 0)), 'Ticket has already been registered');
            });
        });

        describe('revert', () => {
            it('set revertTime property of ticket if all ok', () => {
                const nowTime = makeTime(12, 0);
                ticket.revert(nowTime);

                assert.equal(ticket.revertTime(), nowTime);
            });

            it('throws error if reverting unavailable by class', () => {
                ticket._type = 1;
                assert.throws(() => ticket.revert(makeTime(12, 0)), 'Reverting ticket not available for business class');
            });

            it('throws error when ticket is already reverted', () => {
                ticket.revert(makeTime(12, 0));
                assert.throws(() => ticket.revert(makeTime(12, 0)), 'Ticket was reverted before');
            });
        });
    });
});
