let input_text = prompt("Введите текст", "");
let words = input_text.split(' ');
let output_text = "";

for (let i = 0; i < words.length; i++) {
  word = words[i];
  if (word)
    output_text += word + ' '
}
output_text = output_text.trim();

alert(`Результат: ${output_text}`);
