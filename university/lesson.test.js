describe("Lesson", () => {
    let lesson, date, group;

    beforeEach(() => {
        date = new Date();
        group = new Group("632");
    });

    describe("constructor", () => {
        it("should create lesson with group and date", () => {
            lesson = new Lesson(group, date);
            expect(lesson.group).to.deep.eq(group);
            expect(lesson.date).to.eq(date);
        });

        it("should raise error if no group present", () => {
            assert.throws(() => new Lesson(), 'Invalid group');
        });

        it("should raise error if group type is incorrect", () => {
            assert.throws(() => new Lesson(5), 'Invalid group');
        });

        it("should raise error if no date present", () => {
            assert.throws(() => new Lesson(group), 'Invalid date');
        });

        it("should raise error if date is incorrect", () => {
            assert.throws(() => new Lesson(group, 5), 'Invalid date');
        });
    });

    describe("methods", () => {
        describe("presentStudentsCount", () => {
            it("returns 0 when no students in group", () => {
                lesson = new Lesson(group, date);
                expect(lesson.presentStudentsCount()).to.eq(0);
            });

            describe("when group has students", () => {
                let student1, student2, student3;

                beforeEach(() => {
                    student1 = new Student("Ivanov Ivan Ivanovich");
                    student2 = new Student("Petrov Petr Petrovich");
                    student3 = new Student("Sidorov Sidor Sidirovich");
                    group.students = [student1, student2, student3];
                });

                it("returns group students count if all students healthy", () => {
                    lesson = new Lesson(group, date);
                    expect(lesson.presentStudentsCount()).to.eq(3);
                });

                it("returns only healthy group students count", () => {
                    student2._isHealthy = false;
                    lesson = new Lesson(group, date);
                    expect(lesson.presentStudentsCount()).to.eq(2);
                });

                it("do not change present students count after change in group", () => {
                    student2._isHealthy = false;
                    lesson = new Lesson(group, date);
                    student2._isHealthy = true;
                    expect(lesson.presentStudentsCount()).to.eq(2);
                });
            });
        });

        describe("presentStudents", () => {
            it("returns empty array when no students in group", () => {
                lesson = new Lesson(group, date);
                expect(lesson.presentStudents()).to.deep.eq([]);
            });

            describe("when group has students", () => {
                let student1, student2, student3;

                beforeEach(() => {
                    student1 = new Student("Ivanov Ivan Ivanovich");
                    student2 = new Student("Petrov Petr Petrovich");
                    student3 = new Student("Sidorov Sidor Sidirovich");
                    group.students = [student1, student2, student3];
                });

                it("returns group students if all students healthy", () => {
                    lesson = new Lesson(group, date);
                    expect(lesson.presentStudents()).to.deep.eq(group.students);
                });

                it("returns only healthy group students", () => {
                    student2._isHealthy = false;
                    lesson = new Lesson(group, date);
                    expect(lesson.presentStudents()).to.deep.eq([student1, student3]);
                });

                it("do not change present students after change in group", () => {
                    student2._isHealthy = false;
                    lesson = new Lesson(group, date);
                    student2._isHealthy = true;
                    expect(lesson.presentStudents()).to.deep.eq([student1, student3]);
                });
            });
        });

        describe("absentStudents", () => {
            it("returns empty array when no students in group", () => {
                lesson = new Lesson(group, date);
                expect(lesson.absentStudents()).to.deep.eq([]);
            });

            describe("when group has students", () => {
                let student1, student2, student3;

                beforeEach(() => {
                    student1 = new Student("Ivanov Ivan Ivanovich");
                    student2 = new Student("Petrov Petr Petrovich");
                    student3 = new Student("Sidorov Sidor Sidirovich");
                    group.students = [student1, student2, student3];
                });

                it("returns empty array if all students healthy", () => {
                    lesson = new Lesson(group, date);
                    expect(lesson.absentStudents()).to.deep.eq([]);
                });

                it("returns only not healthy group students", () => {
                    student2._isHealthy = false;
                    lesson = new Lesson(group, date);
                    expect(lesson.absentStudents()).to.deep.eq([student2]);
                });

                it("do not change absent students after change in group", () => {
                    student2._isHealthy = false;
                    lesson = new Lesson(group, date);
                    student2._isHealthy = true;
                    expect(lesson.absentStudents()).to.deep.eq([student2]);
                });
            });
        });
    });
});
