const moment = require("moment");

let m = moment("2022-01-04").format("YYYY-MM-DD");
let unix = moment.unix("1640582727").format("YYYY-MM-DD");
console.log(m);
console.log("unix", unix);
