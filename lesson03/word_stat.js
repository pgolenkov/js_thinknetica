function wordStat(text) {
    if (typeof(text) !== 'string')
        throw 'Param must be a string';

    let words = text.split(' ').filter(item => item !== '');
    let uniqueWords = words.filter((word, index, source) => source.indexOf(word) === index);

    return uniqueWords.map(word => {
        let sum = 0;

        for (let i = 0; i < word.length; i++)
            sum += word.charCodeAt(i);

        return { word, sum }
    })
}
