describe("Student", () => {
    describe("constructor", () => {
        it("should create student with first, last names and patronymic", () => {
            const student = new Student("Ivanov Ivan Ivanovich");
            expect(student.firstName).to.eq("Ivan");
            expect(student.lastName).to.eq("Ivanov");
            expect(student.patronymic).to.eq("Ivanovich");
        });

        it("should throw extra spaces", () => {
            const student = new Student(" Ivanov   Ivan  Ivanovich ");
            expect(student.firstName).to.eq("Ivan");
            expect(student.lastName).to.eq("Ivanov");
            expect(student.patronymic).to.eq("Ivanovich");
        });

        it("should create student with empty patronymic if no patronymic", () => {
            const student = new Student("Smith John");
            expect(student.firstName).to.eq("John");
            expect(student.lastName).to.eq("Smith");
            expect(student.patronymic).to.eq("");
        });

        it("should raise error no last name present", () => {
            assert.throws(() => new Student("Ivan"), 'Invalid name');
        });

        it("should raise error no name present", () => {
            assert.throws(() => new Student(), 'Invalid name');
        });

        it("should raise error if parameter type is incorrect", () => {
            assert.throws(() => new Student(5), 'Invalid name');
        });
    });
    
    describe("methods", () => {
        const student = new Student("Ivanov Ivan Ivanovich");

        describe("fullName", () => {
            it("returns full name of student", () => {
                expect(student.fullName()).to.eq("Ivanov Ivan Ivanovich");
            });

            it("returns full name of student without patronymic", () => {
                const englishStudent = new Student("Smith John");
                expect(englishStudent.fullName()).to.eq("Smith John");
            });
        });

        describe("shortName", () => {
            it("returns short name of student", () => {
                expect(student.shortName()).to.eq("Ivanov I.I.");
            });

            it("returns short name of student without patronymic", () => {
                const englishStudent = new Student("Smith John");
                expect(englishStudent.shortName()).to.eq("Smith J.");
            });
        });

        describe("isHealthy", () => {
            it("returns true if student is healthy", () => {
                assert.isTrue(student.isHealthy());
            });

            it("returns false if student is not healthy", () => {
                student._isHealthy = false;
                assert.isFalse(student.isHealthy());
            });
        });
    });
});
