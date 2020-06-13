describe("Ship", () => {
    describe("constructor", () => {
        it("should create ship with correct parameters", () => {
            ship = new Ship("Name", "Model", 5, 2);
            assert.equal(ship.name, "Name");
            assert.equal(ship.model, "Model");
            assert.deepEqual(ship.position, { x: 5, y: 2});
            assert.equal(ship.distance, 0);
            assert.isFalse(ship._isAnchorDropped);
        });

        it("should raise error no parameters present", () => {
            assert.throws(() => new Ship(), 'Invalid parameters');
        });

        it("should raise error if string parameters types are incorrect", () => {
            assert.throws(() => new Ship(1, 2, 3, 5), 'Invalid parameters');
        });

        it("should raise error if number parameters type are incorrect", () => {
            assert.throws(() => new Ship("Name", "Model", "something"), 'Invalid parameters');
        });

        it("should raise error if positions are Float", () => {
            assert.throws(() => new Ship("Name", "Model", 2.5, 3.5), 'Invalid parameters');
        });

        it("should raise error if not all positions present", () => {
            assert.throws(() => new Ship("Name", "Model", 3), 'Invalid parameters');
        });

        it("should raise error if position not a number", () => {
            assert.throws(() => new Ship("Name", "Model", Infinity, 3), 'Invalid parameters');
        });
    });

    describe("ship's methods", ()=> {
        let ship;

        beforeEach(() => {
            ship = new Ship("Name", "Model", 5, 2);
        });

        describe("move", () => {
            it("can move ship to the north", () => {
                ship.move('n');
                assert.deepEqual(ship.position, { x: 5, y: 1 });
            });

            it("can move ship to the south", () => {
                ship.move('s');
                assert.deepEqual(ship.position, { x: 5, y: 3 });
            });

            it("can move ship to the west", () => {
                ship.move('w');
                assert.deepEqual(ship.position, { x: 4, y: 2 });
            });

            it("can move ship to the east", () => {
                ship.move('e');
                assert.deepEqual(ship.position, { x: 6, y: 2 });
            });

            it("should increase distance", () => {
                ['n', 's', 'w', 'e'].forEach(direction => {
                    const prev_distance = ship.distance;
                    ship.move(direction);
                    expect(ship.distance).to.equal(prev_distance + 1);
                });
            });

            it("returns true if ship moved", () => {
                ['n', 's', 'w', 'e'].forEach(direction => assert.isOk(ship.move(direction)));
            });

            it("returns false if ship cannot to be moved (anchor dropped)", () => {
                ship.dropAnchor();
                ['n', 's', 'w', 'e'].forEach(direction => assert.isFalse(ship.move(direction)));
            });

            it("shoud not move if anchor dropped", () => {
                ship.dropAnchor();
                ['n', 's', 'w', 'e'].forEach(direction => {
                    expect(() => ship.move(direction)).to.not.change(ship.position, 'x');
                    expect(() => ship.move(direction)).to.not.change(ship.position, 'y');
                });
            });

            it("shoud not move if ship moored", () => {
                const dock = new Dock(5, 2);
                dock.moor(ship);
                ship.riseAnchor();

                ['n', 's', 'w', 'e'].forEach(direction => {
                    expect(() => ship.move(direction)).to.not.change(ship.position, 'x');
                    expect(() => ship.move(direction)).to.not.change(ship.position, 'y');
                });
            });

            it("should raise error if no direction", () => {
                assert.throws(() => ship.move(), 'Invalid direction');
            });

            it("should raise error if direction is not n,s,w,e", () => {
                assert.throws(() => ship.move('r'), 'Invalid direction');
            });

            it("should raise error if direction is not n,s,w,e", () => {
                assert.throws(() => ship.move(5), 'Invalid direction');
            });
        });

        describe("moveTo", () => {
            it("moves ship to the target", () => {
                ship.moveTo(7, 5);
                assert.deepEqual(ship.position, { x: 7, y: 5 });
            });

            it("should increase distance", () => {
                const prev_distance = ship.distance;
                ship.moveTo(7, 5);
                expect(ship.distance).to.equal(prev_distance + (7-5) + (5-2));
            });

            it("should increase distance when position decreased", () => {
                const prev_distance = ship.distance;
                ship.moveTo(2, 0);
                expect(ship.distance).to.equal(prev_distance + (5-2) + (2-0));
            });

            it("returns true if ship moved", () => {
                assert.isOk(ship.moveTo(2, 3));
            });

            it("should raise error when anchor dropped", () => {
                ship.dropAnchor();
                assert.throws(() => ship.moveTo(2, 3), 'Cannot move because anchor dropped');
            });

            it("should raise error when ship moored", () => {
                const dock = new Dock(5, 2);
                dock.moor(ship);
                ship.riseAnchor();

                assert.throws(() => ship.moveTo(2, 3), 'Cannot move because ship moored');
            });

            it("should raise error if no target", () => {
                assert.throws(() => ship.moveTo(), 'Invalid target');
            });

            it("should raise error if target is not full", () => {
                assert.throws(() => ship.moveTo(4), 'Invalid target');
            });

            it("should raise error if type of target coordinates are invalid", () => {
                assert.throws(() => ship.moveTo(4, 'a'), 'Invalid target');
            });

            it("should raise error if type of target coordinates are invalid", () => {
                assert.throws(() => ship.moveTo(Infinity, 3), 'Invalid target');
            });

            it("should raise error if type of target coordinates are invalid", () => {
                assert.throws(() => ship.moveTo(2.5, 3), 'Invalid target');
            });
        });

        describe("dropAnchor", () => {
            it("drops anchor", () => {
                ship.dropAnchor();
                assert.isTrue(ship.isAnchorDropped());
            });

            it("returns true if anchor dropped", () => {
                assert.isTrue(ship.dropAnchor());
            });

            it("returns false if anchor dropped before", () => {
                ship.dropAnchor();
                assert.isFalse(ship.dropAnchor());
            });
        });

        describe("riseAnchor", () => {
            beforeEach(() => ship.dropAnchor());

            it("rises anchor if it dropped", () => {
                ship.riseAnchor();
                assert.isFalse(ship.isAnchorDropped());
            });

            it("returns true if anchor rised", () => {
                assert.isTrue(ship.riseAnchor());
            });

            it("returns false if anchor rised before", () => {
                ship.riseAnchor();
                assert.isFalse(ship.riseAnchor());
            });
        });

        describe("isAnchorDropped", () => {
            it("returns false if not anchor dropped", () => {
                assert.isFalse(ship.isAnchorDropped());
            });

            it("returns true if anchor dropped", () => {
                ship.dropAnchor();
                assert.isTrue(ship.isAnchorDropped());
            });
        });
    });


});
