import express from "express";

const app = express();


app.get("/", (req, res) => {
    res.send("Bismillahir Rahmanir rahim.")
})

export default app;