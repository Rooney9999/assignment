const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors"); // Import the cors middleware
const authRouter = require("./routes/auth");
const pullRequestsRoutes = require('./routes/pullRequests');
const app = express();

const uri = "mongodb+srv://root:root@cluster0.lk9qtfn.mongodb.net/testdb?retryWrites=true&w=majority";

mongoose
  .connect(uri)
  .then(() => {
    console.log("DB is connected!");
  })
  .catch((err) => {
    console.log("Could not connect: ", err.message);
  });

// Use the cors middleware
app.use(cors());

app.use(express.json());
app.use("/auth", authRouter);
app.use('/api', pullRequestsRoutes);
app.get("/", (req, res) => {
  res.json({ ok: true });
});

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`App is running on http://localhost:${PORT}`);
});
