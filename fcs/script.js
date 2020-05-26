'use strict';

const result = addFlight(
    bigWorld,
    {
        name: 'Airbus 747',
        seats: 36,
        businessSeats: 4,
    },
    makeTime(16, 0),
    'BH118',
);

bigWorld = result.world;

console.log(bigWorld);

let res = buyTicket(bigWorld, 'BH118', makeTime(5, 10), 'Petrov I. I.');

bigWorld = res.world;
console.log(bigWorld);

let res2 = buyTicket(bigWorld, 'BH118', makeTime(5, 10), 'Ivanov I. I.');

console.log(bigWorld, res2.world);
