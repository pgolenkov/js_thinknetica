/**
 * Функция проверяет корректность билета по номеру и возвращает объект билета
 *
 * @param {string} ticket номер билета
 * @returns {Ticket} возвращает объект билета если он корректен
 */
function getTicketObject(ticket) {
  const splitted_ticket = ticket.split('-');

  const flightName = splitted_ticket[0];
  const ticketNumber = splitted_ticket[1];

  if (!ticketNumber)
      throw new Error('Неверный формат именования билета');

  const flight = flights[flightName];

  if (!flight)
      throw new Error('Рейс не существует');

  const ticketObject = flight.tickets.find(t => t.id === ticket);

  if (!ticketObject)
      throw new Error('Билет в рейсе не найден, проверьте корректность номера');

  return ticketObject;
}

/**
 * Функция пробует произвести электронную регистрацию пассажира
 *
 *  * проверка билета
 *  * проверка данных пассажира
 *  * электронную регистрацию можно произвести только в период от 5 до 1 часа до полета
 *
 * @param {string} ticket номер билета
 * @param {string} fullName имя пассажира
 * @param {number} nowTime текущее время
 * @returns boolean успешна ли регистрация
 */
function eRegistration(ticket, fullName, nowTime) {
    const ticketObject = getTicketObject(ticket);

    if (ticketObject.fullName !== fullName)
        throw new Error('Некорректное имя пассажира');

    if (ticketObject.registrationTime)
        throw new Error('Регистрация уже была проведена ранее');

    if (ticketObject.revertTime)
        throw new Error('Данный билет аннулирован');

    const flight = flights[ticketObject.flight];
    const timeToFly = (flight.registrationEnds - nowTime) / 3600 / 1000;
    if (timeToFly < 1 || timeToFly > 5)
        throw new Error('Время до вылета должно быть не более 5 и не менее 1 часа');

    ticketObject.registrationTime = nowTime;

    return true;
}
