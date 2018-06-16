function makeHomeAndAbout() {
    $.get("http://nyuchess-api.herokuapp.com/?type=ORGSYNCPAGE", function (responseText) {
        //Add mission statement to HOME page
        var data = JSON.parse(responseText);
        document.getElementsByClassName("mission")[0].innerText = data["profile_responses"][0]["data"];
        document.getElementsByClassName("meetings")[0].innerText = data["profile_responses"][1]["data"];
        // Add Description to ABOUT page
        document.getElementsByClassName("description")[0].innerText = data["description"];
    });
}