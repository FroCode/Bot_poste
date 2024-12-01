const app = require("./app");
const mongoose = require("mongoose");

const DB = process.env.DB_URI;

mongoose
  .connect(DB)
  .then(() => console.log("DB has been connected successfuly"))
  .catch((err) => console.error("Error connecting to DB", err));

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
