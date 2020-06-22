/**
 * @typedef {Object} Dock
 * @property {Position} position Координаты пристани
 * @property {Ship[]} ships Пришвартованные корабли
 */

function Dock(x, y) {
    if (!Number.isInteger(x) || !Number.isInteger(y))
        throw new Error('Dock coordinates must be integers');

    this.position = new Position(x, y);
    this.ships = [];

    this.moor = function(ship) {
        if (ship.dock === this)
            throw new Error('Ship already moored in the dock');

        if (ship.dock)
            throw new Error('Ship moored at the other dock');

        if (ship.position.x !== this.position.x || ship.position.y !== this.position.y)
            throw new Error('Ship position must equal dock position');

        ship.dropAnchor();
        ship.dock = this;
        this.ships.push(ship);
    };

    this.unmoor = function(ship) {
        if (ship.position.x !== this.position.x || ship.position.y !== this.position.y)
            throw new Error('Ship is not in the dock');

        if (!ship.dock)
            throw new Error('Ship already unmoored from the dock');

        if (ship.dock !== this)
            throw new Error('Ship moored at the other dock');

        ship.riseAnchor();
        ship.dock = null;
        this.ships.splice(this.ships.indexOf(ship), 1);
    }
};
