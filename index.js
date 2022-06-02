const express = require('express');
var cors = require('cors');
const connectDB = require('./config/db')

const app = express();
app.use(cors())
//connect the database
connectDB();
app.use(express.json({ extended: false }));


//Routes
//index: Returns the existing longUrl in the database
//url:   Creates a shortid code and shortUrl ans saves in the DB

app.use('/', require('./routes/index'))
app.use('/api/url', require('./routes/url'));

const PORT = 5000;

app.listen(PORT, () => console.log(`Server running on Port ${PORT}`));
