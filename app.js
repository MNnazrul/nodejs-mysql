require("dotenv").config();
const express = require("express");
const app = express();
const userRouter = require("./api/users/user.router");

const PORT = process.env.APP_PORT;
app.use(express.json());

app.use("/api/users", userRouter);

app.listen(PORT, () => {
    console.log("server up and running : ", PORT);
});
