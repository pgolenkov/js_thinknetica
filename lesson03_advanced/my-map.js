function myMap(array, convert_function) {
    if (!Array.isArray(array) || !array.every(item => Number.isFinite(item)))
        throw 'Param must be an array of numbers'
        
    return array.reduce((acc, item) => {
        acc.push(Number(convert_function(item).toFixed(10)));
        return acc;
    }, []);
}
