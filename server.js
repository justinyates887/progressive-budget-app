const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const compression = require("compression");
require('dotenv').config()

const PORT = process.env.PORT || 8080;

const app = express();

app.use(logger("dev"));

app.use(compression());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

mongoose.connect(process.env.URI, {
	useNewUrlParser: true,
	useFindAndModify: false,
	useUnifiedTopology: true,
});

mongoose.connection
.on('error', (error) => {
	console.error('Error at mongo.js :' + error)
})
.on('open', () => {
	console.log('[mongoose] connected')
})
.on('close', () => {
	console.log('[mongoose] connection closed')
})
.on('connecting', () => {
	console.log('[mongoose] connecting...')
})
.on('reconnected', () => {
	console.log('[mongoose] reconnected after interrupt')
})
.on('reconnectFailed', error => {
	console.error('[mongoose] reconnection failed due to error:' + error);
})

// routes
app.use(require("./routes/api.js"));

app.listen(PORT, () => {
	console.log(`App running on port ${PORT}!`);
});