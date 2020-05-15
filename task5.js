const consonants = "BCDFGHJKLMNPQRSTVWXZ";
const vowels = "AEIOUY";

let consonants_count = 0;
let vowels_count = 0;

let input_text = prompt("Введите английский текст", "");
input_text = input_text.toUpperCase();

for (let i = 0; i < input_text.length; i++) {
    let symbol = input_text[i];

    if (consonants.indexOf(symbol) >= 0)
        consonants_count++;
    else if (vowels.indexOf(symbol) >= 0)
        vowels_count++;
}

alert(`Количество согласных букв: ${consonants_count}; количество гласных: ${vowels_count}`);
