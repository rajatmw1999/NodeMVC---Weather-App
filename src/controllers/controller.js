const axios = require('axios')
const API_KEY = "84af6a3c04225fc1f75827d4043b7b3b";
const Weather = require("../model/weather");

exports.renderHomePage = (req, res) => {
    res.render("index")
}

exports.renderAboutPage = (req, res) => {
    res.render("about")
}

exports.getWeather = (req, res) => {
    const city = req.body.city;
    const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`;
    const weather = new Weather(req.body.city);
    weather.validateUserInput();

    if(weather.errors.length)
    {
        res.render('index',{
            error:weather.errors.toString()
        });
    }
    else
    {
        axios.get(url)
        .then((response) => {
            res.render('index',{
                temp: `It is currently ${response.data.main.temp - 273} degrees in ${city}.`
            });
        })
        .catch((err) => {
            console.log(err);
        });
    }   
}