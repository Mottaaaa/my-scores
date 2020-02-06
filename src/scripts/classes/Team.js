const uuid = require('uuid/v4');

class Team{
    constructor(name = ''){
        this.id = uuid();
        this.name = name;
    }

    static setPrototype(obj){
        return Object.setPrototypeOf(obj, Team.prototype);
    }
}

export default Team;