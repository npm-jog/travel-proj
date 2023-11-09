"use strict";
const mongoose = require("mongoose");
const ENV = process.env.NODE_ENV || "development";
require("dotenv").config({
    path: `${__dirname}/../.env.${ENV}`,
});
}
module.exports = connectDB;
