var DAO = (function () {
    let competition = {
        name: '',
        teams: [],
        rounds: []
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
                score: undefined
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
                    match.score = score;
                    return true;
                }
                return false;
            })
        }
    };

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
    };

    let save = function () {
        localStorage.setItem("MyScore", JSON.stringify(competition));
    };

    let load = function () {
        competition = JSON.parse(localStorage.getItem("MyScore"));
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

    let getMatchResult = function (match) {
        if (match.score !== undefined) {
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

    let calculateScores = function () {
        let scores = [];
        if (competition.teams !== undefined && competition.teams.length > 0) {
            for (let i = 0; i < competition.teams.length; i++) {
                let team = competition.teams[i];
                let scoreRow = {
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

                for (let j = 0; j < competition.rounds.length; j++) {
                    let round = competition.rounds[j];
                    for (let k = 0; k < round.length; k++) {
                        let match = round[k];
                        if (match.score !== undefined) {
                            let score = match.score;
                            scoreRow.matches += 1;

                            if (match.home.name === team.name) {
                                scoreRow.goalsFor += score[0];
                                scoreRow.goalsAgainst += score[1];

                                switch (getMatchResult(score)) {
                                    case 3:
                                        scoreRow.won += 1;
                                        scoreRow.points += 3;
                                        break;
                                    case 1:
                                        scoreRow.drawn += 1;
                                        scoreRow.points += 1;
                                        break;
                                    case 0:
                                        scoreRow.lost += 1;
                                        break;
                                    default:
                                        break;
                                }
                            } else if (match.visitor.name === team.name) {
                                scoreRow.goalsFor += score[1];
                                scoreRow.goalsAgainst += score[0];

                                switch (getMatchResult(score)) {
                                    case 3:
                                        scoreRow.lost += 1;
                                        break;
                                    case 1:
                                        scoreRow.drawn += 1;
                                        scoreRow.points += 1;
                                        break;
                                    case 0:
                                        scoreRow.won += 1;
                                        scoreRow.points += 3
                                        break;
                                    default:
                                        break;
                                }
                            }

                            scoreRow.goalsDifference = scoreRow.goalsFor - scoreRow.goalsAgainst;
                        }
                    }
                }

                scores.push(scoreRow);
            }

            return scores;
        }
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
        calculateScores,
        resetName
    };
})();

export { DAO };