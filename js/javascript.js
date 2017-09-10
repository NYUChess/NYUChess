var pages = ["main", "about", "calendar", "contact", "events", "forms", "news", "pictures", "404"];
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
                var check = redirect.replace("http://nyuchess.com/","");
                if(pages.indexOf(check) < 0) {check = "404";}
                alert(check);
                document.getElementsByClassName(pages[curPage])[0].style.display = "none";
                document.getElementsByClassName(check)[0].style.display = "block";
                onPage(pages.indexOf(check));
                curPage = pages.indexOf(check);
                // REMOVE THIS - just showing the redirect route in the UI
                /*var check = redirect.replace("http://nyuchess.com/","");
                if(pages.indexOf(check) < 0) {check = "404";}

                if(pages.indexOf(check) > -1) {
                    alert(check);
                    document.getElementsByClassName(pages[curPage])[0].style.display = "none";
                    document.getElementsByClassName(check)[0].style.display = "block";
                    onPage(pages.indexOf(check));
                    curPage = pages.indexOf(check);
                } else {
                    document.getElementsByClassName(pages[curPage])[0].style.display = "none";
                    document.getElementsByClassName("404")[0].style.display = "block";
                    curPage = pages.indexOf("404");
                }*/
            }
            else {
                // REMOVE THIS - just showing the redirect route in the UI
                onPage(0);
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

        for(var i = 0; i < document.getElementsByClassName("mainBar").length; i++) {
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

        document.getElementsByClassName("picturesBar")[0].addEventListener('click', function(event) {
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