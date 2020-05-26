describe('wordStat', () => {
    it('returns right result for "Lorem ipsum dolor sit amet."', () => {
        const text = "Lorem ipsum dolor sit amet.";
        const result = wordStat(text);
        const expectedResult = [
            { word: 'Lorem', sum: 511 },
            { word: 'ipsum', sum: 558 },
            { word: 'dolor', sum: 544 },
            { word: 'sit', sum: 336 },
            { word: 'amet.', sum: 469 }
        ];
        assert.deepEqual(result, expectedResult);
    });

    it('returns right result for "ipsum Lorem ipsum dolor sit dolor sir amet."', () => {
        const text = "ipsum Lorem ipsum dolor sit dolor sir amet.";
        const result = wordStat(text);
        const expectedResult = [
            { word: 'ipsum', sum: 558 },
            { word: 'Lorem', sum: 511 },
            { word: 'dolor', sum: 544 },
            { word: 'sit', sum: 336 },
            { word: 'sir', sum: 334 },
            { word: 'amet.', sum: 469 }
        ];
        assert.deepEqual(result, expectedResult);
    });

    it('returns right result for " ipsum   Lorem dolor   sir "', () => {
        const text = " ipsum   Lorem dolor   sir ";
        const result = wordStat(text);
        const expectedResult = [
            { word: 'ipsum', sum: 558 },
            { word: 'Lorem', sum: 511 },
            { word: 'dolor', sum: 544 },
            { word: 'sir', sum: 334 }
        ];
        assert.deepEqual(result, expectedResult);
    });

    it('returns empty result for empty string', () => {
        const text = "  ";
        const result = wordStat(text);
        const expectedResult = [];
        assert.deepEqual(result, expectedResult);
    });

    it('throw error for invalid param', () => {
        assert.throws(() => wordStat(5), 'Param must be a string');
    });

    it('throw error for invalid param', () => {
        assert.throws(() => wordStat({ somefield: 'somevalue' }), 'Param must be a string');
    });
});
