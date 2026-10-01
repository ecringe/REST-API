const express = require("express");
const app = express();
const PORT = 3000;

app.use(express.json());

app.get("/", (req, res) => {
    res.json({ message: "Student API ажиллаж байна" });
});

app.listen(PORT, () => {
    console.log(`Server http://localhost:${PORT} дээр ажиллаж байна`);
});
