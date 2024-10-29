const mongoose = require("mongoose");
const app = require("./app");
const { MONGODB_URI, PORT } = require("./utils/config");

console.log("Mongodb connecting.....");

mongoose.connect(MONGODB_URI).then(() => {
  console.log("Mongodb connected");
  app.listen(PORT, () => {
    console.log(`Server is running on http://127.0.0.1:${PORT}`);
  });
});
