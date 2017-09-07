var express = require("express");
var app = express();
var router = express.Router();

router.get("/",function(req,res){
    alert("hey");
});

$(function() {
    console.log( "ready!" );

});

window.addEventListener('load',
    function() {

    alert("Yo WIP why are you here?");

    }, false);