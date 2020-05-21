function myMap(array, convert_function) {
    return array.reduce((acc, item) => {
        acc.push(convert_function(item));
        return acc;
    }, []);
}

function myFilter(array, filter_function) {
    return array.reduce((acc, item) => {
        if (filter_function(item))
            acc.push(item);
        return acc;
    }, []);
}

let arr = [1,2,3,4,5,6];
console.log(myMap(arr, item => item * 2));
console.log(myFilter(arr, item => item % 2 === 0));
