const express = require('express');
const https = require('https');
const bodyparser= require('body-parser');

const app=express();

app.use(bodyparser.urlencoded({extended:true}));
app.get("/",function(req,res){
    res.sendFile(__dirname+"/index.html");
});

app.post("/",function(req,res){

    const city=req.body.cityName

    const url="https://api.openweathermap.org/data/2.5/weather?q="+city+"&appid=9e8b0311e676abb752e64e06f521c0d8&units=metric";

    https.get(url,function(response){
    console.log(response.statusCode);

    response.on("data",function(data){
        const weatherData= JSON.parse(data)
        const temp= weatherData.main.temp
        const weatherDescription=weatherData.weather[0].description
        const icon=weatherData.weather[0].icon
        const imgurl="http://openweathermap.org/img/wn/"+ icon+"@2x.png"
        res.write("<p>The weather is currently"+weatherDescription+"</p>");
        res.write("<h1>The temperature in "+city+" is "+temp+" degree Celcius</h1>");
        res.write("<img src="+imgurl+">");
        res.send()
    })
})
})

app.listen(3000,function(){
    console.log("Server is running on port 3000");
})
