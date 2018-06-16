function makeEvents() {
    $.get("http://nyuchess-api.herokuapp.com/?type=FBEVENTS", function (responseText) {
        var data = JSON.parse(responseText);
        let max = 5;
        if (data["data"].length < 5) {
            max = data["data"].length;
        }
        createEvent(data, 0, max);
    });
}

function createEvent(data, i, max) {
    document.getElementsByClassName("events")[0].removeChild(document.getElementsByClassName("events")[0].lastChild);
    for (i; i < max; i++) {
        let event = document.createElement('div');
        event.className = "event";

        let pic = document.createElement('div');
        pic.className = "eventPic";
        pic.style.background = "url(../pictures/eventImages/" + roll() + ".jpg) no-repeat";

        let info = document.createElement('div');
        info.className = "eventInfo";

        let title = document.createElement('div');
        title.className = "eventTitle text-center";
        title.textContent = data["data"][i]["name"];
        title.style.fontFamily = fonts[Math.floor(Math.random() * fonts.length)];

        let link = document.createElement('a');
        link.href = "https://www.facebook.com/events/" + data["data"][i]["id"];
        link.target = "_blank";
        link.appendChild(title);

        let desc = document.createElement('div');
        desc.className = "eventDesc";
        if (desc.textContent = data["data"][i]["place"]) {
            desc.textContent = data["data"][i]["place"]["name"];
        } else {
            desc.textContent = "No place announced!";
        }
        if (data["data"][i]["start_time"]) {
            let date = new Date(data["data"][i]["start_time"]);
            desc.textContent += " " + date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + " at " + date.getHours() + ":" + date.getMinutes() + "\r\n\r\n";
        } else {
            desc.textContent += "No time announced!\n\n";
        }
        if (data["data"][i]["description"]) {
            desc.textContent += data["data"][i]["description"];
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
        $("#fadeIn").fadeIn("slow", function () {
        });
        event.id = "";
    }

    if (document.getElementsByClassName("events")[0].childNodes.length < data["data"].length - 1) {
        let div = document.createElement("div");
        document.getElementsByClassName("events")[0].lastChild.style.marginBottom = "4vw";
        div.className = "loadMore text-center";
        div.innerText = "Load Older Posts";
        div.addEventListener('click', function () {
            $.get("http://nyuchess-api.herokuapp.com/?type=FBEVENTS", function (responseText) {
                var data = JSON.parse(responseText);
                let start = document.getElementsByClassName("events")[0].childNodes.length - 1;
                let max = Math.min(start + 2, data["data"].length - 1);
                createEvent(data, start, max);
            });
        });
        document.getElementsByClassName("events")[0].appendChild(div);
    }
}

function roll() {
    return Math.floor((Math.random() * 20) + 1);
}