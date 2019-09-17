const log = require("./logger");

module.exports = (req, res, next) => {
  console.log(req);
  if (req.get("apiKey") === process.env.APP_API_KEY) {
    log.info("This app is authorized");
    next();
  } else {
    log.error("unauthorized app");
    res.status(401).send({ message: "unauthorized app" });
  }
}