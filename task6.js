let input_text = prompt("Введите слово", "");
let output_text = "";

for (let i = input_text.length - 1; i >= 0; i--) {
    let symbol = input_text[i];
    output_text += symbol;
}

alert(`Инвертированный результат: ${output_text}`);
