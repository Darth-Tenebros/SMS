const express = require('express');
const app = express();
const cors = require('cors')
app.use(express.json());
app.use(cors());

const router = require('./routes/routes');
const port = process.env.PORT || 3000;

app.use('/', router);

app.listen(port, () => {
    console.log(`SERVER IS LISTENING ON ${port}`)
});