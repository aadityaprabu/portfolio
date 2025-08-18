const util = require("util");
const logger = (req, res, next) => {
  console.log("Request Method:", req.method);
  console.log("Request URL:", req.url);
  console.log(
    "Headers:",
    util.inspect(req.headers, { depth: null, colors: true })
  );
  console.log("Body:", util.inspect(req.body, { depth: null, colors: true }));
  next();
};

module.exports = logger;
