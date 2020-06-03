/**
 * Функция вывода отчёта по рейсу
 *
 *  * выводит в контейнер <div id=”flight-details”></div> отчет по рейсу
 *  * отображает список купленных билетов: номер билета, место, полное имя пассажира, прошел ли регистрацию на рейс
 * @param {World} world
 * @param {string} flightName наименование рейса
 * @returns { undefined } если успешно или ошибка
 */

function flightDetails(world, flightName) {
    const container = document.getElementById('flight-details');
    container.innerHTML = '';

    if (!container)
        throw new Error('Container with id ="flight-details" is not found in the document');

    const flight = world.flights[flightName];

    if (!flight)
        throw new Error('Flight not found');

    const nowTime = new Date().getTime();
    const report = flightReport(world, flight, nowTime);

    for (property in report) {
        const reportField = document.createElement('p');
        const reportFieldValue = document.createTextNode(`${property}: ${report[property]}`);
        reportField.append(reportFieldValue);

        container.append(reportField);
    }

    if (activeTickets(flight).length) {

        const ticketsTable = document.createElement('table');
        const ticketsTableHeader = document.createElement('tr');
        const ticketFields = ['id', 'seat', 'fullName', 'registrationTime'];

        ticketFields.forEach(field => {
            const headerColumn = document.createElement('th');
            const headerColumnValue = document.createTextNode(field);
            headerColumn.append(headerColumnValue);
            ticketsTableHeader.append(headerColumn);
        });
        ticketsTable.append(ticketsTableHeader);

        activeTickets(flight).forEach(ticket => {
            const ticketsTableRow = document.createElement('tr');
            ticketFields.forEach(field => {
                const ticketFieldColumn = document.createElement('td');
                const ticketFieldValue = document.createTextNode(ticket[field] || '-');
                ticketFieldColumn.append(ticketFieldValue);
                ticketsTableRow.append(ticketFieldColumn);
            });
            ticketsTable.append(ticketsTableRow);
        });

        container.append(ticketsTable);
    }
    else {
        const ticketsInfo = document.createElement('p');
        ticketsInfo.textContent = 'No tickets reserved';
        container.append(ticketsInfo);
    };
};
