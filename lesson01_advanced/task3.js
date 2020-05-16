let source_string = prompt("Введите строку как угодно длинную", "");

let target_string = "";

while (source_string.length > 0) {
    target_string += source_string.substr(0, 80) + '\n';
    source_string = source_string.substr(80);
}

console.log(target_string);
alert("Полученная строка выведена в консоль");
