describe('sumOfPositive', () => {
    it('counts for array = [-91, -93, -45, 67, 96, 40, -34, 96, -42, 58]', () => {
        const array = [-91, -93, -45, 67, 96, 40, -34, 96, -42, 58];
        const result = sumOfPositive(array);
        assert.deepEqual(result, { count: 5, sum: 357 });
    });

    it('counts for array = [-32, -93, -45, 57, 106, 45, -24]', () => {
        const array = [-32, -93, 57, -45, 106, 45, -24];
        const result = sumOfPositive(array);
        assert.deepEqual(result, { count: 3, sum: 208 });
    });

    it('counts for array = [-3.2, 5.7, -10.6, 5.2]', () => {
        const array = [-3.2, 5.7, -10.6, 5.2];
        const result = sumOfPositive(array);
        assert.deepEqual(result, { count: 2, sum: 10.9 });
    });

    it('counts for array = []', () => {
        const result = sumOfPositive([]);
        assert.deepEqual(result, { count: 0, sum: 0 });
    });

    it('counts for array = [0, 5, 6]', () => {
        const result = sumOfPositive([0, 5, 6]);
        assert.deepEqual(result, { count: 2, sum: 11 });
    });

    it('counts for array = [-5, -5, -2]', () => {
        const result = sumOfPositive([-5, -5, -2]);
        assert.deepEqual(result, { count: 0, sum: 0 });
    });

    it('throw error for array = ["a", 5]', () => {
        assert.throws(() => sumOfPositive(["a", 5]), 'Param must be an array of numbers');
    });

    it('throw error for no array param', () => {
        assert.throws(() => sumOfPositive(5), 'Param must be an array of numbers');
    });
})
