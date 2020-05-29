function myFilter(array, filter_function) {
    if (!Array.isArray(array) || !array.every(item => Number.isFinite(item)))
        throw 'Param must be an array of numbers'

    return array.reduce((acc, item) => {
        if (filter_function(item))
            acc.push(item);
        return acc;
    }, []);
}
