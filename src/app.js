import "dotenv/config";
//import dotenv, { config } from "dotenv";
import express from "express";
import cors from "cors";
import config from "./configs";
import MongoStore from "connect-mongo";
//dotenv.config();
import passport from "passport";
import logger from "./utils/logger";
import { connect } from "./utils/database.config";
import { googleAuth } from "./configs/google.auth";
import session from "express-session";
import { routesInits } from "./api/routes";

const app = express();

app.use(cors());

//if use want to access only to fornt end
//app.use(cors({oring:["http:localhost:3000"]}));
const PORT = process.env.PORT || 8070;
app.use(
  session({
    secret: config.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: config.DB_CONNECTION_STRING }),
    cookie: {
      secure: false,
      expires: new Date(Date.now() + 1000),
      maxAge: 1000,
    },
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.get("/", (req, res, next) => {
  res.send("<a href='http://localhost:8070/auth/google'>Login with goole</a>");
  next();
});
app.listen(PORT, () => {
  connect();
  logger.info(`Server is up and running on port ${PORT}`);
  routesInits(app, passport);
  googleAuth(passport);
});
