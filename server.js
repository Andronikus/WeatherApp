const express = require('express');

const server = express();
const port = process.env.NODE_ENV || 3000;

server.listen(port, error => {
	if (error){
		throw error;
	}
	console.log('Server up on port ', port);
})