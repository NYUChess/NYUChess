var pages = ["main", "about", "calendar", "contact", "events", "forms", "news", "pictures"];
var curPage = 0;


$(function() {
    console.log( "ready!" );

});

window.addEventListener('load',
    function() {

        (function(){
            var redirect = sessionStorage.redirect;
            delete sessionStorage.redirect;
            if (redirect && redirect !== location.href) {
                history.replaceState(null, "", redirect);
                // REMOVE THIS - just showing the redirect route in the UI
                alert('This page was redirected by 404.html, from the route: ' + redirect);
            }
            else {
                // REMOVE THIS - just showing the redirect route in the UI
                alert('This page was loaded directly from the index.html file');
            }
        })();

        console.log("trying click");

        document.getElementsByClassName("aboutBar")[0].addEventListener('click', function(event) {
            if(location.href !== "http://nyuchess.com/about") {
                history.pushState(null, '', '/about');
                loadPage(1);
            }
        });

        document.getElementsByClassName("calendarBar")[0].addEventListener('click', function(event) {
            if(location.href !== "http://nyuchess.com/calendar") {
                history.pushState(null, '', '/calendar');
                loadPage(2);
            }
        });

        document.getElementsByClassName("contactBar")[0].addEventListener('click', function(event) {
            if(location.href !== "http://nyuchess.com/contact") {
                history.pushState(null, '', '/contact');
                loadPage(3);
            }
        });

        document.getElementsByClassName("eventsBar")[0].addEventListener('click', function(event) {
            if(location.href !== "http://nyuchess.com/events") {
                history.pushState(null, '', '/events');
                loadPage(4);
            }
        });

        document.getElementsByClassName("formsBar")[0].addEventListener('click', function(event) {
            if(location.href !== "http://nyuchess.com/forms") {
                history.pushState(null, '', '/forms');
                loadPage(5);
            }
        });

        for(var i = 0; i < 2; i++) {
            document.getElementsByClassName("mainBar")[i].addEventListener('click', function (event) {
                if (location.href !== "http://nyuchess.com/") {
                    history.pushState(null, '', '/');
                    loadPage(0);
                }
            });
        }

        document.getElementsByClassName("newsBar")[0].addEventListener('click', function(event) {
            if(location.href !== "http://nyuchess.com/news") {
                history.pushState(null, '', '/news');
                loadPage(6);
            }
        });

        document.getElementsByClassName("picturessBar")[0].addEventListener('click', function(event) {
            if(location.href !== "http://nyuchess.com/pictures") {
                history.pushState(null, '', '/pictures');
                loadPage(7);
            }
        });


        console.log("Setting up click");
    }, false);

function loadPage(x) {
    console.log("fading out page");
    disable();
    $("." + pages[curPage]).fadeOut("slow", function() {
        offPage(curPage);
        onPage(x);
        $("." + pages[x]).fadeIn("slow", function() {
            curPage = x;
            enable();
       }) ;
    });
}

function disable() {
    console.log("disabling");
    $('.topBar').css("pointer-events", "none");//disabled buttons
}

function enable() {
    console.log("activating");
    $('.topBar').css("pointer-events", "auto");//enabled buttons
}

function offPage(x) {
    $('.' + pages[x] + "Bar").css("border-color", "#333");
}

function onPage(x) {
    $('.' + pages[x] + "Bar").css("border-color", "white");
}