describe("Group", () => {
    let group;

    describe("constructor", () => {
        it("should create group with number as string", () => {
            group = new Group("Group1");
            expect(group.number).to.eq("Group1");
        });

        it("should create group with number as integer", () => {
            group = new Group(632);
            expect(group.number).to.eq("632");
        });

        it("should create group empty studets list", () => {
            group = new Group("Group1");
            expect(group.students).to.deep.eq([]);
        });

        it("should raise error no number present", () => {
            assert.throws(() => new Group(), 'Invalid group number');
        });
    });

    describe("methods", () => {
        let student1, student2, student3;

        beforeEach(() => {
          group = new Group("Group1");
          student1 = new Student("Ivanov Ivan Ivanovich");
          student2 = new Student("Petrov Petr Petrovich");
          student3 = new Student("Sidorov Sidor Sidirovich");
        });

        describe("absentStudents", () => {
            it("returns empty list when no students in group", () => {
                expect(group.absentStudents()).to.deep.eq([]);
            });

            it("returns empty list when all students are healthy", () => {
                group.students = [student1, student2, student3];

                expect(group.absentStudents()).to.deep.eq([]);
            });

            it("returns only ill students of group", () => {
                group.students = [student1, student2, student3];
                student2._isHealthy = false;
                student3._isHealthy = false;

                expect(group.absentStudents()).to.deep.eq([student2, student3]);
            });
        });
    });
});
