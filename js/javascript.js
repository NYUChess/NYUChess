$(function() {
    console.log( "ready!" );

});

window.addEventListener('load',
    function() {
        document.getElementsByClassName("about")[0].addEventListener('click', function (event) {
            alert(event + " clicked about");
        });
    }, false);