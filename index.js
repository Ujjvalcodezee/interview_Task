fs = require("fs");
express = require("express");
bodyParser = require("body-parser");
path = require("path");
app = module.exports = express();
http = module.exports = require("http").Server(app);
request = module.exports = require("request");
bodyParser = require("body-parser");
mongoose = module.exports = require("mongoose");
md5 = module.exports = require("md5");
cors = module.exports = require("cors");
jwt = module.exports = require("jsonwebtoken");
ObjectId = module.exports = mongoose.mongo.ObjectId;
require("dotenv").config();
const PORT = process.env.PORT || 3000;
console.log("PORT >> ", PORT);
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());

app.use(cors());

mongoose.set("strictQuery", false);
http.listen(PORT);
mongoose.connect(process.env.MONGO_URL);
mongoose.pluralize(null);
console.log(process.env.MONGO_URL);
require("./setting/url_setting.js");

require("./setting/controllers_setting.js");
