import mongoose from "mongoose";

const uri = "mongodb+srv://root:root@cluster0.lk9qtfn.mongodb.net/testdb?retryWrites=true&w=majority";

mongoose
  .connect(uri)
  .then(() => {
    console.log("DB is connected!");
  })
  .catch((err) => {
    console.log("Could not connect: ", err.message);
  });
