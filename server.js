const express = require('express');
const axios = require('axios').default;
const bodyParser = require('body-parser');

const app = express();
const port = process.env.NODE_ENV || 3000;

const WEATHER_API_KEY = '4350a17273cfe6bcc31832440bac69d4';
const url = 'http://api.openweathermap.org/data/2.5/weather?q=Aveiro&APIKEY=4350a17273cfe6bcc31832440bac69d4';

const baseUrlForGroups = 'http://api.openweathermap.org/data/2.5/group'; 


app.use(bodyParser.json());

/*
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
*/

app.listen(port, error => {
	if (error){
		throw error;
	}
	console.log('Server up on port ', port);
})

//router
app.get('/temperatures', (req, res, next) => {
	
	console.log('logging request');
	next();
}, (req, res) => {
	const cityID = req.query.cityID;
	
	// make request to weather api
	axios.get(baseUrlForGroups, {
		params: {
			id: cityID,
			units: 'metric',
			APIKEY: WEATHER_API_KEY
		}
	})
	.then(response => {
		
		let cityInfo = [];

		if(response.data.cnt && response.data.cnt > 0){
			const cityInfoArray = response.data.list;
			cityInfo = cityInfoArray.map(cityResult => (
				{
				country: cityResult.name,
				temp: cityResult.main.temp,
				sunrise: cityResult.sys.sunrise,
				sunset: cityResult.sys.sunset,
			}));

		}

		res.status(200).send(cityInfo);
		
	})
	.catch(error => {
		console.log(error)
		res.status(500).send('Something went wrong!');
	});
});