const express = require('express');
const app = express();
app.use(express.json());
const router = require('./routes/routes');
const port = process.env.PORT || 3001;

app.use('/', router);

app.listen(port, () => {
    console.log(`SERVER IS LISTENING ON ${port}`)
});