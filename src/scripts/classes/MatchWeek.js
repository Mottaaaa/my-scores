import Match from './Match';

const uuid = require('uuid/v4');

class MatchWeek {
    constructor(matchWeekNumber, matches = []) {
        this.id = uuid();
        this.matchWeekNumber = matchWeekNumber;
        this.matches = matches;
    }

    addMatch(match) {
        if (match !== undefined) {
            this.matches.push(match);
        }
    }

    removeMatch(matchID){
        if(matchID !== undefined && typeof matchID === 'string'){
            let filteredMatches = this.matches.filter((match, index, arr) => {
                return match.id !== matchID;
            });
            this.matches = filteredMatches;
        }
    }

    setMatches(matches) {
        if (matches !== undefined) {
            this.matches = matches;
        }
    }

    finishMatch(matchID, result){
        for(let match of this.matches){
            if(match.id === matchID){
                match.finishMatch(result);
            }
        }
    }

    static setPrototype(obj){
        let matchWeek = Object.setPrototypeOf(obj, MatchWeek.prototype);
        for(let match of matchWeek.matches){
            match = Match.setPrototype(match);
        }
        return matchWeek;
    }
}

export default MatchWeek;