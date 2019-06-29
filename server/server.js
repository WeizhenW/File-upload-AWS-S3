//express
const express = require('express');
const app = express();
//body-parser
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
//port
const PORT = process.env.PORT || 5000;
//routes
const s3Router = require('./routes/s3.router');
const imageRouter = require('./routes/images.router');

app.use('/api/s3', s3Router);
app.use('/api/image', imageRouter);

app.listen(PORT, () => {
    console.log('on port', PORT);
})