/**
 * @typedef {Object} Ship
 * @property {string} name Наименование корабля
 * @property {string} model Модель корабля
 * @property {Position} position Координаты корабля
 * @property {number} distance Пройденная дистанция корабля
 * @property {Dock} dock Пристань, к которой пришвартован корабль
 */

function Ship(name, model, x, y) {
    if (typeof name !== 'string' || typeof model !== 'string')
        throw new Error('Ship name and model must be strings');
        
    if (!Number.isInteger(x) || !Number.isInteger(y))
        throw new Error('Ship coordinates must be integers');

    this.name = name;
    this.model = model;
    this.position = new Position(x, y);
    this.distance = 0;
    this._isAnchorDropped = false;
    this.dock = null;

    this.move = function(direction) {
        if (!['n', 's', 'w', 'e'].includes(direction))
            throw new Error('Invalid direction');

        if (this.isAnchorDropped() || this.dock)
            return false;

        switch (direction) {
            case 'n': {
                this.position.y--;
                break;
            }
            case 's': {
                this.position.y++;
                break;
            }
            case 'w': {
                this.position.x--;
                break;
            }
            case 'e': {
                this.position.x++;
                break;
            }
        };

        this.distance++;

        return true;
    };

    this.moveTo = function(x, y) {
        if (!Number.isInteger(x) || !Number.isInteger(y))
            throw new Error('Invalid target');

        if (this.isAnchorDropped())
            throw new Error('Cannot move because anchor dropped');

        if (this.dock)
            throw new Error('Cannot move because ship moored');

        this.distance += Math.abs(x - this.position.x) + Math.abs(y - this.position.y);

        this.position.x = x;
        this.position.y = y;

        return true;
    };

    this.dropAnchor = function() {
        if (this._isAnchorDropped)
            return false;

        this._isAnchorDropped = true;
        return true;
    };

    this.riseAnchor = function() {
        if (!this._isAnchorDropped)
            return false;

        this._isAnchorDropped = false;
        return true;
    };

    this.isAnchorDropped = function() {
        return this._isAnchorDropped;
    }
}
