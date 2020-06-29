/**
 * @typedef {Object} Lesson
 * @property {Group} group Группа
 * @property {Date} date Дата
 */

function Lesson(group, date) {
    if (!(group instanceof Group))
        throw new Error('Invalid group');

    if (!(date instanceof Date))
        throw new Error('Invalid date');

    this.group = group;
    this.date = date;
    this._presentStudents = group.students.filter(student => student.isHealthy());
    this._absentStudents = group.absentStudents();

    this.presentStudentsCount = function() {
        return this._presentStudents.length;
    }

    this.presentStudents = function() {
        return this._presentStudents;
    }

    this.absentStudents = function() {
        return this._absentStudents;
    }
}
