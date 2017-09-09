sessionStorage.redirect = location.href;

(function(){
    var redirect = sessionStorage.redirect;
    delete sessionStorage.redirect;
    if (redirect && redirect !== location.href) {
        history.replaceState(null, null, redirect);
        alert("redirect");
    }
    else {
        alert("index");
    }
})();

$(function() {
    console.log( "ready!" );

});

window.addEventListener('load',
    function() {

    alert("Yo WIP why are you here?");

    }, false);