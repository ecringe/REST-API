const express = require("express");
const studentRoutes = require("./routes/students");
const { notFound, errorHandler } = require("./middleware/errorHandler");

const app = express();
const PORT = 3000;

app.use(express.json());

app.get("/", (req, res) => {
    res.json({ message: "Student API ажиллаж байна" });
});

app.use("/api/v1/students", studentRoutes);

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server http://localhost:${PORT} дээр ажиллаж байна`);
});