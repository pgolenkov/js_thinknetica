function sumOfPositive(array) {
    if (!Array.isArray(array) || !array.every(item => Number.isFinite(item)))
        throw 'Param must be an array of numbers';

    const positiveArray = array.filter(item => item > 0);
    const sum = positiveArray.reduce((acc, item) => acc + item, 0);
    return { count: positiveArray.length, sum };
}
