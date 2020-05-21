const ticket = prompt("Введите номер билета", "");
const nowTime = new Date().getTime();

if (revertTicket(ticket, nowTime))
    console.log('Билет отменён');
else
    console.log('Билет не отменён');

ticketObject = getTicketObject(ticket);
console.table(flightReport(ticketObject.flight, nowTime));
