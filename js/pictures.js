var albumIDs = [];
var picIDs = [];

var nextChild = null;
var prevChild = null;
var curChild = null;

function makePictures() {
    albums("http://nyuchess-api.herokuapp.com/?type=FBALBUMS");
    focusListeners();
}

function buildPics() {

    for(let i = 0; i < Math.min(picIDs.length, 9); i++) {
        let div = document.createElement("div");
        div.className = "pic";
        div.style.background = "url(" + "https://graph.facebook.com/" + picIDs[i] + "/picture) no-repeat center";
        div.style.backgroundSize = "contain";
        div.id = "fadeIn";
        div.addEventListener('click', function() {
            showImage(div);
        });
        document.getElementsByClassName("picsPage")[0].appendChild(div);
        $("#fadeIn").fadeIn("slow", function () {
        });
        div.id = "";
    }
    picIDs.splice(0, Math.min(picIDs.length, 9));
    let div = document.createElement("div");
    div.className = "loadMorePics text-center";
    div.innerText = "Load More Pics";
    div.addEventListener('click', function() {
        document.getElementsByClassName("pictures")[0].removeChild(document.getElementsByClassName("pictures")[0].lastChild);
        buildPics();
    });
    document.getElementsByClassName("pictures")[0].appendChild(div);
}

function pics(albumID, URL) {

    var req;
    if(URL) {
        req = albumID;
    } else {
        req = "http://nyuchess-api.herokuapp.com/?type=FBPICS&id=" + albumID;
    }

    $.get(req, function (data) {
        var responseText = myJSON(data);

        for (let i = 0; i < responseText["data"].length; i++) {
            picIDs.push(responseText["data"][i]["id"]);
        }

        if (responseText["paging"] && responseText["paging"]["next"]) {
            pics(responseText["paging"]["next"], true);
        } else {
            if(albumIDs.length > 0) {
                pics(albumIDs.shift(), false);
            } else {
                buildPics();
            }
        }
    });
}

function albums(url) {
    $.get(url, function(data) {
        var responseText = myJSON(data);

        for(var i = 0; i < responseText["albums"]["data"].length; i++) {
            albumIDs.push(responseText["albums"]["data"][i]["id"]);
        }

        if (responseText["paging"] && responseText["paging"]["next"]) {
            albums(responseText["paging"]["next"]);
        } else {
            if(albumIDs.length > 0) {
                pics(albumIDs.shift(), false);
            }
        }
    });
}

function showImage(div) {
    prevChild = div.previousSibling;
    nextChild = div.nextSibling;
    curChild = div;
    document.getElementsByClassName("fullscreen")[0].style.display = "block";
    document.getElementsByClassName("focusPic")[0].style.background = div.style.background; // Onclick of button the background image of body will be test here. Give the image path in url
}

function focusListeners() {
    document.getElementsByClassName("leftArrow")[0].addEventListener('click', function() {
        if(prevChild) {
            showImage(prevChild);
        }
    });

    document.getElementsByClassName("rightArrow")[0].addEventListener('click', function() {
        if(nextChild) {
            showImage(nextChild);
        } else {
            document.getElementsByClassName("pictures")[0].removeChild(document.getElementsByClassName("pictures")[0].lastChild);
            buildPics();
            nextChild = curChild.nextSibling;
            showImage(nextChild);
        }
    });

    document.getElementsByClassName("focusPic")[0].addEventListener('click', function() {
        document.getElementsByClassName("fullscreen")[0].style.display = "none";
    });
}