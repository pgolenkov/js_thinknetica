function encodeText(text) {
    const words = text.split(' ').filter(word => word);

    const unique_words = words.filter((word, index, source) => source.indexOf(word) === index);

    const use_codes = [];

    const dictionary = unique_words.map(word => {
        const count = words.filter(w => w === word).length;
        let code;
        do {
            code = Math.random().toString(36).substr(2, 2);
        } while (use_codes.some(c => c === code));
        use_codes.push(code);
        return { word, count, code };
    });

    const encodedText = words.map(word => dictionary.find(item => item.word === word).code).join(',');
    return { dictionary, encodedText };
}
