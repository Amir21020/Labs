// 1
function productOfTwoMax(a,b,c){
    var sortedNumbers =  [a,b,c].map(x => parseInt(x)).sort()
    return sortedNumbers[2] * sortedNumbers[1]
}
// 2

function greet(name, rank = 'рядовой'){
    return rank + ' ' + name
}

// 3

function callFunction(func, ...args) {
    return func(...args);
}

// 4
getPowerFunction = (x) =>  x % 2 === 0 ? Math.pow(x, 2) : Math.pow(x, 3)

// 5
function factorial(n) {
    if (n < 0) return undefined;
    if (n === 0 || n === 1) return 1;
    return n * factorial(n - 1);
}