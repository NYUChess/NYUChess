const express = require('express');
const app = express();

app.get('/', function (req, res) {
    console.log("got");
    alert("HEY");
    res.send('hello world')
});

$(function() {
    console.log( "ready!" );

});

window.addEventListener('load',
    function() {


// respond with "hello world" when a GET request is made to the homepage
        app.get('/', function (req, res) {
            alert("HEY");
            res.send('hello world')
        });


    }, false);