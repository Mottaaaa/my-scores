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

    let saveImage = function (image) {

        if (image !== undefined && image !== null) {
            var reader = new FileReader();
            reader.readAsDataURL(image);
            reader.onload = function (e) {
                //console.log(reader.result);
                localStorage.setItem("MyScore-Image", reader.result);
            };
            reader.onerror = function (error) {
                console.log('Error: ', error);
            };
        }
    }

    let loadImage = function () {
        let image = localStorage.getItem("MyScore-Image");

        if (image !== undefined && image !== null) {
            var file = dataURLtoFile(image, 'image');
        }

        return file;
    }

    function dataURLtoFile(dataurl, filename) {

        var arr = dataurl.split(','),
            mime = arr[0].match(/:(.*?);/)[1],
            bstr = atob(arr[1]),
            n = bstr.length,
            u8arr = new Uint8Array(n);

        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }

        return new File([u8arr], filename, { type: mime });
    }

    return {
        save,
        load,
        saveImage,
        loadImage
    };
})();

export { DAO };