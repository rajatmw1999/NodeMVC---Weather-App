const path  = require("path");
const express = require('express');
const app = express();
const weatherRouter = require('./router');

app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use(express.static("public"));
app.set("views","../views");
app.set("view engine", "hbs");

app.use("/", weatherRouter);

app.listen(3000, () => {
    console.log("Server is running.");
});