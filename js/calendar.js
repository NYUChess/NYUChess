var leap = 0;
if ((new Date().getFullYear() - 2000) % 4 === 0) {
    leap = 29
} else {
    leap = 28
}

var months = {
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

/*
    Method responsible for first creation of the calendar
 */
function makeCalendar() {
    $.get("http://nyuchess-api.herokuapp.com/?type=ORGSYNCEVENTS", function (responseText) {
        let when = [];
        var data = JSON.parse(responseText);
        for (let x = 0; x < data.length; x++) {
            for (let i = 0; i < data[x]["occurrences"].length; i++) {
                let starts = data[x]["occurrences"][i]["starts_at"];
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

        for (let i = 1; i <= months[date.getMonth()]["Days"]; i++) {
            let li = document.createElement("li");
            if (i === date.getDate()) {
                let span = document.createElement("span");
                span.className = "active";
                span.innerText = i;
                li.appendChild(span);
            } else {
                li.innerText = i.toString();
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
}

/*
    Update calendar function takes either 1 or -1 for going a month forwards or backwards
 */
function updateCalendar(dir) {
    $.get("http://nyuchess-api.herokuapp.com/?type=ORGSYNCEVENTS", function (responseText) {
        var data = JSON.parse(responseText);
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
        for (let x = 0; x < data.length; x++) {
            for (let i = 0; i < data[x]["occurrences"].length; i++) {
                let starts = data[x]["occurrences"][i]["starts_at"];
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

            for (let i = 1; i <= months[mo]["Days"]; i++) {
                let li = document.createElement("li");
                if (i === date.getDate() && months[document.getElementsByClassName("curMonth")[0].innerText] === date.getMonth()) {
                    let span = document.createElement("span");
                    span.className = "active";
                    span.innerText = i.toString();
                    li.appendChild(span);
                } else {
                    li.innerText = i.toString();
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