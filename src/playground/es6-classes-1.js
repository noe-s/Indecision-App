class Person{
    constructor(name = 'Anonymous',age = 0){
        this.name = name;
        this.age = age;
    }
    getGreeting(){
        //return 'Hello ' + this.name + ', welcome to the party!';
        return `Hey ${this.name}, welcome to the party!`;
    }
    getDescription(){
        return `${this.name} is ${this.age} year(s) old.`
    }
}

class Student extends Person{
    constructor(name, age, major){
        super(name,age); //super refers to parent class (person)
        this.major = major;
    }
    hasMajor(){
        return !!this.major; //!! flips it twice
    }
    getDescription(){
        let description = super.getDescription();

        if(this.hasMajor){
            description += ` Their major is ${this.major}`;
        }
        return description;
    }
}

class Traveler extends Person{
    constructor(name, age, homeLocation){
        super(name,age);
        this.homeLocation = homeLocation;
    }
    getGreeting(){
        let greeting = super.getGreeting();

        if(this.homeLocation){
            greeting += ` I'm visiting from Montreal.`;
        }
        return greeting;
    }
}

const me = new Traveler('Noe Schultz', 22, 'Bali');
console.log(me.getGreeting());

const other = new Student();
console.log(other.getGreeting());
