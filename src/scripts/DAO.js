var DAO = (function () {
    let competition = undefined;

    let createCompetitions = function (competitionName) {
        if (competitionName !== undefined) {
            competition.name = competitionName;
        }
    };

    let enrollTeams = function (teams) {
        if (teams !== undefined && typeof teams === 'array') {
            competition.teams = teams;
        }
    };

    let createGame = function (round, teamA, teamB) {
        if (round !== undefined && teamA !== undefined && teamB !== undefined && teamA !== teamB) {
            let game = {
                home: teamA,
                visitor: teamB,
                score: undefined
            };
            competition.rounds[round].push(game);
        }
    }

    let finishGame = function (round, teamA, teamB, score) {
        if (round !== undefined && teamA !== undefined
            && teamB !== undefined && score !== undefined) {
            if (competition.rounds[round].some(game => game.home === teamA && game.visitor === teamB)) {
                game.score = score;
            }
        }
    };

    let initiateCompetition = function () {
        if ((competition.teams.length % 2) === 0) {
            let numberOfTeams = competition.teams.length;
            let matchesPerRound = numberOfTeams / 2;
            let numberOfRounds = (numberOfTeams - 1) * 2;
            let midSeason = numberOfRounds / 2;
            let teamList = competition.teams;

            for (let i = 0; i < midSeason; i++) {
                if (i === 0) {
                    for (let j = 0; j < matchesPerRound; j++) {
                        createGame(i, teamList[j], teamList[matchesPerRound - j]);
                    }
                } else {
                    let previousRoundLastTeam = competition.rounds[i - 1][matchesPerRound - 1].visitor;
                    let lastTeam = teamList[numberOfTeams - 1];
                    teamList = teamList.filter(function (value, index, arr) {
                        return (value.name !== previousRoundLastTeam.name &&
                            value.name !== lastTeam);
                    });

                    if ((i % 2) === 0) {
                        createGame(i, lastTeam, previousRoundLastTeam);
                        teamList.unshift(lastTeam, previousRoundLastTeam);
                    } else {
                        createGame(i, previousRoundLastTeam, lastTeam);
                        teamList.unshift(previousRoundLastTeam, lastTeam);
                    }
                    for (let j = 0; j < matchesPerRound - 1; j += 2) {
                        createGame(i, teamList[matchesPerRound - j - 1], teamList[matchesPerRound - j]);
                    }
                }
            }
            for (let i = midSeason; i < numberOfRounds; i++) {
                let round = competition.rounds[i - midSeason];
                createGame(i, round.visitor, round.home);
            }
        }
    };

    
});