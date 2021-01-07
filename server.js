
const express = require('express');

const app = express();

app.use(express.static('./dist/Youtube-Angular'));

app.get('/*', (req, res) =>
    res.sendFile('index.html', { root: 'dist/Youtube-Angular/' }),
);

app.listen(process.env.PORT || 8080);