import Team from './Team';

const uuid = require('uuid/v4');

class Match{
    constructor(homeTeam, visitorTeam, result){
        this.id = uuid();
        this.homeTeam = homeTeam;
        this.visitorTeam = visitorTeam;
        this.result = result;
    }

    finishMatch(result){
        if(result !== undefined){
            this.result = result;
        }
    }

    static setPrototype(obj){
        let match =  Object.setPrototypeOf(obj, Match.prototype);
        match.homeTeam = Team.setPrototype(match.homeTeam);
        match.visitorTeam = Team.setPrototype(match.visitorTeam);
        return match;
    }
}

export default Match;