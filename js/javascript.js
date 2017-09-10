var pages = [];
var curPage = 0;

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

$(function() {
    console.log( "ready!" );

});

window.addEventListener('load',
    function() {
        document.getElementsByClassName("about")[0].addEventListener('click', function (event) {
            history.pushState(null, '', '/about');
        });
    }, false);