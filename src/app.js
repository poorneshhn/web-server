const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");
const app = express();


//set up paths
let viewsPath = path.join(__dirname, "../templates/views");
let pathToPublic = path.join(__dirname, "../public");
let partialPath = path.join(__dirname, "../templates/partials");


//set up handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialPath);


app.use(express.static(pathToPublic));

app.get("", (req, res) => {
    res.render("index", {
        title: "Weather",
        name: "Poornesh",
        age: 25,
        num: "9591626675"
    });
});

app.get("/help", (req, res) => {
    res.render("help", {
        title: "Help page",
        name: "Poornesh",
        num: "9591626675"
    });
})

app.get("/about", (req, res) => {
    res.render("about", {
        title: "About page",
        name: "Poornesh",
        age: 25,
        gender: "Male",
        num: "9591626675"
    });
});

app.get("/weather", (req, res) => {
    if(!req.query.address) {
        return res.send({
            Error: "Please provide an address"
            })
        }

        geocode(req.query.address, (error, { latitude, longitude, country} = {}) => {
            if(error) {
                return res.send({
                    Error: "Unabe to fetch the request! Please try again..."
                });
            }

            forecast(latitude, longitude, (error, forecastData) => {
                res.send({
                    forecast: forecastData,
                    Location: country, 
                    Address: req.query.address.toUpperCase()
                });
              })
        })        
});   

app.get("/help/*", (req, res) => {
    res.render("errorPage", {
        message: "help article not found",
        title: "About page",
        name: "Poornesh",
        age: 25,
        gender: "Male",
        num: "9591626675"
    });
});

app.get("*", (req, res) => {
    res.render("errorPage", {
        message: "Page not found",
        title: "About page",
        name: "Poornesh",
        age: 25,
        gender: "Male",
        num: "9591626675"
    })
});

app.listen(3000, () => {
    console.log("server is running");
});
