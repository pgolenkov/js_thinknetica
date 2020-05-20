function negative_items_sum_and_count(array) {
    const negative_array = array.filter(item => item < 0);
    const sum = negative_array.reduce((acc, item) => acc + item);
    return { count: negative_array.length, sum }
}

const array = [91, 93, 45, -67, -96, -40, 34, -96, 42, -58];
console.log(negative_items_sum_and_count(array));
