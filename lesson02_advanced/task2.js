/**
 * Функция возврата билета
 *
 *  * проверка рейса
 *  * проверка билета
 *  * вернуть билет можно если до рейса не менее 3 часов
 *  * вернуть билет можно если не бизнес класс
 *
 * @param {string} ticket номер билета
 * @param {number} nowTime текущее время
 * @returns {boolean} удалось ли отменить билет
 */
function revertTicket(ticket, nowTime) {
    const ticketObject = getTicketObject(ticket);

    if (ticketObject.revertTime)
        throw new Error('Данный билет уже был аннулирован ранее');
    
    const flight = flights[ticketObject.flight];
    const timeToFly = (flight.registrationEnds - nowTime) / 3600 / 1000;

    if (timeToFly < 3 || ticketObject.type === 1)
        return false;

    ticketObject.revertTime = nowTime;
    return true;
}
