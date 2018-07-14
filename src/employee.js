export class Employee{
    constructor(quality, salary, isUnionized){ 
        this.quality = quality // out of 10
        this.salary = salary
        this.isUnionized = isUnionized // salary is dollars per day
    }
    generateShawarma(){
        
        if (Math.random()*20 <= this.quality + 9) {
            return true // made good shawarma
        } else {
            return false // made bad shawarma
        }
    }

    makeElement() {
        const element = document.createElement('div');
        element.classList.add('employee');

        const img = document.createElement('img');
        const happiness = this.salary > 30 ? '1' : '2';
        let quality;
        if (this.quality < 4) {
            quality = 'bad';
        } else if (this.quality < 7) {
            quality = 'mid';
        } else {
            quality = 'good';
        }
        img.src = `img/employee ${quality} ${happiness}.png`;
        element.appendChild(img);

        const qualityStat = document.createElement('span');
        qualityStat.innerText = `Quality: ${this.quality}`;
        element.appendChild(qualityStat);

        const salaryStat = document.createElement('span');
        salaryStat.innerText = `Salary: ${this.salary}`;
        element.appendChild(salaryStat);

        const fireBtn = document.createElement('button');
        if (this.isUnionized) {
            fireBtn.innerText = "Unionized; fire with fee";
        } else {
            fireBtn.innerText = 'Fire';
        }
        element.appendChild(fireBtn);

        return {
            element,
            fireBtn: fireBtn
        };
    }

    static generateEmployee() {
        const quality = Math.floor(Math.random()*10)+1;
        const salary = 10 * quality + Math.floor(Math.random()*20 - 10);
        return new Employee(quality, salary, Math.random() > 0.8);
    }
}

export default Employee
