const timestamp = 1588767280;
const cluster = 3;
const type = 15;
const user = 15188622;

timestamp_code = timestamp.toString(16);
cluster_code = cluster.toString(16);
type_code = type.toString(16);
user_code = user.toString(16);

// AAAAAAAABBCDDDDDD

if (timestamp_code.length <= 8 && cluster_code.length <= 2 && type_code.length <= 1 && user_code.length <= 6) {
  timestamp_code = timestamp_code.padStart(8, '0');
  cluster_code = cluster_code.padStart(2, '0');
  user_code = user_code.padStart(6, '0');
  code = `${timestamp_code}${cluster_code}${type_code}${user_code}`;
  alert(`Полученный код: ${code}`);
} else
  alert(`Исходные данные выходят за пределы возможностей кодирования`);
