describe("Ticket", () => {
    let ticket;

    beforeEach(() => {
        ticket = new Ticket('BH118-123', 'BH118', 'Petrov I. I.', 0, 1, makeTime(5, 10));
    });

    describe("constructor", () => {
        it("should create new ticket with all parameters", () => {
            assert.equal(ticket.id, 'BH118-123');
            assert.equal(ticket.flightName, 'BH118');
            assert.equal(ticket.fullName, 'Petrov I. I.');
            assert.equal(ticket.type, 0);
            assert.equal(ticket.seat, 1);
            assert.equal(ticket.buyTime, makeTime(5, 10));
        });

        it("should not change parameters after create", () => {
            ticket.id = 'BH118-321';
            ticket.flightName = 'BH811';
            ticket.fullName = 'Ivanov I.I.';
            ticket.type = 1;
            ticket.seat = 2;
            ticket.buyTime = makeTime(10, 10);

            assert.equal(ticket.id, 'BH118-123');
            assert.equal(ticket.flightName, 'BH118');
            assert.equal(ticket.fullName, 'Petrov I. I.');
            assert.equal(ticket.type, 0);
            assert.equal(ticket.seat, 1);
            assert.equal(ticket.buyTime, makeTime(5, 10));
        });
    });

    describe("methods", () => {

    });
});
