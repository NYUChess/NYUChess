$(function() {
    console.log( "ready!" );

});

window.addEventListener('load',
    function() {
        document.getElementsByClassName("about")[0].addEventListener('click', function (event) {
            document.title = location.href + "/about";
            window.history.pushState({"html":response.html,"pageTitle":response.pageTitle});
        });
    }, false);