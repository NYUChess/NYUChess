$(function() {
    console.log( "ready!" );

});

window.addEventListener('load',
    function() {
        document.getElementsByClassName("about")[0].addEventListener('click', function (event) {
            alert(location.href);
            sessionStorage.redirect = location.href;
            var redirect = sessionStorage.redirect;
            delete sessionStorage.redirect;
        });
    }, false);