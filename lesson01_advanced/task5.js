const source_text = 'The syntax of Java is largely influenced by C++. Unlike C++, Java does not support operator overloading. Java uses comments similar to those of C++';

const wordA = 'Java';
const wordB = 'JS';
const wordC = 'overloading';

let target_text = '';
let sentences = source_text.split('.');

for (let i = 0; i < sentences.length; i++) {
    let sentence = sentences[i];

    if (sentence.indexOf(wordC) > -1)
        sentence = sentence.replace(wordA, wordB);

    target_text += sentence + '.';
}

console.log(target_text);
