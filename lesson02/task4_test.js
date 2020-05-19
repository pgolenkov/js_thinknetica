const flight = prompt("Введите номер рейса", "");
const nowTime = new Date().getTime();

console.table(flightReport(flight, nowTime));

ticket = flights[flight].tickets[0];

eRegistration(ticket.id, ticket.fullName, nowTime);

console.table(flightReport(flight, nowTime));
