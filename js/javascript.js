

window.addEventListener('load',
    function () {

        var pages = ["main", "about", "calendar", "contact", "events", "forms", "pictures", "not"];
        var curPage = 0;

        var fonts = ["Comic Sans MS", "Courier New", "Times New Roman", "Verdana", "Georgia", "Lucida Handwriting", "Trebuchet MS", "Bookman", "Garamond", "Impact"];

        var id = 61738;
        var key = 'u9G1Rt2PsBxbSDyO8i61w-gPXXaEQetClGfeq7v4mkM';
        var token = "EAACBHKPzZBGMBABJoOcpDl0QnT0LhzGbC6gm6WGZB9n8uGS0aIB1ZAtwGfHuU1b18pzqsg9NLTytgVBS34RHjtyniwAXY6ZAcwi1ZBa5doLyRdX02wG8VeqroNPcPTYm80ZCeDg6Jf1yzHdr8Rw2b6dIfwDMRYhBQZD";

        let leap = 0;
        if ((new Date().getFullYear() - 2000) % 4 === 0) {
            leap = 29
        } else {
            leap = 28
        }

        let months = {
            0: {"Days": 31, "Next": 1, "Prev": 11, "Name": "January"},
            1: {"Days": leap, "Next": 2, "Prev": 0, "Name": "February"},
            2: {"Days": 31, "Next": 3, "Prev": 1, "Name": "March"},
            3: {"Days": 30, "Next": 4, "Prev": 2, "Name": "April"},
            4: {"Days": 31, "Next": 5, "Prev": 3, "Name": "May"},
            5: {"Days": 30, "Next": 6, "Prev": 4, "Name": "June"},
            6: {"Days": 31, "Next": 7, "Prev": 5, "Name": "July"},
            7: {"Days": 31, "Next": 8, "Prev": 6, "Name": "August"},
            8: {"Days": 30, "Next": 9, "Prev": 7, "Name": "September"},
            9: {"Days": 31, "Next": 10, "Prev": 8, "Name": "October"},
            10: {"Days": 30, "Next": 11, "Prev": 9, "Name": "November"},
            11: {"Days": 31, "Next": 0, "Prev": 10, "Name": "December"},
            "January": 0,
            "February": 1,
            "March": 2,
            "April": 3,
            "May": 4,
            "June": 5,
            "July": 6,
            "August": 7,
            "September": 8,
            "October": 9,
            "November": 10,
            "December": 11
        };

        (function () {
            var redirect = sessionStorage.redirect;
            delete sessionStorage.redirect;
            if (redirect && redirect !== location.href) {
                var check = redirect.replace("http://nyuchess.com/", "");
                if (pages.indexOf(check) < 0) {
                    check = "not";
                    redirect = "404"
                }
                history.replaceState(null, "", redirect);
                document.getElementsByClassName(pages[curPage])[0].style.display = "none";
                document.getElementsByClassName(check)[0].style.display = "block";
                if (check !== "not") {
                    onPage(pages.indexOf(check));
                }
                curPage = pages.indexOf(check);
            }
            else {
                $(".main").fadeIn("slow", function () {
                });
                onPage(pages.indexOf("main"));
            }
        })();

        var admins = {};

        function getAdmins(url) {
            jQuery.ajax({
                url: url,
                success: function (responseText) {
                    for (var i = 0; i < responseText["data"].length; i++) {
                        if (responseText["data"][i]["administrator"]) {
                            admins[responseText["data"][i]["name"]] = responseText["data"][i]["id"];
                        }
                    }
                    if (responseText["paging"] && responseText["paging"]["next"]) {
                        getAdmins(responseText["paging"]["next"]);
                    } else {
                        $.get('https://api.engage.nyu.edu/api/v01/orgs/' + id + '?key=' + key, function (responseText) {
                            //Add people to contact us
                            var contacts = [];

                            getData(contacts, "President", responseText);
                            getData(contacts, "Vice President", responseText);
                            getData(contacts, "Treasurer", responseText);
                            getData(contacts, "Secretary", responseText);
                            getData(contacts, "Webmaster", responseText);

                            var cons = {};

                            for (var i = 0; i < contacts.length; i++) {
                                var pos = "";
                                if ((contacts[i]["FN"] + " " + contacts[i]["LN"]) in cons && "Pos" in cons[contacts[i]["FN"] + " " + contacts[i]["LN"]]) {
                                    pos = cons[contacts[i]["FN"] + " " + contacts[i]["LN"]]["Pos"] + ", " + contacts[i]["Pos"];
                                } else {
                                    pos = contacts[i]["Pos"];
                                }
                                cons[contacts[i]["FN"] + " " + contacts[i]["LN"]] = {"Pos": pos, id: contacts[i]["ID"]};
                            }

                            var type = 0;
                            for (var key in cons) {
                                if (cons.hasOwnProperty(key)) {
                                    var div = document.createElement("div");
                                    div.className = "contactBorder" + ((type % 2) + 1);
                                    if (Object.keys(cons).length % 2 !== 0) {
                                        if (type === 0) {
                                            div.style.marginLeft = "17vw";
                                        }
                                        if (type !== 0 && type % 2 === 0) {
                                            div.style.float = "right";
                                        }
                                    } else {
                                        if (type % 2 === 1) {
                                            div.style.float = "right";
                                        }
                                    }

                                    type++;
                                    var conPic = document.createElement("div");
                                    conPic.className = "contactPic";
                                    var pic = document.createElement("img");
                                    pic.src = "https://graph.facebook.com/v2.10/" + admins[key] + "/picture?access_token=" + token + "&type=large";
                                    conPic.appendChild(pic);

                                    var conDet = document.createElement("div");
                                    conDet.className = "contactDetails";

                                    var conName = document.createElement("div");
                                    conName.className = "contactName text-center";
                                    conName.innerText = key;
                                    if (conName.innerText.length > 15) {
                                        conName.style.lineHeight = "100%";
                                        conName.style.marginBottom = "2.5%";
                                    }
                                    conName.style.fontFamily = fonts[Math.floor(Math.random() * fonts.length)];

                                    var conSpec = document.createElement("div");
                                    conSpec.className = "contactSpec";
                                    conSpec.innerText = cons[key]["Pos"];

                                    var conCon = document.createElement("div");
                                    conCon.className = "contactContact";
                                    conCon.innerText = cons[key]["id"] + "@nyu.edu";

                                    conDet.appendChild(conName);
                                    conDet.appendChild(conSpec);
                                    conDet.appendChild(conCon);

                                    div.appendChild(conPic);
                                    div.appendChild(conDet);

                                    document.getElementsByClassName("contact")[0].appendChild(div);

                                }
                            }
                        });
                    }
                },
                async: true
            });
        }

        getAdmins('https://graph.facebook.com/v2.10/194680683893776/members?access_token=' + token);

        $.get('https://api.engage.nyu.edu/api/v01/orgs/' + id + '?key=' + key, function (responseText) {
            //Add mission statement to homepage
            document.getElementsByClassName("mission")[0].innerText = responseText["profile_responses"][0]["data"];
            document.getElementsByClassName("meetings")[0].innerText = responseText["profile_responses"][1]["data"];

            document.getElementsByClassName("description")[0].innerText = responseText["description"];
        });

        function updateCalendar(dir) {
            $.get("https://api.engage.nyu.edu/api/v01/orgs/61738/events?key=" + key, function (responseText) {

                $('.calNext').css("pointer-events", "none");
                $('.calPrev').css("pointer-events", "none");

                let date = new Date();
                let mo = months[document.getElementsByClassName("curMonth")[0].innerText] + dir;
                let nextYear = document.getElementsByClassName("curYear")[0].innerText;

                let change = -1;

                if (mo === -1) {
                    mo = 11;
                    nextYear = parseInt(document.getElementsByClassName("curYear")[0].innerText) - 1;
                    change = 0;
                } else if (mo === 12) {
                    mo = 0;
                    nextYear = parseInt(document.getElementsByClassName("curYear")[0].innerText) + 1;
                    change = 0;
                }

                let when = [];
                for (let x = 0; x < responseText.length; x++) {
                    for (let i = 0; i < responseText[x]["occurrences"].length; i++) {
                        let starts = responseText[x]["occurrences"][i]["starts_at"];
                        if (starts.indexOf("Z") < 0) {
                            starts = starts.replace("-", " ");
                        }
                        let date = new Date(starts);
                        if (parseInt(nextYear) === date.getFullYear() && date.getMonth() === mo) {
                            when.push(date.getDate());
                        }
                    }
                }

                if (change !== -1) {
                    document.getElementsByClassName("curYear")[0].className = "curYear calFade";
                }

                $(".calFade").fadeOut("slow", function () {
                    document.getElementsByClassName("curMonth")[0].innerText = months[mo]["Name"];
                    while (document.getElementsByClassName("days")[0].firstChild) {
                        document.getElementsByClassName("days")[0].removeChild(document.getElementsByClassName("days")[0].firstChild);
                    }

                    if (nextYear !== -1) {
                        document.getElementsByClassName("curYear")[0].innerText = nextYear;
                    }

                    let buffer = new Date("" + (mo + 1) + " 01 " + document.getElementsByClassName("curYear")[0].innerText);

                    let buff = buffer.getDay() - 1;
                    if (buff === -1) {
                        buff = 6;
                    }

                    for (let i = 0; i < buff; i++) {
                        let li = document.createElement("li");
                        document.getElementsByClassName("days")[0].appendChild(li);
                    }

                    for (var i = 1; i <= months[mo]["Days"]; i++) {
                        let li = document.createElement("li");
                        if (i === date.getDay() + 1 && months[document.getElementsByClassName("curMonth")[0].innerText] === date.getMonth()) {
                            let span = document.createElement("span");
                            span.className = "active";
                            span.innerText = i;
                            li.appendChild(span);
                        } else {
                            li.innerText = i;
                        }
                        if (when.indexOf(i) > -1) {
                            li.className = "marked";
                            li.addEventListener('click', function () {
                                window.open('https://orgsync.com/61738/events?view=upcoming', '_blank');
                            });
                        }
                        document.getElementsByClassName("days")[0].appendChild(li);
                    }

                    $(".calFade").fadeIn("slow", function () {
                        $('.calNext').css("pointer-events", "auto");
                        $('.calPrev').css("pointer-events", "auto");
                        if (change !== -1) {
                            document.getElementsByClassName("curYear")[0].className = "curYear";
                        }
                    });
                });
            });
        }

        function getData(arr, position, responseText) {
            var obj = {};

            var dontAsk = [];
            dontAsk.push(obj);

            for (var i = 0; i < responseText["profile_responses"].length; i++) {
                if (responseText["profile_responses"][i]["element"]["name"] === (position + " First Name")) {
                    var multiple = responseText["profile_responses"][i]["data"].split(" ");
                    for (var j = 0; j < multiple.length; j++) {
                        if (multiple[j] === "") {
                            multiple.splice(j, 1);
                            j--;
                        }
                    }
                    while (multiple.length > dontAsk.length) {
                        dontAsk.push({});
                    }
                    for (var j = 0; j < multiple.length; j++) {
                        dontAsk[j]["FN"] = multiple[j];
                    }
                }
                if (responseText["profile_responses"][i]["element"]["name"] === (position + " Last Name")) {
                    var multiple = responseText["profile_responses"][i]["data"].split(" ");
                    for (var j = 0; j < multiple.length; j++) {
                        if (multiple[j] === "") {
                            multiple.splice(j, 1);
                            j--;
                        }
                    }
                    while (multiple.length > dontAsk.length) {
                        dontAsk.push({});
                    }
                    for (var j = 0; j < multiple.length; j++) {
                        dontAsk[j]["LN"] = multiple[j];
                    }
                }
                if (responseText["profile_responses"][i]["element"]["name"] === (position + " Net ID")) {
                    var multiple = responseText["profile_responses"][i]["data"].split(" ");
                    for (var j = 0; j < multiple.length; j++) {
                        if (multiple[j] === "") {
                            multiple.splice(j, 1);
                            j--;
                        }
                    }
                    while (multiple.length > dontAsk.length) {
                        dontAsk.push({});
                    }
                    for (var j = 0; j < multiple.length; j++) {
                        dontAsk[j]["ID"] = multiple[j];
                        dontAsk[j]["Pos"] = position;
                    }
                }
            }

            for (var i = 0; i < dontAsk.length; i++) {
                arr.push(dontAsk[i]);
            }

        }

        $(function () {
            $.get("https://api.engage.nyu.edu/api/v01/orgs/61738/events?key=" + key, function (responseText) {
                let when = [];
                for (let x = 0; x < responseText.length; x++) {
                    for (let i = 0; i < responseText[x]["occurrences"].length; i++) {
                        let starts = responseText[x]["occurrences"][i]["starts_at"];
                        if (starts.indexOf("Z") < 0) {
                            starts = starts.replace("-", " ");
                        }
                        let date = new Date(starts);
                        if (date.getFullYear() === new Date().getFullYear() && date.getMonth() === new Date().getMonth()) {
                            when.push(date.getDate());
                        }
                    }
                }
                // Make calendar
                let date = new Date();

                document.getElementsByClassName("curMonth")[0].innerText = months[date.getMonth()]["Name"];
                document.getElementsByClassName("curYear")[0].innerText = date.getFullYear();

                let buffer = new Date("" + (date.getMonth() + 1) + " 01 " + document.getElementsByClassName("curYear")[0].innerText);

                let buff = buffer.getDay() - 1;
                if (buff === -1) {
                    buff = 6;
                }
                for (let i = 0; i < buff; i++) {
                    let li = document.createElement("li");
                    document.getElementsByClassName("days")[0].appendChild(li);
                }

                for (var i = 1; i <= months[date.getMonth()]["Days"]; i++) {
                    let li = document.createElement("li");
                    if (i === date.getDay() + 1) {
                        let span = document.createElement("span");
                        span.className = "active";
                        span.innerText = i;
                        li.appendChild(span);
                    } else {
                        li.innerText = i;
                    }
                    if (when.indexOf(i) > -1) {
                        li.className = "marked";
                        li.addEventListener('click', function () {
                            window.open('https://orgsync.com/61738/events?view=upcoming', '_blank');
                        });
                    }
                    document.getElementsByClassName("days")[0].appendChild(li);
                }
            });

            let i = 0;
            function forms(url) {
                $.get(url, function (responseText) {
                    if(i < 10*(new Date().getFullYear() - 2015)) {
                        for(let x = 0; x < responseText["data"].length; x++) {
                            if(responseText["data"][x]["message"]) {
                                if(responseText["data"][x]["message"].toLowerCase().indexOf("http") > -1 &&
                                    (responseText["data"][x]["message"].toLowerCase().indexOf(" eboard ") > -1
                                        || responseText["data"][x]["message"].toLowerCase().indexOf(" e-board ") > -1
                                        || responseText["data"][x]["message"].toLowerCase().indexOf(" election ") > -1)) {

                                    let div = document.createElement("div");
                                    div.className = "fullForm";
                                    let title = document.createElement("div");
                                    let link = document.createElement("a");

                                    let data = responseText["data"][x]["message"];
                                    data = data.replace(/[\n\r]/g, " ");
                                    let words = data.split(" ");
                                    let form = "";

                                    for(let j = 0; j < words.length; j ++) {
                                        if(words[j].toLowerCase().indexOf("http") > -1) {
                                            form = words[j];
                                        }
                                    }

                                    link.href = form;

                                    if(form.length > 30) {
                                        form = form.substr(0, 30) + "...";
                                    }

                                    let date = new Date(responseText["data"][x]["updated_time"]);

                                    title.innerText = form + " - " + date.getFullYear();

                                    link.appendChild(title);
                                    title.className = "formLink text-center";

                                    let msg = document.createElement("div");
                                    msg.className = "formMsg";
                                    msg.innerText = responseText["data"][x]["message"];

                                    div.appendChild(link);
                                    div.appendChild(msg);

                                    document.getElementsByClassName("forms")[0].appendChild(div);
                                }
                            }
                        }
                        i++;
                        if(responseText["paging"]["next"]) {
                            forms(responseText["paging"]["next"]);
                        }
                    }
                });
            }

            forms("https://graph.facebook.com/v2.10/194680683893776/feed?access_token=" + token);

            // https://graph.facebook.com/v2.10/194680683893776?access_token=" + token + "&fields=albums

            let manyBefore = 0;
            let maxAlb = 0;
            function albumPics(url) {
                $.get(url, function (responseText) {
                    maxAlb = Math.max(maxAlb, responseText["albums"]["data"].length);
                    for(let x = 0; x < responseText["albums"]["data"].length; x++) {
                        if(x === responseText["albums"]["data"].length - 1) {
                            setTimeout(function() { albumId(responseText["albums"]["data"][x]["id"], false, true, (x + (maxAlb * manyBefore))); }, 2000 * x);
                        } else {
                            setTimeout(function() { albumId(responseText["albums"]["data"][x]["id"], false, false, (x + (maxAlb * manyBefore))); }, 2000 * x );
                        }
                    }
                    if (responseText["paging"] && responseText["paging"]["next"]) {
                        albumPics(responseText["paging"]["next"]);
                        manyBefore++;
                    }
                });
            }

            let picID = [[], [], [], [], []];

            function albumId(id, url, build, index) {
                if(!url) {
                    $.get("https://graph.facebook.com/v2.10/" + id + "/photos?access_token=" + token + "&fields=albums", function (responseText) {
                        for (let j = 0; j < responseText["data"].length; j++) {
                            picID[index].push(responseText["data"][j]["id"]);
                        }
                        if (responseText["paging"] && responseText["paging"]["next"]) {
                            albumId(responseText["paging"]["next"], true, build, index);
                        } else {
                            if(build) {
                                generate();
                                console.log("building");
                            }
                        }
                    });
                } else {
                    $.get(id, function (responseText) {
                        for (let j = 0; j < responseText["data"].length; j++) {
                            picID[index].push(responseText["data"][j]["id"]);
                        }
                        if (responseText["paging"] && responseText["paging"]["next"]) {
                            albumId(responseText["paging"]["next"], true, build, index);
                        } else {
                            if(build) {
                                generate();
                                console.log("building");
                            }
                        }
                    });
                }
            }

            albumPics("https://graph.facebook.com/v2.10/194680683893776/?fields=albums&access_token=" + token);

            let pictureIDs = [];

            function generate() {
                for(let i = 0; i < picID.length; i ++) {
                    for(let j = 0; j < picID[i].length; j++) {
                        pictureIDs.push(picID[i][j]);
                    }
                }

                picID = null;
                buildPics();
            }

            function buildPics() {

                for(let i = 0; i < Math.min(pictureIDs.length, 9); i++) {
                    let div = document.createElement("div");
                    div.className = "pic";
                    div.style.background = "url(" + "https://graph.facebook.com/" + pictureIDs[i] + "/picture?access_token=" + token + ") no-repeat center";
                    div.style.backgroundSize = "contain";
                    document.getElementsByClassName("picsPage")[0].appendChild(div);
                }
                pictureIDs.splice(0, Math.min(pictureIDs.length, 9));
                let div = document.createElement("div");
                div.className = "loadMorePics text-center";
                div.innerText = "Load More Pics";
                div.addEventListener('click', function() {
                    document.getElementsByClassName("pictures")[0].removeChild(document.getElementsByClassName("pictures")[0].lastChild);
                    buildPics();
                });
                document.getElementsByClassName("pictures")[0].appendChild(div);
            }

        });

        document.getElementsByClassName("calPrev")[0].addEventListener("click", function () {
            updateCalendar(-1);
        });
        document.getElementsByClassName("calNext")[0].addEventListener("click", function () {
            updateCalendar(1);
        });

        document.getElementsByClassName("aboutBar")[0].addEventListener('click', function () {
            if (location.href !== "http://nyuchess.com/about") {
                history.pushState(null, '', '/about');
                loadPage(pages.indexOf("about"));
            }
        });

        document.getElementsByClassName("calendarBar")[0].addEventListener('click', function () {
            if (location.href !== "http://nyuchess.com/calendar") {
                history.pushState(null, '', '/calendar');
                loadPage(pages.indexOf("calendar"));
            }
        });

        document.getElementsByClassName("contactBar")[0].addEventListener('click', function () {
            if (location.href !== "http://nyuchess.com/contact") {
                history.pushState(null, '', '/contact');
                loadPage(pages.indexOf("contact"));
            }
        });

        document.getElementsByClassName("eventsBar")[0].addEventListener('click', function () {
            if (location.href !== "http://nyuchess.com/events") {
                history.pushState(null, '', '/events');
                loadPage(pages.indexOf("events"));
            }
        });

        document.getElementsByClassName("formsBar")[0].addEventListener('click', function () {
            if (location.href !== "http://nyuchess.com/forms") {
                history.pushState(null, '', '/forms');
                loadPage(pages.indexOf("forms"));
            }
        });

        for (var i = 0; i < document.getElementsByClassName("mainBar").length; i++) {
            document.getElementsByClassName("mainBar")[i].addEventListener('click', function () {
                if (location.href !== "http://nyuchess.com/") {
                    history.pushState(null, '', '/');
                    loadPage(pages.indexOf("main"));
                }
            });
        }

        document.getElementsByClassName("picturesBar")[0].addEventListener('click', function () {
            if (location.href !== "http://nyuchess.com/pictures") {
                history.pushState(null, '', '/pictures');
                loadPage(pages.indexOf("pictures"));
            }
        });

        window.onpopstate = function () {
            var toPage = location.href;
            var ext = toPage.replace("http://nyuchess.com/", "");
            if (ext === "") {
                ext = "main";
            }
            if (ext === "404") {
                ext = "not";
            }
            loadPage(pages.indexOf(ext));
        };


        $.get('https://graph.facebook.com/v2.10/194680683893776/events?access_token=' + token, function (responseText) {
            var max = 5;
            if (responseText["data"].length < 5) {
                max = responseText["data"].length;
            }
            createEvent(responseText, 0, max);
        });

        function roll() {
            return Math.floor((Math.random() * 20) + 1);
        }

        function createEvent(responseText, i, max) {
            document.getElementsByClassName("events")[0].removeChild(document.getElementsByClassName("events")[0].lastChild);
            for (i; i < max; i++) {
                var event = document.createElement('div');
                event.className = "event";

                var pic = document.createElement('div');
                pic.className = "eventPic";
                pic.style.background = "url(../pictures/eventImages/" + roll() + ".jpg) no-repeat";

                var info = document.createElement('div');
                info.className = "eventInfo";

                var title = document.createElement('div');
                title.className = "eventTitle text-center";
                title.textContent = responseText["data"][i]["name"];
                title.style.fontFamily = fonts[Math.floor(Math.random() * fonts.length)];

                var link = document.createElement('a');
                link.href = "https://www.facebook.com/events/" + responseText["data"][i]["id"];
                link.target = "_blank";
                link.appendChild(title);

                var desc = document.createElement('div');
                desc.className = "eventDesc";
                if (desc.textContent = responseText["data"][i]["place"]) {
                    desc.textContent = responseText["data"][i]["place"]["name"];
                } else {
                    desc.textContent = "No place announced!";
                }
                if (responseText["data"][i]["start_time"]) {
                    let date = new Date(responseText["data"][i]["start_time"]);
                    desc.textContent += " " + date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + " at " + date.getHours() + ":" + date.getMinutes() + "\r\n\r\n";
                } else {
                    desc.textContent += "No time announced!\n\n";
                }
                if (responseText["data"][i]["description"]) {
                    desc.textContent += responseText["data"][i]["description"];
                } else {
                    desc.textContent += "No description available!";
                }

                info.appendChild(link);
                info.appendChild(desc);
                event.appendChild(pic);
                event.appendChild(info);

                if (i === max - 1) {
                    event.style.marginBottom = "0";
                }
                event.id = "fadeIn";
                document.getElementsByClassName("events")[0].appendChild(event);
                $("#fadeIn").fadeIn("fast", function () {
                });
                event.id = "";
            }

            if (document.getElementsByClassName("events")[0].childNodes.length < responseText["data"].length - 1) {
                var div = document.createElement("div");
                document.getElementsByClassName("events")[0].lastChild.style.marginBottom = "4vw";
                div.className = "loadMore text-center";
                div.innerText = "Load Older Posts";
                div.addEventListener('click', function () {
                    $.get('https://graph.facebook.com/v2.10/194680683893776/events?access_token=' + token, function (responseText) {
                        var start = document.getElementsByClassName("events")[0].childNodes.length - 1;
                        var max = Math.min(start + 2, responseText["data"].length - 1);
                        createEvent(responseText, start, max);
                    });
                });
                document.getElementsByClassName("events")[0].appendChild(div);
            }
        }
        function loadPage(x) {
            disable();
            $("." + pages[curPage]).fadeOut("slow", function () {
                offPage(curPage);
                onPage(x);
                var $win = $(window);
                document.body.scrollTop = 0; // For Chrome, Safari and Opera
                document.documentElement.scrollTop = 0; // For IE and Firefox
                $("." + pages[x]).fadeIn("slow", function () {
                    curPage = x;
                    enable();
                });
            });
        }

        function disable() {
            $('.topBar').css("pointer-events", "none");//disabled buttons
        }

        function enable() {
            $('.topBar').css("pointer-events", "auto");//enabled buttons
        }

        function offPage(x) {
            $('.' + pages[x] + "Bar").css("border-color", "#333");
        }

        function onPage(x) {
            $('.' + pages[x] + "Bar").css("border-color", "white");
        }

    }, false);

