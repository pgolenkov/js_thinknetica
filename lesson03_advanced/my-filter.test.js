describe('myFilter', () => {
    it('emulate filter for array = [1, 2, 3, 4, 5, 6] and select even func', () => {
        const array = [1, 2, 3, 4, 5, 6];
        const result = myFilter(array, item => item % 2 === 0);
        assert.deepEqual(result, [2, 4, 6]);
    });

    it('emulate filter for array = [-1, -2, 3, 0, 4, -5, 6] and select positive func', () => {
        const array = [-1, -2, 3, 0, 4, -5, 6];
        const result = myFilter(array, item => item > 0);
        assert.deepEqual(result, [3, 4, 6]);
    });

    it('emulate filter for array = [-1.5, 0.5, 3.2, 4.3, -5, 6] and select positive func', () => {
        const array = [-1.5, 0.5, 3.2, 4.3, -5, 6];
        const result = myFilter(array, item => item > 0);
        console.log(result)
        assert.deepEqual(result, [0.5, 3.2, 4.3, 6]);
    });

    it('emulate filter for array = []', () => {
        const array = [];
        const result = myFilter(array, item => item > 0);
        assert.deepEqual(result, []);
    });

    it('throw error for array = ["a", 5]', () => {
        assert.throws(() => myFilter(["a", 5], item => item > 0), 'Param must be an array of numbers');
    });

    it('throw error for array = [Infinity, 5]', () => {
        assert.throws(() => myFilter([Infinity, 5], item => item > 0), 'Param must be an array of numbers');
    });

    it('throw error for no array param', () => {
        assert.throws(() => myFilter(5, item => item > 0), 'Param must be an array of numbers');
    });
})
