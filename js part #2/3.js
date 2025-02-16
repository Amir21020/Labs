class Mark {
    constructor(subject, mark) {
        this.subject = subject;
        this.mark = mark;
    }
}

class Student {
    constructor(surname, name) {
        this.surname = surname;
        this.name = name;
        this.marks = [];
    }

    addMark(subject, mark) {
        this.marks.push(new Mark(subject, mark));
    }

    getAverageMark() {
        if (this.marks.length === 0) return 0;
        
        const totalMarks = this.marks.reduce((sum, mark) => sum + mark.mark, 0);
        return totalMarks / this.marks.length;
    }

    getMarksBySubject(subject) {
        return this.marks
            .filter(mark => mark.subject === subject)
            .map(mark => mark.mark);
    }

    removeMarksBySubject(subject) {
        this.marks = this.marks.filter(mark => mark.subject !== subject);
    }

    displayInfo() {
        console.log(`Фамилия: ${this.surname}`);
        console.log(`Имя: ${this.name}`);
        console.log("Оценки:");
        this.marks.forEach(mark => {
            console.log(`- ${mark.subject}: ${mark.mark}`);
        });
    }
}