import Competition from './classes/Competition'
import Team from './classes/Team';
import Scoreboard from './classes/Scoreboard';
import { DAO } from './DAO';

var Controller = (function () {
    var competition = undefined;
    var scoreboard = undefined;

    let createCompetition = function (competitionName) {
        competition = new Competition(competitionName);
    };

    let enrollTeams = function (teams) {
        if (teams !== undefined && competition !== undefined) {
            for (let team of teams) {
                competition.addTeam(new Team(team.name));
            }
            save();
        }
    };

    let resetName = function () {
        competition.resetName();
    }

    let finishMatch = function (matchWeekID, matchID, result) {
        competition.finishMatch(matchWeekID, matchID, result);
        save();
    };

    let createScoreboard = function () {
        scoreboard = new Scoreboard(competition);
    };

    let getClassification = function () {
        load();
        createScoreboard();
        scoreboard.createScoreBoard();
        scoreboard.calculateScores();
        save();
        if (scoreboard !== undefined) {
            return scoreboard.getClassification();
        }
    };

    let initiateCompetition = function () {
        competition.initiateCompetition();
        save();
    };

    let reset = function () {
        competition = undefined;
        scoreboard = undefined;
        DAO.save(competition, scoreboard);
    }

    let getCompetitionName = function () {
        if (competition !== undefined) {
            return competition.name;
        }
        return '';
    };

    let getTeams = function () {
        if (competition !== undefined) {
            return competition.teams;
        }
    };

    let getMatchWeeks = function () {
        if (competition !== undefined) {
            return competition.matchWeeks;
        }
    };

    let isCompetitionRunning = function () {
        if (competition !== undefined) {
            return competition.running;
        }
    };

    let save = function () {
        DAO.save(competition, scoreboard);
    }

    let load = function () {
        let loadedObject = DAO.load();
        if (loadedObject !== undefined && loadedObject !== null) {
            if (loadedObject.competition !== undefined && loadedObject.competition !== null &&
                loadedObject.competition !== '') {

                competition = Competition.setPrototype(loadedObject.competition);
            }
            if (loadedObject.scoreboard !== undefined && loadedObject.scoreboard !== null &&
                loadedObject.scoreboard !== '') {
                scoreboard = Scoreboard.setPrototype(loadedObject.scoreboard);
            }
        } else {
            competition = undefined;
            scoreboard = undefined;
        }
    }

    let competitionExists = function () {
        return competition !== undefined;
    }

    let saveImage = function(image){
        DAO.saveImage(image);
    }

    let loadImage = function(){
        return DAO.loadImage();
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
        getCompetitionName,
        getTeams,
        getMatchWeeks,
        getClassification,
        resetName,
        competitionExists,
        saveImage,
        loadImage
    };
})();

export { Controller };