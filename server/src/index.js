require("dotenv").config();
const express = require("express");
const app = express();
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");
const methodOverride = require("method-override");
const log = require("./logger");

const pkg = require("../package.json");

// Enable CORS for client app
app.use(cors());

// Adding http request logger
app.use(morgan('short'));

// Adding minimal security to api
app.use(helmet());

// Define health-check route
app.get("/health-check", (req, res) => res.send({ status: 'UP', version: pkg.version }));

// import and define model routes
const v1Router = require("./routes");
app.use('/v1', v1Router);

// configure Error Handler
app.use(methodOverride());
app.use((err, req, res, next) => {
   log.error(err);
   res.status(err.code).send({ message: err.message });
});

app.listen(3005, () => console.log(`App is running in port 3005`));
