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

        });
    });
});
