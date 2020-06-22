describe("Dock", () => {
    describe("constructor", () => {
        it("should create dock with correct parameters", () => {
            dock = new Dock(5, 2);
            assert.deepEqual(dock.position, { x: 5, y: 2});
            assert.deepEqual(dock.ships, []);
        });

        it("should raise error no parameters present", () => {
            assert.throws(() => new Dock(), 'Dock coordinates must be integers');
        });

        it("should raise error if number parameters type are incorrect", () => {
            assert.throws(() => new Dock("Name", "Model"), 'Dock coordinates must be integers');
        });

        it("should raise error if positions are Float", () => {
            assert.throws(() => new Dock(2.5, 3.5), 'Dock coordinates must be integers');
        });

        it("should raise error if not all positions present", () => {
            assert.throws(() => new Dock(3), 'Dock coordinates must be integers');
        });

        it("should raise error if position not a number", () => {
            assert.throws(() => new Dock(Infinity, 3), 'Dock coordinates must be integers');
        });
    });

    describe("dock's methods", ()=> {
        let dock;
        let ship;

        beforeEach(() => {
            dock = new Dock(10, 15);
            ship = new Ship("Name", "Model", 5, 2);
        });

        describe("moor", () => {
            describe("when ship position equal docks position", () => {
                beforeEach(() => {
                    ship.moveTo(10, 15);
                    dock.moor(ship);
                });

                it("adds the ship to the dock's ships", () => {
                    assert.include(dock.ships, ship);
                });

                it("drops the anchor of the ship", () => {
                    assert.isTrue(ship.isAnchorDropped());
                });

                it("sets the dock of the ship", () => {
                    assert.deepEqual(ship.dock, dock);
                });

                it("raises error when ship already moored in the dock", () => {
                    assert.throws(() => dock.moor(ship), 'Ship already moored in the dock');
                });

                it("raises error when ship already moored at the other dock in same coordinates", () => {
                    otherDock = new Dock(10, 15);
                    assert.throws(() => otherDock.moor(ship), 'Ship moored at the other dock');
                });
            });

            it("raises error when ship position not equal docks position", () => {
                assert.throws(() => dock.moor(ship), 'Ship position must equal dock position');
            });
        });

        describe("unmoor", () => {
            describe("when ship was moored in the dock", () => {
                beforeEach(() => {
                    ship.moveTo(10, 15);
                    dock.moor(ship);
                    dock.unmoor(ship);
                });

                it("remove the ship from the dock's ships", () => {
                    assert.notInclude(dock.ships, ship);
                });

                it("removes the dock of the ship", () => {
                    assert.isNull(ship.dock);
                });

                it("rises the anchor of the ship", () => {
                    assert.isFalse(ship.isAnchorDropped());
                });

                it("raises error when ship already unmoored in the dock", () => {
                    assert.throws(() => dock.unmoor(ship), 'Ship already unmoored from the dock');
                });

                it("raises error when ship moored at the other dock", () => {
                    otherDock = new Dock(10, 15);
                    otherDock.moor(ship);
                    assert.throws(() => dock.unmoor(ship), 'Ship moored at the other dock');
                });
            });

            it("raises error when ship is not near dock", () => {
                assert.throws(() => dock.unmoor(ship), 'Ship is not in the dock');
            });
        });
    });
});
