const express = require("express");
const cors = require('cors');
const app = express();
const cookieParser = require('cookie-parser');
const session = require('express-session');


app.use(cookieParser());
app.use(cors({credentials: true, origin: 'http://localhost:5173'}));
app.use(express.json(), express.urlencoded({ extended: true }));
app.use(session({
    secret: 'my-secret-key', 
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } 
}));

require("./config/mongoose.config");
require("./routes/developer.routes")(app);
require("./routes/organization.routes")(app);
require('dotenv').config();

  
app.listen(8000, () => console.log("The server is all fired up on port 8000"));

