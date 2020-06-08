'use strict';

const inputs = document.querySelectorAll('.input-size');
inputs.forEach(input => input.addEventListener('change', sizeChange));

const table = document.getElementsByTagName('table')[0];
table.addEventListener('click', click);

function sizeChange(event) {
    const value = event.target.value;

    if (event.target.id === 'field-width') {
        const tableWidth = table.dataset.width;
        const rows = table.querySelectorAll('tr');
        const changeWidth = value - tableWidth;

        if (changeWidth > 0)
            for (let i = 0; i < changeWidth; i++)
                rows.forEach(row => row.append(document.createElement('td')));
        else
            for (let i = 0; i < -changeWidth; i++)
                rows.forEach(row => row.lastChild.remove());

        table.dataset.width = value;

    } else {
        const tableHeight = table.dataset.height;
        const changeHeight = value - tableHeight;

        if (changeHeight > 0) {
            const row = document.createElement('tr');
            for (let i = 0; i < table.dataset.width; i++)
                row.append(document.createElement('td'));

            for (let i = 0; i < changeHeight; i++)
                table.append(row.cloneNode(true));

        } else {
            for (let i = 0; i < -changeHeight; i++)
                table.lastChild.remove();
        }
        table.dataset.height = value;
    };
}

function click(event) {
    if (event.target.tagName !== 'TD')
        return;

    const color = document.getElementById('field-color').value;
    const ctrlColor = document.getElementById('field-ctrl-color').value;

    if (event.shiftKey)
        event.target.style.backgroundColor = 'transparent';
    else if (event.ctrlKey)
        event.target.style.backgroundColor = ctrlColor;
    else
        event.target.style.backgroundColor = color;
}
