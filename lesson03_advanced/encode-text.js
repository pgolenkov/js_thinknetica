function encodeText(text) {
    const words = text.split(' ').filter(word => word);

    const unique_words = words.filter((word, index, source) => source.indexOf(word) === index);

    const dictionary = unique_words.reduce((acc, unique_word) => {
        const count = words.filter(word => word === unique_word).length;
        let exists;
        let code;
        do {
            code = Math.random().toString(36).substr(2, 2);
            exists = acc.some(item => item.code === code);
        } while (exists);
        acc.push({ word: unique_word, count, code });
        return acc;
    }, [])

    const encodedText = words.map(word => dictionary.find(item => item.word === word).code).join(',');
    return { dictionary, encodedText };
}
