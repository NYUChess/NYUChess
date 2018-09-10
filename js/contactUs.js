function makeContact() {
    getAdmins();
}

const backup = [{"Name": "Danny Wu", "ID": "dw1821", "Pos": "President"},
    {"Name": "Joe Martinez", "ID": "jm7365", "Pos": "Vice-President"},
    {"Name": "Avedis Baghdasarian", "ID": "ab6951", "Pos": "Treasurer"},
    {"Name": "Chris Colon", "ID": "cc5327", "Pos": "Secretary"},
    {"Name": "Victor Treaba", "ID": "vgt219", "Pos": "Webmaster"}];
const replace = false;

function getAdmins() {
    $.get("http://nyuchess-api.herokuapp.com/?type=ORGSYNCPAGE", function (data) {
        //Add people to contact us
        var responseText = myJSON(data);
        var contacts = getData(responseText);

        if(replace || contacts.length < 3) {
            contacts = backup;
        }

        for (var i = 0; i < contacts.length; i ++) {
            let div = document.createElement("div");
            div.className = "contactBorder" + ((i % 2) + 1);
            if (contacts.length % 2 !== 0) {
                if (i === 0) {
                    div.style.marginLeft = "17vw";
                }
                if (i !== 0 && i % 2 === 0) {
                    div.style.float = "right";
                }
            } else {
                if (i % 2 === 1) {
                    div.style.float = "right";
                }
            }

            let conPic = document.createElement("div");
            conPic.className = "contactPic";
            let pic = document.createElement("img");
            if(contacts[i]["Pos"].includes("President")) {
                pic.src = "../pictures/contactImages/king.jpg";
            } else if(contacts[i]["Pos"].includes("Webmaster")) {
                pic.src = "../pictures/contactImages/knight.jpg";
            } else if(contacts[i]["Pos"].includes("Treasurer")) {
                pic.src = "../pictures/contactImages/rook.jpg";
            } else if(contacts[i]["Pos"].includes("Secretary")) {
                pic.src = "../pictures/contactImages/bishop.jpg";
            }
            if(contacts[i]["Pos"].includes("Co-President")) {
                pic.src = "../pictures/contactImages/pawn.jpg";
            }
            if(contacts[i]["Pos"].includes("Vice President")) {
                pic.src = "../pictures/contactImages/queen.jpg";
            }
            conPic.appendChild(pic);

            let conDet = document.createElement("div");
            conDet.className = "contactDetails";

            let conName = document.createElement("div");
            conName.className = "contactName text-center";
            conName.innerText = contacts[i]["Name"];
            if (conName.innerText.length > 15) {
                conName.style.lineHeight = "100%";
                conName.style.marginBottom = "2.5%";
            }
            conName.style.fontFamily = fonts[Math.floor(Math.random() * fonts.length)];

            let conSpec = document.createElement("div");
            conSpec.className = "contactSpec";
            conSpec.innerText = contacts[i]["Pos"];

            let conCon = document.createElement("div");
            conCon.className = "contactContact";
            conCon.innerText = contacts[i]["ID"] + "@nyu.edu";

            conDet.appendChild(conName);
            conDet.appendChild(conSpec);
            conDet.appendChild(conCon);

            div.appendChild(conPic);
            div.appendChild(conDet);

            document.getElementsByClassName("contact")[0].appendChild(div);

        }
    });
}

function getData(data) {
    var keywords = ["President", "Co-President", "Vice President", "Treasurer", "Secretary", "Webmaster"];
    var contacts = {};

    for(var k = 0; k < keywords.length; k++) {
        for (var i = 0; i < data["profile_responses"].length; i++) {
            if (data["profile_responses"][i]["element"]["name"].includes(keywords[k] + " First Name")
            || data["profile_responses"][i]["element"]["name"].includes(keywords[k] + " Last Name")
            || data["profile_responses"][i]["element"]["name"].includes(keywords[k] + " Net ID")) {
                contacts[data["profile_responses"][i]["element"]["name"]] = data["profile_responses"][i]["data"];
            }
        }
    }

    var positions = [];
    // Webmaster does not have the same "XXXX-XXXX TITLE" pattern as the rest
    var newest = 0;
    var bestDate = 0;
    var person = "";
    var ID = "";

    for(i = 0; i < keywords.length - 1; i ++) {
        bestDate = 0;
        person = "";
        ID = "";
        for (var key in contacts) {
            //console.log(key + " - > " + contacts[key]);
            if(contacts.hasOwnProperty(key)) {
                var date = key.substring(0, 9).split("-");
                if (key.substring(10).startsWith(keywords[i])) {
                    if (parseInt(date[0]) > bestDate) {
                        if (key.includes(keywords[i] + " First Name")) {
                            person = contacts[key];
                        } else if (key.includes(keywords[i] + " Last Name")) {
                            person += " " + contacts[key];
                        } else if (key.includes(keywords[i] + " Net ID")) {
                            ID = contacts[key];
                            bestDate = parseInt(date[0]);
                            if (bestDate > newest) {
                                newest = bestDate;
                            }
                        }
                    }
                }
            }
        }
        positions.push({"Name": person, "ID": ID, "Pos": bestDate + " " + keywords[i]});
    }

    for(i = 0; i < positions.length; i ++) {
        if(parseInt(positions[i]["Pos"].substring(0, 5)) < newest) {
            positions.splice(i, 1);
            i --;
        }
    }

    for (key in contacts) {
        if (contacts.hasOwnProperty(key)) {
            if (key.includes("Webmaster First Name")) {
                person = contacts[key];
            } else if (key.includes("Webmaster Last Name")) {
                person += " " + contacts[key];
            } else if (key.includes("Webmaster Net ID")) {
                ID = contacts[key];
            }
        }
    }

    positions.push({"Name": person, "ID": ID, "Pos": "Webmaster"});

    for(i = 0; i < positions.length; i ++) {
        for(var j = i + 1; j < positions.length; j ++) {
            if(positions[i]["Name"] === positions[j]["Name"]) {
                positions[i]["Pos"] = positions[i]["Pos"] + ", " + positions[j]["Pos"].substring(5);
                positions.splice(j, 1);
                j --;
            }
        }
    }

    return positions;
}