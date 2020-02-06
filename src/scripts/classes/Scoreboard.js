import Competition from './Competition';

const uuid = require('uuid/v4');

class Scoreboard {
    constructor(competition) {
        this.id = uuid();
        this.competition = competition;
        this.scoreboard = [];
    }

    createScoreBoard() {

        this.competition.teams.map((team, index) => {
            let scoreboardRow = {
                id: team.id,
                team: team.name,
                matches: 0,
                won: 0,
                drawn: 0,
                lost: 0,
                goalsFor: 0,
                goalsAgainst: 0,
                goalsDifference: 0,
                points: 0
            };

            return this.scoreboard.push(scoreboardRow);
        });
    }

    getScoreboardRow(teamID) {
        for(let row of this.scoreboard){
            if(row.id === teamID){
                return row;
            }
        }
    }

    calculateScores() {
        this.competition.matchWeeks.forEach(matchWeek => {
            matchWeek.matches.forEach(match => {
                if (match.result !== undefined) {
                    let homeTeamRow = this.getScoreboardRow(match.homeTeam.id);
                    let visitorTeamRow = this.getScoreboardRow(match.visitorTeam.id);
                    homeTeamRow.matches += 1;
                    homeTeamRow.goalsFor += match.result[0];
                    homeTeamRow.goalsAgainst += match.result[1];
                    homeTeamRow.goalsDifference = homeTeamRow.goalsFor - homeTeamRow.goalsAgainst;

                    visitorTeamRow.matches += 1;
                    visitorTeamRow.goalsFor += match.result[1];
                    visitorTeamRow.goalsAgainst += match.result[0];
                    visitorTeamRow.goalsDifference = visitorTeamRow.goalsFor - visitorTeamRow.goalsAgainst;

                    let result = match.result;
                    if (result[0] > result[1]) {
                        homeTeamRow.points += 3;
                        homeTeamRow.won += 1;
                        visitorTeamRow.lost += 1;
                    } else if (result[0] === result[1]) {
                        homeTeamRow.points += 1;
                        visitorTeamRow.points += 1;
                        visitorTeamRow.drawn += 1;
                        homeTeamRow.drawn += 1;
                    } else {
                        visitorTeamRow.points += 3
                        visitorTeamRow.won += 1;
                        homeTeamRow.lost += 1;
                    }
                }
            });
        });
    }

    getClassification() {
        if (this.competition !== undefined && this.scoreboard.length > 0) {
            return this.scoreboard.sort(this.sortClassification);
        }
    }

    sortClassification = function (a, b) {
        if (a.points > b.points) {
            return -1;
        } else if (a.points < b.points) {
            return 1;
        } else {
            if (a.goalsDifference > b.goalsDifference) {
                return -1;
            } else if (a.goalsDifference < b.goalsDifference) {
                return 1;
            } else {
                if (a.goalsFor > b.goalsFor) {
                    return -1;
                } else if (a.goalsFor < b.goalsFor) {
                    return 1;
                } else {
                    if (a.goalsAgainst < b.goalsAgainst) {
                        return -1;
                    } else if (a.goalsAgainst > b.goalsAgainst) {
                        return 1;
                    } else {
                        return 0;
                    }
                }
            }
        }
    }

    static setPrototype(obj) {
        let scoreboard = Object.setPrototypeOf(obj, Scoreboard.prototype);
        scoreboard.competition = Competition.setPrototype(scoreboard.competition);
    }
}

export default Scoreboard;