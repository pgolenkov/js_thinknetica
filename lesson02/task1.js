function negative_items_sum_and_count(array) {
    const result = array.reduce((acc, item) => {
        return item < 0 ? { count: acc.count + 1, sum: acc.sum + item } : acc
    }, { count: 0, sum: 0 });

    return result;
}

const array = [91, 93, 45, -67, -96, -40, 34, -96, 42, -58];
console.log(negative_items_sum_and_count(array));
