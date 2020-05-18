let source_string = prompt("Введите строку как угодно длинную", "");
let words = source_string.split(' ');

let target_string = "";
let line = "";

for (let word of words) {
    if (line.length + word.length > 80) {
        target_string += line.trim() + '\n';
        line = "";
    } else
        line += word + ' ';
}

console.log(target_string);
alert("Полученная строка выведена в консоль");
