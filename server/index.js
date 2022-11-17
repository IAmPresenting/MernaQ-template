const express = require("express");
const colors = require("colors");
const cors = require("cors");
require("dotenv").config();
const port = process.env.PORT || 4790;

var { graphqlHTTP } = require("express-graphql");
const schema = require("./schema/schema");
const connectDB = require("./config/db");
const app = express();

//Connect to database
connectDB();

app.use(cors());
app.use(
  "/graphql",
  graphqlHTTP({ schema, graphiql: process.env.NODE_ENV === "development" })
);
app.listen(port, () => {
  console.log(`listening for reqest on port ${process.env.PORT}`);
});
