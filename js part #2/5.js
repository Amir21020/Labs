// 3
function sumAfterLastZero(arr) {
    return arr.slice(arr.lastIndexOf(0) + 1).reduce((sum, num) => 
    sum + num, 0)
}

// 3
function sumNegativeRows(matrix) {
    return matrix
        .filter(row => row.some(el => el < 0))
        .reduce((sum, row) => sum + row.reduce((acc, el) => acc + el, 0), 0);
}