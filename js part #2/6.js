// 1 
function getUnionItems(items1, items2){
    var setItems1 = new Set(items1)
    return items2.filter(x => setItems1.has(x))
}

// 2

function getCountLettersInArray(arr){
    var map = new Map();
    for(var item of arr){
        map.set(item, (map.get(item) || 0) + 1)
    }
    return map
}

// 3
class Student {
    constructor(name, group) {
        this.name = name;  
        this.group = group;
    }
}

function countStudentsInLargestGroup(students) {
    const groupCount = new Map();

    for (const student of students) {
        groupCount.set(student.group, (groupCount.get(student.group) || 0) + 1);
    }

    let maxCount = 0;
    for (const count of groupCount.values()) {
        if (count > maxCount) {
            maxCount = count;
        }
    }

    return maxCount; 
}