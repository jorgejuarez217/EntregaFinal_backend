const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_NAME = process.env.DB_NAME;
const DB_CLUSTER = process.env.DB_CLUSTER;
const SECRET = process.env.SECRET; //CL28

module.exports = {
  url: `mongodb+srv://${DB_USER}:${DB_PASSWORD}@${DB_CLUSTER}.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`,
  SECRET,
  sessionTtl: process.env.SESSION,
  mail: {
    fromAndTo: process.env.MAIL,
    password: process.env.PASS,
  },
  serverPort: process.env.PORT,
};
///////////////////firebase////////////////////
// export default {
//     mongodb: {
//       connectionString: "mongodb://localhost:27017/ecommerce",
//     },

// }
