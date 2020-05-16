const timestamp = 1588767280;
const cluster = 3;
const type = 15;
const user = 15188622;

let timestamp_code = timestamp.toString(16);
let cluster_code = cluster.toString(16);
let type_code = type.toString(16);
let user_code = user.toString(16);

// AAAAAAAABBCDDDDDD

if (timestamp_code.length <= 8 && cluster_code.length <= 2 && type_code.length <= 1 && user_code.length <= 6) {
    timestamp_code = timestamp_code.padStart(8, '0');
    cluster_code = cluster_code.padStart(2, '0');
    user_code = user_code.padStart(6, '0');

    let code = `${timestamp_code}${cluster_code}${type_code}${user_code}`;
    alert(`Полученный код: ${code}`);
} else
    alert(`Исходные данные выходят за пределы возможностей кодирования`);
