let sum = 0;
let count = 0;
let avg = 0;

do {
  input = prompt("Введите число или пустую строку для завершения", "");
  number = parseFloat(input);

  if (number) {
    sum += number;
    count++;
    avg = sum / count;
    console.log("Сумма", sum);
    console.log("Количество", count);
    console.log("Среднее арифметическое", avg);
  } else if (input)
    alert("Вы ввели не число. Введите число");

} while (input);

alert(`Сумма: ${sum} Количество: ${count} Среднее арифметическое: ${avg}`);
