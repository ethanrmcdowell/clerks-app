const express = require('express');
const app = express();
const cors = require('cors');

const garageRoutes = require('./routes/garage-routes');
const meetingRoutes = require('./routes/meeting-routes');
const deedRoutes = require('./routes/deed-routes');

require('dotenv').config();

app.use(express.json());
app.use(cors());

app.set('json spaces', 0);

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin",
        "http://localhost:4200"
        );
    next();
});

app.use('/api/garage', garageRoutes);
app.use('/api/meeting', meetingRoutes);
app.use('/api/deed', deedRoutes);

// ip: 10.62.10.52

app.listen(3000, () => {
    console.log("Server listening on port 3000!");
});

// app.listen((3000, '10.62.10.52'), () => {
//     console.log("Server listening on port 3000!");
// });