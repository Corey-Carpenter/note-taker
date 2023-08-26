const express = require('express');
const apiRoutes = require('./routes/apiRoutes.js');
const path = require('path');

const PORT = process.env.PORT || 3001;

const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', apiRoutes);

app.use(express.static('public'));


app.get('/', (req, res) => 
    res.sendFile(path.join(__dirname, '/public/index.html'))
);

app.get('/notes', (req, res) => 
    res.sendFile(path.join(__dirname, '/public/notes.html'))
);



app.listen(PORT, () => {
    console.group(`App listening at http://localhost:${PORT}`)
});