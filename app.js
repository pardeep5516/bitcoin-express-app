const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');

const app = express();
app.use(bodyParser.urlencoded({
    extended: true
}));

app.get('/', function (req, res) {
    res.sendFile(__dirname + "/index.html");
});

app.post('/', function (req, res) {
    var crypto = req.body.crypto;
    var flat = req.body.flat;

    //!find price of bitcoin to other currency
    // var url = 'https://apiv2.bitcoinaverage.com/indices/global/ticker/';
    // var getData = url + crypto + flat;
    // request(getData, function (error, response, body) {
    //     // console.log(response.statusCode);
    //     var data = JSON.parse(body);
    //     var price = data.open.day;
    //     var currentDate = data.display_timestamp;
    //     res.write('<h1>hey there current date is ' + currentDate + '</h1>\n');
    //     res.write("<p>The current price of " + crypto + " is " + price + " " + flat + "</p>");
    //     res.send();

    var amounts = req.body.amount;
    var options = {
        url: 'https://apiv2.bitcoinaverage.com/convert/global?from=BTC&to=USD&amount=3.3',
        method: 'GET',
        qs: {
            from: crypto,
            to: flat,
            amount: amounts,
        }
    }
    request(options, function (error, response, body) {
        if (response.statusCode == 200) {
            var data = JSON.parse(body);
            var price = data.price;
            res.write("<h1>price converter in bitcoine to other currency</h1>");
            res.write("<h2>The price of   " + crypto + "   in " + flat + "  is  " + price + " </h2>");
            res.send();
        }
    });

});

app.listen(3000, function () {
    console.log('server is running on port 3000');
});