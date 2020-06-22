/**
 * @typedef {Object} Student
 * @property {string} firstName Имя
 * @property {string} lastName Фамилия
 * @property {string} patronymic Отчество
 */

function Student(name) {
    if (typeof name !== 'string')
        throw new Error('Name of student must be a string');

    [this.lastName, this.firstName, this.patronymic] = name.split(' ').filter(item => item);

    if (!this.lastName || !this.firstName)
        throw new Error('Name of student must have first name and last name');

    this.patronymic = this.patronymic || "";

    this._isHealthy = true;

    this.fullName = function() {
        return [this.lastName, this.firstName, this.patronymic].join(' ').trim();
    }

    this.shortName = function() {
        result = `${this.lastName} ${this.firstName[0]}.`;
        if (this.patronymic)
            result += `${this.patronymic[0]}.`;

        return result;
    }

    this.isHealthy = function() {
        return this._isHealthy;
    }
 }
