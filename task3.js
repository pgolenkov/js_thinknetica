// Американский формат: ММ/ЧЧ/ГГГГ например: 5/30/2006
// Российский формат: ЧЧ.ММ.ГГГГ например: 30.05.2006

american_date = prompt("Введите дату в американском формате", "");
month_day_year = american_date.split("/");

month = parseInt(month_day_year[0]);
day = parseInt(month_day_year[1]);
year = parseInt(month_day_year[2]);

if (month > 0 && month <= 12 && day > 0 && day <= 31 && year > 0 && year < 10000) {
  month_str = month.toString();
  day_str = day.toString();
  year_str = year.toString();

  russian_date = `${day_str.padStart(2, '0')}.${month_str.padStart(2, '0')}.${year_str.padStart(4, '0')}`;
  alert(`Российский формат даты: ${russian_date}`);
} else
  alert("Неверный формат даты");
