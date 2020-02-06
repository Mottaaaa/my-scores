import Team from './Team';
import Match from './Match';
import MatchWeek from './MatchWeek';

const uuid = require('uuid/v4');

class Competition {
    constructor(name = "") {
        this.id = uuid();
        this.name = name;
        this.running = false;
        this.teams = [];
        this.matchWeeks = [];
    }

    addTeam(team) {
        if (team !== undefined) {
            this.teams.push(team);
        }
    }

    initiateCompetition() {
        if (this.teams !== undefined && this.teams.length > 0 && (this.teams.length % 2) === 0) {
            this.running = true;
            let numberOfTeams = this.teams.length;
            let matchesPerRound = numberOfTeams / 2;
            let numberOfRounds = (numberOfTeams - 1) * 2;
            let midSeason = numberOfRounds / 2;
            let teamList = this.teams;
            let lastTeam = this.teams[numberOfTeams - 1];

            for (let i = 0; i < midSeason; i++) {
                let matchWeek = new MatchWeek(i + 1);
                this.matchWeeks.push(matchWeek);

                if (i === 0) {
                    for (let j = 0; j < matchesPerRound; j++) {
                        //createMatch(i, teamList[j], teamList[(numberOfTeams - 1) - j]);
                        matchWeek.addMatch(new Match(teamList[j], teamList[(numberOfTeams - 1) - j]));
                    }
                } else {
                    let previousMatchWeek = this.matchWeeks[i - 1];
                    let previousMatchWeekLastTeam = previousMatchWeek.matches[matchesPerRound - 1].visitorTeam;
                    let temp = [];
                    for (let match of previousMatchWeek.matches) {
                        temp.push(match.homeTeam);
                        temp.push(match.visitorTeam);
                    }

                    temp = temp.filter(function (value, index, arr) {
                        return (value.id !== previousMatchWeekLastTeam.id &&
                            value.id !== lastTeam.id);
                    });

                    if ((i % 2) === 0) {
                        //createMatch(i, previousMatchWeekLastTeam, lastTeam);
                        matchWeek.addMatch(new Match(previousMatchWeekLastTeam, lastTeam));
                        temp.unshift(previousMatchWeekLastTeam, lastTeam);
                    } else {
                        //createMatch(i, lastTeam, previousMatchWeekLastTeam);
                        matchWeek.addMatch(new Match(lastTeam, previousMatchWeekLastTeam));
                        temp.unshift(lastTeam, previousMatchWeekLastTeam);
                    }
                    for (let j = 0; j < matchesPerRound - 1; j++) {
                        let visitor = temp.pop();
                        let home = temp.pop();
                        //createMatch(i, home, visitor);
                        matchWeek.addMatch(new Match(home, visitor));
                        temp.unshift(home, visitor);
                    }
                }
            }

            for (let i = 0; i < midSeason; i++) {
                let matchWeekIndex = midSeason + i + 1;
                let matchWeek = new MatchWeek(matchWeekIndex);
                this.matchWeeks.push(matchWeek);

                for (let j = 0; j < matchesPerRound; j++) {
                    let match = this.matchWeeks[i].matches[j];
                    //createMatch(matchWeekIndex, round.visitor, round.home);
                    matchWeek.addMatch(new Match(match.visitorTeam, match.homeTeam));
                }
            }

        }
    }

    finishMatch(matchWeekID, matchID, result) {
        for (let matchWeek of this.matchWeeks) {
            if (matchWeek.id === matchWeekID) {
                matchWeek.finishMatch(matchID, result);
            }
        }
    }

    resetName() {
        this.name = '';
    }

    static setPrototype(obj) {
        let competition = Object.setPrototypeOf(obj, Competition.prototype);
        for (let team of competition.teams) {
            team = Team.setPrototype(team);
        }
        for (let matchWeek of competition.matchWeeks) {
            matchWeek = MatchWeek.setPrototype(matchWeek);
        }
        return competition;
    }
}

export default Competition;