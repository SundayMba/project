//includes packages
const exp = require("constants");
const express = require("express");
const https = require("https");
// const bodyparser = require("body-parser");

//an express function that creates a server application
const app = express();
const port = 3000;

app.use(express.urlencoded({extended: true}));

//remote servers 

//handling client get request
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
})

app.post("/", (req, res)=> {
   
    city = req.body.cityName;
    const url = "https://api.openweathermap.org/data/2.5/weather?q= " + city + "&appid=a4db38eb81b0c028caca64dafd8ffb89&units=metric";
     https.get(url, (response) => {

        response.on("data", (data) => {
            d = JSON.parse(data);
            const temp = d.main.temp;
            const description = d.weather[0].description;
            const location = d.name;
            const icon = d.weather[0].icon;
            const imageUrl = "http://openweathermap.org/img/wn/" + icon + "@2x.png ";
            res.write("<p>the wheather description is " + description + "</p>")
            res.write("<h1>the temperature in " + location + " is " + temp + "degree celcius</h1>");
            res.write("<img src=" + imageUrl + ">");
            res.send();
        })
    })
})


//listen to incoming client request
app.listen(port, () => {
    console.log(`server listening to 127.0.0.1:${port}`);
})