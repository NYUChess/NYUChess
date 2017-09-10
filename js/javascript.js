var pages = [];
var curPage = 0;

pages.push(document.getElementsByClassName("main")[0]);
pages.push(document.getElementsByClassName("about")[0]);

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
        document.getElementsByClassName("about")[0].addEventListener('click', function(event) {
            history.pushState(null, '', '/about');
            console.log("going to about");
            loadPage(1);
        });

        document.getElementsByClassName("calendar")[0].addEventListener('click', function(event) {
            console.log("Click test");
        });
        console.log("Setting up click");
    }, false);

function loadPage(x) {
    console.log("fading out page");
}