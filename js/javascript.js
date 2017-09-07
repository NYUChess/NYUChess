const express = require('express');
const app = express();

$(function() {
    console.log( "ready!" );

});

window.addEventListener('load',
    function() {

        alert('Hello! This site is currently a WIP');

// respond with "hello world" when a GET request is made to the homepage
        app.get('/', function (req, res) {
            alert("HEY");
            res.send('hello world')
        });

        app.get('/test', function (req, res) {
            alert("HEY");
            res.send('hello world')
        });

    }, false);