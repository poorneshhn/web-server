const request = require("request");


function forecast(latitude, longitude, callback) {
    let url = "http://api.weatherstack.com/current?access_key=498a9de7f6d65bd93285a8ca96a9dc26&query="+ latitude +","+ longitude;

    request({url, json: true}, (error, { body }) => {
        if (error){
            callback("No internet connection or no response from the server. Try again later!", undefined);
        }else if (!body.current) {
            callback("Please enter a valid Longitude / Latitude or check if the free api sessions are over", undefined);
        }else
            callback(undefined, `The current temparature is ${body.current.temperature} but it feels like ${body.current.feelslike}`);
    });
}

module.exports = forecast;