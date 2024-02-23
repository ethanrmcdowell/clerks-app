const express = require('express');
const app = express();

const garageRoutes = require('./routes/garage-routes');
const meetingRoutes = require('./routes/meeting-routes');
const deedRoutes = require('./routes/deed-routes');

require('dotenv').config();

app.use(express.json());

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

app.listen(3000, () => {
    console.log("Server listening on port 3000!");
});