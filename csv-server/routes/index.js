const express = require("express");
const map = require("./map");

module.exports = function(app){
    app.use(express.json());
    app.use("/", map)
}