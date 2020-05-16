for (let row = 1; row <= 10; row++) {
    let row_string = row > 1 ? `${row} ` : "  ";

    for (let column = 1; column <= 10; column++)
        row_string += column * row + ' ';

    console.log(row_string);
}
