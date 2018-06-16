function makeForms() {
    forms("http://nyuchess-api.herokuapp.com/?type=FBFEED", 0);
}

function forms(url, i) {
    $.get(url, function (data) {
        var responseText;

        if(typeof(data) === "string") {
            responseText = JSON.parse(data);
        } else {
            responseText = data;
        }

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
            if(responseText["paging"] != null && responseText["paging"]["next"]) {
                forms(responseText["paging"]["next"], i);
            }
        }
    });
}