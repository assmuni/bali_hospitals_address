const express = require('express');
const mongoose = require('mongoose');

const app = express();

app.get('/', (req, res) => {
    res.send('whats up');
})

const portNumber = 3000;
app.listen(process.env.portNumber || portNumber, () => {
    console.info(`server online at localhost:${portNumber}`);
});