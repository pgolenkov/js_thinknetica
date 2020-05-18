function words_with_charsum(text) {
    let words = text.split(' ');

    return words.map(word => {
        let sum = 0;

        for (let i = 0; i < word.length; i++)
            sum += word.charCodeAt(i);

        return { word, sum }
    })
}

console.log(words_with_charsum('Lorem ipsum dolor sit amet.'));
