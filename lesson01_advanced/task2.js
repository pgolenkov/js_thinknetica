// “12: 07 am” - “00:07”
// “03.2 pm” - “15:02”
// “1-17 am” - “01:17”
// “34:67” - выдать ошибку

// Если am/pm не указано, считаю что уже 24 часовой формат.

let source_time = prompt('Введите время в формате am/pm', '').trim();

let pm = source_time.substr(-2, 2).toLowerCase() === 'pm';
let am = source_time.substr(-2, 2).toLowerCase() === 'am';

let time_array = source_time.split(/[:\.\-]/);

let hours = parseInt(time_array[0]);
let minutes = parseInt(time_array[1]);

const max_hours = pm || am ? 12 : 23

if (hours >= 1 && hours <= max_hours && minutes >= 0 && minutes < 60) {
    if (pm && hours < 12)
        hours += 12
    else if (am && hours === 12)
        hours = 0
    hours_str = hours.toString().padStart(2, '0')
    minutes_str = minutes.toString().padStart(2, '0')

    time = `${hours_str}:${minutes_str}`

    alert(`Время в 24 часовом формате ${time}`)
} else
    alert("Ошибка в задании времени")
