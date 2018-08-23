var fonts = ["Comic Sans MS", "Courier New", "Times New Roman", "Verdana", "Georgia", "Lucida Handwriting", "Trebuchet MS", "Bookman", "Garamond", "Impact"];
var pages = ["main", "about", "calendar", "contact", "events", "forms", "pictures", "not"];
var curPage = 0;

//alert("Due to API rate limiting, some pages may be blank until we can secure a higher rate limit.");

window.addEventListener("load", function() {
    /*
        Makeshift router using meta tags in the 404 page.
        Whole website is technically one page, use this to determine which page to load from the above array
     */
    (function () {
        let redirect = sessionStorage.redirect;
        delete sessionStorage.redirect;
        if (redirect && redirect !== location.href) {
            if(redirect.substring(redirect.length - 1) === "/") {
                redirect = redirect.substring(0, redirect.length - 1);
            }

            let check = redirect.replace("http://nyuchess.com/", "");
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

    // Setting back and forward button behaviors
    window.onpopstate = function () {
        let toPage = location.href;
        let ext = toPage.replace("http://nyuchess.com/", "");
        if (ext === "") {
            ext = "main";
        }
        if (ext === "404") {
            ext = "not";
        }
        loadPage(pages.indexOf(ext));
    };

    makeHomeAndAbout();
    makeCalendar();
    makeEvents();
    makePictures();
    makeForms();
    makeContact();

    navigationBar();

    // Set up clicks for navigating through the calendar months
    document.getElementsByClassName("calPrev")[0].addEventListener("click", function () {
        updateCalendar(-1);
    });
    document.getElementsByClassName("calNext")[0].addEventListener("click", function () {
        updateCalendar(1);
    });
    // ---------------------------------------------------------

}, false);

function loadPage(x) {
    disable();
    $("." + pages[curPage]).fadeOut("slow", function () {
        offPage(curPage);
        onPage(x);
        let $win = $(window);
        document.body.scrollTop = 0; // For Chrome, Safari and Opera
        document.documentElement.scrollTop = 0; // For IE and Firefox
        $("." + pages[x]).fadeIn("slow", function () {
            curPage = x;
            enable();
        });
    });
}

function navigationBar() {
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

    for (let i = 0; i < document.getElementsByClassName("mainBar").length; i++) {
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

function myJSON(obj) {
    if(typeof(obj) === "string") {
        return JSON.parse(obj);
    } else {
        return obj;
    }
}
