function negative_items_sum_and_count(array) {
    let count = 0;
    let sum = 0;

    array.forEach(item => {
        if (item < 0) {
            count++;
            sum += item;
        }
    });

    return { count, sum };
}

const array = [91, 93, 45, -67, -96, -40, 34, -96, 42, -58];
console.log(negative_items_sum_and_count(array));
