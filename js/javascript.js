$(function() {
    console.log( "ready!" );

});

window.addEventListener('load',
    function() {
        document.getElementsByClassName("about")[0].addEventListener('click', function (event) {
            alert(event + " clicked about");
            alert(location.href);
            sessionStorage.redirect = location.href;
        });
    }, false);