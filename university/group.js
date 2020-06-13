/**
 * @typedef {Object} Group
 * @property {string} number Номер
 * @property {Student[]} students Список студентов
 */

function Group(number) {
    if (!number)
        throw new Error('Invalid group number');

    this.number = `${number}`;
    this.students = [];

    this.absentStudents = function() {
        return this.students.filter(student => !student.isHealthy());
    }
}
