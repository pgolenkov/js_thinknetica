describe('myMap', () => {
    it('emulate map for array = [1, 2, 3, 4, 5, 6] and item * 2 func', () => {
        const array = [1, 2, 3, 4, 5, 6];
        const result = myMap(array, item => item * 2);
        assert.deepEqual(result, [2, 4, 6, 8, 10, 12]);
    });

    it('emulate map for array = [1, 2, 3, 4, 5, 6] and item ** 2 func', () => {
        const array = [1, 2, 3, 4, 5, 6];
        const result = myMap(array, item => item ** 2);
        assert.deepEqual(result, [1, 4, 9, 16, 25, 36]);
    });

    it('emulate map for array = [-1.5, 0.5, 3.2, 4.3, 5, 6] and item * 3 func', () => {
        const array = [-1.5, 0.5, 3.2, 4.3, 5, 6];
        const result = myMap(array, item => item * 3);
        console.log(result)
        assert.deepEqual(result, [-4.5, 1.5, 9.6, 12.9, 15, 18]);
    });

    it('emulate map for array = []', () => {
        const array = [];
        const result = myMap(array, item => item * 3);
        assert.deepEqual(result, []);
    });

    it('throw error for array = ["a", 5]', () => {
        assert.throws(() => myMap(["a", 5], item => item * 3), 'Param must be an array of numbers');
    });

    it('throw error for array = [Infinity, 5]', () => {
        assert.throws(() => myMap([Infinity, 5], item => item * 3), 'Param must be an array of numbers');
    });

    it('throw error for no array param', () => {
        assert.throws(() => myMap(5, item => item * 3), 'Param must be an array of numbers');
    });
})
