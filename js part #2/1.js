let x;

do {
    x = prompt('Введите целое число?\n', '');
    x = parseInt(x, 10);
} while (isNaN(x));

function isPerfectNumber(number) {
    let sumDividers = 0;

    for (let i = 1; i <= number / 2; i++) { 
        if (number % i === 0) {
            sumDividers += i; 
        }
    }

    return number === sumDividers; 
}

if (isPerfectNumber(x)) {
    console.log('Число совершенное');
} else {
    console.log('Число не совершенное');
}
