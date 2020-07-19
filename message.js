var createError = require("http-errors");
var cookieParser = require("cookie-parser");
var express = require("express");
const cors = require("cors");
const logger = require("morgan");
const app = express();

app.use(logger("dev"));
app.use(cors(require("./config").cors));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());

app.post("/name", (req, res) => {
  console.log("req body", JSON.stringify(req.body, null, 2));
  res.json({
    success: true,
  });
});

app.post("/sync", (req, res) => {
  console.log("req body", JSON.stringify(req.body, null, 2));
  const defaultValue = {
    height: 0,
    speed: 0,
    flight_time: 0,
    GPS_star: 0,
    battery: 0,
    lat: 0,
    lon: 0,
  };

  res.json({
    success: true,
  });
});

app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};
  console.log(err);
  // render the error page
  res.status(err.status || 500);
  // res.render("error");
  res.json(err);
});

app.listen(8182);
