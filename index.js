const express = require("express");
const sequelize = require("./db.js");

const cors = require("cors");
const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");
const router = require("./routes/index.js");

const errorHandler = require("./middleware/ErrorHandlingMiddleware");
const path = require("path");

require("dotenv").config();

const PORT = process.env.PORT || 5000;

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.resolve(__dirname, "static")));
app.use(fileUpload({}));
app.use("/api", router);

app.use(errorHandler);

const startApp = async () => {
  try {
    await sequelize.open;
    await sequelize.sync();
    app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};
startApp();
