var DAO = (function () {

    let save = function (competition, scoreboard) {
        let competitionObj = competition;
        let scoreboardObj = scoreboard;
        if (competitionObj === undefined) {
            competitionObj = '';
        }
        if (scoreboardObj === undefined) {
            scoreboardObj = '';
        }
        localStorage.setItem("MyScore-Competition", JSON.stringify(competitionObj));
        localStorage.setItem("MyScore-Scoreboard", JSON.stringify(scoreboardObj));
    };

    let load = function () {
        let storedCompetition = localStorage.getItem("MyScore-Competition");
        let storedScoreboard = localStorage.getItem("MyScore-Scoreboard");
        if (storedCompetition !== undefined && storedCompetition !== null) {
            storedCompetition = JSON.parse(storedCompetition);
        }
        if (storedScoreboard !== undefined && storedScoreboard !== null) {
            storedScoreboard = JSON.parse(storedScoreboard);
        }
        return { competition: storedCompetition, scoreboard: storedScoreboard };
    };

    return {
        save,
        load
    };
})();

export { DAO };