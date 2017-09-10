$(function() {
    console.log( "ready!" );

});

window.addEventListener('load',
    function() {
        document.getElementsByClassName("about")[0].addEventListener('click', function (event) {
            document.title = "NYUChess - About";
            history.pushState(null, '', '/about');
        });
    }, false);