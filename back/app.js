const express = require('express');

const app = express();

app.use((req, res) => {
    res.json({ message: 'response ' });
});

module.exports = app;