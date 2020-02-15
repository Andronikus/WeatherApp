const express = require('express');
const axios = require('axios').default;

const server = express();
const port = process.env.NODE_ENV || 3000;

const WEATHER_API_KEY = '4350a17273cfe6bcc31832440bac69d4';
const url = 'http://api.openweathermap.org/data/2.5/weather?q=Aveiro&APIKEY=4350a17273cfe6bcc31832440bac69d4';

axios.get('http://api.openweathermap.org/data/2.5/weather',{
	params: {
		q: 'Aveiro',
		units: 'metric',
		APIKEY: WEATHER_API_KEY
	}
})
.then(response => {
	const data = response.data;
	const responseObject = {
		country: data.name,
		temp: data.main.temp,
		sunrise: data.sys.sunrise,
		sunset: data.sys.sunset,
	}
	console.log(responseObject);
})
.catch(error => console.log(error))


server.listen(port, error => {
	if (error){
		throw error;
	}
	console.log('Server up on port ', port);
})