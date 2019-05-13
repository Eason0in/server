const monk = require("monk");
const connectionString = process.env.MONGODB_URI || "localhost/messageboard"; //messageboard is collections name
const db = monk(connectionString);

module.exports = db;
