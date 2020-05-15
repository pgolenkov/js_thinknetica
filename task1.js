let side = prompt("Введите длину стороны равностороннего треугольника", "");
side = parseFloat(side);

if (side && side > 0) {
    let square = side ** 2 * Math.sqrt(3) / 4;
    alert(`Площадь треугольника равна ${square}`);
} else
    alert('Длина стороны должны быть числом больше 0');
