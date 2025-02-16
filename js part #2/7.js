class Student {
    constructor(firstName, lastName, averageGrade) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.averageGrade = averageGrade;
    }
}

// 1

function shellSortStudentsByAverageGrade(students) {
    const n = students.length;
    let gap = Math.floor(n / 2);

    while (gap > 0) {
        for (let i = gap; i < n; i++) {
            const temp = students[i];
            let j = i;

            while (j >= gap && students[j - gap].averageGrade > temp.averageGrade) {
                students[j] = students[j - gap];
                j -= gap;
            }
            students[j] = temp;
        }
        gap = Math.floor(gap / 2);
    }

    return students;
}

// 2

function binarySearchStudent(students, firstName, lastName) {
    students.sort((a, b) => {
        if (a.lastName < b.lastName) return -1;
        if (a.lastName > b.lastName) return 1;
        if (a.firstName < b.firstName) return -1;
        if (a.firstName > b.firstName) return 1;
        return 0;
    });

    let left = 0;
    let right = students.length - 1;

    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        const midStudent = students[mid];

        if (midStudent.firstName === firstName && midStudent.lastName === lastName) {
            return midStudent; 
        } else if (midStudent.lastName < lastName || (midStudent.lastName === lastName && midStudent.firstName < firstName)) {
            left = mid + 1; 
        } else {
            right = mid - 1;
        }
    }

    return null;
}