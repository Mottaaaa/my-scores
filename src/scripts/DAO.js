import { matchPath } from "react-router-dom";

var DAO = (function () {
    let competition = {
        name: '',
        teams: [],
        rounds: [],
        scoreboard: []
    };

    let createCompetition = function (competitionName) {
        if (competitionName !== undefined) {
            competition = {
                name: competitionName,
                running: false
            };
        }
    };

    let enrollTeams = function (teams) {
        if (teams !== undefined) {
            competition.teams = teams;
        }
    };

    let resetName = function () {
        competition.name = '';
        save();
    }

    let createMatch = function (round, teamA, teamB) {
        if (round !== undefined && teamA !== undefined && teamB !== undefined && teamA !== teamB) {
            let match = {
                home: teamA,
                visitor: teamB,
                score: undefined,
                round
            };
            if (competition.rounds === undefined) {
                competition.rounds = [];
            }
            if (competition.rounds[round] === undefined) {
                competition.rounds[round] = [];
            }
            competition.rounds[round].push(match);
        }
    }

    let finishMatch = function (round, teamA, teamB, score) {
        if (round !== undefined && teamA !== undefined
            && teamB !== undefined && score !== undefined) {
            competition.rounds[round].some((match) => {
                if (match.home === teamA && match.visitor === teamB) {
                    match.score = []
                    match.score[0] = parseInt(score[0]);
                    match.score[1] = parseInt(score[1]);
                    calculateScores(match);
                }
            })
        }
    };

    let createScoreBoard = function () {
        if (competition.running && competition.teams !== undefined && competition.teams.length > 0) {
            competition.teams.map((team, index) => {
                let score = {
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
                if (competition.scoreboard === undefined) {
                    competition.scoreboard = [];
                }
                competition.scoreboard.push(score);
            });
            save();
        }
    }

    let getMatchResult = function (match) {
        if (match !== undefined && match.score !== undefined) {
            let score = match.score;
            if (score[0] > score[1]) {
                return 3;
            } else if (score[0] < score[1]) {
                return 0;
            } else {
                return 1;
            }
        }
        return undefined;
    }

    let calculateScores = function (match) {
        if (competition !== undefined && competition.scoreboard !== undefined && competition.scoreboard.length > 0) {
            let matchResult = getMatchResult(match);
            let scoreHome = competition.scoreboard.filter(score => score.team === match.home.name)[0];
            let scoreVisitor = competition.scoreboard.filter(score => score.team === match.visitor.name)[0];

            scoreHome.matches += 1;
            scoreHome.goalsFor += match.score[0];
            scoreHome.goalsAgainst += match.score[1];
            scoreHome.goalsDifference = scoreHome.goalsFor - scoreHome.goalsAgainst;

            scoreVisitor.matches += 1;
            scoreVisitor.goalsFor += match.score[1];
            scoreVisitor.goalsAgainst += match.score[0];
            scoreVisitor.goalsDifference = scoreVisitor.goalsFor - scoreVisitor.goalsAgainst;
            switch (matchResult) {
                case 3:
                    scoreHome.points += 3;
                    scoreHome.won += 1;
                    scoreVisitor.lost += 1;
                    break;
                case 1:
                    scoreHome.points += 1;
                    scoreVisitor.points += 1;
                    scoreVisitor.drawn += 1;
                    scoreHome.drawn += 1;
                    break;
                case 0:
                    scoreVisitor.points += 3
                    scoreVisitor.won += 1;
                    scoreHome.lost += 1;
                    break;
                default:
                    break;
            }
            save();
        }
    }

    let getClassification = function () {
        if (competition !== undefined && competition.scoreboard !== undefined && competition.scoreboard.length > 0) {
            return competition.scoreboard.sort(sortClassification);
        }
    }

    let sortClassification = function (a, b) {
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

    let initiateCompetition = function () {
        if (competition.teams !== undefined && competition.teams.length > 0) {
            if ((competition.teams.length % 2) === 0) {
                competition.running = true;
                let numberOfTeams = competition.teams.length;
                let matchesPerRound = numberOfTeams / 2;
                let numberOfRounds = (numberOfTeams - 1) * 2;
                let midSeason = numberOfRounds / 2;
                let teamList = competition.teams;
                let lastTeam = competition.teams[numberOfTeams - 1];

                for (let i = 0; i < midSeason; i++) {
                    if (i === 0) {
                        for (let j = 0; j < matchesPerRound; j++) {
                            createMatch(i, teamList[j], teamList[(numberOfTeams - 1) - j]);
                        }
                    } else {
                        let previousRound = competition.rounds[i - 1];
                        let previousRoundLastTeam = previousRound[matchesPerRound - 1].visitor;
                        let temp = [];
                        for (let match of previousRound) {
                            temp.push(match.home);
                            temp.push(match.visitor);
                        }

                        temp = temp.filter(function (value, index, arr) {
                            return (value.name !== previousRoundLastTeam.name &&
                                value.name !== lastTeam.name);
                        });

                        if ((i % 2) === 0) {
                            createMatch(i, previousRoundLastTeam, lastTeam);
                            temp.unshift(previousRoundLastTeam, lastTeam);
                        } else {
                            createMatch(i, lastTeam, previousRoundLastTeam);
                            temp.unshift(lastTeam, previousRoundLastTeam);
                        }
                        for (let j = 0; j < matchesPerRound - 1; j++) {
                            let visitor = temp.pop();
                            let home = temp.pop();
                            createMatch(i, home, visitor);
                            temp.unshift(home, visitor);
                        }
                    }
                }

                for (let i = 0; i < midSeason; i++) {
                    let roundIndex = midSeason + i;
                    for (let j = 0; j < matchesPerRound; j++) {
                        let round = competition.rounds[i][j];
                        createMatch(roundIndex, round.visitor, round.home);
                    }
                }
            }
        }
        createScoreBoard();
        save();
    };

    let save = function () {
        localStorage.setItem("MyScore", JSON.stringify(competition));
    };

    let load = function () {
        let stored = JSON.parse(localStorage.getItem("MyScore"));
        if (stored !== undefined && stored !== null) {
            competition = JSON.parse(localStorage.getItem("MyScore"));
        }
    };

    let reset = function () {
        competition = {
            name: '',
            teams: [],
            rounds: []
        };
        save();
    }

    let getCompetition = function () {
        if (competition === null) {
            return {};
        }
        return competition;
    }

    let getTeams = function () {
        return competition.teams;
    }

    let getMatches = function () {
        return competition.rounds;
    }

    let isCompetitionRunning = function () {
        return competition.running;
    }

    return {
        createCompetition,
        enrollTeams,
        finishMatch,
        initiateCompetition,
        load,
        reset,
        save,
        isCompetitionRunning,
        getCompetition,
        getTeams,
        getMatches,
        getClassification,
        resetName
    };
})();

export { DAO };