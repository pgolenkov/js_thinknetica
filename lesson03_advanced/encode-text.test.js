describe('encodeText', () => {
    describe('for text = "Lorem ipsum ipsum dolor."', () => {
        let text, result, dictionary, encodedText, expectedDictionary;

        before(() => {
            text = "Lorem ipsum ipsum dolor.";
            result = encodeText(text);
            dictionary = result.dictionary;
            encodedText = result.encodedText;

            expectedDictionary = [
                { word: 'Lorem', count: 1 },
                { word: 'ipsum', count: 2 },
                { word: 'dolor.', count: 1 }
            ];
        });

        it('return right dictionary length', () => {
            assert.equal(dictionary.length, expectedDictionary.length);
        });

        it('return right words and its counts', () => {
            dictionary.forEach((item, index)=> {
                assert.equal(item.word, expectedDictionary[index].word);
                assert.equal(item.count, expectedDictionary[index].count);
            });
        });

        it('return right encoded text', () => {
            const codes = dictionary.reduce((acc, item) => {
                acc[item.code] = item.word;
                return acc;
            }, {});

            console.log(codes);
            const decodedText = encodedText.split(',').map(i => codes[i]).join(' ')
            assert.equal(decodedText, text);
        });
    });

    describe('for text = "Lorem     ipsum ipsum dolor."', () => {
        let text, result, dictionary, encodedText, expectedDictionary;

        before(() => {
            text = "Lorem     ipsum ipsum dolor.";
            result = encodeText(text);
            dictionary = result.dictionary;
            encodedText = result.encodedText;

            expectedDictionary = [
                { word: 'Lorem', count: 1 },
                { word: 'ipsum', count: 2 },
                { word: 'dolor.', count: 1 }
            ];
        });

        it('return right dictionary length', () => {
            assert.equal(dictionary.length, expectedDictionary.length);
        });

        it('return right words and its counts', () => {
            dictionary.forEach((item, index)=> {
                assert.equal(item.word, expectedDictionary[index].word);
                assert.equal(item.count, expectedDictionary[index].count);
            });
        });

        it('return right encoded text', () => {
            const codes = dictionary.reduce((acc, item) => {
                acc[item.code] = item.word;
                return acc;
            }, {});

            console.log(codes);
            const decodedText = encodedText.split(',').map(i => codes[i]).join(' ')
            assert.equal(decodedText, "Lorem ipsum ipsum dolor.");
        });
    });

    describe('for text = ""', () => {
        let text, result, dictionary, encodedText, expectedDictionary;

        before(() => {
            text = "";
            result = encodeText(text);
            dictionary = result.dictionary;
            encodedText = result.encodedText;

            expectedDictionary = [];
        });

        it('return empty dictionary', () => {
            assert.deepEqual(dictionary, []);
        });

        it('return empty encoded text', () => {
            assert.equal(encodedText, "");
        });
    });
});
