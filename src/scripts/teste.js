class Animal{
    constructor(name, especie){
        this.name = name;
        this.especie = especie;
        this.vivo = true;
    }

    morrer(){
        this.vivo = false;
    }
}

class Especie{
    constructor(name){
        this.name = name;
        this.extinto = false;
    }

    setExtinto(boolean){
        this.extinto = boolean;
    }
}

let animal = new Animal('Bobby', new Especie('Cão'));
console.log(animal);
let json = JSON.stringify(animal);
console.log(json);
let obj = Object.setPrototypeOf(JSON.parse(json), Animal.prototype);
obj.especie = Object.setPrototypeOf(obj.especie, Especie.prototype);
console.log(obj);
obj.morrer();
console.log(obj);
obj.especie.setExtinto(true);
console.log(obj);